package com.hackathon.CodeCampfire.modelData;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;


@Document(collection = "Requests")
public class Requests {

    @Id
    @Getter @Setter
    private String id;

    @Getter @Setter
    private String author;
    @Getter @Setter
    private String project;

    @Getter @Setter
    private String projectAuthor;

    public Requests() {
        // Default constructor
    }
    

    @Override
    public String toString() {
        return "Requests{" +
                "author='" + author + '\'' +
                ", project='" + project + '\'' +
                ", projectAuthor='" + projectAuthor + '\'' +
                '}';
    }
}
