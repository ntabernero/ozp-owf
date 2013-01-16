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
import org.ozoneplatform.owf.server.service.PersonService
import org.ozoneplatform.owf.server.service.model.Person

@Path("/persons")
@Produces("application/json")
class PersonController {
    
    PersonService personService;
    
    @GET
    Response list() {
        Response.ok(personService.list()).build();
    }
    
    @POST
    @Consumes("application/json")
    Response create(Person person) {
        Response.ok(personService.create(person)).build();
    }
    
    @GET
    @Path("/{id}")
    Response fetch(@PathParam("id") Long id) {
        Response.ok(personService.fetch(id)).build();
    }
    
    @PUT
    @Path("/{id}")
    @Consumes("application/json")
    Response update(@PathParam("id") Long id, Person person) {
        Response.ok(personService.update(id, person)).build();
    }
    
    @DELETE
    @Path("/{id}")
    Response delete(@PathParam("id") Long id) {
        personService.delete(id);
        Response.ok().build();
    }
    
    @GET
    @Path("/{id}/dashboards")
    Response listDashboards(@PathParam("id") Long id) {
        Response.ok().build();
    }
    
    @GET
    @Path("/{id}/widgets")
    Response listWidgets(@PathParam("id") Long id) {
        Response.ok().build();
    }
    
}
