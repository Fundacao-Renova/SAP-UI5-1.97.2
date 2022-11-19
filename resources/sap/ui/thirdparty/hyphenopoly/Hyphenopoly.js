/**
 * @license Hyphenopoly 3.4.0 - client side hyphenation for webbrowsers
 * ©2019  Mathias Nater, Zürich (mathiasnater at gmail dot com)
 * https://github.com/mnater/Hyphenopoly
 *
 * Released under the MIT license
 * http://mnater.github.io/Hyphenopoly/LICENSE
 */
(function m(w){"use strict";var S=String.fromCharCode(173);function d(){return Object.create(null);}Math.imul=Math.imul||function i(a,b){var h=(a>>>16)&0xffff;var l=a&0xffff;var H=(b>>>16)&0xffff;var L=b&0xffff;return((l*L)+((((h*L)+(l*H))<<16)>>>0)|0);};function f(v,p){return{"configurable":(p&4)>0,"enumerable":(p&2)>0,"writable":(p&1)>0,"value":v};}function g(a){a.addEventListener("copy",function o(e){e.preventDefault();var s=w.getSelection();var b=s.getRangeAt(0).cloneContents();var c=document.createElement("div");c.appendChild(b);var h=c.innerHTML;var i=s.toString();e.clipboardData.setData("text/plain",i.replace(new RegExp(S,"g"),""));e.clipboardData.setData("text/html",h.replace(new RegExp(S,"g"),""));},true);}(function c(H){var a=Object.create(null,{"defaultLanguage":f("en-us",2),"dontHyphenate":f((function b(){var r=d();var l="abbr,acronym,audio,br,button,code,img,input,kbd,label,math,option,pre,samp,script,style,sub,sup,svg,textarea,var,video";l.split(",").forEach(function e(v){r[v]=true;});return r;}()),2),"dontHyphenateClass":f("donthyphenate",2),"exceptions":f(d(),2),"keepAlive":f(true,2),"normalize":f(false,2),"safeCopy":f(true,2),"timeout":f(1000,2)});var s=Object.create(a);var p=Object.create(null,{"compound":f("hyphen",2),"hyphen":f(S,2),"leftmin":f(0,2),"leftminPerLang":f(0,2),"minWordLength":f(6,2),"mixedCase":f(true,2),"orphanControl":f(1,2),"rightmin":f(0,2),"rightminPerLang":f(0,2)});Object.keys(H.setup).forEach(function h(b){if(b==="selectors"){var e=Object.keys(H.setup.selectors);Object.defineProperty(s,"selectors",f(e,2));e.forEach(function j(i){var t=d();Object.keys(H.setup.selectors[i]).forEach(function l(k){t[k]=f(H.setup.selectors[i][k],2);});Object.defineProperty(s,i,f(Object.create(p,t),2));});}else if(b==="dontHyphenate"){var t=d();Object.keys(H.setup.dontHyphenate).forEach(function i(k){t[k]=f(H.setup.dontHyphenate[k],2);});Object.defineProperty(s,b,f(Object.create(a.dontHyphenate,t),3));}else{Object.defineProperty(s,b,f(H.setup[b],3));}});H.c=s;}(Hyphenopoly));(function R(H){var C=H.c;var b=null;var j=null;function l(){var a=new Map();var c=[0];function e(i,k,s){var n={"element":i,"selector":s};if(!a.has(k)){a.set(k,[]);}a.get(k).push(n);c[0]+=1;return n;}function r(i){var k=0;if(a.has(i)){k=a.get(i).length;a.delete(i);c[0]-=k;if(c[0]===0){H.events.dispatch("hyphenopolyEnd");}}}function h(i){a.forEach(function n(v,k){i(k,v);});}return{"add":e,"counter":c,"each":h,"list":a,"rem":r};}function o(e,a){try{return(e.getAttribute("lang"))?e.getAttribute("lang").toLowerCase():e.tagName.toLowerCase()==="html"?a?b:null:o(e.parentNode,a);}catch(i){return null;}}function q(){var e=w.document.getElementsByTagName("html")[0];b=o(e,false);if(!b&&C.defaultLanguage!==""){b=C.defaultLanguage;}}function t(n,s){if(!n.matches){n.matches=n.msMatchesSelector||n.webkitMatchesSelector;}return n.matches(s);}function u(){j=l();var a=(function h(){var s="."+H.c.dontHyphenateClass;var k=null;for(k in C.dontHyphenate){if(C.dontHyphenate[k]){s+=", "+k;}}return s;}());var c=C.selectors.join(", ")+", "+a;function e(h,i){if(h.lang&&typeof h.lang==="string"){return h.lang.toLowerCase();}else if(i&&i!==""){return i.toLowerCase();}return o(h,true);}function p(h,i,s,k){k=k||false;var r=e(h,i);if(H.cf.langs[r]==="H9Y"){j.add(h,r,s);if(!k&&C.safeCopy){g(h);}}else if(!H.cf.langs[r]){H.events.dispatch("error",{"lvl":"warn","msg":"Element with '"+r+"' found, but '"+r+".hpb' not loaded. Check language tags!"});}var v=h.childNodes;Array.prototype.forEach.call(v,function T(n){if(n.nodeType===1&&!t(n,c)){p(n,r,s,true);}});}C.selectors.forEach(function i(s){var h=w.document.querySelectorAll(s);Array.prototype.forEach.call(h,function k(n){p(n,o(n,true),s,false);});});H.elementsReady=true;}var x=new Map();function y(e,h,k){var n=C[k];var r=n.hyphen;e.cache.set(k,new Map());function T(a){var c=String.fromCharCode(8203);var i=null;var s=null;if(n.compound==="auto"||n.compound==="all"){s=y(e,h,k);i=a.split("-").map(function v(p){if(p.length>=n.minWordLength){return s(p);}return p;});if(n.compound==="auto"){a=i.join("-");}else{a=i.join("-"+c);}}else{a=a.replace("-","-"+c);}return a;}function U(s){return Array.prototype.map.call(s,function a(c){return(c===c.toLowerCase());}).some(function c(v,i,a){return(v!==a[0]);});}function V(a){var c=e.cache.get(k).get(a);if(!n.mixedCase&&U(a)){c=a;}if(!c){if(e.exceptions.has(a)){c=e.exceptions.get(a).replace(/-/g,n.hyphen);}else if(a.indexOf("-")===-1){if(a.length>61){H.events.dispatch("error",{"lvl":"warn","msg":"found word longer than 61 characters"});c=a;}else{c=e.hyphenateFunction(a,r.charCodeAt(0),n.leftminPerLang[h],n.rightminPerLang[h]);}}else{c=T(a);}e.cache.get(k).set(a,c);}return c;}x.set(h+"-"+k,V);return V;}var z=new Map();function A(s){function c(i,a,e,k){var n=C[s];var h=n.hyphen;if(".\\+*?[^]$(){}=!<>|:-".indexOf(n.hyphen)!==-1){h="\\"+n.hyphen;}if(n.orphanControl===3&&a===" "){a=String.fromCharCode(160);}return a+e.replace(new RegExp(h,"g"),"")+k;}z.set(s,c);return c;}function B(a,s,e){var c=H.languages.get(a);var h=C[s];var i=h.minWordLength;var k=C.normalize&&Boolean(String.prototype.normalize);var p=a+"-"+s;var v=(x.has(p))?x.get(p):y(c,a,s);var T=(z.has(s))?z.get(s):A(s);var U=c.genRegExps.get(s);function V(n){var X=null;if(k){X=n.normalize("NFC").replace(U,v);}else{X=n.replace(U,v);}if(h.orphanControl!==1){X=X.replace(/(\u0020*)(\S+)(\s*)$/,T);}return X;}function W(X){H.events.dispatch("beforeElementHyphenation",{"el":X,"lang":a});var Y=X.childNodes;Array.prototype.forEach.call(Y,function Z(n){if(n.nodeType===3&&n.data.length>=i){n.data=V(n.data);}});j.counter[0]-=1;H.events.dispatch("afterElementHyphenation",{"el":X,"lang":a});}var r=null;if(typeof e==="string"){r=V(e);}else if(e instanceof HTMLElement){W(e);}return r;}H.createHyphenator=function c(a){return function h(e,s){s=s||".hyphenate";return B(a,s,e);};};H.unhyphenate=function a(){j.each(function i(c,e){e.forEach(function p(k){var n=k.element.firstChild;var h=C[k.selector].hyphen;n.data=n.data.replace(new RegExp(h,"g"),"");});});};function D(a,e){if(e){e.forEach(function h(c){B(a,c.selector,c.element);});}else{H.events.dispatch("error",{"lvl":"warn","msg":"engine for language '"+a+"' loaded, but no elements found."});}if(j.counter[0]===0){H.events.dispatch("hyphenopolyEnd");}}function E(a){var r=new Map();a.split(", ").forEach(function c(e){var k=e.replace(/-/g,"");r.set(k,e);});return r;}function F(a){if(!H.languages){H.languages=new Map();}if(!H.languages.has(a)){H.languages.set(a,d());}return H.languages.get(a);}function G(a,h,c,e,r){c=c.replace(/-/g,"");var i=F(a);if(!i.engineReady){i.cache=new Map();if(H.c.exceptions.global){if(H.c.exceptions[a]){H.c.exceptions[a]+=", "+H.c.exceptions.global;}else{H.c.exceptions[a]=H.c.exceptions.global;}}if(H.c.exceptions[a]){i.exceptions=E(H.c.exceptions[a]);delete H.c.exceptions[a];}else{i.exceptions=new Map();}i.genRegExps=new Map();i.leftmin=e;i.rightmin=r;i.hyphenateFunction=h;C.selectors.forEach(function n(s){var k=C[s];if(k.leftminPerLang===0){Object.defineProperty(k,"leftminPerLang",f(d(),2));}if(k.rightminPerLang===0){Object.defineProperty(k,"rightminPerLang",f(d(),2));}if(k.leftminPerLang[a]){k.leftminPerLang[a]=Math.max(i.leftmin,k.leftmin,k.leftminPerLang[a]);}else{k.leftminPerLang[a]=Math.max(i.leftmin,k.leftmin);}if(k.rightminPerLang[a]){k.rightminPerLang[a]=Math.max(i.rightmin,k.rightmin,k.rightminPerLang[a]);}else{k.rightminPerLang[a]=Math.max(i.rightmin,k.rightmin);}i.genRegExps.set(s,new RegExp("[\\w"+c+String.fromCharCode(8204)+"-]{"+k.minWordLength+",}","gi"));});i.engineReady=true;}Hyphenopoly.events.dispatch("engineReady",{"msg":a});}function I(a){if(H.cf.wasm){return Math.ceil(a/65536)*65536;}var e=Math.ceil(Math.log(a)*Math.LOG2E);if(e<=12){return 1<<12;}if(e<24){return 1<<e;}return Math.ceil(a/(1<<24))*(1<<24);}var J=(function c(){if(w.TextDecoder){var a=new TextDecoder("utf-16le");return function h(e){return a.decode(e);};}return function h(e){return String.fromCharCode.apply(null,e);};}());function K(h){var a=new Uint32Array(h).subarray(0,8);if(a[0]!==40005736){H.events.dispatch("error",{"lvl":"error","msg":"Pattern file format error: "+new Uint8Array(Uint32Array.of(a[0]).buffer)});throw new Error("Pattern file format error!");}var v=a[7];var c=1280;var p=c+v+(4-((c+v)%4));var e=p+(a[6]*4);return{"ho":e+512,"hp":e+192,"hs":Math.max(I(e+512+a[2]+a[3]),32*1024*64),"hw":e+256,"lm":a[4],"pl":a[3],"po":e+512+a[2],"pt":p,"rm":a[5],"to":e+512+a[1],"tw":e+128,"vs":c,"wo":e};}function L(a,h){var c=H.cf.wasm?a.wasmMemory.buffer:a.heapBuffer;var e=(new Uint16Array(c)).subarray(a.wo>>1,(a.wo>>1)+64);var k=(new Uint16Array(c)).subarray(a.hw>>1,(a.hw>>1)+128);e[0]=95;return function T(n,p,r,s){var i=0;var v=0;do{v=n.charCodeAt(i);i+=1;e[i]=v;}while(v);e[i]=95;e[i+1]=0;if(h(r,s,p)===1){n=J(k.subarray(1,k[0]+1));}return n;};}function M(a){Promise.all([H.bins.get(a),H.bins.get("hyphenEngine")]).then(function p(c){var h=c[0];var e=K(h);var i=c[1];var s=H.specMems.get(a);var k=(s.buffer.byteLength>=e.hs)?s:new WebAssembly.Memory({"initial":e.hs/65536,"maximum":256});var n=new Uint32Array(k.buffer);n.set(new Uint32Array(h),e.ho>>2);e.wasmMemory=k;WebAssembly.instantiate(i,{"env":{"memory":e.wasmMemory,"memoryBase":0},"x":e}).then(function T(r){var v=r.exports.convert();G(a,L(e,r.exports.hyphenate),J((new Uint16Array(k.buffer)).subarray(385,384+v)),e.lm,e.rm);});});}function N(a){var h=H.bins.get(a);var c=K(h);var s=H.specMems.get(a);var e=(s.byteLength>=c.hs)?s:new ArrayBuffer(c.hs);var i=new Uint8Array(e);var k=new Uint8Array(h);i.set(k,c.ho);c.heapBuffer=e;var n=asmHyphenEngine({"Int32Array":w.Int32Array,"Math":Math,"Uint16Array":w.Uint16Array,"Uint8Array":w.Uint8Array},c,c.heapBuffer);var p=n.convert();G(a,L(c,n.hyphenate),J((new Uint16Array(e)).subarray(385,384+p)),c.lm,c.rm);}var O=null;var P=[];function Q(a,e){if(a==="*"){if(e==="wasm"){O=M;}else if(e==="asm"){O=N;}P.forEach(function c(h){O(h);});}else if(O){O(a);}else{P.push(a);}}H.events.define("contentLoaded",function a(){q();u();H.events.dispatch("elementsReady");},false);H.events.define("elementsReady",function a(){j.each(function e(c,v){if(H.languages&&H.languages.has(c)&&H.languages.get(c).engineReady){D(c,v);}});},false);H.events.define("engineLoaded",function a(e){Q("*",e.msg);},false);H.events.define("hpbLoaded",function a(e){Q(e.msg,"*");},false);H.events.addListener("loadError",function a(e){if(e.msg!=="wasm"){j.rem(e.name);}},false);H.events.define("engineReady",function a(e){if(H.elementsReady){D(e.msg,j.list.get(e.msg));}},false);H.events.define("hyphenopolyStart",null,true);H.events.define("hyphenopolyEnd",function a(){w.clearTimeout(C.timeOutHandler);if(C.hide!=="none"){H.toggle("on");}if(!C.keepAlive){window.Hyphenopoly=null;}},false);H.events.define("beforeElementHyphenation",null,true);H.events.define("afterElementHyphenation",null,true);H.events.tempRegister.forEach(function a(e){H.events.addListener(e.name,e.handler,false);});delete H.events.tempRegister;H.events.dispatch("hyphenopolyStart",{"msg":"Hyphenopoly started"});w.clearTimeout(H.c.timeOutHandler);Object.defineProperty(C,"timeOutHandler",f(w.setTimeout(function a(){H.events.dispatch("timeout",{"delay":C.timeout});},C.timeout),2));H.events.deferred.forEach(function e(a){H.events.dispatch(a.name,a.data);});delete H.events.deferred;}(Hyphenopoly));}(window));