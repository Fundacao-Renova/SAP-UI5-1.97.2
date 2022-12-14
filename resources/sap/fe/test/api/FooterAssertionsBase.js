/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./FooterAPI","sap/fe/test/Utils"],function(F,U){"use strict";var a=function(o,f){return F.call(this,o,f);};a.prototype=Object.create(F.prototype);a.prototype.constructor=a;a.prototype.isAction=false;a.prototype.iCheckAction=function(A,s){var o=this.getBuilder();return this.prepareResult(o.hasContent(this.createActionMatcher(A),s).description(U.formatMessage("Checking footer action '{0}' with state='{1}'",A,s)).execute());};a.prototype.iCheckState=function(s){var o=this.getBuilder();return this.prepareResult(o.hasState(s).description(U.formatMessage("Checking footer with state='{0}'",s)).execute());};return a;});
