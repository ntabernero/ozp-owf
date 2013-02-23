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

//            if (OWF.Util.isInContainer) {
//                var eventingController = OWF.Eventing._Widget.getInstance(function () {
//                });
//            }

        });
    }
})(window, document, window.owfjQuery);

