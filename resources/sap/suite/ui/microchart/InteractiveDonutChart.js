/*!
 * SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./library","sap/m/library","sap/ui/core/Control","sap/ui/core/ResizeHandler","sap/ui/Device","sap/m/FlexBox","sap/base/Log","./InteractiveDonutChartSegment","sap/f/IllustratedMessage","sap/f/library","./InteractiveDonutChartRenderer"],function(q,l,M,C,R,D,F,L,I,a,s){"use strict";var b=C.extend("sap.suite.ui.microchart.InteractiveDonutChart",{metadata:{library:"sap.suite.ui.microchart",properties:{displayedSegments:{type:"int",group:"Appearance",defaultValue:3},selectionEnabled:{type:"boolean",group:"Behavior",defaultValue:true},showError:{type:"boolean",group:"Appearance",defaultValue:false},errorMessageTitle:{type:"string",group:"Appearance"},errorMessage:{type:"string",group:"Appearance"}},defaultAggregation:"segments",aggregations:{segments:{type:"sap.suite.ui.microchart.InteractiveDonutChartSegment",multiple:true,bindable:"bindable"}},events:{selectionChanged:{parameters:{selectedSegments:{type:"sap.suite.ui.microchart.InteractiveDonutChartSegment[]"},segment:{type:"sap.suite.ui.microchart.InteractiveDonutChartSegment"},selected:{type:"boolean"}}},press:{}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}}});b.SEGMENT_CSSCLASS_SELECTED="sapSuiteIDCLegendSegmentSelected";b.SEGMENT_CSSCLASS_HIGHLIGHT="sapSuiteIDCLegendSegmentHover";b.CHART_SEGMENT_LABEL_MAXLENGTH=7;b.CHART_SEGMENT={CSSCLASS:"sapSuiteIDCChartSegment",CSSCLASS_HIGHLIGHT:"sapSuiteIDCChartSegmentHighlight",CSSCLASS_SELECTED:"sapSuiteIDCChartSegmentSelected"};b.CHART_SEGMENT_GHOST={CSSCLASS:"sapSuiteIDCChartSegmentGhost",CSSCLASS_HIGHLIGHT:"sapSuiteIDCChartSegmentGhostHighlight",CSSCLASS_SELECTED:"sapSuiteIDCChartSegmentGhostSelected"};b.AREA_HEIGHT_INTERACTIVE_MINVALUE=48;b.AREA_HEIGHT_INTERACTIVE_MINVALUE_COMPACT=32;b.AREA_HEIGHT_SMALLFONT=36;b.AREA_HEIGHT_SMALLFONT_COMPACT=32;b.AREA_HEIGHT_MINVALUE=18;b.LEGEND_HEIGHT_PADDING=6;b.CHART_HEIGHT_MINVALUE=110;b.CHART_WIDTH_MINVALUE=130;b.CHART_WIDTH_HIDEDONUT_MINVALUE=225;b.CHART_WIDTH_LEGENDPADDING_MINVALUE=300;b.CHART_WIDTH_FULLWIDTH_SMALLFONT_MINVALUE=180;b.prototype.onclick=function(e){if(!this.getSelectionEnabled()){return;}if(this._bInteractiveMode){var t=q(e.target),i=t.data("sap-ui-idc-selection-index"),S=this.getAggregation("segments"),f=this.$().find(".sapSuiteIDCLegendSegment"),h;if(!(i>=0)){i=t.closest(".sapSuiteIDCLegendSegment").data("sap-ui-idc-selection-index");}if(isNaN(i)||i<0||i>=S.length){return;}this._toggleSelected(i);h=f.index(this.$().find(".sapSuiteIDCLegendSegment[tabindex='0']"));this._switchTabindex(h,i,f);}else{this.firePress();if(D.browser.msie){this.$().trigger("focus");e.preventDefault();}}};b.prototype.onsapup=function(e){var f=this.$().find(".sapSuiteIDCLegendSegment");var i=f.index(e.target);if(f.length>0){this._switchTabindex(i,i-1,f);}e.preventDefault();e.stopImmediatePropagation();};b.prototype.onsapdown=function(e){var f=this.$().find(".sapSuiteIDCLegendSegment");var i=f.index(e.target);if(f.length>0){this._switchTabindex(i,i+1,f);}e.preventDefault();e.stopImmediatePropagation();};b.prototype.onsaphome=function(e){var f=this.$().find(".sapSuiteIDCLegendSegment");var i=f.index(e.target);if(i!==0&&f.length>0){this._switchTabindex(i,0,f);}e.preventDefault();e.stopImmediatePropagation();};b.prototype.onsapend=function(e){var f=this.$().find(".sapSuiteIDCLegendSegment");var i=f.index(e.target);var c=f.length;if(i!==c-1&&c>0){this._switchTabindex(i,c-1,f);}e.preventDefault();e.stopImmediatePropagation();};b.prototype.onsapenter=function(e){if(this._bInteractiveMode){var i=this.$().find(".sapSuiteIDCLegendSegment").index(e.target);if(i!==-1){this._toggleSelected(i);}e.preventDefault();e.stopImmediatePropagation();}else{this.firePress();}};b.prototype.onsapleft=b.prototype.onsapup;b.prototype.onsapright=b.prototype.onsapdown;b.prototype.onsapspace=b.prototype.onsapenter;b.prototype.getTooltip_AsString=function(){var t=this.getTooltip_Text();if(!t){t=this._createTooltipText();}else if(l._isTooltipSuppressed(t)){t=null;}return t;};b.prototype.getSelectedSegments=function(){var S,c;S=this.getAggregation("segments");c=[];for(var i=0;i<S.length;i++){if(S[i].getSelected()){c.push(S[i]);}}return c;};b.prototype.setSelectedSegments=function(c){var S,d,e;S=this.getAggregation("segments");this._deselectAllSelectedSegments();if(!c){return this;}if(c instanceof I){c=[c];}if(Array.isArray(c)){e=c.length;for(var i=0;i<e;i++){d=this.indexOfAggregation("segments",c[i]);if(d>=0&&S[d]){S[d].setProperty("selected",true,true);}else{L.warning("Method setSelectedSegments called with invalid InteractiveDonutChartSegment element");}}}this.invalidate();return this;};b.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.microchart");this._bThemeApplied=true;this._oIllustratedMessageControl=new a({illustrationSize:s.IllustratedMessageSize.Base,illustrationType:s.IllustratedMessageType.NoData});if(!sap.ui.getCore().isInitialized()){this._bThemeApplied=false;sap.ui.getCore().attachInit(this._handleCoreInitialized.bind(this));}else{this._handleCoreInitialized();}};b.prototype.onBeforeRendering=function(){this._bCompact=this._isCompact();this._bInteractiveMode=true;this._errorMessage=this.getErrorMessage();this._errorMessageTitle=this.getErrorMessageTitle();this._oIllustratedMessageControl.setTitle(this._errorMessageTitle);this._oIllustratedMessageControl.setDescription(this._errorMessage);var S=this.getSegments();this._iVisibleSegments=Math.min(this.getDisplayedSegments(),S.length);this._setResponsivenessData();var $=this.$().find(".sapSuiteIDCChartSegment, .sapSuiteIDCLegendSegment, .sapSuiteIDCChartSegmentGhost");$.off();if(!this.data("_parentRenderingContext")&&typeof this.getParent==="function"){this.data("_parentRenderingContext",this.getParent());}this._deregisterResizeHandler();this._bSemanticTooltip=false;for(var i=0;i<this._iVisibleSegments;i++){if(S[i].getColor()!==M.ValueColor.Neutral){this._bSemanticTooltip=true;break;}}};b.prototype.onAfterRendering=function(){this._adjustToParent(this.$());l._checkControlIsVisible(this,this._onControlIsVisible);};b.prototype._onControlIsVisible=function(){if(this._bInteractiveMode){this._sResizeHandlerId=R.register(this,this._onResize.bind(this));this._onResize();if(this.$().length>0){var c=this._isCompact();if(c!==this._bCompact){this._bCompact=c;this.invalidate();}}if(D.system.desktop){this._attachHoverHandlers();}}};b.prototype.exit=function(){this._deregisterResizeHandler();this._oIllustratedMessageControl.destroy();};b.prototype._handleCoreInitialized=function(){this._bThemeApplied=sap.ui.getCore().isThemeApplied();sap.ui.getCore().attachThemeChanged(this._handleThemeApplied,this);};b.prototype._deselectAllSelectedSegments=function(){var S=this.getAggregation("segments");for(var i=0;i<S.length;i++){if(S[i].getSelected()){S[i].setProperty("selected",false,true);}}};b.prototype._attachHoverHandlers=function(){var t=this,S=this.$().find(".sapSuiteIDCChartSegment, .sapSuiteIDCLegendSegment, .sapSuiteIDCChartSegmentGhost");S.on({mousemove:function(){t._handleHoverSync(q(this).data("sap-ui-idc-selection-index"));},mouseleave:function(){t._handleHoverSync(q(this).data("sap-ui-idc-selection-index"),true);}});};b.prototype._handleHoverSync=function(i,o){if(this._bInteractiveMode){var S=this.getAggregation("segments"),c=S[i].getSelected();this._setSegmentInteractionState(b.CHART_SEGMENT,i,c,o);this._setSegmentInteractionState(b.CHART_SEGMENT_GHOST,i,c,o);this._setLegendEntryInteractionState(i,c,o,S[i]);}};b.prototype._setSegmentInteractionState=function(c,i,d,o){var S=this.$().find("."+c.CSSCLASS+"[data-sap-ui-idc-selection-index='"+i+"']");S.removeClass(c.CSSCLASS_SELECTED);S.removeClass(c.CSSCLASS_HIGHLIGHT);if(S.length>0&&S[0].children.length>0){S[0].children[0].style.visibility="hidden";}if(!o){S.addClass(c.CSSCLASS_HIGHLIGHT);if(S.length>0&&S[0].children.length>0){S[0].children[0].style.visibility="visible";}}if(d){S.addClass(c.CSSCLASS_SELECTED);}};b.prototype._setLegendEntryInteractionState=function(i,c,o,h){var e=this.$().find(".sapSuiteIDCLegendSegment[data-sap-ui-idc-selection-index='"+i+"']");e.removeClass(b.SEGMENT_CSSCLASS_SELECTED);e.removeClass(b.SEGMENT_CSSCLASS_HIGHLIGHT);e.removeAttr("title");if(!o){e.addClass(b.SEGMENT_CSSCLASS_HIGHLIGHT);e.attr("title",h.getTooltip_AsString());}if(c){e.addClass(b.SEGMENT_CSSCLASS_SELECTED);}};b.prototype._switchModeInteractive=function(c){var $=this.$(),S=false;if(c<this._iAreaHeightInteractiveMinValue){S=true;if(this._bInteractiveMode){this._bInteractiveMode=false;$.addClass("sapSuiteIDCNonInteractive");if(this.getSelectionEnabled()){var A=$.find(".sapSuiteIDCLegendSegment[tabindex='0']");this._iActiveElement=$.find(".sapSuiteIDCLegendSegment").index(A);A.removeAttr("tabindex");$.attr("tabindex","0");}$.attr({"role":"button","aria-multiselectable":"false","aria-disabled":!this._isChartEnabled()});}}else if(!this._bInteractiveMode){S=true;this._bInteractiveMode=true;$.removeClass("sapSuiteIDCNonInteractive");if(this.getSelectionEnabled()){$.removeAttr("tabindex");if(!this._iActiveElement||this._iActiveElement<0){this._iActiveElement=0;}$.find(".sapSuiteIDCLegendSegment").eq(this._iActiveElement).attr("tabindex","0");}$.attr({"role":"listbox","aria-multiselectable":"true","aria-disabled":!this._isChartEnabled()});}if(S){if(this._isChartEnabled()){$.removeAttr("title");this._addInteractionAreaTooltip();}else{$.find(".sapSuiteIDCChartSegment title, .sapSuiteIDCChartSegmentGhost title").remove();$.find(".sapSuiteIDCLegendSegment").removeAttr("title");$.attr("title",this.getTooltip_AsString());}}};b.prototype._addInteractionAreaTooltip=function(){var t,e,S,$=this.$(),c=this.getSegments();$.find(".sapSuiteIDCChartSegment, .sapSuiteIDCChartSegmentGhost").each(function(i,d){e=q(d);S=parseInt(e.attr("data-sap-ui-idc-selection-index"));t=q("<div></div>").text(c[S].getTooltip_AsString());e.html("<title>"+t.getEncodedText()+"</title>");});$.find(".sapSuiteIDCLegendSegment").each(function(i,d){e=q(d);S=parseInt(e.attr("data-sap-ui-idc-selection-index"));e.attr("title",c[S].getTooltip_AsString());});};b.prototype._onResize=function(){var i,c,$=this.$(),d=$.find(".sapSuiteIDCLegendSegment"),e=$.find(".sapSuiteIDCChart"),f=parseInt(e.css("padding-right"))+parseInt(e.css("padding-left")),g=$.height(),h=$.width();if(this._bInteractiveMode){c=2;}else{c=1;}i=((g-b.LEGEND_HEIGHT_PADDING-(d.length*c))/d.length);d.height(i+"px");if(h<b.CHART_WIDTH_MINVALUE||g<b.CHART_HEIGHT_MINVALUE||i<b.AREA_HEIGHT_MINVALUE){$.css("visibility","hidden");return;}$.css("visibility","");if(h<b.CHART_WIDTH_HIDEDONUT_MINVALUE){$.addClass("sapSuiteIDCFullWidth");if(h<b.CHART_WIDTH_FULLWIDTH_SMALLFONT_MINVALUE){$.addClass("sapSuiteIDCFullWidthSmallFont");}else{$.removeClass("sapSuiteIDCFullWidthSmallFont");}}else{$.removeClass("sapSuiteIDCFullWidth");if(e.innerWidth()<e.innerHeight()){$.find(".sapSuiteIDCChartSVG").css("width","100%").css("height",e.innerWidth()+"px");}else{$.find(".sapSuiteIDCChartSVG").css("height","100%").css("width",(e.innerHeight()-f)+"px");}if(h<b.CHART_WIDTH_LEGENDPADDING_MINVALUE){$.addClass("sapSuiteIDCSmallLegendPadding");}else{$.removeClass("sapSuiteIDCSmallLegendPadding");}}if(i<this._iAreaHeightSmallFontMinValue){$.addClass("sapSuiteIDCSmallFont");}else{$.removeClass("sapSuiteIDCSmallFont");}this._handleLegendEntrySizing();this._switchModeInteractive(i);};b.prototype._handleLegendEntrySizing=function(){var $=this.$().find(".sapSuiteIDCLegend"),c=$.find(".sapSuiteIDCLegendLabel"),v=$.find(".sapSuiteIDCLegendValue"),V=0;v.each(function(){var i=q(this).outerWidth(true);V=Math.max(V,i);});c.css("width","calc(100% - "+V+"px)");v.css("width",V+"px");};b.prototype._isChartEnabled=function(){return this.getSelectionEnabled()&&this._bInteractiveMode;};b.prototype._isCompact=function(){return q("body").hasClass("sapUiSizeCompact")||this.$().is(".sapUiSizeCompact")||this.$().closest(".sapUiSizeCompact").length>0;};b.prototype._toggleSelected=function(i){var S=this.getSegments()[i],c=!S.getSelected(),$=this.$("interactionArea-"+i),d=this.$().find("."+b.CHART_SEGMENT.CSSCLASS+"[data-sap-ui-idc-selection-index='"+i+"']"),g=this.$().find("."+b.CHART_SEGMENT_GHOST.CSSCLASS+"[data-sap-ui-idc-selection-index='"+i+"']");S.setProperty("selected",c,true);$.attr("aria-selected",S.getSelected());if(c){$.addClass(b.SEGMENT_CSSCLASS_SELECTED);d.addClass(b.CHART_SEGMENT.CSSCLASS_SELECTED);g.addClass(b.CHART_SEGMENT_GHOST.CSSCLASS_SELECTED);}else{$.removeClass(b.SEGMENT_CSSCLASS_SELECTED);d.removeClass(b.CHART_SEGMENT.CSSCLASS_SELECTED);g.removeClass(b.CHART_SEGMENT_GHOST.CSSCLASS_SELECTED);}this.fireSelectionChanged({selectedSegments:this.getSelectedSegments(),segment:S,selected:c});};b.prototype._switchTabindex=function(o,n,f){if(o!==n&&o>=0&&o<f.length&&n>=0&&n<f.length){f.eq(o).removeAttr("tabindex");f.eq(n).attr("tabindex","0");f.eq(n).trigger("focus");}};b.prototype._adjustToParent=function(c){var p=this.data("_parentRenderingContext");if(p&&p instanceof F){var P=p.$();var i=parseFloat(P.innerWidth());var d=parseFloat(P.innerHeight());c.outerWidth(i);c.outerHeight(d);}};b.prototype._setResponsivenessData=function(){if(this._bCompact){this._iAreaHeightInteractiveMinValue=b.AREA_HEIGHT_INTERACTIVE_MINVALUE_COMPACT;this._iAreaHeightSmallFontMinValue=b.AREA_HEIGHT_SMALLFONT_COMPACT;}else{this._iAreaHeightInteractiveMinValue=b.AREA_HEIGHT_INTERACTIVE_MINVALUE;this._iAreaHeightSmallFontMinValue=b.AREA_HEIGHT_SMALLFONT;}};b.prototype._handleThemeApplied=function(){this._bThemeApplied=true;this._bCompact=this._isCompact();};b.prototype._deregisterResizeHandler=function(){if(this._sResizeHandlerId){R.deregister(this._sResizeHandlerId);this._sResizeHandlerId=null;}};b.prototype._createTooltipText=function(){var c=true,S,t="",o=this.getSegments();for(var i=0;i<this._iVisibleSegments;i++){if(!o[i]){break;}S=o[i]._getSegmentTooltip();if(S){t+=(c?"":"\n")+S;c=false;}}return t;};return b;});
