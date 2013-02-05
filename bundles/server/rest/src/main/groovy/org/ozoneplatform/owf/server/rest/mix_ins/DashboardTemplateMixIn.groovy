package org.ozoneplatform.owf.server.rest.mix_ins;

import ozone.platform.server.model.WidgetDefinition
import com.fasterxml.jackson.annotation.JsonIgnore;

public interface DashboardTemplateMixIn extends DashboardMixIn {

    @JsonIgnore
    Set<WidgetDefinition> getWidgets()
}
