/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_Helper","./_Parser","sap/ui/core/CalendarType","sap/ui/core/format/DateFormat","sap/ui/model/odata/ODataUtils"],function(_,a,C,D,O){"use strict";var r=/^\/Date\((-?\d+)\)\/$/,d,b=/^\/Date\((-?\d+)(?:([-+])(\d\d)(\d\d))?\)\/$/,o,p={},c=/\+/g,e=/^([^(]+)(\(.+\))$/,f=/\//g,g=/^PT(?:(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)(\.\d+)?S)?)$/i,t;function h(){}h.prototype.mFinalHeaders={"Content-Type":"application/json;charset=UTF-8"};h.prototype.mPredefinedPartHeaders={"Accept":"application/json"};h.prototype.mPredefinedRequestHeaders={"Accept":"application/json","MaxDataServiceVersion":"2.0","DataServiceVersion":"2.0","X-CSRF-Token":"Fetch"};h.prototype.mReservedHeaders={accept:true,"content-id":true,"content-transfer-encoding":true,"content-type":true,dataserviceversion:true,"if-match":true,"if-none-match":true,maxdataserviceversion:true,"sap-contextid":true,"x-http-method":true};h.prototype.convertBinary=function(v){return v.replace(c,"-").replace(f,"_");};h.prototype.convertDate=function(v){var j,m=r.exec(v);if(!m){throw new Error("Not a valid Edm.DateTime value '"+v+"'");}j=new Date(parseInt(m[1]));if(Number(m[1]%(24*60*60*1000))!==0){throw new Error("Cannot convert Edm.DateTime value '"+v+"' to Edm.Date because it contains a time of day");}return d.format(j);};h.prototype.convertDateTimeOffset=function(v,P){var m=b.exec(v),s,j,k,l,n="yyyy-MM-dd'T'HH:mm:ss",q=P.$Precision,T;if(!m){throw new Error("Not a valid Edm.DateTimeOffset value '"+v+"'");}T=parseInt(m[1]);j=parseInt(m[3]);k=parseInt(m[4]);if(!m[2]||j===0&&k===0){s="Z";}else{l=m[2]==="-"?-1:1;T+=l*(j*60*60*1000+k*60*1000);s=m[2]+m[3]+":"+m[4];}if(q>0){n+="."+"".padEnd(q,"S");}if(!p[n]){p[n]=D.getDateTimeInstance({calendarType:C.Gregorian,pattern:n,UTC:true});}return p[n].format(new Date(T))+s;};h.prototype.convertDoubleSingle=function(v){switch(v){case"NaN":case"INF":case"-INF":return v;default:return parseFloat(v);}};h.prototype.convertFilter=function(F,m){var j=a.parseFilter(F),k=this;function l(L,s){var M,T=q(s);if(T.$Type!=="Edm.String"){M=_.parseLiteral(L.value,T.$Type,T.path);L.value=k.formatPropertyAsLiteral(M,T);}}function n(N,M){throw new Error("Cannot convert filter to V2, "+M+" at "+N.at+": "+F);}function q(N){var P;if(N.type){return{$Type:N.type};}if(N.id==="PATH"){P=k.oModelInterface.fetchMetadata(m+"/"+N.value).getResult();if(!P){throw new Error("Invalid filter path: "+N.value);}return{path:N.value,$Type:P.$Type,$v2Type:P.$v2Type};}return q(N.parameters[0]);}function v(N){if(N){if(N.id==="VALUE"&&N.ambiguous){n(N,"ambiguous type for the literal");}v(N.left);v(N.right);if(N.parameters){if(N.value==="contains"){N.value="substringof";N.parameters.push(N.parameters.shift());}N.parameters.forEach(v);}if(N.left&&N.right){if(N.left.id==="VALUE"){if(N.right.id==="VALUE"){n(N,"saw literals on both sides of '"+N.id+"'");}l(N.left,N.right);}else if(N.right.id==="VALUE"){l(N.right,N.left);}}}}v(j);return a.buildFilterString(j);};h.prototype.convertKeyPredicate=function(v,P){var E=this.fetchTypeForPath(_.getMetaPath(P)).getResult(),k=a.parseKeyPredicate(decodeURIComponent(v)),j=this;function l(s,V){var m=E[s];if(m.$Type!=="Edm.String"){V=j.formatPropertyAsLiteral(_.parseLiteral(V,m.$Type,P),m);}return encodeURIComponent(V);}if(""in k){return"("+l(E.$Key[0],k[""])+")";}return"("+E.$Key.map(function(s){return encodeURIComponent(s)+"="+l(s,k[s]);}).join(",")+")";};h.prototype.convertResourcePath=function(R){var I=R.indexOf("?"),q="",s,S=-1,j=this;if(I>0){q=R.slice(I);R=R.slice(0,I);}s=R.split("/");return s.map(function(k){var m=e.exec(k);S+=k.length+1;if(m){k=m[1]+j.convertKeyPredicate(m[2],"/"+R.slice(0,S));}return k;}).join("/")+q;};h.prototype.convertTimeOfDay=function(v){var j,m=g.exec(v),T;if(!m){throw new Error("Not a valid Edm.Time value '"+v+"'");}T=Date.UTC(1970,0,1,m[1]||0,m[2]||0,m[3]||0);j=new Date(T);return t.format(j)+(m[4]||"");};h.prototype.convertNonPrimitive=function(j){var P,T,s,v,k=this;if(Array.isArray(j.results)){j.results.forEach(function(I){k.convertNonPrimitive(I);});return j.results;}if(!j.__metadata||!j.__metadata.type){throw new Error("Cannot convert structured value without type information in "+"__metadata.type: "+JSON.stringify(j));}s=j.__metadata.type;T=k.getTypeForName(s);delete j.__metadata;for(P in j){v=j[P];if(v===null){continue;}if(typeof v==="object"){if(v.__deferred){delete j[P];}else{j[P]=this.convertNonPrimitive(v);}continue;}j[P]=this.convertPrimitive(v,T[P],s,P);}return j;};h.prototype.convertPrimitive=function(v,P,T,s){switch(P&&P.$Type){case"Edm.Binary":return this.convertBinary(v);case"Edm.Date":return this.convertDate(v);case"Edm.DateTimeOffset":return this.convertDateTimeOffset(v,P);case"Edm.Boolean":case"Edm.Byte":case"Edm.Decimal":case"Edm.Guid":case"Edm.Int16":case"Edm.Int32":case"Edm.Int64":case"Edm.SByte":case"Edm.String":return v;case"Edm.Double":case"Edm.Single":return this.convertDoubleSingle(v);case"Edm.TimeOfDay":return this.convertTimeOfDay(v);default:throw new Error("Type '"+(P&&P.$Type)+"' of property '"+s+"' in type '"+T+"' is unknown; cannot convert value: "+v);}};h.prototype.doCheckVersionHeader=function(G,R,j){var s=G("DataServiceVersion"),v=!s&&G("OData-Version");if(v){throw new Error("Expected 'DataServiceVersion' header with value '1.0' or '2.0' but "+"received 'OData-Version' header with value '"+v+"' in response for "+this.sServiceUrl+R);}if(!s){return;}s=s.split(";")[0];if(s==="1.0"||s==="2.0"){return;}throw new Error("Expected 'DataServiceVersion' header with value '1.0' or '2.0' but "+"received value '"+s+"' in response for "+this.sServiceUrl+R);};h.prototype.doConvertResponse=function(R,m){var j,I,k,P,l,n=this;R=R.d;I=Array.isArray(R.results);if(!I&&!R.__metadata){k=Object.keys(R);j=R[k[0]];if(k.length===1){if(j===null){return{value:null};}else if(typeof j!=="object"){return{value:this.convertPrimitive(j,this.oModelInterface.fetchMetadata(m).getResult(),m,k[0])};}else if(j.__metadata){R=j;}}}if(I&&!R.results.length){P=[];}else if(I&&!R.results[0].__metadata){l=this.oModelInterface.fetchMetadata(m).getResult();P=R.results.map(function(v){return n.convertPrimitive(v,l,m,"");});}else{P=this.convertNonPrimitive(R);}if(I){P={value:P};if(R.__count){P["@odata.count"]=R.__count;}if(R.__next){P["@odata.nextLink"]=R.__next;}}return P;};h.prototype.doConvertSystemQueryOptions=function(m,q,R,j,s){var S,k={},l=this;function n(v,E){if(!Array.isArray(v)){v=v.split(",");}v.forEach(function(w){var I=w.indexOf("/");if(I>=0&&!w.includes(".")){w=w.slice(0,I);}k[_.buildPath(E,w)]=true;});}function u(E,v,P){if(!v||typeof v!=="object"){throw new Error("$expand must be a valid object");}Object.keys(v).forEach(function(w){var A=_.buildPath(P,w),x=v[w];E.push(A);if(typeof x==="object"){Object.keys(x).forEach(function(Q){switch(Q){case"$expand":u(E,x.$expand,A);break;case"$select":n(x.$select,A);break;default:throw new Error("Unsupported query option in $expand: "+Q);}});}if(!x.$select){k[A+"/*"]=true;}});return E;}Object.keys(q).forEach(function(N){var I=N[0]==='$',v=q[N];if(j&&I){return;}switch(N){case"$count":N="$inlinecount";v=v?"allpages":"none";break;case"$expand":v=u([],v,"");v=(s?v.sort():v).join(",");break;case"$orderby":case"$search":break;case"$select":n(v);return;case"$filter":v=l.convertFilter(v,m);break;default:if(I){throw new Error("Unsupported system query option: "+N);}}R(N,v);});S=Object.keys(k);if(S.length>0){if(!q.$select){S.push("*");}R("$select",(s?S.sort():S).join(","));}};h.prototype.formatPropertyAsLiteral=function(v,P){function j(k,V){var l=k.parse(V);if(!l){throw new Error("Not a valid "+P.$Type+" value: "+V);}return l;}if(v===null){return"null";}switch(P.$Type){case"Edm.Boolean":case"Edm.Byte":case"Edm.Decimal":case"Edm.Double":case"Edm.Guid":case"Edm.Int16":case"Edm.Int32":case"Edm.Int64":case"Edm.SByte":case"Edm.Single":case"Edm.String":break;case"Edm.Date":v=j(d,v);break;case"Edm.DateTimeOffset":v=j(o,v);break;case"Edm.TimeOfDay":v={__edmType:"Edm.Time",ms:j(t,v).getTime()};break;default:throw new Error("Type '"+P.$Type+"' in the key predicate is not supported");}return O.formatValue(v,P.$v2Type||P.$Type);};h.prototype.getPathAndAddQueryOptions=function(P,j,m,q,E){var n,T,k=this;P=P.slice(1,-5);if(j.$IsBound){P=P.slice(P.lastIndexOf(".")+1);if(typeof E==="function"){E=E();}T=this.getTypeForName(j.$Parameter[0].$Type);T.$Key.forEach(function(n){q[n]=k.formatPropertyAsLiteral(E[n],T[n]);});}if(j.$Parameter){j.$Parameter.forEach(function(l){n=l.$Name;if(n in m){if(l.$isCollection){throw new Error("Unsupported collection-valued parameter: "+n);}q[n]=k.formatPropertyAsLiteral(m[n],l);delete m[n];}});}for(n in m){delete m[n];}if(j.$v2HttpMethod){m["X-HTTP-Method"]=j.$v2HttpMethod;}return P;};h.prototype.getTypeForName=function(n){var T;this.mTypesByName=this.mTypesByName||{};T=this.mTypesByName[n];if(!T){T=this.mTypesByName[n]=this.oModelInterface.fetchMetadata("/"+n).getResult();}return T;};h.prototype.isActionBodyOptional=function(){return true;};h.prototype.isChangeSetOptional=function(){return false;};h.prototype.ready=function(){return this.oModelInterface.fetchEntityContainer().then(function(){});};function i(R){Object.assign(R,h.prototype);R.oModelInterface.reportStateMessages=function(){};R.oModelInterface.reportTransitionMessages=function(){};}i._setDateTimeFormatter=function(){d=D.getDateInstance({calendarType:C.Gregorian,pattern:"yyyy-MM-dd",UTC:true});o=D.getDateTimeInstance({calendarType:C.Gregorian,pattern:"yyyy-MM-dd'T'HH:mm:ss.SSSZ"});t=D.getTimeInstance({calendarType:C.Gregorian,pattern:"HH:mm:ss",UTC:true});};i._setDateTimeFormatter();return i;},false);