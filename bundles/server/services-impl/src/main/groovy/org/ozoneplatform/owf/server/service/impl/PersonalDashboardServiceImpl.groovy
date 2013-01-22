package org.ozoneplatform.owf.server.service.impl

import org.ozoneplatform.owf.server.service.api.PersonalDashboardService
import org.ozoneplatform.owf.server.service.api.model.Dashboard

class PersonalDashboardServiceImpl implements PersonalDashboardService {

    List<Dashboard> list() {
        dashboardMap.values().toList()
    }

    Dashboard create(Dashboard dashboardInfo) {
        println "In create(): ${dashboardInfo?.guid}"
        dashboardMap[(dashboardInfo.guid)] = dashboardInfo
        dashboardInfo
    }

    Dashboard get(String id) {
        println "In get(): $id"
        dashboardMap[id]
    }

    void update(Dashboard dashboardInfo) {
        dashboardMap[(dashboardInfo.guid)] = dashboardInfo
    }

    Dashboard delete(String id) {
        def dashboard =  dashboardMap[id]
        dashboardMap[id] = null
        dashboard
    }

    Dashboard restore(String id) {
        println "Restored $id"
        dashboardMap[id]
    }

    Map<String, Dashboard> dashboardMap;

    PersonalDashboardServiceImpl() {
        dashboardMap = new HashMap<String, Dashboard>()
        Dashboard userDashboard = createExampleDashboard()
        dashboardMap[userDashboard.guid] = userDashboard
    }

    Dashboard createExampleDashboard() {
        new Dashboard([name: "Dashboard1", guid: "12345", defaultDashboard: false, dashboardPosition: 0, alteredByAdmin: true])
    }
}
