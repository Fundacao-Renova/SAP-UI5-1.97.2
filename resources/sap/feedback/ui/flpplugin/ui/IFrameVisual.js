/*!
 * SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/HTML","sap/m/Button","sap/m/Dialog"],function(O,H,B,D){"use strict";return O.extend("sap.feedback.ui.flpplugin.ui.IFrameVisual",{_oConfig:{},_oResourceBundle:null,_oCurrentDialog:null,constructor:function(c,r){this._oConfig=c;this._oResourceBundle=r;},_getText:function(t){var T=this._oResourceBundle.getText(t);return T;},show:function(c){var s=this._buildUri(c);var i=this._addIFrame(s);var d=this._defineDialogSettings(i);d=this._updateDialogDimensions(d);this._oCurrentDialog=new D(d);this._oCurrentDialog.open();},_defineDialogSettings:function(i){var d={title:this._getText("DIALOG_TITLE"),showHeader:true,content:i,buttons:[new B({text:this._getText("DIALOG_CLOSE_BUTTON"),type:"Transparent",press:function(){this._oCurrentDialog.close();}.bind(this)})]};return d;},_updateDialogDimensions:function(d){if(sap.ui.Device.system.desktop||sap.ui.Device.system.tablet){d.contentWidth="1000px";d.contentHeight="500px";}else{d.stretch=true;}return d;},_buildUri:function(c){var s=this._oConfig.getQualtricsUri();s+=c;return s;},_addIFrame:function(i){var h=new H();var c="<iframe src='"+i+"' scrolling='auto' frameborder='no' width='99%'></iframe>";h.setContent(c);return h;}});});
