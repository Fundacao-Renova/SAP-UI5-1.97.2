// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/library","sap/ushell/resources"],function(u,r){"use strict";var A=u.AppType;var a={};a.getDisplayName=function(b){switch(b){case A.OVP:return r.i18n.getText("Apptype.OVP");case A.SEARCH:return r.i18n.getText("Apptype.SEARCH");case A.FACTSHEET:return r.i18n.getText("Apptype.FACTSHEET");case A.COPILOT:return r.i18n.getText("Apptype.COPILOT");case A.URL:return r.i18n.getText("Apptype.URL");default:return r.i18n.getText("Apptype.APP");}};return a;});