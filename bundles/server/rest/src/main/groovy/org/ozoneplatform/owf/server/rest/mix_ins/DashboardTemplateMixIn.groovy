package org.ozoneplatform.owf.server.rest.mix_ins

import com.fasterxml.jackson.annotation.JsonProperty
import groovy.json.JsonSlurper
import org.ozoneplatform.commons.server.domain.model.WidgetDefinition
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class DashboardTemplateMixIn extends DashboardMixIn {

    DashboardTemplateMixIn(@JsonProperty("name") String name, @JsonProperty("position") int position) {}

    @JsonIgnore
    abstract Set<WidgetDefinition> getWidgets()

}
