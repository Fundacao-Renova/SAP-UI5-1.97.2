/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/rta/plugin/Plugin","sap/ui/rta/plugin/RenameHandler","sap/ui/rta/Utils","sap/ui/dt/ElementOverlay","sap/ui/dt/OverlayRegistry","sap/ui/dt/OverlayUtil","sap/ui/dt/Util","sap/ui/fl/Utils","sap/ui/fl/Layer","sap/ui/fl/variants/VariantManagement","sap/ui/fl/write/api/ContextSharingAPI","sap/ui/base/ManagedObject","sap/base/Log"],function(P,R,U,E,O,a,D,f,L,V,C,M,b){"use strict";E.prototype._variantManagement=undefined;E.prototype.getVariantManagement=function(){return this._variantManagement;};E.prototype.setVariantManagement=function(k){this._variantManagement=k;};E.prototype.hasVariantManagement=function(){return!!this._variantManagement;};function d(o){var m=o.getElement().getManageDialog();if(m&&!m.bIsDestroyed){m.destroy();}}var c=P.extend("sap.ui.rta.plugin.ControlVariant",{metadata:{library:"sap.ui.rta",properties:{oldValue:"string"},associations:{},events:{}}});c.prototype.registerElementOverlay=function(o){var e=o.getElement();var v;P.prototype.registerElementOverlay.apply(this,arguments);if(e instanceof V){var A=e.getFor();var g;var h=f.getAppComponentForControl(e);var s=e.getId();v=h.getLocalId(s)||s;o.setVariantManagement(v);if(!A||(Array.isArray(A)&&A.length===0)){return;}g=!Array.isArray(A)?[A]:A;g.forEach(function(i){var j=i instanceof M?i:sap.ui.getCore().byId(i);var k=O.getOverlay(j);this._propagateVariantManagement(k,v);}.bind(this));o.attachEvent("editableChange",R._manageClickEvent,this);d(o);}else if(!o.getVariantManagement()){v=this._getVariantManagementFromParent(o);if(v){o.setVariantManagement(v);o.attachEvent("editableChange",R._manageClickEvent,this);}}};c.prototype._isPersonalizationMode=function(){return this.getCommandFactory().getFlexSettings().layer===L.USER;};c.prototype._propagateVariantManagement=function(p,v){var e=[];p.setVariantManagement(v);e=a.getAllChildOverlays(p);e.forEach(function(o){e=e.concat(this._propagateVariantManagement(o,v));}.bind(this));return e;};c.prototype._getVariantManagementFromParent=function(o){var v=o.getVariantManagement();if(!v&&o.getParentElementOverlay()){return this._getVariantManagementFromParent(o.getParentElementOverlay());}return v;};c.prototype.deregisterElementOverlay=function(o){if(this._isVariantManagementControl(o)){d(o);}o.detachEvent("editableChange",R._manageClickEvent,this);o.detachBrowserEvent("click",R._onClick,this);this.removeFromPluginsList(o);P.prototype.deregisterElementOverlay.apply(this,arguments);};c.prototype._getVariantModel=function(e){var A=f.getAppComponentForControl(e);return A?A.getModel(f.VARIANT_MODEL_NAME):undefined;};c.prototype._isEditable=function(o){if(this._isPersonalizationMode()){return false;}return this._isVariantManagementControl(o)&&this.hasStableId(o);};c.prototype._isVariantManagementControl=function(o){var e=o.getElement();var A=e.getAssociation("for");return!!(A&&e instanceof V);};c.prototype.isVariantSwitchAvailable=function(e){return this._isVariantManagementControl(e);};c.prototype.isVariantSwitchEnabled=function(e){var o=e[0];var v=[];if(this._isVariantManagementControl(o)){var g=o.getElement();var s=o.getVariantManagement?o.getVariantManagement():undefined;if(!s){return false;}var m=this._getVariantModel(g);if(m){v=m.getData()[s].variants.reduce(function(r,i){if(i.visible){return r.concat(i);}return r;},[]);}var h=v.length>1;return h;}return false;};c.prototype.setDesignTime=function(o){R._setDesignTime.call(this,o);};c.prototype.isRenameAvailable=function(e){return this._isVariantManagementControl(e);};c.prototype.isRenameEnabled=function(e){return this._isVariantManagementControl(e[0]);};c.prototype.isVariantSaveAvailable=function(e){return this._isVariantManagementControl(e);};c.prototype.isVariantSaveEnabled=function(e){var o=e[0];var g=o.getElement();var m=this._getVariantModel(g);var v=o.getVariantManagement();return m.oData[v]&&m.oData[v].modified;};c.prototype.isVariantSaveAsAvailable=function(e){return this._isVariantManagementControl(e);};c.prototype.isVariantSaveAsEnabled=function(e){return this._isVariantManagementControl(e[0]);};c.prototype.isVariantConfigureAvailable=function(e){return this._isVariantManagementControl(e);};c.prototype.isVariantConfigureEnabled=function(e){return this._isVariantManagementControl(e[0]);};c.prototype.switchVariant=function(t,n,s){var o=t.getDesignTimeMetadata();var T=t.getElement();this.getCommandFactory().getCommandFor(T,"switch",{targetVariantReference:n,sourceVariantReference:s},o).then(function(S){this.fireElementModified({command:S});}.bind(this)).catch(function(m){throw D.createError("ControlVariant#switchVariant",m,"sap.ui.rta");});};c.prototype.renameVariant=function(e){this.startEdit(e[0]);};c.prototype.startEdit=function(v){var e=v.getDesignTimeMetadata().getData().variantRenameDomRef;R.startEdit.call(this,{overlay:v,domRef:e,pluginMethodName:"plugin.ControlVariant.startEdit"});};c.prototype.stopEdit=function(r){R._stopEdit.call(this,r,"plugin.ControlVariant.stopEdit");};c.prototype.createSaveCommand=function(e){var o=e[0];var g=o.getElement();var h=o.getDesignTimeMetadata();var m=this._getVariantModel(g);var v=o.getVariantManagement();return this.getCommandFactory().getCommandFor(g,"save",{model:m},h,v).then(function(s){this.fireElementModified({command:s});}.bind(this));};c.prototype.createSaveAsCommand=function(e){var o=e[0];var g=o.getElement();var h=o.getDesignTimeMetadata();var m=this._getVariantModel(g);var v=o.getVariantManagement();var s=m.getCurrentVariantReference(v);return this.getCommandFactory().getCommandFor(g,"saveAs",{sourceVariantReference:s,model:m},h,v).then(function(S){this.fireElementModified({command:S});}.bind(this));};c.prototype._emitLabelChangeEvent=function(){var t=R._getCurrentEditableFieldText.call(this);var o=this._oEditedOverlay;var e=o.getDesignTimeMetadata();var r=o.getElement();var v=o.getVariantManagement();return this._createSetTitleCommand({text:t,element:r,designTimeMetadata:e,variantManagementReference:v}).then(function(s){this.fireElementModified({command:s});}.bind(this));};c.prototype._createSetTitleCommand=function(p){this._$oEditableControlDomRef.text(p.text);return this.getCommandFactory().getCommandFor(p.element,"setTitle",{newText:p.text},p.designTimeMetadata,p.variantManagementReference).catch(function(m){b.error("Error during rename: ",m);});};c.prototype._prepareOverlayForValueState=function(o,v){o.getValueState=function(){return"Error";};o.getValueStateText=function(){return v;};o.getDomRefForValueStateMessage=function(){return this.$();};};c.prototype.configureVariants=function(e){var o=e[0];var v=o.getElement();var s=o.getVariantManagement();var m=this._getVariantModel(v);var g=o.getDesignTimeMetadata();var F=this.getCommandFactory().getFlexSettings();m.manageVariants(v,s,F.layer,U.getRtaStyleClassName()).then(function(h){return this.getCommandFactory().getCommandFor(v,"configure",{control:v,changes:h},g,s);}.bind(this)).then(function(h){this.fireElementModified({command:h});}.bind(this)).catch(function(h){throw D.createError("ControlVariant#configureVariants",h,"sap.ui.rta");});};c.prototype.getMenuItems=function(e){var o=e[0];var m=[];if(this.isRenameAvailable(o)){m.push({id:"CTX_VARIANT_SET_TITLE",text:sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta").getText("CTX_RENAME"),handler:this.renameVariant.bind(this),enabled:this.isRenameEnabled.bind(this),rank:210,icon:"sap-icon://edit"});}if(this.isVariantSaveAvailable(o)){m.push({id:"CTX_VARIANT_SAVE",text:sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta").getText("CTX_VARIANT_SAVE"),handler:this.createSaveCommand.bind(this),enabled:this.isVariantSaveEnabled.bind(this),rank:220,icon:"sap-icon://save"});}if(this.isVariantSaveAsAvailable(o)){m.push({id:"CTX_VARIANT_SAVEAS",text:sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta").getText("CTX_VARIANT_SAVEAS"),handler:this.createSaveAsCommand.bind(this),enabled:this.isVariantSaveAsEnabled.bind(this),rank:225,icon:"sap-icon://duplicate"});}if(this.isVariantConfigureAvailable(o)){m.push({id:"CTX_VARIANT_MANAGE",text:sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta").getText("CTX_VARIANT_MANAGE"),handler:this.configureVariants.bind(this),enabled:this.isVariantConfigureEnabled.bind(this),startSection:true,rank:230,icon:"sap-icon://action-settings"});}if(this.isVariantSwitchAvailable(o)){var g=this._getVariantModel(o.getElement());var s=o.getVariantManagement();var S=g.getData()[s].variants.reduce(function(r,v){if(v.visible){var h=g.getData()[s].currentVariant===v.key;var i={id:v.key,text:v.title,icon:h?"sap-icon://accept":"blank",enabled:!h};return r.concat(i);}return r;},[]);m.push({id:"CTX_VARIANT_SWITCH_SUBMENU",text:sap.ui.getCore().getLibraryResourceBundle('sap.ui.rta').getText('CTX_VARIANT_SWITCH'),handler:function(e,p){var n=p.eventItem.getParameters().item.getProperty("key");var t=e[0];var h=g.getData()[s].currentVariant;return this.switchVariant(t,n,h);}.bind(this),enabled:this.isVariantSwitchEnabled.bind(this),submenu:S,rank:240,icon:"sap-icon://switch-views"});}return m;};c.prototype.getActionName=function(){return"controlVariant";};return c;});