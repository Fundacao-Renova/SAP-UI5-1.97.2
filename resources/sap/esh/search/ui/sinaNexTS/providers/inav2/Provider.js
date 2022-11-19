/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){var a=(this&&this.__extends)||(function(){var e=function(d,b){e=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(Object.prototype.hasOwnProperty.call(b,p))d[p]=b[p];};return e(d,b);};return function(d,b){if(typeof b!=="function"&&b!==null)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");e(d,b);function _(){this.constructor=d;}d.prototype=b===null?Object.create(b):(_.prototype=b.prototype,new _());};})();var c=(this&&this.__awaiter)||function(t,_,P,g){function b(v){return v instanceof P?v:new P(function(r){r(v);});}return new(P||(P=Promise))(function(r,d){function f(v){try{s(g.next(v));}catch(e){d(e);}}function i(v){try{s(g["throw"](v));}catch(e){d(e);}}function s(e){e.done?r(e.value):b(e.value).then(f,i);}s((g=g.apply(t,_||[])).next());});};var h=(this&&this.__generator)||function(b,d){var _={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g;return g={next:i(0),"throw":i(1),"return":i(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function i(n){return function(v){return s([n,v]);};}function s(o){if(f)throw new TypeError("Generator is already executing.");while(_)try{if(f=1,y&&(t=o[0]&2?y["return"]:o[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,o[1])).done)return t;if(y=0,t)o=[o[0]&2,t.value];switch(o[0]){case 0:case 1:t=o;break;case 4:_.label++;return{value:o[1],done:false};case 5:_.label++;y=o[1];o=[0];continue;case 7:o=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(o[0]===6||o[0]===2)){_=0;continue;}if(o[0]===3&&(!t||(o[1]>t[0]&&o[1]<t[3]))){_.label=o[1];break;}if(o[0]===6&&_.label<t[1]){_.label=t[1];t=o;break;}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(o);break;}if(t[2])_.ops.pop();_.trys.pop();continue;}o=d.call(b,_);}catch(e){o=[6,e];y=0;}finally{f=t=0;}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:true};}};sap.ui.define(["require","exports","../AbstractProvider","../../core/core","./conditionSerializer","./dataSourceSerializer","../../core/util","../../core/lang","../../core/ajax","./ajaxTemplates","./labelCalculation","./pivotTableParser","./suggestionParser","./suggestionTermSplitter","./UserEventLogger","./MetadataParser","./ItemParser","./FacetParser","../../sina/AttributeType","../../core/errors"],function(r,e,A,b,d,f,u,l,g,k,m,p,s,n,U,M,I,F,o,q){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.Provider=void 0;var P=(function(_){a(P,_);function P(){var i=_!==null&&_.apply(this,arguments)||this;i.id="inav2";return i;}P.prototype._initAsync=function(i){var j;this.urlPrefix="/sap/es/ina";this.getServerInfoUrl=this.urlPrefix+"/GetServerInfo";this.getResponseUrl=this.urlPrefix+"/GetResponse";this.sina=i.sina;this.ajaxClient=(j=i.ajaxClient)!==null&&j!==void 0?j:new g.Client({csrf:true,csrfByPassCache:true,});this.metadataLoadPromises={};this.internalMetadata={};this.labelCalculator=m.createLabelCalculator();this.userEventLogger=new U.UserEventLogger(this);this.metadataParser=new M.MetadataParser(this);this.itemParser=new I.ItemParser(this);this.facetParser=new F.FacetParser(this);this.executeSearchQuery=this.addMetadataLoadDecorator(this.executeSearchQuery);this.executeChartQuery=this.addMetadataLoadDecorator(this.executeChartQuery);this.executeSuggestionQuery=this.addMetadataLoadDecorator(this.executeSuggestionQuery);this.sessionId=b.generateGuid();return this.loadServerInfo().then(function(t){this.serverInfo=t;this.userEventLogger.delayedInit();if(!this.supports("Search")){return Promise.reject(new q.ESHNotActiveError("Enterprise Search is not active"));}return this.loadBusinessObjectDataSources();}.bind(this)).then(function(){return{capabilities:this.sina._createCapabilities({fuzzy:this.supports("Search","OptionFuzzy"),}),};}.bind(this));};P.prototype.addMetadataLoadDecorator=function(i){return function(){var j=[];for(var t=0;t<arguments.length;t++){j[t]=arguments[t];}var v=j[0];var w=v.filter.dataSource;return Promise.resolve().then(function(){return this.loadMetadata(w);}.bind(this)).then(function(){return i.apply(this,j);}.bind(this));}.bind(this);};P.prototype.loadMetadata=function(i){if(i.type===this.sina.DataSourceType.Category){return Promise.resolve();}var j=this.metadataLoadPromises[i.id];if(j){return j;}k.loadDataSourceMetadataRequest.DataSource.ObjectName=i.id;this.addLanguagePreferences(k.loadDataSourceMetadataRequest);j=this.ajaxClient.postJson(this.getResponseUrl,k.loadDataSourceMetadataRequest).then(function(t){this.metadataParser.parseMetadataRequestMetadata(i,t.data);}.bind(this));this.metadataLoadPromises[i.id]=j;return j;};P.prototype.supports=function(t,v){for(var i=0;i<this.serverInfo.Services.length;++i){var w=this.serverInfo.Services[i];if(w.Service==t){if(!v){return true;}for(var j=0;j<w.Capabilities.length;++j){var x=w.Capabilities[j];if(x.Capability===v){return true;}}}}return false;};P.prototype.loadServerInfo=function(){return this.ajaxClient.getJson(this.getServerInfoUrl).then(function(i){return i.data;});};P.prototype.loadBusinessObjectDataSources=function(){var t=this;t.addLanguagePreferences(k.loadDataSourcesRequest);if(t.supports("Search","PluralDescriptionForDataSource")){k.loadDataSourcesRequest.Search.NamedValues.push({AttributeName:"DescriptionPlural",Name:"DescriptionPlural",});}return t.ajaxClient.postJson(t.getResponseUrl,k.loadDataSourcesRequest).then(function(i){t._processDataSourcesResponse(i,false);},function(){var i=t.serverInfo.ServerInfo.SystemId+t.serverInfo.ServerInfo.Client+"~ESH_CONNECTOR~";k.fallbackLoadDataSourcesRequest.DataSource.ObjectName=i;return t.ajaxClient.postJson(t.getResponseUrl,k.fallbackLoadDataSourcesRequest).then(function(j){t._processDataSourcesResponse(j,true);});});};P.prototype._processDataSourcesResponse=function(j,t){var v=p.parse(j.data);var w=v.axes[0];var x=function(i){var z=w[i];var B="";var C="";var D="";if(!t){if(b.isObject(z.Description)){B=z.Description.Value;}else{B=z.Description;}if(b.isObject(z.DescriptionPlural)){C=z.DescriptionPlural.Value;}else{C=z.DescriptionPlural;}if(b.isObject(z.ObjectName)){D=z.ObjectName.Value;}else{D=z.ObjectName;}}else{z.$$ResultItemAttributes$$.forEach(function(G){if(G.Name==="DESCRIPTION"){B=G.Value;}if(G.Name==="DESCRIPTION_PLURAL"){C=G.Value;}if(G.Name==="OBJECT_NAME"){D=G.Value;}});}if(!B){B=D;}if(!C){C=B;}var E=y.sina._createDataSource({id:D,label:B,labelPlural:C,type:y.sina.DataSourceType.BusinessObject,});y.labelCalculator.calculateLabel(E);};var y=this;for(var i=0;i<w.length;++i){x(i);}};P.prototype.getInternalMetadataAttributes=function(i){var j=[];var t=this.internalMetadata[i.id];if(!t){return j;}for(var v in t.data){j.push(t.data[v]);}return j;};P.prototype.getInternalMetadataAttribute=function(i,j){return this.internalMetadata[i.id].data[j];};P.prototype.getInternalMetadataLoadStatus=function(i){var j=this.internalMetadata[i.id];if(!j){return{};}return j.loadStatus;};P.prototype.fillInternalMetadata=function(j,t,v){var w=this.internalMetadata[j.id];if(!w){w={loadStatus:{},data:{},};this.internalMetadata[j.id]=w;}for(var i=0;i<v.length;++i){var x=v[i];var y=w.data[x.Name];if(!y){y={};w.data[x.Name]=y;}for(var z in x){y[z]=x[z];}}w.loadStatus[t]=true;};P.prototype.addTemplateConditions=function(i){i.addCondition({attribute:"$$RenderingTemplatePlatform$$",operator:this.sina.ComparisonOperator.Eq,value:"html",});i.addCondition({attribute:"$$RenderingTemplateTechnology$$",operator:this.sina.ComparisonOperator.Eq,value:"Tempo",});i.addCondition({attribute:"$$RenderingTemplateType$$",operator:this.sina.ComparisonOperator.Eq,value:"ResultItem",});i.addCondition({attribute:"$$RenderingTemplateType$$",operator:this.sina.ComparisonOperator.Eq,value:"ItemDetails",});};P.prototype.assembleOrderBy=function(j){var t=[];for(var i=0;i<j.sortOrder.length;++i){var v=j.sortOrder[i];var w=v.order===this.sina.SortOrder.Descending?"DESC":"ASC";t.push({AttributeName:v.id,SortOrder:w,});}return t;};P.prototype.executeSearchQuery=function(i){var j,t;var v=i.filter.rootCondition.clone();this.addTemplateConditions(v);k.searchRequest.Search.Filter=d.serialize(i.filter.dataSource,v);k.searchRequest.DataSource=f.serialize(i.filter.dataSource);k.searchRequest.Search.SearchTerms=i.filter.searchTerm;k.searchRequest.Search.Top=i.top;k.searchRequest.Search.Skip=i.skip;k.searchRequest.Options=this.assembleRequestOptions(i);k.searchRequest.Search.OrderBy=this.assembleOrderBy(i);k.searchRequest.Search.Expand=["Grid","Items","TotalCount"];this.addLanguagePreferences(k.searchRequest);this.addSessionId(k.searchRequest);if(i.calculateFacets){k.searchRequest.Search.Expand.push("ResultsetFacets");}return this.ajaxClient.postJson(this.getResponseUrl,k.searchRequest).then(function(w){t=w;return this.itemParser.parse(i,t.data);}.bind(this)).then(function(w){j=w;return this.facetParser.parse(i,t.data);}.bind(this)).then(function(w){return this.sina._createSearchResultSet({id:t.data.ExecutionID,title:"Search Result List",query:i,items:j.items,totalCount:j.totalCount,facets:w,});}.bind(this));};P.prototype.executeChartQuery=function(i){var j=i.filter.rootCondition.clone();this.addTemplateConditions(j);k.chartRequest.Search.Filter=d.serialize(i.filter.dataSource,j);k.chartRequest.DataSource=f.serialize(i.filter.dataSource);k.chartRequest.Search.SearchTerms=i.filter.searchTerm;k.chartRequest.Search.Top=1;k.chartRequest.Search.Skip=0;k.chartRequest.Facets.Attributes=[i.dimension];k.chartRequest.Facets.MaxNumberOfReturnValues=i.top;k.chartRequest.Options=this.assembleRequestOptions(i);this.addLanguagePreferences(k.chartRequest);this.addSessionId(k.chartRequest);return this.ajaxClient.postJson(this.getResponseUrl,k.chartRequest).then(function(t){return this.facetParser.parse(i,t.data);}.bind(this)).then(function(t){if(t.length>0){return t[0];}return this.sina._createChartResultSet({title:i.filter.dataSource.getAttributeMetadata(i.dimension).label,items:[],query:i,});}.bind(this));};P.prototype.executeHierarchyQuery=function(i){throw new Error("Method not implmented.");};P.prototype.executeSuggestionQuery=function(i){return c(this,void 0,void 0,function(){var j,t,v;return h(this,function(w){j=i.filter.searchTerm;t=n.split(this,j);v=i.filter.rootCondition.clone();if(t.searchTerm){v.addCondition(i.sina.createSimpleCondition({attribute:o.AttributeType.INAV2_SearchTerms,value:t.searchTerm,}));}v.addCondition(i.sina.createSimpleCondition({attribute:o.AttributeType.INAV2_SuggestionTerms,value:t.suggestionTerm,}));k.suggestionRequest.Suggestions2.Filter=d.serialize(i.filter.dataSource,v);k.suggestionRequest.DataSource=f.serialize(i.filter.dataSource);k.suggestionRequest.Options=this.assembleSuggestionOptions(i);if(k.suggestionRequest.Options.length===0){return[2,this.sina._createSuggestionResultSet({title:"Suggestions",query:i,items:[],})];}k.suggestionRequest.Suggestions2.Top=i.top;k.suggestionRequest.Suggestions2.Skip=i.skip;this.addLanguagePreferences(k.suggestionRequest);this.addSessionId(k.suggestionRequest);return[2,this.ajaxClient.postJson(this.getResponseUrl,k.suggestionRequest).then(function(x){var y=s.parse(this,i,x.data);n.concatenate(this,t,y);return this.sina._createSuggestionResultSet({title:"Suggestions",query:i,items:y,});}.bind(this))];});});};P.prototype.addSessionId=function(i){if(!this.supports("Search","SessionHandling")){delete i.SessionID;delete i.SessionTimestamp;return;}i.SessionID=this.sessionId;i.SessionTimestamp=parseInt(u.generateTimestamp(),10);};P.prototype.addLanguagePreferences=function(i){if(!this.supports("Search","LanguagePreferences")){delete i.LanguagePreferences;return;}i.LanguagePreferences=l.getLanguagePreferences();};P.prototype.assembleSuggestionOptions=function(t){var v={SearchTerm:{Data:"SuggestObjectData",History:"SuggestSearchHistory",},Object:{},DataSource:{Data:"SuggestDataSources",},};if(!this.supports("Suggestions2","ScopeTypes")){delete v.SearchTerm.History;delete v.DataSource.Data;}var w=[];var x=t.types;var y=t.calculationModes;for(var i=0;i<x.length;i++){var z=x[i];for(var j=0;j<y.length;j++){var B=y[j];var C=v[z][B];if(!C){continue;}w.push(C);}}return w;};P.prototype.assembleRequestOptions=function(i){var O=["SynchronousRun"];if(this.decideValueHelp(i)){O.push("ValueHelpMode");}return O;};P.prototype.decideValueHelp=function(j){var t=j.filter.rootCondition.conditions;for(var i=0;i<t.length;i++){if(j.filter._getAttribute(t[i])===j.dimension){return true;}}return false;};P.prototype.getConfigurationAsync=function(){return c(this,void 0,void 0,function(){return h(this,function(i){if(!this.supports("PersonalizedSearch","SetUserStatus")){return[2,Promise.resolve(this.sina._createConfiguration({personalizedSearch:false,isPersonalizedSearchEditable:false,}))];}return[2,this.ajaxClient.postJson(this.getResponseUrl,k.getConfigurationRequest).then(function(j){var t={personalizedSearch:false,isPersonalizedSearchEditable:false,};t.personalizedSearch=j.data.Data.PersonalizedSearch.SessionUserActive;switch(j.data.Data.PersonalizedSearch.PersonalizationPolicy){case"Opt-In":t.isPersonalizedSearchEditable=true;break;case"Opt-Out":t.isPersonalizedSearchEditable=true;break;case"Enforced":t.isPersonalizedSearchEditable=false;break;case"Disabled":t.isPersonalizedSearchEditable=false;break;}return this.sina._createConfiguration(t);}.bind(this))];});});};P.prototype.saveConfigurationAsync=function(i){return c(this,void 0,void 0,function(){return h(this,function(j){if(!this.supports("PersonalizedSearch","SetUserStatus")){return[2,Promise.resolve()];}k.saveConfigurationRequest.SearchConfiguration.Data.PersonalizedSearch.SessionUserActive=i.personalizedSearch;return[2,this.ajaxClient.postJson(this.getResponseUrl,k.saveConfigurationRequest)];});});};P.prototype.resetPersonalizedSearchDataAsync=function(){if(!this.supports("PersonalizedSearch","ResetUserData")){return Promise.resolve();}return this.ajaxClient.postJson(this.getResponseUrl,k.resetPersonalizedSearchDataRequest);};P.prototype.logUserEvent=function(i){return this.userEventLogger.logUserEvent(i);};P.prototype.getDebugInfo=function(){return("Searchsystem: "+this.serverInfo.ServerInfo.SystemId+" Client: "+this.serverInfo.ServerInfo.Client+" ESH API Provider: "+this.id);};return P;}(A.AbstractProvider));e.Provider=P;});})();