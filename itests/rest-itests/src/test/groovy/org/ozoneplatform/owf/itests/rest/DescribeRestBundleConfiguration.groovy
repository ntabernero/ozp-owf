package org.ozoneplatform.owf.itests.rest
import org.apache.http.client.methods.HttpGet
import org.apache.http.impl.client.DefaultHttpClient
import org.junit.Test
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
class DescribeRestBundleConfiguration extends OzoneTestSupport {

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

//    @Test
//    void itHasItsDependenciesSatisfiedAtRuntime() {
//        def restBundle = bundleContext.bundles.find {
//            'rest' == it.symbolicName
//        }
//        assertNotNull('rest bundle not loaded', restBundle)
//        assertNotNull(personService)
//    }
//
    @Test
    void cxfFeatureInstalled() {
        executeCommands('features:addurl mvn:org.apache.cxf.karaf/apache-cxf/2.7.2/xml/features', 'features:install http', 'features:install cxf')
        executeCommands('features:addurl mvn:org.ozoneplatform.owf/features/1.0.0-SNAPSHOT/xml/features', 'features:install owf-services', 'features:install owf-rest')

        System.err.println executeCommand('osgi:list | grep REST')
        waitForBlueprintToCreateRestBundle()
        System.err.println executeCommand('osgi:list | grep REST')

        def httpClient = new DefaultHttpClient()
        def get = new HttpGet('http://localhost:8181/cxf/owf/user-dashboards')
        def response = httpClient.execute(get)

        try {
            assert response.statusLine.statusCode == 200
        } finally {
            get.releaseConnection()
        }
    }

    private void waitForBlueprintToCreateRestBundle() {
        // TODO Change this to poll for Pax-Web service
        Thread.sleep(4000)
    }

    //@Test
    void itWorks() {
        def httpClient = new DefaultHttpClient()
        def get = new HttpGet('http://google.com')
        def response = httpClient.execute(get)

        try {
            assert response.statusLine.statusCode == 200
        } finally {
            get.releaseConnection()
        }
    }
}
