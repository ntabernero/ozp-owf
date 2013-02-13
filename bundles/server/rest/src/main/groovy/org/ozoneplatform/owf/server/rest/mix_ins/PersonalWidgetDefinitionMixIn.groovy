package org.ozoneplatform.owf.server.rest.mix_ins

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.fasterxml.jackson.annotation.JsonProperty
import org.ozoneplatform.commons.server.domain.model.Person
import org.ozoneplatform.commons.server.domain.model.WidgetDefinition

abstract class PersonalWidgetDefinitionMixIn {

    PersonalWidgetDefinitionMixIn(@JsonProperty("widgetDefinition") WidgetDefinition widgetDefinition) {}

    @JsonManagedReference
    abstract WidgetDefinition getWidgetDefinition()

    @JsonManagedReference
    abstract Person getPerson()

    @JsonIgnore
    abstract boolean isIsAssignedToPerson()

    @JsonIgnore
    abstract boolean isIsFavorite()

    @JsonIgnore
    abstract boolean isIsLaunchDisabled()

    @JsonIgnore
    abstract boolean isIsVisibleForLaunch()
}
