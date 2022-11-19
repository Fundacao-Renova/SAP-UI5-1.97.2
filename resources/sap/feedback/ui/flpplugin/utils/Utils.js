/*!
 * SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
sap.ui.define(["./Constants","sap/ui/thirdparty/jquery"],function(C,$){"use strict";return{getTriggerButton:function(){return $("#surveyTriggerButton");},getLocalStorage:function(){return localStorage;},hasValue:function(v){if(typeof v!=="undefined"&&v){return true;}return false;},getCurrentApp:function(){return sap.ushell.Container.getService("AppLifeCycle").getCurrentApplication();},isSupportedAppType:function(c){if(c&&c.applicationType){var a=c.applicationType.toLowerCase();if(a==="ui5"||a==="wda"||a==="gui"||a==="tr"||a==="nwbc"){return true;}}return false;},convertAppFrameworkTypeToId:function(t){if(t){return C.E_APP_FRAMEWORK[t.toLowerCase()]||C.E_APP_FRAMEWORK["unknown"];}return C.E_APP_FRAMEWORK["unknown"];},stringIsEmpty:function(v){return(v.length===0||!v.trim());},stringToTitleCase:function(i){if(i){return i.replace(/\w\S*/g,function(I){return I.charAt(0).toUpperCase()+I.substr(1).toLowerCase();});}return i;},isHorizonTheme:function(t){if(t&&t===C.E_THEME_NAME.horizon){return true;}return false;},isFioriNextB1ConfigParamActive:function(){var q=window.location.search;if(q){var u=new URLSearchParams(q);if(u&&u.has(C.S_THEME_URL_PARAM_SWITCH)){var U=u.get(C.S_THEME_URL_PARAM_SWITCH);if(U.trim().toLocaleLowerCase()==="true"){return true;}}}return false;},isFioriNextB1ScopeSetActive:function(c){if(c&&c.hasScopeItem(C.S_SCOPE_FIORI_NEXT_BETA1)){return true;}return false;},isLocalStorageAvailable:function(){try{return"localStorage"in window&&window["localStorage"]!==null;}catch(e){return false;}},isFioriNextBeta1FeatureAvailable:function(c){if((this.isFioriNextB1ConfigParamActive()||this.isFioriNextB1ScopeSetActive(c))&&this.isLocalStorageAvailable()){return true;}return false;},isStringValidNumber:function(i){return!isNaN(parseFloat(i))&&isFinite(i);},isPositiveInteger:function(v){return/^\d+$/.test(v);}};});