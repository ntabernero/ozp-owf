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

    var GET_PREFERENCE_SERVICE_NAME = '_preference_get',
        SET_PREFERENCE_SERVICE_NAME = '_preference_set',
        DELETE_PREFERENCE_SERVICE_NAME = '_preference_delete';

    /*
     * returns a function that will can be called when the
     * promise object of a collection fetch is resolved or rejected which will send the
     * appropriate data back to the rpc return
     *
     * @param rpc The rpc instance which has a callback property
     */
    function createResponseHandler(rpc) {
        return function(collection, resp) {

            //'this' should be the promise
            if (this.isResolved()) {
                //success
                
                rpc.callback({
                    success: true,
                    data: collection.toJSON()
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
        };
    }


    /* The following functions are registered with gadgets.rpc.  'this' is the rpc instance */

    function getPreference(cfg) {
        /*jshint validthis:true */
    
        (new PreferenceModel({
            namespace: cfg.namespace,
            name: cfg.name,
            scope: cfg.scope
        })).fetch().always(createResponseHandler(this));
    }
    
    function setPreference(cfg) {
        /*jshint validthis:true */
    
    }

    function deletePreference(cfg) {
        /*jshint validthis:true */
    
    }


    return function(cfg) {
        gadgets.rpc.register(GET_PREFERENCE_SERVICE_NAME, getPreference);
        gadgets.rpc.register(SET_PREFERENCE_SERVICE_NAME, setPreference);
        gadgets.rpc.register(DELETE_PREFERENCE_SERVICE_NAME, deletePreference);
    };
});
