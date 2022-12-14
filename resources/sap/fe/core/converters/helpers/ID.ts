import { generate } from "../../helpers/StableIdHelper";
import { DataFieldAbstractTypes, FacetTypes } from "@sap-ux/vocabularies-types";
type IDPart = string | { Facet: FacetTypes } | DataFieldAbstractTypes;
const BASE_ID: IDPart[] = ["fe"];

/**
 * Shortcut to the stableIdHelper providing a "curry" like method where the last parameter is missing.
 *
 * @param sFixedPart
 * @returns {Function} A shortcut function with the fixed ID part
 */
export function IDGenerator(...sFixedPart: IDPart[]) {
	return function(...sIDPart: IDPart[]) {
		return generate(BASE_ID.concat(...sFixedPart, ...sIDPart));
	};
}

/**
 * Those are all helpers to centralize ID generation in the code for different elements
 */
export const HeaderFacetID = IDGenerator("HeaderFacet");
export const HeaderFacetContainerID = IDGenerator("HeaderFacetContainer");
export const HeaderFacetFormID = IDGenerator("HeaderFacet", "Form");
export const CustomHeaderFacetID = IDGenerator("HeaderFacetCustomContainer");
export const EditableHeaderSectionID = IDGenerator("EditableHeaderSection");
export const SectionID = IDGenerator("FacetSection");
export const CustomSectionID = IDGenerator("CustomSection");
export const SubSectionID = IDGenerator("FacetSubSection");
export const CustomSubSectionID = IDGenerator("CustomSubSection");
export const SideContentID = IDGenerator("SideContent");
export const SideContentLayoutID = function(sSectionID: string) {
	return generate(["fe", sSectionID, "SideContentLayout"]);
};
export const FormID = IDGenerator("Form");
export const FormStandardActionButtonID = function(sFormContainerId: string, sActionName: string) {
	return generate(["fe", "FormContainer", sFormContainerId, "StandardAction", sActionName]);
};
export const TableID = IDGenerator("table");
export const CustomTabID = IDGenerator("CustomTab");
export const FilterBarID = IDGenerator("FilterBar");
export const IconTabBarID = IDGenerator("TabMultipleMode");
export const FilterVariantManagementID = function(sFilterID: string) {
	return generate([sFilterID, "VariantManagement"]);
};
export const ChartID = IDGenerator("Chart");
export const CustomActionID = function(sActionID: string) {
	return generate(["CustomAction", sActionID]);
};
export const KPIID = IDGenerator("KPI");
