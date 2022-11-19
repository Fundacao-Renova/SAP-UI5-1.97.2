/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
(function(){"use strict";sap.ui.define(["./i18n","sap/esh/search/ui/SearchModel","sap/m/MessageBox","sap/ui/core/TextDirection"],function(a,S,M,T){return S.extend("sap.esh.search.ui.SearchFacetDialogModel",{constructor:function(s){var t=this;S.prototype.constructor.apply(t,[{searchModel:s,configuration:s.config,},]);t.aFilters=[];},prepareFacetList:function(){var t=this;var m=t.getDataSource();t.setProperty("/facetDialog",t.oFacetFormatter.getDialogFacetsFromMetaData(m,t));},facetDialogSingleCall:function(p){var t=this;t.chartQuery.dimension=p.sAttribute;t.chartQuery.top=p.sAttributeLimit;return t.chartQuery.getResultSetAsync().then(function(r){var f=t.oFacetFormatter.getDialogFacetsFromChartQuery(r,t,p.bInitialFilters);var F=jQuery.extend(true,{},f);f.items4pie=F.items;var b=0,c=0,d=0,e=0;for(var i=0;i<f.items4pie.length;i++){if(i<9){f.items4pie[i].pieReady=true;if(f.items4pie[i].value>0){b+=f.items4pie[i].value;}}else{f.items4pie[i].pieReady=false;if(f.items4pie[i].value>0){c+=f.items4pie[i].value;}}}d=(c*100)/(b+c);d=Math.ceil(d);e=b/9;e=Math.floor(e);if(d>0){var n=f.items4pie[0].clone([true,true]);n.value=e;n.label=a.getText("facetPieChartOverflowText2",[d.toString(),"9",]);n.pieReady=true;n.valueLabel=""+e;n.isPieChartDummy=true;f.items4pie.push(n);}for(var j=0;j<f.items4pie.length;j++){f.items4pie[j].percentageMissingInBigPie=d;}t.setProperty(p.sBindingPath+"/items4pie",f.items4pie);t.setProperty(p.sBindingPath+"/items",f.items);},function(e){var b=a.getText("searchError");var c=e.message;M.error(c,{icon:M.Icon.NONE,title:b,actions:M.Action.OK,onClose:null,styleClass:"",initialFocus:null,textDirection:T.Inherit,});});},resetChartQueryFilterConditions:function(){var t=this;if(t.chartQuery){t.chartQuery.resetConditions();}},hasFilterCondition:function(f){var t=this;for(var i=0;i<t.aFilters.length;i++){if(t.aFilters[i].filterCondition.equals&&t.aFilters[i].filterCondition.equals(f)){return true;}}return false;},hasFilter:function(i){var t=this;var f=i.filterCondition;return t.hasFilterCondition(f);},addFilter:function(i){var t=this;if(!t.hasFilter(i)){t.aFilters.push(i);}},removeFilter:function(b){var t=this;var f=b.filterCondition;for(var i=0;i<t.aFilters.length;i++){if(t.aFilters[i].filterCondition.equals&&t.aFilters[i].filterCondition.equals(f)){t.aFilters.splice(i,1);return;}}},changeFilterAdvaced:function(b,A){var t=this;var f=b.filterCondition;for(var i=0;i<t.aFilters.length;i++){if(t.aFilters[i].filterCondition.equals&&t.aFilters[i].filterCondition.equals(f)){t.aFilters[i].advanced=A;return;}}},addFilterCondition:function(f){this.chartQuery.filter.autoInsertCondition(f);},getAttributeDataType:function(f){switch(f.dataType){case"Integer":return"integer";case"Double":return"number";case"Timestamp":return"timestamp";case"Date":return"date";case"String":if(f.matchingStrategy===this.sinaNext.MatchingStrategy.Text){return"text";}return"string";default:return"string";}},});});})(window);