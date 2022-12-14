/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define([], function() {
	"use strict";
	return {
		onContextUpdate: function(oContext) {
			var that = this;
			that.base._routing.navigateToContext(oContext, { callExtension: true });
		}
	};
});
