define([
    'views/panes/DesktopPane',
    'collections/WidgetStatesCollection'
], function(DesktopPane, WidgetStatesCollection) {
    describe('DesktopPane', function() {
        var desktopPane, collection,
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

            desktopPane = new DesktopPane({
                widgets: collection
            }).render();

            done();
        });

        afterEach(function(done) {
            collection = null;
            desktopPane.remove();

            done();
        });

        it('renders a widget window for each widget in the collection', function() {
            collection.add(widget3);

            expect(desktopPane.$el.find('.widget.window').length).to.equal(3);
        });

        it('renders a taskbar with the same collection', function() {
            expect(desktopPane.taskbar.collection).to.be(desktopPane.collection);
        });

        it('registers each widget with the ZIndexManager', function() {
            sinon.spy(desktopPane.zIndexManager, 'register');

            collection.add(widget3);

            expect(desktopPane.zIndexManager.register.calledOnce).to.be.ok();
        });
    });
});
