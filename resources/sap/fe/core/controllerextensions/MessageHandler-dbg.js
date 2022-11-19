/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */

sap.ui.define(
	[
		"sap/ui/core/mvc/ControllerExtension",
		"sap/ui/core/mvc/OverrideExecution",
		"sap/fe/core/actions/messageHandling",
		"sap/fe/core/CommonUtils",
		"sap/fe/core/controllerextensions/ControllerExtensionMetadata"
	],
	function(ControllerExtension, OverrideExecution, messageHandling, CommonUtils, ControllerExtensionMetadata) {
		"use strict";

		/**
		 * @class A controller extension offering message handling.
		 *
		 * @name sap.fe.core.controllerextensions.MessageHandler
		 * @hideconstructor
		 * @public
		 * @experimental As of version 1.90.0
		 * @since 1.90.0
		 */

		return ControllerExtension.extend(
			"sap.fe.core.controllerextensions.MessageHandler",
			{
				metadata: {
					methods: {
						showMessageDialog: { "public": true, "final": true },
						getShowBoundMessagesInMessageDialog: {
							"public": false,
							"final": false,
							overrideExecution: OverrideExecution.Instead
						}
					}
				},

				/**
				 * @private
				 * @name sap.fe.core.controllerextensions.MessageHandler.getMetadata
				 * @function
				 */
				/**
				 * @private
				 * @name sap.fe.core.controllerextensions.MessageHandler.extend
				 * @function
				 */
				/**
				 * Determines whether or not bound messages are shown in the message dialog.
				 *
				 * This function is meant to be individually overridden by consuming controllers, but not to be called directly.
				 * The override execution is: {@link sap.ui.core.mvc.OverrideExecution.Instead}.
				 *
				 * If the bound messages are shown to the user with a different control like the (TODO:Link) MessageButton
				 * this method has to be overridden.
				 *
				 * @returns {boolean} Determines whether or not bound messages are shown in the message dialog.
				 * @private
				 */
				getShowBoundMessagesInMessageDialog: function() {
					return true;
				},
				// eslint-disable-next-line jsdoc/require-param
				/**
				 * Shows a message dialog with transition messages if there are any.
				 * The message dialog is shown as a modal dialog. Once the user confirms the dialog, all transition messages
				 * are removed from the message model. If there is more than one message, a list of messages is shown. The user
				 * can filter on message types and can display details as well as the long text. If there is one message,
				 * the dialog immediately shows the details of the message. If there is just one success message, a message
				 * toast is shown instead.
				 * @returns {Promise} A promise that is resolved once the user closes the dialog. If there are no messages
				 * to be shown, the promise is resolved immediately
				 * @alias sap.fe.core.controllerextensions.MessageHandler#showMessageDialog
				 * @public
				 * @experimental As of version 1.90.0
				 * @since 1.90.0
				 */
				showMessageDialog: function(mParameters) {
					var customMessages = mParameters && mParameters.customMessages ? mParameters.customMessages : undefined,
						oOPInternalBindingContext = this.base.getView().getBindingContext("internal");
					// set isActionParameterDialog open so that it can be used in the controller extension to decide whether message dialog should open or not
					if (mParameters && mParameters.isActionParameterDialogOpen && oOPInternalBindingContext) {
						oOPInternalBindingContext.setProperty("isActionParameterDialogOpen", true);
					}
					var bShowBoundMessages = this.getShowBoundMessagesInMessageDialog();
					var oBindingContext = mParameters && mParameters.context ? mParameters.context : this.getView().getBindingContext();
					var bEtagMessage = mParameters && mParameters.bHasEtagMessage;
					// reset  isActionParameterDialogOpen
					// cannot do this operations.js since it is not aware of the view
					if (oOPInternalBindingContext) {
						oOPInternalBindingContext.setProperty("isActionParameterDialogOpen", false);
					}
					return new Promise(function(resolve, reject) {
						// we have to set a timeout to be able to access the most recent messages
						setTimeout(function() {
							// TODO: great API - will be changed later
							messageHandling
								.showUnboundMessages(customMessages, oBindingContext, bEtagMessage, bShowBoundMessages)
								.then(resolve)
								.catch(reject);
						}, 0);
					});
				},

				/**
				 * You can remove the existing transition message from the message model with this method.
				 * With every user interaction that causes server communication (like clicking on an action, changing data),
				 * this method removes the existing transition messages from the message model.
				 * @param {boolean} keepBoundMessage Checks if the bound transition messages are not to be removed
				 *
				 * @alias sap.fe.core.controllerextensions.MessageHandler#removesTransitionMessages
				 * @private
				 */
				removeTransitionMessages: function(keepBoundMessage) {
					if (!keepBoundMessage) {
						messageHandling.removeBoundTransitionMessages();
					}
					messageHandling.removeUnboundTransitionMessages();
				},

				_checkNavigationToMessagePage: function(mParameters) {
					var aUnboundMessages = messageHandling.getMessages(),
						bShowBoundTransitionMessages = this.getShowBoundMessagesInMessageDialog(),
						aBoundTransitionMessages = bShowBoundTransitionMessages ? messageHandling.getMessages(true, true) : [],
						aCustomMessages = mParameters && mParameters.customMessages ? mParameters.customMessages : [],
						bIsStickyEditMode = CommonUtils.isStickyEditMode(this.base.getView()),
						mMessagePageParameters;

					// TODO: Stick mode check is okay as long as the controller extension is used with sap.fe.core and sap.fe.core.AppComponent.
					// It might be better to provide an extension to the consumer of the controller extension to provide this value.

					// The message page can only show 1 message today, so we navigate to it when :
					// 1. There are no bound transition messages to show,
					// 2. There are no custom messages to show, &
					// 3. There is exactly 1 unbound message in the message model with statusCode=503 and retry-After available
					// 4. retryAfter is greater than 120 seconds
					//
					// In Addition, navigating away from a sticky session will destroy the session so we do not navigate to message page for now.
					// TODO: check if navigation should be done in sticky edit mode.
					if (
						!bIsStickyEditMode &&
						!aBoundTransitionMessages.length &&
						!aCustomMessages.length &&
						aUnboundMessages.length === 1
					) {
						var oMessage = aUnboundMessages[0],
							oTechnicalDetails = oMessage.getTechnicalDetails();
						var sRetryAfterMessage;
						if (oTechnicalDetails && oTechnicalDetails.httpStatus === 503) {
							if (oTechnicalDetails.retryAfter) {
								var iSecondsBeforeRetry = this._getSecondsBeforeRetryAfter(oTechnicalDetails.retryAfter);
								if (iSecondsBeforeRetry > 120) {
									// TODO: For now let's keep getRetryAfterMessage in messageHandling because it is needed also by the dialog.
									// We can plan to move this and the dialog logic both to messageHandler controller extension if required.
									sRetryAfterMessage = messageHandling.getRetryAfterMessage(oMessage);
									mMessagePageParameters = {
										description: sRetryAfterMessage
											? sRetryAfterMessage + " " + oMessage.getMessage()
											: oMessage.getMessage(),
										navigateBackToOrigin: true
									};
								}
							} else {
								sRetryAfterMessage = messageHandling.getRetryAfterMessage(oMessage);
								mMessagePageParameters = {
									description: sRetryAfterMessage
										? sRetryAfterMessage + " " + oMessage.getMessage()
										: oMessage.getMessage(),
									navigateBackToOrigin: true
								};
							}
						}
					}
					return mMessagePageParameters;
				},

				_getSecondsBeforeRetryAfter: function(dRetryAfter) {
					var dCurrentDateTime = new Date(),
						iCurrentDateTimeInMilliSeconds = dCurrentDateTime.getTime(),
						iRetryAfterDateTimeInMilliSeconds = dRetryAfter.getTime(),
						iSecondsBeforeRetry = (iRetryAfterDateTimeInMilliSeconds - iCurrentDateTimeInMilliSeconds) / 1000;
					return iSecondsBeforeRetry;
				},
				/**
				 * Shows a message page or a message dialog based on the messages in the message dialog.
				 * @param mParameters
				 * @returns {Promise} A promise that is resolved once the user closes the message dialog or when navigation to the message page is complete. If there are no messages
				 * to be shown, the promise is resolved immediately
				 * @private
				 */
				showMessages: function(mParameters) {
					var mMessagePageParameters = this._checkNavigationToMessagePage(mParameters);
					if (mMessagePageParameters) {
						// navigate to message page.
						// handler before page navigation is triggered, for example to close the action parameter dialog
						mParameters && mParameters.messagePageNavigationCallback && mParameters.messagePageNavigationCallback();

						mMessagePageParameters.handleShellBack = true;
						// TODO: Use Illustrated message instead of normal message page
						// TODO: Return value needs to provided but since this function is private for now hence we can skip this.
						this.removeTransitionMessages();
						var oResourceBundle = sap.ui.getCore().getLibraryResourceBundle("sap.fe.core");
						if (this.base._routing) {
							return new Promise(
								function(resolve, reject) {
									// we have to set a timeout to be able to access the most recent messages
									setTimeout(
										function() {
											// TODO: great API - will be changed later
											this.base._routing
												.navigateToMessagePage(
													oResourceBundle.getText("C_MESSAGE_HANDLING_SAPFE_503_TITLE"),
													mMessagePageParameters
												)
												.then(resolve)
												.catch(reject);
										}.bind(this),
										0
									);
								}.bind(this)
							);
						}
					} else {
						// navigate to message dialog
						return this.showMessageDialog(mParameters);
					}
				}
			},
			ControllerExtensionMetadata
		);
	}
);
