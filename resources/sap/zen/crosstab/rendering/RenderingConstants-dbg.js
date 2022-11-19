/*!
 * (c) Copyright 2010-2019 SAP SE or an SAP affiliate company.
 */
/*global sap*/
sap.ui.define(
  [
    "jquery.sap.global"
  ],
  function(jQuery) {
    "use strict";
    jQuery.sap.declare("sap.zen.crosstab.rendering.RenderingConstants");
    sap.zen.crosstab.rendering.RenderingConstants = {
      TYPE_DATA_AREA:"DataArea",
      TYPE_DIMENSION_HEADER_AREA:"DimensionHeaderArea",
      TYPE_COLUMN_HEADER_AREA:"ColumnHeaderArea",
      TYPE_ROW_HEADER_AREA:"RowHeaderArea",
      ROW_AXIS:"ROW",
      COL_AXIS:"COL",
      DATA_AXIS:"DATA",
      TYPE_HEADER_CELL:"HEADER_CELL",
      TYPE_DATA_CELL:"DATA_CELL",
      STYLE_PREFIX_DATA_CELL:"sapzencrosstab-DataCell",
      STYLE_PREFIX_HEADER_CELL:"sapzencrosstab-HeaderCell",
      STYLE_TOTAL:"Total",
      STYLE_ALTERNATING:"Alternating",
      STYLE_FIRST_IN_ROW:"FirstInRow",
      STYLE_LAST_IN_ROW:"LastInRow",
      STYLE_FIRST_IN_COL:"FirstInCol",
      STYLE_LAST_IN_COL:"LastInCol",
      STYLE_HEADER_CELL:"Default",
      STYLE_DATA_CELL:"Default",
      STYLE_HEADER_CELL_COZY:"Cozy",
      STYLE_DATA_CELL_COZY:"Cozy",
      STYLE_LOADING:"Loading",
      STYLE_HIGHLIGHTED:"Highlighted",
      STYLE_EMPHASIZED:"Emphasized",
      STYLE_DATA_ENTRY_ENABLED:"EntryEnabled",
      STYLE_INVALID_VALUE:"InvalidValue",
      STYLE_NEW_VALUE:"NewValue",
      STYLE_LOCKED:"Locked",
      ALERT_TYPE_BACKGROUND:2,
      ALERT_TYPE_FONT_COLOR:4,
      ALERT_TYPE_STATUS_SYMBOL:8,
      ALERT_TYPE_TREND_ASCENDING_SYMBOL:16,
      ALERT_TYPE_TREND_DESCENDING_SYMBOL:32,
      ALERT_TYPE_TREND_GREY_SYMBOL:64,
      RENDERMODE_FILL:0,
      RENDERMODE_COMPACT:1,
      PASSIVE_CELL_TYPE_NORMAL:"NORMAL",
      PASSIVE_CELL_TYPE_NEWLINE_HEADER:"NHC",
      PASSIVE_CELL_TYPE_NEWLINE_DATA:"NDC",
      TABINDEX:"0",
      ZEBRA_FULL:"FULL",
      ZEBRA_DATA:"DATA",
      ZEBRA_OFF:"OFF",
    };
    return sap.zen.crosstab.rendering.RenderingConstants;
  }
);
