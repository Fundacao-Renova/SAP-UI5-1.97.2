/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/esh/search/ui/i18n","sap/esh/search/ui/SearchHelper","sap/esh/search/ui/suggestions/SinaSuggestionProvider","sap/esh/search/ui/suggestions/AppSuggestionProvider","sap/esh/search/ui/suggestions/TimeMerger","sap/esh/search/ui/suggestions/SuggestionType",],function(a,S,b,A,T,c){"use strict";var s={};s.SuggestionHandler=function(){this.init.apply(this,arguments);};s.SuggestionHandler.prototype={init:function(p){var t=this;t.model=p.model;t.suggestionProviders=[];t.keyboardRelaxationTime=t.model.config.suggestionKeyboardRelaxationTime;t.uiUpdateInterval=500;t.uiClearOldSuggestionsTimeOut=1000;t.appSuggestionProvider=new A({model:t.model,suggestionHandler:this,});t.doSuggestionInternal=S.delayedExecution(t.doSuggestionInternal,t.keyboardRelaxationTime);t.timeMerger=new T();},abortSuggestions:function(d){if(d===undefined||d===true){this.model.setProperty("/suggestions",[]);}if(this.clearSuggestionTimer){clearTimeout(this.clearSuggestionTimer);this.clearSuggestionTimer=null;}this.doSuggestionInternal.abort();this.getSuggestionProviders().then(function(e){for(var i=0;i<e.length;++i){var f=e[i];f.abortSuggestions();}});this.timeMerger.abort();},getSuggestionProviders:function(){var t=this;if(t.suggestionProvidersPromise){return t.suggestionProvidersPromise;}t.suggestionProvidersPromise=t.model.initBusinessObjSearch().then(function(){t.sinaNext=t.model.sinaNext;var d;d=[];if(t.model.config.isUshell){d.push(t.appSuggestionProvider);}if(!t.model.config.searchBusinessObjects){return Promise.resolve(d);}d.push.apply(d,t.createSinaSuggestionProviders());return Promise.resolve(d);});return t.suggestionProvidersPromise;},createSinaSuggestionProviders:function(){var p=[{suggestionTypes:[c.SearchTermHistory],},{suggestionTypes:[c.SearchTermData],},{suggestionTypes:[c.DataSource],},];if(this.model.config.boSuggestions){p.push({suggestionTypes:[c.Object],});}var d=[];for(var k=0;k<p.length;++k){var e=p[k];d.push(new b({model:this.model,sinaNext:this.sinaNext,suggestionTypes:e.suggestionTypes,suggestionHandler:this,}));}return d;},isSuggestionPopupVisible:function(){return jQuery(".searchSuggestion").filter(":visible").length>0;},doSuggestion:function(f){this.abortSuggestions(false);this.doSuggestionInternal(f);},autoSelectAppSuggestion:function(f){return this.appSuggestionProvider.getSuggestions(f).then(function(s){return s[0];});},doSuggestionInternal:function(f){var t=this;t.firstInsertion=true;t.busyIndicator=false;var d=t.model.getProperty("/uiFilter/searchTerm");if(d.length===0){t.insertSuggestions([],0);return;}if(d.trim()===""||d.trim()==="*"){t.insertSuggestions([],0);return;}t.model.eventLogger.logEvent({type:t.model.eventLogger.SUGGESTION_REQUEST,suggestionTerm:t.model.getProperty("/uiFilter/searchTerm"),dataSourceKey:t.model.getProperty("/uiFilter/dataSource").id,});t.getSuggestionProviders().then(function(e){var p=[];var g=e.length;for(var i=0;i<e.length;++i){var h=e[i];p.push(h.getSuggestions(f));}if(t.isSuggestionPopupVisible()){if(t.clearSuggestionTimer){clearTimeout(t.clearSuggestionTimer);}t.clearSuggestionTimer=setTimeout(function(){t.clearSuggestionTimer=null;t.insertSuggestions([],g);},t.uiClearOldSuggestionsTimeOut);}else{t.insertSuggestions([],g);}t.timeMerger.abort();t.timeMerger=new T(p,t.uiUpdateInterval);t.timeMerger.process(function(r){g-=r.length;var s=[];for(var j=0;j<r.length;++j){var k=r[j];s.push.apply(s,k);}if(g>0&&s.length===0){return;}if(t.clearSuggestionTimer){clearTimeout(t.clearSuggestionTimer);t.clearSuggestionTimer=null;}t.insertSuggestions(s,g);});});},generateSuggestionHeader:function(i){var h={};switch(i.uiSuggestionType){case c.App:h.label=a.getText("label_apps");break;case c.DataSource:h.label=a.getText("searchIn");break;case c.SearchTermData:case c.SearchTermHistory:h.label=a.getText("searchFor");break;case c.Object:h.label=i.dataSource.labelPlural;if(this.model.config.FF_bOptimizedQuickSelectDataSourceLabels){if(this.model.getDataSource().subType===this.sinaNext.DataSourceSubType.Filtered){h.label=this.model.getDataSource().labelPlural;}else{if(typeof this.model.config.getFirstSpaceCondition==="function"){var f=this.model.config.getFirstSpaceCondition(this.model.getProperty("/uiFilter"));if(f&&f.attributeLabel){h.label=a.getText("suggestionFacetLabelWithValue",[f.attributeLabel,f.valueLabel||f.value,]);}}}}h.dataSource=i.dataSource;break;}h.position=c.properties[i.uiSuggestionType].position;h.suggestionResultSetCounter=this.suggestionResultSetCounter;h.uiSuggestionType=c.Header;return h;},enableBusyIndicator:function(s,e){if(e){s.push({position:c.properties[c.BusyIndicator].position,uiSuggestionType:c.BusyIndicator,});return;}for(var i=0;i<s.length;++i){var d=s[i];if(d.uiSuggestionType===c.BusyIndicator){s.splice(i,1);return;}}},checkDuplicate:function(s,d){var e=function(){return(d.uiSuggestionType===c.SearchTermHistory||(d.uiSuggestionType===c.SearchTermData&&!d.dataSource));};if(!e(d)){return{action:"append",};}for(var i=0;i<s.length;++i){var f=s[i];if(!e(f)){continue;}if(d.searchTerm===f.searchTerm){if(d.grouped&&d.uiSuggestionType===c.SearchTermData&&f.uiSuggestionType===c.SearchTermHistory){return{action:"replace",index:i,};}return{action:"skip",};}}return{action:"append",};},insertSuggestions:function(i,p){var s=this.model.getProperty("/suggestions").slice();s=this.insertIntoSuggestionList(i,s);if(!this.busyIndicator&&p>0){this.enableBusyIndicator(s,true);this.busyIndicator=true;}if(this.busyIndicator&&p===0){this.enableBusyIndicator(s,false);this.busyIndicator=false;}this.sortSuggestions(s);this.limitSuggestions(s);this.updateSuggestions(s);},insertIntoSuggestionList:function(d,s){var f=false;if(this.firstInsertion){this.firstInsertion=false;f=true;}if(f){s=[];this.suggestionHeaders={};this.suggestionResultSetCounter=0;this.generatedPositions={maxPosition:c.properties[c.Object].position,position:{},};}this.suggestionResultSetCounter+=1;for(var i=0;i<d.length;++i){var e=d[i];if(e.uiSuggestionType===c.Object){var p=this.generatedPositions.position[e.dataSource.id];if(!p){this.generatedPositions.maxPosition+=1;p=this.generatedPositions.maxPosition;this.generatedPositions.position[e.dataSource.id]=p;}e.position=p;}e.suggestionResultSetCounter=this.suggestionResultSetCounter;e.resultSetPosition=i;var g=this.checkDuplicate(s,e);switch(g.action){case"append":s.push(e);break;case"skip":continue;case"replace":s.splice(g.index,1,e);break;}if(this.isHeaderGenerationEnabled()&&!this.suggestionHeaders[e.position]){s.push(this.generateSuggestionHeader(e));this.suggestionHeaders[e.position]=true;}}return s;},isHeaderGenerationEnabled:function(){if(this.model.getDataSource()===this.model.appDataSource){return false;}if(!this.model.config.boSuggestions&&this.model.getDataSource().type===this.sinaNext.DataSourceType.BusinessObject){return false;}return true;},sortSuggestions:function(s){s.sort(function(d,e){var f=d.position-e.position;if(f!==0){return f;}if(d.uiSuggestionType===c.Header){return-1;}if(e.uiSuggestionType===c.Header){return 1;}if(d.grouped&&!e.grouped){return-1;}if(!d.grouped&&e.grouped){return 1;}f=d.suggestionResultSetCounter-e.suggestionResultSetCounter;if(f!==0){return f;}f=d.resultSetPosition-e.resultSetPosition;return f;});},getSuggestionLimit:function(u){var d=c.properties[u];if(typeof d==="undefined"){return Infinity;}var l;if(this.model.getDataSource()===this.model.sinaNext.allDataSource){l=d.limitDsAll;}else{l=d.limit;}return l;},limitSuggestions:function(s){var n={};for(var i=0;i<s.length;++i){var d=s[i];var e=d.uiSuggestionType;if(e===c.SearchTermHistory){e=c.SearchTermData;}var l=this.getSuggestionLimit(e);var f=n[e];if(typeof f==="undefined"){f=0;n[e]=f;}if(f>=l){s.splice(i,1);--i;continue;}n[e]=f+1;}},updateSuggestions:function(s){var d="searchFieldInShell-input";var e=sap.ui.getCore().byId(d);if(!e){e=this.model.getProperty("/inputHelp");}var f=e.getSuggestionRows();var g;for(var i=0;i<f.length;++i){var h=f[i];var k=h.getBindingContext().getObject();if(h.getSelected()){g=k.key;}}this.model.setProperty("/suggestions",s);if(!g){return;}window.setTimeout(function(){var f=e.getSuggestionRows();for(var j=0;j<f.length;++j){var h=f[j];var k=h.getBindingContext().getObject();if(k.key===g){e._oSuggPopover._iPopupListSelectedIndex=j;h.setSelected(true);h.rerender();}}},100);},};return s.SuggestionHandler;});