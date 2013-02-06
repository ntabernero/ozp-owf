define([
    'views/box/Box',
    './Pane',
    'jquery',
    'lodash',
    'jquery-splitter'
], function (Box, Pane, $, _) {
    
    'use strict';

    var percentageUnitsRegex = /^\d+(\.\d+)?%$/i,
        isPercentageSize = function (size) {
            return size && percentageUnitsRegex.test(size);
        };

    return Box.extend({
        vtype: 'designerbox',
        
        className: 'box',

        events: {
            'layoutChange': 'updateLayout'
        },

        afterRender: function () {
            Box.prototype.afterRender.apply( this, arguments );

            this.listenTo( this.firstPane, 'sizeChange', _.bind(this.firstPaneSizeChanged, this) );
            this.listenTo( this.secondPane, 'sizeChange', _.bind(this.secondPaneSizeChanged, this) );

            return this;
        }

    });

});
