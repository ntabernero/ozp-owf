define([
    'views/widgets/Header',
    'views/widgets/Iframe',

    'backbone'
], function (Header, Iframe, Backbone) {
    
    'use strict';

    return Backbone.View.extend({

        model: null,
        className: 'widget panel',
        events: {
            'dblclick' : 'toggleCollapse',
            'click .collapse-btn' : 'toggleCollapse',
            'click .expand-btn' : 'toggleCollapse',
            'click .close-btn' : 'close'
        },

        initialize: function () {
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

        close: function (evt) {
            evt.stopPropagation();

            this.$body = null;
            this.remove();
        },

        toggleCollapse: function () {
            evt.stopPropagation();

            if(this.isCollapsed === true)
                this.$body.slideDown();
            else
                this.$body.slideUp();
            
            this.isCollapsed = !this.isCollapsed;
        },

        getBox: function () {
            var $el = this.$el;

            return {
                width: $el.width(),
                height: $el.height(),
                top: $el.css('top'),
                left: $el.css('left')
            };
        }
        
    });

});