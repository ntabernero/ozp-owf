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

package org.ozoneplatform.owf.server.rest.mixin

import org.codehaus.jackson.annotate.*
import ozone.platform.server.model.*

class PersonMixin {
    PersonMixin(@JsonProperty("username") String username, @JsonProperty("fullName") String fullName){}
    @JsonIgnore Set<PersonalDashboard> dashboards
    @JsonIgnore Set<Group> groups
    @JsonIgnore Set<PersonalWidgetDefinition> personalWidgetDefinitions
    @JsonIgnore Set<Preference> preferences
    @JsonIgnore Set<Role> authorities
}

