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

package org.ozoneplatform.owf.server.rest.mix_ins

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty
import org.ozoneplatform.commons.server.domain.model.DashboardTemplate
import org.ozoneplatform.commons.server.domain.model.Person
import org.ozoneplatform.commons.server.domain.model.Stack

abstract class GroupMixIn {
    GroupMixIn(@JsonProperty("name") String name) {}
    @JsonIgnore abstract boolean getActive()
    @JsonProperty abstract boolean isIsPermissionsActive()
    @JsonIgnore abstract boolean getAutomatic()
    @JsonProperty abstract boolean isIsAutomatic()
    @JsonIgnore abstract Iterable<Stack> getStacks()
    @JsonIgnore abstract Iterable<Person> getPersons()
    @JsonBackReference abstract Iterable<DashboardTemplate> getDashboardTemplates()
}

