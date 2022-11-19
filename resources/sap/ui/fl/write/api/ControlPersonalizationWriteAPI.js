/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Element","sap/ui/fl/apply/_internal/controlVariants/Utils","sap/ui/fl/initial/_internal/changeHandlers/ChangeHandlerStorage","sap/ui/fl/registry/Settings","sap/ui/fl/FlexControllerFactory","sap/ui/fl/Layer","sap/ui/fl/Utils"],function(L,J,E,V,C,S,F,a,U){"use strict";function c(o,s){if(!o.changeSpecificData){return Promise.reject(new Error("No changeSpecificData available"));}if(!o.changeSpecificData.changeType){return Promise.reject(new Error("No valid changeType"));}if(!(o.selectorControl instanceof E)){return Promise.reject(new Error("No valid selectorControl"));}var e=o.selectorControl.getMetadata().getName();return C.getChangeHandler(o.changeSpecificData.changeType,e,o.selectorControl,J,s);}function g(A,o,u){var v=V.getRelevantVariantManagementControlId(o,[],u);return J.getSelector(v,A).id;}function b(A){var v=V.getAllVariantManagementControlIds(A);return v.map(function(s){return J.getSelector(s,A).id;});}function l(m){L.error(m);return Promise.reject(m);}var d={add:function(p){if(!p.changes.length){return Promise.resolve([]);}var A=U.getAppComponentForControl(p.changes[0].selectorElement||p.changes[0].selectorControl);var f=F.createForControl(A);var v=A.getModel(U.VARIANT_MODEL_NAME);var s=a.USER;var e=[];return p.changes.reduce(function(P,o){return P.then(function(){o.selectorControl=o.selectorElement;return c(o,s);}).then(function(){if(!p.ignoreVariantManagement){if(!o.changeSpecificData.variantReference){var h=g(A,o.selectorControl,p.useStaticArea);if(h){var i=v.oData[h].currentVariant;o.changeSpecificData.variantReference=i;}}}else{delete o.changeSpecificData.variantReference;}o.changeSpecificData=Object.assign(o.changeSpecificData,{developerMode:false,layer:s});return f.addChange(o.changeSpecificData,o.selectorControl);}).then(function(h){return f.applyChange(h,o.selectorControl);}).then(function(h){e.push(h);}).catch(function(h){L.error("A Change was not added successfully. Reason:",h.message);});},Promise.resolve()).then(function(){return e;});},reset:function(p){if(!p.selectors||p.selectors.length===0){return l("At least one control ID has to be provided as a parameter");}var A=p.selectors[0].appComponent||U.getAppComponentForControl(p.selectors[0]);if(!A){return l("App Component could not be determined");}var s=p.selectors.map(function(v){var e=v.id||v.getId();var h=A.getLocalId(e);return h||e;});var f=F.createForControl(A);return f.resetChanges(a.USER,undefined,A,s,p.changeTypes);},restore:function(p){if(!p||!p.selector){return Promise.reject("No selector was provided");}var A=U.getAppComponentForControl(p.selector);if(!A){return Promise.reject("App Component could not be determined");}var f=F.createForControl(A);return f.removeDirtyChanges(a.USER,A,p.selector,p.generator,p.changeTypes);},save:function(p){var A=p.selector.appComponent||U.getAppComponentForControl(p.selector);if(!A){return l("App Component could not be determined");}var f=F.createForControl(A);var v=A.getModel(U.VARIANT_MODEL_NAME);var e=b(A);return f.saveSequenceOfDirtyChanges(p.changes,A).then(function(r){v.checkDirtyStateForControlModels(e);return r;});},buildSelectorFromElementIdAndType:function(p){var A=U.getAppComponentForControl(p.element);if(!A||!p.elementId||!p.elementType){throw new Error("Not enough information given to build selector.");}return{elementId:p.elementId,elementType:p.elementType,appComponent:A,id:p.elementId,controlType:p.elementType};},isCondensingEnabled:function(){return S.getInstance().then(function(s){return s.isCondensingEnabled(a.USER);});}};return d;});