/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','sap/ui/core/Core','sap/ui/core/EnabledPropagator','sap/ui/core/message/MessageMixin','sap/m/RadioButtonGroup','sap/m/Label','sap/ui/core/library','sap/base/strings/capitalize','./RadioButtonRenderer'],function(l,C,a,E,M,R,L,c,b,d){"use strict";var T=c.TextAlign;var V=c.ValueState;var e=c.TextDirection;var f=C.extend("sap.m.RadioButton",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},selected:{type:"boolean",group:"Data",defaultValue:false},groupName:{type:"string",group:"Behavior",defaultValue:'sapMRbDefaultGroup'},text:{type:"string",group:"Appearance",defaultValue:null},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:e.Inherit},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:''},useEntireWidth:{type:"boolean",group:"Appearance",defaultValue:false},activeHandling:{type:"boolean",group:"Appearance",defaultValue:true},editable:{type:"boolean",group:"Behavior",defaultValue:true},valueState:{type:"sap.ui.core.ValueState",group:"Data",defaultValue:V.None},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:T.Begin},editableParent:{type:"boolean",group:"Behavior",defaultValue:true,visibility:"hidden"},valueStateText:{type:"string",group:"Misc",defaultValue:null,visibility:"hidden"}},events:{select:{parameters:{selected:{type:"boolean"}}}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},dnd:{draggable:true,droppable:false},designtime:"sap/m/designtime/RadioButton.designtime"}});E.call(f.prototype);M.call(f.prototype);f.prototype._groupNames={};var K={HOME:"first",END:"last",NEXT:"next",PREV:"prev"};f.prototype.onBeforeRendering=function(){this._updateGroupName(this.getGroupName());this._updateLabelProperties();};f.prototype.exit=function(){var g=this.getGroupName(),h=this._groupNames[g],G=h&&h.indexOf(this);this._iTabIndex=null;if(this._oLabel){this._oLabel.destroy();this._oLabel=null;}if(G>=-1){h.splice(G,1);}};f.prototype.ontap=function(o){if(!this.getEnabled()||!this.getEditable()){return;}var p=this.getParent();if(p instanceof R&&(!p.getEnabled()||!p.getEditable())){return;}o&&o.setMarked();this.applyFocusInfo();if(!this.getSelected()){this.setSelected(true);var t=this;setTimeout(function(){t.fireSelect({selected:true});},0);}};f.prototype.setGroupName=function(g){this._updateGroupName(g,this.getGroupName());this.setProperty("groupName",g);return this;};f.prototype.setSelected=function(s){var g=this.getGroupName(),h=this._groupNames[g],j=h&&h.length;this.setProperty("selected",s);this._updateGroupName(g);if(s&&g){for(var i=0;i<j;i++){var o=h[i];if(o instanceof f&&o!==this&&o.getSelected()){o.fireSelect({selected:false});o.setSelected(false);}}}return this;};f.prototype.ontouchstart=function(o){o.setMarked();if(this.getEnabled()&&this.getActiveHandling()){this.addStyleClass("sapMRbBTouched");}};f.prototype.ontouchend=function(){this.removeStyleClass("sapMRbBTouched");};f.prototype.onsapnext=function(o){this._keyboardHandler(K.NEXT,true);o.setMarked();return this;};f.prototype.onsapnextmodifiers=function(o){this._keyboardHandler(K.NEXT,!o.ctrlKey);o.setMarked();return this;};f.prototype.onsapprevious=function(o){this._keyboardHandler(K.PREV,true);o.setMarked();return this;};f.prototype.onsappreviousmodifiers=function(o){this._keyboardHandler(K.PREV,!o.ctrlKey);o.setMarked();return this;};f.prototype.onsaphome=function(o){this._keyboardHandler(K.HOME,true);o.setMarked();return this;};f.prototype.onsaphomemodifiers=function(o){this._keyboardHandler(K.HOME,!o.ctrlKey);o.setMarked();return this;};f.prototype.onsapend=function(o){this._keyboardHandler(K.END,true);o.setMarked();return this;};f.prototype.onsapendmodifiers=function(o){this._keyboardHandler(K.END,!o.ctrlKey);o.setMarked();return this;};f.prototype._keyboardHandler=function(p,s){if(this.getParent()instanceof R){return;}var n=this._getNextFocusItem(p);n.focus();if(s&&!n.getSelected()&&n.getEditable()&&n.getEnabled()){n.setSelected(true);setTimeout(function(){n.fireSelect({selected:true});},0);}};f.prototype.getAccessibilityInfo=function(){var B=a.getLibraryResourceBundle("sap.m");return{role:"radio",type:B.getText("ACC_CTR_TYPE_RADIO"),description:(this.getText()||"")+(this.getSelected()?(" "+B.getText("ACC_CTR_STATE_CHECKED")):(" "+B.getText("ACC_CTR_STATE_NOT_CHECKED"))),enabled:this.getEnabled(),editable:this.getEditable()};};f.prototype.getFormDoNotAdjustWidth=function(){return this.getText()?false:true;};f.prototype._getNextFocusItem=function(n){var v=this._groupNames[this.getGroupName()].filter(function(r){return(r.getDomRef()&&r.getEnabled());});var B=v.indexOf(this),i=B,g=v.length;switch(n){case K.NEXT:i=B===g-1?B:B+1;break;case K.PREV:i=B===0?0:i-1;break;case K.HOME:i=0;break;case K.END:i=g-1;break;}return v[i]||this;};f.prototype.onsapselect=function(o){o.preventDefault();this.ontap(o);};f.prototype.setTabIndex=function(t){var F=this.getFocusDomRef();this._iTabIndex=t;if(F){F.setAttribute("tabindex",t);}return this;};f.prototype.setValueStateText=function(t){return this.setProperty("valueStateText",t);};f.prototype._updateLabelProperties=function(){var o=this._getLabel();var t=this.getText();var u=this.getUseEntireWidth();this.toggleStyleClass("sapMRbHasLabel",!!t);o.setText(t).setWidth(!u?this.getWidth():"auto").setTextDirection(this.getTextDirection()).setTextAlign(this.getTextAlign());};f.prototype._getLabel=function(){if(!this._oLabel){this._oLabel=new L(this.getId()+"-label");this._oLabel.addStyleClass("sapMRbBLabel").setParent(this,null,true);}return this._oLabel;};f.prototype._updateGroupName=function(n,o){var N=this._groupNames[n],O=this._groupNames[o];if(O&&O.indexOf(this)!==-1){O.splice(O.indexOf(this),1);}if(!N){N=this._groupNames[n]=[];}if(N.indexOf(this)===-1){N.push(this);}};["editableParent"].forEach(function(p){f.prototype["_set"+b(p)]=function(v){return this.setProperty(p,v,true);};});return f;});
