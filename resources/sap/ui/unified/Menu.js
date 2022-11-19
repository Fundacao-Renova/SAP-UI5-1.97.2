/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Element','sap/ui/core/Control','sap/ui/Device','sap/ui/core/Popup','./MenuItemBase','./library','sap/ui/core/library','sap/ui/unified/MenuRenderer',"sap/ui/dom/containsOrEquals","sap/ui/thirdparty/jquery","sap/ui/events/KeyCodes","sap/base/Log","sap/ui/events/ControlEvents","sap/ui/events/PseudoEvents","sap/ui/events/checkMouseEnterOrLeave"],function(E,C,D,P,M,l,c,a,b,q,K,L,d,f,g){"use strict";var h=P.Dock;var O=c.OpenState;var j=C.extend("sap.ui.unified.Menu",{metadata:{interfaces:["sap.ui.core.IContextMenu"],library:"sap.ui.unified",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},ariaDescription:{type:"string",group:"Accessibility",defaultValue:null,deprecated:true},maxVisibleItems:{type:"int",group:"Behavior",defaultValue:0},pageSize:{type:"int",group:"Behavior",defaultValue:5}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.unified.MenuItemBase",multiple:true,singularName:"item"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{itemSelect:{parameters:{item:{type:"sap.ui.unified.MenuItemBase"}}}}}});(function(w){j.prototype.bCozySupported=true;j._DELAY_SUBMENU_TIMER=300;j._DELAY_SUBMENU_TIMER_EXT=400;j.prototype.init=function(){var t=this;this.bOpen=false;this.oOpenedSubMenu=null;this.oHoveredItem=null;this.oPopup=null;this._bOpenedAsContextMenu=false;this.fAnyEventHandlerProxy=q.proxy(function(e){var r=this.getRootMenu();if(r!=this||!this.bOpen||!this.getDomRef()||(e.type!="mousedown"&&e.type!="touchstart")){return;}r.handleOuterEvent(this.getId(),e);},this);this.fOrientationChangeHandler=function(){t.close();};this.bUseTopStyle=false;};j.prototype._setCustomEnhanceAccStateFunction=function(e){this._fnCustomEnhanceAccStateFunction=e;};j.prototype.enhanceAccessibilityState=function(e,A){var i=typeof this._fnCustomEnhanceAccStateFunction==="function";if(i){this._fnCustomEnhanceAccStateFunction(e,A);}};j.prototype.exit=function(){if(this.oPopup){this.oPopup.detachClosed(this._menuClosed,this);this.oPopup.destroy();delete this.oPopup;}d.unbindAnyEvent(this.fAnyEventHandlerProxy);if(this._bOrientationChangeBound){q(w).off("orientationchange",this.fOrientationChangeHandler);this._bOrientationChangeBound=false;}this._resetDelayedRerenderItems();this._detachResizeHandler();};j.prototype.invalidate=function(o){if(o instanceof M&&this.getDomRef()){this._delayedRerenderItems();}else{C.prototype.invalidate.apply(this,arguments);}};j.prototype.onBeforeRendering=function(){this._resetDelayedRerenderItems();this.$().off("mousemove");};j.prototype.onAfterRendering=function(){if(this.$().parent().attr("id")!="sap-ui-static"){L.error("sap.ui.unified.Menu: The Menu is popup based and must not be rendered directly as content of the page.");this.close();this.$().remove();}var I=this.getItems();for(var i=0;i<I.length;i++){if(I[i].onAfterRendering&&I[i].getDomRef()){I[i].onAfterRendering();}}if(this.oHoveredItem){this.oHoveredItem.hover(true,this);}m(this);this.$().on("mousemove",this._focusMenuItem.bind(this));};j.prototype._focusMenuItem=function(e){if(!D.system.desktop){return;}var i=this.getItemByDomRef(e.target);if(!this.bOpen||!i){return;}if(this.oOpenedSubMenu&&b(this.oOpenedSubMenu.getDomRef(),e.target)){return;}this.setHoveredItem(i);i&&i.focus(this);this._openSubMenuDelayed(i);};j.prototype.onThemeChanged=function(){if(this.getDomRef()&&this.getPopup().getOpenState()===O.OPEN){m(this);this.getPopup()._applyPosition(this.getPopup()._oLastPosition);}};j.prototype.addItem=function(i){this.addAggregation("items",i,!!this.getDomRef());this._delayedRerenderItems();return this;};j.prototype.insertItem=function(i,e){this.insertAggregation("items",i,e,!!this.getDomRef());this._delayedRerenderItems();return this;};j.prototype.removeItem=function(i){this.removeAggregation("items",i,!!this.getDomRef());this._delayedRerenderItems();return this;};j.prototype.removeAllItems=function(){var r=this.removeAllAggregation("items",!!this.getDomRef());this._delayedRerenderItems();return r;};j.prototype.destroyItems=function(){this.destroyAggregation("items",!!this.getDomRef());this._delayedRerenderItems();return this;};j.prototype._delayedRerenderItems=function(){if(!this.getDomRef()){return;}this._resetDelayedRerenderItems();this._discardOpenSubMenuDelayed();this._itemRerenderTimer=setTimeout(function(){var o=this.getDomRef();if(o){var r=sap.ui.getCore().createRenderManager();a.renderItems(r,this);r.flush(o);r.destroy();this.onAfterRendering();this.getPopup()._applyPosition(this.getPopup()._oLastPosition);}}.bind(this),0);};j.prototype._resetDelayedRerenderItems=function(){if(this._itemRerenderTimer){clearTimeout(this._itemRerenderTimer);delete this._itemRerenderTimer;}};j.prototype._detachResizeHandler=function(){if(this._hasResizeListener){D.resize.detachHandler(this._handleResizeChange,this);this._hasResizeListener=false;}};j.prototype.open=function(W,o,e,i,n,p,r){var N;if(this.bOpen){return;}s(this,true);this.oOpenerRef=o;this.bIgnoreOpenerDOMRef=false;this.getPopup().open(0,e,i,n,p||"0 0",r||"flipfit flipfit",function(t){var u=this.getPopup()._getOfDom(n);if(!u||!q(u).is(":visible")||!_(u)){this.close();}else{this.getPopup()._applyPosition(t.lastPosition);}}.bind(this));this.bOpen=true;D.resize.attachHandler(this._handleResizeChange,this);this._hasResizeListener=true;if(W||this.getRootMenu().getId()===this.getId()){N=this.getNextSelectableItem(-1);this.setHoveredItem(N);N&&N.focus(this);}d.bindAnyEvent(this.fAnyEventHandlerProxy);if(D.support.orientation&&this.getRootMenu()===this){q(w).on("orientationchange",this.fOrientationChangeHandler);this._bOrientationChangeBound=true;}};j.prototype._handleResizeChange=function(){this.getPopup()._applyPosition(this.getPopup()._oLastPosition);};j.prototype.openAsContextMenu=function(e,o){var i,n,r,p,t;o=o instanceof E?o.getDomRef():o;if(e instanceof q.Event){t=q(o).offset();i=e.pageX-t.left;n=e.pageY-t.top;this._iX=e.clientX;this._iY=e.clientY;}else{i=e.offsetX||0;n=e.offsetY||0;this._iX=e.left||0;this._iY=e.top||0;}r=sap.ui.getCore().getConfiguration().getRTL();p=h;if(r){i=o.clientWidth-i;}this._bOpenedAsContextMenu=true;this.open(true,o,p.BeginTop,p.BeginTop,o,i+" "+n,'fit');};j.prototype._handleOpened=function(){var $,W,i,e,r,B,R,n,o,p;if(!this._bOpenedAsContextMenu){return;}$=this.$();W=q(w);i=this._iX;e=this._iY;r=W.scrollLeft()+W.width();B=W.scrollTop()+W.height();R=sap.ui.getCore().getConfiguration().getRTL();n=false;o=$.width();p=$.height();if(e+p>B){e=e-p;n=true;}if(R){if((r-i)+o>r){i=r-(i+o);n=true;}else{i=r-i;n=true;}}else{if(i+o>r){i=i-o;n=true;}}this._bOpenedAsContextMenu=false;n&&this.oPopup.setPosition("begin top","begin top",W,i+" "+e,"flipfit");};j.prototype.close=function(W){if(!this.bOpen||j._dbg){return;}this._discardOpenSubMenuDelayed();s(this,false);delete this._bFixed;d.unbindAnyEvent(this.fAnyEventHandlerProxy);if(this._bOrientationChangeBound){q(w).off("orientationchange",this.fOrientationChangeHandler);this._bOrientationChangeBound=false;}this.bOpen=false;this.closeSubmenu();this.setHoveredItem();if(!W){this.bIgnoreOpenerDOMRef=true;}this.getPopup().close(0);this._detachResizeHandler();this._resetDelayedRerenderItems();this.$().remove();this.bOutput=false;if(this.isSubMenu()){this.getParent().getParent().oOpenedSubMenu=null;}};j.prototype._menuClosed=function(){if(this.oOpenerRef){if(!this.bIgnoreOpenerDOMRef){try{this.oOpenerRef.focus();}catch(e){L.warning("Menu.close cannot restore the focus on opener "+this.oOpenerRef+", "+e);}}this.oOpenerRef=undefined;}};j.prototype.onclick=function(e){this.selectItem(this.getItemByDomRef(e.target),false,!!(e.metaKey||e.ctrlKey));e.preventDefault();e.stopPropagation();};j.prototype.onsapnext=function(e){var i,n,S=this.oHoveredItem?this.oHoveredItem.getSubmenu():undefined;if(e.keyCode!=K.ARROW_DOWN){if(S&&this.checkEnabled(this.oHoveredItem)){if(S.bOpen){n=S.getNextSelectableItem(-1);S.setHoveredItem(n);n&&n.focus(this);}else{this.openSubmenu(this.oHoveredItem,true);}}return;}if(S&&S.bOpen){this.closeSubmenu(false,true);}i=this.oHoveredItem?this.indexOfAggregation("items",this.oHoveredItem):-1;n=this.getNextSelectableItem(i);this.setHoveredItem(n);n&&n.focus(this);e.preventDefault();e.stopPropagation();};j.prototype.onsapnextmodifiers=j.prototype.onsapnext;j.prototype.onsapprevious=function(e){var i=this.oHoveredItem?this.indexOfAggregation("items",this.oHoveredItem):-1,p=this.getPreviousSelectableItem(i),S=this.oHoveredItem?this.oHoveredItem.getSubmenu():null;if(e.keyCode!=K.ARROW_UP){if(this.isSubMenu()){this.close(true);}e.preventDefault();e.stopPropagation();return;}if(S&&S.bOpen){this.closeSubmenu(false,true);}this.setHoveredItem(p);p&&p.focus(this);e.preventDefault();e.stopPropagation();};j.prototype.onsappreviousmodifiers=j.prototype.onsapprevious;j.prototype.onsaphome=function(e){var n=this.getNextSelectableItem(-1);this.setHoveredItem(n);n&&n.focus(this);e.preventDefault();e.stopPropagation();};j.prototype.onsapend=function(e){var p=this.getPreviousSelectableItem(this.getItems().length);this.setHoveredItem(p);p&&p.focus(this);e.preventDefault();e.stopPropagation();};j.prototype.onsappagedown=function(e){var i=this.oHoveredItem?this.indexOfAggregation("items",this.oHoveredItem):-1,n;if(this.getPageSize()<1){this.onsapend(e);return;}i+=this.getPageSize();if(i>=this.getItems().length){this.onsapend(e);return;}n=this.getNextSelectableItem(i-1);this.setHoveredItem(n);n&&n.focus(this);e.preventDefault();e.stopPropagation();};j.prototype.onsappageup=function(e){var i=this.oHoveredItem?this.indexOfAggregation("items",this.oHoveredItem):-1,p;if(this.getPageSize()<1){this.onsaphome(e);return;}i-=this.getPageSize();if(i<0){this.onsaphome(e);return;}p=this.getPreviousSelectableItem(i+1);this.setHoveredItem(p);p&&p.focus(this);e.preventDefault();e.stopPropagation();};j.prototype.onsapselect=function(e){this._sapSelectOnKeyDown=true;e.preventDefault();e.stopPropagation();};j.prototype.onkeyup=function(e){if(this.oHoveredItem&&(q(e.target).prop("tagName")!="INPUT")){var o=this.oHoveredItem.getDomRef();q(o).trigger("focus");}if(!this._sapSelectOnKeyDown&&(e.key!==K.Space||(!D.os.macintosh&&w.navigator.maxTouchPoints<=1))){return;}else{this._sapSelectOnKeyDown=false;}if(!f.events.sapselect.fnCheck(e)&&e.key!=="Enter"){return;}this.selectItem(this.oHoveredItem,true,false);e.preventDefault();e.stopPropagation();};j.prototype.onsapbackspace=function(e){if(q(e.target).prop("tagName")!="INPUT"){e.preventDefault();}};j.prototype.onsapbackspacemodifiers=j.prototype.onsapbackspace;j.prototype.onsapescape=function(e){this.close(true);e.preventDefault();e.stopPropagation();};j.prototype.onsaptabnext=function(e){if(this.isSubMenu()){e.preventDefault();}this.close(true);e.stopPropagation();};j.prototype.onsaptabprevious=j.prototype.onsaptabnext;j.prototype._openSubMenuDelayed=function(i){if(!i){return;}this._discardOpenSubMenuDelayed();this._delayedSubMenuTimer=setTimeout(function(){this.checkEnabled(i)&&this.closeSubmenu(false,true);if(this.checkEnabled(i)&&i.getSubmenu()){this.setHoveredItem(i);i&&i.focus(this);this.openSubmenu(i,false,true);}}.bind(this),i.getSubmenu()&&this.checkEnabled(i)?j._DELAY_SUBMENU_TIMER:j._DELAY_SUBMENU_TIMER_EXT);};j.prototype._discardOpenSubMenuDelayed=function(i){if(this._delayedSubMenuTimer){clearTimeout(this._delayedSubMenuTimer);this._delayedSubMenuTimer=null;}};j.prototype.onmouseout=function(e){if(!D.system.desktop){return;}if(g(e,this.getDomRef())){this.setHoveredItem(null);if(!this.oOpenedSubMenu||!(this.oOpenedSubMenu.getParent()===this.oHoveredItem)){this.setHoveredItem(this.oHoveredItem);}this._discardOpenSubMenuDelayed();}};j.prototype.onsapfocusleave=function(e){if(this.oOpenedSubMenu||!this.bOpen){return;}this.getRootMenu().handleOuterEvent(this.getId(),e);};j.prototype.handleOuterEvent=function(o,e){var i=false,t=D.support.touch||D.system.combi;this.bIgnoreOpenerDOMRef=false;if(e.type=="mousedown"||e.type=="touchstart"){if(t&&(e.isMarked("delayedMouseEvent")||e.isMarked("cancelAutoClose"))){return;}var n=this;while(n&&!i){if(b(n.getDomRef(),e.target)){i=true;}n=n.oOpenedSubMenu;}}else if(e.type=="sapfocusleave"){if(t){return;}if(e.relatedControlId){var n=this;while(n&&!i){if((n.oOpenedSubMenu&&n.oOpenedSubMenu.getId()==e.relatedControlId)||b(n.getDomRef(),q(document.getElementById(e.relatedControlId)).get(0))){i=true;}n=n.oOpenedSubMenu;}}if(!i){this.bIgnoreOpenerDOMRef=true;}}if(!i){this.close();}};j.prototype.getItemByDomRef=function(o){var I=this.getItems(),e=I.length;for(var i=0;i<e;i++){var n=I[i],p=n.getDomRef();if(b(p,o)){return n;}}return null;};j.prototype.selectItem=function(i,W,e){if(!i||!(i instanceof M&&this.checkEnabled(i))){return;}var S=i.getSubmenu();if(!S){this.getRootMenu().close(true);}else{if(!D.system.desktop&&this.oOpenedSubMenu===S){this.closeSubmenu();}else{this.openSubmenu(i,W);}}i.fireSelect({item:i,ctrlKey:e});this.getRootMenu().fireItemSelect({item:i});};j.prototype.isSubMenu=function(){return this.getParent()&&this.getParent().getParent&&this.getParent().getParent()instanceof j;};j.prototype.getRootMenu=function(){var t=this;while(t.isSubMenu()){t=t.getParent().getParent();}return t;};j.prototype.getMenuLevel=function(){var i=1;var t=this;while(t.isSubMenu()){t=t.getParent().getParent();i++;}return i;};j.prototype.getPopup=function(){if(!this.oPopup){this.oPopup=new P(this,false,true,false);this.oPopup.setDurations(0,0);this.oPopup.attachClosed(this._menuClosed,this);this.oPopup.attachOpened(this._handleOpened,this);}return this.oPopup;};j.prototype.setHoveredItem=function(i){if(this.oHoveredItem){this.oHoveredItem.hover(false,this);}if(!i){this.oHoveredItem=null;return;}this.oHoveredItem=i;i.hover(true,this);this.scrollToItem(this.oHoveredItem);};j.prototype.openSubmenu=function(i,W,e){var S=i.getSubmenu();if(!S){return;}if(this.oOpenedSubMenu&&this.oOpenedSubMenu!==S){this.closeSubmenu();}if(this.oOpenedSubMenu){this.oOpenedSubMenu._bFixed=(e&&this.oOpenedSubMenu._bFixed)||(!e&&!this.oOpenedSubMenu._bFixed);this.oOpenedSubMenu._bringToFront();}else{this.oOpenedSubMenu=S;var n=P.Dock;S.open(W,i,n.BeginTop,n.EndTop,i,"-4 4");}};j.prototype.closeSubmenu=function(i,I){if(this.oOpenedSubMenu){if(i&&this.oOpenedSubMenu._bFixed){return;}if(I){this.oOpenedSubMenu.bIgnoreOpenerDOMRef=true;}this.oOpenedSubMenu.close();this.oOpenedSubMenu=null;}};j.prototype.scrollToItem=function(i){var o=this.getDomRef(),I=i?i.getDomRef():null;if(!I||!o){return;}var e=o.scrollTop,n=I.offsetTop,p=q(o).height(),r=q(I).height();if(e>n){o.scrollTop=n;}else if((n+r)>(e+p)){o.scrollTop=Math.ceil(n+r-p);}};j.prototype._bringToFront=function(){q(document.getElementById(this.getPopup().getId())).mousedown();};j.prototype.checkEnabled=function(i){return i&&i.getEnabled()&&this.getEnabled();};j.prototype.getNextSelectableItem=function(I){var o=null;var e=this.getItems();for(var i=I+1;i<e.length;i++){if(e[i].getVisible()&&this.checkEnabled(e[i])){o=e[i];break;}}if(!o){for(var i=0;i<=I;i++){if(e[i].getVisible()&&this.checkEnabled(e[i])){o=e[i];break;}}}return o;};j.prototype.getPreviousSelectableItem=function(I){var o=null;var e=this.getItems();for(var i=I-1;i>=0;i--){if(e[i].getVisible()&&this.checkEnabled(e[i])){o=e[i];break;}}if(!o){for(var i=e.length-1;i>=I;i--){if(e[i].getVisible()&&this.checkEnabled(e[i])){o=e[i];break;}}}return o;};j.prototype.setRootMenuTopStyle=function(u){this.getRootMenu().bUseTopStyle=u;j.rerenderMenu(this.getRootMenu());};j.rerenderMenu=function(o){var I=o.getItems();for(var i=0;i<I.length;i++){var S=I[i].getSubmenu();if(S){j.rerenderMenu(S);}}o.invalidate();o.rerender();};j.prototype.focus=function(){if(this.bOpen){C.prototype.focus.apply(this,arguments);}};j.prototype.isCozy=function(){if(!this.bCozySupported){return false;}if(this.hasStyleClass("sapUiSizeCozy")){return true;}if(k(this.oOpenerRef)){return true;}if(k(this.getParent())){return true;}return false;};function k(r){if(!r){return false;}r=r.$?r.$():q(r);return r.closest(".sapUiSizeCompact,.sapUiSizeCondensed,.sapUiSizeCozy").hasClass("sapUiSizeCozy");}function s(o,e){var p=o.getParent();if(p&&p instanceof M){p.onSubmenuToggle(e);}}function m(o){var e=o.getMaxVisibleItems(),n=document.documentElement.clientHeight-10,$=o.$();if(e>0){var I=o.getItems();for(var i=0;i<I.length;i++){if(I[i].getDomRef()){n=Math.min(n,I[i].$().outerHeight(true)*e);break;}}}if($.outerHeight(true)>n){$.css("max-height",n+"px").toggleClass("sapUiMnuScroll",true);}else{$.css("max-height","").toggleClass("sapUiMnuScroll",false);}}function _(o){var r;if(!o){return false;}if(o instanceof q){o=o.get(0);}r=o.getBoundingClientRect();return(r.top>=0&&r.left>=0&&r.bottom<=(w.innerHeight||document.documentElement.clientHeight)&&r.right<=(w.innerWidth||document.documentElement.clientWidth));}})(window);return j;});
