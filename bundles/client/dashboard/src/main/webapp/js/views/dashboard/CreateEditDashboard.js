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

/*jshint bitwise:false*/
define([
    'models/DashboardInstanceModel',
    'views/Modal',

    // Libraries.
    'jquery',
    'bootstrap/bootstrap-modal'
],

function(DashboardModel, Modal, $) {

    // TODO move this out of there
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    function guid () {
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    var CreateEditDashboard = Modal.extend({

        id: 'create-edit-dashboard-window',

        template:   '<form class="form-horizontal">' +
                        '<div class="control-group">' + 
                            '<label class="control-label" for="name">Name</label>' + 
                            '<div class="controls">' + 
                                '<input autofocus type="text" class="name" placeholder="Name...">' + 
                            '</div>' + 
                        '</div>' + 
                        '<div class="control-group">' + 
                            '<label class="control-label" for="description">Description</label>' + 
                            '<div class="controls">' + 
                                '<textarea rows="3" class="description" placeholder="Description..."></textarea>' + 
                            '</div>' + 
                        '</div>' + 
                    '</form>',

        initialize: function () {
            var me = this;

            this.constructor.__super__.initialize.call(this);

            this.$el.on('hidden', function() {
                me.trigger('hidden');
            });
        },

        // content: function() {
        //     console.log(this.template, this);
        //     return 'ABC';
        // },

        render: function () {
            this.constructor.__super__.render.call(this);

            this.$body.html( this.template );

            return this;
        },

        ok: function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            
            var me = this,
                name = $('.name', me.$el).val(),
                description = $('.description', me.$el).val();

            if( me._createDeferred ) {
                var dashboard = new DashboardModel({
                    name: name,
                    description: description,
                    guid: guid()
                });
                
                me.hide().then(function () {
                    me.remove();
                    me._createDeferred.resolve( dashboard );
                });
            }
            else {
                this._editDeferred.resolve();
            }
        },

        create: function () {
            this._createDeferred = $.Deferred();
            return this._createDeferred.promise();
        },

        edit: function() {
            this._editDeferred = $.Deferred();
            return this._editDeferred.promise();
        }
    });

    return CreateEditDashboard;
});
