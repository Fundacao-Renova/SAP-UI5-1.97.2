/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./MacroMetadata","sap/fe/core/converters/MetaModelConverter","sap/fe/core/converters/helpers/Aggregation","sap/fe/core/templating/DataModelPathHelper","sap/fe/macros/ResourceModel"],function(M,a,A,D,R){"use strict";var V=M.extend("sap.fe.macros.VisualFilter",{name:"VisualFilter",namespace:"sap.fe.macros",fragment:"sap.fe.macros.VisualFilter",metadata:{properties:{id:{type:"string"},title:{type:"string",defaultValue:""},contextPath:{type:"sap.ui.model.Context",required:true,$kind:["EntitySet","NavigationProperty"]},metaPath:{type:"sap.ui.model.Context"},outParameter:{type:"string"},selectionVariantAnnotation:{type:"sap.ui.model.Context"},inParameters:{type:"sap.ui.model.Context"},multipleSelectionAllowed:{type:"boolean"},required:{type:"boolean"},showOverlayInitially:{type:"boolean"},renderLineChart:{type:"boolean"},requiredProperties:{type:"sap.ui.model.Context"},filterBarEntityType:{type:"sap.ui.model.Context"}}},create:function(p,c,s){p.groupId="$auto.visualFilters";p.inParameters=p.inParameters.getObject();this.setDefaultValue(p,"aggregateProperties",undefined);this.setDefaultValue(p,"showValueHelp",undefined);this.setDefaultValue(p,"bCustomAggregate",false);var C=a.getInvolvedDataModelObjects(p.metaPath,p.contextPath);var o=this.getConverterContext(C,p.contextPath,s);var r=o.getEntityTypeAnnotation("");o=r.converterContext;var b=new A.AggregationHelper(o.getEntityType(),o);var d=b.getCustomAggregateDefinitions();var m=p.contextPath&&p.contextPath.getModel();var P=p.metaPath&&p.metaPath.getPath();var e=m.getObject(P);var f,g;var v=e&&e.Visualizations;if(v){for(var i=0;i<v.length;i++){var h=e.Visualizations[i]&&e.Visualizations[i].$AnnotationPath;f=o.getEntityTypeAnnotation(h)&&o.getEntityTypeAnnotation(h).annotation;}}if(f&&f.Measures[0]){g=f.Measures[0].value;}if(f){var k;if(f.ChartType==="UI.ChartType/Line"||f.ChartType==="UI.ChartType/Bar"){k=true;}else{k=false;}}if(d.some(function(x){return x.qualifier===g;})){p.bCustomAggregate=true;}var S=p.selectionVariantAnnotation&&p.selectionVariantAnnotation.getObject();var l=0;if(S&&!p.multipleSelectionAllowed){for(var j=0;j<S.SelectOptions.length;j++){if(S.SelectOptions[j].PropertyName.$PropertyPath===f.Dimensions[0].value){l++;if(l>1){throw new Error("Multiple SelectOptions for FilterField having SingleValue Allowed Expression");}}}}var n=b.getTransAggregations();var q=this.getAggregateProperties(n[0],g);if(q){p.aggregateProperties=q;}var u=this.getUoM(m,p.contextPath,g,q);if(u&&u.$Path&&d.some(function(x){return x.qualifier===u.$Path;})){p.bUoMHasCustomAggregate=true;}else{p.bUoMHasCustomAggregate=false;}var H=this.getHiddenMeasure(m,p.contextPath,g,p.bCustomAggregate,q);var t=f.Dimensions[0]&&f.Dimensions[0].$target&&f.Dimensions[0].$target.type;var w=f.ChartType;if(t==="Edm.Date"||t==="Edm.Time"||t==="Edm.DateTimeOffset"){p.showValueHelp=false;}else if(typeof H==="boolean"&&H){p.showValueHelp=false;}else if(!(w==="UI.ChartType/Bar"||w==="UI.ChartType/Line")){p.showValueHelp=false;}else if(p.renderLineChart==="false"&&w==="UI.ChartType/Line"){p.showValueHelp=false;}else{p.showValueHelp=true;}if((typeof H==="boolean"&&H)||!k||p.renderLineChart==="false"){p.showError=true;p.errorMessageTitle=H||!k?R.getText("M_VISUAL_FILTERS_ERROR_MESSAGE_TITLE"):R.getText("M_VISUAL_FILTER_LINE_CHART_INVALID_DATATYPE");if(H){p.errorMessage=R.getText("M_VISUAL_FILTER_HIDDEN_MEASURE",g);}else if(!k){p.errorMessage=R.getText("M_VISUAL_FILTER_UNSUPPORTED_CHART_TYPE");}else{p.errorMessage=R.getText("M_VISUAL_FILTER_LINE_CHART_UNSUPPORTED_DIMENSION");}}return p;},getAggregateProperties:function(b,m){var o={};if(!b){return;}b.some(function(c){if(c.Name===m){o=c;return true;}});return o;},getHiddenMeasure:function(m,c,s,C,o){var b;if(!C&&o){b=o.AggregatableProperty&&o.AggregatableProperty.value;}else{b=s;}var h=m.getObject(c+"/"+b+"@com.sap.vocabularies.UI.v1.Hidden");if(!h&&o&&o.AggregatableProperty){h=m.getObject(c+"/"+b+"@com.sap.vocabularies.UI.v1.Hidden");}return h;},getUoM:function(m,c,s,o){var i=m.getObject(c+"/"+s+"@Org.OData.Measures.V1.ISOCurrency");var u=m.getObject(c+"/"+s+"@Org.OData.Measures.V1.Unit");if(!i&&!u&&o&&o.AggregatableProperty){i=m.getObject(c+"/"+o.AggregatableProperty.value+"@Org.OData.Measures.V1.ISOCurrency");u=m.getObject(c+"/"+o.AggregatableProperty.value+"@Org.OData.Measures.V1.Unit");}return i||u;}});return V;});