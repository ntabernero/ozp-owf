/**
 * An Iframe subclass with the WidgetControl mixin.  Used in the 
 * FitPane and TabbedPane
 */
define([
    'views/widgets/Iframe',
    'mixins/widgets/WidgetControl',
    'lodash'
], function(Iframe, WidgetControl, _) {
    'use strict';

    return Iframe.extend(_.extend({}, WidgetControl, {
        initialize: function() {
            Iframe.prototype.initialize.apply(this, arguments);
            WidgetControl.initialize.apply(this, arguments);
        }
    }));

});
