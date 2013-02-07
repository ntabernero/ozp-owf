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
    'views/panes/AccordionPane',
    'views/panes/DesktopPane',
    'views/panes/FitPane',
    'views/panes/TabbedPane',
    'backbone',
    'views/View'
], function (AccordionPane, DesktopPane, FitPane, TabbedPane, Backbone, View) {

    'use strict';

    return View.extend({

        className: 'dashboard',

        render: function() {
            // Get the layoutConfig
            var pane = null, layoutConfig = JSON.parse(this.model.get('layoutConfig'));

            if (layoutConfig.paneType === 'accordionpane') {
                pane = new AccordionPane(layoutConfig);
            }
            else if (layoutConfig.paneType === 'desktoppane') {
                pane = new DesktopPane(layoutConfig);
            }
            else if (layoutConfig.paneType === 'fitpane') {
                pane = new FitPane(layoutConfig);
            }
            else if (layoutConfig.paneType === 'tabbedpane') {
                pane = new TabbedPane(layoutConfig);
            }
            else {
                pane = new DesktopPane(layoutConfig);
            }

            this.$el.html(pane.render().el);

            return this;
        }

    });

});
