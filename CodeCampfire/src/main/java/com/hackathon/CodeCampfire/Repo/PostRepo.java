package com.hackathon.CodeCampfire.Repo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.hackathon.CodeCampfire.modelData.Users;
 

public interface PostRepo extends MongoRepository<Users,String>{
        // Поиск по email (для логина)
    Users findByEmail(String email);

    Optional<Users> findById(String id);

    // Можно добавить другие методы, например:
    boolean existsByEmail(String email);
}
