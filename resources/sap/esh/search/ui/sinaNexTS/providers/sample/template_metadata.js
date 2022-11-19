/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["require","exports","../../sina/AttributeFormatType"],function(r,e,A){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.createTemplateMetadata=void 0;function c(C){var a={metadata:[C.sina._createAttributeMetadata({id:"FOLKLORIST",label:"Folklorist",type:C.sina.AttributeType.String,usage:{Title:{},AdvancedSearch:{displayOrder:0,},Facet:{},},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"LOCATION",label:"Location",type:C.sina.AttributeType.String,usage:{Detail:{},AdvancedSearch:{displayOrder:0,},Facet:{},},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"WEBSITE",label:"Website",type:C.sina.AttributeType.String,usage:{Detail:{},AdvancedSearch:{displayOrder:0,},},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"SUMMARY",label:"Summary",type:C.sina.AttributeType.String,format:C.sina.AttributeFormatType.LongText,usage:{Detail:{},AdvancedSearch:{displayOrder:0,},},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"LOC_4326",label:"LOC_4326",type:C.sina.AttributeType.GeoJson,usage:{},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"SEX",label:"Sex",type:C.sina.AttributeType.String,usage:{Title:{},AdvancedSearch:{displayOrder:0,},Facet:{},},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"SEX_DESC",label:"Description for Gender",type:C.sina.AttributeType.String,usage:{Title:{},AdvancedSearch:{displayOrder:0,},Facet:{},},isSortable:false,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"DISCIPLINE",label:"Discipline",type:C.sina.AttributeType.String,usage:{Detail:{}},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"DESC",label:"Descritption",type:C.sina.AttributeType.String,usage:{Detail:{}},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"PIC",label:"picture",type:C.sina.AttributeType.ImageUrl,usage:{Title:{}},format:A.AttributeFormatType.Round,isSortable:false,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"SALARY",label:"Salary",type:C.sina.AttributeType.Integer,usage:{Detail:{}},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"CURRENCY",label:"Currency",type:C.sina.AttributeType.String,usage:{Detail:{}},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"HEIGHT",label:"Height",type:C.sina.AttributeType.Integer,usage:{Detail:{}},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"UOM_HEIGHT",label:"Unit of Measure for Height Attribute",type:C.sina.AttributeType.String,usage:{Detail:{}},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"PHONE",label:"Phone",type:C.sina.AttributeType.String,usage:{Detail:{}},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"PUB",label:"Publication",type:C.sina.AttributeType.ImageUrl,format:C.sina.AttributeFormatType.DocumentThumbnail,usage:{Title:{},AdvancedSearch:{displayOrder:0,},},isSortable:false,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"EMAIL",label:"Email",type:C.sina.AttributeType.String,usage:{Detail:{}},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),],metadata2:[C.sina._createAttributeMetadata({id:"CAPTION",label:"Caption",type:C.sina.AttributeType.String,usage:{Title:{}},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"LOCATION",label:"Location",type:C.sina.AttributeType.String,usage:{Detail:{},AdvancedSearch:{displayOrder:0,},Facet:{},},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"LOC_4326",label:"LOC_4326",type:C.sina.AttributeType.GeoJson,usage:{Detail:{displayOrder:1,},},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"FOLKLORIST",label:"Folklorist",type:C.sina.AttributeType.String,usage:{Title:{},AdvancedSearch:{displayOrder:0,},Facet:{},},isSortable:false,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"DESC",label:"Descritption",type:C.sina.AttributeType.String,format:C.sina.AttributeFormatType.LongText,usage:{Detail:{}},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"PIC",label:"picture",type:C.sina.AttributeType.ImageUrl,usage:{Title:{}},isSortable:false,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"URL",label:"URL",type:C.sina.AttributeType.String,usage:{Detail:{}},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),],metadata3:[C.sina._createAttributeMetadata({id:"PUB",label:"Publication",type:C.sina.AttributeType.ImageUrl,format:C.sina.AttributeFormatType.DocumentThumbnail,usage:{Title:{},AdvancedSearch:{displayOrder:0,},},isSortable:false,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"FOLKLORIST",label:"Folklorist",type:C.sina.AttributeType.String,usage:{Detail:{},AdvancedSearch:{displayOrder:0,},Facet:{},},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),C.sina._createAttributeMetadata({id:"DESC",label:"Description",type:C.sina.AttributeType.String,format:C.sina.AttributeFormatType.LongText,usage:{Detail:{}},isSortable:true,isKey:false,matchingStrategy:C.sina.MatchingStrategy.Exact,}),],};return a;}e.createTemplateMetadata=c;});})();
