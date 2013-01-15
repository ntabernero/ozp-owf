package org.ozoneplatform.owf.server.rest.cxf

import javax.ws.rs.core.Response
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.GET
import javax.ws.rs.POST
import javax.ws.rs.Consumes
import javax.ws.rs.PathParam
import javax.ws.rs.PUT
import javax.ws.rs.DELETE

import org.ozoneplatform.owf.server.service.model.PersonalDashboard
import org.ozoneplatform.owf.server.service.PersonalDashboardService

@Path("/user-dashboards")
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
