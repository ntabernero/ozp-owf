package org.ozoneplatform.owf.server.service.api

import org.ozoneplatform.owf.server.service.api.model.PersonalDashboard

interface PersonalDashboardService {

    List<PersonalDashboard> list()

    PersonalDashboard create(PersonalDashboard dashboardInfo)

    PersonalDashboard get(String id)

    void update(PersonalDashboard dashboardInfo)

    PersonalDashboard delete(String id)

    PersonalDashboard restore(String id)
}
