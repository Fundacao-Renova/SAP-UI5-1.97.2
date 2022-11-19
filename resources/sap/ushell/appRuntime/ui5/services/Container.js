// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/Container","sap/ushell/appRuntime/ui5/AppRuntimeService","sap/ushell/appRuntime/ui5/renderers/fiori2/Renderer","sap/ushell/appRuntime/ui5/ui/UIProxy","sap/ushell/appRuntime/ui5/SessionHandlerAgent"],function(c,A,R,U,S){"use strict";function C(){var a;this.bootstrap=function(p,m){return sap.ushell.bootstrap(p,m).then(function(b){a=sap.ushell.Container._getAdapter();sap.ushell.Container.inAppRuntime=function(){return true;};sap.ushell.Container.runningInIframe=sap.ushell.Container.inAppRuntime;sap.ushell.Container.getFLPUrl=function(i){return A.sendMessageToOuterShell("sap.ushell.services.Container.getFLPUrl",{"bIncludeHash":i});};sap.ushell.Container.getFLPUrlAsync=function(i){return sap.ushell.Container.getFLPUrl(i);};sap.ushell.Container.getRenderer=function(){return R;};sap.ushell.Container.logout=function(){return a.logout();};sap.ushell.Container.getFLPPlatform=function(){return A.sendMessageToOuterShell("sap.ushell.services.Container.getFLPPlatform");};sap.ushell.Container.extendSession=function(){S.userActivityHandler();};});};}return new C();},true);