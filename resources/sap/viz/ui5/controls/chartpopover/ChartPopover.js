/*!
 * SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/thirdparty/jquery",'./ContentPanel','./HeaderBar','./SubActionItemsPage','sap/ui/core/Control','sap/viz/ui5/format/ChartFormatter','../common/utils/FormatDataUtil'],function(q,C,H,S,a,b,F){"use strict";var c=a.extend('sap.viz.ui5.controls.chartpopover.ChartPopover',{metadata:{properties:{'customDataControl':{type:'any'},'actionItems':{type:'object[]'},'formatString':{type:'any'},'chartType':{type:'string'},'showLine':{type:'boolean',defaultValue:true}}}});c.prototype.init=function(){this._listItemHeight=3;this._isClosedByHeaderButton=false;this._isActionItemsChanged=true;this._options=null;this._oContentPanel=new C(this._createId('vizContentPanel'),{});this._oSelectedLabel=new sap.m.Label(this._createId('vizSelectedLabel'),{});this._oSelectedBar=new sap.m.Bar(this._createId('vizSelectedBar'),{contentMiddle:[this._oSelectedLabel]}).addStyleClass('viz-controls-chartPopover-vizSelectedBar').addStyleClass('viz-controls-chartPopover-vizSelectedBarBorder');this._oCustomHeader=new H(this._createId('vizHeaderBar'),{title:sap.viz.extapi.env.Language.getResourceString("IDS_CURRENT_SELECTION"),showNavButton:false,closeButtonPress:q.proxy(this.close,this),navButtonPress:q.proxy(this._navigateBack,this)});this._oPopover=new sap.m.ResponsivePopover(this._createId('vizChartPopover'),{horizontalScrolling:false,placement:sap.m.PlacementType.HorizontalPreferedRight,contentWidth:"18rem",customHeader:this._oCustomHeader,content:[this._oContentPanel]});this._oPopover.addStyleClass('viz-controls-chartPopover');this._oPopover.attachAfterClose(this._afterClose,this);this._oPopover.attachAfterOpen(this._afterOpen,this);this._setAriaLabelledBys();this._infoDiv=null;this._chartType=null;};c.prototype._setAriaLabelledBys=function(){this._oPopover.removeAllAriaLabelledBy();this._oPopover.addAriaLabelledBy(this._oContentPanel);this._oPopover.addAriaLabelledBy(this._oSelectedLabel);};c.prototype._afterOpen=function(){this._oCustomHeader._oCloseButton.focus();};c.prototype._afterClose=function(){this._navigateBack();if(this._options&&this._options.selectedValues<1){this._oPopover.removeContent(this._oSelectedBar);}if(this._infoDiv&&this._isClosedByHeaderButton){this._isClosedByHeaderButton=false;this._infoDiv.focus();}};c.prototype.isOpen=function(){return this._oPopover.isOpen();};function h(n,d){if(!n||!n.getAttribute){return false;}var e=n.getAttribute('class')||"";return(' '+e+' ').indexOf(' '+d+' ')>=0;}c.prototype.openBy=function(o,s){if(o){this._oCustomHeader.setTitle(sap.viz.extapi.env.Language.getResourceString('IDS_CURRENT_SELECTION'));this._updateContent();this._updateActionItems();var t=this._updatePopoverSettings(o);var d=this._oPopover.getContent();if(d.length>0){this._oPopover.setInitialFocus(d[0].getId());}setTimeout(function(){this._oPopover.openBy(t,s);}.bind(this),0);}return this;};c.prototype.close=function(e){if(e&&e.getSource&&(this._oCustomHeader.getId()===e.getSource().getId())){this._isClosedByHeaderButton=true;}this._oPopover.close();return this;};c.prototype.exit=function(){if(this._oContentPanel){this._oContentPanel.destroy();this._oContentPanel=null;}if(this._oSelectedLabel){this._oSelectedLabel.destroy();this._oSelectedLabel=null;}if(this._oCustomHeader){this._oCustomHeader.destroy();this._oCustomHeader=null;}if(this._oCustomPanel){this._oCustomPanel.destroy();this._oCustomPanel=null;}if(this._oPopover){this._oPopover.destroy();this._oPopover=null;}if(this._targetElement){this._targetElement.remove();this._targetElement=null;}this._options=null;this._infoDiv=null;this._chartType=null;};c.prototype.setOptions=function(o){var d={formatString:this.getFormatString(),chartType:this.getChartType(),mode:"popover"};var e=F.formatData(o,d);if(!this._infoDiv||this.getChartType()!=this._chartType){var n=o.target.parentNode;while(n&&!h(n,"v-info")){n=n.parentNode;}this._infoDiv=n;this._chartType=this.getChartType();}if(this._infoDiv){var _=this._infoDiv.querySelector(".v-m-screenreader-container");if(_){var l=_.querySelector("li");if(l&&o.selectedValues){var t=o.selectedValues===1?" "+sap.viz.extapi.env.Language.getResourceString("IDS_ITEM_SELECTED"):" "+sap.viz.extapi.env.Language.getResourceString("IDS_ITEMS_SELECTED");l.innerText=o.selectedValues+t;}}}this._options=o;this._oContentPanel.setShowLine(this.getShowLine()).setContentData(e);if(!e.val||o.selectedValues>1){this._oSelectedLabel.setText(o.selectedValues+" "+(o.selectedValues===1?sap.viz.extapi.env.Language.getResourceString("IDS_ITEM_SELECTED"):sap.viz.extapi.env.Language.getResourceString("IDS_ITEMS_SELECTED")));this._oPopover.insertContent(this._oSelectedBar,1);if(e.val===undefined){this._oSelectedBar.removeStyleClass('viz-controls-chartPopover-vizSelectedBarBorder');}}else{this._oPopover.removeContent(this._oSelectedBar);}return this;};c.prototype.setActionItems=function(i){this._actionItems=[];this._actionItems=q.extend(true,this._actionItems,i);this._isActionItemsChanged=true;};c.prototype.getActionItems=function(i){return this._actionItems;};c.prototype._updateContent=function(){var d=this.getCustomDataControl();if(d){if(this._oCustomPanel){this._oPopover.removeContent(this._oCustomPanel);}this._oCustomPanel=d(this._options);this._oPopover.removeContent(this._oContentPanel);this._oPopover.insertContent(this._oCustomPanel,0);this._oSelectedBar.addStyleClass('viz-controls-chartPopover-vizSelectedBarBorder');}else{this._oPopover.removeContent(this._oCustomPanel);this._oCustomPanel=null;if(this._oContentPanel.isMultiSelected()){this._oPopover.removeContent(this._oContentPanel);}else if(this._oPopover.indexOfContent(this._oContentPanel)===-1){this._oPopover.insertContent(this._oContentPanel,0);this._oSelectedBar.addStyleClass('viz-controls-chartPopover-vizSelectedBarBorder');}}return this;};c.prototype._updateActionItems=function(){if(this._isActionItemsChanged){var d=this._actionItems;if(!this._oActionList){d=this.getActionItems();if(d&&d.length>0){this._actionItems=q.extend(true,this._actionItems,d);this._oActionList=new sap.m.List({}).addStyleClass('viz-controls-chartPopover-actionList');this._oPopover.addContent(this._oActionList);}}if(d&&d.length>0){this._oActionList.removeAllItems();var e;var o=function(f){var g=this._oActionList.indexOfItem(f.getSource());var s=this._actionItems[g].children;if(s&&s.length>0){this._oSubActionItemsPage=new S();this._oPopover.insertContent(this._oSubActionItemsPage);this._oSubActionItemsPage.setItems(s);this._oCustomHeader.setTitle(this._actionItems[g].text);this._navigateTo();}};for(var i=0,l=d.length;i<l;i++){e=d[i];if(e.type==='action'){this._oActionList.addItem(new sap.m.ActionListItem({text:e.text,press:e.press?e.press:function(){},tooltip:e.text}));}else if(e.type==='navigation'){this._oActionList.addItem(new sap.m.StandardListItem({title:e.text,type:'Navigation',press:o.bind(this),tooltip:e.text}));}}}else if(this._oActionList){this._oActionList.destroy();this._oActionList=null;}this._isActionItemsChanged=false;}};c.prototype._navigateBack=function(){this._resetHeaderBar();if(this._oActionList){this._oActionList.removeStyleClass('hideActionList');this._oActionList.focus();}this._setAriaLabelledBys();};c.prototype._resetHeaderBar=function(){this._oPopover.removeContent(this._oSubActionItemsPage);this._oCustomHeader.setShowNavButton(false).setTitle(sap.viz.extapi.env.Language.getResourceString("IDS_CURRENT_SELECTION"));};c.prototype._navigateTo=function(p){this._oCustomHeader.setShowNavButton(true);if(this._oActionList){this._oActionList.addStyleClass('hideActionList');}this._oPopover.removeAriaLabelledBy(this._oContentPanel);};c.prototype._createId=function(i){return this.getId()+"-"+i;};c.prototype._updatePopoverSettings=function(t){var d=this._options.data.val;var e=t.getBoundingClientRect(),m;var p=function(n){return parseInt(n);};var f=t.__data__;if(d!==undefined){for(var i=0,l=d.length;i<l;i++){if(d[i].type&&(d[i].type.toLowerCase()==="measure")){m=d[i].value;break;}}}else if(f&&f.measureNames){m=f[f.measureNames];}var g=this._options.data.type;var j=g&&g==="line";var k,o;switch(this.getChartType()){case'info/bar':case'info/dual_bar':if(m<0){this._oPopover.setPlacement(sap.m.PlacementType.PreferredLeftOrFlip);}else{this._oPopover.setPlacement(sap.m.PlacementType.PreferredRightOrFlip);}k=t.firstChild;break;case'info/column':case'info/dual_column':case'info/timeseries_column':if(m<0){this._oPopover.setPlacement(sap.m.PlacementType.PreferredBottomOrFlip);}else{this._oPopover.setPlacement(sap.m.PlacementType.PreferredTopOrFlip);}k=t.firstChild;break;case'info/pie':case'info/donut':o=p(e.width/2);this._oPopover.setOffsetX(-o);this._oPopover.setPlacement(sap.m.PlacementType.PreferredRightOrFlip);k=t.firstChild;break;case'info/bullet':this._oPopover.setPlacement(sap.m.PlacementType.PreferredRightOrFlip);k=t;break;case'info/vertical_bullet':case'info/timeseries_bullet':this._oPopover.setPlacement(sap.m.PlacementType.PreferredTopOrFlip);k=t;break;case'info/line':case'info/timeseries_line':case'info/timeseries_scatter':case'info/timeseries_bubble':case'info/dual_line':case'info/bubble':case'info/time_bubble':case'info/scatter':case'info/stacked_bar':case'info/dual_stacked_bar':case'info/100_stacked_bar':case'info/100_dual_stacked_bar':case'info/waterfall':case'info/timeseries_waterfall':case'info/area':case'info/radar':this._oPopover.setPlacement(sap.m.PlacementType.VerticalPreferredTop);k=t.firstChild;break;case'info/stacked_column':case'info/dual_stacked_column':case'info/100_stacked_column':case'info/100_dual_stacked_column':case'info/horizontal_waterfall':case'info/heatmap':case'info/treemap':case'info/timeseries_stacked_column':case'info/timeseries_100_stacked_column':this._oPopover.setPlacement(sap.m.PlacementType.HorizontalPreferredRight);k=t.firstChild;break;case'info/combination':case'info/timeseries_combination':case'info/dual_timeseries_combination':if(j){this._oPopover.setPlacement(sap.m.PlacementType.PreferredTopOrFlip);}else if(m<0){this._oPopover.setPlacement(sap.m.PlacementType.PreferredBottomOrFlip);}else{this._oPopover.setPlacement(sap.m.PlacementType.PreferredTopOrFlip);}k=t.firstChild;break;case'info/dual_combination':case'info/stacked_combination':case'info/dual_stacked_combination':case'info/timeseries_stacked_combination':if(j){this._oPopover.setPlacement(sap.m.PlacementType.VerticalPreferedTop);}else{this._oPopover.setPlacement(sap.m.PlacementType.HorizontalPreferedRight);}k=t.firstChild;break;case'info/dual_horizontal_combination':case'info/horizontal_stacked_combination':case'info/dual_horizontal_stacked_combination':if(j){this._oPopover.setPlacement(sap.m.PlacementType.HorizontalPreferedRight);}else{this._oPopover.setPlacement(sap.m.PlacementType.VerticalPreferedTop);}k=t.firstChild;break;}return k;};c.prototype.addStyleClass=function(){this._oPopover.addStyleClass.apply(this._oPopover,arguments);};c.prototype.removeStyleClass=function(){this._oPopover.removeStyleClass.apply(this._oPopover,arguments);};return c;});
