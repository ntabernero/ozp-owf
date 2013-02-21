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
 * This function defines the preferences API functions that are being
 * kept for backwards compatibility with OWF 7
 */

OWF = OWF || {};
Ozone = Ozone || {};

(function(OWF, Ozone, $, document) {
    'use strict';

    /**
     * Simplified version of the old Ozone.util.ModalDlg that
     * was used in default onFailure handler
     */
    function createErrorWindow(msg) {
        //using inline styles to avoid putting stylesheet requirements on widgets.
        var html = '<div style="position: absolute; top: 50%; margin-top: -4em; left: 50%; margin-left: -5em; height: 8em; width: 10em; text-align: center">' +
                '<p></p>' + 
                '<button>OK</button>' +
            '</div>',
            win = $(html);

        function removeWin() {
            win.children('button').off('click', removeWin);
            win.remove();
        }

        win.children('p').text(msg);
        win.children('button').click(removeWin);

        win.appendTo(document.body);
    }

    /**
     * handles a success response from the new API and converts it into 
     * a response for the old API
     * @param response The new API's response
     * @param onSuccess The user-provided callback
     */
    function handleSuccess(response, onSuccess) {
        //user info has to be passed to onSuccess, but the new API
        //doesn't give that information, so we must get it from a
        //separate call.  If that call fails, just return null for username
        OWF.getCurrentUser().always(function(user) {
            var username = this.isResolved() ? user.username : null;

            onSuccess({
                id: response.id,
                namespace: response.namespace,
                path: response.name,
                value: response.value,
                user: {
                    userId: username
                }
            });
        });
    }

    /**
     * handles a failure response from the new API and converts it into 
     * a response for the old API
     * @param response The new API's response
     * @param onSuccess The user-provided success callback
     * @param onFailure The user provided failure callback
     */
    function handleFailure(response, onSuccess, onFailure) {
        //preference not found
        if (response.status === 404) {
            onSuccess({success: true, preference: null});
        }
        else {
            onFailure(response.responseText, response.status);
        }
    }

    function legacyPrefsFunction(cfg, verb) {
        var onSuccess = cfg.onSuccess, 
            onFailure = cfg.onFailure || createErrorWindow;

        OWF.Preferences[verb + 'Preference']({
            namespace: cfg.namespace,
            name: cfg.name,
            value: cfg.value,
            scope: 'user'
        }).done(function (resp) {
            handleSuccess(resp, onSuccess, onFailure);
        }).fail(function(resp) {
            handleFailure(resp, onSuccess, onFailure);  
        });
    }

    /**
     * @name getUserPreference
     * @methodOf OWF.Preferences
     * @deprecated Use OWF.Preferences.getPreference instead
     * @description Retrieves the user preference for the provided name and namespace
     * @param {Object} cfg config object see below for properties
     * @param {String} cfg.namespace The namespace of the requested user preference
     * @param {String} cfg.name The name of the requested user preference
     * @param {Function} cfg.onSuccess The function to be called if the user preference is 
     *   successfully retrieved from the database.  This function takes a single argument, which
     *   is an object.  If a preference is found, thecomplete structure as shown in the example
     *   will be returned.  If it is not found this function is passed the following object: 
     *   {success: true, preference: null}.
     * @example
     * The following is an example of a complete preference object passed to the onSuccess
     * function:
     * {
     *     "value":"true",
     *     "path":"militaryTime", //the preference's name
     *     "user":
     *     {
     *         "userId":"testAdmin1" //NOTE: As of OWF 8, user information is retrieved 
     *                               //separately from the preference itself.  If that
     *                               //retrieval fails, userId could be null here
     *     },
     *     "namespace":"com.mycompany.AnnouncingClock"
     * }
     * @param {Function} [cfg.onFailure] This parameter is optional. If this function is not 
     *   specified a default error message will be displayed.This function is called if an error
     *   occurs on preference retrieval.  It is not called if the preference is simply missing.
     *  This function should accept two arguments:<br>
     *  <br>
     *  error: String<br>
     *  The error message<br>
     *  <br>
     *  Status: The numeric HTTP Status code (if applicable)<br>
     *  401: You are not authorized to access this entity.<br>
     *  500: An unexpected error occurred.<br>
     *  400: The requested entity failed to pass validation.<br>
     * @example
     * The following shows how to make a call to getUserPreference:
     * function onSuccess(pref){
     *     alert(Ozone.util.toString(pref.value));
     * }
     *
     * function onFailure(error,status){
     *     alert('Error ' + error);
     *     alert(status);
     * }
     *
     * // The following code calls getUserPreference with the above defined onSuccess and
     * // onFailure callbacks.
     * OWF.Preferences.getUserPreference({
     *     namespace:'com.company.widget',
     *     name:'First President',
     *     onSuccess:onSuccess,
     *     onFailure:onFailure
     * });
     */
    /**
     * @name setUserPreference
     * @methodOf OWF.Preferences
     * @deprecated Use OWF.Preferences.setPreference instead
     * @description Creates or updates a user preference for the provided namespace and name.
     * @param {Object} cfg config object see below for properties
     * @param {String} cfg.namespace  The namespace of the user preference
     * @param {String} cfg.name The name of the user preference
     * @param {String} cfg.value  The value of the user preference. The value can be any string
     *   including JSON.
     * @param {Function} cfg.onSuccess The function to be called if the user preference is 
     *   successfully updated in the database.
     * @example
     * The following is an example of a complete preference object passed to the onSuccess
     * function:
     * {
     *     "value":"true",
     *     "path":"militaryTime", //the preference's name
     *     "user":
     *     {
     *         "userId":"testAdmin1" //NOTE: As of OWF 8, user information is retrieved 
     *                               //separately from the preference itself.  If that
     *                               //retrieval fails, userId could be null here
     *     },
     *     "namespace":"com.mycompany.AnnouncingClock"
     * }
     * @param {Function} [cfg.onFailure] The function to be called if the user preference cannot
     *   be stored in the database.  If this function is not specified a default error message 
     *   will be displayed. This function is passed back the following parameters:<br>
     * <br>
     * error: String<br>
     * The error message<br>
     * <br>
     * Status: The HTTP Status code<br>
     * 401: You are not authorized to access this entity.<br>
     * 500: An unexpected error occurred.<br>
     * 400: The requested entity failed to pass validation.<br>
     * @example
     *
     * function onSuccess(pref){
     *     alert(pref.value);
     * }
     *
     * function onFailure(error,status){
     *     alert('Error ' + error);
     *     alert(status);
     * }
     *
     * var text = 'George Washington';
     * OWF.Preferences.setUserPreference({
     *     namespace:'com.company.widget',
     *     name:'First President',
     *     value:text,
     *     onSuccess:onSuccess,
     *     onFailure:onFailure
     * });
     */
    /**
     * @name deleteUserPreference
     * @methodOf OWF.Preferences
     * @deprecated Use deletePreference instead
     * @description Deletes a user preference with the provided namespace and name.
     * @param {Object} cfg config object see below for properties
     * @param {String} cfg.namespace The namespace of the user preference
     * @param {String} cfg.name The name of the user preference
     * @param {Function} cfg.onSuccess The function to be called if the user preference is 
     *   successfully deleted from the database. If the preference is not found this function is
     *   passed the following object: {success: true, preference: null}.
     * @example
     * The following is an example of a complete preference object passed to the onSuccess
     * function:
     *
     * {
     *     "value":"true",
     *     "path":"militaryTime", //the preference's name
     *     "user":
     *     {
     *         "userId":"testAdmin1" //NOTE: As of OWF 8, user information is retrieved 
     *                               //separately from the preference itself.  If that
     *                               //retrieval fails, userId could be null here
     *     },
     *     "namespace":"com.mycompany.AnnouncingClock"
     * }
     * @param {Function} [cfg.onFailure] The function to be called if the user preference cannot
     *   be deleted from the database. If this function is not specified a default error message
     *   will be displayed. This function is passed back the following parameters: <br>
     * <br>
     * error: String <br>
     * The error message <br>
     * <br>
     * Status: The HTTP Status code<br>
     * <br>
     * 401: You are not authorized to access this entity.<br>
     * 500: An unexpected error occurred.<br>
     * 404: The user preference was not found.<br>
     * 400: The requested entity failed to pass validation. <br>
     * <br>
     * @example
     * function onSuccess(pref){
     *     alert(pref.value);
     * }
     *
     * function onFailure(error,status){
     *     alert('Error ' + error);
     *     alert(status);
     * }
     *
     * OWF.Preferences.deleteUserPreference({
     *     namespace:'com.company.widget',
     *     name:'First President',
     *     onSuccess:onSuccess,
     *     onFailure:onFailure
     * });
     */

    OWF.Preferences = OWF.Preferences || {};

    //create getUserPreference, setUserPreference, and deleteUserPreference
    $.each(['get', 'set', 'delete'], function(idx, verb) {
        OWF.Preferences[verb + 'UserPreference'] = function(cfg) {
            legacyPrefsFunction(cfg, verb);
        };
    });

    $.extend(OWF.Preferences, {
        doesUserPreferenceExist: function(cfg) {
            var onSuccess = cfg.onSuccess, onFailure = cfg.onFailure;

            OWF.Preferences.getPreference({
                name: cfg.name,
                namespace: cfg.namespace,
                scope: 'user'
            }).done(function(preference) {
                onSuccess({
                    preferenceExist: true,
                    statusCode: 200
                });
            }).fail(function(response) {
                if (response.status == 404) {
                    onSuccess({
                        preferenceExist: false,

                        //the actual status code is 404, but for compatibility with
                        //how the API used to work, we will still tell them it was 200
                        statusCode: 200
                    });
                }
                else {
                    onFailure(response.responseText, response.status);
                }
            });
        }
    });

    /**
     * @name getUserPreference
     * @methodOf Ozone.pref.PrefServer
     * @deprecated Use OWF.Preferences.getPreference instead
     * @description Retrieves the user preference for the provided name and namespace
     * @param {Object} cfg config object see below for properties
     * @param {String} cfg.namespace The namespace of the requested user preference
     * @param {String} cfg.name The name of the requested user preference
     * @param {Function} cfg.onSuccess The function to be called if the user preference is 
     *   successfully retrieved from the database.  This function takes a single argument, which
     *   is an object.  If a preference is found, thecomplete structure as shown in the example
     *   will be returned.  If it is not found this function is passed the following object: 
     *   {success: true, preference: null}.
     * @example
     * The following is an example of a complete preference object passed to the onSuccess
     * function:
     * {
     *     "value":"true",
     *     "path":"militaryTime", //the preference's name
     *     "user":
     *     {
     *         "userId":"testAdmin1" //NOTE: As of OWF 8, user information is retrieved 
     *                               //separately from the preference itself.  If that
     *                               //retrieval fails, userId could be null here
     *     },
     *     "namespace":"com.mycompany.AnnouncingClock"
     * }
     * @param {Function} [cfg.onFailure] This parameter is optional. If this function is not 
     *   specified a default error message will be displayed.This function is called if an error
     *   occurs on preference retrieval.  It is not called if the preference is simply missing.
     *  This function should accept two arguments:<br>
     *  <br>
     *  error: String<br>
     *  The error message<br>
     *  <br>
     *  Status: The numeric HTTP Status code (if applicable)<br>
     *  401: You are not authorized to access this entity.<br>
     *  500: An unexpected error occurred.<br>
     *  400: The requested entity failed to pass validation.<br>
     * @example
     * The following shows how to make a call to getUserPreference:
     * function onSuccess(pref){
     *     alert(Ozone.util.toString(pref.value));
     * }
     *
     * function onFailure(error,status){
     *     alert('Error ' + error);
     *     alert(status);
     * }
     *
     * // The following code calls getUserPreference with the above defined onSuccess and
     * // onFailure callbacks.
     * Ozone.pref.PrefServer.getUserPreference({
     *     namespace:'com.company.widget',
     *     name:'First President',
     *     onSuccess:onSuccess,
     *     onFailure:onFailure
     * });
     */
    /**
     * @name setUserPreference
     * @methodOf Ozone.pref.PrefServer
     * @deprecated Use OWF.Preferences.setPreference instead
     * @description Creates or updates a user preference for the provided namespace and name.
     * @param {Object} cfg config object see below for properties
     * @param {String} cfg.namespace  The namespace of the user preference
     * @param {String} cfg.name The name of the user preference
     * @param {String} cfg.value  The value of the user preference. The value can be any string
     *   including JSON.
     * @param {Function} cfg.onSuccess The function to be called if the user preference is 
     *   successfully updated in the database.
     * @example
     * The following is an example of a complete preference object passed to the onSuccess
        * function:
     * {
     *     "value":"true",
     *     "path":"militaryTime", //the preference's name
     *     "user":
     *     {
     *         "userId":"testAdmin1" //NOTE: As of OWF 8, user information is retrieved 
     *                               //separately from the preference itself.  If that
     *                               //retrieval fails, userId could be null here
     *     },
     *     "namespace":"com.mycompany.AnnouncingClock"
     * }
     * @param {Function} [cfg.onFailure] The function to be called if the user preference cannot
     *   be stored in the database.  If this function is not specified a default error message 
     *   will be displayed. This function is passed back the following parameters:<br>
     * <br>
     * error: String<br>
     * The error message<br>
     * <br>
     * Status: The HTTP Status code<br>
     * 401: You are not authorized to access this entity.<br>
     * 500: An unexpected error occurred.<br>
     * 400: The requested entity failed to pass validation.<br>
     * @example
     *
     * function onSuccess(pref){
     *     alert(pref.value);
     * }
     *
     * function onFailure(error,status){
     *     alert('Error ' + error);
     *     alert(status);
     * }
     *
     * var text = 'George Washington';
     * Ozone.pref.PrefServer.setUserPreference({
     *     namespace:'com.company.widget',
     *     name:'First President',
     *     value:text,
     *     onSuccess:onSuccess,
     *     onFailure:onFailure
     * });
     */
    /**
     * @name deleteUserPreference
     * @methodOf Ozone.pref.PrefServer
     * @deprecated Use OWF.Preferences.deletePreference instead
     * @description Deletes a user preference with the provided namespace and name.
     * @param {Object} cfg config object see below for properties
     * @param {String} cfg.namespace The namespace of the user preference
     * @param {String} cfg.name The name of the user preference
     * @param {Function} cfg.onSuccess The function to be called if the user preference is 
     *   successfully deleted from the database. If the preference is not found this function is
     *   passed the following object: {success: true, preference: null}.
     * @example
     * The following is an example of a complete preference object passed to the onSuccess
     * function:
     *
     * {
     *     "value":"true",
     *     "path":"militaryTime", //the preference's name
     *     "user":
     *     {
     *         "userId":"testAdmin1" //NOTE: As of OWF 8, user information is retrieved 
     *                               //separately from the preference itself.  If that
     *                               //retrieval fails, userId could be null here
     *     },
     *     "namespace":"com.mycompany.AnnouncingClock"
     * }
     * @param {Function} [cfg.onFailure] The function to be called if the user preference cannot
     *   be deleted from the database. If this function is not specified a default error message
     *   will be displayed. This function is passed back the following parameters: <br>
     * <br>
     * error: String <br>
     * The error message <br>
     * <br>
     * Status: The HTTP Status code<br>
     * <br>
     * 401: You are not authorized to access this entity.<br>
     * 500: An unexpected error occurred.<br>
     * 404: The user preference was not found.<br>
     * 400: The requested entity failed to pass validation. <br>
     * <br>
     * @example
     * function onSuccess(pref){
     *     alert(pref.value);
     * }
     *
     * function onFailure(error,status){
     *     alert('Error ' + error);
     *     alert(status);
     * }
     *
     * Ozone.pref.PrefServer.deleteUserPreference({
     *     namespace:'com.company.widget',
     *     name:'First President',
     *     onSuccess:onSuccess,
     *     onFailure:onFailure
     * });
     */
    //really old API support
    Ozone.pref = Ozone.pref || {};
    Ozone.pref.PrefServer = OWF.Preferences;
})(OWF, Ozone, $, document);
