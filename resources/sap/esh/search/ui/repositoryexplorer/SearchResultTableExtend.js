/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["../i18n","sap/ui/core/CustomData","sap/m/Button","sap/m/ButtonType","sap/m/MessageToast"],function(i,C,B,a,M){"use strict";var m={};jQuery.extend(m,{extendTableColumn:{column:{name:i.getText("actions"),attributeId:"SEARCH_TABLE_FAVORITE",width:"70px",},assembleCell:function(d){var b=d.idAttribute.value;var c=!!d.favoriteUserId.value;return{isExtendTableColumnCell:true,iconFavorite:"sap-icon://favorite",iconUnfavorite:"sap-icon://unfavorite",itemId:b,isFavorite:c,};},bindingFunction:function(b){var c="isNoFavorite";var d="isFavorite";var e=b.isFavorite?d:c;var f=new B({icon:b.isFavorite?b.iconFavorite:b.iconUnfavorite,tooltip:b.isFavorite?i.getText("unfavorite"):i.getText("favorite"),type:a.Transparent,customData:[new C({key:"testid",value:e,writeToDom:true,}),],press:function(){var o={closeOnBrowserNavigation:false,};var r=window.location.origin+"/dwaas-core/repository/userfavorites?ids="+b.itemId;this.setBusyIndicatorDelay(0);this.setBusy(true);if(this.getIcon()===b.iconUnfavorite){this.getModel().sinaNext.provider.ajaxClient.request({method:"POST",url:r,}).then(function(){this.setIcon(b.iconFavorite);this.getModel().invalidateQuery();this.setBusy(false);this.addCustomData(new C({key:"testid",value:d,writeToDom:true,}));M.show(i.getText("favoriteToast"),o);}.bind(this),function(){this.setBusy(false);}.bind(this));}else{this.getModel().sinaNext.provider.ajaxClient.request({method:"DELETE",url:r,}).then(function(){this.setIcon(b.iconUnfavorite);this.getModel().invalidateQuery();this.setBusy(false);this.addCustomData(new C({key:"testid",value:c,writeToDom:true,}));M.show(i.getText("unfavoriteToast"),o);}.bind(this),function(){this.setBusy(false);}.bind(this));}},});f.addStyleClass("sapUshellSearchTableFavorite");f.data("testid",e,true);return f;},},});return m;});
