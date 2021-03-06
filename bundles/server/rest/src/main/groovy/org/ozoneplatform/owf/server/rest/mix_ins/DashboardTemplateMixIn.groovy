package org.ozoneplatform.owf.server.rest.mix_ins

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.fasterxml.jackson.annotation.JsonProperty
import org.ozoneplatform.commons.server.domain.model.Group
import org.ozoneplatform.commons.server.domain.model.WidgetDefinition

public abstract class DashboardTemplateMixIn extends DashboardMixIn {

    DashboardTemplateMixIn(@JsonProperty("name") String name, @JsonProperty("position") int position) {}

    @JsonIgnore
    abstract Set<WidgetDefinition> getWidgets()

    @JsonManagedReference
    abstract Set<Group> getGroups()

}
