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
import org.ozoneplatform.owf.server.service.PersonService
import org.ozoneplatform.owf.server.service.model.Person

@Path("/persons")
@Produces("application/json")
public class PersonController {
    
    private PersonService personService = null;
    
    public PersonService getPersonService() {
        return personService;
    }

    public void setPersonService(PersonService personService) {
        this.personService = personService;
    }
    
    @GET
    public Response list() {
        
        List<Person> theList = personService.list();
        return Response.ok(theList).build();
    }
    
    @POST
    @Consumes("application/json")
    public Response create(Person person) {
        Person thePerson = personService.create(person);
        return Response.ok(thePerson).build();
    }
    
    @GET
    @Path("/{id}")
    public Response fetch(@PathParam("id") Long id) {
        
        Person thePerson = personService.fetch(id);
        return Response.ok(thePerson).build();
    }
    
    @PUT
    @Path("/{id}")
    @Consumes("application/json")
    public Response update(@PathParam("id") Long id, Person person) {
        Person thePerson = personService.update(id, person);
        return Response.ok(thePerson).build();
    }
    
    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        personService.delete(id);
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
