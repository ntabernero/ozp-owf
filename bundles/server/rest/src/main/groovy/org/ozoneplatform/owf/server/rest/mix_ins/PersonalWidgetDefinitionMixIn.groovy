package org.ozoneplatform.owf.server.rest.mix_ins

import com.fasterxml.jackson.annotation.JsonManagedReference
import org.ozoneplatform.commons.server.domain.model.WidgetDefinition
import org.ozoneplatform.commons.server.domain.model.Person
import com.fasterxml.jackson.annotation.JsonIgnore

interface PersonalWidgetDefinitionMixIn {
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
