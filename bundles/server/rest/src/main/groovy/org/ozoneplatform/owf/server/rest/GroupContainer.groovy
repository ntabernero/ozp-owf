package org.ozoneplatform.owf.server.rest

import org.ozoneplatform.commons.server.domain.model.Group

import javax.ws.rs.*
import javax.ws.rs.core.Response

class GroupContainer {

    def delegator
    GroupContainer(def delegator) {
        this.delegator = delegator
    }

    /**
     * Adds a group to the specified container
     */
    @POST
    @Path("/{id}/groups")
    Response addGroup(@PathParam("id") String id, Group groupInfo) {
        def container = delegator.service.addGroup(id, groupInfo.id)
        Response.ok(container).build()
    }

    /**
     * Removes a group from the specified container
     */
    @DELETE
    @Path("/{id}/groups")
    Response removeGroup(@PathParam("id") String id, Group groupInfo) {
        def container = delegator.service.removeGroup(id, groupInfo.id)
        Response.ok(container).build()
    }

    /**
     * Returns the list of groups of the specified container
     */
    @GET
    @Path("/{id}/groups")
    Response getGroups(@PathParam("id") String id) {
        def groups = delegator.service.getGroups(id)
        Response.ok(groups).build()
    }
}