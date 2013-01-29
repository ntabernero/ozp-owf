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
import org.ozoneplatform.owf.server.service.api.model.Intent
import org.ozoneplatform.owf.server.service.impl.IntentServiceImpl
import spock.lang.Specification

class DescribeIntentService extends Specification {
    
    def intentService = new IntentServiceImpl()
    
    def "create must receive a valid intent"() {
        when: "creating a new intent without action or datatype"
        intentService.create(new Intent())

        then: "throws"
        thrown(ValidationException)
    }
    
    def "fetch must receive an exisiting id"() {
        when: "fetching an intent by invalid id"
        intentService.fetch(100L)

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "delete must receive an exisiting id"() {
        when: "deleting an intent by invalid id"
        intentService.delete(100L)

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "update must receive an exisiting id"() {
        when: "updating an intent by invalid id"
        intentService.update(100L, new Intent())

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "update must receive a valid intent"() {
        when: "updating an intent without action or datatype"
        Intent intent = intentService.create(new Intent(action: "foo", dataType: "bar"))
        intentService.update(intent.id, new Intent(action: "    ", dataType: "    "))

        then: "throws"
        thrown(ValidationException)
    }
	
}

