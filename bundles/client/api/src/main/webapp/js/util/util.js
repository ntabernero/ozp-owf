/**
 * @fileoverview this contains shared utility functions which are used both in the Container and Widgets
 */
;(function (window, document, undefined) {
    'use strict';

    /**
     * @ignore
     */
    var OWF = window.OWF = window.OWF || {};

    /**
     * @ignore
     */
    OWF.Util = OWF.Util || {};

    /**
     * @private
     */
    OWF.Util.HTMLEncodeReservedJS = function (str) {
        return str.replace(/"/g, '&quot;').replace(/'/g, "&#39;");
    };

    /**
     * @private
     *
     * @description Similar to Ext.util.Format.htmlEncode except this method also handles the single quote
     */
    OWF.Util.HTMLEncode = function (str) {
        return !str ? str : String(str).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    };

    //requirejs support
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        define(function () {
            return OWF.Util;
        });
    }

    //put on Ozone namespace for backwards compat
    var Ozone = window.Ozone = window.Ozone || {};
    Ozone.util = OWF.Util;

})(window, document);