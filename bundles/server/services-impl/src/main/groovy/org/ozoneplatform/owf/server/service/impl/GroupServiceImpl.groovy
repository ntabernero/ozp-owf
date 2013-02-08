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

import org.ozoneplatform.owf.server.service.api.GroupService
import org.ozoneplatform.owf.server.service.api.exception.*
import org.ozoneplatform.commons.server.domain.model.Group
import org.ozoneplatform.commons.server.domain.model.Preference

class GroupServiceImpl implements GroupService {
    
    def theList = [];
    
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

    Group fetch(Long id) {
        Group theGroup = theList.find{ it.id == id; }
        if (theGroup) {
            theGroup;
        } else {
            throw new NotFoundException("Group not found");
        }
    }

    Group update(Long id, Group group) {
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

    void delete(Long id) {
        theList.remove(this.fetch(id));
        return;
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
