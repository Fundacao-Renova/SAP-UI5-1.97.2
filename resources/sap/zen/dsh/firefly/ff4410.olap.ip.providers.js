/*!
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/zen/dsh/firefly/ff4400.olap.providers","sap/zen/dsh/firefly/ff4315.olap.ip.impl"],function(f){"use strict";f.PlanningStateHandlerImpl=function(){};f.PlanningStateHandlerImpl.prototype=new f.XObject();f.PlanningStateHandlerImpl.prototype._ff_c="PlanningStateHandlerImpl";f.PlanningStateHandlerImpl.prototype.update=function(a,s,r,m){f.PlanningState.update(a,s,r,m);};f.PlanningStateHandlerImpl.prototype.updateFromResponse=function(a,s,r,b,m){f.PlanningState.updateFromResponse(a,s,r,b,m);};f.PlanningStateHandlerImpl.prototype.getDataAreaStateByName=function(a,s,d){return f.DataAreaState.getDataAreaStateByName(a,s,d);};f.PlanningVariableProcessorProviderFactory=function(){};f.PlanningVariableProcessorProviderFactory.prototype=new f.XObject();f.PlanningVariableProcessorProviderFactory.prototype._ff_c="PlanningVariableProcessorProviderFactory";f.PlanningVariableProcessorProviderFactory.staticSetup=function(){f.PlanningCommandWithId.s_variableHelpProviderFactory=new f.PlanningVariableProcessorProviderFactory();};f.PlanningVariableProcessorProviderFactory.prototype.createVariableHelpProvider=function(p){return f.InAPlanningValueHelpProvider.create(p);};f.PlanningVariableProcessorProviderFactory.prototype.createProcessorProvider=function(d,v,r){return f.InAPlanningVarProcessorProvider.createInAVariableProcessorProvider(d,v,r);};f.InAPlanningCapabilitiesProviderFactory=function(){};f.InAPlanningCapabilitiesProviderFactory.prototype=new f.XObject();f.InAPlanningCapabilitiesProviderFactory.prototype._ff_c="InAPlanningCapabilitiesProviderFactory";f.InAPlanningCapabilitiesProviderFactory.staticSetup=function(){f.PlanningService.s_capabilitiesProviderFactory=new f.InAPlanningCapabilitiesProviderFactory();};f.InAPlanningCapabilitiesProviderFactory.prototype.create=function(s,a,p){return f.InACapabilitiesProvider.create(s,a,p,null);};f.InAPlanningVarProvider=function(){};f.InAPlanningVarProvider.prototype=new f.DfOlapEnvContext();f.InAPlanningVarProvider.prototype._ff_c="InAPlanningVarProvider";f.InAPlanningVarProvider.prototype.m_connection=null;f.InAPlanningVarProvider.prototype.m_activeMainCapabilities=null;f.InAPlanningVarProvider.prototype.m_importVariables=null;f.InAPlanningVarProvider.prototype.m_export=null;f.InAPlanningVarProvider.prototype.m_isVariableSubmitNeeded=false;f.InAPlanningVarProvider.prototype.m_supportsReInitVariables=false;f.InAPlanningVarProvider.prototype.m_directVariableTransfer=false;f.InAPlanningVarProvider.prototype.m_supportsCheckVariables=false;f.InAPlanningVarProvider.prototype.m_supportsVariableMasking=false;f.InAPlanningVarProvider.prototype.setupVariablesProvider=function(a,c,b){this.setupOlapApplicationContext(a.getOlapEnvironment());this.m_connection=c;this.m_activeMainCapabilities=b;var d=f.QCapabilities.create();f.InACapabilitiesProvider.importCapabilities(b,d);this.m_export=f.QInAExportFactory.createForData(a,d);this.m_importVariables=f.QInAImportFactory.createForMetadata(a,d);this.m_isVariableSubmitNeeded=true;this.m_supportsCheckVariables=true;this.m_supportsReInitVariables=d.supportsReInitVariables();this.m_supportsVariableMasking=d.supportsVariableMasking();};f.InAPlanningVarProvider.prototype.releaseObject=function(){this.m_connection=null;this.m_activeMainCapabilities=null;this.m_export=f.XObjectExt.release(this.m_export);this.m_importVariables=f.XObjectExt.release(this.m_importVariables);f.DfOlapEnvContext.prototype.releaseObject.call(this);};f.InAPlanningVarProvider.prototype.getConnection=function(){return this.m_connection;};f.InAPlanningVarProvider.prototype.getSystemDescription=function(){return this.m_connection.getSystemDescription();};f.InAPlanningVarProvider.prototype.getSystemName=function(){var s=this.getSystemDescription();if(f.isNull(s)){return null;}return s.getSystemName();};f.InAPlanningVarProvider.prototype.getSystemType=function(){return this.getSystemDescription().getSystemType();};f.InAPlanningVarProvider.prototype.getRequestPath=function(){var a=this.m_activeMainCapabilities.getByKey(f.InACapabilities.C032_FAST_PATH);if(f.notNull(a)&&a.getValue()!==null){return a.getValue();}var s=this.m_connection.getSystemDescription();return s.getSystemType().getInAPath();};f.InAPlanningVarProvider.prototype.createFunction=function(){var p=this.getRequestPath();var o=this.m_connection.newRpcFunction(p);var r=o.getRpcRequest();r.setMethod(f.HttpRequestMethod.HTTP_POST);return o;};f.InAPlanningVarProvider.prototype.getVariablesExporter=function(){return this.m_export;};f.InAPlanningVarProvider.prototype.getVariablesImporter=function(){return this.m_importVariables;};f.InAPlanningVarProvider.prototype.isVariableValuesRuntimeNeeded=function(){return false;};f.InAPlanningVarProvider.prototype.isVariableSubmitNeeded=function(){return this.m_isVariableSubmitNeeded;};f.InAPlanningVarProvider.prototype.setIsVariableSubmitNeeded=function(s){this.m_isVariableSubmitNeeded=s;};f.InAPlanningVarProvider.prototype.supportsReInitVariables=function(){return this.m_supportsReInitVariables;};f.InAPlanningVarProvider.prototype.supportsVariableMasking=function(){return this.m_supportsVariableMasking;};f.InAPlanningVarProvider.prototype.processRetrieveVariableRuntimeInformation=f.noSupport;f.InAPlanningVarProvider.prototype.processSetGetVariableValues=f.noSupport;f.InAPlanningVarProvider.prototype.processVariableSubmit=f.noSupport;f.InAPlanningVarProvider.prototype.processReInitVariableAfterSubmit=f.noSupport;f.InAPlanningVarProvider.prototype.processVariableCancel=f.noSupport;f.InAPlanningVarProvider.prototype.importVariables=f.noSupport;f.InAPlanningVarProvider.prototype.exportVariables=f.noSupport;f.InAPlanningVarProvider.prototype.setDirectVariableTransfer=function(d){this.m_directVariableTransfer=d;};f.InAPlanningVarProvider.prototype.isDirectVariableTransfer=function(){return this.m_directVariableTransfer;};f.InAPlanningVarProvider.prototype.supportsCheckVariables=function(){return this.m_supportsCheckVariables&&this.isDirectVariableTransfer();};f.InAPlanningVarProvider.prototype.processCheckVariables=f.noSupport;f.InAPlanningVarProvider.prototype.supportsDirectVariableTransfer=f.noSupport;f.InAPlanningVarProvider.prototype.processActivateVariableVariant=f.noSupport;f.InAPlanningVarProvider.prototype.processDeleteVariableVariant=f.noSupport;f.InAPlanningVarProvider.prototype.processUpdateVariableVariantValues=f.noSupport;f.InAPlanningVarProvider.prototype.processSaveVariableVariant=f.noSupport;f.InAPlanningVarProvider.prototype.processEmptyVariableDefinition=f.noSupport;f.InAPlanningVarProvider.prototype.processUpdateDynamicVariables=f.noSupport;f.InAPlanningVarProvider.prototype.processResetExitOrDynamicVariable=f.noSupport;f.InAPlanningVarProcessorProvider=function(){};f.InAPlanningVarProcessorProvider.prototype=new f.InAPlanningVarProvider();f.InAPlanningVarProcessorProvider.prototype._ff_c="InAPlanningVarProcessorProvider";f.InAPlanningVarProcessorProvider.createInAVariableProcessorProvider=function(d,v,r){var p=new f.InAPlanningVarProcessorProvider();p.setupInAVariableProcessorProvider(d,v,r);return p;};f.InAPlanningVarProcessorProvider.prototype.m_processor=null;f.InAPlanningVarProcessorProvider.prototype.m_requestorProvider=null;f.InAPlanningVarProcessorProvider.prototype.m_variableRequestorBase=null;f.InAPlanningVarProcessorProvider.prototype.setupInAVariableProcessorProvider=function(d,v,r){var a=v.getApplication();var s=v.getSystemName();var c=a.getConnection(s);var b;if(c.getSession().hasFeature(f.FeatureToggleOlap.SERVER_METADATA_VIA_SYSTEM_CONNECT)){b=c.getSystemConnect().getServerMetadata();}else{b=c.getServerMetadata();}var e=b.getMetadataForService(f.ServerService.ANALYTIC);this.setupVariablesProvider(a,c,e);this.m_requestorProvider=r;this.m_variableRequestorBase=v;var g=this.getOlapEnv().getContext();this.m_processor=f.QVariableProcessor.createVariableProcessor(g,d,this,this.m_variableRequestorBase);this.m_variableRequestorBase.setVariableProcessorBase(this.m_processor);};f.InAPlanningVarProcessorProvider.prototype.releaseObject=function(){this.m_processor=f.XObjectExt.release(this.m_processor);this.m_requestorProvider=null;this.m_variableRequestorBase=null;f.InAPlanningVarProvider.prototype.releaseObject.call(this);};f.InAPlanningVarProcessorProvider.prototype.importVariables=function(v,a){var w=f.PrFactory.createStructure();w.put("Variables",v);this.m_importVariables.importVariables(w,a);};f.InAPlanningVarProcessorProvider.prototype.exportVariables=function(v,p){var a=this.m_export.exportVariableList(v);p.putNotNullAndNotEmpty("Variables",a);};f.InAPlanningVarProcessorProvider.prototype.processRetrieveVariableRuntimeInformation=function(s,l,c){return f.InAPlanningVarGetRuntimeInfoAction.createAndRun(this,s,l,c);};f.InAPlanningVarProcessorProvider.prototype.processSetGetVariableValues=function(s,l,c){return f.InAPlanningVarSetGetValuesAction.createAndRun(this,s,l,c);};f.InAPlanningVarProcessorProvider.prototype.processVariableSubmit=function(s,l,c){return f.InAPlanningVarSubmitAction.createAndRun(this,s,l,c);};f.InAPlanningVarProcessorProvider.prototype.processReInitVariableAfterSubmit=function(s,l,c){return f.InAPlanningVarReInitAfterSubmitAction.createAndRun(this,s,l,c);};f.InAPlanningVarProcessorProvider.prototype.processVariableCancel=function(s,l,c){return f.InAPlanningVarCancelAction.createAndRun(this,s,l,c);};f.InAPlanningVarProcessorProvider.prototype.processCheckVariables=function(s,l,c){return f.InAPlanningVarCheckVariablesAction.createAndRun(this,s,l,c);};f.InAPlanningVarProcessorProvider.prototype.getRequestorProvider=function(){return this.m_requestorProvider;};f.InAPlanningVarProcessorProvider.prototype.getVariableProcessor=function(){return this.m_processor;};f.InAPlanningVarProcessorProvider.prototype.getContext=function(){return null;};f.InAPlanningVarProcessorProvider.prototype.supportsMaintainsVariableVariants=function(){return this.m_processor.supportsMaintainsVariableVariants();};f.InAPlanningVarAction=function(){};f.InAPlanningVarAction.prototype=new f.QOlapSyncAction();f.InAPlanningVarAction.prototype._ff_c="InAPlanningVarAction";f.InAPlanningVarAction.prototype.doStrictVariableProcessing=function(){var p=this.getActionContext();if(f.isNull(p)){return false;}var a=p.getApplication();return f.notNull(a);};f.InAPlanningVarAction.prototype.getProcessor=function(){return this.getActionContext().getVariableProcessor();};f.InAPlanningVarAction.prototype.checkDirectValueTransfer=function(){if(!this.doStrictVariableProcessing()){return;}var v=this.getActionContext().getVariableProcessor();if(f.isNull(v)){return;}if(v.isDirectVariableTransferEnabled()){throw f.XException.createIllegalStateException("stateful variable handling cannot be mixed with direct variable transfer");}};f.InAPlanningVarAction.prototype.callListener=function(e,l,d,c){l.onVariableProcessorExecuted(e,d,c);};f.InAPlanningVarAction.prototype.createFunction=function(){return this.getActionContext().createFunction();};f.InAPlanningVarAction.prototype.setVariablesStructure=function(r){if(f.notNull(r)){var d=f.PrFactory.createStructureDeepCopy(r);var p=this.getActionContext();f.PlanningState.update(p.getApplication(),p.getSystemName(),d,this);if(!f.InAHelper.importMessages(d,this)){var c=d.getStructureByKey("Cube");if(f.isNull(c)){var m=d.toString();this.addError(f.ErrorCodes.PARSER_ERROR,m);return false;}var i=this.getImporter();var a=this.getProcessor();i.importVariables(c,a.getVariableContainerBase());return true;}}return false;};f.InAPlanningVarAction.prototype.setStructure=function(r){if(f.notNull(r)){var d=f.PrFactory.createStructureDeepCopy(r);var p=this.getActionContext();f.PlanningState.update(p.getApplication(),p.getSystemName(),d,this);return!f.InAHelper.importMessages(d,this);}return false;};f.InAPlanningVarAction.prototype.getImporter=function(){return this.getActionContext().getVariablesImporter();};f.InAPlanningVarAction.prototype.getExporter=function(){return this.getActionContext().getVariablesExporter();};f.InAPlanningVarAction.prototype.isSuccessfullyProcessed=function(){return this.isValid();};f.InAPlanningVarAction.prototype.getRequestorProvider=function(){return this.getActionContext().getRequestorProvider();};f.InAPlanningVarCancelAction=function(){};f.InAPlanningVarCancelAction.prototype=new f.InAPlanningVarAction();f.InAPlanningVarCancelAction.prototype._ff_c="InAPlanningVarCancelAction";f.InAPlanningVarCancelAction.createAndRun=function(p,s,l,c){var n=new f.InAPlanningVarCancelAction();n.setupActionAndRun(s,l,c,p);return n;};f.InAPlanningVarCancelAction.prototype.processSynchronization=function(s){return false;};f.InAPlanningVarCancelAction.prototype.onFunctionExecuted=function(e,r,c){this.addAllMessages(e);if(e.isValid()&&f.notNull(r)){this.getQueryManagerBase().setVariableProcessorState(f.VariableProcessorState.SUBMITTED);}this.setData(this);this.endSync();};f.InAPlanningVarCheckVariablesAction=function(){};f.InAPlanningVarCheckVariablesAction.prototype=new f.InAPlanningVarAction();f.InAPlanningVarCheckVariablesAction.prototype._ff_c="InAPlanningVarCheckVariablesAction";f.InAPlanningVarCheckVariablesAction.createAndRun=function(p,s,l,c){var n=new f.InAPlanningVarCheckVariablesAction();n.setupActionAndRun(s,l,c,p);return n;};f.InAPlanningVarCheckVariablesAction.prototype.processSynchronization=function(s){return false;};f.InAPlanningVarCheckVariablesAction.prototype.onFunctionExecuted=function(e,r,c){this.addAllMessages(e);if(e.isValid()&&f.notNull(r)){var a=r.getRootElement();this.setStructure(a);}this.setData(this);this.endSync();};f.InAPlanningVarGetRuntimeInfoAction=function(){};f.InAPlanningVarGetRuntimeInfoAction.prototype=new f.InAPlanningVarAction();f.InAPlanningVarGetRuntimeInfoAction.prototype._ff_c="InAPlanningVarGetRuntimeInfoAction";f.InAPlanningVarGetRuntimeInfoAction.createAndRun=function(p,s,l,c){var n=new f.InAPlanningVarGetRuntimeInfoAction();n.setupActionAndRun(s,l,c,p);return n;};f.InAPlanningVarGetRuntimeInfoAction.prototype.processSynchronization=function(s){this.checkDirectValueTransfer();var o=this.createFunction();var r=f.PrFactory.createStructure();var a=this.getRequestorProvider();a.fillVariableRequestorDataRequestContext(r,false,"VariableDefinition");this.getProcessor().setVariableProcessorState(f.VariableProcessorState.PROCESSING_UPDATE_VALUES);o.getRpcRequest().setRequestStructure(r);o.processFunctionExecution(s,this,null);return true;};f.InAPlanningVarGetRuntimeInfoAction.prototype.onFunctionExecuted=function(e,r,c){this.addAllMessages(e);if(e.isValid()&&f.notNull(r)){var a=r.getRootElement();var s=this.setVariablesStructure(a);if(s){this.getProcessor().setVariableProcessorState(f.VariableProcessorState.CHANGEABLE_REINIT);}else{this.addError(f.ErrorCodes.OTHER_ERROR,"Error when setting variable structure");}}this.setData(this);this.endSync();};f.InAPlanningVarReInitAfterSubmitAction=function(){};f.InAPlanningVarReInitAfterSubmitAction.prototype=new f.InAPlanningVarAction();f.InAPlanningVarReInitAfterSubmitAction.prototype._ff_c="InAPlanningVarReInitAfterSubmitAction";f.InAPlanningVarReInitAfterSubmitAction.createAndRun=function(p,s,l,c){var n=new f.InAPlanningVarReInitAfterSubmitAction();n.setupActionAndRun(s,l,c,p);return n;};f.InAPlanningVarReInitAfterSubmitAction.prototype.processSynchronization=function(s){return false;};f.InAPlanningVarReInitAfterSubmitAction.prototype.onVariableProcessorExecuted=function(e,r,c){this.addAllMessages(e);this.setData(this);this.endSync();};f.InAPlanningVarSetGetValuesAction=function(){};f.InAPlanningVarSetGetValuesAction.prototype=new f.InAPlanningVarAction();f.InAPlanningVarSetGetValuesAction.prototype._ff_c="InAPlanningVarSetGetValuesAction";f.InAPlanningVarSetGetValuesAction.createAndRun=function(p,s,l,c){var n=new f.InAPlanningVarSetGetValuesAction();n.setupActionAndRun(s,l,c,p);return n;};f.InAPlanningVarSetGetValuesAction.prototype.processSynchronization=function(s){var p=this.getRequestorProvider().getPlanningContext().getPlanningService();if(p.supportsPlanningValueHelp()){this.checkDirectValueTransfer();var o=this.createFunction();var r=f.PrFactory.createStructure();var a=this.getRequestorProvider();a.fillVariableRequestorDataRequestContext(r,true,"VariableDefinition");o.getRpcRequest().setRequestStructure(r);o.processFunctionExecution(s,this,null);return true;}return false;};f.InAPlanningVarSetGetValuesAction.prototype.onFunctionExecuted=function(e,r,c){this.addAllMessages(e);if(e.isValid()&&f.notNull(r)){var a=r.getRootElement();if(!this.setVariablesStructure(a)){this.addError(f.ErrorCodes.OTHER_ERROR,"Error when setting variable structure");}}this.setData(this);this.endSync();};f.InAPlanningVarSubmitAction=function(){};f.InAPlanningVarSubmitAction.prototype=new f.InAPlanningVarAction();f.InAPlanningVarSubmitAction.prototype._ff_c="InAPlanningVarSubmitAction";f.InAPlanningVarSubmitAction.createAndRun=function(p,s,l,c){var n=new f.InAPlanningVarSubmitAction();n.setupActionAndRun(s,l,c,p);return n;};f.InAPlanningVarSubmitAction.prototype.processSynchronization=function(s){this.checkDirectValueTransfer();if(!this.getActionContext().isVariableSubmitNeeded()){this.setData(this);return false;}var o=this.createFunction();var r=f.PrFactory.createStructure();var a=this.getRequestorProvider();var i=a.fillVariableRequestorDataRequestContext(r,false,"VariableSubmit");this.getExporter().exportVariables(this.getProcessor().getVariableContainer(),i);o.getRpcRequest().setRequestStructure(r);o.processFunctionExecution(s,this,null);return true;};f.InAPlanningVarSubmitAction.prototype.onFunctionExecuted=function(e,r,c){this.addAllMessages(e);if(e.isValid()&&f.notNull(r)){var a=r.getRootElement();var s=this.setStructure(a);this.getProcessor().setVariableProcessorState(f.VariableProcessorState.SUBMITTED);if(!s){this.addError(f.ErrorCodes.OTHER_ERROR,"Error when setting variable structure");}}this.setData(this);this.endSync();};f.IpProviderModule=function(){};f.IpProviderModule.prototype=new f.DfModule();f.IpProviderModule.prototype._ff_c="IpProviderModule";f.IpProviderModule.s_module=null;f.IpProviderModule.getInstance=function(){if(f.isNull(f.IpProviderModule.s_module)){f.DfModule.checkInitialized(f.IpImplModule.getInstance());f.DfModule.checkInitialized(f.ProviderModule.getInstance());f.IpProviderModule.s_module=f.DfModule.startExt(new f.IpProviderModule());f.InAPlanningCapabilitiesProviderFactory.staticSetup();f.PlanningVariableProcessorProviderFactory.staticSetup();f.PlanningStateHandler.setInstance(new f.PlanningStateHandlerImpl());f.DfModule.stopExt(f.IpProviderModule.s_module);}return f.IpProviderModule.s_module;};f.IpProviderModule.prototype.getName=function(){return"ff4410.olap.ip.providers";};f.IpProviderModule.getInstance();return sap.firefly;});