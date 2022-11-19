/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2018 SAP SE. All rights reserved
 */
sap.ui.define(['sap/apf/cloudFoundry/utils'],function(U){'use strict';function R(s,i){var m=i.instances.messageHandler;var c=i.instances.coreApi;var a=i.manifests.manifest;var d=a["sap.app"].dataSources;var l=sap.ui.getCore().getConfiguration().getLanguage();var b={"Content-Type":"application/json; charset=utf-8","Accept-Language":l};var e=d&&d["apf.runtime.analyticalConfigurationAndTextFiles"]&&d["apf.runtime.analyticalConfigurationAndTextFiles"].uri;if(!e){m.putMessage(m.createMessageObject({code:"5236",aParameters:["apf.runtime.analyticalConfigurationAndTextFiles"]}));}var r=U.resolveUri.bind(this,i.instances.coreApi);function g(){return{};}this.readEntity=function(f,h,j){m.check(f==='configuration');var k=j[0].value;var t=this;this.textFiles=undefined;var u=r(e+"/"+k);c.ajax({url:u,success:function(n){var o=JSON.parse(n.analyticalConfiguration.serializedAnalyticalConfiguration);var p=o.configHeader&&o.configHeader.Application;var q={SerializedAnalyticalConfiguration:n.analyticalConfiguration.serializedAnalyticalConfiguration,AnalyticalConfiguration:k,Application:p,AnalyticalConfigurationName:n.analyticalConfiguration.analyticalConfigurationName};t.textFiles=n.textFiles;h(q,g());},error:function(n,o,p,M){var q=m.createMessageObject({code:"5057",aParameters:[u]});if(M){q.setPrevious(M);}h(undefined,g(),q);},headers:b});};this.readCollection=function(f,h,j,k,n){m.check(f==="texts");var t=n.getFilterTermsForProperty('Application');var o=t[0].getValue();if(!this.textFiles){h(undefined,g(),m.createMessageObject({code:"5222",aParameters:[o]}));return;}var p=U.mergeReceivedTexts(this.textFiles,m);h(p.texts,g(),p.messageObject);};}sap.apf.cloudFoundry.RuntimeProxy=R;return R;},true);
