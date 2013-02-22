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
    'views/Modal',

    // Libraries.
    'jquery',
    'handlebars',
    'bootstrap/bootstrap-modal',
    'select2'
],

function(Modal, $, Handlebars) {

    return Modal.extend({

        id: 'edit-dashboard-window',

        template:   Handlebars.compile(
                        '<form class="form-horizontal">' +
                            '<div class="control-group">' + 
                                '<label class="control-label" for="name">Name</label>' + 
                                '<div class="controls">' + 
                                    '<input autofocus type="text" class="name" placeholder="Name..." value="{{name}}">' + 
                                '</div>' + 
                            '</div>' + 
                            '<div class="control-group">' + 
                                '<label class="control-label" for="description">Description</label>' + 
                                '<div class="controls">' + 
                                    '<textarea rows="3" class="description" placeholder="Description...">{{description}}</textarea>' + 
                                '</div>' + 
                            '</div>' +
                        '</form>'
                    ),

        name: function () {
            return this.model && this.model.get('name');
        },

        description: function () {
            return this.model && this.model.get('description');
        },

        render: function () {
            Modal.prototype.render.call(this);

            this.$body.html( this.template(this) );

            return this;
        },

        ok: function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            
            this.model.set({
                name: this.$body.find('.name').val(),
                description: this.$body.find('.description').val()
            });

            this._deferred.resolve(this.model);
        },

        edit: function() {
            this._deferred = $.Deferred();
            return this._deferred.promise();
        }
    });
});
