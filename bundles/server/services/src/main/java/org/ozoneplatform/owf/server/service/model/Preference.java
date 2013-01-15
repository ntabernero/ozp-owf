package org.ozoneplatform.owf.server.service.model;

public class Preference {
    
    private String namespace;
    private String path;
    private String value;

    public Preference() {
    }

    public Preference(String namespace, String path, String value) {
        this.namespace = namespace;
        this.path = path;
        this.value = value;
    }

    public String getNamespace() {
        return namespace;
    }

    public void setNamespace(String namespace) {
        this.namespace = namespace;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
    
}
