package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.Group

interface GroupService {
    
    List<Group> list();
    Group fetch(Long id);
    Group update(Long id, Group group);
    Group create(Group group);
    void delete(Long id);
    
}

