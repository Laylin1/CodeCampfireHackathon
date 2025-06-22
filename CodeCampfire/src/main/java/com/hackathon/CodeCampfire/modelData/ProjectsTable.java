package com.hackathon.CodeCampfire.modelData;

import java.util.Arrays;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;


@Document (collection = "Projects")
public class ProjectsTable {

    private @Id String id;
    private String title;
    private String description;

    @Getter @Setter
    private String postDate;

    private String category;
    private String technologies[];
    private String coAuthors[];
    private String author;
    private String gitHub;

    public ProjectsTable(){

    }

    public String getId(){
        return id;
    }

    
    public void setId(String id){
        this.id = id;
    }

   

    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public String getCategory(){
        return category;
    }

    public void setCategory(String category){
        this.category = category;
    }

    public String[] getTechnologies(){
        return technologies;
    }

    public void setTechnologies(String[] technologies){
        this.technologies = technologies;
    }

    public String[] getCoAuthors(){
        return coAuthors;
    }

    public void setCoAuthors(String[] coAuthors){
        this.coAuthors = coAuthors;
    }

    public String getAuthor(){
        return author;
    }

    public void setAuthor(String author){
        this.author = author;
    }

    public String getGitHub(){
        return gitHub;
    }

    public void setGitHub(String gitHub){
        this.gitHub = gitHub;
    }


    @Override
    public String toString(){
        return "Post{" +
                "title='" + title + '\'' + 
                ", description='" + description + '\'' +
                ", category=" + category +
                ", technologes=" + Arrays.toString(technologies) + 
                ", coAuthors=" + Arrays.toString(coAuthors) +
                ", author=" + author + 
                ", gitHub="  + gitHub  +
                '}';
    }
}
