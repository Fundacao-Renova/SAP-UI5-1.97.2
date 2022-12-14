/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./FooterActionsBase","sap/fe/test/Utils","sap/ui/test/OpaBuilder"],function(F,U,O){"use strict";var a=function(o,f){return F.call(this,o,f);};a.prototype=Object.create(F.prototype);a.prototype.constructor=a;a.prototype.isAction=true;a.prototype.iExecuteSave=function(){return this.iExecuteAction({service:"StandardAction",action:"Save",unbound:true});};a.prototype.iExecuteApply=function(){return this.iExecuteAction({service:"StandardAction",action:"Apply",unbound:true});};a.prototype.iExecuteCancel=function(){return this.iExecuteAction({service:"StandardAction",action:"Cancel",unbound:true});};a.prototype.iConfirmCancel=function(){return this.prepareResult(O.create(this).hasType("sap.m.Popover").isDialogElement().doOnChildren(O.Matchers.resourceBundle("text","sap.fe.core","C_TRANSACTION_HELPER_DRAFT_DISCARD_BUTTON"),O.Actions.press()).description("Confirming discard changes").execute());};return a;});
