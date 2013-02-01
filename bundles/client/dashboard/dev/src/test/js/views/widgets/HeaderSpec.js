define([
    'views/widgets/Header',
    'models/WidgetStateModel'
], function(Header, WidgetStateModel) {
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
        header = new Header({
            model: new WidgetStateModel(widget)
        });

        done();
    });

    afterEach(function(done) {
        header.remove();

        done();
    });

    it('renders the name of the widget', function() {
        expect(header.$el.find('.name').text()).to.be(widget.name);
    });

    it('destroys the model when the close button is clicked', function() {
        sinon.spy(header.model, 'destroy');

        header.$el.find('.close-btn').click();

        expect(header.model.destroy.calledOnce).to.be.ok();
    });
});
