sap.ui.define(["sap/ui/base/Object","sap/suite/ui/generic/template/lib/navigation/routingHelper","sap/suite/ui/generic/template/genericUtilities/testableHelper","sap/suite/ui/generic/template/genericUtilities/FeLogger","sap/base/util/extend","sap/base/util/deepExtend","sap/base/util/isEmptyObject"],function(B,r,t,F,e,d,a){"use strict";var l=new F("lib.StatePreserver").getLogger();function g(T,s){var c=r.getCrossAppNavService();var R=T.componentRegistry[s.oComponent.getId()];var b="";var A=Promise.resolve();var n=null;var o=Promise.resolve();var f=null;var S=null;var h=null;var L,j;var C=Object.create(null);var k={};var m={};function I(){C.permanentEntries=Object.create(null);C.sessionEntries=Object.create(null);C.pageEntries=Object.create(null);C.allEntries=Object.create(null);}I();function p(i){I();for(var V in i){var W=d({},i[V]);C.allEntries[V]=W;var X=W.lifecycle||Object.create(null);if(X.permanent){C.permanentEntries[V]=W;}else if(X.session){C.sessionEntries[V]=W;}if(X.page||X.pagination){C.pageEntries[V]=W;}}return C;}function M(i,V){if(V===i){return;}var W=V.next.next;V.next.next=i.next;i.next=V.next;V.next=W;}function q(i,V,W){if(a(V)){return{appStateKey:""};}var X=JSON.stringify(V);var Y=0;var Z;for(Z=i;Z.next&&Y<10;Y++){if(Z.next.serialize===X){M(i,Z);return{appStateKey:i.next.appStateKey};}Z=Z.next;}Z.next=null;var $=c.createEmptyAppState(s.oComponent.getAppComponent(),!W);var _={next:i.next,serialize:X,appStateKey:$.getKey()};$.setData(V);$.save();i.next=_;return{appStateKey:_.appStateKey};}function u(){var i=q(m,C.sessionEntries,false);var V=Object.create(null);if(i.appStateKey){V.sessionAppStateKey=i.appStateKey;}if(!a(C.permanentEntries)){V.permanentEntries=C.permanentEntries;}S=q(k,V,true);var W=Promise.resolve();if(h===S.appStateKey){S=null;}else if(R.utils.isComponentActive()){W=T.oNavigationControllerProxy.navigateByExchangingQueryParam(s.appStateName,S.appStateKey);}else{b=S.appStateKey;S=null;}if(f){f(W.then(T.oBusyHelper.getUnbusy));f=null;}}function v(){if(!f||b!==h){return;}var i=s.getCurrentState()||Object.create(null);p(i);u();}function w(){var V=R.aKeys;var W="";var X=R.route;for(var i=V.length-1;i>0;i--){var Y=T.mRoutingTree[X];var Z=i===1?Y.entitySet:Y.navigationProperty;W="/"+Z+(V[i]?"("+V[i]+")":"")+W;X=Y.parentRoute;}return W;}function x(i,V){return A.then(function(){var W=Object.create(null);var X=(!i||w()===i)&&L;if(X){W[s.appStateName]=X;}return W;});}function y(){if(!f){o=new Promise(function(i){f=i;setTimeout(v,0);});}return o;}function z(){b=h;S=null;L=h;}function D(i,V,W){if(!V){return;}for(var X in V){var Y=V[X];if(W||Y.lifecycle.page){i[X]=Y;}}}function E(i,V){p(V);var W=Object.create(null);for(var X in V){W[X]=V[X].data;}s.applyState(W,i);if(n){n();n=null;}z();u();v();}function G(i,V,W){for(var X=i;X.next;X=X.next){if(X.next.appStateKey===W){M(i,X);return;}}var Y={next:i.next,serialize:JSON.stringify(V),appStateKey:W};i.next=Y;}function H(i,V,W,X,Y,Z){if(h===null){h=i;}else if(i!==h){return;}if(Z){G(m,Z,Y);D(W,Z,true);}D(W,X,true);E(V,W);}function J(i,V,W,X){var Y=X||Object.create(null);G(k,Y,i);if(!Y.permanentEntries){Y={permanentEntries:{permanentState:{data:Y,lifecycle:{permanent:true}}}};}var Z=T.oNavigationControllerProxy.getAppStateFromShell(Y.sessionAppStateKey).catch(Function.prototype);Z.then(H.bind(null,i,V,W,Y.permanentEntries,Y.sessionAppStateKey));}function K(i){var R=T.componentRegistry[s.oComponent.getId()];var V=R.utils.getHeaderDataAvailablePromise()||Promise.resolve();return V.then(function(){return T.oApplicationProxy.areTwoKnownPathesIdentical(j,i,R.viewLevel===1);});}function N(i,V){if(i===j){V(true);return;}if(!i||!j){V(false);return;}K(i).then(V);}function O(i,V){N(i,function(W){if(!s.callAlways&&W){if(h===b){return;}if(!h){u();return;}}j=i;var X=Object.create(null);D(X,C[W?"allEntries":"pageEntries"],W||V);if(!h){if(W){D(X,C.sessionEntries,true);D(X,C.permanentEntries,true);}E(W,X);return;}if(!n){A=new Promise(function(Z){n=Z;});}var Y=T.oNavigationControllerProxy.getAppStateFromShell(h).catch(Function.prototype);Y.then(J.bind(null,h,W,X));});}function P(){for(var i in C.pageEntries){var V=C.pageEntries[i].lifecycle;if(!V.permanent&&!V.session){delete C.allEntries[i];delete C.pageEntries[i];}}}function Q(i){h=i[s.appStateName]||"";if(Array.isArray(h)){h=h.sort()[0]||"";}if(S){if(S.appStateKey!==h){l.error("StatePreserver: Got AppstateKey "+h+" expected "+S.appStateKey);return false;}z();return true;}return false;}function U(){return{isStateChange:Q,leaveApp:P};}return{getUrlParameterInfo:x,stateChanged:y,applyAppState:O,getAsStateChanger:U};}return B.extend("sap.suite.ui.generic.template.lib.StatePreserver",{constructor:function(T,s){e(this,g(T,s));}});});
