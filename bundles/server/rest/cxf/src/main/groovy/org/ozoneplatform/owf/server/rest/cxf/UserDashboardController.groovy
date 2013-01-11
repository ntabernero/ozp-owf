package org.ozoneplatform.owf.server.rest.cxf

import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response
import org.ozoneplatform.owf.server.rest.cxf.dto.UserDashboard
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.GET
import javax.ws.rs.POST
import javax.ws.rs.Consumes
import javax.ws.rs.PathParam
import javax.ws.rs.PUT
import javax.ws.rs.DELETE

@Path("/user-dashboards")
@Produces("application/json")
class UserDashboardController {

//    UserDashboardService userDashboardService

    @GET
    List<UserDashboard> list() {
        dashboardMap.values().toList()
    }

    @POST
    @Consumes("application/json")
    Response create(UserDashboard dashboardInfo) {
        dashboardMap[(dashboardInfo.guid)] = dashboardInfo
        Response.ok(dashboardInfo).build()
    }

    @GET
    @Path("/{id}")
    UserDashboard get(@PathParam("id") String id) {
        dashboardMap[id]
    }

    @PUT
    @Consumes("application/json")
    Response update(UserDashboard dashboardInfo) {
        dashboardMap[(dashboardInfo.guid)] = dashboardInfo
        Response.ok(dashboardInfo).build()
    }

    @DELETE
    @Path("/{id}")
    Response delete(@PathParam("id") String id) {
        def dashboard =  dashboardMap[id]
        dashboardMap[id] = null
        Response.ok(dashboard).build()
    }

    @POST
    @Path("/{id}/restore")
    Response restore(@PathParam("id") id) {
    }

    Map<String, UserDashboard> dashboardMap;

    UserDashboardController() {
        dashboardMap = new HashMap<String, UserDashboard>()
        UserDashboard userDashboard = createExampleDashboard()
        dashboardMap[userDashboard.guid] = userDashboard
    }

    UserDashboard createExampleDashboard() {
        new UserDashboard("Dashboard1", "12345", false, 0, true, null)
    }
}
