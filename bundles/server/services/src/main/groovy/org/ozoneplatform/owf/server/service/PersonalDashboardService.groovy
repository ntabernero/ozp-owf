package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.Dashboard

interface PersonalDashboardService {

    List<Dashboard> list()

    Dashboard create(Dashboard dashboardInfo)

    Dashboard get(String id)

    void update(Dashboard dashboardInfo)

    Dashboard delete(String id)

    Dashboard restore(String id)
}
