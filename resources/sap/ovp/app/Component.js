sap.ui.define(["sap/ui/core/UIComponent","sap/ovp/cards/rta/SettingsDialogConstants","sap/ui/core/routing/Router","sap/base/util/ObjectPath","sap/ui/model/json/JSONModel","sap/ovp/ui/DashboardLayoutUtil","sap/ui/core/mvc/ViewType","sap/ui/model/resource/ResourceModel","sap/ovp/app/resources","sap/ui/core/CustomData","sap/ushell/Config","sap/base/util/merge","sap/base/util/isEmptyObject","sap/ovp/cards/ovpLogger","sap/ui/Device","sap/ovp/cards/CommonUtils","sap/ui/generic/app/navigation/service/NavigationHandler","sap/ovp/placeholder/placeholderHelper","sap/m/App","sap/ui/rta/RuntimeAuthoring"],function(U,S,R,O,J,D,V,a,b,C,c,m,d,o,e,f,N,p,A){"use strict";var l=new o("OVP.app.Component");return U.extend("sap.ovp.app.Component",{metadata:{"manifest":"json",routing:{config:{routerClass:R},targets:{},routes:[]},properties:{"cardContainerFragment":{"type":"string","defaultValue":"sap.ovp.app.CardContainer"},"dashboardLayoutUtil":{"type":"sap.ovp.ui.DashboardLayoutUtil"},"designtimePath":{"type":"string","defaultValue":"sap/ovp/ui/OVPWrapper.designtime"}},version:"1.97.0",library:"sap.ovp.app",dependencies:{libs:["sap.ovp"],components:[]},config:{fullWidth:true,hideLightBackground:true}},_getOvpCardOriginalConfig:function(s){var g=this.getOvpConfig();return g.cards[s];},restore:function(){sap.ovp.cards.charts.VizAnnotationManager.formatChartAxes();},getOvpConfig:function(){var g;var E=[];var M=this.getMetadata();while(M&&M.getComponentName()!=="sap.ovp.app"){g=M.getManifestEntry("sap.ovp");if(g){E.unshift(g);}M=M.getParent();}E.unshift({});E.unshift(true);g=m.apply(m,E);return g;},_removeExtraArrayElements:function(s,g){var h=s["staticContent"],i=g["staticContent"],j=s["tabs"],k=g["tabs"];if(h&&i){if(h.length>i.length){s["staticContent"].splice(i.length,h.length-i.length);}}if(j&&k){if(j.length>k.length){s["tabs"].splice(k.length,j.length-k.length);}}},_emptyAllArrayElements:function(s,g){var h=s["staticContent"],j=g["staticContent"],k=s["tabs"],n=g["tabs"];if(h&&j){for(var i=0;i<h.length;i++){s["staticContent"][i]={};}}if(k&&n){for(var i=0;i<k.length;i++){s["tabs"][i]={};}}},_mergeObjects:function(g,h){for(var i in h){if(h.hasOwnProperty(i)){var v=h[i];if(typeof v=="object"&&g[i]){if(v.operation==="DELETE"){delete g[i];}else{this._mergeObjects(g[i],v);}}else{if(typeof v=="object"&&!g[i]&&v.operation==="DELETE"){continue;}g[i]=v;}}}return g;},_mergeLayerObject:function(g,L){if(!g[L+".settings"]){return g;}var s=m({},g["settings"]),h=m({},g[L+".settings"]);this._removeExtraArrayElements(s,h);this._emptyAllArrayElements(s,h);g["settings"]=this._mergeObjects(s,h);return g;},_mergeKeyUserChanges:function(g){if(!g.hasOwnProperty("customer.settings")&&!g.hasOwnProperty("customer_base.settings")&&!g.hasOwnProperty("vendor.settings")){return g;}g=this._mergeLayerObject(g,"vendor");g=this._mergeLayerObject(g,"customer_base");g=this._mergeLayerObject(g,"customer");return g;},_getFullyQualifiedNameForEntity:function(E,F){var n="",r;if(!E){return"";}if(E.indexOf(".")>-1){return E;}var g=F.getMetaModel();if(f.isODataV4(F)){var h=g.getObject("/");var i=h[E];n=i.$Type;return n;}else{var j=g&&g.getODataEntityContainer();n=j&&j.namespace;if(n&&!(E.indexOf(n)>-1)){r=n+"."+E;}else{r=E;}return r;}},isDate:function(P){if(((P["type"]==="Edm.DateTime"&&P["sap:display-format"]==="Date")||(P["type"]==="Edm.String"&&P["com.sap.vocabularies.Common.v1.IsCalendarDate"]&&P["com.sap.vocabularies.Common.v1.IsCalendarDate"].Bool==="true"))&&P["sap:filter-restriction"]==="interval"){return true;}return false;},_getDatePropertiesFromEntitySet:function(F){var P=F.property,g=[];for(var k in P){var h={};if(this.isDate(P[k])){h.PropertyPath=P[k].name;}if(!d(h)){g.push(h);}}return g;},_getAllControlConfiguration:function(g,s,h){for(var i=0;i<g.length;i++){if(h[g[i].PropertyPath]){var I=false;for(var j=0;j<s.length;j++){if(s[j].PropertyPath===g[i].PropertyPath){I=true;}}if(!I){g[i].bNotPartOfSelectionField=true;s.push(g[i]);}}}return s;},_getSettingsForDateProperties:function(g,h){var i={};for(var k in g){if(h.fields&&h.fields[g[k].PropertyPath]){i[g[k].PropertyPath]=this.getConditionTypeForDateSetting(h.fields[g[k].PropertyPath]);}else{if(h.customDateRangeImplementation||h.filter||h.selectedValues){i[g[k].PropertyPath]=this.getConditionTypeForDateSetting(h);}}}return i;},getConditionTypeForDateSetting:function(g){if(g.customDateRangeImplementation){return{customDateRangeImplementation:g.customDateRangeImplementation};}else if(g.filter){return{filter:g.filter};}else if(g.selectedValues){return{selectedValues:g.selectedValues,exclude:(g.exclude!==undefined)?g.exclude:true};}return undefined;},createXMLView:function(g){if(this.getRouter()){this.getRouter().initialize();}var h=this.getMetadata().getManifestEntry("sap.app");var u=this.getMetadata().getManifestEntry("sap.ui");var i=O.get("icons.icon",u);var F=this.getModel(g.globalFilterModel);var j=F&&F.getMetaModel();this.setModel(F);var s=this.getMetadata().getComponentName();var k=s.replace(/\./g,"/");g.baseUrl=sap.ui.require.toUrl(k);g.useMacroFilterBar=F?f.isODataV4(F):false;if(g.smartVariantRequired===undefined||g.smartVariantRequired===null){g.smartVariantRequired=true;}if(g.enableLiveFilter===undefined||g.enableLiveFilter===null){g.enableLiveFilter=true;}if(g.showDateInRelativeFormat===undefined||g.showDateInRelativeFormat===null){g.showDateInRelativeFormat=true;}if((g.filterSettings&&g.filterSettings.dateSettings&&(g.filterSettings.dateSettings.useDateRange!==undefined))&&g.useDateRangeType!==undefined){throw new Error("Defining both useDateRange and useDateRangeType in the manifest is not allowed");}g.useDateRangeType=(g.filterSettings&&g.filterSettings.dateSettings&&(g.filterSettings.dateSettings.useDateRange!==undefined))?g.filterSettings.dateSettings.useDateRange:g.useDateRangeType;if(g.useDateRangeType===undefined||g.useDateRangeType===null){g.useDateRangeType=false;}if(g.bHeaderExpanded===undefined||g.bHeaderExpanded===null){g.bHeaderExpanded=e.system.desktop?true:false;}if(g.chartSettings===undefined||g.chartSettings===null){g.chartSettings={};}if(g.chartSettings.showDataLabel===undefined||g.chartSettings.showDataLabel===null){g.chartSettings.showDataLabel=false;}if(g.globalFilterEntitySet&&g.globalFilterEntitySet!==" "){var E=j&&j.getODataEntitySet(g.globalFilterEntitySet);g.globalFilterEntityType=E&&E.entityType;}var n=g.globalFilterEntityType;if(g.globalFilterEntityType&&g.globalFilterEntityType!==" "&&g.globalFilterEntityType.length>0){g.globalFilterEntityType=this._getFullyQualifiedNameForEntity(g.globalFilterEntityType,F);g.globalFilterEntityTypeNQ=g.globalFilterEntityType.split(".").pop();}var q=new J(g);q.setProperty("/applicationId",O.get("id",h));q.setProperty("/title",O.get("title",h));q.setProperty("/description",O.get("description",h));if(g.globalFilterEntityType){var r,t;if(f.isODataV4(F)){r=j.getObject("/"+g.globalFilterEntityType+"@com.sap.vocabularies.UI.v1.SelectionFields");t=j.getObject("/"+g.globalFilterEntityType);q.setProperty("/mainEntityVersion","ODataV4");}else{t=j.getODataEntityType(g.globalFilterEntityType);r=m([],t["com.sap.vocabularies.UI.v1.SelectionFields"]);q.setProperty("/mainEntityVersion","ODataV2");}if(g.filterSettings&&g.filterSettings.dateSettings){var v=this._getDatePropertiesFromEntitySet(t);var w=this._getSettingsForDateProperties(v,g.filterSettings.dateSettings);if(q.getProperty("/useDateRangeType")&&!d(w)){throw new Error("Setting 'useDateRange' property as True and maintaining property level configuration for date ranges in Date Settings are mutually exclusive, resulting in error. Change one of these settings in manifest.json as per your requirement.");}r=this._getAllControlConfiguration(v,r,w);q.setProperty("/datePropertiesSettings",w);}q.setProperty("/allControlConfiguration",r);q.setProperty("/mainEntityType",t);}if(i){if(i.indexOf("sap-icon")<0&&i.charAt(0)!=='/'){i=g.baseUrl+"/"+i;}q.setProperty("/icon",i);}var x=g.cards;var y=[];var z;for(var B in x){if(x.hasOwnProperty(B)&&x[B]){z=this._mergeKeyUserChanges(x[B]);z.id=B;y.push(z);}}y.sort(function(K,L){if(K.id<L.id){return-1;}else if(K.id>L.id){return 1;}else{return 0;}});q.setProperty("/cards",y);if(this.inResizableTestMode()===true){g.containerLayout="resizable";}if(g.containerLayout&&g.containerLayout==="resizable"){q.setProperty("/cardContainerFragment","sap.ovp.app.DashboardCardContainer");q.setProperty("/dashboardLayout",g.resizableLayout);var G=new D(q);this.setDashboardLayoutUtil(G);}else{q.setProperty("/cardContainerFragment",this.getCardContainerFragment());}this.setModel(q,"ui");var H=this._getOvpLibResourceBundle();this.setModel(H,"ovplibResourceBundle");var t;if(f.isODataV4(F)){t="/"+g.globalFilterEntityType;}else{t=j&&j.getODataEntityType(g.globalFilterEntityType,true);}var M=this.createId("mainView");var I=new sap.ui.core.mvc.XMLView(M,{height:"100%",preprocessors:{xml:{bindingContexts:{ui:q.createBindingContext("/"),meta:j.createBindingContext(t),contextPath:j.createBindingContext("/"+n),entitySet:n},models:{ui:q,meta:j,contextPath:j,metaModel:j}}},type:V.XML,viewName:"sap.ovp.app.Main",async:true,customData:[new C({key:"sap-ui-custom-settings",value:{"sap.ui.dt":{"designtime":"sap/ovp/ui/OVPWrapper.designtime"}}})]});return I;},_showErrorPage:function(){var v=new sap.ui.core.mvc.XMLView({height:"100%",type:V.XML,viewName:"sap.ovp.app.Error"});var g=this._getOvpLibResourceBundle();v.setModel(g,"ovplibResourceBundle");this.setAggregation("rootControl",v);if(this.oContainer){this.oContainer.invalidate();}},_formParamString:function(P){var k=Object.keys(P);var i;var s="?";for(i=0;i<k.length;i++){s=s+k[i]+"="+P[k[i]]+"&";}return s.slice(0,-1);},_checkForAuthorizationForCards:function(g){return new Promise(function(r,h){this.ovpConfig=g;var n=new N(this);f.enable(this,n);var n=f.getNavigationHandler();var j=[];for(var k in this.ovpConfig.cards){var q=this.ovpConfig.cards[k];if(q&&q.settings&&q.settings.requireAppAuthorization){j.push(q.settings.requireAppAuthorization);}}if(j.length>0&&n&&n.oCrossAppNavService){return n.oCrossAppNavService.isIntentSupported(j).done(function(s){var u=[];for(var k in this.ovpConfig.cards){if(this.ovpConfig.cards[k].settings.requireAppAuthorization&&s[this.ovpConfig.cards[k].settings.requireAppAuthorization].supported===false){u.push(k);}}for(var i=0;i<u.length;i++){for(var k in this.ovpConfig.cards){if(u[i]===k){delete this.ovpConfig.cards[k];break;}}}r(this.ovpConfig);}.bind(this)).fail(function(E){l.error(E);h(E);});}else{r(g);}}.bind(this));},_checkForAuthorizationForLineItems:function(){return new Promise(function(r,g){var h=[],k=[];var n=this.getOvpConfig();var q=n["cards"];for(var s in q){if(q.hasOwnProperty(s)&&q[s]){var t=q[s];var u=t.settings;if((t.template==="sap.ovp.cards.linklist"||t.template==="sap.ovp.cards.v4.linklist")&&u.listFlavor==="standard"&&u.staticContent){var v=u.staticContent;for(var i=0;i<v.length;i++){if(v[i].semanticObject||v[i].action){var I="#"+v[i].semanticObject+"-"+v[i].action;if(v[i].params){var P=this._formParamString(v[i].params);I=I+P;}if(k.indexOf(s)===-1){k.push(s);}if(h.indexOf(I)===-1){h.push(I);}}}}}}this._oCardsWithStaticContent=k;if(sap.ushell&&sap.ushell.Container){sap.ushell.Container.getService('CrossApplicationNavigation').isIntentSupported(h).done(function(w){var n=this.getOvpConfig();for(var x in w){if(w.hasOwnProperty(x)&&w[x].supported===false){for(var i=0;i<this._oCardsWithStaticContent.length;i++){var v=n["cards"][this._oCardsWithStaticContent[i]].settings.staticContent;for(var j=v.length-1;j>=0;j--){var I="#"+v[j].semanticObject+"-"+v[j].action;if(v[j].params){var P=this._formParamString(v[j].params);I=I+P;}if(x===I){v.splice(j,1);}}n["cards"][this._oCardsWithStaticContent[i]].settings.staticContent=v;}}}delete this._oCardsWithStaticContent;r(n);}.bind(this)).fail(function(E){l.error(E);g(E);});}else{r(n);}}.bind(this));},createContent:function(){var g=this.getOvpConfig();var F=this.getModel(g.globalFilterModel);var P=[this._checkForAuthorizationForLineItems(g),b.pResourcePromise];if(f.isODataV4(F)){P.unshift(F&&F.getMetaModel().requestObject("/"+g.globalFilterModel));}else{P.unshift(F&&F.getMetaModel().loaded());}if(F&&!this.getAggregation("rootControl")){Promise.all(P).then(function(r){return this._checkForAuthorizationForCards(r[1]);}.bind(this)).then(function(r){this.oOvpConfig=r;this.runAsOwner(function(){var v=this.createXMLView(this.oOvpConfig);v.loaded().then(function(){if(p.isPlaceHolderEnabled()){var n=new A({id:'host'});n.addPage(v);this.setAggregation("rootControl",n);p.showPlaceholder(n);}else{this.setAggregation("rootControl",v);}this.oContainer.invalidate();}.bind(this));}.bind(this));}.bind(this));if(!f.isODataV4(F)){F.attachMetadataFailed(function(){this._showErrorPage();}.bind(this));}}},_getOvpLibResourceBundle:function(){if(!this.ovplibResourceBundle){var r=sap.ui.getCore().getLibraryResourceBundle("sap.ovp");this.ovplibResourceBundle=r?new a({bundleUrl:r.oUrlInfo.url,bundle:r}):null;}return this.ovplibResourceBundle;},createMapForEntityContainer:function(E){var g={};var h=E.entitySet;for(var i=0;i<h.length;i++){g[h[i].name]=h[i].entityType;}return g;},inResizableTestMode:function(){return this._getQueryParamUpToTop('resizableTest')=='true';},_getQueryParamUpToTop:function(n){var w=window;var v=this.getQueryParam(w.location.search,n);if(v!=null){return v;}if(w==w.parent){return null;}w=w.parent;return null;},getQueryParam:function(q,n){var v=null;if(!q){return v;}if(q.indexOf('?')!=-1){q=q.substring(q.indexOf('?'));}if(q.length>1&&q.indexOf(n)!=-1){q=q.substring(1);var g=q.split('&');for(var i=0;i<g.length;i++){var h=g[i].split('=');if(h[0]==n){v=h[1];break;}}}return v;}});});
