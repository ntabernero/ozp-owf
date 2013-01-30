package org.ozoneplatform.owf.server.service.impl

import org.ozoneplatform.owf.server.service.api.PersonService
import org.ozoneplatform.owf.server.service.api.model.Person
import org.ozoneplatform.owf.server.service.api.exception.*

import java.text.DateFormat
import java.text.ParseException
import java.text.SimpleDateFormat

class PersonServiceImpl implements PersonService {
    
    def theList = [];
    
    PersonServiceImpl() {
        theList.add(new Person(id: 1L, username: "testUser1", fullName: "Test User 1", email: "testuser1@blah.blah", prevLogin: "07/10/2012 10:30:00", lastLogin: "07/14/2012 14:03:31"));
        theList.add(new Person(id: 2L, username: "testUser2", fullName: "Test User 2", email: "testuser2@blah.blah", prevLogin: "11/06/2012 12:36:21", lastLogin: "11/08/2012 16:58:05"));
        theList.add(new Person(id: 3L, username: "testAdmin1", fullName: "Test Administrator 1", email: "testadmin1@blah.blah", prevLogin: "09/25/2012 10:30:00", lastLogin: "09/26/2012 14:03:31"));
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
        DateFormat fmt = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
        if (!validUsername) {
            throw new ValidationException("Username is required");
        }
        if (!validFullName) {
            throw new ValidationException("Full Name is required");
        }
        if (person?.prevLogin) {
            try {
                fmt.parse(person.prevLogin)
            } catch(ParseException e) {
                throw new ValidationException("Previous login date is invalid");
            }
        }
        if (person?.lastLogin) {
            try {
                fmt.parse(person.lastLogin)
            } catch(ParseException e) {
                throw new ValidationException("Last login date is invalid");
            }
        }
        return;
    }
    
}
