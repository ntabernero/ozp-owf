define([
    'views/View',
    './Box',
    './Pane',
    './WorkingArea',
    'views/Modal',
    'jquery',
    'lodash',
    'handlebars',
    'jqueryui/jquery-ui.custom',
    'jquery-splitter'
],

function(View, Box, Pane, WorkingArea, Modal, $, _, Handlebars) {

    'use strict';

    var HIGHLIGHTCLASS = 'highlight',
        tpl = 
            '<div id="side-panel">' +
                '<ul class="unstyled">' +
                    '<li data-type="vertical">|</li>' +
                    '<li data-type="horizontal">-</li>' +
                '</ul>' +
            '</div>' +
            '<div class="actions">' +
                '<div class="pull-left">' +
                    '<button class="btn enabled reset-btn">Reset</button>' +
                    '<button class="btn lock-btn">' + 
                        '<i class="{{#if locked}}icon-lock{{else}}icon-unlock{{/if}}"></i>' + 
                        '<span>{{#if locked}}Unlock{{else}}Lock{{/if}}</span>' + 
                    '</button>' +
                '</div>' +
                '<div class="pull-right">' +
                    '<button class="btn save-btn">Save</button>' +
                    '<button class="btn cancel-btn">Cancel</button>' +
                '</div>' +
            '</div>';

    return View.extend({

        id: 'dashboard-designer',

        template: Handlebars.compile(tpl),

        events: {
            'click .reset-btn': 'reset',
            'click .lock-btn': 'lock',
            'click .save-btn': 'save',
            'click .cancel-btn': 'cancel'
        },

        _$draggables: null,
        _$droppables: null,

        views: function() {
            return {
                vtype: 'workingArea',
                vid: 'workingArea',
                model: this.model
            };
        },

        afterRender: function() {
            this.$el.append(this.template({locked: false})); 
            this.workingArea = this.getView('workingArea');

            this._initDragAndDrop();
        },
        
        design: function() {
            this.render();
            return (this._deferred = $.Deferred());
        },

        reset: function (evt) {
            var $resetBtn = $(evt.target);
            if( $resetBtn.hasClass('disabled') ) {
                return;
            }

            this.workingArea.reset();
            $resetBtn.addClass('disabled');
        },

        enableReset: function () {
            this.$el.find('.reset-btn').removeClass('disabled');
        },

        lock: function () {
            var me = this,
                dashboard = this.model,
                $lockBtn = me.$el.find('.lock-btn');

            if( !dashboard.get('locked') ) {
                var modal = new Modal({
                    title: 'Lock Dashboard',
                    content: 'Locking this dashboard disables the Launch Menu. New widgets cannot be launched or added to this layout. Do you still want to lock this dashboard?',
                    removeOnClose: true,
                    ok: function (evt) {
                        dashboard.set('locked', true);
                        modal.remove();
                        $lockBtn.children('span').html('Unlock');
                        $lockBtn.children('i').removeClass('icon-unlock').addClass('icon-lock');
                    }
                });
                modal.show();
            }
            else {
                dashboard.set('locked', false);
                $lockBtn.children('span').html('Lock');
                $lockBtn.children('i').removeClass('icon-lock').addClass('icon-unlock');
            }
        },

        save: function () {
            var config = this.workingArea.getLayoutConfig();
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

            this._$droppables = this.workingArea.$el.droppable({
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
                .on('mouseenter.designerdrag', '.working-area, .working-area .pane', _.bind(this._onMouseOverPane, this))
                .on('mouseleave.designerdrag', '.working-area, .working-area .pane', _.bind(this._onMouseOutPane, this));
        },
        
        _onDrop: function (evt, ui) {
            var data = $(ui.helper).data(),
                hBoxOptions = {
                    vtype: 'box',
                    orientation: 'vertical',
                    panes: [
                        { vtype: 'pane', collapsible: false, htmlText: '50%', width: '50%' },
                        { vtype: 'pane', collapsible: false, htmlText: '50%', width: '50%' }
                    ]
                },
                vBoxOptions = {
                    vtype: 'box',
                    orientation: 'horizontal',
                    panes: [
                        { vtype: 'pane', collapsible: false, htmlText: '50%', height: '50%' },
                        { vtype: 'pane', collapsible: false, htmlText: '50%', height: '50%' }
                    ]
                },
                options = data.type === 'vertical' ? hBoxOptions : vBoxOptions;

            var view = this._$mouseOverPane.data().view;
            view.nest( options );

            this._$mouseOverPane.removeClass( HIGHLIGHTCLASS );
            this.enableReset();
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
