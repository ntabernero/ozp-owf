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

package org.ozoneplatform.owf.server.service.impl

import org.ozoneplatform.owf.server.service.api.GroupDashboardService
import org.ozoneplatform.owf.server.service.api.model.Dashboard
import org.ozoneplatform.owf.server.service.api.model.GroupDashboard

class GroupDashboardServiceImpl implements GroupDashboardService {

    List<GroupDashboard> list() {
        dashboardMap.values().toList()
    }

    GroupDashboard create(GroupDashboard dashboardInfo) {
        dashboardMap[(dashboardInfo.guid)] = dashboardInfo
        dashboardInfo
    }

    GroupDashboard get(String id) {
        dashboardMap[id]
    }

    void update(GroupDashboard dashboardInfo) {
        if (dashboardMap[(dashboardInfo.guid)]) {
            dashboardMap[(dashboardInfo.guid)] = dashboardInfo
        }
    }

    GroupDashboard delete(String id) {
        if (dashboardMap[id]) {
            Dashboard dashboard =  dashboardMap[id]
            dashboardMap[id] = null
            dashboard
        } else {
            null
        }
    }

    GroupDashboard copy(String id) {
        if (dashboardMap[id]) {
            println "Copied $id"
            Dashboard copy = copyDashboard(dashboardMap[id])
            dashboardMap[copy.guid] = copy
            copy
        }
        else {
            null
        }
    }

    Map<String, GroupDashboard> dashboardMap;

    GroupDashboardServiceImpl() {
        dashboardMap = new HashMap<String, GroupDashboard>()
        GroupDashboard userDashboard = createExampleDashboard()
        dashboardMap[userDashboard.guid] = userDashboard
    }

    GroupDashboard createExampleDashboard() {
        new GroupDashboard([name: "Dashboard1", guid: "12345", dashboardPosition: 0, alteredByAdmin: true])
    }

    private Dashboard copyDashboard(Dashboard original) {
        def propsMap = original.properties
        propsMap.remove('metaClass')
        propsMap.remove('class')
        Dashboard dashboard = new Dashboard(propsMap)
        dashboard.guid = original.guid + "-copy"
        dashboard
    }
}
