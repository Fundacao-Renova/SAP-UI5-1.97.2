// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell_abap/pbServices/ui2/Error"],function(S){"use strict";var N="http://schemas.sap.com/sapui2/services/Chip/1";function g(d){return d.localName||d.baseName;}function a(d,s){var A,c,i,n;if(typeof d.getAttributeNS==="function"){return d.getAttributeNS(null,s);}c=d.attributes;for(i=0,n=c.length;i<n;i+=1){A=c[i];if(!A.namespaceURI&&g(A)===s){return A.nodeValue;}}return"";}function b(d){return d.textContent||d.text||"";}function v(t,d,c){var o,e=d.childNodes,h,i,n;for(i=0,n=e.length;i<n;i+=1){o=e[i];if(o.namespaceURI===N){h=c[g(o)];if(h){h.call(t,o);}}}}var C=function(x){var t=this;if(x instanceof sap.ushell_abap.pbServices.ui2.ChipDefinition){x=JSON.parse(JSON.stringify(x));["appearance","contracts","id","implementation"].forEach(function(n){if(Object.prototype.hasOwnProperty.call(x,n)){t[n]=x[n];}});return;}if(g(x.documentElement)!=="chip"||x.documentElement.namespaceURI!==N){throw new S("Missing root <chip>","ChipDefinition");}v(this,x.documentElement,{appearance:function(A){this.appearance={};v(this.appearance,A,{description:function(d){this.description=b(d);},title:function(T){this.title=b(T);}});},contracts:function(c){this.contracts={};v(this.contracts,c,{consume:function(o){var i=a(o,"id");this[i]={};v(this[i],o,{parameters:function(p){this.parameters={};v(this.parameters,p,{parameter:function(P){var n=a(P,"name");this[n]=b(P);}});}});}});},id:function(i){this.id=b(i);},implementation:function(i){this.implementation={};v(this.implementation,i,{sapui5:function(u){this.sapui5={basePath:"."};var V;v(this.sapui5,u,{basePath:function(B){this.basePath=b(B);},componentName:function(c){this.componentName=b(c);V=a(c,"virtualNamespace");},viewName:function(o){this.viewName=b(o);V=a(o,"virtualNamespace");}});if(V){this.sapui5.virtualNamespace=V==="true";}}});}});x=null;};return C;},true);