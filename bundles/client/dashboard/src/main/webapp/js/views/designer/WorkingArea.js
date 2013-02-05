define([
    'views/View',
    'views/designer/Box',
    'jquery',
    'lodash',
    'bootstrap-editable'
], function (View, Box, $, _) {

    'use strict';

    return View.extend({
        vtype: 'working.area',

        id: 'designer',
        className: 'working-area',

        viewOptions: function () {
            return this.model && this.model.get('layoutConfig');
        },

        views: function() {
            return this.viewOptions();
        },

        initialize: function () {
            this.$el.data( 'layoutConfig', this.viewOptions() );
            View.prototype.initialize.apply( this, arguments );
        },

        nest: function (options) {
            this.box = new Box(options);
            this.$el.append( this.box.render().el );
            this.$el.data( 'layoutConfig', options );
            return this;
        },

        remove: function () {
            this.box && this.box.remove();
            View.prototype.remove.apply( this, arguments );
        }
    });

});
