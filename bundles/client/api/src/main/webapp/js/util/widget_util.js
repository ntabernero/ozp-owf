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
     * @description This method informs a widget developer if their widget is running
     * in a Container, like OWF
     *
     * @returns  boolean true if the widget is inside a container, false otherwise.
     *
     */
    Ozone.util.isInContainer = function () {
        var inContainer = false;

        //check window.name
        if (Ozone.util.parseJson) {
            var configParams = Ozone.util.parseWindowNameData();
            if (configParams != null
            //is the fact that a json string was in window.name enough to determine the widget is in a container?
            //&& configParams.inContainer
                    ) {
                inContainer = true;
            }
        }
        return inContainer;
    };

    /**
     * @description This method informs a widget developer if their widget is running
     * from the OWF or from a direct URL call.
     *
     * @returns  boolean true if the widget is inside OWF, false otherwise.
     *
     */
    Ozone.util.isRunningInOWF = function () {
        var isInOwf = false;

        //check window.name
        if (Ozone.util.parseJson) {
            var configParams = Ozone.util.parseWindowNameData();
            if (configParams != null && configParams.owf) {
                isInOwf = true;
            }
        }
        return isInOwf;
    };

    /**
     * @description This method returns flash/flex object from dom.
     *
     * @returns  flash/flex object from dom
     *
     */
    Ozone.util.getFlashApp = function (id) {
        id = id || Ozone.dragAndDrop.WidgetDragAndDrop.getInstance().getFlashWidgetId();
        if (!id) {
            return;
        }

        if (navigator.appName.indexOf("Microsoft") != -1) {
            return window[id];
        }
        else {
            return document[id];
        }
    };

    /**
     * @private
     * @description This method will convert a string into a json object.  There is a check
     * done to ensure no unsafe json is included.
     *
     * @param {String} str String that represents a json object
     *
     * @returns {Object} json object
     *
     * @throws Error if parameter is not a string
     * @throws Error if there is an issue converting to JSON
     */
    Ozone.util.parseJson = function (str) {
        if (typeof(str) === 'string') {
            return JSON.parse(str);
        }
        else {
            throw "Ozone.util.parseJson expected a string, but didn't get one";
        }
    };

    /**
     * @private
     * @description This method will convert anything to a string.
     * There is no check for recursion, so don't do that
     *
     * @param {Object} obj object to convert
     *
     * @returns string
     */
    Ozone.util.toString = function (obj) {
        if (typeof(obj) === 'object') {
            return JSON.stringify(obj);
        }
        else {
            return obj + '';
        }
    };

    Ozone.util.parseWindowNameData = function () {
        var configParams = null;
        return function () {

            //if already parsed just return the value
            if (configParams) {
                return configParams;
            }

            //parse out the config
            try {
                configParams = Ozone.util.parseJson(
                        window.name
                );
                return configParams;
            }
            catch (e) {
                return null;
            }
        };
    }();

})(window, document);