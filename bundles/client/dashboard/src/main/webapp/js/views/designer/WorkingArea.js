define([
    'views/View',
    'views/designer/Box',
    'jquery',
    'lodash',
    'bootstrap-editable'
], function (View, Box, $, _) {

    'use strict';

    return View.extend({
        vtype: 'workingArea',

        id: 'designer',
        className: 'working-area',

        viewOptions: function () {
            var layoutConfig = this.model.get('layoutConfig');

            if(!layoutConfig) {
                layoutConfig = {
                    vtype: 'pane',
                    paneType: 'tabbed',
                    htmlText: '100%'
                };
                this.model.set('layoutConfig', layoutConfig);
            }
            return layoutConfig;
        },

        views: function() {
            return this.viewOptions();
        },

        initialize: function () {
            this.layoutConfig = this.viewOptions();

            this.$el.data( 'layoutConfig', this.layoutConfig );
            View.prototype.initialize.apply( this, arguments );
        },

        getLayoutConfig: function () {
            return this.layoutConfig;
        },

        reset: function () {
            var pane = this.views[0];
            var box = pane && pane.views[0];

            // remove sub view if found
            if( box ) {
                pane.removeView(box);
                delete this.layoutConfig.box;
            }
            // fall back to DOM retrieval
            else {
                pane = this.$el.find('.pane').data('view');
                box = pane && pane.$el.find('.box');
                box.remove();
            }
        }
    });

});
