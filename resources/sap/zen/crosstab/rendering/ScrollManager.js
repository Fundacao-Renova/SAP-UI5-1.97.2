/*!
 * (c) Copyright 2010-2019 SAP SE or an SAP affiliate company.
 */
sap.ui.define(["jquery.sap.global","sap/zen/crosstab/utils/Measuring","sap/ui/core/Popup","sap/ui/core/OpenState","sap/zen/crosstab/TextConstants","sap/zen/crosstab/utils/Utils"],function(q,M,P,O,T,U){"use strict";q.sap.declare("sap.zen.crosstab.rendering.ScrollManager");sap.zen.crosstab.rendering.ScrollManager=function(c,r){"use strict";var C=c.getColumnHeaderArea();var R=c.getRowHeaderArea();var d=c.getDimensionHeaderArea();var D=c.getDataArea();var m=r.getMeasuringHelper();var i=0;var a=0;var h=false;var v=false;var V=0;var l=null;var H=null;var L=null;var o=null;var p=new sap.ui.core.Popup();var t=null;if(U.isMainMode()){t=new sap.m.Text();}else{t=new sap.ui.commons.TextView();t.setWrapping(false);}p.setContent(t);p.setDurations(125,500);p.setAutoClose(true);p.getContent().addStyleClass("sapzencrosstab-ScrollPopup");var b=(D.getRowCnt()+"").length;var e=(D.getColCnt()+"").length;var f=0;var g=0;var B=false;var j=false;var k=this;this.destroy=function(){p.destroy();};this.setHScrollPos=function(Q){a=Q;};this.setVScrollPos=function(Q){i=Q;};function n(Q){var S=0;if(Q){S=q(document.getElementById(Q.getId())).children("tbody").children("tr").length;}return S;}function s(){var Q=n(R);var S=n(D);var W=Q-S;if(W>0){r.beginRendering();r.appendTopRows(D,W);R.setRenderStartRow(D.getRenderStartRow());R.setRenderRowCnt(D.getRenderRowCnt());r.adjustColWidths(d,R);r.adjustColWidths(C,D);r.adjustRowHeights(R,D);r.finishRendering(true);}}function u(Q){c.getPageManager().enableTimeout(true);H=null;var S=null;if(!Q){S=l;}else{S=Q.getParameters();}if(S){c.postPlanningValue();var W=c.getHScrollbar();var X=W.getSteps();h=S.newScrollPos===X;a=S.newScrollPos;k.sendClientScrollPosUpdate();var Y=S.newScrollPos;if(Y!==C.getRenderStartCol()){if(Y!==C.getColCnt()){r.beginRendering();r.renderColHeaderArea(Y);r.renderDataArea();r.adjustColWidths(C,D);r.adjustRowHeights(R,D);r.adjustRowHeights(d,C);r.finishRendering(true);}var Z=m.getAreaWidth(C);var $=m.getUpperRightScrollDivWidth();var _=Z<$;var a1=C.getRenderColCnt()+C.getRenderStartCol()===C.getColCnt();if(h||_&&a1){if(_&&Y>0){r.beginRendering();r.appendLeftCols(C,4);r.appendLeftCols(D,4);r.adjustColWidths(C,D);r.adjustRowHeights(R,D);r.adjustRowHeights(d,C);r.finishRendering(true);}if(!h&&S.forward){w(0,true);}x(true);}else{x(false);}}else{if(h){x(true);}}if(v){s();N(true);}if(S.newScrollPos===0){x(false);}}p.close();if(c.isScrollInvalidate()===true&&!c.hasLoadingPages()){c.setInvalidateCalledByScrolling();c.invalidate();}}this.hScrollHandler=function(Q,S){if(!B){if(S){u(Q);}else{l=Q.getParameters();if(H){clearTimeout(H);H=null;y(l.newScrollPos);}H=setTimeout(u,200,null);a=l.newScrollPos;}}else{B=false;}};function w(S,Q){var W=c.getHScrollbar();var X=W.getScrollPosition();var Y;if(Q){S=W.getSteps();if(c.getPropertyBag().isRtl()&&c.getUtils().isMozilla()){W.setScrollPosition(0);W.setScrollPosition(S);}h=true;}if(X!==S){W.setScrollPosition(S);B=true;}a=S;Y=c.getRenderEngine().getCrossRequestManager();if(Y){Y.setHScrollInfo(a,h);}}function x(S){k.positionHScrollDiv(S);}this.positionHScrollDiv=function(S){var Q=q(document.getElementById(c.getId()+"_upperRight_scrollDiv"));var W=q(document.getElementById(c.getId()+"_lowerRight_scrollDiv"));var X;if(typeof(S)==="undefined"){S=h;}if(c.getPropertyBag().isRtl()){if(q.browser.webkit){X=S?0:W[0].scrollWidth;}else if(c.getUtils().isMozilla()){X=S?-W[0].scrollWidth:0;}else{X=S?W[0].scrollWidth:0;}}else{X=S?W[0].scrollWidth:0;}W.scrollLeft(X);Q.scrollLeft(X);};this.vScrollHandler=function(Q,S){if(!j){if(S){I(Q);}else{L=Q.getParameters();if(o){clearTimeout(o);o=null;A(L.newScrollPos);}o=setTimeout(I,200,null);i=L.newScrollPos;}}else{j=false;}};this.sendClientScrollPosUpdate=function(){c.getUtils().sendClientScrollPosUpdate(a,h,i,v);};function y(S){var C=c.getColumnHeaderArea();var Q=null;var W=[];for(var X=0;X<1;X++){Q=C.getCellWithColSpan(X,S,true);if(Q){W.push(Q.getUnescapedText());}else{W.push("?");}}var Y=c.getPropertyBag().getText(T.COL_TEXT_KEY)+" "+U.padWithZeroes(S+1,e)+"/"+C.getColCnt();if(!g){if(U.isMainMode()){p.getContent().setWrapping(false);}z(Y);if(U.isMainMode()){g=q(document.getElementById(p.getContent().getId())).outerWidth();}else{g=q(document.getElementById(p.getContent().getId())).innerWidth();}}if(U.isMainMode()){p.getContent().setMaxLines(W.length+1);p.getContent().setWrapping(true);}Y=Y+"\n"+W.join("\n");z(Y);}function z(Q){p.getContent().setProperty("text",Q,true);var S=P.Dock;if(g){p.getContent().setWidth(g+"px");}var W=c.getHScrollbar();var X=m.getRenderSizeDivSize().iWidth-m.getAreaWidth(c.getRowHeaderArea());var Y=q(document.getElementById(p.getContent().getId())).outerWidth();X=X-Y;var Z=W.getScrollPosition()/W.getSteps();var $=(X*Z)+" ";p.setPosition(S.BeginBottom,S.BeginTop,document.getElementById(c.getHScrollbar().getId()),$+"-20");if(p.getOpenState()===sap.ui.core.OpenState.CLOSED){p.open(-1);}p.getContent().rerender();}function A(S){var R=c.getRowHeaderArea();var Q=null;var W=[];for(var X=0;X<1;X++){Q=R.getCellWithRowSpan(S,X,true);if(Q){W.push(Q.getUnescapedText());}else{W.push("?");}}var Y=c.getPropertyBag().getText(T.ROW_TEXT_KEY)+" "+U.padWithZeroes(S+1,b)+"/"+R.getRowCnt();if(!f){if(U.isMainMode()){p.getContent().setWrapping(false);}E(Y);if(U.isMainMode()){f=q(document.getElementById(p.getContent().getId())).outerWidth();}else{f=q(document.getElementById(p.getContent().getId())).innerWidth();}}Y=Y+"\n"+W.join("\n");if(U.isMainMode()){p.getContent().setMaxLines(W.length+1);p.getContent().setWrapping(true);}E(Y);}function E(Q){p.getContent().setProperty("text",Q,true);var S=sap.ui.core.Popup.Dock;var W=c.getVScrollbar();var X=m.getRenderSizeDivSize().iHeight-m.getAreaHeight(c.getColumnHeaderArea());var Y=q(document.getElementById(p.getContent().getId())).outerHeight();X=X-Y;var Z=W.getScrollPosition()/W.getSteps();var $=" "+(X*Z);p.setPosition(S.EndTop,S.BeginTop,document.getElementById(c.getVScrollbar().getId()),"-20"+$);if(f){p.getContent().setWidth(f+"px");}if(p.getOpenState()===sap.ui.core.OpenState.CLOSED){p.open(-1);}p.getContent().rerender();}function F(Q){var S="";var W=1;var X=0;q(document.getElementById(Q.getId())).children("tbody").children("tr:last").children("td").each(function(Y,Z){S=q(Z).attr("colspan");if(!S){W=1;}else{W=parseInt(S,10);}X=X+W;});return X;}function G(){var Q=F(C);var S=F(D);var W=Q-S;if(W>0){r.beginRendering();r.appendLeftCols(D,W);C.setRenderStartCol(D.getRenderStartCol());C.setRenderColCnt(D.getRenderColCnt());r.adjustColWidths(C,D);r.adjustRowHeights(R,D);r.adjustRowHeights(d,C);r.finishRendering(true);}}function I(Q){c.getPageManager().enableTimeout(true);o=null;var S=null;if(!Q){S=L;}else{S=Q.getParameters();}if(S){c.postPlanningValue();var W=c.getVScrollbar();var X=W.getSteps();v=S.newScrollPos===X;i=S.newScrollPos;k.sendClientScrollPosUpdate();var Y=S.newScrollPos;if(Y!==R.getRenderStartRow()){if(Y!==R.getRowCnt()){r.beginRendering();r.renderRowHeaderArea(Y);r.renderDataArea();r.adjustColWidths(d,R);r.adjustColWidths(C,D);r.adjustRowHeights(R,D);r.finishRendering(true);}var Z=m.getAreaHeight(R);var $=m.getLowerScrollDivHeight();var _=Z<$;var a1=R.getRenderRowCnt()+R.getRenderStartRow()===R.getRowCnt();if(v||_&&a1){if(_&&Y>0){r.beginRendering();r.appendTopRows(R,2);r.appendTopRows(D,2);r.adjustColWidths(d,R);r.adjustColWidths(C,D);r.adjustRowHeights(R,D);r.finishRendering(true);}if(!v&&S.forward){K(0,true);}N(true);}else{N(false);}}else{if(v){N(true);}}if(S.newScrollPos===0){N(false);}if(h){G();x(true);}}p.close();J();}function J(){var Q=c.getRenderEngine().getHeaderScrollManager();if(Q){Q.moveScrollbars();}}function K(S,Q){var W=c.getVScrollbar();var X=W.getScrollPosition();var Y;if(Q){S=W.getSteps();v=true;}if(X!==S){W.setScrollPosition(S);j=true;}i=S;Y=c.getRenderEngine().getCrossRequestManager();if(Y){Y.setVScrollInfo(i,v);}}function N(S){k.positionVScrollDiv(S);}this.positionVScrollDiv=function(S){var Q=q(document.getElementById(c.getId()+"_lowerRight_scrollDiv"));var W=q(document.getElementById(c.getId()+"_lowerLeft_scrollDiv"));if(typeof(S)==="undefined"){S=v;}V=S?Q[0].scrollHeight:0;Q.scrollTop(V);W.scrollTop(V);};this.moveScrollbars=function(S,Q,W,X){var Y=c.getHScrollbar();if(Y){if(W!==undefined){h=W;}else{h=(Y.getSteps()<=a)&&(C.getRenderStartCol()+C.getRenderColCnt()>=C.getColCnt());}if(h){x(true);w(0,true);}else{w(a,false);}}var Z=c.getVScrollbar();if(Z){if(X!==undefined){v=X;}else{v=(Z.getSteps()<=i)&&(R.getRenderStartRow()+R.getRenderRowCnt()>=R.getRowCnt());}if(v){K(0,true);N(true);}else{K(i,false);}}};this.commandHScrolledToEnd=function(){h=true;};this.commandVScrolledToEnd=function(){v=true;};this.isVScrolledToEnd=function(){return v;};this.isHScrolledToEnd=function(){return h;};this.setVScrolledToEnd=function(Q){v=Q;};this.setHScrolledToEnd=function(Q){h=Q;};};return sap.zen.crosstab.rendering.ScrollManager;});