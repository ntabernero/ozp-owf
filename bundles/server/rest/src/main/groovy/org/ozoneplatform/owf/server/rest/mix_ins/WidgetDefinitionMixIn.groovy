package org.ozoneplatform.owf.server.rest.mix_ins

import com.fasterxml.jackson.annotation.JsonBackReference
import org.ozoneplatform.commons.server.domain.model.PersonalWidgetDefinition
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty

abstract class WidgetDefinitionMixIn {

    WidgetDefinitionMixIn(@JsonProperty("displayName") String displayName, @JsonProperty("widgetUrl") String widgetUrl,
        @JsonProperty("imageUrlSmall") String imageUrlSmall, @JsonProperty("imageUrlLarge") String imageUrlLarge,
        @JsonProperty("widgetType") String widgetType) {}

    @JsonBackReference
    abstract Set<PersonalWidgetDefinition> getPersonalWidgetDefinitions()

    @JsonIgnore
    abstract boolean isIsBackground()

    @JsonIgnore
    abstract boolean isIsSingleton()

    @JsonIgnore
    abstract boolean isIsVisibleForLaunch()
}