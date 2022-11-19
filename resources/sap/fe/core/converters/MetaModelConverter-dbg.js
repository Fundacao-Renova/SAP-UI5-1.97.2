/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/converters/common/AnnotationConverter", "../helpers/StableIdHelper"], function (AnnotationConverter, StableIdHelper) {
  "use strict";

  var _exports = {};
  var generate = StableIdHelper.generate;

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function () {}; return { s: F, n: function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function (e) { throw e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function () { it = it.call(o); }, n: function () { var step = it.next(); normalCompletion = step.done; return step; }, e: function (e) { didErr = true; err = e; }, f: function () { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  var VOCABULARY_ALIAS = {
    "Org.OData.Capabilities.V1": "Capabilities",
    "Org.OData.Core.V1": "Core",
    "Org.OData.Measures.V1": "Measures",
    "com.sap.vocabularies.Common.v1": "Common",
    "com.sap.vocabularies.UI.v1": "UI",
    "com.sap.vocabularies.Session.v1": "Session",
    "com.sap.vocabularies.Analytics.v1": "Analytics",
    "com.sap.vocabularies.PersonalData.v1": "PersonalData",
    "com.sap.vocabularies.Communication.v1": "Communication"
  };
  var DefaultEnvironmentCapabilities = {
    Chart: true,
    MicroChart: true,
    UShell: true,
    IntentBasedNavigation: true
  };
  _exports.DefaultEnvironmentCapabilities = DefaultEnvironmentCapabilities;

  function parsePropertyValue(annotationObject, propertyKey, currentTarget, annotationsLists, oCapabilities) {
    var value;
    var currentPropertyTarget = currentTarget + "/" + propertyKey;
    var typeOfAnnotation = typeof annotationObject;

    if (annotationObject === null) {
      value = {
        type: "Null",
        Null: null
      };
    } else if (typeOfAnnotation === "string") {
      value = {
        type: "String",
        String: annotationObject
      };
    } else if (typeOfAnnotation === "boolean") {
      value = {
        type: "Bool",
        Bool: annotationObject
      };
    } else if (typeOfAnnotation === "number") {
      value = {
        type: "Int",
        Int: annotationObject
      };
    } else if (Array.isArray(annotationObject)) {
      value = {
        type: "Collection",
        Collection: annotationObject.map(function (subAnnotationObject, subAnnotationObjectIndex) {
          return parseAnnotationObject(subAnnotationObject, currentPropertyTarget + "/" + subAnnotationObjectIndex, annotationsLists, oCapabilities);
        })
      };

      if (annotationObject.length > 0) {
        if (annotationObject[0].hasOwnProperty("$PropertyPath")) {
          value.Collection.type = "PropertyPath";
        } else if (annotationObject[0].hasOwnProperty("$Path")) {
          value.Collection.type = "Path";
        } else if (annotationObject[0].hasOwnProperty("$NavigationPropertyPath")) {
          value.Collection.type = "NavigationPropertyPath";
        } else if (annotationObject[0].hasOwnProperty("$AnnotationPath")) {
          value.Collection.type = "AnnotationPath";
        } else if (annotationObject[0].hasOwnProperty("$Type")) {
          value.Collection.type = "Record";
        } else if (annotationObject[0].hasOwnProperty("$If")) {
          value.Collection.type = "If";
        } else if (annotationObject[0].hasOwnProperty("$Or")) {
          value.Collection.type = "Or";
        } else if (annotationObject[0].hasOwnProperty("$And")) {
          value.Collection.type = "And";
        } else if (annotationObject[0].hasOwnProperty("$Eq")) {
          value.Collection.type = "Eq";
        } else if (annotationObject[0].hasOwnProperty("$Ne")) {
          value.Collection.type = "Ne";
        } else if (annotationObject[0].hasOwnProperty("$Not")) {
          value.Collection.type = "Not";
        } else if (annotationObject[0].hasOwnProperty("$Gt")) {
          value.Collection.type = "Gt";
        } else if (annotationObject[0].hasOwnProperty("$Ge")) {
          value.Collection.type = "Ge";
        } else if (annotationObject[0].hasOwnProperty("$Lt")) {
          value.Collection.type = "Lt";
        } else if (annotationObject[0].hasOwnProperty("$Le")) {
          value.Collection.type = "Le";
        } else if (annotationObject[0].hasOwnProperty("$Apply")) {
          value.Collection.type = "Apply";
        } else if (typeof annotationObject[0] === "object") {
          // $Type is optional...
          value.Collection.type = "Record";
        } else {
          value.Collection.type = "String";
        }
      }
    } else if (annotationObject.$Path !== undefined) {
      value = {
        type: "Path",
        Path: annotationObject.$Path
      };
    } else if (annotationObject.$Decimal !== undefined) {
      value = {
        type: "Decimal",
        Decimal: parseFloat(annotationObject.$Decimal)
      };
    } else if (annotationObject.$PropertyPath !== undefined) {
      value = {
        type: "PropertyPath",
        PropertyPath: annotationObject.$PropertyPath
      };
    } else if (annotationObject.$NavigationPropertyPath !== undefined) {
      value = {
        type: "NavigationPropertyPath",
        NavigationPropertyPath: annotationObject.$NavigationPropertyPath
      };
    } else if (annotationObject.$If !== undefined) {
      value = {
        type: "If",
        If: annotationObject.$If
      };
    } else if (annotationObject.$And !== undefined) {
      value = {
        type: "And",
        And: annotationObject.$And
      };
    } else if (annotationObject.$Or !== undefined) {
      value = {
        type: "Or",
        Or: annotationObject.$Or
      };
    } else if (annotationObject.$Not !== undefined) {
      value = {
        type: "Not",
        Not: annotationObject.$Not
      };
    } else if (annotationObject.$Eq !== undefined) {
      value = {
        type: "Eq",
        Eq: annotationObject.$Eq
      };
    } else if (annotationObject.$Ne !== undefined) {
      value = {
        type: "Ne",
        Ne: annotationObject.$Ne
      };
    } else if (annotationObject.$Gt !== undefined) {
      value = {
        type: "Gt",
        Gt: annotationObject.$Gt
      };
    } else if (annotationObject.$Ge !== undefined) {
      value = {
        type: "Ge",
        Ge: annotationObject.$Ge
      };
    } else if (annotationObject.$Lt !== undefined) {
      value = {
        type: "Lt",
        Lt: annotationObject.$Lt
      };
    } else if (annotationObject.$Le !== undefined) {
      value = {
        type: "Le",
        Le: annotationObject.$Le
      };
    } else if (annotationObject.$Apply !== undefined) {
      value = {
        type: "Apply",
        Apply: annotationObject.$Apply,
        Function: annotationObject.$Function
      };
    } else if (annotationObject.$AnnotationPath !== undefined) {
      value = {
        type: "AnnotationPath",
        AnnotationPath: annotationObject.$AnnotationPath
      };
    } else if (annotationObject.$EnumMember !== undefined) {
      value = {
        type: "EnumMember",
        EnumMember: mapNameToAlias(annotationObject.$EnumMember.split("/")[0]) + "/" + annotationObject.$EnumMember.split("/")[1]
      };
    } else if (annotationObject.$Type) {
      value = {
        type: "Record",
        Record: parseAnnotationObject(annotationObject, currentTarget, annotationsLists, oCapabilities)
      };
    } else {
      value = {
        type: "Record",
        Record: parseAnnotationObject(annotationObject, currentTarget, annotationsLists, oCapabilities)
      };
    }

    return {
      name: propertyKey,
      value: value
    };
  }

  function mapNameToAlias(annotationName) {
    var _annotationName$split = annotationName.split("@"),
        _annotationName$split2 = _slicedToArray(_annotationName$split, 2),
        pathPart = _annotationName$split2[0],
        annoPart = _annotationName$split2[1];

    if (!annoPart) {
      annoPart = pathPart;
      pathPart = "";
    } else {
      pathPart += "@";
    }

    var lastDot = annoPart.lastIndexOf(".");
    return pathPart + VOCABULARY_ALIAS[annoPart.substr(0, lastDot)] + "." + annoPart.substr(lastDot + 1);
  }

  function parseAnnotationObject(annotationObject, currentObjectTarget, annotationsLists, oCapabilities) {
    var parsedAnnotationObject = {};
    var typeOfObject = typeof annotationObject;

    if (annotationObject === null) {
      parsedAnnotationObject = {
        type: "Null",
        Null: null
      };
    } else if (typeOfObject === "string") {
      parsedAnnotationObject = {
        type: "String",
        String: annotationObject
      };
    } else if (typeOfObject === "boolean") {
      parsedAnnotationObject = {
        type: "Bool",
        Bool: annotationObject
      };
    } else if (typeOfObject === "number") {
      parsedAnnotationObject = {
        type: "Int",
        Int: annotationObject
      };
    } else if (annotationObject.$AnnotationPath !== undefined) {
      parsedAnnotationObject = {
        type: "AnnotationPath",
        AnnotationPath: annotationObject.$AnnotationPath
      };
    } else if (annotationObject.$Path !== undefined) {
      parsedAnnotationObject = {
        type: "Path",
        Path: annotationObject.$Path
      };
    } else if (annotationObject.$Decimal !== undefined) {
      parsedAnnotationObject = {
        type: "Decimal",
        Decimal: parseFloat(annotationObject.$Decimal)
      };
    } else if (annotationObject.$PropertyPath !== undefined) {
      parsedAnnotationObject = {
        type: "PropertyPath",
        PropertyPath: annotationObject.$PropertyPath
      };
    } else if (annotationObject.$If !== undefined) {
      parsedAnnotationObject = {
        type: "If",
        If: annotationObject.$If
      };
    } else if (annotationObject.$And !== undefined) {
      parsedAnnotationObject = {
        type: "And",
        And: annotationObject.$And
      };
    } else if (annotationObject.$Or !== undefined) {
      parsedAnnotationObject = {
        type: "Or",
        Or: annotationObject.$Or
      };
    } else if (annotationObject.$Not !== undefined) {
      parsedAnnotationObject = {
        type: "Not",
        Not: annotationObject.$Not
      };
    } else if (annotationObject.$Eq !== undefined) {
      parsedAnnotationObject = {
        type: "Eq",
        Eq: annotationObject.$Eq
      };
    } else if (annotationObject.$Ne !== undefined) {
      parsedAnnotationObject = {
        type: "Ne",
        Ne: annotationObject.$Ne
      };
    } else if (annotationObject.$Gt !== undefined) {
      parsedAnnotationObject = {
        type: "Gt",
        Gt: annotationObject.$Gt
      };
    } else if (annotationObject.$Ge !== undefined) {
      parsedAnnotationObject = {
        type: "Ge",
        Ge: annotationObject.$Ge
      };
    } else if (annotationObject.$Lt !== undefined) {
      parsedAnnotationObject = {
        type: "Lt",
        Lt: annotationObject.$Lt
      };
    } else if (annotationObject.$Le !== undefined) {
      parsedAnnotationObject = {
        type: "Le",
        Le: annotationObject.$Le
      };
    } else if (annotationObject.$Apply !== undefined) {
      parsedAnnotationObject = {
        type: "Apply",
        Apply: annotationObject.$Apply,
        Function: annotationObject.$Function
      };
    } else if (annotationObject.$NavigationPropertyPath !== undefined) {
      parsedAnnotationObject = {
        type: "NavigationPropertyPath",
        NavigationPropertyPath: annotationObject.$NavigationPropertyPath
      };
    } else if (annotationObject.$EnumMember !== undefined) {
      parsedAnnotationObject = {
        type: "EnumMember",
        EnumMember: mapNameToAlias(annotationObject.$EnumMember.split("/")[0]) + "/" + annotationObject.$EnumMember.split("/")[1]
      };
    } else if (Array.isArray(annotationObject)) {
      var parsedAnnotationCollection = parsedAnnotationObject;
      parsedAnnotationCollection.collection = annotationObject.map(function (subAnnotationObject, subAnnotationIndex) {
        return parseAnnotationObject(subAnnotationObject, currentObjectTarget + "/" + subAnnotationIndex, annotationsLists, oCapabilities);
      });

      if (annotationObject.length > 0) {
        if (annotationObject[0].hasOwnProperty("$PropertyPath")) {
          parsedAnnotationCollection.collection.type = "PropertyPath";
        } else if (annotationObject[0].hasOwnProperty("$Path")) {
          parsedAnnotationCollection.collection.type = "Path";
        } else if (annotationObject[0].hasOwnProperty("$NavigationPropertyPath")) {
          parsedAnnotationCollection.collection.type = "NavigationPropertyPath";
        } else if (annotationObject[0].hasOwnProperty("$AnnotationPath")) {
          parsedAnnotationCollection.collection.type = "AnnotationPath";
        } else if (annotationObject[0].hasOwnProperty("$Type")) {
          parsedAnnotationCollection.collection.type = "Record";
        } else if (annotationObject[0].hasOwnProperty("$If")) {
          parsedAnnotationCollection.collection.type = "If";
        } else if (annotationObject[0].hasOwnProperty("$And")) {
          parsedAnnotationCollection.collection.type = "And";
        } else if (annotationObject[0].hasOwnProperty("$Or")) {
          parsedAnnotationCollection.collection.type = "Or";
        } else if (annotationObject[0].hasOwnProperty("$Eq")) {
          parsedAnnotationCollection.collection.type = "Eq";
        } else if (annotationObject[0].hasOwnProperty("$Ne")) {
          parsedAnnotationCollection.collection.type = "Ne";
        } else if (annotationObject[0].hasOwnProperty("$Not")) {
          parsedAnnotationCollection.collection.type = "Not";
        } else if (annotationObject[0].hasOwnProperty("$Gt")) {
          parsedAnnotationCollection.collection.type = "Gt";
        } else if (annotationObject[0].hasOwnProperty("$Ge")) {
          parsedAnnotationCollection.collection.type = "Ge";
        } else if (annotationObject[0].hasOwnProperty("$Lt")) {
          parsedAnnotationCollection.collection.type = "Lt";
        } else if (annotationObject[0].hasOwnProperty("$Le")) {
          parsedAnnotationCollection.collection.type = "Le";
        } else if (annotationObject[0].hasOwnProperty("$Apply")) {
          parsedAnnotationCollection.collection.type = "Apply";
        } else if (typeof annotationObject[0] === "object") {
          parsedAnnotationCollection.collection.type = "Record";
        } else {
          parsedAnnotationCollection.collection.type = "String";
        }
      }
    } else {
      if (annotationObject.$Type) {
        var typeValue = annotationObject.$Type;
        parsedAnnotationObject.type = typeValue; //`${typeAlias}.${typeTerm}`;
      }

      var propertyValues = [];
      Object.keys(annotationObject).forEach(function (propertyKey) {
        if (propertyKey !== "$Type" && propertyKey !== "$If" && propertyKey !== "$Apply" && propertyKey !== "$And" && propertyKey !== "$Or" && propertyKey !== "$Ne" && propertyKey !== "$Gt" && propertyKey !== "$Ge" && propertyKey !== "$Lt" && propertyKey !== "$Le" && propertyKey !== "$Not" && propertyKey !== "$Eq" && !propertyKey.startsWith("@")) {
          propertyValues.push(parsePropertyValue(annotationObject[propertyKey], propertyKey, currentObjectTarget, annotationsLists, oCapabilities));
        } else if (propertyKey.startsWith("@")) {
          // Annotation of annotation
          createAnnotationLists(_defineProperty({}, propertyKey, annotationObject[propertyKey]), currentObjectTarget, annotationsLists, oCapabilities);
        }
      });
      parsedAnnotationObject.propertyValues = propertyValues;
    }

    return parsedAnnotationObject;
  }

  function getOrCreateAnnotationList(target, annotationsLists) {
    if (!annotationsLists.hasOwnProperty(target)) {
      annotationsLists[target] = {
        target: target,
        annotations: []
      };
    }

    return annotationsLists[target];
  }

  function removeChartAnnotations(annotationObject) {
    return annotationObject.filter(function (oRecord) {
      if (oRecord.Target && oRecord.Target.$AnnotationPath) {
        return oRecord.Target.$AnnotationPath.indexOf("@com.sap.vocabularies.UI.v1.Chart") === -1;
      } else {
        return true;
      }
    });
  }

  function removeIBNAnnotations(annotationObject) {
    return annotationObject.filter(function (oRecord) {
      return oRecord.$Type !== "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation";
    });
  }

  function handlePresentationVariant(annotationObject) {
    return annotationObject.filter(function (oRecord) {
      return oRecord.$AnnotationPath !== "@com.sap.vocabularies.UI.v1.Chart";
    });
  }

  function createAnnotationLists(annotationObjects, annotationTarget, annotationLists, oCapabilities) {
    if (Object.keys(annotationObjects).length === 0) {
      return;
    }

    var outAnnotationObject = getOrCreateAnnotationList(annotationTarget, annotationLists);

    if (!oCapabilities.MicroChart) {
      delete annotationObjects["@com.sap.vocabularies.UI.v1.Chart"];
    }

    var _loop = function (_annotationKey) {
      var annotationObject = annotationObjects[_annotationKey];

      switch (_annotationKey) {
        case "@com.sap.vocabularies.UI.v1.HeaderFacets":
          if (!oCapabilities.MicroChart) {
            annotationObject = removeChartAnnotations(annotationObject);
            annotationObjects[_annotationKey] = annotationObject;
          }

          break;

        case "@com.sap.vocabularies.UI.v1.Identification":
          if (!oCapabilities.IntentBasedNavigation) {
            annotationObject = removeIBNAnnotations(annotationObject);
            annotationObjects[_annotationKey] = annotationObject;
          }

          break;

        case "@com.sap.vocabularies.UI.v1.LineItem":
          if (!oCapabilities.IntentBasedNavigation) {
            annotationObject = removeIBNAnnotations(annotationObject);
            annotationObjects[_annotationKey] = annotationObject;
          }

          if (!oCapabilities.MicroChart) {
            annotationObject = removeChartAnnotations(annotationObject);
            annotationObjects[_annotationKey] = annotationObject;
          }

          break;

        case "@com.sap.vocabularies.UI.v1.FieldGroup":
          if (!oCapabilities.IntentBasedNavigation) {
            annotationObject.Data = removeIBNAnnotations(annotationObject.Data);
            annotationObjects[_annotationKey] = annotationObject;
          }

          if (!oCapabilities.MicroChart) {
            annotationObject.Data = removeChartAnnotations(annotationObject.Data);
            annotationObjects[_annotationKey] = annotationObject;
          }

          break;

        case "@com.sap.vocabularies.UI.v1.PresentationVariant":
          if (!oCapabilities.Chart && annotationObject.Visualizations) {
            annotationObject.Visualizations = handlePresentationVariant(annotationObject.Visualizations);
            annotationObjects[_annotationKey] = annotationObject;
          }

          break;

        default:
          break;
      }

      var currentOutAnnotationObject = outAnnotationObject; // Check for annotation of annotation

      var annotationOfAnnotationSplit = _annotationKey.split("@");

      if (annotationOfAnnotationSplit.length > 2) {
        currentOutAnnotationObject = getOrCreateAnnotationList(annotationTarget + "@" + annotationOfAnnotationSplit[1], annotationLists);
        _annotationKey = annotationOfAnnotationSplit[2];
      } else {
        _annotationKey = annotationOfAnnotationSplit[1];
      }

      var annotationQualifierSplit = _annotationKey.split("#");

      var qualifier = annotationQualifierSplit[1];
      _annotationKey = annotationQualifierSplit[0];
      var parsedAnnotationObject = {
        term: "".concat(_annotationKey),
        qualifier: qualifier
      };
      var currentAnnotationTarget = annotationTarget + "@" + parsedAnnotationObject.term;

      if (qualifier) {
        currentAnnotationTarget += "#" + qualifier;
      }

      var isCollection = false;
      var typeofAnnotation = typeof annotationObject;

      if (annotationObject === null) {
        parsedAnnotationObject.value = {
          type: "Bool",
          Bool: annotationObject
        };
      } else if (typeofAnnotation === "string") {
        parsedAnnotationObject.value = {
          type: "String",
          String: annotationObject
        };
      } else if (typeofAnnotation === "boolean") {
        parsedAnnotationObject.value = {
          type: "Bool",
          Bool: annotationObject
        };
      } else if (typeofAnnotation === "number") {
        parsedAnnotationObject.value = {
          type: "Int",
          Int: annotationObject
        };
      } else if (annotationObject.$If !== undefined) {
        parsedAnnotationObject.value = {
          type: "If",
          If: annotationObject.$If
        };
      } else if (annotationObject.$And !== undefined) {
        parsedAnnotationObject.value = {
          type: "And",
          And: annotationObject.$And
        };
      } else if (annotationObject.$Or !== undefined) {
        parsedAnnotationObject.value = {
          type: "Or",
          Or: annotationObject.$Or
        };
      } else if (annotationObject.$Not !== undefined) {
        parsedAnnotationObject.value = {
          type: "Not",
          Not: annotationObject.$Not
        };
      } else if (annotationObject.$Eq !== undefined) {
        parsedAnnotationObject.value = {
          type: "Eq",
          Eq: annotationObject.$Eq
        };
      } else if (annotationObject.$Ne !== undefined) {
        parsedAnnotationObject.value = {
          type: "Ne",
          Ne: annotationObject.$Ne
        };
      } else if (annotationObject.$Gt !== undefined) {
        parsedAnnotationObject.value = {
          type: "Gt",
          Gt: annotationObject.$Gt
        };
      } else if (annotationObject.$Ge !== undefined) {
        parsedAnnotationObject.value = {
          type: "Ge",
          Ge: annotationObject.$Ge
        };
      } else if (annotationObject.$Lt !== undefined) {
        parsedAnnotationObject.value = {
          type: "Lt",
          Lt: annotationObject.$Lt
        };
      } else if (annotationObject.$Le !== undefined) {
        parsedAnnotationObject.value = {
          type: "Le",
          Le: annotationObject.$Le
        };
      } else if (annotationObject.$Apply !== undefined) {
        parsedAnnotationObject.value = {
          type: "Apply",
          Apply: annotationObject.$Apply,
          Function: annotationObject.$Function
        };
      } else if (annotationObject.$Path !== undefined) {
        parsedAnnotationObject.value = {
          type: "Path",
          Path: annotationObject.$Path
        };
      } else if (annotationObject.$AnnotationPath !== undefined) {
        parsedAnnotationObject.value = {
          type: "AnnotationPath",
          AnnotationPath: annotationObject.$AnnotationPath
        };
      } else if (annotationObject.$Decimal !== undefined) {
        parsedAnnotationObject.value = {
          type: "Decimal",
          Decimal: parseFloat(annotationObject.$Decimal)
        };
      } else if (annotationObject.$EnumMember !== undefined) {
        parsedAnnotationObject.value = {
          type: "EnumMember",
          EnumMember: mapNameToAlias(annotationObject.$EnumMember.split("/")[0]) + "/" + annotationObject.$EnumMember.split("/")[1]
        };
      } else if (Array.isArray(annotationObject)) {
        isCollection = true;
        parsedAnnotationObject.collection = annotationObject.map(function (subAnnotationObject, subAnnotationIndex) {
          return parseAnnotationObject(subAnnotationObject, currentAnnotationTarget + "/" + subAnnotationIndex, annotationLists, oCapabilities);
        });

        if (annotationObject.length > 0) {
          if (annotationObject[0].hasOwnProperty("$PropertyPath")) {
            parsedAnnotationObject.collection.type = "PropertyPath";
          } else if (annotationObject[0].hasOwnProperty("$Path")) {
            parsedAnnotationObject.collection.type = "Path";
          } else if (annotationObject[0].hasOwnProperty("$NavigationPropertyPath")) {
            parsedAnnotationObject.collection.type = "NavigationPropertyPath";
          } else if (annotationObject[0].hasOwnProperty("$AnnotationPath")) {
            parsedAnnotationObject.collection.type = "AnnotationPath";
          } else if (annotationObject[0].hasOwnProperty("$Type")) {
            parsedAnnotationObject.collection.type = "Record";
          } else if (annotationObject[0].hasOwnProperty("$If")) {
            parsedAnnotationObject.collection.type = "If";
          } else if (annotationObject[0].hasOwnProperty("$Or")) {
            parsedAnnotationObject.collection.type = "Or";
          } else if (annotationObject[0].hasOwnProperty("$Eq")) {
            parsedAnnotationObject.collection.type = "Eq";
          } else if (annotationObject[0].hasOwnProperty("$Ne")) {
            parsedAnnotationObject.collection.type = "Ne";
          } else if (annotationObject[0].hasOwnProperty("$Not")) {
            parsedAnnotationObject.collection.type = "Not";
          } else if (annotationObject[0].hasOwnProperty("$Gt")) {
            parsedAnnotationObject.collection.type = "Gt";
          } else if (annotationObject[0].hasOwnProperty("$Ge")) {
            parsedAnnotationObject.collection.type = "Ge";
          } else if (annotationObject[0].hasOwnProperty("$Lt")) {
            parsedAnnotationObject.collection.type = "Lt";
          } else if (annotationObject[0].hasOwnProperty("$Le")) {
            parsedAnnotationObject.collection.type = "Le";
          } else if (annotationObject[0].hasOwnProperty("$And")) {
            parsedAnnotationObject.collection.type = "And";
          } else if (annotationObject[0].hasOwnProperty("$Apply")) {
            parsedAnnotationObject.collection.type = "Apply";
          } else if (typeof annotationObject[0] === "object") {
            parsedAnnotationObject.collection.type = "Record";
          } else {
            parsedAnnotationObject.collection.type = "String";
          }
        }
      } else {
        var record = {
          propertyValues: []
        };

        if (annotationObject.$Type) {
          var typeValue = annotationObject.$Type;
          record.type = "".concat(typeValue);
        }

        var propertyValues = [];

        for (var propertyKey in annotationObject) {
          if (propertyKey !== "$Type" && !propertyKey.startsWith("@")) {
            propertyValues.push(parsePropertyValue(annotationObject[propertyKey], propertyKey, currentAnnotationTarget, annotationLists, oCapabilities));
          } else if (propertyKey.startsWith("@")) {
            // Annotation of record
            createAnnotationLists(_defineProperty({}, propertyKey, annotationObject[propertyKey]), currentAnnotationTarget, annotationLists, oCapabilities);
          }
        }

        record.propertyValues = propertyValues;
        parsedAnnotationObject.record = record;
      }

      parsedAnnotationObject.isCollection = isCollection;
      currentOutAnnotationObject.annotations.push(parsedAnnotationObject);
      annotationKey = _annotationKey;
    };

    for (var annotationKey in annotationObjects) {
      _loop(annotationKey);
    }
  }

  function prepareProperty(propertyDefinition, entityTypeObject, propertyName) {
    var propertyObject = {
      _type: "Property",
      name: propertyName,
      fullyQualifiedName: "".concat(entityTypeObject.fullyQualifiedName, "/").concat(propertyName),
      type: propertyDefinition.$Type,
      maxLength: propertyDefinition.$MaxLength,
      precision: propertyDefinition.$Precision,
      scale: propertyDefinition.$Scale,
      nullable: propertyDefinition.$Nullable
    };
    return propertyObject;
  }

  function prepareNavigationProperty(navPropertyDefinition, entityTypeObject, navPropertyName) {
    var referentialConstraint = [];

    if (navPropertyDefinition.$ReferentialConstraint) {
      referentialConstraint = Object.keys(navPropertyDefinition.$ReferentialConstraint).map(function (sourcePropertyName) {
        return {
          sourceTypeName: entityTypeObject.name,
          sourceProperty: sourcePropertyName,
          targetTypeName: navPropertyDefinition.$Type,
          targetProperty: navPropertyDefinition.$ReferentialConstraint[sourcePropertyName]
        };
      });
    }

    var navigationProperty = {
      _type: "NavigationProperty",
      name: navPropertyName,
      fullyQualifiedName: "".concat(entityTypeObject.fullyQualifiedName, "/").concat(navPropertyName),
      partner: navPropertyDefinition.$Partner,
      isCollection: navPropertyDefinition.$isCollection ? navPropertyDefinition.$isCollection : false,
      containsTarget: navPropertyDefinition.$ContainsTarget,
      targetTypeName: navPropertyDefinition.$Type,
      referentialConstraint: referentialConstraint
    };
    return navigationProperty;
  }

  function prepareEntitySet(entitySetDefinition, entitySetName, entityContainerName) {
    var entitySetObject = {
      _type: "EntitySet",
      name: entitySetName,
      navigationPropertyBinding: {},
      entityTypeName: entitySetDefinition.$Type,
      fullyQualifiedName: "".concat(entityContainerName, "/").concat(entitySetName)
    };
    return entitySetObject;
  }

  function prepareSingleton(singletonDefinition, singletonName, entityContainerName) {
    var singletonObject = {
      _type: "Singleton",
      name: singletonName,
      navigationPropertyBinding: {},
      typeName: singletonDefinition.$Type,
      fullyQualifiedName: "".concat(entityContainerName, "/").concat(singletonName),
      nullable: true
    };
    return singletonObject;
  }

  function prepareComplexType(complexTypeDefinition, complexTypeName, namespace) {
    var complexTypeObject = {
      _type: "ComplexType",
      name: complexTypeName.replace(namespace + ".", ""),
      fullyQualifiedName: complexTypeName,
      properties: [],
      navigationProperties: []
    };
    var complexTypeProperties = Object.keys(complexTypeDefinition).filter(function (propertyNameOrNot) {
      if (propertyNameOrNot != "$Key" && propertyNameOrNot != "$kind") {
        return complexTypeDefinition[propertyNameOrNot].$kind === "Property";
      }
    }).sort(function (a, b) {
      return a > b ? 1 : -1;
    }).map(function (propertyName) {
      return prepareProperty(complexTypeDefinition[propertyName], complexTypeObject, propertyName);
    });
    complexTypeObject.properties = complexTypeProperties;
    var complexTypeNavigationProperties = Object.keys(complexTypeDefinition).filter(function (propertyNameOrNot) {
      if (propertyNameOrNot != "$Key" && propertyNameOrNot != "$kind") {
        return complexTypeDefinition[propertyNameOrNot].$kind === "NavigationProperty";
      }
    }).sort(function (a, b) {
      return a > b ? 1 : -1;
    }).map(function (navPropertyName) {
      return prepareNavigationProperty(complexTypeDefinition[navPropertyName], complexTypeObject, navPropertyName);
    });
    complexTypeObject.navigationProperties = complexTypeNavigationProperties;
    return complexTypeObject;
  }

  function prepareEntityKeys(entityTypeDefinition, oMetaModelData) {
    if (!entityTypeDefinition.$Key && entityTypeDefinition.$BaseType) {
      return prepareEntityKeys(oMetaModelData["".concat(entityTypeDefinition.$BaseType)], oMetaModelData);
    }

    return entityTypeDefinition.$Key || []; //handling of entity types without key as well as basetype
  }

  function prepareEntityType(entityTypeDefinition, entityTypeName, namespace, metaModelData) {
    var entityKeys = prepareEntityKeys(entityTypeDefinition, metaModelData);
    var entityTypeObject = {
      _type: "EntityType",
      name: entityTypeName.replace(namespace + ".", ""),
      fullyQualifiedName: entityTypeName,
      keys: [],
      entityProperties: [],
      navigationProperties: []
    };
    var entityProperties = Object.keys(entityTypeDefinition).filter(function (propertyNameOrNot) {
      if (propertyNameOrNot != "$Key" && propertyNameOrNot != "$kind") {
        return entityTypeDefinition[propertyNameOrNot].$kind === "Property";
      }
    }).map(function (propertyName) {
      return prepareProperty(entityTypeDefinition[propertyName], entityTypeObject, propertyName);
    });
    var navigationProperties = Object.keys(entityTypeDefinition).filter(function (propertyNameOrNot) {
      if (propertyNameOrNot != "$Key" && propertyNameOrNot != "$kind") {
        return entityTypeDefinition[propertyNameOrNot].$kind === "NavigationProperty";
      }
    }).map(function (navPropertyName) {
      return prepareNavigationProperty(entityTypeDefinition[navPropertyName], entityTypeObject, navPropertyName);
    });
    entityTypeObject.keys = entityKeys.map(function (entityKey) {
      return entityProperties.find(function (property) {
        return property.name === entityKey;
      });
    }).filter(function (property) {
      return property !== undefined;
    });
    entityTypeObject.entityProperties = entityProperties;
    entityTypeObject.navigationProperties = navigationProperties;
    return entityTypeObject;
  }

  function prepareAction(actionName, actionRawData, namespace, entityContainerName) {
    var actionEntityType = "";
    var actionFQN = "".concat(actionName);
    var actionShortName = actionName.substr(namespace.length + 1);

    if (actionRawData.$IsBound) {
      var bindingParameter = actionRawData.$Parameter[0];
      actionEntityType = bindingParameter.$Type;

      if (bindingParameter.$isCollection === true) {
        actionFQN = "".concat(actionName, "(Collection(").concat(actionEntityType, "))");
      } else {
        actionFQN = "".concat(actionName, "(").concat(actionEntityType, ")");
      }
    } else {
      actionFQN = "".concat(entityContainerName, "/").concat(actionShortName);
    }

    var parameters = actionRawData.$Parameter || [];
    return {
      _type: "Action",
      name: actionShortName,
      fullyQualifiedName: actionFQN,
      isBound: actionRawData.$IsBound,
      isFunction: false,
      sourceType: actionEntityType,
      returnType: actionRawData.$ReturnType ? actionRawData.$ReturnType.$Type : "",
      parameters: parameters.map(function (param) {
        return {
          _type: "ActionParameter",
          isEntitySet: param.$Type === actionRawData.$EntitySetPath,
          fullyQualifiedName: "".concat(actionFQN, "/").concat(param.$Name),
          type: param.$Type // TODO missing properties ?

        };
      })
    };
  }

  function prepareEntityTypes(oMetaModel) {
    var oCapabilities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DefaultEnvironmentCapabilities;
    var oMetaModelData = oMetaModel.getObject("/$");
    var annotationLists = {};
    var entityTypes = [];
    var entitySets = [];
    var singletons = [];
    var complexTypes = [];
    var entityContainerName = oMetaModelData.$EntityContainer;
    var namespace = "";
    var schemaKeys = Object.keys(oMetaModelData).filter(function (metamodelKey) {
      return oMetaModelData[metamodelKey].$kind === "Schema";
    });

    if (schemaKeys && schemaKeys.length > 0) {
      namespace = schemaKeys[0].substr(0, schemaKeys[0].length - 1);
    } else if (entityTypes && entityTypes.length) {
      namespace = entityTypes[0].fullyQualifiedName.replace(entityTypes[0].name, "");
      namespace = namespace.substr(0, namespace.length - 1);
    }

    Object.keys(oMetaModelData).forEach(function (sObjectName) {
      if (sObjectName !== "$kind") {
        switch (oMetaModelData[sObjectName].$kind) {
          case "EntityType":
            var entityType = prepareEntityType(oMetaModelData[sObjectName], sObjectName, namespace, oMetaModelData); // Check if there are filter facets defined for the entityType and if yes, check if all of them have an ID
            // The ID is optional, but it is internally taken for grouping filter fields and if it's not present
            // a fallback ID needs to be generated here.

            if (oMetaModelData.$Annotations[entityType.fullyQualifiedName] && oMetaModelData.$Annotations[entityType.fullyQualifiedName]["@com.sap.vocabularies.UI.v1.FilterFacets"]) {
              oMetaModelData.$Annotations[entityType.fullyQualifiedName]["@com.sap.vocabularies.UI.v1.FilterFacets"].forEach(function (filterFacetAnnotation) {
                filterFacetAnnotation.ID = filterFacetAnnotation.ID || generate([{
                  Facet: filterFacetAnnotation
                }]);
              });
            }

            entityType.entityProperties.forEach(function (entityProperty) {
              if (!oMetaModelData.$Annotations[entityProperty.fullyQualifiedName]) {
                oMetaModelData.$Annotations[entityProperty.fullyQualifiedName] = {};
              }

              if (!oMetaModelData.$Annotations[entityProperty.fullyQualifiedName]["@com.sap.vocabularies.UI.v1.DataFieldDefault"]) {
                oMetaModelData.$Annotations[entityProperty.fullyQualifiedName]["@com.sap.vocabularies.UI.v1.DataFieldDefault"] = {
                  $Type: "com.sap.vocabularies.UI.v1.DataField",
                  Value: {
                    $Path: entityProperty.name
                  }
                };
              }
            });
            entityTypes.push(entityType);
            break;

          case "ComplexType":
            var complexType = prepareComplexType(oMetaModelData[sObjectName], sObjectName, namespace);
            complexTypes.push(complexType);
            break;
        }
      }
    });
    var oEntityContainer = oMetaModelData[entityContainerName];
    Object.keys(oEntityContainer).forEach(function (sObjectName) {
      if (sObjectName !== "$kind") {
        switch (oEntityContainer[sObjectName].$kind) {
          case "EntitySet":
            var entitySet = prepareEntitySet(oEntityContainer[sObjectName], sObjectName, entityContainerName);
            entitySets.push(entitySet);
            break;

          case "Singleton":
            var singleton = prepareSingleton(oEntityContainer[sObjectName], sObjectName, entityContainerName);
            singletons.push(singleton);
            break;
        }
      }
    });
    var entityContainer = {};

    if (entityContainerName) {
      entityContainer = {
        name: entityContainerName.replace(namespace + ".", ""),
        fullyQualifiedName: entityContainerName
      };
    }

    entitySets.forEach(function (entitySet) {
      var navPropertyBindings = oEntityContainer[entitySet.name].$NavigationPropertyBinding;

      if (navPropertyBindings) {
        Object.keys(navPropertyBindings).forEach(function (navPropName) {
          var targetEntitySet = entitySets.find(function (entitySetName) {
            return entitySetName.name === navPropertyBindings[navPropName];
          });

          if (targetEntitySet) {
            entitySet.navigationPropertyBinding[navPropName] = targetEntitySet;
          }
        });
      }
    });
    var actions = Object.keys(oMetaModelData).filter(function (key) {
      return Array.isArray(oMetaModelData[key]) && oMetaModelData[key].length > 0 && oMetaModelData[key][0].$kind === "Action";
    }).reduce(function (outActions, actionName) {
      var actions = oMetaModelData[actionName];
      actions.forEach(function (action) {
        outActions.push(prepareAction(actionName, action, namespace, entityContainerName));
      });
      return outActions;
    }, []);

    for (var target in oMetaModelData.$Annotations) {
      createAnnotationLists(oMetaModelData.$Annotations[target], target, annotationLists, oCapabilities);
    } // Sort by target length


    var outAnnotationLists = Object.keys(annotationLists).sort(function (a, b) {
      return a.length >= b.length ? 1 : -1;
    }).map(function (sAnnotationName) {
      return annotationLists[sAnnotationName];
    });
    var references = [];
    return {
      identification: "metamodelResult",
      version: "4.0",
      schema: {
        entityContainer: entityContainer,
        entitySets: entitySets,
        entityTypes: entityTypes,
        complexTypes: complexTypes,
        singletons: singletons,
        associations: [],
        associationSets: [],
        actions: actions,
        namespace: namespace,
        annotations: {
          "metamodelResult": outAnnotationLists
        }
      },
      references: references
    };
  }

  _exports.prepareEntityTypes = prepareEntityTypes;
  var mMetaModelMap = {};
  /**
   * Convert the ODataMetaModel into another format that allow for easy manipulation of the annotations.
   *
   * @param {ODataMetaModel} oMetaModel The current oDataMetaModel
   * @param oCapabilities The current capabilities
   * @returns {ConverterOutput} An object containing object like annotation
   */

  function convertTypes(oMetaModel, oCapabilities) {
    var sMetaModelId = oMetaModel.id;

    if (!mMetaModelMap.hasOwnProperty(sMetaModelId)) {
      var parsedOutput = prepareEntityTypes(oMetaModel, oCapabilities);
      mMetaModelMap[sMetaModelId] = AnnotationConverter.convertTypes(parsedOutput);
    }

    return mMetaModelMap[sMetaModelId];
  }

  _exports.convertTypes = convertTypes;

  function deleteModelCacheData(oMetaModel) {
    delete mMetaModelMap[oMetaModel.id];
  }

  _exports.deleteModelCacheData = deleteModelCacheData;

  function convertMetaModelContext(oMetaModelContext) {
    var bIncludeVisitedObjects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var oConverterOutput = convertTypes(oMetaModelContext.getModel());
    var sPath = oMetaModelContext.getPath();
    var aPathSplit = sPath.split("/");
    var targetEntitySet = oConverterOutput.entitySets.find(function (entitySet) {
      return entitySet.name === aPathSplit[1];
    });

    if (!targetEntitySet) {
      targetEntitySet = oConverterOutput.singletons.find(function (singleton) {
        return singleton.name === aPathSplit[1];
      });
    }

    var relativePath = aPathSplit.slice(2).join("/");
    var localObjects = [targetEntitySet];

    while (relativePath && relativePath.length > 0 && relativePath.startsWith("$NavigationPropertyBinding")) {
      var _sNavPropToCheck;

      var relativeSplit = relativePath.split("/");
      var idx = 0;
      var currentEntitySet = void 0,
          sNavPropToCheck = void 0;
      relativeSplit = relativeSplit.slice(1); // Removing "$NavigationPropertyBinding"

      while (!currentEntitySet && relativeSplit.length > idx && relativeSplit[idx] !== "$NavigationPropertyBinding") {
        // Finding the correct entitySet for the navigaiton property binding example: "Set/_SalesOrder"
        sNavPropToCheck = relativeSplit.slice(0, idx + 1).join("/");
        currentEntitySet = targetEntitySet && targetEntitySet.navigationPropertyBinding[sNavPropToCheck];
        idx++;
      }

      if (!currentEntitySet) {
        // Fall back to Single nav prop if entitySet is not found.
        sNavPropToCheck = relativeSplit[0];
      }

      var aNavProps = ((_sNavPropToCheck = sNavPropToCheck) === null || _sNavPropToCheck === void 0 ? void 0 : _sNavPropToCheck.split("/")) || [];
      var targetEntityType = targetEntitySet && targetEntitySet.entityType;

      var _iterator = _createForOfIteratorHelper(aNavProps),
          _step;

      try {
        var _loop2 = function () {
          var sNavProp = _step.value;
          // Pushing all nav props to the visited objects. example: "Set", "_SalesOrder" for "Set/_SalesOrder"(in NavigationPropertyBinding)
          var targetNavProp = targetEntityType && targetEntityType.navigationProperties.find(function (navProp) {
            return navProp.name === sNavProp;
          });

          if (targetNavProp) {
            localObjects.push(targetNavProp);
            targetEntityType = targetNavProp.targetType;
          } else {
            return "break";
          }
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _ret = _loop2();

          if (_ret === "break") break;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      targetEntitySet = targetEntitySet && currentEntitySet || targetEntitySet && targetEntitySet.navigationPropertyBinding[relativeSplit[0]];

      if (targetEntitySet) {
        // Pushing the target entitySet to visited objects
        localObjects.push(targetEntitySet);
      } // Re-calculating the relative path


      relativePath = relativeSplit.slice(aNavProps.length || 1).join("/");
    }

    if (relativePath.startsWith("$Type")) {
      // We're anyway going to look on the entityType...
      relativePath = aPathSplit.slice(3).join("/");
    }

    if (targetEntitySet && relativePath.length) {
      var oTarget = targetEntitySet.entityType.resolvePath(relativePath, bIncludeVisitedObjects);

      if (oTarget) {
        if (bIncludeVisitedObjects) {
          oTarget.visitedObjects = localObjects.concat(oTarget.visitedObjects);
        }
      } else if (targetEntitySet.entityType && targetEntitySet.entityType.actions) {
        // if target is an action or an action parameter
        var actions = targetEntitySet.entityType && targetEntitySet.entityType.actions;

        var _relativeSplit = relativePath.split("/");

        if (actions[_relativeSplit[0]]) {
          var action = actions[_relativeSplit[0]];

          if (_relativeSplit[1] && action.parameters) {
            var parameterName = _relativeSplit[1];
            var targetParameter = action.parameters.find(function (parameter) {
              return parameter.fullyQualifiedName.endsWith("/" + parameterName);
            });
            return targetParameter;
          } else if (relativePath.length === 1) {
            return action;
          }
        }
      }

      return oTarget;
    } else {
      if (bIncludeVisitedObjects) {
        return {
          target: targetEntitySet,
          visitedObjects: localObjects
        };
      }

      return targetEntitySet;
    }
  }

  _exports.convertMetaModelContext = convertMetaModelContext;

  function getInvolvedDataModelObjects(oMetaModelContext, oEntitySetMetaModelContext) {
    var metaModelContext = convertMetaModelContext(oMetaModelContext, true);
    var targetEntitySetLocation;

    if (oEntitySetMetaModelContext && oEntitySetMetaModelContext.getPath() !== "/") {
      targetEntitySetLocation = getInvolvedDataModelObjects(oEntitySetMetaModelContext);
    }

    return getInvolvedDataModelObjectFromPath(metaModelContext, targetEntitySetLocation);
  }

  _exports.getInvolvedDataModelObjects = getInvolvedDataModelObjects;

  function getInvolvedDataModelObjectFromPath(metaModelContext, targetEntitySetLocation) {
    var dataModelObjects = metaModelContext.visitedObjects.filter(function (visitedObject) {
      return visitedObject && visitedObject.hasOwnProperty("_type") && visitedObject._type !== "EntityType";
    });

    if (metaModelContext.target && metaModelContext.target.hasOwnProperty("_type") && metaModelContext.target._type !== "EntityType") {
      dataModelObjects.push(metaModelContext.target);
    }

    var navigationProperties = [];
    var rootEntitySet = dataModelObjects[0]; // currentEntitySet can be undefined.

    var currentEntitySet = rootEntitySet;
    var currentEntityType = rootEntitySet.entityType;
    var i = 1;
    var currentObject;
    var navigatedPaths = [];

    while (i < dataModelObjects.length) {
      currentObject = dataModelObjects[i++];

      if (currentObject._type === "NavigationProperty") {
        navigatedPaths.push(currentObject.name);
        navigationProperties.push(currentObject);
        currentEntityType = currentObject.targetType;

        if (currentEntitySet && currentEntitySet.navigationPropertyBinding.hasOwnProperty(navigatedPaths.join("/"))) {
          currentEntitySet = currentEntitySet.navigationPropertyBinding[currentObject.name];
          navigatedPaths = [];
        } else {
          currentEntitySet = undefined;
        }
      }

      if (currentObject._type === "EntitySet") {
        currentEntitySet = currentObject;
        currentEntityType = currentEntitySet.entityType;
      }
    }

    if (targetEntitySetLocation && targetEntitySetLocation.startingEntitySet !== rootEntitySet) {
      // In case the entityset is not starting from the same location it may mean that we are doing too much work earlier for some reason
      // As such we need to redefine the context source for the targetEntitySetLocation
      var startingIndex = dataModelObjects.indexOf(targetEntitySetLocation.startingEntitySet);

      if (startingIndex !== -1) {
        // If it's not found I don't know what we can do (probably nothing)
        var requiredDataModelObjects = dataModelObjects.slice(0, startingIndex);
        targetEntitySetLocation.startingEntitySet = rootEntitySet;
        targetEntitySetLocation.navigationProperties = requiredDataModelObjects.filter(function (object) {
          return object._type === "NavigationProperty";
        }).concat(targetEntitySetLocation.navigationProperties);
      }
    }

    var outDataModelPath = {
      startingEntitySet: rootEntitySet,
      targetEntitySet: currentEntitySet,
      targetEntityType: currentEntityType,
      targetObject: metaModelContext.target,
      navigationProperties: navigationProperties,
      contextLocation: targetEntitySetLocation
    };

    if (!outDataModelPath.contextLocation) {
      outDataModelPath.contextLocation = outDataModelPath;
    }

    return outDataModelPath;
  }

  _exports.getInvolvedDataModelObjectFromPath = getInvolvedDataModelObjectFromPath;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1ldGFNb2RlbENvbnZlcnRlci50cyJdLCJuYW1lcyI6WyJWT0NBQlVMQVJZX0FMSUFTIiwiRGVmYXVsdEVudmlyb25tZW50Q2FwYWJpbGl0aWVzIiwiQ2hhcnQiLCJNaWNyb0NoYXJ0IiwiVVNoZWxsIiwiSW50ZW50QmFzZWROYXZpZ2F0aW9uIiwicGFyc2VQcm9wZXJ0eVZhbHVlIiwiYW5ub3RhdGlvbk9iamVjdCIsInByb3BlcnR5S2V5IiwiY3VycmVudFRhcmdldCIsImFubm90YXRpb25zTGlzdHMiLCJvQ2FwYWJpbGl0aWVzIiwidmFsdWUiLCJjdXJyZW50UHJvcGVydHlUYXJnZXQiLCJ0eXBlT2ZBbm5vdGF0aW9uIiwidHlwZSIsIk51bGwiLCJTdHJpbmciLCJCb29sIiwiSW50IiwiQXJyYXkiLCJpc0FycmF5IiwiQ29sbGVjdGlvbiIsIm1hcCIsInN1YkFubm90YXRpb25PYmplY3QiLCJzdWJBbm5vdGF0aW9uT2JqZWN0SW5kZXgiLCJwYXJzZUFubm90YXRpb25PYmplY3QiLCJsZW5ndGgiLCJoYXNPd25Qcm9wZXJ0eSIsIiRQYXRoIiwidW5kZWZpbmVkIiwiUGF0aCIsIiREZWNpbWFsIiwiRGVjaW1hbCIsInBhcnNlRmxvYXQiLCIkUHJvcGVydHlQYXRoIiwiUHJvcGVydHlQYXRoIiwiJE5hdmlnYXRpb25Qcm9wZXJ0eVBhdGgiLCJOYXZpZ2F0aW9uUHJvcGVydHlQYXRoIiwiJElmIiwiSWYiLCIkQW5kIiwiQW5kIiwiJE9yIiwiT3IiLCIkTm90IiwiTm90IiwiJEVxIiwiRXEiLCIkTmUiLCJOZSIsIiRHdCIsIkd0IiwiJEdlIiwiR2UiLCIkTHQiLCJMdCIsIiRMZSIsIkxlIiwiJEFwcGx5IiwiQXBwbHkiLCJGdW5jdGlvbiIsIiRGdW5jdGlvbiIsIiRBbm5vdGF0aW9uUGF0aCIsIkFubm90YXRpb25QYXRoIiwiJEVudW1NZW1iZXIiLCJFbnVtTWVtYmVyIiwibWFwTmFtZVRvQWxpYXMiLCJzcGxpdCIsIiRUeXBlIiwiUmVjb3JkIiwibmFtZSIsImFubm90YXRpb25OYW1lIiwicGF0aFBhcnQiLCJhbm5vUGFydCIsImxhc3REb3QiLCJsYXN0SW5kZXhPZiIsInN1YnN0ciIsImN1cnJlbnRPYmplY3RUYXJnZXQiLCJwYXJzZWRBbm5vdGF0aW9uT2JqZWN0IiwidHlwZU9mT2JqZWN0IiwicGFyc2VkQW5ub3RhdGlvbkNvbGxlY3Rpb24iLCJjb2xsZWN0aW9uIiwic3ViQW5ub3RhdGlvbkluZGV4IiwidHlwZVZhbHVlIiwicHJvcGVydHlWYWx1ZXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInN0YXJ0c1dpdGgiLCJwdXNoIiwiY3JlYXRlQW5ub3RhdGlvbkxpc3RzIiwiZ2V0T3JDcmVhdGVBbm5vdGF0aW9uTGlzdCIsInRhcmdldCIsImFubm90YXRpb25zIiwicmVtb3ZlQ2hhcnRBbm5vdGF0aW9ucyIsImZpbHRlciIsIm9SZWNvcmQiLCJUYXJnZXQiLCJpbmRleE9mIiwicmVtb3ZlSUJOQW5ub3RhdGlvbnMiLCJoYW5kbGVQcmVzZW50YXRpb25WYXJpYW50IiwiYW5ub3RhdGlvbk9iamVjdHMiLCJhbm5vdGF0aW9uVGFyZ2V0IiwiYW5ub3RhdGlvbkxpc3RzIiwib3V0QW5ub3RhdGlvbk9iamVjdCIsImFubm90YXRpb25LZXkiLCJEYXRhIiwiVmlzdWFsaXphdGlvbnMiLCJjdXJyZW50T3V0QW5ub3RhdGlvbk9iamVjdCIsImFubm90YXRpb25PZkFubm90YXRpb25TcGxpdCIsImFubm90YXRpb25RdWFsaWZpZXJTcGxpdCIsInF1YWxpZmllciIsInRlcm0iLCJjdXJyZW50QW5ub3RhdGlvblRhcmdldCIsImlzQ29sbGVjdGlvbiIsInR5cGVvZkFubm90YXRpb24iLCJyZWNvcmQiLCJwcmVwYXJlUHJvcGVydHkiLCJwcm9wZXJ0eURlZmluaXRpb24iLCJlbnRpdHlUeXBlT2JqZWN0IiwicHJvcGVydHlOYW1lIiwicHJvcGVydHlPYmplY3QiLCJfdHlwZSIsImZ1bGx5UXVhbGlmaWVkTmFtZSIsIm1heExlbmd0aCIsIiRNYXhMZW5ndGgiLCJwcmVjaXNpb24iLCIkUHJlY2lzaW9uIiwic2NhbGUiLCIkU2NhbGUiLCJudWxsYWJsZSIsIiROdWxsYWJsZSIsInByZXBhcmVOYXZpZ2F0aW9uUHJvcGVydHkiLCJuYXZQcm9wZXJ0eURlZmluaXRpb24iLCJuYXZQcm9wZXJ0eU5hbWUiLCJyZWZlcmVudGlhbENvbnN0cmFpbnQiLCIkUmVmZXJlbnRpYWxDb25zdHJhaW50Iiwic291cmNlUHJvcGVydHlOYW1lIiwic291cmNlVHlwZU5hbWUiLCJzb3VyY2VQcm9wZXJ0eSIsInRhcmdldFR5cGVOYW1lIiwidGFyZ2V0UHJvcGVydHkiLCJuYXZpZ2F0aW9uUHJvcGVydHkiLCJwYXJ0bmVyIiwiJFBhcnRuZXIiLCIkaXNDb2xsZWN0aW9uIiwiY29udGFpbnNUYXJnZXQiLCIkQ29udGFpbnNUYXJnZXQiLCJwcmVwYXJlRW50aXR5U2V0IiwiZW50aXR5U2V0RGVmaW5pdGlvbiIsImVudGl0eVNldE5hbWUiLCJlbnRpdHlDb250YWluZXJOYW1lIiwiZW50aXR5U2V0T2JqZWN0IiwibmF2aWdhdGlvblByb3BlcnR5QmluZGluZyIsImVudGl0eVR5cGVOYW1lIiwicHJlcGFyZVNpbmdsZXRvbiIsInNpbmdsZXRvbkRlZmluaXRpb24iLCJzaW5nbGV0b25OYW1lIiwic2luZ2xldG9uT2JqZWN0IiwidHlwZU5hbWUiLCJwcmVwYXJlQ29tcGxleFR5cGUiLCJjb21wbGV4VHlwZURlZmluaXRpb24iLCJjb21wbGV4VHlwZU5hbWUiLCJuYW1lc3BhY2UiLCJjb21wbGV4VHlwZU9iamVjdCIsInJlcGxhY2UiLCJwcm9wZXJ0aWVzIiwibmF2aWdhdGlvblByb3BlcnRpZXMiLCJjb21wbGV4VHlwZVByb3BlcnRpZXMiLCJwcm9wZXJ0eU5hbWVPck5vdCIsIiRraW5kIiwic29ydCIsImEiLCJiIiwiY29tcGxleFR5cGVOYXZpZ2F0aW9uUHJvcGVydGllcyIsInByZXBhcmVFbnRpdHlLZXlzIiwiZW50aXR5VHlwZURlZmluaXRpb24iLCJvTWV0YU1vZGVsRGF0YSIsIiRLZXkiLCIkQmFzZVR5cGUiLCJwcmVwYXJlRW50aXR5VHlwZSIsIm1ldGFNb2RlbERhdGEiLCJlbnRpdHlLZXlzIiwiZW50aXR5UHJvcGVydGllcyIsImVudGl0eUtleSIsImZpbmQiLCJwcm9wZXJ0eSIsInByZXBhcmVBY3Rpb24iLCJhY3Rpb25OYW1lIiwiYWN0aW9uUmF3RGF0YSIsImFjdGlvbkVudGl0eVR5cGUiLCJhY3Rpb25GUU4iLCJhY3Rpb25TaG9ydE5hbWUiLCIkSXNCb3VuZCIsImJpbmRpbmdQYXJhbWV0ZXIiLCIkUGFyYW1ldGVyIiwicGFyYW1ldGVycyIsImlzQm91bmQiLCJpc0Z1bmN0aW9uIiwic291cmNlVHlwZSIsInJldHVyblR5cGUiLCIkUmV0dXJuVHlwZSIsInBhcmFtIiwiaXNFbnRpdHlTZXQiLCIkRW50aXR5U2V0UGF0aCIsIiROYW1lIiwicHJlcGFyZUVudGl0eVR5cGVzIiwib01ldGFNb2RlbCIsImdldE9iamVjdCIsImVudGl0eVR5cGVzIiwiZW50aXR5U2V0cyIsInNpbmdsZXRvbnMiLCJjb21wbGV4VHlwZXMiLCIkRW50aXR5Q29udGFpbmVyIiwic2NoZW1hS2V5cyIsIm1ldGFtb2RlbEtleSIsInNPYmplY3ROYW1lIiwiZW50aXR5VHlwZSIsIiRBbm5vdGF0aW9ucyIsImZpbHRlckZhY2V0QW5ub3RhdGlvbiIsIklEIiwiZ2VuZXJhdGUiLCJGYWNldCIsImVudGl0eVByb3BlcnR5IiwiVmFsdWUiLCJjb21wbGV4VHlwZSIsIm9FbnRpdHlDb250YWluZXIiLCJlbnRpdHlTZXQiLCJzaW5nbGV0b24iLCJlbnRpdHlDb250YWluZXIiLCJuYXZQcm9wZXJ0eUJpbmRpbmdzIiwiJE5hdmlnYXRpb25Qcm9wZXJ0eUJpbmRpbmciLCJuYXZQcm9wTmFtZSIsInRhcmdldEVudGl0eVNldCIsImFjdGlvbnMiLCJrZXkiLCJyZWR1Y2UiLCJvdXRBY3Rpb25zIiwiYWN0aW9uIiwib3V0QW5ub3RhdGlvbkxpc3RzIiwic0Fubm90YXRpb25OYW1lIiwicmVmZXJlbmNlcyIsImlkZW50aWZpY2F0aW9uIiwidmVyc2lvbiIsInNjaGVtYSIsImFzc29jaWF0aW9ucyIsImFzc29jaWF0aW9uU2V0cyIsIm1NZXRhTW9kZWxNYXAiLCJjb252ZXJ0VHlwZXMiLCJzTWV0YU1vZGVsSWQiLCJpZCIsInBhcnNlZE91dHB1dCIsIkFubm90YXRpb25Db252ZXJ0ZXIiLCJkZWxldGVNb2RlbENhY2hlRGF0YSIsImNvbnZlcnRNZXRhTW9kZWxDb250ZXh0Iiwib01ldGFNb2RlbENvbnRleHQiLCJiSW5jbHVkZVZpc2l0ZWRPYmplY3RzIiwib0NvbnZlcnRlck91dHB1dCIsImdldE1vZGVsIiwic1BhdGgiLCJnZXRQYXRoIiwiYVBhdGhTcGxpdCIsInJlbGF0aXZlUGF0aCIsInNsaWNlIiwiam9pbiIsImxvY2FsT2JqZWN0cyIsInJlbGF0aXZlU3BsaXQiLCJpZHgiLCJjdXJyZW50RW50aXR5U2V0Iiwic05hdlByb3BUb0NoZWNrIiwiYU5hdlByb3BzIiwidGFyZ2V0RW50aXR5VHlwZSIsInNOYXZQcm9wIiwidGFyZ2V0TmF2UHJvcCIsIm5hdlByb3AiLCJ0YXJnZXRUeXBlIiwib1RhcmdldCIsInJlc29sdmVQYXRoIiwidmlzaXRlZE9iamVjdHMiLCJjb25jYXQiLCJwYXJhbWV0ZXJOYW1lIiwidGFyZ2V0UGFyYW1ldGVyIiwicGFyYW1ldGVyIiwiZW5kc1dpdGgiLCJnZXRJbnZvbHZlZERhdGFNb2RlbE9iamVjdHMiLCJvRW50aXR5U2V0TWV0YU1vZGVsQ29udGV4dCIsIm1ldGFNb2RlbENvbnRleHQiLCJ0YXJnZXRFbnRpdHlTZXRMb2NhdGlvbiIsImdldEludm9sdmVkRGF0YU1vZGVsT2JqZWN0RnJvbVBhdGgiLCJkYXRhTW9kZWxPYmplY3RzIiwidmlzaXRlZE9iamVjdCIsInJvb3RFbnRpdHlTZXQiLCJjdXJyZW50RW50aXR5VHlwZSIsImkiLCJjdXJyZW50T2JqZWN0IiwibmF2aWdhdGVkUGF0aHMiLCJzdGFydGluZ0VudGl0eVNldCIsInN0YXJ0aW5nSW5kZXgiLCJyZXF1aXJlZERhdGFNb2RlbE9iamVjdHMiLCJvYmplY3QiLCJvdXREYXRhTW9kZWxQYXRoIiwidGFyZ2V0T2JqZWN0IiwiY29udGV4dExvY2F0aW9uIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxNQUFNQSxnQkFBcUIsR0FBRztBQUM3QixpQ0FBNkIsY0FEQTtBQUU3Qix5QkFBcUIsTUFGUTtBQUc3Qiw2QkFBeUIsVUFISTtBQUk3QixzQ0FBa0MsUUFKTDtBQUs3QixrQ0FBOEIsSUFMRDtBQU03Qix1Q0FBbUMsU0FOTjtBQU83Qix5Q0FBcUMsV0FQUjtBQVE3Qiw0Q0FBd0MsY0FSWDtBQVM3Qiw2Q0FBeUM7QUFUWixHQUE5QjtBQW1CTyxNQUFNQyw4QkFBOEIsR0FBRztBQUM3Q0MsSUFBQUEsS0FBSyxFQUFFLElBRHNDO0FBRTdDQyxJQUFBQSxVQUFVLEVBQUUsSUFGaUM7QUFHN0NDLElBQUFBLE1BQU0sRUFBRSxJQUhxQztBQUk3Q0MsSUFBQUEscUJBQXFCLEVBQUU7QUFKc0IsR0FBdkM7OztBQXlCUCxXQUFTQyxrQkFBVCxDQUNDQyxnQkFERCxFQUVDQyxXQUZELEVBR0NDLGFBSEQsRUFJQ0MsZ0JBSkQsRUFLQ0MsYUFMRCxFQU1PO0FBQ04sUUFBSUMsS0FBSjtBQUNBLFFBQU1DLHFCQUE2QixHQUFHSixhQUFhLEdBQUcsR0FBaEIsR0FBc0JELFdBQTVEO0FBQ0EsUUFBTU0sZ0JBQWdCLEdBQUcsT0FBT1AsZ0JBQWhDOztBQUNBLFFBQUlBLGdCQUFnQixLQUFLLElBQXpCLEVBQStCO0FBQzlCSyxNQUFBQSxLQUFLLEdBQUc7QUFBRUcsUUFBQUEsSUFBSSxFQUFFLE1BQVI7QUFBZ0JDLFFBQUFBLElBQUksRUFBRTtBQUF0QixPQUFSO0FBQ0EsS0FGRCxNQUVPLElBQUlGLGdCQUFnQixLQUFLLFFBQXpCLEVBQW1DO0FBQ3pDRixNQUFBQSxLQUFLLEdBQUc7QUFBRUcsUUFBQUEsSUFBSSxFQUFFLFFBQVI7QUFBa0JFLFFBQUFBLE1BQU0sRUFBRVY7QUFBMUIsT0FBUjtBQUNB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OztBQUNELFdBQU9BLGdCQUFQO0FBQ0EiLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFubm90YXRpb24sIEFubm90YXRpb25MaXN0LCBBbm5vdGF0aW9uUmVjb3JkLCBFeHByZXNzaW9uLCBQYXJzZXJPdXRwdXQgfSBmcm9tIFwiQHNhcC11eC92b2NhYnVsYXJpZXMtdHlwZXNcIjtcbi8vIFRoaXMgZmlsZSBpcyByZXRyaWV2ZWQgZnJvbSBAc2FwLXV4L2Fubm90YXRpb24tY29udmVydGVyLCBzaGFyZWQgY29kZSB3aXRoIHRvb2wgc3VpdGVcbmltcG9ydCB7IEFubm90YXRpb25Db252ZXJ0ZXIgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9jb21tb25cIjtcbmltcG9ydCB7IE9EYXRhTWV0YU1vZGVsIH0gZnJvbSBcInNhcC91aS9tb2RlbC9vZGF0YS92NFwiO1xuaW1wb3J0IHtcblx0Q29udmVydGVyT3V0cHV0LFxuXHRFbnRpdHlTZXQgYXMgX0VudGl0eVNldCxcblx0RW50aXR5VHlwZSBhcyBfRW50aXR5VHlwZSxcblx0U2luZ2xldG9uIGFzIF9TaW5nbGV0b24sXG5cdE5hdmlnYXRpb25Qcm9wZXJ0eSBhcyBfTmF2aWdhdGlvblByb3BlcnR5XG59IGZyb20gXCJAc2FwLXV4L2Fubm90YXRpb24tY29udmVydGVyXCI7XG5pbXBvcnQge1xuXHRFbnRpdHlUeXBlLFxuXHRFbnRpdHlTZXQsXG5cdFByb3BlcnR5LFxuXHRDb21wbGV4VHlwZSxcblx0UmVmZXJlbnRpYWxDb25zdHJhaW50LFxuXHRWNE5hdmlnYXRpb25Qcm9wZXJ0eSxcblx0QWN0aW9uLFxuXHRSZWZlcmVuY2UsXG5cdEVudGl0eUNvbnRhaW5lcixcblx0U2luZ2xldG9uXG59IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlcy9kaXN0L1BhcnNlclwiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJzYXAvdWkvbW9kZWxcIjtcbmltcG9ydCB7IERhdGFNb2RlbE9iamVjdFBhdGggfSBmcm9tIFwic2FwL2ZlL2NvcmUvdGVtcGxhdGluZy9EYXRhTW9kZWxQYXRoSGVscGVyXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZSB9IGZyb20gXCIuLi9oZWxwZXJzL1N0YWJsZUlkSGVscGVyXCI7XG5cbmNvbnN0IFZPQ0FCVUxBUllfQUxJQVM6IGFueSA9IHtcblx0XCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxXCI6IFwiQ2FwYWJpbGl0aWVzXCIsXG5cdFwiT3JnLk9EYXRhLkNvcmUuVjFcIjogXCJDb3JlXCIsXG5cdFwiT3JnLk9EYXRhLk1lYXN1cmVzLlYxXCI6IFwiTWVhc3VyZXNcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjFcIjogXCJDb21tb25cIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MVwiOiBcIlVJXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuU2Vzc2lvbi52MVwiOiBcIlNlc3Npb25cIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5BbmFseXRpY3MudjFcIjogXCJBbmFseXRpY3NcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5QZXJzb25hbERhdGEudjFcIjogXCJQZXJzb25hbERhdGFcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tdW5pY2F0aW9uLnYxXCI6IFwiQ29tbXVuaWNhdGlvblwiXG59O1xuXG5leHBvcnQgdHlwZSBFbnZpcm9ubWVudENhcGFiaWxpdGllcyA9IHtcblx0Q2hhcnQ6IGJvb2xlYW47XG5cdE1pY3JvQ2hhcnQ6IGJvb2xlYW47XG5cdFVTaGVsbDogYm9vbGVhbjtcblx0SW50ZW50QmFzZWROYXZpZ2F0aW9uOiBib29sZWFuO1xufTtcblxuZXhwb3J0IGNvbnN0IERlZmF1bHRFbnZpcm9ubWVudENhcGFiaWxpdGllcyA9IHtcblx0Q2hhcnQ6IHRydWUsXG5cdE1pY3JvQ2hhcnQ6IHRydWUsXG5cdFVTaGVsbDogdHJ1ZSxcblx0SW50ZW50QmFzZWROYXZpZ2F0aW9uOiB0cnVlXG59O1xuXG50eXBlIE1ldGFNb2RlbEFjdGlvbiA9IHtcblx0JGtpbmQ6IFwiQWN0aW9uXCI7XG5cdCRJc0JvdW5kOiBib29sZWFuO1xuXHQkRW50aXR5U2V0UGF0aDogc3RyaW5nO1xuXHQkUGFyYW1ldGVyOiB7XG5cdFx0JFR5cGU6IHN0cmluZztcblx0XHQkTmFtZTogc3RyaW5nO1xuXHRcdCROdWxsYWJsZT86IGJvb2xlYW47XG5cdFx0JE1heExlbmd0aD86IG51bWJlcjtcblx0XHQkUHJlY2lzaW9uPzogbnVtYmVyO1xuXHRcdCRTY2FsZT86IG51bWJlcjtcblx0XHQkaXNDb2xsZWN0aW9uPzogYm9vbGVhbjtcblx0fVtdO1xuXHQkUmV0dXJuVHlwZToge1xuXHRcdCRUeXBlOiBzdHJpbmc7XG5cdH07XG59O1xuXG5mdW5jdGlvbiBwYXJzZVByb3BlcnR5VmFsdWUoXG5cdGFubm90YXRpb25PYmplY3Q6IGFueSxcblx0cHJvcGVydHlLZXk6IHN0cmluZyxcblx0Y3VycmVudFRhcmdldDogc3RyaW5nLFxuXHRhbm5vdGF0aW9uc0xpc3RzOiBSZWNvcmQ8c3RyaW5nLCBBbm5vdGF0aW9uTGlzdD4sXG5cdG9DYXBhYmlsaXRpZXM6IEVudmlyb25tZW50Q2FwYWJpbGl0aWVzXG4pOiBhbnkge1xuXHRsZXQgdmFsdWU7XG5cdGNvbnN0IGN1cnJlbnRQcm9wZXJ0eVRhcmdldDogc3RyaW5nID0gY3VycmVudFRhcmdldCArIFwiL1wiICsgcHJvcGVydHlLZXk7XG5cdGNvbnN0IHR5cGVPZkFubm90YXRpb24gPSB0eXBlb2YgYW5ub3RhdGlvbk9iamVjdDtcblx0aWYgKGFubm90YXRpb25PYmplY3QgPT09IG51bGwpIHtcblx0XHR2YWx1ZSA9IHsgdHlwZTogXCJOdWxsXCIsIE51bGw6IG51bGwgfTtcblx0fSBlbHNlIGlmICh0eXBlT2ZBbm5vdGF0aW9uID09PSBcInN0cmluZ1wiKSB7XG5cdFx0dmFsdWUgPSB7IHR5cGU6IFwiU3RyaW5nXCIsIFN0cmluZzogYW5ub3RhdGlvbk9iamVjdCB9O1xuXHR9IGVsc2UgaWYgKHR5cGVPZkFubm90YXRpb24gPT09IFwiYm9vbGVhblwiKSB7XG5cdFx0dmFsdWUgPSB7IHR5cGU6IFwiQm9vbFwiLCBCb29sOiBhbm5vdGF0aW9uT2JqZWN0IH07XG5cdH0gZWxzZSBpZiAodHlwZU9mQW5ub3RhdGlvbiA9PT0gXCJudW1iZXJcIikge1xuXHRcdHZhbHVlID0geyB0eXBlOiBcIkludFwiLCBJbnQ6IGFubm90YXRpb25PYmplY3QgfTtcblx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFubm90YXRpb25PYmplY3QpKSB7XG5cdFx0dmFsdWUgPSB7XG5cdFx0XHR0eXBlOiBcIkNvbGxlY3Rpb25cIixcblx0XHRcdENvbGxlY3Rpb246IGFubm90YXRpb25PYmplY3QubWFwKChzdWJBbm5vdGF0aW9uT2JqZWN0LCBzdWJBbm5vdGF0aW9uT2JqZWN0SW5kZXgpID0+XG5cdFx0XHRcdHBhcnNlQW5ub3RhdGlvbk9iamVjdChcblx0XHRcdFx0XHRzdWJBbm5vdGF0aW9uT2JqZWN0LFxuXHRcdFx0XHRcdGN1cnJlbnRQcm9wZXJ0eVRhcmdldCArIFwiL1wiICsgc3ViQW5ub3RhdGlvbk9iamVjdEluZGV4LFxuXHRcdFx0XHRcdGFubm90YXRpb25zTGlzdHMsXG5cdFx0XHRcdFx0b0NhcGFiaWxpdGllc1xuXHRcdFx0XHQpXG5cdFx0XHQpXG5cdFx0fTtcblx0XHRpZiAoYW5ub3RhdGlvbk9iamVjdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRQcm9wZXJ0eVBhdGhcIikpIHtcblx0XHRcdFx0KHZhbHVlLkNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJQcm9wZXJ0eVBhdGhcIjtcblx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRQYXRoXCIpKSB7XG5cdFx0XHRcdCh2YWx1ZS5Db2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiUGF0aFwiO1xuXHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJE5hdmlnYXRpb25Qcm9wZXJ0eVBhdGhcIikpIHtcblx0XHRcdFx0KHZhbHVlLkNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJOYXZpZ2F0aW9uUHJvcGVydHlQYXRoXCI7XG5cdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkQW5ub3RhdGlvblBhdGhcIikpIHtcblx0XHRcdFx0KHZhbHVlLkNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJBbm5vdGF0aW9uUGF0aFwiO1xuXHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJFR5cGVcIikpIHtcblx0XHRcdFx0KHZhbHVlLkNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJSZWNvcmRcIjtcblx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRJZlwiKSkge1xuXHRcdFx0XHQodmFsdWUuQ29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIklmXCI7XG5cdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkT3JcIikpIHtcblx0XHRcdFx0KHZhbHVlLkNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJPclwiO1xuXHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJEFuZFwiKSkge1xuXHRcdFx0XHQodmFsdWUuQ29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIkFuZFwiO1xuXHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJEVxXCIpKSB7XG5cdFx0XHRcdCh2YWx1ZS5Db2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiRXFcIjtcblx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiROZVwiKSkge1xuXHRcdFx0XHQodmFsdWUuQ29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIk5lXCI7XG5cdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkTm90XCIpKSB7XG5cdFx0XHRcdCh2YWx1ZS5Db2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiTm90XCI7XG5cdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkR3RcIikpIHtcblx0XHRcdFx0KHZhbHVlLkNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJHdFwiO1xuXHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJEdlXCIpKSB7XG5cdFx0XHRcdCh2YWx1ZS5Db2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiR2VcIjtcblx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRMdFwiKSkge1xuXHRcdFx0XHQodmFsdWUuQ29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIkx0XCI7XG5cdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkTGVcIikpIHtcblx0XHRcdFx0KHZhbHVlLkNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJMZVwiO1xuXHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJEFwcGx5XCIpKSB7XG5cdFx0XHRcdCh2YWx1ZS5Db2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiQXBwbHlcIjtcblx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGFubm90YXRpb25PYmplY3RbMF0gPT09IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0Ly8gJFR5cGUgaXMgb3B0aW9uYWwuLi5cblx0XHRcdFx0KHZhbHVlLkNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJSZWNvcmRcIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCh2YWx1ZS5Db2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiU3RyaW5nXCI7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJFBhdGggIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhbHVlID0geyB0eXBlOiBcIlBhdGhcIiwgUGF0aDogYW5ub3RhdGlvbk9iamVjdC4kUGF0aCB9O1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJERlY2ltYWwgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhbHVlID0geyB0eXBlOiBcIkRlY2ltYWxcIiwgRGVjaW1hbDogcGFyc2VGbG9hdChhbm5vdGF0aW9uT2JqZWN0LiREZWNpbWFsKSB9O1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJFByb3BlcnR5UGF0aCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFsdWUgPSB7IHR5cGU6IFwiUHJvcGVydHlQYXRoXCIsIFByb3BlcnR5UGF0aDogYW5ub3RhdGlvbk9iamVjdC4kUHJvcGVydHlQYXRoIH07XG5cdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kTmF2aWdhdGlvblByb3BlcnR5UGF0aCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFsdWUgPSB7XG5cdFx0XHR0eXBlOiBcIk5hdmlnYXRpb25Qcm9wZXJ0eVBhdGhcIixcblx0XHRcdE5hdmlnYXRpb25Qcm9wZXJ0eVBhdGg6IGFubm90YXRpb25PYmplY3QuJE5hdmlnYXRpb25Qcm9wZXJ0eVBhdGhcblx0XHR9O1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJElmICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YWx1ZSA9IHsgdHlwZTogXCJJZlwiLCBJZjogYW5ub3RhdGlvbk9iamVjdC4kSWYgfTtcblx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRBbmQgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhbHVlID0geyB0eXBlOiBcIkFuZFwiLCBBbmQ6IGFubm90YXRpb25PYmplY3QuJEFuZCB9O1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJE9yICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YWx1ZSA9IHsgdHlwZTogXCJPclwiLCBPcjogYW5ub3RhdGlvbk9iamVjdC4kT3IgfTtcblx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiROb3QgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhbHVlID0geyB0eXBlOiBcIk5vdFwiLCBOb3Q6IGFubm90YXRpb25PYmplY3QuJE5vdCB9O1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJEVxICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YWx1ZSA9IHsgdHlwZTogXCJFcVwiLCBFcTogYW5ub3RhdGlvbk9iamVjdC4kRXEgfTtcblx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiROZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFsdWUgPSB7IHR5cGU6IFwiTmVcIiwgTmU6IGFubm90YXRpb25PYmplY3QuJE5lIH07XG5cdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kR3QgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhbHVlID0geyB0eXBlOiBcIkd0XCIsIEd0OiBhbm5vdGF0aW9uT2JqZWN0LiRHdCB9O1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJEdlICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YWx1ZSA9IHsgdHlwZTogXCJHZVwiLCBHZTogYW5ub3RhdGlvbk9iamVjdC4kR2UgfTtcblx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRMdCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFsdWUgPSB7IHR5cGU6IFwiTHRcIiwgTHQ6IGFubm90YXRpb25PYmplY3QuJEx0IH07XG5cdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kTGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhbHVlID0geyB0eXBlOiBcIkxlXCIsIExlOiBhbm5vdGF0aW9uT2JqZWN0LiRMZSB9O1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJEFwcGx5ICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YWx1ZSA9IHsgdHlwZTogXCJBcHBseVwiLCBBcHBseTogYW5ub3RhdGlvbk9iamVjdC4kQXBwbHksIEZ1bmN0aW9uOiBhbm5vdGF0aW9uT2JqZWN0LiRGdW5jdGlvbiB9O1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJEFubm90YXRpb25QYXRoICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YWx1ZSA9IHsgdHlwZTogXCJBbm5vdGF0aW9uUGF0aFwiLCBBbm5vdGF0aW9uUGF0aDogYW5ub3RhdGlvbk9iamVjdC4kQW5ub3RhdGlvblBhdGggfTtcblx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRFbnVtTWVtYmVyICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YWx1ZSA9IHtcblx0XHRcdHR5cGU6IFwiRW51bU1lbWJlclwiLFxuXHRcdFx0RW51bU1lbWJlcjogbWFwTmFtZVRvQWxpYXMoYW5ub3RhdGlvbk9iamVjdC4kRW51bU1lbWJlci5zcGxpdChcIi9cIilbMF0pICsgXCIvXCIgKyBhbm5vdGF0aW9uT2JqZWN0LiRFbnVtTWVtYmVyLnNwbGl0KFwiL1wiKVsxXVxuXHRcdH07XG5cdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kVHlwZSkge1xuXHRcdHZhbHVlID0ge1xuXHRcdFx0dHlwZTogXCJSZWNvcmRcIixcblx0XHRcdFJlY29yZDogcGFyc2VBbm5vdGF0aW9uT2JqZWN0KGFubm90YXRpb25PYmplY3QsIGN1cnJlbnRUYXJnZXQsIGFubm90YXRpb25zTGlzdHMsIG9DYXBhYmlsaXRpZXMpXG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHR2YWx1ZSA9IHtcblx0XHRcdHR5cGU6IFwiUmVjb3JkXCIsXG5cdFx0XHRSZWNvcmQ6IHBhcnNlQW5ub3RhdGlvbk9iamVjdChhbm5vdGF0aW9uT2JqZWN0LCBjdXJyZW50VGFyZ2V0LCBhbm5vdGF0aW9uc0xpc3RzLCBvQ2FwYWJpbGl0aWVzKVxuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdG5hbWU6IHByb3BlcnR5S2V5LFxuXHRcdHZhbHVlXG5cdH07XG59XG5mdW5jdGlvbiBtYXBOYW1lVG9BbGlhcyhhbm5vdGF0aW9uTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcblx0bGV0IFtwYXRoUGFydCwgYW5ub1BhcnRdID0gYW5ub3RhdGlvbk5hbWUuc3BsaXQoXCJAXCIpO1xuXHRpZiAoIWFubm9QYXJ0KSB7XG5cdFx0YW5ub1BhcnQgPSBwYXRoUGFydDtcblx0XHRwYXRoUGFydCA9IFwiXCI7XG5cdH0gZWxzZSB7XG5cdFx0cGF0aFBhcnQgKz0gXCJAXCI7XG5cdH1cblx0Y29uc3QgbGFzdERvdCA9IGFubm9QYXJ0Lmxhc3RJbmRleE9mKFwiLlwiKTtcblx0cmV0dXJuIHBhdGhQYXJ0ICsgVk9DQUJVTEFSWV9BTElBU1thbm5vUGFydC5zdWJzdHIoMCwgbGFzdERvdCldICsgXCIuXCIgKyBhbm5vUGFydC5zdWJzdHIobGFzdERvdCArIDEpO1xufVxuZnVuY3Rpb24gcGFyc2VBbm5vdGF0aW9uT2JqZWN0KFxuXHRhbm5vdGF0aW9uT2JqZWN0OiBhbnksXG5cdGN1cnJlbnRPYmplY3RUYXJnZXQ6IHN0cmluZyxcblx0YW5ub3RhdGlvbnNMaXN0czogUmVjb3JkPHN0cmluZywgQW5ub3RhdGlvbkxpc3Q+LFxuXHRvQ2FwYWJpbGl0aWVzOiBFbnZpcm9ubWVudENhcGFiaWxpdGllc1xuKTogRXhwcmVzc2lvbiB8IEFubm90YXRpb25SZWNvcmQgfCBBbm5vdGF0aW9uIHtcblx0bGV0IHBhcnNlZEFubm90YXRpb25PYmplY3Q6IGFueSA9IHt9O1xuXHRjb25zdCB0eXBlT2ZPYmplY3QgPSB0eXBlb2YgYW5ub3RhdGlvbk9iamVjdDtcblx0aWYgKGFubm90YXRpb25PYmplY3QgPT09IG51bGwpIHtcblx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0ID0geyB0eXBlOiBcIk51bGxcIiwgTnVsbDogbnVsbCB9O1xuXHR9IGVsc2UgaWYgKHR5cGVPZk9iamVjdCA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QgPSB7IHR5cGU6IFwiU3RyaW5nXCIsIFN0cmluZzogYW5ub3RhdGlvbk9iamVjdCB9O1xuXHR9IGVsc2UgaWYgKHR5cGVPZk9iamVjdCA9PT0gXCJib29sZWFuXCIpIHtcblx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0ID0geyB0eXBlOiBcIkJvb2xcIiwgQm9vbDogYW5ub3RhdGlvbk9iamVjdCB9O1xuXHR9IGVsc2UgaWYgKHR5cGVPZk9iamVjdCA9PT0gXCJudW1iZXJcIikge1xuXHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QgPSB7IHR5cGU6IFwiSW50XCIsIEludDogYW5ub3RhdGlvbk9iamVjdCB9O1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJEFubm90YXRpb25QYXRoICE9PSB1bmRlZmluZWQpIHtcblx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0ID0geyB0eXBlOiBcIkFubm90YXRpb25QYXRoXCIsIEFubm90YXRpb25QYXRoOiBhbm5vdGF0aW9uT2JqZWN0LiRBbm5vdGF0aW9uUGF0aCB9O1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJFBhdGggIT09IHVuZGVmaW5lZCkge1xuXHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QgPSB7IHR5cGU6IFwiUGF0aFwiLCBQYXRoOiBhbm5vdGF0aW9uT2JqZWN0LiRQYXRoIH07XG5cdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kRGVjaW1hbCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdCA9IHsgdHlwZTogXCJEZWNpbWFsXCIsIERlY2ltYWw6IHBhcnNlRmxvYXQoYW5ub3RhdGlvbk9iamVjdC4kRGVjaW1hbCkgfTtcblx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRQcm9wZXJ0eVBhdGggIT09IHVuZGVmaW5lZCkge1xuXHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QgPSB7IHR5cGU6IFwiUHJvcGVydHlQYXRoXCIsIFByb3BlcnR5UGF0aDogYW5ub3RhdGlvbk9iamVjdC4kUHJvcGVydHlQYXRoIH07XG5cdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kSWYgIT09IHVuZGVmaW5lZCkge1xuXHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QgPSB7IHR5cGU6IFwiSWZcIiwgSWY6IGFubm90YXRpb25PYmplY3QuJElmIH07XG5cdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kQW5kICE9PSB1bmRlZmluZWQpIHtcblx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0ID0geyB0eXBlOiBcIkFuZFwiLCBBbmQ6IGFubm90YXRpb25PYmplY3QuJEFuZCB9O1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJE9yICE9PSB1bmRlZmluZWQpIHtcblx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0ID0geyB0eXBlOiBcIk9yXCIsIE9yOiBhbm5vdGF0aW9uT2JqZWN0LiRPciB9O1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJE5vdCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdCA9IHsgdHlwZTogXCJOb3RcIiwgTm90OiBhbm5vdGF0aW9uT2JqZWN0LiROb3QgfTtcblx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRFcSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdCA9IHsgdHlwZTogXCJFcVwiLCBFcTogYW5ub3RhdGlvbk9iamVjdC4kRXEgfTtcblx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiROZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdCA9IHsgdHlwZTogXCJOZVwiLCBOZTogYW5ub3RhdGlvbk9iamVjdC4kTmUgfTtcblx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRHdCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdCA9IHsgdHlwZTogXCJHdFwiLCBHdDogYW5ub3RhdGlvbk9iamVjdC4kR3QgfTtcblx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRHZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdCA9IHsgdHlwZTogXCJHZVwiLCBHZTogYW5ub3RhdGlvbk9iamVjdC4kR2UgfTtcblx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRMdCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdCA9IHsgdHlwZTogXCJMdFwiLCBMdDogYW5ub3RhdGlvbk9iamVjdC4kTHQgfTtcblx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRMZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdCA9IHsgdHlwZTogXCJMZVwiLCBMZTogYW5ub3RhdGlvbk9iamVjdC4kTGUgfTtcblx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRBcHBseSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdCA9IHsgdHlwZTogXCJBcHBseVwiLCBBcHBseTogYW5ub3RhdGlvbk9iamVjdC4kQXBwbHksIEZ1bmN0aW9uOiBhbm5vdGF0aW9uT2JqZWN0LiRGdW5jdGlvbiB9O1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJE5hdmlnYXRpb25Qcm9wZXJ0eVBhdGggIT09IHVuZGVmaW5lZCkge1xuXHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QgPSB7XG5cdFx0XHR0eXBlOiBcIk5hdmlnYXRpb25Qcm9wZXJ0eVBhdGhcIixcblx0XHRcdE5hdmlnYXRpb25Qcm9wZXJ0eVBhdGg6IGFubm90YXRpb25PYmplY3QuJE5hdmlnYXRpb25Qcm9wZXJ0eVBhdGhcblx0XHR9O1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJEVudW1NZW1iZXIgIT09IHVuZGVmaW5lZCkge1xuXHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QgPSB7XG5cdFx0XHR0eXBlOiBcIkVudW1NZW1iZXJcIixcblx0XHRcdEVudW1NZW1iZXI6IG1hcE5hbWVUb0FsaWFzKGFubm90YXRpb25PYmplY3QuJEVudW1NZW1iZXIuc3BsaXQoXCIvXCIpWzBdKSArIFwiL1wiICsgYW5ub3RhdGlvbk9iamVjdC4kRW51bU1lbWJlci5zcGxpdChcIi9cIilbMV1cblx0XHR9O1xuXHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYW5ub3RhdGlvbk9iamVjdCkpIHtcblx0XHRjb25zdCBwYXJzZWRBbm5vdGF0aW9uQ29sbGVjdGlvbiA9IHBhcnNlZEFubm90YXRpb25PYmplY3QgYXMgYW55O1xuXHRcdHBhcnNlZEFubm90YXRpb25Db2xsZWN0aW9uLmNvbGxlY3Rpb24gPSBhbm5vdGF0aW9uT2JqZWN0Lm1hcCgoc3ViQW5ub3RhdGlvbk9iamVjdCwgc3ViQW5ub3RhdGlvbkluZGV4KSA9PlxuXHRcdFx0cGFyc2VBbm5vdGF0aW9uT2JqZWN0KHN1YkFubm90YXRpb25PYmplY3QsIGN1cnJlbnRPYmplY3RUYXJnZXQgKyBcIi9cIiArIHN1YkFubm90YXRpb25JbmRleCwgYW5ub3RhdGlvbnNMaXN0cywgb0NhcGFiaWxpdGllcylcblx0XHQpO1xuXHRcdGlmIChhbm5vdGF0aW9uT2JqZWN0Lmxlbmd0aCA+IDApIHtcblx0XHRcdGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJFByb3BlcnR5UGF0aFwiKSkge1xuXHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbkNvbGxlY3Rpb24uY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIlByb3BlcnR5UGF0aFwiO1xuXHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJFBhdGhcIikpIHtcblx0XHRcdFx0KHBhcnNlZEFubm90YXRpb25Db2xsZWN0aW9uLmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJQYXRoXCI7XG5cdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkTmF2aWdhdGlvblByb3BlcnR5UGF0aFwiKSkge1xuXHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbkNvbGxlY3Rpb24uY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIk5hdmlnYXRpb25Qcm9wZXJ0eVBhdGhcIjtcblx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRBbm5vdGF0aW9uUGF0aFwiKSkge1xuXHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbkNvbGxlY3Rpb24uY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIkFubm90YXRpb25QYXRoXCI7XG5cdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkVHlwZVwiKSkge1xuXHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbkNvbGxlY3Rpb24uY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIlJlY29yZFwiO1xuXHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJElmXCIpKSB7XG5cdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uQ29sbGVjdGlvbi5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiSWZcIjtcblx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRBbmRcIikpIHtcblx0XHRcdFx0KHBhcnNlZEFubm90YXRpb25Db2xsZWN0aW9uLmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJBbmRcIjtcblx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRPclwiKSkge1xuXHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbkNvbGxlY3Rpb24uY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIk9yXCI7XG5cdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkRXFcIikpIHtcblx0XHRcdFx0KHBhcnNlZEFubm90YXRpb25Db2xsZWN0aW9uLmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJFcVwiO1xuXHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJE5lXCIpKSB7XG5cdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uQ29sbGVjdGlvbi5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiTmVcIjtcblx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiROb3RcIikpIHtcblx0XHRcdFx0KHBhcnNlZEFubm90YXRpb25Db2xsZWN0aW9uLmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJOb3RcIjtcblx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRHdFwiKSkge1xuXHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbkNvbGxlY3Rpb24uY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIkd0XCI7XG5cdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkR2VcIikpIHtcblx0XHRcdFx0KHBhcnNlZEFubm90YXRpb25Db2xsZWN0aW9uLmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJHZVwiO1xuXHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJEx0XCIpKSB7XG5cdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uQ29sbGVjdGlvbi5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiTHRcIjtcblx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRMZVwiKSkge1xuXHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbkNvbGxlY3Rpb24uY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIkxlXCI7XG5cdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkQXBwbHlcIikpIHtcblx0XHRcdFx0KHBhcnNlZEFubm90YXRpb25Db2xsZWN0aW9uLmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJBcHBseVwiO1xuXHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgYW5ub3RhdGlvbk9iamVjdFswXSA9PT0gXCJvYmplY3RcIikge1xuXHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbkNvbGxlY3Rpb24uY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIlJlY29yZFwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0KHBhcnNlZEFubm90YXRpb25Db2xsZWN0aW9uLmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJTdHJpbmdcIjtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0aWYgKGFubm90YXRpb25PYmplY3QuJFR5cGUpIHtcblx0XHRcdGNvbnN0IHR5cGVWYWx1ZSA9IGFubm90YXRpb25PYmplY3QuJFR5cGU7XG5cdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LnR5cGUgPSB0eXBlVmFsdWU7IC8vYCR7dHlwZUFsaWFzfS4ke3R5cGVUZXJtfWA7XG5cdFx0fVxuXHRcdGNvbnN0IHByb3BlcnR5VmFsdWVzOiBhbnkgPSBbXTtcblx0XHRPYmplY3Qua2V5cyhhbm5vdGF0aW9uT2JqZWN0KS5mb3JFYWNoKHByb3BlcnR5S2V5ID0+IHtcblx0XHRcdGlmIChcblx0XHRcdFx0cHJvcGVydHlLZXkgIT09IFwiJFR5cGVcIiAmJlxuXHRcdFx0XHRwcm9wZXJ0eUtleSAhPT0gXCIkSWZcIiAmJlxuXHRcdFx0XHRwcm9wZXJ0eUtleSAhPT0gXCIkQXBwbHlcIiAmJlxuXHRcdFx0XHRwcm9wZXJ0eUtleSAhPT0gXCIkQW5kXCIgJiZcblx0XHRcdFx0cHJvcGVydHlLZXkgIT09IFwiJE9yXCIgJiZcblx0XHRcdFx0cHJvcGVydHlLZXkgIT09IFwiJE5lXCIgJiZcblx0XHRcdFx0cHJvcGVydHlLZXkgIT09IFwiJEd0XCIgJiZcblx0XHRcdFx0cHJvcGVydHlLZXkgIT09IFwiJEdlXCIgJiZcblx0XHRcdFx0cHJvcGVydHlLZXkgIT09IFwiJEx0XCIgJiZcblx0XHRcdFx0cHJvcGVydHlLZXkgIT09IFwiJExlXCIgJiZcblx0XHRcdFx0cHJvcGVydHlLZXkgIT09IFwiJE5vdFwiICYmXG5cdFx0XHRcdHByb3BlcnR5S2V5ICE9PSBcIiRFcVwiICYmXG5cdFx0XHRcdCFwcm9wZXJ0eUtleS5zdGFydHNXaXRoKFwiQFwiKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHByb3BlcnR5VmFsdWVzLnB1c2goXG5cdFx0XHRcdFx0cGFyc2VQcm9wZXJ0eVZhbHVlKGFubm90YXRpb25PYmplY3RbcHJvcGVydHlLZXldLCBwcm9wZXJ0eUtleSwgY3VycmVudE9iamVjdFRhcmdldCwgYW5ub3RhdGlvbnNMaXN0cywgb0NhcGFiaWxpdGllcylcblx0XHRcdFx0KTtcblx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHlLZXkuc3RhcnRzV2l0aChcIkBcIikpIHtcblx0XHRcdFx0Ly8gQW5ub3RhdGlvbiBvZiBhbm5vdGF0aW9uXG5cdFx0XHRcdGNyZWF0ZUFubm90YXRpb25MaXN0cyhcblx0XHRcdFx0XHR7IFtwcm9wZXJ0eUtleV06IGFubm90YXRpb25PYmplY3RbcHJvcGVydHlLZXldIH0sXG5cdFx0XHRcdFx0Y3VycmVudE9iamVjdFRhcmdldCxcblx0XHRcdFx0XHRhbm5vdGF0aW9uc0xpc3RzLFxuXHRcdFx0XHRcdG9DYXBhYmlsaXRpZXNcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LnByb3BlcnR5VmFsdWVzID0gcHJvcGVydHlWYWx1ZXM7XG5cdH1cblx0cmV0dXJuIHBhcnNlZEFubm90YXRpb25PYmplY3Q7XG59XG5mdW5jdGlvbiBnZXRPckNyZWF0ZUFubm90YXRpb25MaXN0KHRhcmdldDogc3RyaW5nLCBhbm5vdGF0aW9uc0xpc3RzOiBSZWNvcmQ8c3RyaW5nLCBBbm5vdGF0aW9uTGlzdD4pOiBBbm5vdGF0aW9uTGlzdCB7XG5cdGlmICghYW5ub3RhdGlvbnNMaXN0cy5oYXNPd25Qcm9wZXJ0eSh0YXJnZXQpKSB7XG5cdFx0YW5ub3RhdGlvbnNMaXN0c1t0YXJnZXRdID0ge1xuXHRcdFx0dGFyZ2V0OiB0YXJnZXQsXG5cdFx0XHRhbm5vdGF0aW9uczogW11cblx0XHR9O1xuXHR9XG5cdHJldHVybiBhbm5vdGF0aW9uc0xpc3RzW3RhcmdldF07XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNoYXJ0QW5ub3RhdGlvbnMoYW5ub3RhdGlvbk9iamVjdDogYW55KSB7XG5cdHJldHVybiBhbm5vdGF0aW9uT2JqZWN0LmZpbHRlcigob1JlY29yZDogYW55KSA9PiB7XG5cdFx0aWYgKG9SZWNvcmQuVGFyZ2V0ICYmIG9SZWNvcmQuVGFyZ2V0LiRBbm5vdGF0aW9uUGF0aCkge1xuXHRcdFx0cmV0dXJuIG9SZWNvcmQuVGFyZ2V0LiRBbm5vdGF0aW9uUGF0aC5pbmRleE9mKFwiQGNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkNoYXJ0XCIpID09PSAtMTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlSUJOQW5ub3RhdGlvbnMoYW5ub3RhdGlvbk9iamVjdDogYW55KSB7XG5cdHJldHVybiBhbm5vdGF0aW9uT2JqZWN0LmZpbHRlcigob1JlY29yZDogYW55KSA9PiB7XG5cdFx0cmV0dXJuIG9SZWNvcmQuJFR5cGUgIT09IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uXCI7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVQcmVzZW50YXRpb25WYXJpYW50KGFubm90YXRpb25PYmplY3Q6IGFueSkge1xuXHRyZXR1cm4gYW5ub3RhdGlvbk9iamVjdC5maWx0ZXIoKG9SZWNvcmQ6IGFueSkgPT4ge1xuXHRcdHJldHVybiBvUmVjb3JkLiRBbm5vdGF0aW9uUGF0aCAhPT0gXCJAY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuQ2hhcnRcIjtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUFubm90YXRpb25MaXN0cyhcblx0YW5ub3RhdGlvbk9iamVjdHM6IGFueSxcblx0YW5ub3RhdGlvblRhcmdldDogc3RyaW5nLFxuXHRhbm5vdGF0aW9uTGlzdHM6IFJlY29yZDxzdHJpbmcsIEFubm90YXRpb25MaXN0Pixcblx0b0NhcGFiaWxpdGllczogRW52aXJvbm1lbnRDYXBhYmlsaXRpZXNcbikge1xuXHRpZiAoT2JqZWN0LmtleXMoYW5ub3RhdGlvbk9iamVjdHMpLmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybjtcblx0fVxuXHRjb25zdCBvdXRBbm5vdGF0aW9uT2JqZWN0ID0gZ2V0T3JDcmVhdGVBbm5vdGF0aW9uTGlzdChhbm5vdGF0aW9uVGFyZ2V0LCBhbm5vdGF0aW9uTGlzdHMpO1xuXHRpZiAoIW9DYXBhYmlsaXRpZXMuTWljcm9DaGFydCkge1xuXHRcdGRlbGV0ZSBhbm5vdGF0aW9uT2JqZWN0c1tcIkBjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5DaGFydFwiXTtcblx0fVxuXG5cdGZvciAobGV0IGFubm90YXRpb25LZXkgaW4gYW5ub3RhdGlvbk9iamVjdHMpIHtcblx0XHRsZXQgYW5ub3RhdGlvbk9iamVjdCA9IGFubm90YXRpb25PYmplY3RzW2Fubm90YXRpb25LZXldO1xuXHRcdHN3aXRjaCAoYW5ub3RhdGlvbktleSkge1xuXHRcdFx0Y2FzZSBcIkBjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5IZWFkZXJGYWNldHNcIjpcblx0XHRcdFx0aWYgKCFvQ2FwYWJpbGl0aWVzLk1pY3JvQ2hhcnQpIHtcblx0XHRcdFx0XHRhbm5vdGF0aW9uT2JqZWN0ID0gcmVtb3ZlQ2hhcnRBbm5vdGF0aW9ucyhhbm5vdGF0aW9uT2JqZWN0KTtcblx0XHRcdFx0XHRhbm5vdGF0aW9uT2JqZWN0c1thbm5vdGF0aW9uS2V5XSA9IGFubm90YXRpb25PYmplY3Q7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiQGNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLklkZW50aWZpY2F0aW9uXCI6XG5cdFx0XHRcdGlmICghb0NhcGFiaWxpdGllcy5JbnRlbnRCYXNlZE5hdmlnYXRpb24pIHtcblx0XHRcdFx0XHRhbm5vdGF0aW9uT2JqZWN0ID0gcmVtb3ZlSUJOQW5ub3RhdGlvbnMoYW5ub3RhdGlvbk9iamVjdCk7XG5cdFx0XHRcdFx0YW5ub3RhdGlvbk9iamVjdHNbYW5ub3RhdGlvbktleV0gPSBhbm5vdGF0aW9uT2JqZWN0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIkBjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5MaW5lSXRlbVwiOlxuXHRcdFx0XHRpZiAoIW9DYXBhYmlsaXRpZXMuSW50ZW50QmFzZWROYXZpZ2F0aW9uKSB7XG5cdFx0XHRcdFx0YW5ub3RhdGlvbk9iamVjdCA9IHJlbW92ZUlCTkFubm90YXRpb25zKGFubm90YXRpb25PYmplY3QpO1xuXHRcdFx0XHRcdGFubm90YXRpb25PYmplY3RzW2Fubm90YXRpb25LZXldID0gYW5ub3RhdGlvbk9iamVjdDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIW9DYXBhYmlsaXRpZXMuTWljcm9DaGFydCkge1xuXHRcdFx0XHRcdGFubm90YXRpb25PYmplY3QgPSByZW1vdmVDaGFydEFubm90YXRpb25zKGFubm90YXRpb25PYmplY3QpO1xuXHRcdFx0XHRcdGFubm90YXRpb25PYmplY3RzW2Fubm90YXRpb25LZXldID0gYW5ub3RhdGlvbk9iamVjdDtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJAY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRmllbGRHcm91cFwiOlxuXHRcdFx0XHRpZiAoIW9DYXBhYmlsaXRpZXMuSW50ZW50QmFzZWROYXZpZ2F0aW9uKSB7XG5cdFx0XHRcdFx0YW5ub3RhdGlvbk9iamVjdC5EYXRhID0gcmVtb3ZlSUJOQW5ub3RhdGlvbnMoYW5ub3RhdGlvbk9iamVjdC5EYXRhKTtcblx0XHRcdFx0XHRhbm5vdGF0aW9uT2JqZWN0c1thbm5vdGF0aW9uS2V5XSA9IGFubm90YXRpb25PYmplY3Q7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFvQ2FwYWJpbGl0aWVzLk1pY3JvQ2hhcnQpIHtcblx0XHRcdFx0XHRhbm5vdGF0aW9uT2JqZWN0LkRhdGEgPSByZW1vdmVDaGFydEFubm90YXRpb25zKGFubm90YXRpb25PYmplY3QuRGF0YSk7XG5cdFx0XHRcdFx0YW5ub3RhdGlvbk9iamVjdHNbYW5ub3RhdGlvbktleV0gPSBhbm5vdGF0aW9uT2JqZWN0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIkBjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5QcmVzZW50YXRpb25WYXJpYW50XCI6XG5cdFx0XHRcdGlmICghb0NhcGFiaWxpdGllcy5DaGFydCAmJiBhbm5vdGF0aW9uT2JqZWN0LlZpc3VhbGl6YXRpb25zKSB7XG5cdFx0XHRcdFx0YW5ub3RhdGlvbk9iamVjdC5WaXN1YWxpemF0aW9ucyA9IGhhbmRsZVByZXNlbnRhdGlvblZhcmlhbnQoYW5ub3RhdGlvbk9iamVjdC5WaXN1YWxpemF0aW9ucyk7XG5cdFx0XHRcdFx0YW5ub3RhdGlvbk9iamVjdHNbYW5ub3RhdGlvbktleV0gPSBhbm5vdGF0aW9uT2JqZWN0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0bGV0IGN1cnJlbnRPdXRBbm5vdGF0aW9uT2JqZWN0ID0gb3V0QW5ub3RhdGlvbk9iamVjdDtcblxuXHRcdC8vIENoZWNrIGZvciBhbm5vdGF0aW9uIG9mIGFubm90YXRpb25cblx0XHRjb25zdCBhbm5vdGF0aW9uT2ZBbm5vdGF0aW9uU3BsaXQgPSBhbm5vdGF0aW9uS2V5LnNwbGl0KFwiQFwiKTtcblx0XHRpZiAoYW5ub3RhdGlvbk9mQW5ub3RhdGlvblNwbGl0Lmxlbmd0aCA+IDIpIHtcblx0XHRcdGN1cnJlbnRPdXRBbm5vdGF0aW9uT2JqZWN0ID0gZ2V0T3JDcmVhdGVBbm5vdGF0aW9uTGlzdChcblx0XHRcdFx0YW5ub3RhdGlvblRhcmdldCArIFwiQFwiICsgYW5ub3RhdGlvbk9mQW5ub3RhdGlvblNwbGl0WzFdLFxuXHRcdFx0XHRhbm5vdGF0aW9uTGlzdHNcblx0XHRcdCk7XG5cdFx0XHRhbm5vdGF0aW9uS2V5ID0gYW5ub3RhdGlvbk9mQW5ub3RhdGlvblNwbGl0WzJdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhbm5vdGF0aW9uS2V5ID0gYW5ub3RhdGlvbk9mQW5ub3RhdGlvblNwbGl0WzFdO1xuXHRcdH1cblxuXHRcdGNvbnN0IGFubm90YXRpb25RdWFsaWZpZXJTcGxpdCA9IGFubm90YXRpb25LZXkuc3BsaXQoXCIjXCIpO1xuXHRcdGNvbnN0IHF1YWxpZmllciA9IGFubm90YXRpb25RdWFsaWZpZXJTcGxpdFsxXTtcblx0XHRhbm5vdGF0aW9uS2V5ID0gYW5ub3RhdGlvblF1YWxpZmllclNwbGl0WzBdO1xuXG5cdFx0Y29uc3QgcGFyc2VkQW5ub3RhdGlvbk9iamVjdDogYW55ID0ge1xuXHRcdFx0dGVybTogYCR7YW5ub3RhdGlvbktleX1gLFxuXHRcdFx0cXVhbGlmaWVyOiBxdWFsaWZpZXJcblx0XHR9O1xuXHRcdGxldCBjdXJyZW50QW5ub3RhdGlvblRhcmdldCA9IGFubm90YXRpb25UYXJnZXQgKyBcIkBcIiArIHBhcnNlZEFubm90YXRpb25PYmplY3QudGVybTtcblx0XHRpZiAocXVhbGlmaWVyKSB7XG5cdFx0XHRjdXJyZW50QW5ub3RhdGlvblRhcmdldCArPSBcIiNcIiArIHF1YWxpZmllcjtcblx0XHR9XG5cdFx0bGV0IGlzQ29sbGVjdGlvbiA9IGZhbHNlO1xuXHRcdGNvbnN0IHR5cGVvZkFubm90YXRpb24gPSB0eXBlb2YgYW5ub3RhdGlvbk9iamVjdDtcblx0XHRpZiAoYW5ub3RhdGlvbk9iamVjdCA9PT0gbnVsbCkge1xuXHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdC52YWx1ZSA9IHsgdHlwZTogXCJCb29sXCIsIEJvb2w6IGFubm90YXRpb25PYmplY3QgfTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZkFubm90YXRpb24gPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QudmFsdWUgPSB7IHR5cGU6IFwiU3RyaW5nXCIsIFN0cmluZzogYW5ub3RhdGlvbk9iamVjdCB9O1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mQW5ub3RhdGlvbiA9PT0gXCJib29sZWFuXCIpIHtcblx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QudmFsdWUgPSB7IHR5cGU6IFwiQm9vbFwiLCBCb29sOiBhbm5vdGF0aW9uT2JqZWN0IH07XG5cdFx0fSBlbHNlIGlmICh0eXBlb2ZBbm5vdGF0aW9uID09PSBcIm51bWJlclwiKSB7XG5cdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LnZhbHVlID0geyB0eXBlOiBcIkludFwiLCBJbnQ6IGFubm90YXRpb25PYmplY3QgfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJElmICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QudmFsdWUgPSB7IHR5cGU6IFwiSWZcIiwgSWY6IGFubm90YXRpb25PYmplY3QuJElmIH07XG5cdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRBbmQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdC52YWx1ZSA9IHsgdHlwZTogXCJBbmRcIiwgQW5kOiBhbm5vdGF0aW9uT2JqZWN0LiRBbmQgfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJE9yICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QudmFsdWUgPSB7IHR5cGU6IFwiT3JcIiwgT3I6IGFubm90YXRpb25PYmplY3QuJE9yIH07XG5cdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiROb3QgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdC52YWx1ZSA9IHsgdHlwZTogXCJOb3RcIiwgTm90OiBhbm5vdGF0aW9uT2JqZWN0LiROb3QgfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJEVxICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QudmFsdWUgPSB7IHR5cGU6IFwiRXFcIiwgRXE6IGFubm90YXRpb25PYmplY3QuJEVxIH07XG5cdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiROZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LnZhbHVlID0geyB0eXBlOiBcIk5lXCIsIE5lOiBhbm5vdGF0aW9uT2JqZWN0LiROZSB9O1xuXHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kR3QgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdC52YWx1ZSA9IHsgdHlwZTogXCJHdFwiLCBHdDogYW5ub3RhdGlvbk9iamVjdC4kR3QgfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJEdlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QudmFsdWUgPSB7IHR5cGU6IFwiR2VcIiwgR2U6IGFubm90YXRpb25PYmplY3QuJEdlIH07XG5cdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRMdCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LnZhbHVlID0geyB0eXBlOiBcIkx0XCIsIEx0OiBhbm5vdGF0aW9uT2JqZWN0LiRMdCB9O1xuXHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kTGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdC52YWx1ZSA9IHsgdHlwZTogXCJMZVwiLCBMZTogYW5ub3RhdGlvbk9iamVjdC4kTGUgfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJEFwcGx5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QudmFsdWUgPSB7IHR5cGU6IFwiQXBwbHlcIiwgQXBwbHk6IGFubm90YXRpb25PYmplY3QuJEFwcGx5LCBGdW5jdGlvbjogYW5ub3RhdGlvbk9iamVjdC4kRnVuY3Rpb24gfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJFBhdGggIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdC52YWx1ZSA9IHsgdHlwZTogXCJQYXRoXCIsIFBhdGg6IGFubm90YXRpb25PYmplY3QuJFBhdGggfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJEFubm90YXRpb25QYXRoICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QudmFsdWUgPSB7XG5cdFx0XHRcdHR5cGU6IFwiQW5ub3RhdGlvblBhdGhcIixcblx0XHRcdFx0QW5ub3RhdGlvblBhdGg6IGFubm90YXRpb25PYmplY3QuJEFubm90YXRpb25QYXRoXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kRGVjaW1hbCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LnZhbHVlID0geyB0eXBlOiBcIkRlY2ltYWxcIiwgRGVjaW1hbDogcGFyc2VGbG9hdChhbm5vdGF0aW9uT2JqZWN0LiREZWNpbWFsKSB9O1xuXHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kRW51bU1lbWJlciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LnZhbHVlID0ge1xuXHRcdFx0XHR0eXBlOiBcIkVudW1NZW1iZXJcIixcblx0XHRcdFx0RW51bU1lbWJlcjogbWFwTmFtZVRvQWxpYXMoYW5ub3RhdGlvbk9iamVjdC4kRW51bU1lbWJlci5zcGxpdChcIi9cIilbMF0pICsgXCIvXCIgKyBhbm5vdGF0aW9uT2JqZWN0LiRFbnVtTWVtYmVyLnNwbGl0KFwiL1wiKVsxXVxuXHRcdFx0fTtcblx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYW5ub3RhdGlvbk9iamVjdCkpIHtcblx0XHRcdGlzQ29sbGVjdGlvbiA9IHRydWU7XG5cdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LmNvbGxlY3Rpb24gPSBhbm5vdGF0aW9uT2JqZWN0Lm1hcCgoc3ViQW5ub3RhdGlvbk9iamVjdCwgc3ViQW5ub3RhdGlvbkluZGV4KSA9PlxuXHRcdFx0XHRwYXJzZUFubm90YXRpb25PYmplY3QoXG5cdFx0XHRcdFx0c3ViQW5ub3RhdGlvbk9iamVjdCxcblx0XHRcdFx0XHRjdXJyZW50QW5ub3RhdGlvblRhcmdldCArIFwiL1wiICsgc3ViQW5ub3RhdGlvbkluZGV4LFxuXHRcdFx0XHRcdGFubm90YXRpb25MaXN0cyxcblx0XHRcdFx0XHRvQ2FwYWJpbGl0aWVzXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0XHRpZiAoYW5ub3RhdGlvbk9iamVjdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJFByb3BlcnR5UGF0aFwiKSkge1xuXHRcdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJQcm9wZXJ0eVBhdGhcIjtcblx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJFBhdGhcIikpIHtcblx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbk9iamVjdC5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiUGF0aFwiO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkTmF2aWdhdGlvblByb3BlcnR5UGF0aFwiKSkge1xuXHRcdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJOYXZpZ2F0aW9uUHJvcGVydHlQYXRoXCI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRBbm5vdGF0aW9uUGF0aFwiKSkge1xuXHRcdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJBbm5vdGF0aW9uUGF0aFwiO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkVHlwZVwiKSkge1xuXHRcdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJSZWNvcmRcIjtcblx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJElmXCIpKSB7XG5cdFx0XHRcdFx0KHBhcnNlZEFubm90YXRpb25PYmplY3QuY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIklmXCI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRPclwiKSkge1xuXHRcdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJPclwiO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkRXFcIikpIHtcblx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbk9iamVjdC5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiRXFcIjtcblx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJE5lXCIpKSB7XG5cdFx0XHRcdFx0KHBhcnNlZEFubm90YXRpb25PYmplY3QuY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIk5lXCI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiROb3RcIikpIHtcblx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbk9iamVjdC5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiTm90XCI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRHdFwiKSkge1xuXHRcdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJHdFwiO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkR2VcIikpIHtcblx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbk9iamVjdC5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiR2VcIjtcblx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJEx0XCIpKSB7XG5cdFx0XHRcdFx0KHBhcnNlZEFubm90YXRpb25PYmplY3QuY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIkx0XCI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRMZVwiKSkge1xuXHRcdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJMZVwiO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkQW5kXCIpKSB7XG5cdFx0XHRcdFx0KHBhcnNlZEFubm90YXRpb25PYmplY3QuY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIkFuZFwiO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkQXBwbHlcIikpIHtcblx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbk9iamVjdC5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiQXBwbHlcIjtcblx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgYW5ub3RhdGlvbk9iamVjdFswXSA9PT0gXCJvYmplY3RcIikge1xuXHRcdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJSZWNvcmRcIjtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbk9iamVjdC5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiU3RyaW5nXCI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgcmVjb3JkOiBBbm5vdGF0aW9uUmVjb3JkID0ge1xuXHRcdFx0XHRwcm9wZXJ0eVZhbHVlczogW11cblx0XHRcdH07XG5cdFx0XHRpZiAoYW5ub3RhdGlvbk9iamVjdC4kVHlwZSkge1xuXHRcdFx0XHRjb25zdCB0eXBlVmFsdWUgPSBhbm5vdGF0aW9uT2JqZWN0LiRUeXBlO1xuXHRcdFx0XHRyZWNvcmQudHlwZSA9IGAke3R5cGVWYWx1ZX1gO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgcHJvcGVydHlWYWx1ZXM6IGFueVtdID0gW107XG5cdFx0XHRmb3IgKGNvbnN0IHByb3BlcnR5S2V5IGluIGFubm90YXRpb25PYmplY3QpIHtcblx0XHRcdFx0aWYgKHByb3BlcnR5S2V5ICE9PSBcIiRUeXBlXCIgJiYgIXByb3BlcnR5S2V5LnN0YXJ0c1dpdGgoXCJAXCIpKSB7XG5cdFx0XHRcdFx0cHJvcGVydHlWYWx1ZXMucHVzaChcblx0XHRcdFx0XHRcdHBhcnNlUHJvcGVydHlWYWx1ZShcblx0XHRcdFx0XHRcdFx0YW5ub3RhdGlvbk9iamVjdFtwcm9wZXJ0eUtleV0sXG5cdFx0XHRcdFx0XHRcdHByb3BlcnR5S2V5LFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50QW5ub3RhdGlvblRhcmdldCxcblx0XHRcdFx0XHRcdFx0YW5ub3RhdGlvbkxpc3RzLFxuXHRcdFx0XHRcdFx0XHRvQ2FwYWJpbGl0aWVzXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSBlbHNlIGlmIChwcm9wZXJ0eUtleS5zdGFydHNXaXRoKFwiQFwiKSkge1xuXHRcdFx0XHRcdC8vIEFubm90YXRpb24gb2YgcmVjb3JkXG5cdFx0XHRcdFx0Y3JlYXRlQW5ub3RhdGlvbkxpc3RzKFxuXHRcdFx0XHRcdFx0eyBbcHJvcGVydHlLZXldOiBhbm5vdGF0aW9uT2JqZWN0W3Byb3BlcnR5S2V5XSB9LFxuXHRcdFx0XHRcdFx0Y3VycmVudEFubm90YXRpb25UYXJnZXQsXG5cdFx0XHRcdFx0XHRhbm5vdGF0aW9uTGlzdHMsXG5cdFx0XHRcdFx0XHRvQ2FwYWJpbGl0aWVzXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmVjb3JkLnByb3BlcnR5VmFsdWVzID0gcHJvcGVydHlWYWx1ZXM7XG5cdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LnJlY29yZCA9IHJlY29yZDtcblx0XHR9XG5cdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdC5pc0NvbGxlY3Rpb24gPSBpc0NvbGxlY3Rpb247XG5cdFx0Y3VycmVudE91dEFubm90YXRpb25PYmplY3QuYW5ub3RhdGlvbnMucHVzaChwYXJzZWRBbm5vdGF0aW9uT2JqZWN0KTtcblx0fVxufVxuXG5mdW5jdGlvbiBwcmVwYXJlUHJvcGVydHkocHJvcGVydHlEZWZpbml0aW9uOiBhbnksIGVudGl0eVR5cGVPYmplY3Q6IEVudGl0eVR5cGUgfCBDb21wbGV4VHlwZSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eSB7XG5cdGNvbnN0IHByb3BlcnR5T2JqZWN0OiBQcm9wZXJ0eSA9IHtcblx0XHRfdHlwZTogXCJQcm9wZXJ0eVwiLFxuXHRcdG5hbWU6IHByb3BlcnR5TmFtZSxcblx0XHRmdWxseVF1YWxpZmllZE5hbWU6IGAke2VudGl0eVR5cGVPYmplY3QuZnVsbHlRdWFsaWZpZWROYW1lfS8ke3Byb3BlcnR5TmFtZX1gLFxuXHRcdHR5cGU6IHByb3BlcnR5RGVmaW5pdGlvbi4kVHlwZSxcblx0XHRtYXhMZW5ndGg6IHByb3BlcnR5RGVmaW5pdGlvbi4kTWF4TGVuZ3RoLFxuXHRcdHByZWNpc2lvbjogcHJvcGVydHlEZWZpbml0aW9uLiRQcmVjaXNpb24sXG5cdFx0c2NhbGU6IHByb3BlcnR5RGVmaW5pdGlvbi4kU2NhbGUsXG5cdFx0bnVsbGFibGU6IHByb3BlcnR5RGVmaW5pdGlvbi4kTnVsbGFibGVcblx0fTtcblx0cmV0dXJuIHByb3BlcnR5T2JqZWN0O1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlTmF2aWdhdGlvblByb3BlcnR5KFxuXHRuYXZQcm9wZXJ0eURlZmluaXRpb246IGFueSxcblx0ZW50aXR5VHlwZU9iamVjdDogRW50aXR5VHlwZSB8IENvbXBsZXhUeXBlLFxuXHRuYXZQcm9wZXJ0eU5hbWU6IHN0cmluZ1xuKTogVjROYXZpZ2F0aW9uUHJvcGVydHkge1xuXHRsZXQgcmVmZXJlbnRpYWxDb25zdHJhaW50OiBSZWZlcmVudGlhbENvbnN0cmFpbnRbXSA9IFtdO1xuXHRpZiAobmF2UHJvcGVydHlEZWZpbml0aW9uLiRSZWZlcmVudGlhbENvbnN0cmFpbnQpIHtcblx0XHRyZWZlcmVudGlhbENvbnN0cmFpbnQgPSBPYmplY3Qua2V5cyhuYXZQcm9wZXJ0eURlZmluaXRpb24uJFJlZmVyZW50aWFsQ29uc3RyYWludCkubWFwKHNvdXJjZVByb3BlcnR5TmFtZSA9PiB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRzb3VyY2VUeXBlTmFtZTogZW50aXR5VHlwZU9iamVjdC5uYW1lLFxuXHRcdFx0XHRzb3VyY2VQcm9wZXJ0eTogc291cmNlUHJvcGVydHlOYW1lLFxuXHRcdFx0XHR0YXJnZXRUeXBlTmFtZTogbmF2UHJvcGVydHlEZWZpbml0aW9uLiRUeXBlLFxuXHRcdFx0XHR0YXJnZXRQcm9wZXJ0eTogbmF2UHJvcGVydHlEZWZpbml0aW9uLiRSZWZlcmVudGlhbENvbnN0cmFpbnRbc291cmNlUHJvcGVydHlOYW1lXVxuXHRcdFx0fTtcblx0XHR9KTtcblx0fVxuXHRjb25zdCBuYXZpZ2F0aW9uUHJvcGVydHk6IFY0TmF2aWdhdGlvblByb3BlcnR5ID0ge1xuXHRcdF90eXBlOiBcIk5hdmlnYXRpb25Qcm9wZXJ0eVwiLFxuXHRcdG5hbWU6IG5hdlByb3BlcnR5TmFtZSxcblx0XHRmdWxseVF1YWxpZmllZE5hbWU6IGAke2VudGl0eVR5cGVPYmplY3QuZnVsbHlRdWFsaWZpZWROYW1lfS8ke25hdlByb3BlcnR5TmFtZX1gLFxuXHRcdHBhcnRuZXI6IG5hdlByb3BlcnR5RGVmaW5pdGlvbi4kUGFydG5lcixcblx0XHRpc0NvbGxlY3Rpb246IG5hdlByb3BlcnR5RGVmaW5pdGlvbi4kaXNDb2xsZWN0aW9uID8gbmF2UHJvcGVydHlEZWZpbml0aW9uLiRpc0NvbGxlY3Rpb24gOiBmYWxzZSxcblx0XHRjb250YWluc1RhcmdldDogbmF2UHJvcGVydHlEZWZpbml0aW9uLiRDb250YWluc1RhcmdldCxcblx0XHR0YXJnZXRUeXBlTmFtZTogbmF2UHJvcGVydHlEZWZpbml0aW9uLiRUeXBlLFxuXHRcdHJlZmVyZW50aWFsQ29uc3RyYWludFxuXHR9O1xuXG5cdHJldHVybiBuYXZpZ2F0aW9uUHJvcGVydHk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVFbnRpdHlTZXQoZW50aXR5U2V0RGVmaW5pdGlvbjogYW55LCBlbnRpdHlTZXROYW1lOiBzdHJpbmcsIGVudGl0eUNvbnRhaW5lck5hbWU6IHN0cmluZyk6IEVudGl0eVNldCB7XG5cdGNvbnN0IGVudGl0eVNldE9iamVjdDogRW50aXR5U2V0ID0ge1xuXHRcdF90eXBlOiBcIkVudGl0eVNldFwiLFxuXHRcdG5hbWU6IGVudGl0eVNldE5hbWUsXG5cdFx0bmF2aWdhdGlvblByb3BlcnR5QmluZGluZzoge30sXG5cdFx0ZW50aXR5VHlwZU5hbWU6IGVudGl0eVNldERlZmluaXRpb24uJFR5cGUsXG5cdFx0ZnVsbHlRdWFsaWZpZWROYW1lOiBgJHtlbnRpdHlDb250YWluZXJOYW1lfS8ke2VudGl0eVNldE5hbWV9YFxuXHR9O1xuXHRyZXR1cm4gZW50aXR5U2V0T2JqZWN0O1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlU2luZ2xldG9uKHNpbmdsZXRvbkRlZmluaXRpb246IGFueSwgc2luZ2xldG9uTmFtZTogc3RyaW5nLCBlbnRpdHlDb250YWluZXJOYW1lOiBzdHJpbmcpOiBTaW5nbGV0b24ge1xuXHRjb25zdCBzaW5nbGV0b25PYmplY3Q6IFNpbmdsZXRvbiA9IHtcblx0XHRfdHlwZTogXCJTaW5nbGV0b25cIixcblx0XHRuYW1lOiBzaW5nbGV0b25OYW1lLFxuXHRcdG5hdmlnYXRpb25Qcm9wZXJ0eUJpbmRpbmc6IHt9LFxuXHRcdHR5cGVOYW1lOiBzaW5nbGV0b25EZWZpbml0aW9uLiRUeXBlLFxuXHRcdGZ1bGx5UXVhbGlmaWVkTmFtZTogYCR7ZW50aXR5Q29udGFpbmVyTmFtZX0vJHtzaW5nbGV0b25OYW1lfWAsXG5cdFx0bnVsbGFibGU6IHRydWVcblx0fTtcblx0cmV0dXJuIHNpbmdsZXRvbk9iamVjdDtcbn1cblxuZnVuY3Rpb24gcHJlcGFyZUNvbXBsZXhUeXBlKGNvbXBsZXhUeXBlRGVmaW5pdGlvbjogYW55LCBjb21wbGV4VHlwZU5hbWU6IHN0cmluZywgbmFtZXNwYWNlOiBzdHJpbmcpOiBDb21wbGV4VHlwZSB7XG5cdGNvbnN0IGNvbXBsZXhUeXBlT2JqZWN0OiBDb21wbGV4VHlwZSA9IHtcblx0XHRfdHlwZTogXCJDb21wbGV4VHlwZVwiLFxuXHRcdG5hbWU6IGNvbXBsZXhUeXBlTmFtZS5yZXBsYWNlKG5hbWVzcGFjZSArIFwiLlwiLCBcIlwiKSxcblx0XHRmdWxseVF1YWxpZmllZE5hbWU6IGNvbXBsZXhUeXBlTmFtZSxcblx0XHRwcm9wZXJ0aWVzOiBbXSxcblx0XHRuYXZpZ2F0aW9uUHJvcGVydGllczogW11cblx0fTtcblxuXHRjb25zdCBjb21wbGV4VHlwZVByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhjb21wbGV4VHlwZURlZmluaXRpb24pXG5cdFx0LmZpbHRlcihwcm9wZXJ0eU5hbWVPck5vdCA9PiB7XG5cdFx0XHRpZiAocHJvcGVydHlOYW1lT3JOb3QgIT0gXCIkS2V5XCIgJiYgcHJvcGVydHlOYW1lT3JOb3QgIT0gXCIka2luZFwiKSB7XG5cdFx0XHRcdHJldHVybiBjb21wbGV4VHlwZURlZmluaXRpb25bcHJvcGVydHlOYW1lT3JOb3RdLiRraW5kID09PSBcIlByb3BlcnR5XCI7XG5cdFx0XHR9XG5cdFx0fSlcblx0XHQuc29ydCgoYSwgYikgPT4gKGEgPiBiID8gMSA6IC0xKSlcblx0XHQubWFwKHByb3BlcnR5TmFtZSA9PiB7XG5cdFx0XHRyZXR1cm4gcHJlcGFyZVByb3BlcnR5KGNvbXBsZXhUeXBlRGVmaW5pdGlvbltwcm9wZXJ0eU5hbWVdLCBjb21wbGV4VHlwZU9iamVjdCwgcHJvcGVydHlOYW1lKTtcblx0XHR9KTtcblxuXHRjb21wbGV4VHlwZU9iamVjdC5wcm9wZXJ0aWVzID0gY29tcGxleFR5cGVQcm9wZXJ0aWVzO1xuXHRjb25zdCBjb21wbGV4VHlwZU5hdmlnYXRpb25Qcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoY29tcGxleFR5cGVEZWZpbml0aW9uKVxuXHRcdC5maWx0ZXIocHJvcGVydHlOYW1lT3JOb3QgPT4ge1xuXHRcdFx0aWYgKHByb3BlcnR5TmFtZU9yTm90ICE9IFwiJEtleVwiICYmIHByb3BlcnR5TmFtZU9yTm90ICE9IFwiJGtpbmRcIikge1xuXHRcdFx0XHRyZXR1cm4gY29tcGxleFR5cGVEZWZpbml0aW9uW3Byb3BlcnR5TmFtZU9yTm90XS4ka2luZCA9PT0gXCJOYXZpZ2F0aW9uUHJvcGVydHlcIjtcblx0XHRcdH1cblx0XHR9KVxuXHRcdC5zb3J0KChhLCBiKSA9PiAoYSA+IGIgPyAxIDogLTEpKVxuXHRcdC5tYXAobmF2UHJvcGVydHlOYW1lID0+IHtcblx0XHRcdHJldHVybiBwcmVwYXJlTmF2aWdhdGlvblByb3BlcnR5KGNvbXBsZXhUeXBlRGVmaW5pdGlvbltuYXZQcm9wZXJ0eU5hbWVdLCBjb21wbGV4VHlwZU9iamVjdCwgbmF2UHJvcGVydHlOYW1lKTtcblx0XHR9KTtcblx0Y29tcGxleFR5cGVPYmplY3QubmF2aWdhdGlvblByb3BlcnRpZXMgPSBjb21wbGV4VHlwZU5hdmlnYXRpb25Qcm9wZXJ0aWVzO1xuXHRyZXR1cm4gY29tcGxleFR5cGVPYmplY3Q7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVFbnRpdHlLZXlzKGVudGl0eVR5cGVEZWZpbml0aW9uOiBhbnksIG9NZXRhTW9kZWxEYXRhOiBhbnkpOiBhbnkge1xuXHRpZiAoIWVudGl0eVR5cGVEZWZpbml0aW9uLiRLZXkgJiYgZW50aXR5VHlwZURlZmluaXRpb24uJEJhc2VUeXBlKSB7XG5cdFx0cmV0dXJuIHByZXBhcmVFbnRpdHlLZXlzKG9NZXRhTW9kZWxEYXRhW2Ake2VudGl0eVR5cGVEZWZpbml0aW9uLiRCYXNlVHlwZX1gXSwgb01ldGFNb2RlbERhdGEpO1xuXHR9XG5cdHJldHVybiBlbnRpdHlUeXBlRGVmaW5pdGlvbi4kS2V5IHx8IFtdOyAvL2hhbmRsaW5nIG9mIGVudGl0eSB0eXBlcyB3aXRob3V0IGtleSBhcyB3ZWxsIGFzIGJhc2V0eXBlXG59XG5cbmZ1bmN0aW9uIHByZXBhcmVFbnRpdHlUeXBlKGVudGl0eVR5cGVEZWZpbml0aW9uOiBhbnksIGVudGl0eVR5cGVOYW1lOiBzdHJpbmcsIG5hbWVzcGFjZTogc3RyaW5nLCBtZXRhTW9kZWxEYXRhOiBhbnkpOiBFbnRpdHlUeXBlIHtcblx0Y29uc3QgZW50aXR5S2V5czogYW55ID0gcHJlcGFyZUVudGl0eUtleXMoZW50aXR5VHlwZURlZmluaXRpb24sIG1ldGFNb2RlbERhdGEpO1xuXG5cdGNvbnN0IGVudGl0eVR5cGVPYmplY3Q6IEVudGl0eVR5cGUgPSB7XG5cdFx0X3R5cGU6IFwiRW50aXR5VHlwZVwiLFxuXHRcdG5hbWU6IGVudGl0eVR5cGVOYW1lLnJlcGxhY2UobmFtZXNwYWNlICsgXCIuXCIsIFwiXCIpLFxuXHRcdGZ1bGx5UXVhbGlmaWVkTmFtZTogZW50aXR5VHlwZU5hbWUsXG5cdFx0a2V5czogW10sXG5cdFx0ZW50aXR5UHJvcGVydGllczogW10sXG5cdFx0bmF2aWdhdGlvblByb3BlcnRpZXM6IFtdXG5cdH07XG5cblx0Y29uc3QgZW50aXR5UHJvcGVydGllcyA9IE9iamVjdC5rZXlzKGVudGl0eVR5cGVEZWZpbml0aW9uKVxuXHRcdC5maWx0ZXIocHJvcGVydHlOYW1lT3JOb3QgPT4ge1xuXHRcdFx0aWYgKHByb3BlcnR5TmFtZU9yTm90ICE9IFwiJEtleVwiICYmIHByb3BlcnR5TmFtZU9yTm90ICE9IFwiJGtpbmRcIikge1xuXHRcdFx0XHRyZXR1cm4gZW50aXR5VHlwZURlZmluaXRpb25bcHJvcGVydHlOYW1lT3JOb3RdLiRraW5kID09PSBcIlByb3BlcnR5XCI7XG5cdFx0XHR9XG5cdFx0fSlcblx0XHQubWFwKHByb3BlcnR5TmFtZSA9PiB7XG5cdFx0XHRyZXR1cm4gcHJlcGFyZVByb3BlcnR5KGVudGl0eVR5cGVEZWZpbml0aW9uW3Byb3BlcnR5TmFtZV0sIGVudGl0eVR5cGVPYmplY3QsIHByb3BlcnR5TmFtZSk7XG5cdFx0fSk7XG5cblx0Y29uc3QgbmF2aWdhdGlvblByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhlbnRpdHlUeXBlRGVmaW5pdGlvbilcblx0XHQuZmlsdGVyKHByb3BlcnR5TmFtZU9yTm90ID0+IHtcblx0XHRcdGlmIChwcm9wZXJ0eU5hbWVPck5vdCAhPSBcIiRLZXlcIiAmJiBwcm9wZXJ0eU5hbWVPck5vdCAhPSBcIiRraW5kXCIpIHtcblx0XHRcdFx0cmV0dXJuIGVudGl0eVR5cGVEZWZpbml0aW9uW3Byb3BlcnR5TmFtZU9yTm90XS4ka2luZCA9PT0gXCJOYXZpZ2F0aW9uUHJvcGVydHlcIjtcblx0XHRcdH1cblx0XHR9KVxuXHRcdC5tYXAobmF2UHJvcGVydHlOYW1lID0+IHtcblx0XHRcdHJldHVybiBwcmVwYXJlTmF2aWdhdGlvblByb3BlcnR5KGVudGl0eVR5cGVEZWZpbml0aW9uW25hdlByb3BlcnR5TmFtZV0sIGVudGl0eVR5cGVPYmplY3QsIG5hdlByb3BlcnR5TmFtZSk7XG5cdFx0fSk7XG5cblx0ZW50aXR5VHlwZU9iamVjdC5rZXlzID0gZW50aXR5S2V5c1xuXHRcdC5tYXAoKGVudGl0eUtleTogc3RyaW5nKSA9PiBlbnRpdHlQcm9wZXJ0aWVzLmZpbmQoKHByb3BlcnR5OiBQcm9wZXJ0eSkgPT4gcHJvcGVydHkubmFtZSA9PT0gZW50aXR5S2V5KSlcblx0XHQuZmlsdGVyKChwcm9wZXJ0eTogUHJvcGVydHkpID0+IHByb3BlcnR5ICE9PSB1bmRlZmluZWQpO1xuXHRlbnRpdHlUeXBlT2JqZWN0LmVudGl0eVByb3BlcnRpZXMgPSBlbnRpdHlQcm9wZXJ0aWVzO1xuXHRlbnRpdHlUeXBlT2JqZWN0Lm5hdmlnYXRpb25Qcm9wZXJ0aWVzID0gbmF2aWdhdGlvblByb3BlcnRpZXM7XG5cblx0cmV0dXJuIGVudGl0eVR5cGVPYmplY3Q7XG59XG5mdW5jdGlvbiBwcmVwYXJlQWN0aW9uKGFjdGlvbk5hbWU6IHN0cmluZywgYWN0aW9uUmF3RGF0YTogTWV0YU1vZGVsQWN0aW9uLCBuYW1lc3BhY2U6IHN0cmluZywgZW50aXR5Q29udGFpbmVyTmFtZTogc3RyaW5nKTogQWN0aW9uIHtcblx0bGV0IGFjdGlvbkVudGl0eVR5cGU6IHN0cmluZyA9IFwiXCI7XG5cdGxldCBhY3Rpb25GUU4gPSBgJHthY3Rpb25OYW1lfWA7XG5cdGNvbnN0IGFjdGlvblNob3J0TmFtZSA9IGFjdGlvbk5hbWUuc3Vic3RyKG5hbWVzcGFjZS5sZW5ndGggKyAxKTtcblx0aWYgKGFjdGlvblJhd0RhdGEuJElzQm91bmQpIHtcblx0XHRjb25zdCBiaW5kaW5nUGFyYW1ldGVyID0gYWN0aW9uUmF3RGF0YS4kUGFyYW1ldGVyWzBdO1xuXHRcdGFjdGlvbkVudGl0eVR5cGUgPSBiaW5kaW5nUGFyYW1ldGVyLiRUeXBlO1xuXHRcdGlmIChiaW5kaW5nUGFyYW1ldGVyLiRpc0NvbGxlY3Rpb24gPT09IHRydWUpIHtcblx0XHRcdGFjdGlvbkZRTiA9IGAke2FjdGlvbk5hbWV9KENvbGxlY3Rpb24oJHthY3Rpb25FbnRpdHlUeXBlfSkpYDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YWN0aW9uRlFOID0gYCR7YWN0aW9uTmFtZX0oJHthY3Rpb25FbnRpdHlUeXBlfSlgO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRhY3Rpb25GUU4gPSBgJHtlbnRpdHlDb250YWluZXJOYW1lfS8ke2FjdGlvblNob3J0TmFtZX1gO1xuXHR9XG5cdGNvbnN0IHBhcmFtZXRlcnMgPSBhY3Rpb25SYXdEYXRhLiRQYXJhbWV0ZXIgfHwgW107XG5cdHJldHVybiB7XG5cdFx0X3R5cGU6IFwiQWN0aW9uXCIsXG5cdFx0bmFtZTogYWN0aW9uU2hvcnROYW1lLFxuXHRcdGZ1bGx5UXVhbGlmaWVkTmFtZTogYWN0aW9uRlFOLFxuXHRcdGlzQm91bmQ6IGFjdGlvblJhd0RhdGEuJElzQm91bmQsXG5cdFx0aXNGdW5jdGlvbjogZmFsc2UsXG5cdFx0c291cmNlVHlwZTogYWN0aW9uRW50aXR5VHlwZSxcblx0XHRyZXR1cm5UeXBlOiBhY3Rpb25SYXdEYXRhLiRSZXR1cm5UeXBlID8gYWN0aW9uUmF3RGF0YS4kUmV0dXJuVHlwZS4kVHlwZSA6IFwiXCIsXG5cdFx0cGFyYW1ldGVyczogcGFyYW1ldGVycy5tYXAocGFyYW0gPT4ge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0X3R5cGU6IFwiQWN0aW9uUGFyYW1ldGVyXCIsXG5cdFx0XHRcdGlzRW50aXR5U2V0OiBwYXJhbS4kVHlwZSA9PT0gYWN0aW9uUmF3RGF0YS4kRW50aXR5U2V0UGF0aCxcblx0XHRcdFx0ZnVsbHlRdWFsaWZpZWROYW1lOiBgJHthY3Rpb25GUU59LyR7cGFyYW0uJE5hbWV9YCxcblx0XHRcdFx0dHlwZTogcGFyYW0uJFR5cGVcblx0XHRcdFx0Ly8gVE9ETyBtaXNzaW5nIHByb3BlcnRpZXMgP1xuXHRcdFx0fTtcblx0XHR9KVxuXHR9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHByZXBhcmVFbnRpdHlUeXBlcyhcblx0b01ldGFNb2RlbDogT0RhdGFNZXRhTW9kZWwsXG5cdG9DYXBhYmlsaXRpZXM6IEVudmlyb25tZW50Q2FwYWJpbGl0aWVzID0gRGVmYXVsdEVudmlyb25tZW50Q2FwYWJpbGl0aWVzXG4pOiBQYXJzZXJPdXRwdXQge1xuXHRjb25zdCBvTWV0YU1vZGVsRGF0YSA9IG9NZXRhTW9kZWwuZ2V0T2JqZWN0KFwiLyRcIik7XG5cdGNvbnN0IGFubm90YXRpb25MaXN0czogUmVjb3JkPHN0cmluZywgQW5ub3RhdGlvbkxpc3Q+ID0ge307XG5cdGNvbnN0IGVudGl0eVR5cGVzOiBFbnRpdHlUeXBlW10gPSBbXTtcblx0Y29uc3QgZW50aXR5U2V0czogRW50aXR5U2V0W10gPSBbXTtcblx0Y29uc3Qgc2luZ2xldG9uczogU2luZ2xldG9uW10gPSBbXTtcblx0Y29uc3QgY29tcGxleFR5cGVzOiBDb21wbGV4VHlwZVtdID0gW107XG5cdGNvbnN0IGVudGl0eUNvbnRhaW5lck5hbWUgPSBvTWV0YU1vZGVsRGF0YS4kRW50aXR5Q29udGFpbmVyO1xuXHRsZXQgbmFtZXNwYWNlID0gXCJcIjtcblx0Y29uc3Qgc2NoZW1hS2V5cyA9IE9iamVjdC5rZXlzKG9NZXRhTW9kZWxEYXRhKS5maWx0ZXIobWV0YW1vZGVsS2V5ID0+IG9NZXRhTW9kZWxEYXRhW21ldGFtb2RlbEtleV0uJGtpbmQgPT09IFwiU2NoZW1hXCIpO1xuXHRpZiAoc2NoZW1hS2V5cyAmJiBzY2hlbWFLZXlzLmxlbmd0aCA+IDApIHtcblx0XHRuYW1lc3BhY2UgPSBzY2hlbWFLZXlzWzBdLnN1YnN0cigwLCBzY2hlbWFLZXlzWzBdLmxlbmd0aCAtIDEpO1xuXHR9IGVsc2UgaWYgKGVudGl0eVR5cGVzICYmIGVudGl0eVR5cGVzLmxlbmd0aCkge1xuXHRcdG5hbWVzcGFjZSA9IGVudGl0eVR5cGVzWzBdLmZ1bGx5UXVhbGlmaWVkTmFtZS5yZXBsYWNlKGVudGl0eVR5cGVzWzBdLm5hbWUsIFwiXCIpO1xuXHRcdG5hbWVzcGFjZSA9IG5hbWVzcGFjZS5zdWJzdHIoMCwgbmFtZXNwYWNlLmxlbmd0aCAtIDEpO1xuXHR9XG5cdE9iamVjdC5rZXlzKG9NZXRhTW9kZWxEYXRhKS5mb3JFYWNoKHNPYmplY3ROYW1lID0+IHtcblx0XHRpZiAoc09iamVjdE5hbWUgIT09IFwiJGtpbmRcIikge1xuXHRcdFx0c3dpdGNoIChvTWV0YU1vZGVsRGF0YVtzT2JqZWN0TmFtZV0uJGtpbmQpIHtcblx0XHRcdFx0Y2FzZSBcIkVudGl0eVR5cGVcIjpcblx0XHRcdFx0XHRjb25zdCBlbnRpdHlUeXBlID0gcHJlcGFyZUVudGl0eVR5cGUob01ldGFNb2RlbERhdGFbc09iamVjdE5hbWVdLCBzT2JqZWN0TmFtZSwgbmFtZXNwYWNlLCBvTWV0YU1vZGVsRGF0YSk7XG5cdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgdGhlcmUgYXJlIGZpbHRlciBmYWNldHMgZGVmaW5lZCBmb3IgdGhlIGVudGl0eVR5cGUgYW5kIGlmIHllcywgY2hlY2sgaWYgYWxsIG9mIHRoZW0gaGF2ZSBhbiBJRFxuXHRcdFx0XHRcdC8vIFRoZSBJRCBpcyBvcHRpb25hbCwgYnV0IGl0IGlzIGludGVybmFsbHkgdGFrZW4gZm9yIGdyb3VwaW5nIGZpbHRlciBmaWVsZHMgYW5kIGlmIGl0J3Mgbm90IHByZXNlbnRcblx0XHRcdFx0XHQvLyBhIGZhbGxiYWNrIElEIG5lZWRzIHRvIGJlIGdlbmVyYXRlZCBoZXJlLlxuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdG9NZXRhTW9kZWxEYXRhLiRBbm5vdGF0aW9uc1tlbnRpdHlUeXBlLmZ1bGx5UXVhbGlmaWVkTmFtZV0gJiZcblx0XHRcdFx0XHRcdG9NZXRhTW9kZWxEYXRhLiRBbm5vdGF0aW9uc1tlbnRpdHlUeXBlLmZ1bGx5UXVhbGlmaWVkTmFtZV1bXCJAY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRmlsdGVyRmFjZXRzXCJdXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRvTWV0YU1vZGVsRGF0YS4kQW5ub3RhdGlvbnNbZW50aXR5VHlwZS5mdWxseVF1YWxpZmllZE5hbWVdW1wiQGNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkZpbHRlckZhY2V0c1wiXS5mb3JFYWNoKFxuXHRcdFx0XHRcdFx0XHQoZmlsdGVyRmFjZXRBbm5vdGF0aW9uOiBhbnkpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRmaWx0ZXJGYWNldEFubm90YXRpb24uSUQgPSBmaWx0ZXJGYWNldEFubm90YXRpb24uSUQgfHwgZ2VuZXJhdGUoW3sgRmFjZXQ6IGZpbHRlckZhY2V0QW5ub3RhdGlvbiB9XSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVudGl0eVR5cGUuZW50aXR5UHJvcGVydGllcy5mb3JFYWNoKGVudGl0eVByb3BlcnR5ID0+IHtcblx0XHRcdFx0XHRcdGlmICghb01ldGFNb2RlbERhdGEuJEFubm90YXRpb25zW2VudGl0eVByb3BlcnR5LmZ1bGx5UXVhbGlmaWVkTmFtZV0pIHtcblx0XHRcdFx0XHRcdFx0b01ldGFNb2RlbERhdGEuJEFubm90YXRpb25zW2VudGl0eVByb3BlcnR5LmZ1bGx5UXVhbGlmaWVkTmFtZV0gPSB7fTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0IW9NZXRhTW9kZWxEYXRhLiRBbm5vdGF0aW9uc1tlbnRpdHlQcm9wZXJ0eS5mdWxseVF1YWxpZmllZE5hbWVdW1wiQGNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkRhdGFGaWVsZERlZmF1bHRcIl1cblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRvTWV0YU1vZGVsRGF0YS4kQW5ub3RhdGlvbnNbZW50aXR5UHJvcGVydHkuZnVsbHlRdWFsaWZpZWROYW1lXVtcblx0XHRcdFx0XHRcdFx0XHRcIkBjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhRmllbGREZWZhdWx0XCJcblx0XHRcdFx0XHRcdFx0XSA9IHtcblx0XHRcdFx0XHRcdFx0XHQkVHlwZTogXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhRmllbGRcIixcblx0XHRcdFx0XHRcdFx0XHRWYWx1ZTogeyAkUGF0aDogZW50aXR5UHJvcGVydHkubmFtZSB9XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0ZW50aXR5VHlwZXMucHVzaChlbnRpdHlUeXBlKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIkNvbXBsZXhUeXBlXCI6XG5cdFx0XHRcdFx0Y29uc3QgY29tcGxleFR5cGUgPSBwcmVwYXJlQ29tcGxleFR5cGUob01ldGFNb2RlbERhdGFbc09iamVjdE5hbWVdLCBzT2JqZWN0TmFtZSwgbmFtZXNwYWNlKTtcblx0XHRcdFx0XHRjb21wbGV4VHlwZXMucHVzaChjb21wbGV4VHlwZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHRjb25zdCBvRW50aXR5Q29udGFpbmVyID0gb01ldGFNb2RlbERhdGFbZW50aXR5Q29udGFpbmVyTmFtZV07XG5cdE9iamVjdC5rZXlzKG9FbnRpdHlDb250YWluZXIpLmZvckVhY2goc09iamVjdE5hbWUgPT4ge1xuXHRcdGlmIChzT2JqZWN0TmFtZSAhPT0gXCIka2luZFwiKSB7XG5cdFx0XHRzd2l0Y2ggKG9FbnRpdHlDb250YWluZXJbc09iamVjdE5hbWVdLiRraW5kKSB7XG5cdFx0XHRcdGNhc2UgXCJFbnRpdHlTZXRcIjpcblx0XHRcdFx0XHRjb25zdCBlbnRpdHlTZXQgPSBwcmVwYXJlRW50aXR5U2V0KG9FbnRpdHlDb250YWluZXJbc09iamVjdE5hbWVdLCBzT2JqZWN0TmFtZSwgZW50aXR5Q29udGFpbmVyTmFtZSk7XG5cdFx0XHRcdFx0ZW50aXR5U2V0cy5wdXNoKGVudGl0eVNldCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJTaW5nbGV0b25cIjpcblx0XHRcdFx0XHRjb25zdCBzaW5nbGV0b24gPSBwcmVwYXJlU2luZ2xldG9uKG9FbnRpdHlDb250YWluZXJbc09iamVjdE5hbWVdLCBzT2JqZWN0TmFtZSwgZW50aXR5Q29udGFpbmVyTmFtZSk7XG5cdFx0XHRcdFx0c2luZ2xldG9ucy5wdXNoKHNpbmdsZXRvbik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHRsZXQgZW50aXR5Q29udGFpbmVyOiBFbnRpdHlDb250YWluZXIgPSB7fTtcblx0aWYgKGVudGl0eUNvbnRhaW5lck5hbWUpIHtcblx0XHRlbnRpdHlDb250YWluZXIgPSB7XG5cdFx0XHRuYW1lOiBlbnRpdHlDb250YWluZXJOYW1lLnJlcGxhY2UobmFtZXNwYWNlICsgXCIuXCIsIFwiXCIpLFxuXHRcdFx0ZnVsbHlRdWFsaWZpZWROYW1lOiBlbnRpdHlDb250YWluZXJOYW1lXG5cdFx0fTtcblx0fVxuXHRlbnRpdHlTZXRzLmZvckVhY2goZW50aXR5U2V0ID0+IHtcblx0XHRjb25zdCBuYXZQcm9wZXJ0eUJpbmRpbmdzID0gb0VudGl0eUNvbnRhaW5lcltlbnRpdHlTZXQubmFtZV0uJE5hdmlnYXRpb25Qcm9wZXJ0eUJpbmRpbmc7XG5cdFx0aWYgKG5hdlByb3BlcnR5QmluZGluZ3MpIHtcblx0XHRcdE9iamVjdC5rZXlzKG5hdlByb3BlcnR5QmluZGluZ3MpLmZvckVhY2gobmF2UHJvcE5hbWUgPT4ge1xuXHRcdFx0XHRjb25zdCB0YXJnZXRFbnRpdHlTZXQgPSBlbnRpdHlTZXRzLmZpbmQoZW50aXR5U2V0TmFtZSA9PiBlbnRpdHlTZXROYW1lLm5hbWUgPT09IG5hdlByb3BlcnR5QmluZGluZ3NbbmF2UHJvcE5hbWVdKTtcblx0XHRcdFx0aWYgKHRhcmdldEVudGl0eVNldCkge1xuXHRcdFx0XHRcdGVudGl0eVNldC5uYXZpZ2F0aW9uUHJvcGVydHlCaW5kaW5nW25hdlByb3BOYW1lXSA9IHRhcmdldEVudGl0eVNldDtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcblxuXHRjb25zdCBhY3Rpb25zOiBBY3Rpb25bXSA9IE9iamVjdC5rZXlzKG9NZXRhTW9kZWxEYXRhKVxuXHRcdC5maWx0ZXIoa2V5ID0+IHtcblx0XHRcdHJldHVybiBBcnJheS5pc0FycmF5KG9NZXRhTW9kZWxEYXRhW2tleV0pICYmIG9NZXRhTW9kZWxEYXRhW2tleV0ubGVuZ3RoID4gMCAmJiBvTWV0YU1vZGVsRGF0YVtrZXldWzBdLiRraW5kID09PSBcIkFjdGlvblwiO1xuXHRcdH0pXG5cdFx0LnJlZHVjZSgob3V0QWN0aW9uczogQWN0aW9uW10sIGFjdGlvbk5hbWUpID0+IHtcblx0XHRcdGNvbnN0IGFjdGlvbnMgPSBvTWV0YU1vZGVsRGF0YVthY3Rpb25OYW1lXTtcblx0XHRcdGFjdGlvbnMuZm9yRWFjaCgoYWN0aW9uOiBNZXRhTW9kZWxBY3Rpb24pID0+IHtcblx0XHRcdFx0b3V0QWN0aW9ucy5wdXNoKHByZXBhcmVBY3Rpb24oYWN0aW9uTmFtZSwgYWN0aW9uLCBuYW1lc3BhY2UsIGVudGl0eUNvbnRhaW5lck5hbWUpKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG91dEFjdGlvbnM7XG5cdFx0fSwgW10pO1xuXG5cdGZvciAoY29uc3QgdGFyZ2V0IGluIG9NZXRhTW9kZWxEYXRhLiRBbm5vdGF0aW9ucykge1xuXHRcdGNyZWF0ZUFubm90YXRpb25MaXN0cyhvTWV0YU1vZGVsRGF0YS4kQW5ub3RhdGlvbnNbdGFyZ2V0XSwgdGFyZ2V0LCBhbm5vdGF0aW9uTGlzdHMsIG9DYXBhYmlsaXRpZXMpO1xuXHR9XG5cblx0Ly8gU29ydCBieSB0YXJnZXQgbGVuZ3RoXG5cdGNvbnN0IG91dEFubm90YXRpb25MaXN0cyA9IE9iamVjdC5rZXlzKGFubm90YXRpb25MaXN0cylcblx0XHQuc29ydCgoYSwgYikgPT4gKGEubGVuZ3RoID49IGIubGVuZ3RoID8gMSA6IC0xKSlcblx0XHQubWFwKHNBbm5vdGF0aW9uTmFtZSA9PiBhbm5vdGF0aW9uTGlzdHNbc0Fubm90YXRpb25OYW1lXSk7XG5cdGNvbnN0IHJlZmVyZW5jZXM6IFJlZmVyZW5jZVtdID0gW107XG5cdHJldHVybiB7XG5cdFx0aWRlbnRpZmljYXRpb246IFwibWV0YW1vZGVsUmVzdWx0XCIsXG5cdFx0dmVyc2lvbjogXCI0LjBcIixcblx0XHRzY2hlbWE6IHtcblx0XHRcdGVudGl0eUNvbnRhaW5lcixcblx0XHRcdGVudGl0eVNldHMsXG5cdFx0XHRlbnRpdHlUeXBlcyxcblx0XHRcdGNvbXBsZXhUeXBlcyxcblx0XHRcdHNpbmdsZXRvbnMsXG5cdFx0XHRhc3NvY2lhdGlvbnM6IFtdLFxuXHRcdFx0YXNzb2NpYXRpb25TZXRzOiBbXSxcblx0XHRcdGFjdGlvbnMsXG5cdFx0XHRuYW1lc3BhY2UsXG5cdFx0XHRhbm5vdGF0aW9uczoge1xuXHRcdFx0XHRcIm1ldGFtb2RlbFJlc3VsdFwiOiBvdXRBbm5vdGF0aW9uTGlzdHNcblx0XHRcdH1cblx0XHR9LFxuXHRcdHJlZmVyZW5jZXM6IHJlZmVyZW5jZXNcblx0fTtcbn1cblxuY29uc3QgbU1ldGFNb2RlbE1hcDogUmVjb3JkPHN0cmluZywgUGFyc2VyT3V0cHV0PiA9IHt9O1xuXG4vKipcbiAqIENvbnZlcnQgdGhlIE9EYXRhTWV0YU1vZGVsIGludG8gYW5vdGhlciBmb3JtYXQgdGhhdCBhbGxvdyBmb3IgZWFzeSBtYW5pcHVsYXRpb24gb2YgdGhlIGFubm90YXRpb25zLlxuICpcbiAqIEBwYXJhbSB7T0RhdGFNZXRhTW9kZWx9IG9NZXRhTW9kZWwgVGhlIGN1cnJlbnQgb0RhdGFNZXRhTW9kZWxcbiAqIEBwYXJhbSBvQ2FwYWJpbGl0aWVzIFRoZSBjdXJyZW50IGNhcGFiaWxpdGllc1xuICogQHJldHVybnMge0NvbnZlcnRlck91dHB1dH0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgb2JqZWN0IGxpa2UgYW5ub3RhdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFR5cGVzKG9NZXRhTW9kZWw6IE9EYXRhTWV0YU1vZGVsLCBvQ2FwYWJpbGl0aWVzPzogRW52aXJvbm1lbnRDYXBhYmlsaXRpZXMpOiBDb252ZXJ0ZXJPdXRwdXQge1xuXHRjb25zdCBzTWV0YU1vZGVsSWQgPSAob01ldGFNb2RlbCBhcyBhbnkpLmlkO1xuXHRpZiAoIW1NZXRhTW9kZWxNYXAuaGFzT3duUHJvcGVydHkoc01ldGFNb2RlbElkKSkge1xuXHRcdGNvbnN0IHBhcnNlZE91dHB1dCA9IHByZXBhcmVFbnRpdHlUeXBlcyhvTWV0YU1vZGVsLCBvQ2FwYWJpbGl0aWVzKTtcblx0XHRtTWV0YU1vZGVsTWFwW3NNZXRhTW9kZWxJZF0gPSBBbm5vdGF0aW9uQ29udmVydGVyLmNvbnZlcnRUeXBlcyhwYXJzZWRPdXRwdXQpO1xuXHR9XG5cdHJldHVybiAobU1ldGFNb2RlbE1hcFtzTWV0YU1vZGVsSWRdIGFzIGFueSkgYXMgQ29udmVydGVyT3V0cHV0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlTW9kZWxDYWNoZURhdGEob01ldGFNb2RlbDogT0RhdGFNZXRhTW9kZWwpIHtcblx0ZGVsZXRlIG1NZXRhTW9kZWxNYXBbKG9NZXRhTW9kZWwgYXMgYW55KS5pZF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0TWV0YU1vZGVsQ29udGV4dChvTWV0YU1vZGVsQ29udGV4dDogQ29udGV4dDxPRGF0YU1ldGFNb2RlbD4sIGJJbmNsdWRlVmlzaXRlZE9iamVjdHM6IGJvb2xlYW4gPSBmYWxzZSk6IGFueSB7XG5cdGNvbnN0IG9Db252ZXJ0ZXJPdXRwdXQgPSBjb252ZXJ0VHlwZXMob01ldGFNb2RlbENvbnRleHQuZ2V0TW9kZWwoKSk7XG5cdGNvbnN0IHNQYXRoID0gb01ldGFNb2RlbENvbnRleHQuZ2V0UGF0aCgpO1xuXG5cdGNvbnN0IGFQYXRoU3BsaXQgPSBzUGF0aC5zcGxpdChcIi9cIik7XG5cdGxldCB0YXJnZXRFbnRpdHlTZXQ6IF9FbnRpdHlTZXQgfCBfU2luZ2xldG9uID0gb0NvbnZlcnRlck91dHB1dC5lbnRpdHlTZXRzLmZpbmQoXG5cdFx0ZW50aXR5U2V0ID0+IGVudGl0eVNldC5uYW1lID09PSBhUGF0aFNwbGl0WzFdXG5cdCkgYXMgX0VudGl0eVNldDtcblx0aWYgKCF0YXJnZXRFbnRpdHlTZXQpIHtcblx0XHR0YXJnZXRFbnRpdHlTZXQgPSBvQ29udmVydGVyT3V0cHV0LnNpbmdsZXRvbnMuZmluZChzaW5nbGV0b24gPT4gc2luZ2xldG9uLm5hbWUgPT09IGFQYXRoU3BsaXRbMV0pIGFzIF9TaW5nbGV0b247XG5cdH1cblx0bGV0IHJlbGF0aXZlUGF0aCA9IGFQYXRoU3BsaXQuc2xpY2UoMikuam9pbihcIi9cIik7XG5cblx0Y29uc3QgbG9jYWxPYmplY3RzOiBhbnlbXSA9IFt0YXJnZXRFbnRpdHlTZXRdO1xuXHR3aGlsZSAocmVsYXRpdmVQYXRoICYmIHJlbGF0aXZlUGF0aC5sZW5ndGggPiAwICYmIHJlbGF0aXZlUGF0aC5zdGFydHNXaXRoKFwiJE5hdmlnYXRpb25Qcm9wZXJ0eUJpbmRpbmdcIikpIHtcblx0XHRsZXQgcmVsYXRpdmVTcGxpdCA9IHJlbGF0aXZlUGF0aC5zcGxpdChcIi9cIik7XG5cdFx0bGV0IGlkeCA9IDA7XG5cdFx0bGV0IGN1cnJlbnRFbnRpdHlTZXQsIHNOYXZQcm9wVG9DaGVjaztcblxuXHRcdHJlbGF0aXZlU3BsaXQgPSByZWxhdGl2ZVNwbGl0LnNsaWNlKDEpOyAvLyBSZW1vdmluZyBcIiROYXZpZ2F0aW9uUHJvcGVydHlCaW5kaW5nXCJcblx0XHR3aGlsZSAoIWN1cnJlbnRFbnRpdHlTZXQgJiYgcmVsYXRpdmVTcGxpdC5sZW5ndGggPiBpZHggJiYgcmVsYXRpdmVTcGxpdFtpZHhdICE9PSBcIiROYXZpZ2F0aW9uUHJvcGVydHlCaW5kaW5nXCIpIHtcblx0XHRcdC8vIEZpbmRpbmcgdGhlIGNvcnJlY3QgZW50aXR5U2V0IGZvciB0aGUgbmF2aWdhaXRvbiBwcm9wZXJ0eSBiaW5kaW5nIGV4YW1wbGU6IFwiU2V0L19TYWxlc09yZGVyXCJcblx0XHRcdHNOYXZQcm9wVG9DaGVjayA9IHJlbGF0aXZlU3BsaXQuc2xpY2UoMCwgaWR4ICsgMSkuam9pbihcIi9cIik7XG5cdFx0XHRjdXJyZW50RW50aXR5U2V0ID0gdGFyZ2V0RW50aXR5U2V0ICYmIHRhcmdldEVudGl0eVNldC5uYXZpZ2F0aW9uUHJvcGVydHlCaW5kaW5nW3NOYXZQcm9wVG9DaGVja107XG5cdFx0XHRpZHgrKztcblx0XHR9XG5cdFx0aWYgKCFjdXJyZW50RW50aXR5U2V0KSB7XG5cdFx0XHQvLyBGYWxsIGJhY2sgdG8gU2luZ2xlIG5hdiBwcm9wIGlmIGVudGl0eVNldCBpcyBub3QgZm91bmQuXG5cdFx0XHRzTmF2UHJvcFRvQ2hlY2sgPSByZWxhdGl2ZVNwbGl0WzBdO1xuXHRcdH1cblx0XHRjb25zdCBhTmF2UHJvcHMgPSBzTmF2UHJvcFRvQ2hlY2s/LnNwbGl0KFwiL1wiKSB8fCBbXTtcblx0XHRsZXQgdGFyZ2V0RW50aXR5VHlwZSA9IHRhcmdldEVudGl0eVNldCAmJiB0YXJnZXRFbnRpdHlTZXQuZW50aXR5VHlwZTtcblx0XHRmb3IgKGNvbnN0IHNOYXZQcm9wIG9mIGFOYXZQcm9wcykge1xuXHRcdFx0Ly8gUHVzaGluZyBhbGwgbmF2IHByb3BzIHRvIHRoZSB2aXNpdGVkIG9iamVjdHMuIGV4YW1wbGU6IFwiU2V0XCIsIFwiX1NhbGVzT3JkZXJcIiBmb3IgXCJTZXQvX1NhbGVzT3JkZXJcIihpbiBOYXZpZ2F0aW9uUHJvcGVydHlCaW5kaW5nKVxuXHRcdFx0Y29uc3QgdGFyZ2V0TmF2UHJvcCA9IHRhcmdldEVudGl0eVR5cGUgJiYgdGFyZ2V0RW50aXR5VHlwZS5uYXZpZ2F0aW9uUHJvcGVydGllcy5maW5kKG5hdlByb3AgPT4gbmF2UHJvcC5uYW1lID09PSBzTmF2UHJvcCk7XG5cdFx0XHRpZiAodGFyZ2V0TmF2UHJvcCkge1xuXHRcdFx0XHRsb2NhbE9iamVjdHMucHVzaCh0YXJnZXROYXZQcm9wKTtcblx0XHRcdFx0dGFyZ2V0RW50aXR5VHlwZSA9IHRhcmdldE5hdlByb3AudGFyZ2V0VHlwZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0YXJnZXRFbnRpdHlTZXQgPVxuXHRcdFx0KHRhcmdldEVudGl0eVNldCAmJiBjdXJyZW50RW50aXR5U2V0KSB8fCAodGFyZ2V0RW50aXR5U2V0ICYmIHRhcmdldEVudGl0eVNldC5uYXZpZ2F0aW9uUHJvcGVydHlCaW5kaW5nW3JlbGF0aXZlU3BsaXRbMF1dKTtcblx0XHRpZiAodGFyZ2V0RW50aXR5U2V0KSB7XG5cdFx0XHQvLyBQdXNoaW5nIHRoZSB0YXJnZXQgZW50aXR5U2V0IHRvIHZpc2l0ZWQgb2JqZWN0c1xuXHRcdFx0bG9jYWxPYmplY3RzLnB1c2godGFyZ2V0RW50aXR5U2V0KTtcblx0XHR9XG5cdFx0Ly8gUmUtY2FsY3VsYXRpbmcgdGhlIHJlbGF0aXZlIHBhdGhcblx0XHRyZWxhdGl2ZVBhdGggPSByZWxhdGl2ZVNwbGl0LnNsaWNlKGFOYXZQcm9wcy5sZW5ndGggfHwgMSkuam9pbihcIi9cIik7XG5cdH1cblx0aWYgKHJlbGF0aXZlUGF0aC5zdGFydHNXaXRoKFwiJFR5cGVcIikpIHtcblx0XHQvLyBXZSdyZSBhbnl3YXkgZ29pbmcgdG8gbG9vayBvbiB0aGUgZW50aXR5VHlwZS4uLlxuXHRcdHJlbGF0aXZlUGF0aCA9IGFQYXRoU3BsaXQuc2xpY2UoMykuam9pbihcIi9cIik7XG5cdH1cblx0aWYgKHRhcmdldEVudGl0eVNldCAmJiByZWxhdGl2ZVBhdGgubGVuZ3RoKSB7XG5cdFx0Y29uc3Qgb1RhcmdldCA9IHRhcmdldEVudGl0eVNldC5lbnRpdHlUeXBlLnJlc29sdmVQYXRoKHJlbGF0aXZlUGF0aCwgYkluY2x1ZGVWaXNpdGVkT2JqZWN0cyk7XG5cdFx0aWYgKG9UYXJnZXQpIHtcblx0XHRcdGlmIChiSW5jbHVkZVZpc2l0ZWRPYmplY3RzKSB7XG5cdFx0XHRcdG9UYXJnZXQudmlzaXRlZE9iamVjdHMgPSBsb2NhbE9iamVjdHMuY29uY2F0KG9UYXJnZXQudmlzaXRlZE9iamVjdHMpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAodGFyZ2V0RW50aXR5U2V0LmVudGl0eVR5cGUgJiYgdGFyZ2V0RW50aXR5U2V0LmVudGl0eVR5cGUuYWN0aW9ucykge1xuXHRcdFx0Ly8gaWYgdGFyZ2V0IGlzIGFuIGFjdGlvbiBvciBhbiBhY3Rpb24gcGFyYW1ldGVyXG5cdFx0XHRjb25zdCBhY3Rpb25zID0gdGFyZ2V0RW50aXR5U2V0LmVudGl0eVR5cGUgJiYgdGFyZ2V0RW50aXR5U2V0LmVudGl0eVR5cGUuYWN0aW9ucztcblx0XHRcdGNvbnN0IHJlbGF0aXZlU3BsaXQgPSByZWxhdGl2ZVBhdGguc3BsaXQoXCIvXCIpO1xuXHRcdFx0aWYgKGFjdGlvbnNbcmVsYXRpdmVTcGxpdFswXV0pIHtcblx0XHRcdFx0Y29uc3QgYWN0aW9uID0gYWN0aW9uc1tyZWxhdGl2ZVNwbGl0WzBdXTtcblx0XHRcdFx0aWYgKHJlbGF0aXZlU3BsaXRbMV0gJiYgYWN0aW9uLnBhcmFtZXRlcnMpIHtcblx0XHRcdFx0XHRjb25zdCBwYXJhbWV0ZXJOYW1lID0gcmVsYXRpdmVTcGxpdFsxXTtcblx0XHRcdFx0XHRjb25zdCB0YXJnZXRQYXJhbWV0ZXIgPSBhY3Rpb24ucGFyYW1ldGVycy5maW5kKHBhcmFtZXRlciA9PiB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcGFyYW1ldGVyLmZ1bGx5UXVhbGlmaWVkTmFtZS5lbmRzV2l0aChcIi9cIiArIHBhcmFtZXRlck5hbWUpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJldHVybiB0YXJnZXRQYXJhbWV0ZXI7XG5cdFx0XHRcdH0gZWxzZSBpZiAocmVsYXRpdmVQYXRoLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHJldHVybiBhY3Rpb247XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG9UYXJnZXQ7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKGJJbmNsdWRlVmlzaXRlZE9iamVjdHMpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHRhcmdldDogdGFyZ2V0RW50aXR5U2V0LFxuXHRcdFx0XHR2aXNpdGVkT2JqZWN0czogbG9jYWxPYmplY3RzXG5cdFx0XHR9O1xuXHRcdH1cblx0XHRyZXR1cm4gdGFyZ2V0RW50aXR5U2V0O1xuXHR9XG59XG5cbnR5cGUgQ29udmVydGVyT2JqZWN0ID0ge1xuXHRfdHlwZTogc3RyaW5nO1xuXHRuYW1lOiBzdHJpbmc7XG59O1xuZXhwb3J0IHR5cGUgUmVzb2x2ZWRUYXJnZXQgPSB7XG5cdHRhcmdldD86IENvbnZlcnRlck9iamVjdDtcblx0dmlzaXRlZE9iamVjdHM6IENvbnZlcnRlck9iamVjdFtdO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEludm9sdmVkRGF0YU1vZGVsT2JqZWN0cyhcblx0b01ldGFNb2RlbENvbnRleHQ6IENvbnRleHQ8T0RhdGFNZXRhTW9kZWw+LFxuXHRvRW50aXR5U2V0TWV0YU1vZGVsQ29udGV4dD86IENvbnRleHQ8T0RhdGFNZXRhTW9kZWw+XG4pOiBEYXRhTW9kZWxPYmplY3RQYXRoIHtcblx0Y29uc3QgbWV0YU1vZGVsQ29udGV4dCA9IGNvbnZlcnRNZXRhTW9kZWxDb250ZXh0KG9NZXRhTW9kZWxDb250ZXh0LCB0cnVlKTtcblx0bGV0IHRhcmdldEVudGl0eVNldExvY2F0aW9uO1xuXHRpZiAob0VudGl0eVNldE1ldGFNb2RlbENvbnRleHQgJiYgb0VudGl0eVNldE1ldGFNb2RlbENvbnRleHQuZ2V0UGF0aCgpICE9PSBcIi9cIikge1xuXHRcdHRhcmdldEVudGl0eVNldExvY2F0aW9uID0gZ2V0SW52b2x2ZWREYXRhTW9kZWxPYmplY3RzKG9FbnRpdHlTZXRNZXRhTW9kZWxDb250ZXh0KTtcblx0fVxuXHRyZXR1cm4gZ2V0SW52b2x2ZWREYXRhTW9kZWxPYmplY3RGcm9tUGF0aChtZXRhTW9kZWxDb250ZXh0LCB0YXJnZXRFbnRpdHlTZXRMb2NhdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbnZvbHZlZERhdGFNb2RlbE9iamVjdEZyb21QYXRoKFxuXHRtZXRhTW9kZWxDb250ZXh0OiBSZXNvbHZlZFRhcmdldCxcblx0dGFyZ2V0RW50aXR5U2V0TG9jYXRpb24/OiBEYXRhTW9kZWxPYmplY3RQYXRoXG4pOiBEYXRhTW9kZWxPYmplY3RQYXRoIHtcblx0Y29uc3QgZGF0YU1vZGVsT2JqZWN0cyA9IG1ldGFNb2RlbENvbnRleHQudmlzaXRlZE9iamVjdHMuZmlsdGVyKFxuXHRcdCh2aXNpdGVkT2JqZWN0OiBhbnkpID0+IHZpc2l0ZWRPYmplY3QgJiYgdmlzaXRlZE9iamVjdC5oYXNPd25Qcm9wZXJ0eShcIl90eXBlXCIpICYmIHZpc2l0ZWRPYmplY3QuX3R5cGUgIT09IFwiRW50aXR5VHlwZVwiXG5cdCk7XG5cdGlmIChtZXRhTW9kZWxDb250ZXh0LnRhcmdldCAmJiBtZXRhTW9kZWxDb250ZXh0LnRhcmdldC5oYXNPd25Qcm9wZXJ0eShcIl90eXBlXCIpICYmIG1ldGFNb2RlbENvbnRleHQudGFyZ2V0Ll90eXBlICE9PSBcIkVudGl0eVR5cGVcIikge1xuXHRcdGRhdGFNb2RlbE9iamVjdHMucHVzaChtZXRhTW9kZWxDb250ZXh0LnRhcmdldCk7XG5cdH1cblx0Y29uc3QgbmF2aWdhdGlvblByb3BlcnRpZXM6IF9OYXZpZ2F0aW9uUHJvcGVydHlbXSA9IFtdO1xuXHRjb25zdCByb290RW50aXR5U2V0OiBfRW50aXR5U2V0ID0gZGF0YU1vZGVsT2JqZWN0c1swXSBhcyBfRW50aXR5U2V0O1xuXHQvLyBjdXJyZW50RW50aXR5U2V0IGNhbiBiZSB1bmRlZmluZWQuXG5cdGxldCBjdXJyZW50RW50aXR5U2V0OiBfRW50aXR5U2V0IHwgdW5kZWZpbmVkID0gcm9vdEVudGl0eVNldCBhcyBfRW50aXR5U2V0O1xuXHRsZXQgY3VycmVudEVudGl0eVR5cGU6IF9FbnRpdHlUeXBlID0gcm9vdEVudGl0eVNldC5lbnRpdHlUeXBlO1xuXHRsZXQgaSA9IDE7XG5cdGxldCBjdXJyZW50T2JqZWN0O1xuXHRsZXQgbmF2aWdhdGVkUGF0aHMgPSBbXTtcblx0d2hpbGUgKGkgPCBkYXRhTW9kZWxPYmplY3RzLmxlbmd0aCkge1xuXHRcdGN1cnJlbnRPYmplY3QgPSBkYXRhTW9kZWxPYmplY3RzW2krK107XG5cdFx0aWYgKGN1cnJlbnRPYmplY3QuX3R5cGUgPT09IFwiTmF2aWdhdGlvblByb3BlcnR5XCIpIHtcblx0XHRcdG5hdmlnYXRlZFBhdGhzLnB1c2goY3VycmVudE9iamVjdC5uYW1lKTtcblx0XHRcdG5hdmlnYXRpb25Qcm9wZXJ0aWVzLnB1c2goY3VycmVudE9iamVjdCBhcyBfTmF2aWdhdGlvblByb3BlcnR5KTtcblx0XHRcdGN1cnJlbnRFbnRpdHlUeXBlID0gKGN1cnJlbnRPYmplY3QgYXMgX05hdmlnYXRpb25Qcm9wZXJ0eSkudGFyZ2V0VHlwZTtcblx0XHRcdGlmIChjdXJyZW50RW50aXR5U2V0ICYmIGN1cnJlbnRFbnRpdHlTZXQubmF2aWdhdGlvblByb3BlcnR5QmluZGluZy5oYXNPd25Qcm9wZXJ0eShuYXZpZ2F0ZWRQYXRocy5qb2luKFwiL1wiKSkpIHtcblx0XHRcdFx0Y3VycmVudEVudGl0eVNldCA9IGN1cnJlbnRFbnRpdHlTZXQubmF2aWdhdGlvblByb3BlcnR5QmluZGluZ1tjdXJyZW50T2JqZWN0Lm5hbWVdO1xuXHRcdFx0XHRuYXZpZ2F0ZWRQYXRocyA9IFtdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y3VycmVudEVudGl0eVNldCA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKGN1cnJlbnRPYmplY3QuX3R5cGUgPT09IFwiRW50aXR5U2V0XCIpIHtcblx0XHRcdGN1cnJlbnRFbnRpdHlTZXQgPSBjdXJyZW50T2JqZWN0IGFzIF9FbnRpdHlTZXQ7XG5cdFx0XHRjdXJyZW50RW50aXR5VHlwZSA9IGN1cnJlbnRFbnRpdHlTZXQuZW50aXR5VHlwZTtcblx0XHR9XG5cdH1cblxuXHRpZiAodGFyZ2V0RW50aXR5U2V0TG9jYXRpb24gJiYgdGFyZ2V0RW50aXR5U2V0TG9jYXRpb24uc3RhcnRpbmdFbnRpdHlTZXQgIT09IHJvb3RFbnRpdHlTZXQpIHtcblx0XHQvLyBJbiBjYXNlIHRoZSBlbnRpdHlzZXQgaXMgbm90IHN0YXJ0aW5nIGZyb20gdGhlIHNhbWUgbG9jYXRpb24gaXQgbWF5IG1lYW4gdGhhdCB3ZSBhcmUgZG9pbmcgdG9vIG11Y2ggd29yayBlYXJsaWVyIGZvciBzb21lIHJlYXNvblxuXHRcdC8vIEFzIHN1Y2ggd2UgbmVlZCB0byByZWRlZmluZSB0aGUgY29udGV4dCBzb3VyY2UgZm9yIHRoZSB0YXJnZXRFbnRpdHlTZXRMb2NhdGlvblxuXHRcdGNvbnN0IHN0YXJ0aW5nSW5kZXggPSBkYXRhTW9kZWxPYmplY3RzLmluZGV4T2YodGFyZ2V0RW50aXR5U2V0TG9jYXRpb24uc3RhcnRpbmdFbnRpdHlTZXQpO1xuXHRcdGlmIChzdGFydGluZ0luZGV4ICE9PSAtMSkge1xuXHRcdFx0Ly8gSWYgaXQncyBub3QgZm91bmQgSSBkb24ndCBrbm93IHdoYXQgd2UgY2FuIGRvIChwcm9iYWJseSBub3RoaW5nKVxuXHRcdFx0Y29uc3QgcmVxdWlyZWREYXRhTW9kZWxPYmplY3RzID0gZGF0YU1vZGVsT2JqZWN0cy5zbGljZSgwLCBzdGFydGluZ0luZGV4KTtcblx0XHRcdHRhcmdldEVudGl0eVNldExvY2F0aW9uLnN0YXJ0aW5nRW50aXR5U2V0ID0gcm9vdEVudGl0eVNldDtcblx0XHRcdHRhcmdldEVudGl0eVNldExvY2F0aW9uLm5hdmlnYXRpb25Qcm9wZXJ0aWVzID0gcmVxdWlyZWREYXRhTW9kZWxPYmplY3RzXG5cdFx0XHRcdC5maWx0ZXIoKG9iamVjdDogYW55KSA9PiBvYmplY3QuX3R5cGUgPT09IFwiTmF2aWdhdGlvblByb3BlcnR5XCIpXG5cdFx0XHRcdC5jb25jYXQodGFyZ2V0RW50aXR5U2V0TG9jYXRpb24ubmF2aWdhdGlvblByb3BlcnRpZXMpIGFzIF9OYXZpZ2F0aW9uUHJvcGVydHlbXTtcblx0XHR9XG5cdH1cblx0Y29uc3Qgb3V0RGF0YU1vZGVsUGF0aCA9IHtcblx0XHRzdGFydGluZ0VudGl0eVNldDogcm9vdEVudGl0eVNldCxcblx0XHR0YXJnZXRFbnRpdHlTZXQ6IGN1cnJlbnRFbnRpdHlTZXQsXG5cdFx0dGFyZ2V0RW50aXR5VHlwZTogY3VycmVudEVudGl0eVR5cGUsXG5cdFx0dGFyZ2V0T2JqZWN0OiBtZXRhTW9kZWxDb250ZXh0LnRhcmdldCxcblx0XHRuYXZpZ2F0aW9uUHJvcGVydGllcyxcblx0XHRjb250ZXh0TG9jYXRpb246IHRhcmdldEVudGl0eVNldExvY2F0aW9uXG5cdH07XG5cdGlmICghb3V0RGF0YU1vZGVsUGF0aC5jb250ZXh0TG9jYXRpb24pIHtcblx0XHRvdXREYXRhTW9kZWxQYXRoLmNvbnRleHRMb2NhdGlvbiA9IG91dERhdGFNb2RlbFBhdGg7XG5cdH1cblx0cmV0dXJuIG91dERhdGFNb2RlbFBhdGg7XG59XG4iXX0=