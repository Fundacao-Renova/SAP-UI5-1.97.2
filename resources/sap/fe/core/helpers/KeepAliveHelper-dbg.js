/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/Log", "sap/fe/core/helpers/ModelHelper", "sap/fe/core/helpers/KeepAliveRefreshTypes"], function (Log, ModelHelper, KeepAliveRefreshTypes) {
  "use strict";

  var PATH_TO_STORE = KeepAliveRefreshTypes.PATH_TO_STORE;
  var RefreshStrategyType = KeepAliveRefreshTypes.RefreshStrategyType;
  var getEntitySetPath = ModelHelper.getEntitySetPath;

  // Private functions - start
  var _fnSimplifyEntitySetPath = function (metaModel, entitySetPathToUse) {
    var entitySetPath = getEntitySetPath(entitySetPathToUse);
    var entitySet = entitySetPath.indexOf("$NavigationPropertyBinding") > -1 && metaModel.getObject(entitySetPath);
    return entitySet ? "/" + entitySet : entitySetPathToUse;
  };

  var _fnIsApplicable = function (primaryPath, key, strategy) {
    return primaryPath === key || strategy === RefreshStrategyType.IncludingDependents && primaryPath.startsWith(key);
  };
  /**
   * Check if given path resides in the context path provided.
   *
   * @param {ODataMetaModel} metaModel MetaModel to be used
   * @param {string} contextPath Context path to be used
   * @param {string} path Path to be used
   * @param {RefreshStrategyType} strategy Strategy, it could be 'self' | 'includingDependents'
   * @returns {boolean} Returns true if the context path is applicable.
   */


  var _isPathApplicableToContextPath = function (metaModel, contextPath, path, strategy) {
    var contextPathToCheck = contextPath.startsWith("/") ? contextPath : "/" + contextPath,
        pathToCheck = path.startsWith("/") ? path : "/" + path;

    if (!_fnIsApplicable(contextPathToCheck, pathToCheck, strategy)) {
      contextPathToCheck = _fnSimplifyEntitySetPath(metaModel, contextPathToCheck);

      if (!_fnIsApplicable(contextPathToCheck, pathToCheck, strategy)) {
        pathToCheck = _fnSimplifyEntitySetPath(metaModel, pathToCheck);
      } else {
        return true;
      }
    }

    return _fnIsApplicable(contextPathToCheck, pathToCheck, strategy);
  }; // Private functions - end

  /**
   * Get controls to refresh in a view.
   *
   * @param {View} view View of the controls
   * @param {Control[]} controls Context path to be used
   * @returns {Control[]} Returns controls that need to be refreshed.
   */


  var getControlsForRefresh = function (view, controls) {
    var controlsForRefresh = [];
    var metaModel = view.getModel().getMetaModel();
    var internalModel = view.getModel("internal");
    var refreshStrategy = internalModel.getProperty(PATH_TO_STORE) || {};

    if (controls) {
      controls.forEach(function (control) {
        var contextPath = control.data("targetCollectionPath");

        for (var key in refreshStrategy) {
          var strategy = refreshStrategy[key];

          if (controlsForRefresh.indexOf(control) === -1 && _isPathApplicableToContextPath(metaModel, contextPath, key, strategy)) {
            controlsForRefresh.push(control);
          }
        }
      });
    }

    return controlsForRefresh;
  };
  /**
   * Get refresh strategy for the control for a context path.
   *
   * @param {Control} control Control from which refresh info is needed
   * @param {string} contextPath ContextPath for properities
   * @returns {RefreshStrategyType} Returns strategy for control refresh.
   */


  var getControlRefreshStrategyForContextPath = function (control, contextPath) {
    var metaModel = control.getModel().getMetaModel();
    var internalModel = control.getModel("internal");
    var refreshStrategy = internalModel.getProperty(PATH_TO_STORE) || {};
    var strategy;

    if (contextPath) {
      for (var key in refreshStrategy) {
        var strategyToCheck = refreshStrategy[key];

        if (_isPathApplicableToContextPath(metaModel, contextPath, key, strategyToCheck)) {
          strategy = strategyToCheck;

          if (strategy === "includingDependents") {
            break;
          }
        }
      }
    }

    return strategy;
  };
  /**
   * Get refresh info from view.
   *
   * @param {View} view View from which refresh info is needed
   * @returns {RefreshStrategyType | undefined} Returns strategy for view refresh.
   */


  var getViewRefreshInfo = function (view) {
    var viewData = view.getViewData(),
        contextPath = viewData && ((viewData === null || viewData === void 0 ? void 0 : viewData.contextPath) || "/" + (viewData === null || viewData === void 0 ? void 0 : viewData.entitySet));
    return KeepAliveHelper.getControlRefreshStrategyForContextPath(view, contextPath);
  };
  /**
   * Get refresh strategy for an intent.
   *
   * @param {RefreshStrategies} refreshStrategies RefreshStrategies to consider
   * @param {string} semanticObject Outbound Semantic Object
   * @param {string} action Outbound Action
   * @returns {SORefreshStrategy | undefined} Returns refresh strategies to use for the intent.
   */


  var getRefreshStrategyForIntent = function (refreshStrategies, semanticObject, action) {
    var soAction = semanticObject && action && semanticObject + "-" + action;
    var intents = refreshStrategies.intents;
    var soActionIntentMatch = intents && soAction && intents[soAction];
    var soIntentMatch = !soActionIntentMatch && intents && semanticObject && intents[semanticObject];
    return soActionIntentMatch || soIntentMatch || (refreshStrategies === null || refreshStrategies === void 0 ? void 0 : refreshStrategies.defaultBehavior) || (refreshStrategies === null || refreshStrategies === void 0 ? void 0 : refreshStrategies._feDefault);
  };
  /**
   * Store control refresh strategy for hash in the internal model.
   *
   * @param {Control} control Control for the refresh strategy
   * @param {SOAction} hash Shell hash object
   */


  var storeControlRefreshStrategyForHash = function (control, hash) {
    if (control && control.getModel("viewData") && control.getModel("internal")) {
      var viewData = control.getModel("viewData");
      var refreshStrategies = viewData.getProperty(PATH_TO_STORE);

      if (refreshStrategies) {
        var internalModel = control.getModel("internal");
        var refreshStrategy = KeepAliveHelper.getRefreshStrategyForIntent(refreshStrategies, hash === null || hash === void 0 ? void 0 : hash.semanticObject, hash === null || hash === void 0 ? void 0 : hash.action);
        internalModel.setProperty(PATH_TO_STORE, refreshStrategy);
      }
    }
  };
  /**
   * Method to refresh and restore the view if neccessary.
   *
   * @param {object} view Control for the refresh strategy
   * @returns {object} A promise after view refresh and restore are triggered
   */


  var restoreView = function (view) {
    var internalModelContext = view.getBindingContext("internal");
    var controller = view.getController();
    var viewState = controller === null || controller === void 0 ? void 0 : controller.viewState;
    var refreshBindings = Promise.resolve();

    if (internalModelContext.getProperty("restoreStatus") === "pending") {
      if (viewState.refreshViewBindings) {
        refreshBindings = viewState.refreshViewBindings();
        refreshBindings.then(function () {
          Log.info("FE V4: Refresh was triggered successfull: " + view.getId());
        }).catch(function (err) {
          Log.warning("FE V4: Refresh was unsuccessfull: " + view.getId(), err);
        });
      }

      refreshBindings = refreshBindings.then(function () {
        viewState.onRestore();
        internalModelContext.setProperty("restoreStatus", "done");
      }).catch(function (error) {
        Log.warning("FE V4: Restore was unsuccessfull: " + view.getId(), error);
      });
    }

    return refreshBindings;
  };
  /**
   * helper class for KeepAlive feature in sap.fe.
   */


  var KeepAliveHelper = {
    getControlsForRefresh: getControlsForRefresh,
    getControlRefreshStrategyForContextPath: getControlRefreshStrategyForContextPath,
    getViewRefreshInfo: getViewRefreshInfo,
    getRefreshStrategyForIntent: getRefreshStrategyForIntent,
    storeControlRefreshStrategyForHash: storeControlRefreshStrategyForHash,
    restoreView: restoreView
  };
  return KeepAliveHelper;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIktlZXBBbGl2ZUhlbHBlci50cyJdLCJuYW1lcyI6WyJfZm5TaW1wbGlmeUVudGl0eVNldFBhdGgiLCJtZXRhTW9kZWwiLCJlbnRpdHlTZXRQYXRoVG9Vc2UiLCJlbnRpdHlTZXRQYXRoIiwiZ2V0RW50aXR5U2V0UGF0aCIsImVudGl0eVNldCIsImluZGV4T2YiLCJnZXRPYmplY3QiLCJfZm5Jc0FwcGxpY2FibGUiLCJwcmltYXJ5UGF0aCIsImtleSIsInN0cmF0ZWd5IiwiUmVmcmVzaFN0cmF0ZWd5VHlwZSIsIkluY2x1ZGluZ0RlcGVuZGVudHMiLCJzdGFydHNXaXRoIiwiX2lzUGF0aEFwcGxpY2FibGVUb0NvbnRleHRQYXRoIiwiY29udGV4dFBhdGgiLCJwYXRoIiwiY29udGV4dFBhdGhUb0NoZWNrIiwicGF0aFRvQ2hlY2siLCJnZXRDb250cm9sc0ZvclJlZnJlc2giLCJ2aWV3IiwiY29udHJvbHMiLCJjb250cm9sc0ZvclJlZnJlc2giLCJnZXRNb2RlbCIsImdldE1ldGFNb2RlbCIsImludGVybmFsTW9kZWwiLCJyZWZyZXNoU3RyYXRlZ3kiLCJnZXRQcm9wZXJ0eSIsIlBBVEhfVE9fU1RPUkUiLCJmb3JFYWNoIiwiY29udHJvbCIsImRhdGEiLCJwdXNoIiwiZ2V0Q29udHJvbFJlZnJlc2hTdHJhdGVneUZvckNvbnRleHRQYXRoIiwic3RyYXRlZ3lUb0NoZWNrIiwiZ2V0Vmlld1JlZnJlc2hJbmZvIiwidmlld0RhdGEiLCJnZXRWaWV3RGF0YSIsIktlZXBBbGl2ZUhlbHBlciIsImdldFJlZnJlc2hTdHJhdGVneUZvckludGVudCIsInJlZnJlc2hTdHJhdGVnaWVzIiwic2VtYW50aWNPYmplY3QiLCJhY3Rpb24iLCJzb0FjdGlvbiIsImludGVudHMiLCJzb0FjdGlvbkludGVudE1hdGNoIiwic29JbnRlbnRNYXRjaCIsImRlZmF1bHRCZWhhdmlvciIsIl9mZURlZmF1bHQiLCJzdG9yZUNvbnRyb2xSZWZyZXNoU3RyYXRlZ3lGb3JIYXNoIiwiaGFzaCIsInNldFByb3BlcnR5IiwicmVzdG9yZVZpZXciLCJpbnRlcm5hbE1vZGVsQ29udGV4dCIsImdldEJpbmRpbmdDb250ZXh0IiwiY29udHJvbGxlciIsImdldENvbnRyb2xsZXIiLCJ2aWV3U3RhdGUiLCJyZWZyZXNoQmluZGluZ3MiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlZnJlc2hWaWV3QmluZGluZ3MiLCJ0aGVuIiwiTG9nIiwiaW5mbyIsImdldElkIiwiY2F0Y2giLCJlcnIiLCJ3YXJuaW5nIiwib25SZXN0b3JlIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FBYUE7QUFDQSxNQUFNQSx3QkFBd0IsR0FBRyxVQUFTQyxTQUFULEVBQW9DQyxrQkFBcEMsRUFBd0U7QUFDeEcsUUFBTUMsYUFBYSxHQUFHQyxnQkFBZ0IsQ0FBQ0Ysa0JBQUQsQ0FBdEM7QUFDQSxRQUFNRyxTQUFTLEdBQUdGLGFBQWEsQ0FBQ0csT0FBZCxDQUFzQiw0QkFBdEIsSUFBc0QsQ0FBQyxDQUF2RCxJQUE0REwsU0FBUyxDQUFDTSxTQUFWLENBQW9CSixhQUFwQixDQUE5RTtBQUNBLFdBQU9FLFNBQVMsR0FBRyxNQUFNQSxTQUFULEdBQXFCSCxrQkFBckM7QUFDQSxHQUpEOztBQUtBLE1BQU1NLGVBQWUsR0FBRyxVQUFTQyxXQUFULEVBQThCQyxHQUE5QixFQUEyQ0MsUUFBM0MsRUFBbUY7QUFDMUcsV0FBT0YsV0FBVyxLQUFLQyxHQUFoQixJQUF3QkMsUUFBUSxLQUFLQyxtQkFBbUIsQ0FBQ0MsbUJBQWpDLElBQXdESixXQUFXLENBQUNLLFVBQVosQ0FBdUJKLEdBQXZCLENBQXZGO0FBQ0EsR0FGRDtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsTUFBTUssOEJBQThCLEdBQUcsVUFDdENkLFNBRHNDLEVBRXRDZSxXQUZzQyxFQUd0Q0MsSUFIc0MsRUFJdENOLFFBSnNDLEVBSzVCO0FBQ1YsUUFBSU8sa0JBQWtCLEdBQUdGLFdBQVcsQ0FBQ0Ys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QWtCLEVBQWxCQSxrQkFIdUI7QUFJdkJJLElBQUFBLDJCQUEyQixFQUEzQkEsMkJBSnVCO0FBS3ZCVSxJQUFBQSxrQ0FBa0MsRUFBbENBLGtDQUx1QjtBQU12QkcsSUFBQUEsV0FBVyxFQUFYQTtBQU51QixHQUF4QjtTQVFlZCxlIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250cm9sIH0gZnJvbSBcInNhcC91aS9jb3JlXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInNhcC91aS9jb3JlL212Y1wiO1xuaW1wb3J0IHsgTG9nIH0gZnJvbSBcInNhcC9iYXNlXCI7XG5pbXBvcnQgeyBPRGF0YU1ldGFNb2RlbCB9IGZyb20gXCJzYXAvdWkvbW9kZWwvb2RhdGEvdjRcIjtcbmltcG9ydCB7IGdldEVudGl0eVNldFBhdGggfSBmcm9tIFwic2FwL2ZlL2NvcmUvaGVscGVycy9Nb2RlbEhlbHBlclwiO1xuaW1wb3J0IHsgQmFzZU1hbmlmZXN0U2V0dGluZ3MgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9NYW5pZmVzdFNldHRpbmdzXCI7XG5pbXBvcnQgeyBKU09OTW9kZWwgfSBmcm9tIFwic2FwL3VpL21vZGVsL2pzb25cIjtcbmltcG9ydCB7XG5cdFJlZnJlc2hTdHJhdGVneVR5cGUsXG5cdFNPUmVmcmVzaFN0cmF0ZWd5LFxuXHRSZWZyZXNoU3RyYXRlZ2llcyxcblx0UEFUSF9UT19TVE9SRSxcblx0U09BY3Rpb25cbn0gZnJvbSBcInNhcC9mZS9jb3JlL2hlbHBlcnMvS2VlcEFsaXZlUmVmcmVzaFR5cGVzXCI7XG5cbi8vIFByaXZhdGUgZnVuY3Rpb25zIC0gc3RhcnRcbmNvbnN0IF9mblNpbXBsaWZ5RW50aXR5U2V0UGF0aCA9IGZ1bmN0aW9uKG1ldGFNb2RlbDogT0RhdGFNZXRhTW9kZWwsIGVudGl0eVNldFBhdGhUb1VzZTogc3RyaW5nKTogc3RyaW5nIHtcblx0Y29uc3QgZW50aXR5U2V0UGF0aCA9IGdldEVudGl0eVNldFBhdGgoZW50aXR5U2V0UGF0aFRvVXNlKTtcblx0Y29uc3QgZW50aXR5U2V0ID0gZW50aXR5U2V0UGF0aC5pbmRleE9mKFwiJE5hdmlnYXRpb25Qcm9wZXJ0eUJpbmRpbmdcIikgPiAtMSAmJiBtZXRhTW9kZWwuZ2V0T2JqZWN0KGVudGl0eVNldFBhdGgpO1xuXHRyZXR1cm4gZW50aXR5U2V0ID8gXCIvXCIgKyBlbnRpdHlTZXQgOiBlbnRpdHlTZXRQYXRoVG9Vc2U7XG59O1xuY29uc3QgX2ZuSXNBcHBsaWNhYmxlID0gZnVuY3Rpb24ocHJpbWFyeVBhdGg6IHN0cmluZywga2V5OiBzdHJpbmcsIHN0cmF0ZWd5OiBSZWZyZXNoU3RyYXRlZ3lUeXBlKTogYm9vbGVhbiB7XG5cdHJldHVybiBwcmltYXJ5UGF0aCA9PT0ga2V5IHx8IChzdHJhdGVneSA9PT0gUmVmcmVzaFN0cmF0ZWd5VHlwZS5JbmNsdWRpbmdEZXBlbmRlbnRzICYmIHByaW1hcnlQYXRoLnN0YXJ0c1dpdGgoa2V5KSk7XG59O1xuLyoqXG4gKiBDaGVjayBpZiBnaXZlbiBwYXRoIHJlc2lkZXMgaW4gdGhlIGNvbnRleHQgcGF0aCBwcm92aWRlZC5cbiAqXG4gKiBAcGFyYW0ge09EYXRhTWV0YU1vZGVsfSBtZXRhTW9kZWwgTWV0YU1vZGVsIHRvIGJlIHVzZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZXh0UGF0aCBDb250ZXh0IHBhdGggdG8gYmUgdXNlZFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggUGF0aCB0byBiZSB1c2VkXG4gKiBAcGFyYW0ge1JlZnJlc2hTdHJhdGVneVR5cGV9IHN0cmF0ZWd5IFN0cmF0ZWd5LCBpdCBjb3VsZCBiZSAnc2VsZicgfCAnaW5jbHVkaW5nRGVwZW5kZW50cydcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIGNvbnRleHQgcGF0aCBpcyBhcHBsaWNhYmxlLlxuICovXG5jb25zdCBfaXNQYXRoQXBwbGljYWJsZVRvQ29udGV4dFBhdGggPSBmdW5jdGlvbihcblx0bWV0YU1vZGVsOiBPRGF0YU1ldGFNb2RlbCxcblx0Y29udGV4dFBhdGg6IHN0cmluZyxcblx0cGF0aDogc3RyaW5nLFxuXHRzdHJhdGVneTogUmVmcmVzaFN0cmF0ZWd5VHlwZVxuKTogYm9vbGVhbiB7XG5cdGxldCBjb250ZXh0UGF0aFRvQ2hlY2sgPSBjb250ZXh0UGF0aC5zdGFydHNXaXRoKFwiL1wiKSA/IGNvbnRleHRQYXRoIDogXCIvXCIgKyBjb250ZXh0UGF0aCxcblx0XHRwYXRoVG9DaGVjayA9IHBhdGguc3RhcnRzV2l0aChcIi9cIikgPyBwYXRoIDogXCIvXCIgKyBwYXRoO1xuXHRpZiAoIV9mbklzQXBwbGljYWJsZShjb250ZXh0UGF0aFRvQ2hlY2ssIHBhdGhUb0NoZWNrLCBzdHJhdGVneSkpIHtcblx0XHRjb250ZXh0UGF0aFRvQ2hlY2sgPSBfZm5TaW1wbGlmeUVudGl0eVNldFBhdGgobWV0YU1vZGVsLCBjb250ZXh0UGF0aFRvQ2hlY2spO1xuXHRcdGlmICghX2ZuSXNBcHBsaWNhYmxlKGNvbnRleHRQYXRoVG9DaGVjaywgcGF0aFRvQ2hlY2ssIHN0cmF0ZWd5KSkge1xuXHRcdFx0cGF0aFRvQ2hlY2sgPSBfZm5TaW1wbGlmeUVudGl0eVNldFBhdGgobWV0YU1vZGVsLCBwYXRoVG9DaGVjayk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gX2ZuSXNBcHBsaWNhYmxlKGNvbnRleHRQYXRoVG9DaGVjaywgcGF0aFRvQ2hlY2ssIHN0cmF0ZWd5KTtcbn07XG4vLyBQcml2YXRlIGZ1bmN0aW9ucyAtIGVuZFxuLyoqXG4gKiBHZXQgY29udHJvbHMgdG8gcmVmcmVzaCBpbiBhIHZpZXcuXG4gKlxuICogQHBhcmFtIHtWaWV3fSB2aWV3IFZpZXcgb2YgdGhlIGNvbnRyb2xzXG4gKiBAcGFyYW0ge0NvbnRyb2xbXX0gY29udHJvbHMgQ29udGV4dCBwYXRoIHRvIGJlIHVzZWRcbiAqIEByZXR1cm5zIHtDb250cm9sW119IFJldHVybnMgY29udHJvbHMgdGhhdCBuZWVkIHRvIGJlIHJlZnJlc2hlZC5cbiAqL1xuY29uc3QgZ2V0Q29udHJvbHNGb3JSZWZyZXNoID0gZnVuY3Rpb24odmlldzogVmlldywgY29udHJvbHM6IENvbnRyb2xbXSk6IENvbnRyb2xbXSB7XG5cdGNvbnN0IGNvbnRyb2xzRm9yUmVmcmVzaDogQ29udHJvbFtdID0gW107XG5cdGNvbnN0IG1ldGFNb2RlbCA9IHZpZXcuZ2V0TW9kZWwoKS5nZXRNZXRhTW9kZWwoKSBhcyBPRGF0YU1ldGFNb2RlbDtcblx0Y29uc3QgaW50ZXJuYWxNb2RlbCA9IHZpZXcuZ2V0TW9kZWwoXCJpbnRlcm5hbFwiKTtcblx0Y29uc3QgcmVmcmVzaFN0cmF0ZWd5ID0gaW50ZXJuYWxNb2RlbC5nZXRQcm9wZXJ0eShQQVRIX1RPX1NUT1JFKSB8fCB7fTtcblx0aWYgKGNvbnRyb2xzKSB7XG5cdFx0Y29udHJvbHMuZm9yRWFjaChmdW5jdGlvbihjb250cm9sKSB7XG5cdFx0XHRjb25zdCBjb250ZXh0UGF0aCA9IGNvbnRyb2wuZGF0YShcInRhcmdldENvbGxlY3Rpb25QYXRoXCIpO1xuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gcmVmcmVzaFN0cmF0ZWd5KSB7XG5cdFx0XHRcdGNvbnN0IHN0cmF0ZWd5ID0gcmVmcmVzaFN0cmF0ZWd5W2tleV07XG5cdFx0XHRcdGlmIChjb250cm9sc0ZvclJlZnJlc2guaW5kZXhPZihjb250cm9sKSA9PT0gLTEgJiYgX2lzUGF0aEFwcGxpY2FibGVUb0NvbnRleHRQYXRoKG1ldGFNb2RlbCwgY29udGV4dFBhdGgsIGtleSwgc3RyYXRlZ3kpKSB7XG5cdFx0XHRcdFx0Y29udHJvbHNGb3JSZWZyZXNoLnB1c2goY29udHJvbCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHRyZXR1cm4gY29udHJvbHNGb3JSZWZyZXNoO1xufTtcbi8qKlxuICogR2V0IHJlZnJlc2ggc3RyYXRlZ3kgZm9yIHRoZSBjb250cm9sIGZvciBhIGNvbnRleHQgcGF0aC5cbiAqXG4gKiBAcGFyYW0ge0NvbnRyb2x9IGNvbnRyb2wgQ29udHJvbCBmcm9tIHdoaWNoIHJlZnJlc2ggaW5mbyBpcyBuZWVkZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZXh0UGF0aCBDb250ZXh0UGF0aCBmb3IgcHJvcGVyaXRpZXNcbiAqIEByZXR1cm5zIHtSZWZyZXNoU3RyYXRlZ3lUeXBlfSBSZXR1cm5zIHN0cmF0ZWd5IGZvciBjb250cm9sIHJlZnJlc2guXG4gKi9cbmNvbnN0IGdldENvbnRyb2xSZWZyZXNoU3RyYXRlZ3lGb3JDb250ZXh0UGF0aCA9IGZ1bmN0aW9uKGNvbnRyb2w6IENvbnRyb2wsIGNvbnRleHRQYXRoOiBzdHJpbmcpOiBSZWZyZXNoU3RyYXRlZ3lUeXBlIHwgdW5kZWZpbmVkIHtcblx0Y29uc3QgbWV0YU1vZGVsID0gY29udHJvbC5nZXRNb2RlbCgpLmdldE1ldGFNb2RlbCgpIGFzIE9EYXRhTWV0YU1vZGVsO1xuXHRjb25zdCBpbnRlcm5hbE1vZGVsID0gY29udHJvbC5nZXRNb2RlbChcImludGVybmFsXCIpO1xuXHRjb25zdCByZWZyZXNoU3RyYXRlZ3kgPSBpbnRlcm5hbE1vZGVsLmdldFByb3BlcnR5KFBBVEhfVE9fU1RPUkUpIHx8IHt9O1xuXHRsZXQgc3RyYXRlZ3k7XG5cdGlmIChjb250ZXh0UGF0aCkge1xuXHRcdGZvciAoY29uc3Qga2V5IGluIHJlZnJlc2hTdHJhdGVneSkge1xuXHRcdFx0Y29uc3Qgc3RyYXRlZ3lUb0NoZWNrID0gcmVmcmVzaFN0cmF0ZWd5W2tleV07XG5cdFx0XHRpZiAoX2lzUGF0aEFwcGxpY2FibGVUb0NvbnRleHRQYXRoKG1ldGFNb2RlbCwgY29udGV4dFBhdGgsIGtleSwgc3RyYXRlZ3lUb0NoZWNrKSkge1xuXHRcdFx0XHRzdHJhdGVneSA9IHN0cmF0ZWd5VG9DaGVjaztcblx0XHRcdFx0aWYgKHN0cmF0ZWd5ID09PSBcImluY2x1ZGluZ0RlcGVuZGVudHNcIikge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiBzdHJhdGVneTtcbn07XG4vKipcbiAqIEdldCByZWZyZXNoIGluZm8gZnJvbSB2aWV3LlxuICpcbiAqIEBwYXJhbSB7Vmlld30gdmlldyBWaWV3IGZyb20gd2hpY2ggcmVmcmVzaCBpbmZvIGlzIG5lZWRlZFxuICogQHJldHVybnMge1JlZnJlc2hTdHJhdGVneVR5cGUgfCB1bmRlZmluZWR9IFJldHVybnMgc3RyYXRlZ3kgZm9yIHZpZXcgcmVmcmVzaC5cbiAqL1xuY29uc3QgZ2V0Vmlld1JlZnJlc2hJbmZvID0gZnVuY3Rpb24odmlldzogVmlldyk6IFJlZnJlc2hTdHJhdGVneVR5cGUgfCB1bmRlZmluZWQge1xuXHRjb25zdCB2aWV3RGF0YSA9IHZpZXcuZ2V0Vmlld0RhdGEoKSBhcyBCYXNlTWFuaWZlc3RTZXR0aW5ncyxcblx0XHRjb250ZXh0UGF0aCA9IHZpZXdEYXRhICYmICh2aWV3RGF0YT8uY29udGV4dFBhdGggfHwgXCIvXCIgKyB2aWV3RGF0YT8uZW50aXR5U2V0KTtcblx0cmV0dXJuIEtlZXBBbGl2ZUhlbHBlci5nZXRDb250cm9sUmVmcmVzaFN0cmF0ZWd5Rm9yQ29udGV4dFBhdGgodmlldywgY29udGV4dFBhdGgpO1xufTtcblxuLyoqXG4gKiBHZXQgcmVmcmVzaCBzdHJhdGVneSBmb3IgYW4gaW50ZW50LlxuICpcbiAqIEBwYXJhbSB7UmVmcmVzaFN0cmF0ZWdpZXN9IHJlZnJlc2hTdHJhdGVnaWVzIFJlZnJlc2hTdHJhdGVnaWVzIHRvIGNvbnNpZGVyXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VtYW50aWNPYmplY3QgT3V0Ym91bmQgU2VtYW50aWMgT2JqZWN0XG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uIE91dGJvdW5kIEFjdGlvblxuICogQHJldHVybnMge1NPUmVmcmVzaFN0cmF0ZWd5IHwgdW5kZWZpbmVkfSBSZXR1cm5zIHJlZnJlc2ggc3RyYXRlZ2llcyB0byB1c2UgZm9yIHRoZSBpbnRlbnQuXG4gKi9cbmNvbnN0IGdldFJlZnJlc2hTdHJhdGVneUZvckludGVudCA9IGZ1bmN0aW9uKFxuXHRyZWZyZXNoU3RyYXRlZ2llczogUmVmcmVzaFN0cmF0ZWdpZXMsXG5cdHNlbWFudGljT2JqZWN0Pzogc3RyaW5nLFxuXHRhY3Rpb24/OiBzdHJpbmdcbik6IFNPUmVmcmVzaFN0cmF0ZWd5IHwgdW5kZWZpbmVkIHtcblx0Y29uc3Qgc29BY3Rpb24gPSBzZW1hbnRpY09iamVjdCAmJiBhY3Rpb24gJiYgc2VtYW50aWNPYmplY3QgKyBcIi1cIiArIGFjdGlvbjtcblx0Y29uc3QgaW50ZW50cyA9IHJlZnJlc2hTdHJhdGVnaWVzLmludGVudHM7XG5cdGNvbnN0IHNvQWN0aW9uSW50ZW50TWF0Y2ggPSBpbnRlbnRzICYmIHNvQWN0aW9uICYmIGludGVudHNbc29BY3Rpb25dO1xuXHRjb25zdCBzb0ludGVudE1hdGNoID0gIXNvQWN0aW9uSW50ZW50TWF0Y2ggJiYgaW50ZW50cyAmJiBzZW1hbnRpY09iamVjdCAmJiBpbnRlbnRzW3NlbWFudGljT2JqZWN0XTtcblxuXHRyZXR1cm4gc29BY3Rpb25JbnRlbnRNYXRjaCB8fCBzb0ludGVudE1hdGNoIHx8IHJlZnJlc2hTdHJhdGVnaWVzPy5kZWZhdWx0QmVoYXZpb3IgfHwgcmVmcmVzaFN0cmF0ZWdpZXM/Ll9mZURlZmF1bHQ7XG59O1xuLyoqXG4gKiBTdG9yZSBjb250cm9sIHJlZnJlc2ggc3RyYXRlZ3kgZm9yIGhhc2ggaW4gdGhlIGludGVybmFsIG1vZGVsLlxuICpcbiAqIEBwYXJhbSB7Q29udHJvbH0gY29udHJvbCBDb250cm9sIGZvciB0aGUgcmVmcmVzaCBzdHJhdGVneVxuICogQHBhcmFtIHtTT0FjdGlvbn0gaGFzaCBTaGVsbCBoYXNoIG9iamVjdFxuICovXG5jb25zdCBzdG9yZUNvbnRyb2xSZWZyZXNoU3RyYXRlZ3lGb3JIYXNoID0gZnVuY3Rpb24oY29udHJvbDogQ29udHJvbCwgaGFzaDogU09BY3Rpb24pOiB2b2lkIHtcblx0aWYgKGNvbnRyb2wgJiYgY29udHJvbC5nZXRNb2RlbChcInZpZXdEYXRhXCIpICYmIGNvbnRyb2wuZ2V0TW9kZWwoXCJpbnRlcm5hbFwiKSkge1xuXHRcdGNvbnN0IHZpZXdEYXRhID0gY29udHJvbC5nZXRNb2RlbChcInZpZXdEYXRhXCIpO1xuXHRcdGNvbnN0IHJlZnJlc2hTdHJhdGVnaWVzOiBSZWZyZXNoU3RyYXRlZ2llcyA9IHZpZXdEYXRhLmdldFByb3BlcnR5KFBBVEhfVE9fU1RPUkUpO1xuXHRcdGlmIChyZWZyZXNoU3RyYXRlZ2llcykge1xuXHRcdFx0Y29uc3QgaW50ZXJuYWxNb2RlbCA9IGNvbnRyb2wuZ2V0TW9kZWwoXCJpbnRlcm5hbFwiKTtcblx0XHRcdGNvbnN0IHJlZnJlc2hTdHJhdGVneTogU09SZWZyZXNoU3RyYXRlZ3kgfCB1bmRlZmluZWQgPSBLZWVwQWxpdmVIZWxwZXIuZ2V0UmVmcmVzaFN0cmF0ZWd5Rm9ySW50ZW50KFxuXHRcdFx0XHRyZWZyZXNoU3RyYXRlZ2llcyxcblx0XHRcdFx0aGFzaD8uc2VtYW50aWNPYmplY3QsXG5cdFx0XHRcdGhhc2g/LmFjdGlvblxuXHRcdFx0KTtcblx0XHRcdChpbnRlcm5hbE1vZGVsIGFzIEpTT05Nb2RlbDx7fT4pLnNldFByb3BlcnR5KFBBVEhfVE9fU1RPUkUsIHJlZnJlc2hTdHJhdGVneSk7XG5cdFx0fVxuXHR9XG59O1xuXG4vKipcbiAqIE1ldGhvZCB0byByZWZyZXNoIGFuZCByZXN0b3JlIHRoZSB2aWV3IGlmIG5lY2Nlc3NhcnkuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHZpZXcgQ29udHJvbCBmb3IgdGhlIHJlZnJlc2ggc3RyYXRlZ3lcbiAqIEByZXR1cm5zIHtvYmplY3R9IEEgcHJvbWlzZSBhZnRlciB2aWV3IHJlZnJlc2ggYW5kIHJlc3RvcmUgYXJlIHRyaWdnZXJlZFxuICovXG5jb25zdCByZXN0b3JlVmlldyA9IGZ1bmN0aW9uKHZpZXc6IFZpZXcpOiBQcm9taXNlPGFueT4ge1xuXHRjb25zdCBpbnRlcm5hbE1vZGVsQ29udGV4dCA9IHZpZXcuZ2V0QmluZGluZ0NvbnRleHQoXCJpbnRlcm5hbFwiKTtcblx0Y29uc3QgY29udHJvbGxlciA9IHZpZXcuZ2V0Q29udHJvbGxlcigpO1xuXHRjb25zdCB2aWV3U3RhdGUgPSAoY29udHJvbGxlciBhcyBhbnkpPy52aWV3U3RhdGU7XG5cdGxldCByZWZyZXNoQmluZGluZ3MgPSBQcm9taXNlLnJlc29sdmUoKTtcblx0aWYgKGludGVybmFsTW9kZWxDb250ZXh0LmdldFByb3BlcnR5KFwicmVzdG9yZVN0YXR1c1wiKSA9PT0gXCJwZW5kaW5nXCIpIHtcblx0XHRpZiAodmlld1N0YXRlLnJlZnJlc2hWaWV3QmluZGluZ3MpIHtcblx0XHRcdHJlZnJlc2hCaW5kaW5ncyA9IHZpZXdTdGF0ZS5yZWZyZXNoVmlld0JpbmRpbmdzKCk7XG5cdFx0XHRyZWZyZXNoQmluZGluZ3Ncblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0TG9nLmluZm8oXCJGRSBWNDogUmVmcmVzaCB3YXMgdHJpZ2dlcmVkIHN1Y2Nlc3NmdWxsOiBcIiArIHZpZXcuZ2V0SWQoKSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaChmdW5jdGlvbihlcnIpIHtcblx0XHRcdFx0XHRMb2cud2FybmluZyhcIkZFIFY0OiBSZWZyZXNoIHdhcyB1bnN1Y2Nlc3NmdWxsOiBcIiArIHZpZXcuZ2V0SWQoKSwgZXJyKTtcblx0XHRcdFx0fSk7XG5cdFx0fVxuXHRcdHJlZnJlc2hCaW5kaW5ncyA9IHJlZnJlc2hCaW5kaW5nc1xuXHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZpZXdTdGF0ZS5vblJlc3RvcmUoKTtcblx0XHRcdFx0aW50ZXJuYWxNb2RlbENvbnRleHQuc2V0UHJvcGVydHkoXCJyZXN0b3JlU3RhdHVzXCIsIFwiZG9uZVwiKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcblx0XHRcdFx0TG9nLndhcm5pbmcoXCJGRSBWNDogUmVzdG9yZSB3YXMgdW5zdWNjZXNzZnVsbDogXCIgKyB2aWV3LmdldElkKCksIGVycm9yKTtcblx0XHRcdH0pO1xuXHR9XG5cdHJldHVybiByZWZyZXNoQmluZGluZ3M7XG59O1xuXG4vKipcbiAqIGhlbHBlciBjbGFzcyBmb3IgS2VlcEFsaXZlIGZlYXR1cmUgaW4gc2FwLmZlLlxuICovXG5jb25zdCBLZWVwQWxpdmVIZWxwZXIgPSB7XG5cdGdldENvbnRyb2xzRm9yUmVmcmVzaCxcblx0Z2V0Q29udHJvbFJlZnJlc2hTdHJhdGVneUZvckNvbnRleHRQYXRoLFxuXHRnZXRWaWV3UmVmcmVzaEluZm8sXG5cdGdldFJlZnJlc2hTdHJhdGVneUZvckludGVudCxcblx0c3RvcmVDb250cm9sUmVmcmVzaFN0cmF0ZWd5Rm9ySGFzaCxcblx0cmVzdG9yZVZpZXdcbn07XG5leHBvcnQgZGVmYXVsdCBLZWVwQWxpdmVIZWxwZXI7XG4iXX0=