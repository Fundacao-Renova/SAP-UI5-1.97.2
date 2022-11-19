/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/base/DataType","sap/base/util/merge","sap/base/util/isPlainObject","sap/base/Log"],function(B,D,m,a,L){"use strict";var A={name:{type:"string",mandatory:true,allowedForComplexProperty:true},label:{type:"string",mandatory:true,allowedForComplexProperty:true},visible:{type:"boolean",defaultValue:true,allowedForComplexProperty:true},path:{type:"string",valueForComplexProperty:null},typeConfig:{type:{className:{type:"string"},baseType:{type:"string"},typeInstance:{type:"object"}},valueForComplexProperty:null},maxConditions:{type:"int",defaultValue:-1,valueForComplexProperty:null},caseSensitive:{type:"boolean",defaultValue:true},group:{type:"string",allowedForComplexProperty:true},groupLabel:{type:"string",allowedForComplexProperty:true},filterable:{type:"boolean",defaultValue:true,valueForComplexProperty:false},sortable:{type:"boolean",defaultValue:true,valueForComplexProperty:false},key:{type:"boolean",valueForComplexProperty:false},groupable:{type:"boolean",valueForComplexProperty:false},propertyInfos:{type:"PropertyReference[]",allowedForComplexProperty:true},unit:{type:"PropertyReference"},text:{type:"PropertyReference"},exportSettings:{type:"object",allowedForComplexProperty:true},visualSettings:{type:"object"},required:{type:"boolean"},hiddenFilter:{type:"boolean"}};var p={isComplex:function(){return P.isPropertyComplex(this);},getReferencedProperties:function(){return this.propertyInfosProperties||[];},getSortableProperties:function(){return o(this,function(i){return i.sortable;});},getFilterableProperties:function(){return o(this,function(i){return i.filterable;});},getGroupableProperties:function(){return o(this,function(i){return i.groupable;});},getVisibleProperties:function(){return o(this,function(i){return i.visible;});}};var c=["name","label","visible","path","typeConfig","maxConditions","group","groupLabel","caseSensitive"];var _=new WeakMap();function s(O){return JSON.stringify(O,function(K,V){return V===undefined?null:V;})||"";}function r(M,i){var w=s(i);L.warning("Invalid property definition: "+M+(w?"\n"+w:""));}function t(M,i){var w=i?s(i):null;throw new Error("Invalid property definition: "+M+(w?"\n"+w:""));}function e(i,w){w.map(function(x){Object.keys(p).forEach(function(M){Object.defineProperty(x,M,{value:function(){return p[M].call(this);},writable:true});});});}function d(O){var K=Object.getOwnPropertyNames(O);Object.freeze(O);for(var i=0;i<K.length;i++){var V=O[K[i]];if(typeof V==="function"){Object.freeze(V);}else if(a(V)&&!Object.isFrozen(V)){d(V);}else if(Array.isArray(V)){d(V);}}}function b(O,i){if(!i){return O;}return i.split(".").reduce(function(C,S){return C&&C[S]?C[S]:null;},O);}function g(i){var T;if(typeof i==="object"){T="object";}else{T=i.replace("PropertyReference","string");}return D.getType(T);}function f(i){var w=g(i);if(w.isArrayType()){return w.getBaseType().getDefaultValue();}else{return w.getDefaultValue();}}function h(i,w){w.forEach(function(x){i.prepareProperty(x);});d(w);}function j(i,w,x,y,z,C){var T=y==null;var E=[];var I=P.isPropertyComplex(w);if(T){C=_.get(i).mAttributeMetadata;z=w;}if(!z){return[];}for(var F in C){var G=C[F];var H=T?F:y+"."+F;var V=z[F];if(I&&!G.allowedForComplexProperty){if("valueForComplexProperty"in G){z[F]=G.valueForComplexProperty;}continue;}if(V!=null&&typeof G.type==="string"&&G.type.startsWith("PropertyReference")||H==="propertyInfos"){if(I||H!=="propertyInfos"){k(z,F,x);}continue;}if(V==null){l(z,G,y,F,E);}if(typeof G.type==="object"){E=E.concat(j(i,w,x,H,z[F],G.type));}}return E;}function k(i,w,x){var y=i[w];var z;var C=w;if(Array.isArray(y)){z=y.map(function(N){return x[N];});C+="Properties";}else{z=x[y];C+="Property";}Object.defineProperty(i,C,{value:z});}function l(i,w,S,x,y){if("defaultValue"in w){if(typeof w.defaultValue==="string"&&w.defaultValue.startsWith("attribute:")){y.push({source:w.defaultValue.substring(w.defaultValue.indexOf(":")+1),targetPath:S,targetAttribute:x,targetType:w.type});}else if(typeof w.defaultValue==="object"&&w.defaultValue!==null){i[x]=m({},w.defaultValue);}else{i[x]=w.defaultValue;}}else{i[x]=f(w.type);}}function n(i){return Object.freeze(i.reduce(function(M,w){M[w.name]=w;return M;},{}));}function o(i,F){if(i.isComplex()){return i.getReferencedProperties().filter(F);}else if(F(i)){return[i];}else{return[];}}function q(w,E){var M=0;E=E||{};for(var i=0;i<w.length;i++){if("extension"in w[i]){t("Property contains invalid attribute 'extension'.",w[i]);}if(w[i].name in E){w[i].extension=E[w[i].name];M++;}else{w[i].extension={};}}if(M!==Object.keys(E).length){throw new Error("At least one property extension does not point to an existing property.");}}var P=B.extend("sap.ui.mdc.util.PropertyHelper",{constructor:function(i,E,w,x,y){B.call(this);if(!Array.isArray(i)){t("Property infos must be an array.");}if(E){if(!y){throw new Error("Property extensions are not supported.");}else if(!a(E)){throw new Error("Property extensions must be a plain object.");}}if(w&&!B.isA(w,"sap.ui.base.ManagedObject")){throw new Error("The type of the parent is invalid.");}if(this._mExperimentalAdditionalAttributes){Object.keys(A).concat("extension").forEach(function(G){if(G in this._mExperimentalAdditionalAttributes){throw new Error("The attribute '"+G+"' is reserved and cannot be overridden by additional attributes.");}}.bind(this));}var z={};var I=c.concat(x||[]).reduce(function(M,G){if(G in A){M[G]=A[G];}return M;},Object.assign({},this._mExperimentalAdditionalAttributes));if(y){z.mAttributeMetadata=Object.assign({extension:{type:y,mandatory:true,allowedForComplexProperty:true}},I);z.aMandatoryExtensionAttributes=Object.keys(y).filter(function(G){return y[G].mandatory;});}else{z.mAttributeMetadata=I;z.aMandatoryExtensionAttributes=[];}z.aMandatoryAttributes=Object.keys(z.mAttributeMetadata).filter(function(G){return z.mAttributeMetadata[G].mandatory;});var C=m([],i);var F=n(C);if(y){q(C,m({},E));}_.set(this,z);this.validateProperties(C);z.oParent=w||null;z.aProperties=C;z.mProperties=F;e(this,C);h(this,C);}});P.prototype.validateProperties=function(w){var U=new Set();for(var i=0;i<w.length;i++){this.validateProperty(w[i],w);U.add(w[i].name);}if(U.size!==w.length){t("Properties do not have unique names.");}};P.prototype.validateProperty=function(i,w){if(!a(i)){t("Property info must be a plain object.",i);}v(this,i,w);if(P.isPropertyComplex(i)){if(i.propertyInfos.length===0){t("Complex property does not reference existing properties.",i);}}_.get(this).aMandatoryAttributes.forEach(function(M){if(!(M in i)){r("Property does not contain mandatory attribute '"+M+"'.",i);}else if(i[M]==null){t("Property does not contain mandatory attribute '"+M+"'.",i);}});_.get(this).aMandatoryExtensionAttributes.forEach(function(M){if(!(M in i.extension)){r("Property does not contain mandatory attribute 'extension."+M+"'.",i);}else if(i.extension[M]==null){t("Property does not contain mandatory attribute 'extension."+M+"'.",i);}});};function v(i,w,x,y,z,C){var T=y==null;if(T){C=_.get(i).mAttributeMetadata;z=w;}for(var E in z){var F=C[E];var G=T?E:y+"."+E;var V=z[E];if(!F){r("Property contains invalid attribute '"+G+"'.",w);}else if(P.isPropertyComplex(w)&&!F.allowedForComplexProperty){r("Complex property contains invalid attribute '"+G+"'.",w);}else if(typeof F.type==="object"&&V&&typeof V==="object"){v(i,w,x,G,V,F.type);}else if(V!=null&&!g(F.type).isValid(V)){t("The value of '"+G+"' is invalid.",w);}else if(V&&typeof F.type==="string"&&F.type.startsWith("PropertyReference")){u(i,w,x,G,V,F);}}}function u(w,x,y,z,C,E){var F=E.type.endsWith("[]")?C:[C];var U=new Set(F);if(F.indexOf(x.name)>-1){t("Property references itself in the '"+z+"' attribute",x);}if(U.size!==F.length){t("Property contains duplicate names in the '"+z+"' attribute.",x);}for(var i=0;i<y.length;i++){if(U.has(y[i].name)){if(P.isPropertyComplex(y[i])){t("Property references complex properties in the '"+z+"' attribute.",x);}U.delete(y[i].name);}}if(U.size>0){t("Property references non-existing properties in the '"+z+"' attribute.",x);}}P.prototype.prepareProperty=function(i){var w=this.getPropertyMap();var x=j(this,i,w);x.forEach(function(y){var z=b(i,y.targetPath);if(z){var V=b(i,y.source);if(V==null){V=f(y.targetType);}z[y.targetAttribute]=V;if(typeof y.targetType==="string"&&y.targetType.startsWith("PropertyReference")){k(z,y.targetAttribute,w);}}});};P.prototype.getParent=function(){var i=_.get(this);return i?i.oParent:null;};P.prototype.getProperties=function(){var i=_.get(this);return i?i.aProperties:[];};P.prototype.getPropertyMap=function(){var i=_.get(this);return i?i.mProperties:{};};P.prototype.getProperty=function(N){return this.getPropertyMap()[N]||null;};P.prototype.hasProperty=function(N){return N in this.getPropertyMap();};P.isPropertyComplex=function(i){return i!=null&&typeof i==="object"?"propertyInfos"in i:false;};P.prototype.getSortableProperties=function(){return this.getProperties().filter(function(i){return i.sortable;});};P.prototype.getFilterableProperties=function(){return this.getProperties().filter(function(i){return i.filterable;});};P.prototype.getGroupableProperties=function(){return this.getProperties().filter(function(i){return i.groupable;});};P.prototype.getKeyProperties=function(){return this.getProperties().filter(function(i){return i.key;});};P.prototype.getVisibleProperties=function(){return this.getProperties().filter(function(i){return i.visible;});};P.prototype.destroy=function(){B.prototype.destroy.apply(this,arguments);_.delete(this);};return P;});
