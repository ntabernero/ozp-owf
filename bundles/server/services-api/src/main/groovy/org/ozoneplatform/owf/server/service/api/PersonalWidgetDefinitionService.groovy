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

import ozone.platform.server.model.PersonalWidgetDefinition

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
