/*
 * SAPUI5
  (c) Copyright 2009-2020 SAP SE. All rights reserved
 */
sap.ui.define(["sap/sac/grid/Format","sap/sac/grid/utils/ModelHelper","sap/ui/core/theming/Parameters"],function(F,M,T){"use strict";var U=function(){var t=this;t.cellTypeMapping=function(G,i){var S;switch(G){case"Title":S='RowDimHeader';break;case"Header":S='RowDimMember';break;case"Result":case"Standard":S=i?'ColDimHeader':'ColDimMember';break;default:S=i?'ColDimHeader':'ColDimMember';}return M.fetchSACTableCellTypeEnum(S);};function g(p){var b=p.displayText;var c=document.createElement("canvas");var d=c.getContext("2d");if(p.isBold){d.font="bold 16px arial";}else{d.font="16px arial";}return d.measureText(b);}function a(o){var i=o.width;if(o.actualBoundingBoxLeft!==undefined&&o.actualBoundingBoxRight!==undefined){i=Math.abs(o.actualBoundingBoxLeft)+Math.abs(o.actualBoundingBoxRight);}return Math.ceil(i);}t.calculateColumnWidth=function(p){var o=g(p);return a(o)+p.hierarchyPaddingLeft;};t.decideWidgetDimensions=function(G,o,r){var i=0,b=0;var f=G._getFormat();var c=o.columnSettings&&o.columnSettings.length;var d=o.columnSettings;i=this.calculateTotalWidth(c,d,f=="ExcelStyle");var e=o.rows&&o.rows.length;var R=G.getRowHeight();b=this.calculateTotalHeight(e,R,f=="ExcelStyle");var A=this.getAnchorDimensions(G,r);var $=this.getReactTableComponentOfGrid(G);if($){jQuery($).css('height',A.anchorHeight);}o.widgetWidth=A.anchorWidth;o.widgetHeight=A.anchorHeight;o.totalHeight=b;o.totalWidth=i;};t.getAnchorDimensions=function(G,r){var A=G.AnchorElement?G.AnchorElement:G;var i,b;if(A&&A.getDomRef){var $=jQuery(A.getDomRef());i=$.width();b=$.viewportHeight?Math.ceil($.viewportHeight()*0.97):500;$.css('overflow','hidden');}var p=G.AnchorDimensions?G.AnchorDimensions:{anchorWidth:0,anchorHeight:0};if(!r){b=(p.anchorHeight>b)?p.anchorHeight:b;}G.AnchorDimensions={anchorWidth:i,anchorHeight:b};return G.AnchorDimensions;};t.calculateTotalHeight=function(i,r,I){if(I){return(i*(r+1));}else{return(i*r);}};t.calculateTotalWidth=function(i,b,I){var w=0;b.forEach(function(e){w=w+e.width;});if(I){return w+(i*1);}else{return w;}};t.updateTableData=function(G,o){if(G.mSacTable){var c=function(){document.getElementById(G.getId()).appendChild(G.reactTableContainer);G.mSacTable.reapplyScrollPosition();var A=G.AnchorDimensions;var r=t.getReactTableComponentOfGrid(G);if(r){jQuery(r).css('height',A.anchorHeight);}};var b=o?o:G.mSacTable.cachedData;G.mSacTable.updateTableData(b,c);}};t.cellValueClicked=function(p){var c=false;var $=p&&p.event&&p.event.srcElement;if($&&$.classList){c=$.classList.contains('cellValue');}return c;};t.getDrillState=function(i){var d;if(i=="sap-icon://slim-arrow-down"||i=="sap-icon://slim-arrow-up"){d='Expanded';}else if(i=="sap-icon://slim-arrow-right"){d='Collapsed';}return d;};t.getHierarchyInfo=function(S,c,r,f,i,o){var R=c.getRow();var C=c.getColumn();var b=c.getDisplayValue();var I=0;var d=c.data();var h=M.fetchCellHierarchyProperties(R,C,b);var e=c.getIcon();var D=this.getDrillState(e);var j=c.getDisplayLevel();h['expanded']=(D==='Expanded')?true:false;h['showDrillIcon']=(typeof(e)!='undefined'&&e!='')?true:false;h['level']=j;h['isInATotalsContext']=h['showDrillIcon'];if(C<f){h['isInATotalsContext']=h['showDrillIcon'];h['showStyleLinesForDataLevel']=h['showDrillIcon']?true:false;}else{for(I=0;I<f;I++){if(r[R][I]&&r[R][I].isInATotalsContext&&!r[R][I].isOverallResults){h['isInATotalsContext']=true;h['level']=r[R][I].level;h['showStyleLinesForDataLevel']=true;break;}}}h['hierarchyPaddingLeft']=(j===0)?8:(2*j*8);if(S==F.BusinessStyle){var n=d['cellDimension']=="NonMeasureStructure";if(n){h['isInATotalsContext']=true;}}var k=d['cellMember'];if(k&&(k.toLowerCase()=='total'||k=='!SUMME')){h['isInATotalsContext']=true;h['isOverallResults']=true;if(R<i){o['columns'].push(C);}else{o['rows'].push(R);}}else{h['isOverallResults']=o['columns'].includes(C)||o['rows'].includes(R);h['isInATotalsContext']=h['isInATotalsContext']?h['isInATotalsContext']:h['isOverallResults'];}return h;};t.fillMissingIndexes=function(G,r){var S=G._getFormat();var f=G.getFixedRows();var c=T.get('sapUiListHeaderBackground');for(var R in r){var b=r[R];for(var C=0;C<G.columnCount;C++){if(b[C]==undefined){b[C]=M.getEmptyCellValues(parseInt(R),C,S,f,c);}}}};t.getRowCount=function(G){if(G.rowCount){return G.rowCount;}else{var f=G.getFixedRows();var v=G.getVirtualRows();var m=G.getRowLimit();return(f+v)<m?(f+v):m;}};t.getMaxRows=function(G){var f=G.getFixedRows();var v=G.getVirtualRows();return(f+v);};t.getColumnCount=function(G){if(G.columnCount){return G.columnCount;}else{var f=G.getFixedColumns();var v=G.getVirtualColumns();var m=G.getColumLimit();return((f+v)<m)?(f+v):m;}};t.getMaxColumns=function(G){var f=G.getFixedColumns();var v=G.getVirtualColumns();return(f+v);};t.showNoDataInSacTable=function(d,G){var o=M.getTableModelForNoData(d,G.getId());this.storePropertiesToControl(G,false,0,0,{});this.updateTableData(G,o);this.addRemoveCssClassToReactTable(true,"noDataInTable",G);};t.addRemoveCssClassToReactTable=function(A,c,G){var r=this.getReactTableComponentOfGrid(G);if(A&&r){r.classList.add(c);}else if(r){r.classList.remove(c);}};t.storePropertiesToControl=function(G,r,m,i,o){G.reversedHierarchy=r;G.columnCount=m+1;G.rowCount=i+1;G.gridCells=o;};t.addRowsAndColumnSettingsToTableModel=function(G,o,S){var r=G.getRowHeight();var f=G.getFixedRows();if(G.mergeNewDataWithExisitngData){var p=o.rows;var n=this.formTableDataRowsArray(S,r,f);var b=n.splice(0,f);Array.prototype.splice.apply(p,[0,f].concat(b));var N=n[0].row;p.splice(N);o.rows=p.concat(n);}else{o.rows=this.formTableDataRowsArray(S,r,f);}s(o.rows);var i=this.getColumnCount(G);var c=G.getFixedColumns();o.columnSettings=this.formTableDataColumnSettingsArray(o.rows,i,c);};t.formTableDataRowsArray=function(S,r,f){return Object.keys(S).map(function(k,i){return{row:parseInt(k),height:r,cells:S[k],fixed:parseInt(k)<f};});};t.formTableDataColumnSettingsArray=function(S,N,f){return Array.from(Array(N).keys()).map(function(n){return{column:n,minWidth:150,width:S[0].cells[n]?S[0].cells[n].ColumnWidth:150,id:n.toString(),fixed:n<f,hasWrapCell:false,emptyColumn:false};});};function s(b){var r=b[0].cells;for(var R=1;R<b.length;R++){var c=b[R].cells;for(var C=0;C<c.length;C++){var o=c[C];if(!r[C]){r[C]=M.getEmptyCellValues(0,C);r[C].ColumnWidth=150;}if(!o.ColumnWidth||o.ColumnWidth>r[C].ColumnWidth){r[C].ColumnWidth=o.ColumnWidth;}}}}t.addDataRegionPropertiesToTableModel=function(G,o){o.reversedHierarchy=G.reversedHierarchy;o.dataRegionEndCol=o.columnSettings.length-1;o.dataRegionEndRow=o.rows.length-1;o.lastRowIndex=o.rows.length-1;o.dataRegionStartCol=0;o.dataRegionStartRow=0;o.dataRegionCornerCol=G.getFixedColumns();o.dataRegionCornerRow=G.getFixedRows();o.freezeEndRow=G.getFixedRows()-1;o.freezeEndCol=G.getFixedColumns()-1;};t.getReactTableComponentOfGrid=function(G){var r;if(G){var R=G.getDomRef()&&G.getDomRef().getElementsByClassName('reactTableComponent');if(R&&R.length>0){r=R[0];}}return r;};t.extractUsefulInfoFromCell=function(c){var C={};C.cellCustomata=jQuery.extend(true,{},c.data());C=Object.assign(C,c.mProperties);C.data=function(p){if(p){return C.cellCustomata[p];}else{return C.cellCustomata;}};C.getCellType=function(){return C.cellType;};return jQuery.extend(true,{},C);};t.nextBatchDataFetchNeeded=function(G,p){var f=false;var i=G.getFixedRows();var c=G.rowCount-i;var n=c;var r=G.getRowHeight();var e=Math.ceil(p/r);var R=G.AnchorDimensions&&G.AnchorDimensions.anchorHeight;var N=Math.ceil(R/r);var b=N;if(e>(n-b)){f=true;}return f;};t.isScrollDown=function(G){var o=G.oldScrollPosition?G.oldScrollPosition:{scrollTop:0,scrollLeft:0};var n=G.mSacTable.scrollPosition?G.mSacTable.scrollPosition:{scrollTop:0,scrollLeft:0};if(o.scrollTop<n.scrollTop){G.oldScrollPosition=G.mSacTable.scrollPosition;return true;}G.oldScrollPosition=G.mSacTable.scrollPosition;return false;};};return new U();});