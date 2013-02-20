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
    'views/panes/Pane',
    'collections/WidgetStatesCollection',
    'backbone',
    'jquery',
    'lodash'
], function (Pane, WidgetStatesCollection, Backbone, $, _) {
    
    'use strict';

    return Pane.extend({
        vtype: 'layoutpane',

        className: 'pane',

        modelEvents: {
            'add': 'addWidget'
        },

        views: function () {
            return this.options.box;
        },
        
        initialize: function () {
            this.collection = this.options.widgets instanceof Backbone.Collection ? 
                this.options.widgets :
                new WidgetStatesCollection(this.options.widgets || []);

            this.collection.on('change:active', _.bind(this.changeActivation, this));

            Pane.prototype.initialize.apply(this, arguments);

            //if no widget is active, activate first widget
            if (this.collection.length && !this.collection.where({active: true}).length) {
                this.collection.at(0).set('active', true);
            }
        },

        afterRender: function () {
            this.$el.append( '<div class="paneshim hide"></div>' );
        },


        changeActivation: function (widget) {
            var active = widget.get('active');

            if (active) {
                //deactivate all other widgets
                this.collection.each(function (widg) {
                    if (widget !== widg) {
                        widg.set('active', false);
                    }
                });
            }
        },

        //this should be overridden with more behavior in subclasses
        addWidget: function(widget) {
            if (widget.get('active')) {
                this.changeActivation(widget);
            }
        }
    });

});
