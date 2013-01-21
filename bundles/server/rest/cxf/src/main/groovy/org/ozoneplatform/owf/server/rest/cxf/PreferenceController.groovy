package org.ozoneplatform.owf.server.rest.cxf
import org.ozoneplatform.owf.server.service.PreferenceService
import org.ozoneplatform.owf.server.service.model.Preference

import javax.ws.rs.*
import javax.ws.rs.core.Context
import javax.ws.rs.core.Response
import javax.ws.rs.core.UriBuilder
import javax.ws.rs.core.UriInfo

@Path("/preferences")
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
