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

define([
    'views/View',
    'views/box/Box',
    'jquery',
    'lodash'
], function (View, Box, $, _) {

    'use strict';

    return View.extend({
        vtype: 'workingArea',
        
        className: 'working-area',

        views: function() {
            return this.layoutConfig;
        },

        initialize: function () {
            this.layoutConfig = _.cloneDeep( this.model.get('layoutConfig') );
            View.prototype.initialize.apply( this, arguments );
        },

        getLayoutConfig: function () {
            return this.layoutConfig;
        },

        reset: function () {
            var pane = this.views[0];
            pane.reset( this.model.getPaneWidgetsFromLayoutConfig() );
        }
    });

});
