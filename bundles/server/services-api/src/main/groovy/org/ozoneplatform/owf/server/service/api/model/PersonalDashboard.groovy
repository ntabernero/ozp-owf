package org.ozoneplatform.owf.server.service.api.model

class PersonalDashboard extends Dashboard {

    boolean defaultDashboard = false

    boolean isDefaultDashboard() {
        return defaultDashboard
    }

}