package org.ozoneplatform.owf.server.rest.mix_ins

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty

public abstract class DashboardMixIn {

    @JsonIgnore
    abstract boolean isIsLocked()

    @JsonProperty
    abstract boolean getIsLocked()

    @JsonIgnore
    abstract String layoutConfig

    @JsonProperty("layoutConfig")
    abstract Object getLayoutConfigJson()
}