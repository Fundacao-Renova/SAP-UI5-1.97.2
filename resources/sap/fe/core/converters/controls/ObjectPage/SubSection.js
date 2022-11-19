/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["../../ManifestSettings","../../helpers/ID","../Common/Form","../Common/DataVisualization","../../helpers/ConfigurableObject","sap/fe/core/converters/controls/Common/Action","sap/fe/core/converters/helpers/Key","sap/fe/core/helpers/BindingExpression","sap/fe/core/converters/helpers/IssueManager","sap/fe/core/converters/controls/ObjectPage/HeaderFacet","../../objectPage/FormMenuActions"],function(M,I,F,D,C,A,K,B,a,H,b){"use strict";var _={};var g=b.getFormActions;var c=b.getFormHiddenActions;var d=b.getVisibilityEnablementFormMenuActions;var e=H.getHeaderFacetsFromManifest;var f=H.getStashedSettingsForHeaderFacet;var h=H.getDesignTimeMetadataSettingsForHeaderFacet;var j=a.IssueCategory;var k=a.IssueSeverity;var l=a.IssueType;var r=B.ref;var m=B.not;var p=B.fn;var q=B.equal;var s=B.compileBinding;var t=B.bindingExpression;var u=B.annotationExpression;var v=K.KeyHelper;var w=A.getEnabledForAnnotationAction;var x=A.removeDuplicateActions;var y=A.getSemanticObjectMapping;var z=A.ButtonType;var E=A.isActionNavigable;var G=A.getActionsFromManifest;var P=C.Placement;var J=C.insertCustomElements;var L=D.getDataVisualizationConfiguration;var N=F.isReferenceFacet;var O=F.createFormDefinition;var S=I.SideContentID;var Q=I.SubSectionID;var R=I.FormID;var T=I.CustomSubSectionID;var U=M.ActionType;function V(n,i){return Y(n)||X(n,i)||d1(n,i)||W();}function W(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function X(n,i){var o=n==null?null:typeof Symbol!=="undefined"&&n[Symbol.iterator]||n["@@iterator"];if(o==null)return;var z1=[];var _n=true;var _d=false;var _s,_e;try{for(o=o.call(n);!(_n=(_s=o.next()).done);_n=true){z1.push(_s.value);if(i&&z1.length===i)break;}}catch(E1){_d=true;_e=E1;}finally{try{if(!_n&&o["return"]!=null)o["return"]();}finally{if(_d)throw _e;}}return z1;}function Y(i){if(Array.isArray(i))return i;}function Z(o,i){var n=Object.keys(o);if(Object.getOwnPropertySymbols){var z1=Object.getOwnPropertySymbols(o);if(i){z1=z1.filter(function(A1){return Object.getOwnPropertyDescriptor(o,A1).enumerable;});}n.push.apply(n,z1);}return n;}function $(n){for(var i=1;i<arguments.length;i++){var o=arguments[i]!=null?arguments[i]:{};if(i%2){Z(Object(o),true).forEach(function(z1){a1(n,z1,o[z1]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(n,Object.getOwnPropertyDescriptors(o));}else{Z(Object(o)).forEach(function(z1){Object.defineProperty(n,z1,Object.getOwnPropertyDescriptor(o,z1));});}}return n;}function a1(o,i,n){if(i in o){Object.defineProperty(o,i,{value:n,enumerable:true,configurable:true,writable:true});}else{o[i]=n;}return o;}function b1(i){return f1(i)||e1(i)||d1(i)||c1();}function c1(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function d1(o,i){if(!o)return;if(typeof o==="string")return g1(o,i);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return g1(o,i);}function e1(i){if(typeof Symbol!=="undefined"&&i[Symbol.iterator]!=null||i["@@iterator"]!=null)return Array.from(i);}function f1(i){if(Array.isArray(i))return g1(i);}function g1(n,o){if(o==null||o>n.length)o=n.length;for(var i=0,z1=new Array(o);i<o;i++){z1[i]=n[i];}return z1;}var h1;(function(h1){h1["Unknown"]="Unknown";h1["Form"]="Form";h1["DataVisualization"]="DataVisualization";h1["XMLFragment"]="XMLFragment";h1["Placeholder"]="Placeholder";h1["Mixed"]="Mixed";})(h1||(h1={}));_.SubSectionType=h1;var i1=["com.sap.vocabularies.UI.v1.LineItem","com.sap.vocabularies.UI.v1.PresentationVariant","com.sap.vocabularies.UI.v1.SelectionPresentationVariant"];var j1=function(){var i=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[];return i.some(function(n){var o,z1;return i1.indexOf(n===null||n===void 0?void 0:(o=n.Target)===null||o===void 0?void 0:(z1=o.$target)===null||z1===void 0?void 0:z1.term)>-1;});};function k1(i,n,o){var z1=i.reduce(function(z1,A1){switch(A1.$Type){case"com.sap.vocabularies.UI.v1.ReferenceFacet":z1.push(A1);break;case"com.sap.vocabularies.UI.v1.CollectionFacet":if(A1.Facets.find(function(B1){return B1.$Type==="com.sap.vocabularies.UI.v1.CollectionFacet";})){z1.splice.apply(z1,[z1.length,0].concat(b1(A1.Facets)));}else{z1.push(A1);}break;case"com.sap.vocabularies.UI.v1.ReferenceURLFacet":break;}return z1;},[]);return z1.map(function(A1){var B1;return r1(A1,z1,n,0,!(A1!==null&&A1!==void 0&&(B1=A1.Facets)!==null&&B1!==void 0&&B1.length),o);});}_.createSubSections=k1;function l1(i){var n=e(i.getManifestWrapper().getHeaderFacets());var o=[];Object.keys(n).map(function(A1){o.push(n[A1]);return o;});var z1=o.reduce(function(z1,A1){if(A1.templateEdit){z1.push(A1);}return z1;},[]);return z1.map(function(A1){return m1(A1);});}_.createCustomHeaderFacetSubSections=l1;function m1(i){var n=T(i.key);var o={id:n,key:i.key,title:i.title,type:h1.XMLFragment,template:i.templateEdit||"",visible:i.visible,level:1,sideContent:undefined,stashed:i.stashed,flexSettings:i.flexSettings,actions:{}};return o;}var n1=function(i,n){var o,z1;return((o=i.ID)===null||o===void 0?void 0:o.toString())||((z1=i.Label)===null||z1===void 0?void 0:z1.toString())||n;};function o1(i,n,o){var z1=c(n,o)||[],A1=g(n,o),B1=J(i,G(A1,o,i,undefined,undefined,z1));return B1?d(x(B1)):i;}function p1(i,n){var o=new Array();switch(i.$Type){case"com.sap.vocabularies.UI.v1.CollectionFacet":o=i.Facets.filter(function(i){return N(i);}).reduce(function(o,i){return t1(o,i,n);},[]);break;case"com.sap.vocabularies.UI.v1.ReferenceFacet":o=t1([],i,n);break;}return o1(o,i,n);}function q1(i){var n=i===null||i===void 0?void 0:i.path;if(n){return"{= "+"!${"+n+"} ? '"+z.Transparent+"' : ${"+n+"}"+"}";}else if(i){return z.Ghost;}return z.Transparent;}function r1(n,o,z1,A1,B1,C1){var D1,E1,F1,G1,H1;var I1=Q({Facet:n});var J1={id:I1,key:n1(n,I1),title:s(u(n.Label)),type:h1.Unknown,annotationPath:z1.getEntitySetBasedAnnotationPath(n.fullyQualifiedName),visible:s(m(q(u((D1=n.annotations)===null||D1===void 0?void 0:(E1=D1.UI)===null||E1===void 0?void 0:E1.Hidden),true))),level:A1,sideContent:undefined};if(C1){J1.stashed=f(n,n,z1);J1.flexSettings={designtime:h(n,n,z1)};}var K1=[];var L1=[];var M1=[];var N1="";A1++;switch(n.$Type){case"com.sap.vocabularies.UI.v1.CollectionFacet":var O1=n.Facets;if(j1(O1)){for(var i=0;i<O1.length;i++){var P1,Q1;if(i1.indexOf((P1=O1[i].Target)===null||P1===void 0?void 0:(Q1=P1.$target)===null||Q1===void 0?void 0:Q1.term)>-1){L1.push(r1(O1[i],[],z1,A1,O1.length===1,C1));M1.push(i);}}for(var _i=M1.length-1;_i>=0;_i--){O1.splice(M1[_i],1);}if(O1.length){n.Facets=O1;K1.push(r1(n,[],z1,A1,B1,C1));}K1=K1.concat(L1);var S1=$($({},J1),{},{type:h1.Mixed,level:A1,content:K1});return S1;}else{var T1=p1(n,z1),U1=$($({},J1),{},{type:h1.Form,formDefinition:O(n,z1,T1),level:A1,actions:T1.filter(function(R1){return R1.facetName===undefined;})});return U1;}case"com.sap.vocabularies.UI.v1.ReferenceFacet":if(!n.Target.$target){N1="Unable to find annotationPath ".concat(n.Target.value);}else{switch(n.Target.$target.term){case"com.sap.vocabularies.UI.v1.LineItem":case"com.sap.vocabularies.UI.v1.Chart":case"com.sap.vocabularies.UI.v1.PresentationVariant":case"com.sap.vocabularies.UI.v1.SelectionPresentationVariant":var V1=L(n.Target.value,x1(n,o,z1),z1,undefined,C1);var W1=(F1=V1.visualizations[0])===null||F1===void 0?void 0:(G1=F1.annotation)===null||G1===void 0?void 0:G1.title;W1?W1:W1=(H1=V1.visualizations[0])===null||H1===void 0?void 0:H1.title;var X1=$($({},J1),{},{type:h1.DataVisualization,level:A1,presentation:V1,showTitle:s1(B1,J1.title,W1)});return X1;case"com.sap.vocabularies.UI.v1.FieldGroup":case"com.sap.vocabularies.UI.v1.Identification":case"com.sap.vocabularies.UI.v1.DataPoint":case"com.sap.vocabularies.UI.v1.StatusInfo":case"com.sap.vocabularies.Communication.v1.Contact":var Y1=p1(n,z1),Z1=$($({},J1),{},{type:h1.Form,level:A1,formDefinition:O(n,z1,Y1),actions:Y1.filter(function(R1){return R1.facetName===undefined;})});return Z1;default:N1="For ".concat(n.Target.$target.term," Fragment");break;}}break;case"com.sap.vocabularies.UI.v1.ReferenceURLFacet":N1="For Reference URL Facet";break;default:break;}var $1=$($({},J1),{},{text:N1});return $1;}_.createSubSection=r1;function s1(i,n,o){if(i&&o===n){return false;}return true;}function t1(i,n,o){var z1=n.Target.$target;var A1=n.Target.value;var B1={};var C1=[];var D1=A1.split("@"),E1=V(D1,1),F1=E1[0];if(F1.length>0){if(F1.lastIndexOf("/")===F1.length-1){F1=F1.substr(0,F1.length-1);}}else{F1=undefined;}if(z1){switch(z1.term){case"com.sap.vocabularies.UI.v1.FieldGroup":C1=z1.Data;B1=G(o.getManifestControlConfiguration(z1).actions,o,undefined,undefined,undefined,undefined,n.fullyQualifiedName);break;case"com.sap.vocabularies.UI.v1.Identification":case"com.sap.vocabularies.UI.v1.StatusInfo":if(z1.qualifier){C1=z1;}break;}}i=C1.reduce(function(i,G1){var H1,I1,J1,K1,L1,M1,N1,O1,P1,Q1,R1,S1,T1;var U1=G1===null||G1===void 0?void 0:(H1=G1.annotations)===null||H1===void 0?void 0:H1.UI;switch(G1.$Type){case"com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":if(((I1=G1.RequiresContext)===null||I1===void 0?void 0:I1.valueOf())===true){o.getDiagnostics().addIssue(j.Annotation,k.Low,l.MALFORMED_DATAFIELD_FOR_IBN.REQUIRESCONTEXT);}if(((J1=G1.Inline)===null||J1===void 0?void 0:J1.valueOf())===true){o.getDiagnostics().addIssue(j.Annotation,k.Low,l.MALFORMED_DATAFIELD_FOR_IBN.INLINE);}if(((K1=G1.Determining)===null||K1===void 0?void 0:K1.valueOf())===true){o.getDiagnostics().addIssue(j.Annotation,k.Low,l.MALFORMED_DATAFIELD_FOR_IBN.DETERMINING);}var V1={};if(G1.Mapping){V1.semanticObjectMapping=y(G1.Mapping);}i.push({type:U.DataFieldForIntentBasedNavigation,id:R({Facet:n},G1),key:v.generateKeyFromDataField(G1),text:(L1=G1.Label)===null||L1===void 0?void 0:L1.toString(),annotationPath:"",enabled:G1.NavigationAvailable!==undefined?s(q(u((M1=G1.NavigationAvailable)===null||M1===void 0?void 0:M1.valueOf()),true)):true,visible:s(m(q(u((N1=G1.annotations)===null||N1===void 0?void 0:(O1=N1.UI)===null||O1===void 0?void 0:(P1=O1.Hidden)===null||P1===void 0?void 0:P1.valueOf()),true))),buttonType:q1(U1===null||U1===void 0?void 0:U1.Emphasized),press:s(p("._intentBasedNavigation.navigate",[u(G1.SemanticObject),u(G1.Action),V1])),customData:s({semanticObject:u(G1.SemanticObject),action:u(G1.Action)})});break;case"com.sap.vocabularies.UI.v1.DataFieldForAction":var W1=o.getManifestControlConfiguration(z1).actions;var X1=v.generateKeyFromDataField(G1);i.push({type:U.DataFieldForAction,id:R({Facet:n},G1),key:X1,text:(Q1=G1.Label)===null||Q1===void 0?void 0:Q1.toString(),annotationPath:"",enabled:w(o,G1.ActionTarget),binding:F1?"{ 'path' : '"+F1+"'}":undefined,visible:s(m(q(u((R1=G1.annotations)===null||R1===void 0?void 0:(S1=R1.UI)===null||S1===void 0?void 0:(T1=S1.Hidden)===null||T1===void 0?void 0:T1.valueOf()),true))),requiresDialog:u1(G1.ActionTarget),buttonType:q1(U1===null||U1===void 0?void 0:U1.Emphasized),press:s(p("invokeAction",[G1.Action,{contexts:p("getBindingContext",[],t("","$source")),invocationGrouping:G1.InvocationGrouping==="UI.OperationGroupingType/ChangeSet"?"ChangeSet":"Isolated",label:u(G1.Label),model:p("getModel",[],t("/","$source")),isNavigable:E(W1&&W1[X1])}],r(".editFlow"))),facetName:G1.Inline?n.fullyQualifiedName:undefined});break;}return i;},i);return J(i,B1);}function u1(i){if(i){var n,o;var z1=(n=i.annotations)===null||n===void 0?void 0:(o=n.Common)===null||o===void 0?void 0:o.IsActionCritical;if(i.parameters.length>1||z1){return"Dialog";}else{return"None";}}else{return"None";}}_.isDialog=u1;function v1(i,n){var o={};Object.keys(i).forEach(function(z1){return o[z1]=w1(i[z1],z1,n);});return o;}_.createCustomSubSections=v1;function w1(i,n,o){var z1=i.sideContent?{template:i.sideContent.template,id:S(n),visible:false,equalSplit:i.sideContent.equalSplit}:undefined;var A1=i.position;if(!A1){A1={placement:P.After};}var B1={type:h1.Unknown,id:i.id||T(n),actions:G(i.actions,o),key:n,title:i.title,level:1,position:A1,visible:i.visible!==undefined?i.visible:true,sideContent:z1};if(i.template||i.name){B1.type=h1.XMLFragment;B1.template=i.template||i.name||"";}else{B1.type=h1.Placeholder;}return B1;}_.createCustomSubSection=w1;function x1(i,n,o){var z1=o.getManifestWrapper();if(z1.useIconTabBar()){return y1(i,n);}else{var A1,B1,C1,D1,E1,F1;var G1=o.getEntityType();if((A1=G1.annotations)!==null&&A1!==void 0&&(B1=A1.UI)!==null&&B1!==void 0&&(C1=B1.Facets)!==null&&C1!==void 0&&C1.length&&((D1=G1.annotations)===null||D1===void 0?void 0:(E1=D1.UI)===null||E1===void 0?void 0:(F1=E1.Facets)===null||F1===void 0?void 0:F1.length)>1){return y1(i,n);}else{return true;}}}function y1(i,n){return n.every(function(o){if(o!==i){if(o.$Type==="com.sap.vocabularies.UI.v1.ReferenceFacet"){var z1,A1,B1,C1,D1;var E1=o;if(((z1=E1.Target)===null||z1===void 0?void 0:(A1=z1.$target)===null||A1===void 0?void 0:A1.term)==="com.sap.vocabularies.UI.v1.LineItem"||((B1=E1.Target)===null||B1===void 0?void 0:(C1=B1.$target)===null||C1===void 0?void 0:C1.term)==="com.sap.vocabularies.UI.v1.PresentationVariant"||((D1=E1.Target.$target)===null||D1===void 0?void 0:D1.term)==="com.sap.vocabularies.UI.v1.SelectionPresentationVariant"){var F1,G1,H1,I1;return((F1=E1.annotations)===null||F1===void 0?void 0:(G1=F1.UI)===null||G1===void 0?void 0:G1.Hidden)!==undefined?(H1=E1.annotations)===null||H1===void 0?void 0:(I1=H1.UI)===null||I1===void 0?void 0:I1.Hidden:false;}return true;}else{var J1=o;return J1.Facets.every(function(K1){var L1,M1,N1,O1,P1,Q1;var R1=K1;if(((L1=R1.Target)===null||L1===void 0?void 0:(M1=L1.$target)===null||M1===void 0?void 0:M1.term)==="com.sap.vocabularies.UI.v1.LineItem"||((N1=R1.Target)===null||N1===void 0?void 0:(O1=N1.$target)===null||O1===void 0?void 0:O1.term)==="com.sap.vocabularies.UI.v1.PresentationVariant"||((P1=R1.Target)===null||P1===void 0?void 0:(Q1=P1.$target)===null||Q1===void 0?void 0:Q1.term)==="com.sap.vocabularies.UI.v1.SelectionPresentationVariant"){var S1,T1,U1,V1;return((S1=R1.annotations)===null||S1===void 0?void 0:(T1=S1.UI)===null||T1===void 0?void 0:T1.Hidden)!==undefined?(U1=R1.annotations)===null||U1===void 0?void 0:(V1=U1.UI)===null||V1===void 0?void 0:V1.Hidden:false;}return true;});}}return true;});}return _;},false);
