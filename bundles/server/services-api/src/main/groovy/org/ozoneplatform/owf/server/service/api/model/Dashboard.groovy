package org.ozoneplatform.owf.server.service.api.model

class Dashboard {

    String name
    String guid
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
}
