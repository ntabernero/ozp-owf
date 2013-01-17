package org.ozoneplatform.owf.server.service

import org.ozoneplatform.owf.server.service.model.Preference
import org.ozoneplatform.owf.server.service.exception.ValidationException
import org.ozoneplatform.owf.server.service.exception.NotFoundException

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
        Preference thePref = theList.find{ it.namespace == namespace && it.path == path; }
        if (thePref) {
            thePref;
        } else {
            throw new NotFoundException("Preference not found");
        }
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
        this.validate(preference);
        def max = theList.max{ it.id }
        preference?.id = max.id + 1L;
        theList.add(preference);
        preference;
    }

    boolean exists(String namespace, String path) {
        try {
            this.fetch(namespace, path);
            true;
        } catch(NotFoundException e) {
            false;
        }
    }

    Preference update(String namespace, String path, Preference preference) {
        Preference thePref = this.fetch(namespace, path);
        if (preference?.value) thePref?.value = preference.value;
        this.validate(thePref);
        thePref;
    }
    
    private void validate(Preference pref) {
        boolean validNamespace = pref?.namespace?.trim()?.length() > 0;
        boolean validPath = pref?.path?.trim()?.length() > 0;
        if (!validNamespace || !validPath) {
            throw new ValidationException("Invalid preference");
        }
        return;
    }
    
}
