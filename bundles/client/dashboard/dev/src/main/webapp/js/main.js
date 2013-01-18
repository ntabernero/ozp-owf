// require.js configuration for application.
require.config({

    // Initialize the application with the main application file.
    deps: ['app'],

    // paths: {
    //     // alias versioned dependencies to simplify updating as new versions are released
    //     jquery: 'jquery',
    //     lodash: 'lodash',
    //     backbone: 'backbone',
    //     modernizr: 'modernizr',
    //     Handlebars: 'handlebars',
    //     // match handlebars requirejs plugin to avoid having to edit the contents of handlebars plugin when updating it to a new version
    //     hbs: 'js/handlebars/handlebars-plugin-0.2.1',
    //     json2: 'js/json2',
    //     'handlebars-i18nprecompile': 'js/handlebars/handlebars-i18nprecompile'
    // },

    shim: {
        // Backbone library depends on lodash and jQuery.
        backbone: {
            deps: ['lodash', 'jquery'],
            exports: 'Backbone'
        },

        handlebars: {
            exports: 'Handlebars'
        }
    }

});