// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log"],function(L){"use strict";function r(m,p){var s="meta[name^='"+m+"']:not([name=''])";var M=document.querySelectorAll(s);var S="sap/ushell/bootstrap/common/common.read.metatags";var i=[];p=p||JSON.parse;Array.prototype.forEach.call(M,function(o){try{i.push(p(o.content));}catch(e){L.error(e.message,e.stack,S);}});return i;}return{readMetaTags:r};});
