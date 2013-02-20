;(function (window, document, undefined) {
    'use strict';

    var OWF = window.OWF = window.OWF || {};
    OWF.version = {

        owfversion: '${project.version}',

        mpversion: '2.3',

        preference: '-v1',

        eventing: '-v1',

        widgetLauncher: '-v1',

        state: '-v1',

        dragAndDrop: '-v1',

        widgetChrome: '-v1',

        logging: '-v1',

        language: '-v1'

    };

    //put on Ozone namespace for backwards compat
    var Ozone = window.Ozone = window.Ozone || {};
    Ozone.version = OWF.version;

    //requirejs support
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        define(function () {
            return OWF.version;
        });
    }
})(window, document);

