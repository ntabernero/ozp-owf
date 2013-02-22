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
package org.ozoneplatform.owf.server.service.impl

import org.ozoneplatform.commons.server.domain.model.Group
import org.ozoneplatform.commons.server.domain.model.Person
import org.ozoneplatform.commons.server.domain.model.Preference
import org.ozoneplatform.owf.server.service.api.GroupService
import org.ozoneplatform.owf.server.service.api.PersonService
import org.ozoneplatform.owf.server.service.api.PreferenceService

class PreferenceServiceImpl implements PreferenceService {

    PersonService personService
    GroupService groupService

    @Override
    Preference getPreference(String personId, String namespace, String name) {
        Preference preference = getPersonalPreference(personId, namespace, name)

//        TODO: handle group preferences
//        if (!preference) {
//        }
        preference
    }

    @Override
    Set<Preference> listPersonalPreferences(String personId) {
        Person person = personService.fetch(personId)
        person.preferences
    }

    @Override
    Preference getPersonalPreference(String personId, String namespace, String name) {
        Person person = personService.fetch(personId)
        Set<Preference> preferenceSet = person.getPreferences()
        Preference result = preferenceSet.find {it.namespace == namespace && it.name == name}
        result
    }

    @Override
    Preference setPersonalPreference(String personId, Preference preference) {
        Person person = personService.fetch(personId)
        person.setPreference(preference.namespace, preference.name, preference.value)
    }

    @Override
    void deletePersonalPreference(String personId, String namespace, String name) {
        Person person = personService.fetch(personId)
        Preference preference = person.preferences.find {it.namespace == namespace && it.name == name}
        if (preference) person.removePreference(preference)
    }

    @Override
    Set<Preference> listGroupPreferences(String groupId) {
        Group group = groupService.fetch(groupId)
        group.preferences
    }

    @Override
    Preference getGroupPreference(String groupId, String namespace, String name) {
        Group group = groupService.fetch(groupId)
        group.preferences.find {it.namespace == namespace && it.name == name}
    }

    @Override
    Preference setGroupPreference(String groupId, Preference preference) {
        Group group = groupService.fetch(groupId)
        group.setPreference(preference.namespace, preference.name, preference.value)
    }

    @Override
    void deleteGroupPreference(String groupId, String namespace, String name) {
        Group group = groupService.fetch(groupId)
        Preference preference = group.preferences.find {it.namespace == namespace && it.name == name}
        if (preference) group.removePreference(preference)
    }
}
