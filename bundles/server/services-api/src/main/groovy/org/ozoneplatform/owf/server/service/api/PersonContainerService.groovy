package org.ozoneplatform.owf.server.service.api

import org.ozoneplatform.commons.server.domain.model.Entity
import org.ozoneplatform.commons.server.domain.model.Person

public interface PersonContainerService<T extends Entity> {
    T addPerson(String containerId, String personId)
    T removePerson(String containerId, String personId)
    Set<Person> getPersons(String containerId)

}