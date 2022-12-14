/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
// trach navivigation
sap.ui.define(["sap/esh/search/ui/SearchModel", "sap/esh/search/ui/SearchHelper"], function (SearchModel, SearchHelper) {
    "use strict";
    // model class for track navigation
    // =======================================================================
    var module = (sap.esh.search.ui.HashChangeHandler = {});
    jQuery.extend(module, {
        handle: function (hashChangeInfo) {
            if (!SearchHelper.isLoggingEnabled()) {
                return;
            }
            var that = this;
            that.sourceUrlArray = [];
            if (hashChangeInfo.oldShellHash !== null) {
                that.sourceUrlArray.push(hashChangeInfo.oldShellHash);
            }
            if (hashChangeInfo.oldAppSpecificRoute !== null) {
                if (hashChangeInfo.oldAppSpecificRoute.substring(0, 2) === "&/") {
                    // remove first special parameter indicator "&/"
                    that.sourceUrlArray.push(hashChangeInfo.oldAppSpecificRoute.substring(2));
                }
                else {
                    that.sourceUrlArray.push(hashChangeInfo.oldAppSpecificRoute);
                }
            }
            that._createSearchModel().then(function () {
                var event = {
                    type: "ITEM_NAVIGATE",
                    sourceUrlArray: this.sourceUrlArray,
                    targetUrl: "#" + hashChangeInfo.newShellHash,
                    systemAndClient: this._getSID(),
                };
                if (event.targetUrl.indexOf("=") !== -1) {
                    this.searchModel.sinaNext.logUserEvent(event);
                }
            }.bind(this));
        },
        _createSearchModel: function () {
            var that = this;
            if (that.initializedPromise) {
                return that.initializedPromise;
            }
            // get search model and call init
            that.searchModel = sap.esh.search.ui.getModelSingleton({}, "flp");
            that.initializedPromise = that.searchModel.initBusinessObjSearch();
            return that.initializedPromise;
        },
        _getSID: function () {
            // extract System and Client from sap-system=sid(BE1.001)
            var systemAndClient = {
                systemId: "",
                client: "",
            };
            var url = window.location.href;
            var systemBegin = url.indexOf("sap-system=sid(");
            if (systemBegin !== -1) {
                var systemEnd = url.substring(systemBegin).indexOf(")");
                if (systemEnd !== -1) {
                    var systemInUrl = url.substring(systemBegin + 15, systemBegin + systemEnd);
                    if (systemInUrl.split(".").length === 2) {
                        systemAndClient.systemId = systemInUrl.split(".")[0];
                        systemAndClient.client = systemInUrl.split(".")[1];
                    }
                }
            }
            return systemAndClient;
        },
    });
    return module;
});
