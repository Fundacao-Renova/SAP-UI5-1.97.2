// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ushell/Config","sap/ushell/library","sap/base/util/deepClone","sap/base/util/deepExtend","sap/base/Log"],function(q,C,l,d,a,L){"use strict";var b="X-SAP-UI2-HANA:hana?remoteId=HANA_CATALOG";function B(){this._oLaunchPageServicePromise=sap.ushell.Container.getServiceAsync("LaunchPage");if(C.last("/core/spaces/enabled")){this._oPagesServicePromise=sap.ushell.Container.getServiceAsync("Pages");}this._addBookmarkToContentNodes=function(o,c,e,s){var f=l.ContentNodeType;var p=c.map(function(g){if(g&&g.hasOwnProperty("type")&&g.isContainer){switch(g.type){case f.Page:return this.addBookmarkToPage(o,g.id,s);case f.HomepageGroup:return new Promise(function(r,h){this._oLaunchPageServicePromise.then(function(i){i.getGroupById(g.id).done(r).fail(h);});}.bind(this)).then(function(G){return this.addBookmarkToHomepageGroup(o,G,e,s);}.bind(this));default:return Promise.reject("Bookmark Service: The API needs to be called with a valid content node type. '"+g.type+"' is not supported.");}}return Promise.reject("Bookmark Service: Not a valid content node.");}.bind(this));return Promise.all(p);};this.addBookmark=function(p,c,s){var D=new q.Deferred();var e=C.last("/core/shell/enablePersonalization");var E=C.last("/core/spaces/enabled");var f=C.last("/core/spaces/myHome/enabled");if(!e&&(!E||!f)){return D.resolve().promise();}if(typeof c==="undefined"&&E){sap.ushell.Container.getServiceAsync("Menu").then(function(m){return m.getDefaultPage();}).then(function(P){return{id:P.id,label:P.title,type:l.ContentNodeType.Page,isContainer:true};}).then(function(o){this._addBookmarkToContentNodes(p,[o],false,s).then(D.resolve).catch(D.reject);}.bind(this));return D.promise();}if((typeof c==="undefined"||!c.hasOwnProperty("type"))&&!Array.isArray(c)){this.addBookmarkToHomepageGroup(p,c,false,s).then(D.resolve).catch(D.reject);return D.promise();}var g=[].concat(c);this._addBookmarkToContentNodes(p,g,false,s).then(D.resolve).catch(D.reject);return D.promise();};this.addCustomBookmark=function(v,c,e,s){var o=d(c);var f=a(o,{vizType:v,vizConfig:{"sap.flp":{chipConfig:o.chipConfig},"sap.platform.runtime":{includeManifest:!o.loadManifest}}});delete f.chipConfig;delete f.loadManifest;var g=[].concat(e);return this._addBookmarkToContentNodes(f,g,true,s);};this.addBookmarkToHomepageGroup=function(p,g,c,s){if(C.last("/core/spaces/enabled")){var e="Bookmark Service: The API is not available in spaces mode.";return Promise.reject(e);}return new Promise(function(r,f){this._oLaunchPageServicePromise.then(function(h){var D;if(c){D=h.addCustomBookmark(p,g,s);}else{D=h.addBookmark(p,g,s);}D.done(function(t){var o={tile:t,group:g};sap.ui.getCore().getEventBus().publish("sap.ushell.services.Bookmark","bookmarkTileAdded",o);r();}).fail(f);});}.bind(this));};this.addBookmarkToPage=function(p,P,c){if(!C.last("/core/spaces/enabled")){return Promise.reject("Bookmark Service: 'addBookmarkToPage' is not valid in launchpad homepage mode, use 'addBookmark' instead.");}var e=C.last("/core/shell/enablePersonalization");var E=C.last("/core/spaces/myHome/enabled");var m=C.last("/core/spaces/myHome/myHomePageId");if(!e&&(!E||(E&&P!==m))){return Promise.reject("Bookmark Service: Add bookmark is not allowed as the personalization functionality is not enabled.");}if(p&&(typeof p.title!=="string"||typeof p.url!=="string")){return Promise.reject("Bookmark Service - Invalid bookmark data.");}return this._oPagesServicePromise.then(function(o){return o.addBookmarkToPage(P,p,undefined,c);});};this.addBookmarkByGroupId=function(p,g,c){var D=new q.Deferred();if(C.last("/core/spaces/enabled")){var e="Bookmark Service: The API 'addBookmarkByGroupId' is not supported in launchpad spaces mode.";return D.reject(e).promise();}this._oLaunchPageServicePromise.then(function(f){f.getGroups().done(function(G){G=q.grep(G,function(h){return h.id===g;});var o=null;if(G.length>0){o=G[0];}this.addBookmark(p,o,c).done(D.resolve).fail(D.reject);}.bind(this)).fail(D.reject);}.bind(this)).catch(D.reject);return D.promise();};this.getShellGroupIDs=function(g){var D=new q.Deferred();if(C.last("/core/spaces/enabled")){var e="Bookmark Service: The API 'getShellGroupIDs' is not supported in launchpad spaces mode.";return D.reject(e).promise();}this._oLaunchPageServicePromise.then(function(c){c.getGroupsForBookmarks(g).done(function(G){G=G.map(function(f){return{id:c.getGroupId(f.object),title:f.title};});D.resolve(G);}).fail(D.reject);});return D.promise();};this._doAddCatalogTileToGroup=function(D,c,o,g){this._oLaunchPageServicePromise.then(function(e){if(g){e.getGroups().fail(D.reject).done(function(G){var f=G.some(function(h){if(e.getGroupId(h)===g){this._addToGroup(o,D,c,h);return true;}}.bind(this));if(!f){var E="Group '"+g+"' is unknown";L.error(E,null,"sap.ushell.services.Bookmark");D.reject(E);}}.bind(this));}else{e.getDefaultGroup().fail(D.reject).done(function(G){this._addToGroup(o,D,c,G);}.bind(this));}}.bind(this));return D.promise();};this._isSameCatalogTile=function(c,o,e){var i=e.getCatalogTileId(o);if(i===undefined){return false;}return i.indexOf(c)===0;};this._addToGroup=function(c,D,s,g){return this._oLaunchPageServicePromise.then(function(e){e.getCatalogTiles(c).fail(D.reject).done(function(f){var G=e.getGroupId(g);var t=f.some(function(o){if(this._isSameCatalogTile(s,o,e)){e.addTile(o,g).fail(D.reject).done(function(){D.resolve();sap.ui.getCore().getEventBus().publish("sap.ushell.services.Bookmark","catalogTileAdded",G);});return true;}}.bind(this));if(!t){var E="No tile '"+s+"' in catalog '"+e.getCatalogId(c)+"'";L.error(E,null,"sap.ushell.services.Bookmark");D.reject(E);}}.bind(this));}.bind(this));};this.addCatalogTileToGroup=function(c,g,o){var D=new q.Deferred();var e;if(C.last("/core/spaces/enabled")){e="Bookmark Service: The API 'addCatalogTileToGroup' is not supported in launchpad spaces mode.";return D.reject(e).promise();}this._oLaunchPageServicePromise.then(function(f){var m=o?this._isMatchingRemoteCatalog:this._isLegacyHANACatalog;o=o||{id:b};f.onCatalogTileAdded(c);f.getCatalogs().fail(D.reject).done(function(h){var s;h.forEach(function(i){if(m(i,o,f)){if(!s){s=i;}else{L.warning("More than one matching catalog: "+JSON.stringify(o),null,"sap.ushell.services.Bookmark");}}});if(s){this._doAddCatalogTileToGroup(D,c,s,g);}else{e="No matching catalog found: "+JSON.stringify(o);L.error(e,null,"sap.ushell.services.Bookmark");D.reject(e);}}.bind(this));}.bind(this));return D.promise();};this._isMatchingRemoteCatalog=function(c,r,e){var o=e.getCatalogData(c);return o.remoteId===r.remoteId&&o.baseUrl.replace(/\/$/,"")===r.baseUrl.replace(/\/$/,"");};this._isLegacyHANACatalog=function(c,r,e){return e.getCatalogId(c)===b;};this.countBookmarks=function(u,c){var D=new q.Deferred();if(C.last("/core/spaces/enabled")){this._oPagesServicePromise.then(function(p){return p.countBookmarks({url:u,contentProviderId:c});}).then(D.resolve,D.reject);}else{this._oLaunchPageServicePromise.then(function(e){e.countBookmarks(u,c).done(D.resolve).fail(D.reject);});}return D.promise();};this.countCustomBookmarks=function(i){if(!i||!i.url||!i.vizType){return Promise.reject("countCustomBookmarks: Some required parameters are missing.");}if(C.last("/core/spaces/enabled")){return this._oPagesServicePromise.then(function(p){return p.countBookmarks(i);});}return this._oLaunchPageServicePromise.then(function(c){return c.countCustomBookmarks(i);});};this.deleteBookmarks=function(u,c){var D=new q.Deferred();if(C.last("/core/spaces/enabled")){this._oPagesServicePromise.then(function(p){return p.deleteBookmarks({url:u,contentProviderId:c});}).then(D.resolve,D.reject);}else{this._oLaunchPageServicePromise.then(function(e){e.deleteBookmarks(u,c).done(function(r){sap.ui.getCore().getEventBus().publish("sap.ushell.services.Bookmark","bookmarkTileDeleted",u);D.resolve(r);}).fail(D.reject);});}return D.promise();};this.deleteCustomBookmarks=function(i){if(!i||!i.url||!i.vizType){return Promise.reject("deleteCustomBookmarks: Some required parameters are missing.");}if(C.last("/core/spaces/enabled")){return this._oPagesServicePromise.then(function(p){return p.deleteBookmarks(i);});}return this._oLaunchPageServicePromise.then(function(c){return c.deleteCustomBookmarks(i);}).then(function(){sap.ui.getCore().getEventBus().publish("sap.ushell.services.Bookmark","bookmarkTileDeleted",i.url);});};this.updateBookmarks=function(u,p,c){var D=new q.Deferred();if(C.last("/core/spaces/enabled")){this._oPagesServicePromise.then(function(P){return P.updateBookmarks({url:u,contentProviderId:c},p);}).then(D.resolve,D.reject);}else{this._oLaunchPageServicePromise.then(function(e){e.updateBookmarks(u,p,c).done(D.resolve).fail(D.reject);});}return D.promise();};this.updateCustomBookmarks=function(i,c){if(!i||!i.url||!i.vizType){return Promise.reject("deleteCustomBookmarks: Some required parameters are missing.");}var o=a({},c,{vizConfig:{"sap.flp":{chipConfig:c.chipConfig},"sap.platform.runtime":{includeManifest:!c.loadManifest}}});delete o.chipConfig;delete o.loadManifest;if(C.last("/core/spaces/enabled")){return this._oPagesServicePromise.then(function(p){return p.updateBookmarks(i,o);});}return this._oLaunchPageServicePromise.then(function(e){return e.updateCustomBookmarks(i,o);});};this.getContentNodes=function(){var c=l.ContentNodeType;if(C.last("/core/spaces/enabled")){return sap.ushell.Container.getServiceAsync("Menu").then(function(m){return m.getSpacesPagesHierarchy();}).then(function(s){return s.spaces.map(function(S){return{id:S.id,label:S.title,type:c.Space,isContainer:false,children:S.pages.map(function(p){return{id:p.id,label:p.title,type:c.Page,isContainer:true};})};});});}return new Promise(function(r,e){this._oLaunchPageServicePromise.then(function(f){f.getGroupsForBookmarks().done(function(h){var R=h.map(function(o){return{id:f.getGroupId(o.object),label:o.title,type:c.HomepageGroup,isContainer:true};});r(R);}).fail(e);});}.bind(this));};}B.hasNoAdapter=true;return B;},true);
