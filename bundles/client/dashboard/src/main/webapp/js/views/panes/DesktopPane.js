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
    'views/widgets/Window',
    'views/Taskbar',
    'views/widgets/WindowHeader',
    'services/ZIndexManager',
    'jquery',
    'backbone'
], function (LayoutPane, WidgetWindow, Taskbar, WindowHeader, ZIndexManager, $, Backbone) {
    
    'use strict';

    return LayoutPane.extend({
        vtype: 'desktoppane',

        $body: null, //jquery element for the dashboard body
        taskbar: null, //taskbar View

        className: LayoutPane.prototype.className + ' desktoppane',

        initialize: function() {
            LayoutPane.prototype.initialize.apply(this, arguments);

            this.zIndexManager = new ZIndexManager();
        },

        render: function () {
            var me = this;

            me.renderTaskbar();

            me.$body = $('<div class="body">');
            me.$el.append(me.$body);

            me.renderCollection({
                $body: me.$body,
                viewFactory: function(model) {
                    return new WidgetWindow({
                        model: model,
                        containment: me.$body,
                        zIndexManager: me.zIndexManager
                    });
                },
                collection: me.collection
            });
            
            return LayoutPane.prototype.render.apply(me, arguments);
        },

        renderTaskbar: function() {
            this.taskbar = new Taskbar({
                collection: this.collection,
                HeaderClass: WindowHeader
            });

            this.taskbar.render();
            this.$el.append(this.taskbar.$el);
        },

        updateSize: function() {
            var me = this;

            LayoutPane.prototype.updateSize.apply(me, arguments);

            //adjust to new size once it is worked out
            setTimeout(function() {
                me.taskbar.updateSize();
            }, 0);
        }
    });
});
