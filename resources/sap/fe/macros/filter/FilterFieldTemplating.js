/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/templating/UIFormatters","sap/fe/core/templating/PropertyFormatters"],function(U,P){"use strict";var _={};var g=P.getPropertyObjectPath;var a=P.getProperty;var h=P.hasValueHelp;var b=U.getDisplayMode;var c=function(C,i){var p=g(C,i);var o=a(C,i);return h(C,i)?b(o,p):"Value";};_.getDisplayProperty=c;return _;},false);
