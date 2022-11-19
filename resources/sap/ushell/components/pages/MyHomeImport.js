//Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/EventHub","sap/ushell/Config","sap/ushell/utils/HttpClient","sap/base/util/ObjectPath"],function(E,C,H,O){"use strict";var M={};var d="/UI2/Fiori2LaunchpadHome";M.getData=function(){if(!this.oPageSetPromise){this.oPageSetPromise=new Promise(function(r,a){var R="PageSets('%2FUI2%2FFiori2LaunchpadHome')"+"?$expand=Pages/PageChipInstances/ChipInstanceBags/ChipInstanceProperties"+"&$format=json";var h={"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0","Accept-Language":(sap.ui&&sap.ui.getCore().getConfiguration().getLanguage())||"",Accept:"application/json, text/plain"};var s=sap.ushell.Container.getUser().getLanguage();if(s){h["sap-language"]=s;}var S=sap.ushell.Container.getLogonSystem()?sap.ushell.Container.getLogonSystem().getClient():"";if(S){h["sap-client"]=S;}var o=(window["sap-ushell-config"].services&&window["sap-ushell-config"].services.PageBuilding)||{};var b=(O.get("config.services.pageBuilding.baseUrl",o.adapter)||"").replace(/\/?$/,"/");var c=new H(b,{headers:h});c.get(R).then(function(e){r(this.parseData.bind(this)(e));}.bind(this)).catch(a);}.bind(this));}return this.oPageSetPromise;};M.isImportEnabled=function(){return sap.ushell.Container.getServiceAsync("UserInfo").then(function(u){var U=u.getUser();var i=U.getImportBookmarksFlag();switch(i){case"done":case"dismissed":case"not_required":return false;case null:return this.getData().then(function(g){var I=!!(g.length);var s=I?"pending":"not_required";U.setImportBookmarksFlag(s);u.updateUserPreferences();U.resetChangedProperty("importBookmarks");return I;});default:return true;}}.bind(this));};M.parseData=function(r){try{var p=JSON.parse(r.responseText);if(p&&p.d){p=p.d;}var c=p.configuration&&JSON.parse(p.configuration)||{};var h=c.hiddenGroups||[];var P=p.Pages.results.filter(function(a){var i=a.scope==="PERSONALIZATION";var b=a.PageChipInstances.results.length>0;var I=h.indexOf(a.id)===-1;return i&&b&&I;});var g=c.order||[];P.sort(function(x,y){if(g.indexOf(x.id)>g.indexOf(y.id)){return 1;}if(g.indexOf(x.id)<g.indexOf(y.id)){return-1;}return 0;});var l=[];var D;var n=[];P.forEach(function(a){var L;if(a.layout){L=JSON.parse(a.layout);}var m={id:a.id,title:a.title,isLocked:a.isPersLocked==="X",isDefault:a.id===d,tileOrder:L&&L.order||[],linkOrder:L&&L.linkOrder||[],chips:a.PageChipInstances.results};if(m.isLocked){l.push(m);}else if(m.isDefault){D=m;}else{n.push(m);}});if(!C.last("/core/home/disableSortedLockedGroups")){l.sort(function(x,y){return x.title.toLowerCase()<y.title.toLowerCase()?-1:1;});}if(D){l=l.concat(D);}return l.concat(n);}catch(e){return null;}};M.setImportEnabled=function(e){E.emit("importBookmarksFlag",!!e);sap.ushell.Container.getServiceAsync("UserInfo").then(function(u){var U=u.getUser();var i=e?null:"dismissed";U.setImportBookmarksFlag(i);u.updateUserPreferences();U.resetChangedProperty("importBookmarks");});};return M;});
