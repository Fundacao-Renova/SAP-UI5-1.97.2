sap.ui.define(["sap/rules/ui/ast/autoComplete/node/TermNode","sap/rules/ui/ast/autoComplete/node/OperatorNode","sap/rules/ui/ast/constants/Constants","sap/rules/ui/ast/provider/TermsProvider","sap/rules/ui/ast/provider/OperatorProvider"],function(T,O,C,a,b){"use strict";var N=function(){};N.prototype.getNode=function(t,p){switch(t.getTokenType()){case C.TERM:var o=new T();var s=t.getText();s=s.replace(".","");s=s.replace(/\//g,".");s=s.replace(".","");if(s){var i=s.split(C.DOT);if(!a.getInstance().isTermParentEntity(i[0])&&p){s=p+C.DOT+s;}}var c=a.getInstance().getTermByTermId(s);if(c){var d=c.getBusinessDataType();var e=c.getDataObjectType();if(c._isDataObjectElement||c.isResultDataObjectElement){var f=a.getInstance()._getAllAttrsRefsAssocsForDataObject(c._termId)[0];d=f?f.getBusinessDataType():d;e=f?f.getDataObjectType():e;}e=e=="S"?"T":e;o.setName(c.getTermName()).setLabel(c.getLabel()).setId(c.getTermId()).setBusinessDataType(d).setDataObjectType(e);}else{}return o;case C.OPERATOR:var g=new O();var h=b.getInstance().getOperatorByName(t.getText().toUpperCase());g.setName(h.getName()).setLabel(h.getLabel());g.setOperatorMetadata(h);return g;case C.STRINGBUSINESSDATATYPE:case C.DATEBUSINESSDATATYPE:case C.BOOLEANBUSINESSDATATYPE:case C.TIMEBUSINESSDATATYPE:case C.QUANTITYBUSINESSDATATYPE:case C.AMOUNTBUSINESSDATATYPE:case C.NUMBERBUSINESSDATATYPE:case C.GEOBUSINESSDATATYPE:case C.UTC_TIMESTAMP:var l=new T();l.setName(t.getText()).setLabel(t.getText()).setBusinessDataType(t.getTokenType()).setDataObjectType("E");return l;default:break;}};N.prototype.getBusinessDataTypeOfGivenLiteral=function(l){var r=/^[0-9]+$/;if(r.test(l)==true){return C.NUMBERBUSINESSDATATYPE;}else if(typeof l===C.BOOLEAN){return C.BOOLEANBUSINESSDATATYPE;}else{return C.STRINGBUSINESSDATATYPE;}};return N;},true);