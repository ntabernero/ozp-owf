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
    'views/View',
    'mixins/widgets/WidgetControl',
    'mixins/containers/SortableCollectionView',
    'jquery',
    'backbone',
    'lodash'
], function (View, WidgetControl, SortableCollectionView, $, Backbone, _) {
    'use strict';
 
    /**
     * Creates a subclass of a Header class which has extra logic.
     * @param SuperClass The constructor for the immediate superclass
     * of the class to create.  Should Header or a subclass thereof.
     * @return The constructor for the new class
     */
    function createTaskbarHeaderClass(SuperClass) {
        return SuperClass.extend(_.extend({}, WidgetControl, {
            tagName: 'li',

            events: function() {
                return _.extend({}, WidgetControl.events, SuperClass.prototype.events);
            },

            initialize: function() {
                SuperClass.prototype.initialize.apply(this, arguments);
                WidgetControl.initialize.apply(this, arguments);
            }
        }));
    }   

    return View.extend(_.extend({}, SortableCollectionView, {
        tagName: 'ol',

        className: 'taskbar', 

        modelEvents: {
            'add': 'addWidget'
        },

        initialize: function(options) {
            View.prototype.initialize.apply(this, arguments);

            this.collection = options.collection;

            this.TaskbarHeader = createTaskbarHeaderClass(options.HeaderClass);

            this.initSortable();

//            //TODO: This is temporary, take it out once dashboards
//            //have code to call pane resize
//            $(window).on('resize', _.bind(this.resize, this));
        },

        render: function() {
            this.collection.each(_.bind(this.addWidget, this));
            return this;
        },

        addWidget: function(widget) {
            var header = new this.TaskbarHeader({
                model: widget
            });

            header.render();
            this.$el.append(header.$el);

            this.handleOverflow();
        },

        resize: function() {
            this.handleOverflow();
        },

        handleOverflow: function() {
            var taskbarWidth,
                unchangeableWidth = 0,  //the total width of paddings, borders, and margins on content
                changeableWidth = 0,    //sum of inner widths of headers
                ratio;

            taskbarWidth = window.getComputedStyle ? 
                //use getComputedStyle to avoid rounding bug in chrome
                Math.floor(parseInt(window.getComputedStyle(this.el, null).width, 10)) :

                //IE7/8 doesn't support window.getComputedStyle
                this.$el.width();

            this.$el.children('.header').each(function(idx, header) {
                var $header = $(header),
                    outerWidth,
                    innerWidth;

                $(header).css('width', ''); //unset manual width
                outerWidth = $header.outerWidth(true); //true to include margin
                innerWidth = $header.width();

                changeableWidth += innerWidth;
                unchangeableWidth += outerWidth - innerWidth;
            });

            //need taskbarWidth = unchangeableWidth + changeableWidth * ratio; solve for ratio
            ratio = (taskbarWidth - unchangeableWidth) / changeableWidth;

            //if content is too wide, resize according to calculated ratio
            if (ratio < 1) {
                this.$el.children('.header').each(function(idx, header) {
                    var $header = $(header);

                    $header.width($header.width() * ratio);
                });
            }
        }
    }));
});
