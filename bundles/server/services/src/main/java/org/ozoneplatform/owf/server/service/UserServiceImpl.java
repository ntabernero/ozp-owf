package org.ozoneplatform.owf.server.service;

import java.util.ArrayList;
import java.util.List;
import org.ozoneplatform.owf.server.service.model.User;

public class UserServiceImpl implements UserService {

    public List<User> list() {
        List<User> list = new ArrayList<User>();
        list.add(new User(new Long(1), "userone", "This is user one.", "userone@blah.blah"));
        list.add(new User(new Long(2), "usertwo", "This is user two.", "usertwo@blah.blah"));
        return list;
    }

    public User fetch(Long id) {
        User user = new User(id, "userone", "This is user one.", "userone@blah.blah");
        return user;
    }

    public User create(User user) {
        return user;
    }

    public User update(Long id, User user) {
        return user;
    }

    public void delete(Long id) {
        return;
    }
    
}
