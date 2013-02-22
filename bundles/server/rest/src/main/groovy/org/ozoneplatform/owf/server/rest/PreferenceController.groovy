/*
   Copyright 2013 Next Century Corporation

   Licensed under the Apache License, Version 2.0 (the "License")
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

import org.ozoneplatform.commons.server.domain.model.Preference
import org.ozoneplatform.owf.server.service.api.PreferenceService

import javax.ws.rs.GET
import javax.ws.rs.Path
import javax.ws.rs.PathParam
import javax.ws.rs.Produces
import javax.ws.rs.core.Response

@Path("/preferences")
@Produces("application/json")
class PreferenceController {
    PreferenceService preferenceService
    /**
     * Get the value of the preference specified by namespace and name by searching for that preference in
     * different scopes in a predefined order.
     * @param namespace
     * @param name
     * @return preference value as response body
     */
    @GET
    @Path("/{namespace}/{name}")
    Response getPreference(@PathParam("namespace") String namespace, @PathParam("name") String name) {
        Preference preference = preferenceService.getPreference(namespace, name)
        Response.ok(preference).build()
    }
}
