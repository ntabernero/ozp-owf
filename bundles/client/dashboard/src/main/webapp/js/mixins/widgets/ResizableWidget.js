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
 * Common logic for widgets that can be resized by the user.
 * This mixin is used by widget Windows and widget Portlets.
 *
 * Usage: Mix this object into your class' prototype and 
 * be sure to call ResizableWidget.render in your render method.
 */
define([
    'lodash',
    'jqueryui/jquery-ui.custom'
], function(_, $) {
    return {
        /**
         * @param resizableOpts Extra options to be passed
         * into the resizable plugin
         */
        render: function(resizableOpts, widthResizable, heightResizable) {
            this.$el.resizable(_.extend({}, resizableOpts, {
                minHeight: 50,
                minWidth: 50,
                start: _.bind(this.onResizeStart, this),
                resize: _.bind(this.onResize, this),
                stop: _.bind(this.onResizeStop, this)
            }));

            if (widthResizable) {
                this.$el.css('width', this.model.get('width'));
            }
            if (heightResizable) {
                this.$el.css('height', this.model.get('height'));
            }
        },

        onResizeStart: function () {
            this.mask();
        },

        onResizeStop: function () {
            this.unmask();
        },

        onResize: function (evt, ui) {
            this.model.set('height', ui.size.height);
            this.model.set('width', ui.size.width);
        }
    };
});
