/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./TableAPI","sap/fe/test/Utils","sap/ui/test/OpaBuilder","sap/fe/test/builder/FEBuilder","sap/ui/test/matchers/Interactable","sap/fe/test/builder/VMBuilder","sap/ui/core/SortOrder","sap/ui/core/Core","sap/fe/test/builder/MdcFilterFieldBuilder","./APIHelper"],function(T,U,O,F,I,V,S,C,a,A){"use strict";var b=function(B,t){return T.call(this,B,t);};b.prototype=Object.create(T.prototype);b.prototype.constructor=b;b.prototype.isAction=true;b.prototype.iPressCell=function(r,c){var t=this.getBuilder();return this.prepareResult(t.checkNumberOfMatches(1).doClickOnCell(T.createRowMatchers(r),c).description(U.formatMessage("Pressing cell of table '{0}' with row value = '{1}' and column {2} = '{3}' ",this.getIdentifier(),r,isNaN(c)?"header":"index",c)).execute());};b.prototype.iSelectRows=function(r,s){var c=U.parseArguments([[Object,Number],Object],arguments),t=this.getBuilder();return this.prepareResult(t.doSelect(T.createRowMatchers(c[0],c[1])).description(U.formatMessage("Selecting rows of table '{0}' with values='{1}' and state='{2}'",this.getIdentifier(),c[0],c[1])).execute());};b.prototype.iSelectAllRows=function(){var t=this.getBuilder();return this.prepareResult(t.doSelectAll().description(U.formatMessage("Selecting all rows in table '{0}'",this.getIdentifier())).execute());};b.prototype.iPressRow=function(r){var t=this.getBuilder();return this.prepareResult(t.checkNumberOfMatches(1).doNavigate(T.createRowMatchers(r)).description(U.formatMessage("Pressing row of table '{0}' with values='{1}'",this.getIdentifier(),r)).execute());};b.prototype.iExpandGroupRow=function(l,t){var o=this.getBuilder();return this.prepareResult(o.checkNumberOfMatches(1).doExpand(this.createGroupRowMatchers(l,t)).description(U.formatMessage("Expanding group row {0} - {1} of table '{2}'",l,t,this.getIdentifier())).execute());};b.prototype.iCollapseGroupRow=function(l,t){var o=this.getBuilder();return this.prepareResult(o.checkNumberOfMatches(1).doCollapse(this.createGroupRowMatchers(l,t)).description(U.formatMessage("Collapsing group row {0} - {1} of table '{2}'",l,t,this.getIdentifier())).execute());};b.prototype.iScroll=function(d){var t=this.getBuilder();return this.prepareResult(t.checkNumberOfMatches(1).doScroll(d).description(U.formatMessage("Scrolling the table '{0}' '{1}'",this.getIdentifier(),d)).execute());};b.prototype.iPressMore=function(){var t=this.getBuilder();return this.prepareResult(t.checkNumberOfMatches(1).doPressMore().description(U.formatMessage("Press more")).execute());};b.prototype.iChangeRow=function(r,t){var o=this.getBuilder(),i=false;if(arguments.length===1){i=true;t=r;}if(!i){o.checkNumberOfMatches(1).doEditValues(T.createRowMatchers(r),t);}else{o.checkNumberOfMatches(1).doEditCreationRowValues(t);}return this.prepareResult(o.description(U.formatMessage("Changing row values of table '{0}' with old values='{1}' to new values='{2}'",this.getIdentifier(),i?"<CreationRow>":r,t)).execute());};b.prototype.iExecuteAction=function(v){var c=U.parseArguments([[Object,String]],arguments),t=this.getBuilder();return this.prepareResult(t.doExecuteAction(this.createActionMatcher(v)).description(U.formatMessage("Executing table action '{0}'",c[0])).execute());};b.prototype.iExecuteMenuAction=function(v){return this.prepareResult(A.createMenuActionExecutorBuilder(v).execute());};b.prototype.iExecuteShowHideDetails=function(s){var t=this.getBuilder();return this.prepareResult(t.doShowHideDetails(s).description(U.formatMessage("Executing the Show/Hide Details action for '{0}'{1}",this.getIdentifier(),s!==undefined?" enforcing 'Show Details' = "+s:"")).execute());};b.prototype.iExecuteDelete=function(){var t=this.getBuilder(),d="::StandardAction::Delete";return this.prepareResult(t.doExecuteAction(F.Matchers.id(new RegExp(U.formatMessage("{0}$",d)))).description(U.formatMessage("Pressing delete action of table '{0}'",this.getIdentifier())).execute());};b.prototype.iSelectQuickFilterItem=function(i){var p;if(U.isOfType(i,String)){p={text:i};}else if(U.isOfType(i,Object)){p={key:i.annotationPath};}return this.prepareResult(this.getBuilder().doSelectQuickFilter(O.Matchers.properties(p)).description(U.formatMessage("Selecting on table '{0}' quickFilter Item  with text '{1}'",this.getIdentifier(),i)).execute());};b.prototype.iExecuteCreate=function(){var t=this.getBuilder(),c="::StandardAction::Create";return this.prepareResult(t.doExecuteAction(F.Matchers.id(new RegExp(U.formatMessage("{0}$",c)))).description(U.formatMessage("Pressing create action of table '{0}'",this.getIdentifier())).execute());};b.prototype.iExecutePaste=function(){var t=this.getBuilder(),p="::StandardAction::Paste";return this.prepareResult(t.doExecuteAction(F.Matchers.id(new RegExp(U.formatMessage("{0}$",p)))).description(U.formatMessage("Pressing paste action of table '{0}'",this.getIdentifier())).execute());};b.prototype.iExecuteFullScreen=function(){var t=this.getBuilder(),f="::StandardAction::FullScreen";return this.prepareResult(t.doExecuteAction(F.Matchers.id(new RegExp(U.formatMessage("{0}$",f)))).description(U.formatMessage("Pressing fullscreen action of table '{0}'",this.getIdentifier())).execute());};b.prototype.iExecuteInlineCreate=function(){var t=this.getBuilder();return this.prepareResult(t.doOnChildren(O.create(this).hasType("sap.ui.table.CreationRow").has(F.Matchers.bound()).checkNumberOfMatches(1).doPress("applyBtn")).description(U.formatMessage("Pressing inline create action of table '{0}'",this.getIdentifier())).execute());};b.prototype.iExecuteInlineAction=function(r,c){var d=U.parseArguments([[Object,Number],[String,Number]],arguments),t=this.getBuilder();return this.prepareResult(t.checkNumberOfMatches(1).doExecuteInlineAction(T.createRowMatchers(d[0]),d[1]).description(U.formatMessage("Pressing inline action of table '{0}' for row '{1}' and action "+(U.isOfType(d[1],Number)?"with column index '{2}'":"'{2}'"),this.getIdentifier(),d[0],d[1])).execute());};b.prototype.iExecuteKeyboardShortcut=function(s,r,c){return this.prepareResult(this.getBuilder().doPressKeyboardShortcut(s,r,c).description(U.formatMessage(r&&c?"Execute keyboard shortcut '{1}' on column '{3}' of row with values '{2}' of table '{0}'":"Execute keyboard shortcut '{1}' on table '{0}'",this.getIdentifier(),s,r,c)).execute());};b.prototype.iSaveVariant=function(v){var s=U.isOfType(v,String)?function(t){return V.create(this).hasId(t.getId?t.getId()+"::VM":t[0].getId()+"::VM").doSaveAs(v).description(U.formatMessage("Saving variant for '{0}' as '{1}'",this.getIdentifier(),v)).execute();}:function(t){return V.create(this).hasId(t.getId?t.getId()+"::VM":t[0].getId()+"::VM").doSave().description(U.formatMessage("Saving current variant for '{0}'",this.getIdentifier())).execute();};return this.prepareResult(this.getBuilder().success(s.bind(this)).execute());};b.prototype.iRemoveVariant=function(v){return this.prepareResult(this.getBuilder().success(function(t){return V.create(this).hasId(t.getId()+"::VM").doRemoveVariant(v).description(U.formatMessage("Removing variant '{1}' for '{0}'",this.getIdentifier(),v)).execute();}.bind(this)).execute());};b.prototype.iSelectVariant=function(v){return this.prepareResult(this.getBuilder().success(function(t){return V.create(this).hasId(t.getId()+"::VM").doSelectVariant(v).description(U.formatMessage("Selecting variant '{1}' for '{0}'",this.getIdentifier(),v)).execute();}.bind(this)).execute());};b.prototype.iSetDefaultVariant=function(v){return this.prepareResult(this.getBuilder().success(function(t){return v?V.create(this).hasId(t.getId?t.getId()+"::VM":t[0].getId()+"::VM").doSetVariantAsDefault(v).description(U.formatMessage("Setting variant '{1}' as default for '{0}'",this.getIdentifier(),v)).execute():V.create(this).hasId(t.getId?t.getId()+"::VM":t[0].getId()+"::VM").doResetDefaultVariant().description(U.formatMessage("Setting Standard variant as default for '{0}'",this.getIdentifier())).execute();}.bind(this)).execute());};b.prototype.iAddAdaptationColumn=function(c){return this.columnAdaptation(c,{selected:false},O.Actions.press("selectMulti"),U.formatMessage("Adding column '{1}' to table '{0}'",this.getIdentifier(),c));};b.prototype.iRemoveAdaptationColumn=function(c){return this.columnAdaptation(c,{selected:true},O.Actions.press("selectMulti"),U.formatMessage("Removing column '{1}' from table '{0}'",this.getIdentifier(),c));};b.prototype.iChangeSortOrder=function(c,s){var o=this.getOpaInstance(),d=[],f=function(g){var h=O.create(o).hasType("sap.m.Select"),v=O.Matchers.children(h)(g),i=U.isOfType(c,String)?function(j){return j.getText()===c;}:function(j){return j.getKey()===c.name;};return O.Actions.executor(function(j){var k=j.getItems().find(i);if(!k){throw Error(U.formatMessage("can not find sort item '{0}'",c));}j.setSelectedItem(k);j.fireChange({selectedItem:k});})(v);},e=function(g){var i=s===S.None?"sap-icon://decline":"sap-icon://sort-"+(s===S.Ascending?"ascending":"descending"),t=O.create(o).hasType("sap.m.Button").hasProperties({icon:i});var v=O.Matchers.children(t)(g);return O.Actions.executor(O.Actions.press())(v);};s=s||S.Ascending;switch(s){case S.Ascending:case S.Descending:d.push(f);d.push(e);break;case S.None:d.push(e);break;default:throw new Error("unhandled switch case: "+s);}return this.columnSorting(c,undefined,d,U.formatMessage("Setting sort of '{1}' from table '{0}' to '{2}'",this.getIdentifier(),c,s));};b.prototype.iSortByColumn=function(c,f,d){var t=this.getBuilder(),v=U.isOfType(c,Object)?c.name:c;return this.prepareResult(t.doSortByColumn(v,f,d).description(U.formatMessage("Sorting column '{1}{2}' of table '{0}'",this.getIdentifier(),c,f?"/"+f:"")).execute());};b.prototype.iGroupByColumn=function(c,f){var t=this.getBuilder(),v=U.isOfType(c,Object)?c.name:c;return this.prepareResult(t.doGroupByColumn(v,f).description(U.formatMessage("Grouping column '{1}{2}' of table '{0}'",this.getIdentifier(),c,f?"/"+f:"")).execute());};b.prototype.iAggregateByColumn=function(c,f){var t=this.getBuilder(),v=U.isOfType(c,Object)?c.name:c;return this.prepareResult(t.doAggregateByColumn(v,f).description(U.formatMessage("Aggregating column '{1}{2}' of table '{0}'",this.getIdentifier(),c,f?"/"+f:"")).execute());};b.prototype.iChangeSearchField=function(s){return this.prepareResult(this.getBuilder().doChangeSearch(s).description(U.formatMessage("Changing the search text on table '{0}' to '{1}'",this.getIdentifier(),s||"")).execute());};b.prototype.iResetSearchField=function(){return this.prepareResult(this.getBuilder().doResetSearch().description(U.formatMessage("Resetting the search field on table '{0}'",this.getIdentifier())).execute());};b.prototype.iChangeFilterField=function(c,v,d){var f=a.create(this.getOpaInstance()).isDialogElement().hasType("sap.ui.mdc.FilterField").hasConditional(U.isOfType(c,String),O.Matchers.properties({label:c}),O.Matchers.properties({fieldPath:c.name})).checkNumberOfMatches(1),D,s=U.formatMessage("Changing the filter field '{0}' of table '{1}' by adding '{2}' (was cleared first: {3})",c,this.getIdentifier(),v,d),o=this.iOpenFilterDialog.bind(this),e=this.iConfirmFilterDialog.bind(this);return this.prepareResult(F.create(this.getOpaInstance()).success(function(){D=F.controlsExist(f);if(!D){o();f.success(e);}return f.doChangeValue(v,d).description(s).execute();}).execute());};b.prototype.iPasteData=function(d){return this.prepareResult(this.getBuilder().doPasteData(d).description(U.formatMessage("Pasting {0} rows into table '{1}'",d.length,this.getIdentifier())).execute());};b.prototype.iClickOnMessageStripFilter=function(){return this.getBuilder().doClickOnMessageStripFilter().execute();};return b;});