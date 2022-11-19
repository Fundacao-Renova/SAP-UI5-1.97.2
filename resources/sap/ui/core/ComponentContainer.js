/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/ManagedObject','./Control','./Component','./library',"./ComponentContainerRenderer","sap/base/Log"],function(M,C,a,l,b,L){"use strict";var c=l.ComponentLifecycle;var d=C.extend("sap.ui.core.ComponentContainer",{metadata:{interfaces:["sap.ui.core.IPlaceholderSupport"],library:"sap.ui.core",properties:{name:{type:"string",defaultValue:null},url:{type:"sap.ui.core.URI",defaultValue:null},async:{type:"boolean",defaultValue:false},handleValidation:{type:"boolean",defaultValue:false},settings:{type:"object",defaultValue:null},propagateModel:{type:"boolean",defaultValue:false},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},lifecycle:{type:"sap.ui.core.ComponentLifecycle",defaultValue:c.Legacy},autoPrefixId:{type:"boolean",defaultValue:false},usage:{type:"string",defaultValue:null},manifest:{type:"any",defaultValue:null}},associations:{component:{type:"sap.ui.core.UIComponent",multiple:false}},events:{componentCreated:{parameters:{component:{type:"sap.ui.core.UIComponent"}}},componentFailed:{allowPreventDefault:true,parameters:{reason:{type:"object"}}}},designtime:"sap/ui/core/designtime/ComponentContainer.designtime"},renderer:b});function s(o,v,S,D){var f=typeof v==="string"?a.get(v):v;var O=o.getComponentInstance();if(O!==f){if(O){O.setContainer(undefined);if(D){O.destroy();}else{o._propagateProperties(true,O,M._oEmptyPropagatedProperties,true);}}o.setAssociation("component",f,S);f=o.getComponentInstance();if(f){f.setContainer(o);o.propagateProperties(true);}}}d.prototype.getComponentInstance=function(){var f=this.getComponent();return f&&a.get(f);};var p={"onAfterRendering":function(){if(this._placeholder){this._placeholder.show(this);}}};d.prototype.showPlaceholder=function(S){var f;if(!sap.ui.getCore().getConfiguration().getPlaceholder()){return;}if(this._placeholder){this.hidePlaceholder();}if(S.placeholder){this._placeholder=S.placeholder;f=this._placeholder._load();}else{f=Promise.resolve();}if(this.getDomRef()&&this._placeholder){this._placeholder.show(this);}this.addEventDelegate(p,this);return f;};d.prototype.hidePlaceholder=function(){if(this._placeholder){this._placeholder.hide();this.removeEventDelegate(p);this._placeholder=undefined;}};d.prototype.setComponent=function(v,S){s(this,v,S,this.getLifecycle()===c.Container||(typeof this.getUsage()==="string"&&this.getUsage()&&this.getLifecycle()===c.Legacy));return this;};d.prototype.applySettings=function(S,o){if(S){if(S.manifest==="true"||S.manifest==="false"){S.manifest=S.manifest==="true";}if(S.manifest&&S.async===undefined){S.async=true;}}C.prototype.applySettings.apply(this,arguments);};function e(o){var n=o.getName();var m=o.getManifest();var u=o.getUrl();var S=o.getSettings();var f={name:n?n:undefined,manifest:m!==null?m:false,async:o.getAsync(),url:u?u:undefined,handleValidation:o.getHandleValidation(),settings:S!==null?S:undefined};return f;}d.prototype._createComponent=function(){var o=a.getOwnerComponentFor(this),u=this.getUsage(),m=e(this);if(u){if(o){m=o._enhanceWithUsageConfig(u,m);}else{L.error("ComponentContainer \""+this.getId()+"\" does have a \"usage\", but no owner component!");}}if(this.getAutoPrefixId()){if(m.id){m.id=this.getId()+"-"+m.id;}if(m.settings&&m.settings.id){m.settings.id=this.getId()+"-"+m.settings.id;}}return a._createComponent(m,o);};d.prototype.onBeforeRendering=function(){var o=this.getComponentInstance(),u=this.getUsage(),n=this.getName(),m=this.getManifest();if(!this._oComponentPromise&&!o&&(u||n||m)){o=this._createComponent();if(o instanceof Promise){this._oComponentPromise=o;o.then(function(o){delete this._oComponentPromise;this.setComponent(o);this.fireComponentCreated({component:o});}.bind(this),function(r){delete this._oComponentPromise;if(this.fireComponentFailed({reason:r})){L.error("Failed to load component for container "+this.getId(),r);}}.bind(this));}else if(o){this.setComponent(o,true);this.fireComponentCreated({component:o});}else{this.fireComponentFailed({reason:new Error("The component could not be created.")});}}if(o&&o.onBeforeRendering){o.onBeforeRendering();}};d.prototype.onAfterRendering=function(){var o=this.getComponentInstance();if(o&&o.onAfterRendering){o.onAfterRendering();}};d.prototype.exit=function(){s(this,undefined,true,this.getLifecycle()!==c.Application);};d.prototype.propagateProperties=function(n){var o=this.getComponentInstance();if(o&&this.getPropagateModel()){this._propagateProperties(n,o);}C.prototype.propagateProperties.apply(this,arguments);};d.prototype._propagateContextualSettings=function(){var o=this.getComponentInstance();if(o){o._applyContextualSettings(this._getContextualSettings());}};return d;});