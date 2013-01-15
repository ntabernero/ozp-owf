package org.ozoneplatform.owf.server.service;

import java.util.List;
import org.ozoneplatform.owf.server.service.model.Group;

public interface GroupService {
    
    List<Group> list();
    Group fetch(Long id);
    Group update(Long id, Group group);
    Group create(Group group);
    void delete(Long id);
    
}
