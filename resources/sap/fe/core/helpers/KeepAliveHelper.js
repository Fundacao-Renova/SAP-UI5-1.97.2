/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/Log","sap/fe/core/helpers/ModelHelper","sap/fe/core/helpers/KeepAliveRefreshTypes"],function(L,M,K){"use strict";var P=K.PATH_TO_STORE;var R=K.RefreshStrategyType;var g=M.getEntitySetPath;var _=function(m,i){var j=g(i);var k=j.indexOf("$NavigationPropertyBinding")>-1&&m.getObject(j);return k?"/"+k:i;};var a=function(p,k,i){return p===k||i===R.IncludingDependents&&p.startsWith(k);};var b=function(m,i,p,j){var k=i.startsWith("/")?i:"/"+i,l=p.startsWith("/")?p:"/"+p;if(!a(k,l,j)){k=_(m,k);if(!a(k,l,j)){l=_(m,l);}else{return true;}}return a(k,l,j);};var c=function(v,i){var j=[];var m=v.getModel().getMetaModel();var k=v.getModel("internal");var l=k.getProperty(P)||{};if(i){i.forEach(function(n){var o=n.data("targetCollectionPath");for(var p in l){var q=l[p];if(j.indexOf(n)===-1&&b(m,o,p,q)){j.push(n);}}});}return j;};var d=function(i,j){var m=i.getModel().getMetaModel();var k=i.getModel("internal");var l=k.getProperty(P)||{};var n;if(j){for(var o in l){var p=l[o];if(b(m,j,o,p)){n=p;if(n==="includingDependents"){break;}}}}return n;};var e=function(v){var i=v.getViewData(),j=i&&((i===null||i===void 0?void 0:i.contextPath)||"/"+(i===null||i===void 0?void 0:i.entitySet));return h.getControlRefreshStrategyForContextPath(v,j);};var f=function(i,j,k){var l=j&&k&&j+"-"+k;var m=i.intents;var n=m&&l&&m[l];var o=!n&&m&&j&&m[j];return n||o||(i===null||i===void 0?void 0:i.defaultBehavior)||(i===null||i===void 0?void 0:i._feDefault);};var s=function(i,j){if(i&&i.getModel("viewData")&&i.getModel("internal")){var v=i.getModel("viewData");var k=v.getProperty(P);if(k){var l=i.getModel("internal");var m=h.getRefreshStrategyForIntent(k,j===null||j===void 0?void 0:j.semanticObject,j===null||j===void 0?void 0:j.action);l.setProperty(P,m);}}};var r=function(v){var i=v.getBindingContext("internal");var j=v.getController();var k=j===null||j===void 0?void 0:j.viewState;var l=Promise.resolve();if(i.getProperty("restoreStatus")==="pending"){if(k.refreshViewBindings){l=k.refreshViewBindings();l.then(function(){L.info("FE V4: Refresh was triggered successfull: "+v.getId());}).catch(function(m){L.warning("FE V4: Refresh was unsuccessfull: "+v.getId(),m);});}l=l.then(function(){k.onRestore();i.setProperty("restoreStatus","done");}).catch(function(m){L.warning("FE V4: Restore was unsuccessfull: "+v.getId(),m);});}return l;};var h={getControlsForRefresh:c,getControlRefreshStrategyForContextPath:d,getViewRefreshInfo:e,getRefreshStrategyForIntent:f,storeControlRefreshStrategyForHash:s,restoreView:r};return h;},false);