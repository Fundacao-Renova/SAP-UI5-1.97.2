/*!
 * SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */
sap.ui.define(['sap/chart/coloring/ColoringUtils','sap/chart/data/MeasureSemantics','sap/chart/coloring/gradation/rankedMeasureValues/RankedMeasureUtils','sap/chart/ChartLog'],function(C,M,R,a){"use strict";var D={};var S=R.SingleColorScheme.SUPPORTED_SINGLE_SCHEMES;var b=R.SingleColorScheme.SUPPORTED_SATURATIONS;var E='colorings.Gradation.DelineatedMeasures';var v=function(s,d,o){if(o.bIsScatter){throw new a('error',E,'"DelineatedMeasures" could not apply to Scatter or Bubble.');}if(s.SingleColorScheme&&S.indexOf(s.SingleColorScheme)===-1){throw new a('error',E,'"SingleColorScheme" should be one of "'+S.join('" or "')+'".');}if(s.Saturation&&b.indexOf(s.Saturation)===-1){throw new a('error',E,'"Saturation" should be one of "'+b.join('" or "')+'".');}var m=d.aMsr.map(function(c){return c.getName();});var l=s.Levels;if(Array.isArray(l)&&l.length>=2&&l.length<=6){C.notIn(l,m,E,'Measure, ',', configured in "Levels" should be visible.');C.notIn(m,l,E,'Visible measure, ',', should be configured in "Levels".');if(C.hasDuplicatedValues(l)){throw new a("error",E,'The measure names contained in "Levels" have duplicated values.');}}else{throw new a("error",E,'The number of measure names contained in "Levels" should be between 2 to 6.');}if(C.hasSeriesDim(d)||(o.bTimeChart&&o.bWaterfall&&d.aDim.length>1)||(o.bIsPie&&d.aDim.length)){throw new a('error',E,'Semantic coloring could not be applied if chart already has coloring.');}};D.qualify=function(d,t,o,c){v(d,o,c);t.forEach(function(T){var m;Object.keys(M).forEach(function(k){var s=M[k];if(T[s]){if(!m){m=T[s];}else if(T[s]!==m){m+=', '+T[s];throw new a("error",E,'When '+m+' have semantic relationship, "DelineatedMeasures" could not be applied.');}}});});var e=[],l=d.Levels;l.forEach(function(m){e.push({msr:C.find(m,o.aMsr)});});e.SingleColorScheme=d.SingleColorScheme||S[0];e.Saturation=d.Saturation||b[0];e.Levels=l;return e;};D.parse=function(c){var m=c.msr.getName();var p={msr:c.msr,callbacks:D.getCallbacks(m),legend:{}};p.legend[m]=m;return p;};D.getCallbacks=function(m){var c={};c[m]=[function(o){return o.hasOwnProperty(m);}];return c;};return D;});
