package org.ozoneplatform.owf.server.service.tests

import org.ozoneplatform.owf.server.service.api.exception.NotFoundException
import org.ozoneplatform.owf.server.service.api.exception.ValidationException
import org.ozoneplatform.owf.server.service.api.model.Preference
import org.ozoneplatform.owf.server.service.impl.PreferenceServiceImpl
import spock.lang.Specification

class DescribePreferenceService extends Specification {
    
    def prefService = new PreferenceServiceImpl()
    
    def "create must receive a valid preference"() {
        when: "creating a new preference without a namespace or path"
        prefService.create(null, null, new Preference())

        then: "throws"
        thrown(ValidationException)
    }
    
    def "fetch must receive an exisiting namespace and path"() {
        when: "fetching a preference by invalid namespace and path"
        prefService.fetch(null, null)

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "delete must receive an exisiting namespace and path"() {
        when: "deleting a preference by invalid namespace and path"
        prefService.delete(null, null)

        then: "throws"
        thrown(NotFoundException)
    }
    
    def "update must receive an exisiting namespace and path"() {
        when: "updating a preference by invalid namespace and path"
        prefService.update(null, null, new Preference())

        then: "throws"
        thrown(NotFoundException)
    }
    
}

