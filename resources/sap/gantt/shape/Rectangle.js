/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/base/Log","sap/gantt/shape/Shape","sap/gantt/misc/Format","sap/ui/core/Core"],function(L,S,F,C){"use strict";var R=S.extend("sap.gantt.shape.Rectangle",{metadata:{properties:{tag:{type:"string",defaultValue:"rect"},isDuration:{type:"boolean",defaultValue:true},x:{type:"float"},y:{type:"float"},width:{type:"float"},height:{type:"float",defaultValue:15},rx:{type:"string",defaultValue:"0"},ry:{type:"string",defaultValue:"0"}}}});R.prototype.init=function(){S.prototype.init.apply(this,arguments);var r=sap.ui.getCore().getLibraryResourceBundle("sap.gantt");this.setProperty("ariaLabel",r.getText("ARIA_RECTANGLE"));};R.prototype.getX=function(d,r){if(this.mShapeConfig.hasShapeProperty("x")){return this._configFirst("x",d);}var n;var a=this.getAxisTime();if(C.getConfiguration().getRTL()){n=a.timeToView(F.abapTimestampToDate(this.getEndTime(d,r)));}else{n=a.timeToView(F.abapTimestampToDate(this.getTime(d,r)));}if(!jQuery.isNumeric(n)){L.warning("Cannot get start time or end time from shape data: "+d+", please check whether the attribute name");return 0;}return n;};R.prototype.getY=function(d,r){if(this.mShapeConfig.hasShapeProperty("y")){return this._configFirst("y",d,true);}return this.getRowYCenter(d,r)-this.getHeight(d,r)/2;};R.prototype.getWidth=function(d,r){if(this.mShapeConfig.hasShapeProperty("width")){return this._configFirst("width",d);}var a=this.getAxisTime();var n,s=a.timeToView(F.abapTimestampToDate(this.getTime(d,r))),e=a.timeToView(F.abapTimestampToDate(this.getEndTime(d,r)));if(!jQuery.isNumeric(s)||!jQuery.isNumeric(e)){return 0;}if(C.getConfiguration().getRTL()){n=s-e;}else{n=e-s;}if(n===0||n<0){n=1;}return n;};R.prototype.getHeight=function(d){return this._configFirst("height",d,true);};R.prototype.getRx=function(d){return this._configFirst("rx",d);};R.prototype.getRy=function(d){return this._configFirst("ry",d);};R.prototype.getStyle=function(d,r){var i=S.prototype.getStyle.apply(this,arguments);var s={"fill":this.determineValueColor(this.getFill(d,r)),"stroke-dasharray":this.getStrokeDasharray(d,r),"fill-opacity":this.getFillOpacity(d,r),"stroke-opacity":this.getStrokeOpacity(d,r)};var a=Object.assign(i,s);return a;};return R;},true);
