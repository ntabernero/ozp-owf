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
    'views/panes/AccordionPane',
    'views/widgets/Panel',
    'collections/WidgetStatesCollection'
], function(AccordionPane, Panel, WidgetStatesCollection) {
    describe('AccordionPane', function() {
        var accordionPane, collection,
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
                collapsed: false,
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
                collapsed: false,
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
                collapsed: true,
                closable: true
            },
            // Helper method that does element height setup required to call updateSize, then asserts it worked correctly
            assertUpdateSize = function() {
                // Set the pixel height of the pane
                var paneHeight = 1000;
                accordionPane.$el.height(paneHeight);

                // Get all the widgets in the pane
                var widgets = accordionPane.$el.children('.widget');

                // Set the pixel height of widget headers and top/bottom borders as they are used in updateSize to calculate the height
                var headerHeight = 35,
                    widgetBorderTop = 1,
                    widgetBorderBottom = 1;
                widgets.children('.header').height(headerHeight);
                widgets.css({
                    "border-style": "solid", // Must be specified for IE
                    "border-top-width": widgetBorderTop, 
                    "border-bottom-width": widgetBorderBottom
                });

                accordionPane.updateSize();
                
                // Ensure the pane height was set appropriately
                expect(accordionPane.$el.height()).to.equal(paneHeight);

                // Calculate the variables necessary to determine the appropriate height % for expanded widgets
                var borderPct = 100 * (((widgetBorderTop + widgetBorderBottom) * collection.length) / paneHeight);

                var collapsedWidgets = 0, expandedWidgets = 0;
                collection.each(function(widget) {
                    widget.get('collapsed') ? collapsedWidgets++ : expandedWidgets++;
                });

                var collapsedPct = parseFloat((100 * ((headerHeight * collapsedWidgets) / paneHeight)).toPrecision(12));

                // Ensure widgets heights are set to equal % divisions of paneHeight
                // after widget borders and collapsed widgets %'s are removed
                expect(accordionPane.$el.children('.widget').height()).to.equal((100 - borderPct - collapsedPct) / expandedWidgets);
            };

        beforeEach(function(done) {
            collection = new WidgetStatesCollection([widget1, widget2]);

            accordionPane = new AccordionPane({
                widgets: collection
            }).render();

            done();
        });

        afterEach(function(done) {
            collection = null;
            accordionPane.remove();
            accordionPane = null;

            done();
        });

        it('renders a widget Panel for each widget in the collection', function() {
            collection.add(widget3);

            var panels = accordionPane.$('.widget'),
                views = _.map(panels, function(panel) {
                    return $(panel).data('view');
                }),
                isPanel = _.map(views, function(view) {
                    return view instanceof Panel;
                });
            
            expect(views.length).to.equal(3);
            expect(isPanel).to.not.contain(false);
        });

        it('renders already collapsed widgets as collapsed', function() {
            collection.add(widget3);

            var collapsedWidgets = accordionPane.$('.widget.collapsed');
            
            expect(collapsedWidgets.length).to.equal(1);
        });

        it('updates the percentage height of 2 expanded widgets appropriately', function() {
            assertUpdateSize();
        });

        it('updates the percentage height of 1 collapsed and 2 expanded widgets appropriately', function() {
            collection.add(widget3);
            assertUpdateSize();
        });
    });
});
