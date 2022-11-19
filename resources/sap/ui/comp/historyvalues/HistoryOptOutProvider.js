/*
 * ! SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/Core","sap/ui/core/IconPool","./HistoryGlobalDataService","./Constants","./Utils","sap/m/Dialog","sap/m/MessageBox","sap/m/FlexBox","sap/m/VBox","sap/m/HBox","sap/m/Switch","sap/m/Button","sap/m/Label"],function(B,C,I,H,a,b,D,M,F,V,c,S,d,L){"use strict";var i;var e=B.extend("sap.ui.comp.historyvalues.HistoryOptOutProvider",{metadata:{library:"sap.ui.comp"},constructor:function(){B.apply(this,arguments);this._initialize();}});e.prototype._initialize=function(){this._oRB=C.getLibraryResourceBundle("sap.ui.comp");this._oHistoryGlobalDataService=H.getInstance();this._oDialog=null;this._oHistoryEnabledSwitch=null;this._oHistoryEnabledLabel=null;this._oDeleteHistoryButton=null;this._oDeleteHistoryLabel=null;this._oSaveButton=null;this._oCancelButton=null;this._oDialogLayout=null;this._oHistoryEnabledLayout=null;this._oDeleteHistoryLayout=null;};e.prototype._createOptOutUserProfileEntry=function(){var r=sap.ushell.Container.getRenderer("fiori2"),A={controlType:"sap.m.Button",oControlProperties:{id:a.getHistoryPrefix()+"optOut.trigger",text:this._oRB.getText("HISTORY_SETTING_TITLE"),icon:I.getIconURI("history"),press:function(){this._createDialogContent();this._createLayouts();this._createDialog();this._oHistoryGlobalDataService.getHistoryEnabled().then(function(E){this._oHistoryEnabledSwitch.setState(E);this._oDialog.open();}.bind(this));}.bind(this)},bIsVisible:true,bCurrentState:true};return r.addUserAction(A);};e.prototype._createDialogContent=function(){this._createHistoryEnabledSwitch();this._createHistoryEnabledLabel();this._createDeleteHistoryButton();this._createDeleteHistoryLabel();this._createSaveButton();this._createCancelButton();};e.prototype._createLayouts=function(){this._oHistoryEnabledLayout=new c({alignItems:"Center",items:[this._oHistoryEnabledLabel,this._oHistoryEnabledSwitch]});this._oDeleteHistoryLayout=new F({alignItems:"Center",items:[this._oDeleteHistoryLabel,this._oDeleteHistoryButton]});this._oDialogLayout=new V({items:[this._oHistoryEnabledLayout,this._oDeleteHistoryLayout]}).addStyleClass("sapUiSmallMargin");};e.prototype._createDialog=function(){this._oDialog=new D(a.getHistoryPrefix()+"optOutDialog",{title:this._oRB.getText("HISTORY_SETTING_TITLE"),content:[this._oDialogLayout],buttons:[this._oSaveButton,this._oCancelButton]});this._oDialog.attachAfterClose(this._onOptOutDialogAfterClose,this);};e.prototype._createHistoryEnabledSwitch=function(){this._oHistoryEnabledSwitch=new S();};e.prototype._createHistoryEnabledLabel=function(){this._oHistoryEnabledLabel=new L({text:this._oRB.getText("HISTORY_SETTING_ENABLE_TRACKING_DESCRIPTION")}).addStyleClass("sapUiSmallMarginEnd");};e.prototype._createDeleteHistoryButton=function(){this._oDeleteHistoryButton=new d({busyIndicatorDelay:0,text:this._oRB.getText("HISTORY_SETTING_DELETE_BUTTON")});this._oDeleteHistoryButton.attachPress(this._onDeleteHistoryPress,this);};e.prototype._createDeleteHistoryLabel=function(){this._oDeleteHistoryLabel=new L({text:this._oRB.getText("HISTORY_SETTING_DELETE_DESCRIPTION")}).addStyleClass("sapUiSmallMarginEnd");};e.prototype._createSaveButton=function(){this._oSaveButton=new d({text:this._oRB.getText("HISTORY_SETTING_SAVE")});this._oSaveButton.attachPress(this._onSavePress,this);};e.prototype._createCancelButton=function(){this._oCancelButton=new d({text:this._oRB.getText("HISTORY_SETTING_CANCEL")});this._oCancelButton.attachPress(this._onCancelPress,this);};e.prototype._onOptOutDialogAfterClose=function(){this._oDialog.destroy();};e.prototype._onDeleteHistoryPress=function(E){var o=E.getSource();o.setBusy(true);this._oHistoryGlobalDataService.deleteHistory().then(function(){o.setBusy(false);});};e.prototype._onSavePress=function(){M.confirm(this._oRB.getText("HISTORY_SETTING_CONFIRM"),{onClose:function(r){if(r=="CANCEL"){return;}this._oHistoryGlobalDataService.setHistoryEnabled(this._oHistoryEnabledSwitch.getState()).then(function(){window.location.reload();});}.bind(this)});};e.prototype._onCancelPress=function(){this._oDialog.close();};e.prototype.exit=function(){if(this._oDialog){this._oDialog.destroy();this._oDialog=null;}this._oRB=null;this._oHistoryEnabledSwitch=null;this._oHistoryEnabledLabel=null;this._oDeleteHistoryButton=null;this._oDeleteHistoryLabel=null;this._oSaveButton=null;this._oCancelButton=null;this._oDialogLayout=null;this._oHistoryEnabledLayout=null;this._oDeleteHistoryLayout=null;};return{createOptOutSettingPage:function(){if(b.getAppInfo().homePage===true){return;}if(!i){i=new e();}if(!i._oUserActionPromise){i._oUserActionPromise=i._createOptOutUserProfileEntry();}else{i._oUserActionPromise.then(function(){i._oUserActionPromise=i._createOptOutUserProfileEntry();});}return i;}};});