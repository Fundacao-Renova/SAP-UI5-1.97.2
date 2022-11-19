/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */

// ---------------------------------------------------------------------------------------
// Static class used by FormContainer used during runtime
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
sap.ui.define(
	["sap/fe/macros/ResourceModel"],
	function(ResourceModel, Log) {
		"use strict";
		var FormContainerRuntime = {
			toggleDetails: function(oEvent) {
				var oButton = oEvent.getSource(),
					oInternalModelContext = oEvent.getSource().getBindingContext("internal"),
					SHOW_DETAILS = "showDetails";
				// The internal model context of FormContainers is initialized
				// in method ObjectPageController.controller.js#onAfterBinding()
				if (
					!oInternalModelContext ||
					!(oInternalModelContext.getProperty instanceof Function) ||
					oInternalModelContext.getProperty(SHOW_DETAILS) === undefined
				) {
					Log.error(
						"FormContainerRuntime: No internal model context / property found: Cannot execute 'Show Details' in FormContainer.",
						"sap.fe.macros.formcontainer.FormContainerRuntime",
						"toggleDetails"
					);
				} else {
					oInternalModelContext.setProperty(SHOW_DETAILS, !oInternalModelContext.getProperty(SHOW_DETAILS));
					oButton.setProperty(
						"text",
						oInternalModelContext.getProperty(SHOW_DETAILS)
							? ResourceModel.getText("T_COMMON_OBJECT_PAGE_HIDE_FORM_CONTAINER_DETAILS")
							: ResourceModel.getText("T_COMMON_OBJECT_PAGE_SHOW_FORM_CONTAINER_DETAILS")
					);
				}
			}
		};
		return FormContainerRuntime;
	},
	/* bExport= */ false
);
