sap.ui.define(["sap/ui/base/Object","sap/base/util/extend","sap/ui/comp/smartform/Group","sap/ui/comp/smartform/GroupElement","sap/ui/comp/smartmultiedit/Field","sap/ui/comp/smartform/SmartForm","sap/ui/comp/smartmultiedit/Container","sap/suite/ui/generic/template/genericUtilities/testableHelper","sap/suite/ui/generic/template/js/StableIdHelper","sap/suite/ui/generic/template/lib/MessageUtils"],function(B,e,G,a,F,S,C,t,b,M){"use strict";function g(s,c,T){var u,d;function o(){var j=s.oPresentationControlHandler.getSelectedContexts();u=j.filter(T.oCommonUtils.isContextEditable);if(j.length===u.length){O(u);}else{T.oCommonUtils.getDialogFragmentAsync("sap.suite.ui.generic.template.ListReport.view.fragments.MultiEditConfirmation",{onCancel:function(E){var D=E.getSource().getParent();D.close();},onContinue:function(E){var D=E.getSource().getParent();O(u);D.close();}},"multiEditConfirmation").then(function(m){var k=m.getModel("multiEditConfirmation");var w=u.length===1?"EDIT_REMAINING":"EDIT_REMAINING_PLURAL";var W=T.oCommonUtils.getText(w,[j.length-u.length,j.length,u.length]);k.setProperty("/warningText",W);m.open();});}}function O(u){var j=s.oMultipleViewsHandler&&s.oMultipleViewsHandler.getSelectedKey();var I=b.getStableId({type:"ListReportAction",subType:"MultiEditDialog",sQuickVariantKey:j});var m=c.byId(I);var D=u.length===1?T.oCommonUtils.getText("MULTI_EDIT_DIALOG_TITLE_SINGULAR"):T.oCommonUtils.getText("MULTI_EDIT_DIALOG_TITLE_PLURAL",u.length);var k=new sap.ui.model.json.JSONModel();k.setProperty("/title",D);m.setModel(k,"localModel");d=false;if(m.getContent().length===0){d=true;var l=f();var n=new G();l.forEach(function(r){var v=new a();var w=new F({propertyName:r.data("p13nData").leadingProperty,useApplyToEmptyOnly:false});v.addElement(w);n.addGroupElement(v);});var p=new S();var q=new C();var E=s.oPresentationControlHandler.getEntitySet();q.setEntitySet(E);p.addGroup(n);q.setLayout(p);m.addContent(q);}m.getContent()[0].setContexts(u);m.open();}function f(){var m=c.getOwnerComponent().getModel().getMetaModel();var E=m.getODataEntityType(m.getODataEntitySet(s.oPresentationControlHandler.getEntitySet()).entityType);return s.oPresentationControlHandler.getVisibleProperties().filter(function(j){var k=j.data("p13nData")&&j.data("p13nData").columnKey;var p=m.getODataProperty(E,j.data("p13nData").leadingProperty);if(p){return j.getVisible()&&(k.indexOf("DataFieldForAnnotation")<0)&&!j.data("p13nData").actionButton&&!!j.data("p13nData").leadingProperty&&p["sap:updatable"]!=="false"&&(!p["Org.OData.Core.V1.Immutable"]||p["Org.OData.Core.V1.Immutable"].Bool==="false");}});}function h(E){var m=E.getSource().getParent();var j=m.getContent()[0];var v=j.getErroneousFieldsAndTokens();v.then(function(k){if(k.length===0){m.close();var U;var p=function(D,l){var P=l.getPropertyName(),n=l.getUnitOfMeasurePropertyName();U[P]=D[P];if(l.isComposite()){U[n]=D[n];}};j.getAllUpdatedContexts(true).then(function(l){var n=[];var q=j.getFields().filter(function(w){return!w.isKeepExistingSelected();});if(q&&q.length>0){l.forEach(function(w){U={};q.forEach(p.bind(null,w.data));n.push({sContextPath:w.context.getPath(),oUpdateData:U});});if(d){m.destroyContent();}var r=T.oServices.oCRUDManager.updateMultipleEntities(n);r.then(function(){s.oPresentationControlHandler.refresh();M.showSuccessMessageIfRequired(T.oCommonUtils.getText("OBJECT_SAVED"),T.oServices);});}else{M.showSuccessMessageIfRequired(T.oCommonUtils.getText("OBJECT_NOT_MODIFIED"),T.oServices);}});}});}function i(E){var m=E.getSource().getParent();m.close();if(d){m.destroyContent();}}var h=t.testable(h,"fnOnSaveMultiEditDialog");return{onMultiEditButtonPress:o,onSaveMultiEditDialog:h,onCancelMultiEditDialog:i};}return B.extend("sap.suite.ui.generic.template.ListReport.controller.MultiEditHandler",{constructor:function(s,c,T){e(this,g(s,c,T));}});});