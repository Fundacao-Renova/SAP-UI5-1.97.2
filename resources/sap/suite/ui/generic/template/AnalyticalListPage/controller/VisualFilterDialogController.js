sap.ui.define(["sap/m/Button","sap/m/Label","sap/m/Dialog","sap/m/Bar","sap/m/SearchField","sap/m/Toolbar","sap/m/ToolbarSpacer","sap/m/Title","sap/m/VBox","sap/m/HBox","sap/m/CheckBox","sap/m/Link","sap/m/List","sap/m/CustomListItem","sap/m/TextArea","sap/m/Text","sap/m/StandardListItem","sap/m/Popover","sap/ui/layout/form/SimpleForm","sap/ui/layout/GridData","sap/ui/core/mvc/Controller","sap/suite/ui/generic/template/AnalyticalListPage/util/FilterUtil","sap/m/SegmentedButton","sap/m/SegmentedButtonItem","sap/suite/ui/generic/template/AnalyticalListPage/util/V4Terms",'sap/ui/model/Filter',"sap/suite/ui/generic/template/AnalyticalListPage/controller/DropDownController","sap/suite/ui/generic/template/AnalyticalListPage/controller/DatePickerController","sap/m/OverflowToolbarButton","sap/ui/model/json/JSONModel","sap/m/OverflowToolbar","sap/m/OverflowToolbarLayoutData","sap/ui/core/CustomData","sap/ui/Device","sap/m/library","sap/ui/core/library","sap/ui/model/FilterOperator","sap/m/DatePicker","sap/suite/ui/generic/template/genericUtilities/FeLogger","sap/ui/core/InvisibleText","sap/base/util/deepEqual","sap/suite/ui/generic/template/js/StableIdHelper","sap/base/util/extend","sap/base/util/deepExtend"],function(B,L,D,a,S,T,b,c,V,H,C,d,f,g,h,j,k,P,l,G,m,F,n,o,p,q,r,s,O,J,t,u,v,w,x,y,z,A,E,I,K,M,N,Q){"use strict";var R=x.ListSeparators;var U=new E("AnalyticalListPage.controller.VisualFilterDialogController");var W=U.getLogger();var X=U.Level;var Y="_BASIC";var Z="100%";var $=0.33;var _=0.5;var a1=m.extend("sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController",{init:function(e){W.setLevel(X.WARNING,"VisualFilter");this.oState=e;this.oRb=e.alr_visualFilterContainer.getModel('i18n').getResourceBundle();this.bIsTimeBasedLine;this.bSortOrder;},_createForm:function(){this._searchTriggered=false;this._restoreTriggered=false;var e=new J();var i=this.oState.alr_visualFilterBar.getModel('_visualFilterConfigModel');this._initialFilters=this.oState.alr_visualFilterBar.getModel("_filter").getJSON();this.oConfig=JSON.parse(i.getJSON());e.setData(this.oConfig);this.filterCompList=[];this.filterChartList=[];this._buildFiltersFromConfig(true);var b1=new J();b1.setData(JSON.parse(this._initialFilters));this.oVerticalBox=new V();this.oVerticalBox.setModel(this.oState.oController.getView().getModel("_templPriv"),"_templPriv");this.oVerticalBox.setModel(this.oState.oController.getView().getModel());this.oVerticalBox.setModel(this.oState.oController.getView().getModel("i18n"),"i18n");this.oVerticalBox.setModel(b1,"_dialogFilter");this.oVerticalBox.setModel(e,'_visualFilterDialogModel');this._addGroupsAndFilters();this.oVerticalBox.addEventDelegate({onAfterRendering:function(c1){if(c1.srcControl&&c1.srcControl.getParent()){c1.srcControl.getParent().isPopupAdaptationAllowed=function(){return true;};}}});return this.oVerticalBox;},_toggle:function(e){var i=this.oState.oController.getView().getModel("_templPriv");if(e&&(e==="visual")){i.setProperty("/alp/filterDialogMode","visual");if(this.oState.alr_visualFilterBar.getLazyLoadVisualFilter()){this.oState.alr_visualFilterBar.updateVisualFilterBindings.apply(this,[true,true]);}}else{i.setProperty("/alp/filterDialogMode","group");if(!this.oState.alr_visualFilterBar.getAssociateValueListsCalled()){this.oState.alr_visualFilterBar.setAssociateValueListsCalled(true);this.oState.oSmartFilterbar.associateValueLists();}}},_searchDialog:function(){this._searchTriggered=true;if(this.bSearchPendingAfterDialogFilterChange){this.bSearchPendingAfterDialogFilterChange=false;this.oState.oSmartFilterbar.search();}},_updateFilterBarFromDialog:function(){var e=this.oState.alr_visualFilterBar.getModel('_filter'),i=this.oVerticalBox.getModel('_dialogFilter'),b1=K(e.getJSON(),i.getJSON());if(!b1){e.setData(JSON.parse(i.getJSON()));}var c1=this.oState.alr_visualFilterBar.getModel('_visualFilterConfigModel'),d1=this._getDialogConfigModel(),e1=K(c1.getJSON(),d1.getJSON());if(!e1){c1.setData(JSON.parse(d1.getJSON()));this.oState.alr_visualFilterBar.updateVisualFilterBindings(true);}if(this.oState.alr_visualFilterBar.getLazyLoadVisualFilter()){this.oState.alr_visualFilterBar.updateVisualFilterBindings(true);}},_closeDialog:function(e){if(e.getParameter("context")==="SEARCH"){this._updateFilterBarFromDialog();if(this._restoreTriggered){this._restoreTriggered=false;this.oState.filterBarController._afterSFBVariantLoad();}}this.oVerticalBox.destroyItems();},_restoreDialog:function(){var e=this.oState.alr_visualFilterBar._oCurrentVariant.config;if(e){this.oConfig.filterCompList.forEach(function(i){if(e[i.component.properties.parentProperty]){Q(i,e[i.component.properties.parentProperty]);}});}else{this.oConfig=this.oState.alr_visualFilterBar._getStandardVariantConfig();}this._getDialogConfigModel().setData(this.oConfig);this._reloadForm();this._restoreTriggered=true;this.bSearchPendingAfterDialogFilterChange=false;},_cancelDialog:function(){if(this.bSearchPendingAfterDialogFilterChange){this.bSearchPendingAfterDialogFilterChange=false;}},_buildFiltersFromConfig:function(e){var i;this.filterCompList=[];this.filterChartList=[];for(i=0;i<this.oConfig.filterCompList.length;i++){var b1=this.oConfig.filterCompList[i].component.properties.sortOrder;if(b1.constructor===Object&&b1.value){this.oConfig.filterCompList[i].component.properties.sortOrder=b1.value;}this.filterCompList.push({obj:{shownInFilterBar:this.oConfig.filterCompList[i].shownInFilterBar,shownInFilterDialog:this.oConfig.filterCompList[i].shownInFilterDialog,cellHeight:this.oConfig.filterCompList[i].cellHeight,component:{type:this.oConfig.filterCompList[i].component.type,cellHeight:this.oConfig.filterCompList[i].component.cellHeight},group:{label:this.oConfig.filterCompList[i].group.label,name:this.oConfig.filterCompList[i].group.name}},searchVisible:e===true||this.oConfig.filterCompList[i].searchVisible===undefined||this.oConfig.filterCompList[i].searchVisible});}},_rebuildConfig:function(){var i;var e={filterCompList:[]};for(i=0;i<this.filterCompList.length;i++){e.filterCompList.push({shownInFilterBar:this.filterCompList[i].obj.shownInFilterBar&&this.filterCompList[i].obj.shownInFilterDialog,shownInFilterDialog:this.filterCompList[i].obj.shownInFilterDialog,cellHeight:this.filterCompList[i].obj.cellHeight,group:{label:this.filterCompList[i].obj.group.label,name:this.filterCompList[i].obj.group.name},component:{type:this.filterCompList[i].obj.component.type,cellHeight:this.filterCompList[i].obj.component.cellHeight,properties:{scaleFactor:this.filterChartList[i].getScaleFactor(),numberOfFractionalDigits:this.filterChartList[i].getNumberOfFractionalDigits(),sortOrder:this.filterChartList[i].getSortOrder(),filterRestriction:this.oConfig.filterCompList[i].component.properties.filterRestriction,entitySet:this.filterChartList[i].getEntitySet(),isDropDown:this.oConfig.filterCompList[i].component.properties.isDropDown,width:this.oConfig.filterCompList[i].component.properties.width,height:this.oConfig.filterCompList[i].component.properties.height,dimensionField:this.filterChartList[i].getDimensionField(),dimensionFieldDisplay:this.filterChartList[i].getDimensionFieldDisplay(),dimensionFieldIsDateTime:this.filterChartList[i].getDimensionFieldIsDateTime(),dimensionFilter:this.filterChartList[i].getDimensionFilter(),unitField:this.filterChartList[i].getUnitField(),isCurrency:this.filterChartList[i].getIsCurrency(),isMandatory:this.oConfig.filterCompList[i].component.properties.isMandatory,measureField:this.filterChartList[i].getMeasureField(),outParameter:this.oConfig.filterCompList[i].component.properties.outParameter,inParameters:this.oConfig.filterCompList[i].component.properties.inParameters,parentProperty:this.oConfig.filterCompList[i].component.properties.parentProperty,chartQualifier:this.oConfig.filterCompList[i].component.properties.chartQualifier}}});}return e;},_reloadForm:function(){this.oVerticalBox.destroyItems();this._buildFiltersFromConfig();this._addGroupsAndFilters();},_addGroupsAndFilters:function(){var i;var e;var b1;var c1=[];var d1=0;for(i=0;i<this.filterCompList.length;i++){if(!Array.isArray(this.filterCompList[i])){if(this.filterCompList[i].searchVisible===false){continue;}if(!(c1.indexOf(this.filterCompList[i].obj.group.name)>-1)){if(b1){this.oVerticalBox.addItem(b1);}e=this.filterCompList[i].obj.group.name;c1.push(e);b1=new f({showSeparators:"None",showNoData:false});b1.setWidth("100%");b1.setLayoutData(new G({span:"L12 M12 S12"}));b1.addStyleClass("sapUiSmallMarginTop");d1++;this._addGroupToolbar(b1,this.filterCompList[i].obj.group.label,this.filterCompList[i].obj.group.name);}if(this.filterCompList[i].obj.shownInFilterDialog){this.filterCompList[i].toolbar=this._addChartCustomToolbar(this.oConfig.filterCompList[i],i);var e1=this,f1=new V(),g1=this.oConfig.filterCompList[i].component.properties.parentProperty;f1.setModel(this._getDialogConfigModel(),'_visualFilterDialogModel');f1.bindAggregation('items',{path:"_visualFilterDialogModel>/filterCompList",factory:function(h1,n1){var o1=n1.getProperty('component/type'),p1=n1.getProperty('component/properties'),q1=n1.getPath().split("/")[2];this.filterChartList[q1]=this._addChart(o1,p1,q1);return this.filterChartList[q1];}.bind(this),filters:new q("component/properties/parentProperty",z.EQ,g1)});g1=F.getParameter(g1);var h1="visualFilterDialogInvisibleText"+g1;var i1=new I({id:h1});var j1=this.filterChartList[i].getParentProperty().replace(/[^\w]/gi,'')+"checkBox";var k1=[new V({items:[e1.filterCompList[i].toolbar,f1,i1]}).setWidth("100%").addStyleClass("sapUiSmallMarginBegin")];if(w.system.desktop){k1.splice(0,0,new V({items:[new L({text:"{i18n>SHOW_ON_FILTER_BAR}",labelFor:j1,wrapping:true}).addStyleClass("sapUiTinyMarginTop"),new C({id:j1,text:"",selected:e1.oConfig.filterCompList[i].shownInFilterBar}).data("idx",i).attachSelect(null,e1._onCheckBoxSelect,e1)]}).setAlignItems("Center"));k1[0].setWidth("20%");k1[1].setWidth("80%");}var l1=new H({items:k1}).addStyleClass("sapUiSmallMarginTop").setWidth("100%");F._updateVisualFilterAria(l1.getItems()[1]);var m1=new g({id:M.getStableId({type:"VisualFilterDialog",subType:"FilterItemContainer",sProperty:g1}),content:l1});m1.attachBrowserEvent("keyup",F.onKeyUpVisualFilter.bind(F));m1.attachBrowserEvent("keydown",F.onKeyDownVisualFilter.bind(F,this.oState.oSmartFilterbar));b1.addItem(m1);}}if(b1){this.oVerticalBox.addItem(b1);}}if(d1==1&&e===Y){F.executeFunction(b1,"mAggregations.headerToolbar.setVisible",[false]);}},_onCheckBoxSelect:function(e){var i=e.getSource().data("idx");this.selectCheckBox(i,e.getSource().getSelected());},_addGroupToolbar:function(e,i,b1){var c1=new c({text:i}).addStyleClass("sapSmartTemplatesAnalyticalListPageVFDialogGroupTitle");var d1=new T({content:[c1,new b()]});if(b1!=Y){d1.addContent(this._createMoreFiltersLink(b1,c1));}e.setHeaderToolbar(d1);},selectCheckBox:function(i,e){var b1=this._getDialogConfigModel();var c1=Q({},b1);c1.setProperty('/filterCompList/'+i+'/shownInFilterBar',e);b1.setData(c1.getData());this.oConfig=b1.getData();this.oState.oSmartFilterbar._oVariantManagement.currentVariantSetModified(true);},_formatTitle:function(e,i){var rb=this.oVerticalBox.getModel("i18n").getResourceBundle();var b1=e.titleMD;var c1=e.titleUnitCurr;if(i==="tooltipMD"){return c1==""?b1:rb.getText("VIS_FILTER_TITLE_MD_WITH_UNIT_CURR",[b1,c1]);}else if(i==="titleUnitCurr"){return c1.length>0?"| "+c1:"";}},_addChartCustomToolbar:function(e,i){var b1=this;var c1=this.oState.oController.getView().getModel("@i18n");var d1=e.component.properties.parentProperty,e1=e.component.properties,f1=F.getPropertyNameDisplay(this.oState.alr_visualFilterBar.getModel(),e.component.properties.entitySet,e.component.properties.dimensionField,c1),g1=d1.replace(/[^\w]/gi,''),h1=this.oState.alr_visualFilterBar._oMetadataAnalyser.getEntityTypeNameFromEntitySetName(e.component.properties.entitySet),i1=e.component.properties.sortOrder[0].Descending.Boolean,j1=F.readProperty(e,"component.type")==="Line"&&F.readProperty(e,"component.properties.dimensionFieldIsDateTime"),k1=this.oState.alr_visualFilterBar._resolveChartType(e.component.type),l1=this._getChartTypeIconLink(k1),rb=this.oVerticalBox.getModel("i18n").getResourceBundle(),n1=b1._getChartTitle(e,i),o1=new c({text:n1.titleMD,tooltip:this._formatTitle(n1,"tooltipMD"),titleStyle:y.TitleLevel.H6}),p1=new c({text:this._formatTitle(n1,"titleUnitCurr"),tooltip:"",titleStyle:y.TitleLevel.H6});if(this.oConfig.filterCompList[i].component.properties.isMandatory){o1.addStyleClass("sapSmartTemplatesAnalyticalListPageRequired");}var q1=function(){var m1=this.oConfig.filterCompList[i].component.properties.entitySet,E1=this._getVisibleMeasureList(m1),F1=Object.keys(E1).length>1;if(!F1){W.warning("Change measure button has been disabled in the dialog as only one visible measure exists in the collection "+m1);}return F1;};var r1=this.oState.oSmartFilterbar.determineFilterItemByName(e.component.properties.parentProperty).getControl();this.oState.oSmartFilterbar.ensureLoadedValueHelp(e.component.properties.parentProperty);var s1=r1.getShowValueHelp&&r1.getShowValueHelp()&&!e1.dimensionFieldIsDateTimeOffset,t1=r1 instanceof A,u1=r1.getMetadata&&r1.getMetadata().getName()==="sap.m.DateTimePicker",v1=(t1&&!u1)?"sap-icon://appointment-2":"",w1=(e1.isDropDown)?"sap-icon://slim-arrow-down":"",x1=s1?"sap-icon://value-help":v1||w1,y1=this.oState.alr_visualFilterBar.getView().sId,z1;if(e1.isParameter){z1=F.getParameter(d1);}else{z1=e1.parentProperty;}var A1=y1+"--"+M.getStableId({type:"VisualFilterDialog",subType:"ValueHelpButton",sProperty:z1}),B1,C1=[new B({type:"Transparent",icon:"sap-icon://line-chart-time-axis",visible:false,press:function(m1){b1._showLineChartTimeAxisPopup(m1);}}).data("idx",i),new B({id:A1,type:"Transparent",icon:(s1||e1.isDropDown||t1)?x1:"",customData:[new v({key:'isF4Enabled',value:(s1||e1.isDropDown||t1)?true:false})],visible:{path:"_dialogFilter>/"+d1,formatter:function(m1){if(s1||e1.isDropDown||(t1&&!u1)){return true;}else{if(!m1){return false;}if(typeof m1==="object"){if(m1 instanceof Date){return true;}return(m1.value||(m1.items&&m1.items.length)||(m1.ranges&&m1.ranges.length))?true:false;}return true;}}},text:{path:"_dialogFilter>/"+d1,formatter:function(m1){var E1=b1.filterChartList[i];var F1=E1.getFilterRestriction();B1=0;if(m1){if(F1==='single'){B1=1;}else{if(typeof m1==="object"){if(m1.value){B1++;}if(m1.items){B1+=m1.items.length;}if(m1.ranges){B1+=m1.ranges.length;}}else{B1++;}}}return B1?"("+B1+")":"";}},enabled:{path:'_visualFilterDialogModel>/filterCompList/'+i+'/showChartOverlay',formatter:function(m1){return!m1;}},press:function(m1){if(s1){if(!b1.oState.alr_visualFilterBar.getAssociateValueListsCalled()){b1.oState.alr_visualFilterBar.setAssociateValueListsCalled(true);b1.oState.oSmartFilterbar.attachEventOnce("valueListAnnotationLoaded",function(){r1.fireValueHelpRequest();});b1.oState.oSmartFilterbar.associateValueLists();}else{r1.fireValueHelpRequest();}}else if(e1.isDropDown){var E1=b1.oState.alr_visualFilterBar._isDimensionFieldFilterable(this.getModel(),e1.entitySet,e1.dimensionField),F1=this.getModel("visualFilter")||this.getModel();r.createDropdown(m1.getSource(),b1.filterChartList[m1.getSource().data("idx")],F1,f1,e1,E1);}else if(t1&&!u1){s._createDatePicker(m1.getSource(),b1.filterChartList[m1.getSource().data("idx")]);}else{sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController.launchAllFiltersPopup(m1.getSource(),b1.filterChartList[m1.getSource().data("idx")],m1.getSource().getModel('i18n'));}},tooltip:{path:"_dialogFilter>/"+d1,formatter:function(){return F.getTooltipForValueHelp(s1,f1,rb,B1,t1);}},layoutData:new u({priority:x.OverflowToolbarPriority.NeverOverflow}),ariaHasPopup:y.aria.HasPopup.Dialog}).data("idx",i),new O({id:y1+"--template::VisualFilterDialog::SortOrderChangeButton::"+h1+"::"+g1,type:"Transparent",icon:(i1?"sap-icon://sort-descending":"sap-icon://sort-ascending"),visible:!j1,tooltip:"{i18n>VISUAL_FILTER_SORT_ORDER}",text:"{i18n>VISUAL_FILTER_SORT_ORDER}",press:function(m1){b1._showChartSortPopup(m1);},layoutData:new u({closeOverflowOnInteraction:false,priority:(!w.system.desktop)?x.OverflowToolbarPriority.AlwaysOverflow:x.OverflowToolbarPriority.High}),ariaHasPopup:y.aria.HasPopup.Dialog}).data("idx",i),new O({id:y1+"--template::VisualFilterDialog::ChartTypeChangeButton::"+h1+"::"+g1,type:"Transparent",icon:l1,tooltip:"{i18n>VISUAL_FILTER_CHART_TYPE}",text:"{i18n>VISUAL_FILTER_CHART_TYPE}",press:function(m1){b1._showChartTypesPopup(m1);},layoutData:new u({closeOverflowOnInteraction:false,priority:(!w.system.desktop)?x.OverflowToolbarPriority.AlwaysOverflow:x.OverflowToolbarPriority.High}),ariaHasPopup:y.aria.HasPopup.Dialog}).data("idx",i),new O({id:y1+"--template::VisualFilterDialog::MeasureChangeButton::"+h1+"::"+g1,type:"Transparent",icon:"sap-icon://measure",tooltip:"{i18n>VISUAL_FILTER_MEASURE}",text:"{i18n>VISUAL_FILTER_MEASURE}",enabled:q1.apply(b1),press:function(m1){b1._showChartMeasuresPopup(m1);},layoutData:new u({closeOverflowOnInteraction:false,priority:(!w.system.desktop)?x.OverflowToolbarPriority.AlwaysOverflow:x.OverflowToolbarPriority.High}),ariaHasPopup:y.aria.HasPopup.Dialog}).data("idx",i)];if((w.system.tablet||w.system.phone)&&!w.system.desktop){C1.splice(2,0,new C({tooltip:"{i18n>SHOW_ON_FILTER_BAR}",text:"{i18n>SHOW_ON_FILTER_BAR}",selected:b1.oConfig.filterCompList[i].shownInFilterBar,layoutData:new u({closeOverflowOnInteraction:false,priority:x.OverflowToolbarPriority.AlwaysOverflow})}).data("idx",i).attachSelect(null,b1._onCheckBoxSelect,b1));C1[2].addStyleClass("sapSmartTemplatesAnalyticalListPageVFDShowInFilterBarCozy");}var D1=new t({design:x.ToolbarDesign.Transparent,content:[o1,p1,new b(),C1]}).addStyleClass("sapSmartTemplatesAnalyticalListPageFilterDialogTitleToolbar");D1.getContent()[0].addStyleClass("sapUiTinyMarginTop");D1.getContent()[0].addStyleClass("sapSmartTemplatesAnalyticalListPageVFDialogChartTitle");D1.getContent()[1].addStyleClass("sapUiTinyMarginTop");D1.setWidth("100%");return D1;},_addChart:function(b1,c1,d1){var e1;var f1=this;var g1=c1.selectFilters&&c1.selectFilters.SelectOptions;var h1={selectFilters:c1.selectFilters,scaleFactor:c1.scaleFactor,numberOfFractionalDigits:c1.numberOfFractionalDigits,sortOrder:c1.sortOrder,filterRestriction:c1.filterRestriction,isDropDown:c1.isDropDown,width:Z,height:c1.height,labelWidthPercent:$,entitySet:c1.entitySet,dimensionField:c1.dimensionField,dimensionFieldDisplay:c1.dimensionFieldDisplay,dimensionFieldIsDateTime:c1.dimensionFieldIsDateTime,dimensionFieldIsDateTimeOffset:c1.dimensionFieldIsDateTimeOffset,unitField:c1.unitField,isCurrency:c1.isCurrency,isMandatory:c1.isMandatory,measureField:c1.measureField,dimensionFilter:c1.dimensionFilter,outParameter:c1.outParameter,inParameters:c1.inParameters,parentProperty:c1.parentProperty,textArrangement:c1.textArrangement,chartQualifier:c1.chartQualifier,lazyLoadVisualFilter:this.oState.alr_visualFilterBar.getLazyLoadVisualFilter()};var i1="/filterCompList/"+d1;if(b1==="Donut"){h1.labelWidthPercent=_;}b1=this.oState.alr_visualFilterBar._resolveChartType(b1);var e1=this.oState.alr_visualFilterBar._createFilterItemOfType(b1,h1,false);e1.data("isDialogFilterItem","true");e1.setModel(this.oVerticalBox.getModel('_dialogFilter'),'_dialogFilter');e1.setModel(this._getDialogConfigModel(),'_visualFilterDialogModel');e1.data("idx",d1);e1.addCustomData(new v({key:'sPath',value:i1}));if(h1.dimensionFieldIsDateTime){e1.addCustomData(new v({key:'stringdate',value:c1.stringdate}));}e1.bindProperty('visible',{path:'_visualFilterDialogModel>/filterCompList/'+d1+'/showChartOverlay',formatter:function(e){return!e;}});e1.bindProperty('dimensionFilter',{path:'_dialogFilter>/'+e1.getParentProperty()});var j1=e1.getInParameters(),k1=[];if(j1&&j1.length>0){j1.forEach(function(e){k1.push({path:"_dialogFilter>/"+e.localDataProperty});});}if(f1.oState.alr_visualFilterBar.getEntitySet()===e1.getEntitySet()){var l1=f1.oState.alr_visualFilterBar._smartFilterContext.determineMandatoryFilterItems();if(l1&&l1.length>0){l1.forEach(function(e){if(!e.data("isCustomField")){k1.push({path:'_dialogFilter>/'+e.getName()});}});}}if(k1&&k1.length>0){e1.bindProperty('dimensionFilterExternal',{parts:k1,formatter:function(){var j1=this.getInParameters()||[],o1=this.getParentProperty();var p1,q1;if(f1.oState.alr_visualFilterBar.getEntitySet()===this.getEntitySet()){var l1=f1.oState.alr_visualFilterBar._smartFilterContext.determineMandatoryFilterItems();l1.forEach(function(F1){var G1=F1.getName();var H1=j1&&j1.some(function(e){return e.localDataProperty===G1;});if(G1.indexOf("$Parameter")===-1&&!H1){j1.push({localDataProperty:G1,valueListProperty:G1});}});}if(!(f1.oState.alr_visualFilterBar.getEntitySet()===this.getEntitySet()&&f1.oState.alr_visualFilterBar._smartFilterContext.getAnalyticBindingPath()!=="")&&(f1.oState.alr_visualFilterBar._smartFilterContext.getAnalyticBindingPath()===""||f1.oState.alr_visualFilterBar._smartFilterContext.getAnalyticBindingPath().indexOf("P_DisplayCurrency")!=-1)){var r1=this.getMeasureField();var s1=f1.oState.alr_visualFilterBar.getModel();var t1=s1.getMetaModel();var u1=t1.getODataEntityType(f1.oState.alr_visualFilterBar._oMetadataAnalyser.getEntityTypeNameFromEntitySetName(this.getEntitySet()));var v1=t1.getODataEntitySet(this.getEntitySet());var w1=t1.getODataProperty(u1,r1);var x1=f1.oState.alr_visualFilterBar.getProperty("displayCurrency");var y1=w1&&w1[p.ISOCurrency];if(x1&&y1){var z1=y1.Path;for(var A1=(j1.length-1);A1>-1;A1--){var B1=j1[A1].valueListProperty;var C1=j1[A1].localDataProperty;if(B1===z1){var D1=f1.oState.alr_visualFilterBar._smartFilterContext.getFilterData();if(!D1[C1]){q1=t1.getODataProperty(u1,z1);var E1=q1&&F.isPropertyNonFilterable(v1,q1.name);if(!E1){p1=new q({aFilters:[new q({path:z1,operator:"EQ",value1:x1,value2:undefined})],and:false});}}break;}}}}if(this._chart instanceof sap.suite.ui.microchart.InteractiveDonutChart){this._inParameterFilterList=new q({aFilters:[],bAnd:true});}return f1.oState.alr_visualFilterBar._getFiltersForFilterItem(j1,o1,p1,z1,g1,this._inParameterFilterList);}});}else if(g1&&g1.length>0){var m1=new q({aFilters:[],bAnd:true});for(var i in g1){var n1=g1[i];m1=this.oState.alr_visualFilterBar.fnAddSelectOptionsToFilters(n1,m1);}e1.setProperty('dimensionFilterExternal',m1);}e1.attachBeforeRebindVisualFilter(function(e){var o1=e.getParameters();var p1=o1.sEntityType;var q1=o1.sDimension;var r1=o1.sMeasure;var s1=o1.oContext;var t1=f1.oState.oController;t1.onBeforeRebindVisualFilterExtension(p1,q1,r1,s1);});e1._updateBinding();e1._bAllowBindingUpdateOnPropertyChange=true;e1.attachFilterChange(function(e){f1.oState.alr_visualFilterBar.fireFilterChange();});e1.attachTitleChange(function(e){var d1=e.getSource().data("idx");if(f1.filterCompList[d1].toolbar.getContent().length>0){if(h1.isMandatory){f1.filterCompList[d1].toolbar.getContent()[0].addStyleClass("sapSmartTemplatesAnalyticalListPageRequired");}var o1=f1.filterCompList[d1].toolbar.getContent()[0];var p1=f1.filterCompList[d1].toolbar.getContent()[1];var q1=f1._getChartTitle(f1.filterCompList[d1].obj,d1);o1.setText(q1.titleMD);var r1=f1._formatTitle(q1,"tooltipMD");o1.setTooltip(r1);p1.setText(f1._formatTitle(q1,"titleUnitCurr"));var s1=q1.titleUnitCurr.split(" ");if(q1.titleUnitCurr==""){p1.setVisible(false);}else{p1.setVisible(true);var t1=s1.length>1?"4.15rem":"2.4rem";p1.setWidth(t1);}}if(f1.filterChartList[d1].data("needsToUpdateAria")==="true"){F._updateVisualFilterAria(f1.filterChartList[d1].getParent().getParent());}});return e1;},_createMoreFiltersLink:function(e,b1){var c1=this;var d1=0;var i;var e1=new d();for(i=0;i<this.filterCompList.length;i++){if(this.filterCompList[i].searchVisible&&this.filterCompList[i].obj.group.name===e&&!this.filterCompList[i].obj.shownInFilterDialog){d1++;}}if(d1>0){e1.setText(this.oRb.getText("FILTER_BAR_SHOW_MORE_FILTERS",[d1]));}else{e1.setText(this.oRb.getText("FILTER_BAR_SHOW_CHANGE_FILTERS"));}e1.attachPress(function(f1){c1._createAddRemoveFiltersDialog(e,e1);});if(b1){e1.addAriaLabelledBy(b1);}return e1;},_showChartMeasuresPopup:function(e){var i=this;var b1=e.getSource().data("idx");var c1=this.filterChartList[b1].getProperty("entitySet");var d1=sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController._createPopoverDialog(e.getSource().getModel('i18n'),"VISUAL_FILTER_MEASURES");var e1=e.getSource().getModel("@i18n");if(e1){d1.setModel(e1,"@i18n");}var f1=new f({mode:x.ListMode.SingleSelectLeft,includeItemInSelection:true});f1.data("idx",b1);d1.addContent(f1);var g1=this._getVisibleMeasureList(c1);f1.addStyleClass("sapUiSizeCompact");if(g1){for(var h1 in g1){var i1=new k({title:g1[h1].label?g1[h1].label:g1[h1].name,tooltip:(g1[h1].fieldInfo&&g1[h1].fieldInfo.quickInfo)||g1[h1].label||g1[h1].name}).data("measureName",g1[h1].name);f1.addItem(i1);if(this.filterChartList[b1].getMeasureField()===g1[h1].name){f1.setSelectedItem(i1);}}}f1.attachSelectionChange(function(e){var b1=e.getSource().data("idx"),j1=e.getSource().getSelectedItem().data("measureName");i.filterChartList[b1].setProperty("unitField",g1[j1].fieldInfo.unit);var k1=i.filterCompList[b1].toolbar.getContent()[0];var l1=i.filterCompList[b1].toolbar.getContent()[1];var m1=i._getChartTitle(i.filterCompList[b1].obj,b1);k1.setText(m1.titleMD);l1.setText(i._formatTitle(m1,"titleUnitCurr"));i.oConfig.filterCompList[b1].component.properties.measureField=j1;if(!i.filterChartList[b1]._chart.getPoints){var n1=Q([],i.filterChartList[b1].getSortOrder());n1[0].Field.String=j1;i.filterChartList[b1].setSortOrder(n1);i._updateVisualFilterConfigModel(b1,'/component/properties/sortOrder',n1);}var o1={bUpdateBinding:true,value:j1};i.filterChartList[b1].setMeasureField(o1);i._updateVisualFilterConfigModel(b1,'/component/properties/measureField',o1);i._updateVisualFilterConfigModel(b1,'/component/properties/measureField',j1);i._updateVisualFilterConfigModel(b1,'/component/properties/unitField',g1[j1].fieldInfo.unit);if(d1){d1.close();}});d1.attachAfterClose(function(){d1.destroy();d1=null;});d1.openBy(e.getSource());},_showChartTypesPopup:function(e){var b1=this,c1=e.getSource(),d1=c1.getModel('i18n'),e1=sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController._createPopoverDialog(d1,"VISUAL_FILTER_CHART_TYPES"),f1=this.oState.alr_visualFilterBar._getSupportedFilterItemList(),g1=[];for(var i=0;i<f1.length;i++){var h1=f1[i];var i1=new k({title:"{i18n>"+h1.textKey+"}",icon:h1.iconLink,selected:c1.getIcon()===h1.iconLink}).data("type",h1.type);g1.push(i1);}var j1=new f({mode:x.ListMode.SingleSelectMaster,items:g1});j1.data("button",c1);j1.addStyleClass("sapUiSizeCompact");j1.setModel(d1,"i18n");e1.addContent(j1);j1.attachSelectionChange(function(e){var k1=e.getSource().data("button").data("idx"),l1=e.getSource().getSelectedItem().data("type"),m1=b1.filterChartList[k1],n1=m1.getDimensionField(),o1=m1.getMeasureField(),p1=m1.getDimensionFieldIsDateTime(),q1=F.readProperty(b1.oConfig,"filterCompList."+k1+".component.properties.sortOrder.0.Field.String"),r1=b1._getDialogConfigModel(),s1=r1.getProperty('/filterCompList/'),t1=Q({},s1[k1]),u1=F.readProperty(t1,"component.properties.sortOrder.0.Field.String");e.getSource().data("button").setIcon(b1._getChartTypeIconLink(l1));if(q1&&u1){if(l1==="Line"){b1.oConfig.filterCompList[k1].component.properties.sortOrder[0].Field.String=n1;t1.component.properties.sortOrder[0].Field.String=n1;if(p1){b1.bSortOrder=b1.oConfig.filterCompList[k1].component.properties.sortOrder[0].Descending.Boolean;b1.oConfig.filterCompList[k1].component.properties.sortOrder[0].Descending.Boolean=true;t1.component.properties.sortOrder[0].Descending.Boolean=true;b1.bIsTimeBasedLine=true;}}else{b1.oConfig.filterCompList[k1].component.properties.sortOrder[0].Field.String=o1;t1.component.properties.sortOrder[0].Field.String=o1;if(b1.bIsTimeBasedLine){b1.oConfig.filterCompList[k1].component.properties.sortOrder[0].Descending.Boolean=b1.bSortOrder;t1.component.properties.sortOrder[0].Descending.Boolean=b1.bSortOrder;b1.bIsTimeBasedLine=false;}}}t1.component.type=l1;r1.setProperty('/filterCompList/'+k1,t1);b1.oState.oSmartFilterbar._oVariantManagement.currentVariantSetModified(true);b1.oState.alr_visualFilterBar.updateVisualFilterBindings.apply(b1,[true,true]);if(e1){e1.close();}});e1.attachAfterClose(function(){e1.destroy();e1=null;});e1.openBy(e.getSource());},_showLineChartTimeAxisPopup:function(e){var i=e.getSource().data("idx");var b1=e.getSource();var c1=sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController._createPopoverDialog(e.getSource().getModel('i18n'),"VISUAL_FILTER_LINE_CHART_TIME_LINE");var d1=new f({mode:x.ListMode.SingleSelectLeft,items:[new k({title:"{i18n>VISUAL_FILTER_LINE_CHART_TIME_LINE_DAYS}"}).data("idx",i),new k({title:"{i18n>VISUAL_FILTER_LINE_CHART_TIME_LINE_MONTH}"}).data("idx",i),new k({title:"{i18n>VISUAL_FILTER_LINE_CHART_TIME_LINE_QUARTERS}"}).data("idx",i),new k({title:"{i18n>VISUAL_FILTER_LINE_CHART_TIME_LINE_YEARS}"}).data("idx",i)]});d1.data("button",b1);d1.addStyleClass("sapUiSizeCompact");c1.addContent(d1);d1.attachSelectionChange(function(e){c1.close();});c1.attachAfterClose(function(){c1.destroy();c1=null;});c1.openBy(e.getSource());},_showChartSortPopup:function(e){var i=this;var b1=e.getSource().data("idx");var c1=e.getSource();var d1=e.getSource().getModel('i18n');var e1=sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController._createPopoverDialog(d1,"VISUAL_FILTER_SORTING");var f1=new f({mode:x.ListMode.SingleSelectLeft,includeItemInSelection:true,items:[new k({title:d1.getResourceBundle().getText("VISUAL_FILTER_SORTING_ASCENDING")}).data("idx",b1),new k({title:d1.getResourceBundle().getText("VISUAL_FILTER_SORTING_DESCENDING")}).data("idx",b1)]});f1.data("button",c1);f1.addStyleClass("sapUiSizeCompact");if(this.filterChartList[b1].getSortOrder()[0].Descending.Boolean){f1.setSelectedItem(f1.getItems()[1],true);}else{f1.setSelectedItem(f1.getItems()[0],true);}e1.addContent(f1);f1.attachSelectionChange(function(e){var c1=e.getSource().data("button");var b1=c1.data("idx");var g1=Q([],i.filterChartList[b1].getSortOrder());g1[0].Descending.Boolean=e.getSource().getItems()[1].isSelected();if(g1[0].Descending.Boolean){c1.setIcon("sap-icon://sort-descending");}else{c1.setIcon("sap-icon://sort-ascending");}var h1={bUpdateBinding:true,value:g1};i.filterChartList[b1].setSortOrder(h1);i._updateVisualFilterConfigModel(b1,'/component/properties/sortOrder',h1);i._updateVisualFilterConfigModel(b1,'/component/properties/sortOrder',g1);if(e1){e1.close();}});e1.attachAfterClose(function(){e1.destroy();e1=null;});e1.openBy(e.getSource());},_createAddRemoveFiltersDialog:function(e,b1){var i;var c1=this;var d1=new D();d1.setTitle(this.oRb.getText("SELECT_FILTER_FIELDS"));d1.addStyleClass("sapUiPopupWithPadding");d1.addStyleClass("sapUiCompAddRemoveFilterDialog");d1.addStyleClass("sapUiSizeCompact");d1.setVerticalScrolling(true);var e1=new a();var f1=new S({placeholder:this.oRb.getText("FILTER_BAR_SEARCH")});this._oSearchField=f1;f1.attachLiveChange(function(k1){c1._onAddRemoveFiltersSearch(k1);});e1.addContentRight(f1);d1.setSubHeader(e1);this.addRemoveList=new f({mode:x.ListMode.MultiSelect});this.addRemoveList.setShowSeparators(R.None);d1.addContent(this.addRemoveList);for(i=0;i<this.filterCompList.length;i++){if(this.filterCompList[i].obj.group.name===e&&this.filterCompList[i].searchVisible){var g1=this._getChartTitle(this.filterCompList[i].obj,i,true);var h1=new k({title:g1.titleMD}).data("idx",i);this.addRemoveList.addItem(h1);if(this.filterCompList[i].obj.shownInFilterDialog){this.addRemoveList.setSelectedItem(h1,true);}}}this.addRemoveList.attachSelectionChange(function(k1){if(k1){var l1=k1.getParameters();if(l1){var h1=l1.listItem;var m1=h1.data("idx");if(h1){var n1={bVisible:l1.selected,propertyName:c1.oConfig.filterCompList[m1].component.properties.parentProperty};c1.oState.alr_visualFilterBar.fireFilterChange(n1);}}}});var i1=new B({text:this.oRb.getText("OK")});i1.attachPress(function(){var i;var k1=c1.addRemoveList.getItems();var l1=c1._getDialogConfigModel(),m1=Q({},l1);for(i=0;i<k1.length;i++){var n1=k1[i].data("idx");var o1=k1[i].isSelected();m1.setProperty('/filterCompList/'+n1+'/shownInFilterBar',o1);m1.setProperty('/filterCompList/'+n1+'/shownInFilterDialog',o1);}l1.setData(m1.getData());c1.oConfig=JSON.parse(l1.getJSON());c1.oState.alr_visualFilterBar.updateVisualFilterBindings.apply(this,[true,true]);c1.oState.oSmartFilterbar._oVariantManagement.currentVariantSetModified(true);c1._reloadForm();d1.close();});d1.addAggregation("buttons",i1);d1.setInitialFocus(this._oSearchField);d1.setContentHeight("23.25rem");var j1=new B({text:this.oRb.getText("FORM_PERS_DIALOG_CANCEL"),press:function(){d1.close();}});d1.addAggregation("buttons",j1);d1.attachAfterClose(function(){d1.destroy();d1=null;});d1.open();},_onAddRemoveFiltersSearch:function(e){var i;if(!e){return;}var b1=e.getParameters();if(!b1){return;}var c1=(b1.newValue?b1.newValue:"").toLowerCase();var d1=this.addRemoveList.getItems();for(i=0;i<d1.length;i++){var e1=(d1[i].getTitle()).toLowerCase();d1[i].setVisible(e1.indexOf(c1)>=0);}},_getChartTypeIconLink:function(i){var e=this.oState.alr_visualFilterBar._getSupportedFilterItemMap();var b1=e[i];return!b1?"":b1.iconLink;},_getChartTitle:function(e,i,b1){var c1=this.oState.oController.getView().getModel("@i18n");var d1="";if(this.filterChartList[i]){if(b1){e.component.properties=this.filterChartList[i].getP13NConfig();d1=this.oState.alr_visualFilterBar.getTitleByFilterItemConfig(e);}else{d1=this.filterChartList[i].getTitle(c1);}}else{e.component.properties=this.oConfig.filterCompList[i].component.properties;d1=this.oState.alr_visualFilterBar.getTitleByFilterItemConfig(e);}return d1;},_adjustToolbarIcons:function(i){if(this.filterCompList[i].obj.component.type==="Line"){this.filterCompList[i].toolbar.getContent()[1].getItems()[1].setVisible(true);this.filterCompList[i].toolbar.getContent()[1].getItems()[2].setVisible(false);}else{this.filterCompList[i].toolbar.getContent()[1].getItems()[1].setVisible(false);this.filterCompList[i].toolbar.getContent()[1].getItems()[2].setVisible(true);}},_updateVisualFilterConfigModel:function(i,e,b1,c1){var d1=this._getDialogConfigModel();d1.setProperty('/filterCompList/'+i+e,b1);if(c1){var e1=Q({},d1.getProperty('/filterCompList/'+i));d1.setProperty('/filterCompList/'+i,e1);this.oState.alr_visualFilterBar.updateVisualFilterBindings.apply(this,[true,true]);}this.oConfig=d1.getData();this.oState.oSmartFilterbar._oVariantManagement.currentVariantSetModified(true);},_getVisibleMeasureList:function(e){var i={},b1=this.oState.alr_visualFilterBar._getMeasureMap()[e];for(var c1 in b1){var d1=b1[c1];if(!(d1.fieldInfo[p.Hidden]&&d1.fieldInfo[p.Hidden].Bool==="true")){i[d1.name]=d1;}}return i;},_triggerSearchInFilterDialog:function(e){var b1=(e?e:"").toLowerCase();for(var i=0;i<this.oConfig.filterCompList.length;i++){var c1=this.oConfig.filterCompList[i].component.properties;var d1=this._getChartTitle(this.oConfig.filterCompList[i],i).titleMD.toLowerCase();var e1=this._getLabelForDimensionsAndMeasures(c1,c1.parentProperty),f1=this._getLabelForDimensionsAndMeasures(c1,c1.measureField),g1=(e1.indexOf(b1)>=0)||(f1.indexOf(b1)>=0)||(d1.indexOf(b1)>=0);this.oConfig.filterCompList[i].searchVisible=g1;}this._reloadForm();},_getDialogConfigModel:function(){return this.oVerticalBox.getModel('_visualFilterDialogModel');},_getLabelForDimensionsAndMeasures:function(e,i){var b1=this.oState.alr_visualFilterBar._oMetadataAnalyser,c1=this.oVerticalBox.getModel().getMetaModel(),d1=b1.getEntityTypeNameFromEntitySetName(e.entitySet),e1=c1.getODataEntityType(d1),f1=c1.getODataProperty(e1,i)&&c1.getODataProperty(e1,i)[p.Label];f1=f1&&f1.String?f1.String:"";return f1;}});sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController._createPopoverDialog=function(i,e){if(this._oPopoverDialog){this._oPopoverDialog.destroy();}this._oPopoverDialog=new P();this._oPopoverDialog.setTitle(i.getResourceBundle().getText(e));this._oPopoverDialog.setPlacement(sap.m.PlacementType.PreferredBottomOrFlip);this._oPopoverDialog.addStyleClass("sapUiPopupWithPadding");return this._oPopoverDialog;};sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController._createFilterItemSelectedList=function(e,b1){var c1=new f({mode:x.ListMode.Delete}),d1,e1=e.getFilterRestriction();c1.data("chart",e);if(e1==='multiple'){d1=Q({},e.getDimensionFilter());var f1=(d1&&d1.items)?d1.items:undefined,g1=(d1&&d1.ranges)?d1.ranges:undefined,h1=(d1&&d1.value)?d1.value:null;d1=Q({},e.getDimensionFilter());if(f1){for(var i=0;i<f1.length;i++){var i1=new k({title:f1[i].text?f1[i].text:f1[i].key});if(i1){i1.addCustomData(new v({key:'items',value:i}));}c1.addItem(i1);}}if(g1){for(var i=0;i<g1.length;i++){var i1=new k({title:g1[i].tokenText?g1[i].tokenText:F.createTitleFromCode(g1[i])});i1.addCustomData(new v({key:'ranges',value:i}));c1.addItem(i1);}}if(h1){var i1=new k({title:h1});i1.addCustomData(new v({key:'value'}));c1.addItem(i1);}}else{c1.addItem(new k({title:e.getDimensionFilter()}));}c1.attachDelete(function(j1){var k1=j1.getParameter("listItem"),l1=c1.data('chart'),m1;if(e1==='single'){m1=null;}else{m1=Q({},l1.getDimensionFilter());var n1=k1.getCustomData()[0],o1=n1.getKey(),p1=m1[o1];if(o1!=='value'){var q1=n1.getValue();p1.splice(q1,1);}else{m1.value=null;}}c1.removeItem(k1);l1.setDimensionFilter(m1);l1.fireFilterChange();b1.removeContent(c1);var r1=sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController._createFilterItemSelectedList(l1,b1);if(r1.getItems().length>0){b1.addContent(r1);b1.focus();}else{b1.close();}});return c1;};sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController.launchAllFiltersPopup=function(e,i,b1){var c1=sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController._createPopoverDialog(b1,"VISUAL_FILTER_ALL_SELECTED_FILTERS"),d1=sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController._createFilterItemSelectedList(i,c1);c1.addContent(d1);c1.addStyleClass("sapUiSizeCompact");c1.addStyleClass("sapSmartTemplatesAnalyticalListPageSelectedLinkDialog");var e1=new a();var f1=new B({text:b1.getResourceBundle().getText("CLEAR_FILTERS_ALL"),press:function(g1){var h1=d1.data('chart'),i1=h1.getFilterRestriction(),j1;if(i1==='multiple'){j1=Q({},h1.getDimensionFilter());j1.items=[];j1.ranges=[];j1.value=null;}else{j1=null;}c1.removeContent(d1);h1.setDimensionFilter(j1);h1.fireFilterChange();c1.close();}});e1.addContentRight(f1);c1.setFooter(e1);c1.attachAfterClose(function(){c1.destroy();c1=null;});c1.openBy(e);};return a1;});
