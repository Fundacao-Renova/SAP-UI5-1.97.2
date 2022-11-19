/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/thirdparty/datajs","sap/apf/utils/utils","sap/apf/core/constants","sap/ui/thirdparty/jquery"],function(d,u,c,q){"use strict";sap.apf.core.OdataProxy=function(s,a){var b=a.instances.coreApi;var m=a.instances.messageHandler;var e=s.serviceRoot;function g(e,i){return b.getEntityTypeMetadata(e,i);}function f(j){var i,w,x;if(!j){return"";}w=j.length;if(w===1){return"('"+j[0].value+"')";}x="(";for(i=0;i<w;i++){if(i>0){x=x+",";}x=x+j[i].name+"='"+j[i].value+"'";}return x+")";}function h(E){var i;if(E.messageObject&&E.messageObject.getCode){i=E.messageObject;}else if(E.response&&E.response.statusCode&&E.response.statusCode>=400){i=m.createMessageObject({code:'11005',aParameters:[E.response.statusCode.toString(),E.response.statusText]});}else{i=m.createMessageObject({code:'5201'});}m.putMessage(i);return i;}function k(E,i){var j=h(E);i(undefined,undefined,j);}function l(D,e,i,j){var w;var x;if(D&&D.results){w=D.results;}else if(D){w=D;}else{x=m.createMessageObject({code:'5201'});}g(e,i).done(function(y){j(w,y,x);});}function n(i){var j=JSON.parse(i.SerializedAnalyticalConfiguration);delete i.SerializedAnalyticalConfiguration;j.configHeader=i;i.SerializedAnalyticalConfiguration=JSON.stringify(j);return i;}this.readEntity=function(i,j,w,x,y){var z=sap.apf.core.constants.entitySets[i];b.getXsrfToken(e).done(function(A){var B=e+'/'+z;B=B+f(w);if(x&&x.length>0){B=B+"?$select="+x.join();}var C={requestUri:B,async:true,method:"GET",headers:{"x-csrf-token":A}};b.odataRequest(C,function(D){l(D,e,z,j);},function(E){k(E,j);});});};function o(P,i,j){var w="'";if(j&&j.dataType){return sap.apf.utils.formatValue(i,j.dataType.type);}if(typeof i==='number'){return i;}return w+sap.apf.utils.escapeOdata(i)+w;}function p(j){var w=q.Deferred();b.getXsrfToken(e).done(function(x){var y=[];var i,z=j.length;var A;var B=0;for(i=0;i<z;i++){A=sap.apf.core.constants.entitySets[j[B].entitySetName];g(e,A).done(function(C){var D,E,F;var S=false;D=sap.apf.core.constants.entitySets[j[B].entitySetName];D=D+f(j[B].inputParameters);if(j[B].selectList&&j[B].selectList.length>0){D=D+"?$select="+j[B].selectList.join();S=true;}if(j[B].filter){if(S){D=D+'&';}else{D=D+'?';}D=D+'$filter='+j[B].filter.toUrlParam({formatValue:function(P,G){return o(P,G,C);}});}E=j[B].method||'GET';F={requestUri:D,method:E,headers:{"Accept-Language":sap.ui.getCore().getConfiguration().getLanguage(),"x-csrf-token":x}};if(E!=="GET"){F.data=j[B].data;}y.push(F);B++;if(B===z){w.resolve(y);}});}});return w;}function r(i,j,w,x){var y=q.Deferred();var Q='';var z=i+f(j);if(w&&w.length>0){Q="$select="+w.join();}g(e,i).done(function(A){if(x){if(Q){Q=Q+'&';}Q=Q+'$filter='+x.toUrlParam({formatValue:function(P,B){return o(P,B,A);}});}if(i===sap.apf.core.constants.entitySets.application){if(Q){Q=Q+'&';}Q=Q+'$orderby=ApplicationName';}if(Q){z=z+'?'+Q;}y.resolve(z);});return y;}function t(i,j){var w="unknown error";var x="unknown error";var y="";if(i.message!==undefined){w=i.message;}var z="unknown";if(i.response&&i.response.statusCode){z=i.response.statusCode;x=i.response.statusText||"";y=i.response.requestUri;}if(i.messageObject&&i.messageObject.type==="messageObject"){j([],i.messageObject);}else{j([],m.createMessageObject({code:"5001",aParameters:[z,w,x,y]}));}}this.doChangeOperationsInBatch=function(w,x){b.getXsrfToken(e).done(function(y){p(w).done(function(z){var A={requestUri:e+'/'+'$batch',method:"POST",headers:{"x-csrf-token":y},data:{__batchRequests:[{__changeRequests:z}]}};var S=function(B,C){var D;var F;var G,H,I;var J="";var i,j;if(B&&B.__batchResponses){for(i=0;i<B.__batchResponses.length;i++){if(B.__batchResponses[i].message){G=B.__batchResponses[i].message;H="";J=C.requestUri;D=m.createMessageObject({code:"5001",aParameters:[H,G,"",J]});break;}for(j=0;j<B.__batchResponses[i].__changeResponses.length;j++){F=B.__batchResponses[i].__changeResponses[j];if(F.message){G=F.message;I=F.data;H=F.statusCode;J=C.requestUri;D=m.createMessageObject({code:"5001",aParameters:[H,G,I,J]});break;}}}x(D);}};var E=function(i){t(i,x);};b.odataRequest(A,S,E,OData.batchHandler);});});};this.readCollectionsInBatch=function(j,w){b.getXsrfToken(e).done(function(x){p(j).done(function(y){var z={requestUri:e+'/'+'$batch',async:true,method:"POST",headers:{"x-csrf-token":x},data:{__batchRequests:y}};var S=function(A){var B=[];var C,D,F,G,H;var i;if(A&&A.__batchResponses){for(i=0;i<A.__batchResponses.length;i++){if(A.__batchResponses[i].data&&A.__batchResponses[i].data.results){B.push(A.__batchResponses[i].data.results);}else if(A.__batchResponses[i].message){D=A.__batchResponses[i].message;F=A.__batchResponses[i].response.body;G=A.__batchResponses[i].response.statusCode;H=B.requestUri;C=m.createMessageObject({code:"5001",aParameters:[G,D,F,H]});break;}else{H=B.requestUri;C=m.createMessageObject({code:"5001",aParameters:["unknown","unknown error","unknown error",H]});break;}}w(B,C);}};var E=function(i){t(i,w);};b.odataRequest(z,S,E,OData.batchHandler);});});};this.readCollection=function(i,j,w,x,y){v(i,j,w,x,y);};function v(i,j,w,x,y){var z=sap.apf.core.constants.entitySets[i];var A=function(B,C){var D;var E;var F="";if(B&&B.__batchResponses){if(B.__batchResponses[0].data&&B.__batchResponses[0].data.results){D=B.__batchResponses[0].data.results;}else if(B.__batchResponses[0].message){var G=B.__batchResponses[0].message;var H=B.__batchResponses[0].response.body;var I=B.__batchResponses[0].response.statusCode;F=C.requestUri;E=m.createMessageObject({code:"5001",aParameters:[I,G,H,F]});}else{F=C.requestUri;E=m.createMessageObject({code:"5001",aParameters:["unknown","unknown error","unknown error",F]});}g(e,z).done(function(J){j(D,J,E);});}};b.getXsrfToken(e).done(function(B){r(z,w,x,y).done(function(C){var D={requestUri:e+'/'+'$batch',async:true,method:"POST",headers:{"x-csrf-token":B},data:{__batchRequests:[{requestUri:C,method:"GET",headers:{"x-csrf-token":B,"Accept-Language":sap.ui.getCore().getConfiguration().getLanguage()}}]}};b.odataRequest(D,A,function(E){k(E,j);},OData.batchHandler);});});}this.create=function(i,j,w){if(i==="configuration"){j=n(j);}var x=sap.apf.core.constants.entitySets[i];b.getXsrfToken(e).done(function(y){var z=e+'/'+x;var A={requestUri:z,async:true,method:"POST",headers:{"x-csrf-token":y},data:j};function B(D,R){var E;var F;if(D&&R.statusCode===201){E=D;}else{F=m.createMessageObject({code:'5201'});}g(e,x).done(function(G){w(E,G,F);});}function C(E){var D=h(E);w(undefined,undefined,D);}b.odataRequest(A,B,C);});};this.update=function(i,j,w,x){if(i==="configuration"){j=n(j);}var y=sap.apf.core.constants.entitySets[i];b.getXsrfToken(e).done(function(z){var A=e+'/'+y+f(x);var B={requestUri:A,method:"PUT",headers:{"x-csrf-token":z},data:j};function C(E,R){var F;if(R.statusCode!==204){F=m.createMessageObject({code:'5201'});}g(e,y).done(function(G){w(G,F);});}function D(E){var F=h(E);w(undefined,F);}b.odataRequest(B,C,D);});};this.remove=function(i,j,w,x){var y=sap.apf.core.constants.entitySets[i];b.getXsrfToken(e).done(function(z){var A=e+'/'+y+f(j);g(e,y).done(function(D){if(x){A=A+'$filter='+x.toUrlParam({formatValue:function(P,F){return o(P,F,D);}});}var E={requestUri:A,method:"DELETE",headers:{"x-csrf-token":z}};b.odataRequest(E,B,C);});function B(D,R){if(R.statusCode===204){g(e,y).done(function(F){w(F,undefined);});}else{var E=m.createMessageObject({code:'5201'});w(undefined,E);}}function C(E){var D=h(E);w(undefined,D);}});};};});
