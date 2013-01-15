package org.ozoneplatform.owf.server.rest.cxf

import java.util.ArrayList;
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
import org.ozoneplatform.owf.server.service.PreferenceService;
import org.ozoneplatform.owf.server.service.model.Preference;

@Path("/preferences")
@Produces("application/json")
public class PreferenceController {
    
    private PreferenceService preferenceService = null;

    public PreferenceService getPreferenceService() {
        return preferenceService;
    }

    public void setPreferenceService(PreferenceService preferenceService) {
        this.preferenceService = preferenceService;
    }
    
    @GET
    public Response list() {
        
        List<Preference> theList = preferenceService.list();
        return Response.ok(theList).build();
    }
    
    @GET
    @Path("/{namespace}")
    public Response list(@PathParam("namespace") String namespace) {
        
        List<Preference> theList = preferenceService.list(namespace);
        return Response.ok(theList).build();
    }
    
    @DELETE
    @Path("/{namespace}")
    public Response delete(@PathParam("namespace") String namespace) {
        preferenceService.delete(namespace);
        return Response.ok().build();
    }
    
    @GET
    @Path("/{namespace}/{path}")
    public Response fetch(@PathParam("namespace") String namespace, @PathParam("path") String path) {
        Preference thePref = preferenceService.fetch(namespace, path);
        return Response.ok(thePref).build();
    }
    
    @POST
    @Path("/{namespace}/{path}")
    @Consumes("application/json")
    public Response create(@PathParam("namespace") String namespace, @PathParam("path") String path, Preference pref) {
        Preference thePref = preferenceService.create(namespace, path, pref);
        return Response.ok(thePref).build();
    }
    
    @PUT
    @Path("/{namespace}/{path}")
    @Consumes("application/json")
    public Response update(@PathParam("namespace") String namespace, @PathParam("path") String path, Preference pref) {
        Preference thePref = preferenceService.update(namespace, path, pref);
        return Response.ok(thePref).build();
    }
    
    @DELETE
    @Path("/{namespace}/{path}")
    public Response delete(@PathParam("namespace") String namespace, @PathParam("path") String path) {
        preferenceService.delete(namespace, path);
        return Response.ok().build();
    }
    
    @GET
    @Path("/{namespace}/{path}/existence")
    public Response doesPreferenceExist(@PathParam("namespace") String namespace, @PathParam("path") String path) {
        return Response.ok(preferenceService.exists(namespace, path)).build();
    }
    
    @GET
    @Path("/server/resources")
    public Response getServerResources(@PathParam("namespace") String namespace, @PathParam("path") String path) {
        
        List<String> list = new ArrayList<String>();
        list.add("Resource One");
        list.add("Resource Two");
        return Response.ok(list).build();
    }
    
    @GET
    @Path("/server/who")
    public Response whoami(@PathParam("namespace") String namespace, @PathParam("path") String path) {
        return Response.ok("me").build();
    }
}
