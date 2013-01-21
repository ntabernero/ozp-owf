package org.ozoneplatform.owf.server.rest.exceptionmap

import org.ozoneplatform.owf.server.service.exception.ValidationException

import javax.ws.rs.core.Response
import javax.ws.rs.ext.ExceptionMapper
import javax.ws.rs.ext.Provider

@Provider
class ValidationExceptionMapper implements ExceptionMapper<ValidationException>{
    @Override
    Response toResponse(ValidationException e) {
        return Response.status(400).entity(e.message).build()
    }
}
