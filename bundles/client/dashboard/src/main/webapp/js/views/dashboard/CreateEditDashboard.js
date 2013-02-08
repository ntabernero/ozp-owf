/*jshint bitwise:false*/
define([
    'models/PersonalDashboardModel',
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
