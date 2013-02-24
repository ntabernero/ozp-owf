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
		vtype: 'fitpane',
		
        className: LayoutPane.prototype.className + ' fitpane',

        initialize: function() {
            LayoutPane.prototype.initialize.apply(this, arguments);
        },

        render: function() {
            var me = this;

            function viewFactory(model) {
                if (me.collection.length > 1) {
                    throw "Fit Panes cannot contain more than one widget";
                }
                else {
                    return new WidgetControlIframe({
                        model: model
                    });
                }
            }

            me.renderCollection({
                $body: me.$el,
                viewFactory: viewFactory,
                collection: me.collection
            });

            return LayoutPane.prototype.render.apply(me, arguments);
        }
    });
});
