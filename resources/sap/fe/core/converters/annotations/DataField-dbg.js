/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/templating/UIFormatters", "sap/fe/core/templating/PropertyHelper"], function (UIFormatters, PropertyHelper) {
  "use strict";

  var _exports = {};
  var isProperty = PropertyHelper.isProperty;
  var getAssociatedUnitProperty = PropertyHelper.getAssociatedUnitProperty;
  var getAssociatedCurrencyProperty = PropertyHelper.getAssociatedCurrencyProperty;
  var getDisplayMode = UIFormatters.getDisplayMode;

  /**
   * Identifies if the given dataFieldAbstract that is passed is a "DataFieldForActionAbstract".
   * DataFieldForActionAbstract has an inline action defined.
   *
   * @param {DataFieldAbstractTypes} dataField Data field to be evaluated
   * @returns {boolean} Validates that dataField is a DataFieldForActionAbstractType
   */
  function isDataFieldForActionAbstract(dataField) {
    return dataField.hasOwnProperty("Action");
  }
  /**
   * Identifies if the given dataFieldAbstract that is passed is a "DataField".
   * DataField has a value defined.
   *
   * @param {DataFieldAbstractTypes} dataField Data field to be evaluated
   * @returns {boolean} Validate that dataField is a DataFieldTypes
   */


  _exports.isDataFieldForActionAbstract = isDataFieldForActionAbstract;

  function isDataFieldTypes(dataField) {
    return dataField.hasOwnProperty("Value");
  }
  /**
   * Returns whether given data field has a static hidden annotation.
   *
   * @param {DataFieldAbstractTypes} dataField The datafield to check
   * @returns {boolean} `true` if datafield or referenced property has a static Hidden annotation, false else
   * @private
   */


  _exports.isDataFieldTypes = isDataFieldTypes;

  function isDataFieldAlwaysHidden(dataField) {
    var _dataField$annotation, _dataField$annotation2, _dataField$annotation3, _dataField$Value, _dataField$Value$$tar, _dataField$Value$$tar2, _dataField$Value$$tar3;

    return ((_dataField$annotation = dataField.annotations) === null || _dataField$annotation === void 0 ? void 0 : (_dataField$annotation2 = _dataField$annotation.UI) === null || _dataField$annotation2 === void 0 ? void 0 : (_dataField$annotation3 = _dataField$annotation2.Hidden) === null || _dataField$annotation3 === void 0 ? void 0 : _dataField$annotation3.valueOf()) === true || isDataFieldTypes(dataField) && ((_dataField$Value = dataField.Value) === null || _dataField$Value === void 0 ? void 0 : (_dataField$Value$$tar = _dataField$Value.$target) === null || _dataField$Value$$tar === void 0 ? void 0 : (_dataField$Value$$tar2 = _dataField$Value$$tar.annotations) === null || _dataField$Value$$tar2 === void 0 ? void 0 : (_dataField$Value$$tar3 = _dataField$Value$$tar2.UI) === null || _dataField$Value$$tar3 === void 0 ? void 0 : _dataField$Value$$tar3.Hidden) === true;
  }

  _exports.isDataFieldAlwaysHidden = isDataFieldAlwaysHidden;

  function getSemanticObjectPath(converterContext, object) {
    if (typeof object === "object") {
      var _object$Value;

      if (isDataFieldTypes(object) && (_object$Value = object.Value) !== null && _object$Value !== void 0 && _object$Value.$target) {
        var _object$Value2, _property$annotations, _property$annotations2;

        var property = (_object$Value2 = object.Value) === null || _object$Value2 === void 0 ? void 0 : _object$Value2.$target;

        if ((property === null || property === void 0 ? void 0 : (_property$annotations = property.annotations) === null || _property$annotations === void 0 ? void 0 : (_property$annotations2 = _property$annotations.Common) === null || _property$annotations2 === void 0 ? void 0 : _property$annotations2.SemanticObject) !== undefined) {
          return converterContext.getEntitySetBasedAnnotationPath(property === null || property === void 0 ? void 0 : property.fullyQualifiedName);
        }
      } else if (isProperty(object)) {
        var _object$annotations, _object$annotations$C;

        if ((object === null || object === void 0 ? void 0 : (_object$annotations = object.annotations) === null || _object$annotations === void 0 ? void 0 : (_object$annotations$C = _object$annotations.Common) === null || _object$annotations$C === void 0 ? void 0 : _object$annotations$C.SemanticObject) !== undefined) {
          return converterContext.getEntitySetBasedAnnotationPath(object === null || object === void 0 ? void 0 : object.fullyQualifiedName);
        }
      }
    }

    return undefined;
  }
  /**
   * Returns the navigation path prefix for a property path.
   *
   * @param path The property path For e.g. /EntityType/Navigation/Property
   * @returns {string} The navigation path prefix For e.g. /EntityType/Navigation/
   */


  _exports.getSemanticObjectPath = getSemanticObjectPath;

  function _getNavigationPathPrefix(path) {
    return path.indexOf("/") > -1 ? path.substring(0, path.lastIndexOf("/") + 1) : "";
  }
  /**
   * Collect additional properties for the ALP table use-case.
   *
   * For e.g. If UI.Hidden points to a property, include this property in the additionalProperties of ComplexPropertyInfo object.
   * @param target Property or DataField being processed
   * @param navigationPathPrefix Navigation path prefix, applicable in case of navigation properties.
   * @param tableType Table type.
   * @param relatedProperties The related properties identified so far.
   * @returns {ComplexPropertyInfo} The related properties identified.
   */


  function _collectAdditionalPropertiesForAnalyticalTable(target, navigationPathPrefix, tableType, relatedProperties) {
    if (tableType === "AnalyticalTable") {
      var _target$annotations, _target$annotations$U, _hiddenAnnotation$$ta;

      var hiddenAnnotation = (_target$annotations = target.annotations) === null || _target$annotations === void 0 ? void 0 : (_target$annotations$U = _target$annotations.UI) === null || _target$annotations$U === void 0 ? void 0 : _target$annotations$U.Hidden;

      if (hiddenAnnotation !== null && hiddenAnnotation !== void 0 && hiddenAnnotation.path && ((_hiddenAnnotation$$ta = hiddenAnnotation.$target) === null || _hiddenAnnotation$$ta === void 0 ? void 0 : _hiddenAnnotation$$ta._type) === "Property") {
        var hiddenAnnotationPropertyPath = navigationPathPrefix + hiddenAnnotation.path; // This property should be added to additionalProperties map for the ALP table use-case.

        relatedProperties.additionalProperties[hiddenAnnotationPropertyPath] = hiddenAnnotation.$target;
      }
    }

    return relatedProperties;
  }
  /**
   * Collect related properties from a property's annotations.
   *
   * @param path The property path
   * @param property The property to be considered
   * @param converterContext The converter context
   * @param ignoreSelf Whether to exclude the same property from related properties.
   * @param tableType The table type.
   * @param relatedProperties The related properties identified so far.
   * @returns {ComplexPropertyInfo} The related properties identified.
   */


  function collectRelatedProperties(path, property, converterContext, ignoreSelf, tableType) {
    var relatedProperties = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
      properties: {},
      additionalProperties: {}
    };

    /**
     * Helper to push unique related properties.
     *
     * @param key The property path
     * @param value The properties object containing value property, description property...
     * @returns Index at which the property is available
     */
    function _pushUnique(key, value) {
      if (!relatedProperties.properties.hasOwnProperty(key)) {
        relatedProperties.properties[key] = value;
      }

      return Object.keys(relatedProperties.properties).indexOf(key);
    }
    /**
     * Helper to append the export settings template with a formatted text.
     *
     * @param value Formatted text
     */


    function _appendTemplate(value) {
      relatedProperties.exportSettingsTemplate = relatedProperties.exportSettingsTemplate ? "".concat(relatedProperties.exportSettingsTemplate).concat(value) : "".concat(value);
    }

    if (path && property) {
      var _property$annotations3, _property$annotations4;

      var navigationPathPrefix = _getNavigationPathPrefix(path); // Check for Text annotation.


      var textAnnotation = (_property$annotations3 = property.annotations) === null || _property$annotations3 === void 0 ? void 0 : (_property$annotations4 = _property$annotations3.Common) === null || _property$annotations4 === void 0 ? void 0 : _property$annotations4.Text;
      var valueIndex;
      var targetValue;
      var currencyOrUoMIndex;

      if (relatedProperties.exportSettingsTemplate) {
        // FieldGroup use-case. Need to add each Field in new line.
        _appendTemplate("\n");

        relatedProperties.exportSettingsWrapping = true;
      }

      if (textAnnotation !== null && textAnnotation !== void 0 && textAnnotation.path && textAnnotation !== null && textAnnotation !== void 0 && textAnnotation.$target) {
        // Check for Text Arrangement.
        var dataModelObjectPath = converterContext.getDataModelObjectPath();
        var textAnnotationPropertyPath = navigationPathPrefix + textAnnotation.path;
        var displayMode = getDisplayMode(property, dataModelObjectPath);
        var descriptionIndex;

        switch (displayMode) {
          case "Value":
            valueIndex = _pushUnique(path, property);

            _appendTemplate("{".concat(valueIndex, "}"));

            relatedProperties.visualSettingsToBeExcluded = textAnnotationPropertyPath;
            break;

          case "Description":
            // Keep value when exporting (split mode) on text Arrangement defined as #TextOnly (Only values are expected on paste from Excel functionality)
            _pushUnique(path, property);

            descriptionIndex = _pushUnique(textAnnotationPropertyPath, textAnnotation.$target);

            _appendTemplate("{".concat(descriptionIndex, "}"));

            relatedProperties.visualSettingsToBeExcluded = path;
            break;

          case "ValueDescription":
            valueIndex = _pushUnique(path, property);
            descriptionIndex = _pushUnique(textAnnotationPropertyPath, textAnnotation.$target);

            _appendTemplate("{".concat(valueIndex, "} ({").concat(descriptionIndex, "})"));

            break;

          case "DescriptionValue":
            valueIndex = _pushUnique(path, property);
            descriptionIndex = _pushUnique(textAnnotationPropertyPath, textAnnotation.$target);

            _appendTemplate("{".concat(descriptionIndex, "} ({").concat(valueIndex, "})"));

            break;
        }
      } else {
        var _property$annotations5, _property$annotations6, _property$annotations7, _property$annotations8, _property$Target, _property$Target$$tar, _property$annotations9, _property$annotations10, _property$annotations11, _property$annotations12, _property$annotations13, _property$Target2, _property$Target2$$ta;

        // Check for field containing Currency Or Unit Properties.
        var currencyOrUoMProperty = getAssociatedCurrencyProperty(property) || getAssociatedUnitProperty(property);
        var currencyOrUnitAnnotation = (property === null || property === void 0 ? void 0 : (_property$annotations5 = property.annotations) === null || _property$annotations5 === void 0 ? void 0 : (_property$annotations6 = _property$annotations5.Measures) === null || _property$annotations6 === void 0 ? void 0 : _property$annotations6.ISOCurrency) || (property === null || property === void 0 ? void 0 : (_property$annotations7 = property.annotations) === null || _property$annotations7 === void 0 ? void 0 : (_property$annotations8 = _property$annotations7.Measures) === null || _property$annotations8 === void 0 ? void 0 : _property$annotations8.Unit);

        if (currencyOrUoMProperty && currencyOrUnitAnnotation !== null && currencyOrUnitAnnotation !== void 0 && currencyOrUnitAnnotation.$target) {
          valueIndex = _pushUnique(path, property);
          currencyOrUoMIndex = _pushUnique(currencyOrUoMProperty.name, currencyOrUnitAnnotation.$target);

          _appendTemplate("{".concat(valueIndex, "}  {").concat(currencyOrUoMIndex, "}"));
        } else if ((_property$Target = property.Target) !== null && _property$Target !== void 0 && (_property$Target$$tar = _property$Target.$target) !== null && _property$Target$$tar !== void 0 && _property$Target$$tar.Visualization) {
          var dataPointProperty = property.Target.$target.Value.$target;
          valueIndex = _pushUnique(path, dataPointProperty); // New fake property created for the Rating/Progress Target Value. It'll be used for the export on split mode.

          _pushUnique(property.Target.value, property.Target.$target);

          targetValue = (property.Target.$target.TargetValue || property.Target.$target.MaximumValue).toString();

          _appendTemplate("{".concat(valueIndex, "}/").concat(targetValue));
        } else if (((_property$annotations9 = property.annotations) === null || _property$annotations9 === void 0 ? void 0 : (_property$annotations10 = _property$annotations9.UI) === null || _property$annotations10 === void 0 ? void 0 : (_property$annotations11 = _property$annotations10.DataFieldDefault) === null || _property$annotations11 === void 0 ? void 0 : (_property$annotations12 = _property$annotations11.Target) === null || _property$annotations12 === void 0 ? void 0 : (_property$annotations13 = _property$annotations12.$target) === null || _property$annotations13 === void 0 ? void 0 : _property$annotations13.$Type) === "com.sap.vocabularies.UI.v1.DataPointType") {
          // DataPoint use-case using DataFieldDefault.
          var dataPointDefaultProperty = property.annotations.UI.DataFieldDefault;
          valueIndex = _pushUnique(path, property); // New fake property created for the Rating/Progress Target Value. It'll be used for the export on split mode.

          _pushUnique(dataPointDefaultProperty.Target.value, property);

          targetValue = (dataPointDefaultProperty.Target.$target.TargetValue || dataPointDefaultProperty.Target.$target.TargetValue.MaximumValue).toString();

          _appendTemplate("{".concat(valueIndex, "}/").concat(targetValue));
        } else if (((_property$Target2 = property.Target) === null || _property$Target2 === void 0 ? void 0 : (_property$Target2$$ta = _property$Target2.$target) === null || _property$Target2$$ta === void 0 ? void 0 : _property$Target2$$ta.$Type) === "com.sap.vocabularies.Communication.v1.ContactType") {
          var _property$Target$$tar2;

          relatedProperties.exportSettingsContactProperty = property.Target.value.substring(0, property.Target.value.indexOf("/") + 1) + ((_property$Target$$tar2 = property.Target.$target.fn) === null || _property$Target$$tar2 === void 0 ? void 0 : _property$Target$$tar2.path);
          valueIndex = _pushUnique(path, property.Target.$target.fn.$target);

          _appendTemplate("{".concat(valueIndex, "}"));
        } else if (!ignoreSelf) {
          // Collect underlying property
          valueIndex = _pushUnique(path, property);

          _appendTemplate("{".concat(valueIndex, "}"));
        }
      }

      relatedProperties = _collectAdditionalPropertiesForAnalyticalTable(property, navigationPathPrefix, tableType, relatedProperties);

      if (Object.keys(relatedProperties.additionalProperties).length > 0 && Object.keys(relatedProperties.properties).length === 0) {
        // Collect underlying property if not collected already.
        // This is to ensure that additionalProperties are made available only to complex property infos.
        valueIndex = _pushUnique(path, property);

        _appendTemplate("{".concat(valueIndex, "}"));
      }
    }

    return relatedProperties;
  }
  /**
   * Collect properties consumed by a Data Field.
   * This is for populating the ComplexPropertyInfos of the table delegate.
   *
   * @param {DataFieldAbstractTypes} dataField The Data Field for which the properties need to be identified.
   * @param converterContext The converter context.
   * @param {TableType} tableType The table type.
   * @param {ComplexPropertyInfo} relatedProperties The properties identified so far.
   * @returns {ComplexPropertyInfo} The properties related to the Data Field.
   */


  _exports.collectRelatedProperties = collectRelatedProperties;

  function collectRelatedPropertiesRecursively(dataField, converterContext, tableType) {
    var _dataField$Target, _dataField$Target$$ta, _dataField$Target$$ta2;

    var relatedProperties = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
      properties: {},
      additionalProperties: {}
    };

    if ((dataField.$Type === "com.sap.vocabularies.UI.v1.DataField" || dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldWithUrl") && dataField.Value) {
      var property = dataField.Value;
      relatedProperties = collectRelatedProperties(property.path, property.$target, converterContext, false, tableType, relatedProperties);

      var navigationPathPrefix = _getNavigationPathPrefix(property.path);

      relatedProperties = _collectAdditionalPropertiesForAnalyticalTable(dataField, navigationPathPrefix, tableType, relatedProperties);
    } else if (dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForAnnotation") {
      switch ((_dataField$Target = dataField.Target) === null || _dataField$Target === void 0 ? void 0 : (_dataField$Target$$ta = _dataField$Target.$target) === null || _dataField$Target$$ta === void 0 ? void 0 : _dataField$Target$$ta.$Type) {
        case "com.sap.vocabularies.UI.v1.FieldGroupType":
          (_dataField$Target$$ta2 = dataField.Target.$target.Data) === null || _dataField$Target$$ta2 === void 0 ? void 0 : _dataField$Target$$ta2.forEach(function (innerDataField) {
            relatedProperties = collectRelatedPropertiesRecursively(innerDataField, converterContext, tableType, relatedProperties);
          });
          break;

        case "com.sap.vocabularies.UI.v1.DataPointType":
          relatedProperties = collectRelatedProperties(dataField.Target.$target.Value.path, dataField, converterContext, false, tableType, relatedProperties);
          break;

        case "com.sap.vocabularies.Communication.v1.ContactType":
          relatedProperties = collectRelatedProperties(dataField.Target.value, dataField, converterContext, false, tableType, relatedProperties);
          break;
      }
    }

    return relatedProperties;
  }

  _exports.collectRelatedPropertiesRecursively = collectRelatedPropertiesRecursively;

  var getDataFieldDataType = function (oDataField) {
    var _Value, _Value$$target, _Target;

    var sDataType = oDataField.$Type;

    switch (sDataType) {
      case "com.sap.vocabularies.UI.v1.DataFieldForAction":
      case "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":
        sDataType = undefined;
        break;

      case "com.sap.vocabularies.UI.v1.DataField":
      case "com.sap.vocabularies.UI.v1.DataFieldWithNavigationPath":
      case "com.sap.vocabularies.UI.v1.DataFieldWithUrl":
        sDataType = oDataField === null || oDataField === void 0 ? void 0 : (_Value = oDataField.Value) === null || _Value === void 0 ? void 0 : (_Value$$target = _Value.$target) === null || _Value$$target === void 0 ? void 0 : _Value$$target.type;
        break;

      case "com.sap.vocabularies.UI.v1.DataFieldForAnnotation":
      default:
        var sDataTypeForDataFieldForAnnotation = (_Target = oDataField.Target) === null || _Target === void 0 ? void 0 : _Target.$target.$Type;

        if (sDataTypeForDataFieldForAnnotation) {
          var _Target2, _Target4;

          if (((_Target2 = oDataField.Target) === null || _Target2 === void 0 ? void 0 : _Target2.$target.$Type) === "com.sap.vocabularies.Communication.v1.ContactType") {
            var _$target, _Target3, _Target3$$target;

            sDataType = (_$target = ((_Target3 = oDataField.Target) === null || _Target3 === void 0 ? void 0 : (_Target3$$target = _Target3.$target) === null || _Target3$$target === void 0 ? void 0 : _Target3$$target.fn).$target) === null || _$target === void 0 ? void 0 : _$target.type;
          } else if (((_Target4 = oDataField.Target) === null || _Target4 === void 0 ? void 0 : _Target4.$target.$Type) === "com.sap.vocabularies.UI.v1.DataPointType") {
            var _Target5, _Target5$$target, _Target5$$target$Valu, _Target5$$target$Valu2, _Target6, _Target6$$target, _Target6$$target$Valu;

            sDataType = ((_Target5 = oDataField.Target) === null || _Target5 === void 0 ? void 0 : (_Target5$$target = _Target5.$target) === null || _Target5$$target === void 0 ? void 0 : (_Target5$$target$Valu = _Target5$$target.Value) === null || _Target5$$target$Valu === void 0 ? void 0 : (_Target5$$target$Valu2 = _Target5$$target$Valu.$Path) === null || _Target5$$target$Valu2 === void 0 ? void 0 : _Target5$$target$Valu2.$Type) || ((_Target6 = oDataField.Target) === null || _Target6 === void 0 ? void 0 : (_Target6$$target = _Target6.$target) === null || _Target6$$target === void 0 ? void 0 : (_Target6$$target$Valu = _Target6$$target.Value) === null || _Target6$$target$Valu === void 0 ? void 0 : _Target6$$target$Valu.$target.type);
          } else {
            // e.g. FieldGroup or Chart
            sDataType = undefined;
          }
        } else {
          sDataType = undefined;
        }

        break;
    }

    return sDataType;
  };

  _exports.getDataFieldDataType = getDataFieldDataType;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRhdGFGaWVsZC50cyJdLCJuYW1lcyI6WyJpc0RhdGFGaWVsZEZvckFjdGlvbkFic3RyYWN0IiwiZGF0YUZpZWxkIiwiaGFzT3duUHJvcGVydHkiLCJpc0RhdGFGaWVsZFR5cGVzIiwiaXNEYXRhRmllbGRBbHdheXNIaWRkZW4iLCJhbm5vdGF0aW9ucyIsIlVJIiwiSGlkZGVuIiwidmFsdWVPZiIsIlZhbHVlIiwiJHRhcmdldCIsImdldFNlbWFudGljT2JqZWN0UGF0aCIsImNvbnZlcnRlckNvbnRleHQiLCJvYmplY3QiLCJwcm9wZXJ0eSIsIkNvbW1vbiIsIlNlbWFudGljT2JqZWN0IiwidW5kZWZpbmVkIiwiZ2V0RW50aXR5U2V0QmFzZWRBbm5vdGF0aW9uUGF0aCIsImZ1bGx5UXVhbGlmaWVkTmFtZSIsImlzUHJvcGVydHkiLCJfZ2V0TmF2aWdhdGlvblBhdGhQcmVmaXgiLCJwYXRoIiwiaW5kZXhPZiIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwiX2NvbGxlY3RBZGRpdGlvbmFsUHJvcGVydGllc0ZvckFuYWx5dGljYWxUYWJsZSIsInRhcmdldCIsIm5hdmlnYXRpb25QYXRoUHJlZml4IiwidGFibGVUeXBlIiwicmVsYXRlZFByb3BlcnRpZXMiLCJoaWRkZW5Bbm5vdGF0aW9uIiwiX3R5cGUiLCJoaWRkZW5Bbm5vdGF0aW9uUHJvcGVydHlQYXRoIiwiYWRkaXRpb25hbFByb3BlcnRpZXMiLCJjb2xsZWN0UmVsYXRlZFByb3BlcnRpZXMiLCJpZ25vcmVTZWxmIiwicHJvcGVydGllcyIsIl9wdXNoVW5pcXVlIiwia2V5IiwidmFsdWUiLCJPYmplY3QiLCJrZXlzIiwiX2FwcGVuZFRlbXBsYXRlIiwiZXhwb3J0U2V0dGluZ3NUZW1wbGF0ZSIsInRleHRBbm5vdGF0aW9uIiwiVGV4dCIsInZhbHVlSW5kZXgiLCJ0YXJnZXRWYWx1ZSIsImN1cnJlbmN5T3JVb01JbmRleCIsImV4cG9ydFNldHRpbmdzV3JhcHBpbmciLCJkYXRhTW9kZWxPYmplY3RQYXRoIiwiZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCIsInRleHRBbm5vdGF0aW9uUHJvcGVydHlQYXRoIiwiZGlzcGxheU1vZGUiLCJnZXREaXNwbGF5TW9kZSIsImRlc2NyaXB0aW9uSW5kZXgiLCJ2aXN1YWxTZXR0aW5nc1RvQmVFeGNsdWRlZCIsImN1cnJlbmN5T3JVb01Qcm9wZXJ0eSIsImdldEFzc29jaWF0ZWRDdXJyZW5jeVByb3BlcnR5IiwiZ2V0QXNzb2NpYXRlZFVuaXRQcm9wZXJ0eSIsImN1cnJlbmN5T3JVbml0QW5ub3RhdGlvbiIsIk1lYXN1cmVzIiwiSVNPQ3VycmVuY3kiLCJVbml0IiwibmFtZSIsIlRhcmdldCIsIlZpc3VhbGl6YXRpb24iLCJkYXRhUG9pbnRQcm9wZXJ0eSIsIlRhcmdldFZhbHVlIiwiTWF4aW11bVZhbHVlIiwidG9TdHJpbmciLCJEYXRhRmllbGREZWZhdWx0IiwiJFR5cGUiLCJkYXRhUG9pbnREZWZhdWx0UHJvcGVydHkiLCJleHBvcnRTZXR0aW5nc0NvbnRhY3RQcm9wZXJ0eSIsImZuIiwibGVuZ3RoIiwiY29sbGVjdFJlbGF0ZWRQcm9wZXJ0aWVzUmVjdXJzaXZlbHkiLCJEYXRhIiwiZm9yRWFjaCIsImlubmVyRGF0YUZpZWxkIiwiZ2V0RGF0YUZpZWxkRGF0YVR5cGUiLCJvRGF0YUZpZWxkIiwic0RhdGFUeXBlIiwidHlwZSIsInNEYXRhVHlwZUZvckRhdGFGaWVsZEZvckFubm90YXRpb24iLCIkUGF0aCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQXlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLFdBQVNBLDRCQUFULENBQXNDQyxTQUF0QyxFQUF1SDtBQUM3SCxXQUFRQSxTQUFELENBQStDQyxjQUEvQyxDQUE4RCxRQUE5RCxDQUFQO0FBQ0E7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFDTyxXQUFTQyxnQkFBVCxDQUEwQkYsU0FBMUIsRUFBMEY7QUFDaEcsV0FBUUEsU0FBRCxDQUE4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Q0VVLFVBQUQsQ0FBdUNqQixNQUR4QyxpRUFDQyxTQUErQ3hELE9BRGhELDhFQUNBLGlCQUF1RUQsS0FEdkUsMERBQ0Esc0JBQThFQyxPQUE5RSxDQUFzRjJFLElBRHRGLENBREQ7QUFHQSxXQUpNLE1BSUE7QUFDTjtBQUNBRCxZQUFBQSxTQUFTLEdBQUduRSxTQUFaO0FBQ0E7QUFDRCxTQVhELE1BV087QUFDTm1FLFVBQUFBLFNBQVMsR0FBR25FLFNBQVo7QUFDQTs7QUFDRDtBQTdCRjs7QUFnQ0EsV0FBT21FLFNBQVA7QUFDQSxHQW5DTSIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcblx0Q29tbXVuaWNhdGlvbkFubm90YXRpb25UeXBlcyxcblx0Q29udGFjdCxcblx0RGF0YUZpZWxkLFxuXHREYXRhRmllbGRBYnN0cmFjdFR5cGVzLFxuXHREYXRhRmllbGRGb3JBY3Rpb25BYnN0cmFjdFR5cGVzLFxuXHREYXRhRmllbGRGb3JBbm5vdGF0aW9uLFxuXHREYXRhRmllbGRUeXBlcyxcblx0RGF0YVBvaW50LFxuXHRVSUFubm90YXRpb25UeXBlc1xufSBmcm9tIFwiQHNhcC11eC92b2NhYnVsYXJpZXMtdHlwZXNcIjtcbmltcG9ydCAqIGFzIEVkbSBmcm9tIFwiQHNhcC11eC92b2NhYnVsYXJpZXMtdHlwZXMvZGlzdC9FZG1cIjtcbmltcG9ydCB7IGdldERpc3BsYXlNb2RlLCBQcm9wZXJ0eU9yUGF0aCB9IGZyb20gXCJzYXAvZmUvY29yZS90ZW1wbGF0aW5nL1VJRm9ybWF0dGVyc1wiO1xuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiQHNhcC11eC9hbm5vdGF0aW9uLWNvbnZlcnRlclwiO1xuaW1wb3J0IHsgZ2V0QXNzb2NpYXRlZEN1cnJlbmN5UHJvcGVydHksIGdldEFzc29jaWF0ZWRVbml0UHJvcGVydHksIGlzUHJvcGVydHkgfSBmcm9tIFwic2FwL2ZlL2NvcmUvdGVtcGxhdGluZy9Qcm9wZXJ0eUhlbHBlclwiO1xuaW1wb3J0IENvbnZlcnRlckNvbnRleHQgZnJvbSBcIi4uL0NvbnZlcnRlckNvbnRleHRcIjtcbmltcG9ydCB7IFRhYmxlVHlwZSB9IGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL2NvbnRyb2xzL0NvbW1vbi9UYWJsZVwiO1xuXG5leHBvcnQgdHlwZSBDb21wbGV4UHJvcGVydHlJbmZvID0ge1xuXHRwcm9wZXJ0aWVzOiBSZWNvcmQ8c3RyaW5nLCBQcm9wZXJ0eT47XG5cdGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBSZWNvcmQ8c3RyaW5nLCBQcm9wZXJ0eT47XG5cdGV4cG9ydFNldHRpbmdzVGVtcGxhdGU/OiBzdHJpbmc7XG5cdGV4cG9ydFNldHRpbmdzV3JhcHBpbmc/OiBib29sZWFuO1xuXHRleHBvcnRTZXR0aW5nc0NvbnRhY3RQcm9wZXJ0eT86IHN0cmluZztcblx0dmlzdWFsU2V0dGluZ3NUb0JlRXhjbHVkZWQ/OiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIElkZW50aWZpZXMgaWYgdGhlIGdpdmVuIGRhdGFGaWVsZEFic3RyYWN0IHRoYXQgaXMgcGFzc2VkIGlzIGEgXCJEYXRhRmllbGRGb3JBY3Rpb25BYnN0cmFjdFwiLlxuICogRGF0YUZpZWxkRm9yQWN0aW9uQWJzdHJhY3QgaGFzIGFuIGlubGluZSBhY3Rpb24gZGVmaW5lZC5cbiAqXG4gKiBAcGFyYW0ge0RhdGFGaWVsZEFic3RyYWN0VHlwZXN9IGRhdGFGaWVsZCBEYXRhIGZpZWxkIHRvIGJlIGV2YWx1YXRlZFxuICogQHJldHVybnMge2Jvb2xlYW59IFZhbGlkYXRlcyB0aGF0IGRhdGFGaWVsZCBpcyBhIERhdGFGaWVsZEZvckFjdGlvbkFic3RyYWN0VHlwZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRhRmllbGRGb3JBY3Rpb25BYnN0cmFjdChkYXRhRmllbGQ6IERhdGFGaWVsZEFic3RyYWN0VHlwZXMpOiBkYXRhRmllbGQgaXMgRGF0YUZpZWxkRm9yQWN0aW9uQWJzdHJhY3RUeXBlcyB7XG5cdHJldHVybiAoZGF0YUZpZWxkIGFzIERhdGFGaWVsZEZvckFjdGlvbkFic3RyYWN0VHlwZXMpLmhhc093blByb3BlcnR5KFwiQWN0aW9uXCIpO1xufVxuXG4vKipcbiAqIElkZW50aWZpZXMgaWYgdGhlIGdpdmVuIGRhdGFGaWVsZEFic3RyYWN0IHRoYXQgaXMgcGFzc2VkIGlzIGEgXCJEYXRhRmllbGRcIi5cbiAqIERhdGFGaWVsZCBoYXMgYSB2YWx1ZSBkZWZpbmVkLlxuICpcbiAqIEBwYXJhbSB7RGF0YUZpZWxkQWJzdHJhY3RUeXBlc30gZGF0YUZpZWxkIERhdGEgZmllbGQgdG8gYmUgZXZhbHVhdGVkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVmFsaWRhdGUgdGhhdCBkYXRhRmllbGQgaXMgYSBEYXRhRmllbGRUeXBlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRhRmllbGRUeXBlcyhkYXRhRmllbGQ6IERhdGFGaWVsZEFic3RyYWN0VHlwZXMpOiBkYXRhRmllbGQgaXMgRGF0YUZpZWxkVHlwZXMge1xuXHRyZXR1cm4gKGRhdGFGaWVsZCBhcyBEYXRhRmllbGRUeXBlcykuaGFzT3duUHJvcGVydHkoXCJWYWx1ZVwiKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgZ2l2ZW4gZGF0YSBmaWVsZCBoYXMgYSBzdGF0aWMgaGlkZGVuIGFubm90YXRpb24uXG4gKlxuICogQHBhcmFtIHtEYXRhRmllbGRBYnN0cmFjdFR5cGVzfSBkYXRhRmllbGQgVGhlIGRhdGFmaWVsZCB0byBjaGVja1xuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiBkYXRhZmllbGQgb3IgcmVmZXJlbmNlZCBwcm9wZXJ0eSBoYXMgYSBzdGF0aWMgSGlkZGVuIGFubm90YXRpb24sIGZhbHNlIGVsc2VcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGFGaWVsZEFsd2F5c0hpZGRlbihkYXRhRmllbGQ6IERhdGFGaWVsZEFic3RyYWN0VHlwZXMpOiBib29sZWFuIHtcblx0cmV0dXJuIChcblx0XHRkYXRhRmllbGQuYW5ub3RhdGlvbnM/LlVJPy5IaWRkZW4/LnZhbHVlT2YoKSA9PT0gdHJ1ZSB8fFxuXHRcdChpc0RhdGFGaWVsZFR5cGVzKGRhdGFGaWVsZCkgJiYgZGF0YUZpZWxkLlZhbHVlPy4kdGFyZ2V0Py5hbm5vdGF0aW9ucz8uVUk/LkhpZGRlbiA9PT0gdHJ1ZSlcblx0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlbWFudGljT2JqZWN0UGF0aChjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LCBvYmplY3Q6IGFueSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG5cdGlmICh0eXBlb2Ygb2JqZWN0ID09PSBcIm9iamVjdFwiKSB7XG5cdFx0aWYgKGlzRGF0YUZpZWxkVHlwZXMob2JqZWN0KSAmJiBvYmplY3QuVmFsdWU/LiR0YXJnZXQpIHtcblx0XHRcdGNvbnN0IHByb3BlcnR5ID0gb2JqZWN0LlZhbHVlPy4kdGFyZ2V0O1xuXHRcdFx0aWYgKHByb3BlcnR5Py5hbm5vdGF0aW9ucz8uQ29tbW9uPy5TZW1hbnRpY09iamVjdCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHJldHVybiBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVNldEJhc2VkQW5ub3RhdGlvblBhdGgocHJvcGVydHk/LmZ1bGx5UXVhbGlmaWVkTmFtZSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChpc1Byb3BlcnR5KG9iamVjdCkpIHtcblx0XHRcdGlmIChvYmplY3Q/LmFubm90YXRpb25zPy5Db21tb24/LlNlbWFudGljT2JqZWN0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cmV0dXJuIGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5U2V0QmFzZWRBbm5vdGF0aW9uUGF0aChvYmplY3Q/LmZ1bGx5UXVhbGlmaWVkTmFtZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbmF2aWdhdGlvbiBwYXRoIHByZWZpeCBmb3IgYSBwcm9wZXJ0eSBwYXRoLlxuICpcbiAqIEBwYXJhbSBwYXRoIFRoZSBwcm9wZXJ0eSBwYXRoIEZvciBlLmcuIC9FbnRpdHlUeXBlL05hdmlnYXRpb24vUHJvcGVydHlcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBuYXZpZ2F0aW9uIHBhdGggcHJlZml4IEZvciBlLmcuIC9FbnRpdHlUeXBlL05hdmlnYXRpb24vXG4gKi9cbmZ1bmN0aW9uIF9nZXROYXZpZ2F0aW9uUGF0aFByZWZpeChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRyZXR1cm4gcGF0aC5pbmRleE9mKFwiL1wiKSA+IC0xID8gcGF0aC5zdWJzdHJpbmcoMCwgcGF0aC5sYXN0SW5kZXhPZihcIi9cIikgKyAxKSA6IFwiXCI7XG59XG5cbi8qKlxuICogQ29sbGVjdCBhZGRpdGlvbmFsIHByb3BlcnRpZXMgZm9yIHRoZSBBTFAgdGFibGUgdXNlLWNhc2UuXG4gKlxuICogRm9yIGUuZy4gSWYgVUkuSGlkZGVuIHBvaW50cyB0byBhIHByb3BlcnR5LCBpbmNsdWRlIHRoaXMgcHJvcGVydHkgaW4gdGhlIGFkZGl0aW9uYWxQcm9wZXJ0aWVzIG9mIENvbXBsZXhQcm9wZXJ0eUluZm8gb2JqZWN0LlxuICogQHBhcmFtIHRhcmdldCBQcm9wZXJ0eSBvciBEYXRhRmllbGQgYmVpbmcgcHJvY2Vzc2VkXG4gKiBAcGFyYW0gbmF2aWdhdGlvblBhdGhQcmVmaXggTmF2aWdhdGlvbiBwYXRoIHByZWZpeCwgYXBwbGljYWJsZSBpbiBjYXNlIG9mIG5hdmlnYXRpb24gcHJvcGVydGllcy5cbiAqIEBwYXJhbSB0YWJsZVR5cGUgVGFibGUgdHlwZS5cbiAqIEBwYXJhbSByZWxhdGVkUHJvcGVydGllcyBUaGUgcmVsYXRlZCBwcm9wZXJ0aWVzIGlkZW50aWZpZWQgc28gZmFyLlxuICogQHJldHVybnMge0NvbXBsZXhQcm9wZXJ0eUluZm99IFRoZSByZWxhdGVkIHByb3BlcnRpZXMgaWRlbnRpZmllZC5cbiAqL1xuZnVuY3Rpb24gX2NvbGxlY3RBZGRpdGlvbmFsUHJvcGVydGllc0ZvckFuYWx5dGljYWxUYWJsZShcblx0dGFyZ2V0OiBFZG0uUHJpbWl0aXZlVHlwZSxcblx0bmF2aWdhdGlvblBhdGhQcmVmaXg6IHN0cmluZyxcblx0dGFibGVUeXBlOiBUYWJsZVR5cGUsXG5cdHJlbGF0ZWRQcm9wZXJ0aWVzOiBDb21wbGV4UHJvcGVydHlJbmZvXG4pOiBDb21wbGV4UHJvcGVydHlJbmZvIHtcblx0aWYgKHRhYmxlVHlwZSA9PT0gXCJBbmFseXRpY2FsVGFibGVcIikge1xuXHRcdGNvbnN0IGhpZGRlbkFubm90YXRpb24gPSB0YXJnZXQuYW5ub3RhdGlvbnM/LlVJPy5IaWRkZW47XG5cdFx0aWYgKGhpZGRlbkFubm90YXRpb24/LnBhdGggJiYgaGlkZGVuQW5ub3RhdGlvbi4kdGFyZ2V0Py5fdHlwZSA9PT0gXCJQcm9wZXJ0eVwiKSB7XG5cdFx0XHRjb25zdCBoaWRkZW5Bbm5vdGF0aW9uUHJvcGVydHlQYXRoID0gbmF2aWdhdGlvblBhdGhQcmVmaXggKyBoaWRkZW5Bbm5vdGF0aW9uLnBhdGg7XG5cdFx0XHQvLyBUaGlzIHByb3BlcnR5IHNob3VsZCBiZSBhZGRlZCB0byBhZGRpdGlvbmFsUHJvcGVydGllcyBtYXAgZm9yIHRoZSBBTFAgdGFibGUgdXNlLWNhc2UuXG5cdFx0XHRyZWxhdGVkUHJvcGVydGllcy5hZGRpdGlvbmFsUHJvcGVydGllc1toaWRkZW5Bbm5vdGF0aW9uUHJvcGVydHlQYXRoXSA9IGhpZGRlbkFubm90YXRpb24uJHRhcmdldDtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlbGF0ZWRQcm9wZXJ0aWVzO1xufVxuXG4vKipcbiAqIENvbGxlY3QgcmVsYXRlZCBwcm9wZXJ0aWVzIGZyb20gYSBwcm9wZXJ0eSdzIGFubm90YXRpb25zLlxuICpcbiAqIEBwYXJhbSBwYXRoIFRoZSBwcm9wZXJ0eSBwYXRoXG4gKiBAcGFyYW0gcHJvcGVydHkgVGhlIHByb3BlcnR5IHRvIGJlIGNvbnNpZGVyZWRcbiAqIEBwYXJhbSBjb252ZXJ0ZXJDb250ZXh0IFRoZSBjb252ZXJ0ZXIgY29udGV4dFxuICogQHBhcmFtIGlnbm9yZVNlbGYgV2hldGhlciB0byBleGNsdWRlIHRoZSBzYW1lIHByb3BlcnR5IGZyb20gcmVsYXRlZCBwcm9wZXJ0aWVzLlxuICogQHBhcmFtIHRhYmxlVHlwZSBUaGUgdGFibGUgdHlwZS5cbiAqIEBwYXJhbSByZWxhdGVkUHJvcGVydGllcyBUaGUgcmVsYXRlZCBwcm9wZXJ0aWVzIGlkZW50aWZpZWQgc28gZmFyLlxuICogQHJldHVybnMge0NvbXBsZXhQcm9wZXJ0eUluZm99IFRoZSByZWxhdGVkIHByb3BlcnRpZXMgaWRlbnRpZmllZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbGxlY3RSZWxhdGVkUHJvcGVydGllcyhcblx0cGF0aDogc3RyaW5nLFxuXHRwcm9wZXJ0eTogRWRtLlByaW1pdGl2ZVR5cGUsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdGlnbm9yZVNlbGY6IGJvb2xlYW4sXG5cdHRhYmxlVHlwZTogVGFibGVUeXBlLFxuXHRyZWxhdGVkUHJvcGVydGllczogQ29tcGxleFByb3BlcnR5SW5mbyA9IHsgcHJvcGVydGllczoge30sIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7fSB9XG4pOiBDb21wbGV4UHJvcGVydHlJbmZvIHtcblx0LyoqXG5cdCAqIEhlbHBlciB0byBwdXNoIHVuaXF1ZSByZWxhdGVkIHByb3BlcnRpZXMuXG5cdCAqXG5cdCAqIEBwYXJhbSBrZXkgVGhlIHByb3BlcnR5IHBhdGhcblx0ICogQHBhcmFtIHZhbHVlIFRoZSBwcm9wZXJ0aWVzIG9iamVjdCBjb250YWluaW5nIHZhbHVlIHByb3BlcnR5LCBkZXNjcmlwdGlvbiBwcm9wZXJ0eS4uLlxuXHQgKiBAcmV0dXJucyBJbmRleCBhdCB3aGljaCB0aGUgcHJvcGVydHkgaXMgYXZhaWxhYmxlXG5cdCAqL1xuXHRmdW5jdGlvbiBfcHVzaFVuaXF1ZShrZXk6IHN0cmluZywgdmFsdWU6IFByb3BlcnR5KTogbnVtYmVyIHtcblx0XHRpZiAoIXJlbGF0ZWRQcm9wZXJ0aWVzLnByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0cmVsYXRlZFByb3BlcnRpZXMucHJvcGVydGllc1trZXldID0gdmFsdWU7XG5cdFx0fVxuXHRcdHJldHVybiBPYmplY3Qua2V5cyhyZWxhdGVkUHJvcGVydGllcy5wcm9wZXJ0aWVzKS5pbmRleE9mKGtleSk7XG5cdH1cblxuXHQvKipcblx0ICogSGVscGVyIHRvIGFwcGVuZCB0aGUgZXhwb3J0IHNldHRpbmdzIHRlbXBsYXRlIHdpdGggYSBmb3JtYXR0ZWQgdGV4dC5cblx0ICpcblx0ICogQHBhcmFtIHZhbHVlIEZvcm1hdHRlZCB0ZXh0XG5cdCAqL1xuXHRmdW5jdGlvbiBfYXBwZW5kVGVtcGxhdGUodmFsdWU6IHN0cmluZykge1xuXHRcdHJlbGF0ZWRQcm9wZXJ0aWVzLmV4cG9ydFNldHRpbmdzVGVtcGxhdGUgPSByZWxhdGVkUHJvcGVydGllcy5leHBvcnRTZXR0aW5nc1RlbXBsYXRlXG5cdFx0XHQ/IGAke3JlbGF0ZWRQcm9wZXJ0aWVzLmV4cG9ydFNldHRpbmdzVGVtcGxhdGV9JHt2YWx1ZX1gXG5cdFx0XHQ6IGAke3ZhbHVlfWA7XG5cdH1cblxuXHRpZiAocGF0aCAmJiBwcm9wZXJ0eSkge1xuXHRcdGNvbnN0IG5hdmlnYXRpb25QYXRoUHJlZml4ID0gX2dldE5hdmlnYXRpb25QYXRoUHJlZml4KHBhdGgpO1xuXG5cdFx0Ly8gQ2hlY2sgZm9yIFRleHQgYW5ub3RhdGlvbi5cblx0XHRjb25zdCB0ZXh0QW5ub3RhdGlvbiA9IHByb3BlcnR5LmFubm90YXRpb25zPy5Db21tb24/LlRleHQ7XG5cdFx0bGV0IHZhbHVlSW5kZXg6IG51bWJlcjtcblx0XHRsZXQgdGFyZ2V0VmFsdWU6IHN0cmluZztcblx0XHRsZXQgY3VycmVuY3lPclVvTUluZGV4OiBudW1iZXI7XG5cblx0XHRpZiAocmVsYXRlZFByb3BlcnRpZXMuZXhwb3J0U2V0dGluZ3NUZW1wbGF0ZSkge1xuXHRcdFx0Ly8gRmllbGRHcm91cCB1c2UtY2FzZS4gTmVlZCB0byBhZGQgZWFjaCBGaWVsZCBpbiBuZXcgbGluZS5cblx0XHRcdF9hcHBlbmRUZW1wbGF0ZShcIlxcblwiKTtcblx0XHRcdHJlbGF0ZWRQcm9wZXJ0aWVzLmV4cG9ydFNldHRpbmdzV3JhcHBpbmcgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGlmICh0ZXh0QW5ub3RhdGlvbj8ucGF0aCAmJiB0ZXh0QW5ub3RhdGlvbj8uJHRhcmdldCkge1xuXHRcdFx0Ly8gQ2hlY2sgZm9yIFRleHQgQXJyYW5nZW1lbnQuXG5cdFx0XHRjb25zdCBkYXRhTW9kZWxPYmplY3RQYXRoID0gY29udmVydGVyQ29udGV4dC5nZXREYXRhTW9kZWxPYmplY3RQYXRoKCk7XG5cdFx0XHRjb25zdCB0ZXh0QW5ub3RhdGlvblByb3BlcnR5UGF0aCA9IG5hdmlnYXRpb25QYXRoUHJlZml4ICsgdGV4dEFubm90YXRpb24ucGF0aDtcblx0XHRcdGNvbnN0IGRpc3BsYXlNb2RlID0gZ2V0RGlzcGxheU1vZGUocHJvcGVydHkgYXMgUHJvcGVydHlPclBhdGg8UHJvcGVydHk+LCBkYXRhTW9kZWxPYmplY3RQYXRoKTtcblx0XHRcdGxldCBkZXNjcmlwdGlvbkluZGV4OiBudW1iZXI7XG5cdFx0XHRzd2l0Y2ggKGRpc3BsYXlNb2RlKSB7XG5cdFx0XHRcdGNhc2UgXCJWYWx1ZVwiOlxuXHRcdFx0XHRcdHZhbHVlSW5kZXggPSBfcHVzaFVuaXF1ZShwYXRoLCBwcm9wZXJ0eSk7XG5cdFx0XHRcdFx0X2FwcGVuZFRlbXBsYXRlKGB7JHt2YWx1ZUluZGV4fX1gKTtcblx0XHRcdFx0XHRyZWxhdGVkUHJvcGVydGllcy52aXN1YWxTZXR0aW5nc1RvQmVFeGNsdWRlZCA9IHRleHRBbm5vdGF0aW9uUHJvcGVydHlQYXRoO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgXCJEZXNjcmlwdGlvblwiOlxuXHRcdFx0XHRcdC8vIEtlZXAgdmFsdWUgd2hlbiBleHBvcnRpbmcgKHNwbGl0IG1vZGUpIG9uIHRleHQgQXJyYW5nZW1lbnQgZGVmaW5lZCBhcyAjVGV4dE9ubHkgKE9ubHkgdmFsdWVzIGFyZSBleHBlY3RlZCBvbiBwYXN0ZSBmcm9tIEV4Y2VsIGZ1bmN0aW9uYWxpdHkpXG5cdFx0XHRcdFx0X3B1c2hVbmlxdWUocGF0aCwgcHJvcGVydHkpO1xuXHRcdFx0XHRcdGRlc2NyaXB0aW9uSW5kZXggPSBfcHVzaFVuaXF1ZSh0ZXh0QW5ub3RhdGlvblByb3BlcnR5UGF0aCwgdGV4dEFubm90YXRpb24uJHRhcmdldCk7XG5cdFx0XHRcdFx0X2FwcGVuZFRlbXBsYXRlKGB7JHtkZXNjcmlwdGlvbkluZGV4fX1gKTtcblx0XHRcdFx0XHRyZWxhdGVkUHJvcGVydGllcy52aXN1YWxTZXR0aW5nc1RvQmVFeGNsdWRlZCA9IHBhdGg7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSBcIlZhbHVlRGVzY3JpcHRpb25cIjpcblx0XHRcdFx0XHR2YWx1ZUluZGV4ID0gX3B1c2hVbmlxdWUocGF0aCwgcHJvcGVydHkpO1xuXHRcdFx0XHRcdGRlc2NyaXB0aW9uSW5kZXggPSBfcHVzaFVuaXF1ZSh0ZXh0QW5ub3RhdGlvblByb3BlcnR5UGF0aCwgdGV4dEFubm90YXRpb24uJHRhcmdldCk7XG5cdFx0XHRcdFx0X2FwcGVuZFRlbXBsYXRlKGB7JHt2YWx1ZUluZGV4fX0gKHske2Rlc2NyaXB0aW9uSW5kZXh9fSlgKTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIFwiRGVzY3JpcHRpb25WYWx1ZVwiOlxuXHRcdFx0XHRcdHZhbHVlSW5kZXggPSBfcHVzaFVuaXF1ZShwYXRoLCBwcm9wZXJ0eSk7XG5cdFx0XHRcdFx0ZGVzY3JpcHRpb25JbmRleCA9IF9wdXNoVW5pcXVlKHRleHRBbm5vdGF0aW9uUHJvcGVydHlQYXRoLCB0ZXh0QW5ub3RhdGlvbi4kdGFyZ2V0KTtcblx0XHRcdFx0XHRfYXBwZW5kVGVtcGxhdGUoYHske2Rlc2NyaXB0aW9uSW5kZXh9fSAoeyR7dmFsdWVJbmRleH19KWApO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBDaGVjayBmb3IgZmllbGQgY29udGFpbmluZyBDdXJyZW5jeSBPciBVbml0IFByb3BlcnRpZXMuXG5cdFx0XHRjb25zdCBjdXJyZW5jeU9yVW9NUHJvcGVydHkgPSBnZXRBc3NvY2lhdGVkQ3VycmVuY3lQcm9wZXJ0eShwcm9wZXJ0eSkgfHwgZ2V0QXNzb2NpYXRlZFVuaXRQcm9wZXJ0eShwcm9wZXJ0eSk7XG5cdFx0XHRjb25zdCBjdXJyZW5jeU9yVW5pdEFubm90YXRpb24gPSBwcm9wZXJ0eT8uYW5ub3RhdGlvbnM/Lk1lYXN1cmVzPy5JU09DdXJyZW5jeSB8fCBwcm9wZXJ0eT8uYW5ub3RhdGlvbnM/Lk1lYXN1cmVzPy5Vbml0O1xuXHRcdFx0aWYgKGN1cnJlbmN5T3JVb01Qcm9wZXJ0eSAmJiBjdXJyZW5jeU9yVW5pdEFubm90YXRpb24/LiR0YXJnZXQpIHtcblx0XHRcdFx0dmFsdWVJbmRleCA9IF9wdXNoVW5pcXVlKHBhdGgsIHByb3BlcnR5KTtcblx0XHRcdFx0Y3VycmVuY3lPclVvTUluZGV4ID0gX3B1c2hVbmlxdWUoY3VycmVuY3lPclVvTVByb3BlcnR5Lm5hbWUsIGN1cnJlbmN5T3JVbml0QW5ub3RhdGlvbi4kdGFyZ2V0KTtcblx0XHRcdFx0X2FwcGVuZFRlbXBsYXRlKGB7JHt2YWx1ZUluZGV4fX0gIHske2N1cnJlbmN5T3JVb01JbmRleH19YCk7XG5cdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5LlRhcmdldD8uJHRhcmdldD8uVmlzdWFsaXphdGlvbikge1xuXHRcdFx0XHRjb25zdCBkYXRhUG9pbnRQcm9wZXJ0eTogRWRtLlByaW1pdGl2ZVR5cGUgPSBwcm9wZXJ0eS5UYXJnZXQuJHRhcmdldC5WYWx1ZS4kdGFyZ2V0O1xuXHRcdFx0XHR2YWx1ZUluZGV4ID0gX3B1c2hVbmlxdWUocGF0aCwgZGF0YVBvaW50UHJvcGVydHkpO1xuXHRcdFx0XHQvLyBOZXcgZmFrZSBwcm9wZXJ0eSBjcmVhdGVkIGZvciB0aGUgUmF0aW5nL1Byb2dyZXNzIFRhcmdldCBWYWx1ZS4gSXQnbGwgYmUgdXNlZCBmb3IgdGhlIGV4cG9ydCBvbiBzcGxpdCBtb2RlLlxuXHRcdFx0XHRfcHVzaFVuaXF1ZShwcm9wZXJ0eS5UYXJnZXQudmFsdWUsIHByb3BlcnR5LlRhcmdldC4kdGFyZ2V0KTtcblx0XHRcdFx0dGFyZ2V0VmFsdWUgPSAocHJvcGVydHkuVGFyZ2V0LiR0YXJnZXQuVGFyZ2V0VmFsdWUgfHwgcHJvcGVydHkuVGFyZ2V0LiR0YXJnZXQuTWF4aW11bVZhbHVlKS50b1N0cmluZygpO1xuXHRcdFx0XHRfYXBwZW5kVGVtcGxhdGUoYHske3ZhbHVlSW5kZXh9fS8ke3RhcmdldFZhbHVlfWApO1xuXHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eS5hbm5vdGF0aW9ucz8uVUk/LkRhdGFGaWVsZERlZmF1bHQ/LlRhcmdldD8uJHRhcmdldD8uJFR5cGUgPT09IFVJQW5ub3RhdGlvblR5cGVzLkRhdGFQb2ludFR5cGUpIHtcblx0XHRcdFx0Ly8gRGF0YVBvaW50IHVzZS1jYXNlIHVzaW5nIERhdGFGaWVsZERlZmF1bHQuXG5cdFx0XHRcdGNvbnN0IGRhdGFQb2ludERlZmF1bHRQcm9wZXJ0eTogRWRtLlByaW1pdGl2ZVR5cGUgPSBwcm9wZXJ0eS5hbm5vdGF0aW9ucy5VSS5EYXRhRmllbGREZWZhdWx0O1xuXHRcdFx0XHR2YWx1ZUluZGV4ID0gX3B1c2hVbmlxdWUocGF0aCwgcHJvcGVydHkpO1xuXHRcdFx0XHQvLyBOZXcgZmFrZSBwcm9wZXJ0eSBjcmVhdGVkIGZvciB0aGUgUmF0aW5nL1Byb2dyZXNzIFRhcmdldCBWYWx1ZS4gSXQnbGwgYmUgdXNlZCBmb3IgdGhlIGV4cG9ydCBvbiBzcGxpdCBtb2RlLlxuXHRcdFx0XHRfcHVzaFVuaXF1ZShkYXRhUG9pbnREZWZhdWx0UHJvcGVydHkuVGFyZ2V0LnZhbHVlLCBwcm9wZXJ0eSk7XG5cdFx0XHRcdHRhcmdldFZhbHVlID0gKFxuXHRcdFx0XHRcdGRhdGFQb2ludERlZmF1bHRQcm9wZXJ0eS5UYXJnZXQuJHRhcmdldC5UYXJnZXRWYWx1ZSB8fCBkYXRhUG9pbnREZWZhdWx0UHJvcGVydHkuVGFyZ2V0LiR0YXJnZXQuVGFyZ2V0VmFsdWUuTWF4aW11bVZhbHVlXG5cdFx0XHRcdCkudG9TdHJpbmcoKTtcblx0XHRcdFx0X2FwcGVuZFRlbXBsYXRlKGB7JHt2YWx1ZUluZGV4fX0vJHt0YXJnZXRWYWx1ZX1gKTtcblx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHkuVGFyZ2V0Py4kdGFyZ2V0Py4kVHlwZSA9PT0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tdW5pY2F0aW9uLnYxLkNvbnRhY3RUeXBlXCIpIHtcblx0XHRcdFx0cmVsYXRlZFByb3BlcnRpZXMuZXhwb3J0U2V0dGluZ3NDb250YWN0UHJvcGVydHkgPVxuXHRcdFx0XHRcdHByb3BlcnR5LlRhcmdldC52YWx1ZS5zdWJzdHJpbmcoMCwgcHJvcGVydHkuVGFyZ2V0LnZhbHVlLmluZGV4T2YoXCIvXCIpICsgMSkgKyBwcm9wZXJ0eS5UYXJnZXQuJHRhcmdldC5mbj8ucGF0aDtcblx0XHRcdFx0dmFsdWVJbmRleCA9IF9wdXNoVW5pcXVlKHBhdGgsIHByb3BlcnR5LlRhcmdldC4kdGFyZ2V0LmZuLiR0YXJnZXQpO1xuXHRcdFx0XHRfYXBwZW5kVGVtcGxhdGUoYHske3ZhbHVlSW5kZXh9fWApO1xuXHRcdFx0fSBlbHNlIGlmICghaWdub3JlU2VsZikge1xuXHRcdFx0XHQvLyBDb2xsZWN0IHVuZGVybHlpbmcgcHJvcGVydHlcblx0XHRcdFx0dmFsdWVJbmRleCA9IF9wdXNoVW5pcXVlKHBhdGgsIHByb3BlcnR5KTtcblx0XHRcdFx0X2FwcGVuZFRlbXBsYXRlKGB7JHt2YWx1ZUluZGV4fX1gKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZWxhdGVkUHJvcGVydGllcyA9IF9jb2xsZWN0QWRkaXRpb25hbFByb3BlcnRpZXNGb3JBbmFseXRpY2FsVGFibGUocHJvcGVydHksIG5hdmlnYXRpb25QYXRoUHJlZml4LCB0YWJsZVR5cGUsIHJlbGF0ZWRQcm9wZXJ0aWVzKTtcblx0XHRpZiAoT2JqZWN0LmtleXMocmVsYXRlZFByb3BlcnRpZXMuYWRkaXRpb25hbFByb3BlcnRpZXMpLmxlbmd0aCA+IDAgJiYgT2JqZWN0LmtleXMocmVsYXRlZFByb3BlcnRpZXMucHJvcGVydGllcykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHQvLyBDb2xsZWN0IHVuZGVybHlpbmcgcHJvcGVydHkgaWYgbm90IGNvbGxlY3RlZCBhbHJlYWR5LlxuXHRcdFx0Ly8gVGhpcyBpcyB0byBlbnN1cmUgdGhhdCBhZGRpdGlvbmFsUHJvcGVydGllcyBhcmUgbWFkZSBhdmFpbGFibGUgb25seSB0byBjb21wbGV4IHByb3BlcnR5IGluZm9zLlxuXHRcdFx0dmFsdWVJbmRleCA9IF9wdXNoVW5pcXVlKHBhdGgsIHByb3BlcnR5KTtcblx0XHRcdF9hcHBlbmRUZW1wbGF0ZShgeyR7dmFsdWVJbmRleH19YCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJlbGF0ZWRQcm9wZXJ0aWVzO1xufVxuXG4vKipcbiAqIENvbGxlY3QgcHJvcGVydGllcyBjb25zdW1lZCBieSBhIERhdGEgRmllbGQuXG4gKiBUaGlzIGlzIGZvciBwb3B1bGF0aW5nIHRoZSBDb21wbGV4UHJvcGVydHlJbmZvcyBvZiB0aGUgdGFibGUgZGVsZWdhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRhRmllbGRBYnN0cmFjdFR5cGVzfSBkYXRhRmllbGQgVGhlIERhdGEgRmllbGQgZm9yIHdoaWNoIHRoZSBwcm9wZXJ0aWVzIG5lZWQgdG8gYmUgaWRlbnRpZmllZC5cbiAqIEBwYXJhbSBjb252ZXJ0ZXJDb250ZXh0IFRoZSBjb252ZXJ0ZXIgY29udGV4dC5cbiAqIEBwYXJhbSB7VGFibGVUeXBlfSB0YWJsZVR5cGUgVGhlIHRhYmxlIHR5cGUuXG4gKiBAcGFyYW0ge0NvbXBsZXhQcm9wZXJ0eUluZm99IHJlbGF0ZWRQcm9wZXJ0aWVzIFRoZSBwcm9wZXJ0aWVzIGlkZW50aWZpZWQgc28gZmFyLlxuICogQHJldHVybnMge0NvbXBsZXhQcm9wZXJ0eUluZm99IFRoZSBwcm9wZXJ0aWVzIHJlbGF0ZWQgdG8gdGhlIERhdGEgRmllbGQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb2xsZWN0UmVsYXRlZFByb3BlcnRpZXNSZWN1cnNpdmVseShcblx0ZGF0YUZpZWxkOiBEYXRhRmllbGRBYnN0cmFjdFR5cGVzLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHR0YWJsZVR5cGU6IFRhYmxlVHlwZSxcblx0cmVsYXRlZFByb3BlcnRpZXM6IENvbXBsZXhQcm9wZXJ0eUluZm8gPSB7IHByb3BlcnRpZXM6IHt9LCBhZGRpdGlvbmFsUHJvcGVydGllczoge30gfVxuKTogQ29tcGxleFByb3BlcnR5SW5mbyB7XG5cdGlmICgoZGF0YUZpZWxkLiRUeXBlID09PSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGQgfHwgZGF0YUZpZWxkLiRUeXBlID09PSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRXaXRoVXJsKSAmJiBkYXRhRmllbGQuVmFsdWUpIHtcblx0XHRjb25zdCBwcm9wZXJ0eSA9IGRhdGFGaWVsZC5WYWx1ZTtcblx0XHRyZWxhdGVkUHJvcGVydGllcyA9IGNvbGxlY3RSZWxhdGVkUHJvcGVydGllcyhcblx0XHRcdHByb3BlcnR5LnBhdGgsXG5cdFx0XHRwcm9wZXJ0eS4kdGFyZ2V0LFxuXHRcdFx0Y29udmVydGVyQ29udGV4dCxcblx0XHRcdGZhbHNlLFxuXHRcdFx0dGFibGVUeXBlLFxuXHRcdFx0cmVsYXRlZFByb3BlcnRpZXNcblx0XHQpO1xuXHRcdGNvbnN0IG5hdmlnYXRpb25QYXRoUHJlZml4ID0gX2dldE5hdmlnYXRpb25QYXRoUHJlZml4KHByb3BlcnR5LnBhdGgpO1xuXHRcdHJlbGF0ZWRQcm9wZXJ0aWVzID0gX2NvbGxlY3RBZGRpdGlvbmFsUHJvcGVydGllc0ZvckFuYWx5dGljYWxUYWJsZShkYXRhRmllbGQsIG5hdmlnYXRpb25QYXRoUHJlZml4LCB0YWJsZVR5cGUsIHJlbGF0ZWRQcm9wZXJ0aWVzKTtcblx0fSBlbHNlIGlmIChkYXRhRmllbGQuJFR5cGUgPT09IFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckFubm90YXRpb24pIHtcblx0XHRzd2l0Y2ggKGRhdGFGaWVsZC5UYXJnZXQ/LiR0YXJnZXQ/LiRUeXBlKSB7XG5cdFx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkZpZWxkR3JvdXBUeXBlOlxuXHRcdFx0XHRkYXRhRmllbGQuVGFyZ2V0LiR0YXJnZXQuRGF0YT8uZm9yRWFjaCgoaW5uZXJEYXRhRmllbGQ6IERhdGFGaWVsZEFic3RyYWN0VHlwZXMpID0+IHtcblx0XHRcdFx0XHRyZWxhdGVkUHJvcGVydGllcyA9IGNvbGxlY3RSZWxhdGVkUHJvcGVydGllc1JlY3Vyc2l2ZWx5KGlubmVyRGF0YUZpZWxkLCBjb252ZXJ0ZXJDb250ZXh0LCB0YWJsZVR5cGUsIHJlbGF0ZWRQcm9wZXJ0aWVzKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFQb2ludFR5cGU6XG5cdFx0XHRcdHJlbGF0ZWRQcm9wZXJ0aWVzID0gY29sbGVjdFJlbGF0ZWRQcm9wZXJ0aWVzKFxuXHRcdFx0XHRcdGRhdGFGaWVsZC5UYXJnZXQuJHRhcmdldC5WYWx1ZS5wYXRoLFxuXHRcdFx0XHRcdGRhdGFGaWVsZCxcblx0XHRcdFx0XHRjb252ZXJ0ZXJDb250ZXh0LFxuXHRcdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHRcdHRhYmxlVHlwZSxcblx0XHRcdFx0XHRyZWxhdGVkUHJvcGVydGllc1xuXHRcdFx0XHQpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW11bmljYXRpb24udjEuQ29udGFjdFR5cGVcIjpcblx0XHRcdFx0cmVsYXRlZFByb3BlcnRpZXMgPSBjb2xsZWN0UmVsYXRlZFByb3BlcnRpZXMoXG5cdFx0XHRcdFx0ZGF0YUZpZWxkLlRhcmdldC52YWx1ZSxcblx0XHRcdFx0XHRkYXRhRmllbGQsXG5cdFx0XHRcdFx0Y29udmVydGVyQ29udGV4dCxcblx0XHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0XHR0YWJsZVR5cGUsXG5cdFx0XHRcdFx0cmVsYXRlZFByb3BlcnRpZXNcblx0XHRcdFx0KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJlbGF0ZWRQcm9wZXJ0aWVzO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0RGF0YUZpZWxkRGF0YVR5cGUgPSBmdW5jdGlvbihvRGF0YUZpZWxkOiBEYXRhRmllbGRBYnN0cmFjdFR5cGVzIHwgUHJvcGVydHkpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRsZXQgc0RhdGFUeXBlOiBzdHJpbmcgfCB1bmRlZmluZWQgPSAob0RhdGFGaWVsZCBhcyBEYXRhRmllbGRBYnN0cmFjdFR5cGVzKS4kVHlwZTtcblx0c3dpdGNoIChzRGF0YVR5cGUpIHtcblx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckFjdGlvbjpcblx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvbjpcblx0XHRcdHNEYXRhVHlwZSA9IHVuZGVmaW5lZDtcblx0XHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGQ6XG5cdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRXaXRoTmF2aWdhdGlvblBhdGg6XG5cdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRXaXRoVXJsOlxuXHRcdFx0c0RhdGFUeXBlID0gKG9EYXRhRmllbGQgYXMgRGF0YUZpZWxkKT8uVmFsdWU/LiR0YXJnZXQ/LnR5cGU7XG5cdFx0XHRicmVhaztcblxuXHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkRm9yQW5ub3RhdGlvbjpcblx0XHRkZWZhdWx0OlxuXHRcdFx0Y29uc3Qgc0RhdGFUeXBlRm9yRGF0YUZpZWxkRm9yQW5ub3RhdGlvbiA9IChvRGF0YUZpZWxkIGFzIERhdGFGaWVsZEZvckFubm90YXRpb24pLlRhcmdldD8uJHRhcmdldC4kVHlwZTtcblx0XHRcdGlmIChzRGF0YVR5cGVGb3JEYXRhRmllbGRGb3JBbm5vdGF0aW9uKSB7XG5cdFx0XHRcdGlmICgob0RhdGFGaWVsZCBhcyBEYXRhRmllbGRGb3JBbm5vdGF0aW9uKS5UYXJnZXQ/LiR0YXJnZXQuJFR5cGUgPT09IENvbW11bmljYXRpb25Bbm5vdGF0aW9uVHlwZXMuQ29udGFjdFR5cGUpIHtcblx0XHRcdFx0XHRzRGF0YVR5cGUgPSAoKChvRGF0YUZpZWxkIGFzIERhdGFGaWVsZEZvckFubm90YXRpb24pLlRhcmdldD8uJHRhcmdldCBhcyBDb250YWN0KT8uZm4gYXMgYW55KS4kdGFyZ2V0Py50eXBlO1xuXHRcdFx0XHR9IGVsc2UgaWYgKChvRGF0YUZpZWxkIGFzIERhdGFGaWVsZEZvckFubm90YXRpb24pLlRhcmdldD8uJHRhcmdldC4kVHlwZSA9PT0gVUlBbm5vdGF0aW9uVHlwZXMuRGF0YVBvaW50VHlwZSkge1xuXHRcdFx0XHRcdHNEYXRhVHlwZSA9XG5cdFx0XHRcdFx0XHQoKG9EYXRhRmllbGQgYXMgRGF0YUZpZWxkRm9yQW5ub3RhdGlvbikuVGFyZ2V0Py4kdGFyZ2V0IGFzIERhdGFQb2ludCk/LlZhbHVlPy4kUGF0aD8uJFR5cGUgfHxcblx0XHRcdFx0XHRcdCgob0RhdGFGaWVsZCBhcyBEYXRhRmllbGRGb3JBbm5vdGF0aW9uKS5UYXJnZXQ/LiR0YXJnZXQgYXMgRGF0YVBvaW50KT8uVmFsdWU/LiR0YXJnZXQudHlwZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBlLmcuIEZpZWxkR3JvdXAgb3IgQ2hhcnRcblx0XHRcdFx0XHRzRGF0YVR5cGUgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNEYXRhVHlwZSA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHR9XG5cblx0cmV0dXJuIHNEYXRhVHlwZTtcbn07XG4iXX0=