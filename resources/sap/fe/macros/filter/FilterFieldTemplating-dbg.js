/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/templating/UIFormatters", "sap/fe/core/templating/PropertyFormatters"], function (UIFormatters, PropertyFormatters) {
  "use strict";

  var _exports = {};
  var getPropertyObjectPath = PropertyFormatters.getPropertyObjectPath;
  var getProperty = PropertyFormatters.getProperty;
  var hasValueHelp = PropertyFormatters.hasValueHelp;
  var getDisplayMode = UIFormatters.getDisplayMode;

  var getDisplayProperty = function (oContext, oInterface) {
    var propertyPath = getPropertyObjectPath(oContext, oInterface);
    var oProperty = getProperty(oContext, oInterface);
    return hasValueHelp(oContext, oInterface) ? getDisplayMode(oProperty, propertyPath) : "Value";
  };

  _exports.getDisplayProperty = getDisplayProperty;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZpbHRlckZpZWxkVGVtcGxhdGluZy50cyJdLCJuYW1lcyI6WyJnZXREaXNwbGF5UHJvcGVydHkiLCJvQ29udGV4dCIsIm9JbnRlcmZhY2UiLCJwcm9wZXJ0eVBhdGgiLCJnZXRQcm9wZXJ0eU9iamVjdFBhdGgiLCJvUHJvcGVydHkiLCJnZXRQcm9wZXJ0eSIsImhhc1ZhbHVlSGVscCIsImdldERpc3BsYXlNb2RlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FBR08sTUFBTUEsa0JBQWtCLEdBQUcsVUFBU0MsUUFBVCxFQUFxQ0MsVUFBckMsRUFBc0Y7QUFDdkgsUUFBTUMsWUFBWSxHQUFHQyxxQkFBcUIsQ0FBQ0gsUUFBRCxFQUFXQyxVQUFYLENBQTFDO0FBQ0EsUUFBTUcsU0FBbUIsR0FBR0MsV0FBVyxDQUFDTCxRQUFELEVBQVdDLFVBQVgsQ0FBdkM7QUFFQSxXQUFPSyxZQUFZLENBQUNOLFFBQUQsRUFBV0MsVUFBWCxDQUFaLEdBQXFDTSxjQUFjLENBQUNILFNBQUQsRUFBWUYsWUFBWixDQUFuRCxHQUErRSxPQUF0RjtBQUNBLEdBTE0iLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldERpc3BsYXlNb2RlLCBNZXRhTW9kZWxDb250ZXh0LCBDb21wdXRlZEFubm90YXRpb25JbnRlcmZhY2UgfSBmcm9tIFwic2FwL2ZlL2NvcmUvdGVtcGxhdGluZy9VSUZvcm1hdHRlcnNcIjtcbmltcG9ydCB7IGhhc1ZhbHVlSGVscCwgZ2V0UHJvcGVydHksIGdldFByb3BlcnR5T2JqZWN0UGF0aCB9IGZyb20gXCJzYXAvZmUvY29yZS90ZW1wbGF0aW5nL1Byb3BlcnR5Rm9ybWF0dGVyc1wiO1xuXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlcy9kaXN0L0NvbnZlcnRlclwiO1xuXG5leHBvcnQgY29uc3QgZ2V0RGlzcGxheVByb3BlcnR5ID0gZnVuY3Rpb24ob0NvbnRleHQ6IE1ldGFNb2RlbENvbnRleHQsIG9JbnRlcmZhY2U6IENvbXB1dGVkQW5ub3RhdGlvbkludGVyZmFjZSk6IHN0cmluZyB7XG5cdGNvbnN0IHByb3BlcnR5UGF0aCA9IGdldFByb3BlcnR5T2JqZWN0UGF0aChvQ29udGV4dCwgb0ludGVyZmFjZSk7XG5cdGNvbnN0IG9Qcm9wZXJ0eTogUHJvcGVydHkgPSBnZXRQcm9wZXJ0eShvQ29udGV4dCwgb0ludGVyZmFjZSk7XG5cblx0cmV0dXJuIGhhc1ZhbHVlSGVscChvQ29udGV4dCwgb0ludGVyZmFjZSkgPyBnZXREaXNwbGF5TW9kZShvUHJvcGVydHksIHByb3BlcnR5UGF0aCkgOiBcIlZhbHVlXCI7XG59O1xuIl19