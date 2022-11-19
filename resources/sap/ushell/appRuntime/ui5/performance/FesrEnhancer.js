// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/performance/trace/FESR","sap/ui/performance/trace/Interaction","sap/ushell/utils/type"],function(F,I,t){"use strict";var f={_fnOriginalOnBeforeCreated:undefined,_currentAppShortId:undefined,init:function(){if(F.getActive()){this._fnOriginalOnBeforeCreated=F.onBeforeCreated;F.onBeforeCreated=this._onBeforeCreatedHandler.bind(this);}},_onBeforeCreatedHandler:function(u,U){if(this._currentAppShortId){u.appNameShort=this._currentAppShortId;}if(u.interactionType===1&&(u.stepName==="undetermined_startup"||u.stepName==="undetermined_appruntime_app_startup")){u.stepName="APPRT@APP_START";}return u;},reset:function(){if(F.getActive()){F.onBeforeCreated=this._fnOriginalOnBeforeCreated;this.setAppShortId();}},startInteraction:function(){if(F.getActive()){I.start("appruntime_app_startup");}},setAppShortId:function(c){function g(m,p){var v=m.getManifestEntry(p)||[];if(!t.isArray(v)){v=[v];}return(typeof v[0]==="string"?v[0]:undefined);}if(F.getActive()){try{if(c){var C=c.getInstance().getComponentData().technicalParameters||{},m=c.getMetadata();this._currentAppShortId=C["sap-fiori-id"]||g(m,"/sap.fiori/registrationIds");}else{this._currentAppShortId=undefined;}}catch(e){this._currentAppShortId=undefined;}}}};return f;},true);