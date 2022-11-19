// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/thirdparty/URI","sap/base/Log","sap/ushell/utils","sap/ushell/URLTemplateProcessor","sap/ushell/_ApplicationType/utils","sap/ushell/_ApplicationType/systemAlias","sap/ushell/_ApplicationType/wdaResolution","sap/ushell/_ApplicationType/guiResolution","sap/ushell/services/_ClientSideTargetResolution/ParameterMapping","sap/ushell/Config","sap/base/util/deepExtend","sap/ui/core/routing/History"],function(U,L,u,a,A,s,w,g,p,C,d,H){"use strict";function b(J,K,N){var O=J.inbound,R=O&&O.resolutionResult,P;if(!(!O||!R||!(R["sap.wda"]))){P=w.constructFullWDAResolutionResult(J,K,N);}else if(!(!O||!R)){P=w.constructWDAResolutionResult(J,K,N);}if(P){P.then(function(Q){r(Q,(Q.url&&Q.url.indexOf("/ui2/nwbc/")>=0)?"NWBC":"WDA");});}return P;}function c(J,K,N){return g.generateTRResolutionResult(J,K,N).then(function(R){r(R,"GUI");return R;});}function e(J,K,N){var O=new U(K),P=J.inbound,Q=P&&P.resolutionResult,R=d({},J.mappedIntentParamsPlusSimpleDefaults),S,T;if(R["sap-system"]){S=R["sap-system"][0];delete R["sap-system"];}if(R["sap-system-src"]){T=R["sap-system-src"][0];delete R["sap-system-src"];}return new Promise(function(V,W){s.spliceSapSystemIntoURI(O,Q.systemAlias,S,T,"WCF",Q.systemAliasSemantics||s.SYSTEM_ALIAS_SEMANTICS.applied,N).done(function(X){var Y=A.getURLParsing().paramsToString(R),Z=A.appendParametersToUrl(Y,X.toString());var $={url:Z,text:Q.text||"",additionalInformation:Q.additionalInformation||"",applicationType:"WCF",fullWidth:true};r($,"WCF");V($);}).fail(function(X){W(X);});});}function f(J,K,N){var O=J.inbound,P,S,Q,R,T={};["applicationType","additionalInformation","applicationDependencies"].forEach(function(W){if(O.resolutionResult.hasOwnProperty(W)){T[W]=O.resolutionResult[W];}});T.url=K;if(T.applicationDependencies&&typeof T.url==="undefined"){T.url="";}if(typeof T.url==="undefined"){T.url="";L.warning("The component url is undefined. We set it to empty string avoid rejection of the promise");}R=d({},J.mappedIntentParamsPlusSimpleDefaults);T.reservedParameters={};var V={"sap-ui-fl-max-layer":true,"sap-ui-fl-control-variant-id":true,"sap-ui-fl-version":true};Object.keys(V).forEach(function(W){var X=R[W];if(X){delete R[W];T.reservedParameters[W]=X;}});J.mappedDefaultedParamNames=J.mappedDefaultedParamNames.filter(function(W){return!V[W];});if(J.mappedDefaultedParamNames.length>0){R["sap-ushell-defaultedParameterNames"]=[JSON.stringify(J.mappedDefaultedParamNames)];}S=R["sap-system"]&&R["sap-system"][0];Q=R["sap-system-src"]&&R["sap-system-src"][0];T["sap-system"]=S;if(typeof Q==="string"){T["sap-system-src"]=Q;}J.effectiveParameters=R;P=A.getURLParsing().paramsToString(R);if(P){T.url=T.url+((T.url.indexOf("?")<0)?"?":"&")+P;}if(typeof O.resolutionResult.ui5ComponentName!=="undefined"){T.ui5ComponentName=O.resolutionResult.ui5ComponentName;}T.text=O.title;return Promise.resolve(T);}function h(T){var J=new U().fragment();var K=J.lastIndexOf("&/");var O=1;if(K>0){if(T&&T.capabilities&&T.capabilities.appFrameworkId==="UI5"){O=2;}return J.substr(K+O);}return undefined;}function i(J){var K=J.targetNavigationMode;if(K===undefined||K===""){K="inplace";}return K;}function j(){var J=window.hasher&&window.hasher.getHash(),K="",P;if(J&&J.length>0&&J.indexOf("sap-iapp-state=")>0){P=/(?:sap-iapp-state=)([^&/\\]+)/.exec(J);if(P&&P.length===2){K=P[1];}}return K;}function k(){return new Promise(function(R){Promise.all([sap.ushell.Container.getServiceAsync("UserInfo"),sap.ushell.Container.getServiceAsync("PluginManager")]).then(function(J){var K=J[0],P=J[1];var N=K.getUser();var O=sap.ui.getCore().getConfiguration();var Q=u.getUi5Version();var S=N.getContentDensity();var T=N.getTheme();if(T.indexOf("sap_")!==0){var V=sap.ushell.User.prototype.constants.themeFormat.THEME_NAME_PLUS_URL;T=N.getTheme(V);}var W;var X;if(O){X=O.getLanguage&&O.getLanguage();W=O.getSAPLogonLanguage&&O.getSAPLogonLanguage();}var Y=window.location.protocol+"//"+window.location.host+"/comsapuitheming.runtime/themeroot/v1";var Z=0;if(C.last("/core/shell/sessionTimeoutIntervalInMinutes")>0){Z=C.last("/core/shell/sessionTimeoutIntervalInMinutes");}R({language:X,logonLanguage:W,theme:T,themeServiceRoot:Y,isDebugMode:!!window["sap-ui-debug"],ui5Version:Q,contentDensity:S,sapPlugins:P._getNamesOfPluginsWithAgents(),innerAppState:j(),sessionTimeout:Z,historyDirection:H.getInstance().getDirection()||""});});});}function l(J){var K;switch(J){case"inplace":K="embedded";break;case"explace":K="newWindow";break;default:K=J||"newWindow";}return K;}function m(T,S){var J=l(T);var K=u.getMember(S,"sap|integration.navMode");switch(K){case"inplace":return"embedded";case"explace":if(J==="embedded"){return"newWindowThenEmbedded";}if(["newWindowThenEmbedded","newWindow"].indexOf(J)>=0){return J;}L.error("App-defined navigation mode was ignored","Application requests to be opened in a new window but no expected navigation mode was defined on the template","sap.ushell.ApplicationType");default:return J;}}function n(T,S,J){var K=u.clone(T);K.navigationMode=m(T.navigationMode,S);K.appId=J(T.appId||"");K.technicalAppComponentId=J(T.technicalAppComponentId||"");K.appSupportInfo=S["sap.app"]&&S["sap.app"].ach;K.appFrameworkId=T.appFrameworkId;delete K.urlTransformation;return K;}function o(S,J,K){var N={appParams:{},system:undefined},O;if(K.mappedIntentParamsPlusSimpleDefaults){N.appParams=JSON.parse(JSON.stringify(K.mappedIntentParamsPlusSimpleDefaults));}O=u.getMember(J,"sap|app.destination");if(typeof O==="string"&&O.length>0){N.system=S.systemAliases[O]&&JSON.parse(JSON.stringify(S.systemAliases[O]));if(typeof N.system==="object"){N.system.alias=O;}}return N;}function q(J,T){return new Promise(function(R,K){var N=new U(J);var P=N.query(true);var O=true;if(T==="explace"){O=false;}sap.ushell.Container.getServiceAsync("ShellNavigation").then(function(S){S.compactParams(P,["sap-language","sap-theme","sap-shell","sap-ui-app-id","transaction","sap-iframe-hint","sap-keep-alive","sap-ui-versionedLibCss","sap-wd-configId"],undefined,O).done(function(Q){if(!Q.hasOwnProperty("sap-intent-param")){R(J);return;}var V;if(Q["sap-theme"]){var W="sap-theme="+Q["sap-theme"];Q["sap-theme"]="sap-theme-temp-placeholder";N.query(Q);V=N.toString();V=V.replace("sap-theme=sap-theme-temp-placeholder",W);}else{N.query(Q);V=N.toString();}R(V);}).fail(function(Q){K(Q);});});});}function r(R,J){if(J){y(R,"sap-iframe-hint",J);}}function t(R){var K=R.extendedInfo.appParams["sap-keep-alive"];if(K!==undefined){y(R,"sap-keep-alive",K[0]);}}function v(R){var S=C.last("/core/spaces/enabled");if(S===true){y(R,"sap-spaces",S);}}function x(R,S,J){var T=u.getMember(S,"sap|integration.urlTemplateId");if(T==="urltemplate.url-dynamic"&&R.url.indexOf("sap-language=")===-1){y(R,"sap-language",J.env.language);}}function y(R,N,V){if(R.url){var J=R.url.indexOf("#"),K=R.url,O="";if(J>0){K=R.url.slice(0,J);O=R.url.slice(J);}R.url=K+(K.indexOf("?")>=0?"&":"?")+N+"="+V+O;}}function z(J,K,N){return new Promise(function(R){var O=J.inbound,T=O.templateContext,P=T.payload.capabilities||{};if(J.mappedIntentParamsPlusSimpleDefaults&&J.mappedIntentParamsPlusSimpleDefaults.hasOwnProperty("sap-ushell-innerAppRoute")){var Q=window.hasher.getHash();if(J.mappedIntentParamsPlusSimpleDefaults["sap-ushell-innerAppRoute"].length>0&&Q.indexOf("&/")===-1){Q+="&/"+J.mappedIntentParamsPlusSimpleDefaults["sap-ushell-innerAppRoute"];window.hasher.replaceHash(Q);}}var S={innerAppRoute:h(T.payload)||J.parsedIntent.appSpecificRoute,targetNavMode:i(J),defaultParameterNames:J.mappedDefaultedParamNames,startupParameter:J.mappedIntentParamsPlusSimpleDefaults};k().then(function(V){S.env=V;if(P.appFrameworkId==="UI5"&&S.startupParameter){for(var W in S.startupParameter){if(W!=="sap-ushell-innerAppRoute"){S.startupParameter[W][0]=encodeURIComponent(S.startupParameter[W][0]);}}}var X=a.expand(T.payload,T.site,S,T.siteAppSection,"startupParameter");var Y=function(_){var a1=u.clone(T.payload);a1.urlTemplate=_;return a.expand(a1,T.site,S,T.siteAppSection,"startupParameter");};var Z={applicationType:"URL",text:O.title,appCapabilities:n(P,T.siteAppSection,Y),url:X,extendedInfo:o(T.site,T.siteAppSection,J),contentProviderId:O.contentProviderId||"",systemAlias:(T.siteAppSection["sap.app"]&&T.siteAppSection["sap.app"].destination)||T.siteAppSection.destination||""};r(Z,Z.appCapabilities.appFrameworkId);t(Z);v(Z);x(Z,T.siteAppSection,S);var $=new Promise(function(_){sap.ushell.Container.getServiceAsync("URLTemplate").then(function(a1){sap.ui.require(["sap/ushell/components/applicationIntegration/application/BlueBoxesCache"],function(b1){var c1=(b1.get(Z.url)===undefined);a1.handlePostTemplateProcessing(Z.url,T.siteAppSection,c1).then(_);});});});$.then(function(_){Z.url=_;B(Z.url,P,T).then(function(a1){Z.url=a1;q(Z.url,S.targetNavMode).then(function(b1){Z.url=b1;R(Z);},function(){R(Z);});});});});});}function B(J,K,T){return new Promise(function(R){var N=K.urlTransformation||{enabled:false},S,O,P;if(N.enabled===true){P=new U(J);S=N.transformations[0].service.uri;var Q=a.prepareExpandData({urlTemplate:"",parameters:{names:S.queryOptions}},{},{urlComponent:{query:P.query()}},T.siteAppSection,"");O=U.expand("{+rootPath}/{+resourcePath}{?queryParams*}",{rootPath:S.rootPath,resourcePath:S.resourcePath,queryParams:Q.oResolvedParameters}).toString();sap.ui.require(["sap/ui/thirdparty/datajs"],function(V){V.read({requestUri:O,headers:{"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0"}},function(W){L.info("URL Transformation Succeeded",JSON.stringify({URLBeforeTransformation:J,TransformationResult:W.transformAppLaunchQueryString.queryString}),"sap.ushell.ApplicationType");J=P.query(W.transformAppLaunchQueryString.queryString).toString();R(J);},function(W){L.error("URL Transformation Failed",JSON.stringify(W),"sap.ushell.ApplicationType");R(J);});});}else{R(J);}});}function D(J,K,N){var O=J.inbound,P=O&&O.resolutionResult,R={};var Q=new U(K);var S=d({},J.mappedIntentParamsPlusSimpleDefaults);if(J.inbound&&J.inbound.action==="launchURL"&&J.inbound.semanticObject==="Shell"){delete S["sap-external-url"];}var T=S["sap-system"]&&S["sap-system"][0];var V=S["sap-system-src"]&&S["sap-system-src"][0];R["sap-system"]=T;delete S["sap-system"];if(typeof V==="string"){R["sap-system-src"]=V;delete S["sap-system-src"];}return(new Promise(function(W,X){if(A.absoluteUrlDefinedByUser(Q,P.systemAlias,P.systemAliasSemantics)){W(K);}else{s.spliceSapSystemIntoURI(Q,P.systemAlias,T,V,"URL",P.systemAliasSemantics||s.SYSTEM_ALIAS_SEMANTICS.applied,N).fail(X).done(function(Y){var Z=Y.toString();W(Z);});}})).then(function(W){var X=false,Y,Z=C.last("/core/navigation/flpURLDetectionPattern"),$=new RegExp(Z);if(S&&S.hasOwnProperty("sap-params-append")){delete S["sap-params-append"];X=true;}Y=A.getURLParsing().paramsToString(S);return $.test(W)||(X===true)?A.appendParametersToIntentURL(S,W):A.appendParametersToUrl(Y,W);},Promise.reject.bind(Promise)).then(function(W){["additionalInformation","applicationDependencies","systemAlias"].forEach(function(X){if(O.resolutionResult.hasOwnProperty(X)){R[X]=O.resolutionResult[X];}});R.url=W;R.text=O.title;R.applicationType="URL";return Promise.resolve(R);},Promise.reject.bind(Promise));}var E={URL:{type:"URL",defaultFullWidthSetting:true,generateResolutionResult:function(J){var K=J.inbound.hasOwnProperty("templateContext");return K?z.apply(null,arguments):D.apply(null,arguments);},easyAccessMenu:{intent:"Shell-startURL",resolver:null,showSystemSelectionInUserMenu:true,showSystemSelectionInSapMenu:false,systemSelectionPriority:1}},WDA:{type:"WDA",defaultFullWidthSetting:true,enableWdaCompatibilityMode:C.last("/core/navigation/enableWdaCompatibilityMode"),generateResolutionResult:b,easyAccessMenu:{intent:"Shell-startWDA",resolver:w.resolveEasyAccessMenuIntentWDA,showSystemSelectionInUserMenu:true,showSystemSelectionInSapMenu:true,systemSelectionPriority:2}},TR:{type:"TR",defaultFullWidthSetting:true,generateResolutionResult:c,easyAccessMenu:{intent:"Shell-startGUI",resolver:g.resolveEasyAccessMenuIntentWebgui,showSystemSelectionInUserMenu:true,showSystemSelectionInSapMenu:true,systemSelectionPriority:3}},NWBC:{type:"NWBC",defaultFullWidthSetting:true},WCF:{type:"WCF",generateResolutionResult:e,defaultFullWidthSetting:true},SAPUI5:{type:"SAPUI5",generateResolutionResult:f,defaultFullWidthSetting:false}};function F(){return Object.keys(E).map(function(J){return E[J];}).filter(function(J){return typeof J.easyAccessMenu==="object";});}function G(){var J={};F().forEach(function(K){J[K.easyAccessMenu.intent]=K.easyAccessMenu.resolver;});return function(K,R){if(J[K]&&(!R||R!=="SAPUI5")){return J[K];}return null;};}function I(J){if(!E[J]){return false;}return E[J].defaultFullWidthSetting;}Object.defineProperty(E,"enum",{value:Object.keys(E).reduce(function(J,K){if(E[K].type){J[K]=E[K].type;}return J;},{})});var M={getEasyAccessMenuResolver:G(),getEasyAccessMenuDefinitions:F,getDefaultFullWidthSetting:I};Object.keys(M).forEach(function(J){Object.defineProperty(E,J,{value:M[J]});});return E;},true);
