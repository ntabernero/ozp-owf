package org.ozoneplatform.owf.server.service.api

import org.ozoneplatform.owf.server.service.api.model.WidgetDefinition
import org.ozoneplatform.owf.server.service.api.model.Intent
import org.ozoneplatform.owf.server.service.api.model.Person
import org.ozoneplatform.owf.server.service.api.model.Group

interface WidgetDefinitionService {
    List<WidgetDefinition> list()

    WidgetDefinition get(String widgetId)

    WidgetDefinition delete(String widgetId)

    WidgetDefinition addIntent(String widgetId, Intent intent)

    WidgetDefinition updateIntent(String widgetId, Intent intent)

    WidgetDefinition deleteIntent(String widgetId, String intentId)

    List<Person> getPersons(String widgetId)

    WidgetDefinition addPerson(String widgetId, String personId)

    WidgetDefinition removePerson(String widgetId, String personId)

    List<Group> getGroups(String widgetId)

    WidgetDefinition addGroup(String widgetId, String groupId)

    WidgetDefinition removeGroup(String widgetId, String groupId)
}
