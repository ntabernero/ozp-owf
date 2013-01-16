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
import org.ozoneplatform.owf.server.service.GroupService;
import org.ozoneplatform.owf.server.service.model.Group;

@Path("/groups")
@Produces("application/json")
class GroupController {
    
    GroupService groupService;

    @GET
    Response list() {
        Response.ok(groupService.list()).build();
    }
    
    @POST
    @Consumes("application/json")
    Response create(Group group) {
        Response.ok(groupService.create(group)).build();
    }
    
    @GET
    @Path("/{id}")
    Response fetch(@PathParam("id") Long id) {
        Response.ok(groupService.fetch(id)).build();
    }
    
    @PUT
    @Path("/{id}")
    @Consumes("application/json")
    Response update(@PathParam("id") Long id, Group group) {
        Response.ok(groupService.update(id, group)).build();
    }
    
    @DELETE
    @Path("/{id}")
    Response delete(@PathParam("id") Long id) {
        groupService.delete(id);
        Response.ok().build();
    }
    
    @GET
    @Path("/{id}/group-dashboards")
    Response listGroupDashboards(@PathParam("id") Long id) {
        Response.ok().build();
    }
}
