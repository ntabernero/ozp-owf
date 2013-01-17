package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.Group

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
        theList.find{ it.id == id; }
    }

    Group update(Long id, Group group) {
        Group theGroup = this.fetch(id);
        if (group?.name) theGroup?.name = group.name;
        if (group?.displayName) theGroup?.displayName = group.displayName;
        if (group?.description) theGroup?.description = group.description;
        theGroup?.active = group?.active;
        theGroup?.automatic = group?.automatic;
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
    
}

