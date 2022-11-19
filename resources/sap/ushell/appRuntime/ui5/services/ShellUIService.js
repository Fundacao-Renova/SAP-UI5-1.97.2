// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/service/ServiceFactoryRegistry","sap/ui/core/service/ServiceFactory","sap/ui/core/service/Service","../../../ui5service/_ShellUIService/shelluiservice.class.factory","sap/ushell/appRuntime/ui5/AppRuntimePostMessageAPI","sap/ushell/appRuntime/ui5/AppRuntimeService"],function(S,a,b,d,A,c){"use strict";var s=d({serviceRegistry:S,serviceFactory:a,service:b});var l,r=false,B;var e=s.extend("sap.ushell.appRuntime.services.ShellUIService",{setTitle:function(t){l=t;return c.sendMessageToOuterShell("sap.ushell.services.ShellUIService.setTitle",{sTitle:t});},getTitle:function(){return l;},setHierarchy:function(h){return c.sendMessageToOuterShell("sap.ushell.services.ShellUIService.setHierarchy",{aHierarchyLevels:h});},setRelatedApps:function(R){return c.sendMessageToOuterShell("sap.ushell.services.ShellUIService.setRelatedApps",{aRelatedApps:R});},setBackNavigation:function(C){if(!r){r=true;A.registerCommHandlers({"sap.ushell.appRuntime":{oServiceCalls:{handleBackNavigation:{executeServiceCallFn:function(o){if(B){B();}else{window.history.back();}}}}}});}B=C;c.sendMessageToOuterShell("sap.ushell.ui5service.ShellUIService.setBackNavigation",{callbackMessage:{service:"sap.ushell.appRuntime.handleBackNavigation"}});}});return e;},true);