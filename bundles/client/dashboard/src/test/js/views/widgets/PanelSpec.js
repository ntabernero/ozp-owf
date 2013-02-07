define([
    'views/widgets/Panel',
    'models/WidgetStateModel'
], function(Panel, WidgetStateModel) {
    describe('Panel', function() {
        var panel,
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
            panel = new Panel({
                model: new WidgetStateModel(widget)
            }).render();

            done();
        });

        afterEach(function(done) {
            panel.remove();

            done();
        });

        it('has a header', function() {
            expect(panel.$('.header')).to.be.ok();
        });

        it('has a body', function() {
            expect(panel.$('.body')).to.be.ok();
        });

        it('has an iframe with the same model', function() {
            expect(panel.iframe.model).to.be(panel.model);
        });
    });
});
