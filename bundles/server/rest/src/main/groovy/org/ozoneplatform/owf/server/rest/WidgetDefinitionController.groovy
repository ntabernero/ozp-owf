package org.ozoneplatform.owf.server.rest

import org.ozoneplatform.owf.server.service.api.WidgetDefinitionService
import org.ozoneplatform.owf.server.service.api.model.Group
import org.ozoneplatform.owf.server.service.api.model.Intent
import org.ozoneplatform.owf.server.service.api.model.Person
import org.ozoneplatform.owf.server.service.api.model.WidgetDefinition
import org.slf4j.Logger
import org.slf4j.LoggerFactory

import javax.ws.rs.*

@Path("/widget-defs")
@Produces("application/json")
class WidgetDefinitionController {
    WidgetDefinitionService widgetDefinitionService
    Logger logger = LoggerFactory.getLogger(PersonalDashboardController.class)

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
    WidgetDefinition create(WidgetDefinition widgetDefinition) {
        widgetDefinitionService.create(widgetDefinition)
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
