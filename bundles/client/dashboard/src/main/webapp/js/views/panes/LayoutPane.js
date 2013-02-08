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
    'collections/WidgetStatesCollection',
    'backbone',
    'jquery',
    'lodash'
], function (View, WidgetStatesCollection, Backbone, $, _) {

    'use strict';

    return View.extend({

        className: 'pane',

        modelEvents: {
            'add': 'addWidget'
        },

        initialize: function () {
            View.prototype.initialize.apply(this, arguments);

            //for now, accept collections as either 'collection' or 'widgets'
            var collectionProp = this.options.collection ? 'collection' : 'widgets';

            this.collection = this.options[collectionProp] instanceof Backbone.Collection ?
                    this.options[collectionProp] : new WidgetStatesCollection(this.options[collectionProp] || []);

            this.collection.on('change:active', _.bind(this.changeActivation, this));
        },

        /*
         * Subclasses should call this AFTER their specific render logic
         */
        render: function () {
            this.$el.append('<div class="paneshim hide"></div>');

            //if no widget is active, activate first widget
            if (!this.$('.active').length && this.collection.length) {
                this.collection.at(0).set('active', true);
            }

            return this;
        },

        //abstract method, override to provide widget activation semantics
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

        addWidget: $.noop, //abstract

        launchWidget: function (evt, model) {
        }

    });

});
