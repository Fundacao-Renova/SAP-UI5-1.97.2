/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
// Provides the design time metadata for the sap.suite.ui.generic.template.ListReport component

sap.ui.define(["sap/suite/ui/generic/template/designtime/utils/designtimeHelper", "sap/base/util/deepExtend"],
	function (designtimeHelperPromise, deepExtend) {
		"use strict";

		// definiton of changes we want to allow. Structure/granularity to be clarified
		// example for testing
//		var mAllowTest = {
//				"sap.ui.comp.smarttable.SmartTable": {
//					properties: ["useExportToExcel"]
//				},
//				"sap.m.Button": {
//					actions: ["rename", "remove", "combine", "reveal"]
//				},
//				"sap.m.OverflowToolbar": {
//					aggregations: {
//						content: {
//							actions: ["move"]
//						}
//					}
//				},
//				"sap.m.Toolbar": {}
//		};
		
		// allow list for designtime adaptation / level-0.  
		var mAllowLevel0 = {
				"sap.f.DynamicPage": {
					properties: ["fitContent"]
				},
				"sap.ui.comp.smartfilterbar.SmartFilterBar": {
					properties: ["liveMode"]
				},
				"sap.ui.comp.smarttable.SmartTable": {
					properties: ["useExportToExcel"]
				},
				"sap.m.Table": {
					properties: ["sticky", "popinLayout", "includeItemInSelection", "growingThreshold"]
				},
				"sap.m.Column": {
					properties: ["width", "hAlign"]
				},
				"sap.ui.table.Column": {
					properties: ["width", "hAlign"]
				},
				"sap.m.Button": {
					actions: ["combine"],
					properties: ["visible", "icon", "activeIcon", "type"]
														// remark: don't confuse with action "remove" - property is only relevant for level 0, action for key user
				},
				"sap.m.OverflowToolbarButton": {
					properties: ["visible", "icon", "activeIcon", "type"]
				}
			};
		
		// grey list for designtime adaptation / level-0 (no technical difference too allow list, separated just for documentation  
		var mGreyLevel0 = {
				"sap.f.DynamicPage": {
					properties: ["headerExpanded"]
				},
				"sap.m.VBox": {
					properties: ["width"]
				},
				"sap.ui.comp.smartfilterbar.SmartFilterBar": {
					properties: ["showClearOnFB", "showFilterConfiguration", "showRestoreOnFB", "useDateRangeType", "filterBarExpanded", "showGoOnFB"]
				},
				"sap.m.Label": {						// not created by us, but by SFB
					properties: ["width", "wrapping"]
				},
				"sap.m.Text": {
					properties: ["text", "wrapping"]
				},
				"sap.m.Title": {
					properties: ["text"]
				},
				"sap.m.MultiInput": {						// not created by us, but by SFB
					properties: ["showSuggestion", "editable", "value", "showValueHelp", "enabled"]
				},
				"sap.m.IconTabFilter": {
					properties: ["text", "icon", "count", "iconColor"]
				},
				"sap.ui.comp.smarttable.SmartTable": {
					properties: ["header", "ignoreFromPersonalisation", "showTablePersonalisation", "editable", "showRowCount", "wrap", "requestAtLeastFields", "ignoredFields", "exportType", "width", "demandPopin"]
				},
				"sap.m.Table": {
					properties: ["noDataText", "fixedLayout", "growingScrollToLoad", "growing"]
				},
				"sap.m.Column": {
					properties: ["demandPopin", "vAlign", "popinDisplay", "mergeDuplicates"]
				},
				"sap.ui.table.Table": {
					properties: ["selectionMode"]
				},
				"sap.ui.table.AnalyticalTable": {
					properties: ["selectionMode", "minAutoRowCount", "visibleRowCountMode"]
				},
				"sap.ui.table.AnalyticalColumn": {
					properties: ["width", "minWidth", "showFilterMenuEntry", "summed"]
				},
				"sap.ui.comp.smartmicrochart.SmartMicroChart": {
					properties: ["size"]
				},
				"sap.ui.comp.smartchart.SmartChart": {
					properties: ["showDownloadButton", "header", "ignoredChartTypes", "useTooltip", "useChartPersonalisation"]
				},
				"sap.m.Button": {
					properties: ["enabled", "text", "blocked"]
				},
				"sap.m.OverflowToolbarButton": {
					properties: ["enabled", "text", "blocked"]
				},
				"sap.m.MenuButton": {
					properties: ["text", "type"]
				}
		};
		
		// allow list for key user adaptation. 
		var mAllowKeyUser = {
				"sap.m.Button": {
					actions: ["combine"]			// todo: should this be allowed for key user or for level 0?
				}
			};
		
		// allow list for variant management: All changes done here are stored with a variant, and only applied when that variant is selected.
		// this mode is indicated by url parameter fiori-tools-rta-mode=true
		// var mAllowVariantManagement = {};
		
		// there's no reliable way to differentiate designtime adaptation and key user adaptation. However
		// - property changes are possible only in designtime adaptation
		// - for any other changes (using change handlers), we anyway need to be prepared for the change if it is allowed in one mode, so it shouldn't matter if it's also possible in the other mode
		var mAllow = deepExtend({}, mAllowLevel0, mGreyLevel0, mAllowKeyUser);

		return designtimeHelperPromise.then(function(designtimeHelper){
		
			return designtimeHelper.getViewDesignTime(mAllow);
		});
		
});
		
