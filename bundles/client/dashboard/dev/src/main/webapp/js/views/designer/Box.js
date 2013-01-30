define([
    'views/View',
    './Pane',
    'jquery',
    'lodash',
    'jquery-splitter'
], function (View, Pane, $, _) {
    
    'use strict';

    return View.extend({

        className: 'box',

        events: {
            'layoutChange': 'updateLayout'
        },

        initialize: function () {
            this.$el.addClass( this.options.orientation && this.options.orientation === 'vertical' ? 'hbox' : 'vbox');
            View.prototype.initialize.apply(this, arguments);
        },

        render: function () {
            var panes = this.options.panes;

            this.firstPane = new Pane( panes[0] );
            this.secondPane = new Pane( panes[1] );

            this.$el
                .append( this.firstPane.render().el )
                .append( this.secondPane.render().el )
                .splitPane( this.options );

            return this;
        },

        updateLayout: function () {
            console.log('update box layout');
        }

    });

});
