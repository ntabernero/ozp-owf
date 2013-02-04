package org.ozoneplatform.owf.server.rest

import javax.ws.rs.ext.Provider
import com.fasterxml.jackson.databind.ObjectMapper
import javax.ws.rs.ext.ContextResolver
import ozone.platform.server.model.PersonalWidgetDefinition
import org.ozoneplatform.owf.server.rest.mix_ins.*
import ozone.platform.server.model.WidgetDefinition
import ozone.platform.server.model.Person
import ozone.platform.server.model.Dashboard
import ozone.platform.server.model.DashboardInstance

@Provider
public class ObjectMapperProvider implements ContextResolver<ObjectMapper> {
    private ObjectMapper mapper = new ObjectMapper();

    public ObjectMapperProvider() {
        mapper.addMixInAnnotations(PersonalWidgetDefinition.class, ConnectedPersonalWidgetDefinitionMixIn.class);
        mapper.addMixInAnnotations(WidgetDefinition.class, ConnectedWidgetDefinitionMixIn.class);
        mapper.addMixInAnnotations(Person.class, ConnectedPersonMixIn.class);
        mapper.addMixInAnnotations(Dashboard.class, ConnectedDashboardMixIn.class);
        mapper.addMixInAnnotations(DashboardInstance.class, ConnectedDashboardInstanceMixIn.class);
    }

    public ObjectMapper getContext(Class<?> type) { return mapper; }
}