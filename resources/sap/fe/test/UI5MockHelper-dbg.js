/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define([], function () {
  "use strict";

  var _exports = {};

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /**
   * Mock class for a V4 Context
   */
  var MockContext = function MockContext(oValues, oBinding) {
    var _this = this;

    _classCallCheck(this, MockContext);

    _defineProperty(this, "getProperty", jest.fn(function (key) {
      return _this.oValues[key];
    }));

    _defineProperty(this, "setProperty", jest.fn(function (key, value) {
      _this.oValues[key] = value;
      return _this.oValues[key];
    }));

    _defineProperty(this, "getObject", jest.fn(function (key) {
      return _this.oValues[key];
    }));

    _defineProperty(this, "getPath", jest.fn(function () {
      return _this.oValues["$path"];
    }));

    _defineProperty(this, "getBinding", jest.fn(function () {
      return _this.oBinding;
    }));

    _defineProperty(this, "getModel", jest.fn());

    this.oValues = oValues;
    this.oBinding = oBinding;
  };

  _exports.MockContext = MockContext;

  var MockControl = function MockControl() {
    _classCallCheck(this, MockControl);

    _defineProperty(this, "getBindingInfo", jest.fn());

    _defineProperty(this, "getBinding", jest.fn());

    _defineProperty(this, "data", jest.fn());

    _defineProperty(this, "getModel", jest.fn());
  };
  /**
   * Mock class for OData V4 ListBinding
   */


  _exports.MockControl = MockControl;

  var MockListBinding = /*#__PURE__*/function () {
    function MockListBinding(aContexts) {
      var _this2 = this;

      _classCallCheck(this, MockListBinding);

      _defineProperty(this, "setAggregation", jest.fn());

      _defineProperty(this, "filter", jest.fn());

      _defineProperty(this, "sort", jest.fn());

      _defineProperty(this, "requestContexts", jest.fn(function () {
        return Promise.resolve(_this2.aMockContexts);
      }));

      _defineProperty(this, "getCurrentContexts", jest.fn(function () {
        return _this2.aMockContexts;
      }));

      aContexts = aContexts || [];
      this.aMockContexts = aContexts.map(function (context) {
        return new MockContext(context, _this2);
      });
    }

    _exports.MockListBinding = MockListBinding;

    _createClass(MockListBinding, [{
      key: "isA",
      value: function isA(sClassName) {
        return sClassName === "sap.ui.model.odata.v4.ODataListBinding";
      } // Mocked API

    }]);

    return MockListBinding;
  }();

  _exports.MockListBinding = MockListBinding;

  var MockContextBinding = /*#__PURE__*/function () {
    function MockContextBinding(oContext) {
      var _this3 = this;

      _classCallCheck(this, MockContextBinding);

      _defineProperty(this, "getBoundContext", jest.fn(function () {
        return _this3.oMockContext;
      }));

      _defineProperty(this, "attachEventOnce", jest.fn());

      this.oMockContext = new MockContext(oContext || {}, this);
    }

    _exports.MockContextBinding = MockContextBinding;

    _createClass(MockContextBinding, [{
      key: "isA",
      value: function isA(sClassName) {
        return sClassName === "sap.ui.model.odata.v4.ODataContextBinding";
      }
    }, {
      key: "getInternalMockContext",
      value: function getInternalMockContext() {
        return this.oMockContext;
      } // Mocked API

    }]);

    return MockContextBinding;
  }();
  /**
   * Mock class for OData V4 MetaModel
   */


  _exports.MockContextBinding = MockContextBinding;

  var MockMetaModel = function MockMetaModel(oMetaData) {
    var _this4 = this;

    _classCallCheck(this, MockMetaModel);

    _defineProperty(this, "getMetaContext", jest.fn(function (sPath) {
      return new MockContext({
        $path: sPath
      });
    }));

    _defineProperty(this, "getObject", jest.fn(function (sPath) {
      return _this4.oMetaContext.getProperty(sPath);
    }));

    _defineProperty(this, "requestObject", jest.fn());

    _defineProperty(this, "createBindingContext", jest.fn());

    _defineProperty(this, "getMetaPath", jest.fn());

    this.oMetaContext = new MockContext(oMetaData || {});
  } // Mocked API
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  /**
   * Mock class for OData V4 Model
   */


  _exports.MockMetaModel = MockMetaModel;

  var MockModel = /*#__PURE__*/function () {
    function MockModel(mockListBinding, mockContextBinding) {
      var _this5 = this;

      _classCallCheck(this, MockModel);

      _defineProperty(this, "bindList", jest.fn(function () {
        return _this5.mockListBinding;
      }));

      _defineProperty(this, "bindContext", jest.fn(function () {
        return _this5.mockContextBinding;
      }));

      _defineProperty(this, "getMetaModel", jest.fn(function () {
        return _this5.oMetaModel;
      }));

      _defineProperty(this, "getProperty", jest.fn());

      _defineProperty(this, "setProperty", jest.fn());

      this.mockListBinding = mockListBinding;
      this.mockContextBinding = mockContextBinding;
    } // Factories


    _exports.MockModel = MockModel;

    _createClass(MockModel, [{
      key: "setMetaModel",
      value: function setMetaModel(oMetaModel) {
        this.oMetaModel = oMetaModel;
      } // Mocked API
      // eslint-disable-next-line @typescript-eslint/no-unused-vars

    }], [{
      key: "modelFromListBinding",
      value: function modelFromListBinding(mockListBinding) {
        return new MockModel(mockListBinding);
      }
    }, {
      key: "modelFromContextBinding",
      value: function modelFromContextBinding(mockContextBinding) {
        return new MockModel(undefined, mockContextBinding);
      }
    }]);

    return MockModel;
  }();

  _exports.MockModel = MockModel;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVJNU1vY2tIZWxwZXIudHMiXSwibmFtZXMiOlsiTW9ja0NvbnRleHQiLCJvVmFsdWVzIiwib0JpbmRpbmciLCJqZXN0IiwiZm4iLCJrZXkiLCJ2YWx1ZSIsIk1vY2tDb250cm9sIiwiTW9ja0xpc3RCaW5kaW5nIiwiYUNvbnRleHRzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJhTW9ja0NvbnRleHRzIiwibWFwIiwiY29udGV4dCIsInNDbGFzc05hbWUiLCJNb2NrQ29udGV4dEJpbmRpbmciLCJvQ29udGV4dCIsIm9Nb2NrQ29udGV4dCIsIk1vY2tNZXRhTW9kZWwiLCJvTWV0YURhdGEiLCJzUGF0aCIsIiRwYXRoIiwib01ldGFDb250ZXh0IiwiZ2V0UHJvcGVydHkiLCJNb2NrTW9kZWwiLCJtb2NrTGlzdEJpbmRpbmciLCJtb2NrQ29udGV4dEJpbmRpbmciLCJvTWV0YU1vZGVsIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQUZBO0FBQ0E7QUFDQTtNQUlhQSxXLEdBQ1oscUJBQTJCQyxPQUEzQixFQUFpREMsUUFBakQsRUFBaUU7QUFBQTs7QUFBQTs7QUFBQSx5Q0FFNUNDLElBQUksQ0FBQ0MsRUFBTCxDQUFRLFVBQUNDLEdBQUQsRUFBaUI7QUFDN0MsYUFBTyxLQUFJLENBQUNKLE9BQUwsQ0FBYUksR0FBYixDQUFQO0FBQ0EsS0FGb0IsQ0FGNEM7O0FBQUEseUNBSzVDRixJQUFJLENBQUNDLEVBQUwsQ0FBUSxVQUFDQyxHQUFELEVBQWNDLEtBQWQsRUFBNkI7QUFDekQsTUFBQSxLQUFJLENBQUNMLE9BQUwsQ0FBYUksR0FBYixJQUFvQkMsS0FBcEI7QUFDQSxhQUFPLEtBQUksQ0FBQ0wsT0FBTCxDQUFhSSxHQUFiLENBQVA7QUFDQSxLQUhvQixDQUw0Qzs7QUFBQSx1Q0FVOUNGLElBQUksQ0FBQ0MsRUFBTCxDQUFRLFVBQUNDLEdBQUQsRUFBaUI7QUFDM0MsYUFBTyxLQUFJLENBQUNKLE9BQUwsQ0FB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dCI6WyIvKipcbiAqIE1vY2sgY2xhc3MgZm9yIGEgVjQgQ29udGV4dFxuICovXG5cbmltcG9ydCB7IENvbnRleHQsIE9EYXRhTGlzdEJpbmRpbmcsIE9EYXRhQ29udGV4dEJpbmRpbmcsIE9EYXRhTWV0YU1vZGVsLCBPRGF0YU1vZGVsIH0gZnJvbSBcInNhcC91aS9tb2RlbC9vZGF0YS92NFwiO1xuXG5leHBvcnQgY2xhc3MgTW9ja0NvbnRleHQgaW1wbGVtZW50cyBQYXJ0aWFsPENvbnRleHQ+IHtcblx0cHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgb1ZhbHVlczogYW55LCBwcml2YXRlIG9CaW5kaW5nPzogYW55KSB7fVxuXG5cdHB1YmxpYyBnZXRQcm9wZXJ0eSA9IGplc3QuZm4oKGtleTogc3RyaW5nKSA9PiB7XG5cdFx0cmV0dXJuIHRoaXMub1ZhbHVlc1trZXldO1xuXHR9KTtcblx0cHVibGljIHNldFByb3BlcnR5ID0gamVzdC5mbigoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpID0+IHtcblx0XHR0aGlzLm9WYWx1ZXNba2V5XSA9IHZhbHVlO1xuXHRcdHJldHVybiB0aGlzLm9WYWx1ZXNba2V5XTtcblx0fSk7XG5cblx0cHVibGljIGdldE9iamVjdCA9IGplc3QuZm4oKGtleTogc3RyaW5nKSA9PiB7XG5cdFx0cmV0dXJuIHRoaXMub1ZhbHVlc1trZXldO1xuXHR9KTtcblx0cHVibGljIGdldFBhdGggPSBqZXN0LmZuKCgpID0+IHtcblx0XHRyZXR1cm4gdGhpcy5vVmFsdWVzW1wiJHBhdGhcIl07XG5cdH0pO1xuXG5cdHB1YmxpYyBnZXRCaW5kaW5nID0gamVzdC5mbigoKSA9PiB7XG5cdFx0cmV0dXJuIHRoaXMub0JpbmRpbmc7XG5cdH0pO1xuXHRwdWJsaWMgZ2V0TW9kZWwgPSBqZXN0LmZuKCk7XG59XG5cbmV4cG9ydCBjbGFzcyBNb2NrQ29udHJvbCB7XG5cdHB1YmxpYyBnZXRCaW5kaW5nSW5mbyA9IGplc3QuZm4oKTtcblx0cHVibGljIGdldEJpbmRpbmcgPSBqZXN0LmZuKCk7XG5cdHB1YmxpYyBkYXRhID0gamVzdC5mbigpO1xuXHRwdWJsaWMgZ2V0TW9kZWwgPSBqZXN0LmZuKCk7XG59XG5cbi8qKlxuICogTW9jayBjbGFzcyBmb3IgT0RhdGEgVjQgTGlzdEJpbmRpbmdcbiAqL1xuZXhwb3J0IGNsYXNzIE1vY2tMaXN0QmluZGluZyBpbXBsZW1lbnRzIFBhcnRpYWw8T0RhdGFMaXN0QmluZGluZz4ge1xuXHRwcml2YXRlIGFNb2NrQ29udGV4dHM6IE1vY2tDb250ZXh0W107XG5cblx0cHVibGljIGNvbnN0cnVjdG9yKGFDb250ZXh0cz86IGFueVtdKSB7XG5cdFx0YUNvbnRleHRzID0gYUNvbnRleHRzIHx8IFtdO1xuXG5cdFx0dGhpcy5hTW9ja0NvbnRleHRzID0gYUNvbnRleHRzLm1hcChjb250ZXh0ID0+IHtcblx0XHRcdHJldHVybiBuZXcgTW9ja0NvbnRleHQoY29udGV4dCwgdGhpcyk7XG5cdFx0fSk7XG5cdH1cblxuXHRwdWJsaWMgaXNBKHNDbGFzc05hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiBzQ2xhc3NOYW1lID09PSBcInNhcC51aS5tb2RlbC5vZGF0YS52NC5PRGF0YUxpc3RCaW5kaW5nXCI7XG5cdH1cblxuXHQvLyBNb2NrZWQgQVBJXG5cdHB1YmxpYyBzZXRBZ2dyZWdhdGlvbiA9IGplc3QuZm4oKTtcblx0cHVibGljIGZpbHRlciA9IGplc3QuZm4oKTtcblx0cHVibGljIHNvcnQgPSBqZXN0LmZuKCk7XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuXHRwdWJsaWMgcmVxdWVzdENvbnRleHRzID0gamVzdC5mbigoLi4uYXJncykgPT4ge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKHRoaXMuYU1vY2tDb250ZXh0cyBhcyBhbnkpIGFzIENvbnRleHRbXSk7XG5cdH0pO1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG5cdHB1YmxpYyBnZXRDdXJyZW50Q29udGV4dHMgPSBqZXN0LmZuKCguLi5hcmdzKSA9PiB7XG5cdFx0cmV0dXJuICh0aGlzLmFNb2NrQ29udGV4dHMgYXMgYW55KSBhcyBDb250ZXh0W107XG5cdH0pO1xufVxuXG5leHBvcnQgY2xhc3MgTW9ja0NvbnRleHRCaW5kaW5nIGltcGxlbWVudHMgUGFydGlhbDxPRGF0YUNvbnRleHRCaW5kaW5nPiB7XG5cdHByaXZhdGUgb01vY2tDb250ZXh0OiBNb2NrQ29udGV4dDtcblxuXHRwdWJsaWMgY29uc3RydWN0b3Iob0NvbnRleHQ/OiBhbnkpIHtcblx0XHR0aGlzLm9Nb2NrQ29udGV4dCA9IG5ldyBNb2NrQ29udGV4dChvQ29udGV4dCB8fCB7fSwgdGhpcyk7XG5cdH1cblxuXHRwdWJsaWMgaXNBKHNDbGFzc05hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiBzQ2xhc3NOYW1lID09PSBcInNhcC51aS5tb2RlbC5vZGF0YS52NC5PRGF0YUNvbnRleHRCaW5kaW5nXCI7XG5cdH1cblx0cHVibGljIGdldEludGVybmFsTW9ja0NvbnRleHQoKTogTW9ja0NvbnRleHQge1xuXHRcdHJldHVybiB0aGlzLm9Nb2NrQ29udGV4dDtcblx0fVxuXG5cdC8vIE1vY2tlZCBBUElcblx0cHVibGljIGdldEJvdW5kQ29udGV4dCA9IGplc3QuZm4oKCkgPT4ge1xuXHRcdHJldHVybiAodGhpcy5vTW9ja0NvbnRleHQgYXMgYW55KSBhcyBDb250ZXh0O1xuXHR9KTtcblx0cHVibGljIGF0dGFjaEV2ZW50T25jZSA9IGplc3QuZm4oKTtcbn1cblxuLyoqXG4gKiBNb2NrIGNsYXNzIGZvciBPRGF0YSBWNCBNZXRhTW9kZWxcbiAqL1xuZXhwb3J0IGNsYXNzIE1vY2tNZXRhTW9kZWwgaW1wbGVtZW50cyBQYXJ0aWFsPE9EYXRhTWV0YU1vZGVsPiB7XG5cdHByaXZhdGUgb01ldGFDb250ZXh0OiBNb2NrQ29udGV4dDtcblxuXHRwdWJsaWMgY29uc3RydWN0b3Iob01ldGFEYXRhPzogYW55KSB7XG5cdFx0dGhpcy5vTWV0YUNvbnRleHQgPSBuZXcgTW9ja0NvbnRleHQob01ldGFEYXRhIHx8IHt9KTtcblx0fVxuXG5cdC8vIE1vY2tlZCBBUElcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuXHRwdWJsaWMgZ2V0TWV0YUNvbnRleHQgPSBqZXN0LmZuKChzUGF0aDogc3RyaW5nKSA9PiB7XG5cdFx0cmV0dXJuIChuZXcgTW9ja0NvbnRleHQoeyAkcGF0aDogc1BhdGggfSkgYXMgYW55KSBhcyBDb250ZXh0O1xuXHR9KTtcblx0cHVibGljIGdldE9iamVjdCA9IGplc3QuZm4oKHNQYXRoOiBzdHJpbmcpID0+IHtcblx0XHRyZXR1cm4gdGhpcy5vTWV0YUNvbnRleHQuZ2V0UHJvcGVydHkoc1BhdGgpO1xuXHR9KTtcblx0cHVibGljIHJlcXVlc3RPYmplY3QgPSBqZXN0LmZuKCk7XG5cdHB1YmxpYyBjcmVhdGVCaW5kaW5nQ29udGV4dCA9IGplc3QuZm4oKTtcblx0cHVibGljIGdldE1ldGFQYXRoID0gamVzdC5mbigpO1xufVxuXG4vKipcbiAqIE1vY2sgY2xhc3MgZm9yIE9EYXRhIFY0IE1vZGVsXG4gKi9cblxuZXhwb3J0IGNsYXNzIE1vY2tNb2RlbCBpbXBsZW1lbnRzIFBhcnRpYWw8T0RhdGFNb2RlbD4ge1xuXHRwcml2YXRlIG9NZXRhTW9kZWw/OiBNb2NrTWV0YU1vZGVsO1xuXG5cdHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vY2tMaXN0QmluZGluZz86IE1vY2tMaXN0QmluZGluZywgcHJpdmF0ZSBtb2NrQ29udGV4dEJpbmRpbmc/OiBNb2NrQ29udGV4dEJpbmRpbmcpIHt9XG5cblx0Ly8gRmFjdG9yaWVzXG5cdHN0YXRpYyBtb2RlbEZyb21MaXN0QmluZGluZyhtb2NrTGlzdEJpbmRpbmc6IE1vY2tMaXN0QmluZGluZyk6IE1vY2tNb2RlbCB7XG5cdFx0cmV0dXJuIG5ldyBNb2NrTW9kZWwobW9ja0xpc3RCaW5kaW5nKTtcblx0fVxuXHRzdGF0aWMgbW9kZWxGcm9tQ29udGV4dEJpbmRpbmcobW9ja0NvbnRleHRCaW5kaW5nOiBNb2NrQ29udGV4dEJpbmRpbmcpOiBNb2NrTW9kZWwge1xuXHRcdHJldHVybiBuZXcgTW9ja01vZGVsKHVuZGVmaW5lZCwgbW9ja0NvbnRleHRCaW5kaW5nKTtcblx0fVxuXG5cdHB1YmxpYyBzZXRNZXRhTW9kZWwob01ldGFNb2RlbDogTW9ja01ldGFNb2RlbCkge1xuXHRcdHRoaXMub01ldGFNb2RlbCA9IG9NZXRhTW9kZWw7XG5cdH1cblxuXHQvLyBNb2NrZWQgQVBJXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcblx0cHVibGljIGJpbmRMaXN0ID0gamVzdC5mbigoLi4uYXJncykgPT4ge1xuXHRcdHJldHVybiAodGhpcy5tb2NrTGlzdEJpbmRpbmcgYXMgYW55KSBhcyBPRGF0YUxpc3RCaW5kaW5nO1xuXHR9KTtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuXHRwdWJsaWMgYmluZENvbnRleHQgPSBqZXN0LmZuKCguLi5hcmdzKSA9PiB7XG5cdFx0cmV0dXJuICh0aGlzLm1vY2tDb250ZXh0QmluZGluZyBhcyBhbnkpIGFzIE9EYXRhQ29udGV4dEJpbmRpbmc7XG5cdH0pO1xuXHRwdWJsaWMgZ2V0TWV0YU1vZGVsID0gamVzdC5mbigoKSA9PiB7XG5cdFx0cmV0dXJuICh0aGlzLm9NZXRhTW9kZWwgYXMgYW55KSBhcyBPRGF0YU1ldGFNb2RlbDtcblx0fSk7XG5cblx0cHVibGljIGdldFByb3BlcnR5ID0gamVzdC5mbigpO1xuXHRwdWJsaWMgc2V0UHJvcGVydHkgPSBqZXN0LmZuKCk7XG59XG4iXX0=