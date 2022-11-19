/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/mdc/p13n/Engine'],function(E){"use strict";var A={};var c=function(C){if(!C._bWaitForModificationChanges){C._bWaitForModificationChanges=true;E.getInstance().waitForChanges(C).then(function(){if(C._onModifications instanceof Function){C._onModifications();}delete C._bWaitForModificationChanges;});}};A.createSetChangeHandler=function(m){if(!m||!m.hasOwnProperty("aggregation")||!m.hasOwnProperty("property")){throw new Error("Please provide a map containing the affected aggregation and property name!");}var a=m.aggregation;var s=m.property;return{"changeHandler":{applyChange:function(C,o,p){return E.getInstance().readXConfig(o,{propertyBag:p}).then(function(P){var O=null;if(P&&P.aggregations&&P.aggregations[a]&&P.aggregations[a][C.getContent().name]&&P.aggregations[a][C.getContent().name][s]){O=P.aggregations[a][C.getContent().name][s];}C.setRevertData({name:C.getContent().name,value:O});return E.getInstance().enhanceXConfig(o,{controlMeta:{aggregation:a,property:s},name:C.getContent().name,value:C.getContent().value,propertyBag:p});}).then(function(){c(o);});},completeChangeContent:function(C,b,p){},revertChange:function(C,o,p){return E.getInstance().enhanceXConfig(o,{controlMeta:{aggregation:a,property:s},name:C.getRevertData().name,value:C.getRevertData().value,propertyBag:p}).then(function(){C.resetRevertData();c(o);});}},"layers":{"USER":true}};};return A;});
