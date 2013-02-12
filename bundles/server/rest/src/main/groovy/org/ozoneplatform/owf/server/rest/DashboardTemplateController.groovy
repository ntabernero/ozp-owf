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

import org.ozoneplatform.commons.server.domain.model.Dashboard
import org.ozoneplatform.commons.server.domain.model.DashboardTemplate
import org.ozoneplatform.commons.server.domain.model.Group
import org.ozoneplatform.owf.server.service.api.DashboardTemplateService
import org.slf4j.Logger
import org.slf4j.LoggerFactory

import javax.ws.rs.*
import javax.ws.rs.core.Response

@Path("/dashboard-templates")
@Produces("application/json")
class DashboardTemplateController {

    Logger logger = LoggerFactory.getLogger(DashboardTemplateController.class)

    DashboardTemplateService dashboardTemplateService

    @GET
    List<Dashboard> list() {
        dashboardTemplateService.list()
    }

    @POST
    @Consumes("application/json")
    Response create(DashboardTemplate dashboardInfo) {
        logger.info "In create(): ${dashboardInfo}"
        dashboardInfo = dashboardTemplateService.create(dashboardInfo)
        Response.ok(dashboardInfo).build()
    }

    @GET
    @Path("/{id}")
    Dashboard get(@PathParam("id") String id) {
        println "In get(): $id"
        dashboardTemplateService.get(id)
    }

    @PUT
    @Consumes("application/json")
    Response update(DashboardTemplate dashboardInfo) {
        dashboardTemplateService.update(dashboardInfo)
        Response.ok(dashboardInfo).build()
    }

    @DELETE
    @Path("/{id}")
    Response delete(@PathParam("id") String id) {
        def dashboard = dashboardTemplateService.delete(id)
        Response.ok(dashboard).build()
    }

    @POST
    @Path("/{id}/copy")
    Response copy(@PathParam("id") String id) {
        println "Copied $id"
        def dashboard = dashboardTemplateService.copy(id)
        Response.ok(dashboard).build()
    }

    /**
     * Adds a group to the specified dashboard template
     */
    @POST
    @Path("/{id}/groups")
    Response addGroup(@PathParam("id") String id, Group groupInfo) {
        def dashboardTemplate = dashboardTemplateService.addGroup(id, groupInfo.id)
        Response.ok(dashboardTemplate).build()
    }

    /**
     * Removes a group from the specified dashboard template
     */
    @DELETE
    @Path("/{id}/groups")
    Response removeGroup(@PathParam("id") String id, Group groupInfo) {
        def dashboardTemplate = dashboardTemplateService.removeGroup(id, groupInfo.id)
        Response.ok(dashboardTemplate).build()
    }

    /**
     * Returns the list of groups of the specified dashboard template
     */
    @GET
    @Path("/{id}/groups")
    Response getGroups(@PathParam("id") String id) {
        def groups = dashboardTemplateService.getGroups(id)
        Response.ok(groups).build()
    }
}
