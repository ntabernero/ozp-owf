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

define([
    'models/PreferenceModel',
    'collections/PreferencesCollection',
    'gadgets'
], function(PreferenceModel, PreferenceCollection, gadgets) {
    'use strict';

    var GET_PREFERENCE_SERVICE_NAME = '_preference_get',
        SET_PREFERENCE_SERVICE_NAME = '_preference_set',
        DELETE_PREFERENCE_SERVICE_NAME = '_preference_delete';


    /**
     * Common code used to implement getPreference, setPreference, and deletePreference.
     *
     * @param rpc The rpc object which contains the gadgets.rpc callback
     * @param cfg The cfg passed in from the widget
     * @param verb The method to call on the PreferenceModel. Example: 'save'
     * @param argsToPass List of names of properties to pass into model constructor
     */
    function preferenceFunction(rpc, cfg, verb, argsToPass) {

        /*jshint validthis:true */
        function responseHandler(model, resp) {

            //'this' should be the promise
            if (this.isResolved()) {
                //success
                
                rpc.callback({
                    success: true,
                    data: model.toJSON()
                });
            }
            else {
                //not resolved, must be rejected.
                //relay error message back to widget
                rpc.callback({
                    success: false,
                    data: {
                        status: resp.status,
                        responseText: resp.responseText
                    }
                });
            }
        }

        var args = {}, arg;

        //create the args for the model
        for (var i = 0; i < argsToPass.length; i++) {
            arg = argsToPass[i];
            args[arg] = cfg[arg];
        }

        //create the model, perform the requested action, and bind the
        //response handler to the result.  This assumes that the action
        //specified by 'verb' is asynchronous and returns a Promise
        (new PreferenceModel(args))[verb]().always(responseHandler);
    }

    /* The following functions are registered with gadgets.rpc.  'this' is the rpc instance */

    function getPreference(sender, cfg) {
        /*jshint validthis:true */
    
        preferenceFunction(this, cfg, 'fetch', ['namespace', 'name', 'scope', 'scopeGuid']);
    }
    
    function setPreference(sender, cfg) {
        /*jshint validthis:true */
    
        preferenceFunction(this, cfg, 'save', 
                ['namespace', 'name', 'scope', 'scopeGuid', 'value']);
    }

    function deletePreference(sender, cfg) {
        /*jshint validthis:true */
    
        preferenceFunction(this, cfg, 'destroy', 
                ['namespace', 'name', 'scope', 'scopeGuid', 'value']);
    }


    return function(cfg) {
        gadgets.rpc.register(GET_PREFERENCE_SERVICE_NAME, getPreference);
        gadgets.rpc.register(SET_PREFERENCE_SERVICE_NAME, setPreference);
        gadgets.rpc.register(DELETE_PREFERENCE_SERVICE_NAME, deletePreference);
    };
});
