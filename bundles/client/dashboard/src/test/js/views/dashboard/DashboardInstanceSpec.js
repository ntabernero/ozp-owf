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

define(['views/dashboard/DashboardInstance',
        'models/DashboardModel',
        'models/WidgetStateModel',
        'jquery'],
function(DashboardInstance, DashboardModel, WidgetStateModel, $) {
    describe('DashboardInstanceSpec', function() {
        var dashboard,
        widget1 = {
            title: 'Widget One',
            id: '1',
            url: 'widget.html',
            x: 50,
            y: 50,
            width: 400,
            height: 500,
            zIndex: 10000,
            maximizable: true,
            minimizable: true,
            closable: true
        },
        widget2 = {
            title: 'Widget Two',
            id: '2',
            url: 'widget.html',
            x: 400,
            y: 300,
            width: 200,
            height: 200,
            zIndex: 10000,
            maximizable: true,
            minimizable: true,
            closable: true
        },
        dashboardModel = new DashboardModel({
            name: 'Dashboard 1',
            description: 'Description 1',
            position: 0
        });


        beforeEach(function(done) {
            // Stub test initialization method;  And any custom pre-test elements here.
            done();
        });
    
        it('Test base View.  Verify that it has a show and hide method.', function () {
            var dashboardInstance = new DashboardInstance({model: dashboardModel});

            expect(dashboardInstance).to.be.an('object');
            expect(dashboardInstance.render).to.be.a('function');
            expect(dashboardInstance.show).to.be.a('function');
            expect(dashboardInstance.hide).to.be.a('function');
        });

        it('renders a floating widget in response to add', function() {
            var dashboardInstance = new DashboardInstance({model: dashboardModel});
            dashboardInstance.render();

            dashboardInstance.addFloatingWidget(new WidgetStateModel({model: widget1}));
            expect(dashboardInstance.$el.find('div.window').length).to.equal(1);

            dashboardInstance.addFloatingWidget(new WidgetStateModel({model: widget2}));
            expect(dashboardInstance.$el.find('div.window').length).to.equal(2);
        });

        it('renders a floating widgets from dashboard configuration', function() {

            var dashboardModel1 = new DashboardModel({
                name: 'Dashboard 1',
                description: 'Description 1',
                position: 0,
                floatingWidgets:[widget1, widget2]
            });

            var dashboardInstance = new DashboardInstance({model: dashboardModel1});
            dashboardInstance.render();
            expect(dashboardInstance.$el.find('div.window').length).to.equal(2);
        });

        it('renders a floating widget when it is added to the collection', function() {
            var dashboardInstance = new DashboardInstance({model: dashboardModel});
            dashboardInstance.render();

            dashboardInstance.floatingWidgets().add(widget1)
            expect(dashboardInstance.$el.find('div.window').length).to.equal(1);
            dashboardInstance.floatingWidgets().add(widget2)
            expect(dashboardInstance.$el.find('div.window').length).to.equal(2);

        });

    });
});
