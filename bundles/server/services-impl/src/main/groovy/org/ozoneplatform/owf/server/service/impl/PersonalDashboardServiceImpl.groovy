package org.ozoneplatform.owf.server.service.impl

import org.ozoneplatform.owf.server.service.api.PersonalDashboardService
import org.ozoneplatform.owf.server.service.api.model.Dashboard
import org.ozoneplatform.owf.server.service.api.model.PersonalDashboard

class PersonalDashboardServiceImpl implements PersonalDashboardService {

    List<PersonalDashboard> list() {
        dashboardMap.values().toList()
    }

    PersonalDashboard create(PersonalDashboard dashboardInfo) {
        println "In create(): ${dashboardInfo?.guid}"
        dashboardMap[(dashboardInfo.guid)] = dashboardInfo
        dashboardInfo
    }

    PersonalDashboard get(String id) {
        println "In get(): $id"
        dashboardMap[id]
    }

    void update(PersonalDashboard dashboardInfo) {
        dashboardMap[(dashboardInfo.guid)] = dashboardInfo
    }

    PersonalDashboard delete(String id) {
        def dashboard =  dashboardMap[id]
        dashboardMap[id] = null
        dashboard
    }

    PersonalDashboard restore(String id) {
        println "Restored $id"
        dashboardMap[id]
    }

    Map<String, PersonalDashboard> dashboardMap;

    PersonalDashboardServiceImpl() {
        dashboardMap = new HashMap<String, PersonalDashboard>()
        PersonalDashboard personalDashboard = createExampleDashboard()
        dashboardMap[personalDashboard.guid] = personalDashboard
    }

    PersonalDashboard createExampleDashboard() {
        new PersonalDashboard([name: "Dashboard1", guid: "12345", defaultDashboard: false, dashboardPosition: 0, alteredByAdmin: true])
    }
}
