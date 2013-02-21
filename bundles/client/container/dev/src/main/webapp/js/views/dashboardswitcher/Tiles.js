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
    'events/EventBus',
    // Libraries.
    'jquery',
    'lodash',
    'handlebars',
    'jqueryui/jquery-ui.custom'
],

function(app, View, List, Tile, EventBus, $, _, Handlebars) {

    return List.extend({
        
        listItemView: Tile,

        className: 'tilesview',

        tabIndex: '-1',

        events: {
            'click > .dashboard': 'onDashboardClick',
            'click > .stack': 'onStackClick',
            'click .share': 'onShare',
            'click .refresh': 'onRefresh',
            'click .edit': 'onEdit',
            'click .remove': 'onDelete',
            'mouseenter > .stack': 'showActions',
            'mouseleave > .stack': 'hideActions',
            'mouseenter > .dashboard': 'showActions',
            'mouseleave > .dashboard': 'hideActions'
        },

        initialize: function() {
            this.constructor.__super__.initialize.call(this);
        },

        onRefresh: function (evt) {
            var currentTarget = $(evt.currentTarget),
                model = this.collection.get(currentTarget.data('id'));
            
            evt.stopPropagation();
            
            if (model.get('isStack')) {
                this.trigger('stackrestore', model);
            }
            else {
                this.trigger('dashboardrestore', model);
            }
        },
        
        onShare: function (evt) {
            var currentTarget = $(evt.currentTarget),
                model = this.collection.get(currentTarget.data('id'));
            
            evt.stopPropagation(); 
            this.trigger('dashboardshare', model);
        },
        
        onEdit: function (evt) {
            var currentTarget = $(evt.currentTarget),
                model = this.collection.get(currentTarget.data('id'));
        
            evt.stopPropagation();
            this.trigger('dashboardedit', model);
        },
        
        onDelete: function (evt) {
            var currentTarget = $(evt.currentTarget),
                model = this.collection.get(currentTarget.data('id'));
        
            evt.stopPropagation(); 
            
            if (model.get('isStack')) {
                this.trigger('stackdelete', model);
            }
            else {
                this.trigger('dashboarddelete', model);
            }
        },
        
        onDashboardClick: function (evt) {
            var currentTarget = $(evt.currentTarget),
                model = this.collection.get(currentTarget.data('id'));
            if (!this.isManaging()) {
                this.trigger('itemselected', model);
            }
        },
        
        onStackClick: function (evt) {
            var currentTarget = $(evt.currentTarget),
                model = this.collection.get(currentTarget.data('id'));

            this.trigger('itemselected', model);
        },

        toggleManage: function () {
            this._managing = !this._managing;
            if (this._managing) {
                $('.stack').tooltip('disable');
                $('.dashboard').tooltip('disable');
            }
            else {
                $('.stack').tooltip('enable');
                $('.dashboard').tooltip('enable');
            }
                
        },

        isManaging: function () {
            return this._managing;
        },
        
        showActions: function (evt) {
            if( !this._managing ) {
                return;
            }

            $('.dashboard-actions', evt.currentTarget).show();
            $('.stack-actions', evt.currentTarget).show();
        },

        hideActions: function (evt) {
            if( !this._managing ) {
                return;
            }

            $('.dashboard-actions', evt.currentTarget).hide();
            $('.stack-actions', evt.currentTarget).hide();
        }
    });

});
