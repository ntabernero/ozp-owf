package org.ozoneplatform.owf.server.rest.mix_ins

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import ozone.platform.server.model.Person
import com.fasterxml.jackson.annotation.JsonProperty

public interface ConnectedPersonalDashboardMixIn {

    @JsonIgnore
    boolean isIsDefault()

    @JsonProperty
    boolean getIsDefault()

    @JsonManagedReference
    Person getPerson()

}