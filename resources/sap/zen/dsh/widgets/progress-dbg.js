/*
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
/*global sap*/
sap.ui.define(
  [
    "jquery.sap.global",
    "sap/base/Log",
    "sap/m/ProgressIndicator"
  ],
  function(jQuery, Log, ProgressIndicator){
    "use strict";
    return ProgressIndicator.extend("com.sap.ip.bi.ProgressIndicator",{
      initDesignStudio: function(){
      },
      renderer: {},
      setText: function(value){
        this.setDisplayValue(value);
      },
      getText: function(){
        return this.getDisplayValue();
      },
      setState: function(state){
        //redirect to ui5 ProgressIndicator
        sap.m.ProgressIndicator.prototype.setState.call(this,sap.ui.core.ValueState[state]);
        this.onAfterRendering();
      },
      getState: function(){
        return sap.m.ProgressIndicator.prototype.getState.call(this);
      },
      //set some tooltip
      setTooltip: function(value){
        sap.m.ProgressIndicator.prototype.setTooltip.call(this,value);
        this.$().attr("title",value);
      },
      //getter for tooltip
      getTooltip: function(){
        return sap.m.ProgressIndicator.prototype.getTooltip.call(this);
      },
      setPercentValue: function(value){
        if(value < 0){
          value = 0;
        }else if(value > 100){
          value = 100;
        }
        return sap.m.ProgressIndicator.prototype.setPercentValue.call(this, value);
      }
    });
  }
);
