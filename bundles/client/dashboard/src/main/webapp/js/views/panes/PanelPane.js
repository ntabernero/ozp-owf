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

/**
 * This class is the superclass of AccordionPane and PortalPane
 */
define([
    'views/panes/LayoutPane',
    'views/widgets/Panel',
    'mixins/containers/SortableCollectionView',
    'backbone',
    'lodash'
], function (LayoutPane, Panel, SortableCollectionView, Backbone, _) {
    'use strict';

    return LayoutPane.extend(_.extend({}, SortableCollectionView, {
        className: LayoutPane.prototype.className + ' panelpane',

        initialize: function() {
            LayoutPane.prototype.initialize.apply(this, arguments);

            this.initSortable({
                handle: ".header",
                cursor: 'move',
                axis: 'y'
            });
        },

        render: function() {
            this.renderCollection({
                $body: this.$el,
                collection: this.collection,
                viewFactory: this.viewFactory
            });

            return LayoutPane.prototype.render.apply(this, arguments);
        },

        //can be overridden by subclasses
        viewFactory: function(widget) {
            return new Panel({
                model: widget
            });
        }
     }));
});
