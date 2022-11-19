/*
 * ! SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/m/List","sap/m/ResponsivePopover","sap/m/CustomListItem","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/core/syncStyleClass","sap/base/util/merge"],function(L,R,C,F,a,s,m){"use strict";var M={isMultiUnit:function(u){return u==="*";},isNotMultiUnit:function(u){return u!=="*";},openMultiUnitPopover:function(e,A){var S=sap.ui.getCore().byId(A.smartTableId);var o=S.getTable();var b=o.getBinding("rows");var v=A.value;var u=A.unit;var U=A.template;var c,d;if(!b||!v||!u){return;}var l=e.getSource();var f=l.getParent();if(A.additionalParent){f=f.getParent();}var g=o.getAnalyticalInfoOfRow(f.getParent());if(!g){return;}var i,h=[],j=[v,u],t=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp").getText("SMARTTABLE_MULTI_TOTAL_TITLE")||"Total";if(b.aApplicationFilter){h=[].concat(b.aApplicationFilter);}var B=o.getBindingInfo("rows");var k=(B&&B.parameters&&B.parameters.custom)?m({},B.parameters.custom):undefined;if(g.groupTotal||g.group){var G=g.groupedColumns;for(i=0;i<G.length;i++){d=sap.ui.getCore().byId(G[i]).getLeadingProperty();if(!d){continue;}c=b.getAnalyticalInfoForColumn(d);if(c){d=c.dimensionPropertyName;}if(d){h.push(new F(d,a.EQ,g.context.getProperty(d)));}}t=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp").getText("SMARTTABLE_MULTI_GROUP_TITLE")||"Subtotal";}else if(!g.grandTotal){var p=Object.getOwnPropertyNames(b.getDimensionDetails());for(i=0;i<p.length;i++){h.push(new F(p[i],a.EQ,g.context.getProperty(p[i])));}t=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp").getText("SMARTTABLE_MULTI_GROUP_TITLE")||"Subtotal";}var D=U.clone();D.unbindProperty("visible");var P=A.smartTableId+"-multiUnitPopover",n,q;n=sap.ui.getCore().byId(P);if(!n){q=new L(P+"-detailsList",{showSeparators:"None",ariaLabelledBy:P+"-title"});q.addStyleClass("sapUiContentPadding sapUiCompMultiCurrency");n=new R(P,{content:q});s("sapUiSizeCompact",o,n);o.addDependent(n);}if(!q){q=sap.ui.getCore().byId(P+"-detailsList");}n.setTitle(t);n.setPlacement(g.grandTotal?"VerticalPreferredTop":"VerticalPreferredBottom");q.bindItems({path:b.getPath(),filters:h,parameters:{select:j.join(","),custom:k},templateShareable:false,template:new C({content:[D]})});n.openBy(l);}};return M;},true);
