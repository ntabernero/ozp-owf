package org.ozoneplatform.owf.server.rest

import javax.ws.rs.core.UriInfo
import org.ozoneplatform.commons.server.domain.model.Entity
import javax.ws.rs.core.UriBuilder

/**
 * Created with IntelliJ IDEA.
 * User: msmolyak
 * Date: 2/6/13
 * Time: 3:48 PM
 * To change this template use File | Settings | File Templates.
 */
abstract class OwfRestController {
    protected URI buildEntityURI(UriInfo uriInfo, Entity entity, String methodName) {
        UriBuilder builder = uriInfo.getBaseUriBuilder();
        builder.path(this.class);
        builder.path(this.class.getMethod(methodName, String.class));
        builder.build(entity.id);
    }
}
