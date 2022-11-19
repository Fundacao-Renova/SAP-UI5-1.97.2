/*
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define("sap/zen/dsh/utils/EmccLoader",["jquery.sap.global","sap/base/Log","sap/zen/commons/thirdparty/lodash","sap/zen/dsh/firefly/ff2210.ui.native"],function(q,L,_){q.sap.declare("sap.zen.dsh.utils.EmccLoader");function r(s,n){var f=sap.firefly.XFile.createExt(s,"vfs://"+n,sap.firefly.PathFormat.URL,sap.firefly.VarResolveMode.NONE);return f.loadExt().getString();}function w(s,n,c){var f=sap.firefly.XFile.createExt(s,"vfs://"+n,sap.firefly.PathFormat.URL,sap.firefly.VarResolveMode.NONE);var C=sap.firefly.XContent.createStringContent(sap.firefly.ContentType.TEXT,c);f.saveExt(C,sap.firefly.CompressionType.NONE);}function E(p,b){var t=this;var S;var i=[];var I;var h=function(s){i.push(s);if(I){var R=i[0];i=_.drop(i);I(R);}};t.getInputPromise=function(){function a(c){I=c;}return new Promise(a);};t.getInputCallback=function(){return h;};if(b.println){t.print=function(n){b.print(String.fromCharCode(n));};t.printString=b.println.bind(b);}else{t.print=function(a){if(arguments.length>1){a=Array.prototype.slice.call(arguments).join(" ");}if(b.getValue()===""){b.setValue(b.getValue()+a);}else{b.setValue(b.getValue()+"\n"+a);}};t.printErr=function(a){if(arguments.length>1)a=Array.prototype.slice.call(arguments).join(" ");L.error(a);};}t.setStatus=function(a){window.title=a;};t.totalDependencies=0;t.locateFile=function(){return p+".wasm";};t.noInitialRun=true;var f=null;if(b.getSession){b.getSession().registerOnExit=function(H){f=H;};b.getSession().registerOnStart=function(H){S=H;};}t.loadProgram=function(){var R,a;function c(e,g){R=e;a=g;}var d=null,n;sap.ui.require([p],function(P){var D=null;R({run:function(){t.arguments=_.map(arguments);var o=new P(t);Object.defineProperty(t,"keyboardListeningElement",{get:function(){return D;}});t.getSession=function(){return b.getSession?b.getSession():null;};t.ff_openWindowPromise=function(s){var R,a;var A=sap.firefly.ApplicationFactory.createDefaultApplication();var u=A.getUiManager();var F=u.getFreeGenesis();function l(e,v){R=e;a=v;}var m=new Promise(l);var W=F.newControl(sap.firefly.UiType.WINDOW);W.registerOnClose({onClose:function(){t.ff_exit();}});W.registerOnOpen({onOpen:function(){try{var v=F.newControl(sap.firefly.UiType.HTML);v.registerOnLoadFinished({onLoadFinished:function(){R(W);}});W.setContent(v);v.setValue("<canvas width='100%' height='100%'/>");}catch(e){a(e);}}});W.registerOnButtonPress({onButtonPress:function(e){switch(e.getParameters().getStringByKeyExt("pressedButtonType")){case"CloseBtn":W.close();break;case"MaximizeBtn":W.maximize();break;case"MinimizeBtn":W.minimize();break;}}});W.open();return m.then(function(){W.setTitle(s);return W.getContent().getNativeControl().getDomRef().children[0];});};t.ff_openWindow=function(s){return o.getAsyncify().handleAsync(function(){var R,a;function c(e,l){R=e;a=l;}Promise.resolve(null).then(function(){return t.ff_openWindowPromise(s);}).then(function(C){t.canvas=C;R(0);}).catch(function(e){L.error(e);a(e);});return new Promise(c);});};t.inputAsync=function(){return o.getAsyncify().handleAsync(function(){var l;var R,a;function c(e,m){R=e;a=m;}Promise.resolve(null).then(function(){return(d===null)?t.getInputPromise():null;}).then(function(s){try{L.info("line read");if(typeof(s)==="string"){d=s;n=0;}if(n<d.length){l=d.charCodeAt(n);n++;R(l);}else{d=null;R(13);}}catch(e){L.error(e);a(e);}}).catch(function(e){L.error(e);a(e);});return new Promise(c);});};t.readVfsFile=r.bind(t,t.getSession());t.writeVfsFile=w.bind(t,t.getSession());t.preRun=function(){if(o.getFS){o.getFS().init(function(){L.error("Input");return o.getAsyncify().handleAsync(function(){var R;function c(e,l){R=e;a=l;}Promise.resolve(null).then(function(){var s=window.prompt();R(s.length?s.charCodeAt(0):null);});return new Promise(c);});},t.print,t.print);}if(S){S();}};var g;t.ff_exit=function(e){g(e);};function c(R){g=R;}var j=new Promise(c);var k=o.run.apply(o,arguments);if(k&&k.then){return k;}else{return j;}}});},function(o){try{b.print("Source program not found");if(f){f();}a(o);}catch(e){a(e);}});return new Promise(c);};}sap.zen.dsh.utils.EmccLoader=E;sap.firefly.emccLoader=function(){var t=this;sap.firefly.DfProgram.apply(t,arguments);t.newProgram=function(){var n=new sap.firefly.emccLoader();n.setup();return n;};t.runProcess=function(){var t=this;var l=new E(["programs",t.getArguments().getArgumentList().get(0),t.getArguments().getArgumentList().get(0)].join("/"),t);t.getProcess().getParentProcess().getProgramCfg().getProgramContainer().getTerminalContainer().getWindow().enableCaptureMode(l.getInputCallback());l.loadProgram().then(function(p){return p.run.apply(p,t.getArguments().getArgumentList().getListFromImplementation().slice(1));}).then(function(n){L.info("Exit: "+n);t.getProcess().getParentProcess().getProgramCfg().getProgramContainer().getTerminalContainer().getWindow().disableCaptureMode();t.exitNow(0|n);}).catch(function(e){L.error(e);t.getProcess().getParentProcess().getProgramCfg().getProgramContainer().getTerminalContainer().getWindow().disableCaptureMode();t.exitNow(13);});};};sap.firefly.emccLoader.prototype=new sap.firefly.DfProgram();sap.firefly.ProgramRegistration.setProgramFactory("source",new sap.firefly.emccLoader());return E;});