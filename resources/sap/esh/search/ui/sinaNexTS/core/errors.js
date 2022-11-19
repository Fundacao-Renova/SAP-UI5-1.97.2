/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){var _=(this&&this.__extends)||(function(){var e=function(d,b){e=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(Object.prototype.hasOwnProperty.call(b,p))d[p]=b[p];};return e(d,b);};return function(d,b){if(typeof b!=="function"&&b!==null)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");e(d,b);function a(){this.constructor=d;}d.prototype=b===null?Object.create(b):(a.prototype=b.prototype,new a());};})();sap.ui.define(["require","exports"],function(r,a){"use strict";Object.defineProperty(a,"__esModule",{value:true});a.InBetweenConditionInConsistent=a.QueryIsReadOnlyError=a.NoValidEnterpriseSearchAPIConfigurationFoundError=a.DataSourceAttributeMetadataNotFoundError=a.DataSourceInURLDoesNotExistError=a.CanNotCreateAlreadyExistingDataSourceError=a.CanOnlyAutoInsertComplexConditionError=a.SubProviderError=a.DateConversionError=a.TimeConversionError=a.WhyFoundAttributeMetadataMissingError=a.FacetsParseError=a.ESHNotActiveError=a.InternalServerError=a.UnknownConditionTypeError=a.UnknownDataTypeError=a.UnknownPresentationUsageError=a.UnknownLogicalOperatorError=a.UnknownComparisonOperatorError=a.UnknownAttributeTypeError=a.NotImplementedError=a.TimeOutError=a.NoJSONDateError=a.HANAODataError=a.ABAPInAV2Error=a.ABAPODataError=a.AjaxError=a.ajaxErrorFactory=a.InternalESHClientError=a.ESHClientError=void 0;var E=(function(e){_(E,e);function E(i){var j,w;var x=e.call(this,i.message)||this;x.message=(j=i.message)!==null&&j!==void 0?j:"Unspecified ESH Client Error";x.name=(w=i.name)!==null&&w!==void 0?w:"ESHClientError";x.previous=i.previous;return x;}E.prototype.toString=function(){return this.name+": "+this.message;};return E;}(Error));a.ESHClientError=E;var I=(function(e){_(I,e);function I(i){var j=this;var w={name:"InternalESHClientError",message:i!==null&&i!==void 0?i:"Internal ESH Client Error",};j=e.call(this,w)||this;return j;}return I;}(E));a.InternalESHClientError=I;function b(x,i){var j,w,y,z,B,G;var J=new A(x,i);try{var K=void 0;if(x===null||x===void 0?void 0:x.responseText){K=JSON.parse(x===null||x===void 0?void 0:x.responseText);}if(((j=K===null||K===void 0?void 0:K.Error)===null||j===void 0?void 0:j.Code)&&((w=K===null||K===void 0?void 0:K.Error)===null||w===void 0?void 0:w.Message)){return new d(x);}if(((y=K===null||K===void 0?void 0:K.error)===null||y===void 0?void 0:y.code)&&((B=(z=K===null||K===void 0?void 0:K.error)===null||z===void 0?void 0:z.message)===null||B===void 0?void 0:B.value)){return new c(x);}if((G=K===null||K===void 0?void 0:K.error)===null||G===void 0?void 0:G.details){return new H(x);}return J;}catch(e){var L=new I("Error while extracting server error");L.previous=e;J.previous=L;return J;}}a.ajaxErrorFactory=b;var A=(function(e){_(A,e);function A(x,i){var j,w;var y=this;var z=x.status;var B=(j=x.statusText)!==null&&j!==void 0?j:"";var G=(w=x.responseText)!==null&&w!==void 0?w:"";y=e.call(this,{message:z+": "+B+" - "+G,name:"ESHAjaxError",})||this;y.xhttp=x;y.responseHeaders=i;return y;}return A;}(E));a.AjaxError=A;var c=(function(e){_(c,e);function c(x){var i,j,w;var y=this;var z="Internal Server Error";if(x===null||x===void 0?void 0:x.responseText){var B=JSON.parse(x===null||x===void 0?void 0:x.responseText);if((i=B===null||B===void 0?void 0:B.error)===null||i===void 0?void 0:i.code){z=B.error.code;}if((w=(j=B===null||B===void 0?void 0:B.error)===null||j===void 0?void 0:j.message)===null||w===void 0?void 0:w.value){z+=": "+B.error.message.value;}}y=e.call(this,{message:z,name:"ESHABAPODataError",})||this;return y;}return c;}(E));a.ABAPODataError=c;var d=(function(e){_(d,e);function d(x){var w,y;var z=this;var B=["Internal Server Error"];if(x===null||x===void 0?void 0:x.responseText){var G=JSON.parse(x===null||x===void 0?void 0:x.responseText);if(((w=G===null||G===void 0?void 0:G.Error)===null||w===void 0?void 0:w.Code)&&((y=G===null||G===void 0?void 0:G.Error)===null||y===void 0?void 0:y.Message)){B.push(G.Error.Code+": "+G.Error.Message);}if(G===null||G===void 0?void 0:G.ErrorDetails){for(var i=0;i<G.ErrorDetails.length;++i){var J=G.ErrorDetails[i];B.push(J.Code+": "+J.Message);}}if(G===null||G===void 0?void 0:G.Messages){for(var j=0;j<G.Messages.length;++j){var K=G.Messages[j];B.push(K.Number+": "+K.Text+" ("+K.Type+")");}}}z=e.call(this,{message:B.join("\n"),name:"ESHINAV2Error",})||this;return z;}return d;}(E));a.ABAPInAV2Error=d;var H=(function(e){_(H,e);function H(x){var i;var j=this;var w="Internal Server Error";if(x===null||x===void 0?void 0:x.responseText){var y=JSON.parse(x===null||x===void 0?void 0:x.responseText);if((i=y===null||y===void 0?void 0:y.error)===null||i===void 0?void 0:i.details){w=y.error.details;}}j=e.call(this,{message:w,name:"ESHHANAODataError",})||this;return j;}return H;}(E));a.HANAODataError=H;var N=(function(e){_(N,e);function N(i){var j=this;var w={name:"NoJSONDateError",message:i!==null&&i!==void 0?i:"No JSON Date",};j=e.call(this,w)||this;return j;}return N;}(E));a.NoJSONDateError=N;var T=(function(e){_(T,e);function T(i){var j=this;var w={name:"TimeOutError",message:i!==null&&i!==void 0?i:"Time out",};j=e.call(this,w)||this;return j;}return T;}(E));a.TimeOutError=T;var f=(function(e){_(f,e);function f(){return e.call(this,{message:"Not implemented",name:"ESHNotImplementedError"})||this;}return f;}(E));a.NotImplementedError=f;var U=(function(e){_(U,e);function U(i){var j=this;var w={name:"UnknownAttributeTypeError",message:i!==null&&i!==void 0?i:"Unknown attribute type",};j=e.call(this,w)||this;return j;}return U;}(E));a.UnknownAttributeTypeError=U;var g=(function(e){_(g,e);function g(i){var j=this;var w={name:"UnknownComparisonOperatorError",message:i!==null&&i!==void 0?i:"Unknown comparison operator",};j=e.call(this,w)||this;return j;}return g;}(E));a.UnknownComparisonOperatorError=g;var h=(function(e){_(h,e);function h(i){var j=this;var w={name:"UnknownLogicalOperatorError",message:i!==null&&i!==void 0?i:"Unknown logical operator",};j=e.call(this,w)||this;return j;}return h;}(E));a.UnknownLogicalOperatorError=h;var k=(function(e){_(k,e);function k(i){var j=this;var w={name:"UnknownPresentationUsageError",message:i!==null&&i!==void 0?i:"Unknown presentation usage",};j=e.call(this,w)||this;return j;}return k;}(E));a.UnknownPresentationUsageError=k;var l=(function(e){_(l,e);function l(i){var j=this;var w={name:"UnknownDataTypeError",message:i!==null&&i!==void 0?i:"Unknown data type",};j=e.call(this,w)||this;return j;}return l;}(E));a.UnknownDataTypeError=l;var m=(function(e){_(m,e);function m(i){var j=this;var w={name:"UnknownConditionTypeError",message:i!==null&&i!==void 0?i:"Unknown condition type",};j=e.call(this,w)||this;return j;}return m;}(E));a.UnknownConditionTypeError=m;var n=(function(e){_(n,e);function n(i){var j=this;var w={name:"InternalServerError",message:i!==null&&i!==void 0?i:"Internal server error",};j=e.call(this,w)||this;return j;}return n;}(E));a.InternalServerError=n;var o=(function(e){_(o,e);function o(i){var j=this;var w={name:"ESHNotActiveError",message:i!==null&&i!==void 0?i:"Enterprise Search is not active",};j=e.call(this,w)||this;return j;}return o;}(E));a.ESHNotActiveError=o;var F=(function(e){_(F,e);function F(i){var j=this;var w={name:"FacetsParseError",message:i!==null&&i!==void 0?i:"Facets parse error",};j=e.call(this,w)||this;return j;}return F;}(E));a.FacetsParseError=F;var W=(function(e){_(W,e);function W(i){var j=this;var w={name:"WhyFoundAttributeMetadataMissingError",message:i!==null&&i!==void 0?i:"Why found attribute metadata missing",};j=e.call(this,w)||this;return j;}return W;}(E));a.WhyFoundAttributeMetadataMissingError=W;var p=(function(e){_(p,e);function p(i){var j=this;var w={name:"TimeConversionError",message:i!==null&&i!==void 0?i:"Time conversion error",};j=e.call(this,w)||this;return j;}return p;}(E));a.TimeConversionError=p;var D=(function(e){_(D,e);function D(i){var j=this;var w={name:"DateConversionError",message:i!==null&&i!==void 0?i:"Date conversion error",};j=e.call(this,w)||this;return j;}return D;}(E));a.DateConversionError=D;var S=(function(e){_(S,e);function S(i){var j=this;var w={name:"SubProviderError",message:i!==null&&i!==void 0?i:"subprovider error",};j=e.call(this,w)||this;return j;}return S;}(E));a.SubProviderError=S;var C=(function(e){_(C,e);function C(i){var j=this;var w={name:"CanOnlyAutoInsertComplexConditionError",message:i!==null&&i!==void 0?i:"Can only insert complex condition",};j=e.call(this,w)||this;return j;}return C;}(E));a.CanOnlyAutoInsertComplexConditionError=C;var q=(function(e){_(q,e);function q(i){var j=this;var w={name:"CanNotCreateAlreadyExistingDataSourceError",message:i!==null&&i!==void 0?i:"Can not create already existing data source",};j=e.call(this,w)||this;return j;}return q;}(E));a.CanNotCreateAlreadyExistingDataSourceError=q;var s=(function(e){_(s,e);function s(i){var j=this;var w={name:"DataSourceInURLDoesNotExistError",message:i!==null&&i!==void 0?i:"Data source in url does not exist",};j=e.call(this,w)||this;return j;}return s;}(E));a.DataSourceInURLDoesNotExistError=s;var t=(function(e){_(t,e);function t(i){var j=this;var w={name:"DataSourceAttributeMetadataNotFoundError",message:i!==null&&i!==void 0?i:"data source attribute metadata not found",};j=e.call(this,w)||this;return j;}return t;}(E));a.DataSourceAttributeMetadataNotFoundError=t;var u=(function(e){_(u,e);function u(i){var j=this;var w={name:"NoValidEnterpriseSearchAPIConfigurationFoundError",message:"Tried following providers: "+i,};j=e.call(this,w)||this;return j;}return u;}(E));a.NoValidEnterpriseSearchAPIConfigurationFoundError=u;var Q=(function(e){_(Q,e);function Q(i){var j=this;var w={name:"QueryIsReadOnlyError",message:i!==null&&i!==void 0?i:"Query is read only",};j=e.call(this,w)||this;return j;}return Q;}(E));a.QueryIsReadOnlyError=Q;var v=(function(e){_(v,e);function v(i){var j=this;var w={name:"InBetweenConditionInConsistent",message:i!==null&&i!==void 0?i:"In between condition is inconsistent",};j=e.call(this,w)||this;return j;}return v;}(E));a.InBetweenConditionInConsistent=v;});})();