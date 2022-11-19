/*
 * SAPUI5
  (c) Copyright 2009-2020 SAP SE. All rights reserved
 */
sap.ui.define(["sap/sac/grid/Format","sap/sac/grid/utils/CellStyle"],function(F,C){"use strict";function M(){var t=this;t.fetchSACTableCellTypeEnum=function(s){var a={"Value":0,"Header":1,"Input":2,"Chart":3,"ColumnCoordinate":10,"RowCoordinate":11,"RowDimHeader":14,"ColDimHeader":15,"ColDimMember":16,"RowDimMember":17,"AttributeRowDimHeader":18,"AttributeColDimHeader":19,"AttributeRowDimMember":20,"AttributeColDimMember":21,"Custom":23,"Comment":25,"Image":31};return a[s];};t.fetchInitialTableModel=function(c){return{id:c+'-reactNode',hasFixedRowsCols:true,featureToggles:{divBasedRendering:true},reversedHierarchy:true,freezeEndRow:0,freezeEndCol:0,classesToIgnore:[],showGrid:true,showCoordinateHeader:false,title:{titleStyle:{height:0},titleVisible:false,subtitleVisible:false},rows:[],columnSettings:[],totalHeight:0,totalWidth:0,dataRegionStartCol:0,dataRegionStartRow:0,dataRegionEndCol:0,dataRegionEndRow:0,dataRegionCornerCol:0,dataRegionCornerRow:0,lastRowIndex:0,dimensionCellCoordinatesInHeader:{},rowHeightSetting:"Compact",scrollPosition:{scrollLeft:0,scrollTop:0}};};t.getEmptyCellValues=function(r,c,s,f,a){var e={row:r,column:c,formatted:"",expanded:false,showDrillIcon:false,level:0,isInATotalsContext:false,hierarchyPaddingLeft:0,type:16,ColumnWidth:150};if(s==F.BusinessStyle){e.style={"fillColor":(r<f)?a:'transparent'};e.styleUpdatedByUser=true;}return e;};t.getTableModelForNoData=function(d,c){return{id:c+'-reactNode',widgetHeight:400,widgetWidth:800,totalHeight:200,totalWidth:400,showGrid:true,hasFixedRowsCols:true,rows:[{"row":0,"fixed":true,"cells":[{"row":0,"column":0,"formatted":d,"type":1,"style":{},"isInATotalsContext":true}],"height":40}],columnSettings:[{"column":0,"width":200,"fixed":true}]};};t.fetchCellHierarchyProperties=function(r,c,s){return{row:r,column:c,formatted:s,expanded:false,showDrillIcon:false,level:0,isInATotalsContext:false,hierarchyPaddingLeft:0,isOverallResults:false,showStyleLinesForDataLevel:false};};}return new M();});
