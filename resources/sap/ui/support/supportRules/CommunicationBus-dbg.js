/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/**
 * @typedef {object} EventListener
 */
sap.ui.define([
	"jquery.sap.script", // contains jQuery.sap.getUriParameters
	"sap/ui/support/supportRules/WindowCommunicationBus",
	"sap/ui/support/supportRules/WCBConfig"
],
function (jQuery, CommunicationBusCommon, CommunicationBusConfig) {
	"use strict";

	var oCommunicationBus;

	var CommunicationBus = CommunicationBusCommon.extend("sap.ui.support.supportRules.CommunicationBus", {
		constructor: function () {
			if (!oCommunicationBus) {
				var oConfig = new CommunicationBusConfig({
					modulePath: "sap/ui/support",
					receivingWindow: "supportTool",
					uriParams: {
						origin: "sap-ui-xx-support-origin",
						frameId: "sap-ui-xx-frame-identifier"
					}
				});
				CommunicationBusCommon.call(this, oConfig);
			} else {
				return oCommunicationBus;
			}
		}
	});

	oCommunicationBus = new CommunicationBus();

	return oCommunicationBus;
}, true);
