package org.ozoneplatform.owf.server.service.api

import org.ozoneplatform.owf.server.service.api.model.Person

interface PersonService {
    
    List<Person> list();
    Person fetch(Long id);
    Person create(Person person);
    Person update(Long id, Person person);
    void delete(Long id);
    
}

