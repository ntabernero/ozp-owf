package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.Preference

class PreferenceServiceImpl implements PreferenceService {
    
    List<Preference> list() {
        List<Preference> list = new ArrayList<Preference>();
        list.add(new Preference(namespace: "Namespace One", path: "Path One", value: "Value One"));
        list.add(new Preference(namespace: "Namespace One", path: "Path Two", value: "Value Two"));
        list.add(new Preference(namespace: "Namespace Two", path: "Path One", value: "Value One"));
        list.add(new Preference(namespace: "Namespace Two", path: "Path Two", value: "Value Two"));
        return list;
    }

    List<Preference> list(String namespace) {
        List<Preference> list = new ArrayList<Preference>();
        list.add(new Preference(namespace: namespace, path: "Path One", value: "Value One"));
        list.add(new Preference(namespace: namespace, path: "Path Two", value: "Value Two"));
        return list;
    }

    Preference fetch(String namespace, String path) {
        Preference preference = new Preference(namespace: namespace, path: path, value: "Value One");
        return preference;
    }

    void delete(String namespace) {
        return;
    }

    void delete(String namespace, String path) {
        return;
    }

    Preference create(String namespace, String path, Preference preference) {
        return preference;
    }

    boolean exists(String namespace, String path) {
        return true;
    }

    Preference update(String namespace, String path, Preference preference) {
        return preference;
    }
    
}

