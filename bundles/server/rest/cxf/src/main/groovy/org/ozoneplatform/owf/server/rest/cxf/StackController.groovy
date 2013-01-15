package org.ozoneplatform.owf.server.rest.cxf

import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.ozoneplatform.owf.server.service.StackService;
import org.ozoneplatform.owf.server.service.model.Stack;

@Path("/stacks")
@Produces("application/json")
public class StackController {
    
    private StackService stackService;

    public StackService getStackService() {
        return stackService;
    }

    public void setStackService(StackService stackService) {
        this.stackService = stackService;
    }
    
    @GET
    public Response list() {
        
        List<Stack> theList = stackService.list();
        return Response.ok(theList).build();
    }
    
    @POST
    @Consumes("application/json")
    public Response create(Stack stack) {
        Stack theStack = stackService.create(stack);
        return Response.ok(theStack).build();
    }
    
    @POST
    @Path("/import-operation")
    public Response doImport(Stack stack) {
        Stack theStack = stackService.doImport(stack);
        return Response.ok(theStack).build();
    }
    
    @GET
    @Path("/{id}")
    public Response fetch(@PathParam("id") Long id) {
        
        Stack theStack = stackService.fetch(id);
        return Response.ok(theStack).build();
    }
    
    @PUT
    @Path("/{id}")
    @Consumes("application/json")
    public Response update(@PathParam("id") Long id, Stack stack) {
        Stack theStack = stackService.update(id, stack);
        return Response.ok(theStack).build();
    }
    
    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        stackService.delete(id);
        return Response.ok().build();
    }
    
    @GET
    @Path("/{id}/export-operation")
    public Response export(@PathParam("id") Long id) {
        
        Stack theStack = stackService.export(id);
        return Response.ok(theStack).build();
    }
    
    @POST
    @Path("/{id}/restore-operation")
    public Response restore(@PathParam("id") Long id) {
        
        Stack theStack = stackService.restore(id);
        return Response.ok(theStack).build();
    }
    
}
