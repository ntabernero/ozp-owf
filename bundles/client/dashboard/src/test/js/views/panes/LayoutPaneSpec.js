define([
    'views/panes/LayoutPane',
    'collections/WidgetStatesCollection'
], function(LayoutPane, WidgetStatesCollection) {
    'use strict'; 

    describe('LayoutPane', function() {
        var pane, collection,
            widget1 = {
                title: 'Widget One',
                id: '1',
                url: 'widget.html',
                x: 50,
                y: 50,
                width: 400,
                height: 500,
                zIndex: 10000
            },
            widget2 = {
                title: 'Widget Two',
                id: '2',
                url: 'widget.html',
                x: 400,
                y: 300,
                width: 200,
                height: 200,
                zIndex: 10000
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
                active: true
            },
            MyPane;

        beforeEach(function(done) {
            collection = new WidgetStatesCollection([widget1, widget2]);

            //custom subclass that allows us to track addWidget calls
            MyPane = LayoutPane.extend({
                addWidget: sinon.spy(LayoutPane.prototype, 'addWidget')  
            });


            pane = new MyPane({
                widgets: collection
            }).render();

            done();
        });

        afterEach(function(done) {
            collection = null;
            pane.remove();
            pane = null;

            LayoutPane.prototype.addWidget.restore();
            done();
        });

        it('calls addWidget when a new model is added to the collection', function() {
            var oldCallCount = pane.addWidget.callCount;

            collection.add(widget3);

            expect(pane.addWidget.callCount).to.equal(oldCallCount + 1);
        });

        it('activates the first widget if not widget is active when initialized', function() {
            expect(pane.collection.at(0).get('active')).to.be(true);
            expect(pane.collection.at(1).get('active')).to.be(false);
        });

        it('does not change which widget is active when the initial colleciton includes an active widget', function() {

            var pane2 = new MyPane({
                widgets: [widget1, widget3] //widget3 has the active flag set
            });

            expect(pane2.collection.at(0).get('active')).to.be(false);
            expect(pane2.collection.at(1).get('active')).to.be(true);

            pane2.remove();
        });

        it('deactivates other widgets when a widget is activated', function() {
            collection.add(widget3);

            collection.at(0).set('active', true);
            expect(collection.where({active: true}).length).to.equal(1);
            expect(collection.where({active: true})[0].get('title')).to.equal('Widget One');

            collection.at(1).set('active', true);
            expect(collection.where({active: true}).length).to.equal(1);
            expect(collection.where({active: true})[0].get('title')).to.equal('Widget Two');

            collection.at(2).set('active', true);
            expect(collection.where({active: true}).length).to.equal(1);
            expect(collection.where({active: true})[0].get('title')).to.equal('Widget Three');

            collection.at(0).set('active', true);
            expect(collection.where({active: true}).length).to.equal(1);
            expect(collection.where({active: true})[0].get('title')).to.equal('Widget One');

            collection.at(2).set('active', true);
            expect(collection.where({active: true}).length).to.equal(1);
            expect(collection.where({active: true})[0].get('title')).to.equal('Widget Three');
        });

        it('deactivates other widgets when a new active widget is added', function() {
            collection.add(widget3);

            expect(collection.at(0).get('active')).to.be(false);
            expect(collection.at(1).get('active')).to.be(false);
            expect(collection.at(2).get('active')).to.be(true);
        });
    });
});
