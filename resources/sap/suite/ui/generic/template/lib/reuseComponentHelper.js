sap.ui.define([],function(){"use strict";var e=Object.create(null);function E(o,p){e[o.getId()]=p;}function t(c,r,s,o,a){var b=a.getId();var p=e[b];delete e[b];p.fnExtensionAPIAvailable(o.extensionAPI);delete p.fnExtensionAPIAvailable;r[s]=p;var S=o.subSectionId&&c.oController.byId(o.subSectionId);var C=S&&S.getCustomData();if(C){C.forEach(function(d){if(d.getKey()==="stRefreshTrigger"){var B=d.getBinding("value");var f=!B&&d.getBindingInfo("value");if(!B&&!f){return;}var v;var R=function(h){var i=h.getSource();var n=i.getExternalValue();if(v!==n){v=n;p.pathUnchangedCallBack(true);}};var g=R;if(B){B.attachChange(g);}else{f.events={change:g};}}});}}return{embeddedComponentMixInto:E,transferEmbeddedComponentProxy:t};});
