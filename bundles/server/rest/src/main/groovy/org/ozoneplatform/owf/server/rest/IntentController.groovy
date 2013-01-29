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
