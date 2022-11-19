/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/unified/CalendarLegend','sap/ui/unified/CalendarAppointment','sap/ui/core/Core','./PlanningCalendarLegendRenderer'],function(C,a,b,P){"use strict";var c=C.extend("sap.m.PlanningCalendarLegend",{metadata:{library:"sap.m",properties:{itemsHeader:{type:"string",group:"Appearance"},appointmentItemsHeader:{type:"string",group:"Appearance"}},aggregations:{appointmentItems:{type:"sap.ui.unified.CalendarLegendItem",multiple:true,singularName:"appointmentItem"}},designtime:"sap/m/designtime/PlanningCalendarLegend.designtime"}});c._COLUMN_WIDTH_DEFAULT="auto";c.prototype.init=function(){C.prototype.init.call(this);this.setProperty("columnWidth",c._COLUMN_WIDTH_DEFAULT);this.addStyleClass("sapMPlanCalLegend");};c.prototype.setColumnWidth=function(w){if(w==undefined){w=c._COLUMN_WIDTH_DEFAULT;}return this.setProperty("columnWidth",w);};c.findLegendItemForItem=function(l,s){var L=l?l.getAppointmentItems():null,d=l?l.getItems():null,A=s instanceof a,I=A?L:d,o=A?s.getType():s.type,e,f,i;if(I&&I.length){for(i=0;i<I.length;i++){e=I[i];if(e.getType()===o){f=e.getText();break;}}}if(!f){f=o;}return f;};c.prototype._getItemsHeader=function(){var i=this.getItemsHeader();if(i==undefined){return b.getLibraryResourceBundle('sap.m').getText("PLANNING_CALENDAR_LEGEND_ITEMS_HEADER");}return i;};c.prototype._getAppointmentItemsHeader=function(){var A=this.getAppointmentItemsHeader();if(A==undefined){return b.getLibraryResourceBundle('sap.m').getText("PLANNING_CALENDAR_LEGEND_APPOINTMENT_ITEMS_HEADER");}return A;};return c;});
