package com.hackathon.CodeCampfire.modelData;

import org.springframework.data.annotation.Id;

public class IdDTO {

    @Id
    private String id;

    public String getId(){
        return id;
    }

    public void setId(String id){
        this.id = id;
    }
}
