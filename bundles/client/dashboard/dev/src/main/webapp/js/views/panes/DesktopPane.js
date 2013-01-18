define([
    'views/panes/Pane',
    'views/widgets/Window',

    'backbone'
], function (Pane, WidgetWindow, Backbone) {
    
    'use strict';

    return Pane.extend({

        model: null,

        className: 'pane desktoppane',

        render: function () {
            var me = this;
            console.time('pane');
            this.constructor.__super__.render.call(this);

            this.widgets.each(function (widgetState) {
                
                console.time('widget');
            
                var ww = new WidgetWindow({
                    model: widgetState,
                    containment: me.$el
                });
                me.$el.append( ww.render().$el );

                console.timeEnd('widget');

            });
            console.timeEnd('pane');
            return this;
        },

        launchWidget: function (evt, model) {
            var ww = new WidgetWindow({
                model: model,
                containment: this.$el
            });
            this.$el.append( ww.render().$el );
            return ww;
        }
        
    });

});