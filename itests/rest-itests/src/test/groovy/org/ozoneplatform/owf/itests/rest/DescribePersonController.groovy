package org.ozoneplatform.owf.itests.rest

import org.junit.Test

/**
 * Don't run test for now until we know more about the REST and Service layer
 */
class DescribePersonController extends RestTestBase {

    @Test
    void itReturnsListOfPersons() {
        def persons = getJson("${uriBase}/persons")
        assert persons.size() == 3
    }

    //@Test
    void itReturnsPerson() {
        def person = getJson("${uriBase}/persons/1")
        assert person.username == "testUser1"
        assert person.fullname == "Test User 1"
        assert person.email == "testuser1@blah.blah"
        assert person.prevLogin == "07/10/2012 10:30:00"
        assert person.lastLogin == "07/14/2012 14:03:31"
    }
}
