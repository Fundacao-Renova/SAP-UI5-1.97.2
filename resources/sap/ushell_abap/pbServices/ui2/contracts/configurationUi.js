// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell_abap/pbServices/ui2/Chip","sap/ushell_abap/pbServices/ui2/Error"],function(C,S){"use strict";if(typeof jQuery==="function"&&jQuery.sap){jQuery.sap.declare("sap.ui2.srvc.contracts.configurationUi");}C.addContract("configurationUi",function(c){var f,d,D,e=false,s,u;this.attachCancel=function(E){if(typeof E!=="function"){throw new S("Cancel event handler is not a function","chip.configurationUi");}f=E;};this.attachSave=function(E){if(typeof E!=="function"){throw new S("Save event handler is not a function","chip.configurationUi");}s=E;};this.display=function(){if(d){d();}};this.isEnabled=function(){return e;};this.isReadOnly=function(){return c.isReadOnly();};this.setDirtyProvider=function(p){D=p;};this.setUiProvider=function(p){u=p;};return{attachDisplay:function(E){if(typeof E!=="function"){throw new S("Display event handler is not a function","ChipInstance");}d=E;},fireCancel:function(){if(f){f();}},fireSave:function(){return s?s():undefined;},getUi:function(p){return u?u(p):undefined;},isDirty:function(){return D?D():undefined;},setEnabled:function(n){e=n;}};});});