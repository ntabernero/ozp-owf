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

import org.ozoneplatform.owf.server.rest.exceptionmap.NotFoundExceptionMapper
import org.ozoneplatform.owf.server.service.api.exception.NotFoundException
import spock.lang.Specification

class DescribeNotFoundExceptionMapper extends Specification {

    def "it returns a 404 when an entity is not found"() {
        given:
        def mapper = new NotFoundExceptionMapper();
        def exception = new NotFoundException();

        when:
        def response = mapper.toResponse(exception)

        then:
        response.status == 404
    }
}
