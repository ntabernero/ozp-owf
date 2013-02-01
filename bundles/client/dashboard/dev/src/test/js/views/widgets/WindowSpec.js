define([
    'views/widgets/Window',
    'models/WidgetStateModel',
    'services/ZIndexManager'
], function(Window, WidgetStateModel, ZIndexManager) {
    var win,
        zIndexManager,
        widget = {
            name: 'Widget Three',
            url: 'widget.html',
            x: 50,
            y: 50,
            width: 400,
            height: 500,
            zIndex: 10000
        };

    beforeEach(function(done) {
        zIndexManager = new ZIndexManager();
        sinon.spy(zIndexManager, 'register');

        win = new Window({
            model: new WidgetStateModel(widget),
            zIndexManager: zIndexManager
        });

        done();
    });

    afterEach(function(done) {
        win.remove();
        zIndexManager.destroy();

        done();
    });

    it('is registered with the zIndexManager', function() {
        expect(zIndexManager.register.calledOnce).to.be.ok();
    });

    it('is resizable', function() {
       sinon.spy(win.$el, 'resizable');

       win.render();

       expect(win.$el.resizable.calledOnce).to.be.ok();
    });

    it('has the minimized css class iff it is minimized', function() {
        win.render();

        expect(win.$el.hasClass('minimized')).to.be(false);

        win.model.set('minimized', true);
        expect(win.$el.hasClass('minimized')).to.be(true);

        win.model.set('minimized', false);
        expect(win.$el.hasClass('minimized')).to.be(false);
    });

    it('has the maximized css class iff it is maximized', function() {
        win.render();

        expect(win.$el.hasClass('maximized')).to.be(false);

        win.model.set('maximized', true);
        expect(win.$el.hasClass('maximized')).to.be(true);

        win.model.set('maximized', false);
        expect(win.$el.hasClass('maximized')).to.be(false);
    });

    it('is calls zIndexManager.bringToFront when activated', function() {
        sinon.spy(zIndexManager, 'bringToFront');
        win.render();

        win.model.set('active', true);

        expect(zIndexManager.bringToFront.calledOnce).to.be.ok();
    });

    //TODO add tests for resize and move behavior
});
