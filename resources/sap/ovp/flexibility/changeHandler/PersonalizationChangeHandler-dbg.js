sap.ui.define(["sap/ovp/cards/CommonUtils"], function (CommonUtils) {
	'use strict';

	var oChangeHandler = {
		"changeHandler": {
			applyChange: function (oChange, oPanel, mPropertyBag) {
				var personalizationDefaultMainController = CommonUtils.getApp();
				personalizationDefaultMainController.appendIncomingDeltaChange(oChange);
				return;
			},
			getCondenserInfo: function(oChange) {
				return {
					affectedControl: oChange.getSelector(),
					classification: sap.ui.fl.condenser.Classification.LastOneWins,
					uniqueKey: oChange.getSelector().id + '-' + oChange.getDefinition().changeType
				};
			},
			completeChangeContent: function (oChange, oSpecificChangeInfo, mPropertyBag) {
				return;
			},
			revertChange: function (oChange, oControl, mPropertyBag) {
				return;
			}
		},
		"layers": {
			"CUSTOMER_BASE": true,
			"CUSTOMER": true,
			"USER": true
		}
	};

	return {
		"viewSwitch": oChangeHandler,
        "visibility": oChangeHandler,
        "position": oChangeHandler,
        "dragOrResize": oChangeHandler
	};

});
