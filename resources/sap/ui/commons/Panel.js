/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','sap/base/assert','./library','sap/ui/core/Control','./PanelRenderer','sap/ui/core/ResizeHandler','sap/ui/core/Title',"sap/ui/dom/jquery/scrollLeftRTL"],function(q,a,l,C,P,R,T){"use strict";var B=l.enums.BorderDesign;var A=l.enums.AreaDesign;var b=C.extend("sap.ui.commons.Panel",{metadata:{library:"sap.ui.commons",deprecated:true,properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},scrollLeft:{type:"int",group:"Behavior",defaultValue:0},scrollTop:{type:"int",group:"Behavior",defaultValue:0},applyContentPadding:{type:"boolean",group:"Appearance",defaultValue:true},collapsed:{type:"boolean",group:"Behavior",defaultValue:false},areaDesign:{type:"sap.ui.commons.enums.AreaDesign",group:"Appearance",defaultValue:A.Fill},borderDesign:{type:"sap.ui.commons.enums.BorderDesign",group:"Appearance",defaultValue:B.Box},showCollapseIcon:{type:"boolean",group:"Behavior",defaultValue:true},text:{type:"string",group:"Misc",defaultValue:null}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},title:{type:"sap.ui.core.Title",multiple:false},buttons:{type:"sap.ui.commons.Button",multiple:true,singularName:"button"}}}});b.prototype.init=function(){this._oScrollDomRef=null;this._iMaxTbBtnWidth=-1;this._iTbMarginsAndBorders=0;this._iMinTitleWidth=30;this._iOptTitleWidth=30;this._iTitleMargin=0;this._bFocusCollapseIcon=false;this._resizeDelayTimer=null;this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");this.data("sap-ui-fastnavgroup","true",true);};b.prototype.exit=function(){this._rb=undefined;};b.prototype.onThemeChanged=function(){if(this.getDomRef()&&this._oTitleDomRef){this.getDomRef().style.minWidth="auto";if(this._oToolbarDomRef){this._oToolbarDomRef.style.width="auto";}this._oTitleDomRef.style.width="auto";this._initializeSizes();}};b.prototype.onBeforeRendering=function(){if(this.sResizeListenerId){R.deregister(this.sResizeListenerId);this.sResizeListenerId=null;}};b.prototype.onAfterRendering=function(){this._oScrollDomRef=this.getDomRef("cont");if(!this._oScrollDomRef){return;}this._oHeaderDomRef=this.getDomRef("hdr");this._oTitleDomRef=this.getDomRef("title");this._oToolbarDomRef=this.getDomRef("tb");if(this._bFocusCollapseIcon){this._bFocusCollapseIcon=false;var $=this.$("collArrow");if($.is(":visible")&&($.css("visibility")=="visible"||$.css("visibility")=="inherit")){$.trigger("focus");}else{var c=this.$("collIco");if(c.is(":visible")&&(c.css("visibility")=="visible"||c.css("visibility")=="inherit")){c.trigger("focus");}}}this._initializeSizes();if(b._isSizeSet(this.getHeight())&&(this._hasIcon()||(this.getButtons().length>0))){this._handleResizeNow();this.sResizeListenerId=R.register(this.getDomRef(),q.proxy(this._handleResizeSoon,this));}};b.prototype.getFocusInfo=function(){var c=null;var i=this.getId();if(this._bFocusCollapseIcon){var $=this.$("collArrow");if($.is(":visible")&&($.css("visibility")=="visible"||$.css("visibility")=="inherit")){c=$[0].id;}else{var d=this.$("collIco");if(d.is(":visible")&&(d.css("visibility")=="visible"||d.css("visibility")=="inherit")){c=d[0].id;}}}return{id:(c?c:i)};};b.prototype.applyFocusInfo=function(f){var d;if(f&&f.id&&(d=q(document.getElementById(f.id)))&&(d.length>0)){d.trigger("focus");}else{this.focus();}return this;};b.prototype._initializeSizes=function(){var r=sap.ui.getCore().getConfiguration().getRTL();var c=this.getButtons();if(c&&c.length>0){var m=0;q(this._oToolbarDomRef).children().each(function(){var w=this.offsetWidth;if(w>m){m=w;}});this._iMaxTbBtnWidth=m;if(this._oToolbarDomRef){this._oToolbarDomRef.style.minWidth=m+"px";var $=q(this._oToolbarDomRef);this._iTbMarginsAndBorders=$.outerWidth(true)-$.width();}}var d=this._oTitleDomRef.offsetLeft;var t=this.getDomRef().offsetWidth;if(r){d=t-(d+this._oTitleDomRef.offsetWidth);}var e=q(this._oTitleDomRef);this._iOptTitleWidth=e.width()+1;this._iTitleMargin=e.outerWidth(true)-e.outerWidth();var f=10000;q(this._oHeaderDomRef).children(".sapUiPanelHdrRightItem").each(function(){var i=this.offsetLeft;if(r){i=t-(i+this.offsetWidth);}if((i<f)&&(i>0)){f=i;}});var g=d;g+=this._iMinTitleWidth;g+=this._iMaxTbBtnWidth+1;g+=(f==10000)?10:(t-f);this.getDomRef().style.minWidth=g+10+"px";if(this._oScrollDomRef){var s=this.getProperty("scrollTop");if(s>0){this._oScrollDomRef.scrollTop=s;}var h=this.getProperty("scrollLeft");if(h>0){this._oScrollDomRef.scrollLeft=h;}}};b.prototype._fixContentHeight=function(){if(b._isSizeSet(this.getHeight())&&(this._hasIcon()||(this.getButtons().length>0))){this._iContTop=this._oHeaderDomRef.offsetHeight;if(this._oScrollDomRef){this._oScrollDomRef.style.top=this._iContTop+"px";}}};b.prototype._handleResizeSoon=function(){if(this._resizeDelayTimer){clearTimeout(this._resizeDelayTimer);}this._resizeDelayTimer=setTimeout(function(){this._handleResizeNow();this._resizeDelayTimer=null;}.bind(this),200);};b.prototype._handleResizeNow=function(){this._fixContentHeight();};b.prototype._hasIcon=function(){return(this.getTitle()&&this.getTitle().getIcon());};b.prototype.setEnabled=function(e){this.setProperty("enabled",e,true);q(this.getDomRef()).toggleClass("sapUiPanelDis",!e);return this;};b.prototype.setApplyContentPadding=function(p){this.setProperty("applyContentPadding",p,true);q(this.getDomRef()).toggleClass("sapUiPanelWithPadding",p);return this;};b.prototype.setCollapsed=function(c){this.setProperty("collapsed",c,true);this._setCollapsedState(c);return this;};b.prototype._setCollapsedState=function(c){var d=this.getDomRef();if(d){var e=sap.ui.getCore().getConfiguration().getAccessibility();if(c){if(!this.getWidth()){d.style.width=this.getDomRef().offsetWidth+"px";}q(d).addClass("sapUiPanelColl");if(e){d.setAttribute("aria-expanded","false");}if(this.getHeight()){d.style.height="auto";}var E=this._rb.getText("PANEL_EXPAND");this.$("collArrow").attr("title",E);this.$("collIco").attr("title",E);}else{if(!this.getDomRef("cont")){this._bFocusCollapseIcon=true;this.rerender();}else{q(d).removeClass("sapUiPanelColl");if(e){d.setAttribute("aria-expanded","true");}if(!this.getWidth()){d.style.width="auto";}if(this.getHeight()){d.style.height=this.getHeight();}var s=this._rb.getText("PANEL_COLLAPSE");this.$("collArrow").attr("title",s);this.$("collIco").attr("title",s);}}}};b._isSizeSet=function(c){return(c&&!(c=="auto")&&!(c=="inherit"));};b.prototype.setTitle=function(t){var o=this.getTitle();this.setAggregation("title",t);if(o&&o!==t&&o.getId()===this.getId()+"-tit"){o.destroy();}return this;};b.prototype.setText=function(t){if(!this.getTitle()){this.setTitle(new T(this.getId()+"-tit",{text:t}));}else{this.getTitle().setText(t);}return this;};b.prototype.getText=function(){if(!this.getTitle()){return"";}else{return this.getTitle().getText();}};b.prototype.getScrollLeft=function(){var s=0;if(this._oScrollDomRef){if(sap.ui.getCore().getConfiguration().getRTL()){s=q(this._oScrollDomRef).scrollLeftRTL();}else{s=q(this._oScrollDomRef).scrollLeft();}a(typeof s=="number","scrollLeft read from DOM should be a number");this.setProperty("scrollLeft",s,true);}return s;};b.prototype.setScrollLeft=function(p){this.setProperty("scrollLeft",p,true);if(this._oScrollDomRef){if(sap.ui.getCore().getConfiguration().getRTL()){q(this._oScrollDomRef).scrollLeftRTL(p);}else{q(this._oScrollDomRef).scrollLeft(p);}}return this;};b.prototype.getScrollTop=function(){var s=0;if(this._oScrollDomRef){s=Math.ceil(this._oScrollDomRef.scrollTop);this.setProperty("scrollTop",s,true);}return s;};b.prototype.setScrollTop=function(p){this.setProperty("scrollTop",p,true);if(this._oScrollDomRef){this._oScrollDomRef.scrollTop=p;}return this;};b.prototype.setDimensions=function(w,h){a(typeof w=="string"&&typeof h=="string","sWidth and sHeight must be strings");this.setWidth(w);this.setHeight(h);return this;};b.prototype.setWidth=function(w){this.setProperty("width",w,true);var d=this.getDomRef();if(d){d.style.width=w;}return this;};b.prototype.setHeight=function(h){this.setProperty("height",h,true);var d=this.getDomRef();if(d){d.style.height=h;}return this;};b.prototype.onclick=function(e){this._handleTrigger(e);};b.prototype.onsapspace=function(e){this._handleTrigger(e);};b.prototype._handleTrigger=function(e){var i=this.getId();if((e.target.id===i+"-collArrow")||(e.target.id===i+"-collIco")||(e.target.id===i&&e.type==="sapspace"&&this.getShowCollapseIcon())){this.setCollapsed(!this.getProperty("collapsed"));e.preventDefault();e.stopPropagation();this.fireEvent("collapsedToggled");}};return b;});