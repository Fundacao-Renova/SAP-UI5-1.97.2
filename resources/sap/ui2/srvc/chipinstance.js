// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
this.sap=this.sap||{};(function(){"use strict";sap.ui2=sap.ui2||{};sap.ui2.srvc=sap.ui2.srvc||{};var r=String;if(typeof jQuery==="function"&&jQuery.sap){jQuery.sap.declare("sap.ui2.srvc.chipinstance");r=function(){jQuery.sap.require.apply(this,arguments);};}sap.ui2.srvc.ChipInstance=function(f,a,c,p){var A,b,C,o=new sap.ui2.srvc.Map(),F=false,d=[],R,t,T,e=this;function m(){a.referenceChipInstanceId="";a.referencePageId="";}function g(){m();if(p){p.updateScope();}}function h(){if(!A){throw new sap.ui2.srvc.Error(e+": CHIP instance is just a stub","sap.ui2.srvc.ChipInstance");}}function j(s,i){if(!A){A=c.createApi(e,o);}jQuery.sap.log.debug("Initialized: "+e,null,"sap.ui2.srvc.ChipInstance");sap.ui2.srvc.call(s,i);}function k(n){var i,s=c.getBagIds(),u;for(i=0;i<n.length;i+=1){r("sap.ui2.srvc.bag");b.put(n[i].id,new sap.ui2.srvc.Bag(f,n[i],c.getBag(n[i].id),g));}for(i=0;i<s.length;i+=1){u={pageId:a.pageId,instanceId:a.instanceId,id:s[i],$tmp:true};if(!b.containsKey(u.id)){b.put(u.id,new sap.ui2.srvc.Bag(f,u,c.getBag(u.id),g));}}}function l(){if(c.isStub()){throw new sap.ui2.srvc.Error(this+": initializeConfiguration expects that the CHIP is no stub anymore","sap.ui2.srvc.ChipInstance",false);}if(!C){C={};c.updateConfiguration(C,a.configuration);}}sap.ui2.srvc.testPublishAt(e);function q(s,i){f.getPageBuildingService().updatePageChipInstance(a,function(){m();if(p){p.updateScope();}if(s){s();}},i);}this.attachFullscreen=function(E){if(typeof E!=="function"){throw new sap.ui2.srvc.Error(this+": fullscreen event handler is not a function","sap.ui2.srvc.ChipInstance");}d.push(E);};this.attachRefresh=function(E){if(E&&typeof E!=="function"){throw new sap.ui2.srvc.Error(this+": refresh event handler is not a function","sap.ui2.srvc.ChipInstance");}R=E;};this.attachTitleChange=function(n){T=n;};this.detachAll=function(){d=[];R=null;};this.exit=function(){jQuery.sap.log.debug("Exit: "+e,null,"sap.ui2.srvc.ChipInstance");A=null;b=new sap.ui2.srvc.Map();C=null;t=null;T=null;};this.getApi=function(){return A;};this.getBagIds=function(){return b.keys();};this.getBag=function(B){var i;if(!B){throw new sap.ui2.srvc.Error("Missing bag ID","sap.ui2.srvc.ChipInstance");}i=b.get(B);if(i){return i;}r("sap.ui2.srvc.bag");i=new sap.ui2.srvc.Bag(f,{pageId:a.pageId,instanceId:a.instanceId,id:B,$tmp:true},null,g);b.put(B,i);return i;};this.getChip=function(){return c;};this.getConfiguration=function(){return a.configuration;};this.getConfigurationParameter=function(K){l();if(Object.prototype.hasOwnProperty.call(C,K)){return C[K];}return c.getConfigurationParameter(K);};this.getContract=function(n){h();return o.get(n);};this.getFullscreen=function(){return F;};this.getId=function(){return a.instanceId;};this.getImplementationAsSapui5=function(){h();return c.getImplementationAsSapui5(A);};this.getLayoutData=function(){return a.layoutData;};this.getPage=function(){return p;};this.getTitle=function(){return t||a.title||c.getTitle();};this.getUpdated=function(i){function n(){jQuery.sap.log.error("Parse Error: CHIP instance's updated property has unexpected format","value of updated property: '"+a.updated+"'","sap.ui2.srvc.ChipInstance");}var M,s;if(a.updated&&!i){M=/\((\d*)\)/.exec(a.updated);if(!M){n();return undefined;}s=new Date(parseInt(M[1],10));if(isNaN(s.getTime())){n();return undefined;}return s;}return a.updated;};this.isOutdated=function(){return a.outdated==="X";};this.isReadOnly=function(){h();return a.isReadOnly==="X";};this.isReference=function(){return!!a.referenceChipInstanceId||!!a.referencePageId;};this.isBrokenReference=function(){return a.referenceChipInstanceId==="O"||a.referencePageId==="O";};this.getOriginalId=function(){return(a.referenceChipInstanceId===""||a.referenceChipInstanceId==="O")?undefined:a.referenceChipInstanceId;};this.getOriginalPageId=function(){return(a.referencePageId===""||a.referencePageId==="O")?undefined:a.referencePageId;};this.isStub=function(){return!A;};this.load=function(s,i){var L;i=i||f.getPageBuildingService().getDefaultErrorHandler();L=j.bind(null,s,i);if(c.isStub()){c.load(L,i);}else{sap.ui2.srvc.call(L,i,true);}};this.remove=function(s,i){if(p&&p.removeChipInstance(e,s,i)){return;}this.exit();f.getPageBuildingService().deletePageChipInstance(a.pageId,a.instanceId,s,i);};this.refresh=function(){if(R){try{R();return true;}catch(i){jQuery.sap.log.error(e+": call to refresh handler failed: "+(i.message||i.toString()),null,"sap.ui2.srvc.ChipInstance");return false;}}return false;};this.setFullscreen=function(O){var i,n;if(F!==O){F=O;for(i=0,n=d.length;i<n;i+=1){d[i]();}}};this.setLayoutData=function(L,s,i){if(a.layoutData===L){if(s){i=i||f.getPageBuildingService().getDefaultErrorHandler();sap.ui2.srvc.call(s,i,true);}return;}a.layoutData=L;q(s,i);};this.setTitle=function(n,D,s,i){var O;i=i||f.getPageBuildingService().getDefaultErrorHandler();if(t!==n){t=n;if(T){sap.ui2.srvc.call(T.bind(null,this),i,!D);}}if(D&&a.title!==t){O=a.title;a.title=t;t=undefined;q(s,function(){a.title=O;t=undefined;i.apply(null,arguments);});}else if(s){sap.ui2.srvc.call(s,i,true);}};this.toString=function(v){var i=["sap.ui2.srvc.ChipInstance({oChip:",c.toString(v),",bFullscreen:",F];if(v){i.push(",oAlterEgo:",JSON.stringify(a),",oApi:",JSON.stringify(A),",oBags:",b.toString(),",oConfiguration:",JSON.stringify(C),",oFactory:",f.toString(v),",aFullscreenHandlers.length:",d.length,',sTitle:"',t,'"');}i.push("})");return i.join("");};this.updateConfiguration=function(i,s,n){l();c.updateConfiguration(C,i);a.configuration=JSON.stringify(C);q(s,n);};if(!sap.ui2.srvc.Map){r("sap.ui2.srvc.utils");}b=new sap.ui2.srvc.Map();k((a.ChipInstanceBags&&a.ChipInstanceBags.results)||[]);delete a.Chip;jQuery.sap.log.debug("Created: "+this,null,"sap.ui2.srvc.ChipInstance");};}());
