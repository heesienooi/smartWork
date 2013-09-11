// Requirejs configuration settings
require.config({
    paths: {
        jquery: "../bower_components/jquery/jquery",
        backbone: "../bower_components/backbone/backbone",
        text: "../bower_components/requirejs-text/text",
        snapjs: "../bower_components/snapjs/snap",
        underscore: "../bower_components/underscore/underscore",
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: [
                "underscore",
                "jquery"
            ],
            exports: "Backbone"
        }
    }
});

require([
    'backbone',
    'AppRouter'
], function (Backbone, AppRouter) {
    'use strict';

    // Initialize AppRouter and start Backbone.history
    new AppRouter();
    Backbone.history.start();
});
