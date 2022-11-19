/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/core/mvc/View","sap/ui/core/Component","sap/m/MessageBox","sap/base/Log","sap/fe/navigation/SelectionVariant","sap/ui/mdc/condition/FilterOperatorUtil","sap/ui/mdc/odata/v4/TypeUtil","sap/fe/core/helpers/StableIdHelper","sap/fe/core/library","sap/fe/core/helpers/ModelHelper","sap/fe/core/helpers/SemanticDateOperators","sap/fe/core/templating/FilterHelper","sap/ui/mdc/condition/Condition","sap/ui/mdc/enum/ConditionValidated","sap/fe/core/converters/MetaModelConverter","sap/fe/core/converters/ConverterContext","sap/base/util/merge","sap/fe/core/helpers/BindingExpression","sap/fe/core/controls/DataLossOrDraftDiscard/DataLossOrDraftDiscardHandler","sap/ui/core/XMLTemplateProcessor","sap/ui/core/util/XMLPreprocessor","sap/ui/core/Fragment"],function(V,C,M,L,S,F,T,c,d,e,f,g,h,l,m,n,o,B,D,X,p,q){"use strict";var P=d.ProgrammingModel;var v=["Edm.Boolean","Edm.Byte","Edm.Date","Edm.DateTime","Edm.DateTimeOffset","Edm.Decimal","Edm.Double","Edm.Float","Edm.Guid","Edm.Int16","Edm.Int32","Edm.Int64","Edm.SByte","Edm.Single","Edm.String","Edm.Time","Edm.TimeOfDay"];function r(a){if(!a){return undefined;}return a.replace(/"/g," ").split(/\s+/).reduce(function(b,i){if(i!==""){b=(b?b+" ":"")+'"'+i+'"';}return b;},undefined);}function s(a){var b=a.getProperty("$Type");if(!a.getProperty("$kind")){switch(b){case"com.sap.vocabularies.UI.v1.DataFieldForAction":case"com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":b=undefined;break;case"com.sap.vocabularies.UI.v1.DataField":case"com.sap.vocabularies.UI.v1.DataFieldWithNavigationPath":case"com.sap.vocabularies.UI.v1.DataFieldWithUrl":b=a.getProperty("Value/$Path/$Type");break;case"com.sap.vocabularies.UI.v1.DataFieldForAnnotation":default:var i=a.getProperty("Target/$AnnotationPath");if(i){if(i.indexOf("com.sap.vocabularies.Communication.v1.Contact")>-1){b=a.getProperty("Target/$AnnotationPath/fn/$Path/$Type");}else if(i.indexOf("com.sap.vocabularies.UI.v1.DataPoint")>-1){b=a.getProperty("Value/$Path/$Type");}else{b=undefined;}}else{b=undefined;}break;}}return b;}function H(a){var b=false;if(a){a.getCurrentContexts().forEach(function(i){if(i&&i.isTransient()){b=true;}});}return b;}function t(a,b){var i=0,j=a.split("/$NavigationPropertyBinding/");for(var k=j[0];i<j.length-1;i++){var T1=u(b,k,j[i+1]);if(T1&&T1["SearchRestrictions"]){return T1["SearchRestrictions"];}k=k+"/$NavigationPropertyBinding/"+j[i];}return b.getObject(a+"@Org.OData.Capabilities.V1.SearchRestrictions");}function u(a,b,i){var j=a.getObject(b+"@Org.OData.Capabilities.V1.NavigationRestrictions");var k=j&&j.RestrictedProperties;return(k&&k.find(function(T1){return(T1&&T1.NavigationProperty&&T1.NavigationProperty.$NavigationPropertyPath===i);}));}function _(a,b,i){var j=false;var k=a.getObject(b+"@Org.OData.Capabilities.V1.FilterRestrictions");if(k&&k.NonFilterableProperties){j=k.NonFilterableProperties.some(function(T1){return T1.$NavigationPropertyPath===i||T1.$PropertyPath===i;});}return j;}function w(a,b,i){var j=b+"/"+i,k=j.split("/").splice(0,2),T1=j.split("/").splice(2),U1=false,V1="";b=k.join("/");U1=T1.some(function(W1,X1,Y1){if(V1.length>0){V1+="/"+W1;}else{V1=W1;}if(X1===Y1.length-2){var Z1=u(a,b,W1);var $1=Z1&&Z1.FilterRestrictions;var _1=$1&&$1.NonFilterableProperties;var a2=Y1[Y1.length-1];if(_1&&_1.find(function(b2){return b2.$PropertyPath===a2;})){return true;}}if(X1===Y1.length-1){U1=_(a,b,V1);}else if(a.getObject(b+"/$NavigationPropertyBinding/"+W1)){U1=_(a,b,V1);V1="";b="/"+a.getObject(b+"/$NavigationPropertyBinding/"+W1);}return U1===true;});return U1;}function x(a,b,i,j){if(typeof i!=="string"){throw new Error("sProperty parameter must be a string",i);}var k;if(a.getProperty(b+"/@com.sap.vocabularies.Common.v1.ResultContext")===true){return true;}var T1=a.createBindingContext(b+"/"+i);if(T1.getProperty("@com.sap.vocabularies.UI.v1.Hidden")===true){return false;}if(!j&&T1.getProperty("@com.sap.vocabularies.UI.v1.HiddenFilter")){return false;}if(b.split("/").length===2&&i.indexOf("/")<0){k=!_(a,b,i);}else{k=!w(a,b,i);}if(k&&T1){var U1=s(T1);if(U1){k=v.indexOf(U1)!==-1;}else{k=false;}}return k;}function y(a){return N(a).getShellServices();}function z(a,b,i){var j=S1.getShellServices(a);return j.getLinks({semanticObject:b,params:i});}function A(a){var b=[];var j=Object.keys(a);for(var i=0;i<j.length;i++){var k={"LocalProperty":{"$PropertyPath":j[i]},"SemanticObjectProperty":a[j[i]]};b.push(k);}return b;}function E(a,b,j,k){for(var i=0;i<a.length;i++){var T1=a[i];var U1=T1.intent;var V1=U1.split("-")[1].split("?")[0];if(b&&b.indexOf(V1)===-1){k.push({text:T1.text,targetSemObject:U1.split("#")[1].split("-")[0],targetAction:V1.split("~")[0],targetParams:j});}}}function G(a,b,i,j){if(j&&j.length>0){var k=a.unavailableActions?a.unavailableActions:[];var T1=a.mapping?A(a.mapping):[];var U1={navigationContexts:b,semanticObjectMapping:T1};E(j,k,U1,i);}}function I(b,a,i,k,T1,U1){var V1=y(i),W1={},X1="",Y1="";var Z1;var $1=[];var _1=[];if(a){if(k&&k.length>0){for(var j=0;j<k.length;j++){var a2=k[j].$PropertyPath;if(!W1[a2]){W1[a2]={value:a[a2]};}}}else{var b2=T1.getObject(U1+"/$Type/$Key");for(var c2 in b2){var d2=b2[c2];if(!W1[d2]){W1[d2]={value:a[d2]};}}}}var e2=O(i).getViewData();var f2=[];if(e2.additionalSemanticObjects){var g2=Object.keys(e2.additionalSemanticObjects);for(var c2=0;c2<g2.length;c2++){z(i,g2[c2],W1).then(G.bind(this,e2.additionalSemanticObjects[g2[c2]],b,f2)).catch(function(i2){L.error("Error while retrieving SO Intents",i2);});}}function h2(){var i2=V1.parseShellHash(document.location.hash);X1=i2.semanticObject;Y1=i2.action;return z(i,X1,W1);}h2().then(function(i2){if(i2&&i2.length>0){var j2={};var k2=[];var l2=U1+"@";var m2=U1+"/@";var n2=T1.getObject(l2);Z1=J(n2,X1);if(!Z1.bHasEntitySetSO){var o2=T1.getObject(m2);Z1=J(o2,X1);}_1=Z1.aUnavailableActions;_1.push(Y1);j2.navigationContexts=b;j2.semanticObjectMapping=Z1.aMappings;E(i2,_1,j2,k2);$1=k2.concat(f2);i.getBindingContext("internal").setProperty("relatedApps/visibility",$1.length>0);i.getBindingContext("internal").setProperty("relatedApps/items",$1);}else{i.getBindingContext("internal").setProperty("relatedApps/visibility",false);}}).catch(function(i2){L.error("Cannot read links",i2);});return $1;}function J(a,b){var i={bHasEntitySetSO:false,aUnavailableActions:[],aMappings:[]};var j,k;var T1;for(var U1 in a){if(U1.indexOf("com.sap.vocabularies.Common.v1.SemanticObject")>-1&&a[U1]===b){i.bHasEntitySetSO=true;j="@com.sap.vocabularies.Common.v1.SemanticObjectMapping";k="@com.sap.vocabularies.Common.v1.SemanticObjectUnavailableActions";if(U1.indexOf("#")>-1){T1=U1.split("#")[1];j=j+"#"+T1;k=k+"#"+T1;}i.aMappings=i.aMappings.concat(a[j]);i.aUnavailableActions=i.aUnavailableActions.concat(a[k]);break;}}return i;}function U(a){var b=a.getModel().getMetaModel();var i=a.getBindingContext();var j=i&&i.getPath();var k=b.getMetaPath(j);var T1=k+"/"+"@com.sap.vocabularies.Common.v1.SemanticKey";var U1=b.getObject(T1);var V1=i.getObject();if(!V1){i.requestObject().then(function(V1){return I(i,V1,a,U1,b,k);}).catch(function(W1){L.error("Cannot update the related app details",W1);});}else{return I(i,V1,a,U1,b,k);}}function K(b){var a=["sap.m.Button","sap.m.OverflowToolbarButton"];if(b&&a.indexOf(b.getMetadata().getName())!==-1&&b.getVisible()&&b.getEnabled()){b.firePress();}}function R(a){if(a==="true"||a===true){return true;}else{return false;}}function N(a){if(a.isA("sap.fe.core.AppComponent")){return a;}var b=C.getOwnerComponentFor(a);if(!b){return a;}else{return N(b);}}function O(a){if(a&&a.isA("sap.ui.core.ComponentContainer")){a=a.getComponentInstance();a=a&&a.getRootControl();}while(a&&!(a instanceof V)){a=a.getParent();}return a;}function Q(a,b,i,j,k){var T1=i.getModel();var U1=false;var V1=T1.bindContext(i.getPath()+"/DraftAdministrativeData").getBoundContext();if(i&&i.getObject()&&(!i.getObject().DraftAdministrativeData||i.getObject().IsActiveEntity===true)){a();}else{V1.requestObject().then(function(W1){if(W1){U1=!(W1.CreationDateTime===W1.LastChangeDateTime);if(U1){D.performAfterDiscardorKeepDraft(a,b,j,k);}else{a();}}else{a();}}).catch(function(W1){L.error("Cannot retrieve draftDataContext information",W1);});}}function W(a,b,i,j){var k=b.getModel("ui").getProperty("/isEditable"),T1=sap.ui.getCore().getLibraryResourceBundle("sap.fe.templates"),U1=T1&&T1.getText("T_COMMON_UTILS_NAVIGATION_AWAY_MSG"),V1=T1&&T1.getText("T_COMMON_UTILS_NAVIGATION_AWAY_CONFIRM_BUTTON"),W1=T1&&T1.getText("T_COMMON_UTILS_NAVIGATION_AWAY_CANCEL_BUTTON");if(i===P.Sticky&&k){return M.warning(U1,{actions:[V1,W1],onClose:function(X1){if(X1===V1){var Y1=b&&b.getModel("internal");L.info("Navigation confirmed.");if(Y1){Y1.setProperty("/sessionOn",false);}else{L.warning("Local UIModel couldn't be found.");}a();}else{L.info("Navigation rejected.");}}});}return a();}function Y(a,b){var i=false,j=a.split("/");if(j.length>1){i=b[j[0]]&&b[j[0]].hasOwnProperty(j[1])&&b[j[0]][j[1]]===0;}else{i=b[a]===0;}return i;}function Z(a,b){var k=[];for(var i=0;i<a.length;i++){var T1=a[i].entitySet,U1=a[i].contextData,V1;delete U1["@odata.context"];delete U1["%40odata.context"];delete U1["@odata.metadataEtag"];delete U1["%40odata.metadataEtag"];delete U1["SAP__Messages"];V1=Object.keys(U1);for(var j=0;j<V1.length;j++){var W1=V1[j],X1=b.getObject("/"+T1+"/"+W1+"@");if(X1){if(X1["@com.sap.vocabularies.PersonalData.v1.IsPotentiallySensitive"]||X1["@com.sap.vocabularies.UI.v1.ExcludeFromNavigationContext"]||X1["@com.sap.vocabularies.Analytics.v1.Measure"]){delete U1[W1];}else if(X1["@com.sap.vocabularies.Common.v1.FieldControl"]){var Y1=X1["@com.sap.vocabularies.Common.v1.FieldControl"];if(Y1["$EnumMember"]&&Y1["$EnumMember"].split("/")[1]==="Inapplicable"){delete U1[W1];}else if(Y1["$Path"]&&S1.isFieldControlPathInapplicable(Y1["$Path"],U1)){delete U1[W1];}}}}k.push(U1);}return k;}function $(a,k){for(var b in k){if(k[b]!==a[b]){return false;}}return true;}function a1(a,b,i){var j=a.getObject(b+"/")||{},k={};for(var T1 in j){if(j.hasOwnProperty(T1)&&!/^\$/i.test(T1)&&j[T1].$kind&&$(j[T1],i||{$kind:"Property"})){k[T1]=j[T1];}}return k;}function b1(a,b){var i;if(a&&b){i=a.getObject(b+"@Org.OData.Capabilities.V1.FilterRestrictions/RequiredProperties");}return i;}function c1(a,i){var b=a&&a.getActions();if(b){b.forEach(function(j){if(j.isA("sap.ui.mdc.actiontoolbar.ActionToolbarAction")){j=j.getAction();}if(j.data("IBNData")){i.push(j);}});}return i;}function d1(i,a){var b=this;var j={};var k=function(T1){if(T1){var U1=Object.keys(T1);U1.map(function(V1){if(V1.indexOf("_")!==0&&V1.indexOf("odata.context")===-1){j[V1]={value:T1[V1]};}});}if(i.length){i.forEach(function(V1){var W1=V1.data("IBNData").semanticObject;var X1=V1.data("IBNData").action;b.getShellServices(a).getLinks({semanticObject:W1,action:X1,params:j}).then(function(Y1){V1.setVisible(V1.getVisible()&&Y1&&Y1.length===1);}).catch(function(Y1){L.error("Cannot retrieve the links from the shell service",Y1);});});}};if(a&&a.getBindingContext()){a.getBindingContext().requestObject().then(function(T1){return k(T1);}).catch(function(T1){L.error("Cannot retrieve the links from the shell service",T1);});}else{k();}}function e1(a,b,i,j){var k=a;if(b){if(j){var T1=f1(b.aCustomBundles,a+"|"+j);k=T1?a+"|"+j:a;}return b.getText(k,i);}b=sap.ui.getCore().getLibraryResourceBundle("sap.fe.core");return b.getText(k,i);}function f1(a,k){if(a.length){for(var i=a.length-1;i>=0;i--){var b=a[i].hasText(k);if(b){return true;}f1(a[i].aCustomBundles,k);}}return false;}function g1(a,b,i,j){i=!i?a.getObject(a.getPath()):i;var k=a.getPath().split("/@")[0];var T1=a.getObject(k).$Type;var U1=h1(a.getModel(),T1);if(U1){k="/"+U1;}if(j){return a.getObject(k+"/"+i+"@Org.OData.Core.V1.OperationAvailable");}if(b){return k+"/"+i;}else{return{sContextPath:k,sProperty:a.getObject(k+"/"+i+"@Org.OData.Core.V1.OperationAvailable/$Path"),sBindingParameter:a.getObject(k+"/"+i+"/@$ui5.overload/0/$Parameter/0/$Name")};}}function h1(a,b){var i=a.getObject("/");for(var k in i){if(typeof i[k]==="object"&&i[k].$Type===b){return k;}}}function i1(a,b){var i=a["@com.sap.vocabularies.Common.v1.Text"],j=i&&((a&&a["@com.sap.vocabularies.Common.v1.Text@com.sap.vocabularies.UI.v1.TextArrangement"])||(b&&b["@com.sap.vocabularies.UI.v1.TextArrangement"]));if(j){if(j.$EnumMember==="com.sap.vocabularies.UI.v1.TextArrangementType/TextOnly"){return"Description";}else if(j.$EnumMember==="com.sap.vocabularies.UI.v1.TextArrangementType/TextLast"){return"ValueDescription";}else if(j.$EnumMember==="com.sap.vocabularies.UI.v1.TextArrangementType/TextSeparate"){return"Value";}return"DescriptionValue";}return i?"DescriptionValue":"Value";}function j1(a){var b=a.getModel().getMetaModel();return b.getObject(b.getMetaPath(a.getPath())+"/$Type");}function k1(a,b,i){var j=b,k=a.indexOf("(");if(k>-1){var T1=a.slice(k+1,-1),U1=j1(j);while(U1!==T1){j=j.getBinding().getContext();if(j){U1=j1(j);}else{L.warn("Cannot determine target type to request property value for bound action invocation");return Promise.resolve(undefined);}}}return j.requestObject(i);}function l1(a,b,i,j){var k=i&&i.indexOf("/")===0?P1(i,a.getModel()):k1(b,a,i);return k.then(function(T1){return Promise.resolve({vPropertyValue:T1,oSelectedContext:a,sAction:b,sDynamicActionEnabledPath:j});});}function m1(i,a){return Promise.all(a).then(function(b){if(b.length){var j=[],k=[];b.forEach(function(T1){if(T1){if(T1.vPropertyValue){i.getModel().setProperty(T1.sDynamicActionEnabledPath,true);j.push(T1.oSelectedContext);}else{k.push(T1.oSelectedContext);}}});n1(i,b[0].sAction,j,k);}}).catch(function(b){L.trace("Cannot retrieve property value from path",b);});}function n1(i,a,b,j){var k=i.getPath()+"/dynamicActions/"+a,T1=i.getModel();T1.setProperty(k+"/aApplicable",b);T1.setProperty(k+"/aNotApplicable",j);}function o1(a,b,j){var k=[];for(var T1 in b){a.setProperty("dynamicActions/"+T1,{bEnabled:false,aApplicable:[],aNotApplicable:[]});var U1=[],V1=[],W1=b[T1],X1=a.getPath()+"/dynamicActions/"+T1+"/bEnabled";if(typeof W1==="object"&&W1!==null&&W1!==undefined){for(var i=0;i<j.length;i++){var Y1=j[i];if(Y1){var Z1=Y1.getObject();var $1=B.transformRecursively(W1,"Binding",function(b2){return B.constant(Z1[b2.path]);},true);var _1=B.compileBinding($1);if(_1==="true"){a.getModel().setProperty(X1,true);U1.push(Y1);}else{V1.push(Y1);}}}n1(a,T1,U1,V1);}else{var a2=[];for(var i=0;i<j.length;i++){var Y1=j[i];if(Y1){var Z1=Y1.getObject();if(W1===null&&!!Z1["#"+T1]){a.getModel().setProperty(X1,true);break;}else{a2.push(l1(Y1,T1,W1,X1));}}}k.push(m1(a,a2));}}return Promise.all(k);}function p1(a){var b=T.getDataTypeClassName(a);var i=T.getBaseType(b);return F.getOperatorsForType(i);}function q1(a,b){var i=a.filter(function(j){return b.indexOf(j)>-1;});return i.toString()||undefined;}function r1(i){var j=S1.AllowedExpressionsPrio;i.sort(function(a,b){return j.indexOf(a)-j.indexOf(b);});return i[0];}function s1(a,b,i,j,k,T1){var U1=S1.getFilterRestrictionsByPath(b,i);var V1=["EQ"];var W1=["EQ","GE","LE","LT","GT","BT","NOTLE","NOTLT","NOTGE","NOTGT"];var X1=["EQ","GE","LE","LT","GT","BT","NE","NOTBT","NOTLE","NOTLT","NOTGE","NOTGT"];var Y1=["Contains","NotContains","StartsWith","NotStartsWith","EndsWith","NotEndsWith"];var Z1=f.getSupportedOperations();var $1=k==="true"||k===true;var _1=[];var a2=typeof T1==="string"?JSON.parse(T1).customData:T1;if(i.getObject(b+"/@com.sap.vocabularies.Common.v1.ResultContext")===true){return V1.toString();}if(a2&&a2.operatorConfiguration&&a2.operatorConfiguration.length>0){_1=f.getFilterOperations(a2.operatorConfiguration);}else{_1=f.getSemanticDateOperations();}var b2=p1(j);if(U1&&U1.FilterAllowedExpressions&&U1.FilterAllowedExpressions[a]){if($1){b2=Z1.concat(b2);}var c2=S1.getSpecificAllowedExpression(U1.FilterAllowedExpressions[a]);var d2;switch(c2){case"SingleValue":d2=q1(b2,V1);break;case"MultiValue":d2=q1(b2,V1);break;case"SingleRange":var e2=q1(b2,j==="Edm.Date"&&$1?_1:W1);d2=e2?e2:"";break;case"MultiRange":d2=q1(b2,X1);break;case"SearchExpression":d2=q1(b2,Y1);break;case"MultiRangeOrSearchExpression":d2=q1(b2,Y1.concat(X1));break;default:break;}return d2;}else if(j==="Edm.Date"){_1=f.getSemanticDateOperations();var f2=b2.filter(function(g2){return _1.indexOf(g2)<0;});return f2.toString();}}function t1(a,b){var i=b.substring(0,b.lastIndexOf("/"));var j=a.getObject(i+"/@com.sap.vocabularies.Common.v1.ResultContext");var k={};if(j&&i!==b){k.contextPath=i;k.parameterProperties=S1.getContextPathProperties(a,i);}return k;}function u1(a,b,i,j){var k=g.getConditions(j,a);if(k){if(!b||b.indexOf(k.operator)>-1){i.push(k);}}return i;}function v1(a,b,i,j,k,T1,U1,V1,W1){var X1=[],Y1,Z1;if(W1||S1.isPropertyFilterable(V1,a,T1,true)){Y1=b.getSelectOption(i);Z1=W1?["EQ"]:S1.getOperatorsForProperty(T1,a,V1);var $1=U1[T1];X1=W1?u1($1,Z1,X1,Y1[0]):Y1.reduce(u1.bind(null,$1,Z1),X1);if(X1.length){if(k){j[k+T1]=j.hasOwnProperty(k+T1)?j[k+T1].concat(X1):X1;}else{j[T1]=j.hasOwnProperty(T1)?j[T1].concat(X1):X1;}}}}function w1(a,b,i,j){var k=a.getSelectOptionsPropertyNames(),T1=S1.getContextPathProperties(i,j),U1=Object.keys(T1),V1=S1.getParameterInfo(i,j),W1=V1.contextPath,X1=V1.parameterProperties,Y1=!!V1.contextPath&&X1&&Object.keys(X1).length>0;if(Y1){var Z1=Object.keys(X1);Z1.forEach(function($1){var _1;if(k.includes("$Parameter."+$1)){_1="$Parameter."+$1;}else if(k.includes($1)){_1=$1;}else if($1.startsWith("P_")&&k.includes("$Parameter."+$1.slice(2,$1.length))){_1="$Parameter."+$1.slice(2,$1.length);}else if($1.startsWith("P_")&&k.includes($1.slice(2,$1.length))){_1=$1.slice(2,$1.length);}else if(k.includes("$Parameter.P_"+$1)){_1="$Parameter.P_"+$1;}else if(k.includes("P_"+$1)){_1="P_"+$1;}if(_1){v1(W1,a,_1,b,undefined,$1,X1,i,true);}});}U1.forEach(function($1){var _1;if(k.includes($1)){_1=$1;}else if($1.startsWith("P_")&&k.includes($1.slice(2,$1.length))){_1=$1.slice(2,$1.length);}else if(k.includes("P_"+$1)){_1="P_"+$1;}if(_1){v1(j,a,_1,b,undefined,$1,T1,i,false);}});k.forEach(function($1){if($1.indexOf(".")>0&&!$1.includes("$Parameter")){var _1=("/"+$1.replaceAll(".","/")).startsWith(j)?"/"+$1.replaceAll(".","/"):j+"/"+$1.replaceAll(".","/");if(i.getObject(_1.replace("P_",""))){x1(_1,j,a,$1,i,b);}}});return b;}function x1(a,b,j,k,T1,U1){var V1=k.split(".");if(("/"+k.replaceAll(".","/")).startsWith(b)){var W1=("/"+k).replaceAll(".","/"),X1=W1.replace(b+"/","");V1=X1.split("/");}var Y1="";var Z1=V1[V1.length-1];for(var i=0;i<V1.length-1;i++){if(T1.getObject(b+"/"+V1[i].replace("P_","")).$isCollection){Y1=Y1+V1[i]+"*/";}else{Y1=Y1+V1[i]+"/";}b=b+"/"+V1[i];}var $1=a.slice(0,a.lastIndexOf("/")),_1=S1.getContextPathProperties(T1,$1),a2=j.getSelectOptionsPropertyNames();var b2=Z1;if(_1[Z1]){b2=Z1;}else if(Z1.startsWith("P_")&&_1[Z1.replace("P_","")]){b2=Z1.replace("P_","");}else if(_1["P_"+Z1]&&a2.includes("P_"+Z1)){b2="P_"+Z1;}if(Z1.startsWith("P_")&&U1[Y1+b2]){return;}else if(!Z1.startsWith("P_")&&U1[Y1+b2]){delete U1[Y1+b2];v1($1,j,k,U1,Y1,b2,_1,T1,false);}else{v1($1,j,k,U1,Y1,b2,_1,T1,false);}}function y1(a,b,i){var j=S1.getAppComponent(i);var k=j.getNavigationService();return k.mixAttributesAndSelectionVariant(b,a.toJSONString());}function z1(a,b,i){var j,k="",T1=null;var U1=function(Z1,$1,_1){var a2={option:"",sign:"I",low:$1,high:_1};switch(Z1){case"Contains":a2.option="CP";break;case"StartsWith":a2.option="CP";a2.low+="*";break;case"EndsWith":a2.option="CP";a2.low="*"+a2.low;break;case"BT":case"LE":case"LT":case"GT":case"NE":case"EQ":a2.option=Z1;break;case"EEQ":a2.option="EQ";break;case"Empty":a2.option="EQ";a2.low="";break;case"NotContains":a2.option="CP";a2.sign="E";break;case"NOTBT":a2.option="BT";a2.sign="E";break;case"NotStartsWith":a2.option="CP";a2.low+="*";a2.sign="E";break;case"NotEndsWith":a2.option="CP";a2.low="*"+a2.low;a2.sign="E";break;case"NotEmpty":a2.option="NE";a2.low="";break;case"NOTLE":a2.option="LE";a2.sign="E";break;case"NOTGE":a2.option="GE";a2.sign="E";break;case"NOTLT":a2.option="LT";a2.sign="E";break;case"NOTGT":a2.option="GT";a2.sign="E";break;default:L.warning(Z1+" is not supported. "+j+" could not be added to the navigation context");}return a2;};var V1=b.filterConditions;var W1=b.filterConditionsWithoutConflict?b.filterConditionsWithoutConflict:{};var X1=i.propertiesWithoutConflict?i.propertiesWithoutConflict:{};var Y1=function(a,j,Z1){var $1=V1[j];for(var _1 in $1){var a2=$1[_1];k=(a2.values[0]&&a2.values[0].toString())||"";T1=(a2.values[1]&&a2.values[1].toString())||null;var b2=U1(a2.operator,k,T1);if(b2.option){a.addSelectOption(Z1?Z1:j,b2.sign,b2.option,b2.low,b2.high);}}};for(var j in V1){if(!a.getSelectOption(j)){if(j==="$editState"){continue;}Y1(a,j);}else{if(X1&&j in X1){Y1(a,j,X1[j]);}if(j in W1){Y1(a,j,W1[j]);}}}return a;}function A1(a){var i=e.isStickySessionSupported(a.getModel().getMetaModel());var b=a.getModel("ui").getProperty("/isEditable");return i&&b;}function B1(a,b,j){if(b&&a&&a.length){for(var i=0;i<a.length;i++){var k=b.getSelectOption("DisplayCurrency"),T1=j&&j.getSelectOption("DisplayCurrency");if(a[i].$PropertyPath==="DisplayCurrency"&&(!k||!k.length)&&T1&&T1.length){var U1=T1[0];var V1=U1["Sign"];var W1=U1["Option"];var X1=U1["Low"];var Y1=U1["High"];b.addSelectOption("DisplayCurrency",V1,W1,X1,Y1);}}}}function C1(a,b){var i=a.getObject(b+"/").$Key;var j=[];var k=a.getObject(b+"/");for(var T1 in k){if(k[T1].$kind&&k[T1].$kind==="Property"){var U1=a.getObject(b+"/"+T1+"@")||{},V1=i.indexOf(T1)>-1,W1=V1||U1["@Org.OData.Core.V1.Immutable"],X1=!U1["@Org.OData.Core.V1.Computed"],Y1=!U1["@com.sap.vocabularies.UI.v1.Hidden"];if(W1&&X1&&Y1){j.push(T1);}}}return j;}function D1(a,b,j,k,T1,U1){return new Promise(function(V1,W1){var X1=a.getComponentData(),Y1=(X1&&X1.startupParameters)||{},Z1=a.getShellServices();if(!Z1.hasUShell()){b.map(function(i){var $1=k?"/"+i.$Name:i.getPath().slice(i.getPath().lastIndexOf("/")+1);var _1=k?$1.slice(1):$1;if(U1&&T1){if(U1[_1]){j.setProperty($1,U1[_1]);}}else if(Y1[_1]){j.setProperty($1,Y1[_1][0]);}});return V1(true);}return Z1.getStartupAppState(a).then(function($1){var _1=$1.getData()||{},a2=(_1.selectionVariant&&_1.selectionVariant.SelectOptions)||[];b.map(function(b2){var c2=k?"/"+b2.$Name:b2.getPath().slice(b2.getPath().lastIndexOf("/")+1);var d2=k?c2.slice(1):c2;if(U1&&T1){if(U1[d2]){j.setProperty(c2,U1[d2]);}}else if(Y1[d2]){j.setProperty(c2,Y1[d2][0]);}else if(a2.length>0){for(var i in a2){var e2=a2[i];if(e2.PropertyName===d2){var f2=e2.Ranges.length?e2.Ranges[0]:undefined;if(f2&&f2.Sign==="I"&&f2.Option==="EQ"){j.setProperty(c2,f2.Low);}}}}});return V1(true);});});}function E1(a,b){var j=b,k=j?Object.keys(j).filter(function(W1){return j[W1].useForCreate;}):[],T1;for(var i=0;i<k.length;i++){var U1=k[i];var V1=a&&a[U1];if(V1&&V1.length===1){T1=T1||Object.create(null);T1[U1]=V1[0];}}return T1;}function F1(a){var b=[];if(a.parameters){var j=Object.keys(a.parameters)||[];if(j.length>0){j.forEach(function(k){var T1=a.parameters[k];if(T1.value&&T1.value.value&&T1.value.format==="binding"){var U1={"LocalProperty":{"$PropertyPath":T1.value.value},"SemanticObjectProperty":k};if(b.length>0){for(var i=0;i<b.length;i++){if(b[i]["LocalProperty"]["$PropertyPath"]!==U1["LocalProperty"]["$PropertyPath"]){b.push(U1);}}}else{b.push(U1);}}});}}return b;}function G1(a,b){var i=[];var j={};var k;var T1=a.controlConfiguration;for(var U1 in T1){if(U1.indexOf("@com.sap.vocabularies.UI.v1.DataPoint")>-1||U1.indexOf("@com.sap.vocabularies.UI.v1.Chart")>-1){if(T1[U1].navigation&&T1[U1].navigation.targetOutbound&&T1[U1].navigation.targetOutbound.outbound){var V1=T1[U1].navigation.targetOutbound.outbound;var W1=b[V1];if(W1.semanticObject&&W1.action){if(U1.indexOf("Chart")>-1){k=c.generate(["fe","MicroChartLink",U1]);}else{k=c.generate(["fe","HeaderDPLink",U1]);}var i=S1.getSemanticObjectMapping(W1);j[k]={semanticObject:W1.semanticObject,action:W1.action,semanticObjectMapping:i};}else{L.error("Cross navigation outbound is configured without semantic object and action for "+V1);}}}}return j;}function H1(a,b){var j=typeof b==="string"?JSON.parse(b):b;for(var i=0;i<j.length;i++){var k=(j[i]["LocalProperty"]&&j[i]["LocalProperty"]["$PropertyPath"])||(j[i]["@com.sap.vocabularies.Common.v1.LocalProperty"]&&j[i]["@com.sap.vocabularies.Common.v1.LocalProperty"]["$Path"]);var T1=j[i]["SemanticObjectProperty"]||j[i]["@com.sap.vocabularies.Common.v1.SemanticObjectProperty"];if(a.getSelectOption(k)){var U1=a.getSelectOption(k);a.removeSelectOption(k);a.massAddSelectOption(T1,U1);}}return a;}function I1(a,b,i,j){return new Promise(function(k){var T1=a.getObject(b+"@com.sap.vocabularies.Common.v1.SemanticObject");var U1=a.getObject(b+"@com.sap.vocabularies.Common.v1.SemanticObjectUnavailableActions");var V1,W1;V1=[{semanticObject:T1}];W1={semanticObject:T1};k({semanticObjectPath:b,semanticObjectForGetLinks:V1,semanticObject:W1,unavailableActions:U1});}).catch(function(k){L.error("Error in fnGetSemanticObjectsFromPath",k);});}function J1(a,b,j,T1){return Promise.all(a).then(function(U1){var V1,W1,X1,Y1=[];var Z1={};var $1=function(g2,h2){for(var i2 in h2){if(i2===g2){return true;}else{return false;}}};for(var k=0;k<U1.length;k++){V1=U1[k];if(V1&&V1.length>0&&V1[0]!==undefined){var _1={},a2={},b2;for(var i=0;i<V1.length;i++){Y1.push([]);var c2=false;var d2=false;for(var e2=0;e2<V1[i][0].length;e2++){W1=V1[i][0][e2];X1=W1&&W1.intent.split("-")[1];if(!(W1&&W1.intent&&W1.intent.indexOf(T1)===0)){c2=true;if(!$1(X1,b[k].unavailableActions)){Y1[i].push(W1);d2=true;}}}a2={semanticObject:b[k].semanticObject,path:b[k].path,HasTargets:d2,HasTargetsNotFiltered:c2};if(_1[b[k].semanticObject]===undefined){_1[b[k].semanticObject]={};}b2=b[k].path.replace(/\//g,"_");if(_1[b[k].semanticObject][b2]===undefined){_1[b[k].semanticObject][b2]={};}_1[b[k].semanticObject][b2]=Object.assign(_1[b[k].semanticObject][b2],a2);}var f2=Object.keys(_1)[0];if(Object.keys(Z1).includes(f2)){Z1[f2]=Object.assign(Z1[f2],_1[f2]);}else{Z1=Object.assign(Z1,_1);}Y1=[];}}if(Object.keys(Z1).length>0){j.setProperty("semanticsTargets",o(Z1,j.getProperty("semanticsTargets")));return Z1;}}).catch(function(i){L.error("fnUpdateSemanticTargetsModel: Cannot read links",i);});}function K1(a,b,i,j){var k;var T1=e.getEntitySetPath(j),U1=T1,V1=U1?U1.slice(1):U1;var W1=m.getInvolvedDataModelObjects(i.createBindingContext("/"+V1));k=n.createConverterContextForMacro(W1.startingEntitySet.name,i,a&&a.getDiagnostics(),o,W1.contextLocation,undefined);return S1.getSemanticObjectsFromPath(i,j,b,k);}function L1(a,b){var k=function(j,h2){return T1(j,h2,[]);};var T1=function(j,h2,i2){if(!j){return i2;}if(j instanceof Array){for(var i in j){i2=i2.concat(T1(j[i],h2,[]));}return i2;}if(j[h2]){i2.push(j[h2]);}if(typeof j=="object"&&j!==null){var j2=Object.keys(j);if(j2.length>0){for(i=0;i<j2.length;i++){i2=i2.concat(T1(j[j2[i]],h2,[]));}}}return i2;};var U1=function(j){return j.filter(function(h2,i2){return j.indexOf(h2)===i2;});};var V1=a.getView();var W1=V1.getBindingContext("internal");if(W1){var X1=[];var Y1=a.getOwnerComponent();var Z1=sap.ui.core.Component.getOwnerComponentFor(Y1);var $1=Z1.getMetaModel();var _1=Y1.getModel(b).getData();if(JSON.stringify(_1)==="{}"){_1=Y1.getModel(b)._getObject("/",undefined);}var a2=k(_1,"semanticObjectPath");a2=U1(a2);var b2=S1.getShellServices(Z1);var c2=b2.hrefForExternal();var d2=[];var e2=[];var f2;var g2;if(c2&&c2.indexOf("?")!==-1){c2=c2.split("?")[0];}for(var i=0;i<a2.length;i++){f2=a2[i];X1.push(S1.getSemanticObjectPromise(Z1,V1,$1,f2));}if(X1.length===0){return Promise.resolve();}else{Promise.all(X1).then(function(h2){var i2=[],j2;var k2=h2.filter(function(l2){if(l2.semanticObject!==undefined&&l2.semanticObject.semanticObject&&typeof l2.semanticObject.semanticObject==="object"){j2=B.compileBinding(B.bindingExpression(l2.semanticObject.semanticObject.$Path));l2.semanticObject.semanticObject=j2;l2.semanticObjectForGetLinks[0].semanticObject=j2;return true;}else if(l2){return l2.semanticObject!==undefined;}else{return false;}});for(var j=0;j<k2.length;j++){g2=k2[j];if(g2&&g2.semanticObject&&!(g2.semanticObject.semanticObject.indexOf("{")===0)){d2.push(g2.semanticObjectForGetLinks);e2.push({semanticObject:g2.semanticObject.semanticObject,unavailableActions:g2.unavailableActions,path:k2[j].semanticObjectPath});i2.push(b2.getLinksWithCache([g2.semanticObjectForGetLinks]));}}return S1.updateSemanticTargets(i2,e2,W1,c2);}).catch(function(j){L.error("fnGetSemanticTargetsFromTable: Cannot get Semantic Objects",j);});}}else{return Promise.resolve();}}function M1(a,b){var i=S1.FilterRestrictions;if(b===i.REQUIRED_PROPERTIES||b===i.NON_FILTERABLE_PROPERTIES){var j=[];if(a&&a[b]){j=a[b].map(function(T1){return T1.$PropertyPath;});}return j;}else if(b===i.ALLOWED_EXPRESSIONS){var k={};if(a&&a.FilterExpressionRestrictions){a.FilterExpressionRestrictions.forEach(function(T1){if(k[T1.Property.$PropertyPath]){k[T1.Property.$PropertyPath].push(T1.AllowedExpressions);}else{k[T1.Property.$PropertyPath]=[T1.AllowedExpressions];}});}return k;}return a;}function N1(a,b){var i={},j=S1.FilterRestrictions,k=a?b.getObject(a+"@Org.OData.Capabilities.V1.FilterRestrictions"):{};i[j.REQUIRED_PROPERTIES]=M1(k,j.REQUIRED_PROPERTIES)||[];i[j.NON_FILTERABLE_PROPERTIES]=M1(k,j.NON_FILTERABLE_PROPERTIES)||[];i[j.ALLOWED_EXPRESSIONS]=M1(k,j.ALLOWED_EXPRESSIONS)||{};var T1=a.split("/");if(T1.length>2){var U1=T1[T1.length-1];T1.splice(-1,1);var V1=T1.join("/");var W1=S1.getNavigationRestrictions(b,V1,U1);var X1=W1&&W1["FilterRestrictions"];i[j.REQUIRED_PROPERTIES].concat(M1(X1,j.REQUIRED_PROPERTIES)||[]);i[j.NON_FILTERABLE_PROPERTIES].concat(M1(X1,j.NON_FILTERABLE_PROPERTIES)||[]);i[j.ALLOWED_EXPRESSIONS]=o({},M1(X1,j.ALLOWED_EXPRESSIONS)||{},i[j.ALLOWED_EXPRESSIONS]);}return i;}function O1(a,b,i,j){i=i||{};if(j){return j.templateControlFragment(a,b,i.view).then(function(k){return j.targets==="xmlTree"&&k.length>0?k[0]:k;});}else{return R1().then(function(){return p.process(X.loadTemplate(a,"fragment"),{name:a},b);}).then(function(k){var T1=k.firstElementChild;if(!!i.isXML&&T1){return T1;}return q.load({id:i.id,definition:k,controller:i.controller});});}}function P1(a,b){if(!a||!b){return Promise.resolve(null);}var i=b.getMetaModel();var j=a.split("/").filter(Boolean),k=j.pop(),T1=j.join("/"),U1=T1&&i.getObject("/"+T1);if(U1&&U1.$kind==="Singleton"){var V1=j[j.length-1],W1=b.bindProperty("/"+V1+"/"+k);return W1.requestValue();}return Promise.resolve(null);}function Q1(a,b,i){var j;var k=function(){if(j){if(!j.events){j.events={};}if(!j.events[b]){j.events[b]=i;}else{var T1=j.events[b];j.events[b]=function(){i.apply(this,arguments);T1.apply(this,arguments);};}}};if(a.isA("sap.ui.mdc.ChartNew")){a.innerChartBound().then(function(){j=a.getControlDelegate()._getChart(a).getBindingInfo("data");k();}).catch(function(T1){L.error(T1);});}else{j=a.data("rowsBindingInfo");k();}}function R1(){return new Promise(function(a,b){sap.ui.require(["sap/fe/macros/macroLibrary"],function(){a();});});}var S1={isPropertyFilterable:x,isFieldControlPathInapplicable:Y,removeSensitiveData:Z,fireButtonPress:K,getTargetView:O,hasTransientContext:H,updateRelatedAppsDetails:U,resolveStringtoBoolean:R,getAppComponent:N,processDataLossConfirmation:W,getMandatoryFilterFields:b1,getContextPathProperties:a1,getParameterInfo:t1,updateDataFieldForIBNButtonsVisibility:d1,getTranslatedText:e1,getEntitySetName:h1,getActionPath:g1,computeDisplayMode:i1,setActionEnablement:o1,isStickyEditMode:A1,getOperatorsForProperty:s1,addSelectionVariantToConditions:w1,addExternalStateFiltersToSelectionVariant:z1,addPageContextToSelectionVariant:y1,addDefaultDisplayCurrency:B1,getNonComputedVisibleFields:C1,setUserDefaults:D1,getShellServices:y,getIBNActions:c1,getHeaderFacetItemConfigForExternalNavigation:G1,getSemanticObjectMapping:F1,setSemanticObjectMappings:H1,getSemanticObjectPromise:K1,getSemanticTargetsFromPageModel:L1,getSemanticObjectsFromPath:I1,updateSemanticTargets:J1,getPropertyDataType:s,getNavigationRestrictions:u,getSearchRestrictions:t,getFilterRestrictionsByPath:N1,getSpecificAllowedExpression:r1,getAdditionalParamsForCreate:E1,requestSingletonProperty:P1,templateControlFragment:O1,addEventToBindingInfo:Q1,FilterRestrictions:{REQUIRED_PROPERTIES:"RequiredProperties",NON_FILTERABLE_PROPERTIES:"NonFilterableProperties",ALLOWED_EXPRESSIONS:"FilterAllowedExpressions"},AllowedExpressionsPrio:["SingleValue","MultiValue","SingleRange","MultiRange","SearchExpression","MultiRangeOrSearchExpression"],fnProcessDataLossOrDraftDiscardConfirmation:Q,normalizeSearchTerm:r};return S1;});
