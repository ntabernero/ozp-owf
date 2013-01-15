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
import org.ozoneplatform.owf.server.service.model.UserDashboard
import org.ozoneplatform.owf.server.service.UserDashboardService
import org.ozoneplatform.owf.server.service.UserDashboardServiceImpl

@Path("/user-dashboards")
@Produces("application/json")
class UserDashboardController {

    UserDashboardService userDashboardService  = new UserDashboardServiceImpl()

    @GET
    List<UserDashboard> list() {
        userDashboardService.list()
    }

    @POST
    @Consumes("application/json")
    Response create(UserDashboard dashboardInfo) {
        println "In create(): ${dashboardInfo?.guid}"
        userDashboardService.create(dashboardInfo)
        Response.ok(dashboardInfo).build()
    }

    @GET
    @Path("/{id}")
    UserDashboard get(@PathParam("id") String id) {
        println "In get(): $id"
        userDashboardService.get(id)
    }

    @PUT
    @Consumes("application/json")
    Response update(UserDashboard dashboardInfo) {
        userDashboardService.update(dashboardInfo)
        Response.ok(dashboardInfo).build()
    }

    @DELETE
    @Path("/{id}")
    Response delete(@PathParam("id") String id) {
        def dashboard = userDashboardService.delete(id)
        Response.ok(dashboard).build()
    }

    @POST
    @Path("/{id}/restore")
    Response restore(@PathParam("id") String id) {
        println "Restored $id"
        def dashboard = userDashboardService.restore(id)
        Response.ok(dashboard).build()
    }
}
