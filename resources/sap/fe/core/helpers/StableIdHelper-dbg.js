/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define([], function () {
  "use strict";

  var _exports = {};

  /*!
   * ${copyright}
   */

  /**
   * Stable Id helper
   */

  /**
   * Copy for the Core.isValid function to be independent.
   *
   * @param {string} vValue String to validate
   * @returns {boolean} Whether the value is valid or not
   */
  function isValid(vValue) {
    return /^([A-Za-z_][-A-Za-z0-9_.:]*)$/.test(vValue);
  }

  function replaceSpecialChars(sId) {
    if (sId.indexOf(" ") >= 0) {
      // Log.error(sId + " - Spaces are not allowed in ID parts.");
      throw sId + " - Spaces are not allowed in ID parts.";
    }

    sId = sId.replace(/^\/|^@|^#|^\*/, "") // remove special characters from the beginning of the string
    .replace(/\/$|@$|#$|\*$/, "") // remove special characters from the end of the string
    .replace(/\/|@|\(|\)|#|\*/g, "::"); // replace special characters with ::
    // Replace double occurrences of the separator with a single separator

    while (sId.indexOf("::::") > -1) {
      sId = sId.replace("::::", "::");
    } // If there is a :: at the end of the ID remove it


    if (sId.slice(-2) == "::") {
      sId = sId.slice(0, -2);
    }

    return sId;
  }

  _exports.replaceSpecialChars = replaceSpecialChars;

  function removeNamespaces(sId) {
    sId = sId.replace("com.sap.vocabularies.UI.v1.", "");
    sId = sId.replace("com.sap.vocabularies.Communication.v1.", "");
    return sId;
  }

  function getStableIdPartFromValue(oValue) {
    if (oValue && oValue.$Path || oValue.path) {
      return oValue.$Path || oValue.path;
    }

    if (oValue && oValue.$Apply && oValue.$Function === "odata.concat") {
      var sPathConcat = "";

      for (var i = 0; i < oValue.$Apply.length; i++) {
        if (oValue.$Apply[i].$Path) {
          if (sPathConcat) {
            sPathConcat += "::";
          }

          sPathConcat += oValue.$Apply[i].$Path;
        }
      }

      return sPathConcat;
    }

    if (oValue) {
      return replaceSpecialChars(oValue.replace(/ /g, "_"));
    }
  }
  /**
   * Generates Stable Id based on the given parameters
   *
   * parameters are combined in the same order that they are provided and are separated by '::'
   * special characters (@, /, #) are replaced by '::' if they are in the middle of the Stable Id and removed all together if the are part at the beginning or end
   * Example:
   * // Get Constant Stable Id
   * generate(['Stable', 'Id']) would result in 'Stable::Id' as the Stable Id
   *
   * // Get Paramerterized Stable Id from a Collection Facet
   * var oParameter = {
   * 		Facet: {
   * 			$Type: "com.sap.vocabularies.UI.v1.CollectionFacet",
   * 			Label: "General Info Facet Label",
   * 			ID: 'GeneralInformation'
   * 		}
   * };
   * generate(['section', oParameter]) would result in 'section::GeneralInformation' as the Stable Id
   *
   * oParameter is and object of Metadata contexts available while templating which will be used to generate Stable IDs.
   * oParameter object keys define the type of metadata context.
   * For example, the key 'Facet'in the above example tells the Stable Id Helper that the context is a Facet (could be reference or collection facet)
   *
   * Currently supported metadata context is Collection/Reference facet identified by 'Facet' key.
   *
   * @param {Array<(string|object)>} aStableIdParts Array of strings and objects
   * @returns {string} Stable Id constructed from the provided parameters
   */


  var generate = function (aStableIdParts) {
    var sStableId = "",
        vElement,
        sFacetId;

    for (var i = 0; i < aStableIdParts.length; i++) {
      vElement = aStableIdParts[i];

      if (!vElement) {
        continue;
      }

      sStableId += sStableId !== "" ? "::" : "";

      if (vElement["Facet"] && vElement["Facet"]["$Type"] && vElement["Facet"]["$Type"] == "com.sap.vocabularies.UI.v1.CollectionFacet") {
        sStableId += vElement["Facet"]["ID"];
      } else if (typeof vElement === "string") {
        if (vElement) {
          sStableId += vElement;
        }
      } else if (typeof vElement === "object") {
        // handle parameters
        if (vElement && vElement.Facet) {
          if (vElement.Facet.$Type && vElement.Facet.$Type === "com.sap.vocabularies.UI.v1.CollectionFacet") {
            if (vElement.Facet.ID) {
              sFacetId = vElement.Facet.ID;
            }
          } else if (vElement.Facet.$Type && vElement.Facet.$Type === "com.sap.vocabularies.UI.v1.ReferenceFacet") {
            if (vElement.Facet.ID) {
              sFacetId = vElement.Facet.ID;
            } else {
              sFacetId = vElement.Facet.Target.$AnnotationPath || vElement.Facet.Target.value; // Compliant with Converters
            }
          }

          if (sFacetId) {
            sStableId += sFacetId;
          }
        } else if (vElement && vElement.FacetSource) {
          if (vElement.FacetSource === "com.sap.vocabularies.UI.v1.HeaderFacets") {
            sStableId += "HeaderFacet";
          }
        }

        if (vElement && vElement["$Type"] && vElement["$Type"].indexOf("com.sap.vocabularies.UI.v1.DataField") > -1) {
          sStableId += getStableIdPartFromDataField(vElement);
        }
      }
    }

    sStableId = prepareId(sStableId);
    return sStableId;
  };

  _exports.generate = generate;

  var getStableIdPartFromSemanticObjectAndAction = function (oDataField) {
    var sIdPart = "";

    if (typeof oDataField.SemanticObject == "string") {
      sIdPart += oDataField.SemanticObject;
    } else if (oDataField.SemanticObject.$Path) {
      sIdPart += oDataField.SemanticObject.$Path;
    }

    if (typeof oDataField.Action == "string") {
      sIdPart += "::" + oDataField.Action;
    } else if (oDataField.Action && oDataField.Action.$Path) {
      sIdPart += "::" + oDataField.Action.$Path;
    }

    if (oDataField["RequiresContext"] && oDataField["RequiresContext"] == true) {
      sIdPart += "::RequiresContext";
    }

    return sIdPart;
  };

  _exports.getStableIdPartFromSemanticObjectAndAction = getStableIdPartFromSemanticObjectAndAction;

  var getStableIdPartFromDataField = function (oDataField) {
    var mParameter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var sIdPart = "";

    if (oDataField.$Type && oDataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForAction") {
      sIdPart = "DataFieldForAction::";
      sIdPart += oDataField.Action;
      return prepareId(sIdPart);
    } else if (oDataField.$Type && oDataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation") {
      sIdPart = "DataFieldForIntentBasedNavigation::";
      sIdPart += getStableIdPartFromSemanticObjectAndAction(oDataField);
      return sIdPart;
    } else if (oDataField.$Type && oDataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForAnnotation") {
      sIdPart = "DataFieldForAnnotation::";
      sIdPart += prepareId(oDataField.Target.$AnnotationPath || oDataField.Target.value);
      return sIdPart;
    } else if (oDataField.$Type && oDataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldWithAction") {
      sIdPart = "DataFieldWithAction::";

      if (oDataField.Value) {
        sIdPart += getStableIdPartFromValue(oDataField.Value) + "::";
      }

      sIdPart += oDataField.Action;
      return prepareId(sIdPart);
    } else if (oDataField.$Type && oDataField.$Type === "com.sap.vocabularies.UI.v1.DataField") {
      sIdPart = "DataField::";
      sIdPart += getStableIdPartFromValue(oDataField.Value);
      return prepareId(sIdPart);
    } else if (oDataField.$Type && oDataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldWithIntentBasedNavigation") {
      sIdPart = "DataFieldWithIntentBasedNavigation::";
      sIdPart += getStableIdPartFromValue(oDataField.Value) + "::";
      sIdPart += getStableIdPartFromSemanticObjectAndAction(oDataField);
      return prepareId(sIdPart);
    } else if (oDataField.$Type && oDataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldWithNavigationPath") {
      sIdPart = "DataFieldWithNavigationPath::";
      sIdPart += getStableIdPartFromValue(oDataField.Value);

      if (oDataField.Target && oDataField.Target["$NavigationPropertyPath"]) {
        sIdPart += "::" + oDataField.Target["$NavigationPropertyPath"];
      }

      return prepareId(sIdPart);
    } else if (oDataField.$Type && oDataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldWithUrl") {
      sIdPart = "DataFieldWithUrl::";
      sIdPart += getStableIdPartFromValue(oDataField.Value);
      return prepareId(sIdPart);
    } else if (mParameter && mParameter.context && mParameter.context.getObject("@sapui.name")) {
      // the context is not referring to da data field but directly to a property, return the property name
      return prepareId(mParameter.context.getObject("@sapui.name").toString());
    } else {// In case of a string or unknown property
      // Log.error("Stable ID Helper: Unable to create a stable ID. Please check the annotations.");
    }

    return undefined;
  };

  _exports.getStableIdPartFromDataField = getStableIdPartFromDataField;

  var prepareId = function (sId) {
    sId = replaceSpecialChars(removeNamespaces(sId));

    if (isValid(sId)) {
      return sId;
    } else {
      // Log.error(sId + " - Stable Id could not be generated due to insufficient information.");
      throw sId + " - Stable Id could not be generated due to insufficient information.";
    }
  };

  _exports.prepareId = prepareId;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN0YWJsZUlkSGVscGVyLnRzIl0sIm5hbWVzIjpbImlzVmFsaWQiLCJ2VmFsdWUiLCJ0ZXN0IiwicmVwbGFjZVNwZWNpYWxDaGFycyIsInNJZCIsImluZGV4T2YiLCJyZXBsYWNlIiwic2xpY2UiLCJyZW1vdmVOYW1lc3BhY2VzIiwiZ2V0U3RhYmxlSWRQYXJ0RnJvbVZhbHVlIiwib1ZhbHVlIiwiJFBhdGgiLCJwYXRoIiwiJEFwcGx5IiwiJEZ1bmN0aW9uIiwic1BhdGhDb25jYXQiLCJpIiwibGVuZ3RoIiwiZ2VuZXJhdGUiLCJhU3RhYmxlSWRQYXJ0cyIsInNTdGFibGVJZCIsInZFbGVtZW50Iiwic0ZhY2V0SWQiLCJGYWNldCIsIiRUeXBlIiwiSUQiLCJUYXJnZXQiLCIkQW5ub3RhdGlvblBhdGgiLCJ2YWx1ZSIsIkZhY2V0U291cmNlIiwiZ2V0U3RhYmxlSWRQYXJ0RnJvbURhdGFGaWVsZCIsInByZXBhcmVJZCIsImdldFN0YWJsZUlkUGFydEZyb21TZW1hbnRpY09iamVjdEFuZEFjdGlvbiIsIm9EYXRhRmllbGQiLCJzSWRQYXJ0IiwiU2VtYW50aWNPYmplY3QiLCJBY3Rpb24iLCJtUGFyYW1ldGVyIiwiVmFsdWUiLCJjb250ZXh0IiwiZ2V0T2JqZWN0IiwidG9TdHJpbmciLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7Ozs7OztBQUZBO0FBQ0E7QUFDQTs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBU0EsT0FBVCxDQUFpQkMsTUFBakIsRUFBaUM7QUFDaEMsV0FBTyxnQ0FBZ0NDLElBQWhDLENBQXFDRCxNQUFyQyxDQUFQO0FBQ0E7O0FBRU0sV0FBU0UsbUJBQVQsQ0FBNkJDLEdBQTdCLEVBQTBDO0FBQ2hELFFBQUlBLEdBQUcsQ0FBQ0MsT0FBSixDQUFZLEdBQVosS0FBb0IsQ0FBeEIsRUFBMkI7QUFDMUI7QUFDQSxZQUFNRCxHQUFHLEdBQUcsd0NBQVo7QUFDQTs7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QUFQO0FBQ0EsS0FGRCxNQUVPO0FBQ047QUFDQSxZQUFNQSxHQUFHLEdBQUcsc0VBQVo7QUFDQTtBQUNELEdBUk0iLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogJHtjb3B5cmlnaHR9XG4gKi9cblxuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJzYXAvdWkvbW9kZWxcIjtcblxuLyoqXG4gKiBTdGFibGUgSWQgaGVscGVyXG4gKi9cblxuLyoqXG4gKiBDb3B5IGZvciB0aGUgQ29yZS5pc1ZhbGlkIGZ1bmN0aW9uIHRvIGJlIGluZGVwZW5kZW50LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2VmFsdWUgU3RyaW5nIHRvIHZhbGlkYXRlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciB0aGUgdmFsdWUgaXMgdmFsaWQgb3Igbm90XG4gKi9cbmZ1bmN0aW9uIGlzVmFsaWQodlZhbHVlOiBzdHJpbmcpIHtcblx0cmV0dXJuIC9eKFtBLVphLXpfXVstQS1aYS16MC05Xy46XSopJC8udGVzdCh2VmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZVNwZWNpYWxDaGFycyhzSWQ6IHN0cmluZykge1xuXHRpZiAoc0lkLmluZGV4T2YoXCIgXCIpID49IDApIHtcblx0XHQvLyBMb2cuZXJyb3Ioc0lkICsgXCIgLSBTcGFjZXMgYXJlIG5vdCBhbGxvd2VkIGluIElEIHBhcnRzLlwiKTtcblx0XHR0aHJvdyBzSWQgKyBcIiAtIFNwYWNlcyBhcmUgbm90IGFsbG93ZWQgaW4gSUQgcGFydHMuXCI7XG5cdH1cblx0c0lkID0gc0lkXG5cdFx0LnJlcGxhY2UoL15cXC98XkB8XiN8XlxcKi8sIFwiXCIpIC8vIHJlbW92ZSBzcGVjaWFsIGNoYXJhY3RlcnMgZnJvbSB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzdHJpbmdcblx0XHQucmVwbGFjZSgvXFwvJHxAJHwjJHxcXCokLywgXCJcIikgLy8gcmVtb3ZlIHNwZWNpYWwgY2hhcmFjdGVycyBmcm9tIHRoZSBlbmQgb2YgdGhlIHN0cmluZ1xuXHRcdC5yZXBsYWNlKC9cXC98QHxcXCh8XFwpfCN8XFwqL2csIFwiOjpcIik7IC8vIHJlcGxhY2Ugc3BlY2lhbCBjaGFyYWN0ZXJzIHdpdGggOjpcblxuXHQvLyBSZXBsYWNlIGRvdWJsZSBvY2N1cnJlbmNlcyBvZiB0aGUgc2VwYXJhdG9yIHdpdGggYSBzaW5nbGUgc2VwYXJhdG9yXG5cdHdoaWxlIChzSWQuaW5kZXhPZihcIjo6OjpcIikgPiAtMSkge1xuXHRcdHNJZCA9IHNJZC5yZXBsYWNlKFwiOjo6OlwiLCBcIjo6XCIpO1xuXHR9XG5cblx0Ly8gSWYgdGhlcmUgaXMgYSA6OiBhdCB0aGUgZW5kIG9mIHRoZSBJRCByZW1vdmUgaXRcblx0aWYgKHNJZC5zbGljZSgtMikgPT0gXCI6OlwiKSB7XG5cdFx0c0lkID0gc0lkLnNsaWNlKDAsIC0yKTtcblx0fVxuXG5cdHJldHVybiBzSWQ7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZU5hbWVzcGFjZXMoc0lkOiBzdHJpbmcpIHtcblx0c0lkID0gc0lkLnJlcGxhY2UoXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5cIiwgXCJcIik7XG5cdHNJZCA9IHNJZC5yZXBsYWNlKFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbXVuaWNhdGlvbi52MS5cIiwgXCJcIik7XG5cdHJldHVybiBzSWQ7XG59XG5cbmZ1bmN0aW9uIGdldFN0YWJsZUlkUGFydEZyb21WYWx1ZShvVmFsdWU6IGFueSkge1xuXHRpZiAoKG9WYWx1ZSAmJiBvVmFsdWUuJFBhdGgpIHx8IG9WYWx1ZS5wYXRoKSB7XG5cdFx0cmV0dXJuIG9WYWx1ZS4kUGF0aCB8fCBvVmFsdWUucGF0aDtcblx0fVxuXG5cdGlmIChvVmFsdWUgJiYgb1ZhbHVlLiRBcHBseSAmJiBvVmFsdWUuJEZ1bmN0aW9uID09PSBcIm9kYXRhLmNvbmNhdFwiKSB7XG5cdFx0bGV0IHNQYXRoQ29uY2F0ID0gXCJcIjtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG9WYWx1ZS4kQXBwbHkubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChvVmFsdWUuJEFwcGx5W2ldLiRQYXRoKSB7XG5cdFx0XHRcdGlmIChzUGF0aENvbmNhdCkge1xuXHRcdFx0XHRcdHNQYXRoQ29uY2F0ICs9IFwiOjpcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRzUGF0aENvbmNhdCArPSBvVmFsdWUuJEFwcGx5W2ldLiRQYXRoO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gc1BhdGhDb25jYXQ7XG5cdH1cblxuXHRpZiAob1ZhbHVlKSB7XG5cdFx0cmV0dXJuIHJlcGxhY2VTcGVjaWFsQ2hhcnMob1ZhbHVlLnJlcGxhY2UoLyAvZywgXCJfXCIpKTtcblx0fVxufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBTdGFibGUgSWQgYmFzZWQgb24gdGhlIGdpdmVuIHBhcmFtZXRlcnNcbiAqXG4gKiBwYXJhbWV0ZXJzIGFyZSBjb21iaW5lZCBpbiB0aGUgc2FtZSBvcmRlciB0aGF0IHRoZXkgYXJlIHByb3ZpZGVkIGFuZCBhcmUgc2VwYXJhdGVkIGJ5ICc6OidcbiAqIHNwZWNpYWwgY2hhcmFjdGVycyAoQCwgLywgIykgYXJlIHJlcGxhY2VkIGJ5ICc6OicgaWYgdGhleSBhcmUgaW4gdGhlIG1pZGRsZSBvZiB0aGUgU3RhYmxlIElkIGFuZCByZW1vdmVkIGFsbCB0b2dldGhlciBpZiB0aGUgYXJlIHBhcnQgYXQgdGhlIGJlZ2lubmluZyBvciBlbmRcbiAqIEV4YW1wbGU6XG4gKiAvLyBHZXQgQ29uc3RhbnQgU3RhYmxlIElkXG4gKiBnZW5lcmF0ZShbJ1N0YWJsZScsICdJZCddKSB3b3VsZCByZXN1bHQgaW4gJ1N0YWJsZTo6SWQnIGFzIHRoZSBTdGFibGUgSWRcbiAqXG4gKiAvLyBHZXQgUGFyYW1lcnRlcml6ZWQgU3RhYmxlIElkIGZyb20gYSBDb2xsZWN0aW9uIEZhY2V0XG4gKiB2YXIgb1BhcmFtZXRlciA9IHtcbiAqIFx0XHRGYWNldDoge1xuICogXHRcdFx0JFR5cGU6IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuQ29sbGVjdGlvbkZhY2V0XCIsXG4gKiBcdFx0XHRMYWJlbDogXCJHZW5lcmFsIEluZm8gRmFjZXQgTGFiZWxcIixcbiAqIFx0XHRcdElEOiAnR2VuZXJhbEluZm9ybWF0aW9uJ1xuICogXHRcdH1cbiAqIH07XG4gKiBnZW5lcmF0ZShbJ3NlY3Rpb24nLCBvUGFyYW1ldGVyXSkgd291bGQgcmVzdWx0IGluICdzZWN0aW9uOjpHZW5lcmFsSW5mb3JtYXRpb24nIGFzIHRoZSBTdGFibGUgSWRcbiAqXG4gKiBvUGFyYW1ldGVyIGlzIGFuZCBvYmplY3Qgb2YgTWV0YWRhdGEgY29udGV4dHMgYXZhaWxhYmxlIHdoaWxlIHRlbXBsYXRpbmcgd2hpY2ggd2lsbCBiZSB1c2VkIHRvIGdlbmVyYXRlIFN0YWJsZSBJRHMuXG4gKiBvUGFyYW1ldGVyIG9iamVjdCBrZXlzIGRlZmluZSB0aGUgdHlwZSBvZiBtZXRhZGF0YSBjb250ZXh0LlxuICogRm9yIGV4YW1wbGUsIHRoZSBrZXkgJ0ZhY2V0J2luIHRoZSBhYm92ZSBleGFtcGxlIHRlbGxzIHRoZSBTdGFibGUgSWQgSGVscGVyIHRoYXQgdGhlIGNvbnRleHQgaXMgYSBGYWNldCAoY291bGQgYmUgcmVmZXJlbmNlIG9yIGNvbGxlY3Rpb24gZmFjZXQpXG4gKlxuICogQ3VycmVudGx5IHN1cHBvcnRlZCBtZXRhZGF0YSBjb250ZXh0IGlzIENvbGxlY3Rpb24vUmVmZXJlbmNlIGZhY2V0IGlkZW50aWZpZWQgYnkgJ0ZhY2V0JyBrZXkuXG4gKlxuICogQHBhcmFtIHtBcnJheTwoc3RyaW5nfG9iamVjdCk+fSBhU3RhYmxlSWRQYXJ0cyBBcnJheSBvZiBzdHJpbmdzIGFuZCBvYmplY3RzXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBTdGFibGUgSWQgY29uc3RydWN0ZWQgZnJvbSB0aGUgcHJvdmlkZWQgcGFyYW1ldGVyc1xuICovXG5leHBvcnQgY29uc3QgZ2VuZXJhdGUgPSBmdW5jdGlvbihhU3RhYmxlSWRQYXJ0czogQXJyYXk8c3RyaW5nIHwgb2JqZWN0Pikge1xuXHRsZXQgc1N0YWJsZUlkID0gXCJcIixcblx0XHR2RWxlbWVudDogYW55LFxuXHRcdHNGYWNldElkO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgYVN0YWJsZUlkUGFydHMubGVuZ3RoOyBpKyspIHtcblx0XHR2RWxlbWVudCA9IGFTdGFibGVJZFBhcnRzW2ldO1xuXHRcdGlmICghdkVsZW1lbnQpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblx0XHRzU3RhYmxlSWQgKz0gc1N0YWJsZUlkICE9PSBcIlwiID8gXCI6OlwiIDogXCJcIjtcblx0XHRpZiAodkVsZW1lbnRbXCJGYWNldFwiXSAmJiB2RWxlbWVudFtcIkZhY2V0XCJdW1wiJFR5cGVcIl0gJiYgdkVsZW1lbnRbXCJGYWNldFwiXVtcIiRUeXBlXCJdID09IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuQ29sbGVjdGlvbkZhY2V0XCIpIHtcblx0XHRcdHNTdGFibGVJZCArPSB2RWxlbWVudFtcIkZhY2V0XCJdW1wiSURcIl07XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgdkVsZW1lbnQgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdGlmICh2RWxlbWVudCkge1xuXHRcdFx0XHRzU3RhYmxlSWQgKz0gdkVsZW1lbnQ7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgdkVsZW1lbnQgPT09IFwib2JqZWN0XCIpIHtcblx0XHRcdC8vIGhhbmRsZSBwYXJhbWV0ZXJzXG5cdFx0XHRpZiAodkVsZW1lbnQgJiYgdkVsZW1lbnQuRmFjZXQpIHtcblx0XHRcdFx0aWYgKHZFbGVtZW50LkZhY2V0LiRUeXBlICYmIHZFbGVtZW50LkZhY2V0LiRUeXBlID09PSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkNvbGxlY3Rpb25GYWNldFwiKSB7XG5cdFx0XHRcdFx0aWYgKHZFbGVtZW50LkZhY2V0LklEKSB7XG5cdFx0XHRcdFx0XHRzRmFjZXRJZCA9IHZFbGVtZW50LkZhY2V0LklEO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmICh2RWxlbWVudC5GYWNldC4kVHlwZSAmJiB2RWxlbWVudC5GYWNldC4kVHlwZSA9PT0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5SZWZlcmVuY2VGYWNldFwiKSB7XG5cdFx0XHRcdFx0aWYgKHZFbGVtZW50LkZhY2V0LklEKSB7XG5cdFx0XHRcdFx0XHRzRmFjZXRJZCA9IHZFbGVtZW50LkZhY2V0LklEO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRzRmFjZXRJZCA9IHZFbGVtZW50LkZhY2V0LlRhcmdldC4kQW5ub3RhdGlvblBhdGggfHwgdkVsZW1lbnQuRmFjZXQuVGFyZ2V0LnZhbHVlOyAvLyBDb21wbGlhbnQgd2l0aCBDb252ZXJ0ZXJzXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChzRmFjZXRJZCkge1xuXHRcdFx0XHRcdHNTdGFibGVJZCArPSBzRmFjZXRJZDtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICh2RWxlbWVudCAmJiB2RWxlbWVudC5GYWNldFNvdXJjZSkge1xuXHRcdFx0XHRpZiAodkVsZW1lbnQuRmFjZXRTb3VyY2UgPT09IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuSGVhZGVyRmFjZXRzXCIpIHtcblx0XHRcdFx0XHRzU3RhYmxlSWQgKz0gXCJIZWFkZXJGYWNldFwiO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodkVsZW1lbnQgJiYgdkVsZW1lbnRbXCIkVHlwZVwiXSAmJiB2RWxlbWVudFtcIiRUeXBlXCJdLmluZGV4T2YoXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhRmllbGRcIikgPiAtMSkge1xuXHRcdFx0XHRzU3RhYmxlSWQgKz0gZ2V0U3RhYmxlSWRQYXJ0RnJvbURhdGFGaWVsZCh2RWxlbWVudCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHNTdGFibGVJZCA9IHByZXBhcmVJZChzU3RhYmxlSWQpO1xuXHRyZXR1cm4gc1N0YWJsZUlkO1xufTtcbmV4cG9ydCBjb25zdCBnZXRTdGFibGVJZFBhcnRGcm9tU2VtYW50aWNPYmplY3RBbmRBY3Rpb24gPSBmdW5jdGlvbihvRGF0YUZpZWxkOiBhbnkpOiBzdHJpbmcge1xuXHRsZXQgc0lkUGFydCA9IFwiXCI7XG5cdGlmICh0eXBlb2Ygb0RhdGFGaWVsZC5TZW1hbnRpY09iamVjdCA9PSBcInN0cmluZ1wiKSB7XG5cdFx0c0lkUGFydCArPSBvRGF0YUZpZWxkLlNlbWFudGljT2JqZWN0O1xuXHR9IGVsc2UgaWYgKG9EYXRhRmllbGQuU2VtYW50aWNPYmplY3QuJFBhdGgpIHtcblx0XHRzSWRQYXJ0ICs9IG9EYXRhRmllbGQuU2VtYW50aWNPYmplY3QuJFBhdGg7XG5cdH1cblx0aWYgKHR5cGVvZiBvRGF0YUZpZWxkLkFjdGlvbiA9PSBcInN0cmluZ1wiKSB7XG5cdFx0c0lkUGFydCArPSBcIjo6XCIgKyBvRGF0YUZpZWxkLkFjdGlvbjtcblx0fSBlbHNlIGlmIChvRGF0YUZpZWxkLkFjdGlvbiAmJiBvRGF0YUZpZWxkLkFjdGlvbi4kUGF0aCkge1xuXHRcdHNJZFBhcnQgKz0gXCI6OlwiICsgb0RhdGFGaWVsZC5BY3Rpb24uJFBhdGg7XG5cdH1cblx0aWYgKG9EYXRhRmllbGRbXCJSZXF1aXJlc0NvbnRleHRcIl0gJiYgb0RhdGFGaWVsZFtcIlJlcXVpcmVzQ29udGV4dFwiXSA9PSB0cnVlKSB7XG5cdFx0c0lkUGFydCArPSBcIjo6UmVxdWlyZXNDb250ZXh0XCI7XG5cdH1cblx0cmV0dXJuIHNJZFBhcnQ7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0U3RhYmxlSWRQYXJ0RnJvbURhdGFGaWVsZCA9IGZ1bmN0aW9uKG9EYXRhRmllbGQ6IGFueSwgbVBhcmFtZXRlcjogeyBjb250ZXh0PzogQ29udGV4dDxhbnk+IH0gPSB7fSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG5cdGxldCBzSWRQYXJ0ID0gXCJcIjtcblxuXHRpZiAob0RhdGFGaWVsZC4kVHlwZSAmJiBvRGF0YUZpZWxkLiRUeXBlID09PSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkRhdGFGaWVsZEZvckFjdGlvblwiKSB7XG5cdFx0c0lkUGFydCA9IFwiRGF0YUZpZWxkRm9yQWN0aW9uOjpcIjtcblx0XHRzSWRQYXJ0ICs9IG9EYXRhRmllbGQuQWN0aW9uO1xuXHRcdHJldHVybiBwcmVwYXJlSWQoc0lkUGFydCk7XG5cdH0gZWxzZSBpZiAob0RhdGFGaWVsZC4kVHlwZSAmJiBvRGF0YUZpZWxkLiRUeXBlID09PSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkRhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvblwiKSB7XG5cdFx0c0lkUGFydCA9IFwiRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uOjpcIjtcblx0XHRzSWRQYXJ0ICs9IGdldFN0YWJsZUlkUGFydEZyb21TZW1hbnRpY09iamVjdEFuZEFjdGlvbihvRGF0YUZpZWxkKTtcblx0XHRyZXR1cm4gc0lkUGFydDtcblx0fSBlbHNlIGlmIChvRGF0YUZpZWxkLiRUeXBlICYmIG9EYXRhRmllbGQuJFR5cGUgPT09IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRGF0YUZpZWxkRm9yQW5ub3RhdGlvblwiKSB7XG5cdFx0c0lkUGFydCA9IFwiRGF0YUZpZWxkRm9yQW5ub3RhdGlvbjo6XCI7XG5cdFx0c0lkUGFydCArPSBwcmVwYXJlSWQob0RhdGFGaWVsZC5UYXJnZXQuJEFubm90YXRpb25QYXRoIHx8IG9EYXRhRmllbGQuVGFyZ2V0LnZhbHVlKTtcblx0XHRyZXR1cm4gc0lkUGFydDtcblx0fSBlbHNlIGlmIChvRGF0YUZpZWxkLiRUeXBlICYmIG9EYXRhRmllbGQuJFR5cGUgPT09IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRGF0YUZpZWxkV2l0aEFjdGlvblwiKSB7XG5cdFx0c0lkUGFydCA9IFwiRGF0YUZpZWxkV2l0aEFjdGlvbjo6XCI7XG5cdFx0aWYgKG9EYXRhRmllbGQuVmFsdWUpIHtcblx0XHRcdHNJZFBhcnQgKz0gZ2V0U3RhYmxlSWRQYXJ0RnJvbVZhbHVlKG9EYXRhRmllbGQuVmFsdWUpICsgXCI6OlwiO1xuXHRcdH1cblx0XHRzSWRQYXJ0ICs9IG9EYXRhRmllbGQuQWN0aW9uO1xuXHRcdHJldHVybiBwcmVwYXJlSWQoc0lkUGFydCk7XG5cdH0gZWxzZSBpZiAob0RhdGFGaWVsZC4kVHlwZSAmJiBvRGF0YUZpZWxkLiRUeXBlID09PSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkRhdGFGaWVsZFwiKSB7XG5cdFx0c0lkUGFydCA9IFwiRGF0YUZpZWxkOjpcIjtcblx0XHRzSWRQYXJ0ICs9IGdldFN0YWJsZUlkUGFydEZyb21WYWx1ZShvRGF0YUZpZWxkLlZhbHVlKTtcblx0XHRyZXR1cm4gcHJlcGFyZUlkKHNJZFBhcnQpO1xuXHR9IGVsc2UgaWYgKG9EYXRhRmllbGQuJFR5cGUgJiYgb0RhdGFGaWVsZC4kVHlwZSA9PT0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhRmllbGRXaXRoSW50ZW50QmFzZWROYXZpZ2F0aW9uXCIpIHtcblx0XHRzSWRQYXJ0ID0gXCJEYXRhRmllbGRXaXRoSW50ZW50QmFzZWROYXZpZ2F0aW9uOjpcIjtcblx0XHRzSWRQYXJ0ICs9IGdldFN0YWJsZUlkUGFydEZyb21WYWx1ZShvRGF0YUZpZWxkLlZhbHVlKSArIFwiOjpcIjtcblx0XHRzSWRQYXJ0ICs9IGdldFN0YWJsZUlkUGFydEZyb21TZW1hbnRpY09iamVjdEFuZEFjdGlvbihvRGF0YUZpZWxkKTtcblx0XHRyZXR1cm4gcHJlcGFyZUlkKHNJZFBhcnQpO1xuXHR9IGVsc2UgaWYgKG9EYXRhRmllbGQuJFR5cGUgJiYgb0RhdGFGaWVsZC4kVHlwZSA9PT0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhRmllbGRXaXRoTmF2aWdhdGlvblBhdGhcIikge1xuXHRcdHNJZFBhcnQgPSBcIkRhdGFGaWVsZFdpdGhOYXZpZ2F0aW9uUGF0aDo6XCI7XG5cdFx0c0lkUGFydCArPSBnZXRTdGFibGVJZFBhcnRGcm9tVmFsdWUob0RhdGFGaWVsZC5WYWx1ZSk7XG5cdFx0aWYgKG9EYXRhRmllbGQuVGFyZ2V0ICYmIG9EYXRhRmllbGQuVGFyZ2V0W1wiJE5hdmlnYXRpb25Qcm9wZXJ0eVBhdGhcIl0pIHtcblx0XHRcdHNJZFBhcnQgKz0gXCI6OlwiICsgb0RhdGFGaWVsZC5UYXJnZXRbXCIkTmF2aWdhdGlvblByb3BlcnR5UGF0aFwiXTtcblx0XHR9XG5cdFx0cmV0dXJuIHByZXBhcmVJZChzSWRQYXJ0KTtcblx0fSBlbHNlIGlmIChvRGF0YUZpZWxkLiRUeXBlICYmIG9EYXRhRmllbGQuJFR5cGUgPT09IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRGF0YUZpZWxkV2l0aFVybFwiKSB7XG5cdFx0c0lkUGFydCA9IFwiRGF0YUZpZWxkV2l0aFVybDo6XCI7XG5cdFx0c0lkUGFydCArPSBnZXRTdGFibGVJZFBhcnRGcm9tVmFsdWUob0RhdGFGaWVsZC5WYWx1ZSk7XG5cdFx0cmV0dXJuIHByZXBhcmVJZChzSWRQYXJ0KTtcblx0fSBlbHNlIGlmIChtUGFyYW1ldGVyICYmIG1QYXJhbWV0ZXIuY29udGV4dCAmJiBtUGFyYW1ldGVyLmNvbnRleHQuZ2V0T2JqZWN0KFwiQHNhcHVpLm5hbWVcIikpIHtcblx0XHQvLyB0aGUgY29udGV4dCBpcyBub3QgcmVmZXJyaW5nIHRvIGRhIGRhdGEgZmllbGQgYnV0IGRpcmVjdGx5IHRvIGEgcHJvcGVydHksIHJldHVybiB0aGUgcHJvcGVydHkgbmFtZVxuXHRcdHJldHVybiBwcmVwYXJlSWQobVBhcmFtZXRlci5jb250ZXh0LmdldE9iamVjdChcIkBzYXB1aS5uYW1lXCIpLnRvU3RyaW5nKCkpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIEluIGNhc2Ugb2YgYSBzdHJpbmcgb3IgdW5rbm93biBwcm9wZXJ0eVxuXHRcdC8vIExvZy5lcnJvcihcIlN0YWJsZSBJRCBIZWxwZXI6IFVuYWJsZSB0byBjcmVhdGUgYSBzdGFibGUgSUQuIFBsZWFzZSBjaGVjayB0aGUgYW5ub3RhdGlvbnMuXCIpO1xuXHR9XG5cdHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgcHJlcGFyZUlkID0gZnVuY3Rpb24oc0lkOiBzdHJpbmcpIHtcblx0c0lkID0gcmVwbGFjZVNwZWNpYWxDaGFycyhyZW1vdmVOYW1lc3BhY2VzKHNJZCkpO1xuXHRpZiAoaXNWYWxpZChzSWQpKSB7XG5cdFx0cmV0dXJuIHNJZDtcblx0fSBlbHNlIHtcblx0XHQvLyBMb2cuZXJyb3Ioc0lkICsgXCIgLSBTdGFibGUgSWQgY291bGQgbm90IGJlIGdlbmVyYXRlZCBkdWUgdG8gaW5zdWZmaWNpZW50IGluZm9ybWF0aW9uLlwiKTtcblx0XHR0aHJvdyBzSWQgKyBcIiAtIFN0YWJsZSBJZCBjb3VsZCBub3QgYmUgZ2VuZXJhdGVkIGR1ZSB0byBpbnN1ZmZpY2llbnQgaW5mb3JtYXRpb24uXCI7XG5cdH1cbn07XG4iXX0=