package org.ozoneplatform.owf.server.rest.mix_ins

import com.fasterxml.jackson.annotation.JsonManagedReference
import ozone.platform.server.model.WidgetDefinition
import ozone.platform.server.model.Person
import com.fasterxml.jackson.annotation.JsonIgnore

interface ConnectedPersonalWidgetDefinitionMixIn {
    @JsonManagedReference
    WidgetDefinition getWidgetDefinition()

    @JsonManagedReference
    Person getPerson()

    @JsonIgnore
    boolean isIsAssignedToPerson()

    @JsonIgnore
    boolean isIsFavorite()

    @JsonIgnore
    boolean isIsLaunchDisabled()

    @JsonIgnore
    boolean isIsVisibleForLaunch()
}
