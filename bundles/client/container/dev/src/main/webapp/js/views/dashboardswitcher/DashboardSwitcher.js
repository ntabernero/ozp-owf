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
        '<div class="pull-right">' +
            '<div class="btn-group ">' +
                '<button class="btn manage-btn"><i class="icon-cogs"></i>  Manage</button>' +
                '<button class="btn create-btn"><i class="icon-plus"></i>  Create</button>' +
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
                collection: this.stackOrDashboards
            });
            me.tiles.on('itemselected', _.bind(this.onItemSelect, this));
            me.tiles.on('stackrestore', _.bind(this.onStackRestore, this));
            me.tiles.on('dashboardrestore', _.bind(this.onDashboardRestore, this));
            me.tiles.on('stackdelete', _.bind(this.onStackDelete, this));
            me.tiles.on('dashboarddelete', _.bind(this.onDashboardDelete, this));
            me.tiles.on('dashboardedit', _.bind(this.onDashboardEdit, this));
            me.tiles.on('dashboardshare', _.bind(this.onDashboardShare, this));
            
            // Listen to the main instances collection for adds & deletes.
            //_.bindAll(me, "render");
            me.options.dashboardInstancesCollection.bind('add', me.addSwitcherItemForDashboard, me);
            me.options.dashboardInstancesCollection.bind('remove', me.removeSwitcherItemForDashboard, me);
            me.options.dashboardInstancesCollection.bind('change', me.changeSwitcherItemForDashboard, me);
            me.options.dashboardInstancesCollection.bind('destroy', me.removeSwitcherItemForDashboard, me);
            
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
                        switcherItem:dashboard,
//                        switcherItem: dashboard.clone(),
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
        
        removeSwitcherItemForDashboard: function(dashboard) {
            var me = this,
                stack = dashboard.get('stack'),
                stackSwitcherItem,
                switcherModel;
            
            // Check if the dashboard belongs in a stack.
            if (stack) {            
                stackSwitcherItem = me.stackOrDashboards.get(stack.id);
                // If we had the stack already
                if (stackSwitcherItem) {
                    // Remove the dashboard from this stack.
                    stackSwitcherItem.get('children').remove(stackSwitcherItem.get('children').get(dashboard.get('id')));
                }                
            }
            else {
                // Remove the dashboard.
                me.stackOrDashboards.remove(me.stackOrDashboards.get(dashboard.get('id')));
            }
        },
        
        changeSwitcherItemForDashboard: function(dashboard) {
            var me = this,
                stack = dashboard.get('stack'),
                stackSwitcherItem,
                switcherModel;
            
            // Check if the dashboard belongs in a stack.
            if (stack) {            
                stackSwitcherItem = me.stackOrDashboards.get(stack.id);
                // If we had the stack already
                if (stackSwitcherItem) {
                    // Remove the dashboard from this stack.
                    stackSwitcherItem.get('children').get(dashboard.get('id')).set('switcherItem', dashboard);
                }                
            }
            else {
                // Remove the dashboard.
                me.stackOrDashboards.get(dashboard.get('id')).set('switcherItem', dashboard);
            }
        },
        
        render: function  () {
            this.constructor.__super__.render.call(this);
            
            this.$body.html(this.tiles.render().$el);
            this.$el.append(this.template);
            return this;
        },
        
        onItemSelect: function (model) {
            var me = this;
            
            if (model) {
                // Handle any stack clicks.
                if (model.get('isStack')) {
                    
                    // If this stack is not the last opened it, create its listing.
                    if (me.openStack && (me.openStack.get('id') !== model.get('id'))) {
                        // Close the last stack and open this one.
                        if (me.stackTiles) {
                            me.stackTiles.remove();
                        }
                        this.openSubTiles(model);
                    }
                    // If it was already open, close the existing stack.
                    else if (me.openStack) {
                        me.stackTiles.remove();
                        me.openStack = null;
                    }
                    // Otherwise, just open the stack.
                    else {
                        this.openSubTiles(model);
                    }
                }
                // Otherwise, just trigger any dashboards.
                else {
                    me.hide().then(function () {
                        EventBus.trigger('dashboard:switch', model);
                    });
                }
            }
            
        },
        
        onStackRestore: function (model) {
            // TODO            
            console.log('restoring stack ' + model.get('id'));
        },
        
        onDashboardRestore: function (model) {
            // TODO
            console.log('restoring dashboard ' + model.get('id'));
        } ,
        
        onStackDelete: function (model) {
            // TODO
            console.log('deleting stack ' + model.get('id'));
        },
        
        onDashboardDelete: function (model) {
            // TODO
            //EventBus.trigger('dashboard:delete', model);
            model.get('switcherItem').destroy();
            console.log('deleting dashboard ' + model.get('id'));
        },
        
        onDashboardEdit: function (model) {
            console.log('editing dashboard ' + model.get('id'));
            this.hide().then(function () {
                EventBus.trigger('dashboard:create');
            });
        },
        
        onDashboardShare: function (model) {
            // TODO
            EventBus.trigger('dashboard:share', model);
            console.log('sharing dashboard ' + model.get('id'));
        },
        
        openSubTiles: function (model) {
            var stackEl = this.$('div[data-stack-id=' + model.id + ']');
            this.stackTiles = new Tiles({
                collection: model.get('children')
            });
            this.stackTiles.on('itemselected', _.bind(this.onItemSelect, this));
            this.stackTiles.on('stackrestore', _.bind(this.onStackRestore, this));
            this.stackTiles.on('dashboardrestore', _.bind(this.onDashboardRestore, this));
            this.stackTiles.on('stackdelete', _.bind(this.onStackDelete, this));
            this.stackTiles.on('dashboarddelete', _.bind(this.onDashboardDelete, this));
            this.stackTiles.on('dashboardedit', _.bind(this.onDashboardEdit, this));
            this.stackTiles.on('dashboardshare', _.bind(this.onDashboardShare, this));
            
            this.openStack = model;
            stackEl.after( this.stackTiles.render().$el );
            if (this.tiles.isManaging()) {
                this.stackTiles.toggleManage();
            }
            this.updateWindowSize();
        },
        
        toggleManage: function (evt) {
            $(evt.currentTarget).toggleClass('active');
            this.tiles.toggleManage();
            if (this.stackTiles) {
                this.stackTiles.toggleManage();
            }
        },

        create: function () {
            this.hide().then(function () {
                EventBus.trigger('dashboard:create');
            });
        },
        
        updateWindowSize: function() {
            var newWidth,
                newHeight,
                item = this.$('.dashboard')[0] || this.$('.stack')[0];
            
            if(!item) {
                return;
            }

            var windowEl = this.$('.dashboard-switcher-body'),
                widthMargin = $(item).outerWidth(true) - $(item).outerWidth(),
                heightMargin = $(item).outerHeight(true) - $(item).outerHeight(),
                totalDashboards = this.$('> .tilesview > .dashboard, > .tilesview > .stack').length,
                dashboardInRow = 0;

            this.dashboardItemWidth = $(item).width();
            this.dashboardItemHeight = $(item).height();

            if(totalDashboards < this.minDashboardsWidth) {
                dashboardInRow = this.minDashboardsWidth;
            }
            else if (totalDashboards > this.maxDashboardsWidth) {
                dashboardInRow = this.maxDashboardsWidth;
            }
            else {
                dashboardInRow = totalDashboards;
            }

            newWidth = (this.dashboardItemWidth + widthMargin + 1) * dashboardInRow;

            if(totalDashboards > this.maxDashboardsWidth * this.maxDashboardsHeight) {
                // add 30 to accomodate for scrollbar
                newWidth += 30;
            }
            if(totalDashboards > this.maxDashboardsWidth * this.maxDashboardsHeight) {
                newHeight = (this.dashboardItemHeight + heightMargin) * this.maxDashboardsHeight;
            }

            this.$('> .tilesview').css('height', newHeight);
            this.$('> .tilesview').css('width', newWidth + 30);
            this.$('> .tilesview').css('max-height', ((this.dashboardItemHeight + heightMargin + 1) * this.maxDashboardsHeight) + 40 + 'px');

        },
        
        show: function() {
            this.constructor.__super__.show.call(this);
            this.updateWindowSize();
        }
            
            
    });

});
