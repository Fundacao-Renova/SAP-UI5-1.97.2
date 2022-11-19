/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Core","sap/m/NavContainer","sap/m/Page","sap/m/List","sap/m/StandardListItem","../control/AssociateContainer"],function(C,a,N,P,L,S,A){"use strict";var b=C.extend("sap.gantt.simple.LegendContainer",{metadata:{library:"sap.gantt",properties:{width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:"200px"},height:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:"200px"},enableFlatLegends:{type:"boolean",defaultValue:false}},defaultAggregation:"legends",aggregations:{legends:{type:"sap.ui.core.Control",multiple:true,visibility:"public",singularName:"legend"}}}});b.prototype.init=function(){this.initNavContainer();this._sCurrentPageTitle=null;this.oRb=a.getLibraryResourceBundle("sap.gantt");};b.prototype.initNavContainer=function(){this._oNavContainer=null;this._sCurrentPageTitle=null;this._oNavContainer=new N({autoFocus:false,afterNavigate:function(e){this._sCurrentPageTitle=e.getParameter("to").getTitle();}.bind(this)});};b.prototype.onBeforeRendering=function(e){this.initNavContainer();this._updateNavContainerSize();this._addInitialPageIfNecessary();this._addLegendsToNavContainer();};b.prototype._updateNavContainerSize=function(){this._oNavContainer.setWidth(this.getWidth());this._oNavContainer.setHeight(this.getHeight());};b.prototype._shouldRenderFlatLegendList=function(){var i=true;this.getLegends().forEach(function(l){i=i&&l.isA("sap.gantt.simple.ListLegend");});return i&&this.getEnableFlatLegends();};b.prototype._isSingleVisibleList=function(){var V=0;this.getLegends().forEach(function(l){if(l.getVisible()){V++;}});return V<=1;};b.prototype._addLegendsToNavContainer=function(){if(!this._shouldRenderFlatLegendList()||this.getLegends().length===1||this._isSingleVisibleList()){this.getLegends().forEach(function(o,_,c){if(o.getVisible()){var p=new P({title:o.getTitle(),backgroundDesign:sap.m.PageBackgroundDesign.Solid,enableScrolling:true,showNavButton:c.length>1&&!this._isSingleVisibleList(),content:new A({content:o}),navButtonPress:function(e){this.getParent().backToTop();}});this._oNavContainer.addPage(p);}}.bind(this));}else{var p=new P({title:this.oRb.getText("LEGEND_TITLE"),backgroundDesign:sap.m.PageBackgroundDesign.Solid,enableScrolling:true});var l=this.getLegends();l.forEach(function(c){p.addContent(new A({content:c}));});this._oNavContainer.addPage(p);}};b.prototype._addInitialPageIfNecessary=function(){var l=this.getLegends();if(l.length>1&&!this._shouldRenderFlatLegendList()&&!this._isSingleVisibleList()){var n=l.map(function(o){return new S({title:o.getTitle(),type:sap.m.ListType.Navigation,press:this._onInitialPageItemPress.bind(this)});}.bind(this));var i=new P({title:this.oRb.getText("LEGEND_TITLE"),content:[new L({items:n})]});this._oNavContainer.addPage(i);this._oNavContainer.setInitialPage(i);}};b.prototype._onInitialPageItemPress=function(e){var p=e.getSource().getTitle();this._navToByPageTitle(p);};b.prototype._navToByPageTitle=function(p){if(!p){return;}this._oNavContainer.setAutoFocus(true);var c=this._oNavContainer.getPages();for(var i=1;i<c.length;i++){if(p==c[i].getTitle()){this._oNavContainer.to(c[i]);break;}}};return b;},true);