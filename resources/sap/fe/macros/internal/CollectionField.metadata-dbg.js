/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/macros/MacroMetadata", "sap/fe/core/converters/MetaModelConverter", "sap/fe/core/templating/UIFormatters", "sap/fe/core/converters/helpers/BindingHelper", "sap/fe/macros/field/FieldTemplating", "sap/fe/core/helpers/BindingExpression", "sap/fe/core/templating/DataModelPathHelper"], function (MacroMetadata, MetaModelConverter, UIFormatters, BindingHelper, FieldTemplating, BindingExpression, DataModelPathHelper) {
  "use strict";

  var compileBinding = BindingExpression.compileBinding;
  var constant = BindingExpression.constant;
  var annotationExpression = BindingExpression.annotationExpression;
  var ifElse = BindingExpression.ifElse;
  var and = BindingExpression.and;
  var getValueBinding = FieldTemplating.getValueBinding;
  var getVisibleExpression = FieldTemplating.getVisibleExpression;
  var UI = BindingHelper.UI;
  var getDisplayMode = UIFormatters.getDisplayMode;

  /**
   * @classdesc
   * Building block for creating a CollectionField based on the metadata provided by OData V4.
   * <br>
   * Usually, a DataField annotation is expected
   *
   * Usage example:
   * <pre>
   * <internalMacro:CollectionField
   *   idPrefix="SomePrefix"
   *   contextPath="{entitySet>}"
   *   metaPath="{dataField>}"
   * />
   * </pre>
   *
   * @class sap.fe.macros.internal.CollectionField
   * @hideconstructor
   * @private
   * @experimental
   * @since 1.94.0
   */
  var CollectionField = MacroMetadata.extend("sap.fe.macros.internal.CollectionField", {
    /**
     * Define building block stereotype for documentation
     */
    name: "CollectionField",

    /**
     * Namespace of the building block
     */
    namespace: "sap.fe.macros.internal",

    /**
     * Fragment source of the building block (optional)
     */
    fragment: "sap.fe.macros.internal.CollectionField",

    /**
     * The metadata describing the building block
     */
    metadata: {
      /**
       * Define building block stereotype for documentation purpose
       */
      stereotype: "xmlmacro",

      /**
       * Properties.
       */
      properties: {
        /**
         * Prefix added to the generated ID of the field
         */
        idPrefix: {
          type: "string"
        },

        /**
         * Prefix added to the generated ID of the value help used for the field
         */
        vhIdPrefix: {
          type: "string",
          defaultValue: "FieldValueHelp"
        },
        _vhFlexId: {
          type: "string",
          computed: true
        },

        /**
         * Metadata path to the CollectionField.
         * This property is usually a metadataContext pointing to a DataField having a Value that uses a 1:n navigation
         */
        metaPath: {
          type: "sap.ui.model.Context",
          required: true,
          $kind: "Property"
        },

        /**
         * Property added to associate the label with the CollectionField
         */
        ariaLabelledBy: {
          type: "string"
        },
        formatOptions: {
          type: "object",
          properties: {}
        },

        /**
         * Mandatory context to the CollectionField
         */
        contextPath: {
          type: "sap.ui.model.Context",
          required: true,
          $kind: ["EntitySet", "NavigationProperty"]
        }
      }
    },
    create: function (oProps) {
      var oDataModelPath = MetaModelConverter.getInvolvedDataModelObjects(oProps.metaPath, oProps.contextPath);
      var oDataFieldConverted = MetaModelConverter.convertMetaModelContext(oProps.metaPath);
      var oPropertyPath = oDataFieldConverted.Value.$target;
      var sExtraPath = oDataFieldConverted.Value.path;
      oProps.visible = getVisibleExpression(oDataModelPath, oProps.formatOptions);

      if (sExtraPath && sExtraPath.length > 0) {
        oDataModelPath = DataModelPathHelper.enhanceDataModelPath(oDataModelPath, sExtraPath);
      }

      var bInsertable = DataModelPathHelper.isPathInsertable(oDataModelPath);
      var bDeletable = DataModelPathHelper.isPathDeletable(oDataModelPath);
      oProps.editMode = compileBinding(ifElse(and(bInsertable, bDeletable, UI.IsEditable), constant("Editable"), constant("Display")));
      oProps.displayMode = getDisplayMode(oPropertyPath, oDataModelPath);

      var multiInputSettings = CollectionField._getMultiInputSettings(oDataModelPath, oProps.formatOptions);

      oProps.text = multiInputSettings.text;
      oProps.collection = multiInputSettings.collection;
      oProps.key = multiInputSettings.key;
      return oProps;
    },
    _getMultiInputSettings: function (oPropertyDataModelObjectPath, formatOptions) {
      var _oPropertyDefinition$, _oPropertyDefinition$2;

      var collectionPath = "{path:'" + DataModelPathHelper.getTargetEntitySetPath(oPropertyDataModelObjectPath, true) + "',  parameters : { $$groupId : '$auto.Workers' } , templateShareable: false}";
      var navs = DataModelPathHelper.getTargetEntitySetNavigation(oPropertyDataModelObjectPath);
      var oRelativePropertyDataModelObjectPath = Object.assign({}, oPropertyDataModelObjectPath);

      if (oRelativePropertyDataModelObjectPath.contextLocation) {
        oRelativePropertyDataModelObjectPath.contextLocation.navigationProperties = navs;
      }

      var oPropertyDefinition = oPropertyDataModelObjectPath.targetObject.type === "PropertyPath" ? oPropertyDataModelObjectPath.targetObject.$target : oPropertyDataModelObjectPath.targetObject;
      var commonText = (_oPropertyDefinition$ = oPropertyDefinition.annotations) === null || _oPropertyDefinition$ === void 0 ? void 0 : (_oPropertyDefinition$2 = _oPropertyDefinition$.Common) === null || _oPropertyDefinition$2 === void 0 ? void 0 : _oPropertyDefinition$2.Text;
      var relativeLocation = DataModelPathHelper.getPathRelativeLocation(oPropertyDataModelObjectPath.contextLocation, oPropertyDataModelObjectPath.navigationProperties).map(function (np) {
        return np.name;
      });
      var textExpression = commonText ? compileBinding(annotationExpression(commonText, relativeLocation)) : getValueBinding(oRelativePropertyDataModelObjectPath, formatOptions, true);
      return {
        text: textExpression,
        collection: collectionPath,
        key: getValueBinding(oRelativePropertyDataModelObjectPath, formatOptions, true)
      };
    }
  });
  return CollectionField;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbGxlY3Rpb25GaWVsZC5tZXRhZGF0YS50cyJdLCJuYW1lcyI6WyJDb2xsZWN0aW9uRmllbGQiLCJNYWNyb01ldGFkYXRhIiwiZXh0ZW5kIiwibmFtZSIsIm5hbWVzcGFjZSIsImZyYWdtZW50IiwibWV0YWRhdGEiLCJzdGVyZW90eXBlIiwicHJvcGVydGllcyIsImlkUHJlZml4IiwidHlwZSIsInZoSWRQcmVmaXgiLCJkZWZhdWx0VmFsdWUiLCJfdmhGbGV4SWQiLCJjb21wdXRlZCIsIm1ldGFQYXRoIiwicmVxdWlyZWQiLCIka2luZCIsImFyaWFMYWJlbGxlZEJ5IiwiZm9ybWF0T3B0aW9ucyIsImNvbnRleHRQYXRoIiwiY3JlYXRlIiwib1Byb3BzIiwib0RhdGFNb2RlbFBhdGgiLCJNZXRhTW9kZWxDb252ZXJ0ZXIiLCJnZXRJbnZvbHZlZERhdGFNb2RlbE9iamVjdHMiLCJvRGF0YUZpZWxkQ29udmVydGVkIiwiY29udmVydE1ldGFNb2RlbENvbnRleHQiLCJvUHJvcGVydHlQYXRoIiwiVmFsdWUiLCIkdGFyZ2V0Iiwic0V4dHJhUGF0aCIsInBhdGgiLCJ2aXNpYmxlIiwiZ2V0VmlzaWJsZUV4cHJlc3Npb24iLCJsZW5ndGgiLCJEYXRhTW9kZWxQYXRoSGVscGVyIiwiZW5oYW5jZURhdGFNb2RlbFBhdGgiLCJiSW5zZXJ0YWJsZSIsImlzUGF0aEluc2VydGFibGUiLCJiRGVsZXRhYmxlIiwiaXNQYXRoRGVsZXRhYmxlIiwiZWRpdE1vZGUiLCJjb21waWxlQmluZGluZyIsImlmRWxzZSIsImFuZCIsIlVJIiwiSXNFZGl0YWJsZSIsImNvbnN0YW50IiwiZGlzcGxheU1vZGUiLCJnZXREaXNwbGF5TW9kZSIsIm11bHRpSW5wdXRTZXR0aW5ncyIsIl9nZXRNdWx0aUlucHV0U2V0dGluZ3MiLCJ0ZXh0IiwiY29sbGVjdGlvbiIsImtleSIsIm9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGgiLCJjb2xsZWN0aW9uUGF0aCIsImdldFRhcmdldEVudGl0eVNldFBhdGgiLCJuYXZzIiwiZ2V0VGFyZ2V0RW50aXR5U2V0TmF2aWdhdGlvbiIsIm9SZWxhdGl2ZVByb3BlcnR5RGF0YU1vZGVsT2JqZWN0UGF0aCIsIk9iamVjdCIsImFzc2lnbiIsImNvbnRleHRMb2NhdGlvbiIsIm5hdmlnYXRpb25Qcm9wZXJ0aWVzIiwib1Byb3BlcnR5RGVmaW5pdGlvbiIsInRhcmdldE9iamVjdCIsImNvbW1vblRleHQiLCJhbm5vdGF0aW9ucyIsIkNvbW1vbiIsIlRleHQiLCJyZWxhdGl2ZUxvY2F0aW9uIiwiZ2V0UGF0aFJlbGF0aXZlTG9jYXRpb24iLCJtYXAiLCJucCIsInRleHRFeHByZXNzaW9uIiwiYW5ub3RhdGlvbkV4cHJlc3Npb24iLCJnZXRWYWx1ZUJpbmRpbmciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBd0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU1BLGVBQWUsR0FBR0MsYUFBYSxDQUFDQyxNQUFkLENBQXFCLHdDQUFyQixFQUErRDtBQUN0RjtBQUNEO0FBQ0E7QUFDQ0MsSUFBQUEsSUFBSSxFQUFFLGlCQUpnRjs7QUFLdEY7QUFDRDtBQUNBO0FBQ0NDLElBQUFBLFNBQVMsRUFBRSx3QkFSMkU7O0FBU3RGO0FBQ0Q7QUFDQTtBQUNDQyxJQUFBQSxRQUFRLEVBQUUsd0NBWjRFOztBQWN0RjtBQUNEO0FBQ0E7QUFDQ0MsSUFBQUEsUUFBUSxFQUFFO0FBQ1Q7QUFDRjtBQUNBO0FBQ0VDLE1BQUFBLFVBQVUsRUFBRSxVQUpIOztBQUtUO0FBQ0Y7QUFDQTtBQUNFQyxNQUFBQSxVQUFVLEVBQUU7QUFDWDtBQUNIO0FBQ0E7QUFDR0MsUUFBQUEsUUFBUSxFQUFFO0FBQ1RDLFVBQUFBLElBQUksRUFBRTtBQURHLFNBSkM7O0FBT1g7QUFDSDtBQUNBO0FBQ0dDLFFBQUFBLFVBQVUs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QXVDMUMsYUFBdkMsRUFBc0QsSUFBdEQsQ0FGbEI7QUFHQSxhQUFPO0FBQ05rQyxRQUFBQSxJQUFJLEVBQUV1QixjQURBO0FBRU50QixRQUFBQSxVQUFVLEVBQUVHLGNBRk47QUFHTkYsUUFBQUEsR0FBRyxFQUFFdUIsZUFBZSxDQUFDakIsb0NBQUQsRUFBdUMxQyxhQUF2QyxFQUFzRCxJQUF0RDtBQUhkLE9BQVA7QUFLQTtBQTlIcUYsR0FBL0QsQ0FBeEI7U0FpSWVuQixlIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqICR7Y29weXJpZ2h0fVxuICovXG5cbmltcG9ydCB7IE1hY3JvTWV0YWRhdGEgfSBmcm9tIFwic2FwL2ZlL21hY3Jvc1wiO1xuaW1wb3J0ICogYXMgTWV0YU1vZGVsQ29udmVydGVyIGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL01ldGFNb2RlbENvbnZlcnRlclwiO1xuaW1wb3J0IHsgZ2V0RGlzcGxheU1vZGUgfSBmcm9tIFwic2FwL2ZlL2NvcmUvdGVtcGxhdGluZy9VSUZvcm1hdHRlcnNcIjtcbmltcG9ydCB7IFVJIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9CaW5kaW5nSGVscGVyXCI7XG5pbXBvcnQgeyBnZXRWaXNpYmxlRXhwcmVzc2lvbiwgRmllbGRGb3JtYXRPcHRpb25zLCBnZXRWYWx1ZUJpbmRpbmcgfSBmcm9tIFwic2FwL2ZlL21hY3Jvcy9maWVsZC9GaWVsZFRlbXBsYXRpbmdcIjtcbmltcG9ydCB7XG5cdGFuZCxcblx0aWZFbHNlLFxuXHRhbm5vdGF0aW9uRXhwcmVzc2lvbixcblx0QmluZGluZ0V4cHJlc3Npb24sXG5cdGNvbnN0YW50LFxuXHRjb21waWxlQmluZGluZyxcblx0RXhwcmVzc2lvblxufSBmcm9tIFwic2FwL2ZlL2NvcmUvaGVscGVycy9CaW5kaW5nRXhwcmVzc2lvblwiO1xuaW1wb3J0ICogYXMgRGF0YU1vZGVsUGF0aEhlbHBlciBmcm9tIFwic2FwL2ZlL2NvcmUvdGVtcGxhdGluZy9EYXRhTW9kZWxQYXRoSGVscGVyXCI7XG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCJAc2FwLXV4L2Fubm90YXRpb24tY29udmVydGVyXCI7XG5cbnR5cGUgTXVsdGlJbnB1dFNldHRpbmdzID0ge1xuXHR0ZXh0OiBFeHByZXNzaW9uPHN0cmluZz4gfCBCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+O1xuXHRjb2xsZWN0aW9uOiBCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+O1xuXHRrZXk6IEV4cHJlc3Npb248c3RyaW5nPiB8IEJpbmRpbmdFeHByZXNzaW9uPHN0cmluZz47XG59O1xuLyoqXG4gKiBAY2xhc3NkZXNjXG4gKiBCdWlsZGluZyBibG9jayBmb3IgY3JlYXRpbmcgYSBDb2xsZWN0aW9uRmllbGQgYmFzZWQgb24gdGhlIG1ldGFkYXRhIHByb3ZpZGVkIGJ5IE9EYXRhIFY0LlxuICogPGJyPlxuICogVXN1YWxseSwgYSBEYXRhRmllbGQgYW5ub3RhdGlvbiBpcyBleHBlY3RlZFxuICpcbiAqIFVzYWdlIGV4YW1wbGU6XG4gKiA8cHJlPlxuICogPGludGVybmFsTWFjcm86Q29sbGVjdGlvbkZpZWxkXG4gKiAgIGlkUHJlZml4PVwiU29tZVByZWZpeFwiXG4gKiAgIGNvbnRleHRQYXRoPVwie2VudGl0eVNldD59XCJcbiAqICAgbWV0YVBhdGg9XCJ7ZGF0YUZpZWxkPn1cIlxuICogLz5cbiAqIDwvcHJlPlxuICpcbiAqIEBjbGFzcyBzYXAuZmUubWFjcm9zLmludGVybmFsLkNvbGxlY3Rpb25GaWVsZFxuICogQGhpZGVjb25zdHJ1Y3RvclxuICogQHByaXZhdGVcbiAqIEBleHBlcmltZW50YWxcbiAqIEBzaW5jZSAxLjk0LjBcbiAqL1xuY29uc3QgQ29sbGVjdGlvbkZpZWxkID0gTWFjcm9NZXRhZGF0YS5leHRlbmQoXCJzYXAuZmUubWFjcm9zLmludGVybmFsLkNvbGxlY3Rpb25GaWVsZFwiLCB7XG5cdC8qKlxuXHQgKiBEZWZpbmUgYnVpbGRpbmcgYmxvY2sgc3RlcmVvdHlwZSBmb3IgZG9jdW1lbnRhdGlvblxuXHQgKi9cblx0bmFtZTogXCJDb2xsZWN0aW9uRmllbGRcIixcblx0LyoqXG5cdCAqIE5hbWVzcGFjZSBvZiB0aGUgYnVpbGRpbmcgYmxvY2tcblx0ICovXG5cdG5hbWVzcGFjZTogXCJzYXAuZmUubWFjcm9zLmludGVybmFsXCIsXG5cdC8qKlxuXHQgKiBGcmFnbWVudCBzb3VyY2Ugb2YgdGhlIGJ1aWxkaW5nIGJsb2NrIChvcHRpb25hbClcblx0ICovXG5cdGZyYWdtZW50OiBcInNhcC5mZS5tYWNyb3MuaW50ZXJuYWwuQ29sbGVjdGlvbkZpZWxkXCIsXG5cblx0LyoqXG5cdCAqIFRoZSBtZXRhZGF0YSBkZXNjcmliaW5nIHRoZSBidWlsZGluZyBibG9ja1xuXHQgKi9cblx0bWV0YWRhdGE6IHtcblx0XHQvKipcblx0XHQgKiBEZWZpbmUgYnVpbGRpbmcgYmxvY2sgc3RlcmVvdHlwZSBmb3IgZG9jdW1lbnRhdGlvbiBwdXJwb3NlXG5cdFx0ICovXG5cdFx0c3RlcmVvdHlwZTogXCJ4bWxtYWNyb1wiLFxuXHRcdC8qKlxuXHRcdCAqIFByb3BlcnRpZXMuXG5cdFx0ICovXG5cdFx0cHJvcGVydGllczoge1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBQcmVmaXggYWRkZWQgdG8gdGhlIGdlbmVyYXRlZCBJRCBvZiB0aGUgZmllbGRcblx0XHRcdCAqL1xuXHRcdFx0aWRQcmVmaXg6IHtcblx0XHRcdFx0dHlwZTogXCJzdHJpbmdcIlxuXHRcdFx0fSxcblx0XHRcdC8qKlxuXHRcdFx0ICogUHJlZml4IGFkZGVkIHRvIHRoZSBnZW5lcmF0ZWQgSUQgb2YgdGhlIHZhbHVlIGhlbHAgdXNlZCBmb3IgdGhlIGZpZWxkXG5cdFx0XHQgKi9cblx0XHRcdHZoSWRQcmVmaXg6IHtcblx0XHRcdFx0dHlwZTogXCJzdHJpbmdcIixcblx0XHRcdFx0ZGVmYXVsdFZhbHVlOiBcIkZpZWxkVmFsdWVIZWxwXCJcblx0XHRcdH0sXG5cblx0XHRcdF92aEZsZXhJZDoge1xuXHRcdFx0XHR0eXBlOiBcInN0cmluZ1wiLFxuXHRcdFx0XHRjb21wdXRlZDogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdC8qKlxuXHRcdFx0ICogTWV0YWRhdGEgcGF0aCB0byB0aGUgQ29sbGVjdGlvbkZpZWxkLlxuXHRcdFx0ICogVGhpcyBwcm9wZXJ0eSBpcyB1c3VhbGx5IGEgbWV0YWRhdGFDb250ZXh0IHBvaW50aW5nIHRvIGEgRGF0YUZpZWxkIGhhdmluZyBhIFZhbHVlIHRoYXQgdXNlcyBhIDE6biBuYXZpZ2F0aW9uXG5cdFx0XHQgKi9cblx0XHRcdG1ldGFQYXRoOiB7XG5cdFx0XHRcdHR5cGU6IFwic2FwLnVpLm1vZGVsLkNvbnRleHRcIixcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXG5cdFx0XHRcdCRraW5kOiBcIlByb3BlcnR5XCJcblx0XHRcdH0sXG5cdFx0XHQvKipcblx0XHRcdCAqIFByb3BlcnR5IGFkZGVkIHRvIGFzc29jaWF0ZSB0aGUgbGFiZWwgd2l0aCB0aGUgQ29sbGVjdGlvbkZpZWxkXG5cdFx0XHQgKi9cblx0XHRcdGFyaWFMYWJlbGxlZEJ5OiB7XG5cdFx0XHRcdHR5cGU6IFwic3RyaW5nXCJcblx0XHRcdH0sXG5cdFx0XHRmb3JtYXRPcHRpb25zOiB7XG5cdFx0XHRcdHR5cGU6IFwib2JqZWN0XCIsXG5cdFx0XHRcdHByb3BlcnRpZXM6IHt9XG5cdFx0XHR9LFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBNYW5kYXRvcnkgY29udGV4dCB0byB0aGUgQ29sbGVjdGlvbkZpZWxkXG5cdFx0XHQgKi9cblx0XHRcdGNvbnRleHRQYXRoOiB7XG5cdFx0XHRcdHR5cGU6IFwic2FwLnVpLm1vZGVsLkNvbnRleHRcIixcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXG5cdFx0XHRcdCRraW5kOiBbXCJFbnRpdHlTZXRcIiwgXCJOYXZpZ2F0aW9uUHJvcGVydHlcIl1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGNyZWF0ZTogZnVuY3Rpb24ob1Byb3BzOiBhbnkpIHtcblx0XHRsZXQgb0RhdGFNb2RlbFBhdGggPSBNZXRhTW9kZWxDb252ZXJ0ZXIuZ2V0SW52b2x2ZWREYXRhTW9kZWxPYmplY3RzKG9Qcm9wcy5tZXRhUGF0aCwgb1Byb3BzLmNvbnRleHRQYXRoKTtcblx0XHRjb25zdCBvRGF0YUZpZWxkQ29udmVydGVkID0gTWV0YU1vZGVsQ29udmVydGVyLmNvbnZlcnRNZXRhTW9kZWxDb250ZXh0KG9Qcm9wcy5tZXRhUGF0aCk7XG5cdFx0Y29uc3Qgb1Byb3BlcnR5UGF0aCA9IG9EYXRhRmllbGRDb252ZXJ0ZWQuVmFsdWUuJHRhcmdldDtcblx0XHRjb25zdCBzRXh0cmFQYXRoID0gb0RhdGFGaWVsZENvbnZlcnRlZC5WYWx1ZS5wYXRoO1xuXG5cdFx0b1Byb3BzLnZpc2libGUgPSBnZXRWaXNpYmxlRXhwcmVzc2lvbihvRGF0YU1vZGVsUGF0aCwgb1Byb3BzLmZvcm1hdE9wdGlvbnMpO1xuXHRcdGlmIChzRXh0cmFQYXRoICYmIHNFeHRyYVBhdGgubGVuZ3RoID4gMCkge1xuXHRcdFx0b0RhdGFNb2RlbFBhdGggPSBEYXRhTW9kZWxQYXRoSGVscGVyLmVuaGFuY2VEYXRhTW9kZWxQYXRoKG9EYXRhTW9kZWxQYXRoLCBzRXh0cmFQYXRoKTtcblx0XHR9XG5cdFx0Y29uc3QgYkluc2VydGFibGUgPSBEYXRhTW9kZWxQYXRoSGVscGVyLmlzUGF0aEluc2VydGFibGUob0RhdGFNb2RlbFBhdGgpO1xuXHRcdGNvbnN0IGJEZWxldGFibGUgPSBEYXRhTW9kZWxQYXRoSGVscGVyLmlzUGF0aERlbGV0YWJsZShvRGF0YU1vZGVsUGF0aCk7XG5cdFx0b1Byb3BzLmVkaXRNb2RlID0gY29tcGlsZUJpbmRpbmcoaWZFbHNlKGFuZChiSW5zZXJ0YWJsZSwgYkRlbGV0YWJsZSwgVUkuSXNFZGl0YWJsZSksIGNvbnN0YW50KFwiRWRpdGFibGVcIiksIGNvbnN0YW50KFwiRGlzcGxheVwiKSkpO1xuXHRcdG9Qcm9wcy5kaXNwbGF5TW9kZSA9IGdldERpc3BsYXlNb2RlKG9Qcm9wZXJ0eVBhdGgsIG9EYXRhTW9kZWxQYXRoKTtcblxuXHRcdGNvbnN0IG11bHRpSW5wdXRTZXR0aW5ncyA9IENvbGxlY3Rpb25GaWVsZC5fZ2V0TXVsdGlJbnB1dFNldHRpbmdzKG9EYXRhTW9kZWxQYXRoLCBvUHJvcHMuZm9ybWF0T3B0aW9ucyk7XG5cdFx0b1Byb3BzLnRleHQgPSBtdWx0aUlucHV0U2V0dGluZ3MudGV4dDtcblx0XHRvUHJvcHMuY29sbGVjdGlvbiA9IG11bHRpSW5wdXRTZXR0aW5ncy5jb2xsZWN0aW9uO1xuXHRcdG9Qcm9wcy5rZXkgPSBtdWx0aUlucHV0U2V0dGluZ3Mua2V5O1xuXHRcdHJldHVybiBvUHJvcHM7XG5cdH0sXG5cdF9nZXRNdWx0aUlucHV0U2V0dGluZ3M6IGZ1bmN0aW9uKFxuXHRcdG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGg6IERhdGFNb2RlbFBhdGhIZWxwZXIuRGF0YU1vZGVsT2JqZWN0UGF0aCxcblx0XHRmb3JtYXRPcHRpb25zOiBGaWVsZEZvcm1hdE9wdGlvbnNcblx0KTogTXVsdGlJbnB1dFNldHRpbmdzIHtcblx0XHRjb25zdCBjb2xsZWN0aW9uUGF0aCA9XG5cdFx0XHRcIntwYXRoOidcIiArXG5cdFx0XHREYXRhTW9kZWxQYXRoSGVscGVyLmdldFRhcmdldEVudGl0eVNldFBhdGgob1Byb3BlcnR5RGF0YU1vZGVsT2JqZWN0UGF0aCwgdHJ1ZSkgK1xuXHRcdFx0XCInLCAgcGFyYW1ldGVycyA6IHsgJCRncm91cElkIDogJyRhdXRvLldvcmtlcnMnIH0gLCB0ZW1wbGF0ZVNoYXJlYWJsZTogZmFsc2V9XCI7XG5cblx0XHRjb25zdCBuYXZzID0gRGF0YU1vZGVsUGF0aEhlbHBlci5nZXRUYXJnZXRFbnRpdHlTZXROYXZpZ2F0aW9uKG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGgpO1xuXHRcdGNvbnN0IG9SZWxhdGl2ZVByb3BlcnR5RGF0YU1vZGVsT2JqZWN0UGF0aCA9IE9iamVjdC5hc3NpZ24oe30sIG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGgpO1xuXHRcdGlmIChvUmVsYXRpdmVQcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGguY29udGV4dExvY2F0aW9uKSB7XG5cdFx0XHRvUmVsYXRpdmVQcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGguY29udGV4dExvY2F0aW9uLm5hdmlnYXRpb25Qcm9wZXJ0aWVzID0gbmF2cztcblx0XHR9XG5cdFx0Y29uc3Qgb1Byb3BlcnR5RGVmaW5pdGlvbiA9XG5cdFx0XHRvUHJvcGVydHlEYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdC50eXBlID09PSBcIlByb3BlcnR5UGF0aFwiXG5cdFx0XHRcdD8gKG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0T2JqZWN0LiR0YXJnZXQgYXMgUHJvcGVydHkpXG5cdFx0XHRcdDogKG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0T2JqZWN0IGFzIFByb3BlcnR5KTtcblx0XHRjb25zdCBjb21tb25UZXh0ID0gb1Byb3BlcnR5RGVmaW5pdGlvbi5hbm5vdGF0aW9ucz8uQ29tbW9uPy5UZXh0O1xuXHRcdGNvbnN0IHJlbGF0aXZlTG9jYXRpb24gPSBEYXRhTW9kZWxQYXRoSGVscGVyLmdldFBhdGhSZWxhdGl2ZUxvY2F0aW9uKFxuXHRcdFx0b1Byb3BlcnR5RGF0YU1vZGVsT2JqZWN0UGF0aC5jb250ZXh0TG9jYXRpb24sXG5cdFx0XHRvUHJvcGVydHlEYXRhTW9kZWxPYmplY3RQYXRoLm5hdmlnYXRpb25Qcm9wZXJ0aWVzXG5cdFx0KS5tYXAobnAgPT4gbnAubmFtZSk7XG5cblx0XHRjb25zdCB0ZXh0RXhwcmVzc2lvbiA9IGNvbW1vblRleHRcblx0XHRcdD8gY29tcGlsZUJpbmRpbmcoYW5ub3RhdGlvbkV4cHJlc3Npb24oY29tbW9uVGV4dCwgcmVsYXRpdmVMb2NhdGlvbikgYXMgRXhwcmVzc2lvbjxzdHJpbmc+KVxuXHRcdFx0OiBnZXRWYWx1ZUJpbmRpbmcob1JlbGF0aXZlUHJvcGVydHlEYXRhTW9kZWxPYmplY3RQYXRoLCBmb3JtYXRPcHRpb25zLCB0cnVlKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGV4dDogdGV4dEV4cHJlc3Npb24sXG5cdFx0XHRjb2xsZWN0aW9uOiBjb2xsZWN0aW9uUGF0aCxcblx0XHRcdGtleTogZ2V0VmFsdWVCaW5kaW5nKG9SZWxhdGl2ZVByb3BlcnR5RGF0YU1vZGVsT2JqZWN0UGF0aCwgZm9ybWF0T3B0aW9ucywgdHJ1ZSlcblx0XHR9O1xuXHR9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ29sbGVjdGlvbkZpZWxkO1xuIl19