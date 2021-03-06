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
    'app',
    'views/View',
    'views/List',
    'views/dashboardswitcher/Tile',

    // Libraries.
    'jquery',
    'lodash',
    'handlebars',
    'jqueryui/jquery-ui.custom'
],

function(app, View, List, Tile, $, _, Handlebars) {

    return List.extend({
        
        listItemView: Tile,

        className: 'tilesview',

        tabIndex: '-1',

        events: {
            'click .dashboard-view': 'onDashboardClick',
            'mouseenter .dashboard-view': 'showActions',
            'mouseleave .dashboard-view': 'hideActions'
        },

        initialize: function() {
            this.constructor.__super__.initialize.call(this);
        },

        onDashboardClick: function (evt) {
            var currentTarget = $(evt.currentTarget),
                model = this.collection.get(currentTarget.data('id'));

            this.trigger('itemselected', model);
        },

        toggleManage: function () {
            this._managing = !this._managing;
        },

        showActions: function (evt) {
            if( !this._managing ) {
                return;
            }

            $('.btn-group', evt.currentTarget).show();
        },

        hideActions: function (evt) {
            if( !this._managing ) {
                return;
            }

            $('.btn-group', evt.currentTarget).hide();
        }
    });

});
