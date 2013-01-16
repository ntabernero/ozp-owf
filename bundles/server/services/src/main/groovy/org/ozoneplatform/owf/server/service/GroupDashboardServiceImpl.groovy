package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.Dashboard

class GroupDashboardServiceImpl implements GroupDashboardService {

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
        if (dashboardMap[(dashboardInfo.guid)]) {
            dashboardMap[(dashboardInfo.guid)] = dashboardInfo
        }
    }

    Dashboard delete(String id) {
        if (dashboardMap[id]) {
            Dashboard dashboard =  dashboardMap[id]
            dashboardMap[id] = null
            dashboard
        } else {
            null
        }
    }

    Dashboard copy(String id) {
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

    Map<String, Dashboard> dashboardMap;

    GroupDashboardServiceImpl() {
        dashboardMap = new HashMap<String, Dashboard>()
        Dashboard userDashboard = createExampleDashboard()
        dashboardMap[userDashboard.guid] = userDashboard
    }

    Dashboard createExampleDashboard() {
        new Dashboard([name: "Dashboard1", guid: "12345", defaultDashboard: false, dashboardPosition: 0, alteredByAdmin: true])
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
