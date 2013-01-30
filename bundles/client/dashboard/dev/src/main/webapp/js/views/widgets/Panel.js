define([
    'views/View',
    'views/widgets/Header',
    'views/widgets/Iframe',
    'mixins/widgets/WidgetControl',
    'jquery',
    'lodash',
    'backbone'
], function (View, Header, Iframe, WidgetControl, $, _, Backbone) {
    
    'use strict';

    return View.extend(_.extend({}, WidgetControl, {

        model: null,
        className: 'widget panel',

        initialize: function () {
            View.prototype.initialize.apply(this, arguments);
            WidgetControl.initialize.apply(this, arguments);

            this.containment = this.options.containment || ( this.containment = $(document.body) );

        },

        render: function() {
            this.header = new Header({ model: this.model });
            this.iframe = new Iframe({ model: this.model });

            this.$body = $('<div class="body"></div>')
                            .html( this.iframe.render().el );

            this.$el
                .append( this.header.render().el )
                .append( this.$body );

            return this;
        },

//        close: function (evt) {
//            evt.stopPropagation();
//
//            this.$body = null;
//            this.remove();
//
//            this.model.destroy();
//        },

//        toggleCollapse: function (evt) {
//            evt.stopPropagation();
//
//            if(this.isCollapsed === true)
//                this.$body.slideDown();
//            else
//                this.$body.slideUp();
//            
//            this.isCollapsed = !this.isCollapsed;
//        },

        getBox: function () {
            var $el = this.$el;

            return {
                width: $el.width(),
                height: $el.height(),
                top: $el.css('top'),
                left: $el.css('left')
            };
        }
    }));

});
