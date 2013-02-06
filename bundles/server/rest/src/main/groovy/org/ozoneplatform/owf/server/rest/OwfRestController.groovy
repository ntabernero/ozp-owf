/*
* Copyright 2013 Next Century Corporation
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.ozoneplatform.owf.server.rest

import javax.ws.rs.core.UriInfo
import org.ozoneplatform.commons.server.domain.model.Entity
import javax.ws.rs.core.UriBuilder

abstract class OwfRestController {
    protected URI buildEntityURI(UriInfo uriInfo, Entity entity, String methodName, String extraParam = null) {
        UriBuilder builder = uriInfo.getBaseUriBuilder()
        builder.path(this.class)
        builder.path(this.class.getMethod(methodName, String.class))
        extraParam ? builder.build(extraParam, entity.id) : builder.build(entity.id)
    }
}
