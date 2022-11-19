/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/gantt/misc/Utility","./RenderUtils","sap/gantt/simple/LegendShapeGroupOrientation","sap/ui/core/IconPool"],function(U,R,L,I){"use strict";var a={apiVersion:2};var d=function(){var D=32;var s=U.findSapUiSizeClass();return U.scaleBySapUiSize(s,D);};a.render=function(r,l){r.openStart("div",l).openEnd();if(l.getParent().isA("sap.gantt.simple.LegendContainer")&&l.getParent().getEnableFlatLegends()&&!l.getParent()._isSingleVisibleList()){this.renderSubHeader(r,l);}var b=l.getItems();var h=b.some(function(o){return o.getInteractive();});for(var i=0;i<b.length;i++){if(b[i].getVisible()){this.renderLegendItem(r,b[i],h);}}r.close("div");};a.renderSubHeader=function(r,l){r.openStart("div",l.getId());r.class("sapGanttLLItemSectionTitle");r.class("sapUiSmallMarginBegin");r.class("sapUiSmallMarginTop");r.openEnd();r.text(l.getTitle());r.close("div");r.write("<hr>");};a.renderLegendItem=function(r,i,h){var b=i.getAggregation('legendShapeGroup');var c=i.getAggregation('shape');if(b){this.renderShapeGroup(r,i,h);}else if(c){this.renderShape(r,i,h);}};a.renderShape=function(r,i,h){var s=i.getShape();var l=d(),b=l+"px";var H=l/2,w=H;var y=s.getYBias();if(s.isA("sap.gantt.simple.BaseConditionalShape")){var c=s.getAggregation('shapes')[s.getActiveShape()];var Y=c.getYBias()?c.getYBias():y;this.normalizeShape(c,w,H,Y);}else{this.normalizeShape(s,w,H,y);}r.openStart("div",i);r.attr("title",s.getTitle());r.class("sapGanttLLItem");r.style("height",b);r.style("line-height",b);var m="margin-"+(sap.ui.getCore().getConfiguration().getRTL()?"right":"left");if(h&&!i.getInteractive()){r.style(m,b);}else if(!i.getInteractive()){r.style(m,(w/2)+"px");}r.openEnd();r.renderControl(i.getAggregation("_checkbox"));this.renderSvgPart(r,[s],w);this.renderLegendText(r,s.getTitle());r.close("div");};a.renderShapeGroup=function(r,i,h){var l=i.getAggregation('legendShapeGroup');var s=l.getAggregation('shapes');var o=l.getOrientation();var y=l.getYBias();var t=l.getTitle();var b=d(),c=b+"px";var H=b/2,w=H;r.openStart("div",i);r.attr("title",t);r.class("sapGanttLLItem");r.style("height",c).style("line-height",c);var m="margin-"+(sap.ui.getCore().getConfiguration().getRTL()?"right":"left");if(h&&!i.getInteractive()){r.style(m,c);}else if(!i.getInteractive()){r.style(m,(w/2)+"px");}r.openEnd();r.renderControl(i.getAggregation("_checkbox"));s.forEach(function(S,e){var Y=S.getYBias()?S.getYBias():y;this.normalizeShapeGroup(s,S,o,w,H,e,Y);}.bind(this));this.renderSvgPart(r,s,w);this.renderLegendText(r,t,true,c);r.close("div");};a.normalizeShapeGroup=function(b,s,o,w,l,i,y){if(s.isA("sap.gantt.simple.BaseConditionalShape")){var c=s.getAggregation('shapes')[s.getActiveShape()];if(c.isA('sap.gantt.simple.LegendShapeGroup')){this.normalizeLegendShapeGroup(c,w,l,y);}else{this.normalizeShape(c,w,l,y);}return;}if(s.isA('sap.gantt.simple.LegendShapeGroup')){this.normalizeLegendShapeGroup(s,w,l,y);return;}var h=l/2;var S=s.getStrokeWidth()||0;var Y=0;var x=0;var X=0;var e=0;var f=y?y:h;if(o===L.Vertical){if(i>0){if(b[i-1].isA('sap.gantt.simple.BaseLine')){Y=parseFloat(b[i-1].getStrokeWidth())+Math.max(parseFloat(b[i-1].getY1()),parseFloat(b[i-1].getY2()));}else if(b[i-1].isA('sap.gantt.simple.BaseCursor')){Y=b[i-1].getLength()+(b[i-1].getRowYCenter()-(w/4));}else if(b[i-1].isA('sap.gantt.simple.BaseImage')){Y=parseFloat(b[i-1].getY());}else if(b[i-1].isA("sap.gantt.simple.BasePath")){Y=0;}else{Y=parseFloat(b[i-1].getHeight())+parseFloat(b[i-1].getY());}}}else if(o===L.Horizontal){if(i>0){if(b[i-1].isA('sap.gantt.simple.BaseLine')){x=parseFloat(b[i-1].getStrokeWidth())+Math.max(parseFloat(b[i-1].getX1()),parseFloat(b[i-1].getX2()));}else if(b[i-1].isA('sap.gantt.simple.BaseDiamond')){x=parseFloat(b[i-1].getWidth())+parseFloat(b[i-1].getX());x-=b[i-1].getWidth()/2;}else if(b[i-1].isA("sap.gantt.simple.BaseCursor")){x=parseFloat(b[i-1].getWidth())+parseFloat(b[i-1].getX());x-=b[i-1].getLength();}else if(b[i-1].isA("sap.gantt.simple.BasePath")){x=0;}else{x=parseFloat(b[i-1].getWidth())+parseFloat(b[i-1].getX());}}if(s.isA('sap.gantt.simple.BaseCursor')){x+=(s.getLength()/2);}}if(s.isA('sap.gantt.simple.BaseLine')){x=s.getX1();X=s.getX2();Y=s.getY1();e=s.getY2();}var v={x:x,y:Y,x1:x,y1:Y,x2:X,y2:e,yBias:f,rowYCenter:parseFloat(Y)};if(s.getWidth){if(!s.getWidth()){v.width=w-2*S;}else{v.width=s.getWidth();}}if(s.getHeight){if(!s.getHeight()){v.height=l-2*S;}else{v.height=s.getHeight();}}if(s.isA("sap.gantt.simple.BaseCursor")){if(o===L.Horizontal){v.rowYCenter=parseFloat((s.getWidth()+s.getPointHeight())/2);}else if(o===L.Vertical){v.x=w/2;v.rowYCenter=Y+(w/4);}}else if(s.isA("sap.gantt.simple.BaseDiamond")){v.x+=(v.width)/2;if(o===L.Vertical){v.rowYCenter=Y+(w/4);}else if(o===L.Horizontal){v.rowYCenter=parseFloat(v.height/2);}}else if(s.isA('sap.gantt.simple.BaseChevron')){v.rowYCenter=Y+parseFloat(v.height/2);}else if(s.isA('sap.gantt.simple.BaseImage')){if(o===L.Vertical){v.y=Y+parseFloat(v.height);}else if(o===L.Horizontal){v.y=Y+parseFloat(v.height/2);}}Object.keys(v).forEach(function(p){var P=p.split("-").reduce(function(g,n){return g+n.charAt(0).toUpperCase()+n.slice(1);},"set");if(s[P]){s[P](v[p]);}});};a.normalizeLegendShapeGroup=function(l,w,b,y){var s=l.getAggregation('shapes');var S=l.getOrientation();s.forEach(function(o,i){var Y=o.getYBias()?o.getYBias():y;this.normalizeShapeGroup(s,o,S,w,b,i,Y);}.bind(this));};a.normalizeShape=function(s,w,h,y){var H=h/2;var Y=y?y:H;var S=s.getStrokeWidth()||0;var v={x:S,y:S,x1:S,y1:H+S,x2:w,y2:H,yBias:Y,rowYCenter:H};if(s.getWidth){if(!s.getWidth()){v.width=w-2*S;}else{v.width=s.getWidth();}}if(s.getHeight){if(!s.getHeight()){v.height=h-2*S;}else{v.height=s.getHeight();}}if(s.isA("sap.gantt.simple.BaseCursor")||s.isA("sap.gantt.simple.BaseDiamond")){v.x+=w/2;}if(s.isA("sap.gantt.simple.BaseTriangle")){v.rowYCenter=0;}if(s.isA("sap.gantt.simple.shapes.Shape")){s.setWidth(w);s.setHeight(h);s.setStartX(0);s.setRowYCenter(h);}else{Object.keys(v).forEach(function(p){var P=p.split("-").reduce(function(b,n){return b+n.charAt(0).toUpperCase()+n.slice(1);},"set");if(s[P]){s[P](v[p]);}});}};a.renderSvgPart=function(r,s,w){r.openStart("svg");r.attr("tabindex",0);r.attr("focusable",false);r.class("sapGanttLLSvg");r.style("width",w+"px");r.openEnd();s.forEach(function(S){this.renderShapeGroupRecursively(r,S);}.bind(this));r.close("svg");};a.renderShapeGroupRecursively=function(r,s){if(s.isA('sap.gantt.simple.LegendShapeGroup')){this.renderLegendShapeGroup(s,r);}else if(s.isA("sap.gantt.simple.BaseConditionalShape")){var b=s.getAggregation('shapes')[s.getActiveShape()];if(b.isA('sap.gantt.simple.LegendShapeGroup')){this.renderLegendShapeGroup(b,r);}}r.openStart("g").openEnd();if(s.isA('sap.gantt.simple.BaseImage')){this.renderImage(r,s);}else{s.renderElement(r,s);}r.close("g");};a.renderLegendShapeGroup=function(s,r){var S=s.getAggregation('shapes');S.forEach(function(o){this.renderShapeGroupRecursively(r,o);}.bind(this));return;};a.renderLegendText=function(r,t,i,l){r.openStart("div");r.class("sapGanttLLItemTxt");if(i){r.style("line-height",l);}r.openEnd();if(t){r.text(t);}r.close("div");};a.renderImage=function(r,e){if(I.isIconURI(e.getSrc())){var A=["x","y","text-anchor","style","filter","transform"];r.openStart("text",e);R.renderAttributes(r,e,A);r.openEnd();var i=I.getIconInfo(e.getSrc());if(i){r.text(i.content);}r.close('text');}else{var m=["x","y","width","height"];r.openStart("image",e);R.renderAttributes(r,e,m);r.attr("href",e.getProperty("src"));r.openEnd();R.renderTooltip(r,e);r.close("image");}};return a;},true);