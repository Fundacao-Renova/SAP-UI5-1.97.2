/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library',"sap/ui/core/Core",'sap/ui/core/Control','./IconTabBarRenderer','./IconTabHeader',"sap/ui/core/util/ResponsivePaddingsEnablement","sap/ui/thirdparty/jquery"],function(l,C,a,I,b,R,q){"use strict";var c=l.IconTabHeaderMode;var B=l.BackgroundDesign;var d=l.IconTabDensityMode;var T=l.TabsOverflowMode;var e=a.extend("sap.m.IconTabBar",{metadata:{interfaces:["sap.m.ObjectHeaderContainer","sap.f.IDynamicPageStickyContent"],library:"sap.m",properties:{showSelection:{type:"boolean",group:"Misc",defaultValue:true,deprecated:true},expandable:{type:"boolean",group:"Misc",defaultValue:true},expanded:{type:"boolean",group:"Misc",defaultValue:true},selectedKey:{type:"string",group:"Data",defaultValue:null},upperCase:{type:"boolean",group:"Appearance",defaultValue:false},stretchContentHeight:{type:"boolean",group:"Appearance",defaultValue:false},applyContentPadding:{type:"boolean",group:"Appearance",defaultValue:true},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:B.Solid},headerMode:{type:"sap.m.IconTabHeaderMode",group:"Appearance",defaultValue:c.Standard},showOverflowSelectList:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},headerBackgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:B.Solid},enableTabReordering:{type:"boolean",group:"Behavior",defaultValue:false},maxNestingLevel:{type:"int",group:"Behavior",defaultValue:0},tabDensityMode:{type:"sap.m.IconTabDensityMode",group:"Appearance",defaultValue:d.Cozy},ariaTexts:{type:"object",group:"Accessibility",defaultValue:null},tabsOverflowMode:{type:"sap.m.TabsOverflowMode",group:"Behavior",defaultValue:T.End}},aggregations:{items:{type:"sap.m.IconTab",multiple:true,singularName:"item",forwarding:{getter:"_getIconTabHeader",aggregation:"items",forwardBinding:true}},content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},_header:{type:"sap.m.IconTabHeader",multiple:false,visibility:"hidden"}},events:{select:{parameters:{item:{type:"sap.m.IconTabFilter"},key:{type:"string"},previousKey:{type:"string"},selectedItem:{type:"sap.m.IconTabFilter"},selectedKey:{type:"string"}}},expand:{parameters:{expand:{type:"boolean"},collapse:{type:"boolean"}}}},designtime:"sap/m/designtime/IconTabBar.designtime"}});R.call(e.prototype,{header:{selector:".sapMITH"},content:{suffix:"content"}});e._CLASSES_TO_COPY=["sapUiResponsiveContentPadding","sapUiNoContentPadding","sapUiContentPadding"];e.prototype.init=function(){this._initResponsivePaddingsEnablement();};e.prototype.setExpanded=function(E){this.setProperty("expanded",E,true);if(this.$().length){this._toggleExpandCollapse(E);}return this;};e.prototype.setHeaderMode=function(m){this.setProperty("headerMode",m,true);this._getIconTabHeader().setMode(m);return this;};e.prototype.setTabDensityMode=function(m){this.setProperty("tabDensityMode",m);this._getIconTabHeader().setTabDensityMode(m);return this;};e.prototype.setHeaderBackgroundDesign=function(h){this.setProperty("headerBackgroundDesign",h,true);this._getIconTabHeader().setBackgroundDesign(h);return this;};e.prototype.setEnableTabReordering=function(v){this.setProperty("enableTabReordering",v,true);this._getIconTabHeader().setEnableTabReordering(v);return this;};e.prototype.setAriaTexts=function(A){this.setProperty("ariaTexts",A,true);this._getIconTabHeader().setAriaTexts(A);return this;};e.prototype.addStyleClass=function(s,S){var i=this._getIconTabHeader();if(e._CLASSES_TO_COPY.indexOf(s)!==-1){i.addStyleClass(s,true);}return a.prototype.addStyleClass.apply(this,arguments);};e.prototype.removeStyleClass=function(s,S){var i=this._getIconTabHeader();if(e._CLASSES_TO_COPY.indexOf(s)!==-1){i.removeStyleClass(s,true);}return a.prototype.removeStyleClass.apply(this,arguments);};e.prototype._rerenderContent=function(o){var $=this.$("content");if(o&&($.length>0)){var r=C.createRenderManager();for(var i=0;i<o.length;i++){r.renderControl(o[i]);}r.flush($[0]);r.destroy();}};e.prototype._toggleExpandCollapse=function(E){var $=this.$("content");var s=this._getIconTabHeader().oSelectedItem;if(E===undefined){E=!this.getExpanded();}if(s){s.$().toggleClass("sapMITBSelected",E);s.$().attr({'aria-expanded':E});if(E){s.$().attr({'aria-selected':E});}else{s.$().removeAttr('aria-selected');}}this._iAnimationCounter=(this._iAnimationCounter===undefined?1:++this._iAnimationCounter);if(E){if(s){if(this.$("content").children().length===0){var S=s.getContent();if(S.length>0){this._rerenderContent(S);}else{this._rerenderContent(this.getContent());}}$.stop(true,true).slideDown('400',q.proxy(this.onTransitionEnded,this,E));this.$("containerContent").toggleClass("sapMITBContentClosed",!E);}}else{this.$("contentArrow").hide();$.stop(true,true).slideUp('400',q.proxy(this.onTransitionEnded,this,E));}if(!E||s){this.setProperty("expanded",E,true);}this.fireExpand({expand:E,collapse:!E});return this;};e.prototype.onTransitionEnded=function(E){var $=this.$("content"),f=this.$("containerContent"),g=this.$("contentArrow");if(this._iAnimationCounter===1){f.toggleClass("sapMITBContentClosed",!E);if(E){g.show();$.css("display","block");}else{g.hide();$.css("display","none");}}this._iAnimationCounter=(this._iAnimationCounter>0?--this._iAnimationCounter:0);return this;};e.prototype._getIconTabHeader=function(){var o=this.getAggregation("_header");if(!o){o=new b(this.getId()+"--header",{});this.setAggregation("_header",o,true);}return o;};e.prototype._getStickyContent=function(){return this._getIconTabHeader();};e.prototype._returnStickyContent=function(){if(this.bIsDestroyed){return;}this._getStickyContent().$().prependTo(this.$());};e.prototype._setStickySubheaderSticked=function(i){this._bStickyContentSticked=i;};e.prototype._getStickySubheaderSticked=function(){return this._bStickyContentSticked;};e.prototype.onBeforeRendering=function(){var i=this._getIconTabHeader(),$=i.$();i.setMaxNestingLevel(this.getMaxNestingLevel());i.setTabsOverflowMode(this.getTabsOverflowMode());if(this._bStickyContentSticked&&$){delete this._bStickyContentSticked;this._getIconTabHeader().$().remove();}};e.prototype.setShowSelection=function(v){this._getIconTabHeader().setShowSelection(v);return this;};e.prototype.getShowSelection=function(){return this._getIconTabHeader().getShowSelection();};e.prototype.setSelectedKey=function(v){this._getIconTabHeader().setSelectedKey(v);return this;};e.prototype.getSelectedKey=function(){return this._getIconTabHeader().getSelectedKey();};e.prototype.setSelectedItem=function(i,A){return this._getIconTabHeader().setSelectedItem(i,A);};return e;});
