package org.ozoneplatform.owf.server.service.model;

public class User {
    
    private Long id;
    private String userName;
    private String description;
    private String email;

    public User() {
    }

    public User(Long id, String userName, String description, String email) {
        this.id = id;
        this.userName = userName;
        this.description = description;
        this.email = email;
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
}
