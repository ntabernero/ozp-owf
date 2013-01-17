package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.Preference

class PreferenceServiceImpl implements PreferenceService {
    
    def theList = [];
    
    PreferenceServiceImpl() {
        theList.add(new Preference(id: 1L, namespace: "Namespace One", path: "Path One", value: "Value One"));
        theList.add(new Preference(id: 2L, namespace: "Namespace One", path: "Path Two", value: "Value Two"));
        theList.add(new Preference(id: 3L, namespace: "Namespace Two", path: "Path One", value: "Value One"));
        theList.add(new Preference(id: 4L, namespace: "Namespace Two", path: "Path Two", value: "Value Two"));
    }
    
    List<Preference> list() {
        theList;
    }

    List<Preference> list(String namespace) {
        theList.findAll{ it.namespace == namespace; }
    }

    Preference fetch(String namespace, String path) {
        theList.find{ it.namespace == namespace && it.path == path; }
    }

    void delete(String namespace) {
        theList.removeAll(this.list(namespace));
        return;
    }

    void delete(String namespace, String path) {
        theList.remove(this.fetch(namespace, path));
        return;
    }

    Preference create(String namespace, String path, Preference preference) {
        def max = theList.max{ it.id }
        preference?.id = max.id + 1L;
        theList.add(preference);
        preference;
    }

    boolean exists(String namespace, String path) {
        if (this.fetch(namespace, path)) { true; } else { false; }
    }

    Preference update(String namespace, String path, Preference preference) {
        Preference thePref = this.fetch(namespace, path);
        if (preference?.value) thePref?.value = preference.value;
        thePref;
    }
    
}

