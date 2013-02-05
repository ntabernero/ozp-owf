package org.ozoneplatform.owf.server.rest.mix_ins

import org.ozoneplatform.commons.server.domain.model.PersonalWidgetDefinition
import com.fasterxml.jackson.annotation.JsonBackReference
import org.ozoneplatform.commons.server.domain.model.DashboardInstance

interface ConnectedPersonMixIn {
    @JsonBackReference
    Set<PersonalWidgetDefinition> getPersonalWidgetDefinitions()

    @JsonBackReference
    Set<DashboardInstance> getDashboards()
}
