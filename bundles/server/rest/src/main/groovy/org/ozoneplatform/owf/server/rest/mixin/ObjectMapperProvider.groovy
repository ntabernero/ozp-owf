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

package org.ozoneplatform.owf.server.rest.mixin

import java.text.SimpleDateFormat
import javax.ws.rs.ext.ContextResolver
import javax.ws.rs.ext.Provider
import org.codehaus.jackson.map.ObjectMapper
import ozone.platform.server.model.*

@Provider
class ObjectMapperProvider implements ContextResolver<ObjectMapper> {
    private ObjectMapper mapper = new ObjectMapper();
    
    public ObjectMapperProvider() {
        mapper.dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
        mapper.deserializationConfig.addMixInAnnotations(Person.class, PersonMixin.class);
        mapper.deserializationConfig.addMixInAnnotations(Group.class, GroupMixin.class);
        mapper.deserializationConfig.addMixInAnnotations(Stack.class, StackMixin.class);
        mapper.serializationConfig.addMixInAnnotations(Person.class, PersonMixin.class);
        mapper.serializationConfig.addMixInAnnotations(Group.class, GroupMixin.class);
        mapper.serializationConfig.addMixInAnnotations(Stack.class, StackMixin.class);
    }

    @Override
    public ObjectMapper getContext(Class<?> type) { return mapper; }
}