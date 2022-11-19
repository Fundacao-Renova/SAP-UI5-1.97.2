/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/OverflowToolbarButton","sap/m/library","sap/m/MenuButton","sap/ui/core/library","sap/ui/Device","sap/ui/core/ShortcutHintsMixin"],function(O,M,a,C,D,S){"use strict";var H=C.aria.HasPopup;var r;var T={createSettingsButton:function(i,e){if(!r){this._loadResourceBundle();}var b=this._createButton(i+"-settings",{icon:"sap-icon://action-settings",text:r.getText("table.SETTINGS"),press:e,tooltip:r.getText("table.SETTINGS"),ariaHasPopup:H.Dialog});S.addConfig(b,{addAccessibilityLabel:true,messageBundleKey:D.os.macintosh?"mdc.PERSONALIZATION_SHORTCUT_MAC":"mdc.PERSONALIZATION_SHORTCUT"},e[1]);return b;},createPasteButton:function(i){var p=this._createButton(i+"-paste");sap.ui.require(["sap/m/plugins/PasteProvider"],function(P){p.addDependent(new P({pasteFor:i+"-innerTable"}));});return p;},createExportButton:function(i,e){if(!r){this._loadResourceBundle();}var m=new a(i+"-export",{icon:"sap-icon://excel-attachment",tooltip:r.getText("table.EXPORT_BUTTON_TEXT"),type:M.ButtonType.Ghost,buttonMode:M.MenuButtonMode.Split,useDefaultActionOnly:true,defaultAction:e.default});sap.ui.getCore().loadLibrary("sap.ui.unified",{async:true}).then(function(){sap.ui.require(["sap/m/Menu","sap/m/MenuItem"],function(b,c){var o=new b({items:[new c({text:r.getText("table.QUICK_EXPORT"),press:e.default}),new c({text:r.getText("table.EXPORT_WITH_SETTINGS"),press:e.exportAs})]});m.setMenu(o);});});S.addConfig(m._getButtonControl(),{addAccessibilityLabel:true,messageBundleKey:D.os.macintosh?"table.SHORTCUT_EXPORT_TO_EXCEL_MAC":"table.SHORTCUT_EXPORT_TO_EXCEL"},e.exportAs[1]);return m;},_createButton:function(i,s){return new O(i,s);},_loadResourceBundle:function(){r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");},showPanel:function(c,p,s,i){T["showUI"+p](c,s);},showUIColumns:function(c,s){c.getEngine().uimanager.show(c,c.getP13nMode(),s);},showUIFilter:function(c,s){c.getEngine().uimanager.show(c,"Filter",s);},createSort:function(c,p,d,R){var s={selected:true,name:p,descending:d,sorted:true};c.getCurrentState().sorters.forEach(function(P){if(P.name==p&&P.descending===d){s.sorted=false;}});var i=[s];c.getEngine().createChanges({control:c,key:"Sort",state:i,applyAbsolute:R});},createGroup:function(c,p){var g={grouped:true,name:p};var G=[g];c.getCurrentState().groupLevels.some(function(P){if(P.name==p){G[0].grouped=false;}});c.getEngine().createChanges({control:c,key:"Group",state:G,applyAbsolute:false});},createAggregation:function(c,p){var A={name:p,aggregated:true};var b=[A];if(c.getCurrentState().aggregations[p]){A.aggregated=false;}c.getEngine().createChanges({control:c,key:"Aggregate",state:b,applyAbsolute:false});},createColumnWidth:function(c,p,w){var o={name:p,width:w};var b=[o];c.getEngine().createChanges({control:c,key:"ColumnWidth",state:b,applyAbsolute:false});},moveColumn:function(c,d,n){if(d!=n){this._moveItem(c,d,n,"moveColumn");}},_moveItem:function(c,d,n,m){var v=c.getCurrentState(c).items||[];var o=v[d];c.getEngine().createChanges({control:c,key:"Column",state:[{name:o.name,position:n}]});}};return T;});
