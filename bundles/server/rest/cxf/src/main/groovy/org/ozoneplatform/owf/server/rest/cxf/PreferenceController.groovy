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
import org.ozoneplatform.owf.server.service.PreferenceService;
import org.ozoneplatform.owf.server.service.model.Preference;

@Path("/preferences")
@Produces("application/json")
class PreferenceController {
    
    PreferenceService preferenceService;

    @GET
    Response list() {
        Response.ok(preferenceService.list()).build();
    }
    
    @GET
    @Path("/{namespace}")
    Response list(@PathParam("namespace") String namespace) {
        Response.ok(preferenceService.list(namespace)).build();
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
        Response.ok(preferenceService.fetch(namespace, path)).build();
    }
    
    @POST
    @Path("/{namespace}/{path}")
    @Consumes("application/json")
    Response create(@PathParam("namespace") String namespace, @PathParam("path") String path, Preference pref) {
        Response.ok(preferenceService.create(namespace, path, pref)).build();
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
