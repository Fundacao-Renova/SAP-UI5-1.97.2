/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/BindingExpression","sap/fe/core/templating/PropertyHelper"],function(B,P){"use strict";var _={};var i=P.isPathExpression;var a=P.isAnnotationPathExpression;var e=B.equal;var c=B.constant;var b=B.annotationExpression;var g=function(r){var v=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];if(!r){return v;}else{if(v.length>=r.navigationProperties.length){var s=[];r.navigationProperties.forEach(function(C,D){if(v[D]!==C){s.push(v[D]);}});s=s.concat(v.slice(r.navigationProperties.length));var t=0;while(s.length>1&&t!=s.length-1){var u=s[t];var w=s[t+1];if(u.partner===w.name){s.splice(0,2);}else{t++;}}return s;}else{var x=[];v.forEach(function(C,D){if(r.navigationProperties[D]!==C){x.push(v[D]);}});x=x.concat(r.navigationProperties.slice(v.length));var y=0;while(x.length>1&&y!=x.length-1){var z=x[y];var A=x[y+1];if(z.partner===A.name){x.splice(0,2);}else{y++;}}x=x.map(function(C){return C.targetType.navigationProperties.find(function(D){return D.name===C.partner;});});return x;}}};_.getPathRelativeLocation=g;var d=function(r,s){var t="";if((i(s)||a(s))&&s.path){t=s.path;}else if(typeof s==="string"){t=s;}var T;if(i(s)||a(s)){T=s.$target;}else if(r.targetEntityType){T=r.targetEntityType.resolvePath(t);}else{T=r.targetObject;}var u=t.split("/");var v=r.targetEntitySet;var w=r.targetEntityType;var x=r.navigationProperties.concat();u.reduce(function(y,z){if(!y){return undefined;}var A=y.navigationProperties.find(function(C){return C.name===z;});if(A){x.push(A);w=A.targetType;if(v&&v.navigationPropertyBinding.hasOwnProperty(z)){v=v.navigationPropertyBinding[z];}return w;}return undefined;},r.targetEntityType);return{startingEntitySet:r.startingEntitySet,navigationProperties:x,contextLocation:r.contextLocation,targetEntitySet:v,targetEntityType:w,targetObject:T};};_.enhanceDataModelPath=d;var f=function(r){var s;var R=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var t="";if(!R){t+="/".concat(r.startingEntitySet.name);}var u=R&&(s=r.contextLocation)!==null&&s!==void 0&&s.targetEntitySet?r.contextLocation.targetEntitySet:r.startingEntitySet;var v=[];r.navigationProperties.forEach(function(w){var x;if(!R||!r.contextLocation||!((x=r.contextLocation)!==null&&x!==void 0&&x.navigationProperties.some(function(y){return y.fullyQualifiedName===w.fullyQualifiedName;}))){v.push(w.name);}if(u&&u.navigationPropertyBinding.hasOwnProperty(v.join("/"))){if(R){t+="".concat(v.join("/"));}else{t+="/$NavigationPropertyBinding/".concat(v.join("/"),"/$");}u=u.navigationPropertyBinding[v.join("/")];v=[];}});return t;};_.getTargetEntitySetPath=f;var h=function(r){var v=[];var s=r.startingEntitySet;var t=[];r.navigationProperties.forEach(function(u){t.push(u.name);if(s&&s.navigationPropertyBinding.hasOwnProperty(t.join("/"))){v.push(u);s=s.navigationPropertyBinding[t.join("/")];t=[];}});return v;};_.getTargetEntitySetNavigation=h;var j=function(r){var R=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var s="";if(!r.startingEntitySet){return"/";}if(!R){s+="/".concat(r.startingEntitySet.name);}if(r.navigationProperties.length>0){if(s.length>0){s+="/";}s+=r.navigationProperties.map(function(t){return t.name;}).join("/");}if(r.targetObject&&r.targetObject.name&&r.targetObject._type!=="NavigationProperty"&&r.targetObject._type!=="EntityType"&&r.targetObject!==r.startingEntitySet){if(!s.endsWith("/")){s+="/";}s+="".concat(r.targetObject.name);}else if(r.targetObject&&r.targetObject.hasOwnProperty("term")){if(s.length>0&&!s.endsWith("/")){s+="/";}s+="@".concat(r.targetObject.term);}return s;};_.getTargetObjectPath=j;var k=function(r){var s=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var t=g(r.contextLocation,r.navigationProperties);if(s){if(t.find(function(v){return v.isCollection;})){return undefined;}}var u=t.map(function(v){return v.name;}).join("/");if(r.targetObject&&(r.targetObject.name||r.targetObject.type==="PropertyPath"&&r.targetObject.value)&&r.targetObject._type!=="NavigationProperty"&&r.targetObject!==r.startingEntitySet){if(u.length>0&&!u.endsWith("/")){u+="/";}u+=r.targetObject.type==="PropertyPath"?"".concat(r.targetObject.value):"".concat(r.targetObject.name);}else if(r.targetObject&&r.targetObject.hasOwnProperty("term")){if(u.length>0&&!u.endsWith("/")){u+="/";}u+="@".concat(r.targetObject.term);if(r.targetObject.hasOwnProperty("qualifier")&&!!r.targetObject.qualifier){u+="#".concat(r.targetObject.qualifier);}}else if(!r.targetObject){return undefined;}return u;};_.getContextRelativeTargetObjectPath=k;var l=function(r,s,t){return q(r,function(u){var v;return u===null||u===void 0?void 0:(v=u.UpdateRestrictions)===null||v===void 0?void 0:v.Updatable;},s,t);};_.isPathUpdatable=l;var m=function(r,s,t){return q(r,function(u){var v;return u===null||u===void 0?void 0:(v=u.SearchRestrictions)===null||v===void 0?void 0:v.Searchable;},s,t);};_.isPathSearchable=m;var n=function(r,s,t){return q(r,function(u){var v;return u===null||u===void 0?void 0:(v=u.DeleteRestrictions)===null||v===void 0?void 0:v.Deletable;},s,t);};_.isPathDeletable=n;var o=function(r,s){return q(r,function(t){var u;return t===null||t===void 0?void 0:(u=t.InsertRestrictions)===null||u===void 0?void 0:u.Insertable;},s);};_.isPathInsertable=o;var p=function(r,s){return q(r,function(t){if(t&&"FilterRestrictions"in t){var u;var v=(t===null||t===void 0?void 0:(u=t.FilterRestrictions)===null||u===void 0?void 0:u.FilterExpressionRestrictions)||[];var w=v.find(function(y){return y.Property.$target===r.targetObject;});if(w){var x;return s.indexOf(w===null||w===void 0?void 0:(x=w.AllowedExpressions)===null||x===void 0?void 0:x.toString())!==-1;}else{return false;}}else{return false;}});};_.checkFilterExpressionRestrictions=p;var q=function(r,s,t,T){var u,v,w;if(!r||!r.startingEntitySet){return c(true);}r=d(r,t);var x=r.startingEntitySet;var y=null;var z=[];var A=[];var C=x;var D=r.targetEntityType;var E=false;r.navigationProperties.forEach(function(Q){if(E){z=[];}z.push(Q.name);A.push(Q);if(!Q.containsTarget){var S=z.join("/");if(x&&x.navigationPropertyBinding.hasOwnProperty(S)){y=x;x=x.navigationPropertyBinding[S];C=x;E=true;}else{y=x;x=null;E=true;}}else{y=x;C=null;}});var F=z.join("/");var G,H;if(y!==null){var I,J,K;var L=y;(I=L.annotations)===null||I===void 0?void 0:(J=I.Capabilities)===null||J===void 0?void 0:(K=J.NavigationRestrictions)===null||K===void 0?void 0:K.RestrictedProperties.forEach(function(Q){var S;if(((S=Q.NavigationProperty)===null||S===void 0?void 0:S.type)==="NavigationPropertyPath"){var U=s(Q);if(F===Q.NavigationProperty.value&&U!==undefined){var V;var W=A.slice(0,-1);if(C!==null){H=W;}else{if(W.length===0){H=A.slice(0);}else{H=W;}}G=e(b(U,g((V=r)===null||V===void 0?void 0:V.contextLocation,H).map(function(X){return X.name;})),true);}}});}var M;var N=s((u=C)===null||u===void 0?void 0:(v=u.annotations)===null||v===void 0?void 0:v.Capabilities);if(C===null&&N===undefined){var O;N=s(D===null||D===void 0?void 0:(O=D.annotations)===null||O===void 0?void 0:O.Capabilities);}if(N!==undefined){M=e(b(N,g(r.contextLocation,A).map(function(Q){return Q.name;})),true);}if(T&&!G&&(w=N)!==null&&w!==void 0&&w.path){var R={"currentEntityRestriction":M};return R;}return G||M||c(true);};_.checkOnPath=q;return _;},false);
