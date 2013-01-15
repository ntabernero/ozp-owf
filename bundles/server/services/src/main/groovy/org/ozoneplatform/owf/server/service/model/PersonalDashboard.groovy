package org.ozoneplatform.owf.server.service.model

class PersonalDashboard {

    String name
    String guid
    boolean defaultDashboard
    Integer dashboardPosition
    boolean alteredByAdmin
    String description = ''
    String layoutConfig = ''
    boolean locked = false

    boolean isAlteredByAdmin() {
        return alteredByAdmin
    }

    boolean isLocked() {
        return locked
    }

    boolean isDefaultDashboard() {
        return defaultDashboard
    }
}
