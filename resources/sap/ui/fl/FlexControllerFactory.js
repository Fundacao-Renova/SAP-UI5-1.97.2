/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/FlexController","sap/ui/fl/Utils","sap/ui/fl/Layer","sap/ui/fl/apply/_internal/changes/Applier","sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/variants/VariantModel","sap/base/Log","sap/ui/performance/Measurement"],function(F,U,L,A,a,V,b,M){"use strict";var c={};c._instanceCache={};c._componentInstantiationPromises=new WeakMap();c.create=function(C){var f=c._instanceCache[C];if(!f){f=new F(C);c._instanceCache[C]=f;}return f;};c.createForControl=function(C){try{var o=U.getAppComponentForControl(C);var s=U.getComponentClassName(o||C);return c.create(s);}catch(e){b.error(e.message,undefined,"sap.ui.fl.FlexControllerFactory");}};function d(r,C){if(U.getUshellContainer()){return Promise.resolve(r);}var R=window.sessionStorage.getItem("sap.ui.rta.restart."+L.CUSTOMER);if(R){var s=U.getComponentClassName(C);if(R!==s&&R!=="true"){b.error("an application component was started "+"which does not match the component for which the restart was triggered:\n"+"Triggering component: "+R+"\n"+"Started component: "+s);return Promise.resolve(r);}window.sessionStorage.removeItem("sap.ui.rta.restart."+L.CUSTOMER);return new Promise(function(e,f){Promise.all([sap.ui.getCore().loadLibrary("sap.ui.rta",{async:true}),C.rootControlLoaded()]).then(function(){sap.ui.require(["sap/ui/rta/api/startKeyUserAdaptation"],function(g){g({rootControl:C});e(r);});}).catch(function(E){f(E);});});}return Promise.resolve(r);}c.getChangesAndPropagate=function(C,v){if(U.isApplicationComponent(C)){var s=C.getId();var r=a.initialize({componentId:s,asyncHints:v.asyncHints}).then(_.bind(this,C));c._componentInstantiationPromises.set(C,r);return r;}else if(U.isEmbeddedComponent(C)){var o=U.getAppComponentForControl(C);if(o&&U.isApplicationComponent(o)){var i=Promise.resolve();if(c._componentInstantiationPromises.has(o)){i=c._componentInstantiationPromises.get(o);}return i.then(function(){var e=o.getModel(U.VARIANT_MODEL_NAME);if(!e){return _(o);}return e;}).then(function(e){C.setModel(e,U.VARIANT_MODEL_NAME);});}return Promise.resolve();}};function _(o){var m=o.getManifestObject();var f=c.createForControl(o,m);var v;return f._oChangePersistence.loadChangesMapForComponent(o).then(function(g){var p=A.applyAllChangesForControl.bind(A,g,o,f);p._bIsSapUiFlFlexControllerApplyChangesOnControl=true;o.addPropagationListener(p);v=new V({},{flexController:f,appComponent:o});return v.initialize();}).then(function(){o.setModel(v,U.VARIANT_MODEL_NAME);M.end("flexProcessing");return v;}).then(function(r){return d(r,o);});}return c;},true);
