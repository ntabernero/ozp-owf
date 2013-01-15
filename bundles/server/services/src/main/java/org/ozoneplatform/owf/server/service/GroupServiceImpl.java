package org.ozoneplatform.owf.server.service;

import java.util.ArrayList;
import java.util.List;
import org.ozoneplatform.owf.server.service.model.Group;

public class GroupServiceImpl implements GroupService {

    public List<Group> list() {
        List<Group> list = new ArrayList<Group>();
        list.add(new Group(new Long(1), "Administrators"));
        list.add(new Group(new Long(2), "Users"));
        return list;
    }

    public Group fetch(Long id) {
        Group group = new Group(id, "Administrators");
        return group;
    }

    public Group update(Long id, Group group) {
        group.setId(id);
        return group;
    }

    public Group create(Group group) {
        return group;
    }

    public void delete(Long id) {
        return;
    }
    
}
