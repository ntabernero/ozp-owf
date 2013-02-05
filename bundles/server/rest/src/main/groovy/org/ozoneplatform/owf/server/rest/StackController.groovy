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
import org.ozoneplatform.owf.server.service.api.StackService
import org.ozoneplatform.commons.server.domain.model.Stack

@Path("/stacks")
@Produces("application/json")
class StackController {

    StackService stackService;

    @Context
    private UriInfo uriInfo;

    @GET
    Response list() {
        List<Stack> list = stackService.list();
        if (list && !list.empty) {
            Response.ok(list).build();
        } else {
            Response.noContent().build();
        }
    }

    @POST
    @Consumes("application/json")
    Response create(Stack stack) {
        Stack theStack = stackService.create(stack);
        URI stackUri;
        UriBuilder builder = uriInfo.getBaseUriBuilder();
        builder.path(StackController.class);
        builder.path(StackController.class.getMethod("fetch", Long.class));
        stackUri = builder.build(stack.id);
        Response.created(stackUri).entity(theStack).build();
    }

    @POST
    @Path("/import-operation")
    Response doImport(Stack stack) {
        Stack theStack = stackService.doImport(stack);
        URI stackUri;
        UriBuilder builder = uriInfo.getBaseUriBuilder();
        builder.path(StackController.class);
        builder.path(StackController.class.getMethod("fetch", Long.class));
        stackUri = builder.build(stack.id);
        Response.created(stackUri).entity(theStack).build();
    }

    @GET
    @Path("/{id}")
    Response fetch(@PathParam("id") Long id) {
        Stack theStack = stackService.fetch(id);
        Response.ok(theStack).build();
    }

    @PUT
    @Path("/{id}")
    @Consumes("application/json")
    Response update(@PathParam("id") Long id, Stack stack) {
        Response.ok(stackService.update(id, stack)).build();
    }

    @DELETE
    @Path("/{id}")
    Response delete(@PathParam("id") Long id) {
        stackService.delete(id);
        Response.ok().build();
    }

    @GET
    @Path("/{id}/export-operation")
    Response export(@PathParam("id") Long id) {
        Stack theStack = stackService.export(id);
        Response.ok(theStack).build();
    }

    @POST
    @Path("/{id}/restore-operation")
    Response restore(@PathParam("id") Long id) {
        Stack theStack = stackService.restore(id);
        Response.ok(theStack).build();
    }

}
