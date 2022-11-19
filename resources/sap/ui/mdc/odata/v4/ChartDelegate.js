/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/library","sap/ui/mdc/ChartDelegate","sap/ui/base/SyncPromise","./ODataMetaModelUtil","sap/base/util/merge",'sap/ui/core/Core','sap/ui/mdc/util/FilterUtil','sap/ui/mdc/odata/v4/util/DelegateUtil','sap/ui/mdc/odata/v4/TypeUtil'],function(M,B,S,a,m,C,F,D,T){"use strict";var A="@Org.OData.Aggregation.V1";function f(H){this.name=H[0];this.label=H[1]instanceof Object?H[1]["$Path"]:H[1]||this.name;this.textProperty=H[2];this.type=T.getPrimitiveType(H[3]);if(H[4]||H[5]){var c=H[4],s=H[5];if(s){switch(s){case"year":this.timeUnit="fiscalyear";break;case"yearPeriod":this.timeUnit="fiscalyearperiod";break;default:this.timeUnit=undefined;break;}}if(c&&!this.timeUnit){switch(c){case"yearMonth":this.timeUnit="yearmonth";break;case"date":this.timeUnit="yearmonthday";break;case"yearQuarter":this.timeUnit="yearquarter";break;case"yearWeek":this.timeUnit="yearweek";break;default:this.timeUnit=undefined;break;}}}this.criticality=H[6];return this;}function h(R){var g=R[0],c=R[1];var H={},p={},I;p.inChart=g||c||false;if(p.inChart){p.chartItems=[];if(g){H.kind=M.ChartItemType.Dimension;H.role=M.ChartItemRoleType.category;I=m({},H);p.chartItems.push(I);}if(c){H.kind=M.ChartItemType.Measure;H.role=M.ChartItemRoleType.axis1;H.contextDefiningProperties=R[4]||[];var s=R[2]||[],d=R[3];for(var i=0;i<s.length;i++){I=m({},H);I.aggregationMethod=s[i]instanceof Object?s[i]["$Path"]:s[i];I.default=I.aggregationMethod==d instanceof Object?d[i]["$Path"]:d[i];p.chartItems.push(I);}}}var o=this.getModel();return Promise.all([o.requestObject("@sapui.name",this),o.requestObject("@com.sap.vocabularies.Common.v1.Label",this),o.requestObject("@com.sap.vocabularies.Common.v1.Text/$Path",this),o.requestObject("$Type",this),a.fetchCalendarTag(o,this),a.fetchFiscalTag(o,this),a.fetchCriticality(o,this)]).then(f.bind(p));}function r(e,p,o,c){var k,P,d=[],I=[],s,g=[],j,l,K={};var n=a.getAllCustomAggregates(c);for(var q in n){I.push(m({},n[q],{propertyPath:q,kind:M.ChartItemType.Measure,role:M.ChartItemRoleType.axis1,sortable:n[q].sortable,filterable:n[q].filterable}));}var t=a.getAllAggregatableProperties(c);for(var u in t){k=t[u].propertyPath;K[k]=K[k]||{};K[k][t[u].aggregationMethod]={name:t[u].name,label:t[u].label};}var v=a.getSortRestrictionsInfo(c["@Org.OData.Capabilities.V1.SortRestrictions"]),w=a.getFilterRestrictionsInfo(c["@Org.OData.Capabilities.V1.FilterRestrictions"]);function x(P){g.push(P);a.addSortInfoForProperty(P,v);a.addFilterInfoForProperty(P,w);if(P.inChart){for(var i=0;i<P.chartItems.length;i++){var y=P.chartItems[i];y.propertyPath=P.name;y.type=P.type;y.timeUnit=P.timeUnit;y.criticality=P.criticality;if(y.kind==M.ChartItemType.Measure){var z=y.aggregationMethod instanceof Object?y.aggregationMethod["$Path"]:y.aggregationMethod;if(K[y.propertyPath]&&K[y.propertyPath][z]){y.name=K[y.propertyPath][y.aggregationMethod].name;y.label=K[y.propertyPath][y.aggregationMethod].label;}else{y.name=z+y.propertyPath;y.label=P.label+" ("+z+")";}y.customAggregate=false;y.sortable=true;y.sortDirection="both";y.filterable=true;}else{y.name=P.name;y.textProperty=P.textProperty;y.label=P.label;y.sortable=P.sortable;y.sortDirection=P.sortDirection;y.filterable=P.filterable;y.allowedExpressions=P.allowedExpressions;}I.push(y);}}}for(k in e){if(k[0]!=="$"){P=e[k];if(P&&P.$kind&&(P.$kind=="Property")){s=p+k+A;d.push(Promise.all([o.requestObject(s+".Groupable"),o.requestObject(s+".Aggregatable"),o.requestObject(s+".SupportedAggregationMethods"),o.requestObject(s+".RecommendedAggregationMethod"),o.requestObject(s+".ContextDefiningProperties")]).then(h.bind(o.getMetaContext(p+k))).then(x));}}}return Promise.all(d).then(function(){return[l,j,g,I];});}var b=Object.assign({},B);b.MetadataProperty={kind:"Measure",role:"axis1",contextDefiningProperties:[],className:"sap.ui.mcd.chart.MeasureItem",aggregationMethod:"sum","default":true,custom:false,name:"sumSalesAmount",propertyPath:"SalesAmount",label:"Total Sales Amount",textProperty:"",sortable:true,sortDirection:"both",filterable:true,allowedExpressions:[]};b.fetchProperties=function(c){return this.retrieveAllMetadata(c).then(function(o){return o.properties;});};b.retrieveAggregationItem=function(s,o){var c;var d={className:"",settings:{key:o.name,label:o.label||o.name,type:o.type}};switch(o.kind){case M.ChartItemType.Dimension:d.className="sap.ui.mdc.chart.DimensionItem";c={textProperty:o.textProperty,timeUnit:o.timeUnit,displayText:true,criticality:o.criticality};break;case M.ChartItemType.Measure:d.className="sap.ui.mdc.chart.MeasureItem";c={propertyPath:o.propertyPath,aggregationMethod:o.aggregationMethod};break;}d.settings=Object.assign(d.settings,c);return d;};b.getModel=function(c){var v=c.getDelegate().model,o=c.getModel(v);if(o){return S.resolve(o);}return new S(function(d,e){function g(){var o=c.getModel(v);if(o){c.detachModelContextChange(g,c);return d(o);}}c.attachModelContextChange(g,c);});};b.retrieveAllMetadata=function(c){var o=this.getModel(c);function d(e){var g=c.getDelegate(),p="/"+g.payload.collectionName,i=e&&e.getMetaModel();if(p.endsWith("/")){throw new Error("The leading path for metadata calculation is the entity set not the path");}var s=p,t=p+"/";function j(R){var l={sortable:R[0],filterable:R[1],attributes:R[2],properties:R[3]};return l;}var k=[i.requestObject(t),i.requestObject(s)];return Promise.all(k).then(function(l){var E=l[0];var n=[a.fetchAllAnnotations(i,t),a.fetchAllAnnotations(i,s)];return Promise.all(n).then(function(q){var u=Object.assign(q[0],q[1]);return r(E,t,i,u);});}).then(j);}return o.then(d);};b.updateBindingInfo=function(o,c){var d=C.byId(o.getFilter());if(d){var e=d.getConditions();if(e){if(!c){c={};}var p=d.getPropertyInfoSet?d.getPropertyInfoSet():null;var P=D.getParameterNames(d);var g=F.getFilterInfo(b.getTypeUtil(),e,p,P);if(g){c.filters=g.filters;}var s=D.getParametersInfo(d);if(s){c.path=s;}}var i=d.getSearch instanceof Function?d.getSearch():"";if(i){if(!c){c={};}if(!c.parameters){c.parameters={};}c.parameters.$search=i;}}};b.rebindChart=function(o,c){B.rebindChart(o,c);};b.getTypeUtil=function(p){return T;};return b;});
