/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(
	[
		"sap/base/Log",
		"sap/ui/core/Control",
		"sap/ui/core/Item",
		"sap/m/SegmentedButtonItem",
		"sap/m/Select",
		"sap/m/SegmentedButton",
		"sap/fe/core/helpers/StableIdHelper",
		"sap/fe/core/CommonUtils",
		"sap/fe/macros/DelegateUtil",
		"sap/fe/macros/chart/ChartUtils",
		"sap/fe/macros/table/Utils"
	],
	function(
		Log,
		Control,
		Item,
		SegmentedButtonItem,
		Select,
		SegmentedButton,
		StableIdHelper,
		CommonUtils,
		DelegateUtil,
		ChartUtils,
		TableUtils
	) {
		"use strict";
		var PROPERTY_QUICKFILTER_KEY = "quickFilterKey";

		/**
		 *  Container Control for Table QuickFilters
		 *
		 * @private
		 * @experimental This module is only for internal/experimental use!
		 */
		var QuickFilterContainer = Control.extend("sap.fe.macros.table.QuickFilterContainer", {
			metadata: {
				properties: {
					enabled: {
						type: "boolean"
					},
					entitySet: {
						type: "string"
					},
					parentEntityType: {
						type: "string"
					},
					showCounts: {
						type: "boolean"
					},
					batchGroupId: {
						type: "string",
						defaultValue: "$auto"
					}
				},
				events: {},
				defaultAggregation: "selector",
				aggregations: {
					selector: {
						type: "sap.ui.core.Control",
						multiple: false
					}
				},
				publicMethods: []
			},
			renderer: {
				render: function(oRm, oControl) {
					oRm.renderControl(oControl.getSelector());
				}
			},
			init: function() {
				Control.prototype.init.apply(this, arguments);
				this._oTable = undefined;
				this._attachedToView = false;
				this.attachEvent("modelContextChange", this._initControl);
				var oDelegateOnBeforeRendering = {
					onBeforeRendering: function() {
						// Need to wait for Control rendering to get parent view (.i.e into OP the highest parent is the Object Section)
						this._createControlSideEffects();
						this._attachedToView = true;
						this.removeEventDelegate(oDelegateOnBeforeRendering);
					}
				};
				this.addEventDelegate(oDelegateOnBeforeRendering, this);
			},
			_initControl: function(oEvent) {
				// Need to wait for the OData Model to be propagated (models are propagated one by one when we come from FLP)
				if (this.getModel()) {
					this.detachEvent(oEvent.getId(), this._initControl);
					this._manageTable();
					this._createContent();
				}
			},
			_manageTable: function() {
				var oControl = this.getParent(),
					oModel = this._getFilterModel(),
					aFilters = oModel.getObject("/paths"),
					sDefaultFilter = Array.isArray(aFilters) && aFilters.length > 0 ? aFilters[0].annotationPath : undefined;

				while (oControl && !oControl.isA("sap.ui.mdc.Table")) {
					oControl = oControl.getParent();
				}
				this._oTable = oControl;
				if (this.getShowCounts()) {
					CommonUtils.addEventToBindingInfo(oControl, "dataRequested", this._updateCounts.bind(this));
				}
				DelegateUtil.setCustomData(oControl, PROPERTY_QUICKFILTER_KEY, sDefaultFilter);
			},
			setSelectorKey: function(sKey) {
				var oSelector = this.getSelector();
				if (oSelector && oSelector.getSelectedKey() !== sKey) {
					oSelector.setSelectedKey(sKey);
					DelegateUtil.setCustomData(this._oTable, PROPERTY_QUICKFILTER_KEY, sKey);
					// Rebind the table to reflect the change in quick filter key.
					this._oTable.rebindTable();
				}
			},
			getSelectorKey: function() {
				var oSelector = this.getSelector();
				return oSelector ? oSelector.getSelectedKey() : null;
			},
			getDomRef: function() {
				var oSelector = this.getSelector();
				return oSelector ? oSelector.getDomRef() : null;
			},
			_getFilterModel: function() {
				var oModel = this.getModel("filters");
				if (!oModel) {
					var mFilters = DelegateUtil.getCustomData(this, "filters");
					oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(mFilters);
					this.setModel(oModel, "filters");
				}
				return oModel;
			},
			/**
			 * Create QuickFilter Selector (Select or SegmentedButton).
			 */
			_createContent: function() {
				var that = this,
					oModel = this._getFilterModel(),
					aFilters = oModel.getObject("/paths"),
					bIsSelect = aFilters.length > 3,
					mSelectorOptions = {
						id: StableIdHelper.generate([that._oTable.getId(), "QuickFilter"]),
						enabled: that.getBindingInfo("enabled"),
						items: {
							path: "filters>/paths",
							factory: function(sId, oBindingContext) {
								var sAnnotationPath = oBindingContext.getObject().annotationPath,
									mItemOptions = {
										key: sAnnotationPath,
										text: that._getSelectorItemText(sAnnotationPath)
									};
								return bIsSelect ? new Item(mItemOptions) : new SegmentedButtonItem(mItemOptions);
							}
						}
					};
				if (bIsSelect) {
					mSelectorOptions.autoAdjustWidth = true;
				}
				mSelectorOptions[bIsSelect ? "change" : "selectionChange"] = this._onSelectionChange.bind(this);
				this.setSelector(bIsSelect ? new Select(mSelectorOptions) : new SegmentedButton(mSelectorOptions));
			},

			/**
			 * Creates SideEffects control that must be executed when table cells that are related to configured filter(s) change.
			 *
			 */

			_createControlSideEffects: function() {
				var oSvControl = this.getSelector(),
					oSvItems = oSvControl.getItems(),
					sTableNavigationPath = DelegateUtil.getCustomData(this._oTable, "navigationPath");
				/**
				 * Cannot execute SideEffects with targetEntity = current Table collection
				 */

				if (sTableNavigationPath) {
					var aSourceProperties = [];
					for (var k in oSvItems) {
						var sItemKey = oSvItems[k].getKey(),
							oFilterInfos = TableUtils.getFiltersInfoForSV(this._oTable, sItemKey);
						oFilterInfos.properties.forEach(function(sProperty) {
							var sPropertyPath = sTableNavigationPath + "/" + sProperty;
							if (!aSourceProperties.includes(sPropertyPath)) {
								aSourceProperties.push(sPropertyPath);
							}
						});
					}
					this._getSideEffectController().addControlSideEffects(this.getParentEntityType(), {
						SourceProperties: aSourceProperties,
						TargetEntities: [
							{
								"$NavigationPropertyPath": sTableNavigationPath
							}
						],
						sourceControlId: this.getId()
					});
				}
			},
			_getSelectorItemText: function(sAnnotationPath) {
				var oMetaModel = this.getModel().getMetaModel(),
					oQuickFilter = oMetaModel.getObject(this.getEntitySet() + "/@" + sAnnotationPath);
				return oQuickFilter.Text + (this.getShowCounts() ? " (0)" : "");
			},
			_getSideEffectController: function() {
				var oController = this._getViewController();
				return oController ? oController.sideEffects : undefined;
			},
			_getViewController: function() {
				var oView = CommonUtils.getTargetView(this);
				return oView && oView.getController();
			},
			/**
			 * Manage List Binding request related to Counts on QuickFilter control and update text
			 * in line with batch result.
			 *
			 */
			_updateCounts: function() {
				var that = this,
					oTable = this._oTable,
					oController = this._getViewController(),
					oSvControl = this.getSelector(),
					oSvItems = oSvControl.getItems(),
					aBindingPromises = [],
					aInitialItemTexts = [],
					aAdditionalFilters = [],
					aChartFilters = [],
					sCurrentFilterKey = DelegateUtil.getCustomData(oTable, PROPERTY_QUICKFILTER_KEY);

				// Add filters related to the chart for ALP
				if (oController && oController.getChartControl) {
					var oChart = oController.getChartControl();
					if (oChart) {
						var oChartFilterInfo = ChartUtils.getAllFilterInfo(oChart);
						if (oChartFilterInfo && oChartFilterInfo.filters.length) {
							aChartFilters = oChartFilterInfo.filters;
						}
					}
				}

				aAdditionalFilters = aAdditionalFilters.concat(TableUtils.getHiddenFilters(oTable)).concat(aChartFilters);
				for (var k in oSvItems) {
					var sItemKey = oSvItems[k].getKey(),
						oFilterInfos = TableUtils.getFiltersInfoForSV(oTable, sItemKey);
					aInitialItemTexts.push(oFilterInfos.text);
					oSvItems[k].setText(aInitialItemTexts[k] + " (...)");
					aBindingPromises.push(
						TableUtils.getListBindingForCount(oTable, oTable.getBindingContext(), {
							batchGroupId: sItemKey === sCurrentFilterKey ? that.getBatchGroupId() : "$auto",
							additionalFilters: aAdditionalFilters.concat(oFilterInfos.filters)
						})
					);
				}
				Promise.all(aBindingPromises)
					.then(function(aCounts) {
						for (var k in aCounts) {
							oSvItems[k].setText(aInitialItemTexts[k] + " (" + TableUtils.getCountFormatted(aCounts[k]) + ")");
						}
					})
					.catch(function(oError) {
						Log.error("Error while retrieving the binding promises", oError);
					});
			},
			_onSelectionChange: function(oEvent) {
				var oControl = oEvent.getSource();
				DelegateUtil.setCustomData(this._oTable, PROPERTY_QUICKFILTER_KEY, oControl.getSelectedKey());
				this._oTable.rebindTable();
				var oController = this._getViewController();
				if (oController && oController.getExtensionAPI && oController.getExtensionAPI().updateAppState) {
					oController.getExtensionAPI().updateAppState();
				}
			},
			destroy: function() {
				if (this._attachedToView) {
					var oSideEffects = this._getSideEffectController();
					if (oSideEffects) {
						// if "destroy" signal comes when view is destroyed there is not anymore reference to Controller Extension
						oSideEffects.removeControlSideEffects(this);
					}
				}
				delete this._attachedToView;
				delete this._oTable;
				Control.prototype.destroy.apply(this, arguments);
			}
		});

		return QuickFilterContainer;
	},
	/* bExport= */ true
);
