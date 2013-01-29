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

import org.ozoneplatform.owf.server.service.api.PreferenceService
import org.ozoneplatform.owf.server.service.api.model.Preference

import javax.ws.rs.*
import javax.ws.rs.core.Context
import javax.ws.rs.core.Response
import javax.ws.rs.core.UriBuilder
import javax.ws.rs.core.UriInfo

@Path("/")
@Produces("application/json")
class PreferenceController {

    PreferenceService preferenceService;

    @Context
    private UriInfo uriInfo;

    @GET
    Response list() {
        List<Preference> list = preferenceService.list();
        if (list && !list.empty) {
            Response.ok(list).build();
        } else {
            Response.noContent().build();
        }
    }

    @GET
    @Path("/{namespace}")
    Response list(@PathParam("namespace") String namespace) {
        List<Preference> list = preferenceService.list(namespace);
        if (list && !list.empty) {
            Response.ok(list).build();
        } else {
            Response.noContent().build();
        }
    }

    @DELETE
    @Path("/{namespace}")
    Response delete(@PathParam("namespace") String namespace) {
        preferenceService.delete(namespace);
        Response.ok().build();
    }

    @GET
    @Path("/{namespace}/{path}")
    Response fetch(@PathParam("namespace") String namespace, @PathParam("path") String path) {
        Preference thePref = preferenceService.fetch(namespace, path);
        Response.ok(thePref).build();
    }

    @POST
    @Path("/{namespace}/{path}")
    @Consumes("application/json")
    Response create(@PathParam("namespace") String namespace, @PathParam("path") String path, Preference pref) {
        Preference thePref = preferenceService.create(namespace, path, pref);
        URI prefUri;
        UriBuilder builder = uriInfo.getBaseUriBuilder();
        builder.path(PreferenceController.class);
        builder.path(PreferenceController.class.getMethod("fetch", String.class, String.class));
        prefUri = builder.build(pref.namespace, pref.path);
        Response.created(prefUri).entity(thePref).build();
    }

    @PUT
    @Path("/{namespace}/{path}")
    @Consumes("application/json")
    Response update(@PathParam("namespace") String namespace, @PathParam("path") String path, Preference pref) {
        Response.ok(preferenceService.update(namespace, path, pref)).build();
    }

    @DELETE
    @Path("/{namespace}/{path}")
    Response delete(@PathParam("namespace") String namespace, @PathParam("path") String path) {
        preferenceService.delete(namespace, path);
        Response.ok().build();
    }

    @GET
    @Path("/{namespace}/{path}/existence")
    Response doesPreferenceExist(@PathParam("namespace") String namespace, @PathParam("path") String path) {
        Response.ok(preferenceService.exists(namespace, path)).build();
    }

    @GET
    @Path("/server/resources")
    Response getServerResources(@PathParam("namespace") String namespace, @PathParam("path") String path) {
        Response.ok(["Resource One", "Resource Two"]).build();
    }

    @GET
    @Path("/server/who")
    Response whoami(@PathParam("namespace") String namespace, @PathParam("path") String path) {
        Response.ok("me").build();
    }
}
