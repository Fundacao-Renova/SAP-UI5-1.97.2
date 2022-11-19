/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/core/Core","./BaseRectangle","./BasePath","sap/gantt/library"],function(C,B,a,l){"use strict";var S=l.simple.shapes.ShapeAlignment;var b=B.extend("sap.gantt.simple.BaseChevron",{metadata:{library:"sap.gantt",properties:{headWidth:{type:"sap.gantt.SVGLength",defaultValue:10},tailWidth:{type:"sap.gantt.SVGLength",defaultValue:10},title:{type:"string",group:"Appearance",defaultValue:null},showTitle:{type:"boolean",group:"Appearance",defaultValue:false}}}});b.prototype.getD=function(){var r=C.getConfiguration().getRTL();var c=this.getHeadWidth(),t=this.getTailWidth();var x=this.getX(),w=this.getWidth(),h=this.getHeight(),y=this.getRowYCenter(),R=1;var d=function(){var s="";for(var i=0;i<arguments.length;i++){s+=arguments[i]+" ";}return s;};if(this._iBaseRowHeight!=undefined){if(this.getAlignShape()==S.Top){y=this.getRowYCenter()-(this._iBaseRowHeight/2)+(h/2)+R;}else if(this.getAlignShape()==S.Bottom){y=this.getRowYCenter()+(this._iBaseRowHeight/2)-(h/2)-R;}y=parseInt(y,10);}if(!r){if(w-c<0){return d("M",x+w/2,y,"l",-w/2,-h/2,"h",w/2,"l",w/2,h/2,"l",-w/2,h/2,"h",-w/2)+"Z";}return d("M",x+t,y,"l",-t,-h/2,"h",w-c,"l",c,h/2,"l",-c,h/2,"h",c-w)+"Z";}else{if(w-c<0){return d("M",x,y,"l",w/2,-h/2,"h",w/2,"l",-w/2,h/2,"l",w/2,h/2,"h",-w/2)+"Z";}return d("M",x,y,"l",c,-h/2,"h",w-c,"l",-t,h/2,"l",t,h/2,"h",c-w)+"Z";}};b.prototype.renderElement=function(){if(this._isValid()){a.prototype.renderElement.apply(this,arguments);}};return b;},true);