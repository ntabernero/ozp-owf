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

import org.ozoneplatform.commons.server.domain.model.Dashboard
import org.ozoneplatform.commons.server.domain.model.DashboardTemplate
import org.ozoneplatform.commons.server.domain.model.Group
import org.ozoneplatform.owf.server.service.api.DashboardTemplateService
import org.ozoneplatform.owf.server.service.api.GroupService
import org.ozoneplatform.owf.server.service.api.exception.NotFoundException
import org.slf4j.Logger
import org.slf4j.LoggerFactory

class DashboardTemplateServiceImpl implements DashboardTemplateService {

    GroupService groupService

    Logger logger = LoggerFactory.getLogger(DashboardTemplateServiceImpl.class)

    List<DashboardTemplate> list() {
        dashboardMap.values().toList()
    }

    DashboardTemplate create(DashboardTemplate dashboardInfo) {
        dashboardInfo.id = UUID.randomUUID().toString()
        dashboardMap[(dashboardInfo.id)] = dashboardInfo
        dashboardInfo
    }

    DashboardTemplate get(String id) {
        def dashboard = dashboardMap[id]
        if (!dashboard) throw new NotFoundException("Dashboard template with id $id was not found")
        dashboard
    }

    void update(DashboardTemplate dashboardInfo) {
        if (dashboardMap[(dashboardInfo.id)]) {
            dashboardMap[(dashboardInfo.id)] = dashboardInfo
        }
        else {
            throw new NotFoundException("Dashboard template with id ${dashboardInfo.id} was not found")
        }
    }

    DashboardTemplate delete(String id) {
        if (dashboardMap[id]) {
            Dashboard dashboard =  dashboardMap[id]
            dashboardMap.remove(id)
            dashboard
        } else {
            throw new NotFoundException("Dashboard template with id ${id} was not found")
        }
    }

    DashboardTemplate copy(String id) {
        if (dashboardMap[id]) {
            println "Copied $id"
            Dashboard copy = copyDashboard(dashboardMap[id])
            dashboardMap[copy.id] = copy
            copy
        }
        else {
            throw new NotFoundException("Dashboard template with id ${id} was not found")
        }
    }

    @Override
    Set<Group> getGroups(String id) {
        return get(id).groups
    }

    @Override
    DashboardTemplate addGroup(String dashboardTemplateId, String groupId) {
        groupService.addDashboardTemplate(groupId, dashboardTemplateId)
        get(dashboardTemplateId)
    }

    @Override
    DashboardTemplate removeGroup(String dashboardTemplateId, String groupId) {
        groupService.removeDashboardTemplate(groupId, dashboardTemplateId)
        get(dashboardTemplateId)
    }

    Map<String, DashboardTemplate> dashboardMap;

    DashboardTemplateServiceImpl() {
        dashboardMap = new HashMap<String, DashboardTemplate>()
        DashboardTemplate userDashboard = createExampleDashboard()
        dashboardMap[userDashboard.id] = userDashboard
    }

    DashboardTemplate createExampleDashboard() {
        DashboardTemplate dashboardTemplate = new DashboardTemplate("Dashboard1", 0)
        dashboardTemplate.id = UUID.randomUUID().toString()
        dashboardTemplate.layoutConfig = '{"prop": "test"}'
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
