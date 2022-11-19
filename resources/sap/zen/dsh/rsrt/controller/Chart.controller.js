/*!
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define("sap/zen/dsh/rsrt/controller/Chart.controller",["jquery.sap.global","sap/base/Log","sap/ui/core/mvc/Controller","sap/viz/ui5/controls/common/feeds/FeedItem","sap/zen/dsh/utils/ErrorHandler","sap/zen/commons/thirdparty/lodash"],function(q,L,C,F,E,_){"use strict";C.extend("sap.zen.dsh.rsrt.controller.Chart",{onInit:function(){var t=this;var v=t.getView();v.getModel("om").attachRequestCompleted(function(){var V=v.byId("idVizFrame");V.destroyFeeds();var f=v.getModel("om").getProperty("/dataProvider/0/Chart/Feeds");_.forEach(f,function(o){V.addFeed(new F({type:o.type,uid:o.uid,values:o.values}));});_.forEach(v.byId("flatDS").getDimensions(),function(d){d.bindProperty("value","om>"+d.getIdentity());});_.forEach(v.byId("flatDS").getMeasures(),function(m){m.bindProperty("value","om>"+m.getIdentity());});t.updateChart();});},updateChart:function(){var t=this;t.getOwnerComponent().getRootControl().byId("ChartView").byId("idVizFrame").setVizProperties(_.clone(t.getView().getModel("om").getDataProvider(0).Chart.vizProperties));t.getView().invalidate();},onChartPress:function(){var t=this;t.getOwnerComponent().getChartSettings().openDialog(t).then(t.updateChart.bind(t)).catch(E.handleWithPopup);},onBeforeRendering:function(){var t=this;t.getView().setBusy(true);},onAfterRendering:function(){var t=this;t.adjustHeight();var a=this.getOwnerComponent().getRootControl().byId("megaBox").getDomRef();var A=q(a);A.sizeChanged(function(){t.adjustHeight();});},adjustHeight:function(){var v=this.getView();var d=v.getDomRef();if(d){q(d).height(q(this.getOwnerComponent().getRootControl().byId("megaBox").getDomRef()).viewportHeight());}v.setBusy(false);}});return sap.zen.dsh.rsrt.controller.Chart;});