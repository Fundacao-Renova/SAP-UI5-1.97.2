// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/thirdparty/URI","sap/ushell/components/cards/ManifestPropertyHelper","sap/ui/thirdparty/jquery","sap/base/util/ObjectPath","sap/base/util/isEmptyObject","sap/m/GenericTile","sap/ushell/Config","sap/base/util/deepExtend","sap/ushell/utils/chipsUtils","sap/ushell_abap/pbServices/ui2/ChipInstance","sap/ushell_abap/pbServices/ui2/Catalog","sap/ushell_abap/pbServices/ui2/ChipDefinition","sap/ushell_abap/pbServices/ui2/Utils","sap/ushell_abap/pbServices/ui2/Page","sap/ushell_abap/pbServices/ui2/Error","sap/base/Log","sap/m/library","sap/ushell/ui/tile/StaticTile"],function(U,M,q,O,a,G,C,d,c,b,f,g,h,P,S,L,m,j){"use strict";var k=m.LoadState;var l="sap.ushell_abap.adapters.abap.LaunchPageAdapter",D="/UI2/Fiori2LaunchpadHome",o="/UI2/FLPD_CATALOG",p="X-SAP-UI2-CHIP:/UI2/DYNAMIC_APPLAUNCHER",r="X-SAP-UI2-CHIP:/UI2/STATIC_APPLAUNCHER",t="X-SAP-UI2-CHIP:/UI2/CARD",u={catalogTileNotFound:"catalogTileNotFound",referenceTileNotFound:"referenceTileNotFound",noTargetMapping:"noTargetMapping",emptyConfiguration:"emptyConfiguration",tileIntentSupportException:"tileIntentSupportException"};var v="/UI2/FLPNoActionChip";var w=function(x,y,A){var z,B,E,T=new h.Map(),F=(A&&A.config)||{},H=F.services&&F.services.targetMappings,I=F.services&&F.services.launchPage,J={},K=this;this._oCurrentPageSet=null;this._bPageSetFullyLoaded=false;if(!H){throw new Error("Configuration for target mappings service not passed");}if(!H.baseUrl){throw new Error("baseUrl was not passed in Configuration for target mappings service");}if(!H.relativeUrl){throw new Error("relativeUrl was not passed in Configuration for target mappings service");}if(sap.ui2.srvc.contracts.preview.setEnvironmentType){sap.ui2.srvc.contracts.preview.setEnvironmentType("runtime");}function N(e,s,i){try{return e.getImplementationAsSapui5();}catch(n){L.error(i+": "+(n.message||n),n.stack,l);return new sap.ushell.ui.tile.StaticTile({icon:"sap-icon://error",info:"",infoState:"Critical",subtitle:n.message||n,title:s}).addStyleClass("sapUshellTileError");}}w.prototype._getBagText=function(e,s,i){if(e.getBagIds().indexOf(s)>-1&&e.getBag(s).getTextNames().indexOf(i)>-1){return e.getBag(s).getText(i);}return undefined;};w.prototype._getConfigurationProperty=function(i,s,n){var f1,g1;try{f1=i.getConfigurationParameter(s);g1=JSON.parse(f1);}catch(e){return undefined;}if(g1[n]!==undefined){return g1[n];}return undefined;};w.prototype._orderBasedOnConfiguration=function(e,s){var f1=(e&&h.isArray(e.order)?e.order:[]),g1={},h1=[],i1,j1,i,n;f1=f1.concat(e&&h.isArray(e.linkOrder)?e.linkOrder:[]);for(i=0,n=s.length;i<n;i+=1){i1=s[i];g1[i1.getId()]=i1;}for(i=0,n=f1.length;i<n;i+=1){j1=f1[i];if(Object.prototype.hasOwnProperty.call(g1,j1)){h1.push(g1[j1]);delete g1[j1];}}for(i=0,n=s.length;i<n;i+=1){i1=s[i];if(Object.prototype.hasOwnProperty.call(g1,i1.getId())){h1.push(i1);}}return h1;};function Q(e,i,s){if(s==="link"){return R(e.linkOrder,i.getId());}return R(e.order,i.getId());}function R(e,i){var s=e.indexOf(i);if(s<0){return s;}e.splice(s,1);return s;}function V(e,s,i,n){if(n==="link"){i=i-e.order.length;e.linkOrder.splice(i,0,s);}else{e.order.splice(i,0,s);}}function W(e,i){var n=i.getGroupTiles(e),s={order:[],linkOrder:[]};n.forEach(function(f1){var g1=i.getTileType(f1);if(g1==="link"){s.linkOrder.push(f1.getId());}else{s.order.push(f1.getId());}});return s;}function X(){var i;try{i=JSON.parse(K._oCurrentPageSet.getConfiguration());i.order.splice(0,0,K._oCurrentPageSet.getDefaultPage().getId());}catch(e){i={order:[K._oCurrentPageSet.getDefaultPage().getId()]};}return w.prototype._orderBasedOnConfiguration(i,K._oCurrentPageSet.getPages());}this.hideGroups=function(e){var i,n=new q.Deferred();if(!e||!(e instanceof Array)){n.reject("Input parameter must be of type Array.");}else{i=JSON.parse(K._oCurrentPageSet.getConfiguration()||"{}");i.hiddenGroups=e;K._oCurrentPageSet.setConfiguration(JSON.stringify(i),n.resolve.bind(n),n.reject.bind(n));}return n.promise();};this.isGroupVisible=function(e){var s=K._oCurrentPageSet.getConfiguration(),n,f1,i;if(!s){return true;}n=JSON.parse(s);if(!n||!n.hiddenGroups){return true;}f1=n.hiddenGroups;for(i=0;i<f1.length;i+=1){if(f1[i]===e.getId()){return false;}}return true;};w.prototype._triggerChipInstanceLoad=function(e){function s(){if(e._loadingDeferred){e._loadingDeferred.resolve();}delete e._loadingDeferred;delete e.$loadingPromise;}function i(n){L.error("Failed to load tile: "+n,e.toString(),l);if(e._loadingDeferred){e._loadingDeferred.reject();}delete e._loadingDeferred;delete e.$loadingPromise;}e.load(s,i);};this._loadApplaunchersAndDelayLoadingOfOtherChips=function(e,i){var n=0,s=[],f1=[];function g1(){if(n<=0){i();}}function h1(j1){j1._loadingDeferred=new q.Deferred();j1.$loadingPromise=j1._loadingDeferred.promise();if(window["sap-ui-debug"]===true){w.prototype._triggerChipInstanceLoad(j1);}else{sap.ui.require(["sap/ushell/EventHub"],function(k1){var l1=k1.on("CoreResourcesComplementLoaded");l1.do(function(m1){if(m1.status==="success"){w.prototype._triggerChipInstanceLoad(j1);l1.off();}else{L.error("Did not load custom tile as core resources where not loaded",null,l);}});});}}function i1(j1){function k1(){n-=1;g1();}n+=1;j1.load(k1,function(l1){L.error("Failed to load tile: "+l1,j1.toString(),l);k1();});}e.forEach(function(j1){j1.getChipInstances().forEach(function(k1){if(a1(k1)){f1.push(k1);}else if(b1(k1)){}else if($(k1)||_(k1)){i1(k1);}else{s.push(k1);}});});s.forEach(function(j1){h1(j1);});f1.forEach(function(j1){h1(j1);});g1();};w.prototype._readTargetMappings=function(){var e=new q.Deferred(),i,s,n;function f1(h1){var i1=[];var j1=h1.targetMappings||h1||{};Object.keys(j1).forEach(function(k1){var l1={};["semanticObject","semanticAction","formFactors"].forEach(function(m1){l1[m1]=j1[k1][m1];});i1.push(l1);});return i1;}if(O.get("compactTMPromise",F)){F.compactTMPromise.then(function(h1){var i1=f1(h1||{});e.resolve({results:i1});},function(h1){e.reject(h1);});return e.promise();}i=O.create("services.targetMappings",F);s=i.cacheId||"";n="/sap/bc/ui2/start_up?so=%2A&action=%2A&tm-compact=true&shellType="+K._getShellType()+"&depth=0";if(s){n+=(n.indexOf("?")<0?"?":"&")+"sap-cache-id="+s;}var g1=i.sUI2CacheDisable;if(g1){n+=(n.indexOf("?")<0?"?":"&")+"sap-ui2-cache-disable="+g1;}h.get(n,false,function(h1){var i1=JSON.parse(h1),j1=i1.targetMappings||{},k1=f1(j1);e.resolve({results:k1});},function(h1){e.reject(h1);});return e.promise();};w.prototype._makeTargetMappingSupportKey=function(s,e){return s+"-"+e;};w.prototype._isWrapperOnly=function(e){return!e.getConfiguration();};function Y(e,i){var n=[];i.forEach(function(s){var f1=s.getRemoteCatalog(),g1;if(s.getBaseChipId()==="X-SAP-UI2-CHIP:/UI2/ACTION"){return;}g1=e.createChipInstance({chipId:s.getId(),remoteCatalogId:f1&&f1.getId()});n.push(g1);});return n;}function Z(e){var n=K._oCurrentPageSet.getDefaultPage().getAllCatalogs(),s,f1=n.getCatalogs(),g1=[],i;for(i=0;i<f1.length;i+=1){s=f1[i];g1.push({data:{},errorMessage:undefined,id:s.getId(),title:s.isStub()?s.getId():s.getTitle(),tiles:s.isStub()?[]:Y(e,s.getChips()),ui2catalog:s});}return g1;}function $(e){var s=e.getChip().getBaseChipId();return s===p||s===r;}function _(e){var s=e.getChip().getBaseChipId();return t===s;}function a1(e){return!!e.getChip().getRemoteCatalog();}function b1(e){return!a1(e)&&e.getChip().getBaseChipId()===undefined;}function c1(e){var i,s=e.getConfigurationParameter("tileConfiguration");try{i=JSON.parse(s||"{}");}catch(n){L.error("Tile with ID '"+e.getId()+"' has a corrupt configuration containing a 'tileConfiguration' value '"+s+"' which could not be parsed. If present, a (stringified) JSON is expected as value.",n.message,"sap.ushell_abap.adapters.abap.LaunchPageAdapter");return{};}return i;}function d1(e){var i={},n,s,f1;try{n=JSON.parse(e.getChip()._getChipRawConfigurationString());s=JSON.parse(n&&n.tileConfiguration||"{}");f1=JSON.parse(s&&s.TILE_PROPERTIES||"{}");if(f1.semanticObject&&f1.semanticAction){i.navigation_use_semantic_object=true;i.navigation_semantic_object=f1.semanticObject;i.navigation_semantic_action=f1.semanticAction;}}catch(g1){return{};}return i;}function e1(e){var s,i,n;if(e.getChip().getBaseChipId()==="X-SAP-UI2-CHIP:/UI2/AR_SRVC_NEWS"){return{navigation_use_semantic_object:true,navigation_semantic_object:"NewsFeed",navigation_semantic_action:"displayNewsList",navigation_semantic_parameters:"",navigation_target_url:"#NewsFeed-displayNewsList"};}s=d1(e);if(s.navigation_use_semantic_object){return s;}try{n=JSON.parse(e.getChip()._getChipRawConfigurationString());i=JSON.parse(n&&n.tileConfiguration||"{}");}catch(f1){return{};}return i;}this._parseFullChipId=function(s){var e=s.split(":"),i=e.pop(),n=null;if(e.length>2){n=e.shift();}return{id:i,prefix:n,catalog:e.join(":")};};this.getTargetMappingSupport=function(){return T;};this._parseReferenceLost=function(s){var e,i=s||Object.prototype.toString.apply(i);if(!i.match(/^Reference lost: Note \d+ Page.+\s,\sInstance ID.+$/)){L.warning("The string that describes a lost reference is in an unexpected format","This is expected to be a string exactly like 'Reference lost: Note <#> Page <CATALOG_ID> , Instance ID <CHIP_ID>' instead of the given '"+s+"'","sap.ushell_abap.adapters.abap.LaunchPageAdapter");return{id:"Unknown",catalog:"Unknown"};}e=i.split(" , ").map(function(n){return n.split(" ").pop();});return{id:e[1],catalog:e[0]};};this._flattenArray=function(i){var K=this;if(Object.prototype.toString.apply(i)!=="[object Array]"){return i;}return i.reduce(function(e,n){return e.concat(K._flattenArray(n));},[]);};this._findAndReportTileErrors=function(e,T){var i=this._getPossibleTileErrors(e,T);if(i.length>0){this._reportTileErrors(i);}};this._getPossibleTileErrors=function(e,T){var K=this;return e.map(function(i){return{group:{id:i.getId(),title:i.getTitle()},errors:K._getPossibleTileErrorsFromOnePage(i,T)};});};this._getPossibleTileErrorsFromOnePage=function(e,T){var K=this;var i=e.getChipInstances().reduce(function(n,s){var f1,g1,h1,i1,j1,k1,l1,m1;m1=s.getChip();g1=K._parseFullChipId(m1.getId());if(!m1.isInitiallyDefined()){n.push({type:u.catalogTileNotFound,chipInstanceId:s.getId(),chipId:g1.id,chipCatalogId:g1.catalog});}else if(m1.isReference()&&m1.isBrokenReference()){j1=K._parseReferenceLost(m1.getTitle());n.push({type:u.referenceTileNotFound,chipInstanceId:s.getId(),referenceChipId:g1.id,referenceChipCatalogId:g1.catalog,missingReferredChipId:j1.id,missingReferredCatalogId:j1.catalog});}else{try{f1=K._checkTileIntentSupport(s,T);}catch(n1){f1={isSupported:false,reason:u.tileIntentSupportException,exception:n1};}if(!f1.isSupported){i1=K._getBagText(s,"tileProperties","display_title_text");h1=K._getBagText(s,"tileProperties","display_subtitle_text");switch(f1.reason){case u.noTargetMapping:if($(s)){k1=c1(s);}else{k1=e1(s);}n.push({type:u.noTargetMapping,chipInstanceId:s.getId(),chipInstanceTitle:i1||k1.display_title_text||s.getTitle(),chipInstanceSubtitle:h1||k1.display_subtitle_text,tileURL:k1.navigation_target_url||"#"+k1.navigation_semantic_object+"-"+k1.navigation_semantic_action+(k1.navigation_semantic_parameters?"?"+k1.navigation_semantic_parameters:"")});break;case u.emptyConfiguration:l1=s.getConfigurationParameter("tileConfiguration");n.push({type:u.emptyConfiguration,chipInstanceId:s.getId(),chipInstanceTitle:i1||s.getTitle(),chipInstanceSubtitle:h1||null,tileConfiguration:l1});break;case u.tileIntentSupportException:n.push({type:u.tileIntentSupportException,exception:f1.exception,chipInstanceId:s.getId()});break;case u.referenceTileNotFound:break;default:}}}return n;},[]);return i;};this._formatTileError=function(e){switch(e.type){case u.catalogTileNotFound:return"comes from catalog tile with ID '"+e.chipId+"' but this cannot be found in catalog '"+e.chipCatalogId+"' (CATALOG TILE NOT FOUND).";case u.referenceTileNotFound:return"comes from reference tile '"+e.referenceChipId+"'"+" in catalog '"+e.referenceChipCatalogId+"'"+" which in turn refers to the tile '"+e.missingReferredChipId+"'"+" from catalog '"+e.missingReferredCatalogId+"', but this is missing (REFERENCED TILE NOT FOUND).";case u.noTargetMapping:return"was hidden because a target mapping for the tile URL '"+e.tileURL+"' was not found (TARGET MAPPING NOT FOUND).";case u.emptyConfiguration:return"the tile configuration '"+e.tileConfiguration+"' is empty or invalid (BAD CONFIGURATION).";case u.tileIntentSupportException:return"exception occurred while checking tile intent support: "+e.exception+" (EXCEPTION RAISED).";default:return"unknown error type '"+e.type+"' (UNKNOWN ERROR). Error data: "+JSON.stringify(e,null,3);}};this._reportTileErrors=function(e){var K=this;var n=[];var f1=[];function g1(h1,i1){var j1=[h1,i1].map(function(s,i){return i===1&&s?"("+s+")":s;}).filter(function(s){return typeof s==="string"&&s.length>0;}).join(" ");return(j1.length>0)?"'"+j1+"'":"";}e.forEach(function(i){var h1="  in Group '"+i.group.title+"' with Group ID '"+i.group.id+"'",i1=[],j1=[];i.errors.forEach(function(k1){var l1=["  - tile instance",g1(k1.chipInstanceTitle,k1.chipInstanceSubtitle),"with ID '"+k1.chipInstanceId+"'"].filter(function(s){return s.length>0;}).join(" ");if(k1.type===u.noTargetMapping){j1.push([l1,"    "+K._formatTileError(k1)].join("\n"));}else{i1.push([l1,"    "+K._formatTileError(k1)].join("\n"));}});if(i1.length>0){f1.push([h1,i1.join("\n")].join("\n"));}if(j1.length>0){n.push([h1,j1.join("\n")].join("\n"));}});if(f1.length>0){f1.unshift("Tile error(s) were detected:");L.error(f1.join("\n"),null,"sap.ushell_abap.adapters.abap.LaunchPageAdapter");}if(n.length>0){n.unshift("Tile warning(s) were detected:");L.warning(n.join("\n"),null,"sap.ushell_abap.adapters.abap.LaunchPageAdapter");}};this.getGroups=function(){if(this._bPageSetFullyLoaded){return new q.Deferred().resolve(X()).promise();}if(!B){B=new q.Deferred();var e=new q.Deferred();sap.ushell.Container.getServiceAsync("PageBuilding").then(function(i){var n=i.getFactory().getPageBuildingService().readPageSet;if(I&&I.cacheId){n.cacheBusterTokens.put(D,I.cacheId);}if(I&&I["sap-ui2-cache-disable"]&&n){var s=n.appendedParameters||{};s["sap-ui2-cache-disable"]=I["sap-ui2-cache-disable"];n.appendedParameters=s;}var f1=this._readTargetMappings().done(function(j1){var k1=h.getFormFactor();j1.results.forEach(function(l1){var m1=w.prototype._makeTargetMappingSupportKey(l1.semanticObject,l1.semanticAction);T.put(m1,T.get(m1)||!!(l1.formFactors&&l1.formFactors[k1]));});});if(C.last("/core/spaces/enabled")){var g1=i.getFactory();var h1=new P(g1,{id:v});K._oCurrentPageSet={getDefaultPage:function(){return h1;},getPages:function(){return[h1];},appendPage:function(){throw new Error("Not implemented in Pages Runtime");},isPageRemovable:function(){return false;},removePage:function(){throw new Error("Not implemented in Pages Runtime");},isPageResettable:function(){return true;},resetPage:function(){},getConfiguration:function(){return"{}";},setConfiguration:function(){},filter:function(){}};B.resolve([]);}else{var i1=i.getPageSet(D);i1.fail(e.reject.bind(e)).done(function(j1){this._oCurrentPageSet=j1;this._oCurrentPageSet.filter([D],[o]);this._loadApplaunchersAndDelayLoadingOfOtherChips(j1.getPages(),e.resolve.bind(e,j1));}.bind(this));q.when(f1,e).done(function(j1,k1){this._bPageSetFullyLoaded=true;if(L.getLevel()>=L.Level.DEBUG){this._findAndReportTileErrors(k1.getPages(),T);}B.resolve(X());}.bind(this)).fail(B.reject.bind(B));}}.bind(this));}return B.promise();};this.getDefaultGroup=function(){var e=new q.Deferred();this.getGroups().done(function(){e.resolve(K._oCurrentPageSet.getDefaultPage());}).fail(e.reject.bind(e));return e.promise();};this.getGroupTitle=function(e){return e.getTitle();};this.getGroupId=function(e){return e.getId();};this.getGroupTiles=function(i){var n;try{n=JSON.parse(i.getLayout());}catch(e){L.warning("Group "+i.getId()+": invalid layout: "+i.getLayout(),null,l);}return this._orderBasedOnConfiguration(n,i.getChipInstances());};this.addGroup=function(s){var e=new q.Deferred();K._oCurrentPageSet.appendPage(s,o,e.resolve.bind(e),e.reject.bind(e,X()));return e.promise();};this.removeGroup=function(e){var i=new q.Deferred();if(K._oCurrentPageSet.isPageRemovable(e)){K._oCurrentPageSet.removePage(e,i.resolve.bind(i),i.reject.bind(i,X()));}else{i.reject(X());}return i.promise();};this.resetGroup=function(e){var i=new q.Deferred(),K=this;if(K._oCurrentPageSet.isPageRemovable(e)){i.reject(X());}else if(K._oCurrentPageSet.isPageResettable(e)){K._oCurrentPageSet.resetPage(e,function(){K._loadApplaunchersAndDelayLoadingOfOtherChips([e],i.resolve.bind(i,e));},i.reject.bind(i,X()));}else{i.resolve(e);}return i.promise();};this.isGroupRemovable=function(e){return K._oCurrentPageSet.isPageRemovable(e);};this.isGroupLocked=function(e){return e.isPersonalizationLocked();};this.isLinkPersonalizationSupported=function(e){if(!e){return true;}if(!e.isStub()){var i=e.getContract&&e.getContract("types"),n=i&&i.getAvailableTypes()||[];return n.indexOf("link")!==-1;}return false;};this.isTileIntentSupported=function(e){var i,s,n,f1,g1=this._checkTileIntentSupport(e,T);if(!g1.isSupported&&g1.reason===u.noTargetMapping){if($(e)){i=c1(e);}else{i=e1(e);}f1=this._getBagText(e,"tileProperties","display_title_text")||i.display_title_text;n=this._getBagText(e,"tileProperties","display_subtitle_text")||i.display_subtitle_text;s=i.navigation_target_url;L.warning("Group tile with ID '"+e.getId()+"' is filtered out as the current user has no target mapping assigned for the intent '"+s+"'","\nGroup Tile ID: '"+e.getId()+"'\n"+"Title: '"+f1+"'\n"+"Subtitle: '"+n+"'\n"+"Intent: '"+s+"' - ","sap.ushell_abap.adapters.abap.LaunchPageAdapter");}return g1.isSupported;};this._checkTileIntentSupport=function(e,T){var i,n;var s=w.prototype._makeTargetMappingSupportKey;if(!$(e)){i=e1(e);if(!i.navigation_use_semantic_object||!i.navigation_semantic_object||!i.navigation_semantic_action){return{isSupported:true};}n=T.get(s(i.navigation_semantic_object,i.navigation_semantic_action));if(!n){n=T.get(s("*",i.navigation_semantic_action));}if(!n){return{isSupported:false,reason:u.noTargetMapping};}return{isSupported:true};}if(e.isStub()){throw new S("Applauncher Tile not loaded completely","sap.ushell_abap.adapters.abap.LaunchPageAdapter");}if(e.getChip()&&typeof e.getChip().isBrokenReference==="function"&&e.getChip().isBrokenReference()){return{isSupported:false,reason:u.referenceTileNotFound};}i=c1(e);if(a(i)){return{isSupported:false,reason:u.emptyConfiguration};}if(!i.navigation_use_semantic_object){return{isSupported:true};}n=T.get(s(i.navigation_semantic_object,i.navigation_semantic_action));if(n){return{isSupported:true};}return{isSupported:false,reason:u.noTargetMapping};};this.moveGroup=function(e,n){var i=new q.Deferred();function s(f1){var g1,h1=[];f1.forEach(function(i1){h1.push(i1.getId());});g1=JSON.parse(K._oCurrentPageSet.getConfiguration()||"{}");g1.order=h1;K._oCurrentPageSet.setConfiguration(JSON.stringify(g1),i.resolve.bind(i),i.reject.bind(i,X()));}this.getGroups().done(function(f1){var g1=f1.indexOf(e);f1.splice(g1,1);f1.splice(n,0,e);s(f1);});return i.promise();};this.setGroupTitle=function(e,n){var i=new q.Deferred();e.setTitle(n,i.resolve.bind(i),function(){i.reject(e.getTitle());});return i.promise();};this.addTile=function(e,i){var n=new q.Deferred(),s=e.getChip();if(e.isStub()){n.reject(X(),"Tile was not added to the group as the tile failed loading");}else{if(!i){i=K._oCurrentPageSet.getDefaultPage();}i.addChipInstance(s,n.resolve.bind(n),n.reject.bind(n,X()));}return n.promise();};this.removeTile=function(e,i){var n=q.Deferred();e.removeChipInstance(i,n.resolve.bind(n),n.reject.bind(n,X()));return n.promise();};this.moveTile=function(e,s,i,n,f1,g1){var h1=new q.Deferred(),i1=this._isWrapperOnly(e),j1=new h.Map(),k1,l1=h1.reject.bind(h1,X()),m1=2;function n1(r1){m1-=1;k1=k1||r1;if(m1<=0){h1.resolve(k1);}}if(!f1){f1=n;}var o1=W(n,this);var p1=W(f1,this);var q1=this.getTileType(e);s=Q(o1,e,q1);if(s<0){L.error("moveTile: tile not found in source group",null,l);l1();return h1.promise();}if(n===f1){V(o1,e.getId(),i,g1);n.setLayout(JSON.stringify(o1),h1.resolve.bind(h1,e),l1);}else{sap.ushell.Container.getServiceAsync("PageBuilding").then(function(r1){var s1=r1.getFactory().getPageBuildingService();var t1=e.getBagIds();t1.forEach(function(v1){var w1={texts:[],properties:[]},x1=e.getBag(v1);x1.getOwnTextNames().forEach(function(y1){w1.texts.push({name:y1,value:x1.getText(y1)});});x1.getOwnPropertyNames().forEach(function(y1){w1.properties.push({name:y1,value:x1.getProperty(y1)});});if(w1.texts.length>0||w1.properties.length>0){j1.put(v1,w1);}});s1.openBatchQueue();var u1=this.getGroupTiles(f1);f1.addChipInstance(i1?e.getChip():e,function(v1){var w1,x1;u1.splice(i,0,v1);t1.forEach(function(y1){x1=j1.get(y1);if(x1){w1=v1.getBag(y1);x1.texts.forEach(function(z1){w1.setText(z1.name,z1.value);});x1.properties.forEach(function(z1){w1.setProperty(z1.name,z1.value);});w1.save(function(){},function(){L.error("Bag "+y1+": could not be saved",null,l);});}});V(p1,v1.getId(),i,g1);f1.setLayout(JSON.stringify(p1),n1.bind(this,v1),l1);},l1,e.isStub());n.removeChipInstance(e,n1,l1);n.setLayout(JSON.stringify(o1),undefined,l1);s1.submitBatchQueue(undefined,l1);}.bind(this));}return h1.promise();};this.getTileId=function(e){return e.getId();};this.getTileType=function(i){var n=i.getPage(),s;try{s=JSON.parse(n.getLayout());if(s.linkOrder&&s.linkOrder.indexOf(i.getId())>-1){return"link";}}catch(e){L.warning("Group "+n.getId()+": invalid layout: "+n.getLayout(),null,l);}if(i.isStub()===false){var f1=i.getContract("types");if(f1&&f1.getAvailableTypes().indexOf("card")>-1){return"card";}}return"tile";};this.getCardManifest=function(e){var s,i,n;try{s=e.getConfigurationParameter("cardManifest");i=JSON.parse(s);n=M.getCardData(e);i=M.mergeCardData(i,n);return i;}catch(f1){L.error("Manifest of card with id '"+e.getId()+"' could not be read. "+f1.message);}};this.getTileTitle=function(e){return e.getTitle();};this.getTileView=function(e){var K=this;var i=new q.Deferred();var n;function s(){var g1;n=e.getContract("types");if(n){g1=K.getTileType(e);n.setType(g1);}e.getImplementationAsSapui5Async().then(function(h1){if(g1==="link"){var i1,j1,k1,l1;if(!h1.hasModel()){h1=h1.getComponentInstance().getRootControl();}i1=h1.getModel();j1=h1.getController();k1=i1&&i1.getProperty?i1.getProperty("/nav/navigation_target_url"):undefined;l1=new G({mode:"{view>/mode}",header:"{view>/config/display_title_text}",subheader:"{view>/config/display_subtitle_text}",sizeBehavior:"{view>/sizeBehavior}",size:"Auto",url:j1.formatters&&j1.formatters.leanURL(k1),press:[j1.onPress,j1]});l1.setModel(i1,"view");i.resolve(l1);return;}i.resolve(h1);}).catch(f1);}function f1(g1){i.reject("Tile not successfully loaded"+(g1?(": "+g1):""));}if(!e.$loadingPromise){if(!e.isStub()){h.callHandler(s,f1,!$(e));}else{f1();}}else{e.$loadingPromise.fail(f1).done(function(){try{s();}catch(ex){f1((ex.message||ex));}});}return i.promise();};this.getTileSize=function(e){var i=(!e.isStub()&&e.getConfigurationParameter("row"))||"1",n=(!e.isStub()&&e.getConfigurationParameter("col"))||"1";return i+"x"+n;};this.refreshTile=function(e){e.refresh();};this.setTileVisible=function(e,n){var i=!e.isStub()&&e.getContract("visible"),s,f1;if(i){i.setVisible(n);return;}if(e.isStub()&&e.$loadingPromise){s=this.getTileId(e);f1=J[s];J[s]=n;if(f1===undefined){e.$loadingPromise.done(function(){var i=e.getContract("visible");if(i){i.setVisible(J[s]);}});}return;}};this.getTileActions=function(e){var i=!e.isStub()&&e.getContract("actions");if(i){return i.getActions();}return[];};this.getTileTarget=function(){return null;};this.getTileDebugInfo=function(e){var s,i=e.getChip(),n=i.getCatalog(),f1={chipId:i.getId(),chipInstanceId:e.getId(),chipTitle:i.getTitle(),chipDescription:i.getDescription(),completelyLoaded:!e.isStub()};if(n){f1.catalogId=n.getId();}s=JSON.stringify(f1);return s;};this.getCatalogs=function(){var e,i=E,n=z===false;if(i&&!i.$notified&&!n){e=i;}else{E=new q.Deferred();e=E;e.done(function(){if(e===E){z=true;}}).always(function(){if(e===E){E=null;}});if(i){if(n){z=undefined;}i.always(function(){this._startLoading(e,n);}.bind(this));}else{this._startLoading(e,n);}}return e.promise();};this._refreshRemoteCatalogs=function(e){return sap.ushell.Container.getServiceAsync("PageBuilding").then(function(i){var n=0;var s=i.getFactory();var f1=Z(s);f1.forEach(function(g1){var h1=g1.ui2catalog;if(h1.isStub()||h1.getType()==="H"||h1.getType()==="REMOTE"){n+=1;h1.refresh(function(){g1.title=h1.getTitle();g1.tiles=Y(s,h1.getChips());e.notify(g1);n-=1;if(n<=0){e.resolve(f1);}},function(i1){L.error("Failed to load catalog: "+i1,h1.toString(),l);g1.errorMessage=i1||"Error";e.notify(g1);n-=1;if(n<=0){e.resolve(f1);}});}else{e.notify(g1);e.$notified=true;}});if(n<=0){e.resolve(f1);}});};this._useKnownCatalogs=function(e){return sap.ushell.Container.getServiceAsync("PageBuilding").then(function(i){var n=Z(i.getFactory());n.forEach(function(s){e.notify(s);});e.resolve(n);});};this._doGetCatalogs=function(e,i){var n=this._oCurrentPageSet.getDefaultPage().getAllCatalogs();if(n.isStub()){n.load(function(){this._refreshRemoteCatalogs(e);}.bind(this),e.reject,"type eq 'CATALOG_PAGE' or type eq 'H' or type eq 'SM_CATALOG' or type eq 'REMOTE'",true,"title",true);}else if(i){this._refreshRemoteCatalogs(e);}else{this._useKnownCatalogs(e);}};this._startLoading=function(e,i){var n;if(H&&H.cacheId){n=sap.ushell.Container.getServiceAsync("PageBuilding").then(function(s){var f1=s.getFactory().getPageBuildingService().readAllCatalogs.cacheBusterTokens;f1.put(D,H.cacheId);if(C.last("/core/spaces/enabled")){f1.put(v,H.cacheId);}}).catch(e.reject);}else{n=Promise.resolve();}n.then(function(){if(K._bPageSetFullyLoaded){this._doGetCatalogs(e,i);}else{this.getGroups().done(function(){this._doGetCatalogs(e,i);}.bind(this)).fail(e.reject);}}.bind(this)).catch(e.reject);};this.isCatalogsValid=function(){return!!z;};this.getCatalogData=function(e){return e.ui2catalog.getCatalogData();};this.getCatalogError=function(e){return e.errorMessage;};this.getCatalogId=function(e){return e.id;};this.getCatalogTitle=function(e){return e.title;};this.getCatalogTiles=function(e){var i,n,s=new q.Deferred(),f1=0;function g1(){f1-=1;if(f1===0){s.resolve(e.tiles);}}function h1(i1,j1){L.error("Failed to load catalog tile: "+j1,i1.toString(),l);g1();}for(i=0;i<e.tiles.length;i+=1){n=e.tiles[i];if(n.isStub()){f1+=1;n.load(g1,h1.bind(null,n));}}if(f1===0){s.resolve(e.tiles);}return s.promise();};this.getCatalogTileNumberUnit=c.getCatalogTileNumberUnit;this.getCatalogTileId=function(e){var i=e.getChip(),s=i.getId();if(i.getCatalog()&&i.getCatalog().getCatalogData()&&i.getCatalog().getCatalogData().systemAlias){s+="_"+i.getCatalog().getCatalogData().systemAlias;}return s;};this.getCatalogTileTitle=function(e){return e.getChip().getTitle();};this.getCatalogTileSize=c.getCatalogTileSize;this.getCatalogTileView=function(e,i){i=typeof i!=="undefined"?i:true;var s=this.getCatalogTileTitle(e);if(e.isStub()){L.warning("CHIP (instance) is just a stub!",e.toString(true),l);return new sap.ushell.ui.tile.StaticTile({icon:"sap-icon://hide",info:"",infoState:"Critical",subtitle:"",title:s}).addStyleClass("sapUshellTileError");}if(i){var n=e.getContract("preview");if(n){n.setEnabled(true);}else{return new sap.ushell.ui.tile.StaticTile({title:s,subtitle:"",info:"",infoState:"Neutral",icon:"sap-icon://folder-full"});}}return N(e,s,"Cannot get catalog tile view as SAPUI5");};this.getCatalogTileViewControl=function(e,i){var n=new q.Deferred();i=typeof i!=="undefined"?i:true;var s=this.getCatalogTileTitle(e);if(e.isStub()){L.warning("CHIP (instance) is just a stub!",e.toString(true),l);n.resolve(this._createErrorTile(s,"CHIP was just a stub!"));return n.promise();}if(i){var f1=e.getContract("preview");if(f1){f1.setEnabled(true);}else{n.resolve(this._createPreviewTile(s));return n.promise();}}e.getImplementationAsSapui5Async().catch(function(g1){L.error("Cannot get catalog tile view as SAPUI5: "+(g1.message||g1),g1.stack,l);return this._createErrorTile(s,(g1.message||g1));}.bind(this)).then(n.resolve);return n.promise();};this._createErrorTile=function(s,e){var i=new G({state:k.Failed,header:s,subheader:e||""}).addStyleClass("sapUshellTileError");return i;};this._createPreviewTile=function(s){return new j({title:s,subtitle:"",info:"",infoState:"Neutral",icon:"sap-icon://folder-full"});};this.getCatalogTileTargetURL=c.getCatalogTileTargetURL;this.getCatalogTilePreviewSubtitle=c.getCatalogTilePreviewSubtitle;this.getCatalogTilePreviewTitle=c.getCatalogTilePreviewTitle;this.getCatalogTilePreviewInfo=c.getCatalogTilePreviewInfo;this.getCatalogTilePreviewIndicatorDataSource=c.getCatalogTilePreviewIndicatorDataSource;this.getCatalogTilePreviewIcon=c.getCatalogTilePreviewIcon;this.getCatalogTileKeywords=function(e){var i={},s=e.getTitle(),n=this.getCatalogTilePreviewSubtitle(e),f1=e.getChip().getDescription();function g1(i,l1){if(h.isArray(l1)){l1.forEach(function(m1){if(i.hasOwnProperty(m1)){return;}i[m1]=null;});}}function h1(e){var l1=w.prototype._getBagText(e,"tileProperties","display_search_keywords");if(!h.isString(l1)||l1===""){return[];}return l1.trim().split(/\s*,\s*/g);}function i1(e){var l1=w.prototype._getBagText(e,"tileProperties","display_info_text");if(l1){return[l1];}return[];}function j1(e){var l1=w.prototype._getConfigurationProperty(e,"tileConfiguration","display_number_unit");if(l1){return[l1];}return[];}function k1(e){var l1;if(e.isStub()){return[];}l1=e.getContract("search");if(l1){return l1.getKeywords();}return[];}g1(i,h1(e));g1(i,i1(e));g1(i,j1(e));g1(i,k1(e));if(s){g1(i,[s]);}if(n){g1(i,[n]);}if(f1){g1(i,[f1]);}return Object.keys(i);};this.addBookmark=function(e,i){var s=r,n={display_icon_url:e.icon||"",display_info_text:e.info||"",display_subtitle_text:e.subtitle||"",display_title_text:e.title},f1=new q.Deferred();var g1={tileProperties:{texts:{display_title_text:n.display_title_text,display_subtitle_text:n.display_subtitle_text,display_info_text:n.display_info_text}}};if(e.serviceUrl){s=p;n.display_number_unit=e.numberUnit;n.service_refresh_interval=e.serviceRefreshInterval||0;n.service_url=e.serviceUrl;}if(i&&!(i instanceof P)){f1.reject("The given object is not a group");return f1.promise();}n={tileConfiguration:JSON.stringify(n)};this._createBookmarkTile(s,e.url,n,g1,e.title,i).then(function(){f1.resolve();}).catch(function(h1){f1.reject(h1.toString());});return f1.promise();};this.addCustomBookmark=function(e,i){var n=e.vizConfig["sap.flp"].chipConfig;var s=new q.Deferred();if(i&&!(i instanceof P)){s.reject("The given object is not a group");return s.promise();}this._createBookmarkTile(n.chipId,e.url,n.configuration,n.bags,e.title,i).then(function(){s.resolve();}).catch(function(f1){s.reject(f1.toString());});return s.promise();};this._getTileTargetConfiguration=function(s){return sap.ushell.Container.getServiceAsync("URLParsing").then(function(e){var i={navigation_target_url:s,navigation_use_semantic_object:false};var n=new U();var f1=new U(s);var g1=f1.host()+f1.path()===n.host()+n.path();var h1=w.prototype._makeTargetMappingSupportKey;if(s[0]==="#"||g1){var i1=e.parseShellHash(e.getShellHash(s));if(i1&&T.get(h1(i1.semanticObject,i1.action))!==undefined){i.navigation_use_semantic_object=true;i.navigation_semantic_object=i1.semanticObject;i.navigation_semantic_action=i1.action;i.navigation_semantic_parameters=e.paramsToString(i1.params);}}return i;});};this._updateBags=function(e,i){var n=[];var s=[];if(!i){i={};n.push(Promise.resolve([]));}Object.keys(i).forEach(function(f1){var g1;var h1=false;var i1=i[f1];var j1=e.getBag(f1);try{for(g1 in i1.properties){j1.setProperty(g1,i1.properties[g1]);h1=true;}for(g1 in i1.texts){j1.setText(g1,i1.texts[g1]);h1=true;}n.push(new Promise(function(l1,m1){if(h1){s.push(f1);j1.save(l1,m1);}else{l1();}}));}catch(k1){n.push(Promise.reject(k1));}});return Promise.all(n).then(function(){return s;});};this._checkBookmarkConfiguration=function(e){return new Promise(function(i,n){try{var s=c1(e);if(!s.navigation_target_url){throw new Error("tileConfiguration.navigation_target_url was not set");}this.getTileSize(e);i();}catch(f1){var g1="Chip configuration check failed: "+f1.toString();L.error(g1,e.getId(),l);n(g1);}}.bind(this));};this._createBookmarkTile=function(s,e,i,n,f1,g1){return Promise.all([sap.ushell.Container.getServiceAsync("PageBuilding"),this._getTileTargetConfiguration(e)]).then(function(h1){var i1=h1[0];var j1=h1[1];if(!i.tileConfiguration){i.tileConfiguration=JSON.stringify(j1);}else{var k1=JSON.parse(i.tileConfiguration);k1=d({},k1,j1);i.tileConfiguration=JSON.stringify(k1);}var l1=i1.getFactory();var m1=l1.getPageBuildingService();return new Promise(function(n1,o1){if(this._bPageSetFullyLoaded){g1=g1||this._oCurrentPageSet.getDefaultPage();var p1=l1.createChipInstance({chipId:s,pageId:g1.getId(),title:f1,configuration:JSON.stringify(i),layoutData:""});g1.addChipInstance(p1,n1,o1,undefined);}else{try{m1.createPageChipInstanceFromRawData({chipId:s,configuration:JSON.stringify(i),pageId:"/UI2/Fiori2LaunchpadHome",title:f1},function(r1){l1.createChipInstance(r1,n1,o1,undefined);},o1);}catch(q1){o1(q1);}}}.bind(this));}.bind(this)).then(function(h1){return this._updateBags(h1,n).then(function(){return this._checkBookmarkConfiguration(h1);}.bind(this)).catch(function(i1){return new Promise(function(j1,k1){h1.remove(k1.bind(undefined,i1),k1.bind(undefined,i1));});});}.bind(this));};w.prototype._isBookmarkFor=function(e,i){var s=e.getChip().getBaseChipId();if(s!==undefined){var n=c1(e).navigation_target_url;if(typeof i==="string"){return $(e)&&n===i;}return i.chipId===s&&i.url===n;}return false;};w.prototype._visitBookmarks=function(s,e){var i=[],n=new q.Deferred();K.getGroups().fail(n.reject.bind(n)).done(function(f1){var g1=0;f1.forEach(function(h1){h1.getChipInstances().forEach(function(i1){if(K._isBookmarkFor(i1,s)){g1+=1;if(e){i.push(e(i1));}}});});if(i.length===0){n.resolve(g1);}else{q.when.apply(q,i).fail(function(h1){n.reject(h1);}).done(function(){n.resolve(g1);});}});return n.promise();};this._visitCustomBookmarks=function(i,e){if(!i.chipId){return Promise.reject("_visitCustomBookmarks: Required parameter is missing: oIdentifier.chipId");}return new Promise(function(n,s){this.getGroups().fail(s).done(function(f1){var g1=[];var h1=0;f1.forEach(function(i1){i1.getChipInstances().forEach(function(j1){if(w.prototype._isBookmarkFor(j1,i)){h1+=1;if(e){g1.push(e(j1));}}});});Promise.all(g1).then(function(){n(h1);}).catch(s);});}.bind(this));};this.countBookmarks=function(s){return w.prototype._visitBookmarks(s);};this.countCustomBookmarks=function(i){return this._visitCustomBookmarks(i);};this.deleteBookmarks=function(s){return w.prototype._visitBookmarks(s,function(e){var i=new q.Deferred();e.remove(i.resolve.bind(i),i.reject.bind(i));return i.promise();});};this.deleteCustomBookmarks=function(i){return this._visitCustomBookmarks(i,function(e){return new Promise(function(n,s){e.remove(n,s);});});};this.updateBookmarks=function(s,e){return w.prototype._visitBookmarks(s,function(i){var n=c1(i),f1=new q.Deferred();var g1={tileProperties:{texts:{}}};if(e.title){g1.tileProperties.texts.display_title_text=e.title;}if(typeof e.subtitle==="string"){g1.tileProperties.texts.display_subtitle_text=e.subtitle;}if(typeof e.info==="string"){g1.tileProperties.texts.display_info_text=e.info;}var h1={display_icon_url:typeof e.icon==="string"?e.icon:n.display_icon_url,display_info_text:typeof e.info==="string"?e.info:n.display_info_text,display_subtitle_text:typeof e.subtitle==="string"?e.subtitle:n.display_subtitle_text,display_title_text:e.title||n.display_title_text,display_number_unit:typeof e.numberUnit==="string"?e.numberUnit:n.display_number_unit,service_refresh_interval:e.serviceRefreshInterval||n.service_refresh_interval,service_url:e.serviceUrl||n.service_url};var i1={};this._getTileTargetConfiguration(e.url||n.navigation_target_url).then(function(j1){h1=d({},h1,j1);i1.tileConfiguration=JSON.stringify(h1);}).then(function(){return new Promise(function(j1,k1){i.updateConfiguration(i1,j1,k1);});}).then(function(){i.getContract("configuration").fireConfigurationUpdated(Object.keys(i1));return this._updateBags(i,g1);}.bind(this)).then(function(j1){if(j1.length){i.getContract("bag").fireBagsUpdated(j1);}f1.resolve();}).catch(function(j1){f1.reject(j1.toString());});return f1.promise();}.bind(this));};this.updateCustomBookmarks=function(i,e){var n=O.get(["vizConfig","sap.flp","chipConfig"],e)||{};var s=n.configuration||{};var f1=n.bags||{};var g1=e.url;return this._visitCustomBookmarks(i,function(h1){return this._getTileTargetConfiguration(g1).then(function(i1){var j1;if(!s.tileConfiguration){j1=c1(h1);j1=d({},j1,i1);s.tileConfiguration=JSON.stringify(j1);}else{j1=JSON.parse(s.tileConfiguration);j1=d({},j1,i1);s.tileConfiguration=JSON.stringify(j1);}return new Promise(function(k1,l1){try{h1.updateConfiguration(s,k1,l1);}catch(m1){l1(m1);}});}).then(function(){h1.getContract("configuration").fireConfigurationUpdated(Object.keys(s));return this._checkBookmarkConfiguration(h1);}.bind(this)).then(function(){return this._updateBags(h1,f1);}.bind(this)).then(function(i1){if(i1.length){h1.getContract("bag").fireBagsUpdated(i1);}return new Promise(function(j1,k1){if(e.title){h1.setTitle(e.title,true,j1,k1);}else{j1();}});});}.bind(this));};this.onCatalogTileAdded=function(){z=false;};this.isCustomTile=function(e){return!$(e);};};w.prototype._getShellType=function(){if(sap&&sap.ushell_abap&&typeof sap.ushell_abap.getShellType==="function"){return sap.ushell_abap.getShellType();}return"FLP";};w.prototype._getCatalogTileIndex=function(){this._oCatalogTileIndexPromise=sap.ushell.Container.getServiceAsync("PageBuilding").then(function(e){var i=e.getFactory().getPageBuildingService();return new Promise(function(n,s){i.readAllCatalogs(v,n,s,"type eq 'CATALOG_PAGE' or type eq 'H' or type eq 'SM_CATALOG' or type eq 'REMOTE'","title",true);});}).then(function(R){var e={};R.results.forEach(function(i){i.Chips.results.forEach(function(n){if(!e[n.id]){e[n.id]=n;}});});return e;}).catch(function(){return{};});return this._oCatalogTileIndexPromise;};return w;},true);