sap.ui.define(["sap/base/Log"],function(L){"use strict";return{setAttributeToMultipleElements:function(s,a,b){var c=document.querySelectorAll(s);for(var i=0;i<c.length;i++){c[i].setAttribute(a,b);}},getElementWidth:function(e){return parseFloat(getComputedStyle(e.getDomRef(),null).width.replace("px",""));},getElementHeight:function(e){return parseFloat(getComputedStyle(e.getDomRef(),null).height.replace("px",""));},removeElementById:function(e){var s=document.getElementById(e);if(s){s.parentNode.removeChild(s);}return;},addClassToAllElements:function(e,c){if(e){if(e.length){e.forEach(function(a){a.classList.add(c);});}else{e.classList.add(c);}}},removeClassToAllElements:function(e,c){if(e){if(e.length){e.forEach(function(a){a.classList.remove(c);});}else{e.classList.remove(c);}}},checkIfFunction:function(p){if(typeof p==="function"){return true;}return false;},getIndex:function(n){var c=n.parentNode.childNodes;var a=0;for(var i=0;i<c.length;i++){if(c[i]==n){return a;}if(c[i].nodeType==1){a++;}}return-1;},addStyleToAllElements:function(e,p,v){if(e){if(e.length){e.forEach(function(a){a.style[p]=v;});}else{e.style[p]=v;}}},addAttributeToAllElements:function(e,a,b){if(e){if(e.length){e.forEach(function(c){c.setAttribute(a,b);});}else{e.setAttribute(a,b);}}},getOuterHeight:function(e){var h=e.offsetHeight;var s=getComputedStyle(e);h+=parseInt(s.marginTop,10)+parseInt(s.marginBottom,10);return h;},removeAttributesFromAll:function(e,s,a){if(e){e.forEach(function(b){var c=b.querySelectorAll(s);if(c){for(var i=0;i<c.length;i++){c[i].removeAttribute(a);}}});}}};},true);