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
import org.ozoneplatform.owf.server.service.UserService
import org.ozoneplatform.owf.server.service.model.User

@Path("/users")
@Produces("application/json")
public class UserController {
    
    private UserService userService = null;
    
    public UserService getUserService() {
        return userService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }
    
    @GET
    public Response list() {
        
        List<User> theList = userService.list();
        return Response.ok(theList).build();
    }
    
    @POST
    @Consumes("application/json")
    public Response create(User user) {
        User theUser = userService.create(user);
        return Response.ok(theUser).build();
    }
    
    @GET
    @Path("/{id}")
    public Response fetch(@PathParam("id") Long id) {
        
        User theUser = userService.fetch(id);
        return Response.ok(theUser).build();
    }
    
    @PUT
    @Path("/{id}")
    @Consumes("application/json")
    public Response update(@PathParam("id") Long id, User user) {
        User theUser = userService.update(id, user);
        return Response.ok(theUser).build();
    }
    
    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        userService.delete(id);
        return Response.ok().build();
    }
    
    @GET
    @Path("/{id}/dashboards")
    public Response listDashboards(@PathParam("id") Long id) {
        return Response.ok().build();
    }
    
    @GET
    @Path("/{id}/widgets")
    public Response listWidgets(@PathParam("id") Long id) {
        return Response.ok().build();
    }
    
}
