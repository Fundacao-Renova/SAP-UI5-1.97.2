/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/esh/search/ui/SearchHelper"],function(S){"use strict";var m={};jQuery.extend(m,{logLines:[],log:function(){this._log.apply(this,arguments);},_log:function(t){this.logLines.push(t);this._save();},_save:function(){jQuery.ajax({type:"PUT",url:"/uxlog.txt",data:this.logLines.join("\n")+"\n",contentType:"text/plain",});this.logLines=[];},});m._save=S.delayedExecution(m._save,2000);return m;});
