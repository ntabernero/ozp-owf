package org.ozoneplatform.owf.server.rest.mix_ins

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty

public interface DashboardMixIn {

    @JsonIgnore
    boolean isIsLocked()

    @JsonProperty
    boolean getIsLocked()

}