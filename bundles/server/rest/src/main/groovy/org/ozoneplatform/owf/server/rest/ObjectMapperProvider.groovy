package org.ozoneplatform.owf.server.rest

import javax.ws.rs.ext.Provider
import com.fasterxml.jackson.databind.ObjectMapper
import javax.ws.rs.ext.ContextResolver
import org.ozoneplatform.commons.server.domain.model.PersonalWidgetDefinition
import org.ozoneplatform.owf.server.rest.mix_ins.*
import org.ozoneplatform.commons.server.domain.model.WidgetDefinition
import org.ozoneplatform.commons.server.domain.model.Person

import org.ozoneplatform.commons.server.domain.model.DashboardInstance
import org.ozoneplatform.commons.server.domain.model.Group
import org.ozoneplatform.commons.server.domain.model.Stack
//import org.ozoneplatform.commons.server.domain.model.PersonalDashboard
import java.text.SimpleDateFormat
import org.ozoneplatform.commons.server.domain.model.DashboardTemplate

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
    }

    public ObjectMapper getContext(Class<?> type) { return mapper }
}