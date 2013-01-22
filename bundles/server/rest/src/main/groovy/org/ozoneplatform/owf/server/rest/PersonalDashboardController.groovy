package org.ozoneplatform.owf.server.rest

import org.ozoneplatform.owf.server.service.api.PersonalDashboardService
import org.ozoneplatform.owf.server.service.api.model.Dashboard

import javax.ws.rs.*
import javax.ws.rs.core.Response

@Path("/user-dashboards")
@Produces("application/json")
class PersonalDashboardController {

    PersonalDashboardService personalDashboardService

    @GET
    List<Dashboard> list() {
        personalDashboardService.list()
    }

    @POST
    @Consumes("application/json")
    Response create(Dashboard dashboardInfo) {
        println "In create(): ${dashboardInfo?.guid}"
        personalDashboardService.create(dashboardInfo)
        Response.ok(dashboardInfo).build()
    }

    @GET
    @Path("/{id}")
    Dashboard get(@PathParam("id") String id) {
        println "In get(): $id"
        personalDashboardService.get(id)
    }

    @PUT
    @Consumes("application/json")
    Response update(Dashboard dashboardInfo) {
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
