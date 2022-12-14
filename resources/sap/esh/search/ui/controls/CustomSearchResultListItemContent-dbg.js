/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
// iteration 0 : Holger
sap.ui.define([], function () {
    "use strict";
    // jQuery.sap.declare('sap.esh.search.ui.controls.CustomSearchResultListItemContent');
    //
    //     var CustomSearchResultListItemContent = sap.esh.search.ui.controls.CustomSearchResultListItemContent = function() {
    //         this.init.apply(this, arguments);
    //     };
    //
    //     CustomSearchResultListItemContent.prototype = {
    //
    //         init: function(params) {},
    return sap.ui.base.ManagedObject.extend("sap.esh.search.ui.controls.CustomSearchResultListItemContent", {
        metadata: {
            properties: {
                title: "string",
                titleUrl: "string",
                type: "string",
                imageUrl: "string",
                attributes: {
                    type: "object",
                    multiple: true,
                },
                intents: {
                    type: "object",
                    multiple: true,
                },
            },
        },
        init: function () { },
        // overwrite this method and return the custom content of the item
        getContent: function () {
            // should return sap.ui.core.Control or sap.ui.core.Control[]
            return undefined;
        },
        // ///////////////
        // overwrite the following methods to customize the item
        // Show or Hide the Title and Category
        getTitleVisibility: function () {
            return true;
        },
    });
});
