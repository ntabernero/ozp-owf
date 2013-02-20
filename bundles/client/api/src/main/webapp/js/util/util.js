/**
 * @fileoverview this contains shared utility functions which are used both in the Container and Widgets
 */
;(function (window, document, undefined) {
    'use strict';

    /**
     * @ignore
     */
    var Ozone = window.Ozone = window.Ozone ? window.Ozone : {};

    /**
     * @ignore
     * @namespace
     */
    Ozone.util = Ozone.util ? Ozone.util : {};


    /**
     * @private
     */
    Ozone.util.HTMLEncodeReservedJS = function (str) {
        return str.replace(/"/g, '&quot;').replace(/'/g, "&#39;");
    };

    /**
     * @private
     *
     * @description Similar to Ext.util.Format.htmlEncode except this method also handles the single quote
     */
    Ozone.util.HTMLEncode = function (str) {
        return !str ? str : String(str).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    };


    //requirejs support
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        define(function () {
            return Ozone.util;
        });
    }

})(window, document);