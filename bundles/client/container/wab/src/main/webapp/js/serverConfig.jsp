<%@ page contentType="text/javascript; UTF-8" %>
<%="//data generated from the server"%>

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
        name: 'Test Dashboard 1',
        guid: '11a777b9-96e5-4f64-883e-8067ba99b3ee',
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
                    ]
                }, {
                    vtype: 'fitpane',
                    htmlText: "50%",
                    width: "50%",
                    "widgets": [
                         {
                              "universalName": null,
                              "widgetGuid": "eb5435cf-4021-4f2a-ba69-dde451d12551",
                              "uniqueId": "f25ac11a-8401-4ec3-abd4-7ed5d66423d3",
                              "dashboardGuid": "dba76cba-52b1-4da0-82c5-5a066f6720e7",
                              "paneGuid": "e4894cef-e085-3903-903b-f2a509e6c225",
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
        guid: '21a777b9-96e5-4f64-883e-8067ba99b3ee',
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
            vtype: "desktoppane",
            paneType: "desktoppane"
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
            "vtype": "fitpane",
            "flex": 1,
            "paneType": "fitpane"
        },
        locked: false,
        defaultDashboard: false
    }
];