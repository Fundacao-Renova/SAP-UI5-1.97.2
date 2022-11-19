/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/library','sap/ui/layout/library','sap/ui/layout/form/Form','sap/ui/core/IconPool'],function(c,l,F,I){"use strict";var T=c.TitleLevel;var B=l.BackgroundDesign;var a={apiVersion:2};a.render=function(r,L){var f=L.getParent();if(f&&f instanceof F){this.renderForm(r,L,f);}};a.renderForm=function(r,L,f){var t=f.getToolbar();r.openStart("div",L);r.class(this.getMainClass());if(t){r.class("sapUiFormToolbar");}this.addBackgroundClass(r,L);r.openEnd();this.renderHeader(r,t,f.getTitle(),undefined,false,L._sFormTitleSize,f.getId());this.renderContainers(r,L,f);r.close("div");};a.getMainClass=function(){return"sapUiFormLayout";};a.addBackgroundClass=function(r,L){var b=L.getBackgroundDesign();if(b!=B.Transparent){r.class("sapUiFormBackgr"+b);}};a.renderContainers=function(r,L,f){var C=f.getVisibleFormContainers();for(var i=0,b=C.length;i<b;i++){var o=C[i];this.renderContainer(r,L,o);}};a.renderContainer=function(r,L,C){var e=C.getExpandable();var t=C.getToolbar();var o=C.getTitle();r.openStart("section",C);r.class("sapUiFormContainer");if(t){r.class("sapUiFormContainerToolbar");}else if(o){r.class("sapUiFormContainerTitle");}if(C.getTooltip_AsString()){r.attr('title',C.getTooltip_AsString());}this.writeAccessibilityStateContainer(r,C);r.openEnd();this.renderHeader(r,t,o,C._oExpandButton,e,L._sFormSubTitleSize,C.getId());if(e){r.openStart("div",C.getId()+"-content");if(!C.getExpanded()){r.style("display","none");}r.openEnd();}var E=C.getVisibleFormElements();for(var j=0,b=E.length;j<b;j++){var d=E[j];this.renderElement(r,L,d);}if(e){r.close("div");}r.close("section");};a.renderElement=function(r,L,e){var o=e.getLabelControl();r.openStart("div",e);r.class("sapUiFormElement");if(o){r.class("sapUiFormElementLbl");}r.openEnd();if(o){r.renderControl(o);}var f=e.getFieldsForRendering();if(f&&f.length>0){for(var k=0,b=f.length;k<b;k++){var d=f[k];r.renderControl(d);}}r.close("div");};a.renderTitle=function(r,t,e,E,L,C){if(t){if(typeof t!=="string"&&t.getLevel()!=T.Auto){L=t.getLevel();}if(!L){L="H5";}if(typeof t!=="string"){r.openStart(L.toLowerCase(),t);if(t.getTooltip_AsString()){r.attr('title',t.getTooltip_AsString());}if(t.getEmphasized()){r.class("sapUiFormTitleEmph");}}else{r.openStart(L.toLowerCase(),C+"--title");}r.class("sapUiFormTitle");r.class("sapUiFormTitle"+L);if(E&&e){r.class("sapUiFormTitleExpandable");}r.openEnd();if(E&&e){r.renderControl(e);}if(typeof t==="string"){t.split(/\n/).forEach(function(s,d){if(d>0){r.voidStart("br").voidEnd();}r.text(s);});}else{var i=t.getIcon();if(i){var b=[];var A={"title":null};A["id"]=t.getId()+"-ico";r.icon(i,b,A);}t.getText().split(/\n/).forEach(function(s,d){if(d>0){r.voidStart("br").voidEnd();}r.text(s);});}r.close(L.toLowerCase());}};a.renderHeader=function(r,t,o,e,E,L,C){if(t){r.renderControl(t);}else{this.renderTitle(r,o,e,E,L,C);}};a.writeAccessibilityStateContainer=function(r,C){var A={};var t=C.getTitle();var o=C.getToolbar();if(o){if(!C.getAriaLabelledBy()||C.getAriaLabelledBy().length==0){var s=l.form.FormHelper.getToolbarTitle(o);A["labelledby"]={value:s,append:true};}}else if(t){var i="";if(typeof t=="string"){i=C.getId()+"--title";}else{i=t.getId();}A["labelledby"]={value:i,append:true};}if(A["labelledby"]||C.getAriaLabelledBy().length>0){A["role"]="form";}r.accessibilityState(C,A);};return a;},true);
