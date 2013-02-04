define([
    'backbone'
], function (Backbone) {
    
    'use strict';

    return Backbone.View.extend({

        model: null,
        tagName: 'iframe',

        attributes: function() {
            var model = this.model;

            return {
                'frameborder' : 0,
                'src': model.get('url'),
                // id: ...
                // name: ...,
                'role': 'presentation'
            };
        }
        
    });

});