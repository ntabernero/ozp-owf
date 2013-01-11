package org.ozoneplatform.owf.server.rest.cxf.dto

class UserDashboard extends Dashboard {

    UserDashboard(name, guid, isDefault, dashboardPosition, alteredByAdmin, user) {
        super(name, guid, isDefault, dashboardPosition, alteredByAdmin)
    }
}
