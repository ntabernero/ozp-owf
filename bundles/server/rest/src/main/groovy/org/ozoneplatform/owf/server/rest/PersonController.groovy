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

import org.ozoneplatform.owf.server.service.api.PersonService
import org.ozoneplatform.owf.server.service.api.model.Person

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
