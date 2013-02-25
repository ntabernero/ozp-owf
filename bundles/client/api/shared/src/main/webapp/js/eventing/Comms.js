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
/*global gadgets*/
;(function (window, undefined) {
    'use strict';

    var _rpc = null,
            Comms = {
                /**
                 * @ignore
                 */
                register: function (handlerName, handlerObject) {
                    //Simple wrapper for manager objects to register handler functions
                    _rpc.register(handlerName, handlerObject);
                },

                /**
                 * @ignore
                 * Wraps gadgets.rpc.call.
                 */
                send: function () {
                    _rpc.apply(gadgets.rpc, arguments);
                }

            };

    //requirejs support
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        define(['gadgets/rpc'], function (rpc) {
            _rpc = rpc;
            return Comms;
        });
    }
    else {
        //no requirejs
        _rpc = gadgets.rpc;
        var OWF = window.OWF = window.OWF || {};
        OWF.Comms = Comms;
    }
})(window);