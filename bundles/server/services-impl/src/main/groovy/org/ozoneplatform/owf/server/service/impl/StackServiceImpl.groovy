package org.ozoneplatform.owf.server.service.impl

import org.ozoneplatform.owf.server.service.api.StackService
import org.ozoneplatform.owf.server.service.api.exception.NotFoundException
import org.ozoneplatform.owf.server.service.api.exception.ValidationException
import org.ozoneplatform.owf.server.service.api.model.Stack

class StackServiceImpl implements StackService {
    
    def theList = [];
    
    StackServiceImpl() {
        theList.add(new Stack(id: 1L, name: "Stack One", description: "This is stack one.", urlName: "stackone", descriptorUrl: "http://the.descriptor.url"));
        theList.add(new Stack(id: 2L, name: "Stack Two", description: "This is stack two.", urlName: "stacktwo", descriptorUrl: "http://the.descriptor.url"));
    }
    
    List<Stack> list() {
        theList
    }

    Stack create(Stack stack) {
        this.validate(stack);
        def max = theList.max{ it.id }
        stack?.id = max.id + 1L
        theList.add(stack)
        stack
    }

    Stack doImport(Stack stack) {
        this.create(stack);
    }

    Stack fetch(Long id) {
        Stack theStack = theList.find{ it.id == id; }
        if (theStack) {
            theStack
        } else {
            throw new NotFoundException("Stack not found");
        }
    }

    Stack update(Long id, Stack stack) {
        Stack theStack = this.fetch(id)
        theStack.name = stack?.name ?: theStack.name
        theStack.description = stack?.description ?: theStack.description
        theStack.urlName = stack?.urlName ?: theStack.urlName
        theStack.descriptorUrl = stack?.descriptorUrl ?: theStack.descriptorUrl
        this.validate(theStack)
        theStack
    }

    void delete(Long id) {
        theList.remove(this.fetch(id))
    }

    Stack export(Long id) {
        this.fetch(id)
    }

    Stack restore(Long id) {
        this.fetch(id);
    }
    
    private void validate(Stack stack) {
        boolean validName = stack?.name?.trim()?.length() > 0
        if (!validName) {
            throw new ValidationException("Name is required")
        }
    }
    
}
