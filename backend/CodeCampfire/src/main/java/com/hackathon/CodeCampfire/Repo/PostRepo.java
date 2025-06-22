package com.hackathon.CodeCampfire.Repo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.hackathon.CodeCampfire.modelData.Users;
 

public interface PostRepo extends MongoRepository<Users,String>{
        // Поиск по email (для логина)
    Optional<Users> findById(String id);

    Optional<Users> findByEmail(String email);

    // Можно добавить другие методы, например:
    boolean existsByEmail(String email);
}
