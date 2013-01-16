package org.ozoneplatform.owf.server.rest.cxf

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import org.ozoneplatform.owf.server.service.StackService;
import org.ozoneplatform.owf.server.service.model.Stack;

@Path("/stacks")
@Produces("application/json")
class StackController {
    
    StackService stackService;

    @GET
    Response list() {
        Response.ok(stackService.list()).build();
    }
    
    @POST
    @Consumes("application/json")
    Response create(Stack stack) {
        Response.ok(stackService.create(stack)).build();
    }
    
    @POST
    @Path("/import-operation")
    Response doImport(Stack stack) {
        Response.ok(stackService.doImport(stack)).build();
    }
    
    @GET
    @Path("/{id}")
    Response fetch(@PathParam("id") Long id) {
        Response.ok(stackService.fetch(id)).build();
    }
    
    @PUT
    @Path("/{id}")
    @Consumes("application/json")
    Response update(@PathParam("id") Long id, Stack stack) {
        Response.ok(stackService.update(id, stack)).build();
    }
    
    @DELETE
    @Path("/{id}")
    Response delete(@PathParam("id") Long id) {
        stackService.delete(id);
        Response.ok().build();
    }
    
    @GET
    @Path("/{id}/export-operation")
    Response export(@PathParam("id") Long id) {
        Response.ok(stackService.export(id)).build();
    }
    
    @POST
    @Path("/{id}/restore-operation")
    Response restore(@PathParam("id") Long id) {
        Response.ok(stackService.restore(id)).build();
    }
    
}
