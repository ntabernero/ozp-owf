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

import org.ozoneplatform.commons.server.domain.model.Person
import org.ozoneplatform.commons.server.domain.model.Preference
import org.ozoneplatform.owf.server.service.api.PersonService
import org.ozoneplatform.owf.server.service.api.exception.NotFoundException
import org.ozoneplatform.owf.server.service.api.exception.ValidationException

import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.Calendar
import org.ozoneplatform.owf.server.service.api.PersonService
import org.ozoneplatform.owf.server.service.api.exception.*

class PersonServiceImpl implements PersonService {
    
    def theList = [];
    
    PersonServiceImpl() {

        DateFormat fmt = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
        Calendar cal = Calendar.instance
        def person
        
        person = new Person("testUser1", "Test User 1");
        person.id = 1L;
        person.email = "testuser1@blah.blah";
        cal.time = fmt.parse("07/10/2012 10:30:00");
        person.prevLogin = (Calendar)cal.clone();
        cal.time = fmt.parse("07/14/2012 14:03:31");
        person.lastLogin = (Calendar)cal.clone();
        person.setPreference("fooone", "foo.namespace", "foooneval");
        person.setPreference("footwo", "foo.namespace", "footwoval");
        theList.add(person);
        
        person = new Person("testUser2", "Test User 2");
        person.id = 2L;
        person.email = "testuser2@blah.blah";
        cal.time = fmt.parse("11/06/2012 12:36:21");
        person.prevLogin = (Calendar)cal.clone();
        cal.time = fmt.parse("11/08/2012 16:58:05");
        person.lastLogin = (Calendar)cal.clone();
        person.setPreference("bartwo", "bar.namespace", "bartwoval");
        theList.add(person);
        
        person = new Person("testAdmin1", "Test Administrator 1");
        person.id = 3L;
        person.email = "testadmin1@blah.blah";
        cal.time = fmt.parse("09/25/2012 10:30:00");
        person.prevLogin = (Calendar)cal.clone();
        cal.time = fmt.parse("09/26/2012 14:03:31");
        person.lastLogin = (Calendar)cal.clone();
        person.setPreference("bartwo", "bar.namespace", "bartwoval");
        theList.add(person);

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
        if (!validUsername) {
            throw new ValidationException("Username is required");
        }
        if (!validFullName) {
            throw new ValidationException("Full Name is required");
        }
        return;
    }
    
    Set<Preference> listPreferences(Long id) {
        Person thePerson = this.fetch(id);
        return thePerson.preferences;
    }
    
    Set<Preference> listPreferences(Long id, String namespace) {
        Person thePerson = this.fetch(id);
        return thePerson.preferences.findAll{ it.namespace == namespace; };
    }
    
    Preference fetchPreference(Long id, String namespace, String name) {
        Person thePerson = this.fetch(id);
        return thePerson.preferences.find{ it.namespace == namespace && it.name == name; };
    }
    
}
