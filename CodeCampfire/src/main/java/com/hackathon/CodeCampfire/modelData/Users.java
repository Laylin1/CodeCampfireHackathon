package com.hackathon.CodeCampfire.modelData;

import java.util.Arrays;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "Users")
public class Users {

    @Id
    private String id;


    private String username;
    private String email;
    private String passwordHash;
    private String bio;
    private String skills[];
    private String projects[];
    private String collaborations[];


    public Users() {

    }

    public String getId(){
        return id;
    }

    public void setId(String id){
        this.id = id;
    }

    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getPasswordHash(){
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash){
        this.passwordHash = passwordHash;
    }

    public String[] getSkills(){
        return skills;
    }

    public void setSkills(String[] skills){
        this.skills = skills;
    }

    public String getBio(){
        return bio;
    }

    public void setBio(String bio){
        this.bio = bio;
    }

    public String[] getProjects(){
        return projects;
    }

    public void setProjects(String[] projects){
        this.projects = projects;
    }

    public String[] getCollaborations(){
        return collaborations;
    }

    public void setCollaborations(String[] collaborations){
        this.collaborations = collaborations;
    }


    @Override
    public String toString(){
        return "Post{" +
                "username='" + username + '\'' + 
                ", email='" + email + '\'' +
                ", passwordHash=" + passwordHash +
                ", skills=" + Arrays.toString(skills) + 
                ", bio=" + bio +
                ", projects=" + projects + 
                ", collaborations="  + collaborations  +
                '}';
    }
}

