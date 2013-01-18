package org.ozoneplatform.owf.server.service.tests

import org.ozoneplatform.owf.server.service.GroupServiceImpl
import org.ozoneplatform.owf.server.service.exception.ValidationException
import org.ozoneplatform.owf.server.service.model.Group
import spock.lang.Specification

class DescribeGroupService extends Specification {
    
    def "create must receive a valid group"() {
        when: "creating a new group without a name"
        def group = new Group();
        def groupService = new GroupServiceImpl();
        groupService.create(group);

        then: "throws"
        thrown(ValidationException)
    }
    
}
