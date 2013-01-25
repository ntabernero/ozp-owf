package org.ozoneplatform.owf.server.rest

import javax.ws.rs.*
import javax.ws.rs.core.Context
import javax.ws.rs.core.Response
import javax.ws.rs.core.UriBuilder
import javax.ws.rs.core.UriInfo
import org.ozoneplatform.owf.server.service.api.IntentService
import org.ozoneplatform.owf.server.service.api.model.Intent

@Path("/intents")
@Produces("application/json")
class IntentController {

    IntentService intentService;

    @Context
    private UriInfo uriInfo;

    @GET
    Response list() {
        List<Intent> list = intentService.list();
        if (list && !list.empty) {
            Response.ok(list).build();
        } else {
            Response.noContent().build();
        }
    }

    @POST
    @Consumes("application/json")
    Response create(Intent intent) {
        Intent theIntent = intentService.create(intent);
        URI intentUri;
        UriBuilder builder = uriInfo.getBaseUriBuilder();
        builder.path(IntentController.class);
        builder.path(IntentController.class.getMethod("fetch", Long.class));
        intentUri = builder.build(intent.id);
        Response.created(intentUri).entity(theIntent).build();
    }

    @GET
    @Path("/{id}")
    Response fetch(@PathParam("id") Long id) {
        Intent theIntent = intentService.fetch(id);
        Response.ok(theIntent).build();
    }

    @PUT
    @Path("/{id}")
    @Consumes("application/json")
    Response update(@PathParam("id") Long id, Intent intent) {
        Response.ok(intentService.update(id, intent)).build();
    }

    @DELETE
    @Path("/{id}")
    Response delete(@PathParam("id") Long id) {
        intentService.delete(id);
        Response.ok().build();
    }

}
