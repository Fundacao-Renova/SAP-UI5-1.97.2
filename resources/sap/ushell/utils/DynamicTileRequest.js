//Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/utils/HttpClient","sap/ui/thirdparty/URI","sap/base/util/isEmptyObject","sap/base/util/UriParameters","sap/base/Log"],function(H,U,i,a,L){"use strict";function D(u,s,e,c){this.fnSuccess=s;this.fnError=e;this.sUrl=u;this.oPromise=this._resolveDefaults(u,c).then(function(r){if(r){var S=sap.ui.getCore().getConfiguration().getSAPLogonLanguage();var o=new U(r).escapeQuerySpace(false);if(S&&!o.hasQuery("sap-language")){o.addQuery("sap-language",S);}if(o.is("relative")){o=o.absoluteTo(location.href);}this.sBasePath=o.origin()+o.directory()+"/";this.sRequestPath=o.relativeTo(this.sBasePath).href();var h=this._getHeaders(r);this.oConfig={headers:h};this.oClient=new H(this.sBasePath,this.oConfig);this.refresh();}}.bind(this)).catch(function(E){L.error("Was not able to create a DynamicTileRequest:",E);});}D.prototype._getRequestUrl=function(){return this.sBasePath+this.sRequestPath;};D.prototype.refresh=function(){if(!this.oRequest&&this.oClient){this.oRequest=this.oClient.get(this.sRequestPath).then(this._onSuccess.bind(this)).catch(this._onError.bind(this));}};D.prototype.abort=function(){if(this.oRequest&&this.oClient){this.oClient.abortAll();this.oRequest=null;return true;}return false;};D.prototype._onSuccess=function(r){var R;try{R=JSON.parse(r.responseText);}catch(e){throw new Error("Was not able to parse response of dynamic tile request");}this.oRequest=null;var d;if(typeof R==="object"){R=R.d?R.d:R;var u=new a(this.sRequestPath);if(u.get("$inlinecount")==="allpages"){d={number:R.__count};}else if(u.get("$count")==="true"){d={number:R["@odata.count"]};}else{d=this._extractData(R);}}else if(typeof R==="string"||typeof R==="number"){d={number:R};}this.fnSuccess(d);};D.prototype._onError=function(e){this.oRequest=null;this.fnError(e);};D.prototype._extractData=function(d){var s=["results","icon","title","number","numberUnit","info","infoState","infoStatus","targetParams","subtitle","stateArrow","numberState","numberDigits","numberFactor"];var r=Object.keys(d).reduce(function(A,k){if(s.indexOf(k)>-1){A[k]=d[k];}return A;},{});if(!i(r)){return r;}var f=Object.keys(d)[0];if(f!==undefined&&Object.keys(d).length===1){return Object.keys(d[f]).reduce(function(A,k){if(s.indexOf(k)>-1){A[k]=d[f][k];}return A;},{});}return{};};D.prototype._getHeaders=function(u){var h={"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0","Accept-Language":(sap.ui&&sap.ui.getCore().getConfiguration().getLanguage())||"",Accept:"application/json, text/plain"};var s=sap.ui.getCore().getConfiguration().getSAPLogonLanguage();if(s){h["sap-language"]=s;}var S=sap.ushell.Container.getLogonSystem()?sap.ushell.Container.getLogonSystem().getClient():"";var o=new U(u);if(S&&!o.protocol()){h["sap-client"]=S;}return h;};D.prototype._resolveDefaults=function(u,c){return sap.ushell.Container.getServiceAsync("ClientSideTargetResolution").then(function(C){return Promise.all([C.getSystemContext(c),sap.ushell.Container.getServiceAsync("ReferenceResolver")]);}).then(function(r){var s=r[0];var R=r[1];return new Promise(function(b,d){R.resolveUserDefaultParameters(u,s).done(b).fail(d);});}).then(function(r){if(r.defaultsWithoutValue&&r.defaultsWithoutValue.length>0){L.error("The service URL contains User Default(s) with no set value: "+r.defaultsWithoutValue.join(", "));return;}if(r.ignoredReferences&&r.ignoredReferences.length>0){L.error("The service URL contains invalid Reference(s): "+r.ignoredReferences.join(", "));return;}return r.url;});};D.prototype.destroy=function(){this.abort();this.fnError=null;this.fnSuccess=null;};return D;});
