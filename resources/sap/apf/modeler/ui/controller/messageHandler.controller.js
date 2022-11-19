/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
sap.ui.define(["sap/m/MessageBox","sap/ui/thirdparty/jquery","sap/base/security/encodeXML","sap/base/Log"],function(M,q,e,L){"use strict";var c;function _(o){var t=o.getMessage();while(o.getPrevious()){o=o.getPrevious();t=t+'\n'+o.getMessage();}return t;}function a(C,D){var c=C.getView().getViewData();var i=c.getGenericExit("closeFatalErrorDialog");if(i){i(c,C,D);}else{window.history.go(-1);}}function b(o){sap.m.MessageBox.error(o.getMessage(),{styleClass:sap.ui.Device.system.desktop?"sapUiSizeCompact":""});}function d(o){sap.m.MessageBox.information(o.getMessage(),{styleClass:sap.ui.Device.system.desktop?"sapUiSizeCompact":""});}function f(o){sap.m.MessageToast.show(o.getMessage(),{width:"20em"});}function g(C,o){var D=new sap.m.Dialog(C.createId("idShowDetailsDialog"),{contentWidth:q(window).height()*0.6+"px",contentHeight:q(window).height()*0.6+"px",title:c.getText("error"),type:sap.m.DialogType.Message,state:sap.ui.core.ValueState.Error,content:new sap.ui.core.HTML({content:['<div><p> '+e(_(o))+'</p></div>'].join(""),sanitizeContent:true}),beginButton:new sap.m.Button({text:c.getText("close"),press:function(){D.close();}}),afterClose:function(){D.destroy();}}).addStyleClass("dialogContentPadding");D.setInitialFocus(D);D.open();}function h(C,o){var D=new sap.m.Dialog(C.createId("idFatalDialog"),{title:c.getText("error"),type:sap.m.DialogType.Message,state:sap.ui.core.ValueState.Error,content:[new sap.m.Text({text:c.getText("fatalErrorMessage")}),new sap.m.VBox({alignItems:sap.m.FlexAlignItems.End,items:[new sap.m.Link({text:c.getText("showDetailsLink"),press:function(){g(C,o);}})]})],beginButton:new sap.m.Button({text:c.getText("close"),press:function(){a(C,D);}}),afterClose:function(){D.destroy();}});D.setInitialFocus(D);D.open();}var m=sap.ui.core.mvc.Controller.extend("sap.apf.modeler.ui.controller.messageHandler",{onInit:function(){c=this.getView().getViewData();},showMessage:function(o){var C=this;var s=o.getSeverity();var S=sap.apf.core.constants.message.severity;switch(s){case S.fatal:h(C,o);break;case S.error:b(o);break;case S.success:f(o);break;case S.information:d(o);break;default:L.error("Error type not defined");break;}}});return m;},true);