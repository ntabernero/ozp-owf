package org.ozoneplatform.owf.server.service.impl

import org.ozoneplatform.owf.server.service.api.WidgetDefinitionService
import org.ozoneplatform.owf.server.service.api.model.WidgetDefinition
import org.ozoneplatform.owf.server.service.api.model.Intent
import org.ozoneplatform.owf.server.service.api.model.Person
import org.ozoneplatform.owf.server.service.api.model.Group

class WidgetDefinitionServiceImpl implements WidgetDefinitionService {
    @Override
    List<WidgetDefinition> list() {
        widgetDefinitionMap.values().toList()
    }

    @Override
    WidgetDefinition get(String widgetId) {
        widgetDefinitionMap[widgetId]
    }

    @Override
    WidgetDefinition create(WidgetDefinition widgetDefinition) {
        widgetDefinitionMap[widgetDefinition.guid] = widgetDefinition
        widgetDefinition
    }

    @Override
    WidgetDefinition update(String widgetId, WidgetDefinition widgetDefinition) {
        if (widgetDefinitionMap[(widgetDefinition.guid)]) {
            widgetDefinitionMap[(widgetDefinition.guid)] = widgetDefinition
        }
    }

    @Override
    WidgetDefinition delete(String widgetId) {
        widgetDefinitionMap.remove(widgetId)
    }

    @Override
    WidgetDefinition addIntent(String widgetId, Intent intent) {
        widgetDefinitionMap[widgetId].sendableIntents << intent
        widgetDefinitionMap[widgetId]
    }

    @Override
    WidgetDefinition updateIntent(String widgetId, Intent intent) {
        return null  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    WidgetDefinition deleteIntent(String widgetId, String intentId) {
        return null  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    List<Person> getPersons(String widgetId) {
        return null  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    WidgetDefinition addPerson(String widgetId, String personId) {
        return null  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    WidgetDefinition removePerson(String widgetId, String personId) {
        return null  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    List<Group> getGroups(String widgetId) {
        return null  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    WidgetDefinition addGroup(String widgetId, String groupId) {
        return null  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    WidgetDefinition removeGroup(String widgetId, String groupId) {
        return null  //To change body of implemented methods use File | Settings | File Templates.
    }

    Map<String, WidgetDefinition> widgetDefinitionMap;

    WidgetDefinitionServiceImpl() {
        widgetDefinitionMap = new HashMap<String, WidgetDefinition>()
        WidgetDefinition widgetDefinition = createExampleWidgetDefinition()
        widgetDefinitionMap[widgetDefinition.guid] = widgetDefinition
    }

    WidgetDefinition createExampleWidgetDefinition() {
        new WidgetDefinition([guid:"12345", displayName: "Example Widget Definition", widgetUrl: "http://www.example.com",
                imageUrlLarge: "http://large.image.com", imageUrlSmall: "http://small.image.com", widgetType:"standard"])
    }
}
