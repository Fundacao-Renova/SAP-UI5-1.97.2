sap.ui.define(["sap/ui/model/odata/AnnotationHelper","sap/m/Text"],function(A,T){"use strict";function g(m,E,a,r){var M=m.getMetaModel();var o=M.getContext(M.getMetaContext("/"+E).getPath()+a);var p=A.format(o);if(p){var b=p.match(/{@i18n>.+}/gi);if(b){var s="{@i18n>";b[0].split(s).forEach(function(i){if(i){var n=i.indexOf("}");var I=i.substring(0,n);var c=r?r.getText(I):"";p=p.replace(s+i.substring(0,n+1),c);}});}}return p||"";}var e={getAnnotationFormatter:function(m,E,a,r){var h=new T();h.applySettings({text:g(m,E,a,r)});h.setModel(m);return{format:function(c){h.setBindingContext(c);return h.getText();},done:function(){h.destroy();}};}};return e;});