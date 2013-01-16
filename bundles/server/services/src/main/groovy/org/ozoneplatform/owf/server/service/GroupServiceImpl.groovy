package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.Group

class GroupServiceImpl implements GroupService {
    
    List<Group> list() {
        List<Group> list = new ArrayList<Group>();
        list.add(new Group(id: new Long(1), name: "Administrators"));
        list.add(new Group(id: new Long(2), name: "Users"));
        return list;
    }

    Group fetch(Long id) {
        Group group = new Group(id: id, name: "Administrators");
        return group;
    }

    Group update(Long id, Group group) {
        group.setId(id);
        return group;
    }

    Group create(Group group) {
        return group;
    }

    void delete(Long id) {
        return;
    }
    
}

