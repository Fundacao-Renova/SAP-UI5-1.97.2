/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(
	[
		"sap/fe/core/PageController",
		"sap/fe/core/controllerextensions/InternalRouting",
		"./overrides/InternalRouting",
		"sap/fe/core/controllerextensions/SideEffects",
		"sap/fe/core/controllerextensions/EditFlow",
		"sap/fe/core/controllerextensions/InternalEditFlow",
		"sap/fe/core/controllerextensions/PageReady",
		"sap/fe/core/controllerextensions/InternalIntentBasedNavigation",
		"sap/fe/core/controllerextensions/IntentBasedNavigation",
		"./overrides/IntentBasedNavigation",
		"sap/base/Log",
		"sap/base/util/merge",
		"sap/fe/core/CommonUtils",
		"sap/fe/navigation/SelectionVariant",
		"sap/fe/macros/table/Utils",
		"sap/m/MessageBox",
		"sap/fe/core/BusyLocker",
		"sap/m/Link",
		"sap/fe/macros/chart/ChartRuntime",
		"sap/fe/templates/ObjectPage/ExtensionAPI",
		"sap/ui/core/mvc/OverrideExecution",
		"sap/fe/core/controllerextensions/ViewState",
		"./overrides/ViewState",
		"sap/fe/templates/RootContainer/overrides/EditFlow",
		"sap/fe/core/helpers/ModelHelper",
		"sap/fe/core/controllerextensions/Routing",
		"sap/m/InstanceManager",
		"sap/fe/core/controllerextensions/MessageHandler",
		"./overrides/MessageHandler",
		"sap/fe/core/controllerextensions/Share",
		"./overrides/Share",
		"sap/fe/macros/DelegateUtil",
		"sap/fe/macros/CommonHelper",
		"sap/fe/templates/TableScroller",
		"sap/ui/model/json/JSONModel",
		"sap/fe/core/controllerextensions/Paginator",
		"./overrides/Paginator",
		"sap/fe/core/controllerextensions/Placeholder"
	],
	function(
		PageController,
		InternalRouting,
		InternalRoutingOverride,
		SideEffects,
		EditFlow,
		InternalEditFlow,
		PageReady,
		InternalIntentBasedNavigation,
		IntentBasedNavigation,
		IntentBasedNavigationOverride,
		Log,
		merge,
		CommonUtils,
		SelectionVariant,
		TableUtils,
		MessageBox,
		BusyLocker,
		Link,
		ChartRuntime,
		ExtensionAPI,
		OverrideExecution,
		ViewState,
		ViewStateOverrides,
		EditFlowOverrides,
		ModelHelper,
		Routing,
		InstanceManager,
		MessageHandler,
		MessageHandlerOverride,
		Share,
		ShareOverrides,
		DelegateUtil,
		CommonHelper,
		TableScroller,
		JSONModel,
		Paginator,
		PaginatorOverride,
		Placeholder
	) {
		"use strict";

		return PageController.extend("sap.fe.templates.ObjectPage.ObjectPageController", {
			metadata: {
				methods: {
					getExtensionAPI: {
						"public": true,
						"final": true
					},
					onPageReady: {
						"public": true,
						"final": false,
						overrideExecution: OverrideExecution.After
					}
				}
			},
			placeholder: Placeholder,
			sideEffects: SideEffects,
			editFlow: EditFlow,
			share: Share.override(ShareOverrides),
			_editFlow: InternalEditFlow.override(EditFlowOverrides),
			_routing: InternalRouting.override(InternalRoutingOverride),
			paginator: Paginator.override(PaginatorOverride),
			messageHandler: MessageHandler.override(MessageHandlerOverride),
			intentBasedNavigation: IntentBasedNavigation.override(IntentBasedNavigationOverride),
			_intentBasedNavigation: InternalIntentBasedNavigation.override({
				getNavigationMode: function() {
					var bIsStickyEditMode =
						this._oView.getController().getStickyEditMode && this._oView.getController().getStickyEditMode();
					return bIsStickyEditMode ? "explace" : "inplace";
				}
			}),
			viewState: ViewState.override(ViewStateOverrides),
			pageReady: PageReady.override({
				isContextExpected: function() {
					return true;
				}
			}),

			getExtensionAPI: function(sId) {
				if (sId) {
					// to allow local ID usage for custom pages we'll create/return own instances for custom sections
					this.mCustomSectionExtensionAPIs = this.mCustomSectionExtensionAPIs || {};

					if (!this.mCustomSectionExtensionAPIs[sId]) {
						this.mCustomSectionExtensionAPIs[sId] = new ExtensionAPI(this, sId);
					}
					return this.mCustomSectionExtensionAPIs[sId];
				} else {
					if (!this.extensionAPI) {
						this.extensionAPI = new ExtensionAPI(this);
					}
					return this.extensionAPI;
				}
			},

			onInit: function() {
				PageController.prototype.onInit.apply(this);
				var oObjectPage = this.byId("fe::ObjectPage");

				// Setting defaults of internal model context
				var oInternalModelContext = this.getView().getBindingContext("internal");
				oInternalModelContext.setProperty("externalNavigationContext", { "page": true });
				oInternalModelContext.setProperty("relatedApps", {
					visibility: false,
					items: null
				});
				oInternalModelContext.setProperty("batchGroups", this._getBatchGroupsForView());
				oInternalModelContext.setProperty("errorNavigationSectionFlag", false);
				if (oObjectPage.getEnableLazyLoading()) {
					//Attaching the event to make the subsection context binding active when it is visible.
					oObjectPage.attachEvent("subSectionEnteredViewPort", this._handleSubSectionEnteredViewPort.bind(this));
				}
			},

			onExit: function() {
				var that = this;
				if (this.mCustomSectionExtensionAPIs) {
					Object.keys(this.mCustomSectionExtensionAPIs).forEach(function(sId) {
						that.mCustomSectionExtensionAPIs[sId] && that.mCustomSectionExtensionAPIs[sId].destroy();
					});
					delete this.mCustomSectionExtensionAPIs;
				}
				this.extensionAPI && this.extensionAPI.destroy();
				delete this.extensionAPI;

				var oMessageButton = this.getView().byId("fe::FooterBar::MessageButton"),
					oMessagePopover = oMessageButton ? oMessageButton.oMessagePopover : null;
				if (oMessagePopover && oMessagePopover.isOpen()) {
					oMessagePopover.close();
				}
			},

			_getTableBinding: function(oTable) {
				return oTable && oTable.getRowBinding();
			},

			onBeforeRendering: function() {
				PageController.prototype.onBeforeRendering.apply(this);
			},

			onAfterRendering: function(oEvent) {
				var that = this;
				this.getView()
					.getModel("sap.fe.i18n")
					.getResourceBundle()
					.then(function(response) {
						that.oResourceBundle = response;
					})
					.catch(function(oError) {
						Log.error("Error while retrieving the resource bundle", oError);
					});
			},

			_onBeforeBinding: function(oContext, mParameters) {
				// TODO: we should check how this comes together with the transaction helper, same to the change in the afterBinding
				var that = this,
					aTables = this._findTables(),
					oFastCreationRow,
					oObjectPage = this.byId("fe::ObjectPage"),
					oBinding = mParameters.listBinding,
					oInternalModelContext = that.getView().getBindingContext("internal"),
					aBatchGroups = oInternalModelContext.getProperty("batchGroups"),
					iViewLevel = this.getView().getViewData().viewLevel;

				aBatchGroups.push("$auto");
				if (mParameters.bDraftNavigation !== true) {
					this._closeSideContent();
				}
				if (
					oObjectPage.getBindingContext() &&
					oObjectPage.getBindingContext().hasPendingChanges() &&
					!aBatchGroups.some(
						oObjectPage
							.getBindingContext()
							.getModel()
							.hasPendingChanges.bind(oObjectPage.getBindingContext().getModel())
					)
				) {
					/* 	In case there are pending changes for the creation row and no others we need to reset the changes
						TODO: this is just a quick solution, this needs to be reworked
				 	*/

					oObjectPage
						.getBindingContext()
						.getBinding()
						.resetChanges();
				}

				// For now we have to set the binding context to null for every fast creation row
				// TODO: Get rid of this coding or move it to another layer - to be discussed with MDC and model
				for (var i = 0; i < aTables.length; i++) {
					oFastCreationRow = aTables[i].getCreationRow();
					if (oFastCreationRow) {
						oFastCreationRow.setBindingContext(null);
					}
				}

				// Scroll to present Section so that bindings are enabled during navigation through paginator buttons, as there is no view rerendering/rebind
				var fnScrollToPresentSection = function(oEvent) {
					if (!oObjectPage.isFirstRendering() && !mParameters.bPersistOPScroll) {
						oObjectPage.setSelectedSection(null);
					}
				};
				oObjectPage.attachEventOnce("modelContextChange", fnScrollToPresentSection);

				// if the structure of the ObjectPageLayout is changed then scroll to present Section
				// FIXME Is this really working as intended ? Initially this was onBeforeRendering, but never triggered onBeforeRendering because it was registered after it
				var oDelegateOnBefore = {
					onAfterRendering: fnScrollToPresentSection
				};
				oObjectPage.addEventDelegate(oDelegateOnBefore, that);
				this.pageReady.attachEventOnce("pageReady", function(oEvent) {
					oObjectPage.removeEventDelegate(oDelegateOnBefore);
				});

				//Set the Binding for Paginators using ListBinding ID
				if (oBinding && iViewLevel > 1) {
					if (oBinding.isA("sap.ui.model.odata.v4.ODataListBinding")) {
						this.paginator.initialize(oBinding, oContext);
					} else {
						//if the binding type is not ODataListBinding because of a deeplink navigation or a refresh of the page
						// we need to create it
						var sContextPath = oBinding.getPath().replace(/\([^\)]*\)*$/, ""); //removing the last tuple
						var oBinding = new sap.ui.model.odata.v4.ODataListBinding(
							oBinding.oModel,
							"",
							oBinding.oModel.createBindingContext(sContextPath)
						);

						oBinding.getContexts(0);
						oBinding.attachEvent("change", function _setListBindingAsync() {
							if (oBinding.getContexts().length > 0) {
								that.paginator.initialize(oBinding, oContext);
								oBinding.detachEvent("change", _setListBindingAsync);
							}
						});
					}
				}
				if (oObjectPage.getEnableLazyLoading()) {
					var aSections = oObjectPage.getSections(),
						bUseIconTabBar = oObjectPage.getUseIconTabBar(),
						iSkip = 2,
						bIsInEditMode = oObjectPage.getModel("ui").getProperty("/editMode") === "Editable",
						bEditableHeader = this.getView().getViewData().editableHeaderContent;
					for (var iSection = 0; iSection < aSections.length; iSection++) {
						var oSection = aSections[iSection];
						var aSubSections = oSection.getSubSections();
						for (var iSubSection = 0; iSubSection < aSubSections.length; iSubSection++, iSkip--) {
							// In IconTabBar mode keep the second section bound if there is an editable header and we are switching to display mode
							if (iSkip < 1 || (bUseIconTabBar && (iSection > 1 || (iSection === 1 && !bEditableHeader && !bIsInEditMode)))) {
								var oSubSection = aSubSections[iSubSection];
								oSubSection.setBindingContext(null);
							}
						}
					}
				}

				if (this.placeholder.isPlaceholderEnabled() && mParameters.showPlaceholder) {
					var oView = this.getView();
					var oNavContainer = oView.getParent().oContainer.getParent();
					if (oNavContainer) {
						oNavContainer.showPlaceholder({});
					}
				}
			},

			_getFirstClickableElement: function(oObjectPage) {
				var oFirstClickableElement;
				var aActions = oObjectPage.getHeaderTitle() && oObjectPage.getHeaderTitle().getActions();
				if (aActions && aActions.length) {
					oFirstClickableElement = aActions.find(function(oAction) {
						return oAction.getVisible() && oAction.getEnabled();
					});
				}
				return oFirstClickableElement;
			},

			_getFirstEmptyMandatoryFieldFromSubSection: function(aSubSections) {
				for (var subSection = 0; aSubSections && subSection < aSubSections.length; subSection++) {
					var aBlocks = aSubSections[subSection].getBlocks();

					for (var block = 0; aBlocks && block < aBlocks.length; block++) {
						var aFormContainers;

						if (aBlocks[block].isA("sap.ui.layout.form.Form")) {
							aFormContainers = aBlocks[block].getFormContainers();
						} else if (
							aBlocks[block].getContent &&
							aBlocks[block].getContent() &&
							aBlocks[block].getContent().isA("sap.ui.layout.form.Form")
						) {
							aFormContainers = aBlocks[block].getContent().getFormContainers();
						}

						for (var formContainer = 0; aFormContainers && formContainer < aFormContainers.length; formContainer++) {
							var aFormElements = aFormContainers[formContainer].getFormElements();

							for (var formElement = 0; aFormElements && formElement < aFormElements.length; formElement++) {
								var aFields = aFormElements[formElement].getFields();

								if (aFields[0].getRequired() && !aFields[0].getValue()) {
									return aFields[0];
								}
							}
						}
					}
				}
				return undefined;
			},

			_updateFocusInEditMode: function(aSubSections) {
				var oObjectPage = this.byId("fe::ObjectPage");

				var oMandatoryField = this._getFirstEmptyMandatoryFieldFromSubSection(aSubSections);
				var oFieldToFocus;
				if (oMandatoryField) {
					oFieldToFocus = oMandatoryField.content.getContentEdit()[0];
				} else {
					oFieldToFocus = oObjectPage._getFirstEditableInput() || this._getFirstClickableElement(oObjectPage);
				}

				if (oFieldToFocus) {
					setTimeout(function() {
						// We set the focus in a timeeout, otherwise the focus sometimes goes to the TabBar
						oFieldToFocus.focus();
					}, 0);
				}
			},

			_handleSubSectionEnteredViewPort: function(oEvent) {
				var oSubSection = oEvent.getParameter("subSection");
				oSubSection.setBindingContext(undefined);
			},

			_onBackNavigationInDraft: function(oContext) {
				CommonUtils.fnProcessDataLossOrDraftDiscardConfirmation(
					function() {
						history.back();
					},
					Function.prototype,
					oContext,
					this.getView().getController(),
					false
				);
			},

			_onAfterBinding: function(oBindingContext, mParameters) {
				var oObjectPage = this.byId("fe::ObjectPage"),
					that = this,
					aTables = this._findTables(),
					aFormContainers = this._findFormContainers();

				this.sideEffects.clearPropertiesStatus();

				// TODO: this is only a temp solution as long as the model fix the cache issue and we use this additional
				// binding with ownRequest
				oBindingContext = oObjectPage.getBindingContext();

				var aIBNActions = [];
				oObjectPage.getSections().forEach(function(oSection) {
					oSection.getSubSections().forEach(function(oSubSection) {
						aIBNActions = CommonUtils.getIBNActions(oSubSection, aIBNActions);
					});
				});

				// Assign internal binding contexts to oFormContainer:
				// 1. It is not possible to assign the internal binding context to the XML fragment
				// (FormContainer.fragment.xml) yet - it is used already for the data-structure.
				// 2. Another problem is, that FormContainers assigned to a 'MoreBlock' does not have an
				// internal model context at all.

				aFormContainers.forEach(function(oFormContainer) {
					var oInternalModelContext,
						oInternalModel = oObjectPage.getModel("internal"),
						sPageContextPath = "/pages/" + that.getView().getId(),
						sFormContainerContextPath = "controls/" + that.getView().getLocalId(oFormContainer.getId()),
						SHOW_DETAILS = "showDetails";
					if (oFormContainer.getModel("internal") === undefined) {
						oFormContainer.setModel(oInternalModel, "internal");
						oFormContainer.setBindingContext(
							oInternalModel.createBindingContext(sPageContextPath + "/" + sFormContainerContextPath),
							"internal"
						);
						oFormContainer.bindElement({ path: "", model: "internal" });
					} else {
						oFormContainer.bindElement({ path: sFormContainerContextPath, model: "internal" });
					}
					oInternalModelContext = oFormContainer.getBindingContext("internal");
					oInternalModelContext.setProperty(SHOW_DETAILS, false);
				});
				aTables.forEach(function(oTable) {
					var oInternalModelContext = oTable.getBindingContext("internal");
					oInternalModelContext.setProperty("creationRowFieldValidity", {});
					oInternalModelContext.setProperty("creationRowCustomValidity", {});

					aIBNActions = CommonUtils.getIBNActions(oTable, aIBNActions);
					// temporary workaround for BCP: 2080218004
					// Need to fix with BLI: FIORITECHP1-15274
					// only for edit mode, we clear the table cache
					// Workaround starts here!!
					var oTableRowBinding = oTable.getRowBinding();
					if (oTableRowBinding) {
						if (ModelHelper.isStickySessionSupported(oTableRowBinding.getModel().getMetaModel())) {
							// apply for both edit and display mode in sticky
							oTableRowBinding.removeCachesAndMessages("");
						}
					}
					// Workaround ends here!!

					// Update 'enabled' property of DataFieldForAction buttons on table toolbar
					// The same is also performed on Table selectionChange event
					var oActionOperationAvailableMap = JSON.parse(
							CommonHelper.parseCustomData(DelegateUtil.getCustomData(oTable, "operationAvailableMap"))
						),
						aSelectedContexts = oTable.getSelectedContexts();

					CommonUtils.setActionEnablement(oInternalModelContext, oActionOperationAvailableMap, aSelectedContexts);
				});
				CommonUtils.getSemanticTargetsFromPageModel(that, "_pageModel");
				//Retrieve Object Page header actions from Object Page title control
				var oObjectPageTitle = oObjectPage.getHeaderTitle();
				var aIBNHeaderActions = [];
				aIBNHeaderActions = CommonUtils.getIBNActions(oObjectPageTitle, aIBNHeaderActions);
				aIBNActions = aIBNActions.concat(aIBNHeaderActions);
				CommonUtils.updateDataFieldForIBNButtonsVisibility(aIBNActions, this.getView());

				var oModel, oFinalUIState;

				// TODO: this should be moved into an init event of the MDC tables (not yet existing) and should be part
				// of any controller extension
				/**
				 * @param oTable
				 * @param oListBinding
				 */
				function enableFastCreationRow(oTable, oListBinding) {
					var oFastCreationRow = oTable.getCreationRow(),
						oFastCreationListBinding,
						oFastCreationContext;

					if (oFastCreationRow) {
						oFinalUIState
							.then(function() {
								if (oFastCreationRow.getModel("ui").getProperty("/isEditable")) {
									oFastCreationListBinding = oModel.bindList(oListBinding.getPath(), oListBinding.getContext(), [], [], {
										$$updateGroupId: "doNotSubmit",
										$$groupId: "doNotSubmit"
									});
									// Workaround suggested by OData model v4 colleagues
									oFastCreationListBinding.refreshInternal = function() {};
									/*
															oFastCreationListBinding.hasPendingChanges = function() {
								return false;
							};
															*/

									oFastCreationContext = oFastCreationListBinding.create();
									oFastCreationRow.setBindingContext(oFastCreationContext);

									// this is needed to avoid console error
									oFastCreationContext.created().catch(function() {
										Log.trace("transient fast creation context deleted");
									});
								}
							})
							.catch(function(oError) {
								Log.error("Error while computing the final UI state", oError);
							});
					}
				}

				// this should not be needed at the all
				/**
				 * @param oTable
				 */
				function handleTableModifications(oTable) {
					var oBinding = that._getTableBinding(oTable),
						fnHandleTablePatchEvents = function() {
							enableFastCreationRow(oTable, oBinding);
						};

					if (!oBinding) {
						Log.error("Expected binding missing for table: " + oTable.getId());
						return;
					}

					if (oBinding.oContext) {
						fnHandleTablePatchEvents();
					} else {
						var fnHandleChange = function() {
							if (oBinding.oContext) {
								fnHandleTablePatchEvents();
								oBinding.detachChange(fnHandleChange);
							}
						};
						oBinding.attachChange(fnHandleChange);
					}
				}

				if (oBindingContext) {
					oModel = oBindingContext.getModel();

					// Compute Edit Mode
					oFinalUIState = this._editFlow.computeEditMode(oBindingContext);

					// update related apps once Data is received in case of binding cache is not available
					// TODO: this is only a temp solution since we need to call _updateRelatedApps method only after data for Object Page is received (if there is no binding)
					if (oBindingContext.getBinding().oCache) {
						that._updateRelatedApps();
					} else {
						var fnUpdateRelatedApps = function() {
							that._updateRelatedApps();
							oBindingContext.getBinding().detachDataReceived(fnUpdateRelatedApps);
						};
						oBindingContext.getBinding().attachDataReceived(fnUpdateRelatedApps);
					}

					//Attach the patch sent and patch completed event to the object page binding so that we can react
					var oBinding = (oBindingContext.getBinding && oBindingContext.getBinding()) || oBindingContext;
					oBinding.attachEvent("patchSent", this.editFlow.handlePatchSent, this);
					oBinding.attachEvent("patchCompleted", this.editFlow.handlePatchCompleted, this);

					aTables.forEach(function(oTable) {
						// access binding only after table is bound
						TableUtils.whenBound(oTable)
							.then(handleTableModifications)
							.catch(function(oError) {
								Log.error("Error while waiting for the table to be bound", oError);
							});
					});

					// should be called only after binding is ready hence calling it in onAfterBinding
					oObjectPage._triggerVisibleSubSectionsEvents();
				}
			},
			onPageReady: function(mParameters) {
				// Apply app state only after the page is ready with the first section selected
				var that = this;
				var oView = this.getView();
				var oInternalModelContext = oView.getBindingContext("internal");
				var oBindingContext = oView.getBindingContext();
				//Show popup while navigating back from object page in case of draft
				if (oBindingContext) {
					var bIsStickyMode = ModelHelper.isStickySessionSupported(oBindingContext.getModel().getMetaModel());
					if (!bIsStickyMode) {
						var oAppComponent = CommonUtils.getAppComponent(oView);
						oAppComponent.getShellServices().setBackNavigation(that._onBackNavigationInDraft.bind(that, oBindingContext));
					}
				}
				this.getAppComponent()
					.getAppStateHandler()
					.applyAppState();

				if (mParameters.forceFocus) {
					var oObjectPage = this.byId("fe::ObjectPage");
					// set the focus to the first action button, or to the first editable input if in editable mode
					var isInDisplayMode = oObjectPage.getModel("ui").getProperty("/editMode") === "Display";
					var aVisibleSections = oObjectPage.getSections().filter(function(oSection) {
						return oSection.getVisible() === true;
					});
					// Select the first visible section
					oObjectPage.setSelectedSection(aVisibleSections[0].getId());

					if (isInDisplayMode) {
						var oFirstClickableElement = this._getFirstClickableElement(oObjectPage);
						if (oFirstClickableElement) {
							oFirstClickableElement.focus();
						}
					} else {
						var aVisibleSubSections;
						if (oView.getViewData().sectionLayout === "Tabs") {
							// In a tabbed layout, only the subsections of the selected section are visible on the screen
							aVisibleSubSections = aVisibleSections[0].getSubSections();
						} else {
							// In a paged layout, all subsections of the visible sections are visible on the screen
							aVisibleSubSections = aVisibleSections
								.map(function(oSection) {
									return oSection.getSubSections();
								})
								.flat();
						}
						this._updateFocusInEditMode(aVisibleSubSections);
					}
				}

				oInternalModelContext.setProperty("errorNavigationSectionFlag", false);
				this._checkDataPointTitleForExternalNavigation();
			},
			/**
			 * Get the status of edit mode for sticky session.
			 *
			 * @returns {boolean} The status of edit mode for sticky session
			 *
			 *
			 */
			getStickyEditMode: function() {
				var oBindingContext = this.oView.getBindingContext && this.oView.getBindingContext(),
					bIsStickyEditMode = false;
				if (oBindingContext) {
					var bIsStickyMode = ModelHelper.isStickySessionSupported(oBindingContext.getModel().getMetaModel());
					if (bIsStickyMode) {
						bIsStickyEditMode = this.oView.getModel("ui").getProperty("/isEditable");
					}
				}
				return bIsStickyEditMode;
			},

			_getObjectPageLayoutControl: function() {
				return this.byId("fe::ObjectPage");
			},

			_getPageTitleInformation: function() {
				var oObjectPage = this.byId("fe::ObjectPage");
				var oObjectPageSubtitle = oObjectPage.getCustomData().find(function(oCustomData) {
					return oCustomData.getKey() === "ObjectPageSubtitle";
				});
				var oTitleInfo = {
					title: oObjectPage.data("ObjectPageTitle") || "",
					subtitle: oObjectPageSubtitle && oObjectPageSubtitle.getValue(),
					intent: "",
					icon: ""
				};

				return Promise.resolve(oTitleInfo);
			},

			_executeHeaderShortcut: function(sId) {
				var sButtonId = this.getView().getId() + "--" + sId,
					oButton = this.byId("fe::ObjectPage")
						.getHeaderTitle()
						.getActions()
						.find(function(oElement) {
							return oElement.getId() === sButtonId;
						});
				CommonUtils.fireButtonPress(oButton);
			},

			_executeFooterShortcut: function(sId) {
				var sButtonId = this.getView().getId() + "--" + sId,
					oButton = this.byId("fe::ObjectPage")
						.getFooter()
						.getContent()
						.find(function(oElement) {
							return oElement.getMetadata().getName() === "sap.m.Button" && oElement.getId() === sButtonId;
						});
				CommonUtils.fireButtonPress(oButton);
			},

			_executeTabShortCut: function(oExecution) {
				var oObjectPage = this.byId("fe::ObjectPage"),
					iSelectedSectionIndex = oObjectPage.indexOfSection(this.byId(oObjectPage.getSelectedSection())),
					aSections = oObjectPage.getSections(),
					iSectionIndexMax = aSections.length - 1,
					sCommand = oExecution.oSource.getCommand(),
					newSection;
				if (iSelectedSectionIndex !== -1 && iSectionIndexMax > 0) {
					if (sCommand === "NextTab") {
						if (iSelectedSectionIndex <= iSectionIndexMax - 1) {
							newSection = aSections[++iSelectedSectionIndex];
						}
					} else {
						// PreviousTab
						if (iSelectedSectionIndex !== 0) {
							newSection = aSections[--iSelectedSectionIndex];
						}
					}
					if (newSection) {
						oObjectPage.setSelectedSection(newSection);
						newSection.focus();
					}
				}
			},

			_getFooterVisibility: function(oEvent) {
				var oInternalModelContext = this.getView().getBindingContext("internal");
				var sViewId = this.getView().getId();
				oInternalModelContext.setProperty("messageFooterContainsErrors", false);
				sap.ui
					.getCore()
					.getMessageManager()
					.getMessageModel()
					.getData()
					.forEach(function(oMessage) {
						if (oMessage.validation && oMessage.type === "Error" && oMessage.target.indexOf(sViewId) > -1) {
							oInternalModelContext.setProperty("messageFooterContainsErrors", true);
						}
					});
			},

			_showMessagePopover: function(err, oRet) {
				if (err) {
					Log.error(err);
				}
				var that = this;
				var oMessageButton = that.getView().byId("fe::FooterBar::MessageButton"),
					oMessagePopover = oMessageButton.oMessagePopover,
					oItemBinding = oMessagePopover.getBinding("items");

				if (oItemBinding.getLength() > 0 && !oMessagePopover.isOpen()) {
					oMessageButton.setVisible(true);
					// workaround to ensure that oMessageButton is rendered when openBy is called
					setTimeout(function() {
						oMessagePopover.openBy(oMessageButton);
					}, 0);
				}
				return oRet;
			},

			_editDocument: function(oContext) {
				var oModel = this.getView().getModel("ui"),
					mParameters = {
						prepareOnEdit: this.getView().getViewData().prepareOnEdit
					};
				BusyLocker.lock(oModel);
				return this.editFlow.editDocument.apply(this.editFlow, [oContext, mParameters]).finally(function() {
					BusyLocker.unlock(oModel);
				});
			},

			_saveDocument: function(oContext) {
				var that = this,
					oModel = this.getView().getModel("ui"),
					aWaitCreateDocuments = [];
				// indicates if we are creating a new row in the OP
				var bExecuteSideEffectsOnError = false;
				BusyLocker.lock(oModel);
				this._findTables().forEach(function(oTable) {
					var oBinding = that._getTableBinding(oTable);
					var mParameters = {
						creationMode: oTable.data("creationMode"),
						creationRow: oTable.getCreationRow(),
						createAtEnd: oTable.data("createAtEnd") === "true"
					};
					var bCreateDocument =
						mParameters.creationRow &&
						mParameters.creationRow.getBindingContext() &&
						Object.keys(mParameters.creationRow.getBindingContext().getObject()).length > 1;
					if (bCreateDocument) {
						// the bSkipSideEffects is a parameter created when we click the save key. If we press this key
						// we don't execute the handleSideEffects funciton to avoid batch redundancy
						mParameters.bSkipSideEffects = true;
						bExecuteSideEffectsOnError = true;
						aWaitCreateDocuments.push(
							that.editFlow.createDocument(oBinding, mParameters).then(function() {
								return oBinding;
							})
						);
					}
				});
				return Promise.all(aWaitCreateDocuments).then(function(aBindings) {
					var mParameters = {
						bExecuteSideEffectsOnError: bExecuteSideEffectsOnError,
						bindings: aBindings
					};
					return that.editFlow
						.saveDocument(oContext, mParameters)
						.catch(that._showMessagePopover.bind(that))
						.finally(function() {
							if (BusyLocker.isLocked(oModel)) {
								BusyLocker.unlock(oModel);
							}
						});
				});
			},

			_cancelDocument: function(oContext, mParameters) {
				mParameters.cancelButton = this.getView().byId(mParameters.cancelButton); //to get the reference of the cancel button from command execution
				return this.editFlow.cancelDocument(oContext, mParameters);
			},

			_applyDocument: function(oContext) {
				var that = this;
				return this.editFlow.applyDocument(oContext).catch(that._showMessagePopover.bind(that));
			},

			_updateRelatedApps: function() {
				var oObjectPage = this.byId("fe::ObjectPage");
				if (CommonUtils.resolveStringtoBoolean(oObjectPage.data("showRelatedApps"))) {
					CommonUtils.updateRelatedAppsDetails(oObjectPage);
				}
			},

			_findTableInSubSection: function(aParentElement, aSubsection, aTables) {
				var aSubSectionTables = [];
				for (var element = 0; element < aParentElement.length; element++) {
					var oElement = aParentElement[element].getContent instanceof Function && aParentElement[element].getContent();
					if (oElement && oElement.isA && oElement.isA("sap.ui.layout.DynamicSideContent")) {
						oElement = oElement.getMainContent instanceof Function && oElement.getMainContent();
						if (oElement && oElement.length > 0) {
							oElement = oElement[0];
						}
					}
					if (oElement && oElement.isA && oElement.isA("sap.fe.macros.TableAPI")) {
						oElement = oElement.getContent instanceof Function && oElement.getContent();
						if (oElement && oElement.length > 0) {
							oElement = oElement[0];
						}
					}
					if (oElement && oElement.isA && oElement.isA("sap.ui.mdc.Table")) {
						aTables.push(oElement);
						aSubSectionTables.push({
							"table": oElement,
							"gridTable": oElement.getType().isA("sap.ui.mdc.table.GridTableType")
						});
					}
				}
				if (
					aSubSectionTables.length === 1 &&
					aParentElement.length === 1 &&
					aSubSectionTables[0].gridTable &&
					!aSubsection.hasStyleClass("sapUxAPObjectPageSubSectionFitContainer")
				) {
					//In case there is only a single table in a section we fit that to the whole page so that the scrollbar comes only on table and not on page
					aSubsection.addStyleClass("sapUxAPObjectPageSubSectionFitContainer");
				} else {
					if (aSubSectionTables && !aSubsection.hasStyleClass("sapUxAPObjectPageSubSectionFitContainer")) {
						aSubSectionTables.forEach(function(oTable) {
							if (oTable.gridTable) {
								//Resetting the row count to default value in case we have a combination of forms and tables or multiple tables in a subsection
								oTable.table.getType().setRowCount(null);
							}
						});
					}
				}
			},

			_getAllSubSections: function() {
				var oObjectPage = this.byId("fe::ObjectPage"),
					aSubSections = [];
				oObjectPage.getSections().forEach(function(oSection) {
					aSubSections = aSubSections.concat(oSection.getSubSections());
				});
				return aSubSections;
			},

			_getAllBlocks: function() {
				var aBlocks = [];
				this._getAllSubSections().forEach(function(oSubSection) {
					aBlocks = aBlocks.concat(oSubSection.getBlocks());
				});
				return aBlocks;
			},

			_findFormContainers: function() {
				var aSubSections = this._getAllSubSections(),
					aFormContainers = [];

				function _collectFormContainersInBlocks(aBlocks) {
					for (var i = 0; i < aBlocks.length; i++) {
						var oElement = aBlocks[i].getContent instanceof Function && aBlocks[i].getContent();
						if (oElement && oElement.isA && oElement.isA("sap.ui.layout.DynamicSideContent")) {
							oElement = oElement.getMainContent instanceof Function && oElement.getMainContent();
							if (oElement && oElement.length > 0) {
								oElement = oElement[0];
							}
						}
						if (
							oElement &&
							oElement.isA &&
							oElement.isA("sap.ui.layout.form.Form") &&
							oElement.getFormContainers instanceof Function
						) {
							aFormContainers = aFormContainers.concat(oElement.getFormContainers());
						}
					}
				}

				for (var i = 0; i < aSubSections.length; i++) {
					_collectFormContainersInBlocks(aSubSections[i].getBlocks());
					_collectFormContainersInBlocks(aSubSections[i].getMoreBlocks());
				}
				return aFormContainers;
			},

			//TODO: This is needed for two workarounds - to be removed again
			_findTables: function() {
				var aSubSections = this._getAllSubSections(),
					aTables = [];
				for (var subSection = 0; subSection < aSubSections.length; subSection++) {
					this._findTableInSubSection(aSubSections[subSection].getBlocks(), aSubSections[subSection], aTables);
					this._findTableInSubSection(aSubSections[subSection].getMoreBlocks(), aSubSections[subSection], aTables);
				}
				return aTables;
			},

			_closeSideContent: function() {
				this._getAllBlocks().forEach(function(oBlock) {
					var oContent = oBlock.getContent instanceof Function && oBlock.getContent();
					if (oContent && oContent.isA && oContent.isA("sap.ui.layout.DynamicSideContent")) {
						if (oContent.setShowSideContent instanceof Function) {
							oContent.setShowSideContent(false);
						}
					}
				});
			},

			/**
			 * Chart Context is resolved for 1:n microcharts.
			 *
			 * @param {sap.ui.model.Context} oChartContext The Context of the MicroChart
			 * @param {string} sChartPath The collectionPath of the the chart
			 * @returns {Array} Array of Attributes of the chart Context
			 */
			_getChartContextData: function(oChartContext, sChartPath) {
				var oContextData = oChartContext.getObject(),
					oChartContextData = [oContextData];
				if (oChartContext && sChartPath) {
					if (oContextData[sChartPath]) {
						oChartContextData = oContextData[sChartPath];
						delete oContextData[sChartPath];
						oChartContextData.push(oContextData);
					}
				}
				return oChartContextData;
			},

			/**
			 * Scroll the tables to the row with the sPath
			 *
			 * @function
			 * @name sap.fe.templates.ObjectPage.ObjectPageController.controller#_scrollTablesToRow
			 * @param {string} sRowPath 'sPath of the table row'
			 *
			 */

			_scrollTablesToRow: function(sRowPath) {
				if (this._findTables && this._findTables().length > 0) {
					var aTables = this._findTables();
					for (var i = 0; i < aTables.length; i++) {
						TableScroller.scrollTableToRow(aTables[i], sRowPath);
					}
				}
			},

			/**
			 * Method to merge selected contexts and filters.
			 *
			 * @function
			 * @name _mergeMultipleContexts
			 * @param {object} oPageContext Page context
			 * @param {object|Array} aLineContext Selected Contexts
			 * @param {string} sChartPath Collection name of the chart
			 * @returns {object} Selection Variant Object
			 */
			_mergeMultipleContexts: function(oPageContext, aLineContext, sChartPath) {
				var that = this;
				var aAttributes = [],
					aPageAttributes = [],
					oMetaModel,
					oContext,
					sMetaPathLine,
					sMetaPathPage,
					sPathLine,
					oPageLevelSV,
					sPagePath;

				sPagePath = oPageContext.getPath();
				oMetaModel = oPageContext && oPageContext.getModel() && oPageContext.getModel().getMetaModel();
				sMetaPathPage = oMetaModel && oMetaModel.getMetaPath(sPagePath).replace(/^\/*/, "");

				// Get single line context if necessary
				if (aLineContext && aLineContext.length) {
					oContext = aLineContext[0];
					sPathLine = oContext.getPath();
					sMetaPathLine = oMetaModel && oMetaModel.getMetaPath(sPathLine).replace(/^\/*/, "");

					aLineContext.map(function(oSingleContext) {
						if (sChartPath) {
							var oChartContextData = that._getChartContextData(oSingleContext, sChartPath);
							if (oChartContextData) {
								aAttributes = oChartContextData.map(function(oChartContextData) {
									return {
										contextData: oChartContextData,
										entitySet: sMetaPathPage + "/" + sChartPath
									};
								});
							}
						} else {
							aAttributes.push({
								contextData: oSingleContext.getObject(),
								entitySet: sMetaPathLine
							});
						}
					});
				}
				aPageAttributes.push({
					contextData: oPageContext.getObject(),
					entitySet: sMetaPathPage
				});
				// Adding Page Context to selection variant
				aPageAttributes = CommonUtils.removeSensitiveData(aPageAttributes, oMetaModel);
				oPageLevelSV = CommonUtils.addPageContextToSelectionVariant(new SelectionVariant(), aPageAttributes, that.getView());
				aAttributes = CommonUtils.removeSensitiveData(aAttributes, oMetaModel);
				return {
					selectionVariant: oPageLevelSV,
					attributes: aAttributes
				};
			},

			_getBatchGroupsForView: function() {
				var that = this,
					oViewData = that.getView().getViewData(),
					oConfigurations = oViewData.controlConfiguration,
					aConfigurations = oConfigurations && Object.keys(oConfigurations),
					aBatchGroups = ["$auto.Heroes", "$auto.Decoration", "$auto.Workers"];

				if (aConfigurations && aConfigurations.length > 0) {
					aConfigurations.forEach(function(sKey) {
						var oConfiguration = oConfigurations[sKey];
						if (oConfiguration.requestGroupId === "LongRunners") {
							aBatchGroups.push("$auto.LongRunners");
						}
					});
				}
				return aBatchGroups;
			},

			/*
			 * Reset Breadcrumb links
			 *
			 * @function
			 * @param {sap.m.Breadcrumbs} [oSource] parent control
			 * @description Used when context of the objectpage changes.
			 *              This event callback is attached to modelContextChange
			 *              event of the Breadcrumb control to catch context change.
			 *              Then element binding and hrefs are updated for each Link.
			 *
			 * @ui5-restricted
			 * @experimental
			 */
			_setBreadcrumbLinks: function(oSource) {
				var oContext = oSource.getBindingContext();
				var oAppComponent = this.getAppComponent();
				if (oContext) {
					var sNewPath = oContext.getPath(),
						aPathParts = sNewPath.split("/"),
						sPath = "",
						oMetaModel = oAppComponent.getMetaModel(),
						iSkipParameterized = 0;

					aPathParts.shift();
					aPathParts.splice(-1, 1);
					aPathParts.forEach(function(sPathPart, i) {
						sPath += "/" + sPathPart;
						var oRootViewController = oAppComponent.getRootViewController();
						var oTitleHierarchyCache = oRootViewController.getTitleHierarchyCache();
						var pWaitForTitleHiearchyInfo;
						var sParameterPath = oMetaModel.getMetaPath(sPath);
						var bResultContext = oMetaModel.getObject(sParameterPath + "/@com.sap.vocabularies.Common.v1.ResultContext");
						if (bResultContext) {
							// We dont need to create a breadcrumb for Parameter path
							iSkipParameterized = 1;
							return;
						}
						if (!oTitleHierarchyCache[sPath]) {
							pWaitForTitleHiearchyInfo = oRootViewController.addNewEntryInCacheTitle(sPath, oAppComponent);
						} else {
							pWaitForTitleHiearchyInfo = Promise.resolve(oTitleHierarchyCache[sPath]);
						}
						pWaitForTitleHiearchyInfo
							.then(function(oTitleHiearchyInfo) {
								var idx = i - iSkipParameterized,
									oLink = oSource.getLinks()[idx] ? oSource.getLinks()[idx] : new Link();
								// sCurrentEntity is a fallback value in case of empty title
								oLink.setText(oTitleHiearchyInfo.subtitle || oTitleHiearchyInfo.title);
								oLink.setHref(oTitleHiearchyInfo.intent);
								if (!oSource.getLinks()[idx]) {
									oSource.addLink(oLink);
								}
							})
							.catch(function(oError) {
								Log.error("Error while computing the title hierarchy", oError);
							});
					});
				}
			},
			_checkDataPointTitleForExternalNavigation: function() {
				var oView = this.getView();
				var oInternalModelContext = oView.getBindingContext("internal");
				var oDataPoints = CommonUtils.getHeaderFacetItemConfigForExternalNavigation(
					oView.getViewData(),
					this.getAppComponent()
						.getRoutingService()
						.getOutbounds()
				);
				var oShellServices = this.getAppComponent().getShellServices();
				var oPageContext = oView && oView.getBindingContext();
				oInternalModelContext.setProperty("isHeaderDPLinkVisible", {});
				if (oPageContext) {
					oPageContext
						.requestObject()
						.then(function(oData) {
							fnGetLinks(oDataPoints, oData);
						})
						.catch(function(oError) {
							Log.error("Cannot retrieve the links from the shell service", oError);
						});
				}
				/**
				 * @param oError
				 */
				function fnOnError(oError) {
					Log.error(oError);
				}
				/**
				 * @param aSupportedLinks
				 */
				function fnSetLinkEnablement(aSupportedLinks) {
					var sLinkId = this.id;
					// process viable links from getLinks for all datapoints having outbound
					if (aSupportedLinks && aSupportedLinks.length === 1 && aSupportedLinks[0].supported) {
						oInternalModelContext.setProperty("isHeaderDPLinkVisible/" + sLinkId, true);
					}
				}
				/**
				 * @param oDataPoints
				 * @param oPageData
				 */
				function fnGetLinks(oDataPoints, oPageData) {
					for (var sId in oDataPoints) {
						var oDataPoint = oDataPoints[sId];
						var oParams = {};
						var oLink = oView.byId(sId);
						if (!oLink) {
							// for data points configured in app descriptor but not annotated in the header
							continue;
						}
						var oLinkContext = oLink.getBindingContext();
						var oLinkData = oLinkContext && oLinkContext.getObject();
						var oMixedContext = merge({}, oPageData, oLinkData);
						// process semantic object mappings
						if (oDataPoint.semanticObjectMapping) {
							var aSemanticObjectMapping = oDataPoint.semanticObjectMapping;
							for (var item in aSemanticObjectMapping) {
								var oMapping = aSemanticObjectMapping[item];
								var sMainProperty = oMapping["LocalProperty"]["$PropertyPath"];
								var sMappedProperty = oMapping["SemanticObjectProperty"];
								if (sMainProperty !== sMappedProperty) {
									if (oMixedContext.hasOwnProperty(sMainProperty)) {
										var oNewMapping = {};
										oNewMapping[sMappedProperty] = oMixedContext[sMainProperty];
										oMixedContext = merge({}, oMixedContext, oNewMapping);
										delete oMixedContext[sMainProperty];
									}
								}
							}
						}

						if (oMixedContext) {
							for (var sKey in oMixedContext) {
								if (sKey.indexOf("_") !== 0 && sKey.indexOf("odata.context") === -1) {
									oParams[sKey] = oMixedContext[sKey];
								}
							}
						}
						// validate if a link must be rendered
						oShellServices
							.isNavigationSupported([
								{
									target: {
										semanticObject: oDataPoint.semanticObject,
										action: oDataPoint.action
									},
									params: oParams
								}
							])
							.then(
								fnSetLinkEnablement.bind({
									id: sId
								})
							)
							.catch(fnOnError);
					}
				}
			},
			handlers: {
				onTableContextChange: function(oEvent) {
					var that = this;
					var oSource = oEvent.getSource();
					var oTable;
					this._findTables().some(function(_oTable) {
						if (_oTable.getRowBinding() === oSource) {
							oTable = _oTable;
							return true;
						}
						return false;
					});

					var oCurrentActionPromise = this._editFlow.getCurrentActionPromise();
					if (oCurrentActionPromise) {
						var aTableContexts;
						if (
							oTable
								.getType()
								.getMetadata()
								.isA("sap.ui.mdc.table.GridTableType")
						) {
							aTableContexts = oSource.getContexts(0);
						} else {
							aTableContexts = oSource.getCurrentContexts();
						}
						//if contexts are not fully loaded the getcontexts function above will trigger a new change event call
						if (!aTableContexts[0]) {
							return;
						}
						oCurrentActionPromise
							.then(function(oActionResponse) {
								if (!oActionResponse || oActionResponse.controlId !== oTable.sId) {
									return;
								}
								var oActionData = oActionResponse.oData;
								var aKeys = oActionResponse.keys;
								var iNewItemp = -1;
								aTableContexts.find(function(oTableContext, i) {
									var oTableData = oTableContext.getObject();
									var bCompare = aKeys.every(function(sKey) {
										return oTableData[sKey] === oActionData[sKey];
									});
									if (bCompare) {
										iNewItemp = i;
									}
									return bCompare;
								});
								if (iNewItemp !== -1) {
									var aDialogs = InstanceManager.getOpenDialogs();
									var oDialog = aDialogs.length > 0 ? aDialogs[0] : null;
									if (oDialog) {
										// by design, a sap.m.dialog set the focus to the previous focused element when closing.
										// we should wait for the dialog to be close before to focus another element
										oDialog.attachEventOnce("afterClose", function() {
											oTable.focusRow(iNewItemp, true);
										});
									} else {
										oTable.focusRow(iNewItemp, true);
									}
									that._editFlow.deleteCurrentActionPromise();
								}
							})
							.catch(function(err) {
								Log.error("An error occurs while scrolling to the newly created Item: " + err);
							});
					}
					// fire ModelContextChange on the message button whenever the table context changes
					var oMessageButton = that.getView().byId("fe::FooterBar::MessageButton");
					oMessageButton.fireModelContextChange();
				},

				/**
				 * Invokes an action - bound/unbound and sets the page dirty.
				 *
				 * @param oView
				 * @param {string} sActionName The name of the action to be called
				 * @param {map} [mParameters] Contains the following attributes:
				 * @param {sap.ui.model.odata.v4.Context} [mParameters.contexts] Mandatory for a bound action, either one context or an array with contexts for which the action shall be called
				 * @param {sap.ui.model.odata.v4.ODataModel} [mParameters.model] Mandatory for an unbound action; an instance of an OData V4 model
				 * @returns {Promise}
				 * @ui5-restricted
				 * @final
				 */
				onCallAction: function(oView, sActionName, mParameters) {
					var oController = oView.getController();
					var that = oController;
					return oController.editFlow
						.invokeAction(sActionName, mParameters)
						.then(that._showMessagePopover.bind(that, undefined))
						.catch(that._showMessagePopover.bind(that));
				},
				onDataPointTitlePressed: function(oController, oSource, oManifestOutbound, sControlConfig, sCollectionPath) {
					oManifestOutbound = typeof oManifestOutbound === "string" ? JSON.parse(oManifestOutbound) : oManifestOutbound;
					var oTargetInfo = oManifestOutbound[sControlConfig],
						aSemanticObjectMapping = CommonUtils.getSemanticObjectMapping(oTargetInfo),
						oDataPointOrChartBindingContext = oSource.getBindingContext(),
						sMetaPath = oDataPointOrChartBindingContext
							.getModel()
							.getMetaModel()
							.getMetaPath(oDataPointOrChartBindingContext.getPath()),
						aNavigationData = oController._getChartContextData(oDataPointOrChartBindingContext, sCollectionPath),
						additionalNavigationParameters;

					aNavigationData = aNavigationData.map(function(oNavigationData) {
						return {
							data: oNavigationData,
							metaPath: sMetaPath + (sCollectionPath ? "/" + sCollectionPath : "")
						};
					});
					if (oTargetInfo && oTargetInfo.parameters) {
						var oParams =
							oTargetInfo.parameters && oController._intentBasedNavigation.getOutboundParams(oTargetInfo.parameters);
						if (Object.keys(oParams).length > 0) {
							additionalNavigationParameters = oParams;
						}
					}
					if (oTargetInfo && oTargetInfo.semanticObject && oTargetInfo.action) {
						oController._intentBasedNavigation.navigate(oTargetInfo.semanticObject, oTargetInfo.action, {
							navigationContexts: aNavigationData,
							semanticObjectMapping: aSemanticObjectMapping,
							additionalNavigationParameters: additionalNavigationParameters
						});
					}
				},
				/**
				 * Triggers an outbound navigation when a user chooses the chevron.
				 *
				 * @param {object} oController
				 * @param {string} sOutboundTarget Name of the outbound target (needs to be defined in the manifest)
				 * @param {sap.ui.model.odata.v4.Context} oContext The context that contains the data for the target app
				 * @param {string} sCreatePath Create path when the chevron is created.
				 * @returns {Promise} Promise which is resolved once the navigation is triggered (??? maybe only once finished?)
				 * @ui5-restricted
				 * @final
				 */
				onChevronPressNavigateOutBound: function(oController, sOutboundTarget, oContext, sCreatePath) {
					return oController._intentBasedNavigation.onChevronPressNavigateOutBound(
						oController,
						sOutboundTarget,
						oContext,
						sCreatePath
					);
				},

				onNavigateChange: function(oEvent) {
					//will be called always when we click on a section tab
					this.getExtensionAPI().updateAppState();
					this.bSectionNavigated = true;

					var oInternalModelContext = this.getView().getBindingContext("internal");
					var oObjectPage = this.byId("fe::ObjectPage");
					if (
						oObjectPage.getModel("ui").getProperty("/editMode") !== "Display" &&
						this.getView().getViewData().sectionLayout === "Tabs" &&
						oInternalModelContext.getProperty("errorNavigationSectionFlag") === false
					) {
						var oSubSection = oEvent.getParameter("subSection");
						this._updateFocusInEditMode([oSubSection]);
					}
				},
				onVariantSelected: function(oEvent) {
					this.getExtensionAPI().updateAppState();
				},
				onVariantSaved: function(oEvent) {
					var that = this;
					//TODO: Should remove this setTimeOut once Variant Management provides an api to fetch the current variant key on save
					setTimeout(function() {
						that.getExtensionAPI().updateAppState();
					}, 500);
				},
				navigateToSubSection: function(oController, vDetailConfig) {
					var oDetailConfig = typeof vDetailConfig === "string" ? JSON.parse(vDetailConfig) : vDetailConfig,
						oObjectPage = oController.getView().byId("fe::ObjectPage"),
						oSection,
						oSubSection;
					if (oDetailConfig.sectionId) {
						oSection = oController.getView().byId(oDetailConfig.sectionId);
						oSubSection = oDetailConfig.subSectionId
							? oController.getView().byId(oDetailConfig.subSectionId)
							: oSection && oSection.getSubSections() && oSection.getSubSections()[0];
					} else if (oDetailConfig.subSectionId) {
						oSubSection = oController.getView().byId(oDetailConfig.subSectionId);
						oSection = oSubSection && oSubSection.getParent();
					}
					if (!oSection || !oSubSection || !oSection.getVisible() || !oSubSection.getVisible()) {
						oController
							.getView()
							.getModel("sap.fe.i18n")
							.getResourceBundle()
							.then(function(oResourceBundle) {
								var sTitle = CommonUtils.getTranslatedText(
									"C_ROUTING_NAVIGATION_DISABLED_TITLE",
									oResourceBundle,
									null,
									oController.getView().getViewData().entitySet
								);
								Log.error(sTitle);
								MessageBox.error(sTitle);
							})
							.catch(function(error) {
								Log.error(error);
							});
					} else {
						oObjectPage.scrollToSection(oSubSection.getId());
						// trigger iapp state change
						oObjectPage.fireNavigate({
							section: oSection,
							subSection: oSubSection
						});
					}
				},
				onChartSelectionChanged: function(oEvent) {
					ChartRuntime.fnUpdateChart(oEvent);
				}
			}
		});
	}
);
