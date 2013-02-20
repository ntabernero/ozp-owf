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
    'collections/Collection',
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

function(app, DashboardInstanceModel, StackModel, Collection, View, Modal, Tiles, EventBus, $, _, Handlebars, Backbone) {
    'use strict';
    
    var SwitcherModel = Backbone.Model.extend({
        defaults: {
            "id": null,
            "switcherItem": null,
            "isStack": false,
            "children": null
        }
    });
    
    var tpl = 
        '<div class="pull-right container-fluid">' +
            '<div class="btn-group span6">' +
                '<button class="btn manage-btn span1 offset4"><i class="icon-cogs"></i>  Manage</button>' +
                '<button class="btn create-btn span1"><i class="icon-plus"></i>  Create</button>' +
            '</div>' +
        '</div>';
    
    return Modal.extend({

        id: 'dashboard-switcher',

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
        
        events:  {
            'click .manage-btn': 'toggleManage',
            'click .create-btn': 'create'
        },

        initialize: function () {
            var me = this,
            dashboard, stack, switcherModel;
        
            // Create a composite collection of stacks and dashboards.
            this.stackOrDashboards = new Collection();
            
            for (var i = 0, len = this.options.dashboardInstancesCollection.length; i < len; i ++) {
                // Get the dashboard.
                dashboard = this.options.dashboardInstancesCollection.at(i);
                me.addSwitcherItemForDashboard(dashboard);
            }
            
            me.tiles = new Tiles({
                //collection: this.options.dashboardInstancesCollection
                collection: this.stackOrDashboards
            });
            me.tiles.on('itemselected', _.bind(this.onItemSelect, this));
            
            // Listen to the main instances collection for adds & deletes.
            _.bindAll(me, "render");
            me.options.dashboardInstancesCollection.bind('add', me.addSwitcherItemForDashboard, me);
            me.options.dashboardInstancesCollection.bind('remove', me.removeSwitcherItemForDashboard, me);
            
        },
        
        /**
         * Accepts a DashboardModel and attempts to add it to the Tiles.  If it belongs to a stack, it will attempt to
         * put the dashboard in a stack switcher model.
         */
        addSwitcherItemForDashboard: function(dashboard) {
            var me = this,
                stack = dashboard.get('stack'),
                switcherModel;
            
            // Check if the dashboard belongs in a stack.
            if (stack) {            
                
                // If we had the stack already
                if (me.stackOrDashboards.get(stack.id)) {
                    me.stackOrDashboards.get(stack.id).get('children').add(new SwitcherModel({
                        switcherItem: dashboard.clone(),
                        isStack: false
                    }));
                }
                // if have not encountered that stack already...
                else {
                    // Create a switcher model for the new stack.
                    switcherModel = new SwitcherModel({
                        id: stack.id,
                        switcherItem: new StackModel(stack),
                        isStack: true,
                        children: new Collection()
                    });
                    
                    // Add the dashboard to the switcher model for the stack.
                    switcherModel.get('children').add(new SwitcherModel({
                        id: dashboard.get('id'),
                        switcherItem: dashboard.clone(),
                        isStack: false
                    }));
                
                    // Add the stack to the switcher collection
                    //stacks[stack.id] = stack;
                    me.stackOrDashboards.add(switcherModel);
                }
                
            }
            else {
                // Otherwise, add the dashboard
                switcherModel = new SwitcherModel({
                    id: dashboard.get('id'),
                    switcherItem: dashboard.clone(),
                    isStack: false
                });
                me.stackOrDashboards.add(switcherModel);
            }
        },
        
        removeSwitcherItemForDashboard: function() {
            // TODO
        },
        
        render: function  () {
            this.constructor.__super__.render.call(this);
            this.$el.append( this.tiles.render().$el )
                    .append( this.template );
            return this;
        },
        
        onItemSelect: function (model) {
            var me = this,
                stackEl;
            
            if (model) {
                // Handle any stack clicks.
                if (model.get('isStack')) {
                    stackEl = me.$('div[data-stack-id=' + model.id + ']')
                    // If this stack is not the last opened it, create its listing.
                    if (me.openStack && (me.openStack.get('id') !== model.get('id'))) {
                        // Close the last stack and open this one.
                        if (me.stackTiles) {
                            me.stackTiles.remove();
                        }
                        me.stackTiles = new Tiles({
                            collection: model.get('children')
                        })
                        me.stackTiles.on('itemselected', _.bind(this.onItemSelect, this));
                        me.openStack = model;
                        stackEl.after( this.stackTiles.render().$el );
                    }
                    // If it was already open, close the existing stack.
                    else if (me.openStack) {
                        me.stackTiles.remove();
                        me.openStack = null;
                    }
                    // Otherwise, just open the stack.
                    else {
                        me.stackTiles = new Tiles({
                            collection: model.get('children')
                        })
                        me.stackTiles.on('itemselected', _.bind(this.onItemSelect, this));
                        me.openStack = model;
                        stackEl.after( this.stackTiles.render().$el );
                    }
                }
                // Otherwise, just trigger any dashboards.
                else {
                    me.hide().then(function () {
                        EventBus.trigger('dashboard:switch', model);
                    });
                }
            }
            
            
//            if (model.get('isStack')) {
//                // Close any other stack tilesets
//                if (this.stackTiles) {
//                    this.stackTiles.remove();
//                }
//                
//                console.log('clicked a stack');
//                // Create a tileset for this stack.
//                this.stackTiles = new Tiles({
//                    collection: model.get('children')
//                });
//                
//                // Append after the stack's view.
//                stackEl.after( this.stackTiles.render().$el );
//            }
//            else {
//                this.hide().then(function () {
//                    EventBus.trigger('dashboard:switch', model);
//                });
//            }
        },
        
        toggleManage: function (evt) {
            $(evt.currentTarget).toggleClass('active');
            this.tiles.toggleManage();
        },

        create: function () {
            this.hide().then(function () {
                EventBus.trigger('dashboard:create');
            });
        }
        

    });

});
