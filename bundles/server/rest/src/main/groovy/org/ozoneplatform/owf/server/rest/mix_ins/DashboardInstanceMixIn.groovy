package org.ozoneplatform.owf.server.rest.mix_ins

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import org.ozoneplatform.commons.server.domain.model.Person
import com.fasterxml.jackson.annotation.JsonProperty

public interface DashboardInstanceMixIn extends DashboardMixIn {

    @JsonIgnore
    boolean isIsDefault()

    @JsonProperty
    boolean getIsDefault()

    @JsonManagedReference
    Person getPerson()

}