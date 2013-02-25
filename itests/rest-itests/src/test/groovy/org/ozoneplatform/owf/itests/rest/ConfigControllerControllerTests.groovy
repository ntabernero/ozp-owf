package org.ozoneplatform.owf.itests.rest

import org.junit.Test
import org.slf4j.Logger
import org.slf4j.LoggerFactory

class ConfigControllerTests extends RestTestBase {

    Logger logger = LoggerFactory.getLogger(ConfigControllerTests.class)

    @Test
    void returnsDashboardTemplates() {
        def severConfig = getJson("${uriBase}/serverConfig.js")
        assert serverConfig.contains('var initialWidgetDefinitions')
    }
}
