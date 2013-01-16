package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.Preference

interface PreferenceService {
    
    List<Preference> list();
    List<Preference> list(String namespace);
    Preference fetch(String namespace, String path);
    void delete(String namespace);
    void delete(String namespace, String path);
    Preference create(String namespace, String path, Preference preference);
    Preference update(String namespace, String path, Preference preference);
    boolean exists(String namespace, String path);
    
}

