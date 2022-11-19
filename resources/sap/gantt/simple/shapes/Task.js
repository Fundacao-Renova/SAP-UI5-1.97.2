/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["./Shape","sap/gantt/library","sap/gantt/simple/InnerGanttChartRenderer","sap/gantt/simple/RenderUtils"],function(S,l,I,R){"use strict";var T=l.simple.shapes.TaskType;var a=l.simple.shapes.ShapeAlignment;var C=10;function g(s){var o=Object.assign({},s);o.iStartX-=1;o.iEndX+=1;o.iHeight+=2;return o;}var b=S.extend("sap.gantt.simple.shapes.Task",{metadata:{library:"sap.gantt",properties:{type:{type:"sap.gantt.simple.shapes.TaskType",defaultValue:T.Normal},utilizationDown:{type:"boolean",defaultValue:true},title:{type:"string",defaultValue:null},alignShape:{type:"sap.gantt.simple.shapes.ShapeAlignment",defaultValue:a.Middle}}},renderer:{apiVersion:2}});b.prototype._generateRectD=function(s){var d="";d+="M "+s.iStartX+" "+s.iAlignShapeX;var u=s.iHeight/2,L=s.iEndX-s.iStartX,r=this.generateArcRadius(u,L);d+=" l 0 "+(-u+r);d+=" a "+r+" "+r+" 0 0 1 "+r+" "+(-r);L-=r;var i=this.generateArcRadius(L-r,u);L-=i;d+=" l "+L+" 0";d+=" a "+i+" "+i+" 0 0 1 "+i+" "+i;d+=" l 0 "+(2*u-i-r);d+=" a "+i+" "+i+" 0 0 1 "+(-i)+" "+i;d+=" l "+(-L)+" 0";d+=" a "+r+" "+r+" 0 0 1 "+(-r)+" "+(-r);d+=" Z";return d;};b.prototype._renderOverlappingRectangle=function(r,s){var d=this._generateRectD(g(s));r.openStart("path");r.class("sapGanttShapeOverlappingBorder");r.attr("d",d);r.openEnd().close("path");};b.prototype.renderNoramlTask=function(r,s){this._renderOverlappingRectangle(r,s);var d=this._generateRectD(s);r.openStart("path");r.attr("d",d);if(this.getHoverState()){r.attr("fill",this.getHoverBackgroundColor());r.attr("stroke-width",1);r.attr("stroke",this.getHoverColor());}else if(this.getSelected()){r.attr("fill",this.getSelectedColor());}else{r.attr("fill",this.getTranslatedColor());}r.openEnd();R.renderTooltip(r,this);if(this.getShowAnimation()){R.renderElementAnimation(r,this);}r.close("path");};b.prototype._generateSummaryD=function(s,f){var d="",L=f?7:5;d+="M "+s.iStartX+" "+s.iAlignShapeX;var u=s.iHeight/2,i=s.iEndX-s.iStartX,r=this.generateArcRadius(u,i);d+=" l 0 "+(-u+r);d+=" a "+r+" "+r+" 0 0 1 "+r+" "+(-r);i-=r;var c=this.generateArcRadius(i-r,u);i-=c;d+=" l "+i+" 0";d+=" a "+c+" "+c+" 0 0 1 "+c+" "+c;d+=" l 0 "+(2*u-c-3);d+=" a 3 5 0 0 1 -"+L+" 0";d+=" l 0 "+(-2*u+c+L);d+=" l "+(-i+2*L-r-c)+" 0";d+=" l 0 "+(2*u-r-L);d+=" a 3 5 0 0 1 -"+L+" 0";d+=" Z";return d;};b.prototype.renderSummaryTaskExpanded=function(r,s){if(Math.abs(s.iEndX-s.iStartX)<=C){this.renderNoramlTask(r,s);}else{var d;if(!s.bFromCollapsed){d=this._generateSummaryD(g(s),true);r.openStart("path");r.class("sapGanttShapeOverlappingBorder");r.attr("d",d);r.openEnd().close("path");}d=this._generateSummaryD(s);r.openStart("path");r.attr("d",d);if(this.getHoverState()){r.attr("fill",this.getHoverBackgroundColor());r.attr("stroke-width",1);r.attr("stroke",this.getHoverColor());}else if(this.getSelected()){r.attr("fill",this.getSelectedColor());if(s.bFromCollapsed){r.attr("stroke-width",1.0001);r.attr("stroke","white");r.attr("shape-rendering","crispEdges");}}else{r.attr("fill",this.getTranslatedColor());}r.openEnd();R.renderTooltip(r,this);if(this.getShowAnimation()){R.renderElementAnimation(r,this);}r.close("path");}};b.prototype.renderSummaryTaskCollapsed=function(r,s){if(Math.abs(s.iEndX-s.iStartX)<=C){this.renderNoramlTask(r,s);}else{this._renderOverlappingRectangle(r,s);var d=this._generateRectD(s);r.openStart("path");r.attr("d",d);if(this.getHoverState()){r.attr("fill",this.getHoverBackgroundColor());r.attr("stroke-width",1);r.attr("stroke",this.getHoverColor());}else if(this.getSelected()){r.attr("fill",this.getSelectedColor());}else{r.attr("fill",this.getTranslatedColor());r.attr("fill-opacity",0.7);}r.openEnd();R.renderTooltip(r,this);if(this.getShowAnimation()){R.renderElementAnimation(r,this);}r.close("path");this.renderSummaryTaskExpanded(r,Object.assign({},s,{bFromCollapsed:true}));}};b.prototype.renderErrorTask=function(r,s){this._renderOverlappingRectangle(r,s);var m=this.getId()+"-mask",d=this._generateRectD(s),c,f,p;if(this.getGanttChartBase()){p=this.getGanttChartBase().getId()+"-helperDef-linePattern";}else{I.renderHelperDefs(r,this.getId());p=this.getId()+"-helperDef-linePattern";}if(this.getHoverState()){c=this.getHoverColor();f=this.getHoverBackgroundColor();}else if(this.getSelected()){c=f=this.getSelectedColor();}else{c=f=this.getTranslatedColor();}r.openStart("mask",m);r.openEnd();r.openStart("path");r.attr("d",d);r.attr("stroke","white");r.attr("stroke-width",1);r.attr("fill","url(#"+p+")");r.openEnd().close("path");r.close("mask");r.openStart("path");r.attr("d",d);r.attr("stroke",c);r.attr("stroke-width",1);r.attr("fill",f);r.attr("mask","url(#"+m+")");r.openEnd();R.renderTooltip(r,this);if(this.getShowAnimation()){R.renderElementAnimation(r,this);}r.close("path");};b.prototype.renderContent=function(r){var s={iHeight:this.getPixelHeight()-this.getRowPadding(),iStartX:this.getXStart(),iEndX:this.getXEnd(),iAlignShapeX:this.getRowYCenter()};switch(this.getType()){case T.Normal:this.renderNoramlTask(r,s);break;case T.Error:this.renderErrorTask(r,s);break;case T.SummaryCollapsed:this._generateAlignShapeX(s);this.renderSummaryTaskCollapsed(r,s);break;case T.SummaryExpanded:this._generateAlignShapeX(s);this.renderSummaryTaskExpanded(r,s);break;default:throw new Error("Unknown type of Task: "+this.getType());}};b.prototype.renderElement=function(r){this.writeElementData(r,"g",true);r.attr("pointer-events","bounding-box");r.openEnd();this.renderContent(r);r.close("g");};b.prototype._generateAlignShapeX=function(s){if(this._iBaseRowHeight!=undefined){if(this.getAlignShape()==a.Top){s.iAlignShapeX=this.getRowYCenter()-(this._iBaseRowHeight/2)+(s.iHeight/2);}else if(this.getAlignShape()==a.Bottom){s.iAlignShapeX=this.getRowYCenter()+(this._iBaseRowHeight/2)-(s.iHeight/2);}}};return b;});