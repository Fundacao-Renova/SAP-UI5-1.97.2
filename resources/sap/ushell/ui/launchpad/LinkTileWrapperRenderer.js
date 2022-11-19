// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/m/GenericTile","sap/m/library","sap/ushell/resources"],function(L,G,m,u){"use strict";var a=m.GenericTileMode;var b=m.LoadState;var c={};c.render=function(r,C){var t=null;var M=C.getModel();function d(){t=new G({header:u.i18n.getText("cannotLoadTile"),mode:a.LineMode,state:b.Failed});}try{t=C.getTileViews()[0];}catch(e){L.warning("Failed to load tile view: ",e.message);d();}if(!t){L.warning("Failed to load tile view: the control has no tileViews");d();}r.write("<div");if(M&&M.getProperty("/enableHelp")){r.writeAttribute("data-help-id",C.getTileCatalogId());}r.writeControlData(C);r.addClass("sapUshellLinkTile");if(!C.getVisible()){r.addClass("sapUshellHidden");}if(C.getIsLocked()){r.addClass("sapUshellLockedTile");}r.writeClasses();r.writeAttributeEscaped("tabindex","-1");r.write(">");r.renderControl(t);r.write("</div>");};return c;},true);