package org.ozoneplatform.owf.server.service;

import java.util.ArrayList;
import java.util.List;
import org.ozoneplatform.owf.server.service.model.Preference;

public class PreferenceServiceImpl implements PreferenceService {

    public List<Preference> list() {
        List<Preference> list = new ArrayList<Preference>();
        list.add(new Preference("Namespace One", "Path One", "Value One"));
        list.add(new Preference("Namespace One", "Path Two", "Value Two"));
        list.add(new Preference("Namespace Two", "Path One", "Value One"));
        list.add(new Preference("Namespace Two", "Path Two", "Value Two"));
        return list;
    }

    public List<Preference> list(String namespace) {
        List<Preference> list = new ArrayList<Preference>();
        list.add(new Preference(namespace, "Path One", "Value One"));
        list.add(new Preference(namespace, "Path Two", "Value Two"));
        return list;
    }

    public Preference fetch(String namespace, String path) {
        Preference preference = new Preference(namespace, path, "Value One");
        return preference;
    }

    public void delete(String namespace) {
        return;
    }

    public void delete(String namespace, String path) {
        return;
    }

    public Preference create(String namespace, String path, Preference preference) {
        return preference;
    }

    public boolean exists(String namespace, String path) {
        return true;
    }

    public Preference update(String namespace, String path, Preference preference) {
        return preference;
    }
    
}
