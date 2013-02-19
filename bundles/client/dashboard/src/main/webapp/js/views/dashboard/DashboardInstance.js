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
        },

        views: function () {
            return this.model && this.model.get('layoutConfig');
        },

        renderFloatingWidgets: function() {
            var me = this;

            me.$floatingWidgetContainer = me.$floatingWidgetContainer || $('<div class="floatingWidgetContainer">');
            this.floatingWidgetCollection.each(function (widgetState) {
                me.renderFloatingWidget(widgetState);
            });

            me.$el.append(me.$floatingWidgetContainer);
        },

        renderFloatingWidget: function(widgetState) {

            var ww = new WidgetWindow({
                model: widgetState,
                containment: this.$floatingWidgetContainer,
                zIndexManager: this.floatingWidgetZIndexManager
            });

            this.$floatingWidgetContainer.append(ww.render().$el);
            return ww;
        },

        addFloatingWidget: function(widget) {
            this.floatingWidgetCollection.add(widget);
            this.renderFloatingWidget(widget);
        },

        afterRender: function() {
            this.renderFloatingWidgets();
        }
    });

});
