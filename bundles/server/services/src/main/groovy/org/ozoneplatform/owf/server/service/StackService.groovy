package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.Stack as S;

interface StackService {
    
    List<S> list();
    S create(S stack);
    S doImport(S stack);
    S fetch(Long id);
    S update(Long id, S stack);
    void delete(Long id);
    S export(Long id);
    S restore(Long id);
    
}

