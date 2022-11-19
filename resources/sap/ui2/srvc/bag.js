// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
this.sap=this.sap||{};(function(){"use strict";sap.ui2=sap.ui2||{};sap.ui2.srvc=sap.ui2.srvc||{};var r=String;if(typeof jQuery==="function"&&jQuery.sap){jQuery.sap.declare("sap.ui2.srvc.bag");r=function(){jQuery.sap.require.apply(this,arguments);};}sap.ui2.srvc.Bag=function(f,a,p,c){var P,R=false,s=false,t=this;function e(){if(R){throw new sap.ui2.srvc.Error("The previous reset operation is not finished yet","sap.ui2.srvc.Bag");}}function b(){if(s){throw new sap.ui2.srvc.Error("The previous save operation is not finished yet","sap.ui2.srvc.Bag");}}function d(B,A){var j=(B.Properties&&B.Properties.results)||(B.ChipInstanceProperties&&B.ChipInstanceProperties.results)||(B.ChipProperties&&B.ChipProperties.results)||[];P=P||new sap.ui2.srvc.Map();j.forEach(function(o){var n=o.name,O;if(!A||A.containsKey(n)){O=P.put(n,o);o.$currentValue=O?O.$currentValue:o.value;}});delete B.ChipInstanceProperties;delete B.ChipProperties;delete B.Properties;}function g(n,T){var N;if(n.length===0){P.keys().forEach(function(k){if(T===(P.get(k).translatable==="X")){n.push(k);}});return n;}N=new sap.ui2.srvc.Map();n.forEach(function(k){N.put(k);});P.keys().forEach(function(k){if(T===(P.get(k).translatable==="X")){N.put(k);}});return N.keys();}function h(){if(a.instanceId){return{pageId:a.pageId,instanceId:a.instanceId};}return{id:a.pageId};}function i(j,v,T){var o;if(!j){throw new sap.ui2.srvc.Error("Property name must not be empty","sap.ui2.srvc.Bag");}if(typeof j!=="string"){throw new sap.ui2.srvc.Error("Property name must be a string","sap.ui2.srvc.Bag");}o=P.get(j);if(o&&((o.translatable==="X")!==T)){throw new sap.ui2.srvc.Error("'"+j+"' already exists as a "+(T?"non-translatable":"translatable text")+" property","sap.ui2.srvc.Bag");}if(typeof v!=="string"){throw new sap.ui2.srvc.Error("Property value must be a string","sap.ui2.srvc.Bag");}e();if(!o){o={name:j,translatable:(T?"X":" ")};P.put(j,o);}o.$currentValue=v;return t;}this.getId=function(){return a.id;};this.getOwnPropertyNames=function(){return g([],false);};this.getOwnTextNames=function(){return g([],true);};this.getProperty=function(j,D){var o=P.get(j);if(o&&(o.translatable==="X")){throw new sap.ui2.srvc.Error("'"+j+"' is a translatable text property","sap.ui2.srvc.Bag");}if(o){return o.$currentValue;}if(p){return p.getProperty(j,D);}return D;};this.getPropertyNames=function(){var j=p?p.getPropertyNames():[];return g(j,false);};this.getText=function(T){var o=P.get(T);if(o&&(o.translatable!=="X")){throw new sap.ui2.srvc.Error("'"+T+"' is a non-translatable property","sap.ui2.srvc.Bag");}if(o){return o.$currentValue;}if(p){return p.getText(T);}return T;};this.getTextNames=function(){var T=p?p.getTextNames():[];return g(T,true);};this.reset=function(S,E){var o=h(),j=f.getPageBuildingService();function k(B){R=false;a=B;P=undefined;d(a);if(c){c(t);}S();}if(typeof S!=="function"){throw new sap.ui2.srvc.Error("Missing success handler","sap.ui2.srvc.Bag");}b();e();R=true;E=E||j.getDefaultErrorHandler();if(a.$tmp){sap.ui2.srvc.call(k.bind(null,a),E,true);return;}j.deleteBag(o,a.id,function(){a.$tmp=true;j.readBag(o,a.id,k,k.bind(null,a));},function(){R=false;E.apply(null,arguments);});};this.resetProperty=function(j){var o;o=P.get(j);if(o){o.$currentValue=undefined;if(!Object.prototype.hasOwnProperty.call(o,"value")){P.remove(j);}}return this;};this.save=function(S,E){var n=0,o=new sap.ui2.srvc.Map(),m={},j={},k=h(),l=f.getPageBuildingService();if(typeof S!=="function"){throw new sap.ui2.srvc.Error("Missing success handler","sap.ui2.srvc.Bag");}if(typeof E!=="function"){throw new sap.ui2.srvc.Error("Missing error handler","sap.ui2.srvc.Bag");}b();e();l.openBatchQueue();P.keys().forEach(function(N){var u,q=P.get(N);function v(M,w){m[N]=M;j[N]=w;}if(q.$currentValue!==q.value){n+=1;if(Object.prototype.hasOwnProperty.call(q,"value")){if(q.$currentValue===undefined){o.put(N);l.deleteProperty(q,function(){if(q.$currentValue===undefined){P.remove(N);}else{delete q.value;}},v);}else{u=JSON.parse(JSON.stringify(q));u.value=q.$currentValue;l.updateProperty(u,function(){q.value=u.value;},v);}}else{l.createProperty(k,a.id,N,q.$currentValue,q.translatable,function(w){w.$currentValue=q.$currentValue;P.put(N,w);},v);}}});if(o.keys().length){l.readBag(k,a.id,function(B){d(B,o);});}s=true;l.submitBatchQueue(function(){s=false;if(c&&n>Object.keys(m).length){c(t);}if(Object.keys(m).length>0){E(m,j);}else{a.$tmp=false;S();}});};this.setProperty=function(j,v){return i(j,v,false);};this.setText=function(T,j){return i(T,j,true);};this.toString=function(v){var j=['sap.ui2.srvc.Bag({id:"',a.id,'",pageId:"',a.pageId];if(a.instanceId){j.push('",instanceId:"',a.instanceId);}j.push('"');if(v){j.push(",oAlterEgo:",JSON.stringify(a));j.push(",oPropertiesByName:",P.toString());j.push(",bResetting:",R);j.push(",bSaving:",s);}j.push("})");return j.join("");};this.update=function(B){if(!B||a.id!==B.id){throw new sap.ui2.srvc.Error("Bag data belongs to another bag","sap.ui2.srvc.Bag");}P=undefined;d(B);};if(!sap.ui2.srvc.Map){r("sap.ui2.srvc.utils");}d(a);jQuery.sap.log.debug("Created: "+this,null,"sap.ui2.srvc.Bag");};}());