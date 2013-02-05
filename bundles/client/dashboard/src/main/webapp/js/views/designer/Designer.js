define([
    'views/View',
    './Box',
    './Pane',
    './WorkingArea',
    'jquery',
    'lodash',
    'jqueryui/jquery-ui.custom',
    'jquery-splitter'
],

function(View, Box, Pane, WorkingArea, $, _) {

    'use strict';

    var boxTpl = '<div class="box"><div class="pane"></div><div class="pane"></div></div>',
        HIGHLIGHTCLASS = 'highlight',
        tpl = 
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
            'click .reset-btn': 'reset',
            'click .save-btn': 'save',
            'click .cancel-btn': 'cancel'
        },

        _$draggables: null,
        _$droppables: null,

        views: function() {
            return {
                vtype: 'working.area',
                model: this.model
            };
        },

        afterRender: function() {
            this.$el.append(this.template);
            this.$designer = this.$el.find('.working-area');

            this._initDragAndDrop();
        },
        
        design: function() {
            this.render();
            return (this._deferred = $.Deferred());
        },

        reset: function (evt) {
            var $resetBtn = $(evt.target);
            if($resetBtn.hasClass('disabled')) {
                return;
            }
            $resetBtn.addClass('disabled');

            this.$designer.removeData('layoutConfig');
            this.box.remove();
        },

        save: function () {
            var config = this.$designer.data('layoutConfig');
            this._deferred.resolve( config );
        },

        cancel: function () {
            this.remove();
            this._deferred.reject();
        },

        _initDragAndDrop: function() {
            this._$draggables = this.$('#side-panel li').draggable({
                cursorAt: { left: -50 },
                helper: 'clone',
                scroll: false,
                start: _.bind(this._onDragStart, this),
                stop: _.bind(this._onDragStop, this)
            });

            this._$droppables = this.$designer.droppable({
                drop: _.bind(this._onDrop, this)
            });
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
                options = data.type === 'vertical' ? hBoxOptions : vBoxOptions;

            // can be either working area or a pane
            var view = this._$mouseOverPane.data().view;
            view.nest( options );

            this._$mouseOverPane.removeClass( HIGHLIGHTCLASS );
        },

        _onDragStop: function(evt, ui) {
            $(document).off('.designerdrag');
        },

        remove: function () {
            this._$draggables.draggable('destroy');
            this._$droppables.droppable('destroy');

            View.prototype.remove.apply( this, arguments );
        }
    });

});
