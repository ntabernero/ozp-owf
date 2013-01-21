package org.ozoneplatform.owf.server.rest
import org.ozoneplatform.owf.server.service.PersonService
import org.ozoneplatform.owf.server.service.model.Person

import javax.ws.rs.*
import javax.ws.rs.core.Context
import javax.ws.rs.core.Response
import javax.ws.rs.core.UriBuilder
import javax.ws.rs.core.UriInfo

@Path("/persons")
@Produces("application/json")
class PersonController {

    PersonService personService;

    @Context
    private UriInfo uriInfo;

    @GET
    Response list() {
        List<Person> list = personService.list();
        if (list && !list.empty) {
            Response.ok(list).build();
        } else {
            Response.noContent().build();
        }
    }

    @POST
    @Consumes("application/json")
    Response create(Person person) {
        Person thePerson = personService.create(person);
        URI personUri;
        UriBuilder builder = uriInfo.getBaseUriBuilder();
        builder.path(PersonController.class);
        builder.path(PersonController.class.getMethod("fetch", Long.class));
        personUri = builder.build(person.id);
        Response.created(personUri).entity(thePerson).build();
    }

    @GET
    @Path("/{id}")
    Response fetch(@PathParam("id") Long id) {
        Person thePerson = personService.fetch(id);
        Response.ok(thePerson).build();
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
