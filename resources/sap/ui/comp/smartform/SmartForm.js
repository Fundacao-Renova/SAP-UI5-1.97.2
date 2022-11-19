/*
 * ! SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */
sap.ui.define(['sap/ui/comp/library','sap/ui/core/Control','sap/ui/core/theming/Parameters','sap/ui/layout/form/Form','sap/ui/base/ManagedObjectObserver','sap/base/Log'],function(l,C,t,F,M,L){"use strict";var P;var T;var O;var a;var b;var B;var c;var m;var S=l.smartform.SmartFormValidationMode;var I=l.smartform.Importance;var f={ResponsiveGridLayout:{layout:undefined,path:"sap/ui/layout/form/ResponsiveGridLayout",name:"sap.ui.layout.form.ResponsiveGridLayout",requested:false,loaded:j1,promise:undefined},ResponsiveLayout:{layout:undefined,path:"sap/ui/layout/form/ResponsiveLayout",name:"sap.ui.layout.form.ResponsiveLayout",requested:false,loaded:k1,promise:undefined},ColumnLayout:{layout:undefined,path:"sap/ui/layout/form/ColumnLayout",name:"sap.ui.layout.form.ColumnLayout",requested:false,loaded:l1,promise:undefined}};var s={apiVersion:2,render:function(i,j){i.openStart("div",j);i.class("sapUiCompSmartForm");i.openEnd();var k=j.getAggregation("content");i.renderControl(k);i.close("div");}};var d=C.extend("sap.ui.comp.smartform.SmartForm",{metadata:{library:"sap.ui.comp",designtime:"sap/ui/comp/designtime/smartform/SmartForm.designtime",properties:{title:{type:"string",group:"Misc",defaultValue:null},useHorizontalLayout:{type:"boolean",group:"Misc",defaultValue:null},horizontalLayoutGroupElementMinWidth:{type:"int",group:"Misc",defaultValue:null},checkButton:{type:"boolean",group:"Misc",defaultValue:false},entityType:{type:"string",group:"Misc",defaultValue:null},expandable:{type:"boolean",group:"Misc",defaultValue:false},expanded:{type:"boolean",group:"Misc",defaultValue:null},editTogglable:{type:"boolean",group:"Misc",defaultValue:false},editable:{type:"boolean",group:"Misc",defaultValue:false},ignoredFields:{type:"string",group:"Misc",defaultValue:null},flexEnabled:{type:"boolean",group:"Misc",defaultValue:true},validationMode:{type:"sap.ui.comp.smartform.SmartFormValidationMode",group:"Misc",defaultValue:S.Standard},importance:{type:"sap.ui.comp.smartform.Importance",group:"Misc",defaultValue:I.Low}},defaultAggregation:"groups",aggregations:{groups:{type:"sap.ui.comp.smartform.Group",multiple:true,singularName:"group"},content:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},layout:{type:"sap.ui.comp.smartform.SmartFormLayout",multiple:false},semanticObjectController:{type:"sap.ui.comp.navpopover.SemanticObjectController",multiple:false},customToolbar:{type:"sap.m.Toolbar",multiple:false},toolbar:{type:"sap.m.Toolbar",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{editToggled:{parameters:{editable:{type:"boolean"}}},checked:{parameters:{erroneousFields:{type:"sap.ui.comp.smartfield.SmartField[]"}}}}},renderer:s});d.prototype.init=function(){this._oForm=new F(this.getId()+"--Form");this._oForm.getToolbar=function(){var i=this.getParent();if(i&&!i.getExpandable()){return i._getToolbar();}};this.setAggregation("content",this._oForm);this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp");this._oObserver=new M(o.bind(this));this._oObserver.observe(this,{properties:["editTogglable","title","checkButton","useHorizontalLayout","horizontalLayoutGroupElementMinWidth","expandable","expanded"],aggregations:["layout","customData"],associations:["ariaLabelledBy"]});};d.prototype.onBeforeRendering=function(){h1.call(this);};d.prototype.onAfterRendering=function(){var i=this.getSmartFields(false,false),j=this.getImportance();if(!this.isPropertyInitial("importance")){i.forEach(function(k){k._setVisibilityBasedOnImportance(j);});}};d.prototype.addGroup=function(i){var j=this,k,s1,t1;if(!i){return this;}t1=this._getSmartFieldsByGroup(i,false);t1.forEach(function(u1){k=u1.setImportance;u1.setImportance=function(){k.apply(this,arguments);s1=j.getImportance();this._setVisibilityBasedOnImportance(s1);};});i=this.validateAggregation("groups",i,true);G.call(this,i);this._oForm.addFormContainer(i);_.call(this,i);return this;};d.prototype.getGroups=function(){return this._oForm.getFormContainers();};d.prototype.indexOfGroup=function(i){return this._oForm.indexOfFormContainer(i);};d.prototype.insertGroup=function(i,j){if(!i){return this;}i=this.validateAggregation("groups",i,true);G.call(this,i);this._oForm.insertFormContainer(i,j);_.call(this,i);return this;};d.prototype.removeGroup=function(i){var j=this._oForm.removeFormContainer(i);if(j){j.detachEvent("_visibleChanged",o1,this);J.call(this,j);o1.call(this);}return j;};d.prototype.removeAllGroups=function(){var j=this._oForm.removeAllFormContainers();for(var i=0;i<j.length;i++){j[i].detachEvent("_visibleChanged",o1,this);J.call(this,j[i]);}o1.call(this);return j;};d.prototype.destroyGroups=function(){var j=this.getGroups();for(var i=0;i<j.length;i++){j[i].detachEvent("_visibleChanged",o1,this);}this._oForm.destroyFormContainers();o1.call(this);return this;};function _(i){var j=this.getUseHorizontalLayout();var k=this.getHorizontalLayoutGroupElementMinWidth();i.attachEvent("_visibleChanged",o1,this);if(k!=i.getHorizontalLayoutGroupElementMinWidth){i.setHorizontalLayoutGroupElementMinWidth(k);}if(j!=i.getUseHorizontalLayout()){i.setUseHorizontalLayout(j);}if(j){i._updateGridDataSpan();i._updateLineBreaks();}else{o1.call(this);}}d.prototype._getToolbar=function(){var i=this.getCustomToolbar();return i||this.getAggregation("toolbar");};d.prototype.propagateGridDataSpan=function(){var j=this.getGroups();for(var i=0;i<j.length;i++){var k=j[i];k._updateGridDataSpan();k._updateLineBreaks();}return this;};d.prototype._getGridDataSpanNumbers=function(){var i=this.getLayout();var j;if(i&&i._getGridDataSpanNumbers){j=i._getGridDataSpanNumbers();}return j;};d.prototype._toggleEditMode=function(){var i=this.getEditable();this.setEditable(!i);};d.prototype.check=function(i){var j={considerOnlyVisible:true,handleSuccess:false};if(typeof i==="boolean"){j.considerOnlyVisible=i;}else{j=Object.assign(j,i);}if(this.getValidationMode()===S.Standard){return this._checkClientError(j);}else{return this._checkClientErrorAsync(j);}};d.prototype._checkClientError=function(i){if(i.considerOnlyVisible===undefined){i.considerOnlyVisible=true;}var j=this.getSmartFields(i.considerOnlyVisible,i.considerOnlyVisible);var k=[];var s1=null;j.forEach(function(t1){if(t1.checkClientError({handleSuccess:i.handleSuccess})){if(i.considerOnlyVisible&&t1.getVisible){if(!t1.getVisible()){return;}}s1=t1.getParent();while(s1.getParent){s1=s1.getParent();if(s1.isA("sap.ui.comp.smartform.Group")){if(!s1.getExpanded()){s1.setExpanded(true);}break;}}k.push(t1.getId());}});return k;};d.prototype._checkClientErrorAsync=function(i){var j=this.getSmartFields(i.considerOnlyVisible,i.considerOnlyVisible),k,s1=[],t1;this.setBusy(true);if(i.considerOnlyVisible===undefined){i.considerOnlyVisible=true;}k=j.map(function(u1){if(i.considerOnlyVisible&&!u1.getVisible()){return false;}return u1.checkValuesValidity({handleSuccess:i.handleSuccess}).catch(function(){t1=u1.getParent();while(t1.getParent){t1=t1.getParent();if(t1.isA("sap.ui.comp.smartform.Group")){if(!t1.getExpanded()){t1.setExpanded(true);}break;}}s1.push(u1.getId());});});return Promise.all(k).then(function(){this.setBusy(false);return s1;}.bind(this));};d.prototype._displayError=function(i){var j=this._oRb.getText("FORM_CLIENT_CHECK_ERROR_TITLE");var k=this._oRb.getText("FORM_CLIENT_CHECK_ERROR");if(!c&&!this._bMessageBoxRequested){c=sap.ui.require("sap/m/MessageBox");if(!c){sap.ui.require(["sap/m/MessageBox"],e.bind(this));this._bMessageBoxRequested=true;}}if(c){c.show(k,{icon:c.Icon.ERROR,title:j,styleClass:(this.$()&&this.$().closest(".sapUiSizeCompact").length)?"sapUiSizeCompact":""});}};function e(i){c=i;this._bMessageBoxRequested=false;if(!this._bIsBeingDestroyed){g.call(this);}}function g(){var i=this.check(true);if(i&&i.length>0){this._displayError(i);return true;}return false;}function h(){return this.check(true).then(function(i){if(i&&i.length){this._displayError(i);}return i;}.bind(this));}d.prototype.setEditable=function(i){var j=this.getEditable();i=this.validateProperty("editable",i);if(j===i){return this;}if(!i&&this.hasListeners("editToggled")){if(this.getValidationMode()===S.Standard){if(g.call(this)){return this;}}else{h.call(this).then(function(k){if(k.length){return this.setProperty("editable",true);}n.call(this,i);}.bind(this));return this.setProperty("editable",i);}}this.setProperty("editable",i);n.call(this,i);return this;};function n(i){if(this._oForm){this._oForm.setEditable(i);}this.fireEditToggled({editable:i});if(this._oEditToggleButton){this._oEditToggleButton.setIcon(i?"sap-icon://display":"sap-icon://edit");var j=this._oRb.getText(i?"FORM_TOOLTIP_DISPLAY":"FORM_TOOLTIP_EDIT");this._oEditToggleButton.setTooltip(j);}if(this.getCheckButton()&&i){a1.call(this);}else{b1.call(this);}}function o(i){if(i.object==this){if(i.name=="editTogglable"){p.call(this,i.current);}else if(i.name=="title"){q.call(this,i.current);}else if(i.name=="checkButton"){r.call(this,i.current);}else if(i.name=="useHorizontalLayout"){u.call(this,i.current);}else if(i.name=="horizontalLayoutGroupElementMinWidth"){w.call(this,i.current);}else if(i.name=="expanded"){D.call(this,i.current);}else if(i.name=="expandable"){x.call(this,i.current);}else if(i.name=="layout"){v.call(this,i.child,i.mutation);}else if(i.name=="customData"){E.call(this,i.child,i.mutation);}else if(i.name=="ariaLabelledBy"){K.call(this,i.ids,i.mutation);}}else if(i.object.isA("sap.ui.comp.smartform.SmartFormLayout")){r1.call(this,i.object,i.name,i.current,i.old);}}function p(i){if(i){Z.call(this);}else{$.call(this);}R.call(this);}function q(i){if(this._oPanel){this._oPanel.setHeaderText(i);}R.call(this);}function r(i){if(i){a1.call(this);}else{b1.call(this);}R.call(this);}function u(i){if(i){this.addStyleClass("sapUiCompSmartFormHorizontalLayout");}else{this.removeStyleClass("sapUiCompSmartFormHorizontalLayout");}var j=this.getGroups();if(j){j.forEach(function(s1){if(s1.getUseHorizontalLayout()!=i){s1.setUseHorizontalLayout(i);}});}var k=this.getLayout();if(i){m1.call(this,k);}else{h1.call(this);m1.call(this,k);}}function v(i,j){if(j==="remove"){this._oObserver.unobserve(i);}else{this._oObserver.observe(i,{properties:true});}if(i.isA("sap.ui.comp.smartform.Layout")){this.propagateGridDataSpan();}h1.call(this);m1.call(this,j==="insert"?i:null);}function w(i){L.error("HorizontalLayoutGroupElementMinWidth is deprecated",this);var j=this.getGroups();if(j){j.forEach(function(k){k.setHorizontalLayoutGroupElementMinWidth(i);});}}d.prototype.getVisibleProperties=function(){var i=[];var j=this.getGroups();if(j){j.forEach(function(k){var s1=k.getGroupElements();if(s1.length>0){s1.forEach(function(t1){var u1=t1.getElements();if(u1.length>0){u1.forEach(function(v1){if(v1.getVisible()){var w1=v1.getBindingPath("value");if(w1){i.push(w1);}}});}});}});}return i;};d.prototype.setCustomToolbar=function(i){var j=this.getCustomToolbar();if(j==i){return this;}W.call(this);$.call(this);b1.call(this);this.setAggregation("customToolbar",i);if(this.getTitle()){R.call(this);}if(this.getEditTogglable()){Z.call(this);}if(this.getCheckButton()){a1.call(this);}return this;};d.prototype.destroyCustomToolbar=function(){var i=this.getCustomToolbar();if(i){W.call(this);$.call(this);b1.call(this);}this.destroyAggregation("customToolbar");if(this.getTitle()){R.call(this);}if(this.getEditTogglable()){Z.call(this);}if(this.getCheckButton()){a1.call(this);}return this;};function x(i){if(i){if(!P&&!this._bPanelRequested){P=sap.ui.require("sap/m/Panel");if(!P){sap.ui.require(["sap/m/Panel"],z.bind(this));this._bPanelRequested=true;}}if(P){y.call(this);}}else if(this._oPanel){this.setAggregation("content",this._oForm);this._oPanel.destroy();this._oPanel=null;}R.call(this);}function y(){this._oPanel=new P(this.getId()+"--Panel",{expanded:this.getExpanded(),expandable:true,headerText:this.getTitle(),expandAnimation:false});this._oPanel.getHeaderToolbar=function(){var i=this.getParent();if(i){return i._getToolbar();}};this._oPanel.attachExpand(A,this);this.setAggregation("content",this._oPanel);this._oPanel.addContent(this._oForm);}function z(i){P=i;this._bPanelRequested=false;if(this.getExpandable()&&!this._bIsBeingDestroyed){y.call(this);}}function A(i){this.setProperty("expanded",i.getParameter("expand"),true);}function D(i){if(this._oPanel){this._oPanel.setExpanded(i);}}function E(j,k){var s1=this.getGroups();for(var i=0;i<s1.length;i++){if(k==="insert"){H.call(this,s1[i],j);}else{J.call(this,s1[i],j.getId());}}}function G(j){var k=this.getCustomData();for(var i=0;i<k.length;i++){H.call(this,j,k[i]);}}function H(i,j){if(l.smartform.inheritCostomDataToFields(j)){var k=j.clone();k._bFromSmartForm=true;k._sOriginalId=j.getId();i.addCustomData(k);}}function J(j,k){var s1=j.getCustomData();for(var i=0;i<s1.length;i++){var t1=s1[i];if(t1._bFromSmartForm&&(!k||k==t1._sOriginalId)){j.removeCustomData(t1);}}}function K(j,k){var s1;if(Array.isArray(j)){s1=j;}else{s1=[j];}for(var i=0;i<s1.length;i++){var t1=s1[i];if(k==="insert"){this._oForm.addAriaLabelledBy(t1);}else{this._oForm.removeAriaLabelledBy(t1);}}}d.prototype._getSmartFieldsByGroup=function(i,s1){var t1=[],u1=[],v1=[];t1=i.getGroupElements();for(var j=0;j<t1.length;j++){var w1=t1[j];if(!s1||(s1&&w1.isVisible())){u1=w1.getElements();for(var k=0;k<u1.length;k++){var x1=u1[k];if(x1.isA("sap.ui.comp.smartfield.SmartField")){v1.push(x1);}}}}return v1;};d.prototype.getSmartFields=function(j,k){var s1=[],t1,u1=[];if(j===undefined){j=true;}s1=this.getGroups();for(var i=0;i<s1.length;i++){var v1=s1[i];if(!j||(j&&v1.isVisible())){t1=this._getSmartFieldsByGroup(v1,k);u1=u1.concat(t1);}}return u1;};d.prototype.setFocusOnEditableControl=function(){var i=[];this.getGroups().forEach(function(j){if(j.isVisible()){j.getGroupElements().forEach(function(k){if(k.isVisible()){i=i.concat(k.getElements());}});}});i.some(function(j){if(j.getEditable&&j.getEditable()&&j.focus&&j.getVisible()){if(j.isA("sap.ui.comp.smartfield.SmartField")){j.attachEventOnce("innerControlsCreated",function(k){setTimeout(k.oSource._oControl[k.oSource._oControl.current]["focus"].bind(k.oSource._oControl[k.oSource._oControl.current]),0);});}else{j.focus();}return true;}});};d.prototype.clone=function(j,k){this.setAggregation("content",null);var s1=this.getAggregation("toolbar");var t1=this.getCustomToolbar();var u1=this.getCustomData();var v1=this.getGroups();var i=0;if(t1){W.call(this);$.call(this);b1.call(this);}else if(s1){this.setAggregation("toolbar",null);}if(u1.length>0){for(i=0;i<v1.length;i++){J.call(this,v1[i]);}}var w1=C.prototype.clone.apply(this,arguments);for(i=0;i<v1.length;i++){var x1=v1[i].clone(j,k);w1.addGroup(x1);}if(this.getExpandable()&&this._oPanel){this.setAggregation("content",this._oPanel);}else{this.setAggregation("content",this._oForm);}if(t1){if(this.getTitle()){R.call(this);}if(this.getEditTogglable()){Z.call(this);}if(this.getCheckButton()){a1.call(this);}}else if(s1){this.setAggregation("toolbar",s1);}if(u1.length>0){for(i=0;i<v1.length;i++){G.call(this,v1[i]);}}return w1;};d.prototype.exit=function(){if(this._oForm){this._oForm.destroy();}if(this._oPanel){this._oPanel.destroy();}if(this._oTitle){this._oTitle.destroy();}if(this._oEditToggleButton){this._oEditToggleButton.destroy();}this._oForm=null;this._oPanel=null;this._oTitle=null;this._oRb=null;this._oEditToggleButton=null;this._oObserver.disconnect();this._oObserver=undefined;};function N(){var i=this.getAggregation("toolbar");if(!i){i=new O(this.getId()+"-toolbar-sfmain",{"height":"3rem","design":m.ToolbarDesign.Transparent});i._bCreatedBySmartForm=true;this.setAggregation("toolbar",i);}return i;}function Q(i){var j=this.getAggregation("toolbar");if(j){if(i){var k=j.getContent();if(k.length>0){return;}}this.destroyAggregation("toolbar");}}function R(){var i=this.getTitle();if(i){if(!this.getCustomToolbar()&&!this.getCheckButton()&&!this.getEditTogglable()){if(this._oTitle){if(this._getToolbar()){W.call(this);}this._oForm.removeAriaLabelledBy(this._oTitle);this._oTitle.destroy();this._oTitle=null;}this._oForm.setTitle(i);}else{this._oForm.setTitle();if(!this._oTitle){if((!T||!O||!a||!b||!m)&&!this._bTitleRequested){T=sap.ui.require("sap/m/Title");O=sap.ui.require("sap/m/OverflowToolbar");a=sap.ui.require("sap/m/ToolbarSpacer");b=sap.ui.require("sap/m/ToolbarSeparator");m=sap.ui.require("sap/m/library");if(!T||!O||!a||!b||!m){sap.ui.require(["sap/m/Title",'sap/m/OverflowToolbar','sap/m/ToolbarSpacer','sap/m/ToolbarSeparator',"sap/m/library"],U.bind(this));this._bTitleRequested=true;}}if(T&&!this._bTitleRequested){var j=t.get('sap.ui.layout.FormLayout:_sap_ui_layout_FormLayout_FormTitleSize');this._oTitle=new T(this.getId()+"-title-sfmain",{level:j.toUpperCase()});}}if(this._oTitle){this._oTitle.setText(i);this._oForm.addAriaLabelledBy(this._oTitle);V.call(this);}}}else{if(this._oTitle){W.call(this);this._oForm.removeAriaLabelledBy(this._oTitle);this._oTitle.destroy();this._oTitle=null;}else{this._oForm.setTitle();}}}function U(i,j,k,s1,t1){T=i;O=j;a=k;b=s1;m=t1;this._bTitleRequested=false;if(!this._bIsBeingDestroyed){R.call(this);}}function V(){if(!this._oTitle){return;}var i=this._getToolbar();if(!i){i=N.call(this);}i.insertContent(this._oTitle,0);}function W(){if(!this._oTitle){return;}var i=this._getToolbar();i.removeContent(this._oTitle);Q.call(this,true);}function X(){if((!B||!O||!a||!b||!m)&&!this._bButtonRequested){B=sap.ui.require("sap/m/Button");O=sap.ui.require("sap/m/OverflowToolbar");a=sap.ui.require("sap/m/ToolbarSpacer");b=sap.ui.require("sap/m/ToolbarSeparator");m=sap.ui.require("sap/m/library");if(!B||!O||!a||!b||!m){sap.ui.require(["sap/m/Button",'sap/m/OverflowToolbar','sap/m/ToolbarSpacer','sap/m/ToolbarSeparator',"sap/m/library"],Y.bind(this));this._bButtonRequested=true;}}if(B&&!this._bButtonRequested){return true;}return false;}function Y(i,j,k,s1,t1){B=i;O=j;a=k;b=s1;m=t1;this._bButtonRequested=false;if(!this._bIsBeingDestroyed){if(this._bEditRequested){this._bEditRequested=false;Z.call(this);}if(this._bCheckRequested){this._bCheckRequested=false;a1.call(this);}}}function Z(){if(!this.getEditTogglable()){return;}if(!X.call(this)){this._bEditRequested=true;return;}var i=this._getToolbar();if(!i){i=N.call(this);}if(!this._oCheckButton){e1.call(this,i);}if(!this._oEditToggleButton){var j=this.getEditable()?"sap-icon://display":"sap-icon://edit";var k=this._oRb.getText(this.getEditable()?"FORM_TOOLTIP_DISPLAY":"FORM_TOOLTIP_EDIT");this._oEditToggleButton=new B(i.getId()+"-button-sfmain-editToggle",{icon:j,tooltip:k});this._oEditToggleButton.attachPress(this._toggleEditMode,this);}var s1=i.getContent().length;if(this._oCheckButton){s1--;}i.insertContent(this._oEditToggleButton,s1);}function $(){if(!this._oEditToggleButton){return;}var i=this._getToolbar();i.removeContent(this._oEditToggleButton);this._oEditToggleButton.destroy();this._oEditToggleButton=null;f1.call(this,i);Q.call(this,true);}function a1(){if(!this.getCheckButton()||!this.getEditable()){return;}if(!X.call(this)){this._bCheckRequested=true;return;}var i=this._getToolbar();if(!i){i=N.call(this);}if(!this._oEditToggleButton){e1.call(this,i);}if(!this._oCheckButton){this._oCheckButton=new B(this.getId()+"-"+i.getId()+"-button-sfmain-check",{text:this._oRb.getText("SMART_FORM_CHECK")});this._oCheckButton.attachPress((this.getValidationMode()===S.Standard)?c1:d1,this);}var j=i.getContent().length;i.insertContent(this._oCheckButton,j);}function b1(){if(!this._oCheckButton){return;}var i=this._getToolbar();i.removeContent(this._oCheckButton);this._oCheckButton.destroy();this._oCheckButton=null;f1.call(this,i);Q.call(this,true);}function c1(i){var j=[];j=this.check(true);this.fireChecked({erroneousFields:j});}function d1(i){this.check(true).then(function(j){this.fireChecked({erroneousFields:j});}.bind(this));}function e1(j){var k;if(!j._bCreatedBySmartForm){var s1=j.getContent();var t1=false;for(var i=0;i<s1.length;i++){if(s1[i]instanceof a){t1=true;break;}}if(!t1){k=new a(this.getId()+"-"+j.getId()+"-spacer");k._bCreatedBySmartForm=true;j.addContent(k);}if(!(s1[s1.length-1]instanceof b)){var u1=new b(this.getId()+"-"+j.getId()+"-separator");u1._bCreatedBySmartForm=true;j.addContent(u1);}}else{k=new a(j.getId()+"-spacer");k._bCreatedBySmartForm=true;j.addContent(k);}}function f1(i){var j=i.getContent();var k;if(!i._bCreatedBySmartForm){k=j[j.length-1];if(k instanceof b&&k._bCreatedBySmartForm){k.destroy();}j=i.getContent();}k=j[j.length-1];if(k instanceof a&&k._bCreatedBySmartForm){k.destroy();}}function g1(i,j){if(!i.layout&&!i.requested){i.layout=sap.ui.require(i.path);if(!i.layout){i.promise=new Promise(function(k){sap.ui.require([i.path],i.loaded.bind(this));i.resolve=k;i.requestIds=[this.getId()];}.bind(this));i.requested=true;}}else if(!i.layout&&i.requested&&i.promise&&i.requestIds.indexOf(this.getId())<0){i.promise.then(function(){if(!this._bIsBeingDestroyed){h1.call(this);}}.bind(this));i.requestIds.push(this.getId());}if(i.layout&&!i.requested&&!(j instanceof i.layout)){if(j){j.destroy();}j=new i.layout(this._oForm.getId()+"-layout");this._oForm.setLayout(j);return true;}return false;}function h1(){var j=this.getLayout();var k=this._oForm.getLayout();var s1=this.getUseHorizontalLayout();var t1=false;if(j&&j.isA("sap.ui.comp.smartform.ColumnLayout")){if(s1){throw new Error("ColumnLayout and useHorizontalLayout must not ne used at the same time on "+this);}t1=g1.call(this,f.ColumnLayout,k);if(t1){q1.call(this,j);}}else if(s1&&(!j||!j.getGridDataSpan())){t1=g1.call(this,f.ResponsiveLayout,k);}else if(!k||!f.ResponsiveGridLayout.layout||!(k instanceof f.ResponsiveGridLayout.layout)){t1=g1.call(this,f.ResponsiveGridLayout,k);if(t1){this._oFormLayoutNotInitial=true;n1.call(this,j);}}if(t1){var u1=this.getGroups();for(var i=0;i<u1.length;i++){var v1=u1[i];v1._updateLayoutData();}}}function i1(i,j){i.layout=j;i.requested=false;i.resolve();delete i.resolve;delete i.requestIds;i.promise=undefined;if(!this._bIsBeingDestroyed){h1.call(this);}}function j1(i){i1.call(this,f.ResponsiveGridLayout,i);}function k1(i){i1.call(this,f.ResponsiveLayout,i);}function l1(i){i1.call(this,f.ColumnLayout,i);}function m1(i){if(!i||i.isA("sap.ui.comp.smartform.Layout")){n1.call(this,i);}else if(i.isA("sap.ui.comp.smartform.ColumnLayout")){q1.call(this,i);}}function n1(i){var j=this._oForm.getLayout();if(!j||!j.isA(f.ResponsiveGridLayout.name)){return;}if(this.getUseHorizontalLayout()){if(i&&i.getGridDataSpan()){p1.call(this,j);j.setColumnsL(1);j.setColumnsM(1);if(i.getBreakpointM()>0){j.setBreakpointM(i.getBreakpointM());}if(i.getBreakpointL()>0){j.setBreakpointL(i.getBreakpointL());}if(i.getBreakpointXL()>0){j.setBreakpointXL(i.getBreakpointXL());}this._oFormLayoutNotInitial=true;}}else{if(i){j.setLabelSpanXL(i.getLabelSpanXL()?i.getLabelSpanXL():-1);j.setLabelSpanL(i.getLabelSpanL()?i.getLabelSpanL():4);j.setLabelSpanM(i.getLabelSpanM()?i.getLabelSpanM():4);j.setLabelSpanS(i.getLabelSpanS()?i.getLabelSpanS():12);j.setEmptySpanXL(i.getEmptySpanXL()?i.getEmptySpanXL():-1);j.setEmptySpanL(i.getEmptySpanL()?i.getEmptySpanL():0);j.setEmptySpanM(i.getEmptySpanM()?i.getEmptySpanM():0);j.setColumnsXL(i.getColumnsXL()?i.getColumnsXL():-1);j.setColumnsL(i.getColumnsL()?i.getColumnsL():3);j.setColumnsM(i.getColumnsM()?i.getColumnsM():2);j.setSingleContainerFullSize(i.getSingleGroupFullSize());j.setBreakpointXL(i.getBreakpointXL()?i.getBreakpointXL():1440);j.setBreakpointL(i.getBreakpointL()?i.getBreakpointL():1024);j.setBreakpointM(i.getBreakpointM()?i.getBreakpointM():600);this._oFormLayoutNotInitial=true;}else{p1.call(this,j);}o1.call(this,i,j);}}function o1(j,k){if(this.getUseHorizontalLayout()){return;}if(!k){k=this._oForm.getLayout();j=this.getLayout();}if(!k||!k.isA(f.ResponsiveGridLayout.name)){return;}var s1=this.getGroups();var t1=-1;var u1=3;var v1=true;var w1=0;for(var i=0;i<s1.length;i++){if(s1[i].isVisible()){w1++;}}if(j){u1=j.getColumnsL()?j.getColumnsL():3;t1=(j.getColumnsXL()>0)?j.getColumnsXL():-1;v1=j.getSingleGroupFullSize();}if(s1&&w1>0&&w1<t1&&v1){k.setColumnsXL(w1);}else if(k.getColumnsXL()!=t1){k.setColumnsXL(t1);}if(s1&&w1>0&&w1<u1&&v1){k.setColumnsL(w1);}else if(k.getColumnsL()!=u1){k.setColumnsL(u1);}}function p1(i){if(this._oFormLayoutNotInitial){i.setLabelSpanXL(-1);i.setLabelSpanL(4);i.setLabelSpanM(4);i.setLabelSpanS(12);i.setEmptySpanXL(-1);i.setEmptySpanL(0);i.setEmptySpanM(0);i.setColumnsXL(-1);i.setColumnsL(3);i.setColumnsM(2);i.setSingleContainerFullSize(true);i.setBreakpointXL(1440);i.setBreakpointL(1024);i.setBreakpointM(600);this._oFormLayoutNotInitial=false;}}function q1(i){var j=this._oForm.getLayout();if(!j||!j.isA(f.ColumnLayout.name)){return;}if(this.getUseHorizontalLayout()){throw new Error("ColumnLayout and useHorizontalLayout must not ne used at the same time on "+this);}else{j.setColumnsXL(i.getColumnsXL());j.setColumnsL(i.getColumnsL());j.setColumnsM(i.getColumnsM());j.setLabelCellsLarge(i.getLabelCellsLarge());j.setEmptyCellsLarge(i.getEmptyCellsLarge());}}function r1(i,j,k,s1){m1.call(this,i);if(j==="gridDataSpan"){this.propagateGridDataSpan();if(k===""||s1===""){h1.call(this);}}}d.prototype._suggestTitleId=function(i){this._oForm._suggestTitleId(i);return this;};return d;});
