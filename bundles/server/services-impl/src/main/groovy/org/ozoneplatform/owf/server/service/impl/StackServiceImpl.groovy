/* 
   Copyright 2013 Next Century Corporation 

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

package org.ozoneplatform.owf.server.service.impl

import org.ozoneplatform.owf.server.service.api.StackService
import org.ozoneplatform.owf.server.service.api.exception.NotFoundException
import org.ozoneplatform.owf.server.service.api.exception.ValidationException
import org.ozoneplatform.commons.server.domain.model.Stack

class StackServiceImpl implements StackService {
    
    def theList = [];
    
    StackServiceImpl() {

        def stack;
        
        stack = new Stack("Stack One", "stackone");
        stack.id = 1L;
        stack.description = "This is stack one.";
        stack.descriptorUrl = "http://the.descriptor.url";
        theList.add(stack);
        
        stack = new Stack("Stack Two", "stacktwo");
        stack.id = 2L;
        stack.description = "This is stack two.";
        stack.descriptorUrl = "http://the.descriptor.url";
        theList.add(stack);

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
