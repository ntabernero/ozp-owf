/*
 * Copyright 2013 Next Century Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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