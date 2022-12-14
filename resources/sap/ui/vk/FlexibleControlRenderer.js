/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define([],function(){"use strict";var F={};F.render=function(r,f){var a=r;a.write("<div");a.writeControlData(f);a.addClass("sapUiFlexControl");if(f.getWidth()&&f.getWidth()!=""){a.addStyle("width",f.getWidth());}if(f.getHeight()&&f.getHeight()!=""){a.addStyle("height",f.getHeight());}a.writeStyles();a.writeClasses();a.write(">");var c=f.getContent();var l=f.getLayout();var b="sapUiFlexCellStacked";if(l=="Vertical"){b="sapUiFlexCellVertical";}for(var i=0;i<c.length;i++){var d=c[i];a.write("<div id=\""+f.getId()+"Content_"+i+"\" class=\""+b+"\"");var e=d.getLayoutData();if(e&&l!="Stacked"){if(e.getSize()&&e.getSize()!=""){a.addStyle("height",e.getSize());}if(e.getMinSize()&&e.getMinSize()!=""){a.addStyle("min-height",e.getMinSize());}if(e.getMarginTop()&&e.getMarginTop()!=""){a.addStyle("margin-top",e.getMarginTop());}if(e.getMarginBottom()&&e.getMarginBottom()!=""){a.addStyle("margin-bottom",e.getMarginBottom());}a.writeStyles();}a.write(">");a.renderControl(d);a.write("</div>");}a.write("</div>");};return F;},true);
