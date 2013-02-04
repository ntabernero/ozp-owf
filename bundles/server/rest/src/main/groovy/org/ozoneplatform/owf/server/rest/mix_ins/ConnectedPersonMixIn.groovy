package org.ozoneplatform.owf.server.rest.mix_ins

import ozone.platform.server.model.PersonalWidgetDefinition
import com.fasterxml.jackson.annotation.JsonBackReference
import ozone.platform.server.model.PersonalDashboard

interface ConnectedPersonMixIn {
    @JsonBackReference
    Set<PersonalWidgetDefinition> getPersonalWidgetDefinitions()

    @JsonBackReference
    Set<PersonalDashboard> getDashboards()
}
