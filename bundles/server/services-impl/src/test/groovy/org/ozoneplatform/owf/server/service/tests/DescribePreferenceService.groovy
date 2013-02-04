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
import ozone.platform.server.model.Preference
import org.ozoneplatform.owf.server.service.impl.PreferenceServiceImpl
import spock.lang.Specification

class DescribePreferenceService extends Specification {
    
    def prefService = new PreferenceServiceImpl()
    
    def "create must receive a valid preference"() {
        when: "creating a new preference without a namespace or path"
        prefService.create(null, null, new Preference())

        then: "throws"
        thrown(Exception)
    }
    
    def "fetch must receive an exisiting namespace and path"() {
        when: "fetching a preference by invalid namespace and path"
        prefService.fetch(null, null)

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "delete must receive an exisiting namespace and path"() {
        when: "deleting a preference by invalid namespace and path"
        prefService.delete(null, null)

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "update must receive an exisiting namespace and path"() {
        when: "updating a preference by invalid namespace and path"
        prefService.update(null, null, new Preference())

        then: "throws"
        thrown(Exception)
    }
    
}

