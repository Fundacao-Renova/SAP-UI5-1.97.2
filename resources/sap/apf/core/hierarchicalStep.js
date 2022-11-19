/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
sap.ui.define(["sap/apf/core/step","sap/apf/core/utils/uriGenerator","sap/ui/model/odata/v2/ODataModel","sap/ui/model/Sorter","sap/ui/thirdparty/jquery"],function(s,u,O,S,q){"use strict";sap.apf.core.HierarchicalStep=function(m,a,f,r,c){sap.apf.core.Step.call(this,m,a,f,r,c);var b;var d;var e;this.type="hierarchicalStep";var g=f.getConfigurationById(a.request).service;var h=f.getConfigurationById(a.request).entityType;var i=c.getAnnotationsForService(g);var j=a.hierarchyProperty;var k=q.Deferred();var l=f.getConfigurationById(a.binding).requiredFilters;var n=c.getStartParameterFacade().getSapSystem();if(n){g=sap.ui.model.odata.ODataUtils.setOrigin(g,{force:true,alias:n});}q.when(c.getMetadata(g),c.getEntityTypeMetadata(g,h)).then(function(t,v){var w=t.getHierarchyAnnotationsForProperty(h,j);if(w.type==="messageObject"){m.putMessage(w);}else{d=p(j,w);}b=f.createRequest({service:g,entityType:h,selectProperties:o(l[0],t,w),type:"request",id:"SelectionValidationRequest"});k.resolve(t,w,v);});var M=new O(g,{annotationURI:i});function o(t,v,w){var x=[t];var y=v.getPropertyMetadata(h,t)["sap:text"];if(y){x.push(y);}if(w.hierarchyNodeExternalKeyFor){x.push(w.hierarchyNodeExternalKeyFor);}return x;}function p(j,t){var v=[j];for(var w in t){v.push(t[w]);}v=v.concat(f.getConfigurationById(a.request).selectProperties);return sap.apf.core.utils.uriGenerator.getSelectString(v);}this.update=function(t,v){k.done(function(w,x,y){var z=t.restrictToProperties(w.getFilterablePropertiesAndParameters(h));var F=!z.isEqual(e);e=z.copy();var A="/"+sap.apf.core.utils.uriGenerator.generateOdataPath(m,w,h,t,w.getUriComponents(h).navigationProperty);var B={};B.path=A;var C=t.restrictToProperties(w.getFilterableProperties(h));if(!C.isEmpty()){B.filters=[C.mapToSapUI5FilterExpression()];}B.parameters={select:d,operationMode:sap.ui.model.odata.OperationMode.Server,useServerSideApplicationFilters:true,treeAnnotationProperties:x};B.sorter=this.getSorter();this.getBinding().updateTreetable(B,M,y,F);if(!this.getFilter().isEmpty()&&F){var D=C.removeTermsByProperty(l[0]);b.sendGetInBatch(D.addAnd(this.getFilter()),function(E){var G=E.data;var H=this.getFilter().getFilterTerms();var I=[];H.forEach(function(J){G.forEach(function(K){if(K[l[0]]===J.getValue()){I.push(K);}});});this.getBinding().setFilterValues(I);v({},true);}.bind(this));}else{v({},F);}}.bind(this));};this.getSorter=function(){var t=[];var v=this.getBinding().getRequestOptions();if(v&&v.orderby&&v.orderby.length>0){v.orderby.forEach(function(w){t.push(new sap.ui.model.Sorter(w.property,!w.ascending));});}if(t.length===0){return;}return t;};this.setData=function(){};this.adjustCumulativeFilter=function(t){if(l[0]&&!this.getFilter().isEmpty()){return t.removeTermsByProperty(l[0]);}return t;};};});