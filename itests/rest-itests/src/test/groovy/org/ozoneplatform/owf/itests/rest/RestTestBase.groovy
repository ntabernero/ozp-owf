package org.ozoneplatform.owf.itests.rest
import groovy.json.JsonSlurper
import org.apache.http.client.fluent.Request
import org.junit.Before
import org.junit.runner.RunWith
import org.ops4j.pax.exam.Option
import org.ops4j.pax.exam.junit.Configuration
import org.ops4j.pax.exam.junit.ExamReactorStrategy
import org.ops4j.pax.exam.junit.JUnit4TestRunner
import org.ops4j.pax.exam.spi.reactors.AllConfinedStagedReactorFactory

import static org.apache.karaf.tooling.exam.options.KarafDistributionOption.keepRuntimeFolder
import static org.ops4j.pax.exam.CoreOptions.mavenBundle
import static org.ops4j.pax.exam.CoreOptions.provision

@RunWith(JUnit4TestRunner.class)
@ExamReactorStrategy(AllConfinedStagedReactorFactory.class)
abstract class RestTestBase extends OzoneTestSupport {

    def uriBase = "http://localhost:8181/cxf/owf"

    @Configuration
    Option[] configure() {
        [
                ozoneDistributionConfiguration(),
                keepRuntimeFolder(),
                provision(
                        mavenBundle().groupId('org.codehaus.groovy').artifactId('groovy-all').version('2.0.6'),
                        mavenBundle().groupId('org.apache.httpcomponents').artifactId('httpclient-osgi').version('4.2.1'),
                        mavenBundle().groupId('org.apache.httpcomponents').artifactId('httpcore-osgi').version('4.2.1'),
                )
        ]
    }

    @Before
    void setup() {
        executeCommands('features:addurl mvn:org.apache.cxf.karaf/apache-cxf/2.7.2/xml/features', 'features:install http', 'features:install cxf')
        // TODO: Get current project version from MVN
        executeCommands('features:addurl mvn:org.ozoneplatform.owf/features/8.0.0-ALPHA-SPRINT3-SNAPSHOT/xml/features', 'features:install owf-rest')

        System.err.println executeCommand('osgi:list | grep Ozone')
        waitForServices()
        System.err.println executeCommand('osgi:list | grep Ozone')
    }

    /**
     * Even though the REST bundle is installed, the REST services need additional time to start up
     * This method will block until it can determine the REST services have been established.
     * Will try some number of times un til
     *
     * CXF will return an HTML document with "No service have been found" until the services are available
     */
    private void waitForServices() {
        int attempts = 10
        boolean ready = false
        while(!ready && attempts > 0) {
            Thread.sleep(1000)
            def response = Request.Get('http://localhost:8181/cxf').execute().returnContent().asString()
            ready = !response.contains('No services have been found')
            attempts--
            if (attempts % 2 == 0) System.err.println executeCommand('osgi:list | grep Ozone')
        }
        if (!ready) throw new Exception("OWF REST never started!")
    }

    def getJson(GString uri) {
        def jsonSlurper = new JsonSlurper()
        def json = Request.Get(uri).addHeader('Accept','application/json').execute().returnContent().asString()
        jsonSlurper.parseText(json)
    }
}
