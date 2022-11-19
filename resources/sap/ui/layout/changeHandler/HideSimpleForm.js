/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/util/reflection/JsControlTreeModifier","sap/base/Log"],function(J,L){"use strict";var H={};var I=function(c,m){var C=m.getControlType(c);return(C==="sap.ui.core.Title")||(C==="sap.m.Title")||(C==="sap.m.Toolbar")||(C==="sap.m.OverflowToolbar");};var g=function(c,m){var i;for(i=0;i<c.length;++i){if(I(c[i],m)){return c[i];}}return undefined;};function _(p){return p.modifier.targets==="xmlTree";}H.applyChange=function(c,C,p){var m=p.modifier;var v=p.view;var a=p.appComponent;var o=c.getDefinition();if(_(p)){return Promise.reject(Error("Change cannot be applied in XML. Retrying in JS."));}var r=m.bySelector(o.content.elementSelector||o.content.sHideId,a,v);var b;return this._getState(C,m,a).then(function(s){c.setRevertData(s);return m.getAggregation(C,"content");}).then(function(A){b=A;return m.removeAllAggregation(C,"content");}).then(function(){return b.reduce(function(P,d,i){return P.then(m.insertAggregation.bind(m,C,"content",d,i,v));},Promise.resolve());}).then(function(){var s=-1;if(o.changeType==="hideSimpleFormField"){b.some(function(F,i){if(F===r){s=i;m.setVisible(F,false);}if(s>=0&&i>s){if((m.getControlType(F)==="sap.m.Label")||(m.getControlType(F)==="sap.ui.comp.smartfield.SmartLabel")||I(F,m)){return true;}else{m.setVisible(F,false);}}});}else if(o.changeType==="removeSimpleFormGroup"){var P=[];var t=g(b,m);var f=t&&!r;b.some(function(F,i){if(!t){m.setVisible(F,false);}else if(f){s=0;m.setVisible(F,false);f=false;}else{if(F===r){s=i;}if(s>=0&&i>s){if(I(F,m)){if(s===0){P.push(function(){return Promise.resolve().then(m.removeAggregation.bind(m,C,"content",F,v));});P.push(function(){return Promise.resolve().then(m.insertAggregation.bind(m,C,"content",F,0,v));});}return true;}else{m.setVisible(F,false);}}}});if(r){P.push(function(){return Promise.resolve().then(m.removeAggregation.bind(m,C,"content",r,v));});P.push(function(){return Promise.resolve().then(m.insertAggregation.bind(m,C,"dependents",r,0,v));});}if(P.length>0){return P.reduce(function(d,e){return d.then(e);},Promise.resolve());}}return Promise.resolve();}).catch(function(e){c.resetRevertData();L.error(e.message||e.name);});};H._getStableElement=function(e){if(e.getMetadata().getName()==="sap.ui.layout.form.FormContainer"){return e.getTitle()||e.getToolbar();}else if(e.getMetadata().getName()==="sap.ui.layout.form.FormElement"){return e.getLabel();}else{return e;}};H.completeChangeContent=function(c,s,p){var C=c.getDefinition();if(s.removedElement&&s.removedElement.id){var S=this._getStableElement(sap.ui.getCore().byId(s.removedElement.id));C.content.elementSelector=J.getSelector(S,p.appComponent);c.addDependentControl(S,"elementSelector",p);}else{throw new Error("oSpecificChangeInfo.removedElement.id attribute required");}};H._getState=function(c,m,a){return Promise.resolve().then(function(){return m.getAggregation(c,"content");}).then(function(C){if(!C){return Promise.reject(new Error("Cannot get control state: 'content' aggregation doesn't exist"));}return{content:C.map(function(e){return{elementSelector:m.getSelector(m.getId(e),a),visible:e.getVisible?e.getVisible():undefined,index:C.indexOf(e)};})};});};H.revertChange=function(c,C,p){var s=c.getRevertData();var a=p.appComponent;var m=p.modifier;return Promise.resolve().then(m.removeAllAggregation.bind(m,C,"content")).then(function(){return s.content.reduce(function(P,e){var E=m.bySelector(e.elementSelector,a,p.view);var b=m.getId(E);return P.then(m.getAggregation.bind(m,C,"dependents")).then(function(d){var o=Promise.resolve();d.some(function(D){var f=m.getId(D);if(f===b){o=o.then(m.removeAggregation.bind(m,C,"dependents",D,p.view));return true;}});return o;}).then(m.insertAggregation.bind(m,C,"content",E,e.index,p.view)).then(function(){m.setProperty(E,"visible",e.visible);});},Promise.resolve()).then(function(){c.resetRevertData();});});};H.getChangeVisualizationInfo=function(c,a){var s=c.getDefinition().content.elementSelector;var e=J.bySelector(s,a);var d=c.getChangeType()==="removeSimpleFormGroup"?e.getParent().getId():e.getParent().getParent().getId();return{affectedControls:[s],displayControls:[d]};};return H;},true);