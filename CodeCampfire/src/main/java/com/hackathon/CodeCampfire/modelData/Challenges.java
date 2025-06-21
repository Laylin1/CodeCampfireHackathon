package com.hackathon.CodeCampfire.modelData;

import java.util.Arrays;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;


@Document(collection = "Challenges")
public class Challenges {

    @Id
    private String id;

    @Getter @Setter
    private String author;
    @Getter @Setter
    private String startDate;
    
    @Getter @Setter
    private String endDate;

    @Getter @Setter
    private String title;

    @Getter @Setter
    private String description;

    @Getter @Setter
    private String[] tags;

    @Getter @Setter
    private String status;    // "open", "closed", "launching_soon"

    @Getter @Setter
    private String prize;

    public Challenges() {

    }

    

    @Override
    public String toString(){
        return "Challenges{" +
                "author='" + author + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", tags=" + Arrays.toString(tags) +
                ", status='" + status + '\'' +
                ", prize='" + prize + '\'' +
                '}';
    }
}
