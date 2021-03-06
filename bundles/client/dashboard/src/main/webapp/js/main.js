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
        modernizr: '../libs/js/modernizr',
        'jquery-splitter': '../libs/js/jquery-splitter',
        'bootstrap-editable': '../libs/js/bootstrap-editable'

    },

    shim: {
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
        'backbone.declarative.views': {
            deps: ['lodash', 'backbone'],
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
        'bootstrap/bootstrap-tooltip': {
            deps: ['jquery', 'bootstrap/bootstrap-transition'],
            exports: '$'
        },
        'bootstrap/bootstrap-popover': {
            deps: ['jquery', 'bootstrap/bootstrap-transition', 'bootstrap/bootstrap-tooltip'],
            exports: '$'
        },
        'bootstrap-editable': {
            deps: ['jquery', 'bootstrap/bootstrap-transition', 'bootstrap/bootstrap-tooltip', 'bootstrap/bootstrap-popover'],
            exports: '$'
        },
        'jqueryui/jquery-ui.custom': {
            deps: ['jquery'],
            exports: '$'
        },
        'jquery-splitter': {
            deps: ['jquery'],
            exports: '$'
        }
    }

});

// Initialize the application with the main application file.  A define call needs to be here because enforceDefine is
// true
define([
    'app'
], function(app) {

});
