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

package org.ozoneplatform.owf.server.service.api

import ozone.platform.server.model.Preference

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

