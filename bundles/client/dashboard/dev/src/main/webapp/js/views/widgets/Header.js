define([
    'backbone',
    'handlebars'
], function (Backbone, Handlebars) {
    
    'use strict';

    var tpl =
        '<span class="title">{{title}}</span>' +
        '<ul class="actions nav">' +
            '{{#if collapsible}}' +
                '<li {{#if collapsed}} style="display:none" {{/if}}>' +
                    '<a title="Collapse" class="collapse-btn">' +
                        '<i class="icon-chevron-up"></i>' +
                    '</a>' +
                '</li>' +
                '<li {{#unless collapsed}} style="display:none" {{/unless}}>' +
                    '<a title="Expand" class="expand-btn">' +
                        '<i class="icon-chevron-down"></i>' +
                    '</a>' +
                '</li>' +
            '{{/if}}' +
            '{{#if minimizable}}' +
                '<li>' +
                    '<a title="Minimize" class="minimize-btn">' +
                        '<i class="icon-minus"></i>' +
                    '</a>' +
                '</li>' +
            '{{/if}}' +
            '{{#if maximizable}}' +
                '<li {{#if maximized}} style="display:none" {{/if}}>' +
                    '<a title="Maximize" class="maximize-btn">' +
                        '<i class="icon-resize-full"></i>' +
                    '</a>' +
                '</li>' +
                '<li {{#unless maximized}} style="display:none" {{/unless}}>' +
                    '<a title="Restore" class="restore-btn">' +
                        '<i class="icon-resize-small"></i>' +
                    '</a>' +
                '</li>' +
            '{{/if}}' +
            '{{#if closable}}' +
                '<li class="close-li">' +
                    '<a title="Close" class="close-btn">' +
                        '<i class="icon-remove"></i>' +
                    '</a>' +
                '</li>' +
            '{{/if}}' +
        '</ul>';

    return Backbone.View.extend({

        model: null,
        className: 'header',
        template: Handlebars.compile(tpl),

        render: function() {
            this.$el.html( this.template(this.model.toJSON()) );
            return this;
        }

    });

});