/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){var a=(this&&this.__extends)||(function(){var e=function(d,b){e=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(Object.prototype.hasOwnProperty.call(b,p))d[p]=b[p];};return e(d,b);};return function(d,b){if(typeof b!=="function"&&b!==null)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");e(d,b);function _(){this.constructor=d;}d.prototype=b===null?Object.create(b):(_.prototype=b.prototype,new _());};})();var c=(this&&this.__awaiter)||function(t,_,P,g){function b(v){return v instanceof P?v:new P(function(r){r(v);});}return new(P||(P=Promise))(function(r,d){function f(v){try{s(g.next(v));}catch(e){d(e);}}function i(v){try{s(g["throw"](v));}catch(e){d(e);}}function s(e){e.done?r(e.value):b(e.value).then(f,i);}s((g=g.apply(t,_||[])).next());});};var h=(this&&this.__generator)||function(b,d){var _={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g;return g={next:i(0),"throw":i(1),"return":i(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function i(n){return function(v){return s([n,v]);};}function s(o){if(f)throw new TypeError("Generator is already executing.");while(_)try{if(f=1,y&&(t=o[0]&2?y["return"]:o[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,o[1])).done)return t;if(y=0,t)o=[o[0]&2,t.value];switch(o[0]){case 0:case 1:t=o;break;case 4:_.label++;return{value:o[1],done:false};case 5:_.label++;y=o[1];o=[0];continue;case 7:o=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(o[0]===6||o[0]===2)){_=0;continue;}if(o[0]===3&&(!t||(o[1]>t[0]&&o[1]<t[3]))){_.label=o[1];break;}if(o[0]===6&&_.label<t[1]){_.label=t[1];t=o;break;}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(o);break;}if(t[2])_.ops.pop();_.trys.pop();continue;}o=d.call(b,_);}catch(e){o=[6,e];y=0;}finally{f=t=0;}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:true};}};sap.ui.define(["require","exports","./ajax","./ajaxTemplates","./conditionSerializer","../../core/core","./dataSourceSerializer","./labelCalculation","./suggestionTermSplitter","../AbstractProvider","./FacetParser","./ItemParser","./NlqParser","./suggestionParser","./UserEventLogger","./MetadataParser","../../core/errors"],function(r,e,b,d,f,g,k,l,s,A,F,I,N,m,U,M,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.Provider=void 0;var P=(function(_){a(P,_);function P(){var i=_!==null&&_.apply(this,arguments)||this;i.id="abap_odata";return i;}P.prototype._initAsync=function(i){var j;this.contentProviderId=i.contentProviderId;this.requestPrefix=i.url||"/sap/opu/odata/sap/ESH_SEARCH_SRV";this.sina=i.sina;this.ajaxClient=(j=i.ajaxClient)!==null&&j!==void 0?j:b.createAjaxClient();this.metadataLoadPromises={};this.internalMetadata={};this.labelCalculator=l.createLabelCalculator();this.userEventLogger=new U.UserEventLogger(this);this.metadataParser=new M.MetadataParser(this);this.itemParser=new I.ItemParser(this);this.nlqParser=new N.NlqParser(this);this.facetParser=new F.FacetParser(this);this.suggestionParser=new m.SuggestionParser(this,this.itemParser);this.sessionId=g.generateGuid();this.sorsNavigationTargetGenerator=this.sina._createSorsNavigationTargetGenerator({urlPrefix:"#Action-search&/top=10&filter=",getPropertyMetadata:function(o){return{name:o.id,label:o.label,semanticObjectType:o._private.semanticObjectType,response:!!(o.usage&&(o.usage.Detail||o.usage.Title)),request:true,};},});return this.loadServerInfo().then(function(o){this.serverInfo=o.d.results[0];if(!this.supports("Search")){return Promise.reject(new n.ESHNotActiveError("Enterprise Search is not active"));}return this.loadBusinessObjectDataSources();}.bind(this)).then(function(){return{capabilities:this.sina._createCapabilities({fuzzy:false,}),};}.bind(this));};P.prototype.supports=function(o,p){for(var i=0;i<this.serverInfo.Services.results.length;++i){var q=this.serverInfo.Services.results[i];if(q.Id==o){if(!p){return true;}for(var j=0;j<q.Capabilities.results.length;++j){var t=q.Capabilities[j];if(t.Capability===p){return true;}}}}return false;};P.prototype.loadServerInfo=function(){var i=this.buildQueryUrl(this.requestPrefix,"/ServerInfos?$expand=Services/Capabilities");var j=this.buildQueryUrl(this.requestPrefix,"/$metadata");var o=this.ajaxClient.getJson(i);var p=this.ajaxClient.getXML(j);return Promise.all([o,p]).then(function(v){var q=v[0];var t=v[1];if(typeof window!=="undefined"){var u=new DOMParser();var D=u.parseFromString(t,"text/xml");if(D.documentElement.nodeName!="parsererror"){this.serviceXML=D;}}else{var w=r("jsdom");var x=new w.JSDOM(t);this.serviceXML=x.window.document;}return q.data;}.bind(this));};P.prototype.loadBusinessObjectDataSources=function(){var i="/DataSources?$expand=Annotations,Attributes/UIAreas,Attributes/Annotations&$filter=Type eq 'View'";if(this.serviceXML){var j="Schema[Namespace=ESH_SEARCH_SRV]>EntityType[Name=DataSource]>NavigationProperty[Name=Annotations],"+"Schema[Namespace=ESH_SEARCH_SRV]>EntityType[Name=DataSourceAttribute]>NavigationProperty[Name=Annotations]";var o=this.serviceXML.querySelectorAll(j);if(o.length!=2){i="/DataSources?$expand=Attributes/UIAreas&$filter=Type eq 'View'";}var p="Schema[Namespace=ESH_SEARCH_SRV]>EntityType[Name=DataSource]>Property[Name=IsInternal]";if(this.isQueryPropertySupported(p)){i=i+" and IsInternal eq false";}}var q=this.buildQueryUrl(this.requestPrefix,i);return this.ajaxClient.getJson(q).then(function(t){var u=t.data.d.results;this.metadataParser.parseDataSourceData(u,this.sorsNavigationTargetGenerator);this.sorsNavigationTargetGenerator.finishRegistration();}.bind(this));};P.prototype.assembleOrderBy=function(q){var j=[];for(var i=0;i<q.sortOrder.length;++i){var o=q.sortOrder[i];var p=o.order===this.sina.SortOrder.Descending?"desc":"asc";j.push({AttributeId:o.id,SortOrder:p,});}return j;};P.prototype.executeSearchQuery=function(q){var i,j;var o=d.searchRequest;if(q.nlq){o=d.nlqSearchRequest;}var p="Schema[Namespace=ESH_SEARCH_SRV]>EntityType[Name=SearchOptions]>Property[Name=ClientServiceName]";if(!this.isQueryPropertySupported(p)){delete o.d.QueryOptions.ClientServiceName;}o=JSON.parse(JSON.stringify(o));var t=q.filter.rootCondition.clone();var u=f.serialize(q.filter.dataSource,t);if(u.SubFilters.length!==0){o.d.Filter=u;}else{delete o.d.Filter;}o.d.DataSources=k.serialize(q.filter.dataSource);o.d.QueryOptions.SearchTerms=q.filter.searchTerm;o.d.QueryOptions.Top=q.top;o.d.QueryOptions.Skip=q.skip;o.d.OrderBy=this.assembleOrderBy(q);this.addSessionId(o);if(!q.calculateFacets){delete o.d.MaxFacetValues;delete o.d.Facets;}else{o.d.MaxFacetValues=5;o.d.Facets=[{Values:[],},];}var v=this.buildQueryUrl(this.requestPrefix,"/SearchQueries");return this.ajaxClient.postJson(v,o).then(function(w){j=w;return this.metadataParser.parseDynamicMetadata(j.data.d);}.bind(this)).then(function(){return this.itemParser.parse(q,j.data.d);}.bind(this)).then(function(w){i=w;return this.facetParser.parse(q,j.data.d);}.bind(this)).then(function(w){var x=this.nlqParser.parse(j.data.d);var y=x.success?x.description:"Search Result List";return this.sina._createSearchResultSet({id:j.data.d.ResultList.ExecutionID,title:y,query:q,items:i,nlqSuccess:x.success,totalCount:j.data.d.ResultList.TotalHits,facets:w,});}.bind(this)).then(function(w){this.sorsNavigationTargetGenerator.generateNavigationTargets(w);return w;}.bind(this));};P.prototype.executeChartQuery=function(q){var i="";var j;var o=q.filter.rootCondition.clone();var p;if(this.decideValueHelp(q)){j=JSON.parse(JSON.stringify(d.valueHelperRequest));this.removeClientOptions(j);j.d.ValueHelpAttribute=q.dimension;p=f.serialize(q.filter.dataSource,o);if(p.SubFilters.length!==0){j.d.Filter=p;}else{delete j.d.Filter;}j.d.ValueFilter=this.getFilterValueFromConditionTree(q.dimension,p);j.d.QueryOptions.SearchTerms=q.filter.searchTerm;j.d.DataSources=k.serialize(q.filter.dataSource);i=this.buildQueryUrl(this.requestPrefix,"/ValueHelpQueries");}else{j=JSON.parse(JSON.stringify(d.chartRequest));p=f.serialize(q.filter.dataSource,o);if(p.SubFilters.length!==0){j.d.Filter=p;}else{delete j.d.Filter;}j.d.DataSources=k.serialize(q.filter.dataSource);j.d.QueryOptions.SearchTerms=q.filter.searchTerm;j.d.QueryOptions.Skip=0;this.addSessionId(j);j.d.FacetRequests=[{DataSourceAttribute:q.dimension,},];j.d.MaxFacetValues=q.top;i=this.buildQueryUrl(this.requestPrefix,"/SearchQueries");}return this.ajaxClient.postJson(i,j).then(function(t){return this.facetParser.parse(q,t.data.d);}.bind(this)).then(function(t){if(t.length>0){return t[0];}return this.sina._createChartResultSet({title:q.filter.dataSource.getAttributeMetadata(q.dimension).label,items:[],query:q,});}.bind(this));};P.prototype.executeHierarchyQuery=function(q){throw new Error("Method not implemented.");};P.prototype.decideValueHelp=function(q){var j=q.filter.rootCondition.conditions;for(var i=0;i<j.length;i++){if(q.filter._getAttribute(j[i])===q.dimension){return true;}}return false;};P.prototype.executeSuggestionQuery=function(q){return c(this,void 0,void 0,function(){return h(this,function(i){return[2,Promise.all([this.executeRegularSuggestionQuery(q),this.executeObjectSuggestionQuery(q),]).then(function(j){var o=[];o.push.apply(o,j[1]);o.push.apply(o,j[0]);return this.sina._createSuggestionResultSet({title:"Suggestions",query:q,items:o,});}.bind(this))];});});};P.prototype.isObjectSuggestionQuery=function(q){return(q.types.indexOf("Object")>=0&&q.filter.dataSource.type===q.sina.DataSourceType.BusinessObject);};P.prototype.executeObjectSuggestionQuery=function(q){if(!this.supports("ObjectSuggestions")||!this.isObjectSuggestionQuery(q)){return Promise.resolve([]);}var i=JSON.parse(JSON.stringify(d.objectSuggestionRequest));var j=q.filter.rootCondition.clone();var o=f.serialize(q.filter.dataSource,j);if(o.SubFilters.length!==0){i.d.Filter=o;}else{delete i.d.Filter;}i.d.DataSources=k.serialize(q.filter.dataSource);i.d.QueryOptions.Top=q.top;i.d.QueryOptions.Skip=q.skip;i.d.QueryOptions.SearchTerms=q.filter.searchTerm;this.addSessionId(i);var p=this.buildQueryUrl(this.requestPrefix,"/SuggestionsQueries");return this.ajaxClient.postJson(p,i).then(function(t){return this.suggestionParser.parseObjectSuggestions(q,t.data);}.bind(this));};P.prototype.executeRegularSuggestionQuery=function(q){var i=JSON.parse(JSON.stringify(d.suggestionRequest));var j=q.filter.searchTerm;var o=s.split(this,j);var p=q.filter.rootCondition.clone();var t=f.serialize(q.filter.dataSource,p);if(t.SubFilters.length!==0){i.d.Filter=t;}else{delete i.d.Filter;}i.d.DataSources=k.serialize(q.filter.dataSource);i.d.QueryOptions.Top=q.top;i.d.QueryOptions.Skip=q.skip;i.d.SuggestionInput=o.suggestionTerm;i.d.QueryOptions.SearchTerms=o.searchTerm===null?"":o.searchTerm;if(!this.includeSuggestionTypes(q,i)){return[];}this.addSessionId(i);var u=this.buildQueryUrl(this.requestPrefix,"/SuggestionsQueries");return this.ajaxClient.postJson(u,i).then(function(v){return this.suggestionParser.parseRegularSuggestions(q,v.data);}.bind(this)).then(function(v){s.concatenate(this,o,v);return v;}.bind(this));};P.prototype.includeSuggestionTypes=function(q,o){var p={SearchTerm:{Data:"IncludeAttributeSuggestions",History:"IncludeHistorySuggestions",},Object:{},DataSource:{Data:"IncludeDataSourceSuggestions",},};var t=q.types;var u=q.calculationModes;var v=false;for(var i=0;i<t.length;i++){var w=t[i];for(var j=0;j<u.length;j++){var x=u[j];var y=p[w][x];if(typeof y==="undefined"){continue;}o.d[y]=true;v=true;}}return v;};P.prototype.addSessionId=function(i){i.d.QueryOptions.ClientSessionID=this.sessionId;var t=new Date().getTime();i.d.QueryOptions.ClientCallTimestamp="\\/Date("+t+")\\/";};P.prototype.removeClientOptions=function(i){delete i.d.QueryOptions.ClientSessionID;delete i.d.QueryOptions.ClientCallTimestamp;delete i.d.QueryOptions.ClientServiceName;delete i.d.QueryOptions.ClientLastExecutionID;};P.prototype.getFilterValueFromConditionTree=function(j,o){if(o.ConditionAttribute&&o.ConditionAttribute===j){return o.ConditionValue;}else if(o.SubFilters){var i=void 0;var p=null;for(i=0;p===null&&i<o.SubFilters.length;i++){p=this.getFilterValueFromConditionTree(j,o.SubFilters[i]);}return p;}return null;};P.prototype.getConfigurationAsync=function(){var i=this.buildQueryUrl(this.requestPrefix,"/PersonalizedSearchMainSwitches?$filter=Selected eq true");return this.ajaxClient.getJson(i).then(function(j){var o={personalizedSearch:false,isPersonalizedSearchEditable:false,};switch(j.data.d.results[0].MainSwitch){case 3:o.isPersonalizedSearchEditable=true;break;case 4:o.isPersonalizedSearchEditable=true;break;case 2:o.isPersonalizedSearchEditable=false;break;case 1:o.isPersonalizedSearchEditable=false;break;}i=this.buildQueryUrl(this.requestPrefix,"/Users('<current>')");return this.ajaxClient.getJson(i).then(function(j){if(j.data.d.IsEnabledForPersonalizedSearch){o.personalizedSearch=true;}return this.sina._createConfiguration(o);}.bind(this));}.bind(this));};P.prototype.saveConfigurationAsync=function(i){var j={IsEnabledForPersonalizedSearch:i.personalizedSearch,};var o=this.buildQueryUrl(this.requestPrefix,"/Users('<current>')");return this.ajaxClient.mergeJson(o,j);};P.prototype.resetPersonalizedSearchDataAsync=function(){var i={ClearPersonalizedSearchHistory:true,};var j=this.buildQueryUrl(this.requestPrefix,"/Users('<current>')");return this.ajaxClient.mergeJson(j,i);};P.prototype.logUserEvent=function(i){return this.userEventLogger.logUserEvent(i);};P.prototype.buildQueryUrl=function(q,i){if(typeof window==="undefined"){return q+i;}var w=window.location.href;var j="";var o;var p="";var t="";o=w.indexOf("esh-system=sid(");if(o!==-1){var u=w.substring(o).indexOf(")");if(u!==-1){p=w.substring(o+15,o+u);if(p.length!==0){t=";o=sid("+p+")";}}}if(p.length===0){o=w.indexOf("esh-system=");if(o!==-1){var v=w.substring(o).indexOf("&");var x=w.substring(o).indexOf("#");if(v!==-1&&x!==-1){if(v<x){p=w.substring(o+11,o+v);}else{p=w.substring(o+11,o+x);}}if(v!==-1&&x===-1){p=w.substring(o+11,o+v);}if(v===-1&&x!==-1){p=w.substring(o+11,o+x);}if(v===-1&&x===-1){p=w.substring(o+11);}}if(p.length!==0){t=";o="+p;}}j=q+t+i;return j;};P.prototype.getDebugInfo=function(){return("Searchsystem: "+this.serverInfo.SystemId+" Client: "+this.serverInfo.Client+" ESH Search API Provider: "+this.id);};P.prototype.isQueryPropertySupported=function(p){if(this.serviceXML===undefined){return false;}var i=this.serviceXML.querySelectorAll(p);if(i.length>0){return true;}return false;};return P;}(A.AbstractProvider));e.Provider=P;});})();