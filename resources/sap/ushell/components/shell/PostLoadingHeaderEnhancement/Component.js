// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/Device","sap/ui/core/Component","sap/ui/core/CustomData","sap/ui/core/IconPool","sap/ushell/Config","sap/ushell/EventHub","sap/ushell/library","sap/ushell/resources","sap/ushell/renderers/fiori2/AccessKeysHandler","sap/ushell/ui/launchpad/AccessibilityCustomData","sap/ushell/ui/shell/ShellHeadItem"],function(D,C,a,I,b,E,u,r,A,c,S){"use strict";var F=S.prototype.FloatingNumberType;var d=u.AppTitleState;var e=[];return C.extend("sap.ushell.components.shell.PostLoadingHeaderEnhancement.Component",{metadata:{library:"sap.ushell"},init:function(){var s=sap.ushell.Container.getRenderer("fiori2").getShellConfig();e.push(this._createHomeButton(s));e.push(this._createBackButton());e.push(this._createOverflowButton());if(s.moveAppFinderActionToShellHeader&&b.last("/core/catalog/enabled")&&!s.disableAppFinder){e.push(this._createAppFinderButton());}if(s.moveContactSupportActionToShellHeader){this._createSupportButton().then(function(B){e.push(B);});}this._createShellNavigationMenu(s);var o=sap.ui.getCore().byId("shell-header");o.updateAggregation("headItems");o.updateAggregation("headEndItems");},_createHomeButton:function(s){var h=new S({id:"homeBtn",tooltip:r.i18n.getText("homeBtn_tooltip"),ariaLabel:r.i18n.getText("homeBtn_tooltip"),icon:I.getIconURI("home"),target:"{/homeUri}"});if(b.last("/core/extension/enableHelp")){h.addStyleClass("help-id-homeBtn",true);}h.addCustomData(new c({key:"aria-disabled",value:"false",writeToDom:true}));if(D.system.desktop){h.addEventDelegate({onsapskipback:function(o){if(A.getAppKeysHandler()){o.preventDefault();A.bFocusOnShell=false;}},onsapskipforward:function(o){if(A.getAppKeysHandler()){o.preventDefault();A.bFocusOnShell=false;}}});}return h.getId();},_createBackButton:function(){var B=sap.ui.getCore().getConfiguration().getRTL()?"feeder-arrow":"nav-back";var o=new S({id:"backBtn",tooltip:r.i18n.getText("backBtn_tooltip"),ariaLabel:r.i18n.getText("backBtn_tooltip"),icon:I.getIconURI(B),press:function(){E.emit("navigateBack",Date.now());}});return o.getId();},_createOverflowButton:function(){var s=sap.ushell.Container.getRenderer("fiori2").getShellController().getModel();var o=new S({id:"endItemsOverflowBtn",tooltip:{path:"/notificationsCount",formatter:function(n){return this.tooltipFormatter(n);}},ariaLabel:r.i18n.getText("shellHeaderOverflowBtn_tooltip"),ariaHaspopup:"dialog",icon:"sap-icon://overflow",floatingNumber:"{/notificationsCount}",floatingNumberType:F.OverflowButton,press:function(f){E.emit("showEndItemOverflow",f.getSource().getId(),true);}});o.setModel(s);return o.getId();},_createAppFinderButton:function(){var o=new S({id:"openCatalogBtn",text:r.i18n.getText("open_appFinderBtn"),tooltip:r.i18n.getText("open_appFinderBtn"),icon:"sap-icon://sys-find",target:"#Shell-appfinder"});if(b.last("/core/extension/enableHelp")){o.addStyleClass("help-id-openCatalogActionItem");}return o.getId();},_createSupportButton:function(){return new Promise(function(R){sap.ui.require(["sap/ushell/ui/footerbar/ContactSupportButton"],function(f){var B="ContactSupportBtn";var s=sap.ui.getCore().byId(B);if(!s){var t=new f("tempContactSupportBtn",{visible:true});var i=t.getIcon();var T=t.getText();s=new S({id:B,icon:i,tooltip:T,text:T,ariaHaspopup:"dialog",press:function(){t.firePress();}});}R(B);});});},_createShellNavigationMenu:function(s){sap.ui.require(["sap/m/StandardListItem","sap/ushell/ui/shell/NavigationMiniTile","sap/ushell/ui/shell/ShellNavigationMenu"],function(f,N,g){var m="shellNavigationMenu";var h=function(k,l){var n=l.getProperty("icon")||"sap-icon://circle-task-2",t=l.getProperty("title"),p=l.getProperty("subtitle"),q=l.getProperty("intent");var L=(new f({type:"Active",title:t,description:p,icon:n,wrapping:true,customData:[new a({key:"intent",value:q})],press:function(){if(q&&q[0]==="#"){E.emit("navigateFromShellApplicationNavigationMenu",q,true);}}})).addStyleClass("sapUshellNavigationMenuListItems");return L;};var R=function(k,l){var n=l.getProperty("icon"),t=l.getProperty("title"),p=l.getProperty("subtitle"),q=l.getProperty("intent");return new N({title:t,subtitle:p,icon:n,intent:q,press:function(){var T=this.getIntent();if(T&&T[0]==="#"){E.emit("navigateFromShellApplicationNavigationMenu",T,true);}}});};var o=new g(m,{title:"{/application/title}",icon:"{/application/icon}",showTitle:"{/application/showNavMenuTitle}",showRelatedApps:s.appState!=="lean",items:{path:"/application/hierarchy",factory:h.bind(this)},miniTiles:{path:"/application/relatedApps",factory:R.bind(this)},visible:{path:"/ShellAppTitleState",formatter:function(k){return k===d.ShellNavMenu;}}});sap.ushell.Container.getRenderer("fiori2").getShellController().handleNavMenuTitleVisibility(D.media.getCurrentRange(D.media.RANGESETS.SAP_STANDARD));var i=sap.ui.getCore().byId("shell-header");o.setModel(i.getModel());var j=sap.ui.getCore().byId("shellAppTitle");if(j){j.setNavigationMenu(o);}e.push(m);return m;}.bind(this));},exit:function(){e.forEach(function(s){var o=sap.ui.getCore().byId(s);if(o){o.destroy();}});e=[];}});});
