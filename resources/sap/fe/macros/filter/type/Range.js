/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./Value"],function(V){"use strict";return V.extend("sap.fe.macros.filter.type.Range",{formatConditionValues:function(v){return v;},formatValue:function(v,i){var r=V.prototype.formatValue.apply(this,arguments);if(!r){var m=this.oFormatOptions.min||Number.MIN_SAFE_INTEGER,M=this.oFormatOptions.max||Number.MAX_SAFE_INTEGER;r=[m,M];}return r;},getDefaultOperatorName:function(){return"BT";}});},true);
