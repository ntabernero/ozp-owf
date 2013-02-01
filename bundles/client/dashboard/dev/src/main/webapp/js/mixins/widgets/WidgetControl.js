/**
 * Logic for widget state based on model changes is identical between widget panels 
 * and Taskbar Headers.  Therefore that logic is separated out here
 */
define([

], function() {
    'use strict';

    return {
        events: {
            'mousedown': 'activateWidget'
        },

        modelEvents: {
            'change:active': 'updateActive',
            'change:maximized': 'updateMaximize',
            'change:minimized': 'updateMinimize',
            'destroy': 'remove'
        },

        initialize: function() {
            this.updateActive();
        },

        updateMinimize: function() {
            this.$el[this.model.get('minimized') ? 'addClass' : 'removeClass']('minimized');
        },

        updateMaximize: function() {
            this.$el[this.model.get('maximized') ? 'addClass' : 'removeClass']('maximized');
        },

        updateActive: function() {
            this.$el[this.model.get('active') ? 'addClass' : 'removeClass']('active');
        },

        activateWidget: function() {
            this.model.set('active', true);
        }
    };
});
