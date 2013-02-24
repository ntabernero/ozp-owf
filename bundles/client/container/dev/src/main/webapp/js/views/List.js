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
    'views/View',
    // Libraries.
    'jquery',
    'lodash',
    'bootstrap/bootstrap-modal'
],

function(app, View, $, _) {

    return View.extend({

        // backbone view for a list item
        listItemView: null,

        initialize: function() {
            // listen to collection's events
            this.collection.bind('add', this.addOne, this);
            this.collection.bind('reset', this.addAll, this);

            // bind all functions content to this view
            _.bindAll(this);
        },

        render: function () {
            this.addAll();
            return this;
        },

        addOne: function(item) {
            var view = new this.listItemView({ model: item });
            this.$el.append(view.render().el);
        },

        addAll: function() {
            var frag = document.createDocumentFragment(),
                listItemView = this.listItemView;

            this.collection.each(function(item) {
                var view = new listItemView({ model: item });
                frag.appendChild(view.render().el);
            });

            this.$el.append(frag);
        }
    });

});
