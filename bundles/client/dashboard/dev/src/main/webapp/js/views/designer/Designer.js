define([
    'views/View',
    './Box',

    'jquery',
    'lodash',
    'jqueryui/jquery-ui.custom',
    'jquery-splitter'
],

function(View, Box, $, _) {

    var boxTpl = '<div class="box"><div class="pane"></div><div class="pane"></div></div>',
        HIGHLIGHTCLASS = 'highlight',
        tpl = 
            '<div id="designer"></div>' +
            '<div id="side-panel">' +
                '<ul class="unstyled">' +
                    '<li data-type="vertical">|</li>' +
                    '<li data-type="horizontal">-</li>' +
                '</ul>' +
            '</div>' +
            '<div class="actions">' +
                '<div class="pull-left">' +
                    '<button class="btn disabled reset-btn">Reset</button>' +
                    '<button class="btn disabled lock-btn">Lock</button>' +
                '</div>' +
                '<div class="pull-right">' +
                    '<button class="btn save-btn">Save</button>' +
                    '<button class="btn cancel-btn">Cancel</button>' +
                '</div>' +
            '</div>';

    return View.extend({

        id: 'dashboard-designer',

        template: tpl,

        events: {
            'click .save-btn': 'save',
            'click .cancel-btn': 'cancel'
        },

        save: function () {
            var config = this.$designer.data('layoutConfig');
            console.log('Designer- layout config: ', config);
            this._deferred.resolve( config );
        },

        cancel: function () {
            this.remove();
            this._deferred.reject();
        },

        render: function() {
            this.$el.html(this.template);
            this.$designer = $('#designer');
            this._initDragAndDrop();
        },

        design: function() {
            this.render();
            return (this._deferred = $.Deferred());
        },

        _initDragAndDrop: function() {
            this.$('li').draggable({
                cursorAt: { left: -50 },
                helper: 'clone',
                scroll: false,
                start: _.bind(this._onDragStart, this),
                stop: _.bind(this._onDragStop, this)
            });

            $('#designer').droppable({
                drop: _.bind(this._onDrop, this)
            });
        },

        _uninitDragAndDrop: function () {
            // clean up
        },

        _onMouseOverPane: function (evt) {
            this._$mouseOverPane = $(evt.target).addClass(HIGHLIGHTCLASS);
        },

        _onMouseOutPane: function  () {
            this._$mouseOverPane && this._$mouseOverPane.removeClass(HIGHLIGHTCLASS);
        },

        _onDragStart: function(evt, ui) {
            $(ui.helper).data({
                type: $(evt.target).data().type
            });

            $(document)
                .on('mouseenter.designerdrag', '#designer, #designer .pane', _.bind(this._onMouseOverPane, this))
                .on('mouseleave.designerdrag', '#designer, #designer .pane', _.bind(this._onMouseOutPane, this));
        },
        
        _onDrop: function (evt, ui) {
            var data = $(ui.helper).data(),
                hBoxOptions = {
                    orientation: 'vertical',
                    panes: [
                        { collapsible: false, htmlText: '50%', width: '50%' },
                        { collapsible: false, htmlText: '50%', width: '50%' }
                    ]
                },
                vBoxOptions = {
                    orientation: 'horizontal',
                    panes: [
                        { collapsible: false, htmlText: '50%', height: '50%' },
                        { collapsible: false, htmlText: '50%', height: '50%' }
                    ]
                },
                options = data.type === 'vertical' ? hBoxOptions : vBoxOptions,
                box = new Box( options );

            // is it a pane?
            var paneView = this._$mouseOverPane.data().view;
            if( paneView && (paneView !== this) ) {
                paneView.nest( box, options );
            }
            else {
                this.nest( box, options, this._$mouseOverPane );
            }

            this._$mouseOverPane.removeClass( HIGHLIGHTCLASS );
        },

        _onDragStop: function(evt, ui) {
            $(document).off('.designerdrag');
        },

        nest: function (box, options, $el) {
            $el.append( box.render().el );
            $el.data( 'layoutConfig', options );
            return this;
        }
    });

});
