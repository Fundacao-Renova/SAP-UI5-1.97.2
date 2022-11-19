/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/fe/core/library", "sap/fe/core/helpers/KeepAliveHelper"], function(CoreLibrary, KeepAliveHelper) {
	"use strict";

	var VariantManagement = CoreLibrary.VariantManagement;

	return {
		applyInitialStateOnly: function() {
			return false;
		},
		adaptStateControls: function(aStateControls) {
			var oView = this.getView(),
				oController = oView.getController(),
				oViewData = oView.getViewData(),
				bControlVM = false;

			switch (oViewData.variantManagement) {
				case VariantManagement.Control:
					bControlVM = true;
					break;
				case VariantManagement.Page:
				case VariantManagement.None:
					break;
				default:
					throw new Error("unhandled variant setting: " + oViewData.getVariantManagement());
			}

			oController._findTables().forEach(function(oTable) {
				var oQuickFilter = oTable.getQuickFilter();
				if (oQuickFilter) {
					aStateControls.push(oQuickFilter);
				}
				if (bControlVM) {
					aStateControls.push(oTable.getVariant());
				}
			});

			aStateControls.push(oView.byId("fe::ObjectPage"));
		},
		adaptControlStateHandler: function(oControl, aControlHandler) {
			if (oControl.isA("sap.ui.fl.variants.VariantManagement")) {
				aControlHandler.push({
					retrieve: function(oVM) {
						return {
							"variantId": oVM.getCurrentVariantKey()
						};
					},
					apply: function(oVM, oControlState) {
						if (
							oControlState &&
							oControlState.variantId !== undefined &&
							!(oControlState.variantId === oVM.getId() && oVM.getModified() === false)
						) {
							oVM.setModified(true);
						}
					}
				});
			}
		},
		adaptBindingRefreshControls: function(aControls) {
			var oView = this.getView(),
				sRefreshStrategy = KeepAliveHelper.getViewRefreshInfo(oView),
				oController = oView.getController(),
				aControlsToRefresh = [];

			if (sRefreshStrategy) {
				var oObjectPageControl = oController._getObjectPageLayoutControl();
				aControlsToRefresh.push(oObjectPageControl);
			}
			if (sRefreshStrategy !== "includingDependents") {
				var aViewControls = oController._findTables();
				aControlsToRefresh = aControlsToRefresh.concat(KeepAliveHelper.getControlsForRefresh(oView, aViewControls) || []);
			}
			return aControlsToRefresh.reduce(function(aPrevControls, oControl) {
				if (aPrevControls.indexOf(oControl) === -1) {
					aPrevControls.push(oControl);
				}
				return aPrevControls;
			}, aControls);
		}
	};
});
