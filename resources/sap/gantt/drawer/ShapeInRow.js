/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/gantt/drawer/Drawer","sap/gantt/misc/Utility","sap/gantt/misc/Format","sap/ui/thirdparty/d3"],function(D,U,F){"use strict";var S=D.extend("sap.gantt.drawer.ShapeInRow",{});S.prototype.drawSvg=function(s,o,a,A,b){this._oAxisTime=a;this._oAxisOrdinal=A;this._oStatusSet=b;var c=s.select("."+o.getId()+"-top");if(c.empty()){c=s.append("g").classed(o.getId()+"-top",true);}if(sap.ui.getCore().byId(o.getId()).getMetadata().getName()==="sap.gantt.shape.cal.Calendar"){c.classed("sapGanttChartCalendar",true);}var r=o.getId()+"-row";var R=c.selectAll("."+r).data(o.dataSet);R.enter().append("g").classed(r,true);R.attr("data-sap-gantt-row-id",function(d){return d.objectInfoRef.id;});R.exit().remove();if(!R.empty()){this._recursiveDraw(R,o);}};S.prototype.drawResizeShadow=function(s,o,a,A,b){this._oAxisTime=a;this._oAxisOrdinal=A;this._oStatusSet=b;if(o){var r=s.select(".resizingShadow");if(r.empty()){r=s.append("g").classed("resizingShadow",true);}var R=r.select("."+o.getId()+"-resize");if(R.empty()){R=r.append("g").classed(o.getId()+"-resize",true);}var c=R.data(o.dataSet);c.exit().remove();if(!c.empty()){this._recursiveDraw(c,o);}}};S.prototype._recursiveDraw=function(g,s,a){var t=this;var b=g.selectAll("."+s.getId()).data(function(d){return t._bindRowData(d,a,this,s);});this._drawPerTag(b,s);this._drawInsertTitle(g,s);};S.prototype._bindRowData=function(d,s,n,o){var v=this._oStatusSet&&this._oStatusSet.aViewBoundary?this._oStatusSet.aViewBoundary:undefined;var a=o.getIsBulk();var f,i;if(d){var r=[];if(d.shapeData){if(!(d.shapeData instanceof Array)){r=r.concat(d.shapeData);}else{for(i=0;i<d.shapeData.length;i++){if(d.shapeData[i]){f={};f.oShape=o;f.objectInfo=d.objectInfoRef;f.dShapeData=d.shapeData[i];f.aViewRange=v;if(!a&&(v!==undefined)&&this._filterDataVisibleRange(f)){continue;}r=r.concat(d.shapeData[i]);}}}}else if(s&&d[s]){if(d[s].length){for(i=0;i<d[s].length;i++){f={};f.oShape=o;f.objectInfo=d.objectInfoRef;f.dShapeData=d[s][i];f.aViewRange=v;if(!a&&(v!==undefined)&&this._filterDataVisibleRange(f)){continue;}r.push(d[s][i]);}}else{r.push(d[s]);}}else if(d){r=r.concat(d);}if(o.filterValidData&&(r.length>0)){r=o.filterValidData(r,d.objectInfoRef);}return r;}};S.prototype._filterDataVisibleRange=function(f){var a=this._oAxisTime;var A=this._oAxisOrdinal;var v=f.aViewRange;var i=f.oShape.getIsDuration(f.dShapeData);if(i){var s=a.timeToView(F.abapTimestampToDate(f.oShape.getTime(f.dShapeData,undefined,a,A,f.objectInfo)));var e=a.timeToView(F.abapTimestampToDate(f.oShape.getEndTime(f.dShapeData,undefined,a,A,f.objectInfo)));if(this._oStatusSet.bRTL===true){return(e>v[1])||(s<v[0]);}else{return(e<v[0])||(s>v[1]);}}else{var t=a.timeToView(F.abapTimestampToDate(f.oShape.getTime(f.dShapeData,undefined,a,A,f.objectInfo)));return(t>v[1])||(t<v[0]);}return false;};S.prototype._drawPerTag=function(s,o){switch(o.getTag()){case"g":this._drawGroup(s,o);break;case"line":this._drawLine(s,o);break;case"rect":this._drawRect(s,o);break;case"text":this._drawText(s,o);break;case"path":this._drawPath(s,o);break;case"clippath":this._drawClipPath(s,o);break;case"image":this._drawImage(s,o);break;case"polygon":this._drawPolygon(s,o);break;case"polyline":this._drawPolyline(s,o);break;case"circle":this._drawCircle(s,o);break;case"defs":this._drawDefinitions(s,o);break;default:break;}if(o.getParent()===null){this.addDataAttributes(s);}};S.prototype._drawGroup=function(s,o){var f=this._findObjectInfo;s.enter().append("g").classed(o.getId(),true);s.classed("hasTitle",function(d){return o.getTitle(d,f(this,o))?true:false;});s.exit().remove();var a=o.getShapes();if(a&&a.length>0){for(var i=0;i<a.length;i++){this._recursiveDraw(s,a[i],a[i].mShapeConfig.getShapeDataName());}}};S.prototype._drawLine=function(s,o){var f=this._findObjectInfo;var a={};s.enter().append("line").classed(o.getId(),true);s.classed("hasTitle",function(d){return o.getTitle(d,f(this,o))?true:false;}).attr("x1",function(d){return o.getX1(d,f(this,o));}).attr("y1",function(d){return o.getY1(d,f(this,o));}).attr("x2",function(d){return o.getX2(d,f(this,o));}).attr("y2",function(d){return o.getY2(d,f(this,o));}).attr("filter",function(d){return o.getFilter(d,f(this,o));}).attr("transform",function(d){return o.getTransform(d,f(this,o));}).attr("aria-label",function(d){a=o.getStyle(d,f(this,o));return o.getAriaLabel(d,f(this,o));}).style(a);s.exit().remove();};S.prototype._drawRect=function(s,o){var f=this._findObjectInfo;var a={};s.enter().append("rect").classed(o.getId(),true);s.classed(o.getHtmlClass(),function(d){return o.getHtmlClass(d,f(this,o))?true:false;}).classed("hasTitle",function(d){return o.getTitle(d,f(this,o))?true:false;}).classed("enableClone",function(d){return o.getEnableDnD(d,f(this,o))?true:false;}).attr("x",function(d){return o.getX(d,f(this,o));}).attr("y",function(d){return o.getY(d,f(this,o));}).attr("width",function(d){return o.getWidth(d,f(this,o));}).attr("height",function(d){return o.getHeight(d,f(this,o));}).attr("rx",function(d){return o.getRx(d,f(this,o));}).attr("ry",function(d){return o.getRy(d,f(this,o));}).attr("filter",function(d){return o.getFilter(d,f(this,o));}).attr("transform",function(d){return o.getTransform(d,f(this,o));}).attr("clip-path",function(d){return o.getClipPath(d,f(this,o));}).attr("aria-label",function(d){a=o.getStyle(d,f(this,o));return o.getAriaLabel(d,f(this,o));}).style(a);s.exit().remove();};S.prototype._drawText=function(s,o){var f=this._findObjectInfo;var a={};var t=this;s.enter().append("text").classed(o.getId(),true);s.classed("sapGanttShapeSvgText",true).classed("hasTitle",function(d){return o.getTitle(d,f(this,o))?true:false;}).attr("x",function(d){return o.getX(d,f(this,o));}).attr("y",function(d){return o.getY(d,f(this,o));}).attr("text-anchor",function(d){return o.getTextAnchor(d,f(this,o));}).attr("filter",function(d){return o.getFilter(d,f(this,o));}).attr("transform",function(d){a=o.getStyle(d,f(this,o));return o.getTransform(d,f(this,o));}).style(a).text(function(d){return o.getText(d,f(this,o));}).each(function(d){var b=d3.select(this);b.selectAll("tspan").remove();var O=f(this,o);var n=o.getWrapWidth(d,O);var c=o.getTruncateWidth(d,O);if(c>-1){t._textTruncate(d,b,c,o.getEllipsisWidth(d,O),o.getId());}else if(n>-1){t._textWrap(d,this,n,o.getWrapDy(d,O));}});s.exit().remove();};S.prototype._textTruncate=function(d,s,n,a,i){var b=s.node().getComputedTextLength();if(b>n){var t=s.text().trim(),c,e;if(a>-1&&a<n){e=true;c=n-a;}else{e=false;c=n;}var f=this._getTextTruncatCountByBinarySearch(s,b,c,t);t=t.slice(0,f).trim();s.text(t);if(e){if(sap.ui.Device.browser.name==="cr"){s.append("tspan").classed(i,true).text("...").attr("textLength",s.node().getComputedTextLength()).attr("lengthAdjust","spacingAndGlyphs");}else{var r=sap.ui.getCore().getConfiguration().getRTL();if(r&&(sap.ui.Device.browser.edge||sap.ui.Device.browser.safari)){s.text("..."+t).classed(i,true);}else{s.append("tspan").classed(i,true).text("...").attr("textLength",a).attr("lengthAdjust","spacingAndGlyphs");}}}}};S.prototype._getTextTruncatCountByBinarySearch=function(s,n,a,t){var b=0;if(a>0&&t.length>0){var c=Math.round(a/Math.ceil(n/t.length));var d,e,f;if(c<1){d=c;e=c+1;f=c+2;}else if(c==t.length){d=c-2;e=c-1;f=c;}else{d=c-1;e=c;f=c+1;}var g=s[0][0].getSubStringLength(0,e);var h=s[0][0].getSubStringLength(0,f);var i=s[0][0].getSubStringLength(0,d);if(g==a||(g<a&&h>a)){b=e;}else if(h==a){b=f;}else if(i==a||(i<a&&g>a)){b=d;}else{var j=1,k=t.length;if(h<a){j=f;}else if(i>a){k=d-1;}while(j<=k){e=Math.floor(j+(k-j)/2);g=s[0][0].getSubStringLength(0,e);h=s[0][0].getSubStringLength(0,e+1);if(g==a||(g<a&&h>a)){b=e;break;}else if(g>a){k=e-1;}else{j=e+1;}}}}return(b>=0&&b<=t.length)?b:0;};S.prototype._textWrap=function(d,s,n,a){};S.prototype._drawPath=function(s,o){var f=this._findObjectInfo;var a={};s.enter().append("path").classed(o.getId(),true);s.classed("hasTitle",function(d){return o.getTitle(d,f(this,o))?true:false;}).attr("d",function(d){return o.getD(d,f(this,o));}).attr("transform",function(d){return o.getTransform(d,f(this,o));}).attr("filter",function(d){return o.getFilter(d,f(this,o));}).attr("aria-label",function(d){a=o.getStyle(d,f(this,o));return o.getAriaLabel(d,f(this,o));}).style(a);s.exit().remove();};S.prototype._drawClipPath=function(s,o){var f=this._findObjectInfo;s.enter().append("defs").classed(o.getId(),true);s.selectAll("clipPath").remove();s.append("clipPath").attr("id",function(d){return o.getHtmlClass(d,f(this,o));}).append("path").attr("d",function(d){return o.getPaths()[0].getD(d,f(this,o));});s.exit().remove();};S.prototype._drawImage=function(s,o){var f=this._findObjectInfo;s.enter().append("image").classed(o.getId(),true);s.classed("hasTitle",function(d){return o.getTitle(d,f(this,o))?true:false;}).attr("xlink:href",function(d){return o.getImage(d,f(this,o));}).attr("x",function(d){return o.getX(d,f(this,o));}).attr("y",function(d){return o.getY(d,f(this,o));}).attr("width",function(d){return o.getWidth(d,f(this,o));}).attr("height",function(d){return o.getHeight(d,f(this,o));}).attr("filter",function(d){return o.getFilter(d,f(this,o));}).attr("transform",function(d){return o.getTransform(d,f(this,o));}).attr("aria-label",function(d){return o.getAriaLabel(d,f(this,o));});s.exit().remove();};S.prototype._drawPolygon=function(s,o){var f=this._findObjectInfo;var a={};s.enter().append("polygon").classed(o.getId(),true);s.classed("hasTitle",function(d){return o.getTitle(d,f(this,o))?true:false;}).attr("points",function(d){return o.getPoints(d,f(this,o));}).attr("filter",function(d){return o.getFilter(d,f(this,o));}).attr("transform",function(d){return o.getTransform(d,f(this,o));}).attr("aria-label",function(d){a=o.getStyle(d,f(this,o));return o.getAriaLabel(d,f(this,o));}).style(a);s.exit().remove();};S.prototype._drawPolyline=function(s,o){var f=this._findObjectInfo;var a={};s.enter().append("polyline").classed(o.getId(),true);s.classed("hasTitle",function(d){return o.getTitle(d,f(this,o))?true:false;}).attr("points",function(d){return o.getPoints(d,f(this,o));}).attr("filter",function(d){return o.getFilter(d,f(this,o));}).attr("transform",function(d){return o.getTransform(d,f(this,o));}).attr("aria-label",function(d){a=o.getStyle(d,f(this,o));return o.getAriaLabel(d,f(this,o));}).style(a);s.exit().remove();};S.prototype._drawCircle=function(s,o){var f=this._findObjectInfo;var a={};s.enter().append("circle").classed(o.getId(),true);s.classed("hasTitle",function(d){return o.getTitle(d,f(this,o))?true:false;}).attr("filter",function(d){return o.getFilter(d,f(this,o));}).attr("transform",function(d){return o.getTransform(d,f(this,o));}).attr("aria-label",function(d){return o.getAriaLabel(d,f(this,o));}).attr("cx",function(d){return o.getCx(d,f(this,o));}).attr("cy",function(d){return o.getCy(d,f(this,o));}).attr("r",function(d){a=o.getStyle(d,f(this,o));return o.getR(d,f(this,o));}).style(a);s.exit().remove();};S.prototype._drawDefinitions=function(s,o){var f=this._findObjectInfo;s.enter().append("defs").classed(o.getId(),true);s.each(function(d,i){jQuery(this).empty();var h=o.getContent(d,f(this));var x="<svg xmlns='"+d3.ns.prefix.svg+"'>"+h+"</svg>";this.appendChild(jQuery(x)[0].firstChild);});s.exit().remove();};S.prototype._drawInsertTitle=function(g,s){var f=this._findObjectInfo;var a=g.selectAll("."+s.getId()+".hasTitle");a.select("title").remove();a.insert("title",":first-child").each(function(d){var o=d3.select(this);o.selectAll("tspan").remove();o.text(s.getTitle(d,f(this,s)));});};S.prototype._findObjectInfo=function(n,s,i){var t=n;while(!t.__data__.objectInfoRef){t=t.parentNode;}return t.__data__.objectInfoRef;};S.prototype.addDataAttributes=function(s){s.attr("data-sap-gantt-shape-id",function(d){return d.__id__;});};S.prototype.destroySvg=function(s,o){};return S;},true);
