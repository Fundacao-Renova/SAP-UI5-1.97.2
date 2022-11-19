/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/util/ObjectPath", "sap/base/util/deepClone", "sap/ui/core/ElementMetadata"], function (ObjectPath, deepClone, ElementMetadata) {
  "use strict";

  var _exports = {};

  var ensureMetadata = function (target) {
    if (!target.hasOwnProperty("metadata")) {
      target.metadata = deepClone(target.metadata || {
        properties: {},
        macroContexts: {},
        aggregations: {},
        associations: {},
        methods: {},
        events: {}
      });
    }

    return target.metadata;
  };

  function Override(sTarget) {
    return function (target, propertyKey) {
      if (!target.override) {
        target.override = {};
      }

      var currentTarget = target.override;

      if (sTarget) {
        if (!currentTarget.extension) {
          currentTarget.extension = {};
        }

        if (!currentTarget.extension[sTarget]) {
          currentTarget.extension[sTarget] = {};
        }

        currentTarget = currentTarget.extension[sTarget];
      }

      currentTarget[propertyKey] = target[propertyKey];
    };
  }

  _exports.Override = Override;

  function Extensible(oOverrideExecution) {
    return function (target, propertyKey) {
      var metadata = ensureMetadata(target);

      if (!metadata.methods[propertyKey]) {
        metadata.methods[propertyKey] = {};
      }

      metadata.methods[propertyKey].overrideExecution = oOverrideExecution;
    };
  }

  _exports.Extensible = Extensible;

  function Public(target, propertyKey) {
    var metadata = ensureMetadata(target);

    if (!metadata.methods[propertyKey]) {
      metadata.methods[propertyKey] = {};
    }

    metadata.methods[propertyKey].public = true;
  }

  _exports.Public = Public;

  function Private(target, propertyKey) {
    var metadata = ensureMetadata(target);

    if (!metadata.methods[propertyKey]) {
      metadata.methods[propertyKey] = {};
    }

    metadata.methods[propertyKey].public = false;
  }

  _exports.Private = Private;

  function Final(target, propertyKey) {
    var metadata = ensureMetadata(target);

    if (!metadata.methods[propertyKey]) {
      metadata.methods[propertyKey] = {};
    }

    metadata.methods[propertyKey].final = true;
  }

  _exports.Final = Final;

  function Event(target, eventKey) {
    var metadata = ensureMetadata(target);

    if (!metadata.events[eventKey]) {
      metadata.events[eventKey] = {};
    }
  }

  _exports.Event = Event;

  function EventHandler(target, propertykey) {
    target.constructor[propertykey] = function () {
      var currentTarget = target.constructor.getAPI(arguments.length <= 0 ? undefined : arguments[0]);
      currentTarget[propertykey].apply(currentTarget, arguments);
    };
  }

  _exports.EventHandler = EventHandler;

  function MacroContext() {
    var bMetaModelObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return Property({
      type: "sap.ui.model.Context",
      macroContext: true,
      metaModelObject: bMetaModelObject
    });
  }

  _exports.MacroContext = MacroContext;

  function Property(oPropertyParams) {
    return function (target, propertyKey, propertyDescriptor) {
      var metadata = ensureMetadata(target);

      if (oPropertyParams !== null && oPropertyParams !== void 0 && oPropertyParams.macroContext) {
        if (!metadata.macroContexts[propertyKey]) {
          metadata.macroContexts[propertyKey] = oPropertyParams;
        }
      }

      if (!metadata.properties[propertyKey]) {
        metadata.properties[propertyKey] = oPropertyParams;
      }

      delete propertyDescriptor.writable;
      delete propertyDescriptor.initializer;

      propertyDescriptor.set = function (v) {
        return this.setProperty(propertyKey, v);
      };

      propertyDescriptor.get = function () {
        return this.getProperty(propertyKey);
      };

      return propertyDescriptor;
    };
  }

  _exports.Property = Property;

  function Aggregation(oAggregationDescriptor) {
    return function (target, propertyKey, propertyDescriptor) {
      var metadata = ensureMetadata(target);

      if (!metadata.aggregations[propertyKey]) {
        metadata.aggregations[propertyKey] = oAggregationDescriptor;
      }

      if (oAggregationDescriptor.isDefault) {
        metadata.defaultAggregation = propertyKey;
      }

      delete propertyDescriptor.writable;
      delete propertyDescriptor.initializer;

      propertyDescriptor.set = function (v) {
        return this.setAggregation(propertyKey, v);
      };

      propertyDescriptor.get = function () {
        return this.getAggregation(propertyKey);
      };

      return propertyDescriptor;
    };
  }

  _exports.Aggregation = Aggregation;

  function Association(oAssociationDescription) {
    return function (target, propertyKey, propertyDescriptor) {
      var metadata = ensureMetadata(target);

      if (!metadata.associations[propertyKey]) {
        metadata.associations[propertyKey] = oAssociationDescription;
      }

      delete propertyDescriptor.writable;
      delete propertyDescriptor.initializer;

      propertyDescriptor.set = function (v) {
        return this.setAggregation(propertyKey, v);
      };

      propertyDescriptor.get = function () {
        return this.getAggregation(propertyKey);
      };

      return propertyDescriptor;
    };
  }

  _exports.Association = Association;

  function APIClass(sTarget) {
    return function (constructor) {
      if (!constructor.prototype.metadata) {
        constructor.prototype.metadata = {};
      }

      if (!constructor.prototype.metadata.interfaces) {
        constructor.prototype.metadata.interfaces = [];
      }

      constructor.prototype.metadata.interfaces.push("sap.ui.core.IFormContent");

      if (!constructor.prototype.renderer) {
        constructor.prototype.renderer = {
          apiVersion: 2,
          render: function (oRm, oControl) {
            oRm.renderControl(oControl.getContent());
          }
        };
      }

      describe(constructor, sTarget, constructor.prototype, ElementMetadata);
    };
  }

  _exports.APIClass = APIClass;

  function UI5Class(sTarget, metadataClass, metadataDefinition) {
    return function (constructor) {
      if (!constructor.prototype.metadata) {
        constructor.prototype.metadata = {};
      }

      if (metadataDefinition !== null && metadataDefinition !== void 0 && metadataDefinition.properties) {
        constructor.prototype.metadata.properties = metadataDefinition.properties;
      }

      if (metadataDefinition !== null && metadataDefinition !== void 0 && metadataDefinition.events) {
        constructor.prototype.metadata.events = metadataDefinition.events;
      }

      describe(constructor, sTarget, constructor.prototype, metadataClass);
    };
  }

  _exports.UI5Class = UI5Class;

  function describe(clazz, name, inObj, metadataClass) {
    var _inObj$metadata, _clazz$metadata;

    var obj = {};
    obj.metadata = inObj.metadata || {};
    obj.override = inObj.override;
    obj.constructor = clazz;
    obj.metadata.baseType = Object.getPrototypeOf(clazz.prototype).getMetadata().getName();
    obj.renderer = inObj.renderer || clazz.renderer;
    obj.metadata.interfaces = ((_inObj$metadata = inObj.metadata) === null || _inObj$metadata === void 0 ? void 0 : _inObj$metadata.interfaces) || ((_clazz$metadata = clazz.metadata) === null || _clazz$metadata === void 0 ? void 0 : _clazz$metadata.interfaces);
    var metadata;

    if (metadataClass) {
      metadata = new metadataClass(name, obj);
    } else {
      metadata = new ElementMetadata(name, obj);
    }

    clazz.getMetadata = clazz.prototype.getMetadata = function () {
      return metadata;
    };

    var fnInit = clazz.prototype.init;

    clazz.prototype.init = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      fnInit.apply(this, args);
      var aPropertyKeys = Object.keys(obj.metadata.properties); // eslint-disable-next-line @typescript-eslint/no-this-alias

      var that = this;
      aPropertyKeys.forEach(function (propertyKey) {
        Object.defineProperty(that, propertyKey, {
          configurable: true,
          set: function (v) {
            return that.setProperty(propertyKey, v);
          },
          get: function () {
            return that.getProperty(propertyKey);
          }
        });
      });
    };

    ObjectPath.set(name, clazz);
  }

  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNsYXNzU3VwcG9ydC50cyJdLCJuYW1lcyI6WyJlbnN1cmVNZXRhZGF0YSIsInRhcmdldCIsImhhc093blByb3BlcnR5IiwibWV0YWRhdGEiLCJkZWVwQ2xvbmUiLCJwcm9wZXJ0aWVzIiwibWFjcm9Db250ZXh0cyIsImFnZ3JlZ2F0aW9ucyIsImFzc29jaWF0aW9ucyIsIm1ldGhvZHMiLCJldmVudHMiLCJPdmVycmlkZSIsInNUYXJnZXQiLCJwcm9wZXJ0eUtleSIsIm92ZXJyaWRlIiwiY3VycmVudFRhcmdldCIsImV4dGVuc2lvbiIsIkV4dGVuc2libGUiLCJvT3ZlcnJpZGVFeGVjdXRpb24iLCJvdmVycmlkZUV4ZWN1dGlvbiIsIlB1YmxpYyIsInB1YmxpYyIsIlByaXZhdGUiLCJGaW5hbCIsImZpbmFsIiwiRXZlbnQiLCJldmVudEtleSIsIkV2ZW50SGFuZGxlciIsInByb3BlcnR5a2V5IiwiY29uc3RydWN0b3IiLCJnZXRBUEkiLCJNYWNyb0NvbnRleHQiLCJiTWV0YU1vZGVsT2JqZWN0IiwiUHJvcGVydHkiLCJ0eXBlIiwibWFjcm9Db250ZXh0IiwibWV0YU1vZGVsT2JqZWN0Iiwib1Byb3BlcnR5UGFyYW1zIiwicHJvcGVydHlEZXNjcmlwdG9yIiwid3JpdGFibGUiLCJpbml0aWFsaXplciIsInNldCIsInYiLCJzZXRQcm9wZXJ0eSIsImdldCIsImdldFByb3BlcnR5IiwiQWdncmVnYXRpb24iLCJvQWdncmVnYXRpb25EZXNjcmlwdG9yIiwiaXNEZWZhdWx0IiwiZGVmYXVsdEFnZ3JlZ2F0aW9uIiwic2V0QWdncmVnYXRpb24iLCJnZXRBZ2dyZWdhdGlvbiIsIkFzc29jaWF0aW9uIiwib0Fzc29jaWF0aW9uRGVzY3JpcHRpb24iLCJBUElDbGFzcyIsInByb3RvdHlwZSIsImludGVyZmFjZXMiLCJwdXNoIiwicmVuZGVyZXIiLCJhcGlWZXJzaW9uIiwicmVuZGVyIiwib1JtIiwib0NvbnRyb2wiLCJyZW5kZXJDb250cm9sIiwiZ2V0Q29udGVudCIsImRlc2NyaWJlIiwiRWxlbWVudE1ldGFkYXRhIiwiVUk1Q2xhc3MiLCJtZXRhZGF0YUNsYXNzIiwibWV0YWRhdGFEZWZpbml0aW9uIiwiY2xhenoiLCJuYW1lIiwiaW5PYmoiLCJvYmoiLCJiYXNlVHlwZSIsIk9iamVjdCIsImdldFByb3RvdHlwZU9mIiwiZ2V0TWV0YWRhdGEiLCJnZXROYW1lIiwiZm5Jbml0IiwiaW5pdCIsImFyZ3MiLCJhcHBseSIsImFQcm9wZXJ0eUtleXMiLCJrZXlzIiwidGhhdCIsImZvckVhY2giLCJkZWZpbmVQcm9wZXJ0eSIsImNvbmZpZ3VyYWJsZSIsIk9iamVjdFBhdGgiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7Ozs7OztBQUVBLE1BQU1BLGNBQWMsR0FBRyxVQUFTQyxNQUFULEVBQXNCO0FBQzVDLFFBQUksQ0FBQ0EsTUFBTSxDQUFDQyxjQUFQLENBQXNCLFVBQXRCLENBQUwsRUFBd0M7QUFDdkNELE1BQUFBLE1BQU0sQ0FBQ0UsUUFBUCxHQUFrQkMsU0FBUyxDQUMxQkgsTUFBTSxDQUFDRSxRQUFQLElBQW1CO0FBQ2xCRSxRQUFBQSxVQUFVLEVBQUUsRUFETTtBQUVsQkMsUUFBQUEsYUFBYSxFQUFFLEVBRkc7QUFHbEJDLFFBQUFBLFlBQVksRUFBRSxFQUhJO0FBSWxCQyxRQUFBQSxZQUFZLEVBQUUsRUFKSTtBQUtsQkMsUUFBQUEsT0FBTyxFQUFFLEVBTFM7QUFNbEJDLFFBQUFBLE1BQU0sRUFBRTtBQU5VLE9BRE8sQ0FBM0I7QUFVQTs7QUFDRCxXQUFPVCxNQUFNLENBQUNFLFFBQWQ7QUFDQSxHQWREOztBQWVPLFdBQVNRLFFBQVQsQ0FBa0JDLE9BQWxCLEVBQW9DO0FBQzFDLFdBQU8sVUFBU1gsTUFBVCxFQUFzQlksV0FBdEIsRUFBMkM7QUFDakQsVUFBSSxDQUFDWixNQUFNLENBQUNhLFFBQVosRUFBc0I7QUFDckJiLFFBQUFBLE1BQU0sQ0FBQ2EsUUFBUCxHQUFrQixFQUFsQjtBQUNBOztBQUNELFVBQUlDLGFBQWEsR0FBR2QsTUFBTSxDQUFDYSxR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Q0FBQ2hELEdBQVgsQ0FBZThCLElBQWYsRUFBcUJELEtBQXJCO0FBQ0EiLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJyaWRlRXhlY3V0aW9uIH0gZnJvbSBcInNhcC91aS9jb3JlL212Y1wiO1xuaW1wb3J0IHsgT2JqZWN0UGF0aCwgZGVlcENsb25lIH0gZnJvbSBcInNhcC9iYXNlL3V0aWxcIjtcbmltcG9ydCB7ICRDb250cm9sU2V0dGluZ3MsIEVsZW1lbnRNZXRhZGF0YSwgUmVuZGVyTWFuYWdlciB9IGZyb20gXCJzYXAvdWkvY29yZVwiO1xuXG5jb25zdCBlbnN1cmVNZXRhZGF0YSA9IGZ1bmN0aW9uKHRhcmdldDogYW55KSB7XG5cdGlmICghdGFyZ2V0Lmhhc093blByb3BlcnR5KFwibWV0YWRhdGFcIikpIHtcblx0XHR0YXJnZXQubWV0YWRhdGEgPSBkZWVwQ2xvbmUoXG5cdFx0XHR0YXJnZXQubWV0YWRhdGEgfHwge1xuXHRcdFx0XHRwcm9wZXJ0aWVzOiB7fSxcblx0XHRcdFx0bWFjcm9Db250ZXh0czoge30sXG5cdFx0XHRcdGFnZ3JlZ2F0aW9uczoge30sXG5cdFx0XHRcdGFzc29jaWF0aW9uczoge30sXG5cdFx0XHRcdG1ldGhvZHM6IHt9LFxuXHRcdFx0XHRldmVudHM6IHt9XG5cdFx0XHR9XG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gdGFyZ2V0Lm1ldGFkYXRhO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBPdmVycmlkZShzVGFyZ2V0Pzogc3RyaW5nKSB7XG5cdHJldHVybiBmdW5jdGlvbih0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZykge1xuXHRcdGlmICghdGFyZ2V0Lm92ZXJyaWRlKSB7XG5cdFx0XHR0YXJnZXQub3ZlcnJpZGUgPSB7fTtcblx0XHR9XG5cdFx0bGV0IGN1cnJlbnRUYXJnZXQgPSB0YXJnZXQub3ZlcnJpZGU7XG5cdFx0aWYgKHNUYXJnZXQpIHtcblx0XHRcdGlmICghY3VycmVudFRhcmdldC5leHRlbnNpb24pIHtcblx0XHRcdFx0Y3VycmVudFRhcmdldC5leHRlbnNpb24gPSB7fTtcblx0XHRcdH1cblx0XHRcdGlmICghY3VycmVudFRhcmdldC5leHRlbnNpb25bc1RhcmdldF0pIHtcblx0XHRcdFx0Y3VycmVudFRhcmdldC5leHRlbnNpb25bc1RhcmdldF0gPSB7fTtcblx0XHRcdH1cblx0XHRcdGN1cnJlbnRUYXJnZXQgPSBjdXJyZW50VGFyZ2V0LmV4dGVuc2lvbltzVGFyZ2V0XTtcblx0XHR9XG5cdFx0Y3VycmVudFRhcmdldFtwcm9wZXJ0eUtleV0gPSB0YXJnZXRbcHJvcGVydHlLZXldO1xuXHR9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIEV4dGVuc2libGUob092ZXJyaWRlRXhlY3V0aW9uPzogT3ZlcnJpZGVFeGVjdXRpb24pIHtcblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nKSB7XG5cdFx0Y29uc3QgbWV0YWRhdGEgPSBlbnN1cmVNZXRhZGF0YSh0YXJnZXQpO1xuXHRcdGlmICghbWV0YWRhdGEubWV0aG9kc1twcm9wZXJ0eUtleV0pIHtcblx0XHRcdG1ldGFkYXRhLm1ldGhvZHNbcHJvcGVydHlLZXldID0ge307XG5cdFx0fVxuXHRcdG1ldGFkYXRhLm1ldGhvZHNbcHJvcGVydHlLZXldLm92ZXJyaWRlRXhlY3V0aW9uID0gb092ZXJyaWRlRXhlY3V0aW9uO1xuXHR9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIFB1YmxpYyh0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZykge1xuXHRjb25zdCBtZXRhZGF0YSA9IGVuc3VyZU1ldGFkYXRhKHRhcmdldCk7XG5cdGlmICghbWV0YWRhdGEubWV0aG9kc1twcm9wZXJ0eUtleV0pIHtcblx0XHRtZXRhZGF0YS5tZXRob2RzW3Byb3BlcnR5S2V5XSA9IHt9O1xuXHR9XG5cdG1ldGFkYXRhLm1ldGhvZHNbcHJvcGVydHlLZXldLnB1YmxpYyA9IHRydWU7XG59XG5leHBvcnQgZnVuY3Rpb24gUHJpdmF0ZSh0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZykge1xuXHRjb25zdCBtZXRhZGF0YSA9IGVuc3VyZU1ldGFkYXRhKHRhcmdldCk7XG5cdGlmICghbWV0YWRhdGEubWV0aG9kc1twcm9wZXJ0eUtleV0pIHtcblx0XHRtZXRhZGF0YS5tZXRob2RzW3Byb3BlcnR5S2V5XSA9IHt9O1xuXHR9XG5cdG1ldGFkYXRhLm1ldGhvZHNbcHJvcGVydHlLZXldLnB1YmxpYyA9IGZhbHNlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIEZpbmFsKHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nKSB7XG5cdGNvbnN0IG1ldGFkYXRhID0gZW5zdXJlTWV0YWRhdGEodGFyZ2V0KTtcblx0aWYgKCFtZXRhZGF0YS5tZXRob2RzW3Byb3BlcnR5S2V5XSkge1xuXHRcdG1ldGFkYXRhLm1ldGhvZHNbcHJvcGVydHlLZXldID0ge307XG5cdH1cblx0bWV0YWRhdGEubWV0aG9kc1twcm9wZXJ0eUtleV0uZmluYWwgPSB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gRXZlbnQodGFyZ2V0OiBhbnksIGV2ZW50S2V5OiBzdHJpbmcpIHtcblx0Y29uc3QgbWV0YWRhdGEgPSBlbnN1cmVNZXRhZGF0YSh0YXJnZXQpO1xuXHRpZiAoIW1ldGFkYXRhLmV2ZW50c1tldmVudEtleV0pIHtcblx0XHRtZXRhZGF0YS5ldmVudHNbZXZlbnRLZXldID0ge307XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEV2ZW50SGFuZGxlcih0YXJnZXQ6IGFueSwgcHJvcGVydHlrZXk6IGFueSkge1xuXHR0YXJnZXQuY29uc3RydWN0b3JbcHJvcGVydHlrZXldID0gZnVuY3Rpb24oLi4uYXJnczogYW55W10pIHtcblx0XHRjb25zdCBjdXJyZW50VGFyZ2V0ID0gdGFyZ2V0LmNvbnN0cnVjdG9yLmdldEFQSShhcmdzWzBdIGFzIFVJNUV2ZW50KTtcblx0XHRjdXJyZW50VGFyZ2V0W3Byb3BlcnR5a2V5XSguLi5hcmdzKTtcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE1hY3JvQ29udGV4dChiTWV0YU1vZGVsT2JqZWN0OiBib29sZWFuID0gZmFsc2UpOiBhbnkge1xuXHRyZXR1cm4gUHJvcGVydHkoeyB0eXBlOiBcInNhcC51aS5tb2RlbC5Db250ZXh0XCIsIG1hY3JvQ29udGV4dDogdHJ1ZSwgbWV0YU1vZGVsT2JqZWN0OiBiTWV0YU1vZGVsT2JqZWN0IH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUHJvcGVydHkob1Byb3BlcnR5UGFyYW1zOiBhbnkpOiBhbnkge1xuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0OiBhbnksIHByb3BlcnR5S2V5OiBzdHJpbmcsIHByb3BlcnR5RGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKTogYW55IHtcblx0XHRjb25zdCBtZXRhZGF0YSA9IGVuc3VyZU1ldGFkYXRhKHRhcmdldCk7XG5cdFx0aWYgKG9Qcm9wZXJ0eVBhcmFtcz8ubWFjcm9Db250ZXh0KSB7XG5cdFx0XHRpZiAoIW1ldGFkYXRhLm1hY3JvQ29udGV4dHNbcHJvcGVydHlLZXldKSB7XG5cdFx0XHRcdG1ldGFkYXRhLm1hY3JvQ29udGV4dHNbcHJvcGVydHlLZXldID0gb1Byb3BlcnR5UGFyYW1zO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoIW1ldGFkYXRhLnByb3BlcnRpZXNbcHJvcGVydHlLZXldKSB7XG5cdFx0XHRtZXRhZGF0YS5wcm9wZXJ0aWVzW3Byb3BlcnR5S2V5XSA9IG9Qcm9wZXJ0eVBhcmFtcztcblx0XHR9XG5cdFx0ZGVsZXRlIHByb3BlcnR5RGVzY3JpcHRvci53cml0YWJsZTtcblx0XHRkZWxldGUgKHByb3BlcnR5RGVzY3JpcHRvciBhcyBhbnkpLmluaXRpYWxpemVyO1xuXHRcdChwcm9wZXJ0eURlc2NyaXB0b3IgYXMgYW55KS5zZXQgPSBmdW5jdGlvbih2OiBhbnkpIHtcblx0XHRcdHJldHVybiB0aGlzLnNldFByb3BlcnR5KHByb3BlcnR5S2V5LCB2KTtcblx0XHR9O1xuXHRcdChwcm9wZXJ0eURlc2NyaXB0b3IgYXMgYW55KS5nZXQgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmdldFByb3BlcnR5KHByb3BlcnR5S2V5KTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHByb3BlcnR5RGVzY3JpcHRvcjtcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFnZ3JlZ2F0aW9uKG9BZ2dyZWdhdGlvbkRlc2NyaXB0b3I/OiBhbnkpOiBhbnkge1xuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0OiBhbnksIHByb3BlcnR5S2V5OiBzdHJpbmcsIHByb3BlcnR5RGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKTogYW55IHtcblx0XHRjb25zdCBtZXRhZGF0YSA9IGVuc3VyZU1ldGFkYXRhKHRhcmdldCk7XG5cdFx0aWYgKCFtZXRhZGF0YS5hZ2dyZWdhdGlvbnNbcHJvcGVydHlLZXldKSB7XG5cdFx0XHRtZXRhZGF0YS5hZ2dyZWdhdGlvbnNbcHJvcGVydHlLZXldID0gb0FnZ3JlZ2F0aW9uRGVzY3JpcHRvcjtcblx0XHR9XG5cdFx0aWYgKG9BZ2dyZWdhdGlvbkRlc2NyaXB0b3IuaXNEZWZhdWx0KSB7XG5cdFx0XHRtZXRhZGF0YS5kZWZhdWx0QWdncmVnYXRpb24gPSBwcm9wZXJ0eUtleTtcblx0XHR9XG5cdFx0ZGVsZXRlIHByb3BlcnR5RGVzY3JpcHRvci53cml0YWJsZTtcblx0XHRkZWxldGUgKHByb3BlcnR5RGVzY3JpcHRvciBhcyBhbnkpLmluaXRpYWxpemVyO1xuXHRcdChwcm9wZXJ0eURlc2NyaXB0b3IgYXMgYW55KS5zZXQgPSBmdW5jdGlvbih2OiBhbnkpIHtcblx0XHRcdHJldHVybiB0aGlzLnNldEFnZ3JlZ2F0aW9uKHByb3BlcnR5S2V5LCB2KTtcblx0XHR9O1xuXHRcdChwcm9wZXJ0eURlc2NyaXB0b3IgYXMgYW55KS5nZXQgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmdldEFnZ3JlZ2F0aW9uKHByb3BlcnR5S2V5KTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHByb3BlcnR5RGVzY3JpcHRvcjtcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFzc29jaWF0aW9uKG9Bc3NvY2lhdGlvbkRlc2NyaXB0aW9uPzogYW55KTogYW55IHtcblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nLCBwcm9wZXJ0eURlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcik6IGFueSB7XG5cdFx0Y29uc3QgbWV0YWRhdGEgPSBlbnN1cmVNZXRhZGF0YSh0YXJnZXQpO1xuXHRcdGlmICghbWV0YWRhdGEuYXNzb2NpYXRpb25zW3Byb3BlcnR5S2V5XSkge1xuXHRcdFx0bWV0YWRhdGEuYXNzb2NpYXRpb25zW3Byb3BlcnR5S2V5XSA9IG9Bc3NvY2lhdGlvbkRlc2NyaXB0aW9uO1xuXHRcdH1cblx0XHRkZWxldGUgcHJvcGVydHlEZXNjcmlwdG9yLndyaXRhYmxlO1xuXHRcdGRlbGV0ZSAocHJvcGVydHlEZXNjcmlwdG9yIGFzIGFueSkuaW5pdGlhbGl6ZXI7XG5cdFx0KHByb3BlcnR5RGVzY3JpcHRvciBhcyBhbnkpLnNldCA9IGZ1bmN0aW9uKHY6IGFueSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuc2V0QWdncmVnYXRpb24ocHJvcGVydHlLZXksIHYpO1xuXHRcdH07XG5cdFx0KHByb3BlcnR5RGVzY3JpcHRvciBhcyBhbnkpLmdldCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0QWdncmVnYXRpb24ocHJvcGVydHlLZXkpO1xuXHRcdH07XG5cblx0XHRyZXR1cm4gcHJvcGVydHlEZXNjcmlwdG9yO1xuXHR9O1xufVxudHlwZSBDb250cm9sUHJvcGVydHlOYW1lczxUPiA9IHtcblx0W0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBGdW5jdGlvbiA/IG5ldmVyIDogSztcbn1ba2V5b2YgVF07XG5leHBvcnQgdHlwZSBQcm9wZXJ0aWVzT2Y8VD4gPSBQYXJ0aWFsPFBpY2s8VCwgQ29udHJvbFByb3BlcnR5TmFtZXM8VD4+PiAmICRDb250cm9sU2V0dGluZ3M7XG5cbmV4cG9ydCBmdW5jdGlvbiBBUElDbGFzcyhzVGFyZ2V0OiBzdHJpbmcpIHtcblx0cmV0dXJuIGZ1bmN0aW9uKGNvbnN0cnVjdG9yOiBGdW5jdGlvbikge1xuXHRcdGlmICghY29uc3RydWN0b3IucHJvdG90eXBlLm1ldGFkYXRhKSB7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUubWV0YWRhdGEgPSB7fTtcblx0XHR9XG5cblx0XHRpZiAoIWNvbnN0cnVjdG9yLnByb3RvdHlwZS5tZXRhZGF0YS5pbnRlcmZhY2VzKSB7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUubWV0YWRhdGEuaW50ZXJmYWNlcyA9IFtdO1xuXHRcdH1cblx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUubWV0YWRhdGEuaW50ZXJmYWNlcy5wdXNoKFwic2FwLnVpLmNvcmUuSUZvcm1Db250ZW50XCIpO1xuXG5cdFx0aWYgKCFjb25zdHJ1Y3Rvci5wcm90b3R5cGUucmVuZGVyZXIpIHtcblx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZS5yZW5kZXJlciA9IHtcblx0XHRcdFx0YXBpVmVyc2lvbjogMixcblx0XHRcdFx0cmVuZGVyOiBmdW5jdGlvbihvUm06IFJlbmRlck1hbmFnZXIsIG9Db250cm9sOiBhbnkpIHtcblx0XHRcdFx0XHRvUm0ucmVuZGVyQ29udHJvbChvQ29udHJvbC5nZXRDb250ZW50KCkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGRlc2NyaWJlKGNvbnN0cnVjdG9yLCBzVGFyZ2V0LCBjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIEVsZW1lbnRNZXRhZGF0YSk7XG5cdH07XG59XG5leHBvcnQgZnVuY3Rpb24gVUk1Q2xhc3Moc1RhcmdldDogc3RyaW5nLCBtZXRhZGF0YUNsYXNzPzogYW55LCBtZXRhZGF0YURlZmluaXRpb24/OiBhbnkpIHtcblx0cmV0dXJuIGZ1bmN0aW9uKGNvbnN0cnVjdG9yOiBGdW5jdGlvbikge1xuXHRcdGlmICghY29uc3RydWN0b3IucHJvdG90eXBlLm1ldGFkYXRhKSB7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUubWV0YWRhdGEgPSB7fTtcblx0XHR9XG5cdFx0aWYgKG1ldGFkYXRhRGVmaW5pdGlvbj8ucHJvcGVydGllcykge1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlLm1ldGFkYXRhLnByb3BlcnRpZXMgPSBtZXRhZGF0YURlZmluaXRpb24ucHJvcGVydGllcztcblx0XHR9XG5cdFx0aWYgKG1ldGFkYXRhRGVmaW5pdGlvbj8uZXZlbnRzKSB7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUubWV0YWRhdGEuZXZlbnRzID0gbWV0YWRhdGFEZWZpbml0aW9uLmV2ZW50cztcblx0XHR9XG5cdFx0ZGVzY3JpYmUoY29uc3RydWN0b3IsIHNUYXJnZXQsIGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgbWV0YWRhdGFDbGFzcyk7XG5cdH07XG59XG5cbmZ1bmN0aW9uIGRlc2NyaWJlKGNsYXp6OiBhbnksIG5hbWU6IHN0cmluZywgaW5PYmo6IGFueSwgbWV0YWRhdGFDbGFzcz86IGFueSkge1xuXHRjb25zdCBvYmo6IGFueSA9IHt9O1xuXHRvYmoubWV0YWRhdGEgPSBpbk9iai5tZXRhZGF0YSB8fCB7fTtcblx0b2JqLm92ZXJyaWRlID0gaW5PYmoub3ZlcnJpZGU7XG5cdG9iai5jb25zdHJ1Y3RvciA9IGNsYXp6O1xuXHRvYmoubWV0YWRhdGEuYmFzZVR5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoY2xhenoucHJvdG90eXBlKVxuXHRcdC5nZXRNZXRhZGF0YSgpXG5cdFx0LmdldE5hbWUoKTtcblx0b2JqLnJlbmRlcmVyID0gaW5PYmoucmVuZGVyZXIgfHwgY2xhenoucmVuZGVyZXI7XG5cdG9iai5tZXRhZGF0YS5pbnRlcmZhY2VzID0gaW5PYmoubWV0YWRhdGE/LmludGVyZmFjZXMgfHwgY2xhenoubWV0YWRhdGE/LmludGVyZmFjZXM7XG5cdGxldCBtZXRhZGF0YTogYW55O1xuXHRpZiAobWV0YWRhdGFDbGFzcykge1xuXHRcdG1ldGFkYXRhID0gbmV3IG1ldGFkYXRhQ2xhc3MobmFtZSwgb2JqKTtcblx0fSBlbHNlIHtcblx0XHRtZXRhZGF0YSA9IG5ldyBFbGVtZW50TWV0YWRhdGEobmFtZSwgb2JqKTtcblx0fVxuXHRjbGF6ei5nZXRNZXRhZGF0YSA9IGNsYXp6LnByb3RvdHlwZS5nZXRNZXRhZGF0YSA9IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBtZXRhZGF0YTtcblx0fTtcblx0Y29uc3QgZm5Jbml0ID0gY2xhenoucHJvdG90eXBlLmluaXQ7XG5cdGNsYXp6LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oLi4uYXJnczogYW55W10pIHtcblx0XHRmbkluaXQuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0Y29uc3QgYVByb3BlcnR5S2V5cyA9IE9iamVjdC5rZXlzKG9iai5tZXRhZGF0YS5wcm9wZXJ0aWVzKTtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRoaXMtYWxpYXNcblx0XHRjb25zdCB0aGF0ID0gdGhpcztcblx0XHRhUHJvcGVydHlLZXlzLmZvckVhY2gocHJvcGVydHlLZXkgPT4ge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoYXQsIHByb3BlcnR5S2V5LCB7XG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdFx0c2V0OiAodjogYW55KSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoYXQuc2V0UHJvcGVydHkocHJvcGVydHlLZXksIHYpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRnZXQ6ICgpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gdGhhdC5nZXRQcm9wZXJ0eShwcm9wZXJ0eUtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9O1xuXHRPYmplY3RQYXRoLnNldChuYW1lLCBjbGF6eik7XG59XG4iXX0=