/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/model/json/JSONModel","sap/fe/core/BaseController","sap/ui/core/Component","sap/ui/core/routing/HashChanger","sap/fe/core/CommonUtils","sap/fe/macros/SizeHelper","sap/ui/model/odata/v4/AnnotationHelper","sap/ui/base/BindingParser","sap/base/Log","sap/fe/core/controllerextensions/Placeholder"],function(J,B,C,H,a,S,A,b,L,P){"use strict";return B.extend("sap.fe.templates.RootContainer.controller.RootContainerBaseController",{oPlaceholder:P,onInit:function(){S.init();this._aHelperModels=[];},getPlaceholder:function(){return this.oPlaceholder;},attachRouteMatchers:function(){this.oPlaceholder.attachRouteMatchers();this.getAppComponent().getRoutingService().attachAfterRouteMatched(this._onAfterRouteMatched,this);},onExit:function(){this.getAppComponent().getRoutingService().detachAfterRouteMatched(this._onAfterRouteMatched,this);this.oRouter=null;S.exit();this._aHelperModels.forEach(function(m){m.destroy();});},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle();},getRouter:function(){if(!this.oRouter){this.oRouter=this.getAppComponent().getRouter();}return this.oRouter;},_createHelperModel:function(){var m=new J();this._aHelperModels.push(m);return m;},waitForRightMostViewReady:function(e){return new Promise(function(r){var c=e.getParameter("views"),f=[];c.forEach(function(o){var v=o;if(o&&o.getComponentInstance){var d=o.getComponentInstance();v=d.getRootControl();}if(v&&v.getController()&&v.getController().pageReady){f.push(v);}});var R=f[f.length-1];if(R&&R.getController().pageReady.isPageReady()){r(R);}else{R&&R.getController().pageReady.attachEventOnce("pageReady",function(){r(R);});}});},_onAfterRouteMatched:function(e){var t=this;if(!t._oRouteMatchedPromise){t._oRouteMatchedPromise=t.waitForRightMostViewReady(e).then(function(v){var r=t.getView().getContent()[0];if(r&&r.getAutoFocus&&!r.getAutoFocus()){r.setProperty("autoFocus",true,true);}var o=t.getAppComponent();var d={oView:v,oAppComponent:o};t._scrollTablesToLastNavigatedItems();if(o.getEnvironmentCapabilities().getCapabilities().UShell){t.computeTitleHierarchy(d);}var f=o.getRouterProxy().isFocusForced();o.getRouterProxy().setFocusForced(false);if(v.getController()&&v.getController().onPageReady){v.getParent().onPageReady({forceFocus:f});}if(t.onContainerReady){t.onContainerReady();}}).catch(function(E){L.error("An error occurs while computing the title hierarchy and calling focus method",E);}).finally(function(){t._oRouteMatchedPromise=null;});}},getTitleHierarchyCache:function(){if(!this.oTitleHierarchyCache){this.oTitleHierarchyCache={};}return this.oTitleHierarchyCache;},_computeTitleInfo:function(t,s,i){var p=i.split("/");if(p[p.length-1].indexOf("?")===-1){i+="?restoreHistory=true";}else{i+="&restoreHistory=true";}return{title:t,subtitle:s,intent:i,icon:""};},addNewEntryInCacheTitle:function(p,o){var t=this.getView().getModel();var c=this;var e=p.replace(/ *\([^)]*\) */g,"");var T=A.format(o.getMetaModel().getProperty(e+"/@com.sap.vocabularies.UI.v1.HeaderInfo/Title/Value"),{context:o.getMetaModel().createBindingContext("/")});var d=b.complexParser(T);var s=o.getMetaModel().getProperty(e+"/@com.sap.vocabularies.UI.v1.HeaderInfo/TypeName");var f=t.createBindingContext(p);if(d){var g=d.parts?d.parts[0].path:d.path;var h=d.formatter;var i=t.bindProperty(g,f);i.initialize();}return new Promise(function(r,j){var k=H.getInstance().hrefForAppSpecificHash?H.getInstance().hrefForAppSpecificHash(""):"";var I=k+p.slice(1);var l=c.getTitleHierarchyCache();var m=function(E){var n=h?h(E.getSource().getValue()):E.getSource().getValue();l[p]=c._computeTitleInfo(s,n,I);r(l[p]);i.detachChange(m);};if(i){i.attachChange(m);}else{l[p]=c._computeTitleInfo(s,"",I);r(l[p]);}});},ensureHierarchyElementsAreStrings:function(h){var c=[];for(var l in h){var o=h[l];var s={};for(var k in o){s[k]=typeof o[k]!=="string"?String(o[k]):o[k];}c.push(s);}return c;},computeTitleHierarchy:function(d){var t=this,v=d.oView,o=d.oAppComponent,c=v.getBindingContext(),e=v.getParent(),T=[],s=H.getInstance().hrefForAppSpecificHash?H.getInstance().hrefForAppSpecificHash(""):"",f=o.getMetadata().getManifestEntry("sap.app").title||"",g=o.getMetadata().getManifestEntry("sap.app").appSubTitle||"",h=s,p,n;if(this.bIsComputingTitleHierachy===true){L.warning("computeTitleHierarchy already running ... this call is canceled");return;}this.bIsComputingTitleHierachy=true;if(e&&e._getPageTitleInformation){if(c){n=c.getPath();var l=n.split("/"),m,q="",N=l.length;l.splice(-1,1);l.forEach(function(r,i){if(i===0){var R=o.getManifestEntry("/sap.ui5/routing/routes"),u=o.getManifestEntry("/sap.ui5/routing/targets");var w=function(y){if(typeof R[this.index].target==="string"){return y===R[this.index].target;}else if(typeof R[this.index].target==="object"){for(var k=0;k<R[this.index].target.length;k++){return y===R[this.index].target[k];}}};for(var j=0;j<R.length;j++){var x=o.getRouter().getRoute(R[j].name);if(x.match(l[i])){var y=Object.keys(u).find(w,{index:j});m=o.getRouter().getTarget(y)._oOptions.name;break;}}if(m==="sap.fe.templates.ListReport"){T.push(Promise.resolve(t._computeTitleInfo(f,g,h)));}}else if(i<N){q+="/"+r;var M=o.getMetaModel(),z=M.getMetaPath(q),I=M.getObject(z+"/@com.sap.vocabularies.Common.v1.ResultContext");if(I){return;}if(!t.getTitleHierarchyCache()[q]){T.push(t.addNewEntryInCacheTitle(q,o));}else{T.push(Promise.resolve(t.getTitleHierarchyCache()[q]));}}});}p=e._getPageTitleInformation().then(function(i){var j=H.getInstance().getHash();var k=j.split("/");if(k[k.length-1].indexOf("?")===-1){j+="?restoreHistory=true";}else{j+="&restoreHistory=true";}i.intent=s+j;if(c){t.getTitleHierarchyCache()[n]=i;}else{t.getTitleHierarchyCache()[h]=i;}return i;});T.push(p);}else{T.push(Promise.reject("Title information missing in HeaderInfo"));}Promise.all(T).then(function(i){var j=t.ensureHierarchyElementsAreStrings(i),k=j.pop().title;o.getShellServices().setHierarchy(j.reverse());o.getShellServices().setTitle(k);}).catch(function(E){L.error(E);}).finally(function(){t.bIsComputingTitleHierachy=false;}).catch(function(E){L.error(E);});},calculateLayout:function(n,p,s){return null;},onContextBoundToView:function(c){if(c){var d=this.getView().getModel("internal").getProperty("/deepestPath"),v=c.getPath();if(!d||d.indexOf(v)!==0){this.getView().getModel("internal").setProperty("/deepestPath",v,undefined,true);}}},displayMessagePage:function(e,p){},updateUIStateForView:function(v,F){}});});
