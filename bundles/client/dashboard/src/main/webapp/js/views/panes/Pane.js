define([
    'views/View'
], function (View) {
    
    'use strict';

    return View.extend({
        vtype: 'pane',

        views: function () {
            return this.options.box;
        },
        
        initialize: function () {
            this.$el.addClass('pane');

            View.prototype.initialize.apply(this, arguments);
        }

    });

});
