package org.ozoneplatform.owf.server.service.api

import org.ozoneplatform.owf.server.service.api.model.Intent

interface IntentService {
    
    List<Intent> list();
    List<Intent> list(String action);
    List<Intent> list(String action, String dataType);
    Intent fetch(Long id);
    Intent update(Long id, Intent intent);
    Intent create(Intent intent);
    void delete(Long id);
    
}
