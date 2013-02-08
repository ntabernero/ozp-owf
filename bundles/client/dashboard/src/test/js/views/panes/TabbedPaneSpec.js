define([
    'views/panes/TabbedPane',
    'views/widgets/WidgetControlIframe',
    'views/widgets/Header',
    'collections/WidgetStatesCollection'
], function(TabbedPane, WidgetControlIframe, Header, WidgetStatesCollection) {
    describe('TabbedPane', function() {

        var tabbedPane, collection,
            widget1 = {
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
            },
            widget2 = {
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
            },
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
            collection = new WidgetStatesCollection([widget1, widget2]);

            tabbedPane = new TabbedPane({
                collection: collection
            }).render();

            done();
        });

        afterEach(function(done) {
            collection = null;
            tabbedPane.remove();
            tabbedPane = null;

            done();
        });

        it('renders a WidgetControlIframe for each widget in the collection', function() {
            collection.add(widget3);

            var frames = tabbedPane.$('.widgetframe'),
                views = _.map(frames, function(frame) {
                    return $(frame).data('view');
                }),
                isWidgetControlIframe = _.map(views, function(view) {
                    return view instanceof WidgetControlIframe;
                });
            
            expect(views.length).to.equal(3);
            expect(isWidgetControlIframe).to.not.contain(false);
        });

        it('automatically sets the first widget to be active if none are', function() {
            expect(collection.where({active: true})[0].get('title')).to.be(widget1.title);
        });

        it('renders a taskbar with the same collection', function() {
            expect(tabbedPane.tabbar.collection).to.be(tabbedPane.collection);
        });
    });
});
