/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/base/EventProvider","./AnimationSequence","./AnimationTrackType","sap/ui/vk/uuidv4"],function(E,A,a,u){"use strict";var b=E.extend("sap.ui.vk.AnimationPlayback",{constructor:function(i,p){if(typeof i==="object"){p=i;i=undefined;}if(i==null){i=u();}this._sequence=p&&p.sequence?p.sequence:undefined;this._jsonData={};this._jsonData.id=i;this._jsonData.startTime=p&&p.startTime?p.startTime:0;this._jsonData.sequence=this._sequence?this._sequence.getJSONData():undefined;this._jsonData.timeScale=p&&p.timeScale?p.timeScale:1.0;this._jsonData.preDelay=p&&p.preDelay?p.preDelay:0.0;this._jsonData.postDelay=p&&p.postDelay?p.postDelay:0.0;this._jsonData.repeats=p&&p.repeats?p.repeats:1;this._jsonData.reversed=p&&p.reversed?p.reversed:false;this._jsonData.infinite=p&&p.infinite?p.infinite:false;}});b.prototype.setJSONModel=function(m){this._model=m;if(this._sequence){this._sequence.setJSONModel(m);}return this;};b.prototype.getId=function(){return this._jsonData.id;};b.prototype.getStartTime=function(){return this._jsonData.startTime;};b.prototype.setStartTime=function(s){this._jsonData.startTime=s;if(this._model){this._model.updateBindings();}return this;};b.prototype.getSequence=function(){return this._sequence;};b.prototype.setSequence=function(s){this._sequence=s;this._jsonData.sequence=s.getJSONData();if(this._model){this._model.updateBindings();}return this;};b.prototype.getTimeScale=function(){return this._jsonData.timeScale;};b.prototype.setTimeScale=function(t){this._jsonData.timeScale=t;if(this._model){this._model.updateBindings();}return this;};b.prototype.getPreDelay=function(){return this._jsonData.preDelay;};b.prototype.setPreDelay=function(p){this._jsonData.preDelay=p;if(this._model){this._model.updateBindings();}return this;};b.prototype.getPostDelay=function(){return this._jsonData.postDelay;};b.prototype.setPostDelay=function(p){this._jsonData.postDelay=p;if(this._model){this._model.updateBindings();}return this;};b.prototype.getRepeats=function(){return this._jsonData.repeats;};b.prototype.setRepeats=function(r){this._jsonData.repeats=r;if(this._model){this._model.updateBindings();}return this;};b.prototype.getReversed=function(){return this._jsonData.reversed;};b.prototype.setReversed=function(r){this._jsonData.reversed=r;if(this._model){this._model.updateBindings();}return this;};b.prototype.getInfinite=function(){return this._jsonData.infinite;};b.prototype.setInfinite=function(i){this._jsonData.infinite=i;if(this._model){this._model.updateBindings();}return this;};b.prototype.getDuration=function(){var s=this._sequence?this._sequence.getDuration():0;return this._jsonData.preDelay+this._jsonData.postDelay+s*this._jsonData.repeats*this._jsonData.timeScale;};b.prototype.getJSONData=function(){return this._jsonData;};b.prototype.getNodeBoundaryProperty=function(n,t,i){var p;var c;if(i){c=this._nodeEndPropertiesMap;}else{c=this._nodeStartPropertiesMap;}if(c){var d=c.get(n);if(d){p=d[t];}}return p;};b.prototype._hasCompleteNodesBoundaryProperties=function(){if(!this._nodeEndPropertiesMap||!this._nodeEndPropertiesMap.size||!this._nodeStartPropertiesMap||!this._nodeStartPropertiesMap.size){return false;}return true;};b.prototype._clearNodesBoundaryProperties=function(){if(this._nodeEndPropertiesMap){this._nodeEndPropertiesMap.clear();}if(this._nodeStartPropertiesMap){this._nodeStartPropertiesMap.clear();}};b.prototype._setCurrentNodesPropertiesAsBoundary=function(v,i,f){if(!f&&((this._nodeEndPropertiesMap&&this._nodeEndPropertiesMap.size&&i)||(this._nodeStartPropertiesMap&&this._nodeStartPropertiesMap.size&&!i))){return;}var n;if(i){if(!this._nodeEndPropertiesMap){this._nodeEndPropertiesMap=new Map();}else{this._nodeEndPropertiesMap.clear();}n=this._nodeEndPropertiesMap;}else{if(!this._nodeStartPropertiesMap){this._nodeStartPropertiesMap=new Map();}else{this._nodeStartPropertiesMap.clear();}n=this._nodeStartPropertiesMap;}var s=this.getSequence();if(s){s._getCurrentNodesProperties(v,n);}};b.prototype._getNodeEndPropertiesMap=function(){return this._nodeEndPropertiesMap;};b.prototype._getNodeStartPropertiesMap=function(){return this._nodeStartPropertiesMap;};return b;});