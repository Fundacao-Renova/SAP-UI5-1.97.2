// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/Button","sap/ushell/library"],function(B,u){"use strict";var P=B.extend("sap.ushell.ui.appfinder.PinButton",{metadata:{library:"sap.ushell",properties:{selected:{type:"boolean",group:"Appearance",defaultValue:false}}}});P.prototype.onAfterRendering=function(){this.$("inner").toggleClass("sapUshellPinSelected",this.getSelected());};return P;});
