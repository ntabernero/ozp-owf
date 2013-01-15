package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.UserDashboard

interface UserDashboardService {

    List<UserDashboard> list()

    UserDashboard create(UserDashboard dashboardInfo)

    UserDashboard get(String id)

    void update(UserDashboard dashboardInfo)

    UserDashboard delete(String id)

    UserDashboard restore(String id)
}
