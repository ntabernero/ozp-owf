package org.ozoneplatform.owf.server.service.api.model

class WidgetDefinition extends Entity {

    static final int MINIMUM_WIDGET_HEIGHT = 200
    static final int MINIMUM_WIDGET_WIDTH = 200

    /*
     * Required
     */
    String guid
    String displayName
    String widgetUrl
    String imageUrlLarge
    String imageUrlSmall
    String widgetType

    /*
     * Optional
     */
    String universalName
    String description = ''
    String descriptorUrl
    String version //Changed from widgetVersion

    /*
     * Defaults to value
     */
    int height = MINIMUM_WIDGET_HEIGHT
    int width = MINIMUM_WIDGET_WIDTH
    boolean background = false
    boolean singleton = false
    boolean visibleForLaunch = true //Changed from visible

    /*
     * Has Many
     */
    final Set<PersonalWidgetDefinition> personalWidgetDefinitions = new HashSet<PersonalWidgetDefinition>()
    final Set<String> tags = new HashSet<String>()
    final Set<Intent> sendableIntents = new HashSet<Intent>()
    final Set<Intent> receivableIntents = new HashSet<Intent>()
}
