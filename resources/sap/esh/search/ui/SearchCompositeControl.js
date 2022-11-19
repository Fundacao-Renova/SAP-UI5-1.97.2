/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["./error/errors","./error/ErrorHandler","./i18n","sap/ui/model/resource/ResourceModel","sap/esh/search/ui/controls/SearchFieldGroup","sap/esh/search/ui/SearchShellHelperAndModuleLoader","sap/esh/search/ui/SearchModel","sap/esh/search/ui/controls/SearchLayout","sap/esh/search/ui/controls/SearchLayoutResponsive","sap/esh/search/ui/controls/SearchResultListContainer","sap/esh/search/ui/controls/SearchResultList","sap/esh/search/ui/controls/SearchResultTable","sap/esh/search/ui/controls/SearchResultGrid","sap/esh/search/ui/controls/SearchSpreadsheet","sap/esh/search/ui/controls/SearchNoResultScreen","sap/esh/search/ui/SearchHelper","sap/esh/search/ui/controls/SearchText","sap/esh/search/ui/controls/SearchLink","sap/esh/search/ui/controls/SearchCountBreadcrumbs","sap/esh/search/ui/controls/SearchResultListItem","sap/esh/search/ui/controls/CustomSearchResultListItem","sap/esh/search/ui/controls/SearchTileHighlighter","sap/esh/search/ui/controls/SearchFilterBar","sap/esh/search/ui/controls/SearchFacetFilter","sap/esh/search/ui/controls/DivContainer","sap/ui/core/Control","sap/ui/core/InvisibleText","sap/ui/core/Icon","sap/ui/core/IconPool","sap/ui/core/delegate/ItemNavigation","sap/ui/layout/VerticalLayout","sap/ui/model/BindingMode","sap/m/Button","sap/m/ButtonType","sap/m/PlacementType","sap/m/ToolbarDesign","sap/m/SegmentedButton","sap/m/SegmentedButtonItem","sap/m/ToggleButton","sap/m/Bar","sap/m/OverflowToolbarLayoutData","sap/m/OverflowToolbarPriority","sap/m/OverflowToolbar","sap/m/ToolbarSeparator","sap/m/Label","sap/m/Text","sap/m/Column","sap/m/ColumnListItem","sap/m/CustomListItem","sap/m/TablePersoController","sap/m/ListMode","sap/m/ListType","sap/m/PopinDisplay","sap/m/ActionSheet","sap/m/FlexBox","sap/m/FlexJustifyContent","sap/m/GenericTile","sap/m/TileContent","sap/m/BusyDialog","sap/m/ViewSettingsDialog","sap/m/ViewSettingsItem","sap/m/PopinLayout","sap/m/Page","sap/m/MessagePopover","sap/m/MessageItem","sap/m/HBox","sap/m/VerticalPlacementType","sap/f/GridContainer","sap/f/GridContainerSettings","sap/f/GridContainerItemLayoutData","sap/m/TablePersoController",],function(e,E,a,R,S,b,c,d,f,g,h,j,k,m,n,o,p,q,r,s,C,t,u,v,D,w,I,x,y,z,V,B,A,F,P,T,G,H,J,K,O,L,M,N,Q,U,W,X,Y,Z,_,a1,b1,c1,d1,e1,f1,g1,h1,i1,j1,k1,m1,n1,o1,p1,q1,r1,s1,t1){("use strict");return w.extend("sap.esh.search.ui.SearchCompositeControl",{metadata:{library:"sap.esh",properties:{cssClass:"string",searchTerm:{type:"string",group:"Misc",defaultValue:"*",},searchOnStart:{type:"boolean",group:"Behavior",defaultValue:true,},},aggregations:{content:{singularName:"content",multiple:true,},},},eshCompCounter:0,subscribeDone_SearchFinished:false,constructor:function(i,l){var l1=this;this.errorHandler=new E({model:null,});try{if(typeof i==="string"&&i.length>0&&typeof l.id!=="undefined"){if(i!==l.id){var u1=new Error("Constructor of component 'sap.esh.search.ui.SearchCompositeControl' has failed\n\n"+"sId and mSettings.id are not the same. It is sufficient to set either 'id' (sId) or 'settings.id' (mSettings.id).");var v1=new e.ESHUIConstructionError(u1);l1.errorHandler.onError(v1);}}if(typeof i!=="string"&&i!==undefined&&l===undefined){l=i;i=l&&l.id;}else if(typeof l==="undefined"){l={};}if(typeof i==="string"&&i.length>0){l.id=i;}if(!i||i.length===0){i="eshComp"+"GenId_"+this.eshCompCounter++;l.id=i;}l1.options=l;var w1=l1.getMetadata().getProperties();l1.metadataOptions={};for(var x1 in w1){if(l1.options[x1]!=="undefined"){l1.metadataOptions[x1]=l1.options[x1];}}l1.metadataOptions=jQuery.extend({},{content:[],},l1.metadataOptions);w.prototype.constructor.apply(l1,[i,l1.metadataOptions]);l1.addStyleClass("sapUshellSearchInputHelpPage");this.oFocusHandler=new o.SearchFocusHandler(this);try{var y1=l1.options.model||l1.getModel("searchModel");if(!y1){y1=new c({configuration:l1.options,});l1.setModel(y1,"searchModel");}y1.isSearchCompositeControl=true;y1.focusHandler=this.oFocusHandler;l1.setModel(y1);l1.setModel(new R({bundle:a}),"i18n");l1.createContent();}catch(u1){var v1=new e.ESHUIConstructionError(u1);l1.errorHandler.onError(v1);}l1.getModel().searchUrlParser.parse().then(function(){l1.getModel().initBusinessObjSearch().then(function(){var z1=l1.getModel().getSearchBoxTerm();var A1=l1.getModel().config;if(z1===""&&!A1.FF_bSearchtermNoAsterisk){z1=l1.getSearchTerm();l1.getModel().setSearchBoxTerm(z1,false);}if(l1.getSearchOnStart()){l1.getModel()._firePerspectiveQuery();}});});}catch(u1){l1.errorHandler.onError(u1);}},exit:function(){var i=this;if(this.oErrorPopover){this.oErrorPopover.destroy();}if(this.oTablePersoController&&this.oTablePersoController.getTablePersoDialog()){this.oTablePersoController.getTablePersoDialog().destroy();}if(this.oSearchPage&&this.oSearchPage.oFacetDialog){this.oSearchPage.oFacetDialog.destroy();}i.oModel.unsubscribe("ESHSearchFinished",i.onAllSearchFinished,i);},renderer:function(l,l1){l.write("<div");l.writeControlData(l1);l.addClass(l1.getCssClass());l.writeClasses();l.addStyle("height","100%");l.addStyle("width","100%");l.writeStyles();l.write(">");var u1=l1.getContent();for(var i=0;i<u1.length;i++){l.renderControl(u1[i]);}l.write("</div>");},createContent:function(){var i=this;i.oSearchFieldGroup=new S(this.getId()+"-searchInputHelpPageSearchFieldGroup");i.oSearchFieldGroup.setCancelButtonActive(false);i.oSearchFieldGroup.addStyleClass("sapUshellSearchInputHelpPageSearchFieldGroup");i.oSearchFieldGroup.input.setShowValueHelp(false);i.getModel().setProperty("/inputHelp",i.oSearchFieldGroup.input);if(!i.subscribeDone_SearchFinished&&i.getModel&&i.getModel()&&i.getModel().subscribe){i.getModel().subscribe("ESHSearchFinished",i.onAllSearchFinished,i);i.subscribeDone_SearchFinished=true;}if(i.getModel&&i.getModel()){i.getModel().subscribe("ESHSearchFinished",function(){i.oSearchFieldGroup.input.setValue(i.getModel().getSearchBoxTerm());},i);}i.oSearchBar=new K("",{visible:{parts:["/count","/facetVisibility"],formatter:function(l1,u1){if(u1){return l1!==0||i.getModel().config.searchBarDoNotHideForNoResults;}return l1!==0||i.getModel().config.searchBarDoNotHideForNoResults;},},contentLeft:[i.assembleFilterButton(),i.assembleDataSourceTapStrips()],contentRight:i.assembleSearchToolbar(),});i.oSearchBar.addStyleClass("sapUshellSearchBar");i.oFilterBar=new u("");if(i.getModel().config.FF_layoutWithoutPage){i.oSearchPage=i.createSearchFloorplan(i.getId());}else{var l=new m1(this.getId()+"-searchPage",{customHeader:this.oSearchBar,subHeader:this.oFilterBar,content:[i.createSearchContainer(i.getId())],enableScrolling:true,showFooter:{parts:["/errors/length"],formatter:function(l1){return l1>0;},},showHeader:true,showSubHeader:{parts:["/facetVisibility","/uiFilter/rootCondition"],formatter:function(l1,u1){if((!l1||i.getModel().config.searchFilterBarShowWithFacets)&&u1&&u1.hasFilters()){return true;}return false;},},});l.setFooter(i.createFooter(i.getId()));l.addStyleClass("sapUshellSearchInputHelpPageSearchPage");i.oSearchPage=l;}i.addContent(i.oSearchFieldGroup);i.addContent(i.oSearchPage);},onAfterRendering:function(){var i=this;if(!i.subscribeDone_SearchFinished&&i.getModel&&i.getModel()&&i.getModel().subscribe){i.getModel().subscribe("ESHSearchFinished",i.onAllSearchFinished,i);i.subscribeDone_SearchFinished=true;}},assembleFilterButton:function(){var i=this;var l=new J(this.getId()+"-searchBarFilterButton",{icon:y.getIconURI("filter"),tooltip:{parts:["/facetVisibility"],formatter:function(l1){return l1?a.getText("hideFacetBtn_tooltip"):a.getText("showFacetBtn_tooltip");},},pressed:"{/facetVisibility}",press:function(){if(l.getPressed()){i.searchLayout.setAnimateFacetTransition(true);i.getModel().setFacetVisibility(true);i.searchLayout.setAnimateFacetTransition(false);}else{i.searchLayout.setAnimateFacetTransition(true);i.getModel().setFacetVisibility(false);i.searchLayout.setAnimateFacetTransition(false);}},visible:{parts:["/businessObjSearchEnabled","/count"],formatter:function(l1,u1){if(u1===0){return false;}return!sap.ui.Device.system.phone&&l1;},},});l.addStyleClass("searchBarFilterButton");return l;},assembleCountLabel:function(){var l=new r();return l;},assembleCountHiddenElement:function(){var i=new I("",{text:{parts:["/count","/nlqSuccess","/nlqDescription"],formatter:function(l,l1,u1){if(l1){return u1;}if(typeof l!=="number"){return"";}return a.getText("results_count_for_screenreaders",[l.toString()]);},},});return i;},assembleSearchToolbar:function(){var i=this;var l=new A((i.getId()?i.getId()+"-":"")+"dataExportButton",{icon:"sap-icon://download",tooltip:"{i18n>exportData}",type:F.Transparent,visible:{parts:["/displaySwitchVisibility","/count"],formatter:function(B1,C1){return B1&&C1!==0;},},press:function(){if(i.searchSpreadsheet===undefined){i.searchSpreadsheet=new m("ushell-search-spreadsheet");}i.searchSpreadsheet.onExport();},}).addStyleClass("sapUshellSearchTableDataExportButton");var l1=i.assembleDisplaySwitchTapStrips();var u1=new A("",{icon:"sap-icon://sort",tooltip:"{i18n>sortTable}",type:F.Transparent,visible:{parts:["/displaySwitchVisibility","/count","/tableSortableColumns"],formatter:function(B1,C1,D1){return B1&&C1!==0&&D1.length>1;},},press:function(){i.tableSortDialog.open();},});u1.addStyleClass("sapUshellSearchTableSortButton");l1.addEventDelegate({onAfterRendering:function(B1){var C1=B1.srcControl;var D1=3;if(!i.getModel().config.gridView){D1--;}if(C1.getItems().length===D1&&i.determineIfMaps(i)){C1.addItem(new H("",{icon:"sap-icon://map",tooltip:a.getText("displayMap"),key:"map",}));}else if(C1.getItems().length===D1+1&&!i.determineIfMaps(i)){C1.removeItem(C1.getItems()[D1]);if(i.getModel().getProperty("/resultToDisplay")==="searchResultMap"){if(!i.getModel().config.hideListView){i.getModel().setProperty("/resultToDisplay","searchResultList");}else{i.getModel().setProperty("/resultToDisplay","searchResultTable");}}}},});l1.addStyleClass("sapUshellSearchResultDisplaySwitch");var v1=new N("",{visible:{parts:["/displaySwitchVisibility","/count"],formatter:function(B1,C1){return B1&&C1!==0;},},});var w1=new A((i.getId()?i.getId()+"-":"")+"tablePersonalizeButton",{icon:"sap-icon://action-settings",tooltip:"{i18n>personalizeTable}",type:F.Transparent,enabled:{parts:["/resultToDisplay"],formatter:function(B1){return B1==="searchResultTable";},},visible:{parts:["/displaySwitchVisibility","/count","/tableSortableColumns"],formatter:function(B1,C1,D1){return B1&&C1!==0&&D1.length>1;},},press:function(){i.oTablePersoController.openDialog();},});w1.addStyleClass("sapUshellSearchTablePersonalizeButton");var x1=[];var y1=this.getModel().config.isUshell;if(y1){var z1=this.assembleShareButton();x1=[l,u1,w1,z1,v1,l1,];}else{x1=[l,u1,w1,v1,l1,];}var A1=i.getModel().config.getCustomToolbar();if(A1.length>0){A1.push(new N("",{visible:{parts:["/displaySwitchVisibility","/count"],formatter:function(B1,C1){return B1&&C1!==0;},},}));}x1=A1.concat(x1);return x1;},assembleShareButton:function(){var i=this;var l=new sap.ushell.ui.footerbar.AddBookmarkButton("",{beforePressHandler:function(){var w1={url:document.URL,title:i.getModel().getDocumentTitle(),icon:y.getIconURI("search"),};l.setAppData(w1);},});l.setWidth("auto");var l1=new A();l1.setIcon("sap-icon://email");l1.setText(a.getText("eMailFld"));l1.attachPress(function(){sap.m.URLHelper.triggerEmail(null,i.getModel().getDocumentTitle(),document.URL);});l1.setWidth("auto");var u1=new c1("",{placement:P.Bottom,buttons:[l,l1],});var v1=new A("",{icon:"sap-icon://action",tooltip:a.getText("shareBtn"),press:function(){u1.openBy(v1);},});return v1;},assembleDataSourceTapStrips:function(){var l=this;var l1=new M("",{design:T.Transparent,visible:{parts:["/facetVisibility","/count","/businessObjSearchEnabled"],formatter:function(i,v1,w1){return!i&&v1>0&&w1;},},});l1.data("sap-ui-fastnavgroup","false",true);l1.addStyleClass("searchTabStrips");l.tabBar=l1;var u1=new I("",{text:"Data Sources",}).toStatic();l1.addDependent(u1);l1.addAriaLabelledBy(u1);l1.bindAggregation("content",{path:"/tabStrips/strips",factory:function(v1,w1){var x1=new J("",{text:"{labelPlural}",type:{parts:["/tabStrips/selected"],formatter:function(i){return F.Transparent;},},pressed:{parts:["/tabStrips/selected"],formatter:function(i){var z1=this.getBindingContext().getObject();return z1===i;},},press:function(){if(l.getModel().config.searchScopeWithoutAll){return;}x1.setType(F.Transparent);if(x1.getBindingContext().getObject()===l.getModel().getProperty("/tabStrips/selected")){x1.setPressed(true);return;}var z1=(l.tabBar.getContent());for(var i=0;i<z1.length;i++){if(z1[i].getId()!==this.getId()){z1[i].setType(F.Transparent);if(z1[i].getPressed()===true){z1[i].setPressed(false);}}}l.getModel().setDataSource(x1.getBindingContext().getObject());},});var y1=new I("",{text:w1.getProperty("labelPlural")+", "+a.getText("dataSource"),}).toStatic();x1.addAriaLabelledBy(y1);x1.addDependent(y1);return x1;},});l1._setupItemNavigation=function(){if(!this.theItemNavigation){this.theItemNavigation=new z();this.addDelegate(this.theItemNavigation);}this.theItemNavigation.setCycling(false);this.theItemNavigation.setRootDomRef(this.getDomRef());var v1=[];var w1=this.getContent();for(var i=0;i<w1.length;i++){if(!$(w1[i].getDomRef()).attr("tabindex")){var x1="-1";if(w1[i].getPressed&&w1[i].getPressed()){x1="0";}$(w1[i].getDomRef()).attr("tabindex",x1);}v1.push(w1[i].getDomRef());}var y1=l1.getAggregation("_overflowButton");if(y1&&y1.getDomRef){var z1=y1.getDomRef();v1.push(z1);$(z1).attr("tabindex","-1");}this.theItemNavigation.setItemDomRefs(v1);};return l1;},determineIfMaps:function(l){var l1=false;if(l.getModel()){if(l.getModel().config.maps===true){l1=true;}else if(l.getModel().config.maps===false){l1=false;}else{var u1=l.getModel().getDataSource();if(typeof u1!=="undefined"&&u1.attributesMetadata){var v1=u1.attributesMetadata;for(var i=0;i<v1.length;i++){var w1=v1[i].type;if(w1==="GeoJson"){l1=true;break;}}}}}return l1;},assembleDisplaySwitchTapStrips:function(){var i=this;var l=[new H("",{icon:"sap-icon://list",tooltip:a.getText("displayList"),key:"list",visible:"{=!${/config/hideListView}}",}),new H("",{icon:"sap-icon://table-view",tooltip:a.getText("displayTable"),key:"table",visible:true,}),new H("",{icon:"sap-icon://grid",tooltip:a.getText("displayGrid"),key:"grid",visible:"{/config/gridView}",}),];if(typeof i.getModel().config.defaultResultViewType!=="undefined"){l=i.reArrangeDisplaySwitchTapStripButtons(l);}var l1=new G(this.getId()+"-ResultViewType",{selectedKey:{parts:["/resultToDisplay"],formatter:function(u1){var v1="";if(u1==="searchResultList"){v1="list";}else if(u1==="searchResultTable"){v1="table";}else if(u1==="searchResultGrid"){v1="grid";}else if(u1==="searchResultMap"){v1="map";}if(v1===""){v1="list";}return v1;},},items:l,visible:{parts:["/displaySwitchVisibility","/count"],formatter:function(u1,v1){return u1&&v1!==0;},},selectionChange:function(u1){var v1=u1.getParameter("item").getKey();var w1=i.getModel();switch(v1){case"list":w1.setResultToDisplay("searchResultList");i.showMoreFooter.setVisible(i.isShowMoreFooterVisible());i.searchResultMap.setVisible(false);break;case"table":w1.setResultToDisplay("searchResultTable");i.showMoreFooter.setVisible(i.isShowMoreFooterVisible());i.searchResultMap.setVisible(false);break;case"grid":w1.setResultToDisplay("searchResultGrid");i.showMoreFooter.setVisible(i.isShowMoreFooterVisible());i.searchResultMap.setVisible(false);break;case"map":w1.setResultToDisplay("searchResultMap");i.showMoreFooter.setVisible(i.isShowMoreFooterVisible());break;default:w1.setResultToDisplay("searchResultList");i.showMoreFooter.setVisible(i.isShowMoreFooterVisible());}w1.enableOrDisableMultiSelection();w1._firePerspectiveQuery();}.bind(this),});l1.addStyleClass("sapUshellSearchDisplaySwitchTapStrips");return l1;},isShowMoreFooterVisible:function(){var i=this.getModel();return i.getProperty("/boCount")>i.getProperty("/boResults").length;},assembleCenterArea:function(i){var l=this;l.tableSortDialog=l.assembleSearchResultSortDialog();var l1=l.assembleSearchResultList();l.searchResultTable=l.assembleSearchResultTable(i);l.searchResultTable.addDelegate({onBeforeRendering:function(){l.updateTableLayout();},onAfterRendering:function(){var u1=$(l.searchResultTable.getDomRef()).find("table > thead > tr:first");if(u1){u1.attr("aria-labelledby",l.totalCountHiddenElement.getId());}},});l.searchResultGrid=l.assembleSearchResultGrid();l.searchResultMap=l.assembleSearchResultMap();l.searchResultMap.setVisible(false);l.appSearchResult=l.assembleAppSearch();l.showMoreFooter=l.assembleShowMoreFooter();return[l.tableSortDialog,l1,l.searchResultTable,l.searchResultGrid,l.searchResultMap,l.appSearchResult,l.showMoreFooter,l.totalCountHiddenElement,];},assembleSearchResultSortDialog:function(){var l=this;var l1=new i1("",{sortDescending:{parts:["/orderBy"],formatter:function(i){return jQuery.isEmptyObject(i)||i.sortOrder==="DESC";},},confirm:function(i){var u1=[];u1=i.getParameters();if(u1.sortItem){var v1=l.getModel();if(u1.sortItem.getKey()==="searchSortableColumnKeyDefault"){v1.resetOrderBy();l1.setSortDescending(true);}else{v1.setOrderBy({orderBy:u1.sortItem.getBindingContext().getObject().attributeId,sortOrder:u1.sortDescending===true?"DESC":"ASC",});}}},cancel:function(){var u1=l.getModel().getOrderBy().sortOrder;var v1=l.getModel().getOrderBy().orderBy;if(u1===undefined||v1===undefined){l1.setSortDescending(true);l1.setSelectedSortItem("searchSortableColumnKeyDefault");return;}if(u1.toLowerCase()==="asc"){l1.setSortDescending(false);}else{l1.setSortDescending(true);}var w1="searchSortableColumnKeyDefault";for(var i=0;i<l1.getSortItems().length;i++){var x1=l1.getSortItems()[i];if(x1.getBindingContext().getObject().attributeId===v1){w1=x1.getKey();break;}}l1.setSelectedSortItem(w1);},resetFilters:function(){var u1=l.getModel().getProperty("/tableSortableColumns");for(var i=0;i<u1.length;++i){var v1=u1[i];if(v1.key==="searchSortableColumnKeyDefault"){v1.selected=true;}else{v1.selected=false;}}l.getModel().setProperty("/tableSortableColumns",u1);},});l1.bindAggregation("sortItems",{path:"/tableSortableColumns",factory:function(){return new j1("",{key:"{key}",text:"{name}",selected:"{selected}",});},});return l1;},assembleSearchResultGrid:function(){var i;if(typeof this.getModel().config.customGridView==="function"){i=this.getModel().config.customGridView();}else{var l=new s1("",{rowSize:"11rem",columnSize:"11rem",gap:"0.5rem",});i=new k(this.getId()+"-ushell-search-result-grid",{layout:l,snapToRow:true,});}i.bindProperty("visible",{parts:["/resultToDisplay","/count"],formatter:function(l1,u1){return l1==="searchResultGrid"&&u1!==0;},});i.addStyleClass("sapUshellSearchGrid");return i;},assembleSearchResultTable:function(i){var l=this;var l1=new j(i+"-ushell-search-result-table",{mode:{parts:["/multiSelectionEnabled"],formatter:function(u1){return u1===true?_.MultiSelect:_.None;},},noDataText:"{i18n>noCloumnsSelected}",visible:{parts:["/resultToDisplay","/count"],formatter:function(u1,v1){return u1==="searchResultTable"&&v1!==0;},},popinLayout:k1.GridLarge,rememberSelections:false,selectionChange:function(){l.getModel().updateMultiSelectionSelected();},});l1.bindAggregation("columns","/tableColumns",function(u1,v1){var w1=v1.getObject();var x1=new W(i+"-"+w1.key,{header:new Q("",{text:"{name}",tooltip:"{name}",}),visible:{parts:["index","attributeId"],formatter:function(y1,z1){if(l.getModel().config.extendTableColumn){return(y1<7||z1===l.getModel().config.extendTableColumn.column.attributeId);}return y1<6;},},width:"{width}",});return x1;});l1.bindAggregation("items","/tableResults",function(u1,v1){return l.assembleTableItems(v1);});l1.addEventDelegate({onAfterRendering:function(){l.updatePersoServiceAndController();var u1=$(this.getDomRef());u1.find("table tbody tr").each(function(){var v1=$(this);var w1=sap.ui.getCore().byId(v1.attr("id"));if(w1){var x1=w1.getAriaLabelledBy();if($.inArray(l.totalCountHiddenElement.getId(),x1)===-1){w1.addAriaLabelledBy(l.totalCountHiddenElement);}}return false;});}.bind(l1),});return l1;},assembleTableItems:function(i){var l=this;var l1=i.getObject();if(l1.type==="footer"){return new Y("",{visible:false,});}return l.assembleTableMainItems(l1,i.getPath());},assembleTableMainItems:function(l,l1){var u1=this;var v1=l1+"/cells";var w1=new X("",{selected:"{selected}",}).addStyleClass("sapUshellSearchTable");w1.bindAggregation("cells",{path:v1,factory:function(v1,x1){if(x1.getObject().isTitle){var y1="";var z1=void 0;var A1=x1.getObject().titleNavigation;if(A1){y1=A1.getHref();z1=A1.getTarget();}var B1=!!(y1&&y1.length>0);var C1=new q({text:"{value}",tooltip:"{value}",enabled:B1,press:function(){var A1=x1.getObject().titleNavigation;if(A1){A1.performNavigation({trackingOnly:true,});}},});C1.setHref(y1);C1.setTooltip(C1.getText());var D1=x1.getObject().titleIconUrl;if(D1){var E1=new x("",{src:D1,});C1.setAggregation("icon",E1);}C1.addStyleClass("sapUshellSearchResultListItem-MightOverflow");C1.addStyleClass("sapUshellSearchTableTitleLink");if(z1){C1.setTarget(z1);}var F1=C1;var G1=x1.getObject().titleInfoIconUrl;if(G1){var H1=new x("",{src:G1,tooltip:a.getText("collectionShared"),}).addStyleClass("sapUshellSearchTableTitleInfoIcon");F1=new p1("",{items:[C1,H1],});}return F1;}else if(x1.getObject().isRelatedApps){var I1=x1.getObject().navigationObjects;var J1=[];var K1={};var L1=function(P1,M1){M1.performNavigation();};for(var i=0;i<I1.length;i++){var M1=I1[i];K1=new A("",{text:M1.getText(),tooltip:M1.getText(),});K1.attachPress(M1,L1);J1.push(K1);}return new A("",{icon:"sap-icon://action",press:function(){var P1=new c1("",{buttons:J1,placement:P.Auto,});P1.openBy(this);},});}else if(x1.getObject().isExtendTableColumnCell){return u1.getModel().config.extendTableColumn.bindingFunction(x1.getObject());}var N1=new p({text:"{value}",isForwardEllipsis4Whyfound:true,}).addStyleClass("sapUshellSearchResultListItem-MightOverflow");if(x1.getObject().icon){var O1=new x("",{src:x1.getObject().icon,});N1.setAggregation("icon",O1);}return N1;},});return w1;},assembleSearchResultMap:function(){return new sap.m.HBox();},assembleShowMoreFooter:function(){var i=this;var l=new A("",{text:"{i18n>showMore}",type:F.Transparent,press:function(){var u1=i.getModel();u1.setProperty("/focusIndex",u1.getTop());var v1=u1.getTop()+u1.pageSize;u1.setTop(v1);u1.eventLogger.logEvent({type:u1.eventLogger.SHOW_MORE,});},});l.addStyleClass("sapUshellResultListMoreFooter");var l1=new d1("",{visible:{parts:["/boCount","/boResults"],formatter:function(u1,v1){return v1.length<u1;},},justifyContent:e1.Center,});l1.addStyleClass("sapUshellResultListMoreFooterContainer");l1.addItem(l);return l1;},assembleSearchResultList:function(){var i=this;i.resultList=new h({mode:_.None,width:"auto",showNoData:false,visible:{parts:["/resultToDisplay","/count"],formatter:function(l,l1){return l==="searchResultList"&&l1!==0;},},});i.resultList.bindAggregation("items","/results",function(l,l1){return i.assembleListItem(l1);});return i.resultList;},assembleAppSearch:function(){var i=this;var l=new s1("",{rowSize:"5.5rem",columnSize:"5.5rem",gap:"0.25rem",});var l1=new r1("",{layout:l,snapToRow:true,visible:{parts:["/resultToDisplay","/count"],formatter:function(w1,x1){return w1==="appSearchResult"&&x1!==0;},},items:{path:"/appResults",factory:function(id,w1){if(i.getModel().getResultToDisplay()==="appSearchResult"){var x1=w1.getObject();var y1=x1.visualization;var z1=i.getModel().uShellVisualizationInstantiationService;var A1=z1.instantiateVisualization(y1);A1.attachPress(function(){i.getModel().eventLogger.logEvent({type:i.getModel().eventLogger.TILE_NAVIGATE,tileTitle:y1.title,targetUrl:y1.targetURL,});});A1.addEventDelegate({onAfterRendering:i.highlightTile,});A1.setActive(false,true);A1.setLayoutData(new t1(A1.getLayout()));return A1;}return new U("",{text:"",});},},});l1.addStyleClass("sapUshellSearchGridContainer");var u1=new A("",{text:"{i18n>showMore}",type:F.Transparent,visible:{parts:["/resultToDisplay","/appCount","/appResults"],formatter:function(w1,x1,y1){return w1==="appSearchResult"&&y1.length<x1;},},press:function(){var w1=i.getModel();var x1=w1.getTop()+w1.pageSize;w1.setProperty("/focusIndex",w1.getTop());w1.setTop(x1);w1.eventLogger.logEvent({type:w1.eventLogger.SHOW_MORE,});},});u1.addStyleClass("sapUshellResultListMoreFooter");var v1=new V("",{width:"100%",visible:{parts:["/resultToDisplay","/count"],formatter:function(w1,x1){return w1==="appSearchResult"&&x1!==0;},},content:[l1,u1],});v1.addStyleClass("sapUshellResultApps");return v1;},highlightTile:function(i){var l=i.srcControl.getAggregation("content");if(l){var l1=l.findAggregatedObjects(true,function(w1){return w1.isA("sap.m.GenericTile")||w1.isA("sap.f.Card");});if(l1.length===0&&l.getComponentInstance){l1=l.getComponentInstance().findAggregatedObjects(true,function(w1){return w1.isA("sap.m.GenericTile")||w1.isA("sap.f.Card");});}if(l1.length>0){var u1=l1[0];var v1=new t();v1.setHighlightTerms(i.srcControl.getModel().getProperty("/uiFilter/searchTerm"));v1.highlight(u1);}}},assembleAppContainerResultListItem:function(){var l1=this;var l=new s1("",{rowSize:"5.5rem",columnSize:"5.5rem",gap:"0.25rem",});var u1=new r1("",{layout:l,snapToRow:true,items:{path:"/appResults",factory:function(i,w1){if(l1.getModel().getResultToDisplay()!=="appSearchResult"){var x1=w1.getObject();var y1=x1.visualization;var z1=l1.getModel().uShellVisualizationInstantiationService;var A1=z1.instantiateVisualization(y1);A1.attachPress(function(){l1.getModel().eventLogger.logEvent({type:l1.getModel().eventLogger.TILE_NAVIGATE,tileTitle:y1.title,targetUrl:y1.targetURL,});});A1.addEventDelegate({onAfterRendering:l1.highlightTile,});A1.setActive(false,true);A1.setLayoutData(new t1(A1.getLayout()));return A1;}return new U(i,{text:"",});},},});u1.addStyleClass("sapUshellSearchGridContainer");u1.addEventDelegate({onAfterRendering:function(){var l1=this;if(l1.getDomRef().clientWidth===0){return;}var w1=l1.getDomRef().clientWidth-176;var x1=Math.floor(w1/184);var y1=l1.getItems();var z1=l1.getModel().getProperty("/appCount");var A1=l1.getModel().getProperty("/boCount");if(y1.length>x1+1){var B1=0,i=0;for(;i<y1.length;i++){B1=B1+y1[i].getDomRef().clientWidth+8;if(B1>w1){break;}}var C1=l1.getModel().getProperty("/appResults");l1.getModel().setProperty("/appResults",C1.slice(0,i));}else{var D1=y1[y1.length-1];if(z1>x1&&!D1.hasStyleClass("sapUshellSearchResultListItemAppsShowMore")){var E1=new f1("",{tileContent:new g1("",{content:new U("",{text:a.getText("showMoreApps"),}),}),press:function(){var F1=l1.getModel();F1.setDataSource(F1.appDataSource);},});E1.addStyleClass("sapUshellSearchResultListItemAppsShowMore");l1.addItem(E1);l1.getModel().setProperty("/resultToDisplay","appSearchResult");l1.getModel().setProperty("/resultToDisplay","searchResultList");l1.getModel().setProperty("/boCount",0);l1.getModel().setProperty("/boCount",A1);}}},},u1);var v1=new Y("",{content:u1,});v1.addStyleClass("sapUshellSearchResultListItem");v1.addStyleClass("sapUshellSearchResultListItemApps");v1.addEventDelegate({onAfterRendering:function(){var i=$(v1.getDomRef());i.removeAttr("tabindex");i.removeAttr("role");i.attr("aria-hidden","true");},},v1);return v1;},assembleResultListItem:function(i){var l=this;var l1=this.getModel().config.getDataSourceConfig(i.dataSource);var u1={dataSource:i.dataSource,title:"{title}",titleDescription:"{titleDescription}",titleNavigation:"{titleNavigation}",type:"{dataSourceName}",imageUrl:"{imageUrl}",imageFormat:"{imageFormat}",imageNavigation:"{imageNavigation}",geoJson:"{geoJson}",attributes:"{itemattributes}",navigationObjects:"{navigationObjects}",selected:"{selected}",expanded:"{expanded}",positionInList:"{positionInList}",resultSetId:"{resultSetId}",layoutCache:"{layoutCache}",titleIconUrl:"{titleIconUrl}",titleInfoIconUrl:"{titleInfoIconUrl}",};var v1;if(l1.searchResultListItemControl){v1=new l1.searchResultListItemControl(u1);}else if(l1.searchResultListItemContentControl){u1.content=new l1.searchResultListItemContentControl();v1=new C(u1);}else{v1=new s(u1);}if(v1.setTotalCountHiddenElement){v1.setTotalCountHiddenElement(l.totalCountHiddenElement);}var w1=new Y("",{content:v1,type:a1.Inactive,});w1.addStyleClass("sapUshellSearchResultListItem");if(v1.setParentListItem){v1.setParentListItem(w1);}return w1;},assembleListItem:function(i){var l=this;var l1=i.getObject();if(l1.type==="title"){return l.assembleTitleItem(l1);}else if(l1.type==="footer"){return new Y();}else if(l1.type==="appcontainer"){return l.assembleAppContainerResultListItem();}return l.assembleResultListItem(l1);},onAllSearchStarted:function(){},onAllSearchFinished:function(){var i=this;i.reorgTabBarSequence();i.chooseNoResultScreen();i.oFocusHandler.setFocus();var l=sap.ui.getCore().byId("viewPortContainer");if(l&&l.switchState){l.switchState("Center");}},updatePersoServiceAndController:function(){var i=this;var l=i.getModel();var l1=l.getDataSource().id;var u1="search-result-table-state-"+l1;var v1=i.getId()+"-ushell-search-result-table";var w1=(sap.ui.getCore().byId(v1));if(!i.oTablePersoController){var x1=l.getPersonalizationStorageInstance();var y1=l.config.isUshell?"sap.ushell.renderers.fiori2.search.container":"";i.oTablePersoController=new Z("",{table:w1,persoService:x1.getPersonalizer(u1),componentName:y1,}).activate();i.oTablePersoController.refresh();}if((i.oTablePersoController&&i.oTablePersoController.getPersoService().getKey()!==u1)||i.sTableMode!=w1.getMode()){i.oTablePersoController.setPersoService(l.getPersonalizationStorageInstance().getPersonalizer(u1));i.oTablePersoController.refresh();i.sTableMode=w1.getMode();}},updateTableLayout:function(){var l=this;if(l.searchResultTable&&l.oTablePersoController){var l1=l.getModel().getDataSource().id;var u1="search-result-table-state-"+l1;l.oTablePersoController.getPersoService(u1).getPersData().then(function(v1){if(v1&&v1.aColumns){var w1=v1.aColumns;var x1=this.searchResultTable.getColumns();var y1=0;for(var i=0;i<w1.length;i++){var z1=w1[i].id.split("table-searchColumnKey").pop();var A1=x1[parseInt(z1,10)];if(A1){A1.setDemandPopin(false);if(w1[i].visible){y1++;A1.setDemandPopin(true);A1.setPopinDisplay(b1.Inline);var B1=12*y1;A1.setMinScreenWidth(B1+"rem");}}}if(y1<=3){this.searchResultTable.setFixedLayout(false);}else{this.searchResultTable.setFixedLayout(true);}}}.bind(this));}},reArrangeDisplaySwitchTapStripButtons:function(i){var l=this.getModel().config;if(l.defaultResultViewType==="searchResultList"){}else if(this.getModel().config.defaultResultViewType==="searchResultTable"){var l1=i[0];i.splice(3,0,l1);i.splice(0,1);}else if(this.getModel().config.defaultResultViewType==="searchResultGrid"){var l1=i[0];i.splice(3,0,l1);i.splice(0,1);var u1=i[0];i.splice(3,0,u1);i.splice(0,1);}else if(this.getModel().config.defaultResultViewType==="searchResultMap"){var v1=i[3];i.splice(0,0,v1);i.splice(3,1);}return i;},createSearchFloorplan:function(i){var l=this;l.oFilterBar.bindProperty("visible",{parts:["/facetVisibility","/uiFilter/rootCondition"],formatter:function(v1,w1){var x1=false;if((!v1||l.getModel().config.searchFilterBarShowWithFacets)&&w1&&w1.hasFilters()){x1=true;}l.searchContainer.removeStyleClass("sapElisaSearchPageFloorplanWithMessageToolbarFacetPanelOpen");l.searchContainer.removeStyleClass("sapElisaSearchPageFloorplanWithMessageToolbar");l.searchContainer.removeStyleClass("sapElisaSearchPageFloorplan");l.searchContainer.removeStyleClass("sapElisaSearchPageFloorplanFacetPanelOpen");if(l.getModel().getProperty("/errors/length")>0){if(x1){l.searchContainer.addStyleClass("sapElisaSearchPageFloorplanWithMessageToolbarFacetPanelOpen");}else{l.searchContainer.addStyleClass("sapElisaSearchPageFloorplanWithMessageToolbar");}x1=true;}else{if(x1){l.searchContainer.addStyleClass("sapElisaSearchPageFloorplanFacetPanelOpen");}else{l.searchContainer.addStyleClass("sapElisaSearchPageFloorplan");}}return x1;},});var l1=l.createFooter(l.getId());l1.bindProperty("visible",{parts:["/errors/length"],formatter:function(v1){var w1=false;l.searchContainer.removeStyleClass("sapElisaSearchPageFloorplanWithMessageToolbarFacetPanelOpen");l.searchContainer.removeStyleClass("sapElisaSearchPageFloorplanWithMessageToolbar");l.searchContainer.removeStyleClass("sapElisaSearchPageFloorplan");l.searchContainer.removeStyleClass("sapElisaSearchPageFloorplanFacetPanelOpen");if(v1>0){if(l.getModel().getFacetVisibility()){l.searchContainer.addStyleClass("sapElisaSearchPageFloorplanWithMessageToolbarFacetPanelOpen");}else{l.searchContainer.addStyleClass("sapElisaSearchPageFloorplanWithMessageToolbar");}w1=true;}else{if(l.getModel().getFacetVisibility()){l.searchContainer.addStyleClass("sapElisaSearchPageFloorplanFacetPanelOpen");}else{l.searchContainer.addStyleClass("sapElisaSearchPageFloorplan");}}return w1;},});var u1=new D(i+"-searchPage",{content:[l.oSearchBar,l.oFilterBar,l.createSearchContainer(i),l1,],cssClass:"sapElisaSearchPageFloorplan",});return u1;},createSearchContainer:function(i){var l=this;l.model=l.getModel();l.totalCountHiddenElement=l.assembleCountHiddenElement();l.centerArea=l.assembleCenterArea(i);l.oSearchResultListContainer=new g({id:i+"-searchContainerResultsView",centerArea:l.centerArea,totalCountBar:l.assembleCountLabel(),noResultScreen:new n({searchBoxTerm:{parts:["/queryFilter/searchTerm"],formatter:function(v1){return v1;},},visible:{parts:["/count","/isBusy","/firstSearchWasExecuted"],formatter:function(v1,w1,x1){return v1===0&&!w1&&x1;},},toolbar:[new A({text:a.getText("noResultsPageBackButton"),visible:"{/config/displayNoResultsPageBackButton}",press:function(){window.history.back();},}).addStyleClass("sapUiTinyMarginEnd"),new A({text:a.getText("noResultsPageSearchAllButton"),visible:"{/config/displayNoResultsPageSearchAllButton}",press:function(){var v1=l.getModel();v1.resetTop();v1.setSearchBoxTerm("*",false);v1.resetDataSource(false);v1.resetFilterConditions(true);},}),],}),totalCountHiddenElement:l.totalCountHiddenElement,});if(l.getModel().config.layoutUseResponsiveSplitter){var l1=new f(l.getId()+"-searchLayout",{resultListContainer:l.oSearchResultListContainer,busyIndicator:new h1(),isBusy:"{/isBusy}",busyDelay:"{/busyDelay}",showFacets:{parts:["/count","/facetVisibility","/uiFilter/rootCondition","/isBusy","/config",],formatter:function(v1,w1,x1,y1,z1){var A1=true;if(!w1){A1=false;}var B1=x1&&x1.conditions&&x1.conditions.length>0;if(v1===0&&!z1.displayFacetPanelInCaseOfNoResults&&!B1&&!y1){A1=false;}return A1;},},facetPanelWidthInPercent:l.getModel().config.facetPanelWidthInPercent,facets:new v({id:l.getId()+"-SearchFacetFilter",}),});l1.addStyleClass("sapUshellSearchLayout");l.searchLayout=l1;}else{var u1=new d(l.getId()+"-searchLayout",{resultListContainer:l.oSearchResultListContainer,busyIndicator:new h1(),isBusy:"{/isBusy}",busyDelay:"{/busyDelay}",showFacets:{parts:["/count","/facetVisibility","/uiFilter/rootCondition","/isBusy","/config",],formatter:function(v1,w1,x1,y1,z1){if(!w1){return false;}var A1=x1&&x1.conditions&&x1.conditions.length>0;if(v1===0&&!z1.displayFacetPanelInCaseOfNoResults&&!A1&&!y1){return false;}return true;},},vertical:false,facets:new v({id:l.getId()+"-SearchFacetFilter",}),});u1.addStyleClass("sapUshellSearchLayout");l.searchLayout=u1;}l.searchContainer=new D({content:[l.searchLayout],cssClass:"sapUshellSearchContainer",});return l.searchContainer;},createFooter:function(i){var l=this;l.oModel=l.getModel();if(jQuery.device.is.phone){return;}var l1=new n1(i+"-FooterMessagePopover",{placement:q1.Top,});this.oErrorPopover=l1;l1.setModel(l.oModel);l.oModel.setProperty("/messagePopoverControlId",l1.getId());l1.bindAggregation("items",{path:"/errors",factory:function(){var x1=new o1("",{title:"{title}",description:"{description}",});return x1;},});var u1=new A(this.getId()+"-searchErrorButton",{icon:y.getIconURI("alert"),text:{parts:["/errors/length"],formatter:function(x1){return x1;},},visible:{parts:["/errors/length"],formatter:function(x1){return x1>0;},mode:B.OneWay,},type:F.Emphasized,tooltip:a.getText("errorBtn"),press:function(){if(l1.isOpen()){l1.close();}else{l1.setVisible(true);l1.openBy(u1);}},});u1.addDelegate({onAfterRendering:function(){if(!l.oModel.getProperty("/isErrorPopovered")){u1.firePress();l.oModel.setProperty("/isErrorPopovered",true);}},});u1.setLayoutData(new O("",{priority:L.NeverOverflow,}));var v1=[u1];var w1=new M("",{content:v1,});return w1;},chooseNoResultScreen:function(){var i;if(typeof this.getModel().config.getCustomNoResultScreen==="function"){i=this.getModel().config.getCustomNoResultScreen(this.getModel().getDataSource(),this.getModel());}if(!i){i=this.oSearchResultListContainer.getAggregation("noResultScreen");}this.oSearchResultListContainer.setNoResultScreen(i);},reorgTabBarSequence:function(){if(!this.tabBar){return;}var l=new O("",{priority:L.High,});var l1=new O("",{priority:L.NeverOverflow,});var u1=this.tabBar.getContent();for(var i=0;i<u1.length;i++){if(this.getModel().getProperty("/tabStrips/selected")===u1[i].getBindingContext().getObject()){u1[i].setLayoutData(l1);}else{u1[i].setLayoutData(l);}}},onRegionClick:function(){},onRegionContextMenu:function(){},setAppView:function(i){var l=this;l.oAppView=i;if(l.oTilesContainer){l.oTilesContainer.setAppView(i);}},getControllerName:function(){return"sap.esh.search.ui.container.Search";},});});
