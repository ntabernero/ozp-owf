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
    'views/panes/PanelPane',
    'views/widgets/Panel',
    'mixins/containers/SortableCollectionView',
    'jquery',
    'backbone',
    'lodash'
], function (PanelPane, Panel, SortableCollectionView, $, Backbone, _) {
    
    'use strict';

    return PanelPane.extend(_.extend({}, SortableCollectionView, {
        vtype: 'accordionpane',

        className: PanelPane.prototype.className + ' accordionpane',

        modelEvents: _.extend({}, PanelPane.prototype.modelEvents, {
            'change:collapsed destroy': 'updateSize'
        }),

        initialize: function() {
            var me = this;

            PanelPane.prototype.initialize.apply(this, arguments);

            // Set sortable's scroll to false so the pane is static when dragging widgets
            me.$el.sortable("option", "scroll", false);

            // TODO: Remove this when updateSize of each pane is called on resize
            // Update widget heights on window resize
            var id;
            $(window).resize(function() {
                // Use timeouts so resize handler doesn't execute too many times
                clearTimeout(id);
                id = setTimeout($.proxy(me.updateSize, me), 100);
            });
        },

        afterRender: function() {
            PanelPane.prototype.afterRender.apply(this, arguments);

            this.updateSize();
        },

        updateSize: function() {
            var me = this,
                paneHeight = me.$el.height();

            // TODO: Remove this if/else (keep if block's code) when updateSize of each pane is called on dashboard render
            // If height is 0px pane hasn't been rendered to body yet
            if(paneHeight > 0) {
                var widgets = me.$el.children('.widget'),
                    collapsedWidgets = widgets.filter('.collapsed').length,
                    expandedWidgets = widgets.length - collapsedWidgets,
                    headerHeight = widgets.children('.header:first').height();

                // Get the % height of the pane that a widget border takes up, parseInt to remove 'px'
                var borderPct = 100 * ((parseInt(widgets.css("border-top-width"), 10) + parseInt(widgets.css("border-bottom-width"), 10)) / paneHeight);

                // Get the % height of the pane that a widget header takes up, handles floating-point
                var headerPct = parseFloat((100 * (headerHeight / paneHeight)).toPrecision(12));

                // Get the % height of the pane that an expanded widget should take up by dividing the total
                // % height the collapsed widgets and widget borders take up by the number of expanded widgets
                var expandedWidgetPct = (100 - (collapsedWidgets * headerPct) - (widgets.length * borderPct)) / expandedWidgets;

                // Set the % height of all widgets, collapsed widgets will have their height overridden in css
                widgets.css('height', expandedWidgetPct + '%');
            }
            else {
                // Not rendered, wait a bit and try again
                clearTimeout(me.id);
                me.id = setTimeout(function() { me.updateSize(); }, 100);
            }
        }
    }));
});
