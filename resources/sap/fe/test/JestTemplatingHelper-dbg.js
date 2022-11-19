/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/macros/PhantomUtil", "sap/ui/model/odata/v4/lib/_MetadataRequestor", "sap/ui/model/odata/v4/ODataMetaModel", "sap/ui/core/util/XMLPreprocessor", "sap/base/Log", "xpath", "fs", "@sap/cds-compiler", "prettier", "sap/ui/base/BindingParser", "sap/ui/model/json/JSONModel", "sap/ui/core/InvisibleText", "sap/base/util/merge", "path", "sap/fe/core/converters/ConverterContext", "sap/fe/core/services/SideEffectsServiceFactory", "sap/fe/core/TemplateModel"], function (PhantomUtil, _MetadataRequestor, ODataMetaModel, XMLPreprocessor, Log, xpath, fs, cds_compiler, prettier, BindingParser, JSONModel, InvisibleText, merge, path, ConverterContext, SideEffectsFactory, TemplateModel) {
  "use strict";

  var _exports = {};
  var format = prettier.format;
  var to = cds_compiler.to;
  var compileSources = cds_compiler.compileSources;

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function () {}; return { s: F, n: function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function (e) { throw e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function () { it = it.call(o); }, n: function () { var step = it.next(); normalCompletion = step.done; return step; }, e: function (e) { didErr = true; err = e; }, f: function () { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  /**
   * Process the requested XML fragment with the provided data.
   *
   * @param {string} name Fully qualified name of the fragment to be tested.
   * @param {object} testData Test data consisting
   * @returns Tempalted fragment as string
   */
  var processFragment = function (name, testData) {
    try {
      var inputXml = "<root><core:Fragment fragmentName=\"".concat(name, "\" type=\"XML\" xmlns:core=\"sap.ui.core\" /></root>");
      var parser = new window.DOMParser();
      var inputDoc = parser.parseFromString(inputXml, "text/xml"); // build model and bindings for given test data

      var settings = {
        models: {},
        bindingContexts: {}
      };

      for (var _model in testData) {
        var jsonModel = new JSONModel();
        jsonModel.setData(testData[_model]);
        settings.models[_model] = jsonModel;
        settings.bindingContexts[_model] = settings.models[_model].createBindingContext("/");
      } // execute the pre-processor


      return Promise.resolve(XMLPreprocessor.process(inputDoc.firstElementChild, {
        name: name
      }, settings)).then(function (resultDoc) {
        // exclude nested fragments from test snapshots
        var fragments = resultDoc.getElementsByTagName("core:Fragment");

        if ((fragments === null || fragments === void 0 ? void 0 : fragments.length) > 0) {
          var _iterator = _createForOfIteratorHelper(fragments),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var fragment = _step.value;
              fragment.innerHTML = "";
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }

        return formatXml(resultDoc.innerHTML, {
          filter: function (node) {
            return node.type !== "Comment";
          }
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _exports.processFragment = processFragment;

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  var formatXml = require("xml-formatter"); // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore


  Log.setLevel(1, "sap.ui.core.util.XMLPreprocessor");
  jest.setTimeout(40000);
  var nameSpaceMap = {
    "macros": "sap.fe.macros",
    "macro": "sap.fe.macros",
    "macrodata": "http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1",
    "log": "http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1",
    "unittest": "http://schemas.sap.com/sapui5/preprocessorextension/sap.fe.unittesting/1",
    "control": "sap.fe.core.controls",
    "core": "sap.ui.core",
    "m": "sap.m",
    "f": "sap.ui.layout.form",
    "mdc": "sap.ui.mdc",
    "mdcField": "sap.ui.mdc.field",
    "u": "sap.ui.unified",
    "macroMicroChart": "sap.fe.macros.microchart",
    "microChart": "sap.suite.ui.microchart"
  };
  var select = xpath.useNamespaces(nameSpaceMap);

  var registerMacro = function (macroMetadata) {
    PhantomUtil.register(macroMetadata);
  };

  _exports.registerMacro = registerMacro;

  var unregisterMacro = function (macroMetadata) {
    XMLPreprocessor.plugIn(null, macroMetadata.namespace, macroMetadata.name);

    if (macroMetadata.publicName) {
      XMLPreprocessor.plugIn(null, macroMetadata.publicNamespace, macroMetadata.publicName);
    }
  };

  _exports.unregisterMacro = unregisterMacro;

  var runXPathQuery = function (selector, xmldom) {
    return select(selector, xmldom);
  };

  expect.extend({
    toHaveControl: function (xmldom, selector) {
      var nodes = runXPathQuery("/root".concat(selector), xmldom);
      return {
        message: function () {
          var outputXml = serializeXML(xmldom);
          return "did not find controls matching ".concat(selector, " in generated xml:\n ").concat(outputXml);
        },
        pass: nodes && nodes.length >= 1
      };
    },
    toNotHaveControl: function (xmldom, selector) {
      var nodes = runXPathQuery("/root".concat(selector), xmldom);
      return {
        message: function () {
          var outputXml = serializeXML(xmldom);
          return "There is a control matching ".concat(selector, " in generated xml:\n ").concat(outputXml);
        },
        pass: nodes && nodes.length === 0
      };
    }
  });
  _exports.runXPathQuery = runXPathQuery;

  var getControlAttribute = function (controlSelector, attributeName, xmlDom) {
    var selector = "string(/root".concat(controlSelector, "/@").concat(attributeName, ")");
    return runXPathQuery(selector, xmlDom);
  };

  _exports.getControlAttribute = getControlAttribute;

  var serializeXML = function (xmlDom) {
    var serializer = new window.XMLSerializer();
    var xmlString = serializer.serializeToString(xmlDom).replace(/(?:[\t ]*(?:\r?\n|\r))+/g, "\n").replace(/\\"/g, '"');
    return format(xmlString, {
      parser: "html"
    });
  };
  /**
   * Compile a CDS file into an EDMX file.
   *
   * @param {string} sCDSUrl The path to the file containing the CDS definition. This file MUST declare the namespace
   * sap.fe.test and a service JestService
   * @returns {string} The path of the generated EDMX
   */


  _exports.serializeXML = serializeXML;

  var compileCDS = function (sCDSUrl) {
    var cdsString = fs.readFileSync(sCDSUrl, "utf-8");
    var csn = compileSources({
      "string.cds": cdsString
    }, {});
    var edmxContent = to.edmx(csn, {
      service: "sap.fe.test.JestService"
    });
    var dir = path.resolve(sCDSUrl, "..", "gen");
    var edmxUrl = path.resolve(dir, path.basename(sCDSUrl).replace(".cds", ".xml"));

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFileSync(edmxUrl, edmxContent);
    return edmxUrl;
  };

  _exports.compileCDS = compileCDS;

  var getFakeSideEffectsService = function (oMetaModel) {
    try {
      var oServiceContext = {
        scopeObject: {},
        scopeType: "",
        settings: {}
      };
      return Promise.resolve(new SideEffectsFactory().createInstance(oServiceContext).then(function (oServiceInstance) {
        var oJestSideEffectsService = oServiceInstance.getInterface();

        oJestSideEffectsService.getContext = function () {
          return {
            scopeObject: {
              getModel: function () {
                return {
                  getMetaModel: function () {
                    return oMetaModel;
                  }
                };
              }
            }
          };
        };

        return oJestSideEffectsService;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _exports.getFakeSideEffectsService = getFakeSideEffectsService;

  var getFakeDiagnostics = function () {
    var issues = [];
    return {
      addIssue: function (issueCategory, issueSeverity, details) {
        issues.push({
          issueCategory: issueCategory,
          issueSeverity: issueSeverity,
          details: details
        });
      },
      getIssues: function () {
        return issues;
      },
      checkIfIssueExists: function (issueCategory, issueSeverity, details) {
        return issues.find(function (issue) {
          issue.issueCategory === issueCategory && issue.issueSeverity === issueSeverity && issue.details === details;
        });
      }
    };
  };

  _exports.getFakeDiagnostics = getFakeDiagnostics;

  var getConverterContextForTest = function (convertedTypes, manifestSettings) {
    var entitySet = convertedTypes.entitySets.find(function (es) {
      return es.name === manifestSettings.entitySet;
    });
    var dataModelPath = getDataModelObjectPathForProperty(entitySet, entitySet);
    return new ConverterContext(convertedTypes, manifestSettings, getFakeDiagnostics(), merge, dataModelPath);
  };

  _exports.getConverterContextForTest = getConverterContextForTest;
  var metaModelCache = {};

  var getMetaModel = function (sMetadataUrl) {
    try {
      function _temp3() {
        return metaModelCache[sMetadataUrl];
      }

      var oRequestor = _MetadataRequestor.create({}, "4.0", {});

      var _temp4 = function () {
        if (!metaModelCache[sMetadataUrl]) {
          var oMetaModel = new ODataMetaModel(oRequestor, sMetadataUrl, undefined, null);
          return Promise.resolve(oMetaModel.fetchEntityContainer()).then(function () {
            metaModelCache[sMetadataUrl] = oMetaModel;
          });
        }
      }();

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _exports.getMetaModel = getMetaModel;

  var getDataModelObjectPathForProperty = function (entitySet, property) {
    var targetPath = {
      startingEntitySet: entitySet,
      navigationProperties: [],
      targetObject: property,
      targetEntitySet: entitySet,
      targetEntityType: entitySet.entityType
    };
    targetPath.contextLocation = targetPath;
    return targetPath;
  };

  _exports.getDataModelObjectPathForProperty = getDataModelObjectPathForProperty;

  var evaluateBinding = function (bindingString) {
    var bindingElement = BindingParser.complexParser(bindingString);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return bindingElement.formatter.apply(undefined, args);
  };

  _exports.evaluateBinding = evaluateBinding;

  var evaluateBindingWithModel = function (bindingString, modelContent) {
    var bindingElement = BindingParser.complexParser(bindingString);
    var jsonModel = new JSONModel(modelContent);
    var text = new InvisibleText();
    text.bindProperty("text", bindingElement);
    text.setModel(jsonModel);
    text.setBindingContext(jsonModel.createBindingContext("/"));
    return text.getText();
  };

  _exports.evaluateBindingWithModel = evaluateBindingWithModel;

  var getTemplatingResult = function (xmlInput, sMetadataUrl, mBindingContexts, mModels) {
    try {
      var templatedXml = "<root>".concat(xmlInput, "</root>");
      var parser = new window.DOMParser();
      var xmlDoc = parser.parseFromString(templatedXml, "text/xml"); // To ensure our macro can use #setBindingContext we ensure there is a pre existing JSONModel for converterContext
      // if not already passed to teh templating

      return Promise.resolve(getMetaModel(sMetadataUrl)).then(function (oMetaModel) {
        if (!mModels.hasOwnProperty("converterContext")) {
          mModels = Object.assign(mModels, {
            "converterContext": new TemplateModel({}, oMetaModel)
          });
        }

        Object.keys(mModels).forEach(function (sModelName) {
          if (mModels[sModelName] && mModels[sModelName].isTemplateModel) {
            mModels[sModelName] = new TemplateModel(mModels[sModelName].data, oMetaModel);
          }
        });
        var oPreprocessorSettings = {
          models: Object.assign({
            metaModel: oMetaModel
          }, mModels),
          bindingContexts: {}
        }; //Inject models and bindingContexts

        Object.keys(mBindingContexts).forEach(function (sKey) {
          /* Assert to make sure the annotations are in the test metadata -> avoid misleading tests */
          expect(typeof oMetaModel.getObject(mBindingContexts[sKey])).toBeDefined();
          var oModel = mModels[sKey] || oMetaModel;
          oPreprocessorSettings.bindingContexts[sKey] = oModel.createBindingContext(mBindingContexts[sKey]); //Value is sPath

          oPreprocessorSettings.models[sKey] = oModel;
        }); //This context for macro testing

        if (oPreprocessorSettings.models["this"]) {
          oPreprocessorSettings.bindingContexts["this"] = oPreprocessorSettings.models["this"].createBindingContext("/");
        }

        return XMLPreprocessor.process(xmlDoc.firstElementChild, {
          name: "Test Fragment"
        }, oPreprocessorSettings);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _exports.getTemplatingResult = getTemplatingResult;

  var getTemplatedXML = function (xmlInput, sMetadataUrl, mBindingContexts, mModels) {
    try {
      return Promise.resolve(getTemplatingResult(xmlInput, sMetadataUrl, mBindingContexts, mModels)).then(serializeXML);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _exports.getTemplatedXML = getTemplatedXML;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkplc3RUZW1wbGF0aW5nSGVscGVyLnRzIl0sIm5hbWVzIjpbInByb2Nlc3NGcmFnbWVudCIsIm5hbWUiLCJ0ZXN0RGF0YSIsImlucHV0WG1sIiwicGFyc2VyIiwid2luZG93IiwiRE9NUGFyc2VyIiwiaW5wdXREb2MiLCJwYXJzZUZyb21TdHJpbmciLCJzZXR0aW5ncyIsIm1vZGVscyIsImJpbmRpbmdDb250ZXh0cyIsIm1vZGVsIiwianNvbk1vZGVsIiwiSlNPTk1vZGVsIiwic2V0RGF0YSIsImNyZWF0ZUJpbmRpbmdDb250ZXh0IiwiWE1MUHJlcHJvY2Vzc29yIiwicHJvY2VzcyIsImZpcnN0RWxlbWVudENoaWxkIiwicmVzdWx0RG9jIiwiZnJhZ21lbnRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJsZW5ndGgiLCJmcmFnbWVudCIsImlubmVySFRNTCIsImZvcm1hdFhtbCIsImZpbHRlciIsIm5vZGUiLCJ0eXBlIiwicmVxdWlyZSIsIkxvZyIsInNldExldmVsIiwiamVzdCIsInNldFRpbWVvdXQiLCJuYW1lU3BhY2VNYXAiLCJzZWxlY3QiLCJ4cGF0aCIsInVzZU5hbWVzcGFjZXMiLCJyZWdpc3Rlck1hY3JvIiwibWFjcm9NZXRhZGF0YSIsIlBoYW50b21VdGlsIiwicmVnaXN0ZXIiLCJ1bnJlZ2lzdGVyTWFjcm8iLCJwbHVnSW4iLCJuYW1lc3BhY2UiLCJwdWJsaWNOYW1lIiwicHVibGljTmFtZXNwYWNlIiwicnVuWFBhdGhRdWVyeSIsInNlbGVjdG9yIiwieG1sZG9tIiwiZXhwZWN0IiwiZXh0ZW5kIiwidG9IYXZlQ29udHJvbCIsIm5vZGVzIiwibWVzc2FnZSIsIm91dHB1dFhtbCIsInNlcmlhbGl6ZVhNTCIsInBhc3MiLCJ0b05vdEhhdmVDb250cm9sIiwiZ2V0Q29udHJvbEF0dHJpYnV0ZSIsImNvbnRyb2xTZWxlY3RvciIsImF0dHJpYnV0ZU5hbWUiLCJ4bWxEb20iLCJzZXJpYWxpemVyIiwiWE1MU2VyaWFsaXplciIsInhtbFN0cmluZyIsInNlcmlhbGl6ZVRvU3RyaW5nIiwicmVwbGFjZSIsImZvcm1hdCIsImNvbXBpbGVDRFMiLCJzQ0RTVXJsIiwiY2RzU3RyaW5nIiwiZnMiLCJyZWFkRmlsZVN5bmMiLCJjc24iLCJjb21waWxlU291cmNlcyIsImVkbXhDb250ZW50IiwidG8iLCJlZG14Iiwic2VydmljZSIsImRpciIsInBhdGgiLCJyZXNvbHZlIiwiZWRteFVybCIsImJhc2VuYW1lIiwiZXhpc3RzU3luYyIsIm1rZGlyU3luYyIsIndyaXRlRmlsZVN5bmMiLCJnZXRGYWtlU2lkZUVmZmVjdHNTZXJ2aWNlIiwib01ldGFNb2RlbCIsIm9TZXJ2aWNlQ29udGV4dCIsInNjb3BlT2JqZWN0Iiwic2NvcGVUeXBlIiwiU2lkZUVmZmVjdHNGYWN0b3J5IiwiY3JlYXRlSW5zdGFuY2UiLCJ0aGVuIiwib1NlcnZpY2VJbnN0YW5jZSIsIm9KZXN0U2lkZUVmZmVjdHNTZXJ2aWNlIiwiZ2V0SW50ZXJmYWNlIiwiZ2V0Q29udGV4dCIsImdldE1vZGVsIiwiZ2V0TWV0YU1vZGVsIiwiZ2V0RmFrZURpYWdub3N0aWNzIiwiaXNzdWVzIiwiYWRkSXNzdWUiLCJpc3N1ZUNhdGVnb3J5IiwiaXNzdWVTZXZlcml0eSIsImRldGFpbHMiLCJwdXNoIiwiZ2V0SXNzdWVzIiwiY2hlY2tJZklzc3VlRXhpc3RzIiwiZmluZCIsImlzc3VlIiwiZ2V0Q29udmVydGVyQ29udGV4dEZvclRlc3QiLCJjb252ZXJ0ZWRUeXBlcyIsIm1hbmlmZXN0U2V0dGluZ3MiLCJlbnRpdHlTZXQiLCJlbnRpdHlTZXRzIiwiZXMiLCJkYXRhTW9kZWxQYXRoIiwiZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aEZvclByb3BlcnR5IiwiQ29udmVydGVyQ29udGV4dCIsIm1lcmdlIiwibWV0YU1vZGVsQ2FjaGUiLCJzTWV0YWRhdGFVcmwiLCJvUmVxdWVzdG9yIiwiX01ldGFkYXRhUmVxdWVzdG9yIiwiY3JlYXRlIiwiT0RhdGFNZXRhTW9kZWwiLCJ1bmRlZmluZWQiLCJmZXRjaEVudGl0eUNvbnRhaW5lciIsInByb3BlcnR5IiwidGFyZ2V0UGF0aCIsInN0YXJ0aW5nRW50aXR5U2V0IiwibmF2aWdhdGlvblByb3BlcnRpZXMiLCJ0YXJnZXRPYmplY3QiLCJ0YXJnZXRFbnRpdHlTZXQiLCJ0YXJnZXRFbnRpdHlUeXBlIiwiZW50aXR5VHlwZSIsImNvbnRleHRMb2NhdGlvbiIsImV2YWx1YXRlQmluZGluZyIsImJpbmRpbmdTdHJpbmciLCJiaW5kaW5nRWxlbWVudCIsIkJpbmRpbmdQYXJzZXIiLCJjb21wbGV4UGFyc2VyIiwiYXJncyIsImZvcm1hdHRlciIsImFwcGx5IiwiZXZhbHVhdGVCaW5kaW5nV2l0aE1vZGVsIiwibW9kZWxDb250ZW50IiwidGV4dCIsIkludmlzaWJsZVRleHQiLCJiaW5kUHJvcGVydHkiLCJzZXRNb2RlbCIsInNldEJpbmRpbmdDb250ZXh0IiwiZ2V0VGV4dCIsImdldFRlbXBsYXRpbmdSZXN1bHQiLCJ4bWxJbnB1dCIsIm1CaW5kaW5nQ29udGV4dHMiLCJtTW9kZWxzIiwidGVtcGxhdGVkWG1sIiwieG1sRG9jIiwiaGFzT3duUHJvcGVydHkiLCJPYmplY3QiLCJhc3NpZ24iLCJUZW1wbGF0ZU1vZGVsIiwia2V5cyIsImZvckVhY2giLCJzTW9kZWxOYW1lIiwiaXNUZW1wbGF0ZU1vZGVsIiwiZGF0YSIsIm9QcmVwcm9jZXNzb3JTZXR0aW5ncyIsIm1ldGFNb2RlbCIsInNLZXkiLCJnZXRPYmplY3QiLCJ0b0JlRGVmaW5lZCIsIm9Nb2RlbCIsImdldFRlbXBsYXRlZFhNTCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBOFFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO01BQ3NCQSxlLGFBQWdCQyxJLEVBQWNDLFE7UUFBd0Q7QUFDM0csVUFBTUMsUUFBUSxpREFBeUNGLElBQXpDLHlEQUFkO0FBQ0EsVUFBTUcsTUFBTSxHQUFHLElBQUlDLE1BQU0sQ0FBQ0MsU0FBWCxFQUFmO0FBQ0EsVUFBTUMsUUFBUSxHQUFHSCxNQUFNLENB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QUFDbkdGLFVBQUFBLHFCQUFxQixDQUFDbEssTUFBdEIsQ0FBNkJvSyxJQUE3QixJQUFxQ0csTUFBckM7QUFDQSxTQU5ELEVBN0JDLENBcUNEOztBQUNBLFlBQUlMLHFCQUFxQixDQUFDbEssTUFBdEIsQ0FBNkIsTUFBN0IsQ0FBSixFQUEwQztBQUN6Q2tLLFVBQUFBLHFCQUFxQixDQUFDakssZUFBdEIsQ0FBc0MsTUFBdEMsSUFBZ0RpSyxxQkFBcUIsQ0FBQ2xLLE1BQXRCLENBQTZCLE1BQTdCLEVBQXFDTSxvQkFBckMsQ0FBMEQsR0FBMUQsQ0FBaEQ7QUFDQTs7QUFFRCxlQUFPQyxlQUFlLENBQUNDLE9BQWhCLENBQXdCZ0osTUFBTSxDQUFDL0ksaUJBQS9CLEVBQW1EO0FBQUVsQixVQUFBQSxJQUFJLEVBQUU7QUFBUixTQUFuRCxFQUE4RTJLLHFCQUE5RSxDQUFQO0FBMUNDO0FBMkNELEtBaEQrQjtBQUFBO0FBQUE7QUFBQSxHQUF6Qjs7OztBQWtEQSxNQUFNTSxlQUFlLGFBQzNCcEIsUUFEMkIsRUFFM0JqQyxZQUYyQixFQUczQmtDLGdCQUgyQixFQUkzQkMsT0FKMkI7QUFBQSxRQUsxQjtBQUFBLDZCQUMwQkgsbUJBQW1CLENBQUNDLFFBQUQsRUFBV2pDLFlBQVgsRUFBeUJrQyxnQkFBekIsRUFBMkNDLE9BQTNDLENBRDdDLE9BRU12RyxZQUZOO0FBR0QsS0FSMkI7QUFBQTtBQUFBO0FBQUEsR0FBckIiLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBoYW50b21VdGlsIH0gZnJvbSBcInNhcC9mZS9tYWNyb3NcIjtcbmltcG9ydCB7IF9NZXRhZGF0YVJlcXVlc3RvciB9IGZyb20gXCJzYXAvdWkvbW9kZWwvb2RhdGEvdjQvbGliXCI7XG5pbXBvcnQgeyBPRGF0YU1ldGFNb2RlbCB9IGZyb20gXCJzYXAvdWkvbW9kZWwvb2RhdGEvdjRcIjtcbmltcG9ydCB7IFhNTFByZXByb2Nlc3NvciB9IGZyb20gXCJzYXAvdWkvY29yZS91dGlsXCI7XG5pbXBvcnQgeyBMb2cgfSBmcm9tIFwic2FwL2Jhc2VcIjtcbmltcG9ydCB4cGF0aCBmcm9tIFwieHBhdGhcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgY29tcGlsZVNvdXJjZXMsIHRvIH0gZnJvbSBcIkBzYXAvY2RzLWNvbXBpbGVyXCI7XG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tIFwicHJldHRpZXJcIjtcbmltcG9ydCB7IEJpbmRpbmdQYXJzZXIgfSBmcm9tIFwic2FwL3VpL2Jhc2VcIjtcbmltcG9ydCB7IEFueUFubm90YXRpb24sIENvbnZlcnRlck91dHB1dCwgRW50aXR5U2V0LCBQcm9wZXJ0eSB9IGZyb20gXCJAc2FwLXV4L2Fubm90YXRpb24tY29udmVydGVyXCI7XG5pbXBvcnQgeyBEYXRhTW9kZWxPYmplY3RQYXRoIH0gZnJvbSBcInNhcC9mZS9jb3JlL3RlbXBsYXRpbmcvRGF0YU1vZGVsUGF0aEhlbHBlclwiO1xuaW1wb3J0IHsgSlNPTk1vZGVsIH0gZnJvbSBcInNhcC91aS9tb2RlbC9qc29uXCI7XG5pbXBvcnQgeyBJbnZpc2libGVUZXh0IH0gZnJvbSBcInNhcC91aS9jb3JlXCI7XG5pbXBvcnQgeyBMaXN0UmVwb3J0TWFuaWZlc3RTZXR0aW5ncywgT2JqZWN0UGFnZU1hbmlmZXN0U2V0dGluZ3MgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9NYW5pZmVzdFNldHRpbmdzXCI7XG5pbXBvcnQgeyBJc3N1ZUNhdGVnb3J5LCBJc3N1ZVNldmVyaXR5IH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9Jc3N1ZU1hbmFnZXJcIjtcbmltcG9ydCB7IElEaWFnbm9zdGljcyB9IGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL1RlbXBsYXRlQ29udmVydGVyXCI7XG5pbXBvcnQgeyBtZXJnZSB9IGZyb20gXCJzYXAvYmFzZS91dGlsXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgQ29udmVydGVyQ29udGV4dCBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9Db252ZXJ0ZXJDb250ZXh0XCI7XG5pbXBvcnQgU2lkZUVmZmVjdHNGYWN0b3J5IGZyb20gXCJzYXAvZmUvY29yZS9zZXJ2aWNlcy9TaWRlRWZmZWN0c1NlcnZpY2VGYWN0b3J5XCI7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlc1xuY29uc3QgZm9ybWF0WG1sID0gcmVxdWlyZShcInhtbC1mb3JtYXR0ZXJcIik7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgKiBhcyBUZW1wbGF0ZU1vZGVsIGZyb20gXCJzYXAvZmUvY29yZS9UZW1wbGF0ZU1vZGVsXCI7XG5cbkxvZy5zZXRMZXZlbCgxIGFzIGFueSwgXCJzYXAudWkuY29yZS51dGlsLlhNTFByZXByb2Nlc3NvclwiKTtcbmplc3Quc2V0VGltZW91dCg0MDAwMCk7XG5cbmNvbnN0IG5hbWVTcGFjZU1hcCA9IHtcblx0XCJtYWNyb3NcIjogXCJzYXAuZmUubWFjcm9zXCIsXG5cdFwibWFjcm9cIjogXCJzYXAuZmUubWFjcm9zXCIsXG5cdFwibWFjcm9kYXRhXCI6IFwiaHR0cDovL3NjaGVtYXMuc2FwLmNvbS9zYXB1aTUvZXh0ZW5zaW9uL3NhcC51aS5jb3JlLkN1c3RvbURhdGEvMVwiLFxuXHRcImxvZ1wiOiBcImh0dHA6Ly9zY2hlbWFzLnNhcC5jb20vc2FwdWk1L2V4dGVuc2lvbi9zYXAudWkuY29yZS5DdXN0b21EYXRhLzFcIixcblx0XCJ1bml0dGVzdFwiOiBcImh0dHA6Ly9zY2hlbWFzLnNhcC5jb20vc2FwdWk1L3ByZXByb2Nlc3NvcmV4dGVuc2lvbi9zYXAuZmUudW5pdHRlc3RpbmcvMVwiLFxuXHRcImNvbnRyb2xcIjogXCJzYXAuZmUuY29yZS5jb250cm9sc1wiLFxuXHRcImNvcmVcIjogXCJzYXAudWkuY29yZVwiLFxuXHRcIm1cIjogXCJzYXAubVwiLFxuXHRcImZcIjogXCJzYXAudWkubGF5b3V0LmZvcm1cIixcblx0XCJtZGNcIjogXCJzYXAudWkubWRjXCIsXG5cdFwibWRjRmllbGRcIjogXCJzYXAudWkubWRjLmZpZWxkXCIsXG5cdFwidVwiOiBcInNhcC51aS51bmlmaWVkXCIsXG5cdFwibWFjcm9NaWNyb0NoYXJ0XCI6IFwic2FwLmZlLm1hY3Jvcy5taWNyb2NoYXJ0XCIsXG5cdFwibWljcm9DaGFydFwiOiBcInNhcC5zdWl0ZS51aS5taWNyb2NoYXJ0XCJcbn07XG5jb25zdCBzZWxlY3QgPSB4cGF0aC51c2VOYW1lc3BhY2VzKG5hbWVTcGFjZU1hcCk7XG5cbmV4cG9ydCBjb25zdCByZWdpc3Rlck1hY3JvID0gZnVuY3Rpb24obWFjcm9NZXRhZGF0YTogYW55KSB7XG5cdFBoYW50b21VdGlsLnJlZ2lzdGVyKG1hY3JvTWV0YWRhdGEpO1xufTtcbmV4cG9ydCBjb25zdCB1bnJlZ2lzdGVyTWFjcm8gPSBmdW5jdGlvbihtYWNyb01ldGFkYXRhOiBhbnkpIHtcblx0WE1MUHJlcHJvY2Vzc29yLnBsdWdJbihudWxsLCBtYWNyb01ldGFkYXRhLm5hbWVzcGFjZSwgbWFjcm9NZXRhZGF0YS5uYW1lKTtcblx0aWYgKG1hY3JvTWV0YWRhdGEucHVibGljTmFtZSkge1xuXHRcdFhNTFByZXByb2Nlc3Nvci5wbHVnSW4obnVsbCwgbWFjcm9NZXRhZGF0YS5wdWJsaWNOYW1lc3BhY2UsIG1hY3JvTWV0YWRhdGEucHVibGljTmFtZSk7XG5cdH1cbn07XG5leHBvcnQgY29uc3QgcnVuWFBhdGhRdWVyeSA9IGZ1bmN0aW9uKHNlbGVjdG9yOiBzdHJpbmcsIHhtbGRvbTogTm9kZSB8IHVuZGVmaW5lZCkge1xuXHRyZXR1cm4gc2VsZWN0KHNlbGVjdG9yLCB4bWxkb20pO1xufTtcblxuZXhwZWN0LmV4dGVuZCh7XG5cdHRvSGF2ZUNvbnRyb2woeG1sZG9tLCBzZWxlY3Rvcikge1xuXHRcdGNvbnN0IG5vZGVzID0gcnVuWFBhdGhRdWVyeShgL3Jvb3Qke3NlbGVjdG9yfWAsIHhtbGRvbSk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG1lc3NhZ2U6ICgpID0+IHtcblx0XHRcdFx0Y29uc3Qgb3V0cHV0WG1sID0gc2VyaWFsaXplWE1MKHhtbGRvbSk7XG5cdFx0XHRcdHJldHVybiBgZGlkIG5vdCBmaW5kIGNvbnRyb2xzIG1hdGNoaW5nICR7c2VsZWN0b3J9IGluIGdlbmVyYXRlZCB4bWw6XFxuICR7b3V0cHV0WG1sfWA7XG5cdFx0XHR9LFxuXHRcdFx0cGFzczogbm9kZXMgJiYgbm9kZXMubGVuZ3RoID49IDFcblx0XHR9O1xuXHR9LFxuXHR0b05vdEhhdmVDb250cm9sKHhtbGRvbSwgc2VsZWN0b3IpIHtcblx0XHRjb25zdCBub2RlcyA9IHJ1blhQYXRoUXVlcnkoYC9yb290JHtzZWxlY3Rvcn1gLCB4bWxkb20pO1xuXHRcdHJldHVybiB7XG5cdFx0XHRtZXNzYWdlOiAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IG91dHB1dFhtbCA9IHNlcmlhbGl6ZVhNTCh4bWxkb20pO1xuXHRcdFx0XHRyZXR1cm4gYFRoZXJlIGlzIGEgY29udHJvbCBtYXRjaGluZyAke3NlbGVjdG9yfSBpbiBnZW5lcmF0ZWQgeG1sOlxcbiAke291dHB1dFhtbH1gO1xuXHRcdFx0fSxcblx0XHRcdHBhc3M6IG5vZGVzICYmIG5vZGVzLmxlbmd0aCA9PT0gMFxuXHRcdH07XG5cdH1cbn0pO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29udHJvbEF0dHJpYnV0ZSA9IGZ1bmN0aW9uKGNvbnRyb2xTZWxlY3Rvcjogc3RyaW5nLCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsIHhtbERvbTogTm9kZSkge1xuXHRjb25zdCBzZWxlY3RvciA9IGBzdHJpbmcoL3Jvb3Qke2NvbnRyb2xTZWxlY3Rvcn0vQCR7YXR0cmlidXRlTmFtZX0pYDtcblx0cmV0dXJuIHJ1blhQYXRoUXVlcnkoc2VsZWN0b3IsIHhtbERvbSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VyaWFsaXplWE1MID0gZnVuY3Rpb24oeG1sRG9tOiBOb2RlKSB7XG5cdGNvbnN0IHNlcmlhbGl6ZXIgPSBuZXcgd2luZG93LlhNTFNlcmlhbGl6ZXIoKTtcblx0Y29uc3QgeG1sU3RyaW5nID0gc2VyaWFsaXplclxuXHRcdC5zZXJpYWxpemVUb1N0cmluZyh4bWxEb20pXG5cdFx0LnJlcGxhY2UoLyg/OltcXHQgXSooPzpcXHI/XFxufFxccikpKy9nLCBcIlxcblwiKVxuXHRcdC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJyk7XG5cdHJldHVybiBmb3JtYXQoeG1sU3RyaW5nLCB7IHBhcnNlcjogXCJodG1sXCIgfSk7XG59O1xuXG4vKipcbiAqIENvbXBpbGUgYSBDRFMgZmlsZSBpbnRvIGFuIEVETVggZmlsZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc0NEU1VybCBUaGUgcGF0aCB0byB0aGUgZmlsZSBjb250YWluaW5nIHRoZSBDRFMgZGVmaW5pdGlvbi4gVGhpcyBmaWxlIE1VU1QgZGVjbGFyZSB0aGUgbmFtZXNwYWNlXG4gKiBzYXAuZmUudGVzdCBhbmQgYSBzZXJ2aWNlIEplc3RTZXJ2aWNlXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCBvZiB0aGUgZ2VuZXJhdGVkIEVETVhcbiAqL1xuZXhwb3J0IGNvbnN0IGNvbXBpbGVDRFMgPSBmdW5jdGlvbihzQ0RTVXJsOiBzdHJpbmcpIHtcblx0Y29uc3QgY2RzU3RyaW5nID0gZnMucmVhZEZpbGVTeW5jKHNDRFNVcmwsIFwidXRmLThcIik7XG5cdGNvbnN0IGNzbiA9IGNvbXBpbGVTb3VyY2VzKHsgXCJzdHJpbmcuY2RzXCI6IGNkc1N0cmluZyB9LCB7fSk7XG5cdGNvbnN0IGVkbXhDb250ZW50ID0gdG8uZWRteChjc24sIHsgc2VydmljZTogXCJzYXAuZmUudGVzdC5KZXN0U2VydmljZVwiIH0pO1xuXHRjb25zdCBkaXIgPSBwYXRoLnJlc29sdmUoc0NEU1VybCwgXCIuLlwiLCBcImdlblwiKTtcblx0Y29uc3QgZWRteFVybCA9IHBhdGgucmVzb2x2ZShkaXIsIHBhdGguYmFzZW5hbWUoc0NEU1VybCkucmVwbGFjZShcIi5jZHNcIiwgXCIueG1sXCIpKTtcblxuXHRpZiAoIWZzLmV4aXN0c1N5bmMoZGlyKSkge1xuXHRcdGZzLm1rZGlyU3luYyhkaXIpO1xuXHR9XG5cblx0ZnMud3JpdGVGaWxlU3luYyhlZG14VXJsLCBlZG14Q29udGVudCk7XG5cdHJldHVybiBlZG14VXJsO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEZha2VTaWRlRWZmZWN0c1NlcnZpY2UgPSBhc3luYyBmdW5jdGlvbihvTWV0YU1vZGVsOiBPRGF0YU1ldGFNb2RlbCk6IFByb21pc2U8YW55PiB7XG5cdGNvbnN0IG9TZXJ2aWNlQ29udGV4dCA9IHsgc2NvcGVPYmplY3Q6IHt9LCBzY29wZVR5cGU6IFwiXCIsIHNldHRpbmdzOiB7fSB9O1xuXHRyZXR1cm4gbmV3IFNpZGVFZmZlY3RzRmFjdG9yeSgpLmNyZWF0ZUluc3RhbmNlKG9TZXJ2aWNlQ29udGV4dCkudGhlbihmdW5jdGlvbihvU2VydmljZUluc3RhbmNlOiBhbnkpIHtcblx0XHRjb25zdCBvSmVzdFNpZGVFZmZlY3RzU2VydmljZSA9IG9TZXJ2aWNlSW5zdGFuY2UuZ2V0SW50ZXJmYWNlKCk7XG5cdFx0b0plc3RTaWRlRWZmZWN0c1NlcnZpY2UuZ2V0Q29udGV4dCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0c2NvcGVPYmplY3Q6IHtcblx0XHRcdFx0XHRnZXRNb2RlbDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRnZXRNZXRhTW9kZWw6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBvTWV0YU1vZGVsO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9O1xuXHRcdHJldHVybiBvSmVzdFNpZGVFZmZlY3RzU2VydmljZTtcblx0fSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RmFrZURpYWdub3N0aWNzID0gZnVuY3Rpb24oKTogSURpYWdub3N0aWNzIHtcblx0Y29uc3QgaXNzdWVzOiBhbnlbXSA9IFtdO1xuXHRyZXR1cm4ge1xuXHRcdGFkZElzc3VlKGlzc3VlQ2F0ZWdvcnk6IElzc3VlQ2F0ZWdvcnksIGlzc3VlU2V2ZXJpdHk6IElzc3VlU2V2ZXJpdHksIGRldGFpbHM6IHN0cmluZyk6IHZvaWQge1xuXHRcdFx0aXNzdWVzLnB1c2goe1xuXHRcdFx0XHRpc3N1ZUNhdGVnb3J5LFxuXHRcdFx0XHRpc3N1ZVNldmVyaXR5LFxuXHRcdFx0XHRkZXRhaWxzXG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdGdldElzc3VlcygpOiBhbnlbXSB7XG5cdFx0XHRyZXR1cm4gaXNzdWVzO1xuXHRcdH0sXG5cdFx0Y2hlY2tJZklzc3VlRXhpc3RzKGlzc3VlQ2F0ZWdvcnk6IElzc3VlQ2F0ZWdvcnksIGlzc3VlU2V2ZXJpdHk6IElzc3VlU2V2ZXJpdHksIGRldGFpbHM6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdFx0cmV0dXJuIGlzc3Vlcy5maW5kKGlzc3VlID0+IHtcblx0XHRcdFx0aXNzdWUuaXNzdWVDYXRlZ29yeSA9PT0gaXNzdWVDYXRlZ29yeSAmJiBpc3N1ZS5pc3N1ZVNldmVyaXR5ID09PSBpc3N1ZVNldmVyaXR5ICYmIGlzc3VlLmRldGFpbHMgPT09IGRldGFpbHM7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q29udmVydGVyQ29udGV4dEZvclRlc3QgPSBmdW5jdGlvbihcblx0Y29udmVydGVkVHlwZXM6IENvbnZlcnRlck91dHB1dCxcblx0bWFuaWZlc3RTZXR0aW5nczogTGlzdFJlcG9ydE1hbmlmZXN0U2V0dGluZ3MgfCBPYmplY3RQYWdlTWFuaWZlc3RTZXR0aW5nc1xuKSB7XG5cdGNvbnN0IGVudGl0eVNldCA9IGNvbnZlcnRlZFR5cGVzLmVudGl0eVNldHMuZmluZChlcyA9PiBlcy5uYW1lID09PSBtYW5pZmVzdFNldHRpbmdzLmVudGl0eVNldCk7XG5cdGNvbnN0IGRhdGFNb2RlbFBhdGggPSBnZXREYXRhTW9kZWxPYmplY3RQYXRoRm9yUHJvcGVydHkoZW50aXR5U2V0IGFzIEVudGl0eVNldCwgZW50aXR5U2V0KTtcblx0cmV0dXJuIG5ldyBDb252ZXJ0ZXJDb250ZXh0KGNvbnZlcnRlZFR5cGVzLCBtYW5pZmVzdFNldHRpbmdzLCBnZXRGYWtlRGlhZ25vc3RpY3MoKSwgbWVyZ2UsIGRhdGFNb2RlbFBhdGgpO1xufTtcbmNvbnN0IG1ldGFNb2RlbENhY2hlOiBhbnkgPSB7fTtcbmV4cG9ydCBjb25zdCBnZXRNZXRhTW9kZWwgPSBhc3luYyBmdW5jdGlvbihzTWV0YWRhdGFVcmw6IHN0cmluZykge1xuXHRjb25zdCBvUmVxdWVzdG9yID0gX01ldGFkYXRhUmVxdWVzdG9yLmNyZWF0ZSh7fSwgXCI0LjBcIiwge30pO1xuXHRpZiAoIW1ldGFNb2RlbENhY2hlW3NNZXRhZGF0YVVybF0pIHtcblx0XHRjb25zdCBvTWV0YU1vZGVsID0gbmV3IE9EYXRhTWV0YU1vZGVsKG9SZXF1ZXN0b3IsIHNNZXRhZGF0YVVybCwgdW5kZWZpbmVkLCBudWxsKTtcblx0XHRhd2FpdCBvTWV0YU1vZGVsLmZldGNoRW50aXR5Q29udGFpbmVyKCk7XG5cdFx0bWV0YU1vZGVsQ2FjaGVbc01ldGFkYXRhVXJsXSA9IG9NZXRhTW9kZWw7XG5cdH1cblxuXHRyZXR1cm4gbWV0YU1vZGVsQ2FjaGVbc01ldGFkYXRhVXJsXTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXREYXRhTW9kZWxPYmplY3RQYXRoRm9yUHJvcGVydHkgPSBmdW5jdGlvbihcblx0ZW50aXR5U2V0OiBFbnRpdHlTZXQsXG5cdHByb3BlcnR5PzogUHJvcGVydHkgfCBFbnRpdHlTZXQgfCBBbnlBbm5vdGF0aW9uXG4pOiBEYXRhTW9kZWxPYmplY3RQYXRoIHtcblx0Y29uc3QgdGFyZ2V0UGF0aDogRGF0YU1vZGVsT2JqZWN0UGF0aCA9IHtcblx0XHRzdGFydGluZ0VudGl0eVNldDogZW50aXR5U2V0LFxuXHRcdG5hdmlnYXRpb25Qcm9wZXJ0aWVzOiBbXSxcblx0XHR0YXJnZXRPYmplY3Q6IHByb3BlcnR5LFxuXHRcdHRhcmdldEVudGl0eVNldDogZW50aXR5U2V0LFxuXHRcdHRhcmdldEVudGl0eVR5cGU6IGVudGl0eVNldC5lbnRpdHlUeXBlXG5cdH07XG5cdHRhcmdldFBhdGguY29udGV4dExvY2F0aW9uID0gdGFyZ2V0UGF0aDtcblx0cmV0dXJuIHRhcmdldFBhdGg7XG59O1xuXG5leHBvcnQgY29uc3QgZXZhbHVhdGVCaW5kaW5nID0gZnVuY3Rpb24oYmluZGluZ1N0cmluZzogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuXHRjb25zdCBiaW5kaW5nRWxlbWVudCA9IEJpbmRpbmdQYXJzZXIuY29tcGxleFBhcnNlcihiaW5kaW5nU3RyaW5nKTtcblx0cmV0dXJuIGJpbmRpbmdFbGVtZW50LmZvcm1hdHRlci5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xufTtcblxuZXhwb3J0IGNvbnN0IGV2YWx1YXRlQmluZGluZ1dpdGhNb2RlbCA9IGZ1bmN0aW9uKGJpbmRpbmdTdHJpbmc6IHN0cmluZyB8IHVuZGVmaW5lZCwgbW9kZWxDb250ZW50OiBhbnkpIHtcblx0Y29uc3QgYmluZGluZ0VsZW1lbnQgPSBCaW5kaW5nUGFyc2VyLmNvbXBsZXhQYXJzZXIoYmluZGluZ1N0cmluZyk7XG5cdGNvbnN0IGpzb25Nb2RlbCA9IG5ldyBKU09OTW9kZWwobW9kZWxDb250ZW50KTtcblx0Y29uc3QgdGV4dCA9IG5ldyBJbnZpc2libGVUZXh0KCk7XG5cdHRleHQuYmluZFByb3BlcnR5KFwidGV4dFwiLCBiaW5kaW5nRWxlbWVudCk7XG5cdHRleHQuc2V0TW9kZWwoanNvbk1vZGVsKTtcblx0dGV4dC5zZXRCaW5kaW5nQ29udGV4dChqc29uTW9kZWwuY3JlYXRlQmluZGluZ0NvbnRleHQoXCIvXCIpKTtcblx0cmV0dXJuIHRleHQuZ2V0VGV4dCgpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFRlbXBsYXRpbmdSZXN1bHQgPSBhc3luYyBmdW5jdGlvbihcblx0eG1sSW5wdXQ6IHN0cmluZyxcblx0c01ldGFkYXRhVXJsOiBzdHJpbmcsXG5cdG1CaW5kaW5nQ29udGV4dHM6IHsgW3g6IHN0cmluZ106IGFueTsgZW50aXR5U2V0Pzogc3RyaW5nIH0sXG5cdG1Nb2RlbHM6IHsgW3g6IHN0cmluZ106IGFueSB9XG4pIHtcblx0Y29uc3QgdGVtcGxhdGVkWG1sID0gYDxyb290PiR7eG1sSW5wdXR9PC9yb290PmA7XG5cdGNvbnN0IHBhcnNlciA9IG5ldyB3aW5kb3cuRE9NUGFyc2VyKCk7XG5cdGNvbnN0IHhtbERvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcodGVtcGxhdGVkWG1sLCBcInRleHQveG1sXCIpO1xuXHQvLyBUbyBlbnN1cmUgb3VyIG1hY3JvIGNhbiB1c2UgI3NldEJpbmRpbmdDb250ZXh0IHdlIGVuc3VyZSB0aGVyZSBpcyBhIHByZSBleGlzdGluZyBKU09OTW9kZWwgZm9yIGNvbnZlcnRlckNvbnRleHRcblx0Ly8gaWYgbm90IGFscmVhZHkgcGFzc2VkIHRvIHRlaCB0ZW1wbGF0aW5nXG5cblx0Y29uc3Qgb01ldGFNb2RlbCA9IGF3YWl0IGdldE1ldGFNb2RlbChzTWV0YWRhdGFVcmwpO1xuXHRpZiAoIW1Nb2RlbHMuaGFzT3duUHJvcGVydHkoXCJjb252ZXJ0ZXJDb250ZXh0XCIpKSB7XG5cdFx0bU1vZGVscyA9IE9iamVjdC5hc3NpZ24obU1vZGVscywgeyBcImNvbnZlcnRlckNvbnRleHRcIjogbmV3IFRlbXBsYXRlTW9kZWwoe30sIG9NZXRhTW9kZWwpIH0pO1xuXHR9XG5cblx0T2JqZWN0LmtleXMobU1vZGVscykuZm9yRWFjaChmdW5jdGlvbihzTW9kZWxOYW1lKSB7XG5cdFx0aWYgKG1Nb2RlbHNbc01vZGVsTmFtZV0gJiYgbU1vZGVsc1tzTW9kZWxOYW1lXS5pc1RlbXBsYXRlTW9kZWwpIHtcblx0XHRcdG1Nb2RlbHNbc01vZGVsTmFtZV0gPSBuZXcgVGVtcGxhdGVNb2RlbChtTW9kZWxzW3NNb2RlbE5hbWVdLmRhdGEsIG9NZXRhTW9kZWwpO1xuXHRcdH1cblx0fSk7XG5cblx0Y29uc3Qgb1ByZXByb2Nlc3NvclNldHRpbmdzOiBhbnkgPSB7XG5cdFx0bW9kZWxzOiBPYmplY3QuYXNzaWduKFxuXHRcdFx0e1xuXHRcdFx0XHRtZXRhTW9kZWw6IG9NZXRhTW9kZWxcblx0XHRcdH0sXG5cdFx0XHRtTW9kZWxzXG5cdFx0KSxcblx0XHRiaW5kaW5nQ29udGV4dHM6IHt9XG5cdH07XG5cblx0Ly9JbmplY3QgbW9kZWxzIGFuZCBiaW5kaW5nQ29udGV4dHNcblx0T2JqZWN0LmtleXMobUJpbmRpbmdDb250ZXh0cykuZm9yRWFjaChmdW5jdGlvbihzS2V5KSB7XG5cdFx0LyogQXNzZXJ0IHRvIG1ha2Ugc3VyZSB0aGUgYW5ub3RhdGlvbnMgYXJlIGluIHRoZSB0ZXN0IG1ldGFkYXRhIC0+IGF2b2lkIG1pc2xlYWRpbmcgdGVzdHMgKi9cblx0XHRleHBlY3QodHlwZW9mIG9NZXRhTW9kZWwuZ2V0T2JqZWN0KG1CaW5kaW5nQ29udGV4dHNbc0tleV0pKS50b0JlRGVmaW5lZCgpO1xuXHRcdGNvbnN0IG9Nb2RlbCA9IG1Nb2RlbHNbc0tleV0gfHwgb01ldGFNb2RlbDtcblx0XHRvUHJlcHJvY2Vzc29yU2V0dGluZ3MuYmluZGluZ0NvbnRleHRzW3NLZXldID0gb01vZGVsLmNyZWF0ZUJpbmRpbmdDb250ZXh0KG1CaW5kaW5nQ29udGV4dHNbc0tleV0pOyAvL1ZhbHVlIGlzIHNQYXRoXG5cdFx0b1ByZXByb2Nlc3NvclNldHRpbmdzLm1vZGVsc1tzS2V5XSA9IG9Nb2RlbDtcblx0fSk7XG5cblx0Ly9UaGlzIGNvbnRleHQgZm9yIG1hY3JvIHRlc3Rpbmdcblx0aWYgKG9QcmVwcm9jZXNzb3JTZXR0aW5ncy5tb2RlbHNbXCJ0aGlzXCJdKSB7XG5cdFx0b1ByZXByb2Nlc3NvclNldHRpbmdzLmJpbmRpbmdDb250ZXh0c1tcInRoaXNcIl0gPSBvUHJlcHJvY2Vzc29yU2V0dGluZ3MubW9kZWxzW1widGhpc1wiXS5jcmVhdGVCaW5kaW5nQ29udGV4dChcIi9cIik7XG5cdH1cblxuXHRyZXR1cm4gWE1MUHJlcHJvY2Vzc29yLnByb2Nlc3MoeG1sRG9jLmZpcnN0RWxlbWVudENoaWxkISwgeyBuYW1lOiBcIlRlc3QgRnJhZ21lbnRcIiB9LCBvUHJlcHJvY2Vzc29yU2V0dGluZ3MpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFRlbXBsYXRlZFhNTCA9IGFzeW5jIGZ1bmN0aW9uKFxuXHR4bWxJbnB1dDogc3RyaW5nLFxuXHRzTWV0YWRhdGFVcmw6IHN0cmluZyxcblx0bUJpbmRpbmdDb250ZXh0czogeyBbeDogc3RyaW5nXTogYW55OyBlbnRpdHlTZXQ/OiBzdHJpbmcgfSxcblx0bU1vZGVsczogeyBbeDogc3RyaW5nXTogYW55IH1cbikge1xuXHRjb25zdCB0ZW1wbGF0ZWRYTUwgPSBhd2FpdCBnZXRUZW1wbGF0aW5nUmVzdWx0KHhtbElucHV0LCBzTWV0YWRhdGFVcmwsIG1CaW5kaW5nQ29udGV4dHMsIG1Nb2RlbHMpO1xuXHRyZXR1cm4gc2VyaWFsaXplWE1MKHRlbXBsYXRlZFhNTCk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgdGhlIHJlcXVlc3RlZCBYTUwgZnJhZ21lbnQgd2l0aCB0aGUgcHJvdmlkZWQgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBGdWxseSBxdWFsaWZpZWQgbmFtZSBvZiB0aGUgZnJhZ21lbnQgdG8gYmUgdGVzdGVkLlxuICogQHBhcmFtIHtvYmplY3R9IHRlc3REYXRhIFRlc3QgZGF0YSBjb25zaXN0aW5nXG4gKiBAcmV0dXJucyBUZW1wYWx0ZWQgZnJhZ21lbnQgYXMgc3RyaW5nXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcm9jZXNzRnJhZ21lbnQobmFtZTogc3RyaW5nLCB0ZXN0RGF0YTogeyBbbW9kZWw6IHN0cmluZ106IG9iamVjdCB9KTogUHJvbWlzZTxzdHJpbmc+IHtcblx0Y29uc3QgaW5wdXRYbWwgPSBgPHJvb3Q+PGNvcmU6RnJhZ21lbnQgZnJhZ21lbnROYW1lPVwiJHtuYW1lfVwiIHR5cGU9XCJYTUxcIiB4bWxuczpjb3JlPVwic2FwLnVpLmNvcmVcIiAvPjwvcm9vdD5gO1xuXHRjb25zdCBwYXJzZXIgPSBuZXcgd2luZG93LkRPTVBhcnNlcigpO1xuXHRjb25zdCBpbnB1dERvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoaW5wdXRYbWwsIFwidGV4dC94bWxcIik7XG5cblx0Ly8gYnVpbGQgbW9kZWwgYW5kIGJpbmRpbmdzIGZvciBnaXZlbiB0ZXN0IGRhdGFcblx0Y29uc3Qgc2V0dGluZ3MgPSB7XG5cdFx0bW9kZWxzOiB7fSBhcyB7IFtuYW1lOiBzdHJpbmddOiBKU09OTW9kZWw8b2JqZWN0PiB9LFxuXHRcdGJpbmRpbmdDb250ZXh0czoge30gYXMgeyBbbmFtZTogc3RyaW5nXTogb2JqZWN0IH1cblx0fTtcblx0Zm9yIChjb25zdCBtb2RlbCBpbiB0ZXN0RGF0YSkge1xuXHRcdGNvbnN0IGpzb25Nb2RlbCA9IG5ldyBKU09OTW9kZWw8b2JqZWN0PigpO1xuXHRcdGpzb25Nb2RlbC5zZXREYXRhKHRlc3REYXRhW21vZGVsXSk7XG5cdFx0c2V0dGluZ3MubW9kZWxzW21vZGVsXSA9IGpzb25Nb2RlbDtcblx0XHRzZXR0aW5ncy5iaW5kaW5nQ29udGV4dHNbbW9kZWxdID0gc2V0dGluZ3MubW9kZWxzW21vZGVsXS5jcmVhdGVCaW5kaW5nQ29udGV4dChcIi9cIik7XG5cdH1cblxuXHQvLyBleGVjdXRlIHRoZSBwcmUtcHJvY2Vzc29yXG5cdGNvbnN0IHJlc3VsdERvYyA9IGF3YWl0IFhNTFByZXByb2Nlc3Nvci5wcm9jZXNzKGlucHV0RG9jLmZpcnN0RWxlbWVudENoaWxkLCB7IG5hbWUgfSwgc2V0dGluZ3MpO1xuXG5cdC8vIGV4Y2x1ZGUgbmVzdGVkIGZyYWdtZW50cyBmcm9tIHRlc3Qgc25hcHNob3RzXG5cdGNvbnN0IGZyYWdtZW50cyA9IHJlc3VsdERvYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcImNvcmU6RnJhZ21lbnRcIik7XG5cdGlmIChmcmFnbWVudHM/Lmxlbmd0aCA+IDApIHtcblx0XHRmb3IgKGNvbnN0IGZyYWdtZW50IG9mIGZyYWdtZW50cykge1xuXHRcdFx0ZnJhZ21lbnQuaW5uZXJIVE1MID0gXCJcIjtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZm9ybWF0WG1sKHJlc3VsdERvYy5pbm5lckhUTUwsIHtcblx0XHRmaWx0ZXI6IChub2RlOiBhbnkpID0+IG5vZGUudHlwZSAhPT0gXCJDb21tZW50XCJcblx0fSk7XG59XG4iXX0=