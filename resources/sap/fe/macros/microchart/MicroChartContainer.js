/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/core/Control","sap/m/library","sap/base/Log","sap/m/Label","sap/m/FlexBox","sap/ui/core/format/DateFormat","sap/ui/core/format/NumberFormat","sap/suite/ui/microchart/AreaMicroChart","sap/suite/ui/microchart/ColumnMicroChart","sap/suite/ui/microchart/LineMicroChart","sap/suite/ui/microchart/ComparisonMicroChart","sap/ui/model/odata/v4/ODataListBinding","sap/ui/model/odata/v4/ODataMetaModel"],function(C,m,L,a,F,D,N,A,b,c,d,O,e){"use strict";var V=m.ValueColor;var M=C.extend("sap.fe.macros.microchart.MicroChartContainer",{metadata:{properties:{showOnlyChart:{type:"boolean",defaultValue:false},uomPath:{type:"string",defaultValue:undefined},measures:{type:"string[]",defaultValue:[]},dimension:{type:"string",defaultValue:undefined},dataPointQualifiers:{type:"string[]",defaultValue:[]},measurePrecision:{type:"int",defaultValue:undefined},measureScale:{type:"int",defaultValue:1},dimensionPrecision:{type:"int",defaultValue:undefined},chartTitle:{type:"string",defaultValue:""},chartDescription:{type:"string",defaultValue:""},navigationType:{type:"sap.fe.macros.NavigationType",defaultValue:"None"}},events:{onTitlePressed:{type:"function"}},defaultAggregation:"microChart",aggregations:{microChart:{type:"sap.ui.core.Control",multiple:false},_uomLabel:{type:"sap.m.Label",multiple:false},microChartTitle:{type:"sap.ui.core.Control"}},publicMethods:[]},renderer:{render:function(r,o){r.write("<div");r.writeControlData(o);r.writeClasses();r.write(">");if(!o.getShowOnlyChart()){var f=o.getAggregation("microChartTitle");if(f){f.map(function(f){r.write("<div>");r.renderControl(f);r.write("</div>");});}r.write("<div>");var g=new a({text:o.getChartDescription()});r.renderControl(g);r.write("</div>");}var h=o.getMicroChart();if(h){h.addStyleClass("sapUiTinyMarginTopBottom");r.renderControl(h);if(!o.getShowOnlyChart()&&o.getUomPath()){var s=o._checkIfChartRequiresRuntimeLabels()?undefined:{text:{path:o.getUomPath()}},l=new a(s),i=new F({alignItems:"Start",justifyContent:"End",items:[l]});r.renderControl(i);o.setAggregation("_uomLabel",l);}}r.write("</div>");}}});M.prototype.onBeforeRendering=function(){var t=this,B=t._getListBindingForRuntimeLabels();if(B){B.detachEvent("change",t._setRuntimeChartLabelsAndUnitOfMeasure,t);t._olistBinding=undefined;}};M.prototype.onAfterRendering=function(){var t=this,B=t._getListBindingForRuntimeLabels();if(!t._checkIfChartRequiresRuntimeLabels()){return;}if(B){B.attachEvent("change",t._setRuntimeChartLabelsAndUnitOfMeasure,t);t._olistBinding=B;}};M.prototype.setShowOnlyChart=function(v){var t=this;if(!v&&t._olistBinding){t._setChartLabels();}this.setProperty("showOnlyChart",v,false);};M.prototype._checkIfChartRequiresRuntimeLabels=function(){var t=this,o=t.getMicroChart();return Boolean(o instanceof A||o instanceof b||o instanceof c||o instanceof d);};M.prototype._checkForChartLabelAggregations=function(){var t=this,o=t.getMicroChart();return Boolean((o instanceof A&&o.getAggregation("firstYLabel")&&o.getAggregation("lastYLabel")&&o.getAggregation("firstXLabel")&&o.getAggregation("lastXLabel"))||(o instanceof b&&o.getAggregation("leftTopLabel")&&o.getAggregation("rightTopLabel")&&o.getAggregation("leftBottomLabel")&&o.getAggregation("rightBottomLabel"))||o instanceof c);};M.prototype._getListBindingForRuntimeLabels=function(){var t=this,o=t.getMicroChart(),B;if(o instanceof A){var f=o.getChart();B=f&&o.getChart().getBinding("points");}else if(o instanceof b){B=o.getBinding("columns");}else if(o instanceof c){var l=o.getLines();B=l&&l.length&&l[0].getBinding("points");}else if(o instanceof d){B=o.getBinding("data");}return B instanceof O?B:false;};M.prototype._setRuntimeChartLabelsAndUnitOfMeasure=function(){var t=this,l=t._olistBinding,f=l.getContexts(),g=t.getMeasures()||[],s=t.getDimension(),u=this.getUomPath(),o=t.getMicroChart(),U=t.getAggregation("_uomLabel");if(U&&u&&f.length&&!this.getShowOnlyChart()){U.setText(f[0].getObject(u));}else if(U){U.setText("");}if(!t._checkForChartLabelAggregations()){return;}if(!f.length){t._setChartLabels();return;}var h=f[0],j=f[f.length-1],k={value:Infinity},n={value:-Infinity},p={value:Infinity},q={value:-Infinity},r=[],v=o instanceof c,w=h.getObject(s),x=j.getObject(s),y,z;k=w==undefined?k:{context:h,value:w};n=x==undefined?n:{context:j,value:x};g.forEach(function(B,i){y=h.getObject(B);z=j.getObject(B);q=z>q.value?{context:j,value:z,index:v?i:0}:q;p=y<p.value?{context:h,value:y,index:v?i:0}:p;if(v){r.push(t._getCriticalityFromPoint({context:j,value:z,index:i}));}});t._setChartLabels(p.value,q.value,k.value,n.value);if(v){return Promise.all(r).then(function(B){var E=o.getLines();E.forEach(function(G,i){G.setColor(B[i]);});});}else{return t._setChartLabelsColors(q,p);}};M.prototype._setChartLabelsColors=function(o,f){var t=this,g=t.getMicroChart();return Promise.all([t._getCriticalityFromPoint(f),t._getCriticalityFromPoint(o)]).then(function(h){if(g instanceof A){g.getAggregation("firstYLabel").setProperty("color",h[0],true);g.getAggregation("lastYLabel").setProperty("color",h[1],true);}else if(g instanceof b){g.getAggregation("leftTopLabel").setProperty("color",h[0],true);g.getAggregation("rightTopLabel").setProperty("color",h[1],true);}});};M.prototype._setChartLabels=function(l,r,f,g){var t=this,o=t.getMicroChart();l=t._formatDateAndNumberValue(l,t.getMeasurePrecision(),t.getMeasureScale());r=t._formatDateAndNumberValue(r,t.getMeasurePrecision(),t.getMeasureScale());f=t._formatDateAndNumberValue(f,t.getDimensionPrecision());g=t._formatDateAndNumberValue(g,t.getDimensionPrecision());if(o instanceof A){o.getAggregation("firstYLabel").setProperty("label",l,false);o.getAggregation("lastYLabel").setProperty("label",r,false);o.getAggregation("firstXLabel").setProperty("label",f,false);o.getAggregation("lastXLabel").setProperty("label",g,false);}else if(o instanceof b){o.getAggregation("leftTopLabel").setProperty("label",l,false);o.getAggregation("rightTopLabel").setProperty("label",r,false);o.getAggregation("leftBottomLabel").setProperty("label",f,false);o.getAggregation("rightBottomLabel").setProperty("label",g,false);}else if(o instanceof c){o.setProperty("leftTopLabel",l,false);o.setProperty("rightTopLabel",r,false);o.setProperty("leftBottomLabel",f,false);o.setProperty("rightBottomLabel",g,false);}};M.prototype._getCriticalityFromPoint=function(p){var t=this,r=Promise.resolve(V.Neutral),o=t.getModel()&&t.getModel().getMetaModel(),f=t.getDataPointQualifiers(),s=o instanceof e&&p&&p.context&&p.context.getPath()&&o.getMetaPath(p.context.getPath());if(typeof s==="string"){r=o.requestObject(s+"/@com.sap.vocabularies.UI.v1.DataPoint"+(f[p.index]?"#"+f[p.index]:"")).then(function(g){var h=V.Neutral,i=p.context;if(g.Criticality){h=t._criticality(g.Criticality,i);}else if(g.CriticalityCalculation){var j=g.CriticalityCalculation,k={},G=function(P){var R;if(P.$Path){R=i.getObject(P.$Path);}else if(P.hasOwnProperty("$Decimal")){R=P.$Decimal;}return R;};k.sAcceptanceHigh=j.AcceptanceRangeHighValue?G(j.AcceptanceRangeHighValue):undefined;k.sAcceptanceLow=j.AcceptanceRangeLowValue?G(j.AcceptanceRangeLowValue):undefined;k.sDeviationHigh=j.DeviationRangeHighValue?G(j.DeviationRangeHighValue):undefined;k.sDeviationLow=j.DeviationRangeLowValue?G(j.DeviationRangeLowValue):undefined;k.sToleranceHigh=j.ToleranceRangeHighValue?G(j.ToleranceRangeHighValue):undefined;k.sToleranceLow=j.ToleranceRangeLowValue?G(j.ToleranceRangeLowValue):undefined;k.sImprovementDirection=j.ImprovementDirection.$EnumMember;h=t._criticalityCalculation(k.sImprovementDirection,p.value,k.sDeviationLow,k.sToleranceLow,k.sAcceptanceLow,k.sAcceptanceHigh,k.sToleranceHigh,k.sDeviationHigh);}return h;});}return r;};M.prototype._criticality=function(o,f){var i,s=V.Neutral;if(o.$Path){var g=o.$Path;i=f.getObject(g);if(i==="Negative"||i==="1"||i===1){s=V.Error;}else if(i==="Critical"||i==="2"||i===2){s=V.Critical;}else if(i==="Positive"||i==="3"||i===3){s=V.Good;}}else if(o.$EnumMember){i=o.$EnumMember;if(i.indexOf("com.sap.vocabularies.UI.v1.CriticalityType/Negative")>-1){s=V.Error;}else if(i.indexOf("com.sap.vocabularies.UI.v1.CriticalityType/Positive")>-1){s=V.Good;}else if(i.indexOf("com.sap.vocabularies.UI.v1.CriticalityType/Critical")>-1){s=V.Critical;}}else{L.warning("Case not supported, returning the default Value Neutral");}return s;};M.prototype._criticalityCalculation=function(i,v,s,t,f,g,T,h){var j=V.Neutral;s=s==undefined?-Infinity:s;t=t==undefined?s:t;f=f==undefined?t:f;h=h==undefined?Infinity:h;T=T==undefined?h:T;g=g==undefined?T:g;if(i.indexOf("Minimize")>-1){if(v<=g){j=V.Good;}else if(v<=T){j=V.Neutral;}else if(h&&v<=h){j=V.Critical;}else{j=V.Error;}}else if(i.indexOf("Maximize")>-1){if(v>=f){j=V.Good;}else if(v>=t){j=V.Neutral;}else if(h&&v>=s){j=V.Critical;}else{j=V.Error;}}else if(i.indexOf("Target")>-1){if(v<=g&&v>=f){j=V.Good;}else if((v>=t&&v<f)||(v>g&&v<=T)){j=V.Neutral;}else if((s&&v>=s&&v<t)||(v>T&&h&&v<=h)){j=V.Critical;}else{j=V.Error;}}else{L.warning("Case not supported, returning the default Value Neutral");}return j;};M.prototype._formatDateAndNumberValue=function(v,p,s){var t=this;if(v instanceof Date){return t._getLabelDateFormatter().format(v);}else if(!isNaN(v)){return t._getLabelNumberFormatter(p,s).format(v);}else{return v;}};M.prototype._getLabelDateFormatter=function(){if(!M._dateFormatter){M._dateFormatter=D.getInstance({style:"short"});}return M._dateFormatter;};M.prototype._getLabelNumberFormatter=function(p,s){return N.getInstance({style:"short",showScale:true,precision:typeof p==="number"?p:null,decimals:typeof s==="number"?s:null});};return M;},true);