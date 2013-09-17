// Requirejs configuration settings
require.config({
    paths: {
        templates: '../templates',
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        text: '../bower_components/requirejs-text/text',
        snapjs: '../bower_components/snapjs/snap',
        underscore: '../bower_components/underscore/underscore',
        handlebars: '../bower_components/handlebars/handlebars',
        hbs: '../bower_components/require-handlebars-plugin/hbs',
        i18nprecompile: '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        json2: '../bower_components/require-handlebars-plugin/hbs/json2',
        leaflet: '../bower_components/leaflet/dist/leaflet',
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        snapjs: {
            exports: 'Snap'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    },
    hbs: {
        disableI18n: true,
        templateExtension: 'html'
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
