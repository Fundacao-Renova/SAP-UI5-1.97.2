/*!
 * jQuery UI Sortable 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/sortable/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function($,u){function e(x,r,s){return(x>r)&&(x<(r+s));}function f(i){return(/left|right/).test(i.css("float"))||(/inline|table-cell/).test(i.css("display"));}$.widget("ui.sortable",$.ui.mouse,{version:"1.10.4",widgetEventPrefix:"sort",ready:false,options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_create:function(){var o=this.options;this.containerCache={};this.element.addClass("ui-sortable");this.refresh();this.floating=this.items.length?o.axis==="x"||f(this.items[0].item):false;this.offset=this.element.offset();this._mouseInit();this.ready=true;},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled");this._mouseDestroy();for(var i=this.items.length-1;i>=0;i--){this.items[i].item.removeData(this.widgetName+"-item");}return this;},_setOption:function(k,v){if(k==="disabled"){this.options[k]=v;this.widget().toggleClass("ui-sortable-disabled",!!v);}else{$.Widget.prototype._setOption.apply(this,arguments);}},_mouseCapture:function(a,o){var c=null,v=false,t=this;if(this.reverting){return false;}if(this.options.disabled||this.options.type==="static"){return false;}this._refreshItems(a);$(a.target).parents().each(function(){if($.data(this,t.widgetName+"-item")===t){c=$(this);return false;}});if($.data(a.target,t.widgetName+"-item")===t){c=$(a.target);}if(!c){return false;}if(this.options.handle&&!o){$(this.options.handle,c).find("*").addBack().each(function(){if(this===a.target){v=true;}});if(!v){return false;}}this.currentItem=c;this._removeCurrentsFromItems();return true;},_mouseStart:function(a,b,n){var i,c,o=this.options;this.currentContainer=this;this.refreshPositions();this.helper=this._createHelper(a);this._cacheHelperProportions();this._cacheMargins();this.scrollParent=this.helper.scrollParent();this.offset=this.currentItem.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};$.extend(this.offset,{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.helper.css("position","absolute");this.cssPosition=this.helper.css("position");this.originalPosition=this._generatePosition(a);this.originalPageX=a.pageX;this.originalPageY=a.pageY;(o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt));this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};if(this.helper[0]!==this.currentItem[0]){this.currentItem.hide();}this._createPlaceholder();if(o.containment){this._setContainment();}if(o.cursor&&o.cursor!=="auto"){c=this.document.find("body");this.storedCursor=c.css("cursor");c.css("cursor",o.cursor);this.storedStylesheet=$("<style>*{ cursor: "+o.cursor+" !important; }</style>").appendTo(c);}if(o.opacity){if(this.helper.css("opacity")){this._storedOpacity=this.helper.css("opacity");}this.helper.css("opacity",o.opacity);}if(o.zIndex){if(this.helper.css("zIndex")){this._storedZIndex=this.helper.css("zIndex");}this.helper.css("zIndex",o.zIndex);}if(this.scrollParent[0]!==document&&this.scrollParent[0].tagName!=="HTML"){this.overflowOffset=this.scrollParent.offset();}this._trigger("start",a,this._uiHash());if(!this._preserveHelperProportions){this._cacheHelperProportions();}if(!n){for(i=this.containers.length-1;i>=0;i--){this.containers[i]._trigger("activate",a,this._uiHash(this));}}if($.ui.ddmanager){$.ui.ddmanager.current=this;}if($.ui.ddmanager&&!o.dropBehaviour){$.ui.ddmanager.prepareOffsets(this,a);}this.dragging=true;this.helper.addClass("ui-sortable-helper");this._mouseDrag(a);return true;},_mouseDrag:function(a){var i,b,c,d,o=this.options,s=false;this.position=this._generatePosition(a);this.positionAbs=this._convertPositionTo("absolute");if(!this.lastPositionAbs){this.lastPositionAbs=this.positionAbs;}if(this.options.scroll){if(this.scrollParent[0]!==document&&this.scrollParent[0].tagName!=="HTML"){if((this.overflowOffset.top+this.scrollParent[0].offsetHeight)-a.pageY<o.scrollSensitivity){this.scrollParent[0].scrollTop=s=this.scrollParent[0].scrollTop+o.scrollSpeed;}else if(a.pageY-this.overflowOffset.top<o.scrollSensitivity){this.scrollParent[0].scrollTop=s=this.scrollParent[0].scrollTop-o.scrollSpeed;}if((this.overflowOffset.left+this.scrollParent[0].offsetWidth)-a.pageX<o.scrollSensitivity){this.scrollParent[0].scrollLeft=s=this.scrollParent[0].scrollLeft+o.scrollSpeed;}else if(a.pageX-this.overflowOffset.left<o.scrollSensitivity){this.scrollParent[0].scrollLeft=s=this.scrollParent[0].scrollLeft-o.scrollSpeed;}}else{if(a.pageY-$(document).scrollTop()<o.scrollSensitivity){s=$(document).scrollTop($(document).scrollTop()-o.scrollSpeed);}else if($(window).height()-(a.pageY-$(document).scrollTop())<o.scrollSensitivity){s=$(document).scrollTop($(document).scrollTop()+o.scrollSpeed);}if(a.pageX-$(document).scrollLeft()<o.scrollSensitivity){s=$(document).scrollLeft($(document).scrollLeft()-o.scrollSpeed);}else if($(window).width()-(a.pageX-$(document).scrollLeft())<o.scrollSensitivity){s=$(document).scrollLeft($(document).scrollLeft()+o.scrollSpeed);}}if(s!==false&&$.ui.ddmanager&&!o.dropBehaviour){$.ui.ddmanager.prepareOffsets(this,a);}}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!=="y"){this.helper[0].style.left=this.position.left+"px";}if(!this.options.axis||this.options.axis!=="x"){this.helper[0].style.top=this.position.top+"px";}for(i=this.items.length-1;i>=0;i--){b=this.items[i];c=b.item[0];d=this._intersectsWithPointer(b);if(!d){continue;}if(b.instance!==this.currentContainer){continue;}if(c!==this.currentItem[0]&&this.placeholder[d===1?"next":"prev"]()[0]!==c&&!$.contains(this.placeholder[0],c)&&(this.options.type==="semi-dynamic"?!$.contains(this.element[0],c):true)){this.direction=d===1?"down":"up";if(this.options.tolerance==="pointer"||this._intersectsWithSides(b)){this._rearrange(a,b);}else{break;}this._trigger("change",a,this._uiHash());break;}}this._contactContainers(a);if($.ui.ddmanager){$.ui.ddmanager.drag(this,a);}this._trigger("sort",a,this._uiHash());this.lastPositionAbs=this.positionAbs;return false;},_mouseStop:function(a,n){if(!a){return;}if($.ui.ddmanager&&!this.options.dropBehaviour){$.ui.ddmanager.drop(this,a);}if(this.options.revert){var t=this,c=this.placeholder.offset(),b=this.options.axis,d={};if(!b||b==="x"){d.left=c.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollLeft);}if(!b||b==="y"){d.top=c.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollTop);}this.reverting=true;$(this.helper).animate(d,parseInt(this.options.revert,10)||500,function(){t._clear(a);});}else{this._clear(a,n);}return false;},cancel:function(){if(this.dragging){this._mouseUp({target:null});if(this.options.helper==="original"){this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");}else{this.currentItem.show();}for(var i=this.containers.length-1;i>=0;i--){this.containers[i]._trigger("deactivate",null,this._uiHash(this));if(this.containers[i].containerCache.over){this.containers[i]._trigger("out",null,this._uiHash(this));this.containers[i].containerCache.over=0;}}}if(this.placeholder){if(this.placeholder[0].parentNode){this.placeholder[0].parentNode.removeChild(this.placeholder[0]);}if(this.options.helper!=="original"&&this.helper&&this.helper[0].parentNode){this.helper.remove();}$.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});if(this.domPosition.prev){$(this.domPosition.prev).after(this.currentItem);}else{$(this.domPosition.parent).prepend(this.currentItem);}}return this;},serialize:function(o){var i=this._getItemsAsjQuery(o&&o.connected),s=[];o=o||{};$(i).each(function(){var r=($(o.item||this).attr(o.attribute||"id")||"").match(o.expression||(/(.+)[\-=_](.+)/));if(r){s.push((o.key||r[1]+"[]")+"="+(o.key&&o.expression?r[1]:r[2]));}});if(!s.length&&o.key){s.push(o.key+"=");}return s.join("&");},toArray:function(o){var i=this._getItemsAsjQuery(o&&o.connected),r=[];o=o||{};i.each(function(){r.push($(o.item||this).attr(o.attribute||"id")||"");});return r;},_intersectsWith:function(i){var x=this.positionAbs.left,a=x+this.helperProportions.width,y=this.positionAbs.top,c=y+this.helperProportions.height,l=i.left,r=l+i.width,t=i.top,b=t+i.height,d=this.offset.click.top,g=this.offset.click.left,h=(this.options.axis==="x")||((y+d)>t&&(y+d)<b),j=(this.options.axis==="y")||((x+g)>l&&(x+g)<r),k=h&&j;if(this.options.tolerance==="pointer"||this.options.forcePointerForContainers||(this.options.tolerance!=="pointer"&&this.helperProportions[this.floating?"width":"height"]>i[this.floating?"width":"height"])){return k;}else{return(l<x+(this.helperProportions.width/2)&&a-(this.helperProportions.width/2)<r&&t<y+(this.helperProportions.height/2)&&c-(this.helperProportions.height/2)<b);}},_intersectsWithPointer:function(i){var a=(this.options.axis==="x")||e(this.positionAbs.top+this.offset.click.top,i.top,i.height),b=(this.options.axis==="y")||e(this.positionAbs.left+this.offset.click.left,i.left,i.width),c=a&&b,v=this._getDragVerticalDirection(),h=this._getDragHorizontalDirection();if(!c){return false;}return this.floating?(((h&&h==="right")||v==="down")?2:1):(v&&(v==="down"?2:1));},_intersectsWithSides:function(i){var a=e(this.positionAbs.top+this.offset.click.top,i.top+(i.height/2),i.height),b=e(this.positionAbs.left+this.offset.click.left,i.left+(i.width/2),i.width),v=this._getDragVerticalDirection(),h=this._getDragHorizontalDirection();if(this.floating&&h){return((h==="right"&&b)||(h==="left"&&!b));}else{return v&&((v==="down"&&a)||(v==="up"&&!a));}},_getDragVerticalDirection:function(){var d=this.positionAbs.top-this.lastPositionAbs.top;return d!==0&&(d>0?"down":"up");},_getDragHorizontalDirection:function(){var d=this.positionAbs.left-this.lastPositionAbs.left;return d!==0&&(d>0?"right":"left");},refresh:function(a){this._refreshItems(a);this.refreshPositions();return this;},_connectWith:function(){var o=this.options;return o.connectWith.constructor===String?[o.connectWith]:o.connectWith;},_getItemsAsjQuery:function(c){var i,j,a,b,d=[],q=[],g=this._connectWith();if(g&&c){for(i=g.length-1;i>=0;i--){a=$(g[i]);for(j=a.length-1;j>=0;j--){b=$.data(a[j],this.widgetFullName);if(b&&b!==this&&!b.options.disabled){q.push([typeof b.options.items==="function"?b.options.items.call(b.element):$(b.options.items,b.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),b]);}}}}q.push([typeof this.options.items==="function"?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):$(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);function h(){d.push(this);}for(i=q.length-1;i>=0;i--){q[i][0].each(h);}return $(d);},_removeCurrentsFromItems:function(){var l=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=$.grep(this.items,function(i){for(var j=0;j<l.length;j++){if(l[j]===i.item[0]){return false;}}return true;});},_refreshItems:function(a){this.items=[];this.containers=[this];var i,j,c,b,t,_,d,q,g=this.items,h=[[typeof this.options.items==="function"?this.options.items.call(this.element[0],a,{item:this.currentItem}):$(this.options.items,this.element),this]],k=this._connectWith();if(k&&this.ready){for(i=k.length-1;i>=0;i--){c=$(k[i]);for(j=c.length-1;j>=0;j--){b=$.data(c[j],this.widgetFullName);if(b&&b!==this&&!b.options.disabled){h.push([typeof b.options.items==="function"?b.options.items.call(b.element[0],a,{item:this.currentItem}):$(b.options.items,b.element),b]);this.containers.push(b);}}}}for(i=h.length-1;i>=0;i--){t=h[i][1];_=h[i][0];for(j=0,q=_.length;j<q;j++){d=$(_[j]);d.data(this.widgetName+"-item",t);g.push({item:d,instance:t,width:0,height:0,left:0,top:0});}}},refreshPositions:function(a){if(this.offsetParent&&this.helper){this.offset.parent=this._getParentOffset();}var i,b,t,p;for(i=this.items.length-1;i>=0;i--){b=this.items[i];if(b.instance!==this.currentContainer&&this.currentContainer&&b.item[0]!==this.currentItem[0]){continue;}t=this.options.toleranceElement?$(this.options.toleranceElement,b.item):b.item;if(!a){b.width=t.outerWidth();b.height=t.outerHeight();}p=t.offset();b.left=p.left;b.top=p.top;}if(this.options.custom&&this.options.custom.refreshContainers){this.options.custom.refreshContainers.call(this);}else{for(i=this.containers.length-1;i>=0;i--){p=this.containers[i].element.offset();this.containers[i].containerCache.left=p.left;this.containers[i].containerCache.top=p.top;this.containers[i].containerCache.width=this.containers[i].element.outerWidth();this.containers[i].containerCache.height=this.containers[i].element.outerHeight();}}return this;},_createPlaceholder:function(t){t=t||this;var c,o=t.options;if(!o.placeholder||o.placeholder.constructor===String){c=o.placeholder;o.placeholder={element:function(){var n=t.currentItem[0].nodeName.toLowerCase(),a=$("<"+n+">",t.document[0]).addClass(c||t.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");if(n==="tr"){t.currentItem.children().each(function(){$("<td>&#160;</td>",t.document[0]).attr("colspan",$(this).attr("colspan")||1).appendTo(a);});}else if(n==="img"){a.attr("src",t.currentItem.attr("src"));}if(!c){a.css("visibility","hidden");}return a;},update:function(a,p){if(c&&!o.forcePlaceholderSize){return;}if(!p.height()){p.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10));}if(!p.width()){p.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10));}}};}t.placeholder=$(o.placeholder.element.call(t.element,t.currentItem));t.currentItem.after(t.placeholder);o.placeholder.update(t,t.placeholder);},_contactContainers:function(a){var i,j,d,b,p,s,c,g,n,h,k=null,l=null;for(i=this.containers.length-1;i>=0;i--){if($.contains(this.currentItem[0],this.containers[i].element[0])){continue;}if(this._intersectsWith(this.containers[i].containerCache)){if(k&&$.contains(this.containers[i].element[0],k.element[0])){continue;}k=this.containers[i];l=i;}else{if(this.containers[i].containerCache.over){this.containers[i]._trigger("out",a,this._uiHash(this));this.containers[i].containerCache.over=0;}}}if(!k){return;}if(this.containers.length===1){if(!this.containers[l].containerCache.over){this.containers[l]._trigger("over",a,this._uiHash(this));this.containers[l].containerCache.over=1;}}else{d=10000;b=null;h=k.floating||f(this.currentItem);p=h?"left":"top";s=h?"width":"height";c=this.positionAbs[p]+this.offset.click[p];for(j=this.items.length-1;j>=0;j--){if(!$.contains(this.containers[l].element[0],this.items[j].item[0])){continue;}if(this.items[j].item[0]===this.currentItem[0]){continue;}if(h&&!e(this.positionAbs.top+this.offset.click.top,this.items[j].top,this.items[j].height)){continue;}g=this.items[j].item.offset()[p];n=false;if(Math.abs(g-c)>Math.abs(g+this.items[j][s]-c)){n=true;g+=this.items[j][s];}if(Math.abs(g-c)<d){d=Math.abs(g-c);b=this.items[j];this.direction=n?"up":"down";}}if(!b&&!this.options.dropOnEmpty){return;}if(this.currentContainer===this.containers[l]){return;}b?this._rearrange(a,b,null,true):this._rearrange(a,null,this.containers[l].element,true);this._trigger("change",a,this._uiHash());this.containers[l]._trigger("change",a,this._uiHash(this));this.currentContainer=this.containers[l];this.options.placeholder.update(this.currentContainer,this.placeholder);this.containers[l]._trigger("over",a,this._uiHash(this));this.containers[l].containerCache.over=1;}},_createHelper:function(a){var o=this.options,h=typeof o.helper==="function"?$(o.helper.apply(this.element[0],[a,this.currentItem])):(o.helper==="clone"?this.currentItem.clone():this.currentItem);if(!h.parents("body").length){$(o.appendTo!=="parent"?o.appendTo:this.currentItem[0].parentNode)[0].appendChild(h[0]);}if(h[0]===this.currentItem[0]){this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")};}if(!h[0].style.width||o.forceHelperSize){h.width(this.currentItem.width());}if(!h[0].style.height||o.forceHelperSize){h.height(this.currentItem.height());}return h;},_adjustOffsetFromHelper:function(o){if(typeof o==="string"){o=o.split(" ");}if($.isArray(o)){o={left:+o[0],top:+o[1]||0};}if("left"in o){this.offset.click.left=o.left+this.margins.left;}if("right"in o){this.offset.click.left=this.helperProportions.width-o.right+this.margins.left;}if("top"in o){this.offset.click.top=o.top+this.margins.top;}if("bottom"in o){this.offset.click.top=this.helperProportions.height-o.bottom+this.margins.top;}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var p=this.offsetParent.offset();if(this.cssPosition==="absolute"&&this.scrollParent[0]!==document&&$.contains(this.scrollParent[0],this.offsetParent[0])){p.left+=this.scrollParent.scrollLeft();p.top+=this.scrollParent.scrollTop();}if(this.offsetParent[0]===document.body||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()==="html"&&$.ui.ie)){p={top:0,left:0};}return{top:p.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:p.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)};},_getRelativeOffset:function(){if(this.cssPosition==="relative"){var p=this.currentItem.position();return{top:p.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:p.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()};}else{return{top:0,left:0};}},_cacheMargins:function(){this.margins={left:(parseInt(this.currentItem.css("marginLeft"),10)||0),top:(parseInt(this.currentItem.css("marginTop"),10)||0)};},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()};},_setContainment:function(){var c,a,b,o=this.options;if(o.containment==="parent"){o.containment=this.helper[0].parentNode;}if(o.containment==="document"||o.containment==="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,$(o.containment==="document"?document:window).width()-this.helperProportions.width-this.margins.left,($(o.containment==="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];}if(!(/^(document|window|parent)$/).test(o.containment)){c=$(o.containment)[0];a=$(o.containment).offset();b=($(c).css("overflow")!=="hidden");this.containment=[a.left+(parseInt($(c).css("borderLeftWidth"),10)||0)+(parseInt($(c).css("paddingLeft"),10)||0)-this.margins.left,a.top+(parseInt($(c).css("borderTopWidth"),10)||0)+(parseInt($(c).css("paddingTop"),10)||0)-this.margins.top,a.left+(b?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt($(c).css("borderLeftWidth"),10)||0)-(parseInt($(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,a.top+(b?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt($(c).css("borderTopWidth"),10)||0)-(parseInt($(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top];}},_convertPositionTo:function(d,p){if(!p){p=this.position;}var m=d==="absolute"?1:-1,s=this.cssPosition==="absolute"&&!(this.scrollParent[0]!==document&&$.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,a=(/(html|body)/i).test(s[0].tagName);return{top:(p.top+this.offset.relative.top*m+this.offset.parent.top*m-((this.cssPosition==="fixed"?-this.scrollParent.scrollTop():(a?0:s.scrollTop()))*m)),left:(p.left+this.offset.relative.left*m+this.offset.parent.left*m-((this.cssPosition==="fixed"?-this.scrollParent.scrollLeft():a?0:s.scrollLeft())*m))};},_generatePosition:function(a){var t,l,o=this.options,p=a.pageX,b=a.pageY,s=this.cssPosition==="absolute"&&!(this.scrollParent[0]!==document&&$.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,c=(/(html|body)/i).test(s[0].tagName);if(this.cssPosition==="relative"&&!(this.scrollParent[0]!==document&&this.scrollParent[0]!==this.offsetParent[0])){this.offset.relative=this._getRelativeOffset();}if(this.originalPosition){if(this.containment){if(a.pageX-this.offset.click.left<this.containment[0]){p=this.containment[0]+this.offset.click.left;}if(a.pageY-this.offset.click.top<this.containment[1]){b=this.containment[1]+this.offset.click.top;}if(a.pageX-this.offset.click.left>this.containment[2]){p=this.containment[2]+this.offset.click.left;}if(a.pageY-this.offset.click.top>this.containment[3]){b=this.containment[3]+this.offset.click.top;}}if(o.grid){t=this.originalPageY+Math.round((b-this.originalPageY)/o.grid[1])*o.grid[1];b=this.containment?((t-this.offset.click.top>=this.containment[1]&&t-this.offset.click.top<=this.containment[3])?t:((t-this.offset.click.top>=this.containment[1])?t-o.grid[1]:t+o.grid[1])):t;l=this.originalPageX+Math.round((p-this.originalPageX)/o.grid[0])*o.grid[0];p=this.containment?((l-this.offset.click.left>=this.containment[0]&&l-this.offset.click.left<=this.containment[2])?l:((l-this.offset.click.left>=this.containment[0])?l-o.grid[0]:l+o.grid[0])):l;}}return{top:(b-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+((this.cssPosition==="fixed"?-this.scrollParent.scrollTop():(c?0:s.scrollTop())))),left:(p-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+((this.cssPosition==="fixed"?-this.scrollParent.scrollLeft():c?0:s.scrollLeft())))};},_rearrange:function(b,i,a,h){a?a[0].appendChild(this.placeholder[0]):i.item[0].parentNode.insertBefore(this.placeholder[0],(this.direction==="down"?i.item[0]:i.item[0].nextSibling));this.counter=this.counter?++this.counter:1;var c=this.counter;this._delay(function(){if(c===this.counter){this.refreshPositions(!h);}});},_clear:function(a,n){this.reverting=false;var i,d=[];if(!this._noFinalSort&&this.currentItem.parent().length){this.placeholder.before(this.currentItem);}this._noFinalSort=null;if(this.helper[0]===this.currentItem[0]){for(i in this._storedCSS){if(this._storedCSS[i]==="auto"||this._storedCSS[i]==="static"){this._storedCSS[i]="";}}this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");}else{this.currentItem.show();}if(this.fromOutside&&!n){d.push(function(a){this._trigger("receive",a,this._uiHash(this.fromOutside));});}if((this.fromOutside||this.domPosition.prev!==this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!==this.currentItem.parent()[0])&&!n){d.push(function(a){this._trigger("update",a,this._uiHash());});}if(this!==this.currentContainer){if(!n){d.push(function(a){this._trigger("remove",a,this._uiHash());});d.push((function(c){return function(a){c._trigger("receive",a,this._uiHash(this));};}).call(this,this.currentContainer));d.push((function(c){return function(a){c._trigger("update",a,this._uiHash(this));};}).call(this,this.currentContainer));}}function b(t,c,g){return function(a){g._trigger(t,a,c._uiHash(c));};}for(i=this.containers.length-1;i>=0;i--){if(!n){d.push(b("deactivate",this,this.containers[i]));}if(this.containers[i].containerCache.over){d.push(b("out",this,this.containers[i]));this.containers[i].containerCache.over=0;}}if(this.storedCursor){this.document.find("body").css("cursor",this.storedCursor);this.storedStylesheet.remove();}if(this._storedOpacity){this.helper.css("opacity",this._storedOpacity);}if(this._storedZIndex){this.helper.css("zIndex",this._storedZIndex==="auto"?"":this._storedZIndex);}this.dragging=false;if(this.cancelHelperRemoval){if(!n){this._trigger("beforeStop",a,this._uiHash());for(i=0;i<d.length;i++){d[i].call(this,a);}this._trigger("stop",a,this._uiHash());}this.fromOutside=false;return false;}if(!n){this._trigger("beforeStop",a,this._uiHash());}this.placeholder[0].parentNode.removeChild(this.placeholder[0]);if(this.helper[0]!==this.currentItem[0]){this.helper.remove();}this.helper=null;if(!n){for(i=0;i<d.length;i++){d[i].call(this,a);}this._trigger("stop",a,this._uiHash());}this.fromOutside=false;return true;},_trigger:function(){if($.Widget.prototype._trigger.apply(this,arguments)===false){this.cancel();}},_uiHash:function(_){var i=_||this;return{helper:i.helper,placeholder:i.placeholder||$([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:_?_.element:null};}});})(jQuery);