sap.ui.define(["sap/suite/ui/generic/template/genericUtilities/FeError"],function(F){"use strict";function g(p){if(p.sAnnotationId){return"headerEditable::"+p.sAnnotationId;}else{if(p.sRecordType!=="com.sap.vocabularies.UI.v1.ReferenceFacet"){throw new F();}return"headerEditable::"+p.sAnnotationPath;}}function a(p){if(p.sAnnotationId){return p.sAnnotationId;}if(p.sRecordType!=="com.sap.vocabularies.UI.v1.ReferenceFacet"){throw new F();}return p.sAnnotationPath;}function b(p){return p.bIsHeaderFacet?g(p):a(p);}return{parameters:["sQuickVariantKey","sFacet","sSmartTableId","sProperty","sTarget","sSemanticObject","sAction","sEntitySet","sFacetExtensionKey","sRecordType","sAnnotationPath","sAnnotationId","sReuseComponentName","sReuseComponentUsage","sReuseComponentId","bIsHeaderFacet","sIsPartOfPreview","sDataField"],types:{ListReportPage:{DynamicPage:{value:"page"},DynamicPageTitle:{},DynamicPageHeader:{}},ListReportTable:{SmartTable:{optionalParameters:["sQuickVariantKey"],value:function(p){return p.sQuickVariantKey?"listReport-"+p.sQuickVariantKey:"listReport";}},ResponsiveTable:{optionalParameters:["sQuickVariantKey"],value:function(p){return p.sQuickVariantKey?"responsiveTable-"+p.sQuickVariantKey:"responsiveTable";}},ColumnListItem:{optionalParameters:["sQuickVariantKey"],value:function(p){return p.sQuickVariantKey?"template:::ListReportTable:::QuickVariantSelectionXColumnListItem:::sQuickVariantKey::"+p.sQuickVariantKey:"template:::ListReportTable:::ColumnListItem";}},GridTable:{optionalParameters:["sQuickVariantKey"],value:function(p){return p.sQuickVariantKey?"GridTable-"+p.sQuickVariantKey:"GridTable";}},AnalyticalTable:{optionalParameters:["sQuickVariantKey"],value:function(p){return p.sQuickVariantKey?"analyticalTable-"+p.sQuickVariantKey:"analyticalTable";}},TreeTable:{optionalParameters:["sQuickVariantKey"],value:function(p){return p.sQuickVariantKey?"TreeTable-"+p.sQuickVariantKey:"TreeTable";}},SmartList:{}},ListReportAction:{Create:{optionalParameters:["sQuickVariantKey"],value:function(p){return p.sQuickVariantKey?"addEntry-"+p.sQuickVariantKey:"addEntry";}},CreateWithFilter:{optionalParameters:["sQuickVariantKey"],value:function(p){return p.sQuickVariantKey?"template:::ListReportAction:::CreateWithFilter:::sQuickVariantKey::"+p.sQuickVariantKey:"template::addEntryWithFilter";}},CreateWithDialog:{optionalParameters:["sQuickVariantKey"],value:function(p){return p.sQuickVariantKey?"CreateWithDialog-"+p.sQuickVariantKey:"CreateWithDialog";}},CreateMenu:{optionalParameters:["sQuickVariantKey"],value:function(p){return p.sQuickVariantKey?"template:::ListReportAction:::CreateMenu:::sQuickVariantKey::"+p.sQuickVariantKey:"template::ListReport::AddEntry";}},Filter:{optionalParameters:["sQuickVariantKey"]},Sort:{optionalParameters:["sQuickVariantKey"]},Group:{optionalParameters:["sQuickVariantKey"]},Personalize:{optionalParameters:["sQuickVariantKey"]},MultiEdit:{optionalParameters:["sQuickVariantKey"]},SearchField:{optionalParameters:["sQuickVariantKey"],value:function(p){return p.sQuickVariantKey?"Table::Toolbar::SearchField-"+p.sQuickVariantKey:"Table::Toolbar::SearchField";}},MultiEditDialog:{optionalParameters:["sQuickVariantKey"]}},QuickVariantSelectionX:{IconTabBar:{value:"template::IconTabBar"},IconTabFilter:{parameters:["sQuickVariantKey"],value:function(p){return"template::IconTabFilter-"+p.sQuickVariantKey;}}},QuickVariantSelection:{SegmentedButton:{value:"template::SegmentedButton"},VariantSelect:{value:"template::VariantSelect"}},ALPTable:{SmartTable:{optionalParameters:["sQuickVariantKey"],value:function(p){return p.sQuickVariantKey?undefined:"table";}},SmartTableToolbar:{optionalParameters:["sQuickVariantKey"],value:function(p){return p.sQuickVariantKey?undefined:"template::TableToolbar";}},ResponsiveTable:{optionalParameters:["sQuickVariantKey"],value:function(p){return p.sQuickVariantKey?undefined:"responsiveTable";}},GridTable:{optionalParameters:["sQuickVariantKey"],value:function(p){return p.sQuickVariantKey?undefined:"gridTable";}},AnalyticalTable:{optionalParameters:["sQuickVariantKey"],value:function(p){return p.sQuickVariantKey?undefined:"analyticalTable";}},TreeTable:{optionalParameters:["sQuickVariantKey"],value:function(p){return p.sQuickVariantKey?undefined:"treeTable";}},ColumnListItem:{optionalParameters:["sQuickVariantKey"],value:function(p){return p.sQuickVariantKey?undefined:"template::responsiveHightlightCol";}}},ALPChart:{SmartChart:{optionalParameters:["sQuickVariantKey"],value:function(p){return p.sQuickVariantKey?undefined:"chart";}},SmartChartToolbar:{optionalParameters:["sQuickVariantKey"],value:function(p){return p.sQuickVariantKey?undefined:"template::ChartToolbar";}}},ObjectPage:{HeaderFacet:{parameters:["sRecordType"],optionalParameters:["sAnnotationPath","sAnnotationId"],value:function(p){if(p.sAnnotationId){return"header::headerEditable::"+p.sAnnotationId;}else{if(p.sRecordType!=="com.sap.vocabularies.UI.v1.ReferenceFacet"){throw new F();}return"header::headerEditable::"+p.sAnnotationPath;}}},EditableHeaderFacet:{parameters:["sRecordType"],optionalParameters:["sAnnotationPath","sAnnotationId"],value:g},StandardFacet:{parameters:["sRecordType"],optionalParameters:["sAnnotationPath","sAnnotationId"],value:a},Facet:{parameters:["sRecordType"],optionalParameters:["bIsHeaderFacet","sAnnotationPath","sAnnotationId"],value:b},Section:{parameters:["sFacet"],value:function(p){return p.sFacet+"::Section";}},SubSection:{parameters:["sFacet"],value:function(p){return p.sFacet+"::SubSection";}},DataField:{parameters:["sRecordType"],optionalParameters:["sSemanticObject","sAction"],value:function(p){switch(p.sRecordType){case"com.sap.vocabularies.UI.v1.DataFieldForAction":return p.sAction;case"com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":case"com.sap.vocabularies.UI.v1.DataFieldWithIntentBasedNavigation":return p.sSemanticObject+(p.sAction&&"::"+p.sAction);default:return undefined;}}}},ObjectPageHeader:{DynamicHeaderContentFlexBox:{},InitialsAvatar:{},SnappedHeaderInitialsAvatar:{},HeaderTitle:{parameters:["sFacet"]},SnappedTitleOnMobile:{}},ObjectPageAction:{Create:{parameters:["sFacet"],value:function(p){return p.sFacet+"::addEntry";}},Delete:{parameters:["sFacet"],value:function(p){return p.sFacet+"::deleteEntry";}},DisplayActiveVersion:{},ContinueEditing:{},EditText:{},SaveAndEdit:{},CreateWithDialog:{parameters:["sFacet"]},AnnotatedAction:{parameters:["sFacet","sDataField"],value:function(p){return"action::"+p.sDataField+"::"+p.sFacet+"::FormAction";}},ExtensionAction:{parameters:["sAction"],value:function(p){return p.sAction;}}},ObjectPageSection:{SmartForm:{parameters:["sFacet"],optionalParameters:["sIsPartOfPreview"],value:function(p){return p.sFacet+"::Form"+(p.sIsPartOfPreview==="false"?"::MoreContent":"");}},Group:{parameters:["sFacet"],optionalParameters:["sIsPartOfPreview"],value:function(p){return p.sFacet+"::FormGroup"+(p.sIsPartOfPreview==="false"?"::MoreContent":"");}},DynamicSideContent:{parameters:["sFacet"],value:function(p){return p.sFacet+"::DynamicSideContent";}},SideContentButton:{parameters:["sFacet"],value:function(p){return p.sFacet+"::SideContentButton";}},BeforeFacetExtensionSection:{parameters:["sEntitySet","sFacet"],value:function(p){return"BeforeFacet::"+p.sEntitySet+"::"+p.sFacet+"::Section";}},BeforeFacetExtensionSubSection:{parameters:["sEntitySet","sFacet"],value:function(p){return"BeforeFacet::"+p.sEntitySet+"::"+p.sFacet+"::SubSection";}},BeforeFacetExtensionSectionWithKey:{parameters:["sEntitySet","sFacet","sFacetExtensionKey"]},BeforeFacetExtensionSubSectionWithKey:{parameters:["sEntitySet","sFacet","sFacetExtensionKey"]},AfterFacetExtensionSection:{parameters:["sEntitySet","sFacet"],value:function(p){return"AfterFacet::"+p.sEntitySet+"::"+p.sFacet+"::Section";}},AfterFacetExtensionSubSection:{parameters:["sEntitySet","sFacet"],value:function(p){return"AfterFacet::"+p.sEntitySet+"::"+p.sFacet+"::SubSection";}},AfterFacetExtensionSectionWithKey:{parameters:["sEntitySet","sFacet","sFacetExtensionKey"]},AfterFacetExtensionSubSectionWithKey:{parameters:["sEntitySet","sFacet","sFacetExtensionKey"]},BeforeSubSectionExtensionSubSection:{parameters:["sEntitySet","sFacet"],value:function(p){return"BeforeSubSection::"+p.sEntitySet+"::"+p.sFacet+"::SubSection";}},AfterSubSectionExtensionSubSection:{parameters:["sEntitySet","sFacet"],value:function(p){return"AfterSubSection::"+p.sEntitySet+"::"+p.sFacet+"::SubSection";}},AddressLabel:{parameters:["sFacet"]},AddressValue:{parameters:["sFacet"]},AddressDataField:{parameters:["sFacet","sAnnotationPath"]},SemanticConnectedField:{parameters:["sFacet","sAnnotationPath"]},ReuseComponentSection:{parameters:["sReuseComponentId"],optionalParameters:["sReuseComponentName","sReuseComponentUsage"],value:function(p){return(p.sReuseComponentName||p.sReuseComponentUsage)+"::"+p.sReuseComponentId+"::ComponentSection";}},ReuseComponentSubSection:{parameters:["sReuseComponentId"],optionalParameters:["sReuseComponentName","sReuseComponentUsage"],value:function(p){return(p.sReuseComponentName||p.sReuseComponentUsage)+"::"+p.sReuseComponentId+"::ComponentSubSection";}},ReuseComponentContainer:{parameters:["sReuseComponentId"],optionalParameters:["sReuseComponentName","sReuseComponentUsage"],value:function(p){return(p.sReuseComponentName||p.sReuseComponentUsage)+"::"+p.sReuseComponentId+"::ComponentContainer";}}},ObjectPageTable:{SmartTable:{parameters:["sFacet"],value:function(p){return p.sFacet+"::Table";}},ColumnListItem:{parameters:["sFacet"],value:function(p){return"template:::ObjectPageTable:::ColumnListItem:::sFacet::"+p.sFacet;}},SegmentedButton:{parameters:["sFacet"]},VariantSelection:{parameters:["sFacet"]},SegmentedButtonItem:{parameters:["sFacet","sQuickVariantKey"]},VariantSelectionItem:{parameters:["sFacet","sQuickVariantKey"]}},TableColumn:{DataField:{parameters:["sSmartTableId","sProperty"],value:function(p){return p.sSmartTableId+"-"+p.sProperty.replace("/","_");}},DataFieldWithNavigationPath:{parameters:["sSmartTableId","sProperty","sTarget"]},DataFieldWithIntentBasedNavigation:{parameters:["sSmartTableId","sProperty","sSemanticObject","sAction"]},DataFieldForAnnotation:{parameters:["sSmartTableId","sTarget"]},DataFieldForAction:{parameters:["sSmartTableId","sAction"]},DataFieldForIntentBasedNavigation:{parameters:["sSmartTableId","sSemanticObject","sAction"]}},QuickView:{Avatar:{}},VisualFilterBar:{FilterItemMicroChart:{parameters:["sProperty"]},ValueHelpButton:{parameters:["sProperty"]},FilterItemContainer:{parameters:["sProperty"]}},VisualFilterDialog:{FilterItemMicroChart:{parameters:["sProperty"]},ValueHelpButton:{parameters:["sProperty"]},FilterItemContainer:{parameters:["sProperty"]}},MultiEditDialog:{SmartForm:{optionalParameters:["sQuickVariantKey"]},DataField:{parameters:["sRecordType"],optionalParameters:["sProperty","sQuickVariantKey"]}}}};});