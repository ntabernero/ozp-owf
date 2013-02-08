package org.ozoneplatform.owf.server.rest.mix_ins

import com.fasterxml.jackson.annotation.JsonManagedReference
import org.ozoneplatform.commons.server.domain.model.WidgetDefinition
import org.ozoneplatform.commons.server.domain.model.Person
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty

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
