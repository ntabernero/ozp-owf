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
    'views/Taskbar',
    'views/widgets/Header',
    'collections/WidgetStatesCollection',
    'models/WidgetStateModel'
], function(Taskbar, Header, WidgetStatesCollection, WidgetStateModel) {
    describe('Taskbar', function() {
        var taskbar, collection,
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
            collection = new WidgetStatesCollection([{
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
            }, {
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
            }]);

            taskbar = new Taskbar({
                collection: collection,
                HeaderClass: Header
            }).render();

            done();
        });

        afterEach(function(done) {
            collection = null;
            taskbar.remove();

            done();
        });

        it('has a header for each widget in the collection', function() {
            collection.add(widget3);

            expect(taskbar.$el.children().length).to.equal(3);
            expect(taskbar.collection.length).to.equal(3);
        });

        it('removes the header for a destroyed widget', function() {
            var model = new WidgetStateModel(widget3);
            collection.add(model);
            model.destroy();

            expect(taskbar.$el.children().length).to.equal(2);
            expect(taskbar.collection.length).to.equal(2);
        });

        it('activates a widget when its header is clicked', function() {
            var model = new WidgetStateModel(widget3);
            collection.add(model);

            taskbar.$('.header:last-child').trigger('mousedown');
            taskbar.$('.header:last-child').trigger('mouseup');

            expect(model.get('active')).to.be(true);
            expect(taskbar.$('.header:last-child').hasClass('active')).to.be.ok();
        });

        it('responds to widget minimize', function() {
            var model = new WidgetStateModel(widget3);
            collection.add(model);

            model.set('minimized', true);

            expect(taskbar.$('.header:last-child').hasClass('minimized')).to.be.ok();
        });

        it('responds to widget maximize', function() {
            var model = new WidgetStateModel(widget3);
            collection.add(model);

            model.set('maximized', true);

            expect(taskbar.$('.header:last-child').hasClass('maximized')).to.be.ok();
        });

        it('shrinks headers to fit within available width', function() {
            var contentWidth = 0;

            $(document.body).append(taskbar.$el);
            taskbar.$el.width(200);
            taskbar.updateSize();

            expect(taskbar.$el.width()).to.equal(200);

            taskbar.$el.children().each(function(idx, header) {
                contentWidth += $(header).outerWidth(true);
            });

            expect(taskbar.$el.width()).to.equal(contentWidth);
        });

        it('uses the provided Header constructor to create headers', function() {
            var fn = sinon.spy();

            var MyHeader = Header.extend({
                initialize: function() {
                    Header.prototype.initialize.apply(this, arguments);
                    fn();
                }
            });

            var taskbar = new Taskbar({
                collection: collection,
                HeaderClass: MyHeader
            }).render();

            expect(fn.called).to.be.ok();
        });
    });
});
