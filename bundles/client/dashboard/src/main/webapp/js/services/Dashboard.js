define([
    'lodash'
], function (_) {

    'use strict';

    return {

        upgradeLayoutConfig: function (layoutConfig) {

        },

        convertForDesigner: function (layoutConfig) {
            var me = this;

            if(layoutConfig.box) {
                layoutConfig.vtype = 'designerpane';
                me.convertForDashboard( layoutConfig.box );
            }
            else if(layoutConfig.panes) {
                layoutConfig.vtype = 'designerbox';
                _.each( layoutConfig.panes, function( config ) {
                    me.convertForDashboard( config );
                });
            }
            else {
                layoutConfig.vtype = 'designerpane';
            }

            return layoutConfig;
        },

        convertForDashboard: function (layoutConfig) {
            var me = this;

            if(layoutConfig.xtype) {
                console.log('need to upgrade layout config......');
            }

            if(layoutConfig.box) {
                layoutConfig.vtype = 'boxpane';
                me.convertForDashboard( layoutConfig.box );
            }
            else if(layoutConfig.panes) {
                layoutConfig.vtype = 'box';
                _.each( layoutConfig.panes, function( config ) {
                    me.convertForDashboard( config );
                });
            }
            else {
                layoutConfig.vtype = layoutConfig.paneType || 'pane';
            }

            return layoutConfig;
        }

    };

});
