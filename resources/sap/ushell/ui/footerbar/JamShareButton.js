// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/collaboration/components/fiori/sharing/dialog/Component","sap/m/Button","sap/m/ButtonRenderer","sap/ushell/library","sap/ushell/resources"],function(L,C,B,a,l,r){"use strict";var J=B.extend("sap.ushell.ui.footerbar.JamShareButton",{metadata:{library:"sap.ushell",properties:{beforePressHandler:{type:"any",group:"Misc",defaultValue:null},afterPressHandler:{type:"any",group:"Misc",defaultValue:null},jamData:{type:"object",group:"Misc",defaultValue:null}}},renderer:"sap.m.ButtonRenderer"});J.prototype.init=function(){if(B.prototype.init){B.prototype.init.apply(this,arguments);}this.setEnabled();this.setIcon("sap-icon://share-2");this.setText(r.i18n.getText("shareBtn"));this.attachPress(function(){if(this.getBeforePressHandler()){this.getBeforePressHandler()();}this.showShareDialog(this.getAfterPressHandler());}.bind(this));};J.prototype.showShareDialog=function(c){function o(){this.shareComponent.setSettings(this.getJamData());this.shareComponent.open();if(c){c();}}if(!this.shareComponent){this.shareComponent=sap.ui.getCore().createComponent({name:"sap.collaboration.components.fiori.sharing.dialog"});}if(sap.ushell.Container&&sap.ushell.Container.inAppRuntime()){this.adjustFLPUrl(this.getJamData()).then(function(){o.call(this);}.bind(this),function(e){L.error("Could not retrieve FLP URL",e,"sap.ushell.ui.footerbar.JamShareButton");});}else{o.call(this);}};J.prototype.exit=function(){if(this.shareComponent){this.shareComponent.destroy();}if(B.prototype.exit){B.prototype.exit.apply(this,arguments);}};J.prototype.setEnabled=function(e){if(sap.ushell.Container){var u=sap.ushell.Container.getUser();if(!(u&&u.isJamActive())){if(!e){L.info("Disabling JamShareButton: user not logged in or Jam not active",null,"sap.ushell.ui.footerbar.JamShareButton");}e=false;this.setVisible(false);}}else{if(!e){L.warning("Disabling JamShareButton: unified shell container not initialized",null,"sap.ushell.ui.footerbar.JamShareButton");}e=false;}B.prototype.setEnabled.call(this,e);};J.prototype.adjustFLPUrl=function(j){if(j&&j.object&&j.object.id&&typeof j.object.id==="string"&&j.object.id===document.URL){return sap.ushell.Container.getFLPUrl(true).then(function(u){j.object.id=u;});}return Promise.resolve();};return J;},true);
