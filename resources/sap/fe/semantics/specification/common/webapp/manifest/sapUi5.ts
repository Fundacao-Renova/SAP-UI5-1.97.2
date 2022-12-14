import { FlexibleColumnLayoutType } from "../../../common/types";

export const FIORI_FCL_ROOT_VIEW_NAME = "sap.fe.templates.RootContainer.view.Fcl";

export const FIORI_FCL_ROOT_ID = "appRootView";

export const enum ViewTypes {
	XML = "XML",
	HTML = "HTML",
	JS = "JS",
	JSON = "JSON"
}

export interface SapUi5RootView {
	viewName: typeof FIORI_FCL_ROOT_VIEW_NAME | string;
	type: ViewTypes;
	id: typeof FIORI_FCL_ROOT_ID | string;
	async?: boolean;
}

export interface SapUi5OdataModel {
	preload?: boolean;
	dataSource: string;
	settings?: object;
}

export interface SapUi5ResourceModel {
	type: string;
	uri?: string;
}

export type SapUi5RoutingRouteTarget = string | string[];

export interface SapUi5RoutingRoute {
	name: string;
	pattern: string;
	target: SapUi5RoutingRouteTarget;
	layout?: FlexibleColumnLayoutType;
}

export const SAPUI5_VIEW_CLASS = "sap.ui.core.mvc.View";
export const SAPUI5_FRAGMENT_CLASS = "sap.ui.core.Fragment";
