/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/base/BindingParser"],function(B){"use strict";var g=function(o,p){if(!o){return null;}var P=p.split("/");if(P.length===1){return o[p];}else{return g(o[P[0]],P.splice(1).join("/"));}};var r=function(a,m){if(a.indexOf("[")!==-1){var f=a.indexOf("[");var s=a.substr(0,f);var R=a.substr(f+1);var l=R.indexOf("]");var v=m.getObject(s);var e=B.parseExpression(R.substr(0,l));if(Array.isArray(v)&&e&&e.result&&e.result.parts&&e.result.parts[0]&&e.result.parts[0].path){var F=false;for(var i=0;i<v.length&&!F;i++){var o=g(v[i],e.result.parts[0].path);var b=e.result.formatter(o);if(b){F=true;}}if(F){a=r(s+(i-1)+R.substr(l+1),m);}}}return a;};return{resolveDynamicExpression:r};});
