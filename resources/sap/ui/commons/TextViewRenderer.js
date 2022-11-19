/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Renderer','sap/ui/commons/library'],function(R,l){"use strict";var T=l.TextViewDesign;var a=l.TextViewColor;var b={};b.render=function(r,t){this.applyEnabledStyles(r,t);this.applyTextDesign(r,t);if(!t.getWrapping()){r.addClass("sapUiTvWrap");}if(t.getWidth()){r.addStyle("width",t.getWidth());}r.write("<span");r.writeControlData(t);r.addClass("sapUiTv");if(t.getTooltip_AsString()){r.writeAttributeEscaped("title",t.getTooltip_AsString());}else if(t.getText()){r.writeAttributeEscaped("title",t.getText());}var s=t.getTextDirection();if(s){r.addStyle("direction",s.toLowerCase());}var A=b.getTextAlign(t.getTextAlign(),s);if(A){A=A.charAt(0).toUpperCase()+A.substring(1);r.addClass("sapUiTvAlign"+A);}r.writeAttribute('tabindex','-1');r.writeAccessibilityState(t,{role:t.getAccessibleRole()?t.getAccessibleRole().toLowerCase():undefined,invalid:t.getSemanticColor()==a.Negative,disabled:!t.getEnabled()});r.writeClasses();r.writeStyles();r.write(">");r.writeEscaped(t.getText(),true);r.write("</span>");};b.applyTextDesign=function(r,t){var d=t.getDesign();if(d==T.Standard){return;}switch(d){case(T.Bold):r.addClass("sapUiTvEmph");break;case(T.H1):r.addClass("sapUiTvH1");break;case(T.H2):r.addClass("sapUiTvH2");break;case(T.H3):r.addClass("sapUiTvH3");break;case(T.H4):r.addClass("sapUiTvH4");break;case(T.H5):r.addClass("sapUiTvH5");break;case(T.H6):r.addClass("sapUiTvH6");break;case(T.Italic):r.addClass("sapUiTvItalic");break;case(T.Small):r.addClass("sapUiTvSmall");break;case(T.Monospace):r.addClass("sapUiTvMono");break;case(T.Underline):r.addClass("sapUiTvULine");break;default:break;}};b.applyEnabledStyles=function(r,t){if(!t.getEnabled()){r.addClass("sapUiTvDsbl");t.allowTextSelection(false);}else{switch(t.getSemanticColor()){case(a.Negative):r.addClass('sapUiTvErr');break;case(a.Positive):r.addClass('sapUiTvSucc');break;case(a.Critical):r.addClass('sapUiTvWarn');break;}}};b.getTextAlign=R.getTextAlign;return b;},true);
