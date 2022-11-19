/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["./i18n","sap/esh/search/ui/controls/SearchFieldGroup","sap/esh/search/ui/SearchHelper","sap/m/ButtonType","sap/ui/core/InvisibleText","sap/base/Log","sap/ui/Device",],function(a,S,b,B,I,L,D){"use strict";var m={};var s="sapUshellShellShowSearchOverlay";var c;m.injectSearchModel=function(_){c=c||_;};jQuery.extend(m,{init:function(){var t=this;sap.ushell.Container.getServiceAsync("Search").then(function(d){d.prefetch();});sap.ui.require("sap/esh/search/ui/SearchModel");t.oModel=sap.esh.search.ui.getModelSingleton({},"flp");t.oShellHeader=sap.ui.getCore().byId("shell-header");t.oSearchFieldGroup=new S("searchFieldInShell");t.oSearchFieldGroup.setModel(t.oModel);t.oShellHeader.setSearch(t.oSearchFieldGroup);t.setSearchState("COL");this.setSearchStateSync=this.setSearchState;this.setSearchState=b.delayedExecution(this.setSearchState,500);t.oSearchInput=t.oSearchFieldGroup.input;t.oSearchInput.setMaxSuggestionWidth("30rem");t.oSearchInput.setValue(t.oModel.getSearchBoxTerm());t.oSearchSelect=t.oSearchFieldGroup.select;var l=new I("searchShellSelectLabel",{text:a.getText("searchIn"),});if(l){t.oSearchSelect.addAriaLabelledBy("searchShellSelectLabel");}t.oSearchSelect.setTooltip(a.getText("searchInTooltip"));t.oSearchSelect.addEventDelegate({onAfterRendering:function(){jQuery('[id$="searchFieldInShell-select-icon"]').attr("title",a.getText("searchIn"));},},t.oSearchSelect);t.oSearchSelect.setTooltip(a.getText("searchIn"));t.oSearchSelect.attachChange(function(){t.focusInputField({selectContent:true,});});t.oSearchButton=t.oSearchFieldGroup.button;t.oSearchButton.bindProperty("type",{parts:[{path:"/searchButtonStatus",},],formatter:function(d){if(d==="search"){return B.Emphasized;}return B.Default;},});t.oSearchButton.attachPress(function(){t.handleClickSearchButton();});t.oSearchButton.addEventDelegate({onAfterRendering:function(){var d=jQuery("div.sapUshellShellSearchHidden").length===0;var e=t.oModel.getProperty("/searchButtonStatus")==="close";var $=jQuery(t.oSearchButton.getDomRef());if(d){if(e){$.attr("aria-pressed",true);}else{$.removeAttr("aria-pressed");}}else{$.attr("aria-pressed",false);}},});t.oSearchCancelButton=t.oSearchFieldGroup.cancelButton;t.oSearchCancelButton.attachPress(function(){t.setSearchState("COL");window.setTimeout(function(){sap.ui.getCore().byId("sf").focus();},1000);});this.oSearchFieldGroup.setCancelButtonActive(false);t.registerFocusHandler();sap.ui.getCore().getEventBus().subscribe("shell","searchCompLoaded",t.onSearchComponentLoaded,t);t.oModel.subscribe("ESHSearchFinished",t.onAllSearchFinished,t);sap.ui.getCore().byId("viewPortContainer").attachAfterNavigate(t.onAfterNavigate,t);sap.ui.getCore().getEventBus().subscribe("sap.ushell","appComponentLoaded",function(){if(t.oModel&&t.oModel.focusHandler&&b.isSearchAppActive()){t.oModel.focusHandler.setFocus();}});t.oShellHeader.attachSearchSizeChanged(this.sizeSearchFieldChanged.bind(this));},sizeSearchFieldChanged:function(e){var d=e.mParameters.remSize;var l=24;if(d<=l){this.oSearchSelect.setDisplayMode("icon");}else{this.oSearchSelect.setDisplayMode("default");}l=9;if(d<l){this.oSearchButton.setVisible(false);}else{this.oSearchButton.setVisible(true);}if(e.getParameter("isFullWidth")){this.oSearchFieldGroup.setCancelButtonActive(true);this.oSearchFieldGroup.addStyleClass("sapUshellSearchInputFullWidth");}else{this.oSearchFieldGroup.setCancelButtonActive(false);this.oSearchFieldGroup.removeStyleClass("sapUshellSearchInputFullWidth");}},sizeChanged:function(p){switch(p.name){case"Phone":this.oSearchFieldGroup.setCancelButtonActive(true);break;case"Tablet":this.oSearchFieldGroup.setCancelButtonActive(false);break;case"Desktop":this.oSearchFieldGroup.setCancelButtonActive(false);break;default:break;}},registerFocusHandler:function(){var r=true;if(!r){return;}var t=this;var d=t.oSearchInput.getModel();t.oSearchInput.addEventDelegate({onAfterRendering:function(){var i=jQuery(t.oSearchInput.getDomRef()).find("input")[0];var $=jQuery(i);$.on("focus",function(){t.log("raw_in",document.activeElement);if(!t.isFocusHandlerActive){return;}t.setSearchState("EXP");});$.on("blur",function(){t.log("raw_out",document.activeElement);if(!t.isFocusHandlerActive){return;}var p=t.oSearchSelect.getPicker();if(p&&p.oPopup&&p.oPopup.eOpenState==="OPENING"){return;}if(!t.isMobile()&&!b.isSearchAppActive()&&t.oSearchInput.getValue().length===0&&d.getDataSource()===d.getDefaultDataSource()){t.setSearchState("COL",undefined,true);}else{t.setSearchState("EXP_S");}});},});t.oSearchSelect.addEventDelegate({onAfterRendering:function(){var e=t.oSearchSelect.getDomRef();e=e.querySelector('[id$="searchFieldInShell-select-hiddenSelect"]');e.addEventListener("focus",function(){t.log("raw_in_select",document.activeElement);if(!t.isFocusHandlerActive){return;}if(t.oShellHeader.getSearchState()==="EXP_S"&&!t.isNoSearchResultsScreen()){t.setSearchState("EXP_S",true);return;}t.setSearchState.abort();});e.addEventListener("blur",function(){t.log("raw_out_select",document.activeElement);if(!t.isFocusHandlerActive){return;}var p=t.oSearchSelect.getPicker();if(p&&p.oPopup&&p.oPopup.eOpenState==="OPENING"){return;}if(!t.isMobile()&&!b.isSearchAppActive()&&t.oSearchInput.getValue().length===0&&d.getDataSource()===d.getDefaultDataSource()){t.setSearchState("COL",undefined,true);}else{t.setSearchState("EXP_S");}});},});t.oSearchButton.addEventDelegate({onAfterRendering:function(){var e=t.oSearchButton.getDomRef();e.addEventListener("focus",function(){t.log("raw_in_button",document.activeElement);if(!t.isFocusHandlerActive){return;}t.setSearchState.abort();});e.addEventListener("blur",function(){t.log("raw_out_button",document.activeElement);if(!t.isFocusHandlerActive){return;}if(!t.isMobile()&&!b.isSearchAppActive()&&t.oSearchInput.getValue().length===0&&d.getDataSource()===d.getDefaultDataSource()){t.setSearchState("COL",undefined,true);}else{t.setSearchState("EXP_S");}});},});this.enableFocusHandler(true);},enableFocusHandler:function(d){this.isFocusHandlerActive=d;if(!d&&this.setSearchState.abort){this.setSearchState.abort();}},isMobile:function(){return D.system.phone||D.system.tablet;},isSearchFieldFocused:function(){var d=document.activeElement;if(!d.getAttribute){return false;}var i=d.getAttribute("id");if(document.querySelector("#searchFieldInShell #"+i)){return true;}return false;},isOverlayShown:function(){var d=this.oShellHeader.getShellLayoutControl();return d.hasStyleClass(s);},setSearchState:function(d,e,i){var f=sap.ui.getCore().byId("sf");if(!f){return;}if(typeof e==="undefined"){switch(d){case"EXP":e=true;break;case"EXP_S":e=false;break;case"COL":e=false;break;}if(this.isNoSearchResultsScreen()){e=false;}}if(sap.ui.getCore().byId("searchFieldInShell")===undefined){return;}if(this.oShellHeader.getSearchState()===d&&e===this.isOverlayShown()){return;}if(this.isSearchFieldFocused()&&i&&d==="COL"){return;}if(d==="COL"){this.enableFocusHandler(false);}else{this.enableFocusHandler(true);}this.log("set search state",d,document.activeElement);switch(d){case"COL":this.oModel.abortSuggestions();this.oShellHeader.setSearchState(d,35,e);this.oSearchCancelButton.setVisible(false);f.setVisible(true);break;case"EXP_S":this.oShellHeader.setSearchState(d,35,e);this.oSearchCancelButton.setVisible(true);f.setVisible(false);break;case"EXP":this.oShellHeader.setSearchState(d,35,e);this.oSearchCancelButton.setVisible(true);f.setVisible(false);this.focusInputField({selectContent:false,});break;default:break;}},isNoSearchResultsScreen:function(){return(b.isSearchAppActive()&&this.oModel.getProperty("/boCount")===0&&this.oModel.getProperty("/appCount")===0);},onShellSearchButtonPressed:function(){if(sap.ui.getCore().byId("searchFieldInShell")===undefined){this.init();}else if(!b.isSearchAppActive()&&this.oShellHeader.getSearchState()==="COL"){this.resetModel();}this.setSearchState("EXP");var t=this;function e(E){if(E.keyCode===27){E.preventDefault();if(b.isSearchAppActive()){return;}if(t.oSearchInput){if(t.oSearchInput.getValue()===""){jQuery(document).off("keydown",e);t.setSearchState("COL");window.setTimeout(function(){sap.ui.getCore().byId("sf").focus();},1000);}else if(t.oSearchInput.getValue()===" "){t.oSearchInput.setValue("");}}}}jQuery(document).on("keydown",e);},handleClickSearchButton:function(){if(this.oSearchInput.getValue()===""&&this.oModel.getDataSource()===this.oModel.getDefaultDataSource()){this.setSearchState("COL");window.setTimeout(function(){sap.ui.getCore().byId("sf").focus();},1000);}},focusInputField:function(o){o=o||{};var t=this;if(t.focusInputFieldTimeout){window.clearTimeout(t.focusInputFieldTimeout);t.focusInputFieldTimeout=null;}var d=function(r){if(!t.oSearchInput){return;}t.focusInputFieldTimeout=null;var e=t.oSearchInput.getDomRef();if(e&&jQuery(e).is(":visible")&&!sap.ui.getCore().getUIDirty()){if(t.oSearchInput.getEnabled()){t.oSearchInput.focus();if(o.selectContent){t.oSearchInput.selectText(0,9999);}return;}}if(r>0){t.focusInputFieldTimeout=window.setTimeout(function(){if(!t.oModel.getProperty("/initializingObjSearch")){r--;}d(r);},100);}};d(10);},getDefaultOpen:function(){return this.defaultOpen;},setDefaultOpen:function(d){this.defaultOpen=d;},getSearchInput:function(){return this.oSearchFieldGroup?this.oSearchFieldGroup.input:null;},onAfterNavigate:function(e){if(e.getParameter("toId")!=="shellPage-Action-search"&&e.getParameter("toId")!=="applicationShellPage-Action-search"&&e.getParameter("toId")!=="application-Action-search"){return;}this.oModel.focusHandler.setFocus();this.oModel._notifySubscribers("searchLayoutChanged");},onAllSearchFinished:function(){this.oSearchInput.setValue(this.oModel.getSearchBoxTerm());this.log("search finished");this.setSearchState("EXP_S");},onSearchComponentLoaded:function(){if(!b.isSearchAppActive()){return;}this.setSearchState("EXP_S");},resetModel:function(){this.oSearchInput.setValue("");this.oModel.resetQuery();},logSwitch:true,log:function(){if(!this.logSwitch){return;}var l=function(f){var g=f.getAttribute("id");if(g){return g;}return"unknown_id";};var d=function(f){var r=[];for(var i=0;i<f.classList.length;++i){r.push(f.classList.item(i));}return r.join(",");};var p=["xx"];for(var i=0;i<arguments.length;++i){var e=arguments[i];if(e&&e.getAttribute){p.push(l(e)+","+d(e));continue;}if(e){p.push(e);continue;}p.push("undef");}L.debug(p.join(" | "),undefined,"sap.esh.search.ui.SearchShellHelper");},});return m;});