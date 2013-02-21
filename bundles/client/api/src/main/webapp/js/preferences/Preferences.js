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
 * This file defines the new Preferences API functions created in 
 * OWF 8
 */

;(function(OWF, $, gadgets) {
    'use strict';

    /*
     * can be used as the callback to gadgets.rpc.call.
     * It will inspect the response in order to determine
     * success or failure and call the appropriate method
     * on 'this', which is expected to be a jquery Deferred
     */
    function handleResponse(response) {
        /*jshint validthis:true */

        this[response.success ? 'resolve' : 'reject'](response.data);
    }

    /**
     * common code used to implement each of getPreference, setPrefernce, etc
     * @param service The name of the gadgets.rpc service to call
     * @param cfg The cfg object passed into the calling function
     * @param argsToPass A list of names of properties that should be copied from cfg into
     *  the object that is passed to the container
     */
    function preferenceFunction(service, cfg, argsToPass) {
        var deferred = $.Deferred(),
            args = {},
            arg;

        deferred.done(cfg.onSuccess).fail(cfg.onFailure);

        for (var i = 0; i < argsToPass.length; i++) {
            arg = argsToPass[i];
            args[arg] = cfg[arg];
        }

        gadgets.rpc.call('..', service, $.proxy(handleResponse, deferred), args);

        return deferred.promise();
    }

    var GET_PREFERENCE_SERVICE_NAME = '_preference_get',
        SET_PREFERENCE_SERVICE_NAME = '_preference_set',
        DELETE_PREFERENCE_SERVICE_NAME = '_preference_delete';

    OWF.Preferences = $.extend(OWF.Preferences, {

        /**
         * Retrieves a preference value.  If 'scope' is specified,
         * The preference is retrieved only from that scope. 
         * Otherwise, scopes are searched in decreasing order of 
         * specificity, and the first matching preference that is found is
         * returned.  For example, if both a user and a group have the 
         * same preference set to different values, the user's version
         * of the preference will be returned.  If a group preference is
         * to be returned, and the user is a member of multiple groups 
         * which define that preference, which group's preference gets 
         * returned is currently unspecified, though it may be specified
         * in future versions.
         *
         * The query can be further narrowed by specifying a scopeGuid, which specifies a single
         * entity in the given scope which should by searched for the preference. Only
         * administrators may specify other users, or groups that they are not a 
         * member of.
         *
         * @param {String} cfg.scope (Optional) The scope to search for the preference.
         *  Currently supports the following values: 'user', 'group' 
         * @param {String} cfg.scopeGuid (Optional) The GUID of a specific user or group on which
         *  to look up the preference
         * @param {String} cfg.namespace The namespace of the preference to search for
         * @param {String} cfg.name The name of the preference to search for
         * @param {Function} cfg.onSuccess A function to call in the event of a successful 
         *  retrieval. Takes as a parameter an object with the following properties: 
         *  scope, namespace, name, value.
         * @param {Function} cfg.onFailure A function to call in the event of a failure to 
         *  retrieve the preference.  This includes both non-existant preferences and network 
         *  errors. Gets passed an object containing 'status' and 'responseText'
         * @return {Promise} A promise object allowing the attachment of more success and error 
         *  handlers
         */
        getPreference: function(cfg) {
            return preferenceFunction(GET_PREFERENCE_SERVICE_NAME, cfg, 
                    ['namespace', 'name', 'scope', 'scopeGuid']);
        },

        /**
         * Saves a preference value.  If 'scope' is specified,
         * The preference is saved to that scope. Only administrators
         * may save preferences to scopes higher than 'user' (the default if
         * 'scope' is not specified').  If 'scope' is 'group', the group to modify
         * must be specified using the 'scopeGuid' parameter.  'scopeGuid' may also be specified 
         * when 'scope' is 'user', in which case it is the guid of the user to modify.  Only 
         * administrators may modify other users.
         *
         * @param {String} cfg.scope (Optional) The scope on which to set the preference.
         *  Currently supports the following values: 'user', 'group'
         *  Defaults to 'user'.
         *  Only administrators may set preferences at higher scopes than 'user'.
         * @param {String} cfg.scopeGuid (Optional) The GUID of the group or user whose preference
         *  is being set.  Only administrators may set group preferences or preferences on
         *  users besides themselves.
         * @param {String} cfg.namespace The namespace of the preference to set
         * @param {String} cfg.name The name of the preference to set
         * @param {String} cfg.value The value to store in the preference
         * @param {Function} cfg.onSuccess A function to call in the event of a successful set.
         *  Takes as a parameter an object with the following properties representing the set 
         *  preference: 
         *  scope, namespace, name, value.
         * @param {Function} cfg.onFailure A function to call in the event of a failure to set the
         *  preference.  This includes both authorization errors and network errors
         * @return {Promise} A promise object allowing the attachment of more success and error 
         *  handlers
         */
        setPreference: function(cfg) {
            return preferenceFunction(SET_PREFERENCE_SERVICE_NAME, cfg, 
                    ['namespace', 'name', 'value', 'scopeGuid', 'scope']);
        },

        /**
         * Deletes a preference value.  If 'scope' is specified,
         * The preference is deleted from that scope. Only administrators
         * may modify preferences on scopes higher than 'user' (the default if
         * 'scope' is not specified').  If 'scope' is 'group', the group to modify
         * must be specified using the 'scopeGuid' parameter.  'scopeGuid' may also be specified 
         * when 'scope' is 'user', in which case it is the guid of the user to modify.  Only 
         * administrators may modify other users.

         *
         * @param {String} cfg.scope (Optional) The scope on which to delete the preference.
         *  Currently supports the following values: 'user', 'group'
         *  Defaults to 'user'.
         *  Only administrators may delete preferences at higher scopes than 'user'.
         * @param {String} cfg.scopeGuid (Optional) The GUID of the group or user whose preference
         *  is being deleted.  Only administrators may delete group preferences or preferences on
         *  users besides themselves.
         * @param {String} cfg.namespace The namespace of the preference to delete
         * @param {String} cfg.name The name of the preference to delete
         * @param {Function} cfg.onSuccess A function to call in the event of a successful 
         *  deletion. Takes as a parameter an object with the following properties representing 
         *  the deleted preference: 
         *  scope, namespace, name, value.
         * @param {Function} cfg.onFailure A function to call in the event of a failure to delete 
         *  the preference.  This includes non-existant preferences, authorization errors and 
         *  network errors
         * @return {Promise} A promise object allowing the attachment of more success and error 
         *  handlers
         */
        deletePreference: function(cfg) {
            return preferenceFunction(DELETE_PREFERENCE_SERVICE_NAME, cfg, 
                    ['namespace', 'name', 'user', 'group', 'scope']);
        }
    });
})(window.OWF = window.OWF || {}, window.owfjQuery, gadgets);
