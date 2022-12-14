import { Table, FilterBar } from "../controls";
import { PageConfig } from "../common/page";

export enum VariantManagementTypeListReport {
	None = "None",
	Control = "Control",
	Page = "Page"
}

export interface ListReportConfig extends PageConfig {
	table?: Table;
	/**
	 * variantManagement defines how the variant management of page personalizations is controlled.
	 * - None - No variant management by default.
	 * - Control - Individual personalizations for each control.
	 */
	variantManagement?: VariantManagementTypeListReport;
	filterBar?: FilterBar;
}
