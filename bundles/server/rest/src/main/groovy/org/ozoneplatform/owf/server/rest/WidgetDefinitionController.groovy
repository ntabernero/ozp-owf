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

import org.ozoneplatform.commons.server.domain.model.Group
import org.ozoneplatform.commons.server.domain.model.Intent
import org.ozoneplatform.commons.server.domain.model.Person
import org.ozoneplatform.commons.server.domain.model.WidgetDefinition
import org.ozoneplatform.owf.server.service.api.WidgetDefinitionService
import org.slf4j.Logger
import org.slf4j.LoggerFactory

import javax.ws.rs.*
import javax.ws.rs.core.Context
import javax.ws.rs.core.Response
import javax.ws.rs.core.UriInfo

@Path("/widget-defs")
@Produces("application/json")
class WidgetDefinitionController extends OwfRestController {
    WidgetDefinitionService widgetDefinitionService
    Logger logger = LoggerFactory.getLogger(WidgetDefinitionController.class)

    @GET
    List<WidgetDefinition> list() {
        widgetDefinitionService.list()
    }

    @GET
    @Path("/{id}")
    WidgetDefinition get(@PathParam("id") String id) {
        logger.debug "In get(): $id"
        widgetDefinitionService.get(id)
    }

    @POST
    @Consumes("application/json")
    Response create(WidgetDefinition widgetDefinition, @Context UriInfo uriInfo) {
        widgetDefinition = widgetDefinitionService.create(widgetDefinition)
        URI widgetDefinitionUri = buildEntityURI(uriInfo, widgetDefinition, "get")
        Response.created(widgetDefinitionUri).entity(widgetDefinition).build();
    }

    @PUT
    @Path("/{widgetId}")
    @Consumes("application/json")
    WidgetDefinition update(@PathParam("widgetId") String widgetId, WidgetDefinition widgetDefinition) {
        widgetDefinitionService.update(widgetId, widgetDefinition)
    }

    @DELETE
    @Path("/{widgetId}")
    WidgetDefinition delete(@PathParam("widgetId") String widgetId) {
        widgetDefinitionService.delete(widgetId)
    }

    @POST
    @Path("/{widgetId}/intents")
    @Consumes("application/json")
    WidgetDefinition addIntent(@PathParam("widgetId") String widgetId, Intent intent) {
        widgetDefinitionService.addIntent(widgetId, intent)
    }

    @PUT
    @Path("/{widgetId}/intents/{intentId}")
    @Consumes("application/json")
    WidgetDefinition updateIntent(@PathParam("widgetId") String widgetId, @PathParam("intentId") String intentId, Intent intent) {
        widgetDefinitionService.updateIntent(widgetId, intent)
    }

    @DELETE
    @Path("/{widgetId}/intents/{intentId}")
    @Consumes("application/json")
    WidgetDefinition deleteIntent(@PathParam("widgetId") String widgetId, @PathParam("intentId") String intentId) {
        widgetDefinitionService.deleteIntent(widgetId, intentId)
    }

    @GET
    @Path("/{widgetId}/persons")
    List<Person> getPersons(@PathParam("widgetId") String widgetId) {
        widgetDefinitionService.getPersons(widgetId)
    }

    @PUT
    @Path("/{widgetId}/persons/{personId}")
    WidgetDefinition addPerson(@PathParam("widgetId") String widgetId, @PathParam("personId") String personId) {
        widgetDefinitionService.addPerson(widgetId, personId)
    }

    @DELETE
    @Path("/{widgetId}/persons/{personId}")
    WidgetDefinition removePerson(@PathParam("widgetId") String widgetId, @PathParam("personId") String personId) {
        widgetDefinitionService.removePerson(widgetId, personId)
    }

    @GET
    @Path("/{widgetId}/groups")
    List<Group> getGroups(@PathParam("widgetId") String widgetId) {
        widgetDefinitionService.getGroups(widgetId)
    }

    @PUT
    @Path("/{widgetId}/groups/{groupId}")
    WidgetDefinition addGroup(@PathParam("widgetId") String widgetId, @PathParam("groupId") String groupId) {
        widgetDefinitionService.addGroup(widgetId, groupId)
    }

    @DELETE
    @Path("/{widgetId}/persons/{personId}")
    WidgetDefinition removeGroup(@PathParam("widgetId") String widgetId, @PathParam("groupId") String groupId) {
        widgetDefinitionService.removeGroup(widgetId, groupId)
    }
}
