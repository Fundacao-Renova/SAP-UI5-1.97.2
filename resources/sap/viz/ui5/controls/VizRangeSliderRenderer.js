/*!
 * SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/core/Renderer","./VizSliderBasicRenderer","sap/ui/Device"],function(R,S,D){"use strict";var V=R.extend(S);V.renderHandles=function(r,c){this.renderHandle(r,c,{id:c.getId()+"-handle1",position:"start"});this.renderHandle(r,c,{id:c.getId()+"-handle2",position:"end"});this.renderTooltips(r,c);r.renderControl(c._mHandleTooltip.start.label);r.renderControl(c._mHandleTooltip.end.label);r.renderControl(c._oRangeLabel);};V.renderTooltips=function(r,c){r.openStart("div",c.getId()+"-TooltipsContainer").class(S.CSS_CLASS+"TooltipContainer").style("left","0%").style("right","0%").style("min-width","0%").openEnd();this.renderTooltip(r,c,c.getInputsAsTooltips(),"Left");this.renderTooltip(r,c,c.getInputsAsTooltips(),"Right");r.close("div");};V.renderTooltip=function(r,c,i,p){r.openStart("span",c.getId()+"-"+p+"Tooltip");r.class(S.CSS_CLASS+"HandleTooltip");if(!c.getShowStartEndLabel()){r.style("visibility","hidden");}r.style("width",c._iLongestRangeTextWidth+"px");r.openEnd();r.close("span");};V.renderHandle=function(r,c,o){var v,a=c.getRange(),e=c.getEnabled(),b=sap.ui.getCore().getConfiguration().getRTL();if(o&&(o.id!==undefined)){r.openStart("span",o.id);}else{r.openStart("span");}if(o&&(o.position!==undefined)){v=a[o.position==="start"?0:1];r.attr("data-range-val",o.position);r.attr("aria-labelledby",c._mHandleTooltip[o.position].label.getId());if(c.getInputsAsTooltips()){r.attr("aria-controls",c._mHandleTooltip[o.position].tooltip.getId());}}if(c.getShowHandleTooltip()){this.writeHandleTooltip(r,c);}r.class(S.CSS_CLASS+"Handle");if((!D.system.desktop)&&(D.system.phone||D.system.tablet)){r.class('viz-Mobile');}r.class('sapUiIcon');r.class('ui5-sap-viz-vizSliderHandle');r.attr("data-sap-ui-icon-content",'\ue1fa');if(o&&(o.id!==undefined)&&o.id===(c.getId()+"-handle1")){r.class('ui5-sap-viz-vizSliderHandle-left');r.style(b?"right":"left",a[0]);}if(o&&(o.id!==undefined)&&o.id===(c.getId()+"-handle2")){r.class('ui5-sap-viz-vizSliderHandle-right');r.style(b?"right":"left",a[1]);}this.writeAccessibilityState(r,c,v);if(e){r.attr("tabindex","0");}r.openEnd().close("span");};V.writeAccessibilityState=function(r,s,v){r.accessibilityState(s,{role:"slider",orientation:"horizontal",valuemin:s.toFixed(s.getMin()),valuemax:s.toFixed(s.getMax()),valuenow:v});};V.renderStartLabel=function(r,c){r.openStart("div").class(S.CSS_CLASS+"RangeLabel").openEnd().text(c.getMin()).close("div");};V.renderEndLabel=function(r,c){r.openStart("div").class(S.CSS_CLASS+"RangeLabel").style("width",c._iLongestRangeTextWidth+"px").openEnd().text(c.getMax()).close("div");};V.renderLabels=function(r,c){r.openStart("div").class(S.CSS_CLASS+"Labels").openEnd();this.renderStartLabel(r,c);this.renderEndLabel(r,c);r.close("div");};V.renderProgressIndicator=function(r,s){var a=s.getRange();r.openStart("div",s.getId()+"-progress");if(s.getEnabled()){r.attr("tabindex","0");}this.addProgressIndicatorClass(r,s);r.style("width",s._sProgressValue);r.accessibilityState(s,{role:"slider",orientation:"horizontal",valuemin:s.toFixed(s.getMin()),valuemax:s.toFixed(s.getMax()),valuenow:a.join("-"),valuetext:s._oResourceBundle.getText('RANGE_SLIDER_RANGE_ANNOUNCEMENT',a),labelledby:s._oRangeLabel.getId()});r.openEnd().close("div");};V.render=function(r,s){var e=s.getEnabled(),t=s.getTooltip_AsString(),C=S.CSS_CLASS;r.openStart("div",s);this.addClass(r,s);r.class("ui5-sap-viz-vizRangeSlider");if(!e){r.class(C+"Disabled");}r.style("position","absolute").style("width",s.getWidth()).style("height",s.getHeight()).style("top",s.getTop()).style("left",s.getLeft());if(t&&s.getShowHandleTooltip()){r.attr("title",t);}r.openEnd();this.renderMock(r,s);r.openStart("div",s.getId()+"-inner");this.addInnerClass(r,s);if(!e){r.class(C+"InnerDisabled");}r.openEnd();if(s.getProgress()){this.renderProgressIndicator(r,s);}this.renderHandles(r,s);r.close("div");if(s.getEnableTickmarks()){this.renderTickmarks(r,s);}else{this.renderLabels(r,s);}if(s.getName()){this.renderInput(r,s);}r.close("div");};V.renderMock=function(r,s){var a=s.getRange();var m=s.getMax();var b=s.getMin();var c=Math.min(a[0],a[1]);var d=Math.max(a[0],a[1]);r.openStart("div",s.getId()+"-leftMock").class("ui5-sap-viz-vizSliderMock").class("ui5-sap-viz-vizSliderMock-left").style("right",(m-c)*100/(m-b)+"%").openEnd().close("div");r.openStart("div",s.getId()+"-rightMock").class("ui5-sap-viz-vizSliderMock").class("ui5-sap-viz-vizSliderMock-right").style("left",(d-b)*100/(m-b)+"%").openEnd().close("div");r.openStart("div",s.getId()+"-label").class('ui5-sap-viz-vizSliderLabel').style("left",(d+c)*50/(d-c)+"%");if(!s.getShowPercentageLabel()){r.style("visibility","hidden");}r.openEnd().text((d-c)*100/(m-b)+"%").close("div");};return V;},true);