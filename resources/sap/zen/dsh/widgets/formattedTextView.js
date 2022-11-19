/*
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/base/Log","sap/ui/core/HTML"],function(q,L,H){"use strict";var r=H.extend("com.sap.ip.bi.FormattedTextView",{metadata:{properties:{height:"sap.ui.core.CSSSize",width:"sap.ui.core.CSSSize",aStyleClasses:"string[]"}},initDesignStudio:function(){this._ftv={};this._ftv.ATTRIBS={"span::class":1,"div::class":1,"div::id":1,"span::id":1,"embed::data-index":1};this._ftv.ELEMENTS={"abbr":1,"acronym":1,"address":1,"blockquote":1,"br":1,"cite":1,"code":1,"dfn":1,"div":1,"em":1,"h1":1,"h2":1,"h3":1,"h4":1,"h5":1,"h6":1,"kbd":1,"p":1,"pre":1,"q":1,"samp":1,"strong":1,"span":1,"var":1,"dl":1,"dt":1,"dd":1,"ol":1,"ul":1,"li":1,"embed":1};},fnSanitizeAttribs:function(t,a){for(var i=0;i<a.length;i+=2){var A=t+"::"+a[i];if(this._ftv.ATTRIBS[A]){if(t==="embed"){var b=/^[0-9]*$/;if(!a[i+1].match(b)){return null;}}}else{var w="<"+t+"> with attribute ["+a[i]+"='"+a[i+1]+"'] is not allowed and cut";L.warning(w,this);a[i+1]=null;}}return a;},fnPolicy:function(t,a){if(this._ftv.ELEMENTS[t]){var p=q.proxy(this.fnSanitizeAttribs,this);return p(t,a);}else{var w="<"+t+"> is not allowed and cut (and its content)";L.warning(w,this);}},renderer:{},setHtmlText:function(h){this.setContent("");var s="<div>"+h+"</div>";var S="";var p=q.proxy(this.fnPolicy,this);try{S=q.sap._sanitizeHTML(s,{tagPolicy:p});}catch(e){}this.setContent(S);},getHtmlText:function(){var a=this.getContent();a=a.substr(5);a=a.substring(0,a.length-6);return a;},addStyleClass:function(c){if(!this.getAStyleClasses()){this.setAStyleClasses([]);}var C=this.getAStyleClasses();if(C.indexOf(c)===-1){C.push(c);}this.setAStyleClasses(C);},removeStyleClass:function(c){if(!this.getAStyleClasses()){this.setAStyleClasses([]);}var C=this.getAStyleClasses();if(C.indexOf(c)!==-1){C.splice(C.indexOf(c),1);}this.setAStyleClasses(C);},onAfterRendering:function(e){H.prototype.onAfterRendering.apply(this,[e]);this.$().addClass("sapUiFTV");var h=this.getHeight();var j=this.$();if(h!=="auto"){j.height(h);}var w=this.getWidth();if(w!=="auto"){j.width(w);}if(this.getAStyleClasses()&&this.getAStyleClasses().length>0){for(var i=0;i<this.getAStyleClasses().length;i++){j.addClass(this.getAStyleClasses()[i]);}}}});return r;});