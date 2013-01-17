package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.Stack as S;

class StackServiceImpl implements StackService {
    
    def theList = [];
    
    StackServiceImpl() {
        theList.add(new S(id: 1L, name: "Stack One", description: "This is stack one.", urlName: "stackone", descriptorUrl: "http://the.descriptor.url"));
        theList.add(new S(id: 2L, name: "Stack Two", description: "This is stack two.", urlName: "stacktwo", descriptorUrl: "http://the.descriptor.url"));
    }
    
    List<S> list() {
        theList;
    }

    S create(S stack) {
        def max = theList.max{ it.id }
        stack?.id = max.id + 1L;
        theList.add(stack);
        stack;
    }

    S doImport(S stack) {
        this.create(stack);
    }

    S fetch(Long id) {
        theList.find{ it.id == id; }
    }

    S update(Long id, S stack) {
        S theStack = this.fetch(id);
        if (stack?.name) theStack?.name = stack.name;
        if (stack?.description) theStack?.description = stack.description;
        if (stack?.urlName) theStack?.urlName = stack.urlName;
        if (stack?.descriptorUrl) theStack?.descriptorUrl = stack.descriptorUrl;
        theStack;
    }

    void delete(Long id) {
        theList.remove(this.fetch(id));
        return;
    }

    S export(Long id) {
        this.fetch(id);
    }

    S restore(Long id) {
        this.fetch(id);
    }
    
}

