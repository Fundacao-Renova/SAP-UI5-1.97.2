/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["../NodeProxy","../cssColorToColor","../colorToCSSColor","../abgrToColor","../colorToABGR","../TransformationMatrix","./Element"],function(N,c,a,b,d,T,E){"use strict";var e=N.extend("sap.ui.vk.svg.NodeProxy",{metadata:{},constructor:function(n,s){N.call(this);this._element=s;this._nodeHierarchy=n;}});e.prototype.destroy=function(){this._element=null;N.prototype.destroy.call(this);};e.prototype.getNodeHierarchy=function(){return this._nodeHierarchy;};e.prototype.getNodeRef=function(){return this._element;};e.prototype.getNodeId=function(){return this._element;};e.prototype.getVeIds=function(){return this._element.userData.veids||[];};e.prototype.getVeId=function(){return this._element.sid;};e.prototype.getName=function(){return this._element.name||("<"+this._element.type+">");};e.prototype.getLocalMatrix=function(){return T.convert3x2To4x3(this._element.matrix);};e.prototype.setLocalMatrix=function(m){if(m){this._element.matrix=T.convert4x3To3x2(m);}this.setProperty("localMatrix",m,true);return this;};e.prototype.getWorldMatrix=function(){return T.convert3x2To4x3(this._element._matrixWorld());};e.prototype.setWorldMatrix=function(m){if(m){var f=T.convert4x3To3x2(m);var g=this._element;if(g.parent){g.matrix=E._multiplyMatrices(E._invertMatrix(g.parent._matrixWorld()),f);}else{g.matrix=f;}}this.setProperty("worldMatrix",m,true);return this;};e.prototype.getOpacity=function(){return this._element.opacity;};e.prototype.setOpacity=function(v){this.setProperty("opacity",v,true);return this;};e.prototype.getTintColorABGR=function(){return this._element.tintColor;};e.prototype.setTintColorABGR=function(v){this.setProperty("tintColorABGR",v,true);this.setProperty("tintColor",a(b(v)),true);return this;};e.prototype.getTintColor=function(){return a(b(this._element.tintColor));};e.prototype.setTintColor=function(v){var f=d(c(v));this.setProperty("tintColorABGR",f,true);this.setProperty("tintColor",v,true);return this;};e.prototype.getNodeMetadata=function(){return this._element.userData.metadata||{};};e.prototype.getHasChildren=function(){return this._element.children.length>0;};e.prototype.getClosed=function(){return!!this._element.closed;};return e;});