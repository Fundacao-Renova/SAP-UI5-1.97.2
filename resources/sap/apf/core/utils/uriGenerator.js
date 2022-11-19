/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
sap.ui.define(["sap/apf/core/messageObject","sap/base/security/encodeURL"],function(M,E){'use strict';var u={};u.getAbsolutePath=function(p){if(p.slice(-1)==='/'){return p;}return p+"/";};u.getODataPath=function(p){var s=p.split('/');var i;var S=[];for(i=0;i<s.length;i++){if(s[i]!==""){S.push(s[i]);}}var r='';var l=S.length-1;for(i=0;i<l;i++){r=r+'/'+S[i];}return r+'/';};u.addRelativeToAbsoluteURL=function(a,r){var b=a.split('/');var c=r.split('/');c.forEach(function(p){if(p==='..'){b.pop();}else if(p!='.'){b.push(p);}});return b.join('/');};u.getBaseURLOfComponent=function(c){var b=c.split('.');b.pop();var a=b.join('.');return jQuery.sap.getModulePath(a);};u.getApfLocation=function(){return jQuery.sap.getModulePath("sap.apf")+'/';};u.generateOdataPath=function(m,a,e,f,n){var p=d(a,f);var r=e;var b=false;var c;for(c in p){if(!b){r+='(';b=true;}else{r+=',';}r+=c.toString()+'='+p[c];}if(b){r+=')/';}r+=n||'';return r;function d(){var r={};var g;var h;var t;var i;var j;g=a.getParameterEntitySetKeyProperties(e);if(g!==undefined){h=g.length;}else{h=0;}if(h>0){for(i=0;i<h;i++){if(f&&f instanceof sap.apf.core.utils.Filter){t=f.getFilterTermsForProperty(g[i].name);j=t[t.length-1];}if(j instanceof sap.apf.core.utils.FilterTerm){k(i,j.getValue());}else if(g[i].defaultValue){k(i,g[i].defaultValue);}else if(g[i].parameter!=='optional'){m.putMessage(m.createMessageObject({code:'5016',aParameters:[g[i].name]}));}}}return r;function k(l,v){var o;if(g[l].dataType.type==='Edm.String'){o=sap.apf.utils.formatValue(v,g[l]);r[g[l].name]=(E(o));}else if(g[l].dataType.type){o=sap.apf.utils.formatValue(v,g[l]);if(typeof o==='string'){r[g[l].name]=E(o);}else{r[g[l].name]=o;}}else if(typeof v==='string'){r[g[l].name]=E(sap.apf.utils.escapeOdata(v));}else{r[g[l].name]=v;}}}};u.getSelectString=function(s){var r="";s.forEach(function(a,i){r+=E(sap.apf.utils.escapeOdata(a));if(i<s.length-1){r+=",";}});return r;};u.buildUri=function(m,e,s,f,F,a,p,b,c,n,o){var r="";r+=u.generateOdataPath(m,o,e,F,n);r=r+"?";r+=d(s);r+=g(f,c);r+=h(a,s);r+=j(p);r+=k(b);return r;function d(s){if(!s[0]){return'';}var R="$select=";R+=u.getSelectString(s);return R;}function g(F,c){if(!(F&&F instanceof sap.apf.core.utils.Filter)||F.isEmpty()){return'';}var i=F.toUrlParam({formatValue:c});if(i===""||i==='()'){return'';}return'&$filter='+i;}function h(a,s){var O='';var S='';var i;if(!a){return'';}switch(true){case jQuery.isArray(a):for(i=0;i<a.length;i++){S=l(a[i],s);if(O.length>0&&S.length>0){O+=',';}O+=S;}break;case jQuery.isPlainObject(a):O+=l(a,s);break;case typeof a==='string':O+=l({property:a},s);break;}if(O.length>0){return"&$orderby="+O;}return'';function l(q,s){var v='';if(jQuery.inArray(q.property,s)>-1){v+=q.property;if(q.ascending===false){v+=' desc';}else{v+=' asc';}}else{m.putMessage(m.createMessageObject({code:'5019',aParameters:[e,q.property]}));}return E(v);}}function j(p){function l(p){var P,i;P=Object.getOwnPropertyNames(p);for(i=0;i<P.length;i++){if(P[i]!=='top'&&P[i]!=='skip'&&P[i]!=='inlineCount'){m.putMessage(m.createMessageObject({code:'5032',aParameters:[e,P[i]]}));}}}var r='';if(!p){return r;}l(p);if(p.top){r+='&$top='+p.top;}if(p.skip){r+='&$skip='+p.skip;}if(p.inlineCount===true){r+='&$inlinecount=allpages';}return r;}function k(b){if(!b){b='json';}return'&$format='+b;}};return u;},true);