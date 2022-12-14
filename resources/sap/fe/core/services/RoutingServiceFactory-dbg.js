/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(
	[
		"sap/ui/core/service/Service",
		"sap/ui/core/service/ServiceFactory",
		"sap/ui/core/Component",
		"sap/ui/base/BindingParser",
		"sap/fe/core/helpers/SemanticKeyHelper",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/base/Log",
		"sap/ui/base/EventProvider",
		"sap/fe/core/BusyLocker",
		"sap/fe/core/helpers/ModelHelper",
		"sap/fe/core/helpers/EditState",
		"sap/fe/core/actions/messageHandling",
		"sap/fe/core/controllerextensions/Placeholder"
	],
	function(
		Service,
		ServiceFactory,
		Component,
		BindingParser,
		SemanticKeyHelper,
		Filter,
		FilterOperator,
		Log,
		EventProvider,
		BusyLocker,
		ModelHelper,
		EditState,
		MessageHandling,
		Placeholder
	) {
		"use strict";

		var RoutingServiceEventing = EventProvider.extend("sap.fe.core.services.RoutingServiceEventing", {
			metadata: {
				events: {
					"routeMatched": {},
					"afterRouteMatched": {}
				}
			}
		});

		var RoutingService = Service.extend("sap.fe.core.services.RoutingService", {
			/**
			 * Initialize the routing service.
			 */
			init: function() {
				var that = this;
				var oContext = this.getContext();
				if (oContext.scopeType === "component") {
					this.oAppComponent = oContext.scopeObject;
					this.oModel = this.oAppComponent.getModel();
					this.oMetaModel = this.oModel.getMetaModel();
					this.oRouter = this.oAppComponent.getRouter();
					this.oRouterProxy = this.oAppComponent.getRouterProxy();
					this.eventProvider = new RoutingServiceEventing();

					var oRoutingConfig = this.oAppComponent.getManifestEntry("/sap.ui5/routing");
					var oRootViewConfig = this.oAppComponent.getManifestEntry("/sap.ui5/rootView");
					this._parseRoutingConfiguration(oRoutingConfig, oRootViewConfig);

					var oAppConfig = this.oAppComponent.getManifestEntry("/sap.app");
					this.outbounds = oAppConfig && oAppConfig.crossNavigation && oAppConfig.crossNavigation.outbounds;
				}

				this.initPromise = Promise.resolve(that);
			},

			exit: function() {
				this.oRouter.detachRouteMatched(this._fnOnRouteMatched);
				this.eventProvider.fireEvent("routeMatched", {});
				this.eventProvider.destroy();
			},

			/**
			 * Parse a manifest routing configuration for internal usage.
			 *
			 * @param {object} oRoutingConfig The routing configuration from the manifest
			 * @param {object} oRootViewConfig The root view configuration from the manifest
			 * @private
			 */
			_parseRoutingConfiguration: function(oRoutingConfig, oRootViewConfig) {
				var that = this,
					isFCL = oRootViewConfig && oRootViewConfig.viewName === "sap.fe.templates.RootContainer.view.Fcl";

				// Information of targets
				this._mTargets = {};
				Object.keys(oRoutingConfig.targets).forEach(function(sTargetName) {
					that._mTargets[sTargetName] = Object.assign({ targetName: sTargetName }, oRoutingConfig.targets[sTargetName]);

					// View level for FCL cases is calculated from the target pattern
					if (that._mTargets[sTargetName].contextPattern !== undefined) {
						that._mTargets[sTargetName].viewLevel = that._getViewLevelFromPattern(
							that._mTargets[sTargetName].contextPattern,
							0
						);
					}
				});

				// Information of routes
				this._mRoutes = {};
				for (var sRouteKey in oRoutingConfig.routes) {
					var oRouteManifestInfo = oRoutingConfig.routes[sRouteKey],
						aRouteTargets = Array.isArray(oRouteManifestInfo.target) ? oRouteManifestInfo.target : [oRouteManifestInfo.target],
						sRouteName = Array.isArray(oRoutingConfig.routes) ? oRouteManifestInfo.name : sRouteKey,
						sRoutePattern = oRouteManifestInfo.pattern;

					// Check route pattern: all patterns need to end with ':?query:', that we use for parameters
					if (sRoutePattern.length < 8 || sRoutePattern.indexOf(":?query:") !== sRoutePattern.length - 8) {
						Log.error("Pattern for route " + sRouteName + " doesn't end with ':?query:' : " + sRoutePattern);
					}
					var iRouteLevel = that._getViewLevelFromPattern(sRoutePattern, 0);
					that._mRoutes[sRouteName] = {
						name: sRouteName,
						pattern: sRoutePattern,
						targets: aRouteTargets,
						routeLevel: iRouteLevel
					};

					// Add the parent targets in the list of targets for the route
					for (var i = 0; i < aRouteTargets.length; i++) {
						var sParentTargetName = that._mTargets[aRouteTargets[i]].parent;
						if (sParentTargetName) {
							aRouteTargets.push(sParentTargetName);
						}
					}

					if (!isFCL) {
						// View level for non-FCL cases is calculated from the route pattern
						if (
							that._mTargets[aRouteTargets[0]].viewLevel === undefined ||
							that._mTargets[aRouteTargets[0]].viewLevel < iRouteLevel
						) {
							// There are cases when different routes point to the same target. We take the
							// largest viewLevel in that case.
							that._mTargets[aRouteTargets[0]].viewLevel = iRouteLevel;
						}

						// FCL level for non-FCL cases is equal to -1
						that._mTargets[aRouteTargets[0]].FCLLevel = -1;
					} else if (aRouteTargets.length === 1 && that._mTargets[aRouteTargets[0]].controlAggregation !== "beginColumnPages") {
						// We're in the case where there's only 1 target for the route, and it's not in the first column
						// --> this is a fullscreen column after all columns in the FCL have been used
						that._mTargets[aRouteTargets[0]].FCLLevel = 3;
					} else {
						// Other FCL cases
						aRouteTargets.forEach(function(sTargetName) {
							switch (that._mTargets[sTargetName].controlAggregation) {
								case "beginColumnPages":
									that._mTargets[sTargetName].FCLLevel = 0;
									break;

								case "midColumnPages":
									that._mTargets[sTargetName].FCLLevel = 1;
									break;

								default:
									that._mTargets[sTargetName].FCLLevel = 2;
							}
						});
					}
				}

				// Propagate viewLevel, contextPattern, FCLLevel and controlAggregation to parent targets
				Object.keys(that._mTargets).forEach(function(sTargetName) {
					while (that._mTargets[sTargetName].parent) {
						var sParentTargetName = that._mTargets[sTargetName].parent;
						that._mTargets[sParentTargetName].viewLevel =
							that._mTargets[sParentTargetName].viewLevel || that._mTargets[sTargetName].viewLevel;
						that._mTargets[sParentTargetName].contextPattern =
							that._mTargets[sParentTargetName].contextPattern || that._mTargets[sTargetName].contextPattern;
						that._mTargets[sParentTargetName].FCLLevel =
							that._mTargets[sParentTargetName].FCLLevel || that._mTargets[sTargetName].FCLLevel;
						that._mTargets[sParentTargetName].controlAggregation =
							that._mTargets[sParentTargetName].controlAggregation || that._mTargets[sTargetName].controlAggregation;
						sTargetName = sParentTargetName;
					}
				});

				// Determine the root entity for the app
				var aLevel0RouteNames = [],
					aLevel1RouteNames = [],
					sDefaultRouteName;

				for (var sName in that._mRoutes) {
					var iLevel = that._mRoutes[sName].routeLevel;
					if (iLevel === 0) {
						aLevel0RouteNames.push(sName);
					} else if (iLevel === 1) {
						aLevel1RouteNames.push(sName);
					}
				}

				if (aLevel0RouteNames.length === 1) {
					sDefaultRouteName = aLevel0RouteNames[0];
				} else if (aLevel1RouteNames.length === 1) {
					sDefaultRouteName = aLevel1RouteNames[0];
				}

				if (sDefaultRouteName) {
					var sDefaultTargetName = that._mRoutes[sDefaultRouteName].targets.slice(-1)[0];
					that.sContextPath = "";
					if (that._mTargets[sDefaultTargetName].options && that._mTargets[sDefaultTargetName].options.settings) {
						var oSettings = that._mTargets[sDefaultTargetName].options.settings;
						that.sContextPath = oSettings.contextPath || "/" + oSettings.entitySet;
					}
					if (!that.sContextPath) {
						Log.error(
							"Cannot determine default contextPath: contextPath or entitySet missing in default target: " +
								sDefaultTargetName
						);
					}
				} else {
					Log.error("Cannot determine default contextPath: no default route found.");
				}

				// We need to establish the correct path to the different pages, including the navigation properties
				Object.keys(that._mTargets)
					.map(function(sTargetKey) {
						return that._mTargets[sTargetKey];
					})
					.sort(function(a, b) {
						return a.viewLevel < b.viewLevel ? -1 : 1;
					})
					.forEach(function(target) {
						// After sorting the targets per level we can then go through their navigation object and update the paths accordingly.
						if (target.options) {
							var settings = target.options.settings;
							var sContextPath = settings.contextPath || (settings.entitySet ? "/" + settings.entitySet : "");
							if (!settings.fullContextPath && sContextPath) {
								if (target.viewLevel === 0 || target.viewLevel === undefined) {
									settings.fullContextPath = "/";
								} else {
									settings.fullContextPath = sContextPath + "/";
								}
							}
							Object.keys(settings.navigation || {}).forEach(function(sNavName) {
								// Check if it's a navigation property
								var targetRoute = that._mRoutes[settings.navigation[sNavName].detail.route];
								if (targetRoute && targetRoute.targets) {
									targetRoute.targets.forEach(function(sTargetName) {
										if (
											that._mTargets[sTargetName].options &&
											that._mTargets[sTargetName].options.settings &&
											!that._mTargets[sTargetName].options.settings.fullContextPath
										) {
											var targetNav;
											if (sNavName.startsWith("/")) {
												targetNav = sNavName;
											} else {
												targetNav = settings.fullContextPath + sNavName;
											}
											that._mTargets[sTargetName].options.settings.fullContextPath = targetNav + "/";
										}
									});
								}
							});
						}
					});
			},

			/**
			 * Calculates a view level from a pattern by counting the number of segments.
			 *
			 * @param {string} sPattern The pattern
			 * @param {number} viewLevel The current level of view
			 * @returns {number} The level
			 */
			_getViewLevelFromPattern: function(sPattern, viewLevel) {
				sPattern = sPattern.replace(":?query:", "");
				var regex = new RegExp("/[^/]*$");
				if (sPattern && sPattern[0] !== "/" && sPattern[0] !== "?") {
					sPattern = "/" + sPattern;
				}
				if (sPattern.length) {
					sPattern = sPattern.replace(regex, "");
					if (this.oRouter.match(sPattern) || sPattern === "") {
						return this._getViewLevelFromPattern(sPattern, ++viewLevel);
					} else {
						return this._getViewLevelFromPattern(sPattern, viewLevel);
					}
				} else {
					return viewLevel;
				}
			},

			_getRouteInformation: function(sRouteName) {
				return this._mRoutes[sRouteName];
			},

			_getTargetInformation: function(sTargetName) {
				return this._mTargets[sTargetName];
			},

			_getComponentId: function(sOwnerId, sComponentId) {
				if (sComponentId.indexOf(sOwnerId + "---") === 0) {
					return sComponentId.substr(sOwnerId.length + 3);
				}
				return sComponentId;
			},

			/**
			 * Get target information for a given component.
			 *
			 * @param {object} oComponentInstance Instance of the component
			 * @returns {object} The configuration for the target
			 */
			getTargetInformationFor: function(oComponentInstance) {
				var sTargetComponentId = this._getComponentId(oComponentInstance._sOwnerId, oComponentInstance.getId());
				var that = this;
				var sCorrectTargetName = null;
				Object.keys(this._mTargets).forEach(function(sTargetName) {
					if (
						that._mTargets[sTargetName].id === sTargetComponentId ||
						that._mTargets[sTargetName].viewId === sTargetComponentId
					) {
						sCorrectTargetName = sTargetName;
					}
				});
				return this._getTargetInformation(sCorrectTargetName);
			},

			getLastSemanticMapping: function() {
				return this.oLastSemanticMapping;
			},

			setLastSemanticMapping: function(oMapping) {
				this.oLastSemanticMapping = oMapping;
			},

			navigateTo: function(oContext, sRouteName, mParameterMapping, bPreserveHistory) {
				var sTargetURLPromise;
				if (!mParameterMapping) {
					// if there is no parameter mapping define this mean we rely entirely on the binding context path
					sTargetURLPromise = Promise.resolve(SemanticKeyHelper.getSemanticPath(oContext));
				} else {
					sTargetURLPromise = this.prepareParameters(mParameterMapping, sRouteName, oContext).then(
						function(mParameters) {
							return this.oRouter.getURL(sRouteName, mParameters);
						}.bind(this)
					);
				}
				return sTargetURLPromise.then(
					function(sTargetURL) {
						this.oRouterProxy.navToHash(sTargetURL, bPreserveHistory);
					}.bind(this)
				);
			},

			/**
			 * Method to return a map of routing target parameters where the binding syntax is resolved to the current model.
			 *
			 * @param {object} mParameters Parameters map in the format [k: string] : ComplexBindingSyntax
			 * @param {string} sTargetRoute Name of the target route
			 * @param {object} oContext The instance of the binding context
			 * @returns {Promise} A promise which resolves to the routing target parameters
			 */
			prepareParameters: function(mParameters, sTargetRoute, oContext) {
				var oParametersPromise;
				try {
					var sContextPath = oContext.getPath();
					var aContextPathParts = sContextPath.split("/");
					var aAllResolvedParameterPromises = Object.keys(mParameters).map(
						function(sParameterKey) {
							var sParameterMappingExpression = mParameters[sParameterKey];
							// We assume the defined parameters will be compatible with a binding expression
							var oParsedExpression = BindingParser.complexParser(sParameterMappingExpression);
							var aParts = oParsedExpression.parts || [oParsedExpression];
							var aResolvedParameterPromises = aParts.map(function(oPathPart) {
								var aRelativeParts = oPathPart.path.split("../");
								// We go up the current context path as many times as necessary
								var aLocalParts = aContextPathParts.slice(0, aContextPathParts.length - aRelativeParts.length + 1);
								aLocalParts.push(aRelativeParts[aRelativeParts.length - 1]);
								return oContext.requestProperty(aLocalParts.join("/"));
							});

							return Promise.all(aResolvedParameterPromises).then(
								function(aResolvedParameters) {
									var value = oParsedExpression.formatter
										? oParsedExpression.formatter.apply(this, aResolvedParameters)
										: aResolvedParameters.join("");
									return { key: sParameterKey, value: value };
								}.bind(this)
							);
						}.bind(this)
					);

					oParametersPromise = Promise.all(aAllResolvedParameterPromises).then(function(aAllResolvedParameters) {
						var oParameters = {};
						aAllResolvedParameters.forEach(function(oResolvedParameter) {
							oParameters[oResolvedParameter.key] = oResolvedParameter.value;
						});
						return oParameters;
					});
				} catch (oError) {
					Log.error("Could not parse the parameters for the navigation to route " + sTargetRoute);
					oParametersPromise = Promise.resolve(undefined);
				}
				return oParametersPromise;
			},

			_fireRouteMatchEvents: function(mParameters) {
				this.eventProvider.fireEvent("routeMatched", mParameters);
				this.eventProvider.fireEvent("afterRouteMatched", mParameters);

				EditState.cleanProcessedEditState(); // Reset UI state when all bindings have been refreshed
			},

			/**
			 * Navigates to a context.
			 *
			 * @param {sap.ui.model.odata.v4.Context} oContext The Context to be navigated to
			 * @param {object} [mParameters] Optional, map containing the following attributes:
			 * @param {boolean} [mParameters.checkNoHashChange] Navigate to the context without changing the URL
			 * @param {Promise} [mParameters.asyncContext] The context is created async, navigate to (...) and
			 *                    wait for Promise to be resolved and then navigate into the context
			 * @param {boolean} [mParameters.bDeferredContext] The context shall be created deferred at the target page
			 * @param {boolean} [mParameters.editable] The target page shall be immediately in the edit mode to avoid flickering
			 * @param {boolean} [mParameters.bPersistOPScroll] The bPersistOPScroll will be used for scrolling to first tab
			 * @param {number} [mParameters.updateFCLLevel] `+1` if we add a column in FCL, `-1` to remove a column, 0 to stay on the same column
			 * @param {boolean} [mParameters.noPreservationCache] Do navigation without taking into account the preserved cache mechanism
			 * @param {boolean} [mParameters.bRecreateContext] Force re-creation of the context instead of using the one passed as parameter
			 * @param {boolean} [mParameters.bForceFocus] Forces focus selection after navigation
			 * @param {object} [oViewData] View data
			 * @param {object} [oCurrentTargetInfo] The target information from which the navigation is triggered
			 * @returns {Promise} Promise which is resolved once the navigation is triggered
			 *
			 * @ui5-restricted
			 * @final
			 */
			navigateToContext: function(oContext, mParameters, oViewData, oCurrentTargetInfo) {
				var sTargetRoute, oRouteParametersPromise;

				// Manage parameter mapping
				if (mParameters.targetPath && oViewData && oViewData.navigation) {
					var oRouteDetail = oViewData.navigation[mParameters.targetPath].detail;
					sTargetRoute = oRouteDetail.route;

					if (oRouteDetail.parameters) {
						oRouteParametersPromise = this.prepareParameters(oRouteDetail.parameters, sTargetRoute, oContext);
					}
				}

				var sTargetPath = this._getPathFromContext(oContext, mParameters);
				// If the path is empty, we're supposed to navigate to the first page of the app
				// Check if we need to exit from the app instead
				if (sTargetPath.length === 0 && this.bExitOnNavigateBackToRoot) {
					return this.oRouterProxy.exitFromApp();
				}

				// If the context is deferred or async, we add (...) to the path
				if (mParameters.asyncContext || mParameters.bDeferredContext) {
					sTargetPath += "(...)";
				}

				// Add layout parameter if needed
				var sLayout = this._calculateLayout(sTargetPath, mParameters);
				if (sLayout) {
					sTargetPath += "?layout=" + sLayout;
				}

				// Navigation parameters for later usage
				var oNavigationInfo = {
					oAsyncContext: mParameters.asyncContext,
					bDeferredContext: mParameters.bDeferredContext,
					bTargetEditable: mParameters.editable,
					bPersistOPScroll: mParameters.bPersistOPScroll,
					useContext: mParameters.updateFCLLevel === -1 || mParameters.bRecreateContext ? undefined : oContext,
					bDraftNavigation: mParameters.bDraftNavigation,
					bShowPlaceholder: mParameters.showPlaceholder !== undefined ? mParameters.showPlaceholder : true
				};

				if (mParameters.checkNoHashChange) {
					// Check if the new hash is different from the current one
					var sCurrentHashNoAppState = this.oRouterProxy.getHash().replace(/[&?]{1}sap-iapp-state=[A-Z0-9]+/, "");
					if (sTargetPath === sCurrentHashNoAppState) {
						// The hash doesn't change, but we fire the routeMatch event to trigger page refresh / binding
						var mEventParameters = this.oRouter.getRouteInfoByHash(this.oRouterProxy.getHash());
						mEventParameters.navigationInfo = oNavigationInfo;
						mEventParameters.routeInformation = this._getRouteInformation(this.sCurrentRouteName);
						mEventParameters.routePattern = this.sCurrentRoutePattern;
						mEventParameters.views = this.aCurrentViews;
						this.oRouterProxy.setFocusForced(mParameters.bForceFocus);

						this._fireRouteMatchEvents(mEventParameters);

						return Promise.resolve();
					}
				}

				if (mParameters.transient && mParameters.editable == true && sTargetPath.indexOf("(...)") === -1) {
					if (sTargetPath.indexOf("?") > -1) {
						sTargetPath += "&i-action=create";
					} else {
						sTargetPath += "?i-action=create";
					}
				}

				// Clear unbound messages upon navigating from LR to OP
				// This is to ensure stale error messages from LR are not shown to the user after navigation to OP.
				if (oCurrentTargetInfo && oCurrentTargetInfo.name === "sap.fe.templates.ListReport") {
					var oRouteInfo = this.oRouter.getRouteInfoByHash(sTargetPath);
					if (oRouteInfo) {
						var oRoute = this._getRouteInformation(oRouteInfo.name);
						if (oRoute && oRoute.targets && oRoute.targets.length > 0) {
							var sLastTargetName = oRoute.targets[oRoute.targets.length - 1];
							var oTarget = this._getTargetInformation(sLastTargetName);
							if (oTarget && oTarget.name === "sap.fe.templates.ObjectPage") {
								MessageHandling.removeUnboundTransitionMessages();
							}
						}
					}
				}

				// Add the navigation parameters in the queue
				this.navigationInfoQueue.push(oNavigationInfo);

				if (sTargetRoute && oRouteParametersPromise) {
					return oRouteParametersPromise.then(
						function(oRouteParameters) {
							this.oRouter.navTo(sTargetRoute, oRouteParameters);
							return Promise.resolve();
						}.bind(this)
					);
				}
				return this.oRouterProxy.navToHash(sTargetPath, false, mParameters.noPreservationCache, mParameters.bForceFocus);
			},

			/**
			 * Checks if one of the current views on the screen is bound to a given context.
			 *
			 * @param {sap.ui.model.odata.v4.Context} oContext The context
			 * @returns {boolean} `true` or `false` if the current state is impacted or not
			 */
			isCurrentStateImpactedBy: function(oContext) {
				var sPath = oContext.getPath();

				// First, check with the technical path. We have to try it, because for level > 1, we
				// uses technical keys even if Semantic keys are enabled
				if (this.oRouterProxy.isCurrentStateImpactedBy(sPath)) {
					return true;
				} else if (/^[^\(\)]+\([^\(\)]+\)$/.test(sPath)) {
					// If the current path can be semantic (i.e. is like xxx(yyy))
					// check with the semantic path if we can find it
					var sSemanticPath;
					if (this.oLastSemanticMapping && this.oLastSemanticMapping.technicalPath === sPath) {
						// We have already resolved this semantic path
						sSemanticPath = this.oLastSemanticMapping.semanticPath;
					} else {
						sSemanticPath = SemanticKeyHelper.getSemanticPath(oContext);
					}

					return sSemanticPath != sPath ? this.oRouterProxy.isCurrentStateImpactedBy(sSemanticPath) : false;
				} else {
					return false;
				}
			},

			_findPathToNavigate: function(sPath) {
				var regex = new RegExp("/[^/]*$");
				sPath = sPath.replace(regex, "");
				if (this.oRouter.match(sPath) || sPath === "") {
					return sPath;
				} else {
					return this._findPathToNavigate(sPath);
				}
			},

			_checkContextForSemanticPath: function(oContext) {
				var sPath = oContext.getPath();

				// First, check if this is a level-1 object (path = /aaa(bbb))
				if (!/^\/[^\(]+\([^\)]+\)$/.test(sPath)) {
					return false;
				}

				// Then check if the entity has semantic keys
				var oMetaModel = oContext.getModel().getMetaModel(),
					sEntitySetName = oMetaModel.getMetaContext(oContext.getPath()).getObject("@sapui.name");
				if (!SemanticKeyHelper.getSemanticKeys(oMetaModel, sEntitySetName)) {
					return false;
				}

				// Then check the entity is draft-enabled
				return ModelHelper.isDraftSupported(oMetaModel, sPath);
			},

			_getPathFromContext: function(oContext, mParameters) {
				var sPath;

				if (oContext.isA("sap.ui.model.odata.v4.ODataListBinding") && oContext.isRelative()) {
					sPath = oContext.getHeaderContext().getPath();
				} else {
					sPath = oContext.getPath();
				}

				if (mParameters.updateFCLLevel === -1) {
					// When navigating back from a context, we need to remove the last component of the path
					sPath = this._findPathToNavigate(sPath);

					// Check if we're navigating back to a semantic path that was previously resolved
					if (this.oLastSemanticMapping && this.oLastSemanticMapping.technicalPath === sPath) {
						sPath = this.oLastSemanticMapping.semanticPath;
					}
				} else if (this._checkContextForSemanticPath(oContext)) {
					// We check if we have to use a semantic path
					var sSemanticPath = SemanticKeyHelper.getSemanticPath(oContext, true);

					if (!sSemanticPath) {
						// We were not able to build the semantic path --> Use the technical path and
						// clear the previous mapping, otherwise the old mapping is used in EditFlow#updateDocument
						// and it leads to unwanted page reloads
						this.setLastSemanticMapping(undefined);
					} else if (sSemanticPath !== sPath) {
						// Store the mapping technical <-> semantic path to avoid recalculating it later
						// and use the semantic path instead of the technical one
						this.setLastSemanticMapping({ technicalPath: sPath, semanticPath: sSemanticPath });
						sPath = sSemanticPath;
					}
				}

				// remove extra '/' at the beginning of path
				if (sPath[0] === "/") {
					sPath = sPath.substring(1);
				}

				return sPath;
			},

			_calculateLayout: function(sPath, mParameters) {
				var FCLLevel = mParameters.FCLLevel;
				if (mParameters.updateFCLLevel) {
					FCLLevel += mParameters.updateFCLLevel;
					if (FCLLevel < 0) {
						FCLLevel = 0;
					}
				}

				return this.oAppComponent.getRootViewController().calculateLayout(FCLLevel, sPath, mParameters.sLayout);
			},

			/**
			 * Event handler before a route is matched.
			 * Displays a busy indicator.
			 *
			 * @param {object} oEvent The event
			 */
			_beforeRouteMatched: function(oEvent) {
				var bPlaceholderEnabled = new Placeholder().isPlaceholderEnabled();
				if (!bPlaceholderEnabled) {
					var oRootView = this.oAppComponent.getRootControl();
					BusyLocker.lock(oRootView);
				}
			},

			/**
			 * Event handler when a route is matched.
			 * Hides the busy indicator and fires its own 'routematched' event.
			 *
			 * @param {object} oEvent The event
			 */
			_onRouteMatched: function(oEvent) {
				var oAppStateHandler = this.oAppComponent.getAppStateHandler(),
					oRootView = this.oAppComponent.getRootControl(),
					that = this;
				var bPlaceholderEnabled = new Placeholder().isPlaceholderEnabled();
				if (BusyLocker.isLocked(oRootView) && !bPlaceholderEnabled) {
					BusyLocker.unlock(oRootView);
				}
				var mParameters = oEvent.getParameters();
				if (this.navigationInfoQueue.length) {
					mParameters.navigationInfo = this.navigationInfoQueue[0];
					this.navigationInfoQueue = this.navigationInfoQueue.slice(1);
				} else {
					mParameters.navigationInfo = {};
				}
				if (oAppStateHandler.checkIfRouteChangedByIApp()) {
					mParameters.navigationInfo.bReasonIsIappState = true;
					oAppStateHandler.resetRouteChangedByIApp();
				}

				this.sCurrentRouteName = oEvent.getParameter("name");
				this.sCurrentRoutePattern = oEvent.getParameters().config.pattern;
				this.aCurrentViews = oEvent.getParameter("views");

				mParameters.routeInformation = this._getRouteInformation(this.sCurrentRouteName);
				mParameters.routePattern = this.sCurrentRoutePattern;

				this._fireRouteMatchEvents(mParameters);

				// Check if current hash has been set by the routerProxy.navToHash function
				// If not, rebuild history properly (both in the browser and the RouterProxy)
				if (!history.state || history.state.feLevel === undefined) {
					this.oRouterProxy
						.restoreHistory()
						.then(function() {
							that.oRouterProxy.resolveRouteMatch();
						})
						.catch(function(oError) {
							Log.error("Error while restoring history", oError);
						});
				} else {
					this.oRouterProxy.resolveRouteMatch();
				}
			},

			attachRouteMatched: function(oData, fnFunction, oListener) {
				this.eventProvider.attachEvent("routeMatched", oData, fnFunction, oListener);
			},
			detachRouteMatched: function(fnFunction, oListener) {
				this.eventProvider.detachEvent("routeMatched", fnFunction, oListener);
			},
			attachAfterRouteMatched: function(oData, fnFunction, oListener) {
				this.eventProvider.attachEvent("afterRouteMatched", oData, fnFunction, oListener);
			},
			detachAfterRouteMatched: function(fnFunction, oListener) {
				this.eventProvider.detachEvent("afterRouteMatched", fnFunction, oListener);
			},

			getRouteFromHash: function(oRouter, oAppComponent) {
				var sHash = oRouter.getHashChanger().hash;
				var oRouteInfo = oRouter.getRouteInfoByHash(sHash);
				return oAppComponent
					.getMetadata()
					.getManifestEntry("/sap.ui5/routing/routes")
					.filter(function(oRoute) {
						return oRoute.name === oRouteInfo.name;
					})[0];
			},
			getTargetsFromRoute: function(oRoute, oAppComponent) {
				var oTarget = oRoute.target;
				var that = this;
				if (typeof oTarget === "string") {
					return [this._mTargets[oTarget]];
				} else {
					var aTarget = [];
					oTarget.forEach(function(sTarget) {
						aTarget.push(that._mTargets[sTarget]);
					});
					return aTarget;
				}
			},

			initializeRouting: function() {
				var that = this;

				// Attach router handlers
				this._fnOnRouteMatched = this._onRouteMatched.bind(this);
				this.oRouter.attachRouteMatched(this._fnOnRouteMatched);
				var bPlaceholderEnabled = new Placeholder().isPlaceholderEnabled();
				if (!bPlaceholderEnabled) {
					this.oRouter.attachBeforeRouteMatched(this._beforeRouteMatched.bind(this));
				}
				// Reset internal state
				this.navigationInfoQueue = [];
				EditState.resetEditState();
				this.bExitOnNavigateBackToRoot = !this.oRouter.match("");

				var bIsIappState =
					that.oRouter
						.getHashChanger()
						.getHash()
						.indexOf("sap-iapp-state") !== -1;
				var initPromise = that.oAppComponent
					.getStartupParameters()
					.then(function(oStartupParameters) {
						var bHasStartUpParameters = oStartupParameters !== undefined && Object.keys(oStartupParameters).length !== 0;
						// Manage startup parameters (in case of no iapp-state)
						if (!bIsIappState && bHasStartUpParameters) {
							var sHash = that.oRouter.getHashChanger().getHash();
							if (
								oStartupParameters.preferredMode &&
								oStartupParameters.preferredMode[0].indexOf("create") !== -1 &&
								!sHash
							) {
								// Logic for create mode
								return that._managePreferredModeCreateStartup(oStartupParameters);
							} else {
								return that._manageDeeplinkStartup(oStartupParameters);
							}
						}
					})
					.catch(function(oError) {
						Log.error("Error during routing initialization", oError);
					});

				return initPromise;
			},

			getDefaultCreateHash: function(oStartupParameters) {
				var sContextPath = this.getContextPath(),
					sDefaultCreateHash =
						oStartupParameters && oStartupParameters.preferredMode ? oStartupParameters.preferredMode[0] : "create",
					sHash;

				sDefaultCreateHash =
					sDefaultCreateHash.indexOf(":") !== -1 && sDefaultCreateHash.length > sDefaultCreateHash.indexOf(":") + 1
						? sDefaultCreateHash.substr(0, sDefaultCreateHash.indexOf(":"))
						: "create";
				sHash = sContextPath.substring(1) + "(...)?i-action=" + sDefaultCreateHash;
				if (this.oRouter.getRouteInfoByHash(sHash)) {
					return sHash;
				} else {
					throw new Error("No route match for creating a new " + sContextPath.substring(1));
				}
			},

			_managePreferredModeCreateStartup: function(oStartupParameters) {
				var that = this;
				return this.oMetaModel
					.requestObject(this.getContextPath() + "@")
					.then(function(oEntitySetAnnotations) {
						var sMetaPath,
							bCreatable = true;
						if (
							oEntitySetAnnotations["@com.sap.vocabularies.Common.v1.DraftRoot"] &&
							oEntitySetAnnotations["@com.sap.vocabularies.Common.v1.DraftRoot"]["NewAction"]
						) {
							sMetaPath =
								that.getContextPath() +
								"@com.sap.vocabularies.Common.v1.DraftRoot/NewAction@Org.OData.Core.V1.OperationAvailable";
						} else if (
							oEntitySetAnnotations["@com.sap.vocabularies.Session.v1.StickySessionSupported"] &&
							oEntitySetAnnotations["@com.sap.vocabularies.Session.v1.StickySessionSupported"]["NewAction"]
						) {
							sMetaPath =
								that.getContextPath() +
								"@com.sap.vocabularies.Session.v1.StickySessionSupported/NewAction@Org.OData.Core.V1.OperationAvailable";
						}
						if (sMetaPath) {
							var bNewActionOperationAvailable = that.oMetaModel.getObject(sMetaPath);
							if (bNewActionOperationAvailable === false) {
								bCreatable = false;
							}
						} else {
							var oInsertRestrictions = oEntitySetAnnotations["@Org.OData.Capabilities.V1.InsertRestrictions"];
							if (oInsertRestrictions && oInsertRestrictions.Insertable === false) {
								bCreatable = false;
							}
						}
						if (bCreatable) {
							var sPath = that.getDefaultCreateHash(oStartupParameters);
							that.oRouter.getHashChanger().replaceHash(sPath);
							that.bExitOnNavigateBackToRoot = true;
						}
					})
					.catch(function() {
						Log.error("Cannot fetch the Annotations");
					});
			},

			_requestObjectsFromParameters: function(oStartUpParameters, aExternallyNavigablePages) {
				var that = this;

				// Load the respective objects for all object pages found in aExternallyNavigablePages
				var aContextPromises = aExternallyNavigablePages.map(function(oPage) {
					var oCompleteFilter, oListBind;
					if (oPage.isSemanticKeyNavigation) {
						oCompleteFilter = that._createFilter(oPage.draft, oPage.semanticKeys, oStartUpParameters);
					} else {
						oCompleteFilter = that._createFilter(oPage.draft, oPage.technicalKeys, oStartUpParameters);
					}
					// only request a minimum of fields to boost backend performance since this is only used to check if an object exists
					oListBind = that.oModel.bindList(oPage.contextPath, undefined, undefined, oCompleteFilter, {
						"$select": oPage.isSemanticKeyNavigation
							? oPage.semanticKeys.map(function(key) {
									return key.$PropertyPath;
							  })
							: oPage.technicalKeys
					});
					return oListBind.requestContexts(0, 2);
				});

				return Promise.all(aContextPromises);
			},

			_manageDeeplinkStartup: function(oStartUpParameters) {
				var that = this,
					aExternallyNavigablePages;

				// Need to preload the entity set informations in the metamodel
				return this.oMetaModel
					.requestObject("/$EntityContainer/")
					.then(function() {
						// Check if semantic keys are present in url parameters for every object page at each level
						var oLevelOfObjectPages = that._getNavigablePages(that.oAppComponent.getManifest()["sap.ui5"].routing);

						aExternallyNavigablePages = that._findTargetPagesFromStartupParams(oLevelOfObjectPages, oStartUpParameters);

						return that._requestObjectsFromParameters(oStartUpParameters, aExternallyNavigablePages);
					})
					.then(function(aValues) {
						if (aValues.length) {
							// Make sure we only get 1 context per promise, and flatten the array
							var aContexts = [];
							aValues.forEach(function(aFoundContexts) {
								if (aFoundContexts.length === 1) {
									aContexts.push(aFoundContexts[0]);
								}
							});

							// Keep hash if navigation has been done, navigation takes precedence over Startup parameters
							if (aContexts.length === aValues.length && !that.oRouter.getHashChanger().getHash()) {
								var sHash = that._buildStartupHash(aExternallyNavigablePages, aContexts);
								if (sHash) {
									//Replace the hash with newly created hash
									that.oRouter.getHashChanger().replaceHash(sHash);
								}
							}
						}
					})
					.catch(function(error) {
						Log.info("Could not find results for list bind: " + error);
					});
			},

			_getNavigablePages: function(oRouting) {
				var aRoutes = oRouting.routes,
					oTargets = oRouting.targets,
					mPageMap = {};
				for (var i = 0; i < aRoutes.length; i++) {
					var oPage = {},
						sPattern = aRoutes[i].pattern,
						sTarget = aRoutes[i].target,
						iLevel = sPattern.split("/").length - 1;
					oPage["pattern"] = sPattern;
					if (sPattern === ":?query:" || sPattern === "") {
						continue;
					}
					if (iLevel === 1 && sPattern.split("/")[iLevel] === ":?query:") {
						iLevel = 0;
					}
					oPage["level"] = iLevel;
					if (Array.isArray(sTarget)) {
						//target is Array in case of FCL
						oPage["target"] = sTarget[sTarget.length - 1];
					} else {
						oPage["target"] = sTarget;
					}
					if (oTargets[oPage.target].options && oTargets[oPage.target].options.settings) {
						oPage["allowDeepLinking"] = oTargets[oPage.target].options.settings.allowDeepLinking;
						var sContextPath =
							oTargets[oPage.target].options.settings.contextPath ||
							(oTargets[oPage.target].options.settings.entitySet && "/" + oTargets[oPage.target].options.settings.entitySet);
						oPage["contextPath"] = sContextPath;
					}
					if (!oPage["allowDeepLinking"] && oPage["level"] !== 0) {
						continue;
					} else if (!mPageMap[oPage.level]) {
						mPageMap[oPage.level] = [];
					}
					mPageMap[oPage.level].push(oPage);
				}
				return mPageMap;
			},

			/**
			 * For each level (starting at 0), find the first object page corresponding to an object
			 * that can be determined with the keys passed as startup parameters.
			 * Stop when no OP that can be can be found for a given level.
			 *
			 * @param {object} mPagesByLevel A map (level --> array of pages at that level)
			 * @param {object} oStartupParameters The startup parameters of the application
			 * @returns {Array} Array of all pages that can be reached with the provided parameters
			 */
			_findTargetPagesFromStartupParams: function(mPagesByLevel, oStartupParameters) {
				var iLevel = 0,
					aReachablePages = [],
					bFound = true;

				while (bFound && iLevel in mPagesByLevel) {
					var aObjectPages = mPagesByLevel[iLevel];

					// loop through pages at each level
					// use for-loop to break early
					bFound = false;
					for (var i = 0; i < aObjectPages.length; ++i) {
						var oObjectPage = aObjectPages[i];
						if (!oObjectPage.contextPath && oObjectPage.level === 0) {
							oObjectPage.contextPath = this.getContextPath();
						}
						if (!oObjectPage.contextPath) {
							continue;
						}

						oObjectPage.entityType = this.oMetaModel.getObject("/$EntityContainer" + oObjectPage.contextPath + "/");
						oObjectPage.draft =
							this.oMetaModel.getObject(
								"/$EntityContainer" + oObjectPage.contextPath + "@com.sap.vocabularies.Common.v1.DraftRoot"
							) ||
							this.oMetaModel.getObject(
								"/$EntityContainer" + oObjectPage.contextPath + "@com.sap.vocabularies.Common.v1.DraftNode"
							);
						oObjectPage.technicalKeys = oObjectPage.entityType["$Key"];
						oObjectPage.semanticKeys = this.oMetaModel.getObject(
							"/$EntityContainer" + oObjectPage.contextPath + "/@com.sap.vocabularies.Common.v1.SemanticKey"
						);

						if (this._checkForKeys(oObjectPage.semanticKeys, oStartupParameters)) {
							// make record if semantic keys are available in URL params
							oObjectPage.isSemanticKeyNavigation = true;
							aReachablePages.push(oObjectPage);
							bFound = true;
							break;
						} else if (oObjectPage.level === 0 && this._checkForKeys(oObjectPage.technicalKeys, oStartupParameters)) {
							// Support for Technical Keys for root level object page
							oObjectPage.isSemanticKeyNavigation = false;
							aReachablePages.push(oObjectPage);
							bFound = true;
							break;
						}
					}

					++iLevel;
				}

				return aReachablePages;
			},

			/**
			 * Creates the filter for the entity set.
			 *
			 * @param {object} oDraftDetail The details of draft node
			 * @param {Array} aKeys Array of semantic keys or technical keys of the page
			 * @param {object} oStartUpParameters URL parameters
			 * @returns {object} Filters for the entity set
			 */
			_createFilter: function(oDraftDetail, aKeys, oStartUpParameters) {
				var aFilters = [],
					bFilteringCaseSensitive = ModelHelper.isFilteringCaseSensitive(this.oMetaModel);

				for (var j = 0; j < aKeys.length; j++) {
					var sProperty = aKeys[j].$PropertyPath;
					if (!sProperty) {
						// Technical Keys Scenario
						sProperty = aKeys[j];
						if (sProperty === "IsActiveEntity") {
							oDraftDetail = false;
						}
					}
					var sValue = oStartUpParameters[sProperty][0];
					if (sValue) {
						aFilters.push(
							new Filter({
								path: sProperty,
								operator: FilterOperator.EQ,
								value1: sValue,
								caseSensitive: bFilteringCaseSensitive
							})
						);
					} else {
						return undefined;
					}
				}
				if (oDraftDetail) {
					var oDraftFilter = new Filter({
						filters: [new Filter("IsActiveEntity", "EQ", false), new Filter("SiblingEntity/IsActiveEntity", "EQ", null)],
						and: false
					});
					aFilters.push(oDraftFilter);
				}
				var oCompleteFilter = new Filter(aFilters, true);
				return oCompleteFilter;
			},

			/**
			 * Check for Semantic Keys/ Technical Keys in the URL.
			 *
			 * @param {Array} aKeys Array of semantic keys or technical keys of the page
			 * @param {object} oParameters URL parameters
			 * @returns {boolean} True if Semantic Keys are available in URL
			 */
			_checkForKeys: function(aKeys, oParameters) {
				if (aKeys && aKeys.length) {
					for (var j = 0; j < aKeys.length; j++) {
						var sPropertyPath = aKeys[j].$PropertyPath;
						if (!sPropertyPath) {
							// Technical Keys do not require $ProperyPath
							sPropertyPath = aKeys[j];
						}
						var aPropertyValue = oParameters[sPropertyPath];
						if (!aPropertyValue || (aPropertyValue && aPropertyValue.length > 1)) {
							return false;
						}
					}
					return true;
				}
				return false;
			},

			_buildStartupHash: function(aReachablePages, aContexts) {
				var sHash;

				if (aContexts.length === 1) {
					// Navigation to first-level object page
					// We check if we have to use a semantic path
					var sTechnicalPath = aContexts[0].getPath(),
						sSemanticPath = SemanticKeyHelper.getSemanticPath(aContexts[0]);

					if (sSemanticPath !== sTechnicalPath) {
						// Store the mapping technical <-> semantic path to avoid recalculating it later
						// and use the semantic path instead of the technical one
						this.setLastSemanticMapping({ technicalPath: sTechnicalPath, semanticPath: sSemanticPath });
					}

					sHash = sSemanticPath.substring(1); // To remove the leading '/'
				} else if (aContexts.length > 1) {
					// Navigation to a deeper level --> use the pattern of the deepest object page
					// and replace the parameters by the ID from the contexts
					var aParts = aReachablePages[aReachablePages.length - 1].pattern.split("/");

					sHash = aParts
						.map(function(sPart, iIndex) {
							var sKey = sPart.split("(")[0];
							var sValue = aContexts[iIndex].getPath().split("(")[1];
							return sKey + "(" + sValue; // sValue contains the closing ')'
						})
						.join("/");
				}

				return sHash;
			},

			getOutbounds: function() {
				return this.outbounds;
			},

			/**
			 * Gets the name of the Draft root entity set or the sticky-enabled entity set.
			 *
			 * @returns {string} The name of the root EntitySet
			 *
			 * @ui5-restricted
			 */
			getContextPath: function() {
				return this.sContextPath;
			}
		});

		return ServiceFactory.extend("sap.fe.core.services.RoutingServiceFactory", {
			createInstance: function(oServiceContext) {
				var oRoutingService = new RoutingService(oServiceContext);
				return oRoutingService.initPromise;
			}
		});
	},
	true
);
