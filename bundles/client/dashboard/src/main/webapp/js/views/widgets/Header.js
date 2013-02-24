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
    'handlebars'
], function (View, Handlebars) {
    
    'use strict';

    var tpl =
        '<img src="{{icon-src}}" class="header-icon"/>' +
        '<span class="name">{{name}}</span>' +
        '<ul class="actions nav">' +
            '{{{btnTemplate}}}' +
            '<li class="close-li">' +
                '<a title="Close" class="close-btn">' +
                    '<i class="icon-remove"></i>' +
                '</a>' +
            '</li>' +
        '</ul>';

    return View.extend({

        events: {
            'click .close-btn' : 'close'
        },


        model: null,
        className: 'header',
        template: Handlebars.compile(tpl),
        btnTemplate: '',    //subclasses should override

        render: function() {
            this.$el.html( this.template(this.createTemplateModel()) );
            return this;
        },

        createTemplateModel: function() {
            var templateModel = this.model.toJSON();

            templateModel.btnTemplate = this.btnTemplate;
            
            return templateModel;
        },

        close: function() {
            this.model.destroy();
        }
    });

});
