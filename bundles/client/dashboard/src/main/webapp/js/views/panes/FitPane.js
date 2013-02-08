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
    'views/panes/LayoutPane',
    'views/widgets/WidgetControlIframe',
    'lodash',
    'backbone'
], function (LayoutPane, WidgetControlIframe, _, Backbone) {
    
    'use strict';

    return LayoutPane.extend({
        className: 'pane fitpane',

        initialize: function() {
            LayoutPane.prototype.initialize.apply(this, arguments);

            if (this.collection.length > 1) {
                throw "Fit Panes cannot contain more than one widget";
            }
        },

        render: function() {
            LayoutPane.prototype.render.apply(this, arguments);
            this.addWidget();
            return this;
        },

        addWidget: function() {
            if (this.collection.length > 1) {
                throw "Fit Panes cannot contain more than one widget";
            }
            else if (this.collection.length === 1) {
                this.$el.append(
                    new WidgetControlIframe({
                        model: this.collection.at(0)
                    }).render().$el
                );
            }
        }
    });

});
