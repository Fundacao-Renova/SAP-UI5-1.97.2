/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["../../helpers/StableIdHelper"], function (StableIdHelper) {
  "use strict";

  var _exports = {};
  var generate = StableIdHelper.generate;

  var BASE_ID = ["fe"];
  /**
   * Shortcut to the stableIdHelper providing a "curry" like method where the last parameter is missing.
   *
   * @param sFixedPart
   * @returns {Function} A shortcut function with the fixed ID part
   */

  function IDGenerator() {
    for (var _len = arguments.length, sFixedPart = new Array(_len), _key = 0; _key < _len; _key++) {
      sFixedPart[_key] = arguments[_key];
    }

    return function () {
      for (var _len2 = arguments.length, sIDPart = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        sIDPart[_key2] = arguments[_key2];
      }

      return generate(BASE_ID.concat.apply(BASE_ID, sFixedPart.concat(sIDPart)));
    };
  }
  /**
   * Those are all helpers to centralize ID generation in the code for different elements
   */


  _exports.IDGenerator = IDGenerator;
  var HeaderFacetID = IDGenerator("HeaderFacet");
  _exports.HeaderFacetID = HeaderFacetID;
  var HeaderFacetContainerID = IDGenerator("HeaderFacetContainer");
  _exports.HeaderFacetContainerID = HeaderFacetContainerID;
  var HeaderFacetFormID = IDGenerator("HeaderFacet", "Form");
  _exports.HeaderFacetFormID = HeaderFacetFormID;
  var CustomHeaderFacetID = IDGenerator("HeaderFacetCustomContainer");
  _exports.CustomHeaderFacetID = CustomHeaderFacetID;
  var EditableHeaderSectionID = IDGenerator("EditableHeaderSection");
  _exports.EditableHeaderSectionID = EditableHeaderSectionID;
  var SectionID = IDGenerator("FacetSection");
  _exports.SectionID = SectionID;
  var CustomSectionID = IDGenerator("CustomSection");
  _exports.CustomSectionID = CustomSectionID;
  var SubSectionID = IDGenerator("FacetSubSection");
  _exports.SubSectionID = SubSectionID;
  var CustomSubSectionID = IDGenerator("CustomSubSection");
  _exports.CustomSubSectionID = CustomSubSectionID;
  var SideContentID = IDGenerator("SideContent");
  _exports.SideContentID = SideContentID;

  var SideContentLayoutID = function (sSectionID) {
    return generate(["fe", sSectionID, "SideContentLayout"]);
  };

  _exports.SideContentLayoutID = SideContentLayoutID;
  var FormID = IDGenerator("Form");
  _exports.FormID = FormID;

  var FormStandardActionButtonID = function (sFormContainerId, sActionName) {
    return generate(["fe", "FormContainer", sFormContainerId, "StandardAction", sActionName]);
  };

  _exports.FormStandardActionButtonID = FormStandardActionButtonID;
  var TableID = IDGenerator("table");
  _exports.TableID = TableID;
  var CustomTabID = IDGenerator("CustomTab");
  _exports.CustomTabID = CustomTabID;
  var FilterBarID = IDGenerator("FilterBar");
  _exports.FilterBarID = FilterBarID;
  var IconTabBarID = IDGenerator("TabMultipleMode");
  _exports.IconTabBarID = IconTabBarID;

  var FilterVariantManagementID = function (sFilterID) {
    return generate([sFilterID, "VariantManagement"]);
  };

  _exports.FilterVariantManagementID = FilterVariantManagementID;
  var ChartID = IDGenerator("Chart");
  _exports.ChartID = ChartID;

  var CustomActionID = function (sActionID) {
    return generate(["CustomAction", sActionID]);
  };

  _exports.CustomActionID = CustomActionID;
  var KPIID = IDGenerator("KPI");
  _exports.KPIID = KPIID;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIklELnRzIl0sIm5hbWVzIjpbIkJBU0VfSUQiLCJJREdlbmVyYXRvciIsInNGaXhlZFBhcnQiLCJzSURQYXJ0IiwiZ2VuZXJhdGUiLCJjb25jYXQiLCJIZWFkZXJGYWNldElEIiwiSGVhZGVyRmFjZXRDb250YWluZXJJRCIsIkhlYWRlckZhY2V0Rm9ybUlEIiwiQ3VzdG9tSGVhZGVyRmFjZXRJRCIsIkVkaXRhYmxlSGVhZGVyU2VjdGlvbklEIiwiU2VjdGlvbklEIiwiQ3VzdG9tU2VjdGlvbklEIiwiU3ViU2VjdGlvbklEIiwiQ3VzdG9tU3ViU2VjdGlvbklEIiwiU2lkZUNvbnRlbnRJRCIsIlNpZGVDb250ZW50TGF5b3V0SUQiLCJzU2VjdGlvbklEIiwiRm9ybUlEIiwiRm9ybVN0YW5kYXJkQWN0aW9uQnV0dG9uSUQiLCJzRm9ybUNvbnRhaW5lcklkIiwic0FjdGlvbk5hbWUiLCJUYWJsZUlEIiwiQ3VzdG9tVGFiSUQiLCJGaWx0ZXJCYXJJRCIsIkljb25UYWJCYXJJRCIsIkZpbHRlclZhcmlhbnRNYW5hZ2VtZW50SUQiLCJzRmlsdGVySUQiLCJDaGFydElEIiwiQ3VzdG9tQWN0aW9uSUQiLCJzQWN0aW9uSUQiLCJLUElJRCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTs7Ozs7OztBQUNBLE1BQU1BLE9BQWlCLEdBQUcsQ0FBQyxJQUFELENBQTFCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLFdBQVNDLFdBQVQsR0FBOEM7QUFBQSxzQ0FBdEJDLFVBQXNCO0FBQXRCQSxNQUFBQSxVQUFzQjtBQUFBOztBQUNwRCxXQUFPLFlBQStCO0FBQUEseUNBQW5CQyxPQUFtQjtBQUFuQkEsUUFBQUEsT0FBbUI7QUFBQTs7QUFDckMsYUFBT0MsUUFBUSxDQUFDSixPQUFPLENBQUNLLE1BQVIsT0FBQUwsT0FBTyxFQUFXRSxVQUFYLFFBQTBCQyxPQUExQixFQUFSLENBQWY7QUFDQSxLQUZEO0FBR0E7QUFFRDtBQUNBO0FBQ0E7Ozs7QUFDTyxNQUFNRyxhQUFhLEdBQUdMLFdBQVcsQ0FBQyxhQUFELENBQWpDOztBQUNBLE1BQU1NLHNCQUFzQixHQUFHTixXQUFXLENBQUMsc0JBQUQsQ0FBMUM7O0FBQ0EsTUFBTU8saUJBQWlCLEdBQUdQLFdBQVcsQ0FBQyxhQUFELEVBQWdCLE1BQWhCLENBQXJDOztBQUNBLE1BQU1RLG1CQUFtQixHQUFHUixXQUFXLENBQUMsNEJBQUQsQ0FBdkM7O0FBQ0EsTUFBTVMsdUJBQXVCLEdBQUdULFdBQVcsQ0FBQyx1QkFBRCxDQUEzQzs7QUFDQSxNQUFNVSxTQUFTLEdBQUdWLFdBQVcsQ0FBQyxjQUFELENBQTdCOztBQUNBLE1BQU1XLGVBQWUsR0FBR1gsV0FBVyxDQUFDLGVBQUQsQ0FBbkM7O0FBQ0EsTUFBTVksWUFBWSxHQUFHWixXQUFXLENBQUMsaUJBQUQsQ0FBaEM7O0FBQ0EsTUFBTWEsa0JBQWtCLEdBQUdiLFdBQVcsQ0FBQyxrQkFBRCxDQUF0Qzs7QUFDQSxNQUFNYyxhQUFhLEdBQUdkLFdBQVcsQ0FBQyxhQUFELENBQWpDOzs7QUFDQSxNQUFNZSxtQkFBbUIsR0FBRyxVQUFTQyxVQUFULEVBQTZCO0FBQy9ELFdBQU9iLFFBQVEsQ0FBQyxDQUFDLElBQUQsRUFBT2EsVUFBUCxFQUFtQixtQkFBbkIsQ0FBRCxDQUFmO0FBQ0EsR0FGTTs7O0FBR0EsTUFBTUMsTUFBTSxHQUFHakIsV0FBVyxDQUFDLE1BQUQsQ0FBMUI7OztBQUNBLE1BQU1rQiwwQkFBMEIsR0FBRyxVQUFTQyxnQkFBVCxFQUFtQ0MsV0FBbkMsRUFBd0Q7QUFDakcsV0FBT2pCLFFBQVEsQ0FBQyxDQUFDLElBQUQsRUFBTyxlQUFQLEVBQXdCZ0IsZ0JBQXhCLEVBQTBDLGdCQUExQyxFQUE0REMsV0FBNUQsQ0FBRCxDQUFmO0FBQ0EsR0FGTTs7O0FBR0EsTUFBTUMsT0FBTyxHQUFHckIsV0FBVyxDQUFDLE9BQUQsQ0FBM0I7O0FBQ0EsTUFBTXNCLFdBQVcsR0FBR3RCLFdBQVcsQ0FBQyxXQUFELENBQS9COztBQUNBLE1BQU11QixXQUFXLEdBQUd2QixXQUFXLENBQUMsV0FBRCxDQUEvQjs7QUFDQSxNQUFNd0IsWUFBWSxHQUFHeEIsV0FBVyxDQUFDLGlCQUFELENBQWhDOzs7QUFDQSxNQUFNeUIseUJBQXlCLEdBQUcsVUFBU0MsU0FBVCxFQUE0QjtBQUNwRSxXQUFPdkIsUUFBUSxDQUFDLENBQUN1QixTQUFELEVBQVksbUJBQVosQ0FBRCxDQUFmO0FBQ0EsR0FGTTs7O0FBR0EsTUFBTUMsT0FBTyxHQUFHM0IsV0FBVyxDQUFDLE9BQUQsQ0FBM0I7OztBQUNBLE1BQU00QixjQUFjLEdBQUcsVUFBU0MsU0FBVCxFQUE0QjtBQUN6RCxXQUFPMUIsUUFBUSxDQUFDLENBQUMsY0FBRCxFQUFpQjBCLFNBQWpCLENBQUQsQ0FBZjtBQUNBLEdBRk07OztBQUdBLE1BQU1DLEtBQUssR0FBRzlCLFdBQVcsQ0FBQyxLQUFELENBQXpCIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZW5lcmF0ZSB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL1N0YWJsZUlkSGVscGVyXCI7XG5pbXBvcnQgeyBEYXRhRmllbGRBYnN0cmFjdFR5cGVzLCBGYWNldFR5cGVzIH0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzXCI7XG50eXBlIElEUGFydCA9IHN0cmluZyB8IHsgRmFjZXQ6IEZhY2V0VHlwZXMgfSB8IERhdGFGaWVsZEFic3RyYWN0VHlwZXM7XG5jb25zdCBCQVNFX0lEOiBJRFBhcnRbXSA9IFtcImZlXCJdO1xuXG4vKipcbiAqIFNob3J0Y3V0IHRvIHRoZSBzdGFibGVJZEhlbHBlciBwcm92aWRpbmcgYSBcImN1cnJ5XCIgbGlrZSBtZXRob2Qgd2hlcmUgdGhlIGxhc3QgcGFyYW1ldGVyIGlzIG1pc3NpbmcuXG4gKlxuICogQHBhcmFtIHNGaXhlZFBhcnRcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBzaG9ydGN1dCBmdW5jdGlvbiB3aXRoIHRoZSBmaXhlZCBJRCBwYXJ0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBJREdlbmVyYXRvciguLi5zRml4ZWRQYXJ0OiBJRFBhcnRbXSkge1xuXHRyZXR1cm4gZnVuY3Rpb24oLi4uc0lEUGFydDogSURQYXJ0W10pIHtcblx0XHRyZXR1cm4gZ2VuZXJhdGUoQkFTRV9JRC5jb25jYXQoLi4uc0ZpeGVkUGFydCwgLi4uc0lEUGFydCkpO1xuXHR9O1xufVxuXG4vKipcbiAqIFRob3NlIGFyZSBhbGwgaGVscGVycyB0byBjZW50cmFsaXplIElEIGdlbmVyYXRpb24gaW4gdGhlIGNvZGUgZm9yIGRpZmZlcmVudCBlbGVtZW50c1xuICovXG5leHBvcnQgY29uc3QgSGVhZGVyRmFjZXRJRCA9IElER2VuZXJhdG9yKFwiSGVhZGVyRmFjZXRcIik7XG5leHBvcnQgY29uc3QgSGVhZGVyRmFjZXRDb250YWluZXJJRCA9IElER2VuZXJhdG9yKFwiSGVhZGVyRmFjZXRDb250YWluZXJcIik7XG5leHBvcnQgY29uc3QgSGVhZGVyRmFjZXRGb3JtSUQgPSBJREdlbmVyYXRvcihcIkhlYWRlckZhY2V0XCIsIFwiRm9ybVwiKTtcbmV4cG9ydCBjb25zdCBDdXN0b21IZWFkZXJGYWNldElEID0gSURHZW5lcmF0b3IoXCJIZWFkZXJGYWNldEN1c3RvbUNvbnRhaW5lclwiKTtcbmV4cG9ydCBjb25zdCBFZGl0YWJsZUhlYWRlclNlY3Rpb25JRCA9IElER2VuZXJhdG9yKFwiRWRpdGFibGVIZWFkZXJTZWN0aW9uXCIpO1xuZXhwb3J0IGNvbnN0IFNlY3Rpb25JRCA9IElER2VuZXJhdG9yKFwiRmFjZXRTZWN0aW9uXCIpO1xuZXhwb3J0IGNvbnN0IEN1c3RvbVNlY3Rpb25JRCA9IElER2VuZXJhdG9yKFwiQ3VzdG9tU2VjdGlvblwiKTtcbmV4cG9ydCBjb25zdCBTdWJTZWN0aW9uSUQgPSBJREdlbmVyYXRvcihcIkZhY2V0U3ViU2VjdGlvblwiKTtcbmV4cG9ydCBjb25zdCBDdXN0b21TdWJTZWN0aW9uSUQgPSBJREdlbmVyYXRvcihcIkN1c3RvbVN1YlNlY3Rpb25cIik7XG5leHBvcnQgY29uc3QgU2lkZUNvbnRlbnRJRCA9IElER2VuZXJhdG9yKFwiU2lkZUNvbnRlbnRcIik7XG5leHBvcnQgY29uc3QgU2lkZUNvbnRlbnRMYXlvdXRJRCA9IGZ1bmN0aW9uKHNTZWN0aW9uSUQ6IHN0cmluZykge1xuXHRyZXR1cm4gZ2VuZXJhdGUoW1wiZmVcIiwgc1NlY3Rpb25JRCwgXCJTaWRlQ29udGVudExheW91dFwiXSk7XG59O1xuZXhwb3J0IGNvbnN0IEZvcm1JRCA9IElER2VuZXJhdG9yKFwiRm9ybVwiKTtcbmV4cG9ydCBjb25zdCBGb3JtU3RhbmRhcmRBY3Rpb25CdXR0b25JRCA9IGZ1bmN0aW9uKHNGb3JtQ29udGFpbmVySWQ6IHN0cmluZywgc0FjdGlvbk5hbWU6IHN0cmluZykge1xuXHRyZXR1cm4gZ2VuZXJhdGUoW1wiZmVcIiwgXCJGb3JtQ29udGFpbmVyXCIsIHNGb3JtQ29udGFpbmVySWQsIFwiU3RhbmRhcmRBY3Rpb25cIiwgc0FjdGlvbk5hbWVdKTtcbn07XG5leHBvcnQgY29uc3QgVGFibGVJRCA9IElER2VuZXJhdG9yKFwidGFibGVcIik7XG5leHBvcnQgY29uc3QgQ3VzdG9tVGFiSUQgPSBJREdlbmVyYXRvcihcIkN1c3RvbVRhYlwiKTtcbmV4cG9ydCBjb25zdCBGaWx0ZXJCYXJJRCA9IElER2VuZXJhdG9yKFwiRmlsdGVyQmFyXCIpO1xuZXhwb3J0IGNvbnN0IEljb25UYWJCYXJJRCA9IElER2VuZXJhdG9yKFwiVGFiTXVsdGlwbGVNb2RlXCIpO1xuZXhwb3J0IGNvbnN0IEZpbHRlclZhcmlhbnRNYW5hZ2VtZW50SUQgPSBmdW5jdGlvbihzRmlsdGVySUQ6IHN0cmluZykge1xuXHRyZXR1cm4gZ2VuZXJhdGUoW3NGaWx0ZXJJRCwgXCJWYXJpYW50TWFuYWdlbWVudFwiXSk7XG59O1xuZXhwb3J0IGNvbnN0IENoYXJ0SUQgPSBJREdlbmVyYXRvcihcIkNoYXJ0XCIpO1xuZXhwb3J0IGNvbnN0IEN1c3RvbUFjdGlvbklEID0gZnVuY3Rpb24oc0FjdGlvbklEOiBzdHJpbmcpIHtcblx0cmV0dXJuIGdlbmVyYXRlKFtcIkN1c3RvbUFjdGlvblwiLCBzQWN0aW9uSURdKTtcbn07XG5leHBvcnQgY29uc3QgS1BJSUQgPSBJREdlbmVyYXRvcihcIktQSVwiKTtcbiJdfQ==