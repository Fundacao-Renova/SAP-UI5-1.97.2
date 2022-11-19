sap.ui.define([],
function () {
    "use strict";
	var oChartConfiguration = {
		getChartsConfiguration : function() {
			return {
				"Line": {
					"default": {
						"type": "line",
						"vizProperties":[{"path":"plotArea.isSmoothed", "value" : false}],
						"properties": {
							"semanticPattern": true
						},
						"dimensions": {
							"min": 1,
							"defaultRole": "Category"
						},
						"measures": {
							"min": 1
						},
						"resize":{
							"dataStep": 10
						},
						"feeds": [{
							"uid": "valueAxis",
							"type": "measure",
							"vizProperties":[{"path":"valueAxis.layout.maxWidth", "value" : 0.4},{"path":"valueAxis.label.allowDecimals","value": true}]
						}, {
							"uid": "categoryAxis",
							"min": 1,
							"type": "dimension",
							"role": "Category"
						}, {
							"uid": "color",
							"type": "dimension",
							"role": "Series"
						}]
					},
					"time": {
						"type": "timeseries_line",
						"vizProperties":[{"path":"plotArea.isSmoothed", "value" : false},{"path":"timeAxis.levels", "value" : []}],
						"dimensions": {
							"min": 1,
							"defaultRole": "Category"
						},
						"measures": {
							"min": 1
						},
						"resize":{
							"dataStep": 10
						},
						"feeds":  [{
							"uid": "valueAxis",
							"type": "measure",
							"vizProperties":[{"path":"valueAxis.layout.maxWidth", "value" : 0.4}]
						}, {
							"uid": "timeAxis",
							"min": 1,
							"max": 1,
							"type": "dimension"
						},
						{
						  "uid": "color",
						  "type": "dimension",
						  "role": "Series"
						}]
					}
				},
				"Bubble": {
					"default": {
						"type": "bubble",
						"properties": {
							"hideLabel": false
						},
						"vizProperties":[{"path":"plotArea.adjustScale", "value" : true}],
						"dimensions": {
							"max": 4
						},
						"measures": {
							"min": 3,
							"max": 3,
							"defaultRole": "Axis1"
						},
						"resize":{
							"dataStep": 10
						},
						"feeds": [{
							"uid": "valueAxis",
							"min": 1,
							"max": 1,
							"type": "measure",
							"role": "Axis1|Axis2|Axis3",
							"vizProperties":[{"path":"valueAxis.layout.maxWidth", "value" : 0.4}]
						}, {
							"uid": "valueAxis2",
							"min": 1,
							"max": 1,
							"type": "measure",
							"role": "Axis2|Axis1|Axis3",
							"vizProperties":[{"path":"valueAxis2.layout.maxWidth", "value" : 0.4}]
						}, {
							"uid": "bubbleWidth",
							"min": 1,
							"max": 1,
							"type": "measure",
							"role": "Axis3|Axis1|Axis2"
						}, {
							"uid": "shape",
							"max": 2,
							"type": "dimension",
							"role": "Category"
						}, {
							"uid": "color",
							"max": 2,
							"type": "dimension",
							"role": "Series",
							"vizProperties":[{"path":"plotArea.colorDepth", "method" : "count", "min":1,"max":2}]
						}]
					},
					"time": {
						"type": "timeseries_bubble",
						"properties": {
							"hideLabel": false
						},
						"dimensions": {
							"min": 1,
							"max": 1,
							"defaultRole": "Series"
						},
						"measures": {
							"min": 2,
							"max": 2,
							"defaultRole": "Axis1"
						},
						"resize":{
							"dataStep": 10
						},
						"feeds":  [{
							"uid": "valueAxis",
							"min": 1,
							"max": 1,
							"type": "measure",
							"vizProperties":[{"path":"valueAxis.layout.maxWidth", "value" : 0.4},{"path":"timeAxis.levels", "value" : []}]
						}, {
							"uid": "timeAxis",
							"min": 1,
							"max": 1,
							"type": "dimension"
						}, {
							"uid": "bubbleWidth",
							"min": 1,
							"max": 1,
							"type": "measure",
							"role": "Axis3|Axis1|Axis2"
						}]
					}
				},
				"Donut": {
					"default": {
						"type": "donut",
						"vizProperties":[{"path":"plotArea.dataLabel.type", "value" : "value"}],
						"dimensions": {
							"min": 1
						},
						"measures": {
							"min": 1,
							"max": 1
						},
						"resize":{
							"dataStep": 10
						},
						"feeds": [{
							"uid": "size",
							"min": 1,
							"max": 1,
							"type": "measure"
						}, {
							"uid": "color",
							"min": 1,
							"type": "dimension"
						}]
					}
				},
				"Column": {
					"default": {
						"type": "column",
						"properties":{
							"semanticColor": true,
							"semanticPattern": true
						},
						"dimensions": {
							"min": 1,
							"defaultRole": "Category"
						},
						"measures": {
							"min": 1,
							"defaultRole": "Axis1"
						},
						"resize":{
							"dataStep": 10
						},
						"feeds": [{
							"uid": "valueAxis",
							"min": 1,
							"type": "measure",
							"vizProperties":[{"path":"valueAxis.layout.maxWidth", "value" : 0.4}]
						}, {
							"uid": "categoryAxis",
							"min": 1,
							"type": "dimension",
							"role": "Category"
						},{
							"uid": "color",
							"min": 1,
							"type": "dimension",
							"role": "Series"
						}]
					},
					"time": {
						"type": "timeseries_column",
						"properties":{
							"semanticColor": true
						},
						"dimensions": {
							"min": 1,
							"max": 1,
							"defaultRole": "Category"
						},
						"measures": {
							"min": 1,
							"defaultRole": "Axis1"
						},
						"resize":{
							"dataStep": 10
						},
						"feeds":  [{
							"uid": "valueAxis",
							"type": "measure",
							"vizProperties":[{"path":"valueAxis.layout.maxWidth", "value" : 0.4},{"path":"timeAxis.levels", "value" : []}]
						}, {
							"uid": "timeAxis",
							"min": 1,
							"max": 1,
							"type": "dimension"
						}]
					}
				},
				"Bar": {
					"default": {
						"type": "bar",
						"properties":{
							"semanticColor": true,
							"semanticPattern": true
						},
						"dimensions": {
							"min": 1,
							"defaultRole": "Category"
						},
						"measures": {
							"min": 1,
							"defaultRole": "Axis1"
						},
						"resize":{
							"dataStep": 10
						},
						"feeds": [{
							"uid": "valueAxis",
							"min": 1,
							"type": "measure",
							"vizProperties":[{"path":"valueAxis.layout.maxWidth", "value" : 0.4}]
						}, {
							"uid": "categoryAxis",
							"min": 1,
							"type": "dimension",
							"role": "Category",
							"vizProperties":[{"path":"categoryAxis.layout.width", "value" : 0.33}]
						},{
							"uid": "color",
							"min": 1,
							"type": "dimension",
							"role": "Series"
						}]
					}
				},
				"ColumnStacked": {
					"default": {
						"type": "stacked_column",
						"dimensions": {
							"min": 1,
							"defaultRole": "Category"
						},
						"measures": {
							"min": 1,
							"defaultRole": "Axis1"
						},
						"resize":{
							"dataStep": 10
						},
						"feeds": [{
							"uid": "valueAxis",
							"min": 1,
							"type": "measure",
							"vizProperties":[{"path":"valueAxis.layout.maxWidth", "value" : 0.4}]
						}, {
							"uid": "categoryAxis",
							"min": 1,
							"type": "dimension",
							"role": "Category"
						}, {
							"uid": "color",
							"type": "dimension",
							"role": "Series"
						}]
					},
					"time": {
						"type": "timeseries_stacked_column",
						"properties":{
							"semanticColor": true
						},
						"dimensions": {
							"min": 1,
							"defaultRole": "Category"
						},
						"measures": {
							"min": 1,
							"defaultRole": "Axis1"
						},
						"resize":{
							"dataStep": 10
						},
						"feeds":  [{
							"uid": "valueAxis",
							"type": "measure",
							"vizProperties":[{"path":"valueAxis.layout.maxWidth", "value" : 0.4},{"path":"timeAxis.levels", "value" : []}]
						}, {
							"uid": "timeAxis",
							"min": 1,
							"max": 1,
							"type": "dimension",
							"role": "Category"
						}, {
							"uid": "color",
							"min": 0,
							"type": "dimension",
							"role": "Series"
						}]
					}
				},
				"VerticalBullet": {
					"default": {
						"type": "vertical_bullet",
						"properties": {
							"semanticPattern": true
						},
						"dimensions": {
							"min": 1,
							"defaultRole": "Category"
						},
						"measures": {
							"min": 1,
							"defaultRole": "Axis1"
						},
						"resize":{
							"dataStep": 10
						},
						"feeds": [{
							"uid": "actualValues",
							"min": 1,
							"type": "measure",
							"role": "Axis1"
						}, {
							"uid": "targetValues",
							"type": "measure",
							"role": "Axis2"
						}, {
							"uid": "categoryAxis",
							"min": 1,
							"type": "dimension",
							"role": "Category"
						},{
							"uid": "color",
							"min" : 1,
							"type": "dimension",
							"role": "Series"
						}]
					},
					"time": {
						"type": "timeseries_bullet",
						"dimensions": {
							"min": 1,
							"defaultRole": "Category"
						},
						"measures": {
							"min": 1,
							"defaultRole": "Axis1"
						},
						"resize":{
							"dataStep": 10
						},
						"feeds":  [
						{
							"uid": "actualValues",
							"min": 1,
							"type": "measure",
							"role": "Axis1",
							"vizProperties":[{"path":"valueAxis.layout.maxWidth", "value" : 0.4}]
						}, {
							"uid": "targetValues",
							"type": "measure",
							"role": "Axis2"
						}, {
							"uid": "timeAxis",
							"min": 1,
							"max": 1,
							"type": "dimension",
							"role": "Category"
						}, {
							"uid": "color",
							"min" : 0,
							"type": "dimension",
							"role": "Series"
						}]
					}
				},
				"Combination": {
					"default":{
						"type": "combination",
						"dimensions": {
							"min": 1,
							"defaultRole": "Category"
						},
						"measures": {
							"min": 2,
							"defaultRole": "Axis1"
						},
						"resize":{
							"dataStep": 10
						},
						"feeds": [{
							"uid": "valueAxis",
							"type": "measure",
							"min": 2,
							"vizProperties":[{"path":"valueAxis.layout.maxWidth", "value" : 0.4}]
						},
						{
							"uid": "color",
							"type": "dimension",
							"role": "Series"
						},
						 {
							"uid": "categoryAxis",
							"min": 1,
							"type": "dimension",
							"role": "Category"
						}]
					},
					"time": {
						"type": "timeseries_combination",
						"dimensions": {
							"min": 1,
							"max": 1,
							"defaultRole": "Category"
						},
						"measures": {
							"min": 2,
							"defaultRole": "Axis1"
						},
						"resize":{
							"dataStep": 10
						},
						"feeds":  [{
							"uid": "valueAxis",
							"min":2,
							"type": "measure",
							"vizProperties":[{"path":"valueAxis.layout.maxWidth", "value" : 0.4},{"path":"timeAxis.levels", "value" : []}]
						},
						 {
							"uid": "timeAxis",
							"min": 1,
							"max": 1,
							"type": "dimension"
						}]
					}
				},
				"Scatter":{
					"default": {
						"type": "scatter",
						"vizProperties":[{"path":"plotArea.markerSize", "value" : ""}],
						"properties": {
							"hideLabel": false
						},
						"dimensions": {
							"min": 1,
							"max": 2
						},
						"measures": {
							"min": 2,
							"max": 2,
							"defaultRole": "Axis1"
						},
						"resize":{
							"dataStep": 10
						},
						"feeds":[{
							"uid": "valueAxis",
							"type": "measure",
							"min": 1,
							"max": 1,
							"role": "Axis1|Axis2|Axis3",
							"vizProperties":[{"path":"valueAxis.layout.maxWidth", "value" : 0.4}]
						},
						{
							"uid": "valueAxis2",
							"type": "measure",
							"min": 1, 
							"max": 1,
							"vizProperties":[{"path":"valueAxis2.layout.maxWidth", "value" : 0.4}]
						},
						{
							"uid": "color",
							"type": "dimension",
							"max": 1,
							"role": "Series"
						},
						{
							"uid": "shape",
							"type": "dimension",
							"max":  1,
							"role": "Category"
						}]
					},
					"time": {
						"type": "timeseries_scatter",
						"dimensions": {
							"min": 1,
							"max": 3,
							"defaultRole": "Category"
						},
						"measures": {
							"min": 1,
							"defaultRole": "Axis1"
						},
						"resize":{
							"dataStep": 10
						},
						"feeds":  [{
							"uid": "valueAxis",
							"min" : 1,
							"max" : 1,
							"type": "measure",
							"vizProperties":[{"path":"valueAxis.layout.maxWidth", "value" : 0.4},{"path":"timeAxis.levels", "value" : []}]
						}, {
							"uid": "timeAxis",
							"min": 1,
							"max": 1,
							"type": "dimension",
							"role": "Category"
						}, {
							"uid": "shape",
							"type": "dimension",
							"min": 0,
							"role": "Category2"
						}, {
							"uid": "color",
							"type": "dimension",
							"min": 0,
							"role": "Series"
						}]
					}
				},
				
				"Waterfall": {
					"default": {
						"type": "waterfall",
						"properties":{
							"semanticColor": true
						},
						"dimensions": {
							"min": 1,
							"defaultRole": "Category"
						},
						"measures": {
							"min": 1
						},
						"resize":{
							"dataStep": 10
						},
						"feeds": [{
							"uid": "valueAxis",
							"type": "measure",
							"vizProperties":[{"path":"valueAxis.layout.maxWidth", "value" : 0.4}]
						}, {
							"uid": "categoryAxis",
							"min": 1,
							"type": "dimension",
							"role": "Category"
						}, {
							"uid": "waterfallType",
							"max": 1,
							"type": "dimension",
							"role": "Series"
						}]
					},
					"time": {
						"type": "timeseries_waterfall",
						"properties":{
							"semanticColor": true
						},
						"dimensions": {
							"min": 1,
							"max": 1,
							"defaultRole": "Category"
						},
						"measures": {
							"min": 1,
							"defaultRole": "Axis1"
						},
						"resize":{
							"dataStep": 10
						},
						"feeds":  [{
							"uid": "valueAxis",
							"type": "measure",
							"vizProperties":[{"path":"valueAxis.layout.maxWidth", "value" : 0.4},{"path":"timeAxis.levels", "value" : []}]
						}, {
							"uid": "timeAxis",
							"min": 1,
							"max": 1,
							"type": "dimension"
						}]
					}
				},
			
				"CombinationDual": {
					"default": {
						"type": "dual_combination",
						"properties": {
							"hideLabel": false
						},
						"dimensions": {
							"min": 1
						},
						"measures": {
							"min": 2,
							"defaultRole": "Axis1"
						},
						"resize": {
							"dataStep": 10
						},
						"feeds": [{
							"uid": "valueAxis",
							"min": 1,
							"type": "measure",
							"role": "Axis1",
							"vizProperties": [{
								"path": "valueAxis.layout.maxWidth",
								"value": 0.5
							}]
						}, {
							"uid": "valueAxis2",
							"min": 1,
							"type": "measure",
							"role": "Axis2",
							"vizProperties": [{
								"path": "valueAxis2.layout.maxWidth",
								"value": 0.5
							}]
						}, {
							"uid": "categoryAxis",
							"min": 1,
							"type": "dimension",
							"role": "Category"
						}]
					},
					"time": {
						"type": "dual_timeseries_combination",
						"properties": {
							"hideLabel": false
						},
						"dimensions": {
							"min": 1,
							"max": 1,
							"defaultRole": "Series"
						},
						"measures": {
							"min": 2,
							"defaultRole": "Axis1"
						},
						"resize": {
							"dataStep": 10
						},
						"feeds": [{
							"uid": "valueAxis",
							"min": 1,
							"max": 1,
							"type": "measure",
							"role": "Axis1",
							"vizProperties": [{
								"path": "valueAxis.layout.maxWidth",
								"value": 0.5
							}]
						},{
							"uid": "valueAxis2",
							"min": 1,
							"type": "measure",
							"role": "Axis2",
							"vizProperties": [{
								"path": "valueAxis2.layout.maxWidth",
								"value": 0.5
							}]
						}, 
						{
							"uid": "timeAxis",
							"min": 1,
							"max": 1,
							"type": "dimension"
						}]
					}
				},
				
				"vertical_bullet": {
					"reference": "VerticalBullet"
				},
				"StackedColumn": {
					"reference": "ColumnStacked"
				}
			
			};
		}
	};
	return {
		getChartsConfiguration: oChartConfiguration.getChartsConfiguration
	};
});