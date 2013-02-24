/*
 * Copyright 2013 Next Century Corporation 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
                _.each( layoutConfig.panes, function( config ) {
                    me.convertForDashboard( config );
                });
            }
            else {
                layoutConfig.vtype = layoutConfig.paneType || 'tabbedpane';
            }

            return layoutConfig;
        }

    };

});
