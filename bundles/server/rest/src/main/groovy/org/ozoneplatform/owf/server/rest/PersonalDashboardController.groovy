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
