/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/ClassSupport","./MacroAPI","sap/base/util/merge"],function(C,M,m){"use strict";var _,a,b,c,d,f,g,h,j,k,l,n,q,r;var E=C.Event;var s=C.EventHandler;var P=C.Property;var A=C.APIClass;function t(e,p,i,o){if(!i)return;Object.defineProperty(e,p,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(o):void 0});}function u(i,e){if(!(i instanceof e)){throw new TypeError("Cannot call a class as a function");}}function v(e,p){for(var i=0;i<p.length;i++){var o=p[i];o.enumerable=o.enumerable||false;o.configurable=true;if("value"in o)o.writable=true;Object.defineProperty(e,o.key,o);}}function w(e,p,i){if(p)v(e.prototype,p);if(i)v(e,i);return e;}function x(e,i){if(typeof i!=="function"&&i!==null){throw new TypeError("Super expression must either be null or a function");}e.prototype=Object.create(i&&i.prototype,{constructor:{value:e,writable:true,configurable:true}});if(i)y(e,i);}function y(o,p){y=Object.setPrototypeOf||function y(o,p){o.__proto__=p;return o;};return y(o,p);}function z(e){var i=F();return function p(){var S=G(e),o;if(i){var N=G(this).constructor;o=Reflect.construct(S,arguments,N);}else{o=S.apply(this,arguments);}return B(this,o);};}function B(e,i){if(i&&(typeof i==="object"||typeof i==="function")){return i;}return D(e);}function D(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return e;}function F(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true;}catch(e){return false;}}function G(o){G=Object.setPrototypeOf?Object.getPrototypeOf:function G(o){return o.__proto__||Object.getPrototypeOf(o);};return G(o);}function H(o,e,i){if(e in o){Object.defineProperty(o,e,{value:i,enumerable:true,configurable:true,writable:true});}else{o[e]=i;}return o;}function I(e,p,i,o,L){var N={};Object.keys(o).forEach(function(O){N[O]=o[O];});N.enumerable=!!N.enumerable;N.configurable=!!N.configurable;if('value'in N||N.initializer){N.writable=true;}N=i.slice().reverse().reduce(function(N,O){return O(e,p,N)||N;},N);if(L&&N.initializer!==void 0){N.value=N.initializer?N.initializer.call(L):void 0;N.initializer=undefined;}if(N.initializer===void 0){Object.defineProperty(e,p,N);N=null;}return N;}function J(e,i){throw new Error('Decorating class property failed. Please ensure that '+'proposal-class-properties is enabled and runs after the decorators transform.');}var K=(_=A("sap.fe.macros.ChartAPI"),a=P({type:"string"}),b=P({type:"sap.ui.model.Context",required:true}),c=P({type:"sap.ui.model.Context",required:true}),d=P({type:"string",defaultValue:"MULTIPLE"}),f=P({type:"boolean|string"}),_(g=(h=function(e){x(K,e);var i=z(K);function K(){var o;u(this,K);for(var p=arguments.length,L=new Array(p),N=0;N<p;N++){L[N]=arguments[N];}o=i.call.apply(i,[this].concat(L));t(D(o),"id",j,D(o));t(D(o),"metaPath",k,D(o));t(D(o),"contextPath",l,D(o));t(D(o),"selectionMode",n,D(o));t(D(o),"personalization",q,D(o));t(D(o),"selectionChange",r,D(o));return o;}w(K,[{key:"handleSelectionChange",value:function L(o){var p=o.getParameter("data");var S=o.getParameter("name")==="selectData";this.fireSelectionChange(m({},{data:p,selected:S}));}}]);return K;}(M),(j=I(h.prototype,"id",[a],{configurable:true,enumerable:true,writable:true,initializer:null}),k=I(h.prototype,"metaPath",[b],{configurable:true,enumerable:true,writable:true,initializer:null}),l=I(h.prototype,"contextPath",[c],{configurable:true,enumerable:true,writable:true,initializer:null}),n=I(h.prototype,"selectionMode",[d],{configurable:true,enumerable:true,writable:true,initializer:null}),q=I(h.prototype,"personalization",[f],{configurable:true,enumerable:true,writable:true,initializer:null}),r=I(h.prototype,"selectionChange",[E],{configurable:true,enumerable:true,writable:true,initializer:null}),I(h.prototype,"handleSelectionChange",[s],Object.getOwnPropertyDescriptor(h.prototype,"handleSelectionChange"),h.prototype)),h))||g);return K;},false);