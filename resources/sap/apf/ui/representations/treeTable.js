/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2018 SAP SE. All rights reserved
*/
sap.ui.define(["sap/apf/core/constants","sap/apf/ui/utils/formatter","sap/apf/modeler/ui/utils/constants","sap/apf/ui/representations/BaseUI5ChartRepresentation","sap/apf/ui/representations/utils/paginationDisplayOptionHandler","sap/ui/table/TreeTable"],function(c,f,u,B,p,T){"use strict";function g(o){return o.metadata.getPropertyMetadata(o.requiredFilter).text;}function a(o){return o.oTreeTableControlObject.parameters.treeAnnotationProperties.hierarchyNodeExternalKeyFor;}function b(r,o){if(r){if(o.getPropertyMetadata(r)["filter-restriction"]==="single-value"){return sap.ui.table.SelectionMode.Single;}return sap.ui.table.SelectionMode.MultiToggle;}return sap.ui.table.SelectionMode.None;}function _(o,s,q){var r;var v=function(y){return function(z){if(q.metadata!==undefined){var A;if(z){A=q.oFormatter.getFormattedValue(y,z);if(A!==undefined){return A;}}}return z;};};r=new sap.ui.table.TreeTable({showNoData:false,title:s,enableSelectAll:false,visibleRowCountMode:sap.ui.table.VisibleRowCountMode.Auto});r.setLayoutData(new sap.m.FlexItemData({growFactor:1}));r.addStyleClass("sapUiSizeCompact");r.setSelectionMode(b(q.requiredFilter,q.metadata));var C=[],w,x;o.name.forEach(function(y,z){w=new sap.m.Text().bindText(o.value[z],v(o.value[z]),sap.ui.model.BindingMode.OneWay);x=new sap.ui.table.Column({label:new sap.m.Label({text:y}),template:w,tooltip:y});C.push(x);});C.forEach(function(y){r.addColumn(y);});q.oTreeTableModel.attachBatchRequestCompleted(function(){if(q.oApi.getUiApi().getLayoutView().getController()&&q.oApi.getUiApi().getLayoutView().getController().byId("stepContainer")){q.oApi.getUiApi().getLayoutView().getController().byId("stepContainer").getContent()[0].byId("idStepLayout").setBusy(false);}e(q,r,o);if(q.oRepresentationFilterHandler!==null){if(q.oRepresentationFilterHandler!==undefined){if(q.oRepresentationFilterHandler.getFilterValues().length>0){d(q);}else{q.oTreeTable.clearSelection();}}}});q.oTreeTableModel.attachBatchRequestSent(function(E){if(q.oApi.getUiApi().getLayoutView().getController()&&q.oApi.getUiApi().getLayoutView().getController().byId("stepContainer")){q.oApi.getUiApi().getLayoutView().getController().byId("stepContainer").getContent()[0].byId("idStepLayout").setBusy(true);}});r.setModel(q.oTreeTableModel);r.bindRows(q.oTreeTableControlObject);return r;}function d(o){var q=o.oTreeTable.getRows();o.oTreeTable.clearSelection();setTimeout(function(){q.forEach(function(r,s){var v=r.getBindingContext();if(v){var R=v.getProperty(o.requiredFilter);o.oRepresentationFilterHandler.getFilterValues().forEach(function(w){if(R===w){o.oTreeTable.addSelectionInterval(s,s);}});}});},1);}function e(o,q,r){if(o.metadata!==null){if(o.metadata!==undefined){for(var s=0;s<r.name.length;s++){var M=o.metadata.getPropertyMetadata(r.value[s]);if(M["aggregation-role"]==="measure"){var v=q.getColumns()[s];v.setHAlign(sap.ui.core.HorizontalAlign.End);}}}}}function h(o,q){var C=o.oTreeTable.getContextByIndex(q).getProperty(o.requiredFilter);var s=o.oTreeTable.getSelectionMode(o.requiredFilter);var I=o.oTreeTable.isIndexSelected(q);var D=o.oTreeTable.getContextByIndex(q).getProperty(g(o));var r=o.oTreeTable.getContextByIndex(q).getProperty(a(o));o.oPaginationDisplayOptionHandler.createDisplayValueLookupForPaginatedFilter(C,D,r);var U=o.oRepresentationFilterHandler.getFilterValues();if(I){U=k(o,s,C,U);}else{U=l(o,s,C,U);}m(o,U);}function i(o){o.oRepresentationFilterHandler.clearFilters();}function j(F){return F.filter(function(o,q,r){return r.indexOf(o)===q;});}function k(o,s,C,U){if(s===sap.ui.table.SelectionMode.Single){U=[C];}else{U.push(C);}return j(U);}function l(o,s,C,U){if(s===sap.ui.table.SelectionMode.Single){U=[];}else{var q=U.indexOf(C);if(q!==-1){U.splice(q,1);}}return U;}function m(o,U){i(o);o.oRepresentationFilterHandler.updateFilterFromSelection(U);o.oApi.selectionChanged();}function n(o){var C={name:[],value:[]};var P=o.oParameters.hierarchicalProperty.concat(o.oParameters.properties);P.forEach(function(q,r){var s=q.fieldName;var v=o.metadata.getPropertyMetadata(s).label||o.metadata.getPropertyMetadata(s).name;if(q.kind===sap.apf.modeler.ui.utils.CONSTANTS.propertyTypes.HIERARCHIALCOLUMN){if(q.labelDisplayOption==="text"){s=o.metadata.getPropertyMetadata(o.oTreeTableControlObject.parameters.treeAnnotationProperties.hierarchyNodeFor).text;}else{s=o.oTreeTableControlObject.parameters.treeAnnotationProperties.hierarchyNodeExternalKeyFor;}}C.name[r]=q.fieldDesc===undefined||!o.oApi.getTextNotHtmlEncoded(q.fieldDesc).length?v:o.oApi.getTextNotHtmlEncoded(q.fieldDesc);C.value[r]=s;});return C;}var t=function(A,P){var o=this;o.oParameters=P;o.requiredFilter=o.oParameters.requiredFilters[0];o.oKeyTextLookup={};o.type=sap.apf.ui.utils.CONSTANTS.representationTypes.TREE_TABLE_REPRESENTATION;sap.apf.ui.representations.BaseUI5ChartRepresentation.apply(o,[A,P]);o.oPaginationDisplayOptionHandler=new sap.apf.ui.representations.utils.PaginationDisplayOptionHandler();o._selectRowInTreeTable=function(E){var q=E.getParameter("userInteraction");var r=E.getParameter("rowIndex");if(!q||r===undefined||r===null){return;}h(o,r);};o.handleRowSelectionInTreeTable=function(E){o._selectRowInTreeTable(E);};};t.prototype=Object.create(sap.apf.ui.representations.BaseUI5ChartRepresentation.prototype);t.prototype.constructor=t;t.prototype.getMainContent=function(s){if(!this.oTreeTable){var o=n(this);this.oTreeTable=_(o,s,this);this.oTreeTable.attachRowSelectionChange(this.handleRowSelectionInTreeTable.bind(this));}return new sap.m.VBox({fitContainer:true,items:[this.oTreeTable]});};t.prototype.getSelections=function(){var s=[],o=this,S;this.oRepresentationFilterHandler.getFilterValues().forEach(function(q){S=o.oPaginationDisplayOptionHandler.getDisplayNameForPaginatedFilter(q,o.parameter.requiredFilterOptions,o.requiredFilter,o.oFormatter,o.metadata);s.push({id:q,text:S});});return s;};t.prototype.removeAllSelection=function(){this.oRepresentationFilterHandler.clearFilters();this.oTreeTable.clearSelection();this.oApi.selectionChanged();};t.prototype.getFilter=function(){var o=this.oApi.createFilter();var A=o.getTopAnd().addOr('exprssionOr');this.oRepresentationFilterHandler.getFilterValues().forEach(function(q){var F={id:q,name:this.requiredFilter,operator:"EQ",value:q};A.addExpression(F);}.bind(this));return o;};t.prototype.setFilterValues=function(v){var o=this,F=[];var r=o.requiredFilter;o.oRepresentationFilterHandler.clearFilters();v.forEach(function(q){var s=q[r];var w=q[g(o)];var x=q[a(o)];o.oPaginationDisplayOptionHandler.createDisplayValueLookupForPaginatedFilter(s,w,x);F.push(s);});o.oRepresentationFilterHandler.updateFilterFromSelection(F);};t.prototype.updateTreetable=function(o,M,q,F){this.oTreeTableModel=M;this.oTreeTableControlObject=o;this.metadata=q;this.oFormatter=new sap.apf.ui.utils.formatter({getEventCallback:this.oApi.getEventCallback.bind(this.oApi),getTextNotHtmlEncoded:this.oApi.getTextNotHtmlEncoded,getExits:this.oApi.getExits()},this.metadata);if(this.oTreeTable&&F){this.oTreeTable.bindRows(this.oTreeTableControlObject);}};t.prototype.getPrintContent=function(s){var o=this.oTreeTable.clone();var P={oRepresentation:o};return P;};t.prototype.getSelectedFilterPropertyLabel=function(r){return this.metadata.getPropertyMetadata(r)["hierarchy-node-for"];};t.prototype.destroy=function(){if(this.oParameters){this.oParameters=null;}if(this.oTreeTableModel){this.oTreeTableModel=null;}if(this.oTreeTableControlObject){this.oTreeTableControlObject=null;}if(this.oTreeTable){this.oTreeTable.destroy();}if(this.metadata){this.metadata=null;}if(this.oRepresentationFilterHandler){this.oRepresentationFilterHandler=null;}sap.apf.ui.representations.BaseUI5ChartRepresentation.prototype.destroy.call(this);};return t;},true);