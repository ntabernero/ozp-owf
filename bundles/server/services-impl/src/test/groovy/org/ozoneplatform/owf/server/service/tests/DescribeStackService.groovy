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

import org.ozoneplatform.commons.server.domain.model.Stack
import org.ozoneplatform.owf.server.service.api.exception.NotFoundException
import org.ozoneplatform.owf.server.service.impl.StackServiceImpl
import spock.lang.Specification

class DescribeStackService extends Specification {
    
    def stackService = new StackServiceImpl()
    
    def "create must receive a valid stack"() {
        when: "creating a new stack without a name"
        stackService.create(new Stack())

        then: "throws"
        thrown(Exception)
    }
    
    def "fetch must receive an exisiting id"() {
        when: "fetching a stack by invalid id"
        stackService.fetch("100")

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "delete must receive an exisiting id"() {
        when: "deleting a stack by invalid id"
        stackService.delete("100")

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "update must receive an exisiting id"() {
        when: "updating a stack by invalid id"
        stackService.update("100", new Stack("Stack Foo", "stackfoo"))

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "import must receive a valid stack"() {
        when: "importing a new stack without a name"
        stackService.doImport(new Stack())

        then: "throws"
        thrown(Exception)
    }
    
    def "export must receive an exisiting id"() {
        when: "exporting a stack by invalid id"
        stackService.export("100")

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "restore must receive an exisiting id"() {
        when: "restoring a stack by invalid id"
        stackService.restore("100")

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "update must receive a valid stack"() {
        when: "updating a stack without a name"
        Stack stack = stackService.create(new Stack("Stack Foo", "stackfoo"))
        stackService.update(stack.id, new Stack(null, null))

        then: "throws"
        thrown(Exception)
    }
    
}

