/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["./CreateParametricGizmo","../svg/Element","../svg/Ellipse"],function(G,E,a){"use strict";var C=G.extend("sap.ui.vk.tools.CreateEllipseToolGizmo",{metadata:{library:"sap.ui.vk"}});C.prototype.hasDomElement=function(){return false;};C.prototype.show=function(v,t){this._viewport=v;this._tool=t;this.updateParentNode();};C.prototype.hide=function(){this._viewport=null;this._tool=null;this._root=null;};C.prototype._calculateNodeMatrix=function(d,b,p,c){var m=E._multiplyMatrices(this._invParentMatrix,[d,b,-b,d,p,c]);if(m[3]<0){m[2]*=-1;m[3]*=-1;}return m;};C.prototype._startAdding=function(p){this._invParentMatrix=E._invertMatrix(this._root._matrixWorld());this._startPos=p;var m=this._viewport._camera._transformRect({x1:0,y1:0,x2:1,y2:1});this._minRadius=Math.max(m.x2-m.x1,m.y2-m.y1)*0.5;this._activeElement=new a({subelement:true,major:this._minRadius,minor:this._minRadius,material:this._tool._material,lineStyle:this._tool._lineStyle,fillStyle:this._tool._fillStyle});var n=new E({name:"Ellipse",matrix:this._calculateNodeMatrix(1,0,p.x,p.y)});n.add(this._activeElement);this._root.add(n);};C.prototype._update=function(p,i){var b=this._startPos;var c=this._activeElement;if(c){var d=p.x-b.x;var e=p.y-b.y;var l=Math.sqrt(d*d+e*e);var f=this._tool.getUniformMode()^i;if(l===0||f){d=1;e=0;}else{d/=l;e/=l;}var r=Math.max(l*0.5,this._minRadius);var g=f?r:r*0.5;c.rx=Math.max(r,this._minRadius);c.ry=Math.max(g,this._minRadius);c.parent.setMatrix(this._calculateNodeMatrix(d,e,(p.x+b.x)*0.5,(p.y+b.y)*0.5));c.invalidate();}};C.prototype._stopAdding=function(){var b=this._activeElement;this._activeElement=null;this._tool.fireCompleted({node:b.parent,request:this._createRequest(b.parent)});};return C;});
