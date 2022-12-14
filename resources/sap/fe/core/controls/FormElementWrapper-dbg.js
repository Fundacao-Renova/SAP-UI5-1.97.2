/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/core/Control", "sap/ui/Device"], function(Control, Device) {
	"use strict";
	return Control.extend("sap.fe.core.controls.FormElementWrapper", {
		metadata: {
			interfaces: ["sap.ui.core.IFormContent"],
			properties: {
				width: {
					type: "sap.ui.core.CSSSize",
					defaultValue: null
				},
				formDoNotAdjustWidth: {
					type: "boolean",
					defaultValue: false
				}
			},
			defaultAggregation: "content",
			aggregations: {
				content: { type: "sap.ui.core.Control", multiple: false }
			}
		},
		getAccessibilityInfo: function() {
			var oContent = this.getContent();
			return oContent && oContent.getAccessibilityInfo ? oContent.getAccessibilityInfo() : {};
		},
		renderer: {
			apiVersion: 2,
			render: function(oRm, oControl) {
				oRm.openStart("div", oControl);
				oRm.style("min-height", "1rem");
				oRm.style("width", oControl.getWidth());
				if (Device.browser.msie) {
					oRm.style("display", "block");
				} else {
					oRm.style("display", "inline-block");
				}
				oRm.openEnd();
				oRm.renderControl(oControl.getContent()); // render the child Control
				oRm.close("div"); // end of the complete Control
			}
		}
	});
});
