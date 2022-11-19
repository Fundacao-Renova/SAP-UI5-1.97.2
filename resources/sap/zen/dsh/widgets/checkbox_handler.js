/*
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/zen/commons/thirdparty/lodash","sap/zen/dsh/utils/BaseHandler"],function(jQuery,_,BaseHandler){"use strict";var CheckboxHandler=function(){BaseHandler.apply(this,arguments);var dispatcher=BaseHandler.dispatcher;var that=this;function fireEvent(oControlProperties,checked){var onclick=that.prepareCommand(oControlProperties.onclick,oControlProperties.status,""+checked);eval(onclick);}function init(c,C){c.setTooltip(C.tooltip);c.setEnabled(C.enabled);c.setChecked(C.checked);c.setText(C.text);}function addevents(c,C){c.attachChange(function(e){if(dispatcher.isMainMode()){fireEvent(C,e.getParameters().selected);}else{fireEvent(C,e.getParameters().checked);}});}this.create=function(c,C){var i=C["id"];var o=this.createDefaultProxy(i);init(o,C);addevents(o,C);return o;};this.update=function(c,C){if(C){init(c,C);}return c;};this.getDefaultProxyClass=function(){return["sap.m.CheckBox","sap.ui.commons.CheckBox"];};this.provideFunctionMapping=function(){return[["setSelected","setChecked"],["attachSelect","attachChange"]];};this.getType=function(){return"checkbox";};this.getDecorator=function(){return"FixedHeightDecorator";};};var instance=new CheckboxHandler();BaseHandler.dispatcher.addHandlers(instance.getType(),instance);return instance;});