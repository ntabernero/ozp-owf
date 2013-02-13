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

package org.ozoneplatform.owf.server.service.api

import org.ozoneplatform.commons.server.domain.model.DashboardTemplate
import org.ozoneplatform.commons.server.domain.model.Group

interface DashboardTemplateService {
    List<DashboardTemplate> list()

    DashboardTemplate create(DashboardTemplate dashboardInfo)

    DashboardTemplate get(String id)

    void update(DashboardTemplate dashboardInfo)

    DashboardTemplate delete(String id)

    DashboardTemplate copy(String id)

    /**
     * Returns the list of groups for the given dashboard template.
     * @param id template id
     * @return dashboard template's groups
     */
    Iterable<Group> getGroups(String id)

    /**
     * Adds a specified group to the specified dashboard template
     * @param dashboardTemplateId
     * @param groupId
     */
    DashboardTemplate addGroup(String dashboardTemplateId, String groupId)

    /**
     * Removes a specified group from the specified dashboard template
     * @param dashboardTemplateId
     * @param groupId
     */
    DashboardTemplate removeGroup(String dashboardTemplateId, String groupId)
}
