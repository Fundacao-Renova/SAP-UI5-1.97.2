// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/_PluginManager/Extensions","sap/base/Log","sap/ui/thirdparty/jquery","sap/base/util/UriParameters","sap/ushell/utils","sap/ushell/components/applicationIntegration/application/PostMessageAPIInterface","sap/ushell/UI5ComponentType"],function(g,L,q,U,u,P,a){"use strict";var S="sap.ushell.services.PluginManager";var b="sap-ushell-plugin-type";var c="RendererExtensions";var d="sap.ushell.components.shell.defaults";var s=[c,"EarlyLoading","UserDefaults","UserImage","ContentProvider","AppWarmup"];function f(C,p,o){var t=this;this._oPluginCollection={};this._oCategoryLoadingProgress={};this._mInitializedComponentPromise={};this._sPluginAgentsNames="";this._oConfig=(o&&o.config)||{};if(this._oConfig.isBlueBox===undefined){this._oConfig.isBlueBox=false;}s.forEach(function(e){t._oPluginCollection[e]={};t._oCategoryLoadingProgress[e]=new q.Deferred();});this._handlePluginCreation=function(e,h,i,j){var t=this,k=(t._oPluginCollection[e])[h];u.setPerformanceMark("FLP -- PluginManager.loadPlugin["+e+"]["+h+"]");try{if(k.hasOwnProperty("component")){if(t._mInitializedComponentPromise.hasOwnProperty(k.component)){t._mInitializedComponentPromise[k.component].then(function(){t._instantiateComponent(k,i,j);},function(){t._instantiateComponent(k,i,j);});}else{t._mInitializedComponentPromise[k.component]=t._instantiateComponent(k,i,j);}}else{L.error("Invalid plugin configuration. The plugin "+h+" must contain a <component> key",S);}}catch(E){L.error("Error while loading bootstrap plugin: "+k.component||"",S);if(i){i.reject(E);}}};this._getFileNameForXhrAuth=function(){return"Component-preload.js";};this._handleXhrAuthentication=function(A,e){var x;if(A&&["true",true,"X"].indexOf(A["sap-ushell-xhr-authentication"])>-1){if(!e){L.error(["Illegal state: configuration parameter 'sap-ushell-xhr-authentication-timeout' set, but no component URL specified.","XHR authentication request will not be sent. Please check the target mapping definitions for plug-ins","and the application index."].join(" "),undefined,S);return q.when();}if(A.hasOwnProperty("sap-ushell-xhr-authentication-timeout")){x=parseInt(A["sap-ushell-xhr-authentication-timeout"],10);if(isNaN(x)){L.error(["Invalid value for configuration parameter 'sap-ushell-xhr-authentication-timeout' for plug-in component with URL '",e,"': '",A["sap-ushell-xhr-authentication-timeout"],"' is not a number. Timeout will be ignored."].join(""),undefined,S);}else{sap.ushell.Container.setXhrLogonTimeout(e,x);}}return q.ajax(e+"/"+this._getFileNameForXhrAuth());}return q.when();};this._instantiateComponent=function(e,h,i){var D=new q.Deferred(),j=JSON.parse(JSON.stringify(e)),A={ui5ComponentName:j.component,url:j.url,getExtensions:g.bind(null,e.component)};function m(E){return function(k){E=E||"Cannot create UI5 plugin component: (componentId/appdescrId :"+A.ui5ComponentName+")\n"+k+" properties "+JSON.stringify(A)+"\n This indicates a plugin misconfiguration, see e.g. Note 2316443.";k=k||"";L.error(E,k.stack,S);if(h){h.reject.apply(this,arguments);}D.reject.apply(this,arguments);};}j.name=j.component;delete j.component;A.applicationDependencies=j;if(j.config){A.applicationConfiguration=j.config;delete j.config;}A.loadDefaultDependencies=false;if(i!==undefined){A.oPostMessageInterface=i;}sap.ushell.Container.getServiceAsync("Ui5ComponentLoader").then(function(k){this._handleXhrAuthentication(A.applicationConfiguration,j.url).done(function(){k.createComponent(A,{},[],a.Plugin).done(function(l){if(h){h.resolve(l);}D.resolve.apply(this,arguments);}).fail(m());}).fail(m("XHR logon for FLP plugin failed"));}.bind(this)).catch(m());return D.promise();};this.getSupportedPluginCategories=function(){return JSON.parse(JSON.stringify(s));};this.getRegisteredPlugins=function(){return JSON.parse(JSON.stringify(this._oPluginCollection));};this.registerPlugins=function(h){var t=this,i,j,k,l=[],m,n;if(!h){return;}if(this._oConfig.isBlueBox===true){m=new U(window.location.href).get("sap-plugins");if(m&&m.length>0){m=","+m+",";}else{m=undefined;}}Object.keys(h).sort().forEach(function(r){i=h[r]||{};j=i.config||{};k=j[b]||"";if(i.enabled===false){return;}if(!t._isFormFactorSupported(i)){L.info("Plugin '"+r+"' filtered from result: form factor not supported");return;}if(t._oConfig.isBlueBox===true){if(i.config&&i.config["sap-plugin-agent"]===true){n=(i.config["sap-plugin-agent-id"]||r);if(m){if(m.indexOf(","+n+",")<0){return;}}else{return;}}}if(i.enabled===undefined){i.enabled=true;}if(i.hasOwnProperty("module")){var M=(i.module||"").replace(/\./g,"/");L.error("Plugin "+r+" cannot get registered, because the module mechanism for plugins is not valid anymore. Plugins need to be defined as SAPUI5 components.",S);try{sap.ui.requireSync(M);}catch(e){L.error("Plugin module "+M+" is not found.");}return;}if(j&&j.hasOwnProperty(b)){if(s&&Array.prototype.indexOf.call(s,k)!==-1){if(l.indexOf(k)===-1){l.push(k);}t._oPluginCollection[k][r]=JSON.parse(JSON.stringify(i));}else{L.warning("Plugin "+r+" will not be inserted into the plugin collection of the PluginManager, because of unsupported category "+k,S);}}else{t._oPluginCollection[c][r]=JSON.parse(JSON.stringify(i));if(l.indexOf(c)===-1){l.push(c);}}});try{if(t._oConfig.isBlueBox!==true){t._buildNamesOfPluginsWithAgents();}}catch(e){L.error("failed to build plugin agents names list",(e.message||e.toString()),"sap.ushell.services.PluginManager");}l.forEach(function(r){if(t._oCategoryLoadingProgress.hasOwnProperty(r)&&t._oCategoryLoadingProgress[r].state()==="resolved"){t.loadPlugins(r);}});};this._isFormFactorSupported=function(e){var D=e.deviceTypes,h=u.getFormFactor();if(D&&D[h]===false){return false;}return true;};this.getPluginLoadingPromise=function(e){if(this._oCategoryLoadingProgress.hasOwnProperty(e)){return this._oCategoryLoadingProgress[e].promise();}};this.loadPlugins=function(e){var t=this,h,i,j,k;u.setPerformanceMark("FLP -- PluginManager.startLoadPlugins["+e+"]");if(e===c){k=P.getInterface();}if(s&&Array.prototype.indexOf.call(s,e)!==-1){if(t._oCategoryLoadingProgress[e].pluginLoadingTriggered===undefined){t._oCategoryLoadingProgress[e].pluginLoadingTriggered=true;}if(Object.keys(t._oPluginCollection[e]).length>0){h=[];j=Object.keys(t._oPluginCollection[e]);if(new U(window.location.href).get("sap-ushell-xx-pluginmode")==="discard"&&(e==="RendererExtensions"||e==="AppWarmup")){j=j.filter(function(I){return(t._oPluginCollection[e][I].component===d);});}j.forEach(function(l){var m=t._oPluginCollection[e][l];if(!m.loaded){m.loaded=true;i=new q.Deferred();h.push(i.promise());t._handlePluginCreation(e,l,i,k);}});if(h.length>0){q.when.apply(undefined,h).done(function(){u.setPerformanceMark("FLP -- PluginManager.endLoadPlugins["+e+"]");t._oCategoryLoadingProgress[e].resolve();}).fail(t._oCategoryLoadingProgress[e].reject.bind());}}else{t._oCategoryLoadingProgress[e].resolve();}}else{L.error("Plugins with category "+e+" cannot be loaded by the PluginManager",S);t._oCategoryLoadingProgress[e].reject("Plugins with category "+e+" cannot be loaded by the PluginManager");}return t._oCategoryLoadingProgress[e].promise();};this._buildNamesOfPluginsWithAgents=function(){var t=this,n="",e;Object.keys(t._oPluginCollection).forEach(function(h){Object.keys(t._oPluginCollection[h]).forEach(function(i){e=t._oPluginCollection[h][i];if(e&&e.enabled&&e.enabled===true){if(e.config&&e.config["sap-plugin-agent"]===true){n+=(e.config["sap-plugin-agent-id"]||i)+",";}}});});if(n.endsWith(",")){n=n.slice(0,-1);}this._sPluginAgentsNames=n;};this._getNamesOfPluginsWithAgents=function(){return this._sPluginAgentsNames;};}f.hasNoAdapter=true;return f;},true);
