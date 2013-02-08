define([
    'views/widgets/Header',
    'handlebars',
    'lodash'
], function(Header, Handlebars, _) {
    'use strict';

    var btnTpl = 
        '<li class="collapse">' +
            '<a title="Collapse" class="collapse-btn">' +
                '<i class="icon-double-angle-up"></i>' +
            '</a>' +
        '</li>' +
        '<li class="expand">' +
            '<a title="Expand" class="expand-btn">' +
                '<i class="icon-double-angle-down"></i>' +
            '</a>' +
        '</li>';

    return Header.extend({

        events: _.extend({
            'click .collapse-btn' : 'collapse',
            'click .expand-btn' : 'expand'
        }, Header.prototype.events),

        btnTemplate: btnTpl,

        createTemplateModel: function() {
            var templateModel = Header.prototype.createTemplateModel.apply(this, arguments);

            templateModel.restorable = templateModel.maximizable || templateModel.minimizable;

            return templateModel;
        },

        collapse: function() {
            this.model.set('collapsed', true);
        },

        expand: function() {
            this.model.set('collapsed', false);
        }
    });
});
