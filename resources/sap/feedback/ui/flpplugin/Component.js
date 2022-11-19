/*!
 * SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/core/Component","sap/base/Log","./utils/Constants","./data/Config","./utils/InitDetection","./utils/Utils","./controller/PluginController","sap/base/util/ObjectPath"],function(C,L,a,b,I,U,P,O){"use strict";return C.extend("sap.feedback.ui.flpplugin.Component",{metadata:{manifest:"json",properties:{url:{name:"url",type:"string"},tenantId:{name:"tenantId",type:"string"},tenantRole:{name:"tenantRole",type:"string"},isPushEnabled:{name:"isPushEnabled",type:"boolean"},pushChannelPath:{name:"pushChannelPath",type:"string"},productName:{name:"productName",type:"string"},platformType:{name:"platformType",type:"string"},scopeSet:{name:"scopeSet",type:"string"}}},_oPluginController:null,_oConfig:null,_bIsLoaded:false,init:function(){if(!this._isManuallyConfigured()){return this._prepareAndRun();}},load:function(){return new Promise(function(r,R){if(this._bIsLoaded===false){this._prepareAndRun().then(function(){r();},function(){R();});}else{L.error("Plug-in already loaded with an existing configuration.",null,a.S_PLUGIN_COMPONENT_NAME);R();}}.bind(this));},_prepareAndRun:function(){return new Promise(function(r,R){var l=this._loadPluginConfigData();if(l){this._oConfig=this._createConfigObject(l);this._run().then(function(){this._bIsLoaded=true;r();}.bind(this),function(){R();});}else{L.error("Config data could not be loaded correctly.",null,a.S_PLUGIN_COMPONENT_NAME);R();}}.bind(this));},_loadPluginConfigData:function(){if(this.getProperty("url")&&this.getProperty("tenantId")){var m={};m.qualtricsInternalUri=this.getProperty("url");m.tenantId=this.getProperty("tenantId");if(this.getProperty("tenantRole")){m.tenantRole=this.getProperty("tenantRole");}if(this.getProperty("isPushEnabled")){m.isPushEnabled=this.getProperty("isPushEnabled");}if(this.getProperty("pushChannelPath")){m.pushChannelPath=this.getProperty("pushChannelPath");}if(this.getProperty("productName")){m.productName=this.getProperty("productName");}if(this.getProperty("platformType")){m.platformType=this.getProperty("platformType");}if(this.getProperty("scopeSet")){m.scopeSet=this.getProperty("scopeSet");}return m;}else if(this.getComponentData()&&this.getComponentData().config){var A=this.getComponentData().config;if(A&&this._isMandatoryConfigValid(A)===true){return A;}else{L.error("Feedback config could not be read.",null,a.S_PLUGIN_COMPONENT_NAME);}}return null;},_isManuallyConfigured:function(){if(this.getProperty("url")&&this.getProperty("tenantId")){return true;}return false;},_createConfigObject:function(c){var o=new b(c.qualtricsInternalUri,c.tenantId,a.E_DATA_FORMAT.version1);o.setTenantRole(c.tenantRole);if(c.isPushEnabled){o.setDataFormat(a.E_DATA_FORMAT.version2);o.setIsPushEnabled(c.isPushEnabled);if(o.getIsPushEnabled()&&c.pushChannelPath&&!U.stringIsEmpty(c.pushChannelPath)){o.setPushChannelPath(c.pushChannelPath);}}if(c.productName){o.setProductName(c.productName);}if(c.platformType){o.setPlatformType(c.platformType);}if(c.scopeSet){o.setScopeSet(c.scopeSet);}return o;},_isMandatoryConfigValid:function(c){var q=c.qualtricsInternalUri;if(q&&q.length>0){var t=c.tenantId;if(t&&t.length>0){return true;}else{L.error("Feedback config insufficient - tenant id missing.",c,a.S_PLUGIN_COMPONENT_NAME);}}else{L.error("Feedback config insufficient - url missing.",c,a.S_PLUGIN_COMPONENT_NAME);}return false;},_run:function(){return new Promise(function(r){this._validateIfInitializable(this._oConfig.getQualtricsUri()).then(function(i){if(i){this._oConfig.setIsLibraryLoadable(i);this._startPluginController(this._oConfig).then(function(){r();},function(){L.error("Plugin Controller could not be initialized.",this._oConfig,a.S_PLUGIN_COMPONENT_NAME);r();}.bind(this));}}.bind(this),function(i){if(!i){this._oConfig.setIsLibraryLoadable(i);L.error("Unable to request feedback library.",this._oConfig,a.S_PLUGIN_COMPONENT_NAME);}r();}.bind(this));}.bind(this));},_validateIfInitializable:function(q){var i=new I(q);return i.isUrlLoadable();},_startPluginController:function(c){return new Promise(function(r,d){if(this._isDeviceDisplayFormatCombinationValid(c.getDisplayFormat())){var R=this.getModel("i18n").getResourceBundle();this._oPluginController=new P(c,this._getRenderer(),R);this._oPluginController.init().then(function(){r();},function(e){L.error("Feedback plugin startup failed.",e,a.S_PLUGIN_COMPONENT_NAME);d();});}else{L.error("Device not supported.",this._oConfig,a.S_PLUGIN_COMPONENT_NAME);d();}}.bind(this));},_isDeviceDisplayFormatCombinationValid:function(d){if(sap.ui.Device.system.phone&&d===a.E_DISPLAY_FORMAT.popover){return false;}return true;},_getRenderer:function(){return new Promise(function(r,R){this._oShellContainer=O.get("sap.ushell.Container");if(!this._oShellContainer){R("Illegal state: shell container not available; this component must be executed in a unified shell runtime context.");}else{var o=this._oShellContainer.getRenderer();if(o){r(o);}else{this._onRendererCreated=function(e){o=e.getParameter("renderer");if(o){r(o);}else{R("Illegal state: shell renderer not available after receiving 'rendererLoaded' event.");}};this._oShellContainer.attachRendererCreatedEvent(this._onRendererCreated);}}}.bind(this));}});});