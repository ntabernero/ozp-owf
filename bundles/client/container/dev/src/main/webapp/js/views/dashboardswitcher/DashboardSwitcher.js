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
    'views/Modal',
    'views/dashboardswitcher/Tiles',
    'events/EventBus',
    // Libraries.
    'jquery',
    'lodash',
    'handlebars',
    'backbone',
    'jqueryui/jquery-ui.custom',
    'bootstrap/bootstrap-modal'
],

function(app, View, Modal, Tiles, EventBus, $, _, Handlebars) {
    'use strict';
    
    var tpl = 
        '<div class="pull-right">' +
            '<div class="btn-group">' +
                '<button class="btn manage-btn"><i class="icon-cogs"></i>  Manage</button>' +
                '<button class="btn create-btn"><i class="icon-plus"></i>  Create</button>' +
            '</div>' +
        '</div>';
    
    return Modal.extend({

        id: 'dashboard-switcher',

        className: 'modal hide fade no-border-radius',

        template:   Handlebars.compile(tpl),

        events:  {
            'click .manage-btn': 'toggleManage',
            'click .create-btn': 'create'
        },

        initialize: function () {
            this.Tiles = new Tiles({
                collection: this.options.personalDashboardsCollection
            });
            this.Tiles.on('itemselected', _.bind(this.onDashboardSelect, this));
        },
        
        render: function  () {
            this.constructor.__super__.render.call(this);
            this.$el.append( this.Tiles.render().$el )
                    .append( this.template );
            return this;
        },

        onDashboardSelect: function (model) {
            this.hide().then(function () {
                EventBus.trigger('dashboard:switch', model);
            });
        },
        
        toggleManage: function (evt) {
            $(evt.currentTarget).toggleClass('active');
            this.Tiles.toggleManage();
        },

        create: function () {
            this.hide().then(function () {
                EventBus.trigger('dashboard:create');
            });
        }

    });

});
