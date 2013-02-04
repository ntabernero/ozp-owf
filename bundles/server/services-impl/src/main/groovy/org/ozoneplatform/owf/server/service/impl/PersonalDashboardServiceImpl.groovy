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

import org.ozoneplatform.owf.server.service.api.DashboardInstanceService
import ozone.platform.server.model.Dashboard
import ozone.platform.server.model.DashboardInstance
import ozone.platform.server.model.Person

class DashboardInstanceServiceImpl implements DashboardInstanceService {

    List<DashboardInstance> list() {
        dashboardMap.values().toList()
    }

    DashboardInstance create(DashboardInstance dashboardInfo) {
        println "In create(): ${dashboardInfo?.guid}"
        dashboardMap[(dashboardInfo.guid)] = dashboardInfo
        dashboardInfo
    }

    DashboardInstance get(String id) {
        println "In get(): $id"
        dashboardMap[id]
    }

    void update(DashboardInstance dashboardInfo) {
        dashboardMap[(dashboardInfo.guid)] = dashboardInfo
    }

    DashboardInstance delete(String id) {
        def dashboard =  dashboardMap[id]
        dashboardMap[id] = null
        dashboard
    }

    DashboardInstance restore(String id) {
        println "Restored $id"
        dashboardMap[id]
    }

    Map<String, DashboardInstance> dashboardMap;

    DashboardInstanceServiceImpl() {
        dashboardMap = new HashMap<String, DashboardInstance>()
        DashboardInstance dashboardInstance = createExampleDashboard()
        dashboardMap[dashboardInstance.id] = dashboardInstance
    }

    DashboardInstance createExampleDashboard() {
        DashboardInstance personalDashboard = (DashboardInstance)new Person('user1', 'User One').createDashboardInstance("Dashboard1", 1, )
        personalDashboard.isDefault = true
        personalDashboard.id = 12345
        personalDashboard
    }
}
