package org.ozoneplatform.owf.server.rest

import javax.ws.rs.Path
import javax.ws.rs.Produces
import org.ozoneplatform.owf.server.service.api.WidgetDefinitionService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import javax.ws.rs.GET
import org.ozoneplatform.owf.server.service.api.model.WidgetDefinition
import javax.ws.rs.PathParam
import javax.ws.rs.POST
import javax.ws.rs.Consumes
import javax.ws.rs.PUT
import javax.ws.rs.DELETE
import org.ozoneplatform.owf.server.service.api.model.PersonalWidgetDefinition
import org.ozoneplatform.owf.server.service.api.PersonalWidgetDefinitionService
import javax.ws.rs.core.Response

@Path("/persons/{personId}/widget-defs")
@Produces("application/json")
class PersonalWidgetDefinitionController {
    PersonalWidgetDefinitionService personalWidgetDefinitionService
    Logger logger = LoggerFactory.getLogger(PersonalWidgetDefinitionController.class)

    @GET
    List<PersonalWidgetDefinition> list() {
        personalWidgetDefinitionService.list()
    }

    @GET
    @Path("/{id}")
    PersonalWidgetDefinition get(@PathParam("id") String id) {
        logger.debug "In get(): $id"
        personalWidgetDefinitionService.get(id)
    }

    @POST
    @Consumes("application/json")
    PersonalWidgetDefinition create(PersonalWidgetDefinition personalWidgetDefinition) {
        personalWidgetDefinitionService.create(personalWidgetDefinition)
    }

    @PUT
    @Path("/{widgetId}")
    @Consumes("application/json")
    PersonalWidgetDefinition update(@PathParam("widgetId") String widgetId, PersonalWidgetDefinition personalWidgetDefinition) {
        personalWidgetDefinitionService.update(widgetId, personalWidgetDefinition)
    }

    @DELETE
    @Path("/{widgetId}")
    PersonalWidgetDefinition delete(@PathParam("widgetId") String widgetId) {
        personalWidgetDefinitionService.delete(widgetId)
    }

    @PUT
    @Consumes("application/json")
    Response bulkUpdate(List<PersonalWidgetDefinition> personalWidgetDefinitions) {
        personalWidgetDefinitionService.bulkUpdate(personalWidgetDefinitions)
        Response.ok().build()
    }

    @DELETE
    @Consumes("application/json")
    Response bulkDelete(List<PersonalWidgetDefinition> personalWidgetDefinitions) {
        personalWidgetDefinitionService.bulkDelete(personalWidgetDefinitions)
        Response.ok().build()
    }

    @GET
    @Consumes("application/json")
    @Path("/dependents")
    List<PersonalWidgetDefinition> dependents(List<PersonalWidgetDefinition> personalWidgetDefinitions) {
        personalWidgetDefinitionService.dependents(personalWidgetDefinitions)
    }

    @PUT
    @Consumes("application/json")
    @Path("/approve")
    Response approve(List<PersonalWidgetDefinition> personalWidgetDefinitions) {
        personalWidgetDefinitionService.approve(personalWidgetDefinitions)
        Response.ok().build()
    }
}
