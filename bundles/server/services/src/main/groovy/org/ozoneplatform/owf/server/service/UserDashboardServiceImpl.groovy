package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.dto.UserDashboard

class UserDashboardServiceImpl implements UserDashboardService {

    List<UserDashboard> list() {
        dashboardMap.values().toList()
    }

    UserDashboard create(UserDashboard dashboardInfo) {
        println "In create(): ${dashboardInfo?.guid}"
        dashboardMap[(dashboardInfo.guid)] = dashboardInfo
        dashboardInfo
    }

    UserDashboard get(String id) {
        println "In get(): $id"
        dashboardMap[id]
    }

    void update(UserDashboard dashboardInfo) {
        dashboardMap[(dashboardInfo.guid)] = dashboardInfo
    }

    UserDashboard delete(String id) {
        def dashboard =  dashboardMap[id]
        dashboardMap[id] = null
        dashboard
    }

    void restore(String id) {
        println "Restored $id"
    }

    Map<String, UserDashboard> dashboardMap;

    UserDashboardServiceImpl() {
        dashboardMap = new HashMap<String, UserDashboard>()
        UserDashboard userDashboard = createExampleDashboard()
        dashboardMap[userDashboard.guid] = userDashboard
    }

    UserDashboard createExampleDashboard() {
        new UserDashboard("Dashboard1", "12345", false, 0, true)
    }
}
