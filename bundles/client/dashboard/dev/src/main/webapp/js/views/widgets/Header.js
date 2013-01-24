define([
    'views/View',
    'handlebars'
], function (View, Handlebars) {
    
    'use strict';

    var tpl =
        '<span class="title">{{title}}</span>' +
        '<ul class="actions nav">' +
            '{{#if collapsible}}' +
                '<li class="collapse" {{#if collapsed}} style="display:none" {{/if}}>' +
                    '<a title="Collapse" class="collapse-btn">' +
                        '<i class="icon-chevron-up"></i>' +
                    '</a>' +
                '</li>' +
                '<li class="expand" {{#unless collapsed}} style="display:none" {{/unless}}>' +
                    '<a title="Expand" class="expand-btn">' +
                        '<i class="icon-chevron-down"></i>' +
                    '</a>' +
                '</li>' +
            '{{/if}}' +
            '{{#if minimizable}}' +
                '<li class="minimize">' +
                    '<a title="Minimize" class="minimize-btn">' +
                        '<i class="icon-minus"></i>' +
                    '</a>' +
                '</li>' +
            '{{/if}}' +
            '{{#if maximizable}}' +
                '<li class="maximize">' +
                    '<a title="Maximize" class="maximize-btn">' +
                        '<i class="icon-resize-full"></i>' +
                    '</a>' +
                '</li>' +
            '{{/if}}' + 
            '{{#if restorable}}' +
                '<li class="restore">' +
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

    return View.extend({

        events: {
            'click .minimize-btn' : 'minimize',
            'click .maximize-btn' : 'maximize',
            'click .restore-btn' : 'restore',
            'click .collapse-btn' : 'collapse',
            'click .expand-btn' : 'expand',
            'click .close-btn' : 'close'
        },


        model: null,
        className: 'header',
        template: Handlebars.compile(tpl),

        render: function() {
            var templateModel = this.model.toJSON();

            templateModel.restorable = templateModel.maximizable || templateModel.minimizable;

            this.$el.html( this.template(templateModel) );

            this.maximizeBtn = this.$('.maximize-btn');
            this.minimizeBtn = this.$('.minimize-btn');
            this.restoreBtn = this.$('.restore-btn');

            return this;
        },

        minimize: function() {
            this.model.set('minimized', true);
            this.model.set('maximized', false);
        },

        restore: function() {
            this.model.set('minimized', false);
            this.model.set('maximized', false);
        },

        maximize: function() {
            this.model.set('minimized', false);
            this.model.set('maximized', true);
        },

        collapse: function() {
            this.model.set('collapsed', true);
        },

        expand: function() {
            this.model.set('collapsed', false);
        },

        close: function() {
            this.model.destroy();
        }
    });

});
