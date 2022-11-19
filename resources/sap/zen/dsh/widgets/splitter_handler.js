/*!
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/zen/dsh/utils/BaseHandler"],function(BaseHandler){"use strict";var SplitterHandler=function(){BaseHandler.apply(this,arguments);var that=this;this.createAndAdd=function(c,C,o,a,A){var l=this.createDefaultProxy(C["id"]);a(l,A,o);BaseHandler.dispatcher.updateComponentProperties(l,o,a);this.init(l,C,o);l.mFnOrigOnAfterRendering=l.onAfterRendering;l.onAfterRendering=function(){that.onAfterRendering(l);};l.attachResize(function(e){if(l.mIsRendering){return;}that.resize(l,e.getParameter("newSizes"));});return l;};this.update=function(c,C,o){if(C){this.init(c,C,o);}return c;};this.init=function(c,C){if(!C){return;}c.moControlProperties=C;c.mIsRendering=true;var l=C.content;this.updateChildren(l,c,function(o){if(o.getProperty("visible")===true){c.addContentArea(o);}else{c.removeContentArea(o);}},function(o){c.removeContentArea(o);});c.addStyleClass("zenborder");c.setOrientation(C.orientation);if(l.length===1){c.getContentAreas()[0].getLayoutData().setSize("100%");}};this.onAfterRendering=function(c){if(c.mFnOrigOnAfterRendering){c.mFnOrigOnAfterRendering();}c.mIsRendering=false;};this.resize=function(oControl,tNewSizes){if(!oControl.moControlProperties.onResize){return;}var loDomRef=oControl.getDomRef();if(loDomRef){if(loDomRef.offsetWidth===0&&loDomRef.offsetHeight===0){return;}}var ltAutoFit=[],ltFixFit=[];for(var i=0;i<tNewSizes.length;i++){var lNewSize=tNewSizes[i];var lOldSize=oControl.getContentAreas()[i].moControlProperties.size;var lResult=lOldSize.search(/[auto|%](.)*/g);if(lResult>=0){ltAutoFit.push(i);}else{ltFixFit.push(i);}}var ltNewSizes=[];for(i=0;i<tNewSizes.length;i++){lNewSize=tNewSizes[i];if(i==0&&ltFixFit.length<=0){ltNewSizes[i]=lNewSize+"px";continue;}if(ltAutoFit.indexOf(i)>=0){ltNewSizes[i]=oControl.getContentAreas()[i].moControlProperties.size;}else{ltNewSizes[i]=lNewSize+"px";}}var loJson={tNewSizes:ltNewSizes};var lCommand=that.prepareCommand(oControl.moControlProperties.onResize,"__VALUE__",JSON.stringify(loJson));eval(lCommand);};this.getDefaultProxyClass=function(){return["sap.ui.layout.Splitter"];};this.provideFunctionMapping=function(){return[];};this.getDecorator=function(){return"SplitterDecorator";};this.getType=function(){return"splitter";};this.applyForChildren=function(c,f){var l=c.getContentAreas();if(l){for(var a=0;a<l.length;a++){var b=l[a];f(b);}}};};var instance=new SplitterHandler();BaseHandler.dispatcher.addHandlers(instance.getType(),instance);sap.zen.ContentAreaHandler=function(){BaseHandler.apply(this,arguments);var d=BaseHandler.dispatcher;this.createAndAdd=function(c,C,o,a,A){var l=this.createAbsoluteLayout(C["id"]);a(l,A);this.init(l,C,o);return l;};this.updateComponent=function(c,C,o){if(C){this.init(c,C,o);}return c;};this.init=function(c,C){if(!C){return;}c.moControlProperties=C;var l=C.content;if(l){this.updateChildren(l,c,function(n,i){d.insertIntoAbsoluteLayoutContainer(c,n,i);},function(o){c.removeContent(o);});}c.getLayoutData().setResizable(C.resizable);c.getLayoutData().setSize(C.size);var a=C.minimumSize;if("auto"===a){a=50;}else{a=parseInt(a);}c.getLayoutData().setMinSize(a);};this.applyForChildren=function(c,f){var l=c.getContent();for(var a=0;a<l.length;a++){var b=l[a];if(b){f(b);}}};this.getType=function(){return"contentarea";};};instance=new sap.zen.ContentAreaHandler();BaseHandler.dispatcher.addHandlers(instance.getType(),instance,"ContentAreaDecorator");return instance;});