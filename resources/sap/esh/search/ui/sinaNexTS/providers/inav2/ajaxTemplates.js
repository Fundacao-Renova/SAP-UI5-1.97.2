/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["require","exports"],function(r,e){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.loadDataSourceMetadataRequest=e.incrementClickCounterRequest=e.resetPersonalizedSearchDataRequest=e.saveConfigurationRequest=e.getConfigurationRequest=e.suggestionRequest=e.chartRequest=e.searchRequest=e.fallbackLoadDataSourcesRequest=e.loadDataSourcesRequest=void 0;e.loadDataSourcesRequest={DataSource:{ObjectName:"$$DataSources$$",PackageName:"ABAP",},Options:["SynchronousRun"],Search:{Top:1000,Skip:0,OrderBy:[{AttributeName:"Description",SortOrder:"ASC",},{AttributeName:"ObjectName",SortOrder:"ASC",},],Expand:["Grid","Items"],Filter:{Selection:{Operator:{Code:"And",SubSelections:[{MemberOperand:{AttributeName:"SupportedService",Comparison:"=",Value:"Search",},},{MemberOperand:{AttributeName:"Type",Comparison:"=",Value:"View",},},],},},},NamedValues:[{AttributeName:"ObjectName",Name:"ObjectName",},{AttributeName:"Description",Name:"Description",},{AttributeName:"Type",Name:"Type",},],},SearchTerms:"*",ServiceVersion:204,};e.fallbackLoadDataSourcesRequest={DataSource:{SchemaName:"",PackageName:"ABAP",ObjectName:"",type:"Connector",},Search:{Top:1000,Skip:0,OrderBy:[{AttributeName:"DESCRIPTION",SortOrder:"ASC",},],Expand:["Grid","Items","TotalCount"],Filter:{},NamedValues:[{AttributeName:"$$ResultItemAttributes$$",Name:"$$ResultItemAttributes$$",},{AttributeName:"$$RelatedActions$$",Name:"$$RelatedActions$$",},],SearchTerms:"*",SelectedValues:[],},SearchTerms:"*",};e.searchRequest={DataSource:{},Options:["SynchronousRun"],Search:{Expand:["Grid","Items","ResultsetFacets","TotalCount"],Filter:{Selection:{Operator:{Code:"And",SubSelections:[{MemberOperand:{AttributeName:"$$RenderingTemplatePlatform$$",Comparison:"=",Value:"html",},},{MemberOperand:{AttributeName:"$$RenderingTemplateTechnology$$",Comparison:"=",Value:"Tempo",},},{MemberOperand:{AttributeName:"$$RenderingTemplateType$$",Comparison:"=",Value:"ResultItem",},},],},},},Top:10,Skip:0,SearchTerms:"S*",NamedValues:[{Function:"WhyFound",Name:"$$WhyFound$$",},{Function:"RelatedActions",Name:"$$RelatedActions$$",},{AttributeName:"$$RelatedActions.Proxy$$",},],OrderBy:[],},ServiceVersion:204,};e.chartRequest={DataSource:{},Options:["SynchronousRun"],Search:{Expand:["Grid","ResultsetFacets","TotalCount"],Filter:{},Top:10,Skip:0,SearchTerms:"*",NamedValues:[{Function:"WhyFound",Name:"$$WhyFound$$",},{AttributeName:"$$RelatedActions$$",},{AttributeName:"$$RelatedActions.Proxy$$",},],OrderBy:[],},ServiceVersion:204,Facets:{MaxNumberOfReturnValues:1000,Attributes:[],},};e.suggestionRequest={DataSource:{},Options:["SynchronousRun"],Suggestions2:{Expand:["Grid","Items"],Filter:{},Precalculated:false,AttributeNames:[],Top:10,Skip:0,},ServiceVersion:204,};e.getConfigurationRequest={SearchConfiguration:{Action:"Get",Data:{PersonalizedSearch:{},},},};e.saveConfigurationRequest={SearchConfiguration:{Action:"Update",Data:{PersonalizedSearch:{SessionUserActive:true,},},},};e.resetPersonalizedSearchDataRequest={SearchConfiguration:{Action:"Update",Data:{PersonalizedSearch:{ResetUserData:true,},},},};e.incrementClickCounterRequest={SearchConfiguration:{Action:"Update",ClientEvent:{NavigationEventList:[{SourceApplication:{SemanticObjectType:"Action",Intent:"search",ParameterList:[{Name:"searchterm",Value:"*",},{Name:"datasource",Value:'{"label":"Purchase Order","labelPlural":"Purchase Orders","SchemaName":{"label":"","value":""},"PackageName":{"label":"ABAP","value":"ABAP"},"ObjectName":{"label":"CES002~EPM_PO_DEMO~","value":"CES002~EPM_PO_DEMO~"},"Type":"BusinessObject"}',},{Name:"top",Value:"10",},{Name:"filter",Value:'{"operator":"And","label":"DefaultRoot","conditions":[]}',},],},},{TargetApplication:{SemanticObjectType:"EPMPurchaseOrder",Intent:"displayFactSheet",ParameterList:[{Name:"PurchaseOrderInternalId",Value:"3440B5B014B21EE798DDB43D63E56068",},],},},],},},};e.loadDataSourceMetadataRequest={DataSource:{ObjectName:"CER002~EPM_EMPLOYEES_DEMO~",PackageName:"ABAP",SchemaName:"",},Options:["SynchronousRun"],Metadata:{Context:"Search",Expand:["Cube"],},ServiceVersion:204,};});})();
