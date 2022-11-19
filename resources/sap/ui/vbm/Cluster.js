/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(["sap/ui/core/Control","jquery.sap.global","./library","./ClusterRenderer"],function(C,q,l,b){"use strict";var c=C.extend("sap.ui.vbm.Cluster",{metadata:{library:"sap.ui.vbm",properties:{color:{type:"sap.ui.core.CSSColor",group:"Misc",defaultValue:null},icon:{type:"string",group:"Misc",defaultValue:null},text:{type:"string",group:"Misc",defaultValue:null},type:{type:"sap.ui.vbm.SemanticType",group:"Behavior",defaultValue:sap.ui.vbm.SemanticType.None}}}});c.prototype.exit=function(){};c.prototype.init=function(){};c.prototype.onAfterRendering=function(){if(this.$oldContent.length>0){this.$().append(this.$oldContent);}if(this.getColor()&&(this.getType()===sap.ui.vbm.SemanticType.None)){var a=this.getId()+"-"+"backgroundcircle",i=a+"-"+"innercircle";var d=document.getElementById(a),e=document.getElementById(i);var f=q(d).css("border-bottom-color");var r=this.string2rgba(f);r="rgba("+r[0]+","+r[1]+","+r[2]+","+0.5+")";d.style.borderColor=r;e.style.borderColor=r;}};c.prototype.onBeforeRendering=function(){this.$oldContent=sap.ui.core.RenderManager.findPreservedContent(this.getId());};c.prototype.string2rgba=function(a){var d;if((d=/^rgb\(([\d]+)[,;]\s*([\d]+)[,;]\s*([\d]+)\)/.exec(a))){return[+d[1],+d[2],+d[3],1.0,0];}else{return[94,105,110];}};return c;});