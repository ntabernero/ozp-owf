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

(function(OWF, Ozone, $) {
    'use strict';

    /**
     * The new API functions fire failure in the event of 
     * a missing preference, but the old API's fire success.
     * This function handles that difference.  'this' is expected
     * to be the Promise object from the new APIs.
     *
     * This function also handles the conversion of the objects
     * from the new API into those of the old.
     *
     * @param response The response from the new API
     * @param onSuccess The user's onSuccess callback
     * @param onFailure The user's onFailure callback
     */
    function handleResponse(response, onSuccess, onFailure) {
        if (response.success) {

        }
        else {
            //preference not found
            if (response.data.status === 404) {
                onSuccess({success: true, preference: null});
            }
        }
    }

    OWF.Preferences = $.extend(OWF.Preferences, {
        getUserPreference: function(cfg) {
            
        }
    });

    //really old API support
    Ozone.pref = Ozone.pref || {};
    Ozone.pref.PrefServer = OWF.Preferences;
})(OWF, Ozone, $);
