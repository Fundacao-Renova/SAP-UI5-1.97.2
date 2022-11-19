/*
 * ! SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */
sap.ui.define(['sap/ui/Device','sap/ui/core/library','sap/ui/core/Icon','sap/base/Log','sap/base/util/merge','sap/m/library','sap/m/ObjectIdentifier','sap/m/RadioButton','sap/m/CheckBox','sap/m/Text','sap/m/Button','sap/m/Input','sap/m/HBox','sap/m/Dialog','sap/ui/comp/variants/VariantItem','sap/ui/comp/variants/EditableVariantItem','sap/ui/comp/variants/VariantManagement'],function(D,c,I,L,m,a,O,R,C,T,B,b,H,d,V,E,e){"use strict";var f=c.ValueState;var g=c.VerticalAlign;var h=a.ButtonType;var S=e.extend("sap.ui.comp.smartvariants.SmartVariantManagementBase",{metadata:{library:"sap.ui.comp"},renderer:{apiVersion:2}});S.prototype.init=function(){e.prototype.init.apply(this);};S.prototype.exit=function(){e.prototype.exit.apply(this,arguments);if(this._oRolesComponent){this._oRolesComponent=null;}if(this._oInfoPopup){this._oInfoPopup.destroy();this._oInfoPopup=null;}if(this._oRolesDialog){this._oRolesDialog.destroy();this._oRolesDialog=null;}};S.prototype.getPersonalizableControlPersistencyKey=function(){if(this.isPageVariant()){return this.getPersistencyKey();}var p=this._getAllPersonalizableControls();if(p&&(p.length===1)){return this._getControlPersKey(p[0]);}return null;};S.prototype.addVariant=function(v,i){this._createVariantItem(v);if(i){this.setDefaultVariantId(v.getId());}};S.prototype.removeVariant=function(p){if(p.variantId){var v=this.getItemByKey(p.variantId);if(v){this.removeVariantItem(v);v.destroy();}delete this._mVariants[p.variantId];}if(p.previousVariantId){this.activateVariant(p.previousVariantId);}if(p.previousDefault){this.setDefaultVariantId(p.previousDefault);}};S.prototype.removeWeakVariant=function(p){if(p.variantId){var v=this.getItemByKey(p.variantId);if(v){this.removeVariantItem(v);v.destroy();}delete this._mVariants[p.variantId];}if(p.previousVariantId){this.setInitialSelectionKey(p.previousVariantId);}if(p.previousDirtyFlag){this.setModified(p.previousDirtyFlag);}if(p.previousDefault){this.setDefaultVariantId(p.previousDefault);}};S.prototype.updateVariant=function(v){var o;if(v){o=this.getItemByKey(v.getId());if(o){o.setExecuteOnSelection(this._getExecuteOnSelection(v));o.setFavorite(v.getFavorite());o.setText(v.getText("variantName"));if(v.getContexts){o.setContexts(v.getContexts());}}}};S.prototype.activateVariant=function(v){this._setSelectionByKey(v);this.setModified(false);this.fireSelect({key:v});};S.prototype.getAllVariants=function(){var i,j=this.getVariantItems();if(!j||(j.length<1)){return[];}i=j[0];j.splice(0,1);j.sort(this._compareItems);j.splice(0,0,i);var s=[];j.forEach(function(i){s.push(this._getVariantById(i.getKey()));}.bind(this));return s;};S.prototype.getModified=function(){return this.currentVariantGetModified();};S.prototype.setModified=function(v){return this.currentVariantSetModified(v);};S.prototype.getDefaultVariantId=function(){return this.getDefaultVariantKey();};S.prototype.setDefaultVariantId=function(v){this.setDefaultVariantKey(v);};S.prototype.getPresentVariantId=function(){return this.getCurrentVariantId()?this.getCurrentVariantId():this.STANDARDVARIANTKEY;};S.prototype.getPresentVariantText=function(){return this._getVariantText();};S.prototype.getPresentVariantContent=function(){return this._getContentAsync();};S.prototype._getPersoController=function(){return this._oPersoControl;};S.prototype._getPersoControllerType=function(){if(this.isPageVariant()){return"page";}var p=this._getAllPersonalizableControls();if(p&&(p.length===1)){return p[0].type;}return null;};S.prototype.getTitle=function(){return this.oVariantText;};S.prototype.isNameDuplicate=function(n){var v=n.trim();return this._isDuplicateSaveAs(v);};S.prototype.isNameTooLong=function(n){var v=n.trim();return(v.length>e.MAX_NAME_LEN);};S.prototype.setStandardItemText=function(n){e.prototype.setStandardItemText.apply(this,arguments);if(this.oVariantList){var v=this.oVariantList.getItemByKey(this.getStandardVariantKey());if(v){v.setText(n);}}};S.prototype._executeOnSelectForStandardVariantByXML=function(s){e.prototype._executeOnSelectForStandardVariantByXML.apply(this,arguments);};S.prototype.getExecuteOnSelectForStandardVariant=function(){var i=e.prototype.getExecuteOnSelectForStandardVariant.apply(this,arguments);var s=this.getItemByKey(this.getStandardVariantKey());if(s){i=s.getExecuteOnSelection();}return i;};S.prototype._createStandardVariantListItem=function(){var s=this.getVariantItems()[0];var v=new V(this.oVariantPopoverTrigger.getId()+"-item-standard",{key:s.getKey()});v.setText(this._determineStandardVariantName());this._setVariantListItemProperties(s,v);if(this.getStandardVariantKey()===this.STANDARDVARIANTKEY){v.setAuthor(this.getStandardItemAuthor());v.setExecuteOnSelection(this.getExecuteOnSelectForStandardVariant());}return v;};S.prototype._restoreCompleteList=function(i){var j,o,k,v,s;this.oVariantList.destroyItems();s=this._createStandardVariantListItem();if(s){if(this.oSelectedVariantItemKey){if(this.oSelectedVariantItemKey===s.getKey()){this.oVariantList.setSelectedItem(s);this.oSelectedVariantItemKey=null;}}else{if(this.getSelectionKey()==s.getKey()||this.getSelectionKey()===null){this.oVariantList.setSelectedItem(s);}}}k=this.getVariantItems();k.sort(this._compareItems);if(s){this.oVariantList.insertItem(s,0);}for(j=0;j<k.length;j++){o=k[j];if(!this._considerItem(i,o)){continue;}if(o.getKey()===this.getStandardVariantKey()){continue;}v=this.oVariantList.getItemByKey(o.getKey());if(!v){v=this._createVariantListItem(o,j);this.oVariantList.addItem(v);}if(this.oSelectedVariantItemKey){if(this.oSelectedVariantItemKey===v.getKey()){this.oVariantList.setSelectedItem(v);this.oSelectedVariantItemKey=null;}}else{if(this.getSelectionKey()==v.getKey()){this.oVariantList.setSelectedItem(v);}}}};S.prototype._determineTooltip=function(i){var t;if(i.getReadOnly()){t=this.oResourceBundle.getText("VARIANT_MANAGEMENT_WRONG_LAYER");}else if(i.getLabelReadOnly()){t=this.oResourceBundle.getText("VARIANT_MANAGEMENT_WRONG_LANGUAGE");}if(i.getKey()===this.getStandardVariantKey()){t=this.oResourceBundle.getText("VARIANT_MANAGEMENT_INFO");}return t;};S.prototype._checkManageItemNameChangeKeyUser=function(i,o){var t=i.getValue().trim();var k=o.getKey();this._checkVariantNameConstraints(i,this.oManagementTable);if(i.getValueState()===f.Error){return;}if(this.oVariantList.getItemByKey(k).getText().trim()===t){return;}this._mTitleChanges[k]=t;};S.prototype._getVariantByKeyFromManageKeyUser=function(k){var v=null;this.oManagementTable.getItems().some(function(i){if(i.getKey()===k){v=i;}return(v!=null);});return v;};S.prototype._getStandardVariantFromManageKeyUser=function(){return this._getVariantByKeyFromManageKeyUser(this.getStandardVariantKey());};S.prototype._getDefaultedEntryFromManageDefaultKeyUser=function(){var o=null;this.oManagementTable.getItems().some(function(i){if(i.getCells()[e.DEF_COLUMN].getSelected()){o=i;}return(o!=null);});return o;};S.prototype._handleManageDeletePressedKeyUser=function(o,i,s){var j=this._getDefaultedEntryFromManageDefaultKeyUser();if(j&&(j.getKey()===i.getKey())){var k=this._getStandardVariantFromManageKeyUser();if(k){k.getCells()[e.DEF_COLUMN].setSelected(true);this._sDefaultChanges=k.getKey();if(s){var F=k.getCells()[e.FAV_COLUMN];if(F&&this._isFavoriteSelected(F)){s(k,F,true);}}}}this.oManagementTable.removeItem(i);this._anyInErrorState(this.oManagementTable,i.getCells()[e.NAME_COLUMN]);this._mDeletedChanges[i.getKey()]=true;i.destroy();};S.prototype._checkAndAddRolesContainerToManageDialog=function(){if(this._oRolesComponentContainer&&this._oRolesDialog){var r=null;this._oRolesDialog.getContent().some(function(o){if(o===this._oRolesComponentContainer){r=o;return true;}return false;}.bind(this));if(!r){this._oRolesDialog.addContent(this._oRolesComponentContainer);}}};S.prototype._determineRolesSpecificText=function(i,t){if(i&&t){t.setText(this.oResourceBundle.getText((i.role&&i.role.length>0)?"VARIANT_MANAGEMENT_VISIBILITY_RESTRICTED":"VARIANT_MANAGEMENT_VISIBILITY_NON_RESTRICTED"));}};S.prototype._checkAndCreateContextInfoChanges=function(k,t){if(k){if(this._oRolesComponentContainer){try{if(!this._isInErrorContexts()){var i=this._getSelectedContexts();this._mContextInfoChanges[k]=i;this._determineRolesSpecificText(i,t);}else{return false;}}catch(j){return false;}}return true;}return false;};S.prototype._createRolesDialog=function(){if(!this._oRolesDialog){this._oRolesDialog=new d(this.getId()+"-roledialog",{draggable:true,resizable:true,contentWidth:"40%",title:this.oResourceBundle.getText("VARIANT_MANAGEMENT_SELECTROLES_DIALOG"),beginButton:new B(this.getId()+"-rolesave",{text:this.oResourceBundle.getText("VARIANT_MANAGEMENT_SAVE"),type:h.Emphasized,press:function(){if(!this._checkAndCreateContextInfoChanges(this._oCurrentContextsKey,this._oTextControl)){return;}this._oRolesDialog.close();}.bind(this)}),endButton:new B(this.getId()+"-rolecancel",{text:this.oResourceBundle.getText("VARIANT_MANAGEMENT_CANCEL"),press:function(){this._oRolesDialog.close();}.bind(this)}),content:[this._oRolesComponentContainer],stretch:D.system.phone});this._oRolesDialog.setParent(this);this._oRolesDialog.addStyleClass("sapUiContentPadding");this._oRolesDialog.addStyleClass(this._sStyleClassKeyUser);this._oRolesDialog.isPopupAdaptationAllowed=function(){return false;};}this._checkAndAddRolesContainerToManageDialog();};S.prototype._openRolesDialog=function(i,t){this._createRolesDialog();this._oCurrentContextsKey=i.getKey();this._oTextControl=t;var j=i.getContexts();if(this._mContextInfoChanges[this._oCurrentContextsKey]){j=this._mContextInfoChanges[this._oCurrentContextsKey];}this._setSelectedContexts(j);this._oRolesDialog.open();};S.prototype._createEntriesForManageViewsDialog=function(i,j,k){var o,n,t,l,p,q,r;var s=this.getDefaultVariantId();var u,v=this._determineTooltip(i);var M=new E(this.oVariantManage.getId()+"-edit-"+j,{key:i.getKey(),global:i.getGlobal(),readOnly:i.getReadOnly(),author:i.getAuthor(),favorite:i.getFavorite(),labelReadOnly:i.getLabelReadOnly(),lifecyclePackage:i.getLifecyclePackage(),lifecycleTransportId:i.getLifecycleTransportId(),namespace:i.getNamespace(),vAlign:g.Middle});var w=this._getVariantById(i.getKey());if(this._fGetDataForKeyUser){var x=m({},i.getContexts());if(!x.hasOwnProperty("role")){x.role=[];}M.setContexts(x);}o=new I(this.oVariantManage.getId()+"-fav-"+j,{});this._setFavoriteIcon(o,i.getFavorite());if(i.getKey()===this.getStandardVariantKey()){o.addStyleClass("sapUICompVarMngmtFavNonInteractiveColor");}else{o.addStyleClass("sapUICompVarMngmtFavColor");o.attachPress(k.selectFavorite);}M.addCell(o);if(this._fGetDataForKeyUser){if(w&&!w.isRenameEnabled(this._sLayer)){n=new O(this.oVariantManage.getId()+"-text-"+j);n.setTitle(i.getText());if(v){n.setTooltip(v);}}else{n=new b(this.oVariantManage.getId()+"-input-"+j,{liveChange:k.inputLiveChange,change:k.inputChange});n.setValue(i.getText());}}else{if(i.getLabelReadOnly()||!this.getVariantCreationByUserAllowed()){n=new O(this.oVariantManage.getId()+"-text-"+j);n.setTitle(i.getText());if(v){n.setTooltip(v);}}else{n=new b(this.oVariantManage.getId()+"-input-"+j,{liveChange:k.inputLiveChange,change:k.inputChange});n.setValue(i.getText());}}M.addCell(n);if(this._fGetDataForKeyUser){t=new T();}else{if(i.getGlobal()){u=this.oResourceBundle.getText("VARIANT_MANAGEMENT_SHARED");}else{u=this.oResourceBundle.getText("VARIANT_MANAGEMENT_PRIVATE");}t=new T(this.oVariantManage.getId()+"-type-"+j,{text:u,wrapping:false});t.addStyleClass("sapUICompVarMngmtType");}M.addCell(t);l=new R(this.oVariantManage.getId()+"-def-"+j,{groupName:this.oVariantManage.getId(),select:k.selectDefault});if(this._fGetDataForKeyUser){if((s===i.getKey())||(i.getKey()===this.getStandardVariantKey())&&(s==="")){l.setSelected(true);}}else{if(this.sNewDefaultKey===i.getKey()||i.getKey()===this.getStandardVariantKey()&&this.sNewDefaultKey===""){l.setSelected(true);this._setFavoriteIcon(o,true);}}if(l.getSelected()&&o){if(o.hasStyleClass("sapUICompVarMngmtFavColor")){o.removeStyleClass("sapUICompVarMngmtFavColor");o.addStyleClass("sapUICompVarMngmtFavNonInteractiveColor");}}M.addCell(l);if(this.getDisplayTextForExecuteOnSelectionForStandardVariant&&this.getDisplayTextForExecuteOnSelectionForStandardVariant()&&i.getKey()===this.getStandardVariantKey()){p=new C(this.oVariantManage.getId()+"-exe-"+j,{enabled:true,wrapping:true,text:this.getDisplayTextForExecuteOnSelectionForStandardVariant(),select:k.executeOnSelect});if(this.bExecuteOnSelectForStandardByUser!==null){p.setSelected(this.bExecuteOnSelectForStandardByUser);}else{p.setSelected(i.getExecuteOnSelection());}}else{p=new C(this.oVariantManage.getId()+"-exe-"+j,{selected:false,enabled:true,text:"",select:k.executeOnSelect});if(i.getKey()===this.getStandardVariantKey()){p.setEnabled(true);if(this.bExecuteOnSelectForStandardByUser!==null){p.setSelected(this.bExecuteOnSelectForStandardByUser);}else{p.setSelected(i.getExecuteOnSelection());}}else{p.setSelected(i.getExecuteOnSelection());}}M.addCell(p);if(this._fGetDataForKeyUser&&(i.getKey()!==this.getStandardVariantKey())){var y=new T({wrapping:false});this._determineRolesSpecificText(i.getContexts(),y);var z=new I({src:"sap-icon://edit",press:k.rolesPressed});z.addStyleClass("sapUiCompVarMngmtRolesEdit");z.setTooltip(this.oResourceBundle.getText("VARIANT_MANAGEMENT_VISIBILITY_ICON_TT"));r=new H(this.oVariantManage.getId()+"-role-"+j,{items:[y,z]});r.addStyleClass("sapUICompVarMngmtRole");}else{r=new T();}M.addCell(r);t=new T(this.oVariantManage.getId()+"-author-"+j,{text:i.getAuthor(),textAlign:"Begin"});M.addCell(t);q=new B(this.oVariantManage.getId()+"-del-"+j,{icon:"sap-icon://decline",enabled:true,type:h.Transparent,press:k.deletePressed,tooltip:this.oResourceBundle.getText("VARIANT_MANAGEMENT_DELETE")});if(this._fGetDataForKeyUser){if(w){q.setEnabled(w.isDeleteEnabled(this._sLayer));if((i.getKey()===this.getStandardVariantKey())||(i.getKey().indexOf("#")===0)){q.setVisible(false);}else{q.setVisible(true);}}}else{if(w&&!w.isDeleteEnabled()||!this.getVariantCreationByUserAllowed()){q.setVisible(false);q.setEnabled(false);}}this._assignColumnInfoForDeleteButton(q);M.addCell(q);this.oManagementTable.addItem(M);};S.prototype._toggleIconActivityState=function(F,i,t){if(!F||!i){return;}if(i.getKey()===this.getStandardVariantKey()){return;}if(t){if(F.hasStyleClass("sapUICompVarMngmtFavColor")){F.removeStyleClass("sapUICompVarMngmtFavColor");F.addStyleClass("sapUICompVarMngmtFavNonInteractiveColor");}}else if(F.hasStyleClass("sapUICompVarMngmtFavNonInteractiveColor")){F.removeStyleClass("sapUICompVarMngmtFavNonInteractiveColor");F.addStyleClass("sapUICompVarMngmtFavColor");}};S.prototype.openManageViewsDialogForKeyUser=function(p,j){var o;var r=p.contextSharingComponentContainer;var s=p.rtaStyleClass;this._sLayer=p.layer;this._delayedControlCreation();this._mFavoriteChanges={};this._mExecuteOnSelectChanges={};this._mTitleChanges={};this._mDeletedChanges={};this._mContextInfoChanges={};this.aRemovedVariants=[];this._sDefaultChanges=null;this.oManagementSave.setEnabled(true);this.oManagementTable.destroyItems();this._sStyleClassKeyUser=s;this._fGetDataForKeyUser=j;this._bShowShare=this.getShowShare();this.setShowShare(false);var k=function(i,x,y){this._mFavoriteChanges[i.getKey()]=y;this._setFavoriteIcon(x,y);}.bind(this);var l=function(i){var x=this._isFavoriteSelected(i.oSource),y=i.oSource.getParent();if(y){k(y,i.oSource,x);}}.bind(this);var n=function(i){var x=i.oSource.getParent();if(x){this._checkManageItemNameChangeKeyUser(i.oSource,x);}}.bind(this);var q=function(i){this._checkVariantNameConstraints(i.oSource,this.oManagementTable);}.bind(this);var t=function(i){var x=i.oSource.getParent();if(x){this._handleManageDeletePressedKeyUser(i.oSource,x,k);}}.bind(this);var u=function(i){var x=(i.getParameters().selected===true),y=i.oSource.getParent();if(y){var F=y.getCells()[e.FAV_COLUMN];if(x){this._sDefaultChanges=y.getKey();if(y.getKey()===this.getStandardVariantKey()){return;}if(F&&this._isFavoriteSelected(F)){k(y,F,true);}}else{this._sDefaultChanges=null;}this._toggleIconActivityState(F,y,x);}}.bind(this);var v=function(i){var x=(i.getParameters().selected===true),y=i.oSource.getParent();if(y){this._mExecuteOnSelectChanges[y.getKey()]=x;}}.bind(this);var w=function(i){var x=i.oSource.getParent().getParent();this._openRolesDialog(x,i.oSource.getParent().getItems()[0]);}.bind(this);this._initalizeManagementTableColumns();this._restoreCompleteList(true);o=this.oVariantList.getItems();Promise.all([r]).then(function(A){this._oRolesComponentContainer=A[0];this._columnVisibilityManagementTable(e.RESTRICT_COLUMN,(!!this._oRolesComponentContainer));var x={selectFavorite:l,selectDefault:u,executeOnSelect:v,rolesPressed:w,inputChange:n,inputLiveChange:q,deletePressed:t};for(var i=0;i<o.length;i++){this._createEntriesForManageViewsDialog(o[i],i,x);}this._createManagementDialog();this._setDialogCompactStyle(this,this.oManagementDialog);this.oManagementDialog.isPopupAdaptationAllowed=function(){return false;};var y=this.oVariantList.getSelectedItem();if(y){this.lastSelectedVariantKey=y.getKey();}this.oVariantPopOver.close();this.oManagementDialog.addStyleClass(s);this.oManagementDialog.open();}.bind(this));};S.prototype._openVariantManagementDialog=function(){var o;var j=null;this._mFavoriteChanges={};this.oManagementSave.setEnabled(true);this.oManagementTable.destroyItems();var l=function(t){this._checkVariantNameConstraints(t.oSource,this.oManagementTable);}.bind(this);var k=function(t){var u=this._createEvent("inputfieldChange",this._checkManageItemNameChange);u.args.push(t.oSource.getParent());this._addEvent(u);}.bind(this);var s=function(t){var u=this._isFavoriteSelected(t.oSource),o=t.oSource.getParent();if(o&&(this.sNewDefaultKey!==o.getKey())){this._mFavoriteChanges[o.getKey()]=u;this._setFavoriteIcon(t.oSource,u);}}.bind(this);var n=function(t){var u=(t.getParameters().selected===true),o=t.oSource.getParent();if(o){var F=o.getCells()[e.FAV_COLUMN];if(u){this.sNewDefaultKey=o.getKey();if(o.getKey()===this.getStandardVariantKey()){return;}this._mFavoriteChanges[o.getKey()]=u;if(F){this._setFavoriteIcon(F,true);}}this._toggleIconActivityState(F,o,u);}}.bind(this);var p=function(t){var u=this._createEvent("executeOnSelectionChange",this._handleManageExecuteOnSelectionChanged);u.args.push(t.oSource);this._addEvent(u);}.bind(this);var q=function(t){var u=this._createEvent("manageDeletePressed",this._handleManageDeletePressed);u.args.push(t.oSource);this._addEvent(u);}.bind(this);if(this.oManageDialogSearchField){this.oManageDialogSearchField.setValue("");}this._initalizeManagementTableColumns();this.sNewDefaultKey=this.getDefaultVariantKey();this._restoreCompleteList(true);o=this.oVariantList.getItemByKey(this.getStandardVariantKey());if(o){this.oVariantList.removeItem(o);}j=this.oVariantList.getItems();j.sort(this._compareItems);if(o){this.oVariantList.insertItem(o);j.splice(0,0,o);}var r={selectFavorite:s,selectDefault:n,executeOnSelect:p,inputChange:k,inputLiveChange:l,deletePressed:q};for(var i=0;i<j.length;i++){this._createEntriesForManageViewsDialog(j[i],i,r);}this.aRemovedVariants=[];this.aRemovedVariantTransports=[];this.aRenamedVariants=[];this.aExeVariants=[];this._createManagementDialog();this._setDialogCompactStyle(this,this.oManagementDialog);o=this.oVariantList.getSelectedItem();if(o){this.lastSelectedVariantKey=o.getKey();}this.oVariantPopOver.close();this.oManagementDialog.open();};S.prototype._checkAndAddRolesContainerToSaveAsDialog=function(){if(this._oRolesComponentContainer&&this.oSaveDialog){var r=null;this.oSaveDialog.getContent().some(function(o){if(o===this._oRolesComponentContainer){r=o;return true;}return false;}.bind(this));this._setSelectedContexts({role:[]});if(!r){this.oSaveDialog.addContent(this._oRolesComponentContainer);}}};S.prototype.openSaveAsDialogForKeyUser=function(s,i,r){this._delayedControlCreation();this._sStyleClassKeyUser=s;this._fGetDataForKeyUser=i;this._mContextInfoChanges={};this._bShowShare=this.getShowShare();this.setShowShare(false);this._initSaveAsDialog();this.oSaveDialog.addStyleClass(s);this.oSaveDialog.isPopupAdaptationAllowed=function(){return false;};Promise.all([r]).then(function(A){this._oRolesComponentContainer=A[0];this._checkAndAddRolesContainerToSaveAsDialog();this.oSaveDialog.open();}.bind(this));};S.prototype._cleanUpSaveForKeyUser=function(){this.oSaveDialog.removeStyleClass(this._sStyleClassKeyUser);if(this._oRolesComponentContainer){this.oSaveDialog.removeContent(this._oRolesComponentContainer);}this._cleanUpKeyUser();this.oSaveDialog.close();};S.prototype._cleanUpManageViewsForKeyUser=function(){this.oManagementDialog.removeStyleClass(this._sStyleClassKeyUser);this._cleanUpKeyUser();this.oManagementDialog.close();};S.prototype._cleanUpKeyUser=function(){this.setShowShare(this._bShowShare);this._mFavoriteChanges=null;this._mExecuteOnSelectChanges=null;this._sDefaultChanges=null;this._mTitleChanges=null;this._mDeletedChanges=null;this._mContextInfoChanges=null;this._fGetDataForKeyUser=null;this._sLayer=null;this._sStyleClassKeyUser=undefined;this._oRolesComponentContainer=null;};S.prototype._handleManageSavePressedForKeyUser=function(){var i,j={};var s=false;if(this._sDefaultChanges){j.default=this._sDefaultChanges;}if(Object.keys(this._mExecuteOnSelectChanges).length>0){for(i in this._mExecuteOnSelectChanges){if(!j[i]){j[i]={};}j[i].executeOnSelection=this._mExecuteOnSelectChanges[i];}}if(Object.keys(this._mFavoriteChanges).length>0){for(i in this._mFavoriteChanges){if(!j[i]){j[i]={};}j[i].favorite=this._mFavoriteChanges[i];}}if(Object.keys(this._mTitleChanges).length>0){for(i in this._mTitleChanges){if(!j[i]){j[i]={};}j[i].name=this._mTitleChanges[i];}}if(Object.keys(this._mDeletedChanges).length>0){for(i in this._mDeletedChanges){if(!j[i]){j[i]={};}j[i].deleted=this._mDeletedChanges[i];}if(this.lastSelectedVariantKey===i){s=true;}}if(Object.keys(this._mContextInfoChanges).length>0){for(i in this._mContextInfoChanges){if(!j[i]){j[i]={};}j[i].contexts=this._mContextInfoChanges[i];}}if(s){this.activateVariant(this.getStandardVariantKey());}this._fGetDataForKeyUser(j);this._cleanUpManageViewsForKeyUser();};S.prototype._handleManageCancelPressedForKeyUser=function(){this._fGetDataForKeyUser();this._cleanUpManageViewsForKeyUser();};S.prototype._handleSaveAsCancelPressedForKeyUser=function(){this._fGetDataForKeyUser();this._cleanUpSaveForKeyUser();};S.prototype._getSelectedContexts=function(){return this._oRolesComponentContainer.getComponentInstance().getSelectedContexts();};S.prototype._setSelectedContexts=function(i){this._oRolesComponentContainer.getComponentInstance().setSelectedContexts(i);};S.prototype._isInErrorContexts=function(){return this._oRolesComponentContainer.getComponentInstance().hasErrorsAndShowErrorMessage();};S.prototype._getContentAsync=function(){return Promise.resolve(this._fetchContentAsync());};S.prototype._handleSaveAsPressedForKeyUser=function(){if(!this._checkAndCreateContextInfoChanges("newDummyKey")){return;}try{this._getContentAsync().then(function(o){var j={"default":this.oDefault.getSelected(),executeOnSelection:this.oExecuteOnSelect.getSelected(),type:this._getPersoControllerType(),text:this.oInputName.getValue().trim(),contexts:this._mContextInfoChanges["newDummyKey"],content:o};this._fGetDataForKeyUser(j);this._removeShadowContent(this.getSelectionKey());this._cleanUpSaveForKeyUser();}.bind(this));}catch(i){L.error("'_handleSaveAsPressedForKeyUser' throws an exception:"+i.message);this._fGetDataForKeyUser();this._cleanUpSaveForKeyUser();}};return S;});
