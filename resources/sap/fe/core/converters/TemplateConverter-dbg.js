/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["./ManifestSettings", "./templates/ListReportConverter", "./templates/ObjectPageConverter", "./MetaModelConverter", "sap/fe/core/converters/helpers/IssueManager", "sap/base/util/merge", "./ConverterContext"], function (ManifestSettings, ListReportConverter, ObjectPageConverter, MetaModelConverter, IssueManager, merge, ConverterContext) {
  "use strict";

  var _exports = {};
  var IssueCategoryType = IssueManager.IssueCategoryType;
  var IssueSeverity = IssueManager.IssueSeverity;
  var IssueCategory = IssueManager.IssueCategory;
  var getInvolvedDataModelObjects = MetaModelConverter.getInvolvedDataModelObjects;
  var convertTypes = MetaModelConverter.convertTypes;
  var TemplateType = ManifestSettings.TemplateType;

  function handleErrorForCollectionFacets(oFacets, oDiagnostics, sEntitySetName, level) {
    oFacets.forEach(function (oFacet) {
      var Message = "For entity set " + sEntitySetName;

      if ((oFacet === null || oFacet === void 0 ? void 0 : oFacet.$Type) === "com.sap.vocabularies.UI.v1.CollectionFacet" && !(oFacet !== null && oFacet !== void 0 && oFacet.ID)) {
        var _IssueCategoryType$Fa;

        Message = Message + ", " + "level " + level + ", the collection facet does not have an ID.";
        oDiagnostics.addIssue(IssueCategory.Facets, IssueSeverity.High, Message, IssueCategoryType, IssueCategoryType === null || IssueCategoryType === void 0 ? void 0 : (_IssueCategoryType$Fa = IssueCategoryType.Facets) === null || _IssueCategoryType$Fa === void 0 ? void 0 : _IssueCategoryType$Fa.MissingID);
      }

      if ((oFacet === null || oFacet === void 0 ? void 0 : oFacet.$Type) === "com.sap.vocabularies.UI.v1.CollectionFacet" && level >= 3) {
        var _IssueCategoryType$Fa2;

        Message = Message + ", collection facet " + oFacet.Label + " is not supported at " + "level " + level;
        oDiagnostics.addIssue(IssueCategory.Facets, IssueSeverity.Medium, Message, IssueCategoryType, IssueCategoryType === null || IssueCategoryType === void 0 ? void 0 : (_IssueCategoryType$Fa2 = IssueCategoryType.Facets) === null || _IssueCategoryType$Fa2 === void 0 ? void 0 : _IssueCategoryType$Fa2.UnSupportedLevel);
      }

      if (oFacet !== null && oFacet !== void 0 && oFacet.Facets) {
        handleErrorForCollectionFacets(oFacet === null || oFacet === void 0 ? void 0 : oFacet.Facets, oDiagnostics, sEntitySetName, ++level);
        level = level - 1;
      }
    });
  }
  /**
   * Based on a template type, convert the metamodel and manifest definition into a json structure for the page.
   * @param {TemplateType} sTemplateType The template type
   * @param {ODataMetaModel} oMetaModel The odata model metaModel
   * @param {BaseManifestSettings} oManifestSettings The current manifest settings
   * @param {IDiagnostics} oDiagnostics The diagnostics wrapper
   * @param {string} sFullContextPath The context path to reach this page
   * @param oCapabilities
   * @returns {PageDefinition} The target page definition
   */


  function convertPage(sTemplateType, oMetaModel, oManifestSettings, oDiagnostics, sFullContextPath, oCapabilities) {
    var _oConverterOutput$ent;

    var oConverterOutput = convertTypes(oMetaModel, oCapabilities);
    oConverterOutput.diagnostics.forEach(function (annotationErrorDetail) {
      var checkIfIssueExists = oDiagnostics.checkIfIssueExists(IssueCategory.Annotation, IssueSeverity.High, annotationErrorDetail.message);

      if (!checkIfIssueExists) {
        oDiagnostics.addIssue(IssueCategory.Annotation, IssueSeverity.High, annotationErrorDetail.message);
      }
    });
    oConverterOutput === null || oConverterOutput === void 0 ? void 0 : (_oConverterOutput$ent = oConverterOutput.entityTypes) === null || _oConverterOutput$ent === void 0 ? void 0 : _oConverterOutput$ent.forEach(function (oEntitySet) {
      var _oEntitySet$annotatio, _oEntitySet$annotatio2;

      if (oEntitySet !== null && oEntitySet !== void 0 && (_oEntitySet$annotatio = oEntitySet.annotations) !== null && _oEntitySet$annotatio !== void 0 && (_oEntitySet$annotatio2 = _oEntitySet$annotatio.UI) !== null && _oEntitySet$annotatio2 !== void 0 && _oEntitySet$annotatio2.Facets) {
        var _oEntitySet$annotatio3, _oEntitySet$annotatio4;

        handleErrorForCollectionFacets(oEntitySet === null || oEntitySet === void 0 ? void 0 : (_oEntitySet$annotatio3 = oEntitySet.annotations) === null || _oEntitySet$annotatio3 === void 0 ? void 0 : (_oEntitySet$annotatio4 = _oEntitySet$annotatio3.UI) === null || _oEntitySet$annotatio4 === void 0 ? void 0 : _oEntitySet$annotatio4.Facets, oDiagnostics, oEntitySet === null || oEntitySet === void 0 ? void 0 : oEntitySet.name, 1);
      }
    });
    var sTargetEntitySetName = oManifestSettings.entitySet;
    var sContextPath = (oManifestSettings === null || oManifestSettings === void 0 ? void 0 : oManifestSettings.contextPath) || (sFullContextPath === "/" ? sFullContextPath + sTargetEntitySetName : sFullContextPath);
    var oContext = oMetaModel.createBindingContext(sContextPath);
    var oFullContext = getInvolvedDataModelObjects(oContext);

    if (oFullContext) {
      var oConvertedPage = {};

      switch (sTemplateType) {
        case TemplateType.ListReport:
        case TemplateType.AnalyticalListPage:
          oConvertedPage = ListReportConverter.convertPage(new ConverterContext(oConverterOutput, oManifestSettings, oDiagnostics, merge, oFullContext));
          break;

        case TemplateType.ObjectPage:
          oConvertedPage = ObjectPageConverter.convertPage(new ConverterContext(oConverterOutput, oManifestSettings, oDiagnostics, merge, oFullContext));
          break;
      }

      return oConvertedPage;
    }

    return undefined;
  }

  _exports.convertPage = convertPage;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRlbXBsYXRlQ29udmVydGVyLnRzIl0sIm5hbWVzIjpbImhhbmRsZUVycm9yRm9yQ29sbGVjdGlvbkZhY2V0cyIsIm9GYWNldHMiLCJvRGlhZ25vc3RpY3MiLCJzRW50aXR5U2V0TmFtZSIsImxldmVsIiwiZm9yRWFjaCIsIm9GYWNldCIsIk1lc3NhZ2UiLCIkVHlwZSIsIklEIiwiYWRkSXNzdWUiLCJJc3N1ZUNhdGVnb3J5IiwiRmFjZXRzIiwiSXNzdWVTZXZlcml0eSIsIkhpZ2giLCJJc3N1ZUNhdGVnb3J5VHlwZSIsIk1pc3NpbmdJRCIsIkxhYmVsIiwiTWVkaXVtIiwiVW5TdXBwb3J0ZWRMZXZlbCIsImNvbnZlcnRQYWdlIiwic1RlbXBsYXRlVHlwZSIsIm9NZXRhTW9kZWwiLCJvTWFuaWZlc3RTZXR0aW5ncyIsInNGdWxsQ29udGV4dFBhdGgiLCJvQ2FwYWJpbGl0aWVzIiwib0NvbnZlcnRlck91dHB1dCIsImNvbnZlcnRUeXBlcyIsImRpYWdub3N0aWNzIiwiYW5ub3RhdGlvbkVycm9yRGV0YWlsIiwiY2hlY2tJZklzc3VlRXhpc3RzIiwiQW5ub3RhdGlvbiIsIm1lc3NhZ2UiLCJlbnRpdHlUeXBlcyIsIm9FbnRpdHlTZXQiLCJhbm5vdGF0aW9ucyIsIlVJIiwibmFtZSIsInNUYXJnZXRFbnRpdHlTZXROYW1lIiwiZW50aXR5U2V0Iiwic0NvbnRleHRQYXRoIiwiY29udGV4dFBhdGgiLCJvQ29udGV4dCIsImNyZWF0ZUJpbmRpbmdDb250ZXh0Iiwib0Z1bGxDb250ZXh0IiwiZ2V0SW52b2x2ZWREYXRhTW9kZWxPYmplY3RzIiwib0NvbnZlcnRlZFBhZ2UiLCJUZW1wbGF0ZVR5cGUiLCJMaXN0UmVwb3J0IiwiQW5hbHl0aWNhbExpc3RQYWdlIiwiTGlzdFJlcG9ydENvbnZlcnRlciIsIkNvbnZlcnRlckNvbnRleHQiLCJtZXJnZSIsIk9iamVjdFBhZ2UiLCJPYmplY3RQYWdlQ29udmVydGVyIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiO0FBQUE7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QXhFLEVBQStFUixZQUEvRSxDQURnQixDQUFqQjtBQUdBOztBQUNELGFBQUtHLFlBQVksQ0FBQ00sVUFBbEI7QUFDQ1AsVUFBQUEsY0FBYyxHQUFHUSxtQkFBbUIsQ0FBQ2xDLFdBQXBCLENBQ2hCLElBQUkrQixnQkFBSixDQUFxQnpCLGdCQUFyQixFQUF1Q0gsaUJBQXZDLEVBQTBEckIsWUFBMUQsRUFBd0VrRCxLQUF4RSxFQUErRVIsWUFBL0UsQ0FEZ0IsQ0FBakI7QUFHQTtBQVhGOztBQWFBLGFBQU9FLGNBQVA7QUFDQTs7QUFDRCxXQUFPUyxTQUFQO0FBQ0EiLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNYW5pZmVzdFNldHRpbmdzLCBUZW1wbGF0ZVR5cGUgfSBmcm9tIFwiLi9NYW5pZmVzdFNldHRpbmdzXCI7XG5pbXBvcnQgKiBhcyBMaXN0UmVwb3J0Q29udmVydGVyIGZyb20gXCIuL3RlbXBsYXRlcy9MaXN0UmVwb3J0Q29udmVydGVyXCI7XG5pbXBvcnQgKiBhcyBPYmplY3RQYWdlQ29udmVydGVyIGZyb20gXCIuL3RlbXBsYXRlcy9PYmplY3RQYWdlQ29udmVydGVyXCI7XG5pbXBvcnQgeyBjb252ZXJ0VHlwZXMsIGdldEludm9sdmVkRGF0YU1vZGVsT2JqZWN0cywgRW52aXJvbm1lbnRDYXBhYmlsaXRpZXMgfSBmcm9tIFwiLi9NZXRhTW9kZWxDb252ZXJ0ZXJcIjtcbmltcG9ydCB7IE9EYXRhTWV0YU1vZGVsIH0gZnJvbSBcInNhcC91aS9tb2RlbC9vZGF0YS92NFwiO1xuaW1wb3J0IHsgSXNzdWVDYXRlZ29yeSwgSXNzdWVTZXZlcml0eSwgSXNzdWVDYXRlZ29yeVR5cGUgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9oZWxwZXJzL0lzc3VlTWFuYWdlclwiO1xuXG5pbXBvcnQgeyBtZXJnZSB9IGZyb20gXCJzYXAvYmFzZS91dGlsXCI7XG5pbXBvcnQgeyBGYWNldFR5cGVzLCBVSUFubm90YXRpb25UeXBlcyB9IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlc1wiO1xuaW1wb3J0IENvbnZlcnRlckNvbnRleHQgZnJvbSBcIi4vQ29udmVydGVyQ29udGV4dFwiO1xuXG4vKipcbiAqIEB0eXBlZGVmIFBhZ2VEZWZpbml0aW9uXG4gKi9cbmV4cG9ydCB0eXBlIFBhZ2VEZWZpbml0aW9uID0ge1xuXHR0ZW1wbGF0ZTogc3RyaW5nO1xufTtcblxuLyoqIEB0eXBlZGVmIElEaWFnbm9zdGljcyAqKi9cbmV4cG9ydCBpbnRlcmZhY2UgSURpYWdub3N0aWNzIHtcblx0YWRkSXNzdWUoXG5cdFx0aXNzdWVDYXRlZ29yeTogSXNzdWVDYXRlZ29yeSB8IHN0cmluZyxcblx0XHRpc3N1ZVNldmVyaXR5OiBJc3N1ZVNldmVyaXR5LFxuXHRcdGRldGFpbHM6IHN0cmluZyxcblx0XHRpc3N1ZUNhdGVnb3J5VHlwZT86IGFueSxcblx0XHRpc3N1ZVN1YkNhdGVnb3J5Pzogc3RyaW5nXG5cdCk6IHZvaWQ7XG5cdGdldElzc3VlcygpOiBhbnlbXTtcblx0Y2hlY2tJZklzc3VlRXhpc3RzKFxuXHRcdGlzc3VlQ2F0ZWdvcnk6IElzc3VlQ2F0ZWdvcnksXG5cdFx0aXNzdWVTZXZlcml0eTogSXNzdWVTZXZlcml0eSxcblx0XHRkZXRhaWxzOiBzdHJpbmcsXG5cdFx0aXNzdWVDYXRlZ29yeVR5cGU/OiBhbnksXG5cdFx0aXNzdWVTdWJDYXRlZ29yeT86IHN0cmluZ1xuXHQpOiBib29sZWFuO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVFcnJvckZvckNvbGxlY3Rpb25GYWNldHMob0ZhY2V0czogRmFjZXRUeXBlc1tdLCBvRGlhZ25vc3RpY3M6IElEaWFnbm9zdGljcywgc0VudGl0eVNldE5hbWU6IHN0cmluZywgbGV2ZWw6IG51bWJlcikge1xuXHRvRmFjZXRzLmZvckVhY2goKG9GYWNldDogYW55KSA9PiB7XG5cdFx0bGV0IE1lc3NhZ2UgPSBcIkZvciBlbnRpdHkgc2V0IFwiICsgc0VudGl0eVNldE5hbWU7XG5cdFx0aWYgKG9GYWNldD8uJFR5cGUgPT09IFVJQW5ub3RhdGlvblR5cGVzLkNvbGxlY3Rpb25GYWNldCAmJiAhb0ZhY2V0Py5JRCkge1xuXHRcdFx0TWVzc2FnZSA9IE1lc3NhZ2UgKyBcIiwgXCIgKyBcImxldmVsIFwiICsgbGV2ZWwgKyBcIiwgdGhlIGNvbGxlY3Rpb24gZmFjZXQgZG9lcyBub3QgaGF2ZSBhbiBJRC5cIjtcblx0XHRcdG9EaWFnbm9zdGljcy5hZGRJc3N1ZShcblx0XHRcdFx0SXNzdWVDYXRlZ29yeS5GYWNldHMsXG5cdFx0XHRcdElzc3VlU2V2ZXJpdHkuSGlnaCxcblx0XHRcdFx0TWVzc2FnZSxcblx0XHRcdFx0SXNzdWVDYXRlZ29yeVR5cGUsXG5cdFx0XHRcdElzc3VlQ2F0ZWdvcnlUeXBlPy5GYWNldHM/Lk1pc3NpbmdJRFxuXHRcdFx0KTtcblx0XHR9XG5cdFx0aWYgKG9GYWNldD8uJFR5cGUgPT09IFVJQW5ub3RhdGlvblR5cGVzLkNvbGxlY3Rpb25GYWNldCAmJiBsZXZlbCA+PSAzKSB7XG5cdFx0XHRNZXNzYWdlID0gTWVzc2FnZSArIFwiLCBjb2xsZWN0aW9uIGZhY2V0IFwiICsgb0ZhY2V0LkxhYmVsICsgXCIgaXMgbm90IHN1cHBvcnRlZCBhdCBcIiArIFwibGV2ZWwgXCIgKyBsZXZlbDtcblx0XHRcdG9EaWFnbm9zdGljcy5hZGRJc3N1ZShcblx0XHRcdFx0SXNzdWVDYXRlZ29yeS5GYWNldHMsXG5cdFx0XHRcdElzc3VlU2V2ZXJpdHkuTWVkaXVtLFxuXHRcdFx0XHRNZXNzYWdlLFxuXHRcdFx0XHRJc3N1ZUNhdGVnb3J5VHlwZSxcblx0XHRcdFx0SXNzdWVDYXRlZ29yeVR5cGU/LkZhY2V0cz8uVW5TdXBwb3J0ZWRMZXZlbFxuXHRcdFx0KTtcblx0XHR9XG5cdFx0aWYgKG9GYWNldD8uRmFjZXRzKSB7XG5cdFx0XHRoYW5kbGVFcnJvckZvckNvbGxlY3Rpb25GYWNldHMob0ZhY2V0Py5GYWNldHMsIG9EaWFnbm9zdGljcywgc0VudGl0eVNldE5hbWUsICsrbGV2ZWwpO1xuXHRcdFx0bGV2ZWwgPSBsZXZlbCAtIDE7XG5cdFx0fVxuXHR9KTtcbn1cblxuLyoqXG4gKiBCYXNlZCBvbiBhIHRlbXBsYXRlIHR5cGUsIGNvbnZlcnQgdGhlIG1ldGFtb2RlbCBhbmQgbWFuaWZlc3QgZGVmaW5pdGlvbiBpbnRvIGEganNvbiBzdHJ1Y3R1cmUgZm9yIHRoZSBwYWdlLlxuICogQHBhcmFtIHtUZW1wbGF0ZVR5cGV9IHNUZW1wbGF0ZVR5cGUgVGhlIHRlbXBsYXRlIHR5cGVcbiAqIEBwYXJhbSB7T0RhdGFNZXRhTW9kZWx9IG9NZXRhTW9kZWwgVGhlIG9kYXRhIG1vZGVsIG1ldGFNb2RlbFxuICogQHBhcmFtIHtCYXNlTWFuaWZlc3RTZXR0aW5nc30gb01hbmlmZXN0U2V0dGluZ3MgVGhlIGN1cnJlbnQgbWFuaWZlc3Qgc2V0dGluZ3NcbiAqIEBwYXJhbSB7SURpYWdub3N0aWNzfSBvRGlhZ25vc3RpY3MgVGhlIGRpYWdub3N0aWNzIHdyYXBwZXJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzRnVsbENvbnRleHRQYXRoIFRoZSBjb250ZXh0IHBhdGggdG8gcmVhY2ggdGhpcyBwYWdlXG4gKiBAcGFyYW0gb0NhcGFiaWxpdGllc1xuICogQHJldHVybnMge1BhZ2VEZWZpbml0aW9ufSBUaGUgdGFyZ2V0IHBhZ2UgZGVmaW5pdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFBhZ2UoXG5cdHNUZW1wbGF0ZVR5cGU6IFRlbXBsYXRlVHlwZSxcblx0b01ldGFNb2RlbDogT0RhdGFNZXRhTW9kZWwsXG5cdG9NYW5pZmVzdFNldHRpbmdzOiBCYXNlTWFuaWZlc3RTZXR0aW5ncyxcblx0b0RpYWdub3N0aWNzOiBJRGlhZ25vc3RpY3MsXG5cdHNGdWxsQ29udGV4dFBhdGg6IHN0cmluZyxcblx0b0NhcGFiaWxpdGllcz86IEVudmlyb25tZW50Q2FwYWJpbGl0aWVzXG4pIHtcblx0Y29uc3Qgb0NvbnZlcnRlck91dHB1dCA9IGNvbnZlcnRUeXBlcyhvTWV0YU1vZGVsLCBvQ2FwYWJpbGl0aWVzKTtcblx0b0NvbnZlcnRlck91dHB1dC5kaWFnbm9zdGljcy5mb3JFYWNoKGFubm90YXRpb25FcnJvckRldGFpbCA9PiB7XG5cdFx0Y29uc3QgY2hlY2tJZklzc3VlRXhpc3RzID0gb0RpYWdub3N0aWNzLmNoZWNrSWZJc3N1ZUV4aXN0cyhcblx0XHRcdElzc3VlQ2F0ZWdvcnkuQW5ub3RhdGlvbixcblx0XHRcdElzc3VlU2V2ZXJpdHkuSGlnaCxcblx0XHRcdGFubm90YXRpb25FcnJvckRldGFpbC5tZXNzYWdlXG5cdFx0KTtcblx0XHRpZiAoIWNoZWNrSWZJc3N1ZUV4aXN0cykge1xuXHRcdFx0b0RpYWdub3N0aWNzLmFkZElzc3VlKElzc3VlQ2F0ZWdvcnkuQW5ub3RhdGlvbiwgSXNzdWVTZXZlcml0eS5IaWdoLCBhbm5vdGF0aW9uRXJyb3JEZXRhaWwubWVzc2FnZSk7XG5cdFx0fVxuXHR9KTtcblx0b0NvbnZlcnRlck91dHB1dD8uZW50aXR5VHlwZXM/LmZvckVhY2goKG9FbnRpdHlTZXQ6IGFueSkgPT4ge1xuXHRcdGlmIChvRW50aXR5U2V0Py5hbm5vdGF0aW9ucz8uVUk/LkZhY2V0cykge1xuXHRcdFx0aGFuZGxlRXJyb3JGb3JDb2xsZWN0aW9uRmFjZXRzKG9FbnRpdHlTZXQ/LmFubm90YXRpb25zPy5VST8uRmFjZXRzLCBvRGlhZ25vc3RpY3MsIG9FbnRpdHlTZXQ/Lm5hbWUsIDEpO1xuXHRcdH1cblx0fSk7XG5cdGNvbnN0IHNUYXJnZXRFbnRpdHlTZXROYW1lID0gb01hbmlmZXN0U2V0dGluZ3MuZW50aXR5U2V0O1xuXHRjb25zdCBzQ29udGV4dFBhdGggPVxuXHRcdG9NYW5pZmVzdFNldHRpbmdzPy5jb250ZXh0UGF0aCB8fCAoc0Z1bGxDb250ZXh0UGF0aCA9PT0gXCIvXCIgPyBzRnVsbENvbnRleHRQYXRoICsgc1RhcmdldEVudGl0eVNldE5hbWUgOiBzRnVsbENvbnRleHRQYXRoKTtcblx0Y29uc3Qgb0NvbnRleHQgPSBvTWV0YU1vZGVsLmNyZWF0ZUJpbmRpbmdDb250ZXh0KHNDb250ZXh0UGF0aCk7XG5cdGNvbnN0IG9GdWxsQ29udGV4dCA9IGdldEludm9sdmVkRGF0YU1vZGVsT2JqZWN0cyhvQ29udGV4dCk7XG5cblx0aWYgKG9GdWxsQ29udGV4dCkge1xuXHRcdGxldCBvQ29udmVydGVkUGFnZSA9IHt9O1xuXHRcdHN3aXRjaCAoc1RlbXBsYXRlVHlwZSkge1xuXHRcdFx0Y2FzZSBUZW1wbGF0ZVR5cGUuTGlzdFJlcG9ydDpcblx0XHRcdGNhc2UgVGVtcGxhdGVUeXBlLkFuYWx5dGljYWxMaXN0UGFnZTpcblx0XHRcdFx0b0NvbnZlcnRlZFBhZ2UgPSBMaXN0UmVwb3J0Q29udmVydGVyLmNvbnZlcnRQYWdlKFxuXHRcdFx0XHRcdG5ldyBDb252ZXJ0ZXJDb250ZXh0KG9Db252ZXJ0ZXJPdXRwdXQsIG9NYW5pZmVzdFNldHRpbmdzLCBvRGlhZ25vc3RpY3MsIG1lcmdlLCBvRnVsbENvbnRleHQpXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBUZW1wbGF0ZVR5cGUuT2JqZWN0UGFnZTpcblx0XHRcdFx0b0NvbnZlcnRlZFBhZ2UgPSBPYmplY3RQYWdlQ29udmVydGVyLmNvbnZlcnRQYWdlKFxuXHRcdFx0XHRcdG5ldyBDb252ZXJ0ZXJDb250ZXh0KG9Db252ZXJ0ZXJPdXRwdXQsIG9NYW5pZmVzdFNldHRpbmdzLCBvRGlhZ25vc3RpY3MsIG1lcmdlLCBvRnVsbENvbnRleHQpXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRyZXR1cm4gb0NvbnZlcnRlZFBhZ2U7XG5cdH1cblx0cmV0dXJuIHVuZGVmaW5lZDtcbn1cbiJdfQ==