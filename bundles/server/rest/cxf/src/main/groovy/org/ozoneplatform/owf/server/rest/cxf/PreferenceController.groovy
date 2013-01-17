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
import org.ozoneplatform.owf.server.service.exception.NotFoundException;
import org.ozoneplatform.owf.server.service.exception.ValidationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.core.UriBuilder;

@Path("/preferences")
@Produces("application/json")
class PreferenceController {
    
    PreferenceService preferenceService;
    
    @Context
    private UriInfo uriInfo;

    @GET
    Response list() {
        try {
            List<Preference> list = preferenceService.list();
            if (list && !list.empty) {
                Response.ok(list).build();
            } else {
                Response.noContent().build();
            }
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @GET
    @Path("/{namespace}")
    Response list(@PathParam("namespace") String namespace) {
        try {
            List<Preference> list = preferenceService.list(namespace);
            if (list && !list.empty) {
                Response.ok(list).build();
            } else {
                Response.noContent().build();
            }
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @DELETE
    @Path("/{namespace}")
    Response delete(@PathParam("namespace") String namespace) {
        try {
            preferenceService.delete(namespace);
            Response.ok().build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @GET
    @Path("/{namespace}/{path}")
    Response fetch(@PathParam("namespace") String namespace, @PathParam("path") String path) {
        try {
            Preference thePref = preferenceService.fetch(namespace, path);
            Response.ok(thePref).build();
        } catch(NotFoundException f) {
            Response.status(404).build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @POST
    @Path("/{namespace}/{path}")
    @Consumes("application/json")
    Response create(@PathParam("namespace") String namespace, @PathParam("path") String path, Preference pref) {
        try {
            Preference thePref = preferenceService.create(namespace, path, pref);
            URI prefUri;
            UriBuilder builder = uriInfo.getBaseUriBuilder();
            builder.path(PreferenceController.class);
            builder.path(PreferenceController.class.getMethod("fetch", String.class, String.class));
            prefUri = builder.build(pref.namespace, pref.path);
            Response.created(prefUri).entity(thePref).build();
        } catch(ValidationException v) {
            Response.status(400).entity(v.getMessage()).build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @PUT
    @Path("/{namespace}/{path}")
    @Consumes("application/json")
    Response update(@PathParam("namespace") String namespace, @PathParam("path") String path, Preference pref) {
        try {
            Response.ok(preferenceService.update(namespace, path, pref)).build();
        } catch(NotFoundException f) {
            Response.status(404).build();
        } catch(ValidationException v) {
            Response.status(400).entity(v.getMessage()).build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @DELETE
    @Path("/{namespace}/{path}")
    Response delete(@PathParam("namespace") String namespace, @PathParam("path") String path) {
        try {
            preferenceService.delete(namespace, path);
            Response.ok().build();
        } catch(NotFoundException f) {
            Response.status(404).build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @GET
    @Path("/{namespace}/{path}/existence")
    Response doesPreferenceExist(@PathParam("namespace") String namespace, @PathParam("path") String path) {
        try {
            Response.ok(preferenceService.exists(namespace, path)).build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @GET
    @Path("/server/resources")
    Response getServerResources(@PathParam("namespace") String namespace, @PathParam("path") String path) {
        try {
            Response.ok(["Resource One", "Resource Two"]).build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @GET
    @Path("/server/who")
    Response whoami(@PathParam("namespace") String namespace, @PathParam("path") String path) {
        try {
            Response.ok("me").build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
}
