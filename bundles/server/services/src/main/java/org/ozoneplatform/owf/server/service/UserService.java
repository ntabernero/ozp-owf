package org.ozoneplatform.owf.server.service;

import java.util.List;
import org.ozoneplatform.owf.server.service.model.User;

public interface UserService {
    
    List<User> list();
    User fetch(Long id);
    User create(User user);
    User update(Long id, User user);
    void delete(Long id);
}
