// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/Message","sap/ushell/resources"],function(M,r){"use strict";return{getLocalizedText:g,showLocalizedError:a,showLocalizedErrorHelper:b,showLocalizedMessage:s};function g(m,p){return r.i18n.getText(m,p);}function s(m,p,t){if(sap.ushell.Container){sap.ushell.Container.getServiceAsync("Message").then(function(o){o.show(t||M.Type.INFO,g(m,p),p);});}}function a(m,p){s(m,p,M.Type.ERROR);}function b(m,p){return function(){a(m,p);};}});