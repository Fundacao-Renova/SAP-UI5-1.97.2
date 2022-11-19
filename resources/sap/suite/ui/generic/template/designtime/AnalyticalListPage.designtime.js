/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/suite/ui/generic/template/designtime/utils/designtimeHelper","sap/base/util/deepExtend"],function(d,a){"use strict";var A={"sap.f.DynamicPage":{properties:["headerExpanded","preserveHeaderStateOnScroll"]},"sap.ui.comp.smartvariants.SmartVariantManagement":{properties:["showExecuteOnSelection","showSetAsDefault","showShare"]},"sap.ui.comp.smartchart.SmartChart":{properties:["ignoredChartTypes","selectionMode","noData","showChartTooltip","showChartTypeSelectionButton","showDownloadButton","showLegendButton"]},"sap.ui.comp.smarttable.SmartTable":{properties:["useExportToExcel","showRowCount"]},"sap.ui.table.AnalyticalColumn":{properties:["visible","width","autoResizable","inResult","resizable","showSortMenuEntry","sortOrder","sorted","summed"]},"sap.m.OverflowToolbar":{properties:["visible"]},"sap.m.Button":{properties:["visible","width","icon","activeIcon","type","text","busy","enabled","blocked"]},"sap.m.OverflowToolbarButton":{properties:["visible","icon","activeIcon","type"]}};var g={"sap.suite.ui.generic.template.AnalyticalListPage.control.smartfilterbarext:SmartFilterBarExt":{properties:["useDateRangeType"]},"sap.ui.table.AnalyticalTable":{properties:["selectionMode","minAutoRowCount","visibleRowCountMode"]},"sap.ui.table.AnalyticalColumn":{properties:["width","minWidth","showFilterMenuEntry","summed"]},"sap.ui.comp.smartchart.SmartChart":{properties:["showDownloadButton","header","ignoredChartTypes","useTooltip","useChartPersonalisation"]}};var m={};var b=a({},A,g,m);return d.then(function(c){return c.getViewDesignTime(b);});});