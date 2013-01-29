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

import org.ozoneplatform.owf.server.service.api.PersonalDashboardService
import org.ozoneplatform.owf.server.service.api.model.Dashboard

import javax.ws.rs.*
import javax.ws.rs.core.Response
import org.ozoneplatform.owf.server.service.api.model.PersonalDashboard

@Path("/personal-dashboards")
@Produces("application/json")
class PersonalDashboardController {

    PersonalDashboardService personalDashboardService

    @GET
    List<PersonalDashboard> list() {
        personalDashboardService.list()
    }

    @POST
    @Consumes("application/json")
    Response create(PersonalDashboard dashboardInfo) {
        println "In create(): ${dashboardInfo?.guid}"
        personalDashboardService.create(dashboardInfo)
        Response.ok(dashboardInfo).build()
    }

    @GET
    @Path("/{id}")
    PersonalDashboard get(@PathParam("id") String id) {
        println "In get(): $id"
        personalDashboardService.get(id)
    }

    @PUT
    @Consumes("application/json")
    Response update(PersonalDashboard dashboardInfo) {
        personalDashboardService.update(dashboardInfo)
        Response.ok(dashboardInfo).build()
    }

    @DELETE
    @Path("/{id}")
    Response delete(@PathParam("id") String id) {
        def dashboard = personalDashboardService.delete(id)
        Response.ok(dashboard).build()
    }

    @POST
    @Path("/{id}/restore")
    Response restore(@PathParam("id") String id) {
        println "Restored $id"
        def dashboard = personalDashboardService.restore(id)
        Response.ok(dashboard).build()
    }
}
