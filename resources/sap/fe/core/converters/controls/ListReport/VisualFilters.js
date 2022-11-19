/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/templating/FilterTemplating","sap/fe/core/helpers/BindingExpression","sap/fe/core/templating/DataModelPathHelper","sap/fe/core/converters/helpers/Aggregation","sap/fe/core/converters/helpers/IssueManager"],function(a,B,D,A,I){"use strict";var _={};var b=I.IssueCategory;var c=I.IssueSeverity;var d=I.IssueType;var f=A.AggregationHelper;var g=D.checkFilterExpressionRestrictions;var h=B.compileBinding;var j=a.getIsRequired;var k=a.isPropertyFilterable;function l(o,n){var s=typeof Symbol!=="undefined"&&o[Symbol.iterator]||o["@@iterator"];if(!s){if(Array.isArray(o)||(s=m(o))||n&&o&&typeof o.length==="number"){if(s)o=s;var i=0;var F=function(){};return{s:F,n:function(){if(i>=o.length)return{done:true};return{done:false,value:o[i++]};},e:function(e){throw e;},f:F};}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var t=true,u=false,v;return{s:function(){s=s.call(o);},n:function(){var e=s.next();t=e.done;return e;},e:function(e){u=true;v=e;},f:function(){try{if(!t&&s.return!=null)s.return();}finally{if(u)throw v;}}};}function m(o,e){if(!o)return;if(typeof o==="string")return p(o,e);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return p(o,e);}function p(e,n){if(n==null||n>e.length)n=e.length;for(var i=0,o=new Array(n);i<n;i++){o[i]=e[i];}return o;}var q=function(e,i,n){var o,s,t,u;var M,G,v;var w=i===null||i===void 0?void 0:(o=i.$target)===null||o===void 0?void 0:(s=o.Measures[0])===null||s===void 0?void 0:s.value;var x=i===null||i===void 0?void 0:(t=i.$target)===null||t===void 0?void 0:(u=t.Dimensions[0])===null||u===void 0?void 0:u.value;var y=n.getCustomAggregateDefinitions();var T=n.getTransAggregations();if(y.some(function(Q){return Q.qualifier===w;})){M=w;}else if(T&&T[0]){var z=T[0];z.some(function(Q){if(Q.Name===w){M=Q===null||Q===void 0?void 0:Q.AggregatableProperty.value;}});}var C=n.getAggregatableProperties();var E=n.getGroupableProperties();if(C&&C.length){var F=l(C),H;try{for(F.s();!(H=F.n()).done;){var J;var K=H.value;if((K===null||K===void 0?void 0:(J=K.Property)===null||J===void 0?void 0:J.value)===M){v=true;}}}catch(L){F.e(L);}finally{F.f();}}if(E&&E.length){var N=l(E),O;try{for(N.s();!(O=N.n()).done;){var P=O.value;if((P===null||P===void 0?void 0:P.value)===x){G=true;}}}catch(L){N.e(L);}finally{N.f();}}return v&&G;};function r(e,i,P,F){var n;var v={};var V=F[P];if(V&&V!==null&&V!==void 0&&V.visualFilter&&V!==null&&V!==void 0&&(n=V.visualFilter)!==null&&n!==void 0&&n.valueList){var o,s;var t=V===null||V===void 0?void 0:(o=V.visualFilter)===null||o===void 0?void 0:o.valueList;var u=t.split("#");var w=u.length>1?"ValueList#"+u[1]:u[0];var x=e.resolvePath(P);var y=x===null||x===void 0?void 0:(s=x.annotations)===null||s===void 0?void 0:s.Common[w];if(y){var z,C,E;var G=y===null||y===void 0?void 0:y.CollectionPath;var H=i.getConverterContextFor("/"+(G||((z=i.getEntitySet())===null||z===void 0?void 0:z.name)));var J=y===null||y===void 0?void 0:y.Parameters;var K;var L=[];var M=[];if(!H.getDataModelObjectPath().targetEntitySet){var N=H.getEntityTypeAnnotation("");H=N.converterContext;}var O=H.getParameterEntityType();M=O?O.keys.map(function(n2){return n2.name;}):[];if(i.getContextPath()===H.getContextPath()){M.forEach(function(n2){L.push({localDataProperty:n2,valueListProperty:n2});});}if(J){var Q=l(J),R;try{for(Q.s();!(R=Q.n()).done;){var S;var T=R.value;var U=(S=T.LocalDataProperty)===null||S===void 0?void 0:S.value;var W=T.ValueListProperty;if(((T===null||T===void 0?void 0:T.$Type)==="com.sap.vocabularies.Common.v1.ValueListParameterInOut"||(T===null||T===void 0?void 0:T.$Type)==="com.sap.vocabularies.Common.v1.ValueListParameterOut")&&P===U){K=T;}if(((T===null||T===void 0?void 0:T.$Type)==="com.sap.vocabularies.Common.v1.ValueListParameterInOut"||(T===null||T===void 0?void 0:T.$Type)==="com.sap.vocabularies.Common.v1.ValueListParameterIn")&&P!==U){var X=k(H,W);if(!X){L.push({localDataProperty:U,valueListProperty:W});}}}}catch(Y){Q.e(Y);}finally{Q.f();}}if(L&&L.length){L.forEach(function(n2){var o2=h(g(i.getConverterContextFor(i.getAbsoluteAnnotationPath(n2===null||n2===void 0?void 0:n2.localDataProperty)).getDataModelObjectPath(),["SingleValue"]));var p2=h(g(H.getConverterContextFor(H.getAbsoluteAnnotationPath(n2===null||n2===void 0?void 0:n2.valueListProperty)).getDataModelObjectPath(),["SingleValue"]));if(p2==="true"&&o2==="false"){throw new Error("FilterRestrictions of "+P+" in MainEntitySet and ValueListEntitySet are different");}});}var Z=y===null||y===void 0?void 0:y.PresentationVariantQualifier;var $=y===null||y===void 0?void 0:y.SelectionVariantQualifier;var a1=(C=H)===null||C===void 0?void 0:(E=C.getEntityTypeAnnotation("@UI.PresentationVariant#"+Z))===null||E===void 0?void 0:E.annotation;var b1=new f(H.getEntityType(),H);if(!b1.isAnalyticsSupported()){return;}if(a1){var c1,d1;var e1=a1===null||a1===void 0?void 0:a1.Visualizations;var f1="/"+(y===null||y===void 0?void 0:y.CollectionPath)||"/"+((c1=H)===null||c1===void 0?void 0:(d1=c1.getEntitySet())===null||d1===void 0?void 0:d1.name);v.contextPath=f1;var g1;var h1=l(e1),i1;try{for(h1.s();!(i1=h1.n()).done;){var j1;var k1=i1.value;if(((j1=k1.$target)===null||j1===void 0?void 0:j1.term)==="com.sap.vocabularies.UI.v1.Chart"){g1=k1;break;}}}catch(Y){h1.e(Y);}finally{h1.f();}if(g1){var l1,m1,n1,o1,p1,q1,r1,s1,t1,u1,v1,w1,x1,y1;var z1=q(H,g1,b1);if(!z1){return;}var A1=(l1=g1)===null||l1===void 0?void 0:(m1=l1.$target)===null||m1===void 0?void 0:(n1=m1.Dimensions[0])===null||n1===void 0?void 0:(o1=n1.$target)===null||o1===void 0?void 0:(p1=o1.annotations)===null||p1===void 0?void 0:(q1=p1.UI)===null||q1===void 0?void 0:(r1=q1.Hidden)===null||r1===void 0?void 0:r1.valueOf();var B1=(s1=g1)===null||s1===void 0?void 0:(t1=s1.$target)===null||t1===void 0?void 0:(u1=t1.Dimensions[0])===null||u1===void 0?void 0:(v1=u1.$target)===null||v1===void 0?void 0:(w1=v1.annotations)===null||w1===void 0?void 0:(x1=w1.UI)===null||x1===void 0?void 0:(y1=x1.HiddenFilter)===null||y1===void 0?void 0:y1.valueOf();if(A1===true||B1===true){return;}else if(e1&&e1.length){var C1,D1,E1,F1,G1,H1,I1,J1,K1,L1;v.chartAnnotation=g1?(C1=H)===null||C1===void 0?void 0:C1.getAbsoluteAnnotationPath(g1.fullyQualifiedName+"/$AnnotationPath/"):undefined;v.presentationAnnotation=a1?(D1=H)===null||D1===void 0?void 0:D1.getAbsoluteAnnotationPath(a1.fullyQualifiedName+"/"):undefined;v.outParameter=(E1=K)===null||E1===void 0?void 0:(F1=E1.LocalDataProperty)===null||F1===void 0?void 0:F1.value;v.inParameters=L;var M1=g(i.getConverterContextFor(i.getAbsoluteAnnotationPath(P)).getDataModelObjectPath(),["SingleRange","MultiRange"]);if(h(M1)==="true"){throw new Error("Range AllowedExpression is not supported for visual filters");}var N1=g(i.getConverterContextFor(i.getAbsoluteAnnotationPath(P)).getDataModelObjectPath(),["SingleValue"]);v.multipleSelectionAllowed=h(!N1.value);v.required=j(i,P);var O1;if($){var P1,Q1,R1;O1=(P1=H)===null||P1===void 0?void 0:(Q1=P1.getEntityTypeAnnotation("@UI.SelectionVariant#"+$))===null||Q1===void 0?void 0:Q1.annotation;v.selectionVariantAnnotation=O1?(R1=H)===null||R1===void 0?void 0:R1.getAbsoluteAnnotationPath(O1.fullyQualifiedName+"/"):undefined;}var S1=[];if(O){var T1,U1,V1,W1,X1;var Y1=G.split("/")[0];var Z1=G.split("/")[1];var $1=i.getConverterContextFor("/"+Y1);var _1=$1===null||$1===void 0?void 0:(T1=$1.getDataModelObjectPath().startingEntitySet)===null||T1===void 0?void 0:(U1=T1.annotations)===null||U1===void 0?void 0:(V1=U1.Capabilities)===null||V1===void 0?void 0:(W1=V1.NavigationRestrictions)===null||W1===void 0?void 0:W1.RestrictedProperties;var a2=_1===null||_1===void 0?void 0:_1.find(function(n2){var o2;if(((o2=n2.NavigationProperty)===null||o2===void 0?void 0:o2.type)==="NavigationPropertyPath"){return n2.NavigationProperty.value===Z1;}});S1=a2===null||a2===void 0?void 0:(X1=a2.FilterRestrictions)===null||X1===void 0?void 0:X1.RequiredProperties;}else{var b2,c2,d2;var e2=(b2=H.getEntitySet())===null||b2===void 0?void 0:b2.annotations;S1=e2===null||e2===void 0?void 0:(c2=e2.Capabilities)===null||c2===void 0?void 0:(d2=c2.FilterRestrictions)===null||d2===void 0?void 0:d2.RequiredProperties;}var f2=[];if((G1=S1)!==null&&G1!==void 0&&G1.length){S1.forEach(function(n2){f2.push(n2.value);});}f2=f2.concat(M);v.requiredProperties=f2;if((H1=v.requiredProperties)!==null&&H1!==void 0&&H1.length){if(!v.inParameters||!v.inParameters.length){if(!v.selectionVariantAnnotation){v.showOverlayInitially=true;}else{var g2,h2,i2,j2;var k2=((g2=O1)===null||g2===void 0?void 0:(h2=g2.SelectOptions)===null||h2===void 0?void 0:h2.map(function(n2){return n2.PropertyName.value;}))||[];var l2=((i2=O1)===null||i2===void 0?void 0:(j2=i2.Parameters)===null||j2===void 0?void 0:j2.map(function(n2){return n2.PropertyName.value;}))||[];k2=k2.concat(l2);f2=f2.sort();k2=k2.sort();v.showOverlayInitially=f2.some(function(n2){return k2.indexOf(n2)===-1;});}}else{v.showOverlayInitially=false;}}else{v.showOverlayInitially=false;}var m2=(I1=g1)===null||I1===void 0?void 0:(J1=I1.$target)===null||J1===void 0?void 0:(K1=J1.Dimensions[0])===null||K1===void 0?void 0:(L1=K1.$target)===null||L1===void 0?void 0:L1.type;if(!(m2==="Edm.DateTimeOffset"||m2==="Edm.Date"||m2==="Edm.TimeOfDay")&&g1.$target.ChartType==="UI.ChartType/Line"){v.renderLineChart=false;}else{v.renderLineChart=true;}}}else{i.getDiagnostics().addIssue(b.Annotation,c.High,d.MALFORMED_VISUALFILTERS.CHART);}}else{i.getDiagnostics().addIssue(b.Annotation,c.High,d.MALFORMED_VISUALFILTERS.PRESENTATIONVARIANT);}}else{i.getDiagnostics().addIssue(b.Annotation,c.High,d.MALFORMED_VISUALFILTERS.VALUELIST);}}else{i.getDiagnostics().addIssue(b.Manifest,c.High,d.MALFORMED_VISUALFILTERS.VALUELIST);}if(Object.keys(v).length>1){return v;}}_.getVisualFilters=r;return _;},false);
