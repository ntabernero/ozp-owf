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
    'collections/WidgetStatesCollection',
    'models/WidgetStateModel'
], function(Taskbar, WidgetStatesCollection, WidgetStateModel) {
    var taskbar, collection,
        widget3 = {
            title: 'Widget Three',
 //           uniqueId: '3',
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
            uniqueId: '1',
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
            uniqueId: '2',
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
            collection: collection
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

        taskbar.$('.header:last-child').click();

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
});
