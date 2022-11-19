/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["./ManifestSettings","./templates/ListReportConverter","./templates/ObjectPageConverter","./MetaModelConverter","sap/fe/core/converters/helpers/IssueManager","sap/base/util/merge","./ConverterContext"],function(M,L,O,a,I,m,C){"use strict";var _={};var b=I.IssueCategoryType;var c=I.IssueSeverity;var d=I.IssueCategory;var g=a.getInvolvedDataModelObjects;var e=a.convertTypes;var T=M.TemplateType;function h(F,D,E,l){F.forEach(function(o){var i="For entity set "+E;if((o===null||o===void 0?void 0:o.$Type)==="com.sap.vocabularies.UI.v1.CollectionFacet"&&!(o!==null&&o!==void 0&&o.ID)){var j;i=i+", "+"level "+l+", the collection facet does not have an ID.";D.addIssue(d.Facets,c.High,i,b,b===null||b===void 0?void 0:(j=b.Facets)===null||j===void 0?void 0:j.MissingID);}if((o===null||o===void 0?void 0:o.$Type)==="com.sap.vocabularies.UI.v1.CollectionFacet"&&l>=3){var k;i=i+", collection facet "+o.Label+" is not supported at "+"level "+l;D.addIssue(d.Facets,c.Medium,i,b,b===null||b===void 0?void 0:(k=b.Facets)===null||k===void 0?void 0:k.UnSupportedLevel);}if(o!==null&&o!==void 0&&o.Facets){h(o===null||o===void 0?void 0:o.Facets,D,E,++l);l=l-1;}});}function f(t,o,i,D,F,j){var k;var l=e(o,j);l.diagnostics.forEach(function(u){var v=D.checkIfIssueExists(d.Annotation,c.High,u.message);if(!v){D.addIssue(d.Annotation,c.High,u.message);}});l===null||l===void 0?void 0:(k=l.entityTypes)===null||k===void 0?void 0:k.forEach(function(E){var u,v;if(E!==null&&E!==void 0&&(u=E.annotations)!==null&&u!==void 0&&(v=u.UI)!==null&&v!==void 0&&v.Facets){var w,x;h(E===null||E===void 0?void 0:(w=E.annotations)===null||w===void 0?void 0:(x=w.UI)===null||x===void 0?void 0:x.Facets,D,E===null||E===void 0?void 0:E.name,1);}});var s=i.entitySet;var n=(i===null||i===void 0?void 0:i.contextPath)||(F==="/"?F+s:F);var p=o.createBindingContext(n);var q=g(p);if(q){var r={};switch(t){case T.ListReport:case T.AnalyticalListPage:r=L.convertPage(new C(l,i,D,m,q));break;case T.ObjectPage:r=O.convertPage(new C(l,i,D,m,q));break;}return r;}return undefined;}_.convertPage=f;return _;},false);