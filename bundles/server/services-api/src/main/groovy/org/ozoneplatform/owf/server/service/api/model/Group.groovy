package org.ozoneplatform.owf.server.service.api.model

class Group extends Entity {
    
    String name;
    String displayName;
    String description;
    boolean active = true;
    boolean automatic = false;
    
    boolean isActive() { active; }
    
    boolean isAutomatic() { automatic; }
    
}
