// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/Config","sap/ushell/adapters/cdm/v3/_LaunchPage/readApplications","sap/ushell/adapters/cdm/v3/_LaunchPage/readPages","sap/ushell/adapters/cdm/v3/_LaunchPage/readUtils","sap/base/util/values","sap/ui/thirdparty/jquery","sap/ushell/library","sap/ushell/adapters/cdm/v3/_LaunchPage/readVisualizations","sap/base/Log"],function(C,r,a,b,o,q,u,c,L){"use strict";var D=u.DisplayFormat;var S=function(){};S.COMPONENT_NAME="sap/ushell/services/SearchableContent";S.prototype.getApps=function(){if(C.last("/core/spaces/enabled")){return this._getPagesAppData().then(this._filterGetApps);}return this._getLaunchPageAppData().then(this._filterGetApps);};S.prototype._filterGetApps=function(A){A.forEach(function(d){var v=d.visualizations;var U=[];d.visualizations=[];v.forEach(function(V){var s=JSON.stringify({title:V.title,subtitle:V.subtitle,icon:V.icon,vizTypeId:V.vizTypeId});if(U.indexOf(s)===-1){d.visualizations.push(V);U.push(s);}});});return A.filter(function(d){return d.visualizations.length>0;});};S.prototype._getLaunchPageAppData=function(){return sap.ushell.Container.getServiceAsync("LaunchPage").then(function(l){this._oLaunchPageService=l;return this._collectLaunchPageTiles();}.bind(this)).then(function(l){return Promise.all(l.map(function(t){if(!this._oLaunchPageService.getCatalogTilePreviewTitle(t)){return new Promise(function(d,e){this._oLaunchPageService.getCatalogTileViewControl(t).done(d).fail(e);}.bind(this)).then(function(T){return{tile:t,view:T};});}return Promise.resolve({tile:t});}.bind(this)));}.bind(this)).then(function(t){var A={};var v=t.map(function(T){return this._buildVizDataFromLaunchPageTile(T.tile);}.bind(this)).filter(function(V){return V;});t.forEach(function(T){var d=T.view;if(d){if(!d.destroy){var i=this._oLaunchPageService.getCatalogTileId(T.tile)||this._oLaunchPageService.getTileId(T.tile);L.error("The tile with id '"+i+"' does not implement mandatory function destroy");}else{d.destroy();}}}.bind(this));v.forEach(function(V){var T=V.targetURL;if(T){if(A[T]){A[T].visualizations.push(V);}else{A[T]=this._buildAppDataFromViz(V);}}}.bind(this));return o(A);}.bind(this));};S.prototype._collectLaunchPageTiles=function(){return new Promise(function(d,e){this._oLaunchPageService.getCatalogs().then(function(f){var g=[];f.forEach(function(h){g.push(this._oLaunchPageService.getCatalogTiles(h));}.bind(this));var G=this._oLaunchPageService.getGroups().then(function(h){var t=[];h.forEach(function(i){Array.prototype.push.apply(t,this._oLaunchPageService.getGroupTiles(i)||[]);}.bind(this));return t;}.bind(this));g.push(G);return q.when.apply(q,g).then(function(){var t=[];var h=Array.prototype.slice.call(arguments);h.forEach(function(i){Array.prototype.push.apply(t,i);});d(t);});}.bind(this));}.bind(this));};S.prototype._getPagesAppData=function(){var A,s;return sap.ushell.Container.getServiceAsync("CommonDataModel").then(function(d){return Promise.all([d.getAllPages(),d.getApplications(),d.getVisualizations(),d.getVizTypes(),sap.ushell.Container.getServiceAsync("URLParsing"),sap.ushell.Container.getServiceAsync("ClientSideTargetResolution")]);}).then(function(R){var p=R[0];var d=R[1];var v=R[2];var V=R[3];var U=R[4];var e=R[5];s={applications:d,visualizations:v,vizTypes:V};A={};this._applyCdmVisualizations(s,A,U);this._applyCdmPages(s,p,A,U);return this._filterAppDataByIntent(A,U,e);}.bind(this)).then(function(){this._applyCdmApplications(s,A);return o(A);}.bind(this));};S.prototype._filterAppDataByIntent=function(A,U,d){var i=Object.keys(A).filter(U.isIntentUrl.bind(U));if(i.length===0){return Promise.resolve();}return new Promise(function(e,f){d.isIntentSupported(i).then(function(s){Object.keys(s).forEach(function(t){if(!s[t].supported&&A[t]){delete A[t];}});}).always(e);});};S.prototype._applyCdmApplications=function(s,A){Object.keys(A).forEach(function(k){var v=A[k].visualizations;var V=v.find(function(e){return e.target.appId&&e.target.inboundId;});if(V){var d=s.applications[V.target.appId];var i=r.getInbound(d,V.target.inboundId);A[k]=this._buildAppDataFromAppAndInbound(d,i);A[k].visualizations=v;A[k].target=v[0].target;}else{A[k]=this._buildAppDataFromViz(v[0]);A[k].visualizations=v;A[k].target=v[0].target;}}.bind(this));};S.prototype._applyCdmVisualizations=function(s,A,U){Object.keys(s.visualizations).forEach(function(k){var v={vizId:k,displayFormatHint:D.Standard};var V=b.getVizData(s,v,U);var t=V.targetURL;this._changeVizType(V);V.preview=true;if(t){if(A[t]){A[t].visualizations.push(V);}else{A[t]={visualizations:[V]};}}}.bind(this));};S.prototype._applyCdmPages=function(s,p,A,U){p.forEach(function(P){var v=a.getVisualizationReferences(P);v.forEach(function(V){if(V.displayFormatHint&&V.displayFormatHint!==D.Standard){V=Object.assign({},V);V.displayFormatHint=D.Standard;}var d=b.getVizData(s,V,U);var t=d.targetURL;this._changeVizType(d);d.preview=true;if(t){if(A[t]){A[t].visualizations.push(d);}else{A[t]={visualizations:[d]};}}}.bind(this));}.bind(this));};S.prototype._changeVizType=function(v){if(v._instantiationData.platform==="CDM"&&!c.isStandardVizType(v.vizType)){v.vizType="sap.ushell.StaticAppLauncher";v._instantiationData.vizType={"sap.ui5":{componentName:"sap.ushell.components.tiles.cdm.applauncher"}};}};S.prototype._buildAppDataFromAppAndInbound=function(A,i){return{id:r.getId(A),title:i.title||r.getTitle(A),subtitle:i.subTitle||r.getSubTitle(A),icon:i.icon||r.getIcon(A),info:i.info||r.getInfo(A),keywords:i.keywords||r.getKeywords(A),visualizations:[]};};S.prototype._buildAppDataFromViz=function(v){return{id:v.vizId,title:v.title,subtitle:v.subtitle,icon:v.icon,info:v.info,keywords:v.keywords,target:v.target,visualizations:[v]};};S.prototype._buildVizDataFromLaunchPageTile=function(l){var v;if(this._oLaunchPageService.getCatalogTileTargetURL(l)&&this._oLaunchPageService.isTileIntentSupported(l)){v={id:this._oLaunchPageService.getTileId(l)||this._oLaunchPageService.getCatalogTileId(l),vizId:this._oLaunchPageService.getCatalogTileId(l)||this._oLaunchPageService.getTileId(l)||"",vizTypeId:"",title:this._oLaunchPageService.getCatalogTilePreviewTitle(l)||this._oLaunchPageService.getCatalogTileTitle(l)||this._oLaunchPageService.getTileTitle(l)||"",subtitle:this._oLaunchPageService.getCatalogTilePreviewSubtitle(l)||"",icon:this._oLaunchPageService.getCatalogTilePreviewIcon(l)||"sap-icon://business-objects-experience",info:this._oLaunchPageService.getCatalogTilePreviewInfo(l)||"",keywords:this._oLaunchPageService.getCatalogTileKeywords(l)||[],target:{type:"URL",url:this._oLaunchPageService.getCatalogTileTargetURL(l)},targetURL:this._oLaunchPageService.getCatalogTileTargetURL(l)};if(l.getChip){v._instantiationData={platform:"LAUNCHPAGE",launchPageTile:l};}else{v._instantiationData={platform:"CDM",vizType:{"sap.ui5":{componentName:"sap.ushell.components.tiles.cdm.applauncher"}}};}}return v;};S.hasNoAdapter=true;return S;},true);