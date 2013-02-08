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

import org.ozoneplatform.owf.server.service.api.DashboardTemplateService
import org.ozoneplatform.commons.server.domain.model.Dashboard
import org.ozoneplatform.commons.server.domain.model.DashboardTemplate

class DashboardTemplateServiceImpl implements DashboardTemplateService {

    List<DashboardTemplate> list() {
        dashboardMap.values().toList()
    }

    DashboardTemplate create(DashboardTemplate dashboardInfo) {
        dashboardMap[(dashboardInfo.guid)] = dashboardInfo
        dashboardInfo
    }

    DashboardTemplate get(String id) {
        dashboardMap[id]
    }

    void update(DashboardTemplate dashboardInfo) {
        if (dashboardMap[(dashboardInfo.guid)]) {
            dashboardMap[(dashboardInfo.guid)] = dashboardInfo
        }
    }

    DashboardTemplate delete(String id) {
        if (dashboardMap[id]) {
            Dashboard dashboard =  dashboardMap[id]
            dashboardMap[id] = null
            dashboard
        } else {
            null
        }
    }

    DashboardTemplate copy(String id) {
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

    Map<String, DashboardTemplate> dashboardMap;

    DashboardTemplateServiceImpl() {
        dashboardMap = new HashMap<String, DashboardTemplate>()
        DashboardTemplate userDashboard = createExampleDashboard()
        dashboardMap[userDashboard.id] = userDashboard
    }

    DashboardTemplate createExampleDashboard() {
        DashboardTemplate dashboardTemplate = new DashboardTemplate("Dashboard1", 0)
        dashboardTemplate.id = 12345
        dashboardTemplate
    }

    private Dashboard copyDashboard(Dashboard original) {
        def propsMap = original.properties
        propsMap.remove('metaClass')
        propsMap.remove('class')
        Dashboard dashboard = new DashboardTemplate(original.name, original.position)
        dashboard
    }
}
