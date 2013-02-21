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
    'models/DashboardInstanceModel',
    'models/StackModel',
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

function(app, DashboardInstanceModel, StackModel, View, Modal, Tiles, EventBus, $, _, Handlebars) {
    'use strict';
    
    var tpl = 
        '<div class="pull-right">' +
            '<div class="btn-group">' +
                '<button class="btn manage-btn"><i class="icon-cogs"></i>  Manage</button>' +
                '<button class="btn create-btn"><i class="icon-plus"></i>  Create</button>' +
            '</div>' +
        '</div>';
    
    return Modal.extend({

        id: 'dashboard-switcher-vision',

        className: 'modal hide fade no-border-radius',

        template:   Handlebars.compile(tpl),
        
        dashboardContainer: null,

        //dashboard unit sizes
        dashboardItemHeight: 0,
        dashboardItemWidth: 0,

        //size of switcher in dashboard units
        minDashboardsWidth: 3,
        maxDashboardsWidth: 5,
        maxDashboardsHeight: 3,

        selectedItemCls : 'dashboard-selected',

        _deletedStackOrDashboards: null,
        
        _previouslyFocusedStackOrDashboard : null,
        
//        DROP_LEFT_CLS: 'x-view-drop-indicator-left',
//        DROP_RIGHT_CLS: 'x-view-drop-indicator-right',
        
        
        events:  {
            'click .manage-btn': 'toggleManage',
            'click .create-btn': 'create'
        },

        initialize: function () {
            var me = this,
            stackOrDashboards = [],
            stacks = {}, dashboards = {},
            dashboard, stack, model;

            for(var i = 0, len = this.options.dashboardInstancesCollection.length; i < len; i++) {
    
                model = this.options.dashboardInstancesCollection.at(i);
    
                dashboard = model.clone();
                dashboard.set('model', model);
                dashboards[ dashboard.get('id') ] = dashboard;
    
                stack = dashboard.get('stack');
                console.log(i, ' => Dashboard name: ', dashboard.get('name'), 'Stack: ', stack ? stack.name : 'none', ' Default: ', dashboard.get('isDefault'));
                if( stack ) {
                    if( stacks[ stack.id ] ) {
                        stacks[ stack.id ].dashboards.push( dashboard );
                    }
                    else {
                        stack = new StackModel(stack);
                        stack.set('isStack', true);
                        stack.set('dashboards', [ dashboard ]);
    
                        stacks[ stack.id ] = stack;
                        stackOrDashboards.push( stack );
                    }
                }
                else {
                    stackOrDashboards.push( dashboard );
                }
    
            }
        
            this.Tiles = new Tiles({
                collection: this.options.dashboardInstancesCollection
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
