package org.ozoneplatform.owf.server.rest.mix_ins

import com.fasterxml.jackson.annotation.JsonBackReference
import org.ozoneplatform.commons.server.domain.model.PersonalWidgetDefinition
import com.fasterxml.jackson.annotation.JsonIgnore

public interface WidgetDefinitionMixIn {
    @JsonBackReference
    Set<PersonalWidgetDefinition> getPersonalWidgetDefinitions()

    @JsonIgnore
    boolean isIsBackground()

    @JsonIgnore
    boolean isIsSingleton()

    @JsonIgnore
    boolean isIsVisibleForLaunch()
}