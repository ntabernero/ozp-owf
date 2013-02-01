define([
    'views/View',
    'handlebars'
], function (View, Handlebars) {
    
    'use strict';

    var tpl =
        '<span class="name">{{name}}</span>' +
        '<ul class="actions nav">' +
            '{{{btnTemplate}}}' +
            '<li class="close-li">' +
                '<a title="Close" class="close-btn">' +
                    '<i class="icon-remove"></i>' +
                '</a>' +
            '</li>' +
        '</ul>';

    return View.extend({

        events: {
            'click .close-btn' : 'close'
        },


        model: null,
        className: 'header',
        template: Handlebars.compile(tpl),
        btnTemplate: '',    //subclasses should override

        render: function() {
            this.$el.html( this.template(this.createTemplateModel()) );
            return this;
        },

        createTemplateModel: function() {
            var templateModel = this.model.toJSON();

            templateModel.btnTemplate = this.btnTemplate;
            
            return templateModel;
        },

        close: function() {
            this.model.destroy();
        }
    });

});
