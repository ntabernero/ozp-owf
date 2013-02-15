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

import org.ozoneplatform.commons.server.domain.model.Person

import javax.ws.rs.*
import javax.ws.rs.core.Response

class PersonContainer {

    def delegator
    PersonContainer(def delegator) {
        this.delegator = delegator
    }

    /**
     * Adds a person to the specified group
     */
    @POST
    @Path("/{id}/persons")
    Response addPerson(@PathParam("id") String containerId, Person personInfo) {
        def group = delegator.service.addPerson(containerId, personInfo.id)
        Response.ok(group).build()
    }

    /**
     * Removes a person from the specified group
     */
    @DELETE
    @Path("/{id}/persons")
    Response removePerson(@PathParam("id") String containerId, Person personInfo) {
        def group = delegator.service.removePerson(containerId, personInfo.id)
        Response.ok(group).build()
    }

    /**
     * Returns the list of persons for the specified group
     */
    @GET
    @Path("/{id}/persons")
    Response getPersons(@PathParam("id") String containerId) {
        def persons = delegator.service.getPersons(containerId)
        Response.ok(persons).build()
    }
}
