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
    'views/DashboardContainer',
    'views/dashboard/DashboardInstance',
    'collections/PersonalWidgetDefinitionsCollection',
    'collections/DashboardInstancesCollection'

], function (DashboardContainer, DashboardInstance, PersonalWidgetDefinitionsCollection, DashboardInstancesCollection) {
    describe('DashboardContainer', function () {

        var dashboardContainer = null;
        var personalWidgetDefinitionsCollection = null;
        var dashboardInstancesCollection = null;

        beforeEach(function (done) {
            // create a collection of dashboards from initial data
            personalWidgetDefinitionsCollection = new PersonalWidgetDefinitionsCollection(initialWidgetDefinitions);

            // create a collection of dashboards from initial data
            dashboardInstancesCollection = new DashboardInstancesCollection(initialDashboards);

            dashboardContainer = new DashboardContainer({
                personalWidgetDefinitionsCollection: personalWidgetDefinitionsCollection,
                dashboardInstancesCollection: dashboardInstancesCollection
            });

            // Stub test initialization method;  And any custom pre-test elements here.
            done();
        });

        it('creates an object and has backbone view functions', function () {
            expect(dashboardContainer).to.be.an('object');
            //since dashboardcontainer is a backbone view it should define a render function
            expect(dashboardContainer.render).to.be.a('function');
        });

        it('should default render the first dashboard', function () {
            var dashboardModel = dashboardInstancesCollection.at(0);
            var id = dashboardModel.get('id');

            dashboardContainer.render();

            expect(document.title).to.be(dashboardModel.get('name'));
            expect(dashboardContainer.activatedDashboards[ id ]).to.not.be.eql(null);
            expect(dashboardContainer.activatedDashboards[ id ]).to.be.a(DashboardInstance);
            expect(dashboardContainer.activatedDashboards[ id ]).to.equal(dashboardContainer.activeDashboard);
        });

        it('should default activate the first dashboard', function () {
            var dashboardModel = dashboardInstancesCollection.at(0);
            var id = dashboardModel.get('id');

            dashboardContainer.activateDashboard();

            expect(document.title).to.be(dashboardModel.get('name'));
            expect(dashboardContainer.activatedDashboards[ id ]).to.not.be.eql(null);
            expect(dashboardContainer.activatedDashboards[ id ]).to.be.a(DashboardInstance);
            expect(dashboardContainer.activatedDashboards[ id ]).to.equal(dashboardContainer.activeDashboard);
        });

        it('should activate a specified dashboard', function () {
            var dashboardModel = dashboardInstancesCollection.at(1);
            var id = dashboardModel.get('id');

            dashboardContainer.activateDashboard(dashboardModel);

            expect(document.title).to.be(dashboardModel.get('name'));
            expect(dashboardContainer.activatedDashboards[ id ]).to.not.be.eql(null);
            expect(dashboardContainer.activatedDashboards[ id ]).to.be.a(DashboardInstance);
            expect(dashboardContainer.activatedDashboards[ id ]).to.equal(dashboardContainer.activeDashboard);
        });

        it('should activate multiple dashboards in sequence', function () {
            var dashboardModel = null;
            var id = null;

            //loop throw 3 dashboards twice this switches dashboards while they are not all rendered and while they are
            for (var i = 0; i < 6; i++) {
                //activate dashboard
                dashboardModel = dashboardInstancesCollection.at(i % 3);
                id = dashboardModel.get('id');

                dashboardContainer.activateDashboard(dashboardModel);

                expect(document.title).to.be(dashboardModel.get('name'));
                expect(dashboardContainer.activatedDashboards[ id ]).to.not.be.eql(null);
                expect(dashboardContainer.activatedDashboards[ id ]).to.be.a(DashboardInstance);
                expect(dashboardContainer.activatedDashboards[ id ]).to.equal(dashboardContainer.activeDashboard);
            }

        });
    });
});
