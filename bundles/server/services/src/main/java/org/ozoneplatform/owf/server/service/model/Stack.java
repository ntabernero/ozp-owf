package org.ozoneplatform.owf.server.service.model;

public class Stack {
    
    private Long id;
    private String name;
    private String description;
    private String stackContext;
    private String imageUrl;
    private String descriptorUrl;

    public Stack() {
    }
    
    public Stack(Long id, String name, String description, String stackContext, String imageUrl, String descriptorUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.stackContext = stackContext;
        this.imageUrl = imageUrl;
        this.descriptorUrl = descriptorUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStackContext() {
        return stackContext;
    }

    public void setStackContext(String stackContext) {
        this.stackContext = stackContext;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDescriptorUrl() {
        return descriptorUrl;
    }

    public void setDescriptorUrl(String descriptorUrl) {
        this.descriptorUrl = descriptorUrl;
    }
    
}
