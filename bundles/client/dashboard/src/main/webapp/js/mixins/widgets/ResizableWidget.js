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

    function disableResize() {
        this.$el.resizable('disable');
    }

    function enableResize() {
        this.$el.resizable('enable');
    }

    return {
        /**
         * @param resizableOpts Extra options to be passed
         * into the resizable plugin
         */
        render: function(resizableOpts, widthResizable, heightResizable) {
            this.$el.resizable(_.extend({}, resizableOpts, {
                minHeight: 200,
                minWidth: 200,
                start: _.bind(this.onResizeStart, this),
                resize: _.bind(this.onResize, this),
                stop: _.bind(this.onResizeStop, this)
            }));

            this.on('remove', function(view) {
                view.$el.resizable('destroy');
            });

            if (widthResizable) {
                this.$el.css('width', this.model.get('width'));
            }
            if (heightResizable) {
                this.$el.css('height', this.model.get('height'));
            }

            //Once render is called and the resizable plugin
            //is initialized, we can hook up the functions that enable
            //and disable that plugin
            _.extend(this, {
                enableResize: enableResize,
                disableResize: disableResize
            });

            if (this.resizeDisabled) {
                this.disableResize();
            }
        },

        onResizeStart: function () {
            this.$el.trigger('dragstart');
        },

        onResizeStop: function () {
            this.$el.trigger('dragend');
        },

        onResize: function (evt, ui) {
            this.model.set('height', ui.size.height);
            this.model.set('width', ui.size.width);
        },

        //these functions save whether or not resize
        //should be disabled once it is initialized. Once 
        //render is called these are replaced with functions that
        //immediately disable or enable the plugin
        enableResize: function() {
            this.resizeDisabled = false;
        },

        disableResize: function() {
            this.resizeDisabled = true;
        }
    };
});
