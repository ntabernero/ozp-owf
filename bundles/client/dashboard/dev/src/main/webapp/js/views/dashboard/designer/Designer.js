define([
    'views/View',

    'jquery',
    'lodash',
    'jqueryui/jquery-ui.custom',
    'splitter'
],

function(View, $, _) {

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
            var config = this.$designer.data('config');
            console.log('Designer- layout config: ', config);
            this._deferred.resolve( config );
        },

        cancel: function () {
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
            this.$_mouseOverPane = $(evt.target).addClass(HIGHLIGHTCLASS);
        },

        _onMouseOutPane: function  () {
            this.$_mouseOverPane && this.$_mouseOverPane.removeClass(HIGHLIGHTCLASS)
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
                panes = [
                    { collapsible: false },
                    { collapsible: false }
                ],  
                options = {
                    panes: panes
                },
                $box = $(boxTpl);

            options.orientation = data.type || 'vertical';

            var index = this.$_mouseOverPane.index(),
                parentConfig = this.$_mouseOverPane.parent().parent().data('config');

            // account for splitter
            if(index === 2) {
                index = 1;
            }

            // if parent has a config
            if(parentConfig) {
                parentConfig.panes[index].box = options;
            }

            this.$_mouseOverPane
                .data('config', options)
                .removeClass(HIGHLIGHTCLASS)
                .append( $box.splitPane(options) );

            // this.$_mouseOverPane.data("splitter").bind("resize", function (evt) {
            //     console.log('resized panes');
            //     //panes = evt.sender.options.panes;
            // });
        },

        _onDragStop: function(evt, ui) {
            $(document).off('.designerdrag');
        }
    });

});
