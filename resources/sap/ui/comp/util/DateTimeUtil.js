/*
 * ! SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */
sap.ui.define([],function(){"use strict";var j=/^\/Date\((-?\d+)(\+|-)?(\d+)?\)\/$/;var D={localToUtc:function(d){var p,P="0",s=d.getFullYear().toString().padStart(4,P)+"-"+(d.getMonth()+1).toString().padStart(2,P)+"-"+d.getDate().toString().padStart(2,P)+"T00:00:00.000Z";p=new Date(s);p.setUTCHours(d.getHours());p.setUTCMinutes(d.getMinutes());p.setUTCSeconds(d.getSeconds());p.setUTCMilliseconds(d.getMilliseconds());return p;},utcToLocal:function(d){var p,P="0",s=d.getUTCFullYear().toString().padStart(4,P)+"-"+(d.getUTCMonth()+1).toString().padStart(2,P)+"-"+d.getUTCDate().toString().padStart(2,P)+"T00:00:00.000";p=new Date(s);p.setHours(d.getUTCHours());p.setMinutes(d.getUTCMinutes());p.setSeconds(d.getUTCSeconds());p.setMilliseconds(d.getUTCMilliseconds());return p;},dateToEdmTime:function(d){return{__edmType:"Edm.Time",ms:d.valueOf()};},edmTimeToDate:function(t){return new Date(t.ms);},adaptPrecision:function(d,p){var m=d.getMilliseconds(),r;if(isNaN(p)||p>=3||m===0){return d;}if(p===0){m=0;}else if(p===1){m=Math.floor(m/100)*100;}else if(p===2){m=Math.floor(m/10)*10;}r=new Date(d);r.setMilliseconds(m);return r;},isDate:function(d,u){if(u){return d.getUTCHours()===0&&d.getUTCMinutes()===0&&d.getUTCSeconds()===0&&d.getUTCMilliseconds()===0;}else{return d.getHours()===0&&d.getMinutes()===0&&d.getSeconds()===0&&d.getMilliseconds()===0;}},normalizeDate:function(d,u){var r;if(this.isDate(d,u)){return d;}r=new Date(d);if(u){r.setUTCHours(0,0,0,0);}else{r.setHours(0,0,0,0);}return r;},_parseJsonDateString:function(v){var a=v&&j.exec(v);if(a){var r=new Date(parseInt(a[1]));if(a[2]){var m=parseInt(a[3]);if(a[2]==="-"){m=-m;}var c=r.getUTCMinutes();r.setUTCMinutes(c-m);r.__edmType="Edm.DateTimeOffset";}if(!isNaN(r.valueOf())){return r;}}},_hasJsonDateString:function(v){return j.test(v);}};return D;});