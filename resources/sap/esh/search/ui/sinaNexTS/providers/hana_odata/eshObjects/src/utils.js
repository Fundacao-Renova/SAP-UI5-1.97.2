/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["require","exports","./definitions"],function(r,e,d){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.parseFreeStyleText=e.getEshSearchQuery=e.createEshSearchQuery=void 0;var S;(function(S){S[S["Term"]=0]="Term";S[S["Phrase"]=1]="Phrase";})(S||(S={}));var c=function(o){if(o===void 0){o={};}if(o.metadataCall){var a=o.resourcePath?o.resourcePath:"/$metadata";if(o.metadataObjects){if(o.metadataObjects.entitySets){a+="/EntitySets("+o.metadataObjects.entitySets+")";}else{if(o.metadataObjects.format){a+="?$format="+o.metadataObjects.format;}if(o.metadataObjects.collectionReference){a+="#"+o.metadataObjects.collectionReference;}if(o.metadataObjects.contextEntitySet&&o.metadataObjects.primitiveTyp){a+="#"+o.metadataObjects.contextEntitySet+"("+o.metadataObjects.primitiveTyp+")";}else if(o.metadataObjects.contextEntitySet){a+="#"+o.metadataObjects.contextEntitySet;}else if(o.metadataObjects.primitiveTyp){a+="#"+o.metadataObjects.primitiveTyp;}}}return{path:a,parameters:{},};}var s="/$all";if(o.resourcePath){s=o.resourcePath;}if(o===null||o===void 0?void 0:o.suggestTerm){s+="/"+encodeURIComponent("GetSuggestion(term='"+o.suggestTerm.replace(/'/g,"''")+"')");}if(o.eshParameters){var b=[];for(var _=0,f=Object.keys(o.eshParameters);_<f.length;_++){var k=f[_];b.push(k+"='"+encodeURIComponent(o.eshParameters[k])+"'");}if(b.length>0){s+="("+b.join(",")+")";}}var n=new d.Expression({operator:d.LogicalOperator.and,items:[],});if(!o){o={query:d.SEARCH_DEFAULTS.query,scope:d.SEARCH_DEFAULTS.scope,$select:[],facets:[],};}else{if(!o.query){o.query=d.SEARCH_DEFAULTS.query;}if(!o.$select){o.$select=[];}if(!o.facets){o.facets=[];}}if(o.oDataFilter){n.items.push(o.oDataFilter);}if(n.items.length>0){o.oDataFilter=n;}var u=s;var q=o.scope?"SCOPE:"+o.scope:"";if(o.searchQueryFilter){var h=o.searchQueryFilter.toStatement().trim();if(h.length>0){if(q!==""){q+=" ";}q+=h;}}if(o.freeStyleText){if(q!==""){q+=" ";}var j=e.parseFreeStyleText(o.freeStyleText);q+=j.toStatement();}if(o.query&&o.query!==""){if(q!==""){q+=" ";}q+=d.escapeQuery(o.query);}var l={};for(var m=0,t=Object.keys(o);m<t.length;m++){var v=t[m];switch(v){case"query":if(o.$apply){break;}var w=q===""?"":"filter(Search.search(query='"+q+"')";if(o.oDataFilter&&o.oDataFilter.items.length>0){w+=" and "+o.oDataFilter.toStatement();}if(q!==""){w+=")";}if(o.groupby&&o.groupby.properties&&(o.groupby.properties.length>0)){w+="/groupby(("+o.groupby.properties.join(",")+")";if(o.groupby.aggregateCountAlias&&o.groupby.aggregateCountAlias!==""){w+=",aggregate($count as "+o.groupby.aggregateCountAlias+")";}w+=")";}if(w!==""){l.$apply=w;}break;case"$orderby":if(o.$orderby&&o.$orderby.length>0){l.$orderby=o.$orderby.map(function(i){return i.order?i.key+" "+i.order:i.key;}).join(",");}break;case"facets":if(o.facets&&o.facets.length>0){l[v]=o.facets.join(",");}break;case"$select":if(o.$select&&o.$select.length>0){l[v]=o.$select.join(",");}break;case"facetroot":if(o.facetroot&&o.facetroot.length>0){l.facetroot=o.facetroot.map(function(i){return i.toStatement();}).join(",");}break;case"$top":case"$skip":case"$count":case"whyfound":case"estimate":case"wherefound":case"facetlimit":case"filteredgroupby":l[v]=o[v];break;case"dynamicview":if(o.dynamicview){l[v]=o.dynamicview.map(function(i){return i.toStatement();}).join(" ");}break;case"$apply":if((o[v]instanceof d.CustomFunction)||(o[v]instanceof d.FilterFunction)){var x=o[v].toStatement();if(o.groupby&&o.groupby.properties&&(o.groupby.properties.length>0)){x+="/groupby(("+o.groupby.properties.join(",")+")";if(o.groupby.aggregateCountAlias&&o.groupby.aggregateCountAlias!==""){x+=",aggregate($count as "+o.groupby.aggregateCountAlias+")";}x+=")";};l[v]=x;}break;default:break;}}return{path:u,parameters:l,};};e.createEshSearchQuery=c;var g=function(o){var a=e.createEshSearchQuery(o);var s=Object.keys(a.parameters).map(function(k){return encodeURIComponent(k)+"="+encodeURIComponent(a.parameters[k]);}).join("&");if(s&&s!==""){return a.path+"?"+s;}return a.path;};e.getEshSearchQuery=g;var p=function(f){var a=[];var t="";var s=S.Term;for(var i=0;i<f.length;i++){var b=f[i];if(b==='"'){if(s==S.Term){if(f.substring(i+1).indexOf('"')>=0){a.push(new d.Term({term:t.trim()}));s=S.Phrase;t='';}else{a.push(new d.Term({term:(t+f.substring(i)).trim()}));t='';break;}}else{a.push(new d.Phrase({phrase:t}));s=S.Term;t='';}}else{t+=f[i];}}if(t.length>0){a.push(new d.Term({term:t.trim()}));}return new d.Expression({operator:d.SearchQueryLogicalOperator.TIGHT_AND,items:a});};e.parseFreeStyleText=p;});})();