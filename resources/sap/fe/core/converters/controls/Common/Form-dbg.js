/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["../../helpers/ConfigurableObject", "../../helpers/ID", "../../helpers/Key", "../../ManifestSettings", "sap/fe/core/converters/annotations/DataField", "sap/fe/core/templating/DataModelPathHelper", "../../../helpers/StableIdHelper"], function (ConfigurableObject, ID, Key, ManifestSettings, DataField, DataModelPathHelper, StableIdHelper) {
  "use strict";

  var _exports = {};
  var generate = StableIdHelper.generate;
  var getTargetObjectPath = DataModelPathHelper.getTargetObjectPath;
  var getTargetEntitySetPath = DataModelPathHelper.getTargetEntitySetPath;
  var getSemanticObjectPath = DataField.getSemanticObjectPath;
  var ActionType = ManifestSettings.ActionType;
  var KeyHelper = Key.KeyHelper;
  var FormStandardActionButtonID = ID.FormStandardActionButtonID;
  var FormID = ID.FormID;
  var Placement = ConfigurableObject.Placement;
  var insertCustomElements = ConfigurableObject.insertCustomElements;

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var FormElementType;

  (function (FormElementType) {
    FormElementType["Default"] = "Default";
    FormElementType["Annotation"] = "Annotation";
  })(FormElementType || (FormElementType = {}));

  _exports.FormElementType = FormElementType;

  /**
   * Returns default format options for text fields on a form.
   *
   * @returns {FormatOptionsType} Collection of format options with default values
   */
  function getDefaultFormatOptionsForForm() {
    return {
      textLinesEdit: 4
    };
  }

  function isFieldPartOfPreview(field, formPartOfPreview) {
    var _field$annotations, _field$annotations$UI, _field$annotations2, _field$annotations2$U;

    // Both each form and field can have the PartOfPreview annotation. Only if the form is not hidden (not partOfPreview) we allow toggling on field level
    return formPartOfPreview === false || ((_field$annotations = field.annotations) === null || _field$annotations === void 0 ? void 0 : (_field$annotations$UI = _field$annotations.UI) === null || _field$annotations$UI === void 0 ? void 0 : _field$annotations$UI.PartOfPreview) === undefined || ((_field$annotations2 = field.annotations) === null || _field$annotations2 === void 0 ? void 0 : (_field$annotations2$U = _field$annotations2.UI) === null || _field$annotations2$U === void 0 ? void 0 : _field$annotations2$U.PartOfPreview) === true;
  }

  function getFormElementsFromAnnotations(facetDefinition, converterContext) {
    var formElements = [];
    var resolvedTarget = converterContext.getEntityTypeAnnotation(facetDefinition.Target.value);
    var formAnnotation = resolvedTarget.annotation;
    converterContext = resolvedTarget.converterContext;

    function getDataFieldsFromAnnotations(field, formPartOfPreview) {
      var _field$annotations3, _field$annotations3$U, _field$annotations3$U2;

      var semanticObjectAnnotationPath = getSemanticObjectPath(converterContext, field);

      if (field.$Type !== "com.sap.vocabularies.UI.v1.DataFieldForAction" && field.$Type !== "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation" && ((_field$annotations3 = field.annotations) === null || _field$annotations3 === void 0 ? void 0 : (_field$annotations3$U = _field$annotations3.UI) === null || _field$annotations3$U === void 0 ? void 0 : (_field$annotations3$U2 = _field$annotations3$U.Hidden) === null || _field$annotations3$U2 === void 0 ? void 0 : _field$annotations3$U2.valueOf()) !== true) {
        formElements.push({
          key: KeyHelper.generateKeyFromDataField(field),
          type: FormElementType.Annotation,
          annotationPath: converterContext.getEntitySetBasedAnnotationPath(field.fullyQualifiedName) + "/",
          semanticObjectPath: semanticObjectAnnotationPath,
          formatOptions: getDefaultFormatOptionsForForm(),
          isPartOfPreview: isFieldPartOfPreview(field, formPartOfPreview)
        });
      }
    }

    switch (formAnnotation === null || formAnnotation === void 0 ? void 0 : formAnnotation.term) {
      case "com.sap.vocabularies.UI.v1.FieldGroup":
        formAnnotation.Data.forEach(function (field) {
          var _facetDefinition$anno, _facetDefinition$anno2;

          return getDataFieldsFromAnnotations(field, (_facetDefinition$anno = facetDefinition.annotations) === null || _facetDefinition$anno === void 0 ? void 0 : (_facetDefinition$anno2 = _facetDefinition$anno.UI) === null || _facetDefinition$anno2 === void 0 ? void 0 : _facetDefinition$anno2.PartOfPreview);
        });
        break;

      case "com.sap.vocabularies.UI.v1.Identification":
        formAnnotation.forEach(function (field) {
          var _facetDefinition$anno3, _facetDefinition$anno4;

          return getDataFieldsFromAnnotations(field, (_facetDefinition$anno3 = facetDefinition.annotations) === null || _facetDefinition$anno3 === void 0 ? void 0 : (_facetDefinition$anno4 = _facetDefinition$anno3.UI) === null || _facetDefinition$anno4 === void 0 ? void 0 : _facetDefinition$anno4.PartOfPreview);
        });
        break;

      case "com.sap.vocabularies.UI.v1.DataPoint":
        formElements.push({
          // key: KeyHelper.generateKeyFromDataField(formAnnotation),
          key: "DataPoint::" + (formAnnotation.qualifier ? formAnnotation.qualifier : ""),
          type: FormElementType.Annotation,
          annotationPath: converterContext.getEntitySetBasedAnnotationPath(formAnnotation.fullyQualifiedName) + "/"
        });
        break;

      case "com.sap.vocabularies.Communication.v1.Contact":
        formElements.push({
          // key: KeyHelper.generateKeyFromDataField(formAnnotation),
          key: "Contact::" + (formAnnotation.qualifier ? formAnnotation.qualifier : ""),
          type: FormElementType.Annotation,
          annotationPath: converterContext.getEntitySetBasedAnnotationPath(formAnnotation.fullyQualifiedName) + "/"
        });
        break;

      default:
        break;
    }

    return formElements;
  }

  function getFormElementsFromManifest(facetDefinition, converterContext) {
    var manifestWrapper = converterContext.getManifestWrapper();
    var manifestFormContainer = manifestWrapper.getFormContainer(facetDefinition.Target.value);
    var formElements = {};

    if (manifestFormContainer !== null && manifestFormContainer !== void 0 && manifestFormContainer.fields) {
      Object.keys(manifestFormContainer === null || manifestFormContainer === void 0 ? void 0 : manifestFormContainer.fields).forEach(function (fieldId) {
        formElements[fieldId] = {
          key: fieldId,
          id: "CustomFormElement::" + fieldId,
          type: FormElementType.Default,
          template: manifestFormContainer.fields[fieldId].template,
          label: manifestFormContainer.fields[fieldId].label,
          position: manifestFormContainer.fields[fieldId].position || {
            placement: Placement.After
          },
          formatOptions: _objectSpread(_objectSpread({}, getDefaultFormatOptionsForForm()), manifestFormContainer.fields[fieldId].formatOptions)
        };
      });
    }

    return formElements;
  }

  _exports.getFormElementsFromManifest = getFormElementsFromManifest;

  function getFormContainer(facetDefinition, converterContext, actions) {
    var _resolvedTarget$conve, _facetDefinition$anno5, _facetDefinition$anno6;

    //TODO form container id
    var sFormContainerId = generate([{
      Facet: facetDefinition
    }]);
    var sAnnotationPath = "/" + facetDefinition.fullyQualifiedName;
    var resolvedTarget = converterContext.getEntityTypeAnnotation(facetDefinition.Target.value);
    var sEntitySetPath; // resolvedTarget doesn't have a entitySet in case Containments and Paramterized services.

    if (resolvedTarget.converterContext.getEntitySet() && resolvedTarget.converterContext.getEntitySet() !== converterContext.getEntitySet()) {
      sEntitySetPath = getTargetEntitySetPath(resolvedTarget.converterContext.getDataModelObjectPath());
    } else if (((_resolvedTarget$conve = resolvedTarget.converterContext.getDataModelObjectPath().targetObject) === null || _resolvedTarget$conve === void 0 ? void 0 : _resolvedTarget$conve.containsTarget) === true) {
      sEntitySetPath = getTargetObjectPath(resolvedTarget.converterContext.getDataModelObjectPath(), false);
    }

    var aFormElements = insertCustomElements(getFormElementsFromAnnotations(facetDefinition, converterContext), getFormElementsFromManifest(facetDefinition, converterContext), {
      formatOptions: "overwrite"
    });
    actions = actions !== undefined ? actions.filter(function (action) {
      return action.facetName == facetDefinition.fullyQualifiedName;
    }) : [];

    if (actions.length === 0) {
      actions = undefined;
    }

    var oActionShowDetails = {
      id: FormStandardActionButtonID(sFormContainerId, "ShowHideDetails"),
      key: "StandardAction::ShowHideDetails",
      text: "{sap.fe.i18n>T_COMMON_OBJECT_PAGE_SHOW_FORM_CONTAINER_DETAILS}",
      type: ActionType.ShowFormDetails,
      press: "FormContainerRuntime.toggleDetails"
    };

    if (((_facetDefinition$anno5 = facetDefinition.annotations) === null || _facetDefinition$anno5 === void 0 ? void 0 : (_facetDefinition$anno6 = _facetDefinition$anno5.UI) === null || _facetDefinition$anno6 === void 0 ? void 0 : _facetDefinition$anno6.PartOfPreview) !== false && aFormElements.some(function (oFormElement) {
      return oFormElement.isPartOfPreview === false;
    })) {
      if (actions !== undefined) {
        actions.push(oActionShowDetails);
      } else {
        actions = [oActionShowDetails];
      }
    }

    return {
      id: sFormContainerId,
      formElements: aFormElements,
      annotationPath: sAnnotationPath,
      entitySet: sEntitySetPath,
      actions: actions
    };
  }

  _exports.getFormContainer = getFormContainer;

  function getFormContainersForCollection(facetDefinition, converterContext, actions) {
    var _facetDefinition$Face;

    var formContainers = []; //TODO coll facet inside coll facet?

    (_facetDefinition$Face = facetDefinition.Facets) === null || _facetDefinition$Face === void 0 ? void 0 : _facetDefinition$Face.forEach(function (facet) {
      // Ignore level 3 collection facet
      if (facet.$Type === "com.sap.vocabularies.UI.v1.CollectionFacet") {
        return;
      }

      formContainers.push(getFormContainer(facet, converterContext, actions));
    });
    return formContainers;
  }

  function isReferenceFacet(facetDefinition) {
    return facetDefinition.$Type === "com.sap.vocabularies.UI.v1.ReferenceFacet";
  }

  _exports.isReferenceFacet = isReferenceFacet;

  function createFormDefinition(facetDefinition, converterContext, actions) {
    var _facetDefinition$anno7, _facetDefinition$anno8, _facetDefinition$anno9;

    switch (facetDefinition.$Type) {
      case "com.sap.vocabularies.UI.v1.CollectionFacet":
        // Keep only valid children
        var formCollectionDefinition = {
          id: FormID({
            Facet: facetDefinition
          }),
          useFormContainerLabels: true,
          hasFacetsNotPartOfPreview: facetDefinition.Facets.some(function (childFacet) {
            var _childFacet$annotatio, _childFacet$annotatio2, _childFacet$annotatio3;

            return ((_childFacet$annotatio = childFacet.annotations) === null || _childFacet$annotatio === void 0 ? void 0 : (_childFacet$annotatio2 = _childFacet$annotatio.UI) === null || _childFacet$annotatio2 === void 0 ? void 0 : (_childFacet$annotatio3 = _childFacet$annotatio2.PartOfPreview) === null || _childFacet$annotatio3 === void 0 ? void 0 : _childFacet$annotatio3.valueOf()) === false;
          }),
          formContainers: getFormContainersForCollection(facetDefinition, converterContext, actions)
        };
        return formCollectionDefinition;

      case "com.sap.vocabularies.UI.v1.ReferenceFacet":
        var formDefinition = {
          id: FormID({
            Facet: facetDefinition
          }),
          useFormContainerLabels: false,
          hasFacetsNotPartOfPreview: ((_facetDefinition$anno7 = facetDefinition.annotations) === null || _facetDefinition$anno7 === void 0 ? void 0 : (_facetDefinition$anno8 = _facetDefinition$anno7.UI) === null || _facetDefinition$anno8 === void 0 ? void 0 : (_facetDefinition$anno9 = _facetDefinition$anno8.PartOfPreview) === null || _facetDefinition$anno9 === void 0 ? void 0 : _facetDefinition$anno9.valueOf()) === false,
          formContainers: [getFormContainer(facetDefinition, converterContext, actions)]
        };
        return formDefinition;

      default:
        throw new Error("Cannot create form based on ReferenceURLFacet");
    }
  }

  _exports.createFormDefinition = createFormDefinition;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZvcm0udHMiXSwibmFtZXMiOlsiRm9ybUVsZW1lbnRUeXBlIiwiZ2V0RGVmYXVsdEZvcm1hdE9wdGlvbnNGb3JGb3JtIiwidGV4dExpbmVzRWRpdCIsImlzRmllbGRQYXJ0T2ZQcmV2aWV3IiwiZmllbGQiLCJmb3JtUGFydE9mUHJldmlldyIsImFubm90YXRpb25zIiwiVUkiLCJQYXJ0T2ZQcmV2aWV3IiwidW5kZWZpbmVkIiwiZ2V0Rm9ybUVsZW1lbnRzRnJvbUFubm90YXRpb25zIiwiZmFjZXREZWZpbml0aW9uIiwiY29udmVydGVyQ29udGV4dCIsImZvcm1FbGVtZW50cyIsInJlc29sdmVkVGFyZ2V0IiwiZ2V0RW50aXR5VHlwZUFubm90YXRpb24iLCJUYXJnZXQiLCJ2YWx1ZSIsImZvcm1Bbm5vdGF0aW9uIiwiYW5ub3RhdGlvbiIsImdldERhdGFGaWVsZHNGcm9tQW5ub3RhdGlvbnMiLCJzZW1hbnRpY09iamVjdEFubm90YXRpb25QYXRoIiwiZ2V0U2VtYW50aWNPYmplY3RQYXRoIiwiJFR5cGUiLCJIaWRkZW4iLCJ2YWx1ZU9mIiwicHVzaCIsImtleSIsIktleUhlbHBlciIsImdlbmVyYXRlS2V5RnJvbURhdGFGaWVsZCIsInR5cGUiLCJBbm5vdGF0aW9uIiwiYW5ub3RhdGlvblBhdGgiLCJnZXRFbnRpdHlTZXRCYXNlZEFubm90YXRpb25QYXRoIiwiZnVsbHlRdWFsaWZpZWROYW1lIiwic2VtYW50aWNPYmplY3RQYXRoIiwiZm9ybWF0T3B0aW9ucyIsImlzUGFydE9mUHJldmlldyIsInRlcm0iLCJEYXRhIiwiZm9yRWFjaCIsInF1YWxpZmllciIsImdldEZvcm1FbGVtZW50c0Zyb21NYW5pZmVzdCIsIm1hbmlmZXN0V3JhcHBlciIsImdldE1hbmlmZXN0V3JhcHBlciIsIm1hbmlmZXN0Rm9ybUNvbnRhaW5lciIsImdldEZvcm1Db250YWluZXIiLCJmaWVsZHMiLCJPYmplY3QiLCJrZXlzIiwiZmllbGRJZCIsImlkIiwiRGVmYXVsdCIsInRlbXBsYXRlIiwibGFiZWwiLCJwb3NpdGlvbiIsInBsYWNlbWVudCIsIlBsYWNlbWVudCIsIkFmdGVyIiwiYWN0aW9ucyIsInNGb3JtQ29udGFpbmVySWQiLCJnZW5lcmF0ZSIsIkZhY2V0Iiwic0Fubm90YXRpb25QYXRoIiwic0VudGl0eVNldFBhdGgiLCJnZXRFbnRpdHlTZXQiLCJnZXRUYXJnZXRFbnRpdHlTZXRQYXRoIiwiZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCIsInRhcmdldE9iamVjdCIsImNvbnRhaW5zVGFyZ2V0IiwiZ2V0VGFyZ2V0T2JqZWN0UGF0aCIsImFGb3JtRWxlbWVudHMiLCJpbnNlcnRDdXN0b21FbGVtZW50cyIsImZpbHRlciIsImFjdGlvbiIsImZhY2V0TmFtZSIsImxlbmd0aCIsIm9BY3Rpb25TaG93RGV0YWlscyIsIkZvcm1TdGFuZGFyZEFjdGlvbkJ1dHRvbklEIiwidGV4dCIsIkFjdGlvblR5cGUiLCJTaG93Rm9ybURldGFpbHMiLCJwcmVzcyIsInNvbWUiLCJvRm9ybUVsZW1lbnQiLCJlbnRpdHlTZXQiLCJnZXRGb3JtQ29udGFpbmVyc0ZvckNvbGxlY3Rpb24iLCJmb3JtQ29udGFpbmVycyIsIkZhY2V0cyIsImZhY2V0IiwiaXNSZWZlcmVuY2VGYWNldCIsImNyZWF0ZUZvcm1EZWZpbml0aW9uIiwiZm9ybUNvbGxlY3Rpb25EZWZpbml0aW9uIiwiRm9ybUlEIiwidXNlRm9ybUNvbnRhaW5lckxhYmVscyIsImhhc0ZhY2V0c05vdFBhcnRPZlByZXZpZXciLCJjaGlsZEZhY2V0IiwiZm9ybURlZmluaXRpb24iLCJFcnJvciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQTRCWUEsZTs7YUFBQUEsZTtBQUFBQSxJQUFBQSxlO0FBQUFBLElBQUFBLGU7S0FBQUEsZSxLQUFBQSxlOzs7O0FBc0NaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFTQyw4QkFBVCxHQUE2RDtBQUM1RCxXQUFPO0FBQ05DLE1BQUFBLGFBQWEsRUFBRTtB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LEtBQUosQ0FBVSwrQ0FBVixDQUFOO0FBckJGO0FBdUJBIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuXHRBbm5vdGF0aW9uVGVybSxcblx0Q29sbGVjdGlvbkZhY2V0VHlwZXMsXG5cdENvbW11bmljYXRpb25Bbm5vdGF0aW9uVGVybXMsXG5cdERhdGFGaWVsZEFic3RyYWN0VHlwZXMsXG5cdEZhY2V0VHlwZXMsXG5cdEZpZWxkR3JvdXAsXG5cdElkZW50aWZpY2F0aW9uLFxuXHRQYXJ0T2ZQcmV2aWV3LFxuXHRSZWZlcmVuY2VGYWNldFR5cGVzLFxuXHRVSUFubm90YXRpb25UZXJtcyxcblx0VUlBbm5vdGF0aW9uVHlwZXNcbn0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzXCI7XG5pbXBvcnQgeyBCaW5kaW5nRXhwcmVzc2lvbiB9IGZyb20gXCJzYXAvZmUvY29yZS9oZWxwZXJzL0JpbmRpbmdFeHByZXNzaW9uXCI7XG5pbXBvcnQgeyBDb25maWd1cmFibGVPYmplY3QsIEN1c3RvbUVsZW1lbnQsIGluc2VydEN1c3RvbUVsZW1lbnRzLCBQbGFjZW1lbnQgfSBmcm9tIFwiLi4vLi4vaGVscGVycy9Db25maWd1cmFibGVPYmplY3RcIjtcbmltcG9ydCB7IEZvcm1JRCwgRm9ybVN0YW5kYXJkQWN0aW9uQnV0dG9uSUQgfSBmcm9tIFwiLi4vLi4vaGVscGVycy9JRFwiO1xuaW1wb3J0IHsgS2V5SGVscGVyIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvS2V5XCI7XG5pbXBvcnQgeyBBY3Rpb25UeXBlLCBGb3JtYXRPcHRpb25zVHlwZSwgRm9ybU1hbmlmZXN0Q29uZmlndXJhdGlvbiB9IGZyb20gXCIuLi8uLi9NYW5pZmVzdFNldHRpbmdzXCI7XG5pbXBvcnQgeyBnZXRTZW1hbnRpY09iamVjdFBhdGggfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9hbm5vdGF0aW9ucy9EYXRhRmllbGRcIjtcbmltcG9ydCB7IGdldFRhcmdldEVudGl0eVNldFBhdGgsIGdldFRhcmdldE9iamVjdFBhdGggfSBmcm9tIFwic2FwL2ZlL2NvcmUvdGVtcGxhdGluZy9EYXRhTW9kZWxQYXRoSGVscGVyXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZSB9IGZyb20gXCIuLi8uLi8uLi9oZWxwZXJzL1N0YWJsZUlkSGVscGVyXCI7XG5pbXBvcnQgQ29udmVydGVyQ29udGV4dCBmcm9tIFwiLi4vLi4vQ29udmVydGVyQ29udGV4dFwiO1xuaW1wb3J0IHsgQmFzZUFjdGlvbiwgQ29udmVydGVyQWN0aW9uIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvY29udHJvbHMvQ29tbW9uL0FjdGlvblwiO1xuXG5leHBvcnQgdHlwZSBGb3JtRGVmaW5pdGlvbiA9IHtcblx0aWQ6IHN0cmluZztcblx0dXNlRm9ybUNvbnRhaW5lckxhYmVsczogYm9vbGVhbjtcblx0aGFzRmFjZXRzTm90UGFydE9mUHJldmlldzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCBlbnVtIEZvcm1FbGVtZW50VHlwZSB7XG5cdERlZmF1bHQgPSBcIkRlZmF1bHRcIixcblx0QW5ub3RhdGlvbiA9IFwiQW5ub3RhdGlvblwiXG59XG5cbmV4cG9ydCB0eXBlIEJhc2VGb3JtRWxlbWVudCA9IENvbmZpZ3VyYWJsZU9iamVjdCAmIHtcblx0aWQ/OiBzdHJpbmc7XG5cdHR5cGU6IEZvcm1FbGVtZW50VHlwZTtcblx0bGFiZWw/OiBzdHJpbmc7XG5cdHZpc2libGU/OiBCaW5kaW5nRXhwcmVzc2lvbjxib29sZWFuPjtcblx0Zm9ybWF0T3B0aW9ucz86IEZvcm1hdE9wdGlvbnNUeXBlO1xufTtcblxuZXhwb3J0IHR5cGUgQW5ub3RhdGlvbkZvcm1FbGVtZW50ID0gQmFzZUZvcm1FbGVtZW50ICYge1xuXHRpZFByZWZpeD86IHN0cmluZztcblx0YW5ub3RhdGlvblBhdGg/OiBzdHJpbmc7XG5cdGlzVmFsdWVNdWx0aWxpbmVUZXh0PzogYm9vbGVhbjtcblx0c2VtYW50aWNPYmplY3RQYXRoPzogc3RyaW5nO1xuXHRpc1BhcnRPZlByZXZpZXc/OiBib29sZWFuO1xufTtcblxuZXhwb3J0IHR5cGUgQ3VzdG9tRm9ybUVsZW1lbnQgPSBDdXN0b21FbGVtZW50PFxuXHRCYXNlRm9ybUVsZW1lbnQgJiB7XG5cdFx0dHlwZTogRm9ybUVsZW1lbnRUeXBlLkRlZmF1bHQ7XG5cdFx0dGVtcGxhdGU6IHN0cmluZztcblx0fVxuPjtcblxuZXhwb3J0IHR5cGUgRm9ybUVsZW1lbnQgPSBDdXN0b21Gb3JtRWxlbWVudCB8IEFubm90YXRpb25Gb3JtRWxlbWVudDtcblxudHlwZSBGb3JtQ29udGFpbmVyID0ge1xuXHRpZD86IHN0cmluZztcblx0Zm9ybUVsZW1lbnRzOiBGb3JtRWxlbWVudFtdO1xuXHRhbm5vdGF0aW9uUGF0aDogc3RyaW5nO1xuXHRlbnRpdHlTZXQ/OiBzdHJpbmc7XG5cdGFjdGlvbnM/OiBDb252ZXJ0ZXJBY3Rpb25bXSB8IEJhc2VBY3Rpb25bXTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBkZWZhdWx0IGZvcm1hdCBvcHRpb25zIGZvciB0ZXh0IGZpZWxkcyBvbiBhIGZvcm0uXG4gKlxuICogQHJldHVybnMge0Zvcm1hdE9wdGlvbnNUeXBlfSBDb2xsZWN0aW9uIG9mIGZvcm1hdCBvcHRpb25zIHdpdGggZGVmYXVsdCB2YWx1ZXNcbiAqL1xuZnVuY3Rpb24gZ2V0RGVmYXVsdEZvcm1hdE9wdGlvbnNGb3JGb3JtKCk6IEZvcm1hdE9wdGlvbnNUeXBlIHtcblx0cmV0dXJuIHtcblx0XHR0ZXh0TGluZXNFZGl0OiA0XG5cdH07XG59XG5cbmZ1bmN0aW9uIGlzRmllbGRQYXJ0T2ZQcmV2aWV3KGZpZWxkOiBEYXRhRmllbGRBYnN0cmFjdFR5cGVzLCBmb3JtUGFydE9mUHJldmlldzogUGFydE9mUHJldmlldyB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuXHQvLyBCb3RoIGVhY2ggZm9ybSBhbmQgZmllbGQgY2FuIGhhdmUgdGhlIFBhcnRPZlByZXZpZXcgYW5ub3RhdGlvbi4gT25seSBpZiB0aGUgZm9ybSBpcyBub3QgaGlkZGVuIChub3QgcGFydE9mUHJldmlldykgd2UgYWxsb3cgdG9nZ2xpbmcgb24gZmllbGQgbGV2ZWxcblx0cmV0dXJuIChcblx0XHRmb3JtUGFydE9mUHJldmlldyA9PT0gZmFsc2UgfHwgZmllbGQuYW5ub3RhdGlvbnM/LlVJPy5QYXJ0T2ZQcmV2aWV3ID09PSB1bmRlZmluZWQgfHwgZmllbGQuYW5ub3RhdGlvbnM/LlVJPy5QYXJ0T2ZQcmV2aWV3ID09PSB0cnVlXG5cdCk7XG59XG5cbmZ1bmN0aW9uIGdldEZvcm1FbGVtZW50c0Zyb21Bbm5vdGF0aW9ucyhmYWNldERlZmluaXRpb246IFJlZmVyZW5jZUZhY2V0VHlwZXMsIGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQpOiBBbm5vdGF0aW9uRm9ybUVsZW1lbnRbXSB7XG5cdGNvbnN0IGZvcm1FbGVtZW50czogQW5ub3RhdGlvbkZvcm1FbGVtZW50W10gPSBbXTtcblx0Y29uc3QgcmVzb2x2ZWRUYXJnZXQgPSBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGVBbm5vdGF0aW9uKGZhY2V0RGVmaW5pdGlvbi5UYXJnZXQudmFsdWUpO1xuXHRjb25zdCBmb3JtQW5ub3RhdGlvbjogQW5ub3RhdGlvblRlcm08SWRlbnRpZmljYXRpb24+IHwgQW5ub3RhdGlvblRlcm08RmllbGRHcm91cD4gPSByZXNvbHZlZFRhcmdldC5hbm5vdGF0aW9uIGFzXG5cdFx0fCBBbm5vdGF0aW9uVGVybTxJZGVudGlmaWNhdGlvbj5cblx0XHR8IEFubm90YXRpb25UZXJtPEZpZWxkR3JvdXA+O1xuXHRjb252ZXJ0ZXJDb250ZXh0ID0gcmVzb2x2ZWRUYXJnZXQuY29udmVydGVyQ29udGV4dDtcblxuXHRmdW5jdGlvbiBnZXREYXRhRmllbGRzRnJvbUFubm90YXRpb25zKGZpZWxkOiBEYXRhRmllbGRBYnN0cmFjdFR5cGVzLCBmb3JtUGFydE9mUHJldmlldzogUGFydE9mUHJldmlldyB8IHVuZGVmaW5lZCkge1xuXHRcdGNvbnN0IHNlbWFudGljT2JqZWN0QW5ub3RhdGlvblBhdGggPSBnZXRTZW1hbnRpY09iamVjdFBhdGgoY29udmVydGVyQ29udGV4dCwgZmllbGQpO1xuXHRcdGlmIChcblx0XHRcdGZpZWxkLiRUeXBlICE9PSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRGb3JBY3Rpb24gJiZcblx0XHRcdGZpZWxkLiRUeXBlICE9PSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb24gJiZcblx0XHRcdGZpZWxkLmFubm90YXRpb25zPy5VST8uSGlkZGVuPy52YWx1ZU9mKCkgIT09IHRydWVcblx0XHQpIHtcblx0XHRcdGZvcm1FbGVtZW50cy5wdXNoKHtcblx0XHRcdFx0a2V5OiBLZXlIZWxwZXIuZ2VuZXJhdGVLZXlGcm9tRGF0YUZpZWxkKGZpZWxkKSxcblx0XHRcdFx0dHlwZTogRm9ybUVsZW1lbnRUeXBlLkFubm90YXRpb24sXG5cdFx0XHRcdGFubm90YXRpb25QYXRoOiBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVNldEJhc2VkQW5ub3RhdGlvblBhdGgoZmllbGQuZnVsbHlRdWFsaWZpZWROYW1lKSArIFwiL1wiLFxuXHRcdFx0XHRzZW1hbnRpY09iamVjdFBhdGg6IHNlbWFudGljT2JqZWN0QW5ub3RhdGlvblBhdGgsXG5cdFx0XHRcdGZvcm1hdE9wdGlvbnM6IGdldERlZmF1bHRGb3JtYXRPcHRpb25zRm9yRm9ybSgpLFxuXHRcdFx0XHRpc1BhcnRPZlByZXZpZXc6IGlzRmllbGRQYXJ0T2ZQcmV2aWV3KGZpZWxkLCBmb3JtUGFydE9mUHJldmlldylcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHN3aXRjaCAoZm9ybUFubm90YXRpb24/LnRlcm0pIHtcblx0XHRjYXNlIFVJQW5ub3RhdGlvblRlcm1zLkZpZWxkR3JvdXA6XG5cdFx0XHQoZm9ybUFubm90YXRpb24gYXMgQW5ub3RhdGlvblRlcm08RmllbGRHcm91cD4pLkRhdGEuZm9yRWFjaChmaWVsZCA9PlxuXHRcdFx0XHRnZXREYXRhRmllbGRzRnJvbUFubm90YXRpb25zKGZpZWxkLCBmYWNldERlZmluaXRpb24uYW5ub3RhdGlvbnM/LlVJPy5QYXJ0T2ZQcmV2aWV3KVxuXHRcdFx0KTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgVUlBbm5vdGF0aW9uVGVybXMuSWRlbnRpZmljYXRpb246XG5cdFx0XHQoZm9ybUFubm90YXRpb24gYXMgQW5ub3RhdGlvblRlcm08SWRlbnRpZmljYXRpb24+KS5mb3JFYWNoKGZpZWxkID0+XG5cdFx0XHRcdGdldERhdGFGaWVsZHNGcm9tQW5ub3RhdGlvbnMoZmllbGQsIGZhY2V0RGVmaW5pdGlvbi5hbm5vdGF0aW9ucz8uVUk/LlBhcnRPZlByZXZpZXcpXG5cdFx0XHQpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBVSUFubm90YXRpb25UZXJtcy5EYXRhUG9pbnQ6XG5cdFx0XHRmb3JtRWxlbWVudHMucHVzaCh7XG5cdFx0XHRcdC8vIGtleTogS2V5SGVscGVyLmdlbmVyYXRlS2V5RnJvbURhdGFGaWVsZChmb3JtQW5ub3RhdGlvbiksXG5cdFx0XHRcdGtleTogXCJEYXRhUG9pbnQ6OlwiICsgKGZvcm1Bbm5vdGF0aW9uLnF1YWxpZmllciA/IGZvcm1Bbm5vdGF0aW9uLnF1YWxpZmllciA6IFwiXCIpLFxuXHRcdFx0XHR0eXBlOiBGb3JtRWxlbWVudFR5cGUuQW5ub3RhdGlvbixcblx0XHRcdFx0YW5ub3RhdGlvblBhdGg6IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5U2V0QmFzZWRBbm5vdGF0aW9uUGF0aChmb3JtQW5ub3RhdGlvbi5mdWxseVF1YWxpZmllZE5hbWUpICsgXCIvXCJcblx0XHRcdH0pO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBDb21tdW5pY2F0aW9uQW5ub3RhdGlvblRlcm1zLkNvbnRhY3Q6XG5cdFx0XHRmb3JtRWxlbWVudHMucHVzaCh7XG5cdFx0XHRcdC8vIGtleTogS2V5SGVscGVyLmdlbmVyYXRlS2V5RnJvbURhdGFGaWVsZChmb3JtQW5ub3RhdGlvbiksXG5cdFx0XHRcdGtleTogXCJDb250YWN0OjpcIiArIChmb3JtQW5ub3RhdGlvbi5xdWFsaWZpZXIgPyBmb3JtQW5ub3RhdGlvbi5xdWFsaWZpZXIgOiBcIlwiKSxcblx0XHRcdFx0dHlwZTogRm9ybUVsZW1lbnRUeXBlLkFubm90YXRpb24sXG5cdFx0XHRcdGFubm90YXRpb25QYXRoOiBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVNldEJhc2VkQW5ub3RhdGlvblBhdGgoZm9ybUFubm90YXRpb24uZnVsbHlRdWFsaWZpZWROYW1lKSArIFwiL1wiXG5cdFx0XHR9KTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRicmVhaztcblx0fVxuXHRyZXR1cm4gZm9ybUVsZW1lbnRzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9ybUVsZW1lbnRzRnJvbU1hbmlmZXN0KFxuXHRmYWNldERlZmluaXRpb246IFJlZmVyZW5jZUZhY2V0VHlwZXMsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHRcbik6IFJlY29yZDxzdHJpbmcsIEN1c3RvbUZvcm1FbGVtZW50PiB7XG5cdGNvbnN0IG1hbmlmZXN0V3JhcHBlciA9IGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RXcmFwcGVyKCk7XG5cdGNvbnN0IG1hbmlmZXN0Rm9ybUNvbnRhaW5lcjogRm9ybU1hbmlmZXN0Q29uZmlndXJhdGlvbiA9IG1hbmlmZXN0V3JhcHBlci5nZXRGb3JtQ29udGFpbmVyKGZhY2V0RGVmaW5pdGlvbi5UYXJnZXQudmFsdWUpO1xuXHRjb25zdCBmb3JtRWxlbWVudHM6IFJlY29yZDxzdHJpbmcsIEN1c3RvbUZvcm1FbGVtZW50PiA9IHt9O1xuXHRpZiAobWFuaWZlc3RGb3JtQ29udGFpbmVyPy5maWVsZHMpIHtcblx0XHRPYmplY3Qua2V5cyhtYW5pZmVzdEZvcm1Db250YWluZXI/LmZpZWxkcykuZm9yRWFjaChmaWVsZElkID0+IHtcblx0XHRcdGZvcm1FbGVtZW50c1tmaWVsZElkXSA9IHtcblx0XHRcdFx0a2V5OiBmaWVsZElkLFxuXHRcdFx0XHRpZDogXCJDdXN0b21Gb3JtRWxlbWVudDo6XCIgKyBmaWVsZElkLFxuXHRcdFx0XHR0eXBlOiBGb3JtRWxlbWVudFR5cGUuRGVmYXVsdCxcblx0XHRcdFx0dGVtcGxhdGU6IG1hbmlmZXN0Rm9ybUNvbnRhaW5lci5maWVsZHNbZmllbGRJZF0udGVtcGxhdGUsXG5cdFx0XHRcdGxhYmVsOiBtYW5pZmVzdEZvcm1Db250YWluZXIuZmllbGRzW2ZpZWxkSWRdLmxhYmVsLFxuXHRcdFx0XHRwb3NpdGlvbjogbWFuaWZlc3RGb3JtQ29udGFpbmVyLmZpZWxkc1tmaWVsZElkXS5wb3NpdGlvbiB8fCB7XG5cdFx0XHRcdFx0cGxhY2VtZW50OiBQbGFjZW1lbnQuQWZ0ZXJcblx0XHRcdFx0fSxcblx0XHRcdFx0Zm9ybWF0T3B0aW9uczoge1xuXHRcdFx0XHRcdC4uLmdldERlZmF1bHRGb3JtYXRPcHRpb25zRm9yRm9ybSgpLFxuXHRcdFx0XHRcdC4uLm1hbmlmZXN0Rm9ybUNvbnRhaW5lci5maWVsZHNbZmllbGRJZF0uZm9ybWF0T3B0aW9uc1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9XG5cdHJldHVybiBmb3JtRWxlbWVudHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGb3JtQ29udGFpbmVyKFxuXHRmYWNldERlZmluaXRpb246IFJlZmVyZW5jZUZhY2V0VHlwZXMsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdGFjdGlvbnM6IEJhc2VBY3Rpb25bXSB8IENvbnZlcnRlckFjdGlvbltdIHwgdW5kZWZpbmVkXG4pOiBGb3JtQ29udGFpbmVyIHtcblx0Ly9UT0RPIGZvcm0gY29udGFpbmVyIGlkXG5cdGNvbnN0IHNGb3JtQ29udGFpbmVySWQgPSBnZW5lcmF0ZShbeyBGYWNldDogZmFjZXREZWZpbml0aW9uIH1dKTtcblx0Y29uc3Qgc0Fubm90YXRpb25QYXRoID0gXCIvXCIgKyBmYWNldERlZmluaXRpb24uZnVsbHlRdWFsaWZpZWROYW1lO1xuXHRjb25zdCByZXNvbHZlZFRhcmdldCA9IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5VHlwZUFubm90YXRpb24oZmFjZXREZWZpbml0aW9uLlRhcmdldC52YWx1ZSk7XG5cdGxldCBzRW50aXR5U2V0UGF0aCE6IHN0cmluZztcblx0Ly8gcmVzb2x2ZWRUYXJnZXQgZG9lc24ndCBoYXZlIGEgZW50aXR5U2V0IGluIGNhc2UgQ29udGFpbm1lbnRzIGFuZCBQYXJhbXRlcml6ZWQgc2VydmljZXMuXG5cdGlmIChcblx0XHRyZXNvbHZlZFRhcmdldC5jb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVNldCgpICYmXG5cdFx0cmVzb2x2ZWRUYXJnZXQuY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlTZXQoKSAhPT0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlTZXQoKVxuXHQpIHtcblx0XHRzRW50aXR5U2V0UGF0aCA9IGdldFRhcmdldEVudGl0eVNldFBhdGgocmVzb2x2ZWRUYXJnZXQuY29udmVydGVyQ29udGV4dC5nZXREYXRhTW9kZWxPYmplY3RQYXRoKCkpO1xuXHR9IGVsc2UgaWYgKHJlc29sdmVkVGFyZ2V0LmNvbnZlcnRlckNvbnRleHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpLnRhcmdldE9iamVjdD8uY29udGFpbnNUYXJnZXQgPT09IHRydWUpIHtcblx0XHRzRW50aXR5U2V0UGF0aCA9IGdldFRhcmdldE9iamVjdFBhdGgocmVzb2x2ZWRUYXJnZXQuY29udmVydGVyQ29udGV4dC5nZXREYXRhTW9kZWxPYmplY3RQYXRoKCksIGZhbHNlKTtcblx0fVxuXHRjb25zdCBhRm9ybUVsZW1lbnRzID0gaW5zZXJ0Q3VzdG9tRWxlbWVudHMoXG5cdFx0Z2V0Rm9ybUVsZW1lbnRzRnJvbUFubm90YXRpb25zKGZhY2V0RGVmaW5pdGlvbiwgY29udmVydGVyQ29udGV4dCksXG5cdFx0Z2V0Rm9ybUVsZW1lbnRzRnJvbU1hbmlmZXN0KGZhY2V0RGVmaW5pdGlvbiwgY29udmVydGVyQ29udGV4dCksXG5cdFx0eyBmb3JtYXRPcHRpb25zOiBcIm92ZXJ3cml0ZVwiIH1cblx0KTtcblxuXHRhY3Rpb25zID0gYWN0aW9ucyAhPT0gdW5kZWZpbmVkID8gYWN0aW9ucy5maWx0ZXIoYWN0aW9uID0+IGFjdGlvbi5mYWNldE5hbWUgPT0gZmFjZXREZWZpbml0aW9uLmZ1bGx5UXVhbGlmaWVkTmFtZSkgOiBbXTtcblx0aWYgKGFjdGlvbnMubGVuZ3RoID09PSAwKSB7XG5cdFx0YWN0aW9ucyA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdGNvbnN0IG9BY3Rpb25TaG93RGV0YWlsczogQmFzZUFjdGlvbiA9IHtcblx0XHRpZDogRm9ybVN0YW5kYXJkQWN0aW9uQnV0dG9uSUQoc0Zvcm1Db250YWluZXJJZCwgXCJTaG93SGlkZURldGFpbHNcIiksXG5cdFx0a2V5OiBcIlN0YW5kYXJkQWN0aW9uOjpTaG93SGlkZURldGFpbHNcIixcblx0XHR0ZXh0OiBcIntzYXAuZmUuaTE4bj5UX0NPTU1PTl9PQkpFQ1RfUEFHRV9TSE9XX0ZPUk1fQ09OVEFJTkVSX0RFVEFJTFN9XCIsXG5cdFx0dHlwZTogQWN0aW9uVHlwZS5TaG93Rm9ybURldGFpbHMsXG5cdFx0cHJlc3M6IFwiRm9ybUNvbnRhaW5lclJ1bnRpbWUudG9nZ2xlRGV0YWlsc1wiXG5cdH07XG5cblx0aWYgKFxuXHRcdGZhY2V0RGVmaW5pdGlvbi5hbm5vdGF0aW9ucz8uVUk/LlBhcnRPZlByZXZpZXcgIT09IGZhbHNlICYmXG5cdFx0YUZvcm1FbGVtZW50cy5zb21lKG9Gb3JtRWxlbWVudCA9PiBvRm9ybUVsZW1lbnQuaXNQYXJ0T2ZQcmV2aWV3ID09PSBmYWxzZSlcblx0KSB7XG5cdFx0aWYgKGFjdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0YWN0aW9ucy5wdXNoKG9BY3Rpb25TaG93RGV0YWlscyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGFjdGlvbnMgPSBbb0FjdGlvblNob3dEZXRhaWxzXTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGlkOiBzRm9ybUNvbnRhaW5lcklkLFxuXHRcdGZvcm1FbGVtZW50czogYUZvcm1FbGVtZW50cyxcblx0XHRhbm5vdGF0aW9uUGF0aDogc0Fubm90YXRpb25QYXRoLFxuXHRcdGVudGl0eVNldDogc0VudGl0eVNldFBhdGgsXG5cdFx0YWN0aW9uczogYWN0aW9uc1xuXHR9O1xufVxuXG5mdW5jdGlvbiBnZXRGb3JtQ29udGFpbmVyc0ZvckNvbGxlY3Rpb24oXG5cdGZhY2V0RGVmaW5pdGlvbjogQ29sbGVjdGlvbkZhY2V0VHlwZXMsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdGFjdGlvbnM6IEJhc2VBY3Rpb25bXSB8IENvbnZlcnRlckFjdGlvbltdXG4pOiBGb3JtQ29udGFpbmVyW10ge1xuXHRjb25zdCBmb3JtQ29udGFpbmVyczogRm9ybUNvbnRhaW5lcltdID0gW107XG5cdC8vVE9ETyBjb2xsIGZhY2V0IGluc2lkZSBjb2xsIGZhY2V0P1xuXHRmYWNldERlZmluaXRpb24uRmFjZXRzPy5mb3JFYWNoKGZhY2V0ID0+IHtcblx0XHQvLyBJZ25vcmUgbGV2ZWwgMyBjb2xsZWN0aW9uIGZhY2V0XG5cdFx0aWYgKGZhY2V0LiRUeXBlID09PSBVSUFubm90YXRpb25UeXBlcy5Db2xsZWN0aW9uRmFjZXQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Zm9ybUNvbnRhaW5lcnMucHVzaChnZXRGb3JtQ29udGFpbmVyKGZhY2V0IGFzIFJlZmVyZW5jZUZhY2V0VHlwZXMsIGNvbnZlcnRlckNvbnRleHQsIGFjdGlvbnMpKTtcblx0fSk7XG5cdHJldHVybiBmb3JtQ29udGFpbmVycztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVmZXJlbmNlRmFjZXQoZmFjZXREZWZpbml0aW9uOiBGYWNldFR5cGVzKTogZmFjZXREZWZpbml0aW9uIGlzIFJlZmVyZW5jZUZhY2V0VHlwZXMge1xuXHRyZXR1cm4gZmFjZXREZWZpbml0aW9uLiRUeXBlID09PSBVSUFubm90YXRpb25UeXBlcy5SZWZlcmVuY2VGYWNldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZvcm1EZWZpbml0aW9uKFxuXHRmYWNldERlZmluaXRpb246IEZhY2V0VHlwZXMsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdGFjdGlvbnM6IEJhc2VBY3Rpb25bXSB8IENvbnZlcnRlckFjdGlvbltdXG4pOiBGb3JtRGVmaW5pdGlvbiB7XG5cdHN3aXRjaCAoZmFjZXREZWZpbml0aW9uLiRUeXBlKSB7XG5cdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5Db2xsZWN0aW9uRmFjZXQ6XG5cdFx0XHQvLyBLZWVwIG9ubHkgdmFsaWQgY2hpbGRyZW5cblx0XHRcdGNvbnN0IGZvcm1Db2xsZWN0aW9uRGVmaW5pdGlvbiA9IHtcblx0XHRcdFx0aWQ6IEZvcm1JRCh7IEZhY2V0OiBmYWNldERlZmluaXRpb24gfSksXG5cdFx0XHRcdHVzZUZvcm1Db250YWluZXJMYWJlbHM6IHRydWUsXG5cdFx0XHRcdGhhc0ZhY2V0c05vdFBhcnRPZlByZXZpZXc6IGZhY2V0RGVmaW5pdGlvbi5GYWNldHMuc29tZShcblx0XHRcdFx0XHRjaGlsZEZhY2V0ID0+IGNoaWxkRmFjZXQuYW5ub3RhdGlvbnM/LlVJPy5QYXJ0T2ZQcmV2aWV3Py52YWx1ZU9mKCkgPT09IGZhbHNlXG5cdFx0XHRcdCksXG5cdFx0XHRcdGZvcm1Db250YWluZXJzOiBnZXRGb3JtQ29udGFpbmVyc0ZvckNvbGxlY3Rpb24oZmFjZXREZWZpbml0aW9uLCBjb252ZXJ0ZXJDb250ZXh0LCBhY3Rpb25zKVxuXHRcdFx0fTtcblx0XHRcdHJldHVybiBmb3JtQ29sbGVjdGlvbkRlZmluaXRpb247XG5cdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5SZWZlcmVuY2VGYWNldDpcblx0XHRcdGNvbnN0IGZvcm1EZWZpbml0aW9uID0ge1xuXHRcdFx0XHRpZDogRm9ybUlEKHsgRmFjZXQ6IGZhY2V0RGVmaW5pdGlvbiB9KSxcblx0XHRcdFx0dXNlRm9ybUNvbnRhaW5lckxhYmVsczogZmFsc2UsXG5cdFx0XHRcdGhhc0ZhY2V0c05vdFBhcnRPZlByZXZpZXc6IGZhY2V0RGVmaW5pdGlvbi5hbm5vdGF0aW9ucz8uVUk/LlBhcnRPZlByZXZpZXc/LnZhbHVlT2YoKSA9PT0gZmFsc2UsXG5cdFx0XHRcdGZvcm1Db250YWluZXJzOiBbZ2V0Rm9ybUNvbnRhaW5lcihmYWNldERlZmluaXRpb24sIGNvbnZlcnRlckNvbnRleHQsIGFjdGlvbnMpXVxuXHRcdFx0fTtcblx0XHRcdHJldHVybiBmb3JtRGVmaW5pdGlvbjtcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGNyZWF0ZSBmb3JtIGJhc2VkIG9uIFJlZmVyZW5jZVVSTEZhY2V0XCIpO1xuXHR9XG59XG4iXX0=