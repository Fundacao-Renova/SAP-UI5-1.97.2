/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(
	[
		"sap/base/Log",
		"sap/ui/model/json/JSONModel",
		"./RootContainerBaseController",
		"sap/f/FlexibleColumnLayoutSemanticHelper",
		"sap/ui/core/Component",
		"sap/fe/core/helpers/KeepAliveHelper",
		"sap/fe/core/controllerextensions/ViewState",
		"sap/m/Link",
		"sap/m/MessagePage",
		"sap/m/MessageBox"
	],
	function(
		Log,
		JSONModel,
		BaseController,
		FlexibleColumnLayoutSemanticHelper,
		Component,
		KeepAliveHelper,
		ViewState,
		Link,
		MessagePage,
		MessageBox
	) {
		"use strict";

		var CONSTANTS = {
			page: {
				names: ["BeginColumn", "MidColumn", "EndColumn"],
				currentGetter: {
					prefix: "getCurrent",
					suffix: "Page"
				},
				getter: {
					prefix: "get",
					suffix: "Pages"
				}
			}
		};

		var _getViewFromContainer = function(oContainer) {
			if (oContainer.isA("sap.ui.core.ComponentContainer")) {
				return oContainer.getComponentInstance().getRootControl();
			} else {
				return oContainer;
			}
		};

		/**
		 * @class Application developers should use this controller for the sap.fe.templates.RootContainer.view.Fcl view.
		 *
		 * This controller and its associated view provide the entry point for your application when using the flexible column layout in SAP Fiori elements.
		 * When used, you should declare a sap.f.routing.Router as `router` in your application manifest.
		 *
		 * @hideconstructor
		 * @public
		 * @name sap.fe.templates.RootContainer.controller.Fcl
		 */
		return BaseController.extend("sap.fe.templates.RootContainer.controller.Fcl", {
			viewState: ViewState.override({
				applyInitialStateOnly: function() {
					return false;
				},
				adaptBindingRefreshControls: function(aControls) {
					this.getView()
						.getController()
						._getAllVisibleViews()
						.forEach(function(oChildView) {
							var pChildView = new Promise(function(resolve) {
								resolve(oChildView);
							});
							aControls.push(pChildView);
						});
				},
				adaptStateControls: function(aStateControls) {
					this.getView()
						.getController()
						._getAllVisibleViews()
						.forEach(function(oChildView) {
							var pChildView = new Promise(function(resolve) {
								resolve(oChildView);
							});
							aStateControls.push(pChildView);
						});
				},
				onRestore: function() {
					var oView = this.getView(),
						oNavContainer = oView.byId("appContent");
					var oInternalModel = oNavContainer.getModel("internal");
					var oPages = oInternalModel.getProperty("/pages");

					for (var sComponentId in oPages) {
						oInternalModel.setProperty("/pages/" + sComponentId + "/restoreStatus", "pending");
					}
				},
				onSuspend: function() {
					var oFCLController = this.getView().getController();
					var oFCLControl = oFCLController.getFclControl();
					var aBeginColumnPages = oFCLControl.getBeginColumnPages() || [];
					var aMidColumnPages = oFCLControl.getMidColumnPages() || [];
					var aEndColumnPages = oFCLControl.getEndColumnPages() || [];
					var aPages = [].concat(aBeginColumnPages, aMidColumnPages, aEndColumnPages);

					aPages.forEach(function(oPage) {
						var oTargetView = _getViewFromContainer(oPage);

						var oController = oTargetView && oTargetView.getController();
						if (oController && oController.viewState && oController.viewState.onSuspend) {
							return oController.viewState.onSuspend();
						}
					});
				}
			}),

			/**
			 * @private
			 * @name sap.fe.templates.RootContainer.controller.Fcl.getMetadata
			 * @function
			 */

			onInit: function(oEvent) {
				BaseController.prototype.onInit.bind(this)();

				this._internalInit();
			},

			attachRouteMatchers: function() {
				this.getRouter().attachBeforeRouteMatched(this._getViewForNavigatedRowsComputation, this);
				BaseController.prototype.attachRouteMatchers.apply(this, arguments);

				this._internalInit();

				this.getRouter().attachBeforeRouteMatched(this.onBeforeRouteMatched, this);
				this.getRouter().attachRouteMatched(this.onRouteMatched, this);
				this.getFclControl().attachStateChange(this._saveLayout, this);
			},

			_internalInit: function() {
				if (this._oRouterProxy) {
					return; // Already initialized
				}

				this.sCurrentRouteName = "";
				this.sCurrentArguments = {};
				this.SQUERYKEYNAME = "?query";

				var oAppComponent = this.getAppComponent();

				this._oRouterProxy = oAppComponent.getRouterProxy();

				// Get FCL configuration in the manifest
				this._oFCLConfig = { maxColumnsCount: 3 };
				var oRoutingConfig = oAppComponent.getManifest()["sap.ui5"].routing;
				if (oRoutingConfig && oRoutingConfig.config) {
					if (oRoutingConfig.config.flexibleColumnLayout) {
						var oFCLManifestConfig = oRoutingConfig.config.flexibleColumnLayout;

						// Default layout for 2 columns
						if (oFCLManifestConfig.defaultTwoColumnLayoutType) {
							this._oFCLConfig.defaultTwoColumnLayoutType = oFCLManifestConfig.defaultTwoColumnLayoutType;
						}

						// Default layout for 3 columns
						if (oFCLManifestConfig.defaultThreeColumnLayoutType) {
							this._oFCLConfig.defaultThreeColumnLayoutType = oFCLManifestConfig.defaultThreeColumnLayoutType;
						}

						// Limit FCL to 2 columns ?
						if (oFCLManifestConfig.limitFCLToTwoColumns === true) {
							this._oFCLConfig.maxColumnsCount = 2;
						}
					}
					if (oRoutingConfig.config.controlAggregation) {
						this._oFCLConfig.defaultControlAggregation = oRoutingConfig.config.controlAggregation;
					}
				}

				this._initializeTargetAggregation(oAppComponent);
				this._initializeRoutesInformation(oAppComponent);
			},

			getFclControl: function() {
				return this.getView().getContent()[0];
			},

			_saveLayout: function(oEvent) {
				this.sPreviousLayout = oEvent.getParameters().layout;
			},

			/**
			 * Get the additionnal view (on top of the visible views), to be able to compute the latest table navigated rows of the most right visible view after a nav back or column fullscreen.
			 *
			 * @function
			 * @name sap.fe.templates.RootContainer.controller.Fcl.controller#_getRightMostViewBeforeRouteMatched
			 * @memberof sap.fe.templates.RootContainer.controller.Fcl.controller
			 *
			 */

			_getViewForNavigatedRowsComputation: function() {
				var aAllVisibleViewsBeforeRouteMatched = this._getAllVisibleViews(this.sPreviousLayout);
				var oRightMostViewBeforeRouteMatched = aAllVisibleViewsBeforeRouteMatched[aAllVisibleViewsBeforeRouteMatched.length - 1];
				var oRightMostView;
				var that = this;
				that.getRouter().attachEventOnce("routeMatched", function(oEvent) {
					oRightMostView = _getViewFromContainer(oEvent.getParameter("views")[oEvent.getParameter("views").length - 1]);
					if (oRightMostViewBeforeRouteMatched) {
						// Navigation forward from L2 to view level L3 (FullScreenLayout):
						if (oRightMostView.getViewData() && oRightMostView.getViewData().viewLevel === that._oFCLConfig.maxColumnsCount) {
							that.oAdditionalViewForNavRowsComputation = oRightMostView;
						}
						// Navigations backward from L3 down to L2, L1, L0 (ThreeColumn layout):
						if (
							oRightMostView.getViewData() &&
							oRightMostViewBeforeRouteMatched.getViewData() &&
							oRightMostViewBeforeRouteMatched.getViewData().viewLevel < that._oFCLConfig.maxColumnsCount &&
							oRightMostViewBeforeRouteMatched.getViewData() &&
							oRightMostViewBeforeRouteMatched.getViewData().viewLevel > oRightMostView.getViewData().viewLevel &&
							oRightMostView !== oRightMostViewBeforeRouteMatched
						) {
							that.oAdditionalViewForNavRowsComputation = oRightMostViewBeforeRouteMatched;
						}
					}
				});
			},

			getViewForNavigatedRowsComputation: function() {
				return this.oAdditionalViewForNavRowsComputation;
			},

			onExit: function() {
				this.getRouter().detachRouteMatched(this.onRouteMatched, this);
				this.getRouter().detachBeforeRouteMatched(this.onBeforeRouteMatched, this);
				this.getFclControl().detachStateChange(this.onStateChanged, this);
				this.getFclControl().detachAfterEndColumnNavigate(this.onStateChanged, this);
				this._oTargetsAggregation = null;
				this._oTargetsFromRoutePattern = null;

				BaseController.prototype.onExit.bind(this)();
			},

			/**
			 * Check if the FCL component is enabled.
			 *
			 * @function
			 * @name sap.fe.templates.RootContainer.controller.Fcl.controller#isFclEnabled
			 * @memberof sap.fe.templates.RootContainer.controller.Fcl.controller
			 * @returns {boolean} `true` since we are in FCL scenario
			 *
			 * @ui5-restricted
			 * @final
			 */
			isFclEnabled: function() {
				return true;
			},

			displayMessagePage: function(sErrorMessage, mParameters) {
				var oFCLControl = this.getFclControl();

				if (this._oFCLConfig && mParameters.FCLLevel >= this._oFCLConfig.maxColumnsCount) {
					mParameters.FCLLevel = this._oFCLConfig.maxColumnsCount - 1;
				}

				if (!this.aMessagePages) {
					this.aMessagePages = [null, null, null];
				}
				var oMessagePage = this.aMessagePages[mParameters.FCLLevel];
				if (!oMessagePage) {
					oMessagePage = new MessagePage({
						showHeader: false,
						icon: "sap-icon://message-error"
					});
					this.aMessagePages[mParameters.FCLLevel] = oMessagePage;

					switch (mParameters.FCLLevel) {
						case 0:
							oFCLControl.addBeginColumnPage(oMessagePage);
							break;

						case 1:
							oFCLControl.addMidColumnPage(oMessagePage);
							break;

						default:
							oFCLControl.addEndColumnPage(oMessagePage);
					}
				}

				oMessagePage.setText(sErrorMessage);

				if (mParameters.technicalMessage) {
					oMessagePage.setCustomDescription(
						new Link({
							text: mParameters.description || mParameters.technicalMessage,
							press: function() {
								MessageBox.show(mParameters.technicalMessage, {
									icon: MessageBox.Icon.ERROR,
									title: mParameters.title,
									actions: [MessageBox.Action.OK],
									defaultAction: MessageBox.Action.OK,
									details: mParameters.technicalDetails || "",
									contentWidth: "60%"
								});
							}
						})
					);
				} else {
					oMessagePage.setDescription(mParameters.description || "");
				}

				oFCLControl.to(oMessagePage.getId());
			},

			/**
			 * Initialize the object _oTargetsAggregation that defines for each route the relevant aggregation and pattern.
			 *
			 * @name sap.fe.templates.RootContainer.controller.Fcl.controller#_initializeTargetAggregation
			 * @memberof sap.fe.templates.RootContainer.controller.Fcl.controller
			 * @function
			 * @param {object} [oAppComponent] Reference to the AppComponent
			 */
			_initializeTargetAggregation: function(oAppComponent) {
				var oManifest = oAppComponent.getManifest(),
					oTargets = oManifest["sap.ui5"].routing ? oManifest["sap.ui5"].routing.targets : null,
					that = this;

				this._oTargetsAggregation = {};

				if (oTargets) {
					Object.keys(oTargets).forEach(function(sTargetName) {
						var oTarget = oTargets[sTargetName];
						if (oTarget.controlAggregation) {
							that._oTargetsAggregation[sTargetName] = {
								aggregation: oTarget.controlAggregation,
								pattern: oTarget.contextPattern
							};
						} else {
							that._oTargetsAggregation[sTargetName] = {
								aggregation: "page",
								pattern: null
							};
						}
					});
				}
			},

			/**
			 * Initializes the mapping between a route (identifed as its pattern) and the corresponding targets
			 *
			 * @name sap.fe.templates.RootContainer.controller.Fcl.controller#_initializeRoutesInformation
			 * @memberof sap.fe.templates.RootContainer.controller.Fcl.controller
			 * @function
			 * @param {object} [oAppComponent] ref to the AppComponent
			 */

			_initializeRoutesInformation: function(oAppComponent) {
				var oManifest = oAppComponent.getManifest(),
					aRoutes = oManifest["sap.ui5"].routing ? oManifest["sap.ui5"].routing.routes : null,
					that = this;

				this._oTargetsFromRoutePattern = {};

				if (aRoutes) {
					aRoutes.forEach(function(route) {
						that._oTargetsFromRoutePattern[route.pattern] = route.target;
					});
				}
			},

			getCurrentArgument: function() {
				return this.sCurrentArguments;
			},

			getCurrentRouteName: function() {
				return this.sCurrentRouteName;
			},

			/**
			 * Get FE FCL constant.
			 *
			 * @memberof sap.fe.templates.RootContainer.controller.Fcl.controller
			 * @returns {object}
			 */
			getConstants: function() {
				return CONSTANTS;
			},

			/**
			 * Getter for oTargetsAggregation array.
			 *
			 * @name sap.fe.templates.RootContainer.controller.Fcl.controller#getTargetAggregation
			 * @memberof sap.fe.templates.RootContainer.controller.Fcl.controller
			 * @function
			 * @returns {Array} The _oTargetsAggregation array
			 *
			 * @ui5-restricted
			 */
			getTargetAggregation: function() {
				return this._oTargetsAggregation;
			},

			/**
			 * Function triggered by the router RouteMatched event.
			 *
			 * @name sap.fe.templates.RootContainer.controller.Fcl.controller#onRouteMatched
			 * @memberof sap.fe.templates.RootContainer.controller.Fcl.controller
			 * @param {*} oEvent
			 */
			onRouteMatched: function(oEvent) {
				var sRouteName = oEvent.getParameter("name");

				// Save the current/previous routes and arguments
				this.sCurrentRouteName = sRouteName;
				this.sCurrentArguments = oEvent.getParameter("arguments");
			},

			/**
			 * This function is triggering the table scroll to the navigated row after each layout change.
			 *
			 * @name sap.fe.templates.RootContainer.controller.Fcl.controller#scrollToLastSelectedItem
			 * @memberof sap.fe.templates.RootContainer.controller.Fcl.controller
			 */

			_scrollTablesToLastNavigatedItems: function() {
				var aViews = this._getAllVisibleViews();
				//The scrolls are triggered only if the layout is with several columns or when switching the mostRight column in full screen
				if (aViews.length > 1 || aViews[0].getViewData().viewLevel < this._oFCLConfig.maxColumnsCount) {
					var sCurrentViewPath,
						oAdditionalView = this.getViewForNavigatedRowsComputation();
					if (oAdditionalView && aViews.indexOf(oAdditionalView) === -1) {
						aViews.push(oAdditionalView);
					}
					for (var index = aViews.length - 1; index > 0; index--) {
						var oView = aViews[index],
							oPreviousView = aViews[index - 1];
						if (oView.getBindingContext()) {
							sCurrentViewPath = oView.getBindingContext().getPath();
							oPreviousView.getController()._scrollTablesToRow(sCurrentViewPath);
						}
					}
				}
			},

			/**
			 * Function triggered by the FCL StateChanged event.
			 *
			 * @name sap.fe.templates.RootContainer.controller.Fcl.controller#onStateChanged
			 * @memberof sap.fe.templates.RootContainer.controller.Fcl.controller
			 * @param {*} oEvent
			 */
			onStateChanged: function(oEvent) {
				var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow");
				if (this.sCurrentArguments !== undefined) {
					if (!this.sCurrentArguments[this.SQUERYKEYNAME]) {
						this.sCurrentArguments[this.SQUERYKEYNAME] = {};
					}
					this.sCurrentArguments[this.SQUERYKEYNAME].layout = oEvent.getParameter("layout");
				}
				this._forceModelContextChangeOnBreadCrumbs(oEvent);

				// Replace the URL with the new layout if a navigation arrow was used
				if (bIsNavigationArrow) {
					this._oRouterProxy.navTo(this.sCurrentRouteName, this.sCurrentArguments);
				}
			},

			/**
			 * Function to fire ModelContextChange event on all breadcrumbs ( on each ObjectPages).
			 *
			 * @name sap.fe.templates.RootContainer.controller.Fcl.controller#_forceModelContextChangeOnBreadCrumbs
			 * @memberof sap.fe.templates.RootContainer.controller.Fcl.controller
			 * @param {*} oEvent
			 */
			_forceModelContextChangeOnBreadCrumbs: function(oEvent) {
				//force modelcontextchange on ObjectPages to refresh the breadcrumbs link hrefs
				var oFcl = oEvent.getSource(),
					oPages = [];
				oPages = oPages
					.concat(oFcl.getBeginColumnPages())
					.concat(oFcl.getMidColumnPages())
					.concat(oFcl.getEndColumnPages());
				oPages.forEach(function(oPage) {
					var oView = _getViewFromContainer(oPage);
					var oBreadCrumbs = oView.byId && oView.byId("breadcrumbs");
					if (oBreadCrumbs) {
						oBreadCrumbs.fireModelContextChange();
					}
				});
			},

			/**
			 * Function triggered to update the Share button Visibility.
			 *
			 * @memberof sap.fe.templates.RootContainer.controller.Fcl.controller
			 * @param {string} viewColumn Name of the current column ("beginColumn", "midColumn", "endColumn")
			 * @param {string} sLayout The current layout used by the FCL
			 * @returns {boolean}
			 */
			_updateShareButtonVisibility: function(viewColumn, sLayout) {
				var bShowShareIcon;
				switch (sLayout) {
					case "OneColumn":
						bShowShareIcon = viewColumn === "beginColumn";
						break;
					case "MidColumnFullScreen":
					case "ThreeColumnsBeginExpandedEndHidden":
					case "ThreeColumnsMidExpandedEndHidden":
					case "TwoColumnsBeginExpanded":
					case "TwoColumnsMidExpanded":
						bShowShareIcon = viewColumn === "midColumn";
						break;
					case "EndColumnFullScreen":
					case "ThreeColumnsEndExpanded":
					case "ThreeColumnsMidExpanded":
						bShowShareIcon = viewColumn === "endColumn";
						break;
					default:
						bShowShareIcon = false;
				}
				return bShowShareIcon;
			},

			updateUIStateForView: function(oView, FCLLevel) {
				var oUIState = this.getHelper().getCurrentUIState(),
					oFclColName = ["beginColumn", "midColumn", "endColumn"],
					sLayout = this.getFclControl().getLayout(),
					viewColumn;

				if (!oView.getModel("fclhelper")) {
					oView.setModel(this._createHelperModel(), "fclhelper");
				}
				if (FCLLevel >= this._oFCLConfig.maxColumnsCount) {
					// The view is on a level > max number of columns. It's always fullscreen without close/exit buttons
					viewColumn = oFclColName[this._oFCLConfig.maxColumnsCount - 1];
					oUIState.actionButtonsInfo.midColumn.fullScreen = null;
					oUIState.actionButtonsInfo.midColumn.exitFullScreen = null;
					oUIState.actionButtonsInfo.midColumn.closeColumn = null;
					oUIState.actionButtonsInfo.endColumn.exitFullScreen = null;
					oUIState.actionButtonsInfo.endColumn.fullScreen = null;
					oUIState.actionButtonsInfo.endColumn.closeColumn = null;
				} else {
					viewColumn = oFclColName[FCLLevel];
				}

				if (
					FCLLevel >= this._oFCLConfig.maxColumnsCount ||
					sLayout === "EndColumnFullScreen" ||
					sLayout === "MidColumnFullScreen" ||
					sLayout === "OneColumn"
				) {
					oView.getModel("fclhelper").setProperty("/breadCrumbIsVisible", true);
				} else {
					oView.getModel("fclhelper").setProperty("/breadCrumbIsVisible", false);
				}
				// Unfortunately, the FCLHelper doesn't provide actionButton values for the first column
				// so we have to add this info manually
				oUIState.actionButtonsInfo.beginColumn = { fullScreen: null, exitFullScreen: null, closeColumn: null };

				var oActionButtonInfos = Object.assign({}, oUIState.actionButtonsInfo[viewColumn]);
				oActionButtonInfos.switchVisible = oActionButtonInfos.fullScreen !== null || oActionButtonInfos.exitFullScreen !== null;
				oActionButtonInfos.switchIcon =
					oActionButtonInfos.fullScreen !== null ? "sap-icon://full-screen" : "sap-icon://exit-full-screen";
				oActionButtonInfos.isFullScreen = oActionButtonInfos.fullScreen === null;

				oView.getModel("fclhelper").setProperty("/actionButtonsInfo", oActionButtonInfos);

				oView.getModel("fclhelper").setProperty("/showShareIcon", this._updateShareButtonVisibility(viewColumn, sLayout));
			},

			/**
			 * Function triggered by the router BeforeRouteMatched event.
			 *
			 * @name sap.fe.templates.RootContainer.controller.Fcl.controller#onBeforeRouteMatched
			 * @memberof sap.fe.templates.RootContainer.controller.Fcl.controller
			 * @param {*} oEvent
			 */
			onBeforeRouteMatched: function(oEvent) {
				if (oEvent) {
					var oQueryParams = oEvent.getParameters().arguments[this.SQUERYKEYNAME];
					var sLayout = oQueryParams ? oQueryParams.layout : null;

					// If there is no layout parameter, query for the default level 0 layout (normally OneColumn)
					if (!sLayout) {
						var oNextUIState = this.getHelper().getNextUIState(0);
						sLayout = oNextUIState.layout;
					}

					// Check if the layout if compatible with the number of targets
					// This should always be the case for normal navigation, just needed in case
					// the URL has been manually modified
					var aTargets = oEvent.getParameter("config").target;
					sLayout = this._correctLayoutForTargets(sLayout, aTargets);

					// Update the layout of the FlexibleColumnLayout
					if (sLayout) {
						this.getFclControl().setLayout(sLayout);
					}
				}
			},

			/**
			 * Helper for the FCL Component.
			 *
			 * @name sap.fe.templates.RootContainer.controller.Fcl.controller#getHelper
			 * @memberof sap.fe.templates.RootContainer.controller.Fcl.controller
			 * @returns {object} Instance of a semantic helper
			 */
			getHelper: function() {
				return FlexibleColumnLayoutSemanticHelper.getInstanceFor(this.getFclControl(), this._oFCLConfig);
			},

			/**
			 * Calculates the FCL layout for a given FCL level and a target hash.
			 *
			 * @param {integer} iNextFCLLevel FCL level to be navigated to
			 * @param {string} sHash The hash to be navigated to
			 * @param {string} [sProposedLayout] The proposed layout
			 * @returns {object}
			 */
			calculateLayout: function(iNextFCLLevel, sHash, sProposedLayout) {
				// First, ask the FCL helper to calculate the layout in nothing is proposed
				if (!sProposedLayout) {
					sProposedLayout = this.getHelper().getNextUIState(iNextFCLLevel).layout;
				}

				// Then change this value if necessary, based on the number of targets
				var oRoute = this.getRouter().getRouteByHash(sHash + "?layout=" + sProposedLayout);
				var aTargets = this._oTargetsFromRoutePattern[oRoute.getPattern()];

				return this._correctLayoutForTargets(sProposedLayout, aTargets);
			},

			/**
			 * Checks whether a given FCL layout is compatible with an array of targets.
			 *
			 * @param {*} sProposedLayout Proposed value for the FCL layout
			 * @param {*} aTargets Array of target names used for checking
			 * @returns {string} The corrected layout
			 */
			_correctLayoutForTargets: function(sProposedLayout, aTargets) {
				var allAllowedLayouts = {
					"2": ["TwoColumnsMidExpanded", "TwoColumnsBeginExpanded", "MidColumnFullScreen"],
					"3": [
						"ThreeColumnsMidExpanded",
						"ThreeColumnsEndExpanded",
						"ThreeColumnsMidExpandedEndHidden",
						"ThreeColumnsBeginExpandedEndHidden",
						"MidColumnFullScreen",
						"EndColumnFullScreen"
					]
				};

				if (aTargets && !Array.isArray(aTargets)) {
					// To support single target as a string in the manifest
					aTargets = [aTargets];
				}

				if (!aTargets) {
					// Defensive, just in case...
					return sProposedLayout;
				} else if (aTargets.length > 1) {
					// More than 1 target: just simply check from the allowed values
					var aLayouts = allAllowedLayouts[aTargets.length];
					if (aLayouts.indexOf(sProposedLayout) < 0) {
						// The proposed layout isn't compatible with the number of columns
						// --> Ask the helper for the default layout for the number of columns
						sProposedLayout = aLayouts[0]; //this.getHelper().getNextUIState(aTargets.length - 1).layout;
					}
				} else {
					// Only one target
					var sTargetAggregation =
						this.getTargetAggregation()[aTargets[0]].aggregation || this._oFCLConfig.defaultControlAggregation;
					switch (sTargetAggregation) {
						case "beginColumnPages":
							sProposedLayout = "OneColumn";
							break;
						case "midColumnPages":
							sProposedLayout = "MidColumnFullScreen";
							break;
						case "endColumnPages":
							sProposedLayout = "EndColumnFullScreen";
							break;
					}
				}

				return sProposedLayout;
			},

			/**
			 * get all visible views in the FCL component.
			 * sLayout optional parameter is very specific as part of the calculation of the latest navigated row
			 *
			 * @param {*} sLayout Layout that was applied just before the current navigation
			 * @returns {Array} return views
			 */

			_getAllVisibleViews: function(sLayout) {
				var aViews = [];
				sLayout = !!sLayout ? sLayout : this.getFclControl().getLayout();
				switch (sLayout) {
					case sap.f.LayoutType.EndColumnFullScreen:
						if (this.getFclControl().getCurrentEndColumnPage()) {
							aViews.push(_getViewFromContainer(this.getFclControl().getCurrentEndColumnPage()));
						}
						break;

					case sap.f.LayoutType.MidColumnFullScreen:
						if (this.getFclControl().getCurrentMidColumnPage()) {
							aViews.push(_getViewFromContainer(this.getFclControl().getCurrentMidColumnPage()));
						}
						break;

					case sap.f.LayoutType.OneColumn:
						if (this.getFclControl().getCurrentBeginColumnPage()) {
							aViews.push(_getViewFromContainer(this.getFclControl().getCurrentBeginColumnPage()));
						}
						break;

					case sap.f.LayoutType.ThreeColumnsEndExpanded:
					case sap.f.LayoutType.ThreeColumnsMidExpanded:
						if (this.getFclControl().getCurrentBeginColumnPage()) {
							aViews.push(_getViewFromContainer(this.getFclControl().getCurrentBeginColumnPage()));
						}
						if (this.getFclControl().getCurrentMidColumnPage()) {
							aViews.push(_getViewFromContainer(this.getFclControl().getCurrentMidColumnPage()));
						}
						if (this.getFclControl().getCurrentEndColumnPage()) {
							aViews.push(_getViewFromContainer(this.getFclControl().getCurrentEndColumnPage()));
						}
						break;

					case sap.f.LayoutType.TwoColumnsBeginExpanded:
					case sap.f.LayoutType.TwoColumnsMidExpanded:
					case sap.f.LayoutType.ThreeColumnsMidExpandedEndHidden:
					case sap.f.LayoutType.ThreeColumnsBeginExpandedEndHidden:
						if (this.getFclControl().getCurrentBeginColumnPage()) {
							aViews.push(_getViewFromContainer(this.getFclControl().getCurrentBeginColumnPage()));
						}
						if (this.getFclControl().getCurrentMidColumnPage()) {
							aViews.push(_getViewFromContainer(this.getFclControl().getCurrentMidColumnPage()));
						}
						break;

					default:
						Log.error("Unhandled switch case for " + this.getFclControl().getLayout());
				}

				return aViews;
			},

			onContainerReady: function() {
				// Restore views if neccessary.
				var aViews = this._getAllVisibleViews();
				var aRestorePromises = [];
				aViews.reduce(function(aPromises, oTargetView) {
					aPromises.push(KeepAliveHelper.restoreView(oTargetView));
					return aPromises;
				}, aRestorePromises);
				return Promise.all(aRestorePromises);
			},
			
			getRightmostContext: function() {
				var oContext;
				switch (this.getFclControl().getLayout()) {
					case sap.f.LayoutType.OneColumn:
						if (this.getFclControl().getCurrentBeginColumnPage()) {
							oContext = _getViewFromContainer(this.getFclControl().getCurrentBeginColumnPage()).getBindingContext();
						}
						break;

					case sap.f.LayoutType.TwoColumnsBeginExpanded:
					case sap.f.LayoutType.TwoColumnsMidExpanded:
						if (this.getFclControl().getCurrentMidColumnPage()) {
							oContext = _getViewFromContainer(this.getFclControl().getCurrentMidColumnPage()).getBindingContext();
						}
						break;

					case sap.f.LayoutType.ThreeColumnsEndExpanded:
					case sap.f.LayoutType.ThreeColumnsMidExpanded:
					case sap.f.LayoutType.ThreeColumnsMidExpandedEndHidden:
					case sap.f.LayoutType.ThreeColumnsBeginExpandedEndHidden:
					case sap.f.LayoutType.EndColumnFullScreen:
						if (this.getFclControl().getCurrentEndColumnPage()) {
							oContext = _getViewFromContainer(this.getFclControl().getCurrentEndColumnPage()).getBindingContext();
						}
						break;

					case sap.f.LayoutType.MidColumnFullScreen:
						// In this case we need to determine if this mid column fullscreen comes from a 2 or a 3 column layout
						var sLayoutWhenExitFullScreen = this.getHelper().getCurrentUIState().actionButtonsInfo.midColumn.exitFullScreen;
						if (sLayoutWhenExitFullScreen.indexOf("ThreeColumn") >= 0) {
							// We come from a 3 column layout
							if (this.getFclControl().getCurrentEndColumnPage()) {
								oContext = _getViewFromContainer(this.getFclControl().getCurrentEndColumnPage()).getBindingContext();
							}
						} else {
							// We come from a 2 column layout
							if (this.getFclControl().getCurrentMidColumnPage()) {
								oContext = _getViewFromContainer(this.getFclControl().getCurrentMidColumnPage()).getBindingContext();
							}
						}
						break;

					default:
						Log.error("Unhandled switch case for " + this.getFclControl().getLayout());
				}

				return oContext;
			}
		});
	},
	true
);
