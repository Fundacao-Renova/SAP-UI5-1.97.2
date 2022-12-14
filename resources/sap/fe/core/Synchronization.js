/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/base/Log","sap/ui/base/Object"],function(L,B){"use strict";return B.extend("sap.fe.core.Synchronization",{constructor:function(){this._fnResolve=null;this._isResolved=false;return B.apply(this,arguments);},waitFor:function(){var t=this;if(this._isResolved){return Promise.resolve();}else{return new Promise(function(r,a){t._fnResolve=r;});}},resolve:function(){if(!this._isResolved){this._isResolved=true;if(this._fnResolve){this._fnResolve();}}}});});
