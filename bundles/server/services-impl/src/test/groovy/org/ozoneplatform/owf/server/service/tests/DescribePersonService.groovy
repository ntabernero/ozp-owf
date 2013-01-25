package org.ozoneplatform.owf.server.service.tests

import org.ozoneplatform.owf.server.service.api.exception.NotFoundException
import org.ozoneplatform.owf.server.service.api.exception.ValidationException
import org.ozoneplatform.owf.server.service.api.model.Person
import org.ozoneplatform.owf.server.service.impl.PersonServiceImpl
import spock.lang.Specification

class DescribePersonService extends Specification {
    
    def personService = new PersonServiceImpl()
    
    def "create must receive a valid person"() {
        when: "creating a new person without a username or full name"
        personService.create(new Person())

        then: "throws"
        thrown(ValidationException)
    }
    
    def "create must accept valid login dates"() {
        when: "creating a new person with valid login dates"
        Person person = personService.create(new Person(username: "testUser", fullName: "Test User", email: "testuser@blah.blah", prevLogin: "07/10/2012 10:30:00", lastLogin: "07/14/2012 14:03:31"))

        then: "passes"
        person.username == "testUser"
    }
    
    def "create must reject invalid login dates"() {
        when: "creating a new person with invalid login dates"
        Person person = personService.create(new Person(username: "testUser", fullName: "Test User", email: "testuser@blah.blah", prevLogin: "invalid", lastLogin: "invalid"))

        then: "throws"
        thrown(ValidationException)
    }
    
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
        personService.update(100L, new Person())

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "update must receive a valid person"() {
        when: "updating a person without a username or full name"
        Person person = personService.create(new Person(username: "foo", fullName: "Foo"))
        personService.update(person.id, new Person(username: "    ", fullName: "    "))

        then: "throws"
        thrown(ValidationException)
    }
    
}

