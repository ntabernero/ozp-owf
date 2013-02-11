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
    'views/widgets/Header',
    'views/widgets/WidgetControlIframe',
    'views/Taskbar',
    'backbone',
    'jquery'
], function (LayoutPane, Header, WidgetControlIframe, Taskbar, Backbone, $) {
    'use strict';

    return LayoutPane.extend({
		vtype: 'tabbedpane',
		
        className: LayoutPane.prototype.className + ' tabbedpane',

        $body: null,
        tabbar: null,

        render: function() {
            var me = this; 

            me.tabbar = new Taskbar({
                collection: me.collection,
                HeaderClass: Header
            });

            me.$body = $('<div class="body">');

            me.$el.append(me.tabbar.render().$el)
                    .append(me.$body);

            me.collection.each(function(widgetState) {
                  me.addWidget(widgetState);             
            });

            return LayoutPane.prototype.render.apply(me, arguments);
        },

        addWidget: function(widget) {
            var frame = new WidgetControlIframe({
                model: widget
            });

            this.$body.append(frame.render().$el);
        }
    });
});
