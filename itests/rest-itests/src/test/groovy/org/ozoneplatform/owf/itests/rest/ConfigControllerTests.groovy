package org.ozoneplatform.owf.itests.rest

import org.junit.Test
import org.slf4j.Logger
import org.slf4j.LoggerFactory

class ConfigControllerTests extends RestTestBase {

    Logger logger = LoggerFactory.getLogger(ConfigControllerTests.class)

    @Test
    void returnsServerConfig() {
        def serverConfig = getJavascript("${uriBase}/serverConfig.js")
        assert serverConfig.contains('initialWidgetDefinitions = [')
        assert serverConfig.contains('initialDashboards = [')
    }
}
