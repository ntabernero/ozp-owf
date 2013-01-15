package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.PersonalDashboard

interface PersonalDashboardService {

    List<PersonalDashboard> list()

    PersonalDashboard create(PersonalDashboard dashboardInfo)

    PersonalDashboard get(String id)

    void update(PersonalDashboard dashboardInfo)

    PersonalDashboard delete(String id)

    PersonalDashboard restore(String id)
}
