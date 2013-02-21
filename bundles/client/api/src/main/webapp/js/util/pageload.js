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
     * @namespace
     */
    OWF.Util.pageLoad = OWF.Util.pageLoad || {};

    /**
     * @field
     * @description enable or disable the automatic sending of loadtime
     */
    OWF.Util.pageLoad.autoSend = true;

    /**
     * @field
     * @description holds the current date time, before the onload of the widget
     */
    OWF.Util.pageLoad.beforeLoad = (new Date()).getTime();

    /**
     * @field
     * @description holds current date time after the onload of the widget.  this value will be set after onload
     */
    OWF.Util.pageLoad.afterLoad = null;


    OWF.Util.pageLoad.calcLoadTime = function (time) {
        /**
         * @field
         * @description Holds the load time of the widget.  This may be altered to allow the widget to determine it's load time.
         *   loadTime is sent via the Eventing API, if altering this value do so before Eventing is initialized
         */
        OWF.Util.pageLoad.loadTime = (time != null ? time : OWF.Util.pageLoad.afterLoad) - OWF.Util.pageLoad.beforeLoad;
        return OWF.Util.pageLoad.loadTime;
    };
})(window, document);