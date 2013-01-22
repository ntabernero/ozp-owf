package org.ozoneplatform.owf.server.service.tests

import org.ozoneplatform.owf.server.service.api.exception.NotFoundException
import org.ozoneplatform.owf.server.service.api.exception.ValidationException
import org.ozoneplatform.owf.server.service.impl.StackServiceImpl
import org.ozoneplatform.owf.server.service.api.model.Stack
import spock.lang.Specification

class DescribeStackService extends Specification {
    
    def stackService = new StackServiceImpl()
    
    def "create must receive a valid stack"() {
        when: "creating a new stack without a name"
        stackService.create(new Stack())

        then: "throws"
        thrown(ValidationException)
    }
    
    def "fetch must receive an exisiting id"() {
        when: "fetching a stack by invalid id"
        stackService.fetch(100L)

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "delete must receive an exisiting id"() {
        when: "deleting a stack by invalid id"
        stackService.delete(100L)

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "update must receive an exisiting id"() {
        when: "updating a stack by invalid id"
        stackService.update(100L, new Stack())

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "import must receive a valid stack"() {
        when: "importing a new stack without a name"
        stackService.doImport(new Stack())

        then: "throws"
        thrown(ValidationException)
    }
    
    def "export must receive an exisiting id"() {
        when: "exporting a stack by invalid id"
        stackService.export(100L)

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "restore must receive an exisiting id"() {
        when: "restoring a stack by invalid id"
        stackService.restore(100L)

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "update must receive a valid stack"() {
        when: "updating a stack without a name"
        Stack stack = stackService.create(new Stack(name: "foo"))
        stackService.update(stack.id, new Stack(name: "    "))

        then: "throws"
        thrown(ValidationException)
    }
    
}

