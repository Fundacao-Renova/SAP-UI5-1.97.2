// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/base/util/isPlainObject"],function(L,i){"use strict";return function r(u){if(!u||!u.ui5||!u.ui5.libs){return[];}if(!i(u.ui5.libs)){L.error("Invalid ushell configuration: /ui5/libs must be an object");return[];}return Object.keys(u.ui5.libs).filter(function(k){return this[k];},u.ui5.libs);};});
