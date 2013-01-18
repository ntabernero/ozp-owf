package org.ozoneplatform.owf.server.service.tests

import org.ozoneplatform.owf.server.service.PersonServiceImpl
import org.ozoneplatform.owf.server.service.exception.NotFoundException
import org.ozoneplatform.owf.server.service.exception.ValidationException
import org.ozoneplatform.owf.server.service.model.Person
import spock.lang.Specification

class DescribePersonService extends Specification {
    
    def personService = new PersonServiceImpl()
    
    def "create must receive a valid person"() {
        when: "creating a new person without a username or full name"
        personService.create(new Person())

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
    
}

