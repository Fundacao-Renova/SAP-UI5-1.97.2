// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define([],function(){"use strict";function R(){var d=false,c,b=false;this.resetBackNavigationFlag=function(){b=false;};sap.ui.getCore().getEventBus().subscribe("relatedServices","resetBackNavigation",this.resetBackNavigationFlag,this);this._defaultBackNavigation=function(){window.history.back();};this.isBackNavigation=function(){return b;};this.navigateBack=function(){var t=this;b=true;if(d===true){this._defaultBackNavigation();}else if(c){c();}else{sap.ushell.Container.getServiceAsync("CrossApplicationNavigation").then(function(C){C.isInitialNavigationAsync().then(function(i){if(i){C.toExternal({target:{shellHash:"#"},writeHistory:false});return;}t._defaultBackNavigation();});});}};this.setNavigateBack=function(i){d=false;c=i;};this.resetNavigateBack=function(){d=true;c=undefined;};this.restore=function(i){d=i.bDefaultBrowserBack;c=i.fnCustomBackNavigation;};this.store=function(s){s.bDefaultBrowserBack=d;s.fnCustomBackNavigation=c;};}return new R();},true);