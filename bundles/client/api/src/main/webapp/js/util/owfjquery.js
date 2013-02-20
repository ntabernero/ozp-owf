/**
 * @fileoverview should be included directly after the embedded jquery in the owf widget bundle
 */
;(function (window, $, undefined) {
    'use strict';

    if ($ != null) {
        window.OWF = window.OWF || {};
        window.OWF.$ = window.OWF$ = window.owfjQuery = $.noConflict(true);
    }

})(window, window.jQuery);