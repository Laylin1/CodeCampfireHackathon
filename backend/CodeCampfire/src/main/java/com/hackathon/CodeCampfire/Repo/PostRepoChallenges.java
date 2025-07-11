package com.hackathon.CodeCampfire.Repo;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.hackathon.CodeCampfire.modelData.Challenges;

public interface PostRepoChallenges extends MongoRepository<Challenges,String>{

    List<Challenges> findByAuthor(String author);
}
