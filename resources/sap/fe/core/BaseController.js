/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/core/mvc/Controller","sap/fe/core/CommonUtils"],function(C,a){"use strict";return C.extend("sap.fe.core.BaseController",{getAppComponent:function(){if(!this._oAppComponent){this._oAppComponent=a.getAppComponent(this.getView());}return this._oAppComponent;},getModel:function(n){return this.getView().getModel(n);},setModel:function(m,n){return this.getView().setModel(m,n);},getResourceBundle:function(i){if(!i){i="i18n";}return this.getAppComponent().getModel(i).getResourceBundle();}});});
