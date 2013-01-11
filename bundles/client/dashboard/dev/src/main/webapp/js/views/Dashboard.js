define([
    'backbone'
], function (Backbone) {

    return Backbone.View.extend({

        render: function() {
            this.$el.html('This is a dashboard.');
            return this;
        }
        
    });

});