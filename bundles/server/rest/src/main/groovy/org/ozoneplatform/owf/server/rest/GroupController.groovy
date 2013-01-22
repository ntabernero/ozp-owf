package org.ozoneplatform.owf.server.rest

import org.ozoneplatform.owf.server.service.api.GroupService
import org.ozoneplatform.owf.server.service.api.model.Group

import javax.ws.rs.*
import javax.ws.rs.core.Context
import javax.ws.rs.core.Response
import javax.ws.rs.core.UriBuilder
import javax.ws.rs.core.UriInfo

@Path("/groups")
@Produces("application/json")
class GroupController {

    GroupService groupService;

    @Context
    private UriInfo uriInfo;

    @GET
    Response list() {
        List<Group> list = groupService.list();
        if (list && !list.empty) {
            Response.ok(list).build();
        } else {
            Response.noContent().build();
        }

    }

    @POST
    @Consumes("application/json")
    Response create(Group group) {
        Group theGroup = groupService.create(group);
        URI groupUri;
        UriBuilder builder = uriInfo.getBaseUriBuilder();
        builder.path(GroupController.class);
        builder.path(GroupController.class.getMethod("fetch", Long.class));
        groupUri = builder.build(group.id);
        Response.created(groupUri).entity(theGroup).build();
    }

    @GET
    @Path("/{id}")
    Response fetch(@PathParam("id") Long id) {
        Group theGroup = groupService.fetch(id);
        Response.ok(theGroup).build();
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
