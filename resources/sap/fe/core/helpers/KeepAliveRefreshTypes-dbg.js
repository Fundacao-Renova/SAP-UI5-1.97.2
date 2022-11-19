/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define([], function () {
  "use strict";

  var _exports = {};

  /**
   * Enumeration for supported refresh strategy type
   */
  var RefreshStrategyType;
  /**
   * Configuration of a RefreshStrategy
   */

  (function (RefreshStrategyType) {
    RefreshStrategyType["Self"] = "self";
    RefreshStrategyType["IncludingDependents"] = "includingDependents";
  })(RefreshStrategyType || (RefreshStrategyType = {}));

  _exports.RefreshStrategyType = RefreshStrategyType;

  /**
   * Path used to store information
   */
  var PATH_TO_STORE = "/refreshStrategyOnAppRestore";
  _exports.PATH_TO_STORE = PATH_TO_STORE;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIktlZXBBbGl2ZVJlZnJlc2hUeXBlcy50cyJdLCJuYW1lcyI6WyJSZWZyZXNoU3RyYXRlZ3lUeXBlIiwiUEFUSF9UT19TVE9SRSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTs7Ozs7O0FBRkE7QUFDQTtBQUNBO01BQ1lBLG1CO0FBSVo7QUFDQTtBQUNBOzthQU5ZQSxtQjtBQUFBQSxJQUFBQSxtQjtBQUFBQSxJQUFBQSxtQjtLQUFBQSxtQixLQUFBQSxtQjs7OztBQTZCWjtBQUNBO0FBQ0E7QUFDTyxNQUFNQyxhQUFxQixHQUFHLDhCQUE5QiIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFbnVtZXJhdGlvbiBmb3Igc3VwcG9ydGVkIHJlZnJlc2ggc3RyYXRlZ3kgdHlwZVxuICovXG5leHBvcnQgZW51bSBSZWZyZXNoU3RyYXRlZ3lUeXBlIHtcblx0U2VsZiA9IFwic2VsZlwiLFxuXHRJbmNsdWRpbmdEZXBlbmRlbnRzID0gXCJpbmNsdWRpbmdEZXBlbmRlbnRzXCJcbn1cbi8qKlxuICogQ29uZmlndXJhdGlvbiBvZiBhIFJlZnJlc2hTdHJhdGVneVxuICovXG5leHBvcnQgdHlwZSBTT1JlZnJlc2hTdHJhdGVneSA9IHtcblx0W2VudGl0eVNldE5hbWVPckNvbnRleHRQYXRoOiBzdHJpbmddOiBSZWZyZXNoU3RyYXRlZ3lUeXBlO1xufTtcbi8qKlxuICogQ29uZmlndXJhdGlvbiBvZiBhIFJlZnJlc2hTdHJhdGVnaWVzXG4gKi9cbmV4cG9ydCB0eXBlIFJlZnJlc2hTdHJhdGVnaWVzID0ge1xuXHRpbnRlbnRzPzoge1xuXHRcdFtzb0FjdGlvbjogc3RyaW5nXTogU09SZWZyZXNoU3RyYXRlZ3k7IC8vICdzb0FjdGlvbicgZm9ybWF0IGlzIFwiPFNlbWFudGljT2JqZWN0Pi08QWN0aW9uPlwiXG5cdH07XG5cdGRlZmF1bHRCZWhhdmlvcj86IFNPUmVmcmVzaFN0cmF0ZWd5O1xuXHRfZmVEZWZhdWx0PzogU09SZWZyZXNoU3RyYXRlZ3k7XG59O1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGhhc2ggd2l0aCBzZW1hbnRpY09iamVjdCBhbmQgYWN0aW9uXG4gKi9cbmV4cG9ydCB0eXBlIFNPQWN0aW9uID0ge1xuXHRzZW1hbnRpY09iamVjdD86IHN0cmluZztcblx0YWN0aW9uPzogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBQYXRoIHVzZWQgdG8gc3RvcmUgaW5mb3JtYXRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IFBBVEhfVE9fU1RPUkU6IHN0cmluZyA9IFwiL3JlZnJlc2hTdHJhdGVneU9uQXBwUmVzdG9yZVwiO1xuIl19