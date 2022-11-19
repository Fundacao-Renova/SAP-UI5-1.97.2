/*!
 * SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */
sap.ui.define(['sap/base/Log','sap/ui/export/ExportUtils'],function(L,E){'use strict';var a='sap/ui/export/provider/DataProviderBase',b='sap/ui/export/js/XLSXBuilder',c='sap/ui/export/js/libs/JSZip3';var S={execute:function(p,C){function d(m){if(m instanceof MessageEvent&&m.data){m=m.data;}if(typeof C==='function'){C(m);}}function o(F,t){d({progress:true,fetched:F||0,total:t||0});}function f(e){d({error:e.message||e});}function g(A){d({finished:true,spreadsheet:A});}function h(){var s;var e;function k(D,X){e=D.getDataConverter(p);s=new X(p.workbook.columns,p.workbook.context,p.workbook.hierarchyLevel,p.customizing);var l=p.dataSource.data||[];var m=l.length;var r=e(l.slice());s.append(r);o(m,m);s.build().then(g);}sap.ui.require([a,b,c],k);return{cancel:g};}function i(){var s,r;function e(D,X){var m=new D(p);s=new X(p.workbook.columns,p.workbook.context,p.workbook.hierarchyLevel,p.customizing);r=m.requestData(k);}function k(m){if(m.error||typeof m.error==='string'){f(m.error);return;}s.append(m.rows);o(m.fetched,m.total);if(m.finished){s.build().then(g);}}function l(){r.cancel();g();}sap.ui.require([a,b,c],e);return{cancel:l};}function j(){var s;var w={};var k=function(){s.postMessage({cancel:true});g();};function l(u){var e=new Worker(u);e.onmessage=d;if(navigator.userAgent.indexOf("Firefox")===-1||m(u)){e.onerror=f;}e.postMessage(p);return e;}function m(u){return u.indexOf(window.location.host)>0||/^[^/]+\/[^/].*$|^\/[^/].*$/i.test(u);}function n(){var B,e;L.warning('Direct worker is not allowed. Load the worker via blob.');B='self.origin = "'+w.base+'"; '+'importScripts("'+w.src+'")';e=window.URL.createObjectURL(new Blob([B]));return l(e);}function q(){L.warning('Blob worker is not allowed. Use in-process export.');k=i(p).cancel;}function r(){try{s=l(w.src);s.addEventListener('error',function(e){s=n();s.addEventListener('error',function(e){q();e.preventDefault();});e.preventDefault();});}catch(t){try{s=n();}catch(u){q();}}}w.base=E.normalizeUrl(sap.ui.require.toUrl('sap/ui/export/js/'));w.src=w.base+'SpreadsheetWorker.js';r();return{cancel:function(){k();}};}if(p.dataSource.type==='array'){return h();}else if(p.worker===false||sap.ui.disableExportWorkers===true){return i();}else{return j();}}};return S;},true);
