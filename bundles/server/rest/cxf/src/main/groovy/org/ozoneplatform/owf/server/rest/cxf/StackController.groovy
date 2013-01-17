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
import org.ozoneplatform.owf.server.service.exception.NotFoundException;
import org.ozoneplatform.owf.server.service.exception.ValidationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.core.UriBuilder;

@Path("/stacks")
@Produces("application/json")
class StackController {
    
    StackService stackService;
    
    @Context
    private UriInfo uriInfo;

    @GET
    Response list() {
        try {
            List<Stack> list = stackService.list();
            if (list && !list.empty) {
                Response.ok(list).build();
            } else {
                Response.noContent().build();
            }
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @POST
    @Consumes("application/json")
    Response create(Stack stack) {
        try {
            Stack theStack = stackService.create(stack);
            URI stackUri;
            UriBuilder builder = uriInfo.getBaseUriBuilder();
            builder.path(StackController.class);
            builder.path(StackController.class.getMethod("fetch", Long.class));
            stackUri = builder.build(stack.id);
            Response.created(stackUri).entity(theStack).build();
        } catch(ValidationException v) {
            Response.status(400).entity(v.getMessage()).build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @POST
    @Path("/import-operation")
    Response doImport(Stack stack) {
        try {
            Stack theStack = stackService.doImport(stack);
            URI stackUri;
            UriBuilder builder = uriInfo.getBaseUriBuilder();
            builder.path(StackController.class);
            builder.path(StackController.class.getMethod("fetch", Long.class));
            stackUri = builder.build(stack.id);
            Response.created(stackUri).entity(theStack).build();
        } catch(ValidationException v) {
            Response.status(400).entity(v.getMessage()).build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @GET
    @Path("/{id}")
    Response fetch(@PathParam("id") Long id) {
        try {
            Stack theStack = stackService.fetch(id);
            Response.ok(theStack).build();
        } catch(NotFoundException f) {
            Response.status(404).build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @PUT
    @Path("/{id}")
    @Consumes("application/json")
    Response update(@PathParam("id") Long id, Stack stack) {
        try {
            Response.ok(stackService.update(id, stack)).build();
        } catch(NotFoundException f) {
            Response.status(404).build();
        } catch(ValidationException v) {
            Response.status(400).entity(v.getMessage()).build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @DELETE
    @Path("/{id}")
    Response delete(@PathParam("id") Long id) {
        try {
            stackService.delete(id);
            Response.ok().build();
        } catch(NotFoundException f) {
            Response.status(404).build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @GET
    @Path("/{id}/export-operation")
    Response export(@PathParam("id") Long id) {
        try {
            Stack theStack = stackService.export(id);
            Response.ok(theStack).build();
        } catch(NotFoundException f) {
            Response.status(404).build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @POST
    @Path("/{id}/restore-operation")
    Response restore(@PathParam("id") Long id) {
        try {
            Stack theStack = stackService.restore(id);
            Response.ok(theStack).build();
        } catch(NotFoundException f) {
            Response.status(404).build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
}
