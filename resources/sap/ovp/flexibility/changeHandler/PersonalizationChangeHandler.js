sap.ui.define(["sap/ovp/cards/CommonUtils"],function(C){'use strict';var c={"changeHandler":{applyChange:function(o,p,P){var a=C.getApp();a.appendIncomingDeltaChange(o);return;},getCondenserInfo:function(o){return{affectedControl:o.getSelector(),classification:sap.ui.fl.condenser.Classification.LastOneWins,uniqueKey:o.getSelector().id+'-'+o.getDefinition().changeType};},completeChangeContent:function(o,s,p){return;},revertChange:function(o,a,p){return;}},"layers":{"CUSTOMER_BASE":true,"CUSTOMER":true,"USER":true}};return{"viewSwitch":c,"visibility":c,"position":c,"dragOrResize":c};});
