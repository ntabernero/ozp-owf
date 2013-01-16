package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.Person

interface PersonService {
    
    List<Person> list();
    Person fetch(Long id);
    Person create(Person person);
    Person update(Long id, Person person);
    void delete(Long id);
    
}

