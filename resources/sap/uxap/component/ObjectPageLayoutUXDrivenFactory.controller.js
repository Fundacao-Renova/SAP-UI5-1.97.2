/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/model/BindingMode","sap/ui/model/Context","sap/ui/base/ManagedObject","sap/ui/core/mvc/Controller","sap/base/Log","sap/base/util/ObjectPath","sap/ui/thirdparty/jquery"],function(q,B,C,M,a,L,O,Q){"use strict";return a.extend("sap.uxap.component.ObjectPageLayoutUXDrivenFactory",{connectToComponent:function(m){var h=Q.isEmptyObject(m.getData());m.setDefaultBindingMode(B.OneWay);var H=Q.proxy(function(){if(h){m.detachRequestCompleted(H);}var o=new C(m,"/headerTitle"),b=this.getView().byId("ObjectPageLayout");if(o.getProperty("")){try{this._oHeader=this.controlFactory(b.getId(),o);b.setHeaderTitle(this._oHeader);}catch(e){L.error("ObjectPageLayoutFactory :: error in header creation from config: "+e);}}},this);if(h){m.attachRequestCompleted(H);}else{H();}},controlFactory:function(p,b){var c=b.getProperty(""),o,d,e;try{d=sap.ui.requireSync(c.Type.replace(/\./g,"/"));e=d.getMetadata();Q.each(e._mAllEvents,Q.proxy(function(s,f){if(typeof c[s]=="string"){c[s]=this.convertEventHandler(c[s]);}},this));o=M.create(c);Q.each(e._mAllProperties,Q.proxy(function(P,f){if(c[P]){o.bindProperty(P,"objectPageLayoutMetadata>"+b.getPath()+"/"+P);}},this));}catch(E){L.error("ObjectPageLayoutFactory :: error in control creation from config: "+E);}return o;},convertEventHandler:function(s){var n=window,N=s.split('.');try{Q.each(N,function(i,b){n=n[b];});}catch(e){L.error("ObjectPageLayoutFactory :: undefined event handler: "+s+". Did you forget to require its static class?");n=undefined;}return n;}});});
