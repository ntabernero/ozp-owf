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
    'views/widgets/Window',
    'views/Taskbar',
    'services/ZIndexManager',
    'jquery',
    'backbone'
], function (Pane, WidgetWindow, Taskbar, ZIndexManager, $, Backbone) {
    
    'use strict';

    return Pane.extend({
        $body: null, //jquery element for the dashboard body
        taskbar: null, //taskbar View

        className: 'pane desktoppane',

        initialize: function() {
            Pane.prototype.initialize.apply(this, arguments);

            this.windows = [];

            this.zIndexManager = new ZIndexManager();
        },

        render: function () {
            var me = this;

//            console.time('pane');
            this.constructor.__super__.render.call(this);

            this.renderTaskbar();
            this.renderWidgets();

//            console.timeEnd('pane');
            return this;
        },

        renderTaskbar: function() {
            this.taskbar = new Taskbar({
                collection: this.collection
            });

            this.taskbar.render();
            this.$el.append(this.taskbar.$el);
        },

        renderWidgets: function() {
            var me = this;

            me.$body = $(document.createElement('div')).addClass('body');

            this.collection.each(function (widgetState) {
                me.renderWidget(widgetState);
            });

            me.$el.append(me.$body);
        },

        renderWidget: function(widgetState) {
//            console.time('widget');
        
            var ww = new WidgetWindow({
                model: widgetState,
                containment: this.$body,
                zIndexManager: this.zIndexManager
            });

            this.$body.append(ww.render().$el);

//            console.timeEnd('widget');

            this.windows.push(ww);

            return ww;
        },

        addWidget: function(widget) {
            this.renderWidget(widget);
        },

        launchWidget: function (evt, model) {
            var ww = this.renderWidget(model);
            return ww;
        },

        changeActivation: function(widget) {
            var active = widget.get('active');

            if (active) {
                //deactivate all other widgets
                this.collection.each(function(widg) {
                    if (widget !== widg) {
                        widg.set('active', false);
                    }
                });
            }
        }
        
    });

});
