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
package org.ozoneplatform.owf.server.rest

import com.fasterxml.jackson.databind.ObjectMapper
import groovy.text.SimpleTemplateEngine
import org.ozoneplatform.owf.server.service.api.DashboardInstanceService
import org.slf4j.Logger
import org.slf4j.LoggerFactory

import javax.ws.rs.GET
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.Response

@Path("/index")
@Produces("text/html")
class WelcomeController extends OwfRestController {
    private static final String TEMPLATE_FILE = 'template/index.html'

    DashboardInstanceService dashboardInstanceService

    ObjectMapperProvider objectMapperProvider

    SimpleTemplateEngine templateEngine = new groovy.text.SimpleTemplateEngine()

    Logger logger = LoggerFactory.getLogger(DashboardTemplateController.class)

    @GET
    Response welcomePage() {

        def dashboardList = dashboardInstanceService.list()

        ObjectMapper objectMapper = objectMapperProvider.getContext(null)

        String dashboardJson = objectMapper.writeValueAsString(dashboardList)

        def templateText = readTemplate(TEMPLATE_FILE)
        def template = templateEngine.createTemplate(templateText).make([dashboardList: dashboardJson])

        Response.ok(template.toString()).build();
    }

    private String readTemplate(String fileName) {
        BufferedReader bufferedReader = new BufferedReader (new InputStreamReader(this.class.classLoader.getResourceAsStream(fileName)))
        bufferedReader.text
    }

}
