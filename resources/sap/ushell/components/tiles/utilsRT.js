// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/components/tiles/utils","sap/ui/core/format/NumberFormat","sap/m/library","sap/base/Log","sap/ui/model/json/JSONModel"],function(u,N,m,L,J){"use strict";var B=m.ButtonType;var a={};a.getConfiguration=function(t,A,E){var r;var c=t.configuration.getParameterValueAsString("tileConfiguration");var C;try{C=JSON.parse(c||"{}");}catch(e){L.error("Error while trying to parse tile configuration",e,"sap.ushell.components.tiles.utilsRT");return{};}var U=sap.ui.require("sap/ushell/components/tiles/utils");C.editable=true;if(t.configurationUi&&t.configurationUi.isReadOnly){if(t.configurationUi.isReadOnly()){C.editable=false;}}var T=U.getTranslatedTitle(t);var s=U.getTranslatedSubtitle(t,C);var i=U.getTranslatedProperty(t,C,"display_info_text");var k=U.getTranslatedProperty(t,C,"display_search_keywords");if(A){r=U.getResourceBundleModel().getResourceBundle();if(E&&t.bag){var o=t.bag.getOriginalLanguage();var l=sap.ui.getCore().getConfiguration().getLocale().getSAPLogonLanguage();var b=sap.ui.getCore().getConfiguration().getLanguage();C.isLocaleSuitable=o===""||o.toLowerCase()===l.toLowerCase()||o.toLowerCase()===b.toLowerCase();C.orgLocale=o;C.userLocale=l;}}C.display_icon_url=C.display_icon_url||"";if(i!==undefined){C.display_info_text=i;}else if(C.display_info_text===undefined){if(A&&!E){C.display_info_text="["+r.getText("configuration.display_info_text")+"]";}else{C.display_info_text="";}}C.navigation_semantic_object=C.navigation_semantic_object||"";C.navigation_semantic_action=C.navigation_semantic_action||"";C.navigation_semantic_parameters=C.navigation_semantic_parameters||"";C.display_number_unit=C.display_number_unit||"";C.display_number_factor=C.display_number_factor||"";C.service_refresh_interval=C.service_refresh_interval?parseInt(C.service_refresh_interval,10):0;C.service_url=C.service_url||"";C.navigation_target_url=C.navigation_target_url||"";if(A&&U.isInitial(T)){C.display_title_text=E?"":"["+r.getText("configuration.display_title_text")+"]";C.display_subtitle_text=E?"":"["+r.getText("configuration.display_subtitle_text")+"]";}else{C.display_title_text=T||C.display_title_text||"";if(s!==undefined){C.display_subtitle_text=s;}else if(C.display_subtitle_text===undefined){C.display_subtitle_text="";}}C.navigation_use_semantic_object=(C.navigation_use_semantic_object!==false);C.display_search_keywords=k||C.display_search_keywords||"";if(A){C.display_number_value=C.display_number_value||1234;}C.form_factors=C.form_factors?C.form_factors:U.getDefaultFormFactors();C.desktopChecked=C.form_factors.manual.desktop;C.tabletChecked=C.form_factors.manual.tablet;C.phoneChecked=C.form_factors.manual.phone;C.manualFormFactor=!(C.form_factors.appDefault)&&C.editable;C.appFormFactor=C.form_factors.appDefault;C.formFactorConfigDefault=!!C.form_factors.defaultParam;if(C.signature){C.rows=U.getSignatureTableData(C.signature,E&&C.editable);}else{C.rows=(C.mapping_signature&&C.mapping_signature!=="*=*")?U.getMappingSignatureTableData(C.mapping_signature,E&&C.editable):[U.getEmptyRowObj(C.editable)];}if(C.signature){C.isUnknownAllowed=(C.signature.additional_parameters==="allowed"||C.signature.additionalParameters==="allowed");}else{C.isUnknownAllowed=(C.mapping_signature!==undefined)?U.getAllowUnknownParametersValue(C.mapping_signature):true;}if(A){C.tile_actions_rows=U.getTileNavigationActionsRows(t,C.editable);}else if(!C.actions){C.actions=U.getTileNavigationActions(t);}if(A){var d=t.bag.getBag("deprecationProperties"),D=d.getProperty("deprecation"),f=null;if(D){f=r.getText(D==="D"?"configuration.app_deprecated":"configuration.app_archived",[d.getProperty("successor")]);}C.deprecation_text=f;}return C;};a.getDataToDisplay=function(c,d){var b=0,i,n,C,s,D={display_icon_url:d.icon||c.display_icon_url||"",display_title_text:d.title||c.display_title_text||"",display_number_value:!isNaN(d.number)?d.number:"...",display_number_unit:d.numberUnit||c.display_number_unit||"",display_info_text:d.info||c.display_info_text||"",display_info_state:d.infoState||"Neutral",display_subtitle_text:d.subtitle||c.display_subtitle_text||"",display_state_arrow:d.stateArrow||"None",display_number_state:d.numberState||"None",display_number_digits:d.numberDigits>=0?d.numberDigits:4,display_number_factor:d.numberFactor||"",display_search_keyword:d.keywords||c.display_search_keyword||"",targetParams:[]};if(d.infoStatus){D.display_info_state=d.infoStatus;}if(d.targetParams){D.targetParams.push(d.targetParams);}if(d.results){for(i=0,n=d.results.length;i<n;i=i+1){C=d.results[i].number||0;if(typeof C==="string"){C=parseFloat(C,10);}b=b+C;s=d.results[i].targetParams;if(s){D.targetParams.push(s);}}D.display_number_value=b;}if(!isNaN(d.number)){if(typeof d.number==="string"){d.number=d.number.trim();}if(d.number===""){D.display_number_value="...";}else{var S=this._shouldProcessDigits(d.number,d.numberDigits),e=D.display_icon_url?4:5;if(d.number&&d.number.toString().length>=e||S){var o=this._normalizeNumber(d.number,e,d.numberFactor,d.numberDigits);D.display_number_factor=o.numberFactor;D.display_number_value=o.displayNumber;}else{var f=N.getFloatInstance({maxFractionDigits:e});D.display_number_value=f.format(d.number);}}}if(D&&D.display_number_state){switch(D.display_number_state){case"Positive":D.display_number_state="Good";break;case"Negative":D.display_number_state="Error";break;}}return D;};a.getTileSettingsAction=function(M,s,t){var U=sap.ui.require("sap/ushell/components/tiles/utils");var r=U.getResourceBundleModel().getResourceBundle();return{text:(!t||t==="tile")?r.getText("tileSettingsBtn"):r.getText("linkSettingsBtn"),press:function(){return new Promise(function(b){sap.ui.require(["sap/m/Button","sap/m/Dialog","sap/ui/core/mvc/View","sap/ui/layout/form/SimpleForm","sap/ui/layout/form/SimpleFormLayout"],function(c,D,V,S,d){var A={showGroupSelection:false,title:M.getProperty("/config/display_title_text"),subtitle:M.getProperty("/config/display_subtitle_text")};if(!t||t==="tile"){A.info=M.getProperty("/config/display_info_text");A.icon=M.getProperty("/config/display_icon_url");A.keywords=M.getProperty("/config/display_search_keywords");}else if(t==="link"){A.showInfo=false;A.showIcon=false;A.showPreview=false;}V.create({viewName:"module:sap/ushell/ui/footerbar/SaveAsTile.view"}).then(function(o){var e=new J(A);o.setModel(e);var f=new S({id:"tileSettings",layout:d.GridLayout,content:[o]}).addStyleClass("sapUshellAddBookmarkForm");var g=new c("bookmarkOkBtn",{text:r.getText("okBtn"),type:B.Emphasized,press:function(){s(o);j.close();},enabled:true});var h=new c("bookmarkCancelBtn",{text:r.getText("cancelBtn"),press:function(){j.close();}});var i=function(k){g.setEnabled(!!k.trim());};o.getTitleInput().attachLiveChange(function(){i(this.getValue());});var j=new D({id:"settingsDialog",title:(!t||t==="tile")?r.getText("tileSettingsDialogTitle"):r.getText("linkSettingsDialogTitle"),contentWidth:"400px",content:f,beginButton:g,endButton:h,horizontalScrolling:false,afterClose:function(){j.destroy();}}).addStyleClass("sapContrastPlus");j.open();b(j);});});});}};};a.getSemanticNavigationUrl=function(c){var U="#"+jQuery.trim(c.navigation_semantic_object);U+="-"+jQuery.trim(c.navigation_semantic_action);if(c.navigation_semantic_parameters&&jQuery.trim(c.navigation_semantic_parameters).length>0){U+="?"+jQuery.trim(c.navigation_semantic_parameters);}return U;};a.addParamsToUrl=function(U,d){var p="",b=U.indexOf("?")!==-1,t=d.targetParams,i;if(t&&t.length>0){for(i=0;i<t.length;i=i+1){p+=t[i];if(i<t.length-1){p+="&";}}}if(p.length>0){if(!b){U+="?";}else{U+="&";}U+=p;}return U;};a._normalizeNumber=function(n,b,c,i){var d;if(isNaN(n)){d=n;}else{var o=N.getFloatInstance({maxFractionDigits:i});if(!c){var e=Math.abs(n);if(e>=1000000000){c="B";n/=1000000000;}else if(e>=1000000){c="M";n/=1000000;}else if(e>=1000){c="K";n/=1000;}}d=o.format(n);}var f=d;var g=f[b-1];b-=(g==="."||g===",")?1:0;f=f.substring(0,b);return{displayNumber:f,numberFactor:c};};a._shouldProcessDigits=function(d,D){var n;d=typeof(d)!=="string"?d.toString():d;if(d.indexOf(".")!==-1){n=d.split(".")[1].length;if(n>D){return true;}}return false;};return a;},true);