define([
    'views/View',
    'backbone',
    'jquery',
    'lodash'
], function (View, Backbone, $, _) {
    
    return View.extend({

        tagName: "div",
        
        template: _.template($('#dashboard-template').html()),
        
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
        
    });

});