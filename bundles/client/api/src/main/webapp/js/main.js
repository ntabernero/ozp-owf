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

    // Initialize the application with the main application file.
    deps: ['app'],

    paths: {
        bootstrap: '../libs/js/bootstrap',
        jqueryui: '../development-bundle/ui',
        jquery: '../libs/js/jquery',
        lodash: '../libs/js/lodash',
        backbone: '../libs/js/backbone',
        'backbone.declarative.views': '../libs/js/backbone.declarative.views',
        handlebars: '../libs/js/handlebars',
        'gadgets': '../libs/js/shindig'
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
        },
        'gadgets/json': {
            exports: 'gadgets'
        },
        'gadgets/util': {
            exports: 'gadgets'
        },
        'gadgets/rpc': {
            deps: ['gadgets/json', 'gadgets/util'],
            exports: 'gadgets'
        },
        'gadgets/pubsub': {
            deps: ['gadgets/rpc'],
            exports: 'gadgets'
        },
        'gadgets/pubsub_router': {
            deps: ['gadgets/rpc'],
            exports: 'gadgets'
        }
    }

});
