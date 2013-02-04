/* 
   Copyright 2013 Next Century Corporation 

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

package org.ozoneplatform.owf.server.service.impl

import org.ozoneplatform.owf.server.service.api.PersonService
import ozone.platform.server.model.Person
import org.ozoneplatform.owf.server.service.api.exception.*

import java.text.DateFormat
import java.text.ParseException
import java.text.SimpleDateFormat

class PersonServiceImpl implements PersonService {
    
    def theList = [];
    
    PersonServiceImpl() {
        theList.add(new Person("testUser1", "Test User 1"));
        theList.add(new Person("testUser2", "Test User 2"));
        theList.add(new Person("testAdmin1", "Test Administrator 1"));
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
