// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.require(["sap/ushell_abap/pbServices/ui2/Chip","sap/ushell_abap/pbServices/ui2/Error","sap/base/Log"],function(C,S,L){"use strict";if(typeof jQuery==="function"&&jQuery.sap){jQuery.sap.declare("sap.ui2.srvc.contracts.visible");}C.addContract("visible",function(c){var v=true,o;function a(){try{o(v);}catch(e){L.error(c+": call to visible handler failed: "+(e.message||e.toString()),null,"chip.visible");}}this.attachVisible=function(e){if(typeof e!=="function"){throw new S("Not a function: "+e,"chip.visible");}if(o===e){return;}o=e;a();};this.isVisible=function(){return v;};return{setVisible:function(n){if(v===n){return;}v=n;if(o){a();}}};});});