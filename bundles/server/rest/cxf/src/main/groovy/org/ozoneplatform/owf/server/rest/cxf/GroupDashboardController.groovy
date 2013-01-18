package org.ozoneplatform.owf.server.rest.cxf

import org.ozoneplatform.owf.server.service.model.Dashboard

import javax.ws.rs.core.Response
import javax.ws.rs.*
import org.ozoneplatform.owf.server.service.GroupDashboardService

@Path("/group-dashboards")
@Produces("application/json")
class GroupDashboardController {

    GroupDashboardService groupDashboardService

    @GET
    List<Dashboard> list() {
        groupDashboardService.list()
    }

    @POST
    @Consumes("application/json")
    Response create(Dashboard dashboardInfo) {
        println "In create(): ${dashboardInfo?.guid}"
        groupDashboardService.create(dashboardInfo)
        Response.ok(dashboardInfo).build()
    }

    @GET
    @Path("/{id}")
    Dashboard get(@PathParam("id") String id) {
        println "In get(): $id"
        groupDashboardService.get(id)
    }

    @PUT
    @Consumes("application/json")
    Response update(Dashboard dashboardInfo) {
        groupDashboardService.update(dashboardInfo)
        Response.ok(dashboardInfo).build()
    }

    @DELETE
    @Path("/{id}")
    Response delete(@PathParam("id") String id) {
        def dashboard = groupDashboardService.delete(id)
        Response.ok(dashboard).build()
    }

    @POST
    @Path("/{id}/copy")
    Response copy(@PathParam("id") String id) {
        println "Copied $id"
        def dashboard = groupDashboardService.copy(id)
        Response.ok(dashboard).build()
    }
}