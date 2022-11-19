/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/macros/field/FieldTemplating","sap/fe/core/helpers/BindingExpression","sap/fe/core/templating/DataModelPathHelper"],function(F,B,D){"use strict";var _={};var e=D.enhanceDataModelPath;var c=B.concat;var a=B.compileBinding;var g=F.getTextBinding;function b(i){return j(i)||h(i)||f(i)||d();}function d(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function f(o,i){if(!o)return;if(typeof o==="string")return k(o,i);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return k(o,i);}function h(i){if(typeof Symbol!=="undefined"&&i[Symbol.iterator]!=null||i["@@iterator"]!=null)return Array.from(i);}function j(i){if(Array.isArray(i))return k(i);}function k(n,o){if(o==null||o>n.length)o=n.length;for(var i=0,q=new Array(o);i<o;i++){q[i]=n[i];}return q;}var l=/(?:({[^}]+})[^{]*)/g;var m=/{([^}]+)}(.*)/;var p=function(C){var o=C.targetObject;var t=o.Template.toString().match(l);if(t){var P=t.reduce(function(P,M){var s=M.match(m);if(s&&s.length>1){var i=s[1];if(o.Data[i]){var n=e(C,o.Data[i].fullyQualifiedName.replace(C.targetEntityType.fullyQualifiedName,""));n.targetObject=n.targetObject.Value;P.push(g(n,{},true));if(s.length>2){P.push(s[2]);}}}return P;},[]);return a(c.apply(void 0,b(P)));}return"";};_.getLabelForConnectedFields=p;return _;},false);
