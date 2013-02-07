define([
    'views/View',
    'views/widgets/PanelHeader',
    'views/widgets/Iframe',
    'mixins/widgets/WidgetControl',
    'jquery',
    'lodash',
    'backbone'
], function (View, PanelHeader, Iframe, WidgetControl, $, _, Backbone) {
    
    'use strict';

    return View.extend(_.extend({}, WidgetControl, {

        model: null,
        className: 'widget panel',

        headerClass: PanelHeader,    //subclassses can override to get different headers

        initialize: function () {
            View.prototype.initialize.apply(this, arguments);
            WidgetControl.initialize.apply(this, arguments);

            this.containment = this.options.containment || $(document.body);

        },

        render: function() {
            this.header = new this.headerClass({ model: this.model });
            this.iframe = new Iframe({ model: this.model });

            this.$body = $('<div class="body"></div>')
                            .html( this.iframe.render().el );

            this.$el
                .append( this.header.render().el )
                .append( this.$body );

            return this;
        }

//        getBox: function () {
//            var $el = this.$el;
//
//            return {
//                width: $el.width(),
//                height: $el.height(),
//                top: $el.css('top'),
//                left: $el.css('left')
//            };
//        }
    }));

});
