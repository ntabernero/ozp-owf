define([
    'views/View',
    './Pane',
    'jquery',
    'lodash',
    'jquery-splitter'
], function (View, Pane, $, _) {
    
    'use strict';

    var percentageUnitsRegex = /^\d+(\.\d+)?%$/i,
        isPercentageSize = function (size) {
            return size && percentageUnitsRegex.test(size);
        };

    return View.extend({

        className: 'box',

        events: {
            'layoutChange': 'updateLayout'
        },

        initialize: function () {
            if( !this.options.orientation ) {
                this.options.orientation = 'vertical';
            }

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
                .splitter( this.options );

            this.listenTo( this.firstPane, 'sizeChange', _.bind(this.updateSecondPane, this) );
            this.listenTo( this.secondPane, 'sizeChange', _.bind(this.updateFirstPane, this) );

            return this;
        },

        updateLayout: function () {
            console.log('update box layout');
        },

        updatePane: function (pane, secondPaneSize) {
            var size = parseFloat( secondPaneSize ),
                options = {},
                prop = this.options.orientation === 'vertical' ? 'width' : 'height';

            if( isPercentageSize( secondPaneSize ) ) {
                options[ prop ] = (100 - size) + '%';
                pane.updateSize( options );
            }
            else {
                pane.updateSize( options );
            }
            this.$el.splitter( this.options );
        },

        updateFirstPane: function (secondPaneSize) {
            this.updatePane( this.firstPane, secondPaneSize );
        },

        updateSecondPane: function (firstPaneSize) {
            this.updatePane( this.secondPane, firstPaneSize );
        }

    });

});
