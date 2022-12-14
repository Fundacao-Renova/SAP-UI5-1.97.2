/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./FooterAssertionsBase","sap/fe/test/Utils","sap/m/library"],function(F,U,l){"use strict";var a=function(o,f){return F.call(this,o,f);};a.prototype=Object.create(F.prototype);a.prototype.constructor=a;a.prototype.isAction=false;var D=l.DraftIndicatorState;function _(o,s){return o.hasContent(function(O){return O.getMetadata().getName()==="sap.m.DraftIndicator"&&O.getState()===s;}).description("Draft Indicator on footer bar is in "+s+" state").execute();}a.prototype.iCheckSave=function(s){return this.iCheckAction({service:"StandardAction",action:"Save",unbound:true},s);};a.prototype.iCheckApply=function(s){return this.iCheckAction({service:"StandardAction",action:"Apply",unbound:true},s);};a.prototype.iCheckCancel=function(s){return this.iCheckAction({service:"StandardAction",action:"Cancel",unbound:true},s);};a.prototype.iCheckDraftStateClear=function(){return this.prepareResult(_(this.getBuilder(),D.Clear));};a.prototype.iCheckDraftStateSaved=function(){return this.prepareResult(_(this.getBuilder(),D.Saved));};return a;});
