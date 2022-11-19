/*
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/zen/commons/thirdparty/lodash","sap/zen/dsh/utils/BaseHandler","sap/ui/core/ListItem","sap/m/Select","sap/ui/commons/DropdownBox"],function(jQuery,_,BaseHandler,ListItem){"use strict";var DropDownListBoxHandler=function(){BaseHandler.apply(this,arguments);var dispatcher=BaseHandler.dispatcher;this.create=function(oChainedControl,oControlProperties){var id=oControlProperties["id"];var oCombo=this.createDefaultProxy(id);var that=this;oCombo.setMaxHistoryItems(0);init(oCombo,oControlProperties);oCombo.attachChange(function(oControlEvent){var key=null;var oItem=oControlEvent.getParameter("selectedItem");if(oItem){key=oItem.getKey();key+="|SeP|";}if(key!==null){var command=that.prepareCommand(oControlProperties.command,"__KEYS__",key);eval(command);}});return oCombo;};this.update=function(c,C){if(C){init(c,C);}return c;};function init(c,C){c.removeAllItems();c.setTooltip(C.tooltip);c.setEnabled(C.enabled);var s=C.selectedItems;var a=null;if(s&&s[0]){a=dispatcher.getValue(s[0],"key");}var b=C.items;for(var i=0;i<b.length;i++){var d=b[i];var k=d.item.key;var t=d.item.val_0;var I=new ListItem(i);I.setKey(k);if(t.length===0){t=k;}I.setText(t);c.addItem(I);if(k===a){c.setSelectedKey(k);}}}this.getDefaultProxyClass=function(){return["sap.m.Select","sap.ui.commons.DropdownBox"];};this.provideFunctionMapping=function(){return[[null,"setMaxHistoryItems"]];};this.getDecorator=function(){return"DataSourceFixedHeightDecorator";};this.getType=function(){return"dropdown";};};var instance=new DropDownListBoxHandler();BaseHandler.dispatcher.addHandlers(instance.getType(),instance);return instance;});