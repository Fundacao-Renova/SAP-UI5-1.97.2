/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./BaseAPI","sap/fe/test/Utils","sap/fe/test/builder/FEBuilder","sap/fe/test/builder/MdcTableBuilder","sap/fe/test/builder/DialogBuilder","sap/ui/test/OpaBuilder","sap/ui/test/actions/Action","sap/ui/core/SortOrder"],function(B,U,F,T,D,O,A,S){"use strict";var a=function(t,v){if(!U.isOfType(t,T)){throw new Error("oTableBuilder parameter must be an TableBuilder instance");}return B.call(this,t,v);};a.prototype=Object.create(B.prototype);a.prototype.constructor=a;a.createRowMatchers=function(r,R,v,e){var b=U.parseArguments([[Object,Number],Object,[Array,Function],Array],arguments),c=[];if(U.isOfType(b[0],Object)){c.push(T.Row.Matchers.cellValues(b[0]));}else if(U.isOfType(b[0],Number)){c.push(function(o){var d=o.getParent(),p=o.sParentAggregationName;return d&&p?d.getAggregation(p).indexOf(o)===b[0]:false;});}if(U.isOfType(b[1],Object)){c.push(T.Row.Matchers.states(b[1]));}if(!U.isOfType(b[3],[null,undefined])){c.push(T.Row.Matchers.emptyCells(b[3]));}if(!U.isOfType(b[2],[null,undefined])){c=c.concat(b[2]);}return c;};a.prototype.createGroupRowMatchers=function(l,t){return[T.Row.Matchers.visualGroup(l,t)];};a.prototype.iOpenColumnAdaptation=function(){var t=this.getBuilder();return this.prepareResult(t.doOpenColumnAdaptation().description(U.formatMessage("Opening the column adaptation dialog for '{0}' (if not open yet)",this.getIdentifier())).execute());};a.prototype.iConfirmColumnAdaptation=function(){return this.prepareResult(T.createAdaptationDialogBuilder(this.getOpaInstance()).doPressFooterButton(O.Matchers.resourceBundle("text","sap.ui.mdc","p13nDialog.OK")).description(U.formatMessage("Confirming the column adaptation dialog for '{0}' (if currently open)",this.getIdentifier())).execute());};a.prototype.iOpenColumnSorting=function(){var t=this.getBuilder();return this.prepareResult(t.doOpenColumnSorting().description(U.formatMessage("Opening the column sorting dialog for '{0}' (if not open yet)",this.getIdentifier())).execute());};a.prototype.iConfirmColumnSorting=function(){return this.prepareResult(T.createSortingDialogBuilder(this.getOpaInstance()).doPressFooterButton(O.Matchers.resourceBundle("text","sap.ui.mdc","p13nDialog.OK")).description(U.formatMessage("Closing the column sorting dialog for '{0}' (if currently open)",this.getIdentifier())).execute());};a.prototype.iOpenFilterDialog=function(){var t=this.getBuilder();return this.prepareResult(t.doOpenColumnFiltering().description(U.formatMessage("Opening the filter dialog for '{0}' (if not open yet)",this.getIdentifier())).execute());};a.prototype.iConfirmFilterDialog=function(){return this.prepareResult(T.createFilteringDialogBuilder(this.getOpaInstance()).doPressFooterButton(O.Matchers.resourceBundle("text","sap.ui.mdc","p13nDialog.OK")).description(U.formatMessage("Closing the filter dialog for '{0}' (if currently open)",this.getIdentifier())).execute());};a.prototype.personalization=function(c,s,v,d,o,f,C){var b=U.parseArguments([[String,Object],Object,[Function,Array,A],String,O,Function,Function],arguments),e=F.create(this.getOpaInstance()),g,h=F.create(this.getOpaInstance()).hasType("sap.m.ColumnListItem").isDialogElement();o=b[4];f=b[5];C=b[6];c=b[0];if(U.isOfType(c,String)){h.hasSome(O.Matchers.bindingProperties(B.MDC_P13N_MODEL,{label:c}),O.Matchers.bindingProperties(B.MDC_P13N_MODEL,{name:c}));}else{h.has(O.Matchers.bindingProperties(B.MDC_P13N_MODEL,{name:c.name}));}s=b[1];var i=s&&s.visible===false;if(!i&&!U.isOfType(s,[null,undefined])){h.hasState(s);}v=b[2];if(!U.isOfType(v,[null,undefined])){o.do(v);}d=b[3];return this.prepareResult(e.success(function(){g=F.controlsExist(o);if(!g){f();o.success(C);}return o.has(O.Matchers.children(h)).has(function(j){if(i){return j.length===0;}return F.Matchers.atIndex(0)(j);}).description(d).execute();}).execute());};a.prototype.sortingPersonalization=function(c,s,v,d,o,f,C){var b=U.parseArguments([[String,Object],Object,[Function,Array,A],String,O,Function,Function],arguments),e=F.create(this.getOpaInstance()),g,h=F.create(this.getOpaInstance()).hasType("sap.m.CustomListItem").isDialogElement(),n=O.Matchers.childrenMatcher(O.create().hasType("sap.m.Select").hasProperties({selectedKey:"$_none"})),t;o=b[4];f=b[5];C=b[6];c=b[0];if(U.isOfType(c,String)){t=O.Matchers.childrenMatcher(O.create(this.getOpaInstance()).hasType("sap.m.Select").has(function(k){return k.getSelectedItem().getText()===c;}));}else{t=O.Matchers.childrenMatcher(O.create(this.getOpaInstance()).hasType("sap.m.Select").hasProperties({selectedKey:c.name}));}o.has(O.Matchers.children(h)).has(function(k){var m=O.Matchers.filter(t)(k);if(m.length){return m;}return O.Matchers.filter(n)(k);}).has(function(k){if(i){return k.length===0;}return F.Matchers.atIndex(0)(k);});s=b[1];var i=s&&s.visible===false;if(!i&&!U.isOfType(s,[null,undefined])){if(s.sortOrder){var j=s.sortOrder;delete s.sortOrder;o.hasChildren(O.create().hasType("sap.m.SegmentedButton").has(function(k){if(j===S.None){return!k.enabled;}return k.getSelectedKey()===(j===S.Ascending?"asc":"desc");}));}}v=b[2];if(!U.isOfType(v,[null,undefined])){o.do(v);}d=b[3];return this.prepareResult(e.success(function(){g=F.controlsExist(o);if(!g){f();o.success(C);}return o.description(d).execute();}).execute());};a.prototype.columnAdaptation=function(c,s,v,d){return this.personalization(c,s,v,d,T.createAdaptationDialogBuilder(this.getOpaInstance()),this.iOpenColumnAdaptation.bind(this),this.iConfirmColumnAdaptation.bind(this));};a.prototype.columnSorting=function(c,s,v,d){return this.sortingPersonalization(c,s,v,d,T.createSortingDialogBuilder(this.getOpaInstance()),this.iOpenColumnSorting.bind(this),this.iConfirmColumnSorting.bind(this));};return a;});
