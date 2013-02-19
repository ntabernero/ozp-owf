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

package org.ozoneplatform.owf.server.service.api

import org.ozoneplatform.commons.server.domain.model.Group
import org.ozoneplatform.commons.server.domain.model.Intent
import org.ozoneplatform.commons.server.domain.model.Person
import org.ozoneplatform.commons.server.domain.model.WidgetDefinition

interface WidgetDefinitionService {
    List<WidgetDefinition> list()

    WidgetDefinition get(String widgetId)

    WidgetDefinition create(WidgetDefinition widgetDefinition)

    WidgetDefinition update(String widgetId, WidgetDefinition widgetDefinition)

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
