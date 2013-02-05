define([
    'views/panes/FitPane',
    'collections/WidgetStatesCollection'
], function(FitPane, WidgetStatesCollection) {
    var fitPane,
        widget1 = {
            title: 'Widget One',
//            uniqueId: '1',
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
//            uniqueId: '2',
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
        collection;

    beforeEach(function(done) {
        collection = new WidgetStatesCollection([widget1]);

        done();
    });

    afterEach(function(done) {
        collection = null;
        if (fitPane) fitPane.remove();
        fitPane = null;

        done();
    });

    it('renders no widgets when its collection is empty', function() {
        fitPane = new FitPane({
            collection: new WidgetStatesCollection()
        }).render();
        expect(fitPane.$el.children('iframe').length).to.equal(0);
    });

    it('renders a single widget when its collection contains that widget', function() {
        fitPane = new FitPane({
            collection: collection
        }).render();

        expect(fitPane.$el.children('iframe').length).to.equal(1);
        fitPane.remove();

        var newCollection = new WidgetStatesCollection();
        fitPane = new FitPane({
            collection: newCollection
        }).render();

        newCollection.add(widget2);

        expect(fitPane.$el.children('iframe').length).to.equal(1);
    });

    it('throws an exception if created with more than one widget', function() {
        collection.add(widget2);

        expect(function() {
            fitPane = new FitPane({
                collection: collection
            });
        }).to.throwException();
    });

    it('throws an exception if an additional widget is added after creation', function() {
        fitPane = new FitPane({
            collection: collection
        });

        expect(function() {
            collection.add(widget2);
        }).to.throwException();
    });

    it('deletes a widget iframe if the widget model is destroyed', function() {
        fitPane = new FitPane({
            collection: collection
        }).render();

        collection.at(0).destroy();

        expect(fitPane.$el.children('iframe').length).to.equal(0);
    });
});
