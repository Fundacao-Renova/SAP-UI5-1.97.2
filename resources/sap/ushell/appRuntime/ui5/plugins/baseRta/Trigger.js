/*!
 * Copyright (c) 2009-2020 SAP SE, All Rights Reserved
 */
sap.ui.define(["sap/ui/thirdparty/hasher","sap/ui/core/BusyIndicator","sap/ushell/appRuntime/ui5/plugins/baseRta/BaseRTAPluginStatus","sap/ushell/appRuntime/ui5/plugins/baseRta/AppLifeCycleUtils"],function(h,B,P,A){"use strict";var S=P.STATUS_STARTING;var a=P.STATUS_STARTED;var b=P.STATUS_STOPPING;var c=P.STATUS_STOPPED;function r(){return new Promise(function(d,e){sap.ui.require(["sap/ui/rta/api/startAdaptation"],d,e);});}var T=function(C){this.mConfig=C;this.sStatus=P.STATUS_STOPPED;this.oStartingPromise=null;this.oStoppingPromise=null;var o=A.getContainer();o.registerDirtyStateProvider(this._dirtyStateProvider.bind(this));this.oInitPromise=o.getServiceAsync("URLParsing").then(function(u){this.oURLParsingService=u;}.bind(this)).catch(function(e){throw new Error("Error during retrieval of URLParsing ushell service: "+e);});};T.prototype.getInitPromise=function(){return this.oInitPromise;};T.prototype.errorHandler=function(e){B.hide();if(e==="Reload triggered"){this.sStatus=c;}};function g(){return A.getCurrentRunningApplication().then(function(C){return C.componentInstance;});}T.prototype._startRta=function(){this.sStatus=S;sap.ui.getCore().getEventBus().subscribe("sap.ushell.renderers.fiori2.Renderer","appClosed",this._onAppClosed,this);sap.ui.getCore().getEventBus().subscribe("sap.ushell","appKeepAliveDeactivate",this._onAppClosed,this);B.show(0);var R;return g().then(function(o){R=o;return sap.ui.getCore().loadLibraries(["sap.ui.rta"],{async:true});}).then(r.bind(this)).then(function(s){this.sOldHash=h.getHash();var o={rootControl:R,flexSettings:{layer:this.mConfig.layer,developerMode:this.mConfig.developerMode}};return s(o,this.mConfig.loadPlugins,this.mConfig.onStartHandler,this.mConfig.onErrorHandler,this.mConfig.onStopHandler);}.bind(this)).then(function(o){B.hide();this._oRTA=o;this.sStatus=a;}.bind(this)).catch(this.mConfig.onErrorHandler);};T.prototype._stopRta=function(){this.sStatus=b;return this._oRTA.stop.apply(this._oRTA,arguments).then(function(){this.exitRta();}.bind(this));};T.prototype.triggerStartRta=function(){var s=this.sStatus;switch(s){case S:break;case a:this.oStartingPromise=Promise.resolve();break;case b:this.oStartingPromise=this.oStoppingPromise.then(function(){return this._startRta();}.bind(this));break;case c:this.oStartingPromise=this._startRta();break;default:}if(s!==S){this.oStartingPromise.then(function(){this.oStartingPromise=null;}.bind(this));}return this.oStartingPromise;};T.prototype.triggerStopRta=function(){var s=this.sStatus;switch(s){case S:this.oStoppingPromise=this.oStartingPromise.then(function(){return this._stopRta.apply(this,arguments);}.bind(this));break;case a:this.oStoppingPromise=this._stopRta.apply(this,arguments);break;case b:break;case c:this.oStoppingPromise=Promise.resolve();break;default:}if(s!==b){this.oStoppingPromise.then(function(){this.oStoppingPromise=null;}.bind(this));}return this.oStoppingPromise;};T.prototype.handleFlexDisabledOnStart=function(){sap.ui.require(["sap/ui/rta/util/showMessageBox","sap/m/MessageBox"],function(s,M){s(this.mConfig.i18n.getText("MSG_FLEX_DISABLED"),{icon:M.Icon.INFORMATION,title:this.mConfig.i18n.getText("HEADER_FLEX_DISABLED"),actions:[M.Action.OK],initialFocus:null,isCustomAction:false});}.bind(this));};T.prototype._dirtyStateProvider=function(){if(this._oRTA&&this.sStatus===a){var H=h.getHash();var p=this.oURLParsingService.parseShellHash(H);var o=this.oURLParsingService.parseShellHash(this.sOldHash);this.sOldHash=H;if(p.semanticObject===o.semanticObject&&p.action===o.action&&p.appSpecificRoute!==o.appSpecificRoute){return false;}return this._oRTA.canUndo();}return false;};T.prototype.exitRta=function(){if(this._oRTA){this._oRTA.destroy();this.sStatus=c;this.oStartingPromise=null;this.oStoppingPromise=null;this._oRTA=null;}sap.ui.getCore().getEventBus().unsubscribe("sap.ushell.renderers.fiori2.Renderer","appClosed",this._onAppClosed,this);sap.ui.getCore().getEventBus().unsubscribe("sap.ushell","appKeepAliveDeactivate",this._onAppClosed,this);};T.prototype._onAppClosed=function(){this.triggerStopRta(true,true);};return T;},true);
