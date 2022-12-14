/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/test/Opa5","sap/ui/test/OpaBuilder","sap/base/util/UriParameters","sap/fe/test/Utils","sap/fe/test/Stubs","sap/fe/test/BaseArrangements"],function(O,a,U,b,S,B){"use strict";return B.extend("sap.fe.test.internal.FEArrangements",{constructor:function(s){B.call(this,b.mergeObjects({launchUrl:"test-resources/sap/fe/templates/internal/demokit/flpSandbox.html"},s));},iResetTestData:function(i){var t=this,u=new U(window.location.href),s=u.get("useBackendUrl"),p=s?"/databinding/proxy/"+s.replace("://","/"):"",c=false,T=window.__karma__&&window.__karma__.config&&window.__karma__.config.ui5?window.__karma__.config.ui5.shardIndex:"default";return a.create(this).success(function(){var r=t.resetTestData(),R=i?Promise.resolve():jQuery.post(p+"/redeploy?tenant="+T);Promise.all([r,R]).finally(function(){c=true;}).catch(function(e){throw e;});return a.create(this).check(function(){return c;}).execute();}).description(b.formatMessage("Reset test data on tenant '{0}'",T)).execute();}});});
