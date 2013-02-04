package org.ozoneplatform.owf.server.rest.mix_ins

import com.fasterxml.jackson.annotation.JsonManagedReference
import ozone.platform.server.model.WidgetDefinition
import ozone.platform.server.model.Person

interface ConnectedPersonalWidgetDefinitionMixIn {
    @JsonManagedReference
    WidgetDefinition getWidgetDefinition()

    @JsonManagedReference
    Person getPerson()
}
