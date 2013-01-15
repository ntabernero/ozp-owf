package org.ozoneplatform.owf.server.service;

import java.util.List;
import org.ozoneplatform.owf.server.service.model.Stack;

public interface StackService {
    
    List<Stack> list();
    Stack create(Stack stack);
    Stack doImport(Stack stack);
    Stack fetch(Long id);
    Stack update(Long id, Stack stack);
    void delete(Long id);
    Stack export(Long id);
    Stack restore(Long id);
    
}
