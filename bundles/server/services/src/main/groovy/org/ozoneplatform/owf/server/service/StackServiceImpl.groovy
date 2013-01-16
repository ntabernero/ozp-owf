package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.Stack as S;

class StackServiceImpl implements StackService {
    
    List<S> list() {
        List<S> list = new ArrayList<S>();
        list.add(new S(id: new Long(1), name: "Stack One", description: "This is stack one."));
        list.add(new S(id: new Long(2), name: "Stack Two", description: "This is stack two."));
        return list;
    }

    S create(S stack) {
        return stack;
    }

    S doImport(S stack) {
        return stack;
    }

    S fetch(Long id) {
        S stack = new S(id: id, name: "Stack One", description: "This is stack one.");
        return stack;
    }

    S update(Long id, S stack) {
        stack.setId(id);
        return stack;
    }

    void delete(Long id) {
        return;
    }

    S export(Long id) {
        S stack = new S(id: id, name: "Stack One", description: "This is stack one.");
        return stack;
    }

    S restore(Long id) {
        S stack = new S(id: id, name: "Stack One", description: "This is stack one.");
        return stack;
    }
    
}

