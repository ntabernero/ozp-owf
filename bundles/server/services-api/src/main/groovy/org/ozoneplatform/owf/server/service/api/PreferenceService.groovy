/*
   Copyright 2013 Next Century Corporation

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
package org.ozoneplatform.owf.server.service.api

import org.ozoneplatform.commons.server.domain.model.Preference

interface PreferenceService {
    /**
     * Get the value of the preference specified by namespace and name by searching for that preference in
     * different scopes in a predefined order.
     * @param personId
     * @param namespace
     * @param name
     * @return preference value
     */
    Preference getPreference(String personId, String namespace, String name)

    /**
     * Get the value of the given user's preference specified by namespace:name.
     * @param personId
     * @param namespace
     * @param name
     * @return preference value
     */
    Preference getPersonalPreference(String personId, String namespace, String name)

    /**
     * Returns personal preferences of the given user
     * @param personId
     * @return
     */
    Set<Preference> listPersonalPreferences(String personId)

    /**
     * Sets a personal preference
     * @param personId
     * @param namespace
     * @param name
     * @param value
     * @return
     */
    Preference setPersonalPreference(String personId, Preference preference)

    /**
     * Deletes a personal preference
     * @param personId
     * @param namespace
     * @param name
     */
    void deletePersonalPreference(String personId, String namespace, String name)

    /**
     * Returns a list of preferences for the given group
     * @param groupId
     * @return
     */
    Set<Preference> listGroupPreferences(String groupId)

    /**
     * Returns a specific group preference
     * @param groupId
     * @param namespace
     * @param name
     * @return
     */
    Preference getGroupPreference(String groupId, String namespace, String name)

    /**
     * Sets a group preference
     * @param groupId
     * @param preference
     * @return
     */
    Preference setGroupPreference(String groupId, Preference preference)

    /**
     * Deletes a group preference
     * @param groupId
     * @param namespace
     * @param name
     */
    void deleteGroupPreference(String groupId, String namespace, String name)
}
