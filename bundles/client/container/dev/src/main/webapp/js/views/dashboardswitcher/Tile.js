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
    'views/View',

    // Libraries.
    'jquery',
    'handlebars',
    'jqueryui/jquery-ui.custom'
],

function(View, $, Handlebars) {
    
    var tpl = 
            '<img src="/themes/common/images/dashboardswitcher/DefaultDashboard_Color.png" class="img-polaroid" />' +
            '<span>{{this.name}}</span>' +
            '<div class="btn-group">' +
                '<button class="btn"><i class="icon-refresh"></i></button>' +
                '<button class="btn"><i class="icon-share"></i></button>' +
                '<button class="btn"><i class="icon-edit"></i></button>' +
                '<button class="btn"><i class="icon-remove"></i></button>' +
            '</div>';
   
        
    return View.extend({
        
        className: 'dashboard-view',

        template:   Handlebars.compile(tpl),

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        },

        attributes: function() {
            return {
                "data-id": this.model.get('id'),
                'tabIndex': '0'
            };
        }
    });
});