sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/mvc/XMLView","sap/suite/ui/generic/template/lib/FlexibleColumnLayoutHandler","sap/suite/ui/generic/template/genericUtilities/testableHelper","sap/suite/ui/generic/template/js/StableIdHelper","sap/suite/ui/generic/template/genericUtilities/FeLogger","sap/base/util/extend","sap/suite/ui/generic/template/genericUtilities/FeError"],function(C,X,F,t,S,a,e,b){"use strict";var c="lib.navigation.routingHelper";var l=new a(c).getLogger();var f=Object.create(null);var s={getPlaceholderInfo:Function.prototype};var o=(sap&&sap.ushell&&sap.ushell.Container)?sap.ushell.Container.getService("CrossApplicationNavigation"):(function(){var i=0;var R={done:function(B){B({getData:function(){return Object.create(null);}});},fail:function(){}};return{createEmptyAppState:function(){return{getKey:function(){i++;return""+i;},setData:Function.prototype,getData:function(){return{'historicalEntries':['']};},save:function(){return Promise.resolve();}};},getAppState:function(){return R;},isInitialNavigation:function(){return true;}};})();function d(R,T,i,B,E,G){var I=E&&E.getPlaceholderInfo();var J=e({controlId:i,controlAggregation:B,placeholder:I},G);var K=R.getTargets();K.addTarget(T,J);return K.getTarget(T);}function g(R,i,V,T,B,E){return d(R,T,i,B,E,{viewName:V});}function h(N,T){if(N.oTemplateContract.oFlexibleColumnLayoutHandler){N.oTemplateContract.oFlexibleColumnLayoutHandler.createMessagePageTargets(g.bind(null,N.oRouter,T,"sap.suite.ui.generic.template.fragments.MessagePage"));}else{g(N.oRouter,T,"sap.suite.ui.generic.template.fragments.MessagePage","messagePage","pages");}}function j(N,T,i,B){var E=g(N.oRouter,i,T.sRouteName,T.sRouteName,B,T.behaviour);var R=function(){N.treeNodeFirstDisplay(T);E.detachDisplay(R);};E.attachDisplay(R);}function D(N,T,i){var B=T.page.routingSpec?T.page.routingSpec.draftSpec:"OData";if(B===undefined){B="parent";}switch(B){case"parent":T.isDraft=i.isDraft;return;case"OData":var E=N.oAppComponent.getTransactionController().getDraftController();var G=E.getDraftContext();try{T.isDraft=G.isDraftEnabled(T.entitySet);}catch(I){l.warning("Could not determine draft info for entity set "+T.entitySet);T.isDraft=i&&i.isDraft;}finally{return;}}T.isDraft=B;}function k(T){var i=T.page.component.name;var B=f[i];if(!B){B=new Promise(function(R){var E=i.replace(/\./g,"/")+"/behaviour";sap.ui.require([E],function(G){var M=e({},s);e(M,G);R(M);},function(){R(s);});});f[i]=B;}return B.then(function(E){T.behaviour=E;});}function A(T){T.children=[];T.text="";T.willBeDisplayed=new Promise(function(R){T.display=function(){R();T.display=Function.prototype;};});return T;}function m(T){var i=T.oAppComponent.getFlexibleColumnLayout();if(i){T.oFlexibleColumnLayoutHandler=new F(T.oNavigationHost,T.oNavigationControllerProxy);}var B=X.create({viewName:"sap.suite.ui.generic.template.fragments.TemplateHost"}).then(function(G){T.oNavigationControllerProxy.createHostView=function(){return G.clone();};});var M=T.oAppComponent.getModel();var E=Promise.all([B,M.getMetaModel().loaded()]);return E.then(function(){var G=T.oNavigationHost.getId();var I=T.oAppComponent.getConfig();if(!I.pages||!I.pages.length){throw new b(c,"Route Configuration missing");}if(I.pages.length>1){throw new b(c,"Currently only one Top route supported");}var J=I.pages[0];T.mEntityTree=Object.create(null);T.mRoutingTree=Object.create(null);var K=A({sRouteName:"root",entitySet:J.entitySet,page:J,getPath:function(){return"";},level:0,fCLLevel:0,headerTitle:T.oAppComponent.getManifestEntry("sap.app").title});D(T.oNavigationControllerProxy,K,null);var L=y([],J,K,null,T.oNavigationControllerProxy,G);return L.then(function(){var N=n("root",J,0,K,T.oNavigationControllerProxy,G,K.children);return N.then(function(){h(T.oNavigationControllerProxy,G);});});});}function n(i,B,L,E,N,T,G,I,J){if(B.pages){return Promise.all(B.pages.map(function(K){return u(i,K,L+1,E,N,T,G,I,J||0);}));}else{return Promise.resolve();}}function p(){return"---";}function H(i,E,B,L,G,N,T,I,J,K){i=G.target||i;var M={pages:B.pages};var O={entitySet:G.entitySet,sRouteName:G.sRouteName,isDraft:G.isDraft,embeddedComponent:E,getPath:function(Q){if(Q===1){return G.getPath(1)+"/"+E;}return G.getPath(Q);},patternDelimiter:p()};n(i,M,L,O,N,T,I,J,K);}function q(i,T,L,N,B,E,G,I,J,K,M){var O={};var Q={key:G,definition:I,componentName:I.componentName,componentUsage:I.componentUsage,hiddenByDefault:I.hiddenByDefault,containerId:J,sectionId:K,subSectionId:M,pages:I.pages||[],children:[],communicationObject:O};T.embeddedComponents[G]=Q;if(I.pages){H(i,G,I,L,T,N,B,Q.children,O,E);}}function r(B,T,E,L,N,G,I){T.embeddedComponents=Object.create(null);T.leadingComponents=Object.create(null);T.facetsWithEmbeddedComponents=Object.create(null);if(E.implementingComponent){q(B,T,L,N,G,I,"implementation",E.implementingComponent,"template::ImplementingComponent");}else if(E.embeddedComponents){var J=Object.create(null);var K=Object.create(null);var M;var O;var Q;for(M in E.embeddedComponents){O=E.embeddedComponents[M];if(!O.leadingSectionIdOrPath||O.leadingSectionIdOrPath===M){J[M]=[M];}else if(E.embeddedComponents[O.leadingSectionIdOrPath]){K[M]=O.leadingSectionIdOrPath;}else{Q=T.facetsWithEmbeddedComponents[O.leadingSectionIdOrPath];if(Q){Q.push(M);}else{T.facetsWithEmbeddedComponents[O.leadingSectionIdOrPath]=[M];}}}var R=[];for(M in K){var U=K[M];Q=J[U];if(Q){Q.push(M);}else{R.push(M);delete K[M];}}for(var i=0;i<R.length;i++){J[R[i]]=[R[i]];}for(M in E.embeddedComponents){O=E.embeddedComponents[M];var V=J[M]&&S.getStableId({type:"ObjectPageSection",subType:"ReuseComponentSection",sReuseComponentName:O.componentName,sReuseComponentUsage:O.componentUsage,sReuseComponentId:M});var W=S.getStableId({type:"ObjectPageSection",subType:"ReuseComponentSubSection",sReuseComponentName:O.componentName,sReuseComponentUsage:O.componentUsage,sReuseComponentId:M});var Y=S.getStableId({type:"ObjectPageSection",subType:"ReuseComponentContainer",sReuseComponentName:O.componentName,sReuseComponentUsage:O.componentUsage,sReuseComponentId:M});q(B,T,L,N,G,I,M,O,Y,V,W);}Object.keys(J).forEach(function(U){var Z=T.embeddedComponents[U];T.leadingComponents[U]={sectionId:Z.sectionId,title:Z.definition.groupTitle||Z.definition.title,followingComponents:J[U].map(function($){var _=T.embeddedComponents[$];_.sectionId=Z.sectionId;return _;})};});}}function u(i,B,L,E,N,T,G,I,J){var K=B.routingSpec&&B.routingSpec.noOData;var M=N.oAppComponent.getModel();var O=M.getMetaModel();var Q=O.getODataEntitySet(B.entitySet);if(B.component&&(K||Q)){var R=N.oTemplateContract.oFlexibleColumnLayoutHandler?N.oTemplateContract.oFlexibleColumnLayoutHandler.getMaxColumnCountInFCL():1;var U=(R===1)||(B.defaultLayoutType==="OneColumn")?0:J+1;var V=A({parent:E&&E.entitySet,parentRoute:E?E.sRouteName:"root",parentEmbeddedComponent:E&&E.embeddedComponent,entitySet:B.entitySet,navigationProperty:B.navigationProperty,level:L,fCLLevel:U>=R?3:U,communicationObject:I,page:B,defaultLayoutType:B.defaultLayoutType,noKey:B.routingSpec&&B.routingSpec.noKey,noOData:K});D(N,V,E);x(V,E,N.oTemplateContract.bCreateRequestsCanonical);P(V,N.oTemplateContract);var W=y(i,B,V,E,N,T);return W.then(function(Y){var Z=Y;var M=N.oAppComponent.getModel();var $=M.getMetaModel().getODataEntitySet(B.entitySet);V.semanticObject=$&&$["com.sap.vocabularies.Common.v1.SemanticObject"]&&$["com.sap.vocabularies.Common.v1.SemanticObject"].String;if(G){G.push(B.entitySet);}var _=N.oTemplateContract.mEntityTree[B.entitySet];if(!_||_.level>V.level){N.oTemplateContract.mEntityTree[B.entitySet]=V;}w(N,V,B);var a1=n(Z.target,B,L,V,N,T,V.children,I,U);a1.then(function(){r(Z.target,V,B,L,N,T,U);});});}else{return Promise.resolve();}}function v(R,N){var Q=e({},R);Q.name=R.name+"query";Q.pattern=R.pattern+"{?query}";N.oRouter.addRoute(Q);}function w(N,T,i){if(T.noOData){T.headerTitle=i.routingSpec.headerTitle;T.titleIconUrl=i.routingSpec.titleIconUrl;}else{var M=N.oAppComponent.getModel();var B=M.getMetaModel();B.loaded().then(function(){var E=B.getODataEntitySet(T.entitySet);var G=B.getODataEntityType(E.entityType);var I=G["com.sap.vocabularies.UI.v1.HeaderInfo"];var J=(I&&I.TypeName&&I.TypeName.String)||"";if(J.substr(0,7)==="{@i18n>"){var K=J.substring(1,J.length-1);var L=K.split(">");J=N.oAppComponent.getModel(L[0]).getResourceBundle().getText(L[1]);}T.headerTitle=J;var O=(I&&I.Title&&I.Title.IconUrl&&I.Title.IconUrl.String)||"";T.titleIconUrl=O;});}}function x(T,B,E){var G=(T.level===1||!T.page.navigationProperty)?T.page.entitySet:T.page.navigationProperty;var K=T.noKey?"":"({keys"+T.level+"})";var R=G+K;var I=B&&B.getPath(1);if(I){R=I+(B.patternDelimiter||"/")+R;}var J;var L;if(T.noOData){var M=T.page.routingSpec.binding?("/"+T.page.routingSpec.binding):"";J=B.getPath(3)+M;L=B.getPath(2)+M;}else{J="/"+T.entitySet+K;L=E||(!T.page.navigationProperty||T.level===1)?J:B.getPath(2)+"/"+T.page.navigationProperty+K;}T.getPath=function(N,O){var Q;switch(N){case 1:Q=R;break;case 2:Q=L;break;case 3:Q=J;break;default:}if(O){for(var i=1;i<=T.level;i++){Q=Q.replace("{keys"+i+"}",O[i]);}}return Q;};}function P(T,i){T.specificModelName="_templPrivGlobaleODESM_"+T.entitySet;i.oAppComponent.setModel(i.oAppComponent.getModel(),T.specificModelName);var B=Object.create(null);var E=Object.create(null);T.bindElement=function(G,I,J,K){var L=T.componentId&&i.componentRegistry[T.componentId];var N=L&&!I&&L.nonDraftCreateContext;if(N){G.setBindingContext(N,J?T.specificModelName:undefined);return;}var M=J?B:E;var O=G.getId();I=I||T.getPath(2,i.oNavigationControllerProxy.getCurrentKeys(T.level));var R=L&&L.utils.getRootExpand();var Q=M[O];if(Q&&Q.bindingPath===I&&Q.expand===R){if(Q.binding.isSuspended()){Q.binding.resume();}return;}var U={createPreliminaryContext:true,canonicalRequest:!i.bCreateRequestsCanonical};if(R){U.expand=R;}Q={bindingPath:I,expand:R};var V={path:I,events:K||{},parameters:U,batchGroupId:"Changes",changeSetId:"Changes"};if(J){V.model=T.specificModelName;}G.bindElement(V);Q.binding=G.getElementBinding(V.model);M[O]=Q;};T.unbindElement=function(G,I){var J=I?B:E;var M=I?T.specificModelName:undefined;var U=function(N,O){N.unbindElement(M);delete J[O];};if(G){U(G,G.getId());}else{var K=sap.ui.getCore();for(var L in J){U(K.byId(L),L);}}};}function y(i,B,T,E,N,G){T.componentCreated=new Promise(function(R){T.componentCreatedResolve=R;});var L=T.level;var I=Array.isArray(i)?i:[i];var J={};switch(L){case 0:T.sRouteName="root";break;case 1:T.sRouteName=B.entitySet;break;default:T.sRouteName=E.sRouteName+"/"+(E.embeddedComponent?E.embeddedComponent+"/":"")+(B.navigationProperty||B.entitySet);}N.oTemplateContract.mRoutingTree[T.sRouteName]=T;J.name=T.sRouteName;var K;if(N.oTemplateContract.oFlexibleColumnLayoutHandler){K=N.oTemplateContract.oFlexibleColumnLayoutHandler.adaptRoutingInfo(J,T.sRouteName,I,T);}else{K="pages";J.target=T.sRouteName;}var M=k(T);return M.then(function(){j(N,T,G,K);J.pattern=T.getPath(1);N.oRouter.addRoute(J);v(J,N);return J;});}function z(){return o;}return{generateRoutingStructure:m,getCrossAppNavService:z,getEmbeddedComponentsPatternDelimiter:p};});