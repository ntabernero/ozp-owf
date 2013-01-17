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
import org.ozoneplatform.owf.server.service.exception.NotFoundException;
import org.ozoneplatform.owf.server.service.exception.ValidationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.core.UriBuilder;

@Path("/groups")
@Produces("application/json")
class GroupController {
    
    GroupService groupService;
    
    @Context
    private UriInfo uriInfo;

    @GET
    Response list() {
        try {
            List<Group> list = groupService.list();
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
    Response create(Group group) {
        try {
            Group theGroup = groupService.create(group);
            URI groupUri;
            UriBuilder builder = uriInfo.getBaseUriBuilder();
            builder.path(GroupController.class);
            builder.path(GroupController.class.getMethod("fetch", Long.class));
            groupUri = builder.build(group.id);
            Response.created(groupUri).entity(theGroup).build();
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
            Group theGroup = groupService.fetch(id);
            Response.ok(theGroup).build();
        } catch(NotFoundException f) {
            Response.status(404).build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @PUT
    @Path("/{id}")
    @Consumes("application/json")
    Response update(@PathParam("id") Long id, Group group) {
        try {
            Response.ok(groupService.update(id, group)).build();
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
            groupService.delete(id);
            Response.ok().build();
        } catch(NotFoundException f) {
            Response.status(404).build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @GET
    @Path("/{id}/group-dashboards")
    Response listGroupDashboards(@PathParam("id") Long id) {
        Response.ok().build();
    }
}
