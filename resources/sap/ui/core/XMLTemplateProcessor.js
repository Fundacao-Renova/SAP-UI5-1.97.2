/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','sap/ui/base/DataType','sap/ui/base/ManagedObject','sap/ui/core/CustomData','sap/ui/core/Component','./mvc/View','./mvc/ViewType','./mvc/XMLProcessingMode','./mvc/EventHandlerResolver','./ExtensionPoint','./StashedControlSupport','sap/ui/base/SyncPromise','sap/base/Log','sap/base/util/ObjectPath','sap/base/util/values','sap/base/assert','sap/base/security/encodeXML','sap/base/util/LoaderExtensions','sap/base/util/JSTokenizer','sap/base/util/isEmptyObject'],function(q,D,M,C,a,V,b,X,E,c,S,d,L,O,v,f,g,h,J,k){"use strict";function l(e,i,N,j,R){var p=M.bindingParser(i,j,true,false,false,false,R);if(p&&typeof p==="object"){return p;}var H=i=typeof p==="string"?p:i;var I=D.getType(e);if(I){if(I instanceof D){H=I.parseValue(i,{context:j,locals:R});if(!I.isValid(H)){L.error("Value '"+i+"' is not valid for type '"+I.getName()+"'.");}}}else{throw new Error("Property "+N+" has unknown type "+e);}return typeof H==="string"?M.bindingParser.escape(H):H;}function m(e){return e.localName||e.nodeName;}var n="http://www.w3.org/1999/xhtml";var o="http://www.w3.org/2000/xmlns/";var r="http://www.w3.org/2000/svg";var s="sap.ui.core";var t="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1";var u="http://schemas.sap.com/sapui5/extension/sap.ui.core.support.Support.info/1";var w="http://schemas.sap.com/sapui5/extension/sap.ui.core.xmlcomposite/1";var U="http://schemas.sap.com/sapui5/extension/sap.ui.core.Internal/1";var P="http://schemas.sap.com/sapui5/preprocessorextension/";var x=/^(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;function y(e,i){function j(H,I,K,N,Q){var R,W,Y=[];for(R=H.firstChild;R;R=R.nextSibling){W=i(H,I,K,R,false,N,Q);if(W){Y.push(W.unwrap());}}return d.resolve(Y);}function p(H,I,K,N,Q){var R,W=Promise.resolve(),Y=[N];for(R=H.firstChild;R;R=R.nextSibling){W=W.then(i.bind(null,H,I,K,R,false,N,Q));Y.push(W);}return Promise.all(Y);}return e?p:j;}var z={};z.loadTemplate=function(e,i){var R=e.replace(/\./g,"/")+("."+(i||"view")+".xml");return h.loadResource(R).documentElement;};z.loadTemplatePromise=function(e,i){var R=e.replace(/\./g,"/")+("."+(i||"view")+".xml");return h.loadResource(R,{async:true}).then(function(j){return j.documentElement;});};z.parseViewAttributes=function(e,j,p){var H=j.getMetadata().getAllProperties();for(var i=0;i<e.attributes.length;i++){var I=e.attributes[i];if(I.name==='controllerName'){j._controllerName=I.value;}else if(I.name==='resourceBundleName'){j._resourceBundleName=I.value;}else if(I.name==='resourceBundleUrl'){j._resourceBundleUrl=I.value;}else if(I.name==='resourceBundleLocale'){j._resourceBundleLocale=I.value;}else if(I.name==='resourceBundleAlias'){j._resourceBundleAlias=I.value;}else if(I.name==='class'){j.addStyleClass(I.value);}else if(!p[I.name]&&H[I.name]){p[I.name]=l(H[I.name].type,I.value,I.name,j._oContainingView.oController);}}};z.enrichTemplateIds=function(e,i){z.enrichTemplateIdsPromise(e,i,false);return e;};z.enrichTemplateIdsPromise=function(e,i,j){return G(e,i,true,j).then(function(){return e;});};z.parseTemplate=function(e,i){return z.parseTemplatePromise(e,i,false).unwrap();};z.parseTemplatePromise=function(i,j,H,I){return G(i,j,false,H,I).then(function(){var p=d.resolve(arguments[0]);if(j.isA("sap.ui.core.Fragment")){return p;}var K=arguments;if(j.isA("sap.ui.core.mvc.View")&&j._epInfo&&j._epInfo.all.length>0){p=T(H,j,{"content":j._epInfo.all});}return p.then(function(){if(Array.isArray(K[0])){K[0]=K[0].filter(function(e){return e==null||!e._isExtensionPoint;});}return K[0];});});};function A(R){var e,i=/^[a-zA-Z_$][a-zA-Z0-9_$]*$/;if(!R||typeof R!=="object"){e="core:require in XMLView can't be parsed to a valid object";}else{Object.keys(R).some(function(K){if(!i.test(K)){e="core:require in XMLView contains invalid identifier: '"+K+"'";return true;}if(!R[K]||typeof R[K]!=="string"){e="core:require in XMLView contains invalide value '"+R[K]+"'under key '"+K+"'";return true;}});}return e;}function B(j,p){var H=j.getAttributeNS(s,"require"),R,I,K;if(H){try{R=J.parseJS(H);}catch(e){L.error("Require attribute can't be parsed on Node: ",j.nodeName);throw e;}K=A(R);if(K){throw new Error(K+" on Node: "+j.nodeName);}if(!k(R)){I={};if(p){return new Promise(function(N,Q){var W=Object.keys(R).reduce(function(i,Y){I[Y]=sap.ui.require(R[Y]);return i&&I[Y]!==undefined;},true);if(W){N(I);return;}sap.ui.require(v(R),function(){var Y=arguments;Object.keys(R).forEach(function(Z,i){I[Z]=Y[i];});N(I);},Q);});}else{Object.keys(R).forEach(function(i){I[i]=sap.ui.requireSync(R[i]);});return d.resolve(I);}}}}function T(e,i,j){var H=d.resolve();if(!k(j)){var I=[];var R;if(e){H=new Promise(function(p){R=p;});}Object.keys(j).forEach(function(K){var N=j[K];N.forEach(function(Q){Q.targetControl=i;var W=sap.ui.require(Q.providerClass);if(W){I.push(W.applyExtensionPoint(Q));}else{var p=new Promise(function(Y,Z){sap.ui.require([Q.providerClass],function($){Y($);},Z);}).then(function(Y){return Y.applyExtensionPoint(Q);});I.push(p);}});});if(e){Promise.all(I).then(R);}}return H;}function F(e,i,p){var j=p;for(var H=0;H<100;H++){var R=e.lookupNamespaceURI(j);if(R==null||R===i){return j;}j=p+H;}throw new Error("Could not find an unused namespace prefix after 100 tries, giving up");}function G(p,H,I,K,N){var R=[],Q=F(p,U,"__ui5"),W=B(p,K)||d.resolve(),Y={openStart:function(e,j){R.push(["openStart",[e,j]]);},voidStart:function(e,j){R.push(["voidStart",[e,j]]);},style:function(e,j){R.push(["style",[e,j]]);},"class":function(e){R.push(["class",[e]]);},attr:function(e,j){R.push(["attr",[e,j]]);},openEnd:function(){R.push(["openEnd"]);},voidEnd:function(){R.push(["voidEnd"]);},text:function(e){R.push(["text",[e]]);},unsafeHtml:function(e){R.push(["unsafeHtml",[e]]);},close:function(e){R.push(["close",[e]]);},renderControl:function(e){R.push(W);}};K=K&&!!H._sProcessingMode;L.debug("XML processing mode is "+(H._sProcessingMode||"default")+".","","XMLTemplateProcessor");L.debug("XML will be processed "+K?"asynchronously":"synchronously"+".","","XMLTemplateProcessor");var Z=sap.ui.getCore().getConfiguration().getDesignMode();if(Z){H._sapui_declarativeSourceInfo={xmlNode:p,xmlRootNode:H._oContainingView===H?p:H._oContainingView._sapui_declarativeSourceInfo.xmlRootNode};}var $=H.sViewName||H._sFragmentName;if(!$){var _=H;var a1=0;while(++a1<1000&&_&&_!==_._oContainingView){_=_._oContainingView;}$=_.sViewName;}if(H.isSubView()){f1(p,true,false,W);}else{if(p.localName==="View"&&p.namespaceURI!=="sap.ui.core.mvc"){L.warning("XMLView root node must have the 'sap.ui.core.mvc' namespace, not '"+p.namespaceURI+"'"+($?" (View name: "+$+")":""));}p.setAttributeNS(o,"xmlns:"+Q,U);g1(p,false,false,W);}var i=0;function b1(){for(;i<R.length;i++){var e=R[i];if(e&&typeof e.then==='function'){return e.then(c1).then(b1);}}return R;}function c1(e){var j=[i,1].concat(e);Array.prototype.splice.apply(R,j);}return W.then(b1);function d1(e){return e;}function e1(e){return H._oContainingView.createId(e);}function f1(p,e,o1,p1){if(p.nodeType===1){var q1=m(p);var r1=p.namespaceURI===n;if(r1||p.namespaceURI===r){var s1=p.getAttribute("id");if(s1==null){s1=e===true?H.getId():undefined;}else{s1=m1(H,p);}if(q1==="style"){var t1=p.attributes;var u1=p.textContent;p=document.createElement(q1);p.textContent=u1;for(var j=0;j<t1.length;j++){var v1=t1[j];if(!v1.prefix){p.setAttribute(v1.name,v1.value);}}if(s1!=null){p.setAttribute("id",s1);}if(e===true){p.setAttribute("data-sap-ui-preserve",H.getId());}Y.unsafeHtml(p.outerHTML);return;}var w1=x.test(q1);if(w1){Y.voidStart(q1,s1);}else{Y.openStart(q1,s1);}for(var i=0;i<p.attributes.length;i++){var x1=p.attributes[i];if(x1.name!=="id"){Y.attr(r1?x1.name.toLowerCase():x1.name,x1.value);}}if(e===true){Y.attr("data-sap-ui-preserve",H.getId());}if(w1){Y.voidEnd();if(p.firstChild){L.error("Content of void HTML element '"+q1+"' will be ignored");}}else{Y.openEnd();var y1=p instanceof HTMLTemplateElement?p.content:p;g1(y1,false,false,p1);Y.close(q1);}}else if(q1==="FragmentDefinition"&&p.namespaceURI===s){g1(p,false,true,p1);}else{W=W.then(function(){return j1(p,p1).then(function(z1){for(var i=0;i<z1.length;i++){var A1=z1[i];if(H.getMetadata().hasAggregation("content")){H._epInfo=H._epInfo||{contentControlsCount:0,last:null,all:[]};if(A1._isExtensionPoint){A1.index=H._epInfo.contentControlsCount;A1.targetControl=H;A1.aggregationName="content";if(H._epInfo.last){H._epInfo.last._nextSibling=A1;}H._epInfo.last=A1;H._epInfo.all.push(A1);}else{H._epInfo.contentControlsCount++;H.addAggregation("content",A1);}}else if(H.getMetadata().hasAssociation(("content"))){H.addAssociation("content",A1);}}return z1;});});Y.renderControl(W);}}else if(p.nodeType===3&&!o1){Y.text(p.textContent);}}function g1(p,e,j,o1){var p1=p.childNodes;for(var i=0;i<p1.length;i++){f1(p1[i],e,j,o1);}}function h1(e,j){var o1;var p1=sap.ui.getCore().getLoadedLibraries();q.each(p1,function(t1,u1){if(e===u1.namespace||e===u1.name){o1=u1.name+"."+((u1.tagNames&&u1.tagNames[j])||j);}});o1=o1||e+"."+j;function q1(s1){if(!s1){L.error("Control '"+o1+"' did not return a class definition from sap.ui.define.","","XMLTemplateProcessor");s1=O.get(o1);}if(!s1){L.error("Can't find object class '"+o1+"' for XML-view","","XMLTemplateProcessor");}return s1;}var r1=o1.replace(/\./g,"/");var s1=sap.ui.require(r1);if(!s1){if(K){return new Promise(function(t1,u1){sap.ui.require([r1],function(s1){s1=q1(s1);t1(s1);},u1);});}else{s1=sap.ui.requireSync(r1);s1=q1(s1);}}return s1;}function i1(e,j,o1){if(e.namespaceURI===n||e.namespaceURI===r){var id=e.attributes['id']?e.attributes['id'].textContent||e.attributes['id'].text:null;if(I){return z.enrichTemplateIdsPromise(e,H,K).then(function(){return[];});}else{var q1=function(p1){var s1={id:id?m1(H,e,id):undefined,xmlNode:e,containingView:H._oContainingView,processingMode:H._sProcessingMode};if(H.fnScopedRunWithOwner){return H.fnScopedRunWithOwner(function(){return new p1(s1);});}return new p1(s1);};if(K){return new Promise(function(p1,s1){sap.ui.require(["sap/ui/core/mvc/XMLView"],function(r1){p1([q1(r1)]);},s1);});}else{var r1=sap.ui.requireSync("sap/ui/core/mvc/XMLView");return d.resolve([q1(r1)]);}}}else{return j1(e,j,o1);}}function j1(e,j,o1){if(m(e)==="ExtensionPoint"&&e.namespaceURI===s){if(I){return d.resolve([]);}else{var p1=H instanceof V?H._oContainingView:H;var q1=c._factory.bind(null,p1,e.getAttribute("name"),function(){var w1=d.resolve();var x1=[];var y1=e.childNodes;for(var i=0;i<y1.length;i++){var z1=y1[i];if(z1.nodeType===1){w1=w1.then(i1.bind(null,z1,j,o1));x1.push(w1);}}return d.all(x1).then(function(A1){var B1=[];A1.forEach(function(C1){B1=B1.concat(C1);});return B1;});},undefined,undefined,K);return d.resolve(H.fnScopedRunWithOwner?H.fnScopedRunWithOwner(q1):q1());}}else{var r1=m(e);var s1=r1;var t1=r1.lastIndexOf(".");if(t1>=0){s1=r1.substring(t1+1,r1.length);}if(/^[a-z].*/.test(s1)){var u1=H.sViewName||H._sFragmentName||H.getId();L.warning("View or Fragment '"+u1+"' contains a Control tag that starts with lower case '"+s1+"'",H.getId(),"sap.ui.core.XMLTemplateProcessor#lowerCase");}var v1=h1(e.namespaceURI,r1);if(v1&&typeof v1.then==='function'){return v1.then(function(w1){return k1(e,w1,j,o1);});}else{return k1(e,v1,j,o1);}}}function k1(o1,p1,q1,r1){var ns=o1.namespaceURI,t1={},u1={},v1="",w1=[],x1=null,y1=null,z1=o1.getAttribute("stashed")==="true";if(!I){o1.removeAttribute("stashed");}if(!p1){return d.resolve([]);}var A1=p1.getMetadata();var B1=A1.getAllSettings();var C1=B(o1,K);if(C1){q1=d.all([q1,C1]).then(function(e){return Object.assign({},e[0],e[1]);});}q1=q1.then(function(j){if(k(j)){j=null;}if(!I){for(var i=0;i<o1.attributes.length;i++){var s1=o1.attributes[i],H1=s1.name,I1=s1.namespaceURI,J1=B1[H1],K1=s1.value;if(H1==="id"){t1[H1]=m1(H,o1,K1);}else if(H1==="class"){v1+=K1;}else if(H1==="viewName"){t1[H1]=K1;}else if(H1==="fragmentName"){t1[H1]=K1;t1['containingView']=H._oContainingView;}else if((H1==="binding"&&!J1)||H1==='objectBindings'){if(!z1){var L1=M.bindingParser(K1,H._oContainingView.oController);if(L1){t1.objectBindings=t1.objectBindings||{};t1.objectBindings[L1.model||undefined]=L1;}}}else if(H1==='metadataContexts'){if(!z1){var M1=null;try{M1=z._calculatedModelMapping(K1,H._oContainingView.oController,true);}catch(e){L.error(H+":"+e.message);}if(M1){t1.metadataContexts=M1;if(z._preprocessMetadataContexts){z._preprocessMetadataContexts(p1.getMetadata().getName(),t1,H._oContainingView.oController);}}}}else if(H1.indexOf(":")>-1){I1=s1.namespaceURI;if(I1===t){var N1=m(s1);w1.push(new C({key:N1,value:l("any",K1,N1,H._oContainingView.oController,j)}));}else if(I1===u){y1=K1;}else if(I1&&I1.startsWith(P)){L.debug(H+": XMLView parser ignored preprocessor attribute '"+H1+"' (value: '"+K1+"')");}else if(I1===U&&m(s1)==="invisible"){J1=B1.visible;if(J1&&J1._iKind===0&&J1.type==="boolean"){t1.visible=false;}}else if(I1===s||I1===U||H1.startsWith("xmlns:")){}else{if(!x1){x1={};}if(!x1.hasOwnProperty(s1.namespaceURI)){x1[s1.namespaceURI]={};}x1[s1.namespaceURI][m(s1)]=s1.nodeValue;L.debug(H+": XMLView parser encountered unknown attribute '"+H1+"' (value: '"+K1+"') with unknown namespace, stored as sap-ui-custom-settings of customData");}}else if(J1&&J1._iKind===0){t1[H1]=l(J1.type,K1,H1,H._oContainingView.oController,j);}else if(J1&&J1._iKind===1&&J1.altTypes){if(!z1){t1[H1]=l(J1.altTypes[0],K1,H1,H._oContainingView.oController,j);}}else if(J1&&J1._iKind===2){if(!z1){var L1=M.bindingParser(K1,H._oContainingView.oController,false,false,false,false,j);if(L1){t1[H1]=L1;}else{L.error(H+": aggregations with cardinality 0..n only allow binding paths as attribute value (wrong value: "+H1+"='"+K1+"')");}}}else if(J1&&J1._iKind===3){if(!z1){t1[H1]=e1(K1);}}else if(J1&&J1._iKind===4){if(!z1){t1[H1]=K1.split(/[\s,]+/g).filter(d1).map(e1);}}else if(J1&&J1._iKind===5){if(!z1){var O1=[];E.parse(K1).forEach(function(P1){var Q1=E.resolveEventHandler(P1,H._oContainingView.oController,j);if(Q1){O1.push(Q1);}else{L.warning(H+": event handler function \""+P1+"\" is not a function or does not exist in the controller.");}});if(O1.length){t1[H1]=O1;}}}else if(J1&&J1._iKind===-1){if(A1.isA("sap.ui.core.mvc.View")&&H1=="async"){t1[H1]=l(J1.type,K1,H1,H._oContainingView.oController,j);}else{L.warning(H+": setting '"+H1+"' for class "+A1.getName()+" (value:'"+K1+"') is not supported");}}else{f(H1==='xmlns',H+": encountered unknown setting '"+H1+"' for class "+A1.getName()+" (value:'"+K1+"')");if(z._supportInfo){z._supportInfo({context:o1,env:{caller:"createRegularControls",error:true,info:"unknown setting '"+H1+"' for class "+A1.getName()}});}}}if(x1){w1.push(new C({key:"sap-ui-custom-settings",value:x1}));}if(w1.length>0){t1.customData=w1;}}return j;}).catch(function(e){if(!e.isEnriched){var j=H.getMetadata().isA("sap.ui.core.mvc.View")?"View":"Fragment";var s1=o1&&o1.cloneNode(false).outerHTML;e=new Error("Error found in "+j+" (id: '"+H.getId()+"').\nXML node: '"+s1+"':\n"+e);e.isEnriched=true;L.error(e);}if(K&&H._sProcessingMode!==X.SequentialLegacy){throw e;}});var D1=y(K,E1);function E1(o1,F1,G1,e,s1,q1,r1){var H1,I1;if(e.nodeType===1){if(e.namespaceURI===w){t1[m(e)]=e.querySelector("*");return;}H1=e.namespaceURI===ns&&G1&&G1[m(e)];if(H1){return D1(e,H1,false,q1,r1);}else if(F1){if(!s1&&e.getAttribute("stashed")==="true"&&!I){var J1=e;e=e.cloneNode();J1.removeAttribute("stashed");I1=function(){var j=m1(H,e);S.createStashedControl({wrapperId:j,fnCreate:function(){var L1=K;K=false;try{return E1(o1,F1,G1,J1,true,q1,r1).unwrap();}finally{K=L1;}}});};if(H.fnScopedRunWithOwner){H.fnScopedRunWithOwner(I1);}else{I1();}e.removeAttribute("visible");l1(e,"invisible");}if(t1[F1.name]&&t1[F1.name].path&&typeof t1[F1.name].path==="string"){r1={aggregation:F1.name,id:t1.id};}return i1(e,q1,r1).then(function(L1){for(var j=0;j<L1.length;j++){var M1=L1[j];var N1=F1.name;if(M1._isExtensionPoint){if(!t1[N1]){t1[N1]=[];}var O1=u1[N1];if(!O1){O1=u1[N1]=[];}M1.index=t1[N1].length;M1.aggregationName=N1;M1.closestAggregationBindingCarrier=r1&&r1.id;M1.closestAggregationBinding=r1&&r1.aggregation;var P1=O1[O1.length-1];if(P1){P1._nextSibling=M1;}O1.push(M1);}else if(F1.multiple){if(!t1[N1]){t1[N1]=[];}if(typeof t1[N1].path==="string"){f(!t1[N1].template,"list bindings support only a single template object");t1[N1].template=M1;}else{t1[N1].push(M1);}}else{f(!t1[N1],"multiple aggregates defined for aggregation with cardinality 0..1");t1[N1]=M1;}}return L1;});}else if(m(o1)!=="FragmentDefinition"||o1.namespaceURI!==s){throw new Error("Cannot add direct child without default aggregation defined for control "+A1.getElementName());}}else if(e.nodeType===3){var K1=e.textContent||e.text;if(K1&&K1.trim()){throw new Error("Cannot add text nodes as direct child of an aggregation. For adding text to an aggregation, a surrounding html tag is needed: "+K1.trim());}}}var F1=A1.getDefaultAggregation();var G1=A1.getAllAggregations();return D1(o1,F1,G1,q1,r1).then(function(){var e;var j=d.resolve();var s1=d.resolve();var H1=o1.getAttribute("type");var I1=a.getOwnerComponentFor(H);var J1=I1&&I1.isA("sap.ui.core.IAsyncContentCreation");if(I&&o1.hasAttribute("id")){n1(H,o1);}else if(!I){if(p1.getMetadata().isA("sap.ui.core.mvc.View")){var K1=function(){if(!p1._sType&&!t1.viewName){t1.viewName="module:"+p1.getMetadata().getName().replace(/\./g,"/");}if(J1&&K){if(t1.async===false){throw new Error("A nested view contained in a Component implementing 'sap.ui.core.IAsyncContentCreation' is processed asynchronously by default and cannot be processed synchronously.\n"+"Affected Component '"+I1.getMetadata().getComponentName()+"' and View '"+t1.viewName+"'.");}t1.type=p1._sType||H1;s1=V.create(t1);}else{if(p1.getMetadata().isA("sap.ui.core.mvc.XMLView")&&H._sProcessingMode){t1.processingMode=H._sProcessingMode;}return V._create(t1,undefined,p1._sType||H1);}};if(H.fnScopedRunWithOwner){e=H.fnScopedRunWithOwner(K1);}else{e=K1();}}else if(p1.getMetadata().isA("sap.ui.core.Fragment")&&K){if(H1!==b.JS){t1.processingMode=H._sProcessingMode;}var L1="sap/ui/core/Fragment";var M1=sap.ui.require(L1);t1.name=t1.name||t1.fragmentName;if(M1){s1=M1.load(t1);}else{s1=new Promise(function(O1,P1){sap.ui.require([L1],function(M1){M1.load(t1).then(function(Q1){O1(Q1);});},P1);});}}else{var N1=function(){var O1;if(H.fnScopedRunWithOwner){O1=H.fnScopedRunWithOwner(function(){var O1=new p1(t1);return O1;});}else{O1=new p1(t1);}j=T(K,O1,u1);return O1;};if(N&&N.fnRunWithPreprocessor){e=N.fnRunWithPreprocessor(N1);}else{e=N1();}}}return s1.then(function(O1){return O1||e;}).then(function(O1){if(v1&&O1.addStyleClass){O1.addStyleClass(v1);}if(!O1){O1=[];}else if(!Array.isArray(O1)){O1=[O1];}if(z._supportInfo&&O1){for(var i=0,P1=O1.length;i<P1;i++){var Q1=O1[i];if(Q1&&Q1.getId()){var R1=z._supportInfo({context:o1,env:{caller:"createRegularControls",nodeid:o1.getAttribute("id"),controlid:Q1.getId()}}),S1=y1?y1+",":"";S1+=R1;z._supportInfo.addSupportInfo(Q1.getId(),S1);}}}if(Z){O1.forEach(function(Q1){if(A1.getCompositeAggregationName){var T1=o1.getElementsByTagName(Q1.getMetadata().getCompositeAggregationName());for(var i=0;i<T1.length;i++){o1.removeChild(T1[0]);}}Q1._sapui_declarativeSourceInfo={xmlNode:o1,xmlRootNode:H._sapui_declarativeSourceInfo.xmlRootNode,fragmentName:A1.getName()==='sap.ui.core.Fragment'?t1['fragmentName']:null};});}return j.then(function(){return O1;});});});}function l1(e,j){var o1=F(e,U,Q);e.setAttributeNS(U,o1+":"+j,"true");}function m1(H,p,e){if(p.getAttributeNS(U,"id")){return p.getAttribute("id");}else{return e1(e?e:p.getAttribute("id"));}}function n1(H,p){p.setAttribute("id",e1(p.getAttribute("id")));l1(p,"id");}}z._preprocessMetadataContexts=null;z._calculatedModelMapping=function(e,j,p){var H,I={},K=M.bindingParser(e,j);function N(Q){if(Q.length%2===0){throw new Error("The last entry is no binding");}for(var i=1;i<=Q.length;i=i+2){if(typeof Q[i-1]=='string'){throw new Error("Binding expected not a string");}if(Q[i]){if((typeof Q[i]!='string')||(Q[i]!=",")){throw new Error("Missing delimiter ','");}}}}if(K){if(!K.formatter){H=K;K={parts:[H]};}else{N(K.formatter.textFragments);}for(var i=0;i<K.parts.length;i++){H=K.parts[i];I[H.model]=I[H.model]||(p?[]:null);if(Array.isArray(I[H.model])){I[H.model].push(H);}else{I[H.model]=H;}}}return I;};return z;},true);
