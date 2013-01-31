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

    it('shrinks headers to fit within available width', function() {
        var contentWidth = 0;

        $(document.body).append(taskbar.$el);
        taskbar.$el.width(200);
        taskbar.resize();

        expect(taskbar.$el.width()).to.equal(200);

        taskbar.$el.children().each(function(idx, header) {
            contentWidth += $(header).outerWidth(true);
        });

        expect(taskbar.$el.width()).to.equal(contentWidth);
    });
});
