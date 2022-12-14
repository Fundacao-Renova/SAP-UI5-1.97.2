/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/base/ManagedObject"],function(M){"use strict";var C=M.extend("sap.ui.vk.ContentManager",{metadata:{"abstract":true,library:"sap.ui.vk",events:{contentChangesStarted:{parameters:{}},contentChangesFinished:{parameters:{content:{type:"any"},failureReason:{type:"object"}}},contentChangesProgress:{parameters:{phase:{type:"string"},percentage:{type:"float"},source:{type:"any"}}},contentLoadingFinished:{parameters:{source:{type:"any"},node:{type:"any"}}}}}});var b=C.getMetadata().getParent().getClass().prototype;C.prototype.init=function(){if(b.init){b.init.call(this);}this._decryptionHandler=null;this._authorizationHandler=null;this._retryCount=1;};C.prototype.destroyContent=function(c){return this;};C.prototype.collectGarbage=function(){return this;};C.prototype.createOrthographicCamera=function(){return null;};C.prototype.createPerspectiveCamera=function(){return null;};C.prototype.destroyCamera=function(c){return this;};C.prototype.setDecryptionHandler=function(h){this._decryptionHandler=h;return this;};C.prototype.setAuthorizationHandler=function(h){this._authorizationHandler=h;return this;};C.prototype.setRetryCount=function(r){this._retryCount=Math.max(r,0);return this;};return C;});
