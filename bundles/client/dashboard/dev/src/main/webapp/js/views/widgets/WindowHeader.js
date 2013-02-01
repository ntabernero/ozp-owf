define([
    'views/widgets/Header',
    'handlebars',
    'lodash'
], function(Header, Handlebars, _) {
    'use strict';

    var btnTpl = 
        '<li class="minimize">' +
            '<a title="Minimize" class="minimize-btn">' +
                '<i class="icon-minus"></i>' +
            '</a>' +
        '</li>' +
        '<li class="maximize">' +
            '<a title="Maximize" class="maximize-btn">' +
                '<i class="icon-resize-full"></i>' +
            '</a>' +
        '</li>' +
        '<li class="restore">' +
            '<a title="Restore" class="restore-btn">' +
                '<i class="icon-resize-small"></i>' +
            '</a>' +
        '</li>';

    return Header.extend({
        events: _.extend({
            'click .minimize-btn' : 'minimize',
            'click .maximize-btn' : 'maximize',
            'click .restore-btn' : 'restore'
        }, Header.prototype.events),

        btnTemplate: btnTpl,

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
        }

    });
});
