/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/converters/ManifestSettings", "sap/fe/core/converters/helpers/ConfigurableObject", "sap/fe/core/converters/helpers/ID", "sap/fe/core/helpers/StableIdHelper", "sap/fe/core/helpers/BindingExpression", "sap/fe/core/formatters/FPMFormatter", "sap/fe/core/converters/helpers/BindingHelper"], function (ManifestSettings, ConfigurableObject, ID, StableIdHelper, BindingExpression, fpmFormatter, BindingHelper) {
  "use strict";

  var _exports = {};
  var bindingContextPathVisitor = BindingHelper.bindingContextPathVisitor;
  var greaterOrEqual = BindingExpression.greaterOrEqual;
  var and = BindingExpression.and;
  var ifElse = BindingExpression.ifElse;
  var equal = BindingExpression.equal;
  var resolveBindingString = BindingExpression.resolveBindingString;
  var isConstant = BindingExpression.isConstant;
  var formatResult = BindingExpression.formatResult;
  var or = BindingExpression.or;
  var compileBinding = BindingExpression.compileBinding;
  var bindingExpression = BindingExpression.bindingExpression;
  var annotationExpression = BindingExpression.annotationExpression;
  var replaceSpecialChars = StableIdHelper.replaceSpecialChars;
  var CustomActionID = ID.CustomActionID;
  var Placement = ConfigurableObject.Placement;
  var ActionType = ManifestSettings.ActionType;

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  var ButtonType;

  (function (ButtonType) {
    ButtonType["Accept"] = "Accept";
    ButtonType["Attention"] = "Attention";
    ButtonType["Back"] = "Back";
    ButtonType["Critical"] = "Critical";
    ButtonType["Default"] = "Default";
    ButtonType["Emphasized"] = "Emphasized";
    ButtonType["Ghost"] = "Ghost";
    ButtonType["Negative"] = "Negative";
    ButtonType["Neutral"] = "Neutral";
    ButtonType["Reject"] = "Reject";
    ButtonType["Success"] = "Success";
    ButtonType["Transparent"] = "Transparent";
    ButtonType["Unstyled"] = "Unstyled";
    ButtonType["Up"] = "Up";
  })(ButtonType || (ButtonType = {}));

  _exports.ButtonType = ButtonType;

  /**
   * Creates the menu action from manifest actions.
   * @param {Record<string, CustomAction>} actions The manifest definition
   * @param {BaseAction[]} aAnnotationActions The annotation actions definition
   * @param aHiddenHeaderActions
   * @returns {Record<string, CustomAction>} The actions from the manifest and the menu option that were added
   */
  function prepareMenuAction(actions, aAnnotationActions, aHiddenHeaderActions) {
    var _menuItemKeys2;

    var allActions = {};
    var menuItemKeys = [];

    var _loop = function (actionKey) {
      var manifestAction = actions[actionKey];

      if (manifestAction.type === ActionType.Menu) {
        var _manifestAction$menu$, _manifestAction$menu;

        var menuItems = [];
        var menuVisible = false;

        var _menuItemKeys = (_manifestAction$menu$ = (_manifestAction$menu = manifestAction.menu) === null || _manifestAction$menu === void 0 ? void 0 : _manifestAction$menu.map(function (menuKey) {
          var _action, _action2, _action3;

          var action = aAnnotationActions.find(function (action) {
            return action.key === menuKey;
          });

          if (!action) {
            action = actions[menuKey];
          }

          if (((_action = action) !== null && _action !== void 0 && _action.visible || ((_action2 = action) === null || _action2 === void 0 ? void 0 : _action2.type) === ActionType.DataFieldForAction || ((_action3 = action) === null || _action3 === void 0 ? void 0 : _action3.type) === ActionType.DataFieldForIntentBasedNavigation) && !aHiddenHeaderActions.find(function (hiddenAction) {
            return hiddenAction.key === menuKey;
          })) {
            menuVisible = compileBinding(or(resolveBindingString(action.visible, "boolean"), resolveBindingString(menuVisible, "boolean")));
            menuItems.push(action);
          }

          return menuKey;
        })) !== null && _manifestAction$menu$ !== void 0 ? _manifestAction$menu$ : []; // Show menu button if it has one or more then 1 items visible


        if (menuItems.length) {
          manifestAction.visible = menuVisible;
          manifestAction.menu = menuItems;
        } else {
          _menuItemKeys = [actionKey];
        }

        menuItemKeys = [].concat(_toConsumableArray(menuItemKeys), _toConsumableArray(_menuItemKeys));
      }

      if (aHiddenHeaderActions.find(function (hiddenAction) {
        return hiddenAction.key === actionKey;
      })) {
        manifestAction.visible = false;
      }

      allActions[actionKey] = manifestAction;
    };

    for (var actionKey in actions) {
      _loop(actionKey);
    } // eslint-disable-next-line no-unused-expressions


    (_menuItemKeys2 = menuItemKeys) === null || _menuItemKeys2 === void 0 ? void 0 : _menuItemKeys2.forEach(function (actionKey) {
      return delete allActions[actionKey];
    });
    return allActions;
  }

  var removeDuplicateActions = function (actions) {
    var oMenuItemKeys = {};
    actions.forEach(function (action) {
      var _action$menu;

      if (action !== null && action !== void 0 && (_action$menu = action.menu) !== null && _action$menu !== void 0 && _action$menu.length) {
        action.menu.reduce(function (item, _ref) {
          var key = _ref.key;

          if (key && !item[key]) {
            item[key] = true;
          }

          return item;
        }, oMenuItemKeys);
      }
    });
    return actions.filter(function (action) {
      return !oMenuItemKeys[action.key];
    });
  };
  /**
   * Retrieves an action default value based on its kind.
   *
   * Default property value for custom actions if not overwritten in manifest.
   * @param {ManifestAction} manifestAction The action configured in the manifest
   * @param {boolean} isAnnotationAction Whether the action, defined in manifest, corresponds to an existing annotation action.
   * @param converterContext
   * @returns {BindingExpression<string> | string | boolean} Determined property value for the column
   */


  _exports.removeDuplicateActions = removeDuplicateActions;

  var _getManifestEnabled = function (manifestAction, isAnnotationAction, converterContext) {
    if (isAnnotationAction && manifestAction.enabled === undefined) {
      // If annotation action has no property defined in manifest,
      // do not overwrite it with manifest action's default value.
      return undefined;
    } // Return what is defined in manifest.


    return getManifestActionEnablement(manifestAction, converterContext);
  };
  /**
   * Creates the action configuration based on the manifest settings.
   * @param {Record<string, ManifestAction> | undefined} manifestActions The manifest actions
   * @param converterContext The converter context
   * @param {BaseAction[]} aAnnotationActions The annotation actions definition
   * @param {NavigationSettingsConfiguration} navigationSettings The navigation settings
   * @param {boolean} considerNavigationSettings The navigation settings to be considered
   * @param {BaseAction[]} aHiddenHeaderActions The hidden header actions
   * @param {string} facetName The facet where an action is displayed if it is inline
   * @returns {Record<string, CustomAction>} The actions from the manifest
   */


  function getActionsFromManifest(manifestActions, converterContext, aAnnotationActions, navigationSettings, considerNavigationSettings, aHiddenHeaderActions, facetName) {
    var actions = {};

    var _loop2 = function (actionKey) {
      var _manifestAction$press, _manifestAction$posit, _manifestAction$menu2;

      var manifestAction = manifestActions[actionKey];
      var lastDotIndex = ((_manifestAction$press = manifestAction.press) === null || _manifestAction$press === void 0 ? void 0 : _manifestAction$press.lastIndexOf(".")) || -1; // To identify the annotation action property overwrite via manifest use-case.

      var isAnnotationAction = (aAnnotationActions === null || aAnnotationActions === void 0 ? void 0 : aAnnotationActions.some(function (action) {
        return action.key === actionKey;
      })) || false;

      if (manifestAction.facetName) {
        facetName = manifestAction.facetName;
      }

      actions[actionKey] = {
        id: aAnnotationActions !== null && aAnnotationActions !== void 0 && aAnnotationActions.some(function (action) {
          return action.key === actionKey;
        }) ? actionKey : CustomActionID(actionKey),
        visible: manifestAction.visible === undefined ? "true" : manifestAction.visible,
        enabled: _getManifestEnabled(manifestAction, isAnnotationAction, converterContext),
        handlerModule: manifestAction.press && manifestAction.press.substring(0, lastDotIndex).replace(/\./gi, "/"),
        handlerMethod: manifestAction.press && manifestAction.press.substring(lastDotIndex + 1),
        press: manifestAction.press,
        text: manifestAction.text,
        noWrap: manifestAction.__noWrap,
        key: replaceSpecialChars(actionKey),
        enableOnSelect: manifestAction.enableOnSelect,
        defaultValuesExtensionFunction: manifestAction.defaultValuesFunction,
        position: {
          anchor: (_manifestAction$posit = manifestAction.position) === null || _manifestAction$posit === void 0 ? void 0 : _manifestAction$posit.anchor,
          placement: manifestAction.position === undefined ? Placement.After : manifestAction.position.placement
        },
        isNavigable: isActionNavigable(manifestAction, navigationSettings, considerNavigationSettings),
        requiresSelection: manifestAction.requiresSelection === undefined ? false : manifestAction.requiresSelection,
        enableAutoScroll: enableAutoScroll(manifestAction),
        menu: (_manifestAction$menu2 = manifestAction.menu) !== null && _manifestAction$menu2 !== void 0 ? _manifestAction$menu2 : [],
        facetName: manifestAction.inline ? facetName : undefined
      }; // Do not override the 'type' given in an annotation action

      if (!isAnnotationAction) {
        actions[actionKey].type = manifestAction.menu ? ActionType.Menu : ActionType.Default;
      }
    };

    for (var actionKey in manifestActions) {
      _loop2(actionKey);
    }

    return prepareMenuAction(actions, aAnnotationActions !== null && aAnnotationActions !== void 0 ? aAnnotationActions : [], aHiddenHeaderActions !== null && aHiddenHeaderActions !== void 0 ? aHiddenHeaderActions : []);
  }

  _exports.getActionsFromManifest = getActionsFromManifest;

  function getManifestActionEnablement(manifestAction, converterContext) {
    var resolvedBinding = resolveBindingString(manifestAction.enabled, "boolean");
    var result;

    if (isConstant(resolvedBinding) && resolvedBinding.value === undefined) {
      // No enabled property configured in manifest for the custom action --> enable custom action
      result = true;
    } else if (isConstant(resolvedBinding) && typeof resolvedBinding.value === "boolean") {
      // true / false
      result = resolvedBinding.value;
    } else if (resolvedBinding._type !== "EmbeddedBinding" && resolvedBinding._type !== "EmbeddedExpressionBinding") {
      // Then it's a module-method reference "sap.xxx.yyy.doSomething"
      var methodPath = resolvedBinding.value;
      result = formatResult([bindingExpression("/", "$view"), methodPath, bindingExpression("selectedContexts", "internal")], fpmFormatter.customIsEnabledCheck, converterContext.getEntityType());
    } else {
      // then it's a binding
      result = resolvedBinding;
    } // Consider requiresSelection property to include selectedContexts in the binding expression


    return compileBinding(ifElse(manifestAction.requiresSelection === true, and(greaterOrEqual(bindingExpression("numberOfSelectedContexts", "internal"), 1), result), result));
  }
  /**
   * Method to determine the value of the 'enabled' property of an annotation-based action.
   *
   * @param {ConverterContext} converterContext The instance of the converter context
   * @param {Action} actionTarget The instance of the action
   * @returns {BindingExpression<boolean>} The binding expression for the 'enabled' property of the action button.
   */


  function getEnabledForAnnotationAction(converterContext, actionTarget) {
    var _actionTarget$paramet;

    if ((actionTarget === null || actionTarget === void 0 ? void 0 : actionTarget.isBound) !== true) {
      return true;
    }
    /*
       FIXME Disable failing music tests
    	Currently on CAP the following binding (which is the good one) generates error:
    if (actionTarget?.annotations.Core?.OperationAvailable === null) {
    	const unboundActionName = actionTarget.fullyQualifiedName.split("(")[0];
    	return "{= !${#" + unboundActionName + "} ? false : true } }";
    }
    	CAP tries to read the action as property and doesn't find it
    */


    if (actionTarget !== null && actionTarget !== void 0 && (_actionTarget$paramet = actionTarget.parameters) !== null && _actionTarget$paramet !== void 0 && _actionTarget$paramet.length) {
      var _actionTarget$annotat, _actionTarget$annotat2;

      var bindingParameterFullName = actionTarget === null || actionTarget === void 0 ? void 0 : actionTarget.parameters[0].fullyQualifiedName,
          operationAvailableExpression = annotationExpression(actionTarget === null || actionTarget === void 0 ? void 0 : (_actionTarget$annotat = actionTarget.annotations.Core) === null || _actionTarget$annotat === void 0 ? void 0 : _actionTarget$annotat.OperationAvailable, [], undefined, function (path) {
        return bindingContextPathVisitor(path, converterContext, bindingParameterFullName);
      });

      if ((actionTarget === null || actionTarget === void 0 ? void 0 : (_actionTarget$annotat2 = actionTarget.annotations.Core) === null || _actionTarget$annotat2 === void 0 ? void 0 : _actionTarget$annotat2.OperationAvailable) !== undefined) {
        return compileBinding(equal(operationAvailableExpression, true));
      }
    }

    return true;
  }

  _exports.getEnabledForAnnotationAction = getEnabledForAnnotationAction;

  function getSemanticObjectMapping(aMappings) {
    var aSemanticObjectMappings = [];
    aMappings.forEach(function (oMapping) {
      var oSOMapping = {
        "LocalProperty": {
          "$PropertyPath": oMapping.LocalProperty.value
        },
        "SemanticObjectProperty": oMapping.SemanticObjectProperty
      };
      aSemanticObjectMappings.push(oSOMapping);
    });
    return aSemanticObjectMappings;
  }

  _exports.getSemanticObjectMapping = getSemanticObjectMapping;

  function isActionNavigable(action, navigationSettings, considerNavigationSettings) {
    var _action$afterExecutio, _action$afterExecutio2;

    var bIsNavigationConfigured = true;

    if (considerNavigationSettings) {
      var detailOrDisplay = navigationSettings && (navigationSettings.detail || navigationSettings.display);
      bIsNavigationConfigured = detailOrDisplay !== null && detailOrDisplay !== void 0 && detailOrDisplay.route ? true : false;
    } // when enableAutoScroll is true the navigateToInstance feature is disabled


    if (action && action.afterExecution && (((_action$afterExecutio = action.afterExecution) === null || _action$afterExecutio === void 0 ? void 0 : _action$afterExecutio.navigateToInstance) === false || ((_action$afterExecutio2 = action.afterExecution) === null || _action$afterExecutio2 === void 0 ? void 0 : _action$afterExecutio2.enableAutoScroll) === true) || !bIsNavigationConfigured) {
      return false;
    }

    return true;
  }

  _exports.isActionNavigable = isActionNavigable;

  function enableAutoScroll(action) {
    var _action$afterExecutio3;

    return (action === null || action === void 0 ? void 0 : (_action$afterExecutio3 = action.afterExecution) === null || _action$afterExecutio3 === void 0 ? void 0 : _action$afterExecutio3.enableAutoScroll) === true;
  }

  _exports.enableAutoScroll = enableAutoScroll;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFjdGlvbi50cyJdLCJuYW1lcyI6WyJCdXR0b25UeXBlIiwicHJlcGFyZU1lbnVBY3Rpb24iLCJhY3Rpb25zIiwiYUFubm90YXRpb25BY3Rpb25zIiwiYUhpZGRlbkhlYWRlckFjdGlvbnMiLCJhbGxBY3Rpb25zIiwibWVudUl0ZW1LZXlzIiwiYWN0aW9uS2V5IiwibWFuaWZlc3RBY3Rpb24iLCJ0eXBlIiwiQWN0aW9uVHlwZSIsIk1lbnUiLCJtZW51SXRlbXMiLCJtZW51VmlzaWJsZSIsIl9tZW51SXRlbUtleXMiLCJtZW51IiwibWFwIiwibWVudUtleSIsImFjdGlvbiIsImZpbmQiLCJrZXkiLCJ2aXNpYmxlIiwiRGF0YUZpZWxkRm9yQWN0aW9uIiwiRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uIiwiaGlkZGVuQWN0aW9uIiwiY29tcGlsZUJpbmRpbmciLCJvciIsInJlc29sdmVCaW5kaW5nU3RyaW5nIiwicHVzaCIsImxlbmd0aCIsImZvckVhY2giLCJyZW1vdmVEdXBsaWNhdGVBY3Rpb25zIiwib01lbnVJdGVtS2V5cyIsInJlZHVjZSIsIml0ZW0iLCJmaWx0ZXIiLCJfZ2V0TWFuaWZlc3RFbmFibGVkIiwiaXNBbm5vdGF0aW9uQWN0aW9uIiwiY29udmVydGVyQ29udGV4dCIsImVuYWJsZWQiLCJ1bmRlZmluZWQiLCJnZXRNYW5pZmVzdEFjdGlvbkVuYWJsZW1lbnQiLCJnZXRBY3Rpb25zRnJvbU1hbmlmZXN0IiwibWFuaWZlc3RBY3Rpb25zIiwibmF2aWdhdGlvblNldHRpbmdzIiwiY29uc2lkZXJOYXZpZ2F0aW9uU2V0dGluZ3MiLCJmYWNldE5hbWUiLCJsYXN0RG90SW5kZXgiLCJwcmVzcyIsImxhc3RJbmRleE9mIiwic29tZSIsImlkIiwiQ3VzdG9tQWN0aW9uSUQiLCJoYW5kbGVyTW9kdWxlIiwic3Vic3RyaW5nIiwicmVwbGFjZSIsImhhbmRsZXJNZXRob2QiLCJ0ZXh0Iiwibm9XcmFwIiwiX19ub1dyYXAiLCJyZXBsYWNlU3BlY2lhbENoYXJzIiwiZW5hYmxlT25TZWxlY3QiLCJkZWZhdWx0VmFsdWVzRXh0ZW5zaW9uRnVuY3Rpb24iLCJkZWZhdWx0VmFsdWVzRnVuY3Rpb24iLCJwb3NpdGlvbiIsImFuY2hvciIsInBsYWNlbWVudCIsIlBsYWNlbWVudCIsIkFmdGVyIiwiaXNOYXZpZ2FibGUiLCJpc0FjdGlvbk5hdmlnYWJsZSIsInJlcXVpcmVzU2VsZWN0aW9uIiwiZW5hYmxlQXV0b1Njcm9sbCIsImlubGluZSIsIkRlZmF1bHQiLCJyZXNvbHZlZEJpbmRpbmciLCJyZXN1bHQiLCJpc0NvbnN0YW50IiwidmFsdWUiLCJfdHlwZSIsIm1ldGhvZFBhdGgiLCJmb3JtYXRSZXN1bHQiLCJiaW5kaW5nRXhwcmVzc2lvbiIsImZwbUZvcm1hdHRlciIsImN1c3RvbUlzRW5hYmxlZENoZWNrIiwiZ2V0RW50aXR5VHlwZSIsImlmRWxzZSIsImFuZCIsImdyZWF0ZXJPckVxdWFsIiwiZ2V0RW5hYmxlZEZvckFubm90YXRpb25BY3Rpb24iLCJhY3Rpb25UYXJnZXQiLCJpc0JvdW5kIiwicGFyYW1ldGVycyIsImJpbmRpbmdQYXJhbWV0ZXJGdWxsTmFtZSIsImZ1bGx5UXVhbGlmaWVkTmFtZSIsIm9wZXJhdGlvbkF2YWlsYWJsZUV4cHJlc3Npb24iLCJhbm5vdGF0aW9uRXhwcmVzc2lvbiIsImFubm90YXRpb25zIiwiQ29yZSIsIk9wZXJhdGlvbkF2YWlsYWJsZSIsInBhdGgiLCJiaW5kaW5nQ29udGV4dFBhdGhWaXNpdG9yIiwiZXF1YWwiLCJnZXRTZW1hbnRpY09iamVjdE1hcHBpbmciLCJhTWFwcGluZ3MiLCJhU2VtYW50aWNPYmplY3RNYXBwaW5ncyIsIm9NYXBwaW5nIiwib1NPTWFwcGluZyIsIkxvY2FsUHJvcGVydHkiLCJTZW1hbnRpY09iamVjdFByb3BlcnR5IiwiYklzTmF2aWdhdGlvbkNvbmZpZ3VyZWQiLCJkZXRhaWxPckRpc3BsYXkiLCJkZXRhaWwiLCJkaXNwbGF5Iiwicm91dGUiLCJhZnRlckV4ZWN1dGlvbiIsIm5hdmln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dkIsTUFBOEMsS0FBOUMsSUFBdUQsMkJBQUFsRyxNQUFNLENBQUNpRyxjQUFQLGtGQUF1QjNDLGdCQUF2QixNQUE0QyxJQUZwRyxDQUFELElBR0EsQ0FBQ3NDLHVCQUpGLEVBS0U7QUFDRCxhQUFPLEtBQVA7QUFDQTs7QUFDRCxXQUFPLElBQVA7QUFDQTs7OztBQUVNLFdBQVN0QyxnQkFBVCxDQUEwQnRELE1BQTFCLEVBQTJEO0FBQUE7O0FBQ2pFLFdBQU8sQ0FBQUEsTUFBTSxTQUFOLElBQUFBLE1BQU0sV0FBTixzQ0FBQUEsTUFBTSxDQUFFaUcsY0FBUixrRkFBd0IzQyxnQkFBeEIsTUFBNkMsSUFBcEQ7QUFDQSIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzXCI7XG5pbXBvcnQgeyBBY3Rpb25UeXBlLCBNYW5pZmVzdEFjdGlvbiwgTmF2aWdhdGlvblNldHRpbmdzQ29uZmlndXJhdGlvbiwgTWFuaWZlc3RUYWJsZUNvbHVtbiB9IGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL01hbmlmZXN0U2V0dGluZ3NcIjtcbmltcG9ydCB7IENvbmZpZ3VyYWJsZU9iamVjdCwgQ3VzdG9tRWxlbWVudCwgUGxhY2VtZW50IH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9Db25maWd1cmFibGVPYmplY3RcIjtcbmltcG9ydCB7IEN1c3RvbUFjdGlvbklEIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9JRFwiO1xuaW1wb3J0IHsgcmVwbGFjZVNwZWNpYWxDaGFycyB9IGZyb20gXCJzYXAvZmUvY29yZS9oZWxwZXJzL1N0YWJsZUlkSGVscGVyXCI7XG5pbXBvcnQge1xuXHRhbm5vdGF0aW9uRXhwcmVzc2lvbixcblx0YmluZGluZ0V4cHJlc3Npb24sXG5cdEJpbmRpbmdFeHByZXNzaW9uLFxuXHRjb21waWxlQmluZGluZyxcblx0b3IsXG5cdGZvcm1hdFJlc3VsdCxcblx0aXNDb25zdGFudCxcblx0cmVzb2x2ZUJpbmRpbmdTdHJpbmcsXG5cdGVxdWFsLFxuXHRCaW5kaW5nRXhwcmVzc2lvbkV4cHJlc3Npb24sXG5cdGlmRWxzZSxcblx0YW5kLFxuXHRncmVhdGVyT3JFcXVhbFxufSBmcm9tIFwic2FwL2ZlL2NvcmUvaGVscGVycy9CaW5kaW5nRXhwcmVzc2lvblwiO1xuaW1wb3J0IGZwbUZvcm1hdHRlciBmcm9tIFwic2FwL2ZlL2NvcmUvZm9ybWF0dGVycy9GUE1Gb3JtYXR0ZXJcIjtcbmltcG9ydCBDb252ZXJ0ZXJDb250ZXh0IGZyb20gXCIuLi8uLi9Db252ZXJ0ZXJDb250ZXh0XCI7XG5pbXBvcnQgeyBiaW5kaW5nQ29udGV4dFBhdGhWaXNpdG9yIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9CaW5kaW5nSGVscGVyXCI7XG5cbmV4cG9ydCBlbnVtIEJ1dHRvblR5cGUge1xuXHRBY2NlcHQgPSBcIkFjY2VwdFwiLFxuXHRBdHRlbnRpb24gPSBcIkF0dGVudGlvblwiLFxuXHRCYWNrID0gXCJCYWNrXCIsXG5cdENyaXRpY2FsID0gXCJDcml0aWNhbFwiLFxuXHREZWZhdWx0ID0gXCJEZWZhdWx0XCIsXG5cdEVtcGhhc2l6ZWQgPSBcIkVtcGhhc2l6ZWRcIixcblx0R2hvc3QgPSBcIkdob3N0XCIsXG5cdE5lZ2F0aXZlID0gXCJOZWdhdGl2ZVwiLFxuXHROZXV0cmFsID0gXCJOZXV0cmFsXCIsXG5cdFJlamVjdCA9IFwiUmVqZWN0XCIsXG5cdFN1Y2Nlc3MgPSBcIlN1Y2Nlc3NcIixcblx0VHJhbnNwYXJlbnQgPSBcIlRyYW5zcGFyZW50XCIsXG5cdFVuc3R5bGVkID0gXCJVbnN0eWxlZFwiLFxuXHRVcCA9IFwiVXBcIlxufVxuXG5leHBvcnQgdHlwZSBCYXNlQWN0aW9uID0gQ29uZmlndXJhYmxlT2JqZWN0ICYge1xuXHRpZD86IHN0cmluZztcblx0dGV4dD86IHN0cmluZztcblx0dHlwZT86IEFjdGlvblR5cGU7XG5cdHByZXNzPzogc3RyaW5nO1xuXHRlbmFibGVkPzogQmluZGluZ0V4cHJlc3Npb248Ym9vbGVhbj47XG5cdHZpc2libGU/OiBCaW5kaW5nRXhwcmVzc2lvbjxib29sZWFuPjtcblx0ZW5hYmxlT25TZWxlY3Q/OiBzdHJpbmc7XG5cdGRlZmF1bHRWYWx1ZXNFeHRlbnNpb25GdW5jdGlvbj86IHN0cmluZztcblx0aXNOYXZpZ2FibGU/OiBib29sZWFuO1xuXHRlbmFibGVBdXRvU2Nyb2xsPzogYm9vbGVhbjtcblx0cmVxdWlyZXNEaWFsb2c/OiBzdHJpbmc7XG5cdGJpbmRpbmc/OiBzdHJpbmc7XG5cdGJ1dHRvblR5cGU/OiBCdXR0b25UeXBlLkdob3N0IHwgQnV0dG9uVHlwZS5UcmFuc3BhcmVudCB8IHN0cmluZztcblx0cGFyZW50RW50aXR5RGVsZXRlRW5hYmxlZD86IEJpbmRpbmdFeHByZXNzaW9uPGJvb2xlYW4+O1xuXHRtZW51PzogKHN0cmluZyB8IEN1c3RvbUFjdGlvbiB8IEJhc2VBY3Rpb24pW107XG5cdGZhY2V0TmFtZT86IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIEFubm90YXRpb25BY3Rpb24gPSBCYXNlQWN0aW9uICYge1xuXHR0eXBlOiBBY3Rpb25UeXBlLkRhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvbiB8IEFjdGlvblR5cGUuRGF0YUZpZWxkRm9yQWN0aW9uO1xuXHRhbm5vdGF0aW9uUGF0aDogc3RyaW5nO1xuXHRpZD86IHN0cmluZztcblx0Y3VzdG9tRGF0YT86IHN0cmluZztcbn07XG5cbi8qKlxuICogRGVmaW5pdGlvbiBmb3IgY3VzdG9tIGFjdGlvbnNcbiAqXG4gKiBAdHlwZWRlZiBDdXN0b21BY3Rpb25cbiAqL1xuZXhwb3J0IHR5cGUgQ3VzdG9tQWN0aW9uID0gQ3VzdG9tRWxlbWVudDxcblx0QmFzZUFjdGlvbiAmIHtcblx0XHR0eXBlPzogQWN0aW9uVHlwZS5EZWZhdWx0IHwgQWN0aW9uVHlwZS5NZW51O1xuXHRcdGhhbmRsZXJNZXRob2Q/OiBzdHJpbmc7XG5cdFx0aGFuZGxlck1vZHVsZT86IHN0cmluZztcblx0XHRtZW51PzogKHN0cmluZyB8IEN1c3RvbUFjdGlvbiB8IEJhc2VBY3Rpb24pW107XG5cdFx0bm9XcmFwPzogYm9vbGVhbjsgLy8gSW5kaWNhdGVzIHRoYXQgd2Ugd2FudCB0byBhdm9pZCB0aGUgd3JhcHBpbmcgZnJvbSB0aGUgRlBNSGVscGVyXG5cdFx0cmVxdWlyZXNTZWxlY3Rpb24/OiBib29sZWFuO1xuXHR9XG4+O1xuXG4vLyBSZXVzZSBvZiBDb25maWd1cmFibGVPYmplY3QgYW5kIEN1c3RvbUVsZW1lbnQgaXMgZG9uZSBmb3Igb3JkZXJpbmdcbmV4cG9ydCB0eXBlIENvbnZlcnRlckFjdGlvbiA9IEFubm90YXRpb25BY3Rpb24gfCBDdXN0b21BY3Rpb247XG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgbWVudSBhY3Rpb24gZnJvbSBtYW5pZmVzdCBhY3Rpb25zLlxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBDdXN0b21BY3Rpb24+fSBhY3Rpb25zIFRoZSBtYW5pZmVzdCBkZWZpbml0aW9uXG4gKiBAcGFyYW0ge0Jhc2VBY3Rpb25bXX0gYUFubm90YXRpb25BY3Rpb25zIFRoZSBhbm5vdGF0aW9uIGFjdGlvbnMgZGVmaW5pdGlvblxuICogQHBhcmFtIGFIaWRkZW5IZWFkZXJBY3Rpb25zXG4gKiBAcmV0dXJucyB7UmVjb3JkPHN0cmluZywgQ3VzdG9tQWN0aW9uPn0gVGhlIGFjdGlvbnMgZnJvbSB0aGUgbWFuaWZlc3QgYW5kIHRoZSBtZW51IG9wdGlvbiB0aGF0IHdlcmUgYWRkZWRcbiAqL1xuZnVuY3Rpb24gcHJlcGFyZU1lbnVBY3Rpb24oXG5cdGFjdGlvbnM6IFJlY29yZDxzdHJpbmcsIEN1c3RvbUFjdGlvbj4sXG5cdGFBbm5vdGF0aW9uQWN0aW9uczogQmFzZUFjdGlvbltdLFxuXHRhSGlkZGVuSGVhZGVyQWN0aW9uczogQmFzZUFjdGlvbltdXG4pOiBSZWNvcmQ8c3RyaW5nLCBDdXN0b21BY3Rpb24+IHtcblx0Y29uc3QgYWxsQWN0aW9uczogUmVjb3JkPHN0cmluZywgQ3VzdG9tQWN0aW9uPiA9IHt9O1xuXHRsZXQgbWVudUl0ZW1LZXlzOiBzdHJpbmdbXSB8IHVuZGVmaW5lZCA9IFtdO1xuXG5cdGZvciAoY29uc3QgYWN0aW9uS2V5IGluIGFjdGlvbnMpIHtcblx0XHRjb25zdCBtYW5pZmVzdEFjdGlvbjogQ3VzdG9tQWN0aW9uID0gYWN0aW9uc1thY3Rpb25LZXldO1xuXHRcdGlmIChtYW5pZmVzdEFjdGlvbi50eXBlID09PSBBY3Rpb25UeXBlLk1lbnUpIHtcblx0XHRcdGNvbnN0IG1lbnVJdGVtczogKEN1c3RvbUFjdGlvbiB8IEJhc2VBY3Rpb24pW10gPSBbXTtcblx0XHRcdGxldCBtZW51VmlzaWJsZTogYW55ID0gZmFsc2U7XG5cdFx0XHRsZXQgX21lbnVJdGVtS2V5cyA9XG5cdFx0XHRcdG1hbmlmZXN0QWN0aW9uLm1lbnU/Lm1hcCgobWVudUtleTogc3RyaW5nIHwgQ3VzdG9tQWN0aW9uKSA9PiB7XG5cdFx0XHRcdFx0bGV0IGFjdGlvbjogQmFzZUFjdGlvbiB8IEN1c3RvbUFjdGlvbiB8IHVuZGVmaW5lZCA9IGFBbm5vdGF0aW9uQWN0aW9ucy5maW5kKFxuXHRcdFx0XHRcdFx0KGFjdGlvbjogQmFzZUFjdGlvbikgPT4gYWN0aW9uLmtleSA9PT0gbWVudUtleVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0aWYgKCFhY3Rpb24pIHtcblx0XHRcdFx0XHRcdGFjdGlvbiA9IGFjdGlvbnNbbWVudUtleSBhcyBzdHJpbmddO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdChhY3Rpb24/LnZpc2libGUgfHxcblx0XHRcdFx0XHRcdFx0YWN0aW9uPy50eXBlID09PSBBY3Rpb25UeXBlLkRhdGFGaWVsZEZvckFjdGlvbiB8fFxuXHRcdFx0XHRcdFx0XHRhY3Rpb24/LnR5cGUgPT09IEFjdGlvblR5cGUuRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uKSAmJlxuXHRcdFx0XHRcdFx0IWFIaWRkZW5IZWFkZXJBY3Rpb25zLmZpbmQoaGlkZGVuQWN0aW9uID0+IGhpZGRlbkFjdGlvbi5rZXkgPT09IG1lbnVLZXkpXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRtZW51VmlzaWJsZSA9IGNvbXBpbGVCaW5kaW5nKFxuXHRcdFx0XHRcdFx0XHRvcihyZXNvbHZlQmluZGluZ1N0cmluZygoYWN0aW9uIGFzIGFueSkudmlzaWJsZSwgXCJib29sZWFuXCIpLCByZXNvbHZlQmluZGluZ1N0cmluZyhtZW51VmlzaWJsZSwgXCJib29sZWFuXCIpKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdG1lbnVJdGVtcy5wdXNoKGFjdGlvbik7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIG1lbnVLZXkgYXMgc3RyaW5nO1xuXHRcdFx0XHR9KSA/PyBbXTtcblxuXHRcdFx0Ly8gU2hvdyBtZW51IGJ1dHRvbiBpZiBpdCBoYXMgb25lIG9yIG1vcmUgdGhlbiAxIGl0ZW1zIHZpc2libGVcblx0XHRcdGlmIChtZW51SXRlbXMubGVuZ3RoKSB7XG5cdFx0XHRcdG1hbmlmZXN0QWN0aW9uLnZpc2libGUgPSBtZW51VmlzaWJsZTtcblx0XHRcdFx0bWFuaWZlc3RBY3Rpb24ubWVudSA9IG1lbnVJdGVtcztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdF9tZW51SXRlbUtleXMgPSBbYWN0aW9uS2V5XTtcblx0XHRcdH1cblxuXHRcdFx0bWVudUl0ZW1LZXlzID0gWy4uLm1lbnVJdGVtS2V5cywgLi4uX21lbnVJdGVtS2V5c107XG5cdFx0fVxuXHRcdGlmIChhSGlkZGVuSGVhZGVyQWN0aW9ucy5maW5kKGhpZGRlbkFjdGlvbiA9PiBoaWRkZW5BY3Rpb24ua2V5ID09PSBhY3Rpb25LZXkpKSB7XG5cdFx0XHRtYW5pZmVzdEFjdGlvbi52aXNpYmxlID0gZmFsc2U7XG5cdFx0fVxuXHRcdGFsbEFjdGlvbnNbYWN0aW9uS2V5XSA9IG1hbmlmZXN0QWN0aW9uO1xuXHR9XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuXHRtZW51SXRlbUtleXM/LmZvckVhY2goKGFjdGlvbktleTogc3RyaW5nKSA9PiBkZWxldGUgYWxsQWN0aW9uc1thY3Rpb25LZXldKTtcblx0cmV0dXJuIGFsbEFjdGlvbnM7XG59XG5cbmV4cG9ydCBjb25zdCByZW1vdmVEdXBsaWNhdGVBY3Rpb25zID0gKGFjdGlvbnM6IEJhc2VBY3Rpb25bXSk6IEJhc2VBY3Rpb25bXSA9PiB7XG5cdGNvbnN0IG9NZW51SXRlbUtleXM6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fTtcblx0YWN0aW9ucy5mb3JFYWNoKGFjdGlvbiA9PiB7XG5cdFx0aWYgKGFjdGlvbj8ubWVudT8ubGVuZ3RoKSB7XG5cdFx0XHRhY3Rpb24ubWVudS5yZWR1Y2UoKGl0ZW0sIHsga2V5IH06IGFueSkgPT4ge1xuXHRcdFx0XHRpZiAoa2V5ICYmICFpdGVtW2tleV0pIHtcblx0XHRcdFx0XHRpdGVtW2tleV0gPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBpdGVtO1xuXHRcdFx0fSwgb01lbnVJdGVtS2V5cyk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIGFjdGlvbnMuZmlsdGVyKGFjdGlvbiA9PiAhb01lbnVJdGVtS2V5c1thY3Rpb24ua2V5XSk7XG59O1xuXG4vKipcbiAqIFJldHJpZXZlcyBhbiBhY3Rpb24gZGVmYXVsdCB2YWx1ZSBiYXNlZCBvbiBpdHMga2luZC5cbiAqXG4gKiBEZWZhdWx0IHByb3BlcnR5IHZhbHVlIGZvciBjdXN0b20gYWN0aW9ucyBpZiBub3Qgb3ZlcndyaXR0ZW4gaW4gbWFuaWZlc3QuXG4gKiBAcGFyYW0ge01hbmlmZXN0QWN0aW9ufSBtYW5pZmVzdEFjdGlvbiBUaGUgYWN0aW9uIGNvbmZpZ3VyZWQgaW4gdGhlIG1hbmlmZXN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzQW5ub3RhdGlvbkFjdGlvbiBXaGV0aGVyIHRoZSBhY3Rpb24sIGRlZmluZWQgaW4gbWFuaWZlc3QsIGNvcnJlc3BvbmRzIHRvIGFuIGV4aXN0aW5nIGFubm90YXRpb24gYWN0aW9uLlxuICogQHBhcmFtIGNvbnZlcnRlckNvbnRleHRcbiAqIEByZXR1cm5zIHtCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+IHwgc3RyaW5nIHwgYm9vbGVhbn0gRGV0ZXJtaW5lZCBwcm9wZXJ0eSB2YWx1ZSBmb3IgdGhlIGNvbHVtblxuICovXG5jb25zdCBfZ2V0TWFuaWZlc3RFbmFibGVkID0gZnVuY3Rpb24oXG5cdG1hbmlmZXN0QWN0aW9uOiBNYW5pZmVzdEFjdGlvbixcblx0aXNBbm5vdGF0aW9uQWN0aW9uOiBib29sZWFuLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0XG4pOiBCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+IHwgc3RyaW5nIHwgYm9vbGVhbiB7XG5cdGlmIChpc0Fubm90YXRpb25BY3Rpb24gJiYgbWFuaWZlc3RBY3Rpb24uZW5hYmxlZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0Ly8gSWYgYW5ub3RhdGlvbiBhY3Rpb24gaGFzIG5vIHByb3BlcnR5IGRlZmluZWQgaW4gbWFuaWZlc3QsXG5cdFx0Ly8gZG8gbm90IG92ZXJ3cml0ZSBpdCB3aXRoIG1hbmlmZXN0IGFjdGlvbidzIGRlZmF1bHQgdmFsdWUuXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXHQvLyBSZXR1cm4gd2hhdCBpcyBkZWZpbmVkIGluIG1hbmlmZXN0LlxuXHRyZXR1cm4gZ2V0TWFuaWZlc3RBY3Rpb25FbmFibGVtZW50KG1hbmlmZXN0QWN0aW9uLCBjb252ZXJ0ZXJDb250ZXh0KTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgYWN0aW9uIGNvbmZpZ3VyYXRpb24gYmFzZWQgb24gdGhlIG1hbmlmZXN0IHNldHRpbmdzLlxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBNYW5pZmVzdEFjdGlvbj4gfCB1bmRlZmluZWR9IG1hbmlmZXN0QWN0aW9ucyBUaGUgbWFuaWZlc3QgYWN0aW9uc1xuICogQHBhcmFtIGNvbnZlcnRlckNvbnRleHQgVGhlIGNvbnZlcnRlciBjb250ZXh0XG4gKiBAcGFyYW0ge0Jhc2VBY3Rpb25bXX0gYUFubm90YXRpb25BY3Rpb25zIFRoZSBhbm5vdGF0aW9uIGFjdGlvbnMgZGVmaW5pdGlvblxuICogQHBhcmFtIHtOYXZpZ2F0aW9uU2V0dGluZ3NDb25maWd1cmF0aW9ufSBuYXZpZ2F0aW9uU2V0dGluZ3MgVGhlIG5hdmlnYXRpb24gc2V0dGluZ3NcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gY29uc2lkZXJOYXZpZ2F0aW9uU2V0dGluZ3MgVGhlIG5hdmlnYXRpb24gc2V0dGluZ3MgdG8gYmUgY29uc2lkZXJlZFxuICogQHBhcmFtIHtCYXNlQWN0aW9uW119IGFIaWRkZW5IZWFkZXJBY3Rpb25zIFRoZSBoaWRkZW4gaGVhZGVyIGFjdGlvbnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBmYWNldE5hbWUgVGhlIGZhY2V0IHdoZXJlIGFuIGFjdGlvbiBpcyBkaXNwbGF5ZWQgaWYgaXQgaXMgaW5saW5lXG4gKiBAcmV0dXJucyB7UmVjb3JkPHN0cmluZywgQ3VzdG9tQWN0aW9uPn0gVGhlIGFjdGlvbnMgZnJvbSB0aGUgbWFuaWZlc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGlvbnNGcm9tTWFuaWZlc3QoXG5cdG1hbmlmZXN0QWN0aW9uczogUmVjb3JkPHN0cmluZywgTWFuaWZlc3RBY3Rpb24+IHwgdW5kZWZpbmVkLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHRhQW5ub3RhdGlvbkFjdGlvbnM/OiBCYXNlQWN0aW9uW10sXG5cdG5hdmlnYXRpb25TZXR0aW5ncz86IE5hdmlnYXRpb25TZXR0aW5nc0NvbmZpZ3VyYXRpb24sXG5cdGNvbnNpZGVyTmF2aWdhdGlvblNldHRpbmdzPzogYm9vbGVhbixcblx0YUhpZGRlbkhlYWRlckFjdGlvbnM/OiBCYXNlQWN0aW9uW10sXG5cdGZhY2V0TmFtZT86IHN0cmluZ1xuKTogUmVjb3JkPHN0cmluZywgQ3VzdG9tQWN0aW9uPiB7XG5cdGNvbnN0IGFjdGlvbnM6IFJlY29yZDxzdHJpbmcsIEN1c3RvbUFjdGlvbj4gPSB7fTtcblx0Zm9yIChjb25zdCBhY3Rpb25LZXkgaW4gbWFuaWZlc3RBY3Rpb25zKSB7XG5cdFx0Y29uc3QgbWFuaWZlc3RBY3Rpb246IE1hbmlmZXN0QWN0aW9uID0gbWFuaWZlc3RBY3Rpb25zW2FjdGlvbktleV07XG5cdFx0Y29uc3QgbGFzdERvdEluZGV4ID0gbWFuaWZlc3RBY3Rpb24ucHJlc3M/Lmxhc3RJbmRleE9mKFwiLlwiKSB8fCAtMTtcblxuXHRcdC8vIFRvIGlkZW50aWZ5IHRoZSBhbm5vdGF0aW9uIGFjdGlvbiBwcm9wZXJ0eSBvdmVyd3JpdGUgdmlhIG1hbmlmZXN0IHVzZS1jYXNlLlxuXHRcdGNvbnN0IGlzQW5ub3RhdGlvbkFjdGlvbiA9IGFBbm5vdGF0aW9uQWN0aW9ucz8uc29tZShhY3Rpb24gPT4gYWN0aW9uLmtleSA9PT0gYWN0aW9uS2V5KSB8fCBmYWxzZTtcblx0XHRpZiAobWFuaWZlc3RBY3Rpb24uZmFjZXROYW1lKSB7XG5cdFx0XHRmYWNldE5hbWUgPSBtYW5pZmVzdEFjdGlvbi5mYWNldE5hbWU7XG5cdFx0fVxuXG5cdFx0YWN0aW9uc1thY3Rpb25LZXldID0ge1xuXHRcdFx0aWQ6IGFBbm5vdGF0aW9uQWN0aW9ucz8uc29tZShhY3Rpb24gPT4gYWN0aW9uLmtleSA9PT0gYWN0aW9uS2V5KSA/IGFjdGlvbktleSA6IEN1c3RvbUFjdGlvbklEKGFjdGlvbktleSksXG5cdFx0XHR2aXNpYmxlOiBtYW5pZmVzdEFjdGlvbi52aXNpYmxlID09PSB1bmRlZmluZWQgPyBcInRydWVcIiA6IG1hbmlmZXN0QWN0aW9uLnZpc2libGUsXG5cdFx0XHRlbmFibGVkOiBfZ2V0TWFuaWZlc3RFbmFibGVkKG1hbmlmZXN0QWN0aW9uLCBpc0Fubm90YXRpb25BY3Rpb24sIGNvbnZlcnRlckNvbnRleHQpLFxuXHRcdFx0aGFuZGxlck1vZHVsZTogbWFuaWZlc3RBY3Rpb24ucHJlc3MgJiYgbWFuaWZlc3RBY3Rpb24ucHJlc3Muc3Vic3RyaW5nKDAsIGxhc3REb3RJbmRleCkucmVwbGFjZSgvXFwuL2dpLCBcIi9cIiksXG5cdFx0XHRoYW5kbGVyTWV0aG9kOiBtYW5pZmVzdEFjdGlvbi5wcmVzcyAmJiBtYW5pZmVzdEFjdGlvbi5wcmVzcy5zdWJzdHJpbmcobGFzdERvdEluZGV4ICsgMSksXG5cdFx0XHRwcmVzczogbWFuaWZlc3RBY3Rpb24ucHJlc3MsXG5cdFx0XHR0ZXh0OiBtYW5pZmVzdEFjdGlvbi50ZXh0LFxuXHRcdFx0bm9XcmFwOiBtYW5pZmVzdEFjdGlvbi5fX25vV3JhcCxcblx0XHRcdGtleTogcmVwbGFjZVNwZWNpYWxDaGFycyhhY3Rpb25LZXkpLFxuXHRcdFx0ZW5hYmxlT25TZWxlY3Q6IG1hbmlmZXN0QWN0aW9uLmVuYWJsZU9uU2VsZWN0LFxuXHRcdFx0ZGVmYXVsdFZhbHVlc0V4dGVuc2lvbkZ1bmN0aW9uOiBtYW5pZmVzdEFjdGlvbi5kZWZhdWx0VmFsdWVzRnVuY3Rpb24sXG5cdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRhbmNob3I6IG1hbmlmZXN0QWN0aW9uLnBvc2l0aW9uPy5hbmNob3IsXG5cdFx0XHRcdHBsYWNlbWVudDogbWFuaWZlc3RBY3Rpb24ucG9zaXRpb24gPT09IHVuZGVmaW5lZCA/IFBsYWNlbWVudC5BZnRlciA6IG1hbmlmZXN0QWN0aW9uLnBvc2l0aW9uLnBsYWNlbWVudFxuXHRcdFx0fSxcblx0XHRcdGlzTmF2aWdhYmxlOiBpc0FjdGlvbk5hdmlnYWJsZShtYW5pZmVzdEFjdGlvbiwgbmF2aWdhdGlvblNldHRpbmdzLCBjb25zaWRlck5hdmlnYXRpb25TZXR0aW5ncyksXG5cdFx0XHRyZXF1aXJlc1NlbGVjdGlvbjogbWFuaWZlc3RBY3Rpb24ucmVxdWlyZXNTZWxlY3Rpb24gPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogbWFuaWZlc3RBY3Rpb24ucmVxdWlyZXNTZWxlY3Rpb24sXG5cdFx0XHRlbmFibGVBdXRvU2Nyb2xsOiBlbmFibGVBdXRvU2Nyb2xsKG1hbmlmZXN0QWN0aW9uKSxcblx0XHRcdG1lbnU6IG1hbmlmZXN0QWN0aW9uLm1lbnUgPz8gW10sXG5cdFx0XHRmYWNldE5hbWU6IG1hbmlmZXN0QWN0aW9uLmlubGluZSA/IGZhY2V0TmFtZSA6IHVuZGVmaW5lZFxuXHRcdH07XG5cdFx0Ly8gRG8gbm90IG92ZXJyaWRlIHRoZSAndHlwZScgZ2l2ZW4gaW4gYW4gYW5ub3RhdGlvbiBhY3Rpb25cblx0XHRpZiAoIWlzQW5ub3RhdGlvbkFjdGlvbikge1xuXHRcdFx0YWN0aW9uc1thY3Rpb25LZXldLnR5cGUgPSBtYW5pZmVzdEFjdGlvbi5tZW51ID8gQWN0aW9uVHlwZS5NZW51IDogQWN0aW9uVHlwZS5EZWZhdWx0O1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcHJlcGFyZU1lbnVBY3Rpb24oYWN0aW9ucywgYUFubm90YXRpb25BY3Rpb25zID8/IFtdLCBhSGlkZGVuSGVhZGVyQWN0aW9ucyA/PyBbXSk7XG59XG5cbmZ1bmN0aW9uIGdldE1hbmlmZXN0QWN0aW9uRW5hYmxlbWVudChtYW5pZmVzdEFjdGlvbjogTWFuaWZlc3RBY3Rpb24sIGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQpIHtcblx0Y29uc3QgcmVzb2x2ZWRCaW5kaW5nID0gcmVzb2x2ZUJpbmRpbmdTdHJpbmcobWFuaWZlc3RBY3Rpb24uZW5hYmxlZCBhcyBzdHJpbmcsIFwiYm9vbGVhblwiKTtcblx0bGV0IHJlc3VsdDogYW55O1xuXHRpZiAoaXNDb25zdGFudChyZXNvbHZlZEJpbmRpbmcpICYmIHJlc29sdmVkQmluZGluZy52YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0Ly8gTm8gZW5hYmxlZCBwcm9wZXJ0eSBjb25maWd1cmVkIGluIG1hbmlmZXN0IGZvciB0aGUgY3VzdG9tIGFjdGlvbiAtLT4gZW5hYmxlIGN1c3RvbSBhY3Rpb25cblx0XHRyZXN1bHQgPSB0cnVlO1xuXHR9IGVsc2UgaWYgKGlzQ29uc3RhbnQocmVzb2x2ZWRCaW5kaW5nKSAmJiB0eXBlb2YgcmVzb2x2ZWRCaW5kaW5nLnZhbHVlID09PSBcImJvb2xlYW5cIikge1xuXHRcdC8vIHRydWUgLyBmYWxzZVxuXHRcdHJlc3VsdCA9IHJlc29sdmVkQmluZGluZy52YWx1ZTtcblx0fSBlbHNlIGlmIChyZXNvbHZlZEJpbmRpbmcuX3R5cGUgIT09IFwiRW1iZWRkZWRCaW5kaW5nXCIgJiYgcmVzb2x2ZWRCaW5kaW5nLl90eXBlICE9PSBcIkVtYmVkZGVkRXhwcmVzc2lvbkJpbmRpbmdcIikge1xuXHRcdC8vIFRoZW4gaXQncyBhIG1vZHVsZS1tZXRob2QgcmVmZXJlbmNlIFwic2FwLnh4eC55eXkuZG9Tb21ldGhpbmdcIlxuXHRcdGNvbnN0IG1ldGhvZFBhdGggPSByZXNvbHZlZEJpbmRpbmcudmFsdWUgYXMgc3RyaW5nO1xuXHRcdHJlc3VsdCA9IGZvcm1hdFJlc3VsdChcblx0XHRcdFtiaW5kaW5nRXhwcmVzc2lvbihcIi9cIiwgXCIkdmlld1wiKSwgbWV0aG9kUGF0aCwgYmluZGluZ0V4cHJlc3Npb24oXCJzZWxlY3RlZENvbnRleHRzXCIsIFwiaW50ZXJuYWxcIildLFxuXHRcdFx0ZnBtRm9ybWF0dGVyLmN1c3RvbUlzRW5hYmxlZENoZWNrIGFzIGFueSxcblx0XHRcdGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5VHlwZSgpXG5cdFx0KTtcblx0fSBlbHNlIHtcblx0XHQvLyB0aGVuIGl0J3MgYSBiaW5kaW5nXG5cdFx0cmVzdWx0ID0gcmVzb2x2ZWRCaW5kaW5nO1xuXHR9XG5cblx0Ly8gQ29uc2lkZXIgcmVxdWlyZXNTZWxlY3Rpb24gcHJvcGVydHkgdG8gaW5jbHVkZSBzZWxlY3RlZENvbnRleHRzIGluIHRoZSBiaW5kaW5nIGV4cHJlc3Npb25cblx0cmV0dXJuIGNvbXBpbGVCaW5kaW5nKFxuXHRcdGlmRWxzZShcblx0XHRcdG1hbmlmZXN0QWN0aW9uLnJlcXVpcmVzU2VsZWN0aW9uID09PSB0cnVlLFxuXHRcdFx0YW5kKGdyZWF0ZXJPckVxdWFsKGJpbmRpbmdFeHByZXNzaW9uKFwibnVtYmVyT2ZTZWxlY3RlZENvbnRleHRzXCIsIFwiaW50ZXJuYWxcIiksIDEpLCByZXN1bHQpLFxuXHRcdFx0cmVzdWx0XG5cdFx0KVxuXHQpO1xufVxuXG4vKipcbiAqIE1ldGhvZCB0byBkZXRlcm1pbmUgdGhlIHZhbHVlIG9mIHRoZSAnZW5hYmxlZCcgcHJvcGVydHkgb2YgYW4gYW5ub3RhdGlvbi1iYXNlZCBhY3Rpb24uXG4gKlxuICogQHBhcmFtIHtDb252ZXJ0ZXJDb250ZXh0fSBjb252ZXJ0ZXJDb250ZXh0IFRoZSBpbnN0YW5jZSBvZiB0aGUgY29udmVydGVyIGNvbnRleHRcbiAqIEBwYXJhbSB7QWN0aW9ufSBhY3Rpb25UYXJnZXQgVGhlIGluc3RhbmNlIG9mIHRoZSBhY3Rpb25cbiAqIEByZXR1cm5zIHtCaW5kaW5nRXhwcmVzc2lvbjxib29sZWFuPn0gVGhlIGJpbmRpbmcgZXhwcmVzc2lvbiBmb3IgdGhlICdlbmFibGVkJyBwcm9wZXJ0eSBvZiB0aGUgYWN0aW9uIGJ1dHRvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEVuYWJsZWRGb3JBbm5vdGF0aW9uQWN0aW9uKFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHRhY3Rpb25UYXJnZXQ6IEFjdGlvbiB8IHVuZGVmaW5lZFxuKTogQmluZGluZ0V4cHJlc3Npb248Ym9vbGVhbj4ge1xuXHRpZiAoYWN0aW9uVGFyZ2V0Py5pc0JvdW5kICE9PSB0cnVlKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0Lypcblx0ICAgRklYTUUgRGlzYWJsZSBmYWlsaW5nIG11c2ljIHRlc3RzXG5cdFx0Q3VycmVudGx5IG9uIENBUCB0aGUgZm9sbG93aW5nIGJpbmRpbmcgKHdoaWNoIGlzIHRoZSBnb29kIG9uZSkgZ2VuZXJhdGVzIGVycm9yOlxuXHRpZiAoYWN0aW9uVGFyZ2V0Py5hbm5vdGF0aW9ucy5Db3JlPy5PcGVyYXRpb25BdmFpbGFibGUgPT09IG51bGwpIHtcblx0XHRjb25zdCB1bmJvdW5kQWN0aW9uTmFtZSA9IGFjdGlvblRhcmdldC5mdWxseVF1YWxpZmllZE5hbWUuc3BsaXQoXCIoXCIpWzBdO1xuXHRcdHJldHVybiBcIns9ICEkeyNcIiArIHVuYm91bmRBY3Rpb25OYW1lICsgXCJ9ID8gZmFsc2UgOiB0cnVlIH0gfVwiO1xuXHR9XG5cdFx0Q0FQIHRyaWVzIHRvIHJlYWQgdGhlIGFjdGlvbiBhcyBwcm9wZXJ0eSBhbmQgZG9lc24ndCBmaW5kIGl0XG5cdCovXG5cdGlmIChhY3Rpb25UYXJnZXQ/LnBhcmFtZXRlcnM/Lmxlbmd0aCkge1xuXHRcdGNvbnN0IGJpbmRpbmdQYXJhbWV0ZXJGdWxsTmFtZSA9IGFjdGlvblRhcmdldD8ucGFyYW1ldGVyc1swXS5mdWxseVF1YWxpZmllZE5hbWUsXG5cdFx0XHRvcGVyYXRpb25BdmFpbGFibGVFeHByZXNzaW9uID0gYW5ub3RhdGlvbkV4cHJlc3Npb24oXG5cdFx0XHRcdGFjdGlvblRhcmdldD8uYW5ub3RhdGlvbnMuQ29yZT8uT3BlcmF0aW9uQXZhaWxhYmxlLFxuXHRcdFx0XHRbXSxcblx0XHRcdFx0dW5kZWZpbmVkLFxuXHRcdFx0XHQocGF0aDogc3RyaW5nKSA9PiBiaW5kaW5nQ29udGV4dFBhdGhWaXNpdG9yKHBhdGgsIGNvbnZlcnRlckNvbnRleHQsIGJpbmRpbmdQYXJhbWV0ZXJGdWxsTmFtZSlcblx0XHRcdCkgYXMgQmluZGluZ0V4cHJlc3Npb25FeHByZXNzaW9uPGJvb2xlYW4+O1xuXHRcdGlmIChhY3Rpb25UYXJnZXQ/LmFubm90YXRpb25zLkNvcmU/Lk9wZXJhdGlvbkF2YWlsYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gY29tcGlsZUJpbmRpbmcoZXF1YWwob3BlcmF0aW9uQXZhaWxhYmxlRXhwcmVzc2lvbiwgdHJ1ZSkpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlbWFudGljT2JqZWN0TWFwcGluZyhhTWFwcGluZ3M6IGFueVtdKTogYW55W10ge1xuXHRjb25zdCBhU2VtYW50aWNPYmplY3RNYXBwaW5nczogYW55W10gPSBbXTtcblx0YU1hcHBpbmdzLmZvckVhY2gob01hcHBpbmcgPT4ge1xuXHRcdGNvbnN0IG9TT01hcHBpbmcgPSB7XG5cdFx0XHRcIkxvY2FsUHJvcGVydHlcIjoge1xuXHRcdFx0XHRcIiRQcm9wZXJ0eVBhdGhcIjogb01hcHBpbmcuTG9jYWxQcm9wZXJ0eS52YWx1ZVxuXHRcdFx0fSxcblx0XHRcdFwiU2VtYW50aWNPYmplY3RQcm9wZXJ0eVwiOiBvTWFwcGluZy5TZW1hbnRpY09iamVjdFByb3BlcnR5XG5cdFx0fTtcblx0XHRhU2VtYW50aWNPYmplY3RNYXBwaW5ncy5wdXNoKG9TT01hcHBpbmcpO1xuXHR9KTtcblx0cmV0dXJuIGFTZW1hbnRpY09iamVjdE1hcHBpbmdzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBY3Rpb25OYXZpZ2FibGUoXG5cdGFjdGlvbjogTWFuaWZlc3RBY3Rpb24gfCBNYW5pZmVzdFRhYmxlQ29sdW1uLFxuXHRuYXZpZ2F0aW9uU2V0dGluZ3M/OiBOYXZpZ2F0aW9uU2V0dGluZ3NDb25maWd1cmF0aW9uLFxuXHRjb25zaWRlck5hdmlnYXRpb25TZXR0aW5ncz86IGJvb2xlYW5cbik6IGJvb2xlYW4ge1xuXHRsZXQgYklzTmF2aWdhdGlvbkNvbmZpZ3VyZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXHRpZiAoY29uc2lkZXJOYXZpZ2F0aW9uU2V0dGluZ3MpIHtcblx0XHRjb25zdCBkZXRhaWxPckRpc3BsYXkgPSBuYXZpZ2F0aW9uU2V0dGluZ3MgJiYgKG5hdmlnYXRpb25TZXR0aW5ncy5kZXRhaWwgfHwgbmF2aWdhdGlvblNldHRpbmdzLmRpc3BsYXkpO1xuXHRcdGJJc05hdmlnYXRpb25Db25maWd1cmVkID0gZGV0YWlsT3JEaXNwbGF5Py5yb3V0ZSA/IHRydWUgOiBmYWxzZTtcblx0fVxuXHQvLyB3aGVuIGVuYWJsZUF1dG9TY3JvbGwgaXMgdHJ1ZSB0aGUgbmF2aWdhdGVUb0luc3RhbmNlIGZlYXR1cmUgaXMgZGlzYWJsZWRcblx0aWYgKFxuXHRcdChhY3Rpb24gJiZcblx0XHRcdGFjdGlvbi5hZnRlckV4ZWN1dGlvbiAmJlxuXHRcdFx0KGFjdGlvbi5hZnRlckV4ZWN1dGlvbj8ubmF2aWdhdGVUb0luc3RhbmNlID09PSBmYWxzZSB8fCBhY3Rpb24uYWZ0ZXJFeGVjdXRpb24/LmVuYWJsZUF1dG9TY3JvbGwgPT09IHRydWUpKSB8fFxuXHRcdCFiSXNOYXZpZ2F0aW9uQ29uZmlndXJlZFxuXHQpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVBdXRvU2Nyb2xsKGFjdGlvbjogTWFuaWZlc3RBY3Rpb24pOiBib29sZWFuIHtcblx0cmV0dXJuIGFjdGlvbj8uYWZ0ZXJFeGVjdXRpb24/LmVuYWJsZUF1dG9TY3JvbGwgPT09IHRydWU7XG59XG4iXX0=