/*!
 * (c) Copyright 2010-2019 SAP SE or an SAP affiliate company.
 */
/*global sap*/
sap.ui.define(
  [
    "jquery.sap.global",
    "sap/zen/crosstab/BaseArea",
    "sap/zen/crosstab/rendering/RenderingConstants"
  ],
  function(jQuery, BaseArea, RenderingConstants){
    "use strict";
    jQuery.sap.declare("sap.zen.crosstab.RowHeaderArea");
    sap.zen.crosstab.RowHeaderArea = function (oCrosstab) {
      BaseArea.call(this, oCrosstab);
      this.sAreaType = RenderingConstants.TYPE_ROW_HEADER_AREA;
      this.iRenderStartRow = 0;
      this.iRenderRowCnt = 0;
      this.bLastPageLoaded = false;
    };
    sap.zen.crosstab.RowHeaderArea.prototype = jQuery.sap.newObject(BaseArea.prototype);
    sap.zen.crosstab.RowHeaderArea.prototype.renderArea = function (oRenderManager) {
      var sClasses = "sapzencrosstab-RowHeaderArea";
      if (this.oCrosstab.getPropertyBag().isMobileMode()) {
        sClasses += " sapzencrosstab-MobileHeaderSeparator"; 
      }
      this.renderContainerStructure(oRenderManager, sClasses, this.oCrosstab.isVCutOff(), false);
    };
    sap.zen.crosstab.RowHeaderArea.prototype.getSelectedCellsBySelectionCoordinates = function (iRow, iCol) {
      var oClickedCell = this.oDataModel.getCellWithSpan(iRow, iCol, true);
      var oResultCells = {};
      if(oClickedCell){
        //Search all cells to the right of the clicked cell
        oResultCells[oClickedCell.getId()] = oClickedCell;
        var iSpan = oClickedCell.getRowSpan();
        var iStartCol = oClickedCell.getCol()+1;
        var iColCnt = this.getColCnt() - iStartCol;
        var iSearchRow = 0;
        var aCellsInRow = null;
        for(var i = 0; i<iSpan; i++){
          iSearchRow = oClickedCell.getRow()+i;
          aCellsInRow = this.oDataModel.getCellsByRow(iSearchRow, iStartCol, iColCnt);
          for(var j = 0; j<aCellsInRow.length; j++){
            oResultCells[aCellsInRow[j].getId()] = aCellsInRow[j];
          }
        }
        return oResultCells;
      }
      return null;
    };
    sap.zen.crosstab.RowHeaderArea.prototype.getSelectedCellsByDataSelection = function (oDataCell) {
      var oResultCells = {};
      var iStartCol = 0;
      var iEndCol = this.getColCnt();
      var iRow = oDataCell.getRow();
      for(var iCol = iStartCol; iCol<iEndCol; iCol++){
        var oCell = this.oDataModel.getCellWithSpan(iRow, iCol);
        oResultCells[oCell.getId()] = oCell;
      }
      return oResultCells;
    };
    sap.zen.crosstab.RowHeaderArea.prototype.getRenderedCellsByCol = function (iCol) {
      var i = 0;
      var oCell = null;
      var oCells = {};
      var iMaxRenderRow = this.iRenderStartRow + this.iRenderRowCnt;
      for (i = this.iRenderStartRow; i <= iMaxRenderRow; i++) {
        oCell = this.oDataModel.getCellWithRowSpan(i, iCol, true);
        if (oCell) {
          oCells[oCell.getId()] = oCell;
        }
      }
      return oCells;
    };
    return sap.zen.crosstab.RowHeaderArea;
  }
);
