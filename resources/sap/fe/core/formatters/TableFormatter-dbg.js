/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/formatters/TableFormatterTypes"], function (TableFormatterTypes) {
  "use strict";

  var MessageType = TableFormatterTypes.MessageType;

  var getMessagetypeOrder = function (messageType) {
    switch (messageType) {
      case "Error":
        return 4;

      case "Warning":
        return 3;

      case "Information":
        return 2;

      case "None":
        return 1;

      default:
        return -1;
    }
  };
  /**
   * rowHighlighting
   *
   * @param {object} this The context
   * @param {string|number} CriticalityValue The criticality value
   * @param {number} messageLastUpdate Timestamp of the last message that was created. It's defined as an input value, but not used in the body of the function
   * It is used to refresh the formatting of the table each time a new message is updated
   * @returns {object} The value from the inner function
   */


  var rowHighlighting = function (criticalityValue, aFilteredMessages) {
    var iHighestCriticalityValue = -1;

    if (aFilteredMessages) {
      var sCurrentContextPath = this.getBindingContext() ? this.getBindingContext().getPath() : undefined;
      aFilteredMessages.forEach(function (oMessage) {
        if (oMessage.aTargets[0].indexOf(sCurrentContextPath) === 0 && iHighestCriticalityValue < getMessagetypeOrder(oMessage.type)) {
          iHighestCriticalityValue = getMessagetypeOrder(oMessage.type);
          criticalityValue = oMessage.type;
        }
      });
    }

    var criticalityProperty;

    if (typeof criticalityValue === "string") {
      return criticalityValue;
    }

    switch (criticalityValue) {
      case 1:
        criticalityProperty = MessageType.Error;
        break;

      case 2:
        criticalityProperty = MessageType.Warning;
        break;

      case 3:
        criticalityProperty = MessageType.Success;
        break;

      case 5:
        criticalityProperty = MessageType.Information;
        break;

      default:
        criticalityProperty = MessageType.None;
    }

    return criticalityProperty;
  };

  rowHighlighting.__functionName = "sap.fe.core.formatters.TableFormatter#rowHighlighting";

  var navigatedRow = function (sDeepestPath) {
    if (this.getBindingContext() && sDeepestPath) {
      return sDeepestPath.indexOf(this.getBindingContext().getPath()) === 0;
    } else {
      return false;
    }
  };

  navigatedRow.__functionName = "sap.fe.core.formatters.TableFormatter#navigatedRow"; // See https://www.typescriptlang.org/docs/handbook/functions.html#this-parameters for more detail on this weird syntax

  /**
   * Collection of table formatters.
   *
   * @param {object} this The context
   * @param {string} sName The inner function name
   * @param {object[]} oArgs The inner function parameters
   * @returns {object} The value from the inner function
   */

  var tableFormatters = function (sName) {
    if (tableFormatters.hasOwnProperty(sName)) {
      for (var _len = arguments.length, oArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        oArgs[_key - 1] = arguments[_key];
      }

      return tableFormatters[sName].apply(this, oArgs);
    } else {
      return "";
    }
  };

  tableFormatters.rowHighlighting = rowHighlighting;
  tableFormatters.navigatedRow = navigatedRow;
  /**
   * @global
   */

  return tableFormatters;
}, true);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbImdldE1lc3NhZ2V0eXBlT3JkZXIiLCJtZXNzYWdlVHlwZSIsInJvd0hpZ2hsaWdodGluZyIsImNyaXRpY2FsaXR5VmFsdWUiLCJhRmlsdGVyZWRNZXNzYWdlcyIsImlIaWdoZXN0Q3JpdGljYWxpdHlWYWx1ZSIsInNDdXJyZW50Q29udGV4dFBhdGgiLCJnZXRCaW5kaW5nQ29udGV4dCIsImdldFBhdGgiLCJ1bmRlZmluZWQiLCJmb3JFYWNoIiwib01lc3NhZ2UiLCJhVGFyZ2V0cyIsImluZGV4T2YiLCJ0eXBlIiwiY3JpdGljYWxpdHlQcm9wZXJ0eSIsIk1lc3NhZ2VUeXBlIiwiRXJyb3IiLCJXYXJuaW5nIiwiU3VjY2VzcyIsIkluZm9ybWF0aW9uIiwiTm9uZSIsIl9fZnVuY3Rpb25OYW1lIiwibmF2aWdhdGVkUm93Iiwic0RlZXBlc3RQYXRoIiwidGFibGVGb3JtYXR0ZXJzIiwic05hbWUiLCJoYXNPd25Qcm9wZXJ0eSIsIm9BcmdzIiwiYXBwbHkiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7Ozs7OztBQUNBLE1BQU1BLG1CQUFtQixHQUFHLFVBQVNDLFdBQVQsRUFBc0M7QUFDakUsWUFBUUEsV0FBUjtBQUNDLFdBQUssT0FBTDtBQUNDLGVBQU8sQ0FBUDs7QUFDRCxXQUFLLFNBQUw7QUFDQyxlQUFPLENBQVA7O0FBQ0QsV0FBSyxhQUFMO0FBQ0MsZUFBTyxDQUFQOztBQUNELFdBQUssTUFBTDtBQUNDLGVBQU8sQ0FBUDs7QUFDRDtBQUNDLGVBQU8sQ0FBQyxDQUFSO0FBVkY7QUFZQSxHQWJEO0FBZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQSxNQUFNQyxlQUFlLEdBQUcsVUFBOEJDLGdCQUE5QixFQUFpRUMsaUJBQWpFLEVBQXdHO0FBQy9ILFFBQUlDLHdCQUFnQyxHQUFHLENBQUMsQ0FBeEM7O0FBQ0EsUUFBSUQsaUJBQUosRUFBdUI7QUFDdEIsVUFBTUUsbUJBQW1CLEdBQUcsS0FBS0MsaUJBQUwsS0FBMkIsS0FBS0EsaUJBQUwsR0FBeUJDLE9BQXpCLEVBQTNCLEdBQWdFQyxTQUE1RjtBQUNBTCxNQUFBQSxpQkFBaUIsQ0FBQ00sT0FBbEIsQ0FBMEIsVUFBQ0MsUUFBRCxFQUFtQjtBQUM1QyxZQUFJQSxRQUFRLENBQUNDLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBcUJDLE9BQXJCLENBQTZCUCxtQkFBN0IsTUFBc0QsQ0FBdEQsSUFBMkRELHdCQUF3QixHQUFHTCxtQkFBbUIsQ0FBQ1csUUFBUSxDQUFDRyxJQUFWLENBQTdHLEVBQThIO0FBQzdIVCxVQUFBQSx3QkFBd0IsR0FBR0wsbUJBQW1CLENBQUNXLFFBQVEsQ0FBQ0csSUFBVixDQUE5QztBQUNBWCxVQUFBQSxnQkFBZ0IsR0FBR1EsUUFBUSxDQUFDRyxJQUE1QjtBQUNBO0FBQ0QsT0FMRDtBQU1BOztBQUVELFFBQUlDLG1CQUFKOztBQUNBLFFBQUksT0FBT1osZ0JBQVAsS0FBNEIsUUFBaEMsRUFBMEM7QUFDekMsYUFBUUEsZ0JBQVI7QUFDQTs7QUFDRCxZQUFRQSxnQkFBUjtBQUNDLFdBQUssQ0FBTDtBQUNDWSxRQUFBQSxtQkFBbUIsR0FBR0MsV0FBVyxDQUFDQyxLQUFsQztBQUNBOztBQUNELFdBQUssQ0FBTDtBQUNDRixRQUFBQSxtQkFBbUIsR0FBR0MsV0FBVyxDQUFDRSxPQUFsQztBQUNBOztBQUNELFdBQUssQ0FBTDtBQUNDSCxRQUFBQSxtQkFBbUIsR0FBR0MsV0FBVyxDQUFDRyxPQUFsQztBQUNBOztBQUNELFdBQUssQ0FBTDtBQUNDSixRQUFBQSxtQkFBbUIsR0FBR0MsV0FBVyxDQUFDSSxXQUFsQztBQUNBOztBQUNEO0FBQ0NMLFFBQUFBLG1CQUFtQixHQUFHQyxXQUFXLENBQUNLLElBQWxDO0FBZEY7O0FBaUJBLFdBQU9OLG1CQUFQO0FBQ0EsR0FsQ0Q7O0FBbUNBYixFQUFBQSxlQUFlLENBQUNvQixjQUFoQixHQUFpQyx1REFBakM7O0FBRUEsTUFBTUMsWUFBWSxHQUFHLFVBQThCQyxZQUE5QixFQUFvRDtBQUN4RSxRQUFJLEtBQUtqQixpQkFBTCxNQUE0QmlCLFlBQWhDLEVBQThDO0FBQzdDLGFBQU9BLFlBQVksQ0FBQ1gsT0FBYixDQUFxQixLQUFLTixpQkFBTCxHQUF5QkMsT0FBekIsRUFBckIsTUFBNkQsQ0FBcEU7QUFDQSxLQUZELE1BRU87QUFDTixhQUFPLEtBQVA7QUFDQTtBQUNELEdBTkQ7O0FBT0FlLEVBQUFBLFlBQVksQ0FBQ0QsY0FBYixHQUE4QixvREFBOUIsQyxDQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsTUFBTUcsZUFBZSxHQUFHLFVBQXVCQyxLQUF2QixFQUE0RDtBQUNuRixRQUFJRCxlQUFlLENBQUNFLGNBQWhCLENBQStCRCxLQUEvQixDQUFKLEVBQTJDO0FBQUEsd0NBRHFCRSxLQUNyQjtBQURxQkEsUUFBQUEsS0FDckI7QUFBQTs7QUFDMUMsYUFBUUgsZUFBRCxDQUF5QkMsS0FBekIsRUFBZ0NHLEtBQWhDLENBQXNDLElBQXRDLEVBQTRDRCxLQUE1QyxDQUFQO0FBQ0EsS0FGRCxNQUVPO0FBQ04sYUFBTyxFQUFQO0FBQ0E7QUFDRCxHQU5EOztBQVFBSCxFQUFBQSxlQUFlLENBQUN2QixlQUFoQixHQUFrQ0EsZUFBbEM7QUFDQXVCLEVBQUFBLGVBQWUsQ0FBQ0YsWUFBaEIsR0FBK0JBLFlBQS9CO0FBQ0E7QUFDQTtBQUNBOztTQUNlRSxlIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYW5hZ2VkT2JqZWN0IH0gZnJvbSBcInNhcC91aS9iYXNlXCI7XG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gXCJzYXAvZmUvY29yZS9mb3JtYXR0ZXJzL1RhYmxlRm9ybWF0dGVyVHlwZXNcIjtcblxuY29uc3QgZ2V0TWVzc2FnZXR5cGVPcmRlciA9IGZ1bmN0aW9uKG1lc3NhZ2VUeXBlOiBzdHJpbmcpOiBudW1iZXIge1xuXHRzd2l0Y2ggKG1lc3NhZ2VUeXBlKSB7XG5cdFx0Y2FzZSBcIkVycm9yXCI6XG5cdFx0XHRyZXR1cm4gNDtcblx0XHRjYXNlIFwiV2FybmluZ1wiOlxuXHRcdFx0cmV0dXJuIDM7XG5cdFx0Y2FzZSBcIkluZm9ybWF0aW9uXCI6XG5cdFx0XHRyZXR1cm4gMjtcblx0XHRjYXNlIFwiTm9uZVwiOlxuXHRcdFx0cmV0dXJuIDE7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiAtMTtcblx0fVxufTtcblxuLyoqXG4gKiByb3dIaWdobGlnaHRpbmdcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdGhpcyBUaGUgY29udGV4dFxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBDcml0aWNhbGl0eVZhbHVlIFRoZSBjcml0aWNhbGl0eSB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IG1lc3NhZ2VMYXN0VXBkYXRlIFRpbWVzdGFtcCBvZiB0aGUgbGFzdCBtZXNzYWdlIHRoYXQgd2FzIGNyZWF0ZWQuIEl0J3MgZGVmaW5lZCBhcyBhbiBpbnB1dCB2YWx1ZSwgYnV0IG5vdCB1c2VkIGluIHRoZSBib2R5IG9mIHRoZSBmdW5jdGlvblxuICogSXQgaXMgdXNlZCB0byByZWZyZXNoIHRoZSBmb3JtYXR0aW5nIG9mIHRoZSB0YWJsZSBlYWNoIHRpbWUgYSBuZXcgbWVzc2FnZSBpcyB1cGRhdGVkXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBUaGUgdmFsdWUgZnJvbSB0aGUgaW5uZXIgZnVuY3Rpb25cbiAqL1xuXG5jb25zdCByb3dIaWdobGlnaHRpbmcgPSBmdW5jdGlvbih0aGlzOiBNYW5hZ2VkT2JqZWN0LCBjcml0aWNhbGl0eVZhbHVlOiBzdHJpbmcgfCBudW1iZXIsIGFGaWx0ZXJlZE1lc3NhZ2VzOiBhbnlbXSk6IE1lc3NhZ2VUeXBlIHtcblx0bGV0IGlIaWdoZXN0Q3JpdGljYWxpdHlWYWx1ZTogbnVtYmVyID0gLTE7XG5cdGlmIChhRmlsdGVyZWRNZXNzYWdlcykge1xuXHRcdGNvbnN0IHNDdXJyZW50Q29udGV4dFBhdGggPSB0aGlzLmdldEJpbmRpbmdDb250ZXh0KCkgPyB0aGlzLmdldEJpbmRpbmdDb250ZXh0KCkuZ2V0UGF0aCgpIDogdW5kZWZpbmVkO1xuXHRcdGFGaWx0ZXJlZE1lc3NhZ2VzLmZvckVhY2goKG9NZXNzYWdlOiBhbnkpID0+IHtcblx0XHRcdGlmIChvTWVzc2FnZS5hVGFyZ2V0c1swXS5pbmRleE9mKHNDdXJyZW50Q29udGV4dFBhdGgpID09PSAwICYmIGlIaWdoZXN0Q3JpdGljYWxpdHlWYWx1ZSA8IGdldE1lc3NhZ2V0eXBlT3JkZXIob01lc3NhZ2UudHlwZSkpIHtcblx0XHRcdFx0aUhpZ2hlc3RDcml0aWNhbGl0eVZhbHVlID0gZ2V0TWVzc2FnZXR5cGVPcmRlcihvTWVzc2FnZS50eXBlKTtcblx0XHRcdFx0Y3JpdGljYWxpdHlWYWx1ZSA9IG9NZXNzYWdlLnR5cGU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRsZXQgY3JpdGljYWxpdHlQcm9wZXJ0eTtcblx0aWYgKHR5cGVvZiBjcml0aWNhbGl0eVZhbHVlID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIChjcml0aWNhbGl0eVZhbHVlIGFzIHVua25vd24pIGFzIE1lc3NhZ2VUeXBlO1xuXHR9XG5cdHN3aXRjaCAoY3JpdGljYWxpdHlWYWx1ZSkge1xuXHRcdGNhc2UgMTpcblx0XHRcdGNyaXRpY2FsaXR5UHJvcGVydHkgPSBNZXNzYWdlVHlwZS5FcnJvcjtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMjpcblx0XHRcdGNyaXRpY2FsaXR5UHJvcGVydHkgPSBNZXNzYWdlVHlwZS5XYXJuaW5nO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAzOlxuXHRcdFx0Y3JpdGljYWxpdHlQcm9wZXJ0eSA9IE1lc3NhZ2VUeXBlLlN1Y2Nlc3M7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDU6XG5cdFx0XHRjcml0aWNhbGl0eVByb3BlcnR5ID0gTWVzc2FnZVR5cGUuSW5mb3JtYXRpb247XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0Y3JpdGljYWxpdHlQcm9wZXJ0eSA9IE1lc3NhZ2VUeXBlLk5vbmU7XG5cdH1cblxuXHRyZXR1cm4gY3JpdGljYWxpdHlQcm9wZXJ0eTtcbn07XG5yb3dIaWdobGlnaHRpbmcuX19mdW5jdGlvbk5hbWUgPSBcInNhcC5mZS5jb3JlLmZvcm1hdHRlcnMuVGFibGVGb3JtYXR0ZXIjcm93SGlnaGxpZ2h0aW5nXCI7XG5cbmNvbnN0IG5hdmlnYXRlZFJvdyA9IGZ1bmN0aW9uKHRoaXM6IE1hbmFnZWRPYmplY3QsIHNEZWVwZXN0UGF0aDogc3RyaW5nKSB7XG5cdGlmICh0aGlzLmdldEJpbmRpbmdDb250ZXh0KCkgJiYgc0RlZXBlc3RQYXRoKSB7XG5cdFx0cmV0dXJuIHNEZWVwZXN0UGF0aC5pbmRleE9mKHRoaXMuZ2V0QmluZGluZ0NvbnRleHQoKS5nZXRQYXRoKCkpID09PSAwO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufTtcbm5hdmlnYXRlZFJvdy5fX2Z1bmN0aW9uTmFtZSA9IFwic2FwLmZlLmNvcmUuZm9ybWF0dGVycy5UYWJsZUZvcm1hdHRlciNuYXZpZ2F0ZWRSb3dcIjtcblxuLy8gU2VlIGh0dHBzOi8vd3d3LnR5cGVzY3JpcHRsYW5nLm9yZy9kb2NzL2hhbmRib29rL2Z1bmN0aW9ucy5odG1sI3RoaXMtcGFyYW1ldGVycyBmb3IgbW9yZSBkZXRhaWwgb24gdGhpcyB3ZWlyZCBzeW50YXhcbi8qKlxuICogQ29sbGVjdGlvbiBvZiB0YWJsZSBmb3JtYXR0ZXJzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0aGlzIFRoZSBjb250ZXh0XG4gKiBAcGFyYW0ge3N0cmluZ30gc05hbWUgVGhlIGlubmVyIGZ1bmN0aW9uIG5hbWVcbiAqIEBwYXJhbSB7b2JqZWN0W119IG9BcmdzIFRoZSBpbm5lciBmdW5jdGlvbiBwYXJhbWV0ZXJzXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBUaGUgdmFsdWUgZnJvbSB0aGUgaW5uZXIgZnVuY3Rpb25cbiAqL1xuY29uc3QgdGFibGVGb3JtYXR0ZXJzID0gZnVuY3Rpb24odGhpczogb2JqZWN0LCBzTmFtZTogc3RyaW5nLCAuLi5vQXJnczogYW55W10pOiBhbnkge1xuXHRpZiAodGFibGVGb3JtYXR0ZXJzLmhhc093blByb3BlcnR5KHNOYW1lKSkge1xuXHRcdHJldHVybiAodGFibGVGb3JtYXR0ZXJzIGFzIGFueSlbc05hbWVdLmFwcGx5KHRoaXMsIG9BcmdzKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gXCJcIjtcblx0fVxufTtcblxudGFibGVGb3JtYXR0ZXJzLnJvd0hpZ2hsaWdodGluZyA9IHJvd0hpZ2hsaWdodGluZztcbnRhYmxlRm9ybWF0dGVycy5uYXZpZ2F0ZWRSb3cgPSBuYXZpZ2F0ZWRSb3c7XG4vKipcbiAqIEBnbG9iYWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgdGFibGVGb3JtYXR0ZXJzO1xuIl19