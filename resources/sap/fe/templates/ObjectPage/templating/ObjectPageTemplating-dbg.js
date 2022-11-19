/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/BindingExpression", "sap/fe/core/converters/helpers/BindingHelper", "sap/fe/core/CommonUtils", "sap/fe/macros/field/FieldTemplating", "sap/fe/core/templating/EntitySetHelper"], function (BindingExpression, BindingHelper, CommonUtils, FieldTemplating, EntitySetHelper) {
  "use strict";

  var _exports = {};
  var isStickySessionSupported = EntitySetHelper.isStickySessionSupported;
  var formatValueRecursively = FieldTemplating.formatValueRecursively;
  var addTextArrangementToBindingExpression = FieldTemplating.addTextArrangementToBindingExpression;
  var Entity = BindingHelper.Entity;
  var Draft = BindingHelper.Draft;
  var UI = BindingHelper.UI;
  var compileBinding = BindingExpression.compileBinding;
  var annotationExpression = BindingExpression.annotationExpression;
  var concat = BindingExpression.concat;
  var isEmpty = BindingExpression.isEmpty;
  var ifElse = BindingExpression.ifElse;
  var and = BindingExpression.and;

  //```mermaid
  // graph TD
  // A[Object Page Title] -->|Get DataField Value| C{Evaluate Create Mode}
  // C -->|In Create Mode| D{Is DataField Value empty}
  // D -->|Yes| F{Is there a TypeName}
  // F -->|Yes| G[Is there an custom title]
  // G -->|Yes| G1[Show the custom title + 'TypeName']
  // G -->|No| G2[Display the default title 'New + TypeName']
  // F -->|No| H[Is there a custom title]
  // H -->|Yes| I[Show the custom title]
  // H -->|No| J[Show the default 'Unamned Object']
  // D -->|No| E
  // C -->|Not in create mode| E[Show DataField Value]
  // ```

  /**
   * Compute the title for the object page.
   * @param oHeaderInfo The @UI.HeaderInfo annotation content
   * @param oViewData The view data object we're currently on
   * @param fullContextPath The full context path used to reach that object page
   * @param oDraftRoot
   * @returns The binding expression for the object page title
   */
  var getExpressionForTitle = function (oHeaderInfo, oViewData, fullContextPath, oDraftRoot) {
    var _oHeaderInfo$Title, _oHeaderInfo$Title2, _oHeaderInfo$Title3, _oHeaderInfo$Title3$V, _oHeaderInfo$Title3$V2, _oHeaderInfo$Title3$V3, _oHeaderInfo$Title3$V4, _oHeaderInfo$Title3$V5, _oHeaderInfo$Title3$V6, _oHeaderInfo$Title3$V7;

    var titleNoHeaderInfo = CommonUtils.getTranslatedText("T_NEW_OBJECT", oViewData.resourceBundle, undefined, oViewData.entitySet);
    var titleWithHeaderInfo = CommonUtils.getTranslatedText("T_ANNOTATION_HELPER_DEFAULT_OBJECT_PAGE_HEADER_TITLE", oViewData.resourceBundle, undefined, oViewData.entitySet);
    var oEmptyHeaderInfoTitle = (oHeaderInfo === null || oHeaderInfo === void 0 ? void 0 : oHeaderInfo.Title) === undefined || (oHeaderInfo === null || oHeaderInfo === void 0 ? void 0 : oHeaderInfo.Title) === "" || (oHeaderInfo === null || oHeaderInfo === void 0 ? void 0 : (_oHeaderInfo$Title = oHeaderInfo.Title) === null || _oHeaderInfo$Title === void 0 ? void 0 : _oHeaderInfo$Title.Value) === "";
    var titleForActiveHeaderNoHeaderInfo = !oEmptyHeaderInfoTitle ? CommonUtils.getTranslatedText("T_ANNOTATION_HELPER_DEFAULT_OBJECT_PAGE_HEADER_TITLE_NO_HEADER_INFO", oViewData.resourceBundle) : "";
    var titleValueExpression = annotationExpression(oHeaderInfo === null || oHeaderInfo === void 0 ? void 0 : (_oHeaderInfo$Title2 = oHeaderInfo.Title) === null || _oHeaderInfo$Title2 === void 0 ? void 0 : _oHeaderInfo$Title2.Value);

    if (oHeaderInfo !== null && oHeaderInfo !== void 0 && (_oHeaderInfo$Title3 = oHeaderInfo.Title) !== null && _oHeaderInfo$Title3 !== void 0 && (_oHeaderInfo$Title3$V = _oHeaderInfo$Title3.Value) !== null && _oHeaderInfo$Title3$V !== void 0 && (_oHeaderInfo$Title3$V2 = _oHeaderInfo$Title3$V.$target) !== null && _oHeaderInfo$Title3$V2 !== void 0 && (_oHeaderInfo$Title3$V3 = _oHeaderInfo$Title3$V2.annotations) !== null && _oHeaderInfo$Title3$V3 !== void 0 && (_oHeaderInfo$Title3$V4 = _oHeaderInfo$Title3$V3.Common) !== null && _oHeaderInfo$Title3$V4 !== void 0 && (_oHeaderInfo$Title3$V5 = _oHeaderInfo$Title3$V4.Text) !== null && _oHeaderInfo$Title3$V5 !== void 0 && (_oHeaderInfo$Title3$V6 = _oHeaderInfo$Title3$V5.annotations) !== null && _oHeaderInfo$Title3$V6 !== void 0 && (_oHeaderInfo$Title3$V7 = _oHeaderInfo$Title3$V6.UI) !== null && _oHeaderInfo$Title3$V7 !== void 0 && _oHeaderInfo$Title3$V7.TextArrangement) {
      // In case an explicit text arrangement was set we make use of it in the description as well
      titleValueExpression = addTextArrangementToBindingExpression(titleValueExpression, fullContextPath);
    }

    titleValueExpression = formatValueRecursively(titleValueExpression, fullContextPath); // If there is a TypeName defined, show the default title 'New + TypeName', otherwise show the custom title or the default 'New object'

    var createModeTitle = oHeaderInfo !== null && oHeaderInfo !== void 0 && oHeaderInfo.TypeName ? concat(titleWithHeaderInfo, ": ", annotationExpression(oHeaderInfo.TypeName.toString())) : titleNoHeaderInfo;
    var activeExpression = oDraftRoot ? Entity.IsActive : true;
    return compileBinding(ifElse( // If Create Mode && Empty expression
    and(UI.IsCreateMode, titleValueExpression && isEmpty(titleValueExpression)), createModeTitle, // Otherwise show the default expression
    ifElse(and(activeExpression, titleValueExpression && isEmpty(titleValueExpression)), titleForActiveHeaderNoHeaderInfo, titleValueExpression)));
  };
  /**
   * Retrieves the expression for the description of an object page.
   *
   * @param oHeaderInfo The @UI.HeaderInfo annotation content
   * @param fullContextPath The full context path used to reach that object page
   * @returns The binding expression for the object page description
   */


  _exports.getExpressionForTitle = getExpressionForTitle;

  var getExpressionForDescription = function (oHeaderInfo, fullContextPath) {
    var _oHeaderInfo$Descript, _oHeaderInfo$Descript2, _oHeaderInfo$Descript3, _oHeaderInfo$Descript4, _oHeaderInfo$Descript5, _oHeaderInfo$Descript6, _oHeaderInfo$Descript7, _oHeaderInfo$Descript8, _oHeaderInfo$Descript9;

    var bindingExpression = annotationExpression(oHeaderInfo === null || oHeaderInfo === void 0 ? void 0 : (_oHeaderInfo$Descript = oHeaderInfo.Description) === null || _oHeaderInfo$Descript === void 0 ? void 0 : _oHeaderInfo$Descript.Value);

    if (oHeaderInfo !== null && oHeaderInfo !== void 0 && (_oHeaderInfo$Descript2 = oHeaderInfo.Description) !== null && _oHeaderInfo$Descript2 !== void 0 && (_oHeaderInfo$Descript3 = _oHeaderInfo$Descript2.Value) !== null && _oHeaderInfo$Descript3 !== void 0 && (_oHeaderInfo$Descript4 = _oHeaderInfo$Descript3.$target) !== null && _oHeaderInfo$Descript4 !== void 0 && (_oHeaderInfo$Descript5 = _oHeaderInfo$Descript4.annotations) !== null && _oHeaderInfo$Descript5 !== void 0 && (_oHeaderInfo$Descript6 = _oHeaderInfo$Descript5.Common) !== null && _oHeaderInfo$Descript6 !== void 0 && (_oHeaderInfo$Descript7 = _oHeaderInfo$Descript6.Text) !== null && _oHeaderInfo$Descript7 !== void 0 && (_oHeaderInfo$Descript8 = _oHeaderInfo$Descript7.annotations) !== null && _oHeaderInfo$Descript8 !== void 0 && (_oHeaderInfo$Descript9 = _oHeaderInfo$Descript8.UI) !== null && _oHeaderInfo$Descript9 !== void 0 && _oHeaderInfo$Descript9.TextArrangement) {
      // In case an explicit text arrangement was set we make use of it in the description as well
      bindingExpression = addTextArrangementToBindingExpression(bindingExpression, fullContextPath);
    }

    return compileBinding(formatValueRecursively(bindingExpression, fullContextPath));
  };
  /**
   * Return the expression for the save button.
   *
   * @param oViewData The current view data
   * @param fullContextPath The path used up until here
   * @returns The binding expression that shows the right save button text
   */


  _exports.getExpressionForDescription = getExpressionForDescription;

  var getExpressionForSaveButton = function (oViewData, fullContextPath) {
    var saveButtonText = CommonUtils.getTranslatedText("T_OP_OBJECT_PAGE_SAVE", oViewData.resourceBundle);
    var createButtonText = CommonUtils.getTranslatedText("T_OP_OBJECT_PAGE_CREATE", oViewData.resourceBundle);
    var saveExpression;

    if (isStickySessionSupported(fullContextPath.startingEntitySet)) {
      // If we're in sticky mode AND the ui is in create mode, show Create, else show Save
      saveExpression = ifElse(UI.IsCreateModeSticky, createButtonText, saveButtonText);
    } else {
      // If we're in draft AND the draft is a new object (!IsActiveEntity && !HasActiveEntity), show create, else show save
      saveExpression = ifElse(Draft.IsNewObject, createButtonText, saveButtonText);
    }

    return compileBinding(saveExpression);
  };

  _exports.getExpressionForSaveButton = getExpressionForSaveButton;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9iamVjdFBhZ2VUZW1wbGF0aW5nLnRzIl0sIm5hbWVzIjpbImdldEV4cHJlc3Npb25Gb3JUaXRsZSIsIm9IZWFkZXJJbmZvIiwib1ZpZXdEYXRhIiwiZnVsbENvbnRleHRQYXRoIiwib0RyYWZ0Um9vdCIsInRpdGxlTm9IZWFkZXJJbmZvIiwiQ29tbW9uVXRpbHMiLCJnZXRUcmFuc2xhdGVkVGV4dCIsInJlc291cmNlQnVuZGxlIiwidW5kZWZpbmVkIiwiZW50aXR5U2V0IiwidGl0bGVXaXRoSGVhZGVySW5mbyIsIm9FbXB0eUhlYWRlckluZm9UaXRsZSIsIlRpdGxlIiwiVmFsdWUiLCJ0aXRsZUZvckFjdGl2ZUhlYWRlck5vSGVhZGVySW5mbyIsInRpdGxlVmFsdWVFeHByZXNzaW9uIiwiYW5ub3RhdGlvbkV4cHJlc3Npb24iLCIkdGFyZ2V0IiwiYW5ub3RhdGlvbnMiLCJDb21tb24iLCJUZXh0IiwiVUkiLCJUZXh0QXJyYW5nZW1lbnQiLCJhZGRUZXh0QXJyYW5nZW1lbnRUb0JpbmRpbmdFeHByZXNzaW9uIiwiZm9ybWF0VmFsdWVSZWN1cnNpdmVseSIsImNyZWF0ZU1vZGVUaXRsZSIsIlR5cGVOYW1lIiwiY29uY2F0IiwidG9TdHJpbmciLCJhY3RpdmVFeHByZXNzaW9uIiwiRW50aXR5IiwiSXNBY3RpdmUiLCJjb21waWxlQmluZGluZyIsImlmRWxzZSIsImFuZCIsIklzQ3JlYXRlTW9kZSIsImlzRW1wdHkiLCJnZXRFeHByZXNzaW9uRm9yRGVzY3JpcHRpb24iLCJiaW5kaW5nRXhwcmVzc2lvbiIsIkRlc2NyaXB0aW9uIiwiZ2V0RXhwcmVzc2lvbkZvclNhdmVCdXR0b24iLCJzYXZlQnV0dG9uVGV4dCIsImNyZWF0ZUJ1dHRvblRleHQiLCJzYXZlRXhwcmVzc2lvbiIsImlzU3RpY2t5U2Vzc2lvblN1cHBvcnRlZCIsInN0YXJ0aW5nRW50aXR5U2V0IiwiSXNDcmVhdGVNb2RlU3RpY2t5IiwiRHJhZnQiLCJJc05ld09iamVjdCJdLCJtYXBwaW5ncyI6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Y0FBSjs7QUFDQSxRQUFJQyx3QkFBd0IsQ0FBQzFDLGVBQWUsQ0FBQzJDLGlCQUFqQixDQUE1QixFQUFpRTtBQUNoRTtBQUNBRixNQUFBQSxjQUFjLEdBQUdWLE1BQU0sQ0FBQ1osRUFBRSxDQUFDeUIsa0JBQUosRUFBd0JKLGdCQUF4QixFQUEwQ0QsY0FBMUMsQ0FBdkI7QUFDQSxLQUhELE1BR087QUFDTjtBQUNBRSxNQUFBQSxjQUFjLEdBQUdWLE1BQU0sQ0FBQ2MsS0FBSyxDQUFDQyxXQUFQLEVBQW9CTixnQkFBcEIsRUFBc0NELGNBQXRDLENBQXZCO0FBQ0E7O0FBQ0QsV0FBT1QsY0FBYyxDQUFDVyxjQUFELENBQXJCO0FBQ0EsR0FaTSIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRm9ybWF0dGVycyBmb3IgdGhlIE9iamVjdCBQYWdlXG5pbXBvcnQge1xuXHRhbmQsXG5cdGlmRWxzZSxcblx0aXNFbXB0eSxcblx0Y29uY2F0LFxuXHRhbm5vdGF0aW9uRXhwcmVzc2lvbixcblx0Y29tcGlsZUJpbmRpbmcsXG5cdEJpbmRpbmdFeHByZXNzaW9uXG59IGZyb20gXCJzYXAvZmUvY29yZS9oZWxwZXJzL0JpbmRpbmdFeHByZXNzaW9uXCI7XG5pbXBvcnQgeyBVSSwgRHJhZnQsIEVudGl0eSB9IGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL2hlbHBlcnMvQmluZGluZ0hlbHBlclwiO1xuaW1wb3J0IHsgQ29tbW9uVXRpbHMgfSBmcm9tIFwic2FwL2ZlL2NvcmVcIjtcbmltcG9ydCB7IEhlYWRlckluZm9UeXBlIH0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzXCI7XG5pbXBvcnQgeyBEYXRhTW9kZWxPYmplY3RQYXRoIH0gZnJvbSBcInNhcC9mZS9jb3JlL3RlbXBsYXRpbmcvRGF0YU1vZGVsUGF0aEhlbHBlclwiO1xuaW1wb3J0IHsgYWRkVGV4dEFycmFuZ2VtZW50VG9CaW5kaW5nRXhwcmVzc2lvbiwgZm9ybWF0VmFsdWVSZWN1cnNpdmVseSB9IGZyb20gXCJzYXAvZmUvbWFjcm9zL2ZpZWxkL0ZpZWxkVGVtcGxhdGluZ1wiO1xuaW1wb3J0IHsgRGF0YUZpZWxkVHlwZXMgfSBmcm9tIFwiQHNhcC11eC92b2NhYnVsYXJpZXMtdHlwZXMvZGlzdC9nZW5lcmF0ZWQvVUlcIjtcbmltcG9ydCB7IGlzU3RpY2t5U2Vzc2lvblN1cHBvcnRlZCB9IGZyb20gXCJzYXAvZmUvY29yZS90ZW1wbGF0aW5nL0VudGl0eVNldEhlbHBlclwiO1xuaW1wb3J0IHsgUmVzb3VyY2VCdW5kbGUgfSBmcm9tIFwic2FwL2Jhc2UvaTE4blwiO1xuXG50eXBlIFZpZXdEYXRhID0ge1xuXHRyZXNvdXJjZUJ1bmRsZTogUmVzb3VyY2VCdW5kbGU7XG5cdGVudGl0eVNldDogc3RyaW5nO1xufTtcblxuLy9gYGBtZXJtYWlkXG4vLyBncmFwaCBURFxuLy8gQVtPYmplY3QgUGFnZSBUaXRsZV0gLS0+fEdldCBEYXRhRmllbGQgVmFsdWV8IEN7RXZhbHVhdGUgQ3JlYXRlIE1vZGV9XG4vLyBDIC0tPnxJbiBDcmVhdGUgTW9kZXwgRHtJcyBEYXRhRmllbGQgVmFsdWUgZW1wdHl9XG4vLyBEIC0tPnxZZXN8IEZ7SXMgdGhlcmUgYSBUeXBlTmFtZX1cbi8vIEYgLS0+fFllc3wgR1tJcyB0aGVyZSBhbiBjdXN0b20gdGl0bGVdXG4vLyBHIC0tPnxZZXN8IEcxW1Nob3cgdGhlIGN1c3RvbSB0aXRsZSArICdUeXBlTmFtZSddXG4vLyBHIC0tPnxOb3wgRzJbRGlzcGxheSB0aGUgZGVmYXVsdCB0aXRsZSAnTmV3ICsgVHlwZU5hbWUnXVxuLy8gRiAtLT58Tm98IEhbSXMgdGhlcmUgYSBjdXN0b20gdGl0bGVdXG4vLyBIIC0tPnxZZXN8IElbU2hvdyB0aGUgY3VzdG9tIHRpdGxlXVxuLy8gSCAtLT58Tm98IEpbU2hvdyB0aGUgZGVmYXVsdCAnVW5hbW5lZCBPYmplY3QnXVxuLy8gRCAtLT58Tm98IEVcbi8vIEMgLS0+fE5vdCBpbiBjcmVhdGUgbW9kZXwgRVtTaG93IERhdGFGaWVsZCBWYWx1ZV1cbi8vIGBgYFxuLyoqXG4gKiBDb21wdXRlIHRoZSB0aXRsZSBmb3IgdGhlIG9iamVjdCBwYWdlLlxuICogQHBhcmFtIG9IZWFkZXJJbmZvIFRoZSBAVUkuSGVhZGVySW5mbyBhbm5vdGF0aW9uIGNvbnRlbnRcbiAqIEBwYXJhbSBvVmlld0RhdGEgVGhlIHZpZXcgZGF0YSBvYmplY3Qgd2UncmUgY3VycmVudGx5IG9uXG4gKiBAcGFyYW0gZnVsbENvbnRleHRQYXRoIFRoZSBmdWxsIGNvbnRleHQgcGF0aCB1c2VkIHRvIHJlYWNoIHRoYXQgb2JqZWN0IHBhZ2VcbiAqIEBwYXJhbSBvRHJhZnRSb290XG4gKiBAcmV0dXJucyBUaGUgYmluZGluZyBleHByZXNzaW9uIGZvciB0aGUgb2JqZWN0IHBhZ2UgdGl0bGVcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEV4cHJlc3Npb25Gb3JUaXRsZSA9IGZ1bmN0aW9uKFxuXHRvSGVhZGVySW5mbzogSGVhZGVySW5mb1R5cGUgfCB1bmRlZmluZWQsXG5cdG9WaWV3RGF0YTogVmlld0RhdGEsXG5cdGZ1bGxDb250ZXh0UGF0aDogRGF0YU1vZGVsT2JqZWN0UGF0aCxcblx0b0RyYWZ0Um9vdDogT2JqZWN0IHwgdW5kZWZpbmVkXG4pOiBCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+IHtcblx0Y29uc3QgdGl0bGVOb0hlYWRlckluZm8gPSBDb21tb25VdGlscy5nZXRUcmFuc2xhdGVkVGV4dChcIlRfTkVXX09CSkVDVFwiLCBvVmlld0RhdGEucmVzb3VyY2VCdW5kbGUsIHVuZGVmaW5lZCwgb1ZpZXdEYXRhLmVudGl0eVNldCk7XG5cblx0Y29uc3QgdGl0bGVXaXRoSGVhZGVySW5mbyA9IENvbW1vblV0aWxzLmdldFRyYW5zbGF0ZWRUZXh0KFxuXHRcdFwiVF9BTk5PVEFUSU9OX0hFTFBFUl9ERUZBVUxUX09CSkVDVF9QQUdFX0hFQURFUl9USVRMRVwiLFxuXHRcdG9WaWV3RGF0YS5yZXNvdXJjZUJ1bmRsZSxcblx0XHR1bmRlZmluZWQsXG5cdFx0b1ZpZXdEYXRhLmVudGl0eVNldFxuXHQpO1xuXG5cdGNvbnN0IG9FbXB0eUhlYWRlckluZm9UaXRsZSA9XG5cdFx0b0hlYWRlckluZm8/LlRpdGxlID09PSB1bmRlZmluZWQgfHwgb0hlYWRlckluZm8/LlRpdGxlID09PSBcIlwiIHx8IChvSGVhZGVySW5mbz8uVGl0bGUgYXMgRGF0YUZpZWxkVHlwZXMpPy5WYWx1ZSA9PT0gXCJcIjtcblxuXHRjb25zdCB0aXRsZUZvckFjdGl2ZUhlYWRlck5vSGVhZGVySW5mbyA9ICFvRW1wdHlIZWFkZXJJbmZvVGl0bGVcblx0XHQ/IENvbW1vblV0aWxzLmdldFRyYW5zbGF0ZWRUZXh0KFwiVF9BTk5PVEFUSU9OX0hFTFBFUl9ERUZBVUxUX09CSkVDVF9QQUdFX0hFQURFUl9USVRMRV9OT19IRUFERVJfSU5GT1wiLCBvVmlld0RhdGEucmVzb3VyY2VCdW5kbGUpXG5cdFx0OiBcIlwiO1xuXG5cdGxldCB0aXRsZVZhbHVlRXhwcmVzc2lvbiA9IGFubm90YXRpb25FeHByZXNzaW9uKChvSGVhZGVySW5mbz8uVGl0bGUgYXMgRGF0YUZpZWxkVHlwZXMpPy5WYWx1ZSk7XG5cdGlmICgob0hlYWRlckluZm8/LlRpdGxlIGFzIERhdGFGaWVsZFR5cGVzKT8uVmFsdWU/LiR0YXJnZXQ/LmFubm90YXRpb25zPy5Db21tb24/LlRleHQ/LmFubm90YXRpb25zPy5VST8uVGV4dEFycmFuZ2VtZW50KSB7XG5cdFx0Ly8gSW4gY2FzZSBhbiBleHBsaWNpdCB0ZXh0IGFycmFuZ2VtZW50IHdhcyBzZXQgd2UgbWFrZSB1c2Ugb2YgaXQgaW4gdGhlIGRlc2NyaXB0aW9uIGFzIHdlbGxcblx0XHR0aXRsZVZhbHVlRXhwcmVzc2lvbiA9IGFkZFRleHRBcnJhbmdlbWVudFRvQmluZGluZ0V4cHJlc3Npb24odGl0bGVWYWx1ZUV4cHJlc3Npb24sIGZ1bGxDb250ZXh0UGF0aCk7XG5cdH1cblxuXHR0aXRsZVZhbHVlRXhwcmVzc2lvbiA9IGZvcm1hdFZhbHVlUmVjdXJzaXZlbHkodGl0bGVWYWx1ZUV4cHJlc3Npb24sIGZ1bGxDb250ZXh0UGF0aCk7XG5cblx0Ly8gSWYgdGhlcmUgaXMgYSBUeXBlTmFtZSBkZWZpbmVkLCBzaG93IHRoZSBkZWZhdWx0IHRpdGxlICdOZXcgKyBUeXBlTmFtZScsIG90aGVyd2lzZSBzaG93IHRoZSBjdXN0b20gdGl0bGUgb3IgdGhlIGRlZmF1bHQgJ05ldyBvYmplY3QnXG5cdGNvbnN0IGNyZWF0ZU1vZGVUaXRsZSA9IG9IZWFkZXJJbmZvPy5UeXBlTmFtZVxuXHRcdD8gY29uY2F0KHRpdGxlV2l0aEhlYWRlckluZm8sIFwiOiBcIiwgYW5ub3RhdGlvbkV4cHJlc3Npb24ob0hlYWRlckluZm8uVHlwZU5hbWUudG9TdHJpbmcoKSkpXG5cdFx0OiB0aXRsZU5vSGVhZGVySW5mbztcblx0Y29uc3QgYWN0aXZlRXhwcmVzc2lvbiA9IG9EcmFmdFJvb3QgPyBFbnRpdHkuSXNBY3RpdmUgOiB0cnVlO1xuXG5cdHJldHVybiBjb21waWxlQmluZGluZyhcblx0XHRpZkVsc2UoXG5cdFx0XHQvLyBJZiBDcmVhdGUgTW9kZSAmJiBFbXB0eSBleHByZXNzaW9uXG5cdFx0XHRhbmQoVUkuSXNDcmVhdGVNb2RlLCB0aXRsZVZhbHVlRXhwcmVzc2lvbiAmJiBpc0VtcHR5KHRpdGxlVmFsdWVFeHByZXNzaW9uKSksXG5cblx0XHRcdGNyZWF0ZU1vZGVUaXRsZSxcblx0XHRcdC8vIE90aGVyd2lzZSBzaG93IHRoZSBkZWZhdWx0IGV4cHJlc3Npb25cblx0XHRcdGlmRWxzZShcblx0XHRcdFx0YW5kKGFjdGl2ZUV4cHJlc3Npb24sIHRpdGxlVmFsdWVFeHByZXNzaW9uICYmIGlzRW1wdHkodGl0bGVWYWx1ZUV4cHJlc3Npb24pKSxcblx0XHRcdFx0dGl0bGVGb3JBY3RpdmVIZWFkZXJOb0hlYWRlckluZm8sXG5cdFx0XHRcdHRpdGxlVmFsdWVFeHByZXNzaW9uXG5cdFx0XHQpXG5cdFx0KVxuXHQpO1xufTtcblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIGV4cHJlc3Npb24gZm9yIHRoZSBkZXNjcmlwdGlvbiBvZiBhbiBvYmplY3QgcGFnZS5cbiAqXG4gKiBAcGFyYW0gb0hlYWRlckluZm8gVGhlIEBVSS5IZWFkZXJJbmZvIGFubm90YXRpb24gY29udGVudFxuICogQHBhcmFtIGZ1bGxDb250ZXh0UGF0aCBUaGUgZnVsbCBjb250ZXh0IHBhdGggdXNlZCB0byByZWFjaCB0aGF0IG9iamVjdCBwYWdlXG4gKiBAcmV0dXJucyBUaGUgYmluZGluZyBleHByZXNzaW9uIGZvciB0aGUgb2JqZWN0IHBhZ2UgZGVzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEV4cHJlc3Npb25Gb3JEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKFxuXHRvSGVhZGVySW5mbzogSGVhZGVySW5mb1R5cGUgfCB1bmRlZmluZWQsXG5cdGZ1bGxDb250ZXh0UGF0aDogRGF0YU1vZGVsT2JqZWN0UGF0aFxuKTogQmluZGluZ0V4cHJlc3Npb248c3RyaW5nPiB7XG5cdGxldCBiaW5kaW5nRXhwcmVzc2lvbiA9IGFubm90YXRpb25FeHByZXNzaW9uKChvSGVhZGVySW5mbz8uRGVzY3JpcHRpb24gYXMgRGF0YUZpZWxkVHlwZXMpPy5WYWx1ZSk7XG5cdGlmICgob0hlYWRlckluZm8/LkRlc2NyaXB0aW9uIGFzIERhdGFGaWVsZFR5cGVzKT8uVmFsdWU/LiR0YXJnZXQ/LmFubm90YXRpb25zPy5Db21tb24/LlRleHQ/LmFubm90YXRpb25zPy5VST8uVGV4dEFycmFuZ2VtZW50KSB7XG5cdFx0Ly8gSW4gY2FzZSBhbiBleHBsaWNpdCB0ZXh0IGFycmFuZ2VtZW50IHdhcyBzZXQgd2UgbWFrZSB1c2Ugb2YgaXQgaW4gdGhlIGRlc2NyaXB0aW9uIGFzIHdlbGxcblx0XHRiaW5kaW5nRXhwcmVzc2lvbiA9IGFkZFRleHRBcnJhbmdlbWVudFRvQmluZGluZ0V4cHJlc3Npb24oYmluZGluZ0V4cHJlc3Npb24sIGZ1bGxDb250ZXh0UGF0aCk7XG5cdH1cblxuXHRyZXR1cm4gY29tcGlsZUJpbmRpbmcoZm9ybWF0VmFsdWVSZWN1cnNpdmVseShiaW5kaW5nRXhwcmVzc2lvbiwgZnVsbENvbnRleHRQYXRoKSk7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgZXhwcmVzc2lvbiBmb3IgdGhlIHNhdmUgYnV0dG9uLlxuICpcbiAqIEBwYXJhbSBvVmlld0RhdGEgVGhlIGN1cnJlbnQgdmlldyBkYXRhXG4gKiBAcGFyYW0gZnVsbENvbnRleHRQYXRoIFRoZSBwYXRoIHVzZWQgdXAgdW50aWwgaGVyZVxuICogQHJldHVybnMgVGhlIGJpbmRpbmcgZXhwcmVzc2lvbiB0aGF0IHNob3dzIHRoZSByaWdodCBzYXZlIGJ1dHRvbiB0ZXh0XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRFeHByZXNzaW9uRm9yU2F2ZUJ1dHRvbiA9IGZ1bmN0aW9uKG9WaWV3RGF0YTogVmlld0RhdGEsIGZ1bGxDb250ZXh0UGF0aDogRGF0YU1vZGVsT2JqZWN0UGF0aCk6IEJpbmRpbmdFeHByZXNzaW9uPHN0cmluZz4ge1xuXHRjb25zdCBzYXZlQnV0dG9uVGV4dCA9IENvbW1vblV0aWxzLmdldFRyYW5zbGF0ZWRUZXh0KFwiVF9PUF9PQkpFQ1RfUEFHRV9TQVZFXCIsIG9WaWV3RGF0YS5yZXNvdXJjZUJ1bmRsZSk7XG5cdGNvbnN0IGNyZWF0ZUJ1dHRvblRleHQgPSBDb21tb25VdGlscy5nZXRUcmFuc2xhdGVkVGV4dChcIlRfT1BfT0JKRUNUX1BBR0VfQ1JFQVRFXCIsIG9WaWV3RGF0YS5yZXNvdXJjZUJ1bmRsZSk7XG5cdGxldCBzYXZlRXhwcmVzc2lvbjtcblx0aWYgKGlzU3RpY2t5U2Vzc2lvblN1cHBvcnRlZChmdWxsQ29udGV4dFBhdGguc3RhcnRpbmdFbnRpdHlTZXQpKSB7XG5cdFx0Ly8gSWYgd2UncmUgaW4gc3RpY2t5IG1vZGUgQU5EIHRoZSB1aSBpcyBpbiBjcmVhdGUgbW9kZSwgc2hvdyBDcmVhdGUsIGVsc2Ugc2hvdyBTYXZlXG5cdFx0c2F2ZUV4cHJlc3Npb24gPSBpZkVsc2UoVUkuSXNDcmVhdGVNb2RlU3RpY2t5LCBjcmVhdGVCdXR0b25UZXh0LCBzYXZlQnV0dG9uVGV4dCk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gSWYgd2UncmUgaW4gZHJhZnQgQU5EIHRoZSBkcmFmdCBpcyBhIG5ldyBvYmplY3QgKCFJc0FjdGl2ZUVudGl0eSAmJiAhSGFzQWN0aXZlRW50aXR5KSwgc2hvdyBjcmVhdGUsIGVsc2Ugc2hvdyBzYXZlXG5cdFx0c2F2ZUV4cHJlc3Npb24gPSBpZkVsc2UoRHJhZnQuSXNOZXdPYmplY3QsIGNyZWF0ZUJ1dHRvblRleHQsIHNhdmVCdXR0b25UZXh0KTtcblx0fVxuXHRyZXR1cm4gY29tcGlsZUJpbmRpbmcoc2F2ZUV4cHJlc3Npb24pO1xufTtcbiJdfQ==