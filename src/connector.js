(function () {

    "use strict";

    var fluid = require("infusion"),
        gpii = fluid.registerNamespace("gpii");

    fluid.require("../../../../../shared/utils.js");

    fluid.defaults("gpii.connector", {
        gradeNames: ["autoInit", "fluid.littleComponent"],
        mergePolicy: {
            server: "nomerge"
        },
        from: "",
        to: "",
        type: "all",
        preInitFunction: "gpii.connector.preInit",
        finalInitFunction: "gpii.connector.finalInit"
    });

    gpii.connector.finalInit = function (that) {
        that.server[that.options.type](that.options.from, function (req, res) {
            var vars = {};
            fluid.each(that.options.termMap, function (term, key) {
                vars[key] = req.params[key];
            });
            res.redirect(fluid.stringTemplate(that.options.to, vars));
        });
    };

    gpii.connector.preInit = function (that) {
        that.options.termMap = gpii.pathToTermMap(that.options.from);
        that.server = that.options.server;
    };

    fluid.demands("gpii.connector", "gpii.flowManager", {
        options: {
            server: "{gpii.flowManager}.server"
        }
    });    

})();