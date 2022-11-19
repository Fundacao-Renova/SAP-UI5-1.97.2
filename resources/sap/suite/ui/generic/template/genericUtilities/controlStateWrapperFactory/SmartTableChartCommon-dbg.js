sap.ui.define([
	"sap/suite/ui/generic/template/genericUtilities/controlHelper"
	], function(controlHelper) {
	"use strict";
	//This method returns the control state common for SmartTable and SmartChart
	function fnGetState(oControl, bUseVariantManagement) {
		var oControlState = {};
		if (bUseVariantManagement) {
			oControlState.sVariantId = oControl.getCurrentVariantId();
			oControlState.bVariantModified = oControl.getVariantManagement().currentVariantGetModified();
		}
		//capture UI state always. May or may not be used to restore
		var oControlUiState = oControl.getUiState();
		oControlState.oUiState = {
				oPresentationVariant: oControlUiState.getPresentationVariant(),
				oSelectionVariant: oControlUiState.getSelectionVariant()
		};
		return oControlState;
	}

	/*	This method sets the control state common for SmartTable and SmartChart
		- When Application is using VM
			1) Persistence mode - VM should restore prev. state
			2) Discovery mode - VM Should reset to default variant only if it navigates to different object page. else if for same object it will restore to prev. state
			3) Initial Load - VM set to default Variant
			4) Object Page Reload - VM should restore prev. state for both discovery and persistence mode
		- When Application is not using VM then Hidden variant come into the picture
			1) Persistence mode - VM Should restore prev. state
			2) Discovery mode - VM Should reset to standard variant only if it navigates to different object page. else if for same object it will restore to prev. state
			3) Initial Load - VM set to standard Variant
			4) Object Page Reload - VM should restore prev. state for both discovery and persistence mode
	*/
	function fnSetState(oControl, bUseVariantManagement, oState) {
		
		function fnSetControlUiState(oUiState) {
			var oControlUiState = oControl.getUiState();
			oControlUiState.setPresentationVariant(oUiState.oPresentationVariant);
			oControlUiState.setSelectionVariant(oUiState.oSelectionVariant);
			oControl.setUiState(oControlUiState);
		}

		function fnSetControlVariant(sVariantId) {
			oControl.setCurrentVariantId(sVariantId);
		}

		if (bUseVariantManagement) {
			if (oState) {
				// If the variant is modified, showing the variant name is of no help (according to UX decision), instead the standard variant should be shown (as modified)
				fnSetControlVariant(oState.bVariantModified ? "" : oState.sVariantId); 
			} else {
				fnSetControlVariant(oControl.getVariantManagement().getDefaultVariantId()); //Set Default Variant
			}
		} else {
			if (!oState) {
				// set standard variant to get (back) to initial state - otherwise control would assume "implicit personalization" and load default variant (on startup) resp.
				// stay with last selected one (navigation to a different object instance in discovery mode) 
				fnSetControlVariant("");
			}
		}
			
		// set control state
		// don't override if variant was clean - otherwise logic of VM/control would mark variant as modified
		if (oState && (!bUseVariantManagement || oState.bVariantModified)) {
			fnSetControlUiState(oState.oUiState);
		}
		
	}
	//Return a Promise to indicate control is Initialized
	function fnInitialize(oControl) {
		var oInitializedResolve;
		var oInitializedPromise = new Promise(function(resolve){
			oInitializedResolve = resolve;
		});
		var oAfterVariantInitializedResolve;
		var oAfterVariantInitializedPromise = new Promise(function(resolve){
			oAfterVariantInitializedResolve = resolve;
		});
		function fnOnControlInitialized() {
			oInitializedResolve();
			if (!oControl.getUseVariantManagement()){
				oAfterVariantInitializedResolve();
			}
		}
		if (controlHelper.isSmartTable(oControl)){
			oControl.attachInitialise(fnOnControlInitialized);
		} else if (controlHelper.isSmartChart(oControl)){
			oControl.attachInitialized(fnOnControlInitialized);
		}
		oControl.attachAfterVariantInitialise(oAfterVariantInitializedResolve);
		return Promise.all([oAfterVariantInitializedPromise, oInitializedPromise]);
	}

	return {
		getState: fnGetState,
		setState: fnSetState,
		initialize: fnInitialize
	};
});