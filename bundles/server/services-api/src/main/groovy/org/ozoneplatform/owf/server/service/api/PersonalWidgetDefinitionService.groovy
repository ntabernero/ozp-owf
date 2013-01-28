package org.ozoneplatform.owf.server.service.api

import org.ozoneplatform.owf.server.service.api.model.PersonalWidgetDefinition

interface PersonalWidgetDefinitionService {
    List<PersonalWidgetDefinition> list(String personId)

    PersonalWidgetDefinition get(String widgetId)

    PersonalWidgetDefinition create(String personId, PersonalWidgetDefinition personalWidgetDefinition)

    PersonalWidgetDefinition update(String widgetId, PersonalWidgetDefinition personalWidgetDefinition)

    PersonalWidgetDefinition delete(String widgetId)

    void bulkUpdate(List<PersonalWidgetDefinition> personalWidgetDefinitions)

    void bulkDelete(List<PersonalWidgetDefinition> personalWidgetDefinitions)

    List<PersonalWidgetDefinition> dependents(List<PersonalWidgetDefinition> personalWidgetDefinitions)

    void approve(List<PersonalWidgetDefinition> personalWidgetDefinitions)
}
