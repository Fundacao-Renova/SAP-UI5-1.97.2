/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */

// Provides static functions to call OData actions (bound/import) and functions (bound/import)
sap.ui.define(
	[
		"sap/m/MessageBox",
		"sap/m/Dialog",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/XMLTemplateProcessor",
		"sap/ui/core/util/XMLPreprocessor",
		"sap/ui/core/Fragment",
		"sap/fe/core/actions/messageHandling",
		"sap/fe/core/BusyLocker",
		"sap/fe/core/CommonUtils",
		"sap/base/Log",
		"sap/fe/core/library",
		"sap/fe/core/helpers/FPMHelper"
	],
	function(
		MessageBox,
		Dialog,
		JSONModel,
		XMLTemplateProcessor,
		XMLPreprocessor,
		Fragment,
		messageHandling,
		BusyLocker,
		CommonUtils,
		Log,
		FELibrary,
		FPMHelper
	) {
		"use strict";

		var Constants = FELibrary.Constants;

		/**
		 * Calls a bound action for one or multiple contexts
		 * @function
		 * @static
		 * @name sap.fe.core.actions.operations.callBoundAction
		 * @memberof sap.fe.core.actions.operations
		 * @param {string} sActionName The name of the action to be called
		 * @param {sap.ui.model.odata.v4.Context} contexts Either one context or an array with contexts for which the action shall be called
		 * @param {sap.ui.model.odata.v4.Model} oModel OData Model
		 * @param {object} oAppComponent The AppComponent
		 * @param {map} [mParameters] Optional, can contain the following attributes:
		 * @param {map} [mParameters.actionParameters] a map of parameters to be sent for every action call
		 * @param {map} [mParameters.mBindingParameters] a map of binding parameters that would be part of $select and $expand coming from side effects for bound actions
		 * @param {Array} [mParameters.additionalSideEffect] array of property paths to be requested in addition to actual target properties of the side effect
		 * @param {boolean} [mParameters.showActionParameterDialog] [false] if set and if parameters exist the user retrieves a dialog to fill in parameters, if actionParameters are passed they are shown to the user
		 * @param {string} [mParameters.label] a human-readable label for the action
		 * @param {string} [mParameters.invocationGrouping] [Isolated] mode how actions shall be called: Changeset to put all action calls into one changeset, Isolated to put them into separate changesets
		 * @param {Function} [mParameters.onSubmitted] Function which is called once the actions are submitted with an array of promises
		 * @param {map} [mParameters.defaultParameters] can contain default parameters from FLP user defaults
		 * @param {sap.ui.core.Element} [mParameters.parentControl] if specified the dialogs are added as dependent of the parent control
		 * @param {boolean} [mParameters.bGetBoundContext] if specified the action promise returns the bound context
		 * @returns {Promise} Promise resolves with an array of response objects (TODO: to be changed)
		 * @private
		 * @ui5-restricted
		 */

		function callBoundAction(sActionName, contexts, oModel, oAppComponent, mParameters) {
			if (!contexts || contexts.length === 0) {
				//In Freestyle apps bound actions can have no context
				return Promise.reject("Bound actions always requires at least one context");
			}
			// we expect either one context or an array of contexts
			if (Array.isArray(contexts)) {
				mParameters.bReturnAsArray = true;
			} else {
				//action needs to be called on this context from the dependent binding so UI fields are updated with response data
				contexts = [contexts];
			}
			var oMetaModel = oModel.getMetaModel(),
				sActionPath = oMetaModel.getMetaPath(contexts[0].getPath()) + "/" + sActionName,
				oBoundAction = oMetaModel.createBindingContext(sActionPath + "/@$ui5.overload/0");
			mParameters.aContexts = contexts;
			mParameters.isCriticalAction = getIsActionCritical(oMetaModel, sActionPath, contexts, oBoundAction);
			return callAction(sActionName, oModel, oBoundAction, oAppComponent, mParameters);
		}

		/**
		 * Calls an action import.
		 *
		 * @function
		 * @static
		 * @name sap.fe.core.actions.operations.callActionImport
		 * @memberof sap.fe.core.actions.operations
		 * @param {string} sActionName The name of the action import to be called
		 * @param {sap.ui.model.odata.v4.ODataModel} oModel An instance of an OData v4 model
		 * @param {object} oAppComponent The AppComponent
		 * @param {map} [mParameters] Optional, can contain the following attributes:
		 * @param {map} [mParameters.actionParameters] A map of parameters to be sent with the action import
		 * @param {string} [mParameters.label] A human-readable label for the action
		 * @param {boolean} [mParameters.showActionParameterDialog] If set and if parameters exist the user retrieves a dialog to fill in parameters, if actionParameters are passed they are shown to the user
		 * @param {Function} [mParameters.onSubmitted] Function which is called once the actions are submitted with an array of promises
		 * @param {map} [mParameters.defaultParameters] Can contain default parameters from FLP user defaults
		 * @returns {Promise} Promise resolves with an array of response objects (TODO: to be changed)
		 * @private
		 * @ui5-restricted
		 */
		function callActionImport(sActionName, oModel, oAppComponent, mParameters) {
			if (!oModel) {
				return Promise.reject("Action expects a model/context for execution");
			}
			var oMetaModel = oModel.getMetaModel(),
				sActionPath = oModel.bindContext("/" + sActionName).getPath(),
				oActionImport = oMetaModel.createBindingContext(
					"/" + oMetaModel.createBindingContext(sActionPath).getObject("$Action") + "/0"
				);
			mParameters.isCriticalAction = getIsActionCritical(oMetaModel, sActionPath + "/@$ui5.overload");
			return callAction(sActionName, oModel, oActionImport, oAppComponent, mParameters);
		}

		/**
		 * Calls a bound function.
		 *
		 * @function
		 * @static
		 * @name sap.fe.core.actions.operations.callBoundFunction
		 * @memberof sap.fe.core.actions.operations
		 * @param {string} sFunctionName The name of the function to be called
		 * @param {sap.ui.model.odata.v4.Context} context The context for which the function shall be called
		 * @param {sap.ui.model.odata.v4.ODataModel} oModel An instance of an OData v4 model
		 * @returns {Promise} Promise resolves
		 * @private
		 */
		function callBoundFunction(sFunctionName, context, oModel) {
			if (!context) {
				return Promise.reject("Bound functions always requires a context");
			}
			var oMetaModel = oModel.getMetaModel(),
				sFunctionPath = oMetaModel.getMetaPath(context.getPath()) + "/" + sFunctionName,
				oBoundFunction = oMetaModel.createBindingContext(sFunctionPath);
			return _executeFunction(sFunctionName, oModel, oBoundFunction, context);
		}

		/**
		 * Calls a function import.
		 *
		 * @function
		 * @static
		 * @name sap.fe.core.actions.operations.callFunctionImport
		 * @memberof sap.fe.core.actions.operations
		 * @param {string} sFunctionName The name of the function to be called
		 * @param {sap.ui.model.odata.v4.ODataModel} oModel An instance of an OData v4 model
		 * @returns {Promise} Promise resolves
		 * @private
		 */
		function callFunctionImport(sFunctionName, oModel) {
			if (!sFunctionName) {
				return Promise.resolve();
			}
			var oMetaModel = oModel.getMetaModel(),
				sFunctionPath = oModel.bindContext("/" + sFunctionName).getPath(),
				oFunctionImport = oMetaModel.createBindingContext(
					"/" + oMetaModel.createBindingContext(sFunctionPath).getObject("$Function") + "/0"
				);
			return _executeFunction(sFunctionName, oModel, oFunctionImport);
		}

		function _executeFunction(sFunctionName, oModel, oFunction, context) {
			var oFunctionPromise, sGroupId;
			if (!oFunction || !oFunction.getObject()) {
				return Promise.reject(new Error("Function" + sFunctionName + " not found"));
			}
			if (context) {
				oFunction = oModel.bindContext(sFunctionName + "(...)", context);
				sGroupId = "functionGroup";
			} else {
				oFunction = oModel.bindContext("/" + sFunctionName + "(...)");
				sGroupId = "functionImport";
			}
			oFunctionPromise = oFunction.execute(sGroupId);
			oModel.submitBatch(sGroupId);
			return oFunctionPromise.then(function() {
				return oFunction.getBoundContext();
			});
		}

		function callAction(sActionName, oModel, oAction, oAppComponent, mParameters) {
			return new Promise(function(resolve, reject) {
				var aActionParameters = mParameters.actionParameters || [],
					mActionExecutionParameters = {},
					fnDialog,
					oActionPromise,
					sActionLabel = mParameters.label,
					bShowActionParameterDialog = mParameters.showActionParameterDialog,
					aContexts = mParameters.aContexts,
					bIsCreateAction = mParameters.bIsCreateAction,
					bIsCriticalAction = mParameters.isCriticalAction,
					oMetaModel,
					sMetaPath,
					sMessagesPath,
					iMessageSideEffect;
				if (!oAction || !oAction.getObject()) {
					return reject(new Error("Action" + sActionName + " not found"));
				}
				if (bShowActionParameterDialog || aActionParameters.length > 0) {
					aActionParameters = prepareActionParameters(oAction, aActionParameters);
					if (!aActionParameters || aActionParameters.length === 0) {
						bShowActionParameterDialog = false;
					}
				}
				if (bShowActionParameterDialog) {
					fnDialog = showActionParameterDialog;
				} else if (bIsCriticalAction) {
					fnDialog = confirmCriticalAction;
				}
				mActionExecutionParameters = {
					fnOnSubmitted: mParameters.onSubmitted,
					fnOnResponse: mParameters.onResponse,
					actionName: sActionName,
					model: oModel,
					aActionParameters: aActionParameters,
					bGetBoundContext: mParameters.bGetBoundContext,
					defaultValuesExtensionFunction: mParameters.defaultValuesExtensionFunction
				};
				if (oAction.getObject("$IsBound")) {
					if (mParameters.additionalSideEffect && mParameters.additionalSideEffect.pathExpressions) {
						oMetaModel = oModel.getMetaModel();
						sMetaPath = oMetaModel.getMetaPath(aContexts[0].getPath());
						sMessagesPath = oMetaModel.getObject(sMetaPath + "/@com.sap.vocabularies.Common.v1.Messages/$Path");

						if (sMessagesPath) {
							iMessageSideEffect = mParameters.additionalSideEffect.pathExpressions.findIndex(function(exp) {
								return exp.$PropertyPath === sMessagesPath;
							});

							if (iMessageSideEffect > -1) {
								// the message path is annotated as side effect. As there's no binding for it and the model does currently not allow
								// to add it at a later point of time we have to take care it's part of the $select of the POST, therefore moving it
								mParameters.mBindingParameters = mParameters.mBindingParameters || {};

								if (
									oAction.getObject("$ReturnType/$Type/" + sMessagesPath) &&
									(!mParameters.mBindingParameters.$select ||
										mParameters.mBindingParameters.$select.split(",").indexOf(sMessagesPath) === -1)
								) {
									mParameters.mBindingParameters.$select = mParameters.mBindingParameters.$select
										? mParameters.mBindingParameters.$select + "," + sMessagesPath
										: sMessagesPath;

									if (mParameters.additionalSideEffect.triggerActions.length === 0) {
										// no trigger action therefore no need to request messages again
										mParameters.additionalSideEffect.pathExpressions.splice(iMessageSideEffect, 1);
									}
								}
							}
						}
					}

					mActionExecutionParameters.aContexts = aContexts;
					mActionExecutionParameters.mBindingParameters = mParameters.mBindingParameters;
					mActionExecutionParameters.additionalSideEffect = mParameters.additionalSideEffect;
					mActionExecutionParameters.bGrouped = mParameters.invocationGrouping === "ChangeSet";
					mActionExecutionParameters.bReturnAsArray = mParameters.bReturnAsArray;
					mActionExecutionParameters.internalModelContext = mParameters.internalModelContext;
					mActionExecutionParameters.operationAvailableMap = mParameters.operationAvailableMap;
					mActionExecutionParameters.bObjectPage = mParameters.bObjectPage;
				}
				if (bIsCreateAction) {
					mActionExecutionParameters.bIsCreateAction = bIsCreateAction;
				}
				if (fnDialog) {
					oActionPromise = fnDialog(
						sActionName,
						oAppComponent,
						sActionLabel,
						mActionExecutionParameters,
						aActionParameters,
						oAction,
						mParameters.parentControl,
						mParameters.entitySetName,
						mParameters.messageHandler
					);
				} else {
					oActionPromise = _executeAction(oAppComponent, mActionExecutionParameters);
				}
				return oActionPromise
					.then(function(oOperationResult) {
						resolve(oOperationResult);
					})
					.catch(function(oOperationResult) {
						reject(oOperationResult);
					});
			});
		}

		function confirmCriticalAction(
			sActionName,
			oAppComponent,
			sActionLabel,
			mParameters,
			aActionParameters,
			oActionContext,
			oParentControl,
			entitySetName,
			messageHandler
		) {
			return new Promise(function(resolve, reject) {
				var boundActionName = sActionName ? sActionName : null;
				boundActionName =
					boundActionName.indexOf(".") >= 0 ? boundActionName.split(".")[boundActionName.split(".").length - 1] : boundActionName;
				var suffixResourceKey = boundActionName && entitySetName ? entitySetName + "|" + boundActionName : "";
				var oResourceBundle = oParentControl.getController().oResourceBundle;
				var sConfirmationText = CommonUtils.getTranslatedText(
					"C_OPERATIONS_ACTION_CONFIRM_MESSAGE",
					oResourceBundle,
					null,
					suffixResourceKey
				);

				MessageBox.confirm(sConfirmationText, {
					onClose: function(sAction) {
						if (sAction === MessageBox.Action.OK) {
							return _executeAction(oAppComponent, mParameters)
								.then(function(oOperation) {
									resolve(oOperation);
								})
								.catch(function(oError) {
									messageHandler
										.showMessageDialog()
										.then(function() {
											reject(oError);
										})
										.catch(function() {
											reject(oError);
										});
								});
						} else {
							resolve();
						}
					}
				});
			});
		}

		function showActionParameterDialog(
			sActionName,
			oAppComponent,
			sActionLabel,
			mParameters,
			aActionParameters,
			oActionContext,
			oParentControl,
			entitySetName,
			messageHandler
		) {
			var sPath = _getPath(oActionContext, sActionName),
				metaModel = oActionContext.getModel().oModel.getMetaModel(),
				entitySetContext = metaModel.createBindingContext(sPath),
				sActionNamePath = oActionContext.getObject("$IsBound")
					? oActionContext.getPath().split("/@$ui5.overload/0")[0]
					: oActionContext.getPath().split("/0")[0],
				actionNameContext = metaModel.createBindingContext(sActionNamePath),
				sFragmentName = "sap/fe/core/controls/ActionParameterDialog";
			return new Promise(function(resolve, reject) {
				var oFragment = XMLTemplateProcessor.loadTemplate(sFragmentName, "fragment"),
					oParameterModel = new JSONModel({
						$displayMode: {}
					}),
					aFieldInvalid = [],
					aFormElements = [],
					mFieldValueMap = {},
					validateRequiredProperties = function() {
						return Promise.all(
							aFormElements
								.filter(function(oFormElement) {
									var oField = oFormElement.getFields()[0];
									return oField.getRequired() && oField.getValueState() !== "Error";
								})
								.map(function(oFormElement) {
									var value = oFormElement.getFields()[0].isA("sap.ui.mdc.MultiValueField")
										? oFormElement.getFields()[0].getItems()
										: oFormElement.getFields()[0].getValue();
									if (value === undefined || value === null || value === "") {
										return oFormElement.getLabel().getText();
									}
								})
						).then(function(aResults) {
							aResults = aResults.filter(function(result) {
								return result !== undefined;
							});
							return aResults;
						});
					},
					_validateMessages = function(aActionParameters, aFieldInvalid, bClearTarget) {
						var oMessageManager = sap.ui.getCore().getMessageManager();
						var aMessages = oMessageManager.getMessageModel().getData();

						aFieldInvalid = [];

						aActionParameters.forEach(function(oActionParameters) {
							var sParameter = oActionParameters.$Name;
							aMessages.forEach(function(oMessage) {
								var sParam = sParameter.replace("-inner", "");
								if (
									oMessage.controlIds.length > 0 &&
									(oMessage.getControlId().includes("APD_::" + sParameter) ||
										(oMessage.getControlId().includes("APD_::" + sParameter + "inner") &&
											aFieldInvalid.indexOf("APD_::" + sParam) < 0))
								) {
									if (bClearTarget) {
										oMessageManager.removeMessages(oMessage);
									} else {
										aFieldInvalid.push("APD_::" + sParam);
									}
								}
								// Handle messages related to input with invalid token
								if (oMessage.target.includes("APD_::" + sParameter)) {
									aFieldInvalid.push("APD_::" + sParam);
									oMessage.target = bClearTarget ? "" : oMessage.target;
									oMessageManager.removeMessages(oMessage);
								}
							});
						});
						return aFieldInvalid;
					},
					oController = {
						handleChange: function(oEvent) {
							messageHandler.removeTransitionMessages();
							var oField = oEvent.getSource();
							var sFieldId = oEvent.getParameter("id");
							var oFieldPromise = oEvent.getParameter("promise");
							if (oFieldPromise) {
								mFieldValueMap[sFieldId] = oFieldPromise.then(function() {
									return oField.getValue();
								});
							}
							_validateMessages(aActionParameters, aFieldInvalid);
						}
					};

				return Promise.resolve(
					XMLPreprocessor.process(
						oFragment,
						{ name: sFragmentName },
						{
							bindingContexts: {
								action: oActionContext,
								actionName: actionNameContext,
								entitySet: entitySetContext
							},
							models: {
								action: oActionContext.getModel(),
								actionName: actionNameContext.getModel(),
								entitySet: entitySetContext.getModel(),
								metaModel: entitySetContext.getModel()
							}
						}
					)
				)
					.then(function(oFragment) {
						// TODO: move the dialog into the fragment and move the handlers to the oController
						return CommonUtils.setUserDefaults(oAppComponent, aActionParameters, oParameterModel, true).then(function() {
							// TODO: move the dialog into the fragment and move the handlers to the oController
							return Fragment.load({ definition: oFragment, controller: oController }).then(function(oDialogContent) {
								var oOperationBinding;
								var oResourceBundle = oParentControl.getController().oResourceBundle;
								var oDialog = new Dialog({
									title:
										sActionLabel ||
										CommonUtils.getTranslatedText("C_OPERATIONS_ACTION_PARAMETER_DIALOG_TITLE", oResourceBundle),
									content: [oDialogContent],
									escapeHandler: function(oPromise) {
										oDialog.close();
										messageHandler.removeTransitionMessages();
										reject();
									},
									beginButton: {
										text: sActionLabel || CommonUtils.getTranslatedText("C_COMMON_DIALOG_OK", oResourceBundle),
										type: "Emphasized",
										press: function(oEvent) {
											validateRequiredProperties()
												.then(function(aEmptyMandatoryFields) {
													if (aEmptyMandatoryFields.length) {
														var oMessages = [];
														for (var i = 0; i < aEmptyMandatoryFields.length; i++) {
															oMessages.push({
																text: CommonUtils.getTranslatedText(
																	"C_OPERATIONS_ACTION_PARAMETER_DIALOG_MISSING_MANDATORY_MSG",
																	oResourceBundle,
																	aEmptyMandatoryFields[i]
																),
																code: 200,
																type: "Error"
															});
														}
														messageHandler.showMessageDialog({
															customMessages: oMessages
														});
														return;
													}

													aFieldInvalid = _validateMessages(aActionParameters, aFieldInvalid);

													if (aFieldInvalid.length > 0) {
														return messageHandling.showUnboundMessages();
													}
													BusyLocker.lock(oDialog);
													return Promise.all(
														Object.keys(mFieldValueMap).map(function(sKey) {
															return mFieldValueMap[sKey];
														})
													)
														.then(function() {
															// TODO: due to using the search and value helps on the action dialog transient messages could appear
															// we need an UX design for those to show them to the user - for now remove them before continuing
															messageHandler.removeTransitionMessages();
															// move parameter values from Dialog (SimpleForm) to mParameters.actionParameters so that they are available in the operation bindings for all contexts
															var vParameterValue,
																oParameterContext =
																	oOperationBinding && oOperationBinding.getParameterContext();
															for (var i in aActionParameters) {
																if (aActionParameters[i].$isCollection) {
																	var aMVFContent = oDialog
																			.getModel("mvfview")
																			.getProperty("/" + aActionParameters[i].$Name),
																		aKeyValues = [];
																	for (var j in aMVFContent) {
																		aKeyValues.push(aMVFContent[j].Key);
																	}
																	vParameterValue = aKeyValues;
																} else {
																	vParameterValue = oParameterContext.getProperty(
																		aActionParameters[i].$Name
																	);
																}
																aActionParameters[i].value = vParameterValue;
																vParameterValue = undefined;
															}
															return _executeAction(oAppComponent, mParameters)
																.then(function(oOperation) {
																	oDialog.close();
																	resolve(oOperation);
																})
																.catch(function(oError) {
																	throw oError;
																});
														})
														.catch(function() {
															var oMessageManager = sap.ui.getCore().getMessageManager();
															var bHasEtagMessage = messageHandling.modifyETagMessagesOnly(
																oMessageManager,
																oResourceBundle
															);

															messageHandler.showMessages({
																bHasEtagMessage: bHasEtagMessage,
																context: mParameters.aContexts[0],
																isActionParameterDialogOpen: true,
																messagePageNavigationCallback: function() {
																	oDialog.close();
																}
															});
															if (oDialog && bHasEtagMessage) {
																oDialog.close(); //close the action parameter dialog after refresh of the context after etag mismatch
															}
														})
														.finally(function() {
															BusyLocker.unlock(oDialog);
														});
												})
												.catch(function() {
													return messageHandler.showMessageDialog();
												});
										}
									},
									endButton: {
										text: CommonUtils.getTranslatedText("C_COMMON_ACTION_PARAMETER_DIALOG_CANCEL", oResourceBundle),
										press: function() {
											_validateMessages(aActionParameters, aFieldInvalid, true);
											oDialog.close();
											messageHandler.removeTransitionMessages();
											reject(Constants.CancelActionDialog);
										}
									},
									beforeOpen: function(oEvent) {
										// clone event for actionWrapper as oEvent.oSource gets lost during processing of beforeOpen event handler
										var oCloneEvent = Object.assign({}, oEvent);
										messageHandler.removeTransitionMessages();

										var fnSetDefaultsAndOpenDialog = function(sBindingParameter) {
											var prefillParameter = function(sParamName, vParamDefaultValue) {
												return new Promise(function(resolve, reject) {
													// Case 1: There is a ParameterDefaultValue annotation
													if (vParamDefaultValue !== undefined) {
														if (aContexts.length > 0 && vParamDefaultValue.$Path) {
															var oPromise = CommonUtils.requestSingletonProperty(
																vParamDefaultValue.$Path,
																oOperationBinding.getModel()
															);
															oPromise
																.then(function(oValue) {
																	if (oValue === null) {
																		return oOperationBinding
																			.getParameterContext()
																			.requestProperty(vParamDefaultValue.$Path);
																	}
																	return oValue;
																})
																.then(function(vParamValue) {
																	if (aContexts.length > 1) {
																		// For multi select, need to loop over aContexts (as contexts cannot be retrieved via binding parameter of the operation binding)
																		var sPathForContext = vParamDefaultValue.$Path;
																		if (sPathForContext.indexOf(sBindingParameter + "/") === 0) {
																			sPathForContext = sPathForContext.replace(
																				sBindingParameter + "/",
																				""
																			);
																		}
																		for (var i = 1; i < aContexts.length; i++) {
																			if (aContexts[i].getProperty(sPathForContext) !== vParamValue) {
																				// if the values from the contexts are not all the same, do not prefill
																				resolve({
																					paramName: sParamName,
																					value: undefined,
																					bNoPossibleValue: true
																				});
																			}
																		}
																	}
																	resolve({ paramName: sParamName, value: vParamValue });
																})
																.catch(function() {
																	// Simply clear parameter default if an error has occurred
																	Log.error(
																		"Error while reading default action parameter",
																		sParamName,
																		mParameters.actionName
																	);
																	resolve({
																		paramName: sParamName,
																		value: undefined,
																		bLatePropertyError: true
																	});
																});
														} else {
															// Case 1.2: ParameterDefaultValue defines a fixed string value (i.e. vParamDefaultValue = 'someString')
															resolve({ paramName: sParamName, value: vParamDefaultValue });
														}
													} else {
														// Case 2: There is no ParameterDefaultValue annotation (=> look into the FLP User Defaults)
														if (oParameterModel && oParameterModel.oData[sParamName]) {
															resolve({
																paramName: sParamName,
																value: oParameterModel.oData[sParamName]
															});
														} else {
															resolve({ paramName: sParamName, value: undefined });
														}
													}
												});
											};

											var getParameterDefaultValue = function(sParamName) {
												var oMetaModel = oDialog.getModel().getMetaModel(),
													sActionPath = oActionContext.sPath && oActionContext.sPath.split("/@")[0],
													sActionParameterAnnotationTarget = sActionPath + "/" + sParamName + "@",
													oParameterAnnotations = oMetaModel.getObject(sActionParameterAnnotationTarget),
													oParameterDefaultValue =
														oParameterAnnotations &&
														oParameterAnnotations["@com.sap.vocabularies.UI.v1.ParameterDefaultValue"]; // either { $Path: 'somePath' } or 'someString'
												return oParameterDefaultValue;
											};

											var getDefaultValuesFunction = function() {
												var oMetaModel = oDialog.getModel().getMetaModel(),
													sActionPath = oActionContext.sPath && oActionContext.sPath.split("/@")[0],
													sDefaultValuesFunction = oMetaModel.getObject(
														sActionPath + "@com.sap.vocabularies.Common.v1.DefaultValuesFunction"
													);
												return sDefaultValuesFunction;
											};

											var aCurrentParamDefaultValue = [];
											var sParamName, vParameterDefaultValue;
											for (var i in aActionParameters) {
												sParamName = aActionParameters[i].$Name;
												vParameterDefaultValue = getParameterDefaultValue(sParamName);
												aCurrentParamDefaultValue.push(prefillParameter(sParamName, vParameterDefaultValue));
											}

											if (oActionContext.getObject("$IsBound") && aContexts.length > 0) {
												var sBoundFunctionName = getDefaultValuesFunction();
												if (
													sBoundFunctionName &&
													sBoundFunctionName.length > 0 &&
													typeof sBoundFunctionName === "string"
												) {
													var aFunctionParams = [];
													for (var i in aContexts) {
														aFunctionParams.push(
															callBoundFunction(
																sBoundFunctionName,
																aContexts[i],
																mParameters.model,
																mParameters
															)
														);
													}
												}
											}

											var aPrefillParamPromises = Promise.all(aCurrentParamDefaultValue),
												aExecFunctionPromises = [],
												oExecFunctionFromManifestPromise;
											if (aFunctionParams) {
												aExecFunctionPromises = Promise.all(aFunctionParams);
											}
											if (mParameters.defaultValuesExtensionFunction) {
												var sModule = mParameters.defaultValuesExtensionFunction
														.substring(0, mParameters.defaultValuesExtensionFunction.lastIndexOf(".") || -1)
														.replace(/\./gi, "/"),
													sFunctionName = mParameters.defaultValuesExtensionFunction.substring(
														mParameters.defaultValuesExtensionFunction.lastIndexOf(".") + 1,
														mParameters.defaultValuesExtensionFunction.length
													);
												oExecFunctionFromManifestPromise = FPMHelper.actionWrapper(
													oCloneEvent,
													sModule,
													sFunctionName,
													{ "contexts": aContexts }
												);
											}

											Promise.all([aPrefillParamPromises, aExecFunctionPromises, oExecFunctionFromManifestPromise])
												.then(function(aPromises) {
													var aCurrentParamDefaultValue = aPromises[0],
														aFunctionParams = aPromises[1],
														oFunctionParamsFromManifest = aPromises[2],
														sDialogParamName;
													for (var i in aActionParameters) {
														sDialogParamName = aActionParameters[i].$Name;
														if (
															oFunctionParamsFromManifest &&
															oFunctionParamsFromManifest.hasOwnProperty(sDialogParamName)
														) {
															oOperationBinding.setParameter(
																aActionParameters[i].$Name,
																oFunctionParamsFromManifest[sDialogParamName]
															);
														} else if (
															aCurrentParamDefaultValue[i] &&
															aCurrentParamDefaultValue[i].value !== undefined
														) {
															oOperationBinding.setParameter(
																aActionParameters[i].$Name,
																aCurrentParamDefaultValue[i].value
															);
															// if the default value had not been previously determined due to different contexts, we do nothing else
														} else if (sBoundFunctionName && !aCurrentParamDefaultValue[i].bNoPossibleValue) {
															if (aContexts.length > 1) {
																// we check if the function retrieves the same param value for all the contexts:
																var j = 0;
																while (j < aContexts.length - 1) {
																	if (
																		aFunctionParams[j] &&
																		aFunctionParams[j + 1] &&
																		aFunctionParams[j].getObject(sDialogParamName) ===
																			aFunctionParams[j + 1].getObject(sDialogParamName)
																	) {
																		j++;
																	} else {
																		break;
																	}
																}
																//param values are all the same:
																if (j === aContexts.length - 1) {
																	oOperationBinding.setParameter(
																		aActionParameters[i].$Name,
																		aFunctionParams[j].getObject(sDialogParamName)
																	);
																}
															} else {
																//Only one context, then the default param values are to be verified from the function:

																if (aFunctionParams[0] && aFunctionParams[0].getObject(sDialogParamName)) {
																	oOperationBinding.setParameter(
																		aActionParameters[i].$Name,
																		aFunctionParams[0].getObject(sDialogParamName)
																	);
																}
															}
														}
													}
													var bErrorFound = aCurrentParamDefaultValue.some(function(oValue) {
														if (oValue.bLatePropertyError) {
															return oValue.bLatePropertyError;
														}
													});
													// If at least one Default Property is a Late Property and an eTag error was raised.
													if (bErrorFound) {
														var sText = CommonUtils.getTranslatedText(
															"C_APP_COMPONENT_SAPFE_ETAG_LATE_PROPERTY",
															oResourceBundle
														);
														MessageBox.warning(sText, { contentWidth: "25em" });
													}
												})
												.catch();
										};

										if (oActionContext.getObject("$IsBound") && aContexts.length > 0) {
											var aParameters = oActionContext.getObject("$Parameter"),
												sBindingParameter = aParameters[0] && aParameters[0].$Name;
											aContexts[0]
												.requestObject()
												.then(function(oContextObject) {
													if (oContextObject) {
														oOperationBinding.setParameter(sBindingParameter, oContextObject);
													}
													fnSetDefaultsAndOpenDialog(sBindingParameter);
												})
												.catch(function(oError) {
													Log.error("Error while retrieving the parameter", oError);
												});
										} else {
											fnSetDefaultsAndOpenDialog();
										}
									},
									afterClose: function() {
										oDialog.destroy();
									}
								});
								aFormElements = oDialogContent
									.getAggregation("form")
									.getAggregation("formContainers")[0]
									.getAggregation("formElements");
								oDialog.setModel(oActionContext.getModel().oModel);
								oDialog.setModel(oParameterModel, "paramsModel");
								oDialog.bindElement({
									path: "/",
									model: "paramsModel"
								});
								// empty model to add elements dynamically depending on number of MVF fields defined on the dialog
								var oMVFModel = new JSONModel({});
								oDialog.setModel(oMVFModel, "mvfview");

								var sActionPath = sActionName + "(...)";
								var aContexts = mParameters.aContexts || [];
								if (!aContexts.length) {
									sActionPath = "/" + sActionPath;
								}
								oDialog.bindElement({
									path: sActionPath
								});
								if (oParentControl) {
									// if there is a parent control specified add the dialog as dependent
									oParentControl.addDependent(oDialog);
								}
								if (aContexts.length > 0) {
									oDialog.setBindingContext(aContexts[0]); // use context of first selected line item
								}
								oOperationBinding = oDialog.getObjectBinding();
								oDialog.open();
							});
						});
					})
					.catch(reject);
			});
		}

		function prepareActionParameters(oAction, aPredefinedParameters) {
			// check if parameters exist at all
			var aParameters = getActionParameters(oAction);
			aPredefinedParameters = aPredefinedParameters || [];

			if (aPredefinedParameters.length > 0) {
				// TODO: merge the predefined once with the real existing one
			}

			return aParameters;
		}

		function getActionParameters(oAction) {
			var aParameters = oAction.getObject("$Parameter") || [];
			if (aParameters && aParameters.length) {
				if (oAction.getObject("$IsBound")) {
					//in case of bound actions, ignore the first parameter and consider the rest
					return aParameters.slice(1, aParameters.length) || [];
				}
			}
			return aParameters;
		}
		function getIsActionCritical(oMetaModel, sPath, contexts, oBoundAction) {
			var vActionCritical = oMetaModel.getObject(sPath + "@com.sap.vocabularies.Common.v1.IsActionCritical"),
				sCriticalPath = vActionCritical && vActionCritical.$Path;
			if (!sCriticalPath) {
				// the static value scenario for isActionCritical
				return !!vActionCritical;
			}
			var aBindingParams = oBoundAction && oBoundAction.getObject("$Parameter"),
				aPaths = sCriticalPath && sCriticalPath.split("/"),
				bCondition =
					aBindingParams &&
					aBindingParams.length &&
					typeof aBindingParams === "object" &&
					sCriticalPath &&
					contexts &&
					contexts.length;
			if (bCondition) {
				//in case binding patameters are there in path need to remove eg: - _it/isVerified => need to remove _it and the path should be isVerified
				aBindingParams.filter(function(oParams) {
					var index = aPaths && aPaths.indexOf(oParams.$Name);
					if (index > -1) {
						aPaths.splice(index, 1);
					}
				});
				sCriticalPath = aPaths.join("/");
				return contexts[0].getObject(sCriticalPath);
			} else if (sCriticalPath) {
				//if scenario is path based return the path value
				return contexts[0].getObject(sCriticalPath);
			}
		}

		function _executeAction(oAppComponent, mParameters) {
			var aContexts = mParameters.aContexts || [],
				oModel = mParameters.model,
				iExistingMessages = messageHandling.getMessages().length || 0,
				aActionParameters = mParameters.aActionParameters || [],
				sActionName = mParameters.actionName,
				fnOnSubmitted = mParameters.fnOnSubmitted,
				fnOnResponse = mParameters.fnOnResponse,
				bIsCreateAction = mParameters.bIsCreateAction,
				bActionParametersExist = false,
				oAction;

			function fnDifferentiate(promise) {
				return promise.then(
					function(response) {
						var aMessages = messageHandling.getMessages();
						// Action Dialog must remain open if there are response error-messages, because in the java stack the dialog would be closed immediately.
						if (aMessages.length > iExistingMessages && aMessages[aMessages.length - 1].type === "Error") {
							return { response: response, status: "rejected" };
						}
						return { response: response, status: "resolved" };
					},
					function(response) {
						return { response: response, status: "rejected" };
					}
				);
			}

			function setActionParameterDefaultValue() {
				if (aActionParameters && aActionParameters.length) {
					bActionParametersExist = true;
					for (var j = 0; j < aActionParameters.length; j++) {
						if (!aActionParameters[j].value) {
							switch (aActionParameters[j].$Type) {
								case "Edm.String":
									aActionParameters[j].value = "";
									break;
								case "Edm.Boolean":
									aActionParameters[j].value = false;
									break;
								case "Edm.Byte":
								case "Edm.Int16":
								case "Edm.Int32":
								case "Edm.Int64":
									aActionParameters[j].value = 0;
									break;
								// tbc
								default:
									break;
							}
						}
						oAction.setParameter(aActionParameters[j].$Name, aActionParameters[j].value);
					}
				}
			}

			if (aContexts.length) {
				return new Promise(function(resolve, reject) {
					var mBindingParameters = mParameters.mBindingParameters,
						bGrouped = mParameters.bGrouped,
						bReturnAsArray = mParameters.bReturnAsArray,
						bGetBoundContext = mParameters.bGetBoundContext,
						aActionPromises = [],
						oActionPromise,
						i,
						sGroupId,
						fnExecuteAction = function(oAction, index, oSideEffect) {
							setActionParameterDefaultValue();
							// For invocation grouping "isolated" need batch group per action call
							sGroupId = !bGrouped ? "$auto." + index : oAction.getUpdateGroupId();
							oActionPromise = bGetBoundContext
								? oAction.execute(sGroupId).then(function() {
										return oAction.getBoundContext();
								  })
								: oAction.execute(sGroupId);
							aActionPromises.push(oActionPromise);
							var oSideEffectsService = oAppComponent.getSideEffectsService();
							// trigger actions from side effects
							if (oSideEffect && oSideEffect.triggerActions && oSideEffect.triggerActions.length) {
								oSideEffect.triggerActions.forEach(function(sTriggerAction) {
									if (sTriggerAction) {
										oSideEffectsService.executeAction(sTriggerAction, oSideEffect.context, sGroupId);
									}
								});
							}
							// request side effects for this action
							// as we move the messages request to POST $select we need to be prepared for an empty array
							if (oSideEffect && oSideEffect.pathExpressions && oSideEffect.pathExpressions.length > 0) {
								oSideEffectsService
									.requestSideEffects(oSideEffect.pathExpressions, oSideEffect.context, sGroupId)
									.then(function() {
										if (mParameters.operationAvailableMap && mParameters.internalModelContext) {
											CommonUtils.setActionEnablement(
												mParameters.internalModelContext,
												JSON.parse(mParameters.operationAvailableMap),
												mParameters.aContexts
											);
										}
									})
									.catch(function(oError) {
										Log.error("Error while requesting side effects", oError);
									});
							}
						},
						fnExecuteSingleAction = function(oAction, index, oSideEffect) {
							var oPromise = new Promise(function(resolve, reject) {
								var oLocalPromise,
									aLocalPromise = [];
								setActionParameterDefaultValue();
								// For invocation grouping "isolated" need batch group per action call
								sGroupId = "apiMode" + index;
								oActionPromise = bGetBoundContext
									? oAction.execute(sGroupId).then(function() {
											return oAction.getBoundContext();
									  })
									: oAction.execute(sGroupId);

								aActionPromises.push(oActionPromise);
								aLocalPromise.push(oActionPromise);
								var oSideEffectsService = oAppComponent.getSideEffectsService();
								// trigger actions from side effects
								if (oSideEffect && oSideEffect.triggerActions && oSideEffect.triggerActions.length) {
									oSideEffect.triggerActions.forEach(function(sTriggerAction) {
										if (sTriggerAction) {
											oLocalPromise = oSideEffectsService.executeAction(
												sTriggerAction,
												oSideEffect.context,
												sGroupId
											);
											aLocalPromise.push(oLocalPromise);
										}
									});
								}
								// request side effects for this action
								// as we move the messages request to POST $select we need to be prepared for an empty array
								if (oSideEffect && oSideEffect.pathExpressions && oSideEffect.pathExpressions.length > 0) {
									oLocalPromise = oSideEffectsService.requestSideEffects(
										oSideEffect.pathExpressions,
										oSideEffect.context,
										sGroupId
									);
									aLocalPromise.push(oLocalPromise);
									oLocalPromise
										.then(function() {
											if (mParameters.operationAvailableMap && mParameters.internalModelContext) {
												CommonUtils.setActionEnablement(
													mParameters.internalModelContext,
													JSON.parse(mParameters.operationAvailableMap),
													mParameters.aContexts
												);
											}
										})
										.catch(function(oError) {
											Log.error("Error while requesting side effects", oError);
										});
								}
								oModel.submitBatch(sGroupId);
								Promise.all(aLocalPromise)
									.then(function() {
										return resolve();
									})
									.catch(function() {
										return resolve();
									});
							});
							return oPromise;
						};

					function fnExecuteSequentially(aContexts) {
						// One action and its side effects are completed before the next action is executed
						(fnOnSubmitted || function noop() {})(aActionPromises);
						function processOneAction(context, i) {
							oAction = oModel.bindContext(sActionName + "(...)", context, mBindingParameters);
							return fnExecuteSingleAction(oAction, i, {
								context: context,
								pathExpressions: mParameters.additionalSideEffect && mParameters.additionalSideEffect.pathExpressions,
								triggerActions: mParameters.additionalSideEffect && mParameters.additionalSideEffect.triggerActions
							});
						}

						var oActionAndSideEffectPromise = Promise.resolve(undefined);
						var j = 0;
						aContexts.forEach(function(context) {
							var id = ++j;
							oActionAndSideEffectPromise = oActionAndSideEffectPromise.then(function() {
								return processOneAction(context, id);
							});
						});
						oActionAndSideEffectPromise
							.then(function() {
								fnHandleResults();
							})
							.catch();
					}

					if (mParameters.bObjectPage && !bGrouped) {
						// For invocation grouping "isolated" called from ObjectPage, ensure that each action and matching side effects
						// are processed before the next set is submitted. Workaround until JSON batch is available.
						fnExecuteSequentially(aContexts);
					} else {
						for (i = 0; i < aContexts.length; i++) {
							oAction = oModel.bindContext(sActionName + "(...)", aContexts[i], mBindingParameters);
							fnExecuteAction(oAction, aContexts.length <= 1 ? null : i, {
								context: aContexts[i],
								pathExpressions: mParameters.additionalSideEffect && mParameters.additionalSideEffect.pathExpressions,
								triggerActions: mParameters.additionalSideEffect && mParameters.additionalSideEffect.triggerActions
							});
						}
						(fnOnSubmitted || function noop() {})(aActionPromises);
						fnHandleResults();
					}

					function fnHandleResults() {
						Promise.all(aActionPromises.map(fnDifferentiate))
							.then(function(results) {
								var aRejectedItems = [],
									aResolvedItems = [],
									iResultCount;
								for (iResultCount = 0; iResultCount < results.length; iResultCount++) {
									if (results[iResultCount].status === "rejected") {
										aRejectedItems.push(results[iResultCount].response);
									}
									if (results[iResultCount].status === "resolved") {
										if (bIsCreateAction && bActionParametersExist) {
											//only used for NewAction
											results[iResultCount].bConsiderDocumentModified = true;
											aResolvedItems.push(results[iResultCount]);
										} else {
											aResolvedItems.push(results[iResultCount].response);
										}
									}
								}
								if (!results || (results && results.length === 0)) {
									reject(true);
								}
								if (aRejectedItems.length === 0) {
									if (bReturnAsArray) {
										resolve(aResolvedItems);
									} else {
										// context is given directly without an array so also no array is expected
										resolve(aResolvedItems[0]);
									}
								} else {
									reject({
										resolvedItems: aResolvedItems,
										rejectedItems: aRejectedItems
									});
								}
							})
							.catch(reject);
					}
				}).finally(function() {
					(fnOnResponse || function noop() {})();
				});
			} else {
				var oActionPromise;
				oAction = oModel.bindContext("/" + sActionName + "(...)");
				setActionParameterDefaultValue();
				oActionPromise = oAction.execute("actionImport");
				oModel.submitBatch("actionImport");
				// trigger onSubmitted "event"
				(fnOnSubmitted || function noop() {})(oActionPromise);
				return oActionPromise.finally(function() {
					(fnOnResponse || function noop() {})();
				});
			}
		}

		function _getPath(oActionContext, sActionName) {
			var sPath = oActionContext.getPath();
			sPath = oActionContext.getObject("$IsBound") ? sPath.split("@$ui5.overload")[0] : sPath.split("/0")[0];
			return sPath.split("/" + sActionName)[0];
		}

		/**
		 * Static functions to call OData actions (bound/import) and functions (bound/import)
		 *
		 * @namespace
		 * @alias sap.fe.core.actions.operations
		 * @private
		 * @experimental This module is only for experimental use! <br/><b>This is only a POC and maybe deleted</b>
		 * @since 1.56.0
		 */
		var operations = {
			callBoundAction: callBoundAction,
			callActionImport: callActionImport,
			callBoundFunction: callBoundFunction,
			callFunctionImport: callFunctionImport
		};
		return operations;
	}
);
