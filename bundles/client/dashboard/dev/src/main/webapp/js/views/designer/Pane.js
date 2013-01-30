define([
    'views/View',
    'jquery',
    'lodash'
], function (View, $, _) {

    'use strict';

    return View.extend({

        className: 'pane',

        paneType: null,
        htmlText: null,

        attributes: {
            tabindex: 0
        },

        events: {
            'dblclick': 'beginEdit'
        },

        initialize: function () {
            View.prototype.initialize.apply(this, arguments);
        },

        render: function () {
            this.$el.data('view', this);
            this.$el.append( '<h3>' + _.escape(this.options.htmlText) + '</h3>' );
            return this;
        },

        nest: function (box, options) {
            this.$el.empty().append( box.render().el );
            this.options.box = options;
            return this;
        },

        beginEdit: function (evt) {
            evt.stopPropagation();

            // create editor and hook keyup events
        },

        editComplete: function () {

        }

    });

});
