/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./QuickViewBase","./NavContainer","./Page","./ScrollContainer","./QuickViewCardRenderer"],function(l,Q,N,P,S,a){"use strict";var b=Q.extend("sap.m.QuickViewCard",{metadata:{library:"sap.m",properties:{showVerticalScrollBar:{type:"boolean",group:"Behavior",defaultValue:true}},designtime:"sap/m/designtime/QuickViewCard.designtime"}});b.prototype.init=function(){var n={pages:[new P()],navigate:this._navigate.bind(this),afterNavigate:this._afterNavigate.bind(this)};this._oNavContainer=new N(n);};b.prototype.onBeforeRendering=function(){this._initPages();};b.prototype.onAfterRendering=function(){this._setLinkWidth();};b.prototype.exit=function(){if(this._oNavContainer){this._oNavContainer.destroy();}};b.prototype.onkeydown=function(e){this._processKeyboard(e);};b.prototype._createPage=function(q){var c=q._createPageContent();q._mPageContent=null;var C=new S(this.getId()+'-'+q.getPageId(),{horizontal:false,vertical:false});if(c.header){C.addContent(c.header);}C.addContent(c.form);C.addStyleClass('sapMQuickViewPage');return C;};b.prototype._setLinkWidth=function(){this.$().find(".sapMLnk").css("width","auto");};return b;});
