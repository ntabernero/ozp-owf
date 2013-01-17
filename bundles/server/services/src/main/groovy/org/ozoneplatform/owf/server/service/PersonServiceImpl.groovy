package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.Person
import org.ozoneplatform.owf.server.service.exception.ValidationException
import org.ozoneplatform.owf.server.service.exception.NotFoundException

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
        Person thePerson = theList.find{ it.id == id; }
        if (thePerson) {
            thePerson;
        } else {
            throw new NotFoundException("Person not found");
        }
    }

    Person create(Person person) {
        this.validate(person);
        def max = theList.max{ it.id }
        person?.id = max.id + 1L;
        theList.add(person);
        person;
    }

    Person update(Long id, Person person) {
        Person thePerson = this.fetch(id);
        thePerson.username = person?.username ?: thePerson.username;
        thePerson.fullName = person?.fullName ?: thePerson.fullName;
        thePerson.email = person?.email ?: thePerson.email;
        this.validate(thePerson);
        thePerson;
    }

    void delete(Long id) {
        theList.remove(this.fetch(id));
        return;
    }
    
    private void validate(Person person) {
        boolean validUsername = person?.username?.trim()?.length() > 0;
        boolean validFullName = person?.fullName?.trim()?.length() > 0;
        if (!validUsername || !validFullName) {
            throw new ValidationException("Invalid person");
        }
        return;
    }
    
}
