/*!
 * SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */
sap.ui.define(function() {
	"use strict";

	/**
	 * @class Chart Popover Renderer.
	 * @static
	 */
	var PopoverRenderer = {
	    apiVersion: 2,

	    /**
	     * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
	     *
	     * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
	     * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
	     */
	    render: function (oRm, oControl) {
	        oRm.openStart("div", oControl)
	            .openEnd()
	            .close("div");
	    }
	};


	return PopoverRenderer;

}, /* bExport= */ true);
