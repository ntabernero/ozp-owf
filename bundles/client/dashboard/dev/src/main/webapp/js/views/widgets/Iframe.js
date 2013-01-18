define([
    'backbone'
], function (Backbone) {
    
    'use strict';

    return Backbone.View.extend({

        model: null,

        attributes: function() {
            var model = this.model;

            return {
                'frameborder' : 0,
                'src': 'about:blank' /* model.get('url') +';' */,
                // id: ...
                // name: ...,
                'role': 'presentation'
            };
        },
        
    });

});