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
    'services/ZIndexManager',
    'backbone',
    'lodash',
    'jquery'
], function (AccordionPane, DesktopPane, FitPane, TabbedPane, PortalPane, View, HBox, VBox, Pane, BoxPane, WidgetWindow,
                WidgetStatesCollection, ZIndexManager, Backbone, _, $) {

    'use strict';

    return View.extend({
        vtype: 'dashboardinstance',

        className: 'dashboard',

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

            this.floatingWidgetCollection.on('add', _.bind(this.addFloatingWidget, this));
            this.floatingWidgetCollection.on('remove', _.bind(this.removeFloatingWidget, this));
        },

        floatingWidgets: function() {
            return this.floatingWidgetCollection;
        },

        views: function () {
            return this.model && this.model.get('layoutConfig');
        },

        renderFloatingWidgets: function() {
            var me = this;

            this.floatingWidgetCollection.each(function (widgetState) {
                me.renderFloatingWidget(widgetState);
            });

        },

        renderFloatingWidget: function(widgetState) {

            var ww = new WidgetWindow({
                model: widgetState,
                containment: this.$el,
                zIndexManager: this.floatingWidgetZIndexManager
            });

            this.$el.append(ww.render().$el);
            return ww;
        },

        addFloatingWidget: function(widget) {
            // Check whether the widget is in the collection
            if (!this.floatingWidgetCollection.get(widget.id)) {
                this.floatingWidgetCollection.add(widget, {silent: true});
            }
            this.renderFloatingWidget(widget);
        },

        removeFloatingWidget: function(widget) {
            if (this.floatingWidgetCollection.get(widget.id)) {
                this.floatingWidgetCollection.remove(widget, {silent: true});
            }
            //TODO: implement removal from view when logic for removal of widgets from parent views is implemented
        },

        afterRender: function() {
            this.renderFloatingWidgets();
            return this;
        }
    });

});
