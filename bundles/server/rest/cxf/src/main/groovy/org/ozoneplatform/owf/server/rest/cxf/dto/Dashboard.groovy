package org.ozoneplatform.owf.server.rest.cxf.dto

abstract class Dashboard {

    String name
    String guid
    boolean isDefault //Capitalized d, should we change all booleans to is*?
    Integer dashboardPosition
    boolean alteredByAdmin
    String description = ''
    String layoutConfig = ''
    boolean locked = false

    protected Dashboard(name, guid, isDefault, dashboardPosition, alteredByAdmin) {
        this.name = name
        this.guid = guid
        this.isDefault = isDefault
        this.dashboardPosition = dashboardPosition
        this.alteredByAdmin = alteredByAdmin
    }

    boolean getAlteredByAdmin() {
        return alteredByAdmin
    }

    void setAlteredByAdmin(boolean alteredByAdmin) {
        this.alteredByAdmin = alteredByAdmin
    }

    boolean getLocked() {
        return locked
    }

    void setLocked(boolean locked) {
        this.locked = locked
    }

    boolean getIsDefault() {
        return isDefault
    }

    void setIsDefault(boolean aDefault) {
        isDefault = aDefault
    }
}
