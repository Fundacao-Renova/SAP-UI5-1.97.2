/*!
 * (c) Copyright 2010-2019 SAP SE or an SAP affiliate company.
 */
sap.ui.define(["jquery.sap.global","sap/zen/crosstab/TouchHandler","sap/zen/crosstab/rendering/CrossRequestManager","sap/zen/crosstab/rendering/RenderingConstants","sap/zen/crosstab/utils/Utils"],function(q,T,C,R,U){"use strict";q.sap.declare("sap.zen.crosstab.SelectionHandler");sap.zen.crosstab.SelectionHandler=function(c){var t=this;var o={};var s=null;var a=null;var h=false;this.blockSelectionHovering=function(b){h=b;if(h&&a){this.removeSelection(a,true);a=null;}};this.removeAllSelections=function(){this.removeAllPreviousSelectionEffects();this.setSelection(null);};this.checkHeaderCellMerge=function(H,b){var A;var d;if(c.getPropertyBag().isRepeatTexts()===true){return false;}if(!H.isHeaderCell()||!b.isHeaderCell()){return false;}if(H.getId()===b.getId()){return true;}if(H.getMergeKey()===""||b.getMergeKey()===""){return false;}if(H.getMergeKey()!==b.getMergeKey()){return false;}if(H.getDrillState()!==b.getDrillState()){return false;}A=H.getArea();d=b.getArea();if(A.getAreaType()!==d.getAreaType()){return false;}if(A.isRowHeaderArea()){if(H.getCol()!==b.getCol()){return false;}}else if(A.isColHeaderArea()){if(H.getRow()!==b.getRow()){return false;}}return true;};this.provideSelectionForAllClickedCells=function(){q.each(o,function(b,d){t.selectCells(d);});};this.mapClickedCellsToModel=function(){var b=null;var m={};var d=[];var i=0;var e=null;q.each(o,function(f,g){b=g.getArea().getCell(g.getRow(),g.getCol());if(!b){if(g.isHeaderCell()){if(g.getArea().isRowHeaderArea()){b=g.getArea().getCellWithRowSpan(g.getRow(),g.getCol());}else if(g.getArea().isColHeaderArea()){b=g.getArea().getCellWithColSpan(g.getRow(),g.getCol());}if(b){if(t.checkHeaderCellMerge(b,g)===true){m[b.getId()]=b;}else{if(g.getArea().isRowHeaderArea()){d=g.getArea().getDataModel().getAllLoadedCellsByCol(g.getArea(),g.getCol());}else if(g.getArea().isColHeaderArea()){d=g.getArea().getDataModel().getAllLoadedCellsByRow(g.getArea,g.getRow());}for(i=0;i<d.length;i++){e=d[i];if(e){if(e.getMergeKey()===g.getMergeKey()&&e.getText()===g.getText()){m[e.getId()]=e;break;}}}}}}}else{m[b.getId()]=b;}});o=m;};this.addClickedCellsForSpannedHeaderCells=function(){var A=null;var b={};q.each(o,function(d,e){var f=null;if(e.isHeaderCell()){A=e.getArea();if(A.isRowHeaderArea()){f=A.getRenderedCellsByCol(e.getCol());q.each(f,function(i,g){if(t.checkHeaderCellMerge(g,e)===true){b[i]=g;}});}else if(A.isColHeaderArea()){f=A.getRenderedCellsByRow(e.getRow());q.each(f,function(i,g){if(t.checkHeaderCellMerge(g,e)===true){b[i]=g;}});}}});q.extend(o,b);};this.extractClickedCellsFromSelection=function(){var A="";var m;var r=0;var b=null;var S;var d;var e;var f;if(s){A=s.axis;if(s.bFromBackend===true){var H=c.getHeaderInfo();if(c.getNewLinesPos()==="TOP"){r=c.getNewLinesCnt();}for(var i=0;i<s.length;i++){S=s[i];if(A==="ROWS"){d=c.getRowHeaderArea();e=S.row+r;f=H.getColForAbsoluteCol(S.col);}else if(A==="COLUMNS"){d=c.getColumnHeaderArea();e=H.getRowForAbsoluteRow(S.row)+r;f=S.col;}else if(A==="DATA"){d=c.getDataArea();e=S.row+r;f=S.col;}m=d.getCell(e,f);if(m){o[m.getId()]=m;}}}else{b=s[A];if(b){for(i=0;i<b.length;i++){S=b[i];if(A==="ROW"){d=c.getRowHeaderArea();}else if(A==="COL"){d=c.getColumnHeaderArea();}else if(A==="DATA"){d=c.getDataArea();}m=d.getCell(S.row,S.col);if(m){o[m.getId()]=m;}}}}}};this.ensureCellsSelected=function(){o={};if(c.isPlanningMode()===true&&c.getSelectionMode()==="DATA"){s=null;}if(s){this.extractClickedCellsFromSelection();}if(o&&Object.keys(o).length>0){this.mapClickedCellsToModel();this.addClickedCellsForSpannedHeaderCells();this.provideSelectionForAllClickedCells();}};this.checkSingleCellClicked=function(m){var r=true;if(o&&(Object.keys(o).length===0)){return false;}if(o&&(Object.keys(o).length===1)&&o[m.getId()]){return true;}if(m.isHeaderCell()===true){q.each(o,function(b,d){if(!t.checkHeaderCellMerge(m,d)){r=false;return false;}});}else{r=false;}return r;};this.checkCellIsAlreadyClicked=function(m){var b=null;var r=false;if(!m.isHeaderCell()){b=o[m.getId()];if(b){return true;}}else{if((Object.keys(o).length===1)&&o[m.getId()]){return true;}q.each(o,function(d,e){if(c.getPropertyBag().isRepeatTexts()===true){if(d===m.getId()){r=true;return false;}}else{if(t.checkHeaderCellMerge(m,e)===true){r=true;return false;}}});}return r;};this.translateClick=function(m){var n=null;var A=m.getArea();var i=0;var N=0;var r=0;var b=0;var d="";var H=c.getHeaderInfo();n=m;if(A.isRowHeaderArea()){if(c.getPropertyBag().isRepeatTexts()===true){if(m.getCol()>0){n=A.getCell(m.getRow(),0);}else{n=m;}}else{i=m.getCol();d=H.getDimensionNameByCol(i);if(d&&d.length>0){N=H.getFirstColForDimension(d);if(N>=0&&N!==i){n=A.getCell(m.getRow(),N);}}}}else if(A.isColHeaderArea()){if(c.getPropertyBag().isRepeatTexts()===true){if(m.getRow()>0){n=A.getCell(0,m.getCol());}else{n=m;}}else{r=m.getRow();d=H.getDimensionNameByRow(r);if(d&&d.length>0){b=H.getFirstRowForDimension(d);if(b>=0&&b!==r){n=A.getCell(b,m.getCol());}}}}return n;};this.checkSelectionAllowed=function(m){var A=m.getArea();var r=0;if(A.isDimHeaderArea()){return false;}if(c.isPlanningMode()===true){if(c.getNewLinesCnt()>0){r=m.getRow();if(c.getNewLinesPos()==="TOP"){if(r<c.getNewLinesCnt()){return false;}}else{if(r>m.getArea().getRowCnt()-c.getNewLinesCnt()-1){return false;}}}if(c.getSelectionMode()==="DATA"){return false;}}if(c.getSelectionMode()==="DATA"){if(A.isRowHeaderArea()||A.isColHeaderArea()){return false;}}else{if(A.isDataArea()){return false;}}if(c.getSelectionSpace()==="ROW"){if(A.isColHeaderArea()){return false;}}else if(c.getSelectionSpace()==="COL"){if(A.isRowHeaderArea()){return false;}}if(c.getSelectionMode()==="SINGLE"){var H=c.getHeaderInfo();if(A.isRowHeaderArea()){return H.isColOfInnermostDimension(m.getCol());}else if(A.isColHeaderArea()){return H.isRowOfInnermostDimension(m.getRow());}}return true;};this.registerCtrlKeyUpListener=function(){if(c.getPropertyBag().isFireOnSelectedOnlyOnce()===true){if(!document.oSapCrosstabOnSelectHandlerReg){document.oSapCrosstabOnSelectHandlerReg={};}document.oSapCrosstabOnSelectHandlerReg[c.getId()]={"me":this,"fOnSelect":this.sendOnSelectCommand};if(!document.fSapCrosstabOnKeyUpHandler){document.fSapCrosstabOnKeyUpHandler=function(e){if(e.which===17){q(document).off("keyup");document.fSapCrosstabOnKeyUpHandler=null;q.each(document.oSapCrosstabOnSelectHandlerReg,function(i,H){H.fOnSelect.apply(H.me);});document.oSapCrosstabOnSelectHandlerReg=null;U.cancelEvent(e);U.stopEventPropagation(e);}};q(document).on("keyup",document.fSapCrosstabOnKeyUpHandler);}}};this.postSelectionToServer=function(b){var A=document.oSapCrosstabOnSelectHandlerReg&&document.oSapCrosstabOnSelectHandlerReg[c.getId()];if(!c.getPropertyBag().isFireOnSelectedOnlyOnce()||(c.getPropertyBag().isFireOnSelectedOnlyOnce()===true&&!A)){t.sendOnSelectCommand(b);}};this.handleCellClick=function(m,f){if(!this.checkSelectionAllowed(m)){this.removeAllSelections();this.sendJson("{}");return;}if(a){t.removeSelection(a,true);a=null;}m=this.translateClick(m);if(!f||f==="SHIFT"){if(this.checkSingleCellClicked(m)===true){this.removeSelection(m);return;}else{this.startNewSelection(m);}}else if(f==="CTRL"){this.registerCtrlKeyUpListener();if(this.checkCellIsAlreadyClicked(m)===true){this.removeSelection(m);return;}else{var i=this.checkMultiselectPossible(m);if(i){o[m.getId()]=m;}else{this.startNewSelection(m);}}}this.selectCells(m);this.updateSelectionState();};this.getCellsForSelectionState=function(){var b={};var d={};var e;var A="";var f=null;b=this.consolidateClickedCells();q.each(b,function(i,g){f=c.getUtils().translateCellCoordinatesForBackend(g);A=f.axisName;e={};if(!d[A]){d[A]=[];}e["row"]=f.row;e["col"]=f.col;d[A].push(e);});return{"axis":A,"oCells":d};};this.sendOnSelectCommand=function(b){var d;if(c.getOnSelectCommand()){if(b){d=b.oCells;}else{d=this.getCellsForSelectionState().oCells;}var r=JSON.stringify(d);t.sendJson(r);}};this.sendJson=function(j){var b=c.getOnSelectCommand();if(b){var f="\"";var r=new RegExp(f,"g");var d=j.replace(r,"\\\"");b=b.replace("__CELLS__",d);c.getUtils().executeCommandAction(b);}};this.consolidateClickedCells=function(){var r={};var b={};var O={};var A="";var k="";if(c.getPropertyBag().isRepeatTexts()===true){return o;}q.each(o,function(i,d){A=d.getArea().getAxisName();if(A===R.ROW_AXIS){k=d.getText()+" "+d.getMergeKey()+" "+d.getCol();if(!r[k]){r[k]=d;}}else if(A===R.COL_AXIS){k=d.getText()+" "+d.getMergeKey()+" "+d.getRow();if(!b[k]){b[k]=d;}}else{O[i]=d;}});return q.extend(r,b,O);};this.selectCells=function(m,H){var S=this.getSelectedCells(m);q.each(S,function(b,d){var A=d.getArea();if(A.isRowHeaderArea()){t.selectRowHeaderCell(d,H);}else if(A.isColHeaderArea()){t.selectColHeaderCell(d,H);}else if(A.isDataArea()){t.selectDataCell(d,H);}});};this.getSelectedCells=function(m,r){var A=m.getArea();var b={};if(A.isRowHeaderArea()||A.isColHeaderArea()){var S=A.getSelectedCellsBySelectionCoordinates(m.getRow(),m.getCol());var d=c.getDataArea().getSelectedCellsByHeaderSelection(m,r);b=q.extend({},S,d);}else if(A.isDataArea()){d={};d[m.getId()]=m;var e=c.getRowHeaderArea().getSelectedCellsByDataSelection(m);var f=c.getColumnHeaderArea().getSelectedCellsByDataSelection(m);b=q.extend({},d,e,f);}return b;};this.checkMultiselectPossible=function(m){var A=m.getArea();var r=true;var p="";var P=null;var f=null;if(c.getSelectionMode()==="DATA"||c.getSelectionMode()==="SINGLE"){return false;}if(c.getPropertyBag().isRepeatTexts()===true){return true;}if(A.isRowHeaderArea()){f=A.getDataModel().getCellWithSpan(m.getRow(),Math.max(m.getCol()-1,0));}else if(A.isColHeaderArea()){f=A.getDataModel().getCellWithSpan(Math.max(m.getRow()-1,0),m.getCol());}p=f.getId();q.each(o,function(b,d){if(d.getArea().getAreaType()!==A.getAreaType()){r=false;return false;}if(A.isRowHeaderArea()){if(m.getCol()!==d.getCol()){r=false;return false;}if(m.getCol()!==0){P=A.getDataModel().getCellWithSpan(d.getRow(),Math.max(d.getCol()-1,0));if(p!==P.getId()){r=false;return false;}}}else if(A.isColHeaderArea()){if(m.getRow()!==d.getRow()){r=false;return false;}if(m.getRow()!==0){P=A.getDataModel().getCellWithSpan(Math.max(d.getRow()-1,0),d.getCol());if(p!==P.getId()){r=false;return false;}}}else if(A.isDataArea()){r=false;return false;}return null;});return r;};this.startNewSelection=function(m){this.removeAllPreviousSelectionEffects();s=null;o={};o[m.getId()]=m;};this.updateSelectionState=function(){var b=this.getCellsForSelectionState();t.postSelectionToServer(b);s=b.oCells;s.axis=b.axis;};this.removeSelection=function(m,H){var b={};b[m.getId()]=m;if(m.isHeaderCell()===true){q.each(o,function(d,e){if(e.isHeaderCell()===true){if(t.checkHeaderCellMerge(e,m)===true){b[d]=e;}}});}q.each(b,function(r,d){if(!H){delete o[r];}t.removePreviousSelectionEffectsForCell(d,H);});if(!H){this.updateSelectionState();}};this.removeAllPreviousSelectionEffects=function(){q.each(o,function(k,v){t.removePreviousSelectionEffectsForCell(v,false);});};this.removePreviousSelectionEffectsForCell=function(m,H){var S=this.getSelectedCells(m,true);q.each(S,function(b,d){var A=d.getArea();if(A.isRowHeaderArea()){t.deselectRowHeaderCell(d,H);}else if(A.isColHeaderArea()){t.deselectColHeaderCell(d,H);}else if(A.isDataArea()){t.deselectDataCell(d,H);}});};this.selectRowHeaderCell=function(m,H){var b=null;if(H===true){b="sapzencrosstab-HeaderCellHoverRow";}else{m.addStyle("SelectRow");b="sapzencrosstab-HeaderCellSelectRow";}var d=(q(document.getElementById(m.getId())));d.addClass(b);};this.deselectRowHeaderCell=function(m,H){var b=null;if(H===true){b="sapzencrosstab-HeaderCellHoverRow";}else{m.removeStyle("SelectRow");b="sapzencrosstab-HeaderCellSelectRow";}var d=(q(document.getElementById(m.getId())));d.removeClass(b);};this.selectColHeaderCell=function(m,H){var b=null;if(H===true){b="sapzencrosstab-HeaderCellHoverCol";}else{m.addStyle("SelectCol");b="sapzencrosstab-HeaderCellSelectCol";}var d=(q(document.getElementById(m.getId())));d.addClass(b);};this.deselectColHeaderCell=function(m,H){var b=null;if(H===true){b="sapzencrosstab-HeaderCellHoverCol";}else{m.removeStyle("SelectCol");b="sapzencrosstab-HeaderCellSelectCol";}var d=(q(document.getElementById(m.getId())));d.removeClass(b);};this.selectDataCell=function(m,H){var b=null;if(H===true){b="sapzencrosstab-HoverDataCell";}else{m.addStyle("SelectData");b="sapzencrosstab-DataCellSelectData";}var d=(q(document.getElementById(m.getId())));d.addClass(b);};this.deselectDataCell=function(m,H){var b=null;if(H===true){b="sapzencrosstab-HoverDataCell";}else{m.removeStyle("SelectData");b="sapzencrosstab-DataCellSelectData";}var d=(q(document.getElementById(m.getId())));d.removeClass(b);};this.setSelection=function(p){o={};s=p;if(s){s.bFromBackend=true;}};this.hasSelection=function(){return U.getSizeOf(o)>0;};this.handleCellHoverEntry=function(m){if(h){return;}if(!this.checkSelectionAllowed(m)){if(a){t.removeSelection(a,true);a=null;}return;}m=this.translateClick(m);if(a&&(m!==a)){t.removeSelection(a,true);a=null;}if(!a){if(!m||m===undefined||m.hasStyle("SelectCol")||m.hasStyle("SelectData")||m.hasStyle("SelectRow")){return;}a=m;t.selectCells(m,true);}};this.handleCellHoverOut=function(e){if(a){var d=e.toElement||e.relatedTarget;var D=e.target;var f=null;var b=sap.ui.getCore().getControl(e.target.id);var g=null;var r=false;if(b){if(b===a){f=q(D).find(q(d));if(!(f&&f.length>0)){r=true;}}}else{g=q(document.getElementById(a.getId()));f=g.find(q(D));if(f&&f.length>0){f=g.find(q(d));if(!(f&&f.length>0)){r=true;}}}if(r===true){t.removeSelection(a,true);a=null;}}};};return sap.zen.crosstab.SelectionHandler;});
