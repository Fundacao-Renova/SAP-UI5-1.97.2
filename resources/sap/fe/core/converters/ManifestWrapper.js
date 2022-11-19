/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/converters/ManifestSettings"],function(M){"use strict";var V=M.VariantManagementType;function _(i,C){if(!(i instanceof C)){throw new TypeError("Cannot call a class as a function");}}function a(t,p){for(var i=0;i<p.length;i++){var d=p[i];d.enumerable=d.enumerable||false;d.configurable=true;if("value"in d)d.writable=true;Object.defineProperty(t,d.key,d);}}function b(C,p,s){if(p)a(C.prototype,p);if(s)a(C,s);return C;}var c=function(){function c(m,d){_(this,c);this.oManifestSettings=m;this.mergeFn=d;}b(c,[{key:"getTemplateType",value:function g(){return this.oManifestSettings.converterType;}},{key:"isDesktop",value:function i(){return!!this.oManifestSettings.isDesktop;}},{key:"getFormContainer",value:function g(f){var d;return(d=this.oManifestSettings.controlConfiguration)===null||d===void 0?void 0:d[f];}},{key:"getHeaderFacets",value:function h(){var d,e,f,g;return this.mergeFn({},(d=this.oManifestSettings.controlConfiguration)===null||d===void 0?void 0:(e=d["@com.sap.vocabularies.UI.v1.HeaderFacets"])===null||e===void 0?void 0:e.facets,(f=this.oManifestSettings.content)===null||f===void 0?void 0:(g=f.header)===null||g===void 0?void 0:g.facets);}},{key:"getHeaderActions",value:function g(){var d,e;return((d=this.oManifestSettings.content)===null||d===void 0?void 0:(e=d.header)===null||e===void 0?void 0:e.actions)||{};}},{key:"getFooterActions",value:function g(){var d,e;return((d=this.oManifestSettings.content)===null||d===void 0?void 0:(e=d.footer)===null||e===void 0?void 0:e.actions)||{};}},{key:"getVariantManagement",value:function g(){return this.oManifestSettings.variantManagement||V.None;}},{key:"getDefaultTemplateAnnotationPath",value:function g(){return this.oManifestSettings.defaultTemplateAnnotationPath;}},{key:"getControlConfiguration",value:function g(A){var d,e;return((d=this.oManifestSettings)===null||d===void 0?void 0:(e=d.controlConfiguration)===null||e===void 0?void 0:e[A])||{};}},{key:"getNavigationConfiguration",value:function g(n){var d,e;return((d=this.oManifestSettings)===null||d===void 0?void 0:(e=d.navigation)===null||e===void 0?void 0:e[n])||{};}},{key:"getViewLevel",value:function g(){var d;return((d=this.oManifestSettings)===null||d===void 0?void 0:d.viewLevel)||-1;}},{key:"getContentDensities",value:function g(){var d;return((d=this.oManifestSettings)===null||d===void 0?void 0:d.contentDensities)||{cozy:false,compact:false};}},{key:"isFclEnabled",value:function i(){var d;return!!((d=this.oManifestSettings)!==null&&d!==void 0&&d.fclEnabled);}},{key:"isCondensedLayoutCompliant",value:function i(){var d,e;var m=((d=this.oManifestSettings)===null||d===void 0?void 0:d.contentDensities)||{cozy:false,compact:false};var s=((e=this.oManifestSettings)===null||e===void 0?void 0:e.shellContentDensity)||"compact";var i=true;if((m===null||m===void 0?void 0:m.cozy)===true&&(m===null||m===void 0?void 0:m.compact)!==true||s==="cozy"){i=false;}return i;}},{key:"getSections",value:function h(){var d,e,f,g;return this.mergeFn({},(d=this.oManifestSettings.controlConfiguration)===null||d===void 0?void 0:(e=d["@com.sap.vocabularies.UI.v1.Facets"])===null||e===void 0?void 0:e.sections,(f=this.oManifestSettings.content)===null||f===void 0?void 0:(g=f.body)===null||g===void 0?void 0:g.sections);}},{key:"isHeaderEditable",value:function i(){return this.getShowObjectPageHeader()&&this.oManifestSettings.editableHeaderContent;}},{key:"getShowAnchorBar",value:function h(){var d,e,f,g;return((d=this.oManifestSettings.content)===null||d===void 0?void 0:(e=d.header)===null||e===void 0?void 0:e.anchorBarVisible)!==undefined?!!((f=this.oManifestSettings.content)!==null&&f!==void 0&&(g=f.header)!==null&&g!==void 0&&g.anchorBarVisible):true;}},{key:"useIconTabBar",value:function u(){return this.getShowAnchorBar()&&this.oManifestSettings.sectionLayout==="Tabs";}},{key:"getShowObjectPageHeader",value:function h(){var d,e,f,g;return((d=this.oManifestSettings.content)===null||d===void 0?void 0:(e=d.header)===null||e===void 0?void 0:e.visible)!==undefined?!!((f=this.oManifestSettings.content)!==null&&f!==void 0&&(g=f.header)!==null&&g!==void 0&&g.visible):true;}},{key:"getViewConfiguration",value:function g(){return this.oManifestSettings.views;}},{key:"getKPIConfiguration",value:function g(){return this.oManifestSettings.keyPerformanceIndicators||{};}},{key:"getFilterConfiguration",value:function g(){return this.getControlConfiguration("@com.sap.vocabularies.UI.v1.SelectionFields");}},{key:"hasMultipleEntitySets",value:function h(){var d=this;var v=this.getViewConfiguration()||{paths:[]};var m=this.oManifestSettings.entitySet;return v.paths.find(function(p){var e;if((e=p)!==null&&e!==void 0&&e.template){return undefined;}else if(d.hasMultipleVisualizations(p)){var f=p,g=f.primary,s=f.secondary;return g.some(function(p){return p.entitySet&&p.entitySet!==m;})||s.some(function(p){return p.entitySet&&p.entitySet!==m;});}else{p=p;return p.entitySet&&p.entitySet!==m;}})!==undefined;}},{key:"getContextPath",value:function g(){var d;return(d=this.oManifestSettings)===null||d===void 0?void 0:d.contextPath;}},{key:"hasMultipleVisualizations",value:function h(p){var d,e;if(!p){var v=this.getViewConfiguration()||{paths:[]};return v.paths.some(function(p){var f,g;return((f=p.primary)===null||f===void 0?void 0:f.length)>0&&((g=p.secondary)===null||g===void 0?void 0:g.length)>0;});}return((d=p.primary)===null||d===void 0?void 0:d.length)>0&&((e=p.secondary)===null||e===void 0?void 0:e.length)>0;}}]);return c;}();return c;},false);