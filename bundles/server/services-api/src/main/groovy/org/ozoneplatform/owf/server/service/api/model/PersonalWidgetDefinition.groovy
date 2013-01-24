package org.ozoneplatform.owf.server.service.api.model

class PersonalWidgetDefinition extends Entity {

    String displayName
    int position //Changed from pwdPosition
    boolean assignedByGroup = false //Changed from groupWidget
    boolean assignedToPerson = false //Changed from personWidget
    boolean favorite = false
    boolean launchDisabled = false //Changed from disabled
    boolean visibleForLaunch = true //Changed from visible

    String widgetDefinitionGuid

    Set<String> tags
}
