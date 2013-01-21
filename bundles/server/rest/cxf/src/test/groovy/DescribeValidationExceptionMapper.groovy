import org.ozoneplatform.owf.server.rest.cxf.exceptionmap.ValidationExceptionMapper
import org.ozoneplatform.owf.server.service.exception.ValidationException
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
