/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./MacroMetadata","sap/fe/core/templating/DataModelPathHelper","sap/fe/core/converters/MetaModelConverter","sap/fe/core/converters/controls/Common/DataVisualization"],function(M,D,a,b){"use strict";var C=M.extend("sap.fe.macros.Chart",{name:"Chart",namespace:"sap.fe.macros.internal",publicNamespace:"sap.fe.macros",publicName:"Chart",fragment:"sap.fe.macros.Chart",metadata:{stereotype:"xmlmacro",properties:{chartDefinition:{type:"sap.ui.model.Context"},id:{type:"string",isPublic:true},_applyIdToContent:{type:"boolean",defaultValue:false},metaPath:{type:"sap.ui.model.Context",required:true,isPublic:true},contextPath:{type:"sap.ui.model.Context",required:true,isPublic:true},height:{type:"string",defaultValue:"400px"},width:{type:"string",defaultValue:"100%"},selectionMode:{type:"string",defaultValue:"MULTIPLE",isPublic:true},personalization:{type:"string|boolean",isPublic:true},filter:{type:"string"},noDataText:{type:"string"},chartDelegate:{type:"string"},vizProperties:{type:"string"},actions:{type:"sap.ui.model.Context"},autoBindOnInit:{type:"boolean"},visible:{type:"string"}},events:{onSegmentedButtonPressed:{type:"function"},selectionChange:{type:"Function",isPublic:true}}},create:function(p,c,s){var o;var d=a.getInvolvedDataModelObjects(p.metaPath,p.contextPath);var e=this.getConverterContext(d,p.contextPath,s);if(p.chartDefinition===undefined||p.chartDefinition===null){var v=D.getContextRelativeTargetObjectPath(d);if(p.metaPath.getObject().$Type==="com.sap.vocabularies.UI.v1.PresentationVariantType"){var V=p.metaPath.getObject().Visualizations;V.forEach(function(g){if(g.$AnnotationPath.indexOf("@com.sap.vocabularies.UI.v1.Chart")>-1){v=g.$AnnotationPath;return;}});}var f=b.getDataVisualizationConfiguration(v,p.useCondensedLayout,e);o=f.visualizations[0];p.chartDefinition=this.createBindingContext(o,s);}else{o=p.chartDefinition.getObject();}o.path=p.chartDefinition.getPath();this.setDefaultValue(p,"navigationPath",o.navigationPath);this.setDefaultValue(p,"autoBindOnInit",o.autoBindOnInit);this.setDefaultValue(p,"vizProperties",o.vizProperties);p.actions=this.createBindingContext(o.actions,s);p.selectionMode=p.selectionMode.toUpperCase();if(!p.filter){this.setDefaultValue(p,"filter",o.filterId);}this.setDefaultValue(p,"onSegmentedButtonPressed",o.onSegmentedButtonPressed);this.setDefaultValue(p,"visible",o.visible);if(p._applyIdToContent){p._apiId=p.id+"::Chart";p._contentId=p.id;}else{p._apiId=p.id;p._contentId=p.id+"-content";}return p;}});return C;});