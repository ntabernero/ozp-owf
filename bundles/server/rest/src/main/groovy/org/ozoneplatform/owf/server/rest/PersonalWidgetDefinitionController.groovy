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
    List<PersonalWidgetDefinition> list(@PathParam("personId") String personId) {
        personalWidgetDefinitionService.list(personId)
    }

    @GET
    @Path("/{widgetId}")
    PersonalWidgetDefinition get(@PathParam("widgetId") String widgetId) {
        logger.debug "In get(): $widgetId"
        personalWidgetDefinitionService.get(widgetId)
    }

    @POST
    @Consumes("application/json")
    PersonalWidgetDefinition create(@PathParam("personId") String personId, PersonalWidgetDefinition personalWidgetDefinition) {
        logger.debug "In create() for person $personId"
        personalWidgetDefinitionService.create(personId, personalWidgetDefinition)
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
