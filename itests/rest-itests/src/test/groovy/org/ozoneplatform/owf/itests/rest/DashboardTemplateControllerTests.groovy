package org.ozoneplatform.owf.itests.rest

import org.junit.Test
import org.slf4j.Logger
import org.slf4j.LoggerFactory

class DashboardTemplateControllerTests extends RestTestBase {

    Logger logger = LoggerFactory.getLogger(DashboardTemplateControllerTests.class)

    @Test
    void returnsDashboardTemplates() {
        def dashboardTemplates = getJson("${uriBase}/dashboard-templates")
        assert dashboardTemplates.size() == 1
    }

    @Test
    void returnsDashboardTemplate() {
        logger.info("In returnsDashboardTemplate()")
        def dashboardTemplates = getJson("${uriBase}/dashboard-templates")
        assert dashboardTemplates.size() == 1
        def id = dashboardTemplates[0].id
        def dashboardTemplate = getJson("${uriBase}/dashboard-templates/${id}")
        assert dashboardTemplate.id == id
        assert dashboardTemplate.name == "Dashboard1"
    }


    @Test
    void createsAndReturnsDashboardTemplate() {

        logger.info("In createsAndReturnsDashboardTemplate()")
        def dashboardJson = """
        {
            "name": "Dashboard3",
            "position": 2,
            "isLocked": false,
            "layoutConfig": {
                "prop1": "test1",
                "prop2": ["test2", "test3"]
            }
        }"""
        def dashboardTemplate = postJson("${uriBase}/dashboard-templates", dashboardJson.toString())

        assert dashboardTemplate.id != null
        def id = dashboardTemplate.id

        dashboardTemplate = getJson("${uriBase}/dashboard-templates/${id}")
        assert dashboardTemplate.id == id
        assert dashboardTemplate.name == "Dashboard3"
    }
}
