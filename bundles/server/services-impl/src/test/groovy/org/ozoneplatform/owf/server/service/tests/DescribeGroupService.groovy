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

import org.ozoneplatform.commons.server.domain.model.Group
import org.ozoneplatform.commons.server.domain.model.Person
import org.ozoneplatform.owf.server.service.api.exception.NotFoundException
import org.ozoneplatform.owf.server.service.impl.GroupServiceImpl
import org.ozoneplatform.owf.server.service.impl.PersonServiceImpl
import spock.lang.Shared
import spock.lang.Specification

class DescribeGroupService extends Specification {

    @Shared def groupService = new GroupServiceImpl()
    @Shared def personService = new PersonServiceImpl()
    /*
    def "create must receive a valid group"() {
        when: "creating a new group without a name"
        groupService.create(new Group())

        then: "throws"
        thrown(AssertionError)
    }
    */

    def setupSpec() {
        groupService.personService = personService
        personService.groupService = groupService
    }
    
    def "fetch must receive an exisiting id"() {
        when: "fetching a group by invalid id"
        groupService.fetch("100")

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "delete must receive an exisiting id"() {
        when: "deleting a group by invalid id"
        groupService.delete("100")

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "update must receive an exisiting id"() {
        when: "updating a group by invalid id"
        groupService.update("100", new Group("foo"))

        then: "throws"
        thrown(NotFoundException)
    }
    
    /*
    def "update must receive a valid group"() {
        when: "updating a group without a name"
        Group group = groupService.create(new Group("foo"))
        groupService.update(group.id, new Group())

        then: "throws"
        thrown(AssertionError)
    }
    */

    def "add and retrieve persons"() {
        def person = personService.create(new Person('username', 'full name'))
        def group = groupService.create(new Group('group1'))

        when: "adding a person to a group"
        groupService.addPerson(group.id, person.id)

        then:
        def persons = groupService.getPersons(group.id)
        persons.size() == 1
        persons.find { it.id == person.id } != null
    }

    def "add and remove persons"() {
        def person1 = personService.create(new Person('username1', 'full name'))
        def person2 = personService.create(new Person('username2', 'full name'))
        def group = groupService.create(new Group('group1'))

        when: "adding a person to a group"
        groupService.addPerson(group.id, person1.id)
        groupService.addPerson(group.id, person2.id)
        groupService.removePerson(group.id, person1.id)

        then:
        def persons = groupService.getPersons(group.id)
        persons?.size() == 1
        persons.find { it.id == person2.id } != null
    }


}
