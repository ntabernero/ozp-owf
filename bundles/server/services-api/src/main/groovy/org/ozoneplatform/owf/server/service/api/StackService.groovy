package org.ozoneplatform.owf.server.service.api

import org.ozoneplatform.owf.server.service.api.model.Stack

interface StackService {

    List<Stack> list();
    Stack create(Stack stack);
    Stack doImport(Stack stack);
    Stack fetch(Long id);
    Stack update(Long id, Stack stack);
    void delete(Long id);
    Stack export(Long id);
    Stack restore(Long id);

}

