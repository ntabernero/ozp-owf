define([
    'views/panes/Pane',
    'views/widgets/Iframe',
    'mixins/widgets/WidgetControl',
    'lodash',
    'backbone'
], function (Pane, Iframe, WidgetControl, _, Backbone) {
    
    'use strict';

    var FitPaneIframe = Iframe.extend(_.extend({}, WidgetControl, {
        initialize: function() {
            Iframe.prototype.initialize.apply(this, arguments);
            WidgetControl.initialize.apply(this, arguments);
        }
    }));

    return Pane.extend({
        className: 'pane fitpane',

        initialize: function() {
            Pane.prototype.initialize.apply(this, arguments);

            if (this.collection.length > 1) {
                throw "Fit Panes cannot contain more than one widget";
            }
        },

        render: function() {
            Pane.prototype.render.apply(this, arguments);
            this.addWidget();
            return this;
        },

        addWidget: function() {
            if (this.collection.length > 1) {
                throw "Fit Panes cannot contain more than one widget";
            }
            else if (this.collection.length === 1) {
                this.$el.append(
                    new FitPaneIframe({
                        model: this.collection.at(0)
                    }).render().$el
                );
            }
        }
    });

});
