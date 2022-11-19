/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
sap.ui.define(["sap/apf/modeler/ui/utils/nullObjectChecker"],function(n){'use strict';var v=function(a){this.aFieldIds=[];this.oView=a;};function s(f){var i=true;if((typeof f)!=='string'){i=false;}return i;}function c(C,f){var i=true;if(!C.oView.byId(f)){i=false;}return i;}v.prototype.addFields=function(f){if(!n.checkIsNotNullOrUndefinedOrBlank(f)){return;}var a,l=f.length;for(a=0;a<l;a++){if(s(f[a])&&c(this,f[a])&&this.aFieldIds.indexOf(f[a])===-1){this.aFieldIds.push(f[a]);}}};v.prototype.addField=function(f){if(!n.checkIsNotNullOrUndefinedOrBlank(f)){return;}if(s(f)&&c(this,f)&&this.aFieldIds.indexOf(f)===-1){this.aFieldIds.push(f);}};v.prototype.removeFields=function(f){var i=-1;var a,l=f.length;if(n.checkIsNotNullOrUndefinedOrBlank(f)===false){return;}if(n.checkIsNotNullOrUndefinedOrBlank(this.aFieldIds)===false){return;}for(a=0;a<l;a++){i=this.aFieldIds.indexOf(f[a]);if(s(f[a])&&c(this,f[a])&&i!==-1){this.aFieldIds.splice(i,1);}}};v.prototype.removeField=function(f){var i=-1;if(n.checkIsNotNullOrUndefinedOrBlank(f)===false){return;}if(n.checkIsNotNullOrUndefinedOrBlank(this.aFieldIds)===false){return;}i=this.aFieldIds.indexOf(f);if(s(f)&&c(this,f)&&i!==-1){this.aFieldIds.splice(i,1);}};v.prototype.getFields=function(){return this.aFieldIds;};v.prototype.getView=function(){return this.oView;};v.prototype.clearFields=function(){var l=this.aFieldIds.length;this.aFieldIds.splice(0,l);};v.prototype.getValidationState=function(){var V=true,i;for(i=0;i<this.aFieldIds.length;i++){if(this.oView.byId(this.aFieldIds[i])instanceof sap.m.MultiComboBox){V=(this.oView.byId(this.aFieldIds[i]).getSelectedKeys().length>=1)?true:false;}else if(this.oView.byId(this.aFieldIds[i])instanceof sap.m.Input){if(this.oView.byId(this.aFieldIds[i])instanceof sap.m.MultiInput){V=(this.oView.byId(this.aFieldIds[i]).getTokens().length>=1)?true:false;}else{V=(this.oView.byId(this.aFieldIds[i]).getValue().trim()!=="")?true:false;}}else if(this.oView.byId(this.aFieldIds[i])instanceof sap.m.ComboBox){V=(this.oView.byId(this.aFieldIds[i]).getValue().trim()!=="")?true:false;}else if(this.oView.byId(this.aFieldIds[i])instanceof sap.m.Select){V=(this.oView.byId(this.aFieldIds[i]).getSelectedKey().length>=1)?true:false;}if(V===false){break;}}return V;};sap.apf.modeler.ui.utils.ViewValidator=v;return v;},true);