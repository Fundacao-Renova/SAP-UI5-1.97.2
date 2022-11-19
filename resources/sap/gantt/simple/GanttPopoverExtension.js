/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/events/KeyCodes","sap/ui/core/Core","./GanttExtension","./GanttUtils","./CoordinateUtils"],function(q,K,C,G,a,b){"use strict";var _=".sapGanttPopover";var m="mousedown";var M=m+_;var e=["mousemove","mouseup","keydown"];var B=e.reduce(function(d,n){d[n]=n;return d;},{});var E=e.map(function(s){return s+_;});var P={dispatchEvent:function(o){var d=this._getPopoverExtension();if(o.type===B.mousemove){d.onMouseMove(o);}else if(o.type===B.mouseup){d.onMouseUp(o);}else if(o.type===B.keydown){d.onKeydown(o);}},entry:function(o){var d=this._getPopoverExtension();d.onMouseDown(o);},addEventListeners:function(g){this.removeEventListeners(g);var s=q(g._getPopoverExtension().getDomRefs().ganttSvg);s.on(M,P.entry.bind(g));},removeEventListeners:function(g){var s=q(g._getPopoverExtension().getDomRefs().ganttSvg);s.off(M);},addPopoverEventListeners:function(g){this.removePopoverEventListeners(g);E.forEach(function(s){q(document).on(s,P.dispatchEvent.bind(g));});},removePopoverEventListeners:function(g){q(document).off(_);}};var c=G.extend("sap.gantt.simple.GanttPopoverExtension",{_init:function(g,s){this._initPopoverStates();return"PopoverExtension";},_attachEvents:function(){var g=this.getGantt();P.addEventListeners(g);},_detachEvents:function(){var g=this.getGantt();P.removeEventListeners(g);}});c.prototype._initPopoverStates=function(){this._iOffsetX=10;this._iOffsetY=32;this._bNeedReverse=false;};c.prototype.onMouseMove=function(o){var d=this.getGantt()._getDragDropExtension();if(this.getGantt().getShowShapeTimeOnDrag()&&this.isDraggingOrResizing(o)){this._showPopover(o,true);}else if(d.isDragging()&&this.bMultipleShapes){this._showPopover(o);}};c.prototype.onMouseDown=function(o){var s=this.getGantt().getSelection();var S=s.numberOfSelectedDraggableShapes();this.bMultipleShapes=S>1;this.pageWidth=window.innerWidth;this.pageHeight=window.innerHeight;P.addPopoverEventListeners(this.getGantt());};c.prototype.onMouseUp=function(o){P.removePopoverEventListeners(this.getGantt());this._hidePopover(o);this._initPopoverStates();};c.prototype.onKeydown=function(o){if(o.keyCode===K.ESCAPE){P.removePopoverEventListeners(this.getGantt());this._hidePopover(o);this._initPopoverStates();}};c.prototype.isDraggingOrResizing=function(o){var d=this.getGantt()._getDragDropExtension();var r=this.getGantt()._getResizeExtension();return(d.isDragging()&&!this.bMultipleShapes)||r.isResizing();};c.prototype._buildPopover=function(o,t){var s=C.getLibraryResourceBundle("sap.gantt").getText("GNT_CURRENT_START");var d=C.getLibraryResourceBundle("sap.gantt").getText("GNT_CURRENT_END");var D=this.getGantt()._getDragDropExtension();var n=D.getNumberOfDragObject();var f=function(l,h){var i="<span class='sapUiTinyMarginEnd sapMLabel'>"+l+"</span>"+"<span class='sapMLabel "+h+"'></span>";return"<div class='sapUiTinyMargin'>"+i+"</div>";};var g=function(l,h){var i="<span class='sapMLabel "+h+"'>"+l+"</span>";return"<div class='sapUiTinyMargin sapGanttPopoverCountText'>"+i+"</div>";};if(t){this.oTimePopover=q("<div id='sapGanttPopoverWrapper' class='sapGanttDragElementHidden'>"+f(s,"sapGanttPopoverStartTime")+f(d,"sapGanttPopoverEndTime")+"</div>");}else{this.oCountPopover=q("<div id='sapGanttPopoverWrapper' class='sapGanttDragElementHidden'>"+g(n,"sapGanttPopoverObjectCount")+"</div>");}this.createAnchor();this._calcPopoverOffset();var A=q(document.getElementById("sapGanttPopoverAnchor"));if(t){A.append(this.oTimePopover);}else{A.append(this.oCountPopover);}var p=this._getPopoverData(o,t);this._updateTime(p,t);};c.prototype._updateTime=function(p,t){var r=C.getConfiguration().getRTL();var s=r?"marginRight":"marginLeft";var S={marginTop:p.offsetY+"px"};S[s]=p.offsetX+"px";var w=q(document.getElementById("sapGanttPopoverWrapper")).css(S);if(t){w.find(".sapGanttPopoverStartTime").text(p.startNewDate);w.find(".sapGanttPopoverEndTime").text(p.endNewDate);}};c.prototype._getDragDropOrResizingDom=function(){var d=this.getGantt()._getDragDropExtension();var r=this.getGantt()._getResizeExtension();if(d.isDragging()){return d.dragGhost.get(0).children[0];}else if(r.isResizing()){var s=a.getShapesWithUid(this.getGantt().getId(),[r.origin.resizeFor]);if(s.length===1&&s[0]){return document.getElementById(s[0].getShapeUid()+"-selected");}}};c.prototype.createAnchor=function(o){var A=q(document.getElementById("sapGanttPopoverAnchor"));if(A.length===0){A=q("<div id='sapGanttPopoverAnchor'></div>");q(document.body).append(A);}this._oTargetDom=A.get(0);};c.prototype.moveAnchor=function(o,t){var p=b.getEventPosition(o),i=p.pageX,d=p.pageY,s=this.pageWidth,S=this.pageHeight;if(i<-this._iOffsetX){i=-this._iOffsetX;}else if(i>s+this._iOffsetX){i=s+this._iOffsetX;}var f=this._iOffsetY;if(t&&this.oTimePopover){f+=this.oTimePopover.height();}else if(!t&&this.oCountPopover){f+=this.oCountPopover.height();}if(d<-this._iOffsetY){d=-this._iOffsetY;}else if(d>S-f){d=S-f;}var A=document.getElementById("sapGanttPopoverAnchor");if(A){A.style.left=i+"px";A.style.top=d+"px";}};c.prototype.checkIfNeedReverse=function(o,t){var r=C.getConfiguration().getRTL();var p=b.getEventPosition(o);var w=t?this.oTimePopover.width()+10:this.oCountPopover.width()+10;if(r&&p.pageX<w||!r&&p.pageX+w>=this.pageWidth||(this.getGantt().getGhostAlignment()!=="End"&&this.bMultipleShapes)){this._bNeedReverse=true;}else{this._bNeedReverse=false;}};c.prototype._showPopover=function(o,t){this.moveAnchor(o,t);if((t&&this.oTimePopover)||(!t&&this.oCountPopover)){document.getElementById("sapGanttPopoverWrapper").classList.remove("sapGanttDragElementHidden");this.checkIfNeedReverse(o,t);this._calcPopoverOffset();var p=this._getPopoverData(o,t);this._updateTime(p,t);}else{this._buildPopover(o,t);}};c.prototype._hidePopover=function(){var p=document.getElementById("sapGanttPopoverAnchor");if(p){p.parentNode.removeChild(p);}this.oTimePopover=null;this.oCountPopover=null;};c.prototype._getPopoverData=function(o,t){var O=this._iOffsetX;if(this._bNeedReverse){O=t?-O-this.oTimePopover.width():-O-this.oCountPopover.width();}var p={offsetX:O,offsetY:this._iOffsetY};if(t){var d=this._getCurrentTime(o);if(d){var f=a.getTimeFormaterBySmallInterval(this.getGantt());p.startNewDate=f.format(d.time);p.endNewDate=f.format(d.endTime);}}return p;};c.prototype._getCurrentTime=function(o){var d=this.getGantt()._getDragDropExtension();var r=this.getGantt()._getResizeExtension();if(d.isDragging()){return d._getGhostTime(o,true);}else if(r.isResizing()){return r._getResizeTime(o);}};c.prototype._calcPopoverOffset=function(){this._iOffsetY=this._getOffsetY();};c.prototype._getOffsetY=function(){var d=this._getDragDropOrResizingDom();var D=d&&d.getBoundingClientRect();var o=32;if(D){o=D.height+2;}return Math.ceil(o);};c.prototype._updatePopoverWhenAutoScroll=function(o){if(this.getGantt().getShowShapeTimeOnDrag()&&this.isDraggingOrResizing()){this._showPopover(o,true);}};return c;});