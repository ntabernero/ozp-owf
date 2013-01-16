package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.Person

class PersonServiceImpl implements PersonService {
    
    List<Person> list() {
        List<Person> list = new ArrayList<Person>();
        list.add(new Person(id: new Long(1), userName: "userone", description: "This is user one.", email: "userone@blah.blah"));
        list.add(new Person(id: new Long(2), userName: "usertwo", description: "This is user two.", email: "usertwo@blah.blah"));
        return list;
    }

    Person fetch(Long id) {
        Person person = new Person(id: id, userName: "userone", description: "This is user one.", email: "userone@blah.blah");
        return person;
    }

    Person create(Person person) {
        return person;
    }

    Person update(Long id, Person person) {
        return person;
    }

    void delete(Long id) {
        return;
    }
    
}

