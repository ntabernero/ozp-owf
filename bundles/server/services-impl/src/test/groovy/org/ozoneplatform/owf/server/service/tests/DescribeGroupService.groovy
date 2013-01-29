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

import org.ozoneplatform.owf.server.service.api.exception.NotFoundException
import org.ozoneplatform.owf.server.service.api.exception.ValidationException
import org.ozoneplatform.owf.server.service.api.model.Group
import org.ozoneplatform.owf.server.service.impl.GroupServiceImpl
import spock.lang.Specification

class DescribeGroupService extends Specification {
    
    def groupService = new GroupServiceImpl()
    
    def "create must receive a valid group"() {
        when: "creating a new group without a name"
        groupService.create(new Group())

        then: "throws"
        thrown(ValidationException)
    }
    
    def "fetch must receive an exisiting id"() {
        when: "fetching a group by invalid id"
        groupService.fetch(100L)

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "delete must receive an exisiting id"() {
        when: "deleting a group by invalid id"
        groupService.delete(100L)

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "update must receive an exisiting id"() {
        when: "updating a group by invalid id"
        groupService.update(100L, new Group())

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "update must receive a valid group"() {
        when: "updating a group without a name"
        Group group = groupService.create(new Group(name: "foo"))
        groupService.update(group.id, new Group(name: "    "))

        then: "throws"
        thrown(ValidationException)
    }
    
}
