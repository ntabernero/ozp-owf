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

import org.ozoneplatform.commons.server.domain.model.DashboardInstance
import org.ozoneplatform.owf.server.service.api.DashboardInstanceService

import javax.ws.rs.*
import javax.ws.rs.core.Response

@Path("/dashboard-instances")
@Produces("application/json")
class DashboardInstanceController {

    DashboardInstanceService dashboardInstanceService

    @GET
    List<DashboardInstance> list() {
        dashboardInstanceService.list()
    }

    @POST
    @Consumes("application/json")
    Response create(DashboardInstance dashboardInfo) {
        println "In create(): ${dashboardInfo}"
        dashboardInstanceService.create(dashboardInfo)
        Response.ok(dashboardInfo).build()
    }

    @GET
    @Path("/{id}")
    DashboardInstance get(@PathParam("id") String id) {
        println "In get(): $id"
        dashboardInstanceService.get(id)
    }

    @PUT
    @Consumes("application/json")
    Response update(DashboardInstance dashboardInfo) {
        dashboardInstanceService.update(dashboardInfo)
        Response.ok(dashboardInfo).build()
    }

    @DELETE
    @Path("/{id}")
    Response delete(@PathParam("id") String id) {
        def dashboard = dashboardInstanceService.delete(id)
        Response.ok(dashboard).build()
    }

    @POST
    @Path("/{id}/restore")
    Response restore(@PathParam("id") String id) {
        println "Restored $id"
        def dashboard = dashboardInstanceService.restore(id)
        Response.ok(dashboard).build()
    }
}
