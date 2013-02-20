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
    'views/panes/AccordionPane',
    'views/panes/DesktopPane',
    'views/panes/FitPane',
    'views/panes/TabbedPane',
    'views/panes/PortalPane',
    'views/View',
	'views/box/HBox',
    'views/box/VBox',
    'views/panes/Pane',
    'views/panes/BoxPane',
    'views/widgets/Window',
    'collections/WidgetStatesCollection',
    'mixins/CollectionView',
    'services/ZIndexManager',
    'backbone',
    'lodash',
    'jquery'
], function (AccordionPane, DesktopPane, FitPane, TabbedPane, PortalPane, View, HBox, VBox, Pane, BoxPane, WidgetWindow,
                WidgetStatesCollection, CollectionView, ZIndexManager, Backbone, _, $) {

    'use strict';

    return View.extend(_.extend({}, CollectionView, {
        vtype: 'dashboardinstance',

        className: 'dashboard',

        //whenever a drag event is occurring,
        //display a mask over the dashboard to prevent widget iframes
        //from interfering with mouseovers
        events: {
            'dragstart': 'showMask',
            'dragend': 'hideMask'
        },

        initialize: function() {
            View.prototype.initialize.apply(this, arguments);

            this.floatingWidgetZIndexManager = new ZIndexManager();

            // Obtain the floating widget collection
            var floatingWidgets = this.model.get('floatingWidgets');
            if (floatingWidgets) {
                if (_.isString(floatingWidgets)) {
                    floatingWidgets = JSON.parse(floatingWidgets);
                }
                this.floatingWidgetCollection = new WidgetStatesCollection(floatingWidgets);
            } else {
                this.floatingWidgetCollection = new WidgetStatesCollection();
            }
        },

        showMask: function() {
            this.$el.children('.mask').removeClass('hide');
        },

        hideMask: function() {
            this.$el.children('.mask').addClass('hide');
        },

        views: function () {
            return this.model && this.model.get('layoutConfig');
        },

        render: function() {
            View.prototype.render.apply(this, arguments);

            //create the drag mask
            this.$el.append('<div class="mask hide" />');
            return this;
        },

        afterRender: function() {
            var me = this;

            me.renderCollection({
                $body: me.$el,
                collection: me.floatingWidgetCollection,
                viewFactory: function(model) {
                    return new WidgetWindow({
                        model: model,
                        containment: me.$el,
                        zIndexManager: me.floatingWidgetZIndexManager
                    });
                }
            });

            return me;
        },

        floatingWidgets: function() {
            return this.floatingWidgetCollection;
        }
    }));
});
