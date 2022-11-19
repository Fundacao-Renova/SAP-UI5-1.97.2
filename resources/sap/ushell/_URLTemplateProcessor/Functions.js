// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/util/deepExtend","sap/ui/thirdparty/URI","sap/ushell/_URLTemplateProcessor/utils","sap/ushell/utils/type"],function(d,U,_,u){"use strict";var O={url:{args:["urlPart?"],minValues:0,maxValues:0,fn:function(A){var o=new U();var j=["protocol","scheme","username","password","hostname","port","host","userinfo","authority","origin","subdomain","domain","tld","pathname","path","directory","filename","suffix","search","query","hash","fragment","resource"];var m="toString";if(A.urlPart){if(j.indexOf(A.urlPart)===-1){throw new Error("The URL part '"+A.urlPart+"' is not valid. Please use one of "+j.join(", "));}m=A.urlPart;}return o[m]();}},if:{args:["trueCondition"],minValues:1,maxValues:2,fn:function(A,v){var V=g(v);if(i(A.trueCondition)){return V.length===1?undefined:V.pop();}return V[0];}},and:{args:["emptyCondition?"],minValues:1,fn:function(A,v){var V=g(v);if(typeof A.emptyCondition==="undefined"&&A.length>0){return undefined;}if(typeof A.emptyCondition!=="undefined"&&i(A.emptyCondition)){return undefined;}var l=V.pop();var j=V.every(_.hasValue);return j?l:undefined;}},or:{args:["emptyCondition?"],minValues:1,fn:function(A,v){var V=g(v);if(typeof A.emptyCondition==="undefined"&&A.length>0){return undefined;}if(typeof A.emptyCondition!=="undefined"&&i(A.emptyCondition)){return undefined;}return V.reduce(function(P,n){if(_.hasValue(P)){return P;}return _.hasValue(n)?n:undefined;});}},replace:{args:["strRegExp","strReplace","flags?"],minValues:1,maxValues:1,fn:function(A,v){var j=new RegExp(A.strRegExp,A.flags);var R=A.strReplace||"";if(typeof v===undefined||v===null){return v;}if(u.isArray(v)){if(v.length===1){return O.replace.fn.call(this,A,v[0]);}return v.map(function(V){return O.replace.fn.call(this,A,V);});}if(u.isPlainObject(v)){return Object.keys(v).reduce(function(o,k){var V=v[k];o[k]=O.replace.fn.call(this,A,V);return o;},{});}if(typeof v==="string"){return v.replace(j,R);}return O.replace.fn.call(this,A,v+"");}},join:{args:["macroSeparator?","microSeparator?"],minValues:1,fnPipe:function(A,v){var V=[v];return O.join.fn.call(this,A,V);},fn:function(A,v){var m=A.macroSeparator||"";var M=A.microSeparator||"";v=v.map(function(s){if(!u.isPlainObject(s)&&!u.isArray(s)){return s;}var T=Object.prototype.toString.apply(s);if(T==="[object Object]"){var S=_.removeArrayParameterNotation(s);return Object.keys(S).sort().map(function(k){return k+M+s[k];}).join(m);}if(T==="[object Array]"){return s.join(m);}});return v.join(m);}},match:{args:["strRegex"],minValues:1,fnPipe:function(A,v){var s=A.strRegex;var j=new RegExp(s);return Object.keys(v).reduce(function(o,n){if(j.exec(n)){o[n]=v[n];}return o;},{});},fn:function(A,v){if(v===undefined){return undefined;}var s=A.strRegex;var j=new RegExp(s);var m=v.filter(function(V){var I;if(u.isPlainObject(V)){I=Object.keys(V);}else if(u.isArray(V)){I=V;}else{I=[""+V];}return I.some(j.exec.bind(j));});return m.length===v.length?true:undefined;}},not:{args:[],minValues:1,fnPipe:function(A,v){return Object.keys(v).length>0?undefined:"";},fn:function(A,v){var E=O.and.fn(A,v);return E===undefined?"":undefined;}},stringify:{args:[],minValues:1,fn:function(A,v){if(u.isArray(v)){if(v.length===0){return"";}if(v.length===1){v=v[0];}}if(typeof v==="string"){return v;}return JSON.stringify(v);}},encodeURIComponent:{args:[],minValues:1,maxValues:1,fnPipe:function(A,v){return Object.keys(v).reduce(function(o,k){o[k]=encodeURIComponent(v[k]);return o;},{});},fn:function(A,v){var V=v[0];if(typeof V!=="string"){return V;}return encodeURIComponent(V);}}};function i(v){if(typeof v==="undefined"){return true;}if(typeof v==="string"){return v==="";}if(typeof v==="object"){return Object.keys(v).length===0;}if(typeof v==="number"){return v===0;}if(typeof v==="boolean"){return v===false;}throw new Error("Unexpected type for value");}function g(v){var V;if(u.isArray(v)){V=v;}else if(u.isPlainObject(v)){V=[v];}else if(v===undefined){return[];}else{throw new Error("Unexpected type");}return V;}function a(F,o,v){if(v!==undefined&&!u.isPlainObject(v)){throw new Error("Invalid value type passed to '"+F+"' in pipe context. An object is expected.");}}function b(F,o,v){if(v!==undefined&&!u.isArray(v)){throw new Error("Invalid value type passed to '"+F+"' in value context. An array is expected.");}var n=u.isArray(v)?v.length:0;if(_.hasValue(o.maxValues)&&n>o.maxValues){throw new Error("Too many values were passed to '"+F+"'. Please pass maximum "+o.maxValues+" values.");}if(_.hasValue(o.minValues)&&n<o.minValues){throw new Error("Too few values were passed to '"+F+"'. Please pass minimum "+o.minValues+" values.");}}function c(A){var E=false;A.map(e).reduce(function(R,n){if(!R&&n){E=true;}return n;},true);return E;}function e(A){return A.charAt(A.length-1)!=="?";}function r(A){return A.substr(0,A.length-1);}function p(F,A){var j=d([],O[F].args);if(c(j)){throw new Error("Invalid argument signature. Make sure all optional arguments appear in the end.");}var o={length:A.length};var R=j.filter(e);var m=R>A.length;if(m){throw new Error(F+" requires "+R+" arguments but "+A.length+" was specified");}A.forEach(function(v){var n=j.shift();var I=!e(n);if(I){n=r(n);}if(A.length>0){o[n]=v;}});return o;}function f(P,F,j,I){if(!O.hasOwnProperty(F)){throw"Invalid function: "+F;}var o=p(F,j);if(P){a(F,O[F],I);}else{b(F,O[F],I);}if(P){if(!O[F].fnPipe){throw new Error("The function '"+F+"' cannot be executed in pipe context");}return O[F].fnPipe(o,I);}return O[F].fn(o,I);}function t(s){return s.split("").map(function(j){if(j==="["){return"[\\[]";}return"["+j+"]";}).join("");}function h(){var A=Object.keys(O);return A.map(t).join("|");}return{getPossibleFunctionsRegExpString:h,applyFunctionInValueContext:f.bind(null,false),applyFunctionInPipeContext:f.bind(null,true),_setURIDependency:function(F){U=F;}};});
