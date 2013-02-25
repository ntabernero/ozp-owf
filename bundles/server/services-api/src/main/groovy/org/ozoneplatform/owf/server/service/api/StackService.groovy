package org.ozoneplatform.owf.server.service.api

import org.ozoneplatform.commons.server.domain.model.Stack

interface StackService extends PersonContainerService<Stack>, GroupContainerService<Stack> {

    List<Stack> list();
    Stack create(Stack stack);
    Stack doImport(Stack stack);
    Stack fetch(String id);
    Stack update(String id, Stack stack);
    void delete(String id);
    Stack export(String id);
    Stack restore(String id);

}

