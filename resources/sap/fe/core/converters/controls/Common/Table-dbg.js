/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["../../ManifestSettings", "../../helpers/ID", "sap/fe/core/converters/controls/Common/Action", "sap/fe/core/converters/helpers/ConfigurableObject", "sap/fe/core/converters/annotations/DataField", "sap/fe/core/helpers/BindingExpression", "sap/fe/core/converters/helpers/BindingHelper", "sap/fe/core/converters/helpers/Key", "sap/fe/core/formatters/TableFormatter", "sap/fe/core/formatters/TableFormatterTypes", "sap/fe/core/templating/DataModelPathHelper", "sap/fe/core/helpers/StableIdHelper", "sap/fe/core/converters/helpers/IssueManager", "sap/fe/core/templating/PropertyHelper", "../../helpers/Aggregation", "sap/fe/core/templating/UIFormatters", "./Criticality", "sap/fe/core/templating/EntitySetHelper"], function (ManifestSettings, ID, Action, ConfigurableObject, DataField, BindingExpression, BindingHelper, Key, tableFormatters, TableFormatterTypes, DataModelPathHelper, StableIdHelper, IssueManager, PropertyHelper, Aggregation, UIFormatters, Criticality, EntitySetHelper) {
  "use strict";

  var _exports = {};
  var getNonSortablePropertiesRestrictions = EntitySetHelper.getNonSortablePropertiesRestrictions;
  var getMessageTypeFromCriticalityType = Criticality.getMessageTypeFromCriticalityType;
  var getTypeConfig = UIFormatters.getTypeConfig;
  var getDisplayMode = UIFormatters.getDisplayMode;
  var AggregationHelper = Aggregation.AggregationHelper;
  var getTargetValueOnDataPoint = PropertyHelper.getTargetValueOnDataPoint;
  var isPathExpression = PropertyHelper.isPathExpression;
  var getAssociatedCurrencyProperty = PropertyHelper.getAssociatedCurrencyProperty;
  var getAssociatedUnitProperty = PropertyHelper.getAssociatedUnitProperty;
  var isProperty = PropertyHelper.isProperty;
  var IssueType = IssueManager.IssueType;
  var IssueSeverity = IssueManager.IssueSeverity;
  var IssueCategory = IssueManager.IssueCategory;
  var replaceSpecialChars = StableIdHelper.replaceSpecialChars;
  var isPathUpdatable = DataModelPathHelper.isPathUpdatable;
  var isPathInsertable = DataModelPathHelper.isPathInsertable;
  var isPathSearchable = DataModelPathHelper.isPathSearchable;
  var isPathDeletable = DataModelPathHelper.isPathDeletable;
  var getTargetObjectPath = DataModelPathHelper.getTargetObjectPath;
  var MessageType = TableFormatterTypes.MessageType;
  var KeyHelper = Key.KeyHelper;
  var UI = BindingHelper.UI;
  var singletonPathVisitor = BindingHelper.singletonPathVisitor;
  var bindingContextPathVisitor = BindingHelper.bindingContextPathVisitor;
  var Draft = BindingHelper.Draft;
  var resolveBindingString = BindingExpression.resolveBindingString;
  var or = BindingExpression.or;
  var not = BindingExpression.not;
  var isConstant = BindingExpression.isConstant;
  var isBinding = BindingExpression.isBinding;
  var ifElse = BindingExpression.ifElse;
  var formatResult = BindingExpression.formatResult;
  var equal = BindingExpression.equal;
  var constant = BindingExpression.constant;
  var compileBinding = BindingExpression.compileBinding;
  var bindingExpression = BindingExpression.bindingExpression;
  var annotationExpression = BindingExpression.annotationExpression;
  var and = BindingExpression.and;
  var isDataFieldTypes = DataField.isDataFieldTypes;
  var isDataFieldForActionAbstract = DataField.isDataFieldForActionAbstract;
  var isDataFieldAlwaysHidden = DataField.isDataFieldAlwaysHidden;
  var getSemanticObjectPath = DataField.getSemanticObjectPath;
  var getDataFieldDataType = DataField.getDataFieldDataType;
  var collectRelatedPropertiesRecursively = DataField.collectRelatedPropertiesRecursively;
  var collectRelatedProperties = DataField.collectRelatedProperties;
  var Placement = ConfigurableObject.Placement;
  var insertCustomElements = ConfigurableObject.insertCustomElements;
  var removeDuplicateActions = Action.removeDuplicateActions;
  var isActionNavigable = Action.isActionNavigable;
  var getActionsFromManifest = Action.getActionsFromManifest;
  var TableID = ID.TableID;
  var VisualizationType = ManifestSettings.VisualizationType;
  var VariantManagementType = ManifestSettings.VariantManagementType;
  var TemplateType = ManifestSettings.TemplateType;
  var SelectionMode = ManifestSettings.SelectionMode;
  var HorizontalAlign = ManifestSettings.HorizontalAlign;
  var CreationMode = ManifestSettings.CreationMode;
  var AvailabilityType = ManifestSettings.AvailabilityType;
  var ActionType = ManifestSettings.ActionType;

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  var ColumnType;

  (function (ColumnType) {
    ColumnType["Default"] = "Default";
    ColumnType["Annotation"] = "Annotation";
    ColumnType["Slot"] = "Slot";
  })(ColumnType || (ColumnType = {}));

  /**
   * Returns an array of all annotation-based and manifest-based table actions.
   *
   * @param {LineItem} lineItemAnnotation
   * @param {string} visualizationPath
   * @param {ConverterContext} converterContext
   * @param {NavigationSettingsConfiguration} navigationSettings
   * @returns {BaseAction} The complete table actions
   */
  function getTableActions(lineItemAnnotation, visualizationPath, converterContext, navigationSettings) {
    var aTableActions = getTableAnnotationActions(lineItemAnnotation, visualizationPath, converterContext);
    var aAnnotationActions = aTableActions.tableActions;
    var aHiddenActions = aTableActions.hiddenTableActions;
    return insertCustomElements(aAnnotationActions, getActionsFromManifest(converterContext.getManifestControlConfiguration(visualizationPath).actions, converterContext, aAnnotationActions, navigationSettings, true, aHiddenActions), {
      isNavigable: "overwrite",
      enableOnSelect: "overwrite",
      enableAutoScroll: "overwrite",
      enabled: "overwrite",
      defaultValuesExtensionFunction: "overwrite"
    });
  }
  /**
   * Returns an array of all columns, annotation-based as well as manifest based.
   * They are sorted and some properties can be overwritten via the manifest (check out the keys that can be overwritten).
   *
   * @param {LineItem} lineItemAnnotation Collection of data fields for representation in a table or list
   * @param {string} visualizationPath
   * @param {ConverterContext} converterContext
   * @param {NavigationSettingsConfiguration} navigationSettings
   * @returns {TableColumn[]} Returns all table columns that should be available, regardless of templating or personalization or their origin
   */


  _exports.getTableActions = getTableActions;

  function getTableColumns(lineItemAnnotation, visualizationPath, converterContext, navigationSettings) {
    var annotationColumns = getColumnsFromAnnotations(lineItemAnnotation, visualizationPath, converterContext);
    var manifestColumns = getColumnsFromManifest(converterContext.getManifestControlConfiguration(visualizationPath).columns, annotationColumns, converterContext, converterContext.getAnnotationEntityType(lineItemAnnotation), navigationSettings);
    return insertCustomElements(annotationColumns, manifestColumns, {
      width: "overwrite",
      isNavigable: "overwrite",
      availability: "overwrite",
      settings: "overwrite",
      horizontalAlign: "overwrite",
      formatOptions: "overwrite"
    });
  }
  /**
   * Retrieve the custom aggregation definitions from the entityType.
   *
   * @param entityType The target entity type.
   * @param tableColumns The array of columns for the entity type.
   * @param converterContext The converter context.
   * @returns The aggregate definitions from the entityType, or undefined if the entity doesn't support analytical queries.
   */


  _exports.getTableColumns = getTableColumns;

  var getAggregateDefinitionsFromEntityType = function (entityType, tableColumns, converterContext) {
    var aggregationHelper = new AggregationHelper(entityType, converterContext);

    function findColumnFromPath(path) {
      return tableColumns.find(function (column) {
        var annotationColumn = column;
        return annotationColumn.propertyInfos === undefined && annotationColumn.relativePath === path;
      });
    }

    if (!aggregationHelper.isAnalyticsSupported()) {
      return undefined;
    } // Keep a set of all currency/unit properties, as we don't want to consider them as aggregates
    // They are aggregates for technical reasons (to manage multi-units situations) but it doesn't make sense from a user standpoint


    var mCurrencyOrUnitProperties = new Set();
    tableColumns.forEach(function (oColumn) {
      var oTableColumn = oColumn;

      if (oTableColumn.unit) {
        mCurrencyOrUnitProperties.add(oTableColumn.unit);
      }
    });
    var aCustomAggregateAnnotations = aggregationHelper.getCustomAggregateDefinitions();
    var mRawDefinitions = {};
    aCustomAggregateAnnotations.forEach(function (annotation) {
      var oAggregatedProperty = aggregationHelper._entityType.entityProperties.find(function (oProperty) {
        return oProperty.name === annotation.qualifier;
      });

      if (oAggregatedProperty) {
        var _annotation$annotatio, _annotation$annotatio2;

        var aContextDefiningProperties = (_annotation$annotatio = annotation.annotations) === null || _annotation$annotatio === void 0 ? void 0 : (_annotation$annotatio2 = _annotation$annotatio.Aggregation) === null || _annotation$annotatio2 === void 0 ? void 0 : _annotation$annotatio2.ContextDefiningProperties;
        mRawDefinitions[oAggregatedProperty.name] = aContextDefiningProperties ? aContextDefiningProperties.map(function (oCtxDefProperty) {
          return oCtxDefProperty.value;
        }) : [];
      }
    });
    var mResult = {};
    tableColumns.forEach(function (oColumn) {
      var oTableColumn = oColumn;

      if (oTableColumn.propertyInfos === undefined && oTableColumn.relativePath) {
        var aRawContextDefiningProperties = mRawDefinitions[oTableColumn.relativePath]; // Ignore aggregates corresponding to currencies or units of measure and dummy created property for datapoint target Value

        if (aRawContextDefiningProperties && !mCurrencyOrUnitProperties.has(oTableColumn.name) && !oTableColumn.isDataPointFakeTargetProperty) {
          mResult[oTableColumn.name] = {
            defaultAggregate: {},
            relativePath: oTableColumn.relativePath
          };
          var aContextDefiningProperties = [];
          aRawContextDefiningProperties.forEach(function (contextDefiningPropertyName) {
            var oColumn = findColumnFromPath(contextDefiningPropertyName);

            if (oColumn) {
              aContextDefiningProperties.push(oColumn.name);
            }
          });

          if (aContextDefiningProperties.length) {
            mResult[oTableColumn.name].defaultAggregate.contextDefiningProperties = aContextDefiningProperties;
          }
        }
      }
    });
    return mResult;
  };
  /**
   * Updates a table visualization for analytical use cases.
   *
   * @param tableVisualization The visualization to be updated
   * @param entityType The entity type displayed in the table
   * @param converterContext The converter context
   * @param presentationVariantAnnotation The presentationVariant annotation (if any)
   */


  _exports.getAggregateDefinitionsFromEntityType = getAggregateDefinitionsFromEntityType;

  function updateTableVisualizationForAnalytics(tableVisualization, entityType, converterContext, presentationVariantAnnotation) {
    if (tableVisualization.control.type === "AnalyticalTable") {
      var aggregatesDefinitions = getAggregateDefinitionsFromEntityType(entityType, tableVisualization.columns, converterContext);

      if (aggregatesDefinitions) {
        tableVisualization.enableAnalytics = true;
        tableVisualization.aggregates = aggregatesDefinitions; // Add group and sort conditions from the presentation variant

        tableVisualization.annotation.groupConditions = getGroupConditions(presentationVariantAnnotation, tableVisualization.columns);
        tableVisualization.annotation.aggregateConditions = getAggregateConditions(presentationVariantAnnotation, tableVisualization.columns);
      }

      tableVisualization.control.type = "GridTable"; // AnalyticalTable isn't a real type for the MDC:Table, so we always switch back to Grid
    }
  }
  /**
   * Get the navigation target path from manifest settings.
   *
   * @param converterContext The converter context
   * @param navigationPropertyPath The navigation path to check in the manifest settings
   * @returns Navigation path from manifest settings
   */


  function getNavigationTargetPath(converterContext, navigationPropertyPath) {
    var manifestWrapper = converterContext.getManifestWrapper();

    if (navigationPropertyPath && manifestWrapper.getNavigationConfiguration(navigationPropertyPath)) {
      var navConfig = manifestWrapper.getNavigationConfiguration(navigationPropertyPath);

      if (Object.keys(navConfig).length > 0) {
        return navigationPropertyPath;
      }
    }

    var dataModelPath = converterContext.getDataModelObjectPath();
    var contextPath = converterContext.getContextPath();
    var navConfigForContextPath = manifestWrapper.getNavigationConfiguration(contextPath);

    if (navConfigForContextPath && Object.keys(navConfigForContextPath).length > 0) {
      return contextPath;
    }

    return dataModelPath.targetEntitySet ? dataModelPath.targetEntitySet.name : dataModelPath.startingEntitySet.name;
  }
  /**
   * Sets the 'unit' and 'textArrangement' properties in columns when necessary.
   *
   * @param entityType The entity type displayed in the table
   * @param tableColumns The columns to be updated
   */


  function updateLinkedProperties(entityType, tableColumns) {
    function findColumnByPath(path) {
      return tableColumns.find(function (column) {
        var annotationColumn = column;
        return annotationColumn.propertyInfos === undefined && annotationColumn.relativePath === path;
      });
    }

    tableColumns.forEach(function (oColumn) {
      var oTableColumn = oColumn;

      if (oTableColumn.propertyInfos === undefined && oTableColumn.relativePath) {
        var oProperty = entityType.entityProperties.find(function (oProp) {
          return oProp.name === oTableColumn.relativePath;
        });

        if (oProperty) {
          var _getAssociatedCurrenc, _getAssociatedUnitPro, _oProperty$annotation;

          var sUnit = ((_getAssociatedCurrenc = getAssociatedCurrencyProperty(oProperty)) === null || _getAssociatedCurrenc === void 0 ? void 0 : _getAssociatedCurrenc.name) || ((_getAssociatedUnitPro = getAssociatedUnitProperty(oProperty)) === null || _getAssociatedUnitPro === void 0 ? void 0 : _getAssociatedUnitPro.name);

          if (sUnit) {
            var oUnitColumn = findColumnByPath(sUnit);
            oTableColumn.unit = oUnitColumn === null || oUnitColumn === void 0 ? void 0 : oUnitColumn.name;
          }

          var displayMode = getDisplayMode(oProperty),
              textAnnotation = (_oProperty$annotation = oProperty.annotations.Common) === null || _oProperty$annotation === void 0 ? void 0 : _oProperty$annotation.Text;

          if (isPathExpression(textAnnotation) && displayMode !== "Value") {
            var oTextColumn = findColumnByPath(textAnnotation.path);

            if (oTextColumn && oTextColumn.name !== oTableColumn.name) {
              oTableColumn.textArrangement = {
                textProperty: oTextColumn.name,
                mode: displayMode
              };
            }
          }
        }
      }
    });
  }

  _exports.updateLinkedProperties = updateLinkedProperties;

  function createTableVisualization(lineItemAnnotation, visualizationPath, converterContext, presentationVariantAnnotation, isCondensedTableLayoutCompliant, viewConfiguration) {
    var tableManifestConfig = getTableManifestConfiguration(lineItemAnnotation, visualizationPath, converterContext, isCondensedTableLayoutCompliant);

    var _splitPath = splitPath(visualizationPath),
        navigationPropertyPath = _splitPath.navigationPropertyPath;

    var navigationTargetPath = getNavigationTargetPath(converterContext, navigationPropertyPath);
    var navigationSettings = converterContext.getManifestWrapper().getNavigationConfiguration(navigationTargetPath);
    var columns = getTableColumns(lineItemAnnotation, visualizationPath, converterContext, navigationSettings);
    var operationAvailableMap = getOperationAvailableMap(lineItemAnnotation, converterContext);
    var oVisualization = {
      type: VisualizationType.Table,
      annotation: getTableAnnotationConfiguration(lineItemAnnotation, visualizationPath, converterContext, tableManifestConfig, columns, presentationVariantAnnotation, viewConfiguration),
      control: tableManifestConfig,
      actions: removeDuplicateActions(getTableActions(lineItemAnnotation, visualizationPath, converterContext, navigationSettings)),
      columns: columns,
      enableDataStateFilter: converterContext.getTemplateType() === "ObjectPage",
      operationAvailableMap: JSON.stringify(operationAvailableMap),
      operationAvailableProperties: getOperationAvailableProperties(operationAvailableMap, converterContext)
    };
    updateLinkedProperties(converterContext.getAnnotationEntityType(lineItemAnnotation), columns);
    updateTableVisualizationForAnalytics(oVisualization, converterContext.getAnnotationEntityType(lineItemAnnotation), converterContext, presentationVariantAnnotation);
    return oVisualization;
  }

  _exports.createTableVisualization = createTableVisualization;

  function createDefaultTableVisualization(converterContext) {
    var tableManifestConfig = getTableManifestConfiguration(undefined, "", converterContext, false);
    var columns = getColumnsFromEntityType({}, converterContext.getEntityType(), [], [], converterContext, tableManifestConfig.type);
    var operationAvailableMap = getOperationAvailableMap(undefined, converterContext);
    var oVisualization = {
      type: VisualizationType.Table,
      annotation: getTableAnnotationConfiguration(undefined, "", converterContext, tableManifestConfig, columns),
      control: tableManifestConfig,
      actions: [],
      columns: columns,
      enableDataStateFilter: converterContext.getTemplateType() === "ObjectPage",
      operationAvailableMap: JSON.stringify(operationAvailableMap),
      operationAvailableProperties: getOperationAvailableProperties(operationAvailableMap, converterContext)
    };
    updateLinkedProperties(converterContext.getEntityType(), columns);
    updateTableVisualizationForAnalytics(oVisualization, converterContext.getEntityType(), converterContext);
    return oVisualization;
  }
  /**
   * Gets the map of Core.OperationAvailable property paths for all DataFieldForActions.
   *
   * @param lineItemAnnotation The instance of the line item
   * @param converterContext The instance of the converter context
   * @returns {Record<string, any>} The record containing all action names and their corresponding Core.OperationAvailable property paths
   */


  _exports.createDefaultTableVisualization = createDefaultTableVisualization;

  function getOperationAvailableMap(lineItemAnnotation, converterContext) {
    var operationAvailableMap = {};

    var addToMap = function (key, value) {
      if (key) {
        operationAvailableMap[key] = value;
      }
    };

    if (lineItemAnnotation) {
      lineItemAnnotation.forEach(function (dataField) {
        if (dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForAction") {
          var actionName = dataField.Action;

          if ((actionName === null || actionName === void 0 ? void 0 : actionName.indexOf("/")) < 0 && !dataField.Determining) {
            var _actionTarget$annotat, _actionTarget$annotat2, _actionTarget$paramet;

            var actionTarget = dataField.ActionTarget;

            if ((actionTarget === null || actionTarget === void 0 ? void 0 : (_actionTarget$annotat = actionTarget.annotations) === null || _actionTarget$annotat === void 0 ? void 0 : (_actionTarget$annotat2 = _actionTarget$annotat.Core) === null || _actionTarget$annotat2 === void 0 ? void 0 : _actionTarget$annotat2.OperationAvailable) === null) {
              // Annotation explicitly configured with null (action advertisement related)
              addToMap(actionName, null);
            } else if (actionTarget !== null && actionTarget !== void 0 && (_actionTarget$paramet = actionTarget.parameters) !== null && _actionTarget$paramet !== void 0 && _actionTarget$paramet.length) {
              var _actionTarget$annotat3, _actionTarget$annotat4, _actionTarget$annotat5, _actionTarget$annotat6;

              var bindingParameterFullName = actionTarget.parameters[0].fullyQualifiedName,
                  targetExpression = annotationExpression(actionTarget === null || actionTarget === void 0 ? void 0 : (_actionTarget$annotat3 = actionTarget.annotations) === null || _actionTarget$annotat3 === void 0 ? void 0 : (_actionTarget$annotat4 = _actionTarget$annotat3.Core) === null || _actionTarget$annotat4 === void 0 ? void 0 : _actionTarget$annotat4.OperationAvailable, [], undefined, function (path) {
                return bindingContextPathVisitor(path, converterContext, bindingParameterFullName);
              });

              if (targetExpression !== null && targetExpression !== void 0 && targetExpression.path) {
                addToMap(actionName, targetExpression.path);
              } else if ((actionTarget === null || actionTarget === void 0 ? void 0 : (_actionTarget$annotat5 = actionTarget.annotations) === null || _actionTarget$annotat5 === void 0 ? void 0 : (_actionTarget$annotat6 = _actionTarget$annotat5.Core) === null || _actionTarget$annotat6 === void 0 ? void 0 : _actionTarget$annotat6.OperationAvailable) !== undefined) {
                addToMap(actionName, targetExpression);
              }
            }
          }
        }
      });
    }

    return operationAvailableMap;
  }
  /**
   * Method to retrieve all property paths assigned to the Core.OperationAvailable annotation.
   *
   * @param {Record<string, any>} operationAvailableMap The record consisting of actions and their Core.OperationAvailable property paths
   * @param {ConverterContext} converterContext The instance of the converter context
   * @returns {string} The CSV string of all property paths associated with the Core.OperationAvailable annotation
   */


  function getOperationAvailableProperties(operationAvailableMap, converterContext) {
    var properties = new Set();

    for (var actionName in operationAvailableMap) {
      var propertyName = operationAvailableMap[actionName];

      if (propertyName === null) {
        // Annotation configured with explicit 'null' (action advertisement relevant)
        properties.add(actionName);
      } else if (typeof propertyName === "string") {
        // Add property paths and not Constant values.
        properties.add(propertyName);
      }
    }

    if (properties.size) {
      var _entityType$annotatio, _entityType$annotatio2, _entityType$annotatio3, _entityType$annotatio4, _entityType$annotatio5;

      // Some actions have an operation available based on property --> we need to load the HeaderInfo.Title property
      // so that the dialog on partial actions is displayed properly (BCP 2180271425)
      var entityType = converterContext.getEntityType();
      var titleProperty = (_entityType$annotatio = entityType.annotations) === null || _entityType$annotatio === void 0 ? void 0 : (_entityType$annotatio2 = _entityType$annotatio.UI) === null || _entityType$annotatio2 === void 0 ? void 0 : (_entityType$annotatio3 = _entityType$annotatio2.HeaderInfo) === null || _entityType$annotatio3 === void 0 ? void 0 : (_entityType$annotatio4 = _entityType$annotatio3.Title) === null || _entityType$annotatio4 === void 0 ? void 0 : (_entityType$annotatio5 = _entityType$annotatio4.Value) === null || _entityType$annotatio5 === void 0 ? void 0 : _entityType$annotatio5.path;

      if (titleProperty) {
        properties.add(titleProperty);
      }
    }

    return Array.from(properties).join(",");
  }
  /**
   * Iterates over the DataFieldForAction and DataFieldForIntentBasedNavigation of a line item and
   * returns all the UI.Hidden annotation expressions.
   *
   * @param lineItemAnnotation Collection of data fields used for representation in a table or list
   * @param currentEntityType Current entity type
   * @param contextDataModelObjectPath Object path of the data model
   * @param isEntitySet
   * @returns All the `UI.Hidden` path expressions found in the relevant actions
   */


  function getUIHiddenExpForActionsRequiringContext(lineItemAnnotation, currentEntityType, contextDataModelObjectPath, isEntitySet) {
    var aUiHiddenPathExpressions = [];
    lineItemAnnotation.forEach(function (dataField) {
      var _dataField$ActionTarg, _dataField$Inline;

      // Check if the lineItem context is the same as that of the action:
      if (dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForAction" && dataField !== null && dataField !== void 0 && (_dataField$ActionTarg = dataField.ActionTarget) !== null && _dataField$ActionTarg !== void 0 && _dataField$ActionTarg.isBound && currentEntityType === (dataField === null || dataField === void 0 ? void 0 : dataField.ActionTarget.sourceEntityType) || dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation" && dataField.RequiresContext && (dataField === null || dataField === void 0 ? void 0 : (_dataField$Inline = dataField.Inline) === null || _dataField$Inline === void 0 ? void 0 : _dataField$Inline.valueOf()) !== true) {
        var _dataField$annotation, _dataField$annotation2, _dataField$annotation3;

        if (typeof ((_dataField$annotation = dataField.annotations) === null || _dataField$annotation === void 0 ? void 0 : (_dataField$annotation2 = _dataField$annotation.UI) === null || _dataField$annotation2 === void 0 ? void 0 : (_dataField$annotation3 = _dataField$annotation2.Hidden) === null || _dataField$annotation3 === void 0 ? void 0 : _dataField$annotation3.valueOf()) === "object") {
          aUiHiddenPathExpressions.push(equal(getBindingExpFromContext(dataField, contextDataModelObjectPath, isEntitySet), false));
        }
      }
    });
    return aUiHiddenPathExpressions;
  }
  /**
   * This method is used to change the context currently referenced by this binding by removing the last navigation property.
   *
   * It is used (specifically in this case), to transform a binding made for a NavProp context /MainObject/NavProp1/NavProp2,
   * into a binding on the previous context /MainObject/NavProp1.
   *
   * @param source DataFieldForAction | DataFieldForIntentBasedNavigation | CustomAction
   * @param contextDataModelObjectPath DataModelObjectPath
   * @param isEntitySet
   * @returns The binding expression
   */


  function getBindingExpFromContext(source, contextDataModelObjectPath, isEntitySet) {
    var _sExpression;

    var sExpression;

    if ((source === null || source === void 0 ? void 0 : source.$Type) === "com.sap.vocabularies.UI.v1.DataFieldForAction" || (source === null || source === void 0 ? void 0 : source.$Type) === "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation") {
      var _annotations, _annotations$UI;

      sExpression = source === null || source === void 0 ? void 0 : (_annotations = source.annotations) === null || _annotations === void 0 ? void 0 : (_annotations$UI = _annotations.UI) === null || _annotations$UI === void 0 ? void 0 : _annotations$UI.Hidden;
    } else {
      sExpression = source === null || source === void 0 ? void 0 : source.visible;
    }

    var sPath;

    if ((_sExpression = sExpression) !== null && _sExpression !== void 0 && _sExpression.path) {
      sPath = sExpression.path;
    } else {
      sPath = sExpression;
    }

    if (sPath) {
      if (source !== null && source !== void 0 && source.visible) {
        sPath = sPath.substring(1, sPath.length - 1);
      }

      if (sPath.indexOf("/") > 0) {
        var _contextDataModelObje;

        //check if the navigation property is correct:
        var aSplitPath = sPath.split("/");
        var sNavigationPath = aSplitPath[0];

        if ((contextDataModelObjectPath === null || contextDataModelObjectPath === void 0 ? void 0 : (_contextDataModelObje = contextDataModelObjectPath.targetObject) === null || _contextDataModelObje === void 0 ? void 0 : _contextDataModelObje._type) === "NavigationProperty" && contextDataModelObjectPath.targetObject.partner === sNavigationPath) {
          return bindingExpression(aSplitPath.slice(1).join("/"));
        } else {
          return constant(true);
        } // In case there is no navigation property, if it's an entitySet, the expression binding has to be returned:

      } else if (isEntitySet) {
        return bindingExpression(sPath); // otherwise the expression binding cannot be taken into account for the selection mode evaluation:
      } else {
        return constant(true);
      }
    }

    return constant(true);
  }
  /**
   * Loop through the DataFieldForAction and DataFieldForIntentBasedNavigation of a line item and check
   * if at least one of them is always visible in the table toolbar (and requires a context).
   *
   * @param lineItemAnnotation Collection of data fields for representation in a table or list
   * @param currentEntityType Current Entity Type
   * @returns {boolean} `true` if there is at least 1 action that meets the criteria
   */


  function hasBoundActionsAlwaysVisibleInToolBar(lineItemAnnotation, currentEntityType) {
    return lineItemAnnotation.some(function (dataField) {
      var _dataField$Inline2, _dataField$annotation4, _dataField$annotation5, _dataField$annotation6, _dataField$annotation7, _dataField$annotation8, _dataField$annotation9;

      if ((dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForAction" || dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation") && (dataField === null || dataField === void 0 ? void 0 : (_dataField$Inline2 = dataField.Inline) === null || _dataField$Inline2 === void 0 ? void 0 : _dataField$Inline2.valueOf()) !== true && (((_dataField$annotation4 = dataField.annotations) === null || _dataField$annotation4 === void 0 ? void 0 : (_dataField$annotation5 = _dataField$annotation4.UI) === null || _dataField$annotation5 === void 0 ? void 0 : (_dataField$annotation6 = _dataField$annotation5.Hidden) === null || _dataField$annotation6 === void 0 ? void 0 : _dataField$annotation6.valueOf()) === false || ((_dataField$annotation7 = dataField.annotations) === null || _dataField$annotation7 === void 0 ? void 0 : (_dataField$annotation8 = _dataField$annotation7.UI) === null || _dataField$annotation8 === void 0 ? void 0 : (_dataField$annotation9 = _dataField$annotation8.Hidden) === null || _dataField$annotation9 === void 0 ? void 0 : _dataField$annotation9.valueOf()) === undefined)) {
        if (dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForAction") {
          var _dataField$ActionTarg2;

          // Check if the lineItem context is the same as that of the action:
          return (dataField === null || dataField === void 0 ? void 0 : (_dataField$ActionTarg2 = dataField.ActionTarget) === null || _dataField$ActionTarg2 === void 0 ? void 0 : _dataField$ActionTarg2.isBound) && currentEntityType === (dataField === null || dataField === void 0 ? void 0 : dataField.ActionTarget.sourceEntityType);
        } else if (dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation") {
          return dataField.RequiresContext;
        }
      }

      return false;
    });
  }

  function hasCustomActionsAlwaysVisibleInToolBar(manifestActions) {
    return Object.keys(manifestActions).some(function (actionKey) {
      var _action$visible;

      var action = manifestActions[actionKey];

      if (action.requiresSelection && ((_action$visible = action.visible) === null || _action$visible === void 0 ? void 0 : _action$visible.toString()) === "true") {
        return true;
      }

      return false;
    });
  }
  /**
   * Iterates over the custom actions (with key requiresSelection) declared in the manifest for the current line item and returns all the
   * visible key values as an expression.
   *
   * @param manifestActions The actions defined in the manifest
   * @returns Array<Expression<boolean>> All the visible path expressions of the actions that meet the criteria
   */


  function getVisibleExpForCustomActionsRequiringContext(manifestActions) {
    var aVisiblePathExpressions = [];

    if (manifestActions) {
      Object.keys(manifestActions).forEach(function (actionKey) {
        var action = manifestActions[actionKey];

        if (action.requiresSelection === true && action.visible !== undefined) {
          if (typeof action.visible === "string") {
            var _action$visible2;

            /*The final aim would be to check if the path expression depends on the parent context
            and considers only those expressions for the expression evaluation,
            but currently not possible from the manifest as the visible key is bound on the parent entity.
            Tricky to differentiate the path as it's done for the Hidden annotation.
            For the time being we consider all the paths of the manifest*/
            aVisiblePathExpressions.push(resolveBindingString(action === null || action === void 0 ? void 0 : (_action$visible2 = action.visible) === null || _action$visible2 === void 0 ? void 0 : _action$visible2.valueOf()));
          }
        }
      });
    }

    return aVisiblePathExpressions;
  }
  /**
   * Evaluate if the path is statically deletable or updatable.
   *
   * @param converterContext
   * @returns {TableCapabilityRestriction} The table capabilities
   */


  function getCapabilityRestriction(converterContext) {
    var isDeletable = isPathDeletable(converterContext.getDataModelObjectPath());
    var isUpdatable = isPathUpdatable(converterContext.getDataModelObjectPath());
    return {
      isDeletable: !(isConstant(isDeletable) && isDeletable.value === false),
      isUpdatable: !(isConstant(isUpdatable) && isUpdatable.value === false)
    };
  }

  _exports.getCapabilityRestriction = getCapabilityRestriction;

  function getSelectionMode(lineItemAnnotation, visualizationPath, converterContext, isEntitySet, targetCapabilities, isDeleteButtonVisible) {
    var _tableManifestSetting;

    if (!lineItemAnnotation) {
      return SelectionMode.None;
    }

    var tableManifestSettings = converterContext.getManifestControlConfiguration(visualizationPath);
    var selectionMode = (_tableManifestSetting = tableManifestSettings.tableSettings) === null || _tableManifestSetting === void 0 ? void 0 : _tableManifestSetting.selectionMode;
    var aHiddenBindingExpressions = [],
        aVisibleBindingExpressions = [];
    var manifestActions = getActionsFromManifest(converterContext.getManifestControlConfiguration(visualizationPath).actions, converterContext, [], undefined, false);
    var isParentDeletable, parentEntitySetDeletable;

    if (converterContext.getTemplateType() === TemplateType.ObjectPage) {
      isParentDeletable = isPathDeletable(converterContext.getDataModelObjectPath(), undefined);
      parentEntitySetDeletable = isParentDeletable ? compileBinding(isParentDeletable, true) : isParentDeletable;
    }

    if (selectionMode && selectionMode === SelectionMode.None && isDeleteButtonVisible) {
      return compileBinding(ifElse(isDeleteButtonVisible, constant("Multi"), constant("None")));
    }

    if (!selectionMode || selectionMode === SelectionMode.Auto) {
      selectionMode = SelectionMode.Multi;
    }

    if (hasBoundActionsAlwaysVisibleInToolBar(lineItemAnnotation, converterContext.getEntityType()) || hasCustomActionsAlwaysVisibleInToolBar(manifestActions)) {
      return selectionMode;
    }

    aHiddenBindingExpressions = getUIHiddenExpForActionsRequiringContext(lineItemAnnotation, converterContext.getEntityType(), converterContext.getDataModelObjectPath(), isEntitySet);
    aVisibleBindingExpressions = getVisibleExpForCustomActionsRequiringContext(manifestActions); // No action requiring a context:

    if (aHiddenBindingExpressions.length === 0 && aVisibleBindingExpressions.length === 0 && isDeleteButtonVisible) {
      if (!isEntitySet) {
        if (targetCapabilities.isDeletable || parentEntitySetDeletable !== "false") {
          return compileBinding(ifElse(and(equal(bindingExpression("/editMode", "ui"), "Editable"), isDeleteButtonVisible), constant(selectionMode), constant(SelectionMode.None)));
        } else {
          return SelectionMode.None;
        } // EntitySet deletable:

      } else if (targetCapabilities.isDeletable && isDeleteButtonVisible) {
        return compileBinding(ifElse(isDeleteButtonVisible, constant(selectionMode), constant("None"))); // EntitySet not deletable:
      } else {
        return SelectionMode.None;
      } // There are actions requiring a context:

    } else if (!isEntitySet) {
      if (targetCapabilities.isDeletable || parentEntitySetDeletable !== "false") {
        return compileBinding(ifElse(equal(bindingExpression("/editMode", "ui"), "Editable"), constant(selectionMode), ifElse(or.apply(void 0, _toConsumableArray(aHiddenBindingExpressions.concat(aVisibleBindingExpressions))), constant(selectionMode), constant(SelectionMode.None))));
      } else {
        return compileBinding(ifElse(or.apply(void 0, _toConsumableArray(aHiddenBindingExpressions.concat(aVisibleBindingExpressions))), constant(selectionMode), constant(SelectionMode.None)));
      } //EntitySet deletable:

    } else if (targetCapabilities.isDeletable) {
      return SelectionMode.Multi; //EntitySet not deletable:
    } else {
      return compileBinding(ifElse(or.apply(void 0, _toConsumableArray(aHiddenBindingExpressions.concat(aVisibleBindingExpressions))), constant(selectionMode), constant(SelectionMode.None)));
    }
  }
  /**
   * Method to retrieve all table actions from annotations.
   *
   * @param lineItemAnnotation
   * @param visualizationPath
   * @param converterContext
   * @returns {Record<BaseAction, BaseAction>} The table annotation actions
   */


  _exports.getSelectionMode = getSelectionMode;

  function getTableAnnotationActions(lineItemAnnotation, visualizationPath, converterContext) {
    var tableActions = [];
    var hiddenTableActions = [];

    if (lineItemAnnotation) {
      lineItemAnnotation.forEach(function (dataField) {
        var _dataField$annotation10, _dataField$annotation11, _dataField$annotation12, _dataField$annotation13, _dataField$annotation14, _dataField$annotation15, _dataField$annotation16, _dataField$annotation17, _dataField$annotation18, _dataField$annotation19;

        var tableAction;

        if (isDataFieldForActionAbstract(dataField) && !(((_dataField$annotation10 = dataField.annotations) === null || _dataField$annotation10 === void 0 ? void 0 : (_dataField$annotation11 = _dataField$annotation10.UI) === null || _dataField$annotation11 === void 0 ? void 0 : (_dataField$annotation12 = _dataField$annotation11.Hidden) === null || _dataField$annotation12 === void 0 ? void 0 : _dataField$annotation12.valueOf()) === true) && !dataField.Inline && !dataField.Determining) {
          var key = KeyHelper.generateKeyFromDataField(dataField);

          switch (dataField.$Type) {
            case "com.sap.vocabularies.UI.v1.DataFieldForAction":
              tableAction = {
                type: ActionType.DataFieldForAction,
                annotationPath: converterContext.getEntitySetBasedAnnotationPath(dataField.fullyQualifiedName),
                key: key,
                visible: compileBinding(not(equal(annotationExpression((_dataField$annotation13 = dataField.annotations) === null || _dataField$annotation13 === void 0 ? void 0 : (_dataField$annotation14 = _dataField$annotation13.UI) === null || _dataField$annotation14 === void 0 ? void 0 : _dataField$annotation14.Hidden, [], undefined, converterContext.getRelativeModelPathFunction()), true))),
                isNavigable: true
              };
              break;

            case "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":
              tableAction = {
                type: ActionType.DataFieldForIntentBasedNavigation,
                annotationPath: converterContext.getEntitySetBasedAnnotationPath(dataField.fullyQualifiedName),
                key: key,
                visible: compileBinding(not(equal(annotationExpression((_dataField$annotation15 = dataField.annotations) === null || _dataField$annotation15 === void 0 ? void 0 : (_dataField$annotation16 = _dataField$annotation15.UI) === null || _dataField$annotation16 === void 0 ? void 0 : _dataField$annotation16.Hidden, [], undefined, converterContext.getRelativeModelPathFunction()), true)))
              };
              break;

            default:
              break;
          }
        } else if (((_dataField$annotation17 = dataField.annotations) === null || _dataField$annotation17 === void 0 ? void 0 : (_dataField$annotation18 = _dataField$annotation17.UI) === null || _dataField$annotation18 === void 0 ? void 0 : (_dataField$annotation19 = _dataField$annotation18.Hidden) === null || _dataField$annotation19 === void 0 ? void 0 : _dataField$annotation19.valueOf()) === true) {
          hiddenTableActions.push({
            type: ActionType.Default,
            key: KeyHelper.generateKeyFromDataField(dataField)
          });
        }

        if (tableAction) {
          tableActions.push(tableAction);
        }
      });
    }

    return {
      tableActions: tableActions,
      hiddenTableActions: hiddenTableActions
    };
  }

  function getHighlightRowBinding(criticalityAnnotation, isDraftRoot, targetEntityType) {
    var defaultHighlightRowDefinition = MessageType.None;

    if (criticalityAnnotation) {
      if (typeof criticalityAnnotation === "object") {
        defaultHighlightRowDefinition = annotationExpression(criticalityAnnotation);
      } else {
        // Enum Value so we get the corresponding static part
        defaultHighlightRowDefinition = getMessageTypeFromCriticalityType(criticalityAnnotation);
      }
    }

    return ifElse(isDraftRoot && Draft.IsNewObject, MessageType.Information, formatResult([defaultHighlightRowDefinition, bindingExpression("filteredMessages", "internal")], tableFormatters.rowHighlighting, targetEntityType));
  }

  function _getCreationBehaviour(lineItemAnnotation, tableManifestConfiguration, converterContext, navigationSettings) {
    var _newAction2;

    var navigation = (navigationSettings === null || navigationSettings === void 0 ? void 0 : navigationSettings.create) || (navigationSettings === null || navigationSettings === void 0 ? void 0 : navigationSettings.detail); // cross-app

    if (navigation !== null && navigation !== void 0 && navigation.outbound && navigation.outboundDetail && navigationSettings !== null && navigationSettings !== void 0 && navigationSettings.create) {
      return {
        mode: "External",
        outbound: navigation.outbound,
        outboundDetail: navigation.outboundDetail,
        navigationSettings: navigationSettings
      };
    }

    var newAction;

    if (lineItemAnnotation) {
      var _converterContext$get, _targetAnnotations$Co, _targetAnnotations$Co2, _targetAnnotations$Se, _targetAnnotations$Se2;

      // in-app
      var targetAnnotations = (_converterContext$get = converterContext.getEntitySet()) === null || _converterContext$get === void 0 ? void 0 : _converterContext$get.annotations;
      newAction = (targetAnnotations === null || targetAnnotations === void 0 ? void 0 : (_targetAnnotations$Co = targetAnnotations.Common) === null || _targetAnnotations$Co === void 0 ? void 0 : (_targetAnnotations$Co2 = _targetAnnotations$Co.DraftRoot) === null || _targetAnnotations$Co2 === void 0 ? void 0 : _targetAnnotations$Co2.NewAction) || (targetAnnotations === null || targetAnnotations === void 0 ? void 0 : (_targetAnnotations$Se = targetAnnotations.Session) === null || _targetAnnotations$Se === void 0 ? void 0 : (_targetAnnotations$Se2 = _targetAnnotations$Se.StickySessionSupported) === null || _targetAnnotations$Se2 === void 0 ? void 0 : _targetAnnotations$Se2.NewAction); // TODO: Is there really no 'NewAction' on DraftNode? targetAnnotations?.Common?.DraftNode?.NewAction

      if (tableManifestConfiguration.creationMode === CreationMode.CreationRow && newAction) {
        // A combination of 'CreationRow' and 'NewAction' does not make sense
        // TODO: Or does it?
        throw Error("Creation mode '".concat(CreationMode.CreationRow, "' can not be used with a custom 'new' action (").concat(newAction, ")"));
      }

      if (navigation !== null && navigation !== void 0 && navigation.route) {
        var _newAction;

        // route specified
        return {
          mode: tableManifestConfiguration.creationMode,
          append: tableManifestConfiguration.createAtEnd,
          newAction: (_newAction = newAction) === null || _newAction === void 0 ? void 0 : _newAction.toString(),
          navigateToTarget: tableManifestConfiguration.creationMode === CreationMode.NewPage ? navigation.route : undefined // navigate only in NewPage mode

        };
      }
    } // no navigation or no route specified - fallback to inline create if original creation mode was 'NewPage'


    if (tableManifestConfiguration.creationMode === CreationMode.NewPage) {
      tableManifestConfiguration.creationMode = CreationMode.Inline;
    }

    return {
      mode: tableManifestConfiguration.creationMode,
      append: tableManifestConfiguration.createAtEnd,
      newAction: (_newAction2 = newAction) === null || _newAction2 === void 0 ? void 0 : _newAction2.toString()
    };
  }

  var _getRowConfigurationProperty = function (lineItemAnnotation, visualizationPath, converterContext, navigationSettings, targetPath) {
    var pressProperty, navigationTarget;
    var criticalityProperty = MessageType.None;
    var targetEntityType = converterContext.getEntityType();

    if (navigationSettings && lineItemAnnotation) {
      var _navigationSettings$d, _navigationSettings$d2;

      navigationTarget = ((_navigationSettings$d = navigationSettings.display) === null || _navigationSettings$d === void 0 ? void 0 : _navigationSettings$d.target) || ((_navigationSettings$d2 = navigationSettings.detail) === null || _navigationSettings$d2 === void 0 ? void 0 : _navigationSettings$d2.outbound);

      if (navigationTarget) {
        pressProperty = ".handlers.onChevronPressNavigateOutBound( $controller ,'" + navigationTarget + "', ${$parameters>bindingContext})";
      } else if (targetEntityType) {
        var _navigationSettings$d3;

        var targetEntitySet = converterContext.getEntitySet();
        navigationTarget = (_navigationSettings$d3 = navigationSettings.detail) === null || _navigationSettings$d3 === void 0 ? void 0 : _navigationSettings$d3.route;

        if (navigationTarget) {
          var _lineItemAnnotation$a, _lineItemAnnotation$a2, _targetEntitySet$anno, _targetEntitySet$anno2, _targetEntitySet$anno3, _targetEntitySet$anno4, _targetEntitySet$anno5, _targetEntitySet$anno6, _targetEntitySet$anno7, _targetEntitySet$anno8;

          criticalityProperty = getHighlightRowBinding((_lineItemAnnotation$a = lineItemAnnotation.annotations) === null || _lineItemAnnotation$a === void 0 ? void 0 : (_lineItemAnnotation$a2 = _lineItemAnnotation$a.UI) === null || _lineItemAnnotation$a2 === void 0 ? void 0 : _lineItemAnnotation$a2.Criticality, !!(targetEntitySet !== null && targetEntitySet !== void 0 && (_targetEntitySet$anno = targetEntitySet.annotations) !== null && _targetEntitySet$anno !== void 0 && (_targetEntitySet$anno2 = _targetEntitySet$anno.Common) !== null && _targetEntitySet$anno2 !== void 0 && _targetEntitySet$anno2.DraftRoot) || !!(targetEntitySet !== null && targetEntitySet !== void 0 && (_targetEntitySet$anno3 = targetEntitySet.annotations) !== null && _targetEntitySet$anno3 !== void 0 && (_targetEntitySet$anno4 = _targetEntitySet$anno3.Common) !== null && _targetEntitySet$anno4 !== void 0 && _targetEntitySet$anno4.DraftNode), targetEntityType);
          pressProperty = "API.onTableRowPress($event, $controller, ${$parameters>bindingContext}, { callExtension: true, targetPath: '" + targetPath + "', editable : " + (targetEntitySet !== null && targetEntitySet !== void 0 && (_targetEntitySet$anno5 = targetEntitySet.annotations) !== null && _targetEntitySet$anno5 !== void 0 && (_targetEntitySet$anno6 = _targetEntitySet$anno5.Common) !== null && _targetEntitySet$anno6 !== void 0 && _targetEntitySet$anno6.DraftRoot || targetEntitySet !== null && targetEntitySet !== void 0 && (_targetEntitySet$anno7 = targetEntitySet.annotations) !== null && _targetEntitySet$anno7 !== void 0 && (_targetEntitySet$anno8 = _targetEntitySet$anno7.Common) !== null && _targetEntitySet$anno8 !== void 0 && _targetEntitySet$anno8.DraftNode ? "!${$parameters>bindingContext}.getProperty('IsActiveEntity')" : "undefined") + "})"; //Need to access to DraftRoot and DraftNode !!!!!!!
        } else {
          var _lineItemAnnotation$a3, _lineItemAnnotation$a4;

          criticalityProperty = getHighlightRowBinding((_lineItemAnnotation$a3 = lineItemAnnotation.annotations) === null || _lineItemAnnotation$a3 === void 0 ? void 0 : (_lineItemAnnotation$a4 = _lineItemAnnotation$a3.UI) === null || _lineItemAnnotation$a4 === void 0 ? void 0 : _lineItemAnnotation$a4.Criticality, false, targetEntityType);
        }
      }
    }

    var rowNavigatedExpression = formatResult([bindingExpression("/deepestPath", "internal")], tableFormatters.navigatedRow, targetEntityType);
    return {
      press: pressProperty,
      action: pressProperty ? "Navigation" : undefined,
      rowHighlighting: compileBinding(criticalityProperty),
      rowNavigated: compileBinding(rowNavigatedExpression)
    };
  };
  /**
   * Retrieve the columns from the entityType.
   *
   * @param columnsToBeCreated The columns to be created.
   * @param entityType The target entity type.
   * @param annotationColumns The array of columns created based on LineItem annotations.
   * @param nonSortableColumns The array of all non sortable column names.
   * @param converterContext The converter context.
   * @param tableType The table type.
   * @returns {AnnotationTableColumn[]} The column from the entityType
   */


  var getColumnsFromEntityType = function (columnsToBeCreated, entityType) {
    var annotationColumns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var nonSortableColumns = arguments.length > 3 ? arguments[3] : undefined;
    var converterContext = arguments.length > 4 ? arguments[4] : undefined;
    var tableType = arguments.length > 5 ? arguments[5] : undefined;
    var tableColumns = []; // Catch already existing columns - which were added before by LineItem Annotations

    var aggregationHelper = new AggregationHelper(entityType, converterContext);
    entityType.entityProperties.forEach(function (property) {
      // Catch already existing columns - which were added before by LineItem Annotations
      var exists = annotationColumns.some(function (column) {
        return column.name === property.name;
      }); // if target type exists, it is a complex property and should be ignored

      if (!property.targetType && !exists) {
        var relatedPropertiesInfo = collectRelatedProperties(property.name, property, converterContext, true, tableType);
        var relatedPropertyNames = Object.keys(relatedPropertiesInfo.properties);
        var additionalPropertyNames = Object.keys(relatedPropertiesInfo.additionalProperties);
        var columnInfo = getColumnDefinitionFromProperty(property, converterContext.getEntitySetBasedAnnotationPath(property.fullyQualifiedName), property.name, true, true, nonSortableColumns, aggregationHelper, converterContext);
        var semanticKeys = converterContext.getAnnotationsByTerm("Common", "com.sap.vocabularies.Common.v1.SemanticKey", [converterContext.getEntityType()])[0];
        var oColumnDraftIndicator = getDefaultDraftIndicatorForColumn(columnInfo.name, semanticKeys);

        if (Object.keys(oColumnDraftIndicator).length > 0) {
          columnInfo.formatOptions = _objectSpread({}, oColumnDraftIndicator);
        }

        if (relatedPropertyNames.length > 0) {
          columnInfo.propertyInfos = relatedPropertyNames;
          columnInfo.exportSettings = _objectSpread(_objectSpread({}, columnInfo.exportSettings), {}, {
            template: relatedPropertiesInfo.exportSettingsTemplate,
            wrap: relatedPropertiesInfo.exportSettingsWrapping
          }); // Collect information of related columns to be created.

          relatedPropertyNames.forEach(function (name) {
            columnsToBeCreated[name] = relatedPropertiesInfo.properties[name];
          });
        }

        if (additionalPropertyNames.length > 0) {
          columnInfo.additionalPropertyInfos = additionalPropertyNames; // Create columns for additional properties identified for ALP use case.

          additionalPropertyNames.forEach(function (name) {
            // Intentional overwrite as we require only one new PropertyInfo for a related Property.
            columnsToBeCreated[name] = relatedPropertiesInfo.additionalProperties[name];
          });
        }

        tableColumns.push(columnInfo);
      }
    });
    return tableColumns;
  };
  /**
   * Create a column definition from a property.
   * @param {Property} property Entity type property for which the column is created
   * @param {string} fullPropertyPath The full path to the target property
   * @param {string} relativePath The relative path to the target property based on the context
   * @param {boolean} useDataFieldPrefix Should be prefixed with "DataField::", else it will be prefixed with "Property::"
   * @param {boolean} availableForAdaptation Decides whether column should be available for adaptation
   * @param {string[]} nonSortableColumns The array of all non sortable column names
   * @param {AggregationHelper} aggregationHelper The aggregationHelper for the entity
   * @param {ConverterContext} converterContext The converter context
   * @returns {AnnotationTableColumn} The annotation column definition
   */


  _exports.getColumnsFromEntityType = getColumnsFromEntityType;

  var getColumnDefinitionFromProperty = function (property, fullPropertyPath, relativePath, useDataFieldPrefix, availableForAdaptation, nonSortableColumns, aggregationHelper, converterContext) {
    var _property$annotations, _property$annotations2, _property$annotations3, _annotations2, _annotations2$UI, _annotations2$UI$Data, _annotations2$UI$Data2, _annotations2$UI$Data3, _annotations2$UI$Data4;

    var name = useDataFieldPrefix ? relativePath : "Property::" + relativePath;
    var key = (useDataFieldPrefix ? "DataField::" : "Property::") + replaceSpecialChars(relativePath);
    var semanticObjectAnnotationPath = getSemanticObjectPath(converterContext, property);
    var isHidden = ((_property$annotations = property.annotations) === null || _property$annotations === void 0 ? void 0 : (_property$annotations2 = _property$annotations.UI) === null || _property$annotations2 === void 0 ? void 0 : (_property$annotations3 = _property$annotations2.Hidden) === null || _property$annotations3 === void 0 ? void 0 : _property$annotations3.valueOf()) === true;
    var groupPath = property.name ? _sliceAtSlash(property.name, true, false) : undefined;
    var isGroup = groupPath != property.name;
    var isDataPointFakeProperty = name.indexOf("@com.sap.vocabularies.UI.v1.DataPoint") > -1;

    var exportType = _getExportDataType(property.type);

    var sDateInputFormat = property.type === "Edm.Date" ? "YYYY-MM-DD" : undefined;
    var dataType = getDataFieldDataType(property);
    var propertyTypeConfig = !isDataPointFakeProperty ? getTypeConfig(property, dataType) : undefined;
    var oTypeConfig = !isDataPointFakeProperty ? {
      className: property.type || dataType,
      oFormatOptions: propertyTypeConfig.formatOptions,
      oConstraints: propertyTypeConfig.constraints
    } : undefined;
    var exportSettings = isDataPointFakeProperty ? {
      template: getTargetValueOnDataPoint(property)
    } : {
      type: exportType,
      inputFormat: sDateInputFormat,
      scale: property.scale,
      delimiter: property.type === "Edm.Int64" ? true : false,
      trueValue: property.type === "Edm.Boolean" ? "Yes" : undefined,
      falseValue: property.type === "Edm.Boolean" ? "No" : undefined
    };
    return {
      key: key,
      isGroupable: !isDataPointFakeProperty && !isHidden ? aggregationHelper.isPropertyGroupable(property) : false,
      type: ColumnType.Annotation,
      label: _getLabel(property, isGroup),
      groupLabel: isGroup ? _getLabel(property) : null,
      group: isGroup ? groupPath : null,
      annotationPath: fullPropertyPath,
      semanticObjectPath: semanticObjectAnnotationPath,
      // A fake property was created for the TargetValue used on DataPoints, this property should be hidden and non sortable
      availability: !availableForAdaptation || isHidden || isDataPointFakeProperty ? AvailabilityType.Hidden : AvailabilityType.Adaptation,
      name: name,
      relativePath: isDataPointFakeProperty ? ((_annotations2 = property.annotations) === null || _annotations2 === void 0 ? void 0 : (_annotations2$UI = _annotations2.UI) === null || _annotations2$UI === void 0 ? void 0 : (_annotations2$UI$Data = _annotations2$UI.DataFieldDefault) === null || _annotations2$UI$Data === void 0 ? void 0 : (_annotations2$UI$Data2 = _annotations2$UI$Data.Target) === null || _annotations2$UI$Data2 === void 0 ? void 0 : (_annotations2$UI$Data3 = _annotations2$UI$Data2.$target) === null || _annotations2$UI$Data3 === void 0 ? void 0 : (_annotations2$UI$Data4 = _annotations2$UI$Data3.Value) === null || _annotations2$UI$Data4 === void 0 ? void 0 : _annotations2$UI$Data4.path) || property.Value.path : relativePath,
      sortable: !isHidden && nonSortableColumns.indexOf(relativePath) === -1 && !isDataPointFakeProperty,
      isKey: property.isKey,
      isDataPointFakeTargetProperty: isDataPointFakeProperty,
      exportSettings: exportSettings,
      caseSensitive: isFilteringCaseSensitive(converterContext),
      typeConfig: oTypeConfig,
      visualSettings: isDataPointFakeProperty ? {
        widthCalculation: null
      } : undefined
    };
  };
  /**
   * Returns Boolean true for valid columns, false for invalid columns.
   *
   * @param {DataFieldAbstractTypes} dataField Different DataField types defined in the annotations
   * @returns {boolean} True for valid columns, false for invalid columns
   * @private
   */


  var _isValidColumn = function (dataField) {
    switch (dataField.$Type) {
      case "com.sap.vocabularies.UI.v1.DataFieldForAction":
      case "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":
        return !!dataField.Inline;

      case "com.sap.vocabularies.UI.v1.DataFieldWithAction":
      case "com.sap.vocabularies.UI.v1.DataFieldWithIntentBasedNavigation":
        return false;

      case "com.sap.vocabularies.UI.v1.DataField":
      case "com.sap.vocabularies.UI.v1.DataFieldWithUrl":
      case "com.sap.vocabularies.UI.v1.DataFieldForAnnotation":
      case "com.sap.vocabularies.UI.v1.DataFieldWithNavigationPath":
        return true;

      default: // Todo: Replace with proper Log statement once available
      //  throw new Error("Unhandled DataField Abstract type: " + dataField.$Type);

    }
  };
  /**
   * Returns the binding expression to evaluate the visibility of a DataField or DataPoint annotation.
   *
   * SAP Fiori elements will evaluate either the UI.Hidden annotation defined on the annotation itself or on the target property.
   *
   * @param {DataModelObjectPath} dataFieldModelPath The metapath referring to the annotation that is evaluated by SAP Fiori elements.
   * @param {FieldFormatOptions} [formatOptions] FormatOptions is optional, used to check if the analytic table has GroupHeader expanded.
   * @param {boolean} [returnExpression] ReturnExpression optional.
   * @returns {BindingExpression<string>} An expression that you can bind to the UI.
   */


  var _getVisibleExpression = function (dataFieldModelPath, formatOptions, returnExpression) {
    var _targetObject$Target, _targetObject$Target$, _targetObject$annotat, _targetObject$annotat2, _propertyValue$annota, _propertyValue$annota2;

    var targetObject = dataFieldModelPath.targetObject;
    var propertyValue;

    if (targetObject) {
      switch (targetObject.$Type) {
        case "com.sap.vocabularies.UI.v1.DataField":
        case "com.sap.vocabularies.UI.v1.DataFieldWithUrl":
        case "com.sap.vocabularies.UI.v1.DataFieldWithNavigationPath":
        case "com.sap.vocabularies.UI.v1.DataFieldWithIntentBasedNavigation":
        case "com.sap.vocabularies.UI.v1.DataFieldWithAction":
        case "com.sap.vocabularies.UI.v1.DataPointType":
          propertyValue = targetObject.Value.$target;
          break;

        case "com.sap.vocabularies.UI.v1.DataFieldForAnnotation":
          // if it is a DataFieldForAnnotation pointing to a DataPoint we look at the dataPoint's value
          if ((targetObject === null || targetObject === void 0 ? void 0 : (_targetObject$Target = targetObject.Target) === null || _targetObject$Target === void 0 ? void 0 : (_targetObject$Target$ = _targetObject$Target.$target) === null || _targetObject$Target$ === void 0 ? void 0 : _targetObject$Target$.$Type) === "com.sap.vocabularies.UI.v1.DataPointType") {
            var _targetObject$Target$2;

            propertyValue = (_targetObject$Target$2 = targetObject.Target.$target) === null || _targetObject$Target$2 === void 0 ? void 0 : _targetObject$Target$2.Value.$target;
          }

          break;

        case "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":
        case "com.sap.vocabularies.UI.v1.DataFieldForAction":
        default:
          propertyValue = undefined;
      }
    }

    var isAnalyticalGroupHeaderExpanded = formatOptions !== null && formatOptions !== void 0 && formatOptions.isAnalytics ? UI.IsExpanded : constant(false);
    var isAnalyticalLeaf = formatOptions !== null && formatOptions !== void 0 && formatOptions.isAnalytics ? equal(UI.NodeLevel, 0) : constant(false); // A data field is visible if:
    // - the UI.Hidden expression in the original annotation does not evaluate to 'true'
    // - the UI.Hidden expression in the target property does not evaluate to 'true'
    // - in case of Analytics it's not visible for an expanded GroupHeader

    var expression = and.apply(void 0, [not(equal(annotationExpression(targetObject === null || targetObject === void 0 ? void 0 : (_targetObject$annotat = targetObject.annotations) === null || _targetObject$annotat === void 0 ? void 0 : (_targetObject$annotat2 = _targetObject$annotat.UI) === null || _targetObject$annotat2 === void 0 ? void 0 : _targetObject$annotat2.Hidden), true)), ifElse(!!propertyValue, propertyValue && not(equal(annotationExpression((_propertyValue$annota = propertyValue.annotations) === null || _propertyValue$annota === void 0 ? void 0 : (_propertyValue$annota2 = _propertyValue$annota.UI) === null || _propertyValue$annota2 === void 0 ? void 0 : _propertyValue$annota2.Hidden), true)), true), or(not(isAnalyticalGroupHeaderExpanded), isAnalyticalLeaf)]);
    return returnExpression ? expression : compileBinding(expression);
  };
  /**
   * Returns hidden binding expressions for a field group.
   * @param {DataFieldAbstractTypes} dataFieldGroup DataField defined in the annotations
   * @param {FieldFormatOptions} [fieldFormatOptions] FormatOptions is optional, used to check if the analytic table has GroupHeader expanded.
   * @returns {BindingExpression<string>} Compile binding of field group expressions.
   * @private
   */


  _exports._getVisibleExpression = _getVisibleExpression;

  var _getFieldGroupHiddenExpressions = function (dataFieldGroup, fieldFormatOptions) {
    var _dataFieldGroup$Targe, _dataFieldGroup$Targe2;

    var aFieldGroupHiddenExpressions = [];

    if (dataFieldGroup.$Type === "com.sap.vocabularies.UI.v1.DataFieldForAnnotation" && ((_dataFieldGroup$Targe = dataFieldGroup.Target) === null || _dataFieldGroup$Targe === void 0 ? void 0 : (_dataFieldGroup$Targe2 = _dataFieldGroup$Targe.$target) === null || _dataFieldGroup$Targe2 === void 0 ? void 0 : _dataFieldGroup$Targe2.$Type) === "com.sap.vocabularies.UI.v1.FieldGroupType") {
      var _dataFieldGroup$Targe3;

      (_dataFieldGroup$Targe3 = dataFieldGroup.Target.$target.Data) === null || _dataFieldGroup$Targe3 === void 0 ? void 0 : _dataFieldGroup$Targe3.forEach(function (innerDataField) {
        aFieldGroupHiddenExpressions.push(_getVisibleExpression({
          targetObject: innerDataField
        }, fieldFormatOptions, true));
      });
      return compileBinding(ifElse(or.apply(void 0, _toConsumableArray(aFieldGroupHiddenExpressions)), constant(true), constant(false)));
    }
  };
  /**
   * Returns the label for the property and dataField.
   * @param {DataFieldAbstractTypes | Property} [property] Property or DataField defined in the annotations
   * @param isGroup
   * @returns {string} Label of the property or DataField
   * @private
   */


  var _getLabel = function (property) {
    var isGroup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (!property) {
      return undefined;
    }

    if (isProperty(property)) {
      var _property$annotations4, _property$annotations5, _dataFieldDefault$Lab, _property$annotations6, _property$annotations7;

      var dataFieldDefault = (_property$annotations4 = property.annotations) === null || _property$annotations4 === void 0 ? void 0 : (_property$annotations5 = _property$annotations4.UI) === null || _property$annotations5 === void 0 ? void 0 : _property$annotations5.DataFieldDefault;

      if (dataFieldDefault && !dataFieldDefault.qualifier && (_dataFieldDefault$Lab = dataFieldDefault.Label) !== null && _dataFieldDefault$Lab !== void 0 && _dataFieldDefault$Lab.valueOf()) {
        var _dataFieldDefault$Lab2;

        return compileBinding(annotationExpression((_dataFieldDefault$Lab2 = dataFieldDefault.Label) === null || _dataFieldDefault$Lab2 === void 0 ? void 0 : _dataFieldDefault$Lab2.valueOf()));
      }

      return compileBinding(annotationExpression(((_property$annotations6 = property.annotations.Common) === null || _property$annotations6 === void 0 ? void 0 : (_property$annotations7 = _property$annotations6.Label) === null || _property$annotations7 === void 0 ? void 0 : _property$annotations7.valueOf()) || property.name));
    } else if (isDataFieldTypes(property)) {
      var _property$Label2, _property$Value, _property$Value$$targ, _property$Value$$targ2, _property$Value$$targ3, _property$Value$$targ4, _property$Value2, _property$Value2$$tar;

      if (!!isGroup && property.$Type === "com.sap.vocabularies.UI.v1.DataFieldWithIntentBasedNavigation") {
        var _property$Label;

        return compileBinding(annotationExpression((_property$Label = property.Label) === null || _property$Label === void 0 ? void 0 : _property$Label.valueOf()));
      }

      return compileBinding(annotationExpression(((_property$Label2 = property.Label) === null || _property$Label2 === void 0 ? void 0 : _property$Label2.valueOf()) || ((_property$Value = property.Value) === null || _property$Value === void 0 ? void 0 : (_property$Value$$targ = _property$Value.$target) === null || _property$Value$$targ === void 0 ? void 0 : (_property$Value$$targ2 = _property$Value$$targ.annotations) === null || _property$Value$$targ2 === void 0 ? void 0 : (_property$Value$$targ3 = _property$Value$$targ2.Common) === null || _property$Value$$targ3 === void 0 ? void 0 : (_property$Value$$targ4 = _property$Value$$targ3.Label) === null || _property$Value$$targ4 === void 0 ? void 0 : _property$Value$$targ4.valueOf()) || ((_property$Value2 = property.Value) === null || _property$Value2 === void 0 ? void 0 : (_property$Value2$$tar = _property$Value2.$target) === null || _property$Value2$$tar === void 0 ? void 0 : _property$Value2$$tar.name)));
    } else if (property.$Type === "com.sap.vocabularies.UI.v1.DataFieldForAnnotation") {
      var _property$Label3, _property$Target, _property$Target$$tar, _property$Target$$tar2, _property$Target$$tar3, _property$Target$$tar4, _property$Target$$tar5, _property$Target$$tar6;

      return compileBinding(annotationExpression(((_property$Label3 = property.Label) === null || _property$Label3 === void 0 ? void 0 : _property$Label3.valueOf()) || ((_property$Target = property.Target) === null || _property$Target === void 0 ? void 0 : (_property$Target$$tar = _property$Target.$target) === null || _property$Target$$tar === void 0 ? void 0 : (_property$Target$$tar2 = _property$Target$$tar.Value) === null || _property$Target$$tar2 === void 0 ? void 0 : (_property$Target$$tar3 = _property$Target$$tar2.$target) === null || _property$Target$$tar3 === void 0 ? void 0 : (_property$Target$$tar4 = _property$Target$$tar3.annotations) === null || _property$Target$$tar4 === void 0 ? void 0 : (_property$Target$$tar5 = _property$Target$$tar4.Common) === null || _property$Target$$tar5 === void 0 ? void 0 : (_property$Target$$tar6 = _property$Target$$tar5.Label) === null || _property$Target$$tar6 === void 0 ? void 0 : _property$Target$$tar6.valueOf())));
    } else {
      var _property$Label4;

      return compileBinding(annotationExpression((_property$Label4 = property.Label) === null || _property$Label4 === void 0 ? void 0 : _property$Label4.valueOf()));
    }
  };
  /**
   * Creates a PropertyInfo for each identified property consumed by a LineItem.
   *
   * @param {Record<string, Property>} columnsToBeCreated Identified properties.
   * @param existingColumns The list of columns created for LineItems and Properties of entityType.
   * @param nonSortableColumns The array of column names which cannot be sorted.
   * @param converterContext The converter context.
   * @param entityType The entity type for the LineItem
   * @returns {AnnotationTableColumn[]} The array of columns created.
   */


  var _createRelatedColumns = function (columnsToBeCreated, existingColumns, nonSortableColumns, converterContext, entityType) {
    var relatedColumns = [];
    var relatedPropertyNameMap = {};
    var aggregationHelper = new AggregationHelper(entityType, converterContext);
    Object.keys(columnsToBeCreated).forEach(function (name) {
      var property = columnsToBeCreated[name],
          annotationPath = converterContext.getAbsoluteAnnotationPath(name),
          // Check whether the related column already exists.
      relatedColumn = existingColumns.find(function (column) {
        return column.name === name;
      });

      if (relatedColumn === undefined) {
        // Case 1: Key contains DataField prefix to ensure all property columns have the same key format.
        // New created property column is set to hidden.
        relatedColumns.push(getColumnDefinitionFromProperty(property, annotationPath, name, true, false, nonSortableColumns, aggregationHelper, converterContext));
      } else if (relatedColumn.annotationPath !== annotationPath || relatedColumn.propertyInfos && relatedColumn.propertyInfos.indexOf(name) !== -1) {
        // Case 2: The existing column points to a LineItem (or)
        // Case 3: This is a self reference from an existing column and
        // both cases require a dummy PropertyInfo for setting correct export settings.
        var newName = "Property::" + name; // Checking whether the related property column has already been created in a previous iteration.

        if (!existingColumns.some(function (column) {
          return column.name === newName;
        })) {
          // Create a new property column with 'Property::' prefix,
          // Set it to hidden as it is only consumed by Complex property infos.
          relatedColumns.push(getColumnDefinitionFromProperty(property, annotationPath, name, false, false, nonSortableColumns, aggregationHelper, converterContext));
          relatedPropertyNameMap[name] = newName;
        }
      }
    }); // The property 'name' has been prefixed with 'Property::' for uniqueness.
    // Update the same in other propertyInfos[] references which point to this property.

    existingColumns.forEach(function (column) {
      var _column$propertyInfos, _column$additionalPro;

      column.propertyInfos = (_column$propertyInfos = column.propertyInfos) === null || _column$propertyInfos === void 0 ? void 0 : _column$propertyInfos.map(function (propertyInfo) {
        var _relatedPropertyNameM;

        return (_relatedPropertyNameM = relatedPropertyNameMap[propertyInfo]) !== null && _relatedPropertyNameM !== void 0 ? _relatedPropertyNameM : propertyInfo;
      });
      column.additionalPropertyInfos = (_column$additionalPro = column.additionalPropertyInfos) === null || _column$additionalPro === void 0 ? void 0 : _column$additionalPro.map(function (propertyInfo) {
        var _relatedPropertyNameM2;

        return (_relatedPropertyNameM2 = relatedPropertyNameMap[propertyInfo]) !== null && _relatedPropertyNameM2 !== void 0 ? _relatedPropertyNameM2 : propertyInfo;
      });
    });
    return relatedColumns;
  };
  /**
   * Getting the Column Name
   * If it points to a DataField with one property or DataPoint with one property, it will use the property name
   * here to be consistent with the existing flex changes.
   *
   * @param {DataFieldAbstractTypes} dataField Different DataField types defined in the annotations
   * @returns {string} The name of annotation columns
   * @private
   */


  var _getAnnotationColumnName = function (dataField) {
    var _dataField$Target, _dataField$Target$$ta, _dataField$Target$$ta2;

    // This is needed as we have flexibility changes already that we have to check against
    if (isDataFieldTypes(dataField)) {
      var _dataField$Value;

      return (_dataField$Value = dataField.Value) === null || _dataField$Value === void 0 ? void 0 : _dataField$Value.path;
    } else if (dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForAnnotation" && (_dataField$Target = dataField.Target) !== null && _dataField$Target !== void 0 && (_dataField$Target$$ta = _dataField$Target.$target) !== null && _dataField$Target$$ta !== void 0 && (_dataField$Target$$ta2 = _dataField$Target$$ta.Value) !== null && _dataField$Target$$ta2 !== void 0 && _dataField$Target$$ta2.path) {
      var _dataField$Target2, _dataField$Target2$$t;

      // This is for removing duplicate properties. For example, 'Progress' Property is removed if it is already defined as a DataPoint
      return (_dataField$Target2 = dataField.Target) === null || _dataField$Target2 === void 0 ? void 0 : (_dataField$Target2$$t = _dataField$Target2.$target) === null || _dataField$Target2$$t === void 0 ? void 0 : _dataField$Target2$$t.Value.path;
    } else {
      return KeyHelper.generateKeyFromDataField(dataField);
    }
  };
  /**
   * Determines if the data field labels have to be displayed in the table.
   * @param {string} fieldGroupName The `DataField` name being processed.
   * @param {string} visualizationPath
   * @param {ConverterContext} converterContext
   * @returns {boolean} `showDataFieldsLabel` value from the manifest
   * @private
   */


  var _getShowDataFieldsLabel = function (fieldGroupName, visualizationPath, converterContext) {
    var _converterContext$get2;

    var oColumns = (_converterContext$get2 = converterContext.getManifestControlConfiguration(visualizationPath)) === null || _converterContext$get2 === void 0 ? void 0 : _converterContext$get2.columns;
    var aColumnKeys = oColumns && Object.keys(oColumns);
    return aColumnKeys && !!aColumnKeys.find(function (key) {
      return key === fieldGroupName && oColumns[key].showDataFieldsLabel;
    });
  };
  /**
   * Determines the relative path of the property with respect to the root entity.
   * @param dataField The `DataField` being processed.
   * @returns {string} The relative path
   */


  var _getRelativePath = function (dataField) {
    var _Value, _Target;

    var relativePath = "";

    switch (dataField.$Type) {
      case "com.sap.vocabularies.UI.v1.DataField":
      case "com.sap.vocabularies.UI.v1.DataFieldWithNavigationPath":
      case "com.sap.vocabularies.UI.v1.DataFieldWithUrl":
        relativePath = dataField === null || dataField === void 0 ? void 0 : (_Value = dataField.Value) === null || _Value === void 0 ? void 0 : _Value.path;
        break;

      case "com.sap.vocabularies.UI.v1.DataFieldForAnnotation":
        relativePath = dataField === null || dataField === void 0 ? void 0 : (_Target = dataField.Target) === null || _Target === void 0 ? void 0 : _Target.value;
        break;

      case "com.sap.vocabularies.UI.v1.DataFieldForAction":
      case "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":
        relativePath = KeyHelper.generateKeyFromDataField(dataField);
        break;
    }

    return relativePath;
  };

  var _sliceAtSlash = function (path, isLastSlash, isLastPart) {
    var iSlashIndex = isLastSlash ? path.lastIndexOf("/") : path.indexOf("/");

    if (iSlashIndex === -1) {
      return path;
    }

    return isLastPart ? path.substring(iSlashIndex + 1, path.length) : path.substring(0, iSlashIndex);
  };
  /**
   * Determine whether a column is sortable.
   *
   * @param dataField The data field being processed
   * @param propertyPath The property path
   * @param nonSortableColumns Collection of non-sortable column names as per annotation
   * @returns {boolean} True if the column is sortable
   */


  var _isColumnSortable = function (dataField, propertyPath, nonSortableColumns) {
    var isSortable = false;

    if (nonSortableColumns.indexOf(propertyPath) === -1) {
      // Column is not marked as non-sortable via annotation
      switch (dataField.$Type) {
        case "com.sap.vocabularies.UI.v1.DataField":
        case "com.sap.vocabularies.UI.v1.DataFieldWithUrl":
          isSortable = true;
          break;

        case "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":
        case "com.sap.vocabularies.UI.v1.DataFieldForAction":
          // Action columns are not sortable
          isSortable = false;
          break;
      }
    }

    return isSortable;
  };
  /**
   * Returns whether filtering on the table is case sensitive.
   *
   * @param {ConverterContext} converterContext The instance of the converter context
   * @returns {boolean} Returns 'false' if FilterFunctions annotation supports 'tolower', else 'true'
   */


  var isFilteringCaseSensitive = function (converterContext) {
    var _converterContext$get3, _converterContext$get4, _converterContext$get5, _converterContext$get6, _converterContext$get7;

    var filterFunctions = ((_converterContext$get3 = converterContext.getEntitySet()) === null || _converterContext$get3 === void 0 ? void 0 : (_converterContext$get4 = _converterContext$get3.annotations) === null || _converterContext$get4 === void 0 ? void 0 : (_converterContext$get5 = _converterContext$get4.Capabilities) === null || _converterContext$get5 === void 0 ? void 0 : _converterContext$get5.FilterFunctions) || ((_converterContext$get6 = converterContext.getEntityContainer().annotations) === null || _converterContext$get6 === void 0 ? void 0 : (_converterContext$get7 = _converterContext$get6.Capabilities) === null || _converterContext$get7 === void 0 ? void 0 : _converterContext$get7.FilterFunctions);
    return Array.isArray(filterFunctions) ? filterFunctions.indexOf("tolower") === -1 : true;
  };
  /**
   * Returns default format options for text fields in a table.
   *
   * @returns {FormatOptionsType} Collection of format options with default values
   */


  _exports.isFilteringCaseSensitive = isFilteringCaseSensitive;

  function getDefaultFormatOptionsForTable() {
    return {
      textLinesEdit: 4
    };
  }
  /**
   * Returns default format options with draftIndicator for a column.
   * @param name
   * @param semanticKeys
   * @returns {FormatOptionsType} Collection of format options with default values
   */


  function getDefaultDraftIndicatorForColumn(name, semanticKeys) {
    var bSemanticKeyFound = false;
    var aSemanticKeyValues = [];

    if (!semanticKeys) {
      return {};
    }

    for (var i = 0; i < semanticKeys.length; i++) {
      aSemanticKeyValues.push(semanticKeys[i].value);

      if (semanticKeys[i].value === name) {
        bSemanticKeyFound = true;
      }
    }

    if (bSemanticKeyFound) {
      return {
        hasDraftIndicator: true,
        semantickeys: aSemanticKeyValues
      };
    } else {
      return {};
    }
  }
  /**
   * Returns line items from metadata annotations.
   *
   * @param {LineItem} lineItemAnnotation Collection of data fields with their annotations
   * @param {string} visualizationPath The visualization path
   * @param {ConverterContext} converterContext The converter context
   * @returns {TableColumn[]} The columns from the annotations
   */


  var getColumnsFromAnnotations = function (lineItemAnnotation, visualizationPath, converterContext) {
    var _tableManifestSetting2;

    var entityType = converterContext.getAnnotationEntityType(lineItemAnnotation),
        annotationColumns = [],
        columnsToBeCreated = {},
        nonSortableColumns = getNonSortablePropertiesRestrictions(converterContext.getEntitySet()),
        tableManifestSettings = converterContext.getManifestControlConfiguration(visualizationPath),
        tableType = (tableManifestSettings === null || tableManifestSettings === void 0 ? void 0 : (_tableManifestSetting2 = tableManifestSettings.tableSettings) === null || _tableManifestSetting2 === void 0 ? void 0 : _tableManifestSetting2.type) || "ResponsiveTable";
    var semanticKeys = converterContext.getAnnotationsByTerm("Common", "com.sap.vocabularies.Common.v1.SemanticKey", [converterContext.getEntityType()])[0];

    if (lineItemAnnotation) {
      // Get columns from the LineItem Annotation
      lineItemAnnotation.forEach(function (lineItem) {
        var _lineItem$Value, _lineItem$Value$$targ, _Target2, _Target2$$target, _lineItem$Target, _lineItem$Target$$tar, _lineItem$annotations, _lineItem$annotations2, _lineItem$annotations3;

        if (!_isValidColumn(lineItem)) {
          return;
        }

        var semanticObjectAnnotationPath = isDataFieldTypes(lineItem) && (_lineItem$Value = lineItem.Value) !== null && _lineItem$Value !== void 0 && (_lineItem$Value$$targ = _lineItem$Value.$target) !== null && _lineItem$Value$$targ !== void 0 && _lineItem$Value$$targ.fullyQualifiedName ? getSemanticObjectPath(converterContext, lineItem) : undefined;

        var relativePath = _getRelativePath(lineItem); // Determine properties which are consumed by this LineItem.


        var relatedPropertiesInfo = collectRelatedPropertiesRecursively(lineItem, converterContext, tableType);
        var relatedPropertyNames = Object.keys(relatedPropertiesInfo.properties);
        var additionalPropertyNames = Object.keys(relatedPropertiesInfo.additionalProperties);

        var groupPath = _sliceAtSlash(relativePath, true, false);

        var isGroup = groupPath != relativePath;

        var sLabel = _getLabel(lineItem, isGroup);

        var name = _getAnnotationColumnName(lineItem);

        var isFieldGroupColumn = groupPath.indexOf("@com.sap.vocabularies.UI.v1.FieldGroup") > -1;
        var showDataFieldsLabel = isFieldGroupColumn && (lineItem === null || lineItem === void 0 ? void 0 : (_Target2 = lineItem.Target) === null || _Target2 === void 0 ? void 0 : (_Target2$$target = _Target2.$target) === null || _Target2$$target === void 0 ? void 0 : _Target2$$target.Data.length) > 1 ? _getShowDataFieldsLabel(name, visualizationPath, converterContext) : false;
        var dataType = getDataFieldDataType(lineItem);
        var sDateInputFormat = dataType === "Edm.Date" ? "YYYY-MM-DD" : undefined;

        var formatOptions = _objectSpread(_objectSpread({}, getDefaultFormatOptionsForTable()), getDefaultDraftIndicatorForColumn(name, semanticKeys));

        var fieldGroupHiddenExpressions;

        if (lineItem.$Type === "com.sap.vocabularies.UI.v1.DataFieldForAnnotation" && ((_lineItem$Target = lineItem.Target) === null || _lineItem$Target === void 0 ? void 0 : (_lineItem$Target$$tar = _lineItem$Target.$target) === null || _lineItem$Target$$tar === void 0 ? void 0 : _lineItem$Target$$tar.$Type) === "com.sap.vocabularies.UI.v1.FieldGroupType") {
          fieldGroupHiddenExpressions = _getFieldGroupHiddenExpressions(lineItem, formatOptions);
        }

        var exportSettings = {
          template: relatedPropertiesInfo.exportSettingsTemplate,
          wrap: relatedPropertiesInfo.exportSettingsWrapping,
          type: dataType ? _getExportDataType(dataType, relatedPropertyNames.length > 1) : undefined,
          inputFormat: sDateInputFormat,
          delimiter: dataType === "Edm.Int64" ? true : false,
          trueValue: dataType === "Edm.Boolean" ? "Yes" : undefined,
          falseValue: dataType === "Edm.Boolean" ? "No" : undefined
        };
        var propertyTypeConfig = dataType && getTypeConfig(lineItem, dataType);
        var oTypeConfig = propertyTypeConfig ? {
          className: dataType,
          oFormatOptions: _objectSpread(_objectSpread({}, formatOptions), propertyTypeConfig.formatOptions),
          oConstraints: propertyTypeConfig.constraints
        } : undefined;
        var visualSettings = {};

        if (relatedPropertiesInfo.visualSettingsToBeExcluded) {
          // In case of text arrangement annotation with display mode as text only, exclude text property from the width calculation
          visualSettings = {
            widthCalculation: {
              excludeProperties: "Property::" + relatedPropertiesInfo.visualSettingsToBeExcluded
            }
          };
        } else if (!dataType || !oTypeConfig) {
          // for charts
          visualSettings.widthCalculation = null;
        }

        annotationColumns.push({
          key: KeyHelper.generateKeyFromDataField(lineItem),
          type: ColumnType.Annotation,
          label: sLabel,
          groupLabel: isGroup ? _getLabel(lineItem) : null,
          group: isGroup ? groupPath : null,
          FieldGroupHiddenExpressions: fieldGroupHiddenExpressions,
          annotationPath: converterContext.getEntitySetBasedAnnotationPath(lineItem.fullyQualifiedName),
          semanticObjectPath: semanticObjectAnnotationPath,
          availability: isDataFieldAlwaysHidden(lineItem) ? AvailabilityType.Hidden : AvailabilityType.Default,
          name: name,
          showDataFieldsLabel: showDataFieldsLabel,
          relativePath: relativePath,
          sortable: _isColumnSortable(lineItem, relativePath, nonSortableColumns),
          propertyInfos: relatedPropertyNames.length > 0 ? relatedPropertyNames : undefined,
          additionalPropertyInfos: additionalPropertyNames.length > 0 ? additionalPropertyNames : undefined,
          exportSettings: exportSettings,
          width: ((_lineItem$annotations = lineItem.annotations) === null || _lineItem$annotations === void 0 ? void 0 : (_lineItem$annotations2 = _lineItem$annotations.HTML5) === null || _lineItem$annotations2 === void 0 ? void 0 : (_lineItem$annotations3 = _lineItem$annotations2.CssDefaults) === null || _lineItem$annotations3 === void 0 ? void 0 : _lineItem$annotations3.width) || undefined,
          isNavigable: true,
          formatOptions: formatOptions,
          exportContactProperty: relatedPropertiesInfo.exportSettingsContactProperty,
          caseSensitive: isFilteringCaseSensitive(converterContext),
          typeConfig: oTypeConfig,
          visualSettings: visualSettings
        }); // Collect information of related columns to be created.

        relatedPropertyNames.forEach(function (name) {
          columnsToBeCreated[name] = relatedPropertiesInfo.properties[name];
        }); // Create columns for additional properties identified for ALP use case.

        additionalPropertyNames.forEach(function (name) {
          // Intentional overwrite as we require only one new PropertyInfo for a related Property.
          columnsToBeCreated[name] = relatedPropertiesInfo.additionalProperties[name];
        });
      });
    } // Get columns from the Properties of EntityType


    var tableColumns = getColumnsFromEntityType(columnsToBeCreated, entityType, annotationColumns, nonSortableColumns, converterContext, tableType);
    tableColumns = tableColumns.concat(annotationColumns); // Create a propertyInfo for each related property.

    var relatedColumns = _createRelatedColumns(columnsToBeCreated, tableColumns, nonSortableColumns, converterContext, entityType);

    tableColumns = tableColumns.concat(relatedColumns);
    return tableColumns;
  };
  /**
   * Gets the property names from the manifest and checks against existing properties already added by annotations.
   * If a not yet stored property is found it adds it for sorting and filtering only to the annotationColumns.
   * @param {string[] | undefined} properties
   * @param {AnnotationTableColumn[]} annotationColumns
   * @param {ConverterContext} converterContext
   * @param entityType
   * @returns {string[]} The columns from the annotations
   */


  var _getPropertyNames = function (properties, annotationColumns, converterContext, entityType) {
    var matchedProperties;

    if (properties) {
      matchedProperties = properties.map(function (propertyPath) {
        var annotationColumn = annotationColumns.find(function (annotationColumn) {
          return annotationColumn.relativePath === propertyPath && annotationColumn.propertyInfos === undefined;
        });

        if (annotationColumn) {
          return annotationColumn.name;
        } else {
          var relatedColumns = _createRelatedColumns(_defineProperty({}, propertyPath, entityType.resolvePath(propertyPath)), annotationColumns, [], converterContext, entityType);

          annotationColumns.push(relatedColumns[0]);
          return relatedColumns[0].name;
        }
      });
    }

    return matchedProperties;
  };

  var _appendCustomTemplate = function (properties) {
    return properties.map(function (property) {
      return "{".concat(properties.indexOf(property), "}");
    }).join("\n");
  };
  /**
   * Retrieves the table column property value based on certain conditions.
   *
   * Manifest defined property value for custom / annotation columns
   * Default property value for custom column if not overwritten in manifest.
   *
   * @param {any} property The column property defined in the manifest
   * @param {any} defaultValue The default value of the property
   * @param {boolean} isAnnotationColumn Whether the column, defined in manifest, corresponds to an existing annotation column.
   * @returns {any} Determined property value for the column
   */


  var _getManifestOrDefaultValue = function (property, defaultValue, isAnnotationColumn) {
    if (property === undefined) {
      // If annotation column has no property defined in manifest,
      // do not overwrite it with manifest column's default value.
      return isAnnotationColumn ? undefined : defaultValue;
    } // Return what is defined in manifest.


    return property;
  };
  /**
   * Returns table column definitions from manifest.
   * @param columns
   * @param annotationColumns
   * @param converterContext
   * @param entityType
   * @param navigationSettings
   * @returns {Record<string, CustomColumn>} The columns from the manifest
   */


  var getColumnsFromManifest = function (columns, annotationColumns, converterContext, entityType, navigationSettings) {
    var internalColumns = {};

    var _loop = function (key) {
      var _manifestColumn$posit;

      var manifestColumn = columns[key]; // To identify the annotation column property overwrite via manifest use-case.

      var isAnnotationColumn = annotationColumns.some(function (column) {
        return column.key === key;
      });
      KeyHelper.validateKey(key);

      var propertyInfos = _getPropertyNames(manifestColumn.properties, annotationColumns, converterContext, entityType);

      internalColumns[key] = {
        key: key,
        id: "CustomColumn::" + key,
        name: "CustomColumn::" + key,
        header: manifestColumn.header,
        width: manifestColumn.width || undefined,
        horizontalAlign: _getManifestOrDefaultValue(manifestColumn === null || manifestColumn === void 0 ? void 0 : manifestColumn.horizontalAlign, HorizontalAlign.Begin, isAnnotationColumn),
        type: manifestColumn.type === "Slot" ? ColumnType.Slot : ColumnType.Default,
        availability: _getManifestOrDefaultValue(manifestColumn === null || manifestColumn === void 0 ? void 0 : manifestColumn.availability, AvailabilityType.Default, isAnnotationColumn),
        template: manifestColumn.template || "undefined",
        position: {
          anchor: (_manifestColumn$posit = manifestColumn.position) === null || _manifestColumn$posit === void 0 ? void 0 : _manifestColumn$posit.anchor,
          placement: manifestColumn.position === undefined ? Placement.After : manifestColumn.position.placement
        },
        isNavigable: isAnnotationColumn ? undefined : isActionNavigable(manifestColumn, navigationSettings, true),
        settings: manifestColumn.settings,
        sortable: false,
        propertyInfos: propertyInfos,
        formatOptions: _objectSpread(_objectSpread({}, getDefaultFormatOptionsForTable()), manifestColumn.formatOptions),
        exportSettings: {
          template: propertyInfos ? _appendCustomTemplate(propertyInfos) : undefined,
          fieldLabel: propertyInfos ? manifestColumn.header : undefined,
          wrap: propertyInfos && propertyInfos.length > 1 ? true : false
        },
        caseSensitive: isFilteringCaseSensitive(converterContext)
      };
    };

    for (var key in columns) {
      _loop(key);
    }

    return internalColumns;
  };

  function getP13nMode(visualizationPath, converterContext, tableManifestConfiguration) {
    var _tableManifestSetting3;

    var manifestWrapper = converterContext.getManifestWrapper();
    var tableManifestSettings = converterContext.getManifestControlConfiguration(visualizationPath);
    var variantManagement = manifestWrapper.getVariantManagement();
    var aPersonalization = [];
    var bAnalyticalTable = tableManifestConfiguration.type === "AnalyticalTable";

    if ((tableManifestSettings === null || tableManifestSettings === void 0 ? void 0 : (_tableManifestSetting3 = tableManifestSettings.tableSettings) === null || _tableManifestSetting3 === void 0 ? void 0 : _tableManifestSetting3.personalization) !== undefined) {
      // Personalization configured in manifest.
      var personalization = tableManifestSettings.tableSettings.personalization;

      if (personalization === true) {
        // Table personalization fully enabled.
        return bAnalyticalTable ? "Sort,Column,Filter,Group,Aggregate" : "Sort,Column,Filter";
      } else if (typeof personalization === "object") {
        // Specific personalization options enabled in manifest. Use them as is.
        if (personalization.sort) {
          aPersonalization.push("Sort");
        }

        if (personalization.column) {
          aPersonalization.push("Column");
        }

        if (personalization.filter) {
          aPersonalization.push("Filter");
        }

        if (personalization.group && bAnalyticalTable) {
          aPersonalization.push("Group");
        }

        if (personalization.aggregate && bAnalyticalTable) {
          aPersonalization.push("Aggregate");
        }

        return aPersonalization.length > 0 ? aPersonalization.join(",") : undefined;
      }
    } else {
      // No personalization configured in manifest.
      aPersonalization.push("Sort");
      aPersonalization.push("Column");

      if (variantManagement === VariantManagementType.Control) {
        // Feature parity with V2.
        // Enable table filtering by default only in case of Control level variant management.
        aPersonalization.push("Filter");
      }

      if (bAnalyticalTable) {
        aPersonalization.push("Group");
        aPersonalization.push("Aggregate");
      }

      return aPersonalization.join(",");
    }

    return undefined;
  }
  /**
   * Function to determine the visibility of the Delete button.
   *
   * @param converterContext The instance of the converter context
   * @param navigationPath Path to the navigation entity
   * @param isTargetDeletable Flag which determines whether a target is deletable
   * @param viewConfiguration The instance of the configuration for the view path
   * @returns {Expression<boolean>} The expression for the Delete button
   */


  _exports.getP13nMode = getP13nMode;

  function getDeleteVisible(converterContext, navigationPath, isTargetDeletable, viewConfiguration) {
    var _currentEntitySet$ann, _converterContext$get8, _converterContext$get9, _converterContext$get10, _currentEntitySet$ann2, _currentEntitySet$ann3, _currentEntitySet$ann4, _currentEntitySet$ann5, _converterContext$get11, _converterContext$get12, _converterContext$get13, _converterContext$get14, _converterContext$get15, _converterContext$get16, _converterContext$get17;

    var currentEntitySet = converterContext.getEntitySet();
    var dataModelObjectPath = converterContext.getDataModelObjectPath();
    var visitedNavigationPaths = dataModelObjectPath.navigationProperties.map(function (navProp) {
      return navProp.name;
    });
    var isDeleteHiddenExpression = currentEntitySet ? annotationExpression((currentEntitySet === null || currentEntitySet === void 0 ? void 0 : (_currentEntitySet$ann = currentEntitySet.annotations.UI) === null || _currentEntitySet$ann === void 0 ? void 0 : _currentEntitySet$ann.DeleteHidden) || false, visitedNavigationPaths, undefined, function (path) {
      return singletonPathVisitor(path, converterContext, visitedNavigationPaths);
    }) : constant(false);
    var isDeleteHidden = compileBinding(isDeleteHiddenExpression);
    var isParentDeletable, parentEntitySetDeletable;

    if (converterContext.getTemplateType() === TemplateType.ObjectPage) {
      isParentDeletable = isPathDeletable(converterContext.getDataModelObjectPath(), navigationPath);
      parentEntitySetDeletable = isParentDeletable ? compileBinding(isParentDeletable) : isParentDeletable;
    }

    var bIsStickySessionSupported = (_converterContext$get8 = converterContext.getDataModelObjectPath().startingEntitySet) !== null && _converterContext$get8 !== void 0 && (_converterContext$get9 = _converterContext$get8.annotations) !== null && _converterContext$get9 !== void 0 && (_converterContext$get10 = _converterContext$get9.Session) !== null && _converterContext$get10 !== void 0 && _converterContext$get10.StickySessionSupported ? true : false;
    var bIsDraftRoot = currentEntitySet && (_currentEntitySet$ann2 = currentEntitySet.annotations) !== null && _currentEntitySet$ann2 !== void 0 && (_currentEntitySet$ann3 = _currentEntitySet$ann2.Common) !== null && _currentEntitySet$ann3 !== void 0 && _currentEntitySet$ann3.DraftRoot ? true : false;
    var bIsDraftNode = currentEntitySet && (_currentEntitySet$ann4 = currentEntitySet.annotations) !== null && _currentEntitySet$ann4 !== void 0 && (_currentEntitySet$ann5 = _currentEntitySet$ann4.Common) !== null && _currentEntitySet$ann5 !== void 0 && _currentEntitySet$ann5.DraftNode ? true : false;
    var bIsDraftParentEntityForContainment = (_converterContext$get11 = converterContext.getDataModelObjectPath().targetObject) !== null && _converterContext$get11 !== void 0 && _converterContext$get11.containsTarget && ((_converterContext$get12 = converterContext.getDataModelObjectPath().startingEntitySet) !== null && _converterContext$get12 !== void 0 && (_converterContext$get13 = _converterContext$get12.annotations) !== null && _converterContext$get13 !== void 0 && (_converterContext$get14 = _converterContext$get13.Common) !== null && _converterContext$get14 !== void 0 && _converterContext$get14.DraftRoot || (_converterContext$get15 = converterContext.getDataModelObjectPath().startingEntitySet) !== null && _converterContext$get15 !== void 0 && (_converterContext$get16 = _converterContext$get15.annotations) !== null && _converterContext$get16 !== void 0 && (_converterContext$get17 = _converterContext$get16.Common) !== null && _converterContext$get17 !== void 0 && _converterContext$get17.DraftNode) ? true : false;

    if (bIsDraftRoot || bIsDraftNode || bIsStickySessionSupported || !converterContext.getEntitySet() && bIsDraftParentEntityForContainment) {
      //do not show case the delete button if parentEntitySetDeletable is false
      if (parentEntitySetDeletable === "false") {
        return constant(false); //OP
      } else if (parentEntitySetDeletable && isDeleteHidden !== "true") {
        //Delete Hidden in case of true and path based
        if (isDeleteHidden && isDeleteHidden !== "false") {
          return and(equal(bindingExpression("/editMode", "ui"), "Editable"), not(isDeleteHiddenExpression));
        } else {
          return equal(bindingExpression("/editMode", "ui"), "Editable");
        }
      } else if (isDeleteHidden === "true" || !isTargetDeletable || viewConfiguration && converterContext.getManifestWrapper().hasMultipleVisualizations(viewConfiguration) || converterContext.getTemplateType() === TemplateType.AnalyticalListPage) {
        return constant(false);
      } else if (converterContext.getTemplateType() !== TemplateType.ListReport) {
        if (isDeleteHidden && isDeleteHidden === "false") {
          return and(equal(bindingExpression("/editMode", "ui"), "Editable"), not(isDeleteHiddenExpression));
        } else {
          return equal(bindingExpression("/editMode", "ui"), "Editable");
        }
      } else if (isBinding(isDeleteHiddenExpression)) {
        // UI.DeleteHidden annotation points to a path
        return not(isDeleteHiddenExpression);
      } else {
        return constant(true);
      }
    } else {
      return constant(false);
    }
  }
  /**
   * Returns the enablement for the 'Mass Edit' button
   *
   * @param converterContext The converterContext
   * @param bMassEditVisible The visibility of the 'Mass Edit' button
   * @returns {*} Expression or Boolean value for the enablement of the 'Mass Edit' button
   */


  _exports.getDeleteVisible = getDeleteVisible;

  function getEnablementMassEdit(converterContext, bMassEditVisible) {
    if (bMassEditVisible) {
      var isParentUpdatable = isPathUpdatable(converterContext.getDataModelObjectPath(), undefined, true); //when updatable is path based and pointing to current entity set property, that case is handled in table helper and runtime

      if (isParentUpdatable !== null && isParentUpdatable !== void 0 && isParentUpdatable.currentEntityRestriction) {
        return false;
      }

      var oExpression = compileBinding(isParentUpdatable);
      return isParentUpdatable ? "{= %{internal>numberOfSelectedContexts} >= 2 && " + compileBinding(isParentUpdatable, oExpression) + "}" : false;
    }

    return false;
  }
  /**
   * Returns the visibility for the 'Mass Edit' button
   *
   * @param converterContext The converterContext
   * @param tableManifestConfiguration The manifest configuration for the table
   * @param targetCapabilities The target capability restrictions for the table
   * @param selectionMode The selection mode for the table
   * @returns {*} Expression or Boolean value for the visibility of the 'Mass Edit' button
   */


  _exports.getEnablementMassEdit = getEnablementMassEdit;

  function getVisibilityMassEdit(converterContext, tableManifestConfiguration, targetCapabilities, selectionMode) {
    var _entitySet$annotation, _entitySet$annotation2;

    var entitySet = converterContext.getEntitySet(),
        bUpdateHidden = entitySet && (entitySet === null || entitySet === void 0 ? void 0 : (_entitySet$annotation = entitySet.annotations.UI) === null || _entitySet$annotation === void 0 ? void 0 : (_entitySet$annotation2 = _entitySet$annotation.UpdateHidden) === null || _entitySet$annotation2 === void 0 ? void 0 : _entitySet$annotation2.valueOf()),
        bMassEditEnabled = (tableManifestConfiguration === null || tableManifestConfiguration === void 0 ? void 0 : tableManifestConfiguration.enableMassEdit) || false,
        iSelectionLimit = tableManifestConfiguration === null || tableManifestConfiguration === void 0 ? void 0 : tableManifestConfiguration.selectionLimit;
    var bMassEditVisible = true;

    if (selectionMode && selectionMode === "Single" || iSelectionLimit && iSelectionLimit < 2) {
      bMassEditVisible = false;
    } else if (selectionMode && (selectionMode === "Auto" || selectionMode === "None")) {
      bMassEditVisible = true;
    }

    if ((targetCapabilities === null || targetCapabilities === void 0 ? void 0 : targetCapabilities.isUpdatable) !== false && bMassEditVisible && bMassEditEnabled) {
      if (bUpdateHidden && typeof bUpdateHidden === "boolean") {
        return !bUpdateHidden && converterContext.getTemplateType() === TemplateType.ObjectPage ? compileBinding(UI.IsEditable) : false;
      } else if (bUpdateHidden && bUpdateHidden !== null && bUpdateHidden !== void 0 && bUpdateHidden.path) {
        return converterContext.getTemplateType() === TemplateType.ObjectPage ? compileBinding(and(equal(UI.IsEditable, true), equal(annotationExpression(bUpdateHidden), false))) : false;
      }

      return converterContext.getTemplateType() === TemplateType.ObjectPage ? compileBinding(UI.IsEditable) : false;
    }

    return false;
  }
  /**
   * Function to determine the visibility of the Create button.
   *
   * @param converterContext The instance of the converter context
   * @param creationMode The mode used for creation
   * @param isInsertable Annotation expression of InsertRestrictions.Insertable
   * @param viewConfiguration The instance of the configuration for the view path
   * @returns {Expression<boolean>} Expression or Boolean value of the 'UI.CreateHidden' annotation
   */


  _exports.getVisibilityMassEdit = getVisibilityMassEdit;

  function getCreateVisible(converterContext, creationMode, isInsertable, viewConfiguration) {
    var _currentEntitySet$ann6, _currentEntitySet$ann7, _currentEntitySet$ann8, _currentEntitySet$ann9, _converterContext$get18, _converterContext$get19, _converterContext$get20;

    var currentEntitySet = converterContext.getEntitySet();
    var dataModelObjectPath = converterContext.getDataModelObjectPath();
    var visitedNavigationPaths = dataModelObjectPath.navigationProperties.map(function (navProp) {
      return navProp.name;
    });
    var isCreateHidden = currentEntitySet ? annotationExpression((currentEntitySet === null || currentEntitySet === void 0 ? void 0 : (_currentEntitySet$ann6 = currentEntitySet.annotations.UI) === null || _currentEntitySet$ann6 === void 0 ? void 0 : _currentEntitySet$ann6.CreateHidden) || false, visitedNavigationPaths, undefined, function (path) {
      return singletonPathVisitor(path, converterContext, visitedNavigationPaths);
    }) : constant(false); // if there is a custom new action the create button will be bound against this new action (instead of a POST action).
    // The visibility of the create button then depends on the new action's OperationAvailable annotation (instead of the insertRestrictions):
    // OperationAvailable = true or undefined -> create is visible
    // OperationAvailable = false -> create is not visible

    var newActionName = currentEntitySet === null || currentEntitySet === void 0 ? void 0 : (_currentEntitySet$ann7 = currentEntitySet.annotations.Common) === null || _currentEntitySet$ann7 === void 0 ? void 0 : (_currentEntitySet$ann8 = _currentEntitySet$ann7.DraftRoot) === null || _currentEntitySet$ann8 === void 0 ? void 0 : (_currentEntitySet$ann9 = _currentEntitySet$ann8.NewAction) === null || _currentEntitySet$ann9 === void 0 ? void 0 : _currentEntitySet$ann9.toString();
    var showCreateForNewAction = newActionName ? annotationExpression(converterContext === null || converterContext === void 0 ? void 0 : (_converterContext$get18 = converterContext.getEntityType().actions[newActionName].annotations) === null || _converterContext$get18 === void 0 ? void 0 : (_converterContext$get19 = _converterContext$get18.Core) === null || _converterContext$get19 === void 0 ? void 0 : (_converterContext$get20 = _converterContext$get19.OperationAvailable) === null || _converterContext$get20 === void 0 ? void 0 : _converterContext$get20.valueOf(), [], true, function (path) {
      return singletonPathVisitor(path, converterContext, []);
    }) : undefined; // - If it's statically not insertable -> create is not visible
    // - If create is statically hidden -> create is not visible
    // - If it's an ALP template -> create is not visible
    // -
    // - Otherwise
    // 	 - If the create mode is external -> create is visible
    // 	 - If we're on the list report ->
    // 	 	- If UI.CreateHidden points to a property path -> provide a negated binding to this path
    // 	 	- Otherwise, create is visible
    // 	 - Otherwise
    // 	   - This depends on the value of the the UI.IsEditable

    return ifElse(or(or(equal(showCreateForNewAction, false), and(isConstant(isInsertable), equal(isInsertable, false), equal(showCreateForNewAction, undefined))), isConstant(isCreateHidden) && equal(isCreateHidden, true), or(viewConfiguration ? converterContext.getManifestWrapper().hasMultipleVisualizations(viewConfiguration) : false, converterContext.getTemplateType() === TemplateType.AnalyticalListPage)), false, ifElse(creationMode === "External", true, ifElse(converterContext.getTemplateType() === TemplateType.ListReport, ifElse(isBinding(isCreateHidden), not(isCreateHidden), true), and(not(isCreateHidden), UI.IsEditable))));
  }
  /**
   * Returns the visibility for the Paste button.
   *
   * @param converterContext The instance of the converter context
   * @param creationBehaviour The chosen behavior of creation
   * @param isInsertable The expression which denotes insert restrictions
   * @param pasteEnabledInManifest The flag which denotes the paste enablement status via manifest
   * @param viewConfiguration The instance of the configuration for the view path
   * @returns {Expression<boolean>} Expression or Boolean value of the UI.CreateHidden annotation
   */


  _exports.getCreateVisible = getCreateVisible;

  function getPasteEnabled(converterContext, creationBehaviour, isInsertable, pasteEnabledInManifest, viewConfiguration) {
    // If create is not visible -> it's not enabled
    // If create is visible ->
    // 	 If it's in the ListReport -> not enabled
    //	 If it's insertable -> enabled
    return ifElse(pasteEnabledInManifest && equal(getCreateVisible(converterContext, creationBehaviour.mode, isInsertable, viewConfiguration), true), converterContext.getTemplateType() === TemplateType.ObjectPage && isInsertable, false);
  }
  /**
   * Returns a JSON string containing the sort conditions for the presentation variant.
   *
   * @param converterContext The instance of the converter context
   * @param {PresentationVariantTypeTypes | undefined} presentationVariantAnnotation Presentation variant annotation
   * @param columns Table columns processed by the converter
   * @returns {string | undefined} Sort conditions for a presentation variant.
   */


  _exports.getPasteEnabled = getPasteEnabled;

  function getSortConditions(converterContext, presentationVariantAnnotation, columns) {
    // Currently navigation property is not supported as sorter
    var nonSortableProperties = getNonSortablePropertiesRestrictions(converterContext.getEntitySet());
    var sortConditions;

    if (presentationVariantAnnotation !== null && presentationVariantAnnotation !== void 0 && presentationVariantAnnotation.SortOrder) {
      var sorters = [];
      var conditions = {
        sorters: sorters
      };
      presentationVariantAnnotation.SortOrder.forEach(function (condition) {
        var _conditionProperty$$t;

        var conditionProperty = condition.Property;

        if (conditionProperty && nonSortableProperties.indexOf((_conditionProperty$$t = conditionProperty.$target) === null || _conditionProperty$$t === void 0 ? void 0 : _conditionProperty$$t.name) === -1) {
          var infoName = convertPropertyPathsToInfoNames([conditionProperty], columns)[0];

          if (infoName) {
            conditions.sorters.push({
              name: infoName,
              descending: !!condition.Descending
            });
          }
        }
      });
      sortConditions = conditions.sorters.length ? JSON.stringify(conditions) : undefined;
    }

    return sortConditions;
  }
  /**
   * Converts an array of propertyPath to an array of propertyInfo names.
   *
   * @param paths the array to be converted
   * @param columns the array of propertyInfos
   * @returns an array of propertyInfo names
   */


  function convertPropertyPathsToInfoNames(paths, columns) {
    var infoNames = [];
    paths.forEach(function (currentPath) {
      var _currentPath$$target;

      if (currentPath !== null && currentPath !== void 0 && (_currentPath$$target = currentPath.$target) !== null && _currentPath$$target !== void 0 && _currentPath$$target.name) {
        var propertyInfo = columns.find(function (column) {
          var _currentPath$$target2;

          var annotationColumn = column;
          return !annotationColumn.propertyInfos && annotationColumn.relativePath === (currentPath === null || currentPath === void 0 ? void 0 : (_currentPath$$target2 = currentPath.$target) === null || _currentPath$$target2 === void 0 ? void 0 : _currentPath$$target2.name);
        });

        if (propertyInfo) {
          infoNames.push(propertyInfo.name);
        }
      }
    });
    return infoNames;
  }
  /**
   * Returns a JSON string containing Presentation Variant group conditions.
   *
   * @param {PresentationVariantTypeTypes | undefined} presentationVariantAnnotation Presentation variant annotation
   * @param columns Converter processed table columns
   * @returns {string | undefined} Group conditions for a Presentation variant.
   */


  function getGroupConditions(presentationVariantAnnotation, columns) {
    var groupConditions;

    if (presentationVariantAnnotation !== null && presentationVariantAnnotation !== void 0 && presentationVariantAnnotation.GroupBy) {
      var aGroupBy = presentationVariantAnnotation.GroupBy;
      var aGroupLevels = convertPropertyPathsToInfoNames(aGroupBy, columns).map(function (infoName) {
        return {
          name: infoName
        };
      });
      groupConditions = aGroupLevels.length ? JSON.stringify({
        groupLevels: aGroupLevels
      }) : undefined;
    }

    return groupConditions;
  }
  /**
   * Returns a JSON string containing Presentation Variant aggregate conditions.
   *
   * @param {PresentationVariantTypeTypes | undefined} presentationVariantAnnotation Presentation variant annotation
   * @param columns Converter processed table columns
   * @returns {string | undefined} Group conditions for a Presentation variant.
   */


  function getAggregateConditions(presentationVariantAnnotation, columns) {
    var aggregateConditions;

    if (presentationVariantAnnotation !== null && presentationVariantAnnotation !== void 0 && presentationVariantAnnotation.Total) {
      var aTotals = presentationVariantAnnotation.Total;
      var aggregates = {};
      convertPropertyPathsToInfoNames(aTotals, columns).forEach(function (infoName) {
        aggregates[infoName] = {};
      });
      aggregateConditions = JSON.stringify(aggregates);
    }

    return aggregateConditions;
  }

  function getTableAnnotationConfiguration(lineItemAnnotation, visualizationPath, converterContext, tableManifestConfiguration, columns, presentationVariantAnnotation, viewConfiguration) {
    var _converterContext$get21, _converterContext$get22, _converterContext$get23;

    // Need to get the target
    var _splitPath2 = splitPath(visualizationPath),
        navigationPropertyPath = _splitPath2.navigationPropertyPath;

    var title = (_converterContext$get21 = converterContext.getDataModelObjectPath().targetEntityType.annotations) === null || _converterContext$get21 === void 0 ? void 0 : (_converterContext$get22 = _converterContext$get21.UI) === null || _converterContext$get22 === void 0 ? void 0 : (_converterContext$get23 = _converterContext$get22.HeaderInfo) === null || _converterContext$get23 === void 0 ? void 0 : _converterContext$get23.TypeNamePlural;
    var entitySet = converterContext.getDataModelObjectPath().targetEntitySet;
    var pageManifestSettings = converterContext.getManifestWrapper();
    var hasAbsolutePath = navigationPropertyPath.length === 0,
        p13nMode = getP13nMode(visualizationPath, converterContext, tableManifestConfiguration),
        id = navigationPropertyPath ? TableID(visualizationPath) : TableID(converterContext.getContextPath(), "LineItem");
    var targetCapabilities = getCapabilityRestriction(converterContext);
    var isDeleteButtonVisible = getDeleteVisible(converterContext, navigationPropertyPath, targetCapabilities.isDeletable, viewConfiguration);
    var selectionMode = getSelectionMode(lineItemAnnotation, visualizationPath, converterContext, hasAbsolutePath, targetCapabilities, isDeleteButtonVisible);
    var threshold = navigationPropertyPath ? 10 : 30;

    if (presentationVariantAnnotation !== null && presentationVariantAnnotation !== void 0 && presentationVariantAnnotation.MaxItems) {
      threshold = presentationVariantAnnotation.MaxItems.valueOf();
    }

    var navigationTargetPath = getNavigationTargetPath(converterContext, navigationPropertyPath);
    var navigationSettings = pageManifestSettings.getNavigationConfiguration(navigationTargetPath);

    var creationBehaviour = _getCreationBehaviour(lineItemAnnotation, tableManifestConfiguration, converterContext, navigationSettings);

    var isParentDeletable, parentEntitySetDeletable;

    if (converterContext.getTemplateType() === TemplateType.ObjectPage) {
      var _isParentDeletable;

      isParentDeletable = isPathDeletable(converterContext.getDataModelObjectPath(), undefined, true);

      if ((_isParentDeletable = isParentDeletable) !== null && _isParentDeletable !== void 0 && _isParentDeletable.currentEntityRestriction) {
        parentEntitySetDeletable = undefined;
      } else {
        parentEntitySetDeletable = isParentDeletable ? compileBinding(isParentDeletable, true) : isParentDeletable;
      }
    }

    var dataModelObjectPath = converterContext.getDataModelObjectPath();
    var isInsertable = isPathInsertable(dataModelObjectPath);
    var variantManagement = pageManifestSettings.getVariantManagement();
    var bMassEditVisible = getVisibilityMassEdit(converterContext, tableManifestConfiguration, targetCapabilities, selectionMode);
    var isSearchable = isPathSearchable(converterContext.getDataModelObjectPath());
    return {
      id: id,
      entityName: entitySet ? entitySet.name : "",
      collection: getTargetObjectPath(converterContext.getDataModelObjectPath()),
      navigationPath: navigationPropertyPath,
      row: _getRowConfigurationProperty(lineItemAnnotation, visualizationPath, converterContext, navigationSettings, navigationTargetPath),
      p13nMode: p13nMode,
      show: {
        "delete": compileBinding(isDeleteButtonVisible),
        create: compileBinding(getCreateVisible(converterContext, creationBehaviour === null || creationBehaviour === void 0 ? void 0 : creationBehaviour.mode, isInsertable)),
        paste: compileBinding(getPasteEnabled(converterContext, creationBehaviour, isInsertable, tableManifestConfiguration.enablePaste, viewConfiguration)),
        massEdit: {
          visible: bMassEditVisible,
          enabled: getEnablementMassEdit(converterContext, bMassEditVisible)
        }
      },
      displayMode: isInDisplayMode(converterContext, viewConfiguration),
      create: creationBehaviour,
      selectionMode: selectionMode,
      autoBindOnInit: converterContext.getTemplateType() !== TemplateType.ListReport && converterContext.getTemplateType() !== TemplateType.AnalyticalListPage && !(viewConfiguration && converterContext.getManifestWrapper().hasMultipleVisualizations(viewConfiguration)),
      variantManagement: variantManagement === "Control" && !p13nMode ? VariantManagementType.None : variantManagement,
      threshold: threshold,
      sortConditions: getSortConditions(converterContext, presentationVariantAnnotation, columns),
      parentEntityDeleteEnabled: parentEntitySetDeletable,
      title: title,
      searchable: tableManifestConfiguration.type !== "AnalyticalTable" && !(isConstant(isSearchable) && isSearchable.value === false)
    };
  }

  _exports.getTableAnnotationConfiguration = getTableAnnotationConfiguration;

  function _getExportDataType(dataType) {
    var isComplexProperty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var exportDataType = "String";

    if (isComplexProperty) {
      return exportDataType;
    } else {
      switch (dataType) {
        case "Edm.Decimal":
        case "Edm.Int32":
        case "Edm.Int64":
        case "Edm.Double":
        case "Edm.Byte":
          exportDataType = "Number";
          break;

        case "Edm.DateOfTime":
        case "Edm.Date":
          exportDataType = "Date";
          break;

        case "Edm.DateTimeOffset":
          exportDataType = "DateTime";
          break;

        case "Edm.TimeOfDay":
          exportDataType = "Time";
          break;

        case "Edm.Boolean":
          exportDataType = "Boolean";
          break;

        default:
          exportDataType = "String";
      }
    }

    return exportDataType;
  }

  function isInDisplayMode(converterContext, viewConfiguration) {
    var templateType = converterContext.getTemplateType();

    if (templateType === TemplateType.ListReport || templateType === TemplateType.AnalyticalListPage || viewConfiguration && converterContext.getManifestWrapper().hasMultipleVisualizations(viewConfiguration)) {
      return true;
    } // updatable will be handled at the property level


    return false;
  }
  /**
   * Split the visualization path into the navigation property path and annotation.
   *
   * @param visualizationPath
   * @returns {object}
   */


  function splitPath(visualizationPath) {
    var _visualizationPath$sp = visualizationPath.split("@"),
        _visualizationPath$sp2 = _slicedToArray(_visualizationPath$sp, 2),
        navigationPropertyPath = _visualizationPath$sp2[0],
        annotationPath = _visualizationPath$sp2[1];

    if (navigationPropertyPath.lastIndexOf("/") === navigationPropertyPath.length - 1) {
      // Drop trailing slash
      navigationPropertyPath = navigationPropertyPath.substr(0, navigationPropertyPath.length - 1);
    }

    return {
      navigationPropertyPath: navigationPropertyPath,
      annotationPath: annotationPath
    };
  }

  _exports.splitPath = splitPath;

  function getSelectionVariantConfiguration(selectionVariantPath, converterContext) {
    var resolvedTarget = converterContext.getEntityTypeAnnotation(selectionVariantPath);
    var selection = resolvedTarget.annotation;

    if (selection) {
      var _selection$SelectOpti, _selection$Text;

      var propertyNames = [];
      (_selection$SelectOpti = selection.SelectOptions) === null || _selection$SelectOpti === void 0 ? void 0 : _selection$SelectOpti.forEach(function (selectOption) {
        var propertyName = selectOption.PropertyName;
        var PropertyPath = propertyName.value;

        if (propertyNames.indexOf(PropertyPath) === -1) {
          propertyNames.push(PropertyPath);
        }
      });
      return {
        text: selection === null || selection === void 0 ? void 0 : (_selection$Text = selection.Text) === null || _selection$Text === void 0 ? void 0 : _selection$Text.toString(),
        propertyNames: propertyNames
      };
    }

    return undefined;
  }

  _exports.getSelectionVariantConfiguration = getSelectionVariantConfiguration;

  function getTableManifestConfiguration(lineItemAnnotation, visualizationPath, converterContext) {
    var _tableSettings$quickV5, _converterContext$get24;

    var checkCondensedLayout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var tableManifestSettings = converterContext.getManifestControlConfiguration(visualizationPath);
    var tableSettings = tableManifestSettings && tableManifestSettings.tableSettings || {};
    var quickSelectionVariant;
    var quickFilterPaths = [];
    var enableExport = true;
    var creationMode = CreationMode.NewPage;
    var filters;
    var createAtEnd = true;
    var disableAddRowButtonForEmptyData = false;
    var customValidationFunction;
    var condensedTableLayout = false;
    var hideTableTitle = false;
    var tableType = "ResponsiveTable";
    var enableFullScreen = false;
    var selectionLimit = 200;
    var multiSelectMode;
    var enableAutoColumnWidth = true;
    var enablePaste = converterContext.getTemplateType() === "ObjectPage";
    var isCondensedTableLayoutCompliant = checkCondensedLayout && converterContext.getManifestWrapper().isCondensedLayoutCompliant();
    var entityType = converterContext.getEntityType();
    var aggregationHelper = new AggregationHelper(entityType, converterContext);

    if (lineItemAnnotation) {
      var _tableSettings$quickV, _tableSettings$quickV2, _tableSettings$creati, _tableSettings$creati2, _tableSettings$creati3, _tableSettings$creati4, _tableSettings$creati5, _tableSettings$quickV4;

      var targetEntityType = converterContext.getAnnotationEntityType(lineItemAnnotation);
      tableSettings === null || tableSettings === void 0 ? void 0 : (_tableSettings$quickV = tableSettings.quickVariantSelection) === null || _tableSettings$quickV === void 0 ? void 0 : (_tableSettings$quickV2 = _tableSettings$quickV.paths) === null || _tableSettings$quickV2 === void 0 ? void 0 : _tableSettings$quickV2.forEach(function (path) {
        var _tableSettings$quickV3;

        quickSelectionVariant = targetEntityType.resolvePath("@" + path.annotationPath); // quickSelectionVariant = converterContext.getEntityTypeAnnotation(path.annotationPath);

        if (quickSelectionVariant) {
          quickFilterPaths.push({
            annotationPath: path.annotationPath
          });
        }

        filters = {
          quickFilters: {
            enabled: converterContext.getTemplateType() === TemplateType.ListReport ? "{= ${pageInternal>hasPendingFilters} !== true}" : true,
            showCounts: tableSettings === null || tableSettings === void 0 ? void 0 : (_tableSettings$quickV3 = tableSettings.quickVariantSelection) === null || _tableSettings$quickV3 === void 0 ? void 0 : _tableSettings$quickV3.showCounts,
            paths: quickFilterPaths
          }
        };
      });
      creationMode = ((_tableSettings$creati = tableSettings.creationMode) === null || _tableSettings$creati === void 0 ? void 0 : _tableSettings$creati.name) || creationMode;
      createAtEnd = ((_tableSettings$creati2 = tableSettings.creationMode) === null || _tableSettings$creati2 === void 0 ? void 0 : _tableSettings$creati2.createAtEnd) !== undefined ? (_tableSettings$creati3 = tableSettings.creationMode) === null || _tableSettings$creati3 === void 0 ? void 0 : _tableSettings$creati3.createAtEnd : true;
      customValidationFunction = (_tableSettings$creati4 = tableSettings.creationMode) === null || _tableSettings$creati4 === void 0 ? void 0 : _tableSettings$creati4.customValidationFunction; // if a custom validation function is provided, disableAddRowButtonForEmptyData should not be considered, i.e. set to false

      disableAddRowButtonForEmptyData = !customValidationFunction ? !!((_tableSettings$creati5 = tableSettings.creationMode) !== null && _tableSettings$creati5 !== void 0 && _tableSettings$creati5.disableAddRowButtonForEmptyData) : false;
      condensedTableLayout = tableSettings.condensedTableLayout !== undefined ? tableSettings.condensedTableLayout : false;
      hideTableTitle = !!((_tableSettings$quickV4 = tableSettings.quickVariantSelection) !== null && _tableSettings$quickV4 !== void 0 && _tableSettings$quickV4.hideTableTitle);
      tableType = (tableSettings === null || tableSettings === void 0 ? void 0 : tableSettings.type) || "ResponsiveTable";

      if (converterContext.getTemplateType() !== "ObjectPage") {
        if ((tableSettings === null || tableSettings === void 0 ? void 0 : tableSettings.type) === "AnalyticalTable" && !aggregationHelper.isAnalyticsSupported()) {
          tableType = "GridTable";
        }

        if (!(tableSettings !== null && tableSettings !== void 0 && tableSettings.type)) {
          if (converterContext.getManifestWrapper().isDesktop() && aggregationHelper.isAnalyticsSupported()) {
            tableType = "AnalyticalTable";
          } else {
            tableType = "ResponsiveTable";
          }
        }
      }

      enableFullScreen = tableSettings.enableFullScreen || false;

      if (enableFullScreen === true && converterContext.getTemplateType() === TemplateType.ListReport) {
        enableFullScreen = false;
        converterContext.getDiagnostics().addIssue(IssueCategory.Manifest, IssueSeverity.Low, IssueType.FULLSCREENMODE_NOT_ON_LISTREPORT);
      }

      selectionLimit = tableSettings.selectAll === true || tableSettings.selectionLimit === 0 ? 0 : tableSettings.selectionLimit || 200;

      if (tableType === "ResponsiveTable") {
        if (converterContext.getTemplateType() === TemplateType.ListReport || converterContext.getTemplateType() === TemplateType.AnalyticalListPage) {
          multiSelectMode = !!tableSettings.selectAll ? "Default" : "ClearAll";
        }

        if (converterContext.getTemplateType() === TemplateType.ObjectPage) {
          if (converterContext.getManifestWrapper().useIconTabBar()) {
            multiSelectMode = !!tableSettings.selectAll ? "Default" : "ClearAll";
          } else {
            multiSelectMode = tableSettings.selectAll === false ? "ClearAll" : "Default";
          }
        }
      }

      enablePaste = converterContext.getTemplateType() === "ObjectPage" && tableSettings.enablePaste !== false;
      enableExport = tableSettings.enableExport !== undefined ? tableSettings.enableExport : converterContext.getTemplateType() !== "ObjectPage" || enablePaste;
    }

    return {
      filters: filters,
      type: tableType,
      enableFullScreen: enableFullScreen,
      headerVisible: !(quickSelectionVariant && hideTableTitle),
      enableExport: enableExport,
      creationMode: creationMode,
      createAtEnd: createAtEnd,
      disableAddRowButtonForEmptyData: disableAddRowButtonForEmptyData,
      customValidationFunction: customValidationFunction,
      useCondensedTableLayout: condensedTableLayout && isCondensedTableLayoutCompliant,
      selectionLimit: selectionLimit,
      multiSelectMode: multiSelectMode,
      enablePaste: enablePaste,
      showRowCount: !(tableSettings !== null && tableSettings !== void 0 && (_tableSettings$quickV5 = tableSettings.quickVariantSelection) !== null && _tableSettings$quickV5 !== void 0 && _tableSettings$quickV5.showCounts) && !((_converterContext$get24 = converterContext.getManifestWrapper().getViewConfiguration()) !== null && _converterContext$get24 !== void 0 && _converterContext$get24.showCounts),
      enableMassEdit: tableSettings === null || tableSettings === void 0 ? void 0 : tableSettings.enableMassEdit,
      enableAutoColumnWidth: enableAutoColumnWidth
    };
  }

  _exports.getTableManifestConfiguration = getTableManifestConfiguration;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlLnRzIl0sIm5hbWVzIjpbIkNvbHVtblR5cGUiLCJnZXRUYWJsZUFjdGlvbnMiLCJsaW5lSXRlbUFubm90YXRpb24iLCJ2aXN1YWxpemF0aW9uUGF0aCIsImNvbnZlcnRlckNvbnRleHQiLCJuYXZpZ2F0aW9uU2V0dGluZ3MiLCJhVGFibGVBY3Rpb25zIiwiZ2V0VGFibGVBbm5vdGF0aW9uQWN0aW9ucyIsImFBbm5vdGF0aW9uQWN0aW9ucyIsInRhYmxlQWN0aW9ucyIsImFIaWRkZW5BY3Rpb25zIiwiaGlkZGVuVGFibGVBY3Rpb25zIiwiaW5zZXJ0Q3VzdG9tRWxlbWVudHMiLCJnZXRBY3Rpb25zRnJvbU1hbmlmZXN0IiwiZ2V0TWFuaWZlc3RDb250cm9sQ29uZmlndXJhdGlvbiIsImFjdGlvbnMiLCJpc05hdmlnYWJsZSIsImVuYWJsZU9uU2VsZWN0IiwiZW5hYmxlQXV0b1Njcm9sbCIsImVuYWJsZWQiLCJkZWZhdWx0VmFsdWVzRXh0ZW5zaW9uRnVuY3Rpb24iLCJnZXRUYWJsZUNvbHVtbnMiLCJhbm5vdGF0aW9uQ29sdW1ucyIsImdldENvbHVtbnNGcm9tQW5ub3RhdGlvbnMiLCJtYW5pZmVzdENvbHVtbnMiLCJnZXRDb2x1bW5zRnJvbU1hbmlmZXN0IiwiY29sdW1ucyIsImdldEFubm90YXRpb25FbnRpdHlUeXBlIiwid2lkdGgiLCJhdmFpbGFiaWxpdHkiLCJzZXR0aW5ncyIsImhvcml6b250YWxBbGlnbiIsImZvcm1hdE9wdGlvbnMiLCJnZXRBZ2dyZWdhdGVEZWZpbml0aW9uc0Zyb21FbnRpdHlUeXBlIiwiZW50aXR5VHlwZSIsInRhYmxlQ29sdW1ucyIsImFnZ3JlZ2F0aW9uSGVscGVyIiwiQWdncmVnYXRpb25IZWxwZXIiLCJmaW5kQ29sdW1uRnJvbVBhdGgiLCJwYXRoIiwiZmluZCIsImNvbHVtbiIsImFubm90YXRpb25Db2x1bW4iLCJwcm9wZXJ0eUluZm9zIiwidW5kZWZpbmVkIiwicmVsYXRpdmVQYXRoIiwiaXNBbmFseXRpY3NTdXBwb3J0ZWQiLCJtQ3VycmVuY3lPclVuaXRQcm9wZXJ0aWVzIiwiU2V0IiwiZm9yRWFjaCIsIm9Db2x1bW4iLCJvVGFibGVDb2x1bW4iLCJ1bml0IiwiYWRkIiwiYUN1c3RvbUFnZ3JlZ2F0ZUFubm90YXRpb25zIiwiZ2V0Q3VzdG9tQWdncmVnYXRlRGVmaW5pdGlvbnMiLCJtUmF3RGVmaW5pdGlvbnMiLCJhbm5vdGF0aW9uIiwib0FnZ3JlZ2F0ZWRQcm9wZXJ0eSIsIl9lbnRpdHlUeXBlIiwiZW50aXR5UHJvcGVydGllcyIsIm9Qcm9wZXJ0eSIsIm5hbWUiLCJxdWFsaWZpZXIiLCJhQ29udGV4dERlZmluaW5nUHJvcGVydGllcyIsImFubm90YXRpb25zIiwiQWdncmVnYXRpb24iLCJDb250ZXh0RGVmaW5pbmdQcm9wZXJ0aWVzIiwibWFwIiwib0N0eERlZlByb3BlcnR5IiwidmFsdWUiLCJtUmVzdWx0IiwiYVJhd0NvbnRleHREZWZpbmluZ1Byb3BlcnRpZXMiLCJoYXMiLCJpc0RhdGFQb2ludEZha2VUYXJnZXRQcm9wZXJ0eSIsImRlZmF1bHRBZ2dyZWdhdGUiLCJjb250ZXh0RGVmaW5pbmdQcm9wZXJ0eU5hbWUiLCJwdXNoIiwibGVuZ3RoIiwiY29udGV4dERlZmluaW5nUHJvcGVydGllcyIsInVwZGF0ZVRhYmxlVmlzdWFsaXphdGlvbkZvckFuYWx5dGljcyIsInRhYmxlVmlzdWFsaXphdGlvbiIsInByZXNlbnRhdGlvblZhcmlhbnRBbm5vdGF0aW9uIiwiY29udHJvbCIsInR5cGUiLCJhZ2dyZWdhdGVzRGVmaW5pdGlvbnMiLCJlbmFibGVBbmFseXRpY3MiLCJhZ2dyZWdhdGVzIiwiZ3JvdXBDb25kaXRpb25zIiwiZ2V0R3JvdXBDb25kaXRpb25zIiwiYWdncmVnYXRlQ29uZGl0aW9ucyIsImdldEFnZ3JlZ2F0ZUNvbmRpdGlvbnMiLCJnZXROYXZpZ2F0aW9uVGFyZ2V0UGF0aCIsIm5hdmlnYXRpb25Qcm9wZXJ0eVBhdGgiLCJtYW5pZmVzdFdyYXBwZXIiLCJnZXRNYW5pZmVzdFdyYXBwZXIiLCJnZXROYXZpZ2F0aW9uQ29uZmlndXJhdGlvbiIsIm5hdkNvbmZpZyIsIk9iamVjdCIsImtleXMiLCJkYXRhTW9kZWxQYXRoIiwiZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCIsImNvbnRleHRQYXRoIiwiZ2V0Q29udGV4dFBhdGgiLCJuYXZDb25maWdGb3JDb250ZXh0UGF0aCIsInRhcmdldEVudGl0eVNldCIsInN0YXJ0aW5nRW50aXR5U2V0IiwidXBkYXRlTGlua2VkUHJvcGVydGllcyIsImZpbmRDb2x1bW5CeVBhdGgiLCJvUHJvcCIsInNVbml0IiwiZ2V0QXNzb2NpYXRlZEN1cnJlbmN5UHJvcGVydHkiLCJnZXRBc3NvY2lhdGVkVW5pdFByb3BlcnR5Iiwib1VuaXRDb2x1bW4iLCJkaXNwbGF5TW9kZSIsImdldERpc3BsYXlNb2RlIiwidGV4dEFubm90YXRpb24iLCJDb21tb24iLCJUZXh0IiwiaXNQYXRoRXhwcmVzc2lvbiIsIm9UZXh0Q29sdW1uIiwidGV4dEFycmFuZ2VtZW50IiwidGV4dFByb3BlcnR5IiwibW9kZSIsImNyZWF0ZVRhYmxlVmlzdWFsaXphdGlvbiIsImlzQ29uZGVuc2VkVGFibGVMYXlvdXRDb21wbGlhbnQiLCJ2aWV3Q29uZmlndXJhdGlvbiIsInRhYmxlTWFuaWZlc3RDb25maWciLCJnZXRUYWJsZU1hbmlmZXN0Q29uZmlndXJhdGlvbiIsInNwbGl0UGF0aCIsIm5hdmlnYXRpb25UYXJnZXRQYXRoIiwib3BlcmF0aW9uQXZhaWxhYmxlTWFwIiwiZ2V0T3BlcmF0aW9uQXZhaWxhYmxlTWFwIiwib1Zpc3VhbGl6YXRpb24iLCJWaXN1YWxpemF0aW9uVHlwZSIsIlRhYmxlIiwiZ2V0VGFibGVBbm5vdGF0aW9uQ29uZmlndXJhdGlvbiIsInJlbW92ZUR1cGxpY2F0ZUFjdGlvbnMiLCJlbmFibGVEYXRhU3RhdGVGaWx0ZXIiLCJnZXRUZW1wbGF0ZVR5cGUiLCJKU09OIiwic3RyaW5naWZ5Iiwib3BlcmF0aW9uQXZhaWxhYmxlUHJvcGVydGllcyIsImdldE9wZXJhdGlvbkF2YWlsYWJsZVByb3BlcnRpZXMiLCJjcmVhdGVEZWZhdWx0VGFibGVWaXN1YWxpemF0aW9uIiwiZ2V0Q29sdW1uc0Zyb21FbnRpdHlUeXBlIiwiZ2V0RW50aXR5VHlwZSIsImFkZFRvTWFwIiwia2V5IiwiZGF0YUZpZWxkIiwiJFR5cGUiLCJhY3Rpb25OYW1lIiwiQWN0aW9uIiwiaW5kZXhPZiIsIkRldGVybWluaW5nIiwiYWN0aW9uVGFyZ2V0IiwiQWN0aW9uVGFyZ2V0IiwiQ29yZSIsIk9wZXJhdGlvbkF2YWlsYWJsZSIsInBhcmFtZXRlcnMiLCJiaW5kaW5nUGFyYW1ldGVyRnVsbE5hbWUiLCJmdWxseVF1YWxpZmllZE5hbWUiLCJ0YXJnZXRFeHByZXNzaW9uIiwiYW5ub3RhdGlvbkV4cHJlc3Npb24iLCJiaW5kaW5nQ29udGV4dFBhdGhWaXNpdG9yIiwicHJvcGVydGllcyIsInByb3BlcnR5TmFtZSIsInNpemUiLCJ0aXRsZVByb3BlcnR5IiwiVUkiLCJIZWFkZXJJbmZvIiwiVGl0bGUiLCJWYWx1ZSIsIkFycmF5IiwiZnJvbSIsImpvaW4iLCJnZXRVSUhpZGRlbkV4cEZvckFjdGlvbnNSZXF1aXJpbmdDb250ZXh0IiwiY3VycmVudEVudGl0eVR5cGUiLCJjb250ZXh0RGF0YU1vZGVsT2JqZWN0UGF0aCIsImlzRW50aXR5U2V0IiwiYVVpSGlkZGVuUGF0aEV4cHJlc3Npb25zIiwiaXNCb3VuZCIsInNvdXJjZUVudGl0eVR5cGUiLCJSZXF1aXJlc0NvbnRleHQiLCJJbmxpbmUiLCJ2YWx1ZU9mIiwiSGlkZGVuIiwiZXF1YWwiLCJnZXRCaW5kaW5nRXhwRnJvbUNvbnRleHQiLCJzb3VyY2UiLCJzRXhwcmVzc2lvbiIsInZpc2libGUiLCJzUGF0aCIsInN1YnN0cmluZyIsImFTcGxpdFBhdGgiLCJzcGxpdCIsInNOYXZpZ2F0aW9uUGF0aCIsInRhcmdldE9iamVjdCIsIl90eXBlIiwicGFydG5lciIsImJpbmRpbmdFeHByZXNzaW9uIiwic2xpY2UiLCJjb25zdGFudCIsImhhc0JvdW5kQWN0aW9uc0Fsd2F5c1Zpc2libGVJblRvb2xCYXIiLCJzb21lIiwiaGFzQ3VzdG9tQWN0aW9uc0Fsd2F5c1Zpc2libGVJblRvb2xCYXIiLCJtYW5pZmVzdEFjdGlvbnMiLCJhY3Rpb25LZXkiLCJhY3Rpb24iLCJyZXF1aXJlc1NlbGVjdGlvbiIsInRvU3RyaW5nIiwiZ2V0VmlzaWJsZUV4cEZvckN1c3RvbUFjdGlvbnNSZXF1aXJpbmdDb250ZXh0IiwiYVZpc2libGVQYXRoRXhwcmVzc2lvbnMiLCJyZXNvbHZlQmluZGluZ1N0cmluZyIsImdldENhcGFiaWxpdHlSZXN0cmljdGlvbiIsImlzRGVsZXRhYmxlIiwiaXNQYXRoRGVsZXRhYmxlIiwiaXNVcGRhdGFibGUiLCJpc1BhdGhVcGRhdGFibGUiLCJpc0NvbnN0YW50IiwiZ2V0U2VsZWN0aW9uTW9kZSIsInRhcmdldENhcGFiaWxpdGllcyIsImlzRGVsZXRlQnV0dG9uVmlzaWJsZSIsIlNlbGVjdGlvbk1vZGUiLCJOb25lIiwidGFibGVNYW5pZmVzdFNldHRpbmdzIiwic2VsZWN0aW9uTW9kZSIsInRhYmxlU2V0dGluZ3MiLCJhSGlkZGVuQmluZGluZ0V4cHJlc3Npb25zIiwiYVZpc2libGVCaW5kaW5nRXhwcmVzc2lvbnMiLCJpc1BhcmVudERlbGV0YWJsZSIsInBhcmVudEVudGl0eVNldERlbGV0YWJsZSIsIlRlbXBsYXRlVHlwZSIsIk9iamVjdFBhZ2UiLCJjb21waWxlQmluZGluZyIsImlmRWxzZSIsIkF1dG8iLCJNdWx0aSIsImFuZCIsIm9yIiwiY29uY2F0IiwidGFibGVBY3Rpb24iLCJpc0RhdGFGaWVsZEZvckFjdGlvbkFic3RyYWN0IiwiS2V5SGVscGVyIiwiZ2VuZXJhdGVLZXlGcm9tRGF0YUZpZWxkIiwiQWN0aW9uVHlwZSIsIkRhdGFGaWVsZEZvckFjdGlvbiIsImFubm90YXRpb25QYXRoIiwiZ2V0RW50aXR5U2V0QmFzZWRBbm5vdGF0aW9uUGF0aCIsIm5vdCIsImdldFJlbGF0aXZlTW9kZWxQYXRoRnVuY3Rpb24iLCJEYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb24iLCJEZWZhdWx0IiwiZ2V0SGlnaGxpZ2h0Um93QmluZGluZyIsImNyaXRpY2FsaXR5QW5ub3RhdGlvbiIsImlzRHJhZnRSb290IiwidGFyZ2V0RW50aXR5VHlwZSIsImRlZmF1bHRIaWdobGlnaHRSb3dEZWZpbml0aW9uIiwiTWVzc2FnZVR5cGUiLCJnZXRNZXNzYWdlVHlwZUZyb21Dcml0aWNhbGl0eVR5cGUiLCJEcmFmdCIsIklzTmV3T2JqZWN0IiwiSW5mb3JtYXRpb24iLCJmb3JtYXRSZXN1bHQiLCJ0YWJsZUZvcm1hdHRlcnMiLCJyb3dIaWdobGlnaHRpbmciLCJfZ2V0Q3JlYXRpb25CZWhhdmlvdXIiLCJ0YWJsZU1hbmlmZXN0Q29uZmlndXJhdGlvbiIsIm5hdmlnYXRpb24iLCJjcmVhdGUiLCJkZXRhaWwiLCJvdXRib3VuZCIsIm91dGJvdW5kRGV0YWlsIiwibmV3QWN0aW9uIiwidGFyZ2V0QW5ub3RhdGlvbnMiLCJnZXRFbnRpdHlTZXQiLCJEcmFmdFJvb3QiLCJOZXdBY3Rpb24iLCJTZXNzaW9uIiwiU3RpY2t5U2Vzc2lvblN1cHBvcnRlZCIsImNyZWF0aW9uTW9kZSIsIkNyZWF0aW9uTW9kZSIsIkNyZWF0aW9uUm93IiwiRXJyb3IiLCJyb3V0ZSIsImFwcGVuZCIsImNyZWF0ZUF0RW5kIiwibmF2aWdhdGVUb1RhcmdldCIsIk5ld1BhZ2UiLCJfZ2V0Um93Q29uZmlndXJhdGlvblByb3BlcnR5IiwidGFyZ2V0UGF0aCIsInByZXNzUHJvcGVydHkiLCJuYXZpZ2F0aW9uVGFyZ2V0IiwiY3JpdGljYWxpdHlQcm9wZXJ0eSIsImRpc3BsYXkiLCJ0YXJnZXQiLCJDcml0aWNhbGl0eSIsIkRyYWZ0Tm9kZSIsInJvd05hdmlnYXRlZEV4cHJlc3Npb24iLCJuYXZpZ2F0ZWRSb3ciLCJwcmVzcyIsInJvd05hdmlnYXRlZCIsImNvbHVtbnNUb0JlQ3JlYXRlZCIsIm5vblNvcnRhYmxlQ29sdW1ucyIsInRhYmxlVHlwZSIsInByb3BlcnR5IiwiZXhpc3RzIiwidGFyZ2V0VHlwZSIsInJlbGF0ZWRQcm9wZXJ0aWVzSW5mbyIsImNvbGxlY3RSZWxhdGVkUHJvcGVydGllcyIsInJlbGF0ZWRQcm9wZXJ0eU5hbWVzIiwiYWRkaXRpb25hbFByb3BlcnR5TmFtZXMiLCJhZGRpdGlvbmFsUHJvcGVydGllcyIsImNvbHVtbkluZm8iLCJnZXRDb2x1bW5EZWZpbml0aW9uRnJvbVByb3BlcnR5Iiwic2VtYW50aWNLZXlzIiwiZ2V0QW5ub3RhdGlvbnNCeVRlcm0iLCJvQ29sdW1uRHJhZnRJbmRpY2F0b3IiLCJnZXREZWZhdWx0RHJhZnRJbmRpY2F0b3JGb3JDb2x1bW4iLCJleHBvcnRTZXR0aW5ncyIsInRlbXBsYXRlIiwiZXhwb3J0U2V0dGluZ3NUZW1wbGF0ZSIsIndyYXAiLCJleHBvcnRTZXR0aW5nc1dyYXBwaW5nIiwiYWRkaXRpb25hbFByb3BlcnR5SW5mb3MiLCJmdWxsUHJvcGVydHlQYXRoIiwidXNlRGF0YUZpZWxkUHJlZml4IiwiYXZhaWxhYmxlRm9yQWRhcHRhdGlvbiIsInJlcGxhY2VTcGVjaWFsQ2hhcnMiLCJzZW1hbnRpY09iamVjdEFubm90YXRpb25QYXRoIiwiZ2V0U2VtYW50aWNPYmplY3RQYXRoIiwiaXNIaWRkZW4iLCJncm91cFBhdGgiLCJfc2xpY2VBdFNsYXNoIiwiaXNHcm91cCIsImlzRGF0YVBvaW50RmFrZVByb3BlcnR5IiwiZXhwb3J0VHlwZSIsIl9nZXRFeHBvcnREYXRhVHlwZSIsInNEYXRlSW5wdXRGb3JtYXQiLCJkYXRhVHlwZSIsImdldERhdGFGaWVsZERhdGFUeXBlIiwicHJvcGVydHlUeXBlQ29uZmlnIiwiZ2V0VHlwZUNvbmZpZyIsIm9UeXBlQ29uZmlnIiwiY2xhc3NOYW1lIiwib0Zvcm1hdE9wdGlvbnMiLCJvQ29uc3RyYWludHMiLCJjb25zdHJhaW50cyIsImdldFRhcmdldFZhbHVlT25EYXRhUG9pbnQiLCJpbnB1dEZvcm1hdCIsInNjYWxlIiwiZGVsaW1pdGVyIiwidHJ1ZVZhbHVlIiwiZmFsc2VWYWx1ZSIsImlzR3JvdXBhYmxlIiwiaXNQcm9wZXJ0eUdyb3VwYWJsZSIsIkFubm90YXRpb24iLCJsYWJlbCIsIl9nZXRMYWJlbCIsImdyb3VwTGFiZWwiLCJncm91cCIsInNlbWFudGljT2JqZWN0UGF0aCIsIkF2YWlsYWJpbGl0eVR5cGUiLCJBZGFwdGF0aW9uIiwiRGF0YUZpZWxkRGVmYXVsdCIsIlRhcmdldCIsIiR0YXJnZXQiLCJzb3J0YWJsZSIsImlzS2V5IiwiY2FzZVNlbnNpdGl2ZSIsImlzRmlsdGVyaW5nQ2FzZVNlbnNpdGl2ZSIsInR5cGVDb25maWciLCJ2aXN1YWxTZXR0aW5ncyIsIndpZHRoQ2FsY3VsYXRpb24iLCJfaXNWYWxpZENvbHVtbiIsIl9nZXRWaXNpYmxlRXhwcmVzc2lvbiIsImRhdGFGaWVsZE1vZGVsUGF0aCIsInJldHVybkV4cHJlc3Npb24iLCJwcm9wZXJ0eVZhbHVlIiwiaXNBbmFseXRpY2FsR3JvdXBIZWFkZXJFeHBhbmRlZCIsImlzQW5hbHl0aWNzIiwiSXNFeHBhbmRlZCIsImlzQW5hbHl0aWNhbExlYWYiLCJOb2RlTGV2ZWwiLCJleHByZXNzaW9uIiwiX2dldEZpZWxkR3JvdXBIaWRkZW5FeHByZXNzaW9ucyIsImRhdGFGaWVsZEdyb3VwIiwiZmllbGRGb3JtYXRPcHRpb25zIiwiYUZpZWxkR3JvdXBIaWRkZW5FeHByZXNzaW9ucyIsIkRhdGEiLCJpbm5lckRhdGFGaWVsZCIsImlzUHJvcGVydHkiLCJkYXRhRmllbGREZWZhdWx0IiwiTGFiZWwiLCJpc0RhdGFGaWVsZFR5cGVzIiwiX2NyZWF0ZVJlbGF0ZWRDb2x1bW5zIiwiZXhpc3RpbmdDb2x1bW5zIiwicmVsYXRlZENvbHVtbnMiLCJyZWxhdGVkUHJvcGVydHlOYW1lTWFwIiwiZ2V0QWJzb2x1dGVBbm5vdGF0aW9uUGF0aCIsInJlbGF0ZWRDb2x1bW4iLCJuZXdOYW1lIiwicHJvcGVydHlJbmZvIiwiX2dldEFubm90YXRpb25Db2x1bW5OYW1lIiwiX2dldFNob3dEYXRhRmllbGRzTGFiZWwiLCJmaWVsZEdyb3VwTmFtZSIsIm9Db2x1bW5zIiwiYUNvbHVtbktleXMiLCJzaG93RGF0YUZpZWxkc0xhYmVsIiwiX2dldFJlbGF0aXZlUGF0aCIsImlzTGFzdFNsYXNoIiwiaXNMYXN0UGFydCIsImlTbGFzaEluZGV4IiwibGFzdEluZGV4T2YiLCJfaXNDb2x1bW5Tb3J0YWJsZSIsInByb3BlcnR5UGF0aCIsImlzU29ydGFibGUiLCJmaWx0ZXJGdW5jdGlvbnMiLCJDYXBhYmlsaXRpZXMiLCJGaWx0ZXJGdW5jdGlvbnMiLCJnZXRFbnRpdHlDb250YWluZXIiLCJpc0FycmF5IiwiZ2V0RGVmYXVsdEZvcm1hdE9wdGlvbnNGb3JUYWJsZSIsInRleHRMaW5lc0VkaXQiLCJiU2VtYW50aWNLZXlGb3VuZCIsImFTZW1hbnRpY0tleVZhbHVlcyIsImkiLCJoYXNEcmFmdEluZGljYXRvciIsInNlbWFudGlja2V5cyIsImdldE5vblNvcnRhYmxlUHJvcGVydGllc1Jlc3RyaWN0aW9ucyIsImxpbmVJdGVtIiwiY29sbGVjdFJlbGF0ZWRQcm9wZXJ0aWVzUmVjdXJzaXZlbHkiLCJzTGFiZWwiLCJpc0ZpZWxkR3JvdXBDb2x1bW4iLCJmaWVsZEdyb3VwSGlkZGVuRXhwcmVzc2lvbnMiLCJ2aXN1YWxTZXR0aW5nc1RvQmVFeGNsdWRlZCIsImV4Y2x1ZGVQcm9wZXJ0aWVzIiwiRmllbGRHcm91cEhpZGRlbkV4cHJlc3Npb25zIiwiaXNEYXRhRmllbGRBbHdheXNIaWRkZW4iLCJIVE1MNSIsIkNzc0RlZmF1bHRzIiwiZXhwb3J0Q29udGFjdFByb3BlcnR5IiwiZXhwb3J0U2V0dGluZ3NDb250YWN0UHJvcGVydHkiLCJfZ2V0UHJvcGVydHlOYW1lcyIsIm1hdGNoZWRQcm9wZXJ0aWVzIiwicmVzb2x2ZVBhdGgiLCJfYXBwZW5kQ3VzdG9tVGVtcGxhdGUiLCJfZ2V0TWFuaWZlc3RPckRlZmF1bHRWYWx1ZSIsImRlZmF1bHRWYWx1ZSIsImlzQW5ub3RhdGlvbkNvbHVtbiIsImludGVybmFsQ29sdW1ucyIsIm1hbmlmZXN0Q29sdW1uIiwidmFsaWRhdGVLZXkiLCJpZCIsImhlYWRlciIsIkhvcml6b250YWxBbGlnbiIsIkJlZ2luIiwiU2xvdCIsInBvc2l0aW9uIiwiYW5jaG9yIiwicGxhY2VtZW50IiwiUGxhY2VtZW50IiwiQWZ0ZXIiLCJpc0FjdGlvbk5hdmlnYWJsZSIsImZpZWxkTGFiZWwiLCJnZXRQMTNuTW9kZSIsInZhcmlhbnRNYW5hZ2VtZW50IiwiZ2V0VmFyaWFudE1hbmFnZW1lbnQiLCJhUGVyc29uYWxpemF0aW9uIiwiYkFuYWx5dGljYWxUYWJsZSIsInBlcnNvbmFsaXphdGlvbiIsInNvcnQiLCJmaWx0ZXIiLCJhZ2dyZWdhdGUiLCJWYXJpYW50TWFuYWdlbWVudFR5cGUiLCJDb250cm9sIiwiZ2V0RGVsZXRlVmlzaWJsZSIsIm5hdmlnYXRpb25QYXRoIiwiaXNUYXJnZXREZWxldGFibGUiLCJjdXJyZW50RW50aXR5U2V0IiwiZGF0YU1vZGVsT2JqZWN0UGF0aCIsInZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMiLCJuYXZpZ2F0aW9uUHJvcGVydGllcyIsIm5hdlByb3AiLCJpc0RlbGV0ZUhpZGRlbkV4cHJlc3Npb24iLCJEZWxldGVIaWRkZW4iLCJzaW5nbGV0b25QYXRoVmlzaXRvciIsImlzRGVsZXRlSGlkZGVuIiwiYklzU3RpY2t5U2Vzc2lvblN1cHBvcnRlZCIsImJJc0RyYWZ0Um9vdCIsImJJc0RyYWZ0Tm9kZSIsImJJc0RyYWZ0UGFyZW50RW50aXR5Rm9yQ29udGFpbm1lbnQiLCJjb250YWluc1RhcmdldCIsImhhc011bHRpcGxlVmlzdWFsaXphdGlvbnMiLCJBbmFseXRpY2FsTGlzdFBhZ2UiLCJMaXN0UmVwb3J0IiwiaXNCaW5kaW5nIiwiZ2V0RW5hYmxlbWVudE1hc3NFZGl0IiwiYk1hc3NFZGl0VmlzaWJsZSIsImlzUGFyZW50VXBkYXRhYmxlIiwiY3VycmVudEVudGl0eVJlc3RyaWN0aW9uIiwib0V4cHJlc3Npb24iLCJnZXRWaXNpYmlsaXR5TWFzc0VkaXQiLCJlbnRpdHlTZXQiLCJiVXBkYXRlSGlkZGVuIiwiVXBkYXRlSGlkZGVuIiwiYk1hc3NFZGl0RW5hYmxlZCIsImVuYWJsZU1hc3NFZGl0IiwiaVNlbGVjdGlvbkxpbWl0Iiwic2VsZWN0aW9uTGltaXQiLCJJc0VkaXRhYmxlIiwiZ2V0Q3JlYXRlVmlzaWJsZSIsImlzSW5zZXJ0YWJsZSIsImlzQ3JlYXRlSGlkZGVuIiwiQ3JlYXRlSGlkZGVuIiwibmV3QWN0aW9uTmFtZSIsInNob3dDcmVhdGVGb3JOZXdBY3Rpb24iLCJnZXRQYXN0ZUVuYWJsZWQiLCJjcmVhdGlvbkJlaGF2aW91ciIsInBhc3RlRW5hYmxlZEluTWFuaWZlc3QiLCJnZXRTb3J0Q29uZGl0aW9ucyIsIm5vblNvcnRhYmxlUHJvcGVydGllcyIsInNvcnRDb25kaXRpb25zIiwiU29ydE9yZGVyIiwic29ydGVycyIsImNvbmRpdGlvbnMiLCJjb25kaXRpb24iLCJjb25kaXRpb25Qcm9wZXJ0eSIsIlByb3BlcnR5IiwiaW5mb05hbWUiLCJjb252ZXJ0UHJvcGVydHlQYXRoc1RvSW5mb05hbWVzIiwiZGVzY2VuZGluZyIsIkRlc2NlbmRpbmciLCJwYXRocyIsImluZm9OYW1lcyIsImN1cnJlbnRQYXRoIiwiR3JvdXBCeSIsImFHcm91cEJ5IiwiYUdyb3VwTGV2ZWxzIiwiZ3JvdXBMZXZlbHMiLCJUb3RhbCIsImFUb3RhbHMiLCJ0aXRsZSIsIlR5cGVOYW1lUGx1cmFsIiwicGFnZU1hbmlmZXN0U2V0dGluZ3MiLCJoYXNBYnNvbHV0ZVBhdGgiLCJwMTNuTW9kZSIsIlRhYmxlSUQiLCJ0aHJlc2hvbGQiLCJNYXhJdGVtcyIsImlzUGF0aEluc2VydGFibGUiLCJpc1NlYXJjaGFibGUiLCJpc1BhdGhTZWFyY2hhYmxlIiwiZW50aXR5TmFtZSIsImNvbGxlY3Rpb24iLCJnZXRUYXJnZXRPYmplY3RQYXRoIiwicm93Iiwic2hvdyIsInBhc3RlIiwiZW5hYmxlUGFzdGUiLCJtYXNzRWRpdCIsImlzSW5EaXNwbGF5TW9kZSIsImF1dG9CaW5kT25Jbml0IiwicGFyZW50RW50aXR5RGVsZXRlRW5hYmxlZCIsInNlYXJjaGFibGUiLCJpc0NvbXBsZXhQcm9wZXJ0eSIsImV4cG9ydERhdGFUeXBlIiwidGVtcGxhdGVUeXBlIiwic3Vic3RyIiwiZ2V0U2VsZWN0aW9uVmFyaWFudENvbmZpZ3VyYXRpb24iLCJzZWxlY3Rpb25WYXJpYW50UGF0aCIsInJlc29sdmVkVGFyZ2V0IiwiZ2V0RW50aXR5VHlwZUFubm90YXRpb24iLCJzZWxlY3Rpb24iLCJwcm9wZXJ0eU5hbWVzIiwiU2VsZWN0T3B0aW9ucyIsInNlbGVjdE9wdGlvbiIsIlByb3BlcnR5TmFtZSIsIlByb3BlcnR5UGF0aCIsInRleHQiLCJjaGVja0NvbmRlbnNlZExheW91dCIsInF1aWNrU2VsZWN0aW9uVmFyaWFudCIsInF1aWNrRmlsdGVyUGF0aHMiLCJlbmFibGVFeHBvcnQiLCJmaWx0ZXJzIiwiZGlzYWJsZUFkZFJvd0J1dHRvbkZvckVtcHR5RGF0YSIsImN1c3RvbVZhbGlkYXRpb25GdW5jdGlvbiIsImNvbmRlbnNlZFRhYmxlTGF5b3V0IiwiaGlkZVRhYmxlVGl0bGUiLCJlbmFibGVGdWxsU2NyZWVuIiwibXVsdGlTZWxlY3RNb2RlIiwiZW5hYmxlQXV0b0NvbHVtbldpZHRoIiwiaXNDb25kZW5zZWRMYXlvdXRDb21wbGlhbnQiLCJxdWlja1ZhcmlhbnRTZWxlY3Rpb24iLCJxdWlja0ZpbHRlcnMiLCJzaG93Q291bnRzIiwiaXNEZXNrdG9wIiwiZ2V0RGlhZ25vc3RpY3MiLCJhZGRJc3N1ZSIsIklzc3VlQ2F0ZWdvcnkiLCJNYW5pZmVzdCIsIklzc3VlU2V2ZXJpdHkiLCJMb3ciLCJJc3N1ZVR5cGUiLCJGVUxMU0NSRUVOTU9ERV9OT1RfT05fTElTVFJFUE9SVCIsInNlbGVjdEFsbCIsInVzZUljb25UYWJCYXIiLCJoZWFkZXJWaXNpYmxlIiwidXNlQ29uZGVuc2VkVGFibGVMYXlvdXQiLCJzaG93Um93Q291bnQiLCJnZXRWaWV3Q29uZmlndXJhdGlvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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akIsR0FFR25rQixnQkFBZ0IsQ0FBQ3VJLGVBQWpCLE9BQXVDLFlBQXZDLElBQXVEb2EsV0FIM0Q7QUFJQTs7QUFDRCxXQUFPO0FBQ055QixNQUFBQSxPQUFPLEVBQUVBLE9BREg7QUFFTnBmLE1BQUFBLElBQUksRUFBRTROLFNBRkE7QUFHTjZSLE1BQUFBLGdCQUFnQixFQUFFQSxnQkFIWjtBQUlOa0IsTUFBQUEsYUFBYSxFQUFFLEVBQUUxQixxQkFBcUIsSUFBSU8sY0FBM0IsQ0FKVDtBQUtOTCxNQUFBQSxZQUFZLEVBQUVBLFlBTFI7QUFNTi9TLE1BQUFBLFlBQVksRUFBRUEsWUFOUjtBQU9OTSxNQUFBQSxXQUFXLEVBQUVBLFdBUFA7QUFRTjJTLE1BQUFBLCtCQUErQixFQUFFQSwrQkFSM0I7QUFTTkMsTUFBQUEsd0JBQXdCLEVBQUVBLHdCQVRwQjtBQVVOc0IsTUFBQUEsdUJBQXVCLEVBQUVyQixvQkFBb0IsSUFBSTljLCtCQVYzQztBQVdOZ1ksTUFBQUEsY0FBYyxFQUFFQSxjQVhWO0FBWU5pRixNQUFBQSxlQUFlLEVBQUVBLGVBWlg7QUFhTi9CLE1BQUFBLFdBQVcsRUFBRUEsV0FiUDtBQWNOa0QsTUFBQUEsWUFBWSxFQUNYLEVBQUM5WCxhQUFELGFBQUNBLGFBQUQseUNBQUNBLGFBQWEsQ0FBRThXLHFCQUFoQixtREFBQyx1QkFBc0NFLFVBQXZDLEtBQXFELDZCQUFDL2tCLGdCQUFnQixDQUFDMkYsa0JBQWpCLEdBQXNDbWdCLG9CQUF0QyxFQUFELG9EQUFDLHdCQUE4RGYsVUFBL0QsQ0FmaEQ7QUFnQk54RixNQUFBQSxjQUFjLEVBQUV4UixhQUFGLGFBQUVBLGFBQUYsdUJBQUVBLGFBQWEsQ0FBRXdSLGNBaEJ6QjtBQWlCTm9GLE1BQUFBLHFCQUFxQixFQUFFQTtBQWpCakIsS0FBUDtBQW1CQSIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcblx0Q3JpdGljYWxpdHlUeXBlLFxuXHREYXRhRmllbGQsXG5cdERhdGFGaWVsZEFic3RyYWN0VHlwZXMsXG5cdERhdGFGaWVsZEZvckFjdGlvbixcblx0RGF0YUZpZWxkRm9yQW5ub3RhdGlvbixcblx0RGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uLFxuXHREYXRhRmllbGRUeXBlcyxcblx0RGF0YVBvaW50LFxuXHREYXRhUG9pbnRUeXBlVHlwZXMsXG5cdEVudW1WYWx1ZSxcblx0TGluZUl0ZW0sXG5cdFBhdGhBbm5vdGF0aW9uRXhwcmVzc2lvbixcblx0UHJlc2VudGF0aW9uVmFyaWFudFR5cGVUeXBlcyxcblx0UHJvcGVydHlBbm5vdGF0aW9uVmFsdWUsXG5cdFByb3BlcnR5UGF0aCxcblx0U2VsZWN0aW9uVmFyaWFudFR5cGUsXG5cdFNlbGVjdE9wdGlvblR5cGUsXG5cdFVJQW5ub3RhdGlvblR5cGVzXG59IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlc1wiO1xuaW1wb3J0IHtcblx0QWN0aW9uVHlwZSxcblx0QXZhaWxhYmlsaXR5VHlwZSxcblx0Q3JlYXRpb25Nb2RlLFxuXHRGb3JtYXRPcHRpb25zVHlwZSxcblx0SG9yaXpvbnRhbEFsaWduLFxuXHRNYW5pZmVzdFRhYmxlQ29sdW1uLFxuXHROYXZpZ2F0aW9uU2V0dGluZ3NDb25maWd1cmF0aW9uLFxuXHROYXZpZ2F0aW9uVGFyZ2V0Q29uZmlndXJhdGlvbixcblx0U2VsZWN0aW9uTW9kZSxcblx0VGFibGVDb2x1bW5TZXR0aW5ncyxcblx0VGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb24sXG5cdFRlbXBsYXRlVHlwZSxcblx0VmFyaWFudE1hbmFnZW1lbnRUeXBlLFxuXHRWaWV3UGF0aENvbmZpZ3VyYXRpb24sXG5cdFZpc3VhbGl6YXRpb25UeXBlXG59IGZyb20gXCIuLi8uLi9NYW5pZmVzdFNldHRpbmdzXCI7XG5pbXBvcnQgeyBFbnRpdHlUeXBlLCBQcm9wZXJ0eSB9IGZyb20gXCJAc2FwLXV4L2Fubm90YXRpb24tY29udmVydGVyXCI7XG5pbXBvcnQgeyBUYWJsZUlEIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvSURcIjtcbmltcG9ydCB7XG5cdEFubm90YXRpb25BY3Rpb24sXG5cdEJhc2VBY3Rpb24sXG5cdEN1c3RvbUFjdGlvbixcblx0Z2V0QWN0aW9uc0Zyb21NYW5pZmVzdCxcblx0aXNBY3Rpb25OYXZpZ2FibGUsXG5cdHJlbW92ZUR1cGxpY2F0ZUFjdGlvbnNcbn0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvY29udHJvbHMvQ29tbW9uL0FjdGlvblwiO1xuaW1wb3J0IHsgQ29uZmlndXJhYmxlT2JqZWN0LCBDdXN0b21FbGVtZW50LCBpbnNlcnRDdXN0b21FbGVtZW50cywgUGxhY2VtZW50IH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9Db25maWd1cmFibGVPYmplY3RcIjtcbmltcG9ydCB7XG5cdGNvbGxlY3RSZWxhdGVkUHJvcGVydGllcyxcblx0Y29sbGVjdFJlbGF0ZWRQcm9wZXJ0aWVzUmVjdXJzaXZlbHksXG5cdENvbXBsZXhQcm9wZXJ0eUluZm8sXG5cdGdldERhdGFGaWVsZERhdGFUeXBlLFxuXHRnZXRTZW1hbnRpY09iamVjdFBhdGgsXG5cdGlzRGF0YUZpZWxkQWx3YXlzSGlkZGVuLFxuXHRpc0RhdGFGaWVsZEZvckFjdGlvbkFic3RyYWN0LFxuXHRpc0RhdGFGaWVsZFR5cGVzXG59IGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL2Fubm90YXRpb25zL0RhdGFGaWVsZFwiO1xuaW1wb3J0IHtcblx0YW5kLFxuXHRhbm5vdGF0aW9uRXhwcmVzc2lvbixcblx0QmluZGluZ0V4cHJlc3Npb24sXG5cdGJpbmRpbmdFeHByZXNzaW9uLFxuXHRCaW5kaW5nRXhwcmVzc2lvbkV4cHJlc3Npb24sXG5cdGNvbXBpbGVCaW5kaW5nLFxuXHRjb25zdGFudCxcblx0ZXF1YWwsXG5cdEV4cHJlc3Npb24sXG5cdEV4cHJlc3Npb25PclByaW1pdGl2ZSxcblx0Zm9ybWF0UmVzdWx0LFxuXHRpZkVsc2UsXG5cdGlzQmluZGluZyxcblx0aXNDb25zdGFudCxcblx0bm90LFxuXHRvcixcblx0cmVzb2x2ZUJpbmRpbmdTdHJpbmdcbn0gZnJvbSBcInNhcC9mZS9jb3JlL2hlbHBlcnMvQmluZGluZ0V4cHJlc3Npb25cIjtcbmltcG9ydCB7IERyYWZ0LCBiaW5kaW5nQ29udGV4dFBhdGhWaXNpdG9yLCBzaW5nbGV0b25QYXRoVmlzaXRvciwgVUkgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9oZWxwZXJzL0JpbmRpbmdIZWxwZXJcIjtcbmltcG9ydCB7IEtleUhlbHBlciB9IGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL2hlbHBlcnMvS2V5XCI7XG5pbXBvcnQgdGFibGVGb3JtYXR0ZXJzIGZyb20gXCJzYXAvZmUvY29yZS9mb3JtYXR0ZXJzL1RhYmxlRm9ybWF0dGVyXCI7XG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gXCJzYXAvZmUvY29yZS9mb3JtYXR0ZXJzL1RhYmxlRm9ybWF0dGVyVHlwZXNcIjtcbmltcG9ydCB7XG5cdERhdGFNb2RlbE9iamVjdFBhdGgsXG5cdGdldFRhcmdldE9iamVjdFBhdGgsXG5cdGlzUGF0aERlbGV0YWJsZSxcblx0aXNQYXRoU2VhcmNoYWJsZSxcblx0aXNQYXRoSW5zZXJ0YWJsZSxcblx0aXNQYXRoVXBkYXRhYmxlXG59IGZyb20gXCJzYXAvZmUvY29yZS90ZW1wbGF0aW5nL0RhdGFNb2RlbFBhdGhIZWxwZXJcIjtcbmltcG9ydCB7IHJlcGxhY2VTcGVjaWFsQ2hhcnMgfSBmcm9tIFwic2FwL2ZlL2NvcmUvaGVscGVycy9TdGFibGVJZEhlbHBlclwiO1xuaW1wb3J0IHsgSXNzdWVDYXRlZ29yeSwgSXNzdWVTZXZlcml0eSwgSXNzdWVUeXBlIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9Jc3N1ZU1hbmFnZXJcIjtcblxuaW1wb3J0IE1hbmlmZXN0V3JhcHBlciBmcm9tIFwiLi4vLi4vTWFuaWZlc3RXcmFwcGVyXCI7XG5pbXBvcnQgQ29udmVydGVyQ29udGV4dCBmcm9tIFwiLi4vLi4vQ29udmVydGVyQ29udGV4dFwiO1xuaW1wb3J0IHtcblx0aXNQcm9wZXJ0eSxcblx0Z2V0QXNzb2NpYXRlZFVuaXRQcm9wZXJ0eSxcblx0Z2V0QXNzb2NpYXRlZEN1cnJlbmN5UHJvcGVydHksXG5cdGlzUGF0aEV4cHJlc3Npb24sXG5cdGdldFRhcmdldFZhbHVlT25EYXRhUG9pbnRcbn0gZnJvbSBcInNhcC9mZS9jb3JlL3RlbXBsYXRpbmcvUHJvcGVydHlIZWxwZXJcIjtcbmltcG9ydCB7IEFnZ3JlZ2F0aW9uSGVscGVyIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvQWdncmVnYXRpb25cIjtcbmltcG9ydCB7IERpc3BsYXlNb2RlLCBnZXREaXNwbGF5TW9kZSwgZ2V0VHlwZUNvbmZpZyB9IGZyb20gXCJzYXAvZmUvY29yZS90ZW1wbGF0aW5nL1VJRm9ybWF0dGVyc1wiO1xuaW1wb3J0IHsgZ2V0TWVzc2FnZVR5cGVGcm9tQ3JpdGljYWxpdHlUeXBlIH0gZnJvbSBcIi4vQ3JpdGljYWxpdHlcIjtcbmltcG9ydCB7IEZpbHRlckZ1bmN0aW9ucyB9IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlcy9kaXN0L2dlbmVyYXRlZC9DYXBhYmlsaXRpZXNcIjtcbmltcG9ydCB7IGdldE5vblNvcnRhYmxlUHJvcGVydGllc1Jlc3RyaWN0aW9ucyB9IGZyb20gXCJzYXAvZmUvY29yZS90ZW1wbGF0aW5nL0VudGl0eVNldEhlbHBlclwiO1xuXG5leHBvcnQgdHlwZSBUYWJsZUFubm90YXRpb25Db25maWd1cmF0aW9uID0ge1xuXHRhdXRvQmluZE9uSW5pdDogYm9vbGVhbjtcblx0Y29sbGVjdGlvbjogc3RyaW5nO1xuXHR2YXJpYW50TWFuYWdlbWVudDogVmFyaWFudE1hbmFnZW1lbnRUeXBlO1xuXHRmaWx0ZXJJZD86IHN0cmluZztcblx0aWQ6IHN0cmluZztcblx0bmF2aWdhdGlvblBhdGg6IHN0cmluZztcblx0cDEzbk1vZGU/OiBzdHJpbmc7XG5cdHJvdz86IHtcblx0XHRhY3Rpb24/OiBzdHJpbmc7XG5cdFx0cHJlc3M/OiBzdHJpbmc7XG5cdFx0cm93SGlnaGxpZ2h0aW5nOiBCaW5kaW5nRXhwcmVzc2lvbjxNZXNzYWdlVHlwZT47XG5cdFx0cm93TmF2aWdhdGVkOiBCaW5kaW5nRXhwcmVzc2lvbjxib29sZWFuPjtcblx0fTtcblx0c2VsZWN0aW9uTW9kZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXHRzaG93Pzoge1xuXHRcdGNyZWF0ZT86IHN0cmluZyB8IGJvb2xlYW47XG5cdFx0ZGVsZXRlPzogc3RyaW5nIHwgYm9vbGVhbjtcblx0XHRwYXN0ZT86IEJpbmRpbmdFeHByZXNzaW9uPGJvb2xlYW4+O1xuXHRcdG1hc3NFZGl0PzogeyB2aXNpYmxlOiBib29sZWFuIHwgc3RyaW5nOyBlbmFibGVkOiBib29sZWFuIHwgc3RyaW5nIH07XG5cdH07XG5cdGRpc3BsYXlNb2RlPzogYm9vbGVhbjtcblx0dGhyZXNob2xkOiBudW1iZXI7XG5cdGVudGl0eU5hbWU6IHN0cmluZztcblx0c29ydENvbmRpdGlvbnM/OiBzdHJpbmc7XG5cdGdyb3VwQ29uZGl0aW9ucz86IHN0cmluZztcblx0YWdncmVnYXRlQ29uZGl0aW9ucz86IHN0cmluZztcblxuXHQvKiogQ3JlYXRlIG5ldyBlbnRyaWVzICovXG5cdGNyZWF0ZTogQ3JlYXRlQmVoYXZpb3VyIHwgQ3JlYXRlQmVoYXZpb3VyRXh0ZXJuYWw7XG5cdHBhcmVudEVudGl0eURlbGV0ZUVuYWJsZWQ/OiBCaW5kaW5nRXhwcmVzc2lvbjxib29sZWFuPjtcblx0dGl0bGU6IHN0cmluZztcblx0c2VhcmNoYWJsZTogYm9vbGVhbjtcbn07XG5cbi8qKlxuICogTmV3IGVudHJpZXMgYXJlIGNyZWF0ZWQgd2l0aGluIHRoZSBhcHAgKGRlZmF1bHQgY2FzZSlcbiAqL1xudHlwZSBDcmVhdGVCZWhhdmlvdXIgPSB7XG5cdG1vZGU6IENyZWF0aW9uTW9kZTtcblx0YXBwZW5kOiBCb29sZWFuO1xuXHRuZXdBY3Rpb24/OiBzdHJpbmc7XG5cdG5hdmlnYXRlVG9UYXJnZXQ/OiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIE5ldyBlbnRyaWVzIGFyZSBjcmVhdGVkIGJ5IG5hdmlnYXRpbmcgdG8gc29tZSB0YXJnZXRcbiAqL1xudHlwZSBDcmVhdGVCZWhhdmlvdXJFeHRlcm5hbCA9IHtcblx0bW9kZTogXCJFeHRlcm5hbFwiO1xuXHRvdXRib3VuZDogc3RyaW5nO1xuXHRvdXRib3VuZERldGFpbDogTmF2aWdhdGlvblRhcmdldENvbmZpZ3VyYXRpb25bXCJvdXRib3VuZERldGFpbFwiXTtcblx0bmF2aWdhdGlvblNldHRpbmdzOiBOYXZpZ2F0aW9uU2V0dGluZ3NDb25maWd1cmF0aW9uO1xufTtcblxuZXhwb3J0IHR5cGUgVGFibGVDYXBhYmlsaXR5UmVzdHJpY3Rpb24gPSB7XG5cdGlzRGVsZXRhYmxlOiBib29sZWFuO1xuXHRpc1VwZGF0YWJsZTogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCB0eXBlIFRhYmxlRmlsdGVyc0NvbmZpZ3VyYXRpb24gPSB7XG5cdGVuYWJsZWQ/OiBzdHJpbmcgfCBib29sZWFuO1xuXHRwYXRoczogW1xuXHRcdHtcblx0XHRcdGFubm90YXRpb25QYXRoOiBzdHJpbmc7XG5cdFx0fVxuXHRdO1xuXHRzaG93Q291bnRzPzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCB0eXBlIFNlbGVjdGlvblZhcmlhbnRDb25maWd1cmF0aW9uID0ge1xuXHRwcm9wZXJ0eU5hbWVzOiBzdHJpbmdbXTtcblx0dGV4dD86IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFRhYmxlQ29udHJvbENvbmZpZ3VyYXRpb24gPSB7XG5cdGNyZWF0ZUF0RW5kOiBib29sZWFuO1xuXHRjcmVhdGlvbk1vZGU6IENyZWF0aW9uTW9kZTtcblx0ZGlzYWJsZUFkZFJvd0J1dHRvbkZvckVtcHR5RGF0YTogYm9vbGVhbjtcblx0Y3VzdG9tVmFsaWRhdGlvbkZ1bmN0aW9uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cdHVzZUNvbmRlbnNlZFRhYmxlTGF5b3V0OiBib29sZWFuO1xuXHRlbmFibGVFeHBvcnQ6IGJvb2xlYW47XG5cdGhlYWRlclZpc2libGU6IGJvb2xlYW47XG5cdGZpbHRlcnM/OiBSZWNvcmQ8c3RyaW5nLCBUYWJsZUZpbHRlcnNDb25maWd1cmF0aW9uPjtcblx0dHlwZTogVGFibGVUeXBlO1xuXHRzZWxlY3RBbGw/OiBib29sZWFuO1xuXHRzZWxlY3Rpb25MaW1pdDogbnVtYmVyO1xuXHRtdWx0aVNlbGVjdE1vZGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcblx0ZW5hYmxlUGFzdGU6IGJvb2xlYW47XG5cdGVuYWJsZUZ1bGxTY3JlZW46IGJvb2xlYW47XG5cdHNob3dSb3dDb3VudDogYm9vbGVhbjtcblx0ZW5hYmxlTWFzc0VkaXQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cdGVuYWJsZUF1dG9Db2x1bW5XaWR0aDogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCB0eXBlIFRhYmxlVHlwZSA9IFwiR3JpZFRhYmxlXCIgfCBcIlJlc3BvbnNpdmVUYWJsZVwiIHwgXCJBbmFseXRpY2FsVGFibGVcIjtcblxuZW51bSBDb2x1bW5UeXBlIHtcblx0RGVmYXVsdCA9IFwiRGVmYXVsdFwiLCAvLyBEZWZhdWx0IFR5cGVcblx0QW5ub3RhdGlvbiA9IFwiQW5ub3RhdGlvblwiLFxuXHRTbG90ID0gXCJTbG90XCJcbn1cblxuZXhwb3J0IHR5cGUgQmFzZVRhYmxlQ29sdW1uID0gQ29uZmlndXJhYmxlT2JqZWN0ICYge1xuXHRpZDogc3RyaW5nO1xuXHR3aWR0aD86IHN0cmluZztcblx0bmFtZTogc3RyaW5nO1xuXHRhdmFpbGFiaWxpdHk/OiBBdmFpbGFiaWxpdHlUeXBlO1xuXHR0eXBlOiBDb2x1bW5UeXBlOyAvL09yaWdpbiBvZiB0aGUgc291cmNlIHdoZXJlIHdlIGFyZSBnZXR0aW5nIHRoZSB0ZW1wbGF0ZWQgaW5mb3JtYXRpb24gZnJvbSxcblx0aXNOYXZpZ2FibGU/OiBib29sZWFuO1xuXHRzZXR0aW5ncz86IFRhYmxlQ29sdW1uU2V0dGluZ3M7XG5cdHNlbWFudGljT2JqZWN0UGF0aD86IHN0cmluZztcblx0cHJvcGVydHlJbmZvcz86IHN0cmluZ1tdO1xuXHRjYXNlU2Vuc2l0aXZlPzogYm9vbGVhbjtcblx0c29ydGFibGU6IGJvb2xlYW47XG5cdGhvcml6b250YWxBbGlnbj86IEhvcml6b250YWxBbGlnbjtcblx0Zm9ybWF0T3B0aW9uczogRm9ybWF0T3B0aW9uc1R5cGU7XG59O1xuXG5leHBvcnQgdHlwZSBDdXN0b21UYWJsZUNvbHVtbiA9IEJhc2VUYWJsZUNvbHVtbiAmIHtcblx0aGVhZGVyPzogc3RyaW5nO1xuXHR0ZW1wbGF0ZTogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgQW5ub3RhdGlvblRhYmxlQ29sdW1uID0gQmFzZVRhYmxlQ29sdW1uICYge1xuXHRhbm5vdGF0aW9uUGF0aDogc3RyaW5nO1xuXHRyZWxhdGl2ZVBhdGg6IHN0cmluZztcblx0bGFiZWw/OiBzdHJpbmc7XG5cdGdyb3VwTGFiZWw/OiBzdHJpbmc7XG5cdGdyb3VwPzogc3RyaW5nO1xuXHRpc0dyb3VwYWJsZT86IGJvb2xlYW47XG5cdEZpZWxkR3JvdXBIaWRkZW5FeHByZXNzaW9ucz86IEJpbmRpbmdFeHByZXNzaW9uPHN0cmluZz47XG5cdHNob3dEYXRhRmllbGRzTGFiZWw/OiBib29sZWFuO1xuXHRpc0tleT86IGJvb2xlYW47XG5cdHVuaXQ/OiBzdHJpbmc7XG5cdGV4cG9ydFNldHRpbmdzPzoge1xuXHRcdHRlbXBsYXRlPzogc3RyaW5nO1xuXHRcdGxhYmVsPzogc3RyaW5nO1xuXHRcdGZpZWxkTGFiZWw/OiBzdHJpbmc7XG5cdFx0d3JhcD86IGJvb2xlYW47XG5cdFx0dHlwZT86IHN0cmluZztcblx0XHRpbnB1dEZvcm1hdD86IHN0cmluZztcblx0XHRmb3JtYXQ/OiBzdHJpbmc7XG5cdFx0c2NhbGU/OiBudW1iZXI7XG5cdFx0ZGVsaW1pdGVyPzogYm9vbGVhbjtcblx0XHR0cnVlVmFsdWU/OiBib29sZWFuO1xuXHRcdGZhbHNlVmFsdWU/OiBib29sZWFuO1xuXHR9O1xuXHRpc0RhdGFQb2ludEZha2VUYXJnZXRQcm9wZXJ0eT86IGJvb2xlYW47XG5cdHRleHRBcnJhbmdlbWVudD86IHtcblx0XHR0ZXh0UHJvcGVydHk6IHN0cmluZztcblx0XHRtb2RlOiBEaXNwbGF5TW9kZTtcblx0fTtcblx0ZXhwb3J0Q29udGFjdFByb3BlcnR5Pzogc3RyaW5nO1xuXHRhZGRpdGlvbmFsUHJvcGVydHlJbmZvcz86IHN0cmluZ1tdO1xuXHR2aXN1YWxTZXR0aW5ncz86IFZpc3VhbFNldHRpbmdzO1xuXHR0eXBlQ29uZmlnPzogb2JqZWN0O1xufTtcblxuZXhwb3J0IHR5cGUgVmlzdWFsU2V0dGluZ3MgPSB7XG5cdHdpZHRoQ2FsY3VsYXRpb24/OiBXaWR0aENhbGN1bGF0aW9uO1xufTtcblxuZXhwb3J0IHR5cGUgV2lkdGhDYWxjdWxhdGlvbiA9IG51bGwgfCB7XG5cdG1pbldpZHRoPzogbnVtYmVyO1xuXHRtYXhXaWR0aD86IG51bWJlcjtcblx0ZGVmYXVsdFdpZHRoPzogbnVtYmVyO1xuXHRpbmNsdWRlTGFiZWw/OiBib29sZWFuO1xuXHRnYXA/OiBudW1iZXI7XG5cdC8vIG9ubHkgcmVsZXZhbnQgZm9yIGNvbXBsZXggdHlwZXNcblx0ZXhjbHVkZVByb3BlcnRpZXM/OiBzdHJpbmcgfCBzdHJpbmdbXTtcblx0dmVydGljYWxBcnJhbmdlbWVudD86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgdHlwZSBUYWJsZUNvbHVtbiA9IEN1c3RvbVRhYmxlQ29sdW1uIHwgQW5ub3RhdGlvblRhYmxlQ29sdW1uO1xuXG5leHBvcnQgdHlwZSBDdXN0b21Db2x1bW4gPSBDdXN0b21FbGVtZW50PFRhYmxlQ29sdW1uPjtcblxuZXhwb3J0IHR5cGUgQWdncmVnYXRlRGF0YSA9IHtcblx0ZGVmYXVsdEFnZ3JlZ2F0ZToge1xuXHRcdGNvbnRleHREZWZpbmluZ1Byb3BlcnRpZXM/OiBzdHJpbmdbXTtcblx0fTtcblx0cmVsYXRpdmVQYXRoOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBUYWJsZVZpc3VhbGl6YXRpb24gPSB7XG5cdHR5cGU6IFZpc3VhbGl6YXRpb25UeXBlLlRhYmxlO1xuXHRhbm5vdGF0aW9uOiBUYWJsZUFubm90YXRpb25Db25maWd1cmF0aW9uO1xuXHRjb250cm9sOiBUYWJsZUNvbnRyb2xDb25maWd1cmF0aW9uO1xuXHRjb2x1bW5zOiBUYWJsZUNvbHVtbltdO1xuXHRhY3Rpb25zOiBCYXNlQWN0aW9uW107XG5cdGFnZ3JlZ2F0ZXM/OiBSZWNvcmQ8c3RyaW5nLCBBZ2dyZWdhdGVEYXRhPjtcblx0ZW5hYmxlQW5hbHl0aWNzPzogYm9vbGVhbjtcblx0ZW5hYmxlRGF0YVN0YXRlRmlsdGVyOiBib29sZWFuO1xuXHRvcGVyYXRpb25BdmFpbGFibGVNYXA6IHN0cmluZztcblx0b3BlcmF0aW9uQXZhaWxhYmxlUHJvcGVydGllczogc3RyaW5nO1xufTtcblxudHlwZSBTb3J0ZXJUeXBlID0ge1xuXHRuYW1lOiBzdHJpbmc7XG5cdGRlc2NlbmRpbmc6IGJvb2xlYW47XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgYWxsIGFubm90YXRpb24tYmFzZWQgYW5kIG1hbmlmZXN0LWJhc2VkIHRhYmxlIGFjdGlvbnMuXG4gKlxuICogQHBhcmFtIHtMaW5lSXRlbX0gbGluZUl0ZW1Bbm5vdGF0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gdmlzdWFsaXphdGlvblBhdGhcbiAqIEBwYXJhbSB7Q29udmVydGVyQ29udGV4dH0gY29udmVydGVyQ29udGV4dFxuICogQHBhcmFtIHtOYXZpZ2F0aW9uU2V0dGluZ3NDb25maWd1cmF0aW9ufSBuYXZpZ2F0aW9uU2V0dGluZ3NcbiAqIEByZXR1cm5zIHtCYXNlQWN0aW9ufSBUaGUgY29tcGxldGUgdGFibGUgYWN0aW9uc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFibGVBY3Rpb25zKFxuXHRsaW5lSXRlbUFubm90YXRpb246IExpbmVJdGVtLFxuXHR2aXN1YWxpemF0aW9uUGF0aDogc3RyaW5nLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHRuYXZpZ2F0aW9uU2V0dGluZ3M/OiBOYXZpZ2F0aW9uU2V0dGluZ3NDb25maWd1cmF0aW9uXG4pOiBCYXNlQWN0aW9uW10ge1xuXHRjb25zdCBhVGFibGVBY3Rpb25zID0gZ2V0VGFibGVBbm5vdGF0aW9uQWN0aW9ucyhsaW5lSXRlbUFubm90YXRpb24sIHZpc3VhbGl6YXRpb25QYXRoLCBjb252ZXJ0ZXJDb250ZXh0KTtcblx0Y29uc3QgYUFubm90YXRpb25BY3Rpb25zID0gYVRhYmxlQWN0aW9ucy50YWJsZUFjdGlvbnM7XG5cdGNvbnN0IGFIaWRkZW5BY3Rpb25zID0gYVRhYmxlQWN0aW9ucy5oaWRkZW5UYWJsZUFjdGlvbnM7XG5cdHJldHVybiBpbnNlcnRDdXN0b21FbGVtZW50cyhcblx0XHRhQW5ub3RhdGlvbkFjdGlvbnMsXG5cdFx0Z2V0QWN0aW9uc0Zyb21NYW5pZmVzdChcblx0XHRcdGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RDb250cm9sQ29uZmlndXJhdGlvbih2aXN1YWxpemF0aW9uUGF0aCkuYWN0aW9ucyxcblx0XHRcdGNvbnZlcnRlckNvbnRleHQsXG5cdFx0XHRhQW5ub3RhdGlvbkFjdGlvbnMsXG5cdFx0XHRuYXZpZ2F0aW9uU2V0dGluZ3MsXG5cdFx0XHR0cnVlLFxuXHRcdFx0YUhpZGRlbkFjdGlvbnNcblx0XHQpLFxuXHRcdHtcblx0XHRcdGlzTmF2aWdhYmxlOiBcIm92ZXJ3cml0ZVwiLFxuXHRcdFx0ZW5hYmxlT25TZWxlY3Q6IFwib3ZlcndyaXRlXCIsXG5cdFx0XHRlbmFibGVBdXRvU2Nyb2xsOiBcIm92ZXJ3cml0ZVwiLFxuXHRcdFx0ZW5hYmxlZDogXCJvdmVyd3JpdGVcIixcblx0XHRcdGRlZmF1bHRWYWx1ZXNFeHRlbnNpb25GdW5jdGlvbjogXCJvdmVyd3JpdGVcIlxuXHRcdH1cblx0KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIGFsbCBjb2x1bW5zLCBhbm5vdGF0aW9uLWJhc2VkIGFzIHdlbGwgYXMgbWFuaWZlc3QgYmFzZWQuXG4gKiBUaGV5IGFyZSBzb3J0ZWQgYW5kIHNvbWUgcHJvcGVydGllcyBjYW4gYmUgb3ZlcndyaXR0ZW4gdmlhIHRoZSBtYW5pZmVzdCAoY2hlY2sgb3V0IHRoZSBrZXlzIHRoYXQgY2FuIGJlIG92ZXJ3cml0dGVuKS5cbiAqXG4gKiBAcGFyYW0ge0xpbmVJdGVtfSBsaW5lSXRlbUFubm90YXRpb24gQ29sbGVjdGlvbiBvZiBkYXRhIGZpZWxkcyBmb3IgcmVwcmVzZW50YXRpb24gaW4gYSB0YWJsZSBvciBsaXN0XG4gKiBAcGFyYW0ge3N0cmluZ30gdmlzdWFsaXphdGlvblBhdGhcbiAqIEBwYXJhbSB7Q29udmVydGVyQ29udGV4dH0gY29udmVydGVyQ29udGV4dFxuICogQHBhcmFtIHtOYXZpZ2F0aW9uU2V0dGluZ3NDb25maWd1cmF0aW9ufSBuYXZpZ2F0aW9uU2V0dGluZ3NcbiAqIEByZXR1cm5zIHtUYWJsZUNvbHVtbltdfSBSZXR1cm5zIGFsbCB0YWJsZSBjb2x1bW5zIHRoYXQgc2hvdWxkIGJlIGF2YWlsYWJsZSwgcmVnYXJkbGVzcyBvZiB0ZW1wbGF0aW5nIG9yIHBlcnNvbmFsaXphdGlvbiBvciB0aGVpciBvcmlnaW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRhYmxlQ29sdW1ucyhcblx0bGluZUl0ZW1Bbm5vdGF0aW9uOiBMaW5lSXRlbSxcblx0dmlzdWFsaXphdGlvblBhdGg6IHN0cmluZyxcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCxcblx0bmF2aWdhdGlvblNldHRpbmdzPzogTmF2aWdhdGlvblNldHRpbmdzQ29uZmlndXJhdGlvblxuKTogVGFibGVDb2x1bW5bXSB7XG5cdGNvbnN0IGFubm90YXRpb25Db2x1bW5zID0gZ2V0Q29sdW1uc0Zyb21Bbm5vdGF0aW9ucyhsaW5lSXRlbUFubm90YXRpb24sIHZpc3VhbGl6YXRpb25QYXRoLCBjb252ZXJ0ZXJDb250ZXh0KTtcblx0Y29uc3QgbWFuaWZlc3RDb2x1bW5zID0gZ2V0Q29sdW1uc0Zyb21NYW5pZmVzdChcblx0XHRjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0Q29udHJvbENvbmZpZ3VyYXRpb24odmlzdWFsaXphdGlvblBhdGgpLmNvbHVtbnMsXG5cdFx0YW5ub3RhdGlvbkNvbHVtbnMgYXMgQW5ub3RhdGlvblRhYmxlQ29sdW1uW10sXG5cdFx0Y29udmVydGVyQ29udGV4dCxcblx0XHRjb252ZXJ0ZXJDb250ZXh0LmdldEFubm90YXRpb25FbnRpdHlUeXBlKGxpbmVJdGVtQW5ub3RhdGlvbiksXG5cdFx0bmF2aWdhdGlvblNldHRpbmdzXG5cdCk7XG5cblx0cmV0dXJuIGluc2VydEN1c3RvbUVsZW1lbnRzKGFubm90YXRpb25Db2x1bW5zLCBtYW5pZmVzdENvbHVtbnMsIHtcblx0XHR3aWR0aDogXCJvdmVyd3JpdGVcIixcblx0XHRpc05hdmlnYWJsZTogXCJvdmVyd3JpdGVcIixcblx0XHRhdmFpbGFiaWxpdHk6IFwib3ZlcndyaXRlXCIsXG5cdFx0c2V0dGluZ3M6IFwib3ZlcndyaXRlXCIsXG5cdFx0aG9yaXpvbnRhbEFsaWduOiBcIm92ZXJ3cml0ZVwiLFxuXHRcdGZvcm1hdE9wdGlvbnM6IFwib3ZlcndyaXRlXCJcblx0fSk7XG59XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIGN1c3RvbSBhZ2dyZWdhdGlvbiBkZWZpbml0aW9ucyBmcm9tIHRoZSBlbnRpdHlUeXBlLlxuICpcbiAqIEBwYXJhbSBlbnRpdHlUeXBlIFRoZSB0YXJnZXQgZW50aXR5IHR5cGUuXG4gKiBAcGFyYW0gdGFibGVDb2x1bW5zIFRoZSBhcnJheSBvZiBjb2x1bW5zIGZvciB0aGUgZW50aXR5IHR5cGUuXG4gKiBAcGFyYW0gY29udmVydGVyQ29udGV4dCBUaGUgY29udmVydGVyIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgYWdncmVnYXRlIGRlZmluaXRpb25zIGZyb20gdGhlIGVudGl0eVR5cGUsIG9yIHVuZGVmaW5lZCBpZiB0aGUgZW50aXR5IGRvZXNuJ3Qgc3VwcG9ydCBhbmFseXRpY2FsIHF1ZXJpZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRBZ2dyZWdhdGVEZWZpbml0aW9uc0Zyb21FbnRpdHlUeXBlID0gZnVuY3Rpb24oXG5cdGVudGl0eVR5cGU6IEVudGl0eVR5cGUsXG5cdHRhYmxlQ29sdW1uczogVGFibGVDb2x1bW5bXSxcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dFxuKTogUmVjb3JkPHN0cmluZywgQWdncmVnYXRlRGF0YT4gfCB1bmRlZmluZWQge1xuXHRjb25zdCBhZ2dyZWdhdGlvbkhlbHBlciA9IG5ldyBBZ2dyZWdhdGlvbkhlbHBlcihlbnRpdHlUeXBlLCBjb252ZXJ0ZXJDb250ZXh0KTtcblxuXHRmdW5jdGlvbiBmaW5kQ29sdW1uRnJvbVBhdGgocGF0aDogc3RyaW5nKTogVGFibGVDb2x1bW4gfCB1bmRlZmluZWQge1xuXHRcdHJldHVybiB0YWJsZUNvbHVtbnMuZmluZChjb2x1bW4gPT4ge1xuXHRcdFx0Y29uc3QgYW5ub3RhdGlvbkNvbHVtbiA9IGNvbHVtbiBhcyBBbm5vdGF0aW9uVGFibGVDb2x1bW47XG5cdFx0XHRyZXR1cm4gYW5ub3RhdGlvbkNvbHVtbi5wcm9wZXJ0eUluZm9zID09PSB1bmRlZmluZWQgJiYgYW5ub3RhdGlvbkNvbHVtbi5yZWxhdGl2ZVBhdGggPT09IHBhdGg7XG5cdFx0fSk7XG5cdH1cblxuXHRpZiAoIWFnZ3JlZ2F0aW9uSGVscGVyLmlzQW5hbHl0aWNzU3VwcG9ydGVkKCkpIHtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0Ly8gS2VlcCBhIHNldCBvZiBhbGwgY3VycmVuY3kvdW5pdCBwcm9wZXJ0aWVzLCBhcyB3ZSBkb24ndCB3YW50IHRvIGNvbnNpZGVyIHRoZW0gYXMgYWdncmVnYXRlc1xuXHQvLyBUaGV5IGFyZSBhZ2dyZWdhdGVzIGZvciB0ZWNobmljYWwgcmVhc29ucyAodG8gbWFuYWdlIG11bHRpLXVuaXRzIHNpdHVhdGlvbnMpIGJ1dCBpdCBkb2Vzbid0IG1ha2Ugc2Vuc2UgZnJvbSBhIHVzZXIgc3RhbmRwb2ludFxuXHRjb25zdCBtQ3VycmVuY3lPclVuaXRQcm9wZXJ0aWVzID0gbmV3IFNldCgpO1xuXHR0YWJsZUNvbHVtbnMuZm9yRWFjaChvQ29sdW1uID0+IHtcblx0XHRjb25zdCBvVGFibGVDb2x1bW4gPSBvQ29sdW1uIGFzIEFubm90YXRpb25UYWJsZUNvbHVtbjtcblx0XHRpZiAob1RhYmxlQ29sdW1uLnVuaXQpIHtcblx0XHRcdG1DdXJyZW5jeU9yVW5pdFByb3BlcnRpZXMuYWRkKG9UYWJsZUNvbHVtbi51bml0KTtcblx0XHR9XG5cdH0pO1xuXG5cdGNvbnN0IGFDdXN0b21BZ2dyZWdhdGVBbm5vdGF0aW9ucyA9IGFnZ3JlZ2F0aW9uSGVscGVyLmdldEN1c3RvbUFnZ3JlZ2F0ZURlZmluaXRpb25zKCk7XG5cdGNvbnN0IG1SYXdEZWZpbml0aW9uczogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+ID0ge307XG5cblx0YUN1c3RvbUFnZ3JlZ2F0ZUFubm90YXRpb25zLmZvckVhY2goYW5ub3RhdGlvbiA9PiB7XG5cdFx0Y29uc3Qgb0FnZ3JlZ2F0ZWRQcm9wZXJ0eSA9IGFnZ3JlZ2F0aW9uSGVscGVyLl9lbnRpdHlUeXBlLmVudGl0eVByb3BlcnRpZXMuZmluZChvUHJvcGVydHkgPT4ge1xuXHRcdFx0cmV0dXJuIG9Qcm9wZXJ0eS5uYW1lID09PSBhbm5vdGF0aW9uLnF1YWxpZmllcjtcblx0XHR9KTtcblxuXHRcdGlmIChvQWdncmVnYXRlZFByb3BlcnR5KSB7XG5cdFx0XHRjb25zdCBhQ29udGV4dERlZmluaW5nUHJvcGVydGllcyA9IGFubm90YXRpb24uYW5ub3RhdGlvbnM/LkFnZ3JlZ2F0aW9uPy5Db250ZXh0RGVmaW5pbmdQcm9wZXJ0aWVzO1xuXHRcdFx0bVJhd0RlZmluaXRpb25zW29BZ2dyZWdhdGVkUHJvcGVydHkubmFtZV0gPSBhQ29udGV4dERlZmluaW5nUHJvcGVydGllc1xuXHRcdFx0XHQ/IGFDb250ZXh0RGVmaW5pbmdQcm9wZXJ0aWVzLm1hcChvQ3R4RGVmUHJvcGVydHkgPT4ge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG9DdHhEZWZQcm9wZXJ0eS52YWx1ZTtcblx0XHRcdFx0ICB9KVxuXHRcdFx0XHQ6IFtdO1xuXHRcdH1cblx0fSk7XG5cdGNvbnN0IG1SZXN1bHQ6IFJlY29yZDxzdHJpbmcsIEFnZ3JlZ2F0ZURhdGE+ID0ge307XG5cblx0dGFibGVDb2x1bW5zLmZvckVhY2gob0NvbHVtbiA9PiB7XG5cdFx0Y29uc3Qgb1RhYmxlQ29sdW1uID0gb0NvbHVtbiBhcyBBbm5vdGF0aW9uVGFibGVDb2x1bW47XG5cdFx0aWYgKG9UYWJsZUNvbHVtbi5wcm9wZXJ0eUluZm9zID09PSB1bmRlZmluZWQgJiYgb1RhYmxlQ29sdW1uLnJlbGF0aXZlUGF0aCkge1xuXHRcdFx0Y29uc3QgYVJhd0NvbnRleHREZWZpbmluZ1Byb3BlcnRpZXMgPSBtUmF3RGVmaW5pdGlvbnNbb1RhYmxlQ29sdW1uLnJlbGF0aXZlUGF0aF07XG5cblx0XHRcdC8vIElnbm9yZSBhZ2dyZWdhdGVzIGNvcnJlc3BvbmRpbmcgdG8gY3VycmVuY2llcyBvciB1bml0cyBvZiBtZWFzdXJlIGFuZCBkdW1teSBjcmVhdGVkIHByb3BlcnR5IGZvciBkYXRhcG9pbnQgdGFyZ2V0IFZhbHVlXG5cdFx0XHRpZiAoXG5cdFx0XHRcdGFSYXdDb250ZXh0RGVmaW5pbmdQcm9wZXJ0aWVzICYmXG5cdFx0XHRcdCFtQ3VycmVuY3lPclVuaXRQcm9wZXJ0aWVzLmhhcyhvVGFibGVDb2x1bW4ubmFtZSkgJiZcblx0XHRcdFx0IW9UYWJsZUNvbHVtbi5pc0RhdGFQb2ludEZha2VUYXJnZXRQcm9wZXJ0eVxuXHRcdFx0KSB7XG5cdFx0XHRcdG1SZXN1bHRbb1RhYmxlQ29sdW1uLm5hbWVdID0ge1xuXHRcdFx0XHRcdGRlZmF1bHRBZ2dyZWdhdGU6IHt9LFxuXHRcdFx0XHRcdHJlbGF0aXZlUGF0aDogb1RhYmxlQ29sdW1uLnJlbGF0aXZlUGF0aFxuXHRcdFx0XHR9O1xuXHRcdFx0XHRjb25zdCBhQ29udGV4dERlZmluaW5nUHJvcGVydGllczogc3RyaW5nW10gPSBbXTtcblx0XHRcdFx0YVJhd0NvbnRleHREZWZpbmluZ1Byb3BlcnRpZXMuZm9yRWFjaChjb250ZXh0RGVmaW5pbmdQcm9wZXJ0eU5hbWUgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IG9Db2x1bW4gPSBmaW5kQ29sdW1uRnJvbVBhdGgoY29udGV4dERlZmluaW5nUHJvcGVydHlOYW1lKTtcblx0XHRcdFx0XHRpZiAob0NvbHVtbikge1xuXHRcdFx0XHRcdFx0YUNvbnRleHREZWZpbmluZ1Byb3BlcnRpZXMucHVzaChvQ29sdW1uLm5hbWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYgKGFDb250ZXh0RGVmaW5pbmdQcm9wZXJ0aWVzLmxlbmd0aCkge1xuXHRcdFx0XHRcdG1SZXN1bHRbb1RhYmxlQ29sdW1uLm5hbWVdLmRlZmF1bHRBZ2dyZWdhdGUuY29udGV4dERlZmluaW5nUHJvcGVydGllcyA9IGFDb250ZXh0RGVmaW5pbmdQcm9wZXJ0aWVzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gbVJlc3VsdDtcbn07XG5cbi8qKlxuICogVXBkYXRlcyBhIHRhYmxlIHZpc3VhbGl6YXRpb24gZm9yIGFuYWx5dGljYWwgdXNlIGNhc2VzLlxuICpcbiAqIEBwYXJhbSB0YWJsZVZpc3VhbGl6YXRpb24gVGhlIHZpc3VhbGl6YXRpb24gdG8gYmUgdXBkYXRlZFxuICogQHBhcmFtIGVudGl0eVR5cGUgVGhlIGVudGl0eSB0eXBlIGRpc3BsYXllZCBpbiB0aGUgdGFibGVcbiAqIEBwYXJhbSBjb252ZXJ0ZXJDb250ZXh0IFRoZSBjb252ZXJ0ZXIgY29udGV4dFxuICogQHBhcmFtIHByZXNlbnRhdGlvblZhcmlhbnRBbm5vdGF0aW9uIFRoZSBwcmVzZW50YXRpb25WYXJpYW50IGFubm90YXRpb24gKGlmIGFueSlcbiAqL1xuZnVuY3Rpb24gdXBkYXRlVGFibGVWaXN1YWxpemF0aW9uRm9yQW5hbHl0aWNzKFxuXHR0YWJsZVZpc3VhbGl6YXRpb246IFRhYmxlVmlzdWFsaXphdGlvbixcblx0ZW50aXR5VHlwZTogRW50aXR5VHlwZSxcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCxcblx0cHJlc2VudGF0aW9uVmFyaWFudEFubm90YXRpb24/OiBQcmVzZW50YXRpb25WYXJpYW50VHlwZVR5cGVzXG4pIHtcblx0aWYgKHRhYmxlVmlzdWFsaXphdGlvbi5jb250cm9sLnR5cGUgPT09IFwiQW5hbHl0aWNhbFRhYmxlXCIpIHtcblx0XHRjb25zdCBhZ2dyZWdhdGVzRGVmaW5pdGlvbnMgPSBnZXRBZ2dyZWdhdGVEZWZpbml0aW9uc0Zyb21FbnRpdHlUeXBlKGVudGl0eVR5cGUsIHRhYmxlVmlzdWFsaXphdGlvbi5jb2x1bW5zLCBjb252ZXJ0ZXJDb250ZXh0KTtcblxuXHRcdGlmIChhZ2dyZWdhdGVzRGVmaW5pdGlvbnMpIHtcblx0XHRcdHRhYmxlVmlzdWFsaXphdGlvbi5lbmFibGVBbmFseXRpY3MgPSB0cnVlO1xuXHRcdFx0dGFibGVWaXN1YWxpemF0aW9uLmFnZ3JlZ2F0ZXMgPSBhZ2dyZWdhdGVzRGVmaW5pdGlvbnM7XG5cblx0XHRcdC8vIEFkZCBncm91cCBhbmQgc29ydCBjb25kaXRpb25zIGZyb20gdGhlIHByZXNlbnRhdGlvbiB2YXJpYW50XG5cdFx0XHR0YWJsZVZpc3VhbGl6YXRpb24uYW5ub3RhdGlvbi5ncm91cENvbmRpdGlvbnMgPSBnZXRHcm91cENvbmRpdGlvbnMocHJlc2VudGF0aW9uVmFyaWFudEFubm90YXRpb24sIHRhYmxlVmlzdWFsaXphdGlvbi5jb2x1bW5zKTtcblx0XHRcdHRhYmxlVmlzdWFsaXphdGlvbi5hbm5vdGF0aW9uLmFnZ3JlZ2F0ZUNvbmRpdGlvbnMgPSBnZXRBZ2dyZWdhdGVDb25kaXRpb25zKFxuXHRcdFx0XHRwcmVzZW50YXRpb25WYXJpYW50QW5ub3RhdGlvbixcblx0XHRcdFx0dGFibGVWaXN1YWxpemF0aW9uLmNvbHVtbnNcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0dGFibGVWaXN1YWxpemF0aW9uLmNvbnRyb2wudHlwZSA9IFwiR3JpZFRhYmxlXCI7IC8vIEFuYWx5dGljYWxUYWJsZSBpc24ndCBhIHJlYWwgdHlwZSBmb3IgdGhlIE1EQzpUYWJsZSwgc28gd2UgYWx3YXlzIHN3aXRjaCBiYWNrIHRvIEdyaWRcblx0fVxufVxuXG4vKipcbiAqIEdldCB0aGUgbmF2aWdhdGlvbiB0YXJnZXQgcGF0aCBmcm9tIG1hbmlmZXN0IHNldHRpbmdzLlxuICpcbiAqIEBwYXJhbSBjb252ZXJ0ZXJDb250ZXh0IFRoZSBjb252ZXJ0ZXIgY29udGV4dFxuICogQHBhcmFtIG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGggVGhlIG5hdmlnYXRpb24gcGF0aCB0byBjaGVjayBpbiB0aGUgbWFuaWZlc3Qgc2V0dGluZ3NcbiAqIEByZXR1cm5zIE5hdmlnYXRpb24gcGF0aCBmcm9tIG1hbmlmZXN0IHNldHRpbmdzXG4gKi9cbmZ1bmN0aW9uIGdldE5hdmlnYXRpb25UYXJnZXRQYXRoKGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsIG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGg6IHN0cmluZykge1xuXHRjb25zdCBtYW5pZmVzdFdyYXBwZXIgPSBjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0V3JhcHBlcigpO1xuXHRpZiAobmF2aWdhdGlvblByb3BlcnR5UGF0aCAmJiBtYW5pZmVzdFdyYXBwZXIuZ2V0TmF2aWdhdGlvbkNvbmZpZ3VyYXRpb24obmF2aWdhdGlvblByb3BlcnR5UGF0aCkpIHtcblx0XHRjb25zdCBuYXZDb25maWcgPSBtYW5pZmVzdFdyYXBwZXIuZ2V0TmF2aWdhdGlvbkNvbmZpZ3VyYXRpb24obmF2aWdhdGlvblByb3BlcnR5UGF0aCk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKG5hdkNvbmZpZykubGVuZ3RoID4gMCkge1xuXHRcdFx0cmV0dXJuIG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGg7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgZGF0YU1vZGVsUGF0aCA9IGNvbnZlcnRlckNvbnRleHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpO1xuXHRjb25zdCBjb250ZXh0UGF0aCA9IGNvbnZlcnRlckNvbnRleHQuZ2V0Q29udGV4dFBhdGgoKTtcblx0Y29uc3QgbmF2Q29uZmlnRm9yQ29udGV4dFBhdGggPSBtYW5pZmVzdFdyYXBwZXIuZ2V0TmF2aWdhdGlvbkNvbmZpZ3VyYXRpb24oY29udGV4dFBhdGgpO1xuXHRpZiAobmF2Q29uZmlnRm9yQ29udGV4dFBhdGggJiYgT2JqZWN0LmtleXMobmF2Q29uZmlnRm9yQ29udGV4dFBhdGgpLmxlbmd0aCA+IDApIHtcblx0XHRyZXR1cm4gY29udGV4dFBhdGg7XG5cdH1cblxuXHRyZXR1cm4gZGF0YU1vZGVsUGF0aC50YXJnZXRFbnRpdHlTZXQgPyBkYXRhTW9kZWxQYXRoLnRhcmdldEVudGl0eVNldC5uYW1lIDogZGF0YU1vZGVsUGF0aC5zdGFydGluZ0VudGl0eVNldC5uYW1lO1xufVxuXG4vKipcbiAqIFNldHMgdGhlICd1bml0JyBhbmQgJ3RleHRBcnJhbmdlbWVudCcgcHJvcGVydGllcyBpbiBjb2x1bW5zIHdoZW4gbmVjZXNzYXJ5LlxuICpcbiAqIEBwYXJhbSBlbnRpdHlUeXBlIFRoZSBlbnRpdHkgdHlwZSBkaXNwbGF5ZWQgaW4gdGhlIHRhYmxlXG4gKiBAcGFyYW0gdGFibGVDb2x1bW5zIFRoZSBjb2x1bW5zIHRvIGJlIHVwZGF0ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUxpbmtlZFByb3BlcnRpZXMoZW50aXR5VHlwZTogRW50aXR5VHlwZSwgdGFibGVDb2x1bW5zOiBUYWJsZUNvbHVtbltdKSB7XG5cdGZ1bmN0aW9uIGZpbmRDb2x1bW5CeVBhdGgocGF0aDogc3RyaW5nKTogVGFibGVDb2x1bW4gfCB1bmRlZmluZWQge1xuXHRcdHJldHVybiB0YWJsZUNvbHVtbnMuZmluZChjb2x1bW4gPT4ge1xuXHRcdFx0Y29uc3QgYW5ub3RhdGlvbkNvbHVtbiA9IGNvbHVtbiBhcyBBbm5vdGF0aW9uVGFibGVDb2x1bW47XG5cdFx0XHRyZXR1cm4gYW5ub3RhdGlvbkNvbHVtbi5wcm9wZXJ0eUluZm9zID09PSB1bmRlZmluZWQgJiYgYW5ub3RhdGlvbkNvbHVtbi5yZWxhdGl2ZVBhdGggPT09IHBhdGg7XG5cdFx0fSk7XG5cdH1cblxuXHR0YWJsZUNvbHVtbnMuZm9yRWFjaChvQ29sdW1uID0+IHtcblx0XHRjb25zdCBvVGFibGVDb2x1bW4gPSBvQ29sdW1uIGFzIEFubm90YXRpb25UYWJsZUNvbHVtbjtcblx0XHRpZiAob1RhYmxlQ29sdW1uLnByb3BlcnR5SW5mb3MgPT09IHVuZGVmaW5lZCAmJiBvVGFibGVDb2x1bW4ucmVsYXRpdmVQYXRoKSB7XG5cdFx0XHRjb25zdCBvUHJvcGVydHkgPSBlbnRpdHlUeXBlLmVudGl0eVByb3BlcnRpZXMuZmluZChvUHJvcCA9PiBvUHJvcC5uYW1lID09PSBvVGFibGVDb2x1bW4ucmVsYXRpdmVQYXRoKTtcblx0XHRcdGlmIChvUHJvcGVydHkpIHtcblx0XHRcdFx0Y29uc3Qgc1VuaXQgPSBnZXRBc3NvY2lhdGVkQ3VycmVuY3lQcm9wZXJ0eShvUHJvcGVydHkpPy5uYW1lIHx8IGdldEFzc29jaWF0ZWRVbml0UHJvcGVydHkob1Byb3BlcnR5KT8ubmFtZTtcblx0XHRcdFx0aWYgKHNVbml0KSB7XG5cdFx0XHRcdFx0Y29uc3Qgb1VuaXRDb2x1bW4gPSBmaW5kQ29sdW1uQnlQYXRoKHNVbml0KTtcblxuXHRcdFx0XHRcdG9UYWJsZUNvbHVtbi51bml0ID0gb1VuaXRDb2x1bW4/Lm5hbWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBkaXNwbGF5TW9kZSA9IGdldERpc3BsYXlNb2RlKG9Qcm9wZXJ0eSksXG5cdFx0XHRcdFx0dGV4dEFubm90YXRpb24gPSBvUHJvcGVydHkuYW5ub3RhdGlvbnMuQ29tbW9uPy5UZXh0O1xuXHRcdFx0XHRpZiAoaXNQYXRoRXhwcmVzc2lvbih0ZXh0QW5ub3RhdGlvbikgJiYgZGlzcGxheU1vZGUgIT09IFwiVmFsdWVcIikge1xuXHRcdFx0XHRcdGNvbnN0IG9UZXh0Q29sdW1uID0gZmluZENvbHVtbkJ5UGF0aCh0ZXh0QW5ub3RhdGlvbi5wYXRoKTtcblx0XHRcdFx0XHRpZiAob1RleHRDb2x1bW4gJiYgb1RleHRDb2x1bW4ubmFtZSAhPT0gb1RhYmxlQ29sdW1uLm5hbWUpIHtcblx0XHRcdFx0XHRcdG9UYWJsZUNvbHVtbi50ZXh0QXJyYW5nZW1lbnQgPSB7XG5cdFx0XHRcdFx0XHRcdHRleHRQcm9wZXJ0eTogb1RleHRDb2x1bW4ubmFtZSxcblx0XHRcdFx0XHRcdFx0bW9kZTogZGlzcGxheU1vZGVcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRhYmxlVmlzdWFsaXphdGlvbihcblx0bGluZUl0ZW1Bbm5vdGF0aW9uOiBMaW5lSXRlbSxcblx0dmlzdWFsaXphdGlvblBhdGg6IHN0cmluZyxcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCxcblx0cHJlc2VudGF0aW9uVmFyaWFudEFubm90YXRpb24/OiBQcmVzZW50YXRpb25WYXJpYW50VHlwZVR5cGVzLFxuXHRpc0NvbmRlbnNlZFRhYmxlTGF5b3V0Q29tcGxpYW50PzogYm9vbGVhbixcblx0dmlld0NvbmZpZ3VyYXRpb24/OiBWaWV3UGF0aENvbmZpZ3VyYXRpb25cbik6IFRhYmxlVmlzdWFsaXphdGlvbiB7XG5cdGNvbnN0IHRhYmxlTWFuaWZlc3RDb25maWcgPSBnZXRUYWJsZU1hbmlmZXN0Q29uZmlndXJhdGlvbihcblx0XHRsaW5lSXRlbUFubm90YXRpb24sXG5cdFx0dmlzdWFsaXphdGlvblBhdGgsXG5cdFx0Y29udmVydGVyQ29udGV4dCxcblx0XHRpc0NvbmRlbnNlZFRhYmxlTGF5b3V0Q29tcGxpYW50XG5cdCk7XG5cdGNvbnN0IHsgbmF2aWdhdGlvblByb3BlcnR5UGF0aCB9ID0gc3BsaXRQYXRoKHZpc3VhbGl6YXRpb25QYXRoKTtcblx0Y29uc3QgbmF2aWdhdGlvblRhcmdldFBhdGggPSBnZXROYXZpZ2F0aW9uVGFyZ2V0UGF0aChjb252ZXJ0ZXJDb250ZXh0LCBuYXZpZ2F0aW9uUHJvcGVydHlQYXRoKTtcblx0Y29uc3QgbmF2aWdhdGlvblNldHRpbmdzID0gY29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdFdyYXBwZXIoKS5nZXROYXZpZ2F0aW9uQ29uZmlndXJhdGlvbihuYXZpZ2F0aW9uVGFyZ2V0UGF0aCk7XG5cdGNvbnN0IGNvbHVtbnMgPSBnZXRUYWJsZUNvbHVtbnMobGluZUl0ZW1Bbm5vdGF0aW9uLCB2aXN1YWxpemF0aW9uUGF0aCwgY29udmVydGVyQ29udGV4dCwgbmF2aWdhdGlvblNldHRpbmdzKTtcblx0Y29uc3Qgb3BlcmF0aW9uQXZhaWxhYmxlTWFwID0gZ2V0T3BlcmF0aW9uQXZhaWxhYmxlTWFwKGxpbmVJdGVtQW5ub3RhdGlvbiwgY29udmVydGVyQ29udGV4dCk7XG5cblx0Y29uc3Qgb1Zpc3VhbGl6YXRpb246IFRhYmxlVmlzdWFsaXphdGlvbiA9IHtcblx0XHR0eXBlOiBWaXN1YWxpemF0aW9uVHlwZS5UYWJsZSxcblx0XHRhbm5vdGF0aW9uOiBnZXRUYWJsZUFubm90YXRpb25Db25maWd1cmF0aW9uKFxuXHRcdFx0bGluZUl0ZW1Bbm5vdGF0aW9uLFxuXHRcdFx0dmlzdWFsaXphdGlvblBhdGgsXG5cdFx0XHRjb252ZXJ0ZXJDb250ZXh0LFxuXHRcdFx0dGFibGVNYW5pZmVzdENvbmZpZyxcblx0XHRcdGNvbHVtbnMsXG5cdFx0XHRwcmVzZW50YXRpb25WYXJpYW50QW5ub3RhdGlvbixcblx0XHRcdHZpZXdDb25maWd1cmF0aW9uXG5cdFx0KSxcblx0XHRjb250cm9sOiB0YWJsZU1hbmlmZXN0Q29uZmlnLFxuXHRcdGFjdGlvbnM6IHJlbW92ZUR1cGxpY2F0ZUFjdGlvbnMoZ2V0VGFibGVBY3Rpb25zKGxpbmVJdGVtQW5ub3RhdGlvbiwgdmlzdWFsaXphdGlvblBhdGgsIGNvbnZlcnRlckNvbnRleHQsIG5hdmlnYXRpb25TZXR0aW5ncykpLFxuXHRcdGNvbHVtbnM6IGNvbHVtbnMsXG5cdFx0ZW5hYmxlRGF0YVN0YXRlRmlsdGVyOiBjb252ZXJ0ZXJDb250ZXh0LmdldFRlbXBsYXRlVHlwZSgpID09PSBcIk9iamVjdFBhZ2VcIixcblx0XHRvcGVyYXRpb25BdmFpbGFibGVNYXA6IEpTT04uc3RyaW5naWZ5KG9wZXJhdGlvbkF2YWlsYWJsZU1hcCksXG5cdFx0b3BlcmF0aW9uQXZhaWxhYmxlUHJvcGVydGllczogZ2V0T3BlcmF0aW9uQXZhaWxhYmxlUHJvcGVydGllcyhvcGVyYXRpb25BdmFpbGFibGVNYXAsIGNvbnZlcnRlckNvbnRleHQpXG5cdH07XG5cblx0dXBkYXRlTGlua2VkUHJvcGVydGllcyhjb252ZXJ0ZXJDb250ZXh0LmdldEFubm90YXRpb25FbnRpdHlUeXBlKGxpbmVJdGVtQW5ub3RhdGlvbiksIGNvbHVtbnMpO1xuXHR1cGRhdGVUYWJsZVZpc3VhbGl6YXRpb25Gb3JBbmFseXRpY3MoXG5cdFx0b1Zpc3VhbGl6YXRpb24sXG5cdFx0Y29udmVydGVyQ29udGV4dC5nZXRBbm5vdGF0aW9uRW50aXR5VHlwZShsaW5lSXRlbUFubm90YXRpb24pLFxuXHRcdGNvbnZlcnRlckNvbnRleHQsXG5cdFx0cHJlc2VudGF0aW9uVmFyaWFudEFubm90YXRpb25cblx0KTtcblxuXHRyZXR1cm4gb1Zpc3VhbGl6YXRpb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEZWZhdWx0VGFibGVWaXN1YWxpemF0aW9uKGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQpOiBUYWJsZVZpc3VhbGl6YXRpb24ge1xuXHRjb25zdCB0YWJsZU1hbmlmZXN0Q29uZmlnID0gZ2V0VGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb24odW5kZWZpbmVkLCBcIlwiLCBjb252ZXJ0ZXJDb250ZXh0LCBmYWxzZSk7XG5cdGNvbnN0IGNvbHVtbnMgPSBnZXRDb2x1bW5zRnJvbUVudGl0eVR5cGUoe30sIGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5VHlwZSgpLCBbXSwgW10sIGNvbnZlcnRlckNvbnRleHQsIHRhYmxlTWFuaWZlc3RDb25maWcudHlwZSk7XG5cdGNvbnN0IG9wZXJhdGlvbkF2YWlsYWJsZU1hcCA9IGdldE9wZXJhdGlvbkF2YWlsYWJsZU1hcCh1bmRlZmluZWQsIGNvbnZlcnRlckNvbnRleHQpO1xuXHRjb25zdCBvVmlzdWFsaXphdGlvbjogVGFibGVWaXN1YWxpemF0aW9uID0ge1xuXHRcdHR5cGU6IFZpc3VhbGl6YXRpb25UeXBlLlRhYmxlLFxuXHRcdGFubm90YXRpb246IGdldFRhYmxlQW5ub3RhdGlvbkNvbmZpZ3VyYXRpb24odW5kZWZpbmVkLCBcIlwiLCBjb252ZXJ0ZXJDb250ZXh0LCB0YWJsZU1hbmlmZXN0Q29uZmlnLCBjb2x1bW5zKSxcblx0XHRjb250cm9sOiB0YWJsZU1hbmlmZXN0Q29uZmlnLFxuXHRcdGFjdGlvbnM6IFtdLFxuXHRcdGNvbHVtbnM6IGNvbHVtbnMsXG5cdFx0ZW5hYmxlRGF0YVN0YXRlRmlsdGVyOiBjb252ZXJ0ZXJDb250ZXh0LmdldFRlbXBsYXRlVHlwZSgpID09PSBcIk9iamVjdFBhZ2VcIixcblx0XHRvcGVyYXRpb25BdmFpbGFibGVNYXA6IEpTT04uc3RyaW5naWZ5KG9wZXJhdGlvbkF2YWlsYWJsZU1hcCksXG5cdFx0b3BlcmF0aW9uQXZhaWxhYmxlUHJvcGVydGllczogZ2V0T3BlcmF0aW9uQXZhaWxhYmxlUHJvcGVydGllcyhvcGVyYXRpb25BdmFpbGFibGVNYXAsIGNvbnZlcnRlckNvbnRleHQpXG5cdH07XG5cblx0dXBkYXRlTGlua2VkUHJvcGVydGllcyhjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGUoKSwgY29sdW1ucyk7XG5cdHVwZGF0ZVRhYmxlVmlzdWFsaXphdGlvbkZvckFuYWx5dGljcyhvVmlzdWFsaXphdGlvbiwgY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKCksIGNvbnZlcnRlckNvbnRleHQpO1xuXG5cdHJldHVybiBvVmlzdWFsaXphdGlvbjtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgb2YgQ29yZS5PcGVyYXRpb25BdmFpbGFibGUgcHJvcGVydHkgcGF0aHMgZm9yIGFsbCBEYXRhRmllbGRGb3JBY3Rpb25zLlxuICpcbiAqIEBwYXJhbSBsaW5lSXRlbUFubm90YXRpb24gVGhlIGluc3RhbmNlIG9mIHRoZSBsaW5lIGl0ZW1cbiAqIEBwYXJhbSBjb252ZXJ0ZXJDb250ZXh0IFRoZSBpbnN0YW5jZSBvZiB0aGUgY29udmVydGVyIGNvbnRleHRcbiAqIEByZXR1cm5zIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBUaGUgcmVjb3JkIGNvbnRhaW5pbmcgYWxsIGFjdGlvbiBuYW1lcyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyBDb3JlLk9wZXJhdGlvbkF2YWlsYWJsZSBwcm9wZXJ0eSBwYXRoc1xuICovXG5mdW5jdGlvbiBnZXRPcGVyYXRpb25BdmFpbGFibGVNYXAobGluZUl0ZW1Bbm5vdGF0aW9uOiBMaW5lSXRlbSB8IHVuZGVmaW5lZCwgY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCk6IFJlY29yZDxzdHJpbmcsIGFueT4ge1xuXHRjb25zdCBvcGVyYXRpb25BdmFpbGFibGVNYXA6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcblx0Y29uc3QgYWRkVG9NYXAgPSBmdW5jdGlvbihrZXk6IHN0cmluZywgdmFsdWU6IGFueSkge1xuXHRcdGlmIChrZXkpIHtcblx0XHRcdG9wZXJhdGlvbkF2YWlsYWJsZU1hcFtrZXldID0gdmFsdWU7XG5cdFx0fVxuXHR9O1xuXG5cdGlmIChsaW5lSXRlbUFubm90YXRpb24pIHtcblx0XHRsaW5lSXRlbUFubm90YXRpb24uZm9yRWFjaChkYXRhRmllbGQgPT4ge1xuXHRcdFx0aWYgKGRhdGFGaWVsZC4kVHlwZSA9PT0gVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkRm9yQWN0aW9uKSB7XG5cdFx0XHRcdGNvbnN0IGFjdGlvbk5hbWUgPSBkYXRhRmllbGQuQWN0aW9uIGFzIHN0cmluZztcblx0XHRcdFx0aWYgKGFjdGlvbk5hbWU/LmluZGV4T2YoXCIvXCIpIDwgMCAmJiAhZGF0YUZpZWxkLkRldGVybWluaW5nKSB7XG5cdFx0XHRcdFx0Y29uc3QgYWN0aW9uVGFyZ2V0ID0gZGF0YUZpZWxkLkFjdGlvblRhcmdldDtcblx0XHRcdFx0XHRpZiAoYWN0aW9uVGFyZ2V0Py5hbm5vdGF0aW9ucz8uQ29yZT8uT3BlcmF0aW9uQXZhaWxhYmxlID09PSBudWxsKSB7XG5cdFx0XHRcdFx0XHQvLyBBbm5vdGF0aW9uIGV4cGxpY2l0bHkgY29uZmlndXJlZCB3aXRoIG51bGwgKGFjdGlvbiBhZHZlcnRpc2VtZW50IHJlbGF0ZWQpXG5cdFx0XHRcdFx0XHRhZGRUb01hcChhY3Rpb25OYW1lLCBudWxsKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGFjdGlvblRhcmdldD8ucGFyYW1ldGVycz8ubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBiaW5kaW5nUGFyYW1ldGVyRnVsbE5hbWUgPSBhY3Rpb25UYXJnZXQucGFyYW1ldGVyc1swXS5mdWxseVF1YWxpZmllZE5hbWUsXG5cdFx0XHRcdFx0XHRcdHRhcmdldEV4cHJlc3Npb24gPSBhbm5vdGF0aW9uRXhwcmVzc2lvbihcblx0XHRcdFx0XHRcdFx0XHRhY3Rpb25UYXJnZXQ/LmFubm90YXRpb25zPy5Db3JlPy5PcGVyYXRpb25BdmFpbGFibGUsXG5cdFx0XHRcdFx0XHRcdFx0W10sXG5cdFx0XHRcdFx0XHRcdFx0dW5kZWZpbmVkLFxuXHRcdFx0XHRcdFx0XHRcdChwYXRoOiBzdHJpbmcpID0+IGJpbmRpbmdDb250ZXh0UGF0aFZpc2l0b3IocGF0aCwgY29udmVydGVyQ29udGV4dCwgYmluZGluZ1BhcmFtZXRlckZ1bGxOYW1lKVxuXHRcdFx0XHRcdFx0XHQpIGFzIEJpbmRpbmdFeHByZXNzaW9uRXhwcmVzc2lvbjxzdHJpbmc+O1xuXG5cdFx0XHRcdFx0XHRpZiAodGFyZ2V0RXhwcmVzc2lvbj8ucGF0aCkge1xuXHRcdFx0XHRcdFx0XHRhZGRUb01hcChhY3Rpb25OYW1lLCB0YXJnZXRFeHByZXNzaW9uLnBhdGgpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChhY3Rpb25UYXJnZXQ/LmFubm90YXRpb25zPy5Db3JlPy5PcGVyYXRpb25BdmFpbGFibGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHRhZGRUb01hcChhY3Rpb25OYW1lLCB0YXJnZXRFeHByZXNzaW9uKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiBvcGVyYXRpb25BdmFpbGFibGVNYXA7XG59XG5cbi8qKlxuICogTWV0aG9kIHRvIHJldHJpZXZlIGFsbCBwcm9wZXJ0eSBwYXRocyBhc3NpZ25lZCB0byB0aGUgQ29yZS5PcGVyYXRpb25BdmFpbGFibGUgYW5ub3RhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIGFueT59IG9wZXJhdGlvbkF2YWlsYWJsZU1hcCBUaGUgcmVjb3JkIGNvbnNpc3Rpbmcgb2YgYWN0aW9ucyBhbmQgdGhlaXIgQ29yZS5PcGVyYXRpb25BdmFpbGFibGUgcHJvcGVydHkgcGF0aHNcbiAqIEBwYXJhbSB7Q29udmVydGVyQ29udGV4dH0gY29udmVydGVyQ29udGV4dCBUaGUgaW5zdGFuY2Ugb2YgdGhlIGNvbnZlcnRlciBjb250ZXh0XG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgQ1NWIHN0cmluZyBvZiBhbGwgcHJvcGVydHkgcGF0aHMgYXNzb2NpYXRlZCB3aXRoIHRoZSBDb3JlLk9wZXJhdGlvbkF2YWlsYWJsZSBhbm5vdGF0aW9uXG4gKi9cbmZ1bmN0aW9uIGdldE9wZXJhdGlvbkF2YWlsYWJsZVByb3BlcnRpZXMob3BlcmF0aW9uQXZhaWxhYmxlTWFwOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0KTogc3RyaW5nIHtcblx0Y29uc3QgcHJvcGVydGllcyA9IG5ldyBTZXQoKTtcblxuXHRmb3IgKGNvbnN0IGFjdGlvbk5hbWUgaW4gb3BlcmF0aW9uQXZhaWxhYmxlTWFwKSB7XG5cdFx0Y29uc3QgcHJvcGVydHlOYW1lID0gb3BlcmF0aW9uQXZhaWxhYmxlTWFwW2FjdGlvbk5hbWVdO1xuXHRcdGlmIChwcm9wZXJ0eU5hbWUgPT09IG51bGwpIHtcblx0XHRcdC8vIEFubm90YXRpb24gY29uZmlndXJlZCB3aXRoIGV4cGxpY2l0ICdudWxsJyAoYWN0aW9uIGFkdmVydGlzZW1lbnQgcmVsZXZhbnQpXG5cdFx0XHRwcm9wZXJ0aWVzLmFkZChhY3Rpb25OYW1lKTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBwcm9wZXJ0eU5hbWUgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdC8vIEFkZCBwcm9wZXJ0eSBwYXRocyBhbmQgbm90IENvbnN0YW50IHZhbHVlcy5cblx0XHRcdHByb3BlcnRpZXMuYWRkKHByb3BlcnR5TmFtZSk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKHByb3BlcnRpZXMuc2l6ZSkge1xuXHRcdC8vIFNvbWUgYWN0aW9ucyBoYXZlIGFuIG9wZXJhdGlvbiBhdmFpbGFibGUgYmFzZWQgb24gcHJvcGVydHkgLS0+IHdlIG5lZWQgdG8gbG9hZCB0aGUgSGVhZGVySW5mby5UaXRsZSBwcm9wZXJ0eVxuXHRcdC8vIHNvIHRoYXQgdGhlIGRpYWxvZyBvbiBwYXJ0aWFsIGFjdGlvbnMgaXMgZGlzcGxheWVkIHByb3Blcmx5IChCQ1AgMjE4MDI3MTQyNSlcblx0XHRjb25zdCBlbnRpdHlUeXBlID0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKCk7XG5cdFx0Y29uc3QgdGl0bGVQcm9wZXJ0eSA9IChlbnRpdHlUeXBlLmFubm90YXRpb25zPy5VST8uSGVhZGVySW5mbz8uVGl0bGUgYXMgRGF0YUZpZWxkVHlwZXMpPy5WYWx1ZT8ucGF0aDtcblx0XHRpZiAodGl0bGVQcm9wZXJ0eSkge1xuXHRcdFx0cHJvcGVydGllcy5hZGQodGl0bGVQcm9wZXJ0eSk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIEFycmF5LmZyb20ocHJvcGVydGllcykuam9pbihcIixcIik7XG59XG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciB0aGUgRGF0YUZpZWxkRm9yQWN0aW9uIGFuZCBEYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb24gb2YgYSBsaW5lIGl0ZW0gYW5kXG4gKiByZXR1cm5zIGFsbCB0aGUgVUkuSGlkZGVuIGFubm90YXRpb24gZXhwcmVzc2lvbnMuXG4gKlxuICogQHBhcmFtIGxpbmVJdGVtQW5ub3RhdGlvbiBDb2xsZWN0aW9uIG9mIGRhdGEgZmllbGRzIHVzZWQgZm9yIHJlcHJlc2VudGF0aW9uIGluIGEgdGFibGUgb3IgbGlzdFxuICogQHBhcmFtIGN1cnJlbnRFbnRpdHlUeXBlIEN1cnJlbnQgZW50aXR5IHR5cGVcbiAqIEBwYXJhbSBjb250ZXh0RGF0YU1vZGVsT2JqZWN0UGF0aCBPYmplY3QgcGF0aCBvZiB0aGUgZGF0YSBtb2RlbFxuICogQHBhcmFtIGlzRW50aXR5U2V0XG4gKiBAcmV0dXJucyBBbGwgdGhlIGBVSS5IaWRkZW5gIHBhdGggZXhwcmVzc2lvbnMgZm91bmQgaW4gdGhlIHJlbGV2YW50IGFjdGlvbnNcbiAqL1xuZnVuY3Rpb24gZ2V0VUlIaWRkZW5FeHBGb3JBY3Rpb25zUmVxdWlyaW5nQ29udGV4dChcblx0bGluZUl0ZW1Bbm5vdGF0aW9uOiBMaW5lSXRlbSxcblx0Y3VycmVudEVudGl0eVR5cGU6IEVudGl0eVR5cGUsXG5cdGNvbnRleHREYXRhTW9kZWxPYmplY3RQYXRoOiBEYXRhTW9kZWxPYmplY3RQYXRoLFxuXHRpc0VudGl0eVNldDogYm9vbGVhblxuKTogRXhwcmVzc2lvbjxib29sZWFuPltdIHtcblx0Y29uc3QgYVVpSGlkZGVuUGF0aEV4cHJlc3Npb25zOiBFeHByZXNzaW9uPGJvb2xlYW4+W10gPSBbXTtcblx0bGluZUl0ZW1Bbm5vdGF0aW9uLmZvckVhY2goZGF0YUZpZWxkID0+IHtcblx0XHQvLyBDaGVjayBpZiB0aGUgbGluZUl0ZW0gY29udGV4dCBpcyB0aGUgc2FtZSBhcyB0aGF0IG9mIHRoZSBhY3Rpb246XG5cdFx0aWYgKFxuXHRcdFx0KGRhdGFGaWVsZC4kVHlwZSA9PT0gVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkRm9yQWN0aW9uICYmXG5cdFx0XHRcdGRhdGFGaWVsZD8uQWN0aW9uVGFyZ2V0Py5pc0JvdW5kICYmXG5cdFx0XHRcdGN1cnJlbnRFbnRpdHlUeXBlID09PSBkYXRhRmllbGQ/LkFjdGlvblRhcmdldC5zb3VyY2VFbnRpdHlUeXBlKSB8fFxuXHRcdFx0KGRhdGFGaWVsZC4kVHlwZSA9PT0gVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uICYmXG5cdFx0XHRcdGRhdGFGaWVsZC5SZXF1aXJlc0NvbnRleHQgJiZcblx0XHRcdFx0ZGF0YUZpZWxkPy5JbmxpbmU/LnZhbHVlT2YoKSAhPT0gdHJ1ZSlcblx0XHQpIHtcblx0XHRcdGlmICh0eXBlb2YgZGF0YUZpZWxkLmFubm90YXRpb25zPy5VST8uSGlkZGVuPy52YWx1ZU9mKCkgPT09IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0YVVpSGlkZGVuUGF0aEV4cHJlc3Npb25zLnB1c2goXG5cdFx0XHRcdFx0ZXF1YWwoXG5cdFx0XHRcdFx0XHRnZXRCaW5kaW5nRXhwRnJvbUNvbnRleHQoXG5cdFx0XHRcdFx0XHRcdGRhdGFGaWVsZCBhcyBEYXRhRmllbGRGb3JBY3Rpb24gfCBEYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb24sXG5cdFx0XHRcdFx0XHRcdGNvbnRleHREYXRhTW9kZWxPYmplY3RQYXRoLFxuXHRcdFx0XHRcdFx0XHRpc0VudGl0eVNldFxuXHRcdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRcdGZhbHNlXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cdHJldHVybiBhVWlIaWRkZW5QYXRoRXhwcmVzc2lvbnM7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBjaGFuZ2UgdGhlIGNvbnRleHQgY3VycmVudGx5IHJlZmVyZW5jZWQgYnkgdGhpcyBiaW5kaW5nIGJ5IHJlbW92aW5nIHRoZSBsYXN0IG5hdmlnYXRpb24gcHJvcGVydHkuXG4gKlxuICogSXQgaXMgdXNlZCAoc3BlY2lmaWNhbGx5IGluIHRoaXMgY2FzZSksIHRvIHRyYW5zZm9ybSBhIGJpbmRpbmcgbWFkZSBmb3IgYSBOYXZQcm9wIGNvbnRleHQgL01haW5PYmplY3QvTmF2UHJvcDEvTmF2UHJvcDIsXG4gKiBpbnRvIGEgYmluZGluZyBvbiB0aGUgcHJldmlvdXMgY29udGV4dCAvTWFpbk9iamVjdC9OYXZQcm9wMS5cbiAqXG4gKiBAcGFyYW0gc291cmNlIERhdGFGaWVsZEZvckFjdGlvbiB8IERhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvbiB8IEN1c3RvbUFjdGlvblxuICogQHBhcmFtIGNvbnRleHREYXRhTW9kZWxPYmplY3RQYXRoIERhdGFNb2RlbE9iamVjdFBhdGhcbiAqIEBwYXJhbSBpc0VudGl0eVNldFxuICogQHJldHVybnMgVGhlIGJpbmRpbmcgZXhwcmVzc2lvblxuICovXG5mdW5jdGlvbiBnZXRCaW5kaW5nRXhwRnJvbUNvbnRleHQoXG5cdHNvdXJjZTogRGF0YUZpZWxkRm9yQWN0aW9uIHwgRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uIHwgQ3VzdG9tQWN0aW9uLFxuXHRjb250ZXh0RGF0YU1vZGVsT2JqZWN0UGF0aDogRGF0YU1vZGVsT2JqZWN0UGF0aCxcblx0aXNFbnRpdHlTZXQ6IGJvb2xlYW5cbik6IEV4cHJlc3Npb248YW55PiB7XG5cdGxldCBzRXhwcmVzc2lvbjogYW55IHwgdW5kZWZpbmVkO1xuXHRpZiAoXG5cdFx0KHNvdXJjZSBhcyBEYXRhRmllbGRGb3JBY3Rpb24pPy4kVHlwZSA9PT0gVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkRm9yQWN0aW9uIHx8XG5cdFx0KHNvdXJjZSBhcyBEYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb24pPy4kVHlwZSA9PT0gVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uXG5cdCkge1xuXHRcdHNFeHByZXNzaW9uID0gKHNvdXJjZSBhcyBEYXRhRmllbGRGb3JBY3Rpb24gfCBEYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb24pPy5hbm5vdGF0aW9ucz8uVUk/LkhpZGRlbjtcblx0fSBlbHNlIHtcblx0XHRzRXhwcmVzc2lvbiA9IChzb3VyY2UgYXMgQ3VzdG9tQWN0aW9uKT8udmlzaWJsZTtcblx0fVxuXHRsZXQgc1BhdGg6IHN0cmluZztcblx0aWYgKHNFeHByZXNzaW9uPy5wYXRoKSB7XG5cdFx0c1BhdGggPSBzRXhwcmVzc2lvbi5wYXRoO1xuXHR9IGVsc2Uge1xuXHRcdHNQYXRoID0gc0V4cHJlc3Npb247XG5cdH1cblx0aWYgKHNQYXRoKSB7XG5cdFx0aWYgKChzb3VyY2UgYXMgQ3VzdG9tQWN0aW9uKT8udmlzaWJsZSkge1xuXHRcdFx0c1BhdGggPSBzUGF0aC5zdWJzdHJpbmcoMSwgc1BhdGgubGVuZ3RoIC0gMSk7XG5cdFx0fVxuXHRcdGlmIChzUGF0aC5pbmRleE9mKFwiL1wiKSA+IDApIHtcblx0XHRcdC8vY2hlY2sgaWYgdGhlIG5hdmlnYXRpb24gcHJvcGVydHkgaXMgY29ycmVjdDpcblx0XHRcdGNvbnN0IGFTcGxpdFBhdGggPSBzUGF0aC5zcGxpdChcIi9cIik7XG5cdFx0XHRjb25zdCBzTmF2aWdhdGlvblBhdGggPSBhU3BsaXRQYXRoWzBdO1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRjb250ZXh0RGF0YU1vZGVsT2JqZWN0UGF0aD8udGFyZ2V0T2JqZWN0Py5fdHlwZSA9PT0gXCJOYXZpZ2F0aW9uUHJvcGVydHlcIiAmJlxuXHRcdFx0XHRjb250ZXh0RGF0YU1vZGVsT2JqZWN0UGF0aC50YXJnZXRPYmplY3QucGFydG5lciA9PT0gc05hdmlnYXRpb25QYXRoXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuIGJpbmRpbmdFeHByZXNzaW9uKGFTcGxpdFBhdGguc2xpY2UoMSkuam9pbihcIi9cIikpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnN0YW50KHRydWUpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gSW4gY2FzZSB0aGVyZSBpcyBubyBuYXZpZ2F0aW9uIHByb3BlcnR5LCBpZiBpdCdzIGFuIGVudGl0eVNldCwgdGhlIGV4cHJlc3Npb24gYmluZGluZyBoYXMgdG8gYmUgcmV0dXJuZWQ6XG5cdFx0fSBlbHNlIGlmIChpc0VudGl0eVNldCkge1xuXHRcdFx0cmV0dXJuIGJpbmRpbmdFeHByZXNzaW9uKHNQYXRoKTtcblx0XHRcdC8vIG90aGVyd2lzZSB0aGUgZXhwcmVzc2lvbiBiaW5kaW5nIGNhbm5vdCBiZSB0YWtlbiBpbnRvIGFjY291bnQgZm9yIHRoZSBzZWxlY3Rpb24gbW9kZSBldmFsdWF0aW9uOlxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gY29uc3RhbnQodHJ1ZSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBjb25zdGFudCh0cnVlKTtcbn1cblxuLyoqXG4gKiBMb29wIHRocm91Z2ggdGhlIERhdGFGaWVsZEZvckFjdGlvbiBhbmQgRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uIG9mIGEgbGluZSBpdGVtIGFuZCBjaGVja1xuICogaWYgYXQgbGVhc3Qgb25lIG9mIHRoZW0gaXMgYWx3YXlzIHZpc2libGUgaW4gdGhlIHRhYmxlIHRvb2xiYXIgKGFuZCByZXF1aXJlcyBhIGNvbnRleHQpLlxuICpcbiAqIEBwYXJhbSBsaW5lSXRlbUFubm90YXRpb24gQ29sbGVjdGlvbiBvZiBkYXRhIGZpZWxkcyBmb3IgcmVwcmVzZW50YXRpb24gaW4gYSB0YWJsZSBvciBsaXN0XG4gKiBAcGFyYW0gY3VycmVudEVudGl0eVR5cGUgQ3VycmVudCBFbnRpdHkgVHlwZVxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGVyZSBpcyBhdCBsZWFzdCAxIGFjdGlvbiB0aGF0IG1lZXRzIHRoZSBjcml0ZXJpYVxuICovXG5mdW5jdGlvbiBoYXNCb3VuZEFjdGlvbnNBbHdheXNWaXNpYmxlSW5Ub29sQmFyKGxpbmVJdGVtQW5ub3RhdGlvbjogTGluZUl0ZW0sIGN1cnJlbnRFbnRpdHlUeXBlOiBFbnRpdHlUeXBlKTogYm9vbGVhbiB7XG5cdHJldHVybiBsaW5lSXRlbUFubm90YXRpb24uc29tZShkYXRhRmllbGQgPT4ge1xuXHRcdGlmIChcblx0XHRcdChkYXRhRmllbGQuJFR5cGUgPT09IFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckFjdGlvbiB8fFxuXHRcdFx0XHRkYXRhRmllbGQuJFR5cGUgPT09IFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvbikgJiZcblx0XHRcdGRhdGFGaWVsZD8uSW5saW5lPy52YWx1ZU9mKCkgIT09IHRydWUgJiZcblx0XHRcdChkYXRhRmllbGQuYW5ub3RhdGlvbnM/LlVJPy5IaWRkZW4/LnZhbHVlT2YoKSA9PT0gZmFsc2UgfHwgZGF0YUZpZWxkLmFubm90YXRpb25zPy5VST8uSGlkZGVuPy52YWx1ZU9mKCkgPT09IHVuZGVmaW5lZClcblx0XHQpIHtcblx0XHRcdGlmIChkYXRhRmllbGQuJFR5cGUgPT09IFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckFjdGlvbikge1xuXHRcdFx0XHQvLyBDaGVjayBpZiB0aGUgbGluZUl0ZW0gY29udGV4dCBpcyB0aGUgc2FtZSBhcyB0aGF0IG9mIHRoZSBhY3Rpb246XG5cdFx0XHRcdHJldHVybiBkYXRhRmllbGQ/LkFjdGlvblRhcmdldD8uaXNCb3VuZCAmJiBjdXJyZW50RW50aXR5VHlwZSA9PT0gZGF0YUZpZWxkPy5BY3Rpb25UYXJnZXQuc291cmNlRW50aXR5VHlwZTtcblx0XHRcdH0gZWxzZSBpZiAoZGF0YUZpZWxkLiRUeXBlID09PSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb24pIHtcblx0XHRcdFx0cmV0dXJuIGRhdGFGaWVsZC5SZXF1aXJlc0NvbnRleHQ7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGhhc0N1c3RvbUFjdGlvbnNBbHdheXNWaXNpYmxlSW5Ub29sQmFyKG1hbmlmZXN0QWN0aW9uczogUmVjb3JkPHN0cmluZywgQ3VzdG9tQWN0aW9uPik6IGJvb2xlYW4ge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFuaWZlc3RBY3Rpb25zKS5zb21lKGFjdGlvbktleSA9PiB7XG5cdFx0Y29uc3QgYWN0aW9uID0gbWFuaWZlc3RBY3Rpb25zW2FjdGlvbktleV07XG5cdFx0aWYgKGFjdGlvbi5yZXF1aXJlc1NlbGVjdGlvbiAmJiBhY3Rpb24udmlzaWJsZT8udG9TdHJpbmcoKSA9PT0gXCJ0cnVlXCIpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0pO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIG92ZXIgdGhlIGN1c3RvbSBhY3Rpb25zICh3aXRoIGtleSByZXF1aXJlc1NlbGVjdGlvbikgZGVjbGFyZWQgaW4gdGhlIG1hbmlmZXN0IGZvciB0aGUgY3VycmVudCBsaW5lIGl0ZW0gYW5kIHJldHVybnMgYWxsIHRoZVxuICogdmlzaWJsZSBrZXkgdmFsdWVzIGFzIGFuIGV4cHJlc3Npb24uXG4gKlxuICogQHBhcmFtIG1hbmlmZXN0QWN0aW9ucyBUaGUgYWN0aW9ucyBkZWZpbmVkIGluIHRoZSBtYW5pZmVzdFxuICogQHJldHVybnMgQXJyYXk8RXhwcmVzc2lvbjxib29sZWFuPj4gQWxsIHRoZSB2aXNpYmxlIHBhdGggZXhwcmVzc2lvbnMgb2YgdGhlIGFjdGlvbnMgdGhhdCBtZWV0IHRoZSBjcml0ZXJpYVxuICovXG5mdW5jdGlvbiBnZXRWaXNpYmxlRXhwRm9yQ3VzdG9tQWN0aW9uc1JlcXVpcmluZ0NvbnRleHQobWFuaWZlc3RBY3Rpb25zOiBSZWNvcmQ8c3RyaW5nLCBDdXN0b21BY3Rpb24+KTogRXhwcmVzc2lvbjxib29sZWFuPltdIHtcblx0Y29uc3QgYVZpc2libGVQYXRoRXhwcmVzc2lvbnM6IEV4cHJlc3Npb248Ym9vbGVhbj5bXSA9IFtdO1xuXHRpZiAobWFuaWZlc3RBY3Rpb25zKSB7XG5cdFx0T2JqZWN0LmtleXMobWFuaWZlc3RBY3Rpb25zKS5mb3JFYWNoKGFjdGlvbktleSA9PiB7XG5cdFx0XHRjb25zdCBhY3Rpb24gPSBtYW5pZmVzdEFjdGlvbnNbYWN0aW9uS2V5XTtcblx0XHRcdGlmIChhY3Rpb24ucmVxdWlyZXNTZWxlY3Rpb24gPT09IHRydWUgJiYgYWN0aW9uLnZpc2libGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRpZiAodHlwZW9mIGFjdGlvbi52aXNpYmxlID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0LypUaGUgZmluYWwgYWltIHdvdWxkIGJlIHRvIGNoZWNrIGlmIHRoZSBwYXRoIGV4cHJlc3Npb24gZGVwZW5kcyBvbiB0aGUgcGFyZW50IGNvbnRleHRcblx0XHRcdFx0XHRhbmQgY29uc2lkZXJzIG9ubHkgdGhvc2UgZXhwcmVzc2lvbnMgZm9yIHRoZSBleHByZXNzaW9uIGV2YWx1YXRpb24sXG5cdFx0XHRcdFx0YnV0IGN1cnJlbnRseSBub3QgcG9zc2libGUgZnJvbSB0aGUgbWFuaWZlc3QgYXMgdGhlIHZpc2libGUga2V5IGlzIGJvdW5kIG9uIHRoZSBwYXJlbnQgZW50aXR5LlxuXHRcdFx0XHRcdFRyaWNreSB0byBkaWZmZXJlbnRpYXRlIHRoZSBwYXRoIGFzIGl0J3MgZG9uZSBmb3IgdGhlIEhpZGRlbiBhbm5vdGF0aW9uLlxuXHRcdFx0XHRcdEZvciB0aGUgdGltZSBiZWluZyB3ZSBjb25zaWRlciBhbGwgdGhlIHBhdGhzIG9mIHRoZSBtYW5pZmVzdCovXG5cblx0XHRcdFx0XHRhVmlzaWJsZVBhdGhFeHByZXNzaW9ucy5wdXNoKHJlc29sdmVCaW5kaW5nU3RyaW5nKGFjdGlvbj8udmlzaWJsZT8udmFsdWVPZigpKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHRyZXR1cm4gYVZpc2libGVQYXRoRXhwcmVzc2lvbnM7XG59XG5cbi8qKlxuICogRXZhbHVhdGUgaWYgdGhlIHBhdGggaXMgc3RhdGljYWxseSBkZWxldGFibGUgb3IgdXBkYXRhYmxlLlxuICpcbiAqIEBwYXJhbSBjb252ZXJ0ZXJDb250ZXh0XG4gKiBAcmV0dXJucyB7VGFibGVDYXBhYmlsaXR5UmVzdHJpY3Rpb259IFRoZSB0YWJsZSBjYXBhYmlsaXRpZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENhcGFiaWxpdHlSZXN0cmljdGlvbihjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0KTogVGFibGVDYXBhYmlsaXR5UmVzdHJpY3Rpb24ge1xuXHRjb25zdCBpc0RlbGV0YWJsZSA9IGlzUGF0aERlbGV0YWJsZShjb252ZXJ0ZXJDb250ZXh0LmdldERhdGFNb2RlbE9iamVjdFBhdGgoKSk7XG5cdGNvbnN0IGlzVXBkYXRhYmxlID0gaXNQYXRoVXBkYXRhYmxlKGNvbnZlcnRlckNvbnRleHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpKTtcblx0cmV0dXJuIHtcblx0XHRpc0RlbGV0YWJsZTogIShpc0NvbnN0YW50KGlzRGVsZXRhYmxlKSAmJiBpc0RlbGV0YWJsZS52YWx1ZSA9PT0gZmFsc2UpLFxuXHRcdGlzVXBkYXRhYmxlOiAhKGlzQ29uc3RhbnQoaXNVcGRhdGFibGUpICYmIGlzVXBkYXRhYmxlLnZhbHVlID09PSBmYWxzZSlcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlbGVjdGlvbk1vZGUoXG5cdGxpbmVJdGVtQW5ub3RhdGlvbjogTGluZUl0ZW0gfCB1bmRlZmluZWQsXG5cdHZpc3VhbGl6YXRpb25QYXRoOiBzdHJpbmcsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdGlzRW50aXR5U2V0OiBib29sZWFuLFxuXHR0YXJnZXRDYXBhYmlsaXRpZXM6IFRhYmxlQ2FwYWJpbGl0eVJlc3RyaWN0aW9uLFxuXHRpc0RlbGV0ZUJ1dHRvblZpc2libGU/OiBFeHByZXNzaW9uPGJvb2xlYW4+XG4pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRpZiAoIWxpbmVJdGVtQW5ub3RhdGlvbikge1xuXHRcdHJldHVybiBTZWxlY3Rpb25Nb2RlLk5vbmU7XG5cdH1cblx0Y29uc3QgdGFibGVNYW5pZmVzdFNldHRpbmdzID0gY29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdENvbnRyb2xDb25maWd1cmF0aW9uKHZpc3VhbGl6YXRpb25QYXRoKTtcblx0bGV0IHNlbGVjdGlvbk1vZGUgPSB0YWJsZU1hbmlmZXN0U2V0dGluZ3MudGFibGVTZXR0aW5ncz8uc2VsZWN0aW9uTW9kZTtcblx0bGV0IGFIaWRkZW5CaW5kaW5nRXhwcmVzc2lvbnM6IEV4cHJlc3Npb248Ym9vbGVhbj5bXSA9IFtdLFxuXHRcdGFWaXNpYmxlQmluZGluZ0V4cHJlc3Npb25zOiBFeHByZXNzaW9uPGJvb2xlYW4+W10gPSBbXTtcblx0Y29uc3QgbWFuaWZlc3RBY3Rpb25zID0gZ2V0QWN0aW9uc0Zyb21NYW5pZmVzdChcblx0XHRjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0Q29udHJvbENvbmZpZ3VyYXRpb24odmlzdWFsaXphdGlvblBhdGgpLmFjdGlvbnMsXG5cdFx0Y29udmVydGVyQ29udGV4dCxcblx0XHRbXSxcblx0XHR1bmRlZmluZWQsXG5cdFx0ZmFsc2Vcblx0KTtcblx0bGV0IGlzUGFyZW50RGVsZXRhYmxlLCBwYXJlbnRFbnRpdHlTZXREZWxldGFibGU7XG5cdGlmIChjb252ZXJ0ZXJDb250ZXh0LmdldFRlbXBsYXRlVHlwZSgpID09PSBUZW1wbGF0ZVR5cGUuT2JqZWN0UGFnZSkge1xuXHRcdGlzUGFyZW50RGVsZXRhYmxlID0gaXNQYXRoRGVsZXRhYmxlKGNvbnZlcnRlckNvbnRleHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpLCB1bmRlZmluZWQpO1xuXHRcdHBhcmVudEVudGl0eVNldERlbGV0YWJsZSA9IGlzUGFyZW50RGVsZXRhYmxlID8gY29tcGlsZUJpbmRpbmcoaXNQYXJlbnREZWxldGFibGUsIHRydWUpIDogaXNQYXJlbnREZWxldGFibGU7XG5cdH1cblx0aWYgKHNlbGVjdGlvbk1vZGUgJiYgc2VsZWN0aW9uTW9kZSA9PT0gU2VsZWN0aW9uTW9kZS5Ob25lICYmIGlzRGVsZXRlQnV0dG9uVmlzaWJsZSkge1xuXHRcdHJldHVybiBjb21waWxlQmluZGluZyhpZkVsc2UoaXNEZWxldGVCdXR0b25WaXNpYmxlLCBjb25zdGFudChcIk11bHRpXCIpLCBjb25zdGFudChcIk5vbmVcIikpKTtcblx0fVxuXHRpZiAoIXNlbGVjdGlvbk1vZGUgfHwgc2VsZWN0aW9uTW9kZSA9PT0gU2VsZWN0aW9uTW9kZS5BdXRvKSB7XG5cdFx0c2VsZWN0aW9uTW9kZSA9IFNlbGVjdGlvbk1vZGUuTXVsdGk7XG5cdH1cblxuXHRpZiAoXG5cdFx0aGFzQm91bmRBY3Rpb25zQWx3YXlzVmlzaWJsZUluVG9vbEJhcihsaW5lSXRlbUFubm90YXRpb24sIGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5VHlwZSgpKSB8fFxuXHRcdGhhc0N1c3RvbUFjdGlvbnNBbHdheXNWaXNpYmxlSW5Ub29sQmFyKG1hbmlmZXN0QWN0aW9ucylcblx0KSB7XG5cdFx0cmV0dXJuIHNlbGVjdGlvbk1vZGU7XG5cdH1cblx0YUhpZGRlbkJpbmRpbmdFeHByZXNzaW9ucyA9IGdldFVJSGlkZGVuRXhwRm9yQWN0aW9uc1JlcXVpcmluZ0NvbnRleHQoXG5cdFx0bGluZUl0ZW1Bbm5vdGF0aW9uLFxuXHRcdGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5VHlwZSgpLFxuXHRcdGNvbnZlcnRlckNvbnRleHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpLFxuXHRcdGlzRW50aXR5U2V0XG5cdCk7XG5cdGFWaXNpYmxlQmluZGluZ0V4cHJlc3Npb25zID0gZ2V0VmlzaWJsZUV4cEZvckN1c3RvbUFjdGlvbnNSZXF1aXJpbmdDb250ZXh0KG1hbmlmZXN0QWN0aW9ucyk7XG5cblx0Ly8gTm8gYWN0aW9uIHJlcXVpcmluZyBhIGNvbnRleHQ6XG5cdGlmIChhSGlkZGVuQmluZGluZ0V4cHJlc3Npb25zLmxlbmd0aCA9PT0gMCAmJiBhVmlzaWJsZUJpbmRpbmdFeHByZXNzaW9ucy5sZW5ndGggPT09IDAgJiYgaXNEZWxldGVCdXR0b25WaXNpYmxlKSB7XG5cdFx0aWYgKCFpc0VudGl0eVNldCkge1xuXHRcdFx0aWYgKHRhcmdldENhcGFiaWxpdGllcy5pc0RlbGV0YWJsZSB8fCBwYXJlbnRFbnRpdHlTZXREZWxldGFibGUgIT09IFwiZmFsc2VcIikge1xuXHRcdFx0XHRyZXR1cm4gY29tcGlsZUJpbmRpbmcoXG5cdFx0XHRcdFx0aWZFbHNlKFxuXHRcdFx0XHRcdFx0YW5kKGVxdWFsKGJpbmRpbmdFeHByZXNzaW9uKFwiL2VkaXRNb2RlXCIsIFwidWlcIiksIFwiRWRpdGFibGVcIiksIGlzRGVsZXRlQnV0dG9uVmlzaWJsZSksXG5cdFx0XHRcdFx0XHRjb25zdGFudChzZWxlY3Rpb25Nb2RlKSxcblx0XHRcdFx0XHRcdGNvbnN0YW50KFNlbGVjdGlvbk1vZGUuTm9uZSlcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gU2VsZWN0aW9uTW9kZS5Ob25lO1xuXHRcdFx0fVxuXHRcdFx0Ly8gRW50aXR5U2V0IGRlbGV0YWJsZTpcblx0XHR9IGVsc2UgaWYgKHRhcmdldENhcGFiaWxpdGllcy5pc0RlbGV0YWJsZSAmJiBpc0RlbGV0ZUJ1dHRvblZpc2libGUpIHtcblx0XHRcdHJldHVybiBjb21waWxlQmluZGluZyhpZkVsc2UoaXNEZWxldGVCdXR0b25WaXNpYmxlLCBjb25zdGFudChzZWxlY3Rpb25Nb2RlKSwgY29uc3RhbnQoXCJOb25lXCIpKSk7XG5cdFx0XHQvLyBFbnRpdHlTZXQgbm90IGRlbGV0YWJsZTpcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIFNlbGVjdGlvbk1vZGUuTm9uZTtcblx0XHR9XG5cdFx0Ly8gVGhlcmUgYXJlIGFjdGlvbnMgcmVxdWlyaW5nIGEgY29udGV4dDpcblx0fSBlbHNlIGlmICghaXNFbnRpdHlTZXQpIHtcblx0XHRpZiAodGFyZ2V0Q2FwYWJpbGl0aWVzLmlzRGVsZXRhYmxlIHx8IHBhcmVudEVudGl0eVNldERlbGV0YWJsZSAhPT0gXCJmYWxzZVwiKSB7XG5cdFx0XHRyZXR1cm4gY29tcGlsZUJpbmRpbmcoXG5cdFx0XHRcdGlmRWxzZShcblx0XHRcdFx0XHRlcXVhbChiaW5kaW5nRXhwcmVzc2lvbihcIi9lZGl0TW9kZVwiLCBcInVpXCIpLCBcIkVkaXRhYmxlXCIpLFxuXHRcdFx0XHRcdGNvbnN0YW50KHNlbGVjdGlvbk1vZGUpLFxuXHRcdFx0XHRcdGlmRWxzZShcblx0XHRcdFx0XHRcdG9yKC4uLmFIaWRkZW5CaW5kaW5nRXhwcmVzc2lvbnMuY29uY2F0KGFWaXNpYmxlQmluZGluZ0V4cHJlc3Npb25zKSksXG5cdFx0XHRcdFx0XHRjb25zdGFudChzZWxlY3Rpb25Nb2RlKSxcblx0XHRcdFx0XHRcdGNvbnN0YW50KFNlbGVjdGlvbk1vZGUuTm9uZSlcblx0XHRcdFx0XHQpXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBjb21waWxlQmluZGluZyhcblx0XHRcdFx0aWZFbHNlKFxuXHRcdFx0XHRcdG9yKC4uLmFIaWRkZW5CaW5kaW5nRXhwcmVzc2lvbnMuY29uY2F0KGFWaXNpYmxlQmluZGluZ0V4cHJlc3Npb25zKSksXG5cdFx0XHRcdFx0Y29uc3RhbnQoc2VsZWN0aW9uTW9kZSksXG5cdFx0XHRcdFx0Y29uc3RhbnQoU2VsZWN0aW9uTW9kZS5Ob25lKVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHQvL0VudGl0eVNldCBkZWxldGFibGU6XG5cdH0gZWxzZSBpZiAodGFyZ2V0Q2FwYWJpbGl0aWVzLmlzRGVsZXRhYmxlKSB7XG5cdFx0cmV0dXJuIFNlbGVjdGlvbk1vZGUuTXVsdGk7XG5cdFx0Ly9FbnRpdHlTZXQgbm90IGRlbGV0YWJsZTpcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gY29tcGlsZUJpbmRpbmcoXG5cdFx0XHRpZkVsc2UoXG5cdFx0XHRcdG9yKC4uLmFIaWRkZW5CaW5kaW5nRXhwcmVzc2lvbnMuY29uY2F0KGFWaXNpYmxlQmluZGluZ0V4cHJlc3Npb25zKSksXG5cdFx0XHRcdGNvbnN0YW50KHNlbGVjdGlvbk1vZGUpLFxuXHRcdFx0XHRjb25zdGFudChTZWxlY3Rpb25Nb2RlLk5vbmUpXG5cdFx0XHQpXG5cdFx0KTtcblx0fVxufVxuXG4vKipcbiAqIE1ldGhvZCB0byByZXRyaWV2ZSBhbGwgdGFibGUgYWN0aW9ucyBmcm9tIGFubm90YXRpb25zLlxuICpcbiAqIEBwYXJhbSBsaW5lSXRlbUFubm90YXRpb25cbiAqIEBwYXJhbSB2aXN1YWxpemF0aW9uUGF0aFxuICogQHBhcmFtIGNvbnZlcnRlckNvbnRleHRcbiAqIEByZXR1cm5zIHtSZWNvcmQ8QmFzZUFjdGlvbiwgQmFzZUFjdGlvbj59IFRoZSB0YWJsZSBhbm5vdGF0aW9uIGFjdGlvbnNcbiAqL1xuZnVuY3Rpb24gZ2V0VGFibGVBbm5vdGF0aW9uQWN0aW9ucyhsaW5lSXRlbUFubm90YXRpb246IExpbmVJdGVtLCB2aXN1YWxpemF0aW9uUGF0aDogc3RyaW5nLCBjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0KSB7XG5cdGNvbnN0IHRhYmxlQWN0aW9uczogQmFzZUFjdGlvbltdID0gW107XG5cdGNvbnN0IGhpZGRlblRhYmxlQWN0aW9uczogQmFzZUFjdGlvbltdID0gW107XG5cdGlmIChsaW5lSXRlbUFubm90YXRpb24pIHtcblx0XHRsaW5lSXRlbUFubm90YXRpb24uZm9yRWFjaCgoZGF0YUZpZWxkOiBEYXRhRmllbGRBYnN0cmFjdFR5cGVzKSA9PiB7XG5cdFx0XHRsZXQgdGFibGVBY3Rpb246IEFubm90YXRpb25BY3Rpb24gfCB1bmRlZmluZWQ7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdGlzRGF0YUZpZWxkRm9yQWN0aW9uQWJzdHJhY3QoZGF0YUZpZWxkKSAmJlxuXHRcdFx0XHQhKGRhdGFGaWVsZC5hbm5vdGF0aW9ucz8uVUk/LkhpZGRlbj8udmFsdWVPZigpID09PSB0cnVlKSAmJlxuXHRcdFx0XHQhZGF0YUZpZWxkLklubGluZSAmJlxuXHRcdFx0XHQhZGF0YUZpZWxkLkRldGVybWluaW5nXG5cdFx0XHQpIHtcblx0XHRcdFx0Y29uc3Qga2V5ID0gS2V5SGVscGVyLmdlbmVyYXRlS2V5RnJvbURhdGFGaWVsZChkYXRhRmllbGQpO1xuXHRcdFx0XHRzd2l0Y2ggKGRhdGFGaWVsZC4kVHlwZSkge1xuXHRcdFx0XHRcdGNhc2UgXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhRmllbGRGb3JBY3Rpb25cIjpcblx0XHRcdFx0XHRcdHRhYmxlQWN0aW9uID0ge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBBY3Rpb25UeXBlLkRhdGFGaWVsZEZvckFjdGlvbixcblx0XHRcdFx0XHRcdFx0YW5ub3RhdGlvblBhdGg6IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5U2V0QmFzZWRBbm5vdGF0aW9uUGF0aChkYXRhRmllbGQuZnVsbHlRdWFsaWZpZWROYW1lKSxcblx0XHRcdFx0XHRcdFx0a2V5OiBrZXksXG5cdFx0XHRcdFx0XHRcdHZpc2libGU6IGNvbXBpbGVCaW5kaW5nKFxuXHRcdFx0XHRcdFx0XHRcdG5vdChcblx0XHRcdFx0XHRcdFx0XHRcdGVxdWFsKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRhbm5vdGF0aW9uRXhwcmVzc2lvbihcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhRmllbGQuYW5ub3RhdGlvbnM/LlVJPy5IaWRkZW4sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0W10sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dW5kZWZpbmVkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnZlcnRlckNvbnRleHQuZ2V0UmVsYXRpdmVNb2RlbFBhdGhGdW5jdGlvbigpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRydWVcblx0XHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHRcdGlzTmF2aWdhYmxlOiB0cnVlXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlIFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uXCI6XG5cdFx0XHRcdFx0XHR0YWJsZUFjdGlvbiA9IHtcblx0XHRcdFx0XHRcdFx0dHlwZTogQWN0aW9uVHlwZS5EYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb24sXG5cdFx0XHRcdFx0XHRcdGFubm90YXRpb25QYXRoOiBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVNldEJhc2VkQW5ub3RhdGlvblBhdGgoZGF0YUZpZWxkLmZ1bGx5UXVhbGlmaWVkTmFtZSksXG5cdFx0XHRcdFx0XHRcdGtleToga2V5LFxuXHRcdFx0XHRcdFx0XHR2aXNpYmxlOiBjb21waWxlQmluZGluZyhcblx0XHRcdFx0XHRcdFx0XHRub3QoXG5cdFx0XHRcdFx0XHRcdFx0XHRlcXVhbChcblx0XHRcdFx0XHRcdFx0XHRcdFx0YW5ub3RhdGlvbkV4cHJlc3Npb24oXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGF0YUZpZWxkLmFubm90YXRpb25zPy5VST8uSGlkZGVuLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVuZGVmaW5lZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb252ZXJ0ZXJDb250ZXh0LmdldFJlbGF0aXZlTW9kZWxQYXRoRnVuY3Rpb24oKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0cnVlXG5cdFx0XHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKGRhdGFGaWVsZC5hbm5vdGF0aW9ucz8uVUk/LkhpZGRlbj8udmFsdWVPZigpID09PSB0cnVlKSB7XG5cdFx0XHRcdGhpZGRlblRhYmxlQWN0aW9ucy5wdXNoKHtcblx0XHRcdFx0XHR0eXBlOiBBY3Rpb25UeXBlLkRlZmF1bHQsXG5cdFx0XHRcdFx0a2V5OiBLZXlIZWxwZXIuZ2VuZXJhdGVLZXlGcm9tRGF0YUZpZWxkKGRhdGFGaWVsZClcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodGFibGVBY3Rpb24pIHtcblx0XHRcdFx0dGFibGVBY3Rpb25zLnB1c2godGFibGVBY3Rpb24pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdHJldHVybiB7XG5cdFx0dGFibGVBY3Rpb25zOiB0YWJsZUFjdGlvbnMsXG5cdFx0aGlkZGVuVGFibGVBY3Rpb25zOiBoaWRkZW5UYWJsZUFjdGlvbnNcblx0fTtcbn1cblxuZnVuY3Rpb24gZ2V0SGlnaGxpZ2h0Um93QmluZGluZyhcblx0Y3JpdGljYWxpdHlBbm5vdGF0aW9uOiBQYXRoQW5ub3RhdGlvbkV4cHJlc3Npb248Q3JpdGljYWxpdHlUeXBlPiB8IEVudW1WYWx1ZTxDcml0aWNhbGl0eVR5cGU+IHwgdW5kZWZpbmVkLFxuXHRpc0RyYWZ0Um9vdDogYm9vbGVhbixcblx0dGFyZ2V0RW50aXR5VHlwZT86IEVudGl0eVR5cGVcbik6IEV4cHJlc3Npb248TWVzc2FnZVR5cGU+IHtcblx0bGV0IGRlZmF1bHRIaWdobGlnaHRSb3dEZWZpbml0aW9uOiBNZXNzYWdlVHlwZSB8IEV4cHJlc3Npb248TWVzc2FnZVR5cGU+ID0gTWVzc2FnZVR5cGUuTm9uZTtcblx0aWYgKGNyaXRpY2FsaXR5QW5ub3RhdGlvbikge1xuXHRcdGlmICh0eXBlb2YgY3JpdGljYWxpdHlBbm5vdGF0aW9uID09PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRkZWZhdWx0SGlnaGxpZ2h0Um93RGVmaW5pdGlvbiA9IGFubm90YXRpb25FeHByZXNzaW9uKGNyaXRpY2FsaXR5QW5ub3RhdGlvbikgYXMgRXhwcmVzc2lvbjxNZXNzYWdlVHlwZT47XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEVudW0gVmFsdWUgc28gd2UgZ2V0IHRoZSBjb3JyZXNwb25kaW5nIHN0YXRpYyBwYXJ0XG5cdFx0XHRkZWZhdWx0SGlnaGxpZ2h0Um93RGVmaW5pdGlvbiA9IGdldE1lc3NhZ2VUeXBlRnJvbUNyaXRpY2FsaXR5VHlwZShjcml0aWNhbGl0eUFubm90YXRpb24pO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gaWZFbHNlKFxuXHRcdGlzRHJhZnRSb290ICYmIERyYWZ0LklzTmV3T2JqZWN0LFxuXHRcdE1lc3NhZ2VUeXBlLkluZm9ybWF0aW9uIGFzIE1lc3NhZ2VUeXBlLFxuXHRcdGZvcm1hdFJlc3VsdChcblx0XHRcdFtkZWZhdWx0SGlnaGxpZ2h0Um93RGVmaW5pdGlvbiwgYmluZGluZ0V4cHJlc3Npb24oYGZpbHRlcmVkTWVzc2FnZXNgLCBcImludGVybmFsXCIpXSxcblx0XHRcdHRhYmxlRm9ybWF0dGVycy5yb3dIaWdobGlnaHRpbmcsXG5cdFx0XHR0YXJnZXRFbnRpdHlUeXBlXG5cdFx0KVxuXHQpO1xufVxuXG5mdW5jdGlvbiBfZ2V0Q3JlYXRpb25CZWhhdmlvdXIoXG5cdGxpbmVJdGVtQW5ub3RhdGlvbjogTGluZUl0ZW0gfCB1bmRlZmluZWQsXG5cdHRhYmxlTWFuaWZlc3RDb25maWd1cmF0aW9uOiBUYWJsZUNvbnRyb2xDb25maWd1cmF0aW9uLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHRuYXZpZ2F0aW9uU2V0dGluZ3M6IE5hdmlnYXRpb25TZXR0aW5nc0NvbmZpZ3VyYXRpb25cbik6IFRhYmxlQW5ub3RhdGlvbkNvbmZpZ3VyYXRpb25bXCJjcmVhdGVcIl0ge1xuXHRjb25zdCBuYXZpZ2F0aW9uID0gbmF2aWdhdGlvblNldHRpbmdzPy5jcmVhdGUgfHwgbmF2aWdhdGlvblNldHRpbmdzPy5kZXRhaWw7XG5cblx0Ly8gY3Jvc3MtYXBwXG5cdGlmIChuYXZpZ2F0aW9uPy5vdXRib3VuZCAmJiBuYXZpZ2F0aW9uLm91dGJvdW5kRGV0YWlsICYmIG5hdmlnYXRpb25TZXR0aW5ncz8uY3JlYXRlKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG1vZGU6IFwiRXh0ZXJuYWxcIixcblx0XHRcdG91dGJvdW5kOiBuYXZpZ2F0aW9uLm91dGJvdW5kLFxuXHRcdFx0b3V0Ym91bmREZXRhaWw6IG5hdmlnYXRpb24ub3V0Ym91bmREZXRhaWwsXG5cdFx0XHRuYXZpZ2F0aW9uU2V0dGluZ3M6IG5hdmlnYXRpb25TZXR0aW5nc1xuXHRcdH07XG5cdH1cblxuXHRsZXQgbmV3QWN0aW9uO1xuXHRpZiAobGluZUl0ZW1Bbm5vdGF0aW9uKSB7XG5cdFx0Ly8gaW4tYXBwXG5cdFx0Y29uc3QgdGFyZ2V0QW5ub3RhdGlvbnMgPSBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVNldCgpPy5hbm5vdGF0aW9ucztcblx0XHRuZXdBY3Rpb24gPSB0YXJnZXRBbm5vdGF0aW9ucz8uQ29tbW9uPy5EcmFmdFJvb3Q/Lk5ld0FjdGlvbiB8fCB0YXJnZXRBbm5vdGF0aW9ucz8uU2Vzc2lvbj8uU3RpY2t5U2Vzc2lvblN1cHBvcnRlZD8uTmV3QWN0aW9uOyAvLyBUT0RPOiBJcyB0aGVyZSByZWFsbHkgbm8gJ05ld0FjdGlvbicgb24gRHJhZnROb2RlPyB0YXJnZXRBbm5vdGF0aW9ucz8uQ29tbW9uPy5EcmFmdE5vZGU/Lk5ld0FjdGlvblxuXG5cdFx0aWYgKHRhYmxlTWFuaWZlc3RDb25maWd1cmF0aW9uLmNyZWF0aW9uTW9kZSA9PT0gQ3JlYXRpb25Nb2RlLkNyZWF0aW9uUm93ICYmIG5ld0FjdGlvbikge1xuXHRcdFx0Ly8gQSBjb21iaW5hdGlvbiBvZiAnQ3JlYXRpb25Sb3cnIGFuZCAnTmV3QWN0aW9uJyBkb2VzIG5vdCBtYWtlIHNlbnNlXG5cdFx0XHQvLyBUT0RPOiBPciBkb2VzIGl0P1xuXHRcdFx0dGhyb3cgRXJyb3IoYENyZWF0aW9uIG1vZGUgJyR7Q3JlYXRpb25Nb2RlLkNyZWF0aW9uUm93fScgY2FuIG5vdCBiZSB1c2VkIHdpdGggYSBjdXN0b20gJ25ldycgYWN0aW9uICgke25ld0FjdGlvbn0pYCk7XG5cdFx0fVxuXHRcdGlmIChuYXZpZ2F0aW9uPy5yb3V0ZSkge1xuXHRcdFx0Ly8gcm91dGUgc3BlY2lmaWVkXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRtb2RlOiB0YWJsZU1hbmlmZXN0Q29uZmlndXJhdGlvbi5jcmVhdGlvbk1vZGUsXG5cdFx0XHRcdGFwcGVuZDogdGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb24uY3JlYXRlQXRFbmQsXG5cdFx0XHRcdG5ld0FjdGlvbjogbmV3QWN0aW9uPy50b1N0cmluZygpLFxuXHRcdFx0XHRuYXZpZ2F0ZVRvVGFyZ2V0OiB0YWJsZU1hbmlmZXN0Q29uZmlndXJhdGlvbi5jcmVhdGlvbk1vZGUgPT09IENyZWF0aW9uTW9kZS5OZXdQYWdlID8gbmF2aWdhdGlvbi5yb3V0ZSA6IHVuZGVmaW5lZCAvLyBuYXZpZ2F0ZSBvbmx5IGluIE5ld1BhZ2UgbW9kZVxuXHRcdFx0fTtcblx0XHR9XG5cdH1cblxuXHQvLyBubyBuYXZpZ2F0aW9uIG9yIG5vIHJvdXRlIHNwZWNpZmllZCAtIGZhbGxiYWNrIHRvIGlubGluZSBjcmVhdGUgaWYgb3JpZ2luYWwgY3JlYXRpb24gbW9kZSB3YXMgJ05ld1BhZ2UnXG5cdGlmICh0YWJsZU1hbmlmZXN0Q29uZmlndXJhdGlvbi5jcmVhdGlvbk1vZGUgPT09IENyZWF0aW9uTW9kZS5OZXdQYWdlKSB7XG5cdFx0dGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb24uY3JlYXRpb25Nb2RlID0gQ3JlYXRpb25Nb2RlLklubGluZTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0bW9kZTogdGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb24uY3JlYXRpb25Nb2RlLFxuXHRcdGFwcGVuZDogdGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb24uY3JlYXRlQXRFbmQsXG5cdFx0bmV3QWN0aW9uOiBuZXdBY3Rpb24/LnRvU3RyaW5nKClcblx0fTtcbn1cblxuY29uc3QgX2dldFJvd0NvbmZpZ3VyYXRpb25Qcm9wZXJ0eSA9IGZ1bmN0aW9uKFxuXHRsaW5lSXRlbUFubm90YXRpb246IExpbmVJdGVtIHwgdW5kZWZpbmVkLFxuXHR2aXN1YWxpemF0aW9uUGF0aDogc3RyaW5nLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHRuYXZpZ2F0aW9uU2V0dGluZ3M6IE5hdmlnYXRpb25TZXR0aW5nc0NvbmZpZ3VyYXRpb24sXG5cdHRhcmdldFBhdGg6IHN0cmluZ1xuKSB7XG5cdGxldCBwcmVzc1Byb3BlcnR5LCBuYXZpZ2F0aW9uVGFyZ2V0O1xuXHRsZXQgY3JpdGljYWxpdHlQcm9wZXJ0eTogRXhwcmVzc2lvbk9yUHJpbWl0aXZlPE1lc3NhZ2VUeXBlPiA9IE1lc3NhZ2VUeXBlLk5vbmU7XG5cdGNvbnN0IHRhcmdldEVudGl0eVR5cGUgPSBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGUoKTtcblx0aWYgKG5hdmlnYXRpb25TZXR0aW5ncyAmJiBsaW5lSXRlbUFubm90YXRpb24pIHtcblx0XHRuYXZpZ2F0aW9uVGFyZ2V0ID0gbmF2aWdhdGlvblNldHRpbmdzLmRpc3BsYXk/LnRhcmdldCB8fCBuYXZpZ2F0aW9uU2V0dGluZ3MuZGV0YWlsPy5vdXRib3VuZDtcblx0XHRpZiAobmF2aWdhdGlvblRhcmdldCkge1xuXHRcdFx0cHJlc3NQcm9wZXJ0eSA9XG5cdFx0XHRcdFwiLmhhbmRsZXJzLm9uQ2hldnJvblByZXNzTmF2aWdhdGVPdXRCb3VuZCggJGNvbnRyb2xsZXIgLCdcIiArIG5hdmlnYXRpb25UYXJnZXQgKyBcIicsICR7JHBhcmFtZXRlcnM+YmluZGluZ0NvbnRleHR9KVwiO1xuXHRcdH0gZWxzZSBpZiAodGFyZ2V0RW50aXR5VHlwZSkge1xuXHRcdFx0Y29uc3QgdGFyZ2V0RW50aXR5U2V0ID0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlTZXQoKTtcblx0XHRcdG5hdmlnYXRpb25UYXJnZXQgPSBuYXZpZ2F0aW9uU2V0dGluZ3MuZGV0YWlsPy5yb3V0ZTtcblx0XHRcdGlmIChuYXZpZ2F0aW9uVGFyZ2V0KSB7XG5cdFx0XHRcdGNyaXRpY2FsaXR5UHJvcGVydHkgPSBnZXRIaWdobGlnaHRSb3dCaW5kaW5nKFxuXHRcdFx0XHRcdGxpbmVJdGVtQW5ub3RhdGlvbi5hbm5vdGF0aW9ucz8uVUk/LkNyaXRpY2FsaXR5LFxuXHRcdFx0XHRcdCEhdGFyZ2V0RW50aXR5U2V0Py5hbm5vdGF0aW9ucz8uQ29tbW9uPy5EcmFmdFJvb3QgfHwgISF0YXJnZXRFbnRpdHlTZXQ/LmFubm90YXRpb25zPy5Db21tb24/LkRyYWZ0Tm9kZSxcblx0XHRcdFx0XHR0YXJnZXRFbnRpdHlUeXBlXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHByZXNzUHJvcGVydHkgPVxuXHRcdFx0XHRcdFwiQVBJLm9uVGFibGVSb3dQcmVzcygkZXZlbnQsICRjb250cm9sbGVyLCAkeyRwYXJhbWV0ZXJzPmJpbmRpbmdDb250ZXh0fSwgeyBjYWxsRXh0ZW5zaW9uOiB0cnVlLCB0YXJnZXRQYXRoOiAnXCIgK1xuXHRcdFx0XHRcdHRhcmdldFBhdGggK1xuXHRcdFx0XHRcdFwiJywgZWRpdGFibGUgOiBcIiArXG5cdFx0XHRcdFx0KHRhcmdldEVudGl0eVNldD8uYW5ub3RhdGlvbnM/LkNvbW1vbj8uRHJhZnRSb290IHx8IHRhcmdldEVudGl0eVNldD8uYW5ub3RhdGlvbnM/LkNvbW1vbj8uRHJhZnROb2RlXG5cdFx0XHRcdFx0XHQ/IFwiISR7JHBhcmFtZXRlcnM+YmluZGluZ0NvbnRleHR9LmdldFByb3BlcnR5KCdJc0FjdGl2ZUVudGl0eScpXCJcblx0XHRcdFx0XHRcdDogXCJ1bmRlZmluZWRcIikgK1xuXHRcdFx0XHRcdFwifSlcIjsgLy9OZWVkIHRvIGFjY2VzcyB0byBEcmFmdFJvb3QgYW5kIERyYWZ0Tm9kZSAhISEhISEhXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjcml0aWNhbGl0eVByb3BlcnR5ID0gZ2V0SGlnaGxpZ2h0Um93QmluZGluZyhsaW5lSXRlbUFubm90YXRpb24uYW5ub3RhdGlvbnM/LlVJPy5Dcml0aWNhbGl0eSwgZmFsc2UsIHRhcmdldEVudGl0eVR5cGUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRjb25zdCByb3dOYXZpZ2F0ZWRFeHByZXNzaW9uOiBFeHByZXNzaW9uPGJvb2xlYW4+ID0gZm9ybWF0UmVzdWx0KFxuXHRcdFtiaW5kaW5nRXhwcmVzc2lvbihcIi9kZWVwZXN0UGF0aFwiLCBcImludGVybmFsXCIpXSxcblx0XHR0YWJsZUZvcm1hdHRlcnMubmF2aWdhdGVkUm93LFxuXHRcdHRhcmdldEVudGl0eVR5cGVcblx0KTtcblx0cmV0dXJuIHtcblx0XHRwcmVzczogcHJlc3NQcm9wZXJ0eSxcblx0XHRhY3Rpb246IHByZXNzUHJvcGVydHkgPyBcIk5hdmlnYXRpb25cIiA6IHVuZGVmaW5lZCxcblx0XHRyb3dIaWdobGlnaHRpbmc6IGNvbXBpbGVCaW5kaW5nKGNyaXRpY2FsaXR5UHJvcGVydHkpLFxuXHRcdHJvd05hdmlnYXRlZDogY29tcGlsZUJpbmRpbmcocm93TmF2aWdhdGVkRXhwcmVzc2lvbilcblx0fTtcbn07XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIGNvbHVtbnMgZnJvbSB0aGUgZW50aXR5VHlwZS5cbiAqXG4gKiBAcGFyYW0gY29sdW1uc1RvQmVDcmVhdGVkIFRoZSBjb2x1bW5zIHRvIGJlIGNyZWF0ZWQuXG4gKiBAcGFyYW0gZW50aXR5VHlwZSBUaGUgdGFyZ2V0IGVudGl0eSB0eXBlLlxuICogQHBhcmFtIGFubm90YXRpb25Db2x1bW5zIFRoZSBhcnJheSBvZiBjb2x1bW5zIGNyZWF0ZWQgYmFzZWQgb24gTGluZUl0ZW0gYW5ub3RhdGlvbnMuXG4gKiBAcGFyYW0gbm9uU29ydGFibGVDb2x1bW5zIFRoZSBhcnJheSBvZiBhbGwgbm9uIHNvcnRhYmxlIGNvbHVtbiBuYW1lcy5cbiAqIEBwYXJhbSBjb252ZXJ0ZXJDb250ZXh0IFRoZSBjb252ZXJ0ZXIgY29udGV4dC5cbiAqIEBwYXJhbSB0YWJsZVR5cGUgVGhlIHRhYmxlIHR5cGUuXG4gKiBAcmV0dXJucyB7QW5ub3RhdGlvblRhYmxlQ29sdW1uW119IFRoZSBjb2x1bW4gZnJvbSB0aGUgZW50aXR5VHlwZVxuICovXG5leHBvcnQgY29uc3QgZ2V0Q29sdW1uc0Zyb21FbnRpdHlUeXBlID0gZnVuY3Rpb24oXG5cdGNvbHVtbnNUb0JlQ3JlYXRlZDogUmVjb3JkPHN0cmluZywgUHJvcGVydHk+LFxuXHRlbnRpdHlUeXBlOiBFbnRpdHlUeXBlLFxuXHRhbm5vdGF0aW9uQ29sdW1uczogQW5ub3RhdGlvblRhYmxlQ29sdW1uW10gPSBbXSxcblx0bm9uU29ydGFibGVDb2x1bW5zOiBzdHJpbmdbXSxcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCxcblx0dGFibGVUeXBlOiBUYWJsZVR5cGVcbik6IEFubm90YXRpb25UYWJsZUNvbHVtbltdIHtcblx0Y29uc3QgdGFibGVDb2x1bW5zOiBBbm5vdGF0aW9uVGFibGVDb2x1bW5bXSA9IFtdO1xuXHQvLyBDYXRjaCBhbHJlYWR5IGV4aXN0aW5nIGNvbHVtbnMgLSB3aGljaCB3ZXJlIGFkZGVkIGJlZm9yZSBieSBMaW5lSXRlbSBBbm5vdGF0aW9uc1xuXHRjb25zdCBhZ2dyZWdhdGlvbkhlbHBlciA9IG5ldyBBZ2dyZWdhdGlvbkhlbHBlcihlbnRpdHlUeXBlLCBjb252ZXJ0ZXJDb250ZXh0KTtcblxuXHRlbnRpdHlUeXBlLmVudGl0eVByb3BlcnRpZXMuZm9yRWFjaCgocHJvcGVydHk6IFByb3BlcnR5KSA9PiB7XG5cdFx0Ly8gQ2F0Y2ggYWxyZWFkeSBleGlzdGluZyBjb2x1bW5zIC0gd2hpY2ggd2VyZSBhZGRlZCBiZWZvcmUgYnkgTGluZUl0ZW0gQW5ub3RhdGlvbnNcblx0XHRjb25zdCBleGlzdHMgPSBhbm5vdGF0aW9uQ29sdW1ucy5zb21lKGNvbHVtbiA9PiB7XG5cdFx0XHRyZXR1cm4gY29sdW1uLm5hbWUgPT09IHByb3BlcnR5Lm5hbWU7XG5cdFx0fSk7XG5cblx0XHQvLyBpZiB0YXJnZXQgdHlwZSBleGlzdHMsIGl0IGlzIGEgY29tcGxleCBwcm9wZXJ0eSBhbmQgc2hvdWxkIGJlIGlnbm9yZWRcblx0XHRpZiAoIXByb3BlcnR5LnRhcmdldFR5cGUgJiYgIWV4aXN0cykge1xuXHRcdFx0Y29uc3QgcmVsYXRlZFByb3BlcnRpZXNJbmZvOiBDb21wbGV4UHJvcGVydHlJbmZvID0gY29sbGVjdFJlbGF0ZWRQcm9wZXJ0aWVzKFxuXHRcdFx0XHRwcm9wZXJ0eS5uYW1lLFxuXHRcdFx0XHRwcm9wZXJ0eSxcblx0XHRcdFx0Y29udmVydGVyQ29udGV4dCxcblx0XHRcdFx0dHJ1ZSxcblx0XHRcdFx0dGFibGVUeXBlXG5cdFx0XHQpO1xuXHRcdFx0Y29uc3QgcmVsYXRlZFByb3BlcnR5TmFtZXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMocmVsYXRlZFByb3BlcnRpZXNJbmZvLnByb3BlcnRpZXMpO1xuXHRcdFx0Y29uc3QgYWRkaXRpb25hbFByb3BlcnR5TmFtZXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMocmVsYXRlZFByb3BlcnRpZXNJbmZvLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKTtcblx0XHRcdGNvbnN0IGNvbHVtbkluZm8gPSBnZXRDb2x1bW5EZWZpbml0aW9uRnJvbVByb3BlcnR5KFxuXHRcdFx0XHRwcm9wZXJ0eSxcblx0XHRcdFx0Y29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlTZXRCYXNlZEFubm90YXRpb25QYXRoKHByb3BlcnR5LmZ1bGx5UXVhbGlmaWVkTmFtZSksXG5cdFx0XHRcdHByb3BlcnR5Lm5hbWUsXG5cdFx0XHRcdHRydWUsXG5cdFx0XHRcdHRydWUsXG5cdFx0XHRcdG5vblNvcnRhYmxlQ29sdW1ucyxcblx0XHRcdFx0YWdncmVnYXRpb25IZWxwZXIsXG5cdFx0XHRcdGNvbnZlcnRlckNvbnRleHRcblx0XHRcdCk7XG5cdFx0XHRjb25zdCBzZW1hbnRpY0tleXMgPSBjb252ZXJ0ZXJDb250ZXh0LmdldEFubm90YXRpb25zQnlUZXJtKFwiQ29tbW9uXCIsIFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLlNlbWFudGljS2V5XCIsIFtcblx0XHRcdFx0Y29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKClcblx0XHRcdF0pWzBdO1xuXHRcdFx0Y29uc3Qgb0NvbHVtbkRyYWZ0SW5kaWNhdG9yID0gZ2V0RGVmYXVsdERyYWZ0SW5kaWNhdG9yRm9yQ29sdW1uKGNvbHVtbkluZm8ubmFtZSwgc2VtYW50aWNLZXlzKTtcblx0XHRcdGlmIChPYmplY3Qua2V5cyhvQ29sdW1uRHJhZnRJbmRpY2F0b3IpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Y29sdW1uSW5mby5mb3JtYXRPcHRpb25zID0ge1xuXHRcdFx0XHRcdC4uLm9Db2x1bW5EcmFmdEluZGljYXRvclxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKHJlbGF0ZWRQcm9wZXJ0eU5hbWVzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Y29sdW1uSW5mby5wcm9wZXJ0eUluZm9zID0gcmVsYXRlZFByb3BlcnR5TmFtZXM7XG5cdFx0XHRcdGNvbHVtbkluZm8uZXhwb3J0U2V0dGluZ3MgPSB7XG5cdFx0XHRcdFx0Li4uY29sdW1uSW5mby5leHBvcnRTZXR0aW5ncyxcblx0XHRcdFx0XHR0ZW1wbGF0ZTogcmVsYXRlZFByb3BlcnRpZXNJbmZvLmV4cG9ydFNldHRpbmdzVGVtcGxhdGUsXG5cdFx0XHRcdFx0d3JhcDogcmVsYXRlZFByb3BlcnRpZXNJbmZvLmV4cG9ydFNldHRpbmdzV3JhcHBpbmdcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQvLyBDb2xsZWN0IGluZm9ybWF0aW9uIG9mIHJlbGF0ZWQgY29sdW1ucyB0byBiZSBjcmVhdGVkLlxuXHRcdFx0XHRyZWxhdGVkUHJvcGVydHlOYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0XHRcdGNvbHVtbnNUb0JlQ3JlYXRlZFtuYW1lXSA9IHJlbGF0ZWRQcm9wZXJ0aWVzSW5mby5wcm9wZXJ0aWVzW25hbWVdO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGFkZGl0aW9uYWxQcm9wZXJ0eU5hbWVzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Y29sdW1uSW5mby5hZGRpdGlvbmFsUHJvcGVydHlJbmZvcyA9IGFkZGl0aW9uYWxQcm9wZXJ0eU5hbWVzO1xuXHRcdFx0XHQvLyBDcmVhdGUgY29sdW1ucyBmb3IgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIGlkZW50aWZpZWQgZm9yIEFMUCB1c2UgY2FzZS5cblx0XHRcdFx0YWRkaXRpb25hbFByb3BlcnR5TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdFx0XHQvLyBJbnRlbnRpb25hbCBvdmVyd3JpdGUgYXMgd2UgcmVxdWlyZSBvbmx5IG9uZSBuZXcgUHJvcGVydHlJbmZvIGZvciBhIHJlbGF0ZWQgUHJvcGVydHkuXG5cdFx0XHRcdFx0Y29sdW1uc1RvQmVDcmVhdGVkW25hbWVdID0gcmVsYXRlZFByb3BlcnRpZXNJbmZvLmFkZGl0aW9uYWxQcm9wZXJ0aWVzW25hbWVdO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHRhYmxlQ29sdW1ucy5wdXNoKGNvbHVtbkluZm8pO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiB0YWJsZUNvbHVtbnM7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIGNvbHVtbiBkZWZpbml0aW9uIGZyb20gYSBwcm9wZXJ0eS5cbiAqIEBwYXJhbSB7UHJvcGVydHl9IHByb3BlcnR5IEVudGl0eSB0eXBlIHByb3BlcnR5IGZvciB3aGljaCB0aGUgY29sdW1uIGlzIGNyZWF0ZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBmdWxsUHJvcGVydHlQYXRoIFRoZSBmdWxsIHBhdGggdG8gdGhlIHRhcmdldCBwcm9wZXJ0eVxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlUGF0aCBUaGUgcmVsYXRpdmUgcGF0aCB0byB0aGUgdGFyZ2V0IHByb3BlcnR5IGJhc2VkIG9uIHRoZSBjb250ZXh0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IHVzZURhdGFGaWVsZFByZWZpeCBTaG91bGQgYmUgcHJlZml4ZWQgd2l0aCBcIkRhdGFGaWVsZDo6XCIsIGVsc2UgaXQgd2lsbCBiZSBwcmVmaXhlZCB3aXRoIFwiUHJvcGVydHk6OlwiXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGF2YWlsYWJsZUZvckFkYXB0YXRpb24gRGVjaWRlcyB3aGV0aGVyIGNvbHVtbiBzaG91bGQgYmUgYXZhaWxhYmxlIGZvciBhZGFwdGF0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBub25Tb3J0YWJsZUNvbHVtbnMgVGhlIGFycmF5IG9mIGFsbCBub24gc29ydGFibGUgY29sdW1uIG5hbWVzXG4gKiBAcGFyYW0ge0FnZ3JlZ2F0aW9uSGVscGVyfSBhZ2dyZWdhdGlvbkhlbHBlciBUaGUgYWdncmVnYXRpb25IZWxwZXIgZm9yIHRoZSBlbnRpdHlcbiAqIEBwYXJhbSB7Q29udmVydGVyQ29udGV4dH0gY29udmVydGVyQ29udGV4dCBUaGUgY29udmVydGVyIGNvbnRleHRcbiAqIEByZXR1cm5zIHtBbm5vdGF0aW9uVGFibGVDb2x1bW59IFRoZSBhbm5vdGF0aW9uIGNvbHVtbiBkZWZpbml0aW9uXG4gKi9cbmNvbnN0IGdldENvbHVtbkRlZmluaXRpb25Gcm9tUHJvcGVydHkgPSBmdW5jdGlvbihcblx0cHJvcGVydHk6IFByb3BlcnR5LFxuXHRmdWxsUHJvcGVydHlQYXRoOiBzdHJpbmcsXG5cdHJlbGF0aXZlUGF0aDogc3RyaW5nLFxuXHR1c2VEYXRhRmllbGRQcmVmaXg6IGJvb2xlYW4sXG5cdGF2YWlsYWJsZUZvckFkYXB0YXRpb246IGJvb2xlYW4sXG5cdG5vblNvcnRhYmxlQ29sdW1uczogc3RyaW5nW10sXG5cdGFnZ3JlZ2F0aW9uSGVscGVyOiBBZ2dyZWdhdGlvbkhlbHBlcixcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dFxuKTogQW5ub3RhdGlvblRhYmxlQ29sdW1uIHtcblx0Y29uc3QgbmFtZSA9IHVzZURhdGFGaWVsZFByZWZpeCA/IHJlbGF0aXZlUGF0aCA6IFwiUHJvcGVydHk6OlwiICsgcmVsYXRpdmVQYXRoO1xuXHRjb25zdCBrZXkgPSAodXNlRGF0YUZpZWxkUHJlZml4ID8gXCJEYXRhRmllbGQ6OlwiIDogXCJQcm9wZXJ0eTo6XCIpICsgcmVwbGFjZVNwZWNpYWxDaGFycyhyZWxhdGl2ZVBhdGgpO1xuXHRjb25zdCBzZW1hbnRpY09iamVjdEFubm90YXRpb25QYXRoID0gZ2V0U2VtYW50aWNPYmplY3RQYXRoKGNvbnZlcnRlckNvbnRleHQsIHByb3BlcnR5KTtcblx0Y29uc3QgaXNIaWRkZW4gPSBwcm9wZXJ0eS5hbm5vdGF0aW9ucz8uVUk/LkhpZGRlbj8udmFsdWVPZigpID09PSB0cnVlO1xuXHRjb25zdCBncm91cFBhdGg6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHByb3BlcnR5Lm5hbWUgPyBfc2xpY2VBdFNsYXNoKHByb3BlcnR5Lm5hbWUsIHRydWUsIGZhbHNlKSA6IHVuZGVmaW5lZDtcblx0Y29uc3QgaXNHcm91cDogYm9vbGVhbiA9IGdyb3VwUGF0aCAhPSBwcm9wZXJ0eS5uYW1lO1xuXHRjb25zdCBpc0RhdGFQb2ludEZha2VQcm9wZXJ0eTogYm9vbGVhbiA9IG5hbWUuaW5kZXhPZihcIkBjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhUG9pbnRcIikgPiAtMTtcblx0Y29uc3QgZXhwb3J0VHlwZTogc3RyaW5nID0gX2dldEV4cG9ydERhdGFUeXBlKHByb3BlcnR5LnR5cGUpO1xuXHRjb25zdCBzRGF0ZUlucHV0Rm9ybWF0OiBzdHJpbmcgfCB1bmRlZmluZWQgPSBwcm9wZXJ0eS50eXBlID09PSBcIkVkbS5EYXRlXCIgPyBcIllZWVktTU0tRERcIiA6IHVuZGVmaW5lZDtcblx0Y29uc3QgZGF0YVR5cGU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IGdldERhdGFGaWVsZERhdGFUeXBlKHByb3BlcnR5KTtcblx0Y29uc3QgcHJvcGVydHlUeXBlQ29uZmlnID0gIWlzRGF0YVBvaW50RmFrZVByb3BlcnR5ID8gZ2V0VHlwZUNvbmZpZyhwcm9wZXJ0eSwgZGF0YVR5cGUpIDogdW5kZWZpbmVkO1xuXHRjb25zdCBvVHlwZUNvbmZpZyA9ICFpc0RhdGFQb2ludEZha2VQcm9wZXJ0eVxuXHRcdD8ge1xuXHRcdFx0XHRjbGFzc05hbWU6IHByb3BlcnR5LnR5cGUgfHwgZGF0YVR5cGUsXG5cdFx0XHRcdG9Gb3JtYXRPcHRpb25zOiBwcm9wZXJ0eVR5cGVDb25maWcuZm9ybWF0T3B0aW9ucyxcblx0XHRcdFx0b0NvbnN0cmFpbnRzOiBwcm9wZXJ0eVR5cGVDb25maWcuY29uc3RyYWludHNcblx0XHQgIH1cblx0XHQ6IHVuZGVmaW5lZDtcblx0Y29uc3QgZXhwb3J0U2V0dGluZ3MgPSBpc0RhdGFQb2ludEZha2VQcm9wZXJ0eVxuXHRcdD8ge1xuXHRcdFx0XHR0ZW1wbGF0ZTogZ2V0VGFyZ2V0VmFsdWVPbkRhdGFQb2ludChwcm9wZXJ0eSlcblx0XHQgIH1cblx0XHQ6IHtcblx0XHRcdFx0dHlwZTogZXhwb3J0VHlwZSxcblx0XHRcdFx0aW5wdXRGb3JtYXQ6IHNEYXRlSW5wdXRGb3JtYXQsXG5cdFx0XHRcdHNjYWxlOiBwcm9wZXJ0eS5zY2FsZSxcblx0XHRcdFx0ZGVsaW1pdGVyOiBwcm9wZXJ0eS50eXBlID09PSBcIkVkbS5JbnQ2NFwiID8gdHJ1ZSA6IGZhbHNlLFxuXHRcdFx0XHR0cnVlVmFsdWU6IHByb3BlcnR5LnR5cGUgPT09IFwiRWRtLkJvb2xlYW5cIiA/IFwiWWVzXCIgOiB1bmRlZmluZWQsXG5cdFx0XHRcdGZhbHNlVmFsdWU6IHByb3BlcnR5LnR5cGUgPT09IFwiRWRtLkJvb2xlYW5cIiA/IFwiTm9cIiA6IHVuZGVmaW5lZFxuXHRcdCAgfTtcblx0cmV0dXJuIHtcblx0XHRrZXk6IGtleSxcblx0XHRpc0dyb3VwYWJsZTogIWlzRGF0YVBvaW50RmFrZVByb3BlcnR5ICYmICFpc0hpZGRlbiA/IGFnZ3JlZ2F0aW9uSGVscGVyLmlzUHJvcGVydHlHcm91cGFibGUocHJvcGVydHkpIDogZmFsc2UsXG5cdFx0dHlwZTogQ29sdW1uVHlwZS5Bbm5vdGF0aW9uLFxuXHRcdGxhYmVsOiBfZ2V0TGFiZWwocHJvcGVydHksIGlzR3JvdXApLFxuXHRcdGdyb3VwTGFiZWw6IGlzR3JvdXAgPyBfZ2V0TGFiZWwocHJvcGVydHkpIDogbnVsbCxcblx0XHRncm91cDogaXNHcm91cCA/IGdyb3VwUGF0aCA6IG51bGwsXG5cdFx0YW5ub3RhdGlvblBhdGg6IGZ1bGxQcm9wZXJ0eVBhdGgsXG5cdFx0c2VtYW50aWNPYmplY3RQYXRoOiBzZW1hbnRpY09iamVjdEFubm90YXRpb25QYXRoLFxuXHRcdC8vIEEgZmFrZSBwcm9wZXJ0eSB3YXMgY3JlYXRlZCBmb3IgdGhlIFRhcmdldFZhbHVlIHVzZWQgb24gRGF0YVBvaW50cywgdGhpcyBwcm9wZXJ0eSBzaG91bGQgYmUgaGlkZGVuIGFuZCBub24gc29ydGFibGVcblx0XHRhdmFpbGFiaWxpdHk6XG5cdFx0XHQhYXZhaWxhYmxlRm9yQWRhcHRhdGlvbiB8fCBpc0hpZGRlbiB8fCBpc0RhdGFQb2ludEZha2VQcm9wZXJ0eSA/IEF2YWlsYWJpbGl0eVR5cGUuSGlkZGVuIDogQXZhaWxhYmlsaXR5VHlwZS5BZGFwdGF0aW9uLFxuXHRcdG5hbWU6IG5hbWUsXG5cdFx0cmVsYXRpdmVQYXRoOiBpc0RhdGFQb2ludEZha2VQcm9wZXJ0eVxuXHRcdFx0PyAocHJvcGVydHkgYXMgYW55KS5hbm5vdGF0aW9ucz8uVUk/LkRhdGFGaWVsZERlZmF1bHQ/LlRhcmdldD8uJHRhcmdldD8uVmFsdWU/LnBhdGggfHwgKHByb3BlcnR5IGFzIGFueSkuVmFsdWUucGF0aFxuXHRcdFx0OiByZWxhdGl2ZVBhdGgsXG5cdFx0c29ydGFibGU6ICFpc0hpZGRlbiAmJiBub25Tb3J0YWJsZUNvbHVtbnMuaW5kZXhPZihyZWxhdGl2ZVBhdGgpID09PSAtMSAmJiAhaXNEYXRhUG9pbnRGYWtlUHJvcGVydHksXG5cdFx0aXNLZXk6IHByb3BlcnR5LmlzS2V5LFxuXHRcdGlzRGF0YVBvaW50RmFrZVRhcmdldFByb3BlcnR5OiBpc0RhdGFQb2ludEZha2VQcm9wZXJ0eSxcblx0XHRleHBvcnRTZXR0aW5nczogZXhwb3J0U2V0dGluZ3MsXG5cdFx0Y2FzZVNlbnNpdGl2ZTogaXNGaWx0ZXJpbmdDYXNlU2Vuc2l0aXZlKGNvbnZlcnRlckNvbnRleHQpLFxuXHRcdHR5cGVDb25maWc6IG9UeXBlQ29uZmlnLFxuXHRcdHZpc3VhbFNldHRpbmdzOiBpc0RhdGFQb2ludEZha2VQcm9wZXJ0eSA/IHsgd2lkdGhDYWxjdWxhdGlvbjogbnVsbCB9IDogdW5kZWZpbmVkXG5cdH0gYXMgQW5ub3RhdGlvblRhYmxlQ29sdW1uO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIEJvb2xlYW4gdHJ1ZSBmb3IgdmFsaWQgY29sdW1ucywgZmFsc2UgZm9yIGludmFsaWQgY29sdW1ucy5cbiAqXG4gKiBAcGFyYW0ge0RhdGFGaWVsZEFic3RyYWN0VHlwZXN9IGRhdGFGaWVsZCBEaWZmZXJlbnQgRGF0YUZpZWxkIHR5cGVzIGRlZmluZWQgaW4gdGhlIGFubm90YXRpb25zXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBmb3IgdmFsaWQgY29sdW1ucywgZmFsc2UgZm9yIGludmFsaWQgY29sdW1uc1xuICogQHByaXZhdGVcbiAqL1xuY29uc3QgX2lzVmFsaWRDb2x1bW4gPSBmdW5jdGlvbihkYXRhRmllbGQ6IERhdGFGaWVsZEFic3RyYWN0VHlwZXMpIHtcblx0c3dpdGNoIChkYXRhRmllbGQuJFR5cGUpIHtcblx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckFjdGlvbjpcblx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvbjpcblx0XHRcdHJldHVybiAhIWRhdGFGaWVsZC5JbmxpbmU7XG5cdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRXaXRoQWN0aW9uOlxuXHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkV2l0aEludGVudEJhc2VkTmF2aWdhdGlvbjpcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZDpcblx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZFdpdGhVcmw6XG5cdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRGb3JBbm5vdGF0aW9uOlxuXHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkV2l0aE5hdmlnYXRpb25QYXRoOlxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0ZGVmYXVsdDpcblx0XHQvLyBUb2RvOiBSZXBsYWNlIHdpdGggcHJvcGVyIExvZyBzdGF0ZW1lbnQgb25jZSBhdmFpbGFibGVcblx0XHQvLyAgdGhyb3cgbmV3IEVycm9yKFwiVW5oYW5kbGVkIERhdGFGaWVsZCBBYnN0cmFjdCB0eXBlOiBcIiArIGRhdGFGaWVsZC4kVHlwZSk7XG5cdH1cbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYmluZGluZyBleHByZXNzaW9uIHRvIGV2YWx1YXRlIHRoZSB2aXNpYmlsaXR5IG9mIGEgRGF0YUZpZWxkIG9yIERhdGFQb2ludCBhbm5vdGF0aW9uLlxuICpcbiAqIFNBUCBGaW9yaSBlbGVtZW50cyB3aWxsIGV2YWx1YXRlIGVpdGhlciB0aGUgVUkuSGlkZGVuIGFubm90YXRpb24gZGVmaW5lZCBvbiB0aGUgYW5ub3RhdGlvbiBpdHNlbGYgb3Igb24gdGhlIHRhcmdldCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge0RhdGFNb2RlbE9iamVjdFBhdGh9IGRhdGFGaWVsZE1vZGVsUGF0aCBUaGUgbWV0YXBhdGggcmVmZXJyaW5nIHRvIHRoZSBhbm5vdGF0aW9uIHRoYXQgaXMgZXZhbHVhdGVkIGJ5IFNBUCBGaW9yaSBlbGVtZW50cy5cbiAqIEBwYXJhbSB7RmllbGRGb3JtYXRPcHRpb25zfSBbZm9ybWF0T3B0aW9uc10gRm9ybWF0T3B0aW9ucyBpcyBvcHRpb25hbCwgdXNlZCB0byBjaGVjayBpZiB0aGUgYW5hbHl0aWMgdGFibGUgaGFzIEdyb3VwSGVhZGVyIGV4cGFuZGVkLlxuICogQHBhcmFtIHtib29sZWFufSBbcmV0dXJuRXhwcmVzc2lvbl0gUmV0dXJuRXhwcmVzc2lvbiBvcHRpb25hbC5cbiAqIEByZXR1cm5zIHtCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+fSBBbiBleHByZXNzaW9uIHRoYXQgeW91IGNhbiBiaW5kIHRvIHRoZSBVSS5cbiAqL1xuZXhwb3J0IGNvbnN0IF9nZXRWaXNpYmxlRXhwcmVzc2lvbiA9IGZ1bmN0aW9uKFxuXHRkYXRhRmllbGRNb2RlbFBhdGg6IERhdGFNb2RlbE9iamVjdFBhdGgsXG5cdGZvcm1hdE9wdGlvbnM/OiBhbnksXG5cdHJldHVybkV4cHJlc3Npb24/OiBCb29sZWFuXG4pOiBCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+IHtcblx0Y29uc3QgdGFyZ2V0T2JqZWN0OiBEYXRhRmllbGRBYnN0cmFjdFR5cGVzIHwgRGF0YVBvaW50VHlwZVR5cGVzID0gZGF0YUZpZWxkTW9kZWxQYXRoLnRhcmdldE9iamVjdDtcblx0bGV0IHByb3BlcnR5VmFsdWU7XG5cdGlmICh0YXJnZXRPYmplY3QpIHtcblx0XHRzd2l0Y2ggKHRhcmdldE9iamVjdC4kVHlwZSkge1xuXHRcdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGQ6XG5cdFx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZFdpdGhVcmw6XG5cdFx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZFdpdGhOYXZpZ2F0aW9uUGF0aDpcblx0XHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkV2l0aEludGVudEJhc2VkTmF2aWdhdGlvbjpcblx0XHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkV2l0aEFjdGlvbjpcblx0XHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuRGF0YVBvaW50VHlwZTpcblx0XHRcdFx0cHJvcGVydHlWYWx1ZSA9IHRhcmdldE9iamVjdC5WYWx1ZS4kdGFyZ2V0O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkRm9yQW5ub3RhdGlvbjpcblx0XHRcdFx0Ly8gaWYgaXQgaXMgYSBEYXRhRmllbGRGb3JBbm5vdGF0aW9uIHBvaW50aW5nIHRvIGEgRGF0YVBvaW50IHdlIGxvb2sgYXQgdGhlIGRhdGFQb2ludCdzIHZhbHVlXG5cdFx0XHRcdGlmICh0YXJnZXRPYmplY3Q/LlRhcmdldD8uJHRhcmdldD8uJFR5cGUgPT09IFVJQW5ub3RhdGlvblR5cGVzLkRhdGFQb2ludFR5cGUpIHtcblx0XHRcdFx0XHRwcm9wZXJ0eVZhbHVlID0gdGFyZ2V0T2JqZWN0LlRhcmdldC4kdGFyZ2V0Py5WYWx1ZS4kdGFyZ2V0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb246XG5cdFx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckFjdGlvbjpcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHByb3BlcnR5VmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cdGNvbnN0IGlzQW5hbHl0aWNhbEdyb3VwSGVhZGVyRXhwYW5kZWQgPSBmb3JtYXRPcHRpb25zPy5pc0FuYWx5dGljcyA/IFVJLklzRXhwYW5kZWQgOiBjb25zdGFudChmYWxzZSk7XG5cdGNvbnN0IGlzQW5hbHl0aWNhbExlYWYgPSBmb3JtYXRPcHRpb25zPy5pc0FuYWx5dGljcyA/IGVxdWFsKFVJLk5vZGVMZXZlbCwgMCkgOiBjb25zdGFudChmYWxzZSk7XG5cblx0Ly8gQSBkYXRhIGZpZWxkIGlzIHZpc2libGUgaWY6XG5cdC8vIC0gdGhlIFVJLkhpZGRlbiBleHByZXNzaW9uIGluIHRoZSBvcmlnaW5hbCBhbm5vdGF0aW9uIGRvZXMgbm90IGV2YWx1YXRlIHRvICd0cnVlJ1xuXHQvLyAtIHRoZSBVSS5IaWRkZW4gZXhwcmVzc2lvbiBpbiB0aGUgdGFyZ2V0IHByb3BlcnR5IGRvZXMgbm90IGV2YWx1YXRlIHRvICd0cnVlJ1xuXHQvLyAtIGluIGNhc2Ugb2YgQW5hbHl0aWNzIGl0J3Mgbm90IHZpc2libGUgZm9yIGFuIGV4cGFuZGVkIEdyb3VwSGVhZGVyXG5cdGNvbnN0IGV4cHJlc3Npb24gPSBhbmQoXG5cdFx0Li4uW1xuXHRcdFx0bm90KGVxdWFsKGFubm90YXRpb25FeHByZXNzaW9uKHRhcmdldE9iamVjdD8uYW5ub3RhdGlvbnM/LlVJPy5IaWRkZW4pLCB0cnVlKSksXG5cdFx0XHRpZkVsc2UoISFwcm9wZXJ0eVZhbHVlLCBwcm9wZXJ0eVZhbHVlICYmIG5vdChlcXVhbChhbm5vdGF0aW9uRXhwcmVzc2lvbihwcm9wZXJ0eVZhbHVlLmFubm90YXRpb25zPy5VST8uSGlkZGVuKSwgdHJ1ZSkpLCB0cnVlKSxcblx0XHRcdG9yKG5vdChpc0FuYWx5dGljYWxHcm91cEhlYWRlckV4cGFuZGVkKSwgaXNBbmFseXRpY2FsTGVhZilcblx0XHRdXG5cdCk7XG5cdHJldHVybiByZXR1cm5FeHByZXNzaW9uID8gKGV4cHJlc3Npb24gYXMgQmluZGluZ0V4cHJlc3Npb248c3RyaW5nPikgOiBjb21waWxlQmluZGluZyhleHByZXNzaW9uKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBoaWRkZW4gYmluZGluZyBleHByZXNzaW9ucyBmb3IgYSBmaWVsZCBncm91cC5cbiAqIEBwYXJhbSB7RGF0YUZpZWxkQWJzdHJhY3RUeXBlc30gZGF0YUZpZWxkR3JvdXAgRGF0YUZpZWxkIGRlZmluZWQgaW4gdGhlIGFubm90YXRpb25zXG4gKiBAcGFyYW0ge0ZpZWxkRm9ybWF0T3B0aW9uc30gW2ZpZWxkRm9ybWF0T3B0aW9uc10gRm9ybWF0T3B0aW9ucyBpcyBvcHRpb25hbCwgdXNlZCB0byBjaGVjayBpZiB0aGUgYW5hbHl0aWMgdGFibGUgaGFzIEdyb3VwSGVhZGVyIGV4cGFuZGVkLlxuICogQHJldHVybnMge0JpbmRpbmdFeHByZXNzaW9uPHN0cmluZz59IENvbXBpbGUgYmluZGluZyBvZiBmaWVsZCBncm91cCBleHByZXNzaW9ucy5cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IF9nZXRGaWVsZEdyb3VwSGlkZGVuRXhwcmVzc2lvbnMgPSBmdW5jdGlvbihcblx0ZGF0YUZpZWxkR3JvdXA6IERhdGFGaWVsZEFic3RyYWN0VHlwZXMsXG5cdGZpZWxkRm9ybWF0T3B0aW9uczogYW55XG4pOiBCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+IHtcblx0Y29uc3QgYUZpZWxkR3JvdXBIaWRkZW5FeHByZXNzaW9uczogQmluZGluZ0V4cHJlc3Npb248c3RyaW5nPltdID0gW107XG5cdGlmIChcblx0XHRkYXRhRmllbGRHcm91cC4kVHlwZSA9PT0gVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkRm9yQW5ub3RhdGlvbiAmJlxuXHRcdGRhdGFGaWVsZEdyb3VwLlRhcmdldD8uJHRhcmdldD8uJFR5cGUgPT09IFVJQW5ub3RhdGlvblR5cGVzLkZpZWxkR3JvdXBUeXBlXG5cdCkge1xuXHRcdGRhdGFGaWVsZEdyb3VwLlRhcmdldC4kdGFyZ2V0LkRhdGE/LmZvckVhY2goKGlubmVyRGF0YUZpZWxkOiBEYXRhRmllbGRBYnN0cmFjdFR5cGVzIHwgRGF0YVBvaW50VHlwZVR5cGVzKSA9PiB7XG5cdFx0XHRhRmllbGRHcm91cEhpZGRlbkV4cHJlc3Npb25zLnB1c2goXG5cdFx0XHRcdF9nZXRWaXNpYmxlRXhwcmVzc2lvbih7IHRhcmdldE9iamVjdDogaW5uZXJEYXRhRmllbGQgfSBhcyBEYXRhTW9kZWxPYmplY3RQYXRoLCBmaWVsZEZvcm1hdE9wdGlvbnMsIHRydWUpXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHRcdHJldHVybiBjb21waWxlQmluZGluZyhcblx0XHRcdGlmRWxzZShvciguLi4oYUZpZWxkR3JvdXBIaWRkZW5FeHByZXNzaW9ucyBhcyBFeHByZXNzaW9uT3JQcmltaXRpdmU8Ym9vbGVhbj5bXSkpLCBjb25zdGFudCh0cnVlKSwgY29uc3RhbnQoZmFsc2UpKVxuXHRcdCk7XG5cdH1cbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbGFiZWwgZm9yIHRoZSBwcm9wZXJ0eSBhbmQgZGF0YUZpZWxkLlxuICogQHBhcmFtIHtEYXRhRmllbGRBYnN0cmFjdFR5cGVzIHwgUHJvcGVydHl9IFtwcm9wZXJ0eV0gUHJvcGVydHkgb3IgRGF0YUZpZWxkIGRlZmluZWQgaW4gdGhlIGFubm90YXRpb25zXG4gKiBAcGFyYW0gaXNHcm91cFxuICogQHJldHVybnMge3N0cmluZ30gTGFiZWwgb2YgdGhlIHByb3BlcnR5IG9yIERhdGFGaWVsZFxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgX2dldExhYmVsID0gZnVuY3Rpb24ocHJvcGVydHk6IERhdGFGaWVsZEFic3RyYWN0VHlwZXMgfCBQcm9wZXJ0eSwgaXNHcm91cDogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0aWYgKCFwcm9wZXJ0eSkge1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cblx0aWYgKGlzUHJvcGVydHkocHJvcGVydHkpKSB7XG5cdFx0Y29uc3QgZGF0YUZpZWxkRGVmYXVsdCA9IHByb3BlcnR5LmFubm90YXRpb25zPy5VST8uRGF0YUZpZWxkRGVmYXVsdDtcblx0XHRpZiAoZGF0YUZpZWxkRGVmYXVsdCAmJiAhZGF0YUZpZWxkRGVmYXVsdC5xdWFsaWZpZXIgJiYgZGF0YUZpZWxkRGVmYXVsdC5MYWJlbD8udmFsdWVPZigpKSB7XG5cdFx0XHRyZXR1cm4gY29tcGlsZUJpbmRpbmcoYW5ub3RhdGlvbkV4cHJlc3Npb24oZGF0YUZpZWxkRGVmYXVsdC5MYWJlbD8udmFsdWVPZigpKSk7XG5cdFx0fVxuXHRcdHJldHVybiBjb21waWxlQmluZGluZyhhbm5vdGF0aW9uRXhwcmVzc2lvbihwcm9wZXJ0eS5hbm5vdGF0aW9ucy5Db21tb24/LkxhYmVsPy52YWx1ZU9mKCkgfHwgcHJvcGVydHkubmFtZSkpO1xuXHR9IGVsc2UgaWYgKGlzRGF0YUZpZWxkVHlwZXMocHJvcGVydHkpKSB7XG5cdFx0aWYgKCEhaXNHcm91cCAmJiBwcm9wZXJ0eS4kVHlwZSA9PT0gVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkV2l0aEludGVudEJhc2VkTmF2aWdhdGlvbikge1xuXHRcdFx0cmV0dXJuIGNvbXBpbGVCaW5kaW5nKGFubm90YXRpb25FeHByZXNzaW9uKHByb3BlcnR5LkxhYmVsPy52YWx1ZU9mKCkpKTtcblx0XHR9XG5cdFx0cmV0dXJuIGNvbXBpbGVCaW5kaW5nKFxuXHRcdFx0YW5ub3RhdGlvbkV4cHJlc3Npb24oXG5cdFx0XHRcdHByb3BlcnR5LkxhYmVsPy52YWx1ZU9mKCkgfHwgcHJvcGVydHkuVmFsdWU/LiR0YXJnZXQ/LmFubm90YXRpb25zPy5Db21tb24/LkxhYmVsPy52YWx1ZU9mKCkgfHwgcHJvcGVydHkuVmFsdWU/LiR0YXJnZXQ/Lm5hbWVcblx0XHRcdClcblx0XHQpO1xuXHR9IGVsc2UgaWYgKHByb3BlcnR5LiRUeXBlID09PSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRGb3JBbm5vdGF0aW9uKSB7XG5cdFx0cmV0dXJuIGNvbXBpbGVCaW5kaW5nKFxuXHRcdFx0YW5ub3RhdGlvbkV4cHJlc3Npb24oXG5cdFx0XHRcdHByb3BlcnR5LkxhYmVsPy52YWx1ZU9mKCkgfHwgKHByb3BlcnR5LlRhcmdldD8uJHRhcmdldCBhcyBEYXRhUG9pbnQpPy5WYWx1ZT8uJHRhcmdldD8uYW5ub3RhdGlvbnM/LkNvbW1vbj8uTGFiZWw/LnZhbHVlT2YoKVxuXHRcdFx0KVxuXHRcdCk7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIGNvbXBpbGVCaW5kaW5nKGFubm90YXRpb25FeHByZXNzaW9uKHByb3BlcnR5LkxhYmVsPy52YWx1ZU9mKCkpKTtcblx0fVxufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgUHJvcGVydHlJbmZvIGZvciBlYWNoIGlkZW50aWZpZWQgcHJvcGVydHkgY29uc3VtZWQgYnkgYSBMaW5lSXRlbS5cbiAqXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIFByb3BlcnR5Pn0gY29sdW1uc1RvQmVDcmVhdGVkIElkZW50aWZpZWQgcHJvcGVydGllcy5cbiAqIEBwYXJhbSBleGlzdGluZ0NvbHVtbnMgVGhlIGxpc3Qgb2YgY29sdW1ucyBjcmVhdGVkIGZvciBMaW5lSXRlbXMgYW5kIFByb3BlcnRpZXMgb2YgZW50aXR5VHlwZS5cbiAqIEBwYXJhbSBub25Tb3J0YWJsZUNvbHVtbnMgVGhlIGFycmF5IG9mIGNvbHVtbiBuYW1lcyB3aGljaCBjYW5ub3QgYmUgc29ydGVkLlxuICogQHBhcmFtIGNvbnZlcnRlckNvbnRleHQgVGhlIGNvbnZlcnRlciBjb250ZXh0LlxuICogQHBhcmFtIGVudGl0eVR5cGUgVGhlIGVudGl0eSB0eXBlIGZvciB0aGUgTGluZUl0ZW1cbiAqIEByZXR1cm5zIHtBbm5vdGF0aW9uVGFibGVDb2x1bW5bXX0gVGhlIGFycmF5IG9mIGNvbHVtbnMgY3JlYXRlZC5cbiAqL1xuY29uc3QgX2NyZWF0ZVJlbGF0ZWRDb2x1bW5zID0gZnVuY3Rpb24oXG5cdGNvbHVtbnNUb0JlQ3JlYXRlZDogUmVjb3JkPHN0cmluZywgUHJvcGVydHk+LFxuXHRleGlzdGluZ0NvbHVtbnM6IEFubm90YXRpb25UYWJsZUNvbHVtbltdLFxuXHRub25Tb3J0YWJsZUNvbHVtbnM6IHN0cmluZ1tdLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHRlbnRpdHlUeXBlOiBFbnRpdHlUeXBlXG4pOiBBbm5vdGF0aW9uVGFibGVDb2x1bW5bXSB7XG5cdGNvbnN0IHJlbGF0ZWRDb2x1bW5zOiBBbm5vdGF0aW9uVGFibGVDb2x1bW5bXSA9IFtdO1xuXHRjb25zdCByZWxhdGVkUHJvcGVydHlOYW1lTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG5cdGNvbnN0IGFnZ3JlZ2F0aW9uSGVscGVyID0gbmV3IEFnZ3JlZ2F0aW9uSGVscGVyKGVudGl0eVR5cGUsIGNvbnZlcnRlckNvbnRleHQpO1xuXG5cdE9iamVjdC5rZXlzKGNvbHVtbnNUb0JlQ3JlYXRlZCkuZm9yRWFjaChuYW1lID0+IHtcblx0XHRjb25zdCBwcm9wZXJ0eSA9IGNvbHVtbnNUb0JlQ3JlYXRlZFtuYW1lXSxcblx0XHRcdGFubm90YXRpb25QYXRoID0gY29udmVydGVyQ29udGV4dC5nZXRBYnNvbHV0ZUFubm90YXRpb25QYXRoKG5hbWUpLFxuXHRcdFx0Ly8gQ2hlY2sgd2hldGhlciB0aGUgcmVsYXRlZCBjb2x1bW4gYWxyZWFkeSBleGlzdHMuXG5cdFx0XHRyZWxhdGVkQ29sdW1uID0gZXhpc3RpbmdDb2x1bW5zLmZpbmQoY29sdW1uID0+IGNvbHVtbi5uYW1lID09PSBuYW1lKTtcblx0XHRpZiAocmVsYXRlZENvbHVtbiA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHQvLyBDYXNlIDE6IEtleSBjb250YWlucyBEYXRhRmllbGQgcHJlZml4IHRvIGVuc3VyZSBhbGwgcHJvcGVydHkgY29sdW1ucyBoYXZlIHRoZSBzYW1lIGtleSBmb3JtYXQuXG5cdFx0XHQvLyBOZXcgY3JlYXRlZCBwcm9wZXJ0eSBjb2x1bW4gaXMgc2V0IHRvIGhpZGRlbi5cblx0XHRcdHJlbGF0ZWRDb2x1bW5zLnB1c2goXG5cdFx0XHRcdGdldENvbHVtbkRlZmluaXRpb25Gcm9tUHJvcGVydHkoXG5cdFx0XHRcdFx0cHJvcGVydHksXG5cdFx0XHRcdFx0YW5ub3RhdGlvblBhdGgsXG5cdFx0XHRcdFx0bmFtZSxcblx0XHRcdFx0XHR0cnVlLFxuXHRcdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHRcdG5vblNvcnRhYmxlQ29sdW1ucyxcblx0XHRcdFx0XHRhZ2dyZWdhdGlvbkhlbHBlcixcblx0XHRcdFx0XHRjb252ZXJ0ZXJDb250ZXh0XG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChcblx0XHRcdHJlbGF0ZWRDb2x1bW4uYW5ub3RhdGlvblBhdGggIT09IGFubm90YXRpb25QYXRoIHx8XG5cdFx0XHQocmVsYXRlZENvbHVtbi5wcm9wZXJ0eUluZm9zICYmIHJlbGF0ZWRDb2x1bW4ucHJvcGVydHlJbmZvcy5pbmRleE9mKG5hbWUpICE9PSAtMSlcblx0XHQpIHtcblx0XHRcdC8vIENhc2UgMjogVGhlIGV4aXN0aW5nIGNvbHVtbiBwb2ludHMgdG8gYSBMaW5lSXRlbSAob3IpXG5cdFx0XHQvLyBDYXNlIDM6IFRoaXMgaXMgYSBzZWxmIHJlZmVyZW5jZSBmcm9tIGFuIGV4aXN0aW5nIGNvbHVtbiBhbmRcblx0XHRcdC8vIGJvdGggY2FzZXMgcmVxdWlyZSBhIGR1bW15IFByb3BlcnR5SW5mbyBmb3Igc2V0dGluZyBjb3JyZWN0IGV4cG9ydCBzZXR0aW5ncy5cblxuXHRcdFx0Y29uc3QgbmV3TmFtZSA9IFwiUHJvcGVydHk6OlwiICsgbmFtZTtcblxuXHRcdFx0Ly8gQ2hlY2tpbmcgd2hldGhlciB0aGUgcmVsYXRlZCBwcm9wZXJ0eSBjb2x1bW4gaGFzIGFscmVhZHkgYmVlbiBjcmVhdGVkIGluIGEgcHJldmlvdXMgaXRlcmF0aW9uLlxuXHRcdFx0aWYgKCFleGlzdGluZ0NvbHVtbnMuc29tZShjb2x1bW4gPT4gY29sdW1uLm5hbWUgPT09IG5ld05hbWUpKSB7XG5cdFx0XHRcdC8vIENyZWF0ZSBhIG5ldyBwcm9wZXJ0eSBjb2x1bW4gd2l0aCAnUHJvcGVydHk6OicgcHJlZml4LFxuXHRcdFx0XHQvLyBTZXQgaXQgdG8gaGlkZGVuIGFzIGl0IGlzIG9ubHkgY29uc3VtZWQgYnkgQ29tcGxleCBwcm9wZXJ0eSBpbmZvcy5cblx0XHRcdFx0cmVsYXRlZENvbHVtbnMucHVzaChcblx0XHRcdFx0XHRnZXRDb2x1bW5EZWZpbml0aW9uRnJvbVByb3BlcnR5KFxuXHRcdFx0XHRcdFx0cHJvcGVydHksXG5cdFx0XHRcdFx0XHRhbm5vdGF0aW9uUGF0aCxcblx0XHRcdFx0XHRcdG5hbWUsXG5cdFx0XHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHRcdFx0bm9uU29ydGFibGVDb2x1bW5zLFxuXHRcdFx0XHRcdFx0YWdncmVnYXRpb25IZWxwZXIsXG5cdFx0XHRcdFx0XHRjb252ZXJ0ZXJDb250ZXh0XG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZWxhdGVkUHJvcGVydHlOYW1lTWFwW25hbWVdID0gbmV3TmFtZTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdC8vIFRoZSBwcm9wZXJ0eSAnbmFtZScgaGFzIGJlZW4gcHJlZml4ZWQgd2l0aCAnUHJvcGVydHk6OicgZm9yIHVuaXF1ZW5lc3MuXG5cdC8vIFVwZGF0ZSB0aGUgc2FtZSBpbiBvdGhlciBwcm9wZXJ0eUluZm9zW10gcmVmZXJlbmNlcyB3aGljaCBwb2ludCB0byB0aGlzIHByb3BlcnR5LlxuXHRleGlzdGluZ0NvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuXHRcdGNvbHVtbi5wcm9wZXJ0eUluZm9zID0gY29sdW1uLnByb3BlcnR5SW5mb3M/Lm1hcChwcm9wZXJ0eUluZm8gPT4gcmVsYXRlZFByb3BlcnR5TmFtZU1hcFtwcm9wZXJ0eUluZm9dID8/IHByb3BlcnR5SW5mbyk7XG5cdFx0Y29sdW1uLmFkZGl0aW9uYWxQcm9wZXJ0eUluZm9zID0gY29sdW1uLmFkZGl0aW9uYWxQcm9wZXJ0eUluZm9zPy5tYXAoXG5cdFx0XHRwcm9wZXJ0eUluZm8gPT4gcmVsYXRlZFByb3BlcnR5TmFtZU1hcFtwcm9wZXJ0eUluZm9dID8/IHByb3BlcnR5SW5mb1xuXHRcdCk7XG5cdH0pO1xuXG5cdHJldHVybiByZWxhdGVkQ29sdW1ucztcbn07XG5cbi8qKlxuICogR2V0dGluZyB0aGUgQ29sdW1uIE5hbWVcbiAqIElmIGl0IHBvaW50cyB0byBhIERhdGFGaWVsZCB3aXRoIG9uZSBwcm9wZXJ0eSBvciBEYXRhUG9pbnQgd2l0aCBvbmUgcHJvcGVydHksIGl0IHdpbGwgdXNlIHRoZSBwcm9wZXJ0eSBuYW1lXG4gKiBoZXJlIHRvIGJlIGNvbnNpc3RlbnQgd2l0aCB0aGUgZXhpc3RpbmcgZmxleCBjaGFuZ2VzLlxuICpcbiAqIEBwYXJhbSB7RGF0YUZpZWxkQWJzdHJhY3RUeXBlc30gZGF0YUZpZWxkIERpZmZlcmVudCBEYXRhRmllbGQgdHlwZXMgZGVmaW5lZCBpbiB0aGUgYW5ub3RhdGlvbnNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBuYW1lIG9mIGFubm90YXRpb24gY29sdW1uc1xuICogQHByaXZhdGVcbiAqL1xuY29uc3QgX2dldEFubm90YXRpb25Db2x1bW5OYW1lID0gZnVuY3Rpb24oZGF0YUZpZWxkOiBEYXRhRmllbGRBYnN0cmFjdFR5cGVzKSB7XG5cdC8vIFRoaXMgaXMgbmVlZGVkIGFzIHdlIGhhdmUgZmxleGliaWxpdHkgY2hhbmdlcyBhbHJlYWR5IHRoYXQgd2UgaGF2ZSB0byBjaGVjayBhZ2FpbnN0XG5cdGlmIChpc0RhdGFGaWVsZFR5cGVzKGRhdGFGaWVsZCkpIHtcblx0XHRyZXR1cm4gZGF0YUZpZWxkLlZhbHVlPy5wYXRoO1xuXHR9IGVsc2UgaWYgKGRhdGFGaWVsZC4kVHlwZSA9PT0gVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkRm9yQW5ub3RhdGlvbiAmJiAoZGF0YUZpZWxkLlRhcmdldD8uJHRhcmdldCBhcyBEYXRhUG9pbnQpPy5WYWx1ZT8ucGF0aCkge1xuXHRcdC8vIFRoaXMgaXMgZm9yIHJlbW92aW5nIGR1cGxpY2F0ZSBwcm9wZXJ0aWVzLiBGb3IgZXhhbXBsZSwgJ1Byb2dyZXNzJyBQcm9wZXJ0eSBpcyByZW1vdmVkIGlmIGl0IGlzIGFscmVhZHkgZGVmaW5lZCBhcyBhIERhdGFQb2ludFxuXHRcdHJldHVybiAoZGF0YUZpZWxkLlRhcmdldD8uJHRhcmdldCBhcyBEYXRhUG9pbnQpPy5WYWx1ZS5wYXRoO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBLZXlIZWxwZXIuZ2VuZXJhdGVLZXlGcm9tRGF0YUZpZWxkKGRhdGFGaWVsZCk7XG5cdH1cbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiB0aGUgZGF0YSBmaWVsZCBsYWJlbHMgaGF2ZSB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHRhYmxlLlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkR3JvdXBOYW1lIFRoZSBgRGF0YUZpZWxkYCBuYW1lIGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB2aXN1YWxpemF0aW9uUGF0aFxuICogQHBhcmFtIHtDb252ZXJ0ZXJDb250ZXh0fSBjb252ZXJ0ZXJDb250ZXh0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHNob3dEYXRhRmllbGRzTGFiZWxgIHZhbHVlIGZyb20gdGhlIG1hbmlmZXN0XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBfZ2V0U2hvd0RhdGFGaWVsZHNMYWJlbCA9IGZ1bmN0aW9uKGZpZWxkR3JvdXBOYW1lOiBzdHJpbmcsIHZpc3VhbGl6YXRpb25QYXRoOiBzdHJpbmcsIGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQpOiBib29sZWFuIHtcblx0Y29uc3Qgb0NvbHVtbnMgPSBjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0Q29udHJvbENvbmZpZ3VyYXRpb24odmlzdWFsaXphdGlvblBhdGgpPy5jb2x1bW5zO1xuXHRjb25zdCBhQ29sdW1uS2V5cyA9IG9Db2x1bW5zICYmIE9iamVjdC5rZXlzKG9Db2x1bW5zKTtcblx0cmV0dXJuIChcblx0XHRhQ29sdW1uS2V5cyAmJlxuXHRcdCEhYUNvbHVtbktleXMuZmluZChmdW5jdGlvbihrZXk6IHN0cmluZykge1xuXHRcdFx0cmV0dXJuIGtleSA9PT0gZmllbGRHcm91cE5hbWUgJiYgb0NvbHVtbnNba2V5XS5zaG93RGF0YUZpZWxkc0xhYmVsO1xuXHRcdH0pXG5cdCk7XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgdGhlIHJlbGF0aXZlIHBhdGggb2YgdGhlIHByb3BlcnR5IHdpdGggcmVzcGVjdCB0byB0aGUgcm9vdCBlbnRpdHkuXG4gKiBAcGFyYW0gZGF0YUZpZWxkIFRoZSBgRGF0YUZpZWxkYCBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcmVsYXRpdmUgcGF0aFxuICovXG5jb25zdCBfZ2V0UmVsYXRpdmVQYXRoID0gZnVuY3Rpb24oZGF0YUZpZWxkOiBEYXRhRmllbGRBYnN0cmFjdFR5cGVzKTogc3RyaW5nIHtcblx0bGV0IHJlbGF0aXZlUGF0aDogc3RyaW5nID0gXCJcIjtcblxuXHRzd2l0Y2ggKGRhdGFGaWVsZC4kVHlwZSkge1xuXHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkOlxuXHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkV2l0aE5hdmlnYXRpb25QYXRoOlxuXHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkV2l0aFVybDpcblx0XHRcdHJlbGF0aXZlUGF0aCA9IChkYXRhRmllbGQgYXMgRGF0YUZpZWxkKT8uVmFsdWU/LnBhdGg7XG5cdFx0XHRicmVhaztcblxuXHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkRm9yQW5ub3RhdGlvbjpcblx0XHRcdHJlbGF0aXZlUGF0aCA9IChkYXRhRmllbGQgYXMgRGF0YUZpZWxkRm9yQW5ub3RhdGlvbik/LlRhcmdldD8udmFsdWU7XG5cdFx0XHRicmVhaztcblxuXHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkRm9yQWN0aW9uOlxuXHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uOlxuXHRcdFx0cmVsYXRpdmVQYXRoID0gS2V5SGVscGVyLmdlbmVyYXRlS2V5RnJvbURhdGFGaWVsZChkYXRhRmllbGQpO1xuXHRcdFx0YnJlYWs7XG5cdH1cblxuXHRyZXR1cm4gcmVsYXRpdmVQYXRoO1xufTtcblxuY29uc3QgX3NsaWNlQXRTbGFzaCA9IGZ1bmN0aW9uKHBhdGg6IHN0cmluZywgaXNMYXN0U2xhc2g6IGJvb2xlYW4sIGlzTGFzdFBhcnQ6IGJvb2xlYW4pIHtcblx0Y29uc3QgaVNsYXNoSW5kZXggPSBpc0xhc3RTbGFzaCA/IHBhdGgubGFzdEluZGV4T2YoXCIvXCIpIDogcGF0aC5pbmRleE9mKFwiL1wiKTtcblxuXHRpZiAoaVNsYXNoSW5kZXggPT09IC0xKSB7XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblx0cmV0dXJuIGlzTGFzdFBhcnQgPyBwYXRoLnN1YnN0cmluZyhpU2xhc2hJbmRleCArIDEsIHBhdGgubGVuZ3RoKSA6IHBhdGguc3Vic3RyaW5nKDAsIGlTbGFzaEluZGV4KTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgYSBjb2x1bW4gaXMgc29ydGFibGUuXG4gKlxuICogQHBhcmFtIGRhdGFGaWVsZCBUaGUgZGF0YSBmaWVsZCBiZWluZyBwcm9jZXNzZWRcbiAqIEBwYXJhbSBwcm9wZXJ0eVBhdGggVGhlIHByb3BlcnR5IHBhdGhcbiAqIEBwYXJhbSBub25Tb3J0YWJsZUNvbHVtbnMgQ29sbGVjdGlvbiBvZiBub24tc29ydGFibGUgY29sdW1uIG5hbWVzIGFzIHBlciBhbm5vdGF0aW9uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgY29sdW1uIGlzIHNvcnRhYmxlXG4gKi9cbmNvbnN0IF9pc0NvbHVtblNvcnRhYmxlID0gZnVuY3Rpb24oZGF0YUZpZWxkOiBEYXRhRmllbGRBYnN0cmFjdFR5cGVzLCBwcm9wZXJ0eVBhdGg6IHN0cmluZywgbm9uU29ydGFibGVDb2x1bW5zOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuXHRsZXQgaXNTb3J0YWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXHRpZiAobm9uU29ydGFibGVDb2x1bW5zLmluZGV4T2YocHJvcGVydHlQYXRoKSA9PT0gLTEpIHtcblx0XHQvLyBDb2x1bW4gaXMgbm90IG1hcmtlZCBhcyBub24tc29ydGFibGUgdmlhIGFubm90YXRpb25cblx0XHRzd2l0Y2ggKGRhdGFGaWVsZC4kVHlwZSkge1xuXHRcdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGQ6XG5cdFx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZFdpdGhVcmw6XG5cdFx0XHRcdGlzU29ydGFibGUgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb246XG5cdFx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckFjdGlvbjpcblx0XHRcdFx0Ly8gQWN0aW9uIGNvbHVtbnMgYXJlIG5vdCBzb3J0YWJsZVxuXHRcdFx0XHRpc1NvcnRhYmxlID0gZmFsc2U7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gaXNTb3J0YWJsZTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIGZpbHRlcmluZyBvbiB0aGUgdGFibGUgaXMgY2FzZSBzZW5zaXRpdmUuXG4gKlxuICogQHBhcmFtIHtDb252ZXJ0ZXJDb250ZXh0fSBjb252ZXJ0ZXJDb250ZXh0IFRoZSBpbnN0YW5jZSBvZiB0aGUgY29udmVydGVyIGNvbnRleHRcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zICdmYWxzZScgaWYgRmlsdGVyRnVuY3Rpb25zIGFubm90YXRpb24gc3VwcG9ydHMgJ3RvbG93ZXInLCBlbHNlICd0cnVlJ1xuICovXG5leHBvcnQgY29uc3QgaXNGaWx0ZXJpbmdDYXNlU2Vuc2l0aXZlID0gZnVuY3Rpb24oY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCk6IGJvb2xlYW4ge1xuXHRjb25zdCBmaWx0ZXJGdW5jdGlvbnM6IEZpbHRlckZ1bmN0aW9ucyB8IHVuZGVmaW5lZCA9XG5cdFx0Y29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlTZXQoKT8uYW5ub3RhdGlvbnM/LkNhcGFiaWxpdGllcz8uRmlsdGVyRnVuY3Rpb25zIHx8XG5cdFx0Y29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlDb250YWluZXIoKS5hbm5vdGF0aW9ucz8uQ2FwYWJpbGl0aWVzPy5GaWx0ZXJGdW5jdGlvbnM7XG5cdHJldHVybiBBcnJheS5pc0FycmF5KGZpbHRlckZ1bmN0aW9ucykgPyAoZmlsdGVyRnVuY3Rpb25zIGFzIFN0cmluZ1tdKS5pbmRleE9mKFwidG9sb3dlclwiKSA9PT0gLTEgOiB0cnVlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGRlZmF1bHQgZm9ybWF0IG9wdGlvbnMgZm9yIHRleHQgZmllbGRzIGluIGEgdGFibGUuXG4gKlxuICogQHJldHVybnMge0Zvcm1hdE9wdGlvbnNUeXBlfSBDb2xsZWN0aW9uIG9mIGZvcm1hdCBvcHRpb25zIHdpdGggZGVmYXVsdCB2YWx1ZXNcbiAqL1xuZnVuY3Rpb24gZ2V0RGVmYXVsdEZvcm1hdE9wdGlvbnNGb3JUYWJsZSgpOiBGb3JtYXRPcHRpb25zVHlwZSB7XG5cdHJldHVybiB7XG5cdFx0dGV4dExpbmVzRWRpdDogNFxuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgZGVmYXVsdCBmb3JtYXQgb3B0aW9ucyB3aXRoIGRyYWZ0SW5kaWNhdG9yIGZvciBhIGNvbHVtbi5cbiAqIEBwYXJhbSBuYW1lXG4gKiBAcGFyYW0gc2VtYW50aWNLZXlzXG4gKiBAcmV0dXJucyB7Rm9ybWF0T3B0aW9uc1R5cGV9IENvbGxlY3Rpb24gb2YgZm9ybWF0IG9wdGlvbnMgd2l0aCBkZWZhdWx0IHZhbHVlc1xuICovXG5mdW5jdGlvbiBnZXREZWZhdWx0RHJhZnRJbmRpY2F0b3JGb3JDb2x1bW4obmFtZTogc3RyaW5nLCBzZW1hbnRpY0tleXM6IGFueVtdKSB7XG5cdGxldCBiU2VtYW50aWNLZXlGb3VuZCA9IGZhbHNlO1xuXHRjb25zdCBhU2VtYW50aWNLZXlWYWx1ZXM6IHN0cmluZ1tdID0gW107XG5cdGlmICghc2VtYW50aWNLZXlzKSB7XG5cdFx0cmV0dXJuIHt9O1xuXHR9XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgc2VtYW50aWNLZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0YVNlbWFudGljS2V5VmFsdWVzLnB1c2goc2VtYW50aWNLZXlzW2ldLnZhbHVlKTtcblx0XHRpZiAoc2VtYW50aWNLZXlzW2ldLnZhbHVlID09PSBuYW1lKSB7XG5cdFx0XHRiU2VtYW50aWNLZXlGb3VuZCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cdGlmIChiU2VtYW50aWNLZXlGb3VuZCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRoYXNEcmFmdEluZGljYXRvcjogdHJ1ZSxcblx0XHRcdHNlbWFudGlja2V5czogYVNlbWFudGljS2V5VmFsdWVzXG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4ge307XG5cdH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGxpbmUgaXRlbXMgZnJvbSBtZXRhZGF0YSBhbm5vdGF0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge0xpbmVJdGVtfSBsaW5lSXRlbUFubm90YXRpb24gQ29sbGVjdGlvbiBvZiBkYXRhIGZpZWxkcyB3aXRoIHRoZWlyIGFubm90YXRpb25zXG4gKiBAcGFyYW0ge3N0cmluZ30gdmlzdWFsaXphdGlvblBhdGggVGhlIHZpc3VhbGl6YXRpb24gcGF0aFxuICogQHBhcmFtIHtDb252ZXJ0ZXJDb250ZXh0fSBjb252ZXJ0ZXJDb250ZXh0IFRoZSBjb252ZXJ0ZXIgY29udGV4dFxuICogQHJldHVybnMge1RhYmxlQ29sdW1uW119IFRoZSBjb2x1bW5zIGZyb20gdGhlIGFubm90YXRpb25zXG4gKi9cbmNvbnN0IGdldENvbHVtbnNGcm9tQW5ub3RhdGlvbnMgPSBmdW5jdGlvbihcblx0bGluZUl0ZW1Bbm5vdGF0aW9uOiBMaW5lSXRlbSxcblx0dmlzdWFsaXphdGlvblBhdGg6IHN0cmluZyxcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dFxuKTogVGFibGVDb2x1bW5bXSB7XG5cdGNvbnN0IGVudGl0eVR5cGUgPSBjb252ZXJ0ZXJDb250ZXh0LmdldEFubm90YXRpb25FbnRpdHlUeXBlKGxpbmVJdGVtQW5ub3RhdGlvbiksXG5cdFx0YW5ub3RhdGlvbkNvbHVtbnM6IEFubm90YXRpb25UYWJsZUNvbHVtbltdID0gW10sXG5cdFx0Y29sdW1uc1RvQmVDcmVhdGVkOiBSZWNvcmQ8c3RyaW5nLCBQcm9wZXJ0eT4gPSB7fSxcblx0XHRub25Tb3J0YWJsZUNvbHVtbnM6IHN0cmluZ1tdID0gZ2V0Tm9uU29ydGFibGVQcm9wZXJ0aWVzUmVzdHJpY3Rpb25zKGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5U2V0KCkpLFxuXHRcdHRhYmxlTWFuaWZlc3RTZXR0aW5nczogVGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb24gPSBjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0Q29udHJvbENvbmZpZ3VyYXRpb24odmlzdWFsaXphdGlvblBhdGgpLFxuXHRcdHRhYmxlVHlwZTogVGFibGVUeXBlID0gdGFibGVNYW5pZmVzdFNldHRpbmdzPy50YWJsZVNldHRpbmdzPy50eXBlIHx8IFwiUmVzcG9uc2l2ZVRhYmxlXCI7XG5cdGNvbnN0IHNlbWFudGljS2V5cyA9IGNvbnZlcnRlckNvbnRleHQuZ2V0QW5ub3RhdGlvbnNCeVRlcm0oXCJDb21tb25cIiwgXCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuU2VtYW50aWNLZXlcIiwgW1xuXHRcdGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5VHlwZSgpXG5cdF0pWzBdO1xuXHRpZiAobGluZUl0ZW1Bbm5vdGF0aW9uKSB7XG5cdFx0Ly8gR2V0IGNvbHVtbnMgZnJvbSB0aGUgTGluZUl0ZW0gQW5ub3RhdGlvblxuXHRcdGxpbmVJdGVtQW5ub3RhdGlvbi5mb3JFYWNoKGxpbmVJdGVtID0+IHtcblx0XHRcdGlmICghX2lzVmFsaWRDb2x1bW4obGluZUl0ZW0pKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGNvbnN0IHNlbWFudGljT2JqZWN0QW5ub3RhdGlvblBhdGggPVxuXHRcdFx0XHRpc0RhdGFGaWVsZFR5cGVzKGxpbmVJdGVtKSAmJiBsaW5lSXRlbS5WYWx1ZT8uJHRhcmdldD8uZnVsbHlRdWFsaWZpZWROYW1lXG5cdFx0XHRcdFx0PyBnZXRTZW1hbnRpY09iamVjdFBhdGgoY29udmVydGVyQ29udGV4dCwgbGluZUl0ZW0pXG5cdFx0XHRcdFx0OiB1bmRlZmluZWQ7XG5cdFx0XHRjb25zdCByZWxhdGl2ZVBhdGggPSBfZ2V0UmVsYXRpdmVQYXRoKGxpbmVJdGVtKTtcblx0XHRcdC8vIERldGVybWluZSBwcm9wZXJ0aWVzIHdoaWNoIGFyZSBjb25zdW1lZCBieSB0aGlzIExpbmVJdGVtLlxuXHRcdFx0Y29uc3QgcmVsYXRlZFByb3BlcnRpZXNJbmZvOiBDb21wbGV4UHJvcGVydHlJbmZvID0gY29sbGVjdFJlbGF0ZWRQcm9wZXJ0aWVzUmVjdXJzaXZlbHkobGluZUl0ZW0sIGNvbnZlcnRlckNvbnRleHQsIHRhYmxlVHlwZSk7XG5cdFx0XHRjb25zdCByZWxhdGVkUHJvcGVydHlOYW1lczogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhyZWxhdGVkUHJvcGVydGllc0luZm8ucHJvcGVydGllcyk7XG5cdFx0XHRjb25zdCBhZGRpdGlvbmFsUHJvcGVydHlOYW1lczogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhyZWxhdGVkUHJvcGVydGllc0luZm8uYWRkaXRpb25hbFByb3BlcnRpZXMpO1xuXHRcdFx0Y29uc3QgZ3JvdXBQYXRoOiBzdHJpbmcgPSBfc2xpY2VBdFNsYXNoKHJlbGF0aXZlUGF0aCwgdHJ1ZSwgZmFsc2UpO1xuXHRcdFx0Y29uc3QgaXNHcm91cDogYm9vbGVhbiA9IGdyb3VwUGF0aCAhPSByZWxhdGl2ZVBhdGg7XG5cdFx0XHRjb25zdCBzTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZCA9IF9nZXRMYWJlbChsaW5lSXRlbSwgaXNHcm91cCk7XG5cdFx0XHRjb25zdCBuYW1lID0gX2dldEFubm90YXRpb25Db2x1bW5OYW1lKGxpbmVJdGVtKTtcblx0XHRcdGNvbnN0IGlzRmllbGRHcm91cENvbHVtbjogYm9vbGVhbiA9IGdyb3VwUGF0aC5pbmRleE9mKFwiQGNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkZpZWxkR3JvdXBcIikgPiAtMTtcblx0XHRcdGNvbnN0IHNob3dEYXRhRmllbGRzTGFiZWw6IGJvb2xlYW4gPVxuXHRcdFx0XHRpc0ZpZWxkR3JvdXBDb2x1bW4gJiYgKGxpbmVJdGVtIGFzIGFueSk/LlRhcmdldD8uJHRhcmdldD8uRGF0YS5sZW5ndGggPiAxXG5cdFx0XHRcdFx0PyBfZ2V0U2hvd0RhdGFGaWVsZHNMYWJlbChuYW1lLCB2aXN1YWxpemF0aW9uUGF0aCwgY29udmVydGVyQ29udGV4dClcblx0XHRcdFx0XHQ6IGZhbHNlO1xuXHRcdFx0Y29uc3QgZGF0YVR5cGU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IGdldERhdGFGaWVsZERhdGFUeXBlKGxpbmVJdGVtKTtcblx0XHRcdGNvbnN0IHNEYXRlSW5wdXRGb3JtYXQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IGRhdGFUeXBlID09PSBcIkVkbS5EYXRlXCIgPyBcIllZWVktTU0tRERcIiA6IHVuZGVmaW5lZDtcblx0XHRcdGNvbnN0IGZvcm1hdE9wdGlvbnMgPSB7XG5cdFx0XHRcdC4uLmdldERlZmF1bHRGb3JtYXRPcHRpb25zRm9yVGFibGUoKSxcblx0XHRcdFx0Li4uZ2V0RGVmYXVsdERyYWZ0SW5kaWNhdG9yRm9yQ29sdW1uKG5hbWUsIHNlbWFudGljS2V5cylcblx0XHRcdH07XG5cdFx0XHRsZXQgZmllbGRHcm91cEhpZGRlbkV4cHJlc3Npb25zOiBCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+O1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRsaW5lSXRlbS4kVHlwZSA9PT0gVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkRm9yQW5ub3RhdGlvbiAmJlxuXHRcdFx0XHRsaW5lSXRlbS5UYXJnZXQ/LiR0YXJnZXQ/LiRUeXBlID09PSBVSUFubm90YXRpb25UeXBlcy5GaWVsZEdyb3VwVHlwZVxuXHRcdFx0KSB7XG5cdFx0XHRcdGZpZWxkR3JvdXBIaWRkZW5FeHByZXNzaW9ucyA9IF9nZXRGaWVsZEdyb3VwSGlkZGVuRXhwcmVzc2lvbnMobGluZUl0ZW0sIGZvcm1hdE9wdGlvbnMpO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZXhwb3J0U2V0dGluZ3MgPSB7XG5cdFx0XHRcdHRlbXBsYXRlOiByZWxhdGVkUHJvcGVydGllc0luZm8uZXhwb3J0U2V0dGluZ3NUZW1wbGF0ZSxcblx0XHRcdFx0d3JhcDogcmVsYXRlZFByb3BlcnRpZXNJbmZvLmV4cG9ydFNldHRpbmdzV3JhcHBpbmcsXG5cdFx0XHRcdHR5cGU6IGRhdGFUeXBlID8gX2dldEV4cG9ydERhdGFUeXBlKGRhdGFUeXBlLCByZWxhdGVkUHJvcGVydHlOYW1lcy5sZW5ndGggPiAxKSA6IHVuZGVmaW5lZCxcblx0XHRcdFx0aW5wdXRGb3JtYXQ6IHNEYXRlSW5wdXRGb3JtYXQsXG5cdFx0XHRcdGRlbGltaXRlcjogZGF0YVR5cGUgPT09IFwiRWRtLkludDY0XCIgPyB0cnVlIDogZmFsc2UsXG5cdFx0XHRcdHRydWVWYWx1ZTogZGF0YVR5cGUgPT09IFwiRWRtLkJvb2xlYW5cIiA/IFwiWWVzXCIgOiB1bmRlZmluZWQsXG5cdFx0XHRcdGZhbHNlVmFsdWU6IGRhdGFUeXBlID09PSBcIkVkbS5Cb29sZWFuXCIgPyBcIk5vXCIgOiB1bmRlZmluZWRcblx0XHRcdH07XG5cdFx0XHRjb25zdCBwcm9wZXJ0eVR5cGVDb25maWcgPSBkYXRhVHlwZSAmJiBnZXRUeXBlQ29uZmlnKGxpbmVJdGVtLCBkYXRhVHlwZSk7XG5cdFx0XHRjb25zdCBvVHlwZUNvbmZpZyA9IHByb3BlcnR5VHlwZUNvbmZpZ1xuXHRcdFx0XHQ/IHtcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogZGF0YVR5cGUsXG5cdFx0XHRcdFx0XHRvRm9ybWF0T3B0aW9uczoge1xuXHRcdFx0XHRcdFx0XHQuLi5mb3JtYXRPcHRpb25zLFxuXHRcdFx0XHRcdFx0XHQuLi5wcm9wZXJ0eVR5cGVDb25maWcuZm9ybWF0T3B0aW9uc1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdG9Db25zdHJhaW50czogcHJvcGVydHlUeXBlQ29uZmlnLmNvbnN0cmFpbnRzXG5cdFx0XHRcdCAgfVxuXHRcdFx0XHQ6IHVuZGVmaW5lZDtcblx0XHRcdGxldCB2aXN1YWxTZXR0aW5nczogVmlzdWFsU2V0dGluZ3MgPSB7fTtcblx0XHRcdGlmIChyZWxhdGVkUHJvcGVydGllc0luZm8udmlzdWFsU2V0dGluZ3NUb0JlRXhjbHVkZWQpIHtcblx0XHRcdFx0Ly8gSW4gY2FzZSBvZiB0ZXh0IGFycmFuZ2VtZW50IGFubm90YXRpb24gd2l0aCBkaXNwbGF5IG1vZGUgYXMgdGV4dCBvbmx5LCBleGNsdWRlIHRleHQgcHJvcGVydHkgZnJvbSB0aGUgd2lkdGggY2FsY3VsYXRpb25cblx0XHRcdFx0dmlzdWFsU2V0dGluZ3MgPSB7XG5cdFx0XHRcdFx0d2lkdGhDYWxjdWxhdGlvbjoge1xuXHRcdFx0XHRcdFx0ZXhjbHVkZVByb3BlcnRpZXM6IFwiUHJvcGVydHk6OlwiICsgcmVsYXRlZFByb3BlcnRpZXNJbmZvLnZpc3VhbFNldHRpbmdzVG9CZUV4Y2x1ZGVkXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fSBlbHNlIGlmICghZGF0YVR5cGUgfHwgIW9UeXBlQ29uZmlnKSB7XG5cdFx0XHRcdC8vIGZvciBjaGFydHNcblx0XHRcdFx0dmlzdWFsU2V0dGluZ3Mud2lkdGhDYWxjdWxhdGlvbiA9IG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdGFubm90YXRpb25Db2x1bW5zLnB1c2goe1xuXHRcdFx0XHRrZXk6IEtleUhlbHBlci5nZW5lcmF0ZUtleUZyb21EYXRhRmllbGQobGluZUl0ZW0pLFxuXHRcdFx0XHR0eXBlOiBDb2x1bW5UeXBlLkFubm90YXRpb24sXG5cdFx0XHRcdGxhYmVsOiBzTGFiZWwsXG5cdFx0XHRcdGdyb3VwTGFiZWw6IGlzR3JvdXAgPyBfZ2V0TGFiZWwobGluZUl0ZW0pIDogbnVsbCxcblx0XHRcdFx0Z3JvdXA6IGlzR3JvdXAgPyBncm91cFBhdGggOiBudWxsLFxuXHRcdFx0XHRGaWVsZEdyb3VwSGlkZGVuRXhwcmVzc2lvbnM6IGZpZWxkR3JvdXBIaWRkZW5FeHByZXNzaW9ucyxcblx0XHRcdFx0YW5ub3RhdGlvblBhdGg6IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5U2V0QmFzZWRBbm5vdGF0aW9uUGF0aChsaW5lSXRlbS5mdWxseVF1YWxpZmllZE5hbWUpLFxuXHRcdFx0XHRzZW1hbnRpY09iamVjdFBhdGg6IHNlbWFudGljT2JqZWN0QW5ub3RhdGlvblBhdGgsXG5cdFx0XHRcdGF2YWlsYWJpbGl0eTogaXNEYXRhRmllbGRBbHdheXNIaWRkZW4obGluZUl0ZW0pID8gQXZhaWxhYmlsaXR5VHlwZS5IaWRkZW4gOiBBdmFpbGFiaWxpdHlUeXBlLkRlZmF1bHQsXG5cdFx0XHRcdG5hbWU6IG5hbWUsXG5cdFx0XHRcdHNob3dEYXRhRmllbGRzTGFiZWw6IHNob3dEYXRhRmllbGRzTGFiZWwsXG5cdFx0XHRcdHJlbGF0aXZlUGF0aDogcmVsYXRpdmVQYXRoLFxuXHRcdFx0XHRzb3J0YWJsZTogX2lzQ29sdW1uU29ydGFibGUobGluZUl0ZW0sIHJlbGF0aXZlUGF0aCwgbm9uU29ydGFibGVDb2x1bW5zKSxcblx0XHRcdFx0cHJvcGVydHlJbmZvczogcmVsYXRlZFByb3BlcnR5TmFtZXMubGVuZ3RoID4gMCA/IHJlbGF0ZWRQcm9wZXJ0eU5hbWVzIDogdW5kZWZpbmVkLFxuXHRcdFx0XHRhZGRpdGlvbmFsUHJvcGVydHlJbmZvczogYWRkaXRpb25hbFByb3BlcnR5TmFtZXMubGVuZ3RoID4gMCA/IGFkZGl0aW9uYWxQcm9wZXJ0eU5hbWVzIDogdW5kZWZpbmVkLFxuXHRcdFx0XHRleHBvcnRTZXR0aW5nczogZXhwb3J0U2V0dGluZ3MsXG5cdFx0XHRcdHdpZHRoOiBsaW5lSXRlbS5hbm5vdGF0aW9ucz8uSFRNTDU/LkNzc0RlZmF1bHRzPy53aWR0aCB8fCB1bmRlZmluZWQsXG5cdFx0XHRcdGlzTmF2aWdhYmxlOiB0cnVlLFxuXHRcdFx0XHRmb3JtYXRPcHRpb25zOiBmb3JtYXRPcHRpb25zLFxuXHRcdFx0XHRleHBvcnRDb250YWN0UHJvcGVydHk6IHJlbGF0ZWRQcm9wZXJ0aWVzSW5mby5leHBvcnRTZXR0aW5nc0NvbnRhY3RQcm9wZXJ0eSxcblx0XHRcdFx0Y2FzZVNlbnNpdGl2ZTogaXNGaWx0ZXJpbmdDYXNlU2Vuc2l0aXZlKGNvbnZlcnRlckNvbnRleHQpLFxuXHRcdFx0XHR0eXBlQ29uZmlnOiBvVHlwZUNvbmZpZyxcblx0XHRcdFx0dmlzdWFsU2V0dGluZ3M6IHZpc3VhbFNldHRpbmdzXG5cdFx0XHR9IGFzIEFubm90YXRpb25UYWJsZUNvbHVtbik7XG5cblx0XHRcdC8vIENvbGxlY3QgaW5mb3JtYXRpb24gb2YgcmVsYXRlZCBjb2x1bW5zIHRvIGJlIGNyZWF0ZWQuXG5cdFx0XHRyZWxhdGVkUHJvcGVydHlOYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0XHRjb2x1bW5zVG9CZUNyZWF0ZWRbbmFtZV0gPSByZWxhdGVkUHJvcGVydGllc0luZm8ucHJvcGVydGllc1tuYW1lXTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBDcmVhdGUgY29sdW1ucyBmb3IgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIGlkZW50aWZpZWQgZm9yIEFMUCB1c2UgY2FzZS5cblx0XHRcdGFkZGl0aW9uYWxQcm9wZXJ0eU5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRcdC8vIEludGVudGlvbmFsIG92ZXJ3cml0ZSBhcyB3ZSByZXF1aXJlIG9ubHkgb25lIG5ldyBQcm9wZXJ0eUluZm8gZm9yIGEgcmVsYXRlZCBQcm9wZXJ0eS5cblx0XHRcdFx0Y29sdW1uc1RvQmVDcmVhdGVkW25hbWVdID0gcmVsYXRlZFByb3BlcnRpZXNJbmZvLmFkZGl0aW9uYWxQcm9wZXJ0aWVzW25hbWVdO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBHZXQgY29sdW1ucyBmcm9tIHRoZSBQcm9wZXJ0aWVzIG9mIEVudGl0eVR5cGVcblx0bGV0IHRhYmxlQ29sdW1ucyA9IGdldENvbHVtbnNGcm9tRW50aXR5VHlwZShcblx0XHRjb2x1bW5zVG9CZUNyZWF0ZWQsXG5cdFx0ZW50aXR5VHlwZSxcblx0XHRhbm5vdGF0aW9uQ29sdW1ucyxcblx0XHRub25Tb3J0YWJsZUNvbHVtbnMsXG5cdFx0Y29udmVydGVyQ29udGV4dCxcblx0XHR0YWJsZVR5cGVcblx0KTtcblx0dGFibGVDb2x1bW5zID0gdGFibGVDb2x1bW5zLmNvbmNhdChhbm5vdGF0aW9uQ29sdW1ucyk7XG5cblx0Ly8gQ3JlYXRlIGEgcHJvcGVydHlJbmZvIGZvciBlYWNoIHJlbGF0ZWQgcHJvcGVydHkuXG5cdGNvbnN0IHJlbGF0ZWRDb2x1bW5zID0gX2NyZWF0ZVJlbGF0ZWRDb2x1bW5zKGNvbHVtbnNUb0JlQ3JlYXRlZCwgdGFibGVDb2x1bW5zLCBub25Tb3J0YWJsZUNvbHVtbnMsIGNvbnZlcnRlckNvbnRleHQsIGVudGl0eVR5cGUpO1xuXHR0YWJsZUNvbHVtbnMgPSB0YWJsZUNvbHVtbnMuY29uY2F0KHJlbGF0ZWRDb2x1bW5zKTtcblxuXHRyZXR1cm4gdGFibGVDb2x1bW5zO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBwcm9wZXJ0eSBuYW1lcyBmcm9tIHRoZSBtYW5pZmVzdCBhbmQgY2hlY2tzIGFnYWluc3QgZXhpc3RpbmcgcHJvcGVydGllcyBhbHJlYWR5IGFkZGVkIGJ5IGFubm90YXRpb25zLlxuICogSWYgYSBub3QgeWV0IHN0b3JlZCBwcm9wZXJ0eSBpcyBmb3VuZCBpdCBhZGRzIGl0IGZvciBzb3J0aW5nIGFuZCBmaWx0ZXJpbmcgb25seSB0byB0aGUgYW5ub3RhdGlvbkNvbHVtbnMuXG4gKiBAcGFyYW0ge3N0cmluZ1tdIHwgdW5kZWZpbmVkfSBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge0Fubm90YXRpb25UYWJsZUNvbHVtbltdfSBhbm5vdGF0aW9uQ29sdW1uc1xuICogQHBhcmFtIHtDb252ZXJ0ZXJDb250ZXh0fSBjb252ZXJ0ZXJDb250ZXh0XG4gKiBAcGFyYW0gZW50aXR5VHlwZVxuICogQHJldHVybnMge3N0cmluZ1tdfSBUaGUgY29sdW1ucyBmcm9tIHRoZSBhbm5vdGF0aW9uc1xuICovXG5jb25zdCBfZ2V0UHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uKFxuXHRwcm9wZXJ0aWVzOiBzdHJpbmdbXSB8IHVuZGVmaW5lZCxcblx0YW5ub3RhdGlvbkNvbHVtbnM6IEFubm90YXRpb25UYWJsZUNvbHVtbltdLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHRlbnRpdHlUeXBlOiBFbnRpdHlUeXBlXG4pOiBzdHJpbmdbXSB8IHVuZGVmaW5lZCB7XG5cdGxldCBtYXRjaGVkUHJvcGVydGllczogc3RyaW5nW10gfCB1bmRlZmluZWQ7XG5cdGlmIChwcm9wZXJ0aWVzKSB7XG5cdFx0bWF0Y2hlZFByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzLm1hcChmdW5jdGlvbihwcm9wZXJ0eVBhdGgpIHtcblx0XHRcdGNvbnN0IGFubm90YXRpb25Db2x1bW4gPSBhbm5vdGF0aW9uQ29sdW1ucy5maW5kKGZ1bmN0aW9uKGFubm90YXRpb25Db2x1bW4pIHtcblx0XHRcdFx0cmV0dXJuIGFubm90YXRpb25Db2x1bW4ucmVsYXRpdmVQYXRoID09PSBwcm9wZXJ0eVBhdGggJiYgYW5ub3RhdGlvbkNvbHVtbi5wcm9wZXJ0eUluZm9zID09PSB1bmRlZmluZWQ7XG5cdFx0XHR9KTtcblx0XHRcdGlmIChhbm5vdGF0aW9uQ29sdW1uKSB7XG5cdFx0XHRcdHJldHVybiBhbm5vdGF0aW9uQ29sdW1uLm5hbWU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCByZWxhdGVkQ29sdW1ucyA9IF9jcmVhdGVSZWxhdGVkQ29sdW1ucyhcblx0XHRcdFx0XHR7IFtwcm9wZXJ0eVBhdGhdOiBlbnRpdHlUeXBlLnJlc29sdmVQYXRoKHByb3BlcnR5UGF0aCkgfSxcblx0XHRcdFx0XHRhbm5vdGF0aW9uQ29sdW1ucyxcblx0XHRcdFx0XHRbXSxcblx0XHRcdFx0XHRjb252ZXJ0ZXJDb250ZXh0LFxuXHRcdFx0XHRcdGVudGl0eVR5cGVcblx0XHRcdFx0KTtcblx0XHRcdFx0YW5ub3RhdGlvbkNvbHVtbnMucHVzaChyZWxhdGVkQ29sdW1uc1swXSk7XG5cdFx0XHRcdHJldHVybiByZWxhdGVkQ29sdW1uc1swXS5uYW1lO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIG1hdGNoZWRQcm9wZXJ0aWVzO1xufTtcblxuY29uc3QgX2FwcGVuZEN1c3RvbVRlbXBsYXRlID0gZnVuY3Rpb24ocHJvcGVydGllczogc3RyaW5nW10pOiBzdHJpbmcge1xuXHRyZXR1cm4gcHJvcGVydGllc1xuXHRcdC5tYXAocHJvcGVydHkgPT4ge1xuXHRcdFx0cmV0dXJuIGB7JHtwcm9wZXJ0aWVzLmluZGV4T2YocHJvcGVydHkpfX1gO1xuXHRcdH0pXG5cdFx0LmpvaW4oYCR7XCJcXG5cIn1gKTtcbn07XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSB0YWJsZSBjb2x1bW4gcHJvcGVydHkgdmFsdWUgYmFzZWQgb24gY2VydGFpbiBjb25kaXRpb25zLlxuICpcbiAqIE1hbmlmZXN0IGRlZmluZWQgcHJvcGVydHkgdmFsdWUgZm9yIGN1c3RvbSAvIGFubm90YXRpb24gY29sdW1uc1xuICogRGVmYXVsdCBwcm9wZXJ0eSB2YWx1ZSBmb3IgY3VzdG9tIGNvbHVtbiBpZiBub3Qgb3ZlcndyaXR0ZW4gaW4gbWFuaWZlc3QuXG4gKlxuICogQHBhcmFtIHthbnl9IHByb3BlcnR5IFRoZSBjb2x1bW4gcHJvcGVydHkgZGVmaW5lZCBpbiB0aGUgbWFuaWZlc3RcbiAqIEBwYXJhbSB7YW55fSBkZWZhdWx0VmFsdWUgVGhlIGRlZmF1bHQgdmFsdWUgb2YgdGhlIHByb3BlcnR5XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzQW5ub3RhdGlvbkNvbHVtbiBXaGV0aGVyIHRoZSBjb2x1bW4sIGRlZmluZWQgaW4gbWFuaWZlc3QsIGNvcnJlc3BvbmRzIHRvIGFuIGV4aXN0aW5nIGFubm90YXRpb24gY29sdW1uLlxuICogQHJldHVybnMge2FueX0gRGV0ZXJtaW5lZCBwcm9wZXJ0eSB2YWx1ZSBmb3IgdGhlIGNvbHVtblxuICovXG5jb25zdCBfZ2V0TWFuaWZlc3RPckRlZmF1bHRWYWx1ZSA9IGZ1bmN0aW9uKHByb3BlcnR5OiBhbnksIGRlZmF1bHRWYWx1ZTogYW55LCBpc0Fubm90YXRpb25Db2x1bW46IGJvb2xlYW4pOiBhbnkge1xuXHRpZiAocHJvcGVydHkgPT09IHVuZGVmaW5lZCkge1xuXHRcdC8vIElmIGFubm90YXRpb24gY29sdW1uIGhhcyBubyBwcm9wZXJ0eSBkZWZpbmVkIGluIG1hbmlmZXN0LFxuXHRcdC8vIGRvIG5vdCBvdmVyd3JpdGUgaXQgd2l0aCBtYW5pZmVzdCBjb2x1bW4ncyBkZWZhdWx0IHZhbHVlLlxuXHRcdHJldHVybiBpc0Fubm90YXRpb25Db2x1bW4gPyB1bmRlZmluZWQgOiBkZWZhdWx0VmFsdWU7XG5cdH1cblx0Ly8gUmV0dXJuIHdoYXQgaXMgZGVmaW5lZCBpbiBtYW5pZmVzdC5cblx0cmV0dXJuIHByb3BlcnR5O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRhYmxlIGNvbHVtbiBkZWZpbml0aW9ucyBmcm9tIG1hbmlmZXN0LlxuICogQHBhcmFtIGNvbHVtbnNcbiAqIEBwYXJhbSBhbm5vdGF0aW9uQ29sdW1uc1xuICogQHBhcmFtIGNvbnZlcnRlckNvbnRleHRcbiAqIEBwYXJhbSBlbnRpdHlUeXBlXG4gKiBAcGFyYW0gbmF2aWdhdGlvblNldHRpbmdzXG4gKiBAcmV0dXJucyB7UmVjb3JkPHN0cmluZywgQ3VzdG9tQ29sdW1uPn0gVGhlIGNvbHVtbnMgZnJvbSB0aGUgbWFuaWZlc3RcbiAqL1xuY29uc3QgZ2V0Q29sdW1uc0Zyb21NYW5pZmVzdCA9IGZ1bmN0aW9uKFxuXHRjb2x1bW5zOiBSZWNvcmQ8c3RyaW5nLCBNYW5pZmVzdFRhYmxlQ29sdW1uPixcblx0YW5ub3RhdGlvbkNvbHVtbnM6IEFubm90YXRpb25UYWJsZUNvbHVtbltdLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHRlbnRpdHlUeXBlOiBFbnRpdHlUeXBlLFxuXHRuYXZpZ2F0aW9uU2V0dGluZ3M/OiBOYXZpZ2F0aW9uU2V0dGluZ3NDb25maWd1cmF0aW9uXG4pOiBSZWNvcmQ8c3RyaW5nLCBDdXN0b21Db2x1bW4+IHtcblx0Y29uc3QgaW50ZXJuYWxDb2x1bW5zOiBSZWNvcmQ8c3RyaW5nLCBDdXN0b21Db2x1bW4+ID0ge307XG5cblx0Zm9yIChjb25zdCBrZXkgaW4gY29sdW1ucykge1xuXHRcdGNvbnN0IG1hbmlmZXN0Q29sdW1uID0gY29sdW1uc1trZXldO1xuXHRcdC8vIFRvIGlkZW50aWZ5IHRoZSBhbm5vdGF0aW9uIGNvbHVtbiBwcm9wZXJ0eSBvdmVyd3JpdGUgdmlhIG1hbmlmZXN0IHVzZS1jYXNlLlxuXHRcdGNvbnN0IGlzQW5ub3RhdGlvbkNvbHVtbiA9IGFubm90YXRpb25Db2x1bW5zLnNvbWUoY29sdW1uID0+IGNvbHVtbi5rZXkgPT09IGtleSk7XG5cdFx0S2V5SGVscGVyLnZhbGlkYXRlS2V5KGtleSk7XG5cdFx0Y29uc3QgcHJvcGVydHlJbmZvczogc3RyaW5nW10gfCB1bmRlZmluZWQgPSBfZ2V0UHJvcGVydHlOYW1lcyhcblx0XHRcdG1hbmlmZXN0Q29sdW1uLnByb3BlcnRpZXMsXG5cdFx0XHRhbm5vdGF0aW9uQ29sdW1ucyxcblx0XHRcdGNvbnZlcnRlckNvbnRleHQsXG5cdFx0XHRlbnRpdHlUeXBlXG5cdFx0KTtcblxuXHRcdGludGVybmFsQ29sdW1uc1trZXldID0ge1xuXHRcdFx0a2V5OiBrZXksXG5cdFx0XHRpZDogXCJDdXN0b21Db2x1bW46OlwiICsga2V5LFxuXHRcdFx0bmFtZTogXCJDdXN0b21Db2x1bW46OlwiICsga2V5LFxuXHRcdFx0aGVhZGVyOiBtYW5pZmVzdENvbHVtbi5oZWFkZXIsXG5cdFx0XHR3aWR0aDogbWFuaWZlc3RDb2x1bW4ud2lkdGggfHwgdW5kZWZpbmVkLFxuXHRcdFx0aG9yaXpvbnRhbEFsaWduOiBfZ2V0TWFuaWZlc3RPckRlZmF1bHRWYWx1ZShtYW5pZmVzdENvbHVtbj8uaG9yaXpvbnRhbEFsaWduLCBIb3Jpem9udGFsQWxpZ24uQmVnaW4sIGlzQW5ub3RhdGlvbkNvbHVtbiksXG5cdFx0XHR0eXBlOiBtYW5pZmVzdENvbHVtbi50eXBlID09PSBcIlNsb3RcIiA/IENvbHVtblR5cGUuU2xvdCA6IENvbHVtblR5cGUuRGVmYXVsdCxcblx0XHRcdGF2YWlsYWJpbGl0eTogX2dldE1hbmlmZXN0T3JEZWZhdWx0VmFsdWUobWFuaWZlc3RDb2x1bW4/LmF2YWlsYWJpbGl0eSwgQXZhaWxhYmlsaXR5VHlwZS5EZWZhdWx0LCBpc0Fubm90YXRpb25Db2x1bW4pLFxuXHRcdFx0dGVtcGxhdGU6IG1hbmlmZXN0Q29sdW1uLnRlbXBsYXRlIHx8IFwidW5kZWZpbmVkXCIsXG5cdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRhbmNob3I6IG1hbmlmZXN0Q29sdW1uLnBvc2l0aW9uPy5hbmNob3IsXG5cdFx0XHRcdHBsYWNlbWVudDogbWFuaWZlc3RDb2x1bW4ucG9zaXRpb24gPT09IHVuZGVmaW5lZCA/IFBsYWNlbWVudC5BZnRlciA6IG1hbmlmZXN0Q29sdW1uLnBvc2l0aW9uLnBsYWNlbWVudFxuXHRcdFx0fSxcblx0XHRcdGlzTmF2aWdhYmxlOiBpc0Fubm90YXRpb25Db2x1bW4gPyB1bmRlZmluZWQgOiBpc0FjdGlvbk5hdmlnYWJsZShtYW5pZmVzdENvbHVtbiwgbmF2aWdhdGlvblNldHRpbmdzLCB0cnVlKSxcblx0XHRcdHNldHRpbmdzOiBtYW5pZmVzdENvbHVtbi5zZXR0aW5ncyxcblx0XHRcdHNvcnRhYmxlOiBmYWxzZSxcblx0XHRcdHByb3BlcnR5SW5mb3M6IHByb3BlcnR5SW5mb3MsXG5cdFx0XHRmb3JtYXRPcHRpb25zOiB7XG5cdFx0XHRcdC4uLmdldERlZmF1bHRGb3JtYXRPcHRpb25zRm9yVGFibGUoKSxcblx0XHRcdFx0Li4ubWFuaWZlc3RDb2x1bW4uZm9ybWF0T3B0aW9uc1xuXHRcdFx0fSxcblx0XHRcdGV4cG9ydFNldHRpbmdzOiB7XG5cdFx0XHRcdHRlbXBsYXRlOiBwcm9wZXJ0eUluZm9zID8gX2FwcGVuZEN1c3RvbVRlbXBsYXRlKHByb3BlcnR5SW5mb3MpIDogdW5kZWZpbmVkLFxuXHRcdFx0XHRmaWVsZExhYmVsOiBwcm9wZXJ0eUluZm9zID8gbWFuaWZlc3RDb2x1bW4uaGVhZGVyIDogdW5kZWZpbmVkLFxuXHRcdFx0XHR3cmFwOiBwcm9wZXJ0eUluZm9zICYmIHByb3BlcnR5SW5mb3MubGVuZ3RoID4gMSA/IHRydWUgOiBmYWxzZVxuXHRcdFx0fSxcblx0XHRcdGNhc2VTZW5zaXRpdmU6IGlzRmlsdGVyaW5nQ2FzZVNlbnNpdGl2ZShjb252ZXJ0ZXJDb250ZXh0KVxuXHRcdH07XG5cdH1cblx0cmV0dXJuIGludGVybmFsQ29sdW1ucztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQMTNuTW9kZShcblx0dmlzdWFsaXphdGlvblBhdGg6IHN0cmluZyxcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCxcblx0dGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb246IFRhYmxlQ29udHJvbENvbmZpZ3VyYXRpb25cbik6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG5cdGNvbnN0IG1hbmlmZXN0V3JhcHBlcjogTWFuaWZlc3RXcmFwcGVyID0gY29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdFdyYXBwZXIoKTtcblx0Y29uc3QgdGFibGVNYW5pZmVzdFNldHRpbmdzOiBUYWJsZU1hbmlmZXN0Q29uZmlndXJhdGlvbiA9IGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RDb250cm9sQ29uZmlndXJhdGlvbih2aXN1YWxpemF0aW9uUGF0aCk7XG5cdGNvbnN0IHZhcmlhbnRNYW5hZ2VtZW50OiBWYXJpYW50TWFuYWdlbWVudFR5cGUgPSBtYW5pZmVzdFdyYXBwZXIuZ2V0VmFyaWFudE1hbmFnZW1lbnQoKTtcblx0Y29uc3QgYVBlcnNvbmFsaXphdGlvbjogc3RyaW5nW10gPSBbXTtcblx0Y29uc3QgYkFuYWx5dGljYWxUYWJsZSA9IHRhYmxlTWFuaWZlc3RDb25maWd1cmF0aW9uLnR5cGUgPT09IFwiQW5hbHl0aWNhbFRhYmxlXCI7XG5cdGlmICh0YWJsZU1hbmlmZXN0U2V0dGluZ3M/LnRhYmxlU2V0dGluZ3M/LnBlcnNvbmFsaXphdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0Ly8gUGVyc29uYWxpemF0aW9uIGNvbmZpZ3VyZWQgaW4gbWFuaWZlc3QuXG5cdFx0Y29uc3QgcGVyc29uYWxpemF0aW9uOiBhbnkgPSB0YWJsZU1hbmlmZXN0U2V0dGluZ3MudGFibGVTZXR0aW5ncy5wZXJzb25hbGl6YXRpb247XG5cdFx0aWYgKHBlcnNvbmFsaXphdGlvbiA9PT0gdHJ1ZSkge1xuXHRcdFx0Ly8gVGFibGUgcGVyc29uYWxpemF0aW9uIGZ1bGx5IGVuYWJsZWQuXG5cdFx0XHRyZXR1cm4gYkFuYWx5dGljYWxUYWJsZSA/IFwiU29ydCxDb2x1bW4sRmlsdGVyLEdyb3VwLEFnZ3JlZ2F0ZVwiIDogXCJTb3J0LENvbHVtbixGaWx0ZXJcIjtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBwZXJzb25hbGl6YXRpb24gPT09IFwib2JqZWN0XCIpIHtcblx0XHRcdC8vIFNwZWNpZmljIHBlcnNvbmFsaXphdGlvbiBvcHRpb25zIGVuYWJsZWQgaW4gbWFuaWZlc3QuIFVzZSB0aGVtIGFzIGlzLlxuXHRcdFx0aWYgKHBlcnNvbmFsaXphdGlvbi5zb3J0KSB7XG5cdFx0XHRcdGFQZXJzb25hbGl6YXRpb24ucHVzaChcIlNvcnRcIik7XG5cdFx0XHR9XG5cdFx0XHRpZiAocGVyc29uYWxpemF0aW9uLmNvbHVtbikge1xuXHRcdFx0XHRhUGVyc29uYWxpemF0aW9uLnB1c2goXCJDb2x1bW5cIik7XG5cdFx0XHR9XG5cdFx0XHRpZiAocGVyc29uYWxpemF0aW9uLmZpbHRlcikge1xuXHRcdFx0XHRhUGVyc29uYWxpemF0aW9uLnB1c2goXCJGaWx0ZXJcIik7XG5cdFx0XHR9XG5cdFx0XHRpZiAocGVyc29uYWxpemF0aW9uLmdyb3VwICYmIGJBbmFseXRpY2FsVGFibGUpIHtcblx0XHRcdFx0YVBlcnNvbmFsaXphdGlvbi5wdXNoKFwiR3JvdXBcIik7XG5cdFx0XHR9XG5cdFx0XHRpZiAocGVyc29uYWxpemF0aW9uLmFnZ3JlZ2F0ZSAmJiBiQW5hbHl0aWNhbFRhYmxlKSB7XG5cdFx0XHRcdGFQZXJzb25hbGl6YXRpb24ucHVzaChcIkFnZ3JlZ2F0ZVwiKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBhUGVyc29uYWxpemF0aW9uLmxlbmd0aCA+IDAgPyBhUGVyc29uYWxpemF0aW9uLmpvaW4oXCIsXCIpIDogdW5kZWZpbmVkO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHQvLyBObyBwZXJzb25hbGl6YXRpb24gY29uZmlndXJlZCBpbiBtYW5pZmVzdC5cblx0XHRhUGVyc29uYWxpemF0aW9uLnB1c2goXCJTb3J0XCIpO1xuXHRcdGFQZXJzb25hbGl6YXRpb24ucHVzaChcIkNvbHVtblwiKTtcblx0XHRpZiAodmFyaWFudE1hbmFnZW1lbnQgPT09IFZhcmlhbnRNYW5hZ2VtZW50VHlwZS5Db250cm9sKSB7XG5cdFx0XHQvLyBGZWF0dXJlIHBhcml0eSB3aXRoIFYyLlxuXHRcdFx0Ly8gRW5hYmxlIHRhYmxlIGZpbHRlcmluZyBieSBkZWZhdWx0IG9ubHkgaW4gY2FzZSBvZiBDb250cm9sIGxldmVsIHZhcmlhbnQgbWFuYWdlbWVudC5cblx0XHRcdGFQZXJzb25hbGl6YXRpb24ucHVzaChcIkZpbHRlclwiKTtcblx0XHR9XG5cdFx0aWYgKGJBbmFseXRpY2FsVGFibGUpIHtcblx0XHRcdGFQZXJzb25hbGl6YXRpb24ucHVzaChcIkdyb3VwXCIpO1xuXHRcdFx0YVBlcnNvbmFsaXphdGlvbi5wdXNoKFwiQWdncmVnYXRlXCIpO1xuXHRcdH1cblx0XHRyZXR1cm4gYVBlcnNvbmFsaXphdGlvbi5qb2luKFwiLFwiKTtcblx0fVxuXHRyZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIEZ1bmN0aW9uIHRvIGRldGVybWluZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgRGVsZXRlIGJ1dHRvbi5cbiAqXG4gKiBAcGFyYW0gY29udmVydGVyQ29udGV4dCBUaGUgaW5zdGFuY2Ugb2YgdGhlIGNvbnZlcnRlciBjb250ZXh0XG4gKiBAcGFyYW0gbmF2aWdhdGlvblBhdGggUGF0aCB0byB0aGUgbmF2aWdhdGlvbiBlbnRpdHlcbiAqIEBwYXJhbSBpc1RhcmdldERlbGV0YWJsZSBGbGFnIHdoaWNoIGRldGVybWluZXMgd2hldGhlciBhIHRhcmdldCBpcyBkZWxldGFibGVcbiAqIEBwYXJhbSB2aWV3Q29uZmlndXJhdGlvbiBUaGUgaW5zdGFuY2Ugb2YgdGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSB2aWV3IHBhdGhcbiAqIEByZXR1cm5zIHtFeHByZXNzaW9uPGJvb2xlYW4+fSBUaGUgZXhwcmVzc2lvbiBmb3IgdGhlIERlbGV0ZSBidXR0b25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERlbGV0ZVZpc2libGUoXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdG5hdmlnYXRpb25QYXRoOiBzdHJpbmcsXG5cdGlzVGFyZ2V0RGVsZXRhYmxlOiBib29sZWFuLFxuXHR2aWV3Q29uZmlndXJhdGlvbj86IFZpZXdQYXRoQ29uZmlndXJhdGlvblxuKTogRXhwcmVzc2lvbjxib29sZWFuPiB7XG5cdGNvbnN0IGN1cnJlbnRFbnRpdHlTZXQgPSBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVNldCgpO1xuXHRjb25zdCBkYXRhTW9kZWxPYmplY3RQYXRoID0gY29udmVydGVyQ29udGV4dC5nZXREYXRhTW9kZWxPYmplY3RQYXRoKCk7XG5cdGNvbnN0IHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMgPSBkYXRhTW9kZWxPYmplY3RQYXRoLm5hdmlnYXRpb25Qcm9wZXJ0aWVzLm1hcChuYXZQcm9wID0+IG5hdlByb3AubmFtZSk7XG5cdGNvbnN0IGlzRGVsZXRlSGlkZGVuRXhwcmVzc2lvbiA9IGN1cnJlbnRFbnRpdHlTZXRcblx0XHQ/IGFubm90YXRpb25FeHByZXNzaW9uKFxuXHRcdFx0XHQoY3VycmVudEVudGl0eVNldD8uYW5ub3RhdGlvbnMuVUk/LkRlbGV0ZUhpZGRlbiBhcyBQcm9wZXJ0eUFubm90YXRpb25WYWx1ZTxib29sZWFuPikgfHwgZmFsc2UsXG5cdFx0XHRcdHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMsXG5cdFx0XHRcdHVuZGVmaW5lZCxcblx0XHRcdFx0KHBhdGg6IHN0cmluZykgPT4gc2luZ2xldG9uUGF0aFZpc2l0b3IocGF0aCwgY29udmVydGVyQ29udGV4dCwgdmlzaXRlZE5hdmlnYXRpb25QYXRocylcblx0XHQgIClcblx0XHQ6IGNvbnN0YW50KGZhbHNlKTtcblx0Y29uc3QgaXNEZWxldGVIaWRkZW46IGFueSA9IGNvbXBpbGVCaW5kaW5nKGlzRGVsZXRlSGlkZGVuRXhwcmVzc2lvbik7XG5cdGxldCBpc1BhcmVudERlbGV0YWJsZSwgcGFyZW50RW50aXR5U2V0RGVsZXRhYmxlO1xuXHRpZiAoY29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSA9PT0gVGVtcGxhdGVUeXBlLk9iamVjdFBhZ2UpIHtcblx0XHRpc1BhcmVudERlbGV0YWJsZSA9IGlzUGF0aERlbGV0YWJsZShjb252ZXJ0ZXJDb250ZXh0LmdldERhdGFNb2RlbE9iamVjdFBhdGgoKSwgbmF2aWdhdGlvblBhdGgpO1xuXHRcdHBhcmVudEVudGl0eVNldERlbGV0YWJsZSA9IGlzUGFyZW50RGVsZXRhYmxlID8gY29tcGlsZUJpbmRpbmcoaXNQYXJlbnREZWxldGFibGUpIDogaXNQYXJlbnREZWxldGFibGU7XG5cdH1cblx0Y29uc3QgYklzU3RpY2t5U2Vzc2lvblN1cHBvcnRlZCA9IGNvbnZlcnRlckNvbnRleHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpLnN0YXJ0aW5nRW50aXR5U2V0Py5hbm5vdGF0aW9ucz8uU2Vzc2lvblxuXHRcdD8uU3RpY2t5U2Vzc2lvblN1cHBvcnRlZFxuXHRcdD8gdHJ1ZVxuXHRcdDogZmFsc2U7XG5cdGNvbnN0IGJJc0RyYWZ0Um9vdCA9IGN1cnJlbnRFbnRpdHlTZXQgJiYgY3VycmVudEVudGl0eVNldC5hbm5vdGF0aW9ucz8uQ29tbW9uPy5EcmFmdFJvb3QgPyB0cnVlIDogZmFsc2U7XG5cdGNvbnN0IGJJc0RyYWZ0Tm9kZSA9IGN1cnJlbnRFbnRpdHlTZXQgJiYgY3VycmVudEVudGl0eVNldC5hbm5vdGF0aW9ucz8uQ29tbW9uPy5EcmFmdE5vZGUgPyB0cnVlIDogZmFsc2U7XG5cdGNvbnN0IGJJc0RyYWZ0UGFyZW50RW50aXR5Rm9yQ29udGFpbm1lbnQgPVxuXHRcdGNvbnZlcnRlckNvbnRleHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpLnRhcmdldE9iamVjdD8uY29udGFpbnNUYXJnZXQgJiZcblx0XHQoY29udmVydGVyQ29udGV4dC5nZXREYXRhTW9kZWxPYmplY3RQYXRoKCkuc3RhcnRpbmdFbnRpdHlTZXQ/LmFubm90YXRpb25zPy5Db21tb24/LkRyYWZ0Um9vdCB8fFxuXHRcdFx0Y29udmVydGVyQ29udGV4dC5nZXREYXRhTW9kZWxPYmplY3RQYXRoKCkuc3RhcnRpbmdFbnRpdHlTZXQ/LmFubm90YXRpb25zPy5Db21tb24/LkRyYWZ0Tm9kZSlcblx0XHRcdD8gdHJ1ZVxuXHRcdFx0OiBmYWxzZTtcblx0aWYgKFxuXHRcdGJJc0RyYWZ0Um9vdCB8fFxuXHRcdGJJc0RyYWZ0Tm9kZSB8fFxuXHRcdGJJc1N0aWNreVNlc3Npb25TdXBwb3J0ZWQgfHxcblx0XHQoIWNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5U2V0KCkgJiYgYklzRHJhZnRQYXJlbnRFbnRpdHlGb3JDb250YWlubWVudClcblx0KSB7XG5cdFx0Ly9kbyBub3Qgc2hvdyBjYXNlIHRoZSBkZWxldGUgYnV0dG9uIGlmIHBhcmVudEVudGl0eVNldERlbGV0YWJsZSBpcyBmYWxzZVxuXHRcdGlmIChwYXJlbnRFbnRpdHlTZXREZWxldGFibGUgPT09IFwiZmFsc2VcIikge1xuXHRcdFx0cmV0dXJuIGNvbnN0YW50KGZhbHNlKTtcblx0XHRcdC8vT1Bcblx0XHR9IGVsc2UgaWYgKHBhcmVudEVudGl0eVNldERlbGV0YWJsZSAmJiBpc0RlbGV0ZUhpZGRlbiAhPT0gXCJ0cnVlXCIpIHtcblx0XHRcdC8vRGVsZXRlIEhpZGRlbiBpbiBjYXNlIG9mIHRydWUgYW5kIHBhdGggYmFzZWRcblx0XHRcdGlmIChpc0RlbGV0ZUhpZGRlbiAmJiBpc0RlbGV0ZUhpZGRlbiAhPT0gXCJmYWxzZVwiKSB7XG5cdFx0XHRcdHJldHVybiBhbmQoZXF1YWwoYmluZGluZ0V4cHJlc3Npb24oXCIvZWRpdE1vZGVcIiwgXCJ1aVwiKSwgXCJFZGl0YWJsZVwiKSwgbm90KGlzRGVsZXRlSGlkZGVuRXhwcmVzc2lvbikpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGVxdWFsKGJpbmRpbmdFeHByZXNzaW9uKFwiL2VkaXRNb2RlXCIsIFwidWlcIiksIFwiRWRpdGFibGVcIik7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChcblx0XHRcdGlzRGVsZXRlSGlkZGVuID09PSBcInRydWVcIiB8fFxuXHRcdFx0IWlzVGFyZ2V0RGVsZXRhYmxlIHx8XG5cdFx0XHQodmlld0NvbmZpZ3VyYXRpb24gJiYgY29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdFdyYXBwZXIoKS5oYXNNdWx0aXBsZVZpc3VhbGl6YXRpb25zKHZpZXdDb25maWd1cmF0aW9uKSkgfHxcblx0XHRcdGNvbnZlcnRlckNvbnRleHQuZ2V0VGVtcGxhdGVUeXBlKCkgPT09IFRlbXBsYXRlVHlwZS5BbmFseXRpY2FsTGlzdFBhZ2Vcblx0XHQpIHtcblx0XHRcdHJldHVybiBjb25zdGFudChmYWxzZSk7XG5cdFx0fSBlbHNlIGlmIChjb252ZXJ0ZXJDb250ZXh0LmdldFRlbXBsYXRlVHlwZSgpICE9PSBUZW1wbGF0ZVR5cGUuTGlzdFJlcG9ydCkge1xuXHRcdFx0aWYgKGlzRGVsZXRlSGlkZGVuICYmIGlzRGVsZXRlSGlkZGVuID09PSBcImZhbHNlXCIpIHtcblx0XHRcdFx0cmV0dXJuIGFuZChlcXVhbChiaW5kaW5nRXhwcmVzc2lvbihcIi9lZGl0TW9kZVwiLCBcInVpXCIpLCBcIkVkaXRhYmxlXCIpLCBub3QoaXNEZWxldGVIaWRkZW5FeHByZXNzaW9uKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gZXF1YWwoYmluZGluZ0V4cHJlc3Npb24oXCIvZWRpdE1vZGVcIiwgXCJ1aVwiKSwgXCJFZGl0YWJsZVwiKTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGlzQmluZGluZyhpc0RlbGV0ZUhpZGRlbkV4cHJlc3Npb24pKSB7XG5cdFx0XHQvLyBVSS5EZWxldGVIaWRkZW4gYW5ub3RhdGlvbiBwb2ludHMgdG8gYSBwYXRoXG5cdFx0XHRyZXR1cm4gbm90KGlzRGVsZXRlSGlkZGVuRXhwcmVzc2lvbik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBjb25zdGFudCh0cnVlKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIGNvbnN0YW50KGZhbHNlKTtcblx0fVxufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGVuYWJsZW1lbnQgZm9yIHRoZSAnTWFzcyBFZGl0JyBidXR0b25cbiAqXG4gKiBAcGFyYW0gY29udmVydGVyQ29udGV4dCBUaGUgY29udmVydGVyQ29udGV4dFxuICogQHBhcmFtIGJNYXNzRWRpdFZpc2libGUgVGhlIHZpc2liaWxpdHkgb2YgdGhlICdNYXNzIEVkaXQnIGJ1dHRvblxuICogQHJldHVybnMgeyp9IEV4cHJlc3Npb24gb3IgQm9vbGVhbiB2YWx1ZSBmb3IgdGhlIGVuYWJsZW1lbnQgb2YgdGhlICdNYXNzIEVkaXQnIGJ1dHRvblxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmFibGVtZW50TWFzc0VkaXQoXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdGJNYXNzRWRpdFZpc2libGU6IHN0cmluZyB8IGJvb2xlYW4gfCB1bmRlZmluZWRcbik6IHN0cmluZyB8IGJvb2xlYW4ge1xuXHRpZiAoYk1hc3NFZGl0VmlzaWJsZSkge1xuXHRcdGNvbnN0IGlzUGFyZW50VXBkYXRhYmxlOiBhbnkgPSBpc1BhdGhVcGRhdGFibGUoY29udmVydGVyQ29udGV4dC5nZXREYXRhTW9kZWxPYmplY3RQYXRoKCksIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cdFx0Ly93aGVuIHVwZGF0YWJsZSBpcyBwYXRoIGJhc2VkIGFuZCBwb2ludGluZyB0byBjdXJyZW50IGVudGl0eSBzZXQgcHJvcGVydHksIHRoYXQgY2FzZSBpcyBoYW5kbGVkIGluIHRhYmxlIGhlbHBlciBhbmQgcnVudGltZVxuXHRcdGlmIChpc1BhcmVudFVwZGF0YWJsZT8uY3VycmVudEVudGl0eVJlc3RyaWN0aW9uKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGNvbnN0IG9FeHByZXNzaW9uOiBhbnkgPSBjb21waWxlQmluZGluZyhpc1BhcmVudFVwZGF0YWJsZSk7XG5cdFx0cmV0dXJuIGlzUGFyZW50VXBkYXRhYmxlXG5cdFx0XHQ/IFwiez0gJXtpbnRlcm5hbD5udW1iZXJPZlNlbGVjdGVkQ29udGV4dHN9ID49IDIgJiYgXCIgKyBjb21waWxlQmluZGluZyhpc1BhcmVudFVwZGF0YWJsZSwgb0V4cHJlc3Npb24pICsgXCJ9XCJcblx0XHRcdDogZmFsc2U7XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHZpc2liaWxpdHkgZm9yIHRoZSAnTWFzcyBFZGl0JyBidXR0b25cbiAqXG4gKiBAcGFyYW0gY29udmVydGVyQ29udGV4dCBUaGUgY29udmVydGVyQ29udGV4dFxuICogQHBhcmFtIHRhYmxlTWFuaWZlc3RDb25maWd1cmF0aW9uIFRoZSBtYW5pZmVzdCBjb25maWd1cmF0aW9uIGZvciB0aGUgdGFibGVcbiAqIEBwYXJhbSB0YXJnZXRDYXBhYmlsaXRpZXMgVGhlIHRhcmdldCBjYXBhYmlsaXR5IHJlc3RyaWN0aW9ucyBmb3IgdGhlIHRhYmxlXG4gKiBAcGFyYW0gc2VsZWN0aW9uTW9kZSBUaGUgc2VsZWN0aW9uIG1vZGUgZm9yIHRoZSB0YWJsZVxuICogQHJldHVybnMgeyp9IEV4cHJlc3Npb24gb3IgQm9vbGVhbiB2YWx1ZSBmb3IgdGhlIHZpc2liaWxpdHkgb2YgdGhlICdNYXNzIEVkaXQnIGJ1dHRvblxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWaXNpYmlsaXR5TWFzc0VkaXQoXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdHRhYmxlTWFuaWZlc3RDb25maWd1cmF0aW9uOiBUYWJsZUNvbnRyb2xDb25maWd1cmF0aW9uLFxuXHR0YXJnZXRDYXBhYmlsaXRpZXM6IFRhYmxlQ2FwYWJpbGl0eVJlc3RyaWN0aW9uLFxuXHRzZWxlY3Rpb25Nb2RlOiBzdHJpbmcgfCB1bmRlZmluZWRcbik6IGJvb2xlYW4gfCBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRjb25zdCBlbnRpdHlTZXQgPSBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVNldCgpLFxuXHRcdGJVcGRhdGVIaWRkZW46IGFueSA9IGVudGl0eVNldCAmJiBlbnRpdHlTZXQ/LmFubm90YXRpb25zLlVJPy5VcGRhdGVIaWRkZW4/LnZhbHVlT2YoKSxcblx0XHRiTWFzc0VkaXRFbmFibGVkOiBib29sZWFuID0gdGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb24/LmVuYWJsZU1hc3NFZGl0IHx8IGZhbHNlLFxuXHRcdGlTZWxlY3Rpb25MaW1pdDogbnVtYmVyID0gdGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb24/LnNlbGVjdGlvbkxpbWl0O1xuXHRsZXQgYk1hc3NFZGl0VmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG5cdGlmICgoc2VsZWN0aW9uTW9kZSAmJiBzZWxlY3Rpb25Nb2RlID09PSBcIlNpbmdsZVwiKSB8fCAoaVNlbGVjdGlvbkxpbWl0ICYmIGlTZWxlY3Rpb25MaW1pdCA8IDIpKSB7XG5cdFx0Yk1hc3NFZGl0VmlzaWJsZSA9IGZhbHNlO1xuXHR9IGVsc2UgaWYgKHNlbGVjdGlvbk1vZGUgJiYgKHNlbGVjdGlvbk1vZGUgPT09IFwiQXV0b1wiIHx8IHNlbGVjdGlvbk1vZGUgPT09IFwiTm9uZVwiKSkge1xuXHRcdGJNYXNzRWRpdFZpc2libGUgPSB0cnVlO1xuXHR9XG5cdGlmICh0YXJnZXRDYXBhYmlsaXRpZXM/LmlzVXBkYXRhYmxlICE9PSBmYWxzZSAmJiBiTWFzc0VkaXRWaXNpYmxlICYmIGJNYXNzRWRpdEVuYWJsZWQpIHtcblx0XHRpZiAoYlVwZGF0ZUhpZGRlbiAmJiB0eXBlb2YgYlVwZGF0ZUhpZGRlbiA9PT0gXCJib29sZWFuXCIpIHtcblx0XHRcdHJldHVybiAhYlVwZGF0ZUhpZGRlbiAmJiBjb252ZXJ0ZXJDb250ZXh0LmdldFRlbXBsYXRlVHlwZSgpID09PSBUZW1wbGF0ZVR5cGUuT2JqZWN0UGFnZSA/IGNvbXBpbGVCaW5kaW5nKFVJLklzRWRpdGFibGUpIDogZmFsc2U7XG5cdFx0fSBlbHNlIGlmIChiVXBkYXRlSGlkZGVuICYmIGJVcGRhdGVIaWRkZW4/LnBhdGgpIHtcblx0XHRcdHJldHVybiBjb252ZXJ0ZXJDb250ZXh0LmdldFRlbXBsYXRlVHlwZSgpID09PSBUZW1wbGF0ZVR5cGUuT2JqZWN0UGFnZVxuXHRcdFx0XHQ/IGNvbXBpbGVCaW5kaW5nKGFuZChlcXVhbChVSS5Jc0VkaXRhYmxlLCB0cnVlKSwgZXF1YWwoYW5ub3RhdGlvbkV4cHJlc3Npb24oYlVwZGF0ZUhpZGRlbiksIGZhbHNlKSkpXG5cdFx0XHRcdDogZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiBjb252ZXJ0ZXJDb250ZXh0LmdldFRlbXBsYXRlVHlwZSgpID09PSBUZW1wbGF0ZVR5cGUuT2JqZWN0UGFnZSA/IGNvbXBpbGVCaW5kaW5nKFVJLklzRWRpdGFibGUpIDogZmFsc2U7XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEZ1bmN0aW9uIHRvIGRldGVybWluZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgQ3JlYXRlIGJ1dHRvbi5cbiAqXG4gKiBAcGFyYW0gY29udmVydGVyQ29udGV4dCBUaGUgaW5zdGFuY2Ugb2YgdGhlIGNvbnZlcnRlciBjb250ZXh0XG4gKiBAcGFyYW0gY3JlYXRpb25Nb2RlIFRoZSBtb2RlIHVzZWQgZm9yIGNyZWF0aW9uXG4gKiBAcGFyYW0gaXNJbnNlcnRhYmxlIEFubm90YXRpb24gZXhwcmVzc2lvbiBvZiBJbnNlcnRSZXN0cmljdGlvbnMuSW5zZXJ0YWJsZVxuICogQHBhcmFtIHZpZXdDb25maWd1cmF0aW9uIFRoZSBpbnN0YW5jZSBvZiB0aGUgY29uZmlndXJhdGlvbiBmb3IgdGhlIHZpZXcgcGF0aFxuICogQHJldHVybnMge0V4cHJlc3Npb248Ym9vbGVhbj59IEV4cHJlc3Npb24gb3IgQm9vbGVhbiB2YWx1ZSBvZiB0aGUgJ1VJLkNyZWF0ZUhpZGRlbicgYW5ub3RhdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3JlYXRlVmlzaWJsZShcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCxcblx0Y3JlYXRpb25Nb2RlOiBDcmVhdGlvbk1vZGUgfCBcIkV4dGVybmFsXCIsXG5cdGlzSW5zZXJ0YWJsZTogRXhwcmVzc2lvbjxib29sZWFuPixcblx0dmlld0NvbmZpZ3VyYXRpb24/OiBWaWV3UGF0aENvbmZpZ3VyYXRpb25cbik6IEV4cHJlc3Npb248Ym9vbGVhbj4ge1xuXHRjb25zdCBjdXJyZW50RW50aXR5U2V0ID0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlTZXQoKTtcblx0Y29uc3QgZGF0YU1vZGVsT2JqZWN0UGF0aCA9IGNvbnZlcnRlckNvbnRleHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpO1xuXHRjb25zdCB2aXNpdGVkTmF2aWdhdGlvblBhdGhzID0gZGF0YU1vZGVsT2JqZWN0UGF0aC5uYXZpZ2F0aW9uUHJvcGVydGllcy5tYXAobmF2UHJvcCA9PiBuYXZQcm9wLm5hbWUpO1xuXHRjb25zdCBpc0NyZWF0ZUhpZGRlbjogRXhwcmVzc2lvbjxib29sZWFuPiA9IGN1cnJlbnRFbnRpdHlTZXRcblx0XHQ/IGFubm90YXRpb25FeHByZXNzaW9uKFxuXHRcdFx0XHQoY3VycmVudEVudGl0eVNldD8uYW5ub3RhdGlvbnMuVUk/LkNyZWF0ZUhpZGRlbiBhcyBQcm9wZXJ0eUFubm90YXRpb25WYWx1ZTxib29sZWFuPikgfHwgZmFsc2UsXG5cdFx0XHRcdHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMsXG5cdFx0XHRcdHVuZGVmaW5lZCxcblx0XHRcdFx0KHBhdGg6IHN0cmluZykgPT4gc2luZ2xldG9uUGF0aFZpc2l0b3IocGF0aCwgY29udmVydGVyQ29udGV4dCwgdmlzaXRlZE5hdmlnYXRpb25QYXRocylcblx0XHQgIClcblx0XHQ6IGNvbnN0YW50KGZhbHNlKTtcblxuXHQvLyBpZiB0aGVyZSBpcyBhIGN1c3RvbSBuZXcgYWN0aW9uIHRoZSBjcmVhdGUgYnV0dG9uIHdpbGwgYmUgYm91bmQgYWdhaW5zdCB0aGlzIG5ldyBhY3Rpb24gKGluc3RlYWQgb2YgYSBQT1NUIGFjdGlvbikuXG5cdC8vIFRoZSB2aXNpYmlsaXR5IG9mIHRoZSBjcmVhdGUgYnV0dG9uIHRoZW4gZGVwZW5kcyBvbiB0aGUgbmV3IGFjdGlvbidzIE9wZXJhdGlvbkF2YWlsYWJsZSBhbm5vdGF0aW9uIChpbnN0ZWFkIG9mIHRoZSBpbnNlcnRSZXN0cmljdGlvbnMpOlxuXHQvLyBPcGVyYXRpb25BdmFpbGFibGUgPSB0cnVlIG9yIHVuZGVmaW5lZCAtPiBjcmVhdGUgaXMgdmlzaWJsZVxuXHQvLyBPcGVyYXRpb25BdmFpbGFibGUgPSBmYWxzZSAtPiBjcmVhdGUgaXMgbm90IHZpc2libGVcblx0Y29uc3QgbmV3QWN0aW9uTmFtZTogQmluZGluZ0V4cHJlc3Npb248c3RyaW5nPiA9IGN1cnJlbnRFbnRpdHlTZXQ/LmFubm90YXRpb25zLkNvbW1vbj8uRHJhZnRSb290Py5OZXdBY3Rpb24/LnRvU3RyaW5nKCk7XG5cdGNvbnN0IHNob3dDcmVhdGVGb3JOZXdBY3Rpb24gPSBuZXdBY3Rpb25OYW1lXG5cdFx0PyBhbm5vdGF0aW9uRXhwcmVzc2lvbihcblx0XHRcdFx0Y29udmVydGVyQ29udGV4dD8uZ2V0RW50aXR5VHlwZSgpLmFjdGlvbnNbbmV3QWN0aW9uTmFtZV0uYW5ub3RhdGlvbnM/LkNvcmU/Lk9wZXJhdGlvbkF2YWlsYWJsZT8udmFsdWVPZigpLFxuXHRcdFx0XHRbXSxcblx0XHRcdFx0dHJ1ZSxcblx0XHRcdFx0KHBhdGg6IHN0cmluZykgPT4gc2luZ2xldG9uUGF0aFZpc2l0b3IocGF0aCwgY29udmVydGVyQ29udGV4dCwgW10pXG5cdFx0ICApXG5cdFx0OiB1bmRlZmluZWQ7XG5cdC8vIC0gSWYgaXQncyBzdGF0aWNhbGx5IG5vdCBpbnNlcnRhYmxlIC0+IGNyZWF0ZSBpcyBub3QgdmlzaWJsZVxuXHQvLyAtIElmIGNyZWF0ZSBpcyBzdGF0aWNhbGx5IGhpZGRlbiAtPiBjcmVhdGUgaXMgbm90IHZpc2libGVcblx0Ly8gLSBJZiBpdCdzIGFuIEFMUCB0ZW1wbGF0ZSAtPiBjcmVhdGUgaXMgbm90IHZpc2libGVcblx0Ly8gLVxuXHQvLyAtIE90aGVyd2lzZVxuXHQvLyBcdCAtIElmIHRoZSBjcmVhdGUgbW9kZSBpcyBleHRlcm5hbCAtPiBjcmVhdGUgaXMgdmlzaWJsZVxuXHQvLyBcdCAtIElmIHdlJ3JlIG9uIHRoZSBsaXN0IHJlcG9ydCAtPlxuXHQvLyBcdCBcdC0gSWYgVUkuQ3JlYXRlSGlkZGVuIHBvaW50cyB0byBhIHByb3BlcnR5IHBhdGggLT4gcHJvdmlkZSBhIG5lZ2F0ZWQgYmluZGluZyB0byB0aGlzIHBhdGhcblx0Ly8gXHQgXHQtIE90aGVyd2lzZSwgY3JlYXRlIGlzIHZpc2libGVcblx0Ly8gXHQgLSBPdGhlcndpc2Vcblx0Ly8gXHQgICAtIFRoaXMgZGVwZW5kcyBvbiB0aGUgdmFsdWUgb2YgdGhlIHRoZSBVSS5Jc0VkaXRhYmxlXG5cdHJldHVybiBpZkVsc2UoXG5cdFx0b3IoXG5cdFx0XHRvcihcblx0XHRcdFx0ZXF1YWwoc2hvd0NyZWF0ZUZvck5ld0FjdGlvbiwgZmFsc2UpLFxuXHRcdFx0XHRhbmQoaXNDb25zdGFudChpc0luc2VydGFibGUpLCBlcXVhbChpc0luc2VydGFibGUsIGZhbHNlKSwgZXF1YWwoc2hvd0NyZWF0ZUZvck5ld0FjdGlvbiwgdW5kZWZpbmVkKSlcblx0XHRcdCksXG5cdFx0XHRpc0NvbnN0YW50KGlzQ3JlYXRlSGlkZGVuKSAmJiBlcXVhbChpc0NyZWF0ZUhpZGRlbiwgdHJ1ZSksXG5cdFx0XHRvcihcblx0XHRcdFx0dmlld0NvbmZpZ3VyYXRpb24gPyBjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0V3JhcHBlcigpLmhhc011bHRpcGxlVmlzdWFsaXphdGlvbnModmlld0NvbmZpZ3VyYXRpb24pIDogZmFsc2UsXG5cdFx0XHRcdGNvbnZlcnRlckNvbnRleHQuZ2V0VGVtcGxhdGVUeXBlKCkgPT09IFRlbXBsYXRlVHlwZS5BbmFseXRpY2FsTGlzdFBhZ2Vcblx0XHRcdClcblx0XHQpLFxuXHRcdGZhbHNlLFxuXHRcdGlmRWxzZShcblx0XHRcdGNyZWF0aW9uTW9kZSA9PT0gXCJFeHRlcm5hbFwiLFxuXHRcdFx0dHJ1ZSxcblx0XHRcdGlmRWxzZShcblx0XHRcdFx0Y29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSA9PT0gVGVtcGxhdGVUeXBlLkxpc3RSZXBvcnQsXG5cdFx0XHRcdGlmRWxzZShpc0JpbmRpbmcoaXNDcmVhdGVIaWRkZW4pLCBub3QoaXNDcmVhdGVIaWRkZW4pLCB0cnVlKSxcblx0XHRcdFx0YW5kKG5vdChpc0NyZWF0ZUhpZGRlbiksIFVJLklzRWRpdGFibGUpXG5cdFx0XHQpXG5cdFx0KVxuXHQpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHZpc2liaWxpdHkgZm9yIHRoZSBQYXN0ZSBidXR0b24uXG4gKlxuICogQHBhcmFtIGNvbnZlcnRlckNvbnRleHQgVGhlIGluc3RhbmNlIG9mIHRoZSBjb252ZXJ0ZXIgY29udGV4dFxuICogQHBhcmFtIGNyZWF0aW9uQmVoYXZpb3VyIFRoZSBjaG9zZW4gYmVoYXZpb3Igb2YgY3JlYXRpb25cbiAqIEBwYXJhbSBpc0luc2VydGFibGUgVGhlIGV4cHJlc3Npb24gd2hpY2ggZGVub3RlcyBpbnNlcnQgcmVzdHJpY3Rpb25zXG4gKiBAcGFyYW0gcGFzdGVFbmFibGVkSW5NYW5pZmVzdCBUaGUgZmxhZyB3aGljaCBkZW5vdGVzIHRoZSBwYXN0ZSBlbmFibGVtZW50IHN0YXR1cyB2aWEgbWFuaWZlc3RcbiAqIEBwYXJhbSB2aWV3Q29uZmlndXJhdGlvbiBUaGUgaW5zdGFuY2Ugb2YgdGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSB2aWV3IHBhdGhcbiAqIEByZXR1cm5zIHtFeHByZXNzaW9uPGJvb2xlYW4+fSBFeHByZXNzaW9uIG9yIEJvb2xlYW4gdmFsdWUgb2YgdGhlIFVJLkNyZWF0ZUhpZGRlbiBhbm5vdGF0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXN0ZUVuYWJsZWQoXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdGNyZWF0aW9uQmVoYXZpb3VyOiBUYWJsZUFubm90YXRpb25Db25maWd1cmF0aW9uW1wiY3JlYXRlXCJdLFxuXHRpc0luc2VydGFibGU6IEV4cHJlc3Npb248Ym9vbGVhbj4sXG5cdHBhc3RlRW5hYmxlZEluTWFuaWZlc3Q6IGJvb2xlYW4sXG5cdHZpZXdDb25maWd1cmF0aW9uPzogVmlld1BhdGhDb25maWd1cmF0aW9uXG4pOiBFeHByZXNzaW9uPGJvb2xlYW4+IHtcblx0Ly8gSWYgY3JlYXRlIGlzIG5vdCB2aXNpYmxlIC0+IGl0J3Mgbm90IGVuYWJsZWRcblx0Ly8gSWYgY3JlYXRlIGlzIHZpc2libGUgLT5cblx0Ly8gXHQgSWYgaXQncyBpbiB0aGUgTGlzdFJlcG9ydCAtPiBub3QgZW5hYmxlZFxuXHQvL1x0IElmIGl0J3MgaW5zZXJ0YWJsZSAtPiBlbmFibGVkXG5cdHJldHVybiBpZkVsc2UoXG5cdFx0cGFzdGVFbmFibGVkSW5NYW5pZmVzdCAmJiBlcXVhbChnZXRDcmVhdGVWaXNpYmxlKGNvbnZlcnRlckNvbnRleHQsIGNyZWF0aW9uQmVoYXZpb3VyLm1vZGUsIGlzSW5zZXJ0YWJsZSwgdmlld0NvbmZpZ3VyYXRpb24pLCB0cnVlKSxcblx0XHRjb252ZXJ0ZXJDb250ZXh0LmdldFRlbXBsYXRlVHlwZSgpID09PSBUZW1wbGF0ZVR5cGUuT2JqZWN0UGFnZSAmJiBpc0luc2VydGFibGUsXG5cdFx0ZmFsc2Vcblx0KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgSlNPTiBzdHJpbmcgY29udGFpbmluZyB0aGUgc29ydCBjb25kaXRpb25zIGZvciB0aGUgcHJlc2VudGF0aW9uIHZhcmlhbnQuXG4gKlxuICogQHBhcmFtIGNvbnZlcnRlckNvbnRleHQgVGhlIGluc3RhbmNlIG9mIHRoZSBjb252ZXJ0ZXIgY29udGV4dFxuICogQHBhcmFtIHtQcmVzZW50YXRpb25WYXJpYW50VHlwZVR5cGVzIHwgdW5kZWZpbmVkfSBwcmVzZW50YXRpb25WYXJpYW50QW5ub3RhdGlvbiBQcmVzZW50YXRpb24gdmFyaWFudCBhbm5vdGF0aW9uXG4gKiBAcGFyYW0gY29sdW1ucyBUYWJsZSBjb2x1bW5zIHByb2Nlc3NlZCBieSB0aGUgY29udmVydGVyXG4gKiBAcmV0dXJucyB7c3RyaW5nIHwgdW5kZWZpbmVkfSBTb3J0IGNvbmRpdGlvbnMgZm9yIGEgcHJlc2VudGF0aW9uIHZhcmlhbnQuXG4gKi9cbmZ1bmN0aW9uIGdldFNvcnRDb25kaXRpb25zKFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHRwcmVzZW50YXRpb25WYXJpYW50QW5ub3RhdGlvbjogUHJlc2VudGF0aW9uVmFyaWFudFR5cGVUeXBlcyB8IHVuZGVmaW5lZCxcblx0Y29sdW1uczogVGFibGVDb2x1bW5bXVxuKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0Ly8gQ3VycmVudGx5IG5hdmlnYXRpb24gcHJvcGVydHkgaXMgbm90IHN1cHBvcnRlZCBhcyBzb3J0ZXJcblx0Y29uc3Qgbm9uU29ydGFibGVQcm9wZXJ0aWVzID0gZ2V0Tm9uU29ydGFibGVQcm9wZXJ0aWVzUmVzdHJpY3Rpb25zKGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5U2V0KCkpO1xuXHRsZXQgc29ydENvbmRpdGlvbnM6IHN0cmluZyB8IHVuZGVmaW5lZDtcblx0aWYgKHByZXNlbnRhdGlvblZhcmlhbnRBbm5vdGF0aW9uPy5Tb3J0T3JkZXIpIHtcblx0XHRjb25zdCBzb3J0ZXJzOiBTb3J0ZXJUeXBlW10gPSBbXTtcblx0XHRjb25zdCBjb25kaXRpb25zID0ge1xuXHRcdFx0c29ydGVyczogc29ydGVyc1xuXHRcdH07XG5cdFx0cHJlc2VudGF0aW9uVmFyaWFudEFubm90YXRpb24uU29ydE9yZGVyLmZvckVhY2goY29uZGl0aW9uID0+IHtcblx0XHRcdGNvbnN0IGNvbmRpdGlvblByb3BlcnR5ID0gY29uZGl0aW9uLlByb3BlcnR5O1xuXHRcdFx0aWYgKGNvbmRpdGlvblByb3BlcnR5ICYmIG5vblNvcnRhYmxlUHJvcGVydGllcy5pbmRleE9mKGNvbmRpdGlvblByb3BlcnR5LiR0YXJnZXQ/Lm5hbWUpID09PSAtMSkge1xuXHRcdFx0XHRjb25zdCBpbmZvTmFtZSA9IGNvbnZlcnRQcm9wZXJ0eVBhdGhzVG9JbmZvTmFtZXMoW2NvbmRpdGlvblByb3BlcnR5XSwgY29sdW1ucylbMF07XG5cdFx0XHRcdGlmIChpbmZvTmFtZSkge1xuXHRcdFx0XHRcdGNvbmRpdGlvbnMuc29ydGVycy5wdXNoKHtcblx0XHRcdFx0XHRcdG5hbWU6IGluZm9OYW1lLFxuXHRcdFx0XHRcdFx0ZGVzY2VuZGluZzogISFjb25kaXRpb24uRGVzY2VuZGluZ1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0c29ydENvbmRpdGlvbnMgPSBjb25kaXRpb25zLnNvcnRlcnMubGVuZ3RoID8gSlNPTi5zdHJpbmdpZnkoY29uZGl0aW9ucykgOiB1bmRlZmluZWQ7XG5cdH1cblx0cmV0dXJuIHNvcnRDb25kaXRpb25zO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGFuIGFycmF5IG9mIHByb3BlcnR5UGF0aCB0byBhbiBhcnJheSBvZiBwcm9wZXJ0eUluZm8gbmFtZXMuXG4gKlxuICogQHBhcmFtIHBhdGhzIHRoZSBhcnJheSB0byBiZSBjb252ZXJ0ZWRcbiAqIEBwYXJhbSBjb2x1bW5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eUluZm9zXG4gKiBAcmV0dXJucyBhbiBhcnJheSBvZiBwcm9wZXJ0eUluZm8gbmFtZXNcbiAqL1xuXG5mdW5jdGlvbiBjb252ZXJ0UHJvcGVydHlQYXRoc1RvSW5mb05hbWVzKHBhdGhzOiBQcm9wZXJ0eVBhdGhbXSwgY29sdW1uczogVGFibGVDb2x1bW5bXSk6IHN0cmluZ1tdIHtcblx0Y29uc3QgaW5mb05hbWVzOiBzdHJpbmdbXSA9IFtdO1xuXHRwYXRocy5mb3JFYWNoKGN1cnJlbnRQYXRoID0+IHtcblx0XHRpZiAoY3VycmVudFBhdGg/LiR0YXJnZXQ/Lm5hbWUpIHtcblx0XHRcdGNvbnN0IHByb3BlcnR5SW5mbyA9IGNvbHVtbnMuZmluZChjb2x1bW4gPT4ge1xuXHRcdFx0XHRjb25zdCBhbm5vdGF0aW9uQ29sdW1uID0gY29sdW1uIGFzIEFubm90YXRpb25UYWJsZUNvbHVtbjtcblx0XHRcdFx0cmV0dXJuICFhbm5vdGF0aW9uQ29sdW1uLnByb3BlcnR5SW5mb3MgJiYgYW5ub3RhdGlvbkNvbHVtbi5yZWxhdGl2ZVBhdGggPT09IGN1cnJlbnRQYXRoPy4kdGFyZ2V0Py5uYW1lO1xuXHRcdFx0fSk7XG5cdFx0XHRpZiAocHJvcGVydHlJbmZvKSB7XG5cdFx0XHRcdGluZm9OYW1lcy5wdXNoKHByb3BlcnR5SW5mby5uYW1lKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBpbmZvTmFtZXM7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIEpTT04gc3RyaW5nIGNvbnRhaW5pbmcgUHJlc2VudGF0aW9uIFZhcmlhbnQgZ3JvdXAgY29uZGl0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge1ByZXNlbnRhdGlvblZhcmlhbnRUeXBlVHlwZXMgfCB1bmRlZmluZWR9IHByZXNlbnRhdGlvblZhcmlhbnRBbm5vdGF0aW9uIFByZXNlbnRhdGlvbiB2YXJpYW50IGFubm90YXRpb25cbiAqIEBwYXJhbSBjb2x1bW5zIENvbnZlcnRlciBwcm9jZXNzZWQgdGFibGUgY29sdW1uc1xuICogQHJldHVybnMge3N0cmluZyB8IHVuZGVmaW5lZH0gR3JvdXAgY29uZGl0aW9ucyBmb3IgYSBQcmVzZW50YXRpb24gdmFyaWFudC5cbiAqL1xuZnVuY3Rpb24gZ2V0R3JvdXBDb25kaXRpb25zKFxuXHRwcmVzZW50YXRpb25WYXJpYW50QW5ub3RhdGlvbjogUHJlc2VudGF0aW9uVmFyaWFudFR5cGVUeXBlcyB8IHVuZGVmaW5lZCxcblx0Y29sdW1uczogVGFibGVDb2x1bW5bXVxuKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0bGV0IGdyb3VwQ29uZGl0aW9uczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXHRpZiAocHJlc2VudGF0aW9uVmFyaWFudEFubm90YXRpb24/Lkdyb3VwQnkpIHtcblx0XHRjb25zdCBhR3JvdXBCeSA9IHByZXNlbnRhdGlvblZhcmlhbnRBbm5vdGF0aW9uLkdyb3VwQnkgYXMgUHJvcGVydHlQYXRoW107XG5cdFx0Y29uc3QgYUdyb3VwTGV2ZWxzID0gY29udmVydFByb3BlcnR5UGF0aHNUb0luZm9OYW1lcyhhR3JvdXBCeSwgY29sdW1ucykubWFwKGluZm9OYW1lID0+IHtcblx0XHRcdHJldHVybiB7IG5hbWU6IGluZm9OYW1lIH07XG5cdFx0fSk7XG5cblx0XHRncm91cENvbmRpdGlvbnMgPSBhR3JvdXBMZXZlbHMubGVuZ3RoID8gSlNPTi5zdHJpbmdpZnkoeyBncm91cExldmVsczogYUdyb3VwTGV2ZWxzIH0pIDogdW5kZWZpbmVkO1xuXHR9XG5cdHJldHVybiBncm91cENvbmRpdGlvbnM7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIEpTT04gc3RyaW5nIGNvbnRhaW5pbmcgUHJlc2VudGF0aW9uIFZhcmlhbnQgYWdncmVnYXRlIGNvbmRpdGlvbnMuXG4gKlxuICogQHBhcmFtIHtQcmVzZW50YXRpb25WYXJpYW50VHlwZVR5cGVzIHwgdW5kZWZpbmVkfSBwcmVzZW50YXRpb25WYXJpYW50QW5ub3RhdGlvbiBQcmVzZW50YXRpb24gdmFyaWFudCBhbm5vdGF0aW9uXG4gKiBAcGFyYW0gY29sdW1ucyBDb252ZXJ0ZXIgcHJvY2Vzc2VkIHRhYmxlIGNvbHVtbnNcbiAqIEByZXR1cm5zIHtzdHJpbmcgfCB1bmRlZmluZWR9IEdyb3VwIGNvbmRpdGlvbnMgZm9yIGEgUHJlc2VudGF0aW9uIHZhcmlhbnQuXG4gKi9cbmZ1bmN0aW9uIGdldEFnZ3JlZ2F0ZUNvbmRpdGlvbnMoXG5cdHByZXNlbnRhdGlvblZhcmlhbnRBbm5vdGF0aW9uOiBQcmVzZW50YXRpb25WYXJpYW50VHlwZVR5cGVzIHwgdW5kZWZpbmVkLFxuXHRjb2x1bW5zOiBUYWJsZUNvbHVtbltdXG4pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRsZXQgYWdncmVnYXRlQ29uZGl0aW9uczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXHRpZiAocHJlc2VudGF0aW9uVmFyaWFudEFubm90YXRpb24/LlRvdGFsKSB7XG5cdFx0Y29uc3QgYVRvdGFscyA9IHByZXNlbnRhdGlvblZhcmlhbnRBbm5vdGF0aW9uLlRvdGFsIGFzIFByb3BlcnR5UGF0aFtdO1xuXHRcdGNvbnN0IGFnZ3JlZ2F0ZXM6IFJlY29yZDxzdHJpbmcsIG9iamVjdD4gPSB7fTtcblx0XHRjb252ZXJ0UHJvcGVydHlQYXRoc1RvSW5mb05hbWVzKGFUb3RhbHMsIGNvbHVtbnMpLmZvckVhY2goaW5mb05hbWUgPT4ge1xuXHRcdFx0YWdncmVnYXRlc1tpbmZvTmFtZV0gPSB7fTtcblx0XHR9KTtcblxuXHRcdGFnZ3JlZ2F0ZUNvbmRpdGlvbnMgPSBKU09OLnN0cmluZ2lmeShhZ2dyZWdhdGVzKTtcblx0fVxuXG5cdHJldHVybiBhZ2dyZWdhdGVDb25kaXRpb25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFibGVBbm5vdGF0aW9uQ29uZmlndXJhdGlvbihcblx0bGluZUl0ZW1Bbm5vdGF0aW9uOiBMaW5lSXRlbSB8IHVuZGVmaW5lZCxcblx0dmlzdWFsaXphdGlvblBhdGg6IHN0cmluZyxcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCxcblx0dGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb246IFRhYmxlQ29udHJvbENvbmZpZ3VyYXRpb24sXG5cdGNvbHVtbnM6IFRhYmxlQ29sdW1uW10sXG5cdHByZXNlbnRhdGlvblZhcmlhbnRBbm5vdGF0aW9uPzogUHJlc2VudGF0aW9uVmFyaWFudFR5cGVUeXBlcyxcblx0dmlld0NvbmZpZ3VyYXRpb24/OiBWaWV3UGF0aENvbmZpZ3VyYXRpb25cbik6IFRhYmxlQW5ub3RhdGlvbkNvbmZpZ3VyYXRpb24ge1xuXHQvLyBOZWVkIHRvIGdldCB0aGUgdGFyZ2V0XG5cdGNvbnN0IHsgbmF2aWdhdGlvblByb3BlcnR5UGF0aCB9ID0gc3BsaXRQYXRoKHZpc3VhbGl6YXRpb25QYXRoKTtcblx0Y29uc3QgdGl0bGU6IGFueSA9IGNvbnZlcnRlckNvbnRleHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpLnRhcmdldEVudGl0eVR5cGUuYW5ub3RhdGlvbnM/LlVJPy5IZWFkZXJJbmZvPy5UeXBlTmFtZVBsdXJhbDtcblx0Y29uc3QgZW50aXR5U2V0ID0gY29udmVydGVyQ29udGV4dC5nZXREYXRhTW9kZWxPYmplY3RQYXRoKCkudGFyZ2V0RW50aXR5U2V0O1xuXHRjb25zdCBwYWdlTWFuaWZlc3RTZXR0aW5nczogTWFuaWZlc3RXcmFwcGVyID0gY29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdFdyYXBwZXIoKTtcblx0Y29uc3QgaGFzQWJzb2x1dGVQYXRoID0gbmF2aWdhdGlvblByb3BlcnR5UGF0aC5sZW5ndGggPT09IDAsXG5cdFx0cDEzbk1vZGU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IGdldFAxM25Nb2RlKHZpc3VhbGl6YXRpb25QYXRoLCBjb252ZXJ0ZXJDb250ZXh0LCB0YWJsZU1hbmlmZXN0Q29uZmlndXJhdGlvbiksXG5cdFx0aWQgPSBuYXZpZ2F0aW9uUHJvcGVydHlQYXRoID8gVGFibGVJRCh2aXN1YWxpemF0aW9uUGF0aCkgOiBUYWJsZUlEKGNvbnZlcnRlckNvbnRleHQuZ2V0Q29udGV4dFBhdGgoKSwgXCJMaW5lSXRlbVwiKTtcblx0Y29uc3QgdGFyZ2V0Q2FwYWJpbGl0aWVzID0gZ2V0Q2FwYWJpbGl0eVJlc3RyaWN0aW9uKGNvbnZlcnRlckNvbnRleHQpO1xuXHRjb25zdCBpc0RlbGV0ZUJ1dHRvblZpc2libGUgPSBnZXREZWxldGVWaXNpYmxlKFxuXHRcdGNvbnZlcnRlckNvbnRleHQsXG5cdFx0bmF2aWdhdGlvblByb3BlcnR5UGF0aCxcblx0XHR0YXJnZXRDYXBhYmlsaXRpZXMuaXNEZWxldGFibGUsXG5cdFx0dmlld0NvbmZpZ3VyYXRpb25cblx0KTtcblx0Y29uc3Qgc2VsZWN0aW9uTW9kZSA9IGdldFNlbGVjdGlvbk1vZGUoXG5cdFx0bGluZUl0ZW1Bbm5vdGF0aW9uLFxuXHRcdHZpc3VhbGl6YXRpb25QYXRoLFxuXHRcdGNvbnZlcnRlckNvbnRleHQsXG5cdFx0aGFzQWJzb2x1dGVQYXRoLFxuXHRcdHRhcmdldENhcGFiaWxpdGllcyxcblx0XHRpc0RlbGV0ZUJ1dHRvblZpc2libGVcblx0KTtcblx0bGV0IHRocmVzaG9sZCA9IG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGggPyAxMCA6IDMwO1xuXHRpZiAocHJlc2VudGF0aW9uVmFyaWFudEFubm90YXRpb24/Lk1heEl0ZW1zKSB7XG5cdFx0dGhyZXNob2xkID0gcHJlc2VudGF0aW9uVmFyaWFudEFubm90YXRpb24uTWF4SXRlbXMudmFsdWVPZigpIGFzIG51bWJlcjtcblx0fVxuXHRjb25zdCBuYXZpZ2F0aW9uVGFyZ2V0UGF0aCA9IGdldE5hdmlnYXRpb25UYXJnZXRQYXRoKGNvbnZlcnRlckNvbnRleHQsIG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGgpO1xuXHRjb25zdCBuYXZpZ2F0aW9uU2V0dGluZ3MgPSBwYWdlTWFuaWZlc3RTZXR0aW5ncy5nZXROYXZpZ2F0aW9uQ29uZmlndXJhdGlvbihuYXZpZ2F0aW9uVGFyZ2V0UGF0aCk7XG5cdGNvbnN0IGNyZWF0aW9uQmVoYXZpb3VyID0gX2dldENyZWF0aW9uQmVoYXZpb3VyKGxpbmVJdGVtQW5ub3RhdGlvbiwgdGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb24sIGNvbnZlcnRlckNvbnRleHQsIG5hdmlnYXRpb25TZXR0aW5ncyk7XG5cdGxldCBpc1BhcmVudERlbGV0YWJsZTogYW55LCBwYXJlbnRFbnRpdHlTZXREZWxldGFibGU7XG5cdGlmIChjb252ZXJ0ZXJDb250ZXh0LmdldFRlbXBsYXRlVHlwZSgpID09PSBUZW1wbGF0ZVR5cGUuT2JqZWN0UGFnZSkge1xuXHRcdGlzUGFyZW50RGVsZXRhYmxlID0gaXNQYXRoRGVsZXRhYmxlKGNvbnZlcnRlckNvbnRleHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpLCB1bmRlZmluZWQsIHRydWUpO1xuXHRcdGlmIChpc1BhcmVudERlbGV0YWJsZT8uY3VycmVudEVudGl0eVJlc3RyaWN0aW9uKSB7XG5cdFx0XHRwYXJlbnRFbnRpdHlTZXREZWxldGFibGUgPSB1bmRlZmluZWQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhcmVudEVudGl0eVNldERlbGV0YWJsZSA9IGlzUGFyZW50RGVsZXRhYmxlID8gY29tcGlsZUJpbmRpbmcoaXNQYXJlbnREZWxldGFibGUsIHRydWUpIDogaXNQYXJlbnREZWxldGFibGU7XG5cdFx0fVxuXHR9XG5cdGNvbnN0IGRhdGFNb2RlbE9iamVjdFBhdGggPSBjb252ZXJ0ZXJDb250ZXh0LmdldERhdGFNb2RlbE9iamVjdFBhdGgoKTtcblx0Y29uc3QgaXNJbnNlcnRhYmxlOiBFeHByZXNzaW9uPGJvb2xlYW4+ID0gaXNQYXRoSW5zZXJ0YWJsZShkYXRhTW9kZWxPYmplY3RQYXRoKTtcblx0Y29uc3QgdmFyaWFudE1hbmFnZW1lbnQ6IFZhcmlhbnRNYW5hZ2VtZW50VHlwZSA9IHBhZ2VNYW5pZmVzdFNldHRpbmdzLmdldFZhcmlhbnRNYW5hZ2VtZW50KCk7XG5cdGNvbnN0IGJNYXNzRWRpdFZpc2libGU6IGFueSA9IGdldFZpc2liaWxpdHlNYXNzRWRpdChjb252ZXJ0ZXJDb250ZXh0LCB0YWJsZU1hbmlmZXN0Q29uZmlndXJhdGlvbiwgdGFyZ2V0Q2FwYWJpbGl0aWVzLCBzZWxlY3Rpb25Nb2RlKTtcblx0Y29uc3QgaXNTZWFyY2hhYmxlID0gaXNQYXRoU2VhcmNoYWJsZShjb252ZXJ0ZXJDb250ZXh0LmdldERhdGFNb2RlbE9iamVjdFBhdGgoKSk7XG5cblx0cmV0dXJuIHtcblx0XHRpZDogaWQsXG5cdFx0ZW50aXR5TmFtZTogZW50aXR5U2V0ID8gZW50aXR5U2V0Lm5hbWUgOiBcIlwiLFxuXHRcdGNvbGxlY3Rpb246IGdldFRhcmdldE9iamVjdFBhdGgoY29udmVydGVyQ29udGV4dC5nZXREYXRhTW9kZWxPYmplY3RQYXRoKCkpLFxuXHRcdG5hdmlnYXRpb25QYXRoOiBuYXZpZ2F0aW9uUHJvcGVydHlQYXRoLFxuXHRcdHJvdzogX2dldFJvd0NvbmZpZ3VyYXRpb25Qcm9wZXJ0eShcblx0XHRcdGxpbmVJdGVtQW5ub3RhdGlvbixcblx0XHRcdHZpc3VhbGl6YXRpb25QYXRoLFxuXHRcdFx0Y29udmVydGVyQ29udGV4dCxcblx0XHRcdG5hdmlnYXRpb25TZXR0aW5ncyxcblx0XHRcdG5hdmlnYXRpb25UYXJnZXRQYXRoXG5cdFx0KSxcblx0XHRwMTNuTW9kZTogcDEzbk1vZGUsXG5cdFx0c2hvdzoge1xuXHRcdFx0XCJkZWxldGVcIjogY29tcGlsZUJpbmRpbmcoaXNEZWxldGVCdXR0b25WaXNpYmxlKSxcblx0XHRcdGNyZWF0ZTogY29tcGlsZUJpbmRpbmcoZ2V0Q3JlYXRlVmlzaWJsZShjb252ZXJ0ZXJDb250ZXh0LCBjcmVhdGlvbkJlaGF2aW91cj8ubW9kZSwgaXNJbnNlcnRhYmxlKSksXG5cdFx0XHRwYXN0ZTogY29tcGlsZUJpbmRpbmcoXG5cdFx0XHRcdGdldFBhc3RlRW5hYmxlZChcblx0XHRcdFx0XHRjb252ZXJ0ZXJDb250ZXh0LFxuXHRcdFx0XHRcdGNyZWF0aW9uQmVoYXZpb3VyLFxuXHRcdFx0XHRcdGlzSW5zZXJ0YWJsZSxcblx0XHRcdFx0XHR0YWJsZU1hbmlmZXN0Q29uZmlndXJhdGlvbi5lbmFibGVQYXN0ZSxcblx0XHRcdFx0XHR2aWV3Q29uZmlndXJhdGlvblxuXHRcdFx0XHQpXG5cdFx0XHQpLFxuXHRcdFx0bWFzc0VkaXQ6IHtcblx0XHRcdFx0dmlzaWJsZTogYk1hc3NFZGl0VmlzaWJsZSxcblx0XHRcdFx0ZW5hYmxlZDogZ2V0RW5hYmxlbWVudE1hc3NFZGl0KGNvbnZlcnRlckNvbnRleHQsIGJNYXNzRWRpdFZpc2libGUpXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRkaXNwbGF5TW9kZTogaXNJbkRpc3BsYXlNb2RlKGNvbnZlcnRlckNvbnRleHQsIHZpZXdDb25maWd1cmF0aW9uKSxcblx0XHRjcmVhdGU6IGNyZWF0aW9uQmVoYXZpb3VyLFxuXHRcdHNlbGVjdGlvbk1vZGU6IHNlbGVjdGlvbk1vZGUsXG5cdFx0YXV0b0JpbmRPbkluaXQ6XG5cdFx0XHRjb252ZXJ0ZXJDb250ZXh0LmdldFRlbXBsYXRlVHlwZSgpICE9PSBUZW1wbGF0ZVR5cGUuTGlzdFJlcG9ydCAmJlxuXHRcdFx0Y29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSAhPT0gVGVtcGxhdGVUeXBlLkFuYWx5dGljYWxMaXN0UGFnZSAmJlxuXHRcdFx0ISh2aWV3Q29uZmlndXJhdGlvbiAmJiBjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0V3JhcHBlcigpLmhhc011bHRpcGxlVmlzdWFsaXphdGlvbnModmlld0NvbmZpZ3VyYXRpb24pKSxcblx0XHR2YXJpYW50TWFuYWdlbWVudDogdmFyaWFudE1hbmFnZW1lbnQgPT09IFwiQ29udHJvbFwiICYmICFwMTNuTW9kZSA/IFZhcmlhbnRNYW5hZ2VtZW50VHlwZS5Ob25lIDogdmFyaWFudE1hbmFnZW1lbnQsXG5cdFx0dGhyZXNob2xkOiB0aHJlc2hvbGQsXG5cdFx0c29ydENvbmRpdGlvbnM6IGdldFNvcnRDb25kaXRpb25zKGNvbnZlcnRlckNvbnRleHQsIHByZXNlbnRhdGlvblZhcmlhbnRBbm5vdGF0aW9uLCBjb2x1bW5zKSxcblx0XHRwYXJlbnRFbnRpdHlEZWxldGVFbmFibGVkOiBwYXJlbnRFbnRpdHlTZXREZWxldGFibGUsXG5cdFx0dGl0bGU6IHRpdGxlLFxuXHRcdHNlYXJjaGFibGU6IHRhYmxlTWFuaWZlc3RDb25maWd1cmF0aW9uLnR5cGUgIT09IFwiQW5hbHl0aWNhbFRhYmxlXCIgJiYgIShpc0NvbnN0YW50KGlzU2VhcmNoYWJsZSkgJiYgaXNTZWFyY2hhYmxlLnZhbHVlID09PSBmYWxzZSlcblx0fTtcbn1cblxuZnVuY3Rpb24gX2dldEV4cG9ydERhdGFUeXBlKGRhdGFUeXBlOiBzdHJpbmcsIGlzQ29tcGxleFByb3BlcnR5OiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuXHRsZXQgZXhwb3J0RGF0YVR5cGU6IHN0cmluZyA9IFwiU3RyaW5nXCI7XG5cdGlmIChpc0NvbXBsZXhQcm9wZXJ0eSkge1xuXHRcdHJldHVybiBleHBvcnREYXRhVHlwZTtcblx0fSBlbHNlIHtcblx0XHRzd2l0Y2ggKGRhdGFUeXBlKSB7XG5cdFx0XHRjYXNlIFwiRWRtLkRlY2ltYWxcIjpcblx0XHRcdGNhc2UgXCJFZG0uSW50MzJcIjpcblx0XHRcdGNhc2UgXCJFZG0uSW50NjRcIjpcblx0XHRcdGNhc2UgXCJFZG0uRG91YmxlXCI6XG5cdFx0XHRjYXNlIFwiRWRtLkJ5dGVcIjpcblx0XHRcdFx0ZXhwb3J0RGF0YVR5cGUgPSBcIk51bWJlclwiO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJFZG0uRGF0ZU9mVGltZVwiOlxuXHRcdFx0Y2FzZSBcIkVkbS5EYXRlXCI6XG5cdFx0XHRcdGV4cG9ydERhdGFUeXBlID0gXCJEYXRlXCI7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIkVkbS5EYXRlVGltZU9mZnNldFwiOlxuXHRcdFx0XHRleHBvcnREYXRhVHlwZSA9IFwiRGF0ZVRpbWVcIjtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiRWRtLlRpbWVPZkRheVwiOlxuXHRcdFx0XHRleHBvcnREYXRhVHlwZSA9IFwiVGltZVwiO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJFZG0uQm9vbGVhblwiOlxuXHRcdFx0XHRleHBvcnREYXRhVHlwZSA9IFwiQm9vbGVhblwiO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGV4cG9ydERhdGFUeXBlID0gXCJTdHJpbmdcIjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGV4cG9ydERhdGFUeXBlO1xufVxuXG5mdW5jdGlvbiBpc0luRGlzcGxheU1vZGUoY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCwgdmlld0NvbmZpZ3VyYXRpb24/OiBWaWV3UGF0aENvbmZpZ3VyYXRpb24pOiBib29sZWFuIHtcblx0Y29uc3QgdGVtcGxhdGVUeXBlID0gY29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKTtcblx0aWYgKFxuXHRcdHRlbXBsYXRlVHlwZSA9PT0gVGVtcGxhdGVUeXBlLkxpc3RSZXBvcnQgfHxcblx0XHR0ZW1wbGF0ZVR5cGUgPT09IFRlbXBsYXRlVHlwZS5BbmFseXRpY2FsTGlzdFBhZ2UgfHxcblx0XHQodmlld0NvbmZpZ3VyYXRpb24gJiYgY29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdFdyYXBwZXIoKS5oYXNNdWx0aXBsZVZpc3VhbGl6YXRpb25zKHZpZXdDb25maWd1cmF0aW9uKSlcblx0KSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0Ly8gdXBkYXRhYmxlIHdpbGwgYmUgaGFuZGxlZCBhdCB0aGUgcHJvcGVydHkgbGV2ZWxcblx0cmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIFNwbGl0IHRoZSB2aXN1YWxpemF0aW9uIHBhdGggaW50byB0aGUgbmF2aWdhdGlvbiBwcm9wZXJ0eSBwYXRoIGFuZCBhbm5vdGF0aW9uLlxuICpcbiAqIEBwYXJhbSB2aXN1YWxpemF0aW9uUGF0aFxuICogQHJldHVybnMge29iamVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0UGF0aCh2aXN1YWxpemF0aW9uUGF0aDogc3RyaW5nKSB7XG5cdGxldCBbbmF2aWdhdGlvblByb3BlcnR5UGF0aCwgYW5ub3RhdGlvblBhdGhdID0gdmlzdWFsaXphdGlvblBhdGguc3BsaXQoXCJAXCIpO1xuXG5cdGlmIChuYXZpZ2F0aW9uUHJvcGVydHlQYXRoLmxhc3RJbmRleE9mKFwiL1wiKSA9PT0gbmF2aWdhdGlvblByb3BlcnR5UGF0aC5sZW5ndGggLSAxKSB7XG5cdFx0Ly8gRHJvcCB0cmFpbGluZyBzbGFzaFxuXHRcdG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGggPSBuYXZpZ2F0aW9uUHJvcGVydHlQYXRoLnN1YnN0cigwLCBuYXZpZ2F0aW9uUHJvcGVydHlQYXRoLmxlbmd0aCAtIDEpO1xuXHR9XG5cdHJldHVybiB7IG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGgsIGFubm90YXRpb25QYXRoIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZWxlY3Rpb25WYXJpYW50Q29uZmlndXJhdGlvbihcblx0c2VsZWN0aW9uVmFyaWFudFBhdGg6IHN0cmluZyxcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dFxuKTogU2VsZWN0aW9uVmFyaWFudENvbmZpZ3VyYXRpb24gfCB1bmRlZmluZWQge1xuXHRjb25zdCByZXNvbHZlZFRhcmdldCA9IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5VHlwZUFubm90YXRpb24oc2VsZWN0aW9uVmFyaWFudFBhdGgpO1xuXHRjb25zdCBzZWxlY3Rpb246IFNlbGVjdGlvblZhcmlhbnRUeXBlID0gcmVzb2x2ZWRUYXJnZXQuYW5ub3RhdGlvbiBhcyBTZWxlY3Rpb25WYXJpYW50VHlwZTtcblxuXHRpZiAoc2VsZWN0aW9uKSB7XG5cdFx0Y29uc3QgcHJvcGVydHlOYW1lczogc3RyaW5nW10gPSBbXTtcblx0XHRzZWxlY3Rpb24uU2VsZWN0T3B0aW9ucz8uZm9yRWFjaCgoc2VsZWN0T3B0aW9uOiBTZWxlY3RPcHRpb25UeXBlKSA9PiB7XG5cdFx0XHRjb25zdCBwcm9wZXJ0eU5hbWU6IGFueSA9IHNlbGVjdE9wdGlvbi5Qcm9wZXJ0eU5hbWU7XG5cdFx0XHRjb25zdCBQcm9wZXJ0eVBhdGg6IHN0cmluZyA9IHByb3BlcnR5TmFtZS52YWx1ZTtcblx0XHRcdGlmIChwcm9wZXJ0eU5hbWVzLmluZGV4T2YoUHJvcGVydHlQYXRoKSA9PT0gLTEpIHtcblx0XHRcdFx0cHJvcGVydHlOYW1lcy5wdXNoKFByb3BlcnR5UGF0aCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRleHQ6IHNlbGVjdGlvbj8uVGV4dD8udG9TdHJpbmcoKSxcblx0XHRcdHByb3BlcnR5TmFtZXM6IHByb3BlcnR5TmFtZXNcblx0XHR9O1xuXHR9XG5cdHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUYWJsZU1hbmlmZXN0Q29uZmlndXJhdGlvbihcblx0bGluZUl0ZW1Bbm5vdGF0aW9uOiBMaW5lSXRlbSB8IHVuZGVmaW5lZCxcblx0dmlzdWFsaXphdGlvblBhdGg6IHN0cmluZyxcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCxcblx0Y2hlY2tDb25kZW5zZWRMYXlvdXQ6IGJvb2xlYW4gPSBmYWxzZVxuKTogVGFibGVDb250cm9sQ29uZmlndXJhdGlvbiB7XG5cdGNvbnN0IHRhYmxlTWFuaWZlc3RTZXR0aW5nczogVGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb24gPSBjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0Q29udHJvbENvbmZpZ3VyYXRpb24odmlzdWFsaXphdGlvblBhdGgpO1xuXHRjb25zdCB0YWJsZVNldHRpbmdzID0gKHRhYmxlTWFuaWZlc3RTZXR0aW5ncyAmJiB0YWJsZU1hbmlmZXN0U2V0dGluZ3MudGFibGVTZXR0aW5ncykgfHwge307XG5cdGxldCBxdWlja1NlbGVjdGlvblZhcmlhbnQ6IGFueTtcblx0Y29uc3QgcXVpY2tGaWx0ZXJQYXRoczogeyBhbm5vdGF0aW9uUGF0aDogc3RyaW5nIH1bXSA9IFtdO1xuXHRsZXQgZW5hYmxlRXhwb3J0ID0gdHJ1ZTtcblx0bGV0IGNyZWF0aW9uTW9kZSA9IENyZWF0aW9uTW9kZS5OZXdQYWdlO1xuXHRsZXQgZmlsdGVycztcblx0bGV0IGNyZWF0ZUF0RW5kID0gdHJ1ZTtcblx0bGV0IGRpc2FibGVBZGRSb3dCdXR0b25Gb3JFbXB0eURhdGEgPSBmYWxzZTtcblx0bGV0IGN1c3RvbVZhbGlkYXRpb25GdW5jdGlvbjtcblx0bGV0IGNvbmRlbnNlZFRhYmxlTGF5b3V0ID0gZmFsc2U7XG5cdGxldCBoaWRlVGFibGVUaXRsZSA9IGZhbHNlO1xuXHRsZXQgdGFibGVUeXBlOiBUYWJsZVR5cGUgPSBcIlJlc3BvbnNpdmVUYWJsZVwiO1xuXHRsZXQgZW5hYmxlRnVsbFNjcmVlbiA9IGZhbHNlO1xuXHRsZXQgc2VsZWN0aW9uTGltaXQgPSAyMDA7XG5cdGxldCBtdWx0aVNlbGVjdE1vZGU7XG5cdGNvbnN0IGVuYWJsZUF1dG9Db2x1bW5XaWR0aCA9IHRydWU7XG5cdGxldCBlbmFibGVQYXN0ZSA9IGNvbnZlcnRlckNvbnRleHQuZ2V0VGVtcGxhdGVUeXBlKCkgPT09IFwiT2JqZWN0UGFnZVwiO1xuXHRjb25zdCBpc0NvbmRlbnNlZFRhYmxlTGF5b3V0Q29tcGxpYW50ID0gY2hlY2tDb25kZW5zZWRMYXlvdXQgJiYgY29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdFdyYXBwZXIoKS5pc0NvbmRlbnNlZExheW91dENvbXBsaWFudCgpO1xuXHRjb25zdCBlbnRpdHlUeXBlID0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKCk7XG5cdGNvbnN0IGFnZ3JlZ2F0aW9uSGVscGVyID0gbmV3IEFnZ3JlZ2F0aW9uSGVscGVyKGVudGl0eVR5cGUsIGNvbnZlcnRlckNvbnRleHQpO1xuXHRpZiAobGluZUl0ZW1Bbm5vdGF0aW9uKSB7XG5cdFx0Y29uc3QgdGFyZ2V0RW50aXR5VHlwZSA9IGNvbnZlcnRlckNvbnRleHQuZ2V0QW5ub3RhdGlvbkVudGl0eVR5cGUobGluZUl0ZW1Bbm5vdGF0aW9uKTtcblx0XHR0YWJsZVNldHRpbmdzPy5xdWlja1ZhcmlhbnRTZWxlY3Rpb24/LnBhdGhzPy5mb3JFYWNoKChwYXRoOiB7IGFubm90YXRpb25QYXRoOiBzdHJpbmcgfSkgPT4ge1xuXHRcdFx0cXVpY2tTZWxlY3Rpb25WYXJpYW50ID0gdGFyZ2V0RW50aXR5VHlwZS5yZXNvbHZlUGF0aChcIkBcIiArIHBhdGguYW5ub3RhdGlvblBhdGgpO1xuXHRcdFx0Ly8gcXVpY2tTZWxlY3Rpb25WYXJpYW50ID0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlQW5ub3RhdGlvbihwYXRoLmFubm90YXRpb25QYXRoKTtcblx0XHRcdGlmIChxdWlja1NlbGVjdGlvblZhcmlhbnQpIHtcblx0XHRcdFx0cXVpY2tGaWx0ZXJQYXRocy5wdXNoKHsgYW5ub3RhdGlvblBhdGg6IHBhdGguYW5ub3RhdGlvblBhdGggfSk7XG5cdFx0XHR9XG5cdFx0XHRmaWx0ZXJzID0ge1xuXHRcdFx0XHRxdWlja0ZpbHRlcnM6IHtcblx0XHRcdFx0XHRlbmFibGVkOlxuXHRcdFx0XHRcdFx0Y29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSA9PT0gVGVtcGxhdGVUeXBlLkxpc3RSZXBvcnRcblx0XHRcdFx0XHRcdFx0PyBcIns9ICR7cGFnZUludGVybmFsPmhhc1BlbmRpbmdGaWx0ZXJzfSAhPT0gdHJ1ZX1cIlxuXHRcdFx0XHRcdFx0XHQ6IHRydWUsXG5cdFx0XHRcdFx0c2hvd0NvdW50czogdGFibGVTZXR0aW5ncz8ucXVpY2tWYXJpYW50U2VsZWN0aW9uPy5zaG93Q291bnRzLFxuXHRcdFx0XHRcdHBhdGhzOiBxdWlja0ZpbHRlclBhdGhzXG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fSk7XG5cdFx0Y3JlYXRpb25Nb2RlID0gdGFibGVTZXR0aW5ncy5jcmVhdGlvbk1vZGU/Lm5hbWUgfHwgY3JlYXRpb25Nb2RlO1xuXHRcdGNyZWF0ZUF0RW5kID0gdGFibGVTZXR0aW5ncy5jcmVhdGlvbk1vZGU/LmNyZWF0ZUF0RW5kICE9PSB1bmRlZmluZWQgPyB0YWJsZVNldHRpbmdzLmNyZWF0aW9uTW9kZT8uY3JlYXRlQXRFbmQgOiB0cnVlO1xuXHRcdGN1c3RvbVZhbGlkYXRpb25GdW5jdGlvbiA9IHRhYmxlU2V0dGluZ3MuY3JlYXRpb25Nb2RlPy5jdXN0b21WYWxpZGF0aW9uRnVuY3Rpb247XG5cdFx0Ly8gaWYgYSBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbiBpcyBwcm92aWRlZCwgZGlzYWJsZUFkZFJvd0J1dHRvbkZvckVtcHR5RGF0YSBzaG91bGQgbm90IGJlIGNvbnNpZGVyZWQsIGkuZS4gc2V0IHRvIGZhbHNlXG5cdFx0ZGlzYWJsZUFkZFJvd0J1dHRvbkZvckVtcHR5RGF0YSA9ICFjdXN0b21WYWxpZGF0aW9uRnVuY3Rpb24gPyAhIXRhYmxlU2V0dGluZ3MuY3JlYXRpb25Nb2RlPy5kaXNhYmxlQWRkUm93QnV0dG9uRm9yRW1wdHlEYXRhIDogZmFsc2U7XG5cdFx0Y29uZGVuc2VkVGFibGVMYXlvdXQgPSB0YWJsZVNldHRpbmdzLmNvbmRlbnNlZFRhYmxlTGF5b3V0ICE9PSB1bmRlZmluZWQgPyB0YWJsZVNldHRpbmdzLmNvbmRlbnNlZFRhYmxlTGF5b3V0IDogZmFsc2U7XG5cdFx0aGlkZVRhYmxlVGl0bGUgPSAhIXRhYmxlU2V0dGluZ3MucXVpY2tWYXJpYW50U2VsZWN0aW9uPy5oaWRlVGFibGVUaXRsZTtcblx0XHR0YWJsZVR5cGUgPSB0YWJsZVNldHRpbmdzPy50eXBlIHx8IFwiUmVzcG9uc2l2ZVRhYmxlXCI7XG5cdFx0aWYgKGNvbnZlcnRlckNvbnRleHQuZ2V0VGVtcGxhdGVUeXBlKCkgIT09IFwiT2JqZWN0UGFnZVwiKSB7XG5cdFx0XHRpZiAodGFibGVTZXR0aW5ncz8udHlwZSA9PT0gXCJBbmFseXRpY2FsVGFibGVcIiAmJiAhYWdncmVnYXRpb25IZWxwZXIuaXNBbmFseXRpY3NTdXBwb3J0ZWQoKSkge1xuXHRcdFx0XHR0YWJsZVR5cGUgPSBcIkdyaWRUYWJsZVwiO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCF0YWJsZVNldHRpbmdzPy50eXBlKSB7XG5cdFx0XHRcdGlmIChjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0V3JhcHBlcigpLmlzRGVza3RvcCgpICYmIGFnZ3JlZ2F0aW9uSGVscGVyLmlzQW5hbHl0aWNzU3VwcG9ydGVkKCkpIHtcblx0XHRcdFx0XHR0YWJsZVR5cGUgPSBcIkFuYWx5dGljYWxUYWJsZVwiO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRhYmxlVHlwZSA9IFwiUmVzcG9uc2l2ZVRhYmxlXCI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0ZW5hYmxlRnVsbFNjcmVlbiA9IHRhYmxlU2V0dGluZ3MuZW5hYmxlRnVsbFNjcmVlbiB8fCBmYWxzZTtcblx0XHRpZiAoZW5hYmxlRnVsbFNjcmVlbiA9PT0gdHJ1ZSAmJiBjb252ZXJ0ZXJDb250ZXh0LmdldFRlbXBsYXRlVHlwZSgpID09PSBUZW1wbGF0ZVR5cGUuTGlzdFJlcG9ydCkge1xuXHRcdFx0ZW5hYmxlRnVsbFNjcmVlbiA9IGZhbHNlO1xuXHRcdFx0Y29udmVydGVyQ29udGV4dFxuXHRcdFx0XHQuZ2V0RGlhZ25vc3RpY3MoKVxuXHRcdFx0XHQuYWRkSXNzdWUoSXNzdWVDYXRlZ29yeS5NYW5pZmVzdCwgSXNzdWVTZXZlcml0eS5Mb3csIElzc3VlVHlwZS5GVUxMU0NSRUVOTU9ERV9OT1RfT05fTElTVFJFUE9SVCk7XG5cdFx0fVxuXHRcdHNlbGVjdGlvbkxpbWl0ID0gdGFibGVTZXR0aW5ncy5zZWxlY3RBbGwgPT09IHRydWUgfHwgdGFibGVTZXR0aW5ncy5zZWxlY3Rpb25MaW1pdCA9PT0gMCA/IDAgOiB0YWJsZVNldHRpbmdzLnNlbGVjdGlvbkxpbWl0IHx8IDIwMDtcblx0XHRpZiAodGFibGVUeXBlID09PSBcIlJlc3BvbnNpdmVUYWJsZVwiKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdGNvbnZlcnRlckNvbnRleHQuZ2V0VGVtcGxhdGVUeXBlKCkgPT09IFRlbXBsYXRlVHlwZS5MaXN0UmVwb3J0IHx8XG5cdFx0XHRcdGNvbnZlcnRlckNvbnRleHQuZ2V0VGVtcGxhdGVUeXBlKCkgPT09IFRlbXBsYXRlVHlwZS5BbmFseXRpY2FsTGlzdFBhZ2Vcblx0XHRcdCkge1xuXHRcdFx0XHRtdWx0aVNlbGVjdE1vZGUgPSAhIXRhYmxlU2V0dGluZ3Muc2VsZWN0QWxsID8gXCJEZWZhdWx0XCIgOiBcIkNsZWFyQWxsXCI7XG5cdFx0XHR9XG5cdFx0XHRpZiAoY29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSA9PT0gVGVtcGxhdGVUeXBlLk9iamVjdFBhZ2UpIHtcblx0XHRcdFx0aWYgKGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RXcmFwcGVyKCkudXNlSWNvblRhYkJhcigpKSB7XG5cdFx0XHRcdFx0bXVsdGlTZWxlY3RNb2RlID0gISF0YWJsZVNldHRpbmdzLnNlbGVjdEFsbCA/IFwiRGVmYXVsdFwiIDogXCJDbGVhckFsbFwiO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG11bHRpU2VsZWN0TW9kZSA9IHRhYmxlU2V0dGluZ3Muc2VsZWN0QWxsID09PSBmYWxzZSA/IFwiQ2xlYXJBbGxcIiA6IFwiRGVmYXVsdFwiO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVuYWJsZVBhc3RlID0gY29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSA9PT0gXCJPYmplY3RQYWdlXCIgJiYgdGFibGVTZXR0aW5ncy5lbmFibGVQYXN0ZSAhPT0gZmFsc2U7XG5cdFx0ZW5hYmxlRXhwb3J0ID1cblx0XHRcdHRhYmxlU2V0dGluZ3MuZW5hYmxlRXhwb3J0ICE9PSB1bmRlZmluZWRcblx0XHRcdFx0PyB0YWJsZVNldHRpbmdzLmVuYWJsZUV4cG9ydFxuXHRcdFx0XHQ6IGNvbnZlcnRlckNvbnRleHQuZ2V0VGVtcGxhdGVUeXBlKCkgIT09IFwiT2JqZWN0UGFnZVwiIHx8IGVuYWJsZVBhc3RlO1xuXHR9XG5cdHJldHVybiB7XG5cdFx0ZmlsdGVyczogZmlsdGVycyxcblx0XHR0eXBlOiB0YWJsZVR5cGUsXG5cdFx0ZW5hYmxlRnVsbFNjcmVlbjogZW5hYmxlRnVsbFNjcmVlbixcblx0XHRoZWFkZXJWaXNpYmxlOiAhKHF1aWNrU2VsZWN0aW9uVmFyaWFudCAmJiBoaWRlVGFibGVUaXRsZSksXG5cdFx0ZW5hYmxlRXhwb3J0OiBlbmFibGVFeHBvcnQsXG5cdFx0Y3JlYXRpb25Nb2RlOiBjcmVhdGlvbk1vZGUsXG5cdFx0Y3JlYXRlQXRFbmQ6IGNyZWF0ZUF0RW5kLFxuXHRcdGRpc2FibGVBZGRSb3dCdXR0b25Gb3JFbXB0eURhdGE6IGRpc2FibGVBZGRSb3dCdXR0b25Gb3JFbXB0eURhdGEsXG5cdFx0Y3VzdG9tVmFsaWRhdGlvbkZ1bmN0aW9uOiBjdXN0b21WYWxpZGF0aW9uRnVuY3Rpb24sXG5cdFx0dXNlQ29uZGVuc2VkVGFibGVMYXlvdXQ6IGNvbmRlbnNlZFRhYmxlTGF5b3V0ICYmIGlzQ29uZGVuc2VkVGFibGVMYXlvdXRDb21wbGlhbnQsXG5cdFx0c2VsZWN0aW9uTGltaXQ6IHNlbGVjdGlvbkxpbWl0LFxuXHRcdG11bHRpU2VsZWN0TW9kZTogbXVsdGlTZWxlY3RNb2RlLFxuXHRcdGVuYWJsZVBhc3RlOiBlbmFibGVQYXN0ZSxcblx0XHRzaG93Um93Q291bnQ6XG5cdFx0XHQhdGFibGVTZXR0aW5ncz8ucXVpY2tWYXJpYW50U2VsZWN0aW9uPy5zaG93Q291bnRzICYmICFjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0V3JhcHBlcigpLmdldFZpZXdDb25maWd1cmF0aW9uKCk/LnNob3dDb3VudHMsXG5cdFx0ZW5hYmxlTWFzc0VkaXQ6IHRhYmxlU2V0dGluZ3M/LmVuYWJsZU1hc3NFZGl0LFxuXHRcdGVuYWJsZUF1dG9Db2x1bW5XaWR0aDogZW5hYmxlQXV0b0NvbHVtbldpZHRoXG5cdH07XG59XG4iXX0=