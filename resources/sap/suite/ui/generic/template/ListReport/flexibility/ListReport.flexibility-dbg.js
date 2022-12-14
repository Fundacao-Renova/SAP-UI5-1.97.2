// obsolete

sap.ui.define(["sap/suite/ui/generic/template/changeHandler/RemoveTableColumn",
	"sap/suite/ui/generic/template/changeHandler/RevealTableColumn",
	"sap/suite/ui/generic/template/changeHandler/MoveTableColumns",
	"sap/suite/ui/generic/template/changeHandler/AddTableColumn",
	"sap/suite/ui/generic/template/changeHandler/RemoveFilterItem",
	"sap/suite/ui/generic/template/changeHandler/RevealFilterItem",
	"sap/suite/ui/generic/template/changeHandler/MoveFilterItems",
	"sap/suite/ui/generic/template/changeHandler/AddFilterItem",
	"sap/suite/ui/generic/template/changeHandler/RemoveToolbarActionButton",
	"sap/suite/ui/generic/template/changeHandler/RevealToolbarActionButton",
	"sap/suite/ui/generic/template/changeHandler/MoveToolbarActionButtons",
	"sap/suite/ui/generic/template/changeHandler/AddToolbarActionButton"],
	function(RemoveTableColumn,
	RevealTableColumn,
	MoveTableColumns,
	AddTableColumn,
	RemoveFilterItem,
	RevealFilterItem,
	MoveFilterItems,
	AddFilterItem,
	RemoveToolbarActionButton,
	RevealToolbarActionButton,
	MoveToolbarActionButtons,
	AddToolbarActionButton) {
	"use strict";

	return {
		"removeTableColumn": RemoveTableColumn,
		"revealTableColumn": RevealTableColumn,
		"moveTableColumns": MoveTableColumns,
		"addTableColumn": AddTableColumn,
		"removeFilterItem": RemoveFilterItem,
		"revealFilterItem": RevealFilterItem,
		"moveFilterItems": MoveFilterItems,
		"addFilterItem": AddFilterItem,
		"removeToolbarActionButton": RemoveToolbarActionButton,
		"revealToolbarActionButton": RevealToolbarActionButton,
		"moveToolbarActionButtons": MoveToolbarActionButtons,
		"addToolbarActionButton": AddToolbarActionButton
	};
}, /* bExport= */ true);
