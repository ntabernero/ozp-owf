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

            this.listenTo( this.firstPane, 'sizeChange', _.bind(this.firstPaneSizeChanged, this) );
            this.listenTo( this.secondPane, 'sizeChange', _.bind(this.secondPaneSizeChanged, this) );

            return this;
        },

        getSizingProperty: function () {
            return this.options.orientation === 'vertical' ? 'width' : 'height';
        },

        updateLayout: function (evt) {
            var firstPaneOptions = this.firstPane.options,
                prop = this.getSizingProperty();

            if( firstPaneOptions.flex ) {
                this.secondPaneSizeChanged( this.firstPane.$el[prop]() + 'px' );
            }
            else if( isPercentageSize( firstPaneOptions[prop] ) ) {
                var newSize = Math.round( (this.firstPane.$el[prop]() / this.$el[prop]()) * 100 ) + '%';
                this.firstPaneSizeChanged( newSize );
            }
            else {
                this.firstPaneSizeChanged( this.firstPane.$el[prop]() + 'px' );
            }
        },

        updatePane: function (pane, otherPaneSize) {
            var size = parseFloat( otherPaneSize ),
                options = {},
                prop = this.getSizingProperty();

            if( isPercentageSize( otherPaneSize ) ) {
                options[ prop ] = (100 - size) + '%';
                pane.updateSize( options );
            }
            else {
                pane.updateSize( options );
            }
            this.$el.splitter( this.options );
        },

        secondPaneSizeChanged: function (size) {
            var options = {},
                prop = this.getSizingProperty();

            options[prop] = size;
            this.secondPane.updateSize( options );
            this.updatePane( this.firstPane, size );
        },

        firstPaneSizeChanged: function (size) {
            var options = {},
                prop = this.getSizingProperty();

            options[prop] = size;
            this.firstPane.updateSize( options );
            this.updatePane( this.secondPane, size );
        },

        remove: function () {
            this.firstPane.remove();
            this.secondPane.remove();
            View.prototype.remove.apply( this, arguments );
        }

    });

});
