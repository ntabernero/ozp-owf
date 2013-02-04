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
import ozone.platform.server.model.Group

class GroupServiceImpl implements GroupService {
    
    def theList = [];
    
    GroupServiceImpl() {
        def group = new Group('admins')
        group.id = 1
        group.displayName = 'Administrators'
        group.description = 'The administrators group'
        theList << group

        group = new Group('users')
        group.id = 2
        group.displayName = 'Users'
        group.description = 'The users group'
        theList << group
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
        this.validate(theGroup);
        theGroup;
    }

    Group create(Group group) {
        this.validate(group);
        def max = theList.max{ it.id }
        group?.id = max.id + 1L;
        theList.add(group);
        group;
    }

    void delete(Long id) {
        theList.remove(this.fetch(id));
        return;
    }
    
    private void validate(Group group) {
        boolean validName = group?.name?.trim()?.length() > 0;
        if (!validName) {
            throw new ValidationException("Name is required");
        }
        return;
    }
    
}
