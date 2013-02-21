/*
 * Copyright 2013 Next Century Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


//This file contains json for personal widget definitions and personal dashboards this file is used
//during dev time to develop and test the owf ui.  If you change this file take care to check the javascript tests in both
//container and dashboard projects as they may depend on this json

var initialWidgetDefinitions = [
    {
        guid: "eb5435cf-4021-4f2a-ba69-dde451d12551",
        universalName: "",
        displayName: "Channel Shouter",
        description: "",
        url: "widget.html",
        headerIcon: "",
        image: "",
        smallIconUrl: "",
        largeIconUrl: "",
        width: 400,
        height: 400,
        minimized: false,
        maximized: false,
        version: null,
        totalUsers: 23,
        totalGroups: 1,
        tags: [
            {
                name: "chat",
                visible: true,
                position: -1,
                editable: true
            }
        ],
        singleton: false,
        visible: true,
        background: false,
        descriptorUrl: "",
        definitionVisible: true,
        directRequired: [ ],
        allRequired: [ ],
        intents: {
            send: [
                {
                    action: "action2",
                    dataTypes: [
                        "type2",
                        "type1"
                    ]
                },
                {
                    action: "action3",
                    dataTypes: [
                        "type1"
                    ]
                },
                {
                    action: "action1",
                    dataTypes: [
                        "type2",
                        "type1"
                    ]
                }
            ],
            receive: [
                {
                    action: "action2",
                    dataTypes: [
                        "type2",
                        "type1"
                    ]
                },
                {
                    action: "action3",
                    dataTypes: [
                        "type1"
                    ]
                },
                {
                    action: "action1",
                    dataTypes: [
                        "type2",
                        "type1"
                    ]
                }
            ]
        },
        widgetTypes: [
            {
                id: 1,
                name: "standard"
            }
        ]
    },
    {
        guid: "ec5435cf-4021-4f2a-ba69-dde451d12551",
        universalName: "",
        displayName: "Channel Listener",
        description: "",
        url: "widget.html",
        headerIcon: "",
        image: "",
        smallIconUrl: "",
        largeIconUrl: "",
        width: 400,
        height: 400,
        minimized: false,
        maximized: false,
        version: null,
        totalUsers: 23,
        totalGroups: 1,
        tags: [
            {
                name: "chat",
                visible: true,
                position: -1,
                editable: true
            }
        ],
        singleton: false,
        visible: true,
        background: false,
        descriptorUrl: "",
        definitionVisible: true,
        directRequired: [ ],
        allRequired: [ ],
        intents: {
            send: [
                {
                    action: "action2",
                    dataTypes: [
                        "type2",
                        "type1"
                    ]
                },
                {
                    action: "action3",
                    dataTypes: [
                        "type1"
                    ]
                },
                {
                    action: "action1",
                    dataTypes: [
                        "type2",
                        "type1"
                    ]
                }
            ],
            receive: [
                {
                    action: "action2",
                    dataTypes: [
                        "type2",
                        "type1"
                    ]
                },
                {
                    action: "action3",
                    dataTypes: [
                        "type1"
                    ]
                },
                {
                    action: "action1",
                    dataTypes: [
                        "type2",
                        "type1"
                    ]
                }
            ]
        },
        widgetTypes: [
            {
                id: 1,
                name: "standard"
            }
        ]
    }
];

var initialDashboards = [
    {
        name: 'Sample',
        id: '7bdbbc4d-a5aa-4fb5-bdf4-ba5c3898566f',
        dashboardPosition: 0,
        alteredByAdmin: false,
        description: '',
        layoutConfig: {"defaultSettings":{"widgetStates":{"eb5435cf-4021-4f2a-ba69-dde451d12551":{"x":549,"y":7,"height":250,"width":295,"timestamp":1361454345675},"ec5435cf-4021-4f2a-ba69-dde451d12551":{"x":4,"y":5,"height":383,"width":540,"timestamp":1361454345677},"f2f36c27-8102-e0cb-570d-a932a4814f0c":{"x":358,"y":410,"height":654,"width":650,"timestamp":1358192836524},"f05f9aa4-9698-94fd-8168-de29b0cc7936":{"x":616,"y":306,"height":440,"width":540,"timestamp":1358192853049},"2dbd41e4-43a0-f46d-5b8b-a9bcf76b4135":{"x":634,"y":258,"height":400,"width":400,"timestamp":1358192867886}}},"widgets":[{"universalName":null,"widgetGuid":"eb5435cf-4021-4f2a-ba69-dde451d12551","uniqueId":"b6ffe513-39e6-446f-8f52-0fd64ea0642a","dashboardGuid":"7bdbbc4d-a5aa-4fb5-bdf4-ba5c3898566f","paneGuid":"a96da351-aeb7-dd97-a756-f3b6231a5bbd","name":"Channel Shouter","active":false,"x":549,"y":7,"minimized":false,"maximized":false,"pinned":false,"collapsed":false,"columnPos":0,"buttonId":null,"buttonOpened":false,"region":"none","statePosition":2,"intentConfig":null,"launchData":null,"singleton":false,"floatingWidget":false,"background":false,"zIndex":19000,"height":250,"width":295},{"universalName":null,"widgetGuid":"ec5435cf-4021-4f2a-ba69-dde451d12551","uniqueId":"bf3140ad-58fa-461b-804d-82113ed863a8","dashboardGuid":"7bdbbc4d-a5aa-4fb5-bdf4-ba5c3898566f","paneGuid":"a96da351-aeb7-dd97-a756-f3b6231a5bbd","name":"Channel Listener","active":true,"x":4,"y":5,"minimized":false,"maximized":false,"pinned":false,"collapsed":false,"columnPos":0,"buttonId":null,"buttonOpened":false,"region":"none","statePosition":1,"intentConfig":null,"launchData":null,"singleton":false,"floatingWidget":false,"background":false,"zIndex":19010,"height":383,"width":540}],"height":"100%","items":[],"xtype":"desktoppane","flex":1,"paneType":"desktoppane"},
        locked: false,
        defaultDashboard: true

    },
    {
        name: 'Watch List',
        id: '14ff5757-e96e-4777-85c1-1d16f8c5e525',
        dashboardPosition: 0,
        alteredByAdmin: false,
        description: '',
        layoutConfig: {
            "height":"100%",
            "cls":"vbox ",
            "items":[
                {
                    "cls":"hbox top",
                    "items":[
                        {
                            "defaultSettings":{},
                            "widgets":[{"universalName":"org.owfgoss.owf.examples.NYSE","widgetGuid":"ec5435cf-4021-4f2a-ba69-dde451d12551","uniqueId":"5911b225-86cc-4d96-8286-40a5a638bc8f","dashboardGuid":"14ff5757-e96e-4777-85c1-1d16f8c5e525","paneGuid":"7a7eb868-35e1-1cb2-cf90-1945ba7c4ca8","intentConfig":null,"launchData":null,"name":"NYSE Widget","active":true,"x":0,"y":34,"zIndex":0,"minimized":false,"maximized":false,"pinned":false,"collapsed":false,"columnPos":0,"buttonId":null,"buttonOpened":false,"region":"none","statePosition":1,"singleton":false,"floatingWidget":false,"height":288,"width":838}],
                            "cls":"left",
                            "htmlText":"50%",
                            "items":[],
                            "xtype":"fitpane",
                            "flex":1,
                            "paneType":"fitpane"
                        },
                        {"xtype":"dashboardsplitter"},
                        {"defaultSettings":{},"widgets":[{"universalName":"org.owfgoss.owf.examples.HTMLViewer","widgetGuid":"ec5435cf-4021-4f2a-ba69-dde451d12551","uniqueId":"beb9ba60-be69-4fd7-b2ce-929a65847eca","dashboardGuid":"14ff5757-e96e-4777-85c1-1d16f8c5e525","paneGuid":"08e5d375-7b99-56f5-15da-353e64953e4f","intentConfig":null,"launchData":null,"name":"HTML Viewer","active":false,"x":842,"y":34,"zIndex":0,"minimized":false,"maximized":false,"pinned":false,"collapsed":false,"columnPos":0,"buttonId":null,"buttonOpened":false,"region":"none","statePosition":1,"singleton":false,"floatingWidget":false,"height":288,"width":838}],"cls":"right","htmlText":"50%","items":[],"xtype":"fitpane","flex":1,"paneType":"fitpane"}
                    ],
                    "layout": {
                        "align":"stretch",
                        "type":"hbox"
                    },
                    "xtype":"container",
                    "flex":1
                },
                {"xtype":"dashboardsplitter"},
                {"defaultSettings":{},"widgets":[{"universalName":"org.owfgoss.owf.examples.StockChart","widgetGuid":"ec5435cf-4021-4f2a-ba69-dde451d12551","uniqueId":"f85797ed-0e29-4c56-b7e3-75f060c52d07","dashboardGuid":"14ff5757-e96e-4777-85c1-1d16f8c5e525","paneGuid":"123b9271-dbfb-71cb-38e7-0dcf5b137934","intentConfig":null,"launchData":null,"name":"Stock Chart","active":false,"x":0,"y":326,"zIndex":0,"minimized":false,"maximized":false,"pinned":false,"collapsed":false,"columnPos":0,"buttonId":null,"buttonOpened":false,"region":"none","statePosition":1,"singleton":false,"floatingWidget":false,"height":288,"width":1680}],"cls":"bottom","htmlText":"50%","items":[],"xtype":"fitpane","flex":1,"paneType":"fitpane"}],"layout":{"align":"stretch","type":"vbox"},"xtype":"container"
        },
        locked: false,
        defaultDashboard: true

    },
    {
        name: 'Contacts',
        id: '11a777b9-96e5-4f64-883e-8067ba99b3ee',
        dashboardPosition: 0,
        alteredByAdmin: false,
        description: '',
        layoutConfig: {"cls":"hbox ","items":[{"defaultSettings":{"widgetStates":{"92448ba5-7f2b-982a-629e-9d621268b5e9":{"timestamp":1361455269246},"302c35c9-9ed8-d0b6-251c-ea1ed4d0c86b":{"timestamp":1361455269252},"d182002b-3de2-eb24-77be-95a7d08aa85b":{"timestamp":1354745224627}}},"widgets":[{"universalName":"org.owfgoss.owf.examples.ContactsManager","widgetGuid":"ec5435cf-4021-4f2a-ba69-dde451d12551","uniqueId":"0d0a3052-96b6-4443-b07a-e6c1b167f573","dashboardGuid":"4bb57740-646b-4e3c-8169-d85d8836bd34","paneGuid":"5562f1af-6247-1b29-2455-5ecae48aa9f7","intentConfig":null,"launchData":null,"name":"Contacts Manager","active":false,"x":0,"y":34,"zIndex":0,"minimized":false,"maximized":false,"pinned":false,"collapsed":false,"columnPos":0,"buttonId":null,"buttonOpened":false,"region":"none","statePosition":1,"singleton":false,"floatingWidget":false,"height":287,"width":419},{"universalName":"org.owfgoss.owf.examples.GetDirections","widgetGuid":"ec5435cf-4021-4f2a-ba69-dde451d12551","uniqueId":"5c88def5-ad88-4f9b-aec7-be0cfe66b053","dashboardGuid":"4bb57740-646b-4e3c-8169-d85d8836bd34","paneGuid":"5562f1af-6247-1b29-2455-5ecae48aa9f7","intentConfig":{},"launchData":null,"name":"Directions","active":false,"x":0,"y":321,"zIndex":0,"minimized":false,"maximized":false,"pinned":false,"collapsed":false,"columnPos":0,"buttonId":null,"buttonOpened":false,"region":"none","statePosition":2,"singleton":false,"floatingWidget":false,"height":287,"width":419}],"cls":"left","htmlText":"25%","items":[],"xtype":"accordionpane","flex":0.25,"paneType":"accordionpane"},{"xtype":"dashboardsplitter"},{"defaultSettings":{"widgetStates":{"eb81c029-a5b6-4107-885c-5e04b4770767":{"timestamp":1354747222264},"b87c4a3e-aa1e-499e-ba10-510f35388bb6":{"timestamp":1354746772856},"c3f3c8e0-e7aa-41c3-a655-aca3c940f828":{"timestamp":1354746826290},"eb5435cf-4021-4f2a-ba69-dde451d12551":{"timestamp":1354746684154},"ec5435cf-4021-4f2a-ba69-dde451d12551":{"timestamp":1354746684155},"d182002b-3de2-eb24-77be-95a7d08aa85b":{"timestamp":1361455269263},"d6ce3375-6e89-45ab-a7be-b6cf3abb0e8c":{"timestamp":1354747222261}}},"widgets":[{"universalName":"org.owfgoss.owf.examples.GoogleMaps","widgetGuid":"ec5435cf-4021-4f2a-ba69-dde451d12551","uniqueId":"394f7dae-2ff3-4e79-80a3-dfde9a7e413d","dashboardGuid":"4bb57740-646b-4e3c-8169-d85d8836bd34","paneGuid":"e3058feb-3325-07db-6c04-b9ddfca3d3d4","intentConfig":null,"launchData":null,"name":"Google Maps","active":true,"x":423,"y":62,"zIndex":0,"minimized":false,"maximized":false,"pinned":false,"collapsed":false,"columnPos":0,"buttonId":null,"buttonOpened":false,"region":"none","statePosition":1,"singleton":false,"floatingWidget":false,"height":546,"width":1257}],"cls":"right","htmlText":"75%","items":[],"xtype":"tabbedpane","flex":0.75,"paneType":"tabbedpane"}],"layout":{"align":"stretch","type":"hbox"},"xtype":"container","flex":1},
        locked: false,
        defaultDashboard: true

    },
    {
        name: 'Test Accordion Dashboard',
        id: '11a777b9-96e5-4f64-883e-8067ba99b3gg',
        dashboardPosition: 0,
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
            "vtype": "accordionpane",
            "paneType": "accordionpane"
        },
        locked: false,
        defaultDashboard: true

    },
    {
        name: 'Test Portal Dashboard',
        id: '01a777b9-96e5-4f64-883e-8067ba99b3ee',
        dashboardPosition: 0,
        alteredByAdmin: false,
        description: '',
        layoutConfig: {
            "widgets": [
                {
                    "widgetGuid": "eb5435cf-4021-4f2a-ba69-dde451d12551",
                    "id": "f25ac11a-8401-4ec3-abd4-7ed5d66423d2",
                    "name": "Channel Shouter1",
                    "active": false,
                    "x": 549,
                    "y": 7,
                    "minimized": false,
                    "maximized": false,
                    "collapsed": false,
                    "intentConfig": null,
                    "launchData": null,
                    "zIndex": 19000,
                    "height": 250,
                    "width": 295
                },
                {
                    "widgetGuid": "ec5435cf-4021-4f2a-ba69-dde451d12551",
                    "id": "9c30452d-5f38-4d20-8972-6f9fc3232d44",
                    "name": "Channel Listener1",
                    "active": true,
                    "x": 4,
                    "y": 5,
                    "minimized": false,
                    "maximized": false,
                    "collapsed": false,
                    "intentConfig": null,
                    "launchData": null,
                    "zIndex": 19010,
                    "height": 383,
                    "width": 540
                }
            ],
            "height": "100%",
            "vtype": "portalpane",
            "paneType": "portalpane"
        },
        locked: false,
        defaultDashboard: true

    },
    {
        name: 'Test Dashboard 1',
        id: '11a777b9-96e5-4f64-883e-8067ba99b3ee',
        dashboardPosition: 0,
        alteredByAdmin: false,
        description: '',
        layoutConfig: {
            vtype: "boxpane",
            paneType: "tabbedpane",
            box: {
                vtype: 'hbox',
                panes: [{
                    vtype: 'tabbedpane',
                    htmlText: "50%",
                    width: "50%",
                    "widgets": [
                         {
                              "widgetGuid": "eb5435cf-4021-4f2a-ba69-dde451d12551",
                              "id": "f25ac11a-8401-4ec3-abd4-7ed5d66423d2",
                              "name": "Channel Shouter1",
                              "active": false,
                              "x": 549,
                              "y": 7,
                              "minimized": false,
                              "maximized": false,
                              "collapsed": false,
                              "intentConfig": null,
                              "launchData": null,
                              "zIndex": 19000,
                              "height": 250,
                              "width": 295
                         },
                         {
                              "widgetGuid": "ec5435cf-4021-4f2a-ba69-dde451d12551",
                              "id": "9c30452d-5f38-4d20-8972-6f9fc3232d44",
                              "name": "Channel Listener1",
                              "active": true,
                              "x": 4,
                              "y": 5,
                              "minimized": false,
                              "maximized": false,
                              "collapsed": false,
                              "intentConfig": null,
                              "launchData": null,
                              "zIndex": 19010,
                              "height": 383,
                              "width": 540
                         }
                    ]
                }, {
                    vtype: 'fitpane',
                    htmlText: "50%",
                    width: "50%",
                    "widgets": [
                         {
                              "widgetGuid": "eb5435cf-4021-4f2a-ba69-dde451d12551",
                              "id": "f25ac11a-8401-4ec3-abd4-7ed5d66423d3",
                              "name": "Channel Shouter1",
                              "active": false,
                              "x": 549,
                              "y": 7,
                              "minimized": false,
                              "maximized": false,
                              "collapsed": false,
                              "intentConfig": null,
                              "launchData": null,
                              "zIndex": 19000,
                              "height": 250,
                              "width": 295
                         }
                    ]
                }]
            }
        },
        locked: false,
        defaultDashboard: true

    },
    {
        name: 'Test Dashboard 2',
        id: '21a777b9-96e5-4f64-883e-8067ba99b3ee',
        dashboardPosition: 1,
        alteredByAdmin: false,
        description: '',
        layoutConfig: {
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
                    "widgetGuid": "eb5435cf-4021-4f2a-ba69-dde451d12551",
                    "id": "f25ac11a-8401-4ec3-abd4-7ed5d66423d2",
                    "name": "Channel Shouter2",
                    "active": false,
                    "x": 549,
                    "y": 7,
                    "minimized": false,
                    "maximized": false,
                    "collapsed": false,
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
                    "widgetGuid": "ec5435cf-4021-4f2a-ba69-dde451d12551",
                    "id": "9c30452d-5f38-4d20-8972-6f9fc3232d44",
                    "name": "Channel Listener2",
                    "active": true,
                    "x": 4,
                    "y": 5,
                    "minimized": false,
                    "maximized": false,
                    "collapsed": false,
                    "intentConfig": null,
                    "launchData": null,
                    "zIndex": 19010,
                    "height": 383,
                    "width": 540
                }
            ],
            vtype: "desktoppane",
            paneType: "desktoppane"
        },
        locked: false,
        defaultDashboard: false,
        stack: {
            "name": "Sample Stack",
            "description": "This is a sample Stack",
            "urlName": "/stack",
            "descriptorUrl": "/descriptors/sampleStackDescriptor.html"
        }

    },
    {
        name: 'Test Dashboard 3',
        id: '31a777b9-96e5-4f64-883e-8067ba99b3ee',
        dashboardPosition: 2,
        alteredByAdmin: false,
        description: '',
        layoutConfig: {
            "widgets": [
                {
                    "widgetGuid": "eb5435cf-4021-4f2a-ba69-dde451d12551",
                    "id": "f25ac11a-8401-4ec3-abd4-7ed5d66423d2",
                    "name": "Channel Shouter3",
                    "active": false,
                    "x": 549,
                    "y": 7,
                    "minimized": false,
                    "maximized": false,
                    "collapsed": false,
                    "intentConfig": null,
                    "launchData": null,
                    "zIndex": 19000,
                    "height": 250,
                    "width": 295
                }
            ],
            "height": "100%",
            "vtype": "fitpane",
            "paneType": "fitpane"
        },
        locked: false,
        defaultDashboard: false ,
        groups: [{
            "id": 1,
            "name": "users",
            "description": "This is a users' group.",
            "displayName": "Users Group",
            "active": true,
            "automatic": false
        },{
            "id": 2,
            "name": "admin",
            "description": "This is an administrator's group.",
            "displayName": "Admin Group",
            "active": true,
            "automatic": false
        }]
    }
];
