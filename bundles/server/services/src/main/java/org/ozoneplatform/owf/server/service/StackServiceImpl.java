package org.ozoneplatform.owf.server.service;

import java.util.ArrayList;
import java.util.List;
import org.ozoneplatform.owf.server.service.model.Stack;

public class StackServiceImpl implements StackService {

    public List<Stack> list() {
        List<Stack> list = new ArrayList<Stack>();
        list.add(new Stack(new Long(1), "Stack One", "This is stack one.", null, null, null));
        list.add(new Stack(new Long(2), "Stack Two", "This is stack two.", null, null, null));
        return list;
    }

    public Stack create(Stack stack) {
        return stack;
    }

    public Stack doImport(Stack stack) {
        return stack;
    }

    public Stack fetch(Long id) {
        Stack stack = new Stack(id, "Stack One", "This is stack one.", null, null, null);
        return stack;
    }

    public Stack update(Long id, Stack stack) {
        stack.setId(id);
        return stack;
    }

    public void delete(Long id) {
        return;
    }

    public Stack export(Long id) {
        Stack stack = new Stack(id, "Stack One", "This is stack one.", null, null, null);
        return stack;
    }

    public Stack restore(Long id) {
        Stack stack = new Stack(id, "Stack One", "This is stack one.", null, null, null);
        return stack;
    }
    
}
