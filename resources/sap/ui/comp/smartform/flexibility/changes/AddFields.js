/*!
 * SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/fl/changeHandler/Base","sap/ui/fl/apply/api/DelegateMediatorAPI","sap/ui/core/util/reflection/JsControlTreeModifier","sap/base/util/merge","sap/base/util/ObjectPath"],function(B,D,J,m,O){"use strict";function i(f){return typeof f==="function";}function g(G,I){return G+"-element"+I;}function c(C){var M=false;M=C.content.field&&(C.content.field.selector||C.content.field.id)&&C.content.field.jsTypes&&C.content.field.value&&C.content.field.valueProperty;if(!M){throw new Error("Change does not contain sufficient information to be applied: ["+C.layer+"]"+C.namespace+"/"+C.fileName+"."+C.fileType);}}function a(d,o){var e=m({},d);e.fieldSelector.id=g(e.fieldSelector.id,0);return o.createControlForProperty(e).then(function(s){var n=d.modifier.getId(s.control);d.labelFor=n;return o.createLabel(d).then(function(l){return{label:l,control:s.control};});});}function b(d,p){var e=m({aggregationName:"formElements",payload:d.payload||{}},p);var o=d.instance;return Promise.resolve().then(function(){if(i(o.createLayout)){return o.createLayout(e);}}).then(function(l){if(O.get("control",l)){l.layoutControl=true;return l;}return a(e,o);});}var A={};A.applyChange=function(C,G,p){var o=C.getDefinition();var d=C.getContent();var M=p.modifier;var e=p.appComponent;var f=d.field.selector;var v=p.view;var F=d.field.id;if(M.bySelector(f||F,e,v)){return B.markAsNotApplicable("Control to be created already exists:"+f||F,true);}var h=d.field.index;var s=C.getDependentControl("form",p);var j=s&&M.getFlexDelegate(s);if(!j){c(o);var k;return Promise.resolve().then(M.createControl.bind(M,"sap.ui.comp.smartform.GroupElement",e,v,f||F)).then(function(l){k=l;if(!f){f=M.getSelector(F,e);}C.setRevertData({newFieldSelector:f});return d.field.jsTypes.reduce(function(n,q,I){var P=d.field.valueProperty[I];var r=d.field.value[I];var E=d.field.entitySet;return n.then(this.addElementIntoGroupElement.bind(this,M,v,k,q,P,r,E,I,e));}.bind(this),Promise.resolve());}.bind(this)).then(function(){return M.insertAggregation(G,"groupElements",k,h);});}return A._addFieldFromDelegate(s,G,f,F,h,d.field.value[0],C,M,v,e);};A._addFieldFromDelegate=function(s,G,f,F,d,e,C,M,v,o){var h;var I;return D.getDelegateForControl({control:s,modifier:M}).then(function(j){var k={appComponent:o,view:v,fieldSelector:f||F,bindingPath:e,modifier:M,element:s};return b(j,k);}).then(function(j){I=j;if(!I.layoutControl){return Promise.resolve().then(M.createControl.bind(M,"sap.ui.comp.smartform.GroupElement",o,v,f||F)).then(function(k){h=k;return Promise.resolve().then(M.insertAggregation.bind(M,h,"label",I.label,0,v)).then(M.insertAggregation.bind(M,h,"fields",I.control,0,v)).then(function(){return h;});});}return I.control;}).then(function(h){return M.insertAggregation(G,"groupElements",h,d,v);}).then(function(){if(I.valueHelp){return M.insertAggregation(s,"dependents",I.valueHelp,0,v);}}).then(function(){if(!f){f=M.getSelector(F,o);}C.setRevertData({newFieldSelector:f,valueHelpSelector:I.valueHelp&&M.getSelector(I.valueHelp,o)});});};A.addElementIntoGroupElement=function(M,v,G,j,p,P,e,I,o){var V;var s=M.getId(G);var d=g(s,I);return Promise.resolve().then(M.createControl.bind(M,j,o,v,d)).then(function(C){V=C;M.bindProperty(V,p,P);M.setProperty(V,"expandNavigationProperties",true);return M.insertAggregation(G,"elements",V,I,v,true);}).then(function(){if(e){M.setProperty(V,"entitySet",e);}}).catch(function(E){return B.markAsNotApplicable(E&&E.message||"Control couldn't be created",true);});};A.completeChangeContent=function(C,s,p){var o=p.appComponent;var d=C.getDefinition();if(!d.content){d.content={};}if(!d.content.field){d.content.field={};}if(s.fieldValues){d.content.field.value=s.fieldValues;}else if(s.bindingPath){d.content.field.value=[s.bindingPath];}else{throw new Error("oSpecificChangeInfo.fieldValue or bindingPath attribute required");}if(s.valueProperty){d.content.field.valueProperty=s.valueProperty;}else if(s.bindingPath){d.content.field.valueProperty=["value"];}else{throw new Error("oSpecificChangeInfo.valueProperty or bindingPath attribute required");}if(s.newControlId){d.content.field.selector=J.getSelector(s.newControlId,o);}else{throw new Error("oSpecificChangeInfo.newControlId attribute required");}if(s.jsTypes){d.content.field.jsTypes=s.jsTypes;}else if(s.bindingPath){d.content.field.jsTypes=["sap.ui.comp.smartfield.SmartField"];}else{throw new Error("oSpecificChangeInfo.jsTypes or bindingPath attribute required");}if(s.index===undefined){throw new Error("oSpecificChangeInfo.index attribute required");}else{d.content.field.index=s.index;}if(s.entitySet){d.content.field.entitySet=s.entitySet;}if(s.relevantContainerId){C.addDependentControl(s.relevantContainerId,"form",p);}};A.revertChange=function(C,G,p){var o=p.appComponent;var v=p.view;var M=p.modifier;var r=C.getRevertData();var f=r.newFieldSelector;var d=M.bySelector(f,o,v);return Promise.resolve().then(M.removeAggregation.bind(M,G,"groupElements",d)).then(function(){M.destroy(d);var V=r.valueHelpSelector;if(V){var e=M.bySelector(V,o,v);var s=C.getDependentControl("form",p);return Promise.resolve().then(M.removeAggregation.bind(M,s,"dependents",e)).then(function(){M.destroy(e);});}}).then(function(){C.resetRevertData();});};A.getCondenserInfo=function(C){return{affectedControl:C.getContent().field.selector,classification:sap.ui.fl.condenser.Classification.Create,targetContainer:C.getSelector(),targetAggregation:"groupElements",setTargetIndex:function(C,n){C.getContent().field.index=n;},getTargetIndex:function(C){return C.getContent().field.index;}};};A.getChangeVisualizationInfo=function(C){return{affectedControls:[C.getContent().field.selector]};};return A;},true);
