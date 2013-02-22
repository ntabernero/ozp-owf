/* 
   Copyright 2013 Next Century Corporation 

   Licensed under the Apache License, Version 2.0 (the "License")
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

import org.ozoneplatform.commons.server.domain.model.Person
import org.ozoneplatform.commons.server.domain.model.Preference
import org.ozoneplatform.owf.server.service.api.PersonService
import org.ozoneplatform.owf.server.service.api.PreferenceService

import javax.ws.rs.*
import javax.ws.rs.core.Context
import javax.ws.rs.core.Response
import javax.ws.rs.core.UriBuilder
import javax.ws.rs.core.UriInfo

@Path("/persons")
@Produces("application/json")
class PersonController extends OwfRestController {

    PersonService service
    PreferenceService preferenceService
    @Delegate(methodAnnotations = true, parameterAnnotations = true) GroupContainer groupContainer

    @Context
    private UriInfo uriInfo

    PersonController() {
        this.groupContainer = new GroupContainer(this)
    }

    @GET
    Response list() {
        List<Person> list = service.list()
        if (list && !list.empty) {
            Response.ok(list).build()
        } else {
            Response.noContent().build()
        }
    }

    @POST
    @Consumes("application/json")
    Response create(Person person) {
        Person thePerson = service.create(person)
        URI personUri
        UriBuilder builder = uriInfo.getBaseUriBuilder()
        builder.path(PersonController.class)
        builder.path(PersonController.class.getMethod("fetch", Long.class))
        personUri = builder.build(person.id)
        Response.created(personUri).entity(thePerson).build()
    }

    @GET
    @Path("/{id}")
    Response fetch(@PathParam("id") String id) {
        Person thePerson = service.fetch(id)
        Response.ok(thePerson).build()
    }

    @PUT
    @Path("/{id}")
    @Consumes("application/json")
    Response update(@PathParam("id") String id, Person person) {
        Response.ok(service.update(id, person)).build()
    }

    @DELETE
    @Path("/{id}")
    Response delete(@PathParam("id") String id) {
        service.delete(id)
        Response.ok().build()
    }

    @GET
    @Path("/{id}/dashboards")
    Response listDashboards(@PathParam("id") String id) {
        Response.ok().build()
    }

    @GET
    @Path("/{id}/widgets")
    Response listWidgets(@PathParam("id") String id) {
        Response.ok().build()
    }

    /**
     * List all the preferences for the specified user
     * @param id
     * @return
     */
    @GET
    @Path("/{id}/preferences")
    Response listPreferences(@PathParam("id") String id) {
        Response.ok(preferenceService.listPersonalPreferences(id)).build()
    }

    /**
     * Get the value of the preference specified by namespace and name for the given person
     * @param namespace
     * @param name
     * @return preference value as response body
     */
    @GET
    @Path("/{id}/preferences/{namespace}/{name}")
    Response getPreference(@PathParam("id") String id, @PathParam("namespace") String namespace, @PathParam("name") String name) {
        Preference preference = preferenceService.getPersonalPreference(id, namespace, name)
        preference ? Response.ok(preference).build() : Response.noContent().build()
    }

    /**
     * Create/replace a preference for the specified user
     * @param id user id
     * @param namespace preference namespace
     * @param name preference name
     * @param value preference value
     * @return created preference
     */
    @POST
    @Path("/{id}/preferences")
    Response setPreference(@PathParam("id") String id, Preference preference) {
        preference = preferenceService.setPersonalPreference(id, preference)
        UriBuilder builder = uriInfo.getBaseUriBuilder()
        builder.path(PersonController.class)
        builder.path(PersonController.class.getMethod("getPreference", String.class, String.class, String.class))
        URI preferenceUri = builder.build(id, preference.namespace, preference.name)
        Response.created(preferenceUri).entity(preference).build()
    }

    /**
     * Delete the specified user preference
     * @param id user id
     * @param namespace preference namespace
     * @param name preference name
     * @return deleted preference
     */
    @DELETE
    @Path("/{id}/preferences/{namespace}/{name}")
    Response deletePreference(@PathParam("id") String id, @PathParam("namespace") String namespace,
                           @PathParam("name") String name) {
        preferenceService.deletePersonalPreference(id, namespace, name)
        Response.ok().build()
    }
}
