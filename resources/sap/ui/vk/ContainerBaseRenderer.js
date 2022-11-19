/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(function(){"use strict";var C={};C.render=function(r,c){var t=c.getTooltip_AsString();var T=c.getTitle();var l=c.getAriaLabelledBy();var d=c.getAriaDescribedBy();r.write("<div");r.writeControlData(c);r.writeAttribute("role",sap.ui.core.AccessibleRole.Group);if(T){r.writeAttributeEscaped("aria-label",T);}else if(t){r.writeAttributeEscaped("aria-label",t);}if(l&&l.length>0){r.writeAttributeEscaped("aria-labelledby",l.join(" "));}if(d&&d.length>0){r.writeAttributeEscaped("aria-describedby",d.join(" "));}r.addClass("sapUiVkContainerBase");r.writeClasses(c);r.write(">");r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-wrapper");r.writeAttribute("role",sap.ui.core.AccessibleRole.Presentation);r.addClass("sapUiVkContainerBaseWrapper");r.writeClasses();r.write(">");this.writeContentArea(r,c);this.writeToolbarArea(r,c);r.write("</div>");r.write("</div>");};C.writeContentArea=function(r,c){var s=c.getSelectedContent();r.write("<div");r.addClass("sapUiVkContainerBaseContentArea");r.writeAttribute("role",sap.ui.core.AccessibleRole.Img);r.writeClasses();r.write(">");if(s!==null){r.renderControl(s);}else if(c.getContent().length>0){s=c.getContent()[0];r.renderControl(s);}r.write("</div>");};C.writeToolbarArea=function(r,c){r.write("<div");r.addClass("sapUiVkContainerBaseToolbarArea");r.writeAttribute("role",sap.ui.core.AccessibleRole.Group);r.writeClasses();r.write(">");r.renderControl(c._oToolbar);r.write("</div>");};return C;},true);