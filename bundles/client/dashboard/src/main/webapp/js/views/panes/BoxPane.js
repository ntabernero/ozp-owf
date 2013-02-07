define([
    'views/panes/Pane'
], function (Pane) {
    
    'use strict';

    return Pane.extend({
        vtype: 'boxpane',

        views: function () {
            return this.options.box;
        },
        
        initialize: function () {
            this.$el.addClass('boxpane');
            Pane.prototype.initialize.apply(this, arguments);
        }

    });

});
