/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2014 SAP SE. All rights reserved
 */

// Provides control sap.ca.ui.PictureViewer.
jQuery.sap.declare("sap.ca.ui.PictureViewer");
jQuery.sap.require("sap.ca.ui.library");
jQuery.sap.require("sap.m.TileContainer");


/**
 * Constructor for a new PictureViewer.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * Picture viewer control relying on the TileContainer control
 * @extends sap.m.TileContainer
 *
 * @constructor
 * @public
 * @deprecated Since version 1.22. 
 * PictureViewer was replacing the Carousel as it wasn't supporting some versions of MS Internet Explorer.
 * Now, the sap.m.Carousel is fully functional, please use sap.m.Carousel instead.
 * This control will not be supported anymore.
 * @name sap.ca.ui.PictureViewer
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.m.TileContainer.extend("sap.ca.ui.PictureViewer", /** @lends sap.ca.ui.PictureViewer.prototype */ { metadata : {

	deprecated : true,
	library : "sap.ca.ui",
	properties : {

		/**
		 * Percentage of the space occupied by the image in the picture viewer control. Please note that
		 * if the factor is too close to 1, the navigation arrows usually displayed in desktop mode will not be
		 * available
		 */
		tileScaling : {type : "float", group : "Misc", defaultValue : 0.95},

		/**
		 * Defines whether or not you can remove a picture
		 */
		removable : {type : "boolean", group : "Misc", defaultValue : false}
	},
	defaultAggregation : "items",
	aggregations : {

		/**
		 * Aggregation of PictureViewerItem that contains either a picture URI or the actual Image
		 * control.
		 */
		items : {type : "sap.ca.ui.PictureViewerItem", multiple : true, singularName : "item"}
	},
	events : {

		/**
		 * Thrown when user delete an image
		 */
		pictureDeleted : {}
	}
}});

jQuery.sap.require("sap.ui.core.ResizeHandler");
jQuery.sap.require("sap.m.TileContainer");

sap.ca.ui.PictureViewer.prototype.init = function () {
	sap.m.TileContainer.prototype.init.apply(this);
	this.setEditable(false);

	if (sap.ui.getCore().isMobile()) {
		jQuery(window).bind("tap", jQuery.proxy(this._reset, this));
		var oStaticArea = sap.ui.getCore().getStaticAreaRef();
		this.$blocker = jQuery("<div class='sapCaPVBly sapUiBLy'></div>").css("visibility", "hidden");
		jQuery(oStaticArea).append(this.$blocker);
	}
	if (sap.ui.getCore().isMobile()) {
		//sap.ui.Device.orientation.attachHandler(jQuery.proxy(this._onOrientationChange, this));
	} else {
		jQuery(window).bind("resize", jQuery.proxy(this._resize, this));
	}

	this.addStyleClass("sapCaPW");

	// onBeforeRendering() is not called the first time
	this.addStyleClass("sapCaPWRendering");

	// Handling Keyboard Navigation
	this.onsapright = this._bRtl ? jQuery.proxy(this.scrollRightRTL, this) : jQuery.proxy(this.scrollRight, this);
	this.onsapleft = this._bRtl ? jQuery.proxy(this.scrollLeftRTL, this) : jQuery.proxy(this.scrollLeft, this);
};

/**
 * Handles the resize event for the tile container.
 * This is called whenever the orientation of browser size changes.
 * @private
 */
sap.ca.ui.PictureViewer.prototype._resize = function () {
	if (this._oDragSession) {
		return;
	}

	setTimeout(jQuery.proxy(function () {
			this._applyDimension();
			this._update(false);
			delete this._iInitialResizeTimeout;
		}, this),
		this._iInitialResizeTimeout);

	this._iInitialResizeTimeout = 0; //now we do not need to wait
};

sap.ca.ui.PictureViewer.prototype.exit = function () {
	if (sap.ui.getCore().isMobile()) {
		this.$blocker.remove();
		//sap.ui.Device.orientation.detachHandler(jQuery.proxy(this._onOrientationChange, this));
	} else {
		jQuery(window).unbind("resize", jQuery.proxy(this._resize, this));
	}

	sap.m.TileContainer.prototype.exit.apply(this);

	if (!jQuery.device.is.desktop) {
		jQuery(window).unbind("tap", jQuery.proxy(this._reset, this));
	}
};

/**
 * Set the percentage of the space occupied by the image in the picture viewer control.
 * Please note that if the factor is too close to 1, the navigation arrows usually displayed in desktop mode will not be available
 * @override
 * @public
 * @param fTileScale
 */
sap.ca.ui.PictureViewer.prototype.setTileScaling = function (fTileScale) {
	if (fTileScale < 0 || fTileScale > 1) {
		fTileScale = 0.75;
		jQuery.sap.log.error("Tile Scaling should be a float value between 0 and 1 and not " + fTileScale
			+ ". Setting it to 0.75 by default.");
	}
	this.setProperty('tileScaling', fTileScale);
};

/**
 * Adds some item <code>oItem</code>
 * to the aggregation named <code>items</code>.
 *
 * @override
 * @param {sap.ca.ui.PictureViewerItem}
 *            oItem the item to add; if empty, nothing is inserted
 * @return {sap.ca.ui.PictureViewer} <code>this</code> to allow method chaining
 * @public
 * @name sap.ca.ui.PictureViewer#addItem
 * @function
 *
 * @deprecated Use aggregation "tiles"
 */
sap.ca.ui.PictureViewer.prototype.addItem = function (oItem) {
	this.insertItem(oItem, this.getItems().length);
};

/**
 * Inserts a item into the aggregation named <code>items</code>.
 * When adding a new item to the aggregation, a sap.ca.ui.PictureTile is actually created
 * with its own ID and added to the internal TileContainer.
 *
 * @override
 * @param {sap.ca.ui.PictureViewerItem}
 *          oItem the item to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the item should be inserted at; for
 *             a negative value of <code>iIndex</code>, the item is inserted at position 0; for a value
 *             greater than the current size of the aggregation, the item is inserted at
 *             the last position
 * @return {sap.ca.ui.PictureViewer} <code>this</code> to allow method chaining
 * @public
 * @name sap.ca.ui.PictureViewer#insertItem
 * @function
 *
 * @deprecated Use aggregation "tiles"
 */
sap.ca.ui.PictureViewer.prototype.insertItem = function (oItem, iIndex) {
	var tileToAdd = new sap.ca.ui.PictureTile({
		tileContent: oItem
	});
	tileToAdd.attachPictureDelete(jQuery.proxy(this._deletePictureRequestHandler, this));

	this.insertTile(tileToAdd, iIndex);
	this.insertAggregation("items", oItem, iIndex);

	return this;
};

sap.ca.ui.PictureViewer.prototype.insertTile = function (oTile, iIndex) {
	oTile.attachPictureDelete(jQuery.proxy(this._deletePictureRequestHandler, this));
	sap.m.TileContainer.prototype.insertTile.apply(this, arguments);
};

sap.ca.ui.PictureViewer.prototype.deleteTile = function (oTile) {
	sap.m.TileContainer.prototype.deleteTile.apply(this, arguments);

	oTile.destroy();
};

/**
 * Removes the picture at index <code>iIndex</code> from the <code>items</code> aggregation.
 *
 * @override
 * @param {int}
 *             iIndex the <code>0</code>-based index of the picture collection to delete;
 *             if <code>iIndex</code> is out of range or empty, the current image will be deleted.
 * @return {sap.ca.ui.PictureViewer} <code>this</code> to allow method chaining
 * @public
 * @name sap.ca.ui.PictureViewer#deletePicture
 * @function
 */
sap.ca.ui.PictureViewer.prototype.deletePicture = function (iIndex) {
	var pictureTileIndexToDelete, pictureTileToDelete, numberOfPictures;
	numberOfPictures = this.getTiles().length;

	if (typeof iIndex != "number" || iIndex < 0 || iIndex >= numberOfPictures) {
		pictureTileIndexToDelete = this.getPageFirstTileIndex();
	} else {
		pictureTileIndexToDelete = iIndex;
	}

	if (pictureTileIndexToDelete > -1) {
		pictureTileToDelete = this.getTiles()[pictureTileIndexToDelete];
		pictureTileToDelete.detachPictureDelete(jQuery.proxy(this._deletePictureRequestHandler, this));
		this.deleteTile(pictureTileToDelete);
		this.removeAggregation("items", pictureTileIndexToDelete, true);
	} else {
		jQuery.sap.log.warning("Cannot find and delete a picture at index : " + iIndex);
	}

	return this;
};

/**
 * Select the picture at index <code>iIndex</code> from the <code>items</code> aggregation.
 *
 * @override
 * @param {int}
 *             iIndex the <code>0</code>-based index of the aggregation to select; for
 *             a negative value of <code>iIndex</code>, the picture at position 0 is selected; for a value
 *             greater than the current size of the aggregation, the selected picture at the last position is selected
 * @return {sap.ca.ui.PictureViewer} <code>this</code> to allow method chaining
 * @public
 * @name sap.ca.ui.PictureViewer#selectPicture
 * @function
 */
sap.ca.ui.PictureViewer.prototype.selectPicture = function (iIndex) {
	var numberOfPictures = this.getTiles().length;

	if (typeof iIndex != "number") {
		iIndex = 0;
    } else if (iIndex < 0) {
		iIndex = 0;
    } else if (iIndex >= numberOfPictures) {
		iIndex = numberOfPictures - 1;
	}

	if (this._bRendered) {
		this.addStyleClass("sapCaPWRendering");
	}

	this._selectedIndex = iIndex;

	return this;
};

sap.ca.ui.PictureViewer.prototype.setSelectedIndex = function (iIndex) {
	this.selectPicture(iIndex);
};

/**
 * Gets the current picture index.
 *
 * @override
 * @return {sap.ca.ui.PictureViewer} the current picture index
 * @public
 * @name sap.ca.ui.PictureViewer#getCurrentPictureIndex
 * @function
 */
sap.ca.ui.PictureViewer.prototype.getCurrentPictureIndex = function () {
	return this.getPageFirstTileIndex();
};

/**
 * Gets the image index from the TileContainer and fires an event
 */
sap.ca.ui.PictureViewer.prototype._deletePictureRequestHandler = function (oEvent) {
	var pictureTileIndexToDelete = this.indexOfTile(oEvent.getSource());

	this.deleteTile(oEvent.getSource());

	this.firePictureDeleted({
		index: pictureTileIndexToDelete
	});
};

/**
 * Get rid of potential visible "delete" button
 *
 * Only used on mobile devices
 *
 */
sap.ca.ui.PictureViewer.prototype._reset = function (oEvent) {
	var i = this.getCurrentPictureIndex();

	var aTiles = this.getTiles();
	if (i > -1 && aTiles && aTiles.length > i) {
		var oTile = aTiles[i];
		if (oTile) {
			var $target = jQuery(oEvent.target);
			var $this = this.$();
			if ($this.length > 0 && $target.length > 0) {
				var $parent = $target.closest(this.$());
				if ($parent.length === 0) { // the "tap" was outside the PictureViewer
					oTile.switchVisibility(false);
				}
			}
		}
	}
};

/**
 * Specify whether or not you can delete a picture.
 * If FALSE the delete button will never be visible. Default value is TRUE
 * @override
 * @public
 */
sap.ca.ui.PictureViewer.prototype.setRemovable = function (bValue) {
	this.setProperty("removable", bValue, true);
	this.toggleStyleClass("sapCaPWEditable", bValue);

};

sap.ca.ui.PictureViewer.prototype.setEditable = function (bValue) {
	// set Editable to false no matter what
	sap.m.TileContainer.prototype.setEditable.call(this, false);
};

/**
 * Returns the dimension (width and height) of a tile
 * @returns {object} width and height of a tile
 * @private
 */
sap.ca.ui.PictureViewer.prototype._getTileDimension = function () {
	if (!this._bRendered) {
		return;
	}

	var $scroller = jQuery.sap.byId(this.getId() + "-scrl");
	var oTileDim = {
		width: $scroller.width(),
		height: $scroller.height()
	};
	return oTileDim;
};

sap.ca.ui.PictureViewer.prototype.onBeforeRendering = function () {
	this.addStyleClass("sapCaPWRendering");
};

/**
 * Handles the internal event onAfterRendering
 * @private
 */
sap.ca.ui.PictureViewer.prototype.onAfterRendering = function () {
	this._bRendered = true;
	//init resizing
	//this._sResizeListenerId = sap.ui.core.ResizeHandler.register(this.getDomRef().parentElement,  jQuery.proxy(this._resize, this));

	//init the dimensions to the container scoll area
	this._applyDimension();
	this.$().toggleClass("sapCaPWEditable", this.getRemovable() === true);
	var that = this;
	this._sInitialResizeTimeoutId = setTimeout(function () {
		that.addStyleClass("sapCaPWRendering");
		that._update(false);

	}, this._iInitialResizeTimeout);

	//Set initial focus
	if (jQuery.device.is.desktop) {
		var oFocusTile = this.getTiles()[0],
			iTimeout = this._iInitialResizeTimeout;
		if (!!oFocusTile) {
			setTimeout(jQuery.proxy(function () {
				this._findTile(oFocusTile.$()).focus();
			}, this), iTimeout);
		}
	}

};

/**
 * @override
 */
sap.ca.ui.PictureViewer.prototype._update = function (bAnimated) {
	sap.m.TileContainer.prototype._update.apply(this, arguments);
	this.removeStyleClass("sapCaPWRendering");
	if (sap.ui.getCore().isMobile()) {
		var $blocker = this.$blocker;
		setTimeout(jQuery.proxy(function () {
			$blocker.fadeOut(200, function () {
				jQuery(this).css("visibility", "hidden").css("z-index", 0);
			});
		}, this), 250);
	}
};

/**
 * Applies the containers dimensions
 * @private
 */
sap.ca.ui.PictureViewer.prototype._applyDimension = function () {
	var oDim = this._getDimension();
	if (oDim !== undefined) { // 0120061532 0003814994 2013
		var sId = this.getId(),
			$this = this.$(),
			oThisPos,
			iOffset = 10,
			iTopOffset = 60,
			$Content = jQuery.sap.byId(sId + "-cnt"),
			contentPos,
			contentOuterHeight,
			pagerHeight = jQuery.sap.byId(sId + "-pager").outerHeight();

		jQuery.sap.byId(sId + "-scrl").css({
			width: oDim.outerwidth + "px",
			height: (oDim.outerheight - pagerHeight) + "px"
		});

		$Content.css({
			height: (oDim.outerheight - pagerHeight) + "px",
			visibility: "visible"
		});

		$this.css("visibility", "visible");
		oThisPos = $this.position();

		contentPos = $Content.position();
		contentOuterHeight = $Content.outerHeight();

		if (jQuery.device.is.phone) {
			iOffset = 2;
		} else if (jQuery.device.is.desktop) {
			iOffset = 0;
		}

		jQuery.sap.byId(sId + "-blind").css({
			top: (contentPos.top + iOffset) + "px",
			left: (contentPos.left + iOffset) + "px",
			width: ($Content.outerWidth() - iOffset) + "px",
			height: (contentOuterHeight - iOffset) + "px"
		});

		jQuery.sap.byId(sId + "-rightedge").css({
			top: (oThisPos.top + iOffset + iTopOffset) + "px",
			right: iOffset + "px",
			height: (contentOuterHeight - iOffset - iTopOffset) + "px"
		});

		jQuery.sap.byId(sId + "-leftedge").css({
			top: (oThisPos.top + iOffset + iTopOffset) + "px",
			left: (oThisPos.left + iOffset) + "px",
			height: (contentOuterHeight - iOffset - iTopOffset) + "px"
		});
	}
};

/**
 *
 * Adding overlay to hide blinking while switching orientation
 *
 * @private
 */
sap.ca.ui.PictureViewer.prototype.showBlockerLayer = function (callback) {
	// get higher z-index
	if (sap.ui.getCore().isMobile()) {
		var zindex = 20;
		jQuery(sap.ui.getCore().getStaticAreaRef()).children().each(function (index, value) {
			var z = parseInt(jQuery(value).css("z-index"), 10);
			if (!isNaN(z)) {
				zindex = Math.max(zindex, z);
			}
		});
		jQuery.sap.log.debug("blocker layer z-index calculated : " + zindex + 1);
		this.$blocker.css("z-index", zindex + 1).css("visibility", "visible").fadeIn(200, function () {
			if (callback) {
				callback.call();
			}
		});
	} else {
		if (callback) {
			callback.call();
		}
	}

};


