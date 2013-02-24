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

        id: 'designer',
        className: 'working-area',

        viewOptions: function () {
            var layoutConfig = this.model.get('layoutConfig');

            if(!layoutConfig) {
                layoutConfig = {
                    vtype: 'designerpane',
                    paneType: 'tabbed',
                    htmlText: '100%'
                };
                this.model.set('layoutConfig', layoutConfig);
            }
            return layoutConfig;
        },

        views: function() {
            return this.viewOptions();
        },

        initialize: function () {
            this.layoutConfig = this.viewOptions();

            this.$el.data( 'layoutConfig', this.layoutConfig );
            View.prototype.initialize.apply( this, arguments );
        },

        getLayoutConfig: function () {
            return this.layoutConfig;
        },

        reset: function () {
            var pane = this.views[0];
            var box = pane && pane.views[0];

            // remove sub view if found
            if( box ) {
                pane.removeView(box);
                delete this.layoutConfig.box;
            }
            // fall back to DOM retrieval
            else {
                pane = this.$el.find('.pane').data('view');
                box = pane && pane.$el.find('.box').data('view');
                box.remove();
            }
        }
    });

});
