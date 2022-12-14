/*
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
/*global sap*/
sap.ui.define(
  [
    "jquery.sap.global",
    "sap/zen/dsh/utils/BaseHandler"
  ],
  function(jQuery,BaseHandler){
    "use strict";
    /**************************************************************************************************************************************
     * FooterBar Handler
     **************************************************************************************************************************************/
    var FooterBarHandler = function() {
      BaseHandler.apply(this, arguments);
      var that = this;

      /**
       * Create the Control
       */
      this.createAndAdd = function (oChainedControl, oControlProperties, oComponentProperties, fAppendToParentFunclet, iIndex) {
        // create the UI5 Footer Control
        var loControl = new sap.m.OverflowToolbar(oControlProperties["id"]);
        fAppendToParentFunclet(loControl, iIndex, oComponentProperties);
        BaseHandler.dispatcher.updateComponentProperties(loControl, oComponentProperties, fAppendToParentFunclet);

        loControl.setDesign(sap.m.ToolbarDesign.Solid);
        loControl.addStyleClass("zenFooterbarFixedPanel");
        loControl.addStyleClass("sapContrast sapContrastPlus sapMBar sapMBar-CTX sapMContent-CTX sapMFooter-CTX sapMIBar sapMIBar-CTX sapMPageFooter");
        loControl.addContent(new sap.m.ToolbarSpacer());

        // initialize the Splitter
        this.init(loControl, oControlProperties, oComponentProperties);

        return loControl;
      };

      /**
       * Update the Control
       */
      this.update = function(oControl, oControlProperties, oComponentProperties) {
        if (oControlProperties) {
          this.init(oControl, oControlProperties, oComponentProperties);
        }

        return oControl;
      };

      /**
       * Initialize the Control (Create, Update)
       */
      this.init = function init(oControl, oControlProperties, oComponentProperties) {
        if (!oControlProperties) {
          return;
        }

        // update the children
        var ltChildren = oControlProperties.content;
        that.updateChildren(ltChildren, oControl, function(oButton, i) {
          oControl.insertContent(oButton, i+1);
        }, function(oButtonToDelete){
          oControl.removeContent(oButtonToDelete);
        });
      };

      this.applyForChildren = function(oFooterBar, fFunclet) {
        var ltChildren = oFooterBar.getContent();
        for ( var i = 0; i < ltChildren.length; i++) {
          var loControl = ltChildren[i];
          if (loControl.zenControlType === "footerbarbutton"){
            fFunclet(loControl);
          }
        }
      };
      this.getDecorator = function() {
        return "FixedSizeAndPositionDecorator";
      };
      this.getType = function() {
        return "footerbar";
      };
    };
    
    var instance = new FooterBarHandler();
    BaseHandler.dispatcher.addHandlers(instance.getType(),instance);
    
    /**************************************************************************************************************************************
     * FooterBar Button Handler
     **************************************************************************************************************************************/
    sap.zen.FooterBarButtonHandler = function() {
      BaseHandler.apply(this, arguments);
      /**
       * Create the Control
       */
      this.createAndAdd = function(oChainedControl, oControlProperties, oComponentProperties, fAppendToParentFunclet, oArgForFunclet) {
        // create the UI5 Button Control
        var loControl = new sap.m.Button(oControlProperties.id);
        fAppendToParentFunclet(loControl, oArgForFunclet);

        this.init(loControl, oControlProperties, oComponentProperties);

        if (oControlProperties.onclick) {
          (function(){
            loControl.attachPress(function () {
              var lFunction = new Function(oControlProperties.onclick);
              lFunction();
            });
          })();
        }

        return loControl;
      };

      /**
       * Update the Control
       */
      this.updateComponent = function(oControl, oControlProperties, oComponentProperties) {
        if (oControlProperties) {
          this.init(oControl, oControlProperties, oComponentProperties);
        }

        return oControl;
      };

      /**
       * Initialize the Control (Create, Update)
       */
      this.init = function(oControl, oControlProperties, oComponentProperties) {
        if (!oControlProperties) {
          return;
        }

        oControl.setText(oControlProperties.text);
        oControl.setIcon(oControlProperties.icon);
        oControl.setTooltip(oControlProperties.tooltip);

        var lVisible = oControlProperties.visible;
        var lEnabled = oControlProperties.enabled;
        oControl.setEnabled(lEnabled);
        if (sap.zen.designmode) {
          if (!lVisible && lEnabled) {
            oControl.addStyleClass("zenFooterbarInvisibleButton");
          } else {
            oControl.removeStyleClass("zenFooterbarInvisibleButton");
          }
        }
      };
      this.getDecorator = function() {
        return "FixedSizeAndPositionDecorator";
      };
      this.getType = function() {
        return "footerbarbutton";
      };
    };
    
    instance = new sap.zen.FooterBarButtonHandler();
    BaseHandler.dispatcher.addHandlers(instance.getType(),instance);
    return instance;
  }
);
