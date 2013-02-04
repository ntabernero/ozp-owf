package org.ozoneplatform.owf.server.rest.mix_ins

import com.fasterxml.jackson.annotation.JsonIgnore
import ozone.platform.server.model.WidgetDefinition
import ozone.platform.server.model.Person

interface DisconnectedPersonalWidgetDefinitionMixIn {
    @JsonIgnore
    WidgetDefinition getWidgetDefinition()

    @JsonIgnore
    Person getPerson()
}
