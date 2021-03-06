/* 
   Copyright 2013 Next Century Corporation 

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
package org.ozoneplatform.owf.server.rest

import org.ozoneplatform.commons.server.domain.model.Group
import org.ozoneplatform.owf.server.service.api.GroupService

import javax.ws.rs.*
import javax.ws.rs.core.Context
import javax.ws.rs.core.Response

//import javax.annotation.security.*
import javax.ws.rs.core.UriBuilder
import javax.ws.rs.core.UriInfo

@Path("/")
@Produces("application/json")
class GroupController {

    GroupService service;
    @Delegate(methodAnnotations = true, parameterAnnotations = true) PersonContainer personContainer

    @Context
    private UriInfo uriInfo;

    GroupController() {
        personContainer = new PersonContainer(this)
    }

    @GET
    Response list() {
        List<Group> list = service.list();
        if (list && !list.empty) {
            Response.ok(list).build();
        } else {
            Response.noContent().build();
        }

    }

    @POST
    @Consumes("application/json")
    //@RolesAllowed("ROLE_ADMIN")
    Response create(Group group) {
        Group theGroup = service.create(group);
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
        Group theGroup = service.fetch(id);
        Response.ok(theGroup).build();
    }

    @PUT
    @Path("/{id}")
    @Consumes("application/json")
    //@RolesAllowed("ROLE_ADMIN")
    Response update(@PathParam("id") Long id, Group group) {
        Response.ok(service.update(id, group)).build();
    }

    @DELETE
    @Path("/{id}")
    //@RolesAllowed("ROLE_ADMIN")
    Response delete(@PathParam("id") Long id) {
        service.delete(id);
        Response.ok().build();
    }

    @GET
    @Path("/{id}/group-dashboards")
    Response listGroupDashboards(@PathParam("id") Long id) {
        Response.ok().build();
    }
    
    @GET
    @Path("/{id}/preferences")
    Response listGroupPreferences(@PathParam("id") Long id) {
        Response.ok(service.listPreferences(id)).build();
    }
    
    @GET
    @Path("/{id}/preferences/{namespace}")
    Response listGroupPreferences(@PathParam("id") Long id, @PathParam("namespace") String namespace) {
        Response.ok(service.listPreferences(id, namespace)).build();
    }
    
    @GET
    @Path("/{id}/preferences/{namespace}/{name}")
    Response listGroupPreferences(@PathParam("id") Long id, @PathParam("namespace") String namespace, @PathParam("name") String name) {
        Response.ok(service.fetchPreference(id, namespace, name)).build();
    }

}
