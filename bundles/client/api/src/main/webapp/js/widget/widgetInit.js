;(function (window, document, $, undefined) {
    'use strict';

    /**
     * @ignore
     */
    var OWF = window.OWF = window.OWF || {};

    if (!OWF.disableWidgetInit) {

        $(document).ready(function () {

            //calc pageload time
            OWF.Util.pageLoad.afterLoad = (new Date()).getTime();
            OWF.Util.pageLoad.calcLoadTime();

//            if (Ozone.util.isInContainer()) {
//                OWF._init(window, document);
//            }

        });
    }
})(window, document, window.jQuery);

