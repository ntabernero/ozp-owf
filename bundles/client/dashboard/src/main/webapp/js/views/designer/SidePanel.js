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
    'views/View',
    'backbone',
    'lodash',
    'handlebars'
], function (View, Backbone, _, Handlebars) {

    'use strict';

    var boxTpl =    '<ul class="unstyled">' +
                        '<li data-ruletype="vertical" tabindex="0">' +
                            '<img src="themes/common/images/dashboard-designer/hbox.png"></img>'+
                        '</li>' +
                        '<li data-ruletype="horizontal" tabindex="0">' +
                            '<img src="themes/common/images/dashboard-designer/vbox.png"></img>'+
                        '</li>' +
                    '</ul>';

    var paneTypes = [
        {
            paneType:'accordionpane',
            displayName: 'Accordion',
            image: 'themes/common/images/dashboard-designer/accordion.png'
        },
        {
            paneType:'desktoppane',
            displayName: 'Desktop',
            image: 'themes/common/images/dashboard-designer/desktop.png'
        },
        {
            paneType:'portalpane',
            displayName: 'Portal',
            image: 'themes/common/images/dashboard-designer/portal.png'
        },
        {
            paneType:'tabbedpane',
            displayName: 'Tabbed',
            image: 'themes/common/images/dashboard-designer/tabbed.png'
        },
        {
            paneType:'fitpane',
            displayName: 'Fit',
            image: 'themes/common/images/dashboard-designer/fit.png'
        }
    ];

    var paneTypeTpl =   '<li data-panetype="{{paneType}}" tabindex="0">' +
                            '<img src="{{image}}"></img>' +
                        '</li>';

    return View.extend({

        className: 'side-panel',

        paneTypeTpl: Handlebars.compile( paneTypeTpl ),

        render: function () {
            var me = this,
                paneTypesMarkup = '<ul class="unstyled paneTypes">';

            _.each(paneTypes, function (paneType) {
                paneTypesMarkup += me.paneTypeTpl(paneType);
            });

            me.$el.append(boxTpl + paneTypesMarkup + '</ul>');
            return me;
        }

    });

});
