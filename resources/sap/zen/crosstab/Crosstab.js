/*!
 * (c) Copyright 2010-2019 SAP SE or an SAP affiliate company.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Control","sap/zen/crosstab/paging/PageManager","sap/zen/crosstab/DataArea","sap/zen/crosstab/ColumnHeaderArea","sap/zen/crosstab/RowHeaderArea","sap/zen/crosstab/DimensionHeaderArea","sap/zen/crosstab/EventHandler","sap/zen/crosstab/SelectionHandler","sap/zen/crosstab/rendering/RenderEngine","sap/zen/crosstab/utils/Utils","sap/zen/crosstab/PropertyBag","sap/zen/crosstab/CrosstabCellApi","sap/zen/crosstab/CrosstabTestProxy","sap/zen/crosstab/CellStyleHandler","sap/zen/crosstab/CrosstabContextMenu","sap/zen/crosstab/CrosstabHeaderInfo","sap/zen/crosstab/dragdrop/DragDropHandler","sap/zen/crosstab/rendering/RenderingConstants"],function(q,C,P,D,a,R,b,E,S,c,U,d,f,g,h,j,l,m,o){"use strict";q.sap.declare("sap.zen.crosstab.Crosstab");C.extend("sap.zen.crosstab.Crosstab",{metadata:{library:"sap.zen.crosstab",properties:{width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null}}}});sap.zen.crosstab.Crosstab.prototype.init=function(){"use strict";this.scrolled=false;this.ensureIndexOf();var s=this.getId();var e=s+"_dataArea";this.dataArea=new D(this);this.dataArea.setId(e);var i=s+"_colHeaderArea";this.columnHeaderArea=new a(this);this.columnHeaderArea.setId(i);var r=s+"_rowHeaderArea";this.rowHeaderArea=new R(this);this.rowHeaderArea.setId(r);var k=s+"_dimHeaderArea";this.dimensionHeaderArea=new b(this);this.dimensionHeaderArea.setId(k);this.oPropertyBag=new d(this);this.oRenderEngine=new c(this);this.oSelectionHandler=null;this.oEventHandler=new E(this);this.oUtils=new U(this);this.iCalculatedWidth=-1;this.iCalculatedHeight=-1;this.fPageRequestHandler=null;this.bOnAfterRendering=true;this.bIsVResize=false;this.bIsHResize=false;this.iHierarchyIndentWidth=0;this.iHierarchyIndentHeight=0;this.iExceptionSymbolWidth=0;this.iRenderMode=o.RENDERMODE_COMPACT;this.bRenderScrollbars=true;this.bHCutOff=false;this.bVCutOff=false;this.sOnSelectCommand=null;this.sTransferDataCommand=null;this.sCallValueHelpCommand=null;this.iTotalRowCnt=0;this.iTotalColCnt=0;this.oHScrollbar=null;this.oVScrollbar=null;this.oHorizontalHeaderScrollbar=null;this.iTimeoutCounter=0;this.iTimeoutCounter2=0;this.oColHeaderHierarchyLevels={};this.oRowHeaderHierarchyLevels={};this.oTestProxy=new g(this,this.oEventHandler,this.oRenderEngine);this.bAdjustFrameDivs=true;this.iSavedWidthForPrepareDom=0;this.iSavedHeightForPrepareDom=0;this.oCellApi=null;this.iNewLinesCnt=0;this.sNewLinesPos="";this.bPlanningCheckMode=false;this.sScrollNotifyCommand=null;this.oContextMenu=null;this.iValueHelpStatus=0;this.bHeaderHScrolling=false;this.bPreparedDom=false;this.bWasRendered=false;this.sUserHeaderWidthCommand=null;this.bIsUserHeaderResizeAllowed=false;this.bIsHeaderScrollingConfigured=false;this.bContainerIsRendered=false;this.bContainerRenderRequest=false;this.oContainer=null;this.oHeaderInfo=null;this.sSelectionMode="";this.sSelectionSpace="";this.bEnableHoverEffect=true;this.oRenderTimer=null;this.oRenderTimer2=null;this.bQueueHeaderWidthRequest=true;this.bScrollInvalidate=false;this.bCalledByScrolling=false;this.bRevertDragDrop=false;this.bDragAction=false;this.oDragDropHandler=null;this.oDragDropCommands=null;this.bIsBlocked=false;this.bHasData=false;this.sUpdateColWidthCommand=null;};sap.zen.crosstab.Crosstab.prototype.ensureIndexOf=function(){if(!Array.prototype.indexOf){Array.prototype.indexOf=function(s){"use strict";if(this==null){throw new TypeError();}var t=Object(this);var e=t.length>>>0;if(e===0){return-1;}var n=0;if(arguments.length>1){n=Number(arguments[1]);if(n!=n){n=0;}else if(n!=0&&n!=Infinity&&n!=-Infinity){n=(n>0||-1)*Math.floor(Math.abs(n));}}if(n>=e){return-1;}var k=n>=0?n:Math.max(e-Math.abs(n),0);for(;k<e;k++){if(k in t&&t[k]===s){return k;}}return-1;};}};sap.zen.crosstab.Crosstab.prototype.getTableDiv=function(){var t=null;if(this.iRenderMode===o.RENDERMODE_COMPACT){t=q(document.getElementById(this.getId()+"_altRenderModeTableDiv"));}else{t=q(document.getElementById(this.getId()));}return t;};sap.zen.crosstab.Crosstab.prototype.ensurePageManager=function(){if(!this.oPageManager){this.oPageManager=new P(this);}return this.oPageManager;};sap.zen.crosstab.Crosstab.prototype.getIntWidth=function(){var w=-1;var W=this.getWidth();if(W&&W!=="auto"){w=parseInt(W,10);}else{w=this.iCalculatedWidth;}return w;};sap.zen.crosstab.Crosstab.prototype.getContentWidth=function(){var w=this.getIntWidth();var t=this.getRenderEngine().getTableDivValues();w=w-t.borders.iLeftBorderWidth-t.borders.iRightBorderWidth;return w;};sap.zen.crosstab.Crosstab.prototype.getContentHeight=function(){var H=this.getIntHeight();var t=this.getRenderEngine().getTableDivValues();var T=this.oPropertyBag.getToolbarHeight();H=H-t.borders.iTopBorderWidth-t.borders.iBottomBorderWidth-T;return H;};sap.zen.crosstab.Crosstab.prototype.getIntHeight=function(){var H=-1;var s=this.getHeight();if(s&&s!=="auto"){H=parseInt(s,10);}else{H=this.iCalculatedHeight;}return H;};sap.zen.crosstab.Crosstab.prototype.resize=function(){var e=q.sap.byId(this.getId());var n=parseInt(e.outerWidth(),10);var N=parseInt(e.outerHeight(),10);this.isHResize=n!==this.getIntWidth();this.isVResize=N!==this.getIntHeight();if(this.isHResize||this.isVResize){this.ensurePageManager().resizeEvent();}};sap.zen.crosstab.Crosstab.prototype.determineRenderMode=function(e){var n=-1;if(e){if(e.alwaysfill){n=o.RENDERMODE_FILL;}else{n=o.RENDERMODE_COMPACT;}}if(n===-1){n=o.RENDERMODE_COMPACT;}if(n!==this.iRenderMode){this.oRenderEngine.reset();this.iRenderMode=n;}};sap.zen.crosstab.Crosstab.prototype.determineScrollMode=function(e){var n=e.pixelscrolling;if(n!==this.oPropertyBag.isPixelScrolling()){this.oRenderEngine.reset();this.oPropertyBag.setPixelScrolling(n);}};sap.zen.crosstab.Crosstab.prototype.applyControlProperties=function(e){this.bPlanningCheckMode=e.pvcheck!==null&&e.pvcheck!==undefined;var i=this.ensurePageManager().checkResponseConsistency(e);if(!i){this.reset(e);}if(!this.bPlanningCheckMode){if(e.removeselection===true){if(this.oSelectionHandler){this.oSelectionHandler.removeAllSelections();this.bOnAfterRendering=true;}}else{this.determineRenderMode(e);this.determineScrollMode(e);this.ensurePageManager().receiveData(e);}}else{this.handlePlanningCheckData(e);this.bOnAfterRendering=true;}this.bPlanningCheckMode=false;};sap.zen.crosstab.Crosstab.prototype.calculateOffset=function(e){var O=0;var A=e.getArea();if(A.isRowHeaderArea()){for(var i=0;i<e.getCol();i++){var t=A.getCell(e.getRow(),i);if(!t){O++;}else if(!t.isEntryEnabled()){O++;}}}return O;};sap.zen.crosstab.Crosstab.prototype.calculateRowHeaderColOffsetsForRow=function(t){var e={};var T=0;var i=null;var k=0;var M=this.rowHeaderArea.getColCnt();for(T=0;T<M;T++){i=this.getTableCell(t,T);if(i!==null&&i.isEntryEnabled()){e[k]=T;k++;}}return e;};sap.zen.crosstab.Crosstab.prototype.handlePlanningCheckData=function(e){var i=0;var k=e.pvcheck;var n=k.length;var p={};var r=null;var t=0;for(i=0;i<n;i++){var s=k[i];r=p[s.tabrow];if(!r){r=this.calculateRowHeaderColOffsetsForRow(s.tabrow);p[s.tabrow]=r;}t=r[s.tabcol]||s.tabcol;var u=this.getTableCell(s.tabrow,t);if(u){u.setText(s.text);if(s.valid===false){u.addStyle(o.STYLE_INVALID_VALUE);}else{u.removeStyle(o.STYLE_INVALID_VALUE);}if(s.newvalue===true){u.addStyle(o.STYLE_NEW_VALUE);}this.oRenderEngine.updateRenderingOfInputCellAfterCheck(u);}}};sap.zen.crosstab.Crosstab.prototype.determineKeepUserColWidths=function(e){if(e.dataproviderchanged){return false;}if(e.resultsetchanged&&e.rootcause===undefined){return false;}return false;};sap.zen.crosstab.Crosstab.prototype.determineKeepCalculatedColWidths=function(e){if(e.rootcause==="sorting"){return true;}var v=(e.v_pos||1)-1;var s=e.sentdatarows||0;var i=e.clientvpos||0;var t=e.totaldatarows||0;var H=(e.h_pos||1)-1;var k=e.sentdatacols||0;var n=e.clienthpos||0;var T=e.totaldatacols||0;var I=e.ispaging||false;var K=false;var p=false;if(this.bWasRendered===true&&!I){if((i>0)&&(i<=t)&&(i>(v+s))){p=true;}if((n>0)&&(n<=T)&&(n>(H+k))){K=true;}if(p===true||K===true){return true;}}return false;};sap.zen.crosstab.Crosstab.prototype.reset=function(e){var k=this.determineKeepUserColWidths(e);var K=this.determineKeepCalculatedColWidths(e);this.getDimensionHeaderArea().clear(k,K);this.getColumnHeaderArea().clear(k,K);this.getRowHeaderArea().clear(k,K);this.getDataArea().clear(k,K);this.oRenderEngine.reset(K);this.oPageManager.reset();};sap.zen.crosstab.Crosstab.prototype.updateControlProperties=function(e){if(e&&e.changed){this.reset(e);}this.applyControlProperties(e);};sap.zen.crosstab.Crosstab.prototype.expectOnAfterRenderingCall=function(){this.bOnAfterRendering=false;};sap.zen.crosstab.Crosstab.prototype.setContainerIsRendered=function(){this.bContainerIsRendered=true;};sap.zen.crosstab.Crosstab.prototype.setContainerRenderRequest=function(){this.bContainerRenderRequest=true;};sap.zen.crosstab.Crosstab.prototype.cleanupContainer=function(){if(this.oContainer){if(this.oContainer.oNotificationRegistry){delete this.oContainer.oNotificationRegistry[this.getId()];}if(U.getSizeOf(this.oContainer.oNotificationRegistry)===0){if(this.oContainer.fOriginalRender){this.oContainer.getRenderer().render=this.oContainer.fOriginalRender;delete this.oContainer.fOriginalRender;}this.oContainer.removeEventDelegate(this.onAfterRenderingDelegate);}}this.oContainer=null;};sap.zen.crosstab.Crosstab.prototype.onAfterRenderingDelegate=null;sap.zen.crosstab.Crosstab.prototype.setupContainer=function(e){var t=this;var r=null;if(e&&e.getRenderer&&U.isDispatcherAvailable()===true){if(!e.fOriginalRender){r=e.getRenderer();e.fOriginalRender=r.render;r.render=function(i,k){e.fOriginalRender.call(e.getRenderer(),i,k);if(e.oNotificationRegistry){q.each(e.oNotificationRegistry,function(I,H){var k=sap.zen.Dispatcher.instance.getControlForId(I);if(k){H.fSetRenderRequest.call(k);}});}};this.bContainerRenderRequest=true;}if(e.onAfterRendering){e.removeEventDelegate(t.onAfterRenderingDelegate);t.onAfterRenderingDelegate={onAfterRendering:function(){if(e.oNotificationRegistry){q.each(e.oNotificationRegistry,function(i,H){var k=sap.zen.Dispatcher.instance.getControlForId(i);if(k){H.fSetIsRendered.call(k);}});}}};e.addEventDelegate(t.onAfterRenderingDelegate);}else{this.bContainerIsRendered=true;}if(!e.oNotificationRegistry){e.oNotificationRegistry={};}e.oNotificationRegistry[this.getId()]={"fSetRenderRequest":this.setContainerRenderRequest,"fSetIsRendered":this.setContainerIsRendered};this.oContainer=e;}else{this.oContainer=null;}};sap.zen.crosstab.Crosstab.prototype.getContainer=function(){var e=null;if(this.oContainer){e=this.oContainer;}else{e=this.getParent().getParent();}return e;};sap.zen.crosstab.Crosstab.prototype.isAutoSize=function(){var w=this.getWidth();var H=this.getHeight();if(!w){return true;}else{if(w==="auto"){return true;}}if(!H){return true;}else{if(H==="auto"){return true;}}return false;};sap.zen.crosstab.Crosstab.prototype.prepareContainer=function(){var e=null;this.bContainerRenderRequest=false;if(!this.isAutoSize()){this.cleanupContainer();return;}if(!sap.zen.Dispatcher){this.cleanupContainer();return;}e=this.getParent().getParent();if(!e){this.cleanupContainer();return;}if(this.oContainer&&(e!==this.oContainer)){this.cleanupContainer();}this.setupContainer(e);};sap.zen.crosstab.Crosstab.prototype.onAfterRendering=function(){if(!this.bIsDeferredRendering&&U.isDispatcherAvailable()){this.bIsDeferredRendering=sap.zen.Dispatcher.instance.isDeferredRendering();}if(!this.bContainerIsRendered&&this.bContainerRenderRequest===true&&this.oContainer){this.iTimeoutCounter++;if(this.iTimeoutCounter>1000){return;}if(this.oRenderTimer){clearTimeout(this.oRenderTimer);this.oRenderTimer=null;}this.oRenderTimer=setTimeout((function(t){return function(){t.onAfterRendering();};})(this),10);return;}if(this.bOnAfterRendering||this.bIsDeferredRendering){this.doRendering();}this.bContainerRenderRequest=false;this.bContainerIsRendered=false;this.bIsDeferredRendering=false;};sap.zen.crosstab.Crosstab.prototype.prepareExistingDom=function(){if(!this.bPlanningCheckMode){var e=q(document.getElementById(this.getDimensionHeaderArea().getId())).find("tbody");e.empty();e=q(document.getElementById(this.getRowHeaderArea().getId())).find("tbody");e.empty();e=q(document.getElementById(this.getColumnHeaderArea().getId())).find("tbody");e.empty();e=q(document.getElementById(this.getDataArea().getId())).find("tbody");e.empty();this.bRenderScrollbars=false;this.determineNeedToAdjustOuterDivs();this.bPreparedDom=true;}};sap.zen.crosstab.Crosstab.prototype.determineNeedToAdjustOuterDivs=function(){var w=this.getIntWidth();var H=this.getIntHeight();this.bAdjustFrameDivs=true;if(w===this.iSavedWidthForPrepareDom&&H===this.iSavedHeightForPrepareDom){this.bAdjustFrameDivs=false;}else{this.getRenderEngine().removeOuterDivBorders();}if(!this.getDataArea().hasLoadingPages()){this.iSavedWidthForPrepareDom=w;this.iSavedHeightForPrepareDom=H;}};sap.zen.crosstab.Crosstab.prototype.determineHierarchyIndents=function(){var e=q(document.getElementById(this.getId()+"_measureDiv"));if(e&&e.length>0){e.css("visibility","visible");this.iHierarchyIndentWidth=parseInt(e.outerWidth(),10);this.iHierarchyIndentHeight=parseInt(e.outerHeight(),10);e.css("visibility","none");}};sap.zen.crosstab.Crosstab.prototype.determineAlertSymbolDimensions=function(){var e=q(document.getElementById(this.getId()+"_exceptionMeasureDiv"));if(e&&e.length>0){e.css("visibility","visible");this.iExceptionSymbolWidth=parseInt(e.outerWidth(),10);e.css("visibility","none");}};sap.zen.crosstab.Crosstab.prototype.isRenderingPossible=function(){if(U.isDispatcherAvailable()===true&&sap.zen.Dispatcher.instance.suppressRendering()){if(!sap.zen.Dispatcher.instance.isSingleDelta(this.getId())){sap.zen.Dispatcher.instance.registerForDeferredRendering(this);return false;}}var e=[];e.push(q(document.getElementById(this.getId())));e.push(q(document.getElementById(this.getId()+"_upperSection")));e.push(q(document.getElementById(this.getId()+"_lowerSection")));e.push(q(document.getElementById(this.getId()+"_dimHeaderArea")));e.push(q(document.getElementById(this.getId()+"_colHeaderArea")));e.push(q(document.getElementById(this.getId()+"_dataArea")));for(var i=0;i<e.length;i++){if(e[i].length!==1){this.bOnAfterRendering=true;return false;}}return true;};sap.zen.crosstab.Crosstab.prototype.determineCrosstabSize=function(){var e=true;var J=null;if(!this.getWidth()||!this.getHeight()){e=false;}else{J=q.sap.byId(this.getId()).parent();var w=J.outerWidth();if(w&&w>10){this.iCalculatedWidth=w;}var H=J.outerHeight();if(H&&H>10){this.iCalculatedHeight=H;}}return e;};sap.zen.crosstab.Crosstab.prototype.setInvalidateCalledByScrolling=function(){this.bCalledByScrolling=true;};sap.zen.crosstab.Crosstab.prototype.doRendering=function(){this.iTimeoutCounter=0;if(this.oRenderTimer){clearTimeout(this.oRenderTimer);this.oRenderTimer=null;}if(this.bPlanningCheckMode===true){return;}if(!this.isRenderingPossible()){return;}if(!this.determineCrosstabSize()){return;}if(this.iCalculatedWidth===-1||this.iCalculatedHeight===-1){this.iTimeoutCounter2++;if(this.iTimeoutCounter2>1000){return;}if(this.oRenderTimer2){clearTimeout(this.oRenderTimer2);this.oRenderTimer2=null;}this.oRenderTimer2=setTimeout((function(i){return function(){i.doRendering();};})(this),10);return;}this.iTimeoutCounter2=0;if(this.oRenderTimer2){clearTimeout(this.oRenderTimer2);this.oRenderTimer2=null;}this.determineHierarchyIndents();if(this.getPropertyBag().isDisplayExceptions()){this.determineAlertSymbolDimensions();}var r=this.getRenderEngine();r.setAdjustFrameDivs(this.bAdjustFrameDivs);if(r.hasCrosstabSizeChanged()){this.ensurePageManager().resizeEvent();}if(this.oPropertyBag.hasToolbar()){var t=q(document.getElementById(this.getId()+"_toolbar"));var T=t.outerHeight();this.oPropertyBag.setToolbarHeight(T);}r.beginRendering();r.renderCrosstabAreas();r.calculateRenderSizeDivSize();if(!this.oPropertyBag.isPixelScrolling()){r.appendColumnsAfterResize();r.appendRowsAfterResize();}if(this.bRenderScrollbars){r.renderScrollbars();}r.adjustRenderSizeDivSize();if(this.bRenderScrollbars){r.setScrollbarSteps();}r.adjustScrollDivSizes();if(!this.bRenderScrollbars){r.checkScrollbarSize();}r.adjustScrollPositions(this.bRenderScrollbars);if(!this.oPropertyBag.isRtl()){if(!this.oPropertyBag.isPixelScrolling()){r.moveScrollDivs();}}else{if(this.oPropertyBag.isPixelScrolling()&&q.browser.webkit){r.moveScrollDivs();}}if(this.oHorizontalHeaderScrollbar&&!this.bPreparedDom){r.updateHeaderScrollbarSizes();}r.updateHeaderResizeDiv();if(this.getPropertyBag().isDragDropEnabled()===true&&U.isDispatcherAvailable()===true){if(!this.oDragDropHandler){this.oDragDropHandler=new m(this,this.oDragDropCommands);}}r.finishRendering();this.oEventHandler.attachEvents();this.bOnAfterRendering=true;this.bRenderScrollbars=true;this.bAdjustFrameDivs=true;this.bPreparedDom=false;this.bWasRendered=true;var e=this.bCalledByScrolling;this.bCalledByScrolling=false;var s=this.bScrollInvalidate;this.bScrollInvalidate=false;if(!e&&!this.hasLoadingPages()&&s===true){this.invalidate();}if(!this.hasLoadingPages()){this.getPropertyBag().setBookmarkProcessing(false);}};sap.zen.crosstab.Crosstab.prototype.setScrollInvalidate=function(s){this.bScrollInvalidate=s;};sap.zen.crosstab.Crosstab.prototype.isScrollInvalidate=function(){return this.bScrollInvalidate;};sap.zen.crosstab.Crosstab.prototype.scrollHorizontal=function(i){this.oRenderEngine.scrollHorizontal(i);};sap.zen.crosstab.Crosstab.prototype.scrollVertical=function(r){this.oRenderEngine.scrollVertical(r);};sap.zen.crosstab.Crosstab.prototype.scrollHeaderHorizontal=function(p){this.oRenderEngine.scrollHeaderHorizontal(p);};sap.zen.crosstab.Crosstab.prototype.getVScrollPos=function(){var v=-1;if(this.oVScrollbar){v=this.oVScrollbar.getScrollPosition();}return v;};sap.zen.crosstab.Crosstab.prototype.getHScrollPos=function(){var H=-1;if(this.oHScrollbar){H=this.oHScrollbar.getScrollPosition();}return H;};sap.zen.crosstab.Crosstab.prototype.renderResizeOutline=function(){this.oRenderEngine.renderResizeOutline();};sap.zen.crosstab.Crosstab.prototype.removeResizeOutline=function(){this.oRenderEngine.removeResizeOutline();};sap.zen.crosstab.Crosstab.prototype.registerPageRequestHandler=function(H){this.fPageRequestHandler=H;};sap.zen.crosstab.Crosstab.prototype.unregisterPageRequestHandler=function(){this.fPageRequestHandler=null;};sap.zen.crosstab.Crosstab.prototype.getPageRequestHandler=function(){return this.fPageRequestHandler;};sap.zen.crosstab.Crosstab.prototype.getReceivedPages=function(){return this.ensurePageManager().getReceivedPages();};sap.zen.crosstab.Crosstab.prototype.getHierarchyIndentWidth=function(){return this.iHierarchyIndentWidth;};sap.zen.crosstab.Crosstab.prototype.getExceptionSymbolWidth=function(){return this.iExceptionSymbolWidth;};sap.zen.crosstab.Crosstab.prototype.getHierarchyIndentHeight=function(){return this.iHierarchyIndentHeight;};sap.zen.crosstab.Crosstab.prototype.hideLoadingIndicator=function(){this.oRenderEngine.hideLoadingIndicator();};sap.zen.crosstab.Crosstab.prototype.showLoadingIndicator=function(){this.oRenderEngine.showLoadingIndicator();};sap.zen.crosstab.Crosstab.prototype.setHCutOff=function(H){this.bHCutOff=H;};sap.zen.crosstab.Crosstab.prototype.isHCutOff=function(){return this.bHCutOff;};sap.zen.crosstab.Crosstab.prototype.setVCutOff=function(v){this.bVCutOff=v;};sap.zen.crosstab.Crosstab.prototype.isVCutOff=function(){return this.bVCutOff;};sap.zen.crosstab.Crosstab.prototype.getTotalRows=function(){return this.iTotalRowCnt;};sap.zen.crosstab.Crosstab.prototype.getTotalCols=function(){return this.iTotalColCnt;};sap.zen.crosstab.Crosstab.prototype.setTotalCols=function(i){this.iTotalColCnt=i;};sap.zen.crosstab.Crosstab.prototype.setTotalRows=function(r){this.iTotalRowCnt=r;};sap.zen.crosstab.Crosstab.prototype.setHScrollbar=function(H){this.oHScrollbar=H;};sap.zen.crosstab.Crosstab.prototype.setVScrollbar=function(v){this.oVScrollbar=v;};sap.zen.crosstab.Crosstab.prototype.getVScrollbar=function(){return this.oVScrollbar;};sap.zen.crosstab.Crosstab.prototype.getHScrollbar=function(){return this.oHScrollbar;};sap.zen.crosstab.Crosstab.prototype.getTestProxy=function(){return this.oTestProxy;};sap.zen.crosstab.Crosstab.prototype.setOnSelectCommand=function(O){this.sOnSelectCommand=O;};sap.zen.crosstab.Crosstab.prototype.getOnSelectCommand=function(){return this.sOnSelectCommand;};sap.zen.crosstab.Crosstab.prototype.setTransferDataCommand=function(t){this.sTransferDataCommand=t;};sap.zen.crosstab.Crosstab.prototype.getTransferDataCommand=function(){return this.sTransferDataCommand;};sap.zen.crosstab.Crosstab.prototype.setCallValueHelpCommand=function(s){this.sCallValueHelpCommand=s;};sap.zen.crosstab.Crosstab.prototype.getCallValueHelpCommand=function(){return this.sCallValueHelpCommand;};sap.zen.crosstab.Crosstab.prototype.getRenderMode=function(){return this.iRenderMode;};sap.zen.crosstab.Crosstab.prototype.getUtils=function(){return this.oUtils;};sap.zen.crosstab.Crosstab.prototype.getDataArea=function(){return this.dataArea;};sap.zen.crosstab.Crosstab.prototype.getDimensionHeaderArea=function(){return this.dimensionHeaderArea;};sap.zen.crosstab.Crosstab.prototype.getColumnHeaderArea=function(){return this.columnHeaderArea;};sap.zen.crosstab.Crosstab.prototype.getRowHeaderArea=function(){return this.rowHeaderArea;};sap.zen.crosstab.Crosstab.prototype.getRenderEngine=function(){return this.oRenderEngine;};sap.zen.crosstab.Crosstab.prototype.hResize=function(){return this.isHResize;};sap.zen.crosstab.Crosstab.prototype.vResize=function(){return this.isVResize;};sap.zen.crosstab.Crosstab.prototype.getPageManager=function(){return this.oPageManager;};sap.zen.crosstab.Crosstab.prototype.isRenderScrollbars=function(){return this.bRenderScrollbars;};sap.zen.crosstab.Crosstab.prototype.getPropertyBag=function(){return this.oPropertyBag;};sap.zen.crosstab.Crosstab.prototype.hasToolbar=function(){return this.bHasToolbar;};sap.zen.crosstab.Crosstab.prototype.setColHeaderHierarchyLevels=function(L){this.oColHeaderHierarchyLevels=L;};sap.zen.crosstab.Crosstab.prototype.getColHeaderHierarchyLevels=function(){return this.oColHeaderHierarchyLevels;};sap.zen.crosstab.Crosstab.prototype.setRowHeaderHierarchyLevels=function(L){this.oRowHeaderHierarchyLevels=L;};sap.zen.crosstab.Crosstab.prototype.getRowHeaderHierarchyLevels=function(){return this.oRowHeaderHierarchyLevels;};sap.zen.crosstab.Crosstab.prototype.isIE8Mode=function(){return this.oRenderEngine.isIE8Mode();};sap.zen.crosstab.Crosstab.prototype.hasDimensionHeaderArea=function(){var r=false;if(this.dimensionHeaderArea!==undefined){r=(this.dimensionHeaderArea.getColCnt()>0&&this.dimensionHeaderArea.getRowCnt()>0);}return r;};sap.zen.crosstab.Crosstab.prototype.hasRowHeaderArea=function(){var r=false;if(this.rowHeaderArea!==undefined){r=(this.rowHeaderArea.getColCnt()>0&&this.rowHeaderArea.getRowCnt()>0);}return r;};sap.zen.crosstab.Crosstab.prototype.hasColHeaderArea=function(){var r=false;if(this.columnHeaderArea!==undefined){r=(this.columnHeaderArea.getColCnt()>0&&this.columnHeaderArea.getRowCnt()>0);}return r;};sap.zen.crosstab.Crosstab.prototype.hasDataArea=function(){var r=false;if(this.dataArea!==undefined){r=(this.dataArea.getColCnt()>0&&this.dataArea.getRowCnt()>0);}return r;};sap.zen.crosstab.Crosstab.prototype.restoreFocusOnCell=function(){this.oEventHandler.restoreFocusOnCell();};sap.zen.crosstab.Crosstab.prototype.getTableCell=function(t,T){return this.oCellApi.getTableCell(t,T);};sap.zen.crosstab.Crosstab.prototype.getTableCellWithSpans=function(r,i){return this.oCellApi.getTableCellWithSpans(r,i);};sap.zen.crosstab.Crosstab.prototype.getTableCellWithColSpan=function(r,i){return this.oCellApi.getTableCellWithColSpan(r,i);};sap.zen.crosstab.Crosstab.prototype.getTableCellWithRowSpan=function(r,i){return this.oCellApi.getTableCellWithRowSpan(r,i);};sap.zen.crosstab.Crosstab.prototype.getTableRowCnt=function(){return this.oCellApi.getTableRowCnt();};sap.zen.crosstab.Crosstab.prototype.getTableColCnt=function(){return this.oCellApi.getTableColCnt();};sap.zen.crosstab.Crosstab.prototype.getTableFixedRowHeaderColCnt=function(){return this.oCellApi.getTableFixedRowHeaderColCnt();};sap.zen.crosstab.Crosstab.prototype.getTableFixedColHeaderRowCnt=function(){return this.oCellApi.getTableFixedColHeaderRowCnt();};sap.zen.crosstab.Crosstab.prototype.getTableMaxScrollColCnt=function(){return this.oCellApi.getTableMaxScrollColCnt();};sap.zen.crosstab.Crosstab.prototype.getTableMaxScrollRowCnt=function(){return this.oCellApi.getTableMaxScrollRowCnt();};sap.zen.crosstab.Crosstab.prototype.getTableMaxDimHeaderRow=function(){return this.oCellApi.getTableMaxDimHeaderRow();};sap.zen.crosstab.Crosstab.prototype.getTableMaxDimHeaderCol=function(){return this.oCellApi.getTableMaxDimHeaderCol();};sap.zen.crosstab.Crosstab.prototype.setCellApi=function(p){this.oCellApi=p;};sap.zen.crosstab.Crosstab.prototype.hasLoadingPages=function(){return this.dataArea.hasLoadingPages()||this.rowHeaderArea.hasLoadingPages()||this.columnHeaderArea.hasLoadingPages();};sap.zen.crosstab.Crosstab.prototype.getRenderRowCnt=function(){if(this.dataArea){return this.dataArea.getRenderRowCnt();}else if(this.rowHeaderArea){return this.rowHeaderArea.getRenderRowCnt();}};sap.zen.crosstab.Crosstab.prototype.getRenderStartRow=function(){if(this.dataArea){return this.dataArea.getRenderStartRow();}else if(this.rowHeaderArea){return this.rowHeaderArea.getRenderStartRow();}return null;};sap.zen.crosstab.Crosstab.prototype.getRenderColCnt=function(){if(this.dataArea){return this.dataArea.getRenderColCnt();}else if(this.columnHeaderArea){return this.columnHeaderArea.getRenderColCnt();}return null;};sap.zen.crosstab.Crosstab.prototype.getRenderStartCol=function(){if(this.dataArea){return this.dataArea.getRenderStartCol();}else if(this.columnHeaderArea){return this.columnHeaderArea.getRenderStartCol();}return null;};sap.zen.crosstab.Crosstab.prototype.setNewLinesCnt=function(n){this.iNewLinesCnt=n;};sap.zen.crosstab.Crosstab.prototype.getNewLinesCnt=function(){return this.iNewLinesCnt;};sap.zen.crosstab.Crosstab.prototype.setNewLinesPos=function(n){this.sNewLinesPos=n;};sap.zen.crosstab.Crosstab.prototype.getNewLinesPos=function(){return this.sNewLinesPos;};sap.zen.crosstab.Crosstab.prototype.isNewLinesTop=function(){if(!this.sNewLinesPos){return false;}return(this.sNewLinesPos==="TOP");};sap.zen.crosstab.Crosstab.prototype.isNewLinesBottom=function(){if(!this.sNewLinesPos){return false;}return(this.sNewLinesPos==="BOTTOM");};sap.zen.crosstab.Crosstab.prototype.setScrollNotifyCommand=function(s){this.sScrollNotifyCommand=s;};sap.zen.crosstab.Crosstab.prototype.getScrollNotifyCommand=function(){return this.sScrollNotifyCommand;};sap.zen.crosstab.Crosstab.prototype.getContextMenuAction=function(s,e){var A=null;if(this.oContextMenu){A=this.oContextMenu.getContextMenuAction(s,e);}return A;};sap.zen.crosstab.Crosstab.prototype.createContextMenu=function(){if(!this.oContextMenu){this.oContextMenu=new j(this);}};sap.zen.crosstab.Crosstab.prototype.setValueHelpStatus=function(v){this.iValueHelpStatus=v;};sap.zen.crosstab.Crosstab.prototype.getValueHelpStatus=function(){return this.iValueHelpStatus;};sap.zen.crosstab.Crosstab.prototype.getHorizontalHeaderScrollbar=function(){return this.oHorizontalHeaderScrollbar;};sap.zen.crosstab.Crosstab.prototype.setHorizontalHeaderScrollbar=function(H){this.oHorizontalHeaderScrollbar=H;};sap.zen.crosstab.Crosstab.prototype.setHeaderHScrolling=function(H){this.bHeaderHScrolling=H;if(!this.bHeaderHScrolling){this.oHorizontalHeaderScrollbar=null;}};sap.zen.crosstab.Crosstab.prototype.isHeaderHScrolling=function(){return this.bHeaderHScrolling;};sap.zen.crosstab.Crosstab.prototype.setUserHeaderWidthCommand=function(u){this.sUserHeaderWidthCommand=u;};sap.zen.crosstab.Crosstab.prototype.getUserHeaderWidthCommand=function(){return this.sUserHeaderWidthCommand;};sap.zen.crosstab.Crosstab.prototype.isUserHeaderResizeAllowed=function(){return this.bIsUserHeaderResizeAllowed;};sap.zen.crosstab.Crosstab.prototype.setUserHeaderResizeAllowed=function(i){this.bIsUserHeaderResizeAllowed=i;};sap.zen.crosstab.Crosstab.prototype.setHeaderScrollingConfigured=function(i){this.bIsHeaderScrollingConfigured=i;};sap.zen.crosstab.Crosstab.prototype.isHeaderScrollingConfigured=function(){return this.bIsHeaderScrollingConfigured;};sap.zen.crosstab.Crosstab.prototype.isPreparedDom=function(){return this.bPreparedDom;};sap.zen.crosstab.Crosstab.prototype.getSelectionHandler=function(){if(!this.oSelectionHandler&&this.sSelectionMode!==undefined&&this.sSelectionMode!==""){this.oSelectionHandler=new S(this);}return this.oSelectionHandler;};sap.zen.crosstab.Crosstab.prototype.initHeaderInfo=function(H){this.oHeaderInfo=new l(this,H);};sap.zen.crosstab.Crosstab.prototype.getHeaderInfo=function(){return this.oHeaderInfo;};sap.zen.crosstab.Crosstab.prototype.setSelectionProperties=function(s,e,i,k){this.sSelectionMode=s;this.sSelectionSpace=e;if(!i){this.bEnableHoverEffect=true;}else{this.bEnableHoverEffect=false;}this.getPropertyBag().setFireOnSelectedOnlyOnce(k);};sap.zen.crosstab.Crosstab.prototype.getSelectionMode=function(){return this.sSelectionMode;};sap.zen.crosstab.Crosstab.prototype.getSelectionSpace=function(){return this.sSelectionSpace;};sap.zen.crosstab.Crosstab.prototype.isHoveringEnabled=function(){return this.bEnableHoverEffect;};sap.zen.crosstab.Crosstab.prototype.isPlanningMode=function(){return(this.getTransferDataCommand()&&this.getTransferDataCommand()!=="");};sap.zen.crosstab.Crosstab.prototype.isSelectable=function(){return(this.oSelectionHandler&&this.sSelectionMode!==undefined&&this.sSelectionMode!=="");};sap.zen.crosstab.Crosstab.prototype.isQueueHeaderWidthRequest=function(){return this.bQueueHeaderWidthRequest;};sap.zen.crosstab.Crosstab.prototype.setQueueHeaderWidthRequest=function(Q){this.bQueueHeaderWidthRequest=Q;};sap.zen.crosstab.Crosstab.prototype.postPlanningValue=function(){return this.oEventHandler.postPlanningValue();};sap.zen.crosstab.Crosstab.prototype.setDragAction=function(e){this.bDragAction=e;if(this.oSelectionHandler){this.oSelectionHandler.blockSelectionHovering(e);}};sap.zen.crosstab.Crosstab.prototype.isDragAction=function(){return this.bDragAction;};sap.zen.crosstab.Crosstab.prototype.onUnhandledDrop=function(e,u,p){this.oDragDropHandler.onUnhandledDrop(e,u,p);};sap.zen.crosstab.Crosstab.prototype.onEscKeyPressed=function(){this.oDragDropHandler.onEscKeyPressed();};sap.zen.crosstab.Crosstab.prototype.setDragDropCommands=function(e){this.oDragDropCommands=e;};sap.zen.crosstab.Crosstab.prototype.getDragDropHandler=function(){return this.oDragDropHandler;};sap.zen.crosstab.Crosstab.prototype.getRenderSizeDiv=function(){return q(document.getElementById(this.getId()+"_renderSizeDiv"));};sap.zen.crosstab.Crosstab.prototype.getRowHeaderAreaDiv=function(){return q(document.getElementById(this.getId()+"_lowerLeft_scrollDiv"));};sap.zen.crosstab.Crosstab.prototype.getColHeaderAreaDiv=function(){return q(document.getElementById(this.getId()+"_upperRight_scrollDiv"));};sap.zen.crosstab.Crosstab.prototype.getDimHeaderAreaDiv=function(){return q(document.getElementById(this.getId()+"_upperLeft_scrollDiv"));};sap.zen.crosstab.Crosstab.prototype.isVScrolling=function(){var i=false;var v=this.oRenderEngine.getScrollbarVisibility();if(v){i=v.bHasVScrollbar;}return i;};sap.zen.crosstab.Crosstab.prototype.isHScrolling=function(){var i=false;var v=this.oRenderEngine.getScrollbarVisibility();if(v){i=v.bHasHScrollbar;}return i;};sap.zen.crosstab.Crosstab.prototype.getGlassPane=function(){return q(document.getElementById(this.getId()+"_glassPane"));};sap.zen.crosstab.Crosstab.prototype.block=function(){var J;this.bIsBlocked=true;J=this.getGlassPane();J.css("visibility","visible");};sap.zen.crosstab.Crosstab.prototype.unblock=function(){var J;if(!this.hasLoadingPages()){J=this.getGlassPane();J.css("visibility","hidden");this.bIsBlocked=false;}};sap.zen.crosstab.Crosstab.prototype.isBlocked=function(){return this.bIsBlocked;};sap.zen.crosstab.Crosstab.prototype.setHasData=function(H){this.bHasData=H;};sap.zen.crosstab.Crosstab.prototype.hasData=function(){return this.bHasData;};sap.zen.crosstab.Crosstab.prototype.enableClick=function(){this.oEventHandler.enableClick();};sap.zen.crosstab.Crosstab.prototype.getColResizer=function(){return this.oEventHandler.getColResizer();};sap.zen.crosstab.Crosstab.prototype.setUpdateColWidthCommand=function(s){this.sUpdateColWidthCommand=s;};sap.zen.crosstab.Crosstab.prototype.getUpdateColWidthCommand=function(){return this.sUpdateColWidthCommand;};sap.zen.crosstab.Crosstab.prototype.executeScrollSequence=function(s){var M=s.length-1;var i;var t=this;function e(){var k;var n;var p;var T;if(i<=M){k=s[i];n=k[0];p=k[1];if(k.length>3){T=k[3];}else{T=1000;}setTimeout(function(){if(n==="H"){t.scrollHorizontal(p);}else if(n==="V"){t.scrollVertical(p);}i++;e();},T);}}if(M>=0){i=0;e();}};return sap.zen.crosstab.Crosstab;});
