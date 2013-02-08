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

import org.ozoneplatform.owf.server.service.api.DashboardInstanceService
import org.ozoneplatform.commons.server.domain.model.DashboardInstance
import org.ozoneplatform.commons.server.domain.model.Person

class DashboardInstanceServiceImpl implements DashboardInstanceService {

    List<DashboardInstance> list() {
        dashboardMap.values().toList()
    }

    DashboardInstance create(DashboardInstance dashboardInfo) {
        dashboardInfo.id = UUID.randomUUID().toString()
        println "In create(): ${dashboardInfo?.id}"
        dashboardMap[(dashboardInfo.id)] = dashboardInfo
        dashboardInfo
    }

    DashboardInstance get(String id) {
        println "In get(): $id"
        dashboardMap[id]
    }

    void update(DashboardInstance dashboardInfo) {
        dashboardMap[(dashboardInfo.id)] = dashboardInfo
    }

    DashboardInstance delete(String id) {
        def dashboard =  dashboardMap[id]
        dashboardMap[id] = null
        dashboard
    }

    DashboardInstance restore(String id) {
        println "Restored $id"
        dashboardMap[id]
    }

    Map<String, DashboardInstance> dashboardMap;

    DashboardInstanceServiceImpl() {
        dashboardMap = new HashMap<String, DashboardInstance>()
        DashboardInstance dashboardInstance = createExampleDashboards()
    }

    void createExampleDashboards() {
        def person = new Person('user1', 'User One')
        DashboardInstance dashboardInstance = person.createDashboardInstance("Test Dashboard 1", 0, )
        dashboardInstance.id = '11a777b9-96e5-4f64-883e-8067ba99b3ee'
        dashboardInstance.layoutConfig = """
        {
            "widgets": [
                {
                    "universalName": null,
                    "widgetGuid": "eb5435cf-4021-4f2a-ba69-dde451d12551",
                    "uniqueId": "f25ac11a-8401-4ec3-abd4-7ed5d66423d2",
                    "dashboardGuid": "dba76cba-52b1-4da0-82c5-5a066f6720e7",
                    "paneGuid": "e4894cef-e085-3903-903b-f2a509e6c224",
                    "name": "Channel Shouter1",
                    "active": false,
                    "x": 549,
                    "y": 7,
                    "minimized": false,
                    "maximized": false,
                    "pinned": false,
                    "collapsed": false,
                    "columnPos": 0,
                    "buttonId": null,
                    "buttonOpened": false,
                    "region": "none",
                    "statePosition": 2,
                    "intentConfig": null,
                    "launchData": null,
                    "singleton": false,
                    "floatingWidget": false,
                    "background": false,
                    "zIndex": 19000,
                    "height": 250,
                    "width": 295
                },
                {
                    "universalName": null,
                    "widgetGuid": "ec5435cf-4021-4f2a-ba69-dde451d12551",
                    "uniqueId": "9c30452d-5f38-4d20-8972-6f9fc3232d44",
                    "dashboardGuid": "dba76cba-52b1-4da0-82c5-5a066f6720e7",
                    "paneGuid": "e4894cef-e085-3903-903b-f2a509e6c224",
                    "name": "Channel Listener1",
                    "active": true,
                    "x": 4,
                    "y": 5,
                    "minimized": false,
                    "maximized": false,
                    "pinned": false,
                    "collapsed": false,
                    "columnPos": 0,
                    "buttonId": null,
                    "buttonOpened": false,
                    "region": "none",
                    "statePosition": 1,
                    "intentConfig": null,
                    "launchData": null,
                    "singleton": false,
                    "floatingWidget": false,
                    "background": false,
                    "zIndex": 19010,
                    "height": 383,
                    "width": 540
                }
            ],
            "height": "100%",
            "items": [
            ],
            "xtype": "tabbedpane",
            "flex": 1,
            "paneType": "tabbedpane"
        }
        """
        dashboardMap[dashboardInstance.id] = dashboardInstance

        dashboardInstance = person.createDashboardInstance("Test Dashboard 2", 1, )
        dashboardInstance.id = '21a777b9-96e5-4f64-883e-8067ba99b3ee'
        dashboardInstance.layoutConfig = """
        {
            "defaultSettings": {
                "widgetStates": {
                    "eb5435cf-4021-4f2a-ba69-dde451d12551": {
                        "x": 549,
                        "y": 7,
                        "height": 250,
                        "width": 295,
                        "timestamp": 1359571762980
                    },
                    "ec5435cf-4021-4f2a-ba69-dde451d12551": {
                        "x": 4,
                        "y": 5,
                        "height": 383,
                        "width": 540,
                        "timestamp": 1359571762981
                    }
                }
            },
            "widgets": [
                {
                    "universalName": null,
                    "widgetGuid": "eb5435cf-4021-4f2a-ba69-dde451d12551",
                    "uniqueId": "f25ac11a-8401-4ec3-abd4-7ed5d66423d2",
                    "dashboardGuid": "dba76cba-52b1-4da0-82c5-5a066f6720e7",
                    "paneGuid": "e4894cef-e085-3903-903b-f2a509e6c224",
                    "name": "Channel Shouter2",
                    "active": false,
                    "x": 549,
                    "y": 7,
                    "minimized": false,
                    "maximized": false,
                    "pinned": false,
                    "collapsed": false,
                    "columnPos": 0,
                    "buttonId": null,
                    "buttonOpened": false,
                    "region": "none",
                    "statePosition": 2,
                    "intentConfig": null,
                    "launchData": null,
                    "singleton": false,
                    "floatingWidget": false,
                    "background": false,
                    "zIndex": 19000,
                    "height": 250,
                    "width": 295
                },
                {
                    "universalName": null,
                    "widgetGuid": "ec5435cf-4021-4f2a-ba69-dde451d12551",
                    "uniqueId": "9c30452d-5f38-4d20-8972-6f9fc3232d44",
                    "dashboardGuid": "dba76cba-52b1-4da0-82c5-5a066f6720e7",
                    "paneGuid": "e4894cef-e085-3903-903b-f2a509e6c224",
                    "name": "Channel Listener2",
                    "active": true,
                    "x": 4,
                    "y": 5,
                    "minimized": false,
                    "maximized": false,
                    "pinned": false,
                    "collapsed": false,
                    "columnPos": 0,
                    "buttonId": null,
                    "buttonOpened": false,
                    "region": "none",
                    "statePosition": 1,
                    "intentConfig": null,
                    "launchData": null,
                    "singleton": false,
                    "floatingWidget": false,
                    "background": false,
                    "zIndex": 19010,
                    "height": 383,
                    "width": 540
                }
            ],
            "height": "100%",
            "items": [
            ],
            "xtype": "desktoppane",
            "flex": 1,
            "paneType": "desktoppane"
        },
        locked: false,
        defaultDashboard: false

    },
    {
        name: 'Test Dashboard 3',
        guid: '31a777b9-96e5-4f64-883e-8067ba99b3ee',
        dashboardPosition: 2,
        alteredByAdmin: false,
        description: '',
        layoutConfig: {
            "widgets": [
                {
                    "universalName": null,
                    "widgetGuid": "eb5435cf-4021-4f2a-ba69-dde451d12551",
                    "uniqueId": "f25ac11a-8401-4ec3-abd4-7ed5d66423d2",
                    "dashboardGuid": "dba76cba-52b1-4da0-82c5-5a066f6720e7",
                    "paneGuid": "e4894cef-e085-3903-903b-f2a509e6c224",
                    "name": "Channel Shouter3",
                    "active": false,
                    "x": 549,
                    "y": 7,
                    "minimized": false,
                    "maximized": false,
                    "pinned": false,
                    "collapsed": false,
                    "columnPos": 0,
                    "buttonId": null,
                    "buttonOpened": false,
                    "region": "none",
                    "statePosition": 2,
                    "intentConfig": null,
                    "launchData": null,
                    "singleton": false,
                    "floatingWidget": false,
                    "background": false,
                    "zIndex": 19000,
                    "height": 250,
                    "width": 295
                }
            ],
            "height": "100%",
            "items": [
            ],
            "xtype": "fitpane",
            "flex": 1,
            "paneType": "fitpane"
        }
        """
        dashboardMap[dashboardInstance.id] = dashboardInstance
    }
}
