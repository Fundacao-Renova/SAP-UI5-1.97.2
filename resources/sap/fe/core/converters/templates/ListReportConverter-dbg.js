/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["../ManifestSettings", "../controls/Common/DataVisualization", "../helpers/ID", "sap/fe/core/converters/controls/Common/Action", "sap/fe/core/converters/helpers/ConfigurableObject", "sap/fe/core/helpers/BindingExpression", "../controls/Common/KPI", "sap/fe/core/converters/controls/ListReport/FilterBar"], function (ManifestSettings, DataVisualization, ID, Action, ConfigurableObject, BindingExpression, KPI, FilterBar) {
  "use strict";

  var _exports = {};
  var getFilterBarhideBasicSearch = FilterBar.getFilterBarhideBasicSearch;
  var getManifestFilterFields = FilterBar.getManifestFilterFields;
  var getSelectionFields = FilterBar.getSelectionFields;
  var getKPIDefinitions = KPI.getKPIDefinitions;
  var compileBinding = BindingExpression.compileBinding;
  var annotationExpression = BindingExpression.annotationExpression;
  var insertCustomElements = ConfigurableObject.insertCustomElements;
  var getActionsFromManifest = Action.getActionsFromManifest;
  var IconTabBarID = ID.IconTabBarID;
  var ChartID = ID.ChartID;
  var TableID = ID.TableID;
  var FilterVariantManagementID = ID.FilterVariantManagementID;
  var FilterBarID = ID.FilterBarID;
  var CustomTabID = ID.CustomTabID;
  var isSelectionPresentationCompliant = DataVisualization.isSelectionPresentationCompliant;
  var getSelectionVariant = DataVisualization.getSelectionVariant;
  var isPresentationCompliant = DataVisualization.isPresentationCompliant;
  var getSelectionPresentationVariant = DataVisualization.getSelectionPresentationVariant;
  var getDefaultPresentationVariant = DataVisualization.getDefaultPresentationVariant;
  var getDefaultLineItem = DataVisualization.getDefaultLineItem;
  var getDefaultChart = DataVisualization.getDefaultChart;
  var getDataVisualizationConfiguration = DataVisualization.getDataVisualizationConfiguration;
  var VariantManagementType = ManifestSettings.VariantManagementType;
  var TemplateType = ManifestSettings.TemplateType;
  var VisualizationType = ManifestSettings.VisualizationType;

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function () {}; return { s: F, n: function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function (e) { throw e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function () { it = it.call(o); }, n: function () { var step = it.next(); normalCompletion = step.done; return step; }, e: function (e) { didErr = true; err = e; }, f: function () { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  /**
   * Retrieves all list report tables.
   * @param {ListReportViewDefinition[]} views The list report views configured in the manifest
   * @returns {TableVisualization[]} The list report table
   */
  function getTableVisualizations(views) {
    var tables = [];
    views.forEach(function (view) {
      if (!view.type) {
        var visualizations = view.secondaryVisualization ? view.secondaryVisualization.visualizations : view.presentation.visualizations;
        visualizations.forEach(function (visualization) {
          if (visualization.type === VisualizationType.Table) {
            tables.push(visualization);
          }
        });
      }
    });
    return tables;
  }

  function getChartVisualizations(views) {
    var charts = [];
    views.forEach(function (view) {
      if (!view.type) {
        var visualizations = view.primaryVisualization ? view.primaryVisualization.visualizations : view.presentation.visualizations;
        visualizations.forEach(function (visualization) {
          if (visualization.type === VisualizationType.Chart) {
            charts.push(visualization);
          }
        });
      }
    });
    return charts;
  }

  var getDefaultSemanticDates = function (filterFields) {
    var defaultSemanticDates = {};

    for (var filterField in filterFields) {
      var _filterFields$filterF, _filterFields$filterF2, _filterFields$filterF3;

      if ((_filterFields$filterF = filterFields[filterField]) !== null && _filterFields$filterF !== void 0 && (_filterFields$filterF2 = _filterFields$filterF.settings) !== null && _filterFields$filterF2 !== void 0 && (_filterFields$filterF3 = _filterFields$filterF2.defaultValues) !== null && _filterFields$filterF3 !== void 0 && _filterFields$filterF3.length) {
        var _filterFields$filterF4, _filterFields$filterF5;

        defaultSemanticDates[filterField] = (_filterFields$filterF4 = filterFields[filterField]) === null || _filterFields$filterF4 === void 0 ? void 0 : (_filterFields$filterF5 = _filterFields$filterF4.settings) === null || _filterFields$filterF5 === void 0 ? void 0 : _filterFields$filterF5.defaultValues;
      }
    }

    return defaultSemanticDates;
  };
  /**
   * Find a visualization annotation that can be used for rendering the list report.
   *
   * @param {EntityType} entityType The current EntityType
   * @param converterContext
   * @param bIsALP
   * @returns {LineItem | PresentationVariantTypeTypes | undefined} A compliant annotation for rendering the list report
   */


  function getCompliantVisualizationAnnotation(entityType, converterContext, bIsALP) {
    var annotationPath = converterContext.getManifestWrapper().getDefaultTemplateAnnotationPath();
    var selectionPresentationVariant = getSelectionPresentationVariant(entityType, annotationPath, converterContext);

    if (annotationPath && selectionPresentationVariant) {
      var _presentationVariant = selectionPresentationVariant.PresentationVariant;

      if (!_presentationVariant) {
        throw new Error("Presentation Variant is not configured in the SPV mentioned in the manifest");
      }

      var bPVComplaint = isPresentationCompliant(selectionPresentationVariant.PresentationVariant);

      if (!bPVComplaint) {
        return undefined;
      }

      if (isSelectionPresentationCompliant(selectionPresentationVariant, bIsALP)) {
        return selectionPresentationVariant;
      }
    }

    if (selectionPresentationVariant) {
      if (isSelectionPresentationCompliant(selectionPresentationVariant, bIsALP)) {
        return selectionPresentationVariant;
      }
    }

    var presentationVariant = getDefaultPresentationVariant(entityType);

    if (presentationVariant) {
      if (isPresentationCompliant(presentationVariant, bIsALP)) {
        return presentationVariant;
      }
    }

    if (!bIsALP) {
      var defaultLineItem = getDefaultLineItem(entityType);

      if (defaultLineItem) {
        return defaultLineItem;
      }
    }

    return undefined;
  }

  var getView = function (viewConverterConfiguration) {
    var config = viewConverterConfiguration;

    if (config.converterContext) {
      var _presentation, _presentation$visuali;

      var converterContext = config.converterContext;
      config = config;
      var presentation = getDataVisualizationConfiguration(config.annotation ? converterContext.getRelativeAnnotationPath(config.annotation.fullyQualifiedName, converterContext.getEntityType()) : "", true, converterContext, config);
      var tableControlId = "";
      var chartControlId = "";
      var title = "";
      var selectionVariantPath = "";

      var isMultipleViewConfiguration = function (config) {
        return config.key !== undefined;
      };

      var createVisualization = function (presentation, isPrimary) {
        var defaultVisualization;

        var _iterator = _createForOfIteratorHelper(presentation.visualizations),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var visualization = _step.value;

            if (isPrimary && visualization.type === VisualizationType.Chart) {
              defaultVisualization = visualization;
              break;
            }

            if (!isPrimary && visualization.type === VisualizationType.Table) {
              defaultVisualization = visualization;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var presentationCreated = Object.assign({}, presentation);

        if (defaultVisualization) {
          presentationCreated.visualizations = [defaultVisualization];
        }

        return presentationCreated;
      };

      var getPresentation = function (item) {
        var resolvedTarget = converterContext.getEntityTypeAnnotation(item.annotationPath);
        var targetAnnotation = resolvedTarget.annotation;
        converterContext = resolvedTarget.converterContext;
        var annotation = targetAnnotation;
        presentation = getDataVisualizationConfiguration(annotation ? converterContext.getRelativeAnnotationPath(annotation.fullyQualifiedName, converterContext.getEntityType()) : "", true, converterContext, config);
        return presentation;
      };

      var createAlpView = function (presentations, defaultPath) {
        var primaryVisualization = createVisualization(presentations[0], true);
        chartControlId = (primaryVisualization === null || primaryVisualization === void 0 ? void 0 : primaryVisualization.visualizations[0]).id;
        var secondaryVisualization = createVisualization(presentations[1] ? presentations[1] : presentations[0]);
        tableControlId = (secondaryVisualization === null || secondaryVisualization === void 0 ? void 0 : secondaryVisualization.visualizations[0]).annotation.id;

        if (primaryVisualization && secondaryVisualization) {
          var view = {
            primaryVisualization: primaryVisualization,
            secondaryVisualization: secondaryVisualization,
            tableControlId: tableControlId,
            chartControlId: chartControlId,
            defaultPath: defaultPath
          };
          return view;
        }
      };

      if (((_presentation = presentation) === null || _presentation === void 0 ? void 0 : (_presentation$visuali = _presentation.visualizations) === null || _presentation$visuali === void 0 ? void 0 : _presentation$visuali.length) === 2 && converterContext.getTemplateType() === TemplateType.AnalyticalListPage) {
        var view = createAlpView([presentation], "both");

        if (view) {
          return view;
        }
      } else if (converterContext.getManifestWrapper().hasMultipleVisualizations(config) || converterContext.getTemplateType() === TemplateType.AnalyticalListPage) {
        var _ref = config,
            primary = _ref.primary,
            secondary = _ref.secondary;

        if (primary && primary.length && secondary && secondary.length) {
          var _view = createAlpView([getPresentation(primary[0]), getPresentation(secondary[0])], config.defaultPath);

          if (_view) {
            return _view;
          }
        } else {
          throw new Error("SecondaryItems in the Views is not present");
        }
      } else if (isMultipleViewConfiguration(config)) {
        // key exists only on multi tables mode
        var resolvedTarget = converterContext.getEntityTypeAnnotation(config.annotationPath);
        var viewAnnotation = resolvedTarget.annotation;
        converterContext = resolvedTarget.converterContext;
        title = compileBinding(annotationExpression(viewAnnotation.Text)); // Need to loop on table into views since multi table mode get specific configuration (hidden filters or Table Id)

        presentation.visualizations.forEach(function (visualizationDefinition, index) {
          switch (visualizationDefinition.type) {
            case VisualizationType.Table:
              var tableVisualization = presentation.visualizations[index];
              var filters = tableVisualization.control.filters || {};
              filters.hiddenFilters = filters.hiddenFilters || {
                paths: []
              };

              if (!config.keepPreviousPresonalization) {
                // Need to override Table Id to match with Tab Key (currently only table is managed in multiple view mode)
                tableVisualization.annotation.id = TableID(config.key || "", "LineItem");
              }

              config = config;

              if (config && config.annotation && config.annotation.term === "com.sap.vocabularies.UI.v1.SelectionPresentationVariant") {
                selectionVariantPath = config.annotation.SelectionVariant.fullyQualifiedName.split("@")[1];
              } else {
                selectionVariantPath = config.annotationPath;
              } //Provide Selection Variant to hiddenFilters in order to set the SV filters to the table.
              //MDC Table overrides binding Filter and from SAP FE the only method where we are able to add
              //additional filter is 'rebindTable' into Table delegate.
              //To avoid implementing specific LR feature to SAP FE Macro Table, the filter(s) related to the Tab (multi table mode)
              //can be passed to macro table via parameter/context named filters and key hiddenFilters.


              filters.hiddenFilters.paths.push({
                annotationPath: selectionVariantPath
              });
              tableVisualization.control.filters = filters;
              break;

            case VisualizationType.Chart:
              var chartVisualization = presentation.visualizations[index];
              chartVisualization.id = ChartID(config.key || "", "Chart");
              break;

            default:
              break;
          }
        });
      }

      presentation.visualizations.forEach(function (visualizationDefinition) {
        if (visualizationDefinition.type === VisualizationType.Table) {
          tableControlId = visualizationDefinition.annotation.id;
        } else if (visualizationDefinition.type === VisualizationType.Chart) {
          chartControlId = visualizationDefinition.id;
        }
      });
      return {
        presentation: presentation,
        tableControlId: tableControlId,
        chartControlId: chartControlId,
        title: title,
        selectionVariantPath: selectionVariantPath
      };
    } else {
      config = config;
      var _title = config.label,
          fragment = config.template,
          type = config.type,
          customTabId = CustomTabID(config.key || "");
      return {
        title: _title,
        fragment: fragment,
        type: type,
        customTabId: customTabId
      };
    }
  };

  var getViews = function (converterContext, settingsViews) {
    var viewConverterConfigs = [];

    if (settingsViews) {
      settingsViews.paths.forEach(function (path) {
        if (converterContext.getManifestWrapper().hasMultipleVisualizations(path)) {
          if (settingsViews.paths.length > 1) {
            throw new Error("ALP flavor cannot have multiple views");
          } else {
            path = path;
            viewConverterConfigs.push({
              converterContext: converterContext,
              primary: path.primary,
              secondary: path.secondary,
              defaultPath: path.defaultPath
            });
          }
        } else if (path.template) {
          path = path;
          viewConverterConfigs.push({
            key: path.key,
            label: path.label,
            template: path.template,
            type: "Custom"
          });
        } else {
          path = path;
          var manifestWrapper = converterContext.getManifestWrapper(),
              viewConverterContext = converterContext.getConverterContextFor(path.contextPath || path.entitySet && "/" + path.entitySet || converterContext.getContextPath()),
              entityType = viewConverterContext.getEntityType();

          if (entityType && viewConverterContext) {
            var annotationPath = manifestWrapper.getDefaultTemplateAnnotationPath();
            var annotation;
            var resolvedTarget = viewConverterContext.getEntityTypeAnnotation(path.annotationPath);
            var targetAnnotation = resolvedTarget.annotation;
            var resolvedTargetconverterContext = resolvedTarget.converterContext;

            if (targetAnnotation) {
              if (targetAnnotation.term === "com.sap.vocabularies.UI.v1.SelectionVariant") {
                if (annotationPath) {
                  annotation = getSelectionPresentationVariant(viewConverterContext.getEntityType(), annotationPath, resolvedTargetconverterContext);
                } else {
                  annotation = getDefaultLineItem(viewConverterContext.getEntityType());
                }
              } else {
                annotation = targetAnnotation;
              }

              viewConverterConfigs.push({
                converterContext: viewConverterContext,
                annotation: annotation,
                annotationPath: path.annotationPath,
                keepPreviousPresonalization: path.keepPreviousPresonalization,
                key: path.key
              });
            }
          } else {// TODO Diagnostics message
          }
        }
      });
    } else {
      var entityType = converterContext.getEntityType();

      if (converterContext.getTemplateType() === TemplateType.AnalyticalListPage) {
        viewConverterConfigs = getAlpViewConfig(converterContext, viewConverterConfigs);
      } else {
        viewConverterConfigs.push({
          annotation: getCompliantVisualizationAnnotation(entityType, converterContext, false),
          converterContext: converterContext
        });
      }
    }

    return viewConverterConfigs.map(function (viewConverterConfig) {
      return getView(viewConverterConfig);
    });
  };

  function getAlpViewConfig(converterContext, viewConfigs) {
    var entityType = converterContext.getEntityType();
    var annotation = getCompliantVisualizationAnnotation(entityType, converterContext, true);
    var chart, table;

    if (annotation) {
      viewConfigs.push({
        annotation: annotation,
        converterContext: converterContext
      });
    } else {
      chart = getDefaultChart(entityType);
      table = getDefaultLineItem(entityType);

      if (chart && table) {
        var primary = [{
          annotationPath: chart.term
        }];
        var secondary = [{
          annotationPath: table.term
        }];
        viewConfigs.push({
          converterContext: converterContext,
          primary: primary,
          secondary: secondary,
          defaultPath: "both"
        });
      }
    }

    return viewConfigs;
  }

  var getHeaderActions = function (converterContext) {
    var manifestWrapper = converterContext.getManifestWrapper();
    return insertCustomElements([], getActionsFromManifest(manifestWrapper.getHeaderActions(), converterContext));
  };

  _exports.getHeaderActions = getHeaderActions;

  var checkChartFilterBarId = function (views, filterBarId) {
    views.forEach(function (view) {
      if (!view.type) {
        var presentation = view.presentation;
        presentation.visualizations.forEach(function (visualizationDefinition) {
          if (visualizationDefinition.type === VisualizationType.Chart && visualizationDefinition.filterId !== filterBarId) {
            visualizationDefinition.filterId = filterBarId;
          }
        });
      }
    });
  };
  /**
   * Creates the ListReportDefinition for multiple entity sets (multiple table mode).
   *
   * @param converterContext The converter context
   * @returns {ListReportDefinition} The list report definition based on annotation + manifest
   */


  _exports.checkChartFilterBarId = checkChartFilterBarId;

  var convertPage = function (converterContext) {
    var entityType = converterContext.getEntityType();
    var sContextPath = converterContext.getContextPath();

    if (!sContextPath) {
      // If we don't have an entitySet at this point we have an issue I'd say
      throw new Error("An EntitySet is required to be able to display a ListReport, please adjust your `entitySet` property to point to one.");
    }

    var manifestWrapper = converterContext.getManifestWrapper();
    var viewsDefinition = manifestWrapper.getViewConfiguration();
    var hasMultipleEntitySets = manifestWrapper.hasMultipleEntitySets();
    var views = getViews(converterContext, viewsDefinition);
    var showTabCounts = viewsDefinition ? (viewsDefinition === null || viewsDefinition === void 0 ? void 0 : viewsDefinition.showCounts) || hasMultipleEntitySets : undefined; // with multi EntitySets, tab counts are displayed by default

    var lrTableVisualizations = getTableVisualizations(views);
    var lrChartVisualizations = getChartVisualizations(views);
    var showPinnableToggle = lrTableVisualizations.some(function (table) {
      return table.control.type === "ResponsiveTable";
    });
    var singleTableId = "";
    var singleChartId = "";
    var filterBarId = FilterBarID(sContextPath);
    var filterVariantManagementID = FilterVariantManagementID(filterBarId);
    var fbConfig = manifestWrapper.getFilterConfiguration();
    var filterInitialLayout = (fbConfig === null || fbConfig === void 0 ? void 0 : fbConfig.initialLayout) !== undefined ? fbConfig === null || fbConfig === void 0 ? void 0 : fbConfig.initialLayout.toLowerCase() : "compact";
    var filterLayout = (fbConfig === null || fbConfig === void 0 ? void 0 : fbConfig.layout) !== undefined ? fbConfig === null || fbConfig === void 0 ? void 0 : fbConfig.layout.toLowerCase() : "compact";
    var useSemanticDateRange = fbConfig.useSemanticDateRange !== undefined ? fbConfig.useSemanticDateRange : true;
    var oConfig = getContentAreaId(converterContext, views);

    if (oConfig) {
      singleChartId = oConfig.chartId;
      singleTableId = oConfig.tableId;
    }

    var selectionFields = getSelectionFields(converterContext, lrTableVisualizations);
    var hideBasicSearch = getFilterBarhideBasicSearch(lrTableVisualizations, converterContext);
    var selectionVariant = getSelectionVariant(entityType, converterContext);
    var defaultSemanticDates = useSemanticDateRange ? getDefaultSemanticDates(getManifestFilterFields(entityType, converterContext)) : {}; // Sort header actions according to position attributes in manifest

    var headerActions = getHeaderActions(converterContext);
    var hasMultiVisualizations = manifestWrapper.hasMultipleVisualizations() || converterContext.getTemplateType() === TemplateType.AnalyticalListPage;

    if (hasMultipleEntitySets) {
      checkChartFilterBarId(views, filterBarId);
    }

    var visualizationIds = lrTableVisualizations.map(function (visualization) {
      return visualization.annotation.id;
    }).concat(lrChartVisualizations.map(function (visualization) {
      return visualization.id;
    }));
    var targetControlIds = [filterBarId].concat(_toConsumableArray(manifestWrapper.getVariantManagement() !== VariantManagementType.Control ? visualizationIds : []), _toConsumableArray(!hasMultiVisualizations && views.length > 1 ? [IconTabBarID()] : []));
    return {
      mainEntitySet: sContextPath,
      mainEntityType: sContextPath + "/",
      singleTableId: singleTableId,
      singleChartId: singleChartId,
      showTabCounts: showTabCounts,
      headerActions: headerActions,
      showPinnableToggle: showPinnableToggle,
      filterBar: {
        selectionFields: selectionFields,
        hideBasicSearch: hideBasicSearch
      },
      views: views,
      filterBarId: filterBarId,
      filterConditions: {
        selectionVariant: selectionVariant,
        defaultSemanticDates: defaultSemanticDates
      },
      variantManagement: {
        id: filterVariantManagementID,
        targetControlIds: targetControlIds.join(",")
      },
      isMultiEntitySets: hasMultipleEntitySets,
      hasMultiVisualizations: hasMultiVisualizations,
      templateType: manifestWrapper.getTemplateType(),
      useSemanticDateRange: useSemanticDateRange,
      filterInitialLayout: filterInitialLayout,
      filterLayout: filterLayout,
      kpiDefinitions: getKPIDefinitions(converterContext)
    };
  };

  _exports.convertPage = convertPage;

  function getContentAreaId(converterContext, views) {
    var singleTableId = "",
        singleChartId = "";

    if (converterContext.getManifestWrapper().hasMultipleVisualizations() || converterContext.getTemplateType() === TemplateType.AnalyticalListPage) {
      var _iterator2 = _createForOfIteratorHelper(views),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var view = _step2.value;
          view = view;

          if (view.chartControlId && view.tableControlId) {
            singleChartId = view.chartControlId;
            singleTableId = view.tableControlId;
            break;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    } else {
      var _iterator3 = _createForOfIteratorHelper(views),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _view2 = _step3.value;
          _view2 = _view2;

          if (!singleTableId && _view2.tableControlId) {
            singleTableId = _view2.tableControlId || "";
          }

          if (!singleChartId && _view2.chartControlId) {
            singleChartId = _view2.chartControlId || "";
          }

          if (singleChartId && singleTableId) {
            break;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }

    if (singleTableId || singleChartId) {
      return {
        chartId: singleChartId,
        tableId: singleTableId
      };
    }

    return undefined;
  }

  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxpc3RSZXBvcnRDb252ZXJ0ZXIudHMiXSwibmFtZXMiOlsiZ2V0VGFibGVWaXN1YWxpemF0aW9ucyIsInZpZXdzIiwidGFibGVzIiwiZm9yRWFjaCIsInZpZXciLCJ0eXBlIiwidmlzdWFsaXphdGlvbnMiLCJzZWNvbmRhcnlWaXN1YWxpemF0aW9uIiwicHJlc2VudGF0aW9uIiwidmlzdWFsaXphdGlvbiIsIlZpc3VhbGl6YXRpb25UeXBlIiwiVGFibGUiLCJwdXNoIiwiZ2V0Q2hhcnRWaXN1YWxpemF0aW9ucyIsImNoYXJ0cyIsInByaW1hcnlWaXN1YWxpemF0aW9uIiwiQ2hhcnQiLCJnZXREZWZhdWx0U2VtYW50aWNEYXRlcyIsImZpbHRlckZpZWxkcyIsImRlZmF1bHRTZW1hbnRpY0RhdGVzIiwiZmlsdGVyRmllbGQiLCJzZXR0aW5ncyIsImRlZmF1bHRWYWx1ZXMiLCJsZW5ndGgiLCJnZXRDb21wbGlhbnRWaXN1YWxpemF0aW9uQW5ub3RhdGlvbiIsImVudGl0eVR5cGUiLCJjb252ZXJ0ZXJDb250ZXh0IiwiYklzQUxQIiwiYW5ub3RhdGlvblBhdGgiLCJnZXRNYW5pZmVzdFdyYXBwZXIiLCJnZXREZWZhdWx0VGVtcGxhdGVBbm5vdGF0aW9uUGF0aCIsInNlbGVjdGlvblByZXNlbnRhdGlvblZhcmlhbnQiLCJnZXRTZWxlY3Rpb25QcmVzZW50YXRpb25WYXJpYW50IiwicHJlc2VudGF0aW9uVmFyaWFudCIsIlByZXNlbnRhdGlvblZhcmlhbnQiLCJFcnJvciIsImJQVkNvbXBsYWludCIsImlzUHJlc2VudGF0aW9uQ29tcGxpYW50IiwidW5kZWZpbmVkIiwiaXNTZWxlY3Rpb25QcmVzZW50YXRpb25Db21wbGlhbnQiLCJnZXREZWZhdWx0UHJlc2VudGF0aW9uVmFyaWFudCIsImRlZmF1bHRMaW5lSXRlbSIsImdldERlZmF1bHRMaW5lSXRlbSIsImdldFZpZXciLCJ2aWV3Q29udmVydGVyQ29uZmlndXJhdGlvbiIsImNvbmZpZyIsImdldERhdGFWaXN1YWxpemF0aW9uQ29uZmlndXJhdGlvbiIsImFubm90YXRpb24iLCJnZXRSZWxhdGl2ZUFubm90YXRpb25QYXRoIiwiZnVsbHlRdWFsaWZpZWROYW1lIiwiZ2V0RW50aXR5VHlwZSIsInRhYmxlQ29udHJvbElkIiwiY2hhcnRDb250cm9sSWQiLCJ0aXRsZSIsInNlbGVjdGlvblZhcmlhbnRQYXRoIiwiaXNNdWx0aXBsZVZpZXdDb25maWd1cmF0aW9uIiwia2V5IiwiY3JlYXRlVmlzdWFsaXphdGlvbiIsImlzUHJpbWFyeSIsImRlZmF1bHRWaXN1YWxpemF0aW9uIiwicHJlc2VudGF0aW9uQ3JlYXRlZCIsIk9iamVjdCIsImFzc2lnbiIsImdldFByZXNlbnRhdGlvbiIsIml0ZW0iLCJyZXNvbHZlZFRhcmdldCIsImdldEVudGl0eVR5cGVBbm5vdGF0aW9uIiwidGFyZ2V0QW5ub3RhdGlvbiIsImNyZWF0ZUFscFZpZXciLCJwcmVzZW50YXRpb25zIiwiZGVmYXVsdFBhdGgiLCJpZCIsImdldFRlbXBsYXRlVHlwZSIsIlRlbXBsYXRlVHlwZSIsIkFuYWx5dGljYWxMaXN0UGFnZSIsImhhc011bHRpcGxlVmlzdWFsaXphdGlvbnMiLCJwcmltYXJ5Iiwic2Vjb25kYXJ5Iiwidmlld0Fubm90YXRpb24iLCJjb21waWxlQmluZGluZyIsImFubm90YXRpb25FeHByZXNzaW9uIiwiVGV4dCIsInZpc3VhbGl6YXRpb25EZWZpbml0aW9uIiwiaW5kZXgiLCJ0YWJsZVZpc3VhbGl6YXRpb24iLCJmaWx0ZXJzIiwiY29udHJvbCIsImhpZGRlbkZpbHRlcnMiLCJwYXRocyIsImtlZXBQcmV2aW91c1ByZXNvbmFsaXphdGlvbiIsIlRhYmxlSUQiLCJ0ZXJtIiwiU2VsZWN0aW9uVmFyaWFudCIsInNwbGl0IiwiY2hhcnRWaXN1YWxpemF0aW9uIiwiQ2hhcnRJRCIsImxhYmVsIiwiZnJhZ21lbnQiLCJ0ZW1wbGF0ZSIsImN1c3RvbVRhYklkIiwiQ3VzdG9tVGFiSUQiLCJnZXRWaWV3cyIsInNldHRpbmdzVmlld3MiLCJ2aWV3Q29udmVydGVyQ29uZmlncyIsInBhdGgiLCJtYW5pZmVzdFdyYXBwZXIiLCJ2aWV3Q29udmVydGVyQ29udGV4dCIsImdldENvbnZlcnRlckNvbnRleHRGb3IiLCJjb250ZXh0UGF0aCIsImVudGl0eVNldCIsImdldENvbnRleHRQYXRoIiwicmVzb2x2ZWRUYXJnZXRjb252ZXJ0ZXJDb250ZXh0IiwiZ2V0QWxwVmlld0NvbmZpZyIsIm1hcCIsInZpZXdDb252ZXJ0ZXJDb25maWciLCJ2aWV3Q29uZmlncyIsImNoYXJ0IiwidGFibGUiLCJnZXREZWZhdWx0Q2hhcnQiLCJnZXRIZWFkZXJBY3Rpb25zIiwiaW5zZXJ0Q3VzdG9tRWxlbWVudHMiLCJnZXRBY3Rpb25zRnJvbU1hbmlmZXN0IiwiY2hlY2tDaGFydEZpbHRlckJhcklkIiwiZmlsdGVyQmFySWQiLCJmaWx0ZXJJZCIsImNvbnZlcnRQYWdlIiwic0NvbnRleHRQYXRoIiwidmlld3NEZWZpbml0aW9uIiwiZ2V0Vmlld0NvbmZpZ3VyYXRpb24iLCJoYXNNdWx0aXBsZUVudGl0eVNldHMiLCJzaG93VGFiQ291bnRzIiwic2hvd0NvdW50cyIsImxyVGFibGVWaXN1YWxpemF0aW9ucyIsImxyQ2hhcnRWaXN1YWxpemF0aW9ucyIsInNob3dQaW5uYWJsZVRvZ2dsZSIsInNvbWUiLCJzaW5nbGVUYWJsZUlkIiwic2luZ2xlQ2hhcnRJZCIsIkZpbHRlckJhcklEIiwiZmlsdGVyVmFyaWFudE1hbmFnZW1lbnRJRCIsIkZpbHRlclZhcmlhbnRNYW5hZ2VtZW50SUQiLCJmYkNvbmZpZyIsImdldEZpbHRlckNvbmZpZ3VyYXRpb24iLCJmaWx0ZXJJbml0aWFsTGF5b3V0IiwiaW5pdGlhbExheW91dCIsInRvTG93ZXJDYXNlIiwiZmlsdGVyTGF5b3V0IiwibGF5b3V0IiwidXNlU2VtYW50aWNEYXRlUmFuZ2UiLCJvQ29uZmlnIiwiZ2V0Q29udGVudEFyZWFJZCIsImNoYXJ0SWQiLCJ0YWJsZUlkIiwic2VsZWN0aW9uRmllbGRzIiwiZ2V0U2VsZWN0aW9uRmllbGRzIiwiaGlkZUJhc2ljU2VhcmNoIiwiZ2V0RmlsdGVyQmFyaGlkZUJhc2ljU2VhcmNoIiwic2VsZWN0aW9uVmFyaWFudCIsImdldFNlbGVjdGlvblZhcmlhbnQiLCJnZXRNYW5pZmVzdEZpbHRlckZpZWxkcyIsImhlYWRlckFjdGlvbnMiLCJoYXNNdWx0aVZpc3VhbGl6YXRpb25zIiwidmlzdWFsaXphdGlvbklkcyIsImNvbmNhdCIsInRhcmdldENvbnRyb2xJZHMiLCJnZXRWYXJpYW50TWFuYWdlbWVudCIsIlZhcmlhbnRNYW5hZ2VtZW50VHlwZSIsIkNvbnRyb2wiLCJJY29uVGFiQmFySUQiLCJtYWluRW50aXR5U2V0IiwibWFpbkVudGl0eVR5cGUiLCJmaWx0ZXJCYXIiLCJmaWx0ZXJDb25kaXRpb25zIiwidmFyaWFudE1hbmFnZW1lbnQiLCJqb2luIiwiaXNNdWx0aUVudGl0eVNldHMiLCJ0ZW1wbGF0ZVR5cGUiLCJrcGlEZWZpbml0aW9ucyIsImdldEtQSURlZmluaXRpb25zIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVNBLHNCQUFULENBQWdDQyxLQUFoQyxFQUF5RjtBQUN4RixRQUFNQyxNQUE0QixHQUFHLEVBQXJDO0FBQ0FELElBQUFBLEtBQUssQ0FBQ0UsT0FBTixDQUFjLFVBQVNDLElBQVQsRUFBZTtBQUM1QixVQUFJLENBQUVBLElBQUQsQ0FBK0JDLElBQXBDLEVBQTBDO0FBQ3pDLFlBQU1DLGNBQWMsR0FBSUYsSUFBRCxDQUFpQ0csc0JBQWpDLEdBQ25CSCxJQUFELENBQWlDRyxzQkFBakMsQ0FBd0RELGNBRHBDLEdBRW5CRixJQUFELENBQStCSSxZQUEvQixDQUE0Q0YsY0FGL0M7QUFJQUEsUUFBQUEsY0FBYyxDQUFDSCxPQUFmLENBQXVCLFVBQVNNLGFBQVQsRUFBd0I7QUFDOUMsY0FBSUEsYUFBYSxDQUFDSixJQUFkLEtBQXVCSyxp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QUFBLE9BQU8sRUFBRWhCO0FBRkgsT0FBUDtBQUlBOztBQUNELFdBQU9sRyxTQUFQO0FBQ0EiLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdE11bHRpcGxlVmlld3NDb25maWd1cmF0aW9uLFxuXHRWaWV3UGF0aENvbmZpZ3VyYXRpb24sXG5cdFNpbmdsZVZpZXdQYXRoQ29uZmlndXJhdGlvbixcblx0VmlzdWFsaXphdGlvblR5cGUsXG5cdFRlbXBsYXRlVHlwZSxcblx0Q29tYmluZWRWaWV3UGF0aENvbmZpZ3VyYXRpb24sXG5cdEN1c3RvbVZpZXdUZW1wbGF0ZUNvbmZpZ3VyYXRpb24sXG5cdFZhcmlhbnRNYW5hZ2VtZW50VHlwZVxufSBmcm9tIFwiLi4vTWFuaWZlc3RTZXR0aW5nc1wiO1xuaW1wb3J0IHsgRW50aXR5VHlwZSB9IGZyb20gXCJAc2FwLXV4L2Fubm90YXRpb24tY29udmVydGVyXCI7XG5pbXBvcnQge1xuXHREYXRhVmlzdWFsaXphdGlvbkFubm90YXRpb25zLFxuXHREYXRhVmlzdWFsaXphdGlvbkRlZmluaXRpb24sXG5cdGdldERhdGFWaXN1YWxpemF0aW9uQ29uZmlndXJhdGlvbixcblx0Z2V0RGVmYXVsdENoYXJ0LFxuXHRnZXREZWZhdWx0TGluZUl0ZW0sXG5cdGdldERlZmF1bHRQcmVzZW50YXRpb25WYXJpYW50LFxuXHRnZXRTZWxlY3Rpb25QcmVzZW50YXRpb25WYXJpYW50LFxuXHRpc1ByZXNlbnRhdGlvbkNvbXBsaWFudCxcblx0Z2V0U2VsZWN0aW9uVmFyaWFudCxcblx0aXNTZWxlY3Rpb25QcmVzZW50YXRpb25Db21wbGlhbnRcbn0gZnJvbSBcIi4uL2NvbnRyb2xzL0NvbW1vbi9EYXRhVmlzdWFsaXphdGlvblwiO1xuaW1wb3J0IHtcblx0TGluZUl0ZW0sXG5cdFByZXNlbnRhdGlvblZhcmlhbnRUeXBlVHlwZXMsXG5cdFNlbGVjdGlvblByZXNlbnRhdGlvblZhcmlhbnRUeXBlVHlwZXMsXG5cdFNlbGVjdGlvblZhcmlhbnRUeXBlVHlwZXNcbn0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzL2Rpc3QvZ2VuZXJhdGVkL1VJXCI7XG5pbXBvcnQgeyBVSUFubm90YXRpb25UZXJtcyB9IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlc1wiO1xuaW1wb3J0IHsgQ3VzdG9tVGFiSUQsIEZpbHRlckJhcklELCBGaWx0ZXJWYXJpYW50TWFuYWdlbWVudElELCBUYWJsZUlELCBDaGFydElELCBJY29uVGFiQmFySUQgfSBmcm9tIFwiLi4vaGVscGVycy9JRFwiO1xuaW1wb3J0IHsgVGFibGVWaXN1YWxpemF0aW9uIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvY29udHJvbHMvQ29tbW9uL1RhYmxlXCI7XG5pbXBvcnQgeyBDaGFydFZpc3VhbGl6YXRpb24gfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9jb250cm9scy9Db21tb24vQ2hhcnRcIjtcbmltcG9ydCB7IEJhc2VBY3Rpb24sIGdldEFjdGlvbnNGcm9tTWFuaWZlc3QgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9jb250cm9scy9Db21tb24vQWN0aW9uXCI7XG5pbXBvcnQgeyBDb25maWd1cmFibGVPYmplY3QsIGluc2VydEN1c3RvbUVsZW1lbnRzIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9Db25maWd1cmFibGVPYmplY3RcIjtcbmltcG9ydCB7IGFubm90YXRpb25FeHByZXNzaW9uLCBjb21waWxlQmluZGluZyB9IGZyb20gXCJzYXAvZmUvY29yZS9oZWxwZXJzL0JpbmRpbmdFeHByZXNzaW9uXCI7XG5pbXBvcnQgQ29udmVydGVyQ29udGV4dCBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9Db252ZXJ0ZXJDb250ZXh0XCI7XG5pbXBvcnQgeyBLUElEZWZpbml0aW9uLCBnZXRLUElEZWZpbml0aW9ucyB9IGZyb20gXCIuLi9jb250cm9scy9Db21tb24vS1BJXCI7XG5pbXBvcnQge1xuXHRnZXRTZWxlY3Rpb25GaWVsZHMsXG5cdGdldE1hbmlmZXN0RmlsdGVyRmllbGRzLFxuXHRnZXRGaWx0ZXJCYXJoaWRlQmFzaWNTZWFyY2gsXG5cdEZpbHRlckZpZWxkLFxuXHRDdXN0b21FbGVtZW50RmlsdGVyRmllbGRcbn0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvY29udHJvbHMvTGlzdFJlcG9ydC9GaWx0ZXJCYXJcIjtcblxudHlwZSBWaWV3QW5ub3RhdGlvbnNUeXBlVHlwZXMgPSBTZWxlY3Rpb25QcmVzZW50YXRpb25WYXJpYW50VHlwZVR5cGVzIHwgU2VsZWN0aW9uVmFyaWFudFR5cGVUeXBlcztcbnR5cGUgVmFyaWFudE1hbmFnZW1lbnREZWZpbml0aW9uID0ge1xuXHRpZDogc3RyaW5nO1xuXHR0YXJnZXRDb250cm9sSWRzOiBzdHJpbmc7XG59O1xuXG50eXBlIE11bHRpcGxlVmlld0NvbmZpZ3VyYXRpb24gPSBWaWV3UGF0aENvbmZpZ3VyYXRpb24gJiB7XG5cdGFubm90YXRpb24/OiBEYXRhVmlzdWFsaXphdGlvbkFubm90YXRpb25zO1xufTtcblxudHlwZSBTaW5nbGVWaWV3Q29uZmlndXJhdGlvbiA9IHtcblx0YW5ub3RhdGlvbj86IERhdGFWaXN1YWxpemF0aW9uQW5ub3RhdGlvbnM7XG59O1xuXG50eXBlIEN1c3RvbVZpZXdDb25maWd1cmF0aW9uID0gQ3VzdG9tVmlld1RlbXBsYXRlQ29uZmlndXJhdGlvbiAmIHtcblx0dHlwZTogc3RyaW5nO1xufTtcblxudHlwZSBWaWV3Q29uZmlndXJhdGlvbiA9IE11bHRpcGxlVmlld0NvbmZpZ3VyYXRpb24gfCBTaW5nbGVWaWV3Q29uZmlndXJhdGlvbiB8IEN1c3RvbVZpZXdDb25maWd1cmF0aW9uO1xudHlwZSBWaWV3QW5ub3RhdGlvbkNvbmZpZ3VyYXRpb24gPSBNdWx0aXBsZVZpZXdDb25maWd1cmF0aW9uIHwgU2luZ2xlVmlld0NvbmZpZ3VyYXRpb247XG5cbnR5cGUgVmlld0NvbnZlcnRlclNldHRpbmdzID0gVmlld0NvbmZpZ3VyYXRpb24gJiB7XG5cdGNvbnZlcnRlckNvbnRleHQ/OiBDb252ZXJ0ZXJDb250ZXh0O1xufTtcblxudHlwZSBEZWZhdWx0U2VtYW50aWNEYXRlID0gQ29uZmlndXJhYmxlT2JqZWN0ICYge1xuXHRvcGVyYXRvcjogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgTGlzdFJlcG9ydERlZmluaXRpb24gPSB7XG5cdG1haW5FbnRpdHlTZXQ6IHN0cmluZztcblx0bWFpbkVudGl0eVR5cGU6IHN0cmluZzsgLy8gZW50aXR5VHlwZT4gYXQgdGhlIHN0YXJ0IG9mIExSIHRlbXBsYXRpbmdcblx0c2luZ2xlVGFibGVJZD86IHN0cmluZzsgLy8gb25seSB3aXRoIHNpbmdsZSBUYWJsZSBtb2RlXG5cdHNpbmdsZUNoYXJ0SWQ/OiBzdHJpbmc7IC8vIG9ubHkgd2l0aCBzaW5nbGUgVGFibGUgbW9kZVxuXHRzaG93VGFiQ291bnRzPzogYm9vbGVhbjsgLy8gb25seSB3aXRoIG11bHRpIFRhYmxlIG1vZGVcblx0aGVhZGVyQWN0aW9uczogQmFzZUFjdGlvbltdO1xuXHRzaG93UGlubmFibGVUb2dnbGU/OiBib29sZWFuO1xuXHRmaWx0ZXJCYXI6IHtcblx0XHRzZWxlY3Rpb25GaWVsZHM6IEZpbHRlckZpZWxkW107XG5cdFx0aGlkZUJhc2ljU2VhcmNoOiBib29sZWFuO1xuXHR9O1xuXHR2aWV3czogTGlzdFJlcG9ydFZpZXdEZWZpbml0aW9uW107XG5cdGZpbHRlckNvbmRpdGlvbnM6IG9iamVjdDtcblx0aXNNdWx0aUVudGl0eVNldHM6IGJvb2xlYW47XG5cdGZpbHRlckJhcklkOiBzdHJpbmc7XG5cdHZhcmlhbnRNYW5hZ2VtZW50OiBWYXJpYW50TWFuYWdlbWVudERlZmluaXRpb247XG5cdGhhc011bHRpVmlzdWFsaXphdGlvbnM6IGJvb2xlYW47XG5cdHRlbXBsYXRlVHlwZTogVGVtcGxhdGVUeXBlO1xuXHR1c2VTZW1hbnRpY0RhdGVSYW5nZT86IGJvb2xlYW47XG5cdGZpbHRlckluaXRpYWxMYXlvdXQ/OiBzdHJpbmc7XG5cdGZpbHRlckxheW91dD86IHN0cmluZztcblx0a3BpRGVmaW5pdGlvbnM6IEtQSURlZmluaXRpb25bXTtcbn07XG5cbmV4cG9ydCB0eXBlIExpc3RSZXBvcnRWaWV3RGVmaW5pdGlvbiA9IFNpbmdsZVZpZXdEZWZpbml0aW9uIHwgQ3VzdG9tVmlld0RlZmluaXRpb24gfCBDb21iaW5lZFZpZXdEZWZpbml0aW9uO1xuXG5leHBvcnQgdHlwZSBDb21iaW5lZFZpZXdEZWZpbml0aW9uID0ge1xuXHRzZWxlY3Rpb25WYXJpYW50UGF0aD86IHN0cmluZzsgLy8gb25seSB3aXRoIG9uIG11bHRpIFRhYmxlIG1vZGVcblx0dGl0bGU/OiBzdHJpbmc7IC8vIG9ubHkgd2l0aCBtdWx0aSBUYWJsZSBtb2RlXG5cdHByaW1hcnlWaXN1YWxpemF0aW9uOiBEYXRhVmlzdWFsaXphdGlvbkRlZmluaXRpb247XG5cdHNlY29uZGFyeVZpc3VhbGl6YXRpb246IERhdGFWaXN1YWxpemF0aW9uRGVmaW5pdGlvbjtcblx0dGFibGVDb250cm9sSWQ6IHN0cmluZztcblx0Y2hhcnRDb250cm9sSWQ6IHN0cmluZztcblx0ZGVmYXVsdFBhdGg/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBDdXN0b21WaWV3RGVmaW5pdGlvbiA9IHtcblx0dGl0bGU/OiBzdHJpbmc7IC8vIG9ubHkgd2l0aCBtdWx0aSBUYWJsZSBtb2RlXG5cdGZyYWdtZW50OiBzdHJpbmc7XG5cdHR5cGU6IHN0cmluZztcblx0Y3VzdG9tVGFiSWQ6IHN0cmluZztcbn07XG5leHBvcnQgdHlwZSBTaW5nbGVWaWV3RGVmaW5pdGlvbiA9IFNpbmdsZVRhYmxlVmlld0RlZmluaXRpb24gfCBTaW5nbGVDaGFydFZpZXdEZWZpbml0aW9uO1xuXG5leHBvcnQgdHlwZSBCYXNlU2luZ2xlVmlld0RlZmluaXRpb24gPSB7XG5cdHNlbGVjdGlvblZhcmlhbnRQYXRoPzogc3RyaW5nOyAvLyBvbmx5IHdpdGggb24gbXVsdGkgVGFibGUgbW9kZVxuXHR0aXRsZT86IHN0cmluZzsgLy8gb25seSB3aXRoIG11bHRpIFRhYmxlIG1vZGVcblx0cHJlc2VudGF0aW9uOiBEYXRhVmlzdWFsaXphdGlvbkRlZmluaXRpb247XG59O1xuXG5leHBvcnQgdHlwZSBTaW5nbGVUYWJsZVZpZXdEZWZpbml0aW9uID0gQmFzZVNpbmdsZVZpZXdEZWZpbml0aW9uICYge1xuXHR0YWJsZUNvbnRyb2xJZD86IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFNpbmdsZUNoYXJ0Vmlld0RlZmluaXRpb24gPSBCYXNlU2luZ2xlVmlld0RlZmluaXRpb24gJiB7XG5cdGNoYXJ0Q29udHJvbElkPzogc3RyaW5nO1xufTtcblxudHlwZSBDb250ZW50QXJlYUlEID0ge1xuXHRjaGFydElkOiBzdHJpbmc7XG5cdHRhYmxlSWQ6IHN0cmluZztcbn07XG5cbi8qKlxuICogUmV0cmlldmVzIGFsbCBsaXN0IHJlcG9ydCB0YWJsZXMuXG4gKiBAcGFyYW0ge0xpc3RSZXBvcnRWaWV3RGVmaW5pdGlvbltdfSB2aWV3cyBUaGUgbGlzdCByZXBvcnQgdmlld3MgY29uZmlndXJlZCBpbiB0aGUgbWFuaWZlc3RcbiAqIEByZXR1cm5zIHtUYWJsZVZpc3VhbGl6YXRpb25bXX0gVGhlIGxpc3QgcmVwb3J0IHRhYmxlXG4gKi9cbmZ1bmN0aW9uIGdldFRhYmxlVmlzdWFsaXphdGlvbnModmlld3M6IExpc3RSZXBvcnRWaWV3RGVmaW5pdGlvbltdKTogVGFibGVWaXN1YWxpemF0aW9uW10ge1xuXHRjb25zdCB0YWJsZXM6IFRhYmxlVmlzdWFsaXphdGlvbltdID0gW107XG5cdHZpZXdzLmZvckVhY2goZnVuY3Rpb24odmlldykge1xuXHRcdGlmICghKHZpZXcgYXMgQ3VzdG9tVmlld0RlZmluaXRpb24pLnR5cGUpIHtcblx0XHRcdGNvbnN0IHZpc3VhbGl6YXRpb25zID0gKHZpZXcgYXMgQ29tYmluZWRWaWV3RGVmaW5pdGlvbikuc2Vjb25kYXJ5VmlzdWFsaXphdGlvblxuXHRcdFx0XHQ/ICh2aWV3IGFzIENvbWJpbmVkVmlld0RlZmluaXRpb24pLnNlY29uZGFyeVZpc3VhbGl6YXRpb24udmlzdWFsaXphdGlvbnNcblx0XHRcdFx0OiAodmlldyBhcyBTaW5nbGVWaWV3RGVmaW5pdGlvbikucHJlc2VudGF0aW9uLnZpc3VhbGl6YXRpb25zO1xuXG5cdFx0XHR2aXN1YWxpemF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHZpc3VhbGl6YXRpb24pIHtcblx0XHRcdFx0aWYgKHZpc3VhbGl6YXRpb24udHlwZSA9PT0gVmlzdWFsaXphdGlvblR5cGUuVGFibGUpIHtcblx0XHRcdFx0XHR0YWJsZXMucHVzaCh2aXN1YWxpemF0aW9uKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIHRhYmxlcztcbn1cblxuZnVuY3Rpb24gZ2V0Q2hhcnRWaXN1YWxpemF0aW9ucyh2aWV3czogTGlzdFJlcG9ydFZpZXdEZWZpbml0aW9uW10pOiBDaGFydFZpc3VhbGl6YXRpb25bXSB7XG5cdGNvbnN0IGNoYXJ0czogQ2hhcnRWaXN1YWxpemF0aW9uW10gPSBbXTtcblx0dmlld3MuZm9yRWFjaChmdW5jdGlvbih2aWV3KSB7XG5cdFx0aWYgKCEodmlldyBhcyBDdXN0b21WaWV3RGVmaW5pdGlvbikudHlwZSkge1xuXHRcdFx0Y29uc3QgdmlzdWFsaXphdGlvbnMgPSAodmlldyBhcyBDb21iaW5lZFZpZXdEZWZpbml0aW9uKS5wcmltYXJ5VmlzdWFsaXphdGlvblxuXHRcdFx0XHQ/ICh2aWV3IGFzIENvbWJpbmVkVmlld0RlZmluaXRpb24pLnByaW1hcnlWaXN1YWxpemF0aW9uLnZpc3VhbGl6YXRpb25zXG5cdFx0XHRcdDogKHZpZXcgYXMgU2luZ2xlVmlld0RlZmluaXRpb24pLnByZXNlbnRhdGlvbi52aXN1YWxpemF0aW9ucztcblxuXHRcdFx0dmlzdWFsaXphdGlvbnMuZm9yRWFjaChmdW5jdGlvbih2aXN1YWxpemF0aW9uKSB7XG5cdFx0XHRcdGlmICh2aXN1YWxpemF0aW9uLnR5cGUgPT09IFZpc3VhbGl6YXRpb25UeXBlLkNoYXJ0KSB7XG5cdFx0XHRcdFx0Y2hhcnRzLnB1c2godmlzdWFsaXphdGlvbik7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBjaGFydHM7XG59XG5cbmNvbnN0IGdldERlZmF1bHRTZW1hbnRpY0RhdGVzID0gZnVuY3Rpb24oZmlsdGVyRmllbGRzOiBSZWNvcmQ8c3RyaW5nLCBDdXN0b21FbGVtZW50RmlsdGVyRmllbGQ+KTogUmVjb3JkPHN0cmluZywgRGVmYXVsdFNlbWFudGljRGF0ZT4ge1xuXHRjb25zdCBkZWZhdWx0U2VtYW50aWNEYXRlczogYW55ID0ge307XG5cdGZvciAoY29uc3QgZmlsdGVyRmllbGQgaW4gZmlsdGVyRmllbGRzKSB7XG5cdFx0aWYgKGZpbHRlckZpZWxkc1tmaWx0ZXJGaWVsZF0/LnNldHRpbmdzPy5kZWZhdWx0VmFsdWVzPy5sZW5ndGgpIHtcblx0XHRcdGRlZmF1bHRTZW1hbnRpY0RhdGVzW2ZpbHRlckZpZWxkXSA9IGZpbHRlckZpZWxkc1tmaWx0ZXJGaWVsZF0/LnNldHRpbmdzPy5kZWZhdWx0VmFsdWVzO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZGVmYXVsdFNlbWFudGljRGF0ZXM7XG59O1xuXG4vKipcbiAqIEZpbmQgYSB2aXN1YWxpemF0aW9uIGFubm90YXRpb24gdGhhdCBjYW4gYmUgdXNlZCBmb3IgcmVuZGVyaW5nIHRoZSBsaXN0IHJlcG9ydC5cbiAqXG4gKiBAcGFyYW0ge0VudGl0eVR5cGV9IGVudGl0eVR5cGUgVGhlIGN1cnJlbnQgRW50aXR5VHlwZVxuICogQHBhcmFtIGNvbnZlcnRlckNvbnRleHRcbiAqIEBwYXJhbSBiSXNBTFBcbiAqIEByZXR1cm5zIHtMaW5lSXRlbSB8IFByZXNlbnRhdGlvblZhcmlhbnRUeXBlVHlwZXMgfCB1bmRlZmluZWR9IEEgY29tcGxpYW50IGFubm90YXRpb24gZm9yIHJlbmRlcmluZyB0aGUgbGlzdCByZXBvcnRcbiAqL1xuZnVuY3Rpb24gZ2V0Q29tcGxpYW50VmlzdWFsaXphdGlvbkFubm90YXRpb24oXG5cdGVudGl0eVR5cGU6IEVudGl0eVR5cGUsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdGJJc0FMUDogQm9vbGVhblxuKTogTGluZUl0ZW0gfCBQcmVzZW50YXRpb25WYXJpYW50VHlwZVR5cGVzIHwgU2VsZWN0aW9uUHJlc2VudGF0aW9uVmFyaWFudFR5cGVUeXBlcyB8IHVuZGVmaW5lZCB7XG5cdGNvbnN0IGFubm90YXRpb25QYXRoID0gY29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdFdyYXBwZXIoKS5nZXREZWZhdWx0VGVtcGxhdGVBbm5vdGF0aW9uUGF0aCgpO1xuXHRjb25zdCBzZWxlY3Rpb25QcmVzZW50YXRpb25WYXJpYW50ID0gZ2V0U2VsZWN0aW9uUHJlc2VudGF0aW9uVmFyaWFudChlbnRpdHlUeXBlLCBhbm5vdGF0aW9uUGF0aCwgY29udmVydGVyQ29udGV4dCk7XG5cdGlmIChhbm5vdGF0aW9uUGF0aCAmJiBzZWxlY3Rpb25QcmVzZW50YXRpb25WYXJpYW50KSB7XG5cdFx0Y29uc3QgcHJlc2VudGF0aW9uVmFyaWFudCA9IHNlbGVjdGlvblByZXNlbnRhdGlvblZhcmlhbnQuUHJlc2VudGF0aW9uVmFyaWFudDtcblx0XHRpZiAoIXByZXNlbnRhdGlvblZhcmlhbnQpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlByZXNlbnRhdGlvbiBWYXJpYW50IGlzIG5vdCBjb25maWd1cmVkIGluIHRoZSBTUFYgbWVudGlvbmVkIGluIHRoZSBtYW5pZmVzdFwiKTtcblx0XHR9XG5cdFx0Y29uc3QgYlBWQ29tcGxhaW50ID0gaXNQcmVzZW50YXRpb25Db21wbGlhbnQoc2VsZWN0aW9uUHJlc2VudGF0aW9uVmFyaWFudC5QcmVzZW50YXRpb25WYXJpYW50KTtcblx0XHRpZiAoIWJQVkNvbXBsYWludCkge1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0aWYgKGlzU2VsZWN0aW9uUHJlc2VudGF0aW9uQ29tcGxpYW50KHNlbGVjdGlvblByZXNlbnRhdGlvblZhcmlhbnQsIGJJc0FMUCkpIHtcblx0XHRcdHJldHVybiBzZWxlY3Rpb25QcmVzZW50YXRpb25WYXJpYW50O1xuXHRcdH1cblx0fVxuXHRpZiAoc2VsZWN0aW9uUHJlc2VudGF0aW9uVmFyaWFudCkge1xuXHRcdGlmIChpc1NlbGVjdGlvblByZXNlbnRhdGlvbkNvbXBsaWFudChzZWxlY3Rpb25QcmVzZW50YXRpb25WYXJpYW50LCBiSXNBTFApKSB7XG5cdFx0XHRyZXR1cm4gc2VsZWN0aW9uUHJlc2VudGF0aW9uVmFyaWFudDtcblx0XHR9XG5cdH1cblx0Y29uc3QgcHJlc2VudGF0aW9uVmFyaWFudCA9IGdldERlZmF1bHRQcmVzZW50YXRpb25WYXJpYW50KGVudGl0eVR5cGUpO1xuXHRpZiAocHJlc2VudGF0aW9uVmFyaWFudCkge1xuXHRcdGlmIChpc1ByZXNlbnRhdGlvbkNvbXBsaWFudChwcmVzZW50YXRpb25WYXJpYW50LCBiSXNBTFApKSB7XG5cdFx0XHRyZXR1cm4gcHJlc2VudGF0aW9uVmFyaWFudDtcblx0XHR9XG5cdH1cblx0aWYgKCFiSXNBTFApIHtcblx0XHRjb25zdCBkZWZhdWx0TGluZUl0ZW0gPSBnZXREZWZhdWx0TGluZUl0ZW0oZW50aXR5VHlwZSk7XG5cdFx0aWYgKGRlZmF1bHRMaW5lSXRlbSkge1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRMaW5lSXRlbTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuY29uc3QgZ2V0VmlldyA9IGZ1bmN0aW9uKHZpZXdDb252ZXJ0ZXJDb25maWd1cmF0aW9uOiBWaWV3Q29udmVydGVyU2V0dGluZ3MpOiBMaXN0UmVwb3J0Vmlld0RlZmluaXRpb24ge1xuXHRsZXQgY29uZmlnID0gdmlld0NvbnZlcnRlckNvbmZpZ3VyYXRpb247XG5cdGlmIChjb25maWcuY29udmVydGVyQ29udGV4dCkge1xuXHRcdGxldCBjb252ZXJ0ZXJDb250ZXh0ID0gY29uZmlnLmNvbnZlcnRlckNvbnRleHQ7XG5cdFx0Y29uZmlnID0gY29uZmlnIGFzIFZpZXdBbm5vdGF0aW9uQ29uZmlndXJhdGlvbjtcblx0XHRsZXQgcHJlc2VudGF0aW9uOiBEYXRhVmlzdWFsaXphdGlvbkRlZmluaXRpb24gPSBnZXREYXRhVmlzdWFsaXphdGlvbkNvbmZpZ3VyYXRpb24oXG5cdFx0XHRjb25maWcuYW5ub3RhdGlvblxuXHRcdFx0XHQ/IGNvbnZlcnRlckNvbnRleHQuZ2V0UmVsYXRpdmVBbm5vdGF0aW9uUGF0aChjb25maWcuYW5ub3RhdGlvbi5mdWxseVF1YWxpZmllZE5hbWUsIGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5VHlwZSgpKVxuXHRcdFx0XHQ6IFwiXCIsXG5cdFx0XHR0cnVlLFxuXHRcdFx0Y29udmVydGVyQ29udGV4dCxcblx0XHRcdGNvbmZpZyBhcyBWaWV3UGF0aENvbmZpZ3VyYXRpb25cblx0XHQpO1xuXHRcdGxldCB0YWJsZUNvbnRyb2xJZCA9IFwiXCI7XG5cdFx0bGV0IGNoYXJ0Q29udHJvbElkID0gXCJcIjtcblx0XHRsZXQgdGl0bGU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IFwiXCI7XG5cdFx0bGV0IHNlbGVjdGlvblZhcmlhbnRQYXRoID0gXCJcIjtcblx0XHRjb25zdCBpc011bHRpcGxlVmlld0NvbmZpZ3VyYXRpb24gPSBmdW5jdGlvbihjb25maWc6IFZpZXdDb25maWd1cmF0aW9uKTogY29uZmlnIGlzIE11bHRpcGxlVmlld0NvbmZpZ3VyYXRpb24ge1xuXHRcdFx0cmV0dXJuIChjb25maWcgYXMgTXVsdGlwbGVWaWV3Q29uZmlndXJhdGlvbikua2V5ICE9PSB1bmRlZmluZWQ7XG5cdFx0fTtcblx0XHRjb25zdCBjcmVhdGVWaXN1YWxpemF0aW9uID0gZnVuY3Rpb24ocHJlc2VudGF0aW9uOiBEYXRhVmlzdWFsaXphdGlvbkRlZmluaXRpb24sIGlzUHJpbWFyeT86IGJvb2xlYW4pIHtcblx0XHRcdGxldCBkZWZhdWx0VmlzdWFsaXphdGlvbjtcblx0XHRcdGZvciAoY29uc3QgdmlzdWFsaXphdGlvbiBvZiBwcmVzZW50YXRpb24udmlzdWFsaXphdGlvbnMpIHtcblx0XHRcdFx0aWYgKGlzUHJpbWFyeSAmJiB2aXN1YWxpemF0aW9uLnR5cGUgPT09IFZpc3VhbGl6YXRpb25UeXBlLkNoYXJ0KSB7XG5cdFx0XHRcdFx0ZGVmYXVsdFZpc3VhbGl6YXRpb24gPSB2aXN1YWxpemF0aW9uO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICghaXNQcmltYXJ5ICYmIHZpc3VhbGl6YXRpb24udHlwZSA9PT0gVmlzdWFsaXphdGlvblR5cGUuVGFibGUpIHtcblx0XHRcdFx0XHRkZWZhdWx0VmlzdWFsaXphdGlvbiA9IHZpc3VhbGl6YXRpb247XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNvbnN0IHByZXNlbnRhdGlvbkNyZWF0ZWQgPSBPYmplY3QuYXNzaWduKHt9LCBwcmVzZW50YXRpb24pO1xuXHRcdFx0aWYgKGRlZmF1bHRWaXN1YWxpemF0aW9uKSB7XG5cdFx0XHRcdHByZXNlbnRhdGlvbkNyZWF0ZWQudmlzdWFsaXphdGlvbnMgPSBbZGVmYXVsdFZpc3VhbGl6YXRpb25dO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHByZXNlbnRhdGlvbkNyZWF0ZWQ7XG5cdFx0fTtcblx0XHRjb25zdCBnZXRQcmVzZW50YXRpb24gPSBmdW5jdGlvbihpdGVtOiBTaW5nbGVWaWV3UGF0aENvbmZpZ3VyYXRpb24pIHtcblx0XHRcdGNvbnN0IHJlc29sdmVkVGFyZ2V0ID0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlQW5ub3RhdGlvbihpdGVtLmFubm90YXRpb25QYXRoKTtcblx0XHRcdGNvbnN0IHRhcmdldEFubm90YXRpb24gPSByZXNvbHZlZFRhcmdldC5hbm5vdGF0aW9uIGFzIERhdGFWaXN1YWxpemF0aW9uQW5ub3RhdGlvbnM7XG5cdFx0XHRjb252ZXJ0ZXJDb250ZXh0ID0gcmVzb2x2ZWRUYXJnZXQuY29udmVydGVyQ29udGV4dDtcblx0XHRcdGNvbnN0IGFubm90YXRpb24gPSB0YXJnZXRBbm5vdGF0aW9uO1xuXHRcdFx0cHJlc2VudGF0aW9uID0gZ2V0RGF0YVZpc3VhbGl6YXRpb25Db25maWd1cmF0aW9uKFxuXHRcdFx0XHRhbm5vdGF0aW9uXG5cdFx0XHRcdFx0PyBjb252ZXJ0ZXJDb250ZXh0LmdldFJlbGF0aXZlQW5ub3RhdGlvblBhdGgoYW5ub3RhdGlvbi5mdWxseVF1YWxpZmllZE5hbWUsIGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5VHlwZSgpKVxuXHRcdFx0XHRcdDogXCJcIixcblx0XHRcdFx0dHJ1ZSxcblx0XHRcdFx0Y29udmVydGVyQ29udGV4dCxcblx0XHRcdFx0Y29uZmlnIGFzIFZpZXdQYXRoQ29uZmlndXJhdGlvblxuXHRcdFx0KTtcblx0XHRcdHJldHVybiBwcmVzZW50YXRpb247XG5cdFx0fTtcblx0XHRjb25zdCBjcmVhdGVBbHBWaWV3ID0gZnVuY3Rpb24oXG5cdFx0XHRwcmVzZW50YXRpb25zOiBEYXRhVmlzdWFsaXphdGlvbkRlZmluaXRpb25bXSxcblx0XHRcdGRlZmF1bHRQYXRoOiBcImJvdGhcIiB8IFwicHJpbWFyeVwiIHwgXCJzZWNvbmRhcnlcIiB8IHVuZGVmaW5lZFxuXHRcdCkge1xuXHRcdFx0Y29uc3QgcHJpbWFyeVZpc3VhbGl6YXRpb246IERhdGFWaXN1YWxpemF0aW9uRGVmaW5pdGlvbiB8IHVuZGVmaW5lZCA9IGNyZWF0ZVZpc3VhbGl6YXRpb24ocHJlc2VudGF0aW9uc1swXSwgdHJ1ZSk7XG5cdFx0XHRjaGFydENvbnRyb2xJZCA9IChwcmltYXJ5VmlzdWFsaXphdGlvbj8udmlzdWFsaXphdGlvbnNbMF0gYXMgQ2hhcnRWaXN1YWxpemF0aW9uKS5pZDtcblx0XHRcdGNvbnN0IHNlY29uZGFyeVZpc3VhbGl6YXRpb246IERhdGFWaXN1YWxpemF0aW9uRGVmaW5pdGlvbiB8IHVuZGVmaW5lZCA9IGNyZWF0ZVZpc3VhbGl6YXRpb24oXG5cdFx0XHRcdHByZXNlbnRhdGlvbnNbMV0gPyBwcmVzZW50YXRpb25zWzFdIDogcHJlc2VudGF0aW9uc1swXVxuXHRcdFx0KTtcblx0XHRcdHRhYmxlQ29udHJvbElkID0gKHNlY29uZGFyeVZpc3VhbGl6YXRpb24/LnZpc3VhbGl6YXRpb25zWzBdIGFzIFRhYmxlVmlzdWFsaXphdGlvbikuYW5ub3RhdGlvbi5pZDtcblx0XHRcdGlmIChwcmltYXJ5VmlzdWFsaXphdGlvbiAmJiBzZWNvbmRhcnlWaXN1YWxpemF0aW9uKSB7XG5cdFx0XHRcdGNvbnN0IHZpZXc6IENvbWJpbmVkVmlld0RlZmluaXRpb24gPSB7XG5cdFx0XHRcdFx0cHJpbWFyeVZpc3VhbGl6YXRpb24sXG5cdFx0XHRcdFx0c2Vjb25kYXJ5VmlzdWFsaXphdGlvbixcblx0XHRcdFx0XHR0YWJsZUNvbnRyb2xJZCxcblx0XHRcdFx0XHRjaGFydENvbnRyb2xJZCxcblx0XHRcdFx0XHRkZWZhdWx0UGF0aFxuXHRcdFx0XHR9O1xuXHRcdFx0XHRyZXR1cm4gdmlldztcblx0XHRcdH1cblx0XHR9O1xuXHRcdGlmIChwcmVzZW50YXRpb24/LnZpc3VhbGl6YXRpb25zPy5sZW5ndGggPT09IDIgJiYgY29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSA9PT0gVGVtcGxhdGVUeXBlLkFuYWx5dGljYWxMaXN0UGFnZSkge1xuXHRcdFx0Y29uc3QgdmlldzogQ29tYmluZWRWaWV3RGVmaW5pdGlvbiB8IHVuZGVmaW5lZCA9IGNyZWF0ZUFscFZpZXcoW3ByZXNlbnRhdGlvbl0sIFwiYm90aFwiKTtcblx0XHRcdGlmICh2aWV3KSB7XG5cdFx0XHRcdHJldHVybiB2aWV3O1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0V3JhcHBlcigpLmhhc011bHRpcGxlVmlzdWFsaXphdGlvbnMoY29uZmlnIGFzIFZpZXdQYXRoQ29uZmlndXJhdGlvbikgfHxcblx0XHRcdGNvbnZlcnRlckNvbnRleHQuZ2V0VGVtcGxhdGVUeXBlKCkgPT09IFRlbXBsYXRlVHlwZS5BbmFseXRpY2FsTGlzdFBhZ2Vcblx0XHQpIHtcblx0XHRcdGNvbnN0IHsgcHJpbWFyeSwgc2Vjb25kYXJ5IH0gPSBjb25maWcgYXMgQ29tYmluZWRWaWV3UGF0aENvbmZpZ3VyYXRpb247XG5cdFx0XHRpZiAocHJpbWFyeSAmJiBwcmltYXJ5Lmxlbmd0aCAmJiBzZWNvbmRhcnkgJiYgc2Vjb25kYXJ5Lmxlbmd0aCkge1xuXHRcdFx0XHRjb25zdCB2aWV3OiBDb21iaW5lZFZpZXdEZWZpbml0aW9uIHwgdW5kZWZpbmVkID0gY3JlYXRlQWxwVmlldyhcblx0XHRcdFx0XHRbZ2V0UHJlc2VudGF0aW9uKHByaW1hcnlbMF0pLCBnZXRQcmVzZW50YXRpb24oc2Vjb25kYXJ5WzBdKV0sXG5cdFx0XHRcdFx0KGNvbmZpZyBhcyBDb21iaW5lZFZpZXdQYXRoQ29uZmlndXJhdGlvbikuZGVmYXVsdFBhdGhcblx0XHRcdFx0KTtcblx0XHRcdFx0aWYgKHZpZXcpIHtcblx0XHRcdFx0XHRyZXR1cm4gdmlldztcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiU2Vjb25kYXJ5SXRlbXMgaW4gdGhlIFZpZXdzIGlzIG5vdCBwcmVzZW50XCIpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoaXNNdWx0aXBsZVZpZXdDb25maWd1cmF0aW9uKGNvbmZpZykpIHtcblx0XHRcdC8vIGtleSBleGlzdHMgb25seSBvbiBtdWx0aSB0YWJsZXMgbW9kZVxuXHRcdFx0Y29uc3QgcmVzb2x2ZWRUYXJnZXQgPSBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGVBbm5vdGF0aW9uKChjb25maWcgYXMgU2luZ2xlVmlld1BhdGhDb25maWd1cmF0aW9uKS5hbm5vdGF0aW9uUGF0aCk7XG5cdFx0XHRjb25zdCB2aWV3QW5ub3RhdGlvbjogVmlld0Fubm90YXRpb25zVHlwZVR5cGVzID0gcmVzb2x2ZWRUYXJnZXQuYW5ub3RhdGlvbiBhcyBWaWV3QW5ub3RhdGlvbnNUeXBlVHlwZXM7XG5cdFx0XHRjb252ZXJ0ZXJDb250ZXh0ID0gcmVzb2x2ZWRUYXJnZXQuY29udmVydGVyQ29udGV4dDtcblx0XHRcdHRpdGxlID0gY29tcGlsZUJpbmRpbmcoYW5ub3RhdGlvbkV4cHJlc3Npb24odmlld0Fubm90YXRpb24uVGV4dCkpO1xuXHRcdFx0Ly8gTmVlZCB0byBsb29wIG9uIHRhYmxlIGludG8gdmlld3Mgc2luY2UgbXVsdGkgdGFibGUgbW9kZSBnZXQgc3BlY2lmaWMgY29uZmlndXJhdGlvbiAoaGlkZGVuIGZpbHRlcnMgb3IgVGFibGUgSWQpXG5cdFx0XHRwcmVzZW50YXRpb24udmlzdWFsaXphdGlvbnMuZm9yRWFjaCgodmlzdWFsaXphdGlvbkRlZmluaXRpb24sIGluZGV4KSA9PiB7XG5cdFx0XHRcdHN3aXRjaCAodmlzdWFsaXphdGlvbkRlZmluaXRpb24udHlwZSkge1xuXHRcdFx0XHRcdGNhc2UgVmlzdWFsaXphdGlvblR5cGUuVGFibGU6XG5cdFx0XHRcdFx0XHRjb25zdCB0YWJsZVZpc3VhbGl6YXRpb24gPSBwcmVzZW50YXRpb24udmlzdWFsaXphdGlvbnNbaW5kZXhdIGFzIFRhYmxlVmlzdWFsaXphdGlvbjtcblx0XHRcdFx0XHRcdGNvbnN0IGZpbHRlcnMgPSB0YWJsZVZpc3VhbGl6YXRpb24uY29udHJvbC5maWx0ZXJzIHx8IHt9O1xuXHRcdFx0XHRcdFx0ZmlsdGVycy5oaWRkZW5GaWx0ZXJzID0gZmlsdGVycy5oaWRkZW5GaWx0ZXJzIHx8IHsgcGF0aHM6IFtdIH07XG5cdFx0XHRcdFx0XHRpZiAoIShjb25maWcgYXMgU2luZ2xlVmlld1BhdGhDb25maWd1cmF0aW9uKS5rZWVwUHJldmlvdXNQcmVzb25hbGl6YXRpb24pIHtcblx0XHRcdFx0XHRcdFx0Ly8gTmVlZCB0byBvdmVycmlkZSBUYWJsZSBJZCB0byBtYXRjaCB3aXRoIFRhYiBLZXkgKGN1cnJlbnRseSBvbmx5IHRhYmxlIGlzIG1hbmFnZWQgaW4gbXVsdGlwbGUgdmlldyBtb2RlKVxuXHRcdFx0XHRcdFx0XHR0YWJsZVZpc3VhbGl6YXRpb24uYW5ub3RhdGlvbi5pZCA9IFRhYmxlSUQoKGNvbmZpZyBhcyBTaW5nbGVWaWV3UGF0aENvbmZpZ3VyYXRpb24pLmtleSB8fCBcIlwiLCBcIkxpbmVJdGVtXCIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y29uZmlnID0gY29uZmlnIGFzIFZpZXdBbm5vdGF0aW9uQ29uZmlndXJhdGlvbjtcblx0XHRcdFx0XHRcdGlmIChjb25maWcgJiYgY29uZmlnLmFubm90YXRpb24gJiYgY29uZmlnLmFubm90YXRpb24udGVybSA9PT0gVUlBbm5vdGF0aW9uVGVybXMuU2VsZWN0aW9uUHJlc2VudGF0aW9uVmFyaWFudCkge1xuXHRcdFx0XHRcdFx0XHRzZWxlY3Rpb25WYXJpYW50UGF0aCA9IChjb25maWcuYW5ub3RhdGlvbiBhcyBTZWxlY3Rpb25QcmVzZW50YXRpb25WYXJpYW50VHlwZVR5cGVzKS5TZWxlY3Rpb25WYXJpYW50LmZ1bGx5UXVhbGlmaWVkTmFtZS5zcGxpdChcblx0XHRcdFx0XHRcdFx0XHRcIkBcIlxuXHRcdFx0XHRcdFx0XHQpWzFdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0c2VsZWN0aW9uVmFyaWFudFBhdGggPSAoY29uZmlnIGFzIFNpbmdsZVZpZXdQYXRoQ29uZmlndXJhdGlvbikuYW5ub3RhdGlvblBhdGg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvL1Byb3ZpZGUgU2VsZWN0aW9uIFZhcmlhbnQgdG8gaGlkZGVuRmlsdGVycyBpbiBvcmRlciB0byBzZXQgdGhlIFNWIGZpbHRlcnMgdG8gdGhlIHRhYmxlLlxuXHRcdFx0XHRcdFx0Ly9NREMgVGFibGUgb3ZlcnJpZGVzIGJpbmRpbmcgRmlsdGVyIGFuZCBmcm9tIFNBUCBGRSB0aGUgb25seSBtZXRob2Qgd2hlcmUgd2UgYXJlIGFibGUgdG8gYWRkXG5cdFx0XHRcdFx0XHQvL2FkZGl0aW9uYWwgZmlsdGVyIGlzICdyZWJpbmRUYWJsZScgaW50byBUYWJsZSBkZWxlZ2F0ZS5cblx0XHRcdFx0XHRcdC8vVG8gYXZvaWQgaW1wbGVtZW50aW5nIHNwZWNpZmljIExSIGZlYXR1cmUgdG8gU0FQIEZFIE1hY3JvIFRhYmxlLCB0aGUgZmlsdGVyKHMpIHJlbGF0ZWQgdG8gdGhlIFRhYiAobXVsdGkgdGFibGUgbW9kZSlcblx0XHRcdFx0XHRcdC8vY2FuIGJlIHBhc3NlZCB0byBtYWNybyB0YWJsZSB2aWEgcGFyYW1ldGVyL2NvbnRleHQgbmFtZWQgZmlsdGVycyBhbmQga2V5IGhpZGRlbkZpbHRlcnMuXG5cdFx0XHRcdFx0XHRmaWx0ZXJzLmhpZGRlbkZpbHRlcnMucGF0aHMucHVzaCh7IGFubm90YXRpb25QYXRoOiBzZWxlY3Rpb25WYXJpYW50UGF0aCB9KTtcblx0XHRcdFx0XHRcdHRhYmxlVmlzdWFsaXphdGlvbi5jb250cm9sLmZpbHRlcnMgPSBmaWx0ZXJzO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBWaXN1YWxpemF0aW9uVHlwZS5DaGFydDpcblx0XHRcdFx0XHRcdGNvbnN0IGNoYXJ0VmlzdWFsaXphdGlvbiA9IHByZXNlbnRhdGlvbi52aXN1YWxpemF0aW9uc1tpbmRleF0gYXMgQ2hhcnRWaXN1YWxpemF0aW9uO1xuXHRcdFx0XHRcdFx0Y2hhcnRWaXN1YWxpemF0aW9uLmlkID0gQ2hhcnRJRCgoY29uZmlnIGFzIFNpbmdsZVZpZXdQYXRoQ29uZmlndXJhdGlvbikua2V5IHx8IFwiXCIsIFwiQ2hhcnRcIik7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRwcmVzZW50YXRpb24udmlzdWFsaXphdGlvbnMuZm9yRWFjaCh2aXN1YWxpemF0aW9uRGVmaW5pdGlvbiA9PiB7XG5cdFx0XHRpZiAodmlzdWFsaXphdGlvbkRlZmluaXRpb24udHlwZSA9PT0gVmlzdWFsaXphdGlvblR5cGUuVGFibGUpIHtcblx0XHRcdFx0dGFibGVDb250cm9sSWQgPSB2aXN1YWxpemF0aW9uRGVmaW5pdGlvbi5hbm5vdGF0aW9uLmlkO1xuXHRcdFx0fSBlbHNlIGlmICh2aXN1YWxpemF0aW9uRGVmaW5pdGlvbi50eXBlID09PSBWaXN1YWxpemF0aW9uVHlwZS5DaGFydCkge1xuXHRcdFx0XHRjaGFydENvbnRyb2xJZCA9IHZpc3VhbGl6YXRpb25EZWZpbml0aW9uLmlkO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiB7XG5cdFx0XHRwcmVzZW50YXRpb24sXG5cdFx0XHR0YWJsZUNvbnRyb2xJZCxcblx0XHRcdGNoYXJ0Q29udHJvbElkLFxuXHRcdFx0dGl0bGUsXG5cdFx0XHRzZWxlY3Rpb25WYXJpYW50UGF0aFxuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0Y29uZmlnID0gY29uZmlnIGFzIEN1c3RvbVZpZXdDb25maWd1cmF0aW9uO1xuXHRcdGNvbnN0IHRpdGxlID0gY29uZmlnLmxhYmVsLFxuXHRcdFx0ZnJhZ21lbnQgPSBjb25maWcudGVtcGxhdGUsXG5cdFx0XHR0eXBlID0gY29uZmlnLnR5cGUsXG5cdFx0XHRjdXN0b21UYWJJZCA9IEN1c3RvbVRhYklEKGNvbmZpZy5rZXkgfHwgXCJcIik7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRpdGxlLFxuXHRcdFx0ZnJhZ21lbnQsXG5cdFx0XHR0eXBlLFxuXHRcdFx0Y3VzdG9tVGFiSWRcblx0XHR9O1xuXHR9XG59O1xuXG5jb25zdCBnZXRWaWV3cyA9IGZ1bmN0aW9uKFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHRzZXR0aW5nc1ZpZXdzOiBNdWx0aXBsZVZpZXdzQ29uZmlndXJhdGlvbiB8IHVuZGVmaW5lZFxuKTogTGlzdFJlcG9ydFZpZXdEZWZpbml0aW9uW10ge1xuXHRsZXQgdmlld0NvbnZlcnRlckNvbmZpZ3M6IFZpZXdDb252ZXJ0ZXJTZXR0aW5nc1tdID0gW107XG5cdGlmIChzZXR0aW5nc1ZpZXdzKSB7XG5cdFx0c2V0dGluZ3NWaWV3cy5wYXRocy5mb3JFYWNoKChwYXRoOiBWaWV3UGF0aENvbmZpZ3VyYXRpb24gfCBDdXN0b21WaWV3VGVtcGxhdGVDb25maWd1cmF0aW9uKSA9PiB7XG5cdFx0XHRpZiAoY29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdFdyYXBwZXIoKS5oYXNNdWx0aXBsZVZpc3VhbGl6YXRpb25zKHBhdGggYXMgVmlld1BhdGhDb25maWd1cmF0aW9uKSkge1xuXHRcdFx0XHRpZiAoc2V0dGluZ3NWaWV3cy5wYXRocy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQUxQIGZsYXZvciBjYW5ub3QgaGF2ZSBtdWx0aXBsZSB2aWV3c1wiKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRwYXRoID0gcGF0aCBhcyBDb21iaW5lZFZpZXdQYXRoQ29uZmlndXJhdGlvbjtcblx0XHRcdFx0XHR2aWV3Q29udmVydGVyQ29uZmlncy5wdXNoKHtcblx0XHRcdFx0XHRcdGNvbnZlcnRlckNvbnRleHQ6IGNvbnZlcnRlckNvbnRleHQsXG5cdFx0XHRcdFx0XHRwcmltYXJ5OiBwYXRoLnByaW1hcnksXG5cdFx0XHRcdFx0XHRzZWNvbmRhcnk6IHBhdGguc2Vjb25kYXJ5LFxuXHRcdFx0XHRcdFx0ZGVmYXVsdFBhdGg6IHBhdGguZGVmYXVsdFBhdGhcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICgocGF0aCBhcyBDdXN0b21WaWV3Q29uZmlndXJhdGlvbikudGVtcGxhdGUpIHtcblx0XHRcdFx0cGF0aCA9IHBhdGggYXMgQ3VzdG9tVmlld0NvbmZpZ3VyYXRpb247XG5cdFx0XHRcdHZpZXdDb252ZXJ0ZXJDb25maWdzLnB1c2goe1xuXHRcdFx0XHRcdGtleTogcGF0aC5rZXksXG5cdFx0XHRcdFx0bGFiZWw6IHBhdGgubGFiZWwsXG5cdFx0XHRcdFx0dGVtcGxhdGU6IHBhdGgudGVtcGxhdGUsXG5cdFx0XHRcdFx0dHlwZTogXCJDdXN0b21cIlxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHBhdGggPSBwYXRoIGFzIFNpbmdsZVZpZXdQYXRoQ29uZmlndXJhdGlvbjtcblx0XHRcdFx0Y29uc3QgbWFuaWZlc3RXcmFwcGVyID0gY29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdFdyYXBwZXIoKSxcblx0XHRcdFx0XHR2aWV3Q29udmVydGVyQ29udGV4dCA9IGNvbnZlcnRlckNvbnRleHQuZ2V0Q29udmVydGVyQ29udGV4dEZvcihcblx0XHRcdFx0XHRcdHBhdGguY29udGV4dFBhdGggfHwgKHBhdGguZW50aXR5U2V0ICYmIFwiL1wiICsgcGF0aC5lbnRpdHlTZXQpIHx8IGNvbnZlcnRlckNvbnRleHQuZ2V0Q29udGV4dFBhdGgoKVxuXHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0ZW50aXR5VHlwZSA9IHZpZXdDb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGUoKTtcblxuXHRcdFx0XHRpZiAoZW50aXR5VHlwZSAmJiB2aWV3Q29udmVydGVyQ29udGV4dCkge1xuXHRcdFx0XHRcdGNvbnN0IGFubm90YXRpb25QYXRoID0gbWFuaWZlc3RXcmFwcGVyLmdldERlZmF1bHRUZW1wbGF0ZUFubm90YXRpb25QYXRoKCk7XG5cdFx0XHRcdFx0bGV0IGFubm90YXRpb247XG5cdFx0XHRcdFx0Y29uc3QgcmVzb2x2ZWRUYXJnZXQgPSB2aWV3Q29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlQW5ub3RhdGlvbihwYXRoLmFubm90YXRpb25QYXRoKTtcblx0XHRcdFx0XHRjb25zdCB0YXJnZXRBbm5vdGF0aW9uID0gcmVzb2x2ZWRUYXJnZXQuYW5ub3RhdGlvbiBhcyBEYXRhVmlzdWFsaXphdGlvbkFubm90YXRpb25zO1xuXHRcdFx0XHRcdGNvbnN0IHJlc29sdmVkVGFyZ2V0Y29udmVydGVyQ29udGV4dCA9IHJlc29sdmVkVGFyZ2V0LmNvbnZlcnRlckNvbnRleHQ7XG5cdFx0XHRcdFx0aWYgKHRhcmdldEFubm90YXRpb24pIHtcblx0XHRcdFx0XHRcdGlmICh0YXJnZXRBbm5vdGF0aW9uLnRlcm0gPT09IFVJQW5ub3RhdGlvblRlcm1zLlNlbGVjdGlvblZhcmlhbnQpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGFubm90YXRpb25QYXRoKSB7XG5cdFx0XHRcdFx0XHRcdFx0YW5ub3RhdGlvbiA9IGdldFNlbGVjdGlvblByZXNlbnRhdGlvblZhcmlhbnQoXG5cdFx0XHRcdFx0XHRcdFx0XHR2aWV3Q29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKCksXG5cdFx0XHRcdFx0XHRcdFx0XHRhbm5vdGF0aW9uUGF0aCxcblx0XHRcdFx0XHRcdFx0XHRcdHJlc29sdmVkVGFyZ2V0Y29udmVydGVyQ29udGV4dFxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0YW5ub3RhdGlvbiA9IGdldERlZmF1bHRMaW5lSXRlbSh2aWV3Q29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKCkpIGFzIExpbmVJdGVtO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRhbm5vdGF0aW9uID0gdGFyZ2V0QW5ub3RhdGlvbjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHZpZXdDb252ZXJ0ZXJDb25maWdzLnB1c2goe1xuXHRcdFx0XHRcdFx0XHRjb252ZXJ0ZXJDb250ZXh0OiB2aWV3Q29udmVydGVyQ29udGV4dCxcblx0XHRcdFx0XHRcdFx0YW5ub3RhdGlvbixcblx0XHRcdFx0XHRcdFx0YW5ub3RhdGlvblBhdGg6IHBhdGguYW5ub3RhdGlvblBhdGgsXG5cdFx0XHRcdFx0XHRcdGtlZXBQcmV2aW91c1ByZXNvbmFsaXphdGlvbjogcGF0aC5rZWVwUHJldmlvdXNQcmVzb25hbGl6YXRpb24sXG5cdFx0XHRcdFx0XHRcdGtleTogcGF0aC5rZXlcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBUT0RPIERpYWdub3N0aWNzIG1lc3NhZ2Vcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnN0IGVudGl0eVR5cGUgPSBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGUoKTtcblx0XHRpZiAoY29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSA9PT0gVGVtcGxhdGVUeXBlLkFuYWx5dGljYWxMaXN0UGFnZSkge1xuXHRcdFx0dmlld0NvbnZlcnRlckNvbmZpZ3MgPSBnZXRBbHBWaWV3Q29uZmlnKGNvbnZlcnRlckNvbnRleHQsIHZpZXdDb252ZXJ0ZXJDb25maWdzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmlld0NvbnZlcnRlckNvbmZpZ3MucHVzaCh7XG5cdFx0XHRcdGFubm90YXRpb246IGdldENvbXBsaWFudFZpc3VhbGl6YXRpb25Bbm5vdGF0aW9uKGVudGl0eVR5cGUsIGNvbnZlcnRlckNvbnRleHQsIGZhbHNlKSxcblx0XHRcdFx0Y29udmVydGVyQ29udGV4dDogY29udmVydGVyQ29udGV4dFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB2aWV3Q29udmVydGVyQ29uZmlncy5tYXAodmlld0NvbnZlcnRlckNvbmZpZyA9PiB7XG5cdFx0cmV0dXJuIGdldFZpZXcodmlld0NvbnZlcnRlckNvbmZpZyk7XG5cdH0pO1xufTtcblxuZnVuY3Rpb24gZ2V0QWxwVmlld0NvbmZpZyhjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LCB2aWV3Q29uZmlnczogVmlld0NvbnZlcnRlclNldHRpbmdzW10pOiBWaWV3Q29udmVydGVyU2V0dGluZ3NbXSB7XG5cdGNvbnN0IGVudGl0eVR5cGUgPSBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGUoKTtcblx0Y29uc3QgYW5ub3RhdGlvbiA9IGdldENvbXBsaWFudFZpc3VhbGl6YXRpb25Bbm5vdGF0aW9uKGVudGl0eVR5cGUsIGNvbnZlcnRlckNvbnRleHQsIHRydWUpO1xuXHRsZXQgY2hhcnQsIHRhYmxlO1xuXHRpZiAoYW5ub3RhdGlvbikge1xuXHRcdHZpZXdDb25maWdzLnB1c2goe1xuXHRcdFx0YW5ub3RhdGlvbjogYW5ub3RhdGlvbixcblx0XHRcdGNvbnZlcnRlckNvbnRleHRcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHRjaGFydCA9IGdldERlZmF1bHRDaGFydChlbnRpdHlUeXBlKTtcblx0XHR0YWJsZSA9IGdldERlZmF1bHRMaW5lSXRlbShlbnRpdHlUeXBlKTtcblx0XHRpZiAoY2hhcnQgJiYgdGFibGUpIHtcblx0XHRcdGNvbnN0IHByaW1hcnk6IFNpbmdsZVZpZXdQYXRoQ29uZmlndXJhdGlvbltdID0gW3sgYW5ub3RhdGlvblBhdGg6IGNoYXJ0LnRlcm0gfV07XG5cdFx0XHRjb25zdCBzZWNvbmRhcnk6IFNpbmdsZVZpZXdQYXRoQ29uZmlndXJhdGlvbltdID0gW3sgYW5ub3RhdGlvblBhdGg6IHRhYmxlLnRlcm0gfV07XG5cdFx0XHR2aWV3Q29uZmlncy5wdXNoKHtcblx0XHRcdFx0Y29udmVydGVyQ29udGV4dDogY29udmVydGVyQ29udGV4dCxcblx0XHRcdFx0cHJpbWFyeTogcHJpbWFyeSxcblx0XHRcdFx0c2Vjb25kYXJ5OiBzZWNvbmRhcnksXG5cdFx0XHRcdGRlZmF1bHRQYXRoOiBcImJvdGhcIlxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB2aWV3Q29uZmlncztcbn1cblxuZXhwb3J0IGNvbnN0IGdldEhlYWRlckFjdGlvbnMgPSBmdW5jdGlvbihjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0KTogQmFzZUFjdGlvbltdIHtcblx0Y29uc3QgbWFuaWZlc3RXcmFwcGVyID0gY29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdFdyYXBwZXIoKTtcblx0cmV0dXJuIGluc2VydEN1c3RvbUVsZW1lbnRzKFtdLCBnZXRBY3Rpb25zRnJvbU1hbmlmZXN0KG1hbmlmZXN0V3JhcHBlci5nZXRIZWFkZXJBY3Rpb25zKCksIGNvbnZlcnRlckNvbnRleHQpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGVja0NoYXJ0RmlsdGVyQmFySWQgPSBmdW5jdGlvbih2aWV3czogTGlzdFJlcG9ydFZpZXdEZWZpbml0aW9uW10sIGZpbHRlckJhcklkOiBzdHJpbmcpIHtcblx0dmlld3MuZm9yRWFjaCh2aWV3ID0+IHtcblx0XHRpZiAoISh2aWV3IGFzIEN1c3RvbVZpZXdEZWZpbml0aW9uKS50eXBlKSB7XG5cdFx0XHRjb25zdCBwcmVzZW50YXRpb246IERhdGFWaXN1YWxpemF0aW9uRGVmaW5pdGlvbiA9ICh2aWV3IGFzIFNpbmdsZVZpZXdEZWZpbml0aW9uKS5wcmVzZW50YXRpb247XG5cdFx0XHRwcmVzZW50YXRpb24udmlzdWFsaXphdGlvbnMuZm9yRWFjaCh2aXN1YWxpemF0aW9uRGVmaW5pdGlvbiA9PiB7XG5cdFx0XHRcdGlmICh2aXN1YWxpemF0aW9uRGVmaW5pdGlvbi50eXBlID09PSBWaXN1YWxpemF0aW9uVHlwZS5DaGFydCAmJiB2aXN1YWxpemF0aW9uRGVmaW5pdGlvbi5maWx0ZXJJZCAhPT0gZmlsdGVyQmFySWQpIHtcblx0XHRcdFx0XHR2aXN1YWxpemF0aW9uRGVmaW5pdGlvbi5maWx0ZXJJZCA9IGZpbHRlckJhcklkO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBMaXN0UmVwb3J0RGVmaW5pdGlvbiBmb3IgbXVsdGlwbGUgZW50aXR5IHNldHMgKG11bHRpcGxlIHRhYmxlIG1vZGUpLlxuICpcbiAqIEBwYXJhbSBjb252ZXJ0ZXJDb250ZXh0IFRoZSBjb252ZXJ0ZXIgY29udGV4dFxuICogQHJldHVybnMge0xpc3RSZXBvcnREZWZpbml0aW9ufSBUaGUgbGlzdCByZXBvcnQgZGVmaW5pdGlvbiBiYXNlZCBvbiBhbm5vdGF0aW9uICsgbWFuaWZlc3RcbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRQYWdlID0gZnVuY3Rpb24oY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCk6IExpc3RSZXBvcnREZWZpbml0aW9uIHtcblx0Y29uc3QgZW50aXR5VHlwZSA9IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5VHlwZSgpO1xuXHRjb25zdCBzQ29udGV4dFBhdGggPSBjb252ZXJ0ZXJDb250ZXh0LmdldENvbnRleHRQYXRoKCk7XG5cblx0aWYgKCFzQ29udGV4dFBhdGgpIHtcblx0XHQvLyBJZiB3ZSBkb24ndCBoYXZlIGFuIGVudGl0eVNldCBhdCB0aGlzIHBvaW50IHdlIGhhdmUgYW4gaXNzdWUgSSdkIHNheVxuXHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFwiQW4gRW50aXR5U2V0IGlzIHJlcXVpcmVkIHRvIGJlIGFibGUgdG8gZGlzcGxheSBhIExpc3RSZXBvcnQsIHBsZWFzZSBhZGp1c3QgeW91ciBgZW50aXR5U2V0YCBwcm9wZXJ0eSB0byBwb2ludCB0byBvbmUuXCJcblx0XHQpO1xuXHR9XG5cdGNvbnN0IG1hbmlmZXN0V3JhcHBlciA9IGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RXcmFwcGVyKCk7XG5cdGNvbnN0IHZpZXdzRGVmaW5pdGlvbjogTXVsdGlwbGVWaWV3c0NvbmZpZ3VyYXRpb24gfCB1bmRlZmluZWQgPSBtYW5pZmVzdFdyYXBwZXIuZ2V0Vmlld0NvbmZpZ3VyYXRpb24oKTtcblx0Y29uc3QgaGFzTXVsdGlwbGVFbnRpdHlTZXRzID0gbWFuaWZlc3RXcmFwcGVyLmhhc011bHRpcGxlRW50aXR5U2V0cygpO1xuXHRjb25zdCB2aWV3czogTGlzdFJlcG9ydFZpZXdEZWZpbml0aW9uW10gPSBnZXRWaWV3cyhjb252ZXJ0ZXJDb250ZXh0LCB2aWV3c0RlZmluaXRpb24pO1xuXHRjb25zdCBzaG93VGFiQ291bnRzID0gdmlld3NEZWZpbml0aW9uID8gdmlld3NEZWZpbml0aW9uPy5zaG93Q291bnRzIHx8IGhhc011bHRpcGxlRW50aXR5U2V0cyA6IHVuZGVmaW5lZDsgLy8gd2l0aCBtdWx0aSBFbnRpdHlTZXRzLCB0YWIgY291bnRzIGFyZSBkaXNwbGF5ZWQgYnkgZGVmYXVsdFxuXHRjb25zdCBsclRhYmxlVmlzdWFsaXphdGlvbnMgPSBnZXRUYWJsZVZpc3VhbGl6YXRpb25zKHZpZXdzKTtcblx0Y29uc3QgbHJDaGFydFZpc3VhbGl6YXRpb25zID0gZ2V0Q2hhcnRWaXN1YWxpemF0aW9ucyh2aWV3cyk7XG5cdGNvbnN0IHNob3dQaW5uYWJsZVRvZ2dsZSA9IGxyVGFibGVWaXN1YWxpemF0aW9ucy5zb21lKHRhYmxlID0+IHRhYmxlLmNvbnRyb2wudHlwZSA9PT0gXCJSZXNwb25zaXZlVGFibGVcIik7XG5cdGxldCBzaW5nbGVUYWJsZUlkID0gXCJcIjtcblx0bGV0IHNpbmdsZUNoYXJ0SWQgPSBcIlwiO1xuXHRjb25zdCBmaWx0ZXJCYXJJZCA9IEZpbHRlckJhcklEKHNDb250ZXh0UGF0aCk7XG5cdGNvbnN0IGZpbHRlclZhcmlhbnRNYW5hZ2VtZW50SUQgPSBGaWx0ZXJWYXJpYW50TWFuYWdlbWVudElEKGZpbHRlckJhcklkKTtcblx0Y29uc3QgZmJDb25maWcgPSBtYW5pZmVzdFdyYXBwZXIuZ2V0RmlsdGVyQ29uZmlndXJhdGlvbigpO1xuXHRjb25zdCBmaWx0ZXJJbml0aWFsTGF5b3V0ID0gZmJDb25maWc/LmluaXRpYWxMYXlvdXQgIT09IHVuZGVmaW5lZCA/IGZiQ29uZmlnPy5pbml0aWFsTGF5b3V0LnRvTG93ZXJDYXNlKCkgOiBcImNvbXBhY3RcIjtcblx0Y29uc3QgZmlsdGVyTGF5b3V0ID0gZmJDb25maWc/LmxheW91dCAhPT0gdW5kZWZpbmVkID8gZmJDb25maWc/LmxheW91dC50b0xvd2VyQ2FzZSgpIDogXCJjb21wYWN0XCI7XG5cdGNvbnN0IHVzZVNlbWFudGljRGF0ZVJhbmdlID0gZmJDb25maWcudXNlU2VtYW50aWNEYXRlUmFuZ2UgIT09IHVuZGVmaW5lZCA/IGZiQ29uZmlnLnVzZVNlbWFudGljRGF0ZVJhbmdlIDogdHJ1ZTtcblxuXHRjb25zdCBvQ29uZmlnID0gZ2V0Q29udGVudEFyZWFJZChjb252ZXJ0ZXJDb250ZXh0LCB2aWV3cyk7XG5cdGlmIChvQ29uZmlnKSB7XG5cdFx0c2luZ2xlQ2hhcnRJZCA9IG9Db25maWcuY2hhcnRJZDtcblx0XHRzaW5nbGVUYWJsZUlkID0gb0NvbmZpZy50YWJsZUlkO1xuXHR9XG5cdGNvbnN0IHNlbGVjdGlvbkZpZWxkcyA9IGdldFNlbGVjdGlvbkZpZWxkcyhjb252ZXJ0ZXJDb250ZXh0LCBsclRhYmxlVmlzdWFsaXphdGlvbnMpO1xuXG5cdGNvbnN0IGhpZGVCYXNpY1NlYXJjaCA9IGdldEZpbHRlckJhcmhpZGVCYXNpY1NlYXJjaChsclRhYmxlVmlzdWFsaXphdGlvbnMsIGNvbnZlcnRlckNvbnRleHQpO1xuXHRjb25zdCBzZWxlY3Rpb25WYXJpYW50ID0gZ2V0U2VsZWN0aW9uVmFyaWFudChlbnRpdHlUeXBlLCBjb252ZXJ0ZXJDb250ZXh0KTtcblx0Y29uc3QgZGVmYXVsdFNlbWFudGljRGF0ZXM6IGFueSA9IHVzZVNlbWFudGljRGF0ZVJhbmdlXG5cdFx0PyBnZXREZWZhdWx0U2VtYW50aWNEYXRlcyhnZXRNYW5pZmVzdEZpbHRlckZpZWxkcyhlbnRpdHlUeXBlLCBjb252ZXJ0ZXJDb250ZXh0KSlcblx0XHQ6IHt9O1xuXHQvLyBTb3J0IGhlYWRlciBhY3Rpb25zIGFjY29yZGluZyB0byBwb3NpdGlvbiBhdHRyaWJ1dGVzIGluIG1hbmlmZXN0XG5cdGNvbnN0IGhlYWRlckFjdGlvbnMgPSBnZXRIZWFkZXJBY3Rpb25zKGNvbnZlcnRlckNvbnRleHQpO1xuXHRjb25zdCBoYXNNdWx0aVZpc3VhbGl6YXRpb25zOiBib29sZWFuID1cblx0XHRtYW5pZmVzdFdyYXBwZXIuaGFzTXVsdGlwbGVWaXN1YWxpemF0aW9ucygpIHx8IGNvbnZlcnRlckNvbnRleHQuZ2V0VGVtcGxhdGVUeXBlKCkgPT09IFRlbXBsYXRlVHlwZS5BbmFseXRpY2FsTGlzdFBhZ2U7XG5cdGlmIChoYXNNdWx0aXBsZUVudGl0eVNldHMpIHtcblx0XHRjaGVja0NoYXJ0RmlsdGVyQmFySWQodmlld3MsIGZpbHRlckJhcklkKTtcblx0fVxuXG5cdGNvbnN0IHZpc3VhbGl6YXRpb25JZHMgPSAgbHJUYWJsZVZpc3VhbGl6YXRpb25zLm1hcCh2aXN1YWxpemF0aW9uID0+IHtcblx0XHRyZXR1cm4gdmlzdWFsaXphdGlvbi5hbm5vdGF0aW9uLmlkO1xuXHR9KS5jb25jYXQoXG5cdGxyQ2hhcnRWaXN1YWxpemF0aW9ucy5tYXAodmlzdWFsaXphdGlvbiA9PiB7XG5cdFx0cmV0dXJuIHZpc3VhbGl6YXRpb24uaWQ7XG5cdH0pKTtcblx0Y29uc3QgdGFyZ2V0Q29udHJvbElkcyA9IFtcblx0XHRmaWx0ZXJCYXJJZCxcblx0XHQuLi4obWFuaWZlc3RXcmFwcGVyLmdldFZhcmlhbnRNYW5hZ2VtZW50KCkgIT09IFZhcmlhbnRNYW5hZ2VtZW50VHlwZS5Db250cm9sID8gdmlzdWFsaXphdGlvbklkcyA6IFtdKSxcblx0XHQuLi4oIWhhc011bHRpVmlzdWFsaXphdGlvbnMgJiYgdmlld3MubGVuZ3RoID4gMSA/IFtJY29uVGFiQmFySUQoKV0gOiBbXSlcblx0XTtcblxuXHRyZXR1cm4ge1xuXHRcdG1haW5FbnRpdHlTZXQ6IHNDb250ZXh0UGF0aCxcblx0XHRtYWluRW50aXR5VHlwZTogc0NvbnRleHRQYXRoICsgXCIvXCIsXG5cdFx0c2luZ2xlVGFibGVJZCxcblx0XHRzaW5nbGVDaGFydElkLFxuXHRcdHNob3dUYWJDb3VudHMsXG5cdFx0aGVhZGVyQWN0aW9ucyxcblx0XHRzaG93UGlubmFibGVUb2dnbGU6IHNob3dQaW5uYWJsZVRvZ2dsZSxcblx0XHRmaWx0ZXJCYXI6IHtcblx0XHRcdHNlbGVjdGlvbkZpZWxkcyxcblx0XHRcdGhpZGVCYXNpY1NlYXJjaFxuXHRcdH0sXG5cdFx0dmlld3M6IHZpZXdzLFxuXHRcdGZpbHRlckJhcklkLFxuXHRcdGZpbHRlckNvbmRpdGlvbnM6IHtcblx0XHRcdHNlbGVjdGlvblZhcmlhbnQ6IHNlbGVjdGlvblZhcmlhbnQsXG5cdFx0XHRkZWZhdWx0U2VtYW50aWNEYXRlczogZGVmYXVsdFNlbWFudGljRGF0ZXNcblx0XHR9LFxuXHRcdHZhcmlhbnRNYW5hZ2VtZW50OiB7XG5cdFx0XHRpZDogZmlsdGVyVmFyaWFudE1hbmFnZW1lbnRJRCxcblx0XHRcdHRhcmdldENvbnRyb2xJZHM6IHRhcmdldENvbnRyb2xJZHMuam9pbihcIixcIilcblx0XHR9LFxuXHRcdGlzTXVsdGlFbnRpdHlTZXRzOiBoYXNNdWx0aXBsZUVudGl0eVNldHMsXG5cdFx0aGFzTXVsdGlWaXN1YWxpemF0aW9uczogaGFzTXVsdGlWaXN1YWxpemF0aW9ucyxcblx0XHR0ZW1wbGF0ZVR5cGU6IG1hbmlmZXN0V3JhcHBlci5nZXRUZW1wbGF0ZVR5cGUoKSxcblx0XHR1c2VTZW1hbnRpY0RhdGVSYW5nZSxcblx0XHRmaWx0ZXJJbml0aWFsTGF5b3V0LFxuXHRcdGZpbHRlckxheW91dCxcblx0XHRrcGlEZWZpbml0aW9uczogZ2V0S1BJRGVmaW5pdGlvbnMoY29udmVydGVyQ29udGV4dClcblx0fTtcbn07XG5cbmZ1bmN0aW9uIGdldENvbnRlbnRBcmVhSWQoY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCwgdmlld3M6IExpc3RSZXBvcnRWaWV3RGVmaW5pdGlvbltdKTogQ29udGVudEFyZWFJRCB8IHVuZGVmaW5lZCB7XG5cdGxldCBzaW5nbGVUYWJsZUlkID0gXCJcIixcblx0XHRzaW5nbGVDaGFydElkID0gXCJcIjtcblx0aWYgKFxuXHRcdGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RXcmFwcGVyKCkuaGFzTXVsdGlwbGVWaXN1YWxpemF0aW9ucygpIHx8XG5cdFx0Y29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSA9PT0gVGVtcGxhdGVUeXBlLkFuYWx5dGljYWxMaXN0UGFnZVxuXHQpIHtcblx0XHRmb3IgKGxldCB2aWV3IG9mIHZpZXdzKSB7XG5cdFx0XHR2aWV3ID0gdmlldyBhcyBDb21iaW5lZFZpZXdEZWZpbml0aW9uO1xuXHRcdFx0aWYgKHZpZXcuY2hhcnRDb250cm9sSWQgJiYgdmlldy50YWJsZUNvbnRyb2xJZCkge1xuXHRcdFx0XHRzaW5nbGVDaGFydElkID0gdmlldy5jaGFydENvbnRyb2xJZDtcblx0XHRcdFx0c2luZ2xlVGFibGVJZCA9IHZpZXcudGFibGVDb250cm9sSWQ7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRmb3IgKGxldCB2aWV3IG9mIHZpZXdzKSB7XG5cdFx0XHR2aWV3ID0gdmlldyBhcyBTaW5nbGVWaWV3RGVmaW5pdGlvbjtcblx0XHRcdGlmICghc2luZ2xlVGFibGVJZCAmJiAodmlldyBhcyBTaW5nbGVUYWJsZVZpZXdEZWZpbml0aW9uKS50YWJsZUNvbnRyb2xJZCkge1xuXHRcdFx0XHRzaW5nbGVUYWJsZUlkID0gKHZpZXcgYXMgU2luZ2xlVGFibGVWaWV3RGVmaW5pdGlvbikudGFibGVDb250cm9sSWQgfHwgXCJcIjtcblx0XHRcdH1cblx0XHRcdGlmICghc2luZ2xlQ2hhcnRJZCAmJiAodmlldyBhcyBTaW5nbGVDaGFydFZpZXdEZWZpbml0aW9uKS5jaGFydENvbnRyb2xJZCkge1xuXHRcdFx0XHRzaW5nbGVDaGFydElkID0gKHZpZXcgYXMgU2luZ2xlQ2hhcnRWaWV3RGVmaW5pdGlvbikuY2hhcnRDb250cm9sSWQgfHwgXCJcIjtcblx0XHRcdH1cblx0XHRcdGlmIChzaW5nbGVDaGFydElkICYmIHNpbmdsZVRhYmxlSWQpIHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGlmIChzaW5nbGVUYWJsZUlkIHx8IHNpbmdsZUNoYXJ0SWQpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y2hhcnRJZDogc2luZ2xlQ2hhcnRJZCxcblx0XHRcdHRhYmxlSWQ6IHNpbmdsZVRhYmxlSWRcblx0XHR9O1xuXHR9XG5cdHJldHVybiB1bmRlZmluZWQ7XG59XG4iXX0=