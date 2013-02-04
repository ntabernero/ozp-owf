define([
    'views/widgets/Iframe',
    'backbone'
], function (Iframe, Backbone) {
    
    'use strict';

    return Backbone.View.extend({

        model: null,
        tagName: 'iframe',
        className: 'widget fitwidget',

        render: function () {
            this.iframe = new Iframe({
                model: this.model
            });
            
            this.$el.html( this.iframe.render().el );
            return this;
        },

        close: function() {
            this.remove();
        }

    });

});