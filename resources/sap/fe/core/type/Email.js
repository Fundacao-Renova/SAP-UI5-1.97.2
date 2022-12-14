/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/model/odata/type/String","sap/ui/model/ValidateException"],function(O,V){"use strict";var e=/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;var E=O.extend("sap.fe.core.type.Email",{validateValue:function(v){if(!e.test(v)){throw new V(sap.ui.getCore().getLibraryResourceBundle("sap.fe.core").getText("T_EMAILTYPE_INVALID_VALUE"));}O.prototype.validateValue.apply(this,[v]);}});return E;},false);
