define([
    'backbone'
], function (Backbone) {
    
    'use strict';

    return Backbone.View.extend({

        model: null,
        tagName: 'iframe',
        className: 'widget fitwidget',

        attributes: function() {
            var model = this.model;
            return {
                'frameborder' : 0,
                'src': 'about:blank' //model.get('url') +';'
            };
        },

        close: function() {
            this.remove();
        }

    });

});