// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/base/util/deepExtend","sap/ui/performance/trace/FESR","sap/ushell/performance/ShellAnalytics"],function(L,d,F,S){"use strict";var a={HOME_INITIAL:"FLP@LOAD",HOME_LOADING:"FLP@DURING_LOAD",FINDER_INITIAL:"FLP@LOAD_FINDER",APP_INITIAL:"FLP@DEEP_LINK",NAVIGATION:"NAVIGATION"};var I={APP_START:1,STEP_IN_APP:2,UNKNOWN:3};var f={_fnOriginalOnBeforeCreated:null,_lastTrackedRecord:null,init:function(){if(F.getActive()){S.enable();this._fnOriginalOnBeforeCreated=F.onBeforeCreated;F.onBeforeCreated=this._onBeforeCreatedHandler.bind(this);}},reset:function(){F.onBeforeCreated=this._fnOriginalOnBeforeCreated;S.disable();this._setLastTrackedRecord(null);},_getPerformanceEntries:function(e){return performance.getEntriesByName(e);},_getLastTrackedApplicationId:function(){var c=S.getCurrentApplication();if(c){if(c.type==="TR"){return c.id.replace(/ .*/,"").replace(/^\*/,"").substr(0,15).concat(" (TR)");}return c.id;}return null;},_getLastTrackedRecord:function(){return this._lastTrackedRecord;},_setLastTrackedRecord:function(n){this._lastTrackedRecord=n;},_onBeforeCreatedHandler:function(u,U){var D=this._detectScenario(u,U),A=this._getLastTrackedApplicationId();if(A){u.appNameShort=A;}if(!D.scenario){return u;}return this._enhanceRecord(D.scenario,u,D.relatedEvent);},_detectScenario:function(u,U){function c(s,e){var r={scenario:s};if(e){r.relatedEvent=e;}return r;}if(u.stepName==="undetermined_startup"){var l=S.getLastClosedRecord();this._setLastTrackedRecord(l);switch(u.appNameLong){case"sap.ushell.components.homepage":return c(a.HOME_INITIAL);case"sap.ushell.components.pages":return c(a.HOME_INITIAL);case"sap.ushell.components.appfinder":return c(a.FINDER_INITIAL);default:return c(a.APP_INITIAL,l);}}var o=this._getLastTrackedRecord(),n=S.getNextNavigationRecords(o),s,N;if(n.length===1){N=n[0];if((N&&o&&!N.isEqual(o))||(!o&&N)){this._setLastTrackedRecord(N);s=N.step===a.HOME_LOADING?a.HOME_LOADING:a.NAVIGATION;return c(s,N);}}else if(n.length>1){n.pop();N=n[0];this._setLastTrackedRecord(N);s=N.step===a.HOME_LOADING?a.HOME_LOADING:a.NAVIGATION;return c(s,N);}return c(null);},_enhanceRecord:function(D,i,r){switch(D){case a.HOME_INITIAL:return this._enhanceInitialStart(i,D,"FLP-TTI-Homepage");case a.FINDER_INITIAL:return this._enhanceInitialStart(i,D,"FLP-TTI-AppFinder");case a.APP_INITIAL:return this._enhanceInitialAppStart(i,D,r||{});case a.NAVIGATION:case a.HOME_LOADING:return this._enhanceNavigationRecord(i,D,r||{});default:break;}L.warning("Unknown scenario at the end of execution, unnecessary code executed",null,"sap.ushell.performance.FesrEnhancer");return i;},_enhanceInitialStart:function(i,s,p){var m,e=d({},i);e.stepName=s;e.interactionType=I.APP_START;if(p){m=this._getPerformanceEntries(p)[0];if(m){e.timeToInteractive=m.startTime;return e;}L.warning("Scenario '"+s+"' detected but expected performance mark '"+p+"' does not exist",null,"sap.ushell.performance.FesrEnhancer");}return e;},_enhanceNavigationRecord:function(i,D,r){var e=d({},i);if(D!=="FLP@DURING_LOAD"){e.stepName=r.step||i.stepName;}e.appNameShort=r.targetApplication||"";if(r.applicationType==="UI5"){e.interactionType=I.APP_START;}if(/^FLP_BACK/.test(e.stepName)){var m=this._getPerformanceEntries("FLP-TTI-Homepage")[0];if(m){if(m.startTime>r.getTimeStart()){e.timeToInteractive=m.startTime-r.getTimeStart();}}}return e;},_enhanceInitialAppStart:function(i,s,r){var e=d({},i);e.stepName=s;e.appNameShort=i.appNameShort;if(r.applicationType==="UI5"){e.interactionType=I.APP_START;}else{e.interactionType=I.STEP_IN_APP;}return e;}};return f;},true);