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

import org.ozoneplatform.owf.server.service.api.PersonalWidgetDefinitionService
import org.ozoneplatform.owf.server.service.api.model.PersonalWidgetDefinition

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
        new PersonalWidgetDefinition([id: 12345, position: 1, tags: ["one", "two", "three"] as Set ])
    }
}