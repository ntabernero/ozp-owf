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
import org.ozoneplatform.owf.server.service.PersonService;
import org.ozoneplatform.owf.server.service.model.Person;
import org.ozoneplatform.owf.server.service.exception.NotFoundException;
import org.ozoneplatform.owf.server.service.exception.ValidationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.core.UriBuilder;

@Path("/persons")
@Produces("application/json")
class PersonController {
    
    PersonService personService;
    
    @Context
    private UriInfo uriInfo;
    
    @GET
    Response list() {
        try {
            List<Person> list = personService.list();
            if (list && !list.empty) {
                Response.ok(list).build();
            } else {
                Response.noContent().build();
            }
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @POST
    @Consumes("application/json")
    Response create(Person person) {
        try {
            Person thePerson = personService.create(person);
            URI personUri;
            UriBuilder builder = uriInfo.getBaseUriBuilder();
            builder.path(PersonController.class);
            builder.path(PersonController.class.getMethod("fetch", Long.class));
            personUri = builder.build(person.id);
            Response.created(personUri).entity(thePerson).build();
        } catch(ValidationException v) {
            Response.status(400).entity(v.getMessage()).build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @GET
    @Path("/{id}")
    Response fetch(@PathParam("id") Long id) {
        try {
            Person thePerson = personService.fetch(id);
            Response.ok(thePerson).build();
        } catch(NotFoundException f) {
            Response.status(404).build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @PUT
    @Path("/{id}")
    @Consumes("application/json")
    Response update(@PathParam("id") Long id, Person person) {
        try {
            Response.ok(personService.update(id, person)).build();
        } catch(NotFoundException f) {
            Response.status(404).build();
        } catch(ValidationException v) {
            Response.status(400).entity(v.getMessage()).build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
    }
    
    @DELETE
    @Path("/{id}")
    Response delete(@PathParam("id") Long id) {
        try {
            personService.delete(id);
            Response.ok().build();
        } catch(NotFoundException f) {
            Response.status(404).build();
        } catch(Exception e) {
            Response.serverError().entity(e.toString()).build();
        }
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
