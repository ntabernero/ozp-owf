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

import org.ozoneplatform.owf.server.rest.exceptionmap.ValidationExceptionMapper
import org.ozoneplatform.owf.server.service.api.exception.ValidationException
import spock.lang.Specification

class DescribeValidationExceptionMapper extends Specification {

    def "it returns a 400 when a validation exception occurs"() {
        given:
        def mapper = new ValidationExceptionMapper();
        def exception = new ValidationException();

        when:
        def response = mapper.toResponse(exception)

        then:
        response.status == 400
    }
}
