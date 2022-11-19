/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define("sap/suite/ui/commons/TimelineRenderManagerTimestamp",["sap/ui/base/ManagedObject","sap/m/RadioButtonGroup","sap/m/RadioButton","sap/m/Panel","sap/m/DateTimePicker","sap/m/Label"],function(P,R,a,b,D,L){"use strict";var c={"RANGE":0,"START":1,"END":2};var T=P.extend("sap.suite.ui.commons.TimelineRenderManagerTimestamp",{"constructor":function(i,s,S,r){var t;var o;this.getText=r.getText.bind(r);this.getTimestampPanelPicker=function(){if(!t){t=this._createTimestampPanelPicker();}return t;};this.getTimestampPanelRadio=function(){if(!o){o=this._createTimestampPanelRadio();}return o;};P.call(this,i,s,S);this.setVisible(false);},metadata:{events:{dateChanged:{}}}});T.prototype._createTimestampPanelPicker=function(){var i=this.getId()+"-timestamp-panel-picker";var C;var f=new L({text:this.getText("TIMELINE_FROM")+":"});var t=new L({text:this.getText("TIMELINE_TO")+":"});var p=new b({id:i,content:[f,new L({text:this.getText("TIMELINE_NOW"),visible:false}),new D({width:"auto",ariaLabelledBy:[f],change:this._handlerTimePickerRange.bind(this)}),t,new L({text:this.getText("TIMELINE_NOW"),visible:false}),new D({width:"auto",ariaLabelledBy:[t],change:this._handlerTimePickerRange.bind(this)})]});p.addStyleClass("sapSuiteUiCommonsTimelineRangeFilterPanel");C=p.getContent();C[1].addStyleClass("sapSuiteUiCommonsTimelineRangeLabelNow");C[2].addStyleClass("sapSuiteUiCommonsTimelineRangeDatePicker");C[4].addStyleClass("sapSuiteUiCommonsTimelineRangeLabelNow");C[5].addStyleClass("sapSuiteUiCommonsTimelineRangeDatePicker");return p;};T.prototype._createTimestampPanelRadio=function(){var i=this.getId()+"-timestamp-panel-radio";return new b({"id":i,"content":[new R({columns:3,select:this.handlerSelectRadioButton.bind(this),buttons:[new a({id:i+"-range-of-dates",text:this.getText("TIMELINE_TIMESTAMP_RANGE_OF_DATES")}),new a({id:i+"-starting-date",text:this.getText("TIMELINE_TIMESTAMP_STARTING_DATE")}),new a({id:i+"-ending-date",text:this.getText("TIMELINE_TIMESTAMP_ENDING_DATE")})]})]});};T.prototype.resizeDialog=function(o){o.getFilterContent()._getDialog().setContentWidth("50em");};T.prototype.setVisible=function(v){this.getTimestampPanelPicker().setVisible(v);this.getTimestampPanelRadio().setVisible(v);};T.prototype.setPickerView=function(p,d){d.getContent()[1].setVisible(p===c.END);d.getContent()[2].setVisible(p===c.START||p===c.RANGE);d.getContent()[4].setVisible(p===c.START);d.getContent()[5].setVisible(p===c.END||p===c.RANGE);};T.prototype.handlerSelectRadioButton=function(e){this.setPickerView(e.getParameter("selectedIndex"),this.getTimestampPanelPicker());};T.prototype.getVisible=function(){return this.getTimestampPanelPicker().getVisible()&&this.getTimestampPanelRadio().getVisible();};T.prototype.getStartDate=function(){var s;var p=this.getTimestampPanelPicker().getContent()[2];if(p.getVisible()){s=p.getDateValue();}else{s=function(){return new Date();};}return s;};T.prototype.clearDates=function(){var p=this.getTimestampPanelPicker().getContent()[2],o=this.getTimestampPanelPicker().getContent()[5];p.setDateValue();o.setDateValue();};T.prototype.getEndDate=function(){var e;var p=this.getTimestampPanelPicker().getContent()[5];if(p.getVisible()){e=p.getDateValue();}else{e=function(){return new Date();};}return e;};T.prototype.destroy=function(){this.getTimestampPanelPicker().destroy();this.getTimestampPanelRadio().destroy();P.prototype.destroy.call(this);};T.prototype._handlerTimePickerRange=function(e){var p=this.getTimestampPanelPicker().getContent()[2],o=this.getTimestampPanelPicker().getContent()[5];var d=e.getSource();var f=d.getDateValue();if(d===p){if(o.getDateValue()<f){o.setInitialFocusedDateValue(f);}o.setMinDate(f);}else if(d===o){if(p.getDateValue()>f){p.setInitialFocusedDateValue(f);}p.setMaxDate(f);}};return T;});
