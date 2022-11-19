/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(["./sapvbi"],function(){"use strict";VBI.Utilities=VBI.Utilities||{};HTMLCanvasElement.prototype.getPixelWidth=function(){if(this.m_pixelWidth){return this.m_pixelWidth;}if(this.style.pixelWidth!==undefined){return this.style.pixelWidth;}return parseInt(this.style.width,10);};HTMLCanvasElement.prototype.getPixelHeight=function(){if(this.m_pixelHeight){return this.m_pixelHeight;}if(this.style.pixelHeight!==undefined){return this.style.pixelHeight;}return parseInt(this.style.height,10);};HTMLCanvasElement.prototype.getPixelLeft=function(){if(this.m_pixelLeft){return this.m_pixelLeft;}if(this.style.pixelLeft!==undefined){return this.style.pixelLeft;}return parseInt(this.style.left,10);};HTMLCanvasElement.prototype.getPixelTop=function(){if(this.m_pixelTop){return this.m_pixelTop;}if(this.style.pixelTop!==undefined){return this.style.pixelTop;}return parseInt(this.style.top,10);};HTMLCanvasElement.prototype.setPixelWidth=function(v){this.m_pixelWidth=v;if(this.style.pixelWidth!==undefined){this.style.pixelWidth=v;}else{this.style.width=v+'px';}};HTMLCanvasElement.prototype.setPixelHeight=function(v){this.m_pixelHeight=v;if(this.style.pixelHeight!==undefined){this.style.pixelHeight=v;}else{this.style.height=v+'px';}};HTMLCanvasElement.prototype.setPixelLeft=function(v){this.m_pixelLeft=v;if(this.style.pixelLeft!==undefined){this.style.pixelLeft=v;}else{this.style.left=v+'px';}};HTMLCanvasElement.prototype.setPixelTop=function(v){this.m_pixelTop=v;if(this.style.pixelTop!==undefined){this.style.pixelTop=v;}else{this.style.top=v+'px';}};VBI.Utilities.CreateWifiObject=function(){var n=document.createElement('object');if(!n){return null;}n.classid="CLSID:00100000-2013-0070-2000-651572487E69";return n;};VBI.Utilities.CreateDOMElement=function(t,i,w,h){var n=document.createElement(t);n.style.height=w?w:"1px";n.style.width=h?h:"1px";n.id=i;return n;};VBI.Utilities.GetDOMElement=function(a){var e=[];for(var i=0,l=arguments.length;i<l;i++){var b=arguments[i];if(typeof b=='string'){b=document.getElementById(b);}if(arguments.length==1){return b;}e.push(b);}return e;};VBI.Utilities.CreateDOMVBIDivElement=function(i,w,h){var n=document.createElement('div');n.setAttribute("role",sap.ui.core.AccessibleRole.Secondary);n.id=i;n.style.height="300x";n.style.width="300px";n.style.overflow="hidden";n.style.position="absolute";n.style.left="0px";n.style.top="0px";return n;};VBI.Utilities.Create3DSceneDiv=function(i){var n=document.createElement('div');n.setAttribute("role",sap.ui.core.AccessibleRole.Img);n.id=i;n.style.left="0px";n.style.top="0px";n.style.width="100%";n.style.height="100%";n.style.position="relative";n.style.overflow="hidden";return n;};VBI.Utilities.Create3DSceneCanvas=function(i,w,h,z,t,a){var n=document.createElement('canvas');n.setAttribute("role",sap.ui.core.AccessibleRole.Img);n.id=i;n.m_pixelLeft=n.m_pixelTop=0;n.width=n.m_pixelWidth=w?w:512;n.height=n.m_pixelHeight=h?h:512;n.style.left=n.style.top="0px";n.style.width=n.m_pixelWidth+"px";n.style.height=n.m_pixelHeight+"px";n.style.position="absolute";n.style.zIndex=z;n.style.touchaction="none";n.className="vbi-3Dscenecanvas";n.m_bNotInDOM=(a!=undefined?a:false);n.m_CanvasValid=!n.m_bNotInDOM;if(n.m_bNotInDOM){n.m_nMoveCount=0;}if(t!=undefined){n.tabIndex=t;}return n;};VBI.Utilities.CreateGeoSceneCanvas=function(i,w,h,t,a,b,c){var n=document.createElement('canvas');n.setAttribute("role",sap.ui.core.AccessibleRole.Img);n.id=i;n.m_pixelLeft=n.m_pixelTop=0;n.width=n.m_pixelWidth=w?w:512;n.height=n.m_pixelHeight=h?h:512;n.style.left=n.style.top="0px";n.style.width=n.m_pixelWidth+"px";n.style.height=n.m_pixelHeight+"px";n.style.position="absolute";n.style.touchaction="none";n.className="vbi-geoscenecanvas";if(b){n.className+=" "+b;}if(c){n.setAttribute("aria-label",c);}n.m_bNotInDOM=(a!=undefined?a:false);n.m_CanvasValid=!n.m_bNotInDOM;n.m_VBIType="L";if(n.m_bNotInDOM){n.m_nMoveCount=0;}if(t!=undefined){n.tabIndex=t;}return n;};VBI.Utilities.Align=['','left','center','','right'];VBI.Utilities.CreateCaption=function(i,t,l,a,r,b,c,d,e,f){var n=document.createElement('div');n.setAttribute("role",sap.ui.core.AccessibleRole.Note);n.id=i;n.style.left=l+"px";n.style.top=a+"px";n.style.width=(r-l).toString()+"px";n.style.height=(b-a).toString()+"px";n.style.textAlign=VBI.Utilities.Align[f];n.style.title=c;switch(e){case 3:n.style.fontSize="14px";n.style.fontWeight="bold";break;}n.className="vbi-2d-caption vbi-2d-common";n.innerHTML=t;return n;};VBI.Utilities.CreateLabel=function(i,t,l,a,r,b,c,d){var n=document.createElement('div');n.setAttribute("role",sap.ui.core.AccessibleRole.Description);n.id=i;n.style.left=l+"px";n.style.top=a+"px";n.style.width=(r-l).toString()+"px";n.style.height=(b-a).toString()+"px";n.style.textAlign=VBI.Utilities.Align[d];n.style.title=c;n.className="vbi-2d-label vbi-2d-common";n.innerHTML=t;return n;};VBI.Utilities.CreateLink=function(i,t,l,a,r,b,h,c,d){var n=document.createElement('a');n.setAttribute("role",sap.ui.core.AccessibleRole.Link);n.id=i;n.style.left=l+"px";n.style.top=a+"px";n.style.width=(r-l).toString()+"px";n.style.height=(b-a).toString()+"px";n.style.textAlign=VBI.Utilities.Align[d];n.className="vbi-2d-link vbi-2d-common";n.href=h?h:"javascrip"+"t:void(0)";n.title=c;n.innerHTML=t;return n;};VBI.Utilities.CreateImage=function(i,a,l,t,r,b,c,d){var n=a.cloneNode(true);n.setAttribute("role",sap.ui.core.AccessibleRole.Img);n.id=i;n.style.left=l+"px";n.style.top=t+"px";n.style.width=(r-l).toString()+"px";n.style.height=(b-t).toString()+"px";n.style.textAlign=VBI.Utilities.Align[d];n.className="vbi-2d-image vbi-2d-common";n.title=c;return n;};VBI.Utilities.CreateButton=function(i,t,l,a,r,b,c,d){var n=document.createElement('button');n.id=i;n.style.left=l+"px";n.style.top=a+"px";n.style.width=(r-l).toString()+"px";n.style.height=(b-a).toString()+"px";n.style.textAlign=VBI.Utilities.Align[d];n.className="vbi-2d-button vbi-2d-common";n.innerHTML=t;n.title=c;return n;};VBI.Utilities.CreateContainer=function(i,k,l,t,w,h,a,o){var n=document.createElement('div');n.setAttribute("role",sap.ui.core.AccessibleRole.Group);n.id=i;n.style.left=l+"px";n.style.top=t+"px";n.title=a;n.style.position="absolute";if(!o){n.className="vbi-container-vo";}n.m_Key=k;return n;};VBI.Utilities.CreateDetailPhone=function(i,l,t,w,h,a,p){var d=document.createElement('div');d.setAttribute("role",sap.ui.core.AccessibleRole.Directory);d.id=i;d.style.left=l+"px";d.style.top=t+"px";var b=12;var s=6;var c=14;b=VBI.Utilities.RemToPixel(0.750);s=VBI.Utilities.RemToPixel(0.375);c=VBI.Utilities.RemToPixel(0.875);if(h){d.style.minHeight=h+c+4+s+2*b+"px";}d.className=".vbi-detail vbi-detail-phone";var e=document.createElement('div');e.setAttribute("role",sap.ui.core.AccessibleRole.Heading);e.id=i+"-window-header";e.className="vbi-detail-header-phone";d.appendChild(e);var f=document.createElement('div');f.setAttribute("role",sap.ui.core.AccessibleRole.Heading);f.id=i+"-window-title";f.className="vbi-detail-title-phone";f.innerHTML=a;e.appendChild(f);var g=document.createElement('div');g.setAttribute("role",sap.ui.core.AccessibleRole.Button);g.id=i+"-window-close";g.className="vbi-detail-closebutton vbi-detail-closebutton-tablet";e.appendChild(g);var j=document.createElement('div');j.setAttribute("role",sap.ui.core.AccessibleRole.Secondary);j.id=i+"-window-content";j.className="vbi-detail-content";j.style.fontSize=VBI.Utilities.RemToPixel(0.875)+"px";d.appendChild(j);return{m_Div:d,m_Content:j,m_CloseButton:g,m_Arrow:null,GetAnchorPoint:null};};VBI.Utilities.CreateDetail=function(i,l,t,w,h,a,p){if(VBI.m_bIsPhone){return(VBI.Utilities.CreateDetailPhone(i,l,t,w,h,a,p));}var d=document.createElement('div');d.setAttribute("role",sap.ui.core.AccessibleRole.Secondary);d.id=i;d.style.left=l+"px";d.style.top=t+"px";var P=VBI.m_bIsPhone;if(!P){var b=16;var s=16;var c=16;b=VBI.Utilities.RemToPixel(1);s=VBI.Utilities.RemToPixel(1);c=VBI.Utilities.RemToPixel(1);if(w){d.style.width=w+2*b+"px";}if(h){d.style.minHeight=h+c+4+s+2*b+"px";}}else{var e=12;var f=6;var g=14;e=VBI.Utilities.RemToPixel(0.750);f=VBI.Utilities.RemToPixel(0.375);g=VBI.Utilities.RemToPixel(0.875);if(h){d.style.minHeight=h+g+4+f+2*e+"px";}}d.className="vbi-detail vbi-detail-border";var j=document.createElement('div');j.setAttribute("role",sap.ui.core.AccessibleRole.Heading);j.id=i+"-window-header";j.className="vbi-detail-header";d.appendChild(j);var k=document.createElement('div');k.setAttribute("role",sap.ui.core.AccessibleRole.Heading);k.id=i+"-window-title";k.className="vbi-detail-title";k.innerHTML=a;j.appendChild(k);var m=document.createElement('div');m.setAttribute("role",sap.ui.core.AccessibleRole.Button);m.id=i+"-window-close";var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.vbm.i18n");m.title=r.getText("WINDOW_CLOSE");m.setAttribute("aria-label",r.getText("WINDOW_CLOSE"));m.className="vbi-detail-closebutton vbi-detail-closebutton-"+(VBI.m_bIsMobile?"tablet":"desktop");j.appendChild(m);var n=document.createElement('div');n.setAttribute("role",sap.ui.core.AccessibleRole.Secondary);n.id=i+"-window-content";n.className="vbi-detail-content";d.appendChild(n);var o=document.createElement('b');o.setAttribute("role",sap.ui.core.AccessibleRole.Presentation);o.className="vbi-detail-arrow vbi-detail-left vbi-detail-border-arrow";if(!P){d.appendChild(o);}var q;q=document.createElement('b');q.setAttribute("role",sap.ui.core.AccessibleRole.Presentation);q.className="vbi-detail-arrow vbi-detail-left";if(!P){d.appendChild(q);}return{m_Div:d,m_Content:n,m_CloseButton:m,m_Arrow:q,GetAnchorPoint:function(){if(VBI.m_bIsRtl){return[this.m_Arrow.offsetLeft+this.m_Arrow.offsetWidth+2,this.m_Arrow.offsetTop+this.m_Arrow.offsetHeight/2];}else{return[this.m_Arrow.offsetLeft,this.m_Arrow.offsetTop+this.m_Arrow.offsetHeight/2];}}};};VBI.Utilities.CreateLegendPhone=function(i,l,t,w,h,a,p){};VBI.Utilities.CreateLegend=function(i,t,a,p,c){var l=document.createElement('div');l.setAttribute("role",sap.ui.core.AccessibleRole.Group);l.setAttribute("tabindex","0");l.id=i;if(VBI.m_bIsRtl){l.style.left="0px";l.style.right="";}else{l.style.right="0px";l.style.left="";}l.style.top=t+"px";l.className="vbi-legend";var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.vbm.i18n");var b=document.createElement('div');b.id=i+"-button-collapse";b.title=r.getText("LEGEND_COLLAPSE");b.setAttribute("role",sap.ui.core.AccessibleRole.Button);b.setAttribute("aria-label",b.title);b.className="vbi-legend-button vbi-legend-button-col";l.appendChild(b);var d=document.createElement('div');d.id=i+"-button-expand";d.title=r.getText("LEGEND_EXPAND");d.setAttribute("role",sap.ui.core.AccessibleRole.Button);d.setAttribute("aria-label",d.title);d.className="vbi-legend-button vbi-legend-button-exp";l.appendChild(d);d.style.visibility='hidden';var h=document.createElement('div');h.id=i+"-header";h.className="vbi-legend-header";h.setAttribute("role",sap.ui.core.AccessibleRole.Presentation);l.appendChild(h);var e=document.createElement('div');e.setAttribute("role",sap.ui.core.AccessibleRole.Heading);e.id=i+"-title";e.className="vbi-legend-title";e.innerHTML=a;h.appendChild(e);var f=document.createElement('div');f.setAttribute("role",sap.ui.core.AccessibleRole.Presentation);f.id=i+"-content";f.className="vbi-legend-content";l.appendChild(f);var g=document.createElement('table');g.setAttribute("role",sap.ui.core.AccessibleRole.Grid);g.setAttribute("tabindex","0");g.id=i+"-table";g.className=c?"vbi-legend-table vbi-legend-table-click":"vbi-legend-table";f.appendChild(g);return{m_Div:l,m_Header:h,m_Content:f,m_Table:g,m_ButtonCol:b,m_ButtonExp:d};};VBI.Utilities.CreateGeoSceneDivCSS=function(i,c,t){var n=document.createElement('div');n.id=i;if(c){n.className=c;}if(t){n.title=t;}return n;};VBI.Utilities.CreateDOMColorShiftedImageFromData=function(d,i,c,e,l){var f=null,h=c?VBI.Types.string2rhls(c):null;if(!h){f=c?VBI.Types.string2rgba(c):null;}var j=null,k=e?VBI.Types.string2rhls(e):null;if(!k){j=e?VBI.Types.string2rgba(e):null;}var t=document.createElement('img');var m=document.createElement('img');if(l){t.onload=function(){if(typeof l==='function'){l(t);}this.onload=null;};m.onload=function(){var n=document.createElement("canvas");var o=n.getContext("2d");n.width=m.width;n.height=m.height;o.drawImage(m,0,0,m.naturalWidth,m.naturalHeight,0,0,m.width,m.height);var p=o.getImageData(0,0,m.width,m.height);var d=p.data;function q(d,v,w,x){var r=d[v];var g=d[v+1];var b=d[v+2];var a=d[v+3];if(w){var y=VBI.Utilities.RGB2HLS(r,g,b);var z=VBI.Utilities.HLS2RGB(y[0]+w[0],y[1]*w[1],y[2]*w[2]);d[v]=Math.min(Math.round(z[0]),255);d[v+1]=Math.min(Math.round(z[1]),255);d[v+2]=Math.min(Math.round(z[2]),255);d[v+3]=Math.min(Math.round(w[3]*a),255);}else if(x){d[v]=x[0];d[v+1]=x[1];d[v+2]=x[2];if(d[v+3]){d[v+3]=x[4]?Math.floor(Math.min(x[3]*255,255)):255;}}}for(var s=0,u=(m.width*m.height);s<u;++s){var v=s*4;if(h||f){q(d,v,h,f);}if(k||j){q(d,v,k,j);}}o.putImageData(p,0,0);t.src=n.toDataURL("image/png");this.onload=null;};}m.src=((d.indexOf("data:image")==0)?d:("data:image"+i+";base64,"+d));return t;};VBI.Utilities.CreateDOMImageFromData=function(d,i,l){var a=document.createElement('img');if(l){a.onload=function(){if(typeof l==='function'){l(a);}this.onload=null;};}a.src=((d.indexOf("data:image")==0)?d:("data:image"+i+";base64,"+d));return a;};VBI.Utilities.GetTransparentImage=function(){var t="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";if(!this.m_TransparentImage){this.m_TransparentImage=VBI.Utilities.CreateDOMImageFromData(t,'/png',null);this.m_TransparentImage.id="TransparentImage";}return this.m_TransparentImage;};VBI.Utilities.PtOnRect=function(p,r){return((p[0]>=r[0])&&(p[0]<=r[2])&&(p[1]>=r[1])&&(p[1]<=r[3]))?true:false;};VBI.Utilities.PtInRect=function(p,r){return((p[0]>r[0])&&(p[0]<r[2])&&(p[1]>r[1])&&(p[1]<r[3]))?true:false;};VBI.Utilities.RectIntersect=function(r,a){return!(a[0]>r[2]||a[2]<r[0]||a[3]<r[1]||a[1]>r[3]);};VBI.Utilities.RectOffset=function(r,n,a){r[0]+=n;r[1]+=a;r[2]+=n;r[3]+=a;};VBI.Utilities.cImg;VBI.Utilities.GetImagePixelData=function(i){if(!VBI.Utilities.cImg){VBI.Utilities.cImg=document.createElement('canvas');}VBI.Utilities.cImg.width=i.naturalWidth;VBI.Utilities.cImg.height=i.naturalHeight;VBI.Utilities.cImg.style.width=(i.naturalWidth+"px");VBI.Utilities.cImg.style.height=(i.naturalHeight+"px");VBI.Utilities.cImg.style.top="0px";VBI.Utilities.cImg.style.left="0px";VBI.Utilities.cImg.style.position="absolute";var c=VBI.Utilities.cImg.getContext("2d");c.drawImage(i,0,0);var a=c.getImageData(0,0,VBI.Utilities.cImg.width,VBI.Utilities.cImg.height);return a;};VBI.Utilities.pointOnLine=function(p,x,y,d,c){function s(v,e){return((v[0]-e[0])*(v[0]-e[0])+(v[1]-e[1])*(v[1]-e[1]));}var r=-1,n=-1,a=d*d,b=a;var t,v,e;var f=VBI.Utilities.sqDistance;var g,l;for(g=0,l=p.length-1;g<l;++g){v=p[g];e=p[g+1];if((t=f(v[0],v[1],e[0],e[1],x,y))<a){a=t;r=g;}}if(r>=0){if((t=s([x,y],p[r]))<b){b=t;n=r;}if(s([x,y],p[r+1])<b){b=t;n=r+1;}}if(c&&(l>0)){v=p[0];e=p[l];if((t=f(v[0],v[1],e[0],e[1],x,y))<a){a=t;r=g;}if(r>=0){if((t=s([x,y],p[r]))<b){b=t;n=r;}if(s([x,y],p[0])<b){b=t;n=0;}}}return{m_edge:r,m_node:n};};VBI.Utilities.polyInPolygon=function(o,i,O){var h=false,I=false;for(var n=O.length-1;n>=0;--n){var a=O[n];h=false;if((VBI.Utilities.pointInPolygon(o,i[0][0]+a,i[0][1]))){h=true;for(var b=0;b<i.length&&h&&!I;++b){var p=[i[b][0]+a,i[b][1]];var c=(b+1==i.length)?[i[0][0]+a,i[0][1]]:[i[b+1][0]+a,i[b+1][1]];var d,e;I=false;for(var f=0;f<o.length;++f){d=o[f];e=(f+1==o.length)?o[0]:o[f+1];if((VBI.Utilities.LineLineIntersection(p,c,d,e,true))){I=true;}}}}if(h&&!I){break;}}return(h&&!I);};VBI.Utilities.pointInPolygon=function(p,x,y){var v,a,b=p.length;var c,n,l,h,d,e;if(jQuery.type(p[0])=='array'){if(jQuery.type(p[0][0])=='array'){c=this.pointInPolygon(p[0],x,y);if(c){for(h=false,e=1,b=p.length;!h&&e<b;++e){h=this.pointInPolygon(p[e],x,y);if(h){c=false;}}}}else{for(c=false,n=-1,l=b,d=l-1;++n<l;d=n){v=p[n];a=p[d];if(((v[1]<=y&&y<a[1])||(a[1]<=y&&y<v[1]))&&(x<(a[0]-v[0])*(y-v[1])/(a[1]-v[1])+v[0])){c=!c;}}}}else{for(c=false,n=0,l=b,d=l-2;n<=l-2;n+=2){v=[p[n],p[n+1]];a=[p[d],p[d+1]];if(((v[1]<=y&&y<a[1])||(a[1]<=y&&y<v[1]))&&(x<(a[0]-v[0])*(y-v[1])/(a[1]-v[1])+v[0])){c=!c;}d=n;}}return c;};VBI.Utilities.pointInTriangle=function(t,p){var a=t[2][0]-t[0][0];var b=t[2][1]-t[0][1];var c=t[1][0]-t[0][0];var d=t[1][1]-t[0][1];var e=p[0]-t[0][0];var f=p[1]-t[0][1];var g=a*a+b*b;var h=a*c+b*d;var i=a*e+b*f;var j=c*c+d*d;var k=c*e+d*f;var n=1/(g*j-h*h);var u=(j*i-h*k)*n;var v=(g*k-h*i)*n;return((u>=0)&&(v>=0)&&(u+v<1));};VBI.Utilities.INSIDE=0;VBI.Utilities.LEFT=1;VBI.Utilities.RIGHT=2;VBI.Utilities.BOTTOM=4;VBI.Utilities.TOP=8;VBI.Utilities.ComputeOutCode=function(x,y,r){var a=r[0];var b=r[2];var c=r[1];var d=r[3];var e=VBI.Utilities.INSIDE;if(x<a){e|=VBI.Utilities.LEFT;}else if(x>b){e|=VBI.Utilities.RIGHT;}if(y<c){e|=VBI.Utilities.BOTTOM;}else if(y>d){e|=VBI.Utilities.TOP;}return e;};VBI.Utilities.LineIntersectRect=function(a,b,c,d,r){var R={};var e=r[0];var f=r[2];var g=r[1];var h=r[3];var n=VBI.Utilities.ComputeOutCode(a,b,r);var i=VBI.Utilities.ComputeOutCode(c,d,r);var A=false;var C=true;while(C){if(!(n|i)){A=true;break;}else if(n&i){break;}else{var x,y;var j=n?n:i;if(j&VBI.Utilities.TOP){x=a+(c-a)*(h-b)/(d-b);y=h;}else if(j&VBI.Utilities.BOTTOM){x=a+(c-a)*(g-b)/(d-b);y=g;}else if(j&VBI.Utilities.RIGHT){y=b+(d-b)*(f-a)/(c-a);x=f;}else if(j&VBI.Utilities.LEFT){y=b+(d-b)*(e-a)/(c-a);x=e;}if(j==n){a=x;b=y;n=VBI.Utilities.ComputeOutCode(a,b,r);}else{c=x;d=y;i=VBI.Utilities.ComputeOutCode(c,d,r);}}}R.bReturn=false;if(A){R.x0=a;R.y0=b;R.x1=c;R.y1=d;R.bReturn=true;}return R;};VBI.Utilities.LineLineIntersection=function(p,a,q,b,s){var A=a[1]-p[1];var B=p[0]-a[0];var C=A*p[0]+B*p[1];var c=b[1]-q[1];var d=q[0]-b[0];var e=c*q[0]+d*q[1];var f=A*d-c*B;if(!f){return null;}var n=[(d*C-B*e)/f,(A*e-c*C)/f];if(s){var g=[],h=[],i=[],j=[];for(var k=0;k<=1;++k){if(p[k]<a[k]){g[k]=p[k];h[k]=a[k];}else{g[k]=a[k];h[k]=p[k];}if(q[k]<b[k]){i[k]=q[k];j[k]=b[k];}else{i[k]=b[k];j[k]=q[k];}}if(n[0]>=g[0]&&n[0]<=h[0]&&n[0]>=i[0]&&n[0]<=j[0]&&n[1]>=g[1]&&n[1]<=h[1]&&n[1]>=i[1]&&n[1]<=j[1]){return true;}else{return false;}}return[(d*C-B*e)/f,(A*e-c*C)/f];};VBI.Utilities.IsClockwise=function(p){var l=p.length;if(p.length%2){l-=1;}var x,a,y,b,z;z=0;x=p[l-2];y=p[l-1];for(var n=0;n<l;n+=2){a=p[n];b=p[n+1];z+=(a-x)*(b+y);x=a;y=b;}return(z<0);};VBI.Utilities.GetClippedPolygon=function(p,X,r){var o=X;var a=p.slice(0);var i=[];var b;for(var n=0;n<=3;++n,o=0){i=a.slice(0);a=[];var t=[i[i.length-2],i[i.length-1]];var S=[t[0]+o,t[1]];for(var c=0;c<=i.length-2;c+=2){t=[i[c],i[c+1]];var E=[t[0]+o,t[1]];var e=false;var s=false;var d=[];switch(n){case 0:e=(E[1]>r[1]);s=(S[1]>r[1]);d=[[r[0],r[1]],[r[2],r[1]]];break;case 1:e=(E[0]<r[2]);s=(S[0]<r[2]);d=[[r[2],r[1]],[r[2],r[3]]];break;case 2:e=(E[1]<r[3]);s=(S[1]<r[3]);d=[[r[0],r[3]],[r[2],r[3]]];break;case 3:e=(E[0]>r[0]);s=(S[0]>r[0]);d=[[r[0],r[1]],[r[0],r[3]]];break;default:break;}if(e){if(!s){b=VBI.Utilities.LineLineIntersection(S,E,d[0],d[1],false);if(b){a.push(b[0],b[1]);}}a.push(E[0],E[1]);}else if(s){b=VBI.Utilities.LineLineIntersection(S,E,d[0],d[1],false);if(b){a.push(b[0],b[1]);}}S=[E[0],E[1]];}}return a;};VBI.Utilities.GetBarycenterForPolygon=function(p,o){var a=p.slice(0);var b=[a[0],a[1]];var c=[a[a.length-2],a[a.length-1]];if(b!=c){a.push(a[0],a[1]);}var N=a.length-2;var s=0;var A=0;var d;var e;for(var n=0;n<N;n+=2){s+=((a[n]+o)*a[n+3]-(a[n+2]+o)*a[n+1]);}A=s/2;if(A){s=0;for(var f=0;f<N;f+=2){s+=(a[f]+o+a[f+2]+o)*((a[f]+o)*a[f+3]-(a[f+2]+o)*a[f+1]);}d=s/(A*6);s=0;for(var g=0;g<N;g+=2){s+=(a[g+1]+a[g+3])*((a[g]+o)*a[g+3]-(a[g+2]+o)*a[g+1]);}e=s/(A*6);}if(d&&e){return[d,e];}return null;};VBI.Utilities.GetMidpointForPolygon=function(p,b,X,r){var o=X;var l=[];var a=b[0];var c=b[1];var d=VBI.Utilities.PtInRect([a[0]+o,a[1]],r);var e=VBI.Utilities.PtInRect([c[0]+o,c[1]],r);if(!d||!e){p=VBI.Utilities.GetClippedPolygon(p,o,r);o=0;}var f=VBI.Utilities.GetBarycenterForPolygon(p,o);if(f){var g=VBI.Utilities.getNextPoint(f[0],f[1],p,o);l.push(g);return{max:0,aPos:l};}return null;};VBI.Utilities.GetClippedPolygons=function(p,o,r){var a=[];var b=p.slice(0);var n=b.length;var c=n-2;var z=VBI.Utilities.IsClockwise(p);if(z>0){b.push(r[0],r[1],r[2],r[1],r[2],r[3],r[0],r[3]);}else{b.push(r[0],r[1],r[0],r[3],r[2],r[3],r[2],r[1]);}var d=b.length;var E=[];var L=[];var i=[];var e=[];for(var g=0;g<n;g+=2){i.push(g);}var h,j,k,m;var l;h=[b[c]+o,b[c+1]];for(var q=0;q<=c;q+=2){j=[b[q]+o,b[q+1]];var R=VBI.Utilities.LineIntersectRect(h[0],h[1],j[0],j[1],r);if(R.bReturn==true){if((R.x0!=h[0]||R.y0!=h[1])&&(R.x1!=j[0]||R.y1!=j[1])){if(!(R.x0==R.x1&&R.y0==R.y1)){var f=b.push(R.x0,R.y0);l=b.push(R.x1,R.y1);E.push(f-2);L.push(l-2);var I=i.indexOf(q);i.splice(I,0,f-2,l-2);}}else if(R.x0!=h[0]||R.y0!=h[1]){if(R.x0!=j[0]||R.y0!=j[1]){l=b.push(R.x0,R.y0);E.push(l-2);var s=i.indexOf(q);i.splice(s,0,l-2);}}else if(R.x1!=j[0]||R.y1!=j[1]){l=b.push(R.x1,R.y1);L.push(l-2);var t=i.indexOf(q);i.splice(t,0,l-2);}}h=j;}for(var u=n,v=0;v<4;u+=2,++v){var w=[];e.push(u);k=[b[u],b[u+1]];if(v==3){m=[b[n],b[n+1]];}else{m=[b[u+2],b[u+3]];}var x=(k[0]==m[0])?1:0;var y=x?0:1;for(var A=d;A<=b.length-2;A+=2){if(b[A+y]==k[y]){w.push({pt:b[A+x],idx:A});}}if(v<2){w.sort(VBI.Utilities.StandardSort1);}else{w.sort(VBI.Utilities.StandardSort2);}for(var B=0;B<w.length;++B){e.push(w[B].idx);}k=m;}for(var C=n;C<=b.length-2;C+=2){b[C]-=o;}for(var D=0;D<E.length;++D){var F=[];var G=E[D];var H=i.indexOf(E[D]);var J=i;var K=e;var M=L;var N=E;F.push(b[E[D]],b[E[D]+1]);var O=0;var P=true;while(P){H++;if(H>J.length-1){H=0;}if(J[H]==G){a.push(F);break;}F.push(b[J[H]],b[J[H]+1]);var Q=M.indexOf(J[H]);if(Q>-1){O++;H=K.indexOf(J[H]);var S=J;J=K;K=S;S=M;M=N;N=S;}}}return a;};VBI.Utilities.StandardSort1=function(a,b){return a.pt-b.pt;};VBI.Utilities.StandardSort2=function(a,b){return b.pt-a.pt;};VBI.Utilities.GetMidpointsForPolygon=function(p,b,X,r){var a=[];var o=X;var l=[];var c=b[0];var d=b[1];if(VBI.Utilities.RectIntersect([c[0]+o,c[1],d[0]+o,d[1]],r)){var e=VBI.Utilities.PtOnRect([c[0]+o,c[1]],r);var f=VBI.Utilities.PtOnRect([d[0]+o,d[1]],r);if(!e||!f){a=VBI.Utilities.GetClippedPolygons(p,o,r);if(!a.length){var m=[r[0]+(r[2]-r[0])/2,r[1]+(r[3]-r[1])/2];if(VBI.Utilities.pointInPolygon(p,m[0],m[1])){l.push(m);}}}else{a.push(p);}for(var n=0;n<a.length;++n){var g=VBI.Utilities.GetBarycenterForPolygon(a[n],o);if(g){var h=VBI.Utilities.getNextPoint(g[0],g[1],a[n],o);l.push(h);}}if(l.length>0){return{max:0,aPos:l};}}return null;};VBI.Utilities.GetMidpointsForLine=function(p,o,r){var l=[];var R={};var a=[Number.MAX_VALUE,Number.MAX_VALUE];var O=false;var s;var S=[];if(p.length>5){for(var n=0;n<=p.length-6;n+=3){var x=p[n];var y=p[n+1];var b=p[n+3];var c=p[n+4];R=VBI.Utilities.LineIntersectRect(x+o,y,b+o,c,r);if(R.bReturn==true){if(s&&O&&(R.x0!=a[0]||R.y0!=a[1])){S.push(s);O=false;}if(!O){s=[];s.push(R.x0);s.push(R.y0);O=true;}s.push(R.x1);a[0]=R.x1;s.push(R.y1);a[1]=R.y1;}else if(O){S.push(s);O=false;}}if(O){S.push(s);O=false;}}var m=0;var d=0;for(var e=0;e<S.length;e++){var f=S[e];if(f.length>3){var t=0.0;var L;var v=[];for(var g=0;g<=f.length-4;g+=2){L=Math.sqrt(Math.pow(f[g+2]-f[g],2)+Math.pow(f[g+3]-f[g+1],2));t+=L;v.push(L);}var h=t;var H=t/2;var i=-1;var M=0.0;for(var j=v.length-1;j>=0;j--){t-=v[j];if(t<=H){M=H-t;i=j;break;}}if(i>-1){var k=[f[i*2+2]-f[i*2],f[i*2+3]-f[i*2+1]];var q=Math.sqrt(Math.pow(k[0],2)+Math.pow(k[1],2));var u=[k[0]/q,k[1]/q];var w=[u[0]*M,u[1]*M];l.push([f[i*2]+parseInt(w[0],10),f[i*2+1]+parseInt(w[1],10)]);if(h>m){m=h;d=e;}}}}return{max:d,aPos:l};};VBI.Utilities.updateBoundRect=function(a,r){var x,n=a.length;var m=r[0];var b=r[2];var c=r[1];var d=r[3];for(var e=0;e<n;++e){x=a[e];if(m>x[0]){m=x[0];}if(b<x[0]){b=x[0];}if(c>x[1]){c=x[1];}if(d<x[1]){d=x[1];}}r[0]=m;r[2]=b;r[1]=c;r[3]=d;};VBI.Utilities.inflateRect=function(r,v){r[0]-=v;r[1]-=v;r[2]+=v;r[3]+=v;};VBI.Utilities.sqDistance=function(x,y,a,b,c,d){var p=a-x;var e=b-y;var s=p*p+e*e;if(!s){return(c-x)*(c-x)+(d-y)*(d-y);}var u=((c-x)*p+(d-y)*e)/s;if(u>1){u=1;}else if(u<0){u=0;}var f=x+u*p-c;var g=y+u*e-d;return f*f+g*g;};VBI.Utilities.getNextPoint=function(x,y,p,o){var v,a,b=p.length;var d=[];var e=[];var c=false;for(var n=0,l=b,f=l-2;n<=l-2;n+=2){v=[p[n]+o,p[n+1]];a=[p[f]+o,p[f+1]];var s=0;var r=[];var A=x-v[0];var B=y-v[1];var C=a[0]-v[0];var D=a[1]-v[1];var g=A*C+B*D;var h=C*C+D*D;if(!h){s=(x-v[0])*(x-v[0])+(y-v[1])*(y-v[1]);r=[v[0],v[1]];}else{var i=g/h;if(i<0){r=[v[0],v[1]];}else if(i>1){r=[a[0],a[1]];}else{r=[v[0]+i*C,v[1]+i*D];}var j=x-(v[0]+i*C);var k=y-(v[1]+i*D);s=(j*j+k*k);}d.push(r);e.push(s);if(((v[1]<=y&&y<a[1])||(a[1]<=y&&y<v[1]))&&(x<(a[0]-v[0])*(y-v[1])/(a[1]-v[1])+v[0])){c=!c;}f=n;}if(c){return[x,y];}else{var m=10000;var q=-1;if(e.length){for(var t=0;t<e.length;++t){if(e[t]<m){q=t;m=e[t];}}if(q>-1){return(d[q]);}}return([p[0]+o,p[1]]);}};VBI.Utilities.DrawSelectIndicator=function(c,p){var r=4;c.lineWidth=1;c.strokeStyle='rgba( 0, 0, 0, 1.0 )';c.fillStyle='rgba( 10, 10, 255, 1.0 )';c.beginPath();c.arc(p[0],p[1],r,0,2*Math.PI);c.closePath();c.fill();c.stroke();};VBI.Utilities.DrawDesignRect=function(c,a,p,b,d,e){var x,y,r=3,D=c.setLineDash?true:false;c.save();c.lineWidth=1;c.strokeStyle='rgba( 0, 0, 0, 1.0 )';if(typeof p=='object'){var w=p[2]-p[0];var h=p[3]-p[1];var f=w/2;var g=h/2;if(D){c.setLineDash([1,2]);}c.strokeRect(p[0],p[1],w,h);var i='rgba( 255, 255, 255, 1.0 )';var j='rgba( 128, 128, 128, 1.0 )';if(D){c.setLineDash([0,0]);}c.fillStyle=i;for(x=0;x<3;++x){for(y=0;y<3;++y){c.fillStyle=(a[y*3+x]?i:j);if(x==1&&y==1){continue;}c.beginPath();c.arc(p[0]+x*f,p[1]+y*g,r,0,2*Math.PI);c.closePath();c.fill();c.stroke();}}}else{c.strokeRect(p-1,b-1,d-p,e-b);c.strokeStyle='rgba( 255, 255, 255, 1.0 )';c.strokeRect(p,b,d-p,e-b);}c.restore();};VBI.Utilities.DrawFrameRect=function(c,a,p,b,d,e){c.lineWidth=1;c.strokeStyle=a;if(typeof p=='object'){c.strokeRect(p[0],p[1],p[2]-p[0],p[3]-p[1]);}else{c.strokeRect(p,b,d-p,e-b);}};VBI.Utilities.AssembleCopyrightString=function(C,a,b){var r=/\{LINK\|IMG\}/;var c=/\{IMG\}/;var d=/\{LINK\|([^\}]+)\}/;if(C){var t=C.replace(r,"<a href='"+a+"'><img src='"+b+"' width='10' height='10' border='none'></a>");t=t.replace(c,"<img src='"+b+"' width='10' height='10' border='none' >");return t.replace(d,"<a  href='"+a+"'>$1</a>");}return C;};VBI.Utilities.DrawTrackingRect=function(c,p,a,b,d){c.save();c.strokeStyle='black';c.lineWidth=1;if(c.setLineDash){c.setLineDash([1,2]);}c.beginPath();c.rect(p,a,b-p,d-a);c.stroke();c.fillStyle='rgba( 0, 192, 192, 0.2 )';c.fill();c.restore();};VBI.Utilities.DrawTrackingLasso=function(c,p){c.save();c.strokeStyle='black';c.lineWidth=1;if(c.setLineDash){c.setLineDash([1,2]);}c.beginPath();c.moveTo(p[0][0],p[0][1]);for(var n=1;n<p.length;++n){c.lineTo(p[n][0],p[n][1]);}c.closePath();c.stroke();c.fillStyle='rgba( 0, 192, 192, 0.2 )';c.fill();c.restore();};VBI.Utilities.RGB2HLS=function(r,g,b){r/=255.0;g/=255.0;b/=255.0;var m=Math.max(r,g,b);var a=Math.min(r,g,b);var h=0,s,l=(m+a)/2;if(m==a){h=s=0;}else{var d=m-a;s=l>0.5?d/(2-m-a):d/(m+a);switch(m){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break;}h/=6;}return[h,l,s];};VBI.Utilities.HLS2RGB=function(h,l,s){var r=0,g=0,b=0;if(s==0){r=g=b=l;}else{var q=l<0.5?l*(1+s):l+s-l*s;var p=2*l-q;r=VBI.Utilities.HUE2RGB(p,q,h+1/3);g=VBI.Utilities.HUE2RGB(p,q,h);b=VBI.Utilities.HUE2RGB(p,q,h-1/3);}return[Math.round(r*255),Math.round(g*255),Math.round(b*255)];};VBI.Utilities.HUE2RGB=function(p,q,t){if(t<0){t+=1;}else if(t>1){t-=1;}if(t<1/6){return p+(q-p)*6*t;}if(t<1/2){return q;}if(t<2/3){return p+(q-p)*(2/3-t)*6;}return p;};VBI.Utilities.RemToPixel=function(v){return v*parseFloat(getComputedStyle(document.documentElement).fontSize);};VBI.Utilities.ColorHex2rgba=function(h){var c=h.charAt(0)==="#"?h.substring(1,7):h;return'rgba('+parseInt(c.substring(0,2),16)+','+parseInt(c.substring(2,4),16)+','+parseInt(c.substring(4,6),16)+',1.0)';};VBI.Utilities.String2VBColor=function(s){var c=VBI.Types.string2rgba(s);if(c[4]===1){return"RGBA("+c[0]+";"+c[1]+";"+c[2]+";"+parseInt(c[3]*255,10)+")";}else{return"RGB("+c[0]+";"+c[1]+";"+c[2]+")";}};VBI.Utilities.CompToHex=function(c){var h=c.toString(16);return h.length==1?"0"+h:h;};VBI.Utilities.RgbToHex=function(r,g,b){return"#"+VBI.Utilities.CompToHex(r)+VBI.Utilities.CompToHex(g)+VBI.Utilities.CompToHex(b);};});