package org.ozoneplatform.owf.server.rest.mix_ins

import com.fasterxml.jackson.annotation.JsonBackReference
import ozone.platform.server.model.PersonalWidgetDefinition

public interface ConnectedWidgetDefinitionMixIn {
    @JsonBackReference
    Set<PersonalWidgetDefinition> getPersonalWidgetDefinitions()
}