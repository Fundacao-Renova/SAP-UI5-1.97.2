/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(
	["sap/fe/core/TemplateComponent", "sap/fe/core/library"],
	function(TemplateComponent, CoreLibrary) {
		"use strict";

		var VariantManagement = CoreLibrary.VariantManagement,
			InitialLoadMode = CoreLibrary.InitialLoadMode,
			ListBasedComponent = TemplateComponent.extend("sap.fe.templates.ListComponent", {
				metadata: {
					properties: {
						initialLoad: {
							type: "sap.fe.core.InitialLoadMode",
							defaultValue: InitialLoadMode.Auto
						},
						variantManagement: {
							type: "sap.fe.core.VariantManagement",
							defaultValue: VariantManagement.Page
						},
						defaultTemplateAnnotationPath: {
							type: "string",
							defaultValue: undefined
						},
						liveMode: {
							type: "boolean",
							defaultValue: false
						}
					},
					manifest: {
						"sap.ui": {
							"technology": "UI5",
							"deviceTypes": {
								"desktop": true,
								"tablet": true,
								"phone": true
							},
							"supportedThemes": [
								"sap_fiori_3",
								"sap_hcb",
								"sap_bluecrystal",
								"sap_belize",
								"sap_belize_plus",
								"sap_belize_hcw"
							]
						},
						"sap.ui5": {
							"services": {
								"templatedViewService": {
									"factoryName": "sap.fe.core.services.TemplatedViewService",
									"startup": "waitFor",
									"settings": {
										"viewName": "sap.fe.templates.ListReport.ListReport",
										"converterType": "ListReport",
										"errorViewName": "sap.fe.core.services.view.TemplatingErrorPage"
									}
								},
								"asyncComponentService": {
									"factoryName": "sap.fe.core.services.AsyncComponentService",
									"startup": "waitFor"
								}
							},
							"commands": {
								"Create": {
									"name": "Create",
									"shortcut": "Ctrl+Enter"
								},
								"DeleteEntry": {
									"name": "DeleteEntry",
									"shortcut": "Ctrl+D"
								},
								"TableSettings": {
									"name": "TableSettings",
									"shortcut": "Ctrl+,"
								},
								"Share": {
									"name": "Share",
									"shortcut": "Shift+Ctrl+S"
								}
							},
							"handleValidation": true,
							"dependencies": {
								"minUI5Version": "1.97.0",
								"libs": {
									"sap.f": {},
									"sap.fe.macros": {
										"lazy": true
									},
									"sap.m": {},
									"sap.suite.ui.microchart": {
										"lazy": true
									},
									"sap.ui.core": {},
									"sap.ui.layout": {},
									"sap.ui.mdc": {},
									"sap.ushell": {
										"lazy": true
									},
									"sap.ui.fl": {}
								}
							},
							"contentDensities": {
								"compact": true,
								"cozy": true
							}
						}
					},
					library: "sap.fe.templates"
				},
				getViewData: function() {
					var oViewData = TemplateComponent.prototype.getViewData.apply(this, arguments);
					return oViewData;
				}
			});
		return ListBasedComponent;
	},
	/* bExport= */ true
);
