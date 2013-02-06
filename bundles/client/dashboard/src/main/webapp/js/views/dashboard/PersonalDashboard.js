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
    'views/panes/FitPane',
    'backbone',
    'views/View'
], function (FitPane, Backbone, View) {
    
    'use strict';

    return View.extend({

        className: 'dashboard',

        render: function() {
            // Get the dashboard.
            
            // Create a desktop pane for it.
            var pane = new FitPane(JSON.parse(this.model.get('layoutConfig')));
            this.$el.html(pane.render().el);
            
            // Set the browser title to the dashboard name.
            document.title = this.model.get('name');
            return this; 
        }
        
    });

});