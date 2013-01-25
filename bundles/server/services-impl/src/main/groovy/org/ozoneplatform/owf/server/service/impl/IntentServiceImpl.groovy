package org.ozoneplatform.owf.server.service.impl

import org.ozoneplatform.owf.server.service.api.IntentService
import org.ozoneplatform.owf.server.service.api.model.Intent
import org.ozoneplatform.owf.server.service.api.exception.NotFoundException
import org.ozoneplatform.owf.server.service.api.exception.ValidationException

class IntentServiceImpl implements IntentService {
    
    def theList = [];
    
    IntentServiceImpl() {
        theList.add(new Intent(id: 1L, action: "plot", dataType: "lat/long"));
        theList.add(new Intent(id: 2L, action: "graph", dataType: "cartesian"));
    }
    
    List<Intent> list() {
        theList;
    }
	
    List<Intent> list(String action) {
        theList.findAll{ it.action == action; }
    }
	
    List<Intent> list(String action, String dataType) {
        theList.findAll{ it.action == action && it.dataType == dataType; }
    }

    Intent fetch(Long id) {
        Intent theIntent = theList.find{ it.id == id; }
        if (theIntent) {
            theIntent;
        } else {
            throw new NotFoundException("Intent not found");
        }
    }

    Intent update(Long id, Intent intent) {
        Intent theIntent = this.fetch(id);
        theIntent.action = intent?.action ?: theIntent.action;
        theIntent.dataType = intent?.dataType ?: theIntent.dataType;
        this.validate(theIntent);
        theIntent;
    }

    Intent create(Intent intent) {
        this.validate(intent);
        def max = theList.max{ it.id }
        intent?.id = max.id + 1L;
        theList.add(intent);
        intent;
    }

    void delete(Long id) {
        theList.remove(this.fetch(id));
        return;
    }
    
    private void validate(Intent intent) {
        boolean validAction = intent?.action?.trim()?.length() > 0;
        boolean validDataType = intent?.dataType?.trim()?.length() > 0;
        if (!validAction) {
            throw new ValidationException("Action is required");
        }
        if (!validDataType) {
            throw new ValidationException("Data Type is required");
        }
        return;
    }
    
}
