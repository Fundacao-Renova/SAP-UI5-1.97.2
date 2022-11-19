/*!
 * SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/base/Object","sap/base/Log","sap/ui/core/ws/WebSocket","sap/ui/core/ws/ReadyState","sap/ui/core/EventBus","../utils/Constants","../utils/Utils","../data/PushContextData"],function(O,L,W,R,E,C,U,P){"use strict";return O.extend("sap.feedback.ui.flpplugin.controller.PushClient",{_oConfig:null,_fnPushSurveyCallback:null,_oConnection:null,constructor:function(c){this._oConfig=c;},init:function(p){this._fnPushSurveyCallback=p;this._initClient();},_initClient:function(){var w=this._constructUri();if(w&&w.length>0){try{this._oConnection=new W(w);this._oConnection.attachOpen(this._onOpen,this);this._oConnection.attachMessage(this._onMessage,this);this._oConnection.attachError(this._onError,this);this._oConnection.attachClose(this._onClose,this);}catch(e){L.error("Push survey connection could not be initalized.",e,C.S_PLUGIN_PUSHCLNT_NAME);}}var o=sap.ui.getCore().getEventBus();o.subscribe("sap.feedback","push",function(c,s,a){this._processMessage(a);},this);o.subscribe("sap.feedback","inapp.user",function(c,s,a){a.srcType=C.E_PUSH_SRC_TYPE.userInApp;this._processMessage(a);},this);},_constructUri:function(){if(this._oConfig.getPushChannelPath()){var c=window.location;var s="";if(c.protocol==="https:"){s="wss:";}else{s="ws:";}s+="//"+c.host;s+=this._oConfig.getPushChannelPath();return s;}return null;},_close:function(){this._oConnection.close();},send:function(){if(this._oConnection.getReadyState()===R.OPEN){}},_onOpen:function(e){L.info("Opened push survey channel:",e,C.S_PLUGIN_PUSHCLNT_NAME);},_onMessage:function(o){var d=o.getParameter("data");if(d){try{var j=JSON.parse(d);this._processMessage(j);}catch(e){L.error("Push survey data could not be parsed.",e,C.S_PLUGIN_PUSHCLNT_NAME);}}},_onError:function(e){L.info("Error on push survey channel:",e,C.S_PLUGIN_PUSHCLNT_NAME);},_onClose:function(e){L.info("Closing push survey channel:",e,C.S_PLUGIN_PUSHCLNT_NAME);},_processMessage:function(d){if(d){if(d.srcType){if(d.srcType===C.E_PUSH_SRC_TYPE.backend||d.srcType===C.E_PUSH_SRC_TYPE.userInApp){this._showSurvey(d);}}}},_showSurvey:function(d){if(d.srcAppId&&d.srcAppTrigger&&d.srcType){var s=d.srcAppId;var S=d.srcAppTrigger;var i=d.srcType;var p=new P(s,S,i);if(this._fnPushSurveyCallback){this._fnPushSurveyCallback({contextData:p});}}}});});
