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

import org.ozoneplatform.owf.server.service.api.PreferenceService
import org.ozoneplatform.owf.server.service.api.exception.*
import ozone.platform.server.model.Preference

class PreferenceServiceImpl implements PreferenceService {
    
    def theList = [];
    
    PreferenceServiceImpl() {
//        theList.add(new Preference(id: 1L, namespace: "Namespace One", path: "Path One", value: "Value One"));
//        theList.add(new Preference(id: 2L, namespace: "Namespace One", path: "Path Two", value: "Value Two"));
//        theList.add(new Preference(id: 3L, namespace: "Namespace Two", path: "Path One", value: "Value One"));
//        theList.add(new Preference(id: 4L, namespace: "Namespace Two", path: "Path Two", value: "Value Two"));
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
        if (!validNamespace) {
            throw new ValidationException("Namespace is required");
        }
        if (!validPath) {
            throw new ValidationException("Path is required");
        }
        return;
    }
    
}
