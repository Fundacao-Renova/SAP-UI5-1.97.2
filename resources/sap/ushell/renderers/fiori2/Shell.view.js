// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/library","sap/ushell/library","sap/ui/Device","sap/ushell/components/_HeaderManager/ControlManager","sap/ushell/components/_HeaderManager/ShellHeader.controller","sap/ushell/ui/launchpad/AccessibilityCustomData","sap/ushell/resources","sap/ushell/utils","sap/ushell/Config","sap/ushell/EventHub","sap/ui/model/json/JSONModel","sap/ui/thirdparty/jquery","sap/ushell/renderers/fiori2/AccessKeysHandler","sap/ui/core/mvc/XMLView"],function(c,l,D,H,S,A,r,u,C,E,J,q,a,X){"use strict";function s(i,o){return sap.ui.getCore().byId(o.getObject());}sap.ui.jsview("sap.ushell.renderers.fiori2.Shell",{createContent:function(o){this.oController=o;var v=this.getViewData()||{},b=v.config||{};this.oConfig=b;this.aDanglingControls=[];this._allowUpToThreeActionInShellHeader(b);var U=sap.ui.xmlfragment("sap.ushell.ui.ShellLayout",o),d=this.createShellHeader(b,this.getViewData().shellModel);U.setHeader(d);d.setShellLayout(U);E.once("CreateToolArea").do(function(){sap.ui.require(["sap/ushell/ui/shell/ToolArea"],function(T){var e=new T({id:"shell-toolArea",toolAreaItems:{path:"/currentState/toolAreaItems",factory:s}});e.updateAggregation=this.updateShellAggregation;e.addEventDelegate({onAfterRendering:function(){U.applySplitContainerSecondaryContentSize();}});U.setToolArea(e);}.bind(this));}.bind(this));this.setOUnifiedShell(U);this.setDisplayBlock(true);this.addDanglingControl(sap.ui.getCore().byId("viewPortContainer"));u.setPerformanceMark("FLP - Shell.view rendering started!");return U;},_allowUpToThreeActionInShellHeader:function(o){if(Object.keys(o).length>3){var p=["moveAppFinderActionToShellHeader","moveUserSettingsActionToShellHeader","moveContactSupportActionToShellHeader","moveEditHomePageActionToShellHeader"],b=0,P;for(var i=0;i<5;i++){P=p[i];if(b===3){o[P]=false;}else if(o[P]){b++;}}}},createShellHeader:function(o,b){var d=C.createModel("/core/shellHeader",J),h=new S(),e;h.onInit();e=sap.ui.xmlfragment("sap.ushell.ui.ShellHeader",h);H.init(o,h,b);if(D.system.desktop){e.setAccessKeyHandler(a);}if(o.appState==="embedded"){e.setNoLogo();}e.setModel(d);e.setModel(r.i18nModel,"i18n");e.createUIArea();return e;},createPostCoreExtControls:function(){sap.ui.require(["sap/ushell/ui/shell/FloatingContainer","sap/ushell/ui/shell/ShellFloatingActions"],function(F,b){var o=sap.ui.getCore().byId("shell");if(!o){return;}var d=new F({id:"shell-floatingContainer",content:{path:"/currentState/floatingContainerContent",factory:s}});if(D.system.desktop){d.addCustomData(new A({key:"tabindex",value:"-1",writeToDom:true}));d.addEventDelegate({onsapskipforward:function(g){g.preventDefault();a.sendFocusBackToShell(g);}});}d.setModel(o.getModel());this.addDanglingControl(d);var e=new b({id:"shell-floatingActions",floatingActions:{path:"/currentState/floatingActions",factory:s}});e.updateAggregation=this.updateShellAggregation;var f=this.getOUnifiedShell();f.setFloatingContainer(d);f.setFloatingActionsContainer(e);this._createAllMyAppsView();}.bind(this));},_createAllMyAppsView:function(){var o=function(b){if(b.isEnabled()){this._initializeAllMyAppsView();}}.bind(this);sap.ushell.Container.getServiceAsync("AllMyApps").then(o);},_initializeAllMyAppsView:function(){X.create({id:"allMyAppsView",viewName:"sap.ushell.renderers.fiori2.allMyApps.AllMyApps"}).then(function(b){var m=this.getModel();b.setModel(m);b.setModel(r.i18nModel,"i18n");b.addCustomData(new A({key:"aria-label",value:r.i18n.getText("allMyApps_headerTitle"),writeToDom:true}));this.getOUnifiedShell().getHeader().getAppTitle().setAllMyApps(b);}.bind(this));},getOUnifiedShell:function(){return this.oUnifiedShell;},setOUnifiedShell:function(U){this.oUnifiedShell=U;},updateShellAggregation:function(n){var b=this.mBindingInfos[n],o=this.getMetadata().getJSONKeys()[n],d;q.each(this[o._sGetter](),function(i,v){this[o._sRemoveMutator](v);}.bind(this));q.each(b.binding.getContexts(),function(i,v){d=b.factory(this.getId()+"-"+i,v)?b.factory(this.getId()+"-"+i,v).setBindingContext(v,b.model):"";this[o._sMutator](d);}.bind(this));},getControllerName:function(){return"sap.ushell.renderers.fiori2.Shell";},addDanglingControl:function(o){this.aDanglingControls.push(o);},destroyDanglingControls:function(){if(this.aDanglingControls){this.aDanglingControls.forEach(function(o){if(o.destroyContent){o.destroyContent();}o.destroy();});}}});});
