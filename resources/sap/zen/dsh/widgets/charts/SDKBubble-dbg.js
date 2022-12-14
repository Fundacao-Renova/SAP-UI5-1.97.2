/*!
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
/*global sap*/
sap.ui.define(
  [
    "sap/zen/dsh/utils/BaseHandler",
    "sap/zen/dsh/widgets/charts/SDKBaseChart"
  ],
  function(BaseHandler,SDKBaseChart){
    "use strict";

    SDKBaseChart.extend("sap.zen.SDKBubbleChart", {

      getDataFeeding : function(keyfigureaxis, keyfigureindex, rowDimensionCounter, colDimensionCounter, bubbleHeight){
        var chartDataFeedingHelper = this.getChartDataFeedingHelper();
        var bindingColor = chartDataFeedingHelper.getDataBubbleFeedingColor(rowDimensionCounter, colDimensionCounter);
        var bindingShape = chartDataFeedingHelper.getDataBubbleFeedingShape(rowDimensionCounter, colDimensionCounter);
        var bindingHeight = chartDataFeedingHelper.getDataBubbleFeedingHeight(bubbleHeight);

        var dataFeeding = [
          {
            "feedId" : "primaryValues",
            "binding" : [
              {
                "type" : "measureValuesGroup",
                "index" : 1
              }
            ]
          },
          {
            "feedId" : "secondaryValues",
            "binding" : [
              {
                "type" : "measureValuesGroup",
                "index" : 2
              }
            ]
          },
          {
            "feedId" : "bubbleWidth",
            "binding" : [
              {
                "type" : "measureValuesGroup",
                "index" : 3
              }
            ]
          },
          {
            "feedId" : "bubbleHeight",
            "binding" : bindingHeight
          },
          {
            "feedId" : "regionColor",
            "binding" : bindingColor
          },
          {
            "feedId" : "regionShape",
            "binding" : bindingShape
          }
        ];
        return dataFeeding;
      },

      initCvomChartType : function(){
        this.cvomType = "viz/bubble";
      }
    });

    return sap.zen.SDKBubbleChart;
  }
);
