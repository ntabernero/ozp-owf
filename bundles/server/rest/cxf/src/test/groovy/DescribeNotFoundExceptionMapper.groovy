import org.ozoneplatform.owf.server.rest.cxf.exceptionmap.NotFoundExceptionMapper
import org.ozoneplatform.owf.server.service.exception.NotFoundException
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
