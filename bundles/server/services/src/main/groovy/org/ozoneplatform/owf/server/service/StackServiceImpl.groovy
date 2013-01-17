package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.Stack as S;
import org.ozoneplatform.owf.server.service.exception.ValidationException
import org.ozoneplatform.owf.server.service.exception.NotFoundException

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
        this.validate(stack);
        def max = theList.max{ it.id }
        stack?.id = max.id + 1L;
        theList.add(stack);
        stack;
    }

    S doImport(S stack) {
        this.create(stack);
    }

    S fetch(Long id) {
        S theStack = theList.find{ it.id == id; }
        if (theStack) {
            theStack;
        } else {
            throw new NotFoundException("Stack not found");
        }
    }

    S update(Long id, S stack) {
        S theStack = this.fetch(id);
        theStack.name = stack?.name ?: theStack.name;
        theStack.description = stack?.description ?: theStack.description;
        theStack.urlName = stack?.urlName ?: theStack.urlName;
        theStack.descriptorUrl = stack?.descriptorUrl ?: theStack.descriptorUrl;
        this.validate(theStack);
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
    
    private void validate(S stack) {
        boolean validName = stack?.name?.trim()?.length() > 0;
        if (!validName) {
            throw new ValidationException("Invalid stack");
        }
        return;
    }
    
}
