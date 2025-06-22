
package com.hackathon.CodeCampfire.Repo;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.hackathon.CodeCampfire.modelData.Requests;
 

public interface PostRepoRequests extends MongoRepository<Requests,String>{
    List<Requests> findByAuthor(String author);
    List<Requests> findByProjectAuthor(String projectAuthor);
}
