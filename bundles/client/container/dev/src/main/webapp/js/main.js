/*
 * Copyright 2013 Next Century Corporation 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global require*/
// require.js configuration for application.
require.config({

    //need this to be true to handle errors in IE
    enforceDefine: true,

    paths: {
        bootstrap: '../libs/js/bootstrap',
        jqueryui: '../libs/development-bundle/ui',
        // alias versioned dependencies to simplify updating as new versions are released
        jquery: '../libs/js/jquery',
        lodash: '../libs/js/lodash',
        backbone: '../libs/js/backbone',
        'backbone.declarative.views': '../libs/js/backbone.declarative.views',
        handlebars: '../libs/js/handlebars',
        modernizr: '../libs/js/modernizr'
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
        },
        'backbone.declarative.views': {
            deps: ['lodash', 'backbone'],
            exports: 'Backbone'
        }
    }

});

// Initialize the application with the main application file.  A define call needs to be here because enforceDefine is
// true
define([
    'app'
], function(app) {

});