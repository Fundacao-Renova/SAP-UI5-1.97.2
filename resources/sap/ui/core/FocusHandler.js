/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['../base/Object',"sap/ui/dom/containsOrEquals","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control"],function(B,c,L,q){"use strict";var F=B.extend("sap.ui.core.FocusHandler",{constructor:function(r,C){B.apply(this);this.oCore=C;this.oCurrent=null;this.oLast=null;this.aEventQueue=[];this.oLastFocusedControlInfo=null;this.oPatchingControlFocusInfo=null;this.fnEventHandler=this.onEvent.bind(this);r.addEventListener("focus",this.fnEventHandler,true);r.addEventListener("blur",this.fnEventHandler,true);L.debug("FocusHandler setup on Root "+r.type+(r.id?": "+r.id:""),null,"sap.ui.core.FocusHandler");}});F.prototype.getCurrentFocusedControlId=function(){var C=null;try{var a=q(document.activeElement);if(a.is(":focus")){C=a.control();}}catch(e){}return C&&C.length>0?C[0].getId():null;};F.prototype.getControlFocusInfo=function(C){C=C||this.getCurrentFocusedControlId();if(!C){return null;}var o=this.oCore&&this.oCore.byId(C);if(o){return{id:C,control:o,info:o.getFocusInfo(),type:o.getMetadata().getName(),focusref:o.getFocusDomRef()};}return null;};F.prototype.storePatchingControlFocusInfo=function(d){var a=document.activeElement;if(!a||!d.contains(a)){this.oPatchingControlFocusInfo=null;}else{this.oPatchingControlFocusInfo=this.getControlFocusInfo();if(this.oPatchingControlFocusInfo){this.oPatchingControlFocusInfo.patching=true;}}};F.prototype.getPatchingControlFocusInfo=function(){return this.oPatchingControlFocusInfo;};F.prototype.updateControlFocusInfo=function(C){if(C&&this.oLastFocusedControlInfo&&this.oLastFocusedControlInfo.control===C){var s=C.getId();this.oLastFocusedControlInfo=this.getControlFocusInfo(s);L.debug("Update focus info of control "+s,null,"sap.ui.core.FocusHandler");}};F.prototype.restoreFocus=function(C){var i=C||this.oLastFocusedControlInfo;if(!i){return;}var o=this.oCore&&this.oCore.byId(i.id);var f=i.focusref;if(o&&i.info&&o.getMetadata().getName()==i.type&&(i.patching||(o.getFocusDomRef()!=f&&(C||o!==i.control)))){L.debug("Apply focus info of control "+i.id,null,"sap.ui.core.FocusHandler");i.control=o;this.oLastFocusedControlInfo=i;delete this.oLastFocusedControlInfo.patching;o.applyFocusInfo(i.info);}else{L.debug("Apply focus info of control "+i.id+" not possible",null,"sap.ui.core.FocusHandler");}};F.prototype.destroy=function(e){var r=e.data.oRootRef;if(r){r.removeEventListener("focus",this.fnEventHandler,true);r.removeEventListener("blur",this.fnEventHandler,true);}this.oCore=null;};F.prototype.onEvent=function(b){var e=q.event.fix(b);L.debug("Event "+e.type+" reached Focus Handler (target: "+e.target+(e.target?e.target.id:"")+")",null,"sap.ui.core.FocusHandler");var a=(e.type=="focus"||e.type=="focusin")?"focus":"blur";this.aEventQueue.push({type:a,controlId:g(e.target)});if(this.aEventQueue.length==1){this.processEvent();}};F.prototype.processEvent=function(){var e=this.aEventQueue[0];if(!e){return;}try{if(e.type=="focus"){this.onfocusEvent(e.controlId);}else if(e.type=="blur"){this.onblurEvent(e.controlId);}}finally{this.aEventQueue.shift();if(this.aEventQueue.length>0){this.processEvent();}}};F.prototype.onfocusEvent=function(C){var o=this.oCore&&this.oCore.byId(C);if(o){this.oLastFocusedControlInfo=this.getControlFocusInfo(C);L.debug("Store focus info of control "+C,null,"sap.ui.core.FocusHandler");}this.oCurrent=C;if(!this.oLast){return;}if(this.oLast!=this.oCurrent){t(this.oLast,C,this.oCore);}this.oLast=null;};F.prototype.onblurEvent=function(C){if(!this.oCurrent){return;}this.oLast=C;this.oCurrent=null;setTimeout(this["checkForLostFocus"].bind(this),0);};F.prototype.checkForLostFocus=function(){if(this.oCurrent==null&&this.oLast!=null){t(this.oLast,null,this.oCore);}this.oLast=null;};var g=function(d){var i=q(d).closest("[data-sap-ui]").attr("id");if(i){return i;}return null;};var t=function(C,r,o){var a=C?o&&o.byId(C):null;if(a){var R=r?o.byId(r):null;var e=q.Event("sapfocusleave");e.target=a.getDomRef();e.relatedControlId=R?R.getId():null;e.relatedControlFocusInfo=R?R.getFocusInfo():null;var b=a.getUIArea();var u=null;if(b){u=o.getUIArea(b.getId());}else{var p=o.getStaticAreaRef();if(c(p,e.target)){u=o.getUIArea(p.id);}}if(u){u._handleEvent(e);}}};return F;});
