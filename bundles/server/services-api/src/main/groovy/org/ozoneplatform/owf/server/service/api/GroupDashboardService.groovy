package org.ozoneplatform.owf.server.service.api

import org.ozoneplatform.owf.server.service.api.model.Dashboard
import org.ozoneplatform.owf.server.service.api.model.GroupDashboard

interface GroupDashboardService {
    List<GroupDashboard> list()

    GroupDashboard create(GroupDashboard dashboardInfo)

    GroupDashboard get(String id)

    void update(GroupDashboard dashboardInfo)

    GroupDashboard delete(String id)

    GroupDashboard copy(String id)

}
