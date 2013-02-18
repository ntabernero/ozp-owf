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

import org.ozoneplatform.commons.server.domain.model.DashboardTemplate
import org.ozoneplatform.commons.server.domain.model.Group
import org.ozoneplatform.commons.server.domain.model.Person
import org.ozoneplatform.commons.server.domain.model.Preference
import org.ozoneplatform.owf.server.service.api.DashboardTemplateService
import org.ozoneplatform.owf.server.service.api.GroupService
import org.ozoneplatform.owf.server.service.api.PersonService
import org.ozoneplatform.owf.server.service.api.exception.NotFoundException

class GroupServiceImpl implements GroupService {
    
    def theList = [];

    DashboardTemplateService dashboardTemplateService
    PersonService personService
    
    GroupServiceImpl() {

        def group;
        
        group = new Group("admins");
        group.id = 1L;
        group.displayName = "Administrators";
        group.description = "The administrators group";
        group.setPreference("fooone", "foo.namespace", "foooneval");
        group.setPreference("footwo", "foo.namespace", "footwoval");
        theList.add(group);
        
        group = new Group("users");
        group.id = 2L;
        group.displayName = "Users";
        group.description = "The users group";
        group.setPreference("barone", "bar.namespace", "baroneval");
        group.setPreference("bartwo", "bar.namespace", "bartwoval");
        theList.add(group);

    }
    
    List<Group> list() {
        theList;
    }

    Group fetch(String id) {
        Group theGroup = theList.find{ it.id == id; }
        if (theGroup) {
            theGroup;
        } else {
            throw new NotFoundException("Group not found");
        }
    }

    Group update(String id, Group group) {
        Group theGroup = this.fetch(id);
        theGroup.name = group?.name ?: theGroup.name;
        theGroup.displayName = group?.displayName ?: theGroup.displayName;
        theGroup.description = group?.description ?: theGroup.description;
        theGroup.active = group?.active;
        theGroup.automatic = group?.automatic;
        theGroup;
    }

    Group create(Group group) {
        def max = theList.max{ it.id }
        group?.id = max.id + 1L;
        theList.add(group);
        group;
    }

    void delete(String id) {
        theList.remove(this.fetch(id));
        return;
    }

    @Override
    Group addDashboardTemplate(String groupId, String dashboardTemplateId) {
        def group = fetch(groupId)
        if (!group) throw new NotFoundException("Group with id ${groupId} was not found")
        def template = dashboardTemplateService.get(dashboardTemplateId)
        if (!template) throw new NotFoundException("Dashboard template with id ${dashboardTemplateId} was not found")
        group.addDashboardTemplate(template);
        group
    }

    @Override
    Group removeDashboardTemplate(String groupId, String dashboardTemplateId) {
        def group = fetch(groupId)
        if (!group) throw new NotFoundException("Group with id ${groupId} was not found")
        def template = dashboardTemplateService.get(dashboardTemplateId)
        if (!template) throw new NotFoundException("Dashboard template with id ${dashboardTemplateId} was not found")
        group.removeDashboardTemplate(template);
        group
    }

    @Override
    Set<DashboardTemplate> getDashboardTemplates(String id) {
        def group = fetch(id)
        if (!group) throw new NotFoundException("Group with id ${id} was not found")
        group.dashboardTemplates
    }

    @Override
    Group addPerson(String groupId, String personId) {
        Group group = fetch(groupId)
        if (!group) throw new NotFoundException("Group with id ${groupId} was not found")
        Person person = personService.fetch(personId)
        if (!person) throw new NotFoundException("Person with id ${personId} was not found")
        group.addPerson(person)
        group
    }

    @Override
    Group removePerson(String groupId, String personId) {
        Group group = fetch(groupId)
        if (!group) throw new NotFoundException("Group with id ${groupId} was not found")
        Person person = personService.fetch(personId)
        if (!person) throw new NotFoundException("Person with id ${personId} was not found")
        group.removePerson(person)
        group
    }

    @Override
    Set<Person> getPersons(String groupId) {
        Group group = fetch(groupId)
        if (!group) throw new NotFoundException("Group with id ${groupId} was not found")
        group.persons
    }

    Set<Preference> listPreferences(Long id) {
        Group theGroup = this.fetch(id);
        return theGroup.preferences;
    }
    
    Set<Preference> listPreferences(Long id, String namespace) {
        Group theGroup = this.fetch(id);
        return theGroup.preferences.findAll{ it.namespace == namespace; };
    }
    
    Preference fetchPreference(Long id, String namespace, String name) {
        Group theGroup = this.fetch(id);
        return theGroup.preferences.find{ it.namespace == namespace && it.name == name; };
    }
    
}
