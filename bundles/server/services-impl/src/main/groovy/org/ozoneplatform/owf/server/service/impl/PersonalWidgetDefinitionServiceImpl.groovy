/* 
   Copyright 2013 Next Century Corporation 

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

package org.ozoneplatform.owf.server.service.impl

import org.ozoneplatform.commons.server.domain.model.Intent
import org.ozoneplatform.owf.server.service.api.PersonalWidgetDefinitionService
import org.ozoneplatform.commons.server.domain.model.PersonalWidgetDefinition
import org.ozoneplatform.commons.server.domain.model.WidgetDefinition
import org.ozoneplatform.commons.server.domain.model.Person

class PersonalWidgetDefinitionServiceImpl implements PersonalWidgetDefinitionService {
    @Override
    List<PersonalWidgetDefinition> list(String personId) {
        personalWidgetDefinitionMap.values().toList()
    }

    @Override
    PersonalWidgetDefinition get(String widgetId) {
        personalWidgetDefinitionMap[widgetId]
    }

    @Override
    PersonalWidgetDefinition create(String personId, PersonalWidgetDefinition personalWidgetDefinition) {
        personalWidgetDefinition.id = UUID.randomUUID().toString()
        personalWidgetDefinitionMap[personalWidgetDefinition.id] = personalWidgetDefinition
        personalWidgetDefinition
    }

    @Override
    PersonalWidgetDefinition update(String widgetId, PersonalWidgetDefinition personalWidgetDefinition) {
        if (personalWidgetDefinitionMap[(widgetId)]) {
            personalWidgetDefinitionMap[(personalWidgetDefinition.id)] = personalWidgetDefinition
        }
    }

    @Override
    PersonalWidgetDefinition delete(String widgetId) {
        personalWidgetDefinitionMap.remove(widgetId)
    }

    @Override
    void bulkUpdate(List<PersonalWidgetDefinition> personalWidgetDefinitions) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    void bulkDelete(List<PersonalWidgetDefinition> personalWidgetDefinitions) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    List<PersonalWidgetDefinition> dependents(List<PersonalWidgetDefinition> personalWidgetDefinitions) {
        return null  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    void approve(List<PersonalWidgetDefinition> personalWidgetDefinitions) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    Map<String, PersonalWidgetDefinition> personalWidgetDefinitionMap;

    PersonalWidgetDefinitionServiceImpl() {
        personalWidgetDefinitionMap = new HashMap<String, PersonalWidgetDefinition>()
        PersonalWidgetDefinition personalWidgetDefinition = createExamplePersonalWidgetDefinition()
        personalWidgetDefinitionMap[personalWidgetDefinition.id] = personalWidgetDefinition
    }

    PersonalWidgetDefinition createExamplePersonalWidgetDefinition() {
        def widgetDefinition = WidgetDefinition.builder().withDisplayName('Channel Shouter').
                withUrl('widget.html').withWidgetType('standard').build()
        widgetDefinition.id = 'eb5435cf-4021-4f2a-ba69-dde451d12551'
        widgetDefinition.width = 400
        widgetDefinition.height = 400
        widgetDefinition.tags = ["chat"]
        widgetDefinition.addReceivableIntent(new Intent('plot', 'lat/long'))
        widgetDefinition.addReceivableIntent(new Intent('render', 'html'))
        widgetDefinition.addSendableIntent(new Intent('plot', 'lat/long'))
        widgetDefinition.addSendableIntent(new Intent('render', 'html'))

        PersonalWidgetDefinition personalWidgetDefinition = new Person('user2', 'User Two').createPersonalWidgetDefinition(widgetDefinition)
        personalWidgetDefinition.displayName = widgetDefinition.displayName + " (Personal)"
        personalWidgetDefinition.id = UUID.randomUUID().toString()
        personalWidgetDefinition
    }
}
