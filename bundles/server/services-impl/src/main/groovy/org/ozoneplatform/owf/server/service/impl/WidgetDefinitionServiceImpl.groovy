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

import org.ozoneplatform.owf.server.service.api.WidgetDefinitionService
import org.ozoneplatform.commons.server.domain.model.WidgetDefinition
import org.ozoneplatform.commons.server.domain.model.Intent
import org.ozoneplatform.commons.server.domain.model.Person
import org.ozoneplatform.commons.server.domain.model.Group

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
        widgetDefinition.id = UUID.randomUUID().toString()
        widgetDefinitionMap[widgetDefinition.id] = widgetDefinition
        widgetDefinition
    }

    @Override
    WidgetDefinition update(String widgetId, WidgetDefinition widgetDefinition) {
        if (widgetDefinitionMap[(widgetDefinition.id)]) {
            widgetDefinitionMap[(widgetDefinition.id)] = widgetDefinition
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
        widgetDefinitionMap[widgetDefinition.id] = widgetDefinition
    }

    WidgetDefinition createExampleWidgetDefinition() {
        WidgetDefinition widgetDefinition = WidgetDefinition.builder().withDisplayName('Channel Listener').
                withImageUrlLarge('http://large.image.com').withImageUrlSmall('http://small.image.com').
                withUrl('widget.html').withWidgetType('standard').build()
        widgetDefinition.id = UUID.randomUUID().toString()
        widgetDefinition.addReceivableIntent(new Intent('plot', 'lat/long'))
        widgetDefinition.addReceivableIntent(new Intent('render', 'html'))
        widgetDefinition.addSendableIntent(new Intent('plot', 'lat/long'))
        widgetDefinition.addSendableIntent(new Intent('render', 'html'))
        widgetDefinition
    }
}
