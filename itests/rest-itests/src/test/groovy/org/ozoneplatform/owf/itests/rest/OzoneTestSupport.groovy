package org.ozoneplatform.owf.itests.rest
import org.apache.felix.service.command.CommandProcessor
import org.apache.felix.service.command.CommandSession
import org.apache.karaf.features.FeaturesService
import org.ops4j.pax.exam.CoreOptions
import org.ops4j.pax.exam.MavenUtils
import org.ops4j.pax.exam.Option
import org.ops4j.pax.exam.TestProbeBuilder
import org.ops4j.pax.exam.junit.ProbeBuilder
import org.ops4j.pax.exam.options.MavenArtifactProvisionOption
import org.osgi.framework.*
import org.osgi.util.tracker.ServiceTracker

import javax.inject.Inject

import static org.apache.karaf.tooling.exam.options.KarafDistributionOption.editConfigurationFileExtend
import static org.apache.karaf.tooling.exam.options.KarafDistributionOption.karafDistributionConfiguration
import static org.ops4j.pax.exam.CoreOptions.maven

class OzoneTestSupport {

    static final Long DEFAULT_TIMEOUT = 10000L;
    static final Long DEFAULT_WAIT = 10000L;

    static final String KARAF_GROUP_ID = "org.apache.karaf";
    static final String KARAF_ARTIFACT_ID = "apache-karaf";

    @Inject
    protected BundleContext bundleContext;


    /**
     * This is used to customize the Probe that will contain the test.
     * We need to enable dynamic import of provisional bundles, to use the Console.
     *
     * @param probe
     * @return
     */
    @ProbeBuilder
    TestProbeBuilder probeConfiguration(TestProbeBuilder probe) {
        probe.setHeader(Constants.DYNAMICIMPORT_PACKAGE, "*,org.apache.felix.service.*;status=provisional")
    }

    /**
     * Create an {@link Option} for using Apache Karaf distribution.
     *
     * @return
     */
    protected Option ozoneDistributionConfiguration() {
        return karafDistributionConfiguration().frameworkUrl(
                maven().groupId(KARAF_GROUP_ID).artifactId(KARAF_ARTIFACT_ID).versionAsInProject().type("zip"))
                .karafVersion(getKarafVersion()).name("Ozone Karaf Distro").unpackDirectory(new File("target/paxexam/unpack/")).useDeployFolder(false)
    }

    /**
     * Sets a System property.
     * @param propertyName
     * @return
     */
    static Option systemProperty(String propertyName, String propertyValue) {
        editConfigurationFileExtend("etc/system.properties", propertyName, propertyValue != null ? propertyValue : "")
    }

    /**
     * Copies the actual System property to the container properties.
     * @param propertyName
     * @return
     */
    static Option systemProperty(String propertyName) {
        systemProperty(propertyName, System.getProperty(propertyName))
    }


    /**
     * Executes the command and returns the output as a String.
     *
     * @param command
     * @return
     */
    protected String executeCommand(String command) {
        def byteArrayOutputStream = new ByteArrayOutputStream()
        def printStream = new PrintStream(byteArrayOutputStream)
        CommandProcessor commandProcessor = getOsgiService(CommandProcessor.class)
        CommandSession commandSession = commandProcessor.createSession(System.in, printStream, System.err)
        //This is required in order to run scripts that use those session variables.
        commandSession.put("APPLICATION", System.getProperty("karaf.name", "root"))
        commandSession.put("USER", "karaf")

        try {
            System.err.println(command)
            commandSession.execute(command)
        } catch (Exception e) {
            e.printStackTrace(System.err)
        }
        return byteArrayOutputStream.toString()
    }


    /**
     * Executes multiple commands inside a Single Session.
     * Commands have a default timeout of 10 seconds.
     * @param commands
     * @return
     */
    protected String executeCommands(final String ...commands) {
        def byteArrayOutputStream = new ByteArrayOutputStream();
        def printStream = new PrintStream(byteArrayOutputStream);
        CommandProcessor commandProcessor = getOsgiService(CommandProcessor.class);
        CommandSession commandSession = commandProcessor.createSession(System.in, printStream, System.err);
        commandSession.put("APPLICATION", System.getProperty("karaf.name", "root"));
        commandSession.put("USER", "karaf");

        commands.each {
            try {
                System.err.println(it)
                commandSession.execute(it)
            } catch (Exception e) {
                e.printStackTrace(System.err)
            }
        }

        return byteArrayOutputStream.toString()
    }

    protected Bundle installBundle(String groupId, String artifactId) throws Exception {
        MavenArtifactProvisionOption mvnUrl = mavenBundle(groupId, artifactId)
        return bundleContext.installBundle(mvnUrl.getURL())
    }


    protected Bundle getInstalledBundle(String symbolicName) {
        bundleContext.bundles.each {
            if(it.symbolicName == symbolicName)
                return it
        }

        bundleContext.bundles.each {
            System.err.println "Bundle: ${it.symbolicName}"
        }
        throw new RuntimeException("Bundle ${symbolicName} does not exist");
    }

    /*
    * Explode the dictionary into a ,-delimited list of key=value pairs
    */
    private static String explode(Dictionary dictionary) {
        Enumeration keys = dictionary.keys()
        StringBuffer result = new StringBuffer()
        while (keys.hasMoreElements()) {
            Object key = keys.nextElement()
            result.append(String.format("%s=%s", key, dictionary.get(key)))
            if (keys.hasMoreElements()) {
                result.append(", ")
            }
        }
        return result.toString();
    }

    protected <T> T getOsgiService(Class<T> type, long timeout) {
        return getOsgiService(type, null, timeout)
    }

    protected <T> T getOsgiService(Class<T> type) {
        return getOsgiService(type, null, DEFAULT_TIMEOUT)
    }

    protected <T> T getOsgiService(Class<T> type, String filter, long timeout) {
        ServiceTracker tracker = null;
        try {
            String flt;
            if (filter != null) {
                if (filter.startsWith("(")) {
                    flt = "(&(" + Constants.OBJECTCLASS + "=" + type.getName() + ")" + filter + ")";
                } else {
                    flt = "(&(" + Constants.OBJECTCLASS + "=" + type.getName() + ")(" + filter + "))";
                }
            } else {
                flt = "(" + Constants.OBJECTCLASS + "=" + type.getName() + ")";
            }
            Filter osgiFilter = FrameworkUtil.createFilter(flt);
            tracker = new ServiceTracker(bundleContext, osgiFilter, null);
            tracker.open(true);
            // Note that the tracker is not closed to keep the reference
            // This is buggy, as the service reference may change i think
            Object svc = type.cast(tracker.waitForService(timeout));
            if (svc == null) {
                Dictionary dic = bundleContext.getBundle().getHeaders();
                System.err.println("Test bundle headers: " + explode(dic));

                for (ServiceReference ref : asCollection(bundleContext.getAllServiceReferences(null, null))) {
                    System.err.println("ServiceReference: " + ref);
                }

                for (ServiceReference ref : asCollection(bundleContext.getAllServiceReferences(null, flt))) {
                    System.err.println("Filtered ServiceReference: " + ref);
                }

                throw new RuntimeException("Gave up waiting for service " + flt);
            }
            return type.cast(svc);
        } catch (InvalidSyntaxException e) {
            throw new IllegalArgumentException("Invalid filter", e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Installs a feature and checks that feature is properly installed.
     * @param feature
     * @throws Exception
     */
    public void installAndCheckFeature(String feature) throws Exception {
        System.err.println(executeCommand("features:install " + feature));
        FeaturesService featuresService = getOsgiService(FeaturesService.class);
        System.err.println(executeCommand("osgi:list -t 0"));
        assert featuresService.isInstalled(featuresService.getFeature(feature)), "Expected ${feature} feature to be install"
    }


    /*
     * Provides an iterable collection of references, even if the original array is null
     */
    private static Collection<ServiceReference> asCollection(ServiceReference[] references) {
        return references != null ? Arrays.asList(references) : Collections.<ServiceReference>emptyList();
    }

    /**
     * Create an provisioning option for the specified maven artifact
     * (groupId and artifactId), using the version found in the list
     * of dependencies of this maven project.
     *
     * @param groupId    the groupId of the maven bundle
     * @param artifactId the artifactId of the maven bundle
     * @return the provisioning option for the given bundle
     */
    protected static MavenArtifactProvisionOption mavenBundle(String groupId, String artifactId) {
        return CoreOptions.mavenBundle(groupId, artifactId).versionAsInProject();
    }

    /**
     * Create an provisioning option for the specified maven artifact
     * (groupId and artifactId), using the version found in the list
     * of dependencies of this maven project.
     *
     * @param groupId    the groupId of the maven bundle
     * @param artifactId the artifactId of the maven bundle
     * @param version    the version of the maven bundle
     * @return the provisioning option for the given bundle
     */
    protected static MavenArtifactProvisionOption mavenBundle(String groupId, String artifactId, String version) {
        return CoreOptions.mavenBundle(groupId, artifactId).version(version);
    }

    /**
     * Returns the Version of Karaf to be used.
     *
     * @return
     */
    protected String getKarafVersion() {
        return MavenUtils.getArtifactVersion(KARAF_GROUP_ID, KARAF_ARTIFACT_ID);
    }
}


