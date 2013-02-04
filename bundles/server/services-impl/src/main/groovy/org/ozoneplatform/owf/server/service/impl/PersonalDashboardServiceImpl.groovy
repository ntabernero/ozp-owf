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

import org.ozoneplatform.owf.server.service.api.PersonalDashboardService
import ozone.platform.server.model.Dashboard
import ozone.platform.server.model.PersonalDashboard
import ozone.platform.server.model.Person

class PersonalDashboardServiceImpl implements PersonalDashboardService {

    List<PersonalDashboard> list() {
        dashboardMap.values().toList()
    }

    PersonalDashboard create(PersonalDashboard dashboardInfo) {
        println "In create(): ${dashboardInfo?.guid}"
        dashboardMap[(dashboardInfo.guid)] = dashboardInfo
        dashboardInfo
    }

    PersonalDashboard get(String id) {
        println "In get(): $id"
        dashboardMap[id]
    }

    void update(PersonalDashboard dashboardInfo) {
        dashboardMap[(dashboardInfo.guid)] = dashboardInfo
    }

    PersonalDashboard delete(String id) {
        def dashboard =  dashboardMap[id]
        dashboardMap[id] = null
        dashboard
    }

    PersonalDashboard restore(String id) {
        println "Restored $id"
        dashboardMap[id]
    }

    Map<String, PersonalDashboard> dashboardMap;

    PersonalDashboardServiceImpl() {
        dashboardMap = new HashMap<String, PersonalDashboard>()
        PersonalDashboard personalDashboard = createExampleDashboard()
        dashboardMap[personalDashboard.guid] = personalDashboard
    }

    PersonalDashboard createExampleDashboard() {
        PersonalDashboard personalDashboard = (PersonalDashboard)new Person('user1', 'User One').createPersonalDashboard("Dashboard1", "12345", 1, )
        personalDashboard.isDefault = true
        personalDashboard
    }
}
