/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/core/Core","sap/ui/Device","../misc/Format","../config/TimeHorizon","./GanttExtension","./RenderUtils","./GanttUtils","sap/gantt/simple/AggregationUtils"],function(q,C,D,F,T,G,R,a,A){"use strict";var s=function($,v){var r=C.getConfiguration().getRTL();var c=r?"scrollLeftRTL":"scrollLeft";if(typeof v==="number"){$[c](v);}return $[c]();};var n=".sapGanttScroll";var S="scroll"+n;var H={onHSBScroll:function(e){this._getScrollExtension().updateVisibleHorizonIfNecessary();},onMouseWheelScrolling:function(e){var o=this._getScrollExtension();var h=Math.abs(e.deltaX)>Math.abs(e.deltaY),c=h&&e.shiftKey;var i=h?e.deltaX:e.deltaY,d=i>0,f=false;if(i===0){return;}if(c){var g=o.getGanttHsb();if(d){f=g.scrollLeft===g.scrollWidth-g.offsetWidth;}else{f=g.scrollLeft===0;}if(!f){g.scrollLeft=g.scrollLeft+i;}e.preventDefault();e.stopPropagation();}},getEventListenerTargets:function(g){var e=[g.getDomRef("svg"),g.getDomRef("header-svg")];return e.filter(function(E){return E!=null;});},onTouchStart:function(e){if(e.type==="touchstart"||e.pointerType==="touch"){var o=this._getScrollExtension(),h=o.getGanttHsb();var t=e.touches?e.touches[0]:e;o._mTouchSessionData={initialPageX:t.pageX,initialPageY:t.pageY,initialScrollLeft:h?h.scrollLeft:0,initialScrolledToEnd:null};}},onTouchMoveHorizontalScrolling:function(e){if(e.type==="touchmove"||e.pointerType==="touch"){var o=this._getScrollExtension();var t=o._mTouchSessionData;var c=e.touches?e.touches[0]:e;var i=(c.pageX-t.initialPageX);var d=(c.pageY-t.initialPageY);var f=false;var g=false;var h=Math.abs(i)>Math.abs(d);if(!t||!h){return;}var j=o.getGanttHsb();if(i<0){f=j.scrollLeft===j.scrollWidth-j.offsetWidth;}else{f=j.scrollLeft===0;}if(!t.initialScrolledToEnd){t.initialScrolledToEnd=f;}if(!f&&!t.initialScrolledToEnd){j.scrollLeft=t.initialScrollLeft-i;g=true;}if(g){e.preventDefault();}}},addEventListeners:function(g){var e=g._getScrollExtension();this.removeEventListeners(g);q(e.getGanttHsb()).on(S,this.onHSBScroll.bind(g));var E=this.getEventListenerTargets(g);e._mTouchEventListener=this.addTouchEventListener(E,g);e._mMouseWheelEventListener=this.addMouseWheelEventListener(E,g);},removeEventListeners:function(g){var e=g._getScrollExtension();q(e.getGanttHsb()).off(n);H.removeScrollEventListeners(g);},addMouseWheelEventListener:function(e,g){var o=H.onMouseWheelScrolling.bind(g);for(var i=0;i<e.length;i++){e[i].addEventListener("wheel",o);}return{wheel:o};},addTouchEventListener:function(e,g){var o=H.onTouchStart.bind(g);var O=H.onTouchMoveHorizontalScrolling.bind(g);var l={};for(var i=0;i<e.length;i++){if(D.support.pointer&&D.system.desktop){e[i].addEventListener("pointerdown",o);e[i].addEventListener("pointermove",O,D.browser.chrome?{passive:true}:false);}else if(D.support.touch){e[i].addEventListener("touchstart",o);e[i].addEventListener("touchmove",O);}}if(D.support.pointer&&D.system.desktop){l={pointerdown:o,pointermove:O};}else if(D.support.touch){l={touchstart:o,touchmove:O};}return l;},removeScrollEventListeners:function(g){var o=g._getScrollExtension();var e=H.getEventListenerTargets(g);function r(t,E){for(var c in E){var l=E[c];if(l){t.removeEventListener(c,l);}}}for(var i=0;i<e.length;i++){r(e[i],o._mTouchEventListener);r(e[i],o._mMouseWheelEventListener);}delete o._mTouchEventListener;delete o._mMouseWheelEventListener;}};var b=G.extend("sap.gantt.GanttScrollExtension",{_init:function(g,m){this.oGanttHsb=null;this._bSuppressSetVisibleHorizon=false;this.mOffsetWidth=null;return"ScrollExtension";},_attachEvents:function(){var g=this.getGantt();H.addEventListeners(g);},_detachEvents:function(){var g=this.getGantt();H.removeEventListeners(g);},destroy:function(){this._detachEvents();this._delegate=null;this.oGanttHsb=null;this.mOffsetWidth=null;G.prototype.destroy.apply(this,arguments);}});b.prototype.updateVisibleHorizonIfNecessary=function(){if(!this._bSuppressSetVisibleHorizon){this._updateVisibleHorizonForce();}this._bSuppressSetVisibleHorizon=false;this.getGantt().getAggregation("_header").renderElement();if(!this.scrollTimer){this.scrollTimer=window.setTimeout(function(){if(a.isDynamicText()){this.getGantt().getTable().rerender();}this.scrollTimer=null;}.bind(this),500);}};b.prototype._updateVisibleHorizonForce=function(){var t=this._scrollLeftToVisibleHorizon();this.getGantt()._updateVisibleHorizon(t,"horizontalScroll",this.getVisibleWidth());};b.prototype.jumpToVisibleHorizon=function(r){this.getGantt()._updateVisibleHorizon(this.getGantt().getAxisTimeStrategy().getVisibleHorizon(),r||"horizontalScroll",this.getVisibleWidth());};b.prototype._getGanttHsbScrollLeft=function(){return s(q(this.getGanttHsb()));};b.prototype.getContentWidth=function(){var g=this.getGantt();var o=g.getAxisTime(),r=o.getViewRange();return Math.abs(Math.ceil(r[1])-Math.ceil(r[0]));};b.prototype.updateGanttScrollWidth=function(){var g=this.getGantt();g.getSyncedControl().setInnerWidth(g.getContentWidth()+"px");};b.prototype.getVisibleWidth=function(){return q(document.getElementById(this.getGantt().getId()+"-gantt")).width();};b.prototype.scrollGanttChartToVisibleHorizon=function(){var c=this._visibleHorizonToScrollLeft();var d=c-this.mOffsetWidth.svgOffset;var m=this.getDomRefs(),$=q(m.gantt),e=q(m.header);if(Math.abs(s($)-d)>0){var h=this.getGanttHsb();if(h){if(s(q(h))===0){s($,0);s(e,0);}else{s($,d);s(e,d);}}}this.getGantt()._getConnectExtension().updateShapeConnectEffect(this);};b.prototype.clearOffsetWidth=function(){this.mOffsetWidth=null;this.getGantt().getAxisTime().setViewOffset(0);};b.prototype.needRerenderGantt=function(r,c,t){if(this.mOffsetWidth===null&&!t){this.updateGanttScrollWidth();}if(!t&&c!=="initialRender"&&this.mOffsetWidth&&this.doesSvgScrollWithinBuffer()&&!this.getGantt().getSyncedControl().getRowsHeightChanged()){this._scrollTableToVisibleHorizon(true);this.scrollGanttChartToVisibleHorizon();this.getGantt().getSyncedControl().scrollContentIfNecessary();return false;}this._scrollTableToVisibleHorizon(true);this.updateSvgOffsetWidth();if(c!=="initialRender"&&r){r.apply(this.getGantt());this.scrollGanttChartToVisibleHorizon();this.getGantt().getSyncedControl().scrollContentIfNecessary();}return true;};b.prototype._scrollTableToVisibleHorizon=function(c){var $=q(this.getGanttHsb()),i=s($);var e=this._visibleHorizonToScrollLeft();if(Math.abs(i-e)>1){this._bSuppressSetVisibleHorizon=c;s($,e);}};b.prototype.updateSvgOffsetWidth=function(){var o=this.calcSvgLatestOffsetWidth();this.getGantt().getAxisTime().setViewOffset(o.svgOffset);this.getGantt().iGanttRenderedWidth=o.svgWidth;this.mOffsetWidth={svgWidth:o.svgWidth,svgOffset:o.svgOffset};};b.prototype.doesSvgScrollWithinBuffer=function(){var v=this.getVisibleWidth(),c=this.getContentWidth(),i=this._visibleHorizonToScrollLeft();if(this.mOffsetWidth===null){return false;}var d=this.mOffsetWidth.svgOffset,e=this.mOffsetWidth.svgWidth;var I=(v>=c)||(i-d>=0&&e>=i-d+v);return I;};b.prototype.calcSvgLatestOffsetWidth=function(){var c=this.getContentWidth(),v=this.getVisibleWidth();var i=this._getGanttHsbScrollLeft()||0;var d=R.getGanttRenderWidth(this.getGantt());var o=i-(v*R.RENDER_EXTEND_FACTOR);if(o<0){d+=o;o=0;}if(o+d>c){d=c-o;}return{svgWidth:d,svgOffset:o};};b.prototype._visibleHorizonToScrollLeft=function(){var t=this.getGantt().getAxisTimeStrategy().getVisibleHorizon();var r=C.getConfiguration().getRTL(),c=t.getStartTime();var i=this.getGantt().getAxisTime().timeToView(F.abapTimestampToDate(c),true);if(r){i=i-this.getVisibleWidth();}if(i<0){i=0;}return i;};b.prototype._scrollLeftToVisibleHorizon=function(){var r=C.getConfiguration().getRTL(),o=this.getGantt().getAxisTime();var i=this._getGanttHsbScrollLeft();var c=o.viewToTime(i,true),e;if(r){e=o.viewToTime(i,true);c=undefined;}return new T({startTime:c,endTime:e});};b.prototype.getGanttHsb=function(){var g=this.getGantt();if(g){this.oGanttHsb=g.getDomRef("hsb");}return this.oGanttHsb;};return b;});
