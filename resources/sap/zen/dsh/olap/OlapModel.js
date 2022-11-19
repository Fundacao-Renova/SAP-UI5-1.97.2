/*
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define("sap/zen/dsh/olap/OlapModel",["sap/base/Log","sap/zen/dsh/utils/Utilities","sap/ui/model/Model","sap/ui/model/Context","sap/zen/dsh/ValueType","sap/zen/dsh/olap/SystemLandscape","sap/zen/dsh/utils/SyncActionHelper","sap/zen/dsh/utils/ResultSetHelper","sap/zen/dsh/utils/ListHelper","sap/zen/dsh/utils/ApplicationHelper","sap/zen/dsh/olap/OlapListBinding","sap/zen/dsh/olap/OlapListGridBinding","sap/zen/dsh/olap/OlapPropertyBinding","sap/zen/dsh/olap/DataProvider","sap/zen/commons/SpreadSheet/Workbook","sap/zen/commons/thirdparty/lodash","sap/zen/dsh/firefly/library"],function(L,U,M,C,V,S,c,R,d,A,O,e,f,D,W,_){"use strict";var r=new RegExp("/","g");var g=M.extend("sap.zen.dsh.olap.OlapModel",{constructor:function(m){var t=this;M.apply(t);var h=_.clone(m||{});h.systemLandscape=h.systemLandscape||S;h.masterSystem=h.masterSystem||"localAbapAnalyticEngine";var i=null;var F=Promise.resolve(null).then(function(){return A.createApplication(h.systemLandscape,h.masterSystem);}).then(function(o){i=o;i.getSession().setXVersion(sap.firefly.XVersion.V190_METADATA_CUBE_RESPONSE_SUPPRESS_PROPERTIES);i.getSession().deactivateFeatureToggle(sap.firefly.FeatureToggleOlap.FUSION_SERVICE);sap.firefly.XStream.of(sap.firefly.FeatureToggleOlap.getAllFeatureToggles()).forEach(function(a){var x=a.getXVersion();if(x>sap.firefly.FeatureToggleOlap.FUSION_SERVICE.getXVersion()&&x<=sap.firefly.XVersion.MAX){i.getSession().activateFeatureToggle(a);}});}).then(function(){k({HasUndo:false,systems:_.map(d.arrayFromList(i.getSystemLandscape().getSystemNames()),function(s){return{name:s};}),colLimit:-1,rowLimit:125,dataProvider:{},variables:{},semanticStyles:{},messages:[],Functions:[]});});var j=null;var B={};function k(o){j=o;t.checkUpdate();}function u(b){if(j.HasUndo!==b){j.HasUndo=b;t.checkUpdate();}}t.setDataAccessLanguage=function(a){var s=i.getSystemLandscape();var b=s.getSystemNames();for(var o=0;o<b.size();o++){s.getSystemDescription(b.get(o)).setLanguage(a);}};t.getLocalId=_.constant(null);t.getVariantManagementReferenceForControl=_.constant(null);t.bindProperty=function(P,o,a){var b=new f(t,P,o,a);B[b.getId()]=b;return b;};t.bindList=function(P,o,s,a,b){if(P.match(/^(\/)?dataProvider\/(.)*\/Grid\/renderGrid/)){return new e(t,P,o,s,a,b);}else{return new O(t,P,o,s,a,b);}};function l(P,o){var N=o instanceof C?l(o.getPath()):j;if(P){var s=P.replace(r,".");if(s.startsWith(".")){s=s.replace(".","");}return _.get(N,s);}else{return N;}}t.isList=function(P,o){return Array.isArray(l(t.resolve(P,o)));};t.setLimit=function(o){j.rowLimit=o.rowLimit;j.colLimit=o.colLimit;t.checkUpdate();return t;};t.getLimit=function(){return{rowLimit:j.rowLimit,colLimit:j.colLimit};};t.getProperty=function(P,o){return l(P,o);};t.getCurrentControlVariantIds=_.constant([]);t.checkDirtyStateForControlModels=_.constant(null);t.setProperty=function(P,v){var b=false;var a=P.split("/");if(a[a.length-1]==="DisplayValue"){var o=t.getDataProvider(a[2]);o.setPlanValue(parseInt(a[a.length-2],10),v);}else if(a[a.length-1]==="visibleWithPrio"){var s=j.FlatVariables[parseInt(a[2],10)];s.visibleWithPrio=v;}else{var w=_.filter(P.split("/"),_.identity);try{var x=w.pop();var y=w.join(".");var z=_.get(j,y);if(x!=="vizProperties"||v){if(z){z[x]=v;}else{L.warning("Failed to set "+v+" on: "+P);}}t.checkUpdate();b=true;}catch(E){L.error(E);}}return b;};t.undo=function(){return F.then(function(){var a;var b;if(!j.HasUndo){return Promise.resolve(t);}function o(s,v){a=s;b=v;}var P=new Promise(o);i.getUndoManager().processUndo(sap.firefly.SyncType.NON_BLOCKING,{undoRedoActionFinished:function(s){if(s.hasErrors()){b(s.getErrors());}else{a(s);}}});return P.then(function(){return Promise.all(_.map(j.dataProvider,function(s){return s.getResultSet(true);}));}).then(function(){return t;});});};t.redo=function(){return F.then(function(){var a;var b;function o(s,v){a=s;b=v;}var P=new Promise(o);i.getUndoManager().processRedo(sap.firefly.SyncType.NON_BLOCKING,{undoRedoActionFinished:function(s){if(s.hasErrors()){b(s.getErrors());}else{a(s);}}});return P.then(function(){return Promise.all(_.map(j.dataProvider,function(s){return s.getResultSet(true);}));});});};t.setSemanticStyles=function(o){j.semanticStyles=_.clone(o);};t.getSemanticStyles=function(){return j.semanticStyles;};t.addMessages=function(a){j.messages=_.map(_.groupBy(_.concat(j.messages,a),"Text"),function(o){return o[0];});return t.checkUpdate();};t.clearMessages=function(b){j.messages=[];return b?t.checkUpdate():t;};t.checkUpdate=function(b){_.forEach(B,function(o,K){if(o){o.checkUpdate(b);}else{delete B[K];}},false);return t;};t.checkMessages=function(){_.forEach(B,function(b){return b.checkDataState?b.checkDataState():null;});};t.addBinding=function(b){B[b.getId()]=b;return t;};t.removeBinding=function(b){delete B[b.getId()];};t.getSystemId=function(){return t.getProperty("/serverInfo/SystemId");};t.getDataProvider=function(N){return j.dataProvider[N];};function n(Q){var a=_.map(d.arrayFromList(Q.getVariableProcessor().getVariables()),R.transformVariable).filter(function(v){return v.InputEnabled;});j.variables=_.reduce(a,function(v,o){var H=v[o.Name];if(H){var b=H.visibleWithPrio;v[o.Name]=o;v[o.Name].visibleWithPrio=b;}else{v[o.Name]=o;}return v;},j.variables);j.FlatVariables=_.filter(j.variables,function(v){return v.InputEnabled;});t.checkUpdate();}t.addSystem=function(s){return F.then(function(){A.addSystem(i,s);return t;});};t.addQuery=function(s,Q,a,P,b,T){return q(a).then(function(){var o=sap.firefly.QueryServiceConfig.createWithDataSourceName(i,null,Q);o.setMode(sap.firefly.QueryManagerMode.DEFAULT);o.setProviderType(sap.firefly.ProviderType.ANALYTICS);o.setSupportsDimensionLazyLoad(true);var v=[(T||"query"),":",(b?"["+b+"]":""),((b||P)?"["+P+"]":""),"[",Q,"]"].join("");o.setDataSourceByName(v);if(a){o.setSystemName(a);}return c.syncActionToPromise(o.processQueryManagerCreation,o,[]);}).then(function(o){j.dataProvider[s]=new D(t,n,u,i,o,s);var v=_.map(d.arrayFromList(i.getOlapEnvironment().getVariableProcessor().getVariables()),R.transformVariable);j.variables=_.reduce(v,function(w,x){w[x.Name]=x;return w;},j.variables);j.FlatVariables=_.filter(j.variables,function(w){return w.InputEnabled;});return t.checkUpdate();});};t.setVariableValue=function(v,a){_.forEach(j.dataProvider,function(o){if(o.isVariableInputEnabled(v)){o.setVariableValue(v,a);}});};t.deserialize=function(o){j.dataProvider={};j.semanticStyles=o.semanticStyles||[];j.Functions=o.Functions||[];return F.then(function(){return Promise.all(_.map(o.DataProvider,function(s,N){var Q=sap.firefly.QueryServiceConfig.createByDefinition(i,null,sap.firefly.XContent.createStringContent(sap.firefly.QModelFormat.INA_REPOSITORY,s));return c.syncActionToPromise(Q.processQueryManagerCreation,Q,[]).then(function(a){j.dataProvider[N]=new D(t,n,u,i,a,N);var b=_.map(d.arrayFromList(i.getOlapEnvironment().getVariableProcessor().getVariables()),R.transformVariable);j.variables=_.reduce(b,function(v,w){v[w.Name]=w;return v;},j.variables);j.FlatVariables=_.filter(j.variables,function(v){return v.InputEnabled;});return t.checkUpdate();});}));}).then(function(){return t.checkUpdate();});};t.serialize=function(){return{DataProvider:_.reduce(j.dataProvider,function(a,o){a[o.Name]=o.serialize();return a;},{}),semanticStyles:t.getSemanticStyles(),Functions:j.Functions};};t.openVariableSelector=function(v){return Promise.resolve(null).then(function(){var a=_.find(j.dataProvider,function(o){return o.hasVariableValueHelp(j.variables[v].TechName);});if(!a){throw new Error("Invalid Variable: "+v);}return a.openVariableSelector(v).then(function(s){if(!s){return false;}_.forEach(j.dataProvider,function(a){a.applySelectionToVariable(v,s);});return true;});});};t.submitVariables=function(){return Promise.all(_.invokeMap(j.dataProvider,"submitVariables")).then(function(){L.info("All variables submitted");});};t.logoff=function(){L.info("Log off not implemented");};var p;function q(s,a){return F.then(function(){if(p){return p;}if(s){return null;}var P=sap.firefly.QDataSource.create();P.setDataArea(a||"MY_DATA_AREA");var o=sap.firefly.OlapApiModule.SERVICE_TYPE_PLANNING.createServiceConfig(i);o.setDataSource(P);o.setSystemName(s||h.masterSystem);return c.syncActionToPromise(o.processServiceCreation,o,[]).then(function(E){p=E.getData();return p;});});}t.saveBuffer=function(){return q().then(function(p){var a=p.getPlanningContext().createCommandPublish();var b,o;function s(v,w){b=v;o=w;}a.processCommand(sap.firefly.SyncType.NON_BLOCKING,{onCommandProcessed:function(v){if(v.hasErrors()){o(v.getErrors());}else{b(v);}}});return new Promise(s);});};t.resetBuffer=function(){return q().then(function(p){var a=p.getPlanningContext().createCommandReset();var b,o;function s(v,w){b=v;o=w;}a.processCommand(sap.firefly.SyncType.NON_BLOCKING,{onCommandProcessed:function(v){if(v.hasErrors()){o(v.getErrors());}else{b(v);}}});return new Promise(s);});};t.processServiceFunction=function(s,v){L.info("VariableMapping: "+!!v);var a,b;function w(o,x){a=o;b=x;}return q().then(function(p){var o=p.getPlanningContext().createPlanningFunctionIdentifier(s);var x=p.getPlanningContext().createRequestCreatePlanningFunction(o);x.processCommand(sap.firefly.SyncType.NON_BLOCKING,{onCommandProcessed:function(y){if(y.hasErrors()){b(y.getErrors());}else{a(y);}}});return new Promise(w);}).then(function(o){var x=o.getData().getCreatedPlanningFunction();if(x.getVariableContainer().hasInputEnabledVariables()){sap.firefly.VdDragonflyEntryPoint.createEntryPoint(x.getText()||s,x.getVariableProcessor(),{onRenderDone:_.constant(null),onBeforeSubmit:_.constant(null),onOk:function(){try{a(x);}catch(E){b(E);}},onCancel:function(){a(null);}}).open();return new Promise(w);}else{return x;}}).then(function(x){var P=new Promise(w);if(x){x.processCommand(sap.firefly.SyncType.NON_BLOCKING,{onCommandProcessed:function(y){t.clearMessages();var z=d.arrayFromList(y.getMessages()).map(function(o){var E=o.getSeverity().getName();if(E==="Info"){E="Information";}return{Text:o.getText(),Severity:E,Code:o.getCode(),MessageClass:o.getMessageClass(),LongTextUri:o.getMessageClass()?["/sap/opu/odata/iwbep/message_text;o=LOCAL/T100_longtexts(MSGID='",encodeURIComponent(o.getMessageClass()),"',MSGNO='",encodeURIComponent(o.getCode()),",',MESSAGE_V1='',MESSAGE_V2='',MESSAGE_V3='',MESSAGE_V4='')/$value"].join(""):null};});t.checkUpdate(true);a(z);}});}else{a([]);}return P;});};t.processServiceSequence=function(s,v){L.info("VariableMapping: "+!!v);var a,b;function w(o,x){a=o;b=x;}return q().then(function(p){var o=p.getPlanningContext().createPlanningSequenceIdentifier(s);var x=p.getPlanningContext().createRequestCreatePlanningSequence(o);x.processCommand(sap.firefly.SyncType.NON_BLOCKING,{onCommandProcessed:function(y){if(y.hasErrors()){b(y.getErrors());}else{a(y);}}});return new Promise(w);}).then(function(o){var x=o.getData().getCreatedPlanningSequence();if(x.getVariableContainer().hasInputEnabledVariables()){sap.firefly.VdDragonflyEntryPoint.createEntryPoint(x.getText()||s,x.getVariableProcessor(),{onRenderDone:_.constant(null),onBeforeSubmit:_.constant(null),onOk:function(){try{a(x);}catch(E){b(E);}},onCancel:function(){a(null);}}).open();return new Promise(w);}else{return x;}}).then(function(x){var P=new Promise(w);if(x){x.processCommand(sap.firefly.SyncType.NON_BLOCKING,{onCommandProcessed:function(y){t.clearMessages();var z=d.arrayFromList(y.getMessages()).map(function(o){var E=o.getSeverity().getName();if(E==="Info"){E="Information";}return{Text:o.getText(),Severity:E,Code:o.getCode(),MessageClass:o.getMessageClass(),LongTextUri:o.getMessageClass()?["/sap/opu/odata/iwbep/message_text;o=LOCAL/T100_longtexts(MSGID='",encodeURIComponent(o.getMessageClass()),"',MSGNO='",encodeURIComponent(o.getCode()),",',MESSAGE_V1='',MESSAGE_V2='',MESSAGE_V3='',MESSAGE_V4='')/$value"].join(""):null};});t.checkUpdate(true);a(z);}});}else{a([]);}return P;});};t.synchronize=function(a){var T=a?(function(){var b=_.reduce(a,function(o,s){o[s]=true;return o;},{});return _.filter(j.dataProvider,function(o,s){return b[s]===true;});}()):j.dataProvider;return Promise.all(_.invokeMap(T,"getResultSet")).then(function(){return t.checkUpdate();});};t.openQueryDialog=function(){return U.getDialogs().then(function(o){return o.Open.openQuery(t);});};t.getPlanningFunctionCatalog=function(T){var a,b;function o(w,x){a=w;b=x;}var s=sap.firefly.OlapCatalogApiModule.SERVICE_TYPE_PLANNING_CATALOG.createServiceConfig(i);s.setSystemName(h.masterSystem);var E=s.processPlanningCatalogManagerCreation(sap.firefly.SyncType.BLOCKING,null,null);if(E.hasErrors()){throw new Error(E);}var v=E.getData();if(T){v.setSearchOnName(true);v.setSearchFilter(T);}v.processGetResult(sap.firefly.SyncType.NON_BLOCKING,{onPlanningCatalogResult:function(E){try{if(E.hasErrors()){return b(E.getErrors());}var w=E.getData();var x=[];var I=w.getObjectsIterator();while(I.hasNext()){var y=I.next();x.push({key:y.getObjectNameKey(),DisplayKey:y.getObjectNameKey(),Description:y.getObjectNameLongText()});}a({description:"",catalog:x});}catch(z){b(z);}}});return new Promise(o);};t.openSelectFunction=function(){return U.getDialogs().then(function(o){return o.SelectPlanningFunction.selectPlanningFunction(t);});};t.addFunction=function(N,T){j.Functions.push({Name:N,Text:T});t.checkUpdate(true);return t;};t.removeFunction=function(N){j.Functions=_.filter(t.Functions,function(o){return o.Name!==N;});t.checkUpdate(true);return t;};t.getPlanningService=function(){return p;};t.getCatalog=function(T,s,a){return F.then(function(){if(!s){return[];}var b,o;function v(E,G){b=E;o=G;}var w,x;function y(E,G){w=E;x=G;}var P=new Promise(y);var z=sap.firefly.OlapCatalogApiModule.SERVICE_TYPE_OLAP_CATALOG.createServiceConfig(i);z.setSystemName(s);z.processLightweightOlapCatalogManagerCreation(sap.firefly.SyncType.NON_BLOCKING,function(E){if(E.hasErrors()){x(E.getErrors());}else{w(E.getData());}});return P.then(function(E){E.setResultMaxSize(10);E.setResultOffset(0);E.setSelectedType(sap.firefly.MetaObjectType[a]);E.setTransientInfoProvidersIncluded(true);if(T){E.setSearchOnName(true);E.setSearchFilter(T);}var G=new Promise(v);E.processGetResult(sap.firefly.SyncType.NON_BLOCKING,{onOlapCatalogResult:function(H){if(H.hasErrors()){return o(H.getErrors());}var I=H.getData();var J=[];var K=I.getObjectsIterator();while(K.hasNext()){var N=K.next();J.push({key:N.getName(),DisplayKey:N.getName(),Description:N.getText(),Package:N.getPackageName(),Schema:N.getSchemaName(),Type:N.getType().getName()});}return b({description:"",catalog:J});}});return G;});});};t.exportToExcel=function(T){var w=new W();return Promise.resolve(null).then(function(){return Promise.all(_.map(j.dataProvider,function(o){return o.exportToExcel(w);}));}).then(function(){w.save(T||"Download.xlsx");return t;});};(function(){var P=F.then(function(){if(m&&m.SemanticStyles){t.setSemanticStyles(m.SemanticStyles);}return Promise.all(_.map(h.dataProvider||[],function(o,N){var a=t.addQuery(N,o.dataSourceName,o.systemName,o.packageName,o.schemaName,o.dataSourceType);return o.synchronize?a.then(function(){return t.getDataProvider(N).synchronize();}):a;}));});t.resetModel=function(){_.forEach(j.dataProvider,function(o){o.resetToDefault();});};t.dataLoaded=_.constant(P);t.loaded=t.dataLoaded;t.metadataLoaded=t.dataLoaded;t.annotationsLoaded=t.dataLoaded;t.getMetaModel=_.constant(t);t.attachMetadataFailed=_.constant(null);t.fireMetadataFailed=_.constant(null);t.getODataEntityContainer=_.constant(null);t.getODataEntityType=_.constant(t);t.createBindingContext=_.constant(null);t.getODataEntitySet=_.constant(t);}());},metadata:{publicMethods:["openVariableSelector","submitVariables","saveBuffer","resetBuffer","processServiceFunction","processServiceSequence","synchronize","openQueryDialog","getPlanningFunctionCatalog","openSelectFunction","addFunction","removeFunction","addQuery","serialize","deserialize","setLimit","getLimit","getDataProvider"],events:{metadataFailed:{}}}});g.prototype.openVariableSelector=function(){};g.prototype.submitVariables=function(){};g.prototype.saveBuffer=function(){};g.prototype.resetBuffer=function(){};g.prototype.processServiceFunction=function(){};g.prototype.processServiceSequence=function(){};g.prototype.synchronize=function(){};g.prototype.openQueryDialog=function(){};g.prototype.getPlanningFunctionCatalog=function(){};g.prototype.openSelectFunction=function(){};g.prototype.removeFunction=function(){};g.prototype.addFunction=function(){};g.prototype.setLimit=function(){};g.prototype.getLimit=function(){};g.prototype.serialize=function(){};g.prototype.deserialize=function(){};g.prototype.addSystem=function(){};g.prototype.addQuery=function(){};g.prototype.undo=function(){};g.prototype.getDataProvider=function(){};g.prototype.exportToExcel=function(){};g.prototype.resetModel=function(){};g.prototype.setDataAccessLanguage=function(){};return g;});