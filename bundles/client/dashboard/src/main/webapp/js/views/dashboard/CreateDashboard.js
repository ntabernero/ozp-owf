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

/*jshint bitwise:false*/
define([
    'models/DashboardInstanceModel',
    'views/dashboard/EditDashboard',

    // Libraries.
    'jquery',
    'lodash',
    'handlebars',
    'bootstrap/bootstrap-modal'
],

function(DashboardModel, EditDashboard, $, _, Handlebars) {

    // TODO move this out of there
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    function guid () {
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    var createFromExistingTpl = Handlebars.compile(
                                    '<div class="control-group create-from-existing">' + 
                                        '<label class="control-label checkbox" for="description">' +
                                            '<input type="checkbox" value="">' + '<span>Create From Existing</span></label>' + 
                                        '<div class="controls">' + 
                                            '<select disabled>' +
                                            '{{#each models}}' +
                                                '<option value="{{id}}">{{name}}</option>' +
                                            '{{/each}}' +
                                            '</select>' + 
                                        '</div>' + 
                                    '</div>'
                                );
    var importTpl = '<div class="control-group import">' + 
                        '<label class="control-label checkbox" for="description">' +
                            '<input type="checkbox" value="">' + '<span>Import</span></label>' + 
                        '<div class="controls">' + 
                            '<input type="file">' + 
                        '</div>' + 
                    '</div>';

    return EditDashboard.extend({

        id: 'create-dashboard-window',

        // dashboard instances collection
        dashboards: null,

        events: _.extend({}, EditDashboard.prototype.events, {
            'click .create-from-existing label': 'toggleCreateFromExisting',
            'click .import label': 'toggleImport'
        }),

        initialize: function () {
            this.model = new DashboardModel();
            EditDashboard.prototype.initialize.apply(this, arguments);
        },

        render: function () {
            EditDashboard.prototype.render.apply(this, arguments);

            this._$existingDashboards = $(createFromExistingTpl(this.options.dashboards));
            this._$existingDashboardsCheckbox = this._$existingDashboards.find('input');
            this._$existingDashboardsDropDown = this._$existingDashboards.find('select').select2({
                                                    width: '100%',
                                                    placeholder: "Select a Dashboard"
                                                });

            this._$importFromFile = $(importTpl);
            this._$importFromFileCheckbox = this._$importFromFile.find('input');

            this.$body.children('form')
                .append(this._$existingDashboards)
                .append(this._$importFromFile);

            return this;
        },

        ok: function (evt) {
            var dashboardId, dashboard;

            // is creating from existing dashboard
            if(this._$existingDashboardsCheckbox.attr('checked')) {
                dashboardId = this._$existingDashboardsDropDown.select2('val'),
                dashboard = this.dashboards.get(dashboardId);

                this.model.set({
                    layoutConfig: dashboard.get('layoutConfig')
                });
            }
            // is importing a dashboard
            else if(this._$importFromFileCheckbox.attr('checked')) {
                this.model.set({});
            }

            EditDashboard.prototype.ok.apply(this, arguments);
        },

        create: function () {
            this.show();
            this._deferred = $.Deferred();
            return this._deferred.promise();
        },

        disableCreateFromExisting: function () {
            this._$existingDashboardsCheckbox.attr('checked', false);
            this._$existingDashboardsDropDown.select2('disable');
        },

        toggleCreateFromExisting: function (evt) {
            var checked;

            this.disableImport();

            checked = this._$existingDashboardsCheckbox.attr('checked');

            // manually check checkbox if clicked on text
            if(evt.target.nodeName !== 'INPUT') {
                this._$existingDashboardsCheckbox.attr('checked', !checked);
            }

            this._$existingDashboardsDropDown.select2(checked ? 'disable' : 'enable');
        },

        disableImport: function () {
            this._$importFromFileCheckbox.attr('checked', false);
        },

        toggleImport: function (evt) {
            var checked;

            this.disableCreateFromExisting();

            checked = this._$importFromFileCheckbox.attr('checked');

            // manually check checkbox if clicked on text
            if(evt.target.nodeName !== 'INPUT') {
                this._$importFromFileCheckbox.attr('checked', !checked);
            }
        },

        remove: function () {
            this._$existingDashboardsDropDown.select2("destroy");
            EditDashboard.prototype.remove.apply(this, arguments);
        }
    });
});
