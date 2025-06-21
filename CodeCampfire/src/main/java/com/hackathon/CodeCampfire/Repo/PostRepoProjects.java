package com.hackathon.CodeCampfire.Repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.hackathon.CodeCampfire.modelData.ProjectsTable;

public interface PostRepoProjects extends MongoRepository<ProjectsTable, String> {
    
}
