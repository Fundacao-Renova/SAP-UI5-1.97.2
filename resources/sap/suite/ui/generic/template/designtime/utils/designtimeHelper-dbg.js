sap.ui.define(["sap/base/util/extend", "sap/base/util/deepExtend", "sap/base/util/merge"], function (extend, deepExtend, merge) {
	"use strict";

	var mControlInfo = {};
	var aViews = [];
	/**
	 * get effective designtime for all controls on current active view
	 * @return {Promise} promise resolving to a map, with key = control id, value = designtime
	 */
	function loadBaseDesigntime(){
		var aPromises = [];
		
		function getEffectiveDesigntimeRecurse(oNodeOrControl){
			var oNode = oNodeOrControl instanceof Node && oNodeOrControl;
			// sap.ui.core.Control ?
			var oControl = oNodeOrControl instanceof sap.ui.base.ManagedObject && oNodeOrControl || oNode && oNode.id && sap.ui.getCore().byId(oNode.id);
			
			// recursion based on xml node using all children
			if (oNode && oNode.children){
				// oNode.children is not an Array, but can used likewise
				Array.prototype.forEach.apply(oNode.children, [getEffectiveDesigntimeRecurse]);
			}

			// either no chance to proceed or designtime of current instance already (and therefore all its dependents) already requested
			if (!oControl || mControlInfo[oControl.getId()]){
				return;
			}
			
			// we attach this designtime to view, so we cannot wait for designtime of view itself (would actually wait forever)
			if (oControl instanceof sap.ui.core.mvc.XMLView){
				if (!aViews.includes(oControl)) {
					aViews.push(oControl);
				}
			} else {
				var oControlInfo = {};
				mControlInfo[oControl.getId()] = oControlInfo;
				oControlInfo.designTimePromise = oControl.getMetadata().loadDesignTime(oControl);
				aPromises.push(oControlInfo.designTimePromise);
				oControlInfo.designTimePromise.then(function(oDesignTime){
					oControlInfo.designTime = oDesignTime;
				});
			}
				

			// Recursion based on controls using all aggregations
			oControl.findAggregatedObjects().forEach(getEffectiveDesigntimeRecurse);
//			Object.keys(oControl.getMetadata().getAllAggregations()).forEach(function(sAggregation){
//				if (Array.isArray(oControl.getAggregation(sAggregation))) {
//					oControl.getAggregation(sAggregation).forEach(getEffectiveDesigntimeRecurse);
//				} else {
//					getEffectiveDesigntimeRecurse(oControl.getAggregation(sAggregation));
//				}
//			});
			
		}
		
		document.querySelectorAll(".sapUiXMLView").forEach(function(oTopNode){
			// make sure to get original designtime for all control currently visible 
			getEffectiveDesigntimeRecurse(oTopNode);
			// If a node is added to dom later (i.e. a control is not visible at this point in time), make sure to get it's designtime asap. 
			// This can be crucial, when user start UI adaptation, ends it, does a change that adds a control to dom (e.g. adds an extended filter), and starts UI adaptation again.
			// If the user would now try adaptation of the added control, we would not have any control otherwise. However, with this we have no means to control, when the designtime actually 
			// has been loaded (but it's likely that it is loaded in time, as after adding the control another user interaction (starting UI adaptation again) is needed)
			oTopNode.addEventListener('DOMNodeInserted', function(oEventInfo){
				getEffectiveDesigntimeRecurse(oEventInfo.relatedNode);
			});
		});
			
		return Promise.all(aPromises);
	}
		
	function getBaseDesignTime(oControl){
		var oControlInfo = mControlInfo[oControl.getId()] || {};
		var oBaseDesignTime = deepExtend({}, oControlInfo.designTime);
		// not only designTime of control itself relevant, but also everything that is propagated from ancestors
		// => determine all ancestors
		// assumption: only one view can contain the control
		var aRelevantViews = aViews.filter(function(oView){
			return oView.findAggregatedObjects(true).includes(oControl);
		});
//		if (aRelevantViews.length > 1){
//			debugger;
//		}
		var oView = aRelevantViews[0];

		if (oView){
			// all ancestors
			oControlInfo.pedigree = oView.findAggregatedObjects(true, function(oCandidate){
				return oCandidate.findAggregatedObjects(true).includes(oControl);
			}).map(function(oAncestor){
				return {
					oAncestor: oAncestor,
					sAncestorId: oAncestor.getId(),
					sAggregation: Object.keys(oAncestor.getMetadata().getAllAggregations()).find(function(sAggregation){
						var vAggregationContent = oAncestor.getAggregation(sAggregation);
						if (Array.isArray(vAggregationContent)) {
							return vAggregationContent.find(function(oCandidate){
								return oCandidate === oControl || oCandidate.findAggregatedObjects(true).includes(oControl);
							});
						} else {
							return vAggregationContent === oControl || vAggregationContent && vAggregationContent.findAggregatedObjects && vAggregationContent.findAggregatedObjects(true).includes(oControl);
						}
					})
				};
			}).filter(function(oAncestorInfo){
				return mControlInfo[oAncestorInfo.sAncestorId] && mControlInfo[oAncestorInfo.sAncestorId].designTime.aggregations && mControlInfo[oAncestorInfo.sAncestorId].designTime.aggregations[oAncestorInfo.sAggregation] 
						&& mControlInfo[oAncestorInfo.sAncestorId].designTime.aggregations[oAncestorInfo.sAggregation].propagateMetadata;
			}).reverse();
		
			oBaseDesignTime = oControlInfo.pedigree.reduce(function(oDesignTime, oAncestorInfo){
				return merge(oDesignTime, mControlInfo[oAncestorInfo.sAncestorId].designTime.aggregations[oAncestorInfo.sAggregation].propagateMetadata(oControl, oAncestorInfo.oAncestor));
			}, oBaseDesignTime); 
		}
		
		return oBaseDesignTime;
	}	
	
	function getReducedDesignTime(oControl, oAllow){
		var oResult = {
				actions: Object.create(null),
				aggregations: Object.create(null),
				properties: Object.create(null)
			};
		var oBaseDesignTime = extend({}, oResult, getBaseDesignTime(oControl));
		
		if (typeof (oBaseDesignTime.actions) === "object"){
			for (var sAction in oBaseDesignTime.actions){
				oResult.actions[sAction] = oAllow && oAllow.actions && oAllow.actions.includes(sAction) ? oBaseDesignTime.actions[sAction] : "not-adaptable";
			}
		} else {
			oResult.actions = "not-adaptable";
		}

		for (var sAggregation in oBaseDesignTime.aggregations){
			oResult.aggregations[sAggregation] = {
					actions: Object.create(null)
			};
			for (var sAction in oBaseDesignTime.aggregations[sAggregation].actions){
				oResult.aggregations[sAggregation].actions[sAction] =  oAllow 
																	&& oAllow.aggregations 
																	&& oAllow.aggregations[sAggregation] 
																	&& oAllow.aggregations[sAggregation].actions 
																	&& oAllow.aggregations[sAggregation].actions.includes(sAction) ? oBaseDesignTime.aggregations[sAggregation].actions[sAction] : "not-adaptable";
			}
		}
		
		for (var sProperty in oControl.getMetadata().getAllProperties()){
			oResult.properties[sProperty] = {
				ignore: !oAllow || !oAllow.properties || !oAllow.properties.includes(sProperty)
			};
		}

		return oResult;
	}
	
	function getViewDesignTime(mAllow){
		// provide propagation function for all controls contained allowing only what we want to allow
		var oDesignTime = {
			aggregations: {
				content: {
					propagateMetadata: function (oElement) {
						return getReducedDesignTime(oElement, mAllow[oElement.getMetadata().getElementName()]);
					}
				}
			}
		};
		
		// For View itself, we cannot wait for base designtime to load (and there is nothing to wait for - we're the ones defining it)
		// Nevertheless, we need to ensure only allowed properties to be changeable.
		
		// There might be several views. Different properties could exist (if inheritance is used) - to be sure, all properties of all views should not be alowed to change
		return aViews.reduce(function(oDesignTime, oView){
			return merge(getReducedDesignTime(oView, mAllow[oView.getMetadata().getElementName()]), oDesignTime);
		}, oDesignTime);
	}
	
	
	return loadBaseDesigntime().then(function(){
		return {
			getViewDesignTime: getViewDesignTime
		};
	});
});
