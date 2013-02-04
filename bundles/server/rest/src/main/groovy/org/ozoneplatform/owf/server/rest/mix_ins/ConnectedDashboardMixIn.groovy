package org.ozoneplatform.owf.server.rest.mix_ins

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty

public interface ConnectedDashboardMixIn {

    @JsonIgnore
    boolean getLocked()

    @JsonProperty
    boolean isLocked()

}