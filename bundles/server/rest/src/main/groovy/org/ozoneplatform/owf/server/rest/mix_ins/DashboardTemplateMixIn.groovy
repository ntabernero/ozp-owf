package org.ozoneplatform.owf.server.rest.mix_ins

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty
import org.ozoneplatform.commons.server.domain.model.WidgetDefinition

public abstract class DashboardTemplateMixIn extends DashboardMixIn {

    DashboardTemplateMixIn(@JsonProperty("name") String name, @JsonProperty("position") int position) {}

    @JsonIgnore
    abstract Set<WidgetDefinition> getWidgets()

    @JsonIgnore
    abstract String layoutConfig

    @JsonProperty("layoutConfig")
    abstract Object getLayoutConfigJson()

}
