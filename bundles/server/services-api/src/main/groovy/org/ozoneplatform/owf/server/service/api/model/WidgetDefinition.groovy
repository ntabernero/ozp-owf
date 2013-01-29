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


    boolean isBackground() {
        return this.background
    }

    boolean isSingleton() {
        return this.singleton
    }

    boolean isVisibleForLaunch() {
        return this.visibleForLaunch
    }
}
