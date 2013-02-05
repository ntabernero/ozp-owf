define([
    'require',
    'views/View',
    'views/designer/Box',
    'jquery',
    'lodash',
    'bootstrap-editable'
], function (require, View, Box, $, _) {

    'use strict';

    var percentageUnitsRegex = /^\d+(\.\d+)?%$/i,
        pxUnitsRegex = /^\d+(\.\d+)?px$/i,
        isPercentageSize = function (size) {
            return size && percentageUnitsRegex.test(size);
        },
        isPixelSize = function (size) {
            return size && pxUnitsRegex.test(size);
        };

    return View.extend({

        className: 'pane',

        paneType: null,
        htmlText: null,

        attributes: {
            tabindex: 0
        },

        initialize: function () {
            if(!Box) {
                Box = require('views/designer/Box');
            }
            View.prototype.initialize.apply( this, arguments );
        },

        render: function () {
            var $size = $( '<h3>' + _.escape(this.options.htmlText) + '</h3>' );
            this.$el.append( $size );
            this.$el.data( 'view', this );
            this.initEditable();
            return this;
        },

        nest: function (box, options) {
            this.$el.empty().append( box.render().el );
            this.options.box = options;
            return this;
        },

        initEditable: function () {
            var $size = this.$el.children('h3');
            $size.editable({
                mode: 'inline',
                onblur : 'submit',
                showbuttons: false,
                validate: _.bind( this.validate, this ),
                display: _.bind( this.editComplete, this, $size )
            });
        },

        validate: function (value) {
            value = $.trim( value );
            var num = parseFloat( value );

            if(isNaN( num )) {
                return "Nice try! Invalid input, please enter a valid value. For example, 400px or 50%.";
            }

            if( isPercentageSize( value ) ) {
                if( num <= 0 ) {
                    return "Width/Height of 0% or lower is not allowed";
                }
                else if( num >= 100 ) {
                    return "Width/Height of 100% or higher is not allowed";
                }
            }
            else if( num < 36 ) {
                return "Minimum width/height allowed is 36px";
            }
        },

        editComplete: function ($editable, value) {
            if( !isPixelSize( value ) && !isPercentageSize( value ) ) {
                value = parseFloat( value ) + 'px';
            }
            $editable.html( value );

            this.trigger( 'sizeChange', value );
        },

        updateSize: function (options) {
            var size = options.width || options.height,
                value = size ? size : 'Variable';

            if(options.width || options.height) {
                this.options[ options.width ? 'width' : 'height' ] = size;
                this.options.htmlText = size;
                delete this.options.flex;
            }
            else {
                delete this.options.width;
                delete this.options.height;
                this.options.flex = 1;
                this.options.htmlText = 'Variable';
            }
            this.$el.children('h3')
                .editable( 'destroy' )
                .html( value );

            this.initEditable();
        },

        remove: function () {
            if(this.box) {
                this.box.remove();
            }
            else {
                this.$el.children('h3').editable( 'destroy' );
            }
            View.prototype.remove.apply( this, arguments );
        }

    });

});
