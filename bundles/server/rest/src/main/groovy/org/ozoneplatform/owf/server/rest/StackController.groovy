package org.ozoneplatform.owf.server.rest

import org.ozoneplatform.owf.server.service.api.StackService
import org.ozoneplatform.owf.server.service.api.model.Stack

import javax.ws.rs.*
import javax.ws.rs.core.Context
import javax.ws.rs.core.Response
import javax.ws.rs.core.UriBuilder
import javax.ws.rs.core.UriInfo

@Path("/stacks")
@Produces("application/json")
class StackController {

    StackService stackService;

    @Context
    private UriInfo uriInfo;

    @GET
    Response list() {
        List<Stack> list = stackService.list();
        if (list && !list.empty) {
            Response.ok(list).build();
        } else {
            Response.noContent().build();
        }
    }

    @POST
    @Consumes("application/json")
    Response create(Stack stack) {
        Stack theStack = stackService.create(stack);
        URI stackUri;
        UriBuilder builder = uriInfo.getBaseUriBuilder();
        builder.path(StackController.class);
        builder.path(StackController.class.getMethod("fetch", Long.class));
        stackUri = builder.build(stack.id);
        Response.created(stackUri).entity(theStack).build();
    }

    @POST
    @Path("/import-operation")
    Response doImport(Stack stack) {
        Stack theStack = stackService.doImport(stack);
        URI stackUri;
        UriBuilder builder = uriInfo.getBaseUriBuilder();
        builder.path(StackController.class);
        builder.path(StackController.class.getMethod("fetch", Long.class));
        stackUri = builder.build(stack.id);
        Response.created(stackUri).entity(theStack).build();
    }

    @GET
    @Path("/{id}")
    Response fetch(@PathParam("id") Long id) {
        Stack theStack = stackService.fetch(id);
        Response.ok(theStack).build();
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
        Stack theStack = stackService.export(id);
        Response.ok(theStack).build();
    }

    @POST
    @Path("/{id}/restore-operation")
    Response restore(@PathParam("id") Long id) {
        Stack theStack = stackService.restore(id);
        Response.ok(theStack).build();
    }

}
