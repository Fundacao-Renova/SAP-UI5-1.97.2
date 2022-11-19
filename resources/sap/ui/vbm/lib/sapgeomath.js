/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(["./sapvbi"],function(){"use strict";VBI.MathLib=(function(){var m={};m.min_longitude=-Math.PI;m.max_longitude=Math.PI;m.min_latitude=(-85.05112878*2*Math.PI)/360.0;m.max_latitude=(85.05112878*2*Math.PI)/360.0;m.mercator_for_max_latitude=3.1415942;m.div_mercator_for_max_latitude=(0.5/m.mercator_for_max_latitude);m.div_max_longitude=(1.0/m.max_longitude);m.earthradius=6378137;m.piDiv180=Math.PI/180.0;m.One180DivPi=1/m.piDiv180;m.stdWorldBorder=-180;m.CreateGUID=function(){var s=[];for(var n=0;n<8;++n){s[n]=(((Math.random()+1)*0x10000)|0).toString(16).substring(1);}return(s[0]+s[1]+"-"+s[2]+"-"+s[3]+"-"+s[4]+"-"+s[5]+s[6]+s[7]);};m.DegToRad=function(l){return[l[0]*m.piDiv180,l[1]*m.piDiv180];};m.RadToDeg=function(l){return[l[0]*m.One180DivPi,l[1]*m.One180DivPi];};m.LonLatToUCS=function(l,u){var n=u[0];var a=u[1];var L=l[0];var f=l[1];if(f<m.min_latitude){f=m.min_latitude;}else if(f>m.max_latitude){f=m.max_latitude;}u[0]=L*m.div_max_longitude;u[0]=(u[0]+1.0)*n*0.5;var s=Math.sin(f);u[1]=(Math.log((1.0+s)/(1.0-s))*m.div_mercator_for_max_latitude);u[1]=0.5*a*(1.0-u[1]);return u;};m.UCSToLonLat=function(u,l){l[0]=u[0]*Math.PI;l[1]=Math.atan(m.sinh(-u[1]*m.mercator_for_max_latitude));return l;};m.sinh=function(v){var a=Math.pow(Math.E,v);var b=Math.pow(Math.E,-v);return(a-b)/2.0;};m.Distance=function(l,b){var R=m.earthradius;var e=l[1];var f=l[0];var g=b[1];var h=b[0];var L=g-e;var i=h-f;var a=Math.sin(L/2)*Math.sin(L/2)+Math.cos(e)*Math.cos(g)*Math.sin(i/2)*Math.sin(i/2);var c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));var d=R*c;return d;};m.EquidistantLonLat=function(l,d,s){var r=[];s=s||64;var b,y,x;var a=d/m.earthradius;var c=l[0];var e=l[1];var f=Math.sin(a);var g=Math.cos(a);var h=Math.sin(e);var i=Math.cos(e);var j=c,k=c;var n=e,o=e;for(var p=0;p<s;++p){b=p*2*Math.PI/s;y=Math.asin(h*g+i*f*Math.cos(b));x=c+Math.atan2(Math.sin(b)*f*i,g-h*Math.sin(y));if(j>x){j=x;}if(k<x){k=x;}if(n>y){n=y;}if(o<y){o=y;}r.push([x,y]);}r.m_MinX=j;r.m_MaxX=k;r.m_MinY=n;r.m_MaxY=o;return r;};m.GetSurroundingBox=function(c,d,e,C,f){var g=100;var w=m.stdWorldBorder;if(d==undefined){d=360;}var p=(c[0].length==2);var h=0,j=1,k=2,l=3;if(p){j=0;k=l=1;}var n=Number.MAX_VALUE,o=-Number.MAX_VALUE;var q,r,s,t,i;for(i=0;i<c.length;++i){s=c[i];if(((q=s[h])<-180)||(q>180)){t=Math.floor((q+180)/360);q=(s[h]-=360*t);s[j]-=360*t;}if((r=s[j])<q){t=Math.ceil((q-r)/360);r=(s[j]+=360*t);}if(s[k]<n){n=s[k];}if(s[l]>o){o=s[l];}}c.sort(function(a,b){return a[0]-b[0];});var u=-1,v=-1;var x=-1,y=-1;var z,A;var B=c[0];var D,E=B[j],F=B[h];var G,H;for(i=1;i<c.length;++i){B=c[i];F=B[h];D=B[j];if(F<E){if(D>E){E=D;}}else{if((F-E)>u){z=E;u=F-E;x=i;}if((F-E)>v){G=Math.abs(((F-w+540)%360)-180);H=Math.abs(((E-w+540)%360)-180);if((G<g)||(H<g)){A=E;v=F-E;y=i;}}E=D;}}B=c[0];F=B[h];var I=F-E+360;if(I>v){G=Math.abs(((F-w+540)%360)-180);H=Math.abs(((E-w+540)%360)-180);if((G<g)||(H<g)){A=E;v=I;y=0;}}if(I>u){u=I;z=E;}else{if(x<0){return[w,w+360,n,o,false];}B=c[x];}z-=360*Math.floor((z+180)/360);var J=Math.floor(e)+1;var K=(e==undefined)?0:360/Math.pow(2,J-e);var L=1000;if(d==0){d=K;if(C!=undefined){L=Math.floor(C(n,o));}}var M=z-B[h]+360*(z<B[h]);var S=false;if(e!=undefined){var N=Math.floor(J+Math.log(K/(360-u))/Math.LN2);if((M>d)||Math.min(N,L)<=e+f){return[w,w+360,n,o,false];}if(K&&(v>=0)){var O=Math.floor(J+Math.log(K/(360-v))/Math.LN2);S=((N==O)||(N<=O));}if(S){B=c[y];z=A-360*Math.floor((A+180)/360);}}return[B[h],z,n,o];};return m;})();});
