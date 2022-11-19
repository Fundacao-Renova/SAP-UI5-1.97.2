// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/library","sap/ui/core/mvc/Controller","sap/ui/core/Component","sap/ushell/ui/launchpad/AccessibilityCustomData","sap/ushell/ui5service/ShellUIService","sap/ushell/EventHub","sap/ushell/components/CatalogsManager","sap/ushell/components/appfinder/VisualizationOrganizerHelper","sap/ui/core/routing/HashChanger","sap/ui/thirdparty/jquery","sap/ui/model/json/JSONModel","sap/ui/Device"],function(c,C,a,A,S,E,b,V,H,q,J,D){"use strict";var d=c.mvc.ViewType;return C.extend("sap.ushell.components.appfinder.AppFinder",{onInit:function(){var o=a.getOwnerComponentFor(this.getView());this.oRouter=o.getRouter();var v=this.getView();var m=o.getModel();v.setModel(m);this.bEnableEasyAccessSAPMenu=m.getProperty("/enableEasyAccessSAPMenu");this.bEnableEasyAccessUserMenu=m.getProperty("/enableEasyAccessUserMenu");this.bShowEasyAccessMenu=(this.bEnableEasyAccessSAPMenu||this.bEnableEasyAccessUserMenu)&&(!D.system.phone&&!D.system.tablet||D.system.combi);sap.ushell.Container.getRenderer("fiori2").createExtendedShellState("appFinderExtendedShellState",function(){sap.ushell.Container.getRenderer("fiori2").showHeaderItem("backBtn",true);sap.ushell.Container.getRenderer("fiori2").showHeaderItem("homeBtn",true);});this.oCatalogsManager=new b("catalogsMgr",{model:m});this.oVisualizationOrganizerHelper=V.getInstance();this.getView().setModel(this._getSubHeaderModel(),"subHeaderModel");this.oConfig=o.getComponentData().config;this.oCatalogView=sap.ui.view("catalogView",{type:d.JS,viewName:"sap.ushell.components.appfinder.Catalog",height:"100%",viewData:{parentComponent:o,subHeaderModel:this._getSubHeaderModel()}}).addStyleClass("sapUiGlobalBackgroundColor sapUiGlobalBackgroundColorForce");this.oRouter.attachRouteMatched(this._handleAppFinderNavigation.bind(this));v.createSubHeader();if(!this.bShowEasyAccessMenu){v.oPage.addContent(this.oCatalogView);setTimeout(function(){q("#catalogSelect").focus();},0);}D.resize.attachHandler(this._resizeHandler.bind(this));this.oRouter.oHashChanger=H.getInstance();},onExit:function(){this.oCatalogView.destroy();},_resizeHandler:function(){var s=this._showOpenCloseSplitAppButton();var e=this.oSubHeaderModel.getProperty("/openCloseSplitAppButtonVisible");if(s!==e){this.oSubHeaderModel.setProperty("/openCloseSplitAppButtonVisible",s);if(s){this.oSubHeaderModel.setProperty("/openCloseSplitAppButtonToggled",false);}}this._toggleViewWithToggleButtonClass(s);},_handleAppFinderNavigation:function(e){var v=this.getView();this._preloadAppHandler();this._getPathAndHandleGroupContext(e);this._toggleViewWithToggleButtonClass(this._showOpenCloseSplitAppButton());if(this.bShowEasyAccessMenu){this.onShow(e);}else if(v._showSearch("catalog")){v.updateSubHeader("catalog",false);this._toggleViewWithSearchAndTagsClasses("catalog");}sap.ui.getCore().getEventBus().publish("showCatalog");E.emit("CenterViewPointContentRendered","appFinder");E.emit("showCatalog",{sId:"showCatalog",oData:Date.now()});sap.ui.getCore().getEventBus().publish("launchpad","contentRendered");},_showOpenCloseSplitAppButton:function(){return!D.orientation.landscape||D.system.phone||this.oView.getModel().getProperty("/isPhoneWidth");},_resetSubHeaderModel:function(){this.oSubHeaderModel.setProperty("/activeMenu",null);this.oSubHeaderModel.setProperty("/search",{searchMode:false,searchTerm:null});this.oSubHeaderModel.setProperty("/tag",{tagMode:false,selectedTags:[]});this.oSubHeaderModel.setProperty("/openCloseSplitAppButtonVisible",this._showOpenCloseSplitAppButton());this.oSubHeaderModel.setProperty("/openCloseSplitAppButtonToggled",false);},_getSubHeaderModel:function(){if(this.oSubHeaderModel){return this.oSubHeaderModel;}this.oSubHeaderModel=new J();this._resetSubHeaderModel();return this.oSubHeaderModel;},onTagsFilter:function(e){var t=e.getSource(),s=t.getModel("subHeaderModel"),f=e.getSource().getSelectedItems(),T=f.length>0,o={tagMode:T,selectedTags:[]};f.forEach(function(g){o.selectedTags.push(g.getText());});s.setProperty("/activeMenu",this.getCurrentMenuName());s.setProperty("/tag",o);this.oCatalogView.getController().onTag(o);},searchHandler:function(e){var o=sap.ushell.components.getCatalogsManager();o.loadCustomTilesKeyWords();var s=e.getSource().getValue(),f=false;if(s===null){return;}var g=this.oSubHeaderModel.getProperty("/search");var h=this.oSubHeaderModel.getProperty("/activeMenu");if(this.getCurrentMenuName()!==h){h=this.getCurrentMenuName();}if(!g.searchMode&&!e.getParameter("clearButtonPressed")){g.searchMode=true;}if(g.searchMode&&D.system.phone){this.oSubHeaderModel.setProperty("/openCloseSplitAppButtonToggled",false);}if(s!==g.searchTerm){if(this.containsOnlyWhitepaces(s)){s="*";}g.searchTerm=s;f=true;}this.oSubHeaderModel.setProperty("/search",g);this.oSubHeaderModel.setProperty("/activeMenu",h);this.oSubHeaderModel.refresh(true);if(f){this.oCatalogView.getController().onSearch(g);}},_preloadAppHandler:function(){setTimeout(function(){if(sap.ushell.Container){sap.ushell.Container.getRenderer("fiori2").applyExtendedShellState("appFinderExtendedShellState");}this._updateShellHeader(this.oView.oPage.getTitle());}.bind(this),0);},getCurrentMenuName:function(){return this.currentMenu;},_navigateTo:function(n){var s=this.oVisualizationOrganizerHelper.getNavigationContextAsText.apply(this);if(s){this.oRouter.navTo(n,{filters:s},true);}else{this.oRouter.navTo(n,{},true);}},getGroupNavigationContext:function(){var g=this.oView.getModel().getProperty("/groupContext");var G=g?g.path:null;if(G){return JSON.stringify({targetGroup:encodeURIComponent(G)});}return null;},getSystemsModels:function(){var t=this;if(this.getSystemsPromise){return this.getSystemsPromise;}var g=new q.Deferred();this.getSystemsPromise=g.promise();var m=["userMenu","sapMenu"].map(function(e){var s=new J();s.setProperty("/systemSelected",null);s.setProperty("/systemsList",[]);return t.getSystems(e).then(function(r){s.setProperty("/systemsList",r);return s;});});q.when.apply(q,m).then(function(u,s){g.resolve(u,s);});return this.getSystemsPromise;},onSegmentButtonClick:function(e){this.oSubHeaderModel.setProperty("/search/searchMode",false);this.oSubHeaderModel.setProperty("/search/searchTerm","");var n=e.getParameter("id");this._navigateTo(n);},onShow:function(e){var p=e.getParameter("name");if(p===this.getCurrentMenuName()){return;}var v=this.getView();v._updateSearchWithPlaceHolder(p);this._updateCurrentMenuName(p);this.getSystemsModels().then(function(u,s){var f=s.getProperty("/systemsList");var g=u.getProperty("/systemsList");v.oPage.removeAllContent();var h=(this.currentMenu==="sapMenu"?f:g);if(h&&h.length){v.updateSubHeader(this.currentMenu,true);}else if(v._showSearch(this.currentMenu)){v.updateSubHeader(this.currentMenu,false);}if(this.currentMenu==="catalog"){v.oPage.addContent(this.oCatalogView);}else if(this.currentMenu==="userMenu"){if(!this.userMenuView){this.userMenuView=new sap.ui.view("userMenuView",{type:d.JS,viewName:"sap.ushell.components.appfinder.EasyAccess",height:"100%",viewData:{menuName:"USER_MENU",easyAccessSystemsModel:u,parentComponent:a.getOwnerComponentFor(this.getView()),subHeaderModel:this._getSubHeaderModel(),enableSearch:this.getView()._showSearch("userMenu")}});}v.oPage.addContent(this.userMenuView);}else if(this.currentMenu==="sapMenu"){if(!this.sapMenuView){this.sapMenuView=new sap.ui.view("sapMenuView",{type:d.JS,viewName:"sap.ushell.components.appfinder.EasyAccess",height:"100%",viewData:{menuName:"SAP_MENU",easyAccessSystemsModel:s,parentComponent:a.getOwnerComponentFor(this.getView()),subHeaderModel:this._getSubHeaderModel(),enableSearch:this.getView()._showSearch("sapMenu")}});}v.oPage.addContent(this.sapMenuView);}this._setFocusToSegmentedButton(h);this.oSubHeaderModel.setProperty("/activeMenu",this.currentMenu);if(this.oSubHeaderModel.getProperty("/openCloseSplitAppButtonVisible")){this.oSubHeaderModel.setProperty("/openCloseSplitAppButtonToggled",false);}this.oSubHeaderModel.refresh(true);}.bind(this));},_updateCurrentMenuName:function(m){if(!this.bShowEasyAccessMenu||(m==="sapMenu"&&!this.bEnableEasyAccessSAPMenu)||(m==="userMenu"&&!this.bEnableEasyAccessUserMenu)){this.currentMenu="catalog";}else{this.currentMenu=m;}this._toggleViewWithSearchAndTagsClasses(m);},_toggleViewWithSearchAndTagsClasses:function(m){var v=this.getView();if(v._showSearch(m)){v.oPage.addStyleClass("sapUshellAppFinderSearch");}else{v.oPage.removeStyleClass("sapUshellAppFinderSearch");}if(v._showSearchTag(m)){v.oPage.addStyleClass("sapUshellAppFinderTags");}else{v.oPage.removeStyleClass("sapUshellAppFinderTags");}},_toggleViewWithToggleButtonClass:function(B){var v=this.getView();if(B){v.oPage.addStyleClass("sapUshellAppFinderToggleButton");}else{v.oPage.removeStyleClass("sapUshellAppFinderToggleButton");}},_setFocusToSegmentedButton:function(s){var v=this.getView();if(s&&s.length){var B=v.segmentedButton.getSelectedButton();setTimeout(function(){q("#"+B).focus();},0);}else{setTimeout(function(){q("#catalogSelect").focus();},0);}},_getPathAndHandleGroupContext:function(o){var p=o.getParameter("arguments");var s=p.filters;var f;try{f=JSON.parse(s);}catch(e){f=s;}this.oVisualizationOrganizerHelper.updateModelWithContext.apply(this,[f]);},_updateModelWithGroupContext:function(o){var m=this.oView.getModel(),p=(o&&decodeURIComponent(o.targetGroup))||"";var g,G;p=p==="undefined"?undefined:p;G={path:p,id:"",title:""};if(p&&p!==""){sap.ushell.Container.getServiceAsync("LaunchPage").then(function(l){var t=function(){var M=m.getProperty("/groups");if(M.length){g=m.getProperty(p);G.id=l.getGroupId(g.object);G.title=g.title||l.getGroupTitle(g.object);return;}setTimeout(t,100);};t();});}m.setProperty("/groupContext",G);},getSystems:function(m){var o=new q.Deferred();sap.ushell.Container.getServiceAsync("ClientSideTargetResolution").then(function(e){e.getEasyAccessSystems(m).done(function(s){var f=[];var g=Object.keys(s);for(var i=0;i<g.length;i++){var h=g[i];f[i]={systemName:s[h].text,systemId:h};}o.resolve(f);}).fail(function(s){o.reject("An error occurred while retrieving the systems: "+s);});}).catch(function(){o.reject("cannot get ClientSideTargetResolution service");});return o.promise();},_initializeShellUIService:function(){this.oShellUIService=new S({scopeObject:this.getOwnerComponent(),scopeType:"component"});},_updateShellHeader:function(t){if(!this.oShellUIService){this._initializeShellUIService();}this.oShellUIService.setTitle(t);this.oShellUIService.setHierarchy();},containsOnlyWhitepaces:function(t){if(!t||t===""){return false;}return(!t.replace(/\s/g,"").length);}});});