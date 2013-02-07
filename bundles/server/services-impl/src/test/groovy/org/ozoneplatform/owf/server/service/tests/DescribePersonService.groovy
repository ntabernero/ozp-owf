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

package org.ozoneplatform.owf.server.service.tests

import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.Calendar
import org.ozoneplatform.owf.server.service.api.exception.NotFoundException
import org.ozoneplatform.owf.server.service.api.exception.ValidationException
import org.ozoneplatform.owf.server.service.impl.PersonServiceImpl
import org.ozoneplatform.commons.server.domain.model.Person
import spock.lang.Specification

class DescribePersonService extends Specification {
    
    def personService = new PersonServiceImpl()
    DateFormat fmt = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss")
    Calendar cal = Calendar.instance
    
    def "create must receive a valid person"() {
        when: "creating a new person without a username or full name"
        personService.create(new Person())

        then: "throws"
        thrown(Exception)
    }
    
    def "create must accept valid login dates"() {
        when: "creating a new person with valid login dates"
        def p = new Person("testUser", "Test User")
        p.email = "testuser@blah.blah"
        cal.time = fmt.parse("07/10/2012 10:30:00")
        p.prevLogin = cal.clone()
        cal.time = fmt.parse("07/14/2012 14:03:31")
        p.lastLogin = cal.clone()
        Person person = personService.create(p)

        then: "passes"
        person.username == "testUser"
    }
    
    /*
    def "create must reject invalid login dates"() {
        when: "creating a new person with invalid login dates"
        Person person = personService.create(new Person(username: "testUser", fullName: "Test User", email: "testuser@blah.blah", prevLogin: "invalid", lastLogin: "invalid"))

        then: "throws"
        thrown(ValidationException)
    }
    */
    
    def "fetch must receive an exisiting id"() {
        when: "fetching a person by invalid id"
        personService.fetch(100L)

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "delete must receive an exisiting id"() {
        when: "deleting a person by invalid id"
        personService.delete(100L)

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "update must receive an exisiting id"() {
        when: "updating a person by invalid id"
        personService.update(100L, new Person("foo", "Foo"))

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "update must receive a valid person"() {
        when: "updating a person without a username or full name"
        Person person = personService.create(new Person("foo", "Foo"))
        personService.update(person.id, new Person())

        then: "throws"
        thrown(Exception)
    }
    
}

