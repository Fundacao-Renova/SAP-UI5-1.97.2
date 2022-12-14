/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(
	["sap/ui/core/UIComponent", "sap/fe/core/CommonUtils", "sap/base/Log"],
	function(UIComponent, CommonUtils, Log) {
		"use strict";

		var TemplateComponent = UIComponent.extend("sap.fe.core.TemplateComponent", {
			metadata: {
				interfaces: ["sap.ui.core.IAsyncContentCreation"],
				properties: {
					/**
					 * OData EntitySet name
					 */
					entitySet: {
						type: "string",
						defaultValue: null
					},
					/**
					 * Context Path for rendering the template
					 */
					contextPath: {
						type: "string",
						defaultValue: null
					},
					/**
					 * The pattern for the binding context to be create based on the parameters from the navigation
					 * If not provided we'll default to what was passed in the URL
					 */
					bindingContextPattern: {
						type: "string"
					},

					/**
					 * Map of used OData navigations and its routing targets
					 */
					navigation: {
						type: "object"
					},
					/**
					 * Enhance the i18n bundle used for this page with one or more app specific i18n resource bundles or resource models
					 * or a combination of both. The last resource bundle/model is given highest priority
					 */
					enhanceI18n: {
						type: "string[]"
					},
					/**
					 * Define control related configuration settings
					 */
					controlConfiguration: {
						type: "object"
					},
					/**
					 * Adjusts the template content
					 */
					content: {
						type: "object"
					},
					/**
					 * Whether or not you can reach this page directly through semantic bookmarks
					 */
					allowDeepLinking: {
						type: "boolean"
					},
					/**
					 * Defines the context path on the component that is refreshed when the app is restored using keep alive mode
					 */
					refreshStrategyOnAppRestore: {
						type: "object"
					}
				},
				events: {
					containerDefined: {
						container: { type: "sap.ui.base.ManagedObject" }
					},
					heroesBatchReceived: {
						element: { type: "sap.ui.base.ManagedObject" }
					},
					workersBatchReceived: {
						element: { type: "sap.ui.base.ManagedObject" }
					}
				},
				library: "sap.fe.core"
			},

			setContainer: function(oContainer) {
				UIComponent.prototype.setContainer.apply(this, arguments);
				this.fireContainerDefined({ container: oContainer });
			},

			init: function() {
				this.oAppComponent = CommonUtils.getAppComponent(this);
				UIComponent.prototype.init.apply(this, arguments);
			},

			// This method is called by UI5 core to access to the component containing the customizing configuration.
			// as controller extensions are defined in the manifest for the app component and not for the
			// template component we return the app component.
			getExtensionComponent: function() {
				return this.oAppComponent;
			},

			onPageReady: function(mParameters) {
				if (this.getRootControl() && this.getRootControl().getController() && this.getRootControl().getController().onPageReady) {
					this.getRootControl()
						.getController()
						.onPageReady(mParameters);
				}
			},

			getNavigationConfiguration: function(sTargetPath) {
				var mNavigation = this.getNavigation();
				return mNavigation[sTargetPath];
			},

			getViewData: function() {
				var mProperties = this.getMetadata().getAllProperties();
				var oViewData = Object.keys(mProperties).reduce(
					function(mViewData, sPropertyName) {
						mViewData[sPropertyName] = mProperties[sPropertyName].get(this);
						return mViewData;
					}.bind(this),
					{}
				);

				// Access the internal _isFclEnabled which will be there
				oViewData.fclEnabled = this.oAppComponent._isFclEnabled();

				return oViewData;
			},

			_getPageTitleInformation: function() {
				if (
					this.getRootControl() &&
					this.getRootControl().getController() &&
					this.getRootControl().getController()._getPageTitleInformation
				) {
					return this.getRootControl()
						.getController()
						._getPageTitleInformation();
				} else {
					return Promise.resolve({});
				}
			},

			getExtensionAPI: function() {
				return this.getRootControl()
					.getController()
					.getExtensionAPI();
			}
		});
		return TemplateComponent;
	},
	/* bExport= */ true
);
