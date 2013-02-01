define([
    'views/widgets/WindowHeader',
    'models/WidgetStateModel'
], function(WindowHeader, WidgetStateModel) {
    var header, widget = {
        name: 'Widget Three',
        url: 'widget.html',
        x: 50,
        y: 50,
        width: 400,
        height: 500,
        zIndex: 10000
    };

    beforeEach(function(done) {
        header = new WindowHeader({
            model: new WidgetStateModel(widget)
        }).render();

        done();
    });

    afterEach(function(done) {
        header.remove();

        done();
    });

    it('sets minimized, and unsets maximized, on the model when minimize is clicked', function() {
        header.$el.find('.minimize-btn').click();

        expect(header.model.get('minimized')).to.equal(true);
        expect(header.model.get('maximized')).to.equal(false);
    });

    it('sets maximized, and unsets minimized, on the model when maximize is clicked', function() {
        header.$el.find('.maximize-btn').click();

        expect(header.model.get('minimized')).to.equal(false);
        expect(header.model.get('maximized')).to.equal(true);
    });

    it('unsets maximized and minimized on restore', function() {
        header.model.set('maximized', true);
        header.model.set('minimized', true);

        header.$el.find('.restore-btn').click();

        expect(header.model.get('minimized')).to.equal(false);
        expect(header.model.get('maximized')).to.equal(false);
    });
});
