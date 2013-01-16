package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.Group

class GroupServiceImpl implements GroupService {
    
    def theList = [];
    
    GroupServiceImpl() {
        theList.add(new Group(id: 1L, name: "Admins"));
        theList.add(new Group(id: 2L, name: "Users"));
    }
    
    List<Group> list() {
        theList;
    }

    Group fetch(Long id) {
        Group group;
        group = theList.find{ it.id == id; }
    }

    Group update(Long id, Group group) {
        Group theGroup = this.fetch(id);
        theGroup?.name = group?.name;
        theGroup;
    }

    Group create(Group group) {
        def max = theList.max{ it.id }
        group?.id = max.id + 1L;
        theList.add(group);
        group;
    }

    void delete(Long id) {
        Group theGroup = this.fetch(id);
        theList.remove(theGroup);
        return;
    }
    
}

