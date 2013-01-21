package org.ozoneplatform.owf.server.rest.cxf.exceptionmap

import org.ozoneplatform.owf.server.service.exception.NotFoundException

import javax.ws.rs.core.Response
import javax.ws.rs.ext.ExceptionMapper
import javax.ws.rs.ext.Provider

@Provider
class NotFoundExceptionMapper implements ExceptionMapper<NotFoundException> {
    @Override
    Response toResponse(NotFoundException e) {
        return Response.status(404).entity(e.message).build()
    }
}
