package org.ozoneplatform.owf.server.service.api

import org.ozoneplatform.commons.server.domain.model.Dashboard

interface GroupDashboardService {
    List<Dashboard> list()

    Dashboard create(Dashboard dashboardInfo)

    Dashboard get(String id)

    void update(Dashboard dashboardInfo)

    Dashboard delete(String id)

    Dashboard copy(String id)

}
