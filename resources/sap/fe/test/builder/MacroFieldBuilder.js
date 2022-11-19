/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./FEBuilder","./MdcFieldBuilder","sap/ui/test/OpaBuilder","sap/fe/test/Utils"],function(F,a,O,U){"use strict";function _(C,e){if(C.isA("sap.ui.mdc.Field")){return a.Matchers.value(e);}if(C.isA("sap.ui.unified.Currency")){return O.Matchers.properties({stringValue:e.stringValue,currency:e.description});}var E=e;if(e.value){E=e.description?e.description+" ("+e.value+")":e.value;}if(C.isA("sap.m.InputBase")){return O.Matchers.properties({value:E});}if(C.isA("sap.m.ObjectIdentifier")){return O.Matchers.properties({title:E});}return O.Matchers.properties({text:E});}function b(C,n,v){if(C.isA("sap.ui.mdc.Field")){return a.Matchers.state(n,v);}return F.Matchers.state(n,v);}function c(C){if(C.isA("sap.fe.macros.FieldAPI")){return c(C.getContent());}if(C.isA("sap.fe.core.controls.FormElementWrapper")){return c(C.getContent());}if(C.isA("sap.fe.core.controls.FieldWrapper")){if(C.getEditMode()==="Display"){return c(C.getContentDisplay());}else{return c(C.getContentEdit()[0]);}}if(C.isA("sap.fe.core.controls.ConditionalWrapper")){var l=C.getCondition()?C.getContentTrue():C.getContentFalse();return c(l);}return C.isA("sap.ui.mdc.Field")||C.isA("sap.m.Text")||C.isA("sap.m.ExpandableText")||C.isA("sap.m.Label")||C.isA("sap.m.CheckBox")||C.isA("sap.m.Link")||C.isA("sap.m.ObjectStatus")||C.isA("sap.m.InputBase")||C.isA("sap.m.Avatar")||C.isA("sap.ui.unified.Currency")||C.isA("sap.m.ObjectIdentifier")||C.isA("sap.m.RatingIndicator")||C.isA("sap.m.ProgressIndicator")?[C]:O.Matchers.children(O.create().hasSome(F.Matchers.state("controlType","sap.ui.mdc.Field"),F.Matchers.state("controlType","sap.m.Text"),F.Matchers.state("controlType","sap.m.ExpandableText"),F.Matchers.state("controlType","sap.m.Label"),F.Matchers.state("controlType","sap.m.Link"),F.Matchers.state("controlType","sap.m.ObjectStatus"),F.Matchers.state("controlType","sap.m.InputBase"),F.Matchers.state("controlType","sap.m.Avatar"),F.Matchers.state("controlType","sap.ui.unified.Currency"),F.Matchers.state("controlType","sap.m.ObjectIdentifier"),F.Matchers.state("controlType","sap.m.RatingIndicator"),F.Matchers.state("controlType","sap.m.ProgressIndicator")))(C);}var M=function(){return F.apply(this,arguments);};M.create=function(o){return new M(o);};M.prototype=Object.create(F.prototype);M.prototype.constructor=M;M.prototype.getStatesMatcher=function(s){return M.Matchers.states(s);};M.prototype.hasValue=function(v){if(v===undefined){return this;}return this.has(M.Matchers.value(v));};M.prototype.do=function(A){this.has(function(C){if(!C){return null;}if(!Array.isArray(C)){C=[C];}return C.reduce(function(m,v){return m.concat(c(v));},[]);});return F.prototype.do.call(this,O.Actions.executor(A));};M.prototype.doOpenValueHelp=function(){return this.do(function(C){if(C.isA("sap.ui.mdc.Field")){F.Actions.keyboardShortcut("F4","input")(C);}});};M.Matchers={value:function(e){return function(C){var m=c(C);return m.some(function(o){return O.Matchers.match(_(o,e))(o);});};},empty:function(C){return C.getVisible()===false;},state:function(n,v){return function(C){var m=[C].concat(c(C));return m.some(function(o){return O.Matchers.match(b(o,n,v))(o);});};},states:function(s){return F.Matchers.states(s,M.Matchers.state);}};return M;});
