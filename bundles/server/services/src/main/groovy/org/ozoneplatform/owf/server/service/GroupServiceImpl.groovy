package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.Group
import org.ozoneplatform.owf.server.service.exception.ValidationException
import org.ozoneplatform.owf.server.service.exception.NotFoundException

class GroupServiceImpl implements GroupService {
    
    def theList = [];
    
    GroupServiceImpl() {
        theList.add(new Group(id: 1L, name: "admins", displayName: "Administrators", description: "The administrators group"));
        theList.add(new Group(id: 2L, name: "users", displayName: "Users", description: "The users group"));
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
            throw new ValidationException("Invalid group");
        }
        return;
    }
    
}
