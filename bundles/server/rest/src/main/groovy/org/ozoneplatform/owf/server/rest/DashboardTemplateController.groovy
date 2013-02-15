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
import org.ozoneplatform.owf.server.service.api.DashboardTemplateService
import org.slf4j.Logger
import org.slf4j.LoggerFactory

import javax.ws.rs.*
import javax.ws.rs.core.Response

@Path("/dashboard-templates")
@Produces("application/json")
class DashboardTemplateController {

    Logger logger = LoggerFactory.getLogger(DashboardTemplateController.class)

    DashboardTemplateService service

    @Delegate(methodAnnotations = true, parameterAnnotations = true) GroupContainer groupContainer

    DashboardTemplateController() {
        groupContainer = new GroupContainer(this)
    }

    @GET
    List<Dashboard> list() {
        service.list()
    }

    @POST
    @Consumes("application/json")
    Response create(DashboardTemplate dashboardInfo) {
        logger.info "In create(): ${dashboardInfo}"
        dashboardInfo = service.create(dashboardInfo)
        Response.ok(dashboardInfo).build()
    }

    @GET
    @Path("/{id}")
    Dashboard get(@PathParam("id") String id) {
        println "In get(): $id"
        service.get(id)
    }

    @PUT
    @Consumes("application/json")
    Response update(DashboardTemplate dashboardInfo) {
        service.update(dashboardInfo)
        Response.ok(dashboardInfo).build()
    }

    @DELETE
    @Path("/{id}")
    Response delete(@PathParam("id") String id) {
        def dashboard = service.delete(id)
        Response.ok(dashboard).build()
    }

    @POST
    @Path("/{id}/copy")
    Response copy(@PathParam("id") String id) {
        println "Copied $id"
        def dashboard = service.copy(id)
        Response.ok(dashboard).build()
    }
}
