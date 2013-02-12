package org.ozoneplatform.owf.server.rest.mix_ins

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.fasterxml.jackson.annotation.JsonProperty
import org.ozoneplatform.commons.server.domain.model.Person

public abstract class DashboardInstanceMixIn extends DashboardMixIn {

    protected DashboardInstanceMixIn(@JsonProperty("name") String name, @JsonProperty("position") int position) {}

    @JsonIgnore
    abstract boolean isIsDefault()

    @JsonProperty
    abstract boolean getIsDefault()

    @JsonManagedReference
    abstract Person getPerson()

}