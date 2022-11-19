/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/fe/core/library","sap/fe/core/helpers/KeepAliveHelper"],function(C,K){"use strict";var V=C.VariantManagement;return{applyInitialStateOnly:function(){return false;},adaptStateControls:function(s){var v=this.getView(),c=v.getController(),o=v.getViewData(),b=false;switch(o.variantManagement){case V.Control:b=true;break;case V.Page:case V.None:break;default:throw new Error("unhandled variant setting: "+o.getVariantManagement());}c._findTables().forEach(function(t){var q=t.getQuickFilter();if(q){s.push(q);}if(b){s.push(t.getVariant());}});s.push(v.byId("fe::ObjectPage"));},adaptControlStateHandler:function(c,a){if(c.isA("sap.ui.fl.variants.VariantManagement")){a.push({retrieve:function(v){return{"variantId":v.getCurrentVariantKey()};},apply:function(v,o){if(o&&o.variantId!==undefined&&!(o.variantId===v.getId()&&v.getModified()===false)){v.setModified(true);}}});}},adaptBindingRefreshControls:function(c){var v=this.getView(),r=K.getViewRefreshInfo(v),o=v.getController(),a=[];if(r){var O=o._getObjectPageLayoutControl();a.push(O);}if(r!=="includingDependents"){var b=o._findTables();a=a.concat(K.getControlsForRefresh(v,b)||[]);}return a.reduce(function(p,d){if(p.indexOf(d)===-1){p.push(d);}return p;},c);}};});
