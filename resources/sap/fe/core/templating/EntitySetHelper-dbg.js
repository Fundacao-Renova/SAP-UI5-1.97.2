/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define([], function () {
  "use strict";

  var _exports = {};

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  var isEntitySet = function (dataObject) {
    return dataObject && dataObject.hasOwnProperty("_type") && dataObject._type === "EntitySet";
  };

  _exports.isEntitySet = isEntitySet;

  var getFilterExpressionRestrictions = function (entitySet) {
    var _entitySet$annotation, _entitySet$annotation2, _entitySet$annotation3;

    return ((_entitySet$annotation = entitySet.annotations) === null || _entitySet$annotation === void 0 ? void 0 : (_entitySet$annotation2 = _entitySet$annotation.Capabilities) === null || _entitySet$annotation2 === void 0 ? void 0 : (_entitySet$annotation3 = _entitySet$annotation2.FilterRestrictions) === null || _entitySet$annotation3 === void 0 ? void 0 : _entitySet$annotation3.FilterExpressionRestrictions) || [];
  };
  /**
   * Reads all SortRestrictions of the main entity and the (first level) navigation restrictions.
   * This does not work for more than one level of navigation.
   *
   * @param {EntitySet} entitySet Entity set to be analyzed
   * @returns {string[]} Array containing the property names of all non-sortable properties
   */


  _exports.getFilterExpressionRestrictions = getFilterExpressionRestrictions;

  var getNonSortablePropertiesRestrictions = function (entitySet) {
    var _entitySet$annotation4, _entitySet$annotation5, _entitySet$annotation6, _entitySet$annotation11, _entitySet$annotation12, _entitySet$annotation13, _entitySet$annotation14;

    var nonSortableProperties = []; // Check annotations for main entity

    if ((entitySet === null || entitySet === void 0 ? void 0 : (_entitySet$annotation4 = entitySet.annotations) === null || _entitySet$annotation4 === void 0 ? void 0 : (_entitySet$annotation5 = _entitySet$annotation4.Capabilities) === null || _entitySet$annotation5 === void 0 ? void 0 : (_entitySet$annotation6 = _entitySet$annotation5.SortRestrictions) === null || _entitySet$annotation6 === void 0 ? void 0 : _entitySet$annotation6.Sortable) === false) {
      var _nonSortablePropertie;

      // add all properties of the entity to the nonSortableProperties
      (_nonSortablePropertie = nonSortableProperties).push.apply(_nonSortablePropertie, _toConsumableArray(entitySet.entityType.entityProperties.map(function (property) {
        return property.name;
      })));
    } else {
      var _entitySet$annotation7, _entitySet$annotation8, _entitySet$annotation9, _entitySet$annotation10;

      nonSortableProperties = (entitySet === null || entitySet === void 0 ? void 0 : (_entitySet$annotation7 = entitySet.annotations) === null || _entitySet$annotation7 === void 0 ? void 0 : (_entitySet$annotation8 = _entitySet$annotation7.Capabilities) === null || _entitySet$annotation8 === void 0 ? void 0 : (_entitySet$annotation9 = _entitySet$annotation8.SortRestrictions) === null || _entitySet$annotation9 === void 0 ? void 0 : (_entitySet$annotation10 = _entitySet$annotation9.NonSortableProperties) === null || _entitySet$annotation10 === void 0 ? void 0 : _entitySet$annotation10.map(function (property) {
        return property.value;
      })) || [];
    } // Check for every navigationRestriction if it has sortRestrictions


    entitySet === null || entitySet === void 0 ? void 0 : (_entitySet$annotation11 = entitySet.annotations) === null || _entitySet$annotation11 === void 0 ? void 0 : (_entitySet$annotation12 = _entitySet$annotation11.Capabilities) === null || _entitySet$annotation12 === void 0 ? void 0 : (_entitySet$annotation13 = _entitySet$annotation12.NavigationRestrictions) === null || _entitySet$annotation13 === void 0 ? void 0 : (_entitySet$annotation14 = _entitySet$annotation13.RestrictedProperties) === null || _entitySet$annotation14 === void 0 ? void 0 : _entitySet$annotation14.forEach(function (navigationRestriction) {
      var _navigationRestrictio;

      if ((navigationRestriction === null || navigationRestriction === void 0 ? void 0 : (_navigationRestrictio = navigationRestriction.SortRestrictions) === null || _navigationRestrictio === void 0 ? void 0 : _navigationRestrictio.Sortable) === false) {
        var _entitySet$entityType, _entitySet$entityType2;

        // find correct navigation property
        var navigationProperty = entitySet === null || entitySet === void 0 ? void 0 : (_entitySet$entityType = entitySet.entityType) === null || _entitySet$entityType === void 0 ? void 0 : (_entitySet$entityType2 = _entitySet$entityType.navigationProperties) === null || _entitySet$entityType2 === void 0 ? void 0 : _entitySet$entityType2.filter(function (navigationProperty) {
          var _navigationRestrictio2;

          return navigationProperty.name == (navigationRestriction === null || navigationRestriction === void 0 ? void 0 : (_navigationRestrictio2 = navigationRestriction.NavigationProperty) === null || _navigationRestrictio2 === void 0 ? void 0 : _navigationRestrictio2.value);
        });

        if (navigationProperty[0]) {
          var _nonSortablePropertie2, _navigationProperty$;

          // add all properties of the navigation property to the nonSortableProperties
          (_nonSortablePropertie2 = nonSortableProperties).push.apply(_nonSortablePropertie2, _toConsumableArray((_navigationProperty$ = navigationProperty[0].targetType) === null || _navigationProperty$ === void 0 ? void 0 : _navigationProperty$.entityProperties.map(function (property) {
            return navigationProperty[0].name + "/" + property.name;
          })));
        }
      } else {
        var _navigationRestrictio3, _navigationRestrictio4;

        var nonSortableNavigationProperties = navigationRestriction === null || navigationRestriction === void 0 ? void 0 : (_navigationRestrictio3 = navigationRestriction.SortRestrictions) === null || _navigationRestrictio3 === void 0 ? void 0 : (_navigationRestrictio4 = _navigationRestrictio3.NonSortableProperties) === null || _navigationRestrictio4 === void 0 ? void 0 : _navigationRestrictio4.map(function (property) {
          var _navigationRestrictio5;

          return (navigationRestriction === null || navigationRestriction === void 0 ? void 0 : (_navigationRestrictio5 = navigationRestriction.NavigationProperty) === null || _navigationRestrictio5 === void 0 ? void 0 : _navigationRestrictio5.value) + "/" + property.value;
        });

        if (nonSortableNavigationProperties) {
          var _nonSortablePropertie3;

          (_nonSortablePropertie3 = nonSortableProperties).push.apply(_nonSortablePropertie3, _toConsumableArray(nonSortableNavigationProperties));
        }
      }
    });
    return nonSortableProperties;
  };

  _exports.getNonSortablePropertiesRestrictions = getNonSortablePropertiesRestrictions;

  var isStickySessionSupported = function (entitySet) {
    var _entitySet$annotation15;

    return !!((_entitySet$annotation15 = entitySet.annotations.Session) !== null && _entitySet$annotation15 !== void 0 && _entitySet$annotation15.StickySessionSupported);
  };

  _exports.isStickySessionSupported = isStickySessionSupported;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVudGl0eVNldEhlbHBlci50cyJdLCJuYW1lcyI6WyJpc0VudGl0eVNldCIsImRhdGFPYmplY3QiLCJoYXNPd25Qcm9wZXJ0eSIsIl90eXBlIiwiZ2V0RmlsdGVyRXhwcmVzc2lvblJlc3RyaWN0aW9ucyIsImVudGl0eVNldCIsImFubm90YXRpb25zIiwiQ2FwYWJpbGl0aWVzIiwiRmlsdGVyUmVzdHJpY3Rpb25zIiwiRmlsdGVyRXhwcmVzc2lvblJlc3RyaWN0aW9ucyIsImdldE5vblNvcnRhYmxlUHJvcGVydGllc1Jlc3RyaWN0aW9ucyIsIm5vblNvcnRhYmxlUHJvcGVydGllcyIsIlNvcnRSZXN0cmljdGlvbnMiLCJTb3J0YWJsZSIsInB1c2giLCJlbnRpdHlUeXBlIiwiZW50aXR5UHJvcGVydGllcyIsIm1hcCIsInByb3BlcnR5IiwibmFtZSIsIk5vblNvcnRhYmxlUHJvcGVydGllcyIsInZhbHVlIiwiTmF2aWdhdGlvblJlc3RyaWN0aW9ucyIsIlJlc3RyaWN0ZWRQcm9wZXJ0aWVzIiwiZm9yRWFjaCIsIm5hdmlnYXRpb25SZXN0cmljdGlvbiIsIm5hdmlnYXRpb25Qcm9wZXJ0eSIsIm5hdmlnYXRpb25Qcm9wZXJ0aWVzIiwiZmlsdGVyIiwiTmF2aWdhdGlvblByb3BlcnR5IiwidGFyZ2V0VHlwZSIsIm5vblNvcnRhYmxlTmF2aWdhdGlvblByb3BlcnRpZXMiLCJpc1N0aWNreVNlc3Npb25TdXBwb3J0ZWQiLCJTZXNzaW9uIiwiU3RpY2t5U2Vzc2lvblN1cHBvcnRlZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ08sTUFBTUEsV0FBVyxHQUFHLFVBQVNDLFVBQVQsRUFBbUQ7QUFDN0UsV0FBT0EsVUFBVSxJQUFJQSxVQUFVLENBQUNDLGNBQVgsQ0FBMEIsT0FBMUIsQ0FBZCxJQUFvREQsVUFBVSxDQUFDRSxLQUFYLEtBQXFCLFdBQWhGO0FBQ0EsR0FGTTs7OztBQUlBLE1BQU1DLCtCQUErQixHQUFHLFVB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QUF4QixrRkFBdUVSLEtBQXZFLElBQStFLEdBQS9FLEdBQXFGSCxRQUFRLENBQUNHLEtBQWxHO0FBQUEsU0FEK0IsQ0FBeEM7O0FBR0EsWUFBSVUsK0JBQUosRUFBcUM7QUFBQTs7QUFDcEMsb0NBQUFwQixxQkFBcUIsRUFBQ0csSUFBdEIsa0RBQThCaUIsK0JBQTlCO0FBQ0E7QUFDRDtBQUNELEtBckJEO0FBc0JBLFdBQU9wQixxQkFBUDtBQUNBLEdBbENNOzs7O0FBb0NBLE1BQU1xQix3QkFBd0IsR0FBRyxVQUFTM0IsU0FBVCxFQUF3QztBQUFBOztBQUMvRSxXQUFPLENBQUMsNkJBQUNBLFNBQVMsQ0FBQ0MsV0FBVixDQUFzQjJCLE9BQXZCLG9EQUFDLHdCQUErQkMsc0JBQWhDLENBQVI7QUFDQSxHQUZNIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlTZXQgfSBmcm9tIFwiQHNhcC11eC9hbm5vdGF0aW9uLWNvbnZlcnRlclwiO1xuaW1wb3J0IHsgTmF2aWdhdGlvblByb3BlcnR5UGF0aCB9IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgaXNFbnRpdHlTZXQgPSBmdW5jdGlvbihkYXRhT2JqZWN0OiBhbnkpOiBkYXRhT2JqZWN0IGlzIEVudGl0eVNldCB7XG5cdHJldHVybiBkYXRhT2JqZWN0ICYmIGRhdGFPYmplY3QuaGFzT3duUHJvcGVydHkoXCJfdHlwZVwiKSAmJiBkYXRhT2JqZWN0Ll90eXBlID09PSBcIkVudGl0eVNldFwiO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEZpbHRlckV4cHJlc3Npb25SZXN0cmljdGlvbnMgPSBmdW5jdGlvbihlbnRpdHlTZXQ6IEVudGl0eVNldCkge1xuXHRyZXR1cm4gZW50aXR5U2V0LmFubm90YXRpb25zPy5DYXBhYmlsaXRpZXM/LkZpbHRlclJlc3RyaWN0aW9ucz8uRmlsdGVyRXhwcmVzc2lvblJlc3RyaWN0aW9ucyB8fCBbXTtcbn07XG5cbi8qKlxuICogUmVhZHMgYWxsIFNvcnRSZXN0cmljdGlvbnMgb2YgdGhlIG1haW4gZW50aXR5IGFuZCB0aGUgKGZpcnN0IGxldmVsKSBuYXZpZ2F0aW9uIHJlc3RyaWN0aW9ucy5cbiAqIFRoaXMgZG9lcyBub3Qgd29yayBmb3IgbW9yZSB0aGFuIG9uZSBsZXZlbCBvZiBuYXZpZ2F0aW9uLlxuICpcbiAqIEBwYXJhbSB7RW50aXR5U2V0fSBlbnRpdHlTZXQgRW50aXR5IHNldCB0byBiZSBhbmFseXplZFxuICogQHJldHVybnMge3N0cmluZ1tdfSBBcnJheSBjb250YWluaW5nIHRoZSBwcm9wZXJ0eSBuYW1lcyBvZiBhbGwgbm9uLXNvcnRhYmxlIHByb3BlcnRpZXNcbiAqL1xuZXhwb3J0IGNvbnN0IGdldE5vblNvcnRhYmxlUHJvcGVydGllc1Jlc3RyaWN0aW9ucyA9IGZ1bmN0aW9uKGVudGl0eVNldDogRW50aXR5U2V0IHwgdW5kZWZpbmVkKTogc3RyaW5nW10ge1xuXHRsZXQgbm9uU29ydGFibGVQcm9wZXJ0aWVzID0gW107XG5cdC8vIENoZWNrIGFubm90YXRpb25zIGZvciBtYWluIGVudGl0eVxuXHRpZiAoZW50aXR5U2V0Py5hbm5vdGF0aW9ucz8uQ2FwYWJpbGl0aWVzPy5Tb3J0UmVzdHJpY3Rpb25zPy5Tb3J0YWJsZSA9PT0gZmFsc2UpIHtcblx0XHQvLyBhZGQgYWxsIHByb3BlcnRpZXMgb2YgdGhlIGVudGl0eSB0byB0aGUgbm9uU29ydGFibGVQcm9wZXJ0aWVzXG5cdFx0bm9uU29ydGFibGVQcm9wZXJ0aWVzLnB1c2goLi4uZW50aXR5U2V0LmVudGl0eVR5cGUuZW50aXR5UHJvcGVydGllcy5tYXAocHJvcGVydHkgPT4gcHJvcGVydHkubmFtZSkpO1xuXHR9IGVsc2Uge1xuXHRcdG5vblNvcnRhYmxlUHJvcGVydGllcyA9XG5cdFx0XHRlbnRpdHlTZXQ/LmFubm90YXRpb25zPy5DYXBhYmlsaXRpZXM/LlNvcnRSZXN0cmljdGlvbnM/Lk5vblNvcnRhYmxlUHJvcGVydGllcz8ubWFwKHByb3BlcnR5ID0+IHByb3BlcnR5LnZhbHVlKSB8fCBbXTtcblx0fVxuXHQvLyBDaGVjayBmb3IgZXZlcnkgbmF2aWdhdGlvblJlc3RyaWN0aW9uIGlmIGl0IGhhcyBzb3J0UmVzdHJpY3Rpb25zXG5cdGVudGl0eVNldD8uYW5ub3RhdGlvbnM/LkNhcGFiaWxpdGllcz8uTmF2aWdhdGlvblJlc3RyaWN0aW9ucz8uUmVzdHJpY3RlZFByb3BlcnRpZXM/LmZvckVhY2gobmF2aWdhdGlvblJlc3RyaWN0aW9uID0+IHtcblx0XHRpZiAobmF2aWdhdGlvblJlc3RyaWN0aW9uPy5Tb3J0UmVzdHJpY3Rpb25zPy5Tb3J0YWJsZSA9PT0gZmFsc2UpIHtcblx0XHRcdC8vIGZpbmQgY29ycmVjdCBuYXZpZ2F0aW9uIHByb3BlcnR5XG5cdFx0XHRjb25zdCBuYXZpZ2F0aW9uUHJvcGVydHkgPSBlbnRpdHlTZXQ/LmVudGl0eVR5cGU/Lm5hdmlnYXRpb25Qcm9wZXJ0aWVzPy5maWx0ZXIoXG5cdFx0XHRcdG5hdmlnYXRpb25Qcm9wZXJ0eSA9PlxuXHRcdFx0XHRcdG5hdmlnYXRpb25Qcm9wZXJ0eS5uYW1lID09IChuYXZpZ2F0aW9uUmVzdHJpY3Rpb24/Lk5hdmlnYXRpb25Qcm9wZXJ0eSBhcyBOYXZpZ2F0aW9uUHJvcGVydHlQYXRoKT8udmFsdWVcblx0XHRcdCk7XG5cdFx0XHRpZiAobmF2aWdhdGlvblByb3BlcnR5WzBdKSB7XG5cdFx0XHRcdC8vIGFkZCBhbGwgcHJvcGVydGllcyBvZiB0aGUgbmF2aWdhdGlvbiBwcm9wZXJ0eSB0byB0aGUgbm9uU29ydGFibGVQcm9wZXJ0aWVzXG5cdFx0XHRcdG5vblNvcnRhYmxlUHJvcGVydGllcy5wdXNoKFxuXHRcdFx0XHRcdC4uLm5hdmlnYXRpb25Qcm9wZXJ0eVswXS50YXJnZXRUeXBlPy5lbnRpdHlQcm9wZXJ0aWVzLm1hcChwcm9wZXJ0eSA9PiBuYXZpZ2F0aW9uUHJvcGVydHlbMF0ubmFtZSArIFwiL1wiICsgcHJvcGVydHkubmFtZSlcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3Qgbm9uU29ydGFibGVOYXZpZ2F0aW9uUHJvcGVydGllcyA9IG5hdmlnYXRpb25SZXN0cmljdGlvbj8uU29ydFJlc3RyaWN0aW9ucz8uTm9uU29ydGFibGVQcm9wZXJ0aWVzPy5tYXAoXG5cdFx0XHRcdHByb3BlcnR5ID0+IChuYXZpZ2F0aW9uUmVzdHJpY3Rpb24/Lk5hdmlnYXRpb25Qcm9wZXJ0eSBhcyBOYXZpZ2F0aW9uUHJvcGVydHlQYXRoKT8udmFsdWUgKyBcIi9cIiArIHByb3BlcnR5LnZhbHVlXG5cdFx0XHQpO1xuXHRcdFx0aWYgKG5vblNvcnRhYmxlTmF2aWdhdGlvblByb3BlcnRpZXMpIHtcblx0XHRcdFx0bm9uU29ydGFibGVQcm9wZXJ0aWVzLnB1c2goLi4ubm9uU29ydGFibGVOYXZpZ2F0aW9uUHJvcGVydGllcyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIG5vblNvcnRhYmxlUHJvcGVydGllcztcbn07XG5cbmV4cG9ydCBjb25zdCBpc1N0aWNreVNlc3Npb25TdXBwb3J0ZWQgPSBmdW5jdGlvbihlbnRpdHlTZXQ6IEVudGl0eVNldCk6IGJvb2xlYW4ge1xuXHRyZXR1cm4gISFlbnRpdHlTZXQuYW5ub3RhdGlvbnMuU2Vzc2lvbj8uU3RpY2t5U2Vzc2lvblN1cHBvcnRlZDtcbn07XG4iXX0=