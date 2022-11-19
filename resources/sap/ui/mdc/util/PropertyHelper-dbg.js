/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/base/DataType",
	"sap/base/util/merge",
	"sap/base/util/isPlainObject",
	"sap/base/Log"
], function(
	BaseObject,
	DataType,
	merge,
	isPlainObject,
	Log
) {
	"use strict";

	/*global Set, WeakMap */

	/*
	 * Key-value map to define the characteristics of a property attribute, where the key is the name of the attribute.
	 *
	 * Metadata information:
	 * - type
	 *     Can be any type that is also allowed for a control property, plus "PropertyReference" for references to simple properties.
	 *     Complex types can be specified with an object that describes sub-attributes.
	 *     Examples: "string", "string[]", "sap.ui.mdc.MyEnum", "any", "PropertyReference",
	 *               {
	 *                   subAttribute: {type: "string", defaultValue: "myDefaultValue"}
	 *                   ...
	 *               }
	 * - mandatory (optional, default=false, only for top-level attribute)
	 *     Whether this attribute must be provided.
	 * - allowedForComplexProperty (optional, default=false)
	 *     Whether it is allowed to provide this attribute for a complex property.
	 * - valueForComplexProperty (optional):
	 *     For a complex property, this defines the value of an attribute that is not allowed for complex properties.
	 * - defaultValue (optional)
	 *     This can either be a value, or a reference to another attribute in the form "attribute:x", with x being the name of the other
	 *     attribute. The default value of this attribute is then the value of the other attribute. This works only one level deep.
	 *     Examples: "attribute:name", "attribute:attributeName.subAttributeName"
	 */
	var mAttributeMetadata = { // TODO: "allowedForComplexProperty" propagation to children + reserved reference attribute, e.g. unit -> unitProperty
		// Common
		name: { // Unique key
			type: "string", // TODO: sap.ui.core.ID cannot be used currently, because some OPA tests fail
			mandatory: true,
			allowedForComplexProperty: true
		},
		label: { // Translatable text describing the property.
			type: "string",
			mandatory: true,
			allowedForComplexProperty: true
		},
		visible: { // Whether the property is visible in the "Items" personalization.
			type: "boolean",
			defaultValue: true,
			allowedForComplexProperty: true
		},
		path: { // The technical path for a data source property.
			type: "string",
			valueForComplexProperty: null
		},
		// TODO: Is it possible to reduce the required information by integrating/using TypeUtil (obtained from delegate) here?
		typeConfig: {
			type: {
				className: {
					type: "string"
				},
				baseType: {
					type: "string"
				},
				typeInstance: {
					type: "object" // sap.ui.model.SimpleType
				}
			},
			//defaultValue: ?? TODO: Is there a default value (e.g. type string), or is it even mandatory?
			valueForComplexProperty: null
		},
		// TODO: What's the meaning? type = boolean? Is used only once in FilterBarBase: oProperty.maxConditions !== -1
		maxConditions: {
			type: "int",
			defaultValue: -1,
			valueForComplexProperty: null
		},
		caseSensitive: {
			type: "boolean",
			defaultValue: true
		},
		group: { // Key of the group the property is inside. Used to visually group properties in personalization dialogs.
			type: "string",
			allowedForComplexProperty: true
		},
		groupLabel: { // Translatable text of the group.
			type: "string",
			allowedForComplexProperty: true
		},

		// Table, Chart, P13N
		filterable: { // Whether it is possible to filter by this property.
			type: "boolean",
			defaultValue: true,
			valueForComplexProperty: false
		},
		sortable: { // Whether it is possible to sort by this property.
			type: "boolean",
			defaultValue: true,
			valueForComplexProperty: false
		},

		// Table
		key: { // Whether the property is a key or part of a key in the data.
			type: "boolean",
			valueForComplexProperty: false
		},
		groupable: { // Whether it is possible to group by this property.
			type: "boolean",
			valueForComplexProperty: false
		},
		propertyInfos: { // List of names of simple properties. If this attribute is set, the property is a "complex property".
			type: "PropertyReference[]",
			allowedForComplexProperty: true
		},
		unit: { // Name of the unit property that is related to this property.
			type: "PropertyReference"
		},
		text: { // Name of the text property that is related to this property in a 1:1 relation.
			type: "PropertyReference"
		},
		exportSettings: { // Export settings as specified by sap.ui.export.Spreadsheet.
			type: "object",
			allowedForComplexProperty: true
		},
		visualSettings: { // This object contains all relevant properties for visual adjustments
			type: "object"
		},

		// Chart

		// FilterBar
		required:  { // Whether there must be a filter condition for this property before firing a "search" event.
			type: "boolean"
		},
		hiddenFilter:  { // Name of the property indicating if the filter is never to be shown on the UI.
			type: "boolean"
		}

		// Reserved attributes
		// extension - Used to add model-specific information. For example, for analytics in OData, see sap.ui.mdc.odata.v4.TableDelegate.
	};

	/**
	 * The methods listed in this map are added to every property info object.
	 */
	var mPropertyMethods = {
		/**
		 * Checks whether the property is complex.
		 *
		 * @this PropertyInfo
		 * @returns {boolean|null} Whether the property is complex
		 */
		isComplex: function() {
			return PropertyHelper.isPropertyComplex(this);
		},
		/**
		 * Gets all properties referenced by the property.
		 *
		 * @this PropertyInfo
		 * @returns {object[]} The referenced properties
		 */
		getReferencedProperties: function() {
			// TODO: Return all referenced properties, e.g. unit, text, etc.?
			return this.propertyInfosProperties || [];
		},
		/**
		 * Gets all sortable properties referenced by the property, including the property itself if it is non-complex.
		 *
		 * @this PropertyInfo
		 * @returns {object[]} The sortable properties
		 */
		getSortableProperties: function() {
			return extractProperties(this, function(oProperty) {
				return oProperty.sortable;
			});
		},
		/**
		 * Gets all filterable properties referenced by the property, including the property itself if it is non-complex.
		 *
		 * @this PropertyInfo
		 * @returns {object[]} The filterable properties
		 */
		getFilterableProperties: function() {
			return extractProperties(this, function(oProperty) {
				return oProperty.filterable;
			});
		},
		/**
		 * Gets all groupable properties referenced by the property, including the property itself if it is non-complex.
		 *
		 * @this PropertyInfo
		 * @returns {object[]} The groupable properties
		 */
		getGroupableProperties: function() {
			return extractProperties(this, function(oProperty) {
				return oProperty.groupable;
			});
		},
		/**
		 * Gets all visible properties referenced by the property, including the property itself if it is non-complex.
		 *
		 * @this PropertyInfo
		 * @returns {object[]} The visible properties
		 */
		getVisibleProperties: function() {
			return extractProperties(this, function(oProperty) {
				return oProperty.visible;
			});
		}
	};

	var aCommonAttributes = ["name", "label", "visible", "path", "typeConfig", "maxConditions", "group", "groupLabel", "caseSensitive"];
	var _private = new WeakMap();

	function stringifyPlainObject(oObject) {
		return JSON.stringify(oObject, function(sKey, oValue) {
			return oValue === undefined ? null : oValue;
		}) || "";
	}

	function reportInvalidProperty(sMessage, oAdditionalInfo) {
		// TODO: warning is logged momentarily so that consumers can adapt to have valid property definitions
		//  valid use case would be to throw an error
		var sAdditionalInfo = stringifyPlainObject(oAdditionalInfo);
		Log.warning("Invalid property definition: " + sMessage + (sAdditionalInfo ? "\n" + sAdditionalInfo : ""));
	}

	function throwInvalidPropertyError(sMessage, oAdditionalInfo) {
		var sAdditionalInfo = oAdditionalInfo ? stringifyPlainObject(oAdditionalInfo) : null;
		throw new Error("Invalid property definition: " + sMessage + (sAdditionalInfo ? "\n" + sAdditionalInfo : ""));
	}

	function enrichProperties(oPropertyHelper, aProperties) {
		aProperties.map(function(oProperty) {
			Object.keys(mPropertyMethods).forEach(function(sMethod) {
				Object.defineProperty(oProperty, sMethod, {
					value: function() {
						return mPropertyMethods[sMethod].call(this);
					},
					writable: true
				});
			});
		});
	}

	function deepFreeze(oObject) {
		var aKeys = Object.getOwnPropertyNames(oObject);

		Object.freeze(oObject);

		for (var i = 0; i < aKeys.length; i++) {
			var vValue = oObject[aKeys[i]];

			if (typeof vValue === "function") {
				Object.freeze(vValue);
			} else if (isPlainObject(vValue) && !Object.isFrozen(vValue)) {
				deepFreeze(vValue);
			} else if (Array.isArray(vValue)) {
				deepFreeze(vValue);
			}
		}
	}

	function deepFind(oObject, sPath) {
		if (!sPath) {
			return oObject;
		}

		return sPath.split(".").reduce(function(oCurrent, sSection) {
			return oCurrent && oCurrent[sSection] ? oCurrent[sSection] : null;
		}, oObject);
	}

	function getAttributeDataType(vAttributeType) {
		var sType;

		if (typeof vAttributeType === "object") {
			sType = "object";
		} else {
			sType = vAttributeType.replace("PropertyReference", "string");
		}

		return DataType.getType(sType);
	}

	function getTypeDefault(vAttributeType) {
		var oDataType = getAttributeDataType(vAttributeType);

		if (oDataType.isArrayType()) {
			return oDataType.getBaseType().getDefaultValue();
		} else {
			return oDataType.getDefaultValue();
		}
	}

	function prepareProperties(oPropertyHelper, aProperties) {
		aProperties.forEach(function(oProperty) {
			oPropertyHelper.prepareProperty(oProperty);
		});

		deepFreeze(aProperties);
	}

	function preparePropertyDeep(oPropertyHelper, oProperty, mProperties, sPath, oPropertySection, mAttributeSection) {
		var bTopLevel = sPath == null;
		var aDependenciesForDefaults = [];
		var bIsComplex = PropertyHelper.isPropertyComplex(oProperty);

		if (bTopLevel) {
			mAttributeSection = _private.get(oPropertyHelper).mAttributeMetadata;
			oPropertySection = oProperty;
		}

		if (!oPropertySection) {
			return [];
		}

		for (var sAttribute in mAttributeSection) {
			var mAttribute = mAttributeSection[sAttribute];
			var sAttributePath = bTopLevel ? sAttribute : sPath + "." + sAttribute;
			var vValue = oPropertySection[sAttribute];

			if (bIsComplex && !mAttribute.allowedForComplexProperty) {
				if ("valueForComplexProperty" in mAttribute) {
					oPropertySection[sAttribute] = mAttribute.valueForComplexProperty;
				}
				continue;
			}

			if (vValue != null && typeof mAttribute.type === "string" && mAttribute.type.startsWith("PropertyReference")
				|| sAttributePath === "propertyInfos") {

				if (bIsComplex || sAttributePath !== "propertyInfos") {
					preparePropertyReferences(oPropertySection, sAttribute, mProperties);
				}

				continue;
			}

			if (vValue == null) {
				setAttributeDefault(oPropertySection, mAttribute, sPath, sAttribute, aDependenciesForDefaults);
			}

			if (typeof mAttribute.type === "object") {
				aDependenciesForDefaults = aDependenciesForDefaults.concat(preparePropertyDeep(
					oPropertyHelper, oProperty, mProperties, sAttributePath, oPropertySection[sAttribute], mAttribute.type
				));
			}
		}

		return aDependenciesForDefaults;
	}

	function preparePropertyReferences(oPropertySection, sAttribute, mProperties) {
		var vPropertyReference = oPropertySection[sAttribute];
		var vProperties;
		var sPropertyName = sAttribute;

		if (Array.isArray(vPropertyReference)) {
			vProperties = vPropertyReference.map(function(sName) {
				return mProperties[sName];
			});
			sPropertyName += "Properties";
		} else {
			vProperties = mProperties[vPropertyReference];
			sPropertyName += "Property";
		}

		Object.defineProperty(oPropertySection, sPropertyName, {
			value: vProperties
		});
	}

	function setAttributeDefault(oPropertySection, mAttributeSection, sSection, sAttribute, aDependenciesForDefaults) {
		if ("defaultValue" in mAttributeSection) {
			if (typeof mAttributeSection.defaultValue === "string" && mAttributeSection.defaultValue.startsWith("attribute:")) {
				// Attributes that reference another attribute for the default value need to be processed in a second step.
				// This is only supported 1 level deep.
				aDependenciesForDefaults.push({
					source: mAttributeSection.defaultValue.substring(mAttributeSection.defaultValue.indexOf(":") + 1),
					targetPath: sSection,
					targetAttribute: sAttribute,
					targetType: mAttributeSection.type
				});
			} else if (typeof mAttributeSection.defaultValue === "object" && mAttributeSection.defaultValue !== null) {
				oPropertySection[sAttribute] = merge({}, mAttributeSection.defaultValue);
			} else {
				oPropertySection[sAttribute] = mAttributeSection.defaultValue;
			}
		} else {
			oPropertySection[sAttribute] = getTypeDefault(mAttributeSection.type);
		}
	}

	function createPropertyMap(aProperties) {
		return Object.freeze(aProperties.reduce(function(mMap, oProperty) {
			mMap[oProperty.name] = oProperty;
			return mMap;
		}, {}));
	}

	function extractProperties(oProperty, fnFilter) {
		if (oProperty.isComplex()) {
			return oProperty.getReferencedProperties().filter(fnFilter);
		} else if (fnFilter(oProperty)) {
			return [oProperty];
		} else {
			return [];
		}
	}

	function mergeExtensionsIntoProperties(aProperties, mExtensions) {
		var iMatchingExtensions = 0;

		mExtensions = mExtensions || {};

		for (var i = 0; i < aProperties.length; i++) {
			if ("extension" in aProperties[i]) {
				throwInvalidPropertyError("Property contains invalid attribute 'extension'.", aProperties[i]);
			}

			if (aProperties[i].name in mExtensions) {
				aProperties[i].extension = mExtensions[aProperties[i].name];
				iMatchingExtensions++;
			} else {
				aProperties[i].extension = {};
			}
		}

		if (iMatchingExtensions !== Object.keys(mExtensions).length) {
			throw new Error("At least one property extension does not point to an existing property.");
		}
	}

	/**
	 * Constructor for a new helper for the given properties.
	 *
	 * @param {object[]} aProperties
	 *     The properties to process in this helper
	 * @param {object<string, object>} [mExtensions]
	 *     Key-value map, where the key is the name of the property and the value is the extension containing mode-specific information.
	 *     The extension of a property is stored in a reserved <code>extension</code> attribute and its attributes must be specified with
	 *     <code>mExtensionAttributeMetadata</code>.
	 * @param {sap.ui.base.ManagedObject} [oParent]
	 *     A reference to an instance that will act as the parent of this helper
     * @param {string[]} [aAllowedAttributes]
	 *     List of attributes the property infos may contain.
	 *     The following common attributes are always allowed:
	 *     name, label, visible, path, typeConfig, maxConditions, group, groupLabel
	 * @param {object} [mExtensionAttributeMetadata]
	 *     The attribute metadata for the model-specific property extension
	 *
	 * @class
	 * Property helpers give this library a consistent and standardized view on properties and their attributes.
	 * Validates the given properties, sets defaults, and provides utilities to work with these properties.
	 * The utilities can only be used for properties that are known to the helper. Known properties are all those that are passed to the constructor.
	 *
	 * @extends sap.ui.base.Object
	 *
	 * @author SAP SE
	 * @version 1.97.1
	 *
	 * @private
	 * @experimental
	 * @since 1.83
	 * @alias sap.ui.mdc.util.PropertyHelper
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var PropertyHelper = BaseObject.extend("sap.ui.mdc.util.PropertyHelper", {
		constructor: function(aProperties, mExtensions, oParent, aAllowedAttributes, mExtensionAttributeMetadata) {
			BaseObject.call(this);

			if (!Array.isArray(aProperties)) {
				throwInvalidPropertyError("Property infos must be an array.");
			}

			if (mExtensions) {
				if (!mExtensionAttributeMetadata) {
					throw new Error("Property extensions are not supported.");
				} else if (!isPlainObject(mExtensions)) {
					throw new Error("Property extensions must be a plain object.");
				}
			}

			if (oParent && !BaseObject.isA(oParent, "sap.ui.base.ManagedObject")) {
				throw new Error("The type of the parent is invalid.");
			}

			if (this._mExperimentalAdditionalAttributes) {
				Object.keys(mAttributeMetadata).concat("extension").forEach(function(sAttribute) {
					if (sAttribute in this._mExperimentalAdditionalAttributes) {
						throw new Error("The attribute '" + sAttribute + "' is reserved and cannot be overridden by additional attributes.");
					}
				}.bind(this));
			}

			var mPrivate = {};
			var mInstanceAttributeMetadata = aCommonAttributes.concat(aAllowedAttributes || []).reduce(function(mMetadata, sAttribute) {
				if (sAttribute in mAttributeMetadata) {
					mMetadata[sAttribute] = mAttributeMetadata[sAttribute];
				}
				return mMetadata;
			}, Object.assign({}, this._mExperimentalAdditionalAttributes));

			if (mExtensionAttributeMetadata) {
				mPrivate.mAttributeMetadata = Object.assign({
					extension: {
						type: mExtensionAttributeMetadata,
						mandatory: true,
						allowedForComplexProperty: true
					}
				}, mInstanceAttributeMetadata);
				mPrivate.aMandatoryExtensionAttributes = Object.keys(mExtensionAttributeMetadata).filter(function(sAttribute) {
					return mExtensionAttributeMetadata[sAttribute].mandatory;
				});
			} else {
				mPrivate.mAttributeMetadata = mInstanceAttributeMetadata;
				mPrivate.aMandatoryExtensionAttributes = [];
			}

			mPrivate.aMandatoryAttributes = Object.keys(mPrivate.mAttributeMetadata).filter(function(sAttribute) {
				return mPrivate.mAttributeMetadata[sAttribute].mandatory;
			});

			var aClonedProperties = merge([], aProperties);
			var mProperties = createPropertyMap(aClonedProperties);

			if (mExtensionAttributeMetadata) {
				mergeExtensionsIntoProperties(aClonedProperties, merge({}, mExtensions));
			}

			_private.set(this, mPrivate);
			this.validateProperties(aClonedProperties);

			mPrivate.oParent = oParent || null;
			mPrivate.aProperties = aClonedProperties;
			mPrivate.mProperties = mProperties;

			enrichProperties(this, aClonedProperties);
			prepareProperties(this, aClonedProperties);
		}
	});

	/**
	 * Validates an array of properties.
	 *
	 * <b>Note for classes that override this method:</b>
	 * The only method that may be called from here is {@link #validateProperty}. The properties are not yet stored in the helper, and therefore
	 * any method that tries to access them might not work as expected.
	 *
	 * @param {object[]} aProperties The properties to validate
	 * @throws {Error} If the properties are invalid
	 * @protected
	 */
	PropertyHelper.prototype.validateProperties = function(aProperties) {
		var oUniquePropertiesSet = new Set();

		for (var i = 0; i < aProperties.length; i++) {
			this.validateProperty(aProperties[i], aProperties);
			oUniquePropertiesSet.add(aProperties[i].name);
		}

		if (oUniquePropertiesSet.size !== aProperties.length) {
			throwInvalidPropertyError("Properties do not have unique names.");
		}
	};

	/**
	 * Validates a property. The entire array of properties needs to be provided for validation of a complex property.
	 *
	 * <b>Note for classes that override this method:</b>
	 * No other method of the helper may be called from here. The properties are not yet stored in the helper, and therefore
	 * any method that tries to access them might not work as expected.
	 *
	 * @param {object} oProperty The property to validate
	 * @param {object[]} aProperties The entire array properties
	 * @throws {Error} If the property is invalid
	 * @protected
	 */
	PropertyHelper.prototype.validateProperty = function(oProperty, aProperties) {
		if (!isPlainObject(oProperty)) {
			throwInvalidPropertyError("Property info must be a plain object.", oProperty);
		}

		validatePropertyDeep(this, oProperty, aProperties);

		if (PropertyHelper.isPropertyComplex(oProperty)) {
			if (oProperty.propertyInfos.length === 0) {
				throwInvalidPropertyError("Complex property does not reference existing properties.", oProperty);
			}
		}

		_private.get(this).aMandatoryAttributes.forEach(function(sMandatoryAttribute) {
			if (!(sMandatoryAttribute in oProperty)) {
				reportInvalidProperty("Property does not contain mandatory attribute '" + sMandatoryAttribute + "'.", oProperty);
			} else if (oProperty[sMandatoryAttribute] == null) {
				throwInvalidPropertyError("Property does not contain mandatory attribute '" + sMandatoryAttribute + "'.", oProperty);
			}
		});

		_private.get(this).aMandatoryExtensionAttributes.forEach(function(sMandatoryAttribute) {
			if (!(sMandatoryAttribute in oProperty.extension)) {
				reportInvalidProperty("Property does not contain mandatory attribute 'extension." + sMandatoryAttribute + "'.", oProperty);
			} else if (oProperty.extension[sMandatoryAttribute] == null) {
				throwInvalidPropertyError("Property does not contain mandatory attribute 'extension." + sMandatoryAttribute + "'.", oProperty);
			}
		});
	};

	function validatePropertyDeep(oPropertyHelper, oProperty, aProperties, sPath, oPropertySection, mAttributeSection) {
		var bTopLevel = sPath == null;

		if (bTopLevel) {
			mAttributeSection = _private.get(oPropertyHelper).mAttributeMetadata;
			oPropertySection = oProperty;
		}

		for (var sAttribute in oPropertySection) {
			var mAttribute = mAttributeSection[sAttribute];
			var sAttributePath = bTopLevel ? sAttribute : sPath + "." + sAttribute;
			var vValue = oPropertySection[sAttribute];

			if (!mAttribute) {
				reportInvalidProperty("Property contains invalid attribute '" + sAttributePath + "'.", oProperty);
			} else if (PropertyHelper.isPropertyComplex(oProperty) && !mAttribute.allowedForComplexProperty) {
				reportInvalidProperty("Complex property contains invalid attribute '" + sAttributePath + "'.", oProperty);
			} else if (typeof mAttribute.type === "object" && vValue && typeof vValue === "object") {
				validatePropertyDeep(
					oPropertyHelper, oProperty, aProperties, sAttributePath, vValue, mAttribute.type
				);
			} else if (vValue != null && !getAttributeDataType(mAttribute.type).isValid(vValue)) {
				// Optional attributes may have null or undefined as value.
				throwInvalidPropertyError("The value of '" + sAttributePath + "' is invalid.", oProperty);
			} else if (vValue && typeof mAttribute.type === "string" && mAttribute.type.startsWith("PropertyReference")) {
				validatePropertyReferences(
					oPropertyHelper, oProperty, aProperties, sAttributePath, vValue, mAttribute
				);
			}
		}
	}

	function validatePropertyReferences(oPropertyHelper, oProperty, aProperties, sPath, oPropertySection, mAttributeSection) {
		var aPropertyNames = mAttributeSection.type.endsWith("[]") ? oPropertySection : [oPropertySection];
		var oUniquePropertiesSet = new Set(aPropertyNames);

		if (aPropertyNames.indexOf(oProperty.name) > -1) {
			throwInvalidPropertyError("Property references itself in the '" + sPath + "' attribute", oProperty);
		}

		if (oUniquePropertiesSet.size !== aPropertyNames.length) {
			throwInvalidPropertyError("Property contains duplicate names in the '" + sPath + "' attribute.", oProperty);
		}

		for (var i = 0; i < aProperties.length; i++) {
			if (oUniquePropertiesSet.has(aProperties[i].name)) {
				if (PropertyHelper.isPropertyComplex(aProperties[i])) {
					throwInvalidPropertyError("Property references complex properties in the '" + sPath + "' attribute.", oProperty);
				}
				oUniquePropertiesSet.delete(aProperties[i].name);
			}
		}

		if (oUniquePropertiesSet.size > 0) {
			throwInvalidPropertyError("Property references non-existing properties in the '" + sPath + "' attribute.", oProperty);
		}
	}

	/**
	 * Applies defaults and resolves property references.
	 *
	 * @param {object} oProperty The property to prepare
	 * @protected
	 */
	PropertyHelper.prototype.prepareProperty = function(oProperty) {
		var mProperties = this.getPropertyMap();
		var aDependenciesForDefaults = preparePropertyDeep(this, oProperty, mProperties);

		aDependenciesForDefaults.forEach(function(mDependency) {
			var oPropertySection = deepFind(oProperty, mDependency.targetPath);

			if (oPropertySection) {
				var vValue = deepFind(oProperty, mDependency.source);

				if (vValue == null) {
					vValue = getTypeDefault(mDependency.targetType);
				}

				oPropertySection[mDependency.targetAttribute] = vValue;

				if (typeof mDependency.targetType === "string" && mDependency.targetType.startsWith("PropertyReference")) {
					preparePropertyReferences(oPropertySection, mDependency.targetAttribute, mProperties);
				}
			}
		});
	};

	/**
	 * If available, it gets the instance that acts as the parent of this helper. This may not reflect the UI5 object relationship tree.
	 *
	 * @returns {sap.ui.base.ManagedObject|null} The parent if one was passed to the constructor, <code>null</code> otherwise.
	 * @public
	 */
	PropertyHelper.prototype.getParent = function() {
		var oPrivate = _private.get(this);
		return oPrivate ? oPrivate.oParent : null;
	};

	/**
	 * Gets all properties known to this helper.
	 *
	 * @returns {object[]} All properties
	 * @public
	 */
	PropertyHelper.prototype.getProperties = function() {
		var oPrivate = _private.get(this);
		return oPrivate ? oPrivate.aProperties : [];
	};

	/**
	 * Gets the properties as a key-value map, where the key is the <code>name</code> attribute of a property.
	 *
	 * @returns {object} A map of all properties
	 * @public
	 */
	PropertyHelper.prototype.getPropertyMap = function() {
		var oPrivate = _private.get(this);
		return oPrivate ? oPrivate.mProperties : {};
	};

	/**
	 * Gets a property by its name.
	 *
	 * @param {string} sName Name of a property
	 * @returns {object|null} The property, or <code>null</code> if it is unknown
	 * @public
	 */
	PropertyHelper.prototype.getProperty = function(sName) {
		return this.getPropertyMap()[sName] || null;
	};

	/**
	 * Checks whether the property helper knows a property.
	 *
	 * @param {string} sName Name of a property
	 * @returns {boolean} Whether the property is known
	 * @public
	 */
	PropertyHelper.prototype.hasProperty = function(sName) {
		return sName in this.getPropertyMap();
	};

	/**
	 * Checks whether a property is a complex property. Works with any property info, even if unknown to the property helper.
	 *
	 * @param {object} oProperty A property info object
	 * @returns {boolean} Whether the property is complex
	 * @protected
	 * @static
	 */
	PropertyHelper.isPropertyComplex = function(oProperty) {
		return oProperty != null && typeof oProperty === "object" ? "propertyInfos" in oProperty : false;
	};

	/**
	 * Gets all sortable properties.
	 *
	 * @returns {object[]} All sortable properties
	 * @public
	 */
	PropertyHelper.prototype.getSortableProperties = function() {
		return this.getProperties().filter(function(oProperty) {
			return oProperty.sortable;
		});
	};

	/**
	 * Gets all filterable properties.
	 *
	 * @returns {object[]} All filterable properties
	 * @public
	 */
	PropertyHelper.prototype.getFilterableProperties = function() {
		return this.getProperties().filter(function(oProperty) {
			return oProperty.filterable;
		});
	};

	/**
	 * Gets all groupable properties.
	 *
	 * @returns {object[]} All groupable properties
	 * @public
	 */
	PropertyHelper.prototype.getGroupableProperties = function() {
		return this.getProperties().filter(function(oProperty) {
			return oProperty.groupable;
		});
	};

	/**
	 * Gets all key properties.
	 *
	 * @returns {object[]} All key properties
	 * @public
	 */
	PropertyHelper.prototype.getKeyProperties = function() {
		return this.getProperties().filter(function(oProperty) {
			return oProperty.key;
		});
	};

	/**
	 * Gets all visible properties.
	 *
	 * @returns {object[]} All visible properties
	 * @public
	 */
	PropertyHelper.prototype.getVisibleProperties = function() {
		return this.getProperties().filter(function(oProperty) {
			return oProperty.visible;
		});
	};

	/**
	 * @override
	 * @inheritDoc
	 */
	PropertyHelper.prototype.destroy = function() {
		BaseObject.prototype.destroy.apply(this, arguments);
		_private.delete(this);
	};

	return PropertyHelper;
});