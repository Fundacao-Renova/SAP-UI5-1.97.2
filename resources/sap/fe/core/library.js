/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/base/Log","sap/ui/base/DataType","sap/fe/core/services/TemplatedViewServiceFactory","sap/fe/core/services/ResourceModelServiceFactory","sap/fe/core/services/CacheHandlerServiceFactory","sap/fe/core/services/NavigationServiceFactory","sap/fe/core/services/RoutingServiceFactory","sap/fe/core/services/SideEffectsServiceFactory","sap/fe/core/services/ShellServicesFactory","sap/fe/core/services/AsyncComponentServiceFactory","sap/fe/core/services/EnvironmentServiceFactory","sap/ui/core/service/ServiceFactoryRegistry","sap/ui/core/Core","sap/ui/core/library","sap/fe/navigation/library","sap/fe/placeholder/library","sap/ui/fl/library","sap/ui/mdc/library","sap/fe/core/formatters/ValueFormatter","sap/fe/core/formatters/FPMFormatter","sap/fe/core/type/Email"],function(L,D,T,R,C,N,a,S,b,A,E,c){"use strict";sap.ui.getCore().initLibrary({name:"sap.fe.core",dependencies:["sap.ui.core","sap.fe.navigation","sap.fe.placeholder","sap.ui.fl","sap.ui.mdc"],types:["sap.fe.core.CreationMode","sap.fe.core.VariantManagement"],interfaces:[],controls:[],elements:[],version:"1.97.0",noLibraryCSS:true,extensions:{"sap.ui.support":{publicRules:true,internalRules:true},flChangeHandlers:{"sap.fe.core.controls.FilterBar":"sap/ui/mdc/flexibility/FilterBar"}}});sap.fe.core.CreationMode={NewPage:"NewPage",Sync:"Sync",Async:"Async",Deferred:"Deferred",Inline:"Inline",CreationRow:"CreationRow",External:"External"};sap.fe.core.VariantManagement={None:"None",Page:"Page",Control:"Control"};sap.fe.core.Constants={CancelActionDialog:"cancel"};sap.fe.core.ProgrammingModel={Draft:"Draft",Sticky:"Sticky",NonDraft:"NonDraft"};sap.fe.core.DraftStatus={Saving:"Saving",Saved:"Saved",Clear:"Clear"};sap.fe.core.EditMode={Display:"Display",Editable:"Editable"};sap.fe.core.TemplateContentView={Hybrid:"Hybrid",Chart:"Chart",Table:"Table"};var I=(sap.fe.core.InitialLoadMode={Enabled:"Enabled",Disabled:"Disabled",Auto:"Auto"});var d=D.createType("sap.fe.core.InitialLoadMode",{defaultValue:I.Auto,isValid:function(v){if(typeof v==="boolean"){L.warning("DEPRECATED: boolean value not allowed for 'initialLoad' manifest setting - supported values are: Disabled|Enabled|Auto");}return v===undefined||v===null||typeof v==="boolean"||I.hasOwnProperty(v);}});d.setNormalizer(function(v){if(!v){return I.Disabled;}return v===true?I.Enabled:v;});c.register("sap.fe.core.services.TemplatedViewService",new T());c.register("sap.fe.core.services.ResourceModelService",new R());c.register("sap.fe.core.services.CacheHandlerService",new C());c.register("sap.fe.core.services.NavigationService",new N());c.register("sap.fe.core.services.RoutingService",new a());c.register("sap.fe.core.services.SideEffectsService",new S());c.register("sap.fe.core.services.ShellServices",new b());c.register("sap.fe.core.services.EnvironmentService",new E());c.register("sap.fe.core.services.AsyncComponentService",new A());return sap.fe.core;});
