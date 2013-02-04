/*global require*/
// require.js configuration for application.
require.config({

    // Initialize the application with the main application file.
    deps: ['app'],

    paths: {
        bootstrap: '../libs/js/bootstrap',
        jqueryui: '../development-bundle/ui',
        // alias versioned dependencies to simplify updating as new versions are released
        jquery: '../libs/js/jquery',
        lodash: '../libs/js/lodash',
        backbone: '../libs/js/backbone',
        handlebars: '../libs/js/handlebars'
        // modernizr: 'modernizr',
        // // match handlebars requirejs plugin to avoid having to edit the contents of handlebars plugin when updating it to a new version
        // hbs: 'js/handlebars/handlebars-plugin-0.2.1',
        // json2: 'js/json2',
        // 'handlebars-i18nprecompile': 'js/handlebars/handlebars-i18nprecompile'
    },

    shim: {
        // Backbone library depends on lodash and jQuery.
        jquery: {
            exports: '$'
        },
        lodash: {
            exports: '_'
        },
        backbone: {
            deps: ['lodash', 'jquery'],
            exports: 'Backbone'
        },

        handlebars: {
            exports: 'Handlebars'
        },

        'bootstrap/bootstrap-transition': {
            deps: ['jquery'],
            exports: '$'
        },
        'bootstrap/bootstrap-modal': {
            deps: ['jquery', 'bootstrap/bootstrap-transition'],
            exports: '$'
        },
        'jqueryui/jquery-ui.custom': {
            deps: ['jquery'],
            exports: '$'
        }
    }

});