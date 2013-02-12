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
    'views/panes/PortalPane',
    'views/widgets/Panel',
    'collections/WidgetStatesCollection'
], function(PortalPane, Panel, WidgetStatesCollection) {
    describe('PortalPane', function() {
        var portalPane, collection,
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
            widget3 = {
                title: 'Widget Three',
                id: '3',
                url: 'widget.html',
                x: 50,
                y: 50,
                width: 400,
                height: 500,
                zIndex: 10000,
                maximizable: true,
                minimizable: true,
                closable: true
            };

        beforeEach(function(done) {
            collection = new WidgetStatesCollection([widget1, widget2]);

            portalPane = new PortalPane({
                collection: collection
            }).render();

            done();
        });

        afterEach(function(done) {
            collection = null;
            portalPane.remove();
            portalPane = null;

            done();
        });

        it('does not record changes in the widgets horizontal size', function() {
            var view = portalPane.$('.widget').data('view');

            sinon.spy(view.model, 'set');

            view.onResize({}, {
                size: {width: 1000, height: 1000}
            });

            expect(view.model.set.calledWith('height', 1000)).to.be.ok();
            expect(view.model.set.calledWith('width')).to.not.be.ok();
        });

//TODO: fix this test
//This test works for some people, but fails on jenkins and
//actually crashes testacular for other people.  
//        it('scrolls if its contents are too large', function() {
//            $('body').append(portalPane.$el);
//
//            portalPane.$el.css('height', 200);
//
//            expect(portalPane.$el.outerHeight()).to.be.lessThan(portalPane.$el[0].scrollHeight);
//        });
    });
});
