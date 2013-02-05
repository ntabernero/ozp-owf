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
import ozone.platform.server.model.Group
import ozone.platform.server.model.Stack
//import ozone.platform.server.model.PersonalDashboard
import java.text.SimpleDateFormat
import ozone.platform.server.model.DashboardTemplate

@Provider
public class ObjectMapperProvider implements ContextResolver<ObjectMapper> {
    private ObjectMapper mapper = new ObjectMapper();

    public ObjectMapperProvider() {
        mapper.dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
        mapper.addMixInAnnotations(PersonalWidgetDefinition.class, PersonalWidgetDefinitionMixIn.class);
        mapper.addMixInAnnotations(WidgetDefinition.class, WidgetDefinitionMixIn.class);
        mapper.addMixInAnnotations(Person.class, ConnectedPersonMixIn.class);
        mapper.addMixInAnnotations(DashboardInstance.class, DashboardInstanceMixIn.class);
        mapper.addMixInAnnotations(DashboardTemplate.class, DashboardTemplateMixIn.class);
        mapper.addMixInAnnotations(Group.class, DisconnectedGroupMixin.class);
        mapper.addMixInAnnotations(Stack.class, DisconnectedStackMixin.class);
    }

    public ObjectMapper getContext(Class<?> type) { return mapper; }
}