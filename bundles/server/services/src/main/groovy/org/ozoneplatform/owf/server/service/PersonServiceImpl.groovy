package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.Person

class PersonServiceImpl implements PersonService {
    
    def theList = [];
    
    PersonServiceImpl() {
        theList.add(new Person(id: 1L, username: "testUser1", fullName: "Test User 1", email: "testuser1@blah.blah"));
        theList.add(new Person(id: 2L, username: "testUser2", fullName: "Test User 2", email: "testuser2@blah.blah"));
        theList.add(new Person(id: 3L, username: "testAdmin1", fullName: "Test Administrator 1", email: "testadmin1@blah.blah"));
    }
    
    List<Person> list() {
        theList;
    }

    Person fetch(Long id) {
        theList.find{ it.id == id; }
    }

    Person create(Person person) {
        def max = theList.max{ it.id }
        person?.id = max.id + 1L;
        theList.add(person);
        person;
    }

    Person update(Long id, Person person) {
        Person thePerson = this.fetch(id);
        if (person?.username) thePerson?.username = person.username;
        if (person?.fullName) thePerson?.fullName = person.fullName;
        if (person?.email) thePerson?.email = person.email;
        thePerson;
    }

    void delete(Long id) {
        theList.remove(this.fetch(id));
        return;
    }
    
}

