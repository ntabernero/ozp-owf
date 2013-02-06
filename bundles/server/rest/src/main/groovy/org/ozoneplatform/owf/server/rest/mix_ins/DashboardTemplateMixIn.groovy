package org.ozoneplatform.owf.server.rest.mix_ins;

import org.ozoneplatform.commons.server.domain.model.WidgetDefinition
import com.fasterxml.jackson.annotation.JsonIgnore;

public interface DashboardTemplateMixIn extends DashboardMixIn {

    @JsonIgnore
    Set<WidgetDefinition> getWidgets()
}
