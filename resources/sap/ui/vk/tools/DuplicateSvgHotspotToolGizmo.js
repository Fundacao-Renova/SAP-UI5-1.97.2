/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["./CreateParametricGizmo","../svg/Element","./ToolNodeSet"],function(G,E,T){"use strict";var D=G.extend("sap.ui.vk.tools.DuplicateSvgHotspotToolGizmo",{metadata:{library:"sap.ui.vk"}});D.prototype.hasDomElement=function(){return false;};var a=30;var b=30;D.prototype.show=function(v,t){this._viewport=v;this._tool=t;this._updateNodeList();};D.prototype.hide=function(){this._clearNodeList();this._viewport=null;this._tool=null;};D.prototype._clearNodeList=function(){if(this._nodes&&this._nodes.length>0){this._nodes.forEach(function(n){var c=n.node;c.parent.remove(c);});}this._nodes=[];};D.prototype._updateNodeList=function(){this._clearNodeList();this._origin=null;var n=this._tool.getNodeList();if(Array.isArray(n)&&n.length>0){this.updateParentNode();this._parentMatrixWorldInv=E._invertMatrix(this._root._matrixWorld());var c=n[0]._getBBox(n[0]._matrixWorld());this._origin=c?{x:c.x+c.width*0.5,y:c.y+c.height*0.5}:{x:0,y:0};var r=this._viewport._camera._transformRect({x1:0,y1:0,x2:a,y2:b});this._createNodes({x:this._origin.x+r.x2-r.x1,y:this._origin.y+r.x2-r.x1});}};D.prototype._createNodes=function(p){var m=[1,0,0,1,p.x-this._origin.x,p.y-this._origin.y];this._nodes=[];this._tool.getNodeList().forEach(function(n){var c=n.clone();c.userData.duplicatedFrom=n.sid;var d=n._matrixWorld();c.matrix.set(E._multiplyMatrices(this._parentMatrixWorldInv,E._multiplyMatrices(m,d)));this._root.add(c);this._nodes.push({node:c,matrixWorld:n._matrixWorld()});}.bind(this));};D.prototype._move=function(p){if(this._nodes&&this._nodes.length>0){var m=[1,0,0,1,p.x-this._origin.x,p.y-this._origin.y];var c=this._parentMatrixWorldInv;this._nodes.forEach(function(n){var d=E._multiplyMatrices(c,E._multiplyMatrices(m,n.matrixWorld));n.node.setMatrix(d);});}};D.prototype._complete=function(p){this._move(p);if(this._nodes&&this._nodes.length>0){var n=this._nodes.map(function(c){return c.node;});this._tool.fireNodesCreated({x:p.x-this._origin.x,y:p.y-this._origin.y,nodes:n,request:this._createRequest(n)});this._createNodes(p);}};return D;});