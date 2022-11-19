// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/mvc/JSView","sap/ui/model/analytics/odata4analytics","sap/ushell/components/tiles/indicatorTileUtils/smartBusinessUtil","sap/suite/ui/microchart/ComparisonMicroChartData","sap/suite/ui/microchart/ComparisonMicroChart","sap/m/GenericTile","sap/ui/model/json/JSONModel","sap/m/library"],function(J,o,s,C,a,G,b,M){"use strict";sap.ui.getCore().loadLibrary("sap.suite.ui.microchart");sap.ui.jsview("sap.ushell.components.tiles.indicatorcontribution.ContributionTile",{getControllerName:function(){return"sap.ushell.components.tiles.indicatorcontribution.ContributionTile";},createContent:function(){this.setHeight("100%");this.setWidth("100%");var S=M.Size;var t=this;t.oGenericTileData={};t.oCmprsDataTmpl=new C({title:"{title}",value:"{value}",color:"{color}",displayValue:"{displayValue}"});t.oCmprsChrtTmpl=new a({size:S.Responsive,scale:"{/scale}",data:{template:t.oCmprsDataTmpl,path:"/data"}});t.oNVConfS=new sap.ushell.components.tiles.sbtilecontent({unit:"{/unit}",size:"{/size}",footer:"{/footerComp}",content:t.oCmprsChrtTmpl});t.oGenericTile=new G({subheader:"{/subheader}",frameType:"{/frameType}",size:"{/size}",header:"{/header}",tileContent:[t.oNVConfS]});t.oGenericTileModel=new b();t.oGenericTileModel.setData(t.oGenericTileData);t.oGenericTile.setModel(t.oGenericTileModel);return t.oGenericTile;}});},true);
