// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/mvc/Controller","sap/esh/search/ui/SearchShellHelper","sap/esh/search/ui/SearchShellHelperAndModuleLoader"],function(C,S){"use strict";return C.extend("sap/ushell/renderers/fiori2/search/searchComponent/SearchApp",{onInit:function(){sap.ushell.Container.getServiceAsync("ShellNavigation").then(function(s){this.oShellNavigation=s;this.oShellNavigation.hashChanger.attachEvent("hashChanged",this.hashChanged);}.bind(this));if(S.oSearchFieldGroup===undefined){S.init();}S.setSearchState("EXP_S");},hashChanged:function(){var m=sap.esh.search.ui.getModelSingleton({},"flp");m.parseURL();},onExit:function(){this.oShellNavigation.hashChanger.detachEvent("hashChanged",this.hashChanged);var t=this.oView.getContent()[0].oTablePersoController;if(t&&t.getTablePersoDialog&&t.getTablePersoDialog()){t.getTablePersoDialog().destroy();}if(S.getDefaultOpen()!==true){S.setSearchStateSync("COL");}else{S.setSearchState("EXP");}if(this.oView.getContent()[0].oSearchPage.oFacetDialog){this.oView.getContent()[0].oSearchPage.oFacetDialog.destroy();}}});});