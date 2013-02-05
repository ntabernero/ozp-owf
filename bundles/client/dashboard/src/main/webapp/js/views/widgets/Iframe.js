define([
    'views/View'
], function (View) {
    
    'use strict';

    return View.extend({

        model: null,
        tagName: 'iframe',

        className: 'widgetframe',

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
