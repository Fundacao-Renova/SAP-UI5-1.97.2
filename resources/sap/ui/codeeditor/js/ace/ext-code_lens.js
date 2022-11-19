ace.define("ace/ext/code_lens",[],function(r,a,m){"use strict";var L=r("../line_widgets").LineWidgets;var b=r("../lib/event");var l=r("../lib/lang");var d=r("../lib/dom");function c(e){var t=e.$textLayer;var i=t.$lenses;if(i)i.forEach(function(j){j.remove();});t.$lenses=null;}function f(e,n){var o=e&n.CHANGE_LINES||e&n.CHANGE_FULL||e&n.CHANGE_SCROLL||e&n.CHANGE_TEXT;if(!o)return;var s=n.session;var p=n.session.lineWidgets;var t=n.$textLayer;var q=t.$lenses;if(!p){if(q)c(n);return;}var u=n.$textLayer.$lines.cells;var v=n.layerConfig;var w=n.$padding;if(!q)q=t.$lenses=[];var x=0;for(var i=0;i<u.length;i++){var y=u[i].row;var z=p[y];var A=z&&z.lenses;if(!A||!A.length)continue;var B=q[x];if(!B){B=q[x]=d.buildDom(["div",{class:"ace_codeLens"}],n.container);}B.style.height=v.lineHeight+"px";x++;for(var j=0;j<A.length;j++){var C=B.childNodes[2*j];if(!C){if(j!=0)B.appendChild(d.createTextNode("\xa0|\xa0"));C=d.buildDom(["a"],B);}C.textContent=A[j].title;C.lensCommand=A[j];}while(B.childNodes.length>2*j-1)B.lastChild.remove();var D=n.$cursorLayer.getPixelPosition({row:y,column:0},true).top-v.lineHeight*z.rowsAbove-v.offset;B.style.top=D+"px";var F=n.gutterWidth;var G=s.getLine(y).search(/\S|$/);if(G==-1)G=0;F+=G*v.characterWidth;F-=n.scrollLeft;B.style.paddingLeft=w+F+"px";}while(x<q.length)q.pop().remove();}function g(s){if(!s.lineWidgets)return;var w=s.widgetManager;s.lineWidgets.forEach(function(e){if(e&&e.lenses)w.removeLineWidget(e);});}a.setLenses=function(s,e){var i=Number.MAX_VALUE;g(s);e&&e.forEach(function(j){var n=j.start.row;var o=j.start.column;var w=s.lineWidgets&&s.lineWidgets[n];if(!w||!w.lenses){w=s.widgetManager.$registerLineWidget({rowCount:1,rowsAbove:1,row:n,column:o,lenses:[]});}w.lenses.push(j.command);if(n<i)i=n;});s._emit("changeFold",{data:{start:{row:i}}});};function h(i){i.codeLensProviders=[];i.renderer.on("afterRender",f);if(!i.$codeLensClickHandler){i.$codeLensClickHandler=function(e){var j=e.target.lensCommand;if(j)i.execCommand(j.id,j.arguments);};b.addListener(i.container,"click",i.$codeLensClickHandler,i);}i.$updateLenses=function(){var s=i.session;if(!s)return;if(!s.widgetManager){s.widgetManager=new L(s);s.widgetManager.attach(i);}var p=i.codeLensProviders.length;var e=[];i.codeLensProviders.forEach(function(n){n.provideCodeLenses(s,function(o,q){if(o)return;q.forEach(function(t){e.push(t);});p--;if(p==0){j();}});});function j(){var n=s.selection.cursor;var o=s.documentToScreenRow(n);a.setLenses(s,e);var q=s.$undoManager&&s.$undoManager.$lastDelta;if(q&&q.action=="remove"&&q.lines.length>1)return;var t=s.documentToScreenRow(n);var v=i.renderer.layerConfig.lineHeight;var w=s.getScrollTop()+(t-o)*v;s.setScrollTop(w);}};var u=l.delayedCall(i.$updateLenses);i.$updateLensesOnInput=function(){u.delay(250);};i.on("input",i.$updateLensesOnInput);}function k(e){e.off("input",e.$updateLensesOnInput);e.renderer.off("afterRender",f);if(e.$codeLensClickHandler)e.container.removeEventListener("click",e.$codeLensClickHandler);}a.registerCodeLensProvider=function(e,i){e.setOption("enableCodeLens",true);e.codeLensProviders.push(i);e.$updateLensesOnInput();};a.clear=function(s){a.setLenses(s,null);};var E=r("../editor").Editor;r("../config").defineOptions(E.prototype,"editor",{enableCodeLens:{set:function(v){if(v){h(this);}else{k(this);}}}});d.importCssString(".ace_codeLens {    position: absolute;    color: #aaa;    font-size: 88%;    background: inherit;    width: 100%;    display: flex;    align-items: flex-end;    pointer-events: none;}.ace_codeLens > a {    cursor: pointer;    pointer-events: auto;}.ace_codeLens > a:hover {    color: #0000ff;    text-decoration: underline;}.ace_dark > .ace_codeLens > a:hover {    color: #4e94ce;}","codelense.css",false);});(function(){ace.require(["ace/ext/code_lens"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();
