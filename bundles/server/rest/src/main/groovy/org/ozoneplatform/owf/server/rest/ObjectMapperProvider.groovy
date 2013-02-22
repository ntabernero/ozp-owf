package org.ozoneplatform.owf.server.rest

import com.fasterxml.jackson.databind.ObjectMapper
import org.ozoneplatform.commons.server.domain.model.*
import org.ozoneplatform.owf.server.rest.mix_ins.*

import javax.ws.rs.ext.ContextResolver
import javax.ws.rs.ext.Provider
import java.text.SimpleDateFormat

//import org.ozoneplatform.commons.server.domain.model.PersonalDashboard
@Provider
public class ObjectMapperProvider implements ContextResolver<ObjectMapper> {
    private ObjectMapper mapper = new ObjectMapper()

    public ObjectMapperProvider() {
        mapper.dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss")
        mapper.addMixInAnnotations(PersonalWidgetDefinition.class, PersonalWidgetDefinitionMixIn.class)
        mapper.addMixInAnnotations(WidgetDefinition.class, WidgetDefinitionMixIn.class)
        mapper.addMixInAnnotations(Person.class, PersonMixIn.class)
        mapper.addMixInAnnotations(DashboardInstance.class, DashboardInstanceMixIn.class)
        mapper.addMixInAnnotations(DashboardTemplate.class, DashboardTemplateMixIn.class)
        mapper.addMixInAnnotations(Group.class, GroupMixIn.class)
        mapper.addMixInAnnotations(Stack.class, StackMixIn.class)
        mapper.addMixInAnnotations(Preference.class, PreferenceMixIn.class)
    }

    public ObjectMapper getContext(Class<?> type) { return mapper }
}