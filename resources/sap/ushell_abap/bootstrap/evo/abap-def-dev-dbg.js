// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define([
    "./abap.configure.ushell",
    "./abap.ui5.boot.handler",
    "./abap.load.launchpad",
    "./boottask",
    "sap/ushell/bootstrap/common/common.boot.path",
    "sap/ushell/bootstrap/common/common.configure.ui5",
    "sap/ushell/bootstrap/common/common.configure.ui5.extractLibs",
    "sap/ushell/bootstrap/common/common.debug.mode",
    "sap/ushell/bootstrap/common/common.load.bootstrapExtension",
    "sap/ushell_abap/pbServices/ui2/Chip"
], function (
    fnConfigureUshell,
    oUi5BootHandler,
    fnLoadLaunchpad,
    oBoottask,
    sBootPath,
    fnConfigureUi5,
    fnExtractUi5LibsFromUshellConfig,
    bDebugSources,
    fnLoadBootstrapExtension
) {
    "use strict";

    var oUShellConfig,
        oBootScript = document.getElementById("sap-ui-bootstrap"),
        sBootstrapMode = oBootScript.getAttribute("data-ushell-xx-bootstrapmode") || "full",
        bPreloadMode = (sBootstrapMode === "preload"),
        oUi5BootPromise = oUi5BootHandler.createUi5BootPromise();

    window["sap-ui-debug"] = bDebugSources; //use in LaunchPageAdapter
    oUShellConfig = fnConfigureUshell();
    fnConfigureUi5({
        ushellConfig: oUShellConfig,
        libs: fnExtractUi5LibsFromUshellConfig(oUShellConfig),
        theme: "sap_belize",
        bootTask: oUi5BootHandler.resolveBootPromise,
        onInitCallback: fnLoadLaunchpad
    });

    if (bPreloadMode) {
        window["sap-ushell-bootstrap-resume"] = function () {
            oUShellConfig = fnConfigureUshell(); //need to call one more time in order to merge config from metatag into sap-ushell-config
            fnLoadBootstrapExtension(oUShellConfig);
            oBoottask.start(oUi5BootPromise);
        };
    } else {
        fnLoadBootstrapExtension(oUShellConfig);
        oBoottask.start(oUi5BootPromise);
    }

});
