package com.hackathon.CodeCampfire.modelData;

import lombok.Getter;
import lombok.Setter;

public class RequestCreateDTO {


    @Getter @Setter
    private String author;
    @Getter @Setter
    private String project;

    @Getter @Setter
    private String projectAuthor;

    public Requests toRequests() {
        Requests request = new Requests();
        request.setAuthor(this.author);
        request.setProject(this.project);
        request.setProjectAuthor(this.projectAuthor);
        return request;
    }
    
}
