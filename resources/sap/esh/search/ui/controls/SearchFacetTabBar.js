/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["../i18n","sap/ui/core/Control","sap/m/Button","sap/m/ButtonRenderer","sap/m/SegmentedButtonItem","sap/base/Log","sap/esh/search/ui/SearchFacetDialogModel","sap/m/Title","sap/m/List","sap/m/CustomListItem","sap/m/Toolbar","sap/m/ToolbarSpacer","sap/m/GroupHeaderListItemRenderer","sap/m/GroupHeaderListItem","sap/m/ListSeparators","sap/m/ActionSheet","sap/m/PlacementType","sap/m/Link","sap/m/Label","sap/m/VBox","sap/esh/search/ui/controls/SearchFacetDialog",],function(a,C,B,b,S,L,c,T,d,e,f,g,G,h,l,A,P,m,n,V){"use strict";B.extend("sap.esh.search.ui.controls.SearchFacetDisplayModeDropDown",{renderer:"sap.esh.search.ui.controls.SearchFacetDisplayModeDropDownRenderer",});sap.esh.search.ui.controls.SearchFacetDisplayModeDropDownRenderer=jQuery.extend(true,{},b);G.extend("sap.esh.search.ui.controls.SearchGroupHeaderListItemRenderer");h.extend("sap.esh.search.ui.controls.SearchGroupHeaderListItem",{renderer:"sap.esh.search.ui.controls.SearchGroupHeaderListItemRenderer",metadata:{properties:{upperCase:{type:"boolean",group:"Appearance",defaultValue:false,},},aggregations:{button:{type:"sap.esh.search.ui.controls.SearchFacetDisplayModeDropDown",multiple:false,},},},});sap.esh.search.ui.controls.SearchGroupHeaderListItemRenderer.renderCounter=function(r,o){var i=o.getButton();if(typeof i==="object"){this.renderCounterContent(r,o,i);}};sap.esh.search.ui.controls.SearchGroupHeaderListItemRenderer.renderCounterContent=function(r,o,i){r.write("<div>");r.renderControl(i);r.write("</div>");};S.extend("my.SegmentedButtonItem",{aggregations:{content1:{type:"sap.ui.core.Control",multiple:false,},},});return C.extend("sap.esh.search.ui.controls.SearchFacetTabBar",{metadata:{properties:{eshRole:"string",headerText:"string",selectedButtonParameters:{type:"object",defaultValue:null,},},aggregations:{items:{type:"sap.m.IconTabFilter",multiple:true,},},},getSearchFacetTabBarAndDimensionById:function(j){var r={};r.index=0;var k=document.getElementById(j);var v=k.dataset.facetView;var o=k.dataset.facetViewIndex;var p=$("#"+j).parent()[0];var q=p.dataset.facetDimension;var s=$(".sapUshellSearchFacetTabBar");for(var i=0;i<s.length;i++){var t=$(".sapUshellSearchFacetTabBar .sapUshellSearchFacetTabBarHeader")[i];var u=t.dataset.facetDimension;if(u===q){r.index=i;r.control=sap.ui.getCore().byId(s[i].id);r.view=v;r.buttonIndex=o;r.dimension=q;break;}}return r;},storeClickedTabInformation:function(E){var s,j,k,o,p;var t=E.getSource().sId;var q=this.getSearchFacetTabBarAndDimensionById(t);var r=q.control.getModel().getPersonalizationStorageInstance().getItem("search-facet-panel-chart-state");s=q.dimension;j=q.control;k=q.view;p=q.buttonIndex;o=j.getBindingContext().getObject().dimension;var u=E.getParameters().id;var v=[];var w={};w.tabId=t;w.searchFacetTabBarIndex=q.searchFacetTabBarIndex;w.buttonId=u;w.buttonIndex=p;w.dimension=o;w.view=k;v.push(w);if(r&&Object.prototype.toString.call(r)==="[object Array]"){for(var i=0;i<r.length;i++){var x=r[i];if(x.dimension!==s){v.push(x);}}}q.control.getModel().getPersonalizationStorageInstance().setItem("search-facet-panel-chart-state",v);j.getBindingContext().getObject().chartIndex=p;},renderer:function(r,o){var p=function(j,f1){return function(){var q;var g1=$(this.getDomRef()).closest(".sapUshellSearchFacetTabBar")[0];var h1=sap.ui.getCore().byId($(g1).attr("id"));var i1=new c(o.getModel());i1.initBusinessObjSearch().then(function(){var j1=o.getModel();i1.setData(o.getModel().getData());i1.config=o.getModel().config;i1.sinaNext=o.getModel().sinaNext;if(h1&&h1.getBindingContext()&&h1.getBindingContext().getObject()&&h1.getBindingContext().getObject().dimension){q=h1.getBindingContext().getObject().dimension;}if(q==="space_description"&&j1.config.openSpaceShowMoreDialog){return j1.config.openSpaceShowMoreDialog(q,j1);}i1.prepareFacetList();var k1=new sap.esh.search.ui.controls.SearchFacetDialog({selectedAttribute:q,selectedTabBarIndex:j,tabBarItems:f1,});k1.setModel(i1);k1.setModel(o.getModel(),"searchModel");k1.open();var l1=o.getParent().getParent().getParent().getParent();l1.oFacetDialog=k1;o.getModel().eventLogger.logEvent({type:o.getModel().eventLogger.FACET_SHOW_MORE,referencedAttribute:q,});});};};r.write('<div tabindex="0"');r.writeControlData(o);r.addClass("sapUshellSearchFacetTabBar");r.writeClasses();r.write(">");var q=o.getBindingContext().getObject().dimension;var s=o.getBindingContext().getObject().dataType;var t=o.getBindingContext().getObject().title;var u;var v;u=o.getModel().getPersonalizationStorageInstance().getItem("search-facet-panel-chart-state");if(u&&Object.prototype.toString.call(u)==="[object Array]"){for(var k=0;k<u.length;k++){if(u[k].dimension===q){v=u[k];break;}}}var w=[];var x=[];var y=null;var z=null;var D=0;if(v&&v.buttonIndex){var E=v.buttonIndex;D=parseInt(E,10);}if(s!=o.getModel().sinaNext.AttributeType.String){D=0;}o.getBindingContext().getObject().chartIndex=D;var F=o.getItems();var H=new sap.esh.search.ui.controls.SearchFacetDisplayModeDropDown("",{icon:F[D].getIcon(),type:"Transparent",});for(var i=0;i<F.length;i++){y=F[i].getContent()[0];z=new B({text:F[i].getText(),icon:F[i].getIcon(),press:function(j){o.storeClickedTabInformation(j);o.setSelectedButtonParameters(j.getParameters());},});z.data("facet-view",F[i].getText(),true);z.data("facet-view-index",""+i,true);z.data("dimension",q,true);w.push(z);x.push(y);}var I=new A({showCancelButton:false,buttons:w,placement:P.Bottom,cancelButtonPress:function(){L.info("sap.m.ActionSheet: cancelButton is pressed");},afterClose:function(){var j=this;window.setTimeout(function(){var q=j.getFocusDomRef().getAttribute("data-facet-dimension");var f1=$(".sapUshellSearchFacetTabBarButton");for(var i=0;i<f1.length;i++){var g1=f1[i];var h1=g1.parentNode.parentNode.getAttribute("data-facet-dimension");if(h1===q){g1.focus();break;}}},100);L.info("=====================");L.info("sap.m.ActionSheet: closed");},});I.data("facet-dimension",q,true);H.addStyleClass("sapUshellSearchFacetTabBarButton");var J=F[D].getText();var K=a.getText("displayAs",[J]);H.setTooltip(K);H.attachPress(function(){I.openBy(this);});H.onAfterRendering=function(){$(this.getDomRef()).attr("aria-label",a.getText("dropDown"));};if(o.getHeaderText()){var M=new d({});M.setShowNoData(false);M.setShowSeparators(l.None);M.data("sap-ui-fastnavgroup","false",true);var N=false;var O=o.getModel();var Q=O.getProperty("/uiFilter/rootCondition");if(Q.hasFilters()){N=true;if(typeof O.config.hasSpaceFiltersOnly==="function"){if(O.config.hasSpaceFiltersOnly(Q)===true){N=false;}}}else{N=false;}var R=new B({icon:"sap-icon://clear-filter",tooltip:a.getText("resetFilterButton_tooltip"),type:"Transparent",enabled:N,press:function(){var f1=o.getModel();f1.eventLogger.logEvent({type:f1.eventLogger.CLEAR_ALL_FILTERS,});var g1=[];var h1;var i1=f1.getProperty("/uiFilter");var j1=f1.config.searchInAttibuteFacetPostion;if(j1){for(var k1 in j1){h1=i1.rootCondition.getAttributeConditions(k1);for(var j=0;j<h1.length;j++){g1.push(h1[j]);}}}if(g1.length>0){f1.resetFilterConditions(false);for(var i=0;i<g1.length;i++){var l1=g1[i];i1.autoInsertCondition(l1);}f1._firePerspectiveQuery({preserveFormerResults:false,});f1.notifyFilterChanged();}else{f1.resetFilterConditions(true);}},});if(o.getModel().config&&o.getModel().config.searchInAttibuteFacetPostion&&o.getModel().config.searchInAttibuteFacetPostion[q]){R.addStyleClass("sapUshellSearchFilterByResetButtonHidden");}else{R.addStyleClass("sapUshellSearchFilterByResetButton");}R.onAfterRendering=function(){$(this.getDomRef()).attr("aria-label",a.getText("resetFilterButton_tooltip"));};var U=new T({text:o.getHeaderText(),});var W=new g();var X=new f({content:[U,W,R],});X.data("sap-ui-fastnavgroup","false",true);M.setHeaderToolbar(X);if(o.getModel().config&&o.getModel().config.FF_facetPanelUnifiedHeaderStyling&&q==="space_description"){M.setVisible(false);}else{M.addStyleClass("sapUshellSearchFilterByHeaderList");}M.onAfterRendering=function(){$(".sapUshellSearchFilterByHeaderList").find("ul").attr("tabindex","-1");$(".sapUshellSearchFilterByHeaderList").find("div").attr("tabindex","-1");};r.renderControl(M);}var Y=new e({content:x[D],});Y.setModel(o.getModel(),"facets");Y.addStyleClass("sapUshellSearchFacetList");var Z;if(s===o.getModel().sinaNext.AttributeType.String){Z=new sap.esh.search.ui.controls.SearchGroupHeaderListItem({title:t,button:H,});}else{Z=new sap.esh.search.ui.controls.SearchGroupHeaderListItem({title:t,});}Z.data("facet-dimension",q,true);if(o.getModel().config&&o.getModel().config.searchInAttibuteFacetPostion&&o.getModel().config.searchInAttibuteFacetPostion[q]){if(o.getModel().config&&o.getModel().config.FF_facetPanelUnifiedHeaderStyling){if(q==="space_description"){}else{Z.addStyleClass("sapUshellSearchFacetTabBarHeader sapUshellSearchFacetTabBarHeaderHidden");}}else{Z.addStyleClass("sapUshellSearchFacetTabBarHeader sapUshellSearchFacetTabBarHeaderHidden");}}else{Z.addStyleClass("sapUshellSearchFacetTabBarHeader");}var _=a.getText("showMore");if(q==="space_description"){_=a.getText("showMoreDwcSpace");}var a1=new m({text:_,press:p(D,F),});a1.setModel(o.getModel("i18n"));a1.addStyleClass("sapUshellSearchFacetShowMoreLink");var b1=new n({text:"",});b1.addStyleClass("sapUshellSearchFacetInfoZeile");var c1=new V({items:[b1,a1],});var d1=new e({content:c1,visible:{parts:["/uiFilter/dataSource"],formatter:function(j){return j.type!==this.getModel().sinaNext.DataSourceType.Category;},},});d1.addStyleClass("sapUshellSearchFacetShowMoreItem");var e1=new d({showSeparators:l.None,items:[Z,Y,d1],});e1.data("sap-ui-fastnavgroup","false",true);e1.setModel(o.getModel());r.renderControl(e1);o.getItems()[D].addContent(x[D]);r.write("</div>");},onAfterRendering:function(){jQuery(this.getDomRef()).removeAttr("tabindex");},});});
