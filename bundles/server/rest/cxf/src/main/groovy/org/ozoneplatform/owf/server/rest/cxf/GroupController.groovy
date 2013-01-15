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
import org.ozoneplatform.owf.server.service.GroupService;
import org.ozoneplatform.owf.server.service.model.Group;

@Path("/groups")
@Produces("application/json")
public class GroupController {
    
    private GroupService groupService = null;

    public GroupService getGroupService() {
        return groupService;
    }

    public void setGroupService(GroupService groupService) {
        this.groupService = groupService;
    }
    
    @GET
    public Response list() {
        
        List<Group> theList = groupService.list();
        return Response.ok(theList).build();
    }
    
    @POST
    @Consumes("application/json")
    public Response create(Group group) {
        Group theGroup = groupService.create(group);
        return Response.ok(theGroup).build();
    }
    
    @GET
    @Path("/{id}")
    public Response fetch(@PathParam("id") Long id) {
        
        Group theGroup = groupService.fetch(id);
        return Response.ok(theGroup).build();
    }
    
    @PUT
    @Path("/{id}")
    @Consumes("application/json")
    public Response update(@PathParam("id") Long id, Group group) {
        Group theGroup = groupService.update(id, group);
        return Response.ok(theGroup).build();
    }
    
    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        groupService.delete(id);
        return Response.ok().build();
    }
    
    @GET
    @Path("/{id}/group-dashboards")
    public Response listGroupDashboards(@PathParam("id") Long id) {
        
        // This should return a list of RESTful URLs for Group Dashboards
        return Response.ok().build();
    }
}
