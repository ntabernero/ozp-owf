define([
    'views/View',
    'jquery',
    'lodash',
    'bootstrap-editable'
], function (View, $, _) {

    'use strict';

    var percentageUnitsRegex = /^\d+(\.\d+)?%$/i,
        isPercentageSize = function (size) {
            return size && percentageUnitsRegex.test(size);
        };

    return View.extend({

        className: 'pane',

        paneType: null,
        htmlText: null,

        attributes: {
            tabindex: 0
        },

        initialize: function () {
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
                validate: _.bind(this.validate, this),
                display: _.bind(this.editComplete, this, $size)
            });
        },

        validate: function (value) {
            value = $.trim( value );
            var num = parseFloat( value );

            if(isNaN( num )) {
                return "Nice try! Invalid input, please enter a valid value. For example, 400px or 50%.";
            }

            if( value.charAt(value.length-1) === "%" ) {
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
            value = isPercentageSize( value ) ? value : (value + 'px');
            console.log('new value is ', value);
            $editable.html(value);
            
            this.options.htmlText = value;
            if(this.options.width) {
                this.options.width = value;
            }
            else if(this.options.height) {
                this.options.height = value;
            }
            
            this.trigger('sizeChange', value);
        },

        updateSize: function (options) {
            var size = options.width || options.height,
                value = size ? size : 'Variable';

            if(options.width || options.height) {
                this.options[ options.width ? 'width' : 'height' ] = size;
                this.options.htmlText = size;
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
        }

    });

});
