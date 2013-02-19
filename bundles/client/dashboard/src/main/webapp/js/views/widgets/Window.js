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
    'views/widgets/Panel',
    'views/widgets/WindowHeader',
    'mixins/widgets/ResizableWidget',
    'backbone',
    'lodash',
    'jqueryui/jquery-ui.custom'
], function (Panel, WindowHeader, ResizableWidget, Backbone, _, $) {
    
    'use strict';

    return Panel.extend(_.extend({}, ResizableWidget, {

        model: null,
        className: 'widget window',

        HeaderClass: WindowHeader,

        initialize: function (options) {
            Panel.prototype.initialize.apply(this, arguments);

            this.zIndexManager = options.zIndexManager;
            this.zIndexManager.register(this, this.model.get('zIndex'));
        },

        render: function() {
            var me = this;

            Panel.prototype.render.call(me);

            me.$el
                .one('mousedown', function (evt) {
                    me.$el
                        .draggable({
                            containment: me.containment,
                            start: function() { me.$el.trigger('dragstart'); },
                            stop: function(evt, ui) {
                                me.$el.trigger('dragend');
                                me._onMove(evt, ui);
                            }
                        })
                        .trigger(evt);

                    me.on('remove', function(view) {
                        view.$el.draggable('destroy');
                    });
                });
    
            ResizableWidget.render.call(this, undefined, true, true);

            return me;
        },

        updateMinimize: function() {
            this.$el[this.model.get('minimized') ? 'addClass' : 'removeClass']('minimized');
        },

        updateMaximize: function() {
            this.$el[this.model.get('maximized') ? 'addClass' : 'removeClass']('maximized');
        },

        updateActive: function() {
            Panel.prototype.updateActive.apply(this, arguments);

            if (this.zIndexManager) {
                if (this.model.get('active')) {
                    this.zIndexManager.bringToFront(this);
                }

                this.model.set('zIndex', this.zIndexManager.getLogicalIndex(this));
            }
        },

        attributes: function() {
            var model = this.model;
            return {
                'style':    'left:' + model.get('x') + 'px;' +
                            'top:' + model.get('y') + 'px;'
            };
        },

        //TODO: refactor

        _onMove: function(evt, ui) {
            this.model.set('x', ui.position.left);
            this.model.set('y', ui.position.top);
        }

    }));

});
